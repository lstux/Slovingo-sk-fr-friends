// Zajko Quest v2 « Circuit fermé » : chapitre 3 « Le registre » (Slovenský raj). Conception : docs/Jeu-conception-v2.md, section 7.
// Quatre decors : la foret (raj), la gorge (rokle), la cabane de pan Orol (chata), le lac des castors (jazero) ; le soir : bivouac.
// Charge apres game.js : on ajoute les scenes, les cartes du tableau, les objets et les personnages a ZG_DATA.
// Textes slovaques : premiere ecriture, a relire par un natif.
(function () {
  const D = globalThis.ZG_DATA, L = globalThis.ZG_LIB;
  const { gab, andrea, box, say, follow, ROK_UP, ROK_CROSS, ROK_DOWN, inR, W, H } = L;

  // ------------------------------------------------------------------ personnages, objets, cartes
  Object.assign(D.characters, {
    bobor2: { name: 'Bobor', icon: '🦫', color: '#7a4a2a' },
    turisti: { name: 'Turisti', icon: '🦔', color: '#7a6a3a' },
  });
  Object.assign(D.items, {
    palica: { sk: 'palica', fr: 'le bâton', icon: 'art/item_palica.png' },
    siska: { sk: 'šiška', fr: 'la pomme de pin', icon: 'art/item_siska.png' },
  });
  Object.assign(D.board.cards, {
    bobry: { icon: '🦫', sk: 'Úrad: „Sucho. Alebo bobry.“', fr: 'Le bureau : « La sécheresse. Ou les castors. »' },
    potok_raj: { icon: '💧', sk: 'Raj: 2 mesiace bez dažďa, potok tečie', fr: 'Le Paradis : 2 mois sans pluie, le ruisseau coule' },
    register_sucho: { icon: '📗', sk: '3 veľmi suché letá: prameň slabý', fr: '3 étés très secs : la source faible' },
    register_nula: { icon: '📗', sk: 'Vlani normálne leto: prameň nula', fr: 'L\'an dernier, été normal : la source à zéro' },
    stroje: { icon: '🚜', sk: 'Pred 2 rokmi: stroje v noci, pri chate', fr: 'Il y a 2 ans : des machines la nuit, près du refuge' },
  });
  D.board.questions.q_sucho = {
    sk: 'Je to sucho?', fr: 'Est-ce la sécheresse ?',
    pairs: [['register_sucho', 'register_nula'], ['potok_raj', 'register_nula']],
    ok: [
      { who: 'fox', sk: 'Tri veľmi suché letá, a prameň tiekol. Slabo, ale tiekol.', fr: 'Trois étés très secs, et la source coulait. Faiblement, mais elle coulait.', words: [['tiecť', 'couler']] },
      { who: 'fox', sk: 'Vlani normálne leto, a prameň nula. Sucho? Možno. Ale nie len sucho.', fr: 'L\'an dernier, un été normal, et la source à zéro. La sécheresse ? Peut-être. Mais pas seulement.', words: [['nie len', 'pas seulement']] },
    ],
    ko: [
      { who: 'fox', sk: 'Hmm… To nehovorí nič o prameni.', fr: 'Hmm… ça ne dit rien sur la source.' },
      { who: 'fox', sk: 'Bobry? To ešte neviem. To je iná otázka.', fr: 'Les castors ? Je ne sais pas encore. C\'est une autre question.' },
      { who: 'fox', sk: 'Pozri sa do registra: suché letá… a vlani.', fr: 'Regarde dans le registre : les étés secs… et l\'an dernier.' },
    ],
  };

  // les poses du castor (tools/cut_v2.py, chapter3 : chaque pose a sa hauteur propre, meme echelle sur la planche)
  const BOBOR = { nie: 332, talk: 329, hammer: 280, look: 332, taste: 334, nod: 344, point: 337, swim: 211 };
  const BK = 0.5;
  const bobor = (x, y) => ({
    id: 'bobor2', img: 'art/bobor2_hammer.png', x, y, h: BOBOR.hammer * BK, abs: true, face: 1, pose: 'hammer',
    poses: Object.fromEntries(Object.entries(BOBOR).map(([k, h]) => [k, { img: `art/bobor2_${k}.png`, h: h * BK }])),
  });
  const twoPose = (id, a, b, x, y, h, alt) => ({ id, img: `art/${a}.png`, x, y, h, abs: true, face: 1, poses: { b: { img: `art/${b}.png`, h } }, alt: Object.assign({ pose: 'b', min: 3, max: 6, hold: [1.5, 3] }, alt || {}) });

  // ------------------------------------------------------------------ l'escalade dans le noir (gorge) : Andrea guide a la voix
  // Ecran noir, un halo ; trois prises (en haut, a gauche, a droite) ; il faut toucher celle qu'Andrea annonce. « Ešte » = la meme
  // direction qu'avant. Une erreur ou trop lent : Gab redescend d'un cran (jamais de chute). La mousse mouillee glisse toujours.
  const SEQ = ['hore', 'ešte', 'doprava', 'hore', 'doľava', 'ešte', 'hore'];
  const POS = { hore: [640, 190], 'doľava': [290, 360], doprava: [990, 360] };
  const LIMIT = 8;   // secondes par prise
  const HOLDS = ['prisa_skoba', 'prisa_priecka', 'prisa_koren'];
  const HELP = {
    hore: ['Hore! K nebu!', 'Vers le ciel !'],
    doprava: ['Doprava! Ruka, ktorou píšeš!', 'La main avec laquelle tu écris !'],
    'doľava': ['Doľava! Tá druhá ruka!', 'L\'autre main !'],
  };
  const effDir = (i) => { let j = i; while (SEQ[j] === 'ešte') j -= 1; return SEQ[j]; };
  function climbStep(st, E) {
    st.t0 = E.t; st.next = null;
    const dirs = Object.keys(POS), imgs = HOLDS.slice().sort(() => Math.random() - 0.5);
    st.holds = {}; dirs.forEach((d, i) => { st.holds[d] = imgs[i]; });
    const target = effDir(st.step), others = dirs.filter((d) => d !== target);
    if (Math.random() < 0.7) st.holds[others[(Math.random() * others.length) | 0]] = 'prisa_mach';
    const w = SEQ[st.step];
    st.call = w.charAt(0).toUpperCase() + w.slice(1) + '!';
    if (st.errs >= 2) st.help = HELP[target];
    E.speak(st.call, 'andrea');
  }
  const climbPanel = {
    draw(c, st, E) {
      c.fillStyle = '#05060a'; c.fillRect(0, 0, W, H);
      const gr = c.createRadialGradient(640, 380, 40, 640, 380, 520);
      gr.addColorStop(0, 'rgba(70,64,52,.9)'); gr.addColorStop(1, 'rgba(5,6,10,0)');
      c.fillStyle = gr; c.fillRect(0, 0, W, H);
      const pending = st.next != null || st.finish != null;
      if (!pending || st.ok) for (const d of Object.keys(POS)) {
        const im = E.img(`art/${st.holds[d]}.png`); if (!im || !im.naturalWidth) continue;
        const w = 230, h = w * im.naturalHeight / im.naturalWidth, [x, y] = POS[d];
        c.drawImage(im, x - w / 2, y - h / 2, w, h);
      }
      const paws = E.img(st.ok && E.t < st.ok ? 'art/labky_drzia.png' : 'art/labky_hladaju.png');
      if (paws && paws.naturalWidth) { const w = 440, h = w * paws.naturalHeight / paws.naturalWidth; c.drawImage(paws, 640 - w / 2, H - h + 10, w, h); }
      // la hauteur (a gauche) et le temps (en haut)
      c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(40, 120, 22, 460);
      c.fillStyle = '#7ac0e8'; const hk = st.step / SEQ.length; c.fillRect(40, 120 + 460 * (1 - hk), 22, 460 * hk);
      c.font = '26px system-ui'; c.textBaseline = 'top'; c.fillStyle = '#ccc'; c.fillText('🧗', 34, 82);
      if (!pending) {
        const k = Math.max(0, 1 - (E.t - st.t0) / LIMIT);
        c.fillStyle = 'rgba(255,255,255,.15)'; c.fillRect(340, 28, 600, 14);
        c.fillStyle = k < 0.3 ? '#ff7a6a' : '#ffe08a'; c.fillRect(340, 28, 600 * k, 14);
      }
      // la voix d'Andrea (pas de traduction : c'est l'enigme), la reponse de Gab
      c.textAlign = 'center';
      if (st.call) { c.font = '700 44px system-ui, sans-serif'; c.fillStyle = '#ffe08a'; c.fillText('🐰 ' + (st.say || st.call), 640, 60); }
      if (st.help) { c.font = '700 26px system-ui'; c.fillStyle = '#ffd0a0'; c.fillText(st.help[0], 640, 112); if (E.showFr) { c.font = 'italic 20px system-ui'; c.fillStyle = '#b9b4cf'; c.fillText(st.help[1], 640, 144); } }
      if (st.msg) {
        c.font = '700 28px system-ui'; c.fillStyle = '#ffffff'; c.fillText('🦊 ' + st.msg[0], 640, 440);
        if (E.showFr) { c.font = 'italic 20px system-ui'; c.fillStyle = '#b9b4cf'; c.fillText(st.msg[1], 640, 476); }
      }
      if (E.showFr && !st.msg) { c.font = '20px system-ui'; c.fillStyle = '#8a86a0'; c.fillText('Touche la prise qu\'Andrea t\'indique.', 640, 300); }
      c.textAlign = 'left';
    },
    tick(st, E) {
      if (!st.started) { st.started = true; climbStep(st, E); }
      if (st.finish != null) return E.t >= st.finish ? { done: true } : null;
      if (st.next != null) { if (E.t >= st.next) { st.msg = null; st.say = null; climbStep(st, E); } return null; }
      if (E.t - st.t0 > LIMIT) this.fail(st, E, null);
      return null;
    },
    fail(st, E, slip) {
      const target = effDir(st.step), word = SEQ[st.step] === 'ešte' ? target : SEQ[st.step];
      st.step = Math.max(0, st.step - 1); st.errs = (st.errs || 0) + 1;
      st.msg = slip ? ['Šmykľavé! Mokrý mach!', 'Ça glisse ! De la mousse mouillée !']
        : [`Koľko je tu „${word}“?`, `Il y a combien de « ${word} », ici ?`];
      st.say = 'Nie tam!'; E.speak('Nie tam!', 'andrea');
      st.next = E.t + 1.8;
    },
    async click(p, st, g, E) {
      if (st.next != null || st.finish != null || !st.holds) return null;
      const d = Object.keys(POS).find((q) => Math.hypot(p[0] - POS[q][0], p[1] - POS[q][1]) < 125);
      if (!d) return null;
      const target = effDir(st.step);
      if (d !== target || st.holds[d] === 'prisa_mach') { this.fail(st, E, st.holds[d] === 'prisa_mach'); return null; }
      st.ok = E.t + 0.6; st.step += 1; st.errs = 0; st.help = null;
      if (st.step >= SEQ.length) st.finish = E.t + 0.9; else st.next = E.t + 0.7;
      return null;
    },
  };

  // ------------------------------------------------------------------ le registre de pan Orol (31 etes, une ligne par ete)
  const YEARS = [];
  for (let y = 1995; y <= 2025; y++) {
    let leto = 'normálne', pramen = 'normálny';
    if ([2003, 2015, 2018].includes(y)) { leto = 'veľmi suché'; pramen = 'slabý'; }
    else if ([2000, 2007, 2012, 2022, 2024].includes(y)) { leto = 'suché'; pramen = 'normálny'; }
    else if ([1997, 2002, 2010, 2014, 2021].includes(y)) { leto = 'daždivé'; pramen = 'silný'; }
    if (y === 2025) { leto = 'normálne'; pramen = 'nula'; }
    const r = Math.sin(y * 12.9898) * 43758.5453, f = r - Math.floor(r);
    YEARS.push({ y, leto, pramen, sneh: 20 + Math.round(f * 70) + ' cm', kuk: (8 + Math.round(f * 14)) + '.4.' });
  }
  const GOOD = [2003, 2015, 2018, 2025];
  const ROW_H = 29, PAGE = [[150, 150], [690, 150]];
  const rowRect = (i) => { const pg = i < 16 ? 0 : 1, k = i < 16 ? i : i - 16; return [PAGE[pg][0], PAGE[pg][1] + 34 + k * ROW_H, 450, ROW_H]; };
  const COLS = [0, 62, 196, 304, 378];
  const registerPanel = {
    draw(c, st, E) {
      c.fillStyle = 'rgba(8,8,16,.85)'; c.fillRect(0, 0, W, H);
      const im = E.img('art/obj_register_otvoreny.png');
      if (im && im.naturalWidth) c.drawImage(im, 70, 70, 1140, 640);
      c.fillStyle = 'rgba(250,244,228,.92)'; c.fillRect(132, 120, 486, 580); c.fillRect(672, 120, 486, 580);
      c.textBaseline = 'top';
      c.fillStyle = '#fff'; c.font = '700 26px system-ui, sans-serif';
      c.fillText('Nájdi veľmi suché letá. Čo robil prameň v dedine? A vlani?', 80, 14);
      if (E.showFr) { c.font = 'italic 19px system-ui'; c.fillStyle = '#b9b4cf'; c.fillText('Trouve les étés très secs. Que faisait la source du village ? Et l\'an dernier ? (touche les lignes)', 80, 46); }
      const head = ['Rok', 'Leto', 'Prameň', 'Sneh', 'Kukučka'];
      for (const pg of PAGE) {
        c.font = '700 17px Georgia, serif'; c.fillStyle = '#5a3a18';
        head.forEach((t, i) => c.fillText(t, pg[0] + 8 + COLS[i], pg[1] + 8));
        c.fillStyle = 'rgba(90,60,30,.35)'; c.fillRect(pg[0], pg[1] + 30, 450, 2);
      }
      YEARS.forEach((r, i) => {
        const [x, y, w, h] = rowRect(i), on = st.sel.includes(r.y);
        if (on) { c.fillStyle = 'rgba(255,214,64,.55)'; c.fillRect(x, y + 2, w, h - 2); }
        c.fillStyle = r.leto === 'veľmi suché' || r.pramen === 'nula' ? '#2a1508' : '#3a2a18';
        c.font = 'italic 17px "Segoe Print", "Comic Sans MS", cursive';
        [String(r.y), r.leto, r.pramen, r.sneh, r.kuk].forEach((t, j) => c.fillText(t, x + 8 + COLS[j], y + 6));
        c.fillStyle = 'rgba(90,60,30,.15)'; c.fillRect(x, y + h, w, 1);
      });
      c.font = '20px system-ui'; c.fillStyle = '#ffe08a';
      c.fillText(`${st.sel.length} / 4`, 1120, 18);
    },
    async click(p, st, g) {
      const i = YEARS.findIndex((_, j) => inR(p, rowRect(j)));
      if (i < 0) return null;
      const r = YEARS[i];
      if (st.sel.includes(r.y)) { st.sel = st.sel.filter((q) => q !== r.y); return null; }
      if (GOOD.includes(r.y)) {
        st.sel.push(r.y);
        if (r.y === 2025) g.learn('vlani', 'l\'an dernier');
        else g.learn('veľmi suché', 'très sec');
        return st.sel.length === GOOD.length ? { done: true } : null;
      }
      st.bad = (st.bad || 0) + 1;
      const lines = {
        'suché': ['Suché leto. Ale nie veľmi suché.', 'Un été sec. Mais pas très sec.'],
        'daždivé': ['Daždivé leto. Prameň bol silný. Veľa vody.', 'Un été pluvieux. La source était forte. Beaucoup d\'eau.'],
        'normálne': ['Normálne leto, normálny prameň. Nič zvláštne.', 'Un été normal, une source normale. Rien de spécial.'],
      };
      const l = lines[r.leto] || lines['normálne'];
      await g.say('andrea', l[0], l[1], [['daždivé', 'pluvieux'], ['suché', 'sec']]);
      if (st.bad === 3) await g.say('andrea', 'Vlani je minulý rok. Dva tisíc dvadsaťpäť.', 'L\'an dernier, c\'est l\'année dernière. 2025.');
      return null;
    },
  };

  // ------------------------------------------------------------------ pan Orol : vouvoiement, et laisser parler Andrea
  async function tykame(g) {
    g.pose('orol', null);
    await say(g, 'orol', 'Tykáme si?', 'On se tutoie ?', [['tykať si', 'se tutoyer']]);
    g.pose('orol', 'caj');
    await say(g, 'narrator', 'Pán Orol pije ďalej svoj čaj. Pozerá sa na hory.', 'Pán Orol se remet à boire son thé. Il regarde les montagnes.');
  }
  async function orolChat(g) {
    if (g.flag('orol_done')) {
      g.pose('orol', null);
      await say(g, 'orol', 'Jazero je hore, za skalou. Hodinu cesty. A buďte zdvorilí.', 'Le lac est en haut, derrière le rocher. Une heure de marche. Et soyez polis.', [['zdvorilý', 'poli']]);
      g.pose('orol', 'caj');
      return;
    }
    if (!g.flag('oc_greet')) {
      const i = await g.choice([{ sk: 'Ahoj, orol!', fr: 'Salut, l\'aigle !' }, { sk: 'Dobrý deň, pán Orol.', fr: 'Bonjour, monsieur Orol.' }, { sk: 'Čau!', fr: 'Salut !' }], { noFr: true });
      if (i !== 1) { await tykame(g); return; }
      g.setFlag('oc_greet');
      g.pose('orol', null);
      await say(g, 'orol', 'Dobrý deň. Andrea? Vyrástla si.', 'Bonjour. Andrea ? Tu as grandi.', [['vyrásť', 'grandir']]);
      await say(g, 'andrea', 'Dobrý deň, pán Orol. To je Gab. Je Francúz.', 'Bonjour, monsieur Orol. Voici Gab. Il est français.');
      await say(g, 'orol', 'Francúzska líška. Videl som vás na rebríkoch. V parku vidím všetko.', 'Un renard français. Je vous ai vus sur les échelles. Dans le parc, je vois tout.');
      g.pose('fox', 'think');
      await say(g, 'fox', '(Všetko? Aj zatvorené oči?)', '(Tout ? Même les yeux fermés ?)');
      g.pose('fox', null);
    }
    if (!g.flag('oc_ask')) {
      const i = await g.choice([{ sk: 'Ukáž nám register.', fr: 'Montre-nous le registre.' }, { sk: 'Môžete nám ukázať register?', fr: 'Pouvez-vous nous montrer le registre ?' }, { sk: 'Daj mi ten register, prosím.', fr: 'Donne-moi ce registre, s\'il te plaît.' }], { noFr: true });
      if (i !== 1) { await tykame(g); return; }
      g.setFlag('oc_ask');
      g.learn('môžete', 'vous pouvez');
      await say(g, 'orol', 'Register? Píšem doň tridsaťjeden rokov. Dážď, sneh, potoky, pramene. Každý deň.', 'Le registre ? J\'y écris depuis trente et un ans. La pluie, la neige, les ruisseaux, les sources. Tous les jours.', [['dážď', 'la pluie'], ['prameň', 'la source']]);
      await say(g, 'orol', 'Ale nie je pre turistov.', 'Mais il n\'est pas pour les touristes.');
    }
    // Andrea parle ; Gab doit la laisser faire. Une interruption : elle le regarde. Deux : l'aigle retourne a son the.
    let cut = 0;
    const quiet = async () => {
      const i = await g.choice([{ sk: '(Mlčať.)', fr: '(Se taire.)' }, { sk: 'Prosím vás, je to veľmi dôležité!', fr: 'S\'il vous plaît, c\'est très important !' }]);
      if (i === 0) return true;
      cut += 1;
      if (cut === 1) { g.pose('andrea', 'arms'); await say(g, 'andrea', 'Gab. Pst.', 'Gab. Chut.'); g.pose('andrea', null); return true; }
      g.pose('orol', 'caj');
      await say(g, 'orol', 'Keď hovoria všetci naraz, ja pijem čaj.', 'Quand tout le monde parle en même temps, moi, je bois mon thé.', [['naraz', 'en même temps']]);
      await say(g, 'andrea', '(potichu) Nabudúce ma nechaj hovoriť.', '(tout bas) La prochaine fois, laisse-moi parler.');
      return false;
    };
    g.pose('orol', null);
    await say(g, 'andrea', 'A prameň v našej dedine? Zapisovali ste aj ten?', 'Et la source de notre village ? Vous la notiez aussi ?');
    await say(g, 'orol', 'Ten nie je v mojom parku.', 'Elle n\'est pas dans mon parc.');
    if (!(await quiet())) return;
    await say(g, 'andrea', 'Ale zapisovali ste ho. Chodili ste každý pondelok. Videla som vás.', 'Mais vous la notiez. Vous passiez tous les lundis. Je vous voyais.', [['pondelok', 'le lundi']]);
    if (!(await quiet())) return;
    await say(g, 'narrator', 'Orol sa na ňu dlho pozerá. Potom položí hrnček, vojde do chaty a vráti sa s veľkou zelenou knihou.', 'L\'aigle la regarde longtemps. Puis il pose sa tasse, entre dans la cabane et revient avec un gros livre vert.', [['hrnček', 'la tasse']]);
    g.setFlag('reg_out');
    await say(g, 'orol', 'Register neodchádza z parku. Ale viete čítať.', 'Un registre ne sort pas du parc. Mais vous savez lire.');
    await readRegister(g);
  }
  async function readRegister(g) {
    await g.openPanel(registerPanel, { sel: [] });
    g.learn('prameň', 'la source'); g.learn('slabý', 'faible');
    await say(g, 'fox', '2003, veľmi suché leto. Prameň: slabý. 2015: slabý. 2018: slabý.', '2003, été très sec. La source : faible. 2015 : faible. 2018 : faible.');
    await say(g, 'andrea', 'A vlani?', 'Et l\'an dernier ?');
    await say(g, 'fox', 'Vlani: normálne leto. Prameň v dedine… nula.', 'L\'an dernier : été normal. La source du village… zéro.');
    g.pose('orol', null);
    await say(g, 'orol', 'Napísal som list.', 'J\'ai écrit une lettre.', [['list', 'la lettre']]);
    await say(g, 'andrea', 'A?', 'Et ?');
    await say(g, 'orol', 'Odpísali mi, že to nie je môj park.', 'On m\'a répondu que ce n\'était pas mon parc.');
    g.pose('orol', 'caj');
    await say(g, 'narrator', 'Andrea odfotí stranu. Potom ešte stranu z roku 2003. A 2015. A 2018.', 'Andrea photographie la page. Puis celle de 2003. Et 2015. Et 2018.');
    await say(g, 'andrea', 'Pre istotu.', 'Par sécurité.', [['pre istotu', 'par sécurité']]);
    g.addCard('register_sucho'); g.addCard('register_nula');
    await say(g, 'fox', 'Dôkaz číslo dva.', 'Pièce numéro deux.');
    await g.askBoard('q_sucho');
    g.pose('orol', null);
    await say(g, 'orol', 'V dedine hovoria, že to sú bobry. Postavili hrádzu nad prameňom. Pred dvoma rokmi.', 'Au village, ils disent que ce sont les castors. Ils ont construit un barrage au-dessus de la source. Il y a deux ans.', [['bobor', 'le castor'], ['hrádza', 'le barrage']]);
    g.pose('fox', 'surprised');
    await say(g, 'fox', 'Tak sú to možno oni!', 'Alors c\'est peut-être eux !');
    g.pose('fox', null);
    await say(g, 'andrea', 'Gab.', 'Gab.');
    await say(g, 'fox', 'Hovorím „možno“. Detektív vždy hovorí „možno“.', 'Je dis « peut-être ». Un détective dit toujours « peut-être ».', [['možno', 'peut-être']]);
    await say(g, 'orol', 'Choďte sa pozrieť. Jazero je hore, hodinu odtiaľto. A buďte zdvorilí. Majú toho dosť.', 'Allez voir. Le lac est en haut, à une heure d\'ici. Et soyez polis. Ils en ont assez.', [['zdvorilý', 'poli']]);
    g.pose('orol', 'caj');
    g.setFlag('orol_done');
  }

  // ------------------------------------------------------------------ le castor : poli, le baton, puis l'experience de la pomme de pin
  async function boborTalk(g) {
    if (g.flag('bobor_done')) { g.pose('bobor2', 'talk'); await say(g, 'bobor2', 'Stroje. V noci. Hore, pri chate. Viac neviem.', 'Des machines. La nuit. Là-haut, près du refuge. Je n\'en sais pas plus.'); g.pose('bobor2', 'hammer'); return; }
    if (g.flag('palica_given')) { g.pose('bobor2', 'point'); await say(g, 'bobor2', 'Hoďte niečo na vodu. Uvidíte.', 'Jetez quelque chose sur l\'eau. Vous verrez.'); g.pose('bobor2', 'hammer'); return; }
    if (g.flag('bobor_ok')) { g.pose('bobor2', 'look'); await say(g, 'bobor2', 'Palicu. Dlhú a rovnú. Bez nej nič nepoviem.', 'Un bâton. Long et droit. Sans lui, je ne dis rien.', [['palica', 'le bâton'], ['rovný', 'droit']]); g.pose('bobor2', 'hammer'); return; }
    if (!g.flag('bobor_met')) {
      g.setFlag('bobor_met');
      g.pose('bobor2', 'nie');
      await say(g, 'bobor2', 'Nie.', 'Non.');
      g.pose('fox', 'surprised');
      await say(g, 'fox', 'Ale ja som nič nepovedal!', 'Mais je n\'ai rien dit !');
      g.pose('fox', null);
      await say(g, 'bobor2', 'Poviete: „Prameň, to ste vy?“ Nie. To nie sme my. Dovidenia.', 'Vous allez dire : « La source, c\'est vous ? » Non. Ce n\'est pas nous. Au revoir.');
      g.pose('bobor2', 'hammer');
    }
    const opts = [{ sk: 'Bobry berú vodu, nie?', fr: 'Les castors prennent l\'eau, non ?' }, { sk: 'Nehovoríme, že ste to vy. Chceme pochopiť.', fr: 'On ne dit pas que c\'est vous. On veut comprendre.' }];
    if (!g.flag('fr_bobor')) opts.unshift({ sk: 'Nerozumiem, som Francúz.', fr: 'Je ne comprends pas, je suis français.' });
    const i = await g.choice(opts, { noFr: true }), pick = opts[i].sk;
    if (pick.startsWith('Nerozumiem')) {
      g.setFlag('fr_bobor');
      g.pose('bobor2', 'nie');
      await say(g, 'bobor2', 'Tak vám to poviem po francúzsky: non. Tiež nie.', 'Alors je vais vous le dire en français : non. C\'est non aussi.');
      g.pose('bobor2', 'hammer'); return;
    }
    if (pick.startsWith('Bobry')) {
      g.pose('bobor2', 'nie');
      await say(g, 'bobor2', 'Nie! Všetci hovoria: bobry, bobry. Bobor má zuby, tak je vinný.', 'Non ! Tout le monde dit : les castors, les castors. Un castor a des dents, alors il est coupable.', [['vinný', 'coupable'], ['zuby', 'les dents']]);
      await say(g, 'bobor2', 'Ľudia z dediny tu boli dvakrát. Prvýkrát kričali. Druhýkrát priniesli pílu.', 'Les gens du village sont venus deux fois. La première fois, ils ont crié. La deuxième fois, ils ont apporté une scie.');
      g.pose('bobor2', 'hammer'); return;
    }
    g.setFlag('bobor_ok');
    g.pose('bobor2', 'look');
    await say(g, 'bobor2', 'Hm. Chcete pochopiť?', 'Hm. Vous voulez comprendre ?', [['pochopiť', 'comprendre']]);
    g.pose('bobor2', 'talk');
    await say(g, 'bobor2', 'Tak mi najprv pomôžte. V hrádzi mi chýba jedna palica. Dlhá a rovná.', 'Alors d\'abord, aidez-moi. Il me manque un bâton dans le barrage. Long et droit.', [['chýbať', 'manquer'], ['palica', 'le bâton']]);
    g.pose('bobor2', 'hammer');
    if (!g.has('palica')) await say(g, 'fox', 'Palica… Mal som jednu v lese. Ešte ju mám?', 'Un bâton… J\'en avais un dans la forêt. Je l\'ai encore ?');
  }
  async function givePalica(g) {
    if (!g.flag('bobor_ok')) { g.pose('bobor2', 'nie'); await say(g, 'bobor2', 'Darček? Najprv mi povedzte, čo chcete.', 'Un cadeau ? Dites-moi d\'abord ce que vous voulez.'); g.pose('bobor2', 'hammer'); return; }
    g.take('palica'); g.setFlag('palica_given');
    g.pose('bobor2', 'taste');
    await say(g, 'narrator', 'Bobor si palicu pozrie, oňuchá ju… a ochutná.', 'Le castor regarde le bâton, le renifle… et le goûte.', [['ochutnať', 'goûter']]);
    await say(g, 'bobor2', '(chrum) Buk. Dobrý.', '(crac) Du hêtre. Bon.');
    g.pose('bobor2', 'nod');
    await say(g, 'bobor2', 'Ďakujem, líška.', 'Merci, le renard.');
    g.pose('bobor2', 'point');
    await say(g, 'bobor2', 'A teraz sa pozrite za hrádzu. Čo vidíte?', 'Et maintenant, regardez derrière le barrage. Qu\'est-ce que vous voyez ?');
    for (;;) {
      const i = await g.choice([{ sk: 'Nič.', fr: 'Rien.' }, { sk: 'Vodu. Veľa vody.', fr: 'De l\'eau. Beaucoup d\'eau.' }, { sk: 'Bobry.', fr: 'Des castors.' }], { noFr: true });
      if (i === 1) break;
      await say(g, 'bobor2', i === 0 ? 'Nič? Pozrite sa lepšie.' : 'Bobry sú tu. Ja viem. A za hrádzou?', i === 0 ? 'Rien ? Regardez mieux.' : 'Les castors sont ici. Je sais. Et derrière le barrage ?');
    }
    await say(g, 'bobor2', 'Výborne. Hrádza drží vodu, keď prší. A vracia ju, keď je sucho. Bez nás by dole bolo vody ešte menej.', 'Très bien. Le barrage garde l\'eau quand il pleut. Et il la rend quand c\'est sec. Sans nous, il y en aurait encore moins en bas.', [['držať', 'retenir'], ['vracať', 'rendre']]);
    await say(g, 'bobor2', 'Neveríte? Hoďte niečo na vodu. Uvidíte.', 'Vous ne me croyez pas ? Jetez quelque chose sur l\'eau. Vous verrez.');
    g.pose('bobor2', 'hammer');
  }
  // la pomme de pin flotte : du lac au deversoir, par-dessus le barrage, et repart dans le ruisseau
  const FLOAT = [[980, 470], [1400, 470], [1660, 455], [1685, 500], [1720, 560], [1880, 630], [2050, 680], [2200, 700]];
  async function floatCone(g) {
    if (!g.flag('palica_given')) { await say(g, 'fox', 'Hodiť šišku do vody? Teraz? Bobor si bude myslieť, že som blázon.', 'Jeter une pomme de pin dans l\'eau ? Maintenant ? Le castor va croire que je suis fou.', [['blázon', 'le fou']]); return; }
    g.take('siska');
    await say(g, 'narrator', 'Gab položí šišku na vodu.', 'Gab pose la pomme de pin sur l\'eau.');
    g.camTo(1500);
    const s = g.spawn('plava', FLOAT[0][0], FLOAT[0][1]);
    for (let i = 1; i < FLOAT.length; i++) {
      const [a, b] = [FLOAT[i - 1], FLOAT[i]], ms = Math.hypot(b[0] - a[0], b[1] - a[1]) * (i < 3 ? 7 : 3.2);
      await g.animate(ms, (k) => { s.x = a[0] + (b[0] - a[0]) * k; s.y = a[1] + (b[1] - a[1]) * k; });
    }
    g.hide('plava'); g.camTo(null);
    g.pose('fox', 'surprised');
    await say(g, 'fox', 'Prešla cez hrádzu! A pláva ďalej, dole.', 'Elle est passée par-dessus le barrage ! Et elle continue, vers le bas.', [['plávať', 'flotter, nager']]);
    g.pose('fox', null);
    await say(g, 'bobor2', 'Hrádza vodu drží. Ale nezastaví ju.', 'Le barrage retient l\'eau. Mais il ne l\'arrête pas.', [['zastaviť', 'arrêter']]);
    g.pose('andrea', 'give');
    await say(g, 'narrator', 'Andrea ukáže bobrovi fotku z registra.', 'Andrea montre au castor la photo du registre.');
    await say(g, 'andrea', 'Vaša hrádza má dva roky. Prameň vyschol vlani. Keby ste to boli vy, vody by ubúdalo pomaly. Neubúdalo. Zastavila sa.', 'Votre barrage a deux ans. La source s\'est tarie l\'an dernier. Si c\'était vous, l\'eau aurait baissé doucement. Elle n\'a pas baissé. Elle s\'est arrêtée.', [['vyschnúť', 's\'assécher'], ['pomaly', 'doucement']]);
    g.pose('andrea', null);
    g.pose('bobor2', 'nod');
    await say(g, 'bobor2', 'Hovoríš ako inžinierka.', 'Tu parles comme une ingénieure.');
    await say(g, 'fox', 'Ona počíta všetko. Aj keď padnem do vody.', 'Elle compte tout. Même quand je tombe dans l\'eau.');
    g.strikeCard('bobry');
    await say(g, 'andrea', 'Tak kto?', 'Alors c\'est qui ?');
    g.pose('bobor2', 'point');
    await say(g, 'bobor2', 'Neviem. Ale pred dvoma rokmi tu boli stroje. Hore, pri horskej chate. V noci. Svetlá, hluk. Tri týždne.', 'Je ne sais pas. Mais il y a deux ans, il y avait des machines. Là-haut, près du refuge. La nuit. Des phares, du bruit. Trois semaines.', [['stroj', 'la machine'], ['v noci', 'la nuit']]);
    await say(g, 'bobor2', 'Bobor v noci nepracuje so strojmi. Bobor v noci pracuje so zubami.', 'Un castor ne travaille pas la nuit avec des machines. Un castor travaille la nuit avec ses dents.');
    g.addCard('stroje');
    await say(g, 'bobor2', 'Opýtajte sa chatára. Fotí všetko. Aj mňa. Nikdy som nedal súhlas.', 'Demandez au gardien du refuge. Il photographie tout. Même moi. Je n\'ai jamais donné mon accord.');
    g.pose('bobor2', 'hammer');
    g.setFlag('bobor_done');
    await g.sleep(600);
    g.goScene('bivouac');
  }

  // ================================================================== les decors
  const S = D.scenes;

  // ---------------------------------------------------------------- 1. la foret et le ruisseau
  S.raj = {
    chapter: 'ch3', title: { sk: 'Les v Slovenskom raji', fr: 'La forêt du Paradis slovaque' }, tint: ['#6f9a5a', '#c9b27a'],
    bg: 'art/raj_foret_wide.webp', worldW: 2160,
    player: 'fox', floor: [[0, 560], [2160, 560], [2160, 712], [0, 712]], scale: { y0: 560, s0: 0.5, y1: 712, s1: 0.62 },
    sprites: [gab(150, 650), andrea(280, 1, 645), Object.assign(twoPose('turisti', 'jezkovia_a', 'jezkovia_b', 1010, 600, 150), {})],
    props: [
      { img: 'art/obj_palica.png', x: 690, y: 652, w: 150, when: (g) => !g.flag('palica_taken') },
      { img: 'art/obj_sipka.png', x: 1290, y: 668, w: 120 },
      { img: 'art/obj_siska.png', x: 1470, y: 622, w: 46, when: (g) => !g.flag('siska1') },
    ],
    ambient: [
      { sweep: { area: [0, 0, 2160, 560], period: 11, a: 0.16 } },
      { imgs: ['art/amb_motyl_a.png', 'art/amb_motyl_b.png'], fps: 8, w: 34, cross: { from: [260, 430], to: [1150, 360], dur: 12, every: 8, arc: 60 } },
      { img: 'art/amb_list.png', w: 26, sway: { amp: 0.6, speed: 2.4 }, cross: { from: [520, 120], to: [600, 560], dur: 7, every: 10 } },
    ],
    triggers: [
      { x: [1300, 2160], when: (g) => g.flag('raj0') && !g.flag('raj_water'), async run(g) {
        g.setFlag('raj_water');
        g.face('fox', 1);
        await say(g, 'fox', 'Počkaj. Počuješ?', 'Attends. Tu entends ?', [['počuť', 'entendre']]);
        await say(g, 'andrea', 'Čo?', 'Quoi ?');
        await say(g, 'fox', 'Voda! Potok!', 'De l\'eau ! Un ruisseau !', [['potok', 'le ruisseau']]);
      } },
    ],
    hotspots: [
      { id: 'zastavka', name: { sk: 'zastávka', fr: 'la halte' }, poly: box(0, 110, 215, 455), walk: [260, 645],
        look: { sk: 'Malá zastávka s jednou lampou. Vlak zastavuje všade. Aj kvôli koze.', fr: 'Une petite halte avec un seul lampadaire. Le train s\'arrête partout. Même pour une chèvre.', words: [['zastávka', 'la halte']] } },
      { id: 'buk', name: { sk: 'buk', fr: 'le hêtre' }, poly: box(190, 0, 445, 470), walk: [480, 645],
        look: { sk: 'Starý buk. Je tu tieň. Konečne.', fr: 'Un vieux hêtre. Il y a de l\'ombre. Enfin.', words: [['buk', 'le hêtre'], ['tieň', 'l\'ombre']] } },
      { id: 'palica', name: { sk: 'palica', fr: 'le bâton' }, poly: box(610, 615, 770, 665), walk: [700, 668], pose: 'pick',
        async onUse(g) {
          g.setFlag('palica_taken'); g.give('palica');
          await say(g, 'fox', 'Pekná palica. Dlhá a rovná. Beriem ju. Na chodenie.', 'Un beau bâton. Long et droit. Je le prends. Pour marcher.', [['palica', 'le bâton'], ['rovný', 'droit']]);
          await say(g, 'andrea', 'Na chodenie. Jasné.', 'Pour marcher. Bien sûr.');
        } },
      { id: 'pnik', name: { sk: 'pník', fr: 'la souche' }, poly: box(740, 380, 955, 500), walk: [850, 645],
        look: { sk: 'Starý pník. Strom tu už nie je.', fr: 'Une vieille souche. L\'arbre n\'est plus là.', words: [['pník', 'la souche']] } },
      { id: 'turisti', sprite: 'turisti', name: { sk: 'turisti', fr: 'les randonneurs' }, walk: [880, 655],
        async onUse(g) {
          if (g.flag('turisti_ok')) { await say(g, 'turisti', 'Ďakujeme! Mapa je teraz správne.', 'Merci ! La carte est dans le bon sens maintenant.'); return; }
          await say(g, 'turisti', 'Prepáčte… kde je roklina? Mapa hovorí, že sme v jazere.', 'Pardon… où est la gorge ? La carte dit qu\'on est dans un lac.', [['roklina', 'la gorge']]);
          const i = await g.choice([{ sk: 'Máte mapu hore nohami.', fr: 'Votre carte est à l\'envers.' }, { sk: 'Nerozumiem, som Francúz.', fr: 'Je ne comprends pas, je suis français.' }], { noFr: true });
          if (i === 1) { await say(g, 'turisti', 'My tiež nie sme odtiaľto!', 'Nous non plus, on n\'est pas d\'ici !'); return; }
          g.setFlag('turisti_ok');
          g.pose('turisti', 'b');
          await say(g, 'turisti', 'Hore nohami? Aha! Roklina je… tam!', 'À l\'envers ? Ah ! La gorge est… là-bas !');
          await say(g, 'andrea', 'Ty sa vyznáš v knihách a mapách hore nohami.', 'Toi, tu t\'y connais en livres et en cartes à l\'envers.');
        } },
      { id: 'sipka', name: { sk: 'značka', fr: 'le panneau' }, poly: box(1225, 635, 1355, 672), walk: [1290, 680],
        look: { sk: 'Turistická značka. Spadla. Ukazuje… do trávy.', fr: 'Un panneau de balisage. Il est tombé. Il indique… l\'herbe.', words: [['značka', 'le balisage']] } },
      { id: 'huby', name: { sk: 'huby', fr: 'les champignons' }, poly: box(1100, 340, 1290, 495), walk: [1200, 645],
        async onUse(g) {
          await say(g, 'fox', 'Huby! Červené s bodkami. Môžem jednu?', 'Des champignons ! Rouges à pois. Je peux en goûter un ?', [['huby', 'les champignons']]);
          g.pose('andrea', 'point');
          await say(g, 'andrea', 'Nie! Nejedz to!', 'Non ! Ne mange pas ça !', [['nejedz', 'ne mange pas']]);
          g.pose('andrea', null);
        } },
      { id: 'siska', name: { sk: 'šiška', fr: 'la pomme de pin' }, poly: box(1440, 600, 1500, 630), walk: [1470, 660], pose: 'pick',
        async onUse(g) {
          g.setFlag('siska1'); g.give('siska');
          await say(g, 'fox', 'Šiška. Beriem ju. Neviem prečo.', 'Une pomme de pin. Je la prends. Je ne sais pas pourquoi.', [['šiška', 'la pomme de pin']]);
        } },
      { id: 'kamen', name: { sk: 'kameň', fr: 'la pierre' }, poly: box(1490, 460, 1725, 555), walk: [1600, 655],
        look: { sk: 'Plochý kameň pri potoku.', fr: 'Une pierre plate au bord du ruisseau.', words: [['kameň', 'la pierre']] } },
      { id: 'potok', name: { sk: 'potok', fr: 'le ruisseau' }, poly: box(1640, 360, 2160, 620), walk: [1760, 655],
        async onUse(g) {
          if (g.flag('drank')) { await say(g, 'fox', 'Potok nie je veľký. Ale tečie.', 'Le ruisseau n\'est pas gros. Mais il coule.', [['tiecť', 'couler']]); return; }
          g.setFlag('drank');
          if (g.has('flasa_prazdna')) { g.take('flasa_prazdna'); g.give('flasa'); await say(g, 'narrator', 'Gab naplní fľašu. A napije sa. Voda je ľadová!', 'Gab remplit sa bouteille. Et il boit. L\'eau est glacée !', [['naplniť', 'remplir'], ['ľadový', 'glacé']]); }
          else await say(g, 'narrator', 'Gab sa napije. Voda je ľadová!', 'Gab boit. L\'eau est glacée !', [['ľadový', 'glacé']]);
          g.face('andrea', 1);
          await g.walk('andrea', 1640, 650);
          await say(g, 'fox', 'Nie je veľký.', 'Il n\'est pas gros.');
          await say(g, 'andrea', 'Nie. Ale tečie.', 'Non. Mais il coule.');
          await say(g, 'fox', 'A čo?', 'Et alors ?');
          await say(g, 'andrea', 'Tak tu tiež dva mesiace nepršalo. Ako u nás.', 'Alors ici non plus, il n\'a pas plu depuis deux mois. Comme chez nous.', [['pršať', 'pleuvoir'], ['mesiac', 'le mois']]);
          g.pose('fox', 'think');
          await g.sleep(900);
          await say(g, 'fox', 'Aha.', 'Ah.');
          g.pose('fox', null);
          await say(g, 'andrea', 'Presne.', 'Exactement.', [['presne', 'exactement']]);
          g.addCard('potok_raj');
        } },
      { id: 'cesta', name: { sk: 'cesta do rokliny', fr: 'le chemin de la gorge' }, poly: box(2040, 300, 2160, 560), walk: [2090, 640],
        async onUse(g) {
          if (!g.flag('drank')) { await say(g, 'andrea', 'Počkaj! Najprv sa napi. Hore nie je voda.', 'Attends ! Bois d\'abord. Là-haut, il n\'y a pas d\'eau.'); return; }
          if (!g.has('palica') && !g.flag('palica_given')) { await say(g, 'fox', 'Dlhá cesta… Hodila by sa mi palica. Na chodenie.', 'Un long chemin… Un bâton me serait utile. Pour marcher.'); return; }
          g.goScene('rokle');
        } },
      { id: 'andrea', sprite: 'andrea', name: { sk: 'Andrea', fr: 'Andrea' }, walk: [1500, 650],
        async onUse(g) {
          if (!g.flag('drank')) { await say(g, 'andrea', 'Počuješ ten potok? Choď sa napiť.', 'Tu entends ce ruisseau ? Va boire.'); return; }
          await say(g, 'andrea', 'Pán Orol býva hore, za roklinou. Tridsaťjeden rokov všetko zapisuje.', 'Pán Orol habite là-haut, après la gorge. Depuis trente et un ans, il note tout.', [['zapisovať', 'noter']]);
        } },
    ],
    hints: [
      { id: 'r3_water', when: (g) => !g.flag('drank'), levels: [
        { sk: 'Počúvaj. Niekde tečie voda.', fr: 'Écoute. Quelque part, de l\'eau coule.' },
        { sk: 'Potok je vpravo, za kameňom.', fr: 'Le ruisseau est à droite, après la pierre.' },
        { sk: 'Klikni na potok.', fr: 'Clique sur le ruisseau.' } ] },
      { id: 'r3_stick', when: (g) => !g.has('palica') && !g.flag('palica_given'), levels: [
        { sk: 'Cesta je dlhá. Na zemi leží niečo užitočné.', fr: 'Le chemin est long. Il y a quelque chose d\'utile par terre.' },
        { sk: 'Dlhá a rovná palica. Pri pníku.', fr: 'Un bâton long et droit. Près de la souche.' } ] },
      { id: 'r3_go', levels: [{ sk: 'Cesta do rokliny je úplne vpravo.', fr: 'Le chemin de la gorge est tout à droite.' }] },
    ],
    async onEnter(g) {
      if (g.flag('raj0')) return;
      g.setFlag('raj0');
      g.setHelper('andrea', 3);
      await say(g, 'narrator', 'Osobný vlak zastavuje všade. Pred domom. Pred poľom. Pred kozou, ktorá nenastúpi.', 'Le train omnibus s\'arrête partout. Devant une maison. Devant un champ. Devant une chèvre qui ne monte pas.', [['vlak', 'le train']]);
      await say(g, 'fox', 'Zastavil kvôli koze.', 'Il s\'est arrêté pour la chèvre.');
      await say(g, 'andrea', 'Zastavuje kvôli všetkým. Aj kvôli tým, čo neprídu.', 'Il s\'arrête pour tout le monde. Même pour ceux qui ne viennent pas.');
      await say(g, 'narrator', 'Slovenský raj. Les vonia živicou a machom. Je tu tieň.', 'Le Paradis slovaque. La forêt sent la résine et la mousse. Il y a de l\'ombre.', [['les', 'la forêt']]);
      await say(g, 'fox', 'Kto je ten pán Orol?', 'C\'est qui, ce monsieur Orol ?');
      await say(g, 'andrea', 'Strážca parku. Zapisuje všetko: dážď, sneh, potoky.', 'Le garde du parc. Il note tout : la pluie, la neige, les ruisseaux.', [['strážca', 'le garde'], ['dážď', 'la pluie']]);
      await say(g, 'andrea', 'Na úrade mi povedali: „To je sucho. Alebo bobry.“', 'Au bureau, on m\'a dit : « C\'est la sécheresse. Ou les castors. »', [['sucho', 'la sécheresse'], ['bobor', 'le castor']]);
      g.addCard('bobry');
      await say(g, 'fox', 'Bobry?', 'Les castors ?');
      await say(g, 'andrea', 'Všetci majú radi jednoduché odpovede.', 'Tout le monde aime les réponses simples.');
      await g.walk('andrea', 520, 645);
    },
  };

  // ---------------------------------------------------------------- 2. la gorge et les echelles
  const KAMZIK = { cross: { from: [395, 250], to: [395, 690], dur: 6, every: 9 } };
  const kamzikOnLadder = (g) => {   // meme calcul que drawAmbient : la famille est sur l'echelle (ou juste en bas)
    const sc = S.rokle, ai = sc.ambient.findIndex((a) => a.kamzik), ph = ai * 1.7, per = KAMZIK.cross.dur + KAMZIK.cross.every;
    const k = ((g.time() + ph) % per) / KAMZIK.cross.dur;
    return g.flag('rk_ready') && k <= 1.15;
  };
  S.rokle = {
    chapter: 'ch3', title: { sk: 'Roklina', fr: 'La gorge' }, tint: ['#b9b08a', '#8f8a6a'],
    bg: 'art/raj_rokle_wide.webp', worldW: 2160,
    player: 'fox', floor: [[0, 640], [520, 640], [520, 712], [0, 712]], scale: { y0: 640, s0: 0.6, y1: 712, s1: 0.66, clamp: true },
    freeWalk: true,
    noWalk: (g) => !!g.flagv('rk_step'),
    sprites: [gab(220, 668), andrea(330, 1, 662), twoPose('zaba', 'zaba_a', 'zaba_b', 1250, 700, 56, { min: 2, max: 5, hold: [0.6, 1.2] })],
    ambient: [
      { kamzik: true, img: 'art/kamzik_a.png', w: 120, when: (g) => g.flag('rk_ready') && !g.flag('rk_climb'), cross: KAMZIK.cross },
    ],
    hotspots: [
      { id: 'okolo', name: { sk: 'chodník okolo', fr: 'le chemin qui contourne' }, poly: box(0, 560, 110, 712), walk: [120, 668],
        async onUse(g) {
          if (g.flagv('rk_step')) { await say(g, 'fox', 'Teraz už nie.', 'Plus maintenant.'); return; }
          await say(g, 'andrea', 'Je aj iná cesta. Má šesť hodín.', 'Il y a un autre chemin. Il fait six heures.', [['šesť hodín', 'six heures']]);
          const i = await g.choice([{ sk: 'Super! Idem okolo.', fr: 'Super ! Je fais le tour.' }, { sk: 'Nie. Rebríky.', fr: 'Non. Les échelles.' }]);
          if (i === 1) return;
          await g.animate(900, (k) => g.fade(k));
          g.caption('O šesť hodín neskôr…', 'Six heures plus tard…');
          await g.sleep(1800);
          g.caption(null);
          const f = g.sprite('fox'); f.x = 1820; f.y = 668; g.setFlag('rk_step', 3); g.setFlag('sest_hodin');
          await g.animate(900, (k) => g.fade(1 - k));
          g.pose('fox', 'sit');
          await say(g, 'fox', 'Som… tu…', 'Je suis… là…');
          g.pose('andrea', 'give');
          await say(g, 'andrea', 'Konečne. Chceš chlebík? Čakám tu päť hodín.', 'Enfin. Tu veux un sandwich ? J\'attends ici depuis cinq heures.', [['chlebík', 'la tartine']]);
          g.pose('andrea', null); g.pose('fox', null);
          await say(g, 'fox', 'Nabudúce… rebríky.', 'La prochaine fois… les échelles.');
          g.goScene('chata');
        } },
      { id: 'lano', name: { sk: 'lano', fr: 'la corde' }, poly: box(762, 20, 812, 255),
        async onUse(g) {
          await say(g, 'fox', 'Lano! Vyleziem po lane!', 'Une corde ! Je vais grimper à la corde !', [['lano', 'la corde']]);
          g.pose('andrea', 'point');
          await say(g, 'andrea', 'Nie! To lano nie je na lezenie. Je staré.', 'Non ! Cette corde n\'est pas faite pour grimper. Elle est vieille.');
          g.pose('andrea', null);
        } },
      { id: 'vodopad', name: { sk: 'vodopád', fr: 'la cascade' }, poly: box(1790, 40, 1950, 610),
        look: { sk: 'Malý vodopád. Rebrík vedľa neho je mokrý.', fr: 'Une petite cascade. L\'échelle à côté est mouillée.', words: [['vodopád', 'la cascade'], ['mokrý', 'mouillé']] } },
      { id: 'potok', name: { sk: 'potok', fr: 'le ruisseau' }, poly: box(560, 590, 1500, 712),
        look: { sk: 'Potok pod mostom. Radšej sa nepozerám dole.', fr: 'Le ruisseau sous le pont. Je préfère ne pas regarder en bas.', words: [['most', 'le pont']] } },
      { id: 'zaba', sprite: 'zaba', name: { sk: 'žaba', fr: 'la grenouille' },
        look: { sk: 'Žaba na mokrom kameni. Ona sa nebojí výšok.', fr: 'Une grenouille sur une pierre mouillée. Elle n\'a pas peur du vide, elle.', words: [['žaba', 'la grenouille']] } },
      { id: 'rebrik1', name: { sk: 'rebrík', fr: 'l\'échelle' }, poly: box(335, 205, 445, 625),
        async onUse(g) {
          const st = g.flagv('rk_step') || 0;
          if (st > 0) { await say(g, 'fox', 'Tam som už bol. Naspäť nejdem.', 'J\'y suis déjà passé. Je ne retourne pas en arrière.'); return; }
          if (!g.flag('rk_ready')) { await say(g, 'fox', 'Najprv počkám, čo povie Andrea.', 'J\'attends d\'abord ce que dit Andrea.'); return; }
          if (kamzikOnLadder(g)) {
            await say(g, 'fox', 'Po rebríku ide dole celá rodina kamzíkov. Počkám, kým budú dole.', 'Toute une famille de chamois descend l\'échelle. J\'attends qu\'ils soient en bas.', [['kamzík', 'le chamois'], ['počkať', 'attendre']]);
            return;
          }
          g.setFlag('rk_climb');
          await follow(g, 'fox', [[390, 648], 'up', [390, 470]]);
          g.climb('fox', null);
          await say(g, 'fox', 'Zatváram oči. Andrea, hovor!', 'Je ferme les yeux. Andrea, parle !', [['zatvárať', 'fermer'], ['oči', 'les yeux']]);
          await g.openPanel(climbPanel, { step: 0, errs: 0 });
          g.learn('hore', 'en haut'); g.learn('ešte', 'encore'); g.learn('doprava', 'vers la droite'); g.learn('doľava', 'vers la gauche');
          await follow(g, 'fox', ['up', [390, 300], null, [585, 305]]);
          g.setFlag('rk_step', 1);
          g.pose('fox', 'laugh');
          await say(g, 'fox', 'Som hore? Som hore!', 'Je suis en haut ? Je suis en haut !');
          g.pose('fox', null);
          await say(g, 'andrea', 'Teraz cez most. Doprava.', 'Maintenant, le pont. Doprava.', [['most', 'le pont']]);
        } },
      { id: 'most', name: { sk: 'most', fr: 'le pont' }, poly: box(620, 300, 1700, 445),
        async onUse(g) {
          const st = g.flagv('rk_step') || 0;
          if (st === 1) {
            g.setFlag('rk_step', 2);
            await follow(g, 'fox', ROK_CROSS);
            await say(g, 'fox', 'Je to aspoň pekné?', 'C\'est beau, au moins ?');
            await say(g, 'andrea', 'Veľmi.', 'Très.');
            await say(g, 'fox', 'Povieš mi to.', 'Tu me raconteras.');
            await say(g, 'andrea', 'A teraz dole! Po rebríku!', 'Et maintenant, dole ! Par l\'échelle !', [['rebrík', 'l\'échelle']]);
          } else if (st === 0) await say(g, 'fox', 'Most je vysoko. Najprv musím hore.', 'Le pont est haut. Je dois d\'abord monter.');
          else await say(g, 'fox', 'Most som už prešiel.', 'J\'ai déjà traversé le pont.');
        } },
      { id: 'rebrik2', name: { sk: 'mokrý rebrík', fr: 'l\'échelle mouillée' }, poly: box(1590, 360, 1690, 650),
        async onUse(g) {
          const st = g.flagv('rk_step') || 0;
          if (st === 2) {
            g.setFlag('rk_step', 3);
            await follow(g, 'fox', ROK_DOWN);
            g.learn('dole', 'en bas');
            await say(g, 'narrator', 'Gab otvorí oči. Je celý biely. Pre ryšavú líšku je to umenie.', 'Gab ouvre les yeux. Il est tout blanc. Pour un renard roux, c\'est un exploit.');
            await say(g, 'fox', 'Koľkokrát som spadol?', 'Je suis tombé combien de fois ?');
            await say(g, 'andrea', 'Nula. Počítam.', 'Zéro. Je compte.', [['počítať', 'compter']]);
            await g.sleep(500); g.goScene('chata');
          } else if (st === 1) await say(g, 'fox', 'Ten rebrík je za mostom.', 'Cette échelle est après le pont.');
          else await say(g, 'fox', 'Mokrý rebrík vedľa vodopádu. Ten je na zostup, nie na výstup.', 'L\'échelle mouillée, près de la cascade. Elle sert à descendre, pas à monter.', [['mokrý', 'mouillé']]);
        } },
      { id: 'rebrik3', name: { sk: 'rebrík', fr: 'l\'échelle' }, poly: box(1030, 150, 1100, 395),
        async onUse(g) {
          const st = g.flagv('rk_step') || 0;
          if (st !== 1 && st !== 2) { await say(g, 'fox', 'Ten rebrík je veľmi vysoko. Odtiaľto sa tam nedostanem.', 'Cette échelle est très haut. D\'ici, je ne peux pas y aller.'); return; }
          const back = st === 1 ? [585, 305] : [1640, 402];
          await follow(g, 'fox', [[660, 402], [1065, 402], 'up', [1065, 165]]);
          g.pose('fox', 'surprised');
          await say(g, 'fox', 'Tu nie je nič. Len skala.', 'Il n\'y a rien ici. Juste de la roche.');
          g.pose('fox', null);
          await say(g, 'andrea', 'Nie tam! Počúvaj ma!', 'Pas là ! Écoute-moi !');
          await follow(g, 'fox', ['down', [1065, 402]]);
          if (st === 1) await follow(g, 'fox', [[660, 402], back]); else await follow(g, 'fox', [back]);
        } },
    ],
    hints: [
      { id: 'k3_wait', when: (g) => !g.flagv('rk_step') && !g.flag('rk_climb'), levels: [
        { sk: 'Najprv ľavý rebrík. Ale nie keď po ňom niekto ide.', fr: 'D\'abord l\'échelle de gauche. Mais pas quand quelqu\'un est dessus.' },
        { sk: 'Počkaj, kým sú kamzíky dole. Potom klikni na rebrík.', fr: 'Attends que les chamois soient en bas. Puis clique sur l\'échelle.' },
        { sk: 'V tme počúvaj: hore, doprava, doľava. „Ešte“ znamená to isté ešte raz.', fr: 'Dans le noir, écoute : hore, doprava, doľava. « Ešte » veut dire la même chose encore une fois.' } ] },
      { id: 'k3_cross', when: (g) => g.flagv('rk_step') === 1, levels: [
        { sk: 'Doprava. Cez čo?', fr: 'Doprava. Par où ?' },
        { sk: 'Klikni na most.', fr: 'Clique sur le pont.' } ] },
      { id: 'k3_down', when: (g) => g.flagv('rk_step') === 2, levels: [
        { sk: '„Dole“ je opak slova „hore“.', fr: '« Dole » est le contraire de « hore ».' },
        { sk: 'Mokrý rebrík vpravo, pri vodopáde.', fr: 'L\'échelle mouillée à droite, près de la cascade.' } ] },
    ],
    async onEnter(g) {
      if (g.flag('rk0')) return;
      g.setFlag('rk0');
      await say(g, 'narrator', 'Cesta vchádza do rokliny. A raj je zrazu zvislý.', 'Le chemin entre dans la gorge. Et le paradis devient vertical.', [['roklina', 'la gorge']]);
      await say(g, 'fox', 'Nie.', 'Non.');
      await say(g, 'andrea', 'Áno.', 'Si.');
      await say(g, 'fox', 'Nie je tu iná cesta?', 'Il n\'y a pas un autre chemin ?');
      await say(g, 'andrea', 'Je. Má šesť hodín. Choď, ja ti poviem, kam dať ruky.', 'Si. Il fait six heures. Vas-y, je te dirai où mettre les mains.');
      await follow(g, 'andrea', [...ROK_UP, ...ROK_CROSS, ...ROK_DOWN]);
      g.face('andrea', -1);
      g.setFlag('rk_ready');
      g.pose('andrea', 'point');
      await say(g, 'andrea', 'Teraz ty! Ľavý rebrík. Ja ťa navigujem.', 'À toi ! L\'échelle de gauche. Je te guide.');
      g.pose('andrea', null);
    },
  };

  // ---------------------------------------------------------------- 3. la cabane de pan Orol
  S.chata = {
    chapter: 'ch3', title: { sk: 'Chata pána Orla', fr: 'La cabane de pán Orol' }, tint: ['#d9c88a', '#a99c6a'],
    bg: 'art/raj_chata_wide.webp', worldW: 2160,
    player: 'fox', floor: [[0, 545], [2160, 545], [2160, 712], [0, 712]], scale: { y0: 545, s0: 0.5, y1: 712, s1: 0.62 },
    sprites: [gab(200, 660), andrea(320, 1, 655),
      { id: 'orol', img: 'art/orol_hrnok.png', x: 1112, y: 478, h: 150, abs: true, face: 1, pose: 'caj', still: true,
        poses: { caj: { img: 'art/orol_caj.png', h: 150 } }, alt: null },
      twoPose('sojka', 'sojka_a', 'sojka_b', 1330, 268, 58),
      twoPose('jazvecik', 'jazvecik_a', 'jazvecik_b', 1462, 512, 52, { min: 4, max: 8, hold: [1, 2] })],
    props: [{ img: 'art/obj_register.png', x: 1250, y: 456, w: 70, when: (g) => g.flag('reg_out') }],
    ambient: [
      { img: 'art/amb_para.png', w: 26, alpha: 0.6, puff: { w1: 60, life: 2.6, every: 0.9, rise: 70 }, x: 1212, y: 388 },
      { imgs: ['art/amb_vlajka_a.png', 'art/amb_vlajka_b.png'], fps: 1.6, w: 140, x: 1617, y: 176 },
      { imgs: ['art/amb_motyl_a.png', 'art/amb_motyl_b.png'], fps: 8, w: 30, cross: { from: [700, 520], to: [1600, 420], dur: 13, every: 9, arc: 50 } },
    ],
    hotspots: [
      { id: 'rebrik', name: { sk: 'rebrík', fr: 'l\'échelle' }, poly: box(40, 300, 130, 520),
        look: { sk: 'Koniec rebríkov. Už nikdy.', fr: 'La fin des échelles. Plus jamais.' } },
      { id: 'chata', name: { sk: 'chata', fr: 'la cabane' }, poly: box(480, 150, 1000, 470),
        look: { sk: 'Drevená chata strážcu parku. Muškáty v okne.', fr: 'La cabane en bois du garde du parc. Des géraniums à la fenêtre.', words: [['chata', 'la cabane']] } },
      { id: 'dalekohlad', name: { sk: 'ďalekohľad', fr: 'les jumelles' }, poly: box(1105, 265, 1160, 355), walk: [1150, 600],
        look: { sk: 'Ďalekohľad. Preto vidí všetko.', fr: 'Des jumelles. Voilà pourquoi il voit tout.', words: [['ďalekohľad', 'les jumelles']] } },
      { id: 'register', name: { sk: 'register', fr: 'le registre' }, poly: box(1210, 425, 1290, 465), walk: [1250, 600], when: (g) => g.flag('reg_out'),
        async onUse(g) {
          if (!g.flag('orol_done')) return;
          const i = await g.choice([{ sk: 'Môžem si ho požičať?', fr: 'Je peux vous l\'emprunter ?' }, { sk: '(Nechať ho tak.)', fr: '(Le laisser.)' }]);
          if (i === 0) { g.pose('orol', null); await say(g, 'orol', 'Register neodchádza z parku. Andrea má fotky.', 'Le registre ne sort pas du parc. Andrea a les photos.'); g.pose('orol', 'caj'); }
        } },
      { id: 'orol', sprite: 'orol', name: { sk: 'pán Orol', fr: 'pán Orol' }, walk: [1060, 600], async onUse(g) { await orolChat(g); } },
      { id: 'sojka', sprite: 'sojka', name: { sk: 'sojka', fr: 'le geai' }, walk: [1300, 600],
        look: { sk: 'Sojka na streche. Schováva žalude. Na zimu.', fr: 'Un geai sur le toit. Il cache des glands. Pour l\'hiver.', words: [['sojka', 'le geai'], ['žaluď', 'le gland'], ['zima', 'l\'hiver']] } },
      { id: 'jazvecik', sprite: 'jazvecik', name: { sk: 'jazvečík', fr: 'le teckel' }, walk: [1440, 600],
        async onUse(g) {
          g.pose('jazvecik', 'b');
          await say(g, 'fox', 'Ahoj, psík. Ty si strážny pes?', 'Salut, le chien. Tu es un chien de garde ?', [['pes', 'le chien']]);
          await say(g, 'narrator', 'Jazvečík otvorí jedno oko, zavrtí chvostom… a spí ďalej.', 'Le teckel ouvre un œil, remue la queue… et se rendort.');
          g.pose('jazvecik', null);
        } },
      { id: 'vlajka', name: { sk: 'vlajka', fr: 'le drapeau' }, poly: box(1540, 50, 1700, 470),
        look: { sk: 'Vlajka parku. Smrek na zelenom.', fr: 'Le drapeau du parc. Un sapin sur fond vert.', words: [['vlajka', 'le drapeau'], ['smrek', 'l\'épicéa']] } },
      { id: 'drevo', name: { sk: 'drevo', fr: 'le bois' }, poly: box(1595, 350, 1785, 515), walk: [1690, 600],
        look: { sk: 'Drevo na zimu. Pekne poukladané. Ako jeho register.', fr: 'Du bois pour l\'hiver. Bien rangé. Comme son registre.', words: [['drevo', 'le bois']] } },
      { id: 'sud', name: { sk: 'sud', fr: 'le tonneau' }, poly: box(1790, 380, 1885, 495), walk: [1840, 600],
        async onUse(g) {
          await say(g, 'narrator', 'Gab nadvihne veko. Sud na dažďovú vodu. Prázdny. Úplne suchý.', 'Gab soulève le couvercle. Un tonneau pour l\'eau de pluie. Vide. Complètement sec.', [['sud', 'le tonneau'], ['prázdny', 'vide']]);
          await say(g, 'fox', 'Tu tiež dlho nepršalo.', 'Ici non plus, il n\'a pas plu depuis longtemps.');
        } },
      { id: 'tatry', name: { sk: 'Tatry', fr: 'les Tatras' }, poly: box(1700, 30, 2060, 110),
        look: { sk: 'Vysoké Tatry. Na vrcholoch je ešte sneh.', fr: 'Les Hautes Tatras. Il y a encore de la neige sur les sommets.', words: [['sneh', 'la neige']] } },
      { id: 'jazero', name: { sk: 'chodník k jazeru', fr: 'le sentier du lac' }, poly: box(2040, 540, 2160, 712), walk: [2080, 650],
        async onUse(g) {
          if (!g.flag('orol_done')) { await say(g, 'andrea', 'Kam ideš? Najprv pán Orol.', 'Tu vas où ? D\'abord, pán Orol.'); return; }
          await say(g, 'narrator', 'Hodina cesty hore. Potok je čím ďalej, tým väčší.', 'Une heure de marche vers le haut. Plus on monte, plus le ruisseau grossit.');
          await say(g, 'fox', 'Potok rastie hore? To je naopak.', 'Le ruisseau grandit vers le haut ? C\'est à l\'envers.');
          await say(g, 'andrea', 'Potoky tečú zhora, Gab.', 'Les ruisseaux viennent d\'en haut, Gab.');
          await say(g, 'fox', 'Ja viem.', 'Je sais.');
          await say(g, 'andrea', 'Nevieš.', 'Tu ne sais pas.');
          await say(g, 'fox', 'Teraz už viem.', 'Maintenant, je sais.');
          g.goScene('jazero');
        } },
    ],
    hints: [
      { id: 'o3_greet', when: (g) => !g.flag('oc_greet'), levels: [
        { sk: 'Pán Orol je starší pán. Ako sa zdraví starší pán?', fr: 'Pán Orol est un monsieur âgé. Comment salue-t-on un monsieur âgé ?' },
        { sk: 'Nie „ahoj“. To je pre kamarátov.', fr: 'Pas « ahoj ». C\'est pour les copains.' },
        { sk: 'Povedz: „Dobrý deň, pán Orol.“', fr: 'Dis : « Dobrý deň, pán Orol. »' } ] },
      { id: 'o3_ask', when: (g) => !g.flag('oc_ask'), levels: [
        { sk: 'Pánovi Orlovi vykáme. Nie „ukáž“, ale…?', fr: 'On vouvoie pán Orol. Pas « ukáž » (montre), mais… ?' },
        { sk: '„Môžete…?“ je zdvorilé.', fr: '« Môžete… ? » (pouvez-vous) est poli.' } ] },
      { id: 'o3_quiet', when: (g) => !g.flag('reg_out'), levels: [
        { sk: 'Nechaj ma hovoriť. Ja ho poznám.', fr: 'Laisse-moi parler. Moi, je le connais.' },
        { sk: 'Keď hovorím, vyber „Mlčať“.', fr: 'Quand je parle, choisis « Se taire ».' } ] },
      { id: 'o3_go', when: (g) => g.flag('orol_done'), levels: [
        { sk: 'Jazero bobrov: chodník vpravo dole.', fr: 'Le lac des castors : le sentier en bas à droite.' }] },
    ],
    async onEnter(g) {
      if (g.flag('ch0')) return;
      g.setFlag('ch0');
      await say(g, 'narrator', 'Hore je drevená chata. Na verande sedí orol v zelenej uniforme a pije čaj.', 'En haut, il y a une cabane en bois. Sur la véranda, un aigle en uniforme vert boit son thé.', [['veranda', 'la véranda'], ['čaj', 'le thé']]);
      await say(g, 'andrea', 'To je on. Je to starší pán. A má rád poriadok.', 'C\'est lui. C\'est un monsieur âgé. Et il aime l\'ordre.', [['poriadok', 'l\'ordre']]);
    },
  };

  // ---------------------------------------------------------------- 4. le lac des castors
  S.jazero = {
    chapter: 'ch3', title: { sk: 'Bobria hrádza', fr: 'Le barrage des castors' }, tint: ['#7ea36a', '#c9b779'],
    bg: 'art/raj_jazero_wide.webp', worldW: 2160,
    player: 'fox', floor: [[0, 575], [1300, 575], [1480, 712], [0, 712]], scale: { y0: 575, s0: 0.5, y1: 712, s1: 0.6 },
    sprites: [gab(130, 660), andrea(250, 1, 655), bobor(1520, 560),
      twoPose('bobriky', 'bobriky_a', 'bobriky_b', 820, 440, 64),
      twoPose('volavka', 'volavka_a', 'volavka_b', 1985, 590, 140, { min: 6, max: 12, hold: [1.2, 1.8] })],
    extraSprites: { plava: { img: 'art/obj_siska.png', x: 980, y: 470, h: 22, abs: true, rigid: true, still: true, hidden: true } },
    props: [
      { img: 'art/obj_siska.png', x: 560, y: 598, w: 40, when: (g) => !g.flag('siska2') },
      { img: 'art/obj_palica.png', x: 1570, y: 522, w: 120, when: (g) => g.flag('palica_given') },
    ],
    ambient: [
      { img: 'art/amb_kruhy.png', w: 90, alpha: 0.55, x: 1000, y: 455, puff: { w1: 230, life: 3.2, every: 1.6, rise: 0 } },
      { img: 'art/amb_kruhy.png', w: 60, alpha: 0.5, x: 1690, y: 545, puff: { w1: 160, life: 1.8, every: 0.6, rise: 0 } },
      { img: 'art/amb_list.png', w: 24, sway: { amp: 0.6, speed: 2.4 }, cross: { from: [300, 120], to: [380, 470], dur: 7, every: 12 } },
    ],
    hotspots: [
      { id: 'ohnisko', name: { sk: 'ohnisko', fr: 'le foyer' }, poly: box(330, 480, 550, 560), walk: [440, 600],
        look: { sk: 'Kruh z kameňov. Tu budeme večer spať.', fr: 'Un cercle de pierres. C\'est ici qu\'on dormira ce soir.', words: [['ohnisko', 'le foyer']] } },
      { id: 'siska', name: { sk: 'šiška', fr: 'la pomme de pin' }, poly: box(535, 575, 590, 605), walk: [560, 640], pose: 'pick', when: (g) => !g.flag('siska2'),
        async onUse(g) { g.setFlag('siska2'); g.give('siska'); await say(g, 'fox', 'Ďalšia šiška. Zbieram ich.', 'Encore une pomme de pin. Je les collectionne.'); } },
      { id: 'hut', name: { sk: 'bobrí hrad', fr: 'la hutte' }, poly: box(1100, 245, 1450, 360),
        look: { sk: 'Bobrí hrad. Z konárov a blata.', fr: 'La hutte des castors. En branches et en boue.', words: [['konár', 'la branche'], ['blato', 'la boue']] } },
      { id: 'bobriky', sprite: 'bobriky', name: { sk: 'malé bobry', fr: 'les petits castors' },
        look: { sk: 'Dva malé bobry plávajú dokola. Striekajú.', fr: 'Deux petits castors nagent en rond. Ils s\'éclaboussent.', words: [['plávať', 'nager']] } },
      { id: 'jazero', name: { sk: 'jazero', fr: 'le lac' }, poly: box(470, 300, 1100, 470), walk: [900, 600],
        onItem: { siska: floatCone },
        look: { sk: 'Jazero za hrádzou. Veľa vody. Tu áno.', fr: 'Le lac derrière le barrage. Beaucoup d\'eau. Ici, oui.', words: [['jazero', 'le lac']] } },
      { id: 'hradza', name: { sk: 'hrádza', fr: 'le barrage' }, poly: box(900, 390, 1600, 560), walk: [1250, 630],
        onItem: { palica: givePalica, siska: floatCone },
        look: { sk: 'Hrádza z konárov, blata a kameňov. Ako od architekta. Jedna palica chýba.', fr: 'Un barrage de branches, de boue et de pierres. Comme fait par un architecte. Il manque un bâton.', words: [['hrádza', 'le barrage']] } },
      { id: 'priepust', name: { sk: 'prepad', fr: 'le déversoir' }, poly: box(1600, 430, 1760, 545),
        onItem: { siska: floatCone },
        look: { sk: 'Tu ide voda cez hrádzu. Malý vodopád.', fr: 'Ici, l\'eau passe par-dessus le barrage. Une petite cascade.', words: [['cez', 'par-dessus, à travers']] } },
      { id: 'potok', name: { sk: 'potok', fr: 'le ruisseau' }, poly: box(1760, 545, 2160, 712),
        look: { sk: 'Za hrádzou potok tečie ďalej. Dole, k dedine.', fr: 'Après le barrage, le ruisseau continue. Vers le bas, vers le village.', words: [['dedina', 'le village']] } },
      { id: 'volavka', sprite: 'volavka', name: { sk: 'volavka', fr: 'le héron' },
        look: { sk: 'Volavka. Stojí bez pohybu. Čaká na rybu.', fr: 'Un héron. Il ne bouge pas. Il attend un poisson.', words: [['volavka', 'le héron'], ['ryba', 'le poisson']] } },
      // le castor en dernier : il est devant le barrage, c'est lui qu'on touche
      { id: 'bobor2', sprite: 'bobor2', name: { sk: 'bobor', fr: 'le castor' }, walk: [1330, 640],
        onItem: { palica: givePalica, siska: floatCone }, async onUse(g) { await boborTalk(g); } },
    ],
    hints: [
      { id: 'j3_polite', when: (g) => !g.flag('bobor_ok'), levels: [
        { sk: 'Bobor je nahnevaný. Všetci mu hovoria, že je vinný.', fr: 'Le castor est fâché. Tout le monde lui dit qu\'il est coupable.' },
        { sk: 'Nehovor, že je to on. Povedz, že chceš pochopiť.', fr: 'Ne dis pas que c\'est lui. Dis que tu veux comprendre.' } ] },
      { id: 'j3_stick', when: (g) => !g.flag('palica_given'), levels: [
        { sk: 'Bobrovi chýba palica. Nemáš jednu?', fr: 'Il manque un bâton au castor. Tu n\'en as pas un ?' },
        { sk: 'Daj mu palicu z lesa: vyber ju a klikni na bobra.', fr: 'Donne-lui le bâton de la forêt : choisis-le et clique sur le castor.' } ] },
      { id: 'j3_cone', when: (g) => !g.flag('bobor_done'), levels: [
        { sk: 'Hoď niečo, čo pláva, na jazero.', fr: 'Jette quelque chose qui flotte sur le lac.' },
        { sk: 'Šiška pláva. Ak ju nemáš, jedna leží pri ohnisku.', fr: 'Une pomme de pin, ça flotte. Si tu n\'en as pas, il y en a une près du foyer.' },
        { sk: 'Vyber šišku a klikni na jazero.', fr: 'Choisis la pomme de pin et clique sur le lac.' } ] },
    ],
    async onEnter(g) {
      if (g.flag('jz0')) return;
      g.setFlag('jz0');
      await say(g, 'narrator', 'Les sa otvorí. Malé tmavé jazero. A hrádza z konárov, blata a kameňov.', 'La forêt s\'ouvre. Un petit lac sombre. Et un barrage de branches, de boue et de pierres.', [['jazero', 'le lac'], ['hrádza', 'le barrage']]);
      g.camTo(1400); await g.sleep(1300); g.camTo(null);
      await say(g, 'narrator', 'Na hrádzi pracuje bobor. Je veľmi sústredený.', 'Sur le barrage, un castor travaille. Il est très concentré.');
    },
  };

  // ---------------------------------------------------------------- le soir : le bivouac (image de Gab et Andrea sous les etoiles)
  S.bivouac = {
    cine: true, noSkip: true, bgColor: '#0b1030',
    chapter: 'ch3', title: { sk: 'Bivak', fr: 'Le bivouac' },
    pics: [{ id: 'camp', img: 'art/raj_bivouac.webp', alpha: 1 }],
    async onEnter(g) {
      const CAMP = [470, 430];
      g.fade(1);
      await g.animate(1500, (k) => g.fade(1 - k));
      g.animate(60000, (k) => g.pic('camp', { view: { zoom: 1 + 0.12 * k, ax: CAMP[0], ay: CAMP[1], sx: CAMP[0], sy: CAMP[1] } }));
      await g.wait(1200);
      await say(g, 'narrator', 'Večer. Pri jazere. Nad nimi je viac hviezd ako v Košiciach.', 'Le soir. Au bord du lac. Au-dessus d\'eux, il y a plus d\'étoiles qu\'à Košice.', [['večer', 'le soir'], ['hviezda', 'l\'étoile']]);
      await say(g, 'fox', 'Andrea?', 'Andrea ?');
      await say(g, 'andrea', 'Hm?', 'Hm ?');
      await say(g, 'fox', 'Tvoj zápisník. Ako si ho stratila?', 'Ton carnet. Tu l\'as perdu comment ?', [['stratiť', 'perdre']]);
      await g.wait(1200);
      await say(g, 'andrea', 'Nestratila. Dala som ho.', 'Je ne l\'ai pas perdu. Je l\'ai donné.', [['dať', 'donner']]);
      await say(g, 'fox', 'Komu?', 'À qui ?');
      await say(g, 'andrea', 'Niekomu milému.', 'À quelqu\'un de gentil.', [['milý', 'gentil']]);
      await say(g, 'fox', 'Kto je milý? Ten pán, čo sa usmieva?', 'Qui est gentil ? Le monsieur qui sourit ?');
      await g.wait(1000);
      await say(g, 'andrea', 'Spi, Gab.', 'Dors, Gab.', [['spať', 'dormir']]);
      await g.wait(2200);
      await g.animate(1800, (k) => g.fade(k));
      g.setFlag('bivouac_done');
      await g.showMap('ch4');
      g.goScene('chata_vecer');
    },
  };
})();
