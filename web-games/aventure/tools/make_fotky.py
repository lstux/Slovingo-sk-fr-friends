#!/usr/bin/env python3
"""Photos du mur du refuge : part de la planche brute de ChatGPT (art/sources/fotky_chata_gen.png), elargit la tranchee
(photo 2 : terre brune ; photo 3 : cicatrice verte) et pose la pelleteuse a la bonne echelle (tranchee aussi large qu'elle).
Ecrit art/sources/fotky_chata_src.png.   python3 tools/make_fotky.py
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ART = os.path.join(os.path.dirname(__file__), '..', 'art')
SRC = os.path.join(ART, 'sources')
X = [21, 740, 1459]          # x des trois images dans la planche (690 x 680, y 22)
P0, P1 = (125, 250), (487, 458)   # de la mare au batiment (coordonnees dans l'image)
W0, W1 = 36, 15              # largeur de la bande en haut / en bas (perspective)

def band(size, w0, w1, ss=4):
    m = Image.new('L', (size[0] * ss, size[1] * ss), 0)
    d = ImageDraw.Draw(m)
    (x0, y0), (x1, y1) = P0, P1
    dx, dy = x1 - x0, y1 - y0
    L = (dx * dx + dy * dy) ** 0.5
    nx, ny = -dy / L, dx / L
    pts = [((x0 + nx * w0 / 2) * ss, (y0 + ny * w0 / 2) * ss), ((x1 + nx * w1 / 2) * ss, (y1 + ny * w1 / 2) * ss),
           ((x1 - nx * w1 / 2) * ss, (y1 - ny * w1 / 2) * ss), ((x0 - nx * w0 / 2) * ss, (y0 - ny * w0 / 2) * ss)]
    d.polygon(pts, fill=255)
    return m.resize(size, Image.LANCZOS).filter(ImageFilter.GaussianBlur(0.7))

def paint(pic, base, edge, w0, w1, seed):
    size = pic.size
    outer = band(size, w0, w1)
    inner = band(size, w0 * 0.78, w1 * 0.7)
    rng = np.random.default_rng(seed)
    noise = rng.normal(0, 7, (size[1], size[0], 1))
    arr = np.asarray(pic).astype(np.float32)
    col_e = np.array(edge, np.float32); col_b = np.array(base, np.float32)
    mo = np.asarray(outer).astype(np.float32)[..., None] / 255
    mi = np.asarray(inner).astype(np.float32)[..., None] / 255
    arr = arr * (1 - mo) + col_e * mo
    arr = arr * (1 - mi) + (col_b + noise) * mi
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

def main():
    sheet = Image.open(os.path.join(SRC, 'fotky_chata_gen.png')).convert('RGB')
    pics = [sheet.crop((x, 22, x + 690, 702)) for x in X]
    pics[1] = paint(pics[1], (148, 92, 52), (96, 58, 34), W0, W1, 1)
    pics[2] = paint(pics[2], (168, 214, 74), (120, 176, 56), W0, W1, 2)
    # la pelleteuse (objets_ch4b, case 6), de la meme largeur que la tranchee, posee a gauche du debut de la bande
    ob = Image.open(os.path.join(SRC, 'objets_ch4b_src.png')).convert('RGB')
    cw, ch = ob.size[0] / 4, ob.size[1] / 2
    cell = ob.crop((round(cw), round(ch), round(2 * cw), round(2 * ch)))
    a = np.asarray(cell).astype(int)
    g = (a[..., 1] > 180) & (a[..., 0] < 120) & (a[..., 2] < 120)
    rgba = Image.fromarray(np.dstack([a.astype(np.uint8), (~g).astype(np.uint8) * 255]), 'RGBA')
    rgba = rgba.crop(rgba.getchannel('A').getbbox())
    w = 46
    ex = rgba.resize((w, round(rgba.height * w / rgba.width)), Image.LANCZOS)
    base = pics[1].convert('RGBA'); base.alpha_composite(ex, (P0[0] - w - 6, P0[1] + 14 - ex.height)); pics[1] = base.convert('RGB')
    out = Image.new('RGB', sheet.size, (0, 255, 0))
    for x, p in zip(X, pics):
        out.paste(p, (x, 22))
    out.save(os.path.join(SRC, 'fotky_chata_src.png'))
    for n, p in zip('abc', pics):
        p.crop((40, 180, 540, 500)).save(f'/tmp/fotky_{n}.png')

if __name__ == '__main__':
    main()
