"""contact_sheet.py — lay sliced pieces out on a numbered grid so they can be identified."""
import sys, os, glob
from PIL import Image, ImageDraw

def build(src, out, cell=170, cols=8):
    files = sorted(glob.glob(os.path.join(src, "*.png")))
    rows = (len(files) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * cell, rows * (cell + 22)), (245, 243, 238))
    d = ImageDraw.Draw(sheet)
    for i, f in enumerate(files):
        im = Image.open(f).convert("RGBA")
        im.thumbnail((cell - 14, cell - 14))
        x, y = (i % cols) * cell, (i // cols) * (cell + 22)
        bg = Image.new("RGBA", (cell, cell), (255, 255, 255, 255))
        bg.alpha_composite(im, ((cell - im.width) // 2, (cell - im.height) // 2))
        sheet.paste(bg.convert("RGB"), (x, y))
        d.rectangle([x, y, x + cell - 1, y + cell - 1], outline=(200, 196, 188))
        d.text((x + 5, y + cell + 4), os.path.basename(f).split("_")[0], fill=(20, 20, 20))
    sheet.save(out, quality=85)
    print(out, sheet.size, len(files))

if __name__ == "__main__":
    build(sys.argv[1], sys.argv[2])
