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
