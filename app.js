const SONGS = [
 {id:"nem",title:"Nothing Else Matters",artist:"Metallica",album:"Metallica (The Black Album)",year:1991,genre:"Metal · balada rock",lang:"Inglés",key:"Mi menor (Em)",
  yt:"Metallica Nothing Else Matters",ytLesson:"Nothing Else Matters guitarra tutorial intro",
  tips:["La intro es un arpegio sobre Em con cuerdas al aire: practícala lento (≈ 50 bpm) hasta que suene uniforme.","Pulgar en la cuerda 6; índice, medio y anular repartidos en las cuerdas agudas.","El solo usa la pentatónica de Mi menor con bends y vibrato: aprende primero la melodía sin adornos."],diff:3},
 {id:"regresa",title:"Regresa (versión guitarra)",artist:"Eva Ayllón",album:null,year:null,genre:"Vals criollo peruano",lang:"Español",key:null,
  yt:"Regresa Eva Ayllón guitarra",ytLesson:"Regresa Eva Ayllón guitarra tutorial",
  tips:["Partitura de Augusto Polo Campos (transcr. Alex Mendoza), ♩=124 en 3/4.","El motivo A es un patrón de 4 semicorcheas: ligado descendente en la 1.ª cuerda (10→8, pull-off) y luego las notas de las cuerdas 2 y 3.","El vals criollo se siente en 3 tiempos: acentúa el primer tiempo con el pulgar."],diff:5},
 {id:"mirlos",title:"La danza de los mirlos",artist:"Los Mirlos",album:null,year:null,genre:"Cumbia amazónica · psicodelia peruana",lang:"Instrumental",key:null,
  yt:"La danza de los mirlos Los Mirlos",ytLesson:"La danza de los mirlos guitarra tutorial",
  tips:["Sonido limpio con reverb y un poco de trémolo para el color «surf» amazónico.","Mantén el ritmo de cumbia con la mano derecha aunque toques melodía: el pulso no se debe adelantar."],diff:3},
 {id:"7w3d",title:"7 Weeks And 3 Days",artist:"yungatita",album:null,year:null,genre:"Indie · bedroom pop",lang:"Inglés",key:null,
  yt:"yungatita 7 weeks and 3 days",ytLesson:"7 weeks and 3 days yungatita guitar tutorial",tips:["Busca primero el patrón de arpegio y repítelo en bucle antes de aprender la melodía."],diff:3},
 {id:"wild",title:"Wild Flowers",artist:"Zoids",album:null,year:null,genre:"Anime OST",lang:"—",key:null,
  yt:"Zoids Wild Flowers",ytLesson:"Zoids Wild Flowers guitar tab",tips:[],diff:3},
 {id:"knee",title:"Knee Socks",artist:"Arctic Monkeys",album:"AM",year:2013,genre:"Indie rock",lang:"Inglés",key:null,
  yt:"Arctic Monkeys Knee Socks",ytLesson:"Knee Socks Arctic Monkeys guitar lesson",tips:["Groove relajado: no corras, deja respirar los silencios.","La Jazzmaster suena mejor con el tono ligeramente brillante y sin mucha distorsión."],diff:2},
 {id:"love",title:"Love Story",artist:"Indila",album:"Mini World",year:2014,genre:"Pop francés",lang:"Francés",key:null,
  yt:"Indila Love Story",ytLesson:"Indila Love Story guitarra fingerstyle tutorial",tips:["Versión fingerstyle: pulgar para los bajos, dedos para la melodía.","Usa una guitarra de cuerdas de nylon si puedes."],diff:2},
 {id:"malpaso",title:"Mal Paso",artist:"Eva Ayllón",album:null,year:null,genre:"Vals criollo peruano",lang:"Español",key:null,
  yt:"Mal Paso Eva Ayllón",ytLesson:"Mal Paso Eva Ayllón guitarra tutorial",tips:["Compás de 3/4: cuenta «UNO-dos-tres» con acento en el bajo."],diff:3},
 {id:"payaso",title:"Payaso",artist:"Cholo Berrocal",album:null,year:null,genre:"Música peruana",lang:"Español",key:null,
  yt:"Payaso Cholo Berrocal",ytLesson:"Payaso Cholo Berrocal guitarra tutorial",tips:[],diff:2},
 {id:"huye",title:"Huye de mí",artist:"Los Kipus",album:null,year:null,genre:"Música criolla peruana",lang:"Español",key:null,
  yt:"Huye de mí Los Kipus",ytLesson:"Huye de mi Los Kipus guitarra tutorial",tips:["Tab base de Eva Ayllón (homenaje a Los Kipus)."],diff:4},
 {id:"nada",title:"Nada soy",artist:"Los Kipus",album:null,year:null,genre:"Música criolla peruana",lang:"Español",key:null,
  yt:"Nada soy Los Kipus",ytLesson:"Nada soy Los Kipus guitarra tutorial",tips:["Cuidado con los cambios de compás al inicio."],diff:4},
 {id:"canete",title:"En Cañete",artist:"Los Hermanos Vargas",album:null,year:null,genre:"Vals criollo peruano",lang:"Español",key:null,
  yt:"En Cañete Los Hermanos Vargas",ytLesson:"En Cañete Los Hermanos Vargas guitarra tutorial",tips:["Dos guitarras en la grabación: la tab cargada es la guitarra principal (requinto/lead)."],diff:3},
 {id:"rsc",title:"Ritmo, sabor y color",artist:"Eva Ayllón",album:null,year:null,genre:"Música afroperuana / criolla",lang:"Español",key:null,
  yt:"Ritmo color y sabor Eva Ayllón",ytLesson:"Ritmo color y sabor Eva Ayllón guitarra",tips:["La tab de origen indica que no es perfecta: compara con el audio."],diff:3},
 {id:"dowant",title:"Do I Wanna Know?",artist:"Arctic Monkeys",album:"AM",year:2013,genre:"Indie · garage rock",lang:"Inglés",key:null,
  yt:"Arctic Monkeys Do I Wanna Know",ytLesson:"Do I Wanna Know guitar lesson riff",tips:["El riff principal se apoya en ligados (hammer-ons): mantén los dedos pegados al mástil.","Practica el cambio de cuerda con púa en dirección abajo-arriba constante."],diff:3},
 {id:"jack",title:"Hit the Road Jack",artist:"Ray Charles",album:"The Genius Sings the Blues (sencillo)",year:1961,genre:"R&B · soul",lang:"Inglés",key:"La menor (Am)",
  yt:"Ray Charles Hit the Road Jack",ytLesson:"https://www.youtube.com/shorts/F4mWcbGBOd0",tips:["Riff de bajo en la 6.ª cuerda: La (5) – Sol (3) – Fa (1) – Mi (0) = Am G F E, luego Am F E Am.","Los muteos (x) se hacen apoyando la palma/dedos sobre las cuerdas para que suene un golpe seco entre nota y nota.","Versión de melodía a una sola cuerda (punteo): primero aprende la línea, luego añade el acompañamiento.","Escrita por Percy Mayfield."],diff:2},
 {id:"evergreen",title:"Evergreen",artist:"Richy Mitch & The Coal Miners",album:null,year:null,genre:"Indie folk",lang:"Inglés",key:null,
  yt:"Richy Mitch and The Coal Miners Evergreen",ytLesson:"Evergreen Richy Mitch guitar tutorial",tips:["Algunas versiones están en Re estándar: revisa la afinación del arreglo que uses."],diff:2}
];

/* análisis automático de la tab */
function analyze(t) {
  const m = t.m, kinds = m.map(x => { let mx = 0, st = false; x.b.forEach(b => { mx = Math.max(mx, b.n.length); if (b.st) st = true; }); return mx >= 3 || st ? "rs" : "pk"; });
  const runs = []; kinds.forEach((k, i) => { const l = runs[runs.length - 1]; if (l && l.k === k) l.e = i + 1; else runs.push({ k, s: i + 1, e: i + 1 }); });
  const frets = [], chords = new Set(); let open = 0, notes = 0, hp = 0, sl = 0, dead = 0, pm = 0, tie = 0;
  m.forEach(x => x.b.forEach(b => {
    if (b.c) chords.add(b.c); if (b.pm) pm++;
    b.n.forEach(([s, f, fl]) => { notes++; if (f === "x") dead++; else { frets.push(f); if (f === 0) open++; } if (fl.startsWith("hp")) hp++; if (fl.startsWith("/")) sl++; if (fl.startsWith("~")) tie++; });
  }));
  const sigs = [...new Set(m.map(x => x.sig?.join("/")))].filter(Boolean);
  const tun = t.tuning.slice().reverse().map(x => NAMES[x % 12]).join(" ");
  const std = t.tuning.join() === "64,59,55,50,45,40";
  return { runs, chords: [...chords], min: Math.min(...frets), max: Math.max(...frets), open: Math.round(100 * open / Math.max(1, notes)), hp, sl, dead, pm, tie, sigs, tun, std, bpm: t.bpm, n: m.length };
}
const rangeTxt = r => r.s === r.e ? `Compás ${r.s + OFF}` : `Compases ${r.s + OFF}–${r.e + OFF}`;
let OFF = 0;


