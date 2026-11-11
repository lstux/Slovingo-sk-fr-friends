// Scene 1 : « V električke » (le tram de Košice). Textes et geometrie sont des donnees : on peut tout changer ici.
// Images : voir art/PROMPTS.md. Zones : tools/editor.html dessine les polygones sur l'image et les exporte.
// Les lignes SK/FR sont une premiere ecriture a relire (elles s'inspirent de la serie « Košice » du cours).
const SCENERY = ['art/scenery.webp', 'art/scenery_2.webp', 'art/scenery_3.webp', 'art/scenery_4.webp', 'art/scenery_5.webp'];
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
    listok: { sk: 'lístok', fr: 'ticket', icon: 'art/item_listok.png' },
    listok_ok: { sk: 'označený lístok', fr: 'ticket validé', icon: 'art/item_listok_ok.png' },
  },
  scenes: {
    tram: {
      bg: 'art/tram.webp',
      player: 'fox',
      floor: [[20, 590], [1260, 590], [1280, 712], [0, 712]],
      scale: { y0: 590, s0: 0.86, y1: 712, s1: 1.08 },
      // la ville qui defile derriere les vitres (la vitre de gauche a une barre : deux morceaux, meme defilement)
      // plusieurs troncons de ville (art/scenery*.webp, ceux qui manquent sont ignores), fondu enchaine entre eux
      layers: [
        { imgs: SCENERY, box: [392, 100, 834, 356], clip: [[392, 100], [834, 100], [834, 157], [392, 157]], speed: 110, mirror: true },
        { imgs: SCENERY, box: [392, 100, 834, 356], clip: [[392, 170], [834, 170], [834, 356], [392, 356]], speed: 110, mirror: true },
        { imgs: SCENERY, box: [898, 100, 1240, 356], clip: [[898, 100], [1240, 100], [1240, 356], [898, 356]], speed: 110, mirror: true },
        // les vitres des portes : plus pres, donc plus vite (la barre jaune reste visible)
        { imgs: SCENERY, box: [17, 121, 272, 505], clip: [[17, 121], [119, 121], [119, 358], [17, 358]], speed: 170, mirror: true },
        { imgs: SCENERY, box: [17, 121, 272, 505], clip: [[17, 369], [119, 369], [119, 505], [17, 505]], speed: 170, mirror: true },
        { imgs: SCENERY, box: [17, 121, 272, 505], clip: [[168, 121], [272, 121], [272, 358], [168, 358]], speed: 170, mirror: true },
        { imgs: SCENERY, box: [17, 121, 272, 505], clip: [[168, 369], [272, 369], [272, 505], [168, 505]], speed: 170, mirror: true },
      ],
      sprites: [
        { id: 'andrea', img: 'art/andrea.png', x: 1000, y: 662, h: 445, face: -1, walkSheet: { img: 'art/andrea_walk.png', frames: 4, fps: 7, h: 425 } },
        { id: 'fox', img: 'art/fox.png', x: 470, y: 662, h: 440, speed: 320, walkSheet: { img: 'art/fox_walk.png', frames: 4, fps: 7, h: 410 } },
      ],
      extraSprites: { revizor: { img: 'art/revizor.png', x: 1260, y: 662, h: 470, walkSheet: { img: 'art/revizor_walk.png', frames: 4, fps: 7, h: 470 }, hidden: true, speed: 240 } },
      hotspots: [
        { id: 'door', name: { sk: 'dvere', fr: 'les portes' }, poly: [[0, 90], [290, 90], [290, 560], [0, 560]], walk: [160, 650],
          async onUse(g) {
            if (!g.flag('checked')) { await g.say('fox', 'Ešte nie. Električka ide.', 'Pas encore. Le tram roule.', [['dvere', 'les portes']]); return; }
            await g.say('fox', 'Vystupujeme!', 'On descend !');
            g.end('Koniec ukážky', 'Fin de l\'aperçu');
          } },
        { id: 'validator', name: { sk: 'označovač', fr: 'le composteur' }, poly: [[318, 240], [392, 240], [392, 336], [318, 336]], walk: [355, 650],
          look: { sk: 'Označovač lístkov. Tu označím lístok.', fr: 'Le composteur de tickets. C\'est ici que je valide mon ticket.', words: [['označovač', 'le composteur']] },
          onItem: {
            async listok(g) {
              g.take('listok'); g.give('listok_ok'); g.setFlag('stamped');
              await g.say('narrator', 'Cink! Lístok je označený.', 'Clac ! Le ticket est validé.', [['označený', 'validé']]);
              await inspect(g);
            },
          } },
        { id: 'display', name: { sk: 'displej', fr: 'l\'afficheur' }, poly: [[547, 30], [747, 30], [747, 70], [547, 70]], walk: [650, 650],
          look: { who: 'narrator', sk: 'Ďalšia zastávka: Staničné námestie.', fr: 'Prochain arrêt : Staničné námestie.', words: [['ďalšia zastávka', 'le prochain arrêt']] } },
        { id: 'windows', name: { sk: 'okno', fr: 'la fenêtre' }, poly: [[392, 100], [834, 100], [834, 356], [392, 356]], walk: [610, 650],
          look: { sk: 'Košice sú super!', fr: 'Košice, c\'est super !', words: [['okno', 'la fenêtre']] } },
        { id: 'windows2', name: { sk: 'okno', fr: 'la fenêtre' }, poly: [[898, 100], [1240, 100], [1240, 356], [898, 356]], walk: [1060, 650],
          look: { sk: 'Pozri, mesto ide okolo!', fr: 'Regarde, la ville défile !' } },
        { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [880, 665],
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
// P : ou le controleur entre et ou il s'arrete (par defaut, le tram de l'apercu ; le grand tram a ses propres positions)
const REV_POS = { from: [1260, 662], to: [735, 662] };
async function inspect(g, P = REV_POS) {
  const r = g.spawn('revizor', P.from[0], P.from[1]);
  g.face('revizor', -1);
  await g.walk('revizor', P.to[0], P.to[1]);
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
  await g.walk('revizor', P.from[0], P.from[1]);
  g.hide('revizor');
  g.setFlag('checked');
  await g.say('narrator', 'Električka zastavuje.', 'Le tram s\'arrête.');
  await g.say('andrea', 'Vystupujeme na ďalšej zastávke.', 'On descend au prochain arrêt.');
  return r;
}

// pas de ticket valide : une amende, et on recommence
async function fine(g, P = REV_POS) {
  g.spawn('revizor', P.from[0], P.from[1]);
  g.face('revizor', -1);
  await g.walk('revizor', P.to[0], P.to[1]);
  await g.say('revizor', 'Dobrý deň. Lístky na kontrolu, prosím.', 'Bonjour. Contrôle des tickets, s\'il vous plaît.');
  await g.say('revizor', 'Váš lístok nie je označený. To je pokuta!', 'Votre ticket n\'est pas validé. C\'est une amende !', [['pokuta', 'l\'amende']]);
  await g.say('andrea', 'Ach nie! Skús to znova.', 'Oh non ! Essaie encore.');
  g.restart();
}
