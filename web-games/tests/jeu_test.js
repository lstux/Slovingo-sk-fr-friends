// Joue Zajko Quest (prologue + chapitres 1 et 2) dans Chromium en pilotant le moteur par clics canvas.
//   node web-games/tests/jeu_test.js   (captures dans $SHOTS si defini)
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const mt = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const srv = http.createServer((q, r) => {
  let p = path.join(root, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(p, (e, d) => { if (e) { r.statusCode = 404; r.end(); } else { r.setHeader('Content-Type', mt[path.extname(p)] || 'application/octet-stream'); r.end(d); } });
}).listen(0);
(async () => {
  const port = srv.address().port, b = await chromium.launch();
  const fail = (m) => { console.error('ECHEC :', m); process.exit(1); };
  const pg = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errs.push(m.text()); });
  await pg.goto(`http://localhost:${port}/aventure/jeu.html`);
  await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  await pg.evaluate(() => { localStorage.clear(); __zajka.newGame && 0; });
  await pg.reload(); await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  const click = (x, y) => pg.evaluate(([x, y]) => __zajka.click([x, y]), [x, y]);
  const st = () => pg.evaluate(() => ({ sc: __zajka.scene.id, flags: __zajka.flags, items: __zajka.items, dlg: !!__zajka.dialog, ch: !!__zajka.choices, busy: __zajka.busy, panel: __zajka.panel, end: !!__zajka.endCard, pages: __zajka.pages, clues: __zajka.clues }));
  const shot = async (n) => { if (process.env.SHOTS) await pg.screenshot({ path: path.join(process.env.SHOTS, n + '.png') }); };
  // avance dialogues/cartes jusqu'a la condition ; choix : liste des index a prendre dans l'ordre (defaut 0)
  let picks = [];
  const until = async (fn, what) => {
    for (let i = 0; i < 300; i++) {
      const s = await st();
      if (fn(s)) return s;
      if (s.panel === 'map') await click(640, 360);
      else if (s.dlg) await click(640, 600);
      else if (s.ch) { const n = await pg.evaluate(() => __zajka.choices.opts.length); const k = picks.length ? picks.shift() : 0; await pg.evaluate(([k, n]) => { const r = __zajka.choiceRect(k, n); __zajka.click([r.x + 10, r.y + 10]); }, [k, n]); }
      await pg.waitForTimeout(40);
    }
    fail(what + ' ' + JSON.stringify(await st()));
  };
  const idle = (what) => until((s) => !s.busy && !s.dlg && !s.ch && !s.panel, what);
  const use = async (x, y, what) => { await idle('avant ' + what); await click(x, y); await idle(what); };
  const item = async (name, x, y, what) => { await idle('avant ' + what); await pg.evaluate((n) => { __zajka.selected = n; }, name); await click(x, y); await idle(what); };

  await idle('intro gare'); await shot('01_gare');
  await use(990, 430, 'automat sans mot');          // doit refuser (mot inconnu)
  let s = await st(); if (s.items.includes('listok')) fail('ticket sans avoir lu');
  await use(990, 220, 'nappis');
  picks = [1, 0];                                     // mauvais accord, puis bon
  await use(990, 430, 'automat'); s = await st(); if (!s.items.includes('listok')) fail('pas de ticket');
  await use(40, 300, 'sortie'); s = await st();
  if (s.sc !== 'tram') fail('pas dans le tram ' + s.sc);
  // tram : intro (mauvaise salutation puis bonne)
  picks = [1, 0]; await idle('tram intro'); await shot('02_tram');
  // la suite du tram est celle de l'apercu : on saute au controle via le flag (deja teste par aventure_test)
  await pg.evaluate(() => { __zajka.flags.checked = true; __zajka.flags.stamped = true; });
  picks = [1, 1];
  await use(120, 300, 'porte'); s = await st(); if (s.sc !== 'rue') fail('pas dans la rue ' + s.sc);
  await idle('quiz'); await shot('03_rue');
  await use(920, 520, 'pot bleu'); s = await st(); if (!s.items.includes('kluc')) fail('pas de cle');
  await use(1175, 400, 'portillon'); s = await st(); if (s.sc !== 'zahrada') fail('pas dans le jardin ' + s.sc);
  await idle('jardin'); await shot('04_jardin');
  await use(230, 230, 'corde'); if (!(await st()).items.includes('deka')) fail('pas de couverture');
  await use(640, 300, 'pommier lampe allumee'); s = await st(); if (s.sc !== 'zahrada' || s.flags.lampoff) fail('la tante aurait du crier');
  await idle('retour'); await use(1185, 350, 'interrupteur'); if (!(await st()).flags.lampoff) fail('lampe');
  picks = [0, 1]; await use(640, 300, 'dodo'); await idle('rano'); s = await st(); if (s.sc !== 'rano') fail('pas au matin ' + s.sc);
  await idle('matin'); await shot('05_rano'); if (!(await st()).items.includes('flasa')) fail('gourde');
  await use(1175, 400, 'parc'); s = await st(); if (s.sc !== 'jazierko') fail('etang ' + s.sc);
  await item('flasa', 900, 520, 'canard'); s = await st(); if (!s.clues.includes('kacka')) fail('indice canard');
  await shot('06_etang');
  await use(1175, 400, 'centre'); s = await st(); if (s.sc !== 'fontana') fail('fontaine ' + s.sc);
  await idle('fontaine'); await shot('07_fontaine');
  // jardinier : sujets (le mot "rebrik" doit etre connu d'abord : on regarde l'echelle)
  await use(100, 400, 'regarder echelle');
  await idle('x'); await click(860, 450); await until((q) => q.ch, 'menu sujets'); await shot('08_sujets');
  await pg.evaluate(() => { const c = __zajka.choices; const i = c.opts.findIndex((o) => /rebr/.test(o.sk)); const r = __zajka.choiceRect(i, c.opts.length); __zajka.click([r.x + 10, r.y + 10]); });
  await until((q) => q.ch, 'menu revient'); await pg.evaluate(() => { const c = __zajka.choices; const r = __zajka.choiceRect(c.opts.length - 1, c.opts.length); __zajka.click([r.x + 10, r.y + 10]); });
  await idle('echelle'); if (!(await st()).items.includes('rebrik')) fail('pas d echelle '+JSON.stringify(await st()));
  picks = []; await use(570, 450, 'fontaine'); s = await st(); if (!s.pages.includes('p1')) fail('pas de page');
  // cacher le carnet dans le sac
  const fx = await pg.evaluate(() => { const f = __zajka.sprites.find((q) => q.id === 'fox'); return [f.x, f.y - 200]; });
  await item('zapisnik', fx[0], fx[1], 'cacher'); 
  picks = [1, 0]; await idle('rencontre'); s = await st(); if (!s.flags.met_pan_done) fail('rencontre non finie ' + JSON.stringify(s.flags));
  await use(1175, 400, 'gare'); s = await st(); if (s.sc !== 'stanica') fail('gare ' + s.sc);
  await idle('stanica'); await shot('09_stanica');
  await use(610, 130, 'rozpis'); await use(220, 450, 'papier'); await use(1070, 470, 'pero');
  // combiner : selectionner pero puis cliquer dans l'inventaire sur papier
  await pg.evaluate(() => { __zajka.selected = 'pero'; const r = __zajka.slotRect(__zajka.items.indexOf('papier')); __zajka.click([r.x + 10, r.y + 10]); });
  await idle('combo'); s = await st(); if (!s.items.includes('mot')) fail('pas de mot ' + JSON.stringify(s.items));
  await item('mot', 1185, 340, 'schranka'); if (!(await st()).flags.mot_sent) fail('mot non poste');
  picks = [0]; await use(900, 480, 'guichet'); if (!(await st()).flags.tickets) fail('billets');
  await use(40, 400, 'quai'); await until((q) => q.end, 'fin');
  await shot('10_fin');
  if (errs.length) fail(errs.join(' | '));
  console.log('OK : prologue + chapitres 1 et 2 jouables'); await b.close(); srv.close();
})().catch((e) => { console.error(e); process.exit(1); });
