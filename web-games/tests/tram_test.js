// Le tram v2 de Zajko Quest (decor 3:1, camera qui suit Gab, Andrea decouverte au fond) : jeu.html
//   node web-games/tests/tram_test.js   (captures dans $SHOTS si defini)
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const mt = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const srv = http.createServer((q, r) => {
  const p = path.join(root, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(p, (e, d) => { if (e) { r.statusCode = 404; r.end(); } else { r.setHeader('Content-Type', mt[path.extname(p)] || 'application/octet-stream'); r.end(d); } });
}).listen(0);
(async () => {
  const port = srv.address().port, b = await chromium.launch();
  const fail = (m) => { console.error('ECHEC :', m); process.exit(1); };
  const pg = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errs.push(m.text()); });
  const url = `http://localhost:${port}/aventure/jeu.html`;
  const shot = async (n) => { if (process.env.SHOTS) await pg.screenshot({ path: path.join(process.env.SHOTS, n + '.png') }); };
  const st = () => pg.evaluate(() => ({ sc: __zajka.scene.id, flags: __zajka.flags, items: __zajka.items, dlg: __zajka.dialog && __zajka.dialog.sk, ch: !!__zajka.choices, busy: __zajka.busy, panel: __zajka.panel, cam: Math.round(__zajka.cam),
    fx: Math.round(__zajka.sprites.find((s) => s.id === 'fox').x), rev: ((s) => (s && !s.hidden ? Math.round(s.x) : null))(__zajka.sprites.find((s) => s.id === 'revizor')) }));
  let picks = [];
  const until = async (fn, what, n = 400) => {
    for (let i = 0; i < n; i++) {
      const s = await st();
      if (fn(s)) return s;
      if (s.dlg) await pg.evaluate(() => __zajka.advance());
      else if (s.ch) { const k = picks.length ? picks.shift() : 0; await pg.evaluate((k) => { const c = __zajka.choices; __zajka.choices = null; c.resolve(k); }, k); }
      await pg.waitForTimeout(40);
    }
    fail(what + ' ' + JSON.stringify(await st()));
  };
  const idle = (w) => until((s) => !s.busy && !s.dlg && !s.ch && !s.panel, w);
  // entrer dans le tram avec un ticket, comme en sortant de la gare
  const toTram = async () => {
    await pg.goto(url); await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
    await pg.evaluate(() => localStorage.clear());
    await pg.goto(url); await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
    await pg.evaluate(() => __zajka.skipCine());
    await idle('gare');
    await pg.evaluate(() => { __zajka.items = ['listok']; __zajka.flags.intro0 = true; __zajka.enter('tram'); });
    await idle('entree tram');
  };
  const walkTo = (x) => pg.evaluate(async (x) => { await __zajka.walk('fox', x, 650); }, x);
  const stamp = async () => { await walkTo(1080); await pg.evaluate(() => { __zajka.cam = __zajka.camTarget(); __zajka.selected = 'listok'; const c = __zajka.cam; __zajka.click([1080 - c, 330]); }); };
  const andreaOnScreen = () => pg.evaluate(() => { const a = __zajka.sprites.find((s) => s.id === 'andrea'); return a.x - __zajka.cam < 1280 + 60; });

  // 1. au depart : wagon « vide », Andrea hors de l'ecran, pas de rencontre
  await toTram();
  let s = await st();
  if (s.flags.met) fail('rencontre des l\'entree');
  if (await andreaOnScreen()) fail('Andrea visible des l\'entree');
  await shot('tram_1_entree');

  // 2. valider d'abord : pas de controleur tant qu'on n'a pas retrouve Andrea
  await stamp(); await idle('composteur');
  s = await st(); if (!s.flags.stamped) fail('ticket non valide'); if (s.rev !== null || s.flags.checked) fail('controleur avant la rencontre');
  // 3. avancer : Andrea entre dans l'ecran, la rencontre se declenche, puis le controle (ticket deja valide)
  await walkTo(1320);
  picks = [1, 0, 1];     // « Dobrý deň, pani » (raté), « Ahoj, Andrea », puis « Tu je môj lístok »
  await until((q) => q.flags.met, 'rencontre');
  if (!(await andreaOnScreen())) fail('Andrea hors de l\'ecran pendant la rencontre');
  await shot('tram_2_rencontre');
  await until((q) => q.rev !== null, 'arrivee du controleur'); await shot('tram_3_controleur');
  await until((q) => q.flags.checked && !q.busy && !q.dlg && !q.ch, 'controle');
  // 4. sortie a l'avant
  await walkTo(360); await pg.evaluate(() => { __zajka.cam = __zajka.camTarget(); });
  if ((await st()).cam > 5) fail('camera pas revenue a l\'avant');
  picks = [1, 1];
  await pg.evaluate(() => __zajka.click([355 - __zajka.cam, 360]));
  await until((q) => q.sc === 'rue', 'porte');
  await pg.evaluate(() => { __zajka.choices = null; });

  // 5. autre ordre : rencontrer Andrea sans valider -> 50 s plus tard, l'amende, et on recommence
  await toTram();
  await walkTo(1320); picks = [0]; await until((q) => q.flags.met && !q.busy && !q.dlg && !q.ch, 'rencontre sans ticket valide');
  if ((await st()).rev !== null) fail('controleur sans ticket valide, trop tot');
  await pg.evaluate(() => { __zajka.sceneTime += 51; });
  await until((q) => q.dlg && /pokuta/.test(q.dlg), 'amende');
  await idle('apres amende'); s = await st();
  if (s.sc !== 'tram' || s.fx > 400) fail('le tram n\'a pas recommence apres l\'amende ' + JSON.stringify(s));
  // 6. puis valider : le controle se fait tout de suite (Andrea deja retrouvee)
  picks = [1]; await stamp(); await until((q) => q.flags.checked && !q.busy && !q.dlg && !q.ch, 'controle apres amende');

  if (errs.length) fail('erreurs JS : ' + errs.join(' | '));
  await b.close(); srv.close();
  console.log('OK : tram v2 (Andrea decouverte au fond, controle, amende, sortie)');
})().catch((e) => { console.error(e); process.exit(1); });
