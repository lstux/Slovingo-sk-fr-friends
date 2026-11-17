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

---

# Chapitre 3 « Le registre » (17 nov. 2026)

**Décors de la v1 vérifiés** :
- `raj_foret_wide` (forêt et ruisseau) : **gardé**. Le bâton, la pomme de pin, le champignon et la flèche tombée sont des objets posés par-dessus.
- `raj_rokle_wide` (gorge) : **gardé**. L'énigme s'adapte au dessin : échelle 1 qui monte, passerelle, échelle 2 qui descend près de la
  cascade (mouillée), échelle 3 vers la corniche vide (cul-de-sac), corde pendante (piège).
- `raj_orol_wide` (clairière au rocher) : **plus utilisé**, il n'y a pas de cabane. Remplacé par `raj_chata_wide` (n° 11).
- `raj_bivouac` : Gab et Andrea y sont dessinés, il devient l'**image de la cinématique du soir** (« Spi. »). Le lac du jour est nouveau
  (`raj_jazero_wide`, n° 12).

On réutilise aussi : les poses de pán Orol (`orol_*`, 17 poses), l'écureuil (`veverica_a/b`). Nouvelle
conversation ChatGPT, puis tout **à la suite**, dans l'ordre 11 → 18.

## 11. La cabane de pán Orol : `sources/raj_chata_wide_src.png` (décor 3:1)

**À joindre** : `sources/raj_orol_wide_src.png` (même parc, même style : la cabane est dans cette clairière).

Disposition, de gauche à droite : le haut de l'échelle de la gorge (arrivée), le sentier, la cabane du garde avec sa véranda (banc,
petite table, théière), le toit bas (le geai y range ses glands), la niche du teckel, le mât et son drapeau, un tas de bois, le grand
rocher et les Tatras au fond. Pas de personnages.

```
Use the attached image (a clearing in the Slovak Paradise national park) as the reference for the drawing style, the colours and the light; the new scene is in the same clearing, a bit further on.

Scene: the small log cabin of an old park ranger in the Slovak Paradise national park, Slovakia, drawn as the long scrolling background of a point-and-click adventure game, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the front, hot dry summer afternoon, warm light, calm atmosphere. From left to right: on the far left, the pale limestone edge of the gorge with the top of a steel ladder sticking out (where the characters arrive), and a path of flat stones; a sunny grassy clearing; in the middle, a small, old, cosy wooden ranger cabin with a LOW roof covered with wooden shingles (low enough that a bird on it is close to the ground), a small window with geranium boxes, a front door, and a covered porch with a wooden bench, a small round table with a teapot and two enamel mugs, and a pair of binoculars hanging on a nail; next to the cabin, a small wooden dog kennel with an old blanket in it; a tall wooden flagpole with a plain green flag with a simple white fir-tree shape (no letters); a neat pile of chopped firewood with an axe stuck in a log; a rain barrel that is completely EMPTY and dry; on the right, the large flat-topped limestone boulder of the clearing, spruces and beeches around, and far away, slightly hazy, the dark blue High Tatras with a little snow on the highest peaks. The scene is EMPTY (no people, no animals). The lower third of the picture, along the whole width, stays clear and uncluttered (grass and path), because characters will walk there. No text, no letters, no numbers, no signs with writing, no logos.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```

À vérifier : la véranda (banc + table + théière) assez grande pour y asseoir l'aigle ; le toit bas ; le drapeau sans lettres ; le
tonneau vide.

## 12. Le lac des castors : `sources/raj_jazero_wide_src.png` (décor 3:1)

**À la suite.**

Disposition, de gauche à droite : le sentier qui arrive de la forêt, la rive avec un cercle de pierres pour le feu (le bivouac du
soir), le lac calme, **le barrage des castors** avec un **déversoir** bien visible (un creux où l'eau passe par-dessus en petite
cascade), le ruisseau qui repart en aval à droite, la hutte des castors, des roseaux. L'énigme de la pomme de pin suit ce trajet :
l'eau doit visiblement aller du lac, par le déversoir, jusqu'au ruisseau.

```
Now, in exactly the same drawing style, draw the next scrolling background of the game: a small beaver pond in a forest valley of the Slovak Paradise national park, on the same hot dry summer afternoon, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the front and slightly from above, warm light, calm atmosphere. From left to right: on the far left, a forest path arriving between spruces (where the characters arrive); a grassy bank with a ring of stones for a campfire (cold, no fire) and a flat log to sit on; then a calm, clear pond reflecting the sky and the trees, with lily pads and a few reeds; in the middle-right, a long BEAVER DAM made of sticks, branches and mud across the stream, clearly visible, with ONE obvious low notch in the middle (a spillway) where the water flows over the dam in a small shining cascade; to the right of the dam, the stream continues downstream, lower, narrower but still flowing, between stones, and goes off the picture on the right; a dome-shaped beaver lodge of sticks and mud in the pond, near the dam; a gap in the dam beside the spillway where one branch is clearly missing; gnawed tree stumps with pointed tops on the bank; tall reeds and a flat stone in the shallow water on the far right. Pale limestone cliffs and spruce forest in the background. The scene is EMPTY (no people, no animals). The lower third of the picture keeps a clear walkable bank on the left and along the front edge of the pond, because characters will walk there. No text, no letters, no numbers, no signs, no logos.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```

À vérifier : on voit d'un coup d'œil que l'eau **passe** par-dessus le barrage (déversoir + ruisseau en aval) ; le trou d'une branche
dans le barrage ; le cercle de pierres sur la rive gauche.

## 13. Le castor : `sources/bobor_hradza_sheet_src.png` (planche de poses)

**À la suite.** Sinon, joindre `sources/gab_sheet_src.png` (style des personnages).

Attention : le monsieur aux mots croisés du chapitre 2 est déjà un castor (chemise, cravate, lunettes). Celui-ci doit se reconnaître
au premier coup d'œil : plus vieux, plus trapu, sauvage, en tenue de chantier.

```
In exactly the same drawing style as the game characters (anthropomorphic animals, same cartoon style as the fox and the hare), create a character pose sheet: 3:1 format (3072x1024 pixels), 4 columns x 2 rows of equal cells, the SAME character in every cell, full body, same scale, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn, pure green #00FF00 background, no text.
The character: an old, stocky, grumpy wild beaver who builds and repairs his dam, slightly wet brown fur, grey whiskers, big bushy eyebrows, two big orange teeth, a broad flat tail; he wears an old checked flannel shirt with rolled-up sleeves, unbuttoned, and a leather tool belt with a wooden mallet; no glasses, no tie (he must look very different from a beaver office worker).
Poses:
1 standing, arms crossed, frowning, saying "No!" firmly;
2 talking, one hand open, still suspicious;
3 seen from the side facing LEFT, kneeling, hitting a stick with his wooden mallet (repairing a dam, the dam itself not drawn);
4 the same kneeling position, head raised, looking up suspiciously;
5 holding a long straight wooden stick in both hands, sniffing and tasting it with his teeth, one eye closed;
6 holding the same stick under one arm, giving a small satisfied nod;
7 standing, pointing to the RIGHT with his whole arm, explaining;
8 swimming, only his head, shoulders and tail above a few lines of water (the water drawn as simple blue lines only at his waist).
```

À vérifier : il ne ressemble pas au castor à cravate ; le même bâton en 5 et 6.

## 14. Figurants du chapitre 3 (1) : `sources/figurants_ch3_src.png`

**À la suite.**

```
In exactly the same drawing style as the game characters, create a sheet of background characters (extras): 3:1 format (3072x1024 pixels), 4 columns x 2 rows of equal cells, full body, all at the same scale, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn, pure green #00FF00 background, no text. Each extra has TWO poses side by side; in each pair the two poses keep exactly the same size, position and props (nothing added or removed between the two cells).
Row 1, cells 1-2: a couple of hedgehog hikers (a man and a woman) with backpacks, walking sticks and a big unfolded paper map between them (no readable writing on it): (1) both reading the map, (2) both turning the map upside down, puzzled.
Row 1, cells 3-4: a family of chamois hikers (a father, a mother and a small kid chamois) with small backpacks, very relaxed, seen from the front as if climbing down an invisible ladder, hands and hooves on invisible rungs one above the other: (3) the father looking down, (4) the father turned towards us, waving cheerfully with one hand, the others still climbing.
Row 2, cells 5-6: a Eurasian jay (a real bird, not dressed: pinkish-brown body, blue and black striped wing patch, black moustache), standing on a roof edge (the roof not drawn), an acorn in its beak: (5) posing proudly, (6) bent down, hiding the acorn under its foot.
Row 2, cells 7-8: an old fat dachshund dog (a real dog on four legs, not dressed, grey muzzle), lying on an old blanket: (7) asleep, (8) one eye open, wagging its tail.
```

## 15. Figurants du chapitre 3 (2) : `sources/figurants_ch3b_src.png`

**À la suite.** Pour l'aigle, joindre `sources/orol_sheet_src.png` (il doit être identique à ses autres poses).

```
Same style, same rules (3:1, 4 columns x 2 rows, two poses per pair, same scale and baseline inside each pair, pure green #00FF00 background, no text):
Row 1, cells 1-2: a grey heron (a real bird, not dressed) standing in the shallow water (only a few blue lines of water at its feet): (1) perfectly still, neck folded, (2) neck stretched up, swallowing a small fish.
Row 1, cells 3-4: two small beaver kids swimming together in a circle, only heads, backs and tails above a few blue lines of water: (3) one behind the other, (4) the same, one splashing the other with its tail.
Row 2, cells 5-6: the old eagle park ranger of the attached sheet (exactly the same character: brown feathers, ranger hat, green vest with a fir-tree badge), SITTING on an invisible bench, seen from the front: (5) drinking from an enamel mug held in both wings, eyes half closed, (6) lowering the mug onto an invisible table, one eyebrow raised, looking at us with suspicion.
Row 2, cells 7-8: a small green frog (a real frog, not dressed) sitting on a wet mossy stone (the stone included, the same in both cells): (7) sitting calmly, (8) croaking, its throat puffed up like a balloon.
```

La grenouille sur sa pierre remplace `obj_zaba` dans la gorge (elle a maintenant deux poses).

## 16. Objets du chapitre 3 : `sources/objets_ch3_src.png`

**À la suite.**

```
Same style, same rules (3:1, 4 columns x 2 rows, ONE object per cell, centred, pure green #00FF00 background, nothing touching the cell borders, no text, no numbers):
1 a long, straight, sturdy wooden stick (a branch with the bark on, one small twig stub), lying on the ground, seen from the side;
2 the same stick, standing diagonally, as an inventory icon;
3 a spruce cone lying on the ground;
4 the same cone, as an inventory icon;
5 a fallen wooden hiking trail sign: a pointed arrow-shaped board with a painted red-white-red stripe mark (no writing), lying in the grass;
6 a red mushroom with white dots (fly agaric) in a little tuft of moss;
7 a big, old, thick register book with a worn green cloth cover and leather corners, closed, lying on a table, seen from the front and slightly above;
8 the same register book OPEN, seen exactly from above, two pages with faint ruled lines and columns but EMPTY (no writing at all), a ribbon bookmark.
```

## 17. L'escalade dans le noir : `sources/prises_ch3_src.png`

**À la suite.** Le jeu met l'écran presque noir et ne laisse voir qu'un halo : ces images apparaissent dedans.

```
Same style, same rules, but a 3:1 sheet of 3 columns x 2 rows of equal cells, ONE element per cell, centred, pure green #00FF00 background, no text:
1 a steel climbing staple bolted into pale limestone (a small square patch of rock around it), seen from the front;
2 a horizontal steel ladder rung with a bit of the two side rails, seen from the front;
3 a thick tree root forming a loop out of the rock (small patch of rock around it);
4 a rock knob covered in wet green moss, shining with water drops (slippery);
5 two fox paws (orange fur, black "socks") gripping a horizontal steel ladder rung tightly, seen from behind, as if we were the climber;
6 the same two fox paws, one gripping the rung, the other paw open in the air, groping for the next hold.
```

## 18. Animations du chapitre 3 : `sources/ambiance_ch3_src.png`

**À la suite.**

```
Same style, same rules (3:1, 4 columns x 2 rows, pure green #00FF00 background, no text). Small animation frames for a 2D game, each element at the same size and position in its successive frames:
Cells 1-2: a small yellow brimstone butterfly in flight, side view, (1) wings up, (2) wings down.
Cells 3-4: the plain green flag with a white fir-tree shape on the top of its pole (only the top of the pole), (3) waving to the left, (4) waving the other way.
Cells 5-6: thin wisps of white steam rising from a mug (the mug not drawn, only the steam), two different shapes.
Cell 7: a single falling beech leaf, yellow-green, slightly curled.
Cell 8: a set of concentric ripples on water, seen in perspective, white and light blue lines only.
```

## Après la génération (chapitre 3)

8 générations. Dépose-les dans `web-games/aventure/art/sources/` sous les noms indiqués ; je découpe, je détoure et je place. Les
décors 11 et 12 sont les plus importants : si l'un d'eux rate (cabane sans véranda, barrage où l'eau ne passe pas), on le refait
avant les planches.
