"""One-off script to generate optimized web assets in Assets/web/ from the
original source images in Assets/. Not part of the site runtime."""
from PIL import Image
import os

SRC = "Assets"
DST = "Assets/web"
os.makedirs(DST, exist_ok=True)


def save_jpg(im, path, max_w, quality=82):
    im = im.convert("RGB") if im.mode != "RGB" else im
    if im.mode == "RGBA":
        pass
    w, h = im.size
    if w > max_w:
        new_h = round(h * (max_w / w))
        im = im.resize((max_w, new_h), Image.LANCZOS)
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True)
    print(path, im.size, os.path.getsize(path))


def flatten_to_jpg(src_path, dst_path, max_w, quality=82, bg=(10, 10, 12)):
    im = Image.open(src_path)
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        im = im.convert("RGBA")
        background = Image.new("RGB", im.size, bg)
        background.paste(im, mask=im.split()[-1])
        im = background
    else:
        im = im.convert("RGB")
    save_jpg(im, dst_path, max_w, quality)


def save_png(im, path, size):
    im = im.convert("RGBA")
    w, h = im.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    im = im.crop((left, top, left + side, top + side)).resize((size, size), Image.LANCZOS)
    im.save(path, "PNG", optimize=True)
    print(path, im.size, os.path.getsize(path))


# Hero band photo (portrait, used in About hero split layout)
flatten_to_jpg(f"{SRC}/The_Band.png", f"{DST}/band-hero.jpg", max_w=1000, quality=84, bg=(11, 11, 13))

# Secondary band photo (used as fallback / OG image)
flatten_to_jpg(f"{SRC}/Band_Photo.jpeg", f"{DST}/band-photo.jpg", max_w=1200, quality=82)

# Member photos
flatten_to_jpg(f"{SRC}/Harrison_V2.png", f"{DST}/member-harrison.jpg", max_w=600, quality=84, bg=(31, 31, 36))
flatten_to_jpg(f"{SRC}/Anna.png", f"{DST}/member-anna.jpg", max_w=600, quality=84, bg=(31, 31, 36))
flatten_to_jpg(f"{SRC}/Pops.jpg", f"{DST}/member-pops.jpg", max_w=600, quality=84)
flatten_to_jpg(f"{SRC}/Ryan.jpg", f"{DST}/member-ryan.jpg", max_w=600, quality=84)

# Favicon / app icon source (square crop of the logo)
logo = Image.open(f"{SRC}/Logo.png")
save_png(logo, f"{DST}/favicon-512.png", 512)
save_png(logo, f"{DST}/favicon-192.png", 192)
save_png(logo, f"{DST}/favicon-32.png", 32)

print("done")
