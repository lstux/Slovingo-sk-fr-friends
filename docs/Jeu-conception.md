# Zajko Quest (point & click) : conception

*Premier jet du 9 novembre 2026. On vise les 12 chapitres, mais on détaille d'abord l'intro et les chapitres 1 et 2 pour voir si la tendance plaît avant d'aller plus loin. Base : `docs/Histoire-fr.md`, `docs/Intrigue-jeu.md`, prototype `web-games/aventure/`.*

## 1. Principes

1. **Le joueur est Gab** (le renard, « toi »). Le jeu suit le point de vue de l'histoire : Gab est de toutes les scènes, rien n'est raté. Katka et Maťo n'arrivent qu'au chapitre 5 ; avant, Andrea est seule avec lui.
2. **Les mots sont des clés.** Chaque lieu a quelques mots à découvrir en regardant ou en écoutant. Ils entrent dans le **Slovník** et deviennent des **sujets de conversation** : on ne peut interroger quelqu'un sur le carnet qu'après avoir appris *zápisník*.
3. **Les énigmes sont des exercices déguisés** : la grammaire de la série sert à avancer (négation, nombres, impératif, comparatifs…).
4. **Se tromper est drôle, pas puni** : l'amende du contrôleur renvoie au début de la scène, avec une réplique drôle.
5. **Un indice, jamais un blocage définitif.** Chapitres 1 à 4 : Andrea souffle (3 indices par chapitre : coup de pouce, direction, solution). À partir du chapitre 5 : le téléphone de Katka (batterie limitée). Au chapitre 11, la batterie meurt : plus d'indices, jusqu'à ce qu'on la recharge (énigme de l'histoire).
6. **Un chapitre** = 2 ou 3 décors, un objectif, un dialogue à réussir, une énigme d'objets, un objet qui sert plus tard. 10 à 15 minutes.

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
**Mots** : *električka, označovač, revízor, lístok, katedrála, rok (cinq ans), kamarát, záhrada, jabloň*.

### Décor 1 : le tram (déjà fait)
- Valider le ticket au composteur, puis le contrôle (prototype existant : 3 choix de répliques).
- **Nouveau** : la hase assise en face, un livre à la main. Gab la reconnaît : on peut la regarder, puis lui parler. Une première réplique à choisir : *Ahoj, Andrea?* (juste) ou *Dobrý deň, pani* (drôle : elle rit).
- **Nouveau** : par la fenêtre, la cathédrale Sainte-Élisabeth (zone cliquable, mot *katedrála*).

### Décor 2 : la rue, devant l'arrêt
- **Quête** : retrouver le chemin de la maison de la tante en parlant avec Andrea. Sujets disponibles selon les mots appris : *Tatry, Katka, Maťo, škola, teta*.
- **Énigme de dialogue** : « Tu te souviens ? » Andrea teste Gab sur les âges (Katka 13, Maťo 14, Andrea 16, Gab 15). Mauvaises réponses : réactions drôles. Bonne réponse : elle sourit.
- **Gag de renard** : Gab bavarde sans s'arrêter. Une jauge discrète d'Andrea (« les renards, ça parle ») ; si on laisse tout dire, un pop-up comique, sans pénalité.

### Décor 3 : le jardin de la tante, le soir
- **Objectif** : arriver sous le pommier sans réveiller la tante.
- **Énigme d'objets** : la fenêtre de la tante est éclairée. Andrea chuchote *Pssst... zostaň tu* (reste ici) ; Gab doit attendre que la lumière s'éteigne (clic sur la lampe du jardin, ou lancer un caillou sur la lampe, au choix). Objets à ramasser : un vieux sac, une couverture au séchoir.
- **Fin du chapitre** : Gab s'allonge sous le pommier. Dialogue *Dobrú noc* (choix : bonne nuit / bonjour). Il regarde les étoiles. Le pommier revient à la fin du jeu (épilogue).
- **Objet gardé pour plus tard** : la **couverture** (sert au chapitre 4, cuisine du refuge).

**Changement d'histoire proposé** : aucun. Les trois décors collent aux scènes 1 à 6.

## 5. Chapitre 2 : Sucho

**Grammaire** : *veľa / veľmi*, *chýba mi*.
**Mots** : *voda, sucho, fontána, záhradník, zápisník, merať, lístok (billet / mot), pokladňa (guichet), rozpis (tableau des départs)*.

### Décor 1 : le jardin, le matin
- Gab se réveille. Andrea donne un peu d'eau (**objet : la gourde**, presque vide). Le soleil est haut : indice du temps.
- **Dialogue** : Andrea corrige *veľmi* / *veľa* si Gab se trompe (« je parle très beaucoup »). Pas une énigme mais le gag de la série, joué en choix de réponse.

### Décor 2 : l'étang du parc
- L'étang presque à sec. Les animaux silencieux. On peut les regarder (mots *nič, ticho, mokrý, suchý*).
- **Énigme** : qui a pris l'eau ? Il n'y a pas de coupable, mais on collecte trois indices (traces d'un niveau d'eau, plantes jaunies, un chien qui halète). Ça fait avancer l'enquête et prépare le carnet.
- Sortie vers le centre-ville.

### Décor 3 : la fontaine chantante (sèche)
- Le jardinier (vouvoyé) : sujets *voda, Raj, rádio*.
- **Découverte** : au fond de la fontaine, un petit objet bleu. Gab doit y descendre : **énigme d'objets** : prendre la corde du jardinier ou sauter. Il trouve le **carnet** (*zápisník*), signé Dr. V.
- **Le monsieur au sourire** arrive en voiture noire. **Énigme de dialogue avec minuteur** : Andrea ment (« nous n'avons rien trouvé »). Le joueur doit cacher le carnet dans le sac à dos (objet sur sac) et répondre à la bonne **négation** (*Nič sme nenašli*, pas *Nenašli sme nič* ou autres versions fausses). Trois erreurs et il soupçonne : on recommence la rencontre, sans amende.
- **Objet gardé** : le carnet (première page, avec « Prochaine mesure : Raj »).

### Décor 4 : la gare
- **Énigme du lístok** : Andrea écrit un mot à sa tante ; le joueur doit **combiner** stylo + papier (*lístok* petit mot), puis le déposer. Si Gab essaie d'utiliser son ticket de tram au guichet : gag (« Toi, tu as un ticket de tram »).
- **Guichet** : la dame demande la destination. Le joueur lit le tableau des départs (*rozpis*) pour trouver Spišská Nová Ves, puis choisit la phrase pour acheter deux billets.
- **Objet** : le billet de train (sert au chapitre 3).

**Changement d'histoire proposé** : ajouter la scène de l'étang (un indice, quelques répliques) pour donner une vraie quête au parc. Les dialogues des scènes 2 et 3 sont déjà dans le texte.

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
| Décor | rue devant l'arrêt (cathédrale au loin) | chapitre 1 |
| Décor | jardin de la tante, soir (lampe, fenêtre éclairée) | chapitre 1 ; variante « matin » pour le chapitre 2 |
| Décor | étang du parc presque à sec | chapitre 2 |
| Décor | fontaine chantante à sec (sans personnages) | chapitre 2 |
| Décor | gare, guichet, tableau des départs | chapitre 2 |
| Personnages | le jardinier, le monsieur au sourire, la dame du guichet, la tante (silhouette ou dos), la voiture noire | pour le chapitre 2 (après la planche des nouveaux rôles pour le monsieur) |
| Objets | lístok, lístok validé (faits), gourde, carnet, stylo et papier, billet de train, couverture | une planche d'objets |

Total : 6 décors à générer (+ 1 variante), 4 personnages, une planche d'objets : ~25 à 30 générations.
