// Joue Zajko Quest v2 « Circuit fermé » (prologue + chapitres 1 et 2) dans Chromium en pilotant le moteur par clics canvas.
//   node web-games/tests/jeu_v2_test.js   (captures dans $SHOTS si defini)
// Conception : docs/Jeu-conception-v2.md (monnaie au kiosque, cabas de la babicka, chat sur le pot bleu, gravier, tableau d'enquete).
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const mt = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp' };
const srv = http.createServer((q, r) => {
  const p = path.join(root, decodeURIComponent(q.url.split('?')[0]));
  fs.readFile(p, (e, d) => { if (e) { r.statusCode = 404; r.end(); } else { r.setHeader('Content-Type', mt[path.extname(p)] || 'application/octet-stream'); r.end(d); } });
}).listen(0);
(async () => {
  const port = srv.address().port, b = await chromium.launch({ executablePath: process.env.CHROME || undefined });
  const fail = async (m) => { console.error('ECHEC :', m); await shot('zz_echec'); process.exit(1); };
  const pg = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errs = [];
  pg.on('pageerror', (e) => errs.push(e.message)); pg.on('console', (m) => { if (m.type() === 'error' && !/404/.test(m.text())) errs.push(m.text()); });
  const missing = []; pg.on('response', (r) => { if (r.status() === 404 && !/\/audio\//.test(r.url())) missing.push(r.url()); });   // les sons pas encore trouves sont ignores
  await pg.goto(`http://localhost:${port}/aventure/jeu.html`);
  await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  await pg.evaluate(() => localStorage.clear());
  await pg.reload(); await pg.waitForFunction(() => window.__zajka && window.__zajka.scene);
  const click = (x, y) => pg.evaluate(([x, y]) => __zajka.click([x, y]), [x, y]);
  const st = () => pg.evaluate(() => ({ sc: __zajka.scene.id, flags: __zajka.flags, items: __zajka.items, dlg: !!__zajka.dialog, ch: !!__zajka.choices, busy: __zajka.busy, panel: __zajka.panel, end: !!__zajka.endCard, cards: __zajka.cards, q: !!__zajka.boardQ, sel: __zajka.boardSel.length }));
  var shot = async (n) => { if (process.env.SHOTS) await pg.screenshot({ path: path.join(process.env.SHOTS, n + '.png') }); };
  let picks = [];
  const until = async (fn, what) => {
    for (let i = 0; i < 1500; i++) {
      const s = await st();
      if (fn(s)) return s;
      if (s.panel === 'map') await click(640, 360);
      else if (s.dlg) await click(640, 600);
      else if (s.ch) { const n = await pg.evaluate(() => __zajka.choices.opts.length); const k = picks.length ? picks.shift() : 0; await pg.evaluate(([k, n]) => { const r = __zajka.choiceRect(k, n); __zajka.click([r.x + 10, r.y + 10]); }, [k, n]); }
      await pg.waitForTimeout(30);
    }
    await fail(what + ' ' + JSON.stringify(await st()));
  };
  const idle = (what) => until((s) => !s.busy && !s.dlg && !s.ch && !s.panel, what);
  // le decor est plus large que l'ecran : on amene Gab pres de la chose, puis on clique a l'ecran (camera calee)
  const near = async (wx) => { await pg.evaluate(async (x) => { await __zajka.walk('fox', x, 650); __zajka.cam = __zajka.camTarget(); }, wx); return pg.evaluate(() => __zajka.cam); };
  const useW = async (wx, wy, what, gx) => { await idle('avant ' + what); const cam = await near(gx === undefined ? wx : gx); await click(wx - cam, wy); await idle(what); };
  const itemW = async (name, wx, wy, what, gx) => { await idle('avant ' + what); const cam = await near(gx === undefined ? wx : gx); await pg.evaluate((n) => { __zajka.selected = n; }, name); await click(wx - cam, wy); await idle(what); };
  const has = async (it) => (await st()).items.includes(it);

  // ---------------------------------------------------------------- prologue : la gare
  await pg.evaluate(() => { if (__zajka.scene.cine) __zajka.skipCine(); });
  await idle('intro gare');
  if (!(await has('bankovka'))) await fail('pas de billet de 20 € au depart');
  await pg.evaluate(() => { __zajka.cam = 300; }); await pg.waitForTimeout(1200); await shot('01_gare_kiosque');
  await useW(1457, 450, 'automat sans mot');
  await useW(1230, 360, 'affiche');
  picks = [1];
  await useW(1457, 450, 'automat sans monnaie');
  let s = await st(); if (s.items.includes('listok')) await fail('ticket sans monnaie');
  if (!s.flags.need_coins) await fail('le distributeur n\'a pas demande de pieces');
  await itemW('bankovka', 230, 450, 'photomaton (fausse piste)', 400);
  if (await has('drobne')) await fail('le photomaton a rendu la monnaie ?!');
  picks = [3, 1, 2];                                  // un ticket (plus de tickets au kiosque), le chocolat (refuse : il fond), puis l'eau
  await useW(700, 440, 'kiosque');
  s = await st(); if (!s.items.includes('flasa') || !s.items.includes('drobne') || s.items.includes('bankovka')) await fail('achat de l\'eau rate ' + s.items);
  await useW(1457, 450, 'automat avec monnaie'); if (!(await has('listok'))) await fail('pas de ticket');
  await useW(1950, 420, 'sortie'); s = await st(); if (s.sc !== 'tram') await fail('pas dans le tram ' + s.sc);

  // ---------------------------------------------------------------- chapitre 1 : le tram
  await idle('tram intro');
  await pg.evaluate(async () => { await __zajka.walk('fox', 1300, 650); });
  picks = [1, 0]; await until((q) => q.flags.met && !q.busy && !q.dlg && !q.ch, 'rencontre avec Andrea');
  if (!(await st()).cards.includes('kniha')) await fail('indice du livre absent');
  await shot('02_tram_babka');
  await itemW('listok', 1080, 330, 'composteur en panne', 990);
  if ((await st()).flags.stamped) await fail('le composteur de l\'avant a marche');
  // vers le fond : le cabas arrete Gab
  await idle('avant cabas'); await pg.evaluate(() => { __zajka.cam = __zajka.camTarget(); });
  await pg.evaluate(() => __zajka.click([1700 - __zajka.cam, 660]));
  await idle('cabas'); s = await st();
  const fx = await pg.evaluate(() => __zajka.sprites.find((q) => q.id === 'fox').x);
  if (fx > 1480) await fail('Gab est passe a travers le cabas : x=' + fx);
  picks = [1]; await useW(1560, 470, 'babka (sans ticket)', 1420);
  await useW(1085, 607, 'papier sous la chaussure', 1040);
  if (await has('listok_babka')) await fail('ticket ramasse sous la chaussure sans rien demander');
  picks = [1, 2, 1];                                  // lui taper sur l'epaule, « Kde je električka? », puis « Zdvihni nohu »
  await useW(1120, 470, 'le garcon au casque', 1040);
  if (!(await has('listok_babka'))) await fail('ticket de la babka non obtenu');
  await itemW('listok_babka', 1560, 470, 'donner le ticket a la babka', 1420);
  if (!(await st()).flags.babka_ok) await fail('la babka ne bouge pas');
  picks = [3, 1];                                     // controle : « Nerozumiem, som Francúz » (ne marche pas), puis « Tu je môj lístok »
  await itemW('listok', 1945, 330, 'composteur du fond', 1880);
  s = await st(); if (!s.flags.stamped || !s.flags.checked) await fail('ticket non valide ou controle non passe ' + JSON.stringify(s.flags));
  await useW(900, 280, 'fenetre cathedrale');
  picks = [1, 1];
  await useW(355, 360, 'porte'); s = await st(); if (s.sc !== 'rue') await fail('pas dans la rue ' + s.sc);
  if (!s.cards.includes('zastavka')) await fail('indice « tu descends ici » absent');

  // ---------------------------------------------------------------- la rue : le chat sur le pot bleu
  await idle('quiz');
  await useW(1140, 450, 'pot rouge avant de savoir modrý');
  if ((await st()).flags.pot_cerveny) await fail('pot souleve au hasard');
  picks = [0, 3];
  await pg.evaluate(async () => { const a = __zajka.sprites.find((q) => q.id === 'andrea'); await __zajka.walk('fox', a.x - 90, 640); __zajka.cam = __zajka.camTarget(); });
  await pg.evaluate(() => { const a = __zajka.sprites.find((q) => q.id === 'andrea'); __zajka.click([a.x - __zajka.cam, a.y - 60]); });
  await idle('Andrea explique modrý');
  await useW(1325, 470, 'pot bleu (le chat dort dessus)');
  if (await has('kluc')) await fail('cle prise sous le chat ?!');
  await pg.evaluate(() => { __zajka.cam = 700; }); await pg.waitForTimeout(300); await shot('03_rue_chat');
  await itemW('flasa', 1520, 588, 'eau dans la gamelle', 1420);
  if (!(await st()).flags.macka_pije) await fail('le chat ne boit pas');
  await pg.evaluate(() => { __zajka.cam = 900; }); await pg.waitForTimeout(300); await shot('03b_rue_chat_boit');
  await useW(1325, 470, 'pot bleu'); if (!(await has('kluc'))) await fail('pas de cle');
  await useW(1655, 470, 'portillon'); s = await st(); if (s.sc !== 'zahrada') await fail('pas dans le jardin ' + s.sc);

  // ---------------------------------------------------------------- le jardin : gravier, pierres plates, fenetre, tableau
  await idle('jardin');
  await useW(820, 410, 'couverture');
  await useW(1600, 400, 'la lampe (detecteur)', 1440);
  if (!(await st()).flags.senzor_seen) await fail('detecteur non vu');
  // le gravier crisse si on va droit au hamac
  await useW(1760, 420, 'hamac par le gravier', 1400);
  if (await has('uterak')) await fail('serviette prise en passant par le gravier');
  await pg.evaluate(() => { __zajka.cam = 880; }); await pg.waitForTimeout(300); await shot('04_jardin');
  await useW(1740, 650, 'pierres plates', 1440);
  await useW(1760, 420, 'hamac', 1830);
  if (!(await has('uterak'))) await fail('pas de serviette');
  await useW(1480, 510, 'la brouette', 1440);
  if (!(await st()).flags.lampoff) await fail('lampe toujours allumee');
  await pg.evaluate(() => { __zajka.cam = 880; }); await pg.waitForTimeout(300); await shot('04b_jardin_lampe');
  picks = [0];
  await idle('avant pommier'); { const cam = await near(1040); await click(1040 - cam, 300); }
  await until((q) => q.panel === 'board' && q.q && !q.dlg, 'question du tableau');
  await pg.waitForTimeout(400); await shot('05_tableau');
  // une mauvaise paire d'abord (fontaine + livre), puis la bonne
  const pickCards = async (a, b2) => {
    for (const id of [a, b2]) {
      await pg.evaluate((id) => { const r = __zajka.boardCardRects().find((q) => q.id === id); __zajka.click([r.x + r.w / 2, r.y + r.h / 2]); }, id);
      await pg.waitForTimeout(80);
    }
  };
  await pickCards('fontana', 'kniha');
  await until((q) => !q.dlg && q.sel === 0, 'reponse fausse');
  if ((await st()).panel !== 'board') await fail('le tableau s\'est ferme sur une mauvaise reponse');
  await pickCards('zastavka', 'telefon');

  // ---------------------------------------------------------------- chapitre 2 : le jardin du matin, les photos
  const SHOWN = [2, 4, 0, 3, 1];
  const photo = (k) => pg.evaluate((j) => __zajka.click([150 + j * 200 + 90, 200 + 110]), SHOWN.indexOf(k));
  picks = [1];                                        // « Hovoria veľa o vode »
  await until((q) => q.sc === 'rano' && q.panel === 'custom' && !q.dlg, 'photos du telephone');
  await pg.waitForTimeout(300); await shot('07_photos');
  for (const k of [1, 0, 2, 3, 4]) { await photo(k); await pg.waitForTimeout(60); }      // mauvais ordre : Andrea aide
  await until((q) => q.panel === 'custom' && !q.dlg && !q.busy === false, 'indice des photos');
  await until((q) => !q.dlg, 'fin indice');
  for (const k of [0, 1, 2, 3, 4]) { await photo(k); await pg.waitForTimeout(60); }
  await idle('apres les photos');
  if (!(await st()).cards.includes('fotky')) await fail('indice des photos absent');
  await useW(120, 480, 'portillon sans eau');
  if ((await st()).sc !== 'rano') await fail('parti sans eau');
  await useW(430, 530, 'arrosoir'); if (!(await has('rucka'))) await fail('pas de poignee');
  await itemW('flasa_prazdna', 1800, 580, 'bouteille sans poignee', 1760);
  if (await has('flasa')) await fail('eau sans poignee ?!');
  await itemW('rucka', 1800, 580, 'poignee sur le robinet', 1760);
  await itemW('flasa_prazdna', 1800, 580, 'remplir la bouteille', 1760);
  if (!(await has('flasa'))) await fail('bouteille non remplie');
  await pg.evaluate(() => { __zajka.cam = 880; }); await pg.waitForTimeout(300); await shot('08_rano');
  await useW(120, 480, 'portillon'); if ((await st()).sc !== 'urad') await fail('pas au bureau');

  // ---------------------------------------------------------------- le bureau : file d'attente, dame, dossier, stylo
  await idle('bureau');
  await useW(1300, 400, 'guichet sans ticket'); if ((await st()).flags.dossier_found) await fail('dossier sans ticket');
  await useW(455, 480, 'borne'); if (!(await has('cislo'))) await fail('pas de ticket d\'attente');
  await useW(1300, 400, 'guichet trop tot');
  await pg.evaluate(() => { __zajka.cam = 300; }); await pg.waitForTimeout(300); await shot('09_bureau');
  await until((q) => q.flags.q_cur === q.flags.q_mine && !q.dlg && !q.busy, 'mon numero appele');
  picks = [1, 1, 1];
  await idle('avant guichet a mon tour'); { const cam = await near(1300); await click(1300 - cam, 400); }
  await until((q) => q.panel === 'custom' && !q.dlg, 'dossier ouvert');
  await pg.waitForTimeout(200); await shot('10_dossier');
  const btnD = (i) => pg.evaluate((i) => __zajka.click([190 + i * 160 + 70, 630]), i);
  for (const i of [3, 3, 5, 5, 5, 4, 2]) { await btnD(i); await pg.waitForTimeout(40); }   // +1 +1 (sommaire, p. 3), +100 x3, +10, -1 : page 312 en 7 gestes
  if ((await pg.evaluate(() => __zajka.custom && __zajka.custom.st.page)) !== 312) await fail('pas a la page 312');
  await shot('11_page312');
  await pg.evaluate(() => __zajka.click([300, 250 + (__zajka.showFr ? 50 : 38) + 10]));
  await idle('dossier lu'); if (!(await st()).flags.dossier_found) await fail('consommation non trouvee');
  picks = [3]; await useW(640, 520, 'castor (voda)', 700); if (!(await has('pero'))) await fail('pas de stylo');
  await pg.evaluate(() => { __zajka.selected = 'pero'; const i = __zajka.items.indexOf('listok_ok'); const r = __zajka.slotRect(i); __zajka.click([r.x + 10, r.y + 10]); });
  await idle('combinaison stylo + ticket'); if (!(await has('listok_0l'))) await fail('piece n°1 absente');
  await useW(140, 400, 'sortie du bureau', 200); if ((await st()).sc !== 'namestie') await fail('pas sur la place');

  // ---------------------------------------------------------------- la place : se cacher du monsieur au sourire
  await idle('place');
  await pg.evaluate(() => { __zajka.cam = 900; }); await pg.waitForTimeout(400); await shot('12_place');
  // vu en traversant pendant qu'il regarde
  await pg.evaluate(() => { const p = __zajka.sprites.find((q) => q.id === 'pan'); p.alt = null; p.pose = 'watch'; });
  await pg.evaluate(() => __zajka.walk('fox', 900, 660));
  await until((q) => !q.dlg && !q.busy && q.flags.hid !== true, 'vu par le monsieur');
  const fx2 = await pg.evaluate(() => __zajka.sprites.find((q) => q.id === 'fox').x);
  if (fx2 < 1300) await fail('pas renvoye a la porte apres avoir ete vu : x=' + fx2);
  await pg.evaluate(() => { const p = __zajka.sprites.find((q) => q.id === 'pan'); p.pose = null; });
  await pg.evaluate(() => __zajka.walk('fox', 500, 665));
  await until((q) => q.panel === 'board' && q.q && !q.dlg, 'question du tableau (ch2)');
  await pg.waitForTimeout(300); await shot('13_tableau2');
  await pickCards('permis', 'fotky');
  await until((q) => q.sc === 'raj', 'fin du chapitre 2 : en route pour le chapitre 3');
  await shot('06_fin');   // la suite : web-games/tests/jeu_ch3_test.js
  if (missing.length) await fail('images manquantes : ' + missing.join(', '));
  if (errs.length) await fail('erreurs JS : ' + errs.join(' | '));
  console.log('OK : prologue + chapitres 1 et 2 v2 joues jusqu\'au bout');
  await b.close(); srv.close();
})();
