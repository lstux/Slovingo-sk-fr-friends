# Jeu v2 « Circuit fermé » : prompts du prologue et du chapitre 1 (16 nov. 2026)

Conception : `docs/Jeu-conception-v2.md`. **On garde les décors du 11 nov.** (`gare_wide`, `tram_wide`, `rue_wide`, `zahrada_wide`,
`rano_wide`) et les planches de Gab, Andrea et du contrôleur : ils collent à la v2. Ce qui est nouveau (kiosque, chat, figurants,
objets, animations) se fait en **planches séparées sur fond vert**, posées par-dessus les décors : on ne redessine aucun décor, donc
aucune zone à refaire.

Règles communes : planche 3:1 (3072 x 1024), cases égales, rien qui touche le bord des cases, fond vert pur `#00FF00` sans ombre,
pas de vert sur les éléments, aucun texte. Les figurants ont **2 poses** (côte à côte, même taille, mêmes pieds). Découpage ensuite
par script (`tools/`). Ordre conseillé : 1 → 5, **tout dans la même conversation ChatGPT** (le style suit d'une planche à l'autre).

---

## 1. Objets de la gare : `sources/objets_gare_src.png`

**À joindre** : `sources/gare_wide_src.png` (le décor où ils iront : même style, même lumière).

```
Use the attached image (a railway station hall) as the reference for the drawing style and the light (same clean ink lines, flat colours with soft cel shading, bright afternoon light). Do not copy its content.

Create an object sheet for a 2D point-and-click adventure game: a very wide image in 3:1 format (3072x1024 pixels), a grid of 4 columns and 2 rows of equal cells, ONE object per cell, centred, nothing touching the cell borders, no cell borders drawn, seen from the side and slightly from the front as in the station hall:
1 a small station newspaper and snack kiosk, seen from the front: a wooden and glass booth with a counter window, shelves with bottles of water, sweets and folded newspapers, a small awning on top (no readable text, no logos);
2 a photo booth: a tall grey box with a short curtain hanging in front of the seat and a small slot on the side (no text);
3 a small closed ticket window with its metal roller shutter pulled down (no text);
4 a plastic bottle of still water with a blue cap, full, standing;
5 a banknote seen from the front, as an inventory icon (orange-brown, a simple window drawing, no readable text or numbers);
6 three coins in a small pile, seen slightly from above, as an inventory icon (no readable text or numbers);
7 the same bottle of water, lying, as an inventory icon;
8 the same bottle of water, empty and crumpled, as an inventory icon.

Background: one flat, uniform pure green colour (#00FF00) everywhere, with no gradient, no floor, no shadows, no texture. Do not use this green anywhere on the objects.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. No text, no letters, no numbers, no labels, no watermark.
```

À vérifier : le kiosque assez grand pour qu'on y voie les bouteilles ; aucun mot écrit nulle part.

## 2. Figurants de la gare : `sources/figurants_gare_src.png`

**À la suite** (même conversation). Sinon, joindre `sources/gab_sheet_src.png` (style des personnages du jeu).

```
In exactly the same drawing style as the game characters, create a sheet of background characters (extras) for the station hall: a very wide image in 3:1 format (3072x1024 pixels), a grid of 4 columns and 2 rows of equal cells. Anthropomorphic animals in the same cartoon style as the fox and the hare of the game (clothes, standing on two legs), drawn full body, all at the same scale, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn. Each extra has TWO poses, side by side, same size, same position of the feet:
Row 1, cells 1-2: a middle-aged raccoon woman, kiosk seller, apron over a striped shirt, seen from the front from the waist up as if behind a counter: (1) holding out an open hand with a friendly smile, (2) turning slightly to put something on a shelf behind her.
Row 1, cells 3-4: a tall young stag in a suit and tie, pulling a rolling suitcase, seen from the side facing RIGHT: (3) walking in a hurry, (4) stopped, looking at his wristwatch.
Row 2, cells 5-6: an old sheep lady with glasses and a cardigan, sitting on an invisible bench, a handbag on her knees: (5) asleep, head tilted, eyes closed, (6) one eye open, a finger raised to her lips ("shh!").
Row 2, cells 7-8: two grey city pigeons together on the ground: (7) pecking at the floor, (8) both taking off, wings open.

Background: one flat, uniform pure green colour (#00FF00) everywhere, with no gradient, no floor, no shadows. Do not use this green anywhere on the characters.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. No text, no letters, no numbers, no labels, no watermark.
```

## 3. Figurants du chapitre 1 : `sources/figurants_ch1_src.png`

**À la suite.**

```
Same style, same rules (3:1, 4 columns x 2 rows, two poses per extra, same scale and baseline, pure green #00FF00 background, no text). New extras for the tram and the street:
Row 1, cells 1-2: an old goat grandmother (babička) with a flowered headscarf and a long skirt, sitting on an invisible tram seat, a HUGE overfilled shopping bag at her feet with leeks and bread sticking out: (1) knitting, (2) glaring sideways with suspicion.
Row 1, cells 3-4: a teenage lynx boy in a T-shirt and big headphones, standing, holding a tram pole: (3) nodding his head to the music, eyes closed, (4) still, bored, looking at his phone.
Row 2, cells 5-6: a big fat ginger domestic cat (a real cat on four legs, not dressed, not standing): (5) curled up asleep in a round shape, as if lying on top of a flower pot, (6) the same, one eye open, annoyed.
Row 2, cells 7-8: an elderly hedgehog man with a straw hat and braces, holding a metal watering can: (7) shaking the empty watering can upside down, puzzled, (8) sighing, shoulders down, the watering can hanging.
```

**Puis, à la suite** (le chat qui boit, pour la fin de l'énigme) :

```
Same cat, same style, pure green background, two cells side by side in a 2:1 image: (1) the cat walking away calmly to the right, tail up, (2) the cat drinking from a bowl on the ground, seen from the side (draw the bowl too, a simple blue metal pet bowl).
```

## 4. Objets du chapitre 1 : `sources/objets_ch1_src.png`

**À la suite.** Sinon, joindre `sources/rue_wide_src.png`.

```
Same style, same rules (3:1, 4 columns x 2 rows, ONE object per cell, pure green #00FF00 background, no text):
1 a yellow tram ticket validator box mounted on a short piece of yellow pole (the same kind as in the tram background), front view;
2 a big woven shopping bag, overfilled, with leeks and a loaf of bread sticking out;
3 a simple blue metal pet bowl on the ground, EMPTY and dry, seen from the side and slightly from above;
4 the same bowl FULL of water;
5 four flat grey stepping stones laid in a gentle curve on the ground, seen from the side and from slightly above, with NO grass around them (only the stones);
6 a long strip of light grey gravel path seen from the side and slightly from above, flat on the ground, with no grass around it;
7 a small white motion sensor box, the kind fixed under a garden lamp, front view;
8 a ballpoint pen as an inventory icon.
```

À vérifier : les pierres et le gravier sans herbe (sinon le vert du fond se mélange) ; le composteur du même jaune que dans le tram.

## 5. Animations d'ambiance : `sources/ambiance_ch1_src.png`

**À la suite.** Petits éléments en 2 ou 3 images, que le jeu fait alterner. Le reste est animé par le jeu lui-même : aiguilles de
l'horloge, tableau des départs, ville derrière les vitres du tram, lucioles, scintillement des étoiles, air chaud qui tremble.

```
Same style, same rules (3:1, 4 columns x 2 rows, pure green #00FF00 background, no text). Small animation frames for a 2D game, each element at the same size and position in its successive frames:
Cells 1-3: a soft white puff of steam, in three stages (small and dense, bigger, large and fading).
Cells 4-5: a white towel hanging on a clothesline peg (draw only the towel and a short piece of line), (4) hanging still, (5) lifted by the wind.
Cells 6-7: a blackbird on the ground, side view, (6) standing, (7) hopping with its feet off the ground.
Cell 8: a small night moth with pale wings open, seen from above.
```

---

## Après la génération

Dépose les images dans `web-games/aventure/art/sources/` sous les noms indiqués : je fais le découpage et le détourage, puis je les
place dans les scènes. Si une planche déborde ou si un figurant change de taille entre ses deux poses, on la refait seule.

---

# Chapitre 2 « Zéro litre » (16 nov. 2026)

On réutilise : `rano_wide` (jardin du matin), `fontana_wide` (la rue à la fontaine vide : une façade devient le bureau), `obj_auto`
(voiture noire), les planches du monsieur au sourire (`pan_*`) et de la guichetière (`pokladnicka_*`, la dame du guichet). Le cadre du
téléphone d'Andrea et le sommaire du dossier sont dessinés par le jeu. Nouvelle conversation ChatGPT, puis tout **à la suite**.

## 6. Le bureau de l'environnement : `sources/urad_wide_src.png` (décor 3:1)

**À joindre** : `sources/gare_wide_src.png` (style des décors du jeu).

Disposition, de gauche à droite (le chemin du joueur) : porte d'entrée vitrée, borne à tickets de numéro, rangée de chaises
d'attente, tableau lumineux au mur, horloge, long couloir qui part vers le fond, un seul guichet ouvert (vitre + comptoir), deux
guichets fermés (store baissé), une plante, une fontaine à eau vide. Pas de personnages : la dame du guichet est un sprite.

```
Use the attached image (a railway station hall) only as the reference for the drawing style (same clean ink lines, flat colours with soft cel shading, colours and level of detail); do not copy its content.

Scene: the waiting room of a small, old-fashioned regional environment office in Kosice, Slovakia, drawn as the long scrolling background of a point-and-click adventure game, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the side, late morning, hot summer day (a bit stuffy: closed blinds letting in stripes of sunlight, a ceiling fan). From left to right: a glass entrance door with a push bar; a small grey ticket dispenser on a pole (a machine that gives queue numbers, with one big round button); a row of six worn plastic waiting chairs against the wall; above them, a dark rectangular electronic display panel on the wall (blank, no numbers); a round wall clock without numbers; a long corridor going away into the background with closed office doors; then three service counters side by side: the first one OPEN (a glass window with a small opening at the bottom and a wooden counter, a desk lamp and piles of folders behind it), the other two CLOSED with their roller blinds pulled down; a big potted plant with drooping leaves; and on the far right an office water cooler with an EMPTY upside-down water bottle. Beige walls, green linoleum floor, old radiators, a ceiling fan in the middle of the room. The room is EMPTY (no people, no animals). The lower third of the picture (the linoleum floor) stays clear and empty, because characters will walk there. No text, no letters, no numbers, no signs with writing, no logos.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```

À vérifier : le guichet ouvert bien distinct des deux fermés ; la borne et le tableau lumineux visibles ; aucun chiffre ni mot écrit.

## 7. Figurants du bureau : `sources/figurants_ch2_src.png`

**À la suite.** Sinon, joindre `sources/gab_sheet_src.png`.

```
In exactly the same drawing style as the game characters (anthropomorphic animals, same cartoon style as the fox and the hare), create a sheet of background characters (extras) for this waiting room: 3:1 format (3072x1024 pixels), 4 columns x 2 rows of equal cells, full body, all at the same scale, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn, pure green #00FF00 background, no text. Each extra has TWO poses side by side; in each pair the two poses keep exactly the same size, position and props (nothing added or removed between the two cells).
Row 1, cells 1-2: a middle-aged beaver man in a short-sleeved shirt and tie, sitting on an invisible chair, a folded newspaper with a crossword on his knee: (1) writing with a pen, concentrated, (2) chewing his pen, looking up, thinking.
Row 1, cells 3-4: a young mother squirrel standing next to a baby stroller (pram) with a hood: (3) gently rocking the stroller, (4) looking impatiently at her wristwatch.
Row 2, cells 5-6: a big badger workman in blue work overalls, sitting on an invisible chair, arms crossed: (5) asleep, head down, (6) the same, snoring with his mouth open (draw no "Z" letters).
Row 2, cells 7-8: a delivery stork in a brown uniform and cap, standing, holding a big cardboard box: (7) holding the box, (8) wiping his forehead with one hand, the box under the other arm.
```

## 8. Objets du chapitre 2 : `sources/objets_ch2_src.png`

**À la suite.**

```
Same style, same rules (3:1, 4 columns x 2 rows, ONE object per cell, centred, pure green #00FF00 background, nothing touching the cell borders, no text, no numbers):
1 a small paper queue ticket, as an inventory icon (a white slip with a blank space where the number would be);
2 a huge closed grey cardboard file folder, very thick (hundreds of pages), tied with a cloth strap, lying on a counter (seen from the front);
3 the same file OPEN, pages fanned, with coloured paper tabs sticking out of the side (red, blue, yellow, green), no readable text;
4 a ballpoint pen attached to a small metal chain and a little stand, as on a post office counter;
5 a metal bucket, empty, standing;
6 an old garden water tap on a short pipe, front view;
7 a big round office wall clock with a white face and black hands but NO numbers;
8 a tram ticket seen from the back, with a handwritten scribble in blue ink that is NOT readable (just a squiggle), as an inventory icon.
```

## 9. Les photos du téléphone d'Andrea : `sources/fotky_src.png`

**À la suite.** Cinq petites photos (le jeu les met dans le cadre du téléphone et les fait remettre dans l'ordre).

```
Same drawing style. Create a sheet of FIVE small square pictures side by side in a single row (5:1 format, 3200x640 pixels), each a separate square picture with a thin white border like a phone photo, all showing the SAME place: a small mountain stream behind a Slovak village under the Tatras, with the same big rock and the same birch tree on the right bank, seen from the same point of view. No people, no animals, no text, no numbers, no dates.
1 spring: the stream full of clear rushing water, green grass, flowers;
2 summer: the stream a little lower, but still flowing;
3 the same view, and far away in the valley behind, a construction site with a crane and a fence;
4 the same view, behind, a big new grey windowless building with a green wave painted on its wall, where the construction site was;
5 the stream completely DRY: cracked mud and pale stones, yellow grass, the grey building still behind.
```

## 10. Animations du chapitre 2 : `sources/ambiance_ch2_src.png`

**À la suite.**

```
Same style, same rules (3:1, 4 columns x 2 rows, pure green #00FF00 background, no text). Small animation frames for a 2D game, each element at the same size and position in its successive frames:
Cells 1-3: a ceiling fan seen from below and from the side, three frames of its blades turning (the blades at three different angles).
Cells 4-5: a garden sprinkler on the grass, (4) spitting a weak little jet of water, (5) dry, a single drop falling.
Cells 6-7: a wasp in flight, side view, (6) wings up, (7) wings down.
Cell 8: a fallen green apple on the ground, with a small bite mark.
```
