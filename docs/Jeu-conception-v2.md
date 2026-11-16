# Zajko Quest (point & click) : conception v2, « Circuit fermé »

*16 novembre 2026. Remplace `Jeu-conception.md` (ancienne intrigue : carnet de la loutre, fontaine). Base : `Scenario-v2.md` (section 6) et `Histoire-v2-fr.md`. Comme la première fois, on détaille le prologue et les chapitres 1 et 2 pour voir si la tendance plaît, et on esquisse le reste. Le prototype `web-games/aventure/` sert de moteur ; ses images et sprites seront refaits.*

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
  - Le guichet est fermé (*Zatvorené*, fausse piste).
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
- **Objets** : une babička avec un énorme cabas bloque l'allée vers le composteur arrière.
  - Pousser le cabas : non (« on ne touche pas au cabas d'une babička »).
  - Lui céder sa place : elle s'assoit, le cabas suit, le passage est libre.
  - La phrase de politesse vient en bonus : *Nech sa páči*.
- **Rencontre** : Andrea au fond, livre à l'envers (zone cliquable : **indice n° 1** sur le tableau, « Bizarre… »).
- **Fausse piste** : l'affiche Zelená vlna. Elle entre au tableau, mais rien ne s'y passe encore.
- **Fin du décor** : par la vitre, la fontaine à sec. Andrea dit « Tu descends ici » (**indice n° 2**).
- **Figurants** : la babička (tricote / regarde Gab de travers), un ado avec ses écouteurs (hoche la tête / ne bouge pas), le contrôleur.
- **Animations** : la ville qui défile derrière les vitres (calque qui glisse), les poignées qui se balancent, la lumière du soleil qui passe entre les immeubles.

### Décor 2 : la rue, devant chez la tante (3:1)

**Objectif** : entrer dans le jardin. Andrea : *Kľúč je pod modrým kvetináčom* (la clé est sous le pot bleu). Elle ne traduit pas *modrý* (le travail de langue de la v1 est gardé).

L'énigme d'objets qui suit :
- Sur le pot bleu, **un gros chat dort au soleil**. Le pousser : il crache. L'appeler (*Mňau?*) : il ouvre un œil, rien de plus.
- Dans la cour, il y a une gamelle vide et sèche. Si Gab y verse sa bouteille d'eau (celle de la gare), le chat va boire, et le pot est libre.
- La clé ouvre le portillon.

Les fausses pistes de la v1 restent : pot rouge (escargot), pot jaune (fourmis), paillasson, sonnette (la tante : *Kto je tam?!*, cache-toi derrière le tilleul), nain de jardin, une pièce porte-bonheur.

- **Figurants** : le chat (dort / ouvre un œil, puis boit), un voisin hérisson qui arrose un pot avec un arrosoir vide (secoue l'arrosoir / soupire ; il donne le mot *sucho*, la sécheresse).
- **Animations** : le linge qui sèche et ondule, la chaleur qui fait trembler l'air au-dessus des pavés, un merle qui sautille, le tram qui repart au fond.

### Décor 3 : le jardin, le soir

**Objectif** : arriver sous le pommier sans réveiller la tante (sa fenêtre est éclairée).

- **Objets et observation** : l'allée de gravier crisse (son, la lumière de la tante bouge). Il faut passer par les pierres plates dans l'herbe : on les voit si on regarde le décor, et Andrea ne le dit pas.
- La lampe du jardin a un **détecteur de mouvement** : la couverture du séchoir, posée dessus, l'empêche de s'allumer (combinaison objet + zone).
- **Cinématique** (scène 6) : la fenêtre, le téléphone, *Áno. Je tu. … Nie. Nič som mu nepovedal. … Zajtra.*
- **Déduction, question du tableau** : « Qui est "là" ? ». Gab relie le livre à l'envers, « tu descends ici » et le téléphone. Réponse attendue : « moi ». Elle n'est pas là par hasard.
- **Animations** : lucioles, papillons de nuit autour de la lampe, feuilles du pommier, étoiles qui scintillent.

## 6. Chapitre 2 : Zéro litre

*Grammaire : veľa / veľmi, les nombres. Pièce n° 1 : le permis, « 0 litre ». Question du tableau : « Le datacentre dit-il vrai ? »*

### Décor 1 : le jardin, le matin

- **Langue (gag de la série)** : Gab dit *Všetci tu hovoria veľmi o vode* (« tout le monde parle très de l'eau ») et Andrea le reprend. Juste après, un choix de répliques demande de placer *veľa* ou *veľmi* correctement.
- **Logique (nouvelle)** : les photos d'Andrea.
  - Sur son téléphone, quatre photos du ruisseau et une du chantier, avec leur date en slovaque (*marec, jún, september…*). Il faut les remettre dans l'ordre.
  - Le moment clé apparaît : chantier, puis trois mois, puis ruisseau à sec. Il entre au tableau.
- **Objets** : l'eau ne coule que deux heures par jour. Le robinet du jardin crachote ; pour remplir la gourde avant de partir, il faut le seau sous la gouttière (sec lui aussi : gag) ou le robinet de la cuisine, ouvert pile à l'heure (horloge du décor).
- **Figurants** : la tante, vue de dos à sa fenêtre (arrose / disparaît), le chat du chapitre 1 (il est revenu).
- **Animations** : arroseur qui crachote, guêpes autour des pommes tombées.

### Décor 2 : le bureau de l'environnement (couloir et guichet)

**Objectif** : lire le dossier sans que la dame comprenne qu'il vient avec Andrea.

1. **Langue et objets** : la file d'attente. Il faut un ticket de numéro (*poradové číslo*) à la borne. Le tableau lumineux appelle des numéros en slovaque (TTS) : il faut reconnaître le sien, et pas celui du voisin.
2. **Dialogue** : la dame demande « Vous êtes avec la hase ? ».
   - *Nerozumiem, som Francúz* : elle se méfie moins (ça marche).
   - Si on répond *Áno* : elle ferme le guichet, et on recommence la file (gag).
3. **Logique et chrono** : le dossier fait 400 pages, avec dix minutes de jeu (l'horloge murale tourne).
   - Pas de page de garde : il faut trouver le sommaire (*Obsah*), puis le chapitre *Voda*, puis la ligne *Spotreba vody: 0 l/deň*.
   - Les onglets de couleur sont des fausses pistes (*Hluk* le bruit, *Elektrina* l'électricité, *Cesty* les routes).
4. **Objets** : noter le chiffre. Gab a son ticket, mais pas de stylo.
   - Le stylo du guichet est attaché par une chaînette (fausse piste).
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
- **Objets et timing** : se cacher derrière la fontaine. Le monsieur regarde autour de lui, et il faut bouger quand il se tourne vers la porte. Si on est vu, il sourit, et on recommence.
- **Déduction, question du tableau** : « Zéro litre : vrai ou faux ? ». On ne peut pas encore répondre, c'est fait exprès. Gab note « à vérifier » : c'est la première question ouverte du tableau, refermée au chapitre 8.
- **Figurants** : un pigeon qui boit dans la seule flaque, un livreur qui décharge des cartons.
- **Animations** : drapeau sur la façade, mirage de chaleur, reflets sur la voiture noire.

## 7. Esquisse des chapitres 3 à 12

| Ch. | Pièce | Énigme d'objets (sans langue) | Figurants |
|---|---|---|---|
| 3 Raj | n° 2 : les registres de pán Orol | les échelles : choisir l'ordre de montée (passages qui se bloquent) ; disculper les castors (comparer les marques de dents et les traces d'outils) | randonneurs, castors (2 poses), garde |
| 4 Tatras | n° 3 : la photo du « câble » | panne de courant au refuge : trouver la bougie, les allumettes sèches, le bon fusible ; se cacher dans la cuisine | randonneurs trempés, chien du gardien |
| 5 Village | n° 4 : les chiffres recopiés | écouter le regard « optika » (oreille, puis verre contre la plaque) ; comparer deux tableaux de chiffres | villageois, poules, Babka |
| 6 Inondation | n° 5 : la vidéo du rejet tiède | sauvetage : ordre des sacs de sable ; mesurer avec un thermomètre attaché à une perche | sinistrés, pompiers |
| 7 Route | n° 6 : le bon « 4 pompes » | faire du stop (panneau à fabriquer avec un carton et un feutre) ; retrouver le bon dans la boîte à gants en désordre | chauffeur, autres automobilistes |
| 8 Datacentre | n° 7 : le compteur | détourner le guide (Maťo et Katka, deux personnages à diriger) ; badge à récupérer | visiteurs, guide, agent de sécurité |
| 9 Štiavnica | n° 8 : les relevés de Vydrová | les vannes : maquette puis en vrai (mécanisme) | Ján, touristes, canards des tajchy |
| 10 Décision | — (le marché) | aucun objet : une scène de choix à quatre voix | — |
| 11 Bratislava | n° 9 : le carnet repris | récupérer le carnet dans la voiture noire (distraction, timing) ; poursuite en tram (le ticket validé du ch. 1) | passants, contrôleur, chauffeur |
| 12 Château | le direct | présenter les pièces dans le bon ordre, au bon moment | public, techniciens, présentatrice |

## 8. Ce qu'il faut ajouter au moteur

1. **Tableau d'enquête** : écran, pièces, liens entre deux éléments, question du chapitre.
2. **Animations d'ambiance** (`scene.ambient`) et **figurants** (`scene.extras`).
3. **Énigme d'ordre** (photos, échelles, sacs de sable) : un petit écran réutilisable.
4. **Chrono de jeu** (dossier, robinet) et **attente d'un état** (se cacher quand le monsieur se tourne).
5. Déjà présents dans le prototype, à reprendre : sujets liés au Slovník, combinaisons, indices, carte du voyage, caméra 3:1, ouverture.

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

## 10. Questions pour Eric

1. Les figurants en **animaux** (comme les héros) plutôt qu'en humains, sauf les adultes de l'histoire : d'accord ?
2. Les **chronos** (dossier, robinet) : ça te va, ou on les retire pour garder un jeu sans stress ?
3. La **bouteille d'eau** qui passe de la gare au chat : ce genre de fil entre décors, on en veut un par chapitre ?
4. Le **tableau d'enquête** : un écran à part, ou un panneau qui glisse par-dessus le décor ?
