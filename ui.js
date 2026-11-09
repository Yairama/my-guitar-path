const DIFF = ["", "Muy fácil", "Fácil", "Media", "Difícil", "Experta"];
const STAT = ["Por aprender", "Aprendiendo", "Dominada"];
const NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
/* bpm = tempo de reproducción (negras, en las unidades de la tab). src: g = medido en la grabación (Deezer) · t = tempo escrito en la tab */
const TEMPO = { boda2: [115, "t"], ella2: [150, "t"], nadie2: [180, "t"], marlboro2: [150, "t"], nadie: [165, "t"], ella: [150, "t"], marlboro: [150, "t"], babydoll: [84, "t"], payaso: [140, "t"], wonder: [87, "g"], nem: [71, "t"], regresa: [124, "t"], mirlos: [92, "t"], "7w3d": [130, "t"], knee: [98, "g"], love: [160, "t"], malpaso: [118, "t"], huye: [144, "g"], nada: [138, "g"], canete: [150, "t"], rsc: [135, "g"], dowant: [85, "g"], jack: [170, "t"], evergreen: [117, "t"] };
SONGS.forEach(s => { const t = TEMPO[s.id]; if (t) { s.bpm = t[0]; s.src = t[1]; } });
const srcTxt = s => s.src === "g" ? "medido en la grabación" : "según la tab";

const store = JSON.parse(localStorage.getItem("gw2") || "{}");
const rec = id => store[id] ??= { status: 0, notes: "", ascii: "" };
const save = () => localStorage.setItem("gw2", JSON.stringify(store));
const diffOf = s => rec(s.id).diff ?? s.diff;
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const yt = q => /^https?:/.test(q) ? q : "https://www.youtube.com/results?search_query=" + encodeURIComponent(q);
const dots = n => `<span class="dots" title="${DIFF[n]}">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= n ? "f" : ""}"></i>`).join("")}</span>`;

const app = document.getElementById("app"), q = document.getElementById("q");
const F = { st: "all", d: 0, k: "t", asc: true };
const pad = n => String(n).padStart(2, "0");

const incomplete = id => { const t = window.TABS?.[id]; return !!t && (t.m.length < t.total || !!t.inc); };
function home() {
  const total = SONGS.length, done = SONGS.filter(s => rec(s.id).status === 2).length, learning = SONGS.filter(s => rec(s.id).status === 1).length;
  const term = q.value.trim().toLowerCase();
  const list = SONGS.filter(s => (s.title + " " + s.artist + " " + (s.genre || "")).toLowerCase().includes(term))
    .filter(s => F.st === "all" || rec(s.id).status == F.st).filter(s => !F.d || diffOf(s) == F.d);
  const key = { n: s => SONGS.indexOf(s), t: s => s.title, a: s => s.artist, b: s => s.bpm ?? -1, d: s => diffOf(s), s: s => rec(s.id).status };
  list.sort((x, y) => { const a = key[F.k](x), b = key[F.k](y); const r = typeof a === "string" ? a.localeCompare(b) : a - b; return F.asc ? r : -r; });
  const th = (k, l, cls = "") => `<th data-k="${k}" class="${cls} ${F.k === k ? "on" + (F.asc ? " asc" : "") : ""}">${l}</th>`;
  app.innerHTML = `
  <section class="mast"><div><div class="eyebrow">Cancionero personal · tablaturas propias</div><h1>Lo que estoy<br>aprendiendo a <em>tocar</em></h1></div>
   <div class="ledger"><b>${total}</b> piezas<br>${learning} en estudio · ${done} dominadas<div class="prog"><i style="width:${100 * done / total}%"></i></div></div></section>
  <div class="filters">
   <div class="g"><span class="lb">Estado</span>${["all", 0, 1, 2].map(v => `<button class="lk ${F.st == v ? "on" : ""}" data-st="${v}">${v === "all" ? "Todas" : STAT[v]}</button>`).join("")}</div>
   <div class="g"><span class="lb">Dificultad</span><button class="lk ${!F.d ? "on" : ""}" data-d="0">Todas</button>${[1, 2, 3, 4, 5].map(n => `<button class="dfil ${F.d == n ? "on" : ""}" data-d="${n}" title="${DIFF[n]}">${dots(n)}</button>`).join("")}</div>
   <div class="sp"></div><span class="lb">${list.length} resultado${list.length === 1 ? "" : "s"}</span></div>
  ${list.length ? `<table class="idx"><thead><tr>${th("n", "#")}${th("t", "Pieza")}${th("a", "Artista", "hm")}${th("b", "Tempo")}${th("d", "Dificultad")}${th("s", "Estado")}<th class="hm">Tab</th></tr></thead><tbody>
  ${list.map((s, i) => { const r = rec(s.id), has = !!window.TABS?.[s.id]; return `<tr data-id="${s.id}"><td class="n">${pad(SONGS.indexOf(s) + 1)}</td>
   <td><div class="t">${esc(s.title)}</div><div class="a">${esc(s.genre)}</div></td><td class="a hm">${esc(s.artist)}</td>
   <td class="bpm">${s.bpm ? `${s.bpm} <small>bpm</small>` : "—"}</td><td>${dots(diffOf(s))}</td>
   <td><span class="stamp s${r.status}">${STAT[r.status]}</span></td><td class="tabk hm ${has ? "y" : ""} ${incomplete(s.id) ? "inc" : ""}">${has ? (incomplete(s.id) ? "⚠ incompleta" : "♪ tab") : "pendiente"}</td></tr>`; }).join("")}</tbody></table>` : `<div class="none">Nada con esos filtros.</div>`}`;
  app.querySelectorAll("[data-st]").forEach(b => b.onclick = () => { F.st = b.dataset.st; home(); });
  app.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { F.d = +b.dataset.d; home(); });
  app.querySelectorAll("th[data-k]").forEach(h => h.onclick = () => { F.asc = F.k === h.dataset.k ? !F.asc : true; F.k = h.dataset.k; home(); });
  app.querySelectorAll("tbody tr").forEach(c => c.onclick = () => location.hash = "#/" + c.dataset.id);
}

function detail(id) {
  const s = SONGS.find(x => x.id === id); if (!s) return home();
  const r = rec(id), t = window.TABS?.[id], a = t && analyze(t), d = diffOf(s); OFF = t?.off || 0;
  const cell = (k, v, sub = "") => v || v === 0 ? `<div><span>${k}</span><b>${esc(v)}</b>${sub ? `<small>${sub}</small>` : ""}</div>` : "";
  const ribbon = a ? a.runs.map(x => `<i class="${x.k === "rs" ? "rs" : ""}" style="flex:${x.e - x.s + 1}">${x.k === "pk" ? "PUNTEO" : "RASGUEO"}</i>`).join("") : "";
  const order = (() => {
    if (!t || !t.m.some(m => m.rp)) return "";
    const seg = []; let st = 0;
    t.m.forEach((m, i) => { if (m.rs && i > st) { seg.push([st, i - 1, 1]); st = i; } if (m.rp) { seg.push([st, i, m.rp]); st = i + 1; } });
    if (st < t.m.length) seg.push([st, t.m.length - 1, 1]);
    return seg.map(([s0, e0, n]) => `${s0 === e0 ? "c." + (s0 + 1) : "c." + (s0 + 1) + "–" + (e0 + 1)}${n > 1 ? ` <b>×${n}</b>` : ""}`).join(" → ");
  })();
  const frag = t ? `Fragmento: compases ${1 + (t.off || 0)}–${t.m.length + (t.off || 0)} de ${t.total}` : "";
  app.innerHTML = `
  <a class="crumb" href="#/">← Índice</a>
  <section class="head"><div class="eyebrow">${esc(s.genre)}${s.year ? " · " + s.year : ""}</div><h1>${esc(s.title)}</h1><div class="by">${esc(s.artist)}</div>${incomplete(s.id) ? `<div class="incb">⚠ Tab incompleta · ${t.m.length < t.total ? `faltan ${t.total - t.m.length} de ${t.total} compases` : "versión parcial"}</div>` : ""}
   <div class="links"><a class="yt" target="_blank" rel="noopener" href="${yt(s.yt)}">Escuchar en YouTube</a><a class="yt" target="_blank" rel="noopener" href="${yt(s.ytLesson)}">Tutorial</a>
   <span class="sp"></span><select id="st">${STAT.map((n, i) => `<option value="${i}" ${r.status === i ? "selected" : ""}>${n}</option>`).join("")}</select></div></section>
  <div class="strip">${cell("Tempo", s.bpm ? s.bpm + " bpm" : "", s.bpm ? srcTxt(s) : "")}${cell("Dificultad", DIFF[d])}${a ? cell("Afinación", a.std ? "Estándar" : a.tun, a.tun) : ""}${a ? cell("Compás", a.sigs.join(" · ")) : ""}${a ? cell("Mástil", a.min === a.max ? "traste " + a.min : `trastes ${a.min}–${a.max}`) : ""}</div>
  <div class="cols"><div>
   ${a ? `<div class="sec"><h2><span class="rn">I.</span>Punteo o rasgueo</h2><div class="sub">Primeros ${a.n} compases</div>
     <div class="ribbon">${ribbon}</div>
     <ul class="how">${a.runs.map(x => `<li><b class="${x.k}">${x.k === "pk" ? "Punteo" : "Rasgueo"} · ${rangeTxt(x)}</b><span>${x.k === "pk" ? "Notas sueltas o arpegio: una o dos cuerdas a la vez." : "Varias cuerdas juntas: acordes y rasgueo."}</span></li>`).join("")}</ul>
     ${a.chords.length ? `<div class="chords">${a.chords.map(c => `<span>${esc(c)}</span>`).join("")}</div>` : ""}
     <div class="tech">${[["hammer/pull-off", a.hp], ["slides", a.sl], ["muteadas", a.dead], ["palm mute", a.pm], ["ligaduras", a.tie]].filter(x => x[1]).map(x => `<b>${x[1]}</b> ${x[0]}`).join(" · ")}</div></div>` : ""}
   <div class="sec"><h2><span class="rn">${a ? "II." : "I."}</span>Tablatura</h2><div class="sub">${a ? "Pista: " + esc(t.track || "guitarra") + " · " + (t.label || frag) + " · clic en un compás para saltar" : ""}</div>
     ${order ? `<div class="order"><span>Orden de ejecución</span>${order}</div>` : ""}
     ${t ? (t.note ? `<div class="frag">${esc(t.note)}</div>` : `<div class="frag">Esta es solo la <b>sección inicial</b> de la pieza (${t.m.length} de ${t.total} compases). La reproducción respeta las repeticiones (‖: :‖ ×n). Para el resto de la canción usa «Pegar tab en texto» o el tutorial de YouTube.</div>`) : ""}
     ${t ? `<guitar-tab id="gt"></guitar-tab>` : `<div class="pending">Aún no hay tablatura para esta pieza.<br>Pega la tuya abajo en texto y se mostrará aquí.</div>`}
     <details ${r.ascii && !t ? "open" : ""}><summary>${t ? "Añadir mi propia tab en texto" : "Pegar tab en texto"}</summary>
       <textarea class="ascii" id="asc" spellcheck="false" placeholder="e|---0---|&#10;B|---1---|&#10;G|---0---|">${esc(r.ascii)}</textarea></details>
     ${r.ascii ? `<pre class="ascii" style="margin-top:12px">${esc(r.ascii)}</pre>` : ""}</div>
   <div class="sec"><h2><span class="rn">${a ? "III." : "II."}</span>Mis notas</h2><div class="sub">Se guardan en este navegador</div><textarea class="notes" id="nt" placeholder="Pasajes difíciles, digitaciones, bpm objetivo…">${esc(r.notes)}</textarea></div>
  </div><aside><div class="sec"></div>
   <div class="box"><h3>Ficha</h3>
    <div class="kv"><span>Artista</span><b>${esc(s.artist)}</b></div>${s.album ? `<div class="kv"><span>Álbum</span><b>${esc(s.album)}</b></div>` : ""}${s.year ? `<div class="kv"><span>Año</span><b>${s.year}</b></div>` : ""}
    <div class="kv"><span>Idioma</span><b>${esc(s.lang)}</b></div>${s.key ? `<div class="kv"><span>Tonalidad</span><b>${esc(s.key)}</b></div>` : ""}
    <div class="kv"><span>Dificultad</span><b>${dots(d)}</b></div>
    <input type="range" id="df" min="1" max="5" value="${d}" style="width:100%;margin-top:10px"></div>
   ${s.tips.length ? `<div class="box"><h3>Para aprenderla</h3><ol class="tips">${s.tips.map(x => `<li>${esc(x)}</li>`).join("")}</ol></div>` : ""}
  </aside></div><div style="height:60px"></div>`;
  window.scrollTo(0, 0);
  if (t) { const g = app.querySelector("#gt"); if (s.bpm) g.tempo = { def: s.bpm }; g.data = t; }
  app.querySelector("#st").onchange = e => { r.status = +e.target.value; save(); };
  app.querySelector("#nt").oninput = e => { r.notes = e.target.value; save(); };
  app.querySelector("#asc").onchange = e => { r.ascii = e.target.value; save(); detail(id); };
  app.querySelector("#df").onchange = e => { r.diff = +e.target.value; save(); detail(id); };
}

const root = document.documentElement;
if (localStorage.getItem("gwTheme") === "night") root.dataset.theme = "night";
const th = document.getElementById("th");
const thLbl = () => th.textContent = root.dataset.theme === "night" ? "Día" : "Noche";
th.onclick = () => { root.dataset.theme = root.dataset.theme === "night" ? "" : "night"; localStorage.setItem("gwTheme", root.dataset.theme || "day"); thLbl(); };
thLbl();

function route() { const id = location.hash.replace("#/", ""); id ? detail(id) : home(); }
addEventListener("hashchange", route);
q.oninput = () => { if (location.hash.length > 2) location.hash = "#/"; else home(); };
document.getElementById("brand").onclick = () => location.hash = "#/";
route();

document.addEventListener('keydown', e => { if (e.key !== 'Escape') return; document.querySelectorAll('guitar-tab').forEach(t => { if (t._playing) { t.stop(); t._mark(-1); } }); });
