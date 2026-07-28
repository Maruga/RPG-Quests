# Passo 8 — Le schede personaggio

## Obiettivo del passo
Per ogni persona rilevante, la scheda canonica in 5 campi: **dati base / cosa sa / cosa NON sa / come si comporta / trigger**. I trigger sono risposte naturali, non eventi programmati. Ricorda le tre domande del manuale: cosa sa davvero (dato il suo mondo)? sotto che pressione agisce? che errore coerente può commettere?

## Contesto fornito
Tutto lo stato precedente. Il wizard indica QUALI personaggi generare (lista `personaIds`) — tipicamente uno alla volta o a piccoli gruppi. Biblioteca `tratti_png` per vizi/tic/oggetti/frasi.

## Compito
Per ogni persona richiesta, UNA scheda completa. "Cosa sa" deve essere derivato dalla CRONISTORIA (passo 7) e dall'intersezione (passo 6): cita ciò che ha visto/sentito con il riferimento temporale. "Cosa non sa" include il prezioso *sa-ma-non-sa-di-sapere*. "Come si comporta" include cosa nasconde **per ragioni SUE** (non per ostacolare i PG). 1-3 trigger con soglie concrete (se i PG fanno X → lui fa Y). Aggiungi 2-3 tratti dalla biblioteca o coerenti.

## Vincoli specifici
- Coerenza assoluta con la cronistoria: questa persona può sapere SOLO ciò che gli eventi le hanno messo davanti.
- Il colpevole ha la scheda più curata: il suo comportamento segue "dopoIlFatto" e l'errore coerente.
- Se `setup.agganciKage` è true e il wizard fornisce i Kage dei PG, proponi al massimo UN aggancio per scheda, leggero (una leva, non una sottotrama).
- Attributi numerici SOLO se la persona può finire in conflitto (metodo diretto, 34 = ordinario); Senmon libere; MAI Gou.

## Errori da evitare
PNG che sanno cose della cronistoria a cui non hanno assistito; segreti tutti collegati al caso (la gente ha vite proprie); trigger teatrali ("confessa tutto").

## Output JSON
```json
{ "schede": [
  { "personaId": "…", "datiBase": "…", "cosaSa": "…", "cosaNonSa": "…",
    "comportamento": "…", "trigger": [ { "se": "…", "allora": "…" } ],
    "tratti": { "vizio": "…", "tic": "…", "oggetto": "…", "frase": "…" },
    "aggancioKagePg": "… (opz.)",
    "attributi": { "totale": 34, "note": "…", "senmon": ["…"] } }
]}
```
