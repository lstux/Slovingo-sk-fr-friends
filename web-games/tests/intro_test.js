// L'ouverture de Zajko Quest (cinematique : carte de l'Europe avec zoom, Slovaquie, train) : jeu.html
//   node web-games/tests/intro_test.js   (captures dans $SHOTS si defini)
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
  const fresh = async () => { await pg.goto(url); await pg.waitForFunction(() => window.__zajka && window.__zajka.scene); await pg.evaluate(() => localStorage.clear()); await pg.goto(url); await pg.waitForFunction(() => window.__zajka && window.__zajka.scene); };
  const st = () => pg.evaluate(() => ({ sc: __zajka.scene.id, cap: __zajka.caption && __zajka.caption.sk, fade: __zajka.fadeA, pics: __zajka.pics.map((q) => [q.id, +q.alpha.toFixed(2), +q.view.zoom.toFixed(2), Math.round(q.view.ax)]), flags: __zajka.flags, words: Object.keys(__zajka.words) }));
  const shot = async (n) => { if (process.env.SHOTS) await pg.screenshot({ path: path.join(process.env.SHOTS, n + '.png') }); };

  // 1. une nouvelle partie commence par l'ouverture ; on la regarde en entier (sans cliquer)
  await fresh();
  let s = await st(); if (s.sc !== 'uvod') fail('la partie ne commence pas par l\'ouverture : ' + s.sc);
  const marks = [[1.5, 'intro_1_europe'], [6, 'intro_2_zoom'], [10.8, 'intro_3_fondu'], [13, 'intro_4_slovensko'], [17.5, 'intro_5_train'], [29, 'intro_6_train_fin']];
  const t0 = Date.now(); const seen = [];
  for (const [t, n] of marks) {
    while ((Date.now() - t0) / 1000 < t) await pg.waitForTimeout(50);
    s = await st(); seen.push([t, s.sc, s.cap, JSON.stringify(s.pics)]); await shot(n);
  }
  for (const x of seen) console.log(x.join(' | '));
  if (!seen.some((x) => /Leto|Gab má/.test(x[2] || ''))) fail('pas de carton sur la carte de l\'Europe');
  if (!seen.some((x) => /Košíc/.test(x[2] || ''))) fail('pas de carton sur la Slovaquie / le train');
  for (let i = 0; i < 400 && (await st()).sc === 'uvod'; i++) await pg.waitForTimeout(100);
  s = await st();
  if (s.sc !== 'gare') fail('l\'ouverture ne mene pas a la gare : ' + s.sc);
  if (!s.flags.intro_done) fail('drapeau intro_done absent');
  for (const w of ['leto', 'cestujúci', 'konečná stanica']) if (!s.words.includes(w)) fail('mot non appris : ' + w);
  await pg.waitForTimeout(1200); await shot('intro_7_gare');
  if ((await st()).fade > 0.01) fail('le fondu depuis le noir ne se termine pas');

  // 2. recharger la page : on reste a la gare (l'ouverture ne se rejoue pas)
  await pg.goto(url); await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  if ((await st()).sc === 'uvod') fail('l\'ouverture se rejoue au rechargement');

  // 3. bouton « Passer » (clic dans son rectangle) : directement a la gare
  await fresh();
  await pg.waitForTimeout(1500);
  const r = await pg.evaluate(() => __zajka.skipRect());
  await pg.evaluate(([x, y]) => __zajka.click([x, y]), [r.x + r.w / 2, r.y + r.h / 2]);
  await pg.waitForTimeout(300);
  s = await st(); if (s.sc !== 'gare' || !s.flags.intro_done) fail('« Passer » ne mene pas a la gare : ' + JSON.stringify(s));
  // l'histoire de l'ouverture, interrompue, ne doit plus rien faire (pas de second passage a la gare)
  await pg.waitForTimeout(3000);
  if ((await st()).sc !== 'gare') fail('apres « Passer », l\'ouverture continue en douce');

  // 4. un clic ailleurs raccourcit seulement l'attente (on reste dans l'ouverture)
  await fresh(); await pg.waitForTimeout(1500);
  await pg.evaluate(() => __zajka.click([640, 400]));
  await pg.waitForTimeout(200);
  if ((await st()).sc !== 'uvod') fail('un clic simple a quitte l\'ouverture');

  if (errs.length) fail('erreurs JS : ' + errs.join(' | '));
  await b.close(); srv.close();
  console.log('OK : ouverture (zoom, fondu, train, cartons, Passer, pas de seconde lecture)');
})().catch((e) => { console.error(e); process.exit(1); });
