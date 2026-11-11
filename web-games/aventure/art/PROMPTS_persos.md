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
