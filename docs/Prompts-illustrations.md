# Illustrations IA de Zajko Friends — prompts ChatGPT

Une illustration par série, pour la **fiche 05** (le moment fort de l'épisode), plus une **couverture** pour l'introduction. Les autres fiches gardent leur photo Wikimedia Commons. Même méthode que pour les illustrations Gemini du cours adulte (`Slovingo-sk-fr`, `docs/Prompts-illustrations.md`), adaptée à ChatGPT.

**Style** : dessin animé 2D classique (pas de 3D), personnages animaux, décors peints réalistes pour que les lieux soient reconnaissables. Même famille de style que le cours adulte, mais les héros sont des ados.

## Méthode

1. **Planches de personnages** : dans ChatGPT, joindre `esp32/zajko-quest/art/characters/fox-reference.png` puis `esp32/zajko-quest/art/characters/andrea-reference.png`, coller le prompt « Planche des héros ». ✅ Faite le 31 octobre : `docs/illustrations/planche-heros.jpg` (prompt ci-dessous, puis la correction « Andrea en vraie hase, Katka en marmotte »). Puis la même chose avec le prompt « Planche des seconds rôles » (sans image jointe). ✅ Faite le 31 octobre : `docs/illustrations/planche-seconds-roles.jpg`. Puis le prompt « Planche des nouveaux rôles » (la loutre, le porte-parole et le carnet), en joignant la planche des seconds rôles pour garder le même style. ✅ Faite le 10 novembre : `docs/illustrations/planche-nouveaux-roles.jpg` (loutre validée ; porte-parole refait une fois, plus raide et plus lisse, dossier contre la poitrine). Et `docs/illustrations/planche-tous.jpg` (les 3 planches empilées, 1536×3072) pour les scènes qui demandent plusieurs planches.
2. **Chaque scène** : nouvelle conversation, joindre **la planche des héros** (et celle des seconds rôles si la scène en contient un) + **la photo de référence** du lieu (lien Commons donné : télécharger l'image depuis la page), coller le prompt de la scène. Chaque prompt est complet : rien d'autre à ajouter.
3. Si un personnage dérive (couleurs, vêtements, taille), le redemander dans la même conversation : « Keep the characters exactly as in the attached model sheet. »
4. **Format** : demander le paysage (déjà écrit dans chaque prompt). ChatGPT sort du 3:2 (1536×1024) ; je recadre si besoin. Déposer l'image dans `img/illus_<NN>_<lieu>.jpg` (le nom est donné pour chaque scène). Je l'intègre ensuite dans la fiche 05, avec le crédit.
5. **Les défauts à surveiller** (vus sur la scène 01) : un objet qui ne tient à rien (une barre qui s'arrête dans le vide), des humains plus réalistes que les animaux, des yeux réduits à de gros points noirs. Pour les deux premiers, demander la correction dans la même conversation. Les yeux, je peux les retoucher moi-même (petit reflet blanc).
6. **Si ChatGPT refuse** : ne pas insister avec le même texte. Nouvelle conversation, et enlever la phrase qui coince (en général une précision sur l'âge ou une émotion forte). Ne jamais citer de film, de studio ou de personnage connu : c'est la cause de refus la plus fréquente.

**Crédits** : « Illustration générée avec ChatGPT, d'après une photo de <auteur> (Wikimedia Commons, <licence>) ». Une image faite d'après une photo CC BY ou CC BY-SA en est une œuvre dérivée : elle garde le nom du photographe, et sous CC BY-SA elle reste sous CC BY-SA (voir `img/credits.md`). Je m'en occupe à l'intégration.

## Limite de 2 fichiers (ChatGPT)

ChatGPT ne prend que 2 fichiers par conversation. Pour les scènes qui demandent plusieurs planches (08, 09, 11, 12), une fois la planche des nouveaux rôles validée, je fabrique `docs/illustrations/planche-tous.jpg` (les trois planches empilées en un seul fichier). Il suffit alors de joindre cette planche + la photo de référence.

## Les personnages

| | Personnage | Description à garder |
|---|---|---|
| 🦊 | Le renard (toi, « Gab ») | renard roux, 15 ans, garçon ; sweat à capuche bleu roi, sac à dos aux bretelles jaunes, jean bleu marine, baskets blanches |
| 🐰 | Andrea | hase (un vrai lièvre, pas une lapine), 16 ans ; pelage gris-brun moucheté, fine bande claire du front au museau, très longues oreilles dressées à pointe noire, longues pattes fines ; T-shirt vert menthe, sacoche jaune en bandoulière, short en jean, baskets rouges |
| 🐻 | Maťo | ours brun, 14 ans, très grand et massif, doux ; chemise à carreaux vert et brun ouverte sur un T-shirt gris, short cargo |
| 🐹 | Katka | marmotte des Alpes, 13 ans, petite (à l'épaule du renard) ; pelage gris-brun, petites oreilles rondes, incisives visibles, queue courte et touffue ; sweat violet, écouteurs autour du cou, téléphone souvent à la main, ou posé près d'elle (sur la table, sur le banc) |
| 🐑 | Babka Zuzana | brebis âgée, laine blanche, petites lunettes rondes ; costume traditionnel : foulard rouge à fleurs, gilet noir brodé, chemise blanche brodée, tablier blanc, jupe rouge |
| 🦡 | Marek | blaireau adulte ; gilet de travail bleu marine avec un badge, chemise claire |
| 🐿️ | Ján | écureuil roux, ado, très vif, parle avec les mains ; T-shirt orange, casquette bleue à l'envers |
| 🦅 | Pán Orol | aigle royal, garde du parc ; chapeau de garde forestier, gilet vert kaki avec un insigne en forme de sapin |
| 🦦 | Doktorka Vydrová | loutre d'Europe adulte, hydrologue ; pelage brun lisse, gorge crème, petites oreilles rondes, moustaches ; bob kaki, veste imperméable vert olive à poches, bottes de caoutchouc jaunes, règle graduée pour mesurer l'eau |
| 🕴️ | Le porte-parole (« le monsieur au sourire ») | humain adulte, même style simple que les autres humains ; costume gris anthracite, chemise blanche, cravate fine vert émeraude, cheveux bien coiffés avec une raie, grand sourire permanent, porte-documents en cuir ; une voiture noire |
| 📘 | Le carnet | petit carnet bleu, couverture souple imperméable, élastique, crayon glissé dedans ; des feuilles arrachées dépassent parfois |
| 🧑 | Les humains | adultes ordinaires, même style 2D, désignés par leur fonction (jardinier, chef de chantier, mineur, journaliste…) |

Le renard n'a pas de prénom écrit dans les prompts : dans le cours, c'est « toi ».

---

## Planche des héros

**À joindre** : `fox-reference.png`, puis `andrea-reference.png`.

```
Character model sheet for a friendly animated film, on a plain light background. Four teenage animal characters standing side by side at the same scale, each shown front view and three-quarter view, full body, with a few facial expressions (smiling, surprised, annoyed). They are a group of friends on a road trip across Slovakia.

1. A 15-year-old red fox boy (bright orange fur, black ear tips, white muzzle and chest, white tail tip, curious lively eyes), wearing a royal-blue hoodie, a backpack with yellow straps, navy jeans and white sneakers. Use the first attached image as the design reference, drawn in the style below.
2. Andrea, a 16-year-old hare girl — a real hare, not a rabbit (speckled grey-brown fur, a thin light blaze from forehead to muzzle, very long upright ears with pink insides and black tips, long slender hind legs, a slightly angular face, calm and slightly ironic look), wearing a mint-green T-shirt, a yellow cross-body bag, denim shorts and red sneakers. Use the second attached image as the design reference, drawn in the style below.
3. Maťo, a 14-year-old brown bear boy, much taller and broader than the others, gentle and calm, wearing an open green-and-brown checked shirt over a grey T-shirt and cargo shorts.
4. Katka, a 13-year-old alpine marmot girl, small and quick (small round ears close to the head, grey-brown fur, visible front teeth, a short bushy tail), with a direct, unimpressed look, wearing a purple hoodie with earbuds around her neck, always holding a smartphone.

Height: the hare's ears aside, the fox and the hare are about the same height; Maťo is a head taller than them; Katka reaches the fox's shoulder.

Style: Classic 2D hand-drawn animated-film style (not 3D, not pixel art): clean ink outlines, flat colours with soft cel shading, expressive faces. Warm, natural light. Anthropomorphic animals walk upright, wear clothes and live among ordinary humans, who are drawn in the same 2D style and find this normal. No text, no letters, no speech bubbles, no logos, no watermark.
```

Correction utilisée dans la même conversation (la première version faisait d'Andrea une lapine trop proche d'un personnage de film connu, et de Katka un castor) :

```
Great, keep everything but make these changes: Andrea is a hare, not a rabbit — longer ears with black tips, longer hind legs, slightly speckled grey-brown fur on the back, a more angular face, so she looks less like a cartoon rabbit. Katka is an alpine marmot — small round ears close to the head, grey-brown fur, a short bushy tail, visible front teeth — and smaller: she reaches the fox's shoulder.
```

## Planche des seconds rôles

**À joindre** : rien.

```
Character model sheet for a friendly animated film, on a plain light background. Four animal characters standing side by side, each shown front view and three-quarter view, full body:

1. Babka Zuzana, an elderly ewe (white wool, kind wrinkled eyes, small round glasses), wearing a flowered headscarf, an apron and a traditional embroidered Slovak waistcoat.
2. Marek, an adult European badger (black and white striped face, grey body), wearing a navy-blue work vest with a plain badge, over a light shirt. Calm, a little tired, honest.
3. Ján, a teenage red squirrel (rust-red fur, big bushy tail, ear tufts), wearing an orange T-shirt and a backwards cap, very lively, talking with his hands.
4. Pán Orol, a golden eagle park ranger (dark brown feathers, golden neck), wearing a ranger hat and a small ranger badge, stern but kind.

Style: Classic 2D hand-drawn animated-film style (not 3D, not pixel art): clean ink outlines, flat colours with soft cel shading, expressive faces. No text, no letters, no logos, no watermark.
```

## Planche des nouveaux rôles

**À joindre** : la planche des seconds rôles (pour le style seulement).

```
Character model sheet for a friendly animated film, on a plain light background, in exactly the same drawing style as the attached model sheet. Two new characters and one prop, each shown front view and three-quarter view, full body:

1. Doktorka Vydrová, an adult Eurasian otter, a field hydrologist (sleek brown fur, cream throat and cheeks, small round ears, long whiskers, bright clever eyes, energetic and a little scatterbrained), wearing a khaki bucket hat, an olive-green waterproof field jacket with many pockets, and yellow rubber boots. A short graduated measuring rod (about the length of her forearm) is clipped to her belt, and her hands are free (one on her hip, one waving or holding a pencil).
2. A human spokesman in his forties, drawn in the same simple cartoon style as the animals (simplified shapes, flat colours, few details on the face, no realistic face): a thin, polished face with a small nose, calm half-lidded eyes, slicked-back neat hair with a side parting, a charcoal-grey suit, a white shirt and a thin emerald-green tie, a wide, fixed, perfectly symmetrical smile that stays on his face but does not reach his eyes, holding a brown leather document folder. Polite, smooth and a little empty, never goofy and never scary.
3. A prop: a small blue notebook with a soft waterproof cover, an elastic band and a pencil tucked in, shown closed and open (pages with hand-drawn water-level charts and small sketches, no readable text).

Size: the otter is a little shorter than the fox in the attached sheet; the spokesman is an adult human, taller than all the animals except the bear.

Style: Classic 2D hand-drawn animated-film style (not 3D, not pixel art): clean ink outlines, flat colours with soft cel shading, expressive faces. No text, no letters, no logos, no watermark.
```

---

## À faire plus tard : passe « décors moins photo »

Avec une photo de référence, ChatGPT dessine les décors et les objets rigides (voitures, engins, grillages, serveurs) trop réalistes par rapport aux personnages. Retouche qui a marché (scène 09) : « redessiner le fond, la voiture et les machines dans le même style dessin animé que les personnages : contours à l'encre, aplats, formes simplifiées, beaucoup moins de détails, pas de reflets ni de textures photo ». Eric prévoit une passe sur toutes les images (scènes déjà intégrées comprises) ; dans les prompts à venir (10 à 13), ajouter cette phrase à la ligne « Style ».

## Couverture — l'image d'intro

Pour `md/00_Introduction_01_bienvenue.md` → `img/illus_00_couverture.jpg`

**À joindre** : la planche des héros.

```
Use the attached model sheet for the characters (keep them exactly as designed).

Scene: Opening image of an animated road movie across Slovakia, wide landscape format. The four friends walk side by side along a country road on a summer morning, seen from the front, slightly from below: the fox in the middle looking around with excitement, Andrea next to him holding a folded paper map, Maťo carrying a big backpack, Katka slightly ahead, looking at her phone. Behind them on the right, far away, the jagged peaks of the High Tatras; on the left, on the horizon, a white square castle with four corner towers and red roofs on a hill above a wide river (Bratislava Castle above the Danube). Between them: fields, forests, a village with a church spire, a small train crossing a bridge. Leave the upper third of the image fairly calm (sky with a few clouds), as a title may be added later.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

---

## 01 Košice — Dans le tram

Fiche `10_Series_01_Kosice_05_v-elektricke.md` → `img/illus_01_kosice.jpg`

**Photo de référence** : [la rue Hlavná et le tram](https://commons.wikimedia.org/wiki/File:Ko%C5%A1ice_-_Hlavn%C3%A1_(Main_street)_-_Historic_Ringhoffer_tram,_green_livery_and_Zlat%C3%BD_ba%C5%BEant_sponsor_livery,_at_the_Lower_Gate,_Old_Town,_Ko%C5%A1ice_(June_2006)_01.jpg) (ZemplinTemplar, CC BY-SA 4.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the street and buildings.

Scene: Inside a modern city tram in Košice, Slovakia, on a sunny morning, wide landscape format. The fox and Andrea stand in the aisle holding the handrail. The fox is talking enthusiastically, gesturing with his free hand; Andrea listens with an amused, slightly ironic smile, one eyebrow raised. Through the large tram windows: the pastel-coloured historic buildings of the main street and, ahead, the tall Gothic cathedral with its dark roof. A few ordinary human passengers sit around them, reading or looking out, not surprised at all.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 02 Sucho — La fontaine qui ne chante plus

Fiche `10_Series_02_Sucho_05_fontana.md` → `img/illus_02_sucho.jpg`

**Photo de référence** : [la Fontaine chantante de Košice](https://commons.wikimedia.org/wiki/File:Spievaj%C3%BAca_font%C3%A1na,_Ko%C5%A1ice,_2026_(5).jpg) (Antimuonium, CC BY-SA 4.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the fountain and the square.

Scene: The large fountain in the main street of Košice, completely dry under a hot white summer sky, wide landscape format. The fox and Andrea, thirsty and tired, stand at the edge of the empty basin. Next to them, a middle-aged human city gardener in green work clothes leans on a rake and explains something with a resigned shrug. The flower beds around are yellowed, people in the background walk in the shade of the buildings. Heat haze, harsh light.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 03 Raj — Au bout de la gorge

Fiche `10_Series_03_Raj_05_roklina.md` → `img/illus_03_raj.jpg`

**À joindre en plus** : la planche des seconds rôles (Pán Orol).
**Photo de référence** : [la gorge de Suchá Belá](https://commons.wikimedia.org/wiki/File:Slovensky_raj,_Sucha_Bela,_03.jpg) (dariusz wozniak, CC BY-SA 3.0)

```
Use the attached model sheets for the characters (keep them exactly as designed). Use the attached photo as the reference for the gorge.

Scene: The end of a narrow rocky gorge in the Slovak Paradise national park, wide landscape format. Wooden ladders and log steps behind them, a thin stream running between mossy rocks. The fox, exhausted, is sitting on the last step, clinging to it with relief; Andrea stands next to him, perfectly fine. On a big rock above them, a golden eagle park ranger with a ranger hat looks down at them, stern but curious. Green forest light filtering from above.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 04 Burka — L'orage au refuge

Fiche `10_Series_04_Burka_05_spis.md` → `img/illus_04_burka.jpg`

**Photo de référence** : [le refuge Téryho chata](https://commons.wikimedia.org/wiki/File:Teryho_chata_I.jpg) (Kristo, CC BY-SA 3.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the mountain hut.

Scene: Night, inside the dark wooden kitchen of a mountain hut high in the Tatras, during a thunderstorm, wide landscape format. The fox and Andrea lie on mattresses on the floor under thick blankets, side by side but a little apart, both wide awake, looking at the ceiling and talking quietly. Through the small window, a flash of lightning lights up the rocky peaks and the rain; the light makes long blue shadows in the room. Wooden walls, a stove, mugs on a shelf. Calm, cosy, a bit of tension in the air.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 05 Domov — Babka raconte ✅ faite le 8 novembre (ChatGPT, avec les deux planches, sans photo)

Fiche `10_Series_05_Domov_05_ked-som-bol-maly.md` → `img/illus_05_domov.jpg`

**À joindre en plus** : la planche des seconds rôles (Babka Zuzana).
**Photo de référence** : [intérieur d'une maison d'Orava](https://commons.wikimedia.org/wiki/File:Museum_of_Orava_village_01.jpg) (10ricardo, CC BY-SA 4.0)

```
Use the attached model sheets for the characters (keep them exactly as designed). Use the attached photo as the reference for the room.

Scene: Evening in an old wooden village house below the Tatras, wide landscape format. Everyone sits around a wooden table after dinner, with empty plates and a teapot. Babka Zuzana, the old ewe, tells a story with her hands, eyes shining; the fox and Andrea listen, Maťo rests his big chin on his paws, smiling. Katka sits at the end of the bench, looking at her phone, but one ear turned towards the story. Through the small window, the sky is turning dark blue. Warm lamp light, embroidered tablecloth, painted wooden chest.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 06 Povodeň — Le sauvetage ✅ faite le 8 novembre (ChatGPT, planche des héros, sans photo)

> **À revoir à la fin (retouche éventuelle)** : hormis Andrea et Katka, les personnages sourient trop pour la situation (inondation). Demander des visages concentrés et inquiets mais déterminés.

Fiche `10_Series_06_Povoden_05_zachrana.md` → `img/illus_06_povoden.jpg`

**Photo de référence** : [maison inondée](https://commons.wikimedia.org/wiki/File:House_flooded_in_village_Herwad.jpg) (वर्षा देशपांडे, CC BY-SA 4.0) : seulement pour l'eau dans les rues, le village doit rester slovaque.

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo only as a reference for the flood water; the village itself is a Slovak mountain village.

Scene: A flooded street in a small Slovak village in the Liptov valley, in heavy rain, wide landscape format. Brown water up to the knees, houses with steep roofs and wooden fences, mountains hidden by grey clouds. The friends wade from house to house: Maťo carries two big wicker baskets full of small animals (ducklings, a hedgehog, rabbits); the fox helps an old duck with two ducklings out of a doorway; Andrea points to the school on higher ground; Katka holds her phone high above her head to keep it dry. In the background, a small mouse stubbornly carries a fridge on its back. Determined, a little funny, never scary.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 07 Cesta — La route neuve ✅ faite le 9 novembre (ChatGPT, planche des héros + photo, visage de Maťo et sac à dos retouchés)

Fiche `10_Series_07_Cesta_05_nova-cesta.md` → `img/illus_07_cesta.jpg`

**Photo de référence** : [route à travers la forêt](https://commons.wikimedia.org/wiki/File:Road_through_the_New_Forest,_Hale_Purlieu_-_geograph.org.uk_-_5830085.jpg) (David Howard, CC BY-SA 2.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as a loose reference for the road through the forest.

Scene: A brand-new black asphalt road cut through a hilly spruce forest in central Slovakia, on a hot afternoon, wide landscape format. Freshly cut tree stumps on both sides, a parked yellow excavator further away. A human construction foreman in a yellow helmet and orange vest walks ahead. The four friends follow him and argue: Katka happily walks on the smooth asphalt; Maťo, sad, looks back at the forest; Andrea gestures as if to say "both are true"; the fox, in the middle, scratches his head, undecided.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 08 Datacentrum — Cachés derrière les serveurs ✅ faite le 10 novembre (ChatGPT, planche-tous + photo ; porte-parole retouché pour un sourire fermé)

Fiche `10_Series_08_Datacentrum_05_aj-ked.md` → `img/illus_08_datacentrum.jpg`

**À joindre en plus** : la planche des seconds rôles (Marek) et la planche des nouveaux rôles (le porte-parole).
**Photo de référence** : [salle de serveurs](https://commons.wikimedia.org/wiki/File:Server_Room_(22397102849).jpg) (Carl Lender, CC BY 2.0)

```
Use the attached model sheets for the characters (keep them exactly as designed). Use the attached photo as the reference for the server room.

Scene: Inside a huge, cold data centre hall, wide landscape format. Long rows of black server cabinets with thousands of tiny blinking blue and green lights; cold white light from the ceiling, cables above. In the central aisle, on the right, the smiling spokesman in his grey suit and green tie walks in with a human director in a white shirt, both talking, not noticing anything. On the left, the four friends hide behind the end of a row of cabinets: the fox clutches his backpack, Andrea listens with narrowed eyes, Katka covers her own mouth, and Maťo, far too big, sticks out on both sides of the cabinet. Marek, the badger in his navy work vest, stands calmly in the aisle in front of them, hands in his pockets, as if nothing were going on. Funny, tense, a little unreal.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 09 Baňa — À la grille de la mine ✅ faite le 10 novembre (ChatGPT, planche-tous + photo ; 2 retouches : voiture visible et regards inquiets, puis décor/voiture/engins redessinés en dessin animé)

Fiche `10_Series_09_Bana_05_keby.md` → `img/illus_09_bana.jpg`

**À joindre en plus** : la planche des seconds rôles (Ján). La voiture noire est celle du porte-parole (pas besoin de sa planche, il n'est pas dans l'image).
**Photo de référence** : [Banská Štiavnica](https://commons.wikimedia.org/wiki/File:Bansk%C3%A1_%C5%A0tiavnica_panor%C3%A1ma_2015.jpg) (Mineralysk, CC0) : pour les collines et la ville au loin.

```
Use the attached model sheets for the characters (keep them exactly as designed). Use the attached photo as the reference for the hills and the old town in the distance.

Scene: The gate of a new mine on a forested hill above the old mining town of Banská Štiavnica, late afternoon, wide landscape format. Behind a tall wire gate: bulldozers, a cleared slope, a few spruces still standing. At the gate, a middle-aged human miner in an orange vest and helmet sits on a folding chair with a thermos, friendly. Ján, the red squirrel, talks to him very fast with both hands; the fox, Andrea, Maťo and Katka stand a little behind, listening. Parked near the gate, a shiny black car with its side window half open; Ján glances at it out of the corner of his eye. Far below in the valley: the old town with its church towers and red roofs. Mixed feelings: nobody is a villain.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 10 Rozhodnutie — Près du feu ✅ faite le 10 novembre (ChatGPT, planche des héros + photo ; retouche : Andrea pensive, bouche fermée)

Fiche `10_Series_10_Rozhodnutie_05_razen.md` → `img/illus_10_rozhodnutie.jpg`

**Photo de référence** : [feu de camp la nuit](https://commons.wikimedia.org/wiki/File:Campfire_flames_at_night.jpg) (Marc-Lautenbacher, CC BY-SA 4.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the fire.

Scene: Night in a meadow in the Slovak hills, wide landscape format. A small campfire crackles. Andrea sits on a log, knees pulled up, looking into the flames, thoughtful and a little sad. The fox sits next to her, quiet, listening, careful not to interrupt. Two old friends, a respectful distance between them. Far away at the edge of the forest, the silhouettes of Maťo and Katka gathering firewood. Starry sky, warm orange light on their faces, deep blue shadows around.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 11 Bratislava — Devant la télévision ✅ faite le 10 novembre (ChatGPT, planche-tous + photo, du premier coup)

Fiche `10_Series_11_Bratislava_05_redaktorka.md` → `img/illus_11_bratislava.jpg`

**À joindre en plus** : la planche des nouveaux rôles (le porte-parole). Le carnet reste dans le sac à dos du renard jusqu'à la fin de la fiche.

**Photo de référence** : [le bâtiment de la radio-télévision slovaque](https://commons.wikimedia.org/wiki/File:Radio_and_Television_Slovakia_(Rozhlas_a_telev%C3%ADzia_Slovenska),_Bratislava.JPG) (Kiwiev, CC0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the building (an inverted pyramid of brown steel and glass), but without any sign or lettering.

Scene: In front of a striking inverted-pyramid building in Bratislava, a sunny late morning, wide landscape format. A young human journalist with a laptop under her arm has just come out of the glass door; she has stopped and looks at the four animals with sudden interest, as if she has an idea. The four friends, dusty and tired from the journey, look back at her: the fox hopeful, one paw on the strap of his backpack as if something precious were inside, Andrea cautious, Maťo surprised, Katka holding up her phone. A small guard booth on the side with a bored guard; behind it, the smiling spokesman in his grey suit walks in through the barrier, waving at them politely.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 12 Hrad — En direct ✅ faite le 10 novembre (ChatGPT, planche-tous + photo ; 2 retouches : recomposition en arc de cercle sur canapé, puis porte-parole crispé et dents de Katka corrigées ; son expression est un peu forte, à reprendre peut-être)

Fiche `10_Series_12_Hrad_05_priamy-prenos.md` → `img/illus_12_hrad.jpg`

**À joindre en plus** : la planche des nouveaux rôles (la loutre, le porte-parole, le carnet).

**Photo de référence** : [le château de Bratislava](https://commons.wikimedia.org/wiki/File:Bratislava_Castle,_20210727_1004_0250.jpg) (Jakub Hałun, CC BY-SA 4.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the castle.

Scene: A live TV news studio inside Bratislava Castle at dusk, wide landscape format. Behind the guests, a large arched window shows the white castle walls with red roofs, the Danube below and the city lights coming on. A professional TV camera with a small red light on, two lights on stands, cables on the floor. A human news presenter sits on the left with a microphone. In the middle, the four friends sit on chairs: Maťo on a chair clearly too small for him, Katka sitting very straight, the fox nervous but brave, speaking, Andrea calm, looking straight at the camera. Next to them sits the otter hydrologist, holding up her open blue notebook with a hand-drawn water chart. On the far right, the spokesman in his grey suit and green tie is still smiling, but his smile is starting to crack. Serious and touching moment, warm evening light.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no channel logo, no watermark.
```

## 13 Sen — Sous le pommier ✅ faite le 10 novembre (ChatGPT, planche des héros + photo ; retouche des expressions)

Fiche `10_Series_13_Sen_05_dobry-sen.md` → `img/illus_13_sen.jpg`

**Photo de référence** : [pommes vertes sur l'arbre](https://commons.wikimedia.org/wiki/File:2018-07-16_Green_apples_on_tree.jpg) (Maksym Kozlenko, CC BY-SA 4.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the apple tree.

Scene: Early morning in a small garden at the edge of Košice, wide landscape format. The fox sits in the grass under an apple tree full of small green apples, still a little sleepy, telling a long story with big gestures. Andrea sits facing him, holding a nearly empty water bottle, listening; her smile is slowly fading, as if some details of his "dream" were strangely true. Dry yellow grass, soft golden morning light, a few apartment blocks far behind the garden fence.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

---

---


## Fiches 06 — une illustration pour la suite de l'épisode

Décision d'Eric (10 novembre) : chaque fiche 06 (« extra » : suite de l'épisode) reçoit aussi une illustration, pour rester cohérent avec les fiches 05. Les fiches 06 utilisent aujourd'hui une photo Wikimedia d'ambiance (ou un `TODO_img` pour Povodeň) : elle sera remplacée par l'illustration, et la photo n'a plus besoin d'être créditée dans cette fiche.

**Pour chaque scène** : nouvelle conversation ChatGPT, joindre la planche indiquée (**aucune photo de référence**, pour éviter le rendu trop réaliste), coller le prompt, puis intégrer : `img/illus_NN_x_2.jpg` en tête de la fiche 06 (`@ img/… | légende. Source : illustration générée avec ChatGPT`), une ligne dans `img/credits.md`, ✅ ici.

| Fiche 06 | Moment | Image | Planche à joindre |
|---|---|---|---|
| `10_Series_01_Kosice_06_extra.md` (Dobrú noc) | voir ci-dessous | `img/illus_01_kosice_2.jpg` | la planche des héros (`planche-heros.jpg`) |
| `10_Series_02_Sucho_06_extra.md` (Na stanici) | voir ci-dessous | `img/illus_02_sucho_2.jpg` | la planche des héros (`planche-heros.jpg`) |
| `10_Series_03_Raj_06_extra.md` (Pri potoku) | voir ci-dessous | `img/illus_03_raj_2.jpg` | la planche des héros (`planche-heros.jpg`) |
| `10_Series_04_Burka_06_extra.md` (Ráno po búrke) | voir ci-dessous | `img/illus_04_burka_2.jpg` | la planche-tous (`planche-tous.jpg`), pour le carnet bleu |
| `10_Series_05_Domov_06_extra.md` (Pred domom) | voir ci-dessous | `img/illus_05_domov_2.jpg` | la planche-tous (`planche-tous.jpg`), pour Babka Zuzana |
| `10_Series_06_Povoden_06_extra.md` (V telocvični) | voir ci-dessous | `img/illus_06_povoden_2.jpg` | la planche-tous (`planche-tous.jpg`) |
| `10_Series_07_Cesta_06_extra.md` (V kamióne) | voir ci-dessous | `img/illus_07_cesta_2.jpg` | la planche des héros (`planche-heros.jpg`) |
| `10_Series_08_Datacentrum_06_extra.md` (Rada od Mareka) | voir ci-dessous | `img/illus_08_datacentrum_2.jpg` | la planche-tous (`planche-tous.jpg`), pour Marek |
| `10_Series_09_Bana_06_extra.md` (Pri tajchu) | voir ci-dessous | `img/illus_09_bana_2.jpg` | la planche-tous (`planche-tous.jpg`), pour Ján |
| `10_Series_10_Rozhodnutie_06_extra.md` (My sme tam boli) | voir ci-dessous | `img/illus_10_rozhodnutie_2.jpg` | la planche-tous (`planche-tous.jpg`), pour le carnet bleu |
| `10_Series_11_Bratislava_06_extra.md` (Pred hradom) | voir ci-dessous | `img/illus_11_bratislava_2.jpg` | la planche des héros (`planche-heros.jpg`) |
| `10_Series_12_Hrad_06_extra.md` (Potom uvidíme) | voir ci-dessous | `img/illus_12_hrad_2.jpg` | la planche des héros (`planche-heros.jpg`) |
| `10_Series_13_Sen_06_extra.md` (Teraz si tu) | voir ci-dessous | `img/illus_13_sen_2.jpg` | la planche des héros (`planche-heros.jpg`) |

### 01 Košice (extra) — Dobrú noc ✅ (tante = deux oreilles à la fenêtre)

Fiche `10_Series_01_Kosice_06_extra.md` → `img/illus_01_kosice_2.jpg`

**À joindre** : la planche des héros (`planche-heros.jpg`).

```
Use the attached model sheet (the heroes' sheet) for the characters (keep them exactly as designed).

Scene: Evening in the garden of a house at the edge of Košice, wide landscape format, golden light turning to dusk and the first stars. The fox lies on his back in the grass under a big apple tree, hands behind his head, looking up at the stars with a happy, tired smile. A few steps away Andrea walks toward the house door, a hand on the handle, and looks back over her shoulder at him with a small warm smile. In an upstairs window, the dark silhouette of a tall, strong adult hare (her aunt) behind a curtain, lit from behind. A small garden shed, a clothesline with a blanket, a lamp post. Quiet, tender, a little funny.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 02 Sucho (extra) — Na stanici ✅

Fiche `10_Series_02_Sucho_06_extra.md` → `img/illus_02_sucho_2.jpg`

**À joindre** : la planche des héros (`planche-heros.jpg`).

```
Use the attached model sheet (the heroes' sheet) for the characters (keep them exactly as designed).

Scene: The main railway station of Košice on a very hot day, wide landscape format: crowded platform, very little shade, hazy white sky. In the foreground, Andrea writes a quick note on a sheet of paper against a pillar with a pen, in a hurry. Next to her the fox proudly holds up a small ticket, beaming, as if he had won a prize; Andrea gives him a flat, amused look without stopping to write. In the background a human woman (adult) at a ticket window, a departures board, tired travellers fanning themselves, and a train waiting on the platform.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 03 Raj (extra) — Pri potoku ✅

Fiche `10_Series_03_Raj_06_extra.md` → `img/illus_03_raj_2.jpg`

**À joindre** : la planche des héros (`planche-heros.jpg`).

```
Use the attached model sheet (the heroes' sheet) for the characters (keep them exactly as designed).

Scene: Evening beside a small stream in a forest of the Slovak Paradise, wide landscape format, deep blue dusk with the first stars showing between the treetops. The fox lies on his back on the grass looking at the sky, half asleep, a little smile on his face. Andrea sits a bit apart beside him, knees pulled up, her back half-turned to him, looking at the water, a small mysterious smile. A thin stream with mossy stones, ferns, a faint orange glow from a small campfire off to one side. Quiet and tender; they are close but each in their own thoughts.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 04 Burka (extra) — Ráno po búrke ✅ (carnet vu de dos)

Fiche `10_Series_04_Burka_06_extra.md` → `img/illus_04_burka_2.jpg`

**À joindre** : la planche-tous (`planche-tous.jpg`), pour le carnet bleu.

```
Use the attached combined model sheet (heroes on top, supporting characters in the middle, new characters and the blue notebook at the bottom) for the characters (keep them exactly as designed).

Scene: The morning after a thunderstorm at a mountain lake in the Tatras, wide landscape format: clear washed sky, the jagged peaks lit pink-gold, the lake so full that it has flooded the meadow, mist rising. The fox stands on a path holding the small open blue notebook (as on the model sheet) and points at a small hand-drawn map on its page (a stream, a bridge, a shop and a meadow), excited. Andrea stands next to him with her arms crossed, looking at the too-full water, serious and a little sad, but she glances at the map with a hint of recognition. Wet rocks, puddles shining.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 05 Domov (extra) — Pred domom ✅

Fiche `10_Series_05_Domov_06_extra.md` → `img/illus_05_domov_2.jpg`

**À joindre** : la planche-tous (`planche-tous.jpg`), pour Babka Zuzana.

```
Use the attached combined model sheet (heroes on top, supporting characters in the middle, new characters and the blue notebook at the bottom) for the characters (keep them exactly as designed).

Scene: Night in front of Babka Zuzana's wooden mountain house, wide landscape format, warm yellow light from the windows, a sky full of stars. The fox and Andrea sit side by side on a wooden bench in front of the house, a little pensive; Maťo (the big bear) and Katka (the marmot, arms crossed, chin up) stand next to the bench. At an open window, Babka Zuzana, the old sheep in her shawl, leans out and points at them as she gives instructions (the socks!). Flower boxes, a woodpile, a lantern on the wall, hills in the dark behind. Warm, funny and a bit emotional.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 06 Povodeň (extra) — V telocvični ✅ (chamois bénévole à la place de la renarde)

Fiche `10_Series_06_Povoden_06_extra.md` → `img/illus_06_povoden_2.jpg`

**À joindre** : la planche-tous (`planche-tous.jpg`).

```
Use the attached combined model sheet (heroes on top, supporting characters in the middle, new characters and the blue notebook at the bottom) for the characters (keep them exactly as designed).

Scene: A school gym turned into a shelter during a flood, evening, wide landscape format. Dozens of animals of all kinds sit and lie on mattresses and blankets on the floor; in a corner a big pot of soup steams; rain streaks the tall windows. In the foreground the four friends sit together: a young vixen in a green volunteer vest hands the fox a cup of tea from a tray; the fox holds the cup out toward Andrea, who hesitates; Maťo watches Andrea with a worried look; Katka watches the wall. On the wall, a TV shows a small figure of the smiling spokesman in his grey suit and green tie, with his thin fixed smile, very small on the screen. Warm light inside, grey light outside.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 07 Cesta (extra) — V kamióne

Fiche `10_Series_07_Cesta_06_extra.md` → `img/illus_07_cesta_2.jpg`

**À joindre** : la planche des héros (`planche-heros.jpg`).

```
Use the attached model sheet (the heroes' sheet) for the characters (keep them exactly as designed).

Scene: Night inside the cabin of a big truck on a country road, wide landscape format, seen from inside the cabin in front of the dashboard so the faces are visible. A friendly adult human truck driver in a cap holds the wheel with a thermos in the cup holder. The four friends are squeezed on the bench seat next to him: Maťo (the big bear) taking up most of the space, Katka (the marmot) on his knees with her phone, leaning forward and speaking with energy, Andrea next to the window, one eyebrow raised, and the fox with a doubtful look as if he had just heard something crazy. A small glowing radio on the dashboard. Headlights on the dark road ahead, a few stars. Funny and cosy.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 08 Datacentrum (extra) — Rada od Mareka

Fiche `10_Series_08_Datacentrum_06_extra.md` → `img/illus_08_datacentrum_2.jpg`

**À joindre** : la planche-tous (`planche-tous.jpg`), pour Marek.

```
Use the attached combined model sheet (heroes on top, supporting characters in the middle, new characters and the blue notebook at the bottom) for the characters (keep them exactly as designed).

Scene: Evening in front of a big grey data-centre building at the edge of a river, wide landscape format, soft blue light and a cool breeze. Marek, the badger in his navy work vest, sits on a low wall with the four friends, offering them tea from a thermos and sandwiches; he is kind and tired, and holds out a sheet of paper covered with numbers to Andrea. The four friends listen, Maťo with a sandwich, Katka with her phone, the fox thoughtful, Andrea suspicious but touched. Behind them, a calm river with reeds and not a single frog; a few lights come on in the building. Quiet, human, a little sad.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 09 Baňa (extra) — Pri tajchu

Fiche `10_Series_09_Bana_06_extra.md` → `img/illus_09_bana_2.jpg`

**À joindre** : la planche-tous (`planche-tous.jpg`), pour Ján.

```
Use the attached combined model sheet (heroes on top, supporting characters in the middle, new characters and the blue notebook at the bottom) for the characters (keep them exactly as designed).

Scene: Evening by a small lake (a tajch) in the middle of a forest near Banská Štiavnica, wide landscape format, golden light on the water. Ján, the red squirrel, stands in front of the four friends carrying a huge backpack that is bigger than he is, holding out a small piece of paper with both hands, talking at full speed; behind him other squirrels pack bags and tie bundles to branches. The fox, Andrea, Maťo and Katka sit on a log listening, amused: Katka lifts a finger as if she were about to correct him, Andrea has her usual mysterious calm. Reeds, spruces, a wooden jetty, dragonflies.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 10 Rozhodnutie (extra) — My sme tam boli

Fiche `10_Series_10_Rozhodnutie_06_extra.md` → `img/illus_10_rozhodnutie_2.jpg`

**À joindre** : la planche-tous (`planche-tous.jpg`), pour le carnet bleu.

```
Use the attached combined model sheet (heroes on top, supporting characters in the middle, new characters and the blue notebook at the bottom) for the characters (keep them exactly as designed).

Scene: Morning in a meadow in the Slovak hills, wide landscape format, soft morning light, a thin curl of smoke from the remains of a campfire. A blanket is spread on the grass with breakfast on it and, laid side by side like a jigsaw, all the pages of the blue notebook with little drawings and charts (no readable text). Katka, serious like a professor, places the last page; Maťo watches with a piece of bread in his paw; Andrea sits calm with her chin on her knees, looking at the pages; the fox stands a little aside holding a phone to his ear, mid-call, talking fast with one hand in the air, a nervous, pleading smile. Dewy grass, birds.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 11 Bratislava (extra) — Pred hradom

Fiche `10_Series_11_Bratislava_06_extra.md` → `img/illus_11_bratislava_2.jpg`

**À joindre** : la planche des héros (`planche-heros.jpg`).

```
Use the attached model sheet (the heroes' sheet) for the characters (keep them exactly as designed).

Scene: Late afternoon on the big terrace in front of Bratislava Castle, wide landscape format, with the wide Danube and the whole city spread out below in golden light. The four friends stand at the stone railing, seen from slightly behind and the side: the fox looking at the view, Andrea next to him calm, Katka holding up her phone with a sulky face (dead battery), and Maťo, the big bear, taking a crumpled piece of paper out of his pocket and reading from it. Warm sun on their fur, long shadows, the castle walls on the left, a few tourists as small simple silhouettes in the distance (adults only).

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 12 Hrad (extra) — Potom uvidíme ✅

Fiche `10_Series_12_Hrad_06_extra.md` → `img/illus_12_hrad_2.jpg`

**À joindre** : la planche des héros (`planche-heros.jpg`).

```
Use the attached model sheet (the heroes' sheet) for the characters (keep them exactly as designed).

Scene: Night on the terrace of Bratislava Castle, wide landscape format. The fox and Andrea sit side by side on the stone wall, seen from the side and slightly from behind, a little distance between them, looking down at the city lights glittering and at the dark, slow Danube with a bridge lit up. The mood is quiet and tender, a little wistful: Andrea's long ears tilt toward the fox, he looks at her sideways with a small hopeful smile, she keeps looking at the lights with a half smile. A string of warm lights along the wall, a deep blue sky with a few stars, no one else around.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

### 13 Sen (extra) — Teraz si tu

Fiche `10_Series_13_Sen_06_extra.md` → `img/illus_13_sen_2.jpg`

**À joindre** : la planche des héros (`planche-heros.jpg`).

```
Use the attached model sheet (the heroes' sheet) for the characters (keep them exactly as designed).

Scene: Early morning in the garden of a small house at the edge of Košice, wide landscape format, golden light through the leaves of an apple tree. The fox bursts out laughing, head thrown back, sitting in the grass; Andrea stands next to him holding six old, slightly crumpled envelopes in her hand, a warm smile and a raised eyebrow. In an upstairs window behind them, the face of her aunt, a tall strong adult hare, half hidden behind a curtain, leaning out with a suspicious look. Dry yellow grass, small green apples, a garden fence, apartment blocks far away. Warm, funny and touching.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same very simple cartoon style as the animals: simplified rounded shapes, flat colours, small simple eyes, few lines on the face, no realistic or semi-realistic faces. The whole background and every object are hand-drawn in the same cartoon style as the characters: simplified shapes, gentle gradients, no photographic textures or reflections. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```


## Retouches des images déjà faites

À faire dans ChatGPT : joindre l'image existante (`img/illus_…`) + la planche indiquée, coller la demande. Garder le même cadrage.

| Image | Pourquoi | Priorité |
|---|---|---|
| 02 Sucho | Le carnet est trouvé dans cette scène : il doit se voir. | ✅ fait le 10 novembre (ChatGPT, avec la planche des nouveaux rôles) |
| 01 Košice | Les passagers humains ressemblent à des enfants ; le cours n'a que des humains adultes. | ✅ refaite le 10 novembre (planche des héros seule, sans photo ; intérieur du tram simplifié, quatre passagers adultes) |
| 06 Povodeň | Les visages sourient trop pour une inondation (déjà noté). | ✅ fait le 10 novembre (visages concentrés, décor redessiné) |
| 03 Raj | pán Orol leur remet une page du carnet. | facultatif |
| 05 Domov | Babka sort l'enveloppe de la loutre. | facultatif |

**02 Sucho** (joindre `illus_02_sucho.jpg` + la planche des nouveaux rôles) :

```
Keep this image exactly as it is (same framing, characters and style), with one change: the fox now holds a small blue notebook with an elastic band (as in the attached model sheet), open in his paws, and looks at it with surprise; Andrea leans in to look at it too. Optional: far in the background, on the street, a shiny black car is parked.
```

**01 Košice** (joindre `illus_01_kosice.jpg`) :

```
Keep this image exactly as it is (same framing, the fox and the hare unchanged), with one change: the human passengers must clearly be adults (a man in his forties reading, an older woman, a middle-aged man looking out of the window), drawn in the same simple cartoon style, no children.
```

**06 Povodeň** (joindre `illus_06_povoden.jpg` + la planche des héros) :

```
Keep this image exactly as it is (same framing, characters, poses and style), with one change: the faces of the fox and the bear are no longer smiling widely: they look focused, a little worried but determined, as people helping during a flood. The ducks and the mouse can stay a bit comical.
```

**03 Raj** (facultatif, joindre `illus_03_raj.jpg`) :

```
Keep this image exactly as it is, with one change: the eagle ranger holds out a single folded page of paper in his talons towards the hare.
```

**05 Domov** (facultatif, joindre `illus_05_domov.jpg`) :

```
Keep this image exactly as it is, with one change: a white paper envelope lies on the tablecloth in front of the old ewe, next to the teapot.
```
