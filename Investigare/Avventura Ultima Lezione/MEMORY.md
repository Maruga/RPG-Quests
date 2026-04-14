# Memory — Ultima Lezione

## Stato handout (24 file HTML totali)

Tutti in stile **burocratico giapponese '97**: dark mode su schermo, light mode in stampa, margini ridotti, font Courier/Serif/Times a seconda del tipo.

| Tipo | File | Note |
|---|---|---|
| A (Courier) | 01-05, 08-09, 12-16 | Rapporti polizia/scientifici |
| A (Serif) | 11 | Cartella clinica (font serif) |
| B (Serif carta) | 06, 10 | Lettera Morimoto, diario |
| C (Times giornale) | 17-21, 24 | Giornali Kyoto Shimbun |
| D (Sans corporate) | 07 | Polizza assicurativa |

**Nuovi handout (2026-04):**
- **22 Tabulato Casa Morimoto** — NTT, 10 chiamate (Aoi, Endo, univ, 119 del 12/11)
- **23 Tabulato Universita** — interni 307 (Morimoto) e 215 (Kuroda). La chiamata di Morimoto al 075-221-8811 del 18/09 e la Maruzen (ma il tabulato non lo dice, solo il numero)
- **24 Necrologia Moglie** — Morimoto Haruko, morta 7/03/1985, cancro al pancreas, 51 anni (red herring)

**Handout al briefing**: 01, 02, 03 + 18 (Yamada lo porta). 15 (Kamiya) solo se chiesto. 16 (scheda distretto) solo GM. 17 (necrologia) su richiesta.

**Backup**: `handout/backup/` contiene versione precedente dei 21 handout originali.

## Correzioni critiche fatte

- **Collirio**: 0.5 mg/mL → **5 mg/mL** (dose letale realistica), residuo 8 → **11 mL**. Aggiornati: handout 03, 04, Storia, CLAUDE.md, luoghi/05
- **Polizza (handout 07)**: aggiunta dichiarazione sanitaria falsa (kokuchi gimu, 告知義務) — Morimoto ha negato depressione e Tofranil. Clausola 8.1 rimossa dal documento (spoiler), esclusione suicidio integrata nella tabella copertura, aggiunta sezione "Dati amministrativi" per riempire
- **Libro botanica**: spostato da casa Morimoto all'ufficio Kuroda (Studio 215) — piazzato durante una visita. Adesivo Maruzen sul dorso = ponte alla libreria (handout 13)
- **Trascrizione 119 (09)**: rimossa nota finale che spoilerava la precisione sospetta dell'indirizzo
- **Estratto conto (05)**: ricostruito con stipendio universita, bollette (KEPCO, gas, NTT, acqua), rate prestito, premi Nippon Life, bonifico Santen. Prelievo Kawaramachi 15/09 sta tra gli altri, NON evidenziato. Scoperto di conto a settembre (coerente con debiti)

## PNG — alibi inseriti (12/11, 19:00-22:30)

**Deboli (4)**: Kuroda (casa solo), Aoi (amica via alle 19:00), Nishimura (registro biblioteca 18:45, 2h non coperte), Endo (clinica chiusa alle 18, vive solo)

**Solidi (5)**: Tanabe (moglie + TV), Honda (cena rettore 5 testimoni), Yamaguchi (ufficio fino 21, collega), Sato Nobuo (famiglia), Mori (portiere 17:45 parziale)

**Nota GM**: Morimoto ha scelto la sera apposta — Yumi era fuori citta, quindi Kuroda senza alibi. Parte del piano.

## Custode Tanabe — risentimento

Morimoto lo trattava dall'alto in basso. "28 anni che lavoro qui, non sapeva il mio nome." Frasi come "Kuroda-sensei almeno saluta" creano tensione narrativa. Non ha motivo di uccidere, ma l'alibi e solido (moglie + TV).

## Moglie Morimoto

- **Morimoto Haruko** (森本 春子) — insegnante di musica, morta 7/03/1985 a 51 anni di cancro al pancreas
- Aoi aveva 16 anni. Dopo la morte della moglie Morimoto si e chiuso nel lavoro
- **NON c'entra con l'indagine** — red herring per PG che investigano tutto

## Anni di servizio aggiunti

Morimoto (30, dal 1967), Kuroda (25, dal 1972), Honda (30, Preside dal 1993), Mori (20), Endo (7, dal 1990), Nishimura (3, dal 1995), Yamaguchi (15), Sato Nobuo (12), Tanabe (28, gia noto).

## Generatore PG (livello globale)

In `Investigare/pg/genera_schede_pg.py` — genera 5 ANTEPRIMA_*.docx con layout identico (Yamamoto come base, layout giapponese elegante). Modificare i dati li e rigenerare. Tutti usano i Gou del Regolamento v1.3.

## Ritratti Ultima Lezione

`Immagini/ritratti/ritratti.html` — griglia 4x3 dei 12 PNG con foto + ruolo senza spoiler. Dark screen / light print.
