"""
key_faces.py — lift the character faces off their paper background.

The supplied expression sheets are flat JPEGs on a warm off-white. We flood
the background in from the border (so pale pixels *inside* a drawing survive),
feather the resulting edge, then cut each face out on its own.
"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


def key(path, tol=26, feather=1.2):
    im = Image.open(path).convert("RGB")
    a = np.asarray(im).astype(np.int16)

    # background colour = the median of a border band
    band = np.concatenate([a[:6].reshape(-1, 3), a[-6:].reshape(-1, 3),
                           a[:, :6].reshape(-1, 3), a[:, -6:].reshape(-1, 3)])
    bg = np.median(band, axis=0)

    near = (np.abs(a - bg).max(axis=2) <= tol)
    # only background *connected to the border* counts
    lab, _ = ndimage.label(near)
    edge = set(lab[0].tolist()) | set(lab[-1].tolist()) | \
           set(lab[:, 0].tolist()) | set(lab[:, -1].tolist())
    edge.discard(0)
    outside = np.isin(lab, list(edge))

    alpha = np.where(outside, 0, 255).astype(np.uint8)
    am = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(feather))
    out = im.copy()
    out.putalpha(am)
    return out, ~outside


def faces(path, out_dir, cols=3, rows=2, min_area=20000, pad=16):
    rgba, solid = key(path)
    lab, n = ndimage.label(ndimage.binary_dilation(solid, np.ones((25, 25), bool)))
    os.makedirs(out_dir, exist_ok=True)
    keep = []
    for i, sl in enumerate(ndimage.find_objects(lab), start=1):
        if sl is None:
            continue
        sub = (lab[sl] == i) & solid[sl]
        if sub.sum() < min_area:
            continue
        ys, xs = np.where(sub)
        y0, y1 = sl[0].start + ys.min(), sl[0].start + ys.max() + 1
        x0, x1 = sl[1].start + xs.min(), sl[1].start + xs.max() + 1
        keep.append((x0, y0, x1, y1, i))

    keep.sort(key=lambda b: (b[1] // 120, b[0]))
    for k, (x0, y0, x1, y1, i) in enumerate(keep):
        box = (max(0, x0 - pad), max(0, y0 - pad),
               min(rgba.width, x1 + pad), min(rgba.height, y1 + pad))
        crop = rgba.crop(box)
        own = (lab[box[1]:box[3], box[0]:box[2]] == i)
        ca = np.array(crop.split()[3])
        ca[~own] = 0
        crop.putalpha(Image.fromarray(ca))
        crop.save(os.path.join(out_dir, f"{k:02d}_{crop.width}x{crop.height}.png"))
        print(k, crop.size)
    print(f"-- {len(keep)} faces")


if __name__ == "__main__":
    faces(sys.argv[1], sys.argv[2])
