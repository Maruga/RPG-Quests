# MEMORY — Avventura Sake (L'Ultima Cena di Tanaka)

## Handout — Stato attuale (aggiornato 2026-03-09)

10 handout HTML in `handout/`. Tutti hanno dark mode (`prefers-color-scheme: dark`) e print CSS. Sfondo bianco per agenda e menu, gli altri variano.

### Elenco e modifiche fatte

| # | File | Contenuto | Modifiche |
|---|------|-----------|-----------|
| 01 | `01_Planimetria_Villa.html` | Planimetria SVG della villa | Dark mode aggiunto. Riferimento a `villa.png` (minuscolo) |
| 02 | `02_Rapporto_Preliminare.html` | Rapporto polizia preliminare | Sugimoto→Yamada. Dark mode aggiunto |
| 03 | `03_Lista_Presenti.html` | Lista presenti alla festa | 7 età corrette, 3 kanji corretti (allineati a Storia Completa). Dark mode |
| 04 | `04_Ristrutturazione_Societaria.html` | Documento ristrutturazione societaria | Dark mode aggiunto |
| 05 | `05_Agenda_Tanaka.html` | Agenda personale Tanaka, 4 pagine (Set-Dic) | Riscritto: sfondo bianco, colori forti, 4 mesi, biglietto Nishida, page-break per stampa |
| 06 | `06_Referto_Scientifica.html` | 4 referti scientifici standalone | Riscritto: 4 pagine indipendenti (Sapone, Incenso, Confronto, Sake). Ognuno con header completo |
| 07 | `07_Menu_Kaiseki.html` | Menu cena kaiseki | Riscritto: sfondo bianco, una pagina, layout compatto. Endo kanji corretto (俊夫) |
| 08 | `08_Biglietto_Nishida.html` | Meishi investigatore privato | Dark mode aggiunto |
| 09 | `09_Lettere_Nakamura.html` | **NUOVO** — 2 lettere d'amore Nakamura→Yuki | Reperto polizia (Allegato D). Red herring relazione |
| 10 | `10_Rapporto_Nishida.html` | **NUOVO** — Rapporto PI su Hayashi | Hayashi pulito. Elimina depistaggio indagine privata |

### File rinominato
- `Villa.png` → `villa.png` (case sensitivity cross-platform)

### Correzioni dati allineati a Storia Completa

**Età corrette in H03:**
- Yuki 52→49, Hayashi 24→26, Nakamura 48→45, Sato 58→62, Endo 45→48, Ishii 26→29, Watanabe 22→34

**Kanji corretti in H03:**
- Yuki 由紀→雪, Endo 敏夫→俊夫, Ishii 卓也→拓也

**PNG istituzionale in H02:**
- Sugimoto Ryota (杉本良太) → Yamada Tetsuo (山田哲夫) — allineato a Storia Completa

### Struttura H05 — Agenda Tanaka (4 pagine)

- **Pag. 47 — Settembre**: Nishida incarico + biglietto da visita incollato, rapporti Hayashi, vita aziendale, pianificazione festa. Senza righe vuote (compattato per stare in una pagina A4)
- **Pag. 48 — Ottobre**: Nishida rapporto finale, Fujimoto senior, R&D con Ogawa, "Ogawa report Q3 lasciati nello studio" (indizio sottile), Nakamura galleria, preparativi festa
- **Pag. 49 — Novembre**: Pre-festa (Hayashi confermato, preparativi) + 14 Nov = Festa + appuntamenti dopo il 14 mai onorati (budget 1998, cena Yuki Pontochō, Tokyo)
- **Pag. 50 — Dicembre**: Appuntamenti futuri mai realizzati (chiusura conti, festa aziendale, Hakone con Yuki, Capodanno Kiyomizu-dera)
- CSS: sfondo bianco, colori forti (handwritten `#0000cc`, date `#2a1000`), page-break per stampa

### Struttura H06 — Referti Scientifica (4 pagine standalone)

Ogni reperto è un `<div class="document">` indipendente con header polizia completo, metadata, analisi, conclusione, firma Ito, timbro. Possono essere consegnati singolarmente.

- **Reperto A**: Sapone a doppio strato (wintergreen nel nucleo)
- **Reperto B**: Incenso con wintergreen (legale commercialmente)
- **Reperto C**: Confronto saponi (bagno ospiti vs altri bagni)
- **Reperto D**: Sake Juyondai — tutto negativo, nota farmacocinetica (alcol come potenziatore)

### Stile visivo handout

- Documenti polizia: header navy scuro `#1a1a2e`, accenti oro `#c0a060`, font Courier New
- Agenda: sfondo bianco, bordo sinistro marrone `#6b3000`, handwritten blu `#0000cc`
- Menu: sfondo bianco, bordo decorativo oro, sigillo Tanaka
- Lettere: carta elegante, script corsivo, framing come reperto polizia
- Biglietto: formato meishi giapponese 91x55mm
- Dark mode: `@media screen and (prefers-color-scheme: dark)` — stampa sempre light

### Consistenza dati tra handout

- Nishida: Tel. 075-561-3842, Fax 075-561-3843, Shijō-dōri 284, Licenza 1247 — coerente in H05, H08, H10
- Fascicolo polizia: 97-KPD-1114 — coerente in H06, H09
- Endo kanji: 遠藤俊夫 — coerente in H03, H07
- Yamada: Serg. YAMADA Tetsuo (山田哲夫) — coerente in H02 e Storia Completa

## Modifiche narrative (2026-03-10)

- **Chiavistello chiuso dalla vittima**: Tanaka si chiude nel bagno da solo nella confusione dell'anafilassi (gira il chiavistello convinto di aprirlo). Ogawa chiude la porta (per privacy) ma non gira il chiavistello — Tanaka lo gira da solo pensando di aprirla. Il chiavistello diventa pista falsa per i PG. 5 edit in `Storia Completa.md` (timeline, nota GM Ito, segreti Ogawa, bugie Ogawa, graffi porta). Handout H02 non modificato ("porta chiusa dall'interno" ora è letteralmente vero).

## Note di design

- Ogni handout deve poter funzionare standalone (stampato e consegnato singolarmente)
- I referti H06 sono dati in momenti diversi dell'indagine — non tutti insieme
- L'agenda H05 mostra la vita interrotta: appuntamenti dopo il 14 novembre mai onorati (effetto narrativo)
- Le lettere H09 sono red herring (relazione Nakamura-Yuki), trovate nel comodino camera padronale
- Il rapporto H10 chiude il depistaggio Nishida-Hayashi (tutto pulito)
