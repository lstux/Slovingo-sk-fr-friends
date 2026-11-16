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
