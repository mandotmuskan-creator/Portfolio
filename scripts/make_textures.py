"""
make_textures.py — the two tiling textures the crayon type and the page use.

crayon-grain.png  a seamless wax-crayon tooth: pale streaks and speckle on
                  transparency, laid over the letterforms with background-clip
paper.png         a very faint paper tooth for the page ground

Both are generated with wrapped gaussian blur so the tile has no visible seam.
Run:  python3 scripts/make_textures.py
"""
import os
import numpy as np
from PIL import Image
from scipy import ndimage

OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img", "tex")
SIZE = 256
rng = np.random.default_rng(11)


def wrapped(a, sigma):
    return ndimage.gaussian_filter(a, sigma, mode="wrap")


def norm(a):
    return (a - a.min()) / (np.ptp(a) + 1e-9)


def crayon_grain():
    """Waxy streaks: noise stretched along one axis, then rotated slightly."""
    streak = norm(wrapped(rng.random((SIZE, SIZE)), (0.6, 5.0)))
    speck = norm(wrapped(rng.random((SIZE, SIZE)), 0.55))
    tooth = norm(wrapped(rng.random((SIZE, SIZE)), 1.6))

    # light drag marks where the crayon skipped, plus darker settled wax
    light = np.clip((streak - 0.56) * 3.1, 0, 1) * 0.55
    light += np.clip((speck - 0.72) * 3.4, 0, 1) * 0.30
    dark = np.clip((0.40 - tooth) * 3.0, 0, 1) * 0.22

    rgb = np.zeros((SIZE, SIZE, 3), np.float32)
    rgb[..., :] = 1.0                      # the light marks are paper showing through
    a = light.copy()
    # darker wax pooling — paint it in as near-black with its own alpha
    m = dark > a
    rgb[m] = 0.06
    a = np.maximum(a, dark)

    img = np.dstack([(rgb * 255), (a * 255)]).astype(np.uint8)
    Image.fromarray(img, "RGBA").save(os.path.join(OUT, "crayon-grain.png"))


def paper():
    tooth = norm(wrapped(rng.random((SIZE, SIZE)), 0.8))
    fibre = norm(wrapped(rng.random((SIZE, SIZE)), (2.4, 0.7)))
    a = np.clip((tooth - 0.62) * 2.2, 0, 1) * 0.16
    a += np.clip((fibre - 0.70) * 2.0, 0, 1) * 0.08
    rgb = np.full((SIZE, SIZE, 3), 40, np.float32)
    img = np.dstack([rgb, (a * 255)]).astype(np.uint8)
    Image.fromarray(img, "RGBA").save(os.path.join(OUT, "paper.png"))


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    crayon_grain()
    paper()
    for f in ("crayon-grain.png", "paper.png"):
        p = os.path.join(OUT, f)
        print(f, os.path.getsize(p) // 1024, "KB")


# ---------------------------------------------------------------------------
# Added for the poster-style direction: a folded-paper ground for the title
# moments, and a dense crayon hatch that lets the paper show through the
# display type the way a real crayon fill does.
# ---------------------------------------------------------------------------

def paper_fold(w=1600, h=1000):
    """A sheet of white paper with two vertical folds and one horizontal."""
    rng2 = np.random.default_rng(5)
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    v = np.ones((h, w), np.float32)

    def crease(pos, axis, depth, width, lift):
        """A soft valley with a lighter ridge on one side."""
        d = (x - pos) if axis == "v" else (y - pos)
        val = np.exp(-(d / width) ** 2)
        ridge = np.exp(-((d - width * 1.5) / (width * 1.4)) ** 2)
        return -depth * val + lift * ridge

    v += crease(w * 0.335, "v", .075, w * 0.009, .034)
    v += crease(w * 0.665, "v", .066, w * 0.009, .030)
    v += crease(h * 0.520, "h", .086, h * 0.011, .040)

    # very broad panel shading so each quarter of the sheet sits differently
    panel = (np.sin(x / w * 6.1 + 0.7) * 0.016 + np.sin(y / h * 4.3 + 1.9) * 0.018)
    v += panel

    # paper tooth
    tooth = norm(wrapped(rng2.random((h, w)), 0.9))
    v += (tooth - 0.5) * 0.030

    v = np.clip(v, 0, 1.12)
    rgb = np.dstack([v * 253, v * 251, v * 246]).clip(0, 255).astype(np.uint8)
    Image.fromarray(rgb, "RGB").save(os.path.join(OUT, "paper-fold.jpg"), quality=88)


def crayon_hatch(size=320):
    """Seamless crayon hatching, painted in paper colour.

    Laid over the flat letter colour it reads as a real crayon fill: strokes
    that wander, skip and leave the sheet showing between them. The sine
    carriers use whole numbers of cycles and the warp noise is wrapped, so the
    tile repeats without a seam.
    """
    rng2 = np.random.default_rng(23)
    y, x = np.mgrid[0:size, 0:size].astype(np.float32)
    t = 2 * np.pi / size

    # push the coordinates around so the strokes are not ruled lines
    warp = (norm(wrapped(rng2.random((size, size)), 16.0)) - 0.5) * 2.4
    warp2 = (norm(wrapped(rng2.random((size, size)), 22.0)) - 0.5) * 1.8

    main = np.sin((x * 9 + y * 7) * t + warp)
    cross = np.sin((x * 5 - y * 8) * t + warp2)

    strokes = np.clip((np.abs(main) - 0.74) * 4.4, 0, 1)
    strokes += np.clip((np.abs(cross) - 0.86) * 4.0, 0, 1) * 0.45

    # crayon skips: long gaps along the stroke direction
    skip = norm(wrapped(rng2.random((size, size)), (4.0, 1.2)))
    strokes *= np.clip((skip - 0.26) * 2.6, 0, 1)

    # paper tooth catching the wax
    speck = norm(wrapped(rng2.random((size, size)), 0.6))
    strokes += np.clip((speck - 0.78) * 3.0, 0, 1) * 0.30

    a = np.clip(strokes, 0, 1) * 0.92
    rgb = np.dstack([np.full((size, size), 253.0),
                     np.full((size, size), 251.0),
                     np.full((size, size), 246.0)])
    img = np.dstack([rgb, a * 255]).astype(np.uint8)
    Image.fromarray(img, "RGBA").save(os.path.join(OUT, "crayon-hatch.png"))


if __name__ == "__main__":
    paper_fold()
    crayon_hatch()
    for f in ("paper-fold.jpg", "crayon-hatch.png"):
        p = os.path.join(OUT, f)
        print(f, os.path.getsize(p) // 1024, "KB")
