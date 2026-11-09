---
name: add-song
description: Add or update a song in My Guitar Path (metadata in app.js, tempo in ui.js, tab in tabs-data.js). Use when the user asks to add a song, transcribe a score/screenshot, or complete a partial tab.
---

# Añadir una canción a My Guitar Path

Sitio estático sin build: `index.html` + `app.js` (SONGS) + `tabs-data.js` (TABS) + `tab-component.js` (`<guitar-tab>`) + `ui.js` (vistas, TEMPO) + `style.css`.

## Pasos
1. **Metadatos** en `SONGS` (`app.js`): `id` (corto, minúsculas), `title`, `artist`, `album`, `year`, `genre`, `lang`, `key`, `yt` (búsqueda o URL), `ytLesson`, `tips` (2–3 consejos en español, mencionar afinación/capo/técnica), `diff` (1–5).
2. **Tempo** en `TEMPO` (`ui.js`): `id: [bpm, "t"|"g"]` — `"t"` = tomado de la tab/partitura del usuario, `"g"` = grabación (indicar la fuente en la nota si es estimado).
3. **Tab** en `window.TABS[id]` (`tabs-data.js`), nunca embebida de sitios externos. Formato:
   `{track, bpm, tuning:[midi agudo→grave], total, off?, label?, note?, inc?, m:[compás]}`
   - Compás: `{sig:[n,d], n?:númeroOriginal, rs?:1, rp?:repeticiones, b:[pulso]}`
   - Pulso: `{d:[num,den] (fracción de redonda, ya con puntillos/tresillos), n:[[cuerda,traste|"x",flag]], c?:acorde, r?:1 (silencio), st?:"d"|"u", pm?:1, t?:3, dot?:1}`
   - Cuerda: 0 = 1.ª (mi aguda) … 5 = 6.ª. Flags: `"hp"` hammer/pull-off, `"/"` slide, `"~"` ligadura, `"g"` ghost.
   - Repeticiones: `rs` en el compás de inicio y `rp` en el de cierre.
4. **Verificar**: cada compás debe sumar su duración (3/4 = 12 semicorcheas, 4/4 = 16). Comprobar con un script de Node, no a ojo.
5. **Completitud**: poner `total` = compases reales de la pieza. Si `m.length < total` o la tab es parcial (solo acompañamiento, solo una pista), poner `inc:1`; la web muestra «⚠ incompleta». Explicar qué falta en `note`.
6. **Probar** en navegador (Playwright + Edge): sin errores de consola, captura de la página `#/id`, reproducir y revisar el cursor.
7. **Publicar**: `git add -A`, commit con el trailer `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`, `git push`.

## Reglas
- Escribir `tabs-data.js` generándolo con un script de Node (`window.TABS=`+JSON.stringify(TABS)), no a mano.
- Transcribir solo lo que se lee con seguridad de imágenes del usuario; anotar en `note` lo dudoso (ligaduras, adornos).
- No copiar transcripciones completas con copyright de terceros: usar fragmentos o material que aporte el usuario.
- Usar el `n` original de la partitura en los compases; si faltan compases, no inventarlos.
- Todo el texto de la interfaz en español.
