# Images de l'ouverture et du prologue (gare) : prompts ChatGPT

Même méthode que `PROMPTS.md` : nouvelle conversation par image, on joint les images indiquées, on colle le prompt tel quel, on dépose le
résultat dans `sources/`. Style du cours (dessin animé 2D, aplats avec ombrage cel, décors peints). **Aucun texte dans les images.**
Voir `docs/Jeu-conception.md`, section « Nouvelle ouverture ».

## 1. Carte de l'Europe : `intro_europe.webp` (plan 1, avec zoom vers l'est) ✅ 11 nov.

Faite (1672 x 941, `sources/intro_europe_src.png`). **Pointe du repère : (1190, 419)**, soit 71,2 % / 44,5 % de l'image.

**À joindre** : `img/illus_12_hrad_2.jpg` (seulement pour le style de dessin).

```
Use the attached image only as a reference for the drawing style (hand-drawn 2D animated-film look, soft painterly colours); do not copy its content.

Scene: an illustrated storybook map of Europe seen from above, wide landscape 16:9 format, as the opening shot of an adventure game. Soft pastel land colours with gentle shading, a blue sea, small painted hills and forests, little white-capped mountains for the Alps and the Carpathians, the Danube drawn as a thin blue ribbon. Very subtle country borders (thin pale lines), NO country names, NO city names, no labels. A thin dotted red travel line starts in eastern France and runs east across Germany and Austria to a small red map pin in the east of Slovakia (Kosice, close to the borders with Ukraine and Hungary). Place the pin in the right half of the image, about two thirds from the left and slightly above the middle. A subtle old-paper vignette on the edges.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Landscape 16:9 format. No text, no letters, no numbers, no logos, no watermark.
```

À vérifier sur le résultat : la Slovaquie doit être au bon endroit (petit pays, entre la Pologne au nord, l'Ukraine à l'est, la Hongrie
au sud, l'Autriche et la Tchéquie à l'ouest) et le repère rouge à l'est du pays. La position du repère sert de cible au zoom.

## 2. Carte de la Slovaquie : `intro_slovensko.webp` (plan 2) ✅ 11 nov.

Faite (1672 x 941, `sources/intro_slovensko_src.png`), en joignant la carte de l'Europe pour le style. **Pointe du repère : (1252, 491)**, soit 74,9 % / 52,2 %.
Pendant le fondu, les deux images grossissent ensemble pour que les deux repères se superposent.

**À joindre** : `img/illus_12_hrad_2.jpg` (seulement pour le style).

```
Use the attached image only as a reference for the drawing style (hand-drawn 2D animated-film look, soft painterly colours); do not copy its content.

Scene: an illustrated storybook map of Slovakia seen from above, wide landscape 16:9 format, the country in the middle, its neighbours (Poland, Ukraine, Hungary, Austria, Czechia) in paler faded colours. Painted green hills and forests, the high jagged Tatra mountains in the north with white tops, the Danube as a blue ribbon in the south-west, a few small blue lakes. A single small red map pin in the far east of the country (Kosice). NO text, NO place names, no labels. A subtle old-paper vignette on the edges.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Landscape 16:9 format. No text, no letters, no numbers, no logos, no watermark.
```

## 3. Intérieur du train : `intro_train.webp` (plan 3, panorama 3:1 avec travelling)

**À joindre** : `docs/illustrations/planche-heros.jpg` (pour Gab) et `sources/tram_wide_src.png` (le style des décors du jeu).

Premier essai (11 nov.) : bon Gab et belle vue, mais un compartiment trop spacieux et une porte au milieu de la paroi des fenêtres qui
donnerait sur un couloir impossible. On demande donc une **voiture ouverte** (sans compartiments), vue de l'allée.

```
Use the first attached image (the heroes' model sheet) for the character (keep him exactly as designed): the fox (Gab) only. Use the second attached image (a tram interior) only as the reference for the drawing style of the background (same clean lines, colours and level of detail); do not copy its content.

Scene: the inside of an open-plan passenger coach of a Slovak regional train (no compartments), seen from the central aisle looking at the window wall, drawn as a very wide panoramic image in 3:1 format (3072x1024 pixels), as the last opening shot of an adventure game, warm afternoon light. Along the whole wall: repeating seat bays, each bay with two pairs of blue patterned seats facing each other close together (realistic, cramped legroom), a small fold-down table under each window, one window per bay, and a continuous metal luggage rack above the windows. In the first bay on the left, the fox sits by the window, his yellow backpack on the seat next to him, his cheek resting on his hand, looking out with a tired, hopeful smile. The other bays are EMPTY (no other passengers). Through the windows, the outskirts of the city of Kosice, Slovakia, getting closer from left to right: trees and railway tracks, then apartment blocks, and in the last window on the right the tall Gothic spire of the cathedral. No doors in the window wall.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no signs, no logos, no watermark.
```


## 4. La gare de Košice : `gare_wide.webp` (prologue, panorama 3:1, la caméra suit Gab)

**À joindre** : `sources/tram_wide_src.png` (le style des décors du jeu).

Disposition voulue, de gauche à droite (c'est aussi le chemin du joueur) : portes des quais (on arrive du train), tableau des départs,
banc, grande affiche sur un pilier, distributeurs de tickets, portes de sortie vers l'arrêt du tram. Pas de personnages : Gab et les
autres sont des sprites. Le sol (tiers du bas) reste dégagé pour la marche. Tous les textes (tableau, affiche, écran) viennent du jeu.

```
Use the attached image (a tram interior) only as the reference for the drawing style (same clean ink lines, flat colours with soft cel shading, colours and level of detail); do not copy its content.

Scene: the main hall of the railway station of Kosice, Slovakia, a bright modern hall with tall glass windows and a high ceiling, drawn as the long scrolling background of a point-and-click adventure game, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the side, afternoon light. From left to right: glass doors leading to the platforms, with a red and white passenger train visible behind them; a large dark departures board hanging from the ceiling with empty rows (no readable text); a long wooden bench; a big square pillar with a large framed poster showing a simple drawing of a yellow tram and a small paper ticket (no text on it); two tall orange ticket machines side by side, each with a blank screen and a small slot; and on the far right, wide glass exit doors through which a blue and yellow tram waits at a tram stop outside. A few potted plants, a wall clock without numbers, a litter bin. The hall is EMPTY (no people, no animals). The lower third of the picture (a smooth light stone floor) stays clear and empty, because characters will walk there. No text, no letters, no numbers, no signs with writing, no logos.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```
