#!/usr/bin/env python3
"""Prepare les images generees (art/sources/) pour le jeu : decor et ville en WebP, controleur et objets detoures.

    python3 web-games/aventure/tools/prepare_art.py

  tram_src.png      -> tram.webp       (decor 16:9 recadre/reduit a 1280 x 720)
  scenery_src.jpg   -> scenery.webp    (la ville qui defile, bande panoramique)
  revizor_src.jpg   -> revizor.png     (fond magenta detoure)
  items_src.jpg     -> item_listok.png, item_listok_ok.png (deux objets cote a cote sur fond magenta)
Les personnages du cours (fox.png, andrea.png...) viennent de tools/cut_sprites.py.
"""
import os
import numpy as np
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
ART = os.path.join(HERE, "..", "art")
SRC = os.path.join(ART, "sources")


def key_magenta(im):
    """Retire le fond magenta (aussi les trous enfermes) et le liseré rose des bords ; renvoie une image RGBA."""
    a = np.asarray(im.convert("RGB")).astype(float)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = np.minimum(r, b) - g                      # « magenta-ite » : forte sur le fond, nulle ou negative ailleurs
    alpha = 1 - np.clip((m - 70) / 90, 0, 1)
    # le liseré : sur les pixels a moitie transparents, on retire le rose en ramenant R et B vers G
    spill = np.clip(m, 0, None) * (alpha < 1)
    r = r - spill * 0.8
    b = b - spill * 0.8
    out = np.dstack([r, g, b]).clip(0, 255).astype("uint8")
    al = Image.fromarray((alpha * 255).astype("uint8")).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))
    rgba = Image.fromarray(out).convert("RGBA")
    rgba.putalpha(al)
    return rgba


def crop_alpha(im, pad=2):
    box = im.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
    x0, y0, x1, y1 = box
    return im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))


def main():
    tram = Image.open(os.path.join(SRC, "tram_src.png")).convert("RGB")
    h = round(tram.height * 1280 / tram.width)
    tram = tram.resize((1280, h), Image.LANCZOS)
    if h != 720:   # 16:9 pile : on recadre ou on complete
        tram = tram.crop((0, (h - 720) // 2, 1280, (h - 720) // 2 + 720)) if h > 720 else tram.resize((1280, 720), Image.LANCZOS)
    tram.save(os.path.join(ART, "tram.webp"), quality=86, method=6)

    sc = Image.open(os.path.join(SRC, "scenery_src.jpg")).convert("RGB")
    sc.save(os.path.join(ART, "scenery.webp"), quality=84, method=6)

    for i in range(2, 6):   # troncons de ville supplementaires (facultatifs) : scenery_2_src.jpg ... -> scenery_2.webp
        for ext in ("jpg", "png", "webp"):
            q = os.path.join(SRC, f"scenery_{i}_src.{ext}")
            if os.path.exists(q):
                Image.open(q).convert("RGB").save(os.path.join(ART, f"scenery_{i}.webp"), quality=84, method=6)
                break

    rv = crop_alpha(key_magenta(Image.open(os.path.join(SRC, "revizor_src.jpg"))))
    rv.save(os.path.join(ART, "revizor.png"), optimize=True)

    it = Image.open(os.path.join(SRC, "items_src.jpg")).convert("RGB")
    half = it.width // 2
    for name, box in (("item_listok", (0, 0, half, it.height)), ("item_listok_ok", (half, 0, it.width, it.height))):
        o = crop_alpha(key_magenta(it.crop(box)))
        s = 192 / max(o.size)
        o = o.resize((max(1, round(o.width * s)), max(1, round(o.height * s))), Image.LANCZOS)
        o.save(os.path.join(ART, name + ".png"), optimize=True)
    for f in ("tram.webp", "scenery.webp", "revizor.png", "item_listok.png", "item_listok_ok.png"):
        p = os.path.join(ART, f)
        print(f, Image.open(p).size, os.path.getsize(p) // 1024, "Ko")


if __name__ == "__main__":
    main()
