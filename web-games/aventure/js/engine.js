// Moteur de point-and-click (decors peints fixes, zones cliquables, inventaire, dialogues SK/FR, Slovnik).
// Une scene est une table de donnees (voir tram.js) ; son histoire s'ecrit en async/await :
//     await g.say('andrea', 'Ahoj!', 'Salut !');
// Le canvas est en 1280 x 720 (16:9) ; les coordonnees des scenes sont dans ce repere.
(function (root) {
  'use strict';
  const W = 1280, H = 720;
  const SAVE_KEY = 'zajka-aventure-v1', FR_KEY = 'zajka-aventure-fr', VOICE_KEY = 'zajka-aventure-voice';
  // une seule voix slovaque (celle de l'appareil) : on distingue les personnages par la hauteur et le debit
  const VOICE_PROFILES = { fox: { pitch: 1.0, rate: 0.95 }, andrea: { pitch: 1.3, rate: 1.0 }, narrator: { pitch: 0.8, rate: 0.92 }, katka: { pitch: 1.2, rate: 1.05 }, mato: { pitch: 0.7, rate: 0.9 },
    zahradnik: { pitch: 0.7, rate: 0.85 }, pan: { pitch: 0.85, rate: 0.9 }, revizor: { pitch: 0.8, rate: 0.9 }, pokladnicka: { pitch: 1.1, rate: 0.95 }, orol: { pitch: 0.75, rate: 0.88 }, kacka: { pitch: 1.6, rate: 1.0 }, teta: { pitch: 1.15, rate: 0.95 },
    predavacka: { pitch: 1.15, rate: 1.0 }, ovca: { pitch: 1.1, rate: 0.82 }, babka: { pitch: 1.05, rate: 0.85 }, jez: { pitch: 0.75, rate: 0.85 } };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const smooth = (k) => k * k * (3 - 2 * k);   // courbe douce (depart et arrivee lents)

  function pointInPoly(p, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i], [xj, yj] = poly[j];
      if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  function closestOnPoly(p, poly) {
    let best = null, bd = Infinity;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length];
      const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy || 1;
      const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2));
      const q = [a[0] + t * dx, a[1] + t * dy], d = (q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2;
      if (d < bd) { bd = d; best = q; }
    }
    return best;
  }
  const bbox = (poly) => {
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (const [x, y] of poly) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
    return [x0, y0, x1, y1];
  };

  class Engine {
    // data : { scenes, characters, items, start, title }
    constructor(canvas, data) {
      this.cv = canvas; this.ctx = canvas.getContext('2d');
      this.data = data;
      this.imgs = {};
      this.scene = null; this.sprites = []; this.flags = {}; this.items = []; this.words = {};
      this.busy = false; this.hover = null; this.selected = null; this.mouse = [-1, -1];
      this.dialog = null; this.choices = null; this.panel = null; this.endCard = null;
      this.showFr = true; this.flash = 0; this.t = 0; this.last = 0; this.timers = [];
      // jeu complet : carnet de la loutre, aide (Andrea puis le telephone de Katka), voyage entre les chapitres
      this.pages = []; this.clues = []; this.helper = null; this.hintLevel = {}; this.chapter = null; this.visited = [];
      this.mapState = null;
      // tableau d'enquete (data.board) : pieces trouvees, questions resolues, panneau qui glisse sur le decor
      this.cards = []; this.solved = []; this.boardT = 0; this.boardSel = []; this.boardQ = null; this.toast = null;
      this.cam = 0;   // camera : decalage horizontal du decor (scenes plus larges que l'ecran : scene.worldW)
      // cinematiques (scene.cine) : images avec leur propre cadrage (pics), animations, attentes, carton de texte, fondu au noir
      this.serial = 0; this.pics = []; this.anims = []; this.waits = []; this.caption = null; this.fadeA = 0;
      try { this.showFr = root.localStorage.getItem(FR_KEY) !== '0'; } catch (e) { /* ignore */ }
      this.voiceOn = true; this.voice = null;
      try { this.voiceOn = root.localStorage.getItem(VOICE_KEY) !== '0'; } catch (e) { /* ignore */ }
      this._initVoice();
      this._bind();
    }

    // ------------------------------------------------------------ chargement
    img(src) {
      if (!src) return null;
      if (!this.imgs[src]) {
        const im = new Image();
        im.src = src;
        this.imgs[src] = im;
      }
      return this.imgs[src];
    }
    preload() {
      const srcs = new Set();
      for (const s of Object.values(this.data.scenes)) {
        srcs.add(s.bg);
        for (const q of s.pics || []) srcs.add(q.img);
        for (const q of s.props || []) srcs.add(q.img);
        for (const l of s.layers || []) { srcs.add(l.img); for (const q of l.imgs || []) srcs.add(q); }
        for (const a of s.ambient || []) { srcs.add(a.img); for (const q of a.imgs || []) srcs.add(q); }
        for (const sp of (s.sprites || []).concat(Object.values(s.extraSprites || {}))) { srcs.add(sp.img); if (sp.walkSheet) srcs.add(sp.walkSheet.img); for (const q of Object.values(sp.climbSheets || {})) srcs.add(q.img); for (const q of Object.values(sp.poses || {})) srcs.add(q.img); }
      }
      for (const it of Object.values(this.data.items)) srcs.add(it.icon);
      for (const q of this.data.preload || []) srcs.add(q);
      for (const cd of Object.values((this.data.board || {}).cards || {})) srcs.add(cd.img);
      return Promise.all([...srcs].filter(Boolean).map((s) => new Promise((res) => {
        const im = this.img(s);
        if (im.complete) res(); else { im.onload = res; im.onerror = res; }
      })));
    }

    // ------------------------------------------------------------ sauvegarde
    save() {
      try {
        root.localStorage.setItem(this.saveKey(), JSON.stringify({
          scene: this.scene && this.scene.id, flags: this.flags, items: this.items, words: this.words,
          pages: this.pages, clues: this.clues, helper: this.helper, hintLevel: this.hintLevel, chapter: this.chapter, visited: this.visited,
          cards: this.cards, solved: this.solved, struck: this.struck || [],
        }));
      } catch (e) { /* ignore */ }
    }
    load() {
      try {
        const s = JSON.parse(root.localStorage.getItem(this.saveKey()) || 'null');
        if (s && this.data.scenes[s.scene]) {
          this.flags = s.flags || {}; this.items = s.items || []; this.words = s.words || {};
          this.pages = s.pages || []; this.clues = s.clues || []; this.helper = s.helper || null; this.hintLevel = s.hintLevel || {};
          this.chapter = s.chapter || null; this.visited = s.visited || [];
          this.cards = s.cards || []; this.solved = s.solved || []; this.struck = s.struck || [];
          return s.scene;
        }
      } catch (e) { /* ignore */ }
      return null;
    }
    saveKey() { return this.data.saveKey || SAVE_KEY; }
    newGame() {
      try { root.localStorage.removeItem(this.saveKey()); } catch (e) { /* ignore */ }
      this.flags = {}; this.items = []; this.words = {}; this.selected = null; this.endCard = null;
      this.pages = []; this.clues = []; this.helper = null; this.hintLevel = {}; this.chapter = null; this.visited = []; this.mapState = null; this.panel = null;
      this.cards = []; this.solved = []; this.struck = []; this.boardQ = null; this.boardSel = []; this.boardT = 0;
      this.enter(this.data.start);
    }
    // ------------------------------------------------------------ voix (synthese vocale du navigateur, slovaque)
    _initVoice() {
      const ss = root.speechSynthesis;
      if (!ss) return;
      const pick = () => {
        const vs = ss.getVoices() || [];
        const sk = (v) => /^(sk|slk|slo)([-_]|$)/i.test(v.lang || '') || /slovak|sloven[čc]ina/i.test(v.name || '');
        this.voice = vs.filter(sk).find((v) => /sk[-_]SK/i.test(v.lang)) || vs.find(sk) || null;
      };
      pick();
      if (ss.addEventListener) ss.addEventListener('voiceschanged', pick);
    }
    // 'on' : actif ; 'off' : coupe ; 'none' : aucune voix slovaque sur cet appareil
    voiceState() { return !root.speechSynthesis || !this.voice ? 'none' : this.voiceOn ? 'on' : 'off'; }
    setVoice(v) {
      this.voiceOn = v;
      try { root.localStorage.setItem(VOICE_KEY, v ? '1' : '0'); } catch (e) { /* ignore */ }
      if (!v) this.stopVoice();
    }
    stopVoice() { try { if (root.speechSynthesis) root.speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
    speak(text, who) {
      if (this.voiceState() !== 'on' || !text) return;
      try {
        const ch = (this.data.characters && this.data.characters[who]) || {}, prof = Object.assign({ pitch: 1, rate: 0.95 }, VOICE_PROFILES[who], ch.voice);
        const u = new root.SpeechSynthesisUtterance(text.replace(/[…]/g, '...'));
        u.voice = this.voice; u.lang = this.voice.lang || 'sk-SK'; u.pitch = prof.pitch; u.rate = prof.rate;
        root.speechSynthesis.cancel(); root.speechSynthesis.speak(u);
      } catch (e) { /* pas de voix : le jeu reste muet */ }
    }
    setShowFr(v) {
      this.showFr = v;
      try { root.localStorage.setItem(FR_KEY, v ? '1' : '0'); } catch (e) { /* ignore */ }
    }

    // ------------------------------------------------------------ scenes
    async start() {
      await this.preload();
      this.last = performance.now();
      requestAnimationFrame((t) => this.frame(t));
      this.enter(this.load() || this.data.start);
    }
    enter(id) {
      this.camFocus = null;
      const def = this.data.scenes[id];
      const fromCine = !!(this.scene && this.scene.cine);
      this.flushCine();
      this.serial += 1;
      this.scene = Object.assign({ id }, def);
      this.pics = (def.pics || []).map((q) => Object.assign({ alpha: 1 }, q, { view: Object.assign({ zoom: 1, ax: 0, ay: 0, sx: 0, sy: 0 }, q.view) }));
      this.caption = null; this.fadeA = 0;
      if (fromCine && !def.cine) { this.fadeA = 1; this.animate(800, (k) => { this.fadeA = 1 - k; }); }   // on sort d'une cinematique : fondu depuis le noir
      this.sprites = (def.sprites || []).map((s) => Object.assign({ tx: null, ty: null, face: 1, wt: 0, hidden: false }, s));
      this.timers = []; this.dialog = null; this.choices = null; this.selected = null;
      this.sceneTime = 0;
      this.cam = this.camTarget();
      if (def.chapter) { this.chapter = def.chapter; if (!this.visited.includes(def.chapter)) this.visited.push(def.chapter); }
      this.save();
      if (def.onEnter) this.run(() => def.onEnter(this.api()));
    }
    // ------------------------------------------------------------ cinematiques
    // animate(ms, fn) : appelle fn(k) a chaque image, k de 0 a 1 (courbe douce) ; promesse resolue a la fin
    animate(ms, fn, ease) {
      return new Promise((resolve) => {
        const a = { t0: this.t, dur: Math.max(0.001, ms / 1000), fn, ease: ease || smooth, resolve };
        fn(a.ease(0));
        this.anims.push(a);
      });
    }
    // attente qu'un clic (ou Espace) peut raccourcir
    wait(ms) {
      return new Promise((resolve) => { this.waits.push({ at: this.t + ms / 1000, resolve }); });
    }
    flushCine() {
      for (const a of this.anims) { a.fn(a.ease(1)); a.resolve(); }
      for (const w of this.waits) w.resolve();
      this.anims = []; this.waits = [];
    }
    cineNext() { const ws = this.waits; this.waits = []; for (const w of ws) w.resolve(); }
    skipRect() { return this.scene && this.scene.noSkip ? { x: -999, y: -999, w: 0, h: 0 } : { x: W - 176, y: 14, w: 162, h: 50 }; }   // noSkip : cinematique sans bouton « Passer »
    skipCine() {
      const sc = this.scene;
      if (!sc || !sc.cine || sc.noSkip) return;
      if (sc.doneFlag) this.flags[sc.doneFlag] = true;
      if (sc.next) this.enter(sc.next); else this.flushCine();
    }
    pic(id, props) {
      const q = this.pics.find((x) => x.id === id);
      if (!q) return;
      const { view, ...rest } = props;
      Object.assign(q, rest);
      if (view) Object.assign(q.view, view);
    }
    api() {
      const g = this, serial = this.serial;
      const live = () => g.serial === serial;   // une histoire d'un decor quitte (cinematique passee) ne touche plus a rien
      const done = () => Promise.resolve();
      return {
        animate: (ms, fn, ease) => (live() ? g.animate(ms, (k) => { if (live()) fn(k); }, ease) : done()),
        wait: (ms) => (live() ? g.wait(ms) : done()),
        caption: (sk, fr, words) => { if (!live()) return; if (words) for (const [a, b] of words) g.words[a] = b; g.caption = sk ? { sk, fr, t0: g.t } : null; if (sk) g.speak(sk, 'narrator'); },
        pic: (id, props) => { if (live()) g.pic(id, props); },
        fade: (a) => { if (live()) g.fadeA = a; },
        say: (who, sk, fr, words) => g.say(who, sk, fr, words),
        choice: (opts, o) => g.choose(opts, o),   // o.noFr : on cache la traduction des reponses (vraie question de langue)
        walk: (id, x, y) => g.walk(id, x, y),
        sprite: (id) => g.sprites.find((s) => s.id === id),
        spawn: (id, x, y) => {
          const ex = g.scene.extraSprites && g.scene.extraSprites[id];
          const s = g.sprites.find((q) => q.id === id) || (ex && g.sprites[g.sprites.push(Object.assign({ id, tx: null, ty: null, face: 1, wt: 0 }, ex)) - 1]);
          if (s) { s.hidden = false; if (x !== undefined) { s.x = x; s.y = y; } }
          return s;
        },
        hide: (id) => { const s = g.sprites.find((q) => q.id === id); if (s) { s.hidden = true; s.pose = null; } },
        climb: (id, dir) => { const s = g.sprites.find((q) => q.id === id); if (s) s.climb = dir || null; },   // 'up' | 'down' | null : bande d'images de grimpe pendant les deplacements
        face: (id, dir) => { const s = g.sprites.find((q) => q.id === id); if (s) s.face = dir; },
        // pose d'un personnage (planche d'animation) : 'think', 'surprised', 'sit'... ; null = debout
        pose: (id, name) => { const s = g.sprites.find((q) => q.id === id); if (s) s.pose = name || null; },
        time: () => g.t,   // l'horloge du jeu (secondes) : pour se caler sur une animation d'ambiance
        flag: (k) => !!g.flags[k],
        flagv: (k) => g.flags[k],   // valeur brute (compteurs, etapes)
        setFlag: (k, v = true) => { g.flags[k] = v; g.save(); },
        has: (it) => g.items.includes(it),
        give: (it) => { if (!g.items.includes(it)) g.items.push(it); g.save(); },
        take: (it) => { g.items = g.items.filter((q) => q !== it); if (g.selected === it) g.selected = null; g.save(); },
        learn: (sk, fr) => { g.words[sk] = fr; g.save(); },
        camTo: (x) => { g.camFocus = x == null ? null : x; },   // la camera regarde x (ou revient sur le joueur avec null)
        after: (ms, fn) => g.timers.push({ at: g.sceneTime + ms / 1000, fn }),
        sleep, goScene: (id) => { if (live()) g.enter(id); }, restart: () => g.enter(g.scene.id),
        end: (sk, fr) => { g.endCard = { sk, fr }; g.save(); },
        // --- jeu complet
        knows: (w) => !!g.words[w],
        talk: (h) => g.talk(h, g.api()),
        addPage: (id) => { if (!g.pages.includes(id)) { g.pages.push(id); g.save(); } },
        hasPage: (id) => g.pages.includes(id),
        addClue: (id) => { if (!g.clues.includes(id)) { g.clues.push(id); g.save(); } },
        hasClue: (id) => g.clues.includes(id),
        // aide : who = personnage qui souffle les indices, tokens = nombre d'indices (ou de % de batterie) pour le chapitre
        setHelper: (who, tokens) => { g.helper = { who, tokens, max: tokens, dead: false }; g.save(); },
        helperDead: (v = true) => { if (g.helper) { g.helper.dead = v; g.save(); } },
        chargeHelper: (tokens) => { if (g.helper) { g.helper.tokens = tokens === undefined ? g.helper.max : tokens; g.helper.dead = false; g.save(); } },
        noHelper: () => { g.helper = null; g.save(); },
        showMap: (to, opts) => g.showMap(to, opts),
        // --- tableau d'enquete
        addCard: (id) => { if (!g.cards.includes(id)) { g.cards.push(id); g.save(); const cd = ((g.data.board || {}).cards || {})[id]; g.toast = { sk: '📌 Nová stopa: ' + (cd ? cd.sk : id), fr: 'Nouvel indice au tableau', t0: g.t }; } },
        hasCard: (id) => g.cards.includes(id),
        // un suspect innocente : la carte reste, rayee
        strikeCard: (id) => { g.struck = g.struck || []; if (!g.struck.includes(id)) { g.struck.push(id); g.save(); const cd = ((g.data.board || {}).cards || {})[id]; g.toast = { sk: '❌ ' + (cd ? cd.sk : id), fr: 'Rayé du tableau', t0: g.t }; } },
        isStruck: (id) => (g.struck || []).includes(id),
        solved: (q) => g.solved.includes(q),
        askBoard: (q) => g.askBoard(q),
        // panneau sur mesure (dossier a feuilleter, photos a remettre dans l'ordre) : def = { draw(c, st, E), click(p, st, g, E) }
        // click renvoie { done: valeur } pour fermer le panneau ; la promesse se resout avec cette valeur
        openPanel: (def, st) => new Promise((resolve) => { g.custom = { def, st: st || {}, resolve }; g.panel = 'custom'; }),
        toast: (sk, fr) => { g.toast = { sk, fr, t0: g.t }; },
      };
    }
    async run(fn) {
      this.runs = (this.runs || 0) + 1;   // plusieurs histoires peuvent se chevaucher (changement de decor en plein dialogue)
      this.busy = true;
      try { await fn(); } catch (e) { console.error(e); }
      this.runs -= 1;
      this.busy = this.runs > 0;
    }

    // ------------------------------------------------------------ actions
    say(who, sk, fr, words) {
      if (words) for (const [a, b] of words) this.words[a] = b;
      // le personnage qui parle prend sa pose « parle » (s'il en a une et qu'il n'a pas deja une autre pose)
      const sp = this.sprites.find((q) => q.id === who && q.poses && q.poses.talk && !q.pose);
      if (sp) sp.pose = 'talk';
      this.speak(sk, who);
      return new Promise((resolve) => {
        this.dialog = { who, sk, fr, shown: 0, done: false, resolve: () => { if (sp && sp.pose === 'talk') sp.pose = null; resolve(); } };
      });
    }
    choose(opts, o) {
      return new Promise((resolve) => { this.choices = { opts, resolve, noFr: !!(o && o.noFr) }; });
    }
    walk(id, x, y) {
      const s = this.sprites.find((q) => q.id === id);
      if (!s) return Promise.resolve();
      let p = [x, y];
      const fl = this.scene.floor;
      if (fl && !this.scene.freeWalk && !pointInPoly(p, fl)) p = closestOnPoly(p, fl);   // freeWalk : echelles, passerelles (trajets scriptes hors du sol)
      return new Promise((resolve) => { s.tx = p[0]; s.ty = p[1]; s.arrive = resolve; });
    }
    // camera : suit le personnage, bornee aux bords du decor (une scene normale tient dans l'ecran : camera a 0)
    camTarget() {
      const ww = (this.scene && this.scene.worldW) || W;
      if (ww <= W) return 0;
      const pl = this.sprites.find((q) => q.id === this.scene.player);
      const x = this.camFocus != null ? this.camFocus : pl ? pl.x : W / 2;   // camFocus : plan de coupe (g.camTo)
      return Math.max(0, Math.min(ww - W, x - W / 2));
    }
    hotspotAt(p) {
      const hs = this.scene.hotspots || [];
      for (let i = hs.length - 1; i >= 0; i--) {
        const h = hs[i];
        if (h.when && !h.when(this.api())) continue;
        const poly = h.sprite ? this.spritePoly(h.sprite) : h.poly;
        if (poly && pointInPoly(p, poly)) return h;
      }
      return null;
    }
    spritePoly(id) {
      const s = this.sprites.find((q) => q.id === id);
      if (!s || s.hidden) return null;
      const r = this.spriteRect(s);
      return [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]];
    }
    scaleAt(y) {
      const sc = this.scene.scale || { y0: 590, s0: 0.9, y1: 700, s1: 1.1 };
      let t = (y - sc.y0) / (sc.y1 - sc.y0);
      if (sc.clamp) t = Math.max(0, Math.min(1, t));   // echelles : on monte sans rapetisser
      return sc.s0 + t * (sc.s1 - sc.s0);
    }
    kOf(s) { return s.abs ? 1 : this.scaleAt(s.y); }
    spriteRect(s) {
      const im = this.img(s.img), k = this.kOf(s), h = s.h * k;
      const w = im && im.naturalHeight ? (im.naturalWidth / im.naturalHeight) * h : h * 0.5;
      if (!s.img && s.emoji) return { x: s.x - h * 0.35, y: s.y - h * 0.85, w: h * 0.7, h: h * 0.85 };
      return { x: s.x - w / 2, y: s.y - h, w, h };
    }

    async click(p) {
      if (this.endCard) return;
      if (this.panel === 'map') { this.clickMap(); return; }
      if (this.panel === 'board') { if (this.dialog) this.advance(); else if (!this.choices) this.clickBoard(p); return; }
      if (this.panel === 'custom') {
        if (this.dialog) { this.advance(); return; }
        if (this.choices) { this.pickChoice(p); return; }
        if (this.customBusy) return;
        const C = this.custom;
        this.customBusy = true;
        this.run(async () => {
          try {
            const r = await C.def.click(p, C.st, this.api(), this);
            if (r && r.done !== undefined && this.custom === C) { this.custom = null; this.panel = null; C.resolve(r.done); }
          } finally { this.customBusy = false; }
        });
        return;
      }
      if (this.panel === 'words') {   // un mot : on l'ecoute ; ailleurs : on ferme
        const ws = Object.entries(this.words);
        for (let i = 0; i < ws.length; i++) {
          const col = i % 2, row = (i / 2) | 0, x = 80 + col * 560, y = 130 + row * 50;
          if (p[0] >= x - 10 && p[0] <= x + 500 && p[1] >= y - 8 && p[1] <= y + 42) { this.speak(ws[i][0], 'fox'); return; }
        }
        this.panel = null; this.stopVoice(); return;
      }
      if (this.panel) { this.panel = null; return; }
      if (this.dialog) { this.advance(); return; }
      if (this.choices) { this.pickChoice(p); return; }
      if (this.scene && this.scene.cine) { const r = this.skipRect(); if (p[0] >= r.x && p[0] <= r.x + r.w && p[1] >= r.y && p[1] <= r.y + r.h) this.skipCine(); else this.cineNext(); return; }
      if (this.busy) return;
      const hb = this.hudButtonAt(p);
      if (hb) { this.pressHud(hb); return; }
      // inventaire : un objet, ou deux objets a combiner
      const slot = this.slotAt(p);
      if (slot >= 0) {
        const it = this.items[slot];
        if (this.selected && this.selected !== it) {
          const a = this.selected; this.selected = null;
          const c = (this.data.combos || []).find((q) => (q.a === a && q.b === it) || (q.a === it && q.b === a));
          this.run(async () => {
            if (c) await c.run(this.api());
            else await this.say('fox', 'Hmm… to k sebe nepasuje.', 'Hmm… ça ne va pas ensemble.');
          });
          return;
        }
        this.selected = this.selected === it ? null : it;
        return;
      }
      const wp = [p[0] + this.cam, p[1]];   // point dans le repere du decor (la camera peut l'avoir decale)
      const api = this.api(), h = this.hotspotAt(wp), fox = this.sprites.find((s) => s.id === this.scene.player);
      this.run(async () => {
        if (!h) {   // le sol : le renard y marche
          if (fox && this.scene.floor && pointInPoly(wp, this.scene.floor) && !(this.scene.noWalk && this.scene.noWalk(api))) { this.selected = null; await this.walk(fox.id, wp[0], wp[1]); }
          return;
        }
        const it = this.selected;
        this.cancelAct = false;
        if (fox && h.walk) await this.walk(fox.id, h.walk[0], h.walk[1]);
        if (this.cancelAct) { this.cancelAct = false; this.selected = null; return; }   // un declencheur a arrete la marche (gravier, cabas…)
        if (fox && h.faceDir !== undefined) fox.face = h.faceDir;
        else if (fox) { const poly = h.sprite ? this.spritePoly(h.sprite) : h.poly; if (poly) { const cx = poly.reduce((a, q) => a + q[0], 0) / poly.length; if (Math.abs(cx - fox.x) > 20) fox.face = cx > fox.x ? 1 : -1; } }
        // un petit geste avant l'action (planche d'animation) : un objet sur une zone -> « utiliser », sinon la pose de la zone
        const gesture = fox && fox.poses && (it ? h.pose || 'use' : h.onUse && h.pose);
        if (gesture && fox.poses[gesture]) { fox.pose = gesture; await sleep(450); if (fox.pose === gesture) fox.pose = null; }
        if (it) {
          this.selected = null;
          if (h.onItem && h.onItem[it]) await h.onItem[it](api);
          else await this.say('fox', 'Hmm… to nejde.', 'Hmm… ça ne marche pas.');
        } else if (h.onUse) {
          await h.onUse(api);
        } else if (h.topics) {
          await this.talk(h, api);
        } else if (h.look) {
          await this.say(h.look.who || 'fox', h.look.sk, h.look.fr, h.look.words);
        }
      });
    }
    // menu de sujets : on ne peut parler que de ce dont on connait le mot (le Slovnik sert de cles)
    async talk(h, api) {
      if (h.greet) await this.say(h.greet.who || (h.sprite || 'narrator'), h.greet.sk, h.greet.fr, h.greet.words);
      for (;;) {
        const ts = (h.topics || []).filter((t) => (!t.need || this.words[t.need]) && (!t.when || t.when(api)) && !(t.once && this.flags['topic:' + (t.id || t.sk)]));
        const shown = ts.slice(0, 6), opts = shown.map((t) => ({ sk: t.sk, fr: t.fr }));
        opts.push({ sk: 'Dovidenia.', fr: 'Au revoir.' });
        const i = await this.choose(opts);
        if (i >= shown.length) { if (h.bye) await this.say(h.bye.who || (h.sprite || 'narrator'), h.bye.sk, h.bye.fr); return; }
        const t = shown[i];
        if (t.once) { this.flags['topic:' + (t.id || t.sk)] = true; this.save(); }
        await t.run(api);
      }
    }
    // indices : le helper (Andrea, puis le telephone de Katka) souffle, de plus en plus clairement, un nombre limite de fois
    async useHint() {
      const H = this.helper, sc = this.scene;
      if (!H) return;
      const cfg = (this.data.helpers || {})[H.who] || {};
      await this.run(async () => {
        if (H.dead) { await this.say(cfg.who || H.who, cfg.dead ? cfg.dead.sk : '…', cfg.dead ? cfg.dead.fr : '…'); return; }
        if (H.tokens <= 0) { await this.say(cfg.who || H.who, cfg.empty ? cfg.empty.sk : 'Skús ešte chvíľu sám.', cfg.empty ? cfg.empty.fr : 'Essaie encore un peu tout seul.'); return; }
        const api = this.api(), h = (sc.hints || []).find((q) => !q.when || q.when(api));
        if (!h) { await this.say(cfg.who || H.who, 'Pozri sa dobre okolo seba.', 'Regarde bien autour de toi.'); return; }
        const lv = Math.min(this.hintLevel[h.id] || 0, h.levels.length - 1);
        this.hintLevel[h.id] = (this.hintLevel[h.id] || 0) + 1;
        H.tokens -= 1; this.save();
        await this.say(cfg.who || H.who, h.levels[lv].sk, h.levels[lv].fr, h.levels[lv].words);
      });
    }
    hudButtons() {
      const out = [];
      let x = 14;
      const add = (id, icon, extra) => { out.push(Object.assign({ id, icon, x, y: 14, w: 64, h: 64 }, extra || {})); x += 74; };
      if (this.helper) {
        const cfg = (this.data.helpers || {})[this.helper.who] || {};
        add('hint', cfg.icon || '💡', { badge: this.helper.dead ? '✕' : String(this.helper.tokens), title: cfg.title });
      }
      add('words', '📖', { title: 'Slovník' });
      if (this.items.includes('zapisnik') || this.pages.length) add('notebook', '📓', { title: 'Zápisník' });
      if (this.data.board && this.cards.length) add('board', '📌', { title: 'Tabuľa', badge: this.boardQ ? '?' : undefined });
      if (this.data.chapters) add('map', '🗺️', { title: 'Mapa' });
      return out;
    }
    hudButtonAt(p) { return this.hudButtons().find((b) => p[0] >= b.x && p[0] <= b.x + b.w && p[1] >= b.y && p[1] <= b.y + b.h) || null; }
    pressHud(b) {
      if (b.id === 'hint') this.useHint();
      else if (b.id === 'words') this.panel = 'words';
      else if (b.id === 'notebook') this.panel = 'notebook';
      else if (b.id === 'board') { this.panel = 'board'; this.boardSel = []; }
      else if (b.id === 'map') { this.mapState = { from: this.chapter, to: null, t: 1, resolve: null, browse: true }; this.panel = 'map'; }
    }
    // carte de Slovaquie : le voyage d'un chapitre au suivant (to = chapitre d'arrivee)
    showMap(to, opts) {
      return new Promise((resolve) => {
        this.mapState = { from: (opts && opts.from) || this.chapter, to, t: 0, resolve, browse: false, note: opts && opts.note };
        this.panel = 'map';
      });
    }
    clickMap() {
      const m = this.mapState;
      if (!m) { this.panel = null; return; }
      if (m.t < 1) { m.t = 1; return; }
      this.panel = null; this.mapState = null;
      if (m.resolve) m.resolve();
    }
    advance() {
      const d = this.dialog;
      if (!d) return;
      if (d.shown < d.sk.length) { d.shown = d.sk.length; return; }
      this.dialog = null;
      this.stopVoice();
      d.resolve();
    }
    pickChoice(p) {
      const c = this.choices;
      for (let i = 0; i < c.opts.length; i++) {
        const r = this.choiceRect(i, c.opts.length);
        if (p[0] >= r.x && p[0] <= r.x + r.w && p[1] >= r.y && p[1] <= r.y + r.h) {
          this.choices = null;
          this.speak(c.opts[i].sk, 'fox');
          c.resolve(i);
          return;
        }
      }
    }
    choiceRect(i, n) { return { x: 160, y: 84 + i * 68, w: 960, h: 60 }; }   // en haut, a la place de la boite de dialogue : les personnages restent visibles
    slotAt(p) {
      for (let i = 0; i < this.items.length; i++) {
        const r = this.slotRect(i);
        if (p[0] >= r.x && p[0] <= r.x + r.w && p[1] >= r.y && p[1] <= r.y + r.h) return i;
      }
      return -1;
    }
    slotRect(i) { return { x: W - 80 - i * 76, y: 14, w: 64, h: 64 }; }
    flashZones() { this.flash = 1.4; }

    // ------------------------------------------------------------ entrees
    _bind() {
      const cv = this.cv;
      const pos = (ev) => {
        const r = cv.getBoundingClientRect();
        return [((ev.clientX - r.left) / r.width) * W, ((ev.clientY - r.top) / r.height) * H];
      };
      cv.addEventListener('pointermove', (ev) => { this.mouse = pos(ev); });
      cv.addEventListener('pointerdown', (ev) => { ev.preventDefault(); this.mouse = pos(ev); this.click(this.mouse); });
      root.addEventListener('keydown', (ev) => {
        if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); if (this.dialog) this.advance(); else if (this.scene && this.scene.cine) this.cineNext(); else this.flashZones(); }
        else if (ev.key === 'Escape') { if (this.panel === 'map') this.clickMap(); else if (!(this.panel === 'board' && this.boardQ) && this.panel !== 'custom') this.panel = null; }
      });
    }

    // ------------------------------------------------------------ boucle
    frame(now) {
      const dt = Math.min(0.05, (now - this.last) / 1000);
      this.last = now;
      this.t += dt;
      this.update(dt);
      this.draw();
      requestAnimationFrame((t) => this.frame(t));
    }
    update(dt) {
      if (!this.scene) return;
      this.sceneTime += dt;
      if (this.flash > 0) this.flash -= dt;
      if (this.anims.length) {
        const cur = this.anims, keep = [];
        this.anims = [];
        for (const a of cur) {
          const k = Math.min(1, (this.t - a.t0) / a.dur);
          a.fn(a.ease(k));
          if (k >= 1) a.resolve(); else keep.push(a);
        }
        this.anims = keep.concat(this.anims);
      }
      // declencheurs : le joueur entre dans une bande du decor (scene.triggers : { x: [x0, x1], when(g), run(g) }), seulement au repos
      if (this.scene && this.scene.triggers && !this.dialog && !this.choices && !this.panel) {
        const pl = this.sprites.find((q) => q.id === this.scene.player);
        if (pl) {
          const api = this.api(), still = pl.tx == null;
          // move: aussi pendant la marche (le gravier qui crisse) : le joueur s'arrete net
          const t = this.scene.triggers.find((q) => (q.move ? !this.trigLock : still && !this.busy) && pl.x >= q.x[0] && pl.x <= q.x[1] && (!q.y || (pl.y >= q.y[0] && pl.y <= q.y[1])) && (!q.when || q.when(api)));
          if (t) {
            if (t.move) { this.trigLock = true; this.cancelAct = true; pl.tx = pl.ty = null; const a = pl.arrive; pl.arrive = null; if (a) a(); }
            this.run(async () => { try { await t.run(this.api()); } finally { this.trigLock = false; } });
          }
        }
      }
      if (this.waits.length) { const due = this.waits.filter((w) => w.at <= this.t); if (due.length) { this.waits = this.waits.filter((w) => w.at > this.t); for (const w of due) w.resolve(); } }
      // panneau sur mesure qui vit tout seul (chrono, escalade dans le noir) : def.tick(st, E, dt) peut le fermer
      if (this.panel === 'custom' && this.custom && this.custom.def.tick && !this.dialog && !this.choices) {
        const C = this.custom, r = C.def.tick(C.st, this, dt);
        if (r && r.done !== undefined && this.custom === C) { this.custom = null; this.panel = null; C.resolve(r.done); }
      }
      this.boardT = this.panel === 'board' ? Math.min(1, this.boardT + dt * 4) : Math.max(0, this.boardT - dt * 5);
      if (this.toast && this.t - this.toast.t0 > 3) this.toast = null;
      if (this.panel === 'map' && this.mapState && this.mapState.t < 1) this.mapState.t = Math.min(1, this.mapState.t + dt / 2.6);
      if (this.dialog && this.dialog.shown < this.dialog.sk.length) this.dialog.shown = Math.min(this.dialog.sk.length, this.dialog.shown + dt * 55);
      for (const s of this.sprites) {
        if (s.alt && !s.hidden && s.tx === null && (s.pose === null || s.pose === undefined || s.pose === s.alt.pose)) {
          if (s.altAt === undefined) s.altAt = this.t + s.alt.min + Math.random() * (s.alt.max - s.alt.min);
          if (this.t >= s.altAt) {
            const on = s.pose === s.alt.pose;
            s.pose = on ? null : s.alt.pose;
            if (s.alt.faceOn !== undefined) s.face = on ? s.alt.faceOff : s.alt.faceOn;   // il se retourne pour regarder
            const [a, b] = on ? [s.alt.min, s.alt.max] : (s.alt.hold || [1.2, 2.6]);
            s.altAt = this.t + a + Math.random() * (b - a);
          }
        }
        if (s.patrol) {
          const P = s.patrol;
          if (P.state === undefined) { P.state = 'wait'; P.at = this.t + (P.first !== undefined ? P.first : P.every); s.hidden = true; }
          if (P.state === 'wait' && this.t >= P.at) { P.state = 'go1'; s.hidden = false; s.pose = null; s.x = P.from[0]; s.y = P.from[1]; s.tx = P.stop ? P.stop.x : P.to[0]; s.ty = P.from[1]; }
          else if (P.state === 'go1' && s.tx === null) {
            if (P.stop) { P.state = 'stop'; s.pose = P.stop.pose; P.at = this.t + (P.stop.dur || 1.5); }
            else { P.state = 'wait'; s.hidden = true; P.at = this.t + P.every; }
          } else if (P.state === 'stop' && this.t >= P.at) { P.state = 'go2'; s.pose = null; s.tx = P.to[0]; s.ty = P.to[1]; }
          else if (P.state === 'go2' && s.tx === null) { P.state = 'wait'; s.hidden = true; P.at = this.t + P.every; }
        }
        if (s.tx === null) { s.wt = 0; continue; }
        const dx = s.tx - s.x, dy = s.ty - s.y, d = Math.hypot(dx, dy), step = (s.speed || 300) * dt * (s.scaleSpeed ? this.scaleAt(s.y) : 1);   // scaleSpeed : les pieds ne glissent pas, loin ou pres
        if (d <= step) {
          s.x = s.tx; s.y = s.ty; s.tx = s.ty = null;
          const a = s.arrive; s.arrive = null;
          if (a) a();
        } else {
          s.x += (dx / d) * step; s.y += (dy / d) * step;
          if (s.pose && s.pose !== 'talk') s.pose = null;
          if (Math.abs(dx) > 4) s.face = dx > 0 ? 1 : -1;
          s.wt += dt;
        }
      }
      if (!this.busy && !this.dialog && !this.choices && this.timers.length) {
        const due = this.timers.filter((q) => q.at <= this.sceneTime);
        if (due.length) {
          this.timers = this.timers.filter((q) => q.at > this.sceneTime);
          this.run(async () => { for (const q of due) await q.fn(this.api()); });
        }
      }
      const ct = this.camTarget();
      this.cam += (ct - this.cam) * Math.min(1, dt * 5);
      if (Math.abs(ct - this.cam) < 0.5) this.cam = ct;
      this.hover = this.busy || this.dialog || this.choices || this.panel ? null : this.hotspotAt([this.mouse[0] + this.cam, this.mouse[1]]);
      const sr = this.skipRect(), overSkip = this.scene && this.scene.cine && this.mouse[0] >= sr.x && this.mouse[0] <= sr.x + sr.w && this.mouse[1] >= sr.y && this.mouse[1] <= sr.y + sr.h;
      this.cv.style.cursor = overSkip || this.hover || this.slotAt(this.mouse) >= 0 || (!this.busy && !this.dialog && !this.choices && !this.panel && this.hudButtonAt(this.mouse)) ? 'pointer' : 'default';
    }

    // ------------------------------------------------------------ rendu
    draw() {
      const c = this.ctx;
      c.clearRect(0, 0, W, H);
      const sc = this.scene;
      if (!sc) return;
      c.save();
      c.translate(-Math.round(this.cam), 0);   // le decor (et tout ce qui est dedans) defile avec la camera ; l'interface, non
      if (sc.pics) this.drawPics(sc);
      const bg = this.img(sc.bg);
      if (bg && bg.naturalWidth) c.drawImage(bg, 0, 0, sc.worldW || W, H);
      else if (!sc.bg && !sc.pics) this.drawPlaceholder(sc);
      for (const l of sc.layers || []) this.drawLayer(l);
      if (sc.props) this.drawProps(sc);
      if (sc.ambient) this.drawAmbient(sc, false);
      if (sc.overlay) sc.overlay(c, this.api(), this);   // dessin libre dans le decor (chiffres du tableau lumineux…)
      const order = this.sprites.filter((s) => !s.hidden).sort((a, b) => a.y - b.y);
      for (const s of order) this.drawSprite(s);
      if (sc.ambient) this.drawAmbient(sc, true);
      c.restore();
      if (sc.dim) { const a = sc.dim(this.api()); if (a > 0) { c.fillStyle = `rgba(8,10,40,${a})`; c.fillRect(0, 0, W, H); } }
      if (this.fadeA > 0) { c.fillStyle = `rgba(0,0,0,${Math.min(1, this.fadeA)})`; c.fillRect(0, 0, W, H); }
      if (sc.cine) this.drawCineHud(); else this.drawHud();
      if (this.boardT > 0) this.drawBoard();
      if (this.panel === 'custom' && this.custom) this.custom.def.draw(c, this.custom.st, this);
      if (this.toast) this.drawToast();
      if (this.dialog) this.drawDialog();
      if (this.choices) this.drawChoices();
      if (this.panel === 'words') this.drawWords();
      if (this.panel === 'notebook') this.drawNotebook();
      if (this.panel === 'map') this.drawMap();
      if (this.endCard) this.drawEnd();
    }
    // objets poses dans le decor (scene.props : { img, x, y, w, when(g) }) : taille fixe, ancre en bas au milieu, sous les personnages
    drawProps(sc) {
      const api = this.api();
      for (const q of sc.props) {
        if (q.when && !q.when(api)) continue;
        if (q.glow) {   // un halo de lumiere (lampe) : degrade radial additif
          const c = this.ctx, gr = c.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.glow);
          gr.addColorStop(0, q.color || 'rgba(255,250,210,.55)'); gr.addColorStop(1, 'rgba(255,250,210,0)');
          c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = gr; c.fillRect(q.x - q.glow, q.y - q.glow, 2 * q.glow, 2 * q.glow); c.restore();
          continue;
        }
        if (q.shade) {   // une zone assombrie (lampe eteinte peinte allumee dans le decor) : degrade radial sombre
          const c = this.ctx, gr = c.createRadialGradient(q.x, q.y, 0, q.x, q.y, q.shade);
          gr.addColorStop(0, `rgba(10,12,40,${q.a || 0.7})`); gr.addColorStop(1, 'rgba(10,12,40,0)');
          c.save(); c.translate(q.x, q.y); c.scale(1, q.sy || 1); c.translate(-q.x, -q.y);
          c.fillStyle = gr; c.fillRect(q.x - q.shade, q.y - q.shade, 2 * q.shade, 2 * q.shade); c.restore();
          continue;
        }
        const im = this.img(q.img);
        if (!im || !im.naturalWidth) continue;
        const h = q.h || q.w * im.naturalHeight / im.naturalWidth;   // h : hauteur imposee (un sol vu de biais, aplati)
        if (q.alpha !== undefined) { this.ctx.save(); this.ctx.globalAlpha = q.alpha; }
        this.ctx.drawImage(im, q.x - q.w / 2, q.y - h, q.w, h);
        if (q.alpha !== undefined) this.ctx.restore();
      }
    }
    // ------------------------------------------------------------ ambiance (scene.ambient) : le decor qui vit un peu
    // { imgs: [...], fps } boucle d'images ; { rand: [min, max] } duree au hasard de chaque image ; x, y (bas au milieu), w
    // sway: { amp, speed } balancement accroche en haut ; bob: { amp, speed } flottement vertical ;
    // cross: { from: [x, y], to: [x, y], dur, every } traversee qui revient ; puff: { w1, life, every, rise } bouffees qui grossissent et s'effacent ;
    // flies: { n, area: [x0, y0, x1, y1], color } lucioles ; sweep: { area, speed } bande de lumiere qui passe ; front: au-dessus des personnages
    drawAmbient(sc, front) {
      const c = this.ctx, api = this.api(), t = this.t;
      for (let ai = 0; ai < sc.ambient.length; ai++) {
        const a = sc.ambient[ai];
        if (!!a.front !== front || (a.when && !a.when(api))) continue;
        const ph = (a.phase || 0) + ai * 1.7;
        if (a.flies) {
          const [x0, y0, x1, y1] = a.flies.area;
          for (let i = 0; i < a.flies.n; i++) {
            const sx = Math.sin(i * 12.9898) * 43758.5453, sy = Math.sin(i * 78.233) * 12345.678;
            const fx = sx - Math.floor(sx), fy = sy - Math.floor(sy);
            const x = x0 + (x1 - x0) * (fx + 0.04 * Math.sin(t * 0.7 + i)), y = y0 + (y1 - y0) * (fy + 0.05 * Math.cos(t * 0.9 + i * 2));
            const al = Math.max(0, Math.sin(t * 1.3 + i * 2.1));
            const gr = c.createRadialGradient(x, y, 0, x, y, 14);
            gr.addColorStop(0, `rgba(255,250,160,${0.9 * al})`); gr.addColorStop(1, 'rgba(255,250,160,0)');
            c.save(); c.globalCompositeOperation = 'lighter'; c.fillStyle = gr; c.fillRect(x - 14, y - 14, 28, 28); c.restore();
          }
          continue;
        }
        if (a.sweep) {
          const [x0, y0, x1, y1] = a.sweep.area, span = x1 - x0, per = a.sweep.period || 9;
          const k = ((t + ph) % per) / per, bx = x0 - 300 + (span + 600) * k;
          c.save(); c.beginPath(); c.rect(x0, y0, span, y1 - y0); c.clip();
          const gr = c.createLinearGradient(bx - 160, 0, bx + 160, 0);
          gr.addColorStop(0, 'rgba(255,240,200,0)'); gr.addColorStop(0.5, `rgba(255,240,200,${a.sweep.a || 0.22})`); gr.addColorStop(1, 'rgba(255,240,200,0)');
          c.globalCompositeOperation = 'lighter'; c.fillStyle = gr; c.fillRect(x0, y0, span, y1 - y0); c.restore();
          continue;
        }
        const list = a.imgs || [a.img];
        let fi = 0;
        if (list.length > 1) {
          if (a.rand) {   // chaque image tient une duree au hasard (le merle sautille de temps en temps)
            if (!a._at || t >= a._at) { a._f = a._f === undefined ? 0 : (a._f + 1) % list.length; const [m0, m1] = a._f === 0 ? a.rand : (a.randAlt || [0.25, 0.4]); a._at = t + m0 + Math.random() * (m1 - m0); }
            fi = a._f;
          } else fi = Math.floor((t + ph) * (a.fps || 2)) % list.length;
        }
        const im = this.img(list[fi]);
        if (!im || !im.naturalWidth) continue;
        if (a.puff) {
          const P = a.puff, n = Math.max(1, Math.ceil(P.life / P.every));
          for (let i = 0; i < n; i++) {
            const age = (t + ph + i * P.every) % (n * P.every);
            if (age > P.life) continue;
            const k = age / P.life, w = a.w + (P.w1 - a.w) * k, h = w * im.naturalHeight / im.naturalWidth;
            c.save(); c.globalAlpha = (a.alpha || 0.85) * Math.min(1, k * 6) * (1 - k);
            c.drawImage(im, a.x - w / 2 + (P.drift || 0) * k, a.y - h - (P.rise || 80) * k, w, h); c.restore();
          }
          continue;
        }
        let x = a.x, y = a.y, rot = 0, flip = 1;
        if (a.cross) {
          const C = a.cross, per = C.dur + (C.every || 0), k = ((t + ph) % per) / C.dur;
          if (k > 1) continue;
          x = C.from[0] + (C.to[0] - C.from[0]) * k; y = C.from[1] + (C.to[1] - C.from[1]) * k + (C.arc ? -Math.sin(k * Math.PI) * C.arc : 0);
          flip = C.to[0] < C.from[0] ? -1 : 1;
        }
        if (a.bob) y += Math.sin((t + ph) * (a.bob.speed || 2)) * a.bob.amp;
        if (a.sway) rot = Math.sin((t + ph) * (a.sway.speed || 1.5)) * a.sway.amp;
        const w = a.w, h = w * im.naturalHeight / im.naturalWidth;
        c.save();
        if (a.alpha !== undefined) c.globalAlpha = a.alpha;
        if (a.sway) { c.translate(x, y - h); c.rotate(rot); c.scale(flip * (a.flip ? -1 : 1), 1); c.drawImage(im, -w / 2, 0, w, h); }
        else { c.translate(x, y); c.scale(flip * (a.flip ? -1 : 1), 1); c.drawImage(im, -w / 2, -h, w, h); }
        c.restore();
      }
    }
    // ------------------------------------------------------------ tableau d'enquete (data.board) : panneau qui glisse depuis la droite
    // askBoard(q) : le panneau s'ouvre sur la question q ; on relie deux pieces ; la promesse se resout quand c'est juste
    askBoard(qid) {
      return new Promise((resolve) => { this.boardQ = { id: qid, resolve }; this.boardSel = []; this.panel = 'board'; });
    }
    boardRect() { const w = 820, x = W - w * smooth(Math.min(1, this.boardT)); return { x, y: 0, w, h: H }; }
    boardCardRects() {
      const r = this.boardRect(), cols = this.cards.length > 8 ? 3 : 2, cw = cols === 3 ? 238 : 360, ch = 88, gx = cols === 3 ? 13 : 24, gy = 10, x0 = r.x + 40, y0 = this.boardQ ? 200 : 130;
      return this.cards.map((id, i) => ({ id, x: x0 + (i % cols) * (cw + gx), y: y0 + ((i / cols) | 0) * (ch + gy), w: cw, h: ch }));
    }
    clickBoard(p) {
      const r = this.boardRect();
      if (!this.boardQ) { this.panel = null; return; }   // sans question : un clic referme
      if (p[0] < r.x) return;
      const hit = this.boardCardRects().find((q) => p[0] >= q.x && p[0] <= q.x + q.w && p[1] >= q.y && p[1] <= q.y + q.h);
      if (!hit) return;
      const i = this.boardSel.indexOf(hit.id);
      if (i >= 0) { this.boardSel.splice(i, 1); return; }
      this.boardSel.push(hit.id);
      if (this.boardSel.length < 2) return;
      const Q = ((this.data.board || {}).questions || {})[this.boardQ.id] || {}, sel = this.boardSel.slice();
      const ok = (Q.pairs || []).some(([a, b]) => (sel[0] === a && sel[1] === b) || (sel[0] === b && sel[1] === a));
      this.run(async () => {
        if (ok) {
          if (Q.ok) for (const l of Q.ok) await this.say(l.who || 'fox', l.sk, l.fr, l.words);
          this.solved.push(this.boardQ.id); this.save();
          const res = this.boardQ.resolve; this.boardQ = null; this.boardSel = []; this.panel = null;
          res();
        } else {
          const ko = (Q.ko || [{ who: 'fox', sk: 'Hmm… To spolu nesúvisí.', fr: 'Hmm… ça n\'a rien à voir.' }]);
          const l = ko[(this.koN = (this.koN || 0) + 1) % ko.length];
          await this.say(l.who || 'fox', l.sk, l.fr, l.words);
          this.boardSel = [];
        }
      });
    }
    drawBoard() {
      const c = this.ctx, r = this.boardRect(), B = this.data.board || {}, Q = this.boardQ && (B.questions || {})[this.boardQ.id];
      c.fillStyle = `rgba(0,0,0,${0.35 * this.boardT})`; c.fillRect(0, 0, W, H);
      c.fillStyle = '#b98a56'; c.fillRect(r.x, r.y, r.w, r.h);   // liege
      c.fillStyle = 'rgba(80,50,20,.18)'; for (let i = 0; i < 160; i++) { const sx = Math.sin(i * 91.7) * 999, sy = Math.sin(i * 47.3) * 999; c.fillRect(r.x + (sx - Math.floor(sx)) * r.w, (sy - Math.floor(sy)) * H, 3, 3); }
      c.fillStyle = '#5a3a18'; c.fillRect(r.x, 0, 10, H);
      c.textBaseline = 'top'; c.fillStyle = '#2a1a08'; c.font = '700 40px system-ui, sans-serif';
      c.fillText('Tabuľa', r.x + 40, 30);
      if (this.showFr) { c.font = 'italic 24px system-ui, sans-serif'; c.fillStyle = '#4a3010'; c.fillText('Le tableau d\'enquête', r.x + 40, 78); }
      if (Q) {
        c.fillStyle = 'rgba(255,248,220,.95)'; this.roundRect(r.x + 30, 112, r.w - 60, 74, 10); c.fill();
        c.fillStyle = '#7a1a10'; c.font = '700 28px system-ui, sans-serif'; c.fillText('❓ ' + Q.sk, r.x + 46, 120, r.w - 90);
        if (this.showFr) { c.font = 'italic 21px system-ui, sans-serif'; c.fillStyle = '#5a3a20'; c.fillText(Q.fr + ' — relie deux indices', r.x + 46, 154, r.w - 90); }
      }
      const rects = this.boardCardRects(), cards = B.cards || {};
      for (const q of rects) {
        const cd = cards[q.id] || { sk: q.id, fr: '' }, sel = this.boardSel.includes(q.id);
        c.save(); c.translate(q.x + q.w / 2, q.y + q.h / 2); c.rotate(((q.id.length * 37) % 7 - 3) * 0.006);
        c.fillStyle = sel ? '#ffe08a' : '#fffaf0'; this.roundRect(-q.w / 2, -q.h / 2, q.w, q.h, 6); c.fill();
        c.strokeStyle = sel ? '#c0392b' : 'rgba(0,0,0,.25)'; c.lineWidth = sel ? 5 : 2; c.stroke();
        c.fillStyle = '#c0392b'; c.beginPath(); c.arc(0, -q.h / 2 + 6, 7, 0, 7); c.fill();   // punaise
        const small = q.w < 300, struck = (this.struck || []).includes(q.id);
        let tx = -q.w / 2 + (small ? 10 : 16);
        if (cd.icon) { c.font = (small ? '30px' : '42px') + ' system-ui, sans-serif'; c.textBaseline = 'middle'; c.fillText(cd.icon, tx, 2); tx += small ? 40 : 58; }
        c.textBaseline = 'top'; c.fillStyle = struck ? '#8a7a68' : '#1a1208'; c.font = '700 ' + (small ? 17 : 22) + 'px system-ui, sans-serif';
        this.wrap(cd.sk, q.w / 2 - tx - 8).slice(0, small ? 3 : 2).forEach((ln, i) => c.fillText(ln, tx, -q.h / 2 + (small ? 8 : 14) + i * (small ? 20 : 26)));
        if (this.showFr) { c.font = 'italic ' + (small ? 13 : 17) + 'px system-ui, sans-serif'; c.fillStyle = '#5a4a30'; c.fillText(cd.fr, tx, -q.h / 2 + (small ? 70 : 64), q.w / 2 - tx - 8); }
        if (struck) { c.strokeStyle = 'rgba(192,57,43,.85)'; c.lineWidth = 5; c.beginPath(); c.moveTo(-q.w / 2 + 8, -q.h / 2 + 10); c.lineTo(q.w / 2 - 8, q.h / 2 - 10); c.moveTo(-q.w / 2 + 8, q.h / 2 - 10); c.lineTo(q.w / 2 - 8, -q.h / 2 + 10); c.stroke(); }
        c.restore();
      }
      if (rects.length >= 2 && this.boardSel.length === 2) {   // le fil rouge entre les deux pieces choisies
        const [a, b] = this.boardSel.map((id) => rects.find((q) => q.id === id));
        if (a && b) { c.strokeStyle = '#c0392b'; c.lineWidth = 4; c.beginPath(); c.moveTo(a.x + a.w / 2, a.y + 6); c.lineTo(b.x + b.w / 2, b.y + 6); c.stroke(); }
      }
      c.font = '22px system-ui'; c.fillStyle = '#3a2410'; c.textBaseline = 'top';
      c.fillText(Q ? 'Touche deux indices qui vont ensemble.' : 'Touche pour fermer', r.x + 40, H - 50);
    }
    drawToast() {
      const c = this.ctx, k = this.t - this.toast.t0, a = Math.min(1, k * 4, (3 - k) * 3);
      if (a <= 0) return;
      c.save(); c.globalAlpha = a; c.font = '700 26px system-ui, sans-serif';
      const w = Math.max(c.measureText(this.toast.sk).width, 200) + 48, x = (W - w) / 2, y = this.panel ? 18 : H - 120;   // panneau ouvert : en haut
      c.fillStyle = 'rgba(30,20,10,.88)'; this.roundRect(x, y, w, this.showFr ? 78 : 50, 12); c.fill();
      c.fillStyle = '#ffe08a'; c.textBaseline = 'top'; c.fillText(this.toast.sk, x + 24, y + 10);
      if (this.showFr) { c.font = 'italic 20px system-ui, sans-serif'; c.fillStyle = '#d9cfb8'; c.fillText(this.toast.fr, x + 24, y + 46); }
      c.restore();
    }
    // images d'une cinematique : chacune a son cadrage (le point ax,ay de l'image est montre en sx,sy de l'ecran, agrandi zoom fois)
    drawPics(sc) {
      const c = this.ctx;
      c.fillStyle = sc.bgColor || '#000'; c.fillRect(0, 0, W, H);
      for (const q of this.pics) {
        if (!(q.alpha > 0)) continue;
        const im = this.img(q.img);
        if (!im || !im.naturalWidth) continue;
        const v = q.view, z = v.zoom, cx = v.ax - v.sx / z, cy = v.ay - v.sy / z;
        c.save();
        c.globalAlpha = Math.min(1, q.alpha);
        c.imageSmoothingQuality = 'high';
        c.scale(z, z); c.translate(-cx, -cy);
        c.drawImage(im, 0, 0, q.w || W, q.h || H);
        c.restore();
      }
    }
    drawCineHud() {
      const c = this.ctx, cap = this.caption;
      if (cap) {
        const a = Math.min(1, (this.t - cap.t0) / 0.6);
        c.save();
        c.globalAlpha = a;
        const g = c.createLinearGradient(0, H - 230, 0, H);
        g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.45, 'rgba(0,0,0,.62)'); g.addColorStop(1, 'rgba(0,0,0,.78)');
        c.fillStyle = g; c.fillRect(0, H - 230, W, 230);
        c.textAlign = 'center'; c.textBaseline = 'alphabetic';
        c.font = '700 40px system-ui, sans-serif'; c.fillStyle = '#fff4d6';
        const lines = this.wrap(cap.sk, W - 200);
        let y = H - 112 - (lines.length - 1) * 48 + (this.showFr ? 0 : 40);
        for (const l of lines) { c.fillText(l, W / 2, y); y += 48; }
        if (this.showFr && cap.fr) { c.font = 'italic 28px system-ui, sans-serif'; c.fillStyle = '#c9c4d8'; c.fillText(cap.fr, W / 2, y + 2); }
        c.restore();
      }
      const r = this.skipRect(), m = this.mouse, over = m[0] >= r.x && m[0] <= r.x + r.w && m[1] >= r.y && m[1] <= r.y + r.h;
      c.fillStyle = over ? 'rgba(240,168,48,.92)' : 'rgba(20,20,35,.6)'; this.roundRect(r.x, r.y, r.w, r.h, 14); c.fill();
      c.font = '600 24px system-ui, sans-serif'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillText('Passer ▸', r.x + r.w / 2, r.y + r.h / 2 + 1); c.textAlign = 'left';
    }
    // une image qui s'estompe sur sa gauche (pour la raccorder a la precedente)
    fadedImage(im, w, h, fade) {
      const key = im.src + '|' + Math.round(w) + 'x' + Math.round(h) + '|' + fade;
      this._fade = this._fade || {};
      if (!this._fade[key]) {
        const cv = document.createElement('canvas');
        cv.width = Math.round(w); cv.height = Math.round(h);
        const g = cv.getContext('2d');
        g.drawImage(im, 0, 0, cv.width, cv.height);
        const gr = g.createLinearGradient(0, 0, fade, 0);
        gr.addColorStop(0, 'rgba(0,0,0,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
        g.globalCompositeOperation = 'destination-out';   // on efface progressivement le bord gauche
        g.fillStyle = gr; g.fillRect(0, 0, fade, cv.height);
        this._fade[key] = cv;
      }
      return this._fade[key];
    }
    drawLayer(l) {
      const c = this.ctx;
      const list = (l.imgs || [l.img]).map((q) => this.img(q)).filter((im) => im && im.naturalWidth);
      if (!list.length) return;
      const [x0, y0, x1, y1] = l.box || bbox(l.clip), bw = x1 - x0, bh = y1 - y0, zoom = l.zoom || 1;
      const scroll = this.t * (l.speed || 60);
      c.save();
      c.beginPath();
      l.clip.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      c.closePath();
      c.clip();
      if (list.length === 1) {
        // une seule image : elle se repete, retournee une fois sur deux pour que les bords se raccordent
        const im = list[0], sc = (bh / im.naturalHeight) * zoom, sw = im.naturalWidth * sc, ih = im.naturalHeight * sc, iy = y1 - ih;
        const i0 = Math.floor(scroll / sw), off = scroll - i0 * sw;
        for (let j = 0, x = x0 - off; x < x1; j++, x += sw) {
          if (l.mirror && (i0 + j) % 2 !== 0) { c.save(); c.translate(x + sw, 0); c.scale(-1, 1); c.drawImage(im, 0, iy, sw, ih); c.restore(); }
          else c.drawImage(im, x, iy, sw, ih);
        }
      } else {
        // plusieurs images mises bout a bout, fondu enchaine sur « fade » pixels, boucle sur toute la suite
        const fade = l.fade || 70, ih = bh * zoom, iy = y1 - ih;
        const ws = list.map((im) => (im.naturalWidth / im.naturalHeight) * ih);
        const period = ws.reduce((a, w) => a + w - fade, 0);
        const pos = []; let acc = 0;
        for (const w of ws) { pos.push(acc); acc += w - fade; }
        const base = ((scroll % period) + period) % period;
        for (let cyc = -1; cyc <= 1; cyc++) {
          for (let i = 0; i < list.length; i++) {
            const x = x0 + pos[i] + cyc * period - base;
            if (x > x1 || x + ws[i] < x0) continue;
            c.drawImage(this.fadedImage(list[i], ws[i], ih, fade), x, iy);
          }
        }
      }
      const g = c.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, 'rgba(255,255,255,.18)'); g.addColorStop(0.45, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,.08)');
      c.fillStyle = g; c.fillRect(x0, y0, bw, bh);
      c.restore();
    }
    drawSprite(s) {
      const im = this.img(s.img);
      if (!s.img && s.emoji) {   // personnage provisoire : un emoji
        const c = this.ctx, k = this.scaleAt(s.y), h = s.h * k;
        c.save(); c.translate(s.x, s.y);
        c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(0, -4, h * 0.22, h * 0.05, 0, 0, 7); c.fill();
        c.font = Math.round(h * 0.7) + 'px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'alphabetic';
        if (s.face < 0) c.scale(-1, 1);
        c.fillText(s.emoji, 0, -h * 0.12);
        c.restore();
        return;
      }
      if (!im || !im.naturalWidth) return;
      const c = this.ctx, moving = s.tx !== null, ws = (s.climb && s.climbSheets && s.climbSheets[s.climb]) || s.walkSheet, wim = ws && this.img(ws.img);
      c.save();
      c.translate(s.x, s.y);
      c.scale(s.face * (s.flip ? -1 : 1), 1);
      if (moving && wim && wim.naturalWidth) {
        // cycle de marche : une bande d'images de meme taille, pieds en bas
        const n = ws.frames, fw = wim.naturalWidth / n, k = this.kOf(s), h = (ws.h || s.h) * k, w = (fw / wim.naturalHeight) * h;
        const f = Math.floor(s.wt * (ws.fps || 10)) % n;
        if (n === 1) {   // une seule image de marche : faux pas (petit rebond a chaque pas, corps qui bascule un peu)
          const ph = s.wt * (ws.step || 9), bob = Math.abs(Math.sin(ph)) * h * 0.025;
          c.rotate(Math.sin(ph) * 0.03);
          c.drawImage(wim, 0, 0, fw, wim.naturalHeight, -w / 2, -h - bob, w, h);
        } else c.drawImage(wim, f * fw, 0, fw, wim.naturalHeight, -w / 2, -h, w, h);
      } else {
        let r = this.spriteRect(s), pim = im;
        const pose = !moving && s.pose && s.poses && s.poses[s.pose], pi = pose && this.img(pose.img);
        if (pi && pi.naturalWidth) { const h = pose.h * this.kOf(s); r = { w: (pi.naturalWidth / pi.naturalHeight) * h, h }; pim = pi; }
        const breath = !s.still && (!pose || s.pose === 'talk');
        const ph = s.wt * 9, bob = moving ? Math.abs(Math.sin(ph)) * 8 : breath ? Math.sin(this.t * 1.6 + (s.x % 7)) * 1.2 : 0;   // faux pas / respiration
        const sq = moving || !breath ? 1 : 1 + Math.sin(this.t * 1.6 + (s.x % 7)) * 0.006;
        if (moving && !s.rigid) c.rotate(Math.sin(ph) * 0.025);
        c.drawImage(pim, -r.w / 2, -r.h - (s.rigid ? 0 : bob), r.w, r.h * sq);   // rigid : une voiture ne fait pas de pas
      }
      c.restore();
    }
    roundRect(x, y, w, h, r) {
      const c = this.ctx;
      c.beginPath();
      c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r);
      c.closePath();
    }
    wrap(text, maxW) {
      const c = this.ctx, out = [];
      let line = '';
      for (const word of text.split(' ')) {
        const t = line ? line + ' ' + word : word;
        if (c.measureText(t).width > maxW && line) { out.push(line); line = word; } else line = t;
      }
      if (line) out.push(line);
      return out;
    }
    drawHud() {
      const c = this.ctx, sc = this.scene;
      // zones : un contour quand on les survole (ou un instant, touche Espace / bouton « Zones »)
      const hs = sc.hotspots || [];
      for (const h of hs) {
        if (h.when && !h.when(this.api())) continue;
        const poly = h.sprite ? this.spritePoly(h.sprite) : h.poly;
        if (!poly) continue;
        const on = h === this.hover, fl = this.flash > 0;
        if (!on && !fl) continue;
        c.save();
        c.translate(-Math.round(this.cam), 0);
        c.beginPath();
        poly.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
        c.closePath();
        c.fillStyle = on ? 'rgba(255,208,96,.22)' : `rgba(255,208,96,${0.18 * Math.min(1, this.flash)})`;
        c.strokeStyle = on ? 'rgba(255,224,138,.95)' : `rgba(255,224,138,${0.8 * Math.min(1, this.flash)})`;
        c.lineWidth = 3; c.setLineDash([10, 7]);
        c.fill(); c.stroke();
        c.restore();
      }
      // etiquette de la zone survolee
      if (this.hover && this.hover.name) {
        const n = this.hover.name;
        c.font = '600 30px system-ui, sans-serif';
        const label = this.selected ? `${this.data.items[this.selected].sk} → ${n.sk}` : n.sk;
        c.font = '700 30px system-ui, sans-serif';
        const w = c.measureText(label).width + 36, x = Math.max(10, Math.min(W - w - 10, this.mouse[0] - w / 2)), y = Math.max(96, this.mouse[1] - 70);
        c.fillStyle = 'rgba(15,15,25,.88)'; this.roundRect(x, y, w, this.showFr ? 66 : 44, 12); c.fill();
        c.fillStyle = '#ffe08a'; c.textBaseline = 'top'; c.fillText(label, x + 18, y + 7);
        if (this.showFr) { c.font = 'italic 22px system-ui, sans-serif'; c.fillStyle = '#c9c4d8'; c.fillText(n.fr, x + 18, y + 40); }
      }
      // boutons : aide, Slovnik, carnet, carte
      for (const b of this.hudButtons()) {
        const over = !this.busy && !this.dialog && !this.choices && !this.panel && this.hudButtonAt(this.mouse) === b;
        c.fillStyle = over ? 'rgba(240,168,48,.92)' : 'rgba(20,20,35,.78)'; this.roundRect(b.x, b.y, b.w, b.h, 14); c.fill();
        c.strokeStyle = '#5a5a80'; c.lineWidth = 3; c.stroke();
        c.font = '36px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#fff';
        c.fillText(b.icon, b.x + b.w / 2, b.y + b.h / 2 + 3);
        if (b.badge !== undefined) {
          c.fillStyle = b.badge === '0' || b.badge === '✕' ? '#b3402e' : '#3a9a5c'; c.beginPath(); c.arc(b.x + b.w - 6, b.y + b.h - 6, 15, 0, 7); c.fill();
          c.fillStyle = '#fff'; c.font = '700 18px system-ui, sans-serif'; c.fillText(b.badge, b.x + b.w - 6, b.y + b.h - 5);
        }
        c.textAlign = 'left';
      }
      // inventaire
      for (let i = 0; i < this.items.length; i++) {
        const r = this.slotRect(i), it = this.data.items[this.items[i]], sel = this.selected === this.items[i];
        c.fillStyle = sel ? 'rgba(240,168,48,.92)' : 'rgba(20,20,35,.78)'; this.roundRect(r.x, r.y, r.w, r.h, 12); c.fill();
        c.strokeStyle = sel ? '#fff' : '#5a5a80'; c.lineWidth = 3; c.stroke();
        const im = it.icon ? this.img(it.icon) : null;
        if (im && im.naturalWidth) c.drawImage(im, r.x + 4, r.y + 4, r.w - 8, r.h - 8);
        else if (it.emoji) { c.font = '40px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#fff'; c.fillText(it.emoji, r.x + r.w / 2, r.y + r.h / 2 + 3); c.textAlign = 'left'; }
      }
      if (this.selected && !this.dialog) {
        const it = this.data.items[this.selected];
        c.font = '600 22px system-ui, sans-serif'; c.fillStyle = 'rgba(15,15,25,.85)';
        const t = `${it.sk} (${it.fr})`, w = c.measureText(t).width + 24;
        this.roundRect(W - w - 14, 84, w, 34, 8); c.fill();
        c.fillStyle = '#ffe08a'; c.textBaseline = 'middle'; c.fillText(t, W - w - 2, 101);
      }
    }
    drawDialog() {
      const d = this.dialog, c = this.ctx, ch = this.data.characters[d.who] || {};
      const x = 50, y = 84, w = W - 100, h = 190;   // en haut, sous les boutons : les personnages (en bas, sur le sol) restent visibles
      c.fillStyle = 'rgba(18,16,30,.92)'; this.roundRect(x, y, w, h, 18); c.fill();
      c.strokeStyle = ch.color || '#8a86a8'; c.lineWidth = 4; c.stroke();
      let tx = x + 28;
      if (ch.icon) {
        c.beginPath(); c.arc(x + 76, y + 78, 52, 0, 7); c.fillStyle = ch.color || '#444'; c.fill();
        c.font = '58px system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#fff'; c.fillText(ch.icon, x + 76, y + 82);
        c.textAlign = 'left';
        tx = x + 150;
      }
      c.textBaseline = 'top';
      if (ch.name) { c.font = '700 24px system-ui, sans-serif'; c.fillStyle = ch.color || '#ffe08a'; c.fillText(ch.name, tx, y + 16); }
      c.font = '600 34px system-ui, sans-serif'; c.fillStyle = '#fff';
      const sk = d.sk.slice(0, Math.floor(d.shown)), lines = this.wrap(d.sk, w - (tx - x) - 30), shownLines = this.wrap(sk, w - (tx - x) - 30);
      shownLines.forEach((ln, i) => c.fillText(ln, tx, y + 50 + i * 42));
      if (this.showFr && d.fr && d.shown >= d.sk.length) {
        c.font = 'italic 26px system-ui, sans-serif'; c.fillStyle = '#b9b4cf';
        this.wrap(d.fr, w - (tx - x) - 30).forEach((ln, i) => c.fillText(ln, tx, y + 50 + lines.length * 42 + 6 + i * 32));
      }
      if (d.shown >= d.sk.length && Math.floor(this.t * 2) % 2 === 0) { c.fillStyle = '#ffe08a'; c.font = '28px system-ui'; c.fillText('▼', x + w - 46, y + h - 44); }
    }
    drawChoices() {
      const c = this.ctx, ch = this.choices;
      ch.opts.forEach((o, i) => {
        const r = this.choiceRect(i, ch.opts.length), over = this.mouse[0] >= r.x && this.mouse[0] <= r.x + r.w && this.mouse[1] >= r.y && this.mouse[1] <= r.y + r.h;
        c.fillStyle = over ? 'rgba(240,168,48,.95)' : 'rgba(18,16,30,.92)'; this.roundRect(r.x, r.y, r.w, r.h, 14); c.fill();
        c.strokeStyle = '#8a86a8'; c.lineWidth = 3; c.stroke();
        c.textBaseline = 'middle'; c.font = '600 30px system-ui, sans-serif'; c.fillStyle = over ? '#1b1608' : '#fff';
        const fr = this.showFr && !ch.noFr;
        c.fillText(o.sk, r.x + 22, r.y + (fr ? 22 : 30));
        if (fr) { c.font = 'italic 21px system-ui, sans-serif'; c.fillStyle = over ? '#4a3a10' : '#b9b4cf'; c.fillText(o.fr, r.x + 22, r.y + 45); }
      });
    }
    drawWords() {
      const c = this.ctx, ws = Object.entries(this.words);
      c.fillStyle = 'rgba(10,10,20,.9)'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#ffe08a'; c.font = '700 44px system-ui, sans-serif'; c.textBaseline = 'top'; c.fillText(`Slovník (${ws.length})`, 80, 50);
      c.font = '30px system-ui, sans-serif';
      ws.forEach(([a, b], i) => {
        const col = i % 2, row = (i / 2) | 0;
        c.fillStyle = '#fff'; c.fillText(a, 80 + col * 560, 130 + row * 50);
        c.fillStyle = '#b9b4cf'; c.fillText('= ' + b, 80 + col * 560 + 250, 130 + row * 50);
      });
      if (!ws.length) { c.fillStyle = '#9a96a8'; c.fillText('Pas encore de mots : parle, regarde, écoute.', 80, 140); }
      c.font = '22px system-ui'; c.fillStyle = '#9a96a8'; c.fillText(this.voiceState() === 'on' ? 'Touche un mot pour l\'écouter · touche ailleurs pour fermer' : 'Touche pour fermer', 80, H - 60);
    }
    // decor provisoire : degrade, sol, noms des zones (pour jouer avant d'avoir les images)
    drawPlaceholder(sc) {
      const c = this.ctx, tint = sc.tint || ['#31456b', '#8aa0c0'];
      const g = c.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, tint[0]); g.addColorStop(0.75, tint[1]); g.addColorStop(1, tint[1]);
      c.fillStyle = g; c.fillRect(0, 0, W, H);
      if (sc.floor) {
        c.beginPath(); sc.floor.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y))); c.closePath();
        c.fillStyle = 'rgba(255,255,255,.14)'; c.fill();
      }
      for (const h of sc.hotspots || []) {
        if (h.when && !h.when(this.api())) continue;
        if (!h.poly) continue;
        const [x0, y0, x1, y1] = bbox(h.poly);
        c.fillStyle = 'rgba(255,255,255,.1)'; c.fillRect(x0, y0, x1 - x0, y1 - y0);
        c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 2; c.setLineDash([6, 6]); c.strokeRect(x0, y0, x1 - x0, y1 - y0); c.setLineDash([]);
        if (h.name) { c.font = '600 22px system-ui, sans-serif'; c.fillStyle = 'rgba(255,255,255,.7)'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(h.name.sk, (x0 + x1) / 2, (y0 + y1) / 2, Math.max(60, x1 - x0 - 8)); c.textAlign = 'left'; }
      }
      c.font = '600 26px system-ui, sans-serif'; c.fillStyle = 'rgba(255,255,255,.75)'; c.textBaseline = 'top';
      c.fillText((sc.title ? sc.title.sk + ' · ' : '') + 'décor provisoire', 24, H - 52);
    }
    drawNotebook() {
      const c = this.ctx, nb = this.data.notebook || { pages: {}, clues: {} };
      c.fillStyle = 'rgba(10,10,20,.92)'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#7fb4ff'; c.font = '700 44px system-ui, sans-serif'; c.textBaseline = 'top';
      const all = Object.keys(nb.pages || {});
      c.fillText(`Zápisník Dr. V. · strany ${this.pages.length}/${all.length}`, 80, 40);
      let y = 110;
      for (const id of all) {
        const found = this.pages.includes(id), pg = nb.pages[id];
        c.fillStyle = found ? '#fff' : '#5a5a70'; c.font = '700 28px system-ui, sans-serif';
        c.fillText(found ? pg.title.sk : '? ? ?', 80, y);
        if (found) {
          c.font = '26px system-ui, sans-serif'; c.fillStyle = '#e8e4f8'; c.fillText(pg.sk, 100, y + 36);
          if (this.showFr) { c.font = 'italic 22px system-ui, sans-serif'; c.fillStyle = '#b9b4cf'; c.fillText(pg.fr, 100, y + 68); }
          y += 108;
        } else y += 44;
      }
      const cl = Object.keys(nb.clues || {}).filter((id) => this.clues.includes(id));
      y += 14; c.fillStyle = '#ffe08a'; c.font = '700 30px system-ui, sans-serif'; c.fillText('Stopy · indices', 80, y); y += 44;
      c.font = '24px system-ui, sans-serif';
      for (const id of cl) { c.fillStyle = '#fff'; c.fillText('• ' + nb.clues[id].sk, 100, y); if (this.showFr) { c.fillStyle = '#b9b4cf'; c.font = 'italic 20px system-ui, sans-serif'; c.fillText(nb.clues[id].fr, 124, y + 28); c.font = '24px system-ui, sans-serif'; y += 28; } y += 38; }
      if (!cl.length) { c.fillStyle = '#9a96a8'; c.fillText('Pas encore d\'indices.', 100, y); }
      c.font = '22px system-ui'; c.fillStyle = '#9a96a8'; c.fillText('Touche pour fermer', 80, H - 50);
    }
    // carte de Slovaquie (contour simplifie) : etapes du voyage, trajet anime vers le chapitre suivant
    mapXY(lon, lat) {
      const k = 252, x0 = 150, y0 = 650;
      return [x0 + (lon - 16.7) * 0.66 * k, y0 - (lat - 47.7) * k];
    }
    drawMap() {
      const c = this.ctx, m = this.mapState, chs = this.data.chapters || [];
      c.fillStyle = '#e8d9ae'; c.fillRect(0, 0, W, H);
      c.strokeStyle = 'rgba(120,90,40,.35)'; c.lineWidth = 6; c.strokeRect(24, 24, W - 48, H - 48);
      const outline = [[16.85, 48.35], [17.1, 48.0], [17.7, 47.8], [18.1, 47.75], [18.7, 47.85], [19.1, 48.05], [19.6, 48.2], [20.3, 48.3], [21.0, 48.5], [21.8, 48.35], [22.2, 48.4], [22.55, 49.05], [22.0, 49.25], [21.4, 49.4], [20.9, 49.3], [20.3, 49.4], [19.9, 49.2], [19.5, 49.6], [18.9, 49.5], [18.4, 49.3], [17.9, 49.05], [17.5, 48.85], [17.1, 48.85], [16.85, 48.6]];
      c.beginPath(); outline.forEach(([lo, la], i) => { const [x, y] = this.mapXY(lo, la); i ? c.lineTo(x, y) : c.moveTo(x, y); }); c.closePath();
      c.fillStyle = '#b7d29a'; c.fill(); c.strokeStyle = '#6b8a4a'; c.lineWidth = 4; c.stroke();
      const idx = (id) => chs.findIndex((q) => q.id === id);
      const cur = m ? idx(m.to || m.from) : idx(this.chapter);
      // trajet deja fait + trajet anime
      const pts = chs.map((q) => this.mapXY(q.lon, q.lat));
      const upTo = m && m.to ? idx(m.to) : cur;
      const from = m && m.to ? idx(m.from) : -1;
      c.setLineDash([12, 10]); c.lineWidth = 5; c.strokeStyle = 'rgba(150,70,40,.85)';
      c.beginPath();
      for (let i = 0; i <= (m && m.to ? Math.max(0, from) : cur) && i < pts.length; i++) i ? c.lineTo(pts[i][0], pts[i][1]) : c.moveTo(pts[i][0], pts[i][1]);
      c.stroke();
      let dot = null;
      if (m && m.to && from >= 0 && upTo >= 0) {
        const a = pts[from], b = pts[upTo], t = m.t;
        dot = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
        c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(dot[0], dot[1]); c.stroke();
      }
      c.setLineDash([]);
      const seen = new Set();
      chs.forEach((q, i) => {
        const key = q.lon + ',' + q.lat;
        const [x, y] = pts[i];
        const visited = this.visited.includes(q.id) || (m && m.to === q.id && m.t >= 1);
        if (!seen.has(key)) {
          seen.add(key);
          c.beginPath(); c.arc(x, y, 13, 0, 7); c.fillStyle = visited ? '#d8892b' : '#9a9a8a'; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 3; c.stroke();
        }
        if (visited && q.label !== false) {
          c.font = '600 21px system-ui, sans-serif'; c.fillStyle = '#3d2b12'; c.textAlign = 'left'; c.textBaseline = 'middle';
          c.fillText(q.place ? q.place.sk : q.title.sk, x + 18, y - 4 + (q.dy || 0));
        }
      });
      if (dot) { c.beginPath(); c.arc(dot[0], dot[1], 11 + Math.sin(this.t * 6) * 2, 0, 7); c.fillStyle = '#c0392b'; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 3; c.stroke(); }
      // titre
      const target = m && m.to ? chs[idx(m.to)] : chs[cur];
      c.textAlign = 'left'; c.textBaseline = 'top';
      if (target) {
        c.fillStyle = '#3d2b12'; c.font = '700 44px system-ui, sans-serif'; c.fillText(`${target.num !== undefined ? target.num + ' · ' : ''}${target.title.sk}`, 60, 52);
        if (this.showFr) { c.font = 'italic 28px system-ui, sans-serif'; c.fillStyle = '#6b5530'; c.fillText(target.title.fr, 60, 106); }
      }
      if (m && m.note) { c.font = '600 28px system-ui, sans-serif'; c.fillStyle = '#6b3a20'; c.fillText(m.note.sk, 60, H - 110); if (this.showFr) { c.font = 'italic 22px system-ui, sans-serif'; c.fillText(m.note.fr, 60, H - 74); } }
      c.font = '22px system-ui'; c.fillStyle = '#7a6a48'; c.fillText(m && m.browse ? 'Touche pour fermer' : (m && m.t >= 1 ? 'Touche pour continuer' : 'Touche pour passer'), W - 330, H - 56);
    }
    drawEnd() {
      const c = this.ctx, e = this.endCard;
      c.fillStyle = 'rgba(10,10,20,.88)'; c.fillRect(0, 0, W, H);
      c.textAlign = 'center'; c.textBaseline = 'middle';
      c.fillStyle = '#ffe08a'; c.font = '700 60px system-ui, sans-serif'; c.fillText(e.sk, W / 2, H / 2 - 30);
      if (this.showFr) { c.fillStyle = '#b9b4cf'; c.font = 'italic 34px system-ui, sans-serif'; c.fillText(e.fr, W / 2, H / 2 + 40); }
      c.fillStyle = '#9a96a8'; c.font = '26px system-ui, sans-serif';
      c.fillText(`Slovník : ${Object.keys(this.words).length} mots`, W / 2, H / 2 + 110);
      c.textAlign = 'left';
    }
  }

  root.ZajkaAventure = { Engine, pointInPoly };
})(globalThis);
