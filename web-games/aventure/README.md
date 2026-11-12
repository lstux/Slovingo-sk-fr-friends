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


## Décors plus larges que l'écran (caméra qui défile)

La gare et le tram du jeu complet sont des panoramas 3:1 (`art/gare_wide.webp`, `art/tram_wide.webp`, 2160 x 720).
Le moteur gère une **caméra** : une scène peut avoir `worldW` (largeur du décor, par défaut 1280) ; la caméra suit le
joueur et s'arrête aux bords, les coordonnées des zones, du sol et des sprites sont celles du décor entier, l'interface reste fixe.
Une scène sans `worldW` se comporte comme avant. **Déclencheurs** : `scene.triggers` (`{ x: [x0, x1], when(g), run(g) }`) lancent une
histoire quand le joueur, au repos, est dans une bande du décor (ex. : la rencontre avec Andrea au fond du tram).
Tests : `node web-games/tests/tram_test.js` (et `jeu_test.js` pour la partie complète).

## Ouverture (cinématique) : scène `uvod`

Une nouvelle partie commence par l'ouverture (carte de l'Europe avec zoom vers Košice, fondu sur la carte de la Slovaquie, travelling
dans le train, cartons SK/FR), puis la gare. Bouton « Passer », clic ou Espace pour raccourcir un carton ; drapeau `intro_done`.
Moteur : `scene.cine` (pas d'interface), `scene.pics` (images avec leur propre cadrage : point `ax,ay` de l'image montré en `sx,sy`,
agrandi `zoom` fois), et dans l'histoire `g.animate(ms, fn)`, `g.wait(ms)`, `g.caption(sk, fr, mots)`, `g.pic(id, props)`, `g.fade(a)`.
Images : `art/PROMPTS_intro.md`. Test : `node web-games/tests/intro_test.js`.


## Personnages : planches d'animation et poses

Gab (gare, tram) utilise sa nouvelle planche : `walkSheet` (4 images, 8 i/s) et `poses` (`idle, talk, pick, use, surprised, think,
laugh, sit`), images faites par `tools/make_sprites.py`. Le moteur : la pose `talk` pendant ses répliques, un geste (`hotspot.pose`,
ou `use` quand on se sert d'un objet) avant l'action, `g.pose(id, nom)` dans les histoires, `scaleSpeed` (vitesse à l'échelle du
décor, les pieds ne glissent pas). Prompts : `art/PROMPTS_persos.md`.

## Voix (synthèse vocale)

Le bouton « Voix » lit les dialogues, les phrases choisies et les cartons de l'ouverture avec la voix slovaque (`sk-SK`) de l'appareil (`speechSynthesis`).
Un seul timbre existe : les personnages se distinguent par la hauteur et le débit (`VOICE_PROFILES` dans `engine.js`, surchargeables par `characters.<id>.voice`).
Dans le Slovník, toucher un mot l'écoute. Sans voix slovaque, le bouton affiche « indisponible » et le jeu reste muet. Réglage retenu dans `localStorage`.
Test : `node web-games/tests/voix_test.js` (fausse synthèse). La liste des sons à chercher est dans `docs/Sons-a-chercher.md`.
