// Joue le chapitre 3 de Zajko Quest v2 (« Le registre ») dans Chromium : on part directement de la foret, avec l'etat de fin du ch. 2.
//   SHOTS=/tmp/shots NODE_PATH=$(npm root -g) CHROME=/usr/bin/google-chrome node web-games/tests/jeu_ch3_test.js
// Conception : docs/Jeu-conception-v2.md, section 7 (chapitre 3).
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const mt = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const srv = http.createServer((q, r) => {
  const p = path.join(root, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(p, (e, d) => { if (e) { r.statusCode = 404; r.end(); } else { r.setHeader('Content-Type', mt[path.extname(p)] || 'application/octet-stream'); r.end(d); } });
}).listen(0);
(async () => {
  const port = srv.address().port, b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const pg = await b.newPage({ viewport: { width: 1280, height: 800 } });
  var shot = async (n) => { if (process.env.SHOTS) await pg.screenshot({ path: path.join(process.env.SHOTS, n + '.png') }); };
  const fail = async (m) => { console.error('ECHEC :', m); await shot('zz_echec'); process.exit(1); };
  const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errs.push(m.text()); });
  const missing = []; pg.on('response', (r) => { if (r.status() === 404 && !/\/audio\//.test(r.url())) missing.push(r.url()); });   // les sons pas encore trouves sont ignores
  await pg.goto(`http://localhost:${port}/aventure/jeu.html`);
  await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  await pg.evaluate(() => localStorage.clear());
  await pg.reload(); await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  const click = (x, y) => pg.evaluate(([x, y]) => __zajka.click([x, y]), [x, y]);
  const st = () => pg.evaluate(() => ({ sc: __zajka.scene.id, flags: __zajka.flags, items: __zajka.items, dlg: !!__zajka.dialog, ch: !!__zajka.choices, busy: __zajka.busy, panel: __zajka.panel, end: !!__zajka.endCard, cards: __zajka.cards, struck: __zajka.struck || [], q: !!__zajka.boardQ, sel: __zajka.boardSel.length, dsk: __zajka.dialog && __zajka.dialog.sk }));
  let picks = [];
  const until = async (fn, what, n) => {
    for (let i = 0; i < (n || 1500); i++) {
      const s = await st();
      if (fn(s)) return s;
      if (s.panel === 'map') await click(640, 360);
      else if (s.dlg) await click(640, 600);
      else if (s.ch) { const n2 = await pg.evaluate(() => __zajka.choices.opts.length); const k = picks.length ? picks.shift() : 0; await pg.evaluate(([k, n2]) => { const r = __zajka.choiceRect(k, n2); __zajka.click([r.x + 10, r.y + 10]); }, [k, n2]); }
      await pg.waitForTimeout(30);
    }
    await fail(what + ' ' + JSON.stringify(await st()));
  };
  const idle = (what) => until((s) => !s.busy && !s.dlg && !s.ch && !s.panel, what);
  const near = async (wx) => { await pg.evaluate(async (x) => { await __zajka.walk('fox', x, 650); __zajka.cam = __zajka.camTarget(); }, wx); return pg.evaluate(() => __zajka.cam); };
  const useW = async (wx, wy, what, gx) => { await idle('avant ' + what); const cam = await near(gx === undefined ? wx : gx); await click(wx - cam, wy); await idle(what); };
  const itemW = async (name, wx, wy, what, gx) => { await idle('avant ' + what); const cam = await near(gx === undefined ? wx : gx); await pg.evaluate((n) => { __zajka.selected = n; }, name); await click(wx - cam, wy); await idle(what); };
  // sans marcher (la gorge : Gab est sur les echelles) : la camera suit Gab, on clique a l'ecran
  const useHere = async (wx, wy, what) => { await idle('avant ' + what); const cam = await pg.evaluate(() => { __zajka.cam = __zajka.camTarget(); return __zajka.cam; }); await click(wx - cam, wy); await idle(what); };
  const pickCards = async (a, b2) => {
    for (const id of [a, b2]) { await pg.evaluate((id) => { const r = __zajka.boardCardRects().find((q) => q.id === id); __zajka.click([r.x + r.w / 2, r.y + r.h / 2]); }, id); await pg.waitForTimeout(80); }
  };

  // l'etat de fin du chapitre 2
  await pg.evaluate(() => {
    const g = __zajka;
    g.items = ['flasa_prazdna', 'listok_0l', 'pero'];
    g.cards = ['kniha', 'fontana', 'zastavka', 'telefon', 'fotky', 'permis', 'pan'];
    g.solved = ['q_nahoda', 'q_nula'];
    g.endCard = null; g.panel = null; g.dialog = null; g.choices = null;
    g.enter('raj');
  });

  // ---------------------------------------------------------------- 1. la foret
  await idle('intro foret');
  if (!(await st()).cards.includes('bobry')) await fail('pas de carte « bobry »');
  await pg.waitForTimeout(500); await shot('31_foret');
  await useW(2100, 450, 'sortie trop tot', 2060);
  if ((await st()).sc !== 'raj') await fail('on quitte la foret sans boire');
  await useW(1800, 500, 'le ruisseau', 1760);
  let s = await st();
  if (!s.items.includes('flasa') || !s.cards.includes('potok_raj')) await fail('ruisseau : bouteille ou carte ' + JSON.stringify(s.items));
  await useW(2100, 450, 'sortie sans baton', 2060);
  if ((await st()).sc !== 'raj') await fail('on quitte la foret sans le baton');
  await useW(690, 640, 'le baton', 700);
  await useW(1470, 615, 'la pomme de pin', 1470);
  picks = [0];
  await useW(1010, 520, 'les randonneurs', 880);
  s = await st(); if (!s.items.includes('palica') || !s.items.includes('siska') || !s.flags.turisti_ok) await fail('foret : objets ' + JSON.stringify(s));
  await pg.evaluate(() => { __zajka.cam = 400; }); await pg.waitForTimeout(400); await shot('32_foret_turisti');
  await useW(2100, 450, 'vers la gorge', 2060);
  await until((q) => q.sc === 'rokle', 'entree gorge');

  // ---------------------------------------------------------------- 2. la gorge : attendre les chamois, l'escalade dans le noir
  await idle('Andrea passe devant');
  // on attend que les chamois soient SUR l'echelle, on clique : Gab attend
  await pg.waitForFunction(() => { const sc = __zajka.scene, ai = sc.ambient.findIndex((a) => a.kamzik), k = ((__zajka.t + ai * 1.7) % 15) / 6; return k > 0.2 && k < 0.8; }, null, { timeout: 20000 });
  await pg.evaluate(() => { __zajka.cam = 0; }); await pg.waitForTimeout(100); await shot('33_gorge_chamois');
  await useHere(390, 420, 'echelle occupee');
  if ((await st()).flags.rk_climb) await fail('Gab grimpe pendant que les chamois descendent');
  await pg.waitForFunction(() => { const sc = __zajka.scene, ai = sc.ambient.findIndex((a) => a.kamzik), k = ((__zajka.t + ai * 1.7) % 15) / 6; return k > 1.3; }, null, { timeout: 20000 });
  await idle('avant echelle');
  await click(390, 420);
  await until((q) => q.panel === 'custom', 'panneau noir');
  const SEQ = ['hore', 'ešte', 'doprava', 'hore', 'doľava', 'ešte', 'hore'], POS = { hore: [640, 190], 'doľava': [290, 360], doprava: [990, 360] };
  const eff = (i) => { let j = i; while (SEQ[j] === 'ešte') j -= 1; return SEQ[j]; };
  let wrongDone = false, slipDone = false;
  for (let n = 0; n < 60; n++) {
    const c = await pg.evaluate(() => { const C = __zajka.custom; return C && C.st && { step: C.st.step, holds: C.st.holds, next: C.st.next, finish: C.st.finish }; });
    if (!c) break;
    if (c.next != null || c.finish != null || !c.holds) { await pg.waitForTimeout(150); continue; }
    if (n === 0) await shot('34_gorge_noir');
    const t = eff(c.step);
    let d = t;
    if (!wrongDone && c.step === 2) { d = Object.keys(POS).find((q) => q !== t && c.holds[q] !== 'prisa_mach'); wrongDone = true; }
    else if (!slipDone && c.step === 3) { const m = Object.keys(POS).find((q) => c.holds[q] === 'prisa_mach'); if (m) { d = m; slipDone = true; } }
    await click(POS[d][0], POS[d][1]);
    await pg.waitForTimeout(200);
    if (d !== t || c.holds[d] === 'prisa_mach') {
      const after = await pg.evaluate(() => __zajka.custom && __zajka.custom.st.step);
      if (after !== Math.max(0, c.step - 1)) await fail('une erreur doit faire redescendre d\'un cran ' + after);
      await pg.waitForTimeout(300); await shot('35_gorge_erreur');
    }
  }
  if (!wrongDone) await fail('pas teste l\'erreur dans le noir');
  await idle('fin de l\'escalade');
  s = await st(); if (s.flags.rk_step !== 1) await fail('pas en haut apres l\'escalade ' + s.flags.rk_step);
  await useHere(1100, 380, 'le pont');
  await useHere(1640, 500, 'echelle mouillee');
  await until((q) => q.sc === 'chata', 'entree cabane');

  // ---------------------------------------------------------------- 3. la cabane de pan Orol
  await idle('intro cabane');
  await pg.evaluate(() => { __zajka.cam = 600; }); await pg.waitForTimeout(500); await shot('36_cabane');
  await pg.evaluate(() => { __zajka.camFocus = 1500; }); await pg.waitForTimeout(1200); await shot('36b_cabane_droite'); await pg.evaluate(() => { __zajka.camFocus = null; });
  picks = [0];                                           // « Ahoj, orol! » : Tykáme si?
  await useW(1112, 420, 'Orol tutoye', 1060);
  if ((await st()).flags.oc_greet) await fail('le tutoiement est accepte');
  picks = [1, 2];                                        // bonjour poli, puis « Daj mi… » (tutoiement)
  await useW(1112, 420, 'Orol demande tutoyee', 1060);
  s = await st(); if (!s.flags.oc_greet || s.flags.oc_ask) await fail('salut/demande ' + JSON.stringify(s.flags));
  picks = [1, 1, 1];                                     // « Môžete… », puis Gab coupe deux fois la parole : l'aigle retourne a son the
  await useW(1112, 420, 'Gab coupe la parole', 1060);
  if ((await st()).flags.reg_out) await fail('registre sorti malgre deux interruptions');
  picks = [0, 0];
  await idle('avant registre');
  await click(1112 - (await pg.evaluate(() => __zajka.cam)), 420);
  await until((q) => q.panel === 'custom', 'panneau du registre');
  await pg.waitForTimeout(300); await shot('37_registre');
  const row = (y) => { const i = y - 1995, pg2 = i < 16 ? 0 : 1, k = i < 16 ? i : i - 16; return [[150, 690][pg2] + 100, 150 + 34 + k * 29 + 14]; };
  await click(...row(2007));                             // un ete sec, pas tres sec : Andrea commente
  await until((q) => !q.dlg && q.panel === 'custom', 'commentaire ete sec');
  for (const y of [2003, 2015, 2018, 2025]) { await click(...row(y)); await pg.waitForTimeout(120); }
  await until((q) => q.panel === 'board' && q.q && !q.dlg, 'question q_sucho');
  await pg.waitForTimeout(400); await shot('38_tableau_sucho');
  await pickCards('bobry', 'fontana');
  await until((q) => !q.dlg && q.sel === 0, 'mauvaise paire');
  await pickCards('register_sucho', 'register_nula');
  await idle('fin Orol');
  s = await st(); if (!s.flags.orol_done) await fail('Orol pas fini');
  await useW(2100, 650, 'vers le lac', 2080);
  await until((q) => q.sc === 'jazero', 'entree lac');

  // ---------------------------------------------------------------- 4. le lac des castors
  await idle('intro lac');
  await pg.evaluate(() => { __zajka.cam = 700; }); await pg.waitForTimeout(500); await shot('39_lac');
  picks = [0];                                           // « Nerozumiem, som Francúz » : non, en francais aussi
  await useW(1520, 500, 'castor 1', 1330);
  picks = [0];                                           // « Bobry berú vodu » : non
  await useW(1520, 500, 'castor 2', 1330);
  if ((await st()).flags.bobor_ok) await fail('castor accuse mais d\'accord');
  picks = [1];
  await useW(1520, 500, 'castor poli', 1330);
  if (!(await st()).flags.bobor_ok) await fail('castor pas d\'accord');
  await itemW('siska', 900, 400, 'pomme de pin trop tot', 900);
  if (!(await st()).items.includes('siska')) await fail('pomme de pin perdue trop tot');
  picks = [0, 1];                                        // « Nič » puis « Vodu »
  await itemW('palica', 1520, 500, 'le baton', 1330);
  if (!(await st()).flags.palica_given) await fail('baton pas donne');
  await idle('avant pomme de pin');
  { const cam = await near(900); await pg.evaluate(() => { __zajka.selected = 'siska'; }); await click(900 - cam, 400); }
  await pg.waitForTimeout(2500); await shot('40_lac_pomme');
  await until((q) => q.sc === 'bivouac' || q.end, 'vers le bivouac');
  s = await st();
  if (!s.struck.includes('bobry') || !s.cards.includes('stroje')) await fail('castors pas rayes / carte machines ' + JSON.stringify(s));
  await until((q) => q.sc === 'chata_vecer', 'fin du chapitre 3 : on arrive au refuge');
  await pg.evaluate(() => { __zajka.panel = 'board'; __zajka.boardT = 1; }); await pg.waitForTimeout(300); await shot('41_tableau_fin');
  if (missing.length) await fail('fichiers manquants : ' + missing.join(', '));
  if (errs.length) await fail('erreurs JS : ' + errs.join(' | '));
  console.log('OK : chapitre 3 joue jusqu\'au bout');
  await b.close(); srv.close();
})();
