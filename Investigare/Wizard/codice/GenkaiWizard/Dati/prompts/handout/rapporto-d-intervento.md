## Tipologia: rapporto d'intervento → `ho-doc`

Il rapporto di chi è intervenuto sul posto (polizia, vigili, soccorso). `<div class="ho-foglio ho-doc">`:
- `.ho-intestazione` dell'organo + `ente-jp` + `tipo-doc` «RAPPORTO DI INTERVENTO»,
- `<dl class="ho-meta">` (n° pratica, data/ora chiamata, data/ora intervento, luogo, operatori),
- corpo cronologico in `<h2>`/`<p>`: **Chiamata**, **Arrivo sul posto**, **Rilievi**, **Provvedimenti / Esito**,
- `<div class="ho-firma">` dell'operatore.

Solo fatti **rilevati sul posto** (ciò che è pubblicamente osservabile); niente conclusioni investigative né il colpevole. Eventuali `<p class="ho-nota">` una utile e una neutra.
