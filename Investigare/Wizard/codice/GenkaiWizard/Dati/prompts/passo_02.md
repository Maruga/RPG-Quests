# Passo 2 — Chi è morto

## Obiettivo del passo
Identità **professionale e sociale** della vittima — che posto occupava nel mondo. NON la psicologia, NON la storia profonda. Metodo × professione = la scena del crimine emerge da sola.

## Contesto fornito
`setup`, `passo1` (metodo di morte), biblioteca `professioni`.

## Compito
Proponi 3 vittime diverse: professione (dalla biblioteca o coerente con essa), età, genere, e la frase "posto nel mondo" (es. "professore di chimica, Università di Kyoto, 25 anni di carriera"). Per ciascuna: una riga su come metodo+professione disegnano già la scena, e — se c'è — la **domanda interessante** che nasce dall'incrocio (es. un esperto di chimica avvelenato: perché non se n'è accorto?).

## Vincoli specifici
- La professione deve rendere PLAUSIBILE il metodo del passo 1 (accesso, contesto).
- Età coerente con la carriera dichiarata.
- Il quartiere del setup deve reggere quella professione (un tōji del sake sta a Fushimi, non a Kita).

## Errori da evitare
Biografia e psicologia (arrivano dopo); vittime "speciali" (celebrità, politici nazionali) che sbilanciano un caso locale; anticipare famiglia o nemici.

## Output JSON
```json
{ "proposte": [
  { "professioneId": "…", "postoNelMondo": "…", "eta": 0, "genere": "m|f", "scenaCheEmerge": "…", "domandaInteressante": "… (opzionale)" }
]}
```
