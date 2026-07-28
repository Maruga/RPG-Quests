# Passo 9 — Le tracce

## Obiettivo del passo
Riconoscere cosa **esisterebbe davvero** in questa situazione (non piazzare indizi) e, per ogni traccia, **in quanti modi i PG possono arrivarci**: le strade sono il parametro della complessità.

## Contesto fornito
Tutto lo stato precedente — in particolare la CRONISTORIA (ogni traccia nasce da un evento: `eventoOrigineId`) e `setup.complessita` (il bersaglio da rispettare).

## Compito
Produci la mappa delle tracce (10-18 voci): per ognuna nome, cosa rivela, tipo (fisica/documento/datoTecnico/referto/testimonianza), **classificazione canonica** (essenziale/approfondimento/conferma/vantaggioOperativo), reperibilità (campoIrripetibile/ufficioRipetibile), evento d'origine, e le **strade** (1-4) con requisito (nulla/interrogatorio/mandatoGiudice/richiestaEnte/accessoTecnico/sospettoPreesistente) ed eventuali tempi (tossicologica: 48h).

## Vincoli specifici
- Test di realtà per OGNI traccia: "questa cosa ci sarebbe nella realtà?" Se sì c'è, se no non c'è.
- Ogni traccia **essenziale** DEVE avere ≥ 2 strade (regola "gli indizi si danno sempre": i dadi non chiudono il caso).
- Il numero medio di strade deve rispettare `setup.complessita`: alta = strade poche e con requisiti; bassa = strade multiple e spontanee.
- Quadro legale '97: tabulati/conti/perquisizioni → mandatoGiudice o richiestaEnte; MAI intercettazioni.
- Includi le tracce dell'errore coerente del colpevole e delle sue coperture post-fatto.
- Almeno 2 tracce devono portare a false piste reali (i problemi non-colpevoli del cast).

## Errori da evitare
Tracce che esistono solo per i giocatori; l'indizio che "dice il colpevole" da solo; tutte le strade dallo stesso requisito; dimenticare le tracce istituzionali (registri, uffici — le più realistiche del 1997).

## Output JSON
```json
{ "tracce": [
  { "nome": "…", "cosaRivela": "…", "tipo": "…", "classificazione": "…",
    "reperibilita": "…", "eventoOrigineId": "…",
    "strade": [ { "via": "…", "richiede": "…", "tempoOre": 0 } ] }
]}
```
