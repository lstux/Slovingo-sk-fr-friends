# Décors du jeu (version 2, panoramas 3:1) : prompts ChatGPT

L'ouverture, la gare et le tram sont dans `PROMPTS_intro.md`. Même règles : décor vide (les personnages sont des sprites), le tiers du
bas dégagé pour la marche, aucun texte. Le style de référence est `sources/tram_wide_src.png`.

## 5. La rue devant la maison de la tante : `rue_wide.webp` (chapitre 1)

**À joindre** : `sources/tram_wide_src.png` (style des décors du jeu) et `img/illus_01_kosice_2.jpg` (la maison de la tante, vue
du jardin : on doit reconnaître la même maison, vue de la rue).

Disposition, de gauche à droite (le chemin du joueur) : l'arrêt du tram (on en descend), le trottoir, la façade de la maison de la
tante avec sa porte d'entrée et, devant, **trois pots de fleurs bien distincts (rouge, jaune, bleu)**, puis la clôture du jardin
avec un **portillon** fermé, derrière lequel on devine le pommier. Les pots et le portillon sont des zones du jeu.

```
Use the first attached image (a tram interior) as the reference for the drawing style (same clean ink lines, flat colours with soft cel shading, colours and level of detail), and the second attached image only for the house: the same two-storey house with the red tile roof, cream walls, the wooden door with steps and the lantern, seen here from the street side. Do not copy their content otherwise.

Scene: a quiet residential street at the edge of Kosice, Slovakia, late afternoon golden light, drawn as the long scrolling background of a point-and-click adventure game, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the side, from across the street. From left to right: a small tram stop with a simple shelter and a bench, the tram rails running along the street; a pavement with a lamp post and a linden tree; then the aunt's two-storey house with the red tile roof, cream walls, two windows upstairs with white curtains, the front wooden door with three stone steps; in front of the house, on the low wall by the steps, three flower pots clearly separated from each other: a RED pot, a YELLOW pot and a BLUE pot, each with flowers; then a wooden garden fence with a small closed wooden garden gate, and behind the fence the top of a big apple tree with small green apples. In the far background, on the right, the green wooded hill and the Gothic cathedral spire above the trees. The street is EMPTY (no people, no animals, no cars). The lower third of the picture (the pavement) stays clear and empty, because characters will walk there. No text, no letters, no numbers, no signs with writing, no house numbers, no logos.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```

À vérifier : les trois pots bien séparés et de trois couleurs franches ; le portillon visible (fermé) ; la maison reconnaissable ;
aucun numéro de maison ni panneau écrit.

Résultat (11 nov.) : bon du premier coup (`sources/rue_wide_src.png`). Zones dans `game.js` (scène `rue`).

## 6. Objets de la rue (fausses pistes) : `objets_rue_src.png`

Posés par-dessus le décor (sprites) : paillasson, pièce, journal sur le banc, boîte aux lettres, nain de jardin ; et deux icônes
d'inventaire (clé, centime). **À joindre** : `sources/rue_wide_src.png` (le décor où ils iront : même style, même lumière).

```
Use the attached image (a street background) as the reference for the drawing style and the light (same clean ink lines, flat colours with soft cel shading, warm late-afternoon light). Do not copy its content.

Create an object sheet for a 2D point-and-click adventure game: a very wide image in 3:1 format (3072x1024 pixels), a grid of 4 columns and 2 rows of equal cells, ONE object per cell, centred, drawn large in its cell, nothing touching the cell borders, no cell borders drawn, all seen from the side or slightly from above as in the street background:
1 a worn brown doormat lying flat on the ground (seen slightly from above), plain, with no writing;
2 a small shiny copper coin lying on the ground, seen slightly from above, catching the light (no readable text or numbers);
3 a folded newspaper (grey columns and a small drawing of a sun, no readable text);
4 a green metal wall letterbox with a slot and a small lock (no text);
5 a cheerful garden gnome with a red pointed hat and a white beard, standing;
6 a small snail with a brown spiral shell;
7 an old iron key with a round head (inventory icon), seen from the front;
8 the same copper coin seen from the front, as an inventory icon (no readable text or numbers).

Background: one flat, uniform pure green colour (#00FF00) everywhere, with no gradient, no floor, no shadows, no texture. Do not use this green anywhere on the objects.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. No text, no letters, no numbers, no labels, no watermark.
```
