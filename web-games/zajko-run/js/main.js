(function (root) {
  'use strict';
  const C = root.ZajkoCommon, R = root.ZajkoRun;
  // Le jeu s'appelait « Zajka » : on recopie une fois les anciennes cles du navigateur
  // (sauvegarde, volume) vers les nouvelles, pour ne pas perdre les parties en cours.
  try {
    for (const [o, n] of [['zajkarun', 'zajkorun'], ['zajkarun.volume', 'zajkorun.volume']]) {
      const v = root.localStorage.getItem(o);
      if (v !== null && root.localStorage.getItem(n) === null) root.localStorage.setItem(n, v);
    }
  } catch (e) { /* stockage refuse */ }
  const assets = R.buildAssets(root.ZR_DATA);
  const audio = new C.Audio(root.ZR_AUDIO, 2);
  const game = new R.Game(assets);
  game.begin(audio, new C.BrowserStorage('zajkorun'));
  C.boot({ game, audio, volumeKey: 'zajkorun.volume' });
})(globalThis);
