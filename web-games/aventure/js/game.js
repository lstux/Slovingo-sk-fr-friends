// Zajko Quest : intro + chapitres 1 et 2 (decors provisoires, sauf le tram). Conception : docs/Jeu-conception.md.
// Textes slovaques et francais : premiere ecriture, a relire. Charge apres tram.js (on y reprend la scene du tram).
(function () {
  const FLOOR = [[20, 590], [1260, 590], [1280, 712], [0, 712]];
  const SCALE = { y0: 590, s0: 0.86, y1: 712, s1: 1.08 };
  const fox = (x) => ({ id: 'fox', img: 'art/fox.png', x, y: 662, h: 440, speed: 320, walkSheet: { img: 'art/fox_walk.png', frames: 4, fps: 7, h: 410 } });
  const andrea = (x, face) => ({ id: 'andrea', img: 'art/andrea.png', x, y: 662, h: 445, face: face || 1, speed: 300, walkSheet: { img: 'art/andrea_walk.png', frames: 4, fps: 7, h: 425 } });
  const box = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];
  const say = (g, who, sk, fr, words) => g.say(who, sk, fr, words);
  // essai du grand tram (decor 3:1 qui defile) : jeu.html?large=1
  const LARGE = /[?&]large=1/.test(globalThis.location ? globalThis.location.search : '');
  const REV_WIDE = { from: [1900, 662], to: [1300, 662] };   // le controleur entre par la droite et s'arrete pres du composteur

  // ------------------------------------------------------------------ chapitres (la carte du voyage)
  const chapters = [
    { id: 'ch0', num: 'Úvod', title: { sk: 'Stanica', fr: 'La gare' }, place: { sk: 'Košice', fr: 'Košice' }, lon: 21.26, lat: 48.72 },
    { id: 'ch1', num: 1, title: { sk: 'Košice', fr: 'Košice' }, lon: 21.26, lat: 48.72, label: false },
    { id: 'ch2', num: 2, title: { sk: 'Sucho', fr: 'La sécheresse' }, lon: 21.26, lat: 48.72, label: false },
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
      p2: { title: { sk: 'Slovenský raj', fr: 'Paradis slovaque' }, sk: '(strana ešte chýba)', fr: '(page à trouver)' },
      p3: { title: { sk: 'Vysoké Tatry', fr: 'Hautes Tatras' }, sk: '(strana ešte chýba)', fr: '(page à trouver)' },
      p4: { title: { sk: 'Liptov', fr: 'Liptov' }, sk: '(strana ešte chýba)', fr: '(page à trouver)' },
      p5: { title: { sk: 'Dátové centrum', fr: 'Centre de données' }, sk: '(strana ešte chýba)', fr: '(page à trouver)' },
      p6: { title: { sk: 'Tajchy', fr: 'Les étangs de Štiavnica' }, sk: '(strana ešte chýba)', fr: '(page à trouver)' },
    },
    clues: {
      kacka: { sk: 'Vydra s žltými čižmami merala vodu v jazierku.', fr: 'Une loutre en bottes jaunes mesurait l\'eau de l\'étang.' },
      fontana: { sk: 'Zápisník patrí doktorke Vydrovej. Odišla na západ.', fr: 'Le carnet est à la docteure Vydrová. Elle est partie vers l\'ouest.' },
      pan: { sk: 'Pán v čiernom aute hľadá zápisník. Veľa sa usmieva.', fr: 'Le monsieur à la voiture noire cherche le carnet. Il sourit beaucoup.' },
    },
  };

  // ------------------------------------------------------------------ la scene du tram : on reprend celle de l'apercu
  const T = ZA_DATA.scenes.tram;
  const tram = Object.assign({}, T, {
    chapter: 'ch1',
    title: { sk: 'V električke', fr: 'Dans le tram' },
    hotspots: T.hotspots.map((h) => {
      if (h.id === 'door') {
        return Object.assign({}, h, {
          async onUse(g) {
            if (!g.flag('checked')) { await say(g, 'fox', 'Ešte nie. Električka ide.', 'Pas encore. Le tram roule.', [['dvere', 'les portes']]); return; }
            await say(g, 'fox', 'Vystupujeme!', 'On descend !');
            g.goScene('rue');
          },
        });
      }
      if (h.id === 'windows2') {
        return Object.assign({}, h, { look: { sk: 'Pozri, katedrála! Svätá Alžbeta.', fr: 'Regarde, la cathédrale ! Sainte-Élisabeth.', words: [['katedrála', 'la cathédrale']] } });
      }
      return h;
    }),
    hints: [
      { id: 'tram_ticket', when: (g) => !g.flag('stamped'), levels: [
        { sk: 'Máš lístok? Nezabudni ho označiť.', fr: 'Tu as ton ticket ? N\'oublie pas de le valider.' },
        { sk: 'Označovač je pri dverách.', fr: 'Le composteur est près des portes.', words: [['pri dverách', 'près des portes']] },
        { sk: 'Vyber lístok a klikni na označovač.', fr: 'Prends ton ticket et clique sur le composteur.' } ] },
      { id: 'tram_check', when: (g) => !g.flag('checked'), levels: [
        { sk: 'Revízor sa pýta na lístok. Odpovedz slušne.', fr: 'Le contrôleur demande ton ticket. Réponds poliment.' },
        { sk: 'Povedz: „Tu je môj lístok.“', fr: 'Dis : « Voici mon ticket. »' },
        { sk: 'Klikni na druhú vetu.', fr: 'Clique sur la deuxième phrase.' } ] },
      { id: 'tram_out', levels: [
        { sk: 'Vystupujeme. Choď k dverám.', fr: 'On descend. Va vers les portes.' },
        { sk: 'Klikni na dvere.', fr: 'Clique sur les portes.' } ] },
    ],
    async onEnter(g) {
      if (!g.flag('met')) {
        g.setFlag('met');
        g.setHelper('andrea', 3);
        await say(g, 'narrator', 'Električka ide cez Košice. Je popoludnie.', 'Le tram traverse Košice. C\'est l\'après-midi.', [['električka', 'le tram']]);
        await say(g, 'narrator', 'Oproti sedí zajačica a číta knihu.', 'En face, une hase est assise et lit un livre.', [['zajačica', 'la hase'], ['kniha', 'le livre']]);
        await say(g, 'fox', 'Počkaj… Andrea? To si ty?', 'Attends… Andrea ? C\'est toi ?');
        for (;;) {
          const i = await g.choice([{ sk: 'Ahoj, Andrea!', fr: 'Salut, Andrea !' }, { sk: 'Dobrý deň, pani.', fr: 'Bonjour, madame.' }]);
          if (i === 0) break;
          await say(g, 'andrea', 'Pani? Gab, to som ja!', 'Madame ? Gab, c\'est moi !');
          await say(g, 'andrea', 'Kamarátke sa predsa hovorí „ahoj“.', 'À une amie, on dit « ahoj », voyons.', [['kamarátka', 'l\'amie']]);
        }
        await say(g, 'andrea', 'Gab? Naozaj ty?', 'Gab ? C\'est vraiment toi ?');
        await say(g, 'andrea', 'Nezabudni označiť lístok. Revízor tu býva často.', 'N\'oublie pas de valider ton ticket. Le contrôleur est souvent là.',
          [['označiť lístok', 'valider un ticket'], ['revízor', 'le contrôleur']]);
      }
      if (!g.flag('stamped')) g.after(50000, async (g2) => { if (!g2.flag('stamped')) await fine(g2, LARGE ? REV_WIDE : undefined); });
    },
  });

  // ------------------------------------------------------------------ le grand tram (essai : decor 3:1 qui defile avec la camera)
  // Active par jeu.html?large=1. Meme histoire que le tram ci-dessus, autre decor (art/tram_wide.webp, 2160 x 720) et autres zones.
  // Les coordonnees sont celles du decor entier (0..2160) ; la camera suit le renard.
  const WW = 2160;
  const byId = {}; for (const h of tram.hotspots) byId[h.id] = h;
  const tramWide = Object.assign({}, tram, {
    bg: 'art/tram_wide.webp',
    worldW: WW,
    floor: [[0, 590], [WW, 590], [WW, 712], [0, 712]],
    layers: [],   // les vitres du decor montrent deja Kosice (plus tard : la ville qui defile derriere)
    sprites: [fox(430), andrea(1560, -1)],
    extraSprites: { revizor: { img: 'art/revizor.png', x: 1900, y: 662, h: 470, walkSheet: { img: 'art/revizor_walk.png', frames: 4, fps: 7, h: 470 }, hidden: true, speed: 240 } },
    hotspots: [
      Object.assign({}, byId.door, { poly: box(245, 170, 465, 555), walk: [355, 650] }),
      { id: 'door2', name: { sk: 'dvere', fr: 'les portes' }, poly: box(1175, 170, 1395, 555), walk: [1285, 650],
        look: { sk: 'Tieto dvere sa neotvoria. Vystupuje sa vpredu.', fr: 'Ces portes ne s\'ouvrent pas. On descend à l\'avant.', words: [['dvere', 'les portes']] } },
      Object.assign({}, byId.validator, { poly: box(1052, 282, 1108, 372), walk: [1080, 650] }),
      { id: 'cabin', name: { sk: 'kabína', fr: 'la cabine' }, poly: box(0, 70, 170, 590), walk: [200, 650],
        look: { who: 'narrator', sk: 'Kabína vodiča. Vodič nás vezie cez mesto.', fr: 'La cabine du conducteur. Il nous conduit à travers la ville.', words: [['vodič', 'le conducteur']] } },
      { id: 'win_cathedral', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(770, 170, 1018, 398), walk: [900, 650],
        look: { sk: 'Pozri, katedrála! Svätá Alžbeta.', fr: 'Regarde, la cathédrale ! Sainte-Élisabeth.', words: [['katedrála', 'la cathédrale']] } },
      { id: 'win_left', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(505, 170, 752, 398), walk: [630, 650],
        look: { sk: 'Košice sú super!', fr: 'Košice, c\'est super !', words: [['okno', 'la fenêtre']] } },
      { id: 'win_right', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(1425, 170, 2020, 398), walk: [1700, 650],
        look: { sk: 'Pozri, mesto ide okolo!', fr: 'Regarde, la ville défile !' } },
      { id: 'seats', name: { sk: 'sedadlá', fr: 'les sièges' }, poly: box(1445, 360, 1650, 575), walk: [1550, 662],
        look: { who: 'narrator', sk: 'Prázdne sedadlá. Je popoludnie, nikto necestuje.', fr: 'Des sièges vides. C\'est l\'après-midi, personne ne voyage.', words: [['sedadlo', 'le siège']] } },
      Object.assign({}, byId.andrea, { walk: [1440, 665] }),
    ],
    async onEnter(g) {
      await tram.onEnter(g);
    },
  });
  // le valideur appelle inspect() : dans le grand tram, le controleur entre par la droite et s'arrete pres du composteur
  const stampWide = tramWide.hotspots.find((h) => h.id === 'validator');
  stampWide.onItem = {
    async listok(g) {
      g.take('listok'); g.give('listok_ok'); g.setFlag('stamped');
      await say(g, 'narrator', 'Cink! Lístok je označený.', 'Clac ! Le ticket est validé.', [['označený', 'validé']]);
      await inspect(g, REV_WIDE);
    },
  };
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
    saveKey: 'zajko-quest-web-v1',
    start: 'uvod',
    chapters,
    notebook,
    helpers: {
      andrea: { who: 'andrea', icon: '🐰', title: 'Andrea', empty: { sk: 'Teraz si musíš poradiť sám, Gab.', fr: 'Là, il faut te débrouiller tout seul, Gab.' } },
      katka: { who: 'katka', icon: '📱', title: 'Katka', empty: { sk: 'Batéria je na nule…', fr: 'La batterie est à zéro…' }, dead: { sk: 'Telefón je vybitý.', fr: 'Le téléphone est déchargé.' } },
    },
    characters: Object.assign({}, ZA_DATA.characters, {
      automat: { name: 'Automat', icon: '🎟️', color: '#4a6ac0' },
      teta: { name: 'Teta', icon: '🐇', color: '#c47a7a' },
      kacka: { name: 'Kačka', icon: '🦆', color: '#d8b43a' },
      zahradnik: { name: 'Záhradník', icon: '🧑‍🌾', color: '#5a9a4a' },
      pan: { name: 'Pán v obleku', icon: '🕴️', color: '#555a66' },
      pokladnicka: { name: 'Pokladníčka', icon: '🧑‍💼', color: '#b06ab0' },
    }),
    items: Object.assign({}, ZA_DATA.items, {
      kluc: { sk: 'kľúč', fr: 'clé', emoji: '🔑' },
      deka: { sk: 'deka', fr: 'couverture', emoji: '🛏️' },
      flasa: { sk: 'fľaša', fr: 'gourde', emoji: '💧' },
      rebrik: { sk: 'rebrík', fr: 'échelle', emoji: '🪜' },
      zapisnik: { sk: 'zápisník', fr: 'carnet', emoji: '📘' },
      pero: { sk: 'pero', fr: 'stylo', emoji: '🖊️' },
      papier: { sk: 'papier', fr: 'papier', emoji: '📄' },
      mot: { sk: 'lístok (odkaz)', fr: 'petit mot', emoji: '📝' },
      listky_vlak: { sk: 'lístky na vlak', fr: 'billets de train', emoji: '🎫' },
    }),
    // deux objets de l'inventaire qui vont ensemble
    combos: [
      { a: 'pero', b: 'papier', async run(g) {
        g.take('pero'); g.take('papier'); g.give('mot');
        await say(g, 'andrea', 'Píšem: „Teta, odišla som na pár dní. Neboj sa. Andrea.“', 'J\'écris : « Ma tante, je suis partie pour quelques jours. Ne t\'inquiète pas. Andrea. »', [['odkaz', 'le message']]);
        await say(g, 'andrea', 'Pozor: „lístok“ je aj odkaz, aj lístok na vlak.', 'Attention : « lístok », c\'est à la fois un petit mot et un billet de train.');
      } },
    ],
    scenes: {
      uvod,
      // =============================================================== INTRO : la gare de Kosice
      gare: {
        chapter: 'ch0', title: { sk: 'Stanica', fr: 'La gare' }, tint: ['#2f3d5a', '#9aa8bf'],
        player: 'fox', floor: FLOOR, scale: SCALE, sprites: [fox(300)],
        hotspots: [
          { id: 'plagat', name: { sk: 'plagát', fr: 'l\'affiche' }, poly: box(100, 150, 300, 420), walk: [200, 650],
            look: { sk: 'Plagát: Košice, mesto kultúry.', fr: 'Affiche : Košice, ville de culture.', words: [['plagát', 'l\'affiche'], ['mesto', 'la ville']] } },
          { id: 'tabula', name: { sk: 'tabuľa', fr: 'le panneau' }, poly: box(420, 60, 760, 200), walk: [590, 650],
            look: { who: 'narrator', sk: 'Príchody: vlak z Lyonu. Meškanie: žiadne.', fr: 'Arrivées : train de Lyon. Retard : aucun.', words: [['príchody', 'les arrivées']] } },
          { id: 'napis', name: { sk: 'nápis', fr: 'l\'écriteau' }, poly: box(880, 150, 1100, 290), walk: [990, 650],
            look: { who: 'narrator', sk: 'Lístok na električku. Jeden lístok: 1,20 €.', fr: 'Ticket de tram. Un ticket : 1,20 €.', words: [['lístok', 'le ticket'], ['električka', 'le tram'], ['jeden', 'un']] } },
          { id: 'automat', name: { sk: 'automat', fr: 'le distributeur' }, poly: box(880, 300, 1100, 560), walk: [990, 650],
            async onUse(g) {
              if (g.has('listok') || g.has('listok_ok')) { await say(g, 'fox', 'Už mám lístok.', 'J\'ai déjà mon ticket.'); return; }
              if (!g.knows('lístok')) {
                await say(g, 'fox', 'Čo mám stlačiť?', 'Sur quoi je dois appuyer ?');
                await say(g, 'narrator', 'Najprv si prečítaj nápis nad automatom.', 'Lis d\'abord l\'écriteau au-dessus du distributeur.', [['nápis', 'l\'écriteau']]);
                return;
              }
              await say(g, 'automat', 'Dobrý deň. Čo si želáte?', 'Bonjour. Que désirez-vous ?');
              for (;;) {
                const i = await g.choice([
                  { sk: 'Jeden lístok, prosím.', fr: 'Un ticket, s\'il vous plaît.' },
                  { sk: 'Jedna lístok, prosím.', fr: 'Un ticket… (mal accordé)' },
                  { sk: 'Dobrú noc, automat.', fr: 'Bonne nuit, distributeur.' },
                ]);
                if (i === 0) break;
                await say(g, 'automat', i === 1 ? 'Pííp! Chyba. „Lístok“ je mužský rod: jeden.' : 'Pííp! Automat nerozumie. Skús to znova.', i === 1 ? 'Bip ! Erreur. « Lístok » est masculin : jeden.' : 'Bip ! Le distributeur ne comprend pas. Réessaie.');
              }
              g.give('listok'); g.setFlag('ticket');
              await say(g, 'narrator', 'Cink! Lístok vypadol z automatu.', 'Clac ! Le ticket sort du distributeur.', [['prosím', 's\'il vous plaît']]);
            } },
          { id: 'vychod', name: { sk: 'východ', fr: 'la sortie' }, poly: box(0, 100, 90, 560), walk: [160, 650],
            async onUse(g) {
              if (!g.has('listok') && !g.has('listok_ok')) { await say(g, 'fox', 'Najprv lístok.', 'D\'abord un ticket.'); return; }
              await say(g, 'fox', 'Ideme na električku.', 'Direction le tram.');
              await g.showMap('ch1');
              g.goScene('tram');
            } },
        ],
        async onEnter(g) {
          if (g.flag('intro0')) return;
          g.setFlag('intro0'); g.noHelper();
          await say(g, 'narrator', 'Železničná stanica v Košiciach. Gab práve prišiel z Lyonu.', 'La gare de Košice. Gab vient d\'arriver de Lyon.', [['stanica', 'la gare']]);
          await say(g, 'narrator', 'Klikni na zem a Gab pôjde. Pozri sa na veci okolo.', 'Clique sur le sol pour marcher. Regarde les choses autour de toi.');
        },
      },

      // =============================================================== CHAPITRE 1 : le tram
      tram: LARGE ? tramWide : tram,

      // la rue, devant l'arret : le test des ages et la cle sous le pot
      rue: {
        chapter: 'ch1', title: { sk: 'Pred domom', fr: 'Devant la maison' }, tint: ['#b7a07a', '#d9c9a2'],
        player: 'fox', floor: FLOOR, scale: SCALE, sprites: [fox(260), andrea(560, -1)],
        hotspots: [
          { id: 'dom', name: { sk: 'dom', fr: 'la maison' }, poly: box(560, 60, 1000, 420), walk: [800, 650],
            look: { sk: 'Dom Andreinej tety. Hlavné dvere sú zavreté.', fr: 'La maison de la tante d\'Andrea. La porte d\'entrée est fermée.', words: [['dom', 'la maison']] } },
          { id: 'cerveny', name: { sk: 'červený kvetináč', fr: 'le pot rouge' }, poly: box(640, 470, 720, 560), walk: [680, 650],
            async onUse(g) { await say(g, 'narrator', 'Pod červeným kvetináčom je slimák.', 'Sous le pot rouge, il y a un escargot.', [['červený', 'rouge'], ['slimák', 'l\'escargot']]); } },
          { id: 'zlty', name: { sk: 'žltý kvetináč', fr: 'le pot jaune' }, poly: box(760, 470, 840, 560), walk: [800, 650],
            async onUse(g) { await say(g, 'narrator', 'Pod žltým kvetináčom spí mačka. Mňau!', 'Sous le pot jaune, un chat dort. Miaou !', [['žltý', 'jaune'], ['mačka', 'le chat']]); } },
          { id: 'modry', name: { sk: 'modrý kvetináč', fr: 'le pot bleu' }, poly: box(880, 470, 960, 560), walk: [920, 650],
            async onUse(g) {
              if (g.has('kluc') || g.flag('gate')) { await say(g, 'fox', 'Tu už nič nie je.', 'Il n\'y a plus rien ici.'); return; }
              g.give('kluc'); g.setFlag('keyfound');
              await say(g, 'narrator', 'Kľúč! Bol pod modrým kvetináčom.', 'La clé ! Elle était sous le pot bleu.', [['modrý', 'bleu']]);
            } },
          { id: 'branka', name: { sk: 'bránka', fr: 'le portillon' }, poly: box(1100, 250, 1250, 560), walk: [1090, 650],
            async onUse(g) {
              if (!g.has('kluc')) { await say(g, 'fox', 'Bránka je zamknutá.', 'Le portillon est fermé à clé.', [['zamknutá', 'fermé à clé']]); return; }
              await say(g, 'narrator', 'Cvak! Bránka sa otvára.', 'Clac ! Le portillon s\'ouvre.');
              g.take('kluc'); g.setFlag('gate');
              g.goScene('zahrada');
            } },
          { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [480, 665],
            topics: [
              { need: 'kľúč', sk: 'Kde je kľúč?', fr: 'Où est la clé ?', async run(g) { await say(g, 'andrea', 'Pod modrým kvetináčom. Pod!', 'Sous le pot bleu. Sous !'); } },
              { need: 'teta', sk: 'Čo je s tetou?', fr: 'Qu\'est-ce qu\'elle a, ta tante ?', async run(g) { await say(g, 'andrea', 'Je milá. Ale veľká a silná. Radšej ju nebudíme.', 'Elle est gentille. Mais grande et forte. Mieux vaut ne pas la réveiller.', [['silná', 'forte']]); } },
              { need: 'trinásť', sk: 'Katka má trinásť rokov?', fr: 'Katka a treize ans ?', async run(g) { await say(g, 'andrea', 'Áno. A Maťo má štrnásť.', 'Oui. Et Maťo en a quatorze.'); } },
            ] },
        ],
        hints: [
          { id: 'rue_key', when: (g) => !g.has('kluc') && !g.flag('gate'), levels: [
            { sk: 'Andrea ti povedala, kde je kľúč.', fr: 'Andrea t\'a dit où est la clé.' },
            { sk: 'Pod modrým kvetináčom. Pozri sa na kvetináče.', fr: 'Sous le pot bleu. Regarde les pots de fleurs.' },
            { sk: 'Klikni na modrý kvetináč.', fr: 'Clique sur le pot bleu.' } ] },
          { id: 'rue_gate', when: (g) => g.has('kluc'), levels: [
            { sk: 'Máš kľúč. Čo otvára?', fr: 'Tu as la clé. Qu\'est-ce qu\'elle ouvre ?' },
            { sk: 'Klikni na bránku.', fr: 'Clique sur le portillon.' } ] },
        ],
        async onEnter(g) {
          if (g.flag('quiz')) return;
          g.setFlag('quiz');
          await say(g, 'narrator', 'Pred domom Andreinej tety. Je podvečer.', 'Devant la maison de la tante d\'Andrea. C\'est la fin d\'après-midi.', [['podvečer', 'en fin de journée']]);
          await say(g, 'andrea', 'Tu býva moja teta. Pst! Nesmie ťa vidieť.', 'C\'est ici qu\'habite ma tante. Chut ! Elle ne doit pas te voir.', [['teta', 'la tante'], ['nesmie', 'elle ne doit pas']]);
          await say(g, 'andrea', 'Ale najprv jeden test. Si naozaj Gab?', 'Mais d\'abord un petit test. Tu es vraiment Gab ?');
          await say(g, 'andrea', 'Mám šestnásť rokov. Koľko rokov máš ty?', 'J\'ai seize ans. Et toi, tu as quel âge ?', [['šestnásť', 'seize'], ['rok', 'l\'an']]);
          for (;;) {
            const i = await g.choice([{ sk: 'Mám desať rokov.', fr: 'J\'ai dix ans.' }, { sk: 'Mám pätnásť rokov.', fr: 'J\'ai quinze ans.' }, { sk: 'Mám päť rokov.', fr: 'J\'ai cinq ans.' }]);
            if (i === 1) break;
            await say(g, 'andrea', i === 0 ? 'Desať? To si mal pred piatimi rokmi!' : 'Päť? Ty si bábätko?', i === 0 ? 'Dix ? Tu les avais il y a cinq ans !' : 'Cinq ? T\'es un bébé ?');
          }
          await say(g, 'andrea', 'Pätnásť. Dobre. A Katka? Mala osem. Koľko má teraz?', 'Quinze. Bien. Et Katka ? Elle avait huit ans. Elle a quel âge maintenant ?', [['pätnásť', 'quinze'], ['osem', 'huit']]);
          for (;;) {
            const i = await g.choice([{ sk: 'Katka má osem rokov.', fr: 'Katka a huit ans.' }, { sk: 'Katka má trinásť rokov.', fr: 'Katka a treize ans.' }, { sk: 'Katka má sedemnásť rokov.', fr: 'Katka a dix-sept ans.' }]);
            if (i === 1) break;
            await say(g, 'andrea', i === 0 ? 'Osem? To bolo pred piatimi rokmi!' : 'Sedemnásť? To je veľa!', i === 0 ? 'Huit ? C\'était il y a cinq ans !' : 'Dix-sept ? C\'est beaucoup !');
          }
          await say(g, 'andrea', 'Trinásť. A Maťo má štrnásť.', 'Treize. Et Maťo en a quatorze.', [['trinásť', 'treize'], ['štrnásť', 'quatorze']]);
          await say(g, 'andrea', 'Dobre. Si to ty. Pozri: kľúč od bránky je pod modrým kvetináčom.', 'Bien. C\'est bien toi. Regarde : la clé du portillon est sous le pot bleu.',
            [['kľúč', 'la clé'], ['bránka', 'le portillon'], ['pod', 'sous'], ['kvetináč', 'le pot de fleurs'], ['modrý', 'bleu']]);
        },
      },

      // le jardin le soir : lampe, couverture, pommier
      zahrada: {
        chapter: 'ch1', title: { sk: 'Záhrada', fr: 'Le jardin' }, tint: ['#223049', '#4d6a55'],
        player: 'fox', floor: FLOOR, scale: SCALE, sprites: [fox(260), andrea(480, 1)],
        dim: (g) => (g.flag('lampoff') ? 0.38 : 0.04),
        hotspots: [
          { id: 'snura', name: { sk: 'šnúra', fr: 'la corde à linge' }, poly: box(20, 130, 440, 330), walk: [230, 650],
            async onUse(g) {
              if (g.flag('deka')) { await say(g, 'fox', 'Už tu nič nie je.', 'Il n\'y a plus rien ici.'); return; }
              g.give('deka'); g.setFlag('deka');
              await say(g, 'narrator', 'Na šnúre visí stará deka. Gab si ju berie.', 'Une vieille couverture pend à la corde. Gab la prend.', [['deka', 'la couverture']]);
            } },
          { id: 'jablon', name: { sk: 'jabloň', fr: 'le pommier' }, poly: box(480, 90, 800, 540), walk: [640, 650],
            async onUse(g) {
              if (!g.flag('deka')) { await say(g, 'fox', 'Bez deky? Bude mi zima.', 'Sans couverture ? J\'aurai froid.'); return; }
              if (!g.flag('lampoff')) {
                await say(g, 'narrator', 'Lampa osvetľuje celú záhradu. V tetinom okne sa pohne záclona.', 'La lampe éclaire tout le jardin. Au fenêtre de la tante, un rideau bouge.', [['záclona', 'le rideau']]);
                await say(g, 'teta', 'Kto je v mojej záhrade?!', 'Qui est dans mon jardin ?!');
                await say(g, 'andrea', 'Ach nie! Rýchlo, preč! A vypni tú lampu!', 'Oh non ! Vite, filons ! Et éteins cette lampe !', [['vypnúť', 'éteindre']]);
                g.restart();
                return;
              }
              await say(g, 'andrea', 'Dobrú noc, Gab.', 'Bonne nuit, Gab.');
              for (;;) {
                const i = await g.choice([{ sk: 'Dobrú noc, Andrea.', fr: 'Bonne nuit, Andrea.' }, { sk: 'Dobré ráno, Andrea.', fr: 'Bonjour, Andrea.' }]);
                if (i === 0) break;
                await say(g, 'andrea', 'Ráno? Veď je noc!', 'Le matin ? Mais c\'est la nuit !');
              }
              await say(g, 'narrator', 'Gab leží pod jabloňou a pozerá na hviezdy. Čoskoro zaspí.', 'Gab est allongé sous le pommier et regarde les étoiles. Il va bientôt s\'endormir.', [['jabloň', 'le pommier'], ['hviezdy', 'les étoiles']]);
              await g.showMap('ch2');
              g.goScene('rano');
            } },
          { id: 'okno', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(880, 60, 1080, 240), walk: [980, 650],
            look: { sk: 'V tetinom okne sa svieti. Teta ešte nespí.', fr: 'La fenêtre de la tante est éclairée. Elle ne dort pas encore.', words: [['okno', 'la fenêtre'], ['svieti', 'ça brille, c\'est allumé']] } },
          { id: 'lampa', name: { sk: 'lampa', fr: 'la lampe' }, poly: box(860, 260, 940, 460), walk: [900, 650],
            look: { sk: 'Lampa svieti veľmi silno. Gab je na nej vidno.', fr: 'La lampe brille très fort. On voit Gab de loin.', words: [['lampa', 'la lampe']] } },
          { id: 'vypinac', name: { sk: 'vypínač', fr: 'l\'interrupteur' }, poly: box(1140, 300, 1230, 400), walk: [1170, 650],
            async onUse(g) {
              if (g.flag('lampoff')) { await say(g, 'fox', 'Už je tma.', 'Il fait déjà noir.'); return; }
              g.setFlag('lampoff');
              await say(g, 'narrator', 'Cvak! Lampa zhasla.', 'Clac ! La lampe s\'éteint.', [['vypínač', 'l\'interrupteur'], ['zhasnúť', 'éteindre']]);
            } },
        ],
        hints: [
          { id: 'g_lamp', when: (g) => !g.flag('lampoff'), levels: [
            { sk: 'Lampa svieti veľmi silno. Teta nás môže vidieť.', fr: 'La lampe brille fort. Ma tante peut nous voir.' },
            { sk: 'Nájdi vypínač.', fr: 'Cherche l\'interrupteur.', words: [['vypínač', 'l\'interrupteur']] },
            { sk: 'Vypínač je napravo pri múre.', fr: 'L\'interrupteur est à droite, près du mur.' } ] },
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
          await say(g, 'andrea', 'Pssst! Teta ešte nespí. Spi pod jabloňou. Ja idem dnu.', 'Pssst ! Ma tante ne dort pas encore. Dors sous le pommier. Moi, je rentre.');
          g.hide('andrea');
        },
      },

      // =============================================================== CHAPITRE 2 : Sucho
      rano: {
        chapter: 'ch2', title: { sk: 'Ráno v záhrade', fr: 'Le matin dans le jardin' }, tint: ['#e8c57a', '#cdb577'],
        player: 'fox', floor: FLOOR, scale: SCALE, sprites: [fox(400), andrea(700, -1)],
        hotspots: [
          { id: 'jablon', name: { sk: 'jabloň', fr: 'le pommier' }, poly: box(80, 80, 380, 560), walk: [300, 650],
            look: { sk: 'Pod jabloňou som dobre spal.', fr: 'J\'ai bien dormi sous le pommier.' } },
          { id: 'park', name: { sk: 'park', fr: 'le parc' }, poly: box(1100, 250, 1250, 560), walk: [1090, 650],
            async onUse(g) {
              if (!g.has('flasa') && !g.flag('duck')) { await say(g, 'andrea', 'Vezmi si fľašu s vodou.', 'Prends la gourde.'); return; }
              await say(g, 'andrea', 'Ideme do parku. Tam je jazierko.', 'On va au parc. Il y a un petit étang.', [['jazierko', 'le petit étang']]);
              g.goScene('jazierko');
            } },
        ],
        hints: [
          { id: 'r_exit', levels: [
            { sk: 'Ideme do parku. Je to napravo.', fr: 'On va au parc. C\'est à droite.' },
            { sk: 'Klikni na park.', fr: 'Clique sur le parc.' } ] },
        ],
        async onEnter(g) {
          if (g.flag('rano0')) return;
          g.setFlag('rano0');
          g.setHelper('andrea', 3);
          await say(g, 'narrator', 'Ráno. Slnko je už vysoko. Gab spí pod jabloňou.', 'Le matin. Le soleil est déjà haut. Gab dort sous le pommier.');
          await say(g, 'andrea', 'Gab! Vstávaj!', 'Gab ! Debout !');
          await say(g, 'fox', 'Čo… Kde som? Ach áno. V záhrade.', 'Quoi… Où je suis ? Ah oui. Dans le jardin.');
          await say(g, 'andrea', 'Na. Voda. Len trochu. Viac nemám.', 'Tiens. De l\'eau. Juste un peu. Je n\'en ai pas plus.', [['voda', 'l\'eau']]);
          g.give('flasa');
          await say(g, 'andrea', 'Je horúco a sucho. Dva mesiace nepršalo.', 'Il fait chaud et sec. Il n\'a pas plu depuis deux mois.', [['sucho', 'la sécheresse'], ['nepršalo', 'il n\'a pas plu']]);
          await say(g, 'fox', 'Dva mesiace? A kde pijete?', 'Deux mois ? Et vous buvez où ?');
          await say(g, 'andrea', 'V parku je jazierko. Gab, ty veľmi hovoríš.', 'Il y a un étang au parc. Gab, tu parles beaucoup.');
          for (;;) {
            const i = await g.choice([{ sk: 'Hovorím veľmi.', fr: 'Je parle « très ».' }, { sk: 'Hovorím veľa.', fr: 'Je parle beaucoup.' }, { sk: 'Hovorím veľký.', fr: 'Je parle « grand ».' }]);
            if (i === 1) break;
            await say(g, 'andrea', i === 0 ? 'Veľmi je „très“: veľmi milý. „Beaucoup“ je veľa.' : 'Veľký je „grand“. Skús to znova.', i === 0 ? '« Veľmi », c\'est « très » : très gentil. « Beaucoup », c\'est « veľa ».' : '« Veľký », c\'est « grand ». Réessaie.');
          }
          await say(g, 'andrea', 'Presne. Veľa. A ideme do parku.', 'Exactement. « Veľa ». Et on va au parc.', [['veľa', 'beaucoup (quantité)'], ['veľmi', 'très (qualité)']]);
        },
      },

      jazierko: {
        chapter: 'ch2', title: { sk: 'Jazierko v parku', fr: 'L\'étang du parc' }, tint: ['#7ea36a', '#c9b779'],
        player: 'fox', floor: FLOOR, scale: SCALE,
        sprites: [fox(260), andrea(520, -1), { id: 'kacka', emoji: '🦆', x: 900, y: 640, h: 230, face: -1 }],
        hotspots: [
          { id: 'kacka', sprite: 'kacka', name: { sk: 'kačka', fr: 'le canard' }, walk: [760, 650],
            look: { sk: 'Kačka je smädná. Nemá vodu.', fr: 'Le canard a soif. Il n\'a pas d\'eau.', words: [['kačka', 'le canard'], ['smädný', 'assoiffé']] },
            async onUse(g) {
              if (g.flag('duck')) { await say(g, 'kacka', 'Ďakujem ešte raz!', 'Merci encore une fois !'); return; }
              await say(g, 'fox', 'Kačka je smädná.', 'Le canard a soif.', [['kačka', 'le canard'], ['smädný', 'assoiffé']]);
            },
            onItem: {
              async flasa(g) {
                await say(g, 'fox', 'Pre teba, kačička.', 'Pour toi, petit canard.', [['pre teba', 'pour toi'], ['dať', 'donner']]);
                g.take('flasa'); g.setFlag('duck'); g.addClue('kacka');
                await say(g, 'narrator', 'Kačka pije. Potom prehovorí.', 'Le canard boit. Puis il parle.');
                await say(g, 'kacka', 'Ďakujem! Včera tu bola vydra. Mala žlté čižmy.', 'Merci ! Hier, une loutre est passée. Elle avait des bottes jaunes.', [['vydra', 'la loutre'], ['čižmy', 'les bottes']]);
                await say(g, 'kacka', 'Merala vodu. Potom išla do centra.', 'Elle mesurait l\'eau. Puis elle est allée vers le centre.', [['merať', 'mesurer']]);
                await say(g, 'andrea', 'Vydra, ktorá meria vodu? Ideme do centra.', 'Une loutre qui mesure l\'eau ? On va au centre.');
              },
            } },
          { id: 'jazierko', name: { sk: 'jazierko', fr: 'l\'étang' }, poly: box(420, 560, 900, 640), walk: [660, 650],
            look: { sk: 'Jazierko je skoro suché. Zostalo len blato.', fr: 'L\'étang est presque à sec. Il ne reste que de la boue.', words: [['suchý', 'sec'], ['blato', 'la boue']] } },
          { id: 'zvierata', name: { sk: 'zvieratá', fr: 'les animaux' }, poly: box(40, 330, 330, 560), walk: [250, 650],
            look: { sk: 'Zvieratá mlčia. Nikto nehovorí.', fr: 'Les animaux se taisent. Personne ne parle.', words: [['ticho', 'le silence'], ['mlčať', 'se taire']] } },
          { id: 'centrum', name: { sk: 'centrum', fr: 'le centre' }, poly: box(1100, 250, 1250, 560), walk: [1090, 650],
            async onUse(g) {
              if (!g.flag('duck')) {
                await say(g, 'andrea', 'Môžeme ísť. Ale kačka je smädná…', 'On peut y aller. Mais le canard a soif…');
                const i = await g.choice([{ sk: 'Ideme.', fr: 'On y va.' }, { sk: 'Počkaj, ešte niečo skúsim.', fr: 'Attends, j\'essaie encore quelque chose.' }]);
                if (i === 1) return;
              }
              g.goScene('fontana');
            } },
        ],
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
        player: 'fox', floor: FLOOR, scale: SCALE,
        sprites: [fox(260), andrea(480, 1), { id: 'zahradnik', emoji: '🧑‍🌾', x: 860, y: 650, h: 340, face: -1 }],
        extraSprites: {
          pan: { emoji: '🕴️', x: 1250, y: 650, h: 340, hidden: true, speed: 240 },
          auto: { emoji: '🚗', x: 1210, y: 620, h: 260, hidden: true },
        },
        hotspots: [
          { id: 'fontana', name: { sk: 'fontána', fr: 'la fontaine' }, poly: box(380, 330, 760, 570), walk: [570, 650],
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
              await say(g, 'narrator', 'Čierne auto zastavuje pri fontáne.', 'Une voiture noire s\'arrête près de la fontaine.', [['auto', 'la voiture']]);
              g.spawn('auto', 1210, 620);
              await say(g, 'andrea', 'Rýchlo! Schovaj zápisník!', 'Vite ! Cache le carnet !', [['schovať', 'cacher']]);
              g.after(16000, async (g2) => { if (!g2.flag('hidden') && !g2.flag('met_pan')) { g2.setFlag('hidden_by_andrea'); await say(g2, 'andrea', 'Daj to sem!', 'Donne-moi ça !'); await meeting(g2); } });
            } },
          { id: 'rebrik', name: { sk: 'rebrík', fr: 'l\'échelle' }, poly: box(40, 200, 160, 560), walk: [210, 650],
            look: { sk: 'Rebrík. Patrí záhradníkovi.', fr: 'Une échelle. Elle appartient au jardinier.', words: [['rebrík', 'l\'échelle']] } },
          { id: 'zahradnik', sprite: 'zahradnik', name: { sk: 'záhradník', fr: 'le jardinier' }, walk: [760, 660],
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
          { id: 'stanica', name: { sk: 'stanica', fr: 'la gare' }, poly: box(1100, 250, 1250, 560), walk: [1090, 650],
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
            { sk: 'Povedz záhradníkovi slovo „rebrík“. Najprv si ho pozri pri stene.', fr: 'Dis au jardinier le mot « rebrík ». Regarde-le d\'abord près du mur.' } ] },
          { id: 'f_climb', when: (g) => !g.flag('nb') && g.has('rebrik'), levels: [
            { sk: 'Máš rebrík. Klikni na fontánu.', fr: 'Tu as l\'échelle. Clique sur la fontaine.' } ] },
          { id: 'f_go', levels: [
            { sk: 'Ideme na stanicu. Je to napravo.', fr: 'On va à la gare. C\'est à droite.' } ] },
        ],
      },

      stanica: {
        chapter: 'ch2', title: { sk: 'Stanica v Košiciach', fr: 'La gare de Košice' }, tint: ['#8c93a8', '#cbc3b0'],
        player: 'fox', floor: FLOOR, scale: SCALE,
        sprites: [fox(260), andrea(480, 1), { id: 'pokladnicka', emoji: '🧑‍💼', x: 900, y: 640, h: 330, face: -1 }],
        hotspots: [
          { id: 'rozpis', name: { sk: 'rozpis', fr: 'le tableau des départs' }, poly: box(400, 60, 820, 200), walk: [610, 650],
            async onUse(g) {
              g.setFlag('rozpis');
              await say(g, 'narrator', 'Odchody: 10:42 Spišská Nová Ves · 10:55 Bratislava · 11:08 Prešov.', 'Départs : 10 h 42 Spišská Nová Ves · 10 h 55 Bratislava · 11 h 08 Prešov.', [['rozpis', 'le tableau des départs'], ['odchody', 'les départs']]);
              await say(g, 'andrea', 'Nám ide ten prvý: Spišská Nová Ves.', 'C\'est le premier qu\'il nous faut : Spišská Nová Ves.');
            } },
          { id: 'stol', name: { sk: 'stôl', fr: 'la table' }, poly: box(80, 360, 320, 560), walk: [220, 650],
            async onUse(g) {
              if (g.has('papier') || g.has('mot')) { await say(g, 'fox', 'Papier už mám.', 'J\'ai déjà du papier.'); return; }
              g.give('papier');
              await say(g, 'narrator', 'Na stole leží čistý papier. Gab si ho berie.', 'Sur la table, une feuille blanche. Gab la prend.', [['papier', 'le papier']]);
            } },
          { id: 'pero', name: { sk: 'pero', fr: 'le stylo' }, poly: box(1030, 440, 1110, 500), walk: [1070, 650],
            async onUse(g) {
              if (g.has('pero') || g.has('mot')) { await say(g, 'fox', 'Pero už mám.', 'J\'ai déjà un stylo.'); return; }
              g.give('pero');
              await say(g, 'narrator', 'Na pulte leží pero. Gab si ho berie.', 'Sur le comptoir, un stylo. Gab le prend.', [['pero', 'le stylo']]);
            } },
          { id: 'schranka', name: { sk: 'schránka', fr: 'la boîte aux lettres' }, poly: box(1120, 250, 1250, 440), walk: [1100, 650],
            look: { sk: 'Poštová schránka. Sem dám odkaz pre tetu.', fr: 'Une boîte aux lettres. J\'y mets le mot pour la tante.', words: [['schránka', 'la boîte aux lettres']] },
            onItem: {
              async mot(g) {
                g.take('mot'); g.setFlag('mot_sent');
                await say(g, 'narrator', 'Odkaz je v schránke. Teta ho nájde ráno.', 'Le message est dans la boîte. La tante le trouvera demain matin.');
              },
            } },
          { id: 'pokladnicka', sprite: 'pokladnicka', name: { sk: 'pokladníčka', fr: 'la guichetière' }, walk: [790, 650],
            onItem: {
              async listok_ok(g) {
                await say(g, 'fox', 'Tu je môj lístok!', 'Voici mon ticket !');
                await say(g, 'pokladnicka', 'To je lístok na električku. Ja predávam lístky na vlak.', 'C\'est un ticket de tram. Moi, je vends des billets de train.');
                await say(g, 'andrea', 'Gab…', 'Gab…');
              },
            },
            async onUse(g) {
              if (g.flag('tickets')) { await say(g, 'pokladnicka', 'Šťastnú cestu!', 'Bon voyage !'); return; }
              await say(g, 'pokladnicka', 'Dobrý deň. Kam idete?', 'Bonjour. Vous allez où ?', [['kam', 'où (direction)']]);
              if (!g.flag('rozpis')) { await say(g, 'andrea', 'Najprv sa pozri na rozpis.', 'Regarde d\'abord le tableau des départs.'); return; }
              for (;;) {
                const i = await g.choice([
                  { sk: 'Dva lístky do Spišskej Novej Vsi, prosím.', fr: 'Deux billets pour Spišská Nová Ves, s\'il vous plaît.' },
                  { sk: 'Dva lístky do Spišská Nová Ves, prosím.', fr: 'Deux billets pour Spišská Nová Ves (mal décliné).' },
                  { sk: 'Dve lístky do Spišskej Novej Vsi, prosím.', fr: 'Deux billets… (mal accordé).' },
                ]);
                if (i === 0) break;
                await say(g, 'pokladnicka', i === 1 ? 'Správne je: do Spišskej Novej Vsi.' : 'Lístok je mužský rod: dva lístky.', i === 1 ? 'Le bon accord : « do Spišskej Novej Vsi » (après « do », on décline).' : '« Lístok » est masculin : « dva lístky ».');
              }
              g.give('listky_vlak'); g.setFlag('tickets');
              await say(g, 'pokladnicka', 'Dva lístky. Šťastnú cestu!', 'Deux billets. Bon voyage !', [['pokladňa', 'le guichet']]);
            } },
          { id: 'nastupiste', name: { sk: 'nástupište', fr: 'le quai' }, poly: box(0, 250, 110, 560), walk: [160, 650],
            async onUse(g) {
              if (!g.flag('tickets') || !g.flag('mot_sent')) { await say(g, 'andrea', 'Ešte nie. Potrebujeme lístky na vlak a odkaz pre tetu.', 'Pas encore. Il nous faut les billets et le mot pour ma tante.'); return; }
              await say(g, 'narrator', 'Vlak odchádza na západ.', 'Le train part vers l\'ouest.');
              await g.showMap('ch3', { note: { sk: 'Pokračovanie nabudúce…', fr: 'À suivre…' } });
              g.end('Koniec ukážky', 'Fin de l\'aperçu');
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
    },
  };

  // le monsieur au sourire : la rencontre, avec la bonne negation (« Nič sme nenašli »)
  async function meeting(g) {
    if (g.flag('met_pan')) return;
    g.setFlag('met_pan');
    g.spawn('pan', 1250, 650); g.face('pan', -1);
    await g.walk('pan', 960, 650);
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
    await g.walk('pan', 1250, 650);
    g.hide('pan'); g.hide('auto');
    await say(g, 'narrator', 'Auto odchádza.', 'La voiture s\'en va.');
    await say(g, 'andrea', 'Ten pán sa veľa usmieva. To sa mi nepáči.', 'Ce monsieur sourit beaucoup. Ça ne me plaît pas.');
    await say(g, 'fox', 'Prečo?', 'Pourquoi ?');
    await say(g, 'andrea', 'Lebo.', 'Parce que.', [['lebo', 'parce que']]);
    g.addClue('pan'); g.setFlag('met_pan_done');
  }
})();
