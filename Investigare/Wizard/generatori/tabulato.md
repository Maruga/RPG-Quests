# Generatore: Tabulato Telefonico

Il generatore di riferimento — implementa la pre-elaborazione prescritta dal Manuale Situazioni ("Come Pre-elaborare gli Handout"). **Deterministico**: i fatti vengono dalla cronistoria; l'AI non tocca i dati.

## Input

| Parametro | Da dove | Note |
|---|---|---|
| `intestatario` | cast (di solito la vittima) | il tabulato è del SUO numero |
| `periodoGiorni` | parametri handout (default 30) | finestra retroattiva dal giorno 0 |
| `eventiChiamata` | passo7.eventi con `generaTraccia` telefonico | ogni evento → riga vera con data/ora/durata/direzione |
| `rubricaCaso` | cast + luoghi | mappa persona/istituzione → numero coerente |
| `profiloRoutine` | professione + cerchi della vittima | genera il rumore realistico |
| `seed` | id progetto | STESSO seed = STESSO tabulato a ogni rigenerazione (riproducibilità) |

## Numerazione (Giappone 1997)

- Fisso Kyoto: `075-XXX-XXXX` · Osaka: `06-XXX-XXXX` · Tokyo: `03-XXXX-XXXX`
- Cellulare: `030-XXX-XXXX` (formato usato dal manuale) · PHS: `070-XXX-XXXX`
- Numeri pubblici (izakaya, uffici, ospedale) dalla rubrica del caso; i numeri di rumore generati NON devono collidere con quelli veri.

## Algoritmo

1. **Righe vere**: ogni evento-chiamata della cronistoria diventa una riga (data, ora, numero, direzione, durata). La durata la stima il motore dal testo dell'evento (una "chiamata breve e tesa" = 1-3 min).
2. **Rumore realistico** dal profilo di routine: il numero più chiamato (famiglia/lavoro), le abitudini a fascia oraria (la pizzeria del giovedì, la madre della domenica), 3-8 chiamate/giorno feriale. Il rumore è VITA VERA, non riempitivo: qualche riga di rumore deve sembrare interessante (e non esserlo).
3. **Sintesi analitica** (il documento consegnato — MAI il grezzo integrale):
   - *Numero più contattato nel periodo* — conteggio, fascia oraria, identificazione se pubblica ("Studio legale …") o "(Non identificato)"
   - *Numeri anomali* — contattati solo di recente, o una sola volta, o in orario insolito
   - *Chiamate in entrata non risposte* — con evidenza dei cluster (11 chiamate nelle ultime 48h)
   - *Chiamate mute/brevissime* — durata < 30s
4. **Lint del manuale** (bloccante): ≥ 1 nota che porta a qualcosa di utile · ≥ 1 nota che è rumore reale · NESSUNA nota che identifica il colpevole. Le identificazioni dei numeri privati restano "(Non identificato)": scoprire di chi è un numero È investigazione (richiesta all'ente → passo 9).

## Output

1. **Sintesi analitica** (l'handout consegnato ai PG) — markdown nel formato dell'esempio del manuale, con intestazione burocratica NTT/compagnia + numero pratica.
2. **Grezzo integrale** (solo per il GM, in appendice) — la tabella completa: serve al GM per rispondere a domande impreviste ("chi ha chiamato alle 14 del giorno 12?").

## Casi limite

- Chiamate DA luoghi pubblici (izakaya, cabina): compaiono sul tabulato del RICEVENTE col numero del locale — il motore lo sa e li usa (la cabina davanti al konbini è un classico del '97).
- Telefono aziendale vs casa: se la vittima ha entrambi, due tabulati o uno solo — parametro.
- Il giorno del fatto è SEMPRE incluso nel periodo.
