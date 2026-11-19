// Zajko Quest v2 « Circuit fermé » : chapitre 6 « Brána » (la vallée, jeudi soir, puis le village vendredi matin). Conception : docs/Jeu-conception-v2.md.
// Scenes : la rue inondee (povoden), le portail et le parking (brana), derriere le batiment (rura), derriere la bergerie vendredi matin (zadok_rano).
// Dialogues repris de docs/Histoire-v2.md (kapitola 6). Charge apres ch5.js. Textes slovaques : premiere ecriture, a relire par un natif.
(function () {
  const D = globalThis.ZG_DATA, L = globalThis.ZG_LIB;
  const { gab, andrea, box, say, W, H } = L;
  const S = D.scenes;
  const mato = L.mato5, katka = L.katka5, twoPose = L.twoPose5, mk = L.mk5;

  // ------------------------------------------------------------------ personnages, objets, cartes
  Object.assign(D.characters, {
    marek: { name: 'Marek', icon: '🦡', color: '#3a4a7a' },
    hasic: { name: 'Hasič', icon: '🧑‍🚒', color: '#c09a10' },
    strazca: { name: 'Strážnik', icon: '💂', color: '#555a66' },
    mys: { name: 'Pani myš', icon: '🐭', color: '#8a7a8a' },
    kacica: { name: 'Pani kačica', icon: '🦆', color: '#c06a3a' },
    zajace: { name: 'Zajace', icon: '🐇', color: '#9a7a5a' },
    jezko: { name: 'Pani ježková', icon: '🦔', color: '#7a5a3a' },
  });
  Object.assign(D.items, {
    hak: { sk: 'hák', fr: 'la gaffe', icon: 'art/item_hak.png' },
    lano: { sk: 'šnúra', fr: 'la corde à linge', icon: 'art/item_lano.png' },
    kosik: { sk: 'kôš s káčatami', fr: 'le panier de canetons', icon: 'art/item_kosik.png' },
    teplomer: { sk: 'teplomer', fr: 'le thermomètre', icon: 'art/item_teplomer.png' },
    meradlo: { sk: 'meracia tyč', fr: 'la perche de mesure', icon: 'art/item_meradlo.png' },
    deka_l: { sk: 'veľká deka', fr: 'la grande couverture', icon: 'art/item_deka_l.png' },
    deka_m: { sk: 'stredná deka', fr: 'la couverture moyenne', icon: 'art/item_deka_m.png' },
    deka_s: { sk: 'malá deka', fr: 'la petite couverture', icon: 'art/item_deka_s.png' },
  });
  D.preload = (D.preload || []).concat(['art/obj_brana.png', 'art/okno_svetlo.png', 'art/okno_marek.png', 'art/kamera_a.png', 'art/kamera_b.png',
    'art/obj_vana_chl.png', 'art/obj_beton.png', 'art/obj_beton_labka.png', 'art/za_budovou.webp', 'art/item_meradlo.png', 'art/mys6_b.png']);
  Object.assign(D.board.cards, {
    marek: { icon: '🦡', sk: 'Marek: otvoril bránu. Robí v sivej budove.', fr: 'Marek : il a ouvert le portail. Il travaille au bâtiment gris.' },
    para: { icon: '♨️', sk: 'Na streche stúpa para. Z rúry tečie voda.', fr: 'De la vapeur monte du toit. De l\'eau sort d\'un tuyau.' },
    teplota: { icon: '🌡️', sk: 'Rieka: 9 °C. Voda z rúry: 31 °C.', fr: 'La rivière : 9 °C. L\'eau du tuyau : 31 °C.' },
    video: { icon: '🎬', sk: 'Video: rúra, teplomer, para, zelená vlna (dôkaz č. 5)', fr: 'La vidéo : le tuyau, le thermomètre, la vapeur, la vague verte (pièce n° 5)' },
    marek_videl: { icon: '🪟', sk: 'Marek nás videl z okna. Zhasol.', fr: 'Marek nous a vus de sa fenêtre. Il a éteint.' },
    beton: { icon: '🧱', sk: 'Poklop OPTIKA je pod betónom. Dnes v noci.', fr: 'La plaque OPTIKA est sous le béton. Cette nuit.' },
    web_zmena: { icon: '🔄', sk: 'Web dnes: iné čísla. Včera 12 cm, na screenshote 42 cm.', fr: 'Le site aujourd\'hui : d\'autres chiffres. Hier 12 cm, sur la capture 42 cm.' },
    starosta_kecal: { icon: '🗣️', sk: 'Starosta: nie je zlý. Ale veľa rozpráva.', fr: 'Le maire : pas méchant. Mais il parle beaucoup.' },
    treba_cisla: { icon: '❔', sk: 'Treba: niekoho, kto vie čítať čísla', fr: 'Il faut : quelqu\'un qui sait lire les chiffres' },
    treba_vnutri: { icon: '❔', sk: 'Treba: niekoho zvnútra', fr: 'Il faut : quelqu\'un de l\'intérieur' },
  });
  D.board.questions.q_kto = {
    sk: 'Kto varoval sivú budovu?', fr: 'Qui a prévenu le bâtiment gris ?',
    pairs: [['starosta', 'beton']],
    ok: [
      { who: 'fox', sk: '„Zavolám správnym ľuďom.“ A v noci je poklop pod betónom.', fr: '« Je vais appeler les bonnes personnes. » Et dans la nuit, la plaque est sous le béton.' },
      { who: 'mato', sk: 'To som ja. To starosta. Všetko som mu povedal.', fr: 'C\'est moi. C\'est le maire. Je lui ai tout dit.' },
      { who: 'andrea', sk: 'Nemohol si to vedieť.', fr: 'Tu ne pouvais pas savoir.' },
      { who: 'mato', sk: 'Ty si to vedela.', fr: 'Toi, tu savais.' },
      { who: 'andrea', sk: 'Aj ja som urobila to isté. S limonádou.', fr: 'Moi aussi, j\'ai fait pareil. Avec une limonade.', words: [['limonáda', 'la limonade']] },
    ],
    ko: [
      { who: 'fox', sk: 'Hmm… nie. Kto vedel o poklope? A kto potom telefonoval?', fr: 'Hmm… non. Qui savait pour la plaque ? Et qui a téléphoné ensuite ?' },
      { who: 'katka', sk: 'Kto povedal „zavolám“?', fr: 'Qui a dit « je vais appeler » ?' },
    ],
  };

  // ------------------------------------------------------------------ outils
  const rank = (h) => (h.sprite ? 0 : h.top ? 2 : 1);
  const MAREK = { run: 328, key: 339, point: 343, tea: 349, blanket: 353, shrug: 353, tired: 350, guilty: 350 };
  const HASIC = { wave: 344, point: 342, hook: 344, give: 338 };
  const STRAZ = { cross: 354, stop: 354, shrug: 354 };
  const marek = (x, y, face, pose, extra) => mk('marek', 'marek_', MAREK, 350, 460, x, y, face, pose || 'tired', extra);
  const hasic = (x, y) => mk('hasic', 'hasic_', HASIC, 344, 470, x, y, 1, 'wave');
  const strazca = (x, y) => mk('strazca', 'strazca_', STRAZ, 354, 480, x, y, -1, 'cross');
  // la pluie, devant tout le monde : des traits obliques qui tombent (pas d'image)
  const rain = (c, E, x0, x1, a) => {
    c.save(); c.strokeStyle = `rgba(200,215,235,${a})`; c.lineWidth = 1.6; c.beginPath();
    const t = E.t;
    for (let i = 0; i < 260; i++) {
      const x = x0 + ((i * 97.3) % (x1 - x0)), sp = 900 + (i % 7) * 60;
      const y = ((i * 53.7 + t * sp) % (H + 60)) - 30;
      c.moveTo(x, y); c.lineTo(x - 7, y + 22);
    }
    c.stroke(); c.restore();
  };
  const drawImg = (c, E, src, x, y, w, h, a) => { const im = E.img(src); if (!im || !im.naturalWidth) return; if (a != null) c.globalAlpha = a; c.drawImage(im, x, y, w, h || w * im.naturalHeight / im.naturalWidth); c.globalAlpha = 1; };

  // ================================================================== 1. la rue du bas, inondee
  // trois maisons : l'eau monte d'un cran apres chaque voyage de Mato. Toit (1 cran), fenetre (2), genoux (3).
  const HOUSES = {
    dom3: { fam: 'zajace', need: 1, x: 1900, call: ['Sme na streche!', 'On est sur le toit !'], who: 'zajace' },
    dom2: { fam: 'mys6', need: 2, x: 1470, call: ['Voda je po okno!', 'L\'eau arrive à la fenêtre !'], who: 'mys' },
    dom1: { fam: 'kacica6', need: 3, x: 640, call: ['Voda je po kolená!', 'L\'eau arrive aux genoux !'], who: 'kacica' },
  };
  const level = (g) => g.flagv('voda') || 0;
  S.povoden = {
    chapter: 'ch6', title: { sk: 'Dolná ulica', fr: 'La rue du bas' }, tint: ['#4a5a7a', '#a08060'],
    bg: 'art/povoden_ulica.webp', worldW: 2160,
    player: 'fox', floor: [[0, 575], [2160, 575], [2160, 712], [0, 712]], scale: { y0: 575, s0: 0.5, y1: 712, s1: 0.62 },
    sprites: [gab(150, 650), andrea(50, 1, 640), mato(560, 660, 1, 'count'), katka(420, 668, -1, 'type'), hasic(265, 600),
      twoPose('kacica6', 'kacica6_a', 'kacica6_b', 640, 552, 130, { min: 2, max: 4, hold: [1.2, 2] }),
      twoPose('mys6', 'mys6_a', 'mys6_a', 1470, 545, 96, { min: 99, max: 99 }, { poses: { b: { img: 'art/mys6_a.png', h: 96 }, lend: { img: 'art/mys6_b.png', h: 96 } }, speed: 160 }),
      twoPose('zajace', 'zajace6_a', 'zajace6_a', 1920, 470, 100, { min: 99, max: 99 }),
      twoPose('macka6', 'macka6_a', 'macka6_b', 1760, 612, 84, { min: 4, max: 7, hold: [2, 3] }),
      { id: 'vana', img: 'art/obj_vana.png', x: 1130, y: 552, h: 58, abs: true, face: 1, speed: 160, poses: { chl: { img: 'art/obj_vana_chl.png', h: 74 } } }],
    ambient: [
      { imgs: ['art/majak_a.png', 'art/majak_b.png'], fps: 3, x: 194, y: 252, w: 46 },
      { img: 'art/plav_vedro.png', x: 0, y: 0, w: 60, cross: { from: [860, 640], to: [2200, 650], dur: 40, every: 50 }, bob: { amp: 4, speed: 2 } },
      { img: 'art/plav_lopta.png', x: 0, y: 0, w: 50, cross: { from: [1000, 600], to: [2250, 610], dur: 34, every: 41 }, bob: { amp: 5, speed: 2.4 }, phase: 12 },
      { img: 'art/plav_stolicka.png', x: 0, y: 0, w: 70, cross: { from: [700, 690], to: [2250, 700], dur: 48, every: 57 }, bob: { amp: 3, speed: 1.6 }, phase: 25 }],
    front(c, g, E) {
      // la bande d'eau devant les personnages : elle monte d'un cran a chaque voyage
      const y = 615 - level(g) * 14;
      const grd = c.createLinearGradient(0, y, 0, H);
      grd.addColorStop(0, 'rgba(120,85,50,.72)'); grd.addColorStop(1, 'rgba(95,65,40,.85)');
      c.fillStyle = grd;
      c.beginPath(); c.moveTo(440, y + 30); c.lineTo(520, y);
      for (let x = 520; x <= 2160; x += 40) c.lineTo(x, y + Math.sin(x / 60 + E.t * 2) * 2.5);
      c.lineTo(2160, H); c.lineTo(440, H); c.closePath(); c.fill();
      rain(c, E, 0, 2160, 0.32);
    },
    hotspots: [
      { id: 'hasic', sprite: 'hasic', name: { sk: 'hasič', fr: 'le pompier' }, walk: [360, 640],
        async onUse(g) {
          if (!g.has('hak') && !g.flag('vana_blizko')) {
            const i = await g.choice([{ sk: 'Požičiate mi hák?', fr: 'Vous me prêtez la gaffe ?' }, { sk: 'Požičaj mi hák.', fr: 'Prête-moi la gaffe.' }, { sk: 'Kde sú rodiny?', fr: 'Où sont les familles ?' }]);
            if (i === 1) { g.pose('hasic', 'point'); await say(g, 'hasic', 'Požičaj? My sme spolu pásli kravy? Hasičovi sa vyká.', '« Prête » ? On a gardé les vaches ensemble ? Au pompier, on dit « vous ».', [['vykať', 'vouvoyer']]); g.pose('hasic', null); return; }
            if (i === 2) { await calls(g); return; }
            g.pose('hasic', 'give');
            await say(g, 'hasic', 'Nech sa páči. Ale vráťte mi ho… niekedy.', 'Tenez. Mais rendez-la-moi… un jour.', [['hák', 'la gaffe'], ['nech sa páči', 'tenez, je vous en prie']]);
            g.pose('hasic', null); g.give('hak');
            return;
          }
          if (g.flag('zachrana')) { g.pose('hasic', 'point'); await say(g, 'hasic', 'Hore. Na kopec. Tam je sucho.', 'En haut. Sur la colline. Là-haut, c\'est sec.', [['kopec', 'la colline']]); g.pose('hasic', null); return; }
          await calls(g);
        } },
      { id: 'dom1', name: { sk: 'prvý dom', fr: 'la première maison' }, poly: box(385, 180, 880, 548), walk: [600, 660],
        async onUse(g) { await sendMato(g, 'dom1'); } },
      { id: 'dom2', name: { sk: 'žltý dom', fr: 'la maison jaune' }, poly: box(1262, 285, 1720, 522), walk: [1360, 660],
        async onUse(g) { await sendMato(g, 'dom2'); } },
      { id: 'dom3', name: { sk: 'strecha', fr: 'le toit' }, poly: box(1760, 385, 2160, 518), walk: [1820, 660],
        async onUse(g) { await sendMato(g, 'dom3'); } },
      { id: 'vana', sprite: 'vana', name: { sk: 'plechová vaňa', fr: 'la baignoire en zinc' }, walk: [1020, 660], when: (g) => !g.flag('mys_ok'),
        onItem: {
          hak: async (g) => {
            if (g.flag('vana_blizko')) { await say(g, 'fox', 'Vaňa je už pri mne.', 'La baignoire est déjà près de moi.'); return; }
            g.setFlag('vana_blizko');
            await say(g, 'narrator', 'Gab zachytí vaňu hákom a pritiahne ju k sebe.', 'Gab accroche la baignoire avec la gaffe et la tire vers lui.', [['vaňa', 'la baignoire'], ['pritiahnuť', 'tirer vers soi']]);
            await g.walk('vana', 1030, 610);
          },
          lano: async (g) => {
            if (!g.flag('vana_blizko')) { await say(g, 'fox', 'Je príliš ďaleko. Najprv ju musím pritiahnuť.', 'Elle est trop loin. Il faut d\'abord la tirer vers moi.'); return; }
            g.take('lano'); g.setFlag('vana_lano');
            await say(g, 'narrator', 'Gab priviaže šnúru k uchu vane. Teraz je to loďka. Na chladničku.', 'Gab attache la corde à la poignée de la baignoire. Maintenant, c\'est un petit bateau. Pour un frigo.', [['priviazať', 'attacher']]);
          },
        },
        async onUse(g) {
          if (!g.flag('vana_blizko')) { await say(g, 'fox', 'Plechová vaňa pláva po dvore. Je ďaleko. Nedočiahnem.', 'Une baignoire en zinc flotte dans la cour. Elle est loin. Je n\'y arrive pas.', [['plávať', 'flotter, nager'], ['nedočiahnem', 'je n\'atteins pas']]); return; }
          if (!g.flag('vana_lano')) { await say(g, 'fox', 'Vaňa. Keby som ju mal na čom ťahať…', 'La baignoire. Si j\'avais de quoi la tirer…'); return; }
          await say(g, 'fox', 'Vaňa so šnúrou. Pripravená.', 'La baignoire avec la corde. Prête.');
        } },
      { id: 'snura', name: { sk: 'šnúra na prádlo', fr: 'la corde à linge' }, poly: box(975, 378, 1245, 428), walk: [1100, 660], when: (g) => !g.flag('snura'),
        async onUse(g) {
          g.setFlag('snura'); g.give('lano');
          await say(g, 'narrator', 'Gab odviaže šnúru na prádlo. Štipce padnú do vody.', 'Gab détache la corde à linge. Les pinces tombent dans l\'eau.', [['šnúra', 'la corde'], ['prádlo', 'le linge']]);
        } },
      { id: 'macka6', sprite: 'macka6', name: { sk: 'mačka na skrini', fr: 'le chat sur l\'armoire' }, walk: [1650, 660],
        async onUse(g) { await say(g, 'narrator', 'Mačka na plávajúcej skrini. Pšššš! Pomoc nechce. Nikdy nechce.', 'Un chat sur une armoire qui flotte. Pschhh ! Il ne veut pas d\'aide. Il n\'en veut jamais.', [['skriňa', 'l\'armoire']]); } },
      { id: 'dodavka', name: { sk: 'hasičské auto', fr: 'la camionnette des pompiers' }, poly: box(70, 250, 295, 395),
        look: { sk: 'Hasičské auto. Modré svetlo sa točí. Iné nič nefunguje.', fr: 'La camionnette des pompiers. La lumière bleue tourne. Rien d\'autre ne marche.', words: [['hasič', 'le pompier']] } },
      { id: 'kopec', name: { sk: 'sivá budova na kopci', fr: 'le bâtiment gris sur la colline' }, poly: box(265, 88, 625, 205), walk: [300, 640],
        async onUse(g) {
          if (!g.flag('zachrana')) { await say(g, 'fox', 'Sivá budova na kopci. Jej parkovisko je suché. Ale najprv tí v domoch!', 'Le bâtiment gris sur la colline. Son parking est sec. Mais d\'abord, ceux qui sont dans les maisons !', [['parkovisko', 'le parking'], ['suchý', 'sec']]); return; }
          await say(g, 'andrea', 'Hore. Tam.', 'En haut. Là-bas.');
          g.goScene('brana');
        } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [240, 650],
        async onUse(g) { await say(g, 'andrea', 'Kto má vodu najvyššie, ten ide prvý.', 'Celui qui a l\'eau le plus haut passe en premier.', [['najvyššie', 'le plus haut']]); } },
      { id: 'mato', sprite: 'mato', name: { sk: 'Maťo', fr: 'Maťo' }, walk: [660, 660],
        async onUse(g) { g.pose('mato', 'cheer'); await say(g, 'mato', 'Dva koše naraz. Povedz kam, Gab, a idem.', 'Deux paniers à la fois. Dis-moi où, Gab, et j\'y vais.', [['kôš', 'le panier'], ['naraz', 'à la fois']]); g.pose('mato', null); } },
      { id: 'katka', sprite: 'katka', name: { sk: 'Katka', fr: 'Katka' }, walk: [180, 660],
        async onUse(g) { await say(g, 'katka', 'Počasie bolo vždy bláznivé. Teraz má internet.', 'Le temps a toujours été fou. Maintenant, il a internet.'); } },
    ],
    hints: [
      { id: 'c6_poradie', when: (g) => !g.flag('zachrana'), levels: [
        { sk: 'Tri domy volajú. Kde je voda najvyššie?', fr: 'Trois maisons appellent. Où l\'eau est-elle le plus haut ?' },
        { sk: 'Strecha je vyššie ako okno. Okno je vyššie ako kolená.', fr: 'Le toit est plus haut que la fenêtre. La fenêtre est plus haute que les genoux.' },
        { sk: 'Poradie: strecha (zajace), okno (myš), kolená (kačky).', fr: 'L\'ordre : le toit (les lapins), la fenêtre (la souris), les genoux (les canards).' } ] },
      { id: 'c6_vana', when: (g) => g.flag('mys_nie') && !g.flag('vana_lano'), levels: [
        { sk: 'Chladnička je ťažká. Čo pláva po dvore?', fr: 'Le frigo est lourd. Qu\'est-ce qui flotte dans la cour ?' },
        { sk: 'Vaňa! Je ďaleko: hasič má hák. A na ťahanie treba šnúru.', fr: 'La baignoire ! Elle est loin : le pompier a une gaffe. Et pour la tirer, il faut une corde.' },
        { sk: 'Hasičovi povedz „Požičiate mi hák?“, potom hák na vaňu, šnúru na vaňu.', fr: 'Dis au pompier « Požičiate mi hák? », puis la gaffe sur la baignoire, la corde sur la baignoire.' } ] },
      { id: 'c6_hore', when: (g) => g.flag('zachrana'), levels: [
        { sk: 'Škola je pod vodou. Kde je sucho?', fr: 'L\'école est sous l\'eau. Où est-ce sec ?' },
        { sk: 'Klikni na sivú budovu na kopci.', fr: 'Clique sur le bâtiment gris sur la colline.' } ] },
    ],
    async onEnter(g) {
      if (g.flag('p0')) { restoreHouses(g); return; }
      g.setFlag('p0');
      await say(g, 'narrator', 'Štvrtok večer. V údolí už rieka nie je rieka. Je to hnedé jazero a stúpa.', 'Jeudi soir. Dans la vallée, la rivière n\'est plus une rivière. C\'est un lac brun, et il monte.', [['rieka', 'la rivière'], ['jazero', 'le lac'], ['stúpať', 'monter']]);
      await say(g, 'mato', 'Včera ani kvapka. Dnes priveľa.', 'Hier, pas une goutte. Aujourd\'hui, trop.', [['kvapka', 'la goutte'], ['priveľa', 'trop']]);
      await say(g, 'fox', 'Počasie sa zbláznilo.', 'Le temps est devenu fou.', [['počasie', 'le temps (météo)']]);
      await say(g, 'katka', 'Počasie bolo vždy bláznivé. Teraz má internet.', 'Le temps a toujours été fou. Maintenant, il a internet.');
      g.pose('hasic', 'wave');
      await say(g, 'hasic', 'Vy štyria! Potrebujem ruky. V domoch dole sú rodiny. Kačky, myši, zajace.', 'Vous quatre ! J\'ai besoin de bras. Il y a des familles dans les maisons du bas. Des canards, des souris, des lapins.', [['ruka', 'la main, le bras'], ['rodina', 'la famille']]);
      g.pose('hasic', null);
      await say(g, 'andrea', 'Pomôžeme vám.', 'On vous aide.', [['pomôcť', 'aider']]);
      g.pose('mato', 'cheer');
      await say(g, 'mato', 'Ruky mám.', 'J\'ai des bras.');
      g.pose('mato', null);
      await say(g, 'hasic', 'To vidím. Ale nosí dva koše naraz. A voda stúpa po každej ceste.', 'Je vois ça. Mais il porte deux paniers à la fois. Et l\'eau monte à chaque voyage.', [['cesta', 'le trajet, le voyage']]);
      await calls(g);
    },
  };
  S.povoden.hotspots.sort((a, b) => rank(a) - rank(b));

  async function calls(g) {
    for (const k of ['dom1', 'dom2', 'dom3']) {
      const h = HOUSES[k];
      if (g.flag(k + '_ok')) continue;
      await say(g, h.who, h.call[0], h.call[1], k === 'dom3' ? [['strecha', 'le toit']] : k === 'dom2' ? [['okno', 'la fenêtre']] : [['koleno', 'le genou']]);
    }
  }
  function restoreHouses(g) {
    for (const k of Object.keys(HOUSES)) { const s = g.sprite(HOUSES[k].fam); if (s) s.hidden = !!g.flag(k + '_ok'); }
    if (g.flag('vana_blizko')) { const v = g.sprite('vana'); if (v) { v.x = 1030; v.y = 610; } }
    if (g.flag('mys_ok')) g.hide('vana');
  }
  async function sendMato(g, k) {
    const h = HOUSES[k];
    if (g.flag(k + '_ok')) { await say(g, 'fox', 'Tu už nikto nie je.', 'Il n\'y a plus personne ici.'); return; }
    await say(g, h.who, h.call[0], h.call[1]);
    const i = await g.choice([{ sk: 'Maťo, choď tam!', fr: 'Maťo, vas-y !' }, { sk: 'Počkaj.', fr: 'Attends.' }]);
    if (i === 1) return;
    if (k === 'dom2' && !g.flag('vana_lano')) {
      g.setFlag('mys_nie');
      await g.walk('mato', h.x - 120, 662);
      await say(g, 'mys', 'Pozor na moju chladničku! Bez chladničky nejdem!', 'Attention à mon frigo ! Sans mon frigo, je ne pars pas !', [['chladnička', 'le frigo']]);
      await say(g, 'mato', 'Pani, vy nesiete chladničku?', 'Madame, vous portez un frigo ?');
      await say(g, 'mys', 'Mám v nej všetko, čo mám.', 'Tout ce que j\'ai est dedans.');
      await g.walk('mato', 560, 660); g.face('mato', 1);
      await say(g, 'mato', 'Chladnička do koša nevojde. Potrebujeme niečo, čo pláva.', 'Le frigo ne rentre pas dans un panier. Il nous faut quelque chose qui flotte.', [['plávať', 'flotter']]);
      return;
    }
    // le voyage
    if (k === 'dom2') { g.walk('vana', h.x - 60, 640); }
    await g.walk('mato', h.x - 120, 662);
    g.hide(h.fam);
    if (k === 'dom2') { g.pose('vana', 'chl'); }
    g.sfx(k === 'dom1' ? 'kacatka' : 'eau_pas');
    await say(g, 'narrator', k === 'dom3' ? 'Maťo zloží zajace zo strechy. Dva koše, tri zajace.' : k === 'dom2' ? 'Chladnička do vane. Pani myš do koša. Maťo ťahá šnúru.' : 'Pani kačica do koša. Káčatá do druhého koša.',
      k === 'dom3' ? 'Maťo descend les lapins du toit. Deux paniers, trois lapins.' : k === 'dom2' ? 'Le frigo dans la baignoire. Madame la souris dans un panier. Maťo tire la corde.' : 'Madame la cane dans un panier. Les canetons dans l\'autre.');
    if (k === 'dom2') g.walk('vana', 760, 640);
    await g.walk('mato', 560, 660); g.face('mato', 1);
    g.setFlag(k + '_ok');
    g.setFlag('voda', level(g) + 1);
    g.sfx('eau_monte');
    await say(g, 'narrator', 'Voda stúpne.', 'L\'eau monte d\'un cran.', [['stúpnuť', 'monter (une fois)'], ['stúpať', 'monter (en ce moment)']]);
    // l'eau est-elle montee trop haut chez quelqu'un ?
    const drowned = Object.keys(HOUSES).find((q) => !g.flag(q + '_ok') && HOUSES[q].need <= level(g));
    if (drowned) {
      const d = HOUSES[drowned];
      await say(g, d.who, drowned === 'dom3' ? 'Voda je už na streche! Pomoc!' : 'Voda je už nad oknom! Pomoc!', drowned === 'dom3' ? 'L\'eau est déjà sur le toit ! Au secours !' : 'L\'eau est déjà au-dessus de la fenêtre ! Au secours !', [['pomoc', 'au secours, l\'aide']]);
      g.pose('hasic', 'point');
      await say(g, 'hasic', 'Stop! Člny ich vytiahnu. Ale dávajte pozor: najprv tí, čo majú vodu najvyššie!', 'Stop ! Les bateaux vont les sortir de là. Mais faites attention : d\'abord ceux qui ont l\'eau le plus haut !');
      g.pose('hasic', null);
      await say(g, 'narrator', 'Hasiči v člne ich zachránia. Gab si to zapamätá. Skúsme znova, s ďalšou ulicou.', 'Les pompiers les sauvent en bateau. Gab s\'en souviendra. On recommence, avec la rue suivante.');
      for (const q of Object.keys(HOUSES)) g.setFlag(q + '_ok', false);
      g.setFlag('voda', 0);
      if (g.flag('mys_ok')) { g.setFlag('mys_ok', false); }
      if (g.has('kosik')) g.take('kosik');
      const v = g.sprite('vana'); if (v) { v.hidden = false; v.pose = null; v.x = g.flag('vana_blizko') ? 1030 : 1130; v.y = g.flag('vana_blizko') ? 610 : 552; }
      restoreHouses(g);
      return;
    }
    if (k === 'dom2') {
      g.setFlag('mys_ok'); g.hide('vana');
      g.give('lano');
      await say(g, 'mato', 'Šnúra, Gab. Môže sa ešte hodiť.', 'La corde, Gab. Elle peut encore servir.');
    }
    if (k === 'dom1') {
      g.give('kosik');
      await say(g, 'mato', 'Káčatá sú v koši. Nes ich ty, Gab. Pípajú mi do ucha.', 'Les canetons sont dans le panier. Porte-les, Gab. Ils me piaillent dans l\'oreille.', [['káčatá', 'les canetons'], ['pípať', 'piailler, biper']]);
    }
    if (['dom1', 'dom2', 'dom3'].every((q) => g.flag(q + '_ok'))) {
      g.setFlag('zachrana');
      await say(g, 'hasic', 'Všetci! Výborne. Vezmite ich hore.', 'Tout le monde ! Très bien. Amenez-les en haut.');
      await say(g, 'andrea', 'Hore, kam?', 'En haut, où ?');
      await say(g, 'hasic', 'Dobrá otázka. Škola je pod vodou.', 'Bonne question. L\'école est sous l\'eau.', [['škola', 'l\'école']]);
      await say(g, 'narrator', 'Všetci sa pozerajú na to isté miesto. Na kopci stojí veľká sivá budova. Jej parkovisko je prázdne a suché.', 'Tout le monde regarde le même endroit. Sur la colline, le grand bâtiment gris. Son parking est vide et sec.');
    }
    if (k === 'dom2' && g.flag('mys_ok') && !g.has('teplomer') && !g.flag('teplomer_dany')) {
      g.setFlag('teplomer_dany');
      await say(g, 'mys', 'Ďakujem, chlapci. V chladničke mám všetko. Aj teplomer. Na, požičiam vám ho. Ale vrátite mi ho!', 'Merci, les jeunes. Dans mon frigo, j\'ai tout. Même un thermomètre. Tenez, je vous le prête. Mais vous me le rendrez !', [['teplomer', 'le thermomètre'], ['vrátiť', 'rendre']]);
      g.give('teplomer');
    }
  }

  // ================================================================== 2. le portail et le parking
  const GATE = [420, 268, 797, 497];
  const FLOOR_CLOSED = [[0, 520], [1060, 520], [1060, 712], [0, 712]], FLOOR_OPEN = [[0, 520], [2160, 520], [2160, 712], [0, 712]];
  const DEKY = { zajace: 'deka_l', jezkovia: 'deka_m', mys: 'deka_s' };
  S.brana = {
    chapter: 'ch6', title: { sk: 'Brána', fr: 'Le portail' }, tint: ['#20305a', '#506a9a'],
    bg: 'art/brana_parkovisko.webp', worldW: 2160,
    player: 'fox', floor: FLOOR_CLOSED, scale: { y0: 520, s0: 0.48, y1: 712, s1: 0.62 },
    sprites: [gab(700, 640), andrea(590, 1, 632), mato(470, 652, 1, 'count'), katka(820, 662, -1, 'type'), strazca(980, 600),
      marek(2300, 640, -1, 'run', { hidden: true, speed: 520 }),
      twoPose('skupina', 'skupina6_a', 'skupina6_b', 160, 640, 190, { min: 99, max: 99 }),
      twoPose('jezkovia', 'jezkovia6_a', 'jezkovia6_b', 330, 650, 120, { min: 99, max: 99 }),
      twoPose('kacica6', 'kacica6_a', 'kacica6_b', 60, 600, 120, { min: 3, max: 5, hold: [1, 2] }),
      twoPose('zajace', 'zajace6_a', 'zajace6_b', 1550, 545, 100, { min: 99, max: 99 }, { hidden: true }),
      twoPose('mys6', 'mys6_a', 'mys6_b', 1960, 560, 92, { min: 99, max: 99 }, { hidden: true })],
    overlay(c, g, E) {
      // la grille du portail : elle coulisse vers la gauche, derriere le pilier
      if (g.flag('brana_open') && S.brana._openT == null) S.brana._openT = E.t;
      const k = g.flag('brana_open') ? Math.min(1, (E.t - S.brana._openT) / 2.2) : 0;
      if (k < 1) {
        c.save(); c.beginPath(); c.rect(GATE[0], GATE[1] - 10, GATE[2] - GATE[0], GATE[3] - GATE[1] + 14); c.clip();
        drawImg(c, E, 'art/obj_brana.png', GATE[0] - k * (GATE[2] - GATE[0]), GATE[1], GATE[2] - GATE[0], GATE[3] - GATE[1]);
        c.restore();
      }
      drawImg(c, E, g.flag('kamera_red') && (E.t % 1 < 0.6) ? 'art/kamera_b.png' : 'art/kamera_a.png', 758, 212, 62);
      if (g.flag('deky_done')) for (const [x, y] of [[1290, 470], [1510, 470]]) drawImg(c, E, Math.floor(E.t * 1.5 + x) % 2 ? 'art/deka_para_a.png' : 'art/deka_para_b.png', x, y - 40, 50, null, 0.6);
    },
    front(c, g, E) { rain(c, E, 0, 2160, 0.26); },
    hotspots: [
      { id: 'strazca', sprite: 'strazca', name: { sk: 'strážnik', fr: 'le gardien' }, walk: [880, 640],
        onItem: { kosik: async (g) => { await say(g, 'strazca', 'Káčatá. Pekné. Je zatvorené.', 'Des canetons. Mignons. C\'est fermé.'); } },
        async onUse(g) {
          if (g.flag('brana_open')) { g.pose('strazca', 'shrug'); await say(g, 'strazca', 'Brána bola pokazená. Ja nič neviem.', 'Le portail était cassé. Je ne sais rien.', [['pokazený', 'cassé, en panne']]); g.pose('strazca', null); return; }
          const i = await g.choice([{ sk: 'Je povodeň!', fr: 'Il y a une inondation !' }, { sk: 'Nerozumiem, som Francúz.', fr: 'Je ne comprends pas, je suis français.' }, { sk: 'Prosím vás, otvorte.', fr: 'Je vous en prie, ouvrez.' }]);
          if (i === 0) { await say(g, 'strazca', 'Videl som. Aj tak je zatvorené. Mám príkazy.', 'J\'ai vu. C\'est fermé quand même. J\'ai des ordres.', [['príkaz', 'l\'ordre']]); return; }
          if (i === 1) {
            g.pose('strazca', 'stop');
            await say(g, 'strazca', 'Zatvorené. Closed. Fermé. Geschlossen.', 'Fermé. (en quatre langues)', [['zatvorené', 'fermé']]);
            g.pose('strazca', null);
            if (!g.flag('fr_fail')) { g.setFlag('fr_fail'); await say(g, 'fox', '(Prvýkrát to nefunguje. Hovorí po francúzsky lepšie ako ja.)', '(Pour la première fois, ça ne marche pas. Il parle français mieux que moi.)'); }
            return;
          }
          g.pose('strazca', 'cross');
          await say(g, 'strazca', 'Nemôžem. Mám príkazy od niekoho, kto je v suchu.', 'Je ne peux pas. J\'ai des ordres de quelqu\'un qui est au sec.', [['v suchu', 'au sec']]);
          g.pose('strazca', null);
        } },
      { id: 'kamera', name: { sk: 'kamera', fr: 'la caméra' }, poly: box(755, 208, 825, 258), walk: [760, 640],
        onItem: { kosik: async (g) => openGate(g) },
        async onUse(g) {
          if (g.flag('brana_open')) { await say(g, 'fox', 'Kamera. Svieti na červeno. Niekto sa stále pozerá.', 'La caméra. Le voyant est rouge. Quelqu\'un regarde encore.'); return; }
          await say(g, 'fox', 'Kamera nad interkomom. Niekto vnútri sa pozerá na obrazovku. Na čo sa pozerá rád?', 'Une caméra au-dessus de l\'interphone. À l\'intérieur, quelqu\'un regarde un écran. Qu\'est-ce qu\'il aime regarder ?', [['kamera', 'la caméra'], ['obrazovka', 'l\'écran']]);
        } },
      { id: 'interkom', name: { sk: 'interkom', fr: 'l\'interphone' }, poly: box(796, 328, 838, 388), walk: [800, 640],
        async onUse(g) { g.sfx('bip'); await say(g, 'narrator', 'Gab stlačí gombík. Bzzz. Nikto neodpovedá.', 'Gab appuie sur le bouton. Bzzz. Personne ne répond.', [['gombík', 'le bouton']]); } },
      { id: 'budka', name: { sk: 'búdka strážnika', fr: 'la guérite' }, poly: box(840, 215, 1095, 470),
        look: { sk: 'Búdka strážnika. Vnútri svieti lampa. Je tam teplo a sucho.', fr: 'La guérite du gardien. Une lampe brille à l\'intérieur. Il y fait chaud et sec.', words: [['teplo', 'chaud (il fait)']] } },
      { id: 'kufor', name: { sk: 'kufor Marekovho auta', fr: 'le coffre de la voiture de Marek' }, poly: box(1555, 278, 1700, 412), walk: [1600, 560], when: (g) => g.flag('brana_open'),
        async onUse(g) {
          if (g.flag('deky_vzate')) { await say(g, 'fox', 'Kufor je prázdny. Termoska je u Mareka.', 'Le coffre est vide. Le thermos est chez Marek.'); return; }
          g.setFlag('deky_vzate'); g.give('deka_l'); g.give('deka_m'); g.give('deka_s');
          await say(g, 'marek', 'Deky. Tri. Veľká, stredná, malá. Každý svoju, nech sa nehádajú.', 'Des couvertures. Trois. Une grande, une moyenne, une petite. Chacun la sienne, qu\'ils ne se disputent pas.', [['deka', 'la couverture'], ['veľký', 'grand'], ['stredný', 'moyen'], ['malý', 'petit']]);
        } },
      { id: 'auto', name: { sk: 'Marekovo auto', fr: 'la voiture de Marek' }, poly: box(1400, 300, 1550, 460), walk: [1450, 560], when: (g) => g.flag('brana_open'),
        onItem: { nabijacka: async (g) => {
          g.chargeHelper();
          await say(g, 'katka', 'Do zapaľovača v aute? Funguje! Päť čiarok.', 'Dans l\'allume-cigare ? Ça marche ! Cinq barres.', [['zapaľovač', 'l\'allume-cigare']]);
        } },
        look: { sk: 'Staré auto. Vnútri je zapaľovač. Na nabíjanie.', fr: 'Une vieille voiture. Dedans, il y a un allume-cigare. Pour recharger.', words: [['auto', 'la voiture']] } },
      { id: 'vlna', name: { sk: 'zelená vlna', fr: 'la vague verte' }, poly: box(1780, 140, 2075, 285),
        look: { sk: 'Zelená vlna na sivej stene. „Zelená vlna“. Pekné meno pre sivú budovu.', fr: 'Une vague verte sur un mur gris. « Zelená vlna ». Joli nom pour un bâtiment gris.', words: [['vlna', 'la vague'], ['stena', 'le mur']] } },
      { id: 'za', name: { sk: 'za budovu', fr: 'derrière le bâtiment' }, poly: box(2085, 300, 2160, 712), walk: [2080, 600], when: (g) => g.flag('brana_open'),
        async onUse(g) {
          if (!g.flag('deky_done')) { await say(g, 'andrea', 'Najprv deky. Je im zima.', 'D\'abord les couvertures. Ils ont froid.', [['zima', 'froid (il fait)']]); return; }
          if (!g.flag('ruky')) { g.setFlag('ruky'); await say(g, 'fox', 'Som celý od blata. Kde si tu umyjem ruky?', 'Je suis plein de boue. Où est-ce que je peux me laver les mains ?', [['umyť si ruky', 'se laver les mains']]); }
          g.goScene('rura');
        } },
      { id: 'cesta', name: { sk: 'cesta do dediny', fr: 'la route du village' }, poly: box(0, 300, 70, 712), walk: [80, 640], when: (g) => g.flag('video'),
        async onUse(g) { await leaveNight(g); } },
      { id: 'marek', sprite: 'marek', name: { sk: 'Marek', fr: 'Marek' }, walk: [1180, 600],
        async onUse(g) {
          if (!g.flag('deky_done')) { g.pose('marek', 'point'); await say(g, 'marek', 'Na parkovisko, nie do budovy. Deky sú v kufri.', 'Le parking, pas le bâtiment. Les couvertures sont dans le coffre.', [['kufor', 'le coffre']]); g.pose('marek', null); return; }
          g.pose('marek', 'tea');
          await say(g, 'marek', 'Čaj? Neďakuj. Nič som neurobil.', 'Du thé ? Ne me remercie pas. Je n\'ai rien fait.');
          g.pose('marek', null);
        } },
      { id: 'skupina', sprite: 'skupina', name: { sk: 'srnka, ježko a diviak', fr: 'la chevrette, le hérisson et le sanglier' }, walk: [1180, 600],
        async onUse(g) { await say(g, 'narrator', 'Mokrí, ale s čajom. Diviak drží pohár oboma rukami.', 'Trempés, mais avec du thé. Le sanglier tient sa tasse à deux mains.', [['mokrý', 'mouillé']]); } },
      { id: 'jezkovia', sprite: 'jezkovia', name: { sk: 'ježkovia', fr: 'les hérissons' }, walk: [1250, 600],
        onItem: { deka_m: (g) => blanket(g, 'jezkovia', 'deka_m'), deka_l: (g) => blanket(g, 'jezkovia', 'deka_l'), deka_s: (g) => blanket(g, 'jezkovia', 'deka_s') },
        async onUse(g) { await say(g, 'jezko', g.flag('d_jezkovia') ? 'Spia. Konečne.' : 'Mama ježková a dve deti. Je im zima.', g.flag('d_jezkovia') ? 'Ils dorment. Enfin.' : 'Une maman hérisson et deux petits. Ils ont froid.'); } },
      { id: 'zajace', sprite: 'zajace', name: { sk: 'zajace', fr: 'les lapins' }, walk: [1500, 600],
        onItem: { deka_m: (g) => blanket(g, 'zajace', 'deka_m'), deka_l: (g) => blanket(g, 'zajace', 'deka_l'), deka_s: (g) => blanket(g, 'zajace', 'deka_s') },
        async onUse(g) { await say(g, 'zajace', g.flag('d_zajace') ? 'Ďakujeme! Je nám teplo.' : 'Brrr! Sme traja a mokrí.', g.flag('d_zajace') ? 'Merci ! On a chaud.' : 'Brrr ! On est trois, et trempés.'); } },
      { id: 'mys6', sprite: 'mys6', name: { sk: 'pani myš', fr: 'madame la souris' }, walk: [1880, 600],
        onItem: { deka_m: (g) => blanket(g, 'mys', 'deka_m'), deka_l: (g) => blanket(g, 'mys', 'deka_l'), deka_s: (g) => blanket(g, 'mys', 'deka_s'),
          meradlo: (g) => giveBack(g), teplomer: (g) => giveBack(g) },
        async onUse(g) {
          if (g.flag('teplomer_spat')) { await say(g, 'mys', 'Môj teplomer je späť. Aj chladnička. Som spokojná.', 'Mon thermomètre est revenu. Et mon frigo. Je suis contente.'); return; }
          await say(g, 'mys', g.flag('d_mys') ? 'Malá deka pre malú myš. Ďakujem.' : 'Moja chladnička je v suchu. Ja nie.', g.flag('d_mys') ? 'Une petite couverture pour une petite souris. Merci.' : 'Mon frigo est au sec. Moi, non.');
        } },
      { id: 'kacica6', sprite: 'kacica6', name: { sk: 'pani kačica', fr: 'madame la cane' }, walk: [200, 640],
        async onUse(g) { await say(g, 'kacica', 'Kvá! Moje káčatá! Ste ich nevideli?', 'Coin ! Mes canetons ! Vous ne les avez pas vus ?', [['káčatá', 'les canetons']]); } },
    ],
    hints: [
      { id: 'c6_brana', when: (g) => !g.flag('brana_open'), levels: [
        { sk: 'Strážnik má príkazy. Kto ešte sa pozerá na bránu?', fr: 'Le gardien a des ordres. Qui d\'autre regarde le portail ?' },
        { sk: 'Kamera nad interkomom. Niekto vnútri sa pozerá. Ukáž mu niečo, čo pípa.', fr: 'La caméra au-dessus de l\'interphone. Quelqu\'un regarde à l\'intérieur. Montre-lui quelque chose qui piaille.' },
        { sk: 'Daj kôš s káčatami na kameru.', fr: 'Utilise le panier de canetons sur la caméra.' } ] },
      { id: 'c6_deky', when: (g) => g.flag('brana_open') && !g.flag('deky_done'), levels: [
        { sk: 'Tri deky: veľká, stredná, malá. Kto je najväčší? Kto najmenší?', fr: 'Trois couvertures : grande, moyenne, petite. Qui est le plus grand ? Qui est le plus petit ?' },
        { sk: 'Veľká pre tri zajace, stredná pre ježkov, malá pre myš.', fr: 'La grande pour les trois lapins, la moyenne pour les hérissons, la petite pour la souris.' } ] },
      { id: 'c6_za', when: (g) => g.flag('deky_done') && !g.flag('video'), levels: [
        { sk: 'Gab je celý od blata. Za budovou tečie voda…', fr: 'Gab est plein de boue. Derrière le bâtiment, de l\'eau coule…' } ] },
      { id: 'c6_spat', when: (g) => g.flag('video') && !g.flag('teplomer_spat'), levels: [
        { sk: 'Pani myš chce svoj teplomer späť.', fr: 'Madame la souris veut récupérer son thermomètre.' },
        { sk: 'Daj meraciu tyč pani myši. Potom choď cestou do dediny (vľavo).', fr: 'Donne la perche de mesure à madame la souris. Puis prends la route du village (à gauche).' } ] },
      { id: 'c6_dom', when: (g) => g.flag('video'), levels: [{ sk: 'Ráno. Do dediny: cesta vľavo.', fr: 'Le matin. Au village : la route à gauche.' }] },
    ],
    async onEnter(g) {
      S.brana.floor = g.flag('brana_open') ? FLOOR_OPEN : FLOOR_CLOSED;
      if (g.flag('brana_open')) { S.brana._openT = -99; placeParking(g); return; }
      if (g.flag('b0')) return;
      g.setFlag('b0');
      await say(g, 'narrator', 'Pred bránou stojí strážnik. Za nimi je tridsať mokrých zvierat.', 'Devant le portail, un gardien. Derrière eux, trente animaux mouillés.', [['brána', 'le portail'], ['strážnik', 'le gardien']]);
      await say(g, 'strazca', 'Je zatvorené.', 'C\'est fermé.', [['zatvorené', 'fermé']]);
      await say(g, 'andrea', 'Je povodeň.', 'Il y a une inondation.', [['povodeň', 'l\'inondation']]);
      await say(g, 'strazca', 'Videl som. Aj tak je zatvorené. Mám príkazy.', 'J\'ai vu. C\'est fermé quand même. J\'ai des ordres.');
      await say(g, 'katka', 'Príkazy od koho?', 'Des ordres de qui ?');
      await say(g, 'strazca', 'Od niekoho, kto je v suchu.', 'De quelqu\'un qui est au sec.');
    },
  };
  S.brana.hotspots.sort((a, b) => rank(a) - rank(b));

  function placeParking(g) {
    const pos = { skupina: [1200, 560], jezkovia: [1320, 580], kacica6: [1060, 600], zajace: [1540, 560], mys6: [1960, 565], marek: [1120, 600], strazca: [980, 600] };
    for (const [id, [x, y]] of Object.entries(pos)) { const s = g.sprite(id); if (s) { s.x = x; s.y = y; s.hidden = false; s.tx = null; } }
    const st = g.sprite('marek'); if (st) { st.face = -1; st.img = 'art/marek_tired.png'; }
    if (g.flag('d_jezkovia')) g.pose('jezkovia', 'b');
    if (g.flag('d_zajace')) g.pose('zajace', 'b');
    g.pose('skupina', 'b');
  }
  async function openGate(g) {
    if (g.flag('brana_open')) return;
    g.setFlag('kamera_red');
    g.sfx('kacatka');
    await say(g, 'narrator', 'Gab zdvihne kôš ku kamere. Pííp! Pííp! Štyri káčatá piští do objektívu. Svetlo kamery zčervená.', 'Gab lève le panier vers la caméra. Piou ! Piou ! Quatre canetons piaillent dans l\'objectif. Le voyant de la caméra passe au rouge.', [['červený', 'rouge']]);
    g.camTo(1000);
    g.spawn('marek', 2300, 640);
    await g.walk('marek', 1150, 610);
    g.pose('marek', 'key');
    await say(g, 'narrator', 'Z druhej strany pribehne jazvec v modrej veste. Má kľúč.', 'De l\'autre côté, un blaireau en gilet bleu arrive en courant. Il a une clé.', [['jazvec', 'le blaireau'], ['kľúč', 'la clé']]);
    await say(g, 'marek', 'Otvor.', 'Ouvre.', [['otvoriť', 'ouvrir']]);
    g.pose('strazca', 'shrug');
    await say(g, 'strazca', 'Marek, riaditeľka povedala…', 'Marek, la directrice a dit…', [['riaditeľka', 'la directrice']]);
    g.pose('marek', 'point');
    await say(g, 'marek', 'Riaditeľka je v Bratislave. Ja som tu a vidím káčatá v daždi.', 'La directrice est à Bratislava. Moi, je suis ici, et je vois des canetons sous la pluie.', [['dážď', 'la pluie']]);
    await say(g, 'marek', 'Otvor. Keby sa niekto pýtal, brána bola pokazená.', 'Ouvre. Si on te demande, le portail était cassé.', [['pokazený', 'cassé']]);
    g.sfx('portillon');
    g.setFlag('brana_open'); S.brana._openT = null;
    await g.sleep(2300);
    g.pose('strazca', null);
    S.brana.floor = FLOOR_OPEN;
    g.pose('marek', null);
    await say(g, 'marek', 'Poďte ďalej. Na parkovisko, nie do budovy. V aute mám čaj.', 'Entrez. Le parking, pas le bâtiment. Il y a du thé dans ma voiture.', [['čaj', 'le thé']]);
    g.pose('mato', 'cheer');
    await say(g, 'mato', 'Ďakujeme, pane.', 'Merci, monsieur.');
    g.pose('mato', null);
    g.pose('marek', 'shrug');
    await say(g, 'marek', 'Marek. A neďakujte mi. Nič som neurobil. Brána bola pokazená.', 'Marek. Et ne me remerciez pas. Je n\'ai rien fait. Le portail était cassé.');
    g.pose('marek', null);
    g.take('kosik');
    await g.animate(900, (k) => g.fade(k));
    placeParking(g);
    g.camTo(null);
    await g.animate(900, (k) => g.fade(1 - k));
    await say(g, 'narrator', 'Urobia desať ciest. O polnoci je na parkovisku šesťdesiat zvierat. Káčatá sú pri mame. Marek nalieva čaj. Našiel aj deky.', 'Ils font dix voyages. À minuit, il y a soixante animaux sur le parking. Les canetons sont avec leur maman. Marek sert le thé. Il a aussi trouvé des couvertures.', [['polnoc', 'minuit'], ['šesťdesiat', 'soixante']]);
  }
  async function blanket(g, who, it) {
    const want = DEKY[who];
    if (it !== want) {
      const size = { deka_l: 'veľká', deka_m: 'stredná', deka_s: 'malá' }[it];
      const msg = who === 'mys' ? ['Táto je pre mňa veľká. Utopím sa v nej!', 'Celle-ci est trop grande pour moi. Je vais me noyer dedans !']
        : who === 'zajace' ? ['Sme traja. Táto je pre nás malá.', 'On est trois. Celle-ci est trop petite pour nous.']
          : (it === 'deka_l' ? ['Taká veľká? Daj ju radšej zajacom.', 'Si grande ? Donne-la plutôt aux lapins.'] : ['Je pre nás troch malá.', 'Elle est trop petite pour nous trois.']);
      await say(g, who === 'jezkovia' ? 'jezko' : who, msg[0], msg[1], [[size, { veľká: 'grande', stredná: 'moyenne', malá: 'petite' }[size]]]);
      return;
    }
    g.take(it); g.setFlag('d_' + who);
    if (who !== 'mys') g.pose(who, 'b');
    await say(g, who === 'jezkovia' ? 'jezko' : who, who === 'mys' ? 'Malá deka pre malú myš. Presne.' : who === 'zajace' ? 'Veľká deka pre troch. Ďakujeme!' : 'Stredná. Presne pre nás. Ďakujeme.', who === 'mys' ? 'Une petite couverture pour une petite souris. Pile.' : who === 'zajace' ? 'Une grande couverture pour trois. Merci !' : 'La moyenne. Pile pour nous. Merci.');
    if (['zajace', 'jezkovia', 'mys'].every((q) => g.flag('d_' + q))) {
      g.setFlag('deky_done');
      await say(g, 'fox', 'Je milý.', 'Il est gentil.', [['milý', 'gentil']]);
      await say(g, 'andrea', 'Áno.', 'Oui.');
      await say(g, 'fox', 'Povedala si „áno“, ako keby to bol problém.', 'Tu as dit « oui » comme si c\'était un problème.');
      await say(g, 'andrea', 'Nedôverujem milým ľuďom, ktorí tu robia.', 'Je me méfie des gens gentils qui travaillent ici.', [['dôverovať', 'faire confiance']]);
      await say(g, 'katka', 'Ale otvoril bránu.', 'Il a quand même ouvert le portail.');
      await say(g, 'andrea', 'Viem. To ma práve trápi.', 'Je sais. C\'est ça qui m\'embête.', [['trápiť', 'tracasser']]);
      g.addCard('marek');
    }
  }
  async function giveBack(g) {
    if (g.flag('teplomer_spat')) return;
    if (g.has('meradlo')) { g.take('meradlo'); g.give('hak'); g.give('lano'); } else g.take('teplomer');
    g.setFlag('teplomer_spat');
    g.pose('mys6', 'b');
    await say(g, 'mys', 'Môj teplomer! Vrátili ste mi ho. Ste dobrí chlapci.', 'Mon thermomètre ! Vous me l\'avez rendu. Vous êtes de bons garçons.');
    await say(g, 'andrea', 'A dievčatá.', 'Et de bonnes filles.');
    g.pose('mys6', null);
  }
  async function leaveNight(g) {
    if (!g.flag('teplomer_spat')) {
      await say(g, 'katka', 'Pani myš sa pýta, kde je jej teplomer.', 'Madame la souris demande où est son thermomètre.');
      const i = await g.choice([{ sk: 'Vrátim ho.', fr: 'Je vais le rendre.' }, { sk: 'Neskôr. Ideme.', fr: 'Plus tard. On y va.' }]);
      if (i === 0) return;
      g.setFlag('teplomer_nevrateny');
    }
    await g.animate(1400, (k) => g.fade(k));
    g.goScene('zadok_rano');
  }

  // ================================================================== 3. derriere le batiment
  const RURA = { pipe: [1040, 375, 1215, 485], stream: [1140, 478, 1300, 610], river: [1790, 430, 2160, 712], win: [1003, 202, 1122, 283] };
  const POINTS = { rura: { p: [1130, 430], sk: 'rúra' }, teplomer: { p: [1238, 560], sk: 'teplomer' }, para: { p: [1460, 70], sk: 'para' }, vlna: { p: [400, 225], sk: 'zelená vlna' } };
  S.rura = {
    chapter: 'ch6', title: { sk: 'Za budovou', fr: 'Derrière le bâtiment' }, tint: ['#20305a', '#506a9a'],
    bg: 'art/za_budovou.webp', worldW: 2160,
    player: 'fox', floor: [[0, 575], [1760, 575], [1760, 712], [0, 712]], scale: { y0: 575, s0: 0.5, y1: 712, s1: 0.62 },
    sprites: [gab(250, 660), andrea(140, 1, 650), mato(420, 668, 1, 'count'), katka(560, 670, 1, 'type')],
    props: [{ img: 'art/item_meradlo.png', x: 1250, y: 610, w: 120, when: (g) => g.flag('meranie_rura') && !g.flag('video') }],
    ambient: [
      { imgs: ['art/rura_voda_a.png', 'art/rura_voda_b.png'], fps: 6, x: 1218, y: 535, w: 150, alpha: 0.85 },
      { img: 'art/para6_a.png', x: 0, y: 0, w: 90, cross: { from: [1170, 70], to: [1230, -120], dur: 6, every: 3 }, alpha: 0.6 },
      { img: 'art/para6_b.png', x: 0, y: 0, w: 110, cross: { from: [1460, 120], to: [1520, -110], dur: 7, every: 3.5 }, alpha: 0.6, phase: 1.5 }],
    overlay(c, g, E) {
      if (g.flag('video') && !g.flag('marek_zhasol')) drawImg(c, E, 'art/okno_marek.png', RURA.win[0], RURA.win[1], RURA.win[2] - RURA.win[0], RURA.win[3] - RURA.win[1]);
    },
    front(c, g, E) { rain(c, E, 0, 2160, 0.2); },
    hotspots: [
      { id: 'rura', name: { sk: 'hrubá rúra', fr: 'le gros tuyau' }, poly: box(RURA.pipe[0], RURA.pipe[1], RURA.pipe[2], RURA.pipe[3]), walk: [1120, 600],
        async onUse(g) {
          if (!g.flag('au')) { await hands(g); return; }
          await say(g, 'fox', 'Rúra zo steny. Voda je teplá. Ako vo vani.', 'Un tuyau qui sort du mur. L\'eau est tiède. Comme dans une baignoire.', [['rúra', 'le tuyau']]);
        } },
      { id: 'prud', name: { sk: 'voda z rúry', fr: 'l\'eau du tuyau' }, poly: box(RURA.stream[0], RURA.stream[1], RURA.stream[2], RURA.stream[3]), walk: [1180, 640],
        onItem: { meradlo: (g) => measure(g, 'rura'), teplomer: (g) => tooShort(g) },
        async onUse(g) { if (!g.flag('au')) { await hands(g); return; } await say(g, 'fox', 'Teplá voda. Treba to zmerať. Bez toho nám nikto neuverí.', 'De l\'eau tiède. Il faut la mesurer. Sinon, personne ne nous croira.', [['zmerať', 'mesurer']]); } },
      { id: 'rieka', name: { sk: 'rieka', fr: 'la rivière' }, poly: box(RURA.river[0], RURA.river[1], RURA.river[2], RURA.river[3]), walk: [1740, 680],
        onItem: { meradlo: (g) => measure(g, 'rieka'), teplomer: (g) => tooShort(g) },
        look: { sk: 'Rieka. Hnedá, rýchla, studená.', fr: 'La rivière. Brune, rapide, froide.', words: [['studený', 'froid']] } },
      { id: 'para', name: { sk: 'para na streche', fr: 'la vapeur sur le toit' }, poly: box(1090, 0, 1600, 120),
        async onUse(g) {
          if (!g.flag('au')) { await say(g, 'fox', 'Biely dym na streche. V daždi.', 'De la fumée blanche sur le toit. Sous la pluie.', [['dym', 'la fumée']]); return; }
          await say(g, 'katka', 'To nie je dym. To je para.', 'Ce n\'est pas de la fumée. C\'est de la vapeur.', [['para', 'la vapeur']]);
        } },
      { id: 'vlna', name: { sk: 'zelená vlna', fr: 'la vague verte' }, poly: box(195, 145, 560, 300),
        look: { sk: 'Zelená vlna. Aj vzadu. Aby ju videli ryby?', fr: 'La vague verte. Même à l\'arrière. Pour que les poissons la voient ?' } },
      { id: 'okno', name: { sk: 'okno na prvom poschodí', fr: 'la fenêtre du premier étage' }, poly: box(RURA.win[0], RURA.win[1], RURA.win[2], RURA.win[3]), when: (g) => g.flag('video') && !g.flag('marek_zhasol'),
        async onUse(g) {
          g.setFlag('marek_zhasol');
          await say(g, 'narrator', 'Z okna na prvom poschodí sa na nich pozerá Marek. Nič nepovie. Zhasne svetlo.', 'De la fenêtre du premier étage, Marek les regarde. Il ne dit rien. Il éteint la lumière.', [['poschodie', 'l\'étage'], ['zhasnúť', 'éteindre']]);
          g.addCard('marek_videl');
        } },
      { id: 'spat', name: { sk: 'na parkovisko', fr: 'vers le parking' }, poly: box(0, 380, 90, 712), walk: [80, 650],
        async onUse(g) { g.goScene('brana'); } },
      { id: 'katka', sprite: 'katka', name: { sk: 'Katka', fr: 'Katka' }, walk: [660, 660],
        async onUse(g) {
          if (g.flag('teplota') && !g.flag('video')) { await film(g); return; }
          await say(g, 'katka', g.flag('video') ? 'Video mám. Trikrát uložené.' : 'Mám batériu. Ak treba natáčať, povedz.', g.flag('video') ? 'J\'ai la vidéo. Sauvegardée trois fois.' : 'J\'ai de la batterie. S\'il faut filmer, dis-le.', [['natáčať', 'filmer']]);
        } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [250, 660],
        async onUse(g) { await say(g, 'andrea', 'Uzavretý okruh nevypúšťa vodu. A nerobí paru.', 'Un circuit fermé ne rejette pas d\'eau. Et il ne fait pas de vapeur.', [['uzavretý okruh', 'le circuit fermé']]); } },
      { id: 'mato', sprite: 'mato', name: { sk: 'Maťo', fr: 'Maťo' }, walk: [520, 668],
        async onUse(g) { await say(g, 'mato', 'Teplá voda zadarmo. Môžeme sa tu kúpať?', 'De l\'eau chaude gratuite. On peut se baigner ici ?', [['kúpať sa', 'se baigner']]); } },
    ],
    hints: [
      { id: 'c6_au', when: (g) => !g.flag('au'), levels: [{ sk: 'Gab si chce umyť ruky. Voda tečie z rúry.', fr: 'Gab veut se laver les mains. De l\'eau sort du tuyau.' }] },
      { id: 'c6_tyc', when: (g) => g.flag('au') && !g.has('meradlo') && !g.flag('teplota'), levels: [
        { sk: 'Treba zmerať teplotu. Máš teplomer od pani myši. Ale k vode je to ďaleko.', fr: 'Il faut mesurer la température. Tu as le thermomètre de madame la souris. Mais l\'eau est loin.' },
        { sk: 'Teplomer + hák + šnúra = meracia tyč. Spoj ich v inventári.', fr: 'Thermomètre + gaffe + corde = perche de mesure. Combine-les dans l\'inventaire.' } ] },
      { id: 'c6_meraj', when: (g) => g.has('meradlo') && !g.flag('teplota'), levels: [
        { sk: 'Dve merania: rieka a voda z rúry.', fr: 'Deux mesures : la rivière et l\'eau du tuyau.' } ] },
      { id: 'c6_film', when: (g) => g.flag('teplota') && !g.flag('video'), levels: [
        { sk: 'Katka musí natočiť video. Štyri veci v zábere: rúra, teplomer, para, zelená vlna.', fr: 'Katka doit filmer. Quatre choses dans le cadre : le tuyau, le thermomètre, la vapeur, la vague verte.' },
        { sk: 'Zmenši zoom (–), kým je všetko vnútri. Para je hore, vlna vľavo.', fr: 'Dézoome (–) jusqu\'à ce que tout soit dedans. La vapeur est en haut, la vague à gauche.' } ] },
      { id: 'c6_dead', when: (g) => g.flag('video_dead') && !g.flag('video'), levels: [{ sk: 'Batéria je prázdna. Marekovo auto má zapaľovač.', fr: 'La batterie est vide. La voiture de Marek a un allume-cigare.' }] },
    ],
    async onEnter(g) {
      if (g.flag('r0')) return;
      g.setFlag('r0');
      await say(g, 'narrator', 'Za budovou trčí zo steny hrubá rúra. Tečie z nej voda, do rieky.', 'Derrière le bâtiment, un gros tuyau sort du mur. De l\'eau en coule, vers la rivière.', [['trčať', 'dépasser, sortir']]);
    },
  };
  S.rura.hotspots.sort((a, b) => rank(a) - rank(b));

  (D.combos = D.combos || []).push(
    { a: 'hak', b: 'teplomer', async run(g) { await makePole(g); } },
    { a: 'lano', b: 'teplomer', async run(g) { await makePole(g); } },
    { a: 'hak', b: 'lano', async run(g) { await say(g, 'fox', 'Hák a šnúra. Ešte niečo na koniec…', 'La gaffe et la corde. Il manque quelque chose au bout…'); } },
  );
  async function makePole(g) {
    if (!g.has('hak') || !g.has('lano') || !g.has('teplomer')) { await say(g, 'fox', 'Teplomer na koniec tyče… Potrebujem hák aj šnúru.', 'Le thermomètre au bout d\'une perche… Il me faut la gaffe et la corde.'); return; }
    g.take('hak'); g.take('lano'); g.take('teplomer'); g.give('meradlo');
    await say(g, 'narrator', 'Gab priviaže teplomer šnúrou na koniec háku. Meracia tyč.', 'Gab attache le thermomètre au bout de la gaffe avec la corde. Une perche de mesure.', [['tyč', 'la perche']]);
  }
  async function tooShort(g) { await say(g, 'fox', 'Bez tyče nedočiahnem. A ruky si nespálim… ani nenamočím.', 'Sans perche, je n\'atteins pas. Et je ne vais pas me brûler… ni me mouiller les mains.'); }
  async function hands(g) {
    g.setFlag('au');
    await g.walk('fox', 1180, 630);
    g.pose('fox', 'pick');
    await say(g, 'fox', 'Au!', 'Aïe !');
    g.pose('fox', null);
    await say(g, 'katka', 'Čo?', 'Quoi ?');
    await say(g, 'fox', 'Je teplá!', 'Elle est chaude !', [['teplý', 'chaud, tiède']]);
    await say(g, 'katka', 'Teplá?', 'Chaude ?');
    await say(g, 'fox', 'Vlažná. Ako vo vani.', 'Tiède. Comme dans une baignoire.', [['vlažný', 'tiède'], ['vaňa', 'la baignoire']]);
    await say(g, 'narrator', 'Katka zdvihne hlavu. Na streche, v studenom daždi, stúpa hustý biely dym.', 'Katka lève la tête. Sur le toit, sous la pluie froide, une épaisse fumée blanche monte.');
    g.pose('katka', 'point');
    await say(g, 'katka', 'To nie je dym. To je para.', 'Ce n\'est pas de la fumée. C\'est de la vapeur.', [['para', 'la vapeur']]);
    g.pose('katka', null);
    await say(g, 'andrea', 'Uzavretý okruh nevypúšťa vodu. A nerobí paru.', 'Un circuit fermé ne rejette pas d\'eau. Et il ne fait pas de vapeur.', [['vypúšťať', 'rejeter, laisser sortir']]);
    await say(g, 'fox', 'Nula litrov.', 'Zéro litre.');
    g.addCard('para');
    await say(g, 'andrea', 'Ale „teplá“ nestačí. Koľko stupňov? Treba to zmerať.', 'Mais « chaude », ça ne suffit pas. Combien de degrés ? Il faut mesurer.', [['stupeň', 'le degré']]);
  }
  async function measure(g, where) {
    if (where === 'rieka') {
      g.setFlag('meranie_rieka');
      await say(g, 'narrator', 'Gab ponorí teplomer do rieky. Červená čiarka klesne. Deväť stupňov.', 'Gab plonge le thermomètre dans la rivière. Le trait rouge descend. Neuf degrés.', [['deväť', 'neuf'], ['klesnúť', 'descendre']]);
    } else {
      g.setFlag('meranie_rura');
      await say(g, 'narrator', 'Gab podrží teplomer pod rúrou. Červená čiarka stúpa… stúpa… Tridsaťjeden stupňov.', 'Gab tient le thermomètre sous le tuyau. Le trait rouge monte… monte… Trente et un degrés.', [['tridsaťjeden', 'trente et un']]);
    }
    if (!g.flag('meranie_rieka') || !g.flag('meranie_rura') || g.flag('teplota')) return;
    for (;;) {
      await say(g, 'andrea', 'Rieka: deväť. Rúra: tridsaťjeden. Takže voda z rúry je…', 'La rivière : neuf. Le tuyau : trente et un. Donc l\'eau du tuyau est…');
      const i = await g.choice([{ sk: '… studenšia.', fr: '… plus froide.' }, { sk: '… rovnaká.', fr: '… pareille.' }, { sk: '… teplejšia.', fr: '… plus chaude.' }], { noFr: true });
      if (i === 2) break;
      await say(g, 'katka', 'Tridsaťjeden je viac ako deväť. Aj v Bratislave.', 'Trente et un, c\'est plus que neuf. Même à Bratislava.');
    }
    await say(g, 'fox', 'Teplejšia. O dvadsaťdva stupňov. Niečo ju ohrieva. Servery.', 'Plus chaude. De vingt-deux degrés. Quelque chose la chauffe. Les serveurs.', [['teplejší', 'plus chaud'], ['ohrievať', 'chauffer']]);
    g.setFlag('teplota'); g.addCard('teplota');
    if (!g.flag('meranie_rura')) g.setFlag('meranie_rura');
    await say(g, 'andrea', 'Katka. Natoč to. Všetko naraz.', 'Katka. Filme ça. Tout en même temps.', [['natočiť', 'filmer']]);
    await film(g);
  }

  // le cadrage de la video : quatre choses doivent entrer dans le cadre du telephone
  const VK = 1200 / 2160, VX = 40, VY = 150, ZOOMS = [500, 800, 1100, 1300];
  const videoPanel = {
    draw(c, st, E) {
      c.fillStyle = 'rgba(8,10,20,.94)'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#e8eef8'; c.font = '700 26px system-ui'; c.textAlign = 'center';
      c.fillText('Natoč video: rúra, teplomer, para, zelená vlna', W / 2, 60);
      if (E.showFr) { c.fillStyle = '#9aa6c0'; c.font = 'italic 17px system-ui'; c.fillText('Filme : le tuyau, le thermomètre, la vapeur, la vague verte. Clique pour placer le cadre.', W / 2, 90); }
      const im = E.img('art/za_budovou.webp');
      if (im && im.naturalWidth) c.drawImage(im, VX, VY, 2160 * VK, 720 * VK);
      drawImg(c, E, 'art/item_meradlo.png', VX + 1190 * VK, VY + 545 * VK, 120 * VK);
      const fw = ZOOMS[st.z], fh = Math.min(720, fw * 9 / 16);
      const x0 = st.cx - fw / 2, y0 = st.cy - fh / 2;
      c.fillStyle = 'rgba(0,0,0,.45)';
      c.fillRect(VX, VY, 2160 * VK, 720 * VK);
      if (im && im.naturalWidth) c.drawImage(im, x0 / 2160 * im.naturalWidth, y0 / 720 * im.naturalHeight, fw / 2160 * im.naturalWidth, fh / 720 * im.naturalHeight, VX + x0 * VK, VY + y0 * VK, fw * VK, fh * VK);
      drawImg(c, E, 'art/item_meradlo.png', VX + 1190 * VK, VY + 545 * VK, 120 * VK);
      c.strokeStyle = '#ff4a4a'; c.lineWidth = 3; c.strokeRect(VX + x0 * VK, VY + y0 * VK, fw * VK, fh * VK);
      c.fillStyle = '#ff4a4a'; c.beginPath(); c.arc(VX + x0 * VK + 16, VY + y0 * VK + 16, 6, 0, 7); c.fill();
      // boutons
      for (const b of this.btns()) {
        c.fillStyle = b.id === 'rec' ? '#c03030' : '#3a4a6a'; c.fillRect(b.x, b.y, b.w, b.h);
        c.fillStyle = '#fff'; c.font = '700 24px system-ui'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(b.t, b.x + b.w / 2, b.y + b.h / 2 + 1);
      }
      c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    },
    btns() { return [{ id: 'out', t: '−', x: 380, y: 640, w: 80, h: 56 }, { id: 'in', t: '+', x: 480, y: 640, w: 80, h: 56 }, { id: 'rec', t: '● Natočiť', x: 600, y: 640, w: 220, h: 56 }, { id: 'esc', t: 'Späť', x: 840, y: 640, w: 120, h: 56 }]; },
    async click(p, st, g) {
      if (st.busy) return null;
      const b = this.btns().find((q) => p[0] >= q.x && p[0] <= q.x + q.w && p[1] >= q.y && p[1] <= q.y + q.h);
      const fw = () => ZOOMS[st.z], fh = () => Math.min(720, fw() * 9 / 16);
      const clamp = () => { st.cx = Math.max(fw() / 2, Math.min(2160 - fw() / 2, st.cx)); st.cy = Math.max(fh() / 2, Math.min(720 - fh() / 2, st.cy)); };
      if (!b) {
        if (p[0] >= VX && p[0] <= VX + 2160 * VK && p[1] >= VY && p[1] <= VY + 720 * VK) { st.cx = (p[0] - VX) / VK; st.cy = (p[1] - VY) / VK; clamp(); }
        return null;
      }
      if (b.id === 'esc') return { done: false };
      if (b.id === 'out') { st.z = Math.min(ZOOMS.length - 1, st.z + 1); clamp(); return null; }
      if (b.id === 'in') { st.z = Math.max(0, st.z - 1); clamp(); return null; }
      st.busy = true;
      try {
        const x0 = st.cx - fw() / 2, y0 = st.cy - fh() / 2;
        const missing = Object.values(POINTS).filter((q) => !(q.p[0] >= x0 && q.p[0] <= x0 + fw() && q.p[1] >= y0 && q.p[1] <= y0 + fh()));
        if (missing.length) {
          await g.say('katka', 'V zábere chýba: ' + missing.map((q) => q.sk).join(', ') + '.', 'Il manque dans le cadre : ' + missing.map((q) => ({ rúra: 'le tuyau', teplomer: 'le thermomètre', para: 'la vapeur', 'zelená vlna': 'la vague verte' })[q.sk]).join(', ') + '.', [['záber', 'le cadre (photo, vidéo)'], ['chýbať', 'manquer']]);
          return null;
        }
        if (!g.drain(1)) { st.dead = true; return { done: false }; }
        return { done: true };
      } finally { st.busy = false; }
    },
  };
  async function film(g) {
    g.pose('katka', 'film');
    const st = { z: 0, cx: 1130, cy: 430 };
    const ok = await g.openPanel(videoPanel, st);
    g.pose('katka', null);
    if (st.dead) {
      g.setFlag('video_dead');
      g.pose('katka', 'stunned');
      await say(g, 'katka', 'Nie! Vybitý. Ani jedna čiarka.', 'Non ! À plat. Plus une seule barre.', [['vybitý', 'à plat']]);
      g.pose('katka', null);
      await say(g, 'mato', 'Marek má v aute zapaľovač.', 'Marek a un allume-cigare dans sa voiture.');
      return;
    }
    if (!ok) { await say(g, 'katka', 'Dobre. Keď budeš chcieť, natočím.', 'D\'accord. Quand tu veux, je filme.'); return; }
    g.setFlag('video'); g.sfx('photo');
    await say(g, 'narrator', 'Katka to natáča. Rúru, teplomer pod ňou, paru, stenu so zelenou vlnou.', 'Katka filme. Le tuyau, le thermomètre dessous, la vapeur, le mur avec la vague verte.');
    g.addCard('video');
    await say(g, 'narrator', 'Dôkaz číslo päť: video. Uzavretý okruh, ktorý vypúšťa teplú vodu.', 'Pièce n° 5 : la vidéo. Un circuit fermé qui rejette de l\'eau chaude.', [['dôkaz', 'la preuve']]);
    await say(g, 'andrea', 'Hore. Pozri. Prvé poschodie.', 'En haut. Regarde. Le premier étage.');
  }

  // ================================================================== 4. derriere la bergerie, vendredi matin
  const BETON = { x: 1083, y: 642, w: 450 };
  const cmpPanel = {
    draw(c, st, E) {
      c.fillStyle = 'rgba(10,12,22,.93)'; c.fillRect(0, 0, W, H);
      c.textAlign = 'center'; c.textBaseline = 'middle';
      const card = (x, title, fr, days, vals, hi) => {
        c.fillStyle = '#f4f5f8'; c.fillRect(x, 150, 560, 300);
        c.fillStyle = '#333a44'; c.font = '700 24px system-ui'; c.fillText(title, x + 280, 185);
        if (E.showFr) { c.fillStyle = '#778'; c.font = 'italic 16px system-ui'; c.fillText(fr, x + 280, 212); }
        const cw = 560 / days.length;
        days.forEach((d, i) => {
          c.strokeStyle = '#99a'; c.lineWidth = 1.5; c.strokeRect(x + i * cw, 260, cw, 60); c.strokeRect(x + i * cw, 320, cw, 80);
          c.fillStyle = '#333a44'; c.font = '700 22px system-ui'; c.fillText(d, x + i * cw + cw / 2, 290);
          if (hi === i) { c.fillStyle = 'rgba(255,214,90,.8)'; c.fillRect(x + i * cw + 2, 322, cw - 4, 76); }
          c.fillStyle = '#222'; c.font = '700 30px system-ui'; c.fillText(String(vals[i]), x + i * cw + cw / 2, 360);
        });
      };
      card(60, '📸 Screenshot (štvrtok)', 'Capture d\'écran (jeudi)', ['po', 'ut', 'st', 'št'], [42, 41, 43, 42], st.a ? 3 : -1);
      card(660, '🌐 Web dnes (piatok)', 'Le site aujourd\'hui (vendredi)', ['po', 'ut', 'st', 'št', 'pi'], [9, 10, 11, 12, 18], st.b ? 3 : -1);
      c.fillStyle = '#e8eef8'; c.font = '700 26px system-ui';
      const q = !st.b ? ['Nový web: koľko bolo včera? Klikni.', 'Le nouveau site : combien hier ? Clique.'] : !st.a ? ['A na screenshote, včera?', 'Et sur la capture, hier ?'] : ['', ''];
      c.fillText(q[0], W / 2, 520);
      if (E.showFr && q[1]) { c.fillStyle = '#9aa6c0'; c.font = 'italic 18px system-ui'; c.fillText(q[1], W / 2, 555); }
      c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    },
    async click(p, st, g) {
      if (st.busy) return null;
      st.busy = true;
      try {
        const inRow = p[1] >= 320 && p[1] <= 400;
        if (!st.b) {
          const i = Math.floor((p[0] - 660) / 112);
          if (!inRow || p[0] < 660 || i < 0 || i > 4) return null;
          if (i !== 3) { g.toast('Dnes je piatok. Včera bol…?', 'Aujourd\'hui, c\'est vendredi. Hier, c\'était… ?'); return null; }
          st.b = true;
          await g.say('katka', 'Dnes: osemnásť centimetrov. Včera: dvanásť.', 'Aujourd\'hui : dix-huit centimètres. Hier : douze.', [['osemnásť', 'dix-huit'], ['dvanásť', 'douze']]);
          return null;
        }
        const i = Math.floor((p[0] - 60) / 140);
        if (!inRow || p[0] < 60 || i < 0 || i > 3) return null;
        if (i !== 3) { g.toast('Včera bol štvrtok.', 'Hier, c\'était jeudi.'); return null; }
        st.a = true;
        await g.say('fox', 'Na screenshote: štyridsaťdva. Na webe: dvanásť. Ten istý deň!', 'Sur la capture : quarante-deux. Sur le site : douze. Le même jour !');
        await g.say('katka', 'Všetko zmenili. Celý rok.', 'Ils ont tout changé. Toute l\'année.', [['zmeniť', 'changer']]);
        return { done: true };
      } finally { st.busy = false; }
    },
  };
  S.zadok_rano = {
    chapter: 'ch6', title: { sk: 'Za salašom, piatok ráno', fr: 'Derrière la bergerie, vendredi matin' }, tint: ['#9ab8d0', '#e0c090'],
    bg: 'art/dedina_zadok.webp', worldW: 2160,
    player: 'fox', floor: [[0, 520], [2160, 520], [2160, 712], [0, 712]], scale: { y0: 520, s0: 0.46, y1: 712, s1: 0.62 },
    sprites: [gab(300, 640), andrea(420, 1, 628), mato(1400, 640, -1, 'scratch'), katka(1560, 632, -1, 'type')],
    props: [
      { img: 'art/obj_beton.png', x: BETON.x, y: BETON.y, w: BETON.w, when: (g) => !g.flag('labka') },
      { img: 'art/obj_beton_labka.png', x: BETON.x, y: BETON.y, w: BETON.w, when: (g) => g.flag('labka') },
    ],
    ambient: [{ sweep: { area: [950, 250, 2160, 520], period: 15, a: 0.08 } }],
    hotspots: [
      { id: 'beton', name: { sk: 'betón', fr: 'le béton' }, poly: box(860, 535, 1305, 642), walk: [1080, 660],
        async onUse(g) {
          if (!g.flag('beton_seen')) {
            g.setFlag('beton_seen');
            await say(g, 'narrator', 'Za salašom už nie je poklop OPTIKA. Na jeho mieste je sivý štvorec betónu. Je ešte mäkký.', 'Derrière la bergerie, la plaque OPTIKA a disparu. À sa place, un carré de béton gris. Il est encore mou.', [['betón', 'le béton'], ['mäkký', 'mou']]);
            await say(g, 'fox', 'Dnes v noci. Počas povodne.', 'Cette nuit. Pendant l\'inondation.', [['počas', 'pendant']]);
            g.addCard('beton');
            return;
          }
          if (!g.flag('labka')) {
            g.setFlag('labka');
            g.pose('fox', 'pick');
            await say(g, 'narrator', 'Gab pritlačí labku do mäkkého betónu. Raz bude tvrdý. Labka zostane.', 'Gab appuie sa patte dans le béton mou. Un jour il sera dur. La patte restera.', [['labka', 'la patte'], ['tvrdý', 'dur']]);
            g.pose('fox', null);
            return;
          }
          await say(g, 'fox', 'Moja labka. Navždy.', 'Ma patte. Pour toujours.', [['navždy', 'pour toujours']]);
        } },
      { id: 'katka', sprite: 'katka', name: { sk: 'Katka', fr: 'Katka' }, walk: [1460, 640],
        async onUse(g) {
          if (!g.flag('beton_seen')) { await say(g, 'katka', 'Maťo nám chce niečo ukázať. Tam, pri salaši.', 'Maťo veut nous montrer quelque chose. Là, près de la bergerie.'); return; }
          if (!g.flag('web_zmena')) { await compareWeb(g); return; }
          await say(g, 'katka', 'Screenshoty sú v bezpečí. V troch mrakoch.', 'Les captures sont à l\'abri. Dans trois clouds.', [['mrak', 'le nuage, le cloud']]);
        } },
      { id: 'mato', sprite: 'mato', name: { sk: 'Maťo', fr: 'Maťo' }, walk: [1300, 640],
        async onUse(g) {
          if (!g.flag('beton_seen')) { await say(g, 'mato', 'Poďte sa pozrieť. Na poklop.', 'Venez voir. La plaque.'); return; }
          g.pose('mato', 'scratch'); await say(g, 'mato', 'Kto to bol? Kto vedel o poklope?', 'C\'était qui ? Qui savait pour la plaque ?'); g.pose('mato', null);
        } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [520, 640],
        async onUse(g) { await say(g, 'andrea', 'Niekto im to povedal. Včera. Rýchlo.', 'Quelqu\'un le leur a dit. Hier. Vite.'); } },
      { id: 'spat', name: { sk: 'späť do dediny', fr: 'retour au village' }, poly: box(0, 380, 110, 712),
        look: { sk: 'Najprv to musíme pochopiť.', fr: 'D\'abord, il faut comprendre.' } },
    ],
    hints: [
      { id: 'c6_beton', when: (g) => !g.flag('beton_seen'), levels: [{ sk: 'Čo sa stalo s poklopom?', fr: 'Qu\'est-il arrivé à la plaque ?' }] },
      { id: 'c6_web', when: (g) => g.flag('beton_seen') && !g.flag('web_zmena'), levels: [
        { sk: 'Katka chce ukázať web.', fr: 'Katka veut montrer le site.' },
        { sk: 'Dnes je piatok, včera bol štvrtok (št).', fr: 'Aujourd\'hui c\'est vendredi, hier c\'était jeudi (št).' } ] },
    ],
    async onEnter(g) {
      if (g.flag('zr0')) return;
      g.setFlag('zr0');
      await g.animate(1200, (k) => g.fade(1 - k));
      await say(g, 'narrator', 'Piatok ráno. Voda klesá. Vracajú sa do dediny, unavení a plní blata.', 'Vendredi matin. L\'eau baisse. Ils rentrent au village, fatigués et pleins de boue.', [['piatok', 'vendredi'], ['ráno', 'le matin'], ['klesať', 'baisser']]);
      await say(g, 'mato', 'Poďte sa pozrieť.', 'Venez voir.');
    },
  };
  S.zadok_rano.hotspots.sort((a, b) => rank(a) - rank(b));

  async function compareWeb(g) {
    await say(g, 'katka', 'Počkajte. Web.', 'Attendez. Le site.');
    await say(g, 'andrea', 'Čo?', 'Quoi ?');
    g.pose('katka', 'show');
    await say(g, 'katka', 'Čísla. Hýbu sa.', 'Les chiffres. Ils bougent.', [['hýbať sa', 'bouger']]);
    g.pose('katka', null);
    const ok = await g.openPanel(cmpPanel, {});
    if (!ok) return;
    g.setFlag('web_zmena'); g.addCard('web_zmena');
    await say(g, 'fox', 'Ale ty máš screenshoty!', 'Mais tu as les captures !');
    await say(g, 'katka', 'Mám screenshoty.', 'J\'ai les captures.');
    await say(g, 'narrator', 'Maťo sa pozerá na svoje nohy.', 'Maťo regarde ses pieds.');
    await g.askBoard('q_kto');
    g.addCard('starosta_kecal');
    await saturday(g);
  }
  async function saturday(g) {
    g.pose('katka', 'call');
    await say(g, 'katka', 'Ešte niečo. Zajtra večer, v sobotu, v televízii. Naživo z Bratislavského hradu.', 'Encore un truc. Demain soir, samedi, à la télé. En direct du château de Bratislava.', [['sobota', 'samedi'], ['naživo', 'en direct'], ['hrad', 'le château']]);
    await say(g, 'katka', '„Zelená firma roka.“ Hádajte, kto vyhrá.', '« L\'entreprise verte de l\'année. » Devinez qui va gagner.', [['vyhrať', 'gagner']]);
    g.pose('katka', null);
    await say(g, 'fox', 'Nie.', 'Non.');
    await say(g, 'katka', 'Áno.', 'Si.');
    await say(g, 'andrea', 'Zajtra večer. Pozerá celá krajina.', 'Demain soir. Tout le pays regarde.', [['krajina', 'le pays']]);
    await say(g, 'mato', 'A my?', 'Et nous ?');
    await say(g, 'andrea', 'My máme fotku, screenshoty a video. To nestačí. Povedia, že sú to deti s mobilom.', 'Nous, on a une photo, des captures et une vidéo. Ça ne suffit pas. Ils diront que ce sont des gamins avec un portable.', [['nestačiť', 'ne pas suffire']]);
    await say(g, 'fox', 'Čo potrebujeme?', 'De quoi on a besoin ?', [['potrebovať', 'avoir besoin']]);
    await say(g, 'andrea', 'Niekoho, kto vie čítať čísla. A niekoho zvnútra.', 'De quelqu\'un qui sait lire les chiffres. Et de quelqu\'un de l\'intérieur.', [['zvnútra', 'de l\'intérieur']]);
    g.addCard('treba_cisla'); g.addCard('treba_vnutri');
    await say(g, 'fox', 'Poznáš niekoho, kto vie čítať čísla?', 'Tu connais quelqu\'un qui sait lire les chiffres ?');
    await say(g, 'andrea', 'Tú, ktorá ma naučila merať. Mala stanicu na potoku, pred senzormi. Poslali ju do Banskej Štiavnice.', 'Celle qui m\'a appris à mesurer. Elle avait une station sur le ruisseau, avant les capteurs. On l\'a envoyée à Banská Štiavnica.');
    await say(g, 'fox', 'A niekoho zvnútra?', 'Et quelqu\'un de l\'intérieur ?');
    await say(g, 'narrator', 'Andrea sa pozerá dole, na sivú budovu.', 'Andrea regarde en bas, vers le bâtiment gris.');
    await say(g, 'andrea', 'Uvidíme.', 'On verra.');
    if (g.flag('teplomer_nevrateny')) await say(g, 'katka', 'Mimochodom, pani myš mi píše. Tretíkrát. „Kde je môj teplomer?“', 'Au fait, madame la souris m\'écrit. Pour la troisième fois. « Où est mon thermomètre ? »');
    g.setFlag('ch6_done');
    await g.animate(1500, (k) => g.fade(k));
    await g.showMap('ch7');
    g.end('Koniec ukážky · kapitola 7 čoskoro', 'Fin de l\'aperçu · le chapitre 7 arrive bientôt');
  }
})();
