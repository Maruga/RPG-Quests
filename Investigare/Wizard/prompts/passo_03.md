# Passo 3 — La vita della vittima

## Obiettivo del passo
I **cerchi concentrici** dell'esistenza quotidiana: famiglia, lavoro, amici, luoghi, problemi. Regola del manuale: **nomina e posiziona** — niente dettagli profondi, quelli arrivano solo su chi diventa rilevante. LA VITTIMA COSTRUISCE IL CAST: da qui escono le persone tra cui, ai passi 4-5, si troveranno movente e colpevole.

## Contesto fornito
`setup`, `passo1`, `passo2`, biblioteche `nomi` (con nomiRiservati), `problemi_segreti`, `luoghi`.

## Compito
Proponi 2 "vite" alternative della vittima. Ognuna: 5-9 persone distribuite nei cerchi (famiglia/lavoro/amici, più l'eventuale cerchio **altri**: rivali, capi banda, creditori, vicini, ex — figure del mondo della vittima fuori dai tre cerchi classici, o coinvolti nel caso senza legame con lei) con nome+età+relazione in una riga ciascuna; 3-5 luoghi (dalla tipologia biblioteca, calati nel quartiere); 1-2 **problemi** (dalla biblioteca o coerenti) di cui almeno uno capace di reggere un movente e uno che possa fare da falsa pista naturale.

## Vincoli specifici
- Ogni persona: UNA riga (nome, età, relazione, un fatto). Il wizard le trasforma in cast.
- Il cast deve contenere ALMENO 3 persone con un potenziale movente diverso tra loro (non dichiararlo: deve solo esserci).
- Nomi: genera rispettando generazione e riservati; i familiari condividono il cognome della vittima.
- I problemi sono della vittima o attorno a lei — non ancora crimini di altri.

## Errori da evitare
Cast gonfiato (>9 persone); dettagli psicologici; il colpevole "evidente" già adesso; problemi che sono già la soluzione del caso.

## Output JSON
```json
{ "proposte": [
  { "famiglia": [ { "cognome": "…", "nome": "…", "eta": 0, "genere": "m|f", "relazione": "…" } ],
    "lavoro":   [ … ], "amici": [ … ], "altri": [ … ],
    "luoghi":   [ { "tipologiaId": "…", "nome": "…", "quartiere": "…" } ],
    "problemi": [ { "problemaId": "… (opzionale)", "testo": "…", "potenzialeFalsaPista": true } ] }
]}
```
