


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

La difesa dipende da **come** il PG reagisce. L'arma non determina la caratteristica di difesa, ma influenza cosa è credibile (senza scudo la Radice difensiva è più debole, senza gambe libere il Flusso è limitato).

| Caratteristica   | Come difende                                                                           | Armi che la favoriscono        |
| ---------------- | -------------------------------------------------------------------------------------- | ------------------------------ |
| **Radice** 根    | Reggere, parare col manico, scudo alzato, tenere la posizione                          | Spada+Scudo, Mazzafrusto+Scudo |
| **Flusso** 流    | Schivare deviando, parare scorrendo col colpo, seguire il movimento del nemico          | Mazzafrusto, Lancia, Accette   |
| **Battito** 拍   | Anticipare, reagire prima che arrivi, spostarsi all'ultimo istante                      | Accette, Lancia, Trombone      |
| **Ombra** 影     | Non essere dove il nemico colpisce, sparire, farsi confondere                           | Lancia, Trombone               |
| **Eco** 響       | Leggere l'attacco prima che parta, posizionarsi nel punto cieco                         | Lancia, Trombone               |
| **Scintilla** 火 | *Raro.* Contrattaccare con violenza superiore, fermare il colpo con la propria potenza  | Martello, Accette              |

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

> Mostro (Scintilla 6) tira 2d6 → **4** → Successo. Margine: **2**. Riku (Radice 6) difende: 2d6 → **5** + 2 = **7** → supera 6. Danno: 7 - 6 = **1 Ki perso** da Riku. (Attacco naturale del mostro, nessun bonus arma.)

---
