# Revisione AI #2 — Registro decisioni (2026-07-13)

> **Documento di lavoro.** Rassegna punto-per-punto della seconda review esterna (30 punti).
> Le decisioni si annotano qui man mano; le modifiche si applicano **tutte insieme a fine rassegna**. Non applicare nulla prima.
> Verdetti di verifica: già controllati sui file (2026-07-13, notte).

## Stato

| # | Punto | Verdetto verifica | Decisione |
|---|---|---|---|
| 1 | Gou: raddoppio aggirabile (bruciarsi) | Incomprensione da testo ambiguo: la regola intesa NON è "paga quel che hai" | ✅ **DECISO** — riformulare (vedi sotto) |
| 2 | Genkai: spettatore troppo a lungo | Struttura confermata (il peso a Ki 1 è VOLUTO; il Supporto è la via) | ✅ **DECISO** — rientro con 2d6 singoli (vedi sotto) |
| 3 | Generazione distretti impossibile | **BUG VERO** (Situazioni 449): "dado più alto" non supera 6; la clausola max-9 rivela l'intento = **somma** 2d6 | ✅ **DECISO** — opzione A: somma 2d6 |
| 4 | Quadro legale Italia/Giappone | 3 ritocchi veri + rifinitura custodia; "99% confessioni" = claim FALSO (testo già corretto) | ✅ **DECISO** — a+b+c+e sì, d respinto |
| 5 | Attributi alti non proteggono da 11/12 | È il CUORE del gioco — design confermato | ✅ **DECISO** — A + regola opzionale "9" |
| 6 | Supporto punisce chi aiuta i deboli | Design deliberato: aiutare chi affoga costa, È il punto | ✅ **DECISO** — A + riga di chiarimento |
| 7 | "Indizi sempre" non ovunque | Principio ok; da esplicitare scope + tipi di operazione | ✅ **DECISO** — B con distinzione campo/ufficio |
| 8 | Satori senza plausibilità | RIDEFINITO dall'utente: non più successo automatico — dado fisso 2 + modificatori normali | ✅ **DECISO** — meccanica nuova + riga plausibilità |
| 9 | Gou soprannaturali vs "niente superpoteri" | La via di mezzo È l'identità — va dichiarata, non rotta | ✅ **DECISO** — A: riga-manifesto |
| 10 | PG liberi senza Senmon iniziale | **VERO** — fix solo lato creazione libera | ✅ **DECISO** — 1 Senmon G1 ai creati da zero; pregen intoccati |
| 11 | Costi Senmon ambigui (9/19/39) | Confermata lettura: costi del passaggio, totale 67 | ✅ **DECISO** — "in aggiunta" |
| 12 | Conteggio usi pesante | Sistema confermato (la pratica conta) | ✅ **DECISO** — A + valvola GM facoltativa (C) |
| 13 | Correzione Maestro poco definita | Precisata dall'utente: proprio tiro, anche riuscito-ma-non-convincente, entro la scena; la difesa non ha Senmon | ✅ **DECISO** — frase di paletti |
| 14 | Peso segreto dedotto dal soroban | Feature voluta: si vede il sintomo, non il motivo — gancio per il gioco tra PG | ✅ **DECISO** — A + NUOVA regola strascico |
| 15 | Soroban binario (soglia 5) | Binario confermato; lo strascico (n.14) dà già memoria alla scala | ✅ **DECISO** — A, nessuna modifica |
| 16 | Guarigione attributi simultanea | Modello B confermato: tutti +1/notte, mai oltre scheda (già così nel testo) | ✅ **DECISO** — A, nessuna modifica |
| 17 | Voto del tavolo rischioso | Voto confermato; il criterio anti-teatro si porta anche lato giocatori | ✅ **DECISO** — A + mezza riga |
| 18 | Nessuna tregua post-Kage | La tregua c'è già (soroban 6); si esplicita il "quando" del nuovo Kage | ✅ **DECISO** — A, riga esplicita |
| 19 | Consenso su segreti/sabotaggio PG | A + GM ultima parola + paragrafo "il caso irrisolto" (fallire è previsto, e un irrisolto è un seme) | ✅ **DECISO** |
| 20 | Fuoco di copertura vs iniziativa fissa | **SUPERATO**: l'utente ristruttura il combattimento — iniziativa a ogni scambio | ✅ **DECISO** — nuovo sistema a scambi (vedi sotto) |
| 21 | Prima azione senza tiro | Vero micro-buco — fix 1 frase | — |
| 22 | Lucidità dominante | Parziale — bilanciamento da playtest, mitigato da Senmon/paletti | — |
| 23 | Difesa gratuita illimitata | Design esplicito ("difendi ogni volta") | — |
| 24 | Sorpresa: Ascolto senza difficoltà | Il tiro è lo standard di sistema (niente tiri opposti in GENKAI) | — |
| 25 | Mancano zone/distanze | Assenza voluta (teatro della mente); 3 fasce = opzione per revisione modulo | — |
| 26 | Relazioni profonde vs Kiwami ±1 | **GIÀ SCRITTO** (Reg 785: "non cambiano per effetto dei tiri") | — |
| 27 | En temporaneo vs permanente | Micro-chiarimento sensato — 1 riga | — |
| 28 | Ki max ritirato < Ki attuale + reroll 1 | Vero micro-buco — 1 riga (+1 parola sul reroll "una sola volta") | — |
| 29 | Regole duplicate | = punto 8 prima review: fonte unica già in piano; allineamento fatto 2026-07-12 | — |
| 30 | Etichette lavorazione + riferimenti file | Pre-stampa; `Kage_Notevoli.md` e `Watanabe_Hideo_Procuratore.md` ESISTONO (pacchetto AI incompleto) | — |

## Decisioni prese

**1 · Gou — attivazione e costo (2026-07-13)**
Regola canonica (parole dell'utente): *puoi usare un Gou solo se hai Ki a sufficienza per pagarne il costo per intero. Puoi finire a 3, 2 o 1 (ricevi l'effetto, poi scatta il Genkai) — mai sotto l'1: se il costo ti porterebbe a 0 o meno, il Gou NON è attivabile.* Niente pagamento parziale, mai. L'exploit del reviewer non esiste nella regola intesa: quando il costo raddoppiato supera il Ki disponibile, il Gou è indisponibile finché il costo non riscende (notte) o il Ki non risale.

**2 · Genkai — rientro (2026-07-13)**
Struttura invariata (opzione A): niente rientro automatico — se i compagni non ti tirano su, è successo qualcosa; a Ki 1 DEVE essere difficile riprendersi (ti sei sacrificato con un Gou o peggio). Cambia solo il tiro di rientro: **2d6 al posto di 1d6, letti come dadi SINGOLI (mai somma)** — ogni dado ≤ Ki attuale = +1 Ki (quindi 0, 1 o 2 Ki per cambio scena). Entrambi i dadi si confrontano col Ki di partenza del tiro. Con 1 e 2 non fa 3: sono un successo a Ki≥1 e un successo a Ki≥2, valutati uno per uno. Resta: Genkai a Ki ≤ 3, rientro in gioco quando Ki > 3, Supporto dei compagni invariato. Spiegarlo bene nel testo.

**3 · Generazione distretti (2026-07-13)**
Opzione A: la regola casuale è la **somma di 2d6** (era l'intento originale, tradito dal refuso "prendi il dado più alto"). Campana centrata su 7, clampata 4-9.

**4 · Quadro legale (2026-07-13)**
a+b+c+e approvati, d respinto (il testo sul 99% è già corretto: parla di condanne, non confessioni).

**5 · Attributi e 11/12 (2026-07-13)**
Design confermato: il fato segna chiunque, è il cuore del gioco — nessuna modifica meccanica. In più: **regola opzionale** (a discrezione del GM) per gli attributi a **9 o più** (oltre 9 = casi speciali che un GM può concedere): su quell'attributo il **Nami− (11) non ha effetto** e il **Kiwami− (12) costa un solo punto** (~1 invece di 2). Solo nel Regolamento, marcata chiaramente come opzionale; grep per frasi tipo "quasi impermeabile" e sfumarle se esistono.

**6 · Kyōryoku/Supporto (2026-07-13)**
Meccanica invariata (revisione di aprile confermata). Si aggiunge una riga che dichiara la filosofia, così il costo non viene scambiato per una svista.

**7 · Indizi e operazioni delegate (2026-07-13)**
Opzione B + precisazione dell'utente: le operazioni delegate si dividono per natura. **Sul campo/irripetibili** (pedinamento, appostamento): possono fallire davvero, il GM lo prevede. **D'ufficio/ripetibili** (tabulati, esami, archivi): il fallimento è *ritardo* (anche grave), non perdita — un tabulato si richiede, un esame si rifà. **Perdita di una prova** = il danno più grave: mai da un tiro qualsiasi, solo evento raro e deliberato del GM (es. Corruzione), di base molto difficile.

**8 · Satori — nuova meccanica (2026-07-13)**
Regola canonica (parole dell'utente): il Satori si applica **al tiro del giocatore**. Quando lo invochi **non tiri: il dado puro vale 2** — hai fatto il meglio possibile — **senza Kiwami** (niente +1/+1, niente En +1). Poi si applicano **normalmente tutti i modificatori** (En, situazione, bonus): se anche col 2 il totale supera l'attributo, il tiro fallisce. Il Satori è il meglio di te, non un miracolo: non convinci il boss "perché sì" — fai un tiro perfetto, e coi malus giusti può non bastare. Resta: 1/sessione, dichiarato prima, nessun costo, si perde a fine sessione. + Riga di plausibilità (opzione A) e chiarimento "vale sui tuoi tiri, non su distretto/Procura".

**9 · Identità dei Gou (2026-07-13)**
Opzione A: la via di mezzo si dichiara. I casi restano sempre umani; il Gou è l'unica ambiguità concessa, personale, mai risolutiva ("vi aiuta a vedere, mai a sapere chi è stato").

**10 · Senmon iniziale (2026-07-13)**
I PG **creati da zero** ricevono **1 Senmon di grado 1**, giustificata dal background. I **pregenerati non si toccano**: sono pregenerati per definizione — se il GM li prepara così, c'è un motivo.

**14 · Soroban visibile + strascico (2026-07-13)**
**A**: il Soroban è visibile a tutti; il *motivo* no. È il momento di coinvolgimento: un PG può chiedere cosa ti affligge e aiutarti — la vita continua anche coi problemi. **NUOVA REGOLA (strascico, SIMMETRICO — confermata)**: il giorno dopo NON si riparte da 5 secco — si riparte dal **valore di chiusura avvicinato di 1 verso il valore di riposo** (5 di norma; 4/3 se il Peso del Kage lo impone). Vale in entrambe le direzioni: chiudi a 7 → parti da 6, poi 5; chiudi a 3 → parti da 4, poi 5; chiudi a 9 o a 0 → servono quattro-cinque giorni per tornare al centro. Le giornate estreme lasciano coda, in bene e in male.

## Fix da applicare a fine rassegna

**1 · Gou** — Riformulare in tutti i punti che parlano di "bruciarsi/fino a Ki 1":
- Testo tipo: *"Attivi un Gou solo se puoi pagarne il costo per intero restando ad almeno Ki 1. Puoi scendere fino a 1 (prima ricevi l'effetto, poi scatta il Genkai se sei a ≤3) — ma se il costo ti porterebbe a 0 o sotto, il Gou non si attiva. Il costo si paga sempre per intero."*
- Punti da toccare (da rilocalizzare in fase di applicazione): Regolamento sezione Gou · Briefing riga ~120 ("Puoi bruciarti: il costo può portarti fino a Ki 1") · Manuale Giocatori sezione Gou (verificare presenza frase analoga).

**2 · Genkai — rientro con 2d6 singoli**
- Testo tipo (Regolamento, *Rientro in Gioco*): *"Al cambio di ogni scena tiri **2d6 e leggi ogni dado da solo — non si sommano mai**. Ogni dado ≤ al tuo Ki attuale vale **+1 Ki** (puoi recuperare 0, 1 o 2 Ki). Entrambi i dadi si confrontano col Ki che avevi all'inizio del tiro. Quando il Ki supera 3, rientri in gioco."* + esempio riscritto (es. Ki 2, esce 1 e 5: l'1 è successo, il 5 no → Ki 3; scena dopo, esce 2 e 3: entrambi ≤3 → Ki 5, rientri).
- Punti da toccare: Regolamento *Genkai → Rientro in Gioco* (righe ~846-855, incluso l'esempio) · Briefing riga ~186 ("tiri 1d6...") · Manuale Giocatori sezione Genkai (da localizzare) · eventuale riga nel riassunto rapido.

**3 · Distretti — metodo casuale**
- Situazioni riga ~449: *"**Metodo casuale** — per ogni attributo tira **2d6 e somma i dadi**. Risultato minimo 4, massimo 9 (sotto 4 conta come 4, sopra 9 conta come 9)."*

**4 · Quadro legale**
- **(a)** GM ~164: la battuta di Yamada *"Il PM ha firmato"* → *"La Procura ha ottenuto il mandato dal giudice."* Verificare altre occorrenze di "firma/firmato il mandato" in GM e Regolamento; sfumare la scheda Watanabe dove serve ("inoltra al giudice", non "concede") — meccanica invariata (il tiro resta sulla Procura).
- **(b)** GM ~166: esempio di rifiuto — sostituire l'intercettazione con **tabulati telefonici** su un testimone non sospettato: *"Il PM non chiederà mai i tabulati di un testimone senza indizi. Trovatemi qualcosa di concreto."*
- **(c)** Situazioni, in testa alla sezione dei 10 enti d'esempio: riga di cornice — *"Questi esempi usano enti di paesi ed epoche diverse per mostrare la flessibilità del sistema. Per la campagna Kyoto 1997: la Scheda Distretto (`Materiale/Scheda_Distretto.md`) e il Quadro Legale — Giappone 1997 (Manuale GM)."*
- **(e)** GM, cronologia del fermo: precisare che la detenzione e le proroghe (10+10 giorni dentro i 23 complessivi) sono **autorizzate dal giudice** su richiesta del PM — una frase, resto invariato.

**5 · Regola opzionale "La solidità del maestro"**
- Regolamento, box vicino a Nami/Kiwami (o in coda alla sezione tiri): *"**Regola opzionale — a discrezione del GM.** Per un attributo a **9** (o oltre, nei casi speciali che il GM ha concesso): su quell'attributo l'**11 (Nami−) non ha effetto**, e il **12 (Kiwami−) costa un solo punto** (a scelta: attributo o Ki) invece di due. Il maestro non è immune — ma il colpo, quasi sempre, scivola."*
- Verifica: grep "impermeabile" (e simili) nei manuali → se una descrizione promette immunità, sfumarla.

**6 · Kyōryoku — riga di chiarimento**
- Regolamento (coda sezione Kyōryoku) + Manuale Giocatori (sezione supporto): *"Aiutare chi sta affondando costa più che aiutare chi è solido — ed è voluto: il supporto non è un bonus gratuito, è farsi carico del rischio di un compagno. Il prezzo dell'esserci."*

**7 · Manuale GM — scope del principio + classificazione (mezza pagina, capitolo costruzione casi)**
- Riga di scope: *"Il principio 'gli indizi si danno sempre' vale per gli indizi — ciò che i PG trovano indagando. Le operazioni delegate al distretto sono vantaggi operativi: il loro rischio è il prezzo di delegare, e non nega mai l'indizio in sé."*
- Tabella dei 4 tipi: **Essenziale** (mai negabile/distruggibile senza una seconda pista evidente; ogni conclusione indispensabile ha più vie — è già come sono costruite le avventure) · **Approfondimento** (può arrivare tardi o incompleto) · **Conferma** (può mancare senza fermare il caso) · **Vantaggio operativo** (può fallire).
- Distinzione operazioni delegate: **sul campo/irripetibili** (pedinamento, appostamento) = possono fallire, il GM prevede la conseguenza · **d'ufficio/ripetibili** (tabulati, esami, archivi, richieste formali) = il fallimento è ritardo anche grave, ma si può sempre richiedere/rifare · **perdita di una prova** = evento raro e deliberato del GM (es. Corruzione attivata), mai esito di routine.

**8 · Satori — riscrittura**
- Regolamento (sezione Satori ~791-803), testo tipo: *"Una volta per sessione, dichiarato **prima** del tiro: non tiri — il tuo **dado puro vale 2**, il meglio che potevi fare. Non è un Kiwami (nessun bonus, l'En non sale). Tutti i modificatori si applicano normalmente: se anche col 2 il totale supera l'attributo, il tiro fallisce. Il Satori garantisce il **miglior esito plausibile** dell'azione: non rende possibile l'impossibile, non crea prove che non esistono, non cancella chi è un PNG. Vale sui **tuoi** tiri — non su quelli del distretto o della Procura. Nessun costo; se non usato, si perde."*
- Esempio yakuza riscritto coi numeri: *"Devi convincere il boss a lasciarti andare — En −4, Presenza 6. Satori: dado 2, +4 dal malus = 6 ≤ 6: per un soffio, il boss decide che non vali il fastidio. Ti lascia andare — non diventa tuo amico: l'En resta −4. (Con Presenza 5 non sarebbe bastato nemmeno il momento perfetto.)"*
- Punti da toccare: Regolamento · Briefing (sezione Satori, esempio "successo automatico, niente tiro" da riscrivere) · Manuale Giocatori (sezione Satori, da localizzare) · eventuali righe nei riassunti rapidi.

**9 · Gou — riga-manifesto**
- Manuale Giocatori riga ~40: *"Non avete superpoteri. Avete un Gou: un dono ambiguo, che né voi né il gioco spiegate fino in fondo."*
- Dove si presentano i Gou (Giocatori ~162 e/o Regolamento sezione Gou): *"Il soprannaturale non esiste nei casi di GENKAI — i colpevoli sono umani, le soluzioni pure. L'unica ambiguità concessa è il Gou: vi aiuta a **vedere**, mai a sapere chi è stato. Se sia intuito allenato o qualcosa di più, il gioco non risponde — e il tavolo non deve chiederselo."*

**20 · COMBATTIMENTO v2 — sistema a scambi (2026-07-13, CONSOLIDATO con l'utente)**
Sostituisce iniziativa di gruppo fissa e struttura a turni del modulo BOZZA. Regole canoniche:
- **Lo scambio**: entrambi tirano 2d6 a ogni scambio. **Iniziativa = dado più basso + velocità dell'arma** (estrazione se da sfoderare, uso se in mano): agisce prima chi ha il totale più basso. La **somma** dei 2d6 è il tiro d'azione: attacco per chi agisce (attributo dell'arma), difesa per l'altro.
- **Danno = scarto attaccante + danno arma − scarto difensore − Assorbe** (coperture/protezioni).
- **Chi subisce danno perde la propria azione** in quello scambio ("come i maghi in D&D"). In gruppo: tirano tutti, si agisce in ordine d'iniziativa, chi ha preso danno salta.
- **Chi agisce può fare altro** (ripararsi, muoversi, ricaricare) invece di attaccare — allora l'avversario non danneggiato fa la sua azione.
- **Velocità**: ogni arma ha *vel. estrazione* e *vel. uso*; **Ricarica/Indossare è come sfoderare**: malus di velocità per l'azione combinata (ricarico e sparo = dado basso + valore Ricarica: perdi tempo).
- **Attributi**: attacco per arma (pugnale→Pazienza, pistola→Lucidità, granata→Presenza…); **difesa** su Lucidità/Distacco/Pazienza secondo situazione (linee guida + GM).
- **Assorbe** (giubbotto 3, tavolo 1, muro 5): riduzione **fissa e automatica** del danno, indipendente dalla difesa — la protezione c'è, punto.
- **Spareggio**: velocità totale più bassa → secondo dado puro → simultanei.
- **Opportunità**: se anche il tuo **dado più alto + velocità** resta sotto l'iniziativa dell'avversario → un'azione descrittiva extra (riparo+sparo, ricarico+sparo — mai due attacchi), spendibile nel round o nel successivo. *(Scelta: iniziative modificate, non dadi puri — consiglio accettato... da confermare.)*
- **Critico 1+1**: in attacco +1d6 danni; in difesa +1d6 assorbimento. Il GM definisce il colore.
- **Colpi multipli** (pistola max 3): ogni colpo = tiro 2d6 separato con propria iniziativa; malus fisso sulla somma di TUTTI i colpi (+3 se tre, +2 se due); i colpi si intercalano con le azioni nemiche in ordine d'iniziativa; **se prendi danno la sequenza si interrompe**. Esempio utente validato (8>7 manca · 7=7 → 3 danni · 6<7 → 4 danni).
- **Tabella armi v2** (vel estr. / vel uso / ricarica / danno / raffica / max colpi): Pugno 1/1/0/1/no/0 · Coltello 2/1/0/2/no/0 · Pistola 3/1/4/3/no/3 · Fucile 4/2/5/4/no/0 · Mitragliatore leggero 4/2/5/4/sì/9 · Mitragliatore pesante 5/3/6/5/sì/9 · Granata 2/2/2/4/no/0. Protezioni (indossare/assorbe): Giubbotto 4/3 · Tavolo ribaltato 2/1 · Muro 0/5. **Danno pistola = 3 (tabella), da provare sul campo.**
- **Genkai SOSPESO in combattimento** (l'adrenalina lo supera): si valuta a fine scontro. Morte: danno senza pavimento, Ki ≤ 0 = morto.
- **RAFFICA — DA DEFINIRE** (bozza utente): chi la fa non mira, protegge i compagni; prende il dado più alto come iniziativa; tira solo la riuscita; i compagni agiscono coperti; chi si espone riceve gli attacchi.
- Conseguenze: punto 20 reviewer decaduto; i punti 21/23/24/25 da rileggere sul sistema nuovo; il modulo `GENKAI_Combattimento.md` va **riscritto** (non ritoccato).

**19 · Consenso PG-PG + il caso irrisolto (2026-07-13)**
- Manuale Kage (sez. Shimi/favori) + richiamo Manuale GM: *"Il Kage crea conflitto tra personaggi — mai tra giocatori. Segreti, indagini reciproche e scorciatoie sporche funzionano solo se il tavolo ha accettato questo tipo di gioco: parlatene alla sessione zero. **L'ultima parola è del GM**, in base al tipo di campagna e a quanto concordato. Una Shimi può complicare il caso — non dev'essere lei a renderlo insolubile."*
- **NUOVO paragrafo Manuale GM — "Il caso irrisolto"**: fallire un caso ci sta ed è previsto — alcuni casi sono costruiti per poter finire male o non chiudersi; nessun investigatore ha il 100%. Distinzione da scolpire: *"gli indizi si danno sempre" = il dado non blocca l'indagine; ma le conclusioni sbagliate restano possibili — è il gioco.* E un irrisolto è un **seme**, non un vicolo cieco: può riaprirsi più avanti (nuove prove, una frase che sfugge in un interrogatorio futuro, una scoperta in un altro caso — il cold case che torna). Indicare al GM che un caso irrisolto è spunto per tanto altro.

**18 · Kage — la tregua**
- Manuale Kage, dopo la Ricompensa (~156): *"Il nuovo Kage non ha fretta: si co-crea con calma e può entrare in gioco dal caso successivo o anche dopo — lo decidono insieme giocatore e GM. Il caso con il soroban a 6 è la vostra pace: godetevela, è rara."*

**17 · Voto Scene Personali — criterio anti-teatro lato giocatori**
- Regolamento (sez. Scene Personali, vicino ai criteri) + Manuale Giocatori (sez. Kage/scena): *"Si vota la **verità del personaggio**, non la performance: crollare e non riuscire a dire nulla può essere una gestione eccellente."* (Nel Manuale GM c'è già — si uniforma.)

**14 · Soroban — testo da scrivere**
- Regolamento, sez. *Dopo il Recupero* (~126): sostituire "riporta il Soroban a 5" con: *"Dopo il tiro, il Soroban del giorno nuovo parte dal **valore di chiusura di ieri, avvicinato di 1 verso il valore di riposo** (5 di norma; 4 o 3 se il Peso del Kage lo impone — vedi `GENKAI_Kage.md`). Vale in entrambe le direzioni: chiudere a 7 significa partire da 6; chiudere a 3, partire da 4. Le giornate estreme lasciano coda — il buonumore ti sorregge, le giornate nere pesano ancora."* + esempio numerico (7→6→5 e 3→4→5, e il caso Peso 4: converge a 4).
- Manuale Kage (riga ~40-41): aggiungere la riga "sintomo visibile": *"A Peso 4-5 il soroban lo tradisce — ed è voluto: quando un problema ti consuma, i colleghi lo vedono. Segreto resta il **contenuto** del Kage, non il suo peso. Se un compagno chiede e ascolta, quello è il gioco."*
- Allineare Briefing e Manuale Giocatori dove riassumono il soroban ("torna a 5").

**13 · Correzione del Maestro — paletti (2026-07-13)**
- Specializzazioni, in coda alla regola (~40-44), frase tipo: *"La Correzione vale solo su un **tuo** tiro fatto con quella Senmon, **entro la scena**. Puoi rifare un tiro fallito — o anche uno riuscito che non ti convince, quando vuoi guardare meglio (può essere il GM stesso a proportelo). Il nuovo risultato vale, anche se è un 11 o un 12: correggersi è un rischio. Non corregge i tiri degli altri, né quelli del distretto o della Procura. Le difese non hanno Senmon: non si correggono."*

**12 · Usi Senmon — valvola facoltativa**
- Specializzazioni (dopo la regola degli usi): *"**Valvola del GM (facoltativa)**: un caso in cui la Senmon è stata centrale può valere **3 usi**; il GM può inoltre concedere usi o punti bonus quando la pratica sul campo lo merita."*

**11 · Costi Senmon — chiarimento**
- Specializzazioni (sotto la tabella dei gradi) + Regolamento ~996: *"Ogni grado si paga **in aggiunta** ai precedenti: da zero a Maestro, 9+19+39 = **67 punti** in tutto (più gli usi sul campo)."*

**10 · Creazione da zero — Senmon iniziale**
- Regolamento, capitolo creazione (dopo attributi/Gou): *"Scegli **una Senmon di grado 1** (Praticante, +1), giustificata dal tuo passato: cosa sapevi fare prima di entrare nella squadra? (Elenco e regole: `GENKAI_Specializzazioni.md`.)"* — stessa riga nel Manuale Giocatori se ha il capitolo creazione (da localizzare). Nessun tocco a schede pregenerate né a Specializzazioni.
