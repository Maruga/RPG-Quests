# GENKAI 限界 — Lo Scontro
## Shōtotsu 衝突 — *manuale opzionale · **v3.0 BOZZA** (sistema ad azioni)*

> **Versione in lavorazione** (2026-09-04) — ridisegno su decisioni dell'utente (vedi `DECISIONI.md`
> e `Simulazione.xlsx`). La v2.1 completa è congelata in `versioni/GENKAI_Combattimento_v2.1.md`:
> le sezioni non ancora riviste valgono da lì (mappa in fondo). Al primo playtest si valida.
>
> GENKAI resta un gioco investigativo: il combattimento è raro, pericoloso, e la via intelligente
> resta chiamare rinforzi o andarsene. Mezz'ora di adrenalina, poi si torna a indagare.

---

## Le regole della casa *(invariate dalla v2)*

**Tutto ciò che ti aiuta ABBASSA il dado. Tutto ciò che ti ostacola lo ALZA.** Il confronto è
sempre lo stesso: totale ≤ attributo.

- I modificatori favorevoli su un singolo tiro non superano mai **−4** complessivi; la somma
  modificata non scende mai sotto **2**
- **Niente Nami e Kiwami**: in combattimento il critico è un altro (l'**1+1** e il **6+6** — vedi *I Critici dello scontro*). Il combattimento costa **Ki** — e **non muove il soroban**. Gli attributi i dadi non li
  toccano mai: può toccarli solo una tua scelta (*Stringere i Denti*, v2)
- **Il Genkai non scatta in combattimento**: si valuta **a fine scontro** — chi è a Ki ≤ 3 quando
  cala il silenzio, crolla lì
- **Il danno non ha pavimento**: può portare il Ki a zero e sotto. **A Ki 0 o meno il PG è morto.**
- **Dotazione d'accademia**: ogni investigatore ha **Lotta 1** di base

---

## Lo Scambio — il giro del v3

Ogni scambio ha tre tempi:

1. **DICHIARAZIONE** — ognuno dichiara la propria azione (e l'eventuale mira, e l'eventuale Ki in
   difesa): **Attaccare · Muoversi · Difendersi**
2. **INIZIATIVA** — ognuno tira **2d6 + modificatore di Presenza + velocità dell'arma** (+ la mira
   dichiarata). **Il totale più basso agisce per primo.** A parità: azioni simultanee *(provvisorio,
   da validare)*
3. **RISOLUZIONE** in ordine di iniziativa. **Chi viene colpito perde la propria azione** (se non
   l'ha ancora fatta — salvo *Stringere i Denti*, v2)

**Il modificatore di Presenza** (si somma al tiro d'iniziativa — negativo è meglio):

| Presenza | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|
| Modificatore | +2 | +1 | 0 | −1 | −2 | −3 | −4 |

**La velocità dell'arma**: se l'arma è **in mano** si somma la colonna *Colpire*; se è **da
sfoderare** si somma *Estrarre* (e quello scambio la sfoderi e colpisci); *Ricarica* è la velocità
dello scambio in cui ricarichi.

---

## Le Azioni

**ATTACCARE** — usi l'arma. **Chi attacca rinuncia alla difesa**: in questo scambio non hai il tiro
di difesa — se ti colpiscono, ti riparano solo **assorbimento e copertura** (quelli valgono sempre).
Sparare ti espone: è il cuore del sistema.

**MUOVERSI** — movimento pieno (riposizionarti, raggiungere una copertura, cambiare zona), oppure
un piccolo movimento **più** un attacco *(il costo del muoversi+attaccare è ancora da definire —
vedi Aperti)*.

**DIFENDERSI** — ti dedichi a non farti colpire: è l'unica azione che ti dà il **tiro di difesa**
(vedi sotto).

---

## L'Attacco

Tira **2d6** (− la mira dichiarata): se il totale è **minore o uguale** all'attributo dell'arma,
il colpo va a segno — **pari all'attributo è colpito**.

- **Scarto = attributo − tiro** (la precisione del colpo)
- **Danno totale = scarto + danno dell'arma** (con scarto 0 il colpo entra col solo danno dell'arma)

**MIRA** — puoi dichiarare fino a **+3** sull'iniziativa e sottrarre lo stesso ammontare al tiro
d'attacco (**1:1**, dentro il tetto −4). Più miri, più tardi agisci — e se ti colpiscono prima,
il tuo colpo non parte mai. Si bilancia da sola.

**DISTANZA** *(armi da fuoco)*: **−1** ravvicinato · **0** normale · **+1** lontano
*(sostituisce i modificatori di distanza della v2; le tre zone contatto/vicino/lontano come
misura dello spazio restano valide — vedi mappa in fondo)*.

---

## La Difesa

Solo chi ha dichiarato **Difendersi** tira la difesa: **2d6 ≤ attributo di difesa dell'arma che
ti attacca** (vedi tabella armi — pistola si schiva col Distacco, il keibō si legge con l'Ascolto,
la lotta si aspetta con la Pazienza).

- **Scarto di difesa = attributo − tiro**: si **sottrae dal danno** in arrivo
- **Assorbimento** (giubbotto…) e **copertura** (tavolo, muro…) si sottraggono **sempre**, anche
  senza tiro di difesa
- **Danno subito = danno dell'attacco − scarto di difesa − assorbimento − copertura** (minimo 0)
- Contro **più attacchi** nello stesso scambio, il tiro di difesa vale contro **UNO solo** (a
  scelta); assorbimento e copertura valgono contro tutti *(ereditata dalla v2)*

**BRUCIARE KI IN DIFESA** — chi si difende può spendere **1 Ki (massimo 1 a scambio)** per avere
**−2 al tiro di difesa**. Si dichiara **prima di tirare**. Si può spendere **solo restando a
Ki ≥ 1 dopo la spesa** (serve Ki 2 o più): in combattimento a Ki 0 si muore — nessuno si uccide
parando. *Come i Gou: l'energia vitale si paga per intero, prima di sapere se basta.*

---

## I Critici dello scontro *(dalla v2, ora parte del nucleo)*

**CRITICO — l'1+1** — se sul tuo tiro escono **1 e 1**, il colpo è perfetto: il GM definisce il
colore, e di norma vale **+1d6**:
- in **attacco**: **+1d6 danni**
- in **difesa** (sul tiro di difesa): **+1d6 parato**

**FALLIMENTO CRITICO — il 6+6** — se sul tuo tiro d'**attacco o azione attiva** escono **6 e 6**,
non hai solo mancato: succede un imprevisto. **Mai in difesa**: lì un 12 è soltanto una difesa
fallita. Tira **1d6** sulla colonna della tua azione — **1 è blando, 6 è disastroso** — e il GM
mette in scena il colore. La tabella è una guida, non una gabbia.

| 1d6 | Armi da fuoco | Corpo a corpo | Movimento e altro |
|---|---|---|---|
| **1** | Il colpo finisce dove non doveva — un vetro, un'insegna, un'auto: rumore e attenzione | Il colpo taglia l'aria, plateale: l'avversario ti ha letto | Inciampi ma ti riprendi: rumore, qualcosa cade |
| **2** | La presa scivola: nello scambio dopo l'arma conta **come da sfoderare** | La presa scivola: nello scambio dopo l'arma conta **come da sfoderare** | Arrivi lungo o corto: l'azione riesce, ma scomposta — il GM la mette in scena |
| **3** | Era l'ultimo colpo utile: prima di risparare devi **ricaricare** | Ti sbilanci: l'avversario guadagna posizione — il GM la ridisegna | Un ostacolo ti ferma a metà: completi l'azione nello scambio dopo |
| **4** | **L'arma si inceppa**: sbloccarla è un'azione | **L'arma ti cade**: raccoglierla è un'azione | Finisci a terra: rialzarti è un'azione |
| **5** | Inceppata male: sbloccarla è un'azione con velocità **Ricarica** | **La lama si incrina** (o il bastone si spacca): al prossimo 6+6 con quest'arma, si rompe | Cadendo perdi ciò che tenevi: schizza via, raccoglierlo è un'azione |
| **6** | Il meccanismo si rompe: per questo scontro l'arma **non spara più** | L'arma **si spezza** o vola lontano: resti a mani nude (Lotta) | Il disastro di scena: la copertura cede, la porta si blocca alle tue spalle — il GM ridisegna la scena contro di te |

---

## Le Armi *(v3 — da `Simulazione.xlsx`)*

| Arma | Attacco su | Difesa su | Estrarre | Colpire | Ricarica | Danno |
|---|---|---|---|---|---|---|
| **Pistola** | Lucidità | Distacco | 4 | 2 | 5 | **4** |
| **Keibō** (manganello) | Silenzio | Ascolto | 2 | 2 | — | **2** |
| **Lotta** (mani nude) | Presenza | Pazienza | 1 | 1 | — | **1** |

*Le altre armi della v2 (coltello, fucili, mitragliatori, precisione, granata, improvvisate) vanno
ancora convertite a questa tabella — vedi Aperti. Fino ad allora, per quelle vale la v2.*

## Assorbimento e Copertura *(valori invariati dalla v2)*

| Protezione | Mettersi/indossare (velocità) | Valore |
|---|---|---|
| **Giubbotto antiproiettile** | 4 | **3** |
| **Tavolo ribaltato** | 2 | **1** |
| **Muro, pilastro** | — | **5** (il GM scala 1–5) |

Fissi e automatici, valgono sempre e contro tutti. La copertura vale da quando ci sei dietro.

## La Morte, i PNG

- **PG**: il danno non ha pavimento — **a Ki 0 o sotto si muore**
- **PNG**: al posto del Ki hanno la **Riserva** — comparsa **3**, duro **6**, professionista **9**.
  A 0 sono **fuori combattimento** (l'esito lo decide il GM: KO, resa, fuga). I notevoli con
  scheda usano il loro Ki *(invariato dalla v2)*

---

## Esempio di scambio completo

*PG: Presenza 6 (mod 0), Lucidità 7, pistola in mano, giubbotto (3). PNG: Presenza 7 (mod −1),
Distacco 6, pistola in mano, Riserva 6, assorbimento 3.*

**Dichiarazioni**: il PG attacca con mira +2; il PNG attacca.
**Iniziativa**: PG 2d6=6 +0 +2 (Colpire) +2 (mira) = **10** · PNG 2d6=12 −1 +2 = **13** → agisce il PG.
**Attacco del PG**: 2d6=7, −2 di mira = 5 ≤ Lucidità 7 → scarto 2 + pistola 4 = **6 in arrivo**.
Il PNG aveva dichiarato l'attacco → **nessun tiro di difesa**: 6 − 3 di assorbimento = **3 danni**,
Riserva 6→3 — e **la sua azione è persa**: il suo colpo non parte mai.
*Se avesse dichiarato Difendersi (Distacco 6, magari con 1 Ki → −2), avrebbe potuto parare quasi
tutto — ma non avrebbe sparato. È la scelta del sistema: esporsi o durare.*

---

## Ereditate dalla v2 — la mappa

Valgono dalla **v2.1 congelata** (`versioni/GENKAI_Combattimento_v2.1.md`) finché non riviste qui:

| Sezione v2 | Stato in v3 |
|---|---|
| **Stringere i Denti** | **valida** |
| **Sorpresa e Agguati** (tiro fallito = niente difesa) | **valida** — con la v3 ancora più naturale |
| **Zone** (contatto/vicino/lontano, muoversi = un'azione) | valida come misura; i **modificatori** sono sostituiti dalla Distanza v3 |
| **Coperture** (valori, tempi) | **valida** |
| **PNG e Riserva** | **valida** |
| **Specializzazioni di combattimento** (il grado −1/−2/−3 alla somma) | **valida** |
| **Dopo lo Scontro** (Genkai a fine scena, tiro di pressione) · **Conseguenze 1997** | **valide** |
| **Sotto Tiro** / **Prepararsi** | da adattare all'iniziativa v3 (concetti buoni: velocità 0 / −1) |
| **Opportunità** · **Soppressione** · **Fuori Tempo** · **Colpi multipli** · **Mirare (v2)** | **da rivedere o assorbite** — costruite sul vecchio schema a tiro unico |

## Aperti *(non decisi — vedi `DECISIONI.md`)*

- Convertire le **altre armi** alla tabella v3 (coltello, fucili, raffica, precisione, granata…)
- Costo/malus del **piccolo movimento + attacco**
- **Specializzazioni** che sbloccano profili di difesa alternativi (idea utente)
- Stallo tra due difensori · parità d'iniziativa (regola definitiva) · adattamento di Sotto
  Tiro/Prepararsi/Soppressione

---

*GENKAI 限界 — Lo Scontro (Shōtotsu 衝突) · v3.0 BOZZA — 2026-09-04 · versioni precedenti in `versioni/`*
