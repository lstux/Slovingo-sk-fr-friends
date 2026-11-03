#!/usr/bin/env python3
"""Decoupe une planche de marche generee (grille sur fond magenta) en une bande d'images pour le jeu.

    python3 web-games/aventure/tools/cut_walk.py art/sources/fox_walk_src.png art/fox_walk.png --grid 2x4

La planche est une grille LIGNES x COLONNES de cellules egales, dans l'ordre de l'animation (gauche a droite, puis
ligne suivante). Chaque cellule est detouree (fond magenta), puis toutes les images sont posees dans des cellules
de meme taille, pieds en bas, centrees sur le corps. Resultat : une bande horizontale PNG ; le nombre d'images
et la hauteur se declarent dans js/tram.js (walkSheet : { img, frames, fps, h }).
"""
import argparse
import os
import sys

from PIL import Image

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from prepare_art import key_magenta, crop_alpha  # noqa: E402


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("out")
    ap.add_argument("--grid", default="2x4", help="lignes x colonnes (defaut 2x4)")
    ap.add_argument("--margin", type=int, default=8, help="pixels ignores au bord de chaque cellule (traits de grille)")
    ap.add_argument("--first", type=int, default=0, help="ne garder que les N premieres images (si la grille repete les poses)")
    ap.add_argument("--height", type=int, default=600, help="hauteur d'une image de la bande, en pixels")
    a = ap.parse_args()
    rows, cols = (int(v) for v in a.grid.lower().split("x"))
    im = Image.open(a.src).convert("RGB")
    cw, ch = im.width / cols, im.height / rows
    frames = []
    for r in range(rows):
        for c in range(cols):
            m = a.margin
            cell = im.crop((round(c * cw) + m, round(r * ch) + m, round((c + 1) * cw) - m, round((r + 1) * ch) - m))
            frames.append(crop_alpha(key_magenta(cell), pad=0))
    if a.first:
        frames = frames[:a.first]
    W = max(f.width for f in frames)
    H = max(f.height for f in frames)
    sheet = Image.new("RGBA", (W * len(frames), H), (0, 0, 0, 0))
    for i, f in enumerate(frames):
        sheet.paste(f, (i * W + (W - f.width) // 2, H - f.height), f)   # pieds en bas, centre sur le corps
    k = a.height / H
    sheet = sheet.resize((round(W * k) * len(frames), a.height), Image.LANCZOS)
    sheet.save(a.out, optimize=True)
    print(f"{a.out} : {len(frames)} images de {round(W * k)}x{a.height}")


if __name__ == "__main__":
    main()
