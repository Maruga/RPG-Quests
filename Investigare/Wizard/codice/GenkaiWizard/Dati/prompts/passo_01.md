# Passo 1 — Come è morto

## Obiettivo del passo
Il metodo di morte è il **vincolo generativo di tutto**: pre-esclude metà delle possibilità e ne rende obbligatorie altre (accesso, competenze, premeditazione, prossimità). Si definisce PRIMA di chi è morto e di chi ha ucciso.

## Contesto fornito
`setup` (durata, complessità, quartiere) + eventuale indicazione libera del GM (es. "vorrei qualcosa di domestico") + la biblioteca `tipologie_omicidio` come riferimento.

## Compito
Proponi 3 metodi di morte diversi tra loro, adatti alla cornice scelta. Per ciascuno: la riga unica nello stile del manuale ("È morto avvelenato."), la tipologia/sottotipo dalla biblioteca, e una frase su cosa quel metodo IMPONE alla situazione (il vincolo, non la trama).

## Vincoli specifici
- La rigaUnica è UNA frase sola, senza dettagli aggiuntivi: niente nomi, niente luoghi, niente movente.
- Rispetta la frequenza storica: se proponi arma da fuoco, dillo che restringe il cast (yakuza/caccia) — proponila solo se la cornice lo regge.
- Con complessità alta preferisci metodi che si mascherano (caduta, suicidio inscenato, annegamento); con complessità bassa metodi che parlano subito (contundente, lama).

## Errori da evitare
Metodi esotici (veleni introvabili, meccanismi da enigmistica); anticipare il colpevole; più di una frase.

## Output JSON
```json
{ "proposte": [
  { "tipologiaId": "…", "sottotipoId": "…", "rigaUnica": "È morto …", "cosaImpone": "una frase sul vincolo generativo" }
]}
```
