#!/usr/bin/env python3
"""Dessine les images PROVISOIRES du point-and-click (SVG) : decor du tram, ville, controleur, objets.
(Le renard, Andrea et les autres sont decoupes des planches du cours par tools/cut_sprites.py.)

    python3 web-games/aventure/tools/make_placeholder_art.py

Pour les remplacer par de vraies illustrations : deposer un fichier du meme nom (et de meme extension, ou
changer l'extension dans js/tram.js) dans web-games/aventure/art/. Voir art/PROMPTS.md.
"""
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "art")


def write(name, svg):
    with open(os.path.join(OUT, name), "w", encoding="utf-8") as f:
        f.write(svg)


# ---- decor 1280 x 720 : interieur d'un tram (vue de cote)
tram = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
<defs>
 <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1e6cc"/><stop offset="1" stop-color="#d9c9a4"/></linearGradient>
 <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d7f86"/><stop offset="1" stop-color="#4d4f57"/></linearGradient>
 <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8cc8f0"/><stop offset="1" stop-color="#cfe9fa"/></linearGradient>
</defs>
<rect width="1280" height="720" fill="url(#wall)"/>
<rect y="0" width="1280" height="40" fill="#b8392a"/>
<rect y="520" width="1280" height="70" fill="#b8392a"/>
<rect y="590" width="1280" height="130" fill="url(#floor)"/>
<g stroke="#3b3d44" stroke-width="2" opacity=".5">%FLOOR%</g>
<!-- fenetres -->
<g fill="url(#sky)" stroke="#f7f0de" stroke-width="14"><rect x="400" y="150" width="360" height="250"/><rect x="820" y="150" width="360" height="250"/></g>
<g stroke="#f7f0de" stroke-width="8"><line x1="580" y1="150" x2="580" y2="400"/><line x1="1000" y1="150" x2="1000" y2="400"/></g>
<!-- banquettes -->
<g fill="#2f5fa8" stroke="#1d3b6e" stroke-width="4"><rect x="400" y="420" width="360" height="100" rx="14"/><rect x="820" y="420" width="360" height="100" rx="14"/></g>
<!-- porte -->
<rect x="30" y="130" width="180" height="430" fill="#e9dcc0" stroke="#8a7a58" stroke-width="6"/>
<rect x="46" y="150" width="68" height="300" fill="#a9d4ee" stroke="#8a7a58" stroke-width="4"/><rect x="126" y="150" width="68" height="300" fill="#a9d4ee" stroke="#8a7a58" stroke-width="4"/>
<!-- barre et composteur -->
<rect x="278" y="150" width="14" height="420" fill="#e8b820" stroke="#a07c0c" stroke-width="3"/>
<rect x="245" y="400" width="80" height="100" rx="8" fill="#f2c82a" stroke="#a07c0c" stroke-width="4"/>
<rect x="262" y="430" width="46" height="8" fill="#2a2a2a"/><circle cx="285" cy="470" r="8" fill="#6a5a10"/>
<!-- afficheur -->
<rect x="560" y="40" width="240" height="65" rx="8" fill="#16161c" stroke="#555" stroke-width="4"/>
<text x="680" y="82" text-anchor="middle" font-family="monospace" font-size="22" fill="#ffb02e">&gt; Staničné námestie</text>
<text x="640" y="705" text-anchor="middle" font-family="sans-serif" font-size="20" fill="#cfcfd8" opacity=".55">décor provisoire : voir art/PROMPTS.md</text>
</svg>
""".replace("%FLOOR%", "".join(f'<line x1="0" y1="{y}" x2="1280" y2="{y}"/>' for y in range(610, 720, 22)))
write("tram.svg", tram)

# ---- ville qui defile (bande 2400 x 400, boucle)
houses = []
x = 0
cols = ["#e9b9a0", "#f1d58a", "#a9c9a4", "#c9b0d6", "#9ec6e0", "#e8c4b0", "#d8d08a"]
i = 0
while x < 2400:
    w = 170 + (i * 37) % 90
    h = 170 + (i * 53) % 110
    c = cols[i % len(cols)]
    houses.append(f'<rect x="{x}" y="{400-h-40}" width="{w}" height="{h}" fill="{c}" stroke="#6b5a4a" stroke-width="3"/>')
    houses.append(f'<polygon points="{x-6},{400-h-40} {x+w/2},{400-h-90} {x+w+6},{400-h-40}" fill="#b8503a" stroke="#6b5a4a" stroke-width="3"/>')
    for wx in range(x + 22, x + w - 30, 46):
        for wy in range(400 - h - 14, 340, 52):
            houses.append(f'<rect x="{wx}" y="{wy}" width="22" height="30" fill="#7fb0d4" stroke="#6b5a4a" stroke-width="2"/>')
    x += w
    i += 1
scenery = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2400 400" width="2400" height="400">
<rect width="2400" height="400" fill="#a9d8f4"/><rect y="360" width="2400" height="40" fill="#7d7f86"/>
{''.join(houses)}
<rect y="360" width="2400" height="40" fill="#6d6f76"/>
</svg>
"""
write("scenery.svg", scenery)


def person(body, head, extra, ears="", tail=""):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 400" width="200" height="400">
{tail}
<ellipse cx="100" cy="392" rx="46" ry="7" fill="#000" opacity=".18"/>
<rect x="68" y="262" width="26" height="124" rx="10" fill="{extra['legs']}"/><rect x="106" y="262" width="26" height="124" rx="10" fill="{extra['legs']}"/>
<rect x="60" y="372" width="40" height="18" rx="8" fill="{extra['shoes']}"/><rect x="104" y="372" width="44" height="18" rx="8" fill="{extra['shoes']}"/>
<rect x="56" y="140" width="88" height="140" rx="26" fill="{body}"/>
<rect x="34" y="150" width="26" height="100" rx="12" fill="{body}"/><rect x="140" y="150" width="26" height="100" rx="12" fill="{body}"/>
{ears}
<circle cx="100" cy="98" r="52" fill="{head}"/>
{extra['face']}
</svg>
"""


insp_face = '<circle cx="82" cy="96" r="5" fill="#222"/><circle cx="120" cy="96" r="5" fill="#222"/><path d="M84 122 q16 10 34 0" stroke="#7a4030" stroke-width="4" fill="none"/>'
insp_cap = '<rect x="52" y="36" width="96" height="24" rx="10" fill="#1d2f5a"/><rect x="48" y="54" width="104" height="10" rx="4" fill="#12204a"/>'
write("revizor.svg", person("#1d2f5a", "#e9bf9c", {"legs": "#1a2444", "shoes": "#222", "face": insp_face + insp_cap}))


def item(inner):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">{inner}</svg>\n'


ticket = '<g transform="rotate(-12 48 48)"><rect x="12" y="26" width="72" height="44" rx="6" fill="#f2c82a" stroke="#a07c0c" stroke-width="3"/><rect x="22" y="38" width="30" height="6" fill="#a07c0c"/><rect x="22" y="50" width="48" height="5" fill="#a07c0c"/></g>'
write("item_listok.svg", item(ticket))
write("item_listok_ok.svg", item(ticket + '<circle cx="66" cy="66" r="18" fill="#3a9a4a" stroke="#fff" stroke-width="3"/><path d="M57 66 l7 7 l12 -14" stroke="#fff" stroke-width="5" fill="none"/>'))
print("images provisoires ecrites dans", os.path.normpath(OUT))
