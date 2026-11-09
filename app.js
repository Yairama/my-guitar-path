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
 {id:"malpaso",title:"Mal Paso", artist:"Luis Abelardo Núñez (versión Eva Ayllón)",album:null,year:null,genre:"Vals criollo peruano",lang:"Español",key:"Do menor",
   yt:"Mal Paso Eva Ayllón",ytLesson:"Mal Paso Eva Ayllón guitarra tutorial",tips:["Compás de 3/4: cuenta «UNO-dos-tres» con acento en el bajo.","Mucha melodía en dobles cuerdas (terceras/sextas) en las cuerdas 1–2 con bajo en 3/4.","La partitura original tiene D.S. al coda y repeticiones; aquí está escrita lineal."],diff:4},
 {id:"payaso",title:"Payaso",artist:"Cholo Berrocal",album:null,year:null, genre:"Vals peruano",lang:"Español",key:"La menor",
   yt:"Payaso Cholo Berrocal",ytLesson:"Payaso Cholo Berrocal guitarra tutorial",tips:["Versión de la Academia Hito (♩=140): la guitarra melodía va en posición alta, trastes 7–15.","La «armonía» es otra guitarra: bajo + dos acordes por compás (vals en 3 tiempos).","Los finales de frase se hacen con ligado descendente (10→8) sobre acordes de dos notas."],diff:3},
  {id:"babydoll",title:"Babydoll",artist:"Dominic Fike",album:"Sunburn",year:2020,genre:"Indie · pop alternativo",lang:"Inglés",key:"Re menor",
  yt:"Dominic Fike Babydoll",ytLesson:"Dominic Fike Babydoll guitar tutorial",tips:["Acordes Dm y Gm con cejilla (traste 5 y 3): practica el cambio sin perder el pulso.","Golpes cortos (staccato) con la mano izquierda relajada y muteadas entre golpes.","Tempo lento primero (≈ 60 bpm) hasta que el patrón de semicorcheas sea parejo."],diff:3},
 {id:"ella",title:"Ella baila sola",artist:"Eslabon Armado, Peso Pluma",album:null,year:2022,genre:"Regional mexicano",lang:"Español",key:null,
  yt:"Eslabon Armado Peso Pluma Ella baila sola",ytLesson:"Ella baila sola guitarra tutorial",tips:["Es una versión de guitarra estándar; en la grabación también hay requinto y docerola, que suenan en otra octava.","Empieza con una anacrusa en 3/8 y luego pasa a 3/4: cuenta el compás de entrada antes de arrancar.","Practica a ≈ 100 bpm antes de llegar a 150."],diff:3},
 {id:"marlboro",title:"Marlboro Rojo",artist:"Fuerza Regida",album:null,year:2023,genre:"Regional mexicano",lang:"Español",key:null,
  yt:"Fuerza Regida Marlboro Rojo",ytLesson:"Marlboro Rojo Fuerza Regida guitarra tutorial",tips:["El patrón es de corcheas constantes: mantén la mano derecha pareja.","Los compases con tresillos y notas más largas son los más difíciles: practícalos por separado."],diff:3},
 {id:"marlboro2",title:"Marlboro Rojo (riff en tab)",artist:"Fuerza Regida",album:null,year:2023,genre:"Regional mexicano",lang:"Español",key:null,
  yt:"Fuerza Regida Marlboro Rojo",ytLesson:"Marlboro Rojo Fuerza Regida guitarra tutorial",tips:["Sección 1: dobles notas en las cuerdas 1 y 2, deslizando hacia abajo entre grupos (se repite ×2).","Después viene una carrera de corcheas bajando de octava (E E E F# G) en las cuerdas G, A y E.","Luego el mismo patrón de dobles notas en las cuerdas 3 y 4, y una carrera final más larga.","El ritmo no viene en la tab ASCII; escucha la canción para ajustarlo."],diff:3},
 {id:"nadie2",title:"Que nadie sepa mi sufrir (partitura)",artist:"Julio Jaramillo / Daniel Guamán",album:null,year:null,genre:"Vals criollo",lang:"Español",key:"Do menor",
  yt:"Julio Jaramillo Que nadie sepa mi sufrir",ytLesson:"Que nadie sepa mi sufrir guitarra melodía tutorial",tips:["Vals lento-ágil en 3/4 (♩=180) en Do menor: Cm, Fm, G7, B♭, E♭, A♭.","Esta tab es solo la melodía de la partitura; los acordes van indicados arriba de cada compás.","La estructura: intro (c.1–2), tema con segno en c.3, sección con repeticiones y D.S. al Coda."],diff:3},
 {id:"ella2",title:"Ella baila sola (riff en tab)",artist:"Peso Pluma & Eslabon Armado",album:null,year:2023,genre:"Regional mexicano",lang:"Español",key:null,
  yt:"Ella baila sola Eslabon Armado Peso Pluma",ytLesson:"Ella baila sola guitarra tutorial",tips:["Empieza con una línea de bajo en las cuerdas 6 y 5, luego dobles notas en G/D con slides.","La parte de sextas en las cuerdas e/B lleva hammer-ons y pull-offs (4h6p4, 6h8p6).","La tab ASCII no trae ritmo: escucha la canción para ajustarlo."],diff:3},
 {id:"boda2",title:"Tu boda (tab de guitarra)",artist:"Oscar Maydon & Fuerza Regida",album:null,year:2023,genre:"Regional mexicano",lang:"Español",key:null,
  yt:"Oscar Maydon Fuerza Regida Tu boda",ytLesson:"Tu boda Oscar Maydon Fuerza Regida guitarra tutorial",tips:["Melodía en las cuerdas 1 y 2: la nota 9 (cuerda e) se repite mientras la cuerda B marca el contrapunto en el traste 11.","Después una línea solo en la cuerda B con slides (9/11, 11\\9, 7/9) que se repite ×2.","El final usa hammer-on y pull-off (6h7p6). La tab ASCII no trae ritmo: ajústalo escuchando la canción."],diff:3},
 {id:"nadie",title:"Que nadie sepa mi sufrir",artist:"Julio Jaramillo",album:null,year:null,genre:"Vals criollo",lang:"Español",key:"Sol menor",
  yt:"Julio Jaramillo Que nadie sepa mi sufrir",ytLesson:"Que nadie sepa mi sufrir guitarra tutorial",tips:["Vals en 3/4: bajo con el pulgar y dos acordes por compás.","Acordes principales: Gm, Dm y A7.","La melodía en la grabación la lleva el requinto; esta tab es la guitarra de acompañamiento."],diff:2},
 {id:"wonder",title:"Wonderwall",artist:"Oasis",album:"(What's the Story) Morning Glory?",year:1995,genre:"Britpop",lang:"Inglés",key:"Mi menor (capo 2)",
   yt:"Oasis Wonderwall",ytLesson:"Oasis Wonderwall guitar tutorial capo 2",tips:["Capo en el 2.º traste: acordes Em7, G, Dsus4, A7sus4 y Cadd9.","Deja el dedo anular y meñique fijos en las cuerdas 1 y 2 (trastes 3) mientras cambias de acorde.","Patrón ↓ ↓↑ ↑↓↑: aprende el rasgueo con la mano apagando antes de cambiar acordes."],diff:2},
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


