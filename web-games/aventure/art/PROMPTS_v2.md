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

---

# Chapitre 4 « L'orage » (17 nov. 2026)

Tout est nouveau : aucun décor de la v1 ne sert. **Nouvelle conversation ChatGPT**, tout à la suite, dans l'ordre 19 → 28.

Choix faits pour limiter les images :
- **La salle dans le noir** n'est pas une deuxième image : le jeu assombrit la salle éclairée et garde un halo autour de Gab.
- **Les étiquettes des tiroirs** (*Soľ, Sponky, Špagát, Sviečky*) et le numéro de la carte de visite sont écrits par le jeu : les images
  ont des étiquettes **vides**.
- **Le mur de photos** : le décor montre de petits cadres ; en gros plan, le jeu affiche les trois photos de la planche 27 (vallée
  normale, avec la tranchée, avec la cicatrice verte) et fait les 20 étés en variant la lumière et la neige.
- **Le pull de Gab** : Gab porte déjà un sweat. Le gag du froid devient « les chaussettes en laine » (il en prend une paire sur la corde
  à linge), sans changer ses planches.
- **Le sac d'Andrea** est son sac jaune (celui de sa planche), pas un sac vert.
- **La cuisine** est une image de cinématique, avec Gab et Andrea dessinés dedans (comme le bivouac).

## 19. Devant le refuge, le soir : `sources/tatry_chata_vecer_src.png` (décor 3:1)

**À joindre** : `sources/raj_chata_wide_src.png` (pour le style des décors).

Disposition, de gauche à droite : le sentier qui arrive, un grand rocher plat (la marmotte), le petit lac vert, le refuge en pierre
(porte, banc devant, cheminée qui fume, fenêtres éclairées), un tas de bois, les Tatras ; à droite, de gros nuages noirs qui arrivent.

```
Use the attached image (a background of the same game) as the reference for the drawing style, the colours and the level of detail.

Scene: a small old mountain hut made of grey stone with a dark wooden roof, beside a small green mountain lake, high in the High Tatras, Slovakia, drawn as the long scrolling background of a point-and-click adventure game, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the front, early evening at the end of a hot summer day. From left to right: on the far left, a stony hiking path arriving between dwarf pines; a large flat grey boulder; the small still lake, deep green, reflecting the peaks; in the middle-right, the stone hut with a heavy wooden door, two small windows with warm yellow light inside, a long wooden bench against the wall beside the door, a stone chimney with a thin line of smoke, a stack of firewood under the roof edge, a few wet hiking boots drying on a stone; behind, the jagged grey peaks of the High Tatras with small patches of old snow. The sky is blue and golden on the left, but on the RIGHT side huge dark storm clouds are arriving over the peaks, heavy and black-blue, the light under them a strange yellow-green. The scene is EMPTY (no people, no animals). The lower third of the picture, along the whole width, stays clear and uncluttered (path, stones, short grass), because characters will walk there. No text, no letters, no numbers, no signs with writing, no logos.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```

À vérifier : le banc devant la porte (le monsieur y laisse sa carte), les nuages noirs à droite, le bas dégagé.

## 20. Le même endroit, le matin après l'orage : `sources/tatry_chata_rano_src.png` (décor 3:1)

**À la suite.** Il faut que tout soit à la même place que sur l'image 19 (le jeu passe de l'une à l'autre).

```
Now draw EXACTLY the same scene with exactly the same composition, the same hut, lake, boulder, path and peaks at the same places, but the next morning after a violent night storm: clean washed sky, soft fresh morning light, everything wet and shining, many puddles on the path, small new white waterfalls running down the rocks and the slopes behind the hut, the lake higher and a bit muddy at the edge, broken small branches on the ground, the bench by the door wet and EMPTY, a thin mist rising from the lake. No people, no animals, no text.
```

À vérifier : le refuge, le banc et le lac aux mêmes endroits que sur l'image 19 (sinon je recale par le code, si l'écart est petit).

## 21. La salle du refuge : `sources/tatry_izba_src.png` (décor 3:1)

**À la suite.**

Disposition, de gauche à droite : la porte d'entrée (avec un coffre à bois et un banc à côté), le tableau des fusibles, le mur de
photos (une vingtaine de petits cadres identiques), la fenêtre (rebord avec une boîte d'allumettes), la grande table et ses bancs, le
poêle avec une étagère au-dessus, le buffet à 4 tiroirs à étiquettes vides, la porte de la cuisine avec un passe-plat.

```
Now, in the same drawing style, draw the next scrolling background of the game: the warm main room inside the same old stone mountain hut, evening, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the front, warm yellow lamplight from a hanging lamp, wooden walls and a wooden floor. From left to right: the heavy wooden front door (closed), with a big wooden wood chest with a lid beside it and a low wooden bench along the wall; a small grey electric fuse box on the wall with a little door; a whole wall section covered with about twenty small identical wooden picture frames in neat rows, each showing the same small green mountain valley landscape (tiny, no details readable); a small window with a deep wooden sill, outside the dark stormy sky, a small matchbox lying on the sill in a little puddle of water; in the middle, a long heavy wooden table with two benches, a pot of tea and one mug on it; a black cast-iron wood stove with a glowing little window, a stovepipe going up, and above it a wooden shelf with a round metal tin box and a kettle; a line of woollen socks drying on a string above the stove; on the right, an old painted wooden dresser with FOUR small drawers in a row, each with a small EMPTY white label card (no writing), and plates on top; on the far right, a wooden door to the kitchen with a small square serving hatch next to it (closed little shutter). The room is EMPTY (no people, no animals). The lower third along the whole width is open floor (characters walk there). No text, no letters, no numbers on anything, no logos.
```

À vérifier : les 4 étiquettes vides et bien visibles, la boîte en fer sur l'étagère, la boîte d'allumettes sur le rebord, le passe-plat.

## 22. Le gardien du refuge : `sources/chatar_sheet_src.png` (planche de poses)

**À la suite. À joindre** : `sources/pan_sheet_src.png` (les humains de ce jeu).

```
Use the attached image (a sprite sheet of a man in a suit) as the reference for how humans are drawn in this game: very simple cartoon shapes, flat colours, small simple eyes, few lines on the face. Create a character pose sheet in the same style: 3:1 format (3072x1024 pixels), 4 columns x 2 rows of equal cells, the SAME character in every cell, full body, same scale, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn, pure green #00FF00 background, no text.
The character: the keeper of a mountain hut, an old man around seventy, big and broad, grey beard, bushy grey eyebrows, red cheeks, a thick cream cable-knit wool sweater, brown corduroy trousers, heavy mountain boots, a good-natured face. He has a bad knee.
Poses, all facing RIGHT: 1 standing, one hand on his knee, looking up at the sky, worried; 2 talking, one hand raised, finger up ("my knee knows"); 3 laughing out loud, head back, belly shaking; 4 holding a small picture frame and showing it; 5 holding a lit candle at chest height (the face lit from below); 6 walking slowly, limping, one hand on the knee; 7 serious, arms crossed, deadpan face; 8 giving a wink, holding two mugs of tea.
```

## 23. Le monsieur au sourire, trempé : `sources/pan_mokry_sheet_src.png` (planche de poses)

**À la suite.** Si la conversation est neuve, rejoindre `sources/pan_sheet_src.png`.

```
Same style, same layout (3:1, 4 columns x 2 rows, same scale, same baseline, pure green #00FF00 background, no text). The character: EXACTLY the smiling man in a dark charcoal suit of the attached sheet (same face, same thin wide smile that never changes, same hair, red tie), but soaked by a storm: wet hair stuck on his forehead, the suit dark with water, water dripping from his sleeves and his nose, little puddles at his feet.
Poses, all facing LEFT: 1 standing at a door, dripping, smiling politely; 2 talking, one palm open, smiling; 3 leaning forward towards someone small, smiling very sweetly, as if testing them; 4 looking around the room with suspicion, still smiling; 5 sitting on an invisible bench, holding a mug of tea in both hands; 6 asleep sitting on an invisible bench, head on his rolled-up jacket, STILL smiling in his sleep (now in shirt and red tie, the jacket rolled under his head); 7 holding out a small white business card between two fingers; 8 shaking water from one hand, annoyed, but smiling.
```

## 24. Figurants du chapitre 4 : `sources/figurants_ch4_src.png`

**À la suite.** Ici, 3 colonnes : **chaque colonne est un figurant**, pose 1 en haut, pose 2 en bas.

```
Same style. A 3:1 sheet (3072x1024 pixels) of 3 columns x 2 rows of equal cells, pure green #00FF00 background, no text, nothing touching the cell borders. Each COLUMN is one character: pose 1 in the top cell, pose 2 in the bottom cell, at exactly the same size and position.
Column 1: a big old Saint Bernard dog (a real dog on four legs, not dressed), lying on the floor: (top) asleep, (bottom) the same, one ear raised and one eye open, listening to the thunder.
Column 2: two soaked hikers (an anthropomorphic badger and an anthropomorphic goat in wet rain jackets) sitting side by side on an invisible bench, behind an invisible table, cards in their hands: (top) playing cards, concentrated, (bottom) both turned towards the left, looking at a window, frightened by the thunder.
Column 3: a marmot (an anthropomorphic but undressed animal, standing on its hind legs) on a small grey rock (rock included, same in both cells): (top) standing still, watching, (bottom) whistling loudly, mouth open, little sound lines.
```

## 25. Objets du chapitre 4 (1) : le noir et le thé : `sources/objets_ch4_src.png`

**À la suite.**

```
Same style, same rules (3:1, 4 columns x 2 rows, ONE object per cell, centred, pure green #00FF00 background, nothing touching the cell borders, no text, no numbers, no brand names):
1 a white candle in a simple metal candle holder, lit, a small warm flame;
2 a small cardboard matchbox, soaked with water, soft and dark, a few water drops;
3 a round old metal tin box with a lid, closed;
4 a small dry matchbox, closed, as an inventory icon;
5 an old enamel kettle;
6 a single empty enamel mug, as an inventory icon;
7 two steaming enamel mugs of tea side by side on a small piece of wooden table;
8 an old ceramic electric fuse (a small white cylinder with a metal cap).
```

## 26. Objets du chapitre 4 (2) : les traces d'Andrea et la carte : `sources/objets_ch4b_src.png`

**À la suite. À joindre** : `sources/andrea_sheet_src.png` (le sac et les baskets d'Andrea).

```
Same style, same rules (3:1, 4 columns x 2 rows, ONE object per cell, centred, pure green #00FF00 background, no text, no numbers, no logos):
1 the yellow shoulder bag of the hare girl in the attached sheet, lying flat on a bench (the bench not drawn);
2 her red sneakers, soaking wet, standing side by side, a small puddle around them;
3 a plain white business card, slightly bent, EMPTY (no writing, no logo);
4 a pair of thick woollen hiking socks, red and cream, hanging on a short piece of string;
5 a magnifying glass with a wooden handle;
6 a small yellow excavator, seen from the side, drawn very small and simple, like a toy (it will be placed on a photo);
7 a big folded paper map of the Tatras mountains with no writing at all, closed;
8 a small wooden picture frame, empty inside (just the frame).
```

## 27. Les photos du mur : `sources/fotky_chata_src.png`

**À la suite.**

```
Same style. A 3:1 sheet (3072x1024 pixels) of 3 columns x 1 row of equal cells, pure green #00FF00 between the pictures, no text. Each cell contains ONE square landscape picture, the same view three times, exactly the same framing: a wide green mountain valley in summer, seen from above, from a high rock (the edge of a grey rock in the bottom-left corner), meadows and spruce forest on the slopes going down towards a distant plain, the High Tatras peaks on the horizon, small white clouds; far down in the plain, a big grey square industrial building, tiny.
(1) the normal valley.
(2) the same valley, but with ONE long straight brown line of freshly dug earth (a trench) coming down the slope from a wet green marshy area near the top to the grey building in the plain, straight like a ruler, cutting through forest and meadows; next to the trench, near the top, a small yellow excavator gives the scale: the trench is AS WIDE as the excavator.
(3) the same valley one year later: the line is still visible, but green now, like a straight scar of younger, lighter grass.
```

## 28. Animations du chapitre 4 : `sources/ambiance_ch4_src.png`

**À la suite.**

```
Same style, same rules (3:1, 4 columns x 2 rows, pure green #00FF00 background, no text). Small animation frames, each element at the same size and position in its successive frames:
Cells 1-2: a white-yellow lightning bolt, two different zigzag shapes.
Cells 3-4: diagonal rain streaks on a window pane (only the light blue-white streaks and drops, no window frame), two different frames.
Cells 5-6: a small candle flame (only the flame, warm yellow-orange), two shapes.
Cells 7-8: the glowing orange window of a wood stove (only the small fire window with flames), two frames.
```

## 29. La cuisine dans le noir (cinématique) : `sources/tatry_kuchyna_src.png` (16:9)

**À la suite. À joindre** : `sources/gab_sheet_src.png` et `sources/andrea_sheet_src.png`.

```
Using the two attached character sheets (the fox boy and the hare girl), draw a single illustration in 16:9 format (1920x1080 pixels), same drawing style: a small dark kitchen of the mountain hut at night during a storm. The hare girl sits on the wooden floor, her back against a kitchen cupboard, knees up under her chin, holding a steaming enamel mug in both hands, sad and thoughtful. The fox boy sits beside her, holding his own mug, looking at her. The only light: a candle on the floor between them, warm and small, and a cold blue flash of lightning through a small window above them, rain on the glass. Pots and pans hanging on the wall, a shelf with jars. Quiet, intimate mood. No text, no letters, no logos.
```

## Après la génération (chapitre 4)

11 générations (19 → 29). Les décors 19, 20 et 21 sont les plus importants : si le matin (20) ne garde pas la même composition que le
soir, on le refait tout de suite.

---

# Chapitre 5 « Quarante-deux centimètres » (18 nov. 2026)

Le village de Maťo et Katka, jeudi midi. **Nouvelle conversation ChatGPT**, dans l'ordre 30 → 3x. On commence par les trois décors.

Choix faits pour limiter les images :
- **La plaque OPTIKA** : l'image montre une plaque en fer **sans aucune lettre** ; le jeu écrit le mot dessus.
- **Le boîtier de la fibre** (chez Babka) : un tout petit boîtier blanc en plastique au mur de l'entrée, bien visible mais discret.
- **Les figurants** (moutons, brebis coincée, coq, bouc, chien, poules, blaireau au tracteur, Babka, Maťo, Katka) viennent en planches séparées sur fond vert, après les décors.
- **Le bâtiment gris** n'apparaît qu'au loin dans le décor 30 (on le voit sans savoir encore).

## 30. Le ruisseau à sec et le pré : `sources/dedina_potok_wide_src.png` (décor 3:1)

**À joindre** : `sources/rue_wide_src.png` (pour le style et les couleurs d'un décor de village).

Disposition, de gauche à droite : deux maisons de village (une cheminée qui fume), le vieux puits en pierre avec son seau, un banc de bois contre un mur, le lit du ruisseau **à sec** (cailloux, galets, vase craquelée), le vieux pont de pierre bas qui l'enjambe (assez bas pour qu'une brebis puisse s'y coincer dessous), le pré, la bergerie à droite, au loin un grand bâtiment gris.

```
Use the attached image (a background of the same game) as the reference for the drawing style, the colours and the level of detail.

Scene: a small village in the Slovak countryside at noon in the height of a very dry summer, drawn as the long scrolling background of a point-and-click adventure game, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the front, bright hard midday sunlight, a pale blue sky with no cloud. From left to right: two small whitewashed village houses with red tile roofs and a stone chimney with a thin line of smoke on the second one, wooden shutters, a few pots of geraniums; an old round stone well with a small wooden roof and a bucket hanging on a rope; a wooden bench against a house wall; then a DRY stream bed running across the picture from the foreground to the background: only pale round stones, pebbles, cracked grey mud and a few dead reeds, absolutely no water; across it a low old stone bridge with a single small arch (low and narrow, just big enough for a sheep to crawl under), with a worn dirt road over it; on the right, a green-yellow meadow with tall dry grass and a few daisies, a wooden fence, and a small wooden sheep barn with a corrugated roof and an open side; on the horizon, soft hills, and far away on the right a large, low, windowless GREY concrete building, tiny and distant, with a small grey chimney. The scene is EMPTY (no people, no animals). The lower third of the picture, along the whole width, stays clear and uncluttered (dirt road, dry stream bed stones, short grass), because characters will walk there. No text, no letters, no numbers, no signs with writing, no logos.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```

À vérifier : le lit du ruisseau **vraiment sec** (aucune goutte), le pont bas avec un petit passage dessous, le puits et son seau, le bâtiment gris tout petit au loin, le bas dégagé.

## 31. La cuisine de Babka : `sources/dedina_kuchyna_wide_src.png` (décor 3:1)

**À la suite. À joindre** : `sources/urad_wide_src.png` (pour le style d'un décor d'intérieur).

Disposition, de gauche à droite : l'entrée (patère avec des manteaux, **le petit boîtier blanc de la fibre au mur** et **une prise électrique** juste en dessous), la porte ouverte de la cuisine, la grande table avec nappe à carreaux (une assiette creuse, une cuillère, un pichet) et ses chaises, la fenêtre avec un rideau, une horloge à coucou au mur, le fourneau avec une grosse casserole, le buffet avec des verres et des tasses, une tête de chou sur le plan de travail.

```
Now, in the same drawing style, draw the next scrolling background of the game: the warm kitchen of a Slovak grandmother's old village house, noon, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the front, soft warm light coming from a window, wooden floor with a woven rug, whitewashed walls with a painted folk-art border. From left to right: a small entrance hall with a wooden coat rack holding two coats and a flat cap, a very small plain WHITE PLASTIC box about the size of a matchbox lid fixed on the wall with a tiny green light and one thin cable going into the wall (a home fibre-optic box, not decorated, easy to overlook), and just below it a white wall electric socket; a wide open doorway into the kitchen; a big wooden table with a red-and-white checked tablecloth, a deep plate, a spoon and a jug on it, and four wooden chairs; a window with a lace curtain, flowerpots on the sill; a wooden cuckoo clock on the wall with two pine-cone weights (no numbers on the dial, no text); a cast-iron cooking stove with a big black pot and a wooden spoon beside it; a wooden cupboard with glass doors showing glasses, mugs and plates, one tall drinking glass standing alone on the shelf edge; a head of green cabbage with big outer leaves on the work surface; a dog's blanket on the floor under the table. The room is EMPTY (no people, no animals). The lower third along the whole width is open floor (characters walk there). No text, no letters, no numbers on anything, no logos.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```

À vérifier : le petit boîtier blanc de la fibre **très petit mais visible**, la prise juste dessous, le grand verre seul dans le buffet, le chou, la couverture du chien sous la table.

## 32. Derrière la bergerie : `sources/dedina_zadok_wide_src.png` (décor 3:1)

**À la suite. À joindre** : `sources/dedina_potok_wide_src.png` (l'image 30 : même village, même lumière).

Disposition, de gauche à droite : le mur arrière de la bergerie en planches (avec du linge sur une corde), une botte de paille, **la plaque de fer vissée dans le sol, bien au milieu**, des herbes hautes, une clôture, un chemin de terre qui traverse le fond (par où passe le tracteur), les collines, et le toit du village au loin.

```
Now, in the same drawing style, draw the next scrolling background of the game: the quiet back side of the same wooden sheep barn of the village, noon, bright sunlight, as a very wide panoramic image in 3:1 format (3072x1024 pixels), seen from the front. From left to right: the weathered grey wooden plank back wall of the sheep barn with a small closed hatch, a clothesline stretched in front of it with a few old shirts and towels hanging; a round hay bale and a rusty metal bucket; in the CENTRE of the foreground, on a patch of trampled earth, a rectangular RUSTY IRON PLATE flush with the ground, about the size of a door mat, held down by four big round bolts, its surface completely EMPTY and smooth (no letters, no numbers, no markings at all), with a little worn path leading to it; tall yellow-green grass, a few wildflowers and thistles around it; further right a low wooden fence and a dirt farm track crossing the middle distance from side to side, wide enough for a tractor; behind, rolling hills, a few red roofs of the village far away, and in the very far distance a small low grey building. The scene is EMPTY (no people, no animals, no vehicles). The lower third of the picture, along the whole width, stays clear and uncluttered (earth, short grass, the iron plate in the middle), because characters will walk there. No text, no letters, no numbers, no logos.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, simplified shapes, gentle gradients, no photographic textures or reflections. Landscape 3:1 format. No text, no letters, no numbers, no logos, no watermark.
```

À vérifier : la plaque de fer **sans aucune lettre** et bien visible au centre, le chemin du tracteur au fond, le linge, le bas dégagé.

## 33. Maťo : `sources/mato_sheet_src.png` (planche de poses)

**Nouvelle conversation ou à la suite.** **À joindre** : `sources/gab_sheet_src.png` (le style des animaux de ce jeu) et `sources/ref_mato_katka.png` (Maťo à gauche : c'est lui, à reproduire).

```
Use the first attached image (a sprite sheet of the fox boy) as the reference for the drawing style: clean ink outlines, flat colours with soft cel shading, same proportions of a young anthropomorphic animal. Use the second attached image: the character on the LEFT (the bear) is Maťo, to be reproduced exactly. Create a character pose sheet: 3:1 format (3072x1024 pixels), 4 columns x 2 rows of equal cells, the SAME character in every cell, full body, same scale, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn, pure green #00FF00 background, no text.
The character: Maťo, a big, friendly young brown bear of about sixteen, exactly as in the attached image: orange-brown fur, a green-and-orange checked shirt open over a grey T-shirt, olive cargo shorts, dark sneakers, a dark backpack on his back, a warm clumsy face.
Poses, all facing RIGHT: 1 standing, counting on his fingers, lips moving, frowning with effort; 2 scratching his head, lost his count, puzzled; 3 bending forward, both hands gripping an invisible handle at ground level, pulling with all his might, face red, teeth gritted; 4 crouching, the side of his head pressed against the ground, listening; 5 index finger on his lips, eyes wide, saying "shh"; 6 holding a deep plate and a spoon, cheeks full, delighted; 7 both arms up and waving, mouth wide open, very excited, a huge smile; 8 sitting on an invisible chair, patting his round belly with both hands, eyes half closed, "I cannot eat any more".
```

À vérifier : le même ours que sur l'image de référence (chemise à carreaux, sac à dos), même taille et mêmes pieds dans toutes les cases.

## 34. Katka : `sources/katka_sheet_src.png` (planche de poses)

**À la suite. À joindre** : `sources/mato_sheet_src.png` (une fois validée) et `sources/ref_mato_katka.png` (Katka à droite).

```
Same style, same layout (3:1, 4 columns x 2 rows, same scale, same baseline, pure green #00FF00 background, no text). The character: Katka, a young brown marmot girl of about fifteen, exactly as the character on the RIGHT of the second attached image: brown fur, a purple hoodie with white headphones around her neck, grey trousers with turned-up cuffs, lilac sneakers, a bushy tail, a smartphone with a dark case. IMPORTANT: her mouth is SMALL and CLOSED or only slightly open, NO big buck teeth, no beaver teeth visible. Smaller than Maťo.
Poses, all facing RIGHT: 1 standing, looking down at her phone held in both hands, thumbs typing; 2 holding the phone up in front of her, filming, one eye squinting; 3 the phone against her ear, listening carefully; 4 proudly pointing forward with one finger, chin up, a small confident smile; 5 one finger on her lips, the other hand holding the phone with a dark screen (silent mode); 6 holding out the phone with the screen turned towards the viewer, serious; 7 crouching, holding a phone with a charging cable in one hand and reaching forward with the other hand to plug it in; 8 stunned, the phone hanging at her side, wide eyes, small mouth slightly open.
```

À vérifier : **pas de grandes dents** (elles reviennent par défaut), le même sweat violet, le téléphone bien visible.

## 35. Babka Zuzana (la grand-mère de Maťo et Katka) : `sources/babka_dedina_sheet_src.png` (planche de poses)

**À la suite. À joindre** : `sources/mato_sheet_src.png` (une fois validée, pour le style) et `sources/ref_zuzana.png` (Babka Zuzana : c'est elle, à reproduire).

```
Same style, same layout (3:1, 4 columns x 2 rows, same scale, same baseline, pure green #00FF00 background, no text). Use the second attached image: it is Babka Zuzana, to be reproduced exactly. The character: Babka Zuzana, the grandmother of Maťo and Katka, an old SHEEP lady of about eighty, cream-coloured face with floppy ears, a little grey wool under a red flowered headscarf knotted under her chin, small round glasses, a white embroidered blouse with red folk patterns, a dark embroidered vest, a long red skirt and a white apron with red embroidery at the hem, dark shoes. A kind, firm, smiling face. Same costume in every pose.
Poses, all facing RIGHT: 1 stirring a big pot with a long wooden spoon, humming, eyes closed; 2 pointing her wooden spoon at someone, stern but loving, eyebrows up, saying "eat!"; 3 ladling food into a deep white plate that she holds in the other hand; 4 seen from BEHIND (back to the viewer), stirring a pot, apron strings tied in a bow; 5 laughing, one hand on her belly, the other on her apron; 6 holding up a tall drinking glass and looking at it against the light; 7 arms crossed, one eyebrow raised, suspicious, listening; 8 waving goodbye with a dish towel, smiling.
```

À vérifier : bien **la brebis de l'image de référence** (fichu rouge, gilet brodé, tablier), pas la chèvre du tram, et la pose 4 de dos.

## 36. Figurants du chapitre 5 (1) : les moutons : `sources/figurants_ch5_src.png`

**À la suite.** 3 colonnes : **chaque colonne est un figurant**, pose 1 en haut, pose 2 en bas (même taille, mêmes pieds).

```
Same style. A 3:1 sheet (3072x1024 pixels) of 3 columns x 2 rows of equal cells, pure green #00FF00 background, no text, nothing touching the cell borders. Each COLUMN is one animal: pose 1 in the top cell, pose 2 in the bottom cell, at exactly the same size and position, seen from the side, facing RIGHT. They are REAL sheep on four legs (not dressed, not standing on two legs), cream-coloured wool, small dark faces.
Column 1: a sheep wearing a brass bell on a leather strap round her neck: (top) head down, grazing; (bottom) head up, chewing, looking towards the viewer.
Column 2: an ordinary sheep with a dark brown face and dark legs, no bell: (top) head down, grazing; (bottom) head up, one ear flicking.
Column 3: a big ewe in trouble: (top) legs braced, bleating miserably, a tuft of wool of her back pulled backwards as if caught on something behind her, sad eyes; (bottom) the same sheep, free, delighted, chewing a big green-white cabbage leaf. IMPORTANT: no green on the sheep (the cabbage leaf is pale yellow-white).
```

## 37. Figurants du chapitre 5 (2) : le coq, le bouc, les poules : `sources/figurants_ch5b_src.png`

**À la suite.**

```
Same style, same layout (3:1, 3 columns x 2 rows, each COLUMN one character with 2 poses at the same size and position, pure green #00FF00 background, no text, nothing touching the cell borders), all facing RIGHT.
Column 1: a proud rooster (a real bird on two legs, not dressed), red comb, copper and black feathers, standing: (top) head back, crowing; (bottom) head tilted, looking sideways, beak closed, suspicious.
Column 2: a very old billy goat (an anthropomorphic goat, dressed), grey beard, a flat cap, a brown waistcoat, a walking stick, SITTING on an invisible bench, legs hanging: (top) both hands on the walking stick, looking far away, dreamy; (bottom) the same, one hand raised, talking, eyes half closed, remembering the old days.
Column 3: a group of three hens (real birds, brown and white): (top) all three pecking the ground; (bottom) all three heads up, one of them flapping her wings.
IMPORTANT: no green on the characters.
```

## 38. Figurants du chapitre 5 (3) : le chien et le tracteur : `sources/figurants_ch5c_src.png`

**À la suite.**

```
Same style, same layout (3:1, 3 columns x 2 rows, each COLUMN one subject with 2 poses at the same size and position, pure green #00FF00 background, no text, nothing touching the cell borders), all facing RIGHT.
Column 1: a small shaggy grey dog (a real dog on four legs, not dressed), LYING on the floor: (top) head on his paws, huge begging eyes, looking up; (bottom) chewing happily, eyes closed, cheeks full.
Columns 2 and 3 together (one subject spread on two cells of width): an old small red tractor with big rear wheels, rusty mudguards, a tall thin exhaust pipe, driven by an old anthropomorphic badger in a flat cap and blue overalls, seen from the side: (top row) driving along, the badger looking straight ahead; (bottom row) exactly the same tractor, with a little puff of grey smoke from the exhaust and the badger lifting one hand in greeting. Same position and size in the two rows.
IMPORTANT: no green on the tractor.
```

## 39. Le maire : `sources/starosta_sheet_src.png` (planche de poses)

**À la suite. À joindre** : `sources/pan_sheet_src.png` (le style des humains de ce jeu) et `sources/ref_starosta.jpg` (l'illustration du cours : le maire est l'homme au centre, à reproduire).

```
Use the first attached image (a sprite sheet of a man in a suit) as the reference for how humans are drawn in this game: very simple cartoon shapes, flat colours, small simple eyes, few lines on the face. Use the second attached image: the man in the CENTRE (the one scratching his head, beside the blue car) is the mayor, to be reproduced exactly, but drawn in the simple style of the first image. Create a character pose sheet: 3:1 format (3072x1024 pixels), 4 columns x 2 rows of equal cells, the SAME character in every cell, full body, same scale, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn, pure green #00FF00 background, no text.
The character: the mayor of a small village, a middle-aged man of about fifty-five, balding with a few grey hairs, a grey moustache, a beige jacket over a cream open-collar shirt, a brown belt, dark brown trousers, brown leather shoes. A warm, always-busy, slightly self-satisfied air. He is NOT a villain: he believes he is helping the village.
Poses, all facing LEFT: 1 standing, arms wide open, a big welcoming smile; 2 the phone against his ear, one finger raised ("one moment, I am going to phone"); 3 pointing proudly behind him with his thumb; 4 patting an invisible shoulder, bending slightly, friendly; 5 walking briskly, briefcase in hand; 6 wiping his forehead with a handkerchief, relieved; 7 shaking an invisible hand with both of his; 8 getting into an invisible car: bending down, one foot lifted.
```

À vérifier : le même homme que dans l'illustration du cours (moustache, veste beige, front dégarni), dans le style simple de la planche du monsieur au sourire.

**La voiture du maire** : dans le cours, c'est une **petite voiture bleu foncé** (vue sur la même illustration). Je m'en servirai pour la cinématique.

## 40. Objets du chapitre 5 : `sources/objets_ch5_src.png`

**À la suite.**

```
Same style. Create an object sheet for a 2D point-and-click adventure game: a very wide image in 3:1 format (3072x1024 pixels), a grid of 4 columns and 2 rows of equal cells, ONE object per cell, centred, nothing touching the cell borders, no cell borders drawn, pure green #00FF00 background, no shadows, no text. Seen from the side and slightly from the front, same clean ink outlines, flat colours and soft cel shading.
1 a big outer cabbage leaf, PALE YELLOW-WHITE with cream veins (no green at all), wavy edges, as an inventory icon;
2 a tall, thin, empty drinking glass, clear glass with a light GREY-BLUE tint and white highlights (no green tint at all), standing;
3 a deep white plate with a blue rim full of Slovak potato dumplings (halušky) with cabbage and a little bacon, a heap, a spoon in it;
4 the same plate, half empty;
5 the same plate, completely empty and clean, the spoon lying in it;
6 a small checked cloth napkin tied in a bundle, a little yellow dumpling peeking out, as an inventory icon;
7 a white phone charger: a short plug, a thin white cable coiled in a loose loop, as an inventory icon;
8 a very small plain white plastic box, the size of a matchbox lid, seen from the front, with two small round sockets and one tiny ORANGE light, one thin cable going out of its side (a home fibre box), as a close-up icon.
IMPORTANT: no green on any object.
```

## 41. La voiture du maire : `sources/auto_starosta_src.png`

**À la suite. À joindre** : `sources/ref_starosta.jpg` (la petite voiture bleue à droite de l'illustration).

```
Same style. A sheet of 3:1 format (3072x1024 pixels), 1 column x 2 rows of equal cells, pure green #00FF00 background, no shadows, no text, nothing touching the cell borders. The small dark blue hatchback car of the attached illustration (same car: dark blue paint, round headlights, a small antenna), seen exactly from the side, facing LEFT, wheels on the same baseline in both cells, same size and position: (top) doors closed, parked; (bottom) exactly the same car with the driver door wide open. No driver, no passengers, no number plate text.
```

## 42. Le site du bâtiment gris : `sources/site_gris_src.png` (16:9)

**À la suite.**

```
Same style, simplified. A single illustration in 16:9 format (1920x1080 pixels): the screen of a smartphone held upright is NOT drawn; instead draw only a clean, flat, modern WEB PAGE filling the whole image, for a grey industrial company: a dull grey header band with a simple abstract logo (a grey square building with a small chimney, no letters), a thin blue gauge icon in the top right, under it a wide EMPTY table with 8 columns and 3 rows of empty cells (thin grey lines, light grey header row, NO numbers and NO text anywhere), under the table a flat blue line chart frame with a straight horizontal line in the middle and no labels, and a grey footer band. Colours: greys, white and one soft blue. No text, no letters, no numbers, no logos, no watermark.
```

## 43. Animations du chapitre 5 : `sources/ambiance_ch5_src.png`

**À la suite.**

```
Same style. An animation sheet: a very wide image in 3:1 format (3072x1024 pixels), 4 columns x 2 rows of equal cells, ONE element per cell, centred, nothing touching the cell borders, no cell borders drawn, pure green #00FF00 background, no text. Elements that will be placed on top of a game background:
1 a soft curl of white-grey steam rising from a cooking pot, shape A (thin, 3 wisps);
2 the same steam, shape B (the wisps shifted to the right and curling differently);
3 a small carved wooden cuckoo bird sticking out of a tiny open wooden door, beak closed, seen from the front;
4 the same cuckoo, beak wide open, with two small sound lines on each side;
5 a bright yellow butterfly with black-edged wings, wings wide open, seen from the front;
6 the same butterfly, wings half closed;
7 a single clear blue raindrop falling, stretched, with a highlight;
8 three thin blue-grey concentric ripples on water, seen in perspective (flat ellipses).
IMPORTANT: no green anywhere on the elements.
```
