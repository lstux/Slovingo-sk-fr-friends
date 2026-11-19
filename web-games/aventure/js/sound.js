// Zajko Quest : le son (Web Audio). Ambiances en boucle par decor, bruitages, pas du joueur.
// Les fichiers sont dans audio/amb, audio/sfx (liste : docs/Sons-a-chercher.md). Un fichier absent est ignore sans bruit :
// pour ajouter un son, il suffit de deposer le fichier et de l'ajouter dans AMB (ambiance d'un decor) ou d'appeler g.sfx('nom').
(function (root) {
  'use strict';
  const BASE = 'audio/', KEY = 'zajka-aventure-sound';
  const VER = '20261118';   // change quand un fichier audio est remplace (le navigateur garde les anciens sinon)

  // ---- ambiance de chaque decor : f = fichier dans amb/, v = volume (0 a 1), rand = bruitages au hasard dans le decor
  // (every : [min, max] secondes entre deux sons ; pan : -1 gauche, 1 droite)
  const AMB = {
    uvod: { f: 'train', v: 0.55 },
    gare: { f: 'gare', v: 0.5 },
    tram: { f: 'tram', v: 0.5 },
    rue: { f: 'rue', v: 0.5 },
    zahrada: { f: 'jardin_soir', v: 0.5 },
    rano: { f: 'jardin_matin', v: 0.5 },
    urad: { f: 'guichets', v: 0.45 },
    namestie: { f: 'place', v: 0.5, rand: [{ f: 'goutte', every: [6, 12], v: 0.4 }] },
    fontana: { f: 'place', v: 0.5, rand: [{ f: 'goutte', every: [6, 12], v: 0.4 }] },
    jazierko: { f: 'parc', v: 0.5 },
    stanica: { f: 'gare', v: 0.45 },
    raj: { f: 'foret', v: 0.5, rand: [{ f: 'geai', every: [20, 40], v: 0.35 }] },
    rokle: { f: 'gorge', v: 0.55, rand: [{ f: 'cailloux', every: [25, 50], v: 0.3 }] },
    chata: { f: 'foret', v: 0.4, rand: [{ f: 'geai', every: [25, 45], v: 0.3 }] },
    jazero: { f: 'ruisseau', v: 0.5 },
    bivouac: { f: 'nuit_foret', v: 0.55 },
    dedina: { f: 'village', v: 0.5, rand: [{ f: 'coq', every: [30, 60], v: 0.3 }, { f: 'cloche_mouton', every: [12, 25], v: 0.25 }] },
    kuchyna5: { f: 'cuisine', v: 0.45 },
    zadok: { f: 'village', v: 0.4, rand: [{ f: 'cloche_mouton', every: [10, 20], v: 0.25 }] },
  };
  // sol sous les pieds : par defaut dur (carrelage, pave) ; herbe pour les jardins, le parc et la foret ; rien = pas de bruit de pas
  const GRASS = ['zahrada', 'rano', 'jazierko', 'raj', 'chata', 'jazero', 'bivouac', 'dedina', 'zadok'];
  const NO_STEPS = ['chata_vecer', 'izba', 'kuchyna', 'chata_rano'];   // refuge : les sons du chapitre 4 ne sont pas encore la
  // volume de chaque bruitage (1 par defaut)
  // duree maximale (s) des bruitages trop longs : fondu puis arret
  const CAP = { voiture_arrive: 7, voiture_part: 6, train_part: 14 };
  const VOL = { clic: 0.5, prise: 0.7, mot: 0.55, page: 0.7, indice: 0.7, non: 0.6, oui: 0.6, bip: 0.3, pas_dur: 0.5, pas_herbe: 0.55, echelle_metal: 0.6, fin_chapitre: 0.7, voiture_arrive: 0.8, voiture_part: 0.8, train_part: 0.8 };

  class Sound {
    constructor() {
      this.on = true;
      try { this.on = root.localStorage.getItem(KEY) !== '0'; } catch (e) { /* ignore */ }
      this.ctx = null; this.master = null; this.bufs = {}; this.loading = {};
      this.amb = null; this.ambName = null; this.ambSerial = 0; this.steps = null; this.stepName = null;
      this.randT = []; this.last = {};
      const unlock = () => { this._ensure(); if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); };   // un navigateur n'autorise le son qu'apres un geste
      for (const ev of ['pointerdown', 'keydown', 'touchstart']) root.addEventListener(ev, unlock, { passive: true });
      if (root.document) root.document.addEventListener('visibilitychange', () => {   // onglet cache : silence (et pas de batterie gaspillee)
        if (!this.ctx) return;
        if (root.document.hidden) this.ctx.suspend(); else if (this.on) this.ctx.resume();
      });
    }
    _ensure() {
      if (this.ctx) return this.ctx;
      const AC = root.AudioContext || root.webkitAudioContext;
      if (!AC) return null;
      try {
        this.ctx = new AC();
        this.master = this.ctx.createGain(); this.master.gain.value = this.on ? 1 : 0; this.master.connect(this.ctx.destination);
      } catch (e) { this.ctx = null; }
      return this.ctx;
    }
    setOn(v) {
      this.on = !!v;
      try { root.localStorage.setItem(KEY, v ? '1' : '0'); } catch (e) { /* ignore */ }
      if (this.master) this.master.gain.setTargetAtTime(v ? 1 : 0, this.ctx.currentTime, 0.05);
      if (v && this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }
    // charge et decode un fichier (une seule fois) ; null si absent
    load(path) {
      if (path in this.bufs) return Promise.resolve(this.bufs[path]);
      if (this.loading[path]) return this.loading[path];
      const ctx = this._ensure();
      if (!ctx) return Promise.resolve(null);
      this.loading[path] = fetch(BASE + path + '.ogg?v=' + VER)
        .then((r) => (r.ok ? r.arrayBuffer() : null))
        .then((ab) => (ab ? new Promise((res) => ctx.decodeAudioData(ab, res, () => res(null))) : null))
        .catch(() => null)
        .then((b) => { this.bufs[path] = b; delete this.loading[path]; return b; });
      return this.loading[path];
    }
    _src(buf, vol, loop, pan) {
      const ctx = this.ctx, s = ctx.createBufferSource(), g = ctx.createGain();
      s.buffer = buf; s.loop = !!loop; g.gain.value = vol;
      let out = g;
      if (pan && ctx.createStereoPanner) { const p = ctx.createStereoPanner(); p.pan.value = pan; g.connect(p); out = p; }
      s.connect(g); out.connect(this.master);
      return { s, g };
    }
    // bruitage isole : play('prise') ; o.vol, o.rate, o.pan
    async play(name, o) {
      o = o || {};
      const now = Date.now();
      if (this.last[name] && now - this.last[name] < (o.gap !== undefined ? o.gap : 120)) return;   // pas deux fois le meme son d'un coup
      this.last[name] = now;
      const b = await this.load('sfx/' + name);
      if (!b || !this.ctx || !this.on) return;
      const v = (o.vol !== undefined ? o.vol : 1) * (VOL[name] !== undefined ? VOL[name] : 1);
      const { s, g } = this._src(b, v, false, o.pan);
      if (o.rate) s.playbackRate.value = o.rate;
      const t0 = this.ctx.currentTime + (o.delay || 0) / 1000;
      s.start(t0);
      if (CAP[name] && b.duration > CAP[name]) { g.gain.setValueAtTime(v, t0 + CAP[name] - 1.5); g.gain.linearRampToValueAtTime(0, t0 + CAP[name]); s.stop(t0 + CAP[name] + 0.05); }
    }
    // ambiance : fondu enchaine ; null = silence
    async ambience(file, vol) {
      const ctx = this._ensure();
      if (file === this.ambName) return;
      this.ambName = file;
      const serial = ++this.ambSerial;
      const old = this.amb;
      if (old) { old.g.gain.setTargetAtTime(0, ctx ? ctx.currentTime : 0, 0.4); setTimeout(() => { try { old.s.stop(); } catch (e) { /* deja arrete */ } }, 2000); this.amb = null; }
      if (!file || !ctx) return;
      const b = await this.load('amb/' + file);
      if (!b || serial !== this.ambSerial) return;
      const a = this._src(b, 0, true);
      a.s.start(0, Math.random() * b.duration);
      a.g.gain.setTargetAtTime(vol === undefined ? 0.5 : vol, ctx.currentTime, 0.6);
      this.amb = a;
    }
    // pas du joueur : name = 'pas_dur' | 'pas_herbe' | 'echelle_metal' | null (il s'arrete)
    async walking(name) {
      if (name === this.stepName) return;
      this.stepName = name;
      const old = this.steps;
      if (old) { old.g.gain.setTargetAtTime(0, this.ctx.currentTime, 0.05); setTimeout(() => { try { old.s.stop(); } catch (e) { /* deja arrete */ } }, 400); this.steps = null; }
      if (!name || !this.ctx) return;
      const b = await this.load('sfx/' + name);
      if (!b || this.stepName !== name || !this.ctx) return;
      const a = this._src(b, VOL[name] || 0.5, true);
      a.s.start(0, Math.random() * Math.max(0.1, b.duration - 0.5));
      this.steps = a;
    }
    // a l'entree d'un decor
    scene(id, def) {
      const A = (def && def.amb !== undefined ? (typeof def.amb === 'string' ? { f: def.amb } : def.amb) : AMB[id]) || null;
      this.ambience(A ? A.f : null, A ? A.v : undefined);
      this.walking(null);
      this.randT = [];
      if (A && A.rand) for (const r of A.rand) { this.load('sfx/' + r.f); this.randT.push({ r, at: this._next(r) }); }
      this.surface = NO_STEPS.includes(id) ? null : GRASS.includes(id) ? 'pas_herbe' : 'pas_dur';
    }
    _next(r) { return Date.now() / 1000 + r.every[0] + Math.random() * (r.every[1] - r.every[0]); }
    // chaque image : le joueur marche-t-il ? bruitages au hasard du decor
    tick(moving, climbing, quiet) {
      if (!this.ctx) return;
      this.walking(moving && this.surface ? (climbing ? 'echelle_metal' : this.surface) : null);
      if (this.randT.length && this.on && !quiet) {
        const t = Date.now() / 1000;
        for (const q of this.randT) if (t >= q.at) { q.at = this._next(q.r); this.play(q.r.f, { vol: q.r.v, pan: (Math.random() - 0.5) * 1.2, gap: 1000 }); }
      }
    }
  }
  root.ZajkaSound = Sound;
}(typeof window !== 'undefined' ? window : globalThis));
