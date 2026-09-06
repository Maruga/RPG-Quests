# Combattimento v3 — decisioni di design

Fonte: `Simulazione.xlsx` dell'utente + decisioni in sessione (2026-09-03/05).
**Dal 2026-09-06 il manuale corrente è `GENKAI_Combattimento.md` v3.1**: il v3.0 UNIFICATO del
2026-09-05 (tutto il contenuto v2.1 dentro, regole v3 che comandano) con applicate le due tornate di
direttive dell'utente del 2026-09-06 (vedi i due blocchi in fondo a DECISO); il poco ancora aperto è
in fondo al manuale («Da validare») e qui sotto in APERTI. v2.1, bozze v3, v3.0 e v3.1-bozza1 sono
congelate in `versioni/`.

## DECISO

- **Fasi**: iniziativa → azioni. Azioni: **Attaccare · Muoversi · Difendersi**.
- **Iniziativa**: 2d6 + modificatore da Presenza (tabella: 4→+2 · 5→+1 · 6→0 · 7→−1 · 8→−2 · 9→−3 · 10→−4)
  + **velocità dell'arma** (2026-09-04: va sommata — nella simulazione mancava). **Totale basso agisce prima.**
- **Attacco**: 2d6 ≤ attributo dell'arma → colpito (**sotto O UGUALE**, corretto 2026-09-04 — la formula
  excel del danno va adeguata: pari = colpito, scarto 0, danno = solo arma). **Scarto = attributo − tiro;**
  **danno totale = scarto + danno arma** (lo scarto è la precisione).
- **Mira**: fino a +3 all'iniziativa ↔ −1:1 al tiro d'attacco.
- **Chi attacca NON ha il tiro di difesa** in quello scambio (restano sempre assorbimento e copertura).
- **Chi viene colpito perde l'azione** (canone v2 mantenuto).
- **Difesa attiva** (azione Difendersi): tiro sull'**attributo di difesa dell'arma attaccante**
  (pistola→Distacco · keibō→Ascolto · lotta→Pazienza — profili per-arma RECUPERATI, decisione 2026-09-04);
  lo scarto di difesa si sottrae al danno, più assorbimento e copertura.
- **Spesa Ki in difesa** (2026-09-04): **massimo 1 Ki per scambio → −2 al tiro di difesa**;
  si dichiara **PRIMA di tirare**; consentita **solo restando a Ki ≥ 1 dopo la spesa** (serve Ki ≥ 2:
  in combattimento Ki 0 = morto, canone v2 — nessuno si uccide parando).
- **Distanza** (armi da fuoco): −1 ravvicinato · 0 normale · +1 lontano.
- **Armi** (da Simulazione.xlsx — colonne: Estrarre / Colpire / Ricarica):
  | Arma | Attacco su | Difesa su | Estrarre | Colpire | Ricarica | Danno |
  |---|---|---|---|---|---|---|
  | Pistola | Lucidità | Distacco | 4 | 2 | 5 | 4 |
  | Keibō | Silenzio | Ascolto | 2 | 2 | 0 | 2 |
  | Lotta | Presenza | Pazienza | 1 | 1 | 0 | 1 |
- Nota excel: `RANDBETWEEN(2,6)` è un refuso — i dadi sono sempre 1-6.
- **Critici nel nucleo v3** (2026-09-04, «importante» per l'utente): **1+1** = +1d6 danni in attacco,
  **+1d6 parato** sul tiro di difesa; **6+6** in attacco = mancato + **1d6 sulla tabella imprevisti**
  (colonne armi da fuoco / corpo a corpo / movimento — nel manuale v3); in difesa il 12 è solo
  una difesa fallita, nessun imprevisto.

- **UKEMI 受け身 — conversione in difesa** (2026-09-04): se vieni attaccato PRIMA di aver agito puoi convertire
  la tua azione in difesa (tiro di difesa, anche con Ki dichiarato prima) — ma l'azione è spesa.
  Chi ha GIÀ agito non converte: solo assorbimento e copertura. Vale contro UN attacco.
  Numeri: convertire sempre alza la sopravvivenza ~87%→90% (paga ma costa l'azione — bilanciata).
  **TIMING (2026-09-04): ALLA CIECA** — si decide PRIMA che l'attaccante tiri (sai che il colpo
  arriva, non quanto è preciso). Vedere il tiro e poi decidere = scartato («irreale, è come sapere
  quanto mi farà male il colpo»). Se rifiuti e arriva un altro attacco, la scelta si ripropone.
  Nome deciso 2026-09-05: **UKEMI 受け身** (vedi sopra).
- **TAME 溜め** (nome deciso 2026-09-05) = il +X iniziativa ↔ −X attacco nello stesso scambio (max 3).
  NON chiamarlo «mira»: MIRARE resta la manovra-azione della v2 (sistemata in v3: azione intera,
  −1/scambio max −2, fermi, poi spari a velocità 0).
- **Manuale v3 BOZZA 2 = INTEGRALE**: tutto il contenuto v2 è dentro, sistemato (manovre, sorpresa,
  zone, colpi multipli, soppressione, granata in tabella armi, fumogeno, Stringere i Denti, PNG,
  Senmon, dopo-scontro, conseguenze, riepilogo). Restano marcate [da validare] le trasposizioni:
  soglia Opportunità (5+), +3 sotto soppressione, granata difesa su Lucidità, parità=simultanei.

- **Armi ampliate (2026-09-05, [da validare])**: tabella completa nel manuale bozza 3 e nella
  Scheda Giocatori. Logica difese per famiglie (generalizza le 3 decise): fuoco→Distacco ·
  corto/mani→Pazienza · lungo→Ascolto. Nuove °: Automatica 9mm (3/2/4 d4), Compatta (2/1/4 d3),
  Mitraglietta (4/2/5 d4), Mazza (2/2 d3), Katana (3/2 d3). Riusate v2: fucile, precisione,
  coltello, improvvisata. Revolver d'ordinanza = la Pistola base decisa.
- **`Scheda_Giocatori_Combattimento.html`** (2026-09-05): riferimento da tavolo per i giocatori,
  2 pagine A4 stampabili — sequenza, Ukemi/Tame, formule, critici, 13 armi, esempi dal playtest.
  Derivata dal manuale: se il manuale cambia, aggiornarla.
- **PROSSIMI LAVORI (richiesti dall'utente 2026-09-05)**: 1) RIFARE il simulatore in chiave
  INTERATTIVA — quello attuale «non ha nulla di interattivo» per l'utente: serve un'esperienza
  giocata (narrazione, scelte, dadi in scena), non un pannello tecnico; 2) inserire il
  combattimento così ottenuto nella MINI-AVVENTURA del sito (sito_genkai/provalo/).

- **`Scena_Combattimento_Interattiva.html`** (2026-09-05): la simulazione GIOCATA richiesta
  dall'utente — fiction del mini-caso (cucina, nipote col coltello, collega), motore v3 completo:
  dichiarazioni a bottoni, iniziativa coi dadi animati e la scomposizione, UKEMI ALLA CIECA come
  scelta drammatica, Tame, Ki in difesa, critici con tabella, epiloghi (arresto / morte a Ki 0 /
  avviso Genkai). Playtest automatico: il PG demo (Silenzio 5, Pazienza 5, Presenza 4) da solo
  MUORE quasi sempre → scelte da GM della scena (non regole): il collega è IN CAMPO dal 1° scambio
  e il nipote DIVIDE gli attacchi tra i due. Tuning finale: dell'utente, giocando.
  Prossimo passo: innesto nella mini-avventura sito_genkai/provalo/ come scena 8.

- **KI PER TUTTI (utente, 2026-09-05, netto)**: la «Riserva» dei PNG — termine della v2
  («I PNG nello Scontro», 3/6/9) e del wizard casi — è **ABOLITA**: si chiama **Ki per chiunque**,
  taglie 3/6/9 (comparsa/duro/professionista). Resta la differenza d'esito: PNG a Ki 0 = fuori
  combattimento, PG a Ki 0 = morto. NON riusare mai la parola Riserva.
  ⚠ TODO WIZARD: il wizard casi genera «Riserva 3/6/9» nelle statistiche PNG → rinominare in Ki
  (UI + prompt + export); anche il dossier Bakuon la usa. Da fare in sessione wizard.

- **DAL PLAYTEST DELLA SCENA (utente, 2026-09-05 sera) — da portare nel manuale a scena validata**:
  1) **L'azione «Difendersi» dichiarata NON ESISTE PIÙ** («non ha senso: può convertire dopo») —
  la difesa È l'Ukemi (reattivo, alla cieca, con l'opzione 1 Ki −2 dentro l'Ukemi). Azioni:
  Attaccare · Muoversi · Minacciare. 2) **Nuova azione MINACCIARE** (design utente): tiro su
  Presenza; se riesce l'avversario è intimidito → **+2 alla sua iniziativa al prossimo scambio**.
  3) Il Tame si racconta «trattengo il fiato» (mai «carico il colpo»). 4) Nelle demo i PNG hanno
  Ki ≥ 5 (un Ki 3 «è già in zona Genkai», stona). 5) UI: mai dire «alla cieca» come commento;
  il bottone scelto resta evidenziato (✓ oro) e gli altri sbiadiscono.

- **MANUALE v3.0 UNIFICATO (2026-09-05 sera, richiesta utente «crea un unico manuale v3, il v3
  comanda sul v2»)**: confronto v2.1 ↔ bozza 3 fatto sezione per sezione. Applicato: tutto il testo
  v2 mancante è rientrato (intro, esempi riscritti coi numeri v3, tabella velocità azioni con
  estrarre 4 / ricaricare 5, note armi, muro «mettersi 1», Stringere i Denti nei colpi multipli e per
  i PNG, cecchino, Brivido sulla Nuca, Senmon in tabella, dopo-scontro e conseguenze integrali);
  le decisioni del playtest sono nel manuale (**niente azione Difendersi: la difesa è l'Ukemi ·
  MINACCIARE · Tame = «trattenere il fiato» · mai «alla cieca» · Ki per tutti**); la «Mitraglietta °»
  della bozza 3 (invenzione mia, non richiesta) è TOLTA e tornano i due mitragliatori v2;
  «Fuori Tempo» è in appendice come SOSPESA (costruita sul dado basso e sul tetto 9). La bozza 3 è
  congelata in `versioni/GENKAI_Combattimento_v3.0-bozza3.md`. Il vecchio `Simulatore.html` (pannello
  tecnico, bocciato) è archiviato in `versioni/`: la simulazione è `Scena_Combattimento_Interattiva.html`.
  **Buco trovato**: la velocità dell'azione Minacciare non è mai stata fissata (la scena usa 2) → APERTI.

- **SCENA — tarature decise dall'utente (2026-09-05 sera, dopo il suo playtest)**: 1) il PG della demo
  ha la Senmon **Lame e bastoni 1** (−1 col manganello; ha anche Lotta 1 d'accademia, come tutti) —
  motivo misurato: senza, uno scontro «attacco normale» dura 7-8 scambi e ~28 tiri, un terzo supera i
  9 scambi (colpire con 5 o meno = 28%); con la Senmon 5 scambi, 3 col Tame. 2) **Niente percentuali
  nei testi della scena**: «tolgono la narrativa» — si usano parole (difficile · poco probabile ·
  possibile · probabile · molto probabile). 3) I critici (1+1 / 6+6) vanno in un riquadro grande e
  lampeggiante con una riga di scena: l'utente non era riuscito a leggere il 6+6 in una nota piccola.
  4) Le battute del ragazzo variano a ogni scambio e seguono il suo stato (ferito, intimidito, a mani nude).
  5) **Scorrimento (feedback utente 2026-09-05 sera)**: dopo ogni scelta compare un TAGLIO («▼ cosa hai
  scelto») portato piano in cima allo schermo; dentro lo scambio la pagina non salta mai: segue il testo
  solo quanto basta e **gli ultimi dadi tirati non escono mai dallo schermo da soli** (il lettore deve
  vederli mentre sotto compare l'esito). Iniziative affiancate in due colonne; pause di lettura tra le
  fasi. Da riportare tale e quale nell'innesto in /provalo.

- **SCENA ONLINE (2026-09-06, richiesta utente «deve rimanere una pagina da sola … e inserita nella mini
  avventura; se è tutto a posto inseriscila nel sito; in fondo i commenti da inviarmi»)**: motore unico
  `sito_genkai/provalo/scontro.js` (+ `scontro.css`, `commenti.js`); pagina a sé `genkai.it/provalo/scontro/`;
  mini-caso `genkai.it/provalo/` a 9 scene con lo scontro in scena 8 (Ki dal caso, finale per esito).
  `Combattimento/Scena_Combattimento_Interattiva.html` è ora solo un wrapper locale dello stesso motore.
  Verifica: banco di prova jsdom (`scratchpad/jsdomtest/prova_scontro.js` e `prova_provalo.js`): 7 scenari
  a dadi pilotati (arma che si spezza/cade/scivola/incrina, mani nude con Lotta 1, Ukemi con e senza Ki,
  parata perfetta, doppio 6 in difesa, stringere i denti, minaccia, Tame, parità, arretro/aspetto/fuga,
  morte, Genkai) + 150 partite casuali senza errori; mini-caso intero 3 esiti + 12 partite. Modulo commenti:
  endpoint `POST /api/commenti` nel wizard (email a `Commenti:Destinatario`, default la casella mittente
  info@genkai.it; copia in `logs/commenti.jsonl`; trappola anti-bot; 15/giorno per IP), dll pubblicata.

- **DIRETTIVE DELL'UTENTE SUI 12 PUNTI (2026-09-06 sera) → manuale v3.1** (snapshot v3.0 in `versioni/`):
  1) parità d'iniziativa → agisce prima chi ha la **Presenza più alta** (a pari Presenza: simultanei [dc]);
  2) armi: ok alle ° + spada, machete, mitragliatrici leggera/pesante, «coprire più attributi possibile
  con una logica» → tabella riorganizzata per attributo d'attacco (Presenza impeto · Pazienza momento ·
  Silenzio calma · Lucidità linea · Distacco freddezza · Ascolto tempo/distanza: catena, armi da lancio)
  — valori ° e logica [da validare]; 3) Opportunità = azione descrittiva extra **oppure un movimento**
  (soglia 5+ ancora [dv]); 4) soppressione: chi la subisce «usa il dado più alto» — traduzione in v3
  [da definire] (proposta: 3d6, somma dei due più alti); 5) granata: da rivedere insieme; 6) distanza:
  distinguere armi bianche / da fuoco / pugni; afferrati, pistola e spada difficili — da definire alla
  fine con le armi; 7) **Sotto Tiro = mira già fatta**: velocità 0 + bonus di mira compreso [−2 dc];
  muoversi sotto tiro non è facile [da definire]; 8) **piccolo movimento + attacco: nessun costo,
  decide il GM** (correre dall'altra parte e sparare = troppo; tavolo già ribaltato = ok); 9) **Fuori
  Tempo RESTA**, con tetto più alto e comprensibile [proposta 15, dc]: chi sfora perde l'azione e la
  completa nel prossimo scambio agendo presto; non si può fare apposta; «tirare solo un dado per
  iniziativa» [da chiarire]; 10) Senmon-difesa e stallo: da rivedere insieme; 11) **Ki dei PNG come i
  PG** (attributo più basso + dado alto di 2d6, tetto 12 — Manuale del Giocatore): via le taglie
  3/6/9; 12) **Minacciare = velocità 0** (solo voce); se riesce l'avversario è **scosso**: malus da
  **+1 a +3** ai suoi tiri, gravità per scarto [scala +1/+2/+3 per scarto 0/1/2+ e «tutti i tiri del
  prossimo scambio» = mia lettura, dc]; il GM può fargli abbassare l'arma; se fallisce niente;
  **chi minaccia può comunque difendersi**. 13) **Regola opzionale (GM)**: il Ki non va sotto 0; a
  0 il GM può decidere che il PG è vivo ma a terra e fuori gioco [tiro su un attributo: quale, dc]
  — anche nel combattimento online.
  **Analisi (problemi trovati, da sottoporre)**: (a) Minacciare così com'è rischia di DOMINARE: velocità
  0 (agisci quasi sempre per primo), non ti scopre (difesa intera), e un +3 su un avversario con
  attacco 4-5 lo rende quasi innocuo → un PG con Presenza 7-8 può minacciare a ogni scambio e
  l'avversario non colpisce mai; serve un limite (una sola minaccia efficace per scontro? la seconda
  volta non ci casca? il malus non si rinnova finché non è passato?). (b) Ki dei PNG con la formula
  dei PG: una comparsa 5-6 sta a 6-11 invece di 3 → gli scontri si allungano (la demo passerebbe da
  ~5 a ~9 scambi): nella scena online il ragazzo resta a 5 (= 4 + 1, dentro la formula) finché non
  dici altro. (c) Tetto Fuori Tempo 15: un'azione singola resta sempre sotto (regola v2 conservata);
  sfora solo chi impila (alzarsi 2 + estrarre e sparare 4 = 6 → 2d6 + 6 + Presenza > 15 nel 17% dei
  casi con Presenza 6, 42% con Presenza 4) — plausibile. (d) Sotto Tiro con mira −2 + Senmon + Tame
  sta dentro il tetto −4: nessun problema.

- **SECONDA TORNATA DI DIRETTIVE (2026-09-06, tarda sera) → v3.1 definitiva**: 1) **Minacciare**: non a
  ripetizione (letto: non due scambi di fila — da confermare se invece è «una volta per scontro»); **se
  fallisce, basta per lo scontro**; se riesce, **al prossimo tiro d'iniziativa chi la subisce ritira il
  dado più basso e tiene il più alto** (sostituisce il malus +1/+3 di prima); 2) **Soppressione**: chi la
  subisce tira **3d6 e somma i due più alti**; 3) **Sotto Tiro NON ha bonus di mira** («mirare è una cosa,
  sotto tiro è un'altra; non si sommano»): velocità 0 e al massimo la distanza — la mia versione «mira
  compresa» è TOLTA; 4) **Fuori Tempo resta con tetto 15**: chi sfora non agisce nello scambio e completa
  l'azione nel prossimo con iniziativa = **il dado migliore dei 2d6 e basta** («tiri due dadi ma prendi il
  migliore»); ora è una manovra vera, l'appendice v2 è sparita; ⚠ è caduta l'eccezione v2 «un'azione
  singola si completa sempre» (segnalato in Da validare); 5) **Ki del ragazzo nella scena online resta
  5**: «è una cosa nostra, la simulazione non è un esame sulle regole» — il Ki dei PNG segue la formula
  dei PG solo al tavolo; 6) **Regola opzionale Ki 0**: tiro su **Distacco o Pazienza, a scelta del
  giocatore** (i due attributi plausibili proposti da me su sua richiesta) — nella scena online il
  giocatore fa da GM: può applicarla o tenere la regola base; 7) **parità anche di Presenza = simultanei**;
  8) **armi**: «per ora va bene, decido quando le gioco» → ° restano da validare al tavolo.
  Motore online riscritto di conseguenza (scontro.js): scosso = ritiro del dado, opzione minaccia
  spenta dopo un successo (uno scambio) o per sempre dopo un fallimento, fuori tempo oltre 15 con
  completamento a un dado, epilogo Ki 0 con la scelta della regola opzionale (esito «aterra» nel
  mini-caso, con finale dedicato).
- **CONFERME (2026-09-06, notte)**: 1) **Minacciare si prova UNA VOLTA SOLA per scontro, riuscita o no**
  («un PG può provare a intimidire una sola volta in combattimento, non ha senso più volte») — la
  lettura «non due scambi di fila» è superata; scritta per chiunque minacci, PNG compresi; 2) Fuori Tempo
  senza l'eccezione v2 «l'azione singola si completa sempre»: **confermato**; 3) Distacco o Pazienza per il
  tiro del Ki 0: **confermato**. Manuale, Scheda e motore online allineati.
- **TERZA TORNATA (2026-09-06, notte) — chiusi tutti gli aperti**: 1) **Opportunità: soglia 5** («va bene il
  5»); 2) **granata: Ukemi su Distacco** («va bene Distacco»); 3) **distanza e colluttazione**: approvata la
  tabella proposta («va bene così») — afferrati: pugni/prese/coltello/improvvisate/manganello normali,
  spada-katana-machete-mazza +2, pistole +2 e niente mira, fucili e mitragliatrici non si usano (o +3 GM); a
  contatto ma liberi: fuoco −1; vicino: fuoco normale, lame e pugni prima si muovono; lontano: fuoco +1
  (precisione 0), lancio +1; il «+1/+2 caotico» v2 è sostituito dal +2 da afferrati; 4) **Senmon**: «il
  Senmon fa solo diminuire il tiro per attaccare o altro, la difesa la lasciamo com'è ora, non si può
  scegliere» → grado solo sui tiri attivi, MAI in difesa; idea dei profili alternativi chiusa: no; **nota da
  implementare: le Senmon d'arma sono distinte per arma specifica, dichiarata** («Pistola +1 non significa
  fucile o altro; posso avere Pistola +1 e Coltello +1, sono due Senmon separate») → manuale riscritto
  (tabella «Un'arma, dichiarata»; mia lettura: *Pistola* copre revolver, automatica e compatta), scena online
  PG con **Manganello 1** al posto di «Lame e bastoni 1», REGISTRO per `GENKAI_Specializzazioni.md`, TODO
  wizard `senmon.json`; 5) **stallo**: tolto — «due che si difendono all'infinito non ha senso in nessun
  gioco» (era un residuo delle mie note del 2026-09-05, non una regola).

## APERTI (non decisi — non inventare)

- **Dubbi mandati all'utente il 2026-09-05 sera** (default = com'è scritto ora nel manuale):
  1) parità d'iniziativa = simultanei; 2) armi ° e logica difese per famiglie; 3) Opportunità 5+;
  4) soppressione +3 iniziativa; 5) granata → Ukemi su Lucidità; 6) incastro «−1 ravvicinato» v3 con
  «+1/+2 caotico a contatto» v2; 7) Sotto Tiro: con i 2d6 la velocità 0 batte il tuffo (1) solo ~56%
  delle volte (in v2 era netto) — va bene?; 8) muoversi+attaccare; 9) Fuori Tempo: ripensare o
  lasciar cadere; 10) Senmon profili difesa · stallo; 11) taglie Ki PNG 3/6/9 (dopo il commento
  «Ki 3 è già in Genkai»); 12) **velocità di Minacciare** (0 / 1 / 2 — la scena usa 2).

- ✔ NOMI DECISI (utente, 2026-09-05): **UKEMI 受け身** = l'azione che diventa difesa («vado in difensiva, in Ukemi») · **TAME 溜め** = la carica, +iniziativa ↔ −tiro («trattengo il fiato, in Tame»). «Conversione» e «prendere il tempo» sono nomi MORTI: non riusarli.

- **Nessun punto di regola aperto** (2026-09-06 notte). Resta solo la prova al tavolo dei valori delle
  armi ° («decido quando le gioco»). Wizard PG: `senmon.json` già allineato e online (una Senmon per arma;
  «Lame e bastoni» nascosta, resta solo per le schede vecchie). TODO WIZARD casi: statistiche PNG «Riserva
  3/6/9» → Ki con la formula dei PG.
- Chiusi altrove, tolti da qui: Critici e Soroban in combattimento (il manuale dice «non muove il
  soroban», registro 2026-09-05); «piccolo movimento + attacco» senza malus, decide il GM (direttiva
  2026-09-06).
- Numeri delle probabilità di riferimento: attacco su 5→28% · 6→42% · 7→58% · 8→72%;
  1 Ki in difesa ≈ 1,5 danni parati in media (conviene contro armi grosse).
- La scena di combattimento della demo `sito_genkai/provalo/` si ricostruirà su QUESTO sistema
  quando sarà chiuso.
