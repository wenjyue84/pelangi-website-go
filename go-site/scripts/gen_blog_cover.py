# /// script
# dependencies = ["pillow"]
# ///
"""Generate a 1200x630 .webp blog cover card.

uv run scripts/gen_blog_cover.py <out.webp> "<headline>" "<subline>" "<footer>"
"""
import sys
from PIL import Image, ImageDraw, ImageFont

out, headline, sub, footer = sys.argv[1:5]
W, H = 1200, 630
img = Image.new("RGB", (W, H))
px = img.load()
for y in range(H):
    t = y / H
    for x in range(W):
        s = x / W
        px[x, y] = (int(20 + 50 * s), int(30 + 70 * (1 - t)), int(90 + 90 * s))
d = ImageDraw.Draw(img)


def font(size, bold=True):
    name = "arialbd.ttf" if bold else "arial.ttf"
    return ImageFont.truetype(f"C:/Windows/Fonts/{name}", size)


def wrap(text, f, width):
    lines, cur = [], ""
    for w in text.split():
        trial = f"{cur} {w}".strip()
        if d.textlength(trial, font=f) <= width:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    lines.append(cur)
    return lines


d.rectangle([60, 70, 72, 400], fill=(255, 200, 60))
y = 70
hf = font(68)
for line in wrap(headline, hf, 1000):
    d.text((100, y), line, font=hf, fill="white")
    y += 82
y += 20
sf = font(36, bold=False)
for line in wrap(sub, sf, 1000):
    d.text((100, y), line, font=sf, fill=(220, 230, 255))
    y += 48
d.rounded_rectangle([60, 500, W - 60, 570], radius=14, fill=(255, 200, 60))
ff = font(34)
d.text((90, 517), footer, font=ff, fill=(20, 30, 90))
img.save(out, "WEBP", quality=82, method=6)
print(out)
