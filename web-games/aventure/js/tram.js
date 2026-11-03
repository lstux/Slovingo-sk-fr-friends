// Scene 1 : « V električke » (le tram de Košice). Textes et geometrie sont des donnees : on peut tout changer ici.
// Images : voir art/PROMPTS.md. Zones : tools/editor.html dessine les polygones sur l'image et les exporte.
// Les lignes SK/FR sont une premiere ecriture a relire (elles s'inspirent de la serie « Košice » du cours).
globalThis.ZA_DATA = {
  title: 'Zajko — V električke',
  start: 'tram',
  characters: {
    narrator: { name: '', color: '#8a86a8' },
    fox: { name: 'Ty', icon: '🦊', color: '#e8742a' },
    andrea: { name: 'Andrea', icon: '🐰', color: '#6cc79a' },
    revizor: { name: 'Revízor', icon: '🎫', color: '#4a6ac0' },
  },
  items: {
    listok: { sk: 'lístok', fr: 'ticket', icon: 'art/item_listok.svg' },
    listok_ok: { sk: 'označený lístok', fr: 'ticket validé', icon: 'art/item_listok_ok.svg' },
  },
  scenes: {
    tram: {
      bg: 'art/tram.svg',
      player: 'fox',
      floor: [[30, 590], [1250, 590], [1270, 700], [10, 700]],
      scale: { y0: 590, s0: 0.86, y1: 700, s1: 1.06 },
      // la ville qui defile derriere les vitres
      layers: [
        { img: 'art/scenery.svg', clip: [[407, 157], [753, 157], [753, 393], [407, 393]], speed: 220, mirror: true },
        { img: 'art/scenery.svg', clip: [[827, 157], [1173, 157], [1173, 393], [827, 393]], speed: 220, mirror: true },
      ],
      sprites: [
        { id: 'andrea', img: 'art/andrea.png', x: 960, y: 655, h: 330, face: -1 },
        { id: 'fox', img: 'art/fox.png', x: 380, y: 655, h: 325, speed: 320 },
      ],
      extraSprites: { revizor: { img: 'art/revizor.svg', x: 1250, y: 655, h: 345, hidden: true, speed: 240 } },
      hotspots: [
        { id: 'door', name: { sk: 'dvere', fr: 'les portes' }, poly: [[30, 130], [210, 130], [210, 560], [30, 560]], walk: [130, 650],
          async onUse(g) {
            if (!g.flag('checked')) { await g.say('fox', 'Ešte nie. Električka ide.', 'Pas encore. Le tram roule.', [['dvere', 'les portes']]); return; }
            await g.say('fox', 'Vystupujeme!', 'On descend !');
            g.end('Koniec ukážky', 'Fin de l\'aperçu');
          } },
        { id: 'validator', name: { sk: 'označovač', fr: 'le composteur' }, poly: [[240, 395], [330, 395], [330, 505], [240, 505]], walk: [285, 650],
          look: { sk: 'Označovač lístkov. Tu označím lístok.', fr: 'Le composteur de tickets. C\'est ici que je valide mon ticket.', words: [['označovač', 'le composteur']] },
          onItem: {
            async listok(g) {
              g.take('listok'); g.give('listok_ok'); g.setFlag('stamped');
              await g.say('narrator', 'Cink! Lístok je označený.', 'Clac ! Le ticket est validé.', [['označený', 'validé']]);
              await inspect(g);
            },
          } },
        { id: 'display', name: { sk: 'displej', fr: 'l\'afficheur' }, poly: [[560, 40], [800, 40], [800, 105], [560, 105]], walk: [680, 650],
          look: { who: 'narrator', sk: 'Ďalšia zastávka: Staničné námestie.', fr: 'Prochain arrêt : Staničné námestie.', words: [['ďalšia zastávka', 'le prochain arrêt']] } },
        { id: 'windows', name: { sk: 'okno', fr: 'la fenêtre' }, poly: [[400, 150], [760, 150], [760, 400], [400, 400]], walk: [580, 640],
          look: { sk: 'Košice sú super!', fr: 'Košice, c\'est super !', words: [['okno', 'la fenêtre']] } },
        { id: 'windows2', name: { sk: 'okno', fr: 'la fenêtre' }, poly: [[820, 150], [1180, 150], [1180, 400], [820, 400]], walk: [1000, 640],
          look: { sk: 'Pozri, mesto ide okolo!', fr: 'Regarde, la ville défile !' } },
        { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [850, 660],
          async onUse(g) {
            if (!g.flag('stamped')) await g.say('andrea', 'Označ si lístok! Označovač je pri dverách.', 'Valide ton ticket ! Le composteur est près des portes.', [['pri dverách', 'près des portes']]);
            else if (g.flag('checked')) await g.say('andrea', 'Vystupujeme na ďalšej zastávke.', 'On descend au prochain arrêt.');
            else await g.say('andrea', 'Dobre, lístok je v poriadku.', 'Bien, le ticket est en ordre.');
          } },
      ],
      async onEnter(g) {
        if (!g.flag('intro')) {
          g.setFlag('intro');
          g.give('listok');
          await g.say('narrator', 'Električka ide cez Košice.', 'Le tram traverse Košice.', [['električka', 'le tram']]);
          await g.say('andrea', 'Nezabudni označiť lístok. Revízor tu býva často.', 'N\'oublie pas de valider ton ticket. Le contrôleur est souvent là.',
            [['označiť lístok', 'valider un ticket'], ['revízor', 'le contrôleur']]);
        }
        // sans listok valide a temps, le controleur arrive de toute facon
        if (!g.flag('stamped')) g.after(50000, async (g2) => { if (!g2.flag('stamped')) await fine(g2); });
      },
    },
  },
};

// le controleur : il entre, demande les tickets, repart
async function inspect(g) {
  const r = g.spawn('revizor', 1250, 655);
  g.face('revizor', -1);
  await g.walk('revizor', 900, 655);
  await g.say('revizor', 'Dobrý deň. Lístky na kontrolu, prosím.', 'Bonjour. Contrôle des tickets, s\'il vous plaît.', [['kontrola', 'le contrôle']]);
  for (;;) {
    const i = await g.choice([
      { sk: 'Dobrú noc.', fr: 'Bonne nuit.' },
      { sk: 'Tu je môj lístok.', fr: 'Voici mon ticket.' },
      { sk: 'Ďakujem, dovidenia.', fr: 'Merci, au revoir.' },
    ]);
    if (i === 1) break;
    await g.say('revizor', 'Prosím? Lístok, prosím.', 'Pardon ? Le ticket, s\'il vous plaît.');
  }
  await g.say('fox', 'Tu je môj lístok.', 'Voici mon ticket.');
  await g.say('revizor', 'Je v poriadku. Ďakujem.', 'C\'est en ordre. Merci.', [['v poriadku', 'en ordre']]);
  await g.walk('revizor', 1250, 655);
  g.hide('revizor');
  g.setFlag('checked');
  await g.say('narrator', 'Električka zastavuje.', 'Le tram s\'arrête.');
  await g.say('andrea', 'Vystupujeme na ďalšej zastávke.', 'On descend au prochain arrêt.');
  return r;
}

// pas de ticket valide : une amende, et on recommence
async function fine(g) {
  g.spawn('revizor', 1250, 655);
  g.face('revizor', -1);
  await g.walk('revizor', 900, 655);
  await g.say('revizor', 'Dobrý deň. Lístky na kontrolu, prosím.', 'Bonjour. Contrôle des tickets, s\'il vous plaît.');
  await g.say('revizor', 'Váš lístok nie je označený. To je pokuta!', 'Votre ticket n\'est pas validé. C\'est une amende !', [['pokuta', 'l\'amende']]);
  await g.say('andrea', 'Ach nie! Skús to znova.', 'Oh non ! Essaie encore.');
  g.restart();
}
