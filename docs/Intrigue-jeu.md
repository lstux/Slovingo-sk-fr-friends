# Une intrigue pour le jeu (et pour l'histoire) — proposition

*Branche `feat/intrigue-jeu`. Rien n'est encore changé dans `Histoire.md` ni dans les fiches : ce document propose, tu choisis.*

Objectif : que l'histoire de Zajko Friends puisse porter un point-and-click à la *Chevaliers de Baphomet* (le prototype du tram est dans `web-games/aventure/`), sans casser ce qui marche dans le cours : le road-movie, le ton, le duo Gab / Andrea, et la règle « pas de méchant ».

---

## 1. Ce qui marche déjà pour un jeu

- **Un voyage en décors forts**, un par chapitre : tram, fontaine à sec, gorges à échelles, refuge sous l'orage, village inondé, chantier, datacentre, tajchy, plateau télé au château. C'est exactement la matière d'un point-and-click : des lieux à fouiller.
- **Des personnages à qui parler** dans chaque lieu (jardinier, pán Orol, gardien, Babka, pompier, chef de chantier, Marek, Ján, mineur, portier, rédactrice).
- **Des gags de langue** (veľa / veľmi, lístok, líščí) qui se transforment naturellement en énigmes.
- **Un mystère intime** (Andrea) déjà semé d'indices.

## 2. Ce qui manque

1. **Les héros subissent plus qu'ils n'enquêtent.** Chaque chapitre se termine par un adulte qui leur dit où aller : le jardinier (« le Paradis slovaque »), pán Orol (« les Tatras »), Marek (« la télévision », « Banská Štiavnica »). Dans un jeu, c'est au joueur de **trouver** où aller.
2. **Pas de question qui court d'un bout à l'autre.** « Pourquoi l'eau disparaît puis déborde ? » est posé (ch. 7 : « ils ne disent pas pourquoi ») mais jamais **résolu** : les héros arrivent à la télé avec des constats, sans fil qui les relie.
3. **Pas d'objets qui comptent.** Un point-and-click a besoin d'un inventaire qui fait avancer l'histoire. Aujourd'hui, seuls le ticket (ch. 1-2) et le téléphone de Katka jouent ce rôle.
4. **Pas de personnage récurrent qu'on poursuit.** Chez Broken Sword, on court après quelqu'un ou quelque chose. Ici, chaque rencontre est isolée.

## 3. Proposition centrale : le carnet de la loutre

Une seule idée ajoutée, qui règle les quatre points sans créer de méchant.

### L'idée

Au chapitre 2, dans la **fontaine chantante à sec**, Gab trouve un **carnet étanche** : *Zápisník — merania vody* (« carnet de mesures de l'eau »). Dedans, des relevés de niveaux d'eau, des croquis, des dates, et une signature : **Dr. V.** Plusieurs pages ont été arrachées.

La propriétaire est **doktorka Vydrová**, une **loutre** hydrologue (adulte, vouvoyée). Elle parcourt le pays pour mesurer l'eau et elle a toujours **un jour d'avance** sur la bande : on ne la croise jamais, mais tout le monde l'a vue.

- **pán Orol** (ch. 3) : « Une loutre avec des bottes ? Elle est passée hier. Elle mesurait le ruisseau. »
- **Le gardien du refuge** (ch. 4) : « Elle a dormi ici avant-hier. Elle aussi, elle parlait à mon genou. »
- **Babka Zuzana** (ch. 5) : « La loutre ? Elle a mesuré le ruisseau et elle a mangé deux assiettes. Sans bryndza. »
- **Le pompier** (ch. 6) : « Elle nous a prévenus deux jours avant l'inondation. Personne ne l'a crue. »
- **Marek** (ch. 8) : « Elle est venue demander les chiffres de l'eau du datacentre. On ne les lui a pas donnés. » (Il les donne, lui, à la bande : premier vrai choix de Marek.)
- **Le mineur** (ch. 9) : elle a mesuré les tajchy.

À chaque étape, la bande récupère **une page** du carnet (laissée exprès, oubliée, ou confiée par un personnage). C'est l'inventaire du jeu et le **fil de l'enquête**.

### Ce que révèle le carnet (la réponse au « pourquoi »)

Mises bout à bout, les pages disent une chose simple, que Katka lit au chapitre 10 :

> *Les forêts et les zones humides retiennent l'eau, comme une éponge. Quand on les enlève, la pluie ne reste pas : d'abord la sécheresse, puis l'inondation.*

C'est la phrase qui manquait à la radio. Elle **relie** tout ce qu'ils ont vu (ruisseau qui rétrécit, orage, crue, route dans la forêt, zone humide du datacentre, forêt de la mine) **sans désigner de coupable** : personne n'est méchant, c'est une somme de décisions. Le thème « pas de méchant » en sort renforcé.

*(L'idée de l'eau retenue dans le paysage est une vraie discussion en Slovaquie : à vérifier et à citer dans un « Coin slovaque », sans en faire un cours de science.)*

### La résolution

- **Chapitre 11** : la rédactrice dit que l'édition spéciale sur l'eau a déjà une experte invitée… doktorka Vydrová, qui « a perdu son carnet à Košice ».
- **Chapitre 12** : sur le plateau, elle retrouve son carnet. Elle a les chiffres, eux ont vu. *« Vous êtes les témoins qui me manquaient. »* La présentatrice : *« Počujeme vás. »* La bande ne devient pas experte : elle reste « nous, on était là », mais cette fois quelqu'un peut le prouver.
- **Épilogue** : Gab se réveille sous le pommier… et Andrea lui dit qu'une loutre est passée ce matin à la fontaine : elle cherchait un carnet. Le rêve gagne une deuxième question en plus de la broche : *certains rêves ne sont pas que des rêves.*

### Ce que ça change dans le cours

- **Peu de texte** : quelques répliques et lignes de Narrateur par chapitre, surtout en fiches 05 et 06. Les fiches 01 à 04 restent presque intactes.
- **Mots nouveaux**, presque tous déjà utiles au thème : *zápisník* (carnet), *merať / meranie* (mesurer / mesure), *vydra* (loutre), *hladina* (niveau de l'eau), *stránka* (page), *zadržať* (retenir).
- **Les héros deviennent actifs** : ils choisissent leur route en lisant les pages (« la prochaine mesure est dans les Tatras ») au lieu d'attendre qu'un adulte la leur donne. pán Orol et Marek confirment, au lieu d'ordonner.
- **Méthode** : comme convenu, j'écris d'abord les scènes en slovaque dans `Histoire.md`, avec la traduction dans `Histoire-fr.md`. Tu annotes, puis je reporte dans les fiches.

## 4. Le mystère d'Andrea dans le jeu

Il reste léger et suggéré, comme le veut le concept. Le jeu peut juste lui donner des **objets** :

- Les **six lettres jamais envoyées** (ch. 10). Proposition : dans l'épilogue, Andrea les donne à Gab. *« Tu les liras dans le train. Pas avant. »* Ça confirme que le rêve disait vrai, sans rien raconter de plus.
- Les **fraises** (ch. 10, le renard « avait apporté des fraises ») : un clin d'œil possible dans un décor (Andrea refuse les fraises de Ján au ch. 9, par exemple). Petit, discret, pour ceux qui ont l'œil.

## 5. Les énigmes, chapitre par chapitre

Règle du prototype : **les énigmes sont des exercices de slovaque déguisés**. Chacune s'appuie sur la grammaire de la série.

| Ch. | Grammaire de la série | Énigme proposée |
|---|---|---|
| 1 Košice | *som / si*, *rád / rada*, nombres | Valider le ticket et passer le contrôle (fait dans le prototype). Trouver l'arrêt d'Andrea en lisant l'afficheur. Entrer dans le jardin sans réveiller la tante. |
| 2 Sucho | *veľa / veľmi*, *chýba mi* | Trouver le carnet dans la fontaine. Écrire le *lístok* pour la tante (choisir le bon *lístok* : billet ou petit mot). Acheter deux billets au guichet : trouver Spišská Nová Ves sur le tableau des départs. |
| 3 Raj | directions, impératif | Guider Gab dans les échelles à la voix (*hore, dole, doľava, doprava*). Suivre le bruit de l'eau. Obtenir l'aide de pán Orol en le vouvoyant. |
| 4 Burka | futur, comparatifs | Choisir le chemin sur la carte en comparant les sommets (*vyšší, nižší*). Pendant l'orage, trouver la bougie dans la cuisine noire, au son des mots. |
| 5 Domov | passé | Retrouver Maťo (« ou ce sont les moutons qui le cherchent »). L'album de Babka : relier des phrases au passé aux photos. Trouver l'endroit du village où Katka a du réseau. |
| 6 Povodeň | événement en cours ou fini, secours | Logistique du sauvetage : qui porte quoi (Maťo les paniers, Katka les choses légères). Convaincre la souris de lâcher son frigo. Lire l'alerte de crue (*stupne povodňovej aktivity*). |
| 7 Cesta | avis, *pretože* | Passer la clôture en donnant au chef de chantier un avis avec *pretože* : un arbre de dialogue. Comprendre où va le camionneur (Zvolen, *na juh*). |
| 8 Datacentrum | *aj keď, aj tak*, nuance | Obtenir un badge pour la salle des serveurs. Convaincre Marek de donner les chiffres de l'eau (la page du carnet). Quête secondaire : les grenouilles de l'étang, à 5 km. |
| 9 Baňa | conditionnel *keby* | **Les tajchy** : remettre en marche un vieux système de vannes pour faire couler l'eau du bon côté. C'est l'énigme mécanique « à la Broken Sword » du jeu, et elle s'appuie sur la vraie ingénierie de Štiavnica. Les devinettes de Ján en *keby*. |
| 10 Rozhodnutie | discours rapporté | Traduire le message de la maman (l'inverse du cours : Gab traduit pour Katka). Assembler les pages du carnet et la phrase « éponge » : un puzzle de phrases. Choisir ce qu'on dira à la télé. |
| 11 Bratislava | registres, démarches | Prendre tram et bus avec le bon ticket (rappel du ch. 1). Passer le portier : il faut une invitation, donc trouver la rédactrice. Recharger le téléphone de Katka. |
| 12 Hrad | argumenter, conclure | En direct : choisir la bonne phrase au bon moment, avec un minuteur. Rendre le carnet à doktorka Vydrová. |
| Épilogue | passé, récit | Trouver dans le jardin ce qui prouve le rêve : chaussettes mouillées, une page de carnet ? |

## 6. Une option en plus : le monsieur au joli sourire

*À prendre ou à laisser.* Au chapitre 9, Ján parle d'un fonctionnaire « avec un papier et un joli sourire ». On pourrait le **croiser trois fois** : au chantier (ch. 7), au datacentre (ch. 8), à la mine (ch. 9). Toujours le même papier, toujours le même sourire, et Andrea qui se méfie des sourires. Ça fait écho à « un renard aussi a souri joliment ».

Ce n'est **pas un méchant** : au chapitre 11, on découvre qu'il travaille au ministère et qu'il… regarde le journal de 19 h. Ce serait un fil d'inquiétude et de comédie, pas un adversaire. Le risque : glisser vers « le méchant fonctionnaire ». Je ne le ferais que si tu en as envie.

## 7. Questions pour toi

1. **Le carnet de la loutre** : on part là-dessus ? Loutre et hydrologue, ça te va, ou tu préfères un autre animal ou un humain ?
2. **L'épilogue** : on ajoute la loutre à la fontaine et / ou les six lettres ? Ou on garde la fin actuelle intacte ?
3. **Le monsieur au joli sourire** : oui, non, plus tard ?
4. **Le périmètre** : on réécrit d'abord l'histoire (`Histoire.md`, slovaque puis traduction pour tes annotations), et les fiches seulement après ta relecture ? Ou tu veux d'abord un scénario de jeu séparé, sans toucher au cours ?
