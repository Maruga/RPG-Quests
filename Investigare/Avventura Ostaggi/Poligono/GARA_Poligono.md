# Gara al poligono — apertura di «Ostaggi»

Serve a far provare ai giocatori il combattimento prima del caso. **Le regole** (iniziativa, movimento, distanza, colpi, punteggio) **stanno nel regolamento** (`../../Combattimento/`), non qui.

## Situazione

- Finale della gara di tiro tra i distretti di polizia di Kyoto. Due squadre: i PG (distretto di Shimogyō) e il distretto di **Minami (quello a sud della stazione)**, che gareggia a parte: vale solo come punteggio da battere.
- I PG sono tutti in campo insieme e devono coordinarsi.
- Finita la gara stanno per andare a pranzo: arriva la chiamata.

## Il campo

- Foglio A3 a quadretti da 2,5 cm (token 2,5 × 2,5 cm), **1 quadretto = 1,5 m**, campo 16 × 11 quadretti = 24 × 16,5 m. Mappa per i giocatori: `Mappa_Poligono_A3.svg` (vettoriale) e `.png` (stampa), generate da `crea_mappa_poligono.py`; in testa allo script si cambiano quadretti, posizioni e colori delle sagome, raggio della zona. Sulla mappa le sagome sono numerate dall'alto (1-7); l'ordine di salita non c'è, sta solo qui.
- Ogni sagoma ha il suo colore, la zona della **distanza normale** colorata quadretto per quadretto con confine tratteggiato (dentro si colpisce con malus 0, fuori si è lontani; raggio 3 quadretti, da fissare nel regolamento) e accanto 3 quadratini per i colpi sparati e una casella per lo scarto, da segnare a matita. In basso la scala dei momenti da 1 a 64 (7 sagome ogni 7 momenti + 15), con i multipli di 7 evidenziati.
- I PG partono in alto, pistole in fondina.
- **Sette sagome** coricate nel campo, alcune vicine e alcune lontane. Salgono una ogni 7 momenti: **7, 14, 21, 28, 35, 42, 49**. A parità di momento la sagoma sale prima del PG. Una sagoma alzata resta alzata.
- Ordine di salita (provvisorio, numeri della mappa): 7 → **1** rossa (D4) · 14 → **5** blu (N10) · 21 → **3** verde (I6) · 28 → **6** arancio (B11) · 35 → **2** viola (O4) · 42 → **7** verde acqua (J11) · 49 → **4** magenta (F8).

## Svolgimento

1. Il capo dà il via. Ogni PG tira l'iniziativa e agisce al proprio momento; quando tutti hanno finito, nuovo giro. Un PG può fermare la propria azione e ritirare subito.
2. Le sagome salgono ai momenti sopra. Si può risparare su una sagoma già colpita per migliorare lo scarto.
3. La gara finisce quando il capo o i PG la dichiarano conclusa. Si segnano **momento finale, colpi sparati, scarto migliore su ogni sagoma**.
4. Si confronta con il punteggio di Minami (da fissare quando c'è la formula nel regolamento).

Formula del punteggio: la scrive l'autore nel regolamento. Proposta consegnata il 2026-09-22: 2 × somma degli scarti migliori − colpi sparati − momento finale ÷ 7.

## La prova finale — l'ostaggio

Le armi della gara sono **repliche a gas del New Nambu**, identiche per peso e impugnatura, caricate a **pallini di gesso**: dove colpiscono lasciano un segno bianco. Chi porta il segno **è fuori dalla prova**, si siede e guarda. I due che escono portano visiera trasparente e casco: si vedono in faccia, e i PG li conoscono.

### Chi esce

| | **Kuriyama Tomoe** 栗山 巴 — l'ostaggio | **Hirano Tadashi** 平野 正 — il malvivente |
|---|---|---|
| Chi è | 31 anni, agente scelto della squadra di tiro della prefettura. **Ha vinto la gara prefettizia le ultime quattro volte e una nazionale**: quando esce, ogni PG sa chi è | 46 anni, istruttore capo del poligono. Fa il malvivente da vent'anni e lo fa bene: voce grossa, replica alla tempia di lei |
| Distacco · Pazienza · Silenzio · Lucidità · Ascolto · Presenza | 7 · 6 · 6 · **9** · 5 · 6 | 7 · 6 · 6 · 7 · 6 · 8 |
| Ki | 10 | 11 |
| Modificatore di Presenza | 0 | −2 |
| Senmon | **Pistola 3, Maestro** · Lotta 1 | Pistola 2 · Lotta 2 |
| Da Maestro | **−1 anche all'iniziativa quando spara**: la pistola le esce in mano prima che agli altri | — |
| Arma | replica New Nambu **nella cintura, dietro la schiena**, cinque pallini: ne spara tre | replica New Nambu **in mano**, puntata su di lei |
| Cosa dichiara, in silenzio | «salto via» | «sparo al più vicino» |

### La sequenza

1. **Cade l'ultima sagoma.** Da dietro il terrapieno escono i due: lui tiene la replica alla tempia di lei, lei ha le mani dietro la schiena. Lui urla che se qualcuno si muove le spara. I PG hanno le repliche in mano, appena usate.
2. **Dichiarazioni, tutti insieme, prima dell'iniziativa**, come da regolamento. I PG dicono cosa fanno. Il GM dichiara per i due senza dirlo: lui spara al PG più vicino, lei salta via.
3. **Iniziativa e risoluzione.** Lui spara. Lei salta di lato e finisce a terra, fuori dalla linea. I PG fanno quello che hanno dichiarato. Chi ha minacciato può andare in Ukemi contro il colpo di lui, chi ha attaccato o si è mosso è scoperto.
4. **L'agguato.** A terra, lei ha già in mano la replica che teneva dietro la schiena. È la regola della sorpresa del manuale: **ogni PG tira Ascolto**, senza malus, perché le mani dietro erano lì da vedere. **Chi fallisce è sorpreso e non ha Ukemi**: lei spara tre colpi, un tiro solo per la sequenza, e chi è sorpreso prende quello che gli arriva. Chi riesce non è sorpreso, e contro di lui l'agguato non c'è.
5. **Iniziativa normale, un ultimo scambio.** Adesso tutti sanno tutto: lei è a terra, quindi chi le spara ha +1, e con le repliche in mano i PG la battono sull'iniziativa. Lei spara ancora uno o due colpi.
6. **La sirena.** Fine prova. Lo scambio con lei non si conclude, e non deve: l'esercitazione è finita quando gli istruttori hanno visto quello che volevano vedere. Hirano si toglia la visiera e fa il conto ad alta voce: chi porta il gesso, e dove.

### Cosa hanno visto gli istruttori

Chi ha guardato l'ostaggio e chi ha guardato solo il malvivente. Chi ha parlato e chi ha sparato. Chi si è avvicinato. Chi, quando lei è saltata, ha capito prima del dado. Nessuno lo dice ai PG in questi termini: un'ora dopo, davanti alla banca, lo capiscono da soli.

## Da fare

- Mappa definitiva del poligono (illustrata, A3) e da lì posizione e ordine delle sagome.
- Punteggio della squadra di Minami.
- Come si passa dalla gara alla chiamata (la riscrittura dell'avventura).
