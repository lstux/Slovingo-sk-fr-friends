# Images de « Zajko — V električke » (point-and-click) : prompts ChatGPT

Même méthode que `docs/Prompts-illustrations.md` : nouvelle conversation par image, on **joint les
images indiquées**, on colle le prompt (complet, rien d'autre à ajouter), on dépose le résultat dans
ce dossier. Le style est celui du cours (dessin animé 2D, contours à l'encre, aplats avec ombrage
cel, décors peints) : les décors du jeu et les illustrations du cours se ressemblent.

## Ce qu'il faut générer (et ce qu'on a déjà)

| fichier à déposer | contenu | images à joindre | état |
| --- | --- | --- | --- |
| `tram.webp` (remplace `tram.svg`) | décor : le tram vide, vue de côté | `img/illus_01_kosice.jpg` | **à générer** |
| `scenery.webp` (remplace `scenery.svg`) | la ville qui défile derrière les vitres | `img/illus_01_kosice.jpg` | **à générer** |
| `revizor.png` (remplace `revizor.svg`) | le contrôleur, humain, détouré | `docs/illustrations/planche-heros.jpg` + `img/illus_01_kosice.jpg` | **à générer** |
| `item_listok.png`, `item_listok_ok.png` | ticket, ticket validé | aucune | **à générer** |
| `fox.png`, `andrea.png`, `mato.png`, `katka.png`, `zuzana.png`, `marek.png`, `jan.png`, `orol.png` | personnages (vue de trois quarts) | — | **fait** : découpés des planches du cours par `tools/cut_sprites.py` |

Les personnages n'ont donc **rien à générer** pour l'instant : le renard, Andrea et les autres sortent
directement des planches `docs/illustrations/planche-heros.jpg` et `planche-seconds-roles.jpg`. Les
prompts « profil » plus bas servent seulement si on veut de meilleurs sprites (de profil, plus grands).

## Règles

- **Paysage 16:9** (les illustrations du cours sont déjà en 16:9). Si ChatGPT sort du 3:2, garder
  l'essentiel dans les 85 % centraux en hauteur : je recadre à 16:9.
- **Caméra fixe, à hauteur de personnage** ; le tiers du bas (le sol) reste **dégagé** : c'est là que les
  personnages marchent.
- **Aucun texte lisible, aucun personnage, aucun passager dans le décor** (le texte vient du jeu).
- Garder le même style d'une image à l'autre : le décor du tram, une fois validé, se joint aux suivants.
- Si ChatGPT refuse : nouvelle conversation, enlever la phrase qui coince, ne citer aucun film ni studio.
- Après dépôt d'un décor : redessiner les zones avec `tools/editor.html` et copier le code dans `js/tram.js`.

## 1. Décor : le tram vide  — `tram.webp`

**À joindre** : `img/illus_01_kosice.jpg`

```
Use the attached image as the reference for the tram (yellow handrails, blue patterned seats, large windows, the Gothic cathedral outside) and for the drawing style.

Scene: the same city tram interior in Košice, Slovakia, but completely EMPTY (no people, no animals, no passengers, no bags), drawn as the background of a point-and-click adventure game, wide 16:9 landscape format. Fixed camera, side-on, at standing eye level, in the middle of the aisle, looking at the long wall of the tram. On the left: a double sliding door with glass panes; right next to it a yellow vertical handrail pole with a small yellow ticket validator box fixed to it. In the centre and on the right: two large windows (grey-blue frames) in the wall, with a sunny view of pastel-coloured historic buildings; under each window a row of blue patterned seats. Above the middle, a small black rectangular passenger information display, blank. Grey rubber floor. The lower third of the image is the floor: keep it clear and empty, nothing standing on it. Sunny morning light, friendly and cosy.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Soft, painterly background with few small details, so characters standing in front will stand out, but the place stays recognisable. Landscape format 16:9. No text, no letters, no logos, no watermark.
```

Les vitres seront recouvertes par la ville qui défile (§2) : peu importe ce qu'elles montrent, mais les
cadres doivent être nets pour y tracer les zones.

## 2. La ville qui défile  — `scenery.webp`

**À joindre** : `img/illus_01_kosice.jpg`

```
Use the attached image as the reference for the drawing style and for the pastel historic buildings and the Gothic cathedral of Košice.

Scene: a street scene of Košice seen from a moving tram, drawn as a very wide panoramic strip (as wide as possible, about 3:1 or wider; if only a standard landscape format is possible, use 16:9). Row of pastel-coloured historic facades with red roofs on both sides of the view, trees, the tall Gothic cathedral with its dark roof far away in the middle, a bright blue summer sky with a few clouds. Horizon at about two thirds of the height, a bit of grey street at the bottom. No people, no animals, no vehicles, no text.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, soft painterly background. No text, no letters, no logos, no watermark.
```

Le jeu fait défiler l'image derrière les vitres et la retourne une fois sur deux : pas besoin qu'elle
soit « bouclable ».

## 3. Le contrôleur (humain)  — `revizor.png`

**À joindre** : `docs/illustrations/planche-heros.jpg` (le style), puis `img/illus_01_kosice.jpg`
(la façon de dessiner les humains : formes simples, peu de détails).

```
Use the first attached image only for the overall drawing style, and the second attached image for how ordinary humans are drawn in this world: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces.

One single full-body character: an ordinary adult human, a tram ticket inspector, standing upright in a relaxed pose, seen in three-quarter view facing right, feet at the very bottom of the image, whole body visible with some margin. He wears a navy-blue uniform jacket and trousers, a navy cap, a lanyard with a plain badge, and carries a small handheld ticket machine. Serious but kind, slightly tired expression. Same scale and proportions as the characters of the model sheet (about as tall as the fox boy plus a head).

Flat solid magenta #FF00FF background everywhere, no ground, no shadow, no other object. Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. No text, no letters, no logos, no watermark.
```

(Si c'est une revízorka, écrire « a woman » et adapter le texte du jeu.) Le fond magenta est détouré ensuite.

## 4. Objets : ticket et ticket validé  — `item_listok.png`, `item_listok_ok.png`

**À joindre** : aucune.

```
Two small objects for an adventure game inventory, shown side by side on a flat solid magenta #FF00FF background, evenly spaced, each fully visible with margin: on the left, a yellow paper tram ticket with a thin dark band and two blank lines (no readable text); on the right, the same yellow ticket after validation: same shape, with a clean small rectangular punch mark and a green tick stamp in the corner. Seen from the front, slightly tilted, simple and clear so they read at 64 pixels. Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. No text, no letters, no numbers, no watermark.
```

## Facultatif : sprites de profil (si les trois-quarts des planches ne suffisent pas)

**À joindre** : `docs/illustrations/planche-heros.jpg` (pour le renard ou Andrea) ;
`planche-seconds-roles.jpg` pour les autres. Un personnage par conversation.

```
Use the attached model sheet for the character (keep him exactly as designed: same face, fur, clothes, proportions).

One single full-body image of the red fox boy (the first character of the sheet), standing upright in a relaxed neutral pose, seen exactly from the SIDE (profile) facing right, feet at the very bottom of the image, whole body including the tail visible with margin. Flat solid magenta #FF00FF background everywhere, no ground, no shadow, no other object. Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. No text, no letters, no logos, no watermark.
```

Remplacer « the red fox boy (the first character of the sheet) » par « Andrea, the hare girl (the second character) », « Maťo, the bear (the third) », etc.
