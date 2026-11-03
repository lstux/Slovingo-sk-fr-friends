// Moteur de point-and-click (decors peints fixes, zones cliquables, inventaire, dialogues SK/FR, Slovnik).
// Une scene est une table de donnees (voir tram.js) ; son histoire s'ecrit en async/await :
//     await g.say('andrea', 'Ahoj!', 'Salut !');
// Le canvas est en 1280 x 720 (16:9) ; les coordonnees des scenes sont dans ce repere.
(function (root) {
  'use strict';
  const W = 1280, H = 720;
  const SAVE_KEY = 'zajka-aventure-v1', FR_KEY = 'zajka-aventure-fr';
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
      try { this.showFr = root.localStorage.getItem(FR_KEY) !== '0'; } catch (e) { /* ignore */ }
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
        for (const l of s.layers || []) srcs.add(l.img);
        for (const sp of s.sprites || []) srcs.add(sp.img);
        for (const sp of Object.values(s.extraSprites || {})) srcs.add(sp.img);
      }
      for (const it of Object.values(this.data.items)) srcs.add(it.icon);
      return Promise.all([...srcs].filter(Boolean).map((s) => new Promise((res) => {
        const im = this.img(s);
        if (im.complete) res(); else { im.onload = res; im.onerror = res; }
      })));
    }

    // ------------------------------------------------------------ sauvegarde
    save() {
      try {
        root.localStorage.setItem(SAVE_KEY, JSON.stringify({ scene: this.scene && this.scene.id, flags: this.flags, items: this.items, words: this.words }));
      } catch (e) { /* ignore */ }
    }
    load() {
      try {
        const s = JSON.parse(root.localStorage.getItem(SAVE_KEY) || 'null');
        if (s && this.data.scenes[s.scene]) { this.flags = s.flags || {}; this.items = s.items || []; this.words = s.words || {}; return s.scene; }
      } catch (e) { /* ignore */ }
      return null;
    }
    newGame() {
      try { root.localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
      this.flags = {}; this.items = []; this.words = {}; this.selected = null; this.endCard = null;
      this.enter(this.data.start);
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
      const def = this.data.scenes[id];
      this.scene = Object.assign({ id }, def);
      this.sprites = (def.sprites || []).map((s) => Object.assign({ tx: null, ty: null, face: 1, walk: 0, hidden: false }, s));
      this.timers = []; this.dialog = null; this.choices = null; this.selected = null;
      this.sceneTime = 0;
      this.save();
      if (def.onEnter) this.run(() => def.onEnter(this.api()));
    }
    api() {
      const g = this;
      return {
        say: (who, sk, fr, words) => g.say(who, sk, fr, words),
        choice: (opts) => g.choose(opts),
        walk: (id, x, y) => g.walk(id, x, y),
        sprite: (id) => g.sprites.find((s) => s.id === id),
        spawn: (id, x, y) => {
          const ex = g.scene.extraSprites && g.scene.extraSprites[id];
          const s = g.sprites.find((q) => q.id === id) || (ex && g.sprites[g.sprites.push(Object.assign({ id, tx: null, ty: null, face: 1, walk: 0 }, ex)) - 1]);
          if (s) { s.hidden = false; if (x !== undefined) { s.x = x; s.y = y; } }
          return s;
        },
        hide: (id) => { const s = g.sprites.find((q) => q.id === id); if (s) s.hidden = true; },
        face: (id, dir) => { const s = g.sprites.find((q) => q.id === id); if (s) s.face = dir; },
        flag: (k) => !!g.flags[k],
        setFlag: (k, v = true) => { g.flags[k] = v; g.save(); },
        has: (it) => g.items.includes(it),
        give: (it) => { if (!g.items.includes(it)) g.items.push(it); g.save(); },
        take: (it) => { g.items = g.items.filter((q) => q !== it); if (g.selected === it) g.selected = null; g.save(); },
        learn: (sk, fr) => { g.words[sk] = fr; g.save(); },
        after: (ms, fn) => g.timers.push({ at: g.sceneTime + ms / 1000, fn }),
        sleep, goScene: (id) => g.enter(id), restart: () => g.enter(g.scene.id),
        end: (sk, fr) => { g.endCard = { sk, fr }; g.save(); },
      };
    }
    async run(fn) {
      this.busy = true;
      try { await fn(); } catch (e) { console.error(e); }
      this.busy = false;
    }

    // ------------------------------------------------------------ actions
    say(who, sk, fr, words) {
      if (words) for (const [a, b] of words) this.words[a] = b;
      return new Promise((resolve) => { this.dialog = { who, sk, fr, shown: 0, resolve, done: false }; });
    }
    choose(opts) {
      return new Promise((resolve) => { this.choices = { opts, resolve }; });
    }
    walk(id, x, y) {
      const s = this.sprites.find((q) => q.id === id);
      if (!s) return Promise.resolve();
      let p = [x, y];
      const fl = this.scene.floor;
      if (fl && !pointInPoly(p, fl)) p = closestOnPoly(p, fl);
      return new Promise((resolve) => { s.tx = p[0]; s.ty = p[1]; s.arrive = resolve; });
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
      return sc.s0 + ((y - sc.y0) / (sc.y1 - sc.y0)) * (sc.s1 - sc.s0);
    }
    spriteRect(s) {
      const im = this.img(s.img), k = this.scaleAt(s.y), h = s.h * k;
      const w = im && im.naturalHeight ? (im.naturalWidth / im.naturalHeight) * h : h * 0.5;
      return { x: s.x - w / 2, y: s.y - h, w, h };
    }

    async click(p) {
      if (this.endCard) return;
      if (this.panel) { this.panel = null; return; }
      if (this.dialog) { this.advance(); return; }
      if (this.choices) { this.pickChoice(p); return; }
      if (this.busy) return;
      // inventaire
      const slot = this.slotAt(p);
      if (slot >= 0) { this.selected = this.selected === this.items[slot] ? null : this.items[slot]; return; }
      const api = this.api(), h = this.hotspotAt(p), fox = this.sprites.find((s) => s.id === this.scene.player);
      this.run(async () => {
        if (!h) {   // le sol : le renard y marche
          if (fox && this.scene.floor && pointInPoly(p, this.scene.floor)) { this.selected = null; await this.walk(fox.id, p[0], p[1]); }
          return;
        }
        const it = this.selected;
        if (fox && h.walk) await this.walk(fox.id, h.walk[0], h.walk[1]);
        if (fox && h.faceDir !== undefined) fox.face = h.faceDir;
        if (it) {
          this.selected = null;
          if (h.onItem && h.onItem[it]) await h.onItem[it](api);
          else await this.say('fox', 'Hmm… to nejde.', 'Hmm… ça ne marche pas.');
        } else if (h.onUse) {
          await h.onUse(api);
        } else if (h.look) {
          await this.say(h.look.who || 'fox', h.look.sk, h.look.fr, h.look.words);
        }
      });
    }
    advance() {
      const d = this.dialog;
      if (!d) return;
      if (d.shown < d.sk.length) { d.shown = d.sk.length; return; }
      this.dialog = null;
      d.resolve();
    }
    pickChoice(p) {
      const c = this.choices;
      for (let i = 0; i < c.opts.length; i++) {
        const r = this.choiceRect(i, c.opts.length);
        if (p[0] >= r.x && p[0] <= r.x + r.w && p[1] >= r.y && p[1] <= r.y + r.h) {
          this.choices = null;
          c.resolve(i);
          return;
        }
      }
    }
    choiceRect(i, n) { return { x: 160, y: 470 - (n - i) * 70, w: 960, h: 60 }; }
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
        if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); if (this.dialog) this.advance(); else this.flashZones(); }
        else if (ev.key === 'Escape') this.panel = null;
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
      if (this.dialog && this.dialog.shown < this.dialog.sk.length) this.dialog.shown = Math.min(this.dialog.sk.length, this.dialog.shown + dt * 55);
      for (const s of this.sprites) {
        if (s.tx === null) { s.walk = 0; continue; }
        const dx = s.tx - s.x, dy = s.ty - s.y, d = Math.hypot(dx, dy), step = (s.speed || 300) * dt;
        if (d <= step) {
          s.x = s.tx; s.y = s.ty; s.tx = s.ty = null;
          const a = s.arrive; s.arrive = null;
          if (a) a();
        } else {
          s.x += (dx / d) * step; s.y += (dy / d) * step;
          if (Math.abs(dx) > 4) s.face = dx > 0 ? 1 : -1;
          s.walk += dt;
        }
      }
      if (!this.busy && !this.dialog && !this.choices && this.timers.length) {
        const due = this.timers.filter((q) => q.at <= this.sceneTime);
        if (due.length) {
          this.timers = this.timers.filter((q) => q.at > this.sceneTime);
          this.run(async () => { for (const q of due) await q.fn(this.api()); });
        }
      }
      this.hover = this.busy || this.dialog || this.choices || this.panel ? null : this.hotspotAt(this.mouse);
      this.cv.style.cursor = this.hover || this.slotAt(this.mouse) >= 0 ? 'pointer' : 'default';
    }

    // ------------------------------------------------------------ rendu
    draw() {
      const c = this.ctx;
      c.clearRect(0, 0, W, H);
      const sc = this.scene;
      if (!sc) return;
      const bg = this.img(sc.bg);
      if (bg && bg.naturalWidth) c.drawImage(bg, 0, 0, W, H);
      for (const l of sc.layers || []) this.drawLayer(l);
      const order = this.sprites.filter((s) => !s.hidden).sort((a, b) => a.y - b.y);
      for (const s of order) this.drawSprite(s);
      this.drawHud();
      if (this.dialog) this.drawDialog();
      if (this.choices) this.drawChoices();
      if (this.panel === 'words') this.drawWords();
      if (this.endCard) this.drawEnd();
    }
    drawLayer(l) {
      const im = this.img(l.img);
      if (!im || !im.naturalWidth) return;
      const [x0, y0, x1, y1] = bbox(l.clip), bw = x1 - x0, bh = y1 - y0, sc = bh / im.naturalHeight * (l.zoom || 1);
      const sw = im.naturalWidth * sc;
      const scroll = this.t * (l.speed || 60), i0 = Math.floor(scroll / sw), off = scroll - i0 * sw, ih = im.naturalHeight * sc, iy = y1 - ih;
      const c = this.ctx;
      c.save();
      c.beginPath();
      l.clip.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      c.closePath();
      c.clip();
      // l'image se repete ; avec « mirror », une image sur deux est retournee : les bords se raccordent toujours
      for (let j = 0, x = x0 - off; x < x1; j++, x += sw) {
        if (l.mirror && (i0 + j) % 2 !== 0) {
          c.save(); c.translate(x + sw, 0); c.scale(-1, 1); c.drawImage(im, 0, iy, sw, ih); c.restore();
        } else c.drawImage(im, x, iy, sw, ih);
      }
      const g = c.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, 'rgba(255,255,255,.18)'); g.addColorStop(0.45, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,.08)');
      c.fillStyle = g; c.fillRect(x0, y0, bw, bh);
      c.restore();
    }
    drawSprite(s) {
      const im = this.img(s.img);
      if (!im || !im.naturalWidth) return;
      const r = this.spriteRect(s), c = this.ctx;
      const moving = s.tx !== null;
      const bob = moving ? Math.abs(Math.sin(s.walk * 9)) * 8 : Math.sin(this.t * 1.6 + (s.x % 7)) * 1.2;   // marche / respiration
      const sq = moving ? 1 : 1 + Math.sin(this.t * 1.6 + (s.x % 7)) * 0.006;
      c.save();
      c.translate(s.x, s.y);
      c.scale(s.face * (s.flip ? -1 : 1), 1);
      c.drawImage(im, -r.w / 2, -r.h - bob, r.w, r.h * sq);
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
      // inventaire
      for (let i = 0; i < this.items.length; i++) {
        const r = this.slotRect(i), it = this.data.items[this.items[i]], sel = this.selected === this.items[i];
        c.fillStyle = sel ? 'rgba(240,168,48,.92)' : 'rgba(20,20,35,.78)'; this.roundRect(r.x, r.y, r.w, r.h, 12); c.fill();
        c.strokeStyle = sel ? '#fff' : '#5a5a80'; c.lineWidth = 3; c.stroke();
        const im = this.img(it.icon);
        if (im && im.naturalWidth) c.drawImage(im, r.x + 4, r.y + 4, r.w - 8, r.h - 8);
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
      const x = 50, y = 508, w = W - 100, h = 190;
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
        c.fillText(o.sk, r.x + 22, r.y + (this.showFr ? 22 : 30));
        if (this.showFr) { c.font = 'italic 21px system-ui, sans-serif'; c.fillStyle = over ? '#4a3a10' : '#b9b4cf'; c.fillText(o.fr, r.x + 22, r.y + 45); }
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
      c.font = '22px system-ui'; c.fillStyle = '#9a96a8'; c.fillText('Touche pour fermer', 80, H - 60);
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
