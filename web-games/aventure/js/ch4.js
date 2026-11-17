// Zajko Quest v2 « Circuit fermé » : chapitre 4 « Búrka » (l'orage, refuge dans les Hautes Tatras). Conception : docs/Jeu-conception-v2.md, section 7.
// Scenes : devant le refuge le soir (chata_vecer), la salle (izba : lumiere, puis le noir), la cuisine (cinematique), le matin (chata_rano).
// Charge apres ch3.js. Textes slovaques : premiere ecriture, a relire par un natif.
(function () {
  const D = globalThis.ZG_DATA, L = globalThis.ZG_LIB;
  const { gab, andrea, box, say, W, H } = L;
  const S = D.scenes;

  // ------------------------------------------------------------------ personnages, objets, cartes
  Object.assign(D.characters, {
    chatar: { name: 'Strážca', icon: '👴', color: '#8a6a3a' },
    panm: { name: 'Pán v obleku', icon: '🕴️', color: '#555a66' },
  });
  Object.assign(D.items, {
    sviecka: { sk: 'sviečka', fr: 'la bougie', icon: 'art/obj_sviecka.png' },
    zapalky: { sk: 'suché zápalky', fr: 'les allumettes sèches', icon: 'art/item_zapalky.png' },
    kanvica: { sk: 'kanvica', fr: 'la bouilloire', icon: 'art/obj_kanvica.png' },
    salka: { sk: 'šálka', fr: 'la tasse', icon: 'art/item_salka.png' },
    vizitka: { sk: 'vizitka', fr: 'la carte de visite', icon: 'art/obj_vizitka.png' },
  });
  D.preload = (D.preload || []).concat(['art/foto_a.webp', 'art/foto_b.webp', 'art/foto_c.webp', 'art/amb_dazd_a.png', 'art/amb_dazd_b.png',
    'art/amb_blesk_a.png', 'art/amb_blesk_b.png', 'art/obj_salky.png', 'art/item_salka.png', 'art/obj_tenisky.png', 'art/obj_taska.png', 'art/obj_vizitka.png',
    'art/amb_plamen_a.png', 'art/amb_plamen_b.png', 'art/tatry_kuchyna.webp', 'art/tatry_chata_rano.webp']);
  Object.assign(D.board.cards, {
    fotka_vykop: { icon: '📷', sk: 'Fotka: dlhý výkop od mokrade až k továrni', fr: 'Photo : une longue tranchée du marais jusqu\'à l\'usine' },
    bager_sirka: { icon: '🚜', sk: 'Výkop je široký ako bager', fr: 'La tranchée est aussi large qu\'une pelleteuse' },
    mokrad: { icon: '💧', sk: 'Výkop začína v mokradi, tam, kde je prameň', fr: 'La tranchée part du marais, là où est la source' },
    vizitka: { icon: '📇', sk: 'Vizitka s číslom: nechal ju pán, čo sa usmieva', fr: 'Une carte de visite avec un numéro : laissée par le monsieur qui sourit' },
  });
  D.board.questions.q_kabel = {
    sk: 'Kábel, alebo rúra?', fr: 'Un câble, ou un tuyau ?',
    pairs: [['fotka_vykop', 'bager_sirka'], ['mokrad', 'bager_sirka']],
    ok: [
      { who: 'andrea', sk: 'Kábel má tridsať centimetrov. Výkop je široký ako bager.', fr: 'Un câble fait trente centimètres. La tranchée est large comme une pelleteuse.', words: [['široký', 'large']] },
      { who: 'fox', sk: 'Kábel nie. Rúra. Veľká rúra.', fr: 'Pas un câble. Un tuyau. Un gros tuyau.', words: [['rúra', 'le tuyau']] },
      { who: 'andrea', sk: 'A začína tam, kde bol prameň. Zajtra ide potok o obede. Uvidíme.', fr: 'Et elle commence là où était la source. Demain, le ruisseau coule à midi. On verra.', words: [['uvidíme', 'on verra']] },
    ],
    ko: [
      { who: 'fox', sk: 'Hmm… To spolu nesúvisí.', fr: 'Hmm… ça n\'a rien à voir.' },
      { who: 'andrea', sk: 'Čo je na fotke široké? A čo to presne je?', fr: 'Qu\'est-ce qui est large sur la photo ? Et c\'est quoi, exactement ?' },
      { who: 'fox', sk: 'Fotka… a pod ňou niečo, čo vieme zmerať.', fr: 'La photo… et quelque chose qu\'on peut mesurer avec elle.' },
    ],
  };
  // la bougie et les allumettes seches : la lumiere
  (D.combos = D.combos || []).push({ a: 'sviecka', b: 'zapalky', async run(g) {
    if (g.flag('candle')) { await say(g, 'fox', 'Sviečka už horí.', 'La bougie brûle déjà.'); return; }
    g.setFlag('candle');
    await say(g, 'narrator', 'Gab škrtne zápalkou. Plamienok. Konečne vidí aj vlastné ruky.', 'Gab frotte une allumette. Une petite flamme. Enfin, il voit ses propres mains.', [['škrtnúť', 'frotter, gratter'], ['plameň', 'la flamme']]);
    await checkDark(g);
  } });

  // ------------------------------------------------------------------ outils
  const KE = 1.5, PM = 1.55;   // echelle des planches du gardien et du monsieur (hauteurs natives ~340)
  const KEEPER = { idle: 340, worry: 340, talk: 341, laugh: 340, frame: 339, candle: 346, walk: 342, cross: 347, wink: 347 };
  const keeper = (x, y, face, pose) => ({
    id: 'chatar', img: `art/chatar_${pose || 'worry'}.png`, x, y, h: KEEPER[pose || 'worry'] * KE, abs: false, face: face || -1,
    poses: Object.fromEntries(Object.entries(KEEPER).filter(([k]) => k !== 'idle').map(([k, h]) => [k, { img: `art/chatar_${k}.png`, h: h * KE }])),
  });
  const PANM = { door: 347, talk: 347, lean: 307, look: 346, tea: 342, sleep: 313, card: 351, shake: 350 };
  const pan = (x, y, hidden) => ({
    id: 'panm', img: 'art/panm_door.png', x, y, h: PANM.door * PM, face: -1, hidden: !!hidden, speed: 280, scaleSpeed: true,
    poses: Object.fromEntries(Object.entries(PANM).map(([k, h]) => [k, { img: `art/panm_${k}.png`, h: h * PM }])),
  });
  const twoPose = (id, a, b, x, y, h, alt) => ({ id, img: `art/${a}.png`, x, y, h, abs: true, face: 1, poses: { b: { img: `art/${b}.png`, h } }, alt: Object.assign({ pose: 'b', min: 3, max: 6, hold: [1.5, 3] }, alt || {}) });

  // la nuit : eclairs qui blanchissent tout (valeur 0..1 selon l'horloge du jeu)
  const flashAt = (t, every, off) => {
    const p = (t + (off || 0)) % every;
    if (p < 0.12) return 0.9;
    if (p < 0.22) return 0.15;
    if (p < 0.34) return 0.75 * (1 - (p - 0.22) / 0.12);
    return 0;
  };
  const drawBolt = (c, E, x, y, h, f) => {
    if (f <= 0.01) return;
    const im = E.img(Math.floor(E.t * 7) % 2 ? 'art/amb_blesk_a.png' : 'art/amb_blesk_b.png');
    if (!im || !im.naturalWidth) return;
    c.save(); c.globalAlpha = Math.min(1, f * 1.2);
    c.drawImage(im, x - h * im.naturalWidth / im.naturalHeight / 2, y, h * im.naturalWidth / im.naturalHeight, h);
    c.restore();
  };

  // ------------------------------------------------------------------ le mur de photos : vingt etes, la meme vallee
  const YEARS = Array.from({ length: 20 }, (_, i) => 2006 + i);
  const wallPanel = {
    draw(c, st, E) {
      c.fillStyle = 'rgba(10,12,22,.9)'; c.fillRect(0, 0, W, H);
      c.textAlign = 'center'; c.textBaseline = 'alphabetic';
      c.fillStyle = '#efe6cf'; c.font = '700 26px system-ui, sans-serif';
      c.fillText('Dvadsať liet, tá istá dolina', 640, 44);
      if (E.showFr) { c.font = 'italic 18px system-ui'; c.fillStyle = '#b9b4cf'; c.fillText('Vingt étés, la même vallée', 640, 70); }
      const ox = 190, oy = 92, cw = 180, chh = 138;
      YEARS.forEach((y, i) => {
        const x = ox + (i % 5) * cw, yy = oy + ((i / 5) | 0) * chh;
        const src = y === 2024 ? 'art/foto_b.webp' : y === 2025 ? 'art/foto_c.webp' : 'art/foto_a.webp';
        const im = E.img(src);
        c.fillStyle = '#6b4a2a'; c.fillRect(x, yy, 124, 104);
        c.fillStyle = '#d8cdb0'; c.fillRect(x + 5, yy + 5, 114, 94);
        if (im && im.naturalWidth) c.drawImage(im, x + 8, yy + 8, 108, 88);
        c.fillStyle = '#efe6cf'; c.font = '600 15px system-ui'; c.fillText(String(y), x + 62, yy + 124);
        if ((y === 2024 && st.seen.b) || (y === 2025 && st.seen.c)) { c.fillStyle = '#ffe08a'; c.fillText('★', x + 108, yy + 20); }
      });
      c.fillStyle = '#efe6cf'; c.font = '700 28px system-ui'; c.fillText('✕', 1236, 52);
      if (st.big) {
        c.fillStyle = 'rgba(0,0,0,.82)'; c.fillRect(0, 0, W, H);
        const im = E.img(st.big);
        if (im && im.naturalWidth) c.drawImage(im, 330, 40, 620, 611);
        c.strokeStyle = '#6b4a2a'; c.lineWidth = 8; c.strokeRect(326, 36, 628, 619);
        c.fillStyle = '#efe6cf'; c.font = '700 28px system-ui'; c.fillText(st.big === 'art/foto_b.webp' ? '2024' : '2025', 640, 690);
      }
      c.textAlign = 'left';
    },
    async click(p, st, g, E) {
      if (st.big) {
        const was = st.big; st.big = null;
        if (st.seen.b && st.seen.c) return { done: true };
        if (was === 'art/foto_b.webp' && !st.said1) {
          st.said1 = true;
          await g.say('fox', 'Čiara. Hnedá čiara cez celý svah! A pri nej… bager?', 'Une ligne. Une ligne brune sur toute la pente ! Et à côté… une pelleteuse ?', [['čiara', 'la ligne']]);
          await g.say('andrea', 'Pozri sa na ďalšiu fotku.', 'Regarde la photo suivante.');
        }
        return null;
      }
      if (p[0] > 1190 && p[1] < 80) return { done: !!(st.seen.b && st.seen.c) };
      const ox = 190, oy = 92, cw = 180, chh = 138;
      const i = YEARS.findIndex((y, k) => { const x = ox + (k % 5) * cw, yy = oy + ((k / 5) | 0) * chh; return p[0] >= x && p[0] <= x + 124 && p[1] >= yy && p[1] <= yy + 104; });
      if (i < 0) return null;
      const y = YEARS[i];
      if (y === 2024) { st.seen.b = true; st.big = 'art/foto_b.webp'; }
      else if (y === 2025) { st.seen.c = true; st.big = 'art/foto_c.webp'; }
      else g.toast('Tá istá dolina.', 'La même vallée.');
      return null;
    },
  };

  // ------------------------------------------------------------------ la tranchee et la pelleteuse : on regarde de pres
  const PH = { x: 70, y: 36, s: 0.93 };   // la photo (690 x 680) dessinee a 0,93
  const EXC = [73, 234, 119, 264];        // la pelleteuse dans la photo (tools/make_fotky.py)
  const comparePanel = {
    draw(c, st, E) {
      c.fillStyle = 'rgba(10,12,22,.92)'; c.fillRect(0, 0, W, H);
      const im = E.img('art/foto_b.webp');
      if (im && im.naturalWidth) c.drawImage(im, PH.x, PH.y, 690 * PH.s, 680 * PH.s);
      c.strokeStyle = '#6b4a2a'; c.lineWidth = 8; c.strokeRect(PH.x - 4, PH.y - 4, 690 * PH.s + 8, 680 * PH.s + 8);
      c.textBaseline = 'alphabetic';
      c.fillStyle = '#efe6cf'; c.font = '700 24px system-ui'; c.textAlign = 'left';
      c.fillText('Fotka, 2024', 760, 80);
      c.font = '20px system-ui'; c.fillStyle = '#d8d2c0';
      c.fillText(st.zoom ? 'Lupa: bager a výkop' : 'Pozri sa na bager.', 760, 116);
      if (E.showFr) { c.font = 'italic 18px system-ui'; c.fillStyle = '#b9b4cf'; c.fillText(st.zoom ? 'Loupe : la pelleteuse et la tranchée' : 'Regarde la pelleteuse.', 760, 144); }
      if (!st.zoom) {
        const rx = PH.x + EXC[0] * PH.s, ry = PH.y + EXC[1] * PH.s, rw = (EXC[2] - EXC[0]) * PH.s, rh = (EXC[3] - EXC[1]) * PH.s;
        const pulse = 0.5 + 0.5 * Math.sin(E.t * 4);
        c.strokeStyle = `rgba(255,224,138,${0.35 + 0.4 * pulse})`; c.lineWidth = 3; c.strokeRect(rx - 10, ry - 10, rw + 20, rh + 20);
      } else {
        const sx = 20, sy = 195, sw = 190, sh = 110, k = 3.1, ox = 690, oy = 150;
        c.save(); c.beginPath(); c.arc(ox + sw * k / 2, oy + sh * k / 2 + 10, 285, 0, 7); c.clip();
        c.fillStyle = '#000'; c.fillRect(ox - 20, oy - 100, sw * k + 40, sh * k + 160);
        if (im && im.naturalWidth) c.drawImage(im, sx, sy, sw, sh, ox, oy, sw * k, sh * k);
        c.restore();
        c.strokeStyle = '#c8a060'; c.lineWidth = 10; c.beginPath(); c.arc(ox + sw * k / 2, oy + sh * k / 2 + 10, 285, 0, 7); c.stroke();
        // deux accolades de la meme longueur : le bager (46) et la bande brune (36)
        const bx = ox + (EXC[0] - sx) * k, bw = (EXC[2] - EXC[0]) * k;
        c.strokeStyle = '#ffe08a'; c.lineWidth = 4;
        c.beginPath(); c.moveTo(bx, oy + 330); c.lineTo(bx, oy + 346); c.lineTo(bx + bw, oy + 346); c.lineTo(bx + bw, oy + 330); c.stroke();
        c.fillStyle = '#ffe08a'; c.font = '700 22px system-ui'; c.textAlign = 'center'; c.fillText('bager', bx + bw / 2, oy + 376);
        c.textAlign = 'left';
        c.fillStyle = '#efe6cf'; c.font = '700 26px system-ui'; c.fillText('Výkop ≈ bager', 740, 650);
        if (E.showFr) { c.font = 'italic 18px system-ui'; c.fillStyle = '#b9b4cf'; c.fillText('La tranchée ≈ la pelleteuse', 740, 678); }
      }
    },
    async click(p, st, g, E) {
      if (st.zoom) {
        if (!st.said) {
          st.said = true;
          await g.say('fox', 'Výkop je takmer taký široký ako bager!', 'La tranchée est presque aussi large que la pelleteuse !');
          await g.say('andrea', 'Kábel má tridsať centimetrov. Toto je skoro dva metre.', 'Un câble fait trente centimètres. Ça, c\'est presque deux mètres.', [['kábel', 'le câble']]);
          await g.say('fox', 'To nie je kábel.', 'Ce n\'est pas un câble.');
          return { done: true };
        }
        return { done: true };
      }
      const rx = PH.x + EXC[0] * PH.s, ry = PH.y + EXC[1] * PH.s, rw = (EXC[2] - EXC[0]) * PH.s, rh = (EXC[3] - EXC[1]) * PH.s;
      if (p[0] >= rx - 20 && p[0] <= rx + rw + 20 && p[1] >= ry - 20 && p[1] <= ry + rh + 20) { st.zoom = true; return null; }
      if (p[0] > 1190 && p[1] < 80) return { done: false };
      g.toast('Pozri sa na bager.', 'Regarde la pelleteuse.');
      return null;
    },
  };

  // « Horí ti chvost ! » : il ne faut surtout pas bouger pendant trois secondes
  const tailPanel = {
    draw(c, st, E) {
      c.fillStyle = 'rgba(0,0,0,0)';
      const k = Math.min(1, (E.t - st.t0) / 3);
      c.fillStyle = 'rgba(255,255,255,.04)'; c.fillRect(0, H - 8, W * k, 8);
    },
    tick(st, E) { if (st.t0 === undefined) st.t0 = E.t; return E.t - st.t0 > 3 ? { done: true } : null; },
    async click() { return { done: false }; },
  };

  // ------------------------------------------------------------------ sequence de la salle
  async function checkDark(g) {
    if (g.flag('dark') && g.flag('candle') && g.flag('stove_lit') && g.flag('tea_made') && !g.flag('knocked')) await knocks(g);
  }
  const traceStates = (g) => ['tr_bag', 'tr_mug', 'tr_shoes'].filter((k) => g.flag(k)).length;
  async function knocks(g) {
    g.setFlag('knocked');
    await g.sleep(800);
    await say(g, 'narrator', 'Buch, buch, buch. Niekto klope na dvere.', 'Toc, toc, toc. Quelqu\'un frappe à la porte.', [['klopať', 'frapper']]);
    await say(g, 'chatar', 'V takej búrke? Kto to môže byť?', 'Par un temps pareil ? Qui ça peut être ?');
    g.face('andrea', 1);
    await say(g, 'andrea', 'Gab. To je on. Pán, čo sa usmieva. Ja tu nie som!', 'Gab. C\'est lui. Le monsieur qui sourit. Je ne suis pas là !', [['nie som tu', 'je ne suis pas là']]);
    await g.walk('andrea', 2060, 650);
    g.hide('andrea');
    await say(g, 'andrea', 'Šepká cez okienko: „Moje veci! Rýchlo!“', 'Elle chuchote par le passe-plat : « Mes affaires ! Vite ! »');
    await say(g, 'chatar', 'Idem otvoriť. Pomaly. Koleno.', 'Je vais ouvrir. Lentement. Le genou.');
    g.setFlag('chrono', 1);
    g.toast('Skry Andreine stopy!', 'Cache les traces d\'Andrea !');
    startChrono(g);
  }
  function startChrono(g) {
    const n = g.flagv('chrono_n') || 0;
    g.setFlag('chrono_n', n + 1);
    g.after(48000, async (a) => {
      if (a.flag('man_in') || !a.flag('chrono')) return;
      await caught(a);
    });
  }
  async function caught(g) {
    g.setFlag('chrono', 0);
    const left = !g.flag('tr_mug') ? 'mug' : !g.flag('tr_bag') ? 'bag' : 'shoes';
    await manWalksIn(g);
    if (left === 'mug') await say(g, 'panm', 'Dve šálky?', 'Deux tasses ?', [['dve šálky', 'deux tasses']]);
    else if (left === 'bag') await say(g, 'panm', 'Žltá taška? Zaujímavé.', 'Un sac jaune ? Intéressant.');
    else await say(g, 'panm', 'Mokré tenisky. Červené. Malé.', 'Des baskets mouillées. Rouges. Petites.');
    g.pose('panm', 'look');
    await say(g, 'chatar', 'To som… prezliekal sa pre hostí.', 'C\'est… je me suis changé pour les invités.');
    await say(g, 'panm', 'Samozrejme.', 'Bien sûr.');
    await g.sleep(500);
    g.pose('panm', null);
    await say(g, 'narrator', 'Pán sa usmieva. Veľmi sladko. Ešte raz od začiatku.', 'Le monsieur sourit. Très doucement. On recommence.');
    g.hide('panm');
    g.setFlag('tr_bag', false); g.setFlag('tr_mug', false); g.setFlag('tr_shoes', false); g.setFlag('man_in', false);
    g.setFlag('chrono', 1);
    startChrono(g);
  }
  async function manWalksIn(g) {
    g.setFlag('man_in');
    g.camTo(300);
    const m = g.spawn('panm', 90, 662); g.face('panm', 1);
    m.pose = 'door';
    await g.walk('panm', 340, 662);
    g.face('panm', 1);
    await say(g, 'panm', 'Dobrý večer. Hrozné počasie. Môžem si sadnúť?', 'Bonsoir. Quel temps affreux. Je peux m\'asseoir ?');
    g.camTo(null);
  }
  async function manScene(g) {
    await manWalksIn(g);
    const m = g.sprite('panm'); m.pose = 'talk';
    await say(g, 'panm', 'Hľadám jedno dievča. Má žltú tašku. Videli ste ju?', 'Je cherche une jeune fille. Elle a un sac jaune. Vous l\'avez vue ?', [['hľadať', 'chercher']]);
    for (;;) {
      const i = await g.choice([
        { sk: 'Nie. Nikoho sme nevideli.', fr: 'Non. Nous n\'avons vu personne.' },
        { sk: 'Nerozumiem, som Francúz.', fr: 'Je ne comprends pas, je suis français.' },
        { sk: 'Áno, bola tu.', fr: 'Oui, elle était là.' },
      ], { noFr: true });
      if (i === 1) break;
      if (i === 2) { await say(g, 'panm', 'Aha! Kam išla?', 'Ah ! Où est-elle allée ?'); await say(g, 'chatar', 'Nikam. Je to môj hosť. Pokoj.', 'Nulle part. C\'est mon invité. Paix.'); }
      else await say(g, 'panm', 'Nikoho? Dve šálky. Mokré tenisky. Nikoho.', 'Personne ? Deux tasses. Des baskets mouillées. Personne.');
      await say(g, 'panm', 'Ešte raz. Videli ste ju?', 'Encore une fois. Vous l\'avez vue ?');
    }
    g.setFlag('nerozumiem_pan');
    await say(g, 'panm', 'Francúz?', 'Français ?');
    await say(g, 'fox', 'Francúz. Nerozumiem. Veľmi.', 'Français. Je ne comprends pas. Beaucoup.');
    g.pose('panm', 'lean');
    await say(g, 'panm', 'Chápem. Tak… skúsime inak.', 'Je comprends. Alors… essayons autrement.', [['chápať', 'comprendre']]);
    for (;;) {
      await say(g, 'panm', 'Horí ti chvost!', 'Ta queue brûle !', [['horieť', 'brûler'], ['chvost', 'la queue']]);
      const ok = await g.openPanel(tailPanel, {});
      if (ok) break;
      g.pose('fox', 'surprised');
      await say(g, 'panm', 'Aha. Takže predsa len rozumieš.', 'Ah. Alors tu comprends, finalement.');
      await say(g, 'fox', 'Nie! Chcel som… to bol reflex!', 'Non ! Je voulais… c\'était un réflexe !');
      g.pose('fox', null);
      await say(g, 'andrea', '(z kuchyne, šeptom) Nehýb sa. Nič. Tri sekundy.', '(depuis la cuisine, en chuchotant) Ne bouge pas. Rien. Trois secondes.');
      await say(g, 'panm', 'Skúsime znova. Horí ti chvost!', 'On recommence. Ta queue brûle !');
    }
    g.pose('panm', 'talk');
    await say(g, 'panm', 'Bageta!', 'Baguette !');
    await say(g, 'fox', '… Bageta.', '… Baguette.', [['bageta', 'la baguette']]);
    await say(g, 'panm', 'Naozaj Francúz. Škoda. Dám si čaj.', 'Vraiment français. Dommage. Je prendrai un thé.');
    await say(g, 'chatar', 'Prosím. Dva čaje už sú. Tam je lavica. Spite, pane. Búrka bude dlhá.', 'Voilà. Deux thés sont déjà prêts. Là-bas, il y a le banc. Dormez, monsieur. L\'orage va durer.');
    g.pose('panm', 'tea');
    await g.sleep(1200);
    await g.walk('panm', 620, 668);
    g.face('panm', -1);
    g.pose('panm', 'sleep');
    g.setFlag('man_sleeps');
    g.setFlag('chrono', 0);
    await say(g, 'chatar', 'Už spí. Pán, čo sa usmieva, spí s úsmevom.', 'Il dort déjà. Le monsieur qui sourit dort avec le sourire.');
    await say(g, 'fox', 'Ja idem do kuchyne.', 'Je vais à la cuisine.');
  }

  // ================================================================== les decors
  // ---------------------------------------------------------------- 1. devant le refuge, le soir
  S.chata_vecer = {
    chapter: 'ch4', title: { sk: 'Chata pri plese', fr: 'Devant le refuge' }, tint: ['#6a7aa6', '#d9a86a'],
    bg: 'art/tatry_chata_vecer.webp', worldW: 2160,
    player: 'fox', floor: [[0, 585], [2160, 585], [2160, 712], [0, 712]], scale: { y0: 585, s0: 0.5, y1: 712, s1: 0.62 },
    sprites: [gab(150, 650), andrea(280, 1, 645), keeper(1380, 640, -1, 'worry'), twoPose('svist', 'svist_a', 'svist_b', 430, 545, 120, { min: 3, max: 6, hold: [1, 1.6] })],
    ambient: [{ sweep: { area: [0, 0, 2160, 585], period: 13, a: 0.1 } }],
    overlay(c, g, E) {   // l'eclair muet, tres loin, a droite
      const f = flashAt(E.t, 11, 4) * 0.8;
      drawBolt(c, E, 1870, -10, 330, f);
    },
    night: (g, E) => ({ a: 0.05 + Math.min(0.28, (E.sceneTime || 0) / 90), lights: [], flash: flashAt(E.t, 11, 4) * 0.12 }),
    hotspots: [
      { id: 'dvere', name: { sk: 'dvere chaty', fr: 'la porte du refuge' }, poly: box(1515, 300, 1625, 520), walk: [1570, 590],
        async onUse(g) {
          if (!g.flag('chatar_met')) { await say(g, 'chatar', 'Poďte dnu! Najprv sa porozprávame.', 'Entrez ! Mais d\'abord, parlons.'); return; }
          g.goScene('izba');
        } },
      { id: 'chatar', sprite: 'chatar', name: { sk: 'strážca', fr: 'le gardien' }, walk: [1300, 650],
        async onUse(g) {
          await say(g, 'chatar', g.flag('chatar_met') ? 'Poďte do chaty. Burka už ide.' : 'Poďte bližšie, deti.', g.flag('chatar_met') ? 'Entrez dans le refuge. L\'orage arrive.' : 'Approchez, les enfants.');
          g.setFlag('chatar_met');
        } },
      { id: 'svist', sprite: 'svist', name: { sk: 'svišť', fr: 'la marmotte' },
        async onUse(g) { await say(g, 'fox', 'Svišť! Píska. Ako keby kričala: „Búrka!“', 'Une marmotte ! Elle siffle. Comme si elle criait : « Orage ! »', [['svišť', 'la marmotte'], ['pískať', 'siffler']]); } },
      { id: 'lavica', name: { sk: 'lavica', fr: 'le banc' }, poly: box(1245, 450, 1475, 535),
        look: { sk: 'Drevená lavica pri dverách. Prázdna. Zatiaľ.', fr: 'Un banc en bois près de la porte. Vide. Pour l\'instant.', words: [['lavica', 'le banc']] } },
      { id: 'jazero', name: { sk: 'pleso', fr: 'le petit lac' }, poly: box(470, 395, 1100, 540),
        look: { sk: 'Horské pleso. Hladina sa zvlnila. Vietor.', fr: 'Un petit lac de montagne. La surface se ride. Du vent.', words: [['pleso', 'le lac de montagne']] } },
      { id: 'mraky', name: { sk: 'mraky', fr: 'les nuages' }, poly: box(1050, 0, 2160, 300),
        look: { sk: 'Čierne mraky. Prichádzajú sprava. Pod nimi je žltozelené svetlo.', fr: 'Des nuages noirs. Ils arrivent par la droite. En dessous, une lumière jaune-vert.', words: [['mraky', 'les nuages']] } },
      { id: 'topanky', name: { sk: 'topánky', fr: 'les chaussures' }, poly: box(1775, 455, 1900, 500),
        look: { sk: 'Mokré turistické topánky. Schnú na kameni. Zbytočne.', fr: 'Des chaussures de randonnée mouillées. Elles sèchent sur la pierre. Pour rien.', words: [['topánky', 'les chaussures']] } },
      { id: 'drevo', name: { sk: 'drevo', fr: 'le bois' }, poly: box(1925, 360, 2040, 520),
        look: { sk: 'Veľa dreva. Strážca vie, že bude dlhá noc.', fr: 'Beaucoup de bois. Le gardien sait que la nuit sera longue.', words: [['drevo', 'le bois']] } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [420, 650],
        async onUse(g) { await say(g, 'andrea', 'Ten pán nám vraví, že príde búrka. Veríš mu?', 'Ce monsieur nous dit que l\'orage arrive. Tu le crois ?'); } },
    ],
    hints: [
      { id: 'c4_talk', when: (g) => !g.flag('chatar_met'), levels: [
        { sk: 'Strážca stojí pri lavici. Porozprávaj sa s ním.', fr: 'Le gardien est près du banc. Parle-lui.' } ] },
      { id: 'c4_in', levels: [{ sk: 'Dvere chaty sú vpravo.', fr: 'La porte du refuge est à droite.' }] },
    ],
    async onEnter(g) {
      if (g.flag('cv0')) return;
      g.setFlag('cv0');
      g.setHelper('andrea', 3);
      await say(g, 'narrator', 'Vysoké Tatry. Streda večer. Chata pri plese. A na oblohe niečo čierne.', 'Les Hautes Tatras. Mercredi soir. Le refuge au bord du lac. Et dans le ciel, quelque chose de noir.', [['chata', 'le refuge']]);
      g.camTo(1300); await g.sleep(1100); g.camTo(null);
      await say(g, 'chatar', 'Bude búrka. Cítim ju v kolene.', 'Il va y avoir un orage. Je le sens dans mon genou.', [['búrka', 'l\'orage'], ['koleno', 'le genou']]);
      await say(g, 'fox', 'V kolene?', 'Dans le genou ?');
      await say(g, 'chatar', 'Koleno nikdy nepredpovedá dážď. Predpovedá búrku.', 'Mon genou ne prédit jamais la pluie. Il prédit l\'orage.');
      await say(g, 'andrea', 'Aj naše dedinské koleno predpovedá počasie.', 'Notre genou de village prédit la météo aussi.');
      g.setFlag('chatar_met');
    },
  };

  // ---------------------------------------------------------------- 2. la salle du refuge (lumiere, puis noir)
  const DR = { 'Soľ': [1683, 381], 'Sponky': [1746, 381], 'Špagát': [1808, 381], 'Sviečky': [1873, 381] };
  const lit = (g) => !g.flag('dark');
  S.izba = {
    chapter: 'ch4', title: { sk: 'Chata, hlavná izba', fr: 'La salle du refuge' }, tint: ['#8a6a3a', '#e0a050'],
    bg: 'art/tatry_izba.webp', worldW: 2160,
    player: 'fox', floor: [[0, 612], [2160, 612], [2160, 712], [0, 712]], scale: { y0: 612, s0: 0.66, y1: 712, s1: 0.78 },
    sprites: [gab(230, 665), andrea(350, 1, 662), keeper(1330, 664, -1, 'worry'), twoPose('bernardin', 'bernardin_a', 'bernardin_b', 860, 700, 120, { min: 6, max: 10, hold: [2.2, 3.4] }),
      twoPose('turisti', 'turisti_a', 'turisti_b', 1010, 402, 170, { min: 4, max: 8, hold: [2, 3.4] }), pan(90, 662, true)],
    props: [
      { img: 'art/obj_taska.png', x: 615, y: 452, w: 120, when: (g) => g.flag('knocked') && !g.flag('tr_bag') && !g.flag('man_sleeps') },
      { img: 'art/obj_tenisky.png', x: 255, y: 640, w: 100, when: (g) => g.flag('knocked') && !g.flag('tr_shoes') && !g.flag('man_sleeps') },
      { img: 'art/obj_salky.png', x: 1300, y: 420, w: 150, when: (g) => g.flag('tea_made') && !g.flag('tr_mug') && !g.flag('man_sleeps') },
      { img: 'art/item_salka.png', x: 1300, y: 420, w: 54, when: (g) => g.flag('tea_made') && g.flag('tr_mug') },
    ],
    overlay(c, g, E) {
      // la pluie sur la vitre, et l'eclair derriere
      const f = flashAt(E.t, 9, 2);
      c.save(); c.beginPath(); c.rect(822, 163, 195, 170); c.clip();
      drawBolt(c, E, 930, 150, 190, f);
      const im = E.img(Math.floor(E.t * 5) % 2 ? 'art/amb_dazd_a.png' : 'art/amb_dazd_b.png');
      if (im && im.naturalWidth) { c.globalAlpha = 0.6; const dy = (E.t * 140) % 170; c.drawImage(im, 822, 163 - 170 + dy, 195, 170); c.drawImage(im, 822, 163 + dy, 195, 170); }
      c.restore();
      // les etiquettes des tiroirs (ecrites par le jeu)
      c.textAlign = 'center'; c.textBaseline = 'middle';
      for (const [t, [x, y]] of Object.entries(DR)) {
        c.fillStyle = '#efe6cf'; c.fillRect(x - 26, y - 9, 52, 18);
        c.fillStyle = '#4a3220'; c.font = '700 12px system-ui, sans-serif'; c.fillText(t, x, y + 1);
      }
      c.textAlign = 'left'; c.textBaseline = 'alphabetic';
      // la flamme du poele, les mains tendues vers elle
      if (g.flag('stove_lit')) { const fl = E.img(Math.floor(E.t * 6) % 2 ? 'art/amb_piecka_a.png' : 'art/amb_piecka_b.png'); if (fl && fl.naturalWidth) c.drawImage(fl, 1462, 346, 118, 95); }
    },
    night: (g, E) => {
      if (!g.flag('dark')) return null;
      const fox = g.sprite('fox'), f = flashAt(E.t, 9, 2);
      const lights = [[fox.x, fox.y - 120, g.flag('candle') ? 330 : 165, 1]];
      if (g.flag('stove_lit')) lights.push([1520, 420, 290, 0.95]);
      return { a: 0.94 * (1 - f), lights, flash: f * 0.25 };
    },
    hotspots: [
      // ---- le mur de photos (observation)
      { id: 'photos', name: { sk: 'fotky', fr: 'les photos' }, poly: box(372, 120, 742, 372), walk: [560, 640],
        async onUse(g) {
          if (!lit(g)) { await say(g, 'fox', 'Fotky. Je tma. Nevidím ich.', 'Les photos. Il fait noir. Je ne les vois pas.'); return; }
          if (g.flag('foto_done')) { await say(g, 'fox', 'Dvadsať liet, tá istá dolina. A jedna čiara.', 'Vingt ans, la même vallée. Et une ligne.'); return; }
          if (!g.flag('chatar_photos')) {
            g.setFlag('chatar_photos');
            await say(g, 'chatar', 'Každé leto odfotím tú istú dolinu. Dvadsať rokov.', 'Chaque été, je photographie la même vallée. Vingt ans.', [['dolina', 'la vallée']]);
            await say(g, 'chatar', 'Nájdite tú, ktorá nie je ako ostatné.', 'Trouvez celle qui n\'est pas comme les autres.');
          }
          const r = await g.openPanel(wallPanel, { seen: {} });
          if (!r) return;
          g.setFlag('foto_found');
          g.pose('chatar', 'frame');
          await say(g, 'chatar', 'Pred dvoma rokmi prišli stroje. Vykopali výkop. Od mokrade hore, až dolu k továrni.', 'Il y a deux ans, des machines sont venues. Elles ont creusé une tranchée. Depuis la zone humide en haut jusqu\'à l\'usine, en bas.', [['výkop', 'la tranchée'], ['mokraď', 'la zone humide'], ['továreň', 'l\'usine']]);
          await say(g, 'chatar', 'Povedali: optický kábel. Veľmi rýchly internet.', 'Ils ont dit : un câble optique. Du très haut débit.', [['optický kábel', 'le câble optique']]);
          await say(g, 'fox', 'Optický kábel…', 'Un câble optique…');
          g.pose('chatar', null);
          g.addCard('mokrad');
          await say(g, 'chatar', 'Na druhej fotke je už jazva. Zelená. Tráva ju zakrýva.', 'Sur l\'autre photo, c\'est déjà une cicatrice. Verte. L\'herbe la recouvre.', [['jazva', 'la cicatrice']]);
          await say(g, 'andrea', 'Povedal: kábel. Zmeraj ten výkop. Pozri sa na bager vedľa neho.', 'Il a dit : un câble. Mesure cette tranchée. Regarde la pelleteuse à côté.');
          await compare(g);
        } },
      // ---- la loupe et la pelleteuse
      { id: 'foto_loupe', name: { sk: 'pozrieť zblízka', fr: 'regarder de près' }, poly: box(372, 372, 742, 400), walk: [560, 640], when: (g) => g.flag('foto_found') && !g.flag('foto_done') && lit(g),
        async onUse(g) { await compare(g); } },
      // ---- la porte d'entree
      { id: 'dvere', name: { sk: 'vchodové dvere', fr: 'la porte d\'entrée' }, poly: box(35, 95, 235, 570), walk: [260, 650],
        async onUse(g) {
          if (g.flag('knocked') && !g.flag('man_in') && !g.flag('man_sleeps')) { await say(g, 'fox', 'Nie! Teraz ju neotvorím!', 'Non ! Je n\'ouvre pas maintenant !'); return; }
          await say(g, 'fox', 'Vonku búrka. Tam nejdem.', 'Dehors, c\'est l\'orage. Je n\'y vais pas.');
        } },
      { id: 'truhla', name: { sk: 'truhlica na drevo', fr: 'le coffre à bois' }, poly: box(245, 400, 460, 540), walk: [350, 650],
        look: { sk: 'Veľká truhlica na drevo. Zmestí sa tam aj taška.', fr: 'Un grand coffre à bois. Un sac y tiendrait.', words: [['truhlica', 'le coffre']] } },
      { id: 'lavica_t', name: { sk: 'lavica', fr: 'le banc' }, poly: box(470, 430, 770, 525), walk: [620, 650],
        async onUse(g) {
          if (g.flag('tr_bag') || !g.flag('knocked')) { await say(g, 'fox', 'Dlhá lavica. Dobrá na spanie.', 'Un long banc. Pratique pour dormir.'); return; }
        } },
      { id: 'taska', top: true, name: { sk: 'Andreina taška', fr: 'le sac d\'Andrea' }, poly: box(540, 395, 695, 455), walk: [620, 650], when: (g) => g.flag('knocked') && !g.flag('tr_bag') && !g.flag('man_sleeps'),
        async onUse(g) {
          g.setFlag('tr_bag');
          await say(g, 'fox', 'Žltá taška. Do truhlice!', 'Le sac jaune. Dans le coffre !');
          await traceDone(g);
        } },
      { id: 'tenisky', top: true, name: { sk: 'mokré tenisky', fr: 'les baskets mouillées' }, poly: box(195, 590, 315, 650), walk: [300, 668], when: (g) => g.flag('knocked') && !g.flag('tr_shoes') && !g.flag('man_sleeps'),
        async onUse(g) {
          g.setFlag('tr_shoes');
          await say(g, 'fox', 'Mokré tenisky. Pod lavicu!', 'Les baskets mouillées. Sous le banc !');
          await traceDone(g);
        } },
      { id: 'salka_stopa', top: true, name: { sk: 'druhá šálka', fr: 'la deuxième tasse' }, poly: box(1235, 365, 1370, 425), walk: [1250, 650], when: (g) => g.flag('knocked') && g.flag('tea_made') && !g.flag('tr_mug') && !g.flag('man_sleeps'),
        async onUse(g) {
          g.setFlag('tr_mug');
          await say(g, 'fox', 'Dve šálky sú dve. Jednu do kredenca.', 'Deux tasses, ça fait deux. L\'une dans le buffet.');
          await traceDone(g);
        } },
      // ---- le tableau des fusibles (fausse piste)
      { id: 'poistky', name: { sk: 'poistky', fr: 'les fusibles' }, poly: box(288, 215, 352, 305), walk: [330, 650],
        async onUse(g) {
          if (lit(g)) { await say(g, 'fox', 'Skrinka s poistkami. Svieti. Nechám to tak.', 'La boîte à fusibles. Ça marche. Je n\'y touche pas.', [['poistka', 'le fusible']]); return; }
          await say(g, 'narrator', 'Gab otvorí skrinku. Zmení poistku. Nič.', 'Gab ouvre la boîte. Il change un fusible. Rien.');
          await say(g, 'chatar', 'To nie je poistka. To je búrka.', 'Ce n\'est pas un fusible. C\'est l\'orage.');
        } },
      // ---- la fenetre et les allumettes mouillees
      { id: 'okno', name: { sk: 'okno', fr: 'la fenêtre' }, poly: box(770, 110, 1060, 330),
        look: { sk: 'Za oknom blýska a leje. Okno je celé mokré.', fr: 'Derrière la fenêtre, ça éclaire et ça pleut. La vitre est trempée.', words: [['blýskať', 'faire des éclairs']] } },
      { id: 'zapalky_mokre', name: { sk: 'zápalky na parapete', fr: 'les allumettes du rebord' }, poly: box(840, 328, 900, 358), walk: [880, 650],
        async onUse(g) { await say(g, 'fox', 'Zápalky. Mokré. Ako špongia. Nepáli sa.', 'Des allumettes. Mouillées. Comme une éponge. Ça ne s\'allume pas.', [['mokrý', 'mouillé'], ['zápalky', 'les allumettes']]); } },
      { id: 'lampa', name: { sk: 'lampa', fr: 'la lampe' }, poly: box(1088, 5, 1225, 235),
        look: { sk: 'Visiaca lampa. Hojdá sa pri hrmení.', fr: 'Une lampe suspendue. Elle se balance à chaque coup de tonnerre.', words: [['hrmenie', 'le tonnerre']] } },
      // ---- la table, les tasses, le the
      { id: 'stol', name: { sk: 'stôl', fr: 'la table' }, poly: box(855, 385, 1385, 440), walk: [1100, 650],
        async onUse(g) {
          if (g.flag('tea_made')) { await say(g, 'fox', 'Dve šálky čaju. Horúce.', 'Deux tasses de thé. Brûlantes.'); return; }
          if (!g.has('salka') && !g.flag('salka_taken')) { g.setFlag('salka_taken'); g.give('salka'); await say(g, 'fox', 'Šálka. Vezmem si ju. Pre čaj.', 'Une tasse. Je la prends. Pour le thé.', [['šálka', 'la tasse']]); return; }
          await say(g, 'fox', 'Veľký drevený stôl. Čaj je studený.', 'Une grande table en bois. Le thé est froid.');
        } },
      { id: 'turisti', sprite: 'turisti', name: { sk: 'turisti', fr: 'les randonneurs' }, walk: [1050, 650],
        async onUse(g) { await say(g, 'fox', 'Dvaja mokrí turisti hrajú karty. Pri hrmení sa pozerajú k oknu.', 'Deux randonneurs trempés jouent aux cartes. À chaque coup de tonnerre, ils regardent la fenêtre.'); } },
      { id: 'bernardin', sprite: 'bernardin', name: { sk: 'bernardín', fr: 'le saint-bernard' }, walk: [960, 690],
        async onUse(g) { await say(g, 'fox', 'Starý bernardín. Spí. Pri hrmení zdvihne ucho.', 'Un vieux saint-bernard. Il dort. Au tonnerre, il lève une oreille.', [['pes', 'le chien']]); } },
      // ---- le poele
      { id: 'police', name: { sk: 'polica', fr: 'l\'étagère' }, poly: box(1270, 150, 1485, 280), walk: [1330, 650],
        async onUse(g) {
          if (!lit(g) && !g.flag('tin_taken')) {
            g.setFlag('tin_taken'); g.give('zapalky');
            await say(g, 'fox', 'Plechovka. Hmm… Suché zápalky! V plechovke sú suché zápalky!', 'Une boîte en fer. Hmm… Des allumettes sèches ! Il y a des allumettes sèches dans la boîte !', [['suchý', 'sec'], ['plechovka', 'la boîte en fer']]);
            return;
          }
          if (lit(g) && !g.flag('tin_taken')) { await say(g, 'fox', 'Plechovka a kanvica na polici. Hore sa mi nechce.', 'Une boîte en fer et une bouilloire sur l\'étagère. Je n\'ai pas besoin de monter.'); return; }
          if (!g.has('kanvica') && !g.flag('kettle_on') && !g.flag('kanvica_taken')) { g.setFlag('kanvica_taken'); g.give('kanvica'); await say(g, 'fox', 'Beriem kanvicu.', 'Je prends la bouilloire.', [['kanvica', 'la bouilloire']]); return; }
          await say(g, 'fox', 'Na polici už nič.', 'Plus rien sur l\'étagère.');
        } },
      { id: 'piecka', name: { sk: 'piecka', fr: 'le poêle' }, poly: box(1445, 85, 1585, 505), walk: [1480, 650],
        onItem: {
          zapalky: async (g) => {
            if (g.flag('stove_lit')) { await say(g, 'fox', 'Piecka už horí.', 'Le poêle brûle déjà.'); return; }
            g.setFlag('stove_lit');
            await say(g, 'narrator', 'Plamene v piecke. Izba sa zahreje. A Gab tiež.', 'Des flammes dans le poêle. La pièce se réchauffe. Gab aussi.', [['piecka', 'le poêle']]);
            await checkDark(g);
          },
          kanvica: async (g) => {
            if (!g.flag('stove_lit')) { await say(g, 'fox', 'Piecka je studená. Najprv oheň.', 'Le poêle est froid. D\'abord le feu.'); return; }
            g.take('kanvica'); g.setFlag('kettle_on');
            await say(g, 'narrator', 'Kanvica na piecke. Voda sa hreje.', 'La bouilloire sur le poêle. L\'eau chauffe.', [['voda', 'l\'eau']]);
            if (g.flag('salka_taken') && g.has('salka')) await teaPour(g);
          },
          salka: async (g) => {
            if (!g.flag('kettle_on')) { await say(g, 'fox', 'Šálka a nič v nej. Najprv voda.', 'Une tasse, et rien dedans. D\'abord de l\'eau.'); return; }
            await teaPour(g);
          },
        },
        look: { sk: 'Liatinová piecka. Nerozsvieti sa sama.', fr: 'Un poêle en fonte. Il ne s\'allume pas tout seul.', words: [['liatinový', 'en fonte']] } },
      { id: 'ponozky', name: { sk: 'ponožky na šnúre', fr: 'les chaussettes sur la corde' }, poly: box(1590, 95, 1845, 250), walk: [1700, 650],
        async onUse(g) {
          if (g.flag('ponozky')) { await say(g, 'fox', 'Vlnené ponožky. Moje ruky sú teplé.', 'Des chaussettes en laine. Mes mains sont au chaud.'); return; }
          g.setFlag('ponozky');
          await say(g, 'fox', 'B-bŕŕ… M-mám zimu. Mokrý… až po kosti.', 'B-brr… J\'ai f-froid. Mouillé… jusqu\'aux os.', [['zima', 'le froid']]);
          await say(g, 'chatar', 'Vezmi si ponožky. Sú na šnúre. Teplé.', 'Prends des chaussettes. Elles sont sur la corde. Elles sont chaudes.');
          await say(g, 'fox', 'Ponožky… na ruky?', 'Des chaussettes… sur les mains ?');
          await say(g, 'chatar', 'Na nohy! Bože.', 'Aux pieds ! Seigneur.');
          g.pose('chatar', 'laugh'); await g.sleep(900); g.pose('chatar', null);
        } },
      // ---- le buffet : quatre tiroirs, un seul bon
      ...Object.keys(DR).map((nm, i) => ({
        id: 'tiroir_' + i, name: { sk: 'zásuvka „' + nm + '“', fr: 'le tiroir « ' + nm + ' »' }, poly: box(DR[nm][0] - 31, 358, DR[nm][0] + 31, 392), walk: [DR[nm][0], 650],
        async onUse(g) {
          const words = { 'Soľ': [['soľ', 'le sel']], 'Sponky': [['sponky', 'les trombones']], 'Špagát': [['špagát', 'la ficelle']], 'Sviečky': [['sviečka', 'la bougie']] }[nm];
          if (nm === 'Sviečky') {
            if (g.has('sviecka') || g.flag('sviecka_taken')) { await say(g, 'fox', 'Už nič. Len tma a vôňa vosku.', 'Plus rien. Juste le noir et une odeur de cire.'); return; }
            g.setFlag('sviecka_taken'); g.give('sviecka');
            await say(g, 'fox', 'Sviečky! Jedna sviečka.', 'Des bougies ! Une bougie.', words);
            return;
          }
          const txt = { 'Soľ': ['Soľ. Na čaj netreba.', 'Du sel. Pas besoin pour le thé.'], 'Sponky': ['Sponky. Na tmu nepomôžu.', 'Des trombones. Ils n\'aident pas dans le noir.'], 'Špagát': ['Špagát. Na čo?', 'De la ficelle. Pour quoi faire ?'] }[nm];
          await say(g, 'fox', txt[0], txt[1], words);
        },
      })),
      { id: 'kredenc', name: { sk: 'kredenc', fr: 'le buffet' }, poly: box(1605, 390, 1935, 540), walk: [1760, 650],
        look: { sk: 'Starý maľovaný kredenc. Zásuvky majú štítky.', fr: 'Un vieux buffet peint. Les tiroirs ont des étiquettes.', words: [['štítok', 'l\'étiquette']] } },
      // ---- la cuisine
      { id: 'kuchyna', name: { sk: 'dvere do kuchyne', fr: 'la porte de la cuisine' }, poly: box(1990, 90, 2140, 590), walk: [2060, 650],
        async onUse(g) {
          if (!g.flag('man_sleeps')) { await say(g, 'fox', 'Do kuchyne… neskôr.', 'À la cuisine… plus tard.'); return; }
          g.goScene('kuchyna');
        } },
      { id: 'okienko', name: { sk: 'okienko do kuchyne', fr: 'le passe-plat' }, poly: box(1895, 190, 1985, 310), walk: [1900, 650],
        async onUse(g) {
          if (!g.flag('knocked') || g.flag('man_sleeps')) { await say(g, 'fox', 'Okienko do kuchyne. Zatvorené.', 'Le passe-plat de la cuisine. Fermé.', [['okienko', 'le passe-plat']]); return; }
          await say(g, 'andrea', '(šeptom) Taška. Šálka. Tenisky. Rýchlo!', '(en chuchotant) Le sac. La tasse. Les baskets. Vite !');
        } },
      { id: 'chatar', sprite: 'chatar', name: { sk: 'strážca', fr: 'le gardien' }, walk: [1250, 655],
        async onUse(g) {
          if (g.flag('man_sleeps')) { await say(g, 'chatar', 'Pssst. Spí.', 'Chut. Il dort.'); return; }
          if (g.flag('dark') && !g.flag('candle')) { await say(g, 'chatar', 'Tma ako v rakve. V kredenci sú sviečky.', 'Noir comme dans un four. Dans le buffet, il y a des bougies.'); return; }
          if (g.flag('dark')) { await say(g, 'chatar', 'Poistka? To nie je poistka. To je búrka.', 'Le fusible ? Ce n\'est pas un fusible. C\'est l\'orage.'); return; }
          await say(g, 'chatar', 'Pozrite sa na fotky na stene. Je tam niečo zvláštne.', 'Regardez les photos au mur. Il y a quelque chose de bizarre.');
        } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [420, 650],
        async onUse(g) { await say(g, 'andrea', lit(g) ? 'Fotky na stene. Dvadsať rokov rovnakej doliny.' : 'Pozor… Nič nevidím.', lit(g) ? 'Les photos au mur. Vingt ans de la même vallée.' : 'Attention… Je n\'y vois rien.'); } },
    ],
    hints: [
      { id: 'c4_photo', when: (g) => !g.flag('foto_found'), levels: [
        { sk: 'Strážca fotí tú istú dolinu každé leto. Pozri sa na steny.', fr: 'Le gardien photographie la même vallée chaque été. Regarde les murs.' },
        { sk: 'Jedna fotka z mnohých nie je ako ostatné. Klikni na fotky.', fr: 'Une photo sur beaucoup n\'est pas comme les autres. Clique sur les photos.' } ] },
      { id: 'c4_cmp', when: (g) => g.flag('foto_found') && !g.flag('foto_done'), levels: [
        { sk: 'Je to kábel? Zmeraj výkop. Čo stojí vedľa neho?', fr: 'Est-ce un câble ? Mesure la tranchée. Qu\'y a-t-il à côté ?' },
        { sk: 'Klikni na „pozrieť zblízka“ pod fotkami.', fr: 'Clique sur « regarder de près » sous les photos.' } ] },
      { id: 'c4_candle', when: (g) => g.flag('dark') && !g.flag('candle'), levels: [
        { sk: 'Potrebuješ svetlo. Zásuvky na kredenci majú štítky.', fr: 'Il te faut de la lumière. Les tiroirs du buffet ont des étiquettes.' },
        { sk: 'Sviečky. A suché zápalky sú v plechovke na polici.', fr: 'Des bougies. Et les allumettes sèches sont dans la boîte en fer, sur l\'étagère.' } ] },
      { id: 'c4_tea', when: (g) => g.flag('dark') && g.flag('candle') && !g.flag('tea_made'), levels: [
        { sk: 'Zapáľ piecku. Potom kanvica a šálka.', fr: 'Allume le poêle. Puis la bouilloire et la tasse.' },
        { sk: 'Zápalky použi na piecku. Kanvica je na polici.', fr: 'Utilise les allumettes sur le poêle. La bouilloire est sur l\'étagère.' } ] },
      { id: 'c4_traces', when: (g) => g.flag('knocked') && !g.flag('man_in'), levels: [
        { sk: 'Skry tri veci: taška, šálka, tenisky.', fr: 'Cache trois choses : le sac, la tasse, les baskets.' } ] },
      { id: 'c4_k', when: (g) => g.flag('man_sleeps'), levels: [{ sk: 'Dvere do kuchyne sú celkom vpravo.', fr: 'La porte de la cuisine est tout à droite.' }] },
    ],
    async onEnter(g) {
      if (g.flag('iz0')) return;
      g.setFlag('iz0');
      await say(g, 'narrator', 'Tepelné svetlo, drevené steny. A dvadsať malých fotiek v rade.', 'Une lumière chaude, des murs de bois. Et vingt petites photos alignées.');
      g.face('chatar', -1);
      await say(g, 'chatar', 'Sadnite si. Vonku bude zle.', 'Asseyez-vous. Dehors, ça va mal tourner.');
      await say(g, 'andrea', 'Pozri sa na steny, Gab. Strážca všetko fotí.', 'Regarde les murs, Gab. Le gardien photographie tout.');
    },
  };
  // les personnages passent apres les objets (le dernier de la liste gagne) : le gardien debout devant la table ne cache pas la tasse
  const rank = (h) => (h.sprite ? 0 : h.top ? 2 : 1);
  for (const id of ['chata_vecer', 'izba']) S[id].hotspots.sort((a, b) => rank(a) - rank(b));
  async function teaPour(g) {
    if (g.flag('tea_made')) return;
    if (!g.has('salka')) { await say(g, 'fox', 'Potrebujem šálku. Na stole.', 'Il me faut une tasse. Sur la table.'); return; }
    g.take('salka'); g.setFlag('tea_made');
    await say(g, 'narrator', 'Gab naleje čaj do dvoch šálok. Jedna je pre Andreu.', 'Gab verse le thé dans deux tasses. L\'une est pour Andrea.', [['naliať', 'verser']]);
    await say(g, 'chatar', 'Dva čaje. Dobrý nápad. V búrke treba teplo.', 'Deux thés. Bonne idée. Dans l\'orage, il faut de la chaleur.');
    await checkDark(g);
  }
  async function traceDone(g) {
    if (traceStates(g) < 3) return;
    await g.sleep(300);
    await say(g, 'andrea', '(z okienka, šeptom) Dobre. Teraz mlč.', '(par le passe-plat, en chuchotant) Bien. Maintenant, tais-toi.');
    await manScene(g);
  }
  async function compare(g) {
    const r = await g.openPanel(comparePanel, {});
    if (!r) return;
    g.setFlag('foto_done');
    g.addCard('bager_sirka');
    await say(g, 'chatar', 'Mám dve rovnaké. Jednu vám dám.', 'J\'en ai deux, des comme ça. Je vous en donne une.', [['rovnaký', 'pareil']]);
    g.addCard('fotka_vykop');
    await say(g, 'narrator', 'Dôkaz číslo tri: fotka výkopu.', 'Pièce n° 3 : la photo de la tranchée.', [['dôkaz', 'la preuve']]);
    g.setFlag('piece3');
    await sleepThenDark(g);
  }
  async function sleepThenDark(g) {
    await g.sleep(700);
    await say(g, 'narrator', 'Prásk! Svetlá zhasnú. Tma.', 'Crac ! Les lumières s\'éteignent. Le noir.', [['tma', 'le noir']]);
    g.setFlag('dark');
    await say(g, 'fox', 'Ja som nič nerobil!', 'Je n\'ai rien fait !');
    await say(g, 'chatar', 'To je búrka. Kredenc: sviečky. Zápalky? Hmm… tie na parapete sú mokré.', 'C\'est l\'orage. Le buffet : des bougies. Des allumettes ? Hmm… celles du rebord sont mouillées.');
    g.toast('Nájdi svetlo.', 'Trouve de la lumière.');
  }

  // ---------------------------------------------------------------- 3. la cuisine dans le noir (cinematique)
  S.kuchyna = {
    cine: true, noSkip: true, bgColor: '#05060a',
    chapter: 'ch4', title: { sk: 'Kuchyňa', fr: 'La cuisine' },
    pics: [{ id: 'kuch', img: 'art/tatry_kuchyna.webp', alpha: 1 }],
    async onEnter(g) {
      const SPOT = [820, 560];
      g.fade(1);
      await g.animate(1500, (k) => g.fade(1 - k));
      g.animate(90000, (k) => g.pic('kuch', { view: { zoom: 1 + 0.1 * k, ax: SPOT[0], ay: SPOT[1], sx: SPOT[0], sy: SPOT[1] } }));
      await g.wait(1200);
      await say(g, 'narrator', 'V kuchyni je len jedna sviečka. A blesk v okne.', 'Dans la cuisine, il n\'y a qu\'une bougie. Et l\'éclair dans la fenêtre.');
      await say(g, 'fox', 'Spí. Usmieva sa aj v spánku.', 'Il dort. Il sourit même en dormant.');
      await say(g, 'andrea', 'Ďakujem, Gab. Za tie tenisky.', 'Merci, Gab. Pour les baskets.');
      await g.wait(900);
      await say(g, 'andrea', 'Môj zápisník. Vieš, čo v ňom bolo?', 'Mon carnet. Tu sais ce qu\'il y avait dedans ?');
      await say(g, 'fox', 'Recept na limonádu?', 'Une recette de limonade ?', [['limonáda', 'la limonade']]);
      await say(g, 'andrea', 'Aj. A čísla. Hladiny. Kľúčové mesiace, kde sa voda zastavila.', 'Aussi. Et des chiffres. Des niveaux. Les mois où l\'eau s\'est arrêtée.', [['hladina', 'le niveau']]);
      await say(g, 'andrea', 'Potom mi prišiel list od právnika. Kvôli zápisníku.', 'Puis j\'ai reçu une lettre d\'avocat. À cause du carnet.', [['právnik', 'l\'avocat']]);
      for (;;) {
        const i = await g.choice([
          { sk: 'Právnik kvôli školskému zápisníku? To je vtip.', fr: 'Un avocat pour un carnet d\'école ? C\'est une blague.' },
          { sk: 'Právnika neposielajú kvôli školskému zápisníku. Iba ak má zápisník pravdu.', fr: 'On n\'envoie pas un avocat pour un carnet d\'école. Sauf si le carnet a raison.' },
          { sk: 'Možno si mala zápisník radšej nechať.', fr: 'Peut-être que tu aurais dû garder le carnet.' },
        ], { noFr: false });
        if (i === 1) break;
        if (i === 0) await say(g, 'andrea', 'Nie je to vtip. Preto mám strach.', 'Ce n\'est pas une blague. C\'est pour ça que j\'ai peur.');
        else await say(g, 'andrea', 'Možno. Ale bol môj. A bol správny.', 'Peut-être. Mais il était à moi. Et il avait raison.');
      }
      await g.wait(700);
      await say(g, 'andrea', 'Presne. Zápisník má pravdu. Preto ho chcú.', 'Exactement. Le carnet a raison. C\'est pour ça qu\'ils le veulent.');
      await say(g, 'andrea', 'Si hlúpy, Gab.', 'Tu es bête, Gab.');
      for (;;) {
        const j = await g.choice([
          { sk: 'Veľa hlúpy.', fr: '(Beaucoup bête, mal dit)' },
          { sk: 'Veľmi hlúpy. Nie veľa hlúpy.', fr: 'Très bête. Pas « beaucoup » bête.' },
          { sk: 'Hlúpy veľmi.', fr: '(Bête très, mal dit)' },
        ], { noFr: true });
        if (j === 1) break;
        await say(g, 'andrea', 'Veľmi. Nie veľa. Skúš znova.', 'Veľmi. Pas veľa. Réessaie.');
      }
      await say(g, 'andrea', 'Učíš sa.', 'Tu apprends.');
      await g.wait(1600);
      await say(g, 'andrea', 'Spi, Gab. Zajtra ráno sa potok rozhodne.', 'Dors, Gab. Demain matin, le ruisseau décidera.');
      await g.wait(1400);
      await g.animate(1800, (k) => g.fade(k));
      g.setFlag('kuch_done');
      g.goScene('chata_rano');
    },
  };

  // ---------------------------------------------------------------- 4. le matin apres l'orage
  S.chata_rano = {
    chapter: 'ch4', title: { sk: 'Chata, ráno', fr: 'Le refuge, le matin' }, tint: ['#8fc0e0', '#e8d090'],
    bg: 'art/tatry_chata_rano.webp', worldW: 2160,
    player: 'fox', floor: [[0, 585], [2160, 585], [2160, 712], [0, 712]], scale: { y0: 585, s0: 0.5, y1: 712, s1: 0.62 },
    sprites: [gab(1030, 662), andrea(1130, 1, 657), keeper(1720, 650, -1, 'wink')],
    props: [{ img: 'art/obj_vizitka.png', x: 1345, y: 468, w: 52, when: (g) => !g.flag('vizitka_taken') }],
    ambient: [{ sweep: { area: [0, 0, 2160, 585], period: 17, a: 0.06 } }],
    hotspots: [
      { id: 'vizitka', name: { sk: 'vizitka', fr: 'la carte de visite' }, poly: box(1310, 440, 1385, 480), walk: [1345, 560], when: (g) => !g.flag('vizitka_taken'),
        async onUse(g) {
          g.setFlag('vizitka_taken'); g.give('vizitka'); g.addCard('vizitka');
          await say(g, 'fox', 'Vizitka. Biela. Bez mena. Len číslo.', 'Une carte de visite. Blanche. Sans nom. Juste un numéro.', [['vizitka', 'la carte de visite'], ['číslo', 'le numéro']]);
          await say(g, 'andrea', 'Pán odišiel pred svitaním. Nechal nám ju. Veľmi zdvorilé.', 'Le monsieur est parti avant l\'aube. Il nous l\'a laissée. Très poli.');
          await say(g, 'fox', 'Číslo budeme potrebovať. Neviem prečo.', 'On aura besoin de ce numéro. Je ne sais pas pourquoi.');
          if (g.flag('piece3')) await after(g);
        } },
      { id: 'chatar', sprite: 'chatar', name: { sk: 'strážca', fr: 'le gardien' }, walk: [1620, 655],
        async onUse(g) { await say(g, 'chatar', 'Koleno povedalo búrku. Búrka prišla. Koleno má vždy pravdu.', 'Le genou a dit orage. L\'orage est venu. Le genou a toujours raison.'); } },
      { id: 'potoky', name: { sk: 'vodopády', fr: 'les cascades' }, poly: box(600, 100, 1100, 360),
        look: { sk: 'Nové biele vodopády. Všade teče voda. Dnes ráno.', fr: 'De nouvelles cascades blanches. L\'eau coule partout. Ce matin.', words: [['vodopád', 'la cascade']] } },
      { id: 'kaluze', name: { sk: 'mláky', fr: 'les flaques' }, poly: box(120, 600, 1000, 712),
        look: { sk: 'Mláky všade. Dnes noc dala veľa vody.', fr: 'Des flaques partout. Cette nuit a donné beaucoup d\'eau.', words: [['mláka', 'la flaque']] } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [1160, 657],
        async onUse(g) { await say(g, 'andrea', 'Dobré ráno. Vizitka je na lavici.', 'Bonjour. La carte de visite est sur le banc.'); } },
    ],
    hints: [{ id: 'c4_card', when: (g) => !g.flag('vizitka_taken'), levels: [{ sk: 'Pán nechal niečo na lavici.', fr: 'Le monsieur a laissé quelque chose sur le banc.' }] }],
    async onEnter(g) {
      if (g.flag('cr0')) return;
      g.setFlag('cr0');
      g.fade(1); await g.animate(1500, (k) => g.fade(1 - k));
      await say(g, 'narrator', 'Ráno. Všade voda. Jasná obloha. Pán, čo sa usmieva, je preč.', 'Le matin. De l\'eau partout. Un ciel lavé. Le monsieur qui sourit est parti.', [['ráno', 'le matin']]);
      await say(g, 'andrea', 'Pozri. Lavica je prázdna.', 'Regarde. Le banc est vide.');
    },
  };
  S.chata_rano.hotspots.sort((a, b) => rank(a) - rank(b));
  // le tableau : « un cable, ou un tuyau ? » puis le pari
  async function after(g) {
    await say(g, 'fox', 'Fotka, bager, mokraď… Ako to zapadá?', 'La photo, la pelleteuse, la zone humide… Comment ça s\'emboîte ?');
    await g.askBoard('q_kabel');
    await say(g, 'andrea', 'Pozrime sa na potok. Ak je to sucho, na obed tečie.', 'Allons voir le ruisseau. Si c\'est la sécheresse, il coule à midi.');
    g.toast('Pari : „Ak je to sucho, potok tečie na obed.“ Uvidíme.', 'Pari : « Si c\'est la sécheresse, le ruisseau coule à midi. » On verra.');
    await g.sleep(1800);
    g.setFlag('ch4_done');
    await g.animate(1500, (k) => g.fade(k));
    await g.showMap('ch5');
    g.end('Koniec ukážky · kapitola 5 čoskoro', 'Fin de l\'aperçu · le chapitre 5 arrive bientôt');
  }
})();
