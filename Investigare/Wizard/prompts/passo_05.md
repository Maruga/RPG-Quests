# Passo 5 — Chi ha ucciso

## Obiettivo del passo
Il colpevole è GIÀ nel cast: è la persona che aveva quel motivo. Non si inventa — si **identifica**. E si definisce il suo **errore coerente**: nessuno pianifica un crimine con la lucidità di un GM; le persone sbagliano in modo coerente con chi sono.

## Contesto fornito
Tutto lo stato precedente (setup → passo4 con candidati/esclusioni, cast).

## Compito
Per ciascun candidato plausibile del passo 4 (max 3), sviluppa la proposta-colpevole: perché proprio lui/lei, quali **competenze reali** ha (dato il suo mestiere e la sua vita) che spiegano il COME del passo 1, e soprattutto il suo **errore coerente** — l'errore che una persona così, sotto quella pressione, commette davvero (à la Kuroda: cancella le email locali ma non sa del server).

## Vincoli specifici
- SOLO persone del cast. Se nessuna regge, dillo esplicitamente nel campo `avviso` e suggerisci se rivedere il movente o come agganciare IN MODO COERENTE una persona nuova alla vita della vittima.
- Le competenze devono coprire il metodo del passo 1 — e i LIMITI di competenza devono generare l'errore (il chimico organico che non sa di tossicologia forense).
- L'errore coerente produce una traccia concreta (nominala: sarà un semilavorato del passo 9).

## Errori da evitare
Colpevoli perfetti senza errori; errori stupidi incoerenti col personaggio; il complice tirato fuori dal nulla.

## Output JSON
```json
{ "proposte": [
  { "colpevoleId": "…", "perche": "…", "competenze": "cosa sa fare davvero e cosa NO",
    "erroreCoerente": "l'errore e perché è coerente con chi è",
    "tracciaDellErrore": "la traccia concreta che quell'errore lascia" }
], "avviso": "… (solo se nessun candidato regge)" }
```
