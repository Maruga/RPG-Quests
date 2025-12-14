# LIVELLO 2 — BOMBERJACK

![[03 - Dynablaster.png]]

## Mappa

- **Dimensioni:** 28 x 40 quadretti (1 quadretto = 5' = 1,5m)
- **Origine:** 0,0 in basso-sinistra
- **Ingresso:** Lato sinistro
- **Uscita:** Lato destro
- **Passaggi Segreti:** 2



## Ingresso nel Livello

> _Leggere quando i PG attraversano il portale:_

> Il freddo cambia. Non più ghiaccio liscio — ora è ruvido, organico. Muschio gelato sotto i piedi. L'odore di terra bagnata e resina di pino.
> 
> Vi trovate in una foresta pietrificata dal gelo. Tronchi massicci trasformati in pilastri di ghiaccio. Tra di essi — muri di neve compressa, alte lastre di ghiaccio antico che brillano di luce verde malata.
> 
> E il silenzio. Totale. Assoluto. Così profondo che sentite il sangue pulsare nelle orecchie.
> 
> Qualcosa vi osserva dai quattro angoli dell'oscurità.
> 
> **LIVELLO 2 — START**

![[01 Normal Game.wav]]

## Il Dono dell'Elfo — La Bomba

> _Leggere appena entrati nel livello:_

> Un lampo verde smeraldo. L'elfo riappare — lo stesso del primo livello. In mano tiene una sfera di metallo scuro, grande come un pugno, con rune che pulsano di luce arancione.
> 
> **"Prendete. Ne avrete bisogno qui dentro."**
> 
> Vi porge la sfera. È calda al tatto. Vibra leggermente.
> 
> **"Posatela a terra. Pronunciate 'Ignis'. Poi... correte."**
> 
> Scompare prima che possiate chiedere altro.

### Meccanica Bomba
Spiegare la dinamica della bomba ai PG.

|Stat|Valore|
|---|---|
|Quantità|**1 per PG**|
|Attivazione|Posare a terra + comando vocale **"Ignis"** (opzionale)|
|Timer|**Esplode automaticamente dopo 5 round** se non attivata prima|
|Esplosione|4 direzioni (N/S/E/O), 3 quadretti per direzione (15'/4,5m)|
|Danni|**5d6 fuoco** (TS Incantesimi dimezza)|
|Bersagli|Chiunque nell'area (PG, mostri, fantasmini)|

### Cosa Distrugge

|Elemento|Effetto|
|---|---|
|Lastre di Ghiaccio Antico|Distrutte|
|Portali Sigillati|Distrutti|
|Blocchi di Neve Compressa|Distrutti|
|Pilastri di Tronco Ghiacciato|**Immuni**|
|Regali|**Immuni**|

### Note

- **Una volta posata, non può essere raccolta**
- L'esplosione si propaga lungo i corridoi — se esplode a un incrocio, invade tutte e 4 le vie
- I Pilastri di Tronco Ghiacciato **bloccano** la propagazione in quella direzione
- Il rumore è **FORTE** — tutti i fantasmini sulla mappa sentono e reagiscono
- **I fantasmini conoscono le bombe** — se ne vedono una a terra, la evitano e non si avvicinano

---

## Mappa — Legenda

| Elemento                          | Nome                              | Descrizione                              |
| --------------------------------- | --------------------------------- | ---------------------------------------- |
| **Lastre di Ghiaccio Antico**     | Vetrate                           | Si rompono automaticamente, rumore forte |
| **Portali Sigillati**             | Porte                             | Scassinare o sfondare                    |
| **Blocchi di Neve Compressa**     | Muri distruttibili (rettangolari) | CA 10, HP 8                              |
| **Pilastri di Tronco Ghiacciato** | Muri indistruttibili (quadrati)   | Indistruttibili                          |
| **Regali (x6)**                   | Sparsi nella mappa                | Colori visibili, contenuto nascosto      |

## Ostacoli — Meccaniche

### Lastre di Ghiaccio Antico (Vetrate)

| Stat   | Valore                     |
| ------ | -------------------------- |
| HP     | 0 — si rompono al tocco    |
| Rumore | **12 quadretti** (60'/18m) |

> _Quando si rompono:_ Il ghiaccio esplode in mille frammenti. Un suono cristallino, acuto, che echeggia nel silenzio come un grido. Ovunque siate, qualcosa vi ha sentito.


### Portali Sigillati (Porte)

|Azione|CD|Rumore|
|---|---|---|
|Scassinare|CD 13|**Nessuno**|
|Sfondare|CD 15 (FOR)|**8 quadretti** (40'/12m)|

> _Quando si sfonda:_ Il legno antico cede con uno schianto secco. L'eco rimbalza tra i pilastri di ghiaccio. Non siete più soli.


### Blocchi di Neve Compressa (Muri Distruttibili)

|Stat|Valore|
|---|---|
|CA|10|
|HP|**1d10+2** (tira quando colpito la prima volta)|
|Bonus|Armi contundenti: +2 danni|
|Rumore|**6 quadretti** (30'/9m) per colpo|

> _Quando si colpisce:_ Ogni colpo è un tonfo sordo che vibra nell'aria gelida. Qualcuno potrebbe avvicinarsi per controllare.


### Pilastri di Tronco Ghiacciato (Muri Indistruttibili)

Indistruttibili. Bloccano linea di vista e movimento.


# SISTEMA RUMORE

## Propagazione

|Azione|Raggio Rumore|
|---|---|
|Colpo su muro di neve|6 quadretti (30'/9m)|
|Porta sfondata|8 quadretti (40'/12m)|
|Lastra di ghiaccio rotta|12 quadretti (60'/18m)|
|Porta scassinata|Nessuno|
|Movimento normale|Nessuno|
|Combattimento|6 quadretti (30'/9m)|

## Reazione Fantasmini

Se un fantasmino è **nel raggio del rumore** → reagisce secondo il suo comportamento.

Se un fantasmino è **fuori dal raggio** → non sente nulla, continua il suo pattern.

---

# MECCANICA ALLERTA

Quando un fantasmino **vede un PG**:

1. Emette un **richiamo ultrasonico** — i PG sentono un fischio acuto, metallico
2. **Tutti gli altri fantasmini** conoscono la posizione dei PG
3. Convergono verso quella posizione
4. L'allerta **dura** finché almeno un fantasmino mantiene linea di vista

Se **tutti i fantasmini perdono** la linea di vista → allerta termina, tornano al comportamento normale.

> _Quando scatta l'allerta:_ Un fischio. Acuto. Non nelle orecchie — dentro la testa. Come un ago di ghiaccio nel cervello. Vi hanno trovato. E ora vi stanno cercando tutti.

![[09 Continue.wav]]

# MOSTRI

## I 4 Fantasmini — Boss del Livello

Spiriti di festività antiche legate al suono e al silenzio. **Unici — se muoiono, restano morti.**

### Statistiche Base (tutti)

| Stat            | Valore                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| Dadi Vita       | 5                                                                         |
| Punti Ferita    | 25                                                                        |
| Classe Armatura | 5 [14]                                                                    |
| Movimento       | 40'/12m/8 quadretti                                                       |
| Attacco         | Tocco gelido                                                              |
| Tiri Salvezza   | **TS G5:** Morte 10, Bacchette 11, Paralisi 12, Soffio 13, Incantesimi 14 |
| Morale          | 9                                                                         |
| Speciale        | Incorporei — armi normali: danno dimezzato                                |
| Infravisione    | 60'/ 18m / 12 quadretti                                                   |


### 🔴 TARANIS — Il Rosso

**Festività:** Culto celtico del Tuono — antica celebrazione delle tempeste invernali, quando i druidi invocavano il fragore del cielo per scacciare gli spiriti maligni.

**Posizione iniziale:** Angolo Nord-Ovest

**Comportamento:** **Cacciatore** — corre verso qualsiasi rumore. Ama il fragore. Lo cerca.

|Attacco|Danno|Effetto|
|---|---|---|
|Tocco del Tuono|1d8|Bersaglio assordato 1 round (non sente rumori, -2 iniziativa)|

> _Prima apparizione:_ Un bagliore cremisi nell'angolo della visione. Poi un rombo basso — come tuono lontano — ma viene da lui. Rosso come sangue rappreso, frastagliato come un fulmine congelato. Si muove veloce. Troppo veloce. E viene verso di voi.

---

### 🩷 ANGERONA — La Rosa

**Festività:** Dea romana del Silenzio — protettrice dei segreti, celebrata il 21 dicembre con rituali muti. Nessuno poteva parlare durante le sue cerimonie.

**Posizione iniziale:** Angolo Nord-Est

**Comportamento:** **Stalker** — si avvicina lentamente (metà movimento), si ferma ad ascoltare ogni 2 round. Paziente. Metodica.

|Attacco|Danno|Effetto|
|---|---|---|
|Tocco del Silenzio|1d8|Bersaglio non può parlare per 1 round (no incantesimi verbali)|

> _Prima apparizione:_ Non l'avete sentita arrivare. Era lì — immobile — da quanto? Rosa pallido, quasi trasparente. Non ha bocca. Dove dovrebbero esserci labbra c'è solo pelle liscia, sigillata. Vi fissa. Inclina la testa. Ascolta.

---

### 🩵 LEMURIA — La Ciano

**Festività:** Lemuria romana — festa dei fantasmi inquieti, spiriti che vagavano nelle case a maggio. I romani battevano pentole di bronzo per scacciarli.

**Posizione iniziale:** Angolo Sud-Ovest

**Comportamento:** **Nervosa** — si teletrasporta verso il rumore (posizione casuale entro 10' dalla fonte). **Paura dei vetri rotti** — fugge per 1d4 round.

|Attacco|Danno|Effetto|
|---|---|---|
|Tocco dell'Inquietudine|1d6|Si teletrasporta 20'/6m/4 quadretti dopo l'attacco|

> _Prima apparizione:_ Un lampo ciano — lì, poi altrove, poi di nuovo lì. Tremolante come una candela nel vento. Sentite la sua paura — antica, profonda — e capite che ciò che teme, lei lo diventa. Uno spirito che non trova pace. Che salta da un punto all'altro cercando silenzio.

---

### 🟠 LUPERCUS — L'Arancione

**Festività:** Lupercalia romana — festa dei lupi, celebrata in branco. I sacerdoti correvano in gruppo, mai soli. La forza del branco sopra ogni cosa.

**Posizione iniziale:** Angolo Sud-Est

**Comportamento:** **Branco** — quando sente rumore, si avvicina al fantasmino più vicino ai PG per attaccare insieme. Mai da solo. Aspetta rinforzi.

|Attacco|Danno|Effetto|
|---|---|---|
|Tocco del Branco|1d8|Se un altro fantasmino è entro 10': +1d4 danni extra|

> _Prima apparizione:_ Lo sentite prima di vederlo — un ringhio basso, gutturale. Arancione sporco, come ruggine. Si muove rasente ai muri, sempre guardando gli angoli. Cerca qualcosa. Non voi — i suoi simili. Non attacca mai da solo. Ma quando saranno in due...

---

# TIMER DEL LIVELLO

|Fase|Tempo|
|---|---|
|Esplorazione libera|45 minuti reali|
|Rintocco (ondata finale)|Fine dei 45 minuti|
|Fuga verso l'uscita|15 minuti reali|

### Cosa Succede al Rintocco

> _Leggere quando scade il tempo:_
> 
> Un rintocco. Profondo. Il silenzio si spezza.
> E con esso — i fantasmini. Tutti e quattro. Insieme. Non più pattern, non più attese.
> **Vi danno la caccia.**

**Meccanica:**

- Tutti i fantasmini convergono verso i PG (ignorano comportamenti)
- Morale sale a 12
- L'uscita brilla — visibile da ovunque


# USCITA DAL LIVELLO

> _Leggere quando attraversano l'uscita:_
> 
> La luce vi accoglie. Il fischio nelle orecchie svanisce.
> Ma il freddo resta. Diverso ancora. Più umido. Più... vivo.
> Il terzo livello vi attende.
> 
> **LIVELLO 3 — READY**

---

# REGALI

## Distribuzione Suggerita

|Posizione|Colore|Contenuto|
|---|---|---|
|Alto-sinistra|🟡 Giallo|Oro|
|Alto-centro|🟣 Rosa|Magia|
|Centro-sinistra|🟡 Giallo|Oro|
|Centro|⚪ Bianco|Cura|
|Centro-destra|🟢 Verde|Utility|
|Basso-sinistra|⚪ Bianco|Cura|
|Basso-destra|🔴 Rosso|Arma|

---

# NOTE PER IL MASTER

## Consigli

- **Il silenzio è la risorsa** — i PG devono scegliere: rumore veloce o stealth lento
- **Scassinare > Sfondare** — ricompensa la pazienza
- **Usa Lupercus** — quando si unisce a un altro fantasmino, il combattimento diventa pericoloso
- **Lemuria è l'esca** — i PG possono rompere vetri per farla fuggire

## Bilanciamento

|Mostro|Minaccia|Note|
|---|---|---|
|Taranis|Alta|Arriva per primo, sempre|
|Angerona|Media|Lenta ma blocca incantatori|
|Lemuria|Media|Imprevedibile, controllabile con vetri|
|Lupercus|Alta (in coppia)|Il vero pericolo è quando si unisce|

---

# SCHEDA RAPIDA — STAMPA E GIOCA

## Bomba (1 per PG)

|Attivazione|Timer|Esplosione|Danni|
|---|---|---|---|
|Posare + "Ignis"|5 round auto|4 dir × 3□|5d6 fuoco (TS Incantesimi ½)|

Non raccoglibile | Distrugge tutto tranne Pilastri e Regali | Fantasmini la evitano | Rumore FORTE

## Rumore

|Azione|Raggio|
|---|---|
|Colpo muro|6□ (30'/9m)|
|Porta sfondata|8□ (40'/12m)|
|Vetro rotto|12□ (60'/18m)|

## Ostacoli

|Ostacolo|CA|HP|Note|
|---|---|---|---|
|Lastra Ghiaccio|—|0|Rumore 12□|
|Porta|CD 13/15|—|Scassinare silenzioso|
|Muro Neve|10|1d10+2|Contundente +2, rumore 6□|
|Pilastro Tronco|—|∞|Indistruttibile|

## Fantasmini (HD 5 | HP 25 | CA 5 [14] | Mov 40'/12m/8□)

|Nome|Colore|Pos.|Attacco|Effetto|Comportamento|
|---|---|---|---|---|---|
|**Taranis**|🔴|NO|1d8|Assordato 1 round|Corre verso rumore|
|**Angerona**|🩷|NE|1d8|Mutismo 1 round|Lenta, ascolta ogni 2 round|
|**Lemuria**|🩵|SO|1d6|Teleport 20'|Nervosa, **fugge da vetri** 1d4 round|
|**Lupercus**|🟠|SE|1d8 (+1d4)|Bonus se in coppia|Si unisce al più vicino ai PG|

**Speciale:** Incorporei — armi normali: danno dimezzato | TS G5 | Morale 9

## Allerta

Fantasmino vede PG → fischio → **tutti convergono** → dura finché linea di vista

## Timer

|Fase|Tempo|
|---|---|
|Esplorazione|45 min|
|Rintocco → Fuga|15 min|