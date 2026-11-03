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
  découpés des planches du cours (`tools/cut_sprites.py`). Remplacer une image : refaire tourner l'outil.
- **Test** : `node web-games/tests/aventure_test.js` joue la scène dans Chromium (Playwright).

Les lignes slovaques et françaises sont une première écriture, à relire.
