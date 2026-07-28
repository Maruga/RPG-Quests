# Passo 6 — Il mondo del colpevole

## Obiettivo del passo
La seconda rete: famiglia, lavoro, amici, **altri** (il giro, il creditore, il vecchio socio — fuori dai tre cerchi) e luoghi del colpevole — come al passo 3 per la vittima: il colpevole è una persona con lo stesso peso. Il tesoro è l'**intersezione tra le due reti**: chi conosceva entrambi spesso **sa qualcosa senza sapere di saperlo**.

## Contesto fornito
Tutto lo stato precedente (in particolare passo3, cast, passo5), biblioteche `nomi`, `luoghi`, `problemi_segreti`.

## Compito
Proponi 2 versioni del mondo del colpevole. Ognuna: 3-6 persone nuove o già esistenti (se il colpevole è del cast, parte della sua rete c'è già — estendila, non duplicarla); i suoi luoghi; cosa lo connette alla vittima; **cosa ha fatto DOPO il fatto** (come è cambiato il comportamento, cosa ha cercato di nascondere e come — coerente con l'errore del passo 5); e l'elenco esplicito dell'intersezione: per ogni persona/istituzione nell'incrocio, UNA riga su cosa sa senza sapere di saperlo (à la manuale: "Tanaka sa dell'alterco ma non del perché; l'ufficio postale ha i registri dei bonifici").

## Vincoli specifici
- Ogni elemento aggiunto deve guadagnarsi il posto: esisterebbe nella vita reale di questa persona?
- L'intersezione include anche ISTITUZIONI (segreterie, uffici, banche, poste): sanno cose per registro, non per memoria.
- Il "dopo il fatto" genera tracce fresche: nominale in una riga ciascuna.

## Errori da evitare
Reti fotocopiate dalla vittima; complici gratuiti; il colpevole che dopo il fatto agisce da professionista (deve agire da persona spaventata, coerente con l'errore).

## Output JSON
```json
{ "proposte": [
  { "famiglia": [ … ], "lavoro": [ … ], "amici": [ … ], "altri": [ … ],
    "luoghi": [ { "tipologiaId": "…", "nome": "…", "quartiere": "…" } ],
    "connessioneVittima": "…",
    "dopoIlFatto": "comportamento, coperture tentate",
    "intersezione": [ { "chi": "personaId o istituzione", "saSenzaSapere": "…" } ] }
]}
```
