# Combattimento — area di lavoro

Qui vive **tutto il combattimento** di GENKAI: manuale corrente, versioni, decisioni, excel
dell'utente, scena interattiva, scheda per i giocatori. In futuro: più armi, veicoli e altro.

## Struttura (dal 2026-09-05)

- **`GENKAI_Combattimento.md`** — il manuale CORRENTE (**v3.1**: il v3.0 unificato — tutto il
  contenuto della v2.1 + le regole v3 che comandano — con dentro le direttive dell'utente del
  2026-09-06; il poco ancora aperto è elencato in fondo, «Da validare»).
  Il vecchio percorso `../GENKAI_Combattimento.md` è solo un puntatore qui.
- **`versioni/`** — versioni congelate per tornare indietro o confrontare: `v2.1` (il canone
  precedente, integrale), `v3.0-bozza1/2/3`, `v3.0`, `v3.1-bozza1`, e il vecchio `Simulatore.html`
  (pannello tecnico, superato). **A ogni modifica sostanziale della corrente: prima snapshot qui**
  con numero e data.
- **`DECISIONI.md`** — il registro delle decisioni di design (cosa è DECISO, cosa è APERTO).
- **`Simulazione.xlsx`** — il foglio di calcolo dell'utente (fonte delle tabelle v3).
- **`Scena_Combattimento_Interattiva.html`** — COPIA LOCALE (file://) della scena giocata: è solo un
  wrapper che carica il **motore vero**, `../sito_genkai/provalo/scontro.js` + `scontro.css` (una sola
  versione da mantenere). Online: `genkai.it/provalo/scontro/` (da sola) e scena 8 di `genkai.it/provalo/`.
  Motore = solo le regole decise; banco di prova jsdom nello scratchpad di sessione (`prova_scontro.js`).
- **`Scheda_Giocatori_Combattimento.html`** — riferimento da tavolo (2 pagine A4), DERIVATA dal
  manuale: se il manuale cambia, si aggiorna. Accanto c'è il **PDF pronto da stampare**
  (`Scheda_Giocatori_Combattimento.pdf`), generato con Chrome headless
  (`chrome.exe --headless=new --no-pdf-header-footer --print-to-pdf=<pdf> file:///<html>`): a ogni
  modifica dell'HTML si rigenera e si controlla che resti di 2 pagine (pymupdf). È QUESTO il foglio
  che va sul tavolo per il combattimento, in ogni avventura: le schede PG portano solo l'equipaggiamento.
- **`BRIEF_nomi.md`** — brief già servito (nomi Ukemi/Tame decisi).

## Regole di questa cartella

- **NIENTE NOTE INTERNE SUI MATERIALI PER I GIOCATORI** (utente, 2026-09-09, furioso: aveva trovato
  «° = valori da provare al tavolo» sulla Scheda Giocatori). Quello che si decide, si testa o resta
  aperto vive SOLO nel manuale e in `DECISIONI.md`. Sulla Scheda Giocatori, sulle schede PG, sui
  fogli da tavolo e online: nessun «°», «da validare», «da provare», «da confermare», data di
  decisione, riferimento a bozze. Il giocatore riceve regole, non lo stato del cantiere.

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
