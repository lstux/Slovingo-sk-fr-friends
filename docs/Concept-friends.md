# Slovingo Friends — Concept du cours « ados »

*Version 0.2, 5 octobre 2026. Reprise du brouillon d'Eric (v0.1), corrigée et complétée après lecture du cours [Slovingo-sk-fr-kids](https://github.com/lstux/Slovingo-sk-fr-kids) (repo `kids`, app **Zajka**) et de la documentation du moteur [Slovingo](https://github.com/lstux/Slovingo).*

**Comment lire ce document** : les sections 1 à 28 reprennent le brouillon, corrigé. La section 0 liste ce qui a changé et pourquoi. La section 29 rassemble ce qu'il reste à décider : chaque question a une **proposition** de ma part, il suffit d'écrire la réponse sous « Réponse : ».

---

# 0. Ce qui a changé par rapport à la v0.1

## 0.1 Corrections de fond (à relire en priorité)

| # | Dans le brouillon | Ce que dit Kids | Correction |
|---|---|---|---|
| 1 | §9 : « les sources de Kids définissent Eric 👦, Andrea 👩, Ján 🧒, Babka Zuzana 👵, Katka 👧, Marek 👨 » | Cette liste vient du **cours adulte** (`Fiches-Serie.txt`). Kids n'a **ni Eric, ni Ján, ni Marek**. | §9 réécrit avec la vraie distribution de Kids (voir tableau en §9). Ján et Marek deviennent des **nouveaux personnages**. Eric disparaît (il appartient au cours adulte). |
| 2 | §12 : Katka est « la petite sœur de Ján » | Katka (8 ans) est la **petite sœur de Maťo**, l'ours (9 ans). | Corrigé. **Maťo**, absent du brouillon, est ajouté. |
| 3 | §12 : Katka en 🐿️ ou 🐭 « à définir » | Katka est une **marmotte 🐹**. | Fixé. Le 🐿️ est libéré (il peut aller à Ján). |
| 4 | §11 : Babka Zuzana en 👵 / 🐻‍♀️ / « humaine ou animal ? » | C'est une **brebis 🐑** (déjà tranché dans Kids). | Fixé : brebis. |
| 5 | §13 : Marek, « collègue d'Andrea » | Pas de monde du travail dans Kids (Andrea a 11 ans). | Marek est un nouveau personnage, sans lien hérité. |
| 6 | §8 : « Andrea est un personnage slovaque récurrent » | Andrea est une **hase** (femelle du lièvre), 11 ans, « la grande de la bande », avatar 🐰. | Précisé en §8. |
| 7 | §7 : le renard est « il » ; c'est un des deux héros | Dans Kids, 🦊 est **l'apprenant lui-même** : prénom saisi par l'élève (`[USER_NAME]`), genre jamais précisé, aucune forme genrée. Il a **10 ans** (« Mám desať rokov », Rodina 05). | Contradiction à trancher (Q4, Q5). Le texte parle du renard comme d'un personnage en attendant. |
| 8 | §1, §2, §22, §28 : « dix ans plus tard » **et** ados de 12–16 ans | Âges dans Kids : Andrea 11, Maťo 9, Katka 8, renard 10. Dix ans plus tard : 18 à 21 ans. | **Incohérence** : ou bien 5 ans (ados), ou bien 10 ans (jeunes adultes). Le texte dit « quelques années » en attendant la réponse (Q1). |
| 9 | §6 : les humains répondent normalement aux animaux | **Il n'y a aucun humain dans Kids** : tous les personnages sont des animaux (« façon Bisounours »). | Ce n'est pas un problème, mais c'est un **élément nouveau** de l'univers : à assumer explicitement (Q12). |
| 10 | Tatras / Tatry mélangés | Décision Kids (relecture d'octobre 2026) : en français on écrit **« les Tatras »**, le mot slovaque `{{Tatry}}` n'est donné que quand on veut l'apprendre. | Appliqué dans tout le document. |
| 11 | Trois noms : « cours ados », « Slovingo Teens », repo `friends` | | Q3. J'emploie « Friends » dans le titre, le nom du repo. |
| 12 | §25 : lithium à **Banská Štiavnica** | | Banská Štiavnica est une ville de mines **d'argent et d'or**, pas de lithium. À ma connaissance, le projet de lithium dont on parle en Slovaquie est dans le **Gemer** (région de Rožňava) : *à vérifier*. En fiction on peut déplacer, mais mieux vaut le savoir (Q17). |

## 0.2 Petites corrections

- « Leur retrouvailles » → « **Leurs** retrouvailles » (§7).
- §8 « Dans la version Kids, Andrea est un personnage slovaque récurrent » → hase de 11 ans.
- §19 : les noms de lieux slovaques restent ceux du brouillon ; « Tatry » devient « les Tatras » en texte français.
- §27 (questions ouvertes) : supprimé en tant que tel. Les questions dont la réponse est dans Kids sont répondues (§9, §27), les autres sont reprises en section 29.

## 0.3 Ajouts

- §9 : tableau de la **vraie distribution de Kids**, avec ce que devient chaque personnage ; ajout de Maťo, Pani Ježková et Pán Orol.
- §4 : note sur la carte, qui existe déjà dans le moteur (branche `feat/map`).
- §8, §21 : les **clins d'œil à Kids** (la hase qui avait peur du renard, les baies).
- §21 : **test de traduction** de la scène de référence en slovaque (le problème du genre du renard apparaît tout de suite).
- §18, §20 : règles de format héritées de Kids, et **proposition de grammaire par série**.
- §29 : questions restantes, avec propositions.

---

# 1. Vision générale

Ce cours est une évolution directe de l'univers de **Slovingo Kids** (cours de slovaque pour enfants de 8 à 12 ans, app **Zajka**).

L'idée n'est pas de simplement reprendre le cours Kids avec des phrases plus difficiles. Le nouveau cours se déroule dans **le même univers, quelques années plus tard** (durée à fixer, voir Q1).

Les personnages ont grandi.

Ils sont toujours des animaux anthropomorphes, avec leurs caractères, leurs amitiés et leurs souvenirs d'enfance. Mais ils sont maintenant adolescents, autour de **13–16 ans** (à confirmer, Q1), et découvrent un monde beaucoup moins insouciant que celui qu'ils connaissaient enfants.

Le **public cible** du cours reste **12–16 ans**.

Le ton mélange :

- aventure ;
- humour absurde ;
- adolescence ;
- ironie ;
- petites touches dystopiques ;
- découverte culturelle de la Slovaquie ;
- problèmes environnementaux et sociaux ;
- situations quotidiennes réalistes ;
- et, surtout, apprentissage progressif du slovaque.

Le monde n'est jamais totalement sombre. Les personnages restent des ados : ils peuvent parler d'une catastrophe écologique et, quelques minutes plus tard, se disputer pour savoir qui va manger le dernier morceau de gâteau.

---

# 2. Le principe narratif

Quelques années auparavant, les personnages de Slovingo Kids vivaient leurs aventures d'enfance dans les Tatras.

Puis ils ont grandi.

La vie les a séparés.

Certains sont partis étudier ou travailler ailleurs. D'autres sont restés dans leur région. Le monde autour d'eux a changé.

Le renard et Andrea, en particulier, se sont perdus de vue après leur enfance dans les Tatras.

Ils se retrouvent finalement à **Košice**.

Ils n'y sont pas forcément parce qu'ils rêvaient de vivre en ville : ils y sont arrivés parce que leur région d'origine offrait de moins en moins de travail.

> *Note : si les personnages ont 15 ans, c'est « leurs familles » que la région n'a plus pu faire vivre, et eux sont à Košice pour l'école (lycée, internat). Voir Q1 et Q13.*

Ils ont grandi, mais gardent une nostalgie commune de leur enfance dans les montagnes.

Et lorsqu'une nouvelle situation les oblige à reprendre la route, ils décident de traverser la Slovaquie pour rejoindre **Bratislava**.

Le voyage devient progressivement plus important qu'ils ne l'avaient imaginé.

---

# 3. Le voyage à travers la Slovaquie

Le parcours pédagogique devient également un véritable voyage géographique.

Trajet indicatif :

```text
Košice
   ↓
Slovenský raj
   ↓
Tatry (les Tatras)
   ↓
Liptov
   ↓
Banská Štiavnica
   ↓
... autres étapes à définir ...
   ↓
Bratislava
   ↓
🏰 Bratislavský hrad
```

*Vérification : l'itinéraire est géographiquement cohérent, d'est en ouest (Košice, puis le Paradis slovaque, les Tatras, le Liptov, le centre du pays, Bratislava). Les « autres étapes » seront dans la région centrale (voir Q18).*

Chaque étape correspond à une série ou à un petit groupe de séries.

La géographie n'est donc pas uniquement décorative : elle sert à faire découvrir progressivement la Slovaquie.

On pourra intégrer :

- paysages ;
- villes ;
- régions ;
- histoire ;
- traditions ;
- gastronomie ;
- architecture ;
- transports ;
- culture contemporaine ;
- particularités linguistiques ;
- vie quotidienne.

L'apprenant découvre ainsi la langue **en voyageant réellement à travers le pays**.

---

# 4. La carte comme représentation du voyage

La carte d'accueil de Slovingo devient la carte de ce voyage.

Le renard part de Košice et progresse vers Bratislava.

Mais la carte reste volontairement **symbolique**.

Il ne s'agit pas d'un atlas géographique précis.

On peut utiliser :

- une illustration de fond ;
- des montagnes ;
- des forêts ;
- des rivières ;
- des chemins ;
- des emojis ;
- de petites illustrations ;
- des éléments graphiques animés.

Les étapes peuvent par exemple être représentées par :

- 🏠
- 💧
- 🌲
- ⛰️
- 🌧️
- 🏗️
- ⛏️
- 🏙️
- 🏰

Le renard 🦊 est l'élément principal qui donne vie à la carte.

## Position du renard

La position du renard ne représente pas la dernière validation.

Elle représente **la dernière fiche ou série consultée**.

Si l'utilisateur revient sur la page d'accueil :

- s'il a déjà consulté quelque chose, le renard est à cet endroit ;
- s'il n'a encore rien consulté, le renard est **hors de la carte, à côté de la première étape**.

Lorsqu'il clique sur une destination, le renard se déplace vers celle-ci avant l'ouverture du contenu.

La progression pédagogique et la position narrative sont donc deux notions différentes.

## Note sur le moteur

D'après mes notes de projet, la carte d'aventure est **déjà développée dans le moteur Slovingo** (branche `feat/map`, générique, utilisée pour tous les cours, avec Kids comme cours de test) : détection automatique des fichiers `Series_NN_…`, états visuels des étapes, renard qui se déplace, château final. Le concept Friends est donc d'abord une **configuration** (étapes, emojis, textes) plutôt qu'un développement. Deux points à vérifier quand on y sera : le comportement décrit ci-dessus (position = dernière fiche consultée) correspond-il à l'implémentation actuelle (qui parlait aussi de brouillard levé à la validation d'une série) ? Et les emojis des étapes sont-ils configurables par cours ? (Q24)

---

# 5. Le monde quelques années plus tard

Le contraste avec Kids est volontaire.

Dans Kids, les personnages pouvaient découvrir le monde avec une certaine innocence.

Quelques années plus tard, ils comprennent davantage ce qu'ils voient.

Ils remarquent :

- les changements du paysage ;
- les problèmes économiques ;
- les transformations des villes ;
- les conflits d'intérêts ;
- les conséquences de certaines décisions humaines ;
- les contradictions du monde adulte.

Mais ils n'ont pas toutes les réponses.

C'est important : ils restent adolescents.

Ils peuvent être lucides sans être omniscients.

Ils peuvent être sarcastiques sans être cyniques en permanence.

Ils peuvent être engagés sans devenir des porte-paroles politiques.

---

# 6. La règle absurde des animaux parlants

Les personnages sont toujours des animaux.

Ils parlent parfaitement.

Les humains leur répondent normalement.

**Personne ne trouve cela étrange.**

Cette règle n'est jamais expliquée.

Un humain peut parfaitement demander à un renard :

> « Kam idete? »

Et le renard peut répondre :

> « Do Bratislavy. »

L'humain continue la conversation normalement.

Cette absurdité fait partie de l'identité de la série.

Elle permet également d'éviter que chaque rencontre avec un humain devienne une histoire sur le fait que les personnages sont des animaux.

Ils sont traités comme des personnes.

Point.

> *Note : dans Kids, il n'y a aucun humain à l'écran (seulement des animaux, dont Pani Ježková le hérisson et Pán Orol l'aigle, gardien du parc). Les humains sont donc une nouveauté de Friends. Ce n'est pas contradictoire (le parc national, par exemple, suppose déjà des humains), mais il faut décider s'ils existaient « hors champ » depuis le début (Q12).*

> *Note de langue : « Kam idete? » est la forme polie ou plurielle (vy). Ici elle fonctionne dans les deux sens, puisque le renard et Andrea sont deux. C'est un bon exemple pour introduire le vy.*

---

# 7. Les deux personnages principaux

## 🦊 Le renard

Le renard est l'un des deux personnages centraux.

Il a grandi.

Il est désormais adolescent.

Il garde quelque chose de son enthousiasme d'enfant, mais il est devenu plus ironique et parfois un peu désabusé.

Il a probablement davantage tendance à observer les absurdités du monde et à les commenter.

Il peut avoir ce genre de réaction :

> « Jasné. Ďalšia skvelá myšlienka. »

Il n'est pas forcément pessimiste.

Il est plutôt dans le :

> « Bon... évidemment que ça allait arriver. »

Et il est capable de dire — réplique à conserver **texto** dans le cours :

> « Je veux bien attendre la fin du monde avec toi ! »

C'est probablement la réplique qui le résume le mieux : ironique, tendre, jamais cynique. La fin du monde est prise avec légèreté — mais partagée quand même.

Il peut également avoir gardé un côté très attachant et spontané de son enfance.

> *Dans Kids, le renard est l'apprenant lui-même (prénom saisi par l'élève, genre jamais précisé). Ici il devient un personnage avec une personnalité marquée, ce qui pose deux questions : est-il toujours « toi » (Q4) et de quel genre est-il, puisque le slovaque accorde le passé et le conditionnel (Q5) ?*

### Relation avec Andrea

Ils étaient proches enfants dans les Tatras.

Puis ils se sont perdus de vue.

Leurs retrouvailles à Košice sont donc importantes.

Ils doivent réapprendre à se connaître.

Ils ont les souvenirs de leur enfance en commun, mais ont changé différemment.

Cela permet d'avoir une relation plus riche que celle de simples compagnons d'aventure.

---

# 8. 🐰 Andrea la hase

Andrea est l'autre personnage principal.

Dans la version Kids, Andrea est **une hase des Tatras** (la femelle du lièvre), **11 ans**, « la grande de la bande » : c'est elle qui accueille l'apprenant dans le Kit de Survie et lui apprend à se présenter. Avatar 🐰.

Dans cette nouvelle version, elle devient **Andrea la hase 🐰**, sans changement de nature : elle a juste grandi.

Elle a elle aussi grandi.

Elle est probablement un peu plus organisée que le renard, mais pas forcément plus optimiste.

Elle peut être celle qui ramène régulièrement le renard à la réalité.

Elle a un côté :

> « Oui, c'est absurde. Mais maintenant, qu'est-ce qu'on fait ? »

Elle garde aussi une exaspération affectueuse permanente envers les renards en général :

> « Tu parles beaucoup, comme tous les renards ! Mais au moins tu manges des baies ! »

> « Les renards ne me comprendront jamais, et je ne comprendrai jamais les renards ! Ils sont compliqués, des extraterrestres ! »

**Lien avec Kids** : dans Kids, Andrea avait un peu peur du renard au début (« Bála som sa! »), parce que les autres renards qu'elle connaissait étaient beaucoup moins sympas ; et le renard, lui, mange des baies, pas des lièvres. Cette exaspération affectueuse est la **suite directe du gag de Kids** : la peur est devenue de l'agacement, puis de la tendresse. Un clin d'œil à garder discret (§22).

Elle peut également être plus sarcastique qu'elle ne l'était enfant.

## Leur dynamique

Le duo doit fonctionner comme deux anciens amis qui se retrouvent après plusieurs années.

Ils se connaissent suffisamment pour se lancer des piques.

Ils ont des souvenirs communs que les autres ne comprennent pas.

Ils peuvent parfois se disputer.

Mais lorsqu'une situation devient sérieuse, ils se serrent les coudes.

C'est une relation d'amitié avant d'être une relation pédagogique.

Une scène de dialogue de référence pour ce duo est proposée dans la section 21.

---

# 9. Les autres personnages hérités de Kids

Distribution **réelle** de Kids (source : `README.md`, `docs/Format-enfants.md`, `docs/Progression-enfants.md`) :

| Avatar | Personnage | Dans Kids | Dans Friends (proposition) |
|---|---|---|---|
| 🦊 | Le renard | L'apprenant (nom = `[USER_NAME]`), 10 ans, genre non précisé | Personnage principal (voir §7, Q4, Q5) |
| 🐰 | Andrea | Hase, 11 ans, « la grande » | Personnage principal (§8) |
| 🐹 | Katka | Marmotte, 8 ans, phrases courtes et simples | Voir §12 |
| 🐻 | Maťo | Ours, 9 ans, grand frère de Katka | Voir §12 bis |
| 🐑 | Babka Zuzana | Brebis, grand-mère de Katka et Maťo, pâturages et traditions | Voir §11 |
| 🦔 | Pani Ježková | Hérisson, commerçante du village, **vouvoyée** | Cameo possible (Q11) |
| 🦅 | Pán Orol | Aigle, gardien du parc national, **vouvoyé** | Cameo possible (Q11) |

**Nouveaux personnages** (absents de Kids) : Ján et Marek, repris du brouillon (§10 et §13). Leurs prénoms existent dans le cours adulte, mais ce sont ici des personnages différents. Pas de lien à faire, et pas besoin d'avoir lu le cours adulte.

Règles de tutoiement héritées de Kids : entre enfants et avec Babka Zuzana, **tutoiement** ; le **vouvoiement** (*vy*) pour les adultes inconnus. Friends l'étend naturellement aux humains, aux fonctionnaires, aux gardes, etc. (Q12).

---

# 10. Ján — le copain qu'on ne voulait pas perdre

### 🐿️ Ján *(nouveau personnage, pas dans Kids)*

> *Dans le brouillon, Ján était « proche du groupe » enfant. Comme il n'existe pas dans Kids, je propose : Ján est **rencontré à Košice**, pas hérité. Le titre « le copain qu'on ne voulait pas perdre » deviendrait « le copain qu'on rencontre et qu'on ne quitte plus ». Si tu préfères qu'il ait fait partie de la bande en Kids sans que ça se voie, il faudra l'ajouter après coup dans Kids. À décider (Q8).*

Ján pourrait devenir l'un des personnages les plus intéressants du groupe.

Adolescent, il est quelqu'un de très vivant.

Il peut être :

- plus débrouillard ;
- très curieux ;
- un peu grande gueule ;
- capable de parler avec n'importe qui ;
- parfois beaucoup trop sûr de lui.

Il pourrait avoir une connaissance étonnamment large de la Slovaquie.

C'est potentiellement celui qui connaît :

> « quelqu'un qui connaît quelqu'un »

dans chaque ville.

Il permet aussi de faire entrer naturellement dans l'histoire des situations plus urbaines et sociales.

*Idée : en écureuil (animal courant en Slovaquie), Ján pourrait avoir un lien personnel avec l'épisode de la mine (§15, les écureuils qui doivent partir), sans en faire un porte-parole.*

---

# 11. Babka Zuzana

### 🐑 Babka Zuzana *(brebis, grand-mère de Katka et Maťo, déjà dans Kids)*

Babka Zuzana est un personnage particulièrement intéressant à conserver, car elle porte une partie du lien avec la culture et les générations précédentes.

Elle peut être une présence ponctuelle mais importante.

Elle représente :

- la mémoire ;
- les traditions ;
- la génération précédente ;
- les changements observés sur plusieurs décennies.

Elle pourrait notamment être l'un des personnages qui connaît réellement l'ancien monde des Tatras.

Elle peut raconter aux adolescents :

> « Keď som bola mladá... »

et leur montrer que certains changements ne datent pas d'hier.

Dans Kids, c'est elle qui est amusante avec la bryndza et les halušky (elle évite soigneusement le sujet, étant une brebis) : un clin d'œil possible.

---

# 12. Katka

### 🐹 Katka *(marmotte, déjà dans Kids)*

Katka était, dans Kids, la petite sœur de **Maťo** (et non de Ján), 8 ans.

Quelques années plus tard, elle n'est plus une petite fille.

C'est précisément ce qui peut être amusant.

Les autres continuent parfois à la considérer comme « la petite Katka ».

Elle, évidemment, déteste ça.

Elle peut être devenue :

- très autonome ;
- plus directe ;
- très connectée ;
- sarcastique ;
- probablement beaucoup moins impressionnée par les adultes.

Elle peut également avoir une relation particulière avec Andrea. *(Dans Kids, Andrea est dite « cousine de Katka et Maťo » dans `Progression-enfants.md` et « ton amie » dans le README : à harmoniser, Q10.)*

> *Remarque : le gag de « la petite Katka » marche d'autant mieux qu'elle a 13 ans et non 18 (voir Q1).*

---

# 12 bis. Maťo

### 🐻 Maťo *(ours, grand frère de Katka, déjà dans Kids ; absent du brouillon)*

Maťo avait 9 ans dans Kids : ours, calme, grand frère de Katka.

Il est le grand oublié du brouillon. Plusieurs options :

- il fait partie du groupe (un ours de 14 ans dans un train, ça donne des situations) ;
- il reste dans les Tatras avec Babka Zuzana, et ne réapparaît que dans les épisodes consacrés au village d'enfance ;
- il a changé de rôle (par exemple, c'est lui qui a quitté les Tatras pour travailler).

À décider (Q7).

---

# 13. Marek

### 🦡 / 🐗 Marek *(nouveau personnage, pas dans Kids)*

> *Dans le brouillon, Marek est le « collègue d'Andrea ». Cette relation vient du cours adulte et n'a pas de sens ici. Je propose de le garder comme **adulte** (ou jeune adulte) rencontré en chemin, ce qui permet la fonction visée ci-dessous sans retomber sur le piège « gentils animaux contre méchants humains ».*

Marek peut représenter le lien avec :

- le monde du travail ;
- les entreprises ;
- la ville ;
- les infrastructures ;
- les décisions prises par les adultes.

Il n'est pas nécessaire d'en faire un méchant.

Au contraire, il serait plus intéressant s'il était parfois lui-même pris entre plusieurs contraintes.

Il peut comprendre certains problèmes mais travailler malgré tout pour une entreprise qui contribue à ces mêmes problèmes.

Cela évite une opposition trop simple :

```text
gentils animaux
      VS
méchants humains
```

Le monde doit être plus ambigu.

*Animal : blaireau 🦡 ou sanglier 🐗, les deux sont libres. Âge, lien avec le groupe : Q9.*

---

# 14. Un groupe, pas une équipe de super-héros

Les personnages ne doivent pas devenir une sorte de « bande de héros écologistes ».

Ils voyagent ensemble parce qu'ils sont amis, parce qu'ils ont des raisons personnelles d'avancer, et parce que leurs chemins se recroisent.

Ils peuvent être :

- solidaires ;
- parfois égoïstes ;
- parfois lâches ;
- parfois courageux ;
- parfois complètement dépassés.

Ils ne savent pas toujours quoi faire.

Ils apprennent en chemin.

C'est précisément ce qui permet à l'apprenant de s'identifier à eux.

---

# 15. Le monde étrange des catastrophes

Les séries peuvent être construites autour de problèmes qui deviennent progressivement plus importants.

Quelques idées :

## Sécheresse

💧

Le seul point d'eau d'une région disparaît progressivement.

Les animaux qui en dépendent doivent partir.

Vocabulaire :

- eau ;
- sécheresse ;
- rivière ;
- source ;
- boire ;
- manquer ;
- chercher ;
- chaleur ;
- nature.

---

## Inondations

🌧️🌊

Après une période de sécheresse, des pluies extrêmement fortes provoquent des inondations.

Cela permet notamment :

- météo ;
- danger ;
- secours ;
- déplacements ;
- logement ;
- entraide.

---

## Tempête dans les Tatras

🌬️⛰️

Le groupe traverse les montagnes et se retrouve bloqué par une tempête.

Cette série peut être particulièrement riche en vocabulaire de montagne.

---

## La route

🛣️

Une nouvelle route doit traverser une zone naturelle.

Les personnages découvrent les travaux.

Il faut :

- contourner ;
- traverser ;
- attendre ;
- comprendre ;
- discuter ;
- protester ;
- négocier.

---

## Le datacenter

🏗️💻

Un gigantesque datacenter est construit à l'endroit où se trouvait une zone humide.

C'était l'un des derniers endroits où il restait de l'eau.

Les grenouilles ont disparu.

Le problème permet de parler de :

- informatique ;
- énergie ;
- eau ;
- construction ;
- entreprise ;
- emplois ;
- environnement.

Et surtout de montrer qu'une situation peut avoir **des avantages et des conséquences négatives simultanément**.

---

## La mine de lithium

⛏️🔋

Une mine ouvre dans une région où vivaient les écureuils.

Ils doivent partir.

Le sujet permet d'aborder :

- industrie ;
- ressources ;
- batteries ;
- énergie ;
- travail ;
- économie ;
- territoire ;
- conflit.

Là encore, pas de méchant caricatural.

Le lithium est utile.

La mine crée des emplois.

Mais elle transforme aussi le territoire.

Les personnages doivent apprendre à réfléchir à cette contradiction.

> *Précautions pour les sujets réels : entreprises et projets **fictifs** (pas de nom d'entreprise réelle, pas de projet réel nommé) ; faits locaux vérifiés quand on s'appuie sur un lieu réel (voir la remarque sur Banská Štiavnica en §0.1 n° 12 et en Q17). Cohérent avec la ligne éditoriale du cours : pas de figures politiques en dialogue, plusieurs points de vue.*

---

# 16. Une aventure qui devient progressivement plus grande

Le début doit rester relativement personnel.

```text
Košice
  ↓
« On doit aller quelque part. »
```

Puis :

```text
« Il y a un problème dans notre région. »
```

Puis :

```text
« Ce problème n'est peut-être pas isolé. »
```

Puis :

```text
« Pourquoi tout cela arrive-t-il ? »
```

Et finalement :

```text
« Il faut faire quelque chose. »
```

Le voyage vers Bratislava devient alors progressivement une quête.

---

# 17. Le château de Bratislava

🏰

Le château est l'objectif final du parcours.

Pas nécessairement parce qu'il contient un trésor.

Pas parce que les personnages doivent sauver le monde avec une formule magique.

Ils veulent atteindre Bratislava parce qu'ils pensent que c'est là qu'ils pourront **être entendus**.

Le château devient ainsi un symbole :

> arriver au centre du pouvoir / de la décision / de la capitale.

La signification exacte du final reste volontairement ouverte.

Le « mega final exam » pédagogique pourra être construit séparément.

---

# 18. Une progression pédagogique plus avancée

Le public cible est approximativement :

**12–16 ans**

Le cours doit donc monter nettement en difficulté par rapport à Kids.

Mais il ne faut pas simplement ajouter plus de grammaire.

Il faut surtout augmenter :

- longueur des phrases ;
- variété du vocabulaire ;
- compréhension implicite ;
- dialogues naturels ;
- réemploi ;
- expression d'opinions ;
- description ;
- argumentation ;
- narration ;
- compréhension culturelle.

On pourra progressivement introduire :

- davantage de temps verbaux ;
- conditionnel ;
- subordonnées ;
- comparatifs ;
- expressions idiomatiques ;
- langage courant ;
- nuances de registre ;
- formulations pour exprimer l'accord et le désaccord.

## Ce que Kids couvre déjà (point de départ possible)

Kids s'arrête volontairement avant le passé, le futur, le conditionnel et les cas expliqués comme tels. Il couvre : *byť / mať*, les trois genres, *v / na / do* + lieu **en morceaux**, *chcem / jem / pijem*, *ísť*, *môžem* + infinitif, les adjectifs, le comparatif simple (*väčší ako*), le premier *vy*, les nombres jusqu'à 10 et un peu plus. Vocabulaire : environ 40 mots par série (7 essentiels + 2–3 complémentaires par fiche).

Si Friends est une suite, c'est de là qu'il part. Si Friends doit aussi accueillir des débutants, il lui faut son propre Kit de Survie (Q2).

## Proposition de grammaire par série *(à valider, Q19)*

Liée aux 12 étapes de la section 25, et au programme de Kids (ce qui n'y est pas traité, Friends l'introduit).

| # | Étape | Grammaire proposée |
|---|---|---|
| 01 | Košice, retrouvailles | Révision du présent ; premier passé (*bol som*, *stretli sme sa*) pour les retrouvailles ; tutoiement / vouvoiement |
| 02 | Sécheresse | Quantités et génitif de quantité (*veľa vody*, *málo vody*) ; météo ; *chýba mi* ; locatif |
| 03 | Slovenský raj | *ísť / chodiť*, prépositions de direction (*cez*, *po*, *popri*) ; impératif ; accusatif |
| 04 | Tatry, tempête | Futur (*budem*) ; *musieť / môcť* ; conditionnel (*by*) ; comparatif / superlatif |
| 05 | Retour au village d'enfance | Passé et souvenirs (*keď som bol malý*) ; datif ; expressions de temps |
| 06 | Inondations | Aspect perfectif / imperfectif (en pratique, pas en théorie) ; secours, entraide |
| 07 | Nouvelle route | Opinion, accord, désaccord (*podľa mňa*, *súhlasím*) ; *lebo / preto / pretože* |
| 08 | Datacenter | Subordonnées (*že*, *ktorý*) ; pour et contre ; concession (*aj keď*, *hoci*) |
| 09 | Mine | Hypothèse (*keby*) ; débat nuancé |
| 10 | Conséquences, choix | *mal by som* ; discours rapporté ; décisions |
| 11 | Bratislava, arrivée | Registres et *vy* ; transports, démarches |
| 12 | Château | Argumentation orale ; synthèse |

---

# 19. La culture devient une composante centrale

Chaque série devrait contenir un véritable **Coin slovaque**.

Le format Kids prévoit déjà un espace culturel dans les séries (« 🇸🇰 Coin slovaque », 2 courts paragraphes, faits **vérifiables**, mots-clés en `{{…}}`).

Dans la version ado, il peut devenir beaucoup plus riche.

Exemples :

### Košice

- centre historique ;
- cathédrale Sainte-Élisabeth ;
- vie étudiante ;
- dialectes / accents éventuels ;
- rôle de la ville dans l'est de la Slovaquie.

### Slovenský raj

- parc national ;
- sentiers ;
- échelles et passerelles ;
- paysages ;
- tourisme.

### Les Tatras

- montagne ;
- refuges ;
- tourisme ;
- symbolique des Tatras ;
- histoire de la région.

### Liptov

- villages ;
- montagne ;
- thermalisme ;
- gastronomie ;
- traditions.

### Banská Štiavnica

- histoire minière ;
- architecture ;
- patrimoine ;
- paysage culturel.

### Bratislava

- capitale ;
- Danube ;
- château ;
- vie politique ;
- architecture ;
- mélange historique et moderne.

---

# 20. Structure pédagogique d'une série

On peut conserver la structure générale de Kids tout en l'adaptant au nouveau ton.

## Fiches 01–04

Apprentissage structuré :

- vocabulaire ;
- grammaire ;
- phrases ;
- réemploi ;
- culture.

Les phrases commencent cependant à appartenir au monde de l'histoire.

> *Différence avec Kids : dans Kids (et dans le cours adulte), les fiches 01 à 04 n'ont « pas de mise en scène, pas de personnages, pas d'histoire », et seule la fiche 05 raconte. Ici, c'est un choix volontaire de faire entrer l'histoire dès les fiches d'apprentissage. À confirmer (Q22).*

## Fiche 05 — épisode

La fiche 05 devient un véritable **épisode narratif**.

Les personnages interviennent.

Le dialogue réutilise le vocabulaire et la grammaire de la série.

C'est le moment où l'apprenant comprend :

> « Ah, maintenant je comprends pourquoi j'ai appris tout ça. »

## Fiche 06 — extra

Grande consolidation :

- vocabulaire complet ;
- nouvelles phrases ;
- compréhension ;
- exercices ;
- réemploi.

La fiche 06 peut aussi préparer certains éléments de la série suivante.

> *Dans Kids, la fiche 06 est : un tableau de **tout** le vocabulaire de la série (aucun mot nouveau), puis **3 ou 4 mini-dialogues** (3 à 6 répliques) qui recombinent le vocabulaire dans des situations nouvelles ; les exercices sont écrits à la main, jamais plus difficiles que ce qui a été vu. Reprendre ce format pour Friends est naturel (Q20).*

## Règles de format héritées de Kids (à reprendre sauf avis contraire)

- Format SMD, fichiers `md/10_Series_NN_Theme_XX_titre.md`, extra en `_06_extra`. Le thème donne la clé de `subgroups` dans `lang.json`, en minuscules et sans diacritiques.
- Cartes audio : première ligne `>` = traduction naturelle, lignes `>` suivantes = décomposition **une ligne par élément**, jamais plusieurs éléments sur la même ligne ; `+` pour les remarques utiles ; dialogue avec l'avatar du locuteur **après** le `!` (`! 🐰 Ahoj!`).
- Vocabulaire cumulatif dans la série ; aucun mot inconnu non signalé ; mots nouveaux d'un dialogue toujours marqués (`+ Mot nouveau signalé : …`).
- Aucune référence à une autre série ni renvoi entre fiches.
- Consignes importantes en `{{fr:…}}` (voix française) ; **pas de mot slovaque** dans un `{{fr:…}}` (sauf prénoms des personnages).
- Prénom : `[ASK_USER_NAME]` / `[USER_NAME]` (si le renard reste l'apprenant).
- Exercices écrits à la main dans `exercises/`, `"mode": "replace"`.
- Slovaque à faire relire avec attention : la relecture de Kids a trouvé quelques calques fréquents (tableau des pièges dans `Format-enfants.md`).

---

# 21. Ton général

Le ton recherché :

**adolescent + aventure + absurde + légèrement dystopique + slovaque.**

Pas :

- post-apocalyptique hardcore ;
- survival horror ;
- cours militant ;
- humour pour adultes ;
- sitcom pour enfants.

On vise plutôt :

> **« Le monde part un peu en vrille, mais bon... on va quand même prendre le train. »**

Les personnages peuvent être sarcastiques.

Ils peuvent être parfois blasés.

Mais ils restent profondément solidaires.

## Exemples de dialogue — la bible de ton

Les échanges ci-dessous servent de référence exacte pour le caractère des personnages et la mécanique des dialogues. Ils sont à conserver tels quels.

### Scène de référence

> 🐰 Andrea : Les renards sont vraiment compliqués.
>
> 🦊 : Je suis pourtant assez simple.
>
> 🐰 : Non.
>
> 🦊 : Ah.
>
> 🐰 : Voilà.
>
> 🦊 : Bon... on attend la fin du monde ?
>
> 🐰 : Avec toi ?
>
> 🦊 : Oui.
>
> 🐰 : Pffff... t'es bête.
>
> 🦊 : Alors ?
>
> 🐰 : Alors quoi ?
>
> 🦊 : Tu restes ?
>
> 🐰 : Évidemment.
>
> 🦊 : Je savais.
>
> 🐰 : Ne prends pas tes rêves pour des réalités.
>
> 🦊 : Trop tard.
>
> 🐰 : Je ne comprendrai jamais les renards.
>
> 🦊 : Moi non plus.
>
> 🐰 : Quoi ?
>
> 🦊 : Les renards ne comprennent jamais rien aux lapins.
>
> 🐰 : Je suis une hase.
>
> 🦊 : C'est encore plus compliqué.

### Ce que cette scène impose

- des répliques ultra-courtes, en ping-pong : une phrase suffit souvent (« Non. » / « Ah. » / « Voilà. ») ;
- une affection jamais explicitée : c'est le lecteur qui déduit la tendresse sous le sarcasme ;
- la catastrophe en toile de fond, la blague au premier plan ;
- des running gags à recycler : « hase vs lapin », « les renards sont des extraterrestres », « attends la fin du monde avec toi » ;
- un absurde tranquille, jamais noir : le monde peut partir en vrille, l'essentiel est de savoir qui reste à côté de nous.

### Utilisation pédagogique

Ces répliques sont courtes, naturelles et réutilisables presque telles quelles en slovaque. Elles sont parfaites pour la fiche 05 (épisode) — par exemple un moment calme juste avant la tempête dans les Tatras. Les jeux de mots (« hase » / « lapin », les rêves contre les réalités) devront être testés directement en slovaque : si un gag ne survit pas à la traduction, il faut l'écrire d'abord en slovaque, puis le retraduire en français.

### Test de traduction en slovaque *(brouillon, à faire relire par un locuteur natif)*

J'ai fait l'essai sur les répliques clés. Bonne nouvelle : **le gag hase / lapin survit**, parce que le slovaque distingue lui aussi *zajac* (lièvre) et *králik* (lapin). Mauvaise nouvelle : le **genre** s'invite dans presque toutes les répliques du renard, et dans celles d'Andrea qui s'adressent à lui.

| Français | Slovaque (brouillon) | Remarque |
|---|---|---|
| Les renards sont vraiment compliqués. | Líšky sú naozaj komplikované. | *líška* est féminin : « les renards » = *líšky*, sans souci. |
| Je suis pourtant assez simple. | Ja som pritom celkom jednoduchý. / jednoduchá. | **Genre du renard obligatoire.** |
| Je savais. | Vedel som to. / Vedela som to. | **Genre du renard obligatoire.** |
| Pffff... t'es bête. | Ty si hlúpy. / hlúpa. | **Genre du renard** (dit par Andrea). |
| Je veux bien attendre la fin du monde avec toi ! | S tebou by som na koniec sveta rád počkal. / rada počkala. | **Genre du renard** (réplique à conserver texto). |
| Les renards ne comprennent jamais rien aux lapins. | Líšky nikdy nepochopia králikov. | OK |
| Je suis une hase. | Ja som zajačica, nie králik. | Le « nie králik » est un ajout possible (la blague est dans le contraste). |
| C'est encore plus compliqué. | To je ešte komplikovanejšie. | OK |
| Moi non plus. | Ani ja. | OK |

Conséquence : tant que le genre du renard n'est pas fixé, il est **impossible d'écrire le moindre dialogue** de Friends en slovaque. C'est la décision la plus bloquante (Q5).

---

# 22. Le contraste avec Kids

Le lien avec Kids est important.

Le nouveau cours doit parfois faire ressentir :

> « Ils étaient vraiment mignons quand ils étaient petits. »

Mais sans nécessiter d'avoir suivi Kids pour comprendre l'histoire.

Quelques références peuvent être discrètes :

- un ancien lieu ;
- une vieille photo ;
- un souvenir ;
- une expression ;
- un objet ;
- une blague entre personnages.

Pistes tirées de Kids : la peur d'Andrea devant le renard (*Bála som sa!*), les baies, les terriers et les nids de Doma, la bryndza que Babka Zuzana évite, la marmotte qui siffle pour prévenir, le village et sa commerçante, le parc et son gardien.

L'ancien monde des personnages existe dans leur mémoire.

Il n'a pas besoin d'être constamment expliqué à l'apprenant.

---

# 23. Direction artistique

La direction graphique peut reprendre les personnages de Kids mais les faire évoluer.

Même identité visuelle de base :

- 🦊 renard ;
- 🐰 Andrea ;
- autres personnages animaux ;
- expressions faciales simples ;
- illustrations lisibles.

Mais :

- silhouettes légèrement plus grandes ;
- vêtements adolescents ;
- accessoires ;
- sacs à dos ;
- téléphones ;
- écouteurs ;
- vêtements de randonnée ;
- vêtements urbains ;
- objets liés à leur quotidien.

Le monde peut progressivement passer :

```text
🌲 enfance
   ↓
🏙️ adolescence
   ↓
🌍 monde compliqué
```

> *Point pratique : Kids n'a **aucune illustration de personnage**. Ses images sont des photos libres de Wikimedia Commons (animaux, paysages), choisies une à une, avec crédits dans `img/credits.md`, plus des images de « style » (bandeaux de thème). Une direction artistique avec des personnages dessinés qui grandissent suppose de **produire** ces illustrations (Q25).*

---

# 24. Un principe narratif important

Les catastrophes ne doivent jamais être simplement :

> « catastrophe = méchants humains ».

Le monde doit être plus nuancé.

Un projet peut :

- créer des emplois ;
- apporter une technologie utile ;
- résoudre un problème ;
- mais provoquer ailleurs une autre conséquence.

Les personnages eux-mêmes peuvent être en désaccord.

Cela donne des dialogues beaucoup plus intéressants et permet d'apprendre à exprimer :

- son opinion ;
- son doute ;
- son accord ;
- son désaccord ;
- une concession ;
- une hypothèse ;
- une proposition.

Ce sont précisément des compétences linguistiques adaptées à un public adolescent.

---

# 25. Premières séries possibles

La liste reste indicative et sera affinée.

| # | Lieu | Événement / thème |
|---|---|---|
| 01 | Košice | Retrouvailles et départ |
| 02 | Košice / Est | Sécheresse et manque d'eau |
| 03 | Slovenský raj | La recherche d'eau |
| 04 | Les Tatras | Tempête |
| 05 | Les Tatras | Retour vers le village d'enfance |
| 06 | Liptov | Inondations |
| 07 | Liptov | Nouvelle route |
| 08 | Région centrale | Datacenter et disparition de la zone humide |
| 09 | Banská Štiavnica | Mine de lithium |
| 10 | Centre de la Slovaquie | Conséquences / choix |
| 11 | Bratislava | Arrivée dans la capitale |
| 12 | Bratislava | Château |

Cette structure n'est **pas définitive**.

Le nombre exact de séries, leur ordre et les événements doivent être construits en parallèle avec la progression linguistique.

Remarques :

- 12 séries de 6 fiches font **72 fiches**, soit plus que Kids (7 séries) ; le cours adulte en compte 9 séries (54 fiches). À mettre en regard de la quantité de travail (Q18).
- Les séries 03 (recherche d'eau) et 06 (inondations) pourraient se rapprocher dans l'ordre du récit ; l'arc « sécheresse puis déluge » est joli mais éloigne ses deux moitiés de quatre séries. À voir lors du séquençage.
- Les séries 08 et 10 sont situées en « région centrale » sans lieu précis ; des étapes réelles existent (Zvolen, Banská Bystrica, Žiar nad Hronom…), à choisir (Q18).
- Nom court (clé de sous-groupe et nom de fichier) à fixer pour chaque série, sur le modèle de Kids (*Rodina*, *Doma*, *Jedlo*…), par exemple `Retrouvailles`, `Sucho`, `Raj`, `Burka`…, puis `10_Series_01_Nom_01_titre.md`.

---

# 26. Une évolution possible des personnages

Une idée particulièrement intéressante serait de faire évoluer les personnages **en même temps que l'apprenant**.

Au début :

> « On ne sait pas vraiment ce qu'on va faire. »

Au milieu :

> « On commence à comprendre le problème. »

Vers la fin :

> « On doit décider ce qu'on veut défendre. »

Mais sans transformer le cours en morale.

Les personnages peuvent finir par comprendre qu'ils ne vont probablement pas « sauver le monde ».

Ils peuvent simplement réussir à :

- faire entendre leur voix ;
- aider quelques animaux ;
- convaincre quelques personnes ;
- changer une petite chose.

Et cela peut être présenté comme une vraie victoire.

---

# 27. Questions du brouillon qui trouvent leur réponse dans Kids

Ces questions du §27 de la v0.1 sont **résolues** :

| Question | Réponse (source : Kids) |
|---|---|
| Quel animal devient Katka ? | Une **marmotte 🐹** (déjà dans Kids). |
| Babka Zuzana reste-t-elle humaine ou devient-elle un animal ? | C'est déjà une **brebis 🐑**. |
| Quel animal devient Ján ? | N'existe pas dans Kids : à choisir (proposition 🐿️, Q8). |
| Quel animal devient Marek ? | N'existe pas dans Kids : à choisir (🦡 ou 🐗, Q9). |
| Tous les personnages de Kids doivent-ils réapparaître ? | Il y en a 7, pas 6 : 🦊, 🐰, 🐹, 🐻, 🐑, 🦔, 🦅. Non, pas forcément (Q7, Q11). |
| Quel âge avaient-ils dans Kids ? | Andrea 11, Maťo 9, Katka 8, le renard 10. |
| Où vivent-ils ? | Dans Kids : terriers, tanières et nids dans les Tatras (série Doma). |

Les autres questions sont reprises et complétées en section 29.

---

# 28. Principe directeur

Le projet peut finalement se résumer ainsi :

> **Slovingo Kids leur apprenait à découvrir le monde.**
>
> **Slovingo Friends leur apprend à comprendre le monde.**

Mais ils restent les mêmes personnages au fond.

Ils ont simplement grandi.

Et maintenant, ils traversent la Slovaquie ensemble.

🦊🐰

**Košice → les Tatras → Liptov → Banská Štiavnica → Bratislava → 🏰**

---

# 29. Questions restantes (à compléter par Eric)

Chaque question a une **proposition** de ma part. Si elle te va, écris simplement « OK ». Les questions marquées 🔴 bloquent l'écriture de la première série.

## A. Chronologie et public

**Q1 🔴 — Écart de temps et âges.** Le brouillon dit « dix ans plus tard » **et** « ados de 12–16 ans », ce qui est incompatible avec Kids (Andrea 11, renard 10, Maťo 9, Katka 8 : dix ans plus tard, ils ont 18 à 21 ans).
*Proposition : environ **5 ans**. Andrea 16, renard 15, Maťo 14, Katka 13. Ça colle avec le public (l'enfant qui a fait Kids à 10 ans fait Friends à 14–15 ans), ça rend le gag de « la petite Katka » plus drôle, et ça permet d'avoir un décor de lycée ou d'internat à Košice plutôt qu'un marché de l'emploi.*
Réponse :

**Q2 🔴 — Débutants ou continuité ?** Friends suppose-t-il Kids acquis (niveau A1 terminé) ou doit-il accueillir des ados qui n'ont jamais fait de slovaque ? « Sans avoir suivi Kids pour comprendre l'histoire » (§22) ne dit rien du niveau de langue.
*Proposition : Friends **accueille des débutants**, avec un court Kit de Survie ado (3–4 fiches : salutations, politesse, se présenter, dire qu'on ne comprend pas) et une série 01 qui ne suppose rien. Les connaisseurs de Kids avancent plus vite, c'est tout.*
Réponse :

**Q3 — Nom du cours et de l'app.** « Cours ados » (titre), « Slovingo Teens » (§28 du brouillon), repo `Slovingo-sk-fr-friends`. Et l'app : Kids s'appelle Zajka, d'après le petit nom d'Andrea.
*Proposition : « Slovingo Friends » partout dans la doc. Pour l'app, un nom slovaque, comme Zajka, qui évoque le renard ou le voyage. Et un `code de langue` (`sk-fr-friends`), `storage_prefix` et `url_path` dans `lang.json` sur le modèle de Kids.*
Réponse :

## B. Le renard

**Q4 🔴 — Qui est le renard ?** Dans Kids, 🦊 est **toi** : l'élève, avec son prénom (`[USER_NAME]`) et sans personnalité propre. Le brouillon en fait un personnage à part entière : ironique, tendre, avec des répliques à garder texto, et un passé avec Andrea. On ne peut pas avoir les deux : un personnage avec une personnalité qui s'appelle `[USER_NAME]`, c'est étrange.
*Proposition : le renard devient un **personnage fixe avec un nom** (à choisir), et l'apprenant n'est plus « le renard » mais celui qui regarde, comme dans le cours adulte. Garde `[USER_NAME]` seulement pour les rares moments d'adresse directe (« [USER_NAME], on y va ? »). Alternative : garder le renard = apprenant, mais alors sa personnalité devient celle que l'élève lui prête, ce qui complique l'écriture.*
Réponse :

**Q5 🔴 — Quel genre pour le renard ?** Dans Kids, aucune forme genrée pour 🦊 (règle stricte). En slovaque, le passé, le conditionnel et beaucoup d'adjectifs sont genrés : la scène de référence est inécrivable sans choix (voir le test en §21), et les répliques **d'Andrea** envers lui sont aussi touchées (« Ty si hlúpy / hlúpa »). Options :
- **A.** Renard garçon fixe.
- **B.** Renard fille fixe.
- **C.** Le genre est choisi par l'apprenant au début (comme le prénom) : le moteur a `[USER_NAME]` mais pas encore de texte conditionnel au genre, il faudrait le développer.
- **D.** Rester neutre comme Kids : possible, mais très contraignant pour des ados qui doivent apprendre le passé.

*Proposition : **A ou B** (fixer, simple, assumé : le cours adulte fait déjà ce choix pour son apprenante), et dire clairement que l'apprenant apprend « la forme d'un personnage », avec une remarque pour la forme de l'autre genre. **C** n'a de sens que si tu es prêt à investir dans le moteur.*
Réponse :

**Q6 — Âge du renard.** Kids le fait dire « Mám desať rokov ». Si Q1 = 5 ans, il a 15 ans. À confirmer avec Q1.
Réponse :

## C. Personnages

**Q7 — Maťo.** Absent du brouillon, présent dans Kids (ours, frère de Katka, 9 ans). Dans le groupe, au village avec Babka Zuzana, ou autre ?
*Proposition : il reste au village des Tatras avec Babka Zuzana et n'apparaît qu'aux épisodes du village d'enfance (série 05), avec un rôle qui lui est propre.*
Réponse :

**Q8 — Ján.** Nouveau personnage : rencontré à Košice, ou membre de la bande en Kids ? Animal : 🐿️ écureuil (libre)? Lien avec la mine (écureuils qui partent) ?
*Proposition : rencontré à Košice, 🐿️ écureuil, la mine est pour lui une raison personnelle de voyager (sans qu'il devienne militant).*
Réponse :

**Q9 — Marek.** Garde-t-on Marek ? Si oui : adulte ou jeune adulte, animal (🦡 ou 🐗), comment rejoint-il le groupe, et quelle fonction (travail, entreprise, ville) ?
*Proposition : oui, 🦡 blaireau, adulte, rencontré à partir de la série 07 ou 08, travaille pour l'entreprise du datacenter ou de la mine, tiraillé.*
Réponse :

**Q10 — Andrea et Katka : lien de parenté.** Le README de Kids dit « ton amie », `Progression-enfants.md` dit « cousine de Katka et Maťo ». À harmoniser dans Kids, mais je veux savoir ce qu'on retient pour Friends.
*Proposition : cousine (ça explique pourquoi elles se connaissent depuis toujours, et la « relation particulière » du §12).*
Réponse :

**Q11 — Pani Ježková (🦔) et Pán Orol (🦅).** Les deux sont vouvoyés dans Kids. Cameos ?
*Proposition : oui, brièvement ; ils sont de bons supports pour le vy et pour des clins d'œil (le gardien du parc peut apparaître dans la série sécheresse).*
Réponse :

**Q12 — Les humains.** Aucun humain dans Kids. Existent-ils depuis toujours « hors champ » ? Comment les représente-t-on (emoji, pas de tête d'animal) ? Sont-ils tous vouvoyés ? Sont-ils nombreux ou rares ?
*Proposition : ils existaient hors champ (parc national, chemins, routes), apparaissent à partir de la série 02 avec un emoji humain, sont vouvoyés par les ados s'ils sont adultes. Seuls les animaux principaux ont un prénom, les humains sont désignés par leur fonction (*vodič*, *úradníčka*…).*
Réponse :

## D. Récit

**Q13 — Pourquoi se sont-ils perdus de vue, et pourquoi sont-ils à Košice ?** (questions du §27 : « Pourquoi le renard et Andrea se sont-ils réellement perdus de vue ? », « Pourquoi sont-ils tous les deux à Košice ? », « Que faisaient-ils avant ? »)
*Proposition (si Q1 = 5 ans) : leurs familles ont quitté les Tatras à des moments différents, faute de travail ; Andrea est à Košice depuis deux ans (lycée), le renard vient d'arriver. Ils se croisent dans un couloir ou un tram.*
Réponse :

**Q14 — Événement déclencheur du départ.** Quelle nouvelle situation les oblige à reprendre la route ?
*Proposition : le seul point d'eau près de chez eux disparaît (le début de la série 02), ou le lycée ferme. À toi de voir ce qui est le plus fort.*
Réponse :

**Q15 — Objectif initial, et ce que cherchent-ils à obtenir au château ?** (§17 dit « être entendus », mais par qui, pour dire quoi ?)
*Proposition : un objectif de départ très concret (porter une lettre, retrouver quelqu'un, rapporter de l'eau) qui s'agrandit en cours de route ; au château, une audience ou une pétition, qui aboutit à « un petit changement » (§26).*
Réponse :

**Q16 — Ton : limites.** (« Jusqu'où aller dans l'humour noir ? dans la dystopie ? »)
*Proposition (cohérente avec §21) : pas d'humour noir sur la mort, dystopie « douce » (le monde se dégrade sans que personne ne meure à l'écran), réalisme de la vie quotidienne, absurde dosé (la règle des animaux qui parlent suffit).*
Réponse :

**Q17 — Faits réels et fiction.** Lithium à Banská Štiavnica (voir §0.1 n° 12), zone humide et datacenter : on garde les lieux réels, on invente des noms de sites et d'entreprises ?
*Proposition : lieux réels pour les étapes (villes, parcs), **sites et entreprises fictifs** pour les catastrophes, et pour le lithium, on déplace ou on invente un lieu plausible (ou on met la mine dans le Gemer).*
Réponse :

**Q18 — Étapes et nombre de séries.** Étapes 08 et 10 (« région centrale ») : quels lieux ? Et 12 séries (72 fiches), est-ce l'objectif ou une borne haute ?
*Proposition : Zvolen ou Banská Bystrica pour la région centrale ; commencer par **les 4 premières séries** (Košice, sécheresse, Slovenský raj, Tatry) et écrire le reste ensuite, comme Kids l'a fait.*
Réponse :

## E. Pédagogie

**Q19 — Grammaire par série.** Le tableau de la §18 te convient-il ? Niveau visé à la fin du cours (A2 ? B1 ?) ?
*Proposition : valider le tableau comme point de départ, et viser **un bon A2** à la fin de la série 12.*
Réponse :

**Q20 — Volume.** Mots par fiche (Kids : 6–7 essentiels + 2–3 complémentaires ; ≈ 40 mots par série), longueur des dialogues (Kids : 10–15 répliques ; la scène de référence en compte 24, très courtes), format de la fiche 06 (Kids : 3–4 mini-dialogues).
*Proposition : 9–10 essentiels + 3 complémentaires par fiche ; dialogues de 15–25 répliques ; fiche 06 comme dans Kids (mini-dialogues), exercices écrits à la main.*
Réponse :

**Q21 — Aucun mot nouveau dans la 06, trois au maximum dans le dialogue.** Règles strictes de Kids : on garde ?
*Proposition : oui pour la 06 ; 5 maximum pour un dialogue de 05.*
Réponse :

**Q22 — L'histoire dès les fiches 01–04 ?** Contrairement à Kids et au cours adulte, le brouillon veut que les phrases des fiches d'apprentissage appartiennent déjà à l'histoire (§20). Confirmé ?
*Proposition : oui, mais sans dialogue suivi : seule la 05 raconte, les fiches 01–04 utilisent des **phrases autonomes** qui parlent des personnages et du décor.*
Réponse :

**Q23 — Clins d'œil à Kids.** Combien d'explications données à l'apprenant qui n'a pas fait Kids ?
*Proposition : aucune explication ; une allusion doit se comprendre seule (comme la règle « aucune référence entre séries »).*
Réponse :

## F. Technique et production

**Q24 — La carte.** Réutiliser la carte du moteur telle quelle ? Emojis par étape (liste du §4) : configurables dans `lang.json` ? Brouillard, validation, position du renard : le comportement du §4 (position = dernière fiche consultée) est-il celui voulu, ou celui de l'implémentation actuelle ?
*Proposition : réutiliser la carte, et voir à l'usage ce qui manque.*
Réponse :

**Q25 — Illustrations.** Photos libres Wikimedia comme Kids (choisies une par une, avec crédits), ou illustrations dessinées des personnages (§23) ? Dans ce second cas, qui les produit, dans quel style, et comment fait-on évoluer le style de Kids à Friends ?
*Proposition : photos libres pour les fiches (paysages, villes, animaux), et **un petit jeu d'illustrations de personnages** (6–8 images) réservées aux épisodes (fiches 05). On voit plus tard.*
Réponse :

**Q26 — Voix.** Un dialogue peut avoir une voix par personnage (réglage `character_headings`). Le cours étant en français, l'en-tête de la liste des personnages est « Les personnages » (comme Kids). Voulez-vous des voix différentes pour Andrea, le renard, Ján… ?
*Proposition : oui si le moteur le permet pour les voix slovaques disponibles ; sinon une seule voix slovaque.*
Réponse :

---

## Prochaines étapes (à discuter après tes réponses)

1. Fixer Q1, Q2, Q4, Q5 (ce sont les décisions qui conditionnent tout le reste).
2. Mettre ce document à jour (v0.3) avec tes réponses.
3. Écrire `docs/Format-friends.md` (reprise de `Format-enfants.md` avec les écarts de cette page) et `docs/Progression-friends.md` (vocabulaire et grammaire par série).
4. Créer `lang.json` du cours et la structure `md/`, `exercises/`, `img/`.
5. Écrire la **série 01** en entier, relire, puis décider du rythme pour la suite.
