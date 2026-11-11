# Zajko Quest (point & click) : conception

*Premier jet du 9 novembre 2026. On vise les 12 chapitres, mais on détaille d'abord l'intro et les chapitres 1 et 2 pour voir si la tendance plaît avant d'aller plus loin. Base : `docs/Histoire-fr.md`, `docs/Intrigue-jeu.md`, prototype `web-games/aventure/`.*

## 1. Principes

1. **Le joueur est Gab** (le renard, « toi »). Le jeu suit le point de vue de l'histoire : Gab est de toutes les scènes, rien n'est raté. Katka et Maťo n'arrivent qu'au chapitre 5 ; avant, Andrea est seule avec lui.
2. **Les mots sont des clés.** Chaque lieu a quelques mots à découvrir en regardant ou en écoutant. Ils entrent dans le **Slovník** et deviennent des **sujets de conversation** : on ne peut interroger quelqu'un sur le carnet qu'après avoir appris *zápisník*.
3. **Les énigmes sont des exercices déguisés** : la grammaire de la série sert à avancer (négation, nombres, impératif, comparatifs…).
4. **Se tromper est drôle, pas puni** : l'amende du contrôleur renvoie au début de la scène, avec une réplique drôle.
5. **Un indice, jamais un blocage définitif.** Chapitres 1 à 4 : Andrea souffle (3 indices par chapitre : coup de pouce, direction, solution). À partir du chapitre 5 : le téléphone de Katka (batterie limitée). Au chapitre 11, la batterie meurt : plus d'indices, jusqu'à ce qu'on la recharge (énigme de l'histoire).
6. **Règle des décors** : chaque décor a au moins un objet à trouver, une énigme ou un dialogue qui débloque quelque chose. Pas de scène où l'on ne fait que regarder.
7. **Un chapitre** = 2 ou 3 décors, un objectif, un dialogue à réussir, une énigme d'objets, un objet qui sert plus tard. 10 à 15 minutes.

## 2. Verbes et interface

| Verbe | Comment | État du moteur |
|---|---|---|
| Marcher, regarder, utiliser | clic sur le sol, la zone, l'objet | existe |
| Parler | clic sur un personnage : menu de sujets (mots appris) + réponses à choix | choix existent, **menu de sujets à ajouter** |
| Prendre, utiliser un objet sur une zone | glisser l'objet de l'inventaire | existe |
| **Combiner** deux objets | glisser un objet sur un autre | **à ajouter** |
| Slovník | liste des mots appris, avec traduction | existe, **à relier aux sujets** |
| **Indice** | bouton (Andrea, puis le téléphone de Katka) | **à ajouter** |
| Carnet de la loutre | inventaire spécial : pages collectées, résumé de l'enquête | **à ajouter** (dès le chapitre 2) |
| Changer de décor, carte | sorties de décor, puis carte du voyage entre les chapitres | scène par scène existe, **carte à ajouter** |

## 3. Intro (prologue) : « Gare de Košice »

**But** : apprendre les commandes en 3 minutes et expliquer d'où vient le ticket du prototype. Pas dans l'histoire écrite, mais compatible : Gab arrive de Lyon, seul, parle peu (scène 1 du chapitre 1).

- **Décor** : le hall de la gare de Košice, vu de côté, avec un distributeur de tickets de tram.
- **Déroulé** : Gab descend du train de Lyon. Une affiche, un panneau, un distributeur. On apprend à marcher, regarder (*pozri*), utiliser. On « achète » le *lístok* au distributeur en choisissant la bonne option dans un petit menu en slovaque (*jeden lístok, prosím* : une seule phrase à choisir).
- **Mots appris** : *lístok, električka, zastávka, prosím*.
- **Objet** : le ticket (*lístok*), qui ouvre le chapitre 1.
- **Pourquoi** : le joueur comprend que « lístok » sert à avancer. Gag à venir au chapitre 2 (lístok = ticket ou petit mot).

## 4. Chapitre 1 : Košice

**Grammaire** : *som / si*, *rád / rada*, nombres (les âges).
**Mots** : *električka, označovač, revízor, lístok, katedrála, rok (cinq ans), kamarát, kľúč, kvetináč, pod, bránka, záhrada, jabloň*.

### Décor 1 : le tram (déjà fait)
- Valider le ticket au composteur, puis le contrôle (prototype existant : 3 choix de répliques).
- **Nouveau** : la hase assise en face, un livre à la main. Gab la reconnaît : on peut la regarder, puis lui parler. Une première réplique à choisir : *Ahoj, Andrea?* (juste) ou *Dobrý deň, pani* (drôle : elle rit).
- **Nouveau** : par la fenêtre, la cathédrale Sainte-Élisabeth (zone cliquable, mot *katedrála*).

### Décor 2 : la rue, devant l'arrêt
- **Quête** : entrer dans le jardin de la tante sans passer par la porte. Sujets disponibles selon les mots appris : *Tatry, Katka, Maťo, škola, teta*.
- **Énigme d'objets** : Andrea dit *Kľúč je pod kvetináčom* (la clé est sous le pot de fleurs). Plusieurs pots devant la maison : Gab doit comprendre *pod* (sous), regarder sous le bon pot et ramasser la **clé du portillon**, qui ouvre le jardin. Un mauvais pot : une réplique drôle (un escargot, un chat).
- **Mots** : *kľúč, kvetináč, pod, portillon (bránka)*.
- **Énigme de dialogue** : « Tu te souviens ? » Andrea teste Gab sur les âges (Katka 13, Maťo 14, Andrea 16, Gab 15). Mauvaises réponses : réactions drôles. Bonne réponse : elle sourit.
- **Gag de renard** : Gab bavarde sans s'arrêter. Une jauge discrète d'Andrea (« les renards, ça parle ») ; si on laisse tout dire, un pop-up comique, sans pénalité.

### Décor 3 : le jardin de la tante, le soir
- **Objectif** : arriver sous le pommier sans réveiller la tante.
- **Énigme d'objets** : la fenêtre de la tante est éclairée. Andrea chuchote *Pssst... zostaň tu* (reste ici) ; Gab doit attendre que la lumière s'éteigne (clic sur la lampe du jardin, ou lancer un caillou sur la lampe, au choix). Objets à ramasser : un vieux sac, une couverture au séchoir.
- **Fin du chapitre** : Gab s'allonge sous le pommier. Dialogue *Dobrú noc* (choix : bonne nuit / bonjour). Il regarde les étoiles. Le pommier revient à la fin du jeu (épilogue).
- **Objets** : la clé du portillon (ouvre le jardin à l'arrivée, rangée ensuite) ; la **couverture**, gardée pour plus tard (chapitre 4, cuisine du refuge).

**Changement d'histoire proposé** : aucun. Les trois décors collent aux scènes 1 à 6.

## 5. Chapitre 2 : Sucho

**Grammaire** : *veľa / veľmi*, *chýba mi*.
**Mots** : *voda, sucho, smädný, dať, kačka, vydra, fontána, záhradník, zápisník, merať, lístok (billet / mot), pokladňa (guichet), rozpis (tableau des départs)*.

### Décor 1 : le jardin, le matin
- Gab se réveille. Andrea donne un peu d'eau (**objet : la gourde**, presque vide). Le soleil est haut : indice du temps.
- **Dialogue** : Andrea corrige *veľmi* / *veľa* si Gab se trompe (« je parle très beaucoup »). Pas une énigme mais le gag de la série, joué en choix de réponse.
- **Objet** : la gourde (utile à l'étang).

### Décor 2 : l'étang du parc (une vraie petite quête)
- L'étang est presque à sec. Les animaux sont silencieux (mots *ticho, suchý, mokrý, smädný*).
- **Quête** : un canard assoiffé est près de la vase. Il ne parle pas. Andrea a donné à Gab sa gourde presque vide (décor 1) : Gab peut **la lui donner** (*Pre teba, kačička* : l'objet sur le canard).
- **Choix** : donner l'eau coûte la gourde. On ne peut plus boire, mais le canard parle : il a vu passer « une loutre avec des bottes jaunes » qui mesurait l'eau de l'étang, et elle est partie vers la fontaine du centre. Premier indice sur le carnet, avant de le trouver.
- **Mots** : *dať (donner), kačka, vydra, merať, čižmy (bottes)*.
- **Si on refuse de donner l'eau** : Andrea fait remarquer, sans pénalité, qu'on peut revenir (le canard attend).
- Sortie vers le centre-ville.

**Changement d'histoire** : une courte réplique en plus à l'étang (le canard et la loutre). Le reste du chapitre est inchangé.

### Décor 3 : la fontaine chantante (sèche)
- Le jardinier (vouvoyé) : sujets *voda, Raj, rádio*.
- **Découverte** : au fond de la fontaine, un petit objet bleu. Gab doit y descendre : **énigme d'objets** : prendre la corde du jardinier ou sauter. Il trouve le **carnet** (*zápisník*), signé Dr. V.
- **Le monsieur au sourire** arrive en voiture noire. **Énigme de dialogue avec minuteur** : Andrea ment (« nous n'avons rien trouvé »). Le joueur doit cacher le carnet dans le sac à dos (objet sur sac) et répondre à la bonne **négation** (*Nič sme nenašli*, pas *Nenašli sme nič* ou autres versions fausses). Trois erreurs et il soupçonne : on recommence la rencontre, sans amende.
- **Objet gardé** : le carnet (première page, avec « Prochaine mesure : Raj »).

### Décor 4 : la gare
- **Énigme du lístok** : Andrea écrit un mot à sa tante ; le joueur doit **combiner** stylo + papier (*lístok* petit mot), puis le déposer. Si Gab essaie d'utiliser son ticket de tram au guichet : gag (« Toi, tu as un ticket de tram »).
- **Guichet** : la dame demande la destination. Le joueur lit le tableau des départs (*rozpis*) pour trouver Spišská Nová Ves, puis choisit la phrase pour acheter deux billets.
- **Objet** : le billet de train (sert au chapitre 3).

**Changement d'histoire** : la courte réplique du canard à l'étang (voir décor 2). Les dialogues des scènes 2 et 3 sont déjà dans le texte.

## 6. Esquisse des chapitres 3 à 12 (à détailler après relecture)

| Ch. | Lieu | Idée de jeu | Objet clé | Aide |
|---|---|---|---|---|
| 3 Raj | gorges à échelles | guider Gab dans les échelles à la voix (*hore, dole, doľava, doprava*), suivre le bruit de l'eau, vouvoyer pán Orol | page du carnet (de pán Orol) | Andrea |
| 4 Burka | refuge, orage | choisir le chemin en comparant les sommets ; cuisine dans le noir : trouver la bougie au son des mots | bougie, couverture (chap. 1) | Andrea |
| 5 Domov | village | retrouver Maťo, l'album de Babka (phrases au passé), réseau pour Katka | photo de l'album | **Katka (téléphone)** |
| 6 Povodeň | village inondé | logistique du sauvetage (qui porte quoi), alerte de crue | gilet de sauvetage | Katka |
| 7 Cesta | chantier | arbre de dialogue avec avis (*pretože*), où va le camionneur | page du carnet | Katka |
| 8 Datacentrum | hall | badge, convaincre Marek, quête des grenouilles | badge, page du carnet (Marek) | Katka |
| 9 Baňa | mine, tajchy | énigme mécanique des vannes, devinettes de Ján (*keby*) | clé de vanne | Katka |
| 10 Rozhodnutie | feu de camp | traduire le message de la mère, assembler les pages et la phrase « éponge » | pages complètes | Katka |
| 11 Bratislava | RTVS | tram et bus, portier, **recharger la batterie** | invitation | téléphone en panne |
| 12 Hrad | plateau | en direct avec minuteur, rendre le carnet | carnet rendu | aucune |
| Épilogue | pommier | prouver le rêve (chaussettes, page du carnet), les six lettres | six lettres | |

## 7. Ce qu'il faut ajouter au moteur (par priorité)

1. Menu de sujets de conversation relié au Slovník.
2. Combiner deux objets.
3. Système d'indices (Andrea, puis Katka, avec batterie).
4. Écran du carnet.
5. Carte du voyage et sauvegarde par chapitre.
6. Minuteur pour les scènes tendues (monsieur au sourire, direct télé).

## 8. Images pour intro + chapitres 1 et 2

| Type | Image | Remarque |
|---|---|---|
| Décor | hall de la gare de Košice avec distributeur | prologue |
| Décor | tram vide | **fait** |
| Décor | rue devant l'arrêt, maison avec plusieurs pots de fleurs, portillon (cathédrale au loin) | chapitre 1 |
| Décor | jardin de la tante, soir (lampe, fenêtre éclairée) | chapitre 1 ; variante « matin » pour le chapitre 2 |
| Décor | étang du parc presque à sec, avec un canard assoiffé | chapitre 2 |
| Décor | fontaine chantante à sec (sans personnages) | chapitre 2 |
| Décor | gare, guichet, tableau des départs | chapitre 2 |
| Personnages | le canard assoiffé, le jardinier, le monsieur au sourire, la dame du guichet, la tante (silhouette ou dos), la voiture noire | pour le chapitre 2 (après la planche des nouveaux rôles pour le monsieur) |
| Objets | lístok, lístok validé (faits), gourde, clé du portillon, carnet, stylo et papier, billet de train, couverture | une planche d'objets |

Total : 6 décors à générer (+ 1 variante), 5 personnages, une planche d'objets : ~25 à 35 générations.

## 9. Mots appris par chapitre (intro, 1 et 2)

| Chapitre | Mots | Où ils servent |
|---|---|---|
| Intro | *lístok, električka, zastávka, prosím, jeden* | acheter le ticket au distributeur |
| 1 Košice | *označovač, revízor, katedrála, rok, kamarát, kľúč, kvetináč, pod, bránka, záhrada, jabloň* | validation, quiz des âges, clé sous le pot, jardin |
| 2 Sucho | *voda, sucho, smädný, dať, kačka, vydra, merať, čižmy, fontána, záhradník, zápisník, pokladňa, rozpis* | gourde au canard, carnet, mot et billets |

*Ces mots sont aussi les sujets de conversation débloqués : on ne parle de la loutre qu'après avoir appris* vydra.


## Retours de test (10 nov. 2026, Eric) : à appliquer quand il le dira

- **Distributeur (prologue) trop facile** : l'automate ne doit plus dire « lis le panneau ». Gab se demande tout seul, en français : « Zut, comment on dit "un ticket" en slovaque ?! ». Le mot doit se trouver en croisant **deux indices** (affiche « Jeden lístok · 1,20 € » + panneau de l'automate « Lístok na električku »). Indice d'Andrea indisponible au prologue ; au bout de 3 insistances, Gab : « Il y a sûrement un truc écrit quelque part… ». Choix final plus difficile : trois formes plausibles (`Jeden / Jedna / Jedno lístok`).
- **Autres endroits encore trop faciles** : à lister par Eric après ses tests (quiz des âges, fontaine, etc.).
- **Décor « petit »** : envisager des décors plus larges que l'écran avec défilement horizontal (travelling quand le renard approche d'un bord), à la Broken Sword. Demande : quelle résolution d'image sort de ChatGPT / Gemini ?


## Décors plus larges que l'écran (essai du 11 nov. 2026)

Décision d'Eric : défilement de caméra (façon Broken Sword) sur **quelques scènes seulement**, pas toutes.
- Format : panorama **3:1** (ChatGPT le sort : test concluant, image reçue en 2172 x 724 ; le jeu l'étire à 2160 x 720, 1,7 écran de large).
- Moteur : `scene.worldW` + caméra qui suit le joueur (`engine.js`, `camTarget`). Zones et sprites en coordonnées du décor entier.
- Essai : le tram (`art/tram_wide.webp`, `jeu.html?large=1`), l'ancien tram reste le défaut.
- À voir : style un peu « vectoriel » à côté des illustrations du cours ; ville qui défile derrière les vitres (la ville du panorama est fixe) ; zones à affiner.


## 5 bis. Nouvelle ouverture (décidée le 11 nov. 2026, remplace l'intro de la gare actuelle)

On reprend le jeu du début : ouverture en images, puis la gare, puis un tram refait pour coller à l'histoire (Andrea n'est pas visible
d'emblée : on avance dans le wagon et on la découvre assise plus loin). Tous les décors et toutes les animations seront regénérés ; ce
qui existe aujourd'hui (images provisoires, sprites découpés des planches) n'est pas à conserver.

### Déroulé (environ 40 s, bouton « Passer », ne se rejoue pas : drapeau `intro_done`)

| Plan | Image | Texte (SK / FR) |
|---|---|---|
| 1. Zoom lent | Carte illustrée de l'**Europe** ; la caméra s'approche doucement de l'est, jusqu'à la Slovaquie | *Leto.* / « L'été. » |
| fondu enchaîné | | *Gab má pätnásť rokov. Pochádza z Francúzska.* / « Gab a quinze ans. Il vient de France. » |
| 2. Fixe | Carte de la **Slovaquie**, Košice marqué à l'est (le zoom du plan 1 s'y fond) | *Dnes prichádza do Košíc.* / « Aujourd'hui, il arrive à Košice. » |
| fondu | | |
| 3. Travelling | Intérieur du train, panorama 3:1 : Gab assis près de la fenêtre, Košice qui approche derrière la vitre ; la caméra glisse de Gab vers la vitre | Annonce : *Vážení cestujúci, o chvíľu prídeme do Košíc. Konečná stanica.* / « Chers voyageurs, nous arrivons bientôt à Košice. Terminus. » |
| fondu | | Le jeu commence : la gare |

Les textes slovaques sont une première écriture, à faire relire par un natif. L'annonce du train sert de premier mini-cours
(*konečná stanica* = terminus, *cestujúci* = voyageurs).

### Ce qu'il faut côté moteur
- Scène « cinématique » : pas d'interface, clic ou Espace pour passer, bouton « Passer ».
- Travelling scripté de la caméra (de x1 à x2 en N secondes, courbe douce) ; la caméra qui suit un joueur existe déjà (`worldW`).
- **Zoom** de caméra (agrandir l'image autour d'un point, doucement).
- Fondu au noir et fondu enchaîné entre deux images ; cartons de texte bilingues sur l'image.
- Drapeau `intro_done` dans la sauvegarde.

### Images à générer (sans aucun texte : le texte vient du jeu) : `web-games/aventure/art/PROMPTS_intro.md`
1. Carte de l'Europe (16:9), avec un pointillé de la France jusqu'à un repère rouge à Košice.
2. Carte de la Slovaquie (16:9), Košice marqué.
3. Intérieur du train, panorama 3:1, Gab dedans.


### La gare (prologue), version 2 : décor 3:1, la caméra suit Gab

Gab arrive du train par les portes des quais (à gauche) et traverse le hall vers la sortie (à droite, l'arrêt du tram).
- **Tableau des départs** (*tabuľa*) : arrivées, le train de Gab (*príchody*).
- **Affiche** sur le pilier (*plagát*) : premier indice, *Jeden lístok · 1,20 €* avec le dessin d'un tram et d'un ticket.
- **Distributeur** (*automat*) : second indice, l'écriteau *Lístok na električku*. S'il ne connaît pas encore le mot, Gab se dit en
  français « Zut, comment on dit "un ticket" en slovaque ?! » ; après trois essais : « Il y a sûrement un truc écrit quelque part… ».
  Choix final : *Jeden / Jedna / Jedno lístok, prosím* (masculin : *jeden*).
- **Sortie** vers l'arrêt (*zastávka*) : seulement avec le ticket.
Retour de test du 10 nov. appliqué ici (l'automate ne dit plus « lis le panneau »). Prompt du décor : `art/PROMPTS_intro.md`, n° 4.


### Le tram (chapitre 1), version 2 : décor 3:1, Andrea découverte au fond

Gab monte par l'avant ; le wagon a l'air vide (Andrea est au fond, hors de l'écran). En avançant au-delà du composteur, la caméra
la fait apparaître et la rencontre se déclenche (*Ahoj, Andrea!* / *Dobrý deň, pani.*). Le contrôleur entre par l'arrière quand le
ticket est validé **et** Andrea retrouvée ; si on la retrouve sans avoir validé, il passe 50 s plus tard : amende, et le tram
recommence. On descend par les portes de l'avant. À prévoir avec les nouvelles planches : Andrea **assise** avec son livre (le sprite
actuel est debout).


### La rue (chapitre 1), version 2 : décor 3:1, fausses pistes, « modrý » à comprendre

Andrea dit « Kľúč od bránky je pod modrým kvetináčom » sans traduire *modrý* (le nom des pots au survol ne donne pas la couleur).
On le lui demande (« Čo je modrý? » → « Modrý ako obloha! ») ; le journal du banc parle aussi de *modrá obloha*. Fausses pistes,
chacune avec un mot ou une blague : pot rouge (un escargot), pot jaune (des fourmis), paillasson (« dans les films, ça marche
toujours »), **sonnette** (la tante : « Kto je tam?! », Gab se cache derrière le tilleul), boîte aux lettres, nain de jardin, une pièce
à ramasser (un centime « pour la chance », inutile… pour l'instant), le tilleul (arbre national), les pommes trop hautes.
Soulever le pot bleu au hasard marche aussi : deviner reste possible, mais coûte quelques gags.
