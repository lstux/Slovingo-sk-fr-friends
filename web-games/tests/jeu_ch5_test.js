// Joue le chapitre 5 de Zajko Quest v2 (« 42 centimetres ») dans Chromium : on part au village, avec l'etat de fin du ch. 4.
//   SHOTS=/tmp/shots NODE_PATH=$(npm root -g) CHROME=/usr/bin/google-chrome node web-games/tests/jeu_ch5_test.js
// Conception : docs/Jeu-conception-v2.md, section 7 (chapitre 5).
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
    g.items = ['flasa', 'listok_0l', 'pero', 'vizitka'];
    g.cards = ['kniha', 'fontana', 'zastavka', 'telefon', 'fotky', 'permis', 'pan', 'bobry', 'potok_raj', 'register_sucho', 'register_nula', 'stroje', 'mokrad', 'bager_sirka', 'fotka_vykop', 'vizitka'];
    g.struck = ['bobry']; g.solved = ['q_nahoda', 'q_nula', 'q_sucho', 'q_kabel'];
    g.endCard = null; g.panel = null; g.dialog = null; g.choices = null;
    g.setHelper && 0; g.helper = { who: 'andrea', tokens: 2, max: 3, dead: false };
    g.enter('dedina');
  });

  // ---------------------------------------------------------------- 1. le ruisseau, Mato, Katka
  await idle('intro village'); await pg.waitForTimeout(600); await shot('51_dedina');
  if (await helper()) await fail('Andrea souffle encore au chapitre 5');
  await useW(1150, 565, 'ruisseau sec');
  s = await st(); if (!s.cards.includes('ruka') || !s.struck.includes('sucho')) await fail('secheresse pas rayee ' + JSON.stringify(s.struck));
  await useW(1385, 462, 'brebis coincee 1', 1390);
  await useW(1640, 480, 'Mato');
  s = await st(); if (!s.flags.mato_met) await fail('Mato pas rencontre');
  await useW(1880, 495, 'Katka');
  s = await st(); if (!s.flags.katka_in || !s.items.includes('nabijacka')) await fail('Katka ' + JSON.stringify(s.items));
  let h = await helper(); if (!h || h.who !== 'katka' || h.t !== 5) await fail('batterie ' + JSON.stringify(h));
  // un indice : 1 barre, puis 2 (direction)
  await pg.evaluate(() => { __zajka.useHint(); }); await idle('indice 1');
  await pg.evaluate(() => { __zajka.useHint(); }); await idle('indice 2');
  h = await helper(); if (h.t !== 2) await fail('cout des indices ' + JSON.stringify(h));
  await useW(2050, 350, 'bergerie trop tot');
  if ((await st()).sc !== 'dedina') await fail('la bergerie s\'ouvre trop tot');
  await shot('52_dedina_bande');

  // ---------------------------------------------------------------- 2. la cuisine de Babka
  picks = [0];   // « Nie s bryndzou ? » -> « Ja som ovca. »
  await useW(825, 360, 'maison de Babka');
  await until((q) => q.sc === 'kuchyna5', 'cuisine');
  await idle('intro cuisine'); await pg.waitForTimeout(500); await shot('53_kuchyna');
  s = await st(); if (!s.flags.ja_ovca) await fail('gag de la brebis');
  await useW(1035, 395, 'assiette 1');
  await useW(1035, 395, 'assiette 2 (Babka ressert)');
  s = await st(); if ((s.flags.plates || 0) !== 3) await fail('assiettes ' + s.flags.plates);
  await useW(470, 400, 'sortie bloquee');
  if ((await st()).sc !== 'kuchyna5') await fail('on sort sans finir son assiette');
  picks = [0]; await useW(1300, 500, 'Babka : « Uz nemozem »', 1180);
  if ((await st()).flags.jedz_done) await fail('mauvaise phrase acceptee');
  picks = [1]; await useW(1300, 500, 'Babka : la bonne phrase', 1180);
  s = await st(); if (!s.flags.jedz_done || !s.cards.includes('sused')) await fail('fin du repas ' + JSON.stringify(s.cards));
  picks = [0, 0, 1, 0]; await useW(1300, 500, 'Babka : chou et verre', 1180);
  s = await st(); if (!s.items.includes('list') || !s.items.includes('pohar')) await fail('chou/verre ' + JSON.stringify(s.items));
  await useW(250, 220, 'boitier fibre', 300);
  s = await st(); if (!s.cards.includes('krabicka')) await fail('carte boitier');
  await itemW('nabijacka', 250, 383, 'prise', 300);
  h = await helper(); if (h.t !== 5) await fail('recharge ' + JSON.stringify(h));
  await shot('54_kuchyna_fin');
  await useW(470, 400, 'sortie');
  await until((q) => q.sc === 'dedina', 'retour village');
  await idle('retour village');

  // ---------------------------------------------------------------- 3. la brebis, la bergerie
  await itemW('list', 1385, 462, 'chou a la brebis', 1390);
  s = await st(); if (!s.flags.ovca_free || !s.flags.mato_in || !s.items.includes('list')) await fail('brebis ' + JSON.stringify(s.flags));
  await shot('55_brebis');
  await useW(2050, 350, 'bergerie');
  await until((q) => q.sc === 'zadok', 'derriere la bergerie');
  await idle('intro zadok'); await pg.waitForTimeout(500); await shot('56_zadok');

  // ---------------------------------------------------------------- 4. la plaque : le silence, le verre
  await useW(1080, 600, 'plaque (soulever)');
  s = await st(); if (!s.flags.lift || s.flags.poklop_done) await fail('plaque ' + JSON.stringify(s.flags));
  picks = [1]; await useW(980, 500, 'Mato bavard', 760);
  picks = [0]; await useW(980, 500, 'Mato : Pst', 760);
  s = await st(); if (!s.flags.mato_ticho) await fail('Mato pas silencieux');
  picks = [0]; await useW(1460, 520, 'Katka : silencieux', 1360);
  await itemW('list', 1720, 540, 'chou a la cloche', 1640);
  s = await st(); if (!s.flags.tel_ticho || !s.flags.zvonec_prec || s.items.includes('list')) await fail('silence ' + JSON.stringify(s.flags));
  // la batterie a plat : la capture echouera
  await pg.evaluate(() => { __zajka.helper.tokens = 0; __zajka.helper.dead = true; });
  await until((q) => !q.dlg && !q.busy, 'avant tracteur');
  await pg.waitForFunction(() => { const t = __zajka.sprites.find((q) => q.id === 'traktor'); return t && t.hidden; }, null, { timeout: 60000 });
  picks = [0, 2];
  await idle('avant verre'); { const cam = await near(1080); await pg.evaluate(() => { __zajka.selected = 'pohar'; }); await click(1080 - cam, 600); }
  await until((q) => q.panel === 'custom', 'le site');
  await pg.waitForTimeout(300); await shot('57_web');
  const R = (y) => 28 + y * 1180 / 1672, C = (x) => 50 + x * 1180 / 1672;
  await click(640, 360);
  await until((q) => q.panel === 'custom' && !q.dlg && !q.busy || (q.panel === 'custom' && !q.dlg), 'web etape 1');
  for (let i = 0; i < 60; i++) { const q = await st(); if (q.dlg) await click(640, 600); else if (i > 8) break; await pg.waitForTimeout(60); }
  await click(640, (R(375) + R(450)) / 2);
  await pg.waitForTimeout(1400); await shot('58_web_pose');
  for (let i = 0; i < 80; i++) { const q = await st(); if (q.dlg) await click(640, 600); else if (i > 10) break; await pg.waitForTimeout(60); }
  await click((C(245) + C(442)) / 2, (R(302) + R(375)) / 2);   // lundi : faux
  await pg.waitForTimeout(200);
  await click((C(638) + C(835)) / 2, (R(302) + R(375)) / 2);   // mercredi
  await until((q) => q.flags.need_shot, 'batterie a plat');
  await idle('apres batterie'); await shot('59_vybity');
  s = await st(); if (!s.cards.includes('poklop') || !s.cards.includes('web42') || s.cards.includes('web_kopia')) await fail('cartes ' + JSON.stringify(s.cards));

  // ---------------------------------------------------------------- 5. recharger chez Babka, puis la capture et le maire
  await useW(60, 500, 'retour village', 90);
  await until((q) => q.sc === 'dedina', 'village'); await idle('village 2');
  await useW(825, 360, 'maison 2'); await until((q) => q.sc === 'kuchyna5', 'cuisine 2'); await idle('cuisine 2');
  await itemW('nabijacka', 250, 383, 'prise 2', 300);
  await useW(470, 400, 'sortie 2'); await until((q) => q.sc === 'dedina', 'village 3'); await idle('village 3');
  await useW(2050, 350, 'bergerie 2'); await until((q) => q.sc === 'zadok', 'zadok 2'); await idle('zadok 2');
  picks = [1];
  await idle('avant capture'); { const cam = await near(1360); await click(1460 - cam, 520); }
  await until((q) => q.dsk && /Zase ty/.test(q.dsk), 'le maire', 3000);
  await pg.waitForTimeout(600); await shot('5a_starosta');
  await until((q) => q.q, 'question du tableau', 3000);
  s = await st(); if (!s.cards.includes('web_kopia') || !s.cards.includes('starosta')) await fail('pieces ' + JSON.stringify(s.cards));
  h = await helper(); if (h.t !== 4) await fail('capture : batterie ' + JSON.stringify(h));
  await pickCards('web42', 'sused');
  await until((q) => q.q && q.sel === 0 && !q.dlg, 'mauvaise reponse', 800);
  await pickCards('web42', 'ruka');
  await until((q) => q.end, 'fin de l\'apercu', 3000);
  await shot('5b_fin');
  s = await st(); if (!s.flags.ch5_done) await fail('ch5_done');
  if (errs.length) { console.error('ERREURS JS :', errs.slice(0, 5)); process.exit(1); }
  if (missing.length) { console.error('404 :', [...new Set(missing)].slice(0, 10)); process.exit(1); }
  console.log('OK : chapitre 5 jouable de bout en bout');
  await b.close(); srv.close();
})();
