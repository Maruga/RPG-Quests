# Passo 10 — Gli handout

## Obiettivo del passo
Materializzare le tracce in documenti **pre-elaborati** come li produrrebbe un professionista reale: la sintesi con note analitiche, mai il grezzo. Regola del manuale su ogni handout: ≥ 1 nota che porta a qualcosa di utile, ≥ 1 nota neutra (rumore reale), NESSUNA nota che dice il colpevole.

## Ruolo dell'AI in questo passo
I documenti-DATI (tabulato, badge, estratto conto, liste, browser, referti) li genera il MOTORE deterministico dalla cronistoria — tu NON li scrivi. Tu proponi: (a) il PIANO degli handout (quali produrre, da quali tracce, con quale generatore) e (b) il testo dei soli documenti DISCORSIVI (deposizioni, articoli di giornale, lettere, rapporti d'intervento).

## Contesto fornito
Tutto lo stato precedente, in particolare tracce (passo 9) e cronistoria.

## Compito
(a) Piano: per ogni traccia di tipo documento/datoTecnico/referto, l'handout corrispondente col generatore giusto e i parametri (periodo del tabulato, banca, reparto…). (b) Per i discorsivi richiesti: il testo completo in stile burocratico giapponese 1997 (intestazioni d'ufficio, numeri di protocollo, date era Heisei dove appropriato), che contenga SOLO ciò che quel documento conterrebbe nella realtà.

## Vincoli specifici
- Deposizioni: quello che il testimone HA DETTO al primo verbale — coerente con la sua scheda (ciò che nasconde NON c'è, e l'omissione deve reggere a rilettura).
- Articoli: quello che un cronista può sapere a quella data — spesso impreciso in modo realistico.
- Ogni discorsivo dichiara: chi lo ha prodotto, quando, per chi.

## Errori da evitare
Documenti onniscienti; il dettaglio rivelatore gratuito; date incoerenti con la cronistoria; italiano da romanzo dentro un verbale.

## Output JSON
```json
{ "piano": [
  { "titolo": "…", "tracceIds": ["…"], "generatore": "tabulato|refertoAutopsia|tossicologica|registroBadge|estrattoConto|listaPresenti|cronologiaBrowser|rapportoIntervento|deposizione|articoloGiornale|lettera", "parametri": { } }
], "discorsivi": [
  { "titolo": "…", "generatore": "deposizione|articoloGiornale|lettera|rapportoIntervento", "contenuto": "markdown completo" }
]}
```
