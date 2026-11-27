# Images du jeu : instructions pour Codex

Ce fichier dit à Codex (ChatGPT dans le repo) comment générer les images du point & click « Zajko Quest » à partir des prompts de `web-games/aventure/art/PROMPTS_v2.md`. Il est tenu à jour par la session claude.ai qui écrit les chapitres.

Eric : donne à Codex « Lis `docs/Codex-images.md` et génère les prompts 55, 56 et 57 » (en changeant les numéros).

## Ce que fait Codex

1. Lire la section du chapitre dans `web-games/aventure/art/PROMPTS_v2.md` : chaque prompt a un numéro, un **fichier de sortie** (après les deux points du titre), une ligne **« À joindre »** (les images de référence) et le texte du prompt (le bloc de code, en anglais, à passer tel quel au générateur d'images).
2. Pour chaque prompt demandé, **générer l'image** (`$imagegen`) avec le texte du bloc de code, en donnant comme **images de référence** les fichiers de la ligne « À joindre », **dans l'ordre** (le prompt dit « the first attached image », « the second »…).
   - Chemins : `sources/…` veut dire `web-games/aventure/art/sources/…` ; `img/…` veut dire `img/…` à la racine du repo.
   - « À la suite » ou « dans la même conversation » : le prompt s'appuie sur l'image précédente du même chapitre ; la joindre aussi comme référence (en premier).
   - « Keep this image exactly the same » : c'est une **retouche** de l'image précédente, pas une nouvelle image.
3. **Enregistrer** chaque image en PNG, sans la recadrer ni la compresser, au chemin de sortie indiqué, dans `web-games/aventure/art/sources/`. Formats : décors `_wide_src.png` en 3:1 (3072x1024 si possible), planches en 3:1, images fixes et panneaux en 16:9 (1672x941 si possible). Fond vert **#00FF00 pur** quand le prompt le demande.
4. Ne **rien modifier d'autre** dans le repo (ni code, ni docs, ni autres images).
5. Committer sur une branche `images/chX-NN` (ex. `images/ch7-55-57`) et **ouvrir une pull request** vers `main`, avec dans la description la liste des fichiers créés et, pour chacun, une phrase sur ce qui pourrait ne pas correspondre au prompt (la ligne « À vérifier » du prompt).

Eric et la session claude.ai regardent la PR, valident ou demandent une nouvelle version, puis la session claude.ai découpe les images (`tools/cut_v2.py`).

## Points d'attention (leçons des chapitres précédents)

- **Rien de vert** sur les personnages et les objets des planches (le fond vert est détouré) ; la vapeur, la fumée et l'écume doivent être **blanches** avec un contour gris, pas vert menthe.
- **Même personnage dans toutes les cases** d'une planche (même visage, même moustache, mêmes vêtements, même taille, pieds sur la même ligne).
- **Katka** (la petite marmotte au sweat violet) n'a **pas de grandes dents**.
- **Pas de texte, de lettres ni de chiffres** dans les images (le jeu écrit les textes lui-même).
- Les décors sont **vides** (pas de personnages) et gardent **le tiers du bas dégagé** (on y marche).
