#!/usr/bin/env python3
"""Planche « Gab grimpe » (fond vert + echelle en aplat magenta) -> deux bandes d'images : art/gab_climb_up.png / gab_climb_down.png

  python3 web-games/aventure/tools/make_climb.py
Le vert et le magenta sont retires (l'echelle est celle du decor). Meme echelle que Gab debout (largeur de tete de la rangee du haut),
pieds en bas, tete centree : memes regles que make_sprites.py.
"""
import os, json, numpy as np
from PIL import Image
import make_sprites as ms

def key2(img):
    a = np.asarray(img.convert('RGB')).astype(float)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    gr = g - np.maximum(r, b)                       # vert
    mg = np.minimum(r, b) - g                       # magenta
    alpha = np.clip(1 - (gr - 40) / 80, 0, 1) * np.clip(1 - (mg - 50) / 70, 0, 1)
    blend = (np.abs(r + g - 255) < 75) & (np.abs(r - b) < 35) & (g > 40)   # vert + magenta fondus sur le bord de l'echelle : gris
    alpha = np.where(blend, 0, alpha)
    g2 = np.where(gr > 0, np.minimum(g, np.maximum(r, b) + 10), g)
    g3 = np.where(mg > 0, np.minimum(np.maximum(g2, np.minimum(r, b) - 25), 255), g2)   # reflet magenta sur les contours
    return np.dstack([r, g3, b, alpha * 255]).clip(0, 255).astype(np.uint8)

def main():
    src = Image.open(os.path.join(ms.ART, 'sources/gab_climb_src.png'))
    rgba = key2(src); H, W = rgba.shape[:2]
    cw, ch = W / 8, H / 2
    rows = [[rgba[int(r * ch):int((r + 1) * ch), int(c * cw):int((c + 1) * cw)] for c in range(8)] for r in range(2)]
    from scipy import ndimage
    def clean(cell):   # on ne garde que la plus grande piece : plus de poussieres de l'echelle
        lab, n = ndimage.label(cell[..., 3] > 40)
        if n > 1:
            big = np.argmax(ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))) + 1
            cell = cell.copy(); cell[..., 3] = np.where(lab == big, cell[..., 3], 0)
        return cell
    rows = [[clean(c) for c in r] for r in rows]
    ms.BAND = (0.13, 0.19)
    ref = ms.measure(ms.cells(ms.CHARS['gab']['poses'])[0])        # Gab debout
    unit = ms.HEIGHT / (ref['bot'] - ref['top'])
    ms.BAND = (0.10, 0.20)
    k = ref['head_w'] / np.mean([ms.measure(c)['head_w'] for c in rows[0]])
    meta = {}
    allf = [ms.scaled(c, k) for r in rows for c in r]
    frames = ms.place(allf, pad=6)
    for name, fr in (('up', frames[:8]), ('down', frames[8:])):
        strip = Image.new('RGBA', (fr[0].width * 8, fr[0].height), (0, 0, 0, 0))
        for i, f in enumerate(fr): strip.alpha_composite(f, (i * f.width, 0))
        strip.save(os.path.join(ms.ART, f'gab_climb_{name}.png'))
        meta[name] = {'img': f'art/gab_climb_{name}.png', 'frames': 8, 'h': round(fr[0].height * unit)}
    print(json.dumps(meta, indent=1))

if __name__ == '__main__':
    main()
