// Joue le chapitre 4 de Zajko Quest v2 (« L'orage ») dans Chromium : on part devant le refuge, avec l'etat de fin du ch. 3.
//   SHOTS=/tmp/shots NODE_PATH=$(npm root -g) CHROME=/usr/bin/google-chrome node web-games/tests/jeu_ch4_test.js
// Conception : docs/Jeu-conception-v2.md, section 7 (chapitre 4).
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


  let s;
  // l'etat de fin du chapitre 3
  await pg.evaluate(() => {
    const g = __zajka;
    g.items = ['flasa', 'listok_0l', 'pero'];
    g.cards = ['kniha', 'fontana', 'zastavka', 'telefon', 'fotky', 'permis', 'pan', 'bobry', 'potok_raj', 'register_sucho', 'register_nula', 'stroje'];
    g.struck = ['bobry']; g.solved = ['q_nahoda', 'q_nula', 'q_sucho'];
    g.endCard = null; g.panel = null; g.dialog = null; g.choices = null;
    g.enter('chata_vecer');
  });

  // ---------------------------------------------------------------- 1. devant le refuge, le soir
  await idle('intro refuge'); await pg.waitForTimeout(600); await shot('41_vecer');
  await useW(1570, 400, 'porte', 1570);
  await until((q) => q.sc === 'izba', 'entree salle');
  await idle('intro salle'); await pg.waitForTimeout(500); await shot('42_izba');

  // ---------------------------------------------------------------- 2. le mur de photos et la pelleteuse
  await idle('avant photos'); { const cam = await near(560); await click(560 - cam, 250); }
  await until((q) => q.panel === 'custom', 'panneau photos');
  const cell = (k) => { const ox = 190, oy = 92, cw = 180, chh = 138; return [ox + (k % 5) * cw + 60, oy + ((k / 5) | 0) * chh + 50]; };
  await click(...cell(3)); await pg.waitForTimeout(150);   // 2009 : rien
  await click(...cell(18));   // 2024 : la ligne
  await pg.waitForTimeout(200); await shot('43_foto2024');
  await click(640, 300);   // ferme la grande photo : dialogue de Gab et d'Andrea
  for (let i = 0; i < 40; i++) { const q = await st(); if (q.dlg) await click(640, 600); else if (i > 6) break; await pg.waitForTimeout(60); }
  if ((await st()).panel !== 'custom') await fail('le panneau photos s\'est ferme trop tot');
  await click(...cell(19));   // 2025 : la cicatrice
  await pg.waitForTimeout(200); await click(640, 300);
  // dialogues du gardien puis le panneau de comparaison
  await until((q) => q.panel === 'custom' && q.flags.foto_found && !q.dlg, 'panneau comparaison');
  await pg.waitForTimeout(300); await shot('44_compare');
  await click(60 + (73 + 23) * 0.93 + 10, 36 + 250 * 0.93);   // la pelleteuse
  await pg.waitForTimeout(300); await shot('45_zoom');
  await click(640, 400);
  await idle('apres comparaison');
  s = await st();
  if (!s.cards.includes('fotka_vykop') || !s.cards.includes('bager_sirka') || !s.cards.includes('mokrad')) await fail('cartes photo ' + JSON.stringify(s.cards));
  if (!s.flags.dark) await fail('la lumiere ne saute pas');
  await pg.waitForTimeout(300); await shot('46_noir');

  // ---------------------------------------------------------------- 3. le noir : bougie, allumettes, poele, the
  await useW(1746, 375, 'tiroir sponky', 1746);
  await useW(1683, 375, 'tiroir sol', 1683);
  await useW(1873, 375, 'tiroir sviecky', 1873);
  s = await st(); if (!s.items.includes('sviecka')) await fail('pas de bougie ' + JSON.stringify(s.items));
  await useW(1380, 210, 'plechovka', 1330);
  s = await st(); if (!s.items.includes('zapalky')) await fail('pas d\'allumettes seches');
  await useW(880, 345, 'allumettes mouillees', 880);
  await itemW('zapalky', 1515, 400, 'poele sans bougie', 1480);   // allume le poele (autorise, mais pas de the)
  await pg.evaluate(() => { __zajka.run(() => ZG_DATA.combos.find((c) => c.a === 'sviecka').run(__zajka.api())); });
  await idle('bougie'); await pg.waitForTimeout(300); await shot('47_bougie');
  s = await st(); if (!s.flags.candle) await fail('bougie pas allumee');
  await useW(1100, 410, 'tasse', 1100);
  await useW(1380, 210, 'bouilloire', 1330);
  s = await st(); if (!s.items.includes('kanvica') || !s.items.includes('salka')) await fail('bouilloire/tasse ' + JSON.stringify(s.items));
  await itemW('kanvica', 1515, 400, 'bouilloire sur le poele', 1480);
  // le the est servi, puis on frappe
  await until((q) => q.flags.knocked, 'coups a la porte');
  await idle('coups'); await pg.waitForTimeout(400); await shot('48_traces');
  s = await st(); if (!s.flags.tea_made) await fail('the pas fait');
  await useW(1300, 400, 'tasse a cacher', 1250);
  await useW(255, 625, 'tenisky', 300);
  picks = [0, 2, 1];   // « nikoho », « bola tu », puis « Nerozumiem »
  await idle('avant sac'); { const cam = await near(620); await click(615 - cam, 420); }

  // ---------------------------------------------------------------- 4. le monsieur : « Nerozumiem, som Francuz », la queue qui brule
  await until((q) => q.flags.man_in, 'le monsieur entre');
  await pg.waitForTimeout(300); await shot('49_pan_entre');
  // la queue : trois secondes sans bouger (le panneau se ferme tout seul)
  await until((q) => q.panel === 'custom', 'panneau de la queue', 3000);
  await pg.waitForTimeout(500); await shot('4a_queue');
  await until((q) => q.flags.man_sleeps, 'le monsieur dort', 4000);
  await idle('apres le monsieur'); await shot('4b_dort');

  // ---------------------------------------------------------------- 5. la cuisine (cinematique), le matin
  picks = [1, 1];
  await idle('avant cuisine'); { const cam = await near(2060); await click(2060 - cam, 400); }
  await until((q) => q.sc === 'kuchyna', 'cuisine');
  await pg.waitForTimeout(2500); await shot('4c_kuchyna');
  await until((q) => q.sc === 'chata_rano', 'matin', 3000);
  await idle('intro matin'); await pg.waitForTimeout(600); await shot('4d_rano');
  picks = [];
  await idle('avant vizitka'); { const cam = await near(1345); await click(1345 - cam, 460); }
  await until((q) => q.q, 'question du tableau');
  s = await st(); if (!s.items.includes('vizitka') || !s.cards.includes('vizitka')) await fail('carte de visite ' + JSON.stringify(s));
  await pickCards('fotka_vykop', 'mokrad');   // faux : mokrad + fotka ne vont pas ensemble
  await until((q) => q.q && q.sel === 0 && !q.dlg, 'mauvaise reponse', 800);
  await pickCards('fotka_vykop', 'bager_sirka');
  await until((q) => q.sc === 'dedina', 'vers le chapitre 5', 3000);
  await shot('4e_fin');
  s = await st(); if (!s.flags.ch4_done) await fail('ch4_done');
  if (errs.length) { console.error('ERREURS JS :', errs.slice(0, 5)); process.exit(1); }
  if (missing.length) { console.error('404 :', [...new Set(missing)].slice(0, 10)); process.exit(1); }
  console.log('OK : chapitre 4 jouable de bout en bout');
  await b.close(); srv.close();
})();
