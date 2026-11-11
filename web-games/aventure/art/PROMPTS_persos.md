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
