/* <guitar-tab>: tablatura visual con reproducción. data = {bpm, tuning:[midi alto→bajo], m:[{sig, b:[{d:[n,d], n:[[cuerda,traste,flag]], c, st, dot, t, r, pm}]}]} */
(() => {
const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const LG = 22, TOP = 64, LAB = 46;
const BASEY = TOP + 5 * LG, ROWH = BASEY + 66;
const durOf = b => b.d[0] / b.d[1];
const bwOf = b => Math.max(36, 18 + durOf(b) * 300);
const flagsOf = b => {
  let base = durOf(b);
  if (b.t) base = base * b.t / 2; else if (b.dot) base = base * 2 / 3;
  return Math.max(0, Math.min(3, Math.round(Math.log2(1 / base)) - 2));
};
const S = (tag, attrs, inner = "") => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ")}>${inner}</${tag}>`;

let AC;
const bufs = new Map();
function pluck(ctx, midi) {
  if (bufs.has(midi)) return bufs.get(midi);
  const sr = ctx.sampleRate, f = 440 * Math.pow(2, (midi - 69) / 12), N = Math.max(2, Math.round(sr / f));
  const n = Math.floor(sr * 2.6), buf = ctx.createBuffer(1, n, sr), d = buf.getChannelData(0);
  const ring = new Float32Array(N);
  let last = 0;
  for (let i = 0; i < N; i++) { last = last * 0.55 + (Math.random() * 2 - 1) * 0.45; ring[i] = last; }
  let p = 0, peak = 0;
  for (let i = 0; i < n; i++) {
    const nx = (p + 1) % N;
    d[i] = ring[p];
    ring[p] = 0.4985 * (ring[p] + ring[nx]);
    p = nx;
    peak = Math.max(peak, Math.abs(d[i]));
  }
  for (let i = 0; i < n; i++) d[i] /= peak;
  bufs.set(midi, buf);
  return buf;
}

class GuitarTab extends HTMLElement {
  set data(d) { this._d = d; this.stop(); this.build(); }
  connectedCallback() {
    this._ro = new ResizeObserver(() => {
      const w = Math.round(this.clientWidth);
      if (this._d && w && w !== this._w) { this._w = w; clearTimeout(this._rt); this._rt = setTimeout(() => this.draw(), 80); }
    });
    this._ro.observe(this);
  }
  disconnectedCallback() { this.stop(); this._ro?.disconnect(); }

  build() {
    const d = this._d;
    let tw = 0;
    this._beats = [];
    this._kinds = d.m.map(m => {
      let mx = 0, strum = false;
      m.b.forEach(b => { mx = Math.max(mx, b.n.length); if (b.st) strum = true; });
      return mx >= 3 || strum ? "rs" : "pk";
    });
    // orden de reproducción con repeticiones expandidas
    const seq = []; let st = 0;
    d.m.forEach((m, mi) => {
      if (m.rs) st = mi;
      seq.push(mi);
      if (m.rp) { for (let r = 1; r < m.rp; r++) for (let j = st; j <= mi; j++) seq.push(j); st = mi + 1; }
    });
    this._seq = seq;
    seq.forEach(mi => d.m[mi].b.forEach((b, i) => {
      this._beats.push({ m: mi, i, b, t: tw * 240 / d.bpm, dur: durOf(b) * 240 / d.bpm, k: mi + "-" + i });
      tw += durOf(b);
    }));
    this._total = tw * 240 / d.bpm;
    this._tempo = this._tempo || { def: d.bpm };
    this.innerHTML = `
      <div class="rack">
        <button class="gt-play" title="Reproducir / pausar">▶</button>
        <button class="gt-rew" title="Volver al inicio">⏮</button>
        <div class="lcd"><b class="gt-bpm"></b><small>BPM</small></div>
        <div class="step"><button class="gt-up" title="Más rápido">+</button><button class="gt-dn" title="Más lento">−</button></div>
        <input class="gt-tempo" type="range" min="30" max="240" value="${this._tempo.def}">
        <button class="gt-orig" title="Tempo de la grabación">↺ ${this._tempo.def}</button>
        <label><input class="gt-loop" type="checkbox" checked> repetir</label>
        <label><input class="gt-met" type="checkbox"> metrónomo</label>
        <label><input class="gt-rhy" type="checkbox" checked> ritmo</label>
      </div>
      <p class="gt-legend">H hammer-on · P pull-off · / slide · (n) ligada · x muteada · fondo rojizo = rasgueo · toca un compás para empezar desde ahí</p>
      <div class="gt-score"></div>`;
    this.q = s => this.querySelector(s);
    this.q(".gt-play").onclick = () => this._playing ? this.pause() : this.play(this._from ?? 0);
    this.q(".gt-rew").onclick = () => { this._from = 0; const was = this._playing; this.stop(); this._mark(-1); if (was) this.play(0); };
    const sl = this.q(".gt-tempo"), set = v => { sl.value = Math.max(30, Math.min(240, v)); this.setBpm(+sl.value); };
    sl.oninput = () => set(+sl.value);
    this.q(".gt-up").onclick = () => set(+sl.value + 2);
    this.q(".gt-dn").onclick = () => set(+sl.value - 2);
    this.q(".gt-orig").onclick = () => set(this._tempo.def);
    this.q(".gt-rhy").onchange = () => this.draw();
    this.setBpm(this._tempo.def);
    this._w = Math.round(this.clientWidth);
    this.draw();
  }

  set tempo(t) { this._tempo = t; }
  setBpm(v) {
    this.q(".gt-bpm").textContent = v;
    const r = v / this._d.bpm;
    if (this._playing) { const now = AC.currentTime, song = (now - this._t0) * this._rate; this._rate = r; this._t0 = now - song / r; this._nextClick = Math.ceil(song / (60 / this._d.bpm)); }
    this._rate = r;
  }

  draw() {
    const d = this._d, W = Math.max(360, (this.clientWidth || 900) - 24), avail = W - LAB - 8;
    const showR = this.q(".gt-rhy").checked;
    const ms = d.m.map((m, mi) => {
      const bw = m.b.map(bwOf);
      return { mi, bw, w: 16 + bw.reduce((a, c) => a + c, 0) + 6 };
    });
    const rows = []; let cur = [], sum = 0;
    ms.forEach(m => { if (cur.length && sum + m.w > avail) { rows.push(cur); cur = []; sum = 0; } cur.push(m); sum += m.w; });
    if (cur.length) rows.push(cur);
    const labels = d.tuning.map((m, i) => i ? NAMES[m % 12] : NAMES[m % 12].toLowerCase());
    this._pos = {};
    const html = rows.map((row, ri) => {
      const tot = row.reduce((a, m) => a + m.w, 0);
      let s = avail / tot; s = ri === rows.length - 1 && tot < avail * 0.7 ? 1 : Math.max(0.55, Math.min(1.4, s));
      let out = "", x = LAB;
      for (let i = 0; i < 6; i++) out += S("line", { class: "str", x1: LAB - 6, x2: LAB + tot * s, y1: TOP + i * LG, y2: TOP + i * LG, "stroke-width": 1 + i * 0.28 });
      out += S("line", { class: "bar", x1: LAB - 6, x2: LAB - 6, y1: TOP, y2: BASEY });
      labels.forEach((l, i) => out += S("text", { class: "lab", x: 30, y: TOP + i * LG + 4 }, l));
      out += S("text", { class: "tabw", x: 12, y: TOP + 3 * LG, transform: `rotate(-90 12 ${TOP + 2.5 * LG})` }, "TAB");
      let ov = "", pend = "";
      row.forEach(m => {
        const mi = m.mi, kind = this._kinds[mi], mw = m.w * s, mb = d.m[mi].b;
        out += S("rect", { class: `mrect ${kind}`, "data-m": mi, x, y: TOP - 40, width: mw, height: BASEY - TOP + 90 });
        out += S("text", { class: "mn", x: x + 6, y: TOP - 46 }, d.m[mi].n ?? mi + 1 + (d.off || 0));
        out += S("text", { class: `kind ${kind}`, x: x + 24, y: TOP - 46 }, kind === "pk" ? "PUNTEO" : "RASGUEO");
        if (mi && d.m[mi].sig && JSON.stringify(d.m[mi].sig) !== JSON.stringify(d.m[mi - 1].sig) || mi === 0)
          out += S("text", { class: "mn", x: x + mw - 8, y: TOP - 46, "text-anchor": "end" }, `${d.m[mi].sig[0]}/${d.m[mi].sig[1]}`);
        out += S("line", { class: "bar", x1: x + mw, x2: x + mw, y1: TOP, y2: BASEY });
        if (d.m[mi].rs) out += S("line", { class: "bar", x1: x + 4, x2: x + 4, y1: TOP, y2: BASEY }) + [1.5, 3.5].map(i => S("circle", { cx: x + 10, cy: TOP + i * LG, r: 2.2, fill: "currentColor" })).join("");
        if (d.m[mi].rp) {
          out += S("line", { class: "bar", x1: x + mw - 4, x2: x + mw - 4, y1: TOP, y2: BASEY }) + [1.5, 3.5].map(i => S("circle", { cx: x + mw - 10, cy: TOP + i * LG, r: 2.2, fill: "currentColor" })).join("");
          out += S("text", { class: "rpt", x: x + mw - 6, y: TOP - 14, "text-anchor": "end" }, `×${d.m[mi].rp}`);
        }
        let cx = x + 16 * s; const xs = [];
        mb.forEach((b, i) => { const w = m.bw[i] * s; xs.push(cx + w / 2); cx += w; });
        const fl = mb.map(flagsOf);
        let trip = 0;
        mb.forEach((b, i) => {
          const bx = xs[i], k = mi + "-" + i;
          this._pos[k] = { row: ri, x: bx };
          let g = "";
          if (b.c) g += S("text", { class: "chord", x: bx - 8, y: TOP - 32 }, b.c);
          if (b.pm) g += S("text", { class: "pm", x: bx - 9, y: BASEY + 18 }, "P.M.");
          b.n.forEach(([str, fret, flag]) => {
            const y = TOP + str * LG, txt = fret === "x" ? "x" : flag.includes("g") ? `(${fret})` : flag.startsWith("~") ? `(${fret})` : String(fret);
            const w = txt.length > 2 ? 32 : txt.length > 1 ? 27 : 22;
            g += S("g", {}, S("rect", { class: "pill", x: bx - w / 2, y: y - 9, width: w, height: 18, rx: 3, ...(flag.startsWith("~") ? { "stroke-dasharray": "3 2" } : {}) }) + S("text", { class: "fr", x: bx, y }, txt));
            const nxt = this._findNext(mi, i, str);
            if (nxt && (flag === "hp" || flag === "/")) {
              const nb = ms.find(q => q.mi === nxt.m), nrow = row.includes(nb);
              if (nrow) {
                const nx = this._xOf(row, x, s, ms, nxt);
                if (flag === "hp") {
                  g += S("path", { class: "arc", d: `M${bx + 4} ${y - 11} Q${(bx + nx) / 2} ${y - 30} ${nx - 4} ${y - 11}` }) +
                    S("text", { class: "arcl", x: (bx + nx) / 2, y: y - 22 }, nxt.f > fret ? "H" : "P");
                } else g += S("line", { class: "sl", x1: bx + 13, y1: y + (nxt.f > fret ? 5 : -5), x2: nx - 13, y2: y + (nxt.f > fret ? -5 : 5) });
              }
            }
          });
          if (!b.n.length) g += S("path", { class: "rest", d: `M${bx - 3} ${TOP + 2 * LG - 8}l6 5 -6 5 6 5` });
          if (showR) {
            const y0 = BASEY + 12, y1 = y0 + 22;
            g += S("line", { class: "stem", x1: bx, x2: bx, y1: y0, y2: y1 });
            if (b.dot) g += S("circle", { cx: bx + 6, cy: y1 - 4, r: 1.8, fill: "#a79cc4" });
            if (b.t) { if (trip % 3 === 0) g += S("text", { class: "mn", x: bx + 14, y: y1 + 10, "text-anchor": "middle" }, "3"); trip++; } else trip = 0;
            if (b.st) g += S("text", { class: "stroke", x: bx, y: y1 + 22 }, b.st === "d" ? "↓" : "↑");
          }
          out += S("g", { class: "beat", "data-k": k }, g);
        });
        if (showR) {
          const y1 = BASEY + 34;
          for (let lvl = 1; lvl <= 3; lvl++) {
            mb.forEach((b, i) => {
              if (fl[i] < lvl) return;
              const y = y1 - (lvl - 1) * 5.5;
              if (fl[i + 1] >= lvl) out += S("line", { class: "beam", x1: xs[i], x2: xs[i + 1], y1: y, y2: y });
              else if (!(i && fl[i - 1] >= lvl)) out += S("line", { class: "beam", x1: xs[i], x2: xs[i] + 9, y1: y, y2: y });
            });
          }
        }
        x += mw;
      });
      out += S("line", { class: "ph", x1: 0, x2: 0, y1: TOP - 28, y2: BASEY + 30 });
      return S("svg", { class: "gt-row", viewBox: `0 0 ${W} ${ROWH}`, "data-r": ri }, out);
    }).join("");
    const sc = this.q(".gt-score"); sc.innerHTML = html;
    sc.onclick = e => { const r = e.target.closest?.(".mrect"); if (r) { this._from = +r.dataset.m; const was = this._playing; this.stop(); this.play(this._from); } };
    this._els = {};
    sc.querySelectorAll(".beat").forEach(el => this._els[el.dataset.k] = el);
    if (this._hi >= 0 && this._beats[this._hi]) this._mark(this._hi);
  }

  _findNext(mi, i, str) {
    const ms = this._d.m;
    for (let m = mi, j = i + 1; m < Math.min(ms.length, mi + 2); m++, j = 0) {
      for (; j < ms[m].b.length; j++) { const n = ms[m].b[j].n.find(q => q[0] === str); if (n) return { m, i: j, f: n[1] }; }
      if (m === mi) continue;
    }
    return null;
  }
  _xOf(row, x0, s, ms, t) {
    let x = LAB;
    for (const m of row) {
      if (m.mi === t.m) { let cx = x + 16 * s; for (let i = 0; i < t.i; i++) cx += m.bw[i] * s; return cx + m.bw[t.i] * s / 2; }
      x += m.w * s;
    }
    return x;
  }

  _mark(hi) {
    if (this._on) this._on.classList.remove("on");
    this.querySelectorAll(".mrect.cur").forEach(e => e.classList.remove("cur"));
    this.querySelectorAll(".ph").forEach(e => e.style.opacity = 0);
    this._hi = hi;
    const ev = this._beats[hi]; if (!ev) return;
    const el = this._els?.[ev.k]; this._on = el;
    if (!el) return;
    el.classList.add("on");
    this.querySelector(`.mrect[data-m="${ev.m}"]`)?.classList.add("cur");
    const p = this._pos[ev.k], svg = el.closest("svg"), ph = svg.querySelector(".ph");
    ph.setAttribute("x1", p.x); ph.setAttribute("x2", p.x); ph.style.opacity = .55;
    if (this._playing && this._row !== p.row) { this._row = p.row; svg.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
  }

  play(fromM) {
    AC ||= new (window.AudioContext || window.webkitAudioContext)();
    AC.resume();
    let idx = this._beats.findIndex(e => e.m >= fromM && e.b.n.length); if (idx < 0) idx = 0;
    if (this._paused != null && this._from === fromM && this._paused >= 0) idx = this._paused;
    this._paused = null;
    this._next = idx; this._hi = idx - 1;
    this._t0 = AC.currentTime + 0.08 - this._beats[idx].t / this._rate;
    this._nextClick = Math.ceil(this._beats[idx].t / (60 / this._d.bpm) - 1e-6);
    this._playing = true; this._row = -1;
    this.q(".gt-play").textContent = "⏸";
    clearInterval(this._timer); this._timer = setInterval(() => this._sched(), 25);
    const loop = () => {
      if (!this._playing) return;
      const now = AC.currentTime, b = this._beats;
      let hi = this._hi;
      while (hi + 1 < b.length && this._t0 + b[hi + 1].t / this._rate <= now) hi++;
      if (hi !== this._hi && hi >= 0) this._mark(hi);
      this._raf = requestAnimationFrame(loop);
    };
    cancelAnimationFrame(this._raf); loop();
  }
  _sched() {
    const b = this._beats, now = AC.currentTime, qd = 60 / this._d.bpm;
    if (this.q(".gt-met").checked) {
      for (let tc = this._t0 + this._nextClick * qd / this._rate; tc < now + 0.18 && this._nextClick * qd < this._total; tc = this._t0 + ++this._nextClick * qd / this._rate) {
        if (tc < now - 0.02) continue;
        const o = AC.createOscillator(), g = AC.createGain(), strong = this._nextClick % Math.max(1, this._d.m[0].sig?.[0] === 6 ? 3 : 1) === 0;
        o.frequency.value = strong ? 1500 : 1000; g.gain.setValueAtTime(0.18, tc); g.gain.exponentialRampToValueAtTime(0.001, tc + 0.05);
        o.connect(g).connect(AC.destination); o.start(tc); o.stop(tc + 0.06);
      }
    } else this._nextClick = Math.ceil(((now - this._t0) * this._rate) / qd);
    while (this._next < b.length && this._t0 + b[this._next].t / this._rate < now + 0.18) { this._ring(b[this._next], this._t0 + b[this._next].t / this._rate); this._next++; }
    if (this._next >= b.length && now > this._t0 + this._total / this._rate) {
      if (this.q(".gt-loop").checked) { const was = this._from ?? 0; this.stop(); this.play(was); } else { this.stop(); this._mark(-1); }
    }
  }
  _ring(ev, t) {
    const ns = ev.b.n.filter(n => n[1] !== "x" && !n[2].startsWith("~"));
    ns.forEach((n, j) => {
      const midi = this._d.tuning[n[0]] + n[1], src = AC.createBufferSource(), g = AC.createGain();
      src.buffer = pluck(AC, midi);
      const at = t + (ev.b.n.length > 2 ? j * 0.012 : 0), v = 0.42 / Math.sqrt(Math.max(1, ns.length));
      g.gain.setValueAtTime(v, at);
      const hold = Math.max(ev.dur / this._rate, 0.25) + 0.5;
      g.gain.setValueAtTime(v, at + hold); g.gain.linearRampToValueAtTime(0, at + hold + 0.5);
      src.connect(g).connect(AC.destination); src.start(at); src.stop(at + hold + 0.55);
    });
  }
  pause() { this._paused = Math.max(0, this._hi); this._from = this._beats[this._paused]?.m ?? 0; this._halt(); }
  stop() { this._paused = null; this._halt(); }
  _halt() {
    this._playing = false; clearInterval(this._timer); cancelAnimationFrame(this._raf);
    const p = this.querySelector?.(".gt-play"); if (p) p.textContent = "▶";
  }
}
customElements.define("guitar-tab", GuitarTab);
})();
