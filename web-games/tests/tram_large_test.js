// Essai du grand tram (decor 3:1, camera qui suit le renard) : jeu.html?large=1
//   node web-games/tests/tram_large_test.js   (captures dans $SHOTS si defini)
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
  await pg.goto(`http://localhost:${port}/aventure/jeu.html?large=1`);
  await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  await pg.evaluate(() => localStorage.clear());
  await pg.goto(`http://localhost:${port}/aventure/jeu.html?large=1`);
  await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  const g = (fn, arg) => pg.evaluate(fn, arg);
  const shot = async (n) => { if (process.env.SHOTS) await pg.screenshot({ path: path.join(process.env.SHOTS, n + '.png') }); };
  const st = () => g(() => ({ sc: __zajka.scene.id, flags: __zajka.flags, items: __zajka.items, dlg: !!__zajka.dialog, ch: !!__zajka.choices, busy: __zajka.busy, panel: __zajka.panel, cam: __zajka.cam, fx: __zajka.sprites.find((s) => s.id === 'fox').x, rev: (__zajka.sprites.find((s) => s.id === 'revizor') || {}).x }));
  let picks = [];
  const until = async (fn, what) => {
    for (let i = 0; i < 400; i++) {
      const s = await st();
      if (fn(s)) return s;
      if (s.dlg) await pg.evaluate(() => __zajka.advance());
      else if (s.ch) { const k = picks.length ? picks.shift() : 0; await pg.evaluate((k) => { const c = __zajka.choices; c.resolve(k); __zajka.choices = null; }, k); }
      await pg.waitForTimeout(40);
    }
    fail(what + ' ' + JSON.stringify(await st()));
  };
  const idle = (w) => until((s) => !s.busy && !s.dlg && !s.ch && !s.panel, w);
  // clic ecran -> le moteur convertit avec la camera
  const click = (x, y) => g(([x, y]) => __zajka.click([x, y]), [x, y]);
  const worldToScreen = async (wx, wy) => { const cam = (await st()).cam; return [wx - cam, wy]; };

  await idle('intro gare');   // l'histoire de la gare doit etre finie avant de changer de scene
  // on entre directement dans le tram, comme venant de la gare
  await g(() => { __zajka.items = ['listok']; __zajka.enter('tram'); });
  picks = [1, 0];            // mauvaise salutation, puis bonne
  await idle('intro tram');
  let s = await st();
  if (s.sc !== 'tram') fail('scene ' + s.sc);
  const ww = await g(() => __zajka.scene.worldW);
  if (ww !== 2160) fail('worldW ' + ww);
  if (s.cam < 0 || s.cam > ww - 1280) fail('camera hors bornes ' + s.cam);
  await shot('tram_large_1_debut');

  // 1. la camera suit le renard : on l'envoie tout a droite
  let p = await worldToScreen(1700, 650); await click(Math.min(1260, p[0]), p[1]); await idle('marche');
  // clique dans la partie visible jusqu'a atteindre x >= 1500
  for (let i = 0; i < 6 && (await st()).fx < 1500; i++) { const c = (await st()).cam; await click(1200, 650); await idle('marche'); }
  s = await st(); if (s.fx < 1400) fail('le renard n\'a pas traverse le wagon : x=' + s.fx);
  if (s.cam < 700) fail('la camera ne suit pas : cam=' + s.cam + ' fx=' + s.fx);
  await g(() => { __zajka.cam = __zajka.camTarget(); });
  await shot('tram_large_2_droite');

  // 2. zones : un clic ecran doit toucher la zone du bon endroit du monde (cam > 0)
  const hs = await g(() => { const c = __zajka.cam; const h = __zajka.hotspotAt([1080, 330]); return h && h.id; });
  if (hs !== 'validator') fail('zone du composteur introuvable a (1080,330) : ' + hs);
  const hsScreen = await g(() => { const c = __zajka.cam; __zajka.mouse = [1080 - c, 330]; __zajka.update(0.016); return __zajka.hover && __zajka.hover.id; });
  if (hsScreen !== 'validator') fail('survol du composteur a l\'ecran : ' + hsScreen + ' cam=' + (await st()).cam);

  // 3. valider le ticket au composteur -> le controleur entre par la droite et s'arrete pres du composteur
  await g(() => { __zajka.selected = 'listok'; });
  p = await worldToScreen(1080, 330); await click(p[0], p[1]);
  await until((x) => x.flags.stamped, 'ticket valide');
  s = await st(); if (!s.items.includes('listok_ok')) fail('pas de ticket valide');
  await until((x) => x.dlg && x.rev !== undefined, 'controleur'); await shot('tram_large_3_controleur');
  if (!(await st()).rev || (await st()).rev < 1250) fail('le controleur n\'est pas arrive pres du composteur : ' + (await st()).rev);
  picks = [1];
  await idle('controle'); s = await st(); if (!s.flags.checked) fail('controle non passe');

  // 4. sortie par les portes de gauche : le renard y va, la camera revient a gauche
  await g(() => { const f = __zajka.sprites.find((q) => q.id === 'fox'); }); 
  p = await worldToScreen(350, 360); // porte a gauche (hors ecran, on fait avancer le renard d'abord)
  await g(() => { __zajka.walk('fox', 360, 650); });
  await until((x) => x.fx < 400, 'retour a gauche'); await g(() => { __zajka.cam = __zajka.camTarget(); });
  s = await st(); if (s.cam > 5) fail('la camera n\'est pas revenue a gauche : ' + s.cam);
  p = await worldToScreen(355, 360); await click(p[0], p[1]);
  await until((x) => x.sc === 'rue', 'porte');
  s = await st(); if (s.sc !== 'rue') fail('pas dans la rue : ' + s.sc);
  await g(() => { __zajka.choices = null; });   // la rue commence par un quiz : hors sujet ici

  // 5. une scene normale garde la camera a 0
  await pg.waitForTimeout(300);
  if ((await st()).cam !== 0) fail('camera non nulle dans une scene normale : ' + (await st()).cam);
  if (errs.length) fail('erreurs JS : ' + errs.join(' | '));
  await b.close(); srv.close();
  console.log('OK : grand tram (camera, zones, composteur, controleur, sortie)');
})().catch((e) => { console.error(e); process.exit(1); });
