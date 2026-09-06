# Combattimento — area di lavoro

Qui vive **tutto il combattimento** di GENKAI: manuale corrente, versioni, decisioni, excel
dell'utente, scena interattiva, scheda per i giocatori. In futuro: più armi, veicoli e altro.

## Struttura (dal 2026-09-05)

- **`GENKAI_Combattimento.md`** — il manuale CORRENTE (**v3.0 unificato**: tutto il contenuto della
  v2.1 + le regole v3 che comandano; i punti **[da validare]** sono elencati in fondo).
  Il vecchio percorso `../GENKAI_Combattimento.md` è solo un puntatore qui.
- **`versioni/`** — versioni congelate per tornare indietro o confrontare: `v2.1` (il canone
  precedente, integrale), `v3.0-bozza1/2/3`, e il vecchio `Simulatore.html` (pannello tecnico,
  superato). **A ogni modifica sostanziale della corrente: prima snapshot qui** con numero e data.
- **`DECISIONI.md`** — il registro delle decisioni di design (cosa è DECISO, cosa è APERTO).
- **`Simulazione.xlsx`** — il foglio di calcolo dell'utente (fonte delle tabelle v3).
- **`Scena_Combattimento_Interattiva.html`** — COPIA LOCALE (file://) della scena giocata: è solo un
  wrapper che carica il **motore vero**, `../sito_genkai/provalo/scontro.js` + `scontro.css` (una sola
  versione da mantenere). Online: `genkai.it/provalo/scontro/` (da sola) e scena 8 di `genkai.it/provalo/`.
  Motore = solo le regole decise; banco di prova jsdom nello scratchpad di sessione (`prova_scontro.js`).
- **`Scheda_Giocatori_Combattimento.html`** — riferimento da tavolo (2 pagine A4), DERIVATA dal
  manuale: se il manuale cambia, si aggiorna.
- **`BRIEF_nomi.md`** — brief già servito (nomi Ukemi/Tame decisi).

## Regole di questa cartella

- Una modifica diventa regola solo quando **l'utente la decide** → si aggiorna qui il manuale
  (con snapshot in `versioni/`), si allinea `DECISIONI.md`, e si segna in `../REGISTRO_MODIFICHE.md`
  per la sessione REGOLE.
- **Non inventare meccaniche di propria iniziativa**; gli APERTI di DECISIONI.md restano aperti
  finché l'utente non li chiude. Un buco nelle regole si SEGNALA, non si riempie.
- La scena interattiva implementa SOLO il deciso: se una regola cambia, aggiornare motore e testi.
- **Testi per chi non conosce il gioco** (scena, mini-caso): italiano prima di tutto — i nomi di
  gioco (Ki, Ukemi, Tame, Genkai) si introducono una volta, spiegati; niente kanji in primo piano,
  niente «keibō»: si dice manganello. Usare le definizioni degli attributi del Manuale del
  Giocatore, mai parafrasi inventate («riflessi» è bocciato).
- Patch ai file HTML: script `.py` scritti col tool Write (mai heredoc bash), poi `node --check`
  sullo script estratto.
