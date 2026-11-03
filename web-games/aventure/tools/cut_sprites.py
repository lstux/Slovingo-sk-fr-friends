#!/usr/bin/env python3
"""Decoupe les personnages des planches du cours (docs/illustrations/) en PNG detoures pour le jeu.

    python3 web-games/aventure/tools/cut_sprites.py

Chaque personnage est la vue de trois quarts (tournee vers la droite) de sa planche : le fond creme est retire
(rempli depuis les bords), seul le plus gros element est garde, les bords sont adoucis. Resultat dans art/.
Pour de meilleurs sprites (profil, plus grands), voir art/PROMPTS.md.
"""
import os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
ART = os.path.join(HERE, "..", "art")

# nom -> (planche, boite de decoupe x0, y0, x1, y1)
CUTS = {
    "fox": ("planche-heros.jpg", (215, 40, 440, 650)),
    "andrea": ("planche-heros.jpg", (598, 0, 765, 650)),
    "mato": ("planche-heros.jpg", (1000, 0, 1225, 650)),
    "katka": ("planche-heros.jpg", (1380, 250, 1530, 650)),
    "zuzana": ("planche-seconds-roles.jpg", (255, 0, 490, 500)),
    "marek": ("planche-seconds-roles.jpg", (785, 20, 1010, 500)),
    "jan": ("planche-seconds-roles.jpg", (400, 500, 730, 1000)),
    "orol": ("planche-seconds-roles.jpg", (1290, 240, 1520, 950)),
}


def cut(src, box, tol=34):
    im = Image.open(src).convert("RGB").crop(box)
    a = np.asarray(im).astype(int)
    bg = np.median(np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]), axis=0)
    cand = np.abs(a - bg).sum(axis=2) < tol * 1.6
    lab, n = ndimage.label(cand)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    is_bg = np.isin(lab, list(edge))
    fg = ~is_bg
    lab, n = ndimage.label(fg)
    if n == 0:
        raise SystemExit("rien trouve dans " + src)
    sizes = ndimage.sum(fg, lab, range(1, n + 1))
    fg = lab == (1 + int(np.argmax(sizes)))
    # les petits trous (reflets, blanc des yeux) sont combles ; les grands (entre les jambes) restent transparents
    holes = ndimage.binary_fill_holes(fg) & ~fg
    hl, hn = ndimage.label(holes)
    for i in range(1, hn + 1):
        if (hl == i).sum() < 500:
            fg |= hl == i
    fg = ndimage.binary_erosion(fg, iterations=1)
    alpha = Image.fromarray((fg * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(0.8))
    out = im.convert("RGBA")
    out.putalpha(alpha)
    return out.crop(out.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())


def main():
    for name, (sheet, box) in CUTS.items():
        out = cut(os.path.join(REPO, "docs", "illustrations", sheet), box)
        out.save(os.path.join(ART, name + ".png"), optimize=True)
        print(f"{name}.png  {out.size[0]}x{out.size[1]}")


if __name__ == "__main__":
    main()
