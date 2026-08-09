# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> ⚠ **QUESTA È LA COPIA DELLO STARTER KIT** — diverge dall'originale in `Investigare/Avventura Sake/`:
> usa le regole starter e ha il finale opzionale con la pistola. **Non riallineare mai le due copie.**
> Valgono le regole della cartella kit (`../CLAUDE.md` e `../DECISIONI_STARTERKIT.md`).

## Regola Fondamentale

Prima di fare modifiche che cambiano la trama, i personaggi, le relazioni o le meccaniche investigative, DEVI indicarlo all'utente e chiedere conferma PRIMA di procedere. Non fare assunzioni sulla narrativa: chiedi sempre.

## Contesto

**L'Ultima Cena di Tanaka** — avventura investigativa one-shot per GENKAI 限界, versione Starter Kit. Ambientata a Kyoto, 1997. Un industriale cosmetico viene ucciso durante una festa nella sua villa tramite un meccanismo a tre vettori (incenso, sake, sapone a doppio strato con wintergreen). Il colpevole è Ogawa Masaru, il direttore R&D.

Tutto il materiale è in **italiano**. L'avventura è contenuta in un unico file: `Storia Completa.md` (~890 righe).

Le regole starter sono in `../SK_Regole_Giocatori.md`, la guida per condurre in `../SK_Guida_GM.md`, le schede dei PG in `../Schede/`, Yamada e Ito in `../PNG Notevoli/`.

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

## Struttura del File

`Storia Completa.md` contiene tutto in sequenza:
1. Premessa GM e azienda (struttura societaria, quote)
2. Il crimine — meccanismo e timeline dettagliata
3. PNG istituzionali (Yamada, Ito — polizia e scientifica, schede complete in `../PNG Notevoli/`)
4. PNG presenti alla festa — schede complete per interrogatorio (Ogawa, Reiko, Fujimoto, Akemi, Hayashi, Tanaka Yuki, Nakamura, Sato, Endo, camerieri, Toda, Mori)
5. PNG esterni (Nishida, Kano)
6. Luoghi della villa (planimetria, stanze, prove)
7. Flusso di gioco (3 scene), tiri suggeriti
8. Momenti Kage, schema depistaggi, note finali

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
- Ritmo target: 45-60 minuti totali (10 min briefing, 20-30 min interrogatori, 10-15 min finale)

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
