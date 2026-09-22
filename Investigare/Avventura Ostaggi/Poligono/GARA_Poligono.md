# Gara al poligono — apertura di «Ostaggi»

**Bozza del 2026-09-22.** Serve a far capire il combattimento ai giocatori. Mappa: `Mappa_Poligono_A3.png` (script `disegna_poligono.py`).

## Situazione

- Finale della gara di tiro tra i distretti di Kyoto. Due squadre: i PG (distretto di Shimogyō) e il distretto di **Minami (quello a sud della stazione)**, che gareggia a parte e vale solo come punteggio da battere.
- I PG sono **tutti in campo insieme** e devono coordinarsi.
- Finita la gara, stanno per andare a pranzo quando arriva la chiamata.

## Il campo

- Griglia su foglio A3. I PG partono in alto, pistole in fondina.
- **Sette sagome** coricate nel campo, vicine e lontane. **Una volta alzata, una sagoma resta alzata.**
- Dimensione del quadretto, soglie di distanza, posizione e sequenza delle sagome: si fissano quando c'è la mappa definitiva.

## Svolgimento

Si gioca con **Combattimento v3.1** (`../../Combattimento/GENKAI_Combattimento.md`): dichiari → iniziativa → risolvi.

1. **Al via** ogni PG tira **2d6 + modificatore di Presenza + velocità dell'azione** e agisce al proprio momento.
2. **Le sagome salgono ogni 7 momenti**: 7, 14, 21, 28, 35, 42, 49. **Se una sagoma e un PG hanno lo stesso momento, la sagoma sale prima.**
3. **Quando tutti hanno finito la loro azione si riparte**: nuovo giro, tutti ritirano l'iniziativa. Il contatore continua da dove era: il momento di un PG nel giro nuovo si somma a quello del giro prima.
4. **Un PG può fermare la sua azione** in qualsiasi momento: così ritira subito la nuova iniziativa.
5. **Si può risparare** su una sagoma già colpita per fare uno scarto migliore.
6. **La gara finisce quando il capo o i PG la dichiarano conclusa.** Lì si segnano tempo, colpi e punti.

### Muoversi

| Andatura | Quadretti per azione | Malus al colpire nella stessa azione |
|---|---|---|
| **Lento** | 1 o 2 (con il quadretto) | nessuno |
| **Camminare** | con il quadretto | **+1** |
| **Correre** | con il quadretto | **+3** |

Regola nuova rispetto al manuale: quando è fissata va riportata in `Combattimento/` (deciso dall'autore).

### Sparare

- **Pistole in fondina al via**: prima azione con l'arma velocità **Estrarre 4**; poi **Colpire 2**; **Ricarica 5**. Revolver New Nambu, attacco su Lucidità (meno la Senmon Pistola se posseduta).
- **Si contano i colpi.** Sparati tutti i colpi del tamburo, si **ricarica** (azione con velocità 5).
- **Colpi multipli** come da manuale: 2 o 3 colpi nello scambio, un solo tiro, +2 o +3 alla somma che cala di 1 a ogni colpo, +2 di velocità a colpo.
- **Distanza**: **0** a distanza di tiro · **+1** più lontano · **+2** ancora più lontano, in quadretti dal PG che spara. Malus di distanza e di andatura si sommano.

## Punteggio — proposta

Per ogni sagoma conta **un solo colpo**: quello con lo **scarto maggiore** (Lucidità − tiro, dopo i malus) tra tutti i PG che l'hanno colpita. Sagoma mai colpita = 0.

**Punteggio squadra = 2 × (somma degli scarti migliori) − colpi sparati − tempo ÷ 7**

- *somma degli scarti migliori*: le sette sagome, uno scarto ciascuna.
- *colpi sparati*: tutti i colpi di tutti i PG, a segno o no.
- *tempo ÷ 7*: il momento in cui la gara è dichiarata conclusa, diviso 7, arrotondato per difetto (cioè quanti «giri di sagoma» sono passati).

Esempio: scarti migliori 3+2+4+1+2+3+2 = 17 → 34. Colpi sparati 16 → −16. Conclusa al momento 58 → 58 ÷ 7 = 8 → −8. **Punteggio 10.** La squadra di Minami ha il suo numero: chi fa di più vince.

Perché così: la precisione pesa il doppio, ogni colpo in più costa 1, ogni giro di sagoma costa 1. Tre numeri da segnare, un conto a fine gara.
