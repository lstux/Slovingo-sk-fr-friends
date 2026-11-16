// Zajko Quest : intro + chapitres 1 et 2 (decors provisoires, sauf le tram). Conception : docs/Jeu-conception.md.
// Textes slovaques et francais : premiere ecriture, a relire. Charge apres tram.js (on y reprend la scene du tram).
(function () {
  const FLOOR = [[20, 590], [1260, 590], [1280, 712], [0, 712]];
  const SCALE = { y0: 590, s0: 0.86, y1: 712, s1: 1.08 };
  const fox = (x) => ({ id: 'fox', img: 'art/fox.png', x, y: 662, h: 440, speed: 320, walkSheet: { img: 'art/fox_walk.png', frames: 4, fps: 7, h: 410 } });
  // Gab, nouvelle planche (art/PROMPTS_persos.md ; images faites par tools/make_sprites.py gab, qui donne ces hauteurs et la vitesse)
  const GAB_POSES = { idle: 451, talk: 452, pick: 314, use: 452, surprised: 454, think: 456, laugh: 458, sit: 387 };
  const gab = (x, y) => ({
    id: 'fox', img: 'art/gab_idle.png', x, y: y || 650, h: GAB_POSES.idle, speed: 307, scaleSpeed: true,
    walkSheet: { img: 'art/gab_walk.png', frames: 4, fps: 8, h: 436 },
    climbSheets: { up: { img: 'art/gab_climb_up.png', frames: 8, fps: 9, h: 325 }, down: { img: 'art/gab_climb_down.png', frames: 8, fps: 9, h: 325 } },
    poses: Object.fromEntries(Object.entries(GAB_POSES).map(([k, h]) => [k, { img: `art/gab_${k}.png`, h }])),
  });
  // Andrea, nouvelle planche (art/PROMPTS_persos.md ; tools/make_sprites.py andrea) : marche 8 images (un cycle complet), 16 poses
  const ANDREA_POSES = { idle: 481, talk: 481, arms: 481, shy: 478, surprised: 482, point: 479, read: 429, look: 429,
    think: 479, laugh: 479, worried: 408, whisper: 439, wave: 479, give: 479, pick: 369, shrug: 479 };
  // le controleur, nouvelle planche (tools/make_sprites.py revizor)
  const REVIZOR_POSES = { idle: 512, ask: 509, check: 488, nod: 514, arms: 512, write: 502, point: 503, salute: 509 };
  const revizor = (x, y) => ({
    img: 'art/revizor2_idle.png', x, y, h: REVIZOR_POSES.idle, hidden: true, speed: 312, scaleSpeed: true,
    walkSheet: { img: 'art/revizor2_walk.png', frames: 8, fps: 6, h: 515 },
    poses: Object.fromEntries(Object.entries(REVIZOR_POSES).map(([k, h]) => [k, { img: `art/revizor2_${k}.png`, h }])),
  });
  // le jardinier et le monsieur au sourire, planches du 12 nov. (tools/make_sprites.py zahradnik / pan)
  const ZAHRADNIK_POSES = { idle: 481, talk: 481, shrug: 480, point: 471, scratch: 483, give: 481, sky: 487, wave: 481 };
  const zahradnik = (x, y, face) => ({
    id: 'zahradnik', img: 'art/zahradnik_idle.png', x, y, h: ZAHRADNIK_POSES.idle, face: face || -1, speed: 238, scaleSpeed: true,
    walkSheet: { img: 'art/zahradnik_walk.png', frames: 8, fps: 6, h: 481 },
    poses: Object.fromEntries(Object.entries(ZAHRADNIK_POSES).map(([k, h]) => [k, { img: `art/zahradnik_${k}.png`, h }])),
  });
  const PAN_POSES = { idle: 542, talk: 541, ask: 541, watch: 528, no: 541, tie: 542, point: 539, car: 518 };
  const panSprite = (x, y) => ({
    img: 'art/pan_idle.png', x, y, h: PAN_POSES.idle, hidden: true, speed: 323, scaleSpeed: true,
    walkSheet: { img: 'art/pan_walk.png', frames: 8, fps: 7, h: 544 },
    poses: Object.fromEntries(Object.entries(PAN_POSES).map(([k, h]) => [k, { img: `art/pan_${k}.png`, h }])),
  });
  // la guichetiere, planche du 12 nov. (tools/make_sprites.py pokladnicka) : buste, 16 poses de meme cadre
  const POKL = ['idle', 'talk', 'smile', 'type', 'give', 'no', 'point', 'wipe', 'read', 'stamp', 'surprised', 'explain', 'watch', 'fan', 'wave', 'wait'];
  const pokladnicka = (x, y) => ({
    id: 'pokladnicka', img: 'art/pokladnicka_idle.png', x, y, h: 271, face: -1,
    poses: Object.fromEntries(POKL.map((k) => [k, { img: `art/pokladnicka_${k}.png`, h: 271 }])),
  });
  // pan Orol : la planche le montre tourne vers la GAUCHE (face: 1 = tel que dessine). Il ne marche pas : il reste perche.
  const OROL_POSES = { idle: 410, talk: 411, down: 418, paper: 410, worry: 420, smile: 418, surprised: 425, think: 410, pointr: 411, pointup: 414, hat: 418, search: 381, feather: 416, spread: 387, fly: 356, no: 410 };
  const OROL_K = 0.84;   // perche loin, au sommet : tete visible sous le bord de l'ecran
  const orolSprite = (x, y) => ({
    id: 'orol', img: 'art/orol_idle.png', x, y, h: OROL_POSES.idle * OROL_K, face: 1,
    poses: Object.fromEntries(Object.entries(OROL_POSES).map(([k, h]) => [k, { img: `art/orol_${k}.png`, h: h * OROL_K }])),
  });
  const andrea = (x, face, y) => ({
    id: 'andrea', img: 'art/andrea2_idle.png', x, y: y || 662, h: ANDREA_POSES.idle, face: face || 1, speed: 324, scaleSpeed: true,
    walkSheet: { img: 'art/andrea2_walk.png', frames: 8, fps: 8, h: 479 },
    climbSheets: { up: { img: 'art/andrea_climb_up.png', frames: 8, fps: 9, h: 324 }, down: { img: 'art/andrea_climb_down.png', frames: 8, fps: 9, h: 324 } },
    poses: Object.fromEntries(Object.entries(ANDREA_POSES).map(([k, h]) => [k, { img: `art/andrea2_${k}.png`, h }])),
  });
  const box = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const say = (g, who, sk, fr, words) => g.say(who, sk, fr, words);

  // ------------------------------------------------------------------ chapitres (la carte du voyage)
  const chapters = [
    { id: 'ch0', num: 'Úvod', title: { sk: 'Stanica', fr: 'La gare' }, place: { sk: 'Košice', fr: 'Košice' }, lon: 21.26, lat: 48.72 },
    { id: 'ch1', num: 1, title: { sk: 'Košice', fr: 'Košice' }, lon: 21.26, lat: 48.72, label: false },
    { id: 'ch2', num: 2, title: { sk: 'Nula litrov', fr: 'Zéro litre' }, lon: 21.26, lat: 48.72, label: false },
    { id: 'ch3', num: 3, title: { sk: 'Raj', fr: 'Le Paradis' }, place: { sk: 'Slovenský raj', fr: 'Paradis slovaque' }, lon: 20.35, lat: 48.93 },
    { id: 'ch4', num: 4, title: { sk: 'Búrka', fr: 'L\'orage' }, place: { sk: 'Vysoké Tatry', fr: 'Hautes Tatras' }, lon: 20.15, lat: 49.16, dy: -14 },
    { id: 'ch5', num: 5, title: { sk: 'Domov', fr: 'Chez soi' }, lon: 19.75, lat: 49.1, dy: 18 },
    { id: 'ch6', num: 6, title: { sk: 'Povodeň', fr: 'L\'inondation' }, place: { sk: 'Liptov', fr: 'Liptov' }, lon: 19.4, lat: 49.05, dy: -16 },
    { id: 'ch7', num: 7, title: { sk: 'Cesta', fr: 'La route' }, lon: 19.15, lat: 48.8, dy: 20 },
    { id: 'ch8', num: 8, title: { sk: 'Dátové centrum', fr: 'Le centre de données' }, lon: 18.95, lat: 48.62, dy: 20 },
    { id: 'ch9', num: 9, title: { sk: 'Baňa', fr: 'La mine' }, place: { sk: 'Banská Štiavnica', fr: 'Banská Štiavnica' }, lon: 18.9, lat: 48.45, dy: 20 },
    { id: 'ch10', num: 10, title: { sk: 'Rozhodnutie', fr: 'La décision' }, lon: 18.3, lat: 48.5, dy: -14 },
    { id: 'ch11', num: 11, title: { sk: 'Bratislava', fr: 'Bratislava' }, lon: 17.11, lat: 48.15, dy: 20 },
    { id: 'ch12', num: 12, title: { sk: 'Hrad', fr: 'Le château' }, lon: 17.11, lat: 48.15, label: false },
    { id: 'ch13', num: 'Epilóg', title: { sk: 'Dobrý sen', fr: 'Un beau rêve' }, place: { sk: 'Košice', fr: 'Košice' }, lon: 21.26, lat: 48.72, label: false },
  ];

  // ------------------------------------------------------------------ carnet de la loutre
  const notebook = {
    pages: {
      p1: { title: { sk: 'Fontána v Košiciach', fr: 'La fontaine de Košice' }, sk: 'Ďalšie meranie: Slovenský raj.', fr: 'Prochaine mesure : Paradis slovaque.' },
      p2: { title: { sk: 'Slovenský raj', fr: 'Paradis slovaque' }, sk: 'Pre nálezcu. Ďakujem! Idem merať do Tatier, k Téryho chate. Dr. V.', fr: 'Pour celui qui trouvera ce carnet. Merci ! Je vais mesurer dans les Tatras, au refuge Téry. Dr V.' },
      p3: { title: { sk: 'Vysoké Tatry', fr: 'Hautes Tatras' }, sk: '(strana ešte chýba)', fr: '(page à trouver)' },
      p4: { title: { sk: 'Liptov', fr: 'Liptov' }, sk: '(strana ešte chýba)', fr: '(page à trouver)' },
      p5: { title: { sk: 'Dátové centrum', fr: 'Centre de données' }, sk: '(strana ešte chýba)', fr: '(page à trouver)' },
      p6: { title: { sk: 'Tajchy', fr: 'Les étangs de Štiavnica' }, sk: '(strana ešte chýba)', fr: '(page à trouver)' },
    },
    clues: {
      kacka: { sk: 'Vydra s žltými čižmami merala vodu v jazierku.', fr: 'Une loutre en bottes jaunes mesurait l\'eau de l\'étang.' },
      fontana: { sk: 'Zápisník patrí doktorke Vydrovej. Odišla na západ.', fr: 'Le carnet est à la docteure Vydrová. Elle est partie vers l\'ouest.' },
      tatry: { sk: 'Doktorka Vydrová šla do Tatier, k Téryho chate. V Tatrách prší.', fr: 'La docteure Vydrová est partie dans les Tatras, au refuge Téry. Il pleut dans les Tatras.' },
      pan: { sk: 'Pán v čiernom aute hľadá zápisník. Veľa sa usmieva.', fr: 'Le monsieur à la voiture noire cherche le carnet. Il sourit beaucoup.' },
    },
  };

  // ------------------------------------------------------------------ le tram (v2 « Circuit fermé ») : docs/Jeu-conception-v2.md, section 5
  // Le composteur de l'avant est en panne ; celui du fond est derriere le cabas de la babicka, qui ne bouge pas tant qu'elle n'a pas
  // retrouve SON ticket (il est par terre, a l'avant). Andrea est assise au fond, livre a l'envers : on la decouvre en avancant.
  const TW = 2160;
  const SEAT = [1838, 578];   // la banquette du fond, ou Andrea lit
  const TRAM_SCALE = { y0: 590, s0: 0.66, y1: 712, s1: 0.76 };
  const BAG_X = 1480;         // le cabas dans l'allee : on ne passe pas au-dela tant qu'il y est
  const revPos = (g) => { const f = g.sprite('fox'); const x = Math.min(2040, Math.max(700, (f ? f.x : 1200) + 190)); return { from: [2140, 650], to: [x, 650] }; };
  async function meetAndrea(g) {
    g.setFlag('met');
    g.face('fox', 1);
    await say(g, 'narrator', 'Vzadu sedí zajačica a číta knihu.', 'Au fond, une hase est assise et lit un livre.', [['zajačica', 'la hase'], ['kniha', 'le livre'], ['vzadu', 'au fond']]);
    await say(g, 'fox', 'Prepáč… máš knihu hore nohami.', 'Excuse-moi… ton livre est à l\'envers.', [['hore nohami', 'à l\'envers']]);
    await say(g, 'andrea', 'Ja viem.', 'Je sais.');
    await say(g, 'fox', 'Ty takto čítaš?', 'Tu lis comme ça ?');
    await say(g, 'andrea', 'Dnes áno.', 'Aujourd\'hui, oui.');
    g.addCard('kniha');
    g.pose('andrea', 'look');                    // elle baisse le livre
    await g.sleep(900);
    g.pose('fox', 'surprised');
    await say(g, 'fox', 'Počkaj… Andrea? To si ty?', 'Attends… Andrea ? C\'est toi ?');
    g.pose('fox', null);
    g.pose('andrea', null);                      // elle se leve et fait un pas vers Gab
    await g.walk('andrea', SEAT[0] - 70, 650);
    g.face('andrea', -1);
    for (;;) {
      const i = await g.choice([{ sk: 'Ahoj, Andrea!', fr: 'Salut, Andrea !' }, { sk: 'Dobrý deň, pani.', fr: 'Bonjour, madame.' }], { noFr: true });
      if (i === 0) break;
      g.pose('andrea', 'arms');
      await say(g, 'andrea', 'Pani? Gab, to som ja!', 'Madame ? Gab, c\'est moi !');
      await say(g, 'andrea', 'Kamarátke sa predsa hovorí „ahoj“.', 'À une amie, on dit « ahoj », voyons.', [['kamarátka', 'l\'amie']]);
      g.pose('andrea', null);
    }
    await say(g, 'andrea', 'Ahoj, Gab.', 'Salut, Gab.');
    await say(g, 'fox', 'Päť rokov! A ty nie si prekvapená?', 'Cinq ans ! Et tu n\'es pas surprise ?', [['päť rokov', 'cinq ans'], ['prekvapená', 'surprise']]);
    g.pose('andrea', 'shy');
    await say(g, 'andrea', 'Som. Vo vnútri.', 'Si. À l\'intérieur.', [['vo vnútri', 'à l\'intérieur']]);
    g.pose('andrea', null);
    g.setHelper('andrea', 3);
    if (!g.flag('stamped')) {
      await say(g, 'andrea', 'Máš označený lístok? Revízor tu býva často.', 'Ton ticket est validé ? Le contrôleur passe souvent.',
        [['označiť lístok', 'valider un ticket'], ['revízor', 'le contrôleur']]);
      g.after(90000, async (g2) => { if (!g2.flag('stamped')) await fine(g2, revPos(g2)); });
    } else await inspect(g, revPos(g));
  }
  // la babicka : elle cherche son ticket ; tant qu'elle ne l'a pas, son cabas reste dans l'allee
  const BABKA = ['knit', 'glare'];
  const tram = {
    chapter: 'ch1', title: { sk: 'V električke', fr: 'Dans le tram' },
    bg: 'art/tram_wide.webp', worldW: TW,
    player: 'fox', floor: [[0, 590], [TW, 590], [TW, 712], [0, 712]], scale: TRAM_SCALE,
    sprites: [
      gab(360, 650),
      Object.assign(andrea(SEAT[0], -1, SEAT[1]), { pose: 'read' }),
      // figurants (2 poses qui alternent)
      { id: 'rys', img: 'art/rys_a.png', x: 1108, y: 600, h: 300, abs: true, face: 1, poses: { b: { img: 'art/rys_b.png', h: 300 } }, alt: { pose: 'b', min: 3, max: 7, hold: [2, 4] } },
      { id: 'babka', img: 'art/babka_a_bez.png', x: 1560, y: 578, h: 225, abs: true, face: -1, poses: { b: { img: 'art/babka_b_bez.png', h: 225 } }, alt: { pose: 'b', min: 2, max: 5, hold: [1.2, 2.2] } },
    ],
    extraSprites: { revizor: revizor(2140, 650) },
    props: [
      { img: 'art/obj_oznacovac2.png', x: 1945, y: 392, w: 46 },                                          // le composteur du fond
      { img: 'art/obj_taska.png', x: BAG_X + 30, y: 668, w: 112, when: (g) => !g.flag('babka_ok') },      // le cabas, dans l'allee
      { img: 'art/obj_taska.png', x: 1655, y: 540, w: 86, when: (g) => g.flag('babka_ok') },              // ... puis sur le siege d'a cote
      { img: 'art/item_listok.png', x: 1086, y: 608, w: 28, when: (g) => !g.flag('babka_listok') },      // le ticket de la babicka, sous la chaussure du lynx
    ],
    ambient: [
      { sweep: { area: [480, 170, 2050, 400], period: 7, a: 0.2 } },   // le soleil qui passe entre les immeubles
    ],
    triggers: [
      { x: [1150, TW], when: (g) => !g.flag('met'), run: meetAndrea },
      // le cabas : on s'arrete devant
      { x: [BAG_X - 10, TW], move: true, when: (g) => !g.flag('babka_ok'), async run(g) {
        await g.walk('fox', BAG_X - 40, 650);
        await say(g, 'fox', 'Veľká taška v uličke. Neprejdem.', 'Un gros cabas dans l\'allée. Je ne peux pas passer.', [['taška', 'le cabas'], ['ulička', 'l\'allée']]);
      } },
    ],
    hotspots: [
      { id: 'door', name: { sk: 'dvere', fr: 'les portes' }, poly: box(245, 170, 465, 555), walk: [355, 650], pose: 'use',
        async onUse(g) {
          if (!g.flag('checked')) { await say(g, 'fox', 'Ešte nie. Električka ide.', 'Pas encore. Le tram roule.', [['dvere', 'les portes']]); return; }
          g.spawn('andrea', 520, 650); g.face('andrea', -1);
          await say(g, 'andrea', 'Ty vystupuješ tu.', 'Toi, tu descends ici.', [['vystupovať', 'descendre (du tram)']]);
          g.pose('fox', 'surprised');
          await say(g, 'fox', 'Ja? Ako to vieš?', 'Moi ? Comment tu le sais ?');
          g.pose('fox', null);
          await say(g, 'andrea', 'Máš veľký batoh. Si turista. Turisti majú hostel tu vedľa.', 'Tu as un gros sac. Tu es un touriste. Les touristes ont une auberge juste à côté.', [['batoh', 'le sac à dos'], ['vedľa', 'à côté']]);
          await say(g, 'fox', 'Si veľmi múdra.', 'Tu es très forte.');
          await say(g, 'andrea', 'Ja viem.', 'Je sais.');
          g.addCard('zastavka');
          g.goScene('rue');
        } },
      { id: 'door2', name: { sk: 'dvere', fr: 'les portes' }, poly: box(1175, 170, 1395, 555), walk: [1285, 650],
        look: { sk: 'Ďalšie dvere. Vystupuje sa vpredu.', fr: 'D\'autres portes. On descend à l\'avant.', words: [['ďalší', 'autre, suivant']] } },
      // le composteur de l'avant : en panne
      { id: 'validator', name: { sk: 'označovač', fr: 'le composteur' }, poly: box(1052, 282, 1108, 372), walk: [990, 650],
        look: { sk: 'Označovač. Svieti na ňom: MIMO PREVÁDZKY.', fr: 'Le composteur. Il affiche : MIMO PREVÁDZKY.', words: [['označovač', 'le composteur']] },
        onItem: {
          async listok(g) {
            await say(g, 'narrator', 'Nič. Na displeji: MIMO PREVÁDZKY.', 'Rien. Sur l\'écran : MIMO PREVÁDZKY.');
            if (!g.knows('mimo prevádzky')) { g.pose('fox', 'think'); await say(g, 'fox', 'Mimo prevádzky… nefunguje. Je tu iný označovač?', '« Mimo prevádzky »… il ne marche pas. Il y a un autre composteur ?'); g.pose('fox', null); g.learn('mimo prevádzky', 'hors service'); }
          },
          async listok_babka(g) { await say(g, 'fox', 'To nie je môj lístok. A označovač aj tak nefunguje.', 'Ce n\'est pas mon ticket. Et le composteur ne marche pas, de toute façon.'); },
        } },
      // le composteur du fond : celui qui marche
      { id: 'validator2', name: { sk: 'označovač', fr: 'le composteur' }, poly: box(1920, 285, 1972, 380), walk: [1880, 650],
        look: { sk: 'Ďalší označovač. Svieti na zeleno.', fr: 'Un autre composteur. Son voyant est vert.', words: [['zelený', 'vert']] },
        onItem: {
          async listok(g) {
            g.take('listok'); g.give('listok_ok'); g.setFlag('stamped');
            await say(g, 'narrator', 'Cink! Lístok je označený.', 'Clac ! Le ticket est validé.', [['označený', 'validé']]);
            if (g.flag('met')) await inspect(g, revPos(g));
          },
          async listok_babka(g) { await say(g, 'fox', 'Babkin lístok? To by bola krádež.', 'Le ticket de la mamie ? Ce serait du vol.'); },
        } },
      { id: 'cabin', name: { sk: 'kabína', fr: 'la cabine' }, poly: box(0, 70, 170, 590), walk: [200, 650],
        look: { who: 'narrator', sk: 'Kabína vodiča. Vodič nás vezie cez mesto.', fr: 'La cabine du conducteur. Il nous conduit à travers la ville.', words: [['vodič', 'le conducteur']] } },
      { id: 'win_cathedral', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(770, 170, 1018, 398), walk: [900, 650],
        async onUse(g) {
          await say(g, 'fox', 'Pozri, katedrála! A fontána pred ňou… je prázdna.', 'Regarde, la cathédrale ! Et la fontaine devant… elle est vide.', [['katedrála', 'la cathédrale'], ['fontána', 'la fontaine'], ['prázdny', 'vide']]);
          if (g.flag('met')) await say(g, 'andrea', 'Dva mesiace nepršalo.', 'Il n\'a pas plu depuis deux mois.', [['pršať', 'pleuvoir']]);
          g.addCard('fontana');
        } },
      { id: 'win_left', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(505, 170, 752, 398), walk: [630, 650],
        look: { sk: 'Košice! Konečne.', fr: 'Košice ! Enfin.', words: [['okno', 'la fenêtre'], ['konečne', 'enfin']] } },
      { id: 'win_right', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(1425, 170, 2020, 280), walk: [1450, 650],
        look: { sk: 'Pozri, mesto ide okolo!', fr: 'Regarde, la ville défile !' } },
      // le ticket de la babicka : coince sous la chaussure du garcon au casque (il bat la mesure avec le pied)
      { id: 'listok_babka', name: { sk: 'papierik', fr: 'un petit papier' }, poly: box(1066, 594, 1104, 620), walk: [1040, 650],
        when: (g) => !g.flag('babka_listok'),
        async onUse(g) {
          await say(g, 'narrator', 'Pod topánkou toho chalana je papierik. Lístok na električku?', 'Sous la chaussure de ce garçon, il y a un petit papier. Un ticket de tram ?', [['topánka', 'la chaussure']]);
          await say(g, 'fox', 'Nohu nedvihne. Počúva hudbu.', 'Il ne lèvera pas le pied. Il écoute de la musique.');
          g.setFlag('saw_babka_listok');
        } },
      // figurants
      { id: 'rys', sprite: 'rys', name: { sk: 'chalan so slúchadlami', fr: 'un garçon avec un casque' }, walk: [1040, 650],
        async onUse(g) {
          if (g.flag('babka_listok')) { await say(g, 'narrator', 'Chalan zase počúva hudbu. Kýva hlavou.', 'Le garçon écoute de nouveau sa musique. Il hoche la tête.'); return; }
          const i = await g.choice([{ sk: 'Ahoj!', fr: 'Salut !' }, { sk: '(Ťuknúť ho po pleci.)', fr: '(Lui taper sur l\'épaule.)' }]);
          if (i === 0) { await say(g, 'narrator', 'Nepočuje ťa. Má slúchadlá.', 'Il ne t\'entend pas. Il a un casque.', [['slúchadlá', 'le casque (audio)'], ['počuť', 'entendre']]); return; }
          g.pose('rys', 'b');
          await say(g, 'rys', 'Hm? Čo je?', 'Hein ? Quoi ?');
          for (;;) {
            const j = await g.choice([
              { sk: 'Pekná hudba!', fr: 'Jolie musique !' },
              { sk: 'Zdvihni nohu, prosím.', fr: 'Lève le pied, s\'il te plaît.' },
              { sk: 'Kde je električka?', fr: 'Où est le tram ?' },
            ], { noFr: true });
            if (j === 0) { await say(g, 'rys', 'Hej. Ďakujem.', 'Ouais. Merci.'); g.pose('rys', null); return; }
            if (j === 2) { await say(g, 'rys', 'Si v nej, kamoš.', 'Tu es dedans, mon pote.', [['kamoš', 'le pote']]); continue; }
            break;
          }
          await say(g, 'rys', 'Nohu? Prečo… Aha. Papierik. Nech sa páči.', 'Le pied ? Pourquoi… Ah. Un papier. Tiens.', [['noha', 'le pied (la jambe)']]);
          g.pose('rys', null);
          g.setFlag('babka_listok'); g.give('listok_babka');
          await say(g, 'narrator', 'Lístok na električku. Pokrčený. Nie je tvoj: ten tvoj máš vo vrecku.', 'Un ticket de tram. Froissé. Ce n\'est pas le tien : le tien est dans ta poche.', [['vrecko', 'la poche'], ['pokrčený', 'froissé']]);
        } },
      { id: 'taska', name: { sk: 'taška', fr: 'le cabas' }, poly: box(BAG_X - 28, 560, BAG_X + 88, 672), walk: [BAG_X - 60, 650],
        when: (g) => !g.flag('babka_ok'),
        async onUse(g) {
          g.pose('babka', 'b');
          await say(g, 'babka', 'Ruky preč od mojej tašky!', 'Bas les pattes, c\'est mon cabas !', [['ruky preč', 'bas les pattes']]);
          g.pose('babka', null);
        } },
      { id: 'babka', sprite: 'babka', name: { sk: 'babka', fr: 'la mamie' }, walk: [BAG_X - 60, 650],
        async onUse(g) {
          if (g.flag('babka_ok')) { await say(g, 'babka', 'Ďakujem ti ešte raz, zlatko.', 'Merci encore, mon chou.', [['zlatko', 'mon chou (affectueux)']]); return; }
          g.pose('babka', 'b');
          await say(g, 'babka', 'Kde je môj lístok? Bol tu! Bez lístka sa nehnem.', 'Où est mon ticket ? Il était là ! Sans ticket, je ne bouge pas.', [['nehnem sa', 'je ne bouge pas']]);
          g.pose('babka', null);
          const i = await g.choice([
            { sk: 'Prepáčte, môžem prejsť?', fr: 'Excusez-moi, je peux passer ?' },
            { sk: 'Nerozumiem, som Francúz.', fr: 'Je ne comprends pas, je suis français.' },
            { sk: 'Pekné pletenie!', fr: 'Joli tricot !' },
          ]);
          if (i === 0) await say(g, 'babka', 'Najprv môj lístok, potom ulička.', 'D\'abord mon ticket, ensuite l\'allée.');
          else if (i === 1) await say(g, 'babka', 'Francúz? Tak hľadaj po francúzsky. Lístok, mladý!', 'Français ? Alors cherche en français. Mon ticket, jeune homme !', [['hľadať', 'chercher']]);
          else await say(g, 'babka', 'Sveter pre vnuka. Ale najprv lístok!', 'Un pull pour mon petit-fils. Mais d\'abord, mon ticket !', [['sveter', 'le pull']]);
        },
        onItem: {
          async listok_babka(g) {
            g.take('listok_babka'); g.setFlag('babka_ok');
            g.pose('babka', null);
            await say(g, 'babka', 'Môj lístok! Ďakujem, zlatko. Nech sa páči, prejdi.', 'Mon ticket ! Merci, mon chou. Je t\'en prie, passe.', [['nech sa páči', 'je t\'en prie']]);
            await say(g, 'narrator', 'Babka si dá tašku na sedadlo vedľa seba.', 'La mamie pose son cabas sur le siège d\'à côté.', [['sedadlo', 'le siège']]);
          },
          async listok(g) { await say(g, 'babka', 'To nie je môj. Môj bol pokrčený.', 'Ce n\'est pas le mien. Le mien était tout froissé.'); },
        } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [1440, 650],
        async onUse(g) {
          if (!g.flag('met')) { await meetAndrea(g); return; }
          if (!g.flag('stamped')) {
            g.pose('andrea', 'point');
            await say(g, 'andrea', 'Predný označovač nefunguje. Je tu ešte jeden, vzadu pri mne.', 'Le composteur de devant ne marche pas. Il y en a un autre, au fond, près de moi.', [['predný', 'de devant'], ['vzadu', 'au fond']]);
            g.pose('andrea', null);
          } else if (g.flag('checked')) await say(g, 'andrea', 'Vystupujeme na ďalšej zastávke. Poď dopredu.', 'On descend au prochain arrêt. Viens à l\'avant.', [['dopredu', 'vers l\'avant']]);
          else await say(g, 'andrea', 'Dobre, lístok je v poriadku.', 'Bien, le ticket est en ordre.');
        } },
    ],
    hints: [
      { id: 'tram_bag', when: (g) => g.flag('met') && !g.flag('babka_ok'), levels: [
        { sk: 'Babka sa nehne bez svojho lístka. Kde by mohol byť?', fr: 'La mamie ne bougera pas sans son ticket. Où pourrait-il être ?' },
        { sk: 'Pozri sa na zem. Pod nohy cestujúcich.', fr: 'Regarde par terre. Sous les pieds des voyageurs.', words: [['zem', 'le sol']] },
        { sk: 'Je pod topánkou chalana so slúchadlami. Ťukni ho po pleci a povedz: „Zdvihni nohu.“', fr: 'Il est sous la chaussure du garçon au casque. Tape-lui sur l\'épaule et dis : « Lève le pied. »' } ] },
      { id: 'tram_ticket', when: (g) => !g.flag('stamped'), levels: [
        { sk: 'Máš lístok? Nezabudni ho označiť.', fr: 'Tu as ton ticket ? N\'oublie pas de le valider.' },
        { sk: 'Predný označovač je mimo prevádzky. Druhý je vzadu.', fr: 'Le composteur de devant est hors service. L\'autre est au fond.' },
        { sk: 'Vyber lístok a klikni na zadný označovač.', fr: 'Prends ton ticket et clique sur le composteur du fond.' } ] },
      { id: 'tram_out', levels: [
        { sk: 'Vystupujeme. Choď k dverám vpredu.', fr: 'On descend. Va vers les portes à l\'avant.' },
        { sk: 'Klikni na prvé dvere, vľavo.', fr: 'Clique sur les premières portes, à gauche.' } ] },
    ],
    async onEnter(g) {
      if (!g.flag('tram_in')) {
        g.setFlag('tram_in');
        await say(g, 'narrator', 'Košice, v júli. Je veľmi horúco.', 'Košice, en juillet. Il fait très chaud.', [['horúco', 'il fait chaud']]);
        await say(g, 'fox', 'Lístok mám. Treba ho označiť.', 'J\'ai mon ticket. Il faut le valider.', [['označiť', 'valider']]);
      }
      if (g.flag('met')) { g.pose('andrea', null); g.spawn('andrea', SEAT[0] - 70, 650); g.face('andrea', -1); }
      if (g.flag('met') && !g.flag('stamped')) g.after(90000, async (g2) => { if (!g2.flag('stamped')) await fine(g2, revPos(g2)); });
    },
  };

  // le jardin : Gab, debout sur la brouette, couvre le detecteur de la lampe avec la serviette
  async function coverSensor(g) {
    if (!g.has('uterak')) return;
    g.take('uterak'); g.setFlag('lampoff');
    g.pose('fox', 'use');
    await say(g, 'narrator', 'Gab prehodí utierku cez senzor. Lampa ešte chvíľu svieti… a zhasne.', 'Gab pose la serviette sur le détecteur. La lampe brille encore un instant… puis s\'éteint.', [['zhasnúť', 's\'éteindre']]);
    g.pose('fox', null);
    await say(g, 'fox', 'Dobrú noc, lampa.', 'Bonne nuit, la lampe.');
  }

  // ------------------------------------------------------------------ la gare : les deux indices et le distributeur
  // On apprend « električka » sur l'affiche (le dessin du tram) ; « lístok » quand on a vu l'affiche ET l'ecriteau du distributeur.
  async function clue(g, which) {
    if (which === 'plagat') {
      await say(g, 'narrator', 'Plagát: Električka. Jeden lístok: 1,20 €.', 'Sous un dessin de tram et d\'un petit bout de papier : « Električka. Jeden lístok : 1,20 € ».');
      if (!g.knows('električka')) { g.pose('fox', 'think'); await say(g, 'fox', 'Električka… to bude ten tram na obrázku.', 'Električka… ça doit être le tram du dessin.'); g.pose('fox', null); g.learn('električka', 'le tram'); }
      g.setFlag('clue_plagat');
    } else {
      await say(g, 'narrator', 'Na automate je nápis: Lístok na električku.', 'Sur le distributeur, c\'est écrit : « Lístok na električku ».', [['nápis', 'l\'écriteau']]);
      g.setFlag('clue_automat');
    }
    if (g.flag('clue_plagat') && g.flag('clue_automat') && !g.knows('lístok')) {
      g.pose('fox', 'think');
      await say(g, 'fox', 'Lístok na električku… Jeden lístok, 1,20 €…', 'Un « lístok » pour le tram… un « lístok » à 1,20 €…');
      g.pose('fox', 'surprised');
      await say(g, 'fox', 'Lístok je ten papierik! Lístok!', 'Lístok, c\'est le ticket !');
      g.pose('fox', null);
      g.learn('lístok', 'le ticket'); g.learn('jeden', 'un');
    }
  }
  async function automat(g) {
    if (g.has('listok') || g.has('listok_ok')) { await say(g, 'fox', 'Už mám lístok.', 'J\'ai déjà mon ticket.'); return; }
    if (!g.flag('clue_automat')) await clue(g, 'automat');
    if (g.flag('need_coins') && g.knows('lístok')) {   // on revient avec (ou sans) la monnaie : pas besoin de rejouer le choix
      if (!g.has('drobne')) { await say(g, 'automat', 'Len mince, prosím.', 'Pièces uniquement, s\'il vous plaît.'); return; }
      g.take('drobne');
      await say(g, 'narrator', 'Cink, cink, cink.', 'Cling, cling, cling.');
      await say(g, 'automat', 'Ďakujem. Dobrú cestu!', 'Merci. Bon voyage !', [['ďakujem', 'merci']]);
      g.give('listok'); g.setFlag('ticket');
      g.pose('fox', 'pick');
      await say(g, 'narrator', 'Lístok vypadol z automatu.', 'Le ticket sort du distributeur.');
      g.pose('fox', 'laugh'); await g.sleep(700); g.pose('fox', null);
      return;
    }
    if (!g.knows('lístok')) {
      await say(g, 'automat', 'Vyberte si lístok.', 'Choisissez votre ticket.', [['vybrať si', 'choisir']]);
      const n = g.flag('auto2') ? 3 : g.flag('auto1') ? 2 : 1;
      if (n === 1) g.setFlag('auto1'); else if (n === 2) g.setFlag('auto2');
      g.pose('fox', n < 3 ? 'surprised' : 'think');
      if (n < 3) await say(g, 'fox', 'Hmm…', 'Zut, comment on dit « un ticket » en slovaque ?!');
      else await say(g, 'fox', 'Hmm… nápis…', 'Il y a sûrement un truc écrit quelque part… sur une affiche ?');
      g.pose('fox', null);
      return;
    }
    await say(g, 'automat', 'Vyberte si lístok.', 'Choisissez votre ticket.', [['vybrať si', 'choisir']]);
    for (;;) {
      // trois touches sur l'ecran : il faut se souvenir de l'affiche (jeden lístok)
      const i = await g.choice([
        { sk: '[ Jedna lístok ]', fr: '' },
        { sk: '[ Jeden lístok ]', fr: '' },
        { sk: '[ Jedno lístok ]', fr: '' },
      ], { noFr: true });
      if (i === 1) break;
      await say(g, 'automat', 'Pííp! Chyba.', 'Bip ! Erreur.');
      await say(g, 'fox', i === 0 ? 'Jedna… nie. Na plagáte bolo inak.' : 'Jedno… nie. Na plagáte bolo inak.', i === 0 ? '« Jedna »… non. Sur l\'affiche, c\'était autrement.' : '« Jedno »… non. Sur l\'affiche, c\'était autrement.');
    }
    await say(g, 'automat', 'Jeden lístok: 1,20 €. Vložte mince, prosím.', 'Un ticket : 1,20 €. Insérez des pièces, s\'il vous plaît.', [['mince', 'les pièces (de monnaie)'], ['vložiť', 'insérer']]);
    if (!g.has('drobne')) {
      g.setFlag('need_coins');
      g.pose('fox', 'think');
      await say(g, 'fox', 'Mince… Mám len bankovku, dvadsať eur.', 'Des pièces… Je n\'ai qu\'un billet de vingt euros.', [['bankovka', 'le billet (de banque)'], ['dvadsať', 'vingt']]);
      await say(g, 'narrator', 'Na automate je malý nápis: Len mince. Nevydávame.', 'Sur le distributeur, une petite étiquette : « Len mince. Nevydávame. »');
      await say(g, 'fox', 'Len mince… Potrebujem drobné.', 'Que des pièces… Il me faut de la monnaie.', [['drobné', 'la monnaie']]);
      g.pose('fox', null);
      return;
    }
    g.take('drobne');
    await say(g, 'narrator', 'Cink, cink, cink.', 'Cling, cling, cling.');
    await say(g, 'automat', 'Ďakujem. Dobrú cestu!', 'Merci. Bon voyage !', [['ďakujem', 'merci']]);
    g.give('listok'); g.setFlag('ticket');
    g.pose('fox', 'pick');
    await say(g, 'narrator', 'Cink! Lístok vypadol z automatu. „Lístok“ je mužský rod: jeden lístok.', 'Clac ! Le ticket sort du distributeur. « Lístok » est masculin : jeden lístok.', [['prosím', 's\'il vous plaît']]);
    g.pose('fox', 'laugh'); await g.sleep(700); g.pose('fox', null);
  }

  // le kiosque : la vendeuse ne fait pas la monnaie ; il faut acheter quelque chose (de l'eau : elle servira au chat)
  async function kiosk(g, withNote) {
    if (g.has('flasa') || g.flag('flasa_used')) { await say(g, 'predavacka', 'Ešte niečo? Nie? Pekný deň!', 'Autre chose ? Non ? Bonne journée !'); return; }
    if (withNote || g.flag('need_coins')) {
      g.pose('fox', 'talk');
      await say(g, 'fox', 'Dobrý deň. Ehm… mince?', 'Bonjour. Euh… des pièces ?', [['mince', 'les pièces']]);
      await say(g, 'narrator', 'Gab ukáže bankovku a robí, že hádže mince do automatu.', 'Gab montre son billet et mime quelqu\'un qui met des pièces dans une machine.');
      g.pose('fox', null);
      await say(g, 'predavacka', 'Rozmieňať nemôžem. Ale keď si niečo kúpiš, vydám ti.', 'Je ne peux pas faire la monnaie. Mais si tu achètes quelque chose, je te rends la monnaie.', [['kúpiť', 'acheter'], ['vydať', 'rendre (la monnaie)']]);
    } else await say(g, 'predavacka', 'Dobrý deň! Čo si dáš?', 'Bonjour ! Qu\'est-ce que tu prends ?');
    for (;;) {
      // il faut reconnaitre les mots : la vendeuse a des journaux, du chocolat, de l'eau (et plus de tickets)
      const opts = [
        { sk: 'Prosím si noviny.', fr: 'Je voudrais un journal, s\'il vous plaît.' },
        { sk: 'Prosím si čokoládu.', fr: 'Je voudrais du chocolat, s\'il vous plaît.' },
        { sk: 'Prosím si vodu.', fr: 'Je voudrais de l\'eau, s\'il vous plaît.' },
        { sk: 'Nič, ďakujem.', fr: 'Rien, merci.' },
      ];
      if (g.knows('lístok')) opts.splice(3, 0, { sk: 'Prosím si lístok.', fr: 'Je voudrais un ticket, s\'il vous plaît.' });
      let i = await g.choice(opts, { noFr: true });
      if (opts[i].sk === 'Prosím si lístok.') {
        await say(g, 'predavacka', 'Lístky? Dnes som už všetky predala. Choď na automat.', 'Des tickets ? Aujourd\'hui, je les ai déjà tous vendus. Va au distributeur.', [['predať', 'vendre']]);
        continue;
      }
      if (opts[i].sk === 'Nič, ďakujem.') return;
      if (i === 0) { await say(g, 'fox', 'Hmm, noviny po slovensky? Ešte nie.', 'Hmm, un journal en slovaque ? Pas encore.'); continue; }
      if (i === 1) { await say(g, 'predavacka', 'V tejto horúčave? Roztopí sa ti vo vrecku!', 'Par cette chaleur ? Il va fondre dans ta poche !', [['horúčava', 'la chaleur'], ['roztopiť sa', 'fondre']]); continue; }
      break;
    }
    if (!g.has('bankovka')) { await say(g, 'predavacka', 'Najprv peniaze, zlatko.', 'L\'argent d\'abord, mon chou.'); return; }
    g.pose('predavacka', 'b');
    await say(g, 'predavacka', 'Voda, nech sa páči. Jedno euro. Z dvadsiatich ti vydám devätnásť.', 'De l\'eau, voilà. Un euro. Sur vingt, je te rends dix-neuf.', [['voda', 'l\'eau'], ['euro', 'l\'euro']]);
    g.take('bankovka'); g.give('flasa'); g.give('drobne');
    g.pose('predavacka', null);
    await say(g, 'narrator', 'Máš fľašu vody a drobné.', 'Tu as une bouteille d\'eau et de la monnaie.', [['fľaša', 'la bouteille'], ['drobné', 'la monnaie']]);
    await say(g, 'predavacka', 'A nevypi ju celú naraz. Je sucho.', 'Et ne la bois pas d\'un coup. C\'est la sécheresse.', [['sucho', 'la sécheresse']]);
  }

  // ================================================================== CHAPITRE 2 « Nula litrov » (v2) : docs/Jeu-conception-v2.md, section 6
  const NUM = { 44: 'štyridsaťštyri', 45: 'štyridsaťpäť', 46: 'štyridsaťšesť', 47: 'štyridsaťsedem', 48: 'štyridsaťosem', 49: 'štyridsaťdeväť',
    50: 'päťdesiat', 51: 'päťdesiatjeden', 52: 'päťdesiatdva', 53: 'päťdesiattri', 54: 'päťdesiatštyri', 55: 'päťdesiatpäť', 56: 'päťdesiatšesť',
    57: 'päťdesiatsedem', 58: 'päťdesiatosem', 59: 'päťdesiatdeväť', 60: 'šesťdesiat', 61: 'šesťdesiatjeden', 62: 'šesťdesiatdva', 63: 'šesťdesiattri' };
  const W = 1280, H = 720;
  const btn = (E, c, x, y, w, h, label, on) => {
    c.fillStyle = on ? 'rgba(240,168,48,.95)' : 'rgba(30,26,40,.92)'; E.roundRect(x, y, w, h, 10); c.fill();
    c.strokeStyle = '#8a86a8'; c.lineWidth = 2; c.stroke();
    c.fillStyle = on ? '#1b1608' : '#fff'; c.font = '700 26px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(label, x + w / 2, y + h / 2 + 1); c.textAlign = 'left';
  };
  const inR = (p, r) => p[0] >= r[0] && p[0] <= r[0] + r[2] && p[1] >= r[1] && p[1] <= r[1] + r[3];

  // --- les photos du telephone d'Andrea : les remettre dans l'ordre (de la plus ancienne a la plus recente)
  const FOTKY_SHOWN = [2, 4, 0, 3, 1];   // ordre d'affichage (indices des photos 0..4 = fotka_1..5)
  const fotkyRect = (i) => [150 + i * 200, 200, 180, 208];
  const fotkyPanel = {
    draw(c, st, E) {
      c.fillStyle = 'rgba(8,8,16,.82)'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#16141f'; E.roundRect(110, 120, 1060, 440, 40); c.fill();
      c.strokeStyle = '#55526a'; c.lineWidth = 6; c.stroke();
      c.fillStyle = '#fff'; c.font = '700 30px system-ui, sans-serif'; c.textBaseline = 'top';
      c.fillText('Zoraď fotky: od najstaršej po najnovšiu.', 150, 140);
      if (E.showFr) { c.font = 'italic 22px system-ui, sans-serif'; c.fillStyle = '#b9b4cf'; c.fillText('Remets les photos dans l\'ordre : de la plus ancienne à la plus récente.', 150, 176 - 2 + 0); }
      FOTKY_SHOWN.forEach((ph, i) => {
        const r = fotkyRect(i), im = E.img(`art/fotka_${ph + 1}.jpg`), k = st.sel.indexOf(i);
        if (im && im.naturalWidth) c.drawImage(im, r[0], r[1] + 10, r[2], r[3]);
        if (k >= 0) {
          c.strokeStyle = '#ffe08a'; c.lineWidth = 6; c.strokeRect(r[0], r[1] + 10, r[2], r[3]);
          c.fillStyle = '#c0392b'; c.beginPath(); c.arc(r[0] + 24, r[1] + 34, 22, 0, 7); c.fill();
          c.fillStyle = '#fff'; c.font = '700 26px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(k + 1), r[0] + 24, r[1] + 35); c.textAlign = 'left';
        }
      });
      c.font = '22px system-ui'; c.fillStyle = '#9a96a8'; c.textBaseline = 'top';
      c.fillText('Touche les photos dans l\'ordre. Touche une photo choisie pour l\'enlever.', 150, 500);
    },
    async click(p, st, g) {
      const i = FOTKY_SHOWN.findIndex((_, j) => inR(p, fotkyRect(j)));
      if (i < 0) return null;
      const k = st.sel.indexOf(i);
      if (k >= 0) { st.sel.splice(k); return null; }
      st.sel.push(i);
      if (st.sel.length < 5) return null;
      const order = st.sel.map((j) => FOTKY_SHOWN[j]);
      if (order.every((v, j) => v === j)) return { done: true };
      st.tries = (st.tries || 0) + 1;
      const hints = [
        ['Nie. Pozri sa na vodu v potoku. Najprv je jej veľa.', 'Non. Regarde l\'eau du ruisseau. Au début, il y en a beaucoup.'],
        ['A to sivé za potokom: najprv žeriav, potom budova.', 'Et le truc gris derrière : d\'abord la grue, ensuite le bâtiment.'],
        ['Jar, leto, žeriav, budova, sucho.', 'Le printemps, l\'été, la grue, le bâtiment, la sécheresse.'],
      ];
      const h = hints[Math.min(st.tries - 1, hints.length - 1)];
      await g.say('andrea', h[0], h[1], [['žeriav', 'la grue'], ['budova', 'le bâtiment']]);
      st.sel = [];
      return null;
    },
  };

  // --- le dossier de 400 pages : trouver la consommation d'eau en dix minutes (chaque geste coute 20 secondes)
  const DOS_SECTIONS = [[5, 'Úvod', 'Introduction'], [48, 'Elektrina', 'Électricité'], [121, 'Hluk', 'Bruit'], [207, 'Cesty', 'Routes'], [312, 'Voda', 'Eau'], [365, 'Odpad', 'Déchets']];
  const DOS_TABS = [[48, '#d84a3a'], [121, '#3a7bd8'], [207, '#e8c43a'], [365, '#e8902a']];   // les onglets : aucun pour l'eau
  const DOS_BTNS = [['−100', -100], ['−10', -10], ['−1', -1], ['+1', 1], ['+10', 10], ['+100', 100]];
  const dosBtnRect = (i) => [190 + i * 160, 600, 140, 58];
  const dosTabRect = (i) => [1120, 165 + i * 72, 54, 56];
  const ZERO_LINE = [190, 330, 420, 46];
  function dosPage(n) {
    if (n === 1) return { title: ['Zelená vlna, a. s.', 'Zelená vlna, SA'], lines: [['Dátové centrum', 'Le centre de données'], ['Projektová dokumentácia', 'Dossier du projet']] };
    if (n === 2) return { title: ['', ''], lines: [] };
    if (n === 3) return { title: ['Obsah', 'Sommaire'], lines: DOS_SECTIONS.map(([pg, sk, fr], i) => [`${i + 1}. ${sk} ........ ${pg}`, `${i + 1}. ${fr} ........ ${pg}`]) };
    if (n === 4) return { title: ['', ''], lines: [] };
    let sec = DOS_SECTIONS[0];
    for (const q of DOS_SECTIONS) if (n >= q[0]) sec = q;
    const num = DOS_SECTIONS.indexOf(sec) + 1;
    if (n === 312) return { title: ['5. Voda', '5. Eau'], lines: [['Chladenie: uzavretý okruh.', 'Refroidissement : circuit fermé.'], ['Spotreba vody: 0 litrov za deň.', 'Consommation d\'eau : 0 litre par jour.']], zero: true };
    if (n === sec[0]) return { title: [`${num}. ${sec[1]}`, `${num}. ${sec[2]}`], lines: [['Tabuľka ' + num + '.1', 'Tableau ' + num + '.1']], filler: 6 };
    return { title: [`${sec[1]} (pokračovanie)`, `${sec[2]} (suite)`], lines: [], filler: 9 };
  }
  const dossierPanel = {
    draw(c, st, E) {
      c.fillStyle = 'rgba(8,8,16,.85)'; c.fillRect(0, 0, W, H);
      // le classeur ouvert, dessine
      c.fillStyle = '#7d7a72'; E.roundRect(130, 100, 1020, 470, 18); c.fill();
      c.fillStyle = '#f6efdc'; c.fillRect(160, 120, 470, 430); c.fillRect(650, 120, 470, 430);
      c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(626, 120, 28, 430);
      DOS_TABS.forEach(([pg, col], i) => { const r = dosTabRect(i); c.fillStyle = col; c.fillRect(r[0], r[1], r[2], r[3]); c.strokeStyle = 'rgba(0,0,0,.3)'; c.lineWidth = 2; c.strokeRect(r[0], r[1], r[2], r[3]); });
      const pg = dosPage(st.page), fr = E.showFr;
      c.textBaseline = 'top';
      c.fillStyle = '#7a6a48'; c.font = '20px system-ui'; c.fillText('strana ' + st.page, 180, 132); c.fillText('strana ' + (st.page + 1), 1040, 132);
      c.fillStyle = '#2a1a08'; c.font = '700 30px Georgia, serif'; c.fillText(pg.title[0], 190, 175);
      if (fr && pg.title[1]) { c.font = 'italic 19px system-ui'; c.fillStyle = '#7a6a48'; c.fillText(pg.title[1], 190, 210); }
      let y = 250;
      pg.lines.forEach(([sk, frl], i) => {
        c.fillStyle = '#1a1208'; c.font = (st.page === 3 ? '22px ' : '24px ') + 'Georgia, serif'; c.fillText(sk, 190, y);
        if (fr) { c.font = 'italic 17px system-ui'; c.fillStyle = '#7a6a48'; c.fillText(frl, 196, y + 26); }
        y += fr ? 50 : 38;
      });
      c.fillStyle = 'rgba(60,40,20,.25)';
      for (let i = 0; i < (pg.filler || 0); i++) c.fillRect(190, y + i * 30, 380 - ((i * 53) % 90), 8);
      for (let i = 0; i < 11; i++) c.fillRect(680, 180 + i * 30, 390 - ((i * 37 + st.page) % 110), 8);   // la page de droite : du texte qu'on ne lit pas
      // l'horloge : 11 h 56 + 20 s par geste (12 gestes avant midi)
      const sec = 56 * 60 + st.ticks * 20, mm = Math.floor(sec / 60), ss = sec % 60, left = st.max - st.ticks;
      c.fillStyle = left <= 4 ? '#ff7a6a' : '#ffe08a'; c.font = '700 30px system-ui'; c.fillText(`🕐 11:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, 140, 40);
      c.fillStyle = '#b9b4cf'; c.font = '22px system-ui'; c.fillText('Zatvárame o 12:00.' + (fr ? '  (On ferme à midi.)' : ''), 420, 46);
      DOS_BTNS.forEach(([l], i) => { const r = dosBtnRect(i); btn(E, c, r[0], r[1], r[2], r[3], l, false); });
      c.fillStyle = '#9a96a8'; c.font = '20px system-ui'; c.fillText('Cherche la consommation d\'eau. Chaque geste prend 20 secondes. Touche la bonne ligne quand tu la trouves.', 140, 672);
    },
    async click(p, st, g, E) {
      const go = (n) => { st.page = Math.max(1, Math.min(399, n)); st.ticks += 1; };
      const t = DOS_TABS.findIndex((_, i) => inR(p, dosTabRect(i)));
      if (t >= 0) go(DOS_TABS[t][0]);
      else {
        const b = DOS_BTNS.findIndex((_, i) => inR(p, dosBtnRect(i)));
        if (b >= 0) go(st.page + DOS_BTNS[b][1]);
        else if (st.page === 312 && inR(p, [ZERO_LINE[0] - 6, 250 + (E.showFr ? 50 : 38) - 4, ZERO_LINE[2], ZERO_LINE[3] + 10])) return { done: 'found' };
        else return null;
      }
      if (st.ticks >= st.max) return { done: 'timeout' };
      return null;
    },
  };
  async function readDossier(g) {
    for (;;) {
      const r = await g.openPanel(dossierPanel, { page: 1, ticks: 0, max: 12, fr: true });
      if (r === 'found') return;
      g.pose('pokladnicka', 'watch');
      await say(g, 'pokladnicka', 'Je dvanásť. Zatváram!', 'Il est midi. Je ferme !', [['zatvárať', 'fermer']]);
      g.pose('fox', 'surprised');
      await say(g, 'fox', 'Prosím, ešte päť minút!', 'S\'il vous plaît, encore cinq minutes !');
      g.pose('fox', null); g.pose('pokladnicka', 'no');
      await say(g, 'pokladnicka', 'No dobre. Ale rýchlo.', 'Bon, d\'accord. Mais vite.');
      g.pose('pokladnicka', null);
    }
  }
  async function showPhotos(g) {
    g.pose('andrea', 'give');
    await say(g, 'andrea', 'Pozri. Fotky nášho potoka. Ale sú pomiešané.', 'Regarde. Des photos de notre ruisseau. Mais elles sont mélangées.', [['fotka', 'la photo'], ['potok', 'le ruisseau']]);
    g.pose('andrea', null);
    await g.openPanel(fotkyPanel, { sel: [] });
    g.setFlag('fotky_ok');
    await say(g, 'fox', 'Náš potok! Ale… na poslednej fotke nie je voda.', 'Notre ruisseau ! Mais… sur la dernière photo, il n\'y a pas d\'eau.');
    await say(g, 'andrea', 'Už rok. Merala som ho každý týždeň, dva roky. Pre školu.', 'Depuis un an. Je l\'ai mesuré toutes les semaines, pendant deux ans. Pour le lycée.', [['merať', 'mesurer'], ['týždeň', 'la semaine']]);
    await say(g, 'andrea', 'Potom postavili toto. Zelená vlna. Dátové centrum.', 'Ensuite, ils ont construit ça. Zelená vlna. Un centre de données.', [['postaviť', 'construire']]);
    await say(g, 'andrea', 'O tri mesiace bol potok suchý.', 'Trois mois plus tard, le ruisseau était à sec.', [['suchý', 'sec']]);
    g.addCard('fotky');
    await say(g, 'fox', 'Povedala si to niekomu?', 'Tu l\'as dit à quelqu\'un ?');
    await say(g, 'andrea', 'Áno. A stratila som zápisník. To je dlhý príbeh.', 'Oui. Et j\'ai perdu mon carnet. C\'est une longue histoire.', [['stratiť', 'perdre'], ['zápisník', 'le carnet']]);
    await say(g, 'fox', 'Mám čas. Do nedele.', 'J\'ai le temps. Jusqu\'à dimanche.');
    await say(g, 'andrea', 'Tak nemáme čas.', 'Alors on n\'a pas le temps.');
    await say(g, 'andrea', 'Spis toho centra je verejný. Je na úrade životného prostredia. Bola som tam desaťkrát.', 'Le dossier de ce centre est public. Il est au bureau de l\'environnement. J\'y suis allée dix fois.', [['spis', 'le dossier'], ['verejný', 'public'], ['úrad', 'le bureau (administration)']]);
    await say(g, 'andrea', 'Pani pri okienku ma už nemôže vidieť. Ale ty si turista. Ničomu nerozumieš. Si dokonalý.', 'La dame du guichet ne peut plus me voir. Mais toi, tu es un touriste. Tu ne comprends rien. Tu es parfait.', [['dokonalý', 'parfait']]);
    await say(g, 'fox', 'Ďakujem.', 'Merci.');
    await say(g, 'andrea', 'Povieš: „Som Francúz. Robím referát o vode.“ A usmievaš sa.', 'Tu dis : « Je suis français. Je fais un exposé sur l\'eau. » Et tu souris.', [['referát', 'l\'exposé']]);
    await say(g, 'fox', 'Viem sa usmievať.', 'Je sais sourire.');
    await say(g, 'andrea', 'Nie príliš. Nemám rada ľudí, čo sa príliš usmievajú.', 'Pas trop. Je n\'aime pas les gens qui sourient trop.');
    await say(g, 'andrea', 'A naplň si fľašu. O ôsmej voda prestane tiecť.', 'Et remplis ta bouteille. À huit heures, l\'eau s\'arrête.', [['naplniť', 'remplir']]);
  }
  // la file d'attente : le tableau lumineux appelle les numeros en slovaque ; il faut reconnaitre le sien
  function tick(g) {
    if (g.flag('dossier_found')) return;
    const cur = (g.flagv('q_cur') || 44) + 1, mine = g.flagv('q_mine');
    g.setFlag('q_cur', cur > 63 ? 44 : cur);
    g.setFlag('q_blink', true);
    return say(g, 'hlas', `Číslo ${NUM[cur] || cur}, prosím, okienko jeden.`, '(Annonce : on appelle un numéro au guichet 1.)', [['okienko', 'le guichet']])
      .then(() => { g.setFlag('q_blink', false); g.after(cur === mine ? 25000 : 9000, tick); });
  }
  async function takeNumber(g) {
    if (g.has('cislo')) { await say(g, 'fox', `Už mám lístok. Číslo ${g.flagv('q_mine')}.`, `J'ai déjà un ticket. Numéro ${g.flagv('q_mine')}.`); return; }
    const cur = g.flagv('q_cur') || 44, mine = cur + 2;
    g.setFlag('q_cur', cur); g.setFlag('q_mine', mine); g.give('cislo');
    await say(g, 'narrator', `Cvak. Poradový lístok: ${mine}.`, `Clac. Ticket d'attente : ${mine}.`, [['poradový lístok', 'le ticket d\'attente']]);
    if (!g.flag('q_started')) { g.setFlag('q_started'); g.after(6000, tick); }
  }
  async function pokladnicka2(g) {
    if (g.flag('dossier_found')) { await say(g, 'pokladnicka', 'Ešte niečo? O dvanástej zatváram.', 'Autre chose ? Je ferme à midi.'); return; }
    if (!g.has('cislo')) { g.pose('pokladnicka', 'point'); await say(g, 'pokladnicka', 'Najprv si zoberte poradový lístok. Automat je pri dverách.', 'Prenez d\'abord un ticket d\'attente. La borne est près de la porte.', [['najprv', 'd\'abord']]); g.pose('pokladnicka', null); return; }
    const cur = g.flagv('q_cur'), mine = g.flagv('q_mine');
    if (cur < mine) { g.pose('pokladnicka', 'no'); await say(g, 'pokladnicka', 'Nie ste na rade. Počkajte, kým zavoláme vaše číslo.', 'Ce n\'est pas votre tour. Attendez qu\'on appelle votre numéro.', [['na rade', 'à son tour'], ['počkať', 'attendre']]); g.pose('pokladnicka', null); return; }
    if (cur > mine) { g.take('cislo'); g.pose('pokladnicka', 'no'); await say(g, 'pokladnicka', 'Vaše číslo už bolo. Zoberte si nové.', 'Votre numéro est déjà passé. Prenez-en un nouveau.', [['nový', 'nouveau']]); g.pose('pokladnicka', null); return; }
    g.pose('pokladnicka', 'talk');
    await say(g, 'pokladnicka', 'Dobrý deň. Čo potrebujete?', 'Bonjour. Qu\'est-ce qu\'il vous faut ?', [['potrebovať', 'avoir besoin']]);
    // 1. se presenter (la phrase d'Andrea) ; demander le dossier tout de suite rend la dame mefiante
    let intro = g.flag('urad_intro');
    while (!intro) {
      const i = await g.choice([
        { sk: 'Chcem vidieť spis Zelenej vlny.', fr: '' },
        { sk: 'Som Francúz. Robím referát o vode.', fr: '' },
        { sk: 'Mám rád vodu.', fr: '' },
      ], { noFr: true });
      if (i === 2) { await say(g, 'pokladnicka', 'Ja tiež. A čo konkrétne?', 'Moi aussi. Et concrètement ?'); continue; }
      if (i === 0) { g.pose('pokladnicka', 'surprised'); await say(g, 'pokladnicka', 'Spis? Načo? Kto ste?', 'Le dossier ? Pour quoi faire ? Qui êtes-vous ?'); g.pose('pokladnicka', null); continue; }
      intro = true;
    }
    g.setFlag('urad_intro');
    await say(g, 'pokladnicka', 'Referát o vode. Pekné. A čo konkrétne chcete?', 'Un exposé sur l\'eau. C\'est joli. Et vous voulez quoi, concrètement ?', [['konkrétne', 'concrètement']]);
    // 2. demander le dossier (le nom de l'entreprise vient de la pub du tram et des photos d'Andrea)
    for (;;) {
      const i = await g.choice([
        { sk: 'Mapu Košíc.', fr: '' },
        { sk: 'Spis Zelenej vlny, prosím.', fr: '' },
        { sk: 'Pohár vody.', fr: '' },
      ], { noFr: true });
      if (i === 1) break;
      if (i === 0) await say(g, 'pokladnicka', 'Mapy sú na turistických informáciách. Tu je životné prostredie.', 'Les plans, c\'est à l\'office du tourisme. Ici, c\'est l\'environnement.', [['životné prostredie', 'l\'environnement']]);
      else await say(g, 'pokladnicka', 'Aj ja by som si dala. Automat je prázdny.', 'Moi aussi, j\'en prendrais bien un. La fontaine est vide.');
    }
    g.pose('pokladnicka', 'read');
    await say(g, 'pokladnicka', 'Nie ste vy s tou zajačicou?', 'Vous n\'êtes pas avec la hase ?', [['zajačica', 'la hase']]);
    const j = await g.choice([
      { sk: 'Áno, je to moja kamarátka.', fr: '' },
      { sk: 'Akou zajačicou?', fr: '' },
      { sk: 'Nerozumiem, som Francúz.', fr: '' },
    ], { noFr: true });
    if (j === 0) {
      g.pose('pokladnicka', 'no');
      await say(g, 'pokladnicka', 'Tak to nie. Mám prestávku!', 'Alors non. Je suis en pause !', [['prestávka', 'la pause']]);
      g.take('cislo'); g.pose('pokladnicka', null);
      await say(g, 'fox', 'Hups. Andrea povedala: nič nevieš. Znova, s novým lístkom.', 'Oups. Andrea a dit : tu ne sais rien. On recommence, avec un nouveau ticket.');
      return;
    }
    g.pose('pokladnicka', 'watch');
    await say(g, 'narrator', 'Pani sa na Gaba dlho pozerá.', 'La dame regarde Gab longtemps.');
    await say(g, 'pokladnicka', 'Francúz. Z Paríža?', 'Français. De Paris ?');
    await say(g, 'fox', 'Z Lyonu.', 'De Lyon.');
    await say(g, 'pokladnicka', 'Je to blízko Paríža?', 'C\'est près de Paris ?', [['blízko', 'près']]);
    await say(g, 'fox', 'Nie.', 'Non.');
    await say(g, 'pokladnicka', 'Škoda.', 'Dommage.', [['škoda', 'dommage']]);
    g.pose('pokladnicka', 'give');
    await say(g, 'pokladnicka', 'Zelená vlna. Štyristo strán. Bez obrázkov. Máte desať minút.', 'Zelená vlna. Quatre cents pages. Pas de photos. Vous avez dix minutes.', [['strana', 'la page'], ['štyristo', 'quatre cents']]);
    await say(g, 'pokladnicka', 'O dvanástej zatváram. A aj tak ničomu nerozumiete.', 'Je ferme à midi. Et vous ne comprenez rien, de toute façon.');
    g.pose('pokladnicka', null);
    await readDossier(g);
    g.setFlag('dossier_found'); g.take('cislo');
    g.pose('fox', 'think');
    await say(g, 'fox', '„Voda. Chladenie: uzavretý okruh. Spotreba vody: nula litrov za deň.“', '« Eau. Refroidissement : circuit fermé. Consommation : zéro litre par jour. »', [['spotreba', 'la consommation'], ['nula', 'zéro']]);
    g.pose('fox', null); g.pose('pokladnicka', 'surprised');
    await say(g, 'pokladnicka', 'Čítate dobre, na Francúza.', 'Vous lisez bien, pour un Français.');
    await say(g, 'fox', 'Slovo „nula“ som sa naučil včera.', 'Le mot « nula », je l\'ai appris hier.');
    g.pose('pokladnicka', null);
    await say(g, 'fox', 'Odfotiť? Nad okienkom: „Fotografovanie zakázané.“ A pani sa pozerá.', 'Prendre une photo ? Au-dessus du guichet : « Photos interdites. » Et la dame regarde.', [['zakázané', 'interdit']]);
    await say(g, 'fox', 'Musím si to zapísať. Papier nemám… ale mám lístok z električky!', 'Il faut que je le note. Je n\'ai pas de papier… mais j\'ai mon ticket de tram !', [['zapísať', 'noter']]);
    if (!g.has('pero')) await say(g, 'fox', 'A čím budem písať?', 'Et avec quoi j\'écris ?', [['písať', 'écrire']]);
  }

  // ------------------------------------------------------------------ l'ouverture (cinematique) : docs/Jeu-conception.md, « Nouvelle ouverture »
  // Cartes : 1672 x 941 montrees en 1280 x 720 ; repere de Kosice mesure sur chaque image (art/PROMPTS_intro.md).
  const EU = [1190 * 1280 / 1672, 419 * 720 / 941];    // pointe du repere sur la carte de l'Europe
  const SK = [1252 * 1280 / 1672, 491 * 720 / 941];    // pointe du repere sur la carte de la Slovaquie
  const uvod = {
    cine: true, next: 'gare', doneFlag: 'intro_done', bgColor: '#e3c88e',
    title: { sk: 'Úvod', fr: 'Ouverture' },
    pics: [
      { id: 'europe', img: 'art/intro_europe.webp', alpha: 1 },
      { id: 'sk', img: 'art/intro_slovensko.webp', alpha: 0, view: { zoom: 0.8, ax: SK[0], ay: SK[1], sx: SK[0], sy: SK[1] } },
      { id: 'train', img: 'art/intro_train.webp', w: 2160, alpha: 0 },
    ],
    async onEnter(g) {
      g.fade(1);
      await g.animate(1200, (k) => g.fade(1 - k));
      // 1. l'Europe : la camera s'approche du repere, qui glisse vers la place qu'il aura sur la carte de la Slovaquie
      const zoom = g.animate(8000, (k) => g.pic('europe', { view: { zoom: 1 + 2 * k, ax: EU[0], ay: EU[1], sx: EU[0] + (SK[0] - EU[0]) * k, sy: EU[1] + (SK[1] - EU[1]) * k } }));
      g.caption('Leto.', 'L\'été.', [['leto', 'l\'été']]);
      await g.wait(3000);
      g.caption('Gab má pätnásť rokov. Pochádza z Francúzska.', 'Gab a quinze ans. Il vient de France.', [['Francúzsko', 'la France']]);
      await zoom;
      // fondu enchaine : les deux cartes grossissent ensemble, les deux reperes l'un sur l'autre
      await g.animate(1800, (k) => {
        g.pic('europe', { alpha: 1 - k, view: { zoom: 3 + 0.6 * k, ax: EU[0], ay: EU[1], sx: SK[0], sy: SK[1] } });
        g.pic('sk', { alpha: k, view: { zoom: 0.8 + 0.2 * k, ax: SK[0], ay: SK[1], sx: SK[0], sy: SK[1] } });
      });
      // 2. la Slovaquie
      g.caption('Dnes prichádza do Košíc.', 'Aujourd\'hui, il arrive à Košice.', [['dnes', 'aujourd\'hui']]);
      await g.wait(3500);
      g.caption(null);
      await g.animate(900, (k) => g.fade(k));
      g.pic('sk', { alpha: 0 }); g.pic('train', { alpha: 1 });
      await g.animate(900, (k) => g.fade(1 - k));
      // 3. le train : on reste un instant sur Gab, puis travelling vers la fenetre de la cathedrale pendant l'annonce
      await g.wait(2200);
      g.caption('📢 Vážení cestujúci, o chvíľu prídeme do Košíc. Konečná stanica.', '« Chers voyageurs, nous arrivons bientôt à Košice. Terminus. »',
        [['cestujúci', 'les voyageurs'], ['konečná stanica', 'le terminus']]);
      await g.animate(9000, (k) => g.pic('train', { view: { ax: 880 * k } }));
      await g.wait(2500);
      g.caption(null);
      await g.animate(1000, (k) => g.fade(k));
      g.setFlag('intro_done');
      g.goScene('gare');
    },
  };

  // ------------------------------------------------------------------ le jeu
  globalThis.ZG_DATA = {
    title: 'Zajko Quest',
    saveKey: 'zajko-quest-web-v2',   // v2 « Circuit fermé » : les anciennes sauvegardes ne se chargent plus
    start: 'uvod',
    chapters,
    notebook,
    // tableau d'enquete (docs/Jeu-conception-v2.md) : les indices, et la question de chaque chapitre (relier deux indices)
    board: {
      cards: {
        kniha: { icon: '📖', sk: 'Kniha hore nohami', fr: 'Le livre à l\'envers' },
        fontana: { icon: '⛲', sk: 'Fontána je prázdna', fr: 'La fontaine est vide' },
        zastavka: { icon: '🚏', sk: '„Ty vystupuješ tu.“ Vedela to.', fr: '« Tu descends ici. » Elle le savait.' },
        telefon: { icon: '📞', sk: '„Áno. Je tu.“', fr: '« Oui. Il est là. »' },
        fotky: { icon: '🏞️', sk: 'Potok vyschol 3 mesiace po stavbe', fr: 'Le ruisseau à sec 3 mois après le chantier' },
        permis: { icon: '📄', sk: 'Spis: spotreba vody 0 litrov', fr: 'Le dossier : consommation d\'eau 0 litre' },
        pan: { icon: '😁', sk: 'Pán, ktorý sa príliš usmieva', fr: 'Le monsieur qui sourit trop' },
      },
      questions: {
        q_nula: {
          sk: 'Nula litrov vody. Je to pravda?', fr: 'Zéro litre d\'eau. Est-ce vrai ?',
          pairs: [['permis', 'fotky']],
          ok: [
            { who: 'fox', sk: 'Na papieri nula litrov. Ale potok vyschol tri mesiace po stavbe.', fr: 'Sur le papier, zéro litre. Mais le ruisseau s\'est asséché trois mois après le chantier.' },
            { who: 'fox', sk: 'Niečo tu nesedí. Treba to overiť.', fr: 'Quelque chose cloche. Il faut vérifier.', words: [['overiť', 'vérifier'], ['nesedí', 'ça cloche']] },
          ],
          ko: [
            { who: 'fox', sk: 'Hmm… To nevysvetľuje tú nulu.', fr: 'Hmm… ça n\'explique pas ce zéro.' },
            { who: 'fox', sk: 'Ten pán? Usmieva sa, ale to nie je dôkaz.', fr: 'Ce monsieur ? Il sourit, mais ce n\'est pas une preuve.', words: [['dôkaz', 'la preuve']] },
            { who: 'fox', sk: 'Nula litrov… a čo sa stalo s potokom?', fr: 'Zéro litre… et qu\'est-il arrivé au ruisseau ?' },
          ],
        },
        q_nahoda: {
          sk: 'Čo vie Andrea?', fr: 'Qu\'est-ce qu\'Andrea sait ?',
          pairs: [['zastavka', 'telefon'], ['kniha', 'telefon']],
          ok: [
            { who: 'fox', sk: 'Vedela, kde vystupujem. A do telefónu niekomu povedala: „Je tu.“', fr: 'Elle savait où je descendais. Et au téléphone, elle a dit à quelqu\'un : « Il est là. »' },
            { who: 'fox', sk: 'Je to náhoda? Neviem. Komu volala? Neviem. Ale niečo vie.', fr: 'C\'est un hasard ? Je ne sais pas. Elle appelait qui ? Je ne sais pas. Mais elle sait quelque chose.', words: [['náhoda', 'le hasard']] },
          ],
          ko: [
            { who: 'fox', sk: 'Hmm… To spolu nesúvisí.', fr: 'Hmm… ça n\'a rien à voir.' },
            { who: 'fox', sk: 'Fontána? To je iný problém. Sucho.', fr: 'La fontaine ? C\'est un autre problème. La sécheresse.' },
            { who: 'fox', sk: 'Nie… Čo presne povedala do telefónu?', fr: 'Non… Qu\'est-ce qu\'elle a dit exactement au téléphone ?' },
          ],
        },
      },
    },
    helpers: {
      andrea: { who: 'andrea', icon: '🐰', title: 'Andrea', empty: { sk: 'Teraz si musíš poradiť sám, Gab.', fr: 'Là, il faut te débrouiller tout seul, Gab.' } },
      katka: { who: 'katka', icon: '📱', title: 'Katka', empty: { sk: 'Batéria je na nule…', fr: 'La batterie est à zéro…' }, dead: { sk: 'Telefón je vybitý.', fr: 'Le téléphone est déchargé.' } },
    },
    characters: Object.assign({}, ZA_DATA.characters, {
      automat: { name: 'Obrazovka', icon: '🖥️', color: '#4a6ac0' },   // l'ecran du distributeur (il ne parle pas : il affiche)
      teta: { name: 'Teta', icon: '🐇', color: '#c47a7a' },
      kacka: { name: 'Kačka', icon: '🦆', color: '#d8b43a' },
      zahradnik: { name: 'Záhradník', icon: '🧑‍🌾', color: '#5a9a4a' },
      pan: { name: 'Pán v obleku', icon: '🕴️', color: '#555a66' },
      pokladnicka: { name: 'Pokladníčka', icon: '🧑‍💼', color: '#b06ab0' },
      orol: { name: 'Pán Orol', icon: '🦅', color: '#8a5a2a' },
      predavacka: { name: 'Predavačka', icon: '🦝', color: '#c0602a' },
      ovca: { name: 'Pani na lavičke', icon: '🐑', color: '#8a7aa8' },
      babka: { name: 'Babka', icon: '🐐', color: '#a0522d' },
      jez: { name: 'Sused', icon: '🦔', color: '#7a6a3a' },
      bobor: { name: 'Pán s krížovkou', icon: '🦫', color: '#8a5a2a' },
      veverica: { name: 'Mama s kočíkom', icon: '🐿️', color: '#c0602a' },
      bocian: { name: 'Poštár', icon: '📦', color: '#7a5a3a' },
      hlas: { name: 'Hlásenie', icon: '📢', color: '#c0392b' },
      rys: { name: 'Chalan', icon: '🎧', color: '#8a7a5a' },
    }),
    items: Object.assign({}, ZA_DATA.items, {
      kluc: { sk: 'kľúč', fr: 'clé', icon: 'art/item_kluc.png' },
      cent: { sk: 'cent', fr: 'un centime', icon: 'art/item_cent.png' },
      deka: { sk: 'deka', fr: 'couverture', icon: 'art/item_deka.png' },
      uterak: { sk: 'utierka', fr: 'serviette', icon: 'art/obj_uterak.png' },
      flasa: { sk: 'fľaša vody', fr: 'bouteille d\'eau', icon: 'art/item_flasa.png' },
      flasa_prazdna: { sk: 'prázdna fľaša', fr: 'bouteille vide', icon: 'art/item_flasa_prazdna.png' },
      bankovka: { sk: 'bankovka 20 €', fr: 'billet de 20 €', icon: 'art/item_bankovka.png' },
      drobne: { sk: 'drobné', fr: 'la monnaie', icon: 'art/item_drobne.png' },
      listok_babka: { sk: 'babkin lístok', fr: 'le ticket de la mamie', icon: 'art/item_listok.png' },
      rebrik: { sk: 'rebrík', fr: 'échelle', icon: 'art/obj_rebrik.png' },
      zapisnik: { sk: 'zápisník', fr: 'carnet', icon: 'art/item_zapisnik.png' },
      pero: { sk: 'pero', fr: 'stylo', icon: 'art/item_pero.png' },
      cislo: { sk: 'poradový lístok', fr: 'ticket d\'attente', icon: 'art/item_cislo.png' },
      rucka: { sk: 'rúčka od kohútika', fr: 'poignée du robinet', emoji: '🔩' },
      listok_0l: { sk: 'lístok: „0 litrov?“', fr: 'ticket : « 0 litre ? »', icon: 'art/item_listok_0l.png' },
      papier: { sk: 'papier', fr: 'papier', emoji: '📄' },
      mot: { sk: 'lístok (odkaz)', fr: 'petit mot', emoji: '📝' },
      listky_vlak: { sk: 'lístky na vlak', fr: 'billets de train', emoji: '🎫' },
    }),
    // deux objets de l'inventaire qui vont ensemble
    preload: ['art/fotka_1.jpg', 'art/fotka_2.jpg', 'art/fotka_3.jpg', 'art/fotka_4.jpg', 'art/fotka_5.jpg'],
    combos: [
      { a: 'pero', b: 'listok_ok', async run(g) {
        if (!g.flag('dossier_found')) { await say(g, 'fox', 'Čo by som napísal? Ešte nič neviem.', 'J\'écrirais quoi ? Je ne sais encore rien.'); return; }
        g.take('listok_ok'); g.give('listok_0l');
        await say(g, 'narrator', 'Gab píše na zadnú stranu lístka: „0 litrov?“', 'Gab écrit au dos du ticket : « 0 litre ? »', [['napísať', 'écrire']]);
        g.addCard('permis');
        await say(g, 'fox', 'Dôkaz číslo jeden.', 'Pièce numéro un.', [['dôkaz', 'la preuve']]);
      } },
      { a: 'pero', b: 'papier', async run(g) {
        g.take('pero'); g.take('papier'); g.give('mot');
        await say(g, 'andrea', 'Píšem: „Teta, odišla som na pár dní. Neboj sa. Andrea.“', 'J\'écris : « Ma tante, je suis partie pour quelques jours. Ne t\'inquiète pas. Andrea. »', [['odkaz', 'le message']]);
        await say(g, 'andrea', 'Pozor: „lístok“ je aj odkaz, aj lístok na vlak.', 'Attention : « lístok », c\'est à la fois un petit mot et un billet de train.');
      } },
    ],
    scenes: {
      uvod,
      // =============================================================== INTRO : la gare de Kosice
      // la gare v2 (docs/Jeu-conception.md, « La gare (prologue), version 2 ») : decor 3:1, la camera suit Gab.
      // Le mot « lístok » se trouve en croisant deux indices : l'affiche (pilier) et l'ecriteau du distributeur.
      gare: {
        chapter: 'ch0', title: { sk: 'Stanica', fr: 'La gare' }, tint: ['#2f3d5a', '#9aa8bf'],
        bg: 'art/gare_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 600], [2160, 600], [2160, 712], [0, 712]], scale: { y0: 600, s0: 0.55, y1: 712, s1: 0.64 },
        sprites: [
          gab(470, 645),
          // figurants (2 poses qui alternent) : la vendeuse dans le kiosque, la brebis endormie, les pigeons
          { id: 'predavacka', img: 'art/predavacka_a.png', x: 742, y: 535, h: 148, abs: true, still: true, face: 1, poses: { b: { img: 'art/predavacka_b.png', h: 148 } }, alt: { pose: 'b', min: 4, max: 8, hold: [1.2, 2] } },
          // la brebis dort sur le banc ; elle n'ouvre un oeil que si on lui parle
          { id: 'ovca', img: 'art/ovca_a.png', x: 1000, y: 590, h: 200, abs: true, face: 1, poses: { b: { img: 'art/ovca_b.png', h: 200 } } },
          // le voyageur presse : il traverse le hall de temps en temps, devant les figurants (derriere Gab), s'arrete pour regarder sa montre
          { id: 'jelen', img: 'art/jelen_b.png', x: 2300, y: 618, h: 285, abs: true, hidden: true, face: -1, speed: 260,
            walkSheet: { img: 'art/jelen_a.png', frames: 1, h: 285, step: 7 }, poses: { b: { img: 'art/jelen_b.png', h: 285 } },
            patrol: { from: [2300, 618], to: [-200, 618], every: 22, first: 6, stop: { x: 1180, pose: 'b', dur: 1.6 } } },
          { id: 'holuby', img: 'art/holuby_a.png', x: 1290, y: 700, h: 80, abs: true, still: true, face: -1, poses: { b: { img: 'art/holuby_b.png', h: 58 } }, alt: { pose: 'b', min: 5, max: 10, hold: [0.5, 0.9] } },
        ],
        props: [
          { img: 'art/obj_fotoautomat.png', x: 235, y: 598, w: 250 },
          { img: 'art/obj_kiosk.png', x: 680, y: 598, w: 430 },
        ],
        ambient: [
          { img: 'art/amb_para.png', x: 120, y: 330, w: 50, alpha: 0.7, puff: { w1: 170, life: 4, every: 1.4, rise: 110, drift: 40 } },   // la vapeur de la loco, derriere la vitre
          { sweep: { area: [1220, 120, 2160, 560], period: 11, a: 0.12 } },
        ],
        hotspots: [
          { id: 'nastupiste', name: { sk: 'nástupištia', fr: 'les quais' }, poly: box(0, 160, 438, 330), walk: [420, 650],
            look: { sk: 'Nástupištia. Môj vlak tam ešte stojí.', fr: 'Les quais. Mon train y est encore.', words: [['nástupište', 'le quai'], ['vlak', 'le train']] },
            async onUse(g) { await say(g, 'fox', 'Späť do vlaku? Nie, nie!', 'Retourner dans le train ? Non, non !'); } },
          { id: 'tabula', name: { sk: 'tabuľa', fr: 'le tableau' }, poly: box(524, 157, 940, 310), walk: [730, 650],
            look: { who: 'narrator', sk: 'Príchody. Môj vlak prišiel načas.', fr: 'Les arrivées. Mon train est arrivé à l\'heure.', words: [['príchody', 'les arrivées'], ['načas', 'à l\'heure']] } },
          { id: 'lavicka', name: { sk: 'lavička', fr: 'le banc' }, poly: box(900, 467, 1107, 592), walk: [1080, 650],
            look: { sk: 'Lavička. Je obsadená.', fr: 'Un banc. Il est occupé.', words: [['lavička', 'le banc'], ['obsadený', 'occupé']] } },
          // le photomaton : une fausse piste (il ne rend pas la monnaie)
          { id: 'fotoautomat', name: { sk: 'fotoautomat', fr: 'le photomaton' }, poly: box(112, 330, 360, 598), walk: [380, 650], pose: 'use',
            async onUse(g) {
              await say(g, 'narrator', 'Fotoautomat. Štyri fotky: 5 €.', 'Un photomaton. Quatre photos : 5 €.', [['fotka', 'la photo']]);
              await say(g, 'fox', 'Pekný som, ale lístok to nie je.', 'Je suis beau, mais ça ne fait pas un ticket.');
            },
            onItem: {
              async bankovka(g) { await say(g, 'narrator', 'Fotoautomat berie len mince. A nevydáva.', 'Le photomaton ne prend que les pièces. Et il ne rend pas la monnaie.', [['mince', 'les pièces']]); },
              async drobne(g) { await say(g, 'fox', 'Fotky? Nie, tie mince sú na lístok!', 'Des photos ? Non, ces pièces, c\'est pour le ticket !'); },
            } },
          // le kiosque et la vendeuse
          { id: 'kiosk', name: { sk: 'kiosk', fr: 'le kiosque' }, poly: box(470, 295, 890, 598), walk: [700, 650],
            async onUse(g) { await kiosk(g, false); },
            onItem: { async bankovka(g) { await kiosk(g, true); } } },
          { id: 'predavacka', sprite: 'predavacka', name: { sk: 'predavačka', fr: 'la vendeuse' }, walk: [720, 650],
            async onUse(g) { await kiosk(g, false); },
            onItem: { async bankovka(g) { await kiosk(g, true); }, async drobne(g) { await say(g, 'predavacka', 'Už máš drobné. Choď na automat!', 'Tu as déjà de la monnaie. Va au distributeur !'); } } },
          { id: 'ovca', sprite: 'ovca', name: { sk: 'pani na lavičke', fr: 'la dame sur le banc' }, walk: [1060, 650],
            async onUse(g) {
              g.pose('ovca', 'b');
              await say(g, 'ovca', 'Pst! Spím.', 'Chut ! Je dors.', [['pst', 'chut'], ['spať', 'dormir']]);
              await g.sleep(600); g.pose('ovca', null);
            } },
          { id: 'holuby', sprite: 'holuby', name: { sk: 'holuby', fr: 'les pigeons' }, walk: [1200, 650],
            async onUse(g) {
              g.pose('holuby', 'b');
              await say(g, 'fox', 'Holuby! Aj vy ste smädné?', 'Des pigeons ! Vous avez soif, vous aussi ?', [['holub', 'le pigeon'], ['smädný', 'assoiffé']]);
              await g.sleep(500); g.pose('holuby', null);
            } },
          { id: 'hodiny', name: { sk: 'hodiny', fr: 'l\'horloge' }, poly: box(1178, 112, 1286, 219), walk: [1230, 650],
            look: { who: 'narrator', sk: 'Hodiny. Je popoludnie.', fr: 'L\'horloge. C\'est l\'après-midi.', words: [['hodiny', 'l\'horloge'], ['popoludnie', 'l\'après-midi']] } },
          // indice 1 : l'affiche (le francais decrit sans traduire « lístok »)
          { id: 'plagat', name: { sk: 'plagát', fr: 'l\'affiche' }, poly: box(1160, 246, 1303, 475), walk: [1230, 650],
            async onUse(g) { await clue(g, 'plagat'); } },
          { id: 'kos', name: { sk: 'kôš', fr: 'la poubelle' }, poly: box(1326, 474, 1392, 592), walk: [1360, 650],
            look: { sk: 'Kôš. Prázdny. Stanica je čistá.', fr: 'Une poubelle. Vide. La gare est propre.', words: [['kôš', 'la poubelle'], ['prázdny', 'vide']] } },
          // indice 2 : le distributeur (son ecriteau), puis l'achat quand on a compris le mot
          { id: 'automat', name: { sk: 'automat', fr: 'le distributeur' }, poly: box(1402, 350, 1512, 587), walk: [1380, 650], pose: 'use',
            async onUse(g) { await automat(g); } },
          { id: 'automat2', name: { sk: 'automat', fr: 'le distributeur' }, poly: box(1512, 350, 1623, 587), walk: [1490, 650], pose: 'use',
            async onUse(g) { await say(g, 'narrator', 'Na obrazovke: MIMO PREVÁDZKY.', 'Sur l\'écran : HORS SERVICE.', [['mimo prevádzky', 'hors service']]); await say(g, 'fox', 'Dobre, ten vedľa.', 'Bon, celui d\'à côté.'); } },
          { id: 'vychod', name: { sk: 'východ', fr: 'la sortie' }, poly: box(1750, 288, 2160, 577), walk: [1800, 650], pose: 'use',
            look: { sk: 'Východ. Vonku je zastávka električky.', fr: 'La sortie. Dehors, il y a l\'arrêt du tram.', words: [['východ', 'la sortie'], ['zastávka', 'l\'arrêt']] },
            async onUse(g) {
              if (!g.has('listok') && !g.has('listok_ok')) { await say(g, 'fox', 'Bez lístka? Radšej nie.', 'Sans ticket ? Mieux vaut pas.'); return; }
              await say(g, 'fox', 'Ideme na električku.', 'Direction le tram.');
              await g.showMap('ch1');
              g.goScene('tram');
            } },
        ],
        async onEnter(g) {
          if (g.flag('intro0')) return;
          g.setFlag('intro0'); g.noHelper();
          g.give('bankovka');
          await say(g, 'narrator', 'Železničná stanica v Košiciach.', 'La gare de Košice.', [['stanica', 'la gare']]);
          await say(g, 'narrator', 'Klikni na zem a Gab pôjde. Klikni na veci okolo.', 'Clique sur le sol pour marcher. Clique sur les choses autour de toi.');
        },
      },

      // ---------------------------------------------------------------- chapitre 3 : decor D, le bivouac (scene calme, image fixe)
      bivouac: {
        cine: true, noSkip: true, bgColor: '#0b1030',
        chapter: 'ch3', title: { sk: 'Bivak', fr: 'Le bivouac' },
        pics: [{ id: 'camp', img: 'art/raj_bivouac.webp', alpha: 1 }],
        async onEnter(g) {
          const CAMP = [470, 430];
          const zoom = (k) => g.pic('camp', { view: { zoom: 1 + 0.12 * k, ax: CAMP[0], ay: CAMP[1], sx: CAMP[0], sy: CAMP[1] } });
          g.fade(1);
          await g.animate(1500, (k) => g.fade(1 - k));
          const drift = g.animate(60000, zoom);   // « petite camera » : on s'approche tres lentement
          await g.wait(1200);
          await say(g, 'narrator', 'Je večer. Gab a Andrea oddychujú pri potoku.', 'C\'est le soir. Gab et Andrea se reposent au bord du ruisseau.', [['večer', 'le soir'], ['potok', 'le ruisseau']]);
          await say(g, 'fox', 'Nikdy som nespal pod hviezdami.', 'Je n\'ai jamais dormi sous les étoiles.', [['hviezdy', 'les étoiles']]);
          await say(g, 'andrea', 'Spal si pod jabloňou.', 'Tu as dormi sous un pommier.', [['jabloň', 'le pommier']]);
          await say(g, 'fox', 'To nie sú hviezdy. To sú jablká.', 'Ce ne sont pas des étoiles. Ce sont des pommes.', [['jablko', 'la pomme']]);
          await say(g, 'andrea', 'Spi, Gab.', 'Dors, Gab.');
          await g.wait(1500);
          await say(g, 'fox', 'Andrea?', 'Andrea ?');
          await say(g, 'andrea', 'Hm?', 'Hm ?');
          await say(g, 'fox', 'Ty nikdy neveríš líškam?', 'Tu ne fais jamais confiance aux renards ?', [['líška', 'le renard']]);
          await say(g, 'andrea', 'Nikdy. Okrem jednej.', 'Jamais. Sauf un.', [['okrem', 'sauf']]);
          await say(g, 'fox', 'Okrem jednej? Ktorej?', 'Sauf un ? Lequel ?');
          await g.wait(1200);
          await say(g, 'andrea', 'Spi.', 'Dors.');
          await say(g, 'fox', 'Ja viem, že som to ja.', 'Je sais que c\'est moi.');
          await say(g, 'andrea', 'Nič nevieš. Spi.', 'Tu ne sais rien. Dors.');
          await g.wait(2500);
          await g.animate(1800, (k) => g.fade(k));
          g.setFlag('bivouac_done');
          await g.showMap('ch4');
          g.end('Koniec ukážky', 'Fin de l\'aperçu');   // la suite : chapitre 4, Burka (orage dans les Hautes Tatras)
        },
      },

      // =============================================================== CHAPITRE 1 : le tram
      tram,

      // la rue, devant l'arret : le test des ages et la cle sous le pot
      // la rue v2 (decor 3:1 : art/PROMPTS_decors.md n° 5) : l'arret du tram, la maison de la tante, trois pots, le portillon.
      // Enigme : la cle est « pod modrým kvetináčom » ; on ne sait pas ce qu'est « modrý » : on le demande a Andrea (« ako obloha »).
      // Fausses pistes : les deux autres pots, le paillasson, la sonnette (la tante se reveille !), la boite aux lettres, le nain...
      rue: {
        chapter: 'ch1', title: { sk: 'Pred domom', fr: 'Devant la maison' }, tint: ['#b7a07a', '#d9c9a2'],
        bg: 'art/rue_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 590], [2160, 590], [2160, 705], [0, 705]], scale: { y0: 590, s0: 0.33, y1: 705, s1: 0.41 },
        sprites: [
          gab(150, 640), andrea(260, -1, 630),
          // le chat dort sur le pot bleu (2 poses), puis il va boire
          { id: 'macka', img: 'art/macka_a.png', x: 1326, y: 452, h: 50, abs: true, face: 1, speed: 120,
            walkSheet: { img: 'art/macka_ide.png', frames: 1, fps: 1, h: 56 },
            poses: { b: { img: 'art/macka_b.png', h: 50 }, pije: { img: 'art/macka_pije.png', h: 50 } }, alt: { pose: 'b', min: 4, max: 9, hold: [1, 2] } },
          { id: 'jez', img: 'art/jez_a.png', x: 770, y: 590, h: 138, abs: true, face: 1, poses: { b: { img: 'art/jez_b.png', h: 138 } }, alt: { pose: 'b', min: 3, max: 6, hold: [1.5, 2.5] } },
        ],
        // objets poses dans le decor (art/PROMPTS_decors.md n° 6)
        props: [
          { img: 'art/obj_noviny.png', x: 162, y: 482, w: 78 },
          { img: 'art/obj_cent.png', x: 710, y: 620, w: 22, when: (g) => !g.flag('cent') },
          { img: 'art/obj_rohozka.png', x: 1032, y: 584, w: 110 },
          { img: 'art/obj_slimak.png', x: 1102, y: 492, w: 30, when: (g) => g.flag('pot_cerveny') },
          { img: 'art/obj_schranka.png', x: 1577, y: 482, w: 42 },
          { img: 'art/obj_trpaslik.png', x: 1808, y: 552, w: 34 },
          { img: 'art/obj_miska.png', x: 1520, y: 598, w: 46, when: (g) => !g.flag('miska') },
          { img: 'art/obj_miska_plna.png', x: 1520, y: 598, w: 46, when: (g) => g.flag('miska') && !g.flag('macka_pije') },
        ],
        ambient: [
          { imgs: ['art/amb_kos_a.png', 'art/amb_kos_b.png'], x: 620, y: 604, w: 34, rand: [1.5, 4] },   // un merle qui sautille
        ],
        hotspots: [
          // --- fausses pistes et petits mots, de gauche a droite
          { id: 'lavicka', name: { sk: 'lavička', fr: 'le banc' }, poly: box(95, 470, 295, 545), walk: [200, 625],
            look: { sk: 'Lavička na zastávke. Niekto tu zabudol noviny.', fr: 'Un banc à l\'arrêt. Quelqu\'un a oublié son journal.', words: [['zastávka', 'l\'arrêt'], ['noviny', 'le journal']] } },
          { id: 'noviny', name: { sk: 'noviny', fr: 'le journal' }, poly: box(122, 452, 202, 484), walk: [175, 625],
            async onUse(g) {
              g.pose('fox', 'pick');
              await say(g, 'narrator', 'Noviny. „Počasie: zajtra slnko a modrá obloha.“', 'Le journal. « Météo : demain, du soleil et un ciel… « modrá ». »', [['počasie', 'la météo'], ['slnko', 'le soleil'], ['obloha', 'le ciel']]);
              g.pose('fox', null);
              await say(g, 'fox', 'Modrá obloha… Hmm.', 'Un ciel « modrá »… Hmm.');
              g.setFlag('read_noviny');
            } },
          { id: 'lampa', name: { sk: 'lampa', fr: 'le réverbère' }, poly: box(330, 105, 395, 580), walk: [360, 625],
            look: { sk: 'Stará lampa. Večer svieti.', fr: 'Un vieux réverbère. Il s\'allume le soir.', words: [['lampa', 'la lampe'], ['večer', 'le soir']] } },
          { id: 'lipa', name: { sk: 'lipa', fr: 'le tilleul' }, poly: [[430, 60], [700, 40], [820, 300], [560, 340], [565, 565], [480, 565], [490, 330], [180, 300]], walk: [520, 625],
            look: { who: 'andrea', sk: 'Lipa. To je náš národný strom!', fr: 'Un tilleul. C\'est notre arbre national !', words: [['lipa', 'le tilleul'], ['národný strom', 'l\'arbre national']] } },
          { id: 'cent', name: { sk: 'niečo lesklé', fr: 'quelque chose qui brille' }, poly: box(692, 600, 728, 624), walk: [700, 632],
            when: (g) => !g.flag('cent'),
            async onUse(g) {
              g.pose('fox', 'pick');
              g.give('cent'); g.setFlag('cent');
              await say(g, 'narrator', 'Jeden cent! Na šťastie.', 'Un centime ! Ça porte bonheur.', [['šťastie', 'la chance']]);
              g.pose('fox', null);
            } },
          { id: 'okno', name: { sk: 'okná', fr: 'les fenêtres' }, poly: [[965, 140], [1100, 140], [1100, 265], [965, 265], [965, 140]].concat([]), walk: [1030, 625],
            look: { sk: 'Záclony. Za nimi bliká televízor.', fr: 'Des rideaux. Derrière, une télé clignote.', words: [['záclona', 'le rideau']] } },
          { id: 'okno2', name: { sk: 'okná', fr: 'les fenêtres' }, poly: box(1165, 140, 1300, 265), walk: [1230, 625],
            look: { sk: 'Záclony. Za nimi bliká televízor.', fr: 'Des rideaux. Derrière, une télé clignote.', words: [['záclona', 'le rideau']] } },
          { id: 'lucerna', name: { sk: 'lampáš', fr: 'la lanterne' }, poly: box(905, 250, 962, 342), walk: [960, 625],
            look: { sk: 'Lampáš. Rovnaký ako v záhrade.', fr: 'Une lanterne. La même que dans le jardin.' } },
          // la porte : la sonnette est un piege (la tante se reveille)
          { id: 'dvere', name: { sk: 'dvere', fr: 'la porte' }, poly: box(980, 300, 1082, 486), walk: [1030, 625], pose: 'use',
            async onUse(g) {
              if (g.flag('rang')) { await say(g, 'fox', 'Znova zvoniť? Nie, ďakujem!', 'Sonner encore ? Non merci !'); return; }
              const i = await g.choice([{ sk: 'Zazvoniť.', fr: 'Sonner.' }, { sk: 'Radšej nie.', fr: 'Plutôt pas.' }]);
              if (i === 1) return;
              g.setFlag('rang');
              await say(g, 'narrator', 'Crrrrr!', 'Driiiing !', [['zvoniť', 'sonner']]);
              g.pose('andrea', 'surprised'); g.pose('fox', 'surprised');
              await say(g, 'teta', 'Kto je tam?!', 'Qui est là ?!', [['kto', 'qui']]);
              await say(g, 'andrea', 'Rýchlo, schovaj sa!', 'Vite, cache-toi !', [['schovať sa', 'se cacher']]);
              g.pose('andrea', null); g.pose('fox', null);
              await g.walk('fox', 560, 600);   // derriere le tilleul
              await say(g, 'andrea', 'To som ja, teta! … Nič, nič. Dobrú noc!', 'C\'est moi, tata ! … Rien, rien. Bonne nuit !');
              await say(g, 'narrator', 'Ticho. Teta sa vráti k televízoru.', 'Silence. La tante retourne devant sa télé.', [['ticho', 'le silence']]);
              g.pose('andrea', 'arms');
              await say(g, 'andrea', 'Gab! Povedala som: potichu!', 'Gab ! J\'ai dit : doucement !');
              g.pose('andrea', null);
            } },
          { id: 'rohozka', name: { sk: 'rohožka', fr: 'le paillasson' }, poly: box(978, 560, 1088, 588), walk: [1030, 625], pose: 'pick',
            async onUse(g) {
              await say(g, 'narrator', 'Pod rohožkou… nič. Len prach.', 'Sous le paillasson… rien. Juste de la poussière.', [['rohožka', 'le paillasson'], ['prach', 'la poussière']]);
              await say(g, 'fox', 'Škoda. Vo filmoch to vždy funguje.', 'Dommage. Dans les films, ça marche toujours.');
            } },
          // les trois pots : on ne connait pas encore les couleurs (le nom au survol ne les trahit pas)
          { id: 'cerveny', name: { sk: 'kvetináč', fr: 'un pot de fleurs' }, poly: box(1105, 395, 1172, 490), walk: [1140, 625], pose: 'pick',
            async onUse(g) {
              if (!g.knows('modrý')) { await say(g, 'fox', 'Ťažký kvetináč. A teta je hneď za oknom. Nebudem dvíhať všetky… Ktorý je ten modrý?', 'Un pot lourd. Et la tante est juste derrière la fenêtre. Je ne vais pas tous les soulever… Lequel est le « modrý » ?', [['ťažký', 'lourd']]); return; }
              await say(g, 'narrator', 'Červený kvetináč. Pod ním je… slimák!', 'Le pot « červený ». Dessous, il y a… un escargot !', [['slimák', 'l\'escargot']]);
              g.pose('fox', 'surprised'); await say(g, 'fox', 'Fuj! Prepáč, slimák.', 'Beurk ! Pardon, l\'escargot.', [['prepáč', 'pardon']]); g.pose('fox', null);
              g.setFlag('pot_cerveny');
            } },
          { id: 'zlty', name: { sk: 'kvetináč', fr: 'un pot de fleurs' }, poly: box(1195, 395, 1265, 490), walk: [1230, 625], pose: 'pick',
            async onUse(g) {
              if (!g.knows('modrý')) { await say(g, 'fox', 'Ťažký kvetináč. A teta je hneď za oknom. Nebudem dvíhať všetky… Ktorý je ten modrý?', 'Un pot lourd. Et la tante est juste derrière la fenêtre. Je ne vais pas tous les soulever… Lequel est le « modrý » ?', [['ťažký', 'lourd']]); return; }
              await say(g, 'narrator', 'Žltý kvetináč. Pod ním sú len mravce.', 'Le pot « žltý ». Dessous, il n\'y a que des fourmis.', [['mravce', 'les fourmis']]);
              g.setFlag('pot_zlty');
            } },
          { id: 'modry', name: { sk: 'kvetináč', fr: 'un pot de fleurs' }, poly: box(1288, 395, 1362, 490), walk: [1325, 625], pose: 'pick',
            async onUse(g) {
              if (g.has('kluc') || g.flag('gate')) { await say(g, 'fox', 'Tu už nič nie je.', 'Il n\'y a plus rien ici.'); return; }
              if (!g.knows('modrý')) { await say(g, 'fox', 'Na tomto spí kocúr. A teta je hneď za oknom. Nebudem dvíhať všetky… Ktorý je ten modrý?', 'Sur celui-là, il y a un chat. Et la tante est juste derrière la fenêtre. Je ne vais pas tous les soulever… Lequel est le « modrý » ?', [['ťažký', 'lourd']]); return; }
              if (!g.flag('macka_pije')) {   // le chat dort dessus
                g.pose('macka', 'b');
                await say(g, 'narrator', 'Na kvetináči spí veľký ryšavý kocúr. Zasyčí.', 'Sur le pot dort un gros chat roux. Il crache.', [['kocúr', 'le (gros) chat'], ['ryšavý', 'roux']]);
                await say(g, 'fox', 'Dobre, dobre! Nechám ťa spať.', 'D\'accord, d\'accord ! Je te laisse dormir.');
                g.pose('macka', null);
                g.setFlag('saw_cat');
                return;
              }
              g.give('kluc'); g.setFlag('keyfound');
              await say(g, 'narrator', 'Modrý kvetináč… a pod ním kľúč!', 'Le pot bleu… et dessous, la clé !', [['modrý', 'bleu']]);
              g.pose('fox', 'laugh'); await g.sleep(700); g.pose('fox', null);
            } },
          // le chat (sur le pot), la gamelle, le voisin herisson
          { id: 'macka', sprite: 'macka', name: { sk: 'kocúr', fr: 'le chat' }, walk: [1325, 625],
            async onUse(g) {
              if (g.flag('macka_pije')) { await say(g, 'fox', 'Pije. Nechaj ho.', 'Il boit. Laisse-le.'); return; }
              g.setFlag('saw_cat');
              const i = await g.choice([{ sk: 'Mňau?', fr: 'Miaou ?' }, { sk: 'Zlez dole, prosím.', fr: 'Descends, s\'il te plaît.' }, { sk: '(Postrčiť ho.)', fr: '(Le pousser.)' }]);
              g.pose('macka', 'b');
              if (i === 0) await say(g, 'narrator', 'Kocúr otvorí jedno oko. A zase ho zavrie.', 'Le chat ouvre un œil. Et le referme.', [['oko', 'l\'œil']]);
              else if (i === 1) await say(g, 'andrea', 'Kocúr nerozumie po slovensky. Ani po francúzsky.', 'Le chat ne comprend pas le slovaque. Ni le français.');
              else await say(g, 'narrator', 'Ššš! Kocúr zasyčí. Nehne sa.', 'Fffff ! Le chat crache. Il ne bouge pas.');
              g.pose('macka', null);
            },
            onItem: { async flasa(g) { await say(g, 'fox', 'Poliať kocúra? To by som už nemal ruky.', 'Arroser le chat ? Je n\'aurais plus de mains.'); } } },
          { id: 'miska', name: { sk: 'miska', fr: 'la gamelle' }, poly: box(1490, 570, 1552, 604), walk: [1420, 630], pose: 'pick',
            async onUse(g) {
              if (g.flag('miska')) { await say(g, 'fox', 'Plná. Teraz počkáme.', 'Pleine. Maintenant, on attend.'); return; }
              await say(g, 'narrator', 'Miska pre mačku. Prázdna a suchá.', 'Une gamelle pour chat. Vide et sèche.', [['miska', 'la gamelle'], ['prázdny', 'vide'], ['suchý', 'sec']]);
              g.setFlag('saw_miska');
            },
            onItem: {
              async flasa(g) {
                if (g.flag('miska')) return;
                g.take('flasa'); g.give('flasa_prazdna'); g.setFlag('miska'); g.setFlag('flasa_used');
                await say(g, 'narrator', 'Gab naleje vodu do misky. Glg, glg.', 'Gab verse l\'eau dans la gamelle. Glou, glou.', [['naliať', 'verser']]);
                await g.sleep(500);
                g.pose('macka', 'b');
                await say(g, 'narrator', 'Kocúr zdvihne hlavu. Voda!', 'Le chat lève la tête. De l\'eau !');
                const c = g.sprite('macka');
                if (c) { c.alt = null; c.pose = null; c.y = 600; c.x = 1370; }   // il saute du muret
                await g.walk('macka', 1560, 600);
                g.face('macka', -1); g.pose('macka', 'pije'); g.setFlag('macka_pije');
                await say(g, 'andrea', 'Aj on je smädný. Všetci sú smädní.', 'Lui aussi a soif. Tout le monde a soif.', [['smädný', 'assoiffé']]);
              },
            } },
          { id: 'jez', sprite: 'jez', name: { sk: 'sused', fr: 'le voisin' }, walk: [700, 625],
            async onUse(g) {
              g.pose('jez', 'b');
              await say(g, 'jez', 'Krhla je prázdna. Voda tečie len ráno, dve hodiny.', 'L\'arrosoir est vide. L\'eau ne coule que le matin, deux heures.', [['krhla', 'l\'arrosoir'], ['tiecť', 'couler']]);
              await say(g, 'jez', 'Také sucho som ešte nezažil.', 'Une sécheresse pareille, je n\'ai jamais vu ça.', [['sucho', 'la sécheresse']]);
              g.pose('jez', null);
            },
            onItem: { async flasa(g) { await say(g, 'jez', 'Ďakujem, mladý. Ale nechaj si ju. Niekto je smädnejší ako moje kvety.', 'Merci, jeune homme. Mais garde-la. Quelqu\'un a plus soif que mes fleurs.'); } } },
          { id: 'jablone', name: { sk: 'jabloň', fr: 'le pommier' }, poly: [[1440, 160], [1620, 80], [1880, 170], [1900, 330], [1700, 400], [1460, 360]], walk: [1640, 625],
            look: { sk: 'Jablká! Ale sú príliš vysoko. A ešte zelené.', fr: 'Des pommes ! Mais elles sont trop haut. Et encore vertes.', words: [['jablko', 'la pomme'], ['zelený', 'vert']] } },
          { id: 'schranka', name: { sk: 'schránka', fr: 'la boîte aux lettres' }, poly: box(1554, 436, 1600, 484), walk: [1560, 625],
            look: { sk: 'Poštová schránka. Zamknutá. Teta dostáva veľa listov.', fr: 'La boîte aux lettres. Fermée à clé. La tante reçoit beaucoup de lettres.', words: [['schránka', 'la boîte aux lettres'], ['list', 'la lettre']] } },
          { id: 'branka', name: { sk: 'bránka', fr: 'le portillon' }, poly: box(1600, 395, 1716, 546), walk: [1655, 625], pose: 'use',
            async onUse(g) {
              if (!g.has('kluc')) { await say(g, 'fox', 'Bránka je zamknutá.', 'Le portillon est fermé à clé.', [['zamknutá', 'fermé à clé']]); return; }
              await say(g, 'narrator', 'Cvak! Bránka sa otvára.', 'Clac ! Le portillon s\'ouvre.');
              g.take('kluc'); g.setFlag('gate');
              g.goScene('zahrada');
            } },
          { id: 'trpaslik', name: { sk: 'trpaslík', fr: 'le nain de jardin' }, poly: box(1788, 484, 1828, 554), walk: [1810, 625],
            look: { sk: 'Záhradný trpaslík. Usmieva sa. Nič nevie.', fr: 'Un nain de jardin. Il sourit. Il ne sait rien.', words: [['trpaslík', 'le nain']] } },
          { id: 'katedrala', name: { sk: 'katedrála', fr: 'la cathédrale' }, poly: box(1950, 60, 2125, 220), walk: [2000, 625],
            look: { sk: 'Katedrála. Vidno ju z celého mesta.', fr: 'La cathédrale. On la voit de toute la ville.' } },
          // Andrea : c'est elle qui explique « modrý »
          { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [330, 630],
            topics: [
              { id: 'modry', when: (g) => g.flag('heard_modry') && !g.knows('modrý'), sk: 'Modrý? Čo je modrý?', fr: '« Modrý » ? C\'est quoi, « modrý » ?',
                async run(g) {
                  g.pose('andrea', 'point');
                  await say(g, 'andrea', 'Modrý ako obloha! Pozri hore.', '« Modrý » comme le ciel ! Regarde en haut.', [['obloha', 'le ciel']]);
                  g.pose('andrea', null);
                  g.pose('fox', 'think');
                  await say(g, 'fox', 'Obloha je… modrá. Modrá ako… Aha! Modrý je modrý!', 'Le ciel est… bleu. Bleu comme… Ah ! « Modrý », c\'est bleu !');
                  g.pose('fox', null);
                  g.learn('modrý', 'bleu');
                } },
              { need: 'kľúč', sk: 'Kde je kľúč?', fr: 'Où est la clé ?', async run(g) { await say(g, 'andrea', 'Pod modrým kvetináčom. Pod!', 'Sous le pot de fleurs « modrý ». Sous !'); } },
              { need: 'teta', sk: 'Čo je s tetou?', fr: 'Qu\'est-ce qu\'elle a, ta tante ?', async run(g) { await say(g, 'andrea', 'Je milá. Ale veľká a silná. Radšej ju nebudíme.', 'Elle est gentille. Mais grande et forte. Mieux vaut ne pas la réveiller.', [['silná', 'forte']]); } },
              { need: 'trinásť', sk: 'Katka má trinásť rokov?', fr: 'Katka a treize ans ?', async run(g) { await say(g, 'andrea', 'Áno. A Maťo má štrnásť.', 'Oui. Et Maťo en a quatorze.'); } },
            ] },
        ],
        hints: [
          { id: 'rue_modry', when: (g) => !g.knows('modrý') && !g.has('kluc') && !g.flag('gate'), levels: [
            { sk: 'Kľúč je pod modrým kvetináčom. Ale čo je „modrý“?', fr: 'La clé est sous le pot « modrý ». Mais c\'est quoi, « modrý » ?' },
            { sk: 'Opýtaj sa ma: „Čo je modrý?“', fr: 'Demande-moi : « C\'est quoi, modrý ? »' },
            { sk: 'Klikni na mňa a vyber otázku o farbe.', fr: 'Clique sur moi et choisis la question sur la couleur.' } ] },
          { id: 'rue_cat', when: (g) => g.knows('modrý') && !g.flag('macka_pije'), levels: [
            { sk: 'Kocúr spí na modrom kvetináči. Čo by ho prilákalo?', fr: 'Le chat dort sur le pot bleu. Qu\'est-ce qui l\'attirerait ?' },
            { sk: 'Je horúco. Aj kocúr je smädný. Pozri sa na miske.', fr: 'Il fait chaud. Le chat aussi a soif. Regarde la gamelle.' },
            { sk: 'Nalej vodu z fľaše do misky.', fr: 'Verse l\'eau de ta bouteille dans la gamelle.' } ] },
          { id: 'rue_key', when: (g) => !g.has('kluc') && !g.flag('gate'), levels: [
            { sk: 'Modrý je ako obloha. Ktorý kvetináč je modrý?', fr: '« Modrý », c\'est comme le ciel. Quel pot est de cette couleur ?' },
            { sk: 'Tretí kvetináč, vpravo.', fr: 'Le troisième pot, à droite.' } ] },
          { id: 'rue_gate', when: (g) => g.has('kluc'), levels: [
            { sk: 'Máš kľúč. Čo otvára?', fr: 'Tu as la clé. Qu\'est-ce qu\'elle ouvre ?' },
            { sk: 'Klikni na bránku.', fr: 'Clique sur le portillon.' } ] },
        ],
        async onEnter(g) {
          if (g.flag('macka_pije')) { const c = g.sprite('macka'); if (c) { c.alt = null; c.x = 1560; c.y = 600; c.face = -1; c.pose = 'pije'; } }
          if (g.flag('quiz')) return;
          g.setFlag('quiz');
          await g.walk('andrea', 420, 625); g.face('andrea', -1);
          await say(g, 'narrator', 'Pred domom Andreinej tety. Je podvečer.', 'Devant la maison de la tante d\'Andrea. C\'est la fin d\'après-midi.', [['podvečer', 'en fin de journée']]);
          await say(g, 'fox', 'Ty vystupuješ tiež?', 'Tu descends aussi ?');
          await say(g, 'andrea', 'Tvoj hostel je drahý. A moja teta má záhradu.', 'Ton auberge est chère. Et ma tante a un jardin.', [['drahý', 'cher'], ['záhrada', 'le jardin']]);
          await say(g, 'fox', 'Tvoja teta súhlasí?', 'Ta tante est d\'accord ?');
          await say(g, 'andrea', 'Teta chodí spať o deviatej. Pst! Nesmie ťa vidieť.', 'Ma tante se couche à neuf heures. Chut ! Elle ne doit pas te voir.', [['teta', 'la tante'], ['nesmie', 'elle ne doit pas']]);
          await say(g, 'andrea', 'Ale najprv jeden test. Si naozaj Gab?', 'Mais d\'abord un petit test. Tu es vraiment Gab ?');
          await say(g, 'andrea', 'Mám šestnásť rokov. Koľko rokov máš ty?', 'J\'ai seize ans. Et toi, tu as quel âge ?', [['šestnásť', 'seize'], ['rok', 'l\'an']]);
          for (;;) {
            const i = await g.choice([{ sk: 'Mám desať rokov.', fr: 'J\'ai dix ans.' }, { sk: 'Mám pätnásť rokov.', fr: 'J\'ai quinze ans.' }, { sk: 'Mám päť rokov.', fr: 'J\'ai cinq ans.' }], { noFr: true });
            if (i === 1) break;
            await say(g, 'andrea', i === 0 ? 'Desať? To si mal pred piatimi rokmi!' : 'Päť? Ty si bábätko?', i === 0 ? 'Dix ? Tu les avais il y a cinq ans !' : 'Cinq ? T\'es un bébé ?');
          }
          await say(g, 'andrea', 'Pätnásť. Dobre. A Katka? Mala osem. Koľko má teraz?', 'Quinze. Bien. Et Katka ? Elle avait huit ans. Elle a quel âge maintenant ?', [['pätnásť', 'quinze'], ['osem', 'huit']]);
          for (;;) {
            const i = await g.choice([{ sk: 'Katka má osem rokov.', fr: 'Katka a huit ans.' }, { sk: 'Katka má trinásť rokov.', fr: 'Katka a treize ans.' }, { sk: 'Katka má sedemnásť rokov.', fr: 'Katka a dix-sept ans.' }], { noFr: true });
            if (i === 1) break;
            await say(g, 'andrea', i === 0 ? 'Osem? To bolo pred piatimi rokmi!' : 'Sedemnásť? To je veľa!', i === 0 ? 'Huit ? C\'était il y a cinq ans !' : 'Dix-sept ? C\'est beaucoup !');
          }
          await say(g, 'andrea', 'Trinásť. A Maťo má štrnásť.', 'Treize. Et Maťo en a quatorze.', [['trinásť', 'treize'], ['štrnásť', 'quatorze']]);
          // l'indice de la cle, sans traduire « modrý » : il faudra le comprendre (demander a Andrea)
          await say(g, 'andrea', 'Dobre. Si to ty. Kľúč od bránky je pod modrým kvetináčom.', 'Bien. C\'est bien toi. La clé du portillon est sous le pot de fleurs… « modrý ».',
            [['kľúč', 'la clé'], ['bránka', 'le portillon'], ['pod', 'sous'], ['kvetináč', 'le pot de fleurs']]);
          g.setFlag('heard_modry');
          g.pose('andrea', 'whisper');
          await say(g, 'andrea', 'A potichu, prosím. Teta pozerá televíziu.', 'Et doucement, s\'il te plaît. Ma tante regarde la télé.', [['potichu', 'doucement'], ['televízia', 'la télé']]);
          await say(g, 'andrea', 'Ja strážim okno.', 'Moi, je surveille la fenêtre.', [['strážiť', 'surveiller']]);
          g.pose('andrea', null);
        },
      },

      // le jardin le soir : lampe, couverture, pommier
      // le jardin v2 (decor 3:1 : art/PROMPTS_decors.md n° 7), le soir. Prendre la couverture, aveugler la lampe, dormir sous le pommier.
      // La lampe a un detecteur de mouvement (pas d'interrupteur utile) : il faut le couvrir avec la serviette oubliee sur le hamac
      // (on y va sans bruit par les pierres plates), en montant sur la brouette, qui est juste a cote du lampadaire.
      zahrada: {
        chapter: 'ch1', title: { sk: 'Záhrada', fr: 'Le jardin' }, tint: ['#223049', '#4d6a55'],
        bg: 'art/zahrada_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 590], [2160, 590], [2160, 712], [0, 712]], scale: { y0: 590, s0: 0.5, y1: 712, s1: 0.6 },
        sprites: [gab(130, 640), andrea(230, 1, 630)],
        dim: (g) => (g.flag('lampoff') ? 0.38 : 0.04),
        props: [
          { glow: 230, x: 1602, y: 205, when: (g) => !g.flag('lampoff') },
          // lampe eteinte : on eteint aussi la lanterne peinte et la tache de lumiere sur l'herbe
          { shade: 150, a: 0.8, x: 1602, y: 200, when: (g) => g.flag('lampoff') },
          { shade: 260, a: 0.55, sy: 0.4, x: 1640, y: 610, when: (g) => g.flag('lampoff') },
          { img: 'art/obj_deka.png', x: 820, y: 476, w: 150, when: (g) => !g.flag('deka') },
          { img: 'art/obj_senzor.png', x: 1600, y: 322, w: 20 },                                                   // le detecteur, sur le lampadaire
          { img: 'art/obj_uterak.png', x: 1600, y: 330, w: 34, when: (g) => g.flag('lampoff') },                  // ... couvert par la serviette
          { img: 'art/obj_uterak.png', x: 1790, y: 470, w: 62, when: (g) => !g.flag('uterak') },                  // la serviette, oubliee sur le hamac
          // l'allee de gravier pres de la maison (elle crisse !) et les pierres plates posees dedans
          { img: 'art/obj_strk.png', x: 1600, y: 690, w: 320, h: 92, alpha: 0.95 },
          { img: 'art/obj_strk.png', x: 1860, y: 690, w: 320, h: 92, alpha: 0.95 },
          { img: 'art/obj_kamene.png', x: 1740, y: 676, w: 300, h: 70 },
          // la fenetre de la tante se rallume pour le coup de telephone (scene 6)
          { glow: 170, x: 1855, y: 165, color: 'rgba(255,220,140,.55)', when: (g) => g.flag('phone') },
        ],
        ambient: [
          { flies: { n: 12, area: [180, 420, 1480, 610] } },                                                              // lucioles
          { img: 'art/amb_mol.png', x: 1600, y: 200, w: 24, cross: { from: [1555, 205], to: [1650, 185], dur: 1.6, every: 0, arc: 18 }, when: (g) => !g.flag('lampoff') },
          { img: 'art/amb_mol.png', x: 1600, y: 200, w: 20, phase: 0.8, cross: { from: [1645, 175], to: [1560, 195], dur: 1.9, every: 0, arc: -14 }, when: (g) => !g.flag('lampoff') },
        ],
        triggers: [
          // le gravier : si on marche dessus (hors des pierres), il crisse, la tante se reveille
          { x: [1478, 2000], move: true, when: (g) => !g.flag('on_stones') && !g.flag('lampoff'), async run(g) {
            await say(g, 'narrator', 'Krch, krch, krch! Štrk škrípe pod nohami.', 'Crouch, crouch, crouch ! Le gravier crisse sous les pattes.', [['štrk', 'le gravier'], ['škrípať', 'crisser']]);
            g.pose('fox', 'surprised');
            await say(g, 'teta', 'Kto je to tam vonku?!', 'Qui est là, dehors ?!');
            await say(g, 'andrea', '(z okna) Nikto, teta! Mačka!', '(de la fenêtre) Personne, tata ! Le chat !');
            g.pose('fox', null);
            await say(g, 'fox', 'Uf. Potichu… Kade sa dá ísť bez hluku?', 'Ouf. Doucement… Par où on peut passer sans bruit ?', [['hluk', 'le bruit']]);
            await g.walk('fox', 1420, 640);
          } },
        ],
        hotspots: [
          { id: 'branka', name: { sk: 'bránka', fr: 'le portillon' }, poly: box(55, 380, 170, 575), walk: [120, 630],
            look: { sk: 'Bránka na ulicu. Teraz nie, je večer.', fr: 'Le portillon vers la rue. Pas maintenant, c\'est le soir.' } },
          { id: 'kolna', name: { sk: 'kôlňa', fr: 'la cabane' }, poly: box(235, 275, 590, 480), walk: [430, 630],
            look: { sk: 'Kôlňa plná dreva. Spať na dreve? Nie, ďakujem.', fr: 'Une cabane pleine de bois. Dormir sur du bois ? Non merci.', words: [['kôlňa', 'la cabane'], ['drevo', 'le bois']] } },
          { id: 'krhla', name: { sk: 'krhla', fr: 'l\'arrosoir' }, poly: box(380, 485, 480, 580), walk: [440, 630], pose: 'pick',
            async onUse(g) { await say(g, 'narrator', 'Krhla. Prázdna. Záhrada je suchá.', 'Un arrosoir. Vide. Le jardin est sec.', [['krhla', 'l\'arrosoir'], ['suchý', 'sec']]); } },
          { id: 'snura', name: { sk: 'šnúra', fr: 'la corde à linge' }, poly: box(625, 340, 940, 470), walk: [780, 630],
            look: { sk: 'Tričko, šortky, uterák. Nič na spanie.', fr: 'Un tee-shirt, un short, une serviette. Rien pour dormir.', words: [['tričko', 'le tee-shirt'], ['uterák', 'la serviette']] } },
          { id: 'deka', name: { sk: 'deka', fr: 'la couverture' }, poly: box(745, 340, 895, 480), walk: [820, 630], pose: 'pick',
            when: (g) => !g.flag('deka'),
            async onUse(g) {
              g.give('deka'); g.setFlag('deka');
              await say(g, 'narrator', 'Na šnúre visí stará deka. Gab si ju berie.', 'Une vieille couverture pend à la corde. Gab la prend.', [['deka', 'la couverture'], ['šnúra', 'la corde à linge']]);
            } },
          { id: 'jablon', name: { sk: 'jabloň', fr: 'le pommier' }, poly: [[700, 40], [1470, 40], [1470, 300], [1110, 330], [1110, 575], [950, 575], [960, 330], [700, 300]], walk: [1040, 640],
            async onUse(g) {
              if (!g.flag('deka')) { await say(g, 'fox', 'Bez deky? Bude mi zima.', 'Sans couverture ? J\'aurai froid.'); return; }
              if (!g.flag('lampoff')) {
                await say(g, 'narrator', 'Lampa osvetľuje celú záhradu. V tetinom okne sa pohne záclona.', 'La lampe éclaire tout le jardin. À la fenêtre de la tante, un rideau bouge.', [['záclona', 'le rideau']]);
                g.pose('fox', 'surprised');
                await say(g, 'teta', 'Kto je v mojej záhrade?!', 'Qui est dans mon jardin ?!');
                await say(g, 'andrea', 'Ach nie! Rýchlo, preč! A vypni tú lampu!', 'Oh non ! Vite, filons ! Et éteins cette lampe !', [['vypnúť', 'éteindre']]);
                g.restart();
                return;
              }
              g.pose('fox', 'sit');
              await say(g, 'andrea', 'Dobrú noc, Gab.', 'Bonne nuit, Gab.');
              for (;;) {
                const i = await g.choice([{ sk: 'Dobrú noc, Andrea.', fr: 'Bonne nuit, Andrea.' }, { sk: 'Dobré ráno, Andrea.', fr: 'Bonjour, Andrea.' }]);
                if (i === 0) break;
                await say(g, 'andrea', 'Ráno? Veď je noc!', 'Le matin ? Mais c\'est la nuit !');
              }
              await say(g, 'narrator', 'Gab leží pod jabloňou a pozerá na hviezdy.', 'Gab est allongé sous le pommier et regarde les étoiles.', [['jabloň', 'le pommier'], ['hviezdy', 'les étoiles']]);
              await say(g, 'fox', 'Odchádzam v nedeľu. O týždeň.', 'Je repars dimanche. Dans une semaine.', [['nedeľa', 'le dimanche'], ['týždeň', 'la semaine']]);
              await say(g, 'andrea', 'Ja viem. Turisti vždy odchádzajú v nedeľu. Dobrú noc, Gab.', 'Je sais. Les touristes repartent toujours le dimanche. Bonne nuit, Gab.');
              // scene 6 : la fenetre
              await g.sleep(1200);
              g.setFlag('phone');
              await say(g, 'narrator', 'V dome sa rozsvieti okno. Andrea telefonuje, potichu.', 'Dans la maison, une fenêtre s\'allume. Andrea téléphone, tout bas.', [['telefonovať', 'téléphoner']]);
              await say(g, 'andrea', 'Áno. Je tu.', 'Oui. Il est là.', [['je tu', 'il est là']]);
              await say(g, 'andrea', 'Nie. Nič som mu nepovedala.', 'Non. Je ne lui ai rien dit.', [['nič', 'rien']]);
              await say(g, 'andrea', 'Zajtra.', 'Demain.', [['zajtra', 'demain']]);
              g.setFlag('phone', false);
              await say(g, 'narrator', 'Okno zhasne.', 'La fenêtre s\'éteint.');
              g.pose('fox', 'think');
              await say(g, 'fox', '„Je tu“? Kto? Ja?', '« Il est là » ? Qui ? Moi ?');
              g.addCard('telefon');
              await say(g, 'fox', 'Niečo tu nesedí. Pozriem sa na tabuľu.', 'Quelque chose cloche. Je regarde le tableau.', [['tabuľa', 'le tableau']]);
              await g.askBoard('q_nahoda');
              g.pose('fox', 'sit');
              await say(g, 'narrator', 'Gab chce na to myslieť. Ale dva dni vo vlaku… Zaspí.', 'Gab veut y réfléchir. Mais deux jours de train… Il s\'endort.', [['zaspať', 's\'endormir']]);
              await g.showMap('ch2');
              g.goScene('rano');
            } },
          { id: 'buda', name: { sk: 'búda', fr: 'la niche' }, poly: box(1125, 420, 1310, 565), walk: [1215, 630],
            look: { sk: 'Psia búda… bez psa. Uf.', fr: 'Une niche… sans chien. Ouf.', words: [['búda', 'la niche'], ['pes', 'le chien']] } },
          { id: 'furik', name: { sk: 'fúrik', fr: 'la brouette' }, poly: box(1385, 460, 1590, 565), walk: [1440, 630], pose: 'use',
            async onUse(g) {
              if (g.flag('lampoff')) { await say(g, 'fox', 'Dobrý fúrik. Ďakujem.', 'Brave brouette. Merci.'); return; }
              if (!g.flag('senzor_seen')) { await say(g, 'fox', 'Fúrik. Spať vo fúriku? To by bolo… zaujímavé.', 'Une brouette. Dormir dans une brouette ? Ce serait… original.', [['fúrik', 'la brouette']]); return; }
              await say(g, 'narrator', 'Fúrik stojí hneď pri lampe. Gab naň opatrne vylezie. Teraz je senzor pred jeho nosom.', 'La brouette est juste à côté de la lampe. Gab grimpe dessus, prudemment. Le détecteur est maintenant sous son nez.');
              if (!g.has('uterak')) { await say(g, 'fox', 'Ale čím ho zakryjem? Rukou celú noc?', 'Mais avec quoi je le couvre ? Avec la main, toute la nuit ?'); return; }
              await coverSensor(g);
            },
            onItem: { async uterak(g) { if (!g.flag('senzor_seen')) { await say(g, 'fox', 'Utierka na fúrik? Načo?', 'Une serviette sur la brouette ? Pour quoi faire ?'); return; } await coverSensor(g); } } },
          { id: 'lampa', name: { sk: 'lampa', fr: 'la lampe' }, poly: box(1550, 130, 1655, 585), walk: [1440, 640],
            async onUse(g) {
              if (g.flag('lampoff')) { await say(g, 'fox', 'Senzor nevidí nič. Lampa spí. Ako teta, dúfam.', 'Le détecteur ne voit rien. La lampe dort. Comme la tante, j\'espère.'); return; }
              g.setFlag('senzor_seen');
              await say(g, 'narrator', 'Lampa nemá vypínač. Na stĺpe je senzor: „Svieti pri pohybe.“', 'La lampe n\'a pas d\'interrupteur. Sur le poteau, il y a un détecteur : « S\'allume au mouvement. »', [['senzor', 'le détecteur'], ['pohyb', 'le mouvement']]);
              await say(g, 'fox', 'Keď sa hýbem, svieti. A ja sa hýbem. Senzor je vysoko… nedosiahnem.', 'Quand je bouge, elle s\'allume. Et moi, je bouge. Le détecteur est haut… je n\'y arrive pas.', [['vysoko', 'en haut, haut']]);
            },
            onItem: { async uterak(g) { g.setFlag('senzor_seen'); await say(g, 'fox', 'Senzor je príliš vysoko. Potrebujem na niečo vyliezť.', 'Le détecteur est trop haut. Il faut que je monte sur quelque chose.', [['vyliezť', 'grimper']]); } } },
          { id: 'hojdacka', name: { sk: 'hojdacia sieť', fr: 'le hamac' }, poly: box(1640, 335, 1910, 495), walk: [1760, 630], pose: 'pick',
            async onUse(g) {
              if (!g.flag('uterak')) {   // on n'arrive ici sans bruit que par les pierres plates
                g.give('uterak'); g.setFlag('uterak');
                await say(g, 'narrator', 'Na hojdacej sieti zabudla teta utierku. Gab si ju berie.', 'La tante a oublié une serviette sur le hamac. Gab la prend.', [['utierka', 'la serviette'], ['zabudnúť', 'oublier']]);
                if (g.flag('on_stones')) {   // retour par les pierres
                  for (const [x, y] of [[1830, 640], [1730, 652], [1630, 664], [1440, 640]]) await g.walk('fox', x, y);
                  g.setFlag('on_stones', false);
                }
                return;
              }
              await say(g, 'fox', 'Hojdacia sieť! Ideálne na spanie…', 'Un hamac ! Parfait pour dormir…', [['hojdacia sieť', 'le hamac']]);
              await say(g, 'narrator', 'Hore nad ňou je tetino okno.', 'Juste au-dessus, il y a la fenêtre de la tante.', [['hore', 'en haut']]);
              g.pose('fox', 'surprised'); await say(g, 'fox', 'Pod tetiným oknom? Radšej nie!', 'Sous la fenêtre de la tante ? Plutôt pas !'); g.pose('fox', null);
            } },
          { id: 'okno', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(1770, 65, 1930, 265), walk: [1850, 630],
            look: { sk: 'V tetinom okne sa svieti. Teta ešte nespí.', fr: 'La fenêtre de la tante est éclairée. Elle ne dort pas encore.', words: [['okno', 'la fenêtre'], ['svieti', 'c\'est allumé']] } },
          { id: 'vypinac', name: { sk: 'vypínač', fr: 'l\'interrupteur' }, poly: box(1905, 395, 1968, 462), walk: [1930, 630], pose: 'use',
            async onUse(g) {
              await say(g, 'narrator', 'Cvak. V kuchyni sa rozsvieti. Cvak. Zhasne.', 'Clac. La lumière de la cuisine s\'allume. Clac. Elle s\'éteint.', [['vypínač', 'l\'interrupteur']]);
              await say(g, 'fox', 'To je vypínač v kuchyni. Nie lampy.', 'C\'est l\'interrupteur de la cuisine. Pas de la lampe.');
            } },
          // les pierres plates dans le gravier : le chemin silencieux
          { id: 'kamene', name: { sk: 'kamene', fr: 'les pierres plates' }, poly: box(1585, 610, 1895, 680), walk: [1440, 645],
            async onUse(g) {
              if (!g.flag('kamene_seen')) { g.setFlag('kamene_seen'); await say(g, 'fox', 'Ploché kamene v štrku. Po nich sa ide potichu.', 'Des pierres plates dans le gravier. Dessus, on marche sans bruit.', [['kameň', 'la pierre'], ['potichu', 'sans bruit']]); }
              g.setFlag('on_stones');
              for (const [x, y] of [[1630, 664], [1730, 652], [1830, 640]]) await g.walk('fox', x, y);
            } },
          { id: 'dvere', name: { sk: 'dvere', fr: 'la porte' }, poly: box(1970, 250, 2080, 535), walk: [2000, 630], pose: 'use',
            async onUse(g) { await say(g, 'fox', 'Zamknuté. Andrea je už dnu.', 'Fermé à clé. Andrea est déjà à l\'intérieur.', [['zamknuté', 'fermé à clé']]); } },
          { id: 'katedrala', name: { sk: 'katedrála', fr: 'la cathédrale' }, poly: box(495, 125, 650, 255), walk: [570, 630],
            look: { sk: 'Katedrála v noci. Krásna.', fr: 'La cathédrale, la nuit. Magnifique.', words: [['noc', 'la nuit'], ['krásny', 'beau']] } },
        ],
        hints: [
          { id: 'g_lamp', when: (g) => !g.flag('lampoff'), levels: [
            { sk: 'Lampa svieti, keď sa niečo hýbe. Teta nás môže vidieť. Pozri sa na lampu zblízka.', fr: 'La lampe s\'allume quand quelque chose bouge. Ma tante peut nous voir. Regarde la lampe de près.' },
            { sk: 'Senzor treba zakryť. Niečím z látky. Na hojdacej sieti niečo leží… ale pozor na štrk: škrípe!', fr: 'Il faut couvrir le détecteur. Avec un bout de tissu. Il y a quelque chose sur le hamac… mais attention au gravier : il crisse !' },
            { sk: 'K hojdacej sieti choď po plochých kameňoch. Potom vylez na fúrik pri lampe.', fr: 'Va au hamac par les pierres plates. Ensuite, monte sur la brouette à côté de la lampe.' } ] },
          { id: 'g_blanket', when: (g) => !g.flag('deka'), levels: [
            { sk: 'Bude noc. Potrebuješ niečo na zakrytie.', fr: 'La nuit va être fraîche. Il te faut de quoi te couvrir.' },
            { sk: 'Pozri sa na šnúru.', fr: 'Regarde la corde à linge.' } ] },
          { id: 'g_tree', levels: [
            { sk: 'Gab má spať pod jabloňou.', fr: 'Gab doit dormir sous le pommier.' },
            { sk: 'Klikni na jabloň.', fr: 'Clique sur le pommier.' } ] },
        ],
        async onEnter(g) {
          if (g.flag('garden0')) return;
          g.setFlag('garden0');
          await say(g, 'narrator', 'Je večer. Pred domom je veľká záhrada.', 'C\'est le soir. Devant la maison, il y a un grand jardin.', [['záhrada', 'le jardin']]);
          g.pose('andrea', 'whisper');
          await say(g, 'andrea', 'Pssst! Teta ešte nespí. Spi pod jabloňou. Ja idem dnu.', 'Pssst ! Ma tante ne dort pas encore. Dors sous le pommier. Moi, je rentre.');
          await say(g, 'andrea', 'A pozor na lampu. Svieti, keď sa niečo hýbe. Teta z okna vidí celú záhradu.', 'Et attention à la lampe. Elle s\'allume quand quelque chose bouge. De sa fenêtre, ma tante voit tout le jardin.', [['hýbať sa', 'bouger']]);
          g.pose('andrea', 'wave'); await g.sleep(700); g.pose('andrea', null);
          await g.walk('andrea', 2020, 600);
          g.hide('andrea');
        },
      },

      // =============================================================== CHAPITRE 2 : Sucho
      // le matin dans le jardin (meme decor que le soir, version de jour : les zones sont les memes). Theme : la secheresse.
      rano: {
        chapter: 'ch2', title: { sk: 'Ráno v záhrade', fr: 'Le matin dans le jardin' }, tint: ['#e8c57a', '#cdb577'],
        bg: 'art/rano_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 590], [2160, 590], [2160, 712], [0, 712]], scale: { y0: 590, s0: 0.5, y1: 712, s1: 0.6 },
        sprites: [gab(1040, 640), andrea(1240, -1, 640)],
        props: [
          { img: 'art/obj_vedro.png', x: 1690, y: 604, w: 56 },
          { img: 'art/obj_kohutik.png', x: 1800, y: 606, w: 52 },
          { img: 'art/obj_jablko.png', x: 1180, y: 650, w: 34 },
        ],
        ambient: [
          { imgs: ['art/amb_postrekovac_a.png', 'art/amb_postrekovac_b.png'], x: 660, y: 612, w: 84, rand: [0.5, 0.9], randAlt: [1.2, 2.2] },   // l'arroseur crachote
          { imgs: ['art/amb_osa_a.png', 'art/amb_osa_b.png'], fps: 14, x: 1180, y: 620, w: 24, cross: { from: [1150, 625], to: [1215, 612], dur: 1.4, every: 0, arc: 14 } },
          { imgs: ['art/amb_osa_a.png', 'art/amb_osa_b.png'], fps: 14, x: 1180, y: 620, w: 20, phase: 0.6, cross: { from: [1212, 618], to: [1155, 630], dur: 1.7, every: 0, arc: -10 } },
        ],
        hotspots: [
          { id: 'branka', name: { sk: 'bránka', fr: 'le portillon' }, poly: box(55, 380, 170, 575), walk: [120, 630], pose: 'use',
            async onUse(g) {
              if (!g.flag('fotky_ok')) { await say(g, 'andrea', 'Počkaj. Najprv ti niečo ukážem.', 'Attends. D\'abord, je te montre quelque chose.'); return; }
              if (!g.has('flasa')) { await say(g, 'andrea', 'Bez vody nejdeme. Bude tridsať stupňov.', 'On ne part pas sans eau. Il va faire trente degrés.', [['stupeň', 'le degré']]); return; }
              await say(g, 'andrea', 'Ideme na úrad. Ja počkám vonku.', 'On va au bureau. Moi, j\'attends dehors.', [['úrad', 'le bureau (administration)']]);
              g.goScene('urad');
            } },
          { id: 'kolna', name: { sk: 'kôlňa', fr: 'la cabane' }, poly: box(235, 275, 590, 480), walk: [430, 630],
            look: { sk: 'Kôlňa. Drevo na zimu. Teraz je horúco, zima je ďaleko.', fr: 'La cabane. Du bois pour l\'hiver. Il fait chaud, l\'hiver est loin.', words: [['zima', 'l\'hiver']] } },
          // l'arrosoir : la tante y cache la poignee du robinet (pour que les voisins ne prennent pas l'eau)
          { id: 'krhla', name: { sk: 'krhla', fr: 'l\'arrosoir' }, poly: box(380, 485, 480, 580), walk: [440, 630], pose: 'pick',
            async onUse(g) {
              if (g.flag('rucka_found')) { await say(g, 'narrator', 'Krhla je prázdna. Ani kvapka.', 'L\'arrosoir est vide. Pas une goutte.', [['kvapka', 'la goutte']]); return; }
              g.setFlag('rucka_found'); g.give('rucka');
              await say(g, 'narrator', 'V krhle niečo cinká… Rúčka od kohútika!', 'Quelque chose tinte dans l\'arrosoir… La poignée du robinet !', [['rúčka', 'la poignée'], ['kohútik', 'le robinet']]);
              await say(g, 'andrea', 'Teta ju schováva. Pred susedmi.', 'Ma tante la cache. À cause des voisins.', [['schovávať', 'cacher'], ['sused', 'le voisin']]);
            } },
          { id: 'kvety', name: { sk: 'kvety', fr: 'les fleurs' }, poly: box(620, 450, 745, 560), walk: [680, 630],
            look: { sk: 'Kvety sú smädné. Postrekovač pľuje pár kvapiek.', fr: 'Les fleurs ont soif. L\'arroseur crache quelques gouttes.', words: [['postrekovač', 'l\'arroseur'], ['smädný', 'assoiffé']] } },
          { id: 'jablon', name: { sk: 'jabloň', fr: 'le pommier' }, poly: [[700, 40], [1470, 40], [1470, 300], [1110, 330], [1110, 575], [950, 575], [960, 330], [700, 300]], walk: [1040, 640],
            look: { sk: 'Jablká sú malé. Strom potrebuje vodu.', fr: 'Les pommes sont petites. L\'arbre a besoin d\'eau.', words: [['strom', 'l\'arbre']] } },
          { id: 'jablko', name: { sk: 'jablko', fr: 'la pomme' }, poly: box(1150, 600, 1215, 660), walk: [1120, 650],
            look: { sk: 'Spadnuté jablko. Osy ho majú rady. Ja nie.', fr: 'Une pomme tombée. Les guêpes l\'adorent. Moi, non.', words: [['osa', 'la guêpe'], ['spadnutý', 'tombé']] } },
          { id: 'buda', name: { sk: 'búda', fr: 'la niche' }, poly: box(1125, 420, 1310, 565), walk: [1215, 630],
            look: { sk: 'Stále bez psa.', fr: 'Toujours pas de chien.' } },
          { id: 'hojdacka', name: { sk: 'hojdacia sieť', fr: 'le hamac' }, poly: box(1640, 335, 1910, 495), walk: [1760, 630],
            async onUse(g) { await say(g, 'andrea', 'Teraz nie. Nemáme čas!', 'Pas maintenant. On n\'a pas le temps !', [['čas', 'le temps']]); } },
          { id: 'vedro', name: { sk: 'vedro', fr: 'le seau' }, poly: box(1660, 545, 1722, 606), walk: [1640, 640], pose: 'pick',
            async onUse(g) {
              await say(g, 'narrator', 'Vedro pod odkvapom. Prázdne. Dva mesiace nepršalo.', 'Un seau sous la gouttière. Vide. Il n\'a pas plu depuis deux mois.', [['vedro', 'le seau'], ['odkvap', 'la gouttière']]);
              if (g.flag('read_tetin_listok') && !g.flag('rucka_found')) await say(g, 'fox', 'Tu by mala byť voda. A nie je… ani rúčka. Kde ešte by mala byť voda?', 'Ici, il devrait y avoir de l\'eau. Et il n\'y en a pas… ni de poignée. Où d\'autre devrait-il y avoir de l\'eau ?');
            },
            look: { sk: 'Vedro pod odkvapom. Prázdne. Dva mesiace nepršalo.', fr: 'Un seau sous la gouttière. Vide. Il n\'a pas plu depuis deux mois.', words: [['vedro', 'le seau'], ['odkvap', 'la gouttière']] } },
          { id: 'kohutik', name: { sk: 'kohútik', fr: 'le robinet' }, poly: box(1775, 540, 1828, 610), walk: [1760, 640], pose: 'use',
            async onUse(g) {
              if (!g.flag('rucka_on')) {
                await say(g, 'fox', 'Kohútik… bez rúčky. Ako ho otvorím?', 'Un robinet… sans poignée. Comment je l\'ouvre ?', [['otvoriť', 'ouvrir']]);
                await say(g, 'narrator', 'Na kohútiku visí tetin lístok: „Rúčka je tam, kde by mala byť voda, ale nie je.“', 'Sur le robinet pend un mot de la tante : « La poignée est là où il devrait y avoir de l\'eau, mais où il n\'y en a pas. »', [['rúčka', 'la poignée']]);
                g.setFlag('read_tetin_listok');
                return;
              }
              await say(g, 'narrator', 'Voda tečie. Ale do čoho?', 'L\'eau coule. Mais dans quoi ?', [['tiecť', 'couler']]);
            },
            onItem: {
              async rucka(g) { g.take('rucka'); g.setFlag('rucka_on'); await say(g, 'narrator', 'Rúčka sedí. Cvak.', 'La poignée s\'emboîte. Clac.'); },
              async flasa_prazdna(g) {
                if (!g.flag('rucka_on')) { await say(g, 'fox', 'Bez rúčky to nejde.', 'Sans la poignée, ça ne marche pas.'); return; }
                g.take('flasa_prazdna'); g.give('flasa');
                await say(g, 'narrator', 'Glg, glg… Fľaša je plná.', 'Glou, glou… La bouteille est pleine.', [['plný', 'plein']]);
                await say(g, 'andrea', 'Dobre. Teraz môžeme ísť.', 'Bien. Maintenant, on peut y aller.');
              },
            } },
          { id: 'okno', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(1770, 65, 1930, 265), walk: [1850, 630],
            look: { sk: 'Za tým oknom včera Andrea telefonovala.', fr: 'C\'est derrière cette fenêtre qu\'Andrea téléphonait hier soir.' } },
          { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [1160, 640],
            topics: [
              { id: 'fotky', when: (g) => !g.flag('fotky_ok'), sk: 'Čo mi chceš ukázať?', fr: 'Qu\'est-ce que tu veux me montrer ?', async run(g) { await showPhotos(g); } },
              { id: 'tel', sk: 'S kým si včera telefonovala?', fr: 'À qui tu téléphonais hier soir ?', async run(g) { g.pose('andrea', 'arms'); await say(g, 'andrea', 'S niekým.', 'Avec quelqu\'un.'); g.pose('andrea', null); await say(g, 'fox', 'To nie je odpoveď.', 'Ce n\'est pas une réponse.'); await say(g, 'andrea', 'Je.', 'Si.'); } },
              { need: 'úrad', sk: 'Čo mám povedať na úrade?', fr: 'Qu\'est-ce que je dois dire au bureau ?', async run(g) { await say(g, 'andrea', '„Som Francúz. Robím referát o vode.“ A usmievaj sa. Nie príliš.', '« Je suis français. Je fais un exposé sur l\'eau. » Et souris. Pas trop.'); } },
            ] },
        ],
        hints: [
          { id: 'r_fotky', when: (g) => !g.flag('fotky_ok'), levels: [
            { sk: 'Chcem ti ukázať fotky. Klikni na mňa.', fr: 'Je veux te montrer des photos. Clique sur moi.' } ] },
          { id: 'r_voda', when: (g) => !g.has('flasa'), levels: [
            { sk: 'Potrebuješ vodu do fľaše. Kde je v záhrade voda?', fr: 'Il te faut de l\'eau dans ta bouteille. Où y a-t-il de l\'eau dans le jardin ?' },
            { sk: 'Kohútik je pri dome. Prečítaj si tetin lístok.', fr: 'Le robinet est près de la maison. Lis le mot de ma tante.' },
            { sk: 'Kde by mala byť voda, ale nie je? Vedro… alebo niečo, s čím sa polieva.', fr: 'Où devrait-il y avoir de l\'eau, mais il n\'y en a pas ? Le seau… ou un truc qui sert à arroser.' },
            { sk: 'Rúčka je v krhle. Daj ju na kohútik, potom naplň fľašu.', fr: 'La poignée est dans l\'arrosoir. Mets-la sur le robinet, puis remplis la bouteille.' } ] },
          { id: 'r_exit', levels: [
            { sk: 'Ideme na úrad. Von cez bránku.', fr: 'On va au bureau. On sort par le portillon.' } ] },
        ],
        async onEnter(g) {
          if (g.flag('rano0')) return;
          g.setFlag('rano0');
          g.setHelper('andrea', 3);
          g.pose('fox', 'sit');
          await say(g, 'narrator', 'Ráno. Pod jabloňou je už teplo.', 'Le matin. Sous le pommier, il fait déjà chaud.', [['ráno', 'le matin'], ['teplo', 'chaud']]);
          await say(g, 'andrea', 'Vstávaj. Je sedem hodín.', 'Debout. Il est sept heures.', [['vstávať', 'se lever']]);
          g.pose('fox', 'surprised');
          await say(g, 'fox', 'Sedem? Mám prázdniny!', 'Sept heures ? Je suis en vacances !', [['prázdniny', 'les vacances']]);
          g.pose('fox', null);
          await say(g, 'andrea', 'Už nie.', 'Plus maintenant.');
          await say(g, 'fox', 'Andrea. Včera večer si povedala: „Je tu.“', 'Andrea. Hier soir, tu as dit : « Il est là. »');
          g.pose('andrea', 'arms');
          await say(g, 'andrea', 'Ty počúvaš pod oknami?', 'Tu écoutes sous les fenêtres ?', [['počúvať', 'écouter']]);
          await say(g, 'fox', 'Spal som pod oknom. To nie je to isté.', 'Je dormais sous la fenêtre. Ce n\'est pas pareil.');
          g.pose('andrea', 'give');
          await say(g, 'andrea', 'Najprv pi.', 'Bois d\'abord.', [['piť', 'boire']]);
          g.pose('andrea', null);
          await say(g, 'narrator', 'Podá mu pohár vody. Je poloprázdny.', 'Elle lui tend un verre d\'eau. Il est à moitié vide.', [['pohár', 'le verre']]);
          await say(g, 'fox', 'To je všetko?', 'C\'est tout ?');
          await say(g, 'andrea', 'Voda tečie dve hodiny denne. Ráno.', 'L\'eau coule deux heures par jour. Le matin.');
          await say(g, 'fox', 'Tu všetci hovoria veľmi o vode.', 'Ici, tout le monde parle « très » de l\'eau.');
          g.pose('andrea', 'think');
          await say(g, 'andrea', 'Ako sa to povie správne?', 'Comment on dit, correctement ?', [['správne', 'correctement']]);
          g.pose('andrea', null);
          for (;;) {
            const i = await g.choice([{ sk: 'Hovoria veľmi o vode.', fr: '' }, { sk: 'Hovoria veľa o vode.', fr: '' }, { sk: 'Hovoria veľký o vode.', fr: '' }], { noFr: true });
            if (i === 1) break;
            await say(g, 'andrea', i === 0 ? '„Veľmi“ je „très“: veľmi horúco. Veľmi hlúpy.' : '„Veľký“ je „grand“. Skús znova.', i === 0 ? '« Veľmi », c\'est « très » : très chaud. Très bête.' : '« Veľký », c\'est « grand ». Réessaie.');
            if (i === 0) { await say(g, 'fox', 'Veľmi hlúpy, to je pre mňa?', 'Très bête, c\'est pour moi ?'); await say(g, 'andrea', 'To je príklad.', 'C\'est un exemple.'); }
          }
          await say(g, 'andrea', 'Presne. Veľa.', 'Exactement. « Veľa ».', [['veľa', 'beaucoup (quantité)'], ['veľmi', 'très (qualité)']]);
          await showPhotos(g);
        },
      },

      // le bureau de l'environnement : decor 3:1 (art/PROMPTS_v2.md n° 6). Gab y va seul, Andrea attend dehors.
      urad: {
        chapter: 'ch2', title: { sk: 'Úrad životného prostredia', fr: 'Le bureau de l\'environnement' }, tint: ['#c9b07a', '#8fa77a'],
        bg: 'art/urad_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 600], [2160, 600], [2160, 712], [0, 712]], scale: { y0: 600, s0: 0.55, y1: 712, s1: 0.64 },
        sprites: [
          gab(300, 650),
          // derriere la vitre, au fond : plus petite que Gab (perspective), coupee par le comptoir a la taille
          { id: 'pokladnicka', img: 'art/pokladnicka_idle.png', x: 1370, y: 436, h: 118, abs: true, still: true, face: -1,
            poses: Object.fromEntries(POKL.map((k) => [k, { img: `art/pokladnicka_${k}.png`, h: 118 }])) },
          { id: 'bobor', img: 'art/bobor_a.png', x: 640, y: 584, h: 178, abs: true, face: 1, poses: { b: { img: 'art/bobor_b.png', h: 178 } }, alt: { pose: 'b', min: 3, max: 6, hold: [1.5, 3] } },
          { id: 'diviak', img: 'art/diviak_a.png', x: 868, y: 588, h: 192, abs: true, face: -1, poses: { b: { img: 'art/diviak_b.png', h: 192 } }, alt: { pose: 'b', min: 1.6, max: 2.4, hold: [1.4, 2] } },
          { id: 'veverica', img: 'art/veverica_a.png', x: 1760, y: 620, h: 220, abs: true, face: -1, poses: { b: { img: 'art/veverica_b.png', h: 220 } }, alt: { pose: 'b', min: 4, max: 8, hold: [1.5, 2.5] } },
          { id: 'bocian', img: 'art/bocian_a.png', x: 2050, y: 625, h: 300, abs: true, face: -1, poses: { b: { img: 'art/bocian_b.png', h: 300 } }, alt: { pose: 'b', min: 5, max: 9, hold: [1.5, 2.5] } },
        ],
        props: [
          { img: 'art/obj_pero_retiazka.png', x: 1400, y: 432, w: 46 },
          { img: 'art/obj_dosier.png', x: 1215, y: 440, w: 120, when: (g) => g.flag('dossier_found') },
        ],
        ambient: [
          { imgs: ['art/amb_ventilator_1.png', 'art/amb_ventilator_2.png', 'art/amb_ventilator_3.png'], fps: 9, x: 1210, y: 196, w: 280 },   // le ventilateur peint est retire du decor (tools/cut_v2.py)
          { sweep: { area: [300, 180, 1000, 560], period: 14, a: 0.1 } },
        ],
        // le tableau lumineux : le numero appele n'est pas affiche (il faut l'entendre), seulement la fleche vers le guichet 1
        overlay(c, g, E) {
          const on = g.flag('q_blink') && Math.floor(E.t * 3) % 2 === 0;
          c.save(); c.font = '700 64px ui-monospace, monospace'; c.textAlign = 'center'; c.textBaseline = 'middle';
          c.fillStyle = on ? '#ff5a3a' : 'rgba(255,90,58,.35)'; c.fillText(on ? '▶ 1 ◀' : '— —', 634, 242);
          c.restore();
        },
        hotspots: [
          { id: 'dvere', name: { sk: 'dvere', fr: 'la porte' }, poly: box(45, 110, 240, 615), walk: [200, 650], pose: 'use',
            async onUse(g) {
              if (!g.has('listok_0l')) { await say(g, 'fox', 'Ešte nie. Andrea čaká na výsledok.', 'Pas encore. Andrea attend le résultat.', [['výsledok', 'le résultat']]); return; }
              await say(g, 'fox', 'Mám to. Von!', 'Je l\'ai. Dehors !');
              g.goScene('namestie');
            } },
          { id: 'automat', name: { sk: 'automat na lístky', fr: 'la borne à tickets' }, poly: box(412, 372, 500, 595), walk: [470, 650], pose: 'use',
            async onUse(g) { await takeNumber(g); } },
          { id: 'tabula', name: { sk: 'tabuľa', fr: 'le tableau lumineux' }, poly: box(508, 184, 762, 298), walk: [640, 650],
            look: { sk: 'Tabuľa je pokazená. Čísla nesvietia, iba šípka. Hlásia sa nahlas: musím počúvať.', fr: 'Le tableau est en panne. Les numéros ne s\'allument pas, juste la flèche. On les annonce à voix haute : il faut écouter.', words: [['pokazený', 'en panne'], ['počúvať', 'écouter'], ['číslo', 'le numéro']] } },
          { id: 'hodiny', name: { sk: 'hodiny', fr: 'l\'horloge' }, poly: box(808, 188, 918, 300), walk: [860, 650],
            look: { sk: 'Je takmer dvanásť. O dvanástej zatvárajú.', fr: 'Il est presque midi. À midi, ils ferment.', words: [['dvanásť', 'douze (midi)']] } },
          { id: 'chodba', name: { sk: 'chodba', fr: 'le couloir' }, poly: box(948, 190, 1180, 560), walk: [1060, 640],
            look: { sk: 'Dlhá chodba. Všetky dvere sú zamknuté.', fr: 'Un long couloir. Toutes les portes sont fermées à clé.', words: [['chodba', 'le couloir']] } },
          { id: 'okienko2', name: { sk: 'okienko', fr: 'le guichet' }, poly: box(1465, 210, 1900, 560), walk: [1680, 650],
            look: { sk: 'Zatvorené. Aj tu je prestávka.', fr: 'Fermé. Ici aussi, c\'est la pause.', words: [['zatvorené', 'fermé']] } },
          { id: 'pero_retiazka', name: { sk: 'pero', fr: 'le stylo' }, poly: box(1375, 380, 1425, 435), walk: [1400, 650], pose: 'pick',
            look: { sk: 'Pero na retiazke. Nepíše: atrament vyschol. Aj pero je smädné.', fr: 'Un stylo attaché à une chaînette. Il n\'écrit pas : l\'encre a séché. Même le stylo a soif.', words: [['retiazka', 'la chaînette'], ['atrament', 'l\'encre']] } },
          { id: 'kvetina', name: { sk: 'kvetina', fr: 'la plante' }, poly: box(1885, 270, 2012, 585), walk: [1950, 650],
            look: { sk: 'Aj kvetina je smädná.', fr: 'Même la plante a soif.' },
            onItem: { async flasa(g) { await say(g, 'fox', 'Nie, tú vodu potrebujem ja.', 'Non, cette eau, c\'est pour moi.'); } } },
          { id: 'chladic', name: { sk: 'automat na vodu', fr: 'la fontaine à eau' }, poly: box(2045, 290, 2140, 580), walk: [2000, 650],
            look: { sk: 'Automat na vodu. Prázdny.', fr: 'La fontaine à eau. Vide.', words: [['prázdny', 'vide']] } },
          { id: 'pokladnicka', sprite: 'pokladnicka', name: { sk: 'pani pri okienku', fr: 'la dame du guichet' }, walk: [1250, 650],
            async onUse(g) { await pokladnicka2(g); } },
          { id: 'okienko', name: { sk: 'okienko', fr: 'le guichet' }, poly: box(1215, 210, 1455, 560), walk: [1250, 650],
            async onUse(g) { await pokladnicka2(g); } },
          // figurants
          { id: 'bobor', sprite: 'bobor', name: { sk: 'pán s krížovkou', fr: 'le monsieur aux mots croisés' }, walk: [700, 650],
            async onUse(g) {
              if (g.flag('pero_ok')) { await say(g, 'bobor', 'Voda… štyri písmená. Ďakujem ešte raz.', 'Eau… quatre lettres. Merci encore.'); return; }
              g.pose('bobor', 'b');
              await say(g, 'bobor', 'Krížovka. Štyri písmená: „Bez nej nie je život.“ Hmm…', 'Des mots croisés. Quatre lettres : « Sans elle, pas de vie. » Hmm…', [['krížovka', 'les mots croisés'], ['písmeno', 'la lettre'], ['život', 'la vie']]);
              g.pose('bobor', null);
              const i = await g.choice([{ sk: 'Pivo.', fr: 'La bière.' }, { sk: 'Čaj.', fr: 'Le thé.' }, { sk: 'Mlieko.', fr: 'Le lait.' }, { sk: 'Voda.', fr: 'L\'eau.' }, { sk: 'Neviem.', fr: 'Je ne sais pas.' }], { noFr: true });
              if (i === 0) { await say(g, 'bobor', 'Pivo má štyri písmená… Ale bez piva sa žiť dá. Vraj.', 'Pivo a quatre lettres… Mais sans bière, on peut vivre. Paraît-il.'); return; }
              if (i === 1) { await say(g, 'bobor', 'Čaj má tri písmená.', 'Čaj a trois lettres.'); return; }
              if (i === 2) { await say(g, 'bobor', 'Mlieko má šesť písmen.', 'Mlieko a six lettres.'); return; }
              if (i === 4) return;
              g.setFlag('pero_ok'); g.give('pero');
              await say(g, 'bobor', 'Voda! Samozrejme. Ďakujem, mladý pán. Potrebujete pero? Požičiam vám.', 'Voda ! Bien sûr. Merci, jeune homme. Vous avez besoin d\'un stylo ? Je vous le prête.', [['požičať', 'prêter'], ['pero', 'le stylo']]);
            } },
          { id: 'diviak', sprite: 'diviak', name: { sk: 'robotník', fr: 'l\'ouvrier' }, walk: [930, 650],
            look: { who: 'narrator', sk: 'Robotník spí. Chrrr… Možno čaká od rána.', fr: 'L\'ouvrier dort. Rrrron… Il attend peut-être depuis ce matin.', words: [['robotník', 'l\'ouvrier']] } },
          { id: 'veverica', sprite: 'veverica', name: { sk: 'mama s kočíkom', fr: 'la maman et sa poussette' }, walk: [1650, 650],
            async onUse(g) { await say(g, 'veverica', 'Čakáme na okienko dva. Už hodinu. A bábätko je smädné.', 'On attend le guichet deux. Depuis une heure. Et le bébé a soif.', [['bábätko', 'le bébé'], ['kočík', 'la poussette']]); } },
          { id: 'bocian', sprite: 'bocian', name: { sk: 'poštár', fr: 'le livreur' }, walk: [1980, 650],
            async onUse(g) { await say(g, 'bocian', 'Balík pre… Zelenú vlnu? Tu nie je nikto, kto by podpísal.', 'Un colis pour… Zelená vlna ? Il n\'y a personne pour signer.', [['balík', 'le colis'], ['podpísať', 'signer']]); } },
        ],
        hints: [
          { id: 'u_cislo', when: (g) => !g.has('cislo') && !g.flag('dossier_found'), levels: [
            { sk: 'Na úrade sa čaká v rade. Potrebuješ poradový lístok.', fr: 'Au bureau, on fait la queue. Il te faut un ticket d\'attente.' },
            { sk: 'Automat na lístky je pri dverách.', fr: 'La borne à tickets est près de la porte.' } ] },
          { id: 'u_rad', when: (g) => g.has('cislo') && !g.flag('dossier_found'), levels: [
            { sk: 'Počúvaj hlásenie. Keď povedia tvoje číslo, choď k okienku.', fr: 'Écoute l\'annonce. Quand ils disent ton numéro, va au guichet.' },
            { sk: 'Štyridsaťsedem je 47. Päťdesiat je 50.', fr: '« Štyridsaťsedem », c\'est 47. « Päťdesiat », c\'est 50.' },
            { sk: 'V spise hľadaj „Obsah“ (je na začiatku), potom kapitolu „Voda“.', fr: 'Dans le dossier, cherche le « Obsah » (le sommaire, au début), puis le chapitre « Voda ».' } ] },
          { id: 'u_zapis', when: (g) => g.flag('dossier_found') && !g.has('listok_0l'), levels: [
            { sk: 'Musíš si zapísať tú nulu. Na čo? Čím?', fr: 'Il faut noter ce zéro. Sur quoi ? Avec quoi ?' },
            { sk: 'Pán s krížovkou má pero. Pomôž mu.', fr: 'Le monsieur aux mots croisés a un stylo. Aide-le.' },
            { sk: 'Spoj pero a lístok z električky.', fr: 'Combine le stylo et le ticket de tram.' } ] },
        ],
        async onEnter(g) {
          if (g.flag('urad0')) return;
          g.setFlag('urad0');
          await say(g, 'narrator', 'Úrad životného prostredia. Je horúco. Ventilátor sa točí, ale nepomáha.', 'Le bureau de l\'environnement. Il fait chaud. Le ventilateur tourne, mais ça ne sert à rien.', [['ventilátor', 'le ventilateur']]);
          await say(g, 'fox', 'Jedno okienko otvorené. A rad. Super.', 'Un seul guichet ouvert. Et la queue. Super.', [['rad', 'la file d\'attente']]);
        },
      },

      // devant le bureau : la fontaine vide, la voiture noire, le monsieur au sourire (decor fontana_wide reutilise)
      namestie: {
        chapter: 'ch2', title: { sk: 'Pred úradom', fr: 'Devant le bureau' }, tint: ['#9fb7d6', '#d9d0b4'],
        bg: 'art/fontana_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 625], [2160, 625], [2160, 712], [0, 712]], scale: { y0: 625, s0: 0.55, y1: 712, s1: 0.62 },
        sprites: [gab(1420, 650), Object.assign(andrea(330, 1, 660), { pose: 'whisper' })],
        extraSprites: {
          auto: { img: 'art/obj_auto.png', x: 2500, y: 548, h: 290, face: -1, rigid: true, still: true, speed: 520, hidden: true },
          pan: Object.assign(panSprite(1840, 645), { face: 1, alt: { pose: 'watch', min: 2.2, max: 3.6, hold: [1.8, 2.6], faceOn: -1, faceOff: 1 } }),
        },
        triggers: [
          // traverser la place quand le monsieur regarde : il te voit
          { x: [760, 1395], move: true, when: (g) => g.flag('pan_here') && !g.flag('hid') && (g.sprite('pan') || {}).pose === 'watch', async run(g) {
            g.pose('pan', 'talk');
            await say(g, 'pan', 'Dobrý deň, mladý pán! Krásny deň, však?', 'Bonjour, jeune homme ! Belle journée, n\'est-ce pas ?', [['krásny', 'beau']]);
            g.pose('fox', 'surprised');
            await say(g, 'narrator', 'Gab sa len usmeje a kývne hlavou. Pán si ho dobre prezrie.', 'Gab se contente de sourire et de hocher la tête. Le monsieur le regarde bien.');
            g.pose('fox', null); g.pose('pan', null);
            await say(g, 'andrea', '(potichu) Nie keď sa pozerá, Gab!', '(tout bas) Pas quand il regarde, Gab !', [['pozerať sa', 'regarder']]);
            await g.walk('fox', 1420, 650);
          } },
          // arrive derriere la fontaine, pres d'Andrea
          { x: [0, 760], when: (g) => g.flag('pan_here') && !g.flag('hid'), async run(g) {
            g.setFlag('hid');
            g.face('fox', 1); g.pose('andrea', null);
            await say(g, 'fox', 'Kto je to?', 'C\'est qui ?');
            g.pose('andrea', 'worried');
            await say(g, 'andrea', 'Niekto, kto sa príliš usmieva.', 'Quelqu\'un qui sourit trop.', [['usmievať sa', 'sourire'], ['príliš', 'trop']]);
            await say(g, 'fox', 'Hľadá ťa?', 'Il te cherche ?');
            await say(g, 'andrea', 'Ešte nie.', 'Pas encore.');
            g.pose('andrea', null);
            g.addCard('pan');
            await say(g, 'fox', 'Nula litrov. Nepoužívajú vodu. Je to napísané.', 'Zéro litre. Ils n\'utilisent pas d\'eau. C\'est écrit.');
            await say(g, 'andrea', 'Ja viem. To je ten problém.', 'Je sais. C\'est ça, le problème.');
            await say(g, 'fox', 'Tak to nie sú oni.', 'Alors ce n\'est pas eux.');
            await say(g, 'andrea', 'Alebo to nie je pravda.', 'Ou alors ce n\'est pas vrai.', [['pravda', 'la vérité']]);
            await g.askBoard('q_nula');
            await say(g, 'andrea', 'Poď. Ideme vlakom.', 'Viens. On prend le train.', [['vlak', 'le train']]);
            await say(g, 'fox', 'Kam?', 'Où ça ?');
            await say(g, 'andrea', 'Domov. Ale najprv za niekým, kto si všetko zapisuje už tridsať rokov.', 'Chez nous. Mais d\'abord, on va voir quelqu\'un qui note tout depuis trente ans.', [['zapisovať', 'noter']]);
            await g.showMap('ch3');
            g.end('Koniec ukážky · kapitola 3 čoskoro', 'Fin de l\'aperçu · le chapitre 3 arrive bientôt');
          } },
        ],
        hotspots: [
          { id: 'fontana', name: { sk: 'fontána', fr: 'la fontaine' }, poly: box(415, 290, 1280, 560), walk: [1000, 665],
            look: { sk: 'Spievajúca fontána. Dnes nespieva. Je prázdna.', fr: 'La fontaine chantante. Aujourd\'hui, elle ne chante pas. Elle est vide.', words: [['spievať', 'chanter']] } },
          { id: 'urad', name: { sk: 'úrad', fr: 'le bureau' }, poly: box(1375, 230, 1460, 400), walk: [1420, 650],
            look: { sk: 'Úrad. Tam už nejdem.', fr: 'Le bureau. Je n\'y retourne pas.' } },
          { id: 'auto', sprite: 'auto', name: { sk: 'čierne auto', fr: 'la voiture noire' }, walk: [1600, 660],
            look: { sk: 'Čierne auto. Drahé. Čisté. Ako nové.', fr: 'Une voiture noire. Chère. Propre. Comme neuve.', words: [['čierny', 'noir'], ['drahý', 'cher']] } },
          { id: 'pan', sprite: 'pan', name: { sk: 'pán v obleku', fr: 'le monsieur en costume' }, walk: [1600, 660],
            async onUse(g) { await say(g, 'fox', 'Ísť sa s ním rozprávať? Nie. Nechcem, aby si ma zapamätal.', 'Aller lui parler ? Non. Je ne veux pas qu\'il se souvienne de moi.', [['zapamätať si', 'se souvenir de']]); } },
          { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [430, 665],
            async onUse(g) { await say(g, 'andrea', 'Pst! Za fontánu!', 'Chut ! Derrière la fontaine !'); } },
        ],
        hints: [
          { id: 'n_hide', when: (g) => !g.flag('hid'), levels: [
            { sk: 'Ten pán ťa nesmie vidieť ísť ku mne.', fr: 'Ce monsieur ne doit pas te voir venir vers moi.' },
            { sk: 'Choď, len keď sa pozerá na auto.', fr: 'Avance seulement quand il regarde sa voiture.' },
            { sk: 'Keď sa otočí k autu, klikni pri mne. Keď sa otočí k nám, zastav.', fr: 'Quand il se tourne vers sa voiture, clique près de moi. Quand il se tourne vers nous, arrête-toi.' } ] },
        ],
        async onEnter(g) {
          if (g.flag('nam0')) { if (g.flag('pan_here')) { g.spawn('auto', 1950, 548); g.spawn('pan', 1840, 645); } return; }
          g.setFlag('nam0');
          await say(g, 'narrator', 'Vonku. Andrea čaká za prázdnou fontánou.', 'Dehors. Andrea attend derrière la fontaine vide.');
          await say(g, 'fox', 'Andrea! Mám to!', 'Andrea ! Je l\'ai !');
          g.spawn('auto', 2500, 548);
          await g.walk('auto', 1950, 548);
          g.spawn('pan', 1840, 645); g.face('pan', 1);
          g.setFlag('pan_here');
          await say(g, 'narrator', 'Pred úradom zastane čierne auto. Vystúpi pán v obleku. Usmieva sa na slnko, na dvere, na všetkých.', 'Une voiture noire s\'arrête devant le bureau. Un monsieur en costume en descend. Il sourit au soleil, à la porte, à tout le monde.', [['oblek', 'le costume']]);
          await say(g, 'andrea', '(potichu) Gab! Poď sem. Ale nech ťa nevidí!', '(tout bas) Gab ! Viens ici. Mais qu\'il ne te voie pas !', [['vidieť', 'voir']]);
        },
      },

      jazierko: {
        chapter: 'ch2', title: { sk: 'Jazierko v parku', fr: 'L\'étang du parc' }, tint: ['#7ea36a', '#c9b779'],
        bg: 'art/park_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 570], [2160, 570], [2160, 712], [0, 712]], scale: { y0: 570, s0: 0.5, y1: 712, s1: 0.6 },
        sprites: [gab(150, 640), andrea(260, -1, 625),
          { id: 'kacka', img: 'art/kacka_hope.png', x: 1345, y: 580, h: 222, face: 1, pose: 'thirsty',
            poses: Object.fromEntries(['thirsty', 'hope', 'drink', 'talk', 'happy', 'point'].map((k) => [k, { img: `art/kacka_${k}.png`, h: 222 }])) }],
        props: [
          { img: 'art/obj_zaba.png', x: 1440, y: 525, w: 52 },
          { img: 'art/obj_srnka.png', x: 1040, y: 592, w: 230 },
          { img: 'art/obj_jez.png', x: 1530, y: 566, w: 62 },
          { img: 'art/obj_korytnacka.png', x: 1620, y: 572, w: 96 },
        ],
        hotspots: [
          { id: 'branka', name: { sk: 'brána parku', fr: 'la grille du parc' }, poly: box(0, 190, 300, 480), walk: [150, 630],
            look: { sk: 'Brána parku. Späť? Nie, ideme ďalej.', fr: 'La grille du parc. Revenir ? Non, on continue.', words: [['brána', 'la grille'], ['ďalej', 'plus loin']] } },
          { id: 'pitko', name: { sk: 'pítko', fr: 'la fontaine à boire' }, poly: box(260, 375, 390, 600), walk: [330, 630], pose: 'use',
            async onUse(g) {
              await say(g, 'narrator', 'Pítko. Nefunguje. Ani kvapka.', 'La fontaine à boire. Elle ne marche pas. Pas une goutte.', [['pítko', 'la fontaine à boire'], ['nefunguje', 'ça ne marche pas']]);
            } },
          { id: 'kiosk', name: { sk: 'stánok', fr: 'le kiosque' }, poly: box(345, 205, 612, 500), walk: [480, 630],
            async onUse(g) {
              g.pose('fox', 'surprised'); await say(g, 'fox', 'Zmrzlina!', 'Des glaces !', [['zmrzlina', 'la glace']]); g.pose('fox', null);
              await say(g, 'narrator', 'Zatvorené.', 'Fermé.', [['zatvorené', 'fermé']]);
              await say(g, 'andrea', 'Bez vody nie je zmrzlina, Gab.', 'Sans eau, pas de glace, Gab.');
            } },
          { id: 'vtaky', name: { sk: 'vtáky', fr: 'les oiseaux' }, poly: box(805, 115, 960, 180), walk: [880, 630],
            look: { sk: 'Tri vtáky. Nespievajú. Je príliš horúco.', fr: 'Trois oiseaux. Ils ne chantent pas. Il fait trop chaud.', words: [['vták', 'l\'oiseau'], ['spievať', 'chanter']] } },
          { id: 'gastan', name: { sk: 'gaštan', fr: 'le marronnier' }, poly: [[200, 0], [1300, 0], [1300, 230], [760, 260], [740, 520], [590, 540], [620, 260], [200, 200]], walk: [700, 630],
            look: { sk: 'Gaštan. Listy sú už hnedé. V lete!', fr: 'Un marronnier. Ses feuilles sont déjà brunes. En été !', words: [['gaštan', 'le marronnier'], ['list', 'la feuille'], ['leto', 'l\'été']] } },
          { id: 'lavicka', name: { sk: 'lavička', fr: 'le banc' }, poly: box(680, 420, 945, 560), walk: [810, 630],
            look: { sk: 'Lavička v tieni. Tu je aspoň trochu chládku.', fr: 'Un banc à l\'ombre. Ici, au moins, il fait un peu frais.', words: [['tieň', 'l\'ombre'], ['chládok', 'le frais']] } },
          { id: 'jazierko', name: { sk: 'jazierko', fr: 'l\'étang' }, poly: [[1100, 405], [1700, 405], [1700, 545], [1100, 545]], walk: [1250, 630],
            look: { sk: 'Jazierko je skoro suché. Zostalo len blato.', fr: 'L\'étang est presque à sec. Il ne reste que de la boue.', words: [['suchý', 'sec'], ['blato', 'la boue']] } },
          { id: 'most', name: { sk: 'mostík', fr: 'la passerelle' }, poly: box(1190, 310, 1640, 400), walk: [1420, 630],
            look: { sk: 'Mostík cez jazierko. Cez jazierko bez vody.', fr: 'Une passerelle au-dessus de l\'étang. D\'un étang sans eau.', words: [['most', 'le pont']] } },
          { id: 'meradlo', name: { sk: 'stĺpik', fr: 'le poteau' }, poly: box(1060, 395, 1100, 535), walk: [1080, 630],
            async onUse(g) {
              g.pose('fox', 'think');
              await say(g, 'fox', 'Stĺpik s pásikmi. Meria sa ním voda. Tu niekto meral vodu?', 'Un poteau à rayures. Il sert à mesurer l\'eau. Quelqu\'un a mesuré l\'eau, ici ?', [['merať', 'mesurer'], ['stĺpik', 'le poteau']]);
              g.pose('fox', null);
              g.setFlag('saw_meradlo');
            } },
          { id: 'srnka', name: { sk: 'srnka', fr: 'la biche' }, poly: box(925, 520, 1155, 592), walk: [1000, 640],
            look: { who: 'narrator', sk: 'Srnka leží v tieni. Mlčí. Je jej horúco.', fr: 'Une biche est couchée à l\'ombre. Elle se tait. Elle a chaud.', words: [['srnka', 'la biche'], ['mlčať', 'se taire']] } },
          { id: 'zaba', name: { sk: 'žaba', fr: 'la grenouille' }, poly: box(1412, 486, 1468, 527), walk: [1430, 630],
            look: { who: 'narrator', sk: 'Žaba na suchom blate. Žaba bez vody…', fr: 'Une grenouille sur la boue sèche. Une grenouille sans eau…', words: [['žaba', 'la grenouille']] } },
          { id: 'jez', name: { sk: 'jež', fr: 'le hérisson' }, poly: box(1498, 520, 1562, 568), walk: [1530, 640],
            look: { who: 'narrator', sk: 'Ježko je skrútený do klbka. Nehovorí.', fr: 'Un hérisson roulé en boule. Il ne parle pas.', words: [['jež', 'le hérisson']] } },
          { id: 'korytnacka', name: { sk: 'korytnačka', fr: 'la tortue' }, poly: box(1572, 515, 1670, 574), walk: [1620, 640],
            look: { who: 'narrator', sk: 'Stará korytnačka. Videla už veľa liet. Takéto ešte nie.', fr: 'Une vieille tortue. Elle a vu beaucoup d\'étés. Jamais un comme celui-ci.', words: [['korytnačka', 'la tortue'], ['starý', 'vieux']] } },
          { id: 'kvety', name: { sk: 'kvety', fr: 'les fleurs' }, poly: box(1640, 400, 2010, 560), walk: [1820, 630],
            look: { sk: 'Zvädnuté kvety.', fr: 'Des fleurs fanées.', words: [['zvädnutý', 'fané']] } },
          { id: 'kacka', sprite: 'kacka', name: { sk: 'kačka', fr: 'le canard' }, walk: [1180, 650],
            look: { sk: 'Kačka je smädná. Nemá vodu.', fr: 'Le canard a soif. Il n\'a pas d\'eau.', words: [['kačka', 'le canard'], ['smädný', 'assoiffé']] },
            async onUse(g) {
              if (g.flag('duck')) { g.pose('kacka', 'talk'); await say(g, 'kacka', 'Ďakujem ešte raz!', 'Merci encore une fois !'); g.pose('kacka', 'happy'); return; }
              g.pose('kacka', 'hope');
              await say(g, 'fox', 'Kačka je smädná.', 'Le canard a soif.', [['kačka', 'le canard'], ['smädný', 'assoiffé']]);
              await say(g, 'kacka', 'Vo… vodu…', 'De… l\'eau…');
              g.pose('kacka', 'thirsty');
            },
            onItem: {
              async flasa(g) {
                await say(g, 'fox', 'Pre teba, kačička.', 'Pour toi, petit canard.', [['pre teba', 'pour toi'], ['dať', 'donner']]);
                g.pose('fox', 'use'); await g.sleep(400); g.pose('fox', null);
                g.take('flasa'); g.setFlag('duck'); g.addClue('kacka');
                g.pose('kacka', 'drink');
                await say(g, 'narrator', 'Kačka pije. Potom prehovorí.', 'Le canard boit. Puis il parle.');
                g.pose('kacka', 'happy'); await g.sleep(700); g.pose('kacka', 'talk');
                await say(g, 'kacka', 'Ďakujem! Včera tu bola vydra. Mala žlté čižmy.', 'Merci ! Hier, une loutre est passée. Elle avait des bottes jaunes.', [['vydra', 'la loutre'], ['čižmy', 'les bottes']]);
                await say(g, 'kacka', 'Merala vodu. Tamto pri jazierku. Potom išla do centra.', 'Elle mesurait l\'eau. Là, près de l\'étang. Puis elle est allée vers le centre.', [['merať', 'mesurer']]);
                g.pose('kacka', 'point'); await g.sleep(900); g.pose('kacka', 'happy');
                await say(g, 'andrea', 'Vydra, ktorá meria vodu? Ideme do centra.', 'Une loutre qui mesure l\'eau ? On va au centre.');
              },
            } },
          { id: 'centrum', name: { sk: 'cesta do centra', fr: 'le chemin du centre' }, poly: box(1950, 360, 2160, 565), walk: [2080, 630],
            async onUse(g) {
              if (!g.flag('duck')) {
                await say(g, 'andrea', 'Môžeme ísť. Ale kačka je smädná…', 'On peut y aller. Mais le canard a soif…');
                const i = await g.choice([{ sk: 'Ideme.', fr: 'On y va.' }, { sk: 'Počkaj, ešte niečo skúsim.', fr: 'Attends, j\'essaie encore quelque chose.' }]);
                if (i === 1) return;
              }
              g.goScene('fontana');
            } },
        ],
        async onEnter(g) {
          if (g.flag('duck')) g.pose('kacka', 'happy');
          if (g.flag('park0')) return;
          g.setFlag('park0');
          await say(g, 'narrator', 'V parku je jazierko. Ale je v ňom veľmi málo vody.', 'Dans le parc, il y a un petit étang. Mais il y a très peu d\'eau dedans.', [['málo', 'peu']]);
          g.pose('andrea', 'worried');
          await say(g, 'andrea', 'Včera tu ešte bola voda. Aspoň trochu.', 'Hier, il y avait encore de l\'eau. Un peu, au moins.', [['včera', 'hier'], ['trochu', 'un peu']]);
          g.pose('andrea', null);
          await say(g, 'narrator', 'Pri jazierku sú iné zvieratá. Nikto nehovorí.', 'Près de l\'étang, d\'autres animaux sont là. Personne ne parle.', [['zviera', 'l\'animal']]);
        },
        hints: [
          { id: 'p_duck', when: (g) => !g.flag('duck'), levels: [
            { sk: 'Kačka je smädná. Máš niečo na pitie?', fr: 'Le canard a soif. Tu as de quoi boire ?' },
            { sk: 'Máš fľašu. Použi ju na kačke.', fr: 'Tu as la gourde. Utilise-la sur le canard.' },
            { sk: 'Vyber fľašu a klikni na kačku.', fr: 'Prends la gourde et clique sur le canard.' } ] },
          { id: 'p_go', levels: [
            { sk: 'Ideme do centra. Je to napravo.', fr: 'On va au centre. C\'est à droite.' } ] },
        ],
      },

      fontana: {
        chapter: 'ch2', title: { sk: 'Spievajúca fontána', fr: 'La fontaine chantante' }, tint: ['#9fb7d6', '#d9d0b4'],
        bg: 'art/fontana_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 625], [2160, 625], [2160, 712], [0, 712]], scale: { y0: 625, s0: 0.55, y1: 712, s1: 0.62 },
        sprites: [gab(150, 665), andrea(270, -1, 655), zahradnik(560, 660, -1)],
        extraSprites: {
          pan: panSprite(1900, 645),
          auto: { img: 'art/obj_auto.png', x: 1950, y: 548, h: 290, face: 1, hidden: true },
        },
        props: [
          { img: 'art/obj_rebrik.png', x: 135, y: 590, w: 150, when: (g) => !g.has('rebrik') },
          { img: 'art/obj_zapisnik.png', x: 800, y: 478, w: 66, when: (g) => !g.flag('nb') },
        ],
        hotspots: [
          { id: 'fontana', name: { sk: 'fontána', fr: 'la fontaine' }, poly: box(415, 290, 1280, 615), walk: [800, 665],
            look: { sk: 'Fontána je prázdna. Spievajúca fontána dnes nespieva.', fr: 'La fontaine est vide. La fontaine chantante ne chante pas aujourd\'hui.', words: [['fontána', 'la fontaine'], ['prázdny', 'vide']] },
            async onUse(g) {
              if (g.flag('nb')) { await say(g, 'fox', 'Už tu nič nie je.', 'Il n\'y a plus rien ici.'); return; }
              if (!g.has('rebrik')) {
                await say(g, 'fox', 'Na dne je niečo malé a modré. Ale je to hlboké.', 'Au fond, il y a quelque chose de petit et de bleu. Mais c\'est profond.', [['dno', 'le fond'], ['hlboký', 'profond']]);
                return;
              }
              await say(g, 'fox', 'Idem dolu.', 'Je descends.');
              g.setFlag('nb'); g.give('zapisnik'); g.addPage('p1'); g.addClue('fontana');
              await say(g, 'fox', 'Pozri, čo som našiel! Zápisník.', 'Regarde ce que j\'ai trouvé ! Un carnet.', [['zápisník', 'le carnet'], ['nájsť', 'trouver']]);
              await say(g, 'andrea', 'Čo je v ňom?', 'Qu\'est-ce qu\'il y a dedans ?');
              await say(g, 'fox', 'Čísla. Dátumy. Kresby fontány. „Meranie vody. Košice.“ A podpis: Dr. V.', 'Des chiffres. Des dates. Des dessins de la fontaine. « Mesure de l\'eau. Košice. » Et une signature : Dr. V.', [['meranie', 'la mesure']]);
              await say(g, 'zahradnik', 'Ten zápisník poznám. Patrí doktorke Vydrovej. Je to vydra. Predvčerom merala fontánu.', 'Je connais ce carnet. Il est à madame la docteure Vydrová. C\'est une loutre. Avant-hier, elle a mesuré la fontaine.');
              await say(g, 'fox', 'A kde je teraz?', 'Et où est-elle maintenant ?');
              await say(g, 'zahradnik', 'Odišla na západ. Hľadá vodu. Ako vy.', 'Elle est partie vers l\'ouest. Elle cherche de l\'eau. Comme vous.');
              await say(g, 'andrea', 'Pozri, posledná strana: „Ďalšie meranie: Slovenský raj.“', 'Regarde, la dernière page : « Prochaine mesure : Paradis slovaque. »');
              g.setFlag('car');
              g.camTo(1700); g.spawn('auto', 1950, 548); await g.sleep(900);
              await say(g, 'narrator', 'Čierne auto zastavuje pri parkovisku.', 'Une voiture noire s\'arrête sur le parking.', [['auto', 'la voiture']]);
              g.camTo(null);
              await say(g, 'andrea', 'Rýchlo! Schovaj zápisník!', 'Vite ! Cache le carnet !', [['schovať', 'cacher']]);
              g.after(16000, async (g2) => { if (!g2.flag('hidden') && !g2.flag('met_pan')) { g2.setFlag('hidden_by_andrea'); await say(g2, 'andrea', 'Daj to sem!', 'Donne-moi ça !'); await meeting(g2); } });
            } },
          { id: 'strom', name: { sk: 'strom', fr: 'l\'arbre' }, poly: box(100, 100, 300, 545), walk: [330, 670],
            look: { sk: 'Veľký gaštan. V lete dáva tieň. V lete bez vody dáva aspoň tieň.', fr: 'Un grand marronnier. L\'été, il donne de l\'ombre. Même sans eau, au moins l\'ombre.', words: [['strom', 'l\'arbre'], ['tieň', 'l\'ombre']] } },
          { id: 'furik', name: { sk: 'fúrik', fr: 'la brouette' }, poly: box(238, 335, 432, 540), walk: [470, 670],
            look: { sk: 'Fúrik záhradníka. Hrable, krhla… nič modré.', fr: 'La brouette du jardinier. Un râteau, un arrosoir… rien de bleu.', words: [['fúrik', 'la brouette'], ['krhla', 'l\'arrosoir']] } },
          { id: 'rebrik', name: { sk: 'rebrík', fr: 'l\'échelle' }, poly: box(55, 250, 215, 595), walk: [250, 670],
            when: (g) => !g.has('rebrik'),
            look: { sk: 'Rebrík. Patrí záhradníkovi.', fr: 'Une échelle. Elle appartient au jardinier.', words: [['rebrík', 'l\'échelle']] } },
          { id: 'lavicka', name: { sk: 'lavička', fr: 'le banc' }, poly: box(1177, 356, 1360, 460), walk: [1270, 650],
            look: { sk: 'Lavička. Nikto na nej nesedí. Je príliš horúco.', fr: 'Un banc. Personne dessus. Il fait trop chaud.', words: [['lavička', 'le banc'], ['príliš', 'trop']] } },
          { id: 'lampa', name: { sk: 'lampa', fr: 'le lampadaire' }, poly: box(1366, 120, 1430, 470), walk: [1400, 650],
            look: { sk: 'Stará pouličná lampa. Cez deň nesvieti.', fr: 'Un vieux lampadaire. De jour, il n\'éclaire pas.', words: [['lampa', 'le lampadaire']] } },
          { id: 'tabula', name: { sk: 'tabuľa', fr: 'le panneau' }, poly: box(1447, 265, 1555, 470), walk: [1500, 650],
            look: { sk: 'Informačná tabuľa. Je prázdna. Žiadny program, žiadna správa.', fr: 'Un panneau d\'affichage. Il est vide. Pas de programme, pas de message.', words: [['tabuľa', 'le panneau'], ['prázdny', 'vide']] } },
          { id: 'kaviaren', name: { sk: 'kaviareň', fr: 'le café' }, poly: box(1590, 160, 1825, 430), walk: [1700, 650],
            look: { sk: 'Terasa kaviarne. Stoličky sú zložené. Zatvorené.', fr: 'La terrasse du café. Les chaises sont empilées. Fermé.', words: [['kaviareň', 'le café'], ['zatvorené', 'fermé']] } },
          { id: 'kvety', name: { sk: 'kvety', fr: 'les fleurs' }, poly: box(430, 500, 660, 580), walk: [540, 670],
            look: { sk: 'Zvädnuté kvety okolo fontány. Aj ony majú smäd.', fr: 'Des fleurs fanées autour de la fontaine. Elles ont soif, elles aussi.', words: [['smäd', 'la soif']] } },
          { id: 'parkovisko', name: { sk: 'parkovisko', fr: 'le parking' }, poly: box(1790, 360, 2040, 570), walk: [1850, 670],
            look: { sk: 'Parkovisko. Dnes je skoro prázdne.', fr: 'Un parking. Aujourd\'hui, il est presque vide.', words: [['parkovisko', 'le parking']] } },
          { id: 'zahradnik', sprite: 'zahradnik', name: { sk: 'záhradník', fr: 'le jardinier' }, walk: [620, 670],
            greet: { who: 'zahradnik', sk: 'Dobrý deň. Hľadáte vodu?', fr: 'Bonjour. Vous cherchez de l\'eau ?' },
            topics: [
              { need: 'voda', sk: 'Kde je voda?', fr: 'Où est l\'eau ?', async run(g) { await say(g, 'zahradnik', 'Tu už nie je. Nikde v meste. V Slovenskom raji ešte je. Hovorili to v rádiu.', 'Il n\'y en a plus ici. Nulle part en ville. Dans le Paradis slovaque, il y en a encore. Ils l\'ont dit à la radio.', [['rádio', 'la radio']]); } },
              { need: 'fontána', sk: 'Čo je s fontánou?', fr: 'Qu\'est-ce qu\'elle a, la fontaine ?', async run(g) { await say(g, 'zahradnik', 'Je suchá už dva mesiace. A na dne vidím niečo modré.', 'Elle est sèche depuis deux mois. Et au fond, je vois quelque chose de bleu.'); } },
              { need: 'rebrík', sk: 'Môžem si požičať rebrík?', fr: 'Je peux emprunter l\'échelle ?', once: true, async run(g) { g.give('rebrik'); await say(g, 'zahradnik', 'Samozrejme. Ale buďte opatrný.', 'Bien sûr. Mais soyez prudent.', [['požičať', 'emprunter'], ['opatrný', 'prudent']]); } },
              { need: 'vydra', when: (g) => g.flag('nb'), sk: 'Poznáte tú vydru?', fr: 'Vous connaissez cette loutre ?', async run(g) { await say(g, 'zahradnik', 'Doktorka Vydrová? Je tu každý rok. Teraz meria vodu po celom Slovensku.', 'La docteure Vydrová ? Elle vient tous les ans. Maintenant elle mesure l\'eau dans toute la Slovaquie.'); } },
            ] },
          { id: 'fox', sprite: 'fox', name: { sk: 'batoh', fr: 'le sac à dos' },
            onItem: {
              async zapisnik(g) {
                if (!g.flag('car')) { await say(g, 'fox', 'Zatiaľ nemusím nič schovávať.', 'Je n\'ai rien à cacher pour l\'instant.'); return; }
                g.setFlag('hidden');
                await say(g, 'fox', 'Do batohu!', 'Dans le sac à dos !');
                await meeting(g);
              },
            } },
          { id: 'stanica', name: { sk: 'stanica', fr: 'la gare' }, poly: box(2060, 215, 2160, 360), walk: [2080, 650],
            async onUse(g) {
              if (!g.flag('met_pan_done')) { await say(g, 'fox', g.flag('nb') ? 'Počkaj. Najprv ten pán.' : 'Najprv fontána.', g.flag('nb') ? 'Attends. D\'abord ce monsieur.' : 'D\'abord la fontaine.'); return; }
              g.goScene('stanica');
            } },
        ],
        hints: [
          { id: 'f_hide', when: (g) => g.flag('car') && !g.flag('hidden'), levels: [
            { sk: 'Rýchlo! Pán sa blíži.', fr: 'Vite ! Le monsieur approche.' },
            { sk: 'Schovaj zápisník do batohu.', fr: 'Cache le carnet dans le sac à dos.' },
            { sk: 'Vyber zápisník a klikni na Gaba.', fr: 'Prends le carnet et clique sur Gab.' } ] },
          { id: 'f_ladder', when: (g) => !g.flag('nb') && !g.has('rebrik'), levels: [
            { sk: 'Na dne fontány je niečo modré.', fr: 'Au fond de la fontaine, il y a quelque chose de bleu.' },
            { sk: 'Potrebuješ rebrík. Spýtaj sa záhradníka.', fr: 'Il te faut une échelle. Demande au jardinier.' },
            { sk: 'Povedz záhradníkovi slovo „rebrík“. Najprv si ho pozri pri strome.', fr: 'Dis au jardinier le mot « rebrík ». Regarde-la d\'abord près de l\'arbre.' } ] },
          { id: 'f_climb', when: (g) => !g.flag('nb') && g.has('rebrik'), levels: [
            { sk: 'Máš rebrík. Klikni na fontánu.', fr: 'Tu as l\'échelle. Clique sur la fontaine.' } ] },
          { id: 'f_go', levels: [
            { sk: 'Ideme na stanicu. Je to napravo.', fr: 'On va à la gare. C\'est à droite.' } ] },
        ],
      },

      stanica: {
        chapter: 'ch2', title: { sk: 'Stanica v Košiciach', fr: 'La gare de Košice' }, tint: ['#8c93a8', '#cbc3b0'],
        bg: 'art/stanica_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 600], [2160, 600], [2160, 712], [0, 712]], scale: { y0: 600, s0: 0.56, y1: 712, s1: 0.64 },
        sprites: [gab(220, 655), andrea(350, 1, 650), pokladnicka(1030, 484)],
        hotspots: [
          { id: 'plagat1', name: { sk: 'plagát', fr: 'l\'affiche' }, poly: box(135, 224, 235, 397), walk: [190, 655],
            look: { sk: 'Plagát: hrad a veža. Košice sú pekné. Aj bez vody.', fr: 'Une affiche : un château et une tour. Košice est joli. Même sans eau.', words: [['plagát', 'l\'affiche'], ['veža', 'la tour']] } },
          { id: 'plagat2', name: { sk: 'plagát', fr: 'l\'affiche' }, poly: box(1658, 224, 1755, 383), walk: [1700, 655],
            look: { sk: 'Plagát: žltá električka. Dnes ideme vlakom.', fr: 'Une affiche : un tram jaune. Aujourd\'hui, on prend le train.', words: [['električka', 'le tram'], ['vlak', 'le train']] } },
          { id: 'kvetina', name: { sk: 'kvetina', fr: 'la plante' }, poly: box(300, 390, 400, 590), walk: [440, 655],
            look: { sk: 'Zelená kvetina. Je jediná v hale, ktorá nemá smäd.', fr: 'Une plante verte. La seule du hall qui n\'a pas soif.', words: [['kvetina', 'la plante']] } },
          { id: 'zatvorene', name: { sk: 'zatvorené okienko', fr: 'le guichet fermé' }, poly: box(1242, 308, 1571, 465), walk: [1400, 655],
            look: { sk: 'Zatvorené okienko. Roleta je dole.', fr: 'Le guichet fermé. Le rideau est baissé.', words: [['zatvorené', 'fermé'], ['roleta', 'le rideau']] } },
          { id: 'rozpis', name: { sk: 'rozpis', fr: 'le tableau des départs' }, poly: box(340, 165, 713, 320), walk: [530, 655],
            async onUse(g) {
              g.setFlag('rozpis');
              await say(g, 'narrator', 'Odchody: 10:42 Spišská Nová Ves · 10:55 Bratislava · 11:08 Prešov.', 'Départs : 10 h 42 Spišská Nová Ves · 10 h 55 Bratislava · 11 h 08 Prešov.', [['rozpis', 'le tableau des départs'], ['odchody', 'les départs']]);
              await say(g, 'andrea', 'Nám ide ten prvý: Spišská Nová Ves.', 'C\'est le premier qu\'il nous faut : Spišská Nová Ves.');
            } },
          { id: 'stol', name: { sk: 'stôl', fr: 'la table' }, poly: box(50, 470, 300, 595), walk: [200, 655],
            async onUse(g) {
              if (g.has('papier') || g.has('mot')) { await say(g, 'fox', 'Papier už mám.', 'J\'ai déjà du papier.'); return; }
              g.give('papier');
              await say(g, 'narrator', 'Na stole leží čistý papier. Gab si ho berie.', 'Sur la table, une feuille blanche. Gab la prend.', [['papier', 'le papier']]);
            } },
          { id: 'pero', name: { sk: 'pero', fr: 'le stylo' }, poly: box(1160, 425, 1215, 475), walk: [1190, 650],
            async onUse(g) {
              if (g.has('pero') || g.has('mot')) { await say(g, 'fox', 'Pero už mám.', 'J\'ai déjà un stylo.'); return; }
              g.give('pero');
              await say(g, 'narrator', 'Na pulte leží pero. Gab si ho berie.', 'Sur le comptoir, un stylo. Gab le prend.', [['pero', 'le stylo']]);
            } },
          { id: 'schranka', name: { sk: 'schránka', fr: 'la boîte aux lettres' }, poly: box(1669, 410, 1744, 502), walk: [1710, 655],
            look: { sk: 'Poštová schránka. Sem dám odkaz pre tetu.', fr: 'Une boîte aux lettres. J\'y mets le mot pour la tante.', words: [['schránka', 'la boîte aux lettres']] },
            onItem: {
              async mot(g) {
                g.take('mot'); g.setFlag('mot_sent');
                await say(g, 'narrator', 'Odkaz je v schránke. Teta ho nájde ráno.', 'Le message est dans la boîte. La tante le trouvera demain matin.');
              },
            } },
          { id: 'pokladnicka', sprite: 'pokladnicka', name: { sk: 'pokladníčka', fr: 'la guichetière' }, walk: [880, 655],
            onItem: {
              async listok_ok(g) {
                await say(g, 'fox', 'Tu je môj lístok!', 'Voici mon ticket !');
                g.pose('pokladnicka', 'surprised');
                await say(g, 'pokladnicka', 'To je lístok na električku. Ja predávam lístky na vlak.', 'C\'est un ticket de tram. Moi, je vends des billets de train.');
                g.pose('pokladnicka', 'smile');
                await say(g, 'andrea', 'Gab…', 'Gab…'); g.pose('pokladnicka', null);
              },
            },
            async onUse(g) {
              if (g.flag('tickets')) { g.pose('pokladnicka', 'wave'); await say(g, 'pokladnicka', 'Šťastnú cestu!', 'Bon voyage !'); g.pose('pokladnicka', null); return; }
              g.pose('pokladnicka', 'smile');
              await say(g, 'pokladnicka', 'Dobrý deň. Kam idete?', 'Bonjour. Vous allez où ?', [['kam', 'où (direction)']]);
              if (!g.flag('rozpis')) { g.pose('pokladnicka', 'point'); await say(g, 'andrea', 'Najprv sa pozri na rozpis.', 'Regarde d\'abord le tableau des départs.'); g.pose('pokladnicka', null); return; }
              g.pose('pokladnicka', 'wait');
              for (;;) {
                const i = await g.choice([
                  { sk: 'Dva lístky do Spišskej Novej Vsi, prosím.', fr: 'Deux billets pour Spišská Nová Ves, s\'il vous plaît.' },
                  { sk: 'Dva lístky do Spišská Nová Ves, prosím.', fr: 'Deux billets pour Spišská Nová Ves (mal décliné).' },
                  { sk: 'Dve lístky do Spišskej Novej Vsi, prosím.', fr: 'Deux billets… (mal accordé).' },
                ]);
                if (i === 0) break;
                g.pose('pokladnicka', 'no');
                await say(g, 'pokladnicka', i === 1 ? 'Správne je: do Spišskej Novej Vsi.' : 'Lístok je mužský rod: dva lístky.', i === 1 ? 'Le bon accord : « do Spišskej Novej Vsi » (après « do », on décline).' : '« Lístok » est masculin : « dva lístky ».');
              }
              g.give('listky_vlak'); g.setFlag('tickets');
              g.pose('pokladnicka', 'stamp'); await g.sleep(700); g.pose('pokladnicka', 'give');
              await say(g, 'pokladnicka', 'Dva lístky. Šťastnú cestu!', 'Deux billets. Bon voyage !', [['pokladňa', 'le guichet']]);
              g.pose('pokladnicka', null);
            } },
          { id: 'nastupiste', name: { sk: 'nástupište', fr: 'le quai' }, poly: box(1777, 280, 2085, 605), walk: [1930, 655],
            async onUse(g) {
              if (!g.flag('tickets') || !g.flag('mot_sent')) { await say(g, 'andrea', 'Ešte nie. Potrebujeme lístky na vlak a odkaz pre tetu.', 'Pas encore. Il nous faut les billets et le mot pour ma tante.'); return; }
              await say(g, 'narrator', 'Vlak odchádza na západ.', 'Le train part vers l\'ouest.');
              await g.showMap('ch3');
              g.goScene('raj');
            } },
        ],
        hints: [
          { id: 's_note', when: (g) => !g.flag('mot_sent'), levels: [
            { sk: 'Andrea chce napísať odkaz tete.', fr: 'Andrea veut écrire un mot à sa tante.' },
            { sk: 'Potrebuješ pero a papier. Pozri sa na stôl a pult.', fr: 'Il te faut un stylo et du papier. Regarde la table et le comptoir.' },
            { sk: 'Vyber pero a klikni na papier v zozname vecí. Potom daj odkaz do schránky.', fr: 'Prends le stylo et clique sur le papier dans ton inventaire. Puis mets le mot dans la boîte.' } ] },
          { id: 's_tickets', when: (g) => !g.flag('tickets'), levels: [
            { sk: 'Treba kúpiť dva lístky na vlak.', fr: 'Il faut acheter deux billets de train.' },
            { sk: 'Najprv si prečítaj rozpis.', fr: 'Lis d\'abord le tableau des départs.' },
            { sk: 'Povedz: „do Spišskej Novej Vsi“.', fr: 'Dis : « do Spišskej Novej Vsi ».' } ] },
          { id: 's_go', levels: [
            { sk: 'Máme všetko. Choď na nástupište.', fr: 'On a tout. Va sur le quai.' } ] },
        ],
      },

      // ---------------------------------------------------------------- chapitre 3 : Raj (decor A : foret et ruisseau)
      raj: {
        chapter: 'ch3', title: { sk: 'Les v Slovenskom raji', fr: 'La forêt du Paradis slovaque' }, tint: ['#6f9a5a', '#c9b27a'],
        bg: 'art/raj_foret_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 560], [2160, 560], [2160, 712], [0, 712]], scale: { y0: 560, s0: 0.5, y1: 712, s1: 0.62 },
        sprites: [gab(150, 650), andrea(280, 1, 645)],
        triggers: [
          // scene 2 : la foret silencieuse (Andrea dit « vpravo » sans le traduire)
          { x: [700, 2160], when: (g) => g.flag('raj0') && !g.flag('raj2'), async run(g) {
            g.setFlag('raj2');
            await say(g, 'narrator', 'Idú cez les. Je tu tieň, ale voda nie je.', 'Ils traversent la forêt. Il y a de l\'ombre, mais pas d\'eau.', [['les', 'la forêt'], ['tieň', 'l\'ombre']]);
            await say(g, 'fox', 'Je to ešte ďaleko?', 'C\'est encore loin ?');
            await say(g, 'andrea', 'Nie. Ale ticho. Počuješ?', 'Non. Mais chut. Tu entends ?', [['ticho', 'le silence']]);
            await say(g, 'fox', 'Nič nepočujem.', 'Je n\'entends rien.');
            await say(g, 'andrea', 'Presne. Ticho. Aj vtáky mlčia.', 'Exactement. Le silence. Même les oiseaux se taisent.', [['vtáky', 'les oiseaux']]);
            await say(g, 'fox', 'To nie je dobré.', 'C\'est pas bon.');
            await say(g, 'andrea', 'Nie. Ale počkaj… Počuješ to?', 'Non. Mais attends… Tu entends ça ?');
            await say(g, 'narrator', 'Niekde blízko tečie voda.', 'Quelque part tout près, de l\'eau coule.', [['voda', 'l\'eau']]);
            await say(g, 'fox', 'Voda! Potok!', 'De l\'eau ! Un ruisseau !', [['potok', 'le ruisseau']]);
            g.pose('andrea', 'point');
            await say(g, 'andrea', 'Tečie vpravo. Poď!', 'Elle coule… (à toi de comprendre.) Viens !');
            g.pose('andrea', null);
            await g.walk('andrea', 1500, 650);
          } },
        ],
        hotspots: [
          { id: 'zastavka', name: { sk: 'zastávka', fr: 'la halte' }, poly: box(0, 110, 215, 455), walk: [260, 645],
            look: { sk: 'Malá zastávka s jednou lampou. Vlak už odišiel.', fr: 'Une petite halte avec un seul lampadaire. Le train est déjà reparti.', words: [['zastávka', 'la halte'], ['lampa', 'le lampadaire']] } },
          { id: 'buk', name: { sk: 'buk', fr: 'le hêtre' }, poly: box(190, 0, 445, 500), walk: [480, 645],
            look: { sk: 'Starý buk. Aj v suchu dáva tieň.', fr: 'Un vieux hêtre. Même par temps sec, il donne de l\'ombre.', words: [['buk', 'le hêtre']] } },
          { id: 'spadnuty', name: { sk: 'spadnutý strom', fr: 'l\'arbre tombé' }, poly: box(395, 280, 790, 470), walk: [600, 645],
            look: { sk: 'Spadnutý strom. Tadiaľto cesta nevedie. A voda tu určite nie je.', fr: 'Un arbre tombé. Le chemin ne passe pas par là. Et il n\'y a sûrement pas d\'eau ici.', words: [['spadnutý', 'tombé'], ['strom', 'l\'arbre']] } },
          { id: 'pnik', name: { sk: 'pník', fr: 'la souche' }, poly: box(740, 380, 955, 500), walk: [850, 645],
            look: { sk: 'Starý pník. Strom tu už nie je. Len pník.', fr: 'Une vieille souche. L\'arbre n\'est plus là. Seulement la souche.', words: [['pník', 'la souche']] } },
          { id: 'huby', name: { sk: 'huby', fr: 'les champignons' }, poly: box(1100, 340, 1290, 495), walk: [1200, 645],
            async onUse(g) {
              await say(g, 'fox', 'Huby! Môžem jednu?', 'Des champignons ! Je peux en goûter un ?', [['huby', 'les champignons']]);
              g.pose('andrea', 'point');
              await say(g, 'andrea', 'Nie! Nejedz ich!', 'Non ! N\'en mange pas !', [['nejedz', 'ne mange pas']]);
              g.pose('andrea', null);
            } },
          { id: 'kamen', name: { sk: 'kameň', fr: 'la pierre' }, poly: box(1490, 460, 1725, 555), walk: [1600, 655],
            look: { sk: 'Plochý kameň pri potoku. Dobré miesto, kde sa napiť.', fr: 'Une pierre plate au bord du ruisseau. Un bon endroit pour boire.', words: [['kameň', 'la pierre'], ['napiť sa', 'boire']] } },
          { id: 'potok', name: { sk: 'potok', fr: 'le ruisseau' }, poly: box(1640, 360, 2160, 620), walk: [1760, 655],
            async onUse(g) {
              if (g.flag('drank')) { await say(g, 'fox', 'Potok je malý. Vody je málo, ale je tam.', 'Le ruisseau est petit. Il y a peu d\'eau, mais il y en a.', [['málo', 'peu']]); return; }
              g.setFlag('drank');
              await say(g, 'narrator', 'Gab sa napije. Voda je studená!', 'Gab boit. L\'eau est fraîche !', [['studená', 'froide']]);
              if (!g.knows('vpravo')) {
                g.pose('fox', 'think');
                await say(g, 'fox', 'Voda bola vpravo. Aha: vpravo je tam, kde je voda!', 'L\'eau était « vpravo ». Ah : « vpravo », c\'est là où est l\'eau !');
                g.pose('fox', null);
                g.learn('vpravo', 'à droite');
              }
            } },
          { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [1500, 650],
            async onUse(g) {
              if (!g.flag('drank')) { g.pose('andrea', 'point'); await say(g, 'andrea', 'Najprv sa napi. Potom rozprávaj.', 'D\'abord, bois. Ensuite, parle.', [['najprv', 'd\'abord'], ['potom', 'ensuite']]); g.pose('andrea', null); return; }
              if (!g.flag('raj3')) {
                g.setFlag('raj3');
                await say(g, 'narrator', 'Potok je malý. Vody je v ňom málo, ale je tam.', 'Le ruisseau est petit. Il y a peu d\'eau, mais il y en a.');
                await say(g, 'fox', 'Je tu voda! Je tu veľa vody!', 'Il y a de l\'eau ! Il y a beaucoup d\'eau !', [['veľa', 'beaucoup']]);
                await say(g, 'andrea', 'Nie je tu veľa. Je tu dosť. Pre dvoch.', 'Il n\'y en a pas beaucoup. Il y en a assez. Pour deux.', [['dosť', 'assez']]);
                await say(g, 'fox', 'To mi stačí.', 'Ça me suffit.');
                await say(g, 'fox', 'Ty si zase šéf.', 'Tu fais encore la cheffe.', [['šéf', 'le chef']]);
                await say(g, 'andrea', 'Ja mám mapu. Ty máš batoh. Takže ja som šéf.', 'Moi, j\'ai la carte. Toi, tu as le sac à dos. Donc c\'est moi la cheffe.', [['batoh', 'le sac à dos']]);
                await say(g, 'fox', 'To je nespravodlivé.', 'C\'est injuste.');
                await say(g, 'andrea', 'Je.', 'Oui.');
                return;
              }
              await say(g, 'andrea', 'Poď. Cesta vedie do rokliny. Je tam, na konci.', 'Viens. Le chemin mène à la gorge. C\'est au bout.', [['roklina', 'la gorge']]);
            } },
          { id: 'rokle', name: { sk: 'cesta do rokliny', fr: 'le chemin de la gorge' }, poly: box(2040, 300, 2160, 560), walk: [2090, 640],
            async onUse(g) {
              if (!g.flag('drank')) { await say(g, 'andrea', 'Počkaj! Najprv sa napi.', 'Attends ! Bois d\'abord.'); return; }
              if (!g.flag('raj3')) { await say(g, 'andrea', 'Počkaj. Ešte sa porozprávame.', 'Attends. On se parle d\'abord un peu.'); return; }
              await say(g, 'narrator', 'Cesta vedie do rokliny. V skale sú rebríky a mostíky nad vodou.', 'Le chemin mène dans une gorge. Dans la roche, il y a des échelles et des petits ponts au-dessus de l\'eau.', [['rebrík', 'l\'échelle'], ['most', 'le pont']]);
              g.pose('fox', 'surprised');
              await say(g, 'fox', 'To nemyslíš vážne.', 'Tu ne parles pas sérieusement.');
              g.pose('fox', null);
              await say(g, 'andrea', 'Myslím. Idem prvá. Ty ideš za mnou.', 'Si. Je passe la première. Toi, tu me suis.');
              g.goScene('rokle');
            } },
        ],
        hints: [
          { id: 'r_water', when: (g) => !g.flag('drank'), levels: [
            { sk: 'Je tu ticho. Počúvaj. Kde tečie voda?', fr: 'Il y a un silence. Écoute. Où coule l\'eau ?' },
            { sk: 'Andrea povedala: „vpravo“.', fr: 'Andrea a dit : « vpravo ».' },
            { sk: 'Choď doprava, až k potoku. Potom klikni na potok.', fr: 'Va vers la droite, jusqu\'au ruisseau. Puis clique sur le ruisseau.' } ] },
          { id: 'r_talk', when: (g) => !g.flag('raj3'), levels: [
            { sk: 'Andrea ti chce niečo povedať. Napi sa a potom sa s ňou rozprávaj.', fr: 'Andrea veut te dire quelque chose. Bois, puis parle-lui.' } ] },
          { id: 'r_go', levels: [
            { sk: 'Cesta do rokliny je úplne vpravo.', fr: 'Le chemin de la gorge est tout à droite.' } ] },
        ],
        async onEnter(g) {
          if (g.flag('raj0')) return;
          g.setFlag('raj0');
          g.take('rebrik'); g.take('listky_vlak');   // l'echelle a ete rendue au jardinier, les billets sont composes
          await say(g, 'narrator', 'Vlak stojí v Spišskej Novej Vsi. Gab a Andrea vystupujú. Je horúco.', 'Le train est arrêté à Spišská Nová Ves. Gab et Andrea descendent. Il fait chaud.', [['horúco', 'chaud']]);
          await say(g, 'fox', 'Kam teraz?', 'On va où maintenant ?');
          await say(g, 'andrea', 'Poď za mnou. Mám mapu.', 'Suis-moi. J\'ai une carte.', [['mapa', 'la carte']]);
          await say(g, 'fox', 'Ty vždy máš mapu.', 'Tu as toujours une carte.');
          await say(g, 'andrea', 'A ty vždy máš otázky. Poď.', 'Et toi, tu as toujours des questions. Viens.', [['otázka', 'la question']]);
          await say(g, 'fox', 'Počkaj! Idem pomaly!', 'Attends ! Je vais lentement !', [['pomaly', 'lentement']]);
          await say(g, 'andrea', 'Ja viem. Tak poď rýchlo.', 'Je sais. Alors viens vite.', [['rýchlo', 'vite']]);
          await g.walk('andrea', 760, 645);
        },
      },

      // ---------------------------------------------------------------- chapitre 3 : decor B, la gorge a echelles
      rokle: {
        chapter: 'ch3', title: { sk: 'Roklina', fr: 'La gorge' }, tint: ['#b9b08a', '#8f8a6a'],
        bg: 'art/raj_rokle_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 640], [520, 640], [520, 712], [0, 712]], scale: { y0: 640, s0: 0.6, y1: 712, s1: 0.66, clamp: true },
        freeWalk: true,
        noWalk: (g) => !!g.flagv('rk_step'),   // une fois sur l'echelle, on ne marche plus au sol
        sprites: [gab(220, 668), andrea(330, 1, 662)],
        hotspots: [
          { id: 'lano', name: { sk: 'lano', fr: 'la corde' }, poly: box(762, 20, 812, 255),
            look: { sk: 'Lano s uzlom. Visí zo stromu. To nie je cesta.', fr: 'Une corde avec un nœud. Elle pend d\'un arbre. Ce n\'est pas le chemin.', words: [['lano', 'la corde'], ['uzol', 'le nœud']] } },
          { id: 'hniezdo', name: { sk: 'hniezdo', fr: 'le nid' }, poly: box(405, 70, 480, 125),
            look: { sk: 'Vtáčie hniezdo. Je prázdne. Aj vtáky mlčia.', fr: 'Un nid d\'oiseau. Il est vide. Même les oiseaux se taisent.', words: [['hniezdo', 'le nid']] } },
          { id: 'vodopad', name: { sk: 'vodopád', fr: 'la cascade' }, poly: box(1790, 40, 1950, 610),
            look: { sk: 'Malý vodopád. Je tenký. Vody je málo.', fr: 'Une petite cascade. Elle est toute fine. Il y a peu d\'eau.', words: [['vodopád', 'la cascade']] } },
          { id: 'potok', name: { sk: 'potok', fr: 'le ruisseau' }, poly: box(560, 590, 1500, 712),
            look: { sk: 'Potok pod mostom. Radšej sa nepozerám dole.', fr: 'Le ruisseau sous le pont. Je préfère ne pas regarder en bas.', words: [['most', 'le pont']] } },
          // les trois elements du trajet : rebrik 1 (hore), most (doprava), rebrik 2 (dole). Le rebrik du milieu est une impasse.
          { id: 'rebrik1', name: { sk: 'rebrík', fr: 'l\'échelle' }, poly: box(335, 205, 445, 625),
            async onUse(g) {
              const st = g.flagv('rk_step') || 0;
              if (st === 0 && g.flag('rk_ready')) {
                g.setFlag('rk_step', 1);
                await follow(g, 'fox', ROK_UP);
                g.learn('hore', 'en haut');
                await say(g, 'andrea', 'Výborne! Teraz doprava. Cez most!', 'Très bien ! Maintenant… (à toi de comprendre) Passe le pont !', [['most', 'le pont']]);
              } else if (st === 0) { await say(g, 'fox', 'Najprv počkám, čo povie Andrea.', 'J\'attends d\'abord ce que dit Andrea.'); }
              else { await say(g, 'fox', 'Tam som už bol. Nepôjdem naspäť.', 'J\'y suis déjà passé. Je ne retourne pas en arrière.'); }
            } },
          { id: 'most', name: { sk: 'most', fr: 'le pont' }, poly: box(620, 300, 1700, 445),
            async onUse(g) {
              const st = g.flagv('rk_step') || 0;
              if (st === 1) {
                g.setFlag('rk_step', 2);
                await follow(g, 'fox', ROK_CROSS);
                g.learn('doprava', 'vers la droite');
                await say(g, 'andrea', 'Úžasné! A teraz dole! Po rebríku!', 'Génial ! Et maintenant… (à toi de comprendre) Par l\'échelle !', [['rebrík', 'l\'échelle']]);
              } else if (st === 0) {
                await say(g, 'fox', 'Most? Ale ako sa tam dostanem? Je vysoko!', 'Le pont ? Mais comment j\'y monte ? C\'est haut !');
                await rokErr(g, 'Hore! Najprv rebrík!', '« Hore », c\'est en haut. Il faut d\'abord monter à l\'échelle !');
              } else { await say(g, 'fox', 'Most som už prešiel.', 'J\'ai déjà traversé le pont.'); }
            } },
          { id: 'rebrik2', name: { sk: 'rebrík', fr: 'l\'échelle' }, poly: box(1590, 360, 1690, 650),
            async onUse(g) {
              const st = g.flagv('rk_step') || 0;
              if (st === 2) {
                g.setFlag('rk_step', 3);
                await follow(g, 'fox', ROK_DOWN);
                g.learn('dole', 'en bas');
                g.pose('fox', 'laugh');
                await say(g, 'fox', 'Som dole! Dole! Žijem!', 'Je suis en bas ! Je suis vivant !', [['dole', 'en bas']]);
                g.pose('fox', null);
                await say(g, 'andrea', 'Vidíš? Nebolo to také zlé.', 'Tu vois ? C\'était pas si terrible.');
                await say(g, 'fox', 'Zatváral som oči. Skoro som nič nevidel.', 'J\'avais les yeux fermés. Je n\'ai presque rien vu.');
                await g.sleep(500); g.goScene('orol');
              } else if (st === 1) {
                await say(g, 'fox', 'Ten rebrík je za mostom. Najprv musím prejsť cez most.', 'Cette échelle est après le pont. Je dois d\'abord le traverser.');
                await rokErr(g, 'Doprava! Cez most!', '« Doprava », c\'est vers la droite ! Par le pont !');
              } else { await say(g, 'fox', 'Ešte nie. Najprv ma Andrea musí navigovať.', 'Pas encore. Andrea doit d\'abord me guider.'); }
            } },
          { id: 'rebrik3', name: { sk: 'rebrík', fr: 'l\'échelle' }, poly: box(1030, 150, 1100, 395),
            async onUse(g) {
              const st = g.flagv('rk_step') || 0;
              if (st === 0) { await say(g, 'fox', 'Ten rebrík je veľmi vysoko. Odtiaľto sa tam nedostanem.', 'Cette échelle est très haut. D\'ici, je ne peux pas y aller.'); return; }
              // l'impasse : il grimpe, ne trouve rien, redescend
              const back = st === 1 ? [585, 305] : [1640, 402];
              await follow(g, 'fox', [[660, 402], [1065, 402], 'up', [1065, 165]]);
              g.pose('fox', 'surprised');
              await say(g, 'fox', 'Tu nie je nič. Len skala a… ticho.', 'Il n\'y a rien ici. Juste de la roche et… du silence.');
              g.pose('fox', null);
              await say(g, 'andrea', 'Nie tam! Počúvaj ma!', 'Pas là ! Écoute-moi !');
              await follow(g, 'fox', ['down', [1065, 402]]);
              if (st === 1) await follow(g, 'fox', [[660, 402], back]); else await follow(g, 'fox', [back]);
              await rokErr(g, st === 1 ? 'Doprava! Cez most!' : 'Dole! Po rebríku!', st === 1 ? '« Doprava », vers la droite ! Par le pont !' : '« Dole », c\'est en bas ! Par l\'échelle !');
            } },
        ],
        hints: [
          { id: 'k_up', when: (g) => !g.flagv('rk_step'), levels: [
            { sk: 'Andrea volá z druhej strany. Počúvaj, čo hovorí.', fr: 'Andrea appelle depuis l\'autre côté. Écoute ce qu\'elle dit.' },
            { sk: '„Hore“ znamená, že sa ide nahor.', fr: '« Hore » veut dire qu\'on monte.' },
            { sk: 'Klikni na ľavý rebrík.', fr: 'Clique sur l\'échelle de gauche.' } ] },
          { id: 'k_cross', when: (g) => g.flagv('rk_step') === 1, levels: [
            { sk: 'Andrea povedala: „doprava“.', fr: 'Andrea a dit : « doprava ».' },
            { sk: 'Cez čo sa dá ísť doprava?', fr: 'Par où peut-on aller vers la droite ?' },
            { sk: 'Klikni na most.', fr: 'Clique sur le pont.' } ] },
          { id: 'k_down', when: (g) => g.flagv('rk_step') === 2, levels: [
            { sk: 'Andrea povedala: „dole“.', fr: 'Andrea a dit : « dole ».' },
            { sk: '„Dole“ je opak slova „hore“.', fr: '« Dole » est le contraire de « hore ».' },
            { sk: 'Klikni na pravý rebrík.', fr: 'Clique sur l\'échelle de droite.' } ] },
        ],
        async onEnter(g) {
          if (g.flag('rk0')) return;
          g.setFlag('rk0');
          await say(g, 'fox', 'Po rebríkoch? Ja nemám rád výšky!', 'Par des échelles ? Moi, je n\'aime pas les hauteurs !', [['výška', 'la hauteur']]);
          await say(g, 'andrea', 'Nepozeraj dole.', 'Ne regarde pas en bas.');
          await say(g, 'fox', 'Ja nepozerám. Ja zatváram oči.', 'Je ne regarde pas. Je ferme les yeux.', [['oči', 'les yeux']]);
          await say(g, 'andrea', 'Zatvorené oči a rebrík? To je zlý nápad.', 'Les yeux fermés et une échelle ? Mauvaise idée.', [['nápad', 'l\'idée']]);
          await say(g, 'fox', 'Všetky moje nápady sú zlé. Je to môj štýl.', 'Toutes mes idées sont mauvaises. C\'est mon style.');
          await say(g, 'andrea', 'Poď. Ak spadneš, chytím ťa.', 'Viens. Si tu tombes, je te rattrape.');
          await say(g, 'fox', 'Ty? Ty si zajac!', 'Toi ? Mais tu es un lièvre !');
          await say(g, 'andrea', 'Zajačica. A silná.', 'Une hase. Et forte.');
          await say(g, 'fox', 'Dobre. Idem.', 'D\'accord. J\'y vais.');
          // Andrea passe devant et attend de l'autre cote, puis guide Gab a la voix
          await follow(g, 'andrea', [...ROK_UP, ...ROK_CROSS, ...ROK_DOWN]);
          g.face('andrea', -1);
          g.pose('andrea', 'point');
          await say(g, 'andrea', 'Hore! Rebrík je pred tebou!', 'Hore ! (À toi de comprendre.) L\'échelle est devant toi !');
          g.pose('andrea', null);
          g.setFlag('rk_ready');
        },
      },

      // ---------------------------------------------------------------- chapitre 3 : decor C, le rocher de pan Orol
      orol: {
        chapter: 'ch3', title: { sk: 'Skala pána Orla', fr: 'Le rocher de l\'aigle' }, tint: ['#d9c88a', '#a99c6a'],
        bg: 'art/raj_orol_wide.webp', worldW: 2160,
        player: 'fox', floor: [[0, 590], [2160, 590], [2160, 712], [0, 712]], scale: { y0: 590, s0: 0.58, y1: 712, s1: 0.66, clamp: true },
        sprites: [gab(220, 672), andrea(340, 1, 664), orolSprite(1800, 212)],
        hotspots: [
          // le rocher d'abord : les hotspots suivants (dont Orol, perche dessus) gagnent au recouvrement
          { id: 'skala', name: { sk: 'skala', fr: 'le rocher' }, poly: box(1540, 130, 2160, 545),
            look: { sk: 'Veľká skala. Na vrchu sedí orol.', fr: 'Un grand rocher. Un aigle est perché au sommet.', words: [['skala', 'le rocher']] } },
          { id: 'orol', sprite: 'orol', name: { sk: 'pán Orol', fr: 'pán Orol' }, walk: [1560, 668],
            greet: { who: 'orol', sk: 'Dobrý deň. Máte ešte nejakú otázku?', fr: 'Bonjour. Vous avez encore une question ?' },
            topics: [
              { when: (g) => g.flag('orol_done'), sk: 'Kde sú Tatry?', fr: 'Où sont les Tatras ?', async run(g) { g.pose('orol', 'pointr'); await say(g, 'orol', 'Tam. Vpravo, za lesom. Vidíte ten sneh?', 'Là-bas. À droite, derrière la forêt. Vous voyez cette neige ?', [['sneh', 'la neige']]); g.pose('orol', null); } },
              { when: (g) => g.flag('orol_done'), sk: 'Kam šla doktorka Vydrová?', fr: 'Où est partie la docteure Vydrová ?', async run(g) { g.pose('orol', 'paper'); await say(g, 'orol', 'Do Tatier. K Téryho chate. Je to napísané na papieri.', 'Dans les Tatras. Au refuge Téry. C\'est écrit sur le papier.'); g.pose('orol', null); } },
              { when: (g) => g.flag('orol_done'), sk: 'Kto bol ten pán v obleku?', fr: 'Qui était ce monsieur en costume ?', async run(g) { g.pose('orol', 'down'); await say(g, 'orol', 'Neviem. Mal čierne auto a veľký úsmev. Nepáčil sa mi.', 'Je ne sais pas. Il avait une voiture noire et un grand sourire. Il ne me plaisait pas.'); g.pose('orol', null); } },
            ],
            async onUse(g) { if (!g.flag('orol_done')) await orolTalk(g); else await g.talk(this); } },
          { id: 'dutina', name: { sk: 'dutina', fr: 'le trou dans l\'arbre' }, poly: box(495, 135, 585, 225), walk: [520, 668],
            look: { sk: 'Dutina v strome. Je tam ticho. Nikto nie je doma. Iba jeden orech.', fr: 'Un trou dans l\'arbre. C\'est silencieux. Personne n\'est chez soi. Juste une noix.', words: [['dutina', 'le creux'], ['orech', 'la noix']] } },
          { id: 'rebrik', name: { sk: 'rebrík', fr: 'l\'échelle' }, poly: box(100, 110, 225, 580),
            look: { sk: 'Rebrík z rokliny. Už sme dole. Tentoraz som otvoril oči.', fr: 'L\'échelle de la gorge. On est en bas. Cette fois, j\'ai ouvert les yeux.', words: [['tentoraz', 'cette fois']] } },
          { id: 'kmen', name: { sk: 'kmeň', fr: 'le tronc' }, poly: box(545, 390, 995, 505),
            look: { sk: 'Padnutý kmeň. Rastú na ňom hríby. Nie sú pre nás.', fr: 'Un tronc tombé. Des champignons y poussent. Ils ne sont pas pour nous.', words: [['kmeň', 'le tronc']] } },
          { id: 'potok', name: { sk: 'potok', fr: 'le ruisseau' }, poly: box(995, 415, 1560, 485),
            look: { sk: 'Potok je tenký. Vody je málo.', fr: 'Le ruisseau est tout fin. Il y a peu d\'eau.', words: [['málo', 'peu']] } },
          { id: 'tatry', name: { sk: 'Tatry', fr: 'les Tatras' }, poly: box(1330, 40, 1960, 130),
            look: { sk: 'Vysoké Tatry. Na vrcholoch je sneh. V lete!', fr: 'Les Hautes Tatras. Il y a de la neige sur les sommets. En été !', words: [['Tatry', 'les Tatras'], ['sneh', 'la neige']] } },
          { id: 'pierko', name: { sk: 'pierko', fr: 'la plume' }, poly: box(1880, 520, 1990, 570), walk: [1840, 668],
            look: { sk: 'Orlie pierko. Nechám ho tu. Patrí pánovi Orlovi.', fr: 'Une plume d\'aigle. Je la laisse là. Elle appartient à pán Orol.', words: [['pierko', 'la plume']] } },
        ],
        hints: [
          { id: 'o_talk', when: (g) => !g.flag('orol_done'), levels: [
            { sk: 'Niekto sedí hore na skale.', fr: 'Quelqu\'un est perché en haut du rocher.' },
            { sk: 'Je to pán Orol, strážca parku. Pozdrav ho.', fr: 'C\'est pán Orol, le garde du parc. Va le saluer.' },
            { sk: 'Klikni na orla.', fr: 'Clique sur l\'aigle.' } ] },
        ],
        async onEnter(g) {
          if (g.flag('or0')) return;
          g.setFlag('or0');
          await say(g, 'narrator', 'Na konci rokliny je čistinka. Na skale sedí orol.', 'Au bout de la gorge, il y a une clairière. Un aigle est perché sur un rocher.', [['čistinka', 'la clairière'], ['orol', 'l\'aigle']]);
          g.camTo(1400);
          await g.sleep(1400);
          g.pose('andrea', 'point');
          await say(g, 'andrea', 'Pozri! Hore na skale.', 'Regarde ! Là-haut sur le rocher.', [['skala', 'le rocher']]);
          g.pose('andrea', null);
          g.camTo(null);
        },
      },
    },
  };

  // la gorge : trajets le long des echelles et de la passerelle (coordonnees du decor)
  // trajets scriptes : [x, y] = on marche ; 'up' / 'down' / null = on grimpe (bande d'images) ou on remarche
  const ROK_UP = [[390, 648], 'up', [390, 300], null, [585, 305]];            // echelle 1 puis la plate-forme
  const ROK_CROSS = [[660, 402], [1580, 402], [1640, 402]];                   // la passerelle
  const ROK_DOWN = ['down', [1640, 650], null, [1820, 668]];                  // echelle 2 puis la berge de droite
  const follow = async (g, id, pts) => {
    for (const p of pts) { if (Array.isArray(p)) await g.walk(id, p[0], p[1]); else g.climb(id, p); }
    g.climb(id, null);
  };
  // pan Orol : vouvoiement. Il faut dire « videli ste », pas « videl si » (on ne tutoie pas le garde du parc)
  async function orolTalk(g) {
    g.setFlag('orol_met');
    g.pose('orol', 'hat');
    await say(g, 'orol', 'Dobrý deň. Kam idete?', 'Bonjour. Vous allez où ?');
    g.pose('orol', null);
    await say(g, 'fox', 'Dobrý deň. Hľadáme vodu.', 'Bonjour. Nous cherchons de l\'eau.');
    g.pose('orol', 'worry');
    await say(g, 'orol', 'Aj tu je vody menej ako vlani. Potoky vysychajú.', 'Ici aussi, il y a moins d\'eau que l\'an dernier. Les ruisseaux s\'assèchent.', [['vlani', 'l\'an dernier'], ['vysychajú', 's\'assèchent']]);
    await say(g, 'andrea', 'Menej ako vlani? Čo sa deje?', 'Moins que l\'an dernier ? Qu\'est-ce qui se passe ?');
    g.pose('orol', 'no');
    await say(g, 'orol', 'Neviem. V Tatrách vraj prší. Tu nie.', 'Je ne sais pas. Il paraît qu\'il pleut dans les Tatras. Pas ici.');
    await say(g, 'andrea', 'V Tatrách prší?', 'Il pleut dans les Tatras ?');
    g.pose('orol', 'pointr');
    await say(g, 'orol', 'Áno. V horách je počasie iné. Ak chcete vodu, choďte tam.', 'Oui. Dans les montagnes, le temps est différent. Si vous voulez de l\'eau, allez là-bas.', [['počasie', 'le temps (météo)'], ['choďte', 'allez (vous)']]);
    g.pose('orol', null);
    // le joueur choisit la phrase polie
    for (;;) {
      const i = await g.choice([
        { sk: 'A videl si tu jednu vydru? So zápisníkom?', fr: 'Et tu as vu une loutre ici ? Avec un carnet ? (tutoiement)' },
        { sk: 'A nevideli ste tu jednu vydru? So zápisníkom?', fr: 'Et vous n\'auriez pas vu une loutre ici ? Avec un carnet ? (vouvoiement)' },
        { sk: 'Hej, orol! Videl si vydru?', fr: 'Hé, l\'aigle ! Tu as vu une loutre ? (tutoiement)' },
      ]);
      if (i === 1) { await say(g, 'fox', 'A nevideli ste tu jednu vydru? So zápisníkom?', 'Et vous n\'auriez pas vu une loutre ici ? Avec un carnet ?', [['videli ste', 'vous avez vu']]); g.learn('videli ste', 'vous avez vu'); break; }
      await say(g, 'fox', i === 0 ? 'A videl si tu jednu vydru? So zápisníkom?' : 'Hej, orol! Videl si vydru?', i === 0 ? 'Et tu as vu une loutre ici ? Avec un carnet ?' : 'Hé, l\'aigle ! Tu as vu une loutre ?');
      g.pose('orol', 'down');
      await say(g, 'orol', 'Hm. Ja som pán Orol. Nie „ty“.', 'Hm. Je suis pán Orol. Pas « ty ».');
      g.pose('orol', null);
      await say(g, 'andrea', 'Gab! Vykáme mu. „Videli ste…“', 'Gab ! On le vouvoie. « Videli ste… »');
    }
    g.pose('orol', 'smile');
    await say(g, 'orol', 'Doktorku Vydrovú? Bola tu včera. Merala potok. Nechala tu niečo. Pre toho, kto nájde jej zápisník.', 'La docteure Vydrová ? Elle était là hier. Elle mesurait le ruisseau. Elle a laissé quelque chose. Pour celui qui trouvera son carnet.', [['včera', 'hier'], ['merala', 'elle mesurait']]);
    g.pose('orol', 'paper');
    await say(g, 'narrator', 'Pán Orol im podá papier. Je to strana zo zápisníka.', 'Pán Orol leur tend un papier. C\'est une page du carnet.', [['strana', 'la page']]);
    g.addPage('p2'); g.addClue('tatry');
    g.pose('orol', null);
    await say(g, 'fox', '„Pre nálezcu. Ďakujem! Idem merať do Tatier, k Téryho chate. Dr. V.“', '« Pour celui qui trouvera ce carnet. Merci ! Je vais mesurer dans les Tatras, au refuge Téry. Dr V. »');
    g.pose('orol', 'think');
    await say(g, 'orol', 'Ešte niečo. Včera sa na ňu pýtal jeden pán v obleku. Veľmi sa usmieval.', 'Encore une chose. Hier, un monsieur en costume a demandé après elle. Il souriait beaucoup.', [['oblek', 'le costume']]);
    g.pose('orol', null);
    await say(g, 'andrea', 'Zase on!', 'Encore lui !');
    g.pose('orol', 'no');
    await say(g, 'orol', 'Orly nemajú radi také úsmevy. Nič som mu nepovedal.', 'Les aigles n\'aiment pas ces sourires-là. Je ne lui ai rien dit.');
    g.pose('orol', null);
    await say(g, 'fox', 'Ďakujeme. Pôjdeme do Tatier.', 'Merci. Nous irons dans les Tatras.');
    g.pose('orol', 'pointup');
    await say(g, 'orol', 'Opatrne. A vezmite si bundu.', 'Soyez prudents. Et prenez une veste.', [['bunda', 'la veste']]);
    g.pose('orol', null);
    await say(g, 'fox', 'Bundu? V lete?', 'Une veste ? En été ?');
    g.pose('orol', 'smile');
    await say(g, 'orol', 'V horách je iné leto.', 'Dans les montagnes, l\'été est différent.');
    g.pose('orol', null);
    g.setFlag('orol_done');
    await g.sleep(700);
    g.goScene('bivouac');
  }

  // une erreur de plus : apres deux, Andrea traduit la consigne
  const rokErr = async (g, word, fr) => {
    const n = (g.flagv('rk_err') || 0) + 1; g.setFlag('rk_err', n);
    if (n >= 2 && n % 2 === 0) { g.pose('andrea', 'point'); await say(g, 'andrea', 'Počúvaj! ' + word, 'Écoute bien ! ' + fr); g.pose('andrea', null); }
  };

  // le monsieur au sourire : la rencontre, avec la bonne negation (« Nič sme nenašli »)
  async function meeting(g) {
    if (g.flag('met_pan')) return;
    g.setFlag('met_pan');
    g.camTo(1600); g.spawn('pan', 1900, 645); g.face('pan', -1);
    await g.walk('pan', 1480, 655); g.camTo(null);
    await say(g, 'pan', 'Dobrý deň. Nenašli ste modrý zápisník? Je môj.', 'Bonjour. Vous n\'auriez pas trouvé un carnet bleu ? C\'est le mien.');
    await say(g, 'zahradnik', 'Váš? Myslel som, že patrí pani doktorke.', 'Le vôtre ? Je croyais qu\'il était à madame la docteure.');
    await say(g, 'pan', 'Mojej kolegyni. To je to isté. Tak čo? Nenašli ste ho?', 'À ma collègue. C\'est pareil. Alors ? Vous ne l\'avez pas trouvé ?');
    for (;;) {
      const i = await g.choice([
        { sk: 'Nie. Nič sme nenašli.', fr: 'Non. Nous n\'avons rien trouvé.' },
        { sk: 'Áno. Našli sme zápisník.', fr: 'Oui. Nous avons trouvé le carnet.' },
        { sk: 'Nie. Našli sme nič.', fr: 'Non. Nous avons trouvé rien. (mal dit)' },
      ]);
      if (i === 0) break;
      if (i === 1) {
        await say(g, 'pan', 'Aha? Tak mi ho dajte.', 'Ah oui ? Alors donnez-le-moi.');
        await say(g, 'narrator', 'Andrea šliapne Gabovi na nohu. Skús to ešte raz.', 'Andrea marche sur le pied de Gab. Réessaie.');
      } else {
        await say(g, 'pan', 'Prosím? Nerozumiem. Čo ste našli?', 'Pardon ? Je ne comprends pas. Qu\'avez-vous trouvé ?');
      }
    }
    await say(g, 'andrea', 'Nič sme nenašli. Dovidenia.', 'Nous n\'avons rien trouvé. Au revoir.', [['nič', 'rien'], ['nenašli', '(ils) n\'ont pas trouvé']]);
    await say(g, 'pan', 'Škoda. Pekný deň, deti.', 'Dommage. Bonne journée, les enfants.');
    await g.walk('pan', 1900, 645);
    g.hide('pan'); g.hide('auto');
    await say(g, 'narrator', 'Auto odchádza.', 'La voiture s\'en va.');
    await say(g, 'andrea', 'Ten pán sa veľa usmieva. To sa mi nepáči.', 'Ce monsieur sourit beaucoup. Ça ne me plaît pas.');
    await say(g, 'fox', 'Prečo?', 'Pourquoi ?');
    await say(g, 'andrea', 'Lebo.', 'Parce que.', [['lebo', 'parce que']]);
    g.addClue('pan'); g.setFlag('met_pan_done');
  }
})();
