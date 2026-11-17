# Zajko Quest (point & click) : conception v2, « Circuit fermé »

*16 novembre 2026. Remplace `Jeu-conception.md` (ancienne intrigue : carnet de la loutre, fontaine). Base : `Scenario-v2.md` (section 6) et `Histoire-v2-fr.md`. Le prologue et les chapitres 1 et 2 ont été détaillés d'abord, puis codés et testés ; les chapitres 3 à 12 et l'épilogue sont détaillés en section 7 (même soir). Le prototype `web-games/aventure/` sert de moteur ; ses images et sprites seront refaits.*

## 1. Ce qui change par rapport à la v1

Trois demandes d'Eric après la première version :

1. **Des énigmes qui ne se règlent pas juste en traduisant.** Dans la v1, « la clé est sous le pot bleu » : on comprend *modrý*, et c'est fini. Maintenant, la langue donne une information, mais il reste un vrai problème à résoudre (un chat dort sur le pot, il y a trois pots bleus, le pot est trop lourd…).
2. **Un décor qui bouge** : chaque décor a 2 ou 3 petites animations en boucle.
3. **Des figurants** : 2 poses chacun, cliquables, avec une réplique. Certains servent à une énigme, d'autres sont des fausses pistes.

## 2. Principes

1. **Le joueur est Gab.** Andrea l'accompagne. Katka et Maťo arrivent au chapitre 5.
2. **Trois familles d'énigmes, dans chaque chapitre :**

   | Famille | Exemples | Ce qui est appris |
   |---|---|---|
   | **Langue** | lire un panneau, comprendre une consigne, choisir la bonne phrase, vouvoyer | vocabulaire, grammaire de la série |
   | **Objets et logique** | combiner deux objets, détourner l'attention, ordonner, observer un détail du décor, un petit mécanisme | rien de linguistique : c'est le plaisir du jeu |
   | **Déduction** | relier deux pièces sur le tableau d'enquête, repérer la contradiction | comprendre l'histoire |

   **Règle** : chaque chapitre a au moins une énigme d'objets qui n'a rien à voir avec la langue. Une énigme de langue ne se termine jamais sur « j'ai traduit, j'ai gagné » : il reste toujours une action à trouver.
3. **Le pouvoir de Gab : faire l'étranger.** La réplique *Nerozumiem, som Francúz* (« Je ne comprends pas, je suis français ») ouvre des portes : on le laisse passer, on lui explique, on se méfie moins de lui. Mais elle ne marche qu'une fois par personne, et après il doit comprendre ce qu'on lui répond.
4. **Le tableau d'enquête** remplace le carnet de la loutre. On y trouve :
   - les 9 pièces à conviction ;
   - les témoins ;
   - les suspects qu'on raye ;
   - la question du chapitre.
   À la fin de chaque chapitre, on répond à la question en reliant deux éléments du tableau. Une mauvaise réponse n'est jamais punie : Andrea fait juste une remarque.
5. **Les mots sont des clés.** Un mot appris entre dans le Slovník et devient un sujet de conversation.
6. **Chaque décor a quelque chose à trouver**, plus des **fausses pistes** : des objets qui ont l'air utiles et ne servent à rien (ou servent beaucoup plus tard).
7. **Indices limités** : Andrea aux chapitres 1 à 4, puis le téléphone de Katka et sa batterie. Trois niveaux : coup de pouce, direction, solution.
8. **Se tromper est drôle, jamais puni.**
9. **Un chapitre** dure 10 à 15 minutes, avec 2 ou 3 décors, et se termine sur la pièce à conviction et la question du tableau.
10. **Voix** (TTS) activable, **ambiance sonore** libre de droits (`docs/Sons-a-chercher.md`).

## 3. Décor vivant et figurants

**Animations d'ambiance** (`scene.ambient`), trois sortes, toutes simples :
- **Boucle d'images** : 2 à 4 images qui alternent (fumée, jet d'eau, feuilles, enseigne qui clignote). Une petite planche par élément.
- **Mouvement calculé** : un élément fixe qui bouge tout seul dans le moteur (balancement, flottement, traversée). Par exemple un oiseau qui traverse le ciel, un nuage, un tram qui passe au fond, un rideau qui ondule. Une seule image suffit, c'est le moteur qui l'anime.
- **Lumière** : une fenêtre qui s'allume ou s'éteint, une lampe qui grésille (calque semi-transparent).

**Figurants** (`scene.extras`) : 2 poses par figurant, par exemple « lit le journal / tourne la page » ou « dort / ouvre un œil ».
- **Décoratif** : il alterne ses poses au hasard toutes les 3 à 8 secondes, et on peut cliquer dessus pour une réplique (souvent un mot à apprendre).
- **Utile** : il bloque un passage, possède un objet, ou réagit à une action.
- Les figurants sont des animaux du même univers que les personnages (Zootopia ado), sauf les adultes humains de l'histoire (contrôleur, dame du guichet), comme dans les fiches.

## 4. Prologue : la gare de Košice

*Après l'ouverture (Europe → Slovaquie → train), déjà faite. Décor 3:1, la caméra suit Gab.*

**Objectif** : sortir de la gare avec un ticket de tram.

- **Énigme de langue** (reprend le retour de test du 10 nov.) : savoir dire « un ticket ». Il faut croiser l'affiche *Jeden lístok · 1,20 €* et l'écriteau du distributeur *Lístok na električku*, puis choisir entre *Jeden / Jedna / Jedno lístok*.
- **Énigme d'objets (nouvelle)** : le distributeur ne prend que les pièces, et Gab n'a qu'un billet de 20 €.
  - Le guichet est fermé (*Zatvorené*, fausse piste), et la vendeuse du kiosque a vendu tous ses tickets.
  - Le distributeur ne parle pas : son écran a trois touches, *Jedna / Jeden / Jedno lístok*, sans traduction.
  - Le photomaton ne rend pas la monnaie (fausse piste drôle).
  - La solution : le kiosque. Gab achète une bouteille d'eau (*Prosím si vodu*) et récupère la monnaie… et la bouteille, qui servira au chapitre 1.
- **Figurants** :
  - la vendeuse du kiosque (blaireau ; tend la main / range) ;
  - un voyageur pressé, valise à la main (traverse le hall une fois sur deux) ;
  - une dame endormie sur un banc (dort / ouvre un œil, dit *Pst!*) ;
  - deux pigeons (picorent / s'envolent quand Gab approche).
- **Animations** : le tableau des départs qui défile, l'aiguille de la grande horloge, la vapeur d'une locomotive derrière les portes vitrées, un rayon de soleil plein de poussière.
- **Mots** : *lístok, jeden, električka, automat, kiosk, voda, drobné* (la monnaie).
- **Objets** : billet de 20 €, pièces, bouteille d'eau, ticket.

## 5. Chapitre 1 : Košice

*Scènes 1 à 6 de l'histoire. Grammaire : som / si, les âges. Question du tableau : « Andrea est-elle là par hasard ? »*

### Décor 1 : le tram (3:1, Andrea découverte au fond)

- **Langue** : valider le ticket.
  - Le composteur de l'avant affiche *Mimo prevádzky* (hors service), il faut trouver l'autre.
  - Au contrôle, choix de réplique : on peut tenter *Nerozumiem, som Francúz*, mais le contrôleur répond en montrant le composteur… s'il n'est pas validé, c'est l'amende, et le tram recommence.
- **Objets** : une babička avec un énorme cabas bloque l'allée vers le composteur arrière. Elle ne bouge pas sans son ticket, qu'elle a perdu.
  - Pousser le cabas : non (« on ne touche pas au cabas d'une babička »).
  - Le ticket est coincé sous la chaussure du garçon au casque (un lynx), qui bat la mesure. Il n'entend rien : il faut lui taper sur l'épaule, puis lui dire *Zdvihni nohu* (choix sans traduction).
  - On rend le ticket : *Nech sa páči*, le cabas monte sur le siège, le passage est libre.
- **Rencontre** : Andrea au fond, livre à l'envers (zone cliquable : **indice n° 1** sur le tableau, « Bizarre… »).
- **Fausse piste** : l'affiche Zelená vlna. Elle entre au tableau, mais rien ne s'y passe encore.
- **Fin du décor** : par la vitre, la fontaine à sec. Andrea dit « Tu descends ici » (**indice n° 2**).
- **Figurants** : la babička (tricote / regarde Gab de travers), un ado avec ses écouteurs (hoche la tête / ne bouge pas), le contrôleur.
- **Animations** : la ville qui défile derrière les vitres (calque qui glisse), les poignées qui se balancent, la lumière du soleil qui passe entre les immeubles.

### Décor 2 : la rue, devant chez la tante (3:1)

**Objectif** : entrer dans le jardin (Andrea : « Ton auberge est chère. Et ma tante a un jardin. »). Andrea : *Kľúč je pod modrým kvetináčom* (la clé est sous le pot bleu). Elle ne traduit pas *modrý*, et Gab refuse de soulever les pots au hasard (ils sont lourds, la tante regarde la télé juste derrière la fenêtre) : il faut d'abord comprendre le mot.

L'énigme d'objets qui suit :
- Sur le pot bleu, **un gros chat dort au soleil**. Le pousser : il crache. L'appeler (*Mňau?*) : il ouvre un œil, rien de plus.
- Dans la cour, il y a une gamelle vide et sèche. Si Gab y verse sa bouteille d'eau (celle de la gare), le chat va boire, et le pot est libre.
- La clé ouvre le portillon.

Les fausses pistes de la v1 restent : pot rouge (escargot), pot jaune (fourmis), paillasson, sonnette (la tante : *Kto je tam?!*, cache-toi derrière le tilleul), nain de jardin, une pièce porte-bonheur.

- **Figurants** : le chat (dort / ouvre un œil, puis boit), un voisin hérisson qui arrose un pot avec un arrosoir vide (secoue l'arrosoir / soupire ; il donne le mot *sucho*, la sécheresse).
- **Animations** : le linge qui sèche et ondule, la chaleur qui fait trembler l'air au-dessus des pavés, un merle qui sautille, le tram qui repart au fond.

### Décor 3 : le jardin, le soir

**Objectif** : arriver sous le pommier sans réveiller la tante (sa fenêtre est éclairée).

- **Objets et observation** : la lampe du jardin n'a pas d'interrupteur, elle a un **détecteur de mouvement**, trop haut pour Gab. L'interrupteur près de la porte est celui de la cuisine (fausse piste).
  - Il faut le couvrir : la tante a oublié une serviette sur le hamac, sous sa fenêtre.
  - L'allée de gravier crisse (la tante crie, Gab recule). Il faut passer par les pierres plates : on les voit si on regarde le décor, et Andrea ne le dit pas.
  - Pour atteindre le détecteur, monter sur la brouette, juste à côté du lampadaire.
  - La couverture du fil à linge sert à dormir.
- **Cinématique** (scène 6) : la fenêtre, le téléphone, *Áno. Je tu. … Nie. Nič som mu nepovedal. … Zajtra.*
- **Déduction, question du tableau** : « Qu'est-ce qu'Andrea sait ? ». Gab relie « tu descends ici » (ou le livre à l'envers) et le téléphone. Il conclut seulement qu'elle sait quelque chose, et que quelqu'un d'autre aussi : la question reste ouverte jusqu'au chapitre 7 (la gaffe de Katka).
- **Animations** : lucioles, papillons de nuit autour de la lampe, feuilles du pommier, étoiles qui scintillent.

## 6. Chapitre 2 : Zéro litre

*Grammaire : veľa / veľmi, les nombres. Pièce n° 1 : le permis, « 0 litre ». Question du tableau : « Le datacentre dit-il vrai ? »*

### Décor 1 : le jardin, le matin

- **Langue (gag de la série)** : Gab dit *Všetci tu hovoria veľmi o vode* (« tout le monde parle très de l'eau ») et Andrea le reprend. Juste après, un choix de répliques **sans traduction** demande de placer *veľa* ou *veľmi* correctement.
- **Logique (nouvelle)** : les photos d'Andrea.
  - Sur son téléphone, quatre photos du ruisseau et une du chantier, avec leur date en slovaque (*marec, jún, september…*). Il faut les remettre dans l'ordre.
  - Le moment clé apparaît : chantier, puis trois mois, puis ruisseau à sec. Il entre au tableau.
- **Objets** : l'eau ne coule que deux heures par jour. Le robinet du jardin n'a pas de poignée ; la tante l'a cachée « à cause des voisins » et a laissé une devinette : « La poignée est là où il devrait y avoir de l'eau, mais où il n'y en a pas. » Le seau sous la gouttière (sec : fausse piste), puis l'arrosoir (vide, mais il tinte).
- **Figurants** : la tante, vue de dos à sa fenêtre (arrose / disparaît), le chat du chapitre 1 (il est revenu).
- **Animations** : arroseur qui crachote, guêpes autour des pommes tombées.

### Décor 2 : le bureau de l'environnement (couloir et guichet)

**Objectif** : lire le dossier sans que la dame comprenne qu'il vient avec Andrea.

1. **Langue et objets** : la file d'attente. Il faut un ticket de numéro (*poradové číslo*) à la borne. Le tableau lumineux appelle des numéros en slovaque (TTS) : il faut reconnaître le sien, et pas celui du voisin.
2. **Dialogue, dans l'ordre** : d'abord se présenter avec la phrase d'Andrea (*Som Francúz. Robím referát o vode.*). Demander le dossier tout de suite la rend méfiante. Ensuite seulement, demander *Spis Zelenej vlny*. Les choix n'ont pas de traduction. Puis la dame demande « Vous êtes avec la hase ? ».
   - *Nerozumiem, som Francúz* : elle se méfie moins (ça marche).
   - Si on répond *Áno* : elle ferme le guichet, et on recommence la file (gag).
3. **Logique et chrono** : le dossier fait 400 pages, et il est 11 h 56. Chaque geste (tourner 1, 10 ou 100 pages) prend 20 secondes : 12 gestes avant midi.
   - Pas de bouton « sommaire » : il faut penser à regarder les premières pages (*Obsah*, page 3), puis aller au chapitre *Voda*, puis toucher la ligne *Spotreba vody: 0 l/deň*. Le chemin le plus court fait 7 gestes.
   - Les onglets de couleur sont des fausses pistes (*Hluk* le bruit, *Elektrina* l'électricité, *Cesty* les routes).
4. **Objets** : noter le chiffre. Gab a son ticket, mais pas de stylo.
   - Photographier la page : « Photos interdites », et la dame regarde.
   - Le stylo du guichet, attaché par une chaînette, n'écrit plus : l'encre a séché (fausse piste).
   - Le monsieur qui fait des mots croisés en prête un si on l'aide à trouver un mot de 4 lettres (*voda* !).
   - Ticket + stylo = « 0 litre ? » au dos du ticket : **pièce n° 1**.
- **Figurants** :
  - le monsieur aux mots croisés (castor ; écrit / mâchonne son stylo) ;
  - une maman avec poussette (berce / regarde l'horloge) ;
  - un ouvrier en bleu de travail qui dort assis (dort / ronfle, bulle) ;
  - la dame du guichet (tamponne / regarde par-dessus ses lunettes).
- **Animations** : ventilateur au plafond, néon qui grésille, numéro qui change sur le tableau lumineux.

### Décor 3 : devant le bureau, la fontaine vide

- **Cinématique** : la voiture noire, le monsieur au sourire.
- **Objets et timing** : se cacher derrière la fontaine. Le monsieur regarde autour de lui, et il faut bouger quand il se tourne vers la porte. Si on est vu, il dit bonjour, Gab se contente de sourire (il ne dit pas un mot : le monsieur ne doit pas savoir qu'il est français avant le chapitre 4), et on recommence. Gab refuse d'aller lui parler.
- **Déduction, question du tableau** : « Zéro litre : vrai ou faux ? ». On ne peut pas encore répondre, c'est fait exprès. Gab note « à vérifier » : c'est la première question ouverte du tableau, refermée au chapitre 8.
- **Figurants** : un pigeon qui boit dans la seule flaque, un livreur qui décharge des cartons.
- **Animations** : drapeau sur la façade, mirage de chaleur, reflets sur la voiture noire.

## 7. Chapitres 3 à 12 : le détail

*Écrit le 16 novembre 2026 au soir, après la validation des chapitres 1 et 2 en jeu. Base : `Histoire-v2-fr.md`, `Histoire-v2.md` et le roman (`Roman-Circuit-ferme.html`), qui a ajouté des scènes reprises ici. Le slovaque cité est un brouillon, à faire relire.*

### Règles communes aux chapitres 3 à 12

- **Indices.** Andrea jusqu'au chapitre 4. À partir du chapitre 5, c'est **le téléphone de Katka**, avec une **batterie** de 5 barres : un coup de pouce coûte 1 barre, une direction 2, la solution 3. Filmer et appeler coûtent aussi 1 barre. On recharge là où il y a une prise (cuisine de Babka, cabine du camion, train, régie). À zéro, Katka dit *Vybitý* (« à plat ») et il faut trouver la prise : on n'est jamais bloqué.
- ***Nerozumiem, som Francúz*** : une fois par personne. Le jeu tient le compte. À partir du chapitre 8, les gens commencent à ne plus y croire, et au chapitre 10 le monsieur l'appelle *pán Bageta*.
- **Un fil d'objet par chapitre** : un objet ramassé dans un décor sert dans un autre. Certains fils traversent plusieurs chapitres (la carte de visite du chapitre 4 sert au chapitre 11, les pièces de la gare au chapitre 10).
- **Tableau d'enquête** : les 9 pièces, 5 suspects à rayer (sécheresse, castors, maire, chantier, Marek), 2 témoins à trouver (quelqu'un qui sait lire les chiffres, quelqu'un de l'intérieur), et les questions ouvertes.
- **Décors déjà faits** (v1, à vérifier contre la nouvelle histoire) : `raj_foret_wide`, `raj_rokle_wide`, `raj_orol_wide`, `raj_bivouac`.

### Chapitre 3 : Le registre

*Slovenský raj, mardi après-midi et soir. Grammaire : impératif entre amis, directions, vouvoiement. Pièce n° 2 : le registre de pán Orol. Suspect à rayer : les castors. Question du tableau : « Est-ce la sécheresse ? »*

#### Décor 1 : la forêt et le ruisseau (3:1, `raj_foret_wide`)

- **Observation** : on entend l'eau avant de la voir (son). Gab remplit sa gourde. Andrea : « Il n'a pas plu ici non plus. Depuis deux mois. » Le ruisseau qui coule entre au tableau, en face du ruisseau à sec.
- **Objet (début du fil)** : un **bâton** solide, au bord du chemin. Gab le prend « pour marcher ». Il servira au barrage.
- **Fausses pistes** : un champignon (Andrea : *Nejedz to*), une flèche de balisage tombée par terre qui ne mène nulle part, une pomme de pin.
- **Figurants** : deux randonneurs hérissons avec une carte (lisent / tournent la carte), un écureuil sur une branche (grignote / se fige).
- **Animations** : le ruisseau qui scintille, des rayons entre les arbres, une feuille qui tombe, un papillon.

#### Décor 2 : la gorge et les échelles (`raj_rokle_wide`)

- **Logique (sans langue)** : le décor existant a trois échelles, une passerelle et une corde. L'échelle 3 mène à une corniche vide (cul-de-sac), la corde est un piège (Andrea : *Nie!*), l'échelle 2 près de la cascade est mouillée et se descend dans l'autre sens. Le bon chemin : échelle 1, passerelle, échelle 2. Mais la famille de chamois descend l'échelle 1 en boucle : il faut attendre qu'elle soit en bas.
- **Langue, sous petit chrono** : à mi-hauteur, Gab ferme les yeux. L'écran devient presque noir, il ne reste que les mains de Gab et la voix d'Andrea : *Hore. Ešte. Doprava. Nie tam. Doprava!* Il faut cliquer la bonne prise parmi quatre. Une erreur : Gab redescend d'un cran (« *Koľko je tu „doprava“?* »), jamais de chute.
- **Fin** : en haut, Gab est tout blanc. Andrea : « Zéro fois. Je compte. »
- **Fausse piste** : le chemin de six heures. On peut le choisir : fondu, « six heures plus tard », Gab arrive au même endroit, épuisé, et Andrea est déjà là avec un sandwich.
- **Figurants** : les randonneurs (une famille de chamois, très à l'aise), une grenouille sur un rocher mouillé.
- **Animations** : la cascade, les gouttes sur les barreaux, la brume au fond de la gorge.

#### Décor 3 : la cabane de pán Orol (`raj_chata_wide`, nouveau ; l'ancienne clairière `raj_orol_wide` n'a pas de cabane)

- **Langue** : le vouvoiement. Si Gab tutoie, l'aigle pose sa tasse : *Tykáme si?* (« On se tutoie ? »), et le registre reste fermé. Il faut reprendre avec *Dobrý deň, pán Orol* et *Môžete nám ukázať register?*
- **Dialogue** : c'est Andrea qui débloque le livre (« Vous passiez tous les lundis »). Le joueur doit la laisser parler : couper la parole une fois de trop, et l'aigle se remet à boire son thé.
- **Logique** : le registre s'ouvre en panneau. Trente et une années, une ligne par été. Il faut retrouver les étés *veľmi suché* (2003, 2015, 2018), lire ce que faisait la source (*slabý*, faible), puis trouver l'an dernier : *Leto normálne. Prameň v dedine: nula.*
  - Les autres colonnes sont des fausses pistes : neige, premier coucou, nombre de touristes.
  - « Un registre ne sort pas du parc » : on ne peut pas l'emporter. Andrea photographie la page une fois les quatre lignes trouvées. **Pièce n° 2.**
- **Déduction** : sur le tableau, relier « trois étés très secs : faible » et « un été normal : zéro ». La sécheresse reçoit un point d'interrogation, pas encore de rature.
- **Figurants** : un geai qui range des glands sur le toit (pose / cache), le chien de garde d'Orol, un vieux teckel (dort / remue la queue).
- **Animations** : la vapeur du thé, le drapeau du parc, un nuage qui passe.

#### Décor 4 : le lac des castors (`raj_jazero_wide`, nouveau ; `raj_bivouac` sert d'image à la cinématique du soir)

- **Dialogue** : le castor dit *Nie* avant qu'on ait parlé. *Nerozumiem, som Francúz* ne marche pas : « Vous allez le dire en français, alors. C'est non aussi. » Il faut le choix poli : « On ne dit pas que c'est vous. On veut comprendre. »
- **Objets (fin du fil)** : il répare le barrage et il lui manque une branche. Gab lui tend son **bâton**. Le castor le regarde, le goûte, l'accepte. Alors seulement il montre l'eau derrière le barrage.
- **Expérience (sans langue)** : pour vérifier, Gab pose la pomme de pin sur l'eau. Elle dérive jusqu'au déversoir, passe par-dessus et continue en aval : le barrage retient l'eau, il ne la bloque pas. (La pomme de pin du décor 1 n'était donc pas tout à fait une fausse piste.)
- **Déduction** : rayer « les castors » sur le tableau. Nouvelle carte : « des machines, la nuit, il y a deux ans, près du refuge ».
- **Cinématique** (le soir) : « Ton carnet. Tu l'as perdu comment ? — Je l'ai donné. À quelqu'un de gentil. » Puis *Spi.*
- **Question du tableau** : « Est-ce la sécheresse ? » Réponse possible : « pas seulement ». La vraie réponse viendra au chapitre 5.
- **Figurants** : le castor (cloue / lève la tête), deux petits castors qui nagent en rond, un héron immobile (immobile / avale un poisson, une fois).
- **Animations** : les ronds dans l'eau, les étoiles et leur reflet, le feu de camp.
- **Mots du chapitre** : *hore, dole, doprava, doľava, rebrík, prameň, suchý, slabý, bobor, hrádza, stroj*.

### Chapitre 4 : L'orage

*Les Tatras, mercredi soir et jeudi matin. Grammaire : futur (*bude*), *musieť / môcť*, *prečo / lebo*. Pièce n° 3 : la photo de la tranchée. Question du tableau : « Un câble, ou un tuyau ? »*

#### Décor 1 : devant le refuge (lac, soir)

- **Court.** Le gardien (humain) se tient le genou : *Bude búrka. V kolene.* Gab grelotte : il faut lui trouver un pull dans son sac (inventaire) avant d'entrer, sinon il claque des dents à chaque réplique et on ne comprend rien (gag sonore).
- **Figurants** : une marmotte qui siffle sur un rocher, des chamois au loin.
- **Animations** : les nuages noirs qui avancent, le lac qui se ride, un premier éclair muet.

#### Décor 2 : la salle du refuge

1. **Observation** : le mur de photos. Vingt étés, la même vallée. Il faut trouver la photo qui n'est pas comme les autres : une ligne brune sur la montagne. La suivante montre la cicatrice, déjà verte.
2. **Langue** : le gardien explique. *Výkop* (tranchée), *mokraď* (zone humide), *optický kábel*. « C'est du très haut débit. »
3. **Déduction (sans langue)** : sur la photo, une pelleteuse est posée à côté de la tranchée. En la faisant glisser dessus (loupe), on voit que la tranchée est aussi large qu'elle. Trop large pour un câble. Le gardien donne la photo : « J'en ai deux. » **Pièce n° 3.**
4. **Le noir** : la lumière saute. L'écran est noir, sauf un petit halo autour de Gab.
   - Les tiroirs du buffet ont des étiquettes : *Soľ, Sponky, Špagát, Sviečky*. Il faut le bon.
   - Les allumettes du rebord de la fenêtre sont mouillées. Les sèches sont dans une boîte en fer, sur l'étagère du poêle.
   - Le tableau des fusibles est une fausse piste : on peut changer le fusible, rien ne se passe. Le gardien : *To nie je poistka. To je búrka.*
5. **On frappe. Chrono** (le gardien va ouvrir lentement, à cause du genou). Andrea a disparu dans la cuisine, mais elle a laissé **trois traces** :
   - son sac vert sur le banc (à glisser dans le coffre à bois) ;
   - une deuxième tasse sur la table (à ranger) ;
   - ses chaussures mouillées près de la porte (à pousser sous le banc).
   Si le monsieur en voit une : *Dve šálky?* Il sourit, et on recommence à partir des coups à la porte.
6. **Dialogue** : *Nerozumiem, som Francúz* marche. Mais le monsieur vérifie : il dit, en souriant, *Horí ti chvost!* (« Ta queue brûle ! »). Il ne faut **pas réagir** : le bon choix est de ne rien cliquer pendant trois secondes. Puis : *Bageta!* — *… Bageta.*
- **Indices** : Andrea les chuchote par le passe-plat de la cuisine.
- **Figurants** : le chien du gardien, un saint-bernard (dort / lève une oreille au tonnerre), deux randonneurs trempés qui jouent aux cartes (jouent / regardent la fenêtre).
- **Animations** : les éclairs qui blanchissent la fenêtre, la flamme de la bougie, la pluie sur la vitre, le poêle qui rougeoie.

#### Décor 3 : la cuisine, dans le noir

- **Objets (fil du thé)** : apporter deux thés. La bouilloire va sur le poêle de la salle (allumé avec les allumettes sèches), les tasses sont celles qu'on a cachées, et le monsieur dort sur son banc : il faut passer sur la pointe des pattes, les planches qui grincent se repèrent à leur couleur plus claire.
- **Cinématique à choix** : la limonade, le carnet, la lettre de l'avocat. « On n'envoie pas un avocat pour un carnet d'école. Sauf si le carnet a raison. »
- **Langue** : le rappel du gag. Andrea : *Si hlúpy.* Il faut choisir *Veľmi hlúpy. Nie veľa hlúpy.* — *Učíš sa.*
- **Animations** : les tasses qui tremblent au tonnerre, la lumière de l'éclair sous la porte.

#### Retour au décor 1 : le matin

- De l'eau partout (variante du décor : cascades sur les rochers, flaques).
- **Objet (fil long)** : sur le banc vide, une **carte de visite**. Elle entre au tableau avec un numéro de téléphone. Elle servira au chapitre 11.
- **Question du tableau** : « Un câble, ou un tuyau ? » (relier la photo et la largeur de la pelleteuse). Et un **pari** s'affiche : « Si c'est la sécheresse, le ruisseau coule à midi. » *Uvidíme.*
- **Mots** : *búrka, výkop, mokraď, kábel, sviečka, zápalky, šálka, tma*.

### Chapitre 5 : Quarante-deux centimètres

*Le village, jeudi midi. Maťo et Katka arrivent. Grammaire : le passé, *vtedy / teraz*, les jours de la semaine. Pièce n° 4 : les captures d'écran. Suspect à rayer : la sécheresse. Question du tableau : « Les chiffres du site sont-ils vrais ? »*

#### Décor 1 : le ruisseau à sec et le pré (3:1)

- **Le pari** : Gab pose la main entre les pierres. *Sucho.* Sur le tableau, on raye « la sécheresse » : c'est la première rature importante, avec un petit son.
- **Rencontre** : Maťo compte ses moutons et perd le compte, parce qu'une brebis s'est coincée sous le vieux pont. **Objets (sans langue)** : la sortir de là. La pousser ne marche pas, l'appeler non plus. Elle suit la feuille de chou… qu'on n'a pas encore : il faut d'abord passer chez Babka (aller-retour entre deux décors).
- **Katka** entre dans l'équipe : son téléphone devient l'outil d'indices, la jauge de batterie apparaît.
- **Fausses pistes** : le vieux puits du village (le seau remonte vide), la boîte aux lettres de la mairie.
- **Figurants** : les moutons (broutent / lèvent la tête, l'un porte une cloche), un coq sur le pont, un vieux bouc sur un banc (*Vtedy tu bola voda*, « Avant, ici, il y avait de l'eau »).
- **Animations** : les gouttes qui tombent des toits, les flaques, la fumée d'une cheminée.

#### Décor 2 : la cuisine de Babka

- **Langue et objets** : *Jedz.* L'assiette de halušky au chou se remplit dès qu'elle est vide (trois fois). Pour sortir de table :
  - dire *Ďakujem, bolo to výborné, už nevládzem* (« Merci, c'était délicieux, je n'en peux plus ») ;
  - ou glisser le reste au chien sous la table, quand Babka se tourne vers le fourneau.
  - Demander du fromage de brebis : *Ja som ovca.* (gag, une seule fois).
- **Objets (début de deux fils)** : une feuille de chou pour la brebis, et un **verre** : *Babka, požičiate mi pohár?*
- **Indice déguisé** : dans l'entrée, le boîtier de la fibre. Tout petit, en plastique. Katka en est très fière. On s'en souviendra devant la plaque.
- **Dialogue** : « Je crois que mon voisin travaille au bâtiment gris. — Ce n'est pas ma question. — Non. Mais c'est ma réponse. » Carte au tableau : « le village a besoin du bâtiment ».
- **Prise électrique** : on peut recharger le téléphone de Katka.
- **Figurants** : Babka (remue la casserole / pointe sa cuillère), le chien sous la table (attend / mâche), une horloge à coucou.
- **Animations** : la vapeur de la casserole, le rideau, le coucou.

#### Décor 3 : derrière la bergerie

1. **Objets** : la plaque *OPTIKA*. Maťo essaie de la soulever (gag : c'est lui qui se soulève). Elle est vissée. Katka : chez elle, la fibre tient dans une petite boîte.
2. **Écoute (sans langue, puis langue)** : oreille sur la plaque, on n'entend rien, il y a trop de bruit. Il faut faire le silence :
   - *Pst!* à Maťo, qui commente tout ;
   - le téléphone de Katka en silencieux ;
   - la brebis à la cloche à éloigner (avec le reste de chou) ;
   - attendre que le tracteur soit passé.
   Puis poser le **verre** sur le fer. Trois sons sont proposés, il faut nommer le bon : *fúka vietor* (le vent), *ticho* (le silence), *tečie voda* (l'eau coule).
3. **Logique** : le site du bâtiment gris, sur le téléphone de Katka. Un tableau de hauteurs d'eau, jour par jour (*pondelok, utorok, streda…*).
   - D'abord le choc : « aujourd'hui, 42 cm », assis au milieu des pierres sèches.
   - Puis il faut faire glisser une semaine sur une autre : elles sont identiques. Toutes.
   - Dernière vérification : mercredi, pendant l'orage ? 43. « Comme tous les mercredis. »
   Katka fait les captures (1 barre de batterie). **Pièce n° 4.**
4. **Cinématique** : la voiture neuve du maire. On peut essayer de retenir Maťo (trois choix), aucun ne marche : il est trop content. Le maire entre au tableau, avec « Je vais téléphoner ».
- **Question du tableau** : relier « 42 cm sur le site » et « la main de Gab sur les pierres sèches ».
- **Figurants** : la brebis à la cloche, un tracteur conduit par un blaireau âgé (traverse le fond), des poules.
- **Animations** : l'herbe haute, un papillon sur la plaque, le linge de la bergerie.
- **Mots** : *potok, sucho, poklop, pohár, ticho, tečie, pondelok… nedeľa, centimeter, starosta*.

### Chapitre 6 : Le portail

*La vallée, jeudi soir et vendredi matin. Grammaire : *pomôcť*, l'aspect (*stúpa / stúpne*). Pièce n° 5 : la vidéo. Question du tableau : « Qui a prévenu le bâtiment gris ? »*

#### Décor 1 : la rue du bas, inondée (3:1)

- **Langue qui donne l'ordre, puis logique** : trois maisons appellent.
  - *Voda je po kolená!* (aux genoux)
  - *Voda je po okno!* (à la fenêtre)
  - *Sme na streche!* (on est sur le toit)
  Maťo porte deux paniers par voyage et l'eau monte d'un cran toutes les trente secondes. Il faut choisir l'ordre des voyages : la maison où l'eau est la plus haute d'abord. Les canetons comptent pour un demi-panier.
- **Objets (sans langue)** : la souris ne part pas sans son frigo. Trop lourd pour un panier. Une baignoire en zinc flotte dans la cour : frigo dans la baignoire, corde à linge pour la tirer.
- **Objet (début du fil)** : dans le frigo sauvé, il y a tout ce qu'elle possède, dont un **thermomètre de frigo**. Elle le prête : « Vous me le rendez. »
- **Où aller ?** L'école est sous l'eau. Il faut lever la caméra vers la butte : le parking gris, vide et sec.
- **Figurants** : le pompier (humain, veste jaune), la souris au frigo, une famille de canards, des lapins sur un toit, un chat sur une armoire qui flotte.
- **Animations** : la pluie, le courant brun, un gyrophare, des objets qui dérivent (un seau, une chaise, un ballon).

#### Décor 2 : le portail et le parking (nuit)

- **Dialogue** : le gardien (humain) a des ordres. *Nerozumiem, som Francúz* : il répond *Zatvorené. Closed. Fermé. Geschlossen.* Première fois que le pouvoir de Gab échoue.
- **Objets** : au-dessus de l'interphone, une caméra. Il faut y présenter le panier de canetons (ils piaillent, le voyant passe au rouge). Quelqu'un regarde l'écran, à l'intérieur : Marek arrive en courant. *Otvor. Brána bola pokazená.*
- **Sur le parking** : distribuer le thé (dans le coffre de Marek) et les couvertures, chacun la sienne : une grande pour les lapins, une petite pour la souris… (petit jeu de tailles, rapide).
- **Déduction** : Andrea se méfie « des gens gentils qui travaillent là ». Marek entre au tableau, sans étiquette.
- **Prise** : l'allume-cigare de la voiture de Marek recharge le téléphone.
- **Figurants** : les soixante sinistrés (par petits groupes de 2 poses), Marek, le gardien.
- **Animations** : la pluie dans les projecteurs, les couvertures qui fument, la vague verte éclairée sur le mur.

#### Décor 3 : derrière le bâtiment

- **Observation** : Gab veut se laver les mains. Le tuyau : *Au! Je teplá!* Katka lève la tête : *To nie je dym. To je para.*
- **Objets (fin du fil)** : prouver que l'eau est tiède. Thermomètre + corde à linge + la gaffe du pompier = une perche de mesure. Deux mesures : la rivière (9 °C), la sortie du tuyau (31 °C).
- **Cadrage (sans langue)** : Katka filme. Il faut faire entrer **quatre choses** dans le cadre du téléphone : le tuyau, le thermomètre, la vapeur du toit, la vague verte du mur. On déplace et on zoome le cadre ; la vidéo coûte 1 barre. **Pièce n° 5.**
- **Détail** : au premier étage, une fenêtre éclairée, Marek derrière. Si on clique, il éteint. Carte au tableau : « Marek a vu. »
- **Animations** : le panache de vapeur, l'eau qui sort du tuyau, la pluie.

#### Retour derrière la bergerie : vendredi matin

- **Observation** : la plaque a disparu. À la place, du béton encore mou (Gab y laisse une empreinte de patte : elle y sera encore à l'épilogue des crédits).
- **Logique** : comparer la capture d'hier et le site d'aujourd'hui, côte à côte. Tout a changé : 18 cm, 12 cm… La pièce n° 4 gagne une mention « avant / après ».
- **Question du tableau** : « Qui a prévenu ? » Relier « Je vais téléphoner » (le maire) et le béton. Maťo : *To ja.* Le maire n'est pas rayé : il devient « bavard ».
- **Annonce** : samedi soir, le prix, en direct du château. Deux cases vides apparaissent sur le tableau : « quelqu'un qui sait lire les chiffres » et « quelqu'un de l'intérieur ».
- **Rendre le thermomètre** à la souris avant de partir (sinon elle le réclame par SMS à Katka pendant tout le chapitre 7).
- **Mots** : *povodeň, pomoc, strecha, brána, teplá, para, rúra, betón, teplomer*.

### Chapitre 7 : Quatre pompes

*La route, vendredi midi. Grammaire : *podľa mňa*, *znamená to, že…*. Pièce n° 6 : le bon de livraison. Suspect à rayer : le chantier. Question du tableau : celle du chapitre 1, qui revient.*

#### Décor 1 : le chantier de la nouvelle route

- **Fausse piste à régler** : Maťo accuse le chantier (*Podľa mňa sú to oni!*). Le chef de chantier (humain, casque jaune) déplie son plan.
- **Logique (sans langue)** : sur le plan, poser une goutte d'eau sur le chantier et la laisser couler : elle descend de l'autre côté de la crête. Rayer « le chantier ». Maťo : *Prepáčte.*
- **Objets (le stop)** : un camion part dans dix minutes (chrono à l'horloge du préfabriqué).
  - Un carton de sacs de ciment + la craie grasse du géomètre = un panneau.
  - **Langue** : il faut écrire la destination. *Do Banská Štiavnica* ? *Do Banskej Štiavnice.* Le chauffeur corrige les fautes à voix haute, en mangeant son sandwich.
  - Il regarde leurs chaussures : *Štyria? Zablatení?* Le reste du carton, déplié sur les sièges, règle le problème. Le même objet sert deux fois.
- **Figurants** : une taupe en gilet orange (creuse / s'essuie le front), un sanglier sur un rouleau compresseur, un pic-vert sur un poteau.
- **Animations** : la pelleteuse au fond, la poussière, un drapeau de chantier.

#### Décor 2 : la cabine du camion

- **Dialogue** : le chauffeur (humain ; Ferko dans le roman) a livré le chantier. *Čerpadlá. Štyri. Veľké.*
- **Logique** : la boîte sous le siège. Des centaines de papiers, classés à sa façon : par année, puis par mois, puis par marchandise. Il faut croiser trois indices de la conversation (« il y a deux ans », « il faisait chaud, la glace fondait », « des pompes ») pour trouver l'intercalaire : *predvlani* → *júl* → *Č* comme *čerpadlá*.
  - Fausses pistes : le ticket de sandwich du même jour (il l'a gardé aussi), un bon pour « 4 pneus ».
- **Langue** : lire le bon. *Zelená vlna. 4 ks čerpadlo. 200 l/s.* Il faut dire le chiffre à Andrea : *dvesto litrov za sekundu*. « Prenez-le. J'ai le double. » **Pièce n° 6.**
- **Déduction** : relier le permis (0 litre) et le bon (200 litres par seconde). Andrea ajoute : des pompes livrées ne sont pas des pompes qui tournent. La question « Zéro litre » reste ouverte, mais elle penche.
- **La gaffe de Katka** (cinématique). Puis le tableau s'ouvre tout seul sur la question du chapitre 1, « Andrea est-elle là par hasard ? ». Les trois indices se rallument, et il faut donner à chacun son explication :
  - le livre à l'envers → « Je te regardais par-dessus » ;
  - « Tu descends ici » → le nom de l'auberge sous la photo ;
  - le téléphone du soir → Katka.
- **Le silence** : pendant vingt kilomètres, tous les choix de réplique de Gab sont « … ». Un compteur kilométrique tourne. Maťo : *Dvadsať kilometrov. To je rekord.*
- **Demi-tour** : le chauffeur parle des portes ouvertes. Dernier choix, à l'impératif poli : *Zastavte, prosím.* Et la phrase d'Andrea change de bouche : *Uvidíme.* — « Ah non. Cette fois, c'est moi qui le dis. »
- **Prise** : le tableau de bord recharge le téléphone.
- **Figurants** : le chien qui hoche la tête sur le tableau de bord, une mouche.
- **Animations** : le paysage qui défile, le sapin désodorisant qui se balance, les essuie-glaces.
- **Mots** : *stavba, cesta, kamión, čerpadlo, dodací list, kus (ks), sekunda, zastaviť*.

### Chapitre 8 : Portes ouvertes

*Le datacentre, vendredi après-midi. Grammaire : la concession (*aj keď*), *preto*. Pièce n° 7 : la photo du compteur. Question du tableau : « Zéro litre : vrai ou faux ? » (ouverte depuis le chapitre 2).*

*Particularité : Andrea reste derrière les arbres. Elle redevient la voix des indices, par le téléphone de Katka que Gab tient contre l'oreille. La batterie compte vraiment : à zéro, plus d'Andrea.*

#### Décor 1 : l'entrée et la fête

- **Dialogue** : la limonade. *Je zadarmo!* — *Práve preto.* Si on l'accepte quand même, Andrea dit juste « Gab. » et le gobelet collant reste dans l'inventaire jusqu'à la fin du chapitre (fausse piste).
- **Objet (début du fil)** : au stand, une saucisse. Elle vient avec une **serviette en papier**.
- **Langue** : le panneau du programme (*prehliadka o 15:00*, visite à 15 h) et le plan d'évacuation, près de l'entrée, où l'on repère la porte grise et les deux escaliers.
- **Figurants** : une hôtesse (humaine, t-shirt vert), un groupe de visiteurs (familles de lapins, un vieux cerf), un enfant renard qui lâche son ballon, le monsieur au sourire sur la scène (de loin, de dos).
- **Animations** : les ballons verts, la fumée du gril, les haut-parleurs qui vibrent.

#### Décor 2 : le hall et la salle des serveurs

- **Deux complices à diriger** : on clique sur Katka ou sur Maťo pour leur donner une consigne.
  - **Katka occupe le guide** (humain). Il faut lui choisir des questions longues : *Koľko…? Dokedy…? A prečo…?* Une question fermée (*Je tu wifi?* — *Áno.*) le libère tout de suite.
  - **Maťo se coince dans le tourniquet** : l'alarme sonne, l'agent de sécurité quitte son poste devant la porte grise.
  - L'ordre compte : le guide d'abord, l'agent ensuite. Puis Gab a quelques secondes pour traverser le hall, en passant derrière le groupe de visiteurs.
- **Langue, à l'envers** : sur la porte, *Technická miestnosť. Vstup zakázaný.* Deux choix : « C'est interdit, je n'y vais pas » ou « Je ne comprends pas le slovaque ». Pour une fois, il faut choisir de ne pas comprendre.
- **Figurants** : le guide, l'agent, les visiteurs, un robot de ménage qui traverse le hall.
- **Animations** : les diodes des serveurs, le robot, l'écran d'accueil (« 0 l »).

#### Décor 3 : la salle des pompes

- **Observation** : quatre machines vertes, des tuyaux gros comme Gab. Il fait très chaud.
- **Objets (fin du fil)** : la première photo est floue. La buée. Il faut essuyer l'objectif avec la **serviette en papier** de la saucisse.
- **Cadrage** : « Les pompes et les chiffres sur la même image. » Même petit jeu qu'au chapitre 6, avec deux éléments.
- **Langue** : les chiffres du compteur tournent trop vite. Une seule ligne est stable : *Litrov za sekundu: 180.* Il faut la dire à Andrea : *stoosemdesiat*, et pas *osemnásť* ni *osemdesiat*. **Pièce n° 7.**
- **Marek** : *Je ostrá?* (« Elle est nette ? »)
  - *Nerozumiem, som Francúz* : « Tu as très bien compris la porte interdite. » *Bageta?* : « Assieds-toi. »
  - **Dialogue par sujets** : on pose les cartes du tableau devant lui. Le permis → le circuit fermé marche jusqu'à 25 °C. Les captures → *Malý program. Dvanásť riadkov.* « Qui l'a écrit ? » → *Ja.*
  - Dernier sujet, « Venez le dire » : il refuse. *Mám štyri deti.* La seule réplique qui le touche : *Pijú vaše deti vodu?*
- **Sortie** : l'escalier de droite. Celui de gauche mène à la scène où parle le monsieur au sourire (il sourit, on recommence au pied de l'escalier).
- **Tableau** :
  - Marek passe de « aide tout le monde » à « a écrit le programme », et la case « quelqu'un de l'intérieur » affiche son nom, barré : « refuse ».
  - **On ferme enfin la question du chapitre 2** : relier le permis (0 l) et le compteur (180 l/s). La réponse a une nuance : « vrai jusqu'à 25 °C, faux tout l'été ».
- **Cinématique** : derrière les arbres. « Pas n'importe qui. » Le monsieur les voit, et sourit.
- **Animations** : les pompes qui vibrent, les aiguilles, les gouttes de condensation, un gyrophare orange.
- **Mots** : *deň otvorených dverí, prehliadka, zakázaný, čerpadlo, merač, ostrý, okruh, stupeň*.

### Chapitre 9 : Le lac du haut

*Banská Štiavnica, samedi matin. Grammaire : les boutiques en *-áreň*, le superlatif *naj-*, l'hypothèse (*keby*). Pièce n° 8 : les relevés de doktorka Vydrová. Témoin trouvé : quelqu'un qui sait lire les chiffres. Chrono du chapitre : le train de midi (l'horloge de la ville).*

#### Décor 1 : la ville en escaliers (3:1)

- **Langue** : Ján parle trop. Il faut l'arrêter avec la phrase d'Andrea : *Dýchaj.* Ensuite il donne le chemin, noyé dans son bavardage, avec les boutiques comme repères : *pri pekárni hore, za lekárňou doľava, okolo cukrárne…* et *najstaršie jazero*, le plus vieux lac.
  - Les enseignes du décor sont à lire : *pekáreň, lekáreň, kaviareň, cukráreň, kníhkupectvo*.
  - Un mauvais escalier ramène toujours à la boulangerie (gag de Maťo : il en ressort avec un petit pain à chaque fois).
- **Objet (début du fil)** : Ján offre des **noix**. Une poignée chacun.
- **Figurants** : Ján (saute d'un toit à l'autre), des touristes hérissons qui se photographient, la boulangère, un chat sur un toit, un ramoneur.
- **Animations** : l'horloge de la ville (le chrono), des pigeons, le linge entre deux maisons.

#### Décor 2 : les deux lacs

1. **Rencontre** : la loutre en bottes plante une règle dans l'eau. Elle fait tomber sa règle : il faut la lui repêcher (elle flotte vers les canards) avant qu'elle écoute quoi que ce soit.
2. **Objets (fin du fil) et ordre** : poser les sept pièces sur le banc. Le vent du lac les emporte : chaque papier doit être lesté d'une **noix**. Puis il faut les ranger dans l'ordre du raisonnement (répétition générale du chapitre 12).
3. **Dialogue** : « Sept choses qui vont dans le même sens. Ce n'est pas une preuve. » Sa question : « Un tuyau, là-haut, ne peut pas vider un ruisseau, en bas. Vous répondrez quoi ? »
4. **Mécanisme (sans langue)** : d'abord le panneau d'information des *tajchy*, un schéma avec le lac du haut, la galerie, la source et trois vannes. On peut y essayer les vannes du doigt. Puis en vrai, trois roues en fer :
   - la première est rouillée (il faut Maťo) ;
   - la deuxième arrose Ján (fausse piste, une seule fois) ;
   - la troisième envoie l'eau du lac du haut dans la galerie.
   Le lac baisse, la source devient un filet, des gouttes, rien. Il faut ensuite **refermer**, dans l'ordre inverse : « Cette source a trois cents ans, je voudrais la garder. »
5. **Déduction** : sur le tableau, trois paires à relier : lac du haut = zone humide, roue = pompes, source = ruisseau du village. La question « comment ? » est fermée.
- **Figurants** : la loutre, des canards (flottent / plongent), un pêcheur blaireau immobile.
- **Animations** : les rides du lac, les roseaux, la source dans l'herbe, les nuages qui se reflètent.

#### Décor 3 : le bureau sous le toit

- **Langue et logique** : des boîtes jusqu'au plafond, étiquetées à la main, par ruisseau et par année. C'est Ján qui grimpe. Il faut le guider : *vyššie, nižšie, vľavo, vpravo*, et lui lire les années (*tisíc deväťsto deväťdesiatpäť…*).
- **Observation** : une fois les boîtes du bon ruisseau alignées, il manque les deux dernières années. Le trou entre au tableau, et il a exactement la forme du carnet d'Andrea.
- **Pièce n° 8** : les deux boîtes (très lourdes : Gab marche lentement tant qu'il les porte, jusqu'au chapitre 11).
- **Question du tableau** : « Que manque-t-il ? » Relier le trou de deux ans au carnet, ou à Marek. « Sinon, ils diront : une vieille loutre fâchée et quatre enfants. »
- **Fausses pistes** : une boîte « Divers », pleine de règles cassées ; le diplôme accroché de travers.
- **Animations** : la poussière dans le rayon de la lucarne, une araignée, l'horloge qui avance.
- **Mots** : *schody, pekáreň, lekáreň, cukráreň, jazero, tajch, koleso, krabica, meranie, najstarší*.

### Chapitre 10 : L'offre

*Le train pour Bratislava, samedi après-midi. Grammaire : le discours rapporté (*píše, že…*), *mal by som*. Pas de pièce : une phrase. Un seul décor, le compartiment (3:1, avec le couloir), et le paysage qui défile.*

- **Langue, à l'envers** : le message de la mère de Gab est en français. Katka veut savoir. Il faut le rapporter en slovaque : *Píše, že lietadlo letí zajtra o desiatej.* (« Elle écrit que l'avion part demain à dix heures. ») Et la réponse de Gab : *Áno.* « À tout. Ça va plus vite. »
- **Dialogue** : le monsieur au sourire s'assoit. *Dobrý deň, pán Bageta.* Le pouvoir de Gab est mort. On explore librement : *A výmenou?* (« Et en échange ? »), *Inak?* (« Sinon ? »). Deux papiers restent sur la tablette : le puits, la bourse.
  - On peut essayer de signer : « Je ne suis pas du village. Je ne peux pas signer pour eux. »
- **Le téléphone de Babka** : « Dites la vérité. Mais ne nous fermez pas l'usine à ordinateurs. […] Mangez quelque chose, et après vous saurez. » C'est une vraie consigne : la discussion ne se débloque pas tant qu'ils n'ont pas mangé.
- **Objets (deux fils qui se ferment)** :
  - il reste des **noix** de Ján, mais pas de casse-noix : Maťo les casse entre deux doigts, si on lui demande ;
  - le chariot du vendeur passe dans le couloir, toutes les minutes. Quatre *horalky* se paient avec **les pièces du distributeur de la gare** (prologue).
  - Il faut un crayon : celui de la loutre, derrière son oreille. Elle dort entre ses boîtes. On le prend pendant qu'elle expire (son ronflement donne le rythme).
- **La scène à quatre voix** : chacun pose une contrainte, qui entre au tableau.
  - Babka : la vérité **et** le bâtiment.
  - Katka : un puits, c'est de l'eau prise à un autre village.
  - Andrea : la bourse, oui, mais pas la sienne.
  - Maťo : alors il faut le dire comme ça.
  Puis on **construit la phrase** avec des étiquettes, au dos de l'offre : *Nechceme* · *zatvoriť* · *budovu*. *Chceme* · *znova otvoriť* · *potok*. Distracteurs : *studňu*, *otvoriť budovu*, *zatvoriť potok*. La phrase se punaise au centre du tableau.
- **La question** : Andrea demande. *Pôjdeš mi po zápisník?* — « C'est du vol. » — *Nie. To je vrátenie.* — *Tak nie.* / *Žartujem. Áno.* Les deux choix mènent au oui.
- **Prise** : sous la fenêtre, pour le téléphone.
- **Figurants** : le vendeur au chariot (un vieux hérisson), un contrôleur de train qui passe, une dame qui tricote dans le compartiment d'en face.
- **Animations** : le paysage (collines, puis le Váh et son pont), les rideaux, la tablette qui vibre, la loutre qui ronfle.
- **Mots** : *lietadlo, studňa, štipendium, výmenou, pravda, zatvoriť, otvoriť, vrátenie*.

### Chapitre 11 : La voiture noire

*Bratislava, samedi, fin d'après-midi. Grammaire : *Máte…? Nemáme…*, les transports (*električkou*), *dva / dve*. Pièce n° 9 : le carnet d'Andrea, et son papier jaune.*

#### Décor 1 : devant la télévision (3:1 : la loge, le parvis, le parking)

1. **Le portier** (humain). *Máte pozvánku?* — *Nemáme.* Tout échoue, exprès :
   - *Nerozumiem, som Francúz* : « L'office du tourisme est à la gare. »
   - le cousin de Katka à Žilina ;
   - Maťo qui essaie d'avoir l'air adulte.
   **Objets** : poser les deux boîtes sur son comptoir. C'est le signal pour la loutre : *Mám dve veľmi ťažké krabice a ďalej ich nenesiem. Zavolajte niekoho.*
2. **La rédactrice** (humaine). Trois minutes, à son chronomètre : il faut lui montrer les trois pièces les plus fortes, pas les huit. Verdict : deux minutes d'antenne. Cinq avec un original.
3. **Le parking : laquelle ?** Trois voitures noires. **Fil long** : la **carte de visite** du refuge (chapitre 4). On appelle le numéro avec le téléphone de Katka (1 barre) : un écran s'allume sur un tableau de bord. La vitre arrière est ouverte de dix centimètres. Sur le siège, le carnet vert.
4. **Qui passe le bras ?** Maťo : pas un doigt. Gab : la manche reste coincée. Katka : oui.
5. **La diversion (langue et timing)** : le chauffeur est à deux mètres.
   - Le plan de la ville est sur le présentoir du portier. Dans l'inventaire, « utiliser » le plan sur lui-même le retourne : il est à l'envers.
   - Gab joue le touriste perdu. Deux jauges : la **patience du chauffeur** et **le bras de Katka**. Il faut l'emmener à l'ombre, dix pas plus loin, et le garder de dos : *Kde je hrad?* — *Tam hore.* — *Hore vpravo?* — *Vľavo.* — *Túto ľavú?* (et Gab montre sa droite).
   - Trop bête trop vite, il s'en va. Trop intelligent, il se retourne : Katka retire la patte, on recommence.
   - Sortie : *Ďakujem veľmi pekne.* Le choix *Ďakujem veľa* est proposé une dernière fois. Gab ne se trompe plus.
- **Figurants** : le portier, des techniciens qui portent des câbles, deux pigeons, une présentatrice météo qui répète ses gestes devant une vitre.
- **Animations** : le drapeau, les reflets sur les voitures, une antenne qui tourne, le château au loin.

#### Décor 2 : le tram n° 9 (le décor du chapitre 1, vitres sur Bratislava)

- **Langue** : à l'arrêt, lire le panneau. *9 → Hrad.* Pas le 4, pas le 7.
- **Le circuit se ferme** : Katka a acheté quatre billets sur l'application (1 barre ; si le téléphone est à plat, il reste le distributeur). Et il faut **composter**, comme au chapitre 1. La machine jaune.
- **Le contrôleur** (le même petit jeu qu'au chapitre 1). Le monsieur au sourire est monté de justesse : *Som hovorca Zelenej vlny.* — *Teší ma. Ja som revízor z deviatky. Váš lístok.* Formulaire de trois pages.
  - Si le joueur a oublié de composter, lui aussi descend avec le contrôleur, à côté du monsieur, qui sourit. On recommence à l'arrêt.
- **Observation** : par la vitre, sur le trottoir. *Už sa neusmieva.*
- **Le carnet** (panneau). *Otvor.* Deux ans de chiffres.
  - **Logique** : trouver l'endroit où ils tombent. C'est trois mois après la date entourée en rouge : la même histoire que les photos du chapitre 2.
  - **Langue** : le papier jaune. *Technický úsek. Merania overené. Údaje správne. Nešíriť.* (« Service technique. Mesures vérifiées. Chiffres corrects. Ne pas diffuser. ») Il faut comprendre *správne* et *nešíriť*. **Pièce n° 9.**
- **Tableau** : les neuf pièces sont là. Nouvelle question, qui reste ouverte : « Qui a écrit le papier jaune ? »
- **Figurants** : une vieille tortue qui tricote, un étudiant endormi, le contrôleur.
- **Animations** : Bratislava qui défile, le château qui grandit à chaque virage, les poignées.
- **Mots** : *vrátnik, pozvánka, redaktorka, okno, zápisník, plán mesta, hrad, hovorca, pokuta, správne*.

### Chapitre 12 : Cinq minutes

*Le château, samedi soir. Grammaire : l'heure (*o siedmej*), l'impératif négatif (*Nepúdrujte ma!*), *mať trému / pravdu*. Le direct. Témoin trouvé : quelqu'un de l'intérieur.*

#### Décor 1 : les coulisses

- **Chrono** : l'horloge de la régie. *O päť minút!*
- **Langue** : la maquilleuse poursuit Gab avec sa houppette. *Nepúdrujte ma!* Andrea : *Mám trému.* Et c'est Gab qui dit *Dýchaj.* — « C'est ma phrase. »
- **Objets (sans langue)** : la liste de la rédactrice. Chaque pièce doit être prête :
  - la vidéo : il faut relier le téléphone de Katka à la régie. Trois câbles traînent, un seul a la bonne prise (les formes se comparent). Et il faut de la batterie : la régie a une prise ;
  - les boîtes de la loutre : un chariot, caché sous la nappe du buffet (Maťo monte la garde devant) ;
  - le carnet : Andrea le tient et ne le lâche pas (cliquer dessus : « Non. »).
- **Figurants** : la maquilleuse, un technicien au micro (*raz, dva, tri*), un présentateur qui répète, Maťo au buffet.
- **Animations** : les voyants de la régie, les câbles, le rideau.

#### Décor 2 : le plateau, sur la terrasse

- **Avant eux** : la directrice (humaine) reçoit une goutte d'eau en verre. « L'air des Tatras, zéro litre. » Une chaise vide : *Hovorca*.
- **Le direct : cinq vraies minutes.** La directrice affirme, le joueur répond par une pièce du tableau, dans l'ordre :

  | Ce qu'elle dit | La pièce qui répond |
  |---|---|
  | « Zéro litre » | 1. le ticket « 0 litre ? » (c'est là que tout commence) |
  | « C'est la sécheresse » | 2. le registre de pán Orol |
  | « Un câble pour la fibre » | 3. la photo de la tranchée |
  | « Nos données sont transparentes » | 4. les captures (la même semaine) |
  | « Un circuit fermé » | 5. la vidéo (l'eau tiède, la vapeur) |
  | « Nous n'utilisons pas d'eau » | 6. le bon de livraison (4 pompes) |
  | « Elles ne servent pas » | 7. le compteur (180 l/s) |
  | « Ce ruisseau a toujours été capricieux » | 8. les trente ans de la loutre |
  | « Et depuis deux ans ? » | 9. le carnet, et le papier jaune |

  Une mauvaise pièce : la présentatrice dit *Prosím?* et Katka souffle. Si les cinq minutes passent, c'est la météo, et on reprend aux coulisses (« Encore une fois. En direct. »).
- **Elle nie** : *Kresby detí.* La loutre : « Je travaillais pour le ruisseau. » Puis : *Kto to videl? Nikto.*
- **Le dernier geste n'est pas une pièce.** Sur le tableau, une case est vide : « quelqu'un de l'intérieur ». Il faut regarder le public (la caméra glisse) et y trouver quatre petits blaireaux, puis leur père. Un clic : il se lève. *Ja.* Le papier jaune trouve son auteur, la dernière question se ferme. *Ocko skončil!*
- **Maťo** : il pose son sandwich sur la chaise vide et lit la phrase du chapitre 10. Si le joueur ne l'avait pas construite du premier coup, il bute sur le même mot (clin d'œil).
- **Tableau final** : cinq suspects rayés ou requalifiés, deux témoins, neuf pièces, une phrase.
- **Figurants** : le public (ministres, journalistes, un quatuor), les cadreurs, la présentatrice, Marek et ses quatre petits.
- **Animations** : les projecteurs, le voyant rouge des caméras, le coucher de soleil sur le Danube, le grand écran.

#### Décor 3 : la terrasse, plus tard

- **Résumé en trois cartes** : les pompes arrêtées, l'inspection lundi, la source qui reviendra lentement. Marek embauché par la loutre. Babka en visio : *Si chudý! Jedz!*
- **Dernier dialogue à choix** : « L'été prochain ? »
  - *Sľubujem* (« Je promets ») : *Nesľubuj.* On revient au choix.
  - *Uvidíme* : « C'est ma phrase. — Je te la rends l'été prochain. »
- **Animations** : les lumières de la ville qui s'allument une à une, les guirlandes, les étoiles.
- **Mots** : *naživo, tréma, cena, riaditeľka, dôkaz, svedok, sľúbiť, uvidíme*.

### Épilogue : Le pommier

*Košice, mardi matin. Le jardin du chapitre 2 (`rano_wide`), une pomme en plus.*

- Gab se réveille. **L'inventaire est vide**, le tableau d'enquête aussi. Il reste un seul objet dans la poche : le ticket de tram. On le retourne : *0 litrov?*
- **Dialogue** : Andrea se fige à trois mots du récit (*meracia stanica*, *zelený zápisník*, *sivá budova*). « Je n'étais pas dans ce tram par hasard. » La photo du ruisseau à sec, sur son téléphone.
- **Deux derniers choix** : *Pomôžeš mi?* — *Nie.* / *Žartujem. Áno.* Puis *Veľmi hlúpy. Nie veľa hlúpy.* — « Comment tu sais ça ? Je ne te l'ai pas encore appris. »
- **Fin** : *Uvidíme.* Générique sur la carte du voyage. Le bouton « Rejouer » s'appelle *Ešte raz* et ramène au tram : le circuit est fermé.

## 8. Ce qu'il faut ajouter au moteur

1. **Tableau d'enquête** : écran, pièces, liens entre deux éléments, question du chapitre.
2. **Animations d'ambiance** (`scene.ambient`) et **figurants** (`scene.extras`).
3. **Énigme d'ordre** (photos, échelles, sacs de sable) : un petit écran réutilisable.
4. **Chrono de jeu** (dossier, robinet) et **attente d'un état** (se cacher quand le monsieur se tourne).
5. Déjà présents dans le prototype, à reprendre : sujets liés au Slovník, combinaisons, indices, carte du voyage, caméra 3:1, ouverture.

**Pour les chapitres 3 à 12** (les points 1 à 4 sont faits) :

6. **Batterie du téléphone de Katka** (indices à partir du ch. 5) et points de recharge.
7. **Écran noir avec halo** (ch. 3, les yeux fermés ; ch. 4, la panne) : `scene.overlay` suffit.
8. **Panneau « ordre »** réutilisable : sauvetage (ch. 6), pièces sur le banc (ch. 9), le direct (ch. 12).
9. **Panneau « cadrage »** : un cadre à déplacer et zoomer sur le décor (ch. 6 et 8).
10. **Panneau « comparaison »** : deux listes à faire glisser l'une sur l'autre (ch. 5, ch. 6 matin, ch. 11).
11. **Consignes aux complices** : cliquer sur Katka ou Maťo ouvre un choix d'ordres (ch. 8, 9, 11).
12. **Deux jauges en dialogue** (patience du chauffeur, bras de Katka, ch. 11) et **choix « ne rien faire »** à durée limitée (ch. 4).
13. **Étiquettes à assembler** pour construire une phrase (ch. 10).
14. **Écoute** : trois sons à nommer (ch. 5). Sons à ajouter dans `Sons-a-chercher.md`.
15. **Tableau** : suspects à rayer, cases « témoin », questions qui se rouvrent (ch. 7) et restent ouvertes plusieurs chapitres.

## 9. Images pour le prologue et les chapitres 1 et 2

| Type | Image | Remarque |
|---|---|---|
| Décors 3:1 | gare, tram, rue de la tante | sans personnages |
| Décors 16:9 | jardin (soir, matin), couloir du bureau et guichet, rue devant le bureau avec fontaine | le jardin a deux éclairages |
| Héros | Gab et Andrea : marche, poses, Andrea assise avec livre | planches refaites de zéro |
| Seconds rôles | contrôleur, dame du guichet, monsieur au sourire, voiture noire | |
| Figurants (2 poses) | vendeuse, voyageur, dame endormie, babička, ado, chat, hérisson, monsieur mots croisés, maman, ouvrier, livreur, pigeons, merle | 2 ou 3 figurants par planche |
| Ambiance | horloge, vapeur, linge, lucioles, néon, ventilateur… | petites planches de 2 à 4 images |
| Objets | billet 20 €, pièces, bouteille, ticket, ticket annoté, clé, couverture, stylo, ticket de numéro | une planche |
| Écrans | téléphone d'Andrea (5 photos), sommaire du dossier, tableau d'enquête | |

Estimation : 7 décors, environ 6 planches de figurants, 2 planches de héros, 1 planche d'objets, 4 ou 5 planches d'ambiance, soit à peu près 40 à 55 générations.

### Images pour les chapitres 3 à 12

| Ch. | Décors | Personnages nouveaux | Figurants (2 poses) | Objets et écrans |
|---|---|---|---|---|
| 3 | forêt et gorge (gardées) ; cabane d'Orol et lac des castors (nouveaux) ; bivouac = cinématique | pán Orol, le castor | hérissons randonneurs, chamois, geai, teckel, petits castors, héron | bâton, pomme de pin, registre (page) |
| 4 | refuge dehors (soir + variante matin), salle du refuge (éclairée + noire), cuisine | gardien, monsieur au sourire trempé | saint-bernard, randonneurs aux cartes, marmotte | bougie, allumettes, boîte en fer, tasses, sac vert, carte de visite, mur de photos |
| 5 | ruisseau à sec et pré (3:1), cuisine de Babka, arrière de la bergerie | Maťo, Katka (planches de poses), Babka, le maire et sa voiture | moutons, bouc, coq, chien sous la table, tracteur, poules | verre, feuille de chou, plaque OPTIKA, téléphone de Katka (site) |
| 6 | rue inondée (3:1), portail et parking (nuit), arrière du bâtiment ; variante béton de la bergerie | Marek, pompier, gardien du portail | souris au frigo, canards, lapins, chat sur armoire, sinistrés | baignoire, corde, thermomètre, gaffe, couvertures, cadre vidéo |
| 7 | chantier, cabine du camion (+ bande de paysage) | chef de chantier, chauffeur | taupe, sanglier, pic-vert, chien du tableau de bord | carton, craie, panneau, boîte de bons, bon de livraison, plan du chantier |
| 8 | entrée et fête, hall et serveurs, salle des pompes | hôtesse, guide, agent, Marek assis | visiteurs, enfant au ballon, robot de ménage | limonade, saucisse, serviette, compteur, plan d'évacuation |
| 9 | ville en escaliers (3:1), les deux lacs, bureau sous le toit | Ján, doktorka Vydrová | touristes, boulangère, chat, canards, pêcheur | noix, règle, panneau des tajchy, trois roues, boîtes |
| 10 | compartiment et couloir (3:1, + bande de paysage) | monsieur au sourire assis | vendeur au chariot, contrôleur de train, tricoteuse | deux papiers, horalky, crayon, étiquettes de la phrase |
| 11 | parvis de la télévision (3:1) ; le tram existe (nouvelle bande de ville) | portier, rédactrice, chauffeur, monsieur décoiffé | techniciens, présentatrice météo, tortue, étudiant | plan de ville, carnet vert (pages), papier jaune, trois voitures noires |
| 12 | coulisses, plateau sur la terrasse (+ vue du public), terrasse de nuit | directrice, présentatrice, Marek en veste et ses quatre petits | maquilleuse, technicien, public, cadreurs, quatuor | trophée, câbles, chariot, papier de Maťo, sandwich |
| ép. | jardin du matin (existe) | — | merle | pomme, ticket « 0 litrov? » |

Estimation : 27 décors nouveaux (dont 5 en 3:1 et 4 variantes d'éclairage), une quinzaine de personnages, environ 20 planches de figurants et 10 planches d'objets : entre 110 et 140 générations, soit 10 à 14 par chapitre.

## 10. Décisions d'Eric (16 nov. 2026)

1. **Figurants** : des animaux, sauf les adultes humains de l'histoire (contrôleur, dame du guichet, monsieur au sourire…).
2. **Chronos** : on les garde (dossier de 400 pages, robinet).
3. **Un fil d'objet par chapitre** entre deux décors, comme la bouteille d'eau de la gare qui sert au chat.
4. **Tableau d'enquête** : un panneau qui glisse par-dessus le décor, pas un écran à part.

**Images** : les décors 3:1 du 11 nov. (gare, tram, rue, jardin soir et matin) et les planches de Gab, Andrea et du contrôleur sont gardés. Les nouveautés (objets, figurants, ambiance) se font en planches séparées, posées par-dessus : `web-games/aventure/art/PROMPTS_v2.md`.
