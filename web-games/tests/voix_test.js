// Teste la synthese vocale du jeu avec une fausse speechSynthesis (aucune vraie voix dans Chromium headless).
//   node web-games/tests/voix_test.js
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
  const avec = async (voices) => {
    const pg = await b.newPage({ viewport: { width: 1280, height: 800 } });
    const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
    await pg.addInitScript((voices) => {
      window.__said = [];
      const ss = { getVoices: () => voices, cancel() { window.__said.push('cancel'); }, speak(u) { window.__said.push({ t: u.text, lang: u.lang, pitch: u.pitch, rate: u.rate, v: u.voice && u.voice.name }); }, addEventListener() {} };
      Object.defineProperty(window, 'speechSynthesis', { value: ss });
      window.SpeechSynthesisUtterance = function (t) { this.text = t; };
    }, voices);
    await pg.goto(`http://localhost:${port}/aventure/jeu.html`);
    await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
    await pg.evaluate(() => { localStorage.clear(); });
    await pg.reload(); await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
    await pg.evaluate(() => { if (__zajka.scene.cine) __zajka.skipCine(); });
    return { pg, errs };
  };
  // 1. voix slovaque presente : dialogue lu avec le bon profil, bouton, mots, coupure
  let { pg, errs } = await avec([{ name: 'Filip', lang: 'sk-SK' }, { name: 'Other', lang: 'en-US' }]);
  if ((await pg.textContent('#voice')) !== 'Voix : oui') fail('bouton ' + await pg.textContent('#voice'));
  await pg.evaluate(() => { window.__said.length = 0; __zajka.say('andrea', 'Ahoj, Gab!', 'Salut, Gab !', [['ahoj', 'salut']]); });
  let said = await pg.evaluate(() => window.__said.filter((x) => x !== 'cancel'));
  if (!said.length || said[0].t !== 'Ahoj, Gab!' || said[0].lang !== 'sk-SK' || said[0].v !== 'Filip' || !(said[0].pitch > 1.2)) fail('dialogue ' + JSON.stringify(said));
  await pg.evaluate(() => { __zajka.advance(); __zajka.advance(); });
  if (!(await pg.evaluate(() => window.__said.includes('cancel')))) fail('pas de coupure');
  await pg.evaluate(() => { window.__said.length = 0; __zajka.panel = 'words'; __zajka.words = { voda: 'eau' }; __zajka.click([100, 150]); });
  said = await pg.evaluate(() => window.__said.filter((x) => x !== 'cancel'));
  if (!said.length || said[0].t !== 'voda' || (await pg.evaluate(() => __zajka.panel)) !== 'words') fail('mot ' + JSON.stringify(said));
  await pg.evaluate(() => { __zajka.click([100, 600]); });
  if ((await pg.evaluate(() => __zajka.panel)) !== null) fail('le panneau ne se ferme pas');
  await pg.click('#voice'); if ((await pg.textContent('#voice')) !== 'Voix : non') fail('bascule');
  await pg.evaluate(() => { window.__said.length = 0; __zajka.say('fox', 'Dobrý deň.', 'Bonjour.'); });
  if ((await pg.evaluate(() => window.__said.filter((x) => x !== 'cancel'))).length) fail('parle alors que coupe');
  await pg.reload(); await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  if ((await pg.textContent('#voice')) !== 'Voix : non') fail('reglage non retenu');
  if (errs.length) fail(errs.join(' | '));
  await pg.close();
  // 2. aucune voix slovaque : bouton grise, aucun appel, jeu normal
  ({ pg, errs } = await avec([{ name: 'Other', lang: 'en-US' }]));
  if ((await pg.textContent('#voice')) !== 'Voix : indisponible' || !(await pg.isDisabled('#voice'))) fail('sans voix : ' + await pg.textContent('#voice'));
  await pg.evaluate(() => { __zajka.say('fox', 'Ahoj.', 'Salut.'); });
  if ((await pg.evaluate(() => window.__said.filter((x) => x !== 'cancel'))).length) fail('parle sans voix');
  if (errs.length) fail(errs.join(' | '));
  console.log('OK : synthese vocale'); await b.close(); srv.close();
})().catch((e) => { console.error(e); process.exit(1); });
