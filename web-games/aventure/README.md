# Zajko — point-and-click (aperçu)

Un jeu d'aventure dans l'esprit des *Chevaliers de Baphomet* : décors peints fixes, on clique pour
marcher, regarder, parler, utiliser un objet. Les énigmes sont des exercices de slovaque déguisés.
Aperçu : la scène du tram de Košice (valider son ticket, passer le contrôle, descendre).

- **Jouer** : `aventure/index.html` (souris ou doigt ; Espace ou « Zones » montre ce qui est cliquable).
- **Moteur** : `js/engine.js` (scène, zones, sprites, inventaire, dialogues SK/FR, Slovník, sauvegarde).
- **Scène** : `js/tram.js` — données (image, sol, vitres, zones) et histoire écrite en `async/await`
  (`await g.say('andrea', 'Ahoj!', 'Salut !')`, `g.give`, `g.setFlag`, `g.choice`…).
- **Zones** : `tools/editor.html` dessine les polygones sur l'illustration et exporte le code.
- **Images** : `art/PROMPTS.md` (prompts et règles), images provisoires dans `art/` ; les remplacer
  suffit. `tools/make_placeholder_art.py` redessine les provisoires.
- **Test** : `node web-games/tests/aventure_test.js` joue la scène dans Chromium (Playwright).

Les lignes slovaques et françaises sont une première écriture, à relire.
