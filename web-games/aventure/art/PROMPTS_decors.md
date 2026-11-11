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


## 7. Le jardin de la tante, le soir : `zahrada_wide.webp` (chapitre 1, fin)

**À la suite de la conversation de la rue** (elle a déjà le style et l'illustration du jardin, `img/illus_01_kosice_2.jpg`) : rien
à joindre. Sinon, joindre `sources/rue_wide_src.png` et `img/illus_01_kosice_2.jpg`.

Disposition, de gauche à droite : le portillon (on arrive de la rue), la cabane à bois, la corde à linge (**sans la couverture** :
elle sera un objet à prendre), le grand pommier au milieu, puis l'arrière de la maison : porte de derrière, **interrupteur** à côté,
fenêtre de l'étage **allumée**, et une **lampe de jardin très vive**. Fausses pistes possibles : un hamac sous la fenêtre, une niche
sans chien, un arrosoir, une brouette.

```
Now draw the garden behind this same house, in exactly the same drawing style, as the next scrolling background of the game: a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the side, in the evening at dusk (deep blue sky with the first stars, the last orange light on the horizon). It must be the same garden as in the earlier garden illustration: the same two-storey house with the red tile roof, the same shed, clothesline and big apple tree.

From left to right: the small wooden garden gate in the fence (seen from inside the garden); a small wooden shed with stacked firewood and a watering can in front of it; a clothesline between two posts with a few clothes and a towel hanging (but NO blanket); in the middle, the big apple tree with small green apples and soft grass under it; an empty dog kennel with no dog; a wheelbarrow; then the back of the aunt's house on the right: the back door with two steps, a white light switch box on the wall next to the door, an upstairs window brightly lit with a curtain, a striped hammock hanging between the house and a post just under that window, and a garden lamp on a post near the house shining a strong, bright white light that lights up the whole garden. The garden is EMPTY (no people, no animals). The lower third of the picture (the grass) stays clear and empty, because characters will walk there. No text, no letters, no numbers, no logos.

Background style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```

Résultat (11 nov.) : bon du premier coup (`sources/zahrada_wide_src.png`). La couverture et son icône : `sources/objets_zahrada_src.png`
(demandées à la suite). Le halo de la lampe est dessiné par le jeu (`props` `glow`) ; lampe éteinte : `shade` sur la lanterne et l'herbe.

## 8. Le jardin, le matin : `rano_wide.webp` (chapitre 2, début)

Demandé à la suite de la conversation du jardin (« exactly the same garden, same point of view… next morning »). Résultat
(`sources/rano_wide_src.png`) superposable au pixel près à la version du soir : mêmes zones dans `game.js`.


## 9. Le parc et l'étang presque à sec : `park_wide.webp` (chapitre 2)

**À la suite de la conversation du jardin** (rien à joindre) ; sinon joindre `sources/rano_wide_src.png`.
Disposition : entrée du parc (on arrive du jardin), pítko à sec et kiosque à glaces fermé (fausses pistes), l'étang presque vide au
milieu (boue craquelée, roseaux secs, petite passerelle, **échelle de mesure du niveau d'eau** : lien avec la loutre qui « mesurait
l'eau »), des oiseaux silencieux sur une branche, puis l'allée vers le centre-ville (la cathédrale au loin). Le canard est un sprite.

```
Now, in exactly the same drawing style, draw the next scrolling background of the game: a public park in Kosice, Slovakia, on a very hot, dry summer morning, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the side, harsh bright sunlight, a pale hazy sky.

From left to right: the park entrance with an open wrought-iron gate and a gravel path; a stone drinking fountain (dry, no water); a small closed ice-cream kiosk with its shutter pulled down (no writing on it); a wooden bench under a big chestnut tree whose leaves are turning brown too early, with three small birds sitting silently on a low branch; in the middle, a small pond that is almost completely dry: cracked brown mud, a small puddle of water left in the centre, dry yellow-brown reeds, an old water-level measuring post standing in the mud with painted marks (stripes only, no numbers), and a small wooden footbridge crossing the dry pond; then flower beds with wilted flowers, a lamp post, and on the right the park path leading out towards the old town, with the Gothic cathedral spire in the distance above the trees. The park is EMPTY (no people, no ducks, no other animals except the three silent birds on the branch). The lower third of the picture (the gravel path in front of the pond) stays clear and empty, because characters will walk there. No text, no letters, no numbers, no signs with writing, no logos.

Background style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```
