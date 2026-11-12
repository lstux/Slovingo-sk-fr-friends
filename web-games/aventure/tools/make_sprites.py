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
BAND = (0.13, 0.19)   # bande de la tete (fraction de la hauteur) pour mesurer l'echelle ; changee par personnage
HEIGHT = 440   # hauteur de la pose "debout" dans le jeu, a l'echelle 1 (comme l'ancien sprite)

CHARS = {
    'gab': {
        'poses': {'src': 'sources/gab_sheet_src.png', 'cols': 8, 'rows': 2, 'row': 1,
                  'names': ['idle', 'talk', 'pick', 'use', 'surprised', 'think', 'laugh', 'sit']},
        'walk': {'src': 'sources/gab_walk_src.png', 'cols': 8, 'rows': 1, 'row': 0, 'frames': 4, 'fps': 8},
    },
    'andrea': {
        # deux rangees de poses (16) : row = 'all'
        'poses': {'src': 'sources/andrea_sheet_src.png', 'cols': 8, 'rows': 2, 'row': 'all',
                  'names': ['idle', 'talk', 'arms', 'shy', 'surprised', 'point', 'read', 'look',
                            'think', 'laugh', 'worried', 'whisper', 'wave', 'give', 'pick', 'shrug']},
        'walk': {'src': 'sources/andrea_walk_src.png', 'cols': 8, 'rows': 1, 'row': 0, 'frames': 8, 'fps': 8, 'steps': 2},
        'height': 470,   # un peu plus grande que Gab (oreilles comprises)
        'band': (0.25, 0.31),   # la tete est sous les grandes oreilles
        'out': 'andrea2',       # art/andrea.png et art/andrea_walk.png sont ceux de l'apercu (tram.js)
    },
    'revizor': {
        'poses': {'src': 'sources/revizor_sheet_src.png', 'cols': 8, 'rows': 2, 'row': 1,
                  'names': ['idle', 'ask', 'check', 'nod', 'arms', 'write', 'point', 'salute']},
        'walk': {'src': 'sources/revizor_sheet_src.png', 'cols': 8, 'rows': 2, 'row': 0, 'frames': 8, 'fps': 6, 'steps': 2},   # pas calme
        'height': 500,           # un adulte, plus grand que Gab
        'scale_by': 'height',    # la casquette fausse la largeur de la tete : on compare les hauteurs
        'out': 'revizor2',       # art/revizor.png et revizor_walk.png restent ceux de l'apercu
    },
    'zahradnik': {
        'poses': {'src': 'sources/zahradnik_sheet_src.png', 'cols': 8, 'rows': 2, 'row': 1,
                  'names': ['idle', 'talk', 'shrug', 'point', 'scratch', 'give', 'sky', 'wave']},
        'walk': {'src': 'sources/zahradnik_sheet_src.png', 'cols': 8, 'rows': 2, 'row': 0, 'frames': 8, 'fps': 6, 'steps': 2},
        'height': 470,           # vieux monsieur un peu voute : plus petit que le controleur
        'scale_by': 'height',    # le chapeau fausse la largeur de la tete
    },
    'pan': {
        'poses': {'src': 'sources/pan_sheet_src.png', 'cols': 8, 'rows': 2, 'row': 1,
                  'names': ['idle', 'talk', 'ask', 'watch', 'no', 'tie', 'point', 'car']},
        'walk': {'src': 'sources/pan_sheet_src.png', 'cols': 8, 'rows': 2, 'row': 0, 'frames': 8, 'fps': 7, 'steps': 2},
        'height': 530,           # grand et mince
        'scale_by': 'height',
    },
}

CHARS['pokladnicka'] = {
    # buste derriere un comptoir : 16 poses, un seul cadre commun (tete au meme endroit), pas de marche
    'poses': {'src': 'sources/pokladnicka_sheet_src.png', 'cols': 8, 'rows': 2, 'row': 'all',
              'names': ['idle', 'talk', 'smile', 'type', 'give', 'no', 'point', 'wipe',
                        'read', 'stamp', 'surprised', 'explain', 'watch', 'fan', 'wave', 'wait']},
    'common': True,
    'height': 255,           # hauteur du buste dans le jeu (une adulte de 510 de haut, coupee a la taille)
    'band': (0.08, 0.16),    # le haut du crane (chignon) sert a centrer la tete
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
    rows = range(spec['rows']) if spec['row'] == 'all' else [spec['row']]
    out = []
    for row in rows:
        y0, y1 = int(row * ch), int((row + 1) * ch)
        for c in range(spec['cols']):
            out.append(rgba[y0:y1, int(c * cw):int((c + 1) * cw)])
    return out

def measure(cell):
    m = cell[..., 3] > 128
    ys, xs = np.nonzero(m)
    top, bot = ys.min(), ys.max()
    h = bot - top
    band = [m[top + int(h * f)] for f in np.linspace(*BAND, 7)]
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
    global BAND
    spec = CHARS[cid]
    BAND = spec.get('band', (0.13, 0.19))
    out = spec.get('out', cid)
    pc = cells(spec['poses'])
    if spec.get('common'):
        ref = measure(pc[0]); unit = spec['height'] / (ref['bot'] - ref['top'])
        frames = place([scaled(c, 1.0) for c in pc]); meta = {}
        for name, fr in zip(spec['poses']['names'], frames):
            fr.save(os.path.join(ART, f'{out}_{name}.png'))
        print(json.dumps({'h': round(frames[0].height * unit), 'poses': spec['poses']['names']}, ensure_ascii=False))
        return
    wc = cells(spec['walk'])[: spec['walk']['frames']]
    ref = measure(pc[0])                                   # la pose debout fixe l'echelle
    if spec.get('scale_by') == 'height':
        kw = (ref['bot'] - ref['top']) / np.mean([measure(c)['bot'] - measure(c)['top'] for c in wc])
    else:
        kw = ref['head_w'] / np.mean([measure(c)['head_w'] for c in wc])
    poses = [scaled(c, 1.0) for c in pc]
    walk = [scaled(c, kw) for c in wc]
    unit = spec.get('height', HEIGHT) / (ref['bot'] - ref['top'])   # pixels d'image -> hauteur du jeu
    meta = {'poses': {}, 'walk': {}}
    for name, d in zip(spec['poses']['names'], poses):
        fr = place([d])[0]
        fr.save(os.path.join(ART, f'{out}_{name}.png'))
        meta['poses'][name] = {'img': f'art/{out}_{name}.png', 'h': round(fr.height * unit)}
    frames = place(walk)
    strip = Image.new('RGBA', (frames[0].width * len(frames), frames[0].height), (0, 0, 0, 0))
    for i, f in enumerate(frames):
        strip.alpha_composite(f, (i * f.width, 0))
    strip.save(os.path.join(ART, f'{out}_walk.png'))
    # pas : ecart des pieds a l'image 1 (contact) moins la longueur d'un pied (image de passage)
    def feet(d, f=0.05):
        m = d['mask']; rows = m[d['bot'] - int((d['bot'] - d['top']) * f): d['bot'] + 1]
        xs = np.nonzero(rows.any(0))[0]
        return xs.max() - xs.min()
    stride = feet(walk[0]) - feet(walk[2]) * 0.5
    fps = spec['walk']['fps']
    speed = stride * unit * fps * spec['walk'].get('steps', 1) / len(frames)   # steps : nombre de pas dans la bande
    meta['walk'] = {'img': f'art/{out}_walk.png', 'frames': len(frames), 'fps': fps, 'h': round(frames[0].height * unit), 'speed': round(speed)}
    print(json.dumps(meta, indent=1, ensure_ascii=False))

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'gab')
