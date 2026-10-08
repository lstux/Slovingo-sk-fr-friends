# Zajka Friends 🇸🇰 🇫🇷

🌐 **Le cours en ligne : [lstux.github.io/Slovingo-sk-fr-friends](https://lstux.github.io/Slovingo-sk-fr-friends/)**

Apprendre le slovaque en voyageant de Košice à Bratislava — un récit en dialogues, pour les ados (12-16 ans).

## 🌐 Déploiement (GitHub Pages)

À chaque push sur `main`, le workflow `.github/workflows/pages.yml` construit le site avec le moteur [Slovingo](https://github.com/lstux/Slovingo) et le publie sur **https://lstux.github.io/Slovingo-sk-fr-friends/**. L'`url_path` est adapté au moment du build (sans modifier `lang.json` dans le repo). L'activation de Pages est faite automatiquement au premier déploiement.

Le workflow `build-release.yml` (release tarball, à lancer à la main) reste en place.

---

*Slovingo est libre et open-source, sous licence [GPL-3.0](./LICENSE).*
