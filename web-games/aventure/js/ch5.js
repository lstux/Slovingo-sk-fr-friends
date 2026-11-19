// Zajko Quest v2 « Circuit fermé » : chapitre 5 « Štyridsaťdva centimetrov » (le village, jeudi midi). Conception : docs/Jeu-conception-v2.md, section 7.
// Scenes : le ruisseau a sec et le pre (dedina), la cuisine de Babka (kuchyna5), derriere la bergerie (zadok).
// Dialogues repris de docs/Histoire-v2.md (kapitola 5). Charge apres ch4.js. Textes slovaques : premiere ecriture, a relire par un natif.
(function () {
  const D = globalThis.ZG_DATA, L = globalThis.ZG_LIB;
  const { gab, andrea, box, say, W, H } = L;
  const S = D.scenes;

  // ------------------------------------------------------------------ personnages, objets, cartes
  Object.assign(D.characters, {
    mato: { name: 'Maťo', icon: '🐻', color: '#a0582a' },
    katka: { name: 'Katka', icon: '🐹', color: '#8a5ab0' },
    zuzana: { name: 'Babka Zuzana', icon: '🐑', color: '#b04a4a' },
    starosta: { name: 'Starosta', icon: '🧑', color: '#8a7a4a' },
    kozol: { name: 'Starý cap', icon: '🐐', color: '#7a6a5a' },
  });
  Object.assign(D.items, {
    list: { sk: 'list kapusty', fr: 'la feuille de chou', icon: 'art/item_list.png' },
    pohar: { sk: 'pohár', fr: 'le verre', icon: 'art/item_pohar.png' },
    nabijacka: { sk: 'nabíjačka', fr: 'le chargeur', icon: 'art/item_nabijacka.png' },
  });
  D.preload = (D.preload || []).concat(['art/web_fond.webp', 'art/obj_halusky_a.png', 'art/obj_halusky_b.png', 'art/obj_halusky_c.png',
    'art/budka_a.png', 'art/budka_b.png', 'art/auto_starosta_a.png', 'art/auto_starosta_b.png', 'art/item_uzlik.png']);
  Object.assign(D.board.cards, {
    sucho: { icon: '☀️', sk: 'Podozrivý: sucho', fr: 'Suspect : la sécheresse' },
    ruka: { icon: '✋', sk: 'Po búrke, na obed: v potoku sú suché kamene', fr: 'Après l\'orage, à midi : des pierres sèches dans le ruisseau' },
    krabicka: { icon: '📦', sk: 'U Babky je optika v malej krabičke', fr: 'Chez Babka, la fibre tient dans une petite boîte' },
    sused: { icon: '🏘️', sk: 'Sused robí v sivej budove. Každý večer je doma.', fr: 'Le voisin travaille au bâtiment gris. Il rentre tous les soirs.' },
    poklop: { icon: '👂', sk: 'Pod poklopom OPTIKA tečie voda', fr: 'Sous la plaque OPTIKA, de l\'eau coule' },
    web42: { icon: '📱', sk: 'Web sivej budovy: dnes 42 cm vody v potoku', fr: 'Le site du bâtiment gris : aujourd\'hui 42 cm d\'eau dans le ruisseau' },
    web_kopia: { icon: '📋', sk: 'Každý týždeň tie isté čísla. Už rok.', fr: 'Chaque semaine, les mêmes chiffres. Depuis un an.' },
    starosta: { icon: '🚗', sk: 'Starosta: „Zavolám správnym ľuďom.“', fr: 'Le maire : « Je vais appeler les bonnes personnes. »' },
  });
  D.board.questions.q_cisla = {
    sk: 'Sú čísla na webe pravdivé?', fr: 'Les chiffres du site sont-ils vrais ?',
    pairs: [['web42', 'ruka'], ['web_kopia', 'ruka']],
    ok: [
      { who: 'fox', sk: 'Web hovorí: štyridsaťdva centimetrov. Moja ruka hovorí: suché kamene.', fr: 'Le site dit : quarante-deux centimètres. Ma main dit : des pierres sèches.' },
      { who: 'katka', sk: 'Takže web klame. A rok ten istý týždeň.', fr: 'Donc le site ment. Et la même semaine depuis un an.', words: [['klamať', 'mentir']] },
      { who: 'andrea', sk: 'Nie je to sucho. Niekto to prepisuje.', fr: 'Ce n\'est pas la sécheresse. Quelqu\'un recopie les chiffres.', words: [['prepisovať', 'recopier']] },
    ],
    ko: [
      { who: 'fox', sk: 'Hmm… To spolu nesúvisí.', fr: 'Hmm… ça n\'a rien à voir.' },
      { who: 'katka', sk: 'Čo hovorí web? A čo si videl na vlastné oči?', fr: 'Qu\'est-ce que dit le site ? Et qu\'est-ce que tu as vu de tes propres yeux ?' },
      { who: 'andrea', sk: 'Čísla z webu… a tvoja ruka v potoku.', fr: 'Les chiffres du site… et ta main dans le ruisseau.' },
    ],
  };

  // ------------------------------------------------------------------ outils
  const mk = (id, prefix, poses, ref, hh, x, y, face, base, extra) => Object.assign({
    id, img: `art/${prefix}${base}.png`, x, y, h: poses[base] * hh / ref, face: face || 1,
    poses: Object.fromEntries(Object.entries(poses).map(([k, h]) => [k, { img: `art/${prefix}${k}.png`, h: h * hh / ref }])),
  }, extra || {});
  // hauteurs natives des images (tools/cut_v2.py ch5) ; les planches regardent vers la droite
  const MATO = { count: 344, scratch: 349, pull: 319, listen: 223, shh: 345, eat: 356, cheer: 352, belly: 342 };
  const KATKA = { type: 345, film: 346, call: 351, point: 351, silent: 346, show: 348, charge: 280, stunned: 350 };
  const ZUZ = { stir: 348, spoon: 347, ladle: 343, back: 345, laugh: 357, glass: 357, arms: 357, wave: 356 };
  const STAR = { open: 352, phone: 348, thumb: 350, pat: 329, walk: 351, wipe: 351, shake: 352, car: 335 };
  const mato = (x, y, face, pose, extra) => mk('mato', 'mato_', MATO, 350, 500, x, y, face, pose || 'count', extra);
  const katka = (x, y, face, pose, extra) => mk('katka', 'katka_', KATKA, 348, 420, x, y, face, pose || 'type', extra);
  const zuzana = (x, y, face) => mk('zuzana', 'zuz_', ZUZ, 355, 450, x, y, face, 'stir', { alt: { pose: 'back', min: 4, max: 7, hold: [2.4, 3.4] } });
  const starosta = (x, y) => mk('starosta', 'starosta_', STAR, 350, 470, x, y, -1, 'open', { hidden: true });
  const twoPose = (id, a, b, x, y, h, alt, extra) => Object.assign({ id, img: `art/${a}.png`, x, y, h, abs: true, face: 1, poses: { b: { img: `art/${b}.png`, h } }, alt: Object.assign({ pose: 'b', min: 3, max: 6, hold: [1.5, 3] }, alt || {}) }, extra || {});
  Object.assign(L, { mato5: mato, katka5: katka, twoPose5: twoPose, mk5: mk });   // pour les chapitres suivants
  const FLOOR_OUT = [[0, 520], [2160, 520], [2160, 712], [0, 712]], SCALE_OUT = { y0: 520, s0: 0.46, y1: 712, s1: 0.62 };
  const rank = (h) => (h.sprite ? 0 : h.top ? 2 : 1);
  const joined = (g) => g.flag('mato_in') && g.flag('katka_in');
  const smoke = (x, y) => ({ imgs: ['art/fum_a.png', 'art/fum_b.png'], fps: 1.5, x, y, w: 40, alpha: 0.7, puff: { w1: 90, life: 5, every: 1.7, rise: 120, drift: 30 } });
  const butterfly = (from, to) => ({ imgs: ['art/motyl5_a.png', 'art/motyl5_b.png'], fps: 6, x: 0, y: 0, w: 34, cross: { from, to, dur: 14, every: 9, arc: 40 }, bob: { amp: 6, speed: 5 } });

  // ------------------------------------------------------------------ le site du batiment gris : une semaine posee sur l'autre
  const WF = 1180 / 1672, WX = 50, WY = 28;
  const COLS = [40, 245, 442, 638, 835, 1032, 1228, 1430, 1632].map((x) => WX + x * WF);
  const ROWS = [228, 302, 375, 450, 522].map((y) => WY + y * WF);
  const DAYS = ['po', 'ut', 'st', 'št', 'pi', 'so', 'ne'];
  const WEEK = [42, 41, 43, 42, 41, 42, 43];
  const NOW = [42, 41, 43, 42, '–', '–', '–'];   // dnes je stvrtok
  const LABELS = [['tento týždeň', 'cette semaine'], ['minulý týždeň', 'la semaine dernière'], ['pred 2 týždňami', 'il y a 2 semaines']];
  const cellText = (c, t, x0, x1, y0, y1, col, font) => { c.fillStyle = col; c.font = font; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(String(t), (x0 + x1) / 2, (y0 + y1) / 2); };
  const webPanel = {
    draw(c, st, E) {
      c.fillStyle = 'rgba(10,12,22,.92)'; c.fillRect(0, 0, W, H);
      const im = E.img('art/web_fond.webp');
      if (im && im.naturalWidth) c.drawImage(im, WX, WY, 1672 * WF, 941 * WF);
      c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillStyle = '#333a44'; c.font = '700 26px system-ui, sans-serif'; c.fillText('Zelená vlna · Hladina potoka', WX + 190, WY + 50);
      c.fillStyle = '#556'; c.font = 'italic 17px system-ui'; c.fillText('„Naše údaje sú transparentné.“' + (E.showFr ? '  (« Nos données sont transparentes. »)' : ''), WX + 190, WY + 84);
      DAYS.forEach((d, i) => cellText(c, d, COLS[i + 1], COLS[i + 2], ROWS[0], ROWS[1], '#333a44', '700 22px system-ui'));
      const k = st.slideT ? Math.min(1, (E.t - st.slideT) / 1) : 0;
      for (let r = 0; r < 3; r++) {
        if (r > 0 && !st.step) continue;
        let y0 = ROWS[r + 1], y1 = ROWS[r + 2];
        const moving = r === 1 && st.slideT;
        if (moving) { const d = (ROWS[1] - ROWS[2]) * k; y0 += d; y1 += d; }
        cellText(c, LABELS[r][0], COLS[0], COLS[1], y0, y1, moving ? '#c05a00' : '#333a44', '600 17px system-ui');
        (r === 0 ? NOW : WEEK).forEach((v, i) => {
          const hi = st.step === 2 && st.wed && r === 0 && i === 2;
          if (hi) { c.fillStyle = 'rgba(255,214,90,.75)'; c.fillRect(COLS[i + 1] + 3, y0 + 3, COLS[i + 2] - COLS[i + 1] - 6, y1 - y0 - 6); }
          if (moving && k > 0) { c.fillStyle = `rgba(255,170,60,${0.25 + 0.25 * k})`; c.fillRect(COLS[i + 1] + 3, y0 + 3, COLS[i + 2] - COLS[i + 1] - 6, y1 - y0 - 6); }
          cellText(c, v, COLS[i + 1], COLS[i + 2], y0, y1, moving ? '#c05a00' : '#222', '700 26px system-ui');
          if (st.merged && r === 0 && i < 4) cellText(c, '✓', COLS[i + 2] - 22, COLS[i + 2] - 4, y0, y0 + 20, '#1a9a3a', '700 18px system-ui');
        });
      }
      // le cadre bleu : la mesure du jour
      cellText(c, 'Dnes, štvrtok: 42 cm', WX + 44 * WF, WX + 1628 * WF, WY + 578 * WF, WY + 704 * WF, '#1a5ab0', '700 40px system-ui');
      const tip = !st.step ? ['Klikni.', 'Clique.'] : st.step === 1 ? ['Prilož minulý týždeň na tento týždeň.', 'Pose la semaine dernière sur cette semaine.'] : ['Včera, počas búrky? Klikni na včerajší deň.', 'Hier, pendant l\'orage ? Clique sur le jour d\'hier.'];
      cellText(c, tip[0], WX + 44 * WF, WX + 1628 * WF, WY + 704 * WF, WY + (E.showFr ? 790 : 826) * WF, '#333a44', '600 22px system-ui');
      if (E.showFr) cellText(c, tip[1], WX + 44 * WF, WX + 1628 * WF, WY + 770 * WF, WY + 826 * WF, '#6a6a8a', 'italic 17px system-ui');
      c.textAlign = 'left'; c.textBaseline = 'alphabetic';
    },
    async click(p, st, g, E) {
      if (st.busy) return null;
      st.busy = true;
      try {
        if (!st.step) {
          st.step = 1;
          await g.say('katka', 'Dnes: štyridsaťdva centimetrov vody.', 'Aujourd\'hui : quarante-deux centimètres d\'eau.', [['centimeter', 'le centimètre']]);
          await g.say('fox', 'Štyridsaťdva centimetrov. Mali by sme mať vodu po kolená.', 'Quarante-deux centimètres. On devrait avoir de l\'eau jusqu\'aux genoux.', [['koleno', 'le genou']]);
          await g.say('mato', 'Ja po členky.', 'Moi, jusqu\'aux chevilles.', [['členok', 'la cheville']]);
          await g.say('katka', 'Počkajte. Pondelok štyridsaťdva. Utorok štyridsaťjeden. Streda štyridsaťtri.', 'Attendez. Lundi, quarante-deux. Mardi, quarante et un. Mercredi, quarante-trois.', [['pondelok', 'lundi'], ['utorok', 'mardi'], ['streda', 'mercredi']]);
          return null;
        }
        if (st.step === 1) {
          const inRow2 = p[1] >= ROWS[2] && p[1] <= ROWS[3] && p[0] >= COLS[0] && p[0] <= COLS[8];
          if (!inRow2) { g.toast('Klikni na minulý týždeň.', 'Clique sur la semaine dernière.'); return null; }
          st.slideT = E.t; g.sfx('clic');
          await g.sleep(1150);
          st.merged = true;
          await g.say('fox', 'Štyridsaťdva, štyridsaťjeden, štyridsaťtri… To isté!', 'Quarante-deux, quarante et un, quarante-trois… Pareil !', [['to isté', 'la même chose']]);
          await g.say('andrea', 'A ešte týždeň predtým?', 'Et la semaine encore avant ?');
          await g.say('katka', 'To isté. A ešte predtým. Je to ten istý týždeň. Už rok.', 'Pareil. Et encore avant. C\'est la même semaine. Depuis un an.', [['týždeň', 'la semaine'], ['rok', 'l\'année, un an']]);
          await g.say('fox', 'Aj včera? Počas búrky?', 'Même hier ? Pendant l\'orage ?', [['včera', 'hier'], ['počas', 'pendant']]);
          st.step = 2;
          return null;
        }
        const r0 = p[1] >= ROWS[1] && p[1] <= ROWS[2];
        const col = COLS.findIndex((x, i) => i > 0 && i < 8 && p[0] >= x && p[0] <= COLS[i + 1]);
        if (!r0 || col < 1) { g.toast('Dnes je štvrtok. Včera bola…?', 'Aujourd\'hui, c\'est jeudi. Hier, c\'était… ?'); return null; }
        if (col !== 3) {
          const d = DAYS[col - 1];
          g.toast(`„${d}“ nebol včera. Dnes je štvrtok.`, `« ${d} », ce n'était pas hier. Aujourd'hui, c'est jeudi.`);
          return null;
        }
        st.wed = true;
        await g.say('katka', 'Štyridsaťtri. Ako každú stredu.', 'Quarante-trois. Comme tous les mercredis.', [['každú stredu', 'tous les mercredis']]);
        await g.say('fox', 'Včera v noci pršalo celú noc. A potok mal štyridsaťtri. Ako vždy.', 'Hier, il a plu toute la nuit. Et le ruisseau avait quarante-trois. Comme toujours.');
        return { done: true };
      } finally { st.busy = false; }
    },
  };

  // ================================================================== 1. le ruisseau a sec et le pre
  const SHEEP = { x: 1385, y: 498 };
  S.dedina = {
    chapter: 'ch5', title: { sk: 'Dedina pod Tatrami', fr: 'Le village sous les Tatras' }, tint: ['#8fc0e0', '#e8c070'],
    bg: 'art/dedina_potok.webp', worldW: 2160,
    player: 'fox', floor: FLOOR_OUT, scale: SCALE_OUT,
    sprites: [gab(320, 640), andrea(450, 1, 630),
      mato(1640, 610, -1, 'count'), katka(1880, 600, -1, 'type'),
      twoPose('ovca5', 'ovca_uviaznuta', 'ovca_uviaznuta', SHEEP.x, SHEEP.y, 82, { min: 99, max: 99 }, { poses: { b: { img: 'art/ovca_uviaznuta.png', h: 82 }, volna: { img: 'art/ovca_volna.png', h: 82 } }, speed: 120 }),
      twoPose('zvonec', 'ovca_zvonec_a', 'ovca_zvonec_b', 1760, 560, 82, { min: 3, max: 6 }),
      twoPose('hneda', 'ovca_hneda_a', 'ovca_hneda_b', 2050, 590, 88, { min: 4, max: 8 }),
      twoPose('kohut', 'kohut_a', 'kohut_b', 1500, 400, 66, { min: 5, max: 9, hold: [0.8, 1.4] }),
      twoPose('kozol', 'kozol_a', 'kozol_b', 990, 486, 150, { min: 5, max: 9, hold: [2, 3] }),
      twoPose('sliepky', 'sliepky_a', 'sliepky_b', 250, 545, 56, { min: 2, max: 4, hold: [1, 2] })],
    ambient: [smoke(940, 135), butterfly([1450, 540], [2150, 480]),
      { img: 'art/kvapka.png', x: 0, y: 0, w: 10, cross: { from: [400, 262], to: [400, 470], dur: 0.7, every: 3.2 } },
      { img: 'art/kvapka.png', x: 0, y: 0, w: 10, cross: { from: [215, 230], to: [215, 470], dur: 0.8, every: 4.1 }, phase: 1.3 }],
    hotspots: [
      { id: 'potok', name: { sk: 'suchý potok', fr: 'le ruisseau à sec' }, poly: box(950, 520, 1360, 600), walk: [1150, 590], pose: 'pick',
        async onUse(g) {
          if (g.flag('sucho_seen')) { await say(g, 'fox', 'Suché kamene. Po celonočnom daždi.', 'Des pierres sèches. Après une nuit de pluie.'); return; }
          g.setFlag('sucho_seen');
          await say(g, 'narrator', 'Gab zíde medzi kamene. Položí ruku na zem.', 'Gab descend entre les pierres. Il pose la main par terre.', [['kameň', 'la pierre'], ['ruka', 'la main']]);
          g.pose('fox', 'pick'); await g.sleep(700); g.pose('fox', null);
          await say(g, 'fox', 'Je to suché.', 'C\'est sec.', [['suchý', 'sec'], ['sucho', 'la sécheresse']]);
          await say(g, 'andrea', 'Tu si spadol. Trikrát.', 'Tu es tombé là. Trois fois.', [['spadnúť', 'tomber']]);
          await say(g, 'fox', 'Dnes si nemôžem ani namočiť nohy.', 'Aujourd\'hui, je ne peux même pas me mouiller les pieds.');
          await say(g, 'narrator', 'Andrea nič nepovie. Odfotí to. Pari: „Ak je to sucho, potok tečie na obed.“ Je obed.', 'Andrea ne dit rien. Elle prend une photo. Le pari : « Si c\'est la sécheresse, le ruisseau coule à midi. » Il est midi.');
          g.addCard('ruka');
          if (!g.hasCard('sucho')) g.addCard('sucho');
          await g.sleep(400);
          g.strikeCard('sucho');
          await say(g, 'fox', 'Prehrali sme pari. Nie, vyhrali sme. Nie je to sucho.', 'On a perdu le pari. Non, on l\'a gagné. Ce n\'est pas la sécheresse.');
        } },
      { id: 'most', name: { sk: 'starý most', fr: 'le vieux pont' }, poly: box(1210, 385, 1580, 438),
        look: { sk: 'Starý kamenný most. Pod ním kedysi tiekla voda.', fr: 'Un vieux pont de pierre. Dessous, autrefois, l\'eau coulait.', words: [['most', 'le pont'], ['kedysi', 'autrefois']] } },
      { id: 'ovca5', sprite: 'ovca5', name: { sk: 'ovca pod mostom', fr: 'la brebis sous le pont' }, walk: [1390, 560], when: (g) => !g.flag('ovca_free'),
        onItem: { list: async (g) => freeSheep(g) },
        async onUse(g) {
          const n = (g.flagv('ovca_try') || 0) + 1; g.setFlag('ovca_try', n);
          if (n === 1) { await say(g, 'narrator', 'Gab tlačí ovcu. Ovca sa nepohne. Bééé.', 'Gab pousse la brebis. Elle ne bouge pas. Bêêê.', [['tlačiť', 'pousser']]); return; }
          if (n === 2) { await say(g, 'fox', 'Ovečka, poď! Poď sem!', 'Petite brebis, viens ! Viens ici !', [['poď', 'viens']]); await say(g, 'narrator', 'Ovca sa pozrie na Gaba. Potom zase na kamene.', 'La brebis regarde Gab. Puis de nouveau les pierres.'); return; }
          await say(g, 'mato', 'Ovce idú za jedlom. Nie za Francúzmi.', 'Les brebis suivent la nourriture. Pas les Français.', [['jedlo', 'la nourriture']]);
        } },
      { id: 'mato', sprite: 'mato', name: { sk: 'Maťo', fr: 'Maťo' }, walk: [1520, 610],
        async onUse(g) {
          if (!g.flag('mato_met')) { await meet(g); return; }
          if (!g.flag('ovca_free')) {
            g.pose('mato', 'scratch');
            await say(g, 'mato', 'Sedemnásť, osemnásť… Jedna chýba. Je pod mostom a nechce von.', 'Dix-sept, dix-huit… Il en manque une. Elle est sous le pont et ne veut pas sortir.', [['chýbať', 'manquer']]);
            g.pose('mato', null);
            if (!g.flag('mato_kap')) { g.setFlag('mato_kap'); await say(g, 'mato', 'Má rada kapustu. Babka má kapustu.', 'Elle aime le chou. Babka a du chou.', [['kapusta', 'le chou']]); }
            return;
          }
          await say(g, 'mato', 'Výkop? Videl som ho, keď som mal dvanásť. Išiel za salašom.', 'Une tranchée ? Je l\'ai vue, j\'avais douze ans. Elle passait derrière la bergerie.', [['salaš', 'la bergerie']]);
        } },
      { id: 'katka', sprite: 'katka', name: { sk: 'Katka', fr: 'Katka' }, walk: [1760, 610],
        async onUse(g) {
          if (!g.flag('mato_met')) { await meet(g); return; }
          if (!g.flag('katka_in')) { await katkaJoins(g); return; }
          await say(g, 'katka', 'Moja batéria je tvoja batéria. Ale šetri ju.', 'Ma batterie est ta batterie. Mais économise-la.', [['batéria', 'la batterie'], ['šetriť', 'économiser']]);
        } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [560, 630],
        async onUse(g) {
          if (!g.flag('sucho_seen')) { await say(g, 'andrea', 'Potok je za domami. Pod mostom.', 'Le ruisseau est derrière les maisons. Sous le pont.'); return; }
          await say(g, 'andrea', 'Babka býva v tom dome s lavičkou. Je tam vždy jedlo.', 'Babka habite la maison avec le banc. Il y a toujours à manger là-bas.');
        } },
      { id: 'dom', name: { sk: 'dom babky Zuzany', fr: 'la maison de Babka Zuzana' }, poly: box(785, 280, 865, 432), walk: [825, 535],
        async onUse(g) { g.sfx('portillon'); g.goScene('kuchyna5'); } },
      { id: 'studna', name: { sk: 'studňa', fr: 'le puits' }, poly: box(425, 230, 650, 495), walk: [600, 560],
        async onUse(g) {
          if (!g.flag('studna')) {
            g.setFlag('studna');
            await say(g, 'narrator', 'Gab spustí vedro do studne. Krútí. Vedro vyjde hore. Prázdne.', 'Gab descend le seau dans le puits. Il tourne. Le seau remonte. Vide.', [['studňa', 'le puits'], ['vedro', 'le seau'], ['prázdny', 'vide']]);
            await say(g, 'andrea', 'Studňa tiež vyschla. Minulé leto.', 'Le puits aussi s\'est asséché. L\'été dernier.', [['vyschnúť', 's\'assécher']]);
            return;
          }
          await say(g, 'fox', 'Prázdne vedro. Zase.', 'Le seau vide. Encore.');
        } },
      { id: 'kozol', sprite: 'kozol', name: { sk: 'starý cap', fr: 'le vieux bouc' }, walk: [900, 540],
        async onUse(g) {
          await say(g, 'kozol', 'Vtedy tu bola voda. Teraz tu je prach.', 'Avant, ici, il y avait de l\'eau. Maintenant, il y a de la poussière.', [['vtedy', 'à l\'époque, alors'], ['teraz', 'maintenant'], ['prach', 'la poussière']]);
          if (!g.flag('kozol2')) { g.setFlag('kozol2'); await say(g, 'kozol', 'A vtedy sme nemali internet. Teraz máme internet. A nemáme vodu.', 'Et à l\'époque, on n\'avait pas internet. Maintenant on a internet. Et on n\'a pas d\'eau.'); }
        } },
      { id: 'kohut', sprite: 'kohut', name: { sk: 'kohút', fr: 'le coq' }, walk: [1450, 540],
        async onUse(g) { g.sfx('coq'); await say(g, 'narrator', 'Kikirikí! Na obed. Kohút nemá hodinky.', 'Cocorico ! À midi. Le coq n\'a pas de montre.', [['kohút', 'le coq']]); } },
      { id: 'zvonec', sprite: 'zvonec', name: { sk: 'ovca so zvoncom', fr: 'la brebis à la cloche' }, walk: [1680, 590],
        async onUse(g) { g.sfx('cloche_mouton'); await say(g, 'fox', 'Cingi-lingi. Ovca so zvoncom. Je ho počuť na celú dedinu.', 'Ding-ding. Une brebis avec une cloche. On l\'entend dans tout le village.', [['zvonec', 'la cloche']]); } },
      { id: 'hneda', sprite: 'hneda', name: { sk: 'ovca', fr: 'la brebis' }, walk: [1980, 600],
        async onUse(g) { await say(g, 'fox', 'Bééé. Pasie sa.', 'Bêêê. Elle broute.', [['pásť sa', 'brouter']]); } },
      { id: 'sliepky', sprite: 'sliepky', name: { sk: 'sliepky', fr: 'les poules' }, walk: [330, 580],
        async onUse(g) { await say(g, 'fox', 'Sliepky. Hľadajú dážďovky v blate.', 'Des poules. Elles cherchent des vers dans la boue.', [['sliepka', 'la poule'], ['blato', 'la boue']]); } },
      { id: 'budova', name: { sk: 'sivá budova', fr: 'le bâtiment gris' }, poly: box(1840, 150, 2050, 220),
        look: { sk: 'Dole v údolí je sivá budova. Dátové centrum. Bez okien.', fr: 'En bas, dans la vallée, un bâtiment gris. Le datacentre. Sans fenêtres.', words: [['sivý', 'gris'], ['budova', 'le bâtiment']] } },
      { id: 'salas', name: { sk: 'salaš', fr: 'la bergerie' }, poly: box(1880, 225, 2160, 470), walk: [2050, 560],
        async onUse(g) {
          if (!g.flag('mato_met')) { await say(g, 'fox', 'Salaš. Najprv pozdravím toho medveďa.', 'La bergerie. D\'abord, je dis bonjour à cet ours.', [['salaš', 'la bergerie']]); return; }
          if (!g.flag('ovca_free')) { await say(g, 'mato', 'Najprv moja ovca! Bez nej nikam nejdem.', 'D\'abord ma brebis ! Sans elle, je ne vais nulle part.'); return; }
          if (!g.flag('katka_in')) { await say(g, 'katka', 'Hej! Bezo mňa? Ja mám telefón.', 'Hé ! Sans moi ? C\'est moi qui ai le téléphone.'); return; }
          g.goScene('zadok');
        } },
    ],
    hints: [
      { id: 'c5_potok', when: (g) => !g.flag('sucho_seen'), levels: [
        { sk: 'Je obed. Pari! Pozri sa do potoka.', fr: 'Il est midi. Le pari ! Va voir le ruisseau.' },
        { sk: 'Klikni na kamene v potoku.', fr: 'Clique sur les pierres du ruisseau.' } ] },
      { id: 'c5_ovca', when: (g) => !g.flag('ovca_free') && !g.has('list'), levels: [
        { sk: 'Ovca pod mostom nejde za hlasom. Ide za jedlom.', fr: 'La brebis sous le pont ne suit pas la voix. Elle suit la nourriture.' },
        { sk: 'Ovce majú rady kapustu. Babka má kapustu v kuchyni.', fr: 'Les brebis aiment le chou. Babka a du chou dans sa cuisine.' },
        { sk: 'Choď k babke (dom s lavičkou) a popros ju o list kapusty.', fr: 'Va chez Babka (la maison au banc) et demande-lui une feuille de chou.' } ] },
      { id: 'c5_ovca2', when: (g) => !g.flag('ovca_free') && g.has('list'), levels: [
        { sk: 'Máš kapustu. Kto ju chce?', fr: 'Tu as du chou. Qui en veut ?' },
        { sk: 'Daj list kapusty ovci pod mostom.', fr: 'Donne la feuille de chou à la brebis sous le pont.' } ] },
      { id: 'c5_salas', levels: [{ sk: 'Výkop išiel za salašom. Salaš je vpravo.', fr: 'La tranchée passait derrière la bergerie. La bergerie est à droite.' }] },
    ],
    async onEnter(g) {
      if (g.flag('d0')) {
        if (g.flag('ovca_free')) { const o = g.sprite('ovca5'); if (o) { o.x = 1600; o.y = 600; o.img = 'art/ovca_volna.png'; } }
        if (g.flag('mato_in')) g.pose('mato', 'cheer');
        return;
      }
      g.setFlag('d0');
      g.noHelper();
      await say(g, 'narrator', 'Štvrtok, obed. Dedina pod Tatrami. Všade mláky, blato, kvapky na strechách.', 'Jeudi, midi. Le village sous les Tatras. Partout, des flaques, de la boue, des gouttes sur les toits.', [['štvrtok', 'jeudi'], ['obed', 'midi, le déjeuner'], ['dedina', 'le village']]);
      await say(g, 'narrator', 'Za domami sú biele kamene a starý most. Medzi kameňmi nič.', 'Derrière les maisons, des pierres blanches et un vieux pont. Entre les pierres, rien.');
      await say(g, 'fox', 'Tu je to?', 'C\'est ici ?');
      await say(g, 'andrea', 'Tu.', 'Ici.');
      await say(g, 'fox', 'Celú noc pršalo.', 'Il a plu toute la nuit.', [['pršať', 'pleuvoir']]);
      await say(g, 'andrea', 'Áno.', 'Oui.');
    },
  };
  S.dedina.hotspots.sort((a, b) => rank(a) - rank(b));

  async function meet(g) {
    g.setFlag('mato_met');
    g.face('mato', -1);
    await say(g, 'narrator', 'Na lúke počíta obrovský medveď ovce. Vedľa neho sa Katka pozerá do mobilu.', 'Dans le pré, un ours énorme compte des moutons. À côté, Katka regarde son téléphone.', [['lúka', 'le pré'], ['ovca', 'la brebis']]);
    g.pose('mato', 'cheer');
    await say(g, 'mato', 'Gab? To je Gab!', 'Gab ? C\'est Gab !');
    await say(g, 'fox', 'Maťo? Ty si bol malý!', 'Maťo ? Tu étais petit !', [['malý', 'petit']]);
    await say(g, 'mato', 'Nie. Ja som bol už vtedy veľký. To ty si bol malý.', 'Non. J\'étais déjà grand. C\'est toi qui étais petit.', [['veľký', 'grand'], ['vtedy', 'à l\'époque, alors']]);
    g.pose('mato', 'count');
    await say(g, 'mato', 'Sedemnásť, osemnásť… Jedna chýba. Je pod mostom a nechce von.', 'Dix-sept, dix-huit… Il en manque une. Elle est sous le pont et ne veut pas sortir.', [['chýbať', 'manquer']]);
  }
  async function katkaJoins(g) {
    g.setFlag('katka_in');
    g.face('katka', -1);
    g.pose('katka', 'point');
    await say(g, 'katka', 'Ahoj, Gab. Tak čo, Andrea ti už všetko…', 'Salut, Gab. Alors, Andrea t\'a tout…');
    await say(g, 'andrea', 'Katka.', 'Katka.');
    await say(g, 'katka', '… ukázala? Dedinu? Nie? Dobre. Nič nehovorím.', '… montré ? Le village ? Non ? D\'accord. Je ne dis rien.');
    await say(g, 'fox', 'Nič nehovorí o čom?', 'Elle ne dit rien sur quoi ?');
    g.pose('katka', 'show');
    await say(g, 'katka', 'O ničom. Videl si? Máme optiku.', 'Sur rien. Tu as vu ? On a la fibre.', [['optika', 'la fibre (optique)']]);
    await say(g, 'katka', 'Internet. Veľmi rýchly. Dala nám ho sivá budova. To je najlepšia vec, čo sa tu stala, odkedy som na svete.', 'Internet. Très rapide. C\'est le bâtiment gris qui nous l\'a donné. C\'est la meilleure chose qui est arrivée ici depuis ma naissance.');
    await say(g, 'andrea', 'Katka. Potrebujeme tvoju optiku.', 'Katka. On a besoin de ta fibre.');
    g.pose('katka', null);
    await say(g, 'katka', 'Dobre. Môj telefón vám poradí. Ale batéria má päť čiarok. Nabíjačku nesieš ty.', 'D\'accord. Mon téléphone vous aidera. Mais la batterie a cinq barres. Le chargeur, c\'est toi qui le portes.', [['nabíjačka', 'le chargeur']]);
    g.give('nabijacka');
    g.setHelper('katka', 5);
    g.toast('📱 Indície: Katkin telefón. Batéria: 5.', 'Indices : le téléphone de Katka. Batterie : 5.');
  }
  async function freeSheep(g) {
    if (g.flag('ovca_free')) return;
    g.setFlag('ovca_free');
    await say(g, 'narrator', 'Gab ukáže list kapusty. Ovca zdvihne hlavu. Ňuch, ňuch…', 'Gab montre la feuille de chou. La brebis lève la tête. Snif, snif…');
    const o = g.sprite('ovca5'); o.img = 'art/ovca_volna.png';
    await g.walk('ovca5', 1600, 600);
    await say(g, 'narrator', 'Ovca vyjde spod mosta. Odhryzne kúsok listu. Zvyšok zostane Gabovi.', 'La brebis sort de sous le pont. Elle croque un bout de la feuille. Le reste, Gab le garde.', [['zvyšok', 'le reste']]);
    g.pose('mato', 'cheer');
    await say(g, 'mato', 'Devätnásť! Všetky! Gab, ty si génius na ovce.', 'Dix-neuf ! Toutes ! Gab, tu es un génie des brebis.');
    g.setFlag('mato_in');
    await say(g, 'mato', 'Výkop? Videl som ho, keď som mal dvanásť. Išiel za salašom.', 'Une tranchée ? Je l\'ai vue, j\'avais douze ans. Elle passait derrière la bergerie.', [['salaš', 'la bergerie'], ['výkop', 'la tranchée']]);
    await say(g, 'andrea', 'Ukáž nám ho.', 'Montre-nous.');
  }

  // ================================================================== 2. la cuisine de Babka
  const PLATE = ['art/obj_halusky_a.png', 'art/obj_halusky_b.png', 'art/obj_halusky_c.png'];
  S.kuchyna5 = {
    chapter: 'ch5', title: { sk: 'Kuchyňa babky Zuzany', fr: 'La cuisine de Babka Zuzana' }, tint: ['#d9a86a', '#f0d090'],
    bg: 'art/dedina_kuchyna.webp', worldW: 2160,
    player: 'fox', floor: [[0, 605], [2160, 605], [2160, 712], [0, 712]], scale: { y0: 605, s0: 0.66, y1: 712, s1: 0.76 },
    sprites: [gab(560, 680), andrea(1880, -1, 668), zuzana(1330, 652, -1),
      katka(250, 672, 1, 'type', { hidden: true }), mato(700, 688, 1, 'eat', { hidden: true }),
      twoPose('pes', 'pes_a', 'pes_b', 1000, 652, 70, { min: 4, max: 8, hold: [1.2, 2] })],
    props: [
      { img: PLATE[0], x: 1035, y: 408, w: 116, when: (g) => !g.flag('jedz_done') && (g.flagv('plates') || 0) % 3 === 0 },
      { img: PLATE[1], x: 1035, y: 408, w: 116, when: (g) => !g.flag('jedz_done') && (g.flagv('plates') || 0) % 3 === 1 },
      { img: PLATE[2], x: 1035, y: 408, w: 116, when: (g) => g.flag('jedz_done') || (g.flagv('plates') || 0) % 3 === 2 },
    ],
    ambient: [smoke(1495, 318), { sweep: { area: [770, 150, 1110, 600], period: 11, a: 0.12 } }],
    overlay(c, g, E) {   // le coucou : toutes les 16 secondes, l'oiseau sort et chante
      const p = (E.t + 6) % 16, show = p < 1.8, n = Math.floor((E.t + 6) / 16);
      if (show && S.kuchyna5._kuku !== n) { S.kuchyna5._kuku = n; if (S.kuchyna5._kuku0 !== undefined) g.sfx('coucou'); S.kuchyna5._kuku0 = n; }
      if (show) { const im = E.img(p % 0.6 < 0.3 ? 'art/budka_b.png' : 'art/budka_a.png'); if (im && im.naturalWidth) c.drawImage(im, 1212, 58, 76, 72); }
    },
    hotspots: [
      { id: 'tanier', name: { sk: 'tanier halušiek', fr: 'l\'assiette de halušky' }, poly: box(975, 370, 1095, 412), walk: [1035, 690],
        async onUse(g) {
          if (g.flag('jedz_done')) { await say(g, 'fox', 'Prázdny tanier. Konečne.', 'Une assiette vide. Enfin.'); return; }
          const n = (g.flagv('plates') || 0) + 1;
          g.setFlag('plates', n);
          if (n % 3 === 2) {
            await say(g, 'narrator', 'Gab je. A je. Tanier je skoro prázdny.', 'Gab mange. Et mange. L\'assiette est presque vide.', [['jesť', 'manger']]);
            await g.sleep(600);
            g.pose('zuzana', 'ladle');
            await say(g, 'zuzana', 'Prázdny tanier? To nie! Ešte!', 'Une assiette vide ? Pas question ! Encore !', [['ešte', 'encore']]);
            g.pose('zuzana', null);
            g.setFlag('plates', n + 1);
            if (n + 1 >= 6) await say(g, 'fox', 'Už po tretí raz… Takto odtiaľto nikdy neodídem.', 'Déjà la troisième fois… Comme ça, je ne partirai jamais d\'ici.');
            return;
          }
          await say(g, 'narrator', 'Gab je halušky. Sú výborné. A je ich veľa.', 'Gab mange des halušky. Elles sont délicieuses. Et il y en a beaucoup.', [['halušky', 'les halušky (gnocchis slovaques)'], ['výborný', 'délicieux']]);
        } },
      { id: 'pes', sprite: 'pes', name: { sk: 'pes pod stolom', fr: 'le chien sous la table' }, walk: [1120, 690],
        async onUse(g) {
          if (g.flag('jedz_done')) { await say(g, 'fox', 'Spokojný pes. Je plný ako ja.', 'Un chien content. Il est plein, comme moi.'); return; }
          if (!g.flag('jedz_on')) { await say(g, 'fox', 'Pes pod stolom. Čaká.', 'Un chien sous la table. Il attend.', [['pes', 'le chien']]); return; }
          const z = g.sprite('zuzana');
          if (z && z.pose === 'back') {
            g.setFlag('jedz_done');
            g.pose('pes', 'b');
            await say(g, 'narrator', 'Babka sa otočí k sporáku. Šup! Halušky idú pod stôl. Pes je veľmi rýchly.', 'Babka se tourne vers le fourneau. Hop ! Les halušky passent sous la table. Le chien est très rapide.', [['sporák', 'le fourneau']]);
            g.pose('zuzana', null);
            await g.sleep(500);
            await say(g, 'zuzana', 'Prázdny tanier! Vidíš, že ti chutí.', 'Assiette vide ! Tu vois que ça te plaît.', [['chutiť', 'plaire (au goût)']]);
            await afterMeal(g);
            return;
          }
          g.pose('zuzana', 'spoon');
          await say(g, 'zuzana', 'Psa nekŕmime! Ja ťa vidím.', 'On ne nourrit pas le chien ! Je te vois.');
          g.pose('zuzana', null);
          await say(g, 'fox', '(Musí sa otočiť. Počkám, kým sa pozerá do hrnca.)', '(Il faut qu\'elle se retourne. J\'attends qu\'elle regarde dans la casserole.)');
        } },
      { id: 'zuzana', sprite: 'zuzana', name: { sk: 'babka Zuzana', fr: 'Babka Zuzana' }, walk: [1180, 690],
        async onUse(g) {
          if (!g.flag('jedz_done')) {
            for (;;) {
              const i = await g.choice([
                { sk: 'Už nemôžem.', fr: 'Je ne peux plus.' },
                { sk: 'Ďakujem, bolo to výborné, už nevládzem.', fr: 'Merci, c\'était délicieux, je n\'en peux plus.' },
                { sk: 'Nechcem.', fr: 'Je ne veux pas.' },
              ], { noFr: true });
              if (i === 1) break;
              if (i === 0) { await say(g, 'zuzana', 'Nemôžeš? Môžeš. Jedz.', 'Tu ne peux pas ? Tu peux. Mange.'); return; }
              g.pose('zuzana', 'arms'); await say(g, 'zuzana', 'Nechceš?! Moje halušky?', 'Tu ne veux pas ?! Mes halušky ?'); g.pose('zuzana', null); return;
            }
            g.setFlag('jedz_done');
            g.pose('zuzana', 'laugh');
            await say(g, 'zuzana', 'Výborné! Počuli ste? Malý Francúz hovorí po slovensky.', 'Délicieux ! Vous avez entendu ? Le petit Français parle slovaque.', [['nevládzem', 'je n\'en peux plus']]);
            g.pose('zuzana', null);
            await afterMeal(g);
            return;
          }
          await babkaMenu(g);
        } },
      { id: 'kapusta', name: { sk: 'kapusta', fr: 'le chou' }, poly: box(1955, 300, 2095, 382), walk: [1960, 690],
        async onUse(g) {
          if (!g.flag('jedz_done')) { await say(g, 'zuzana', 'Najprv jedz!', 'D\'abord, mange !'); return; }
          if (g.has('list') || g.flag('ovca_free')) { await say(g, 'fox', 'Kapusta. Babkina. List už mám.', 'Le chou. Celui de Babka. J\'ai déjà une feuille.'); return; }
          await say(g, 'fox', 'Kapusta. Patrí babke. Opýtam sa jej.', 'Le chou. Il est à Babka. Je vais lui demander.', [['opýtať sa', 'demander']]);
        } },
      { id: 'pohar', name: { sk: 'pohár na kredenci', fr: 'le verre sur le buffet' }, poly: box(1785, 318, 1855, 388), walk: [1800, 690],
        async onUse(g) {
          if (!g.flag('jedz_done')) { await say(g, 'zuzana', 'Najprv jedz!', 'D\'abord, mange !'); return; }
          if (g.has('pohar')) { await say(g, 'fox', 'Jeden pohár mám.', 'J\'ai déjà un verre.'); return; }
          await say(g, 'fox', 'Pohár. Babkin. Nemôžem si ho len tak vziať. Opýtam sa.', 'Un verre. Celui de Babka. Je ne peux pas le prendre comme ça. Je vais demander.', [['pohár', 'le verre']]);
        } },
      { id: 'krabicka', name: { sk: 'biela krabička', fr: 'la petite boîte blanche' }, poly: box(212, 192, 292, 252), walk: [300, 690],
        async onUse(g) {
          if (!g.flag('jedz_done')) { await say(g, 'zuzana', 'Kam ideš? Najprv jedz!', 'Où tu vas ? D\'abord, mange !'); return; }
          g.addCard('krabicka');
          await say(g, 'fox', 'Malá biela krabička. Z nej ide tenký kábel.', 'Une petite boîte blanche. Un câble fin en sort.', [['krabička', 'la petite boîte'], ['tenký', 'fin']]);
          if (g.flag('katka_in')) { g.pose('katka', 'show'); await say(g, 'katka', 'To je optika! Celá dedina má internet. Z takejto malej krabičky.', 'C\'est la fibre ! Tout le village a internet. Avec une petite boîte comme ça.'); g.pose('katka', null); }
        } },
      { id: 'zasuvka', name: { sk: 'zásuvka', fr: 'la prise électrique' }, poly: box(222, 358, 278, 408), walk: [300, 690],
        onItem: { nabijacka: async (g) => {
          if (!g.flag('katka_in')) { await say(g, 'fox', 'Nabíjačka bez telefónu. Hmm.', 'Un chargeur sans téléphone. Hmm.'); return; }
          g.chargeHelper();
          g.pose('katka', 'charge');
          await say(g, 'katka', 'Nabíja sa… Päť čiarok. Ďakujem, babka!', 'Ça charge… Cinq barres. Merci, Babka !', [['nabíjať', 'charger']]);
          await g.sleep(400); g.pose('katka', null);
        } },
        look: { sk: 'Zásuvka. Tu sa dá nabíjať.', fr: 'Une prise. Ici, on peut charger.', words: [['zásuvka', 'la prise']] } },
      { id: 'hodiny', name: { sk: 'kukučkové hodiny', fr: 'le coucou' }, poly: box(1185, 60, 1310, 310),
        look: { sk: 'Kukučkové hodiny. Kuku! Každú chvíľu.', fr: 'Une horloge à coucou. Coucou ! Toutes les deux minutes.', words: [['hodiny', 'l\'horloge']] } },
      { id: 'hrniec', name: { sk: 'hrniec', fr: 'la casserole' }, poly: box(1430, 300, 1570, 385), walk: [1450, 690],
        look: { sk: 'Veľký hrniec. Vonia tu kapusta.', fr: 'Une grande casserole. Ça sent le chou.', words: [['hrniec', 'la casserole'], ['voňať', 'sentir bon']] } },
      { id: 'okno', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(780, 175, 1080, 340),
        look: { sk: 'Muškáty v okne. Za oknom slnko a mláky.', fr: 'Des géraniums à la fenêtre. Dehors, le soleil et les flaques.', words: [['muškát', 'le géranium']] } },
      { id: 'kabaty', name: { sk: 'kabáty', fr: 'les manteaux' }, poly: box(25, 110, 200, 520),
        look: { sk: 'Kabáty na vešiaku. Jeden je obrovský. Maťov.', fr: 'Des manteaux au portemanteau. L\'un est énorme. Celui de Maťo.', words: [['kabát', 'le manteau']] } },
      { id: 'von', name: { sk: 'von', fr: 'sortir' }, poly: box(320, 130, 600, 570), walk: [470, 690],
        async onUse(g) {
          if (g.flag('jedz_on') && !g.flag('jedz_done')) { g.pose('zuzana', 'spoon'); await say(g, 'zuzana', 'Kam ideš? Jedz!', 'Où tu vas ? Mange !'); g.pose('zuzana', null); return; }
          g.goScene('dedina');
        } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [1760, 690],
        async onUse(g) {
          if (!g.flag('jedz_done')) { await say(g, 'andrea', 'U babky sa neodchádza od plného taniera. Nikdy.', 'Chez Babka, on ne quitte jamais une assiette pleine. Jamais.'); return; }
          await say(g, 'andrea', 'Babka všetko vie. Ale odpovedá po svojom.', 'Babka sait tout. Mais elle répond à sa façon.');
        } },
      { id: 'mato', sprite: 'mato', name: { sk: 'Maťo', fr: 'Maťo' }, walk: [800, 690],
        async onUse(g) { g.pose('mato', 'belly'); await say(g, 'mato', 'Tretí tanier. Alebo štvrtý? Prestal som počítať.', 'Troisième assiette. Ou quatrième ? J\'ai arrêté de compter.'); g.pose('mato', 'eat'); } },
      { id: 'katka', sprite: 'katka', name: { sk: 'Katka', fr: 'Katka' }, walk: [480, 690],
        async onUse(g) { await say(g, 'katka', 'Babka má optiku. A wifi heslo je „halušky“. Nehovor nikomu.', 'Babka a la fibre. Et le mot de passe wifi, c\'est « halušky ». Ne le dis à personne.'); } },
    ],
    hints: [
      { id: 'c5_jedz', when: (g) => g.flag('jedz_on') && !g.flag('jedz_done'), levels: [
        { sk: 'Babka ťa nepustí od plného taniera. Povedz jej to pekne. Alebo… pes?', fr: 'Babka ne te laisse pas quitter une assiette pleine. Dis-le-lui gentiment. Ou alors… le chien ?' },
        { sk: 'Pekne: „Ďakujem, bolo to výborné, už nevládzem.“ Alebo daj halušky psovi, keď sa babka otočí k sporáku.', fr: 'Gentiment : « Merci, c\'était délicieux, je n\'en peux plus. » Ou donne les halušky au chien quand Babka se tourne vers le fourneau.' },
        { sk: 'Klikni na babku a vyber „Ďakujem, bolo to výborné, už nevládzem.“', fr: 'Clique sur Babka et choisis « Ďakujem, bolo to výborné, už nevládzem. »' } ] },
      { id: 'c5_list', when: (g) => !g.flag('ovca_free') && !g.has('list'), levels: [
        { sk: 'Ovca chce kapustu. Kapusta je na kredenci. Ale je babkina.', fr: 'La brebis veut du chou. Le chou est sur le buffet. Mais il est à Babka.' },
        { sk: 'Popros babku o list kapusty.', fr: 'Demande une feuille de chou à Babka.' } ] },
      { id: 'c5_pohar', when: (g) => g.flag('zadok_glass') && !g.has('pohar'), levels: [
        { sk: 'Pohár je na kredenci. Babke sa vyká.', fr: 'Le verre est sur le buffet. À Babka, on dit « vous ».' },
        { sk: 'Povedz babke: „Babka, požičiate mi pohár?“', fr: 'Dis à Babka : « Babka, požičiate mi pohár ? »' } ] },
      { id: 'c5_k', levels: [{ sk: 'Von sa ide dverami vľavo.', fr: 'On sort par la porte à gauche.' }] },
    ],
    async onEnter(g) {
      if (g.flag('katka_in')) { g.spawn('katka'); }
      if (g.flag('mato_in')) { g.spawn('mato'); }
      if (g.flag('k0')) return;
      g.setFlag('k0');
      g.setFlag('jedz_on');
      await say(g, 'narrator', 'Kuchyňa babky Zuzany. Vonia tu kapusta.', 'La cuisine de Babka Zuzana. Ça sent le chou.', [['kuchyňa', 'la cuisine']]);
      g.pose('zuzana', 'wave');
      await say(g, 'zuzana', 'Malý Francúz! Si chudý. Sadni si. Jedz.', 'Le petit Français ! Tu es maigre. Assieds-toi. Mange.', [['chudý', 'maigre'], ['jedz', 'mange']]);
      g.pose('zuzana', null);
      await say(g, 'fox', 'Ďakujem, babka. Čo je to?', 'Merci, Babka. C\'est quoi ?');
      await say(g, 'zuzana', 'Halušky. S kapustou.', 'Des halušky. Au chou.', [['s kapustou', 'au chou']]);
      for (;;) {
        const i = await g.choice([{ sk: 'Nie s bryndzou?', fr: 'Pas au fromage de brebis ?' }, { sk: 'Mňam.', fr: 'Miam.' }]);
        if (i === 1) { await say(g, 'zuzana', 'Mňam. Správne. Jedz.', 'Miam. C\'est ça. Mange.'); break; }
        if (g.flag('ja_ovca')) break;
        g.setFlag('ja_ovca');
        g.pose('zuzana', 'arms');
        await say(g, 'zuzana', 'Ja som ovca.', 'Je suis une brebis.', [['bryndza', 'le fromage de brebis'], ['ovca', 'la brebis']]);
        await say(g, 'fox', 'Prepáčte.', 'Pardon.', [['prepáčte', 'pardon (vous)']]);
        g.pose('zuzana', null);
        await say(g, 'zuzana', 'Jedz.', 'Mange.');
        break;
      }
    },
  };
  S.kuchyna5.hotspots.sort((a, b) => rank(a) - rank(b));

  async function afterMeal(g) {
    await say(g, 'andrea', 'Babka, potok. Myslíš, že je to sucho?', 'Babka, le ruisseau. Tu crois que c\'est la sécheresse ?');
    await say(g, 'zuzana', 'Myslím, že môj sused robí v sivej budove.', 'Je crois que mon voisin travaille au bâtiment gris.', [['sused', 'le voisin'], ['robiť', 'travailler']]);
    await say(g, 'zuzana', 'Predtým robil v Rakúsku. Domov chodil raz za mesiac. Teraz chodí každý večer.', 'Avant, il travaillait en Autriche. Il rentrait une fois par mois. Maintenant, il rentre tous les soirs.', [['predtým', 'avant'], ['raz za mesiac', 'une fois par mois'], ['každý večer', 'tous les soirs']]);
    await say(g, 'andrea', 'To nie je moja otázka.', 'Ce n\'est pas ma question.', [['otázka', 'la question']]);
    await say(g, 'zuzana', 'Nie. Ale je to moja odpoveď.', 'Non. Mais c\'est ma réponse.', [['odpoveď', 'la réponse']]);
    g.addCard('sused');
  }
  async function babkaMenu(g) {
    for (;;) {
      const opts = [], acts = [];
      if (!g.has('list') && !g.flag('ovca_free')) {
        opts.push({ sk: 'Babka, môžem dostať list kapusty? Pre ovcu.', fr: 'Babka, je peux avoir une feuille de chou ? Pour une brebis.' });
        acts.push(async () => {
          g.pose('zuzana', 'laugh');
          await say(g, 'zuzana', 'Pre Maťovu ovcu? Zase je pod mostom? Na, tu máš.', 'Pour la brebis de Maťo ? Elle est encore sous le pont ? Tiens, voilà.', [['list', 'la feuille']]);
          g.pose('zuzana', null); g.give('list');
        });
      }
      if (!g.has('pohar')) {
        opts.push({ sk: 'Babka, požičaj mi pohár.', fr: 'Babka, prête-moi un verre.' });
        acts.push(async () => {
          g.pose('zuzana', 'spoon');
          await say(g, 'zuzana', '„Požičaj“? Ja som babka, nie kamarátka. Babke sa vyká, chlapče.', '« Prête » ? Je suis une grand-mère, pas une copine. À une grand-mère, on dit « vous », mon garçon.', [['vykať', 'vouvoyer']]);
          g.pose('zuzana', null);
        });
        opts.push({ sk: 'Babka, požičiate mi pohár?', fr: 'Babka, vous me prêtez un verre ?' });
        acts.push(async () => {
          g.pose('zuzana', 'glass');
          await say(g, 'zuzana', 'Ale prečo nie. Na čo ti bude pohár, keď vody niet?', 'Mais pourquoi pas. À quoi te servira un verre, s\'il n\'y a pas d\'eau ?', [['požičať', 'prêter'], ['pohár', 'le verre']]);
          g.pose('zuzana', null); g.give('pohar');
          await say(g, 'fox', 'Na počúvanie.', 'À écouter.', [['počúvať', 'écouter']]);
          await say(g, 'zuzana', 'Francúzi.', 'Les Français.');
        });
      }
      opts.push({ sk: 'Dovidenia, babka. A ďakujem.', fr: 'Au revoir, Babka. Et merci.' });
      const i = await g.choice(opts, { noFr: opts.length > 2 });
      if (i === opts.length - 1) { g.pose('zuzana', 'wave'); await say(g, 'zuzana', 'Príď na večeru!', 'Reviens pour le dîner !', [['večera', 'le dîner']]); g.pose('zuzana', null); return; }
      await acts[i]();
    }
  }

  // ================================================================== 3. derriere la bergerie
  const PL = [870, 532, 1296, 636];   // la plaque OPTIKA
  const noises = (g) => {
    const n = [];
    if (!g.flag('mato_ticho')) n.push(['Maťo rozpráva.', 'Maťo parle.']);
    if (!g.flag('tel_ticho')) n.push(['Telefón pípa.', 'Le téléphone bipe.']);
    if (!g.flag('zvonec_prec')) n.push(['Zvonec cinká.', 'La cloche tinte.']);
    const t = g.sprite('traktor');
    if (t && !t.hidden) n.push(['Traktor hučí.', 'Le tracteur gronde.']);
    return n;
  };
  S.zadok = {
    chapter: 'ch5', title: { sk: 'Za salašom', fr: 'Derrière la bergerie' }, tint: ['#8fc0e0', '#e8c070'],
    bg: 'art/dedina_zadok.webp', worldW: 2160,
    player: 'fox', floor: FLOOR_OUT, scale: SCALE_OUT,
    sprites: [gab(260, 640), andrea(400, 1, 628), mato(640, 640, 1, 'count'), katka(1460, 632, -1, 'type'),
      twoPose('zvonec', 'ovca_zvonec_a', 'ovca_zvonec_b', 1720, 575, 84, { min: 3, max: 6 }, { speed: 140 }),
      twoPose('sliepky', 'sliepky_a', 'sliepky_b', 1400, 525, 54, { min: 2, max: 4, hold: [1, 2] }),
      twoPose('traktor', 'traktor_a', 'traktor_b', 1150, 430, 120, { min: 0.3, max: 0.5, hold: [0.3, 0.5] }, { speed: 90, patrol: { from: [1150, 430], to: [2500, 430], every: 22, first: 6 } }),
      starosta(1560, 690)],
    extraSprites: {
      auto5: { img: 'art/auto_starosta_a.png', x: 2600, y: 700, h: 520, face: 1, speed: 520, poses: { open: { img: 'art/auto_starosta_b.png', h: 520 } } },
    },
    ambient: [{ imgs: ['art/motyl5_a.png', 'art/motyl5_b.png'], fps: 1.2, x: 1215, y: 566, w: 42, when: (g) => !g.flag('poklop_done') },
      butterfly([300, 470], [1100, 420]), { sweep: { area: [950, 250, 2160, 520], period: 15, a: 0.08 } }],
    overlay(c, g, E) {   // le mot sur la plaque
      c.save(); c.translate(1083, 588); c.scale(1, 0.42);
      c.font = '900 64px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillStyle = 'rgba(60,30,15,.55)'; c.fillText('OPTIKA', 3, 4);
      c.fillStyle = 'rgba(210,190,160,.85)'; c.fillText('OPTIKA', 0, 0);
      c.restore();
    },
    hotspots: [
      { id: 'poklop', name: { sk: 'železný poklop „OPTIKA“', fr: 'la plaque en fer « OPTIKA »' }, poly: box(PL[0], PL[1], PL[2], PL[3]), walk: [1080, 650],
        onItem: { pohar: async (g) => listen(g, true) },
        async onUse(g) {
          if (g.flag('poklop_done')) { await say(g, 'fox', 'Pod poklopom tečie voda. Veľa vody.', 'Sous la plaque, de l\'eau coule. Beaucoup d\'eau.'); return; }
          if (!g.flag('lift')) { await lift(g); return; }
          await listen(g, false);
        } },
      { id: 'mato', sprite: 'mato', name: { sk: 'Maťo', fr: 'Maťo' }, walk: [760, 650],
        async onUse(g) {
          if (g.flag('mato_ticho')) { await say(g, 'mato', '(šepká) Ja som ticho. Úplne.', '(il chuchote) Je me tais. Complètement.'); return; }
          await say(g, 'mato', 'A čo ak je to poklad? Alebo krtko? Veľký krtko! Gab, čo počuješ? Čo?', 'Et si c\'était un trésor ? Ou une taupe ? Une grosse taupe ! Gab, tu entends quoi ? Quoi ?');
          const i = await g.choice([{ sk: 'Pst!', fr: 'Chut !' }, { sk: 'Áno, krtko.', fr: 'Oui, une taupe.' }]);
          if (i === 1) { await say(g, 'mato', 'Vedel som to! Krtko! Aký veľký?', 'Je le savais ! Une taupe ! Grosse comment ?'); return; }
          g.setFlag('mato_ticho'); g.pose('mato', 'shh');
          await say(g, 'mato', '(šepká) Pst. Dobre. Som ticho.', '(il chuchote) Chut. D\'accord. Je me tais.', [['pst', 'chut'], ['ticho', 'le silence ; silencieux']]);
        } },
      { id: 'katka', sprite: 'katka', name: { sk: 'Katka', fr: 'Katka' }, walk: [1360, 640],
        async onUse(g) {
          if (g.flag('need_shot')) { await capture(g); return; }
          if (g.flag('tel_ticho')) { await say(g, 'katka', 'Telefón je ticho. Ako myš.', 'Le téléphone est silencieux. Comme une souris.'); return; }
          await say(g, 'katka', 'Píp! Správa. Píp! Ďalšia. Celá trieda mi píše.', 'Bip ! Un message. Bip ! Un autre. Toute la classe m\'écrit.', [['správa', 'le message']]);
          const i = await g.choice([{ sk: 'Daj telefón na tichý režim, prosím.', fr: 'Mets le téléphone en silencieux, s\'il te plaît.' }, { sk: 'Vypni internet.', fr: 'Coupe internet.' }]);
          if (i === 1) { await say(g, 'katka', 'Vypnúť internet? Nikdy. Ale tichý režim… možno.', 'Couper internet ? Jamais. Mais le mode silencieux… peut-être.'); return; }
          g.setFlag('tel_ticho'); g.pose('katka', 'silent');
          await say(g, 'katka', 'Tichý režim. Hotovo.', 'Mode silencieux. C\'est fait.', [['tichý režim', 'le mode silencieux']]);
          g.pose('katka', null);
        } },
      { id: 'zvonec', sprite: 'zvonec', name: { sk: 'ovca so zvoncom', fr: 'la brebis à la cloche' }, walk: [1640, 610], when: (g) => !g.flag('zvonec_prec'),
        onItem: { list: async (g) => {
          g.take('list'); g.setFlag('zvonec_prec');
          await say(g, 'narrator', 'Gab hodí zvyšok listu ďaleko do trávy. Ovca beží za ním. Cingi… lingi… …', 'Gab lance le reste de la feuille loin dans l\'herbe. La brebis court derrière. Ding… ding… …');
          await g.walk('zvonec', 2500, 575); g.hide('zvonec');
        } },
        async onUse(g) {
          g.sfx('cloche_mouton');
          if (!g.has('list')) { await say(g, 'fox', 'Cingi-lingi. Nechce odísť. Prázdne ruky ju nezaujímajú.', 'Ding-ding. Elle ne veut pas partir. Les mains vides ne l\'intéressent pas.'); return; }
          await say(g, 'fox', 'Cingi-lingi. Celý čas. Mám ešte kúsok kapusty…', 'Ding-ding. Tout le temps. J\'ai encore un bout de chou…');
        } },
      { id: 'traktor', sprite: 'traktor', name: { sk: 'traktor', fr: 'le tracteur' },
        async onUse(g) { g.sfx('tracteur'); await say(g, 'fox', 'Starý jazvec na traktore. Vrrrm. Pomaly. Veľmi pomaly.', 'Un vieux blaireau sur son tracteur. Vrrrm. Lentement. Très lentement.', [['traktor', 'le tracteur'], ['pomaly', 'lentement']]); } },
      { id: 'sliepky', sprite: 'sliepky', name: { sk: 'sliepky', fr: 'les poules' },
        async onUse(g) { await say(g, 'fox', 'Sliepky. Ticho nepoznajú, ale sú ďaleko.', 'Des poules. Elles ne connaissent pas le silence, mais elles sont loin.'); } },
      { id: 'pradlo', name: { sk: 'bielizeň', fr: 'le linge' }, poly: box(150, 170, 630, 390),
        look: { sk: 'Bielizeň na šnúre. Maťova košeľa je veľká ako plachta.', fr: 'Du linge sur la corde. La chemise de Maťo est grande comme un drap.', words: [['bielizeň', 'le linge'], ['košeľa', 'la chemise']] } },
      { id: 'seno', name: { sk: 'seno', fr: 'la botte de foin' }, poly: box(700, 280, 960, 395),
        look: { sk: 'Bal sena. Mäkký. Maťo by na ňom spal.', fr: 'Une botte de foin. Moelleuse. Maťo y dormirait bien.', words: [['seno', 'le foin']] } },
      { id: 'vedro', name: { sk: 'vedro', fr: 'le seau' }, poly: box(690, 395, 790, 480),
        look: { sk: 'Starý plechový vedro. Prázdne. Ako všetko tu.', fr: 'Un vieux seau en fer. Vide. Comme tout ici.' } },
      { id: 'budova', name: { sk: 'sivá budova', fr: 'le bâtiment gris' }, poly: box(1670, 135, 1840, 200),
        look: { sk: 'Sivá budova v údolí. Výkop išiel odtiaľto… až tam.', fr: 'Le bâtiment gris dans la vallée. La tranchée allait d\'ici… jusque là-bas.' } },
      { id: 'spat', name: { sk: 'späť do dediny', fr: 'retour au village' }, poly: box(0, 380, 110, 712), walk: [90, 640],
        async onUse(g) { g.goScene('dedina'); } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [500, 640],
        async onUse(g) {
          if (!g.flag('poklop_done')) { await say(g, 'andrea', 'Tadiaľto išiel výkop. Rovno cez lúku.', 'C\'est par là qu\'allait la tranchée. Tout droit à travers le pré.'); return; }
          await say(g, 'andrea', 'Voda tečie dole. K sivej budove.', 'L\'eau coule vers le bas. Vers le bâtiment gris.');
        } },
    ],
    hints: [
      { id: 'c5_lift', when: (g) => !g.flag('lift'), levels: [
        { sk: 'Ten poklop v tráve. Čo je na ňom napísané?', fr: 'La plaque dans l\'herbe. Qu\'est-ce qui est écrit dessus ?' },
        { sk: 'Klikni na poklop OPTIKA.', fr: 'Clique sur la plaque OPTIKA.' } ] },
      { id: 'c5_ticho', when: (g) => !g.flag('poklop_done') && (!g.flag('mato_ticho') || !g.flag('tel_ticho') || !g.flag('zvonec_prec')), levels: [
        { sk: 'Je tu príliš veľa hluku. Kto robí hluk?', fr: 'Il y a trop de bruit ici. Qui fait du bruit ?', words: [['hluk', 'le bruit']] },
        { sk: 'Maťo rozpráva, telefón pípa, zvonec cinká. Každý potrebuje niečo iné.', fr: 'Maťo parle, le téléphone bipe, la cloche tinte. Chacun a besoin de quelque chose de différent.' },
        { sk: 'Maťovi: „Pst!“ Katke: tichý režim. Ovci: zvyšok kapusty.', fr: 'À Maťo : « Pst ! ». À Katka : le mode silencieux. À la brebis : le reste du chou.' } ] },
      { id: 'c5_glass', when: (g) => !g.flag('poklop_done') && !g.has('pohar'), levels: [
        { sk: 'Ucho na železe nestačí. Čo zosilní zvuk? Niečo z kuchyne…', fr: 'L\'oreille sur le fer ne suffit pas. Qu\'est-ce qui amplifie le son ? Quelque chose de la cuisine…' },
        { sk: 'Pohár! Babka má pohár na kredenci. Babke sa vyká.', fr: 'Un verre ! Babka a un verre sur le buffet. À Babka, on dit « vous ».' },
        { sk: 'V kuchyni povedz: „Babka, požičiate mi pohár?“', fr: 'Dans la cuisine, dis : « Babka, požičiate mi pohár ? »' } ] },
      { id: 'c5_glass2', when: (g) => !g.flag('poklop_done') && g.has('pohar'), levels: [
        { sk: 'Pohár na poklop, ucho na pohár. Ale počkaj, kým je ticho.', fr: 'Le verre sur la plaque, l\'oreille sur le verre. Mais attends que ce soit silencieux.' },
        { sk: 'Ak ide traktor, počkaj, kým prejde.', fr: 'Si le tracteur passe, attends qu\'il soit passé.' } ] },
      { id: 'c5_shot', when: (g) => g.flag('need_shot'), levels: [
        { sk: 'Telefón je vybitý. Zásuvka je u babky v kuchyni.', fr: 'Le téléphone est à plat. La prise est dans la cuisine de Babka.' } ] },
    ],
    async onEnter(g) {
      if (g.flag('z0')) { if (g.flag('mato_ticho')) g.pose('mato', 'shh'); return; }
      g.setFlag('z0');
      await say(g, 'narrator', 'Za salašom, v tráve, je železný poklop. Na ňom je jedno slovo: OPTIKA.', 'Derrière la bergerie, dans l\'herbe, une plaque en fer. Dessus, un mot : OPTIKA.', [['poklop', 'la plaque, le couvercle'], ['železný', 'en fer']]);
    },
  };
  S.zadok.hotspots.sort((a, b) => rank(a) - rank(b));

  async function lift(g) {
    g.setFlag('lift');
    await say(g, 'fox', 'Môžeš ho zdvihnúť?', 'Tu peux la soulever ?', [['zdvihnúť', 'soulever']]);
    await g.walk('mato', 960, 640); g.face('mato', 1);
    g.pose('mato', 'pull');
    await say(g, 'narrator', 'Maťo to skúsi. Poklop sa nepohne. Zdvihne sa Maťo.', 'Maťo essaie. La plaque ne bouge pas. C\'est Maťo qui se soulève.');
    await g.sleep(500);
    g.pose('mato', 'scratch');
    await say(g, 'mato', 'Je priskrutkovaný. Veľmi veľkými skrutkami.', 'Elle est vissée. Avec de très grosses vis.', [['skrutka', 'la vis'], ['priskrutkovaný', 'vissé']]);
    g.pose('mato', null);
    await say(g, 'katka', 'Pre optiku? U nás je optika v malej plastovej krabičke.', 'Pour de la fibre ? Chez nous, la fibre tient dans une petite boîte en plastique.');
    if (!g.hasCard('krabicka')) g.addCard('krabicka');
    await say(g, 'fox', 'Pst. Počúvajte.', 'Chut. Écoutez.', [['počúvať', 'écouter']]);
    await listen(g, false);
  }
  async function listen(g, glass) {
    g.setFlag('zadok_glass');
    g.pose('fox', 'pick');
    const n = noises(g);
    if (n.length) {
      await say(g, 'narrator', 'Gab si kľakne. Priloží ucho na železo. ' + n.map((q) => q[0]).join(' '), 'Gab se met à genoux. Il pose l\'oreille sur le fer. ' + n.map((q) => q[1]).join(' '), [['kľaknúť si', 's\'agenouiller'], ['ucho', 'l\'oreille']]);
      g.pose('fox', null);
      await say(g, 'fox', 'Je tu príliš veľa hluku.', 'Il y a trop de bruit.', [['hluk', 'le bruit']]);
      return;
    }
    if (!glass) {
      await say(g, 'narrator', 'Ticho. Gab počúva ucho na železe. Hm… niečo? Nič? Železo je hrubé.', 'Silence. Gab écoute, l\'oreille sur le fer. Hm… quelque chose ? Rien ? Le fer est épais.', [['hrubý', 'épais']]);
      g.pose('fox', null);
      await say(g, 'fox', 'Potrebujem niečo, čo zosilní zvuk. Ako v starých filmoch… pohár!', 'Il me faut quelque chose pour amplifier le son. Comme dans les vieux films… un verre !', [['zvuk', 'le son']]);
      return;
    }
    await say(g, 'narrator', 'Pohár na poklop. Ucho na pohár. Všetci štyria zadržia dych.', 'Le verre sur la plaque. L\'oreille sur le verre. Tous les quatre retiennent leur souffle.');
    g.sfx('eau_poklop');
    for (;;) {
      await say(g, 'narrator', 'Dole niečo… šumí. Šššš. Rýchlo. Stále.', 'En dessous, quelque chose… bruisse. Chhhh. Vite. Sans arrêt.');
      const i = await g.choice([{ sk: 'Fúka vietor.', fr: 'Le vent souffle.' }, { sk: 'Ticho.', fr: 'Le silence.' }, { sk: 'Tečie voda.', fr: 'L\'eau coule.' }], { noFr: true });
      if (i === 2) break;
      if (i === 0) await say(g, 'andrea', 'Vietor pod zemou? Počúvaj znova.', 'Du vent sous la terre ? Écoute encore.', [['vietor', 'le vent']]);
      else await say(g, 'katka', 'Ticho to nie je. Ticho je tu hore.', 'Ce n\'est pas le silence. Le silence, c\'est ici, en haut.');
      g.sfx('eau_poklop');
    }
    g.pose('fox', null);
    g.setFlag('poklop_done');
    await say(g, 'fox', 'Tečie voda. Dole niečo tečie. Rýchlo.', 'L\'eau coule. En dessous, quelque chose coule. Vite.', [['tiecť', 'couler'], ['tečie voda', 'l\'eau coule']]);
    await say(g, 'katka', 'Optika takto neznie.', 'La fibre optique ne fait pas ce bruit-là.', [['znieť', 'sonner, faire un bruit']]);
    await say(g, 'andrea', 'Nie.', 'Non.');
    g.addCard('poklop');
    await g.sleep(500);
    g.setFlag('mato_ticho', false); g.pose('mato', null);
    g.pose('katka', 'show');
    await say(g, 'katka', 'Pozrite. Sivá budova má web. „Naše údaje sú transparentné.“ Merajú potok. Každú hodinu.', 'Regardez. Le bâtiment gris a un site. « Nos données sont transparentes. » Ils mesurent le ruisseau. Toutes les heures.', [['merať', 'mesurer'], ['každú hodinu', 'toutes les heures']]);
    await say(g, 'andrea', 'Ich senzormi. Predtým to bola skutočná stanica.', 'Avec leurs capteurs. Avant, c\'était une vraie station.');
    g.pose('katka', null);
    const ok = await g.openPanel(webPanel, {});
    if (!ok) return;
    g.addCard('web42');
    await capture(g);
  }
  async function capture(g) {
    g.pose('katka', 'film');
    if (!g.drain(1)) {
      g.setFlag('need_shot');
      await say(g, 'katka', 'Screenshot… Nie! Vybitý. Batéria je na nule.', 'Une capture… Non ! À plat. La batterie est à zéro.', [['vybitý', 'à plat (batterie)']]);
      g.pose('katka', 'stunned');
      await say(g, 'andrea', 'Babka má zásuvku. A ty máš nabíjačku, Gab.', 'Babka a une prise. Et toi, tu as le chargeur, Gab.');
      g.pose('katka', null);
      return;
    }
    if (g.flag('need_shot')) g.setFlag('need_shot', false);
    g.sfx('photo');
    await say(g, 'narrator', 'Katka robí screenshoty. Veľa. Klik, klik, klik.', 'Katka fait des captures d\'écran. Beaucoup. Clic, clic, clic.', [['screenshot', 'la capture d\'écran']]);
    g.pose('katka', null);
    g.addCard('web_kopia');
    await say(g, 'narrator', 'Dôkaz číslo štyri: tie isté čísla, už rok.', 'Pièce n° 4 : les mêmes chiffres, depuis un an.', [['dôkaz', 'la preuve']]);
    g.setFlag('piece4');
    await mayor(g);
  }
  async function mayor(g) {
    await g.sleep(700);
    g.sfx('voiture_arrive');
    g.walk('andrea', 1170, 652); g.walk('katka', 1280, 640);
    g.camTo(1500);
    const car = g.spawn('auto5', 2700, 676); car.face = -1;
    await g.walk('auto5', 1860, 676);
    g.face('auto5', -1);
    await say(g, 'narrator', 'Pred salašom zastane pekné nové auto. Vystúpi z neho pán.', 'Une belle voiture neuve s\'arrête devant la bergerie. Un monsieur en descend.', [['auto', 'la voiture'], ['nový', 'neuf']]);
    g.pose('auto5', 'open'); g.sfx('portiere');
    g.spawn('starosta', 1640, 690); g.face('starosta', -1);
    await g.sleep(500);
    g.pose('auto5', null);
    g.face('andrea', 1); g.face('katka', 1);
    g.pose('mato', 'cheer');
    await say(g, 'mato', 'To je pán starosta. Musíme mu to povedať!', 'C\'est monsieur le maire. Il faut lui dire !', [['starosta', 'le maire']]);
    await say(g, 'andrea', 'Maťo, počkaj…', 'Maťo, attends…');
    // on peut essayer de le retenir : rien ne marche, il est trop content
    const i = await g.choice([{ sk: 'Maťo, počkaj!', fr: 'Maťo, attends !' }, { sk: 'Maťo, pozri, vták!', fr: 'Maťo, regarde, un oiseau !' }, { sk: 'Maťo, halušky!', fr: 'Maťo, des halušky !' }]);
    if (i === 0) await say(g, 'mato', 'Prečo? Pán starosta nám pomôže!', 'Pourquoi ? Monsieur le maire va nous aider !');
    else if (i === 1) await say(g, 'mato', 'Vták? Neskôr! Teraz je starosta!', 'Un oiseau ? Plus tard ! Maintenant, c\'est le maire !', [['vták', 'l\'oiseau']]);
    else await say(g, 'mato', 'Halušky… Nie! Najprv starosta. Potom halušky.', 'Des halušky… Non ! D\'abord le maire. Ensuite les halušky.', [['najprv', 'd\'abord'], ['potom', 'ensuite']]);
    g.pose('mato', null);
    await g.walk('mato', 1450, 672); g.face('mato', 1);
    g.pose('mato', 'cheer');
    await say(g, 'mato', 'Pán starosta! Potok! Nie je to sucho! Pod poklopom je voda a čísla nie sú pravdivé!', 'Monsieur le maire ! Le ruisseau ! Ce n\'est pas la sécheresse ! Il y a de l\'eau sous la plaque, et les chiffres sont faux !', [['pravdivý', 'vrai']]);
    g.pose('starosta', 'pat');
    await say(g, 'starosta', 'Pomaly, chlapče. Aký poklop?', 'Du calme, mon garçon. Quelle plaque ?', [['pomaly', 'doucement, lentement']]);
    await say(g, 'mato', 'Tamten! Počúvajte!', 'Celle-là ! Écoutez !');
    g.pose('mato', null);
    g.pose('starosta', 'thumb');
    await say(g, 'narrator', 'Starosta poklop nepočúva. Pozerá sa na Andreu.', 'Le maire n\'écoute pas la plaque. Il regarde Andrea.');
    await say(g, 'starosta', 'Zase ty. Myslel som, že bývaš v Košiciach.', 'Encore toi. Je croyais que tu habitais à Košice.', [['bývať', 'habiter']]);
    await say(g, 'andrea', 'Mám prázdniny.', 'Je suis en vacances.', [['prázdniny', 'les vacances']]);
    g.pose('starosta', 'phone');
    await say(g, 'starosta', 'To je všetko veľmi zaujímavé. Zavolám.', 'C\'est très intéressant, tout ça. Je vais téléphoner.', [['zavolať', 'appeler']]);
    await say(g, 'andrea', 'Komu?', 'À qui ?');
    await say(g, 'starosta', 'Správnym ľuďom.', 'Aux bonnes personnes.');
    g.addCard('starosta');
    g.pose('starosta', null);
    await say(g, 'narrator', 'Nasadne do auta.', 'Il remonte dans sa voiture.');
    g.hide('starosta'); g.sfx('voiture_part');
    await g.walk('auto5', 2800, 676); g.hide('auto5');
    g.camTo(null);
    g.pose('mato', 'cheer');
    await say(g, 'mato', 'Vidíš? Pomôže nám.', 'Tu vois ? Il va nous aider.', [['pomôcť', 'aider']]);
    g.pose('mato', null);
    await say(g, 'fox', 'Štyridsaťdva centimetrov. A moja ruka v suchom potoku. Ako to spolu súvisí?', 'Quarante-deux centimètres. Et ma main dans le ruisseau sec. Comment ça va ensemble ?');
    await g.askBoard('q_cisla');
    g.pose('katka', 'call');
    await say(g, 'katka', 'V rádiu hovoria, že dole v údolí stúpa rieka.', 'À la radio, ils disent que la rivière monte, en bas, dans la vallée.', [['rieka', 'la rivière'], ['stúpať', 'monter']]);
    g.pose('katka', null);
    await say(g, 'andrea', 'Ideme dole. A čo sa týka starostu…', 'On descend. Et pour le maire…');
    await say(g, 'mato', 'Áno?', 'Oui ?');
    await say(g, 'andrea', 'Uvidíme.', 'On verra.', [['uvidíme', 'on verra']]);
    g.setFlag('ch5_done');
    await g.animate(1500, (k) => g.fade(k));
    await g.showMap('ch6');
    g.goScene('povoden');
  }
})();
