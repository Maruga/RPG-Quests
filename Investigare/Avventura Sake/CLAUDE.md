# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Regola Fondamentale

Prima di fare modifiche che cambiano la trama, i personaggi, le relazioni o le meccaniche investigative, DEVI indicarlo all'utente e chiedere conferma PRIMA di procedere. Non fare assunzioni sulla narrativa: chiedi sempre.

## Contesto

**L'Ultima Cena di Tanaka** — avventura investigativa one-shot per il sistema GENKAI 限界 v1.3. Ambientata a Kyoto, 1997. Un industriale cosmetico viene ucciso durante una festa nella sua villa tramite un meccanismo a tre vettori (incenso, sake, sapone a doppio strato con wintergreen). Il colpevole è Ogawa Masaru, il direttore R&D.

Tutto il materiale è in **italiano**. La storia è in `Storia Completa.md` (~350 righe: crimine, Yamada e Ito, tabella En, indice stanze, scene); le **schede dei 16 PNG sono in `PNG/`** (un file per personaggio, col ruolo nel nome, dal 2026-09-15) e le **stanze in `Location/`** (un file per stanza; dal 2026-09-15 la storia ha solo un indice).

Il regolamento GENKAI e i PG premade si trovano nella directory padre (`Investigare/`).

## Lore Critiche (MAI violare)

- **Ambientazione 1997**: NO internet, NO cellulari per civili comuni, cercapersone per polizia, telefoni fissi, fax
- **Gli indizi si danno SEMPRE** — il dado non blocca l'indagine, modula solo la gestione emotiva di ciò che si trova
- **Ogawa è il colpevole** — è il PNG più gentile e collaborativo (En +1). Questa è la trappola
- **Meccanismo a tre vettori**: incenso (aereo), sake (potenziatore), sapone a doppio strato (contatto). Tutti e tre necessari, nessuno letale da solo
- **Ogawa mente solo sulle emozioni e sull'intento reale al bagno** — non mente mai su fatti verificabili
- **Tanaka si chiude nel bagno da solo** — Ogawa chiude la porta (per privacy) ma non gira il chiavistello. Tanaka nella confusione dell'anafilassi gira il chiavistello convinto di aprirlo e si chiude dentro. Il chiavistello è una pista falsa per i PG
- **Hayashi è stato manipolato** per comprare l'incenso al Kunjudō. Non sa nulla di chimica
- **L'indagine privata su Hayashi** (commissionata da Tanaka a Nishida) NON c'entra con Ogawa — è un depistaggio
- **L'EpiPen** è nella giacca al guardaroba, non al bagno — per questo Tanaka non si è salvato
- **Il finale** (2026-09-15): con prove complete Ogawa tira fuori una pistola compatta dalla tasca della giacca e cerca di uscire dal giardino — scontro con le regole di `Combattimento/GENKAI_Combattimento.md` v3.1 (valori nella Scena 3). Con prove parziali nega e chiede l'avvocato. Da dove venga la pistola non si spiega
- **Niente Gou e niente Kage nell'avventura** (2026-09-15): sono sulle schede dei PG e li gestisce il GM. La storia usa solo tiri di attributo ed En

## Struttura del File

`Storia Completa.md` contiene tutto in sequenza:
1. Premessa GM e azienda (struttura societaria, quote)
2. Il crimine — meccanismo e timeline dettagliata
3. PNG istituzionali (Yamada, Ito — polizia e scientifica, PNG ricorrenti con schede in `Investigare/png notevoli/`)
4. Rimando alle schede PNG in `PNG/` + tabella En riepilogativa (festa ed esterni)
5. (le schede di Ogawa, Reiko, Fujimoto, Akemi, Hayashi, Tanaka Yuki, Nakamura, Sato, Endo, Toda, Mori, camerieri, Kano, Nishida stanno SOLO in `PNG/`)
6. Indice delle stanze con rimando a `Location/` (le schede delle 10 stanze, con descrizione e indizi, stanno SOLO lì)
7. Flusso di gioco (3 scene), tiri suggeriti
8. Schema depistaggi, note finali

## Schema dei Depistaggi

| PNG | Sembra colpevole perché | È innocente perché |
|---|---|---|
| Fujimoto | Debito yakuza, promozione, ubriaco | Zero chimica, mai in villa da solo |
| Yuki | Relazione segreta, eredita tutto | Non conosce il dettaglio chimico |
| Nakamura | Amante, problemi finanziari | Nessun accesso, nessuna competenza |
| Hayashi | Ha portato l'incenso | Manipolato, non sa nulla di chimica |
| Endo | Litigio con Tanaka, accesso cibo | Cibo pulito, diverbio risolto |

## Principi di Scrittura

- Ogni PNG ha En (legame) con valore numerico che influenza la cooperazione
- Le schede PNG seguono uno schema: dati, cosa sa, cosa ha visto, cosa nasconde, come reagisce sotto pressione, cosa lo scagiona
- Le prove sono fisiche e sempre trovabili — i tiri modulano solo la comprensione
- Il tono è noir realistico, nessun elemento soprannaturale
- Ritmo target: 60-90 minuti totali (10 min briefing, 20-30 min interrogatori, 10-15 min collegamenti, poi lo scontro finale)

## Handout

12 handout HTML in `handout/`. Dettagli completi in `MEMORY.md`.

- **H01a / H01b**: Planimetria — piano terra (`01a`) e primo piano (`01b`); immagini `Piano Terra.png` / `Primo Piano.png`
- **H02-H04**: Rapporto preliminare, lista presenti, ristrutturazione societaria
- **H05**: Agenda Tanaka — 4 pagine (Set-Dic), sfondo bianco, colori forti, biglietto Nishida incollato
- **H06**: Referti scientifica — 4 pagine standalone (Sapone, Incenso, Confronto, Sake), consegnabili singolarmente
- **H07**: Menu kaiseki — sfondo bianco, una pagina compatta
- **H08**: Biglietto da visita Nishida (meishi)
- **H09**: Lettere Nakamura→Yuki (red herring, reperto polizia Allegato D)
- **H10**: Rapporto PI Nishida su Hayashi (tutto pulito)
- **H11**: Tabulati telefonici villa — 19 chiamate, rinforza i red herring Nakamura/Nishida
- **H12**: Referto medico allergologico Tanaka (salicilati; wintergreen/alcol presenti ma non evidenziati)

Tutti hanno dark mode CSS (`prefers-color-scheme: dark`) e print CSS (sempre light). Ogni handout funziona standalone.

Dati coerenti tra handout: Nishida (tel, indirizzo, licenza), fascicolo 97-KPD-1114, kanji PNG.

## Vault Obsidian

- I file usano `[[wikilink]]` per riferimenti incrociati
- Tabelle in formato Markdown standard con pipe `|`
- Kanji giapponesi usati per nomi, titoli e termini di gioco
