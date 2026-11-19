# Sons : instructions pour la session Claude Code locale (sur l'ordinateur d'Eric)

Ce fichier est tenu à jour par la session claude.ai (celle qui écrit les chapitres du jeu) à chaque nouveau chapitre. Il dit à la session locale **quels sons chercher**, sous **quel nom**, et **comment les livrer**. La session claude.ai ne peut ni télécharger de sons ni voir `audio/_candidats/` (non versionné) : c'est le travail de la session locale.

Eric : colle à ta session locale « Lis `docs/Sons-session-locale.md` et fais ce qui est à faire. »

## Ce que fait la session locale

1. **Lire** ce fichier en entier, puis `docs/Sons-a-chercher.md` (sections « Où chercher » et « Format demandé », et la section du chapitre concerné : ce qu'on entend, mots-clés).
2. **Chercher les candidats** pour chaque ligne « à chercher » du tableau plus bas : **2 ou 3 par son**, licence **CC0** ou **Pixabay** de préférence (CC-BY accepté si on note l'auteur ; **pas de NC**). Respecter le format demandé (ambiances bouclables de 20 à 60 s, bruitages de moins de 3 s sans silence au début, pas de voix).
3. **Les télécharger** dans `web-games/aventure/audio/_candidats/<chapitre>/<nom>/` (ex. `_candidats/ch5/coucou/1.mp3`) et **mettre à jour `audio/_candidats/index.html`** : une section par chapitre, un bloc par nom de fichier visé, et pour chaque candidat un lecteur, la durée, la licence, l'auteur, le lien de la page d'origine et un bouton « Je prends celui-ci ». Garder un bouton « Copier mon choix » qui produit la liste `nom → candidat`. Passer la ligne du tableau à « candidats prêts ».
4. **Quand Eric a choisi** : convertir en `.ogg` (ambiances : stéréo, environ 96 kbit/s, moins de 400 Ko ; bruitages : mono, moins de 50 Ko, silence du début coupé), et poser le fichier **sous le nom exact du tableau** dans `audio/amb/` ou `audio/sfx/`. Écouter la jonction de boucle des ambiances.
5. **Crédits** : ajouter une ligne par fichier dans `img/credits.md`, section « Sons » (à créer si elle manque : fichier, source avec lien, auteur, licence). Profiter du passage pour y mettre aussi les sons déjà présents si leurs sources sont connues.
6. **Mettre à jour** ce fichier (statut « dans audio/ ») et la section « État » de `docs/Sons-a-chercher.md`, puis committer (`git add` des `.ogg` et des docs ; **jamais** `_candidats/`), message du genre `sons: chapitre 5 (village, cuisine, coucou…)`, et pousser.

Les sons marqués « **branché** » sont déjà appelés par le jeu : dès que le fichier existe sous ce nom, il joue, sans toucher au code. Les autres (« pas branché ») seront branchés par la session claude.ai ensuite. Un fichier manquant est ignoré sans erreur.

## Sons à trouver

Mis à jour le 19 nov. 2026 (après le chapitre 6). Les mots-clés et la description sont dans `docs/Sons-a-chercher.md`, section du chapitre.

### Chapitre 4 : Búrka (le refuge sous l'orage) — pas branché

Les candidats faits le 18 nov. pour l'ancien plan « Orage » peuvent servir : les renommer selon ce tableau.

| Fichier visé | Type | Statut |
|---|---|---|
| `amb/orage_dehors.ogg` | ambiance | à chercher |
| `amb/orage_dedans.ogg`, `amb/poele.ogg` | ambiances | à chercher |
| `sfx/tonnerre_proche.ogg`, `sfx/tonnerre_loin.ogg` | bruitages | à chercher |
| `sfx/panne.ogg` | bruitage | à chercher |
| `sfx/allumette.ogg`, `sfx/allumette_rate.ogg` | bruitages | à chercher |
| `sfx/tiroir.ogg`, `sfx/boite_fer.ogg` | bruitages | à chercher |
| `sfx/bouilloire.ogg`, `sfx/the.ogg` | bruitages | à chercher |
| `sfx/sac.ogg`, `sfx/coffre.ogg`, `sfx/baskets.ogg` | bruitages | à chercher |
| `sfx/coups_porte.ogg`, `sfx/porte.ogg`, `sfx/pas_mouille.ogg` | bruitages | à chercher |
| `sfx/pan_secoue.ogg`, `sfx/chien.ogg` | bruitages | à chercher |
| `sfx/plancher.ogg`, `sfx/ronfle.ogg`, `sfx/fusible.ogg` | bruitages | à chercher |
| `amb/cuisine.ogg` | ambiance | voir chapitre 5 (le même fichier) |
| `amb/matin_tatry.ogg` | ambiance | à chercher |

### Chapitre 5 : 42 centimètres (le village) — branché

Les candidats faits le 18 nov. pour l'ancien plan « Domov » (cloches, poules, moutons, cuisine) peuvent servir.

| Fichier visé | Type | Ce qu'on entend | Statut |
|---|---|---|---|
| `amb/village.ogg` | ambiance | village calme à midi : oiseaux, poules au loin, vent léger (sert aussi derrière la bergerie) | à chercher |
| `amb/cuisine.ogg` | ambiance | casserole qui mijote, cuillère, horloge (tic-tac) | à chercher |
| `sfx/coq.ogg` | bruitage | un cocorico | à chercher |
| `sfx/cloche_mouton.ogg` | bruitage | cloche de mouton qui tinte (avec ou sans bêlement) | à chercher |
| `sfx/coucou.ogg` | bruitage | « coucou » d'une horloge (toutes les 16 s dans la cuisine : pas trop fort) | à chercher |
| `sfx/eau_poklop.ogg` | bruitage (2 à 4 s) | eau qui coule vite dans un tuyau, étouffée, entendue à travers un verre | à chercher |
| `sfx/tracteur.ogg` | bruitage (3 à 6 s) | vieux tracteur qui passe au loin (quand on clique dessus) | à chercher |
| `sfx/photo.ogg` | bruitage | déclic d'appareil photo de téléphone | à chercher |

### Chapitre 6 : Brána (l'inondation, le portail) — branché

Les candidats faits le 18 nov. pour l'ancien plan « Inondation » (pluie, eau qui monte) peuvent servir ; le gymnase, la sirène et la télé ne servent plus.

| Fichier visé | Type | Ce qu'on entend | Statut |
|---|---|---|---|
| `amb/inondation.ogg` | ambiance | pluie forte sur de l'eau, courant, sirène très lointaine | à chercher |
| `amb/pluie_nuit.ogg` | ambiance | pluie de nuit sur l'asphalte, bourdonnement de machines au loin | à chercher |
| `sfx/eau_tuyau.ogg` | bruitage (2 à 4 s) | gros jet d'eau qui tombe sur des pierres | à chercher |
| `sfx/kacatka.ogg` | bruitage | piaillements de canetons | à chercher |
| `sfx/eau_pas.ogg` | bruitage | pas qui pataugent dans l'eau | à chercher |
| `sfx/eau_monte.ogg` | bruitage | glouglou de l'eau qui monte | à chercher |

## Déjà livrés (pour mémoire)

Sons communs, prologue, chapitres 1 à 3 : 13 ambiances et 39 bruitages dans `audio/amb/` et `audio/sfx/` (18 nov. 2026). Crédits à compléter dans `img/credits.md`. Musique : rien encore (voir « Musique » dans `docs/Sons-a-chercher.md`).
