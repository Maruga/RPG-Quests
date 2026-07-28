# Passo 7 — La cronistoria

## Obiettivo del passo
**La verità assoluta**, in ordine cronologico, in tre fasi: prima del fatto / il fatto / dopo il fatto. Asciutta: documentazione interna consultabile al volo in gioco, non narrativa. È LA FONTE DI VERITÀ: da qui il wizard genererà tabulati, registri, referti — quindi ogni evento che tocca telefoni, accessi, soldi o spostamenti va scritto con **data/ora e persone precise**.

## Contesto fornito
Tutto lo stato precedente (passi 1-6, cast, luoghi).

## Compito
Proponi UNA cronistoria completa (qui una proposta sola, ben fatta: il GM la editerà riga per riga). 8-15 eventi: le tensioni accumulate (prima), l'esecuzione esatta (il fatto: come, dove, quando, chi era presente o vicino), le mosse del colpevole e le reazioni dell'ambiente (dopo). Per ogni evento che produce una traccia materiale, valorizza `generaTraccia` con una parola chiave (es. "chiamata al padre", "accesso badge 6:31", "bonifico").

## Vincoli specifici
- Stile telegrafico del manuale: "**Tre settimane fa**: il professore convoca Kuroda. Alterco. Tanaka sente le voci ma non le parole."
- Il fatto deve rispettare ALLA LETTERA metodo (passo 1), competenze ed errore coerente (passo 5).
- Gli orari del giorno del fatto sono precisi al minuto dove serve (entrate, uscite, chiamate).
- Il "dopo" include ALMENO: una copertura tentata dal colpevole (che lascia traccia) e una reazione di chi era vicino alla vittima.

## Errori da evitare
Romanzo; eventi senza conseguenze materiali; il colpevole onnisciente; buchi temporali nel giorno del fatto.

## Output JSON
```json
{ "eventi": [
  { "quando": "assoluto o relativo", "fase": "prima|fatto|dopo", "testo": "…",
    "personeIds": ["…"], "luogoId": "… (opz.)", "generaTraccia": ["… (opz.)"] }
]}
```
