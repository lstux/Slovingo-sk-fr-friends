# Illustrations des fiches de vocabulaire — prompts ChatGPT

Une illustration par fiche `md/20_Vocabulary_NN_*.md` (30 fiches). Les personnages et le style sont ceux de la série : voir `docs/Prompts-illustrations.md` (tableau « Les personnages », planches de référence). Ce document ne les redéfinit pas, il ajoute ce qui est propre aux images de vocabulaire.

Les cinq premières images (01 à 05) sont à **refaire** : elles dérivaient du style de la série (contours épais, têtes et yeux trop gros, Andrea trop proche d'une lapine, tenues différentes, logos de train réels). Les légendes existent déjà pour ces cinq-là : elles sont reprises ci-dessous.

## Méthode

1. **Une conversation par image.** Joindre la planche indiquée dans la colonne « Joindre » : **A** = `docs/illustrations/planche-heros.jpg` ; **B** = `docs/illustrations/planche-tous.jpg` (héros + seconds rôles, pour les scènes avec Babka Zuzana ou Doktorka Vydrová). Une seule planche à la fois (limite de 2 fichiers).
2. **Coller le « Bloc commun » ci-dessous, puis la ligne `Scene` de la fiche.** ChatGPT peut lire la fiche du repo pour le thème, mais l'image ne doit contenir **aucun mot écrit**.
3. **Format** : paysage 16:9 (ou 3:2, je recadre). **La miniature de la page d'index est un carré pris au centre de l'image** : on n'en garde que la moitié centrale en largeur. Tout ce qui compte (personnages, objet principal) doit donc rester dans la moitié centrale ; les bords ne contiennent que du décor.
4. **Nom du fichier** : `img/vocabulary/NN_<nom de la fiche>.jpg` (celui de la colonne « Fichier »). Je l'intègre ensuite avec la légende et la ligne de crédit.
5. Si un personnage dérive, le redemander dans la même conversation : « Keep the characters exactly as in the attached model sheet. »
6. **À vérifier avant de me les envoyer** :
   - Andrea est une **hase** : pelage gris-brun moucheté, visage anguleux, très longues oreilles à pointe noire, longues pattes fines. Pas de pelage beige uni, pas de visage rond.
   - Les tenues sont celles de la planche (T-shirt vert menthe et sacoche jaune pour Andrea ; sweat bleu roi et sac à bretelles jaunes pour le renard). Pas de gants.
   - Aucun texte, aucun chiffre, aucun logo (ni de compagnie ferroviaire, ni de marque).
   - Contours fins et proportions d'ados : ni gros contours « autocollant », ni têtes et yeux surdimensionnés.
   - Les objets tiennent à quelque chose, les mains tiennent bien ce qu'elles tiennent.

## Bloc commun (à coller au début de chaque prompt)

```
Illustration for a language-course vocabulary sheet. Draw the characters exactly as in the attached model sheet, and only the characters named in the scene.

Fox: a 15-year-old red fox boy, orange fur, white muzzle and chest, black ear tips, royal-blue hoodie, backpack with yellow straps, navy jeans, white sneakers; bare orange paws, no gloves.
Andrea: a 16-year-old HARE girl, a real hare and NOT a rabbit: speckled grey-brown fur, a thin light blaze from forehead to muzzle, a slightly angular face with calm, slightly ironic eyes, very long upright ears with pink insides and black tips, long slender hind legs; mint-green T-shirt, yellow cross-body bag, denim shorts, red sneakers. Her fur is never plain beige and her face is never round.
Maťo: a 14-year-old brown bear boy, a head taller than the others, broad and gentle; open green-and-brown checked shirt over a grey T-shirt, cargo shorts.
Katka: a 13-year-old alpine marmot girl, reaches the fox's shoulder; grey-brown fur, small round ears, visible front teeth, short bushy tail; purple hoodie, headphones around her neck, a phone in her hand.
The four are teenagers: slim, natural proportions, heads and eyes NOT oversized.

Style: classic 2D hand-drawn animated-film style (not 3D): thin clean ink outlines (not thick sticker outlines), flat colours with soft cel shading, muted natural colours (not oversaturated). Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable.

Format: wide 16:9 landscape. IMPORTANT: the picture will be cropped to a centred square thumbnail, so keep the characters and the main subject inside the central half of the width; the left and right edges only show scenery.
No text, no letters, no numbers (on signs, screens, boards, labels), no speech bubbles; pictograms and simple symbols are fine. No logos of any kind (no railway, brand or institution logos), no watermark.
```

## Les 30 scènes

Chaque entrée : fichier, planche à joindre, légende (pour la fiche), puis le prompt (`Scene`).

### 01 — Météo et climat
Fichier : `img/vocabulary/01_meteo-climat.jpg` · Joindre : **A** · Légende : « Découvrir les phénomènes météo et parler du climat en Slovaquie. » *(remplace `01_pocasie.jpg`)*
```
Scene: A mountain meadow below the High Tatras, midday. The sky above is split in two: on the left bright sun and a few white clouds, on the right dark storm clouds with a lightning flash and falling rain, with a thin rainbow between them. The fox points up at the storm clouds with surprise; Andrea, a folded paper map under her arm, holds out an open palm to catch the first raindrops. Wind bends the grass a little. The two are in the centre; mountains behind them.
```

### 02 — L'eau et l'environnement
Fichier : `img/vocabulary/02_voda-zivotne-prostredie.jpg` · Joindre : **A** · Légende : « Préserver les rivières et protéger les ressources naturelles. »
```
Scene: The bank of a clear mountain stream with a small waterfall in the background, spring light. The fox and Andrea clean up the bank: the fox drops a plastic bottle into a big blue bag, Andrea holds a glass jar of cloudy water up to the light and frowns at it. Behind them, three small sorting bins in different colours marked only with simple pictograms. Clean water in the middle, a little litter on the bank.
```

### 03 — La montagne et la randonnée
Fichier : `img/vocabulary/03_hory-turistika.jpg` · Joindre : **A** · Légende : « Préparer une randonnée et suivre les sentiers balisés des Tatras. »
```
Scene: A rocky trail on a ridge in the High Tatras, clear morning, a small blue mountain lake far below. The fox and Andrea walk uphill with trekking poles, the fox with his usual backpack, Andrea in her usual mint-green T-shirt and yellow bag (a light jacket tied around her waist is fine). Andrea points to a painted trail marker on a boulder: a red-white-red stripe, no text. Alpine flowers along the path.
```

### 04 — Transports et déplacements
Fichier : `img/vocabulary/04_doprava-cestovanie.jpg` · Joindre : **A** · Légende : « Consulter les horaires, trouver le quai et prendre le bon train. »
```
Scene: A platform of a small Slovak railway station, sunny afternoon, an old stone station building behind. A generic regional train with a plain red-and-white body stands at the platform: no logos, no lettering, no numbers. The fox holds a train ticket and a folded map; Andrea points along the platform towards the train. A wooden bench and a flower box. A few ordinary people in the background, drawn in the same simple style. A hill with a castle far behind.
```

### 05 — La ville et la culture
Fichier : `img/vocabulary/05_mesto-kultura.jpg` · Joindre : **A** · Légende : « Explorer le centre historique, les monuments et les lieux culturels. »
```
Scene: The pedestrian main street of Košice on a sunny day, the tall Gothic cathedral with its patterned roof in the middle of the background, a fountain, pastel old buildings, café terraces with umbrellas. The fox takes a photo with a small camera; Andrea reads a folded tourist map and points at the cathedral. No signs with text.
```

### 06 — La nourriture et la gastronomie
Fichier : `img/vocabulary/06_jedlo-gastronomia.jpg` · Joindre : **A** · Légende : « Découvrir les spécialités, goûter et donner son avis au marché. »
```
Scene: A cosy rustic Slovak inn, wooden beams and checked tablecloths. Maťo, at the centre, looks delighted at a big steaming plate of potato dumplings with white sheep cheese and crispy bacon. The fox and Andrea share a plate of filled dumplings and a bowl of soup, Andrea tasting with one eyebrow raised. A friendly human waiter in a simple apron arrives with a tray and a basket of bread.
```

### 07 — Les relations et les émotions
Fichier : `img/vocabulary/07_vztahy-pocity.jpg` · Joindre : **A** · Légende : « Retrouver ses amis, se disputer, se réconcilier : dire ce qu'on ressent. »
```
Scene: A park bench under old trees, golden evening light. The fox and Andrea sit side by side: the fox, relieved and sheepish, scratches the back of his head; Andrea, arms crossed, hides a small smile with one eyebrow raised. In the background, a little behind them, Maťo and Katka give each other a high five. Warm, a little funny.
```

### 08 — Les opinions et le débat
Fichier : `img/vocabulary/08_nazory-diskusia.jpg` · Joindre : **A** · Légende : « Donner son avis, argumenter et échanger des idées sans se disputer. »
```
Scene: The four friends around a wooden table on a village terrace in the evening, a map spread between them, mugs and a teapot. Andrea raises one finger to make a point, calm and sure; Maťo shakes his big head gently; Katka waves her phone as if to prove something; the fox, in the middle, looks from one to the other and scratches his head. Lively but friendly.
```

### 09 — La technologie et Internet
Fichier : `img/vocabulary/09_technologie-internet.jpg` · Joindre : **A** · Légende : « Ordinateurs, réseaux et données : le vocabulaire de la technologie. »
```
Scene: A long cold aisle of a data centre between rows of black server cabinets with tiny blinking blue and green lights, cables overhead. In the centre, Katka and the fox stand in front of a big wall screen showing only abstract graphs and a map made of glowing dots (no text, no numbers). Katka holds a laptop open on her arm and points at the screen; the fox watches, impressed and slightly lost.
```

### 10 — L'énergie et l'exploitation minière
Fichier : `img/vocabulary/10_energia-bana.jpg` · Joindre : **A** · Légende : « La mine, l'énergie et les ressources : comprendre les enjeux. »
```
Scene: The wooden entrance of an old mine in the hills above Banská Štiavnica, afternoon. A small ore cart stands on rails at the entrance. A friendly human miner in an orange vest and helmet explains something to the fox and Andrea, who listen with interest. On the hills in the background: a few wind turbines and a line of electricity pylons, far away and small. Mixed feelings, nobody is a villain.
```

### 11 — Les médias et l'information
Fichier : `img/vocabulary/11_media-spravodajstvo.jpg` · Joindre : **A** · Légende : « Interview, reportage, actualité : parler des médias. »
```
Scene: An outdoor interview on a village square. A human journalist in simple cartoon style holds a microphone towards Andrea, who answers calmly; a human camera operator films with a big shoulder camera. The fox stands next to Andrea and holds a small blue notebook with an elastic band and a pencil. In the background, a small van with a satellite dish on its roof, no logos.
```

### 12 — La sécurité et les secours
Fichier : `img/vocabulary/12_bezpecnost-pomoc.jpg` · Joindre : **A** · Légende : « Dangers, secours et bons réflexes : savoir demander de l'aide. »
```
Scene: A flooded village street in heavy rain, brown water up to the knees, grey sky. A human firefighter in a yellow jacket and helmet hands an orange life jacket to the fox, who takes it; Andrea holds a phone to her ear, calling for help, looking serious. On the side, a plain orange warning sign with only an exclamation-mark pictogram. Determined, never scary.
```

### 13 — Le travail et la société
Fichier : `img/vocabulary/13_praca-obcianska-spolocnost.jpg` · Joindre : **A** · Légende : « Les métiers, la vie de la ville et la participation des habitants. »
```
Scene: A small town square on a market morning. Around the edge, a gardener waters flower beds, a baker hands out bread from a stall, a postwoman delivers letters (all humans, in simple cartoon style). In the centre, the fox and Andrea hold a clipboard with a petition and ask a passer-by to sign; the passer-by thinks it over. A town hall with a clock tower behind. No signs with text.
```

### 14 — Le temps et les souvenirs
Fichier : `img/vocabulary/14_cas-spomienky.jpg` · Joindre : **A** · Légende : « Hier, autrefois, bientôt : raconter ses souvenirs. »
```
Scene: A stone bridge over a river, late afternoon. The fox and Andrea sit on the parapet looking at an old photo: in the photo, a small fox cub, a young hare and two other small animals stand in a meadow, five years younger (the same characters as children). The fox laughs, Andrea smiles fondly. In the background, a church clock tower. A few autumn leaves fall.
```

### 15 — La communication
Fichier : `img/vocabulary/15_vyjadrovanie-komunikacia.jpg` · Joindre : **A** · Légende : « Expliquer, reformuler, demander de répéter. »
```
Scene: A bench at the edge of a forest path. Andrea explains patiently with open hands and draws a quick sketch of a mountain in the blue notebook on her knee; the fox leans in, one paw cupped behind his ear as if asking her to repeat. Light through the trees. Friendly, a little funny.
```

### 16 — Les nombres et le calcul
Fichier : `img/vocabulary/16_cisla-pocitanie.jpg` · Joindre : **A** · Légende : « Compter, lire un prix, annoncer une date ou une heure. »
```
Scene: An open-air Slovak village market, sunny morning. Andrea counts apples into a basket, lifting them one by one; the fox counts coins in his open paw; a human stallholder smiles behind a stall of fruit and jars, with price signs showing only little coin pictograms (no digits). Neat groups of objects on the table: three jars, five apples, ten eggs. A clock tower with a plain clock face far behind.
```

### 17 — La vie quotidienne
Fichier : `img/vocabulary/17_vie-quotidienne.jpg` · Joindre : **A** · Légende : « Se lever, se préparer, manger : une journée ordinaire. »
```
Scene: Morning in a small room of a mountain guesthouse, sun rising through the window. The fox, yawning, in a loose T-shirt, brushes his teeth at a small sink; Andrea stands in the doorway pointing at a round alarm clock on the shelf, amused. On a small table, bread, a jar of jam and two mugs. Backpacks packed by the door.
```

### 18 — La maison et le logement
Fichier : `img/vocabulary/18_domacnost-bydlenie.jpg` · Joindre : **A** · Légende : « Les pièces, les meubles et les gestes de la maison. »
```
Scene: A cutaway view of a two-storey wooden village house, like a doll's house, warm lamp light. Downstairs: a kitchen with a stove and a table, and a living room with a sofa where Katka sits with her phone. Upstairs: a bedroom where Andrea hangs a framed picture, and a bathroom. The fox carries a cardboard box up the stairs. Keep the whole house in the central half of the image.
```

### 19 — Les vêtements et le style
Fichier : `img/vocabulary/19_oblecenie-styl.jpg` · Joindre : **A** · Légende : « Choisir une tenue, essayer et acheter des vêtements. »
```
Scene: A small clothes shop with racks and a big mirror. Katka tries on a bright yellow jacket in front of the mirror, pleased; Andrea holds up a patterned scarf, unsure; the fox checks a pair of sneakers from a shelf. A human shop assistant with a measuring tape around her neck smiles nearby. Several coats on hangers. No labels, no text.
```

### 20 — Le corps et la santé
Fichier : `img/vocabulary/20_telo-zdravie.jpg` · Joindre : **A** · Légende : « Parler du corps, d'une douleur ou demander de l'aide. »
```
Scene: A mountain hut terrace after a hike. The fox sits on a bench with one sneaker off and a sore ankle, grimacing; Andrea kneels and wraps a bandage around it, concentrated; an open first-aid kit with a plain cross pictogram lies beside them; Katka holds out a water bottle. Calm and caring, a little funny.
```

### 21 — L'école et l'apprentissage
Fichier : `img/vocabulary/21_skola-ucenie.jpg` · Joindre : **A** · Légende : « Cours, devoirs, examens : une journée d'école. »
```
Scene: A bright classroom of a Slovak secondary school, tall windows, wooden desks. Andrea stands at the blackboard drawing a diagram made only of arrows and shapes (no letters, no numbers); the fox sits at a desk with an open textbook, trying to look like he understands; a human teacher in a cardigan watches from the side. Backpacks on the floor, a globe on a shelf.
```

### 22 — La famille et l'amitié
Fichier : `img/vocabulary/22_rodina-priatelstvo.jpg` · Joindre : **B** (Babka Zuzana) · Légende : « Présenter sa famille, parler de ses amis. »
```
Scene: The front garden of an old wooden village house, summer lunch at a long table under an apple tree. Babka Zuzana, the old ewe in her traditional costume and round glasses, serves a cake with a proud smile; the fox, Andrea, Maťo and Katka sit around the table, laughing together. A framed family photo hangs on the house wall behind them, no text. Warm light.
```

### 23 — Le sport et l'activité physique
Fichier : `img/vocabulary/23_sport-pohyb.jpg` · Joindre : **A** · Légende : « Vélo, randonnée, sport en club : on bouge ! »
```
Scene: A forest trail in the sunshine. The fox, Andrea and Maťo ride mountain bikes in a row, all wearing helmets; Maťo, huge, on a bike that looks too small for him, grins. Katka waves from the side of the trail next to a football lying in the grass. Dust and speed lines, cheerful.
```

### 24 — La musique et le cinéma
Fichier : `img/vocabulary/24_hudba-film-kultura.jpg` · Joindre : **A** · Légende : « Musique, cinéma et séries : parler de ce qu'on aime. »
```
Scene: A summer evening open-air cinema in a village. A big white screen shows only a soft abstract landscape (no text). The fox, Andrea and Katka sit in folding chairs sharing popcorn, Katka with her headphones around her neck; Maťo sits next to them playing a long wooden shepherd's flute. Warm string lights in the trees, dusk sky.
```

### 25 — Les jeux et les loisirs
Fichier : `img/vocabulary/25_hry-zabava.jpg` · Joindre : **A** · Légende : « Jeux de société, jeux vidéo et sorties entre amis. »
```
Scene: A game evening at a big wooden table under a warm lamp. A board game with coloured pieces, dice and playing cards in the middle. Maťo carefully moves a piece with one huge finger; Andrea fans her cards with a poker face; the fox cheers; Katka, a bit apart, plays on a handheld game console. Snacks and mugs on the table.
```

### 26 — Les vacances et l'hébergement
Fichier : `img/vocabulary/26_dovolenka-ubytovanie.jpg` · Joindre : **A** · Légende : « Réserver une chambre et organiser son séjour. »
```
Scene: The reception of a wooden mountain guesthouse, flower boxes at the windows. The fox and Andrea, with their backpacks, stand at the wooden counter; a friendly human receptionist hands them a key on a big wooden tag. On the wall behind her, a map of the mountains with a few coloured pins (no text). Two suitcases and a pair of trekking poles by the door.
```

### 27 — Les achats et l'argent
Fichier : `img/vocabulary/27_nakupy-peniaze.jpg` · Joindre : **A** · Légende : « Faire les courses, payer et parler de son budget. »
```
Scene: The checkout of a small village grocery shop. Andrea pays with a few coins and a banknote, the fox holds a basket with bread, cheese and a bottle of milk; a human cashier in a simple apron hands back the change; a card terminal sits on the counter. Shelves of food behind them, no labels, no text, no brands.
```

### 28 — Les animaux et les plantes
Fichier : `img/vocabulary/28_zvierata-rastliny.jpg` · Joindre : **A** · Légende : « Animaux, arbres et petites bêtes : observer la nature. »
```
Scene: The edge of a forest and an alpine meadow, early morning. The fox, Andrea and Katka observe quietly: Andrea and the fox share a pair of binoculars, Katka crouches next to a wild marmot sitting up in the grass (a real small marmot, not dressed). In the meadow, a deer at the tree line, a butterfly, a hedgehog under a fern, wild flowers and tall spruce trees.
```

### 29 — Les pays et les langues
Fichier : `img/vocabulary/29_krajiny-jazyky.jpg` · Joindre : **A** · Légende : « Les pays voisins, les langues et les nationalités. »
```
Scene: A hilltop viewpoint over a wide green landscape of hills and valleys, afternoon. The fox holds a folded map of Europe; Andrea points to the horizon. Beside them, a wooden signpost carries six small painted flags, simple and neat, with no text. The four friends are all there, Maťo and Katka looking at the view.
```

### 30 — Les sciences et les découvertes
Fichier : `img/vocabulary/30_vzdelanie-veda.jpg` · Joindre : **B** (Doktorka Vydrová) · Légende : « Observer, expérimenter, partager une découverte. »
```
Scene: A riverbank at dusk. Doktorka Vydrová, the otter hydrologist in her khaki bucket hat and olive jacket, measures the water with her graduated ruler and holds up a glass sample jar. Katka looks at a leaf through a magnifying glass; the fox points a small telescope at the first stars; Andrea writes in the blue notebook. A thermometer and a small lab kit on a flat rock. Calm, curious, a little magical.
```

## À l'intégration

Quand tu m'envoies une image : je la place dans `img/vocabulary/`, je (re)mets la ligne `@ img/vocabulary/<fichier> | <légende> Source : illustration générée avec ChatGPT` sous le titre de la fiche, et j'ajoute la ligne dans `img/credits.md`. Pour 01 à 05, je remplace les images actuelles (le fichier `01_pocasie.jpg` devient `01_meteo-climat.jpg`). La miniature carrée de la page d'index est générée au build : rien à faire de ton côté.
