// Joue la scene du tram dans Chromium : intro, ticket sur le composteur, controle (mauvaise puis bonne reponse),
// sortie par la porte ; puis le cas de l'amende (ticket jamais valide). Verifie qu'il n'y a aucune erreur.
//   node web-games/tests/aventure_test.js
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const mt = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const srv = http.createServer((q, r) => {
  let p = path.join(root, decodeURIComponent(q.url.split('?')[0]));
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p += '/index.html';
  fs.readFile(p, (e, d) => { if (e) { r.statusCode = 404; r.end(); } else { r.setHeader('Content-Type', mt[path.extname(p)] || 'application/octet-stream'); r.end(d); } });
}).listen(0);
(async () => {
  const port = srv.address().port, b = await chromium.launch();
  const fail = (m) => { console.error('ECHEC :', m); process.exit(1); };
  async function open() {
    const pg = await b.newPage({ viewport: { width: 1100, height: 700 } });
    const errs = [];
    pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errs.push(m.text()); });
    await pg.goto(`http://localhost:${port}/aventure/index.html`);
    await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
    pg.errs = errs;
    pg.click_ = async (x, y) => { const r = await pg.locator('#screen').boundingBox(); await pg.mouse.click(r.x + (x / 1280) * r.width, r.y + (y / 720) * r.height); };
    pg.st = () => pg.evaluate(() => ({ flags: __zajka.flags, items: __zajka.items, dlg: !!__zajka.dialog, ch: !!__zajka.choices, busy: __zajka.busy, end: !!__zajka.endCard }));
    pg.until = async (fn, what) => {   // avance les dialogues jusqu'a ce que la condition soit vraie
      for (let i = 0; i < 80; i++) {
        const s = await pg.st();
        if (fn(s)) return s;
        if (s.dlg) await pg.click_(640, 600);   // (le dialogue est en haut, mais un clic n'importe ou le fait avancer)
        await pg.waitForTimeout(120);
      }
      fail(what);
    };
    return pg;
  }
  // --- parcours reussi
  let pg = await open();
  await pg.until((s) => !s.busy && s.flags.intro, 'intro');
  await pg.click_(1232, 46);                       // choisir le ticket
  await pg.click_(355, 290);                       // sur le composteur
  await pg.until((s) => s.ch, 'choix du controleur');
  // clique la reponse dont le texte correspond (les choix sont en haut de l'ecran : choiceRect)
  const pick = async (re) => { const r = await pg.evaluate((re) => { const c = __zajka.choices, i = c.opts.findIndex((o) => new RegExp(re).test(o.sk)); return __zajka.choiceRect(i, c.opts.length); }, re); await pg.click_(r.x + r.w / 2, r.y + r.h / 2); };
  await pick('^(?!Tu je)');                        // mauvaise reponse
  await pg.until((s) => s.ch, 'la question revient');
  await pick('Tu je');                             // bonne reponse (« Tu je môj lístok »)
  await pg.until((s) => s.flags.checked && !s.busy, 'controle passe');
  let s = await pg.st();
  if (!s.items.includes('listok_ok') || s.items.includes('listok')) fail('le ticket aurait du etre valide : ' + JSON.stringify(s.items));
  await pg.click_(120, 300);                       // la porte
  await pg.until((q) => q.end, 'fin de l\'apercu');
  if (pg.errs.length) fail(pg.errs.join(' | '));
  // sauvegarde : on recharge, la partie est reprise (ticket valide, controle fait)
  await pg.reload();
  await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  s = await pg.st();
  if (!s.flags.checked || !s.items.includes('listok_ok')) fail('sauvegarde non reprise : ' + JSON.stringify(s));
  await pg.close();
  // --- l'amende : le ticket n'est jamais valide
  pg = await open();
  await pg.until((q) => !q.busy && q.flags.intro, 'intro 2');
  await pg.evaluate(() => { __zajka.sceneTime = 49.9; });
  await pg.until((q) => q.dlg, 'le controleur arrive');
  const seen = [];
  for (let i = 0; i < 40; i++) {
    const t = await pg.evaluate(() => __zajka.dialog && __zajka.dialog.sk);
    if (t && !seen.includes(t)) seen.push(t);
    if (t) await pg.click_(640, 600);
    await pg.waitForTimeout(150);
  }
  if (!seen.some((t) => t.includes('pokuta'))) fail('pas d\'amende : ' + JSON.stringify(seen));
  if (pg.errs.length) fail(pg.errs.join(' | '));
  console.log('aventure : parcours complet, sauvegarde et amende ok');
  await b.close(); srv.close();
})();
