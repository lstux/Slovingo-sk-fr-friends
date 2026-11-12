# Zajko Quest : sons à chercher (ambiances, bruitages, musique)

Liste de travail, **complétée à chaque nouveau chapitre** (section « Chapitres suivants »). Pour chaque ligne : le mot-clé à taper (en anglais, les
bibliothèques sont anglophones), le nom de fichier visé et si c'est une boucle (*loop*) ou un son isolé (*one-shot*).
Tu déposes les fichiers choisis dans `web-games/aventure/audio/` (ou tu me les envoies) : je règle le volume, les boucles et le mixage, et je note la licence dans `img/credits.md`.

## Où chercher (gratuit, utilisable dans un jeu)

| Source | Licence | Pour quoi | Recherche |
|---|---|---|---|
| **Pixabay** (sons et musique) | Licence Pixabay : libre, **sans crédit obligatoire**, usage commercial permis | ambiances, bruitages, boucles musicales | `https://pixabay.com/sound-effects/search/MOT/` · `https://pixabay.com/music/search/MOT/` |
| **Freesound** | par fichier : **CC0** (rien à faire) ou **CC-BY** (citer l'auteur) ; évite le CC-BY-NC | ambiances de terrain, bruitages précis | `https://freesound.org/search/?q=MOT` (filtre « License » à gauche : Creative Commons 0) |
| **OpenGameArt** | par fichier (CC0, CC-BY, CC-BY-SA) | bruitages et boucles pensés pour les jeux | `https://opengameart.org/art-search?keys=MOT` |
| **Kenney** | **CC0** | bruitages d'interface (clics, jingles) : packs « Interface Sounds », « UI Audio » | `https://kenney.nl/assets/category:Audio` |
| **Sonniss GDC Game Audio Bundle** | libre pour les jeux, sans crédit | grandes bibliothèques d'ambiances (gros téléchargements) | `https://sonniss.com/gameaudiogdc` |
| **incompetech** (Kevin MacLeod) | CC-BY (**citer** « Kevin MacLeod, incompetech.com ») | musiques de fond | `https://incompetech.com/music/royalty-free/music.html` |

Remarques : les liens Pixabay ont été vérifiés ; les autres sont les formes habituelles de recherche de ces sites, à ouvrir pour confirmer. Les
licences changent d'un fichier à l'autre : **toujours lire celle du fichier**, pas celle du site. Éviter les licences « NonCommercial » (NC) et tout
son avec une marque ou une voix reconnaissable.

## Format demandé

- **.ogg** (ou .mp3 si c'est tout ce qui existe) ; je convertis. Mono suffit pour les bruitages, stéréo pour les ambiances.
- **Ambiances** : 20 à 60 s, qui se bouclent sans coupure audible (mots-clés `loop`, `seamless`, `ambience`). Pas de son unique et marquant (un cri d'oiseau très reconnaissable se répète vite).
- **Bruitages** : moins de 3 s, sans silence au début.
- **Poids** : visons moins de 400 Ko par ambiance, moins de 50 Ko par bruitage, pour que la page reste légère.
- **Pas de voix parlées** (sauf annonces de gare floues, voir plus bas) : les voix du jeu viennent de la synthèse vocale.

## Sons communs (toutes les scènes)

| Ce qu'il faut | Mots-clés | Fichier visé | Type |
|---|---|---|---|
| Pas sur sol dur (carrelage, pavés) | `footsteps tile`, `footsteps cobblestone` | `sfx/pas_dur.ogg` | boucle courte |
| Pas sur herbe / terre | `footsteps grass`, `footsteps dirt` | `sfx/pas_herbe.ogg` | boucle courte |
| Objet ramassé | `pickup item`, `coin soft`, `collect` | `sfx/prise.ogg` | one-shot |
| Mot appris (Slovník) | `notification chime`, `ding soft`, `magic sparkle short` | `sfx/mot.ogg` | one-shot |
| Indice trouvé / page du carnet | `page turn`, `paper rustle`, `discovery jingle` | `sfx/page.ogg`, `sfx/indice.ogg` | one-shot |
| Mauvaise réponse (doux) | `wrong soft`, `error gentle`, `boing` | `sfx/non.ogg` | one-shot |
| Bonne réponse / énigme résolue | `success short`, `puzzle solved` | `sfx/oui.ogg` | one-shot |
| Clic de menu / bouton | `ui click`, `button click soft` | `sfx/clic.ogg` | one-shot |
| Fin de chapitre / carte du voyage | `level complete short`, `travel jingle`, `map reveal` | `sfx/fin_chapitre.ogg` | one-shot |
| Frappe de bulle de dialogue (optionnel) | `text blip`, `dialogue beep` | `sfx/bip.ogg` | one-shot, très discret |

## Musique

| Besoin | Ambiance voulue | Mots-clés | Fichier visé |
|---|---|---|---|
| Thème du jeu (menu, cartes) | chaleureux, voyage, un peu folk (fujara ou accordéon, si possible) | `folk travel`, `accordion light`, `acoustic adventure` | `musique/theme.ogg` |
| Scènes calmes (rue, jardin, parc) | guitare ou flûte douce, très discrète | `calm acoustic`, `gentle flute`, `summer morning` | `musique/calme.ogg` |
| Le monsieur au sourire | léger mais un peu inquiétant (pizzicato, vibraphone) | `mysterious pizzicato`, `quirky suspense light` | `musique/pan.ogg` |
| Fin de l'aperçu | douce, ouverte | `outro gentle`, `to be continued` | `musique/fin.ogg` |

## Ambiances par scène (prologue, chapitres 1 et 2)

| Scène | Ce qu'on entend | Mots-clés | Fichiers visés |
|---|---|---|---|
| **Ouverture** (cartes, train) | roulement de train régulier, très étouffé ; annonce de gare lointaine | `train interior ambience`, `train rolling loop`, `train station announcement muffled` | `amb/train.ogg` |
| **Gare, hall d'arrivée** | murmure lointain, pas qui résonnent, annonces floues | `train station ambience`, `railway station hall`, `indistinct announcement` | `amb/gare.ogg` |
| Distributeur de billets | bip de touche, impression du billet | `ticket machine beep`, `ticket printer` | `sfx/distributeur.ogg`, `sfx/ticket.ogg` |
| **Tram** | roulement, grincement doux, annonce d'arrêt | `tram interior ambience`, `tram bell`, `tram doors` | `amb/tram.ogg`, `sfx/tram_portes.ogg`, `sfx/tram_cloche.ogg` |
| Composteur de ticket | « tchak » sec | `ticket punch`, `validator stamp` | `sfx/composteur.ogg` |
| **Rue de la tante** (été, jour) | cigales, oiseaux, vent léger, chaleur | `summer day ambience cicadas`, `suburban street birds` | `amb/rue.ogg` |
| Sonnette de la maison, boîte aux lettres | sonnette électrique ; clapet métallique | `doorbell`, `mailbox flap` | `sfx/sonnette.ogg`, `sfx/boite.ogg` |
| Clé trouvée, portillon | tintement de clé, grincement de portillon | `keys jingle`, `garden gate creak` | `sfx/cle.ogg`, `sfx/portillon.ogg` |
| **Jardin, le soir** | grillons, une grenouille au loin, vent dans les feuilles | `crickets night ambience`, `garden evening` | `amb/jardin_soir.ogg` |
| Interrupteur / lampe | clic net, bourdonnement qui s'arrête | `light switch click`, `lamp buzz off` | `sfx/interrupteur.ogg` |
| Voix de la tante qui crie derrière la fenêtre | **pas de son** : texte seul (sera lu par la synthèse) | | |
| **Jardin, le matin** | oiseaux, déjà chaud, insectes | `morning birds ambience`, `garden morning` | `amb/jardin_matin.ogg` |
| **Parc et étang** | oiseaux, froissement de roseaux, eau presque absente | `park ambience birds`, `pond reeds` | `amb/parc.ogg` |
| Canard, gourde | « coin-coin » enroué, bouchon qui s'ouvre, eau qui coule dans un bec | `duck quack`, `water pour small`, `bottle cap` | `sfx/canard.ogg`, `sfx/gourde.ogg` |
| **Place de la fontaine** (sec, chaud) | vent chaud, pas de foule, rares moineaux, une goutte dans le bassin | `empty square ambience`, `hot summer wind`, `sparrows`, `water drip echo` | `amb/place.ogg`, `sfx/goutte.ogg` |
| Échelle posée, carnet récupéré | bois qui claque, papier froissé | `wooden ladder`, `notebook pick up` | `sfx/echelle.ogg`, `sfx/carnet.ogg` |
| Voiture noire (arrive, s'arrête, repart) | moteur de berline qui ralentit, portière, démarrage | `car arrives stops`, `car door close`, `car drive away` | `sfx/voiture_arrive.ogg`, `sfx/portiere.ogg`, `sfx/voiture_part.ogg` |
| **Salle des guichets** | hall plus feutré que l'arrivée, annonces floues, ventilateur | `train station hall ambience`, `ticket office`, `fan hum` | `amb/guichets.ogg` |
| Guichet : clavier, tampon, billets imprimés | frappe douce, tampon, imprimante | `keyboard typing soft`, `rubber stamp`, `ticket printer` | `sfx/clavier.ogg`, `sfx/tampon.ogg`, `sfx/impression.ogg` |
| Train qui part (fin de l'aperçu) | cloche, sifflet, roues qui démarrent | `train departure whistle`, `train leaving station` | `sfx/train_part.ogg` |

## Chapitres suivants (à compléter au fil de l'histoire)

| Chapitre | Lieux | Sons à prévoir (idées de départ) | État |
|---|---|---|---|
| 3. Raj (*Slovenský raj*) | forêt, ruisseau, gorges, échelles métalliques | forêt de jour, ruisseau qui murmure, petite cascade, pas sur échelle métallique, cri d'aigle (pán Orol) | à chercher |
| 4. Orage (Hautes Tatras) | montagne, orage | pluie d'orage, tonnerre lointain puis proche, vent d'altitude | à chercher |
| 5. Domov (le village d'enfance) | village sous les Tatras | cloches, poules, moutons, ruisseau qui rétrécit, ambiance de cuisine (Babka) | à chercher |
| 6. Inondation (Liptov) | pluie, rivière qui déborde, gymnase | pluie continue, eau qui monte, sirène de pompiers, foule feutrée dans un gymnase, télé en fond | à chercher |
| 7. La route | route, forêt coupée | tronçonneuse, engin de chantier lointain, asphalte et pas | à chercher |
| 8. Centre de données | hall de serveurs | bourdonnement grave de ventilateurs, clics de relais, porte à badge | à chercher |
| 9. Mine (Banská Štiavnica) | grille, galerie | grille qui grince, goutte dans un tunnel, écho | à chercher |
| 10 à 13 | décision, Bratislava, château, rêve | à préciser (télé en direct, applaudissements, nuit calme) | à chercher |

*Pour chaque chapitre ajouté, je recopie ici les lieux, objets et événements de la scène avec des mots-clés prêts à taper.*
