# Zajko Quest (point & click, style peint) : liste chiffrée des images

*Estimation du 9 novembre 2026, d'après `docs/Intrigue-jeu.md` (énigmes par chapitre). Style retenu : le même style peint que les illustrations des fiches. Une « génération » = un envoi dans ChatGPT ou Gemini (retouches comprises).*

## Récapitulatif

| Famille | Images finales | Générations (avec essais et retouches) | Outil conseillé |
|---|---|---|---|
| Décors sans personnages | ~35 | ~90 | Gemini ou ChatGPT, avec photo de référence |
| Portraits de dialogue (planches d'expressions, découpées ensuite) | ~28 (≈16 planches) | ~32 | ChatGPT, avec les planches de personnages |
| Sprites des 4 héros (idle, marche, gestes) | 4 planches | ~8 | ChatGPT, avec la planche des héros |
| Objets d'inventaire (planches de 6 à 9 icônes) | ~15 icônes (≈3 planches) | ~6 | ChatGPT ou Gemini |
| Écrans spéciaux (titre, fins, carte, carnet ouvert) | ~5 | ~10 | ChatGPT |
| **Total** | **~85** | **~150** | |

## Décors (un par lieu d'énigme)

| Ch. | Décors | Variantes utiles |
|---|---|---|
| 1 Košice | intérieur du tram, arrêt avec afficheur, jardin de la tante | tram bondé / vide |
| 2 Sucho | fontaine à sec, guichet de gare avec tableau des départs | fontaine avec le carnet / sans |
| 3 Raj | gorges à échelles (2 hauteurs), sentier de l'eau | |
| 4 Burka | refuge sous l'orage (extérieur), cuisine dans le noir | cuisine avec bougie |
| 5 Domov | village et pâturage, maison de Babka (album) | |
| 6 Povodeň | village inondé, maison de la souris | niveau d'eau qui monte |
| 7 Cesta | route neuve, clôture du chantier | |
| 8 Datacentrum | hall des serveurs, entrée avec badge, étang des grenouilles | |
| 9 Baňa | grille de la mine, tajchy et vannes (énigme mécanique), vue sur Štiavnica | vannes fermées / ouvertes |
| 10 Rozhodnutie | feu de camp de nuit | |
| 11 Bratislava | arrêt de tram, entrée RTVS avec le portier | |
| 12 Hrad | plateau télé | |
| Épilogue | jardin du pommier, fontaine avec la loutre | |

≈ 27 décors de base + ≈ 8 variantes = ~35.

## Portraits

- **Héros** (Gab, Andrea, Katka, Maťo) : 4 expressions chacun (neutre, content, surpris, inquiet ou en colère) : 4 planches.
- **Seconds rôles** : jardinier, pán Orol, gardien du refuge, Babka Zuzana, pompier, chef de chantier, Marek, Ján, mineur, portier, rédactrice, présentatrice, doktorka Vydrová, le porte-parole : 12 planches de 1 à 2 expressions.

## Objets d'inventaire

Ticket, lístok (billet et petit mot), carnet fermé, pages du carnet (5), lettre de la loutre, six lettres d'Andrea, fraises, téléphone de Katka, bougie, badge, invitation, clé ou vanne.

## Méthode et ordre conseillés

1. **Pilote** : le tram du chapitre 1 (le prototype existe dans `web-games/aventure/`). Un décor, un sprite, un portrait, deux objets : ~15 générations. On vérifie que le style tient une fois dans le moteur du jeu.
2. **Décors vides** : on les fait par lots, avec photo de référence, sans personnages. Moins de risque de dérive, donc possible avec Gemini.
3. **Planches de personnages** (portraits, sprites) : avec la planche des héros ou `planche-tous.jpg`, sur ChatGPT.
4. **Fond de carte, titre et fins** à la fin.

## Points d'attention

- Un décor de jeu doit laisser de la place pour les personnages et l'interface (bandeau d'inventaire, boîte de dialogue) : prévoir un sol clair et dégagé, des zones cliquables lisibles.
- Même format partout : 16:9, redimensionné à 1280×720.
- Tous les crédits de photos de référence vont dans `img/credits.md`.
