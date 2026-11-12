#!/usr/bin/env python3
"""Planche « Gab grimpe » (fond vert + echelle en aplat magenta) -> deux bandes d'images : art/gab_climb_up.png / gab_climb_down.png

  python3 web-games/aventure/tools/make_climb.py [gab|andrea]
Le vert et le magenta sont retires (l'echelle est celle du decor). Meme echelle que Gab debout (largeur de tete de la rangee du haut),
pieds en bas, tete centree : memes regles que make_sprites.py.
"""
import os, json, numpy as np
from PIL import Image
import make_sprites as ms

def key2(img, dist=False):
    a = np.asarray(img.convert('RGB')).astype(float)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    gr = g - np.maximum(r, b)                       # vert
    mg = np.minimum(r, b) - g                       # magenta
    alpha = np.clip(1 - (gr - 40) / 80, 0, 1) * np.clip(1 - (mg - 50) / 70, 0, 1)
    if dist:   # un vetement vert (la chemise d'Andrea) : on compare a la couleur exacte du fond, pas a « tout ce qui est vert »
        d = np.sqrt((r - 2) ** 2 + (g - 250) ** 2 + (b - 2) ** 2)
        alpha = np.clip((d - 55) / 55, 0, 1) * np.clip(1 - (mg - 50) / 70, 0, 1)
    blend = (np.abs(r + g - 255) < 75) & (np.abs(r - b) < 35) & ((np.abs(g - r) < 45) | (not dist)) & (g > 40)   # vert + magenta fondus sur le bord de l'echelle : gris
    alpha = np.where(blend, 0, alpha)
    g2 = np.where((gr > 0) & ((alpha < 0.98) | (not dist)), np.minimum(g, np.maximum(r, b) + 10), g)
    g3 = np.where(mg > 0, np.minimum(np.maximum(g2, np.minimum(r, b) - 25), 255), g2)   # reflet magenta sur les contours
    return np.dstack([r, g3, b, alpha * 255]).clip(0, 255).astype(np.uint8)

CLIMB = {   # personnage : (planche, bande de tete pour la reference debout, bande de tete dans la planche de grimpe)
    'gab': ('gab', (0.13, 0.19), (0.10, 0.20)),
    'andrea': ('andrea', (0.25, 0.31), (0.25, 0.33)),   # la tete est sous les grandes oreilles
}

def main(cid='gab'):
    _, band_ref, band_climb = CLIMB[cid]
    src = Image.open(os.path.join(ms.ART, f'sources/{cid}_climb_src.png'))
    rgba = key2(src, dist=(cid == 'andrea')); H, W = rgba.shape[:2]
    cw, ch = W / 8, H / 2
    rows = [[rgba[int(r * ch):int((r + 1) * ch), int(c * cw):int((c + 1) * cw)] for c in range(8)] for r in range(2)]
    from scipy import ndimage
    def clean(cell):   # on ne garde que la plus grande piece : plus de poussieres de l'echelle
        m = cell[..., 3] > 40
        if cid == 'andrea':   # fines lignes fantomes (bords de l'echelle) : ouverture puis on ne garde que ce qui touche le personnage
            core = ndimage.binary_opening(m, structure=np.ones((3, 3)), iterations=2)
            m = ndimage.binary_dilation(core, structure=np.ones((3, 3)), iterations=3) & m
        lab, n = ndimage.label(m)
        if n >= 1:
            big = np.argmax(ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))) + 1
            cell = cell.copy(); cell[..., 3] = np.where(lab == big, cell[..., 3], 0)
        return cell
    rows = [[clean(c) for c in r] for r in rows]
    ms.BAND = band_ref
    ref = ms.measure(ms.cells(ms.CHARS[cid]['poses'])[0])        # le personnage debout
    unit = ms.CHARS[cid].get('height', ms.HEIGHT) / (ref['bot'] - ref['top'])
    ms.BAND = band_climb
    k = ref['head_w'] / np.mean([ms.measure(c)['head_w'] for c in rows[0]])
    meta = {}
    allf = [ms.scaled(c, k) for r in rows for c in r]
    frames = ms.place(allf, pad=6)
    for name, fr in (('up', frames[:8]), ('down', frames[8:])):
        strip = Image.new('RGBA', (fr[0].width * 8, fr[0].height), (0, 0, 0, 0))
        for i, f in enumerate(fr): strip.alpha_composite(f, (i * f.width, 0))
        strip.save(os.path.join(ms.ART, f'{cid}_climb_{name}.png'))
        meta[name] = {'img': f'art/{cid}_climb_{name}.png', 'frames': 8, 'h': round(fr[0].height * unit)}
    print(json.dumps(meta, indent=1))

if __name__ == '__main__':
    import sys
    main(sys.argv[1] if len(sys.argv) > 1 else 'gab')
