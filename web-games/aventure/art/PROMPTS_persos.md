# Planches d'animation des personnages (refaites de zéro, 11 nov. 2026) : prompts ChatGPT

Une planche par personnage, en une seule image 3:1 (3072 x 1024) : 8 colonnes x 2 rangées de cases égales.
Rangée 1 : cycle de marche de profil (8 images, vers la droite ; le jeu retourne l'image pour la gauche).
Rangée 2 : 8 poses de jeu. Fond vert uni (#00FF00) pour le détourage : le découpage, le détourage et l'alignement des pieds sont
faits ensuite par script (`tools/`), puis les images vont dans `art/` (une feuille de marche + une image par pose).

## Gab (le renard) : `gab_sheet_src.png`

**À joindre** : `docs/illustrations/planche-heros.jpg`.

```
Use the attached model sheet for the fox character (Gab): keep him exactly as designed (same face, fur colours, blue hoodie with white drawstrings, dark navy jeans, white sneakers with blue details, yellow backpack on his back).

Create a sprite sheet for a 2D point-and-click adventure game: a very wide image in 3:1 format (3072x1024 pixels), a grid of 8 columns and 2 rows of equal cells, the fox drawn full body in every cell, at exactly the same size and scale in every cell, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn.

Row 1, walk cycle, side view facing RIGHT: 8 consecutive frames of a smooth, natural walk loop (contact, down, passing, up, then the same with the other leg), arms swinging opposite to the legs, the tail moving slightly, the head always at the same height, a relaxed, confident teenager's walk.

Row 2, eight poses, side or three-quarter view facing RIGHT: 1 standing idle, relaxed; 2 talking, mouth open, one hand raised in a gesture; 3 crouching and reaching down to pick something up from the floor; 4 reaching forward with one arm to press a button at chest height; 5 surprised, ears straight up, eyes wide, leaning back; 6 thinking, hand on chin; 7 laughing happily; 8 sitting on an invisible seat (side view, knees bent at 90 degrees, hands on his knees).

Background: one flat, uniform pure green colour (#00FF00) everywhere, with no gradient, no floor, no shadows, no texture, so that the character can be cut out easily. Do not use this green anywhere on the character.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, the same style as the model sheet. No text, no letters, no numbers, no frame labels, no watermark.
```

À vérifier : même taille et même ligne de pieds partout ; jambes qui alternent vraiment dans la marche (images 1 et 5 en
appui sur des jambes différentes) ; aucune case qui déborde ; pas de vert sur le personnage. Si la marche est ratée, on la refait
seule (une rangée de 8) et on garde les poses.


### Premier essai (11 nov.) : `sources/gab_sheet_src.png`

Poses très bonnes (gardées). Marche régulière (même taille, mêmes pieds), mais les deux moitiés du cycle sont presque le même dessin :
c'est toujours le même bras qui part en avant. On refait **la marche seule**.

### Marche seule de Gab : `gab_walk_src.png`

**À joindre** : `docs/illustrations/planche-heros.jpg` et `sources/gab_sheet_src.png` (le premier essai, pour garder exactement le
même Gab). Astuce d'animateur : les membres du côté opposé un peu plus sombres, pour qu'on voie l'alternance.

```
Use the first attached image (the heroes' model sheet) and the second attached image (a sprite sheet of the same fox) for the character: keep the fox (Gab) exactly as drawn there (same face, fur colours, blue hoodie with white drawstrings, dark navy jeans, white sneakers with blue details, yellow backpack), in the same drawing style.

Create ONLY a walk cycle for a 2D point-and-click adventure game: a very wide image in 3:1 format (3072x1024 pixels), ONE row of 8 equal cells, the fox full body in each cell, side view facing RIGHT, at exactly the same size in every frame, the head at the same height, the feet on a common baseline near the bottom, nothing touching the cell borders, no cell borders drawn.

The 8 frames make ONE complete walk cycle (two steps), like a classic animation walk:
1 contact: the NEAR leg (closest to the viewer) forward, heel touching the ground, the far leg behind; the NEAR arm swings BACK and the far arm forward.
2 down: the weight on the near leg, body slightly lower.
3 passing: the near leg straight and supporting, the far leg bent and passing forward; arms close to the body.
4 up: body slightly higher, the far leg reaching forward.
5 contact: now the FAR leg forward, heel touching the ground, the near leg behind; the NEAR arm swings FORWARD and the far arm back.
6 down: the weight on the far leg.
7 passing: the far leg supporting, the near leg bent and passing forward.
8 up: body slightly higher, the near leg reaching forward (it loops back to frame 1).
Frames 1 and 5 must clearly be mirror steps (opposite leg and opposite arm in front). Draw the far arm and the far leg in slightly darker colours than the near ones, so that the alternation is easy to see. The tail sways gently.

Background: one flat, uniform pure green colour (#00FF00) everywhere, with no gradient, no floor, no shadows, no texture. Do not use this green anywhere on the character.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. No text, no letters, no numbers, no frame labels, no watermark.
```


### Résultat (11 nov.) : marche « mains dans les poches », `sources/gab_walk_src.png`

Deux essais avec les bras qui balancent : ChatGPT dessine un seul pas, deux fois (toujours le même bras devant). Mains dans les
poches : plus d'alternance à réussir. Les images 5 à 8 sont des copies de 1 à 4, le jeu boucle donc sur **4 images** (un pas).
Images du jeu : `python3 web-games/aventure/tools/make_sprites.py gab` (détourage, même échelle que les poses mesurée sur la
largeur de la tête, pieds en bas, tête au milieu) → `art/gab_walk.png` (4 images, 8 i/s) et `art/gab_<pose>.png`.
Même méthode pour les autres personnages : poses + marche mains occupées (sac, livre, poches…).


## Andrea (la hase) : `andrea_sheet_src.png` (poses) puis `andrea_walk_src.png` (marche)

**À joindre** : `docs/illustrations/planche-heros.jpg` et `sources/gab_sheet_src.png` (même taille de cases et même style que Gab).

```
Use the first attached image (the heroes' model sheet) for the character: the hare (Andrea), keep her exactly as designed (same face, long ears with dark tips, grey-beige fur, green T-shirt, short denim shorts, red high-top sneakers, yellow shoulder bag). Use the second attached image (a sprite sheet of the fox) only as the reference for the layout, the size and the drawing style.

Create a sprite sheet for a 2D point-and-click adventure game: a very wide image in 3:1 format (3072x1024 pixels), a grid of 8 columns and 2 rows of equal cells, the hare drawn full body in every cell, at exactly the same size and scale in every cell, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn. She is a calm, slightly mysterious teenage girl, a bit taller than the fox.

Row 1, eight poses, side or three-quarter view facing RIGHT: 1 standing idle, calm, one hand on the strap of her bag; 2 talking, a small smile, one hand raised in a gesture; 3 arms crossed, one eyebrow raised; 4 a warm, half-hidden smile, looking slightly down; 5 surprised, ears straight up; 6 pointing forward with one arm; 7 sitting on an invisible seat (side view, knees bent at 90 degrees) reading an open book held in both hands; 8 sitting the same way, the book closed on her knees, looking up and to the right with a smile.

Row 2, eight more poses facing RIGHT: 1 thinking, a finger on her chin; 2 laughing softly, a hand in front of her mouth; 3 worried, ears slightly lowered; 4 whispering, a hand next to her mouth; 5 waving hello; 6 holding out a small object in her open hand; 7 crouching to pick something up; 8 shrugging, palms up.

Background: one flat, uniform pure green colour (#00FF00) everywhere, with no gradient, no floor, no shadows, no texture. Do not use this green anywhere on the character.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, the same style as the model sheet. No text, no letters, no numbers, no frame labels, no watermark.
```


### Résultat (11 nov.) : `sources/andrea_sheet_src.png` (16 poses) et `sources/andrea_walk_src.png`

Poses toutes bonnes. Marche (demandée dans la même conversation, une main sur la bandoulière, le livre contre la poitrine) : cette
fois un **vrai cycle de 8 images** (les deux pas différent), utilisé en entier. Images du jeu : `make_sprites.py andrea` →
`art/andrea2_*` (`art/andrea.png` et `andrea_walk.png` restent ceux de l'aperçu `tram.js`). Dans le tram : assise en train de lire
(`read`), lève les yeux (`look`), se lève et fait un pas vers Gab, puis `arms`, `surprised`, `laugh`, `point` selon les répliques.


## Le contrôleur (*revízor*, humain) : `revizor_sheet_src.png` (une seule planche : marche + poses)

**À joindre** : `sources/gab_sheet_src.png` (cadrage et style) et `img/illus_01_kosice_2.jpg` (la façon de dessiner les humains).

```
Use the first attached image (a sprite sheet of a fox) as the reference for the layout, the size and the drawing style, and the second attached image for how ordinary humans are drawn in this world: very simple cartoon shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces.

Create a sprite sheet for a 2D point-and-click adventure game: a very wide image in 3:1 format (3072x1024 pixels), a grid of 8 columns and 2 rows of equal cells, the same character drawn full body in every cell, at exactly the same size and scale in every cell, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn.

The character: an ordinary adult human man, a tram ticket inspector in Kosice, Slovakia, a bit taller than the fox, slightly round, with a small moustache. He wears a navy-blue uniform jacket and trousers, black shoes, a navy cap, a lanyard with a plain badge (no text), and carries a small grey handheld ticket machine. Serious and a bit stern, but kind underneath.

Row 1, walk cycle, side view facing RIGHT: 8 consecutive frames of a calm, official walk, with the hand holding the ticket machine against his chest and the other hand behind his back, so that the arms stay still in every frame; only the legs, a gentle body bounce and the lanyard move.

Row 2, eight poses facing RIGHT: 1 standing, neutral; 2 holding out his open hand, asking for a ticket; 3 looking down at a ticket in his hand, checking it; 4 nodding with a small satisfied smile; 5 frowning, arms crossed; 6 writing on a small notepad (a fine); 7 pointing firmly at the floor; 8 touching the peak of his cap with two fingers, a polite goodbye.

Background: one flat, uniform pure green colour (#00FF00) everywhere, with no gradient, no floor, no shadows, no texture. Do not use this green anywhere on the character.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. No text, no letters, no numbers, no frame labels, no watermark.
```

### Résultat (11 nov.) : `sources/revizor_sheet_src.png`

Bonne du premier coup : marche (bras immobiles, 8 images différentes) et 8 poses. `make_sprites.py revizor` (échelle mesurée sur la
hauteur : la casquette fausse la largeur de la tête) → `art/revizor2_*`. Dans `inspect()`/`fine()` (`tram.js`) : `ask`, `arms`
(mauvaise réponse), `check`, `nod`, `salute`, `write` (amende).

## Le jardinier (*záhradník*, humain) : `zahradnik_sheet_src.png` (marche + poses)

**À joindre** : `sources/revizor_sheet_src.png` (cadrage, taille, style des humains) et `sources/gab_sheet_src.png`.

```
Use the first attached image (a sprite sheet of a human inspector) as the reference for the layout, the size and the drawing style, and the second one for the proportions relative to the fox.

Create a sprite sheet for a 2D point-and-click adventure game: a very wide image in 3:1 format (3072x1024 pixels), a grid of 8 columns and 2 rows of equal cells, the same character drawn full body in every cell, at exactly the same size and scale in every cell, feet on the same baseline near the bottom of each cell, nothing touching the cell borders, no cell borders drawn.

The character: an elderly town gardener in Kosice, Slovakia, thin and slightly stooped, a weathered kind face, a grey moustache, a faded straw hat, a green work apron over a checked shirt and brown trousers, rubber boots. He is tired but good-natured, and worried about the dry fountain.

Row 1, walk cycle, side view facing RIGHT: 8 consecutive frames of a slow, tired walk, one hand holding a garden rake upright against his shoulder and the other hand in his apron pocket, so that the arms stay still in every frame; only the legs, a gentle body bounce and the hat move.

Row 2, eight poses facing RIGHT: 1 standing, neutral, hands in the apron; 2 talking, one hand raised; 3 shrugging with a sad smile, palms up; 4 pointing at the ground, as at an empty basin; 5 scratching his head under the hat, puzzled; 6 handing something over with both arms stretched forward, a kind smile; 7 looking up at the sky with a hand shading his eyes; 8 a small wave goodbye.

Background: one flat, uniform pure green colour (#00FF00) everywhere, with no gradient, no floor, no shadows, no texture. Do not use this green anywhere on the character (the apron must be dark olive or teal, not bright green).

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading, very simple cartoon humans. No text, no letters, no numbers, no frame labels, no watermark.
```

## Le monsieur au sourire (*pán v obleku*, humain, récurrent) : `pan_sheet_src.png`

**À joindre** : mêmes fichiers. Si c'est dans la même conversation, pas besoin de rejoindre quoi que ce soit.

```
Same layout, size and drawing style as the previous sheet. New character: a tall slim man in his forties, spokesman of a company, a perfectly pressed dark charcoal suit, white shirt, a dull red tie, shiny black shoes, neat slicked-back hair, a thin smile that is a little too wide and never changes (keep the same wide smile in every cell, even when he gives orders), small cold eyes. He is polite and smooth, but not trustworthy.

Row 1, walk cycle, side view facing RIGHT: 8 consecutive frames of a smooth, confident walk, one hand holding a slim black briefcase and the other hand in his trouser pocket, so that the arms stay still in every frame; only the legs and a slight body bounce move.

Row 2, eight poses facing RIGHT: 1 standing, neutral, hands joined in front, smiling; 2 talking, one palm open in a reassuring gesture; 3 holding out his open hand, asking for the notebook with an even bigger smile; 4 glancing at his wristwatch; 5 shaking his head with the same smile, a polite "no"; 6 straightening his tie; 7 pointing firmly with one finger, still smiling; 8 getting into a car posture: leaning slightly forward, one hand on an invisible car door, looking back over his shoulder.

Background: flat pure green (#00FF00), no gradient, no floor, no shadows. Do not use that green on the character. No text, no letters, no numbers, no frame labels, no watermark.
```
