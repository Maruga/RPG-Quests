# SWADE - Manovre di Combattimento

> Savage Worlds Adventure Edition - Riferimento Rapido

---

## Legenda

|Simbolo|Significato|
|---|---|
|**Diff**|Difficoltà (Target Number) - il numero da eguagliare o superare|
|**Incremento**|Ogni +4 oltre la Difficoltà|
|**d4, d6, d8...**|Tipo di dado|
|**Jolly**|Dado d6 extra per Wild Card (PG e PNG importanti)|
|**Passo**|Movimento base in pollici (1" = 2 metri)|

---

## Attacchi a Distanza

### Doppio Colpo (Double Tap)

- **Requisito:** Arma semiautomatica
- **Costo:** 2 colpi
- **Effetto:** +1 a Sparare, +1 ai danni

> [!example] Esempio Jean spara con la pistola: tira Sparare +1, se colpisce fa 2d6+1 danni invece di 2d6.

---

### Raffica Tre Colpi (Three Round Burst)

- **Requisito:** Arma con modalità 3RB
- **Costo:** 3 colpi
- **Effetto:** +2 a Sparare, +2 ai danni

> [!example] Esempio Marco spara con SMG in modalità 3RB: tira Sparare +2, se colpisce fa 2d6+2 danni.

---

### Cadenza di Tiro (CdT / Rate of Fire)

- **Requisito:** Arma con CdT 2+
- **Penalità:** -2 a tutti i dadi (rinculo)
- **Effetto:** Tiri tanti dadi Sparare quanti indicati dal CdT

|CdT|Dadi Sparare|Munizioni consumate|
|---|---|---|
|1|1 dado|1 colpo|
|2|2 dadi|4 colpi|
|3|3 dadi|9 colpi|
|4|4 dadi|12 colpi|

> [!tip] Nota Puoi sempre sparare meno colpi del CdT massimo. Un singolo colpo NON ha penalità rinculo.

> [!example] Esempio Viktor con AK-47 (CdT 3) spara 3 colpi: tira 3d8 + 1d6 Jolly, tutti a -2. Può distribuire i colpi su bersagli diversi.

---

### Fuoco di Soppressione

- **Requisito:** Qualsiasi arma a distanza
- **Costo:** 5 × CdT munizioni
- **Procedura:**
    1. Piazza **Template Medio** (4" raggio) sui bersagli
    2. Tira Sparare vs **Diff 4** (modificatori gittata, NO copertura)
    3. Se successo: ogni bersaglio nel template tira **Spirito** (può aggiungere bonus copertura)

|Risultato Spirito|Effetto|
|---|---|
|Successo|Nessun effetto|
|Fallimento|**Scosso**|
|1 sul dado abilità|Colpito + danni normali|

> [!example] Esempio Viktor sopprime 3 nemici dietro un muretto. Tira Sparare d8: ottiene 6 (successo). I nemici tirano Spirito con +4 (copertura media). Uno fallisce → Scosso. Uno tira 1 → colpito, subisce 2d8 danni.

---

### Mirare

- **Costo:** Azione/i (niente movimento)
- **Effetto:**
    - 1 azione di mira → **+1** al prossimo tiro
    - 2 azioni di mira (turno intero) → **+2** al prossimo tiro

> [!warning] Limite Massimo +2, non si accumula oltre. Mirare più turni non dà bonus aggiuntivi.

---

### Colpi Mirati

|Bersaglio|Penalità|Effetto|
|---|---|---|
|Arto (braccio/gamba)|-2|Effetti narrativi|
|Testa/Organi vitali|-4|**+4 ai danni**|
|Mano|-4|Lascia arma se colpito|
|Punto debole armatura|-6|Ignora armatura|

> [!example] Esempio Viktor mira alla testa (-4): tira Sparare d10-4. Se colpisce, fa 2d8+4 danni.

---

## Attacchi in Mischia

### Assalto (Wild Attack)

- **Effetto:** +2 a Combattere, +2 ai danni
- **Svantaggio:** Diventi **Vulnerabile** fino al prossimo turno

> [!warning] Attenzione Vulnerabile = nemici hanno +2 a colpirti

> [!example] Esempio Boris carica con il coltello: +2 a Combattere, +2 ai danni. Fino al suo prossimo turno è Vulnerabile.

---

### Afferrare (Grapple)

- **Tiro:** **Atletica** vs **Atletica** avversario (tiro opposto)
- **Successo:** Bersaglio è **Intralciato** (Entangled)
- **Incremento:** Bersaglio è **Immobilizzato** (Bound)

|Condizione|Effetti|
|---|---|
|Intralciato|Non può muoversi, Distratto|
|Immobilizzato|Non può muoversi, Distratto, Vulnerabile, no azioni fisiche|

**Turni successivi:**

- **Liberarsi:** Azione + Atletica (o Forza -2). Successo = Intralciato, Incremento = libero
- **Schiacciare:** Forza vs Forza. Successo = danni pari a Forza, Incremento = +d6

> [!example] Esempio Boris afferra una guardia: Atletica d8 vs d6. Boris vince → guardia Intralciata. Turno dopo, Boris fa Forza vs Forza e infligge d8 danni.

---

### Spingere (Push)

- **Tiro:** Forza o Atletica vs Forza o Atletica avversario
- **Successo:** Spingi il bersaglio di **1"**
- **Incremento:** Spingi di **2"** e cade **Prono**

---

### Disarmare

**Opzione A - Colpire l'arma:**

- Colpo mirato -2 all'arma
- Se colpisci → nemico tira Forza vs danni
- Fallisce = lascia l'arma

**Opzione B - Colpire la mano:**

- Colpo mirato -4
- Danni normali + lascia arma se Scosso/Ferito

---

## Manovre Difensive

### Difesa (Defend)

- **Costo:** Azione intera (no multi-azione)
- **Effetto:** **+4 Parata** fino al prossimo turno
- **Movimento:** Puoi muoverti (Passo normale), ma **NON** correre
- **Nota:** Non puoi attaccare

> [!example] Esempio Aleksei è circondato: dichiara Difesa. La sua Parata sale da 6 a 10. Può spostarsi di 6" ma non può attaccare.

---

### Difesa Totale (Full Defense)

- **Costo:** Azione intera
- **Procedura:** Tira **Combattere +2**, usa il risultato come nuova Parata
- **Movimento:** **NON** puoi muoverti
- **Nota:** Se il tiro è peggiore della Parata base, mantieni quella base

> [!example] Esempio Aleksei fa Difesa Totale: tira Combattere d8+2 e ottiene 11. La sua Parata diventa 11 (normalmente era 6). Non può muoversi.

---

## Supporto e Tattiche

### Supporto (Support)

- **Tiro:** Abilità rilevante vs **Diff 4**
- **Successo:** **+1** al prossimo tiro di un alleato
- **Incremento:** **+2** al prossimo tiro
- **Fallimento critico:** -2 al tiro dell'alleato
- **Limite:** Max +4 da Supporto multiplo

> [!example] Esempio Hans aiuta Viktor a mirare usando Notare d6: ottiene 8 (Incremento). Viktor riceve +2 al prossimo tiro Sparare.

---

### Test

- **Tiro:** Abilità vs Attributo bersaglio
- **Successo:** Bersaglio è **Distratto** (-2 ai suoi tiri) **OPPURE** **Vulnerabile** (+2 a colpirlo) - scegli tu
- **Incremento:** Anche **Scosso**

|Abilità usata|Attributo difensivo|
|---|---|
|Combattere / Atletica|Agilità|
|Provocare (Taunt)|Intelligenza|
|Intimidire|Spirito|

> [!tip] Nota Qualsiasi abilità può essere usata per un Test se ha senso narrativamente (Sparare, Furtività, Cavalcare...).

> [!example] Esempio Marie provoca un soldato: Provocare d8 vs Intelligenza d6. Marie: 9, Soldato: 4 → Marie vince con Incremento. Il soldato è Distratto **E** Scosso.

---

### Accerchiamento (Gang Up)

- **Requisito:** Più attaccanti adiacenti allo stesso bersaglio
- **Effetto:** **+1 a Combattere** per ogni attaccante oltre il primo
- **Limite:** Max **+4**

> [!example] Esempio 3 soldati attaccano Boris in mischia: ognuno ha +2 a Combattere.

---

## Situazioni Speciali

### Agguato / Sorpresa (The Drop)

- **Condizione:** Il bersaglio non sa che ci sei
- **Effetto:** **+4 al tiro attacco** E **+4 ai danni** (solo prima azione)

> [!example] Esempio Viktor è appostato, il nemico non lo vede: +4 a Sparare e +4 ai danni.

---

### Ritiro dalla Mischia

- **Rischio:** Tutti i nemici adiacenti **NON Scossi** ottengono **1 attacco gratuito**
- **Nota:** Gli attacchi gratuiti non possono usare manovre speciali

> [!tip] Consiglio Usa Difesa prima di ritirarti per aumentare la Parata di +4.

---

### Sparare in Mischia

|Tipo arma|Regola|
|---|---|
|Armi lunghe (fucili)|**NON** puoi usarle contro adiacenti|
|Pistole|Puoi sparare, Diff = **Parata nemico** (non 4)|

---

### Prono (a terra)

|Situazione|Effetto|
|---|---|
|Attacchi a distanza da 3"+|**-4** a colpirti (copertura media)|
|Attacchi in mischia|**+2** a colpirti, **-2** ai tuoi tiri Combattere|
|Alzarsi|Costa **2"** di movimento|

---

## Danni

### Calcolo Danni

|Risultato|Effetto|
|---|---|
|Danno < Robustezza|Nessun effetto|
|Danno ≥ Robustezza|**Scosso**|
|Ogni +4 oltre Robustezza|**+1 Ferita**|
|Già Scosso + nuovo Scosso|**1 Ferita** (resta Scosso)|

### Comparse vs Wild Card

|Tipo|Ferite|Dado Jolly|Benny|
|---|---|---|---|
|**Comparsa**|1 = fuori|No|No|
|**Wild Card**|3 max|Sì|Sì|

> [!warning] Ferite Ogni Ferita dà **-1 a tutti i tiri**.

---

## Condizioni

|Condizione|Effetto|Come rimuoverla|
|---|---|---|
|**Scosso**|Solo azioni gratuite (muoversi)|Spirito a inizio turno **O** spendi 1 Benny|
|**Distratto**|-2 a tutti i tuoi tiri|Fine del tuo prossimo turno|
|**Vulnerabile**|Nemici +2 a colpirti|Fine del tuo prossimo turno|
|**Intralciato**|Non puoi muoverti, Distratto|Azione + Atletica/Forza-2|
|**Immobilizzato**|Non muovi, Distratto, Vulnerabile|Azione + Atletica/Forza-2 (Incremento)|
|**Prono**|-2 Parata/Combattere, copertura vs distanza|Spendi 2" movimento|
|**Stordito**|Prono, no azioni, The Drop contro di te|Vigor ogni turno|

---

## Copertura

|Tipo|Penalità attaccante|Esempi|
|---|---|---|
|Leggera|-2|Cespuglio, fumo leggero|
|Media|-4|Muretto, auto, bidone|
|Pesante|-6|Finestra stretta, feritoia|
|Quasi totale|-8|Fessura nel muro|

---

## Illuminazione

|Condizione|Penalità|
|---|---|
|Luce fioca|-2|
|Buio|-4 (max 10" visibilità)|
|Oscurità totale|-6 (bersaglio invisibile)|

---

## Gittata

|Distanza|Penalità|
|---|---|
|Corta|0|
|Media|-2|
|Lunga|-4|
|Estrema (4× Lunga)|-8|

---

## Multi-Azione

- Puoi fare **fino a 3 azioni** per turno
- Ogni azione aggiuntiva dà **-2 a TUTTE le azioni** del turno

|Azioni|Penalità totale|
|---|---|
|1|0|
|2|-2 a entrambe|
|3|-4 a tutte|

---

## Azioni Gratuite

Queste azioni **NON** contano come azioni e non danno penalità:

- Muoversi fino al Passo
- Parlare brevemente
- Cadere prono
- Estrarre 1 arma (con Edge Quick Draw)
- Resistere a poteri

---

## Benny

Un Benny può essere speso per:

- **Ritirare** qualsiasi tiro (tranne fallimento critico)
- **Rimuovere Scosso** immediatamente
- **Assorbire Ferite** (Soak): tira Vigor, ogni successo/incremento nega 1 Ferita
- **Pescare nuova carta** iniziativa
- **Recuperare 5 Punti Potere** (se usi magia)

---

## Riferimenti Pagine SWADE

|Argomento|Pagina|
|---|---|
|Combattimento|92-109|
|Condizioni|94-100|
|Danni e Ferite|94-96|
|Copertura|98|
|Afferrare|101|
|Armi a distanza|102-107|

---

> [!info] Versione Documento basato su **Savage Worlds Adventure Edition** (SWADE) - Regole ufficiali verificate