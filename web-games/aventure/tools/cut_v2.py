#!/usr/bin/env python3
"""Decoupe les planches v2 (fond vert #00FF00) en images detourees pour le jeu.

    python3 tools/cut_v2.py            (depuis web-games/aventure)

Chaque planche est une grille de cases egales. Pour un figurant, les deux poses sont recadrees avec le MEME cadre
(pieds alignes), pour qu'elles alternent sans sauter. Prompts : art/PROMPTS_v2.md.
"""
import os
import numpy as np
from PIL import Image

ART = os.path.join(os.path.dirname(__file__), '..', 'art')
SRC = os.path.join(ART, 'sources')
MAX_H = 520   # hauteur maxi des images de sortie (le jeu les met a l'echelle)


def key(im):
    """Fond vert -> transparent. On mesure la « verdeur » relative (g - max(r, b)) / g : le fond est a ~1, un poireau a ~0,35."""
    a = np.asarray(im.convert('RGB')).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    k = (g - np.maximum(r, b)) / np.maximum(g, 1)
    alpha = np.clip((0.85 - k) / (0.85 - 0.6), 0, 1)
    # despill : sur les bords (alpha partiel), on retire le vert en trop
    spill = alpha < 1
    g2 = np.where(spill, np.minimum(g, np.maximum(r, b) + 10), g)
    out = np.dstack([r, g2, b, alpha * 255]).astype(np.uint8)
    return Image.fromarray(out, 'RGBA')


def cells(path, cols, rows):
    im = key(Image.open(path))
    W, H = im.size
    cw, ch = W / cols, H / rows
    return [im.crop((round(c * cw), round(r * ch), round((c + 1) * cw), round((r + 1) * ch))) for r in range(rows) for c in range(cols)]


def bbox(im, pad=6):
    a = np.asarray(im)[..., 3] > 24
    # lignes et colonnes avec assez de pixels : on ignore les poussieres isolees
    rows, cols = np.nonzero(a.sum(1) >= 4)[0], np.nonzero(a.sum(0) >= 4)[0]
    if not len(rows) or not len(cols):
        return None
    # le plus gros bloc continu de lignes (une poussiere loin au-dessus ne compte pas)
    def main_run(idx):
        runs, start = [], idx[0]
        for i, j in zip(idx, idx[1:]):
            if j - i > 12:
                runs.append((start, i)); start = j
        runs.append((start, idx[-1]))
        return max(runs, key=lambda r: r[1] - r[0])
    y0, y1 = main_run(rows)
    x0, x1 = main_run(cols)
    return [max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad + 1), min(im.height, y1 + pad + 1)]


def union(*bbs):
    bbs = [b for b in bbs if b]
    return [min(b[0] for b in bbs), min(b[1] for b in bbs), max(b[2] for b in bbs), max(b[3] for b in bbs)]


def save(im, name, maxh=MAX_H):
    if im.height > maxh:
        im = im.resize((round(im.width * maxh / im.height), maxh), Image.LANCZOS)
    im.save(os.path.join(ART, name + '.png'), optimize=True)
    print(f'{name}.png {im.size}')
    return im


def single(cell, name, maxh=MAX_H):
    return save(cell.crop(bbox(cell)), name, maxh)


def pair(c1, c2, a, b, maxh=MAX_H):
    bb = union(bbox(c1), bbox(c2))
    save(c1.crop(bb), a, maxh)
    save(c2.crop(bb), b, maxh)


def recolor_green(im, rgb=(120, 90, 60)):
    """Ce qui reste de vert franc (antennes du papillon) devient brun."""
    a = np.asarray(im).copy()
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    m = (g > r + 15) & (g > b + 15) & (a[..., 3] > 0)
    a[m, 0], a[m, 1], a[m, 2] = rgb
    return Image.fromarray(a, 'RGBA')


def feather_x(im, frac=0.18, fy=0.3):
    """Bords fondus (le gravier ne fait plus « tapis rectangulaire ») : gauche, droite, et haut/bas."""
    a = np.asarray(im).copy()
    h, w = a.shape[:2]
    def ramp(n_all, f):
        n = max(1, int(n_all * f))
        r = np.ones(n_all)
        r[:n] = np.linspace(0, 1, n)
        r[-n:] = np.linspace(1, 0, n)
        return r
    a[..., 3] = (a[..., 3] * ramp(w, frac)[None, :] * ramp(h, fy)[:, None]).astype(np.uint8)
    return Image.fromarray(a, 'RGBA')


def main():
    # 1. objets de la gare (4 x 2)
    c = cells(os.path.join(SRC, 'objets_gare_src.png'), 4, 2)
    for cell, name, mh in zip(c, ['obj_kiosk', 'obj_fotoautomat', 'obj_okienko', 'obj_flasa', 'item_bankovka', 'item_drobne', 'item_flasa', 'item_flasa_prazdna'],
                              [MAX_H, MAX_H, MAX_H, 200, 160, 160, 160, 160]):
        single(cell, name, mh)
    # 2. figurants de la gare : cerf, brebis, pigeons (la vendeuse vient de sa planche a part)
    c = cells(os.path.join(SRC, 'figurants_gare_src.png'), 4, 2)
    pair(c[2], c[3], 'jelen_a', 'jelen_b')
    pair(c[4], c[5], 'ovca_a', 'ovca_b')
    pair(c[6], c[7], 'holuby_a', 'holuby_b', 260)
    c = cells(os.path.join(SRC, 'figurants_gare_vendeuse_src.png'), 2, 1)
    pair(c[0], c[1], 'predavacka_a', 'predavacka_b')
    # 3. figurants du chapitre 1 : babicka, herisson (lynx et chat : planche refaite)
    c = cells(os.path.join(SRC, 'figurants_ch1_src.png'), 4, 2)
    pair(c[0], c[1], 'babka_a', 'babka_b')
    # la babicka sans son cabas : le cabas devient un objet a part (il bloque l'allee du tram)
    for n in ('babka_a', 'babka_b'):
        im = Image.open(os.path.join(ART, n + '.png'))
        a = np.asarray(im).copy()
        a[205:, 196:, 3] = 0
        Image.fromarray(a, 'RGBA').crop((0, 0, 214, im.height)).save(os.path.join(ART, n + '_bez.png'), optimize=True)
    pair(c[6], c[7], 'jez_a', 'jez_b')
    c = cells(os.path.join(SRC, 'figurants_ch1_lynx_chat_src.png'), 4, 1)
    pair(c[0], c[1], 'rys_a', 'rys_b')
    pair(c[2], c[3], 'macka_a', 'macka_b', 300)
    c = cells(os.path.join(SRC, 'figurants_ch1_chat_boit_src.png'), 2, 1)
    single(c[0], 'macka_ide', 300)
    single(c[1], 'macka_pije', 300)
    # 4. objets du chapitre 1
    c = cells(os.path.join(SRC, 'objets_ch1_src.png'), 4, 2)
    for cell, name, mh in zip(c, ['obj_oznacovac2', 'obj_taska', 'obj_miska', 'obj_miska_plna', 'obj_kamene', 'obj_strk', 'obj_senzor', 'item_pero'],
                              [MAX_H, 300, 160, 160, 300, 200, 160, 160]):
        im = cell.crop(bbox(cell))
        if name == 'obj_strk':
            im = feather_x(im)
        save(im, name, mh)
    # 5. ambiance : vapeur (1re image seulement, le jeu l'anime), serviette, merle, papillon de nuit
    c = cells(os.path.join(SRC, 'ambiance_ch1_src.png'), 4, 2)
    save(recolor_green(c[0].crop(bbox(c[0])), (236, 236, 228)), 'amb_para', 200)
    pair(c[3], c[4], 'amb_uterak_a', 'amb_uterak_b', 300)
    pair(c[5], c[6], 'amb_kos_a', 'amb_kos_b', 200)
    save(recolor_green(c[7].crop(bbox(c[7]))), 'amb_mol', 160)


if __name__ == '__main__':
    main()
