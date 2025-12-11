# LIVELLO 1 — PACMAN

## Mappa

- **Dimensioni:** 28 x 40 quadretti (1 quadretto = 5' = 1,5m)
- **Origine:** 0,0 in basso-sinistra
- **Ingresso:** X=0, Y=24 (lato sinistro)
- **Uscita:** X=28, Y=24 (lato destro)

---

## Ingresso nel Livello

> _Leggere quando i PG attraversano il portale:_

> La luce argentea vi inghiotte. Per un istante, niente — poi il freddo vi morde la pelle.
> 
> Aprite gli occhi. Corridoi di ghiaccio azzurro, pareti lisce come specchi. L'aria sa di menta e metallo. Un ronzio basso vibra sotto la pelle.
> 
> Il labirinto si estende davanti a voi. Angoli ciechi, ombre che si muovono dove non dovrebbero.
> 
> E ovunque — pacchetti. Regali. Scatole colorate con nastri che brillano nel buio.
> 
> **LIVELLO 1 — START**

---

## Il Primo Regalo — L'Elfo Guida

> _Leggere quando un PG apre il primo regalo:_

> Le vostre dita sfiorano il nastro. Un brivido freddo risale le braccia. L'aria si carica — odore di pino, di neve antica, di qualcosa di dimenticato.
> 
> Un lampo verde smeraldo. Un elfo appare: piccolo, rugoso, gli occhi troppo vecchi per quel corpo.
> 
> **"Fermi. Ascoltate."**
> 
> La voce è un sussurro che sentite nelle ossa, non nelle orecchie.
> 
> **"Tre livelli. Alla fine dell'ultimo, Lui — e ciò che lo imprigiona. Raccogliete tutto: armi, pozioni, oro. Ogni bonus è speranza rubata. L'oro vi darà libertà di scelta, più avanti."**
> 
> Si volta, come se udisse qualcosa che voi non udite. L'aria si fa più fredda.
> 
> **"Avete tempo, ma non infinito. Quando sentirete il rintocco — un suono che vi gelerà il sangue — correte all'uscita. Chi non completa il livello in tempo..."**
> 
> Silenzio.
> 
> **"...game over."**
> 
> Inizia a sbiadire. L'ultimo sussurro vi sfiora come un alito gelido sulla nuca:
> 
> **"E ricordate: qui dentro, chi dona... riceve."**
> 
> Scompare. Resta l'odore di pino. Il regalo tra le mani. E il silenzio che ora sembra vivo.

---

## Mappa — Legenda

|Elemento|Descrizione|
|---|---|
|**Regali (x6)**|Sparsi nella mappa, colori visibili, contenuto nascosto|
|**Spawn Centrale (ciano)**|Casa dei mostri — da qui escono e qui ritornano|
|**Zone Rosse**|Barriera anti-Saturno e anti-Koleda|
|**Zone Gialle**|Barriera anti-Yula e anti-Modraniht|
|**Porta Segreta $ (alto)**|Regalo bonus nascosto|
|**Porta Segreta $ (basso)**|Passaggio nel muro — via di fuga|
|**Ingresso**|X=0, Y=24|
|**Uscita**|X=28, Y=24|

### Zone Colorate — Meccanica

Le barriere bloccano solo i Fantasmini, non i minion né i PG:

|Zona|Blocca|Effetto visivo|
|---|---|---|
|**Rossa**|Saturno (rosso) e Koleda (arancione)|Luce che respinge|
|**Gialla**|Yula (rosa) e Modraniht (ciano)|Calore che brucia|

---

# MOSTRI

## I 4 Fantasmini — Boss del Livello

Spiriti di festività antiche, divorate dal rancore. **Unici — se muoiono, restano morti.**

### Statistiche Base (tutti)

|Stat|Valore|
|---|---|
|Dadi Vita|5|
|Punti Ferita|25|
|Classe Armatura|5 [14]|
|Movimento|40'/12m/8 quadretti|
|Attacco|Tocco gelido|
|Tiri Salvezza|G5|
|Morale|9|
|Speciale|Incorporei — armi normali: danno dimezzato|

---

### 🔴 SATURNO — Il Rosso

**Festività:** Saturnalia romana **Comportamento:** Insegue sempre il PG più vicino. Mai si arrende. **Debolezza:** Non può entrare nelle zone rosse

|Attacco|Danno|Effetto|
|---|---|---|
|Tocco gelido|1d8|Bersaglio -2 CA per 1 round|

> _Prima apparizione:_ Un bagliore cremisi in fondo al corridoio. Una sagoma sfilacciata, rosso sangue rappreso. Dove dovrebbe avere il volto c'è solo un vortice di fiamme fredde. Avanza. Dritto verso di voi. Nessun rumore di passi. Solo il vostro cuore che accelera.

---

### 🩷 YULA — La Rosa

**Festività:** Yule nordico **Comportamento:** Anticipa i movimenti, taglia la strada. Non insegue — aspetta. **Debolezza:** Non può entrare nelle zone gialle

|Attacco|Danno|Effetto|
|---|---|---|
|Tocco gelido|1d8|Bersaglio non può correre per 1 round|

> _Prima apparizione:_ Non l'avete vista arrivare. Era dietro l'angolo — vi aspettava. Rosa pallido, quasi bianco, come aurora boreale malata. Ondeggia senza peso. L'aria intorno geme come legno che si spezza al gelo. Vi fissa. Sa dove andrete prima di voi.

---

### 🩵 MODRANIHT — La Ciano

**Festività:** Notte delle Madri (anglosassone) **Comportamento:** Erratica, imprevedibile. Appare dove non te l'aspetti. **Debolezza:** Non può entrare nelle zone gialle

|Attacco|Danno|Effetto|
|---|---|---|
|Tocco gelido|1d6|Si teletrasporta 20'/6m/4 quadretti dopo l'attacco|

> _Prima apparizione:_ Un lampo ciano alla vostra sinistra. Girate — niente. Un sussurro alla destra. Eccola. Luminescente, instabile, come un riflesso sull'acqua che trema. Scompare. Riappare. Dove sarà la prossima volta?

---

### 🟠 KOLEDA — L'Arancione

**Festività:** Koleda slava **Comportamento:** Insegue, ma fugge se in inferiorità numerica (meno mostri che PG). **Debolezza:** Non può entrare nelle zone rosse

|Attacco|Danno|Effetto|
|---|---|---|
|Tocco gelido|1d8|Ruba 1 oggetto casuale (slot 0-1) dallo zaino|

> _Prima apparizione:_ Lo sentite prima di vederlo — un tintinnio metallico, come campanelli stonati. Arancione bruciato, striature nere come cenere. Si avvicina, poi esita. Vi studia. Vi conta. Se siete troppi, scappa. Se siete soli... sorride. Non ha bocca, ma sorride.

---

## Minion — Scheletri di Ghiaccio

**Quantità:** 4 in campo (sempre) **Respawn:** Immediato dalla casa spawn quando uno muore

|Stat|Valore|
|---|---|
|Dadi Vita|3|
|Punti Ferita|14|
|Classe Armatura|5 [14]|
|Movimento|30'/9m/6 quadretti|
|Attacco|Artiglio 1d8|
|Tiri Salvezza|G3|
|Morale|12|
|Speciale|Immune freddo, vulnerabile fuoco (danno x2), **se 2+ attaccano stesso bersaglio: +2 TxC**|

> _Prima apparizione:_ Ossa bianche, ricoperte di brina. Si muovono a scatti, come marionette con i fili gelati. Il suono del ghiaccio che si rompe a ogni passo. Non pensano. Non temono. Avanzano.

---

## Minion — Elfi Corrotti

**Quantità:** 3 in campo **Respawn:** Nessuno — morti = morti

|Stat|Valore|
|---|---|
|Dadi Vita|3+1|
|Punti Ferita|16|
|Classe Armatura|4 [15]|
|Movimento|40'/12m/8 quadretti|
|Attacco|Pugnale gelido 1d6+2 (mischia) / Ghiacciolo 1d4 (30'/9m/6 quadretti)|
|Tiri Salvezza|G3|
|Morale|8|
|Speciale|Se colpiscono in mischia: bersaglio -10'/3m/2 quadretti movimento per 2 round|

> _Prima apparizione:_ Sembravano elfi. Una volta. Ora la pelle è grigio-azzurra, gli occhi vuoti e lattiginosi. Indossano ancora i grembiuli da lavoro, macchiati di nero. Veloci, silenziosi. Non parlano. Non ridono più.

---

# SISTEMA MOVIMENTO MOSTRI

## Regole Base

1. **Se un mostro vede un PG (linea di vista)** → abbandona il percorso e lo attacca
2. **Se un minion incontra un Fantasmino** → inizia a seguirlo
3. **Altrimenti** → segue i waypoint del suo colore

## Waypoint Colorati

Ogni mostro segue SOLO i waypoint del suo colore. Arrivato all'ultimo, riparte dal primo (loop).

### Simboli sulla Mappa

|Tipo|Simbolo|
|---|---|
|Scheletri|● (pallino)|
|Elfi|▲ (triangolo)|

---

## Percorsi Scheletri (●)

### 🔵 Scheletro 1 — Blu (Quadrante Alto-Sinistra)

|WP|X|Y|
|---|---|---|
|1|4|37|
|2|4|32|
|3|10|32|
|4|10|37|
|→ torna a 1|||

### 🟢 Scheletro 2 — Verde (Quadrante Alto-Destra)

|WP|X|Y|
|---|---|---|
|1|24|37|
|2|24|32|
|3|18|32|
|4|18|37|
|→ torna a 1|||

### 🟡 Scheletro 3 — Giallo (Quadrante Basso-Sinistra)

|WP|X|Y|
|---|---|---|
|1|4|8|
|2|4|14|
|3|10|14|
|4|10|8|
|→ torna a 1|||

### ⚫ Scheletro 4 — Nero (Quadrante Basso-Destra)

|WP|X|Y|
|---|---|---|
|1|24|8|
|2|24|14|
|3|18|14|
|4|18|8|
|→ torna a 1|||

---

## Percorsi Elfi (▲)

### 🟣 Elfo 1 — Viola (Corridoio Centrale)

|WP|X|Y|
|---|---|---|
|1|4|24|
|2|14|24|
|3|24|24|
|→ torna a 1|||

### 🟤 Elfo 2 — Marrone (Perimetro Esterno)

|WP|X|Y|
|---|---|---|
|1|4|8|
|2|4|37|
|3|24|37|
|4|24|8|
|→ torna a 1|||

### ⚪ Elfo 3 — Bianco (Zona Spawn)

|WP|X|Y|
|---|---|---|
|1|10|20|
|2|10|28|
|3|18|28|
|4|18|20|
|→ torna a 1|||

---

## Fuga dei Fantasmini (Power-Up)

Quando un PG trova il **Power-Up** (regalo speciale, a discrezione del Master):

- Tutti i Fantasmini fuggono verso la casa centrale per **1d4 round**
- Non attaccano durante la fuga
- Movimento raddoppiato verso lo spawn
- Possono essere colpiti normalmente (**danno pieno** anche con armi normali)

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
> Un suono. Profondo. Un rintocco che vi attraversa le ossa.
> 
> Poi un altro. E un altro.
> 
> Dalla casa centrale, un fiume di ombre. Scheletri. Decine. Il ghiaccio trema sotto i loro passi.
> 
> **"CORRETE."**

**Meccanica:**

- Scheletri illimitati iniziano a spawnare (2 per round)
- Fantasmini diventano più aggressivi (Morale 12)
- L'uscita brilla — visibile da ovunque

---

# USCITA DAL LIVELLO

> _Leggere quando attraversano l'uscita:_
> 
> La luce vi avvolge. Calore. Per un istante, silenzio.
> 
> Poi il freddo torna — diverso. Nuovo.
> 
> Siete nel secondo livello. Il labirinto è cambiato. Ma i regali brillano ancora.
> 
> **LIVELLO 2 — READY**

---


# NOTE PER IL MASTER

## Ordine di Gioco (Round)

1. **PG si muovono** (movimento da combattimento)
2. **PG agiscono** (prendono regali, attaccano, aprono porte)
3. **Fantasmini si muovono** (ognuno secondo la sua AI)
4. **Minion si muovono** (seguono waypoint o PG/Fantasmini)
5. **Combattimento** (se mostri raggiungono PG)

## Consigli

- **Non far apparire tutti i Fantasmini subito** — introdurli uno alla volta
- **Usa le zone colorate** — i PG devono capire il pattern
- **Il tempo è reale** — usa un timer visibile
- **Le porte segrete** — Percezione o dichiarazione esplicita per trovarle
- **Verifica i waypoint** — aggiusta le coordinate se cadono sui muri

## Bilanciamento

|Mostro|Minaccia|Note|
|---|---|---|
|Scheletri|Media|Respawn costante, logora risorse|
|Elfi|Media-Alta|Pochi ma pericolosi, rallentano la fuga|
|Fantasmini|Alta|I veri nemici — gestirli è la sfida tattica|

## Totale Mostri in Campo

|Tipo|Quantità|Respawn|
|---|---|---|
|Fantasmini|4|No|
|Scheletri|4|Sì (immediato)|
|Elfi|3|No|
|**Totale**|**11**|—|