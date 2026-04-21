


## Core Meccanico

- **Tiro = 2d6 ≤ Caratteristica = Successo**
- La caratteristica usata dipende da **come** il giocatore descrive l'azione
- **Kiwami (極)**: dado 2 = critico positivo, dado 12 = critico negativo
- **Nami (波)**: dado 3 = successo notevole, dado 11 = fallimento notevole
- **Satori (悟り)**: 1 per spirito per sessione, successo automatico (conta come 3 al dado)

---

## Le 6 Caratteristiche

|Caratteristica|Kanji|Cosa rappresenta|
|---|---|---|
|**Radice**|根|Saldezza, ancoraggio, resistenza, non essere spostato o spezzato|
|**Eco**|響|Percezione, ciò che il mondo ti restituisce, leggere l'ambiente|
|**Scintilla**|火|Intensità, ferocia, fuoco interiore, potenza delle azioni|
|**Ombra**|影|Scomparire, ingannare, muoversi non visti, diversivi|
|**Flusso**|流|Adattabilità, muoversi col momento, cedere per vincere|
|**Battito**|拍|Velocità di lettura e reazione, agire nell'istante|

### Creazione del Personaggio

1. Tutti gli attributi partono da **4**
2. Distribuisci **12 punti** tra i 6 attributi
3. Tira **2d6**, prendi il **dado più basso**: punti bonus aggiuntivi da distribuire
4. Nessun attributo può superare **9** o scendere sotto **4**
5. **Ki iniziale**: attributo più basso + 2d6 (prendi il dado più alto, ritira gli 1)
6. Il PG riceve un **bonus +1** nella caratteristica legata al proprio spirito

---

## Kage (影) — Il Peso del Passato

Ogni PG ha un problema al paese che lo ha reso un reietto. Non ha effetti meccanici: è puro background narrativo che spiega perché è stato scelto come sacrificio.

---

## En (縁) — Legame con lo Spirito

La relazione tra PG e spirito ha un valore **En** sulla scala da **-5 a +5**. Il valore viene deciso dalla AI che interpreta lo spirito, in base a come il giocatore si comporta con lui.

- **En alto**: lo spirito è collaborativo, dà consigli migliori, è disposto ad aiutare
- **En basso**: lo spirito è reticente, vago, può rifiutarsi di usare i poteri
- L'En **modifica i tiri** quando il PG chiede allo spirito di attivare il potere attivo

---

## Combattimento

### Iniziativa

Il **tiro per colpire è anche il tiro di iniziativa**: all'inizio di ogni round ciascun combattente (PG o nemico) tira i suoi 2d6 per attaccare e **chi ottiene il risultato più basso (dopo TxC) agisce per primo**.

- Il **TxC dell'arma** si somma al tiro: un'arma con **TxC −2** sottrae 2 al dado (più basso, più veloce, più preciso); una con **TxC +1** (improvvisata) aggiunge 1 al dado (più alto, più lento, più impreciso). Negativo = bonus, positivo = penalità.
- In caso di parità, agisce per primo chi ha **Battito** più alto; se ancora parità, si risolve contemporaneamente.
- Se un combattente **non attacca** in quel round (difesa piena, movimento, uso di abilità non offensiva), tira comunque 2d6 per determinare l'ordine (senza modificatori d'arma).

**Esempio:** Titus (Mazza chiodata, TxC 0) tira 2d6 → **7** → iniziativa 7. Lo Scorpione tira 2d6 → **9** → iniziativa 9. Titus agisce per primo e risolve il suo attacco con quel 7 contro la sua Scintilla 8.

---

### Flusso

**1. Il PG attacca**

- Descrive come agisce → determina la caratteristica
- Tira 2d6 contro quella caratteristica
- **Successo**: calcola il **margine** (caratteristica - dado)
- **Fallimento**: manca, il nemico non tira difesa

**2. Il nemico difende**

- Tira 2d6 contro la sua caratteristica di difesa
- Al suo tiro si **aggiunge il margine** del PG
- **Tiro modificato ≤ caratteristica**: parato, nessun danno
- **Tiro modificato > caratteristica**: colpito

**3. Danno**

- **Danno = quanto il tiro modificato supera la caratteristica del nemico**, più il **bonus danno dell'arma** (vedi `Armi.md`)
- Il danno totale si sottrae al **Ki**
- I mostri usano il loro attacco naturale: nessun bonus arma, salvo diversamente specificato

**4. Il nemico attacca** — stesso sistema specchiato.


### Attacco per Arma

Ogni arma ha caratteristiche che le si addicono naturalmente. Il PG può sempre tentare un'altra caratteristica se la descrizione è convincente, ma il GM può negarlo se è forzato (una mazzafrusto non fa "affondi di precisione").

| Arma                    | Caratteristiche tipiche           | Esempi di descrizione                                                                                                      |
| ----------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Spada + Scudo**       | Scintilla, Battito, Radice        | "Carico col peso dello scudo" (Scintilla) · "Affondo rapido" (Battito) · "Avanzo piantato dietro lo scudo" (Radice)         |
| **Accetta Doppia**      | Scintilla, Battito, Flusso        | "Furia di colpi" (Scintilla) · "Raffica alternata" (Battito) · "Danza tra le lame" (Flusso)                                 |
| **Mazzafrusto + Scudo** | Scintilla, Flusso, Ombra          | "Sferra con tutto il peso" (Scintilla) · "Curvo la traiettoria" (Flusso) · "Finta con la catena, colpisco dietro" (Ombra)   |
| **Lancia**              | Eco, Battito, Ombra, Scintilla    | "Leggo dove si scopre e infilzo" (Eco) · "Affondo fulmineo" (Battito) · "Colpo dal lato cieco" (Ombra) · "Carica" (Scintilla)|
| **Martello**            | Scintilla, Radice                 | "Colpo devastante dall'alto" (Scintilla) · "Mi pianto e abbatto il fendente" (Radice)                                       |
| **Trombone**            | Eco, Battito, Ombra               | "Miro sentendo il respiro" (Eco) · "Sparo prima che reagisca" (Battito) · "Sparo da posizione nascosta" (Ombra)             |

### Difesa

La difesa dipende da **come** il PG reagisce. Ci sono tre modi fondamentali per difendersi, ognuno con la sua caratteristica e i suoi requisiti.

| Tipo difesa | Caratteristica | Chi può usarla | Descrizione |
|---|---|---|---|
| **Parata con scudo** | **Radice** 根 | solo chi ha uno scudo | La parata per eccellenza: piedi piantati, scudo alzato, reggi il colpo |
| **Schivata** | **Battito** 拍 | tutti | Velocità e reazione: anticipi, scivoli di lato, non sei dove il colpo arriva |
| **Parata con arma** | **Flusso** 流 *o* **Eco** 響 | solo se l'arma difendente ha **taglia ≥** dell'arma che attacca | Blocchi o devi l'attacco con la tua arma — dipende dal tipo d'arma quale caratteristica usi |

**Taglie armi:**
- **M (Media):** Spada, Accetta Doppia
- **G (Grande):** Mazzafrusto, Lancia, Martello
- **R (Ranged):** Trombone (non para, mai)

Un'arma di taglia M non può parare un colpo portato con arma G (la spada non regge il martello). Un'arma G para sia M sia G.

**Criterio Flusso vs Eco per la parata con arma:**

- **Flusso** 流 → armi mobili, con più punti di contatto o traiettorie variabili. Cedi col colpo, devii, segui il movimento.
- **Eco** 響 → armi lunghe/rigide che richiedono lettura e posizionamento. Prima leggi dove sta per arrivare il colpo, poi pianti il blocco.

| Arma | Taglia | Scudo (Radice) | Schivata (Battito) | Parata arma |
|---|:-:|:-:|:-:|:-:|
| **Spada + Scudo** | M | ✓ | ✓ | **Flusso** |
| **Accetta Doppia** | M | ✗ | ✓ | **Flusso** |
| **Mazzafrusto + Scudo** | G | ✓ | ✓ | ✗ (la catena trasmette l'impatto, non lo blocca) |
| **Lancia** | G | ✗ | ✓ | **Eco** |
| **Martello** | G | ✗ | ✓ | **Eco** |
| **Trombone** | R | ✗ | ✓ | ✗ (arma da fuoco, non para in mischia) |

**Note:**
- Un PG che ha **sia scudo sia arma G** può scegliere turno per turno se parare con scudo (Radice) o con arma (Flusso/Eco), in base a cosa conviene narrativamente o meccanicamente.
- La **schivata con Battito** è sempre disponibile, anche da armato — a volte è la difesa più alta.
- In caso di attacco che non è fisico (incantesimo, paura, illusione), valgono le caratteristiche tradizionali (Radice per resistenza, Ombra per sottrarsi, Eco per percepirlo).

### Soglie Ki

|Ki del PG|Stato|
|---|---|
|≤ 3|**Genkai** — in difficoltà|
|= 0|Fuori combattimento|

---

## Esempi di Combattimento

### Colpo riuscito, difesa fallita

> **Riku** (Scintilla 8, lancia **Forma I** +2) carica un mostro. Tira 2d6 → **5** → Successo. Margine: 8 - 5 = **3**. Mostro (Radice 5) difende: 2d6 → **3** + 3 = **6** → supera 5. Danno margine: 6 - 5 = **1**, + arma **2** = **3 Ki persi** dal mostro.

### Colpo riuscito, difesa riuscita

> **Yuki** (Ombra 7, accette **Forma I** +1) attacca da dietro. Tira 2d6 → **4** → Successo. Margine: 7 - 4 = **3**. Mostro (Flusso 6) difende: 2d6 → **2** + 3 = **5** → non supera 6. **Parato.** (Nessun danno, il bonus arma non entra.)

### Colpo fallito

> **Sora** (Scintilla 5) tenta un colpo di forza con un martello **improvvisato** (-2). Tira 2d6 → **8** → Fallimento. **Manca. Il nemico non tira.**

### Colpo devastante

> **Hana** (Battito 9, accette **Forma II** +3) scatta con tutto quello che ha. Tira 2d6 → **3** → Successo. Margine: 9 - 3 = **6**. Mostro (Radice 4) difende: 2d6 → **5** + 6 = **11** → supera 4. Danno margine: 11 - 4 = **7**, + arma **3** = **10 Ki persi**. Devastante.

### Arma improvvisata (malus)

> **Sora** (Scintilla 5, martello **improvvisato** -2) trova un varco. Tira 2d6 → **4** → Successo. Margine: 5 - 4 = **1**. Mostro (Radice 4) difende: 2d6 → **4** + 1 = **5** → supera 4. Danno margine: 5 - 4 = **1**, - arma **2** = **0 Ki**. Lo colpisce ma l'arma scadente non gli fa male.

### Il nemico attacca il PG

> Mostro (Scintilla 6) tira 2d6 → **4** → Successo. Margine: **2**. Riku difende con **Battito 6** (schivata, la lancia non ha scudo): 2d6 → **5** + 2 = **7** → supera 6. Danno: 7 - 6 = **1 Ki perso** da Riku. (Attacco naturale del mostro, nessun bonus arma.)

---
