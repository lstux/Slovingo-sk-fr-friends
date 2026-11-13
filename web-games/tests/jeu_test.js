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
    for (let i = 0; i < 900; i++) {
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

  await pg.evaluate(() => { if (__zajka.scene.cine) __zajka.skipCine(); });   // l'ouverture a son propre test (intro_test.js)
  await idle('intro gare'); await shot('01_gare');
  // la gare v2 est plus large que l'ecran : on amene Gab pres de la chose, puis on clique a l'ecran (camera calee)
  const useW = async (wx, wy, what) => {
    await idle('avant ' + what);
    await pg.evaluate(async (x) => { await __zajka.walk('fox', x, 650); __zajka.cam = __zajka.camTarget(); }, wx);
    const cam = await pg.evaluate(() => __zajka.cam);
    await use(wx - cam, wy, what);
  };
  await useW(1457, 450, 'automat sans mot');          // ecriteau vu, mais le mot n'est pas encore compris
  let s = await st(); if (s.items.includes('listok')) fail('ticket sans les deux indices');
  if ((await pg.evaluate(() => !!__zajka.words['lístok']))) fail('lístok appris trop tot');
  await useW(1230, 360, 'affiche');                   // second indice : le mot est compris
  if (!(await pg.evaluate(() => !!__zajka.words['lístok']))) fail('lístok non appris apres les deux indices');
  picks = [0, 2, 1];                                  // jedna, jedno, puis jeden
  await useW(1457, 450, 'automat'); s = await st(); if (!s.items.includes('listok')) fail('pas de ticket');
  await useW(1950, 420, 'sortie'); s = await st();
  if (s.sc !== 'tram') fail('pas dans le tram ' + s.sc);
  // tram v2 : on monte par l'avant, Andrea est au fond (hors de l'ecran) ; on la decouvre en avancant
  await idle('tram intro'); await shot('02_tram');
  if ((await st()).flags.met) fail('Andrea rencontree avant d\'avancer');
  await pg.evaluate(async () => { await __zajka.walk('fox', 1300, 650); });
  picks = [1, 0]; await until((q) => q.flags.met && !q.busy && !q.dlg && !q.ch, 'rencontre avec Andrea'); await shot('02b_andrea');
  picks = [1];                                        // controle : « Tu je môj lístok »
  await pg.evaluate(() => { __zajka.selected = 'listok'; });
  await useW(1080, 330, 'composteur'); s = await st();
  if (!s.flags.stamped || !s.flags.checked) fail('ticket non valide ou controle non passe ' + JSON.stringify(s.flags));
  picks = [1, 1];                                     // quiz des ages dans la rue
  await useW(355, 360, 'porte'); s = await st(); if (s.sc !== 'rue') fail('pas dans la rue ' + s.sc);
  await idle('quiz'); await shot('03_rue');
  // rue v2 : « modrý » n'est pas traduit ; on le demande a Andrea, on souleve d'abord un mauvais pot (fausse piste)
  if (await pg.evaluate(() => !!__zajka.words['modrý'])) fail('modrý connu trop tot');
  picks = [0, 3];                                     // « Čo je modrý? », puis « Dovidenia »
  await pg.evaluate(async () => { const a = __zajka.sprites.find((q) => q.id === 'andrea'); await __zajka.walk('fox', a.x - 90, 640); __zajka.cam = __zajka.camTarget(); });
  await pg.evaluate(() => { const a = __zajka.sprites.find((q) => q.id === 'andrea'); __zajka.click([a.x - __zajka.cam, a.y - 60]); });
  await idle('Andrea explique modrý');
  if (!(await pg.evaluate(() => !!__zajka.words['modrý']))) fail('modrý non appris');
  await useW(1140, 440, 'pot rouge'); s = await st(); if (s.items.includes('kluc')) fail('cle sous le pot rouge ?!');
  await useW(1030, 560, 'paillasson'); s = await st(); if (s.items.includes('kluc')) fail('cle sous le paillasson ?!');
  await useW(1325, 440, 'pot bleu'); s = await st(); if (!s.items.includes('kluc')) fail('pas de cle');
  await useW(1655, 470, 'portillon'); s = await st(); if (s.sc !== 'zahrada') fail('pas dans le jardin ' + s.sc);
  await idle('jardin'); await shot('04_jardin');
  await useW(1760, 420, 'hamac (fausse piste)'); if ((await st()).sc !== 'zahrada') fail('hamac');
  await useW(820, 400, 'couverture'); if (!(await st()).items.includes('deka')) fail('pas de couverture');
  await useW(1040, 450, 'pommier lampe allumee'); s = await st(); if (s.sc !== 'zahrada' || s.flags.lampoff) fail('la tante aurait du crier');
  await idle('retour'); await useW(1935, 428, 'interrupteur'); if (!(await st()).flags.lampoff) fail('lampe');
  picks = [0, 1]; await useW(1040, 450, 'dodo'); await idle('rano'); s = await st(); if (s.sc !== 'rano') fail('pas au matin ' + s.sc);
  await idle('matin'); await shot('05_rano'); if (!(await st()).items.includes('flasa')) fail('gourde');
  await useW(1760, 420, 'hamac le matin'); await useW(120, 470, 'portillon vers le parc'); s = await st(); if (s.sc !== 'jazierko') fail('etang ' + s.sc);
  await useW(1080, 470, 'poteau de mesure'); await useW(400, 350, 'kiosque (fausse piste)');
  await pg.evaluate(async () => { await __zajka.walk('fox', 1180, 650); __zajka.cam = __zajka.camTarget(); });
  const duckAt = await pg.evaluate(() => { const k = __zajka.sprites.find((q) => q.id === 'kacka'); return [k.x - __zajka.cam, k.y - 40]; });
  await item('flasa', duckAt[0], duckAt[1], 'canard'); s = await st(); if (!s.clues.includes('kacka')) fail('indice canard');
  await shot('06_etang');
  await useW(2060, 460, 'centre'); s = await st(); if (s.sc !== 'fontana') fail('fontaine ' + s.sc);
  await idle('fontaine'); await shot('07_fontaine');
  // jardinier : sujets (le mot "rebrik" doit etre connu d'abord : on regarde l'echelle)
  await useW(135, 320, 'regarder echelle'); await useW(1270, 366, 'banc (fausse piste)'); await useW(1500, 300, 'panneau (fausse piste)');
  await idle('x'); const gz = await pg.evaluate(() => { const z = __zajka.sprites.find((q) => q.id === 'zahradnik'); return [z.x, z.y]; });
  await pg.evaluate(async (x) => { await __zajka.walk('fox', x + 120, 665); __zajka.cam = __zajka.camTarget(); }, gz[0]);
  const gcam = await pg.evaluate(() => __zajka.cam); await click(gz[0] - gcam, gz[1] - 150); await until((q) => q.ch, 'menu sujets'); await shot('08_sujets');
  await pg.evaluate(() => { const c = __zajka.choices; const i = c.opts.findIndex((o) => /rebr/.test(o.sk)); const r = __zajka.choiceRect(i, c.opts.length); __zajka.click([r.x + 10, r.y + 10]); });
  await until((q) => q.ch, 'menu revient'); await pg.evaluate(() => { const c = __zajka.choices; const r = __zajka.choiceRect(c.opts.length - 1, c.opts.length); __zajka.click([r.x + 10, r.y + 10]); });
  await idle('echelle'); if (!(await st()).items.includes('rebrik')) fail('pas d echelle '+JSON.stringify(await st()));
  picks = []; await useW(800, 330, 'fontaine'); s = await st(); if (!s.pages.includes('p1')) fail('pas de page'); await pg.evaluate(() => { const a = __zajka.sprites.find((q) => q.id === 'auto'); if (a) { a.hidden = false; a.x = 1950; a.y = 548; a.face = 1; } __zajka.camFocus = 1700; __zajka.cam = __zajka.camTarget(); }); await shot('07b_voiture'); await pg.evaluate(() => { const a = __zajka.sprites.find((q) => q.id === 'pan'); if (a) { a.hidden = false; a.x = 1500; a.y = 655; a.face = -1; } __zajka.camFocus = 1600; __zajka.cam = __zajka.camTarget(); }); await shot('07d_pan'); await pg.evaluate(() => { __zajka.camFocus = null; });
  // cacher le carnet dans le sac
  const fx = await pg.evaluate(() => { const f = __zajka.sprites.find((q) => q.id === 'fox'); return [f.x - __zajka.cam, f.y - 120]; });
  await item('zapisnik', fx[0], fx[1], 'cacher'); 
  picks = [1, 0]; await shot('07c_monsieur'); await idle('rencontre'); s = await st(); if (!s.flags.met_pan_done) fail('rencontre non finie ' + JSON.stringify(s.flags));
  await useW(2110, 280, 'gare'); s = await st(); if (s.sc !== 'stanica') fail('gare ' + s.sc);
  await idle('stanica'); await shot('09_stanica');
  // Gab se place a cote (dx) pour ne pas cacher la zone cliquee
  const nearW = async (wx, dx) => { await idle('marche'); await pg.evaluate(async (x) => { await __zajka.walk('fox', x, 655); __zajka.cam = __zajka.camTarget(); }, wx + dx); return pg.evaluate(() => __zajka.cam); };
  const useN = async (wx, wy, dx, what) => { const cam = await nearW(wx, dx); await use(wx - cam, wy, what); };
  const itemN = async (name, wx, wy, dx, what) => { const cam = await nearW(wx, dx); await item(name, wx - cam, wy, what); };
  await useN(530, 240, 260, 'rozpis'); await useN(180, 540, 150, 'papier'); await useN(1188, 450, 120, 'pero');
  await useN(190, 300, 160, 'affiche (fausse piste)'); await useN(1450, 380, 0, 'guichet ferme (fausse piste)');
  await pg.evaluate(() => { __zajka.selected = 'pero'; const r = __zajka.slotRect(__zajka.items.indexOf('papier')); __zajka.click([r.x + 10, r.y + 10]); });
  await idle('combo'); s = await st(); if (!s.items.includes('mot')) fail('pas de mot ' + JSON.stringify(s.items));
  await itemN('mot', 1706, 440, -140, 'schranka'); if (!(await st()).flags.mot_sent) fail('mot non poste');
  picks = [0]; await useN(1030, 420, -200, 'guichet'); if (!(await st()).flags.tickets) fail('billets');
  await shot('09b_guichet');
  await useN(1930, 330, 0, 'quai'); await until((q) => q.sc === 'raj' && !q.dlg && !q.busy && !q.panel, 'foret'); await shot('10_raj_arrivee');
  // chapitre 3 : foret silencieuse -> ruisseau (Andrea ne veut pas parler avant qu'on ait bu)
  await pg.evaluate(async () => { await __zajka.walk('fox', 800, 650); });
  await until((q) => q.flags.raj2 && !q.dlg && !q.busy, 'foret silencieuse'); await shot('10b_raj_ticho');
  await useN(1500, 450, -150, 'andrea avant de boire'); if ((await st()).flags.raj3) fail('Andrea parle avant la boisson');
  await useN(1200, 420, -150, 'champignons'); await useN(850, 440, -120, 'pnik (fausse piste)'); await useN(650, 380, -150, 'tronc (fausse piste)');
  await useN(1900, 450, -150, 'potok'); s = await st(); if (!s.flags.drank) fail('pas bu'); await shot('10c_raj_potok');
  await pg.evaluate(async () => { const a = __zajka.words; if (!a['vpravo']) throw new Error('vpravo non appris'); });
  await useN(1480, 450, -150, 'andrea apres'); s = await st(); if (!s.flags.raj3) fail('pas de discussion');
  await useN(2100, 450, -150, 'roklina'); await until((q) => q.sc === 'rokle' && !q.dlg && !q.busy && q.flags.rk_ready, 'gorge : intro + Andrea passe');
  await shot('11_rokle');
  // clic sur un element du decor, camera calee dessus
  const clickWorld = async (wx, wy, what) => {
    await idle('avant ' + what);
    await pg.evaluate((x) => { __zajka.cam = Math.max(0, Math.min(2160 - 1280, x - 640)); }, wx);
    const cam = await pg.evaluate(() => __zajka.cam);
    await click(wx - cam, wy); await idle(what);
  };
  await clickWorld(1065, 300, 'rebrik3 trop tot'); if ((await st()).flags.rk_step) fail('rebrik3 ne doit pas lancer le trajet');
  await clickWorld(900, 360, 'most trop tot'); if ((await st()).flags.rk_step) fail('pont avant echelle');
  await clickWorld(390, 450, 'rebrik1'); s = await st(); if (s.flags.rk_step !== 1) fail('echelle 1 sans effet ' + JSON.stringify(s.flags));
  await clickWorld(1640, 500, 'rebrik2 trop tot'); if ((await st()).flags.rk_step !== 1) fail('echelle 2 trop tot');
  await clickWorld(1065, 300, 'impasse'); await shot('11b_rokle_impasse');
  await clickWorld(900, 360, 'most'); s = await st(); if (s.flags.rk_step !== 2) fail('pont sans effet ' + JSON.stringify(s.flags));
  await shot('11c_rokle_pont');
  await clickWorld(1640, 500, 'rebrik2'); await until((q) => q.sc === 'orol' && !q.dlg && !q.busy && q.flags.or0, 'rocher de pan Orol');
  for (const w of ['hore', 'doprava', 'dole']) if (!(await pg.evaluate((w) => !!__zajka.words[w], w))) fail(w + ' non appris');
  await shot('11d_orol');
  await pg.waitForTimeout(1500);   // la camera revient sur Gab
  picks = [0, 1];                   // d'abord le tutoiement (refuse), puis « videli ste »
  await clickWorld(1800, 140, 'pan Orol'); await until((q) => q.end, 'fin');
  s = await st(); if (!s.pages.includes('p2')) fail('page du carnet non donnee');
  if (!(await pg.evaluate(() => !!__zajka.words['videli ste']))) fail('videli ste non appris');
  await shot('11e_fin');
  if (errs.length) fail(errs.join(' | '));
  console.log('OK : prologue + chapitres 1 a 3 (jusqu\'au rocher de pan Orol) jouables'); await b.close(); srv.close();
})().catch((e) => { console.error(e); process.exit(1); });
