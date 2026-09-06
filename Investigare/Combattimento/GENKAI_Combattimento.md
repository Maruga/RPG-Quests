# GENKAI 限界 — Lo Scontro
## Shōtotsu 衝突 — *manuale opzionale · **v3.1** (sistema ad azioni)*

> Questo è un modulo **opzionale**. GENKAI resta un gioco investigativo: il combattimento è raro,
> pericoloso, e la via intelligente resta chiamare rinforzi o andarsene. Ma un sospettato può
> barricarsi in casa, una consegna può andare male — e allora questo manuale dà un pizzico d'azione
> per spezzare una campagna. Non è un manuale di guerra: è mezz'ora di adrenalina, poi si torna a
> indagare.
>
> Gli altri manuali rimandano qui per tutto il combattimento.
>
> **v3.1 (2026-09-06)** — direttive dell'autore sui punti aperti: parità d'iniziativa → Presenza (a
> pari Presenza: simultanei) · Minacciare (velocità 0; se riesce l'avversario ritira il dado basso
> dell'iniziativa e tiene il più alto; si prova una volta sola per scontro, riuscita o no; chi
> minaccia può difendersi) · piccolo movimento + attacco a giudizio del GM · Sotto Tiro non è la mira ·
> Opportunità = azione descrittiva o movimento, soglia 5 · soppressione: 3d6, i due più alti · Fuori
> Tempo con tetto 15 e un dado solo · granata: Ukemi su Distacco · distanza e colluttazione per
> famiglie d'arma (afferrati: pistole e armi lunghe +2, fucili no) · Senmon d'arma: un'arma sola,
> dichiarata, e mai in difesa · Ki dei PNG come i PG · regola opzionale sul Ki 0 (tiro su Distacco o
> Pazienza) · armi ampliate su tutti gli attributi (i valori ° si provano al tavolo).
>
> **v3.0 (2026-09-05)** — il sistema **ad azioni** (dichiarazione → iniziativa → risoluzione, tiri
> separati) sostituisce lo scambio «a un tiro solo» della v2. La v2.1 è congelata in
> `versioni/GENKAI_Combattimento_v2.1.md`: tutto ciò che conteneva è qui, sistemato sulle regole
> nuove; dove le due versioni dicono cose diverse, vale la v3. I punti segnati **[da validare]**
> sono trasposizioni ancora da confermare con l'autore — l'elenco è in fondo.

---

## Le regole della casa

**Tutto ciò che ti aiuta ABBASSA il dado. Tutto ciò che ti ostacola lo ALZA.** Senmon, Tame,
preparazione, mira → si sottraggono dalla somma. Buio, fumo, distanza, colpi multipli → si sommano.
Il confronto è sempre lo stesso: **totale ≤ attributo = riuscito**.

- I modificatori favorevoli su un singolo tiro non superano mai **−4** complessivi (è il tetto +4
  del Regolamento, visto dal lato del dado). La somma modificata non scende mai sotto **2**
- **Niente Nami e Kiwami**: in combattimento i critici sono l'**1+1** e il **6+6** (vedi *I
  Critici*), e valgono **nei due sensi** — in attacco e in difesa. Il combattimento costa **Ki** —
  e **non muove il soroban**. Gli attributi i dadi non li toccano mai: può toccarli solo una tua
  scelta (*Stringere i Denti*)
- **Il Genkai non scatta in combattimento**: l'adrenalina lo supera. Si valuta **a fine scontro** —
  chi è a Ki ≤ 3 quando cala il silenzio, crolla lì
- **Il danno non ha pavimento**: può portare il Ki a zero e sotto. **A Ki 0 o meno il PG è
  morto.** Il fermarsi a 1 delle perdite di Ki (Regolamento, *Uscita Definitiva*) vale per costi e
  pressioni — **non** per il danno
  - *Regola opzionale, a scelta del GM (2026-09-06)*: **il Ki non scende sotto 0** (−1 o −2 contano
    come 0) e **a Ki 0 il GM può decidere che il PG non è morto**: è a terra e non può fare nulla —
    un tiro **su Distacco o Pazienza, a scelta di chi gioca** (2d6 ≤ attributo) decide: se riesce
    è vivo, a terra e fuori gioco; se fallisce è morto
- **Dotazione d'accademia**: ogni investigatore ha **Lotta 1** di base (Regolamento, *Creazione*)
  — judo, kendo e tecniche d'arresto

---

## Lo Scambio

Il combattimento procede a **scambi**. Ogni scambio ha tre tempi:

1. **DICHIARAZIONE** — ognuno dice cosa fa: **Attaccare · Muoversi · Minacciare** (o una manovra:
   Mirare, Prepararsi, Sotto Tiro…), con l'eventuale **Tame**. *La difesa non si dichiara*: è
   l'**Ukemi**, che scatta quando il colpo sta per arrivare (vedi *Le Azioni*)
2. **INIZIATIVA** — ognuno tira **2d6 + modificatore di Presenza + velocità dell'arma o
   dell'azione** (+ il Tame dichiarato; chi è stato *scosso* da una minaccia ritira il dado più basso
   e tiene il più alto). **Il totale più basso agisce per primo.** A parità agisce prima **chi ha la
   Presenza più alta**; a parità anche di Presenza le azioni sono simultanee — i danni si applicano
   insieme, anche se qualcuno va giù (deciso 2026-09-06). Un totale **oltre 15** è *fuori tempo*
   (vedi *Manovre*)
3. **RISOLUZIONE** in ordine di iniziativa. **Chi viene colpito perde la propria azione** se non
   l'ha ancora fatta — il colpo ti ha fermato — salvo *Stringere i Denti* (vedi *Manovre*)

Poi si dichiara lo scambio successivo: **l'iniziativa si ridecide ogni volta**.

**Il modificatore di Presenza** (si somma al tiro d'iniziativa — negativo è meglio: chi ha
Presenza è pronto prima):

| Presenza | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|
| Modificatore | +2 | +1 | 0 | −1 | −2 | −3 | −4 |

**La velocità**: arma **in mano** → colonna *Colpire*; arma **da sfoderare** → colonna *Estrarre*
(in quello scambio sfoderi e colpisci); scambio di **ricarica** → colonna *Ricarica* («ricarico e
sparo»). Per tutto il resto vale la scala della *Velocità delle Azioni* (più sotto).

**In tanti** (2 contro 3, la rissa): tirano tutti, si agisce in ordine di iniziativa, chi ha preso
danno salta la propria azione quando arriva il suo momento (salvo *Stringere i Denti*). **Chi è
bersaglio di più attacchi va in Ukemi contro UNO solo**; gli altri colpi passano pieni — ridotti
solo da **assorbimento e copertura**, che valgono sempre e contro tutti. Il numero conta: la fuga
resta la risposta giusta.

---

## Le Azioni

**ATTACCARE** — usi l'arma (vedi *L'Attacco*). Attaccare ti espone: chi ha speso l'azione
attaccando **non ha più il tiro di difesa** contro i colpi che arrivano dopo, in quello scambio —
solo assorbimento e copertura. *Prima agisci, prima ti scopri.*

**MUOVERSI** — un movimento pieno: riposizionarti, raggiungere una copertura, cambiare fascia
(vedi *Le Zone*), aprire una porta, buttarti fuori dalla stanza. Oppure **un piccolo movimento più
un attacco**, senza costo: **decide il GM quando il movimento è troppo** — correre dall'altra parte
della stanza e sparare è troppo; ripararsi dietro un tavolo già ribaltato e sparare va bene
(deciso 2026-09-06).

**MINACCIARE** — la voce, il distintivo, l'arma alzata: «*Metti giù il coltello!*». È solo voce:
**velocità 0**. Tiri **2d6 ≤ Presenza**: se riesce, l'avversario è **scosso** — **al prossimo tiro
d'iniziativa ritira il suo dado più basso e tiene il risultato più alto** (parte in ritardo) — e, se
il GM lo decide e la scena lo regge, **abbassa l'arma**. **Si prova una volta sola per scontro**,
riuscita o fallita: la voce fa il suo effetto una volta, ripeterla non ha senso (deciso 2026-09-06).
Se fallisce non succede nulla: hai speso l'azione. In ogni caso **chi minaccia può comunque
difendersi** in quello scambio: la voce non ti scopre come un attacco — hai il tiro di difesa, con
l'eventuale Ki (deciso 2026-09-06).

### Ukemi 受け身 — l'azione che diventa difesa

Non esiste un'azione «difendersi»: **la difesa è l'Ukemi**. Se stai per essere attaccato **prima
di aver agito**, puoi **andare in Ukemi** — «*vado in difensiva, in Ukemi*» — e la tua azione si
converte in difesa: tiri la difesa contro quell'attacco (vedi *La Difesa*), ma **la tua azione è
spesa**: in questo scambio non farai più nulla. Il tuo colpo sfuma per salvarti la pelle.

- Si decide **prima che l'attaccante tiri**: sai che il colpo arriva, non quanto sarà preciso
- Insieme all'Ukemi puoi dichiarare **1 Ki** per la difesa (vedi *Bruciare Ki*)
- Vale contro **UN** attacco. Se rifiuti e, prima del tuo turno, arriva un altro attacco, la
  scelta si ripropone
- **Chi ha già agito non va in Ukemi**: se hai vinto l'iniziativa e hai già attaccato (o fatto
  altro), contro i colpi che arrivano dopo hai solo assorbimento e copertura — con un'eccezione:
  chi ha **minacciato** può ancora difendersi (vedi *Minacciare*)

---

## Tame 溜め — trattenere il fiato

Quando dichiari un attacco puoi **trattenere il fiato** — il *tame*, la tensione prima del
rilascio del kendo: fino a **+3** sul tiro d'iniziativa, e **lo stesso ammontare in meno** sul
tiro d'attacco (1:1, dentro il tetto −4). Al tavolo: «*trattengo il fiato, in Tame*».

Più aspetti, più tardi agisci — e se ti colpiscono prima, il tuo colpo non parte mai. Si bilancia
da sola. *(Non è la manovra Mirare: quella è un'azione intera — vedi Manovre.)*

---

## L'Attacco

Tira **2d6** (− il Tame dichiarato, − la Senmon, ± i modificatori di scena): se il totale è
**minore o uguale** all'attributo dell'arma, il colpo va a segno — **pari all'attributo è
colpito**. Se supera, hai mancato: fine.

- **Scarto = attributo − tiro** (la precisione del colpo)
- **Danno totale = scarto + danno dell'arma** (con scarto 0 entra il solo danno dell'arma)

**DISTANZA E COLLUTTAZIONE** (deciso 2026-09-06) — conta la zona (vedi *Le Zone*) e la famiglia
dell'arma:

| Situazione | Pugni, prese, coltello, arma improvvisata, manganello | Spada, katana, machete, mazza | Pistole | Fucili e mitragliatrici |
|---|---|---|---|---|
| **Afferrati** (colluttazione, mani addosso) | normale | **+2** | **+2**, niente mira | non si usano (o +3, decide il GM) |
| **A contatto ma liberi** (un passo, il tavolo tra voi) | normale | normale | **−1** (ravvicinato) | **−1** |
| **Vicino** (la stessa stanza) | prima ti muovi | prima ti muovi | normale | normale |
| **Lontano** | — | — | **+1** (armi da lancio +1) | **+1**; il fucile di precisione 0 |

Su un bersaglio che **si sta buttando** o scarta di brusco: **+1**, cumulabile. Il **fucile di
precisione** a lontano ci vive: nessun malus. Il «+1/+2 caotico» della v2 è diventato il **+2 da
afferrati**: un numero solo.

---

## La Difesa

Tira la difesa **solo chi va in Ukemi**: **2d6 ≤ attributo di difesa dell'arma che ti attacca** —
la pistola si schiva col Distacco, il manganello si legge con l'Ascolto, la lama e le mani si
aspettano con la Pazienza (colonna *Difesa su* della tabella armi).

- **Scarto di difesa = attributo − tiro**: si sottrae dal danno in arrivo
- **Assorbimento e copertura** si sottraggono **sempre**, tiro o non tiro
- **Danno subito = danno dell'attacco − scarto di difesa − assorbimento − copertura** (minimo 0).
  Si perde in **Ki**
- Il tiro di difesa vale contro **UN** attacco a scambio; assorbimento e copertura contro tutti

**BRUCIARE KI IN DIFESA** — chi va in Ukemi può spendere **1 Ki (massimo 1 a scambio)** per **−2
al tiro di difesa**. Si dichiara **insieme all'Ukemi, prima di tirare**. Solo **restando a Ki ≥ 1
dopo la spesa** (serve Ki 2 o più): a Ki 0 in combattimento si muore — nessuno si uccide parando.
*Come i Gou: l'energia vitale si paga per intero, prima di sapere se basta.*

> **Esempio — tre scambi** *(TU: manganello in mano, Silenzio 5, Pazienza 5, Presenza 4, Ki 7 ·
> LUI: coltello, Pazienza 5, Ascolto 5, Presenza 6, Ki 5)*
> **Scambio 1** — Dichiarate entrambi l'attacco. Iniziativa: tu 3+4 +2 (Presenza 4) +2 (manganello)
> = **11**; lui 2+5 +0 +1 (coltello) = **8**. Agisce lui. Prima che tiri, vai in Ukemi: il tuo
> attacco sfuma. Lui tira 2+2 = 4 ≤ Pazienza 5: colpito, scarto 1 + coltello 2 = **3 in arrivo**.
> Tu difendi su Pazienza 5 (la lama si aspetta): 1+3 = 4 ≤ 5, scarto 1 → **prendi 2**. Ki 7 → 5.
> **Scambio 2** — Tu minacci (velocità 0), lui attacca. Iniziativa: tu 1+2 +2 +0 = **5**; lui 4+3
> +0 +1 = **8**. Agisci tu: «*Metti giù il coltello!*» — 2+1 = 3 ≤ Presenza 4: **scosso**. Poi lui:
> 5+3 = 8 > 5, **manca** — e se avesse colpito, avresti avuto comunque il tiro di difesa: la voce non
> ti scopre. (La minaccia è spesa: in questo scontro non la ripeti.)
> **Scambio 3** — Attacco contro attacco. Iniziativa: tu 2+3 +2 +2 = **9**; lui tira 3+3 ma è
> **scosso**: ritira il dado più basso, esce 5, tiene il 5 → 3+5 = 8, +0 +1 = **9**: **parità — agisce
> prima chi ha più Presenza: lui** (6 contro 4). Non hai ancora agito: Ukemi? Tieni l'attacco. Lui
> 3+1 = 4 ≤ 5: scarto 1 + coltello 2 = **3** → **tu a Ki 2**. Tu 2+3 = 5 ≤ Silenzio 5: scarto 0 +
> manganello 2 = **2** → **lui a Ki 3**. Si rimescola tutto — e i rinforzi sono ancora giù per le scale.

---

## I Critici — nei due sensi

**CRITICO — l'1+1** — il colpo è perfetto, il GM definisce il colore:
- in **attacco**: **+1d6 danni**
- in **difesa** (in Ukemi): **+1d6 parato**

**FALLIMENTO CRITICO — il 6+6** — solo sui tiri d'**attacco o azione attiva**: non hai solo
mancato, succede un imprevisto. **In difesa** un 12 è soltanto una difesa fallita — nessun
imprevisto. Tira **1d6** sulla colonna della tua azione (**1 blando → 6 disastroso**) e il GM
mette in scena il colore, come per l'1+1. La tabella è una guida, non una gabbia: se la scena
suggerisce di meglio, vale la scena.

| 1d6 | Armi da fuoco | Corpo a corpo | Movimento e altro |
|---|---|---|---|
| **1** | Il colpo finisce dove non doveva — un vetro, un'insegna, un'auto: rumore e attenzione | Il colpo taglia l'aria, plateale: l'avversario ti ha letto | Inciampi ma ti riprendi: rumore, qualcosa cade |
| **2** | La presa scivola: nello scambio dopo l'arma conta **come da sfoderare** | La presa scivola: nello scambio dopo l'arma conta **come da sfoderare** | Arrivi lungo o corto: l'azione riesce, ma scomposta — il GM la mette in scena |
| **3** | Era l'ultimo colpo utile: prima di risparare devi **ricaricare** | Ti sbilanci: l'avversario guadagna posizione — il GM la ridisegna | Un ostacolo ti ferma a metà: completi l'azione nello scambio dopo |
| **4** | **L'arma si inceppa**: sbloccarla è un'azione | **L'arma ti cade**: raccoglierla è un'azione | Finisci a terra: rialzarti è un'azione |
| **5** | Inceppata male: sbloccarla è un'azione con velocità **Ricarica** | **La lama si incrina** (o il bastone si spacca): al prossimo 6+6 con quest'arma, si rompe | Cadendo perdi ciò che tenevi: schizza via, raccoglierlo è un'azione |
| **6** | Il meccanismo si rompe: per questo scontro l'arma **non spara più** | L'arma **si spezza** o vola lontano: resti a mani nude (Lotta) | Il disastro di scena: la copertura cede, la porta si blocca alle tue spalle, il tavolo si ribalta dal lato sbagliato — il GM ridisegna la scena contro di te |

---

## Le Armi

Ogni arma ha l'attributo con cui **attacchi**, quello con cui **ti difendi** da lei, tre
**velocità** (Estrarre: sfoderarla · Colpire: ce l'hai già in mano · Ricarica), il **danno** — e
per alcune il fuoco a **raffica** e i **colpi multipli**.

**La logica degli attributi** *(direttiva 2026-09-06: coprire più attributi possibile, con una logica.
Le tre armi decise sono revolver, manganello e lotta; il resto è proposto, **[da validare]**)*.
In **attacco**: **Presenza** = l'impeto (mani nude, armi improvvisate, machete, granata) ·
**Pazienza** = il momento giusto (coltello, katana e spada, fucile di precisione) · **Silenzio** = la
calma e l'intenzione nascosta (manganello, mazza) · **Lucidità** = prendere la linea (pistole) ·
**Distacco** = la freddezza sotto il rinculo (fucili, mitragliatori) · **Ascolto** = il tempo e la
distanza (catena, armi da lancio). In **difesa**: **armi da fuoco, lanci e granata → Distacco** (ti
defili dalla traiettoria; deciso 2026-09-06) · **lame corte e mani → Pazienza** (aspetti e scarti) · **armi lunghe da botta e
taglio, catena → Ascolto** (leggi l'arco del colpo).

| Arma | Attacco su | Difesa su | Estrarre | Colpire | Ricarica | Danno | Raffica | Colpi | Note |
|---|---|---|---|---|---|---|---|---|---|
| **Lotta** (pugno, presa) | Presenza | Pazienza | 1 | 1 | — | **1** | no | 1 | Lotta 1 a tutti |
| **Arma improvvisata** (sedia, bottiglia, libro…) | Presenza* | Pazienza | 1 | 1 | — | **1–2** (GM) | no | 1 | |
| **Machete / accetta** ° | Presenza | Ascolto | 3 | 2 | — | **3** | no | 1 | la lama pesante: colpi d'impeto |
| **Granata** | Presenza | Distacco | 2 | 2 | — | **4** (area) | no | 1 | ognuno nell'area può andare in Ukemi |
| **Coltello / pugnale** | Pazienza | Pazienza | 2 | 1 | — | **2** | no | 1 | |
| **Katana / spada** ° | Pazienza | Ascolto | 3 | 2 | — | **3** | no | 1 | yakuza d'altri tempi |
| **Fucile di precisione** | Pazienza | Distacco | 5 | 3 | 5 | **5** | no | 1 | richiede la Senmon |
| **Manganello** (keibō 警棒) | Silenzio | Ascolto | 2 | 2 | — | **2** | no | 1 | d'ordinanza |
| **Mazza / spranga** ° | Silenzio | Ascolto | 2 | 2 | — | **3** | no | 1 | la mazza da baseball dei bōsōzoku |
| **Revolver d'ordinanza** (New Nambu) | Lucidità | Distacco | 4 | 2 | 5 | **4** | sì* | 3 | la «Pistola» base |
| **Automatica 9mm** ° | Lucidità | Distacco | 3 | 2 | 4 | **4** | sì* | 3 | criminali, yakuza |
| **Compatta .22/.25** ° | Lucidità | Distacco | 2 | 1 | 4 | **3** | no | 3 | tascabile, da teppisti |
| **Fucile** (pompa / caccia) | Distacco | Distacco | 4 | 2 | 5 | **4** | no | 1 | |
| **Mitragliatrice leggera** | Distacco | Distacco | 4 | 2 | 5 | **4** | sì | 9 | valori v2 |
| **Mitragliatrice pesante** | Distacco | Distacco | 5 | 3 | 6 | **5** | sì | 9 | valori v2; da scena, nessuno la porta in tasca |
| **Catena / frusta** ° | Ascolto | Ascolto | 2 | 2 | — | **2** | no | 1 | la catena dei bōsōzoku: senti quando è tesa |
| **Armi da lancio** ° (coltello, bottiglia, sasso) | Ascolto | Distacco | 1 | 1 | — | **1–2** (GM) | no | 1 | un colpo solo, poi è a terra |

*° = arma aggiunta in v3/v3.1, valori proposti **[da validare]**. Le altre riusano i valori v2 (fodero /
mano / ricarica = Estrarre / Colpire / Ricarica); revolver, manganello e lotta sono i valori decisi
dall'autore (`Simulazione.xlsx`).*

- **Le velocità si sommano al tiro d'iniziativa**: revolver nella fondina = +4 (estrai e spari
  nello stesso scambio); revolver in mano = +2. Il coltello sfoderato (1) batte il revolver nella
  fondina (4) e anche quello in mano (2): la lama è più rapida del grilletto non ancora puntato. La
  pistola torna davanti quando è **puntata** (*Sotto Tiro*: velocità 0)
- **Ricaricare è come sfoderare**: l'azione combinata «ricarico e sparo» usa la velocità di
  **Ricarica**. Perdi tempo — e si sente
- **Fucile di precisione**: richiede la Senmon *Tiro di precisione* 1+ (o un passato militare).
  Senza, lo usi come un fucile da caccia che non conosci: **Distacco, +2 alla somma**
- **Armi improvvisate** (*): l'attributo lo decide il GM dalla scena (di norma Presenza —
  l'impeto). Il combattimento in casa è il caso tipico di GENKAI: la colluttazione non voluta, la
  bottiglia afferrata al volo, la sedia alzata per tenere a distanza
- **Raffica delle pistole** (*): possono fare fuoco di soppressione una volta, ma svuota il
  caricatore — dopo, vanno **ricaricate**
- **Colpi multipli** (dove Colpi > 1): vedi *Manovre*

---

## Assorbimento e Copertura — l'Assorbe

Le protezioni **assorbono danno, sempre**: l'Assorbe è **fisso e automatico**, non dipende dalla
difesa — il muro è lì, il giubbotto lo indossi. Si applica a ogni colpo che ti raggiunge, anche
quando non c'è tiro di difesa o l'Ukemi fallisce.

| Protezione | Indossare / mettersi (velocità) | Assorbe |
|---|---|---|
| **Giubbotto antiproiettile** | 4 | **3** |
| **Tavolo di legno ribaltato** | 2 | **1** |
| **Dietro un muro** | 1 | **5** |

Altre coperture: il GM assegna un Assorbe da 1 a 5 sulla scala *tavolo → muro* (portiera d'auto 2,
pilastro di cemento 4…). «Indossare / mettersi» funziona come una velocità: è il tempo che l'azione
ti costa.

**La copertura protegge da quando ci sei dietro**: l'Assorbe vale dal tuo momento d'iniziativa in
poi. Se l'avversario agisce prima, il colpo ti trova ancora allo scoperto — e se ti fa danno,
l'azione la perdi: dietro quel muro non ci sei arrivato.

**Contro chi attacca**: buio fitto o fumo = **+2/+3 alla somma dell'attaccante** (vedi *Fumogeno*).

---

## La Velocità delle Azioni

Ogni cosa che fai in uno scambio ha una **velocità**, come le armi: si somma al tiro d'iniziativa.
Le armi e le protezioni hanno la loro in tabella; per tutto il resto il GM la assegna per analogia:

| Vel. | Tipo | Esempi |
|---|---|---|
| **0** | Già in posizione | premere il grilletto dell'arma **pronta**, affondare la lama già alla gola (vedi *Sotto Tiro*) |
| **1** | Reazione istintiva | buttarsi a terra, gettarsi dietro la copertura **a portata di mano**, alzare le mani |
| **2** | Un movimento | ribaltare il tavolo e ripararsi, sfoderare il coltello, cambiare fascia, aprire una porta |
| **3–4** | Un'azione composta | estrarre il revolver dalla fondina (4), indossare il giubbotto (4), scavalcare una finestra |
| **5–6** | Un'operazione | ricaricare il revolver (5), forzare una porta chiusa, liberarsi da una presa e correre via |

**Lo 0 è solo di chi è già in posizione** — il dito, non il corpo. La reazione più fulminea che un
corpo possa fare parte da 1.

**Azione o Ukemi**: raggiungere una copertura è un'**azione** (Muoversi) — guadagni l'Assorbe,
coi tempi qui sopra. Buttarsi *mentre ti sparano* è l'**Ukemi**: non è un'azione dichiarata, è la
tua azione che si converte in difesa. Una dichiarazione vale una delle due cose — il GM chiede quale.

---

## Manovre

**MIRARE** *(pistole e fucili — è un'azione, non il Tame)* — dichiari Mirare come azione dello
scambio: non spari, prendi la linea. Dagli scambi successivi hai **−1 alla somma** dei tiri con
quell'arma; puoi mirare al massimo **2 scambi** (−2). **Mirare implica stare fermi**: se ti muovi,
vai in Ukemi o subisci danno, la concentrazione è persa — nessuno mira camminando. Chi ha mirato ha
l'arma **pronta** sul bersaglio: quando spara è a velocità **0** (vedi *Sotto Tiro*).

**SOTTO TIRO (azione pronta)** — l'arma è già in posizione sul bersaglio: la pistola spianata sul
sospetto (*«Polizia! Fermo!»*), il coltello alla gola, il cecchino col mirino fermo. Colpire non
richiede più tempo — devi solo premere il grilletto: **la tua velocità è 0** (iniziativa = 2d6 +
mod. Presenza, nient'altro). **Sotto Tiro non è la mira** (deciso 2026-09-06): non dà bonus al tiro
— al massimo conta la distanza — e non si somma a *Mirare*: sono due cose diverse, anche se il nome
può confondere. Lo stato si assume quando tocca a te, dichiarando che punti l'arma invece di
attaccare — oppure ce l'hai già, se la scena nasce così: l'arresto, l'ostaggio, l'appostamento.
Regge finché resti fermo sul bersaglio: se **subisci danno**, o il bersaglio esce dalla linea, va
riassunto. Quando scatti, l'attacco è normale e il bersaglio **consapevole** può ancora buttarsi o
andare in Ukemi (col +1 sul bersaglio che si butta, come sempre): il vantaggio è arrivare prima, non
il colpo garantito. A discrezione del GM, come tutto qui dentro.

> **Il confine con la Sorpresa**: sotto tiro il bersaglio è **consapevole** — vede l'arma, può
> scegliere: parlare, arrendersi, tentare il tuffo. Se è **ignaro o impossibilitato a reagire**,
> non è uno scambio: è un agguato (vedi *Sorpresa e Agguati* — niente difesa).

> **Esempio — l'arresto**: il poliziotto tiene il revolver puntato (sotto tiro, velocità 0); il
> malvivente, a due passi, valuta il tuffo dietro il bancone (velocità 1). Sull'ordine il grilletto
> è favorito di poco (velocità 0 contro 1); niente bonus di mira — Sotto Tiro non è Mirare — ma a
> quella distanza il colpo è ravvicinato (−1): se fa danno, il malvivente **perde l'azione** — a terra
> ci finisce, ma dietro il bancone non ci arriva. Alzare le mani è la scelta sensata — ed è la scena
> giusta. A **lontano** cambia tutto: il colpo prende +1 di distanza e +1 sul corpo che si butta —
> lì il tuffo è una scommessa vera.

**PREPARARSI / RITARDARE** — puoi **ritardare la tua azione**: con iniziativa 7 puoi agire a 7, 8,
9… decidi tu quando entrare. Se dichiari di **non agire affatto** nello scambio, dal prossimo tiro
hai **−1**: non è mira, è preparazione — il respiro prima di muoversi. Il −1 **non si cumula** e
**resta finché non lo usi**; una volta speso, puoi prepararti di nuovo.

**OPPORTUNITÀ** — se la tua iniziativa batte quella dell'avversario di **5 o più** (deciso
2026-09-06), sei stato così più rapido da guadagnare **un'azione descrittiva extra oppure un
movimento** (deciso 2026-09-06), spendibile in questo scambio o nel prossimo: salti sul cofano *e*
ti ripari *e* spari; ricarichi *e* spari; raggiungi la copertura *e* spari. Mai **due attacchi**.

**FUORI TEMPO** — **il tetto è 15** (deciso 2026-09-06). Se la tua iniziativa, con tutti i
modificatori, **supera 15**, hai perso troppo tempo — per qualunque motivo: un'arma lenta da
sfoderare, il Tame, un malus del GM. **In questo scambio non agisci**; l'azione dichiarata la
**completi nel prossimo**, dove la tua iniziativa è **il dado migliore dei tuoi 2d6, e basta**: tiri
due dadi, tieni il più basso, niente modificatori — agisci presto. Vale per PG e PNG. Se prima del
tuo momento ti colpiscono, l'azione rimandata è persa come ogni altra; se vai in Ukemi, è spesa.
**Non si può fare apposta**: sforare per agire primo nel giro dopo non è una tattica, e il GM non la
ammette.

**STRINGERE I DENTI** — se il danno subito, dopo le riduzioni, è di **1 o 2**, puoi rifiutarti di
perdere l'azione: paghi **1 punto dell'attributo con cui stai agendo** (per un attacco, quello
dell'arma; per la minaccia, Presenza; per un'altra azione lo indica il GM) e l'azione la fai
comunque — col valore ridotto, da subito e da lì in poi. Il punto si segna a matita come ogni
ferita: la notte lo ripara (Regolamento, *Progressione*). Se l'attributo è già a **4**, non c'è più
niente da stringere: l'azione è persa. Danno da 3 in su ferma chiunque — nessuna scelta. Nei colpi
multipli ogni colpo incassato è una scelta — e un punto — a parte. La mira e il Sotto Tiro decadono
comunque: forzi il corpo a finire il gesto, ma la concentrazione è saltata. Vale anche per i PNG: il
professionista che continua a venire avanti nonostante il colpo.

**COLPI MULTIPLI** *(dove Colpi > 1)* — dichiari 2 o 3 colpi nello scambio, con **un solo tiro di
2d6** per tutta la sequenza. **Il tempo si somma**: il primo colpo esce alla tua iniziativa, ogni
colpo successivo **aggiunge di nuovo la velocità dell'arma** (revolver: +2 a colpo). **La fretta si
paga**: **+2 alla somma se dichiari due colpi, +3 se tre** — ma il malus **cala di 1 a ogni colpo
dopo il primo**: il primo colpo ti traccia la traiettoria (se plausibile — il bersaglio è ancora lì,
giudica il GM). I colpi si intercalano con le azioni altrui in ordine d'iniziativa; **se prendi
danno, la sequenza si interrompe** — i colpi restanti sono persi (salvo *Stringere i Denti*: ogni
colpo incassato, un punto).

> **Esempio**: il PG (Lucidità 7, Presenza 6, revolver in mano) dichiara **tre colpi** su un
> sospettato in fuga. Iniziativa: 3+4 = 7, +0, +2 → il primo colpo esce a **9**, il secondo a
> **11**, il terzo a **13**. Un tiro solo per la sequenza: **1 e 4**, somma 5 — malus +3, che cala
> a ogni colpo.
> Colpo 1: 5+3 = 8 > 7 → **manca**.
> Colpo 2: 5+2 = 7 = 7 → colpito, scarto 0: **4 danni**.
> Colpo 3: 5+1 = 6 < 7 → scarto 1: **5 danni**.
> La sequenza si aggiusta da sola: il primo manca e traccia, il terzo morde. Se tra un colpo e
> l'altro il sospettato avesse risposto (iniziativa più bassa) e l'avesse **colpito**, la sequenza
> finiva lì.

**RAFFICA / FUOCO DI SOPPRESSIONE** *(armi con Raffica: sì)* — non spari *a* qualcuno: copri.
Dichiari la soppressione:
- La tua iniziativa è **senza velocità d'arma** (se l'arma è da sfoderare, Estrarre si somma
  comunque). Non stai preparando un colpo: apri il fuoco e basta
- Gli altri tirano normalmente. Se un nemico agisce prima di te e **ti fa danno**, la raffica
  salta; se manca, parte
- Riuscita: **tiro su Presenza**
- **Effetto (per lo scambio corrente)**: chi è sotto il fuoco **tira 3d6 per l'iniziativa e somma i
  due più alti** (deciso 2026-09-06: è il «dado peggiore» della v2 portato sui 2d6) → agisce dopo. I
  tuoi compagni si muovono, si riposizionano, sparano con armi lente **prima** di loro
- **Agire allo scoperto sotto il fuoco costa**: chi non resta al riparo prende **+1 alla somma**
  della propria azione — rispondere al mitragliatore col revolver si può, ma con la testa bassa
- **Chi è sotto la raffica** lo decide il GM con la logica: l'arco di fuoco su una porta, un
  corridoio, il tratto di strada tra due auto. Non «cinque macchine in fila» — un mitragliatore
  copre una direzione, non un quartiere
- Le **pistole** possono farlo una volta: poi il caricatore è vuoto (ricarica)

**GRANATA** — attacco su **Presenza** contro **tutti nell'area** (il GM la definisce: la stanza, il
vano scale, lo spazio tra le auto). Ognuno può **andare in Ukemi** per buttarsi via (difesa su
**Lucidità [da validare]** — la v2 dava Lucidità per buttarsi via o Distacco per la freddezza di
defilarsi); l'Assorbe delle coperture vale, e un muro in mezzo ferma quasi tutto. Danno 4 + scarto,
a testa.

**FUMOGENO** — un'azione per lanciarlo. Il fumo copre la zona per **2 scambi**: ogni attacco a
distanza attraverso il fumo ha **+3 alla somma**; muoversi coperti dal fumo non espone.

---

## Sorpresa e Agguati

Si può essere sorpresi **fallendo un tiro** — Ascolto per il passo dietro l'angolo, o quello che
la scena chiede: lo decide il GM, coi malus che decide il GM. Il Gou *Brivido sulla Nuca* qui vale
oro.

**Se il tiro fallisce, non c'è difesa né Ukemi**: l'attaccante tira normalmente (scarto + arma) e
il bersaglio **prende tutto** — riduce solo l'**Assorbe** fisso (giubbotto, copertura). Un cecchino
con Pazienza 8 che tira 6 fa scarto 2 + 5 d'arma: **7 danni secchi**. Un cecchino che colpisce è
solitamente letale.

Se si sopravvive, iniziano gli scambi.

---

## Le Zone — contatto, vicino, lontano

Niente griglie e niente metri: tre fasce, e il buonsenso.

| Zona | Cos'è | Cosa ci fai |
|---|---|---|
| **Contatto** | Lo tocchi — la colluttazione, il tavolo tra voi | Pugni, coltelli, afferrare. Liberi: sparare è ravvicinato (−1). Afferrati: pistole e armi lunghe +2, fucili non si usano (tabella *Distanza e colluttazione*) |
| **Vicino** | La stessa stanza, il vicolo, pochi passi | Tutto funziona. Raggiungi una copertura o il contatto con la tua azione |
| **Lontano** | Oltre — la strada, il tetto di fronte | Solo armi da fuoco (+1). Serve un'azione (o due, dice il GM) per avvicinarsi; il fucile di precisione vive qui |

Muoversi di una fascia è un'azione (**Muoversi**). Scappare = raggiungere *lontano* e uscire dalla
scena: spesso la mossa migliore del combattimento.

**Il tiro e la distanza** — la tabella *Distanza e colluttazione* (in *L'Attacco*) dice tutto:
armi da fuoco **−1 a un passo · 0 vicino · +1 lontano**, più **+1** su chi si butta; **afferrati**,
pistole e armi lunghe prendono **+2** e i fucili non si usano; pugni, coltello e manganello non
risentono della stretta. Ancore per il GM, non un righello: valgono le tre fasce e il buonsenso.

---

## I PNG nello Scontro

I PNG attaccano, vanno in Ukemi e stringono i denti con le stesse regole dei PG (le comparse senza
scheda: attributi 5-6, il GM decide al volo). E **hanno il Ki come tutti**, calcolato **come per i
PG** (deciso 2026-09-06 — Manuale del Giocatore: *«Ki massimo = attributo più basso + 2d6, prendi il
dado più alto»*, tetto 12): una comparsa con attributi 5-6 sta quindi tra **6 e 11**, e il GM lo tira
o lo fissa dentro quel campo. Le vecchie taglie fisse 3/6/9 non valgono più.

A **Ki 0** il PNG è **fuori combattimento** — l'esito lo decide il GM in base alla scena: KO,
ferito che si trascina via, mani alzate, fuga. La **morte di un PNG** non è mai un automatismo dei
numeri: è una scelta narrativa (e per un poliziotto, un mondo di conseguenze). I PNG notevoli con
scheda usano il loro Ki — e per i PG la morte invece è reale: a Ki 0 o sotto si muore.

**La pericolosità non è un modificatore da ricordare**: è già negli attributi e nelle Senmon
dell'avversario. L'ubriaco molesto ha 4 e tira male; il sicario ha 7, Pistola 2 e un giubbotto. Il
sistema fa il resto.

---

## Le Specializzazioni di Combattimento

Famiglia dell'elenco Senmon (vedi `GENKAI_Specializzazioni.md` — regole, costi 9/19/39, usi,
paletti). **Ogni Senmon d'arma vale per un'arma sola, dichiarata quando la prendi** (deciso
2026-09-06): *Pistola 1* non vale sul fucile né su altro; *Pistola 1* e *Coltello 1* sono due Senmon
separate, comprate e cresciute a parte. La chiave è l'attributo d'attacco di quell'arma.

| Senmon | Chiave | Copre | Paletti G3 |
|---|---|---|---|
| **Lotta** | Presenza | pugni, prese, tecniche d'arresto — **grado 1 di base per tutti gli investigatori** (accademia) | Presenza 8 |
| **Un'arma, dichiarata** — Coltello, Manganello, Spada, Mazza, Machete, Catena, Pistola, Fucile, Mitragliatrice, Armi da lancio… | l'attributo d'attacco dell'arma | quella sola arma: colpire, estrarla in fretta, usarla in movimento | attributo chiave 8 |
| **Tiro di precisione** | Pazienza | fucili di precisione — **il grado 1 è il requisito per usarli** | Pazienza 9 + Fucile 2+ |
| **Esplosivi** | Pazienza | usare, riconoscere e **disinnescare** ordigni | Pazienza 8 + Meccanica 2+ |

Il grado si **sottrae dalla somma dei tiri attivi** con quell'arma — attaccare, e le altre cose che
si fanno con l'arma in mano (−1/−2/−3, o −2 con Correzione per il Maestro), dentro il tetto −4.
**Mai in difesa**: l'Ukemi resta sull'attributo legato all'arma di chi attacca, e non si sceglie
(deciso 2026-09-06). *Pistola* copre revolver, automatica e compatta: sono tutte pistole. La Senmon
*Armi da fuoco* già in elenco resta un'altra cosa: è **conoscenza** (riconoscere armi, fatture,
mercato) — saper *sparare* si impara qui.

---

## Dopo lo Scontro — il Conto

In combattimento l'adrenalina copre tutto: il Genkai è sospeso, gli attributi i dadi non li
toccano, il soroban non si muove. Poi cala il silenzio — ed è lì che il corpo presenta il conto.

A fine scontro, oltre a valutare il Genkai (chi è a Ki ≤ 3 quando tutto è finito, crolla lì), il
GM può chiedere un **tiro di pressione** (Distacco o Silenzio — la scala del Regolamento: costa
solo Ki, mai attributi) a chi ha appena vissuto qualcosa di grosso: essere stato sotto una raffica,
essere stato ferito, la prima sparatoria, un morto a terra. Le mani che tremano *adesso*, la
sigaretta che non si accende. Un tiro solo, non uno per ogni cosa successa — e conta nel limite dei
2-3 tiri di pressione a sessione.

---

## Le Conseguenze — Giappone 1997

Un poliziotto che **estrae** l'arma lo scrive nel rapporto. Uno che **spara** apre un fascicolo
dell'ispettorato. Uno che **ferisce o uccide** finisce sui giornali, e il suo caso con lui. Anche lo
scontro vinto ha un prezzo: giorni di audizioni interne, l'arma ritirata in attesa di verifica, il
commissario che non ti guarda. Usalo — è più GENKAI di qualsiasi sparatoria (vedi *Quadro Legale*,
Manuale GM).

---

## Riepilogo Rapido — v3.1

```
SEGNI: ti aiuta = −alla somma | ti ostacola = +alla somma
       favorevoli max −4 | la somma non scende sotto 2
       niente Nami/Kiwami: i critici sono 1+1 e 6+6 (nei due sensi)
       niente soroban | GENKAI SOSPESO: si valuta a fine scontro
       DOPO: possibile tiro di pressione (Distacco/Silenzio) — il conto
       il danno non ha pavimento: Ki a 0 o sotto = MORTO

SCAMBIO: 1) DICHIARI: Attaccare / Muoversi / Minacciare (+ manovre, + Tame)
            la difesa NON si dichiara: è l'Ukemi
            piccolo movimento + attacco: senza costo, decide il GM se è troppo
         2) INIZIATIVA = 2d6 + mod.Presenza + velocità (+Tame; scosso: ritira il dado basso)
            il totale più BASSO agisce prima | parità: prima chi ha più Presenza
            (a pari Presenza: simultanei) | oltre 15 = FUORI TEMPO
            Presenza:  4→+2  5→+1  6→0  7→−1  8→−2  9→−3  10→−4
         3) RISOLVI in ordine. COLPITO PRIMA DI AGIRE = azione persa
            (salvo STRINGERE I DENTI)
         in tanti: Ukemi contro UN attacco; l'Assorbe vale contro tutti
UKEMI 受け身: attaccato PRIMA di agire? la tua azione diventa difesa:
         decidi prima del suo tiro, tiri la difesa (anche con 1 Ki),
         ma l'azione è spesa. Chi ha GIÀ agito NON va in Ukemi
TAME 溜め (trattenere il fiato): fino a +3 iniziativa = −1:1 al tiro d'attacco
MINACCIARE (velocità 0, solo voce): 2d6 ≤ Presenza → l'avversario è SCOSSO:
         al prossimo tiro d'iniziativa ritira il dado basso e tiene il più alto;
         il GM può fargli abbassare l'arma | UNA VOLTA SOLA per scontro, riuscita o no
         chi minaccia può comunque difendersi (la voce non ti scopre)
ATTACCO: 2d6 ≤ attributo arma (PARI = COLPITO) | scarto = attributo − tiro
         DANNO = scarto + danno arma
DIFESA (solo in Ukemi): 2d6 ≤ attributo di difesa DELL'ARMA che attacca
         para il suo scarto | vale contro UN attacco
         KI: max 1 a scambio = −2 al tiro, dichiarato con l'Ukemi,
             solo se resti a Ki ≥ 1
DANNO SUBITO = danno attacco − scarto difesa − assorbimento − copertura
ASSORBE (fisso, sempre): giubbotto 3 (4) | tavolo 1 (2) | muro 5 (1)
      vale da quando ci sei dietro: l'iniziativa decide se arrivi in tempo
SENMON D'ARMA: un'arma sola, dichiarata (Pistola 1 non vale sul fucile); il grado
      toglie dal tiro d'attacco e dalle azioni attive con l'arma, MAI dalla difesa
CRITICI: 1+1 = +1d6 (danni in attacco / parato in difesa)
         6+6 in attacco/azione = mancato + 1d6 sulla tabella imprevisti
         6+6 in difesa = solo una difesa fallita
VELOCITÀ: Estrarre (sfoderare) / Colpire (in mano) / Ricarica
AZIONI: 0 SOLO l'azione pronta (il grilletto), 1 buttarsi/copertura a
      portata, 2 un movimento, 3-4 composta, 5-6 operazione
ARMI (attacco/difesa · E/C/R · danno):
      Lotta Presenza/Pazienza 1/1/— d1 | Improvvisata Presenza/Pazienza 1/1/— d1-2
      Coltello Pazienza/Pazienza 2/1/— d2 | Manganello Silenzio/Ascolto 2/2/— d2
      Mazza° Silenzio/Ascolto 2/2/— d3 | Katana° Pazienza/Ascolto 3/2/— d3
      Revolver Lucidità/Distacco 4/2/5 d4 (3 colpi, raffica una volta)
      Automatica° Lucidità/Distacco 3/2/4 d4 | Compatta° Lucidità/Distacco 2/1/4 d3
      Fucile Distacco/Distacco 4/2/5 d4 | Mitr.leggero Distacco/Distacco 4/2/5 d4 raffica
      Mitr.pesante Distacco/Distacco 5/3/6 d5 raffica | Precisione Pazienza/Distacco 5/3/5 d5
      Granata Presenza/Distacco 2/2/— d4 area (ognuno nell'area: Ukemi)
COLPI MULTIPLI: un tiro solo per la sequenza; ogni colpo dopo il primo
      aggiunge di nuovo la velocità dell'arma (revolver: +2 a colpo)
      malus +2 (due colpi) / +3 (tre), cala di 1 a ogni colpo dopo il primo
      danno subito = sequenza interrotta (salvo STRINGERE I DENTI)
MIRARE (azione): fermi, −1 dal prossimo scambio, max 2; poi spari a velocità 0
SOTTO TIRO (azione pronta): arma già sul bersaglio = velocità 0 (NON è la mira:
      niente bonus, conta solo la distanza) | decade su danno o linea persa | ignaro = SORPRESA
PREPARARSI: rinuncia all'azione = −1 al prossimo tiro (non cumula)
FUORI TEMPO: iniziativa oltre 15 = in questo scambio non agisci; nel prossimo completi
      l'azione con iniziativa = il dado migliore dei 2d6 e basta | mai apposta
OPPORTUNITÀ: iniziativa migliore di 5+ = un'azione descrittiva extra
      oppure un movimento (mai due attacchi)
STRINGERE I DENTI: danno netto 1-2 → paghi 1 punto dell'attributo in uso
      e agisci comunque; a 4 non si può; la notte ripara; mira/Sotto Tiro persi
SOPPRESSIONE (armi a raffica; pistole: poi ricarica): iniziativa senza
      velocità d'arma, riuscita su Presenza; chi è sotto: 3d6, somma dei due più alti;
      agire allo scoperto sotto il fuoco: +1 alla somma
GRANATA: Presenza su tutti nell'area; Ukemi su Lucidità [dv]; d4 + scarto
FUMOGENO: 2 scambi, +3 ai tiri a distanza attraverso il fumo
SORPRESA: tiro (GM) fallito = niente difesa né Ukemi — solo Assorbe
ZONE: contatto | vicino | lontano — muoversi di una fascia = un'azione
DISTANZA E COLLUTTAZIONE: fuoco −1 a un passo | 0 vicino | +1 lontano (precisione 0)
      bersaglio che si butta +1 | AFFERRATI: pistole e armi lunghe +2 (niente mira),
      fucili non si usano (o +3 GM); pugni, coltello, manganello, improvvisate: normale
PNG: Ki come i PG (attributo più basso + il dado alto di 2d6, tetto 12)
     a 0 fuori combattimento (esito: GM) | PG a 0 = morto
OPZIONALE (GM): il Ki non va sotto 0; a 0 un tiro su Distacco o Pazienza (a scelta)
     decide: riuscito = vivo ma a terra, fuori gioco; fallito = morto
```

---

## Da validare *(stato al 2026-09-06, notte — vedi `DECISIONI.md`)*

Tutti i punti aperti della v3 sono stati decisi dall'autore il 2026-09-06 e sono nel testo: parità →
Presenza (poi simultanei) · Minacciare (velocità 0, scosso = ritira il dado basso, una volta sola per
scontro riuscita o no, chi minaccia si difende) · piccolo movimento + attacco a giudizio del GM ·
Sotto Tiro non è la mira · Opportunità (soglia 5) = azione descrittiva o movimento · soppressione 3d6
· Fuori Tempo tetto 15 con un dado, senza l'eccezione v2 · granata: Ukemi su Distacco · distanza e
colluttazione per famiglie d'arma · Senmon d'arma: un'arma sola, dichiarata, mai in difesa · Ki dei
PNG come i PG · regola opzionale Ki 0 con Distacco o Pazienza.

Resta solo la **prova al tavolo dei valori delle armi °** (machete, katana/spada, mazza, automatica,
compatta, catena, armi da lancio): «per ora va bene, decido quando le gioco».

---

*GENKAI 限界 — Lo Scontro (Shōtotsu 衝突) · v3.1 — 2026-09-06 · versioni congelate in `versioni/`*
