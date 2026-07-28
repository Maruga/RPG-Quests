# Passo 11 — Il calendario vivo

## Obiettivo del passo
Il mondo continua a muoversi anche se i PG non fanno nulla. Il calendario genera pressione in modo naturale: ogni giorno il colpevole fa una mossa per coprirsi, e OGNI MOSSA LASCIA UNA TRACCIA. Non punisce i lenti — stratifica.

## Contesto fornito
Tutto lo stato precedente (cronistoria, schede, tracce).

## Compito
Proponi il calendario dei giorni 0-5 (o più se la durata è alta): eventi automatici (necrologio, referti che arrivano coi loro tempi, funerale, riapertura dell'ufficio della vittima) ed eventi CONDIZIONALI ("se i PG non hanno ancora interrogato X → il colpevole le parla, e lei si mette a disagio"). Per ogni mossa di copertura del colpevole, indica in una parentesi la traccia che aggiunge.

## Vincoli specifici
- Tempi tecnici realistici: autopsia giorno 1, tossicologica 48h, risposte bancarie/enti coi tempi del passo 9.
- Le condizioni guardano ad azioni OSSERVABILI dei PG (hanno interrogato X? sequestrato Y?), mai al loro "livello di sospetto".
- Il colpevole agisce secondo la sua scheda: spaventato e coerente, non stratega.
- Includi almeno un evento sociale che aumenta la pressione istituzionale (stampa, superiori, famiglia della vittima).

## Errori da evitare
Countdown artificiali ("al giorno 4 fugge" senza causa); eventi che chiudono strade essenziali; il mondo che aspetta i PG.

## Output JSON
```json
{ "giorni": [
  { "giorno": 0, "momento": "sera", "evento": "…", "condizione": "… (opz.)", "personeIds": ["…"] }
]}
```
