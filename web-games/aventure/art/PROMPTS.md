# Images de « Zajko — V električke » (point-and-click)

Toutes les images du jeu sont **remplaçables sans toucher au code** : il suffit de déposer un fichier
du même nom dans ce dossier (ou de changer le nom dans `js/tram.js`). Les images actuelles sont
**provisoires** (`python3 web-games/aventure/tools/make_placeholder_art.py` les redessine).

## Règles

- Format **16:9 paysage** (1920 × 1080 ou plus), caméra fixe à hauteur de personnage, sol dégagé
  dans le tiers du bas (c'est là que les personnages marchent).
- **Jamais de texte, de panneau lisible ni de personnage dans le décor** : le texte est ajouté par le
  jeu, les personnages sont des images séparées.
- Une seule direction de lumière. Générer 4 variantes, garder la plus claire.
- Le premier décor validé sert de **référence de style** (le joindre aux suivants).
- Formats : `.webp` ou `.png` pour les décors (viser < 400 Ko), `.png` détouré pour les personnages
  et objets (fond magenta `#FF00FF` à détourer, ou transparent).

## Les images

| fichier | contenu | source |
| --- | --- | --- |
| `tram.svg` → `tram.webp` | décor : intérieur du tram | prompt « Décor 1 » |
| `scenery.svg` → `scenery.webp` | la ville qui défile derrière les vitres (bande ~4:1, bouclable) | prompt « Ville qui défile » |
| `fox.svg`, `andrea.svg`, `revizor.svg` | personnages debout, de profil, pieds en bas | prompt « Personnages » |
| `item_listok*.svg` | objets de l'inventaire (96 × 96) | prompt « Objets » |

## Prompt de style (à mettre en tête de chaque décor)

```
Hand-painted 2D point-and-click adventure game background in the style of Broken Sword (Les Chevaliers de Baphomet), 1990s Revolution Software: rich gouache and ink illustration, warm saturated colours, soft painterly shading, clean dark outlines, slightly stylised proportions. Wide 16:9 landscape, fixed side-on camera at eye level, the floor fills the bottom third and stays clear and empty. No text, no letters, no logos, no signs with readable writing, no people, no animals, no watermark.
```

## Décor 1 : l'intérieur du tram de Košice

```
[prompt de style]
Scene: the inside of a red-and-cream Tatra tram in Košice, Slovakia, seen from the middle of the aisle, side-on. Left: a double door with glass panes and a yellow vertical handrail pole next to it, with a small yellow ticket validator box mounted on the pole. Centre and right: two large tram windows in cream frames, the glass panes showing flat light blue sky only (the city will be added by the game). Blue fabric bench seats under the windows. Above the centre, a small black rectangular passenger information display, blank. Grey ribbed rubber floor, clear and empty in the lower third. Warm afternoon daylight coming through the windows. Cosy, slightly nostalgic mood. Window glass completely plain, no reflections, no buildings outside.
```

Une fois l'image déposée, **redessiner les zones** avec `tools/editor.html` (portes, composteur,
afficheur, fenêtres, sol, vitres) et copier le résultat dans `js/tram.js`.

## Ville qui défile (dans les vitres)

```
[prompt de style]
A very wide panoramic strip (about 4:1 landscape) of a street in Košice seen from a moving tram: historic pastel facades, the cathedral in the distance, trees, a bright summer sky. Perfectly seamless left and right edges so it can loop horizontally. No people, no text.
```

## Personnages (joindre la référence : `esp32/zajka-quest/art/characters/`)

```
[prompt de style]
Keep EXACTLY the same character as the attached reference image. Full-body character, standing upright on two legs, neutral relaxed pose, viewed side-on facing right, feet at the very bottom of the image, whole body visible with margin. Flat solid magenta #FF00FF background everywhere, no ground, no shadow, no text.
```

- Renard : `fox-reference.png` ; Andrea : `andrea-reference.png`.
- Revízor : adulte, uniforme bleu marine, casquette, badge, sourire sérieux.
- Même consigne de cadrage pour tous, pour que les échelles restent cohérentes.

## Objets (ticket, ticket validé…)

Même style, un objet centré, vue de face, fond magenta uni, sans texte.
