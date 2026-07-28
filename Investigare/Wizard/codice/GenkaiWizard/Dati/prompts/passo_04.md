# Passo 4 — Perché è morta

## Obiettivo del passo
Il movente si definisce **PRIMA di sapere chi ha agito** ed è il passaggio più importante del metodo: funziona da FILTRO sul cast già costruito. Regola: **uno forte vale più di tre deboli**.

## Contesto fornito
`setup`, `passo1`, `passo2`, `passo3` + `cast` completo, biblioteca `moventi`.

## Compito
Proponi 3 moventi diversi, ognuno CALATO in questa situazione specifica (non generico). Per ciascuno: quale movente della biblioteca, la descrizione concreta (cosa esattamente stava per succedere/succedeva), e l'effetto-filtro sul cast: chi resta candidabile con quel movente e chi viene ESCLUSO e perché (come fa il manuale con l'esempio Kuroda).

## Vincoli specifici
- Il movente deve poggiare su elementi GIÀ presenti nel passo 3 (i problemi, le relazioni nominate). Non introdurre fatti nuovi di peso: al massimo precisa quelli esistenti.
- Un movente per proposta. Mai combinazioni.
- Per ogni proposta almeno UN escluso eccellente (la persona che i giocatori sospetteranno comunque: falsa pista naturale).

## Errori da evitare
Moventi che richiedono persone non ancora esistenti; moventi da thriller (serial killer, cospirazioni); dichiarare già il colpevole (il filtro restringe, non nomina).

## Output JSON
```json
{ "proposte": [
  { "moventeId": "…", "descrizione": "cosa stava per succedere, concretamente",
    "candidati": [ { "personaId": "…", "perche": "…" } ],
    "esclusioni": [ { "personaId": "…", "perche": "…" } ] }
]}
```
