# Zajko — point-and-click (aperçu)

Un jeu d'aventure dans l'esprit des *Chevaliers de Baphomet* : décors peints fixes, on clique pour
marcher, regarder, parler, utiliser un objet. Les énigmes sont des exercices de slovaque déguisés.
Aperçu : la scène du tram de Košice (valider son ticket, passer le contrôle, descendre).

- **Jouer** : `aventure/index.html` (souris ou doigt ; Espace ou « Zones » montre ce qui est cliquable).
- **Moteur** : `js/engine.js` (scène, zones, sprites, inventaire, dialogues SK/FR, Slovník, sauvegarde).
- **Scène** : `js/tram.js` — données (image, sol, vitres, zones) et histoire écrite en `async/await`
  (`await g.say('andrea', 'Ahoj!', 'Salut !')`, `g.give`, `g.setFlag`, `g.choice`…).
- **Zones** : `tools/editor.html` dessine les polygones sur l'illustration et exporte le code.
- **Images** : `art/PROMPTS.md` (prompts, images à joindre, règles). Décor, ville et objets : images
  générées (Gemini) déposées dans `art/sources/`, préparées par `tools/prepare_art.py` ; personnages
  découpés des planches du cours (`tools/cut_sprites.py`). Remplacer une image : refaire tourner l'outil. Marche : `tools/cut_walk.py` ; ville : `scenery_2..5`.
- **Test** : `node web-games/tests/aventure_test.js` joue la scène dans Chromium (Playwright).

Les lignes slovaques et françaises sont une première écriture, à relire.


## Version de test du jeu : `jeu.html`

`jeu.html` + `js/game.js` (donnees `ZG_DATA`) : prologue, chapitre 1 et chapitre 2 de Zajko Quest, decors provisoires (sauf le tram).
Le moteur (`js/engine.js`) gere en plus : menu de sujets lie au Slovnik (`topics` + `need`), combinaison de deux objets (`combos`),
indices par Andrea (`hints`, `helpers`), carnet de la loutre (`notebook`), carte du voyage entre chapitres (`chapters`, `showMap`).
Conception : `docs/Jeu-conception.md`. Test : `node web-games/tests/jeu_test.js`.


## Essai : décor plus large que l'écran (caméra qui défile)

`jeu.html?large=1` remplace le tram par `art/tram_wide.webp` (2160 x 720, un panorama 3:1 généré par ChatGPT).
Le moteur gère maintenant une **caméra** : une scène peut avoir `worldW` (largeur du décor, par défaut 1280) ; la caméra suit le
joueur et s'arrête aux bords, les coordonnées des zones, du sol et des sprites sont celles du décor entier, l'interface reste fixe.
Une scène sans `worldW` se comporte comme avant. Test : `node web-games/tests/tram_large_test.js`.
