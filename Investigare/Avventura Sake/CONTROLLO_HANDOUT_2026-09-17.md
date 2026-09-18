# Controllo handout — 17 settembre 2026

> **Stampa completata il 18 settembre 2026.** Corretti esclusivamente i CSS di stampa. PDF verificati in `handout/PDF_STAMPA/`: 16 documenti, 19 pagine complessive; agenda di quattro pagine, tutti gli altri di una pagina. Controllate visivamente tutte le pagine. Contenuti HTML invariati rispetto alla versione salvata in Git. Le osservazioni sui contenuti qui sotto sono storiche e non sono state applicate: l'autore ha chiesto di terminare la preparazione alla stampa senza ulteriori ripensamenti.

**Esito:** contenuti principali coerenti con lo scenario; impaginazione di stampa da sistemare e alcuni dettagli da allineare. Nessun handout modificato durante questo controllo.

Letti i 16 HTML, la storia, le 16 schede PNG e le 10 location. Aperte entrambe le immagini delle planimetrie. Generati PDF con Chrome headless, usando formato e margini definiti nei CSS e senza intestazioni/piè di pagina aggiunti dal browser; contate le pagine di tutti i PDF e ispezionate alcune anteprime dei difetti.

## 1. Stampa: problema principale

**14 file su 16 producono due pagine.** Le eccezioni sono l'agenda (quattro pagine, corretto) e il biglietto Nishida (una pagina, corretto).

| File | Pagine ottenute | Osservazione |
|---|---:|---|
| H01a, H01b — Planimetrie | 2 ciascuno | Testata sulla prima pagina, mappa sulla seconda |
| H02 — Rapporto preliminare | 2 | Il contenuto prosegue, ma il footer dichiara «Pagina 1 di 1» |
| H03 — Lista presenti | 2 | Tabella societaria spezzata; footer «Pagina 1 di 1» |
| H04 — Ristrutturazione | 2 | Documento spezzato |
| H05 — Agenda | 4 | Una pagina per mese, come previsto |
| H06a, H06b, H06c, H06d — Referti | 2 ciascuno | Seconda pagina con il solo testo del footer; nell'anteprima di H06a anche un frammento del timbro |
| H07 — Menù | 2 | Non rispetta l'obiettivo di una pagina compatta |
| H08 — Biglietto Nishida | 1 | Nessuna pagina aggiuntiva |
| H09 — Lettere | 2 | Verificare la divisione: la nota di rinvenimento finisce sulla seconda pagina |
| H10 — Rapporto Nishida | 2 | Contenuto spezzato; footer «Pagina 1 di 1» |
| H11 — Tabulati | 2 | Firma e footer sulla seconda pagina; footer «Pagina 1 di 1» |
| H12 — Referto medico | 2 | Firma e timbro di acquisizione sulla seconda pagina |

In diversi file il CSS mantiene una `.document` larga 210 mm e alta almeno 297 mm dentro una pagina A4 che ha già margini propri: il foglio utile è più piccolo del contenitore. Le regole di stampa non azzerano queste dimensioni. Per le planimetrie occorre far rientrare insieme testata, immagine e footer nell'altezza utile del foglio orizzontale.

Riferimenti esemplificativi: `handout/06a_Referto_A_Sapone.html:8`, `:22-23`, `:261-265`; `handout/01a_Planimetria_Piano_Terra.html:8`, `:60-63`.

## 2. Lista presenti incompleta per gli interrogatori

H03 riporta solo «+ 2 aiuti cucina» nella riga di Endo (`03_Lista_Presenti.html:255`); anche H02 le lascia anonime (`02_Rapporto_Preliminare.html:245`). Mancano i nomi **Toda Yumi, 24 anni**, e **Mori Sachiko, 31 anni**, già stabiliti nelle rispettive schede. Mori è una testimone delle istruzioni di Ogawa sul sake: ometterne il nome dall'elenco rende meno immediato individuarla come persona interrogabile.

Non è una contraddizione sulla loro presenza, ma un'omissione pratica. Correzione proposta: due righe nominative in H03 e nomi espliciti in H02.

## 3. Agenzia dei camerieri: due nomi diversi

- H05, 29 ottobre: «agenzia **Kyoto Catering**» (`05_Agenda_Tanaka.html:357`).
- H11, telefonata del 7 novembre: «**Ag. Yamashita — Catering**» (`11_Tabulati_Telefonici.html:444`).

I documenti non spiegano se siano la stessa agenzia. Per i giocatori può diventare una pista involontaria. Proposta: usare una denominazione uniforme.

## 4. Data dei quattro referti a cavallo di mezzanotte

H06a-d riportano tutti «**14 novembre 1997 — ore 23:00-00:30**» (riga 281 di ogni file). Le 00:30 appartengono al 15 novembre. Dicitura proposta: «14–15 novembre 1997 — ore 23:00–00:30». Il problema è solo la data, non i tempi di gioco.

## Dettagli minori, non bloccanti

- H10 colloca Hayashi a Kyoto, nell'immobile di Kita-ku (`10_Rapporto_Nishida.html:283`), mentre H11 identifica una sua utenza come «Hayashi Kenji — Tokyo» (`11_Tabulati_Telefonici.html:422`). Può avere una spiegazione, ma il materiale non la fornisce: meglio chiarire la dicitura se si vuole evitare un'altra pista casuale.
- H12 parla di una sensibilizzazione documentata «nell'arco di 35 anni» (`12_Referto_Medico.html:319`), mentre l'anamnesi parte dal 1944 e il referto è del 1997. Il periodo non è spiegato: «nel corso degli anni» eliminerebbe l'ambiguità senza aggiungere storia clinica.
- Lo script `handout/crea_word.py` include H02–H08, con i quattro referti separati, ma non planimetrie e H09–H12. Limite già noto, rilevante solo se si usa l'esportazione Word come raccolta completa.

## Verifiche positive

- Quote societarie, età dei personaggi nominati, nomi e kanji confrontati con le schede: coerenti.
- Contatti e licenza di Nishida coerenti tra agenda, biglietto, rapporto e tabulati.
- H11: 19 chiamate, 13 uscenti, 6 entranti, 7 numeri distinti; tutte le durate corrispondono a inizio e fine.
- Agenda coerente con incarico a Nishida, rapporto finale e visita di Ogawa tre settimane prima della festa.
- Nessun handout rivela esplicitamente Ogawa come assassino o contiene istruzioni riservate al GM. I referti espongono gli indizi previsti dal caso.
- I quattro referti sono quattro file separati. Agenda e coppia di lettere restano ciascuna un solo oggetto, secondo la decisione dell'autore.
- Nessuna immagine HTML mancante; tutti i file hanno regole CSS per modalità scura e stampa. Non è stata eseguita una verifica visuale completa della modalità scura.
- **La mappa attuale del piano terra ha l'etichetta «Bagno ospiti / Otearai».** La precedente segnalazione di etichetta mancante, ancora presente in MEMORY e nel controllo del 15 settembre, è superata.
- Endo è correttamente indicato con 9 anni di servizio; il timbro di acquisizione di H12 è già al 14 novembre.

Il controllo riguarda coerenza interna e usabilità degli handout. Non costituisce una verifica della medicina o della chimica reali del meccanismo narrativo.
