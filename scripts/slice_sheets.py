"""
slice_sheets.py — cut the supplied crayon sprite sheets into individual assets.

Each sheet arrives as one RGBA PNG with the artwork floating on transparency.
We threshold the alpha channel, close small gaps so a single drawing does not
fall apart into strokes, label what is left, and write one trimmed PNG per blob.

Run:  python3 scripts/slice_sheets.py <sheet.png> <out-dir> [--gap 14] [--min 3500]
"""
import sys, os, argparse
import numpy as np
from PIL import Image
from scipy import ndimage


def slice_sheet(path, out_dir, gap=14, min_area=3500, pad=10):
    im = Image.open(path).convert("RGBA")
    a = np.array(im.split()[3])
    mask = a > 30

    # close gaps so one drawing stays one blob
    st = np.ones((gap, gap), bool)
    grown = ndimage.binary_dilation(mask, st)
    lab, n = ndimage.label(grown)

    os.makedirs(out_dir, exist_ok=True)
    boxes = ndimage.find_objects(lab)
    kept = []
    for i, sl in enumerate(boxes, start=1):
        if sl is None:
            continue
        sub = (lab[sl] == i) & mask[sl]
        if sub.sum() < min_area:
            continue
        ys, xs = np.where(sub)
        y0, y1 = sl[0].start + ys.min(), sl[0].start + ys.max() + 1
        x0, x1 = sl[1].start + xs.min(), sl[1].start + xs.max() + 1
        y0, x0 = max(0, y0 - pad), max(0, x0 - pad)
        y1, x1 = min(a.shape[0], y1 + pad), min(a.shape[1], x1 + pad)

        crop = im.crop((x0, y0, x1, y1))
        # drop pixels belonging to neighbouring blobs that overlap this box
        own = (lab[y0:y1, x0:x1] == i)
        ca = np.array(crop.split()[3])
        ca[~own] = 0
        crop.putalpha(Image.fromarray(ca))

        name = f"{i:03d}_{x1-x0}x{y1-y0}.png"
        crop.save(os.path.join(out_dir, name))
        kept.append((name, x0, y0, x1 - x0, y1 - y0, int(sub.sum())))

    kept.sort(key=lambda r: (r[2] // 60, r[1]))
    for r in kept:
        print(f"{r[0]:<22} at ({r[1]:4d},{r[2]:4d})  {r[3]}x{r[4]}  area {r[5]}")
    print(f"-- {len(kept)} pieces from {os.path.basename(path)}")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("sheet")
    ap.add_argument("out")
    ap.add_argument("--gap", type=int, default=14)
    ap.add_argument("--min", type=int, default=3500)
    a = ap.parse_args()
    slice_sheet(a.sheet, a.out, a.gap, a.min)
