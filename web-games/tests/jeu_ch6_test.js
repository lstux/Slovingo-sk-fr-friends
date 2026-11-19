// Joue le chapitre 6 de Zajko Quest v2 (« Brana ») dans Chromium : on part de la rue inondee, avec l'etat de fin du ch. 5.
//   SHOTS=/tmp/shots NODE_PATH=$(npm root -g) CHROME=/usr/bin/google-chrome node web-games/tests/jeu_ch6_test.js
// Conception : docs/Jeu-conception-v2.md, section 7 (chapitre 6).
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
  const missing = []; pg.on('response', (r) => { if (r.status() === 404 && !/\/audio\//.test(r.url())) missing.push(r.url()); });   // les sons pas encore trouves (docs/Sons-a-chercher.md) sont ignores
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
      if (fn(s)) { if (process.env.V) console.log("..", what); return s; }
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


  let s;
  const helper = () => pg.evaluate(() => __zajka.helper && { t: __zajka.helper.tokens, dead: __zajka.helper.dead, who: __zajka.helper.who });
  await pg.evaluate(() => {
    const g = __zajka;
    g.items = ['flasa', 'listok_0l', 'pero', 'vizitka', 'nabijacka', 'pohar'];
    g.cards = ['kniha', 'fontana', 'zastavka', 'telefon', 'fotky', 'permis', 'pan', 'bobry', 'potok_raj', 'register_sucho', 'register_nula', 'stroje', 'mokrad', 'bager_sirka', 'fotka_vykop', 'vizitka',
      'ruka', 'sucho', 'krabicka', 'sused', 'poklop', 'web42', 'web_kopia', 'starosta'];
    g.struck = ['bobry', 'sucho']; g.solved = ['q_nahoda', 'q_nula', 'q_sucho', 'q_kabel', 'q_cisla'];
    g.flags = { mato_in: true, katka_in: true };
    g.endCard = null; g.panel = null; g.dialog = null; g.choices = null;
    g.helper = { who: 'katka', tokens: 3, max: 5, dead: false };
    g.enter('povoden');
  });

  // ---------------------------------------------------------------- 1. la rue inondee : l'ordre des voyages
  await idle('intro rue'); await pg.waitForTimeout(600); await shot('61_povoden');
  picks = [0]; await useW(600, 400, 'canards d\'abord (faux)', 560);
  s = await st(); if (s.flags.dom1_ok || (s.flags.voda || 0) !== 0) await fail('le mauvais ordre n\'est pas annule ' + JSON.stringify(s.flags));
  picks = [0]; await useW(1500, 400, 'souris sans baignoire', 1360);
  s = await st(); if (!s.flags.mys_nie || s.flags.dom2_ok) await fail('la souris part sans son frigo');
  picks = [1]; await useW(265, 480, 'pompier : tutoiement', 360);
  if ((await st()).items.includes('hak')) await fail('gaffe donnee sans vouvoyer');
  picks = [0]; await useW(265, 480, 'pompier : gaffe', 360);
  await useW(1110, 400, 'corde a linge', 1100);
  s = await st(); if (!s.items.includes('hak') || !s.items.includes('lano')) await fail('gaffe/corde ' + JSON.stringify(s.items));
  await itemW('hak', 1130, 530, 'gaffe sur la baignoire', 1020);
  await itemW('lano', 1030, 585, 'corde sur la baignoire', 1020);
  s = await st(); if (!s.flags.vana_lano) await fail('baignoire pas prete');
  picks = [0]; await useW(1950, 450, 'toit', 1820);
  picks = [0]; await useW(1500, 400, 'fenetre', 1360);
  picks = [0]; await useW(600, 400, 'genoux', 560);
  s = await st(); if (!s.flags.zachrana || s.flags.voda !== 3 || !s.items.includes('kosik') || !s.items.includes('teplomer') || !s.items.includes('lano')) await fail('sauvetage ' + JSON.stringify([s.flags, s.items]));
  await shot('62_povoden_fin');
  await useW(440, 150, 'la colline', 300);
  await until((q) => q.sc === 'brana', 'le portail');

  // ---------------------------------------------------------------- 2. le portail, le parking
  await idle('intro portail'); await pg.waitForTimeout(500); await shot('63_brana');
  picks = [1]; await useW(980, 480, 'Nerozumiem, som Francuz', 880);
  s = await st(); if (!s.flags.fr_fail || s.flags.brana_open) await fail('gardien');
  await itemW('kosik', 790, 233, 'canetons a la camera', 760);
  await until((q) => q.flags.brana_open && !q.busy && !q.dlg, 'portail ouvert', 3000);
  await idle('parking'); await pg.waitForTimeout(400); await shot('64_parking');
  await useW(1620, 340, 'coffre', 1600);
  s = await st(); if (!['deka_l', 'deka_m', 'deka_s'].every((q) => s.items.includes(q))) await fail('couvertures ' + JSON.stringify(s.items));
  await itemW('deka_s', 1540, 510, 'petite aux lapins (faux)', 1500);
  if ((await st()).flags.d_zajace) await fail('petite couverture acceptee par les lapins');
  await itemW('deka_l', 1540, 510, 'grande aux lapins', 1500);
  await itemW('deka_m', 1320, 530, 'moyenne aux herissons', 1250);
  await itemW('deka_s', 1960, 525, 'petite a la souris', 1880);
  s = await st(); if (!s.flags.deky_done || !s.cards.includes('marek')) await fail('couvertures distribuees ' + JSON.stringify(s.flags));
  await pg.evaluate(() => { __zajka.helper.tokens = 0; __zajka.helper.dead = true; });
  await itemW('nabijacka', 1475, 390, 'allume-cigare', 1450);
  let h = await helper(); if (h.t !== 5 || h.dead) await fail('recharge ' + JSON.stringify(h));
  await useW(2120, 500, 'derriere le batiment', 2080);
  await until((q) => q.sc === 'rura', 'le tuyau');

  // ---------------------------------------------------------------- 3. le tuyau : la mesure, la video
  await idle('intro tuyau'); await shot('65_rura');
  await useW(1120, 430, 'le tuyau', 1120);
  s = await st(); if (!s.flags.au || !s.cards.includes('para')) await fail('vapeur');
  await pg.evaluate(() => { __zajka.run(() => ZG_DATA.combos.find((c) => c.a === 'hak' && c.b === 'teplomer').run(__zajka.api())); });
  await idle('perche');
  s = await st(); if (!s.items.includes('meradlo')) await fail('perche ' + JSON.stringify(s.items));
  await itemW('meradlo', 1900, 600, 'la riviere', 1740);
  picks = [0, 2];
  await idle('avant tuyau'); { const cam = await near(1180); await pg.evaluate(() => { __zajka.selected = 'meradlo'; }); await click(1220 - cam, 560); }
  await until((q) => q.panel === 'custom', 'cadrage');
  s = await st(); if (!s.cards.includes('teplota')) await fail('temperatures');
  await click(710, 668);   // trop serre : il manque des choses
  await until((q) => q.dlg, 'il manque'); await until((q) => !q.dlg, 'fin il manque');
  for (let i = 0; i < 3; i++) { await click(420, 668); await pg.waitForTimeout(80); }
  await click(40 + 930 * 1200 / 2160, 150 + 360 * 1200 / 2160);
  await pg.waitForTimeout(200); await shot('66_cadrage');
  await click(710, 668);
  await until((q) => q.flags.video && !q.panel, 'video');
  await idle('apres video'); await pg.waitForTimeout(300); await shot('67_fenetre');
  h = await helper(); if (h.t !== 4) await fail('batterie video ' + JSON.stringify(h));
  await useW(1060, 240, 'la fenetre de Marek', 1000);
  s = await st(); if (!s.cards.includes('video') || !s.cards.includes('marek_videl')) await fail('cartes video ' + JSON.stringify(s.cards));
  await useW(45, 500, 'retour parking', 90);
  await until((q) => q.sc === 'brana', 'parking 2'); await idle('parking 2');
  await itemW('meradlo', 1960, 525, 'rendre le thermometre', 1880);
  s = await st(); if (!s.flags.teplomer_spat) await fail('thermometre pas rendu');
  await useW(35, 500, 'route du village', 80);
  await until((q) => q.sc === 'zadok_rano', 'vendredi matin', 2000);

  // ---------------------------------------------------------------- 4. vendredi matin : le beton, le site, la question
  await idle('intro vendredi'); await shot('68_beton');
  await useW(1080, 600, 'le beton', 1080);
  await useW(1080, 600, 'la patte', 1080);
  s = await st(); if (!s.flags.labka || !s.cards.includes('beton')) await fail('beton ' + JSON.stringify(s.flags));
  await idle('avant site'); { const cam = await near(1460); await click(1560 - cam, 520); }
  await until((q) => q.panel === 'custom', 'site avant/apres');
  await pg.waitForTimeout(200); await shot('69_site');
  await click(660 + 0 * 112 + 56, 360);   // lundi : faux
  await click(660 + 3 * 112 + 56, 360);
  for (let i = 0; i < 60; i++) { const q = await st(); if (q.dlg) await click(640, 600); else if (i > 8) break; await pg.waitForTimeout(60); }
  await click(60 + 3 * 140 + 70, 360);
  await until((q) => q.q, 'question du tableau', 3000);
  await pickCards('starosta', 'beton');
  await until((q) => q.end, 'fin de l\'apercu', 3000);
  await shot('6a_fin');
  s = await st(); if (!s.flags.ch6_done || !s.cards.includes('treba_vnutri') || !s.cards.includes('web_zmena')) await fail('fin ' + JSON.stringify(s.cards));
  if (errs.length) { console.error('ERREURS JS :', errs.slice(0, 5)); process.exit(1); }
  if (missing.length) { console.error('404 :', [...new Set(missing)].slice(0, 10)); process.exit(1); }
  console.log('OK : chapitre 6 jouable de bout en bout');
  await b.close(); srv.close();
})();
