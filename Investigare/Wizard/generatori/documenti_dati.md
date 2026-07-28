# Generatori: documenti-dati (motore comune)

Stesso pattern del tabulato per tutti: **righe vere dalla cronistoria + rumore realistico dal profilo + sintesi pre-elaborata + grezzo per il GM + lint del manuale** (≥1 nota utile, ≥1 neutra, mai il colpevole). Seed = id progetto (riproducibile).

---

## refertoAutopsia
- **Input**: metodo di morte (passo 1 + biblioteca tipologie), ora del decesso e circostanze (cronistoria), chi ha trovato il corpo.
- **Contenuto**: causa della morte, segni sul corpo, ora stimata (con la forbice realistica, non il minuto esatto), stato degli organi rilevanti. NON il nome del colpevole, NON deduzioni investigative.
- **Nota investigativa in calce** (regola del manuale): l'elemento che non quadra / il dettaglio da approfondire / la domanda lasciata aperta dal medico legale — dice DOVE guardare, mai la risposta.
- **Tempi**: disponibile giorno 1. La prima causa può essere sbagliata in buona fede ("arresto cardiaco") se il metodo lo consente: la correzione arriva con la tossicologica.

## tossicologica
- **Input**: sostanza (biblioteca tipologie → sottotipo), quantità/via di assunzione (cronistoria).
- **Contenuto**: composto identificato, concentrazione, finestra di assorbimento — da cui i PG DEDUCONO la finestra di somministrazione (il referto non la dichiara).
- **Tempi**: +48h dal prelievo (regola canonica). Il wizard mette la disponibilità nel calendario vivo.

## registroBadge / registroAccessi
- **Input**: eventi-accesso della cronistoria (persona, luogo, orario), popolazione abituale del luogo (chi entra normalmente e quando).
- **Contenuto**: la lista del giorno richiesto con orari; il rumore = gli accessi normali di tutti gli altri. L'anomalia (le 6:31 di chi arriva sempre alle 7:30) NON è evidenziata: emerge dal confronto — o da una riga di sintesi "accessi fuori fascia abituale" se l'ente che lo produce farebbe davvero quella sintesi.
- **Variante cartacea**: registro firmato a mano (guardiola, visitatori): stessa logica, più errori umani (firme illeggibili, righe saltate) — il motore ne inserisce di innocui.

## estrattoConto
- **Input**: eventi-denaro della cronistoria (bonifici, prelievi anomali), profilo economico della persona (stipendio, affitto, abitudini).
- **Contenuto** (pre-elaborato secondo il manuale): pattern regolare · anomalie (prelievi fuori zona, importi insoliti, destinatari non identificati) · saldo e tendenza (in deterioramento?) · eventuali note/solleciti della banca già nel fascicolo.
- **Cifre 1997**: stipendi impiegatizi 250-400k ¥/mese; affitti Kyoto 60-120k; il motore tiene i conti in equilibrio COERENTE col profilo (un buco deve avere una causa nella cronistoria o nei problemi).

## listaPresenti (invitati, turni, passeggeri)
- **Input**: evento della cronistoria (ricevimento, turno, corsa), cast presente/assente, riempitivi dal generatore nomi.
- **Contenuto**: nome · relazione in due parole (collega, vicino, ex socio) · eventuale nota ("non si è presentato", "andato via prima", "unico estraneo al gruppo"). Alcune note aprono domande, altre sono neutre — mai la risposta.

## cronologiaBrowser (solo se la vittima/il colpevole aveva un computer: nel '97 è già una caratterizzazione)
- **Input**: eventi-ricerca della cronistoria, profilo dell'utente.
- **Contenuto**: ricerche normali raggruppate per tema · ricerche ANOMALE rispetto al profilo elencate con data · pagine ricorrenti · nota tecnica ("cronologia cancellata dall'utente, recupero parziale" — se coerente con l'errore del colpevole).

## rapportoIntervento (119/110)
- **Input**: l'evento-ritrovamento della cronistoria.
- **Contenuto**: orario chiamata, chi ha chiamato, cosa ha dichiarato, orario arrivo, stato della scena, primi presenti. Burocratico, senza interpretazioni.

---

## Resa finale (tutti)
Template HTML **stile burocratico Giappone 1997** (riuso dello stile handout di Sake/Ultima Lezione): intestazione ente, numero protocollo, data era Heisei (1997 = Heisei 9), timbri. Stampabile in A4 e leggibile da cellulare. Il markdown resta la fonte; l'HTML è la veste.
