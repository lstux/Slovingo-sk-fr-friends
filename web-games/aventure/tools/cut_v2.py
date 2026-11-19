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


def photos(path, names):
    """Les photos du telephone : des rectangles a bord blanc sur fond vert, cote a cote. On coupe sur les colonnes vertes."""
    im = Image.open(path).convert('RGB')
    a = np.asarray(im).astype(int)
    green = (a[..., 1] > 200) & (a[..., 0] < 80) & (a[..., 2] < 80)
    col = (~green).sum(0) > a.shape[0] * 0.3
    runs, x = [], 0
    while x < len(col):
        if col[x]:
            x0 = x
            while x < len(col) and col[x]:
                x += 1
            if x - x0 > 50:
                runs.append((x0, x))
        x += 1
    assert len(runs) == len(names), runs
    for (x0, x1), n in zip(runs, names):
        rows = np.nonzero((~green[:, x0:x1]).sum(1) > (x1 - x0) * 0.3)[0]
        crop = im.crop((x0, rows[0], x1, rows[-1] + 1))
        crop.save(os.path.join(ART, n + '.jpg'), quality=88)
        print(f'{n}.jpg {crop.size}')


def urad_bg():
    """Le decor du bureau sans son ventilateur peint (le jeu l'anime par-dessus) : le plafond a des lattes horizontales,
    on refait chaque ligne en melangeant la couleur prise a gauche et a droite du ventilateur."""
    im = Image.open(os.path.join(SRC, 'urad_wide_src.png')).convert('RGB')
    a = np.asarray(im).astype(np.float32).copy()
    x0, x1, y0, y1 = 1068, 1398, 6, 152
    L, R = a[y0:y1, x0 - 6:x0 - 2].mean(1), a[y0:y1, x1 + 2:x1 + 6].mean(1)
    t = np.linspace(0, 1, x1 - x0)[None, :, None]
    a[y0:y1, x0:x1] = L[:, None, :] * (1 - t) + R[:, None, :] * t
    out = Image.fromarray(a.clip(0, 255).astype(np.uint8)).resize((2160, 720), Image.LANCZOS)
    out.save(os.path.join(ART, 'urad_wide.webp'), quality=88)
    print('urad_wide.webp (ventilateur peint retire)')


def chapter2():
    urad_bg()
    c = cells(os.path.join(SRC, 'figurants_ch2_src.png'), 4, 2)
    pair(c[0], c[1], 'bobor_a', 'bobor_b')
    pair(c[2], c[3], 'veverica_a', 'veverica_b')
    pair(c[6], c[7], 'bocian_a', 'bocian_b')
    c = cells(os.path.join(SRC, 'figurants_ch2_diviak_src.png'), 2, 1)
    pair(c[0], c[1], 'diviak_a', 'diviak_b')
    c = cells(os.path.join(SRC, 'objets_ch2_src.png'), 4, 2)
    for i, name, mh in [(0, 'item_cislo', 160), (1, 'obj_dosier', 260), (3, 'obj_pero_retiazka', 220), (4, 'obj_vedro', 220),
                        (5, 'obj_kohutik', 220), (6, 'obj_hodiny', 260), (7, 'item_listok_0l', 160)]:
        single(c[i], name, mh)
    c = cells(os.path.join(SRC, 'objets_ch2_dossier_src.png'), 1, 1)
    single(c[0], 'obj_dosier_otvoreny', 700)
    photos(os.path.join(SRC, 'fotky_src.png'), ['fotka_1', 'fotka_2', 'fotka_3', 'fotka_4', 'fotka_5'])
    # cette planche ne respecte pas la grille : on decoupe par cadres mesures (meme taille pour les images d'une meme animation)
    am = key(Image.open(os.path.join(SRC, 'ambiance_ch2_src.png')))
    def frames(boxes, names, maxh):
        w = max(x1 - x0 for x0, y0, x1, y1 in boxes) + 12
        h = max(y1 - y0 for x0, y0, x1, y1 in boxes) + 12
        for (x0, y0, x1, y1), n in zip(boxes, names):
            cx, by = (x0 + x1) // 2, y1 + 6   # centre en x, cale en bas
            save(am.crop((cx - w // 2, by - h, cx - w // 2 + w, by)), n, maxh)
    frames([(32, 50, 421, 296), (468, 50, 876, 312), (911, 50, 1311, 314)], ['amb_ventilator_1', 'amb_ventilator_2', 'amb_ventilator_3'], 300)
    frames([(1367, 60, 1707, 319), (1797, 135, 2089, 322)], ['amb_postrekovac_a', 'amb_postrekovac_b'], 200)
    frames([(273, 409, 517, 634), (738, 490, 973, 635)], ['amb_osa_a', 'amb_osa_b'], 120)
    save(am.crop((1160, 422, 1466, 658)), 'obj_jablko', 140)


def chapter3():
    for n in ('raj_chata_wide', 'raj_jazero_wide'):
        im = Image.open(os.path.join(SRC, n + '_src.png')).convert('RGB').resize((2160, 720), Image.LANCZOS)
        im.save(os.path.join(ART, n + '.webp'), quality=88)
        print(n + '.webp')
    # le castor du barrage : chaque pose a son cadre (le jeu donne la hauteur de chaque pose, tools : BOBOR2_POSES dans game.js)
    c = cells(os.path.join(SRC, 'bobor_hradza_sheet_src.png'), 4, 2)
    for cell, name in zip(c, ['nie', 'talk', 'hammer', 'look', 'taste', 'nod', 'point', 'swim']):
        bb = bbox(cell)
        im = cell.crop(bb)
        print('  h', name, bb[3] - bb[1])
        save(im, 'bobor2_' + name, 460)
    c = cells(os.path.join(SRC, 'figurants_ch3_src.png'), 4, 2)
    pair(c[0], c[1], 'jezkovia_a', 'jezkovia_b', 420)
    # la famille de chamois : trois personnages separes par du vide, on prend tout ce qui n'est pas transparent
    full = lambda im: list(im.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox())
    bb = union(full(c[2]), full(c[3]))
    save(c[2].crop(bb), 'kamzik_a', 440); save(c[3].crop(bb), 'kamzik_b', 440)
    pair(c[4], c[5], 'sojka_a', 'sojka_b', 260)
    pair(c[6], c[7], 'jazvecik_a', 'jazvecik_b', 260)
    c = cells(os.path.join(SRC, 'figurants_ch3b_src.png'), 4, 2)
    pair(c[0], c[1], 'volavka_a', 'volavka_b', 360)
    pair(c[2], c[3], 'bobriky_a', 'bobriky_b', 240)
    pair(c[4], c[5], 'orol_caj', 'orol_hrnok', 460)
    pair(c[6], c[7], 'zaba_a', 'zaba_b', 220)
    c = cells(os.path.join(SRC, 'objets_ch3_src.png'), 4, 2)
    ic = c[1].crop(bbox(c[1]))
    save(ic, 'item_palica', 160)
    lying = ic.rotate(-52, resample=Image.BICUBIC, expand=True)
    save(lying.crop(bbox(lying)), 'obj_palica', 200)
    for i, name, mh in [(2, 'obj_siska', 120), (3, 'item_siska', 160), (4, 'obj_sipka', 200), (5, 'obj_muchotravka', 200),
                        (6, 'obj_register', 300), (7, 'obj_register_otvoreny', 700)]:
        single(c[i], name, mh)
    c = cells(os.path.join(SRC, 'prises_ch3_src.png'), 3, 2)
    for i, name in enumerate(['prisa_skoba', 'prisa_priecka', 'prisa_koren', 'prisa_mach', 'labky_drzia', 'labky_hladaju']):
        single(c[i], name, 360)
    c = cells(os.path.join(SRC, 'ambiance_ch3_src.png'), 4, 2)
    pair(c[0], c[1], 'amb_motyl_a', 'amb_motyl_b', 90)
    pair(c[2].transpose(Image.FLIP_LEFT_RIGHT), c[3], 'amb_vlajka_a', 'amb_vlajka_b', 200)
    single(c[6], 'amb_list', 80)
    single(c[7], 'amb_kruhy', 120)


def chapter4():
    for n, size in (('tatry_chata_vecer', (2160, 720)), ('tatry_chata_rano', (2160, 720)), ('tatry_izba', (2160, 720))):
        im = Image.open(os.path.join(SRC, n + '_src.png')).convert('RGB').resize(size, Image.LANCZOS)
        im.save(os.path.join(ART, n + '.webp'), quality=88)
        print(n + '.webp')
    k = Image.open(os.path.join(SRC, 'tatry_kuchyna_src.png')).convert('RGB').resize((1920, 1080), Image.LANCZOS)
    k.save(os.path.join(ART, 'tatry_kuchyna.webp'), quality=88)
    # les trois photos du mur : trois carres separes par du vert
    ph = Image.open(os.path.join(SRC, 'fotky_chata_src.png')).convert('RGB')
    for x0, n in zip((21, 740, 1459), ('foto_a', 'foto_b', 'foto_c')):
        ph.crop((x0, 22, x0 + 690, 702)).save(os.path.join(ART, n + '.webp'), quality=90)
        print(n + '.webp')
    c = cells(os.path.join(SRC, 'chatar_sheet_src.png'), 4, 2)
    for cell, name in zip(c, ['worry', 'talk', 'laugh', 'frame', 'candle', 'walk', 'cross', 'wink']):
        single(cell, 'chatar_' + name, 460)
    c = cells(os.path.join(SRC, 'pan_mokry_sheet_src.png'), 4, 2)
    for cell, name in zip(c, ['door', 'talk', 'lean', 'look', 'tea', 'sleep', 'card', 'shake']):
        single(cell.transpose(Image.FLIP_LEFT_RIGHT), 'panm_' + name, 460)   # la planche le montre tourne a gauche : on le retourne (le jeu : toujours vers la droite)
    c = cells(os.path.join(SRC, 'figurants_ch4_src.png'), 3, 2)
    pair(c[0], c[3], 'bernardin_a', 'bernardin_b', 220)
    pair(c[1], c[4], 'turisti_a', 'turisti_b', 330)
    pair(c[2], c[5], 'svist_a', 'svist_b', 300)
    c = cells(os.path.join(SRC, 'objets_ch4_src.png'), 4, 2)
    for i, name, mh in [(0, 'obj_sviecka', 220), (1, 'obj_zapalky_mokre', 120), (2, 'obj_plechovka', 130), (3, 'item_zapalky', 130),
                        (4, 'obj_kanvica', 200), (5, 'item_salka', 130), (6, 'obj_salky', 220), (7, 'item_poistka', 120)]:
        single(c[i], name, mh)
    c = cells(os.path.join(SRC, 'objets_ch4b_src.png'), 4, 2)
    for i, name, mh in [(0, 'obj_taska_andrea', 160), (1, 'obj_tenisky', 160), (2, 'obj_vizitka', 90), (3, 'obj_ponozky', 200),
                        (4, 'item_lupa', 180), (5, 'obj_bager', 160), (6, 'item_mapa', 180), (7, 'obj_ram', 200)]:
        single(c[i], name, mh)
    c = cells(os.path.join(SRC, 'ambiance_ch4_src.png'), 4, 2)
    pair(c[0], c[1], 'amb_blesk_a', 'amb_blesk_b', 620)
    pair(c[2], c[3], 'amb_dazd_a', 'amb_dazd_b', 360)
    pair(c[4], c[5], 'amb_plamen_a', 'amb_plamen_b', 120)
    pair(c[6], c[7], 'amb_piecka_a', 'amb_piecka_b', 260)
    fix_ch4()


def _load(name):
    return np.asarray(Image.open(os.path.join(ART, name + '.png')).convert('RGBA')).astype(np.float32)


def _store(name, arr):
    Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), 'RGBA').save(os.path.join(ART, name + '.png'), optimize=True)


def fix_ch4():
    """Les halos et la vapeur dessines sur fond vert restent verts apres detourage : on les nettoie."""
    # lueur verte autour d'une flamme : on la fait disparaitre
    for n in ('obj_sviecka', 'chatar_candle', 'amb_plamen_a', 'amb_plamen_b'):
        a = _load(n); r, g, b = a[..., 0], a[..., 1], a[..., 2]
        gr = g - np.maximum(r, b)
        a[..., 3] *= np.clip(1 - (gr - 6) / 30, 0, 1)
        a[..., 1] = np.minimum(g, np.maximum(r, b) + 6)
        _store(n, a)
    # eclair : blanc chaud, transparence selon le bleu (le fond vert n'en a pas, le coeur blanc en a beaucoup)
    for n in ('amb_blesk_a', 'amb_blesk_b'):
        a = _load(n); b = a[..., 2]
        al = np.clip((b - 40) / 170, 0, 1) ** 0.8
        a[..., 0], a[..., 1], a[..., 2] = 255, 252, 235
        a[..., 3] = al * 255
        _store(n, a)
    # pluie sur la vitre : bleu-blanc, meme principe
    for n in ('amb_dazd_a', 'amb_dazd_b'):
        a = _load(n); b = a[..., 2]
        al = np.clip((b - 60) / 160, 0, 1)
        a[..., 0], a[..., 1], a[..., 2] = 205, 228, 255
        a[..., 3] = al * 235
        _store(n, a)
    # vapeur des tasses : verte -> blanche
    a = _load('obj_salky'); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = (g - np.maximum(r, b)) > 14
    for i, v in enumerate((236, 240, 240)):
        a[..., i] = np.where(m, v, a[..., i])
    a[..., 3] = np.where(m, a[..., 3] * 0.55, a[..., 3])
    _store('obj_salky', a)


def chapter5():
    for n in ('dedina_potok', 'dedina_kuchyna', 'dedina_zadok'):
        im = Image.open(os.path.join(SRC, n + '_wide_src.png')).convert('RGB').resize((2160, 720), Image.LANCZOS)
        im.save(os.path.join(ART, n + '.webp'), quality=88)
        print(n + '.webp')
    def sheet(src, names, h, flip=False):
        c = cells(os.path.join(SRC, src), 4, 2)
        for cell, name in zip(c, names):
            single(cell.transpose(Image.FLIP_LEFT_RIGHT) if flip else cell, name, h)
    sheet('mato_sheet_src.png', ['mato_count', 'mato_scratch', 'mato_pull', 'mato_listen', 'mato_shh', 'mato_eat', 'mato_cheer', 'mato_belly'], 520)
    sheet('katka_sheet_src.png', ['katka_type', 'katka_film', 'katka_call', 'katka_point', 'katka_silent', 'katka_show', 'katka_charge', 'katka_stunned'], 420)
    sheet('babka_dedina_sheet_src.png', ['zuz_stir', 'zuz_spoon', 'zuz_ladle', 'zuz_back', 'zuz_laugh', 'zuz_glass', 'zuz_arms', 'zuz_wave'], 460)
    sheet('starosta_sheet_src.png', ['starosta_open', 'starosta_phone', 'starosta_thumb', 'starosta_pat', 'starosta_walk', 'starosta_wipe', 'starosta_shake', 'starosta_car'], 460, flip=True)   # tourne a gauche sur la planche : le jeu veut toujours vers la droite
    c = cells(os.path.join(SRC, 'figurants_ch5_src.png'), 3, 2)
    pair(c[0], c[3], 'ovca_zvonec_a', 'ovca_zvonec_b', 200)
    pair(c[1], c[4], 'ovca_hneda_a', 'ovca_hneda_b', 200)
    pair(c[2], c[5], 'ovca_uviaznuta', 'ovca_volna', 200)
    c = cells(os.path.join(SRC, 'figurants_ch5b_src.png'), 3, 2)
    pair(c[0], c[3], 'kohut_a', 'kohut_b', 200)
    pair(c[1], c[4], 'kozol_a', 'kozol_b', 300)
    pair(c[2], c[5], 'sliepky_a', 'sliepky_b', 160)
    im = key(Image.open(os.path.join(SRC, 'figurants_ch5c_src.png')))
    W, H = im.size
    cw, ch = W / 3, H / 2
    cl = [im.crop((0, r * round(ch), round(cw), (r + 1) * round(ch))) for r in range(2)]
    pair(cl[0], cl[1], 'pes_a', 'pes_b', 130)
    tr = [recolor_green(im.crop((round(cw), r * round(ch), W, (r + 1) * round(ch)))) for r in range(2)]
    pair(tr[0], tr[1], 'traktor_a', 'traktor_b', 360)
    c = cells(os.path.join(SRC, 'objets_ch5_src.png'), 4, 2)
    for i, name, mh in [(0, 'item_list', 150), (1, 'item_pohar', 170), (2, 'obj_halusky_a', 150), (3, 'obj_halusky_b', 150),
                        (4, 'obj_halusky_c', 150), (5, 'item_uzlik', 120), (6, 'item_nabijacka', 140), (7, 'obj_optika', 90)]:
        single(c[i], name, mh)
    fix_ch5()


def fix_ch5():
    """Le verre et le boitier sont proches du fond : on verifie qu'il ne reste pas de halo vert."""
    for n in ('item_list', 'item_pohar', 'obj_halusky_a', 'obj_halusky_b', 'obj_halusky_c', 'item_uzlik', 'obj_optika', 'zuz_glass'):
        a = _load(n); r, g, b = a[..., 0], a[..., 1], a[..., 2]
        m = (g - np.maximum(r, b)) > 12
        a[..., 1] = np.where(m, np.maximum(r, b) + 4, g)
        _store(n, a)


def chapter5b():
    """Voiture du maire (flip : regarde a gauche sur la planche), fond du site, petites animations."""
    c = cells(os.path.join(SRC, 'auto_starosta_src.png'), 1, 2)
    flip = [x.transpose(Image.FLIP_LEFT_RIGHT) for x in c]
    pair(flip[0], flip[1], 'auto_starosta_a', 'auto_starosta_b', 260)
    im = Image.open(os.path.join(SRC, 'web_fond_src.png')).convert('RGB')
    im.save(os.path.join(ART, 'web_fond.webp'), quality=90)
    c = cells(os.path.join(SRC, 'anim_ch5_src.png'), 4, 2)
    pair(c[0], c[1], 'fum_a', 'fum_b', 200)
    pair(c[2], c[3], 'budka_a', 'budka_b', 220)
    pair(c[4], c[5], 'motyl5_a', 'motyl5_b', 120)
    single(c[6], 'kvapka', 70)
    single(c[7], 'kruhy', 60)


def chapter6():
    """Chapitre 6 « Le portail » : 3 decors, Marek, pompier et gardien, figurants, objets, animations."""
    # la rue inondee : on efface la baignoire du decor (le jeu affiche la sienne) en recopiant la palissade et l'eau d'a cote
    im = Image.open(os.path.join(SRC, 'povoden_ulica_wide_src.png')).convert('RGB')
    blk = im.crop((990, 470, 1061, 562))
    for x in range(1061, 1206, 71):
        im.paste(blk, (x, 470))
    im.resize((2160, 720), Image.LANCZOS).save(os.path.join(ART, 'povoden_ulica.webp'), quality=88)
    for n in ('brana_parkovisko', 'za_budovou'):
        Image.open(os.path.join(SRC, n + '_wide_src.png')).convert('RGB').resize((2160, 720), Image.LANCZOS).save(os.path.join(ART, n + '.webp'), quality=88)
    print('decors ch6')
    c = cells(os.path.join(SRC, 'marek_sheet_src.png'), 4, 2)
    for cell, n in zip(c, ['run', 'key', 'point', 'tea', 'blanket', 'shrug', 'tired', 'guilty']):
        single(cell, 'marek_' + n, 520)
    c = cells(os.path.join(SRC, 'hasic_strazca_sheet_src.png'), 4, 2)
    for cell, n in zip(c[:7], ['hasic_wave', 'hasic_point', 'hasic_hook', 'hasic_give', 'strazca_cross', 'strazca_stop', 'strazca_shrug']):
        single(cell, n, 520)
    c = cells(os.path.join(SRC, 'figurants_ch6_src.png'), 3, 2)
    pair(c[0], c[3], 'mys6_a', 'mys6_b', 300)
    pair(c[1], c[4], 'zajace6_a', 'zajace6_b', 300)
    pair(c[2], c[5], 'macka6_a', 'macka6_b', 300)
    c = cells(os.path.join(SRC, 'figurants_ch6b_src.png'), 3, 2)
    pair(c[0], c[3], 'kacica6_a', 'kacica6_b', 300)
    pair(c[1], c[4], 'skupina6_a', 'skupina6_b', 340)
    pair(c[2], c[5], 'jezkovia6_a', 'jezkovia6_b', 300)
    c = cells(os.path.join(SRC, 'objets_ch6_src.png'), 4, 2)
    for i, n, h in [(0, 'obj_chladnicka', 220), (1, 'obj_vana', 200), (2, 'obj_vana_chl', 240), (3, 'item_teplomer', 160),
                    (4, 'item_lano', 140), (5, 'item_hak', 200), (6, 'item_meradlo', 200), (7, 'item_kosik', 160)]:
        single(c[i], n, h)
    c = cells(os.path.join(SRC, 'objets_ch6b_src.png'), 4, 2)
    for i, n, h in [(0, 'obj_termoska', 160), (1, 'item_caj', 160), (2, 'item_deka_l', 150), (3, 'item_deka_m', 130),
                    (4, 'item_deka_s', 110), (5, 'obj_brana', 400), (6, 'obj_beton', 260), (7, 'obj_beton_labka', 260)]:
        single(c[i], n, h)
    c = cells(os.path.join(SRC, 'ambiance_ch6_src.png'), 4, 2)
    for i, n, h in [(0, 'majak_a', 160), (1, 'majak_b', 160), (2, 'plav_vedro', 120), (3, 'plav_stolicka', 140),
                    (4, 'plav_lopta', 110), (5, 'para6_a', 300), (6, 'para6_b', 300), (7, 'voda_spl', 220)]:
        single(c[i], n, h)
    c = cells(os.path.join(SRC, 'ambiance_ch6b_src.png'), 4, 2)
    for i, n, h in [(2, 'kamera_a', 140), (3, 'kamera_b', 140), (4, 'deka_para_a', 160), (5, 'deka_para_b', 160)]:
        single(c[i], n, h)
    # la fenetre : seulement l'interieur (les deux carreaux), redresse en rectangle ; le jet : seulement l'eau, sous le tuyau
    for i, n in [(0, 'okno_svetlo'), (1, 'okno_marek')]:
        cell = c[i]; bb = bbox(cell)
        save(cell.crop((bb[0] + 30, bb[1] + 48, bb[2] - 40, bb[3] - 34)).convert('RGB').convert('RGBA'), n, 200)
    for i, n in [(6, 'rura_voda_a'), (7, 'rura_voda_b')]:
        cell = c[i]; bb = bbox(cell)
        save(cell.crop((bb[0] + 125, bb[1] + 112, bb[2], bb[3])), n, 260)
    fix_ch6()


def fix_ch6():
    """Les vapeurs vert menthe deviennent blanches ; on enleve les restes de vert."""
    for n in ('item_caj', 'deka_para_a', 'deka_para_b', 'para6_a', 'para6_b', 'majak_a', 'majak_b', 'voda_spl', 'rura_voda_a', 'rura_voda_b'):
        a = _load(n); r, g, b = a[..., 0], a[..., 1], a[..., 2]
        m = (g > r + 6) & (g > b + 6) & (a[..., 3] > 0)
        light = (r + g + b) / 3 > 150
        a[..., 0] = np.where(m & light, 236, r); a[..., 1] = np.where(m & light, 240, g); a[..., 2] = np.where(m & light, 244, b)
        a[..., 1] = np.where(m & ~light, np.maximum(r, b) + 4, a[..., 1])
        _store(n, a)


if __name__ == '__main__':
    import sys
    if 'ch6' in sys.argv:
        chapter6()
    elif 'ch5b' in sys.argv:
        chapter5b()
    elif 'ch5' in sys.argv:
        chapter5()
    elif 'ch4' in sys.argv:
        chapter4()
    elif 'ch3' in sys.argv:
        chapter3()
    elif 'ch2' in sys.argv:
        chapter2()
    else:
        main()
        chapter2()
        chapter3()
