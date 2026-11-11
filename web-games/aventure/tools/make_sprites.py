#!/usr/bin/env python3
"""Planches d'animation (fond vert) -> images du jeu : detourage, mise a l'echelle commune, alignement.

  python3 web-games/aventure/tools/make_sprites.py gab

Pour chaque personnage (CHARS ci-dessous) :
- poses : une rangee de la planche (8 cases egales), une image par pose : art/<id>_<pose>.png
- marche : les N premieres cases d'une rangee (un pas), une bande d'images : art/<id>_walk.png
- les deux planches n'ont pas la meme taille de dessin : on les met a la meme echelle en mesurant la largeur de la tete ;
- chaque image a les pieds en bas et la tete centree (l'ancre du sprite dans le jeu est en bas au milieu) ;
- affiche les hauteurs a mettre dans game.js (h, pour une pose "debout" de HEIGHT pixels) et la vitesse de marche
  qui evite que les pieds glissent (en pixels par seconde, a l'echelle 1).
"""
import sys, json, os
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ART = os.path.join(HERE, '..', 'art')
HEIGHT = 440   # hauteur de la pose "debout" dans le jeu, a l'echelle 1 (comme l'ancien sprite)

CHARS = {
    'gab': {
        'poses': {'src': 'sources/gab_sheet_src.png', 'cols': 8, 'rows': 2, 'row': 1,
                  'names': ['idle', 'talk', 'pick', 'use', 'surprised', 'think', 'laugh', 'sit']},
        'walk': {'src': 'sources/gab_walk_src.png', 'cols': 8, 'rows': 1, 'row': 0, 'frames': 4, 'fps': 8},
    },
}

def key(img):
    """fond vert -> transparent (bord doux), et on retire le reflet vert des contours"""
    a = np.asarray(img.convert('RGB')).astype(float)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    gr = g - np.maximum(r, b)
    alpha = np.clip(1 - (gr - 40) / 80, 0, 1)
    g2 = np.where(gr > 0, np.minimum(g, np.maximum(r, b) + 10), g)
    return np.dstack([r, g2, b, alpha * 255]).clip(0, 255).astype(np.uint8)

def cells(spec):
    im = Image.open(os.path.join(ART, spec['src']))
    rgba = key(im)
    H, W = rgba.shape[:2]
    cw, ch = W / spec['cols'], H / spec['rows']
    y0, y1 = int(spec['row'] * ch), int((spec['row'] + 1) * ch)
    out = []
    for c in range(spec['cols']):
        cell = rgba[y0:y1, int(c * cw):int((c + 1) * cw)]
        out.append(cell)
    return out

def measure(cell):
    m = cell[..., 3] > 128
    ys, xs = np.nonzero(m)
    top, bot = ys.min(), ys.max()
    h = bot - top
    band = [m[top + int(h * f)] for f in np.linspace(0.13, 0.19, 7)]
    heads = [(np.nonzero(r)[0].min(), np.nonzero(r)[0].max()) for r in band if r.any()]
    head_w = np.mean([b - a for a, b in heads])
    head_c = np.mean([(a + b) / 2 for a, b in heads])
    return {'top': top, 'bot': bot, 'left': xs.min(), 'right': xs.max(), 'head_w': head_w, 'head_c': head_c, 'mask': m}

def place(cells_scaled, pad=6):
    """meme cadre pour toutes les images : pieds en bas, tete au milieu"""
    left = max(c['head_c'] - c['left'] for c in cells_scaled)
    right = max(c['right'] - c['head_c'] for c in cells_scaled)
    half = int(np.ceil(max(left, right))) + pad
    up = int(np.ceil(max(c['bot'] - c['top'] for c in cells_scaled))) + pad
    frames = []
    for c in cells_scaled:
        canvas = Image.new('RGBA', (2 * half, up + 2), (0, 0, 0, 0))
        im = Image.fromarray(c['img'])
        canvas.alpha_composite(im, (int(round(half - c['head_c'])), int(round(up - c['bot']))))
        frames.append(canvas)
    return frames

def scaled(cell, k):
    im = Image.fromarray(cell)
    if abs(k - 1) > 1e-3:
        im = im.resize((max(1, round(im.width * k)), max(1, round(im.height * k))), Image.LANCZOS)
    arr = np.asarray(im)
    d = measure(arr); d['img'] = arr
    return d

def main(cid):
    spec = CHARS[cid]
    pc = cells(spec['poses'])
    wc = cells(spec['walk'])[: spec['walk']['frames']]
    ref = measure(pc[0])                                   # la pose debout fixe l'echelle
    kw = ref['head_w'] / np.mean([measure(c)['head_w'] for c in wc])
    poses = [scaled(c, 1.0) for c in pc]
    walk = [scaled(c, kw) for c in wc]
    unit = HEIGHT / (ref['bot'] - ref['top'])              # pixels d'image -> hauteur du jeu
    meta = {'poses': {}, 'walk': {}}
    for name, d in zip(spec['poses']['names'], poses):
        fr = place([d])[0]
        fr.save(os.path.join(ART, f'{cid}_{name}.png'))
        meta['poses'][name] = {'img': f'art/{cid}_{name}.png', 'h': round(fr.height * unit)}
    frames = place(walk)
    strip = Image.new('RGBA', (frames[0].width * len(frames), frames[0].height), (0, 0, 0, 0))
    for i, f in enumerate(frames):
        strip.alpha_composite(f, (i * f.width, 0))
    strip.save(os.path.join(ART, f'{cid}_walk.png'))
    # pas : ecart des pieds a l'image 1 (contact) moins la longueur d'un pied (image de passage)
    def feet(d, f=0.05):
        m = d['mask']; rows = m[d['bot'] - int((d['bot'] - d['top']) * f): d['bot'] + 1]
        xs = np.nonzero(rows.any(0))[0]
        return xs.max() - xs.min()
    stride = feet(walk[0]) - feet(walk[2]) * 0.5
    fps = spec['walk']['fps']
    speed = stride * unit * fps / len(frames)
    meta['walk'] = {'img': f'art/{cid}_walk.png', 'frames': len(frames), 'fps': fps, 'h': round(frames[0].height * unit), 'speed': round(speed)}
    print(json.dumps(meta, indent=1, ensure_ascii=False))

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'gab')
