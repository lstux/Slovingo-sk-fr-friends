(function (root) {
  'use strict';
  const C = root.ZajkoCommon, Q = root.ZajkoQuest;
  // Le jeu s'appelait « Zajka » : on recopie une fois les anciennes cles du navigateur
  // (sauvegarde, volume) vers les nouvelles, pour ne pas perdre les parties en cours.
  try {
    for (const [o, n] of [['zajkaquest', 'zajkoquest'], ['zajkaquest.volume', 'zajkoquest.volume']]) {
      const v = root.localStorage.getItem(o);
      if (v !== null && root.localStorage.getItem(n) === null) root.localStorage.setItem(n, v);
    }
  } catch (e) { /* stockage refuse */ }
  const A = Q.buildAssets(root.ZQ_DATA, root.ZQ_COURSE);
  const audio = new C.Audio(root.ZQ_AUDIO, 2);
  const game = new Q.Game(A);
  game.begin(audio, new Q.BrowserByteStorage('zajkoquest'));
  C.boot({ game, audio, volumeKey: 'zajkoquest.volume' });
})(globalThis);
