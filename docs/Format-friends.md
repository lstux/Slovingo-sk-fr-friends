# Format Zajka Friends

Ce document décrit comment le contenu est écrit pour des adolescents de **12 à 16 ans** qui ont fait (ou font) le cours [Slovingo-sk-fr-kids](https://github.com/lstux/Slovingo-sk-fr-kids). Il reprend le format de Kids (`docs/Format-enfants.md` dans ce dépôt de référence) et indique ce qui change. L'histoire, les personnages et le ton sont dans `Concept-friends.md`.

La base reste le **SMD (Slovingo Markdown)** : voir `Format-SMD.txt` dans le repo [Slovingo](https://github.com/lstux/Slovingo/tree/main/docs).

## Ce qui change par rapport à Kids

| | Kids | Friends |
|---|---|---|
| Public | 8–12 ans | 12–16 ans |
| Forme | fiches de phrases, un dialogue en 05 | **un récit** : une série = un chapitre, que des dialogues |
| Fiches 01 à 04 | phrases isolées | vocabulaire + grammaire, avec des **micro-dialogues** qui font avancer l'histoire |
| Fiche 05 | le dialogue de la série | **première partie de l'épisode** |
| Fiche 06 | tableau du vocabulaire, aucun mot nouveau, mini-scènes | tableau du vocabulaire **et suite de l'épisode** ; 3 mots nouveaux au maximum |
| Narration | aucune | un personnage « Narrateur » 💬 dans les dialogues |
| Le renard | l'enfant, genre non précisé | **Gab**, un garçon : formes masculines |
| Humains | aucun | à partir du chapitre 2, tous adultes |
| Références entre séries | interdites | **rappels dans le dialogue**, jamais de renvoi explicite |
| Ton | copain, emojis, points d'exclamation | copain aussi, mais sarcastique, ironique, plus sobre |

## 1. Ton et rédaction

- Phrases courtes, répliques en ping-pong. Une phrase suffit souvent (« Non. » / « Ah. » / « Voilà. »).
- Ton d'ado : ironie, sarcasme gentil, affection jamais explicitée. La catastrophe en toile de fond, la blague au premier plan.
- Moins d'emojis et de points d'exclamation que dans Kids ; pas de ton scolaire.
- Une idée à la fois, pas de jargon grammatical dans le texte (« génitif », « perfectif »…).
- Pas d'humour noir sur la mort, pas de morale lourde. Le monde part en vrille, mais on prend quand même le train.
- Le slovaque est celui qu'un ado slovaque dirait, à faire relire avec attention (voir §11).

## 2. Une série = 6 fiches = un chapitre

- **Fiches 01 à 04** : apprentissage (vocabulaire, un point de grammaire), avec des **micro-dialogues** et de petites scènes qui font avancer l'histoire et placent le contexte culturel.
- **Fiche 05** : première partie de l'épisode (dialogue).
- **Fiche 06 (« extra »)** : tableau complet du vocabulaire **et** suite de l'épisode.

Chaque chapitre doit pouvoir se lire d'un trait en enchaînant les fiches 01 à 06. Le chapitre 1 contient en plus la **remise en jambes** de Kids (voir `Progression-friends.md`).

## 3. Personnages et prénom

| Avatar | Personnage | Notes |
|---|---|---|
| 🦊 | **Gab** (toi) | garçon, 15 ans, Français de Lyon ; prénom `[USER_NAME]` (par défaut *Gab*) ; formes **masculines** |
| 🐰 | Andrea | hase, 16 ans, amie de Gab, cousine de Katka et Maťo ; formes **féminines** |
| 🐻 | Maťo | ours, 14 ans, grand frère de Katka (à partir du chapitre 5) |
| 🐹 | Katka | marmotte, 13 ans (à partir du chapitre 5) |
| 🐑 | Babka Zuzana | brebis, leur grand-mère |
| 🐿️ | Ján | écureuil, rencontré à la mine (chapitre 9) |
| 🦡 | Marek | blaireau, adulte, rencontré au datacenter (chapitre 8) |
| 🦔 | Pani Ježková | hérisson, commerçante, vouvoyée (cameo) |
| 🦅 | Pán Orol | aigle, gardien du parc, vouvoyé (cameo) |
| 💬 | **Le Narrateur** | voix qui situe l'action (voir §6) |
| 🧑 | Les humains | **adultes uniquement**, désignés par leur fonction (*vodič*, *redaktorka*…), vouvoyés |

- Entre ados et avec Babka Zuzana : **tutoiement**. Le vouvoiement (*vy*) vaut pour tous les adultes inconnus, y compris les humains.
- `[ASK_USER_NAME]` apparaît **une seule fois**, dans la première fiche de l'introduction (`00_Introduction_01_bienvenue`), en français et avant tout contenu slovaque. Ensuite on utilise `[USER_NAME]` dans les répliques et la narration. Le nom par défaut est `site.user_name_default` dans `lang.json` (*Gab*).
- Dans la bêta, **Andrea est fixe, en dur**, et le cours est écrit pour des **garçons** (Gab). Pas de « Gabo » écrit en dur dans les dialogues : avec un prénom saisi par l'élève, il serait faux.
- Un prénom saisi **ne se décline pas** : on l'emploie pour appeler quelqu'un ou comme sujet (*Ahoj, [USER_NAME]!*, *[USER_NAME] je v električke*), jamais à l'accusatif ni au datif (*pre Gaba*, *Gabovi*…).
- Le marqueur de locuteur va **après** le `!` : `! 🐰 Ahoj!` (jamais `🐰 ! Ahoj`).

## 4. Genre

- **Gab est un garçon**, Andrea une fille : on écrit les formes masculines pour Gab (*rád*, *sám*, *bol som*, *jednoduchý*), féminines pour Andrea (*rada*, *sama*, *bola som*).
- En français aussi : « je suis perdu », « content », sans écriture inclusive.
- Le prénom saisi par l'élève ne change **jamais** le genre du personnage.
- Quand quelqu'un parle de Gab **comme animal**, on emploie le mot *líška* (féminin), comme dans Kids : *Ty si milá líška* (accord avec le mot, pas avec Gab). Une remarque le dit quand il le faut.

## 5. Écouter plutôt que lire

Les consignes importantes se mettent en `{{fr:...}}` (voix française), comme dans Kids :

```
{{fr:La lettre}} {{č}} {{fr:se dit « tch », comme dans « tchèque ».}}
Le mot {{čaj}} veut dire « thé ».
```

- Une idée par `{{fr:...}}`, une à trois phrases.
- **Pas de mot slovaque dans un `{{fr:...}}`** (ni lettre, ni terminaison) : la voix française le prononcerait mal. Le mot slovaque va à côté, en `{{...}}`.
- **Exceptions admises** : les prénoms des personnages (*Andrea, Katka, Maťo, Babka Zuzana*…).
- En français, on écrit **les Tatras** ; le nom slovaque `{{Tatry}}` n'est donné que pour l'apprendre.
- Pas de `**gras**` à l'intérieur d'un `{{fr:...}}`.
- Dans une audio-card, la phrase après `!` est lue avec la voix slovaque ; le français va dans les `>`, les `+` et les paragraphes.

## 6. Le Narrateur 💬

Le Narrateur est un **personnage « spécial »** : une voix slovaque qui situe l'action (qui est où, ce qui se passe) entre les répliques. Il est **intégré au dialogue**, avec l'avatar 💬 : ce n'est pas du `{{...}}` dans un paragraphe, ce qui laisse de la place pour la traduction et les explications comme pour n'importe quelle réplique.

```
! 💬 V električke sú [USER_NAME] a Andrea.
> Dans le tram, il y a [USER_NAME] et Andrea.
> V električke = dans le tram
> sú = il y a, ils sont
> [USER_NAME] a Andrea = [USER_NAME] et Andrea
```

Règles :

- phrases **très courtes**, au **présent narratif** tant que le passé n'est pas introduit ;
- même vocabulaire et mêmes règles de mots nouveaux que les répliques (§8) ;
- **bref** : l'essentiel de l'épisode est dans les répliques ;
- présent surtout en fiches 05 et 06, mais aussi, en petit, en fiches 01 à 04 ;
- il apparaît dans `## Les personnages` : `- 💬 Le Narrateur`. Si le moteur le permet, il a une **voix dédiée** (réglage par personnage).

## 7. Structure des fichiers

```
md/
├── 10_Series_XX_Theme_YY_titre.md
├── 20_Vocabulary_NN_titre.md
└── 90_Annex_NN_titre.md
exercises/   un fichier .exercises.json par fiche
img/         illustrations et img/credits.md
```

Exemple : `10_Series_01_Kosice_02_ako-sa-mas.md`.

- **Titres** : `# Série Košice (2/5) — Ako sa máš?` ; extra : `# Košice (extra) — Večer` (comme Kids : les fiches 01 à 05 sont numérotées sur 5, l'extra n'a pas de numéro).
- Le **thème** du nom de fichier donne la clé de `lang.json` → `subgroups` et `subgroup_themes`, en minuscules et **sans diacritiques** (`Košice` → `kosice`).
- Les noms de fichiers n'ont pas d'accent ; les titres à l'intérieur, si.
- **Introduction « Avant de commencer »** : 3 fiches `00_Introduction_NN_titre.md`, titres `# Introduction (n/3) — Titre` : 01 Bienvenue (prénom, idée du cours, mode d'emploi), 02 La Slovaquie (géographie, voisins, étapes du voyage), 03 Remise en route (prononciation, *ty* / *vy*). Ton plus sobre que dans Kids ; pas de mot de vocabulaire à apprendre, sauf les noms de lieux et les points cardinaux. Kids est supposé acquis : la série 01 démarre juste après.

## 8. Vocabulaire

- **Fiche d'apprentissage** : 9 à 10 mots essentiels (« Les nouveaux mots ») + 3 mots complémentaires. Un mot déjà vu dans Kids ou plus haut est marqué « (rappel) ».
- **Fiche de dialogue (05)** : au plus **5 mots nouveaux**, toujours signalés : `+ Mot nouveau signalé : {{…}} = …`.
- **Fiche 06** : au plus **3 mots nouveaux**, toujours signalés et ajoutés au tableau récapitulatif.
- Au plus **une** forme « à écouter » (forme grammaticale pas encore apprise) par fiche de dialogue, signalée par `+ À écouter : …`.
- Aucun mot inconnu non signalé. Les mots nouveaux du Narrateur comptent comme ceux des répliques.
- Les cas slovaques (accusatif, locatif, génitif) ne sont pas expliqués comme tels : on les donne en morceaux à retenir (*v električke*, *do mesta*, *u mojej tety*), avec la décomposition.

## 9. Fiche d'apprentissage (01 à 04)

```markdown
# Série Košice (2/5) — Ako sa máš?

@ TODO_img/nom.jpg | TODO : choisir une image (…) sur Wikimedia Commons

{{fr:Courte intro (1 à 2 phrases), qui replace l'histoire.}}

---

## Les nouveaux mots
| Slovenčina | Français |
|------------|----------|
| … | … |   (9-10 mots ; un mot déjà vu est marqué « (rappel) »)

---

## Aujourd'hui on apprend…
### Un point de grammaire
Explication en quelques phrases, tableau d'exemples.

---

## Le dialogue
(micro-dialogue de 3 à 6 cartes avec avatars, Narrateur compris)

---

## 🇸🇰 Coin slovaque
2 courts paragraphes, mots-clés en {{…}}

---

## Vocabulaire complémentaire
(3 mots)

---

## Encore quelques répliques
(2 cartes qui réutilisent les mots complémentaires)
```

La section `## Le dialogue` est composée uniquement de cartes avec avatar : le moteur la reconnaît donc comme une section de dialogue. Les micro-dialogues font **3 à 5 répliques au début du récit, jusqu'à 8 vers la fin**.

## 10. Fiches 05 et 06 : l'épisode

**Fiche 05** :
- `## Vocabulaire du dialogue` (au plus 5 mots nouveaux) ;
- `## Les personnages` : liste avatar + nom, Narrateur compris ;
- `## Le dialogue` : l'épisode, **15 à 20 répliques** au début du récit, jusqu'à 30–40 vers la fin, vocabulaire de la série et des séries précédentes ;
- Coin slovaque.

**Fiche 06 (extra)** :
- `## Tout le vocabulaire de la série` : le **tableau complet** (mots de toutes les fiches, mots signalés compris) ;
- `## Les personnages` ;
- `## La suite de l'épisode` : la suite et la fin de l'épisode, même longueur que la 05. **3 mots nouveaux au maximum**, signalés, ajoutés au tableau ; les exercices ne portent que sur les répliques sans mot nouveau ;
- Coin slovaque.

La 06 laisse de la place pour **développer** l'histoire (scènes plus longues, rebondissements, personnages secondaires), mais l'épisode doit pouvoir se lire d'un trait de la 05 à la 06.

## 11. Cartes audio

```
! Ako sa máš?
> Comment vas-tu ?
> Ako = comment
> sa máš = tu te portes
+ Remarque utile.
```

- Première ligne `>` : traduction naturelle.
- Lignes `>` suivantes : décomposition **morceau par morceau**, **une ligne par élément**, jamais plusieurs éléments séparés par des points-virgules sur la même ligne.
- Lignes `+` : remarque, mot nouveau, astuce. Pas systématique.
- Dans les dialogues : `! 🐰 Ahoj!` (avatar après le `!`).

## 12. Illustrations

```
@ img/nom-du-theme.jpg | Légende : sujet. Source : Wikimedia Commons
```

- Une image libre de Wikimedia Commons par fiche, choisie une à une, avec légende, source et licence ; ~600-800 px de large.
- Tant que l'image n'est pas choisie : `@ TODO_img/choisir-image.jpg | TODO : choisir une image (…)`.
- Chaque image a sa ligne dans `img/credits.md`.
- Pas d'illustrations de personnages pour l'instant : on verra plus tard.

## 13. Coin slovaque

Court, amusant, **vérifiable** (pas de chiffre approximatif) : « Le sais-tu ? En slovaque, on dit… ». Des choses qu'un ado peut voir ou vivre (le tram, les noms de rue, une expression d'ado, un plat, un lieu, un détail du pays). Les faits sont vérifiés, surtout ceux qui touchent aux catastrophes et aux sites réels. Pas de nom d'entreprise ni de personnalité réels dans les dialogues ; les noms de chaînes et d'institutions (STVR, Jednotka) sont réels.

## 14. Qualité de langue

- **Français** : naturel pour un ado.
- **Slovaque** : celui qu'un ado slovaque dirait. À faire relire avec attention.
- **Pièges** : le tableau des pièges de Kids (dans son `Format-enfants.md`) reste valable. En plus, pour Friends :

| ❌ | ✅ |
|----|----|
| Veľmi hovorím (pour « je parle beaucoup ») | Veľa hovorím. (*veľmi* = très ; *veľa* = beaucoup) |
| Som francúzsky | Som Francúz. (*francúzsky* = adverbe/adjectif ; *po francúzsky* = en français) |
| Som líškasky (mot inventé) | Som líška. |
| Dlho sa nevidíme (pour « on ne s'est pas vus depuis longtemps ») | Dlho sme sa nevideli. |

## 15. Exercices faits main

Comme dans Kids, les exercices sont **écrits à la main** dans `exercises/<nom de la fiche>.exercises.json`, avec `"mode": "replace"` et `"sync": "full"`.

- **Que du déjà vu** : les mauvaises réponses en slovaque viennent de la fiche ou des précédentes (Kids compris).
- **Une seule bonne réponse** ; même forme (un mot contre des mots, une phrase contre des phrases de longueur proche).
- **Distracteurs utiles** : ils ciblent les vraies confusions d'un francophone (*rád* / *rada*, *veľa* / *veľmi*, *pätnásť* / *päť*).
- **Textes à trous** (`fill-blank`) : `"show_translation": true`, ponctuation autour du trou.
- **Remettre en ordre** : au moins 3 étiquettes de chaque côté.
- **Prénom** : `[USER_NAME]` n'est jamais un trou ni une réponse.
- **Les 5 types** quand la fiche s'y prête (qcm, fill-blank, listen, order, match) ; l'écoute 🔊 est le plus utilisé.
- Chaque exercice reprend **mot pour mot** une paire de la fiche ; en fiche 06, on ne prend que les répliques sans mot nouveau.
- Les répliques du Narrateur 💬 peuvent servir à l'écoute, mais ne servent ni de trou ni de réponse piège.

## 16. Vérifier avant de publier

- [ ] Illustration choisie (ou TODO explicite)
- [ ] 9-10 nouveaux mots + 3 complémentaires (apprentissage) ; 5 mots nouveaux au plus (05) ; 3 au plus (06)
- [ ] Cartes décomposées morceau par morceau, une ligne par élément
- [ ] Aucun mot inconnu non signalé (Narrateur compris)
- [ ] Dialogues : syntaxe `! 🐰 …`, mots nouveaux signalés
- [ ] Formes masculines pour Gab, féminines pour Andrea ; pas de « Gabo » en dur
- [ ] Aucun renvoi explicite à un autre chapitre ; des rappels dans les dialogues
- [ ] Coin slovaque : faits vérifiables
- [ ] Fiche extra : tableau complet, suite de l'épisode, 3 mots nouveaux au plus
- [ ] Nom de fichier et titre selon le schéma, sous-groupe déclaré dans `lang.json`
- [ ] Slovaque relu par un locuteur natif
- [ ] Ton : ironique, tendre, jamais cynique

Build local :

```
python3 src/build.py --lang-dir ../slovingo-sk-fr-friends --static-dir static
```

(depuis le repo [Slovingo](https://github.com/lstux/Slovingo)). Le nombre de cartes audio dans `json/*.content.json` doit correspondre au nombre de lignes `!` des `.md`. Après une modification de fiche, relancer `python3 src/sync_exercises.py --lang-dir ../slovingo-sk-fr-friends`.
