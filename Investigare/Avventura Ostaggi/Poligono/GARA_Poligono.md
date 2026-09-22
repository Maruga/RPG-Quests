# Gara al poligono — apertura di «Ostaggi»

Serve a far provare ai giocatori il combattimento prima del caso. **Le regole** (iniziativa, movimento, distanza, colpi, punteggio) **stanno nel regolamento** (`../../Combattimento/`), non qui.

## Situazione

- Finale della gara di tiro tra i distretti di polizia di Kyoto. Due squadre: i PG (distretto di Shimogyō) e il distretto di **Minami (quello a sud della stazione)**, che gareggia a parte: vale solo come punteggio da battere.
- I PG sono tutti in campo insieme e devono coordinarsi.
- Finita la gara stanno per andare a pranzo: arriva la chiamata.

## Il campo

- Foglio A3 a quadretti da 2,5 cm (token 2,5 × 2,5 cm), **1 quadretto = 1,5 m**, campo 16 × 11 quadretti = 24 × 16,5 m. Mappa per i giocatori: `Mappa_Poligono_A3.svg` (vettoriale) e `.png` (stampa), generate da `crea_mappa_poligono.py`; in testa allo script si cambiano quadretti, posizioni e colori delle sagome, raggio del cerchio. Sulla mappa le sagome non hanno numero né ordine di salita: quello sta solo qui.
- Ogni sagoma ha il suo colore, un cerchio leggero della **distanza normale** (dentro il cerchio si colpisce con malus 0, fuori si è lontani; raggio 4 quadretti, da fissare nel regolamento) e accanto 3 quadratini per i colpi sparati e una casella per lo scarto, da segnare a matita. In basso la scala dei momenti da 1 a 64 (7 sagome ogni 7 momenti + 15), con i multipli di 7 evidenziati.
- I PG partono in alto, pistole in fondina.
- **Sette sagome** coricate nel campo, alcune vicine e alcune lontane. Salgono una ogni 7 momenti: **7, 14, 21, 28, 35, 42, 49**. A parità di momento la sagoma sale prima del PG. Una sagoma alzata resta alzata.
- Ordine di salita (provvisorio, sulla mappa attuale): 7 → rossa (D4) · 14 → blu (N10) · 21 → verde (I6) · 28 → arancio (B11) · 35 → viola (O4) · 42 → verde acqua (J11) · 49 → magenta (F8).

## Svolgimento

1. Il capo dà il via. Ogni PG tira l'iniziativa e agisce al proprio momento; quando tutti hanno finito, nuovo giro. Un PG può fermare la propria azione e ritirare subito.
2. Le sagome salgono ai momenti sopra. Si può risparare su una sagoma già colpita per migliorare lo scarto.
3. La gara finisce quando il capo o i PG la dichiarano conclusa. Si segnano **momento finale, colpi sparati, scarto migliore su ogni sagoma**.
4. Si confronta con il punteggio di Minami (da fissare quando c'è la formula nel regolamento).

Formula del punteggio: la scrive l'autore nel regolamento. Proposta consegnata il 2026-09-22: 2 × somma degli scarti migliori − colpi sparati − momento finale ÷ 7.

## Da fare

- Mappa definitiva del poligono (illustrata, A3) e da lì posizione e ordine delle sagome.
- Punteggio della squadra di Minami.
- Come si passa dalla gara alla chiamata (la riscrittura dell'avventura).
