# Illustrations IA de Zajko Friends — prompts ChatGPT

Une illustration par série, pour la **fiche 05** (le moment fort de l'épisode), plus une **couverture** pour l'introduction. Les autres fiches gardent leur photo Wikimedia Commons. Même méthode que pour les illustrations Gemini du cours adulte (`Slovingo-sk-fr`, `docs/Prompts-illustrations.md`), adaptée à ChatGPT.

**Style** : dessin animé 2D classique (pas de 3D), personnages animaux, décors peints réalistes pour que les lieux soient reconnaissables. Même famille de style que le cours adulte, mais les héros sont des ados.

## Méthode

1. **Planche de personnages** : dans ChatGPT, joindre `esp32/zajko-quest/art/characters/fox-reference.png` puis `esp32/zajko-quest/art/characters/andrea-reference.png`, coller le prompt « Planche des héros ». ✅ Faite le 31 octobre : `docs/illustrations/planche-heros.jpg` (prompt ci-dessous, puis la correction « Andrea en vraie hase, Katka en marmotte »). Puis la même chose avec le prompt « Planche des seconds rôles » (sans image jointe). ✅ Faite le 31 octobre : `docs/illustrations/planche-seconds-roles.jpg`.
2. **Chaque scène** : nouvelle conversation, joindre **la planche des héros** (et celle des seconds rôles si la scène en contient un) + **la photo de référence** du lieu (lien Commons donné : télécharger l'image depuis la page), coller le prompt de la scène. Chaque prompt est complet : rien d'autre à ajouter.
3. Si un personnage dérive (couleurs, vêtements, taille), le redemander dans la même conversation : « Keep the characters exactly as in the attached model sheet. »
4. **Format** : demander le paysage (déjà écrit dans chaque prompt). ChatGPT sort du 3:2 (1536×1024) ; je recadre si besoin. Déposer l'image dans `img/illus_<NN>_<lieu>.jpg` (le nom est donné pour chaque scène). Je l'intègre ensuite dans la fiche 05, avec le crédit.
5. **Les défauts à surveiller** (vus sur la scène 01) : un objet qui ne tient à rien (une barre qui s'arrête dans le vide), des humains plus réalistes que les animaux, des yeux réduits à de gros points noirs. Pour les deux premiers, demander la correction dans la même conversation. Les yeux, je peux les retoucher moi-même (petit reflet blanc).
6. **Si ChatGPT refuse** : ne pas insister avec le même texte. Nouvelle conversation, et enlever la phrase qui coince (en général une précision sur l'âge ou une émotion forte). Ne jamais citer de film, de studio ou de personnage connu : c'est la cause de refus la plus fréquente.

**Crédits** : « Illustration générée avec ChatGPT, d'après une photo de <auteur> (Wikimedia Commons, <licence>) ». Une image faite d'après une photo CC BY ou CC BY-SA en est une œuvre dérivée : elle garde le nom du photographe, et sous CC BY-SA elle reste sous CC BY-SA (voir `img/credits.md`). Je m'en occupe à l'intégration.

## Les personnages

| | Personnage | Description à garder |
|---|---|---|
| 🦊 | Le renard (toi, « Gab ») | renard roux, 15 ans, garçon ; sweat à capuche bleu roi, sac à dos aux bretelles jaunes, jean bleu marine, baskets blanches |
| 🐰 | Andrea | hase (un vrai lièvre, pas une lapine), 16 ans ; pelage gris-brun moucheté, fine bande claire du front au museau, très longues oreilles dressées à pointe noire, longues pattes fines ; T-shirt vert menthe, sacoche jaune en bandoulière, short en jean, baskets rouges |
| 🐻 | Maťo | ours brun, 14 ans, très grand et massif, doux ; chemise à carreaux vert et brun ouverte sur un T-shirt gris, short cargo |
| 🐹 | Katka | marmotte des Alpes, 13 ans, petite (à l'épaule du renard) ; pelage gris-brun, petites oreilles rondes, incisives visibles, queue courte et touffue ; sweat violet, écouteurs autour du cou, téléphone toujours à la main |
| 🐑 | Babka Zuzana | brebis âgée, laine blanche, petites lunettes rondes ; costume traditionnel : foulard rouge à fleurs, gilet noir brodé, chemise blanche brodée, tablier blanc, jupe rouge |
| 🦡 | Marek | blaireau adulte ; gilet de travail bleu marine avec un badge, chemise claire |
| 🐿️ | Ján | écureuil roux, ado, très vif, parle avec les mains ; T-shirt orange, casquette bleue à l'envers |
| 🦅 | Pán Orol | aigle royal, garde du parc ; chapeau de garde forestier, gilet vert kaki avec un insigne en forme de sapin |
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

---

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

## 05 Domov — Babka raconte

Fiche `10_Series_05_Domov_05_ked-som-bol-maly.md` → `img/illus_05_domov.jpg`

**À joindre en plus** : la planche des seconds rôles (Babka Zuzana).
**Photo de référence** : [intérieur d'une maison d'Orava](https://commons.wikimedia.org/wiki/File:Museum_of_Orava_village_01.jpg) (10ricardo, CC BY-SA 4.0)

```
Use the attached model sheets for the characters (keep them exactly as designed). Use the attached photo as the reference for the room.

Scene: Evening in an old wooden village house below the Tatras, wide landscape format. Everyone sits around a wooden table after dinner, with empty plates and a teapot. Babka Zuzana, the old ewe, tells a story with her hands, eyes shining; the fox and Andrea listen, Maťo rests his big chin on his paws, smiling. Katka sits at the end of the bench, looking at her phone, but one ear turned towards the story. Through the small window, the sky is turning dark blue. Warm lamp light, embroidered tablecloth, painted wooden chest.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 06 Povodeň — Le sauvetage

Fiche `10_Series_06_Povoden_05_zachrana.md` → `img/illus_06_povoden.jpg`

**Photo de référence** : [maison inondée](https://commons.wikimedia.org/wiki/File:House_flooded_in_village_Herwad.jpg) (वर्षा देशपांडे, CC BY-SA 4.0) : seulement pour l'eau dans les rues, le village doit rester slovaque.

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo only as a reference for the flood water; the village itself is a Slovak mountain village.

Scene: A flooded street in a small Slovak village in the Liptov valley, in heavy rain, wide landscape format. Brown water up to the knees, houses with steep roofs and wooden fences, mountains hidden by grey clouds. The friends wade from house to house: Maťo carries two big wicker baskets full of small animals (ducklings, a hedgehog, rabbits); the fox helps an old duck with two ducklings out of a doorway; Andrea points to the school on higher ground; Katka holds her phone high above her head to keep it dry. In the background, a small mouse stubbornly carries a fridge on its back. Determined, a little funny, never scary.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 07 Cesta — La route neuve

Fiche `10_Series_07_Cesta_05_nova-cesta.md` → `img/illus_07_cesta.jpg`

**Photo de référence** : [route à travers la forêt](https://commons.wikimedia.org/wiki/File:Road_through_the_New_Forest,_Hale_Purlieu_-_geograph.org.uk_-_5830085.jpg) (David Howard, CC BY-SA 2.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as a loose reference for the road through the forest.

Scene: A brand-new black asphalt road cut through a hilly spruce forest in central Slovakia, on a hot afternoon, wide landscape format. Freshly cut tree stumps on both sides, a parked yellow excavator further away. A human construction foreman in a yellow helmet and orange vest walks ahead. The four friends follow him and argue: Katka happily walks on the smooth asphalt; Maťo, sad, looks back at the forest; Andrea gestures as if to say "both are true"; the fox, in the middle, scratches his head, undecided.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 08 Datacentrum — La salle des serveurs

Fiche `10_Series_08_Datacentrum_05_aj-ked.md` → `img/illus_08_datacentrum.jpg`

**À joindre en plus** : la planche des seconds rôles (Marek).
**Photo de référence** : [salle de serveurs](https://commons.wikimedia.org/wiki/File:Server_Room_(22397102849).jpg) (Carl Lender, CC BY 2.0)

```
Use the attached model sheets for the characters (keep them exactly as designed). Use the attached photo as the reference for the server room.

Scene: Inside a huge, cold data centre hall, wide landscape format. Long rows of black server cabinets with thousands of tiny blinking blue and green lights disappear into the distance; cold white light from the ceiling, cables above. Marek, the badger in his navy work vest, walks them through and explains calmly, open-handed. The fox and Andrea look around, impressed; Maťo rubs his arms because of the cold; Katka holds up her phone to film the lights, delighted. Quiet, a bit unreal.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 09 Baňa — À la grille de la mine

Fiche `10_Series_09_Bana_05_keby.md` → `img/illus_09_bana.jpg`

**À joindre en plus** : la planche des seconds rôles (Ján).
**Photo de référence** : [Banská Štiavnica](https://commons.wikimedia.org/wiki/File:Bansk%C3%A1_%C5%A0tiavnica_panor%C3%A1ma_2015.jpg) (Mineralysk, CC0) : pour les collines et la ville au loin.

```
Use the attached model sheets for the characters (keep them exactly as designed). Use the attached photo as the reference for the hills and the old town in the distance.

Scene: The gate of a new mine on a forested hill above the old mining town of Banská Štiavnica, late afternoon, wide landscape format. Behind a tall wire gate: bulldozers, a cleared slope, a few spruces still standing. At the gate, a middle-aged human miner in an orange vest and helmet sits on a folding chair with a thermos, friendly. Ján, the red squirrel, talks to him very fast with both hands; the fox, Andrea, Maťo and Katka stand a little behind, listening. Far below in the valley: the old town with its church towers and red roofs. Mixed feelings: nobody is a villain.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 10 Rozhodnutie — Près du feu

Fiche `10_Series_10_Rozhodnutie_05_razen.md` → `img/illus_10_rozhodnutie.jpg`

**Photo de référence** : [feu de camp la nuit](https://commons.wikimedia.org/wiki/File:Campfire_flames_at_night.jpg) (Marc-Lautenbacher, CC BY-SA 4.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the fire.

Scene: Night in a meadow in the Slovak hills, wide landscape format. A small campfire crackles. Andrea sits on a log, knees pulled up, looking into the flames, thoughtful and a little sad. The fox sits next to her, quiet, listening, careful not to interrupt. Two old friends, a respectful distance between them. Far away at the edge of the forest, the silhouettes of Maťo and Katka gathering firewood. Starry sky, warm orange light on their faces, deep blue shadows around.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 11 Bratislava — Devant la télévision

Fiche `10_Series_11_Bratislava_05_redaktorka.md` → `img/illus_11_bratislava.jpg`

**Photo de référence** : [le bâtiment de la radio-télévision slovaque](https://commons.wikimedia.org/wiki/File:Radio_and_Television_Slovakia_(Rozhlas_a_telev%C3%ADzia_Slovenska),_Bratislava.JPG) (Kiwiev, CC0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the building (an inverted pyramid of brown steel and glass), but without any sign or lettering.

Scene: In front of a striking inverted-pyramid building in Bratislava, a sunny late morning, wide landscape format. A young human journalist with a laptop under her arm has just come out of the glass door; she has stopped and looks at the four animals with sudden interest, as if she has an idea. The four friends, dusty and tired from the journey, look back at her: the fox hopeful, Andrea cautious, Maťo surprised, Katka already holding up her phone. A small guard booth on the side with a bored guard.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```

## 12 Hrad — En direct

Fiche `10_Series_12_Hrad_05_priamy-prenos.md` → `img/illus_12_hrad.jpg`

**Photo de référence** : [le château de Bratislava](https://commons.wikimedia.org/wiki/File:Bratislava_Castle,_20210727_1004_0250.jpg) (Jakub Hałun, CC BY-SA 4.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the castle.

Scene: A live TV news studio inside Bratislava Castle at dusk, wide landscape format. Behind the guests, a large arched window shows the white castle walls with red roofs, the Danube below and the city lights coming on. A professional TV camera with a small red light on, two lights on stands, cables on the floor. A human news presenter sits on the left with a microphone; facing her, the four friends sit on chairs: Maťo on a chair clearly too small for him, Katka sitting very straight, the fox nervous but brave, speaking, Andrea calm, looking straight at the camera. Serious and touching moment, warm evening light.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no channel logo, no watermark.
```

## 13 Sen — Sous le pommier

Fiche `10_Series_13_Sen_05_dobry-sen.md` → `img/illus_13_sen.jpg`

**Photo de référence** : [pommes vertes sur l'arbre](https://commons.wikimedia.org/wiki/File:2018-07-16_Green_apples_on_tree.jpg) (Maksym Kozlenko, CC BY-SA 4.0)

```
Use the attached model sheet for the characters (keep them exactly as designed). Use the attached photo as the reference for the apple tree.

Scene: Early morning in a small garden at the edge of Košice, wide landscape format. The fox sits in the grass under an apple tree full of small green apples, still a little sleepy, telling a long story with big gestures. Andrea sits facing him, holding a nearly empty water bottle, listening; her smile is slowly fading, as if some details of his "dream" were strangely true. Dry yellow grass, soft golden morning light, a few apartment blocks far behind the garden fence.

Style: Classic 2D hand-drawn animated-film style (not 3D): clean ink outlines, flat colours with soft cel shading. Any humans are drawn in the same simple cartoon style as the animals: simplified shapes, flat colours, few details on faces and hair, no realistic or semi-realistic faces. Soft, painterly background with few small details, so the characters stand out, but the place stays recognisable. Landscape format. No text, no letters, no logos, no watermark.
```
