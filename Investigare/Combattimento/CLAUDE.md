# Combattimento — area di lavoro

Qui vive **tutto il combattimento** di GENKAI: manuale corrente, versioni, decisioni, excel
dell'utente, simulatore. In futuro: più armi, veicoli e altro.

## Struttura (dal 2026-09-04)

- **`GENKAI_Combattimento.md`** — il manuale CORRENTE (**v3.0 BOZZA**, sistema ad azioni).
  Il vecchio percorso `../GENKAI_Combattimento.md` è solo un puntatore qui.
- **`versioni/`** — versioni congelate per tornare indietro o confrontare
  (`GENKAI_Combattimento_v2.1.md` = la v2.1 completa; le sezioni non ancora riviste in v3
  valgono da lì). **A ogni modifica sostanziale della corrente: prima snapshot qui** con
  numero e data.
- **`DECISIONI.md`** — il registro delle decisioni di design (cosa è DECISO, cosa è APERTO).
- **`Simulazione.xlsx`** — il foglio di calcolo dell'utente (fonte delle tabelle v3).
- **`Simulatore.html`** — simulatore di scontro PG vs 1-2 PNG (si apre nel browser, file://):
  motore = regole v3 decise, log completo dei calcoli per i controlli.

## Regole di questa cartella

- Una modifica diventa regola solo quando **l'utente la decide** → si aggiorna qui il manuale
  (con snapshot in `versioni/`), si allinea `DECISIONI.md`, e si segna in `../REGISTRO_MODIFICHE.md`
  per la sessione REGOLE.
- **Non inventare meccaniche di propria iniziativa**; gli APERTI di DECISIONI.md restano aperti
  finché l'utente non li chiude.
- Il simulatore implementa SOLO il deciso: se una regola cambia, aggiornare motore e nota in testa.
- Contesto: la scena di combattimento della demo `sito_genkai/provalo/` è stata rimossa (2026-09-03)
  e si ricostruirà su questo sistema quando chiuso.
