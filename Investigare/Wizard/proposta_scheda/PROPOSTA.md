# Scheda investigatore e scheda PNG — proposta

Prove visibili in questa cartella: `scheda-pg.html` (4 facciate) · `scheda-png.html` (2 facciate) ·
`scheda.css` (foglio di stile unico, condiviso) · i due PDF già stampati.
Dati veri: Yamamoto Kenji per il PG, Gonda Susumu per il PNG.

---

## Su cosa è costruita

Analisi delle schede ufficiali di **D&D 5e (2014 e 2024), Call of Cthulhu 7e, Vampiri V5,
Pathfinder 2e, Cyberpunk RED, Delta Green, Mothership**, più l'articolo di *Explorers Design*
(Clayton Notestine) sui principi di progettazione.

**Come dividono le pagine.** Un criterio solo, che si ripete ovunque: la **prima facciata è quello che
tocchi tirando i dadi**, le facciate successive sono quello che consulti di rado. Call of Cthulhu,
V5, Cyberpunk RED e Delta Green stanno in 2 facciate; D&D in 3; Pathfinder 2e in 4. Identità sempre
in alto, valori base prima dei derivati, **combattimento tenuto tutto insieme** (ferite, protezione,
armi e morte vicini, mai sparsi).

**I tre errori delle schede fatte in casa**, che le pubblicate evitano:
mettere la narrativa prima dei numeri operativi; spargere il combattimento in punti diversi del
foglio; decorare troppo lasciando campi minuscoli e gerarchia debole.

**Il principio che ha ribaltato la prima ipotesi**: il difetto numero uno di una scheda è
**il campo che va cancellato e riscritto di continuo**. Un valore che cambia dieci volte a sessione
non va scritto in una casella: va **segnato e cancellato**, con caselline. È il motivo per cui V5
traccia salute e volontà a quadretti e non a numeri.

---

## La scheda PG — 2 fogli, 4 facciate

### Facciata 1 · IL TAVOLO
Tutto ciò che serve mentre si tira, niente che serva a leggere.

- **Testata**: foto tessera, nome e kanji, grado, ruolo, età, anni di servizio, distretto
- **Attributi** (i sei, in fila): valore di scheda grande, la riga che spiega a cosa serve, e accanto
  **le caselline dei punti perdibili — esattamente `valore − 4`**, perché sotto 4 non si scende.
  Chi ha 4 legge «al minimo» e non ha caselle: è vero e si vede a colpo d'occhio
- **Ki**: massimo stampato grande + **una casella per punto**, raggruppate a tre a tre, con le
  **prime tre in rosso** = zona Genkai. Il crollo lo vedi arrivare invece di scoprirlo
- **Nasake** □ (una sola) · **Satori** □ (una a sessione) · **Soroban** □□□□□ con il 5 stampato
- **Gou**: nome, kanji, attributo, effetto in una riga, e la **scaletta dei costi già stampata**
  (`1° □3 · 2° □6 · 3° □12`). Zero moltiplicazioni sotto pressione
- **Senmon**: grado, attributo chiave, malus, e la **barra degli usi** con la soglia stampata
- **Lo scontro**: tabella armi (arma · attributo · velocità estrazione · velocità uso · ricarica ·
  danno · colpi a caselle), **Assorbe** in evidenza con i valori di copertura, i tre attributi con
  cui ci si difende, e **il promemoria dello scambio in cinque righe**

### Facciata 2 · CHI SEI
Storia, ritratto grande, aspetto, tatemae e honne, frase tipica, sotto pressione, debolezza, tratti.

### Facciata 3 · LE PERSONE
Kage (il problema + le persone coinvolte, con foto), Enja (con **En** in evidenza, come si sono
conosciuti, cosa può dare, cosa vuole in cambio, come si contatta), i rapporti nella squadra.

### Facciata 4 · IL DIARIO
Shugyō (punti guadagnati a caselle, tabella dei costi, registro acquisti), equipaggiamento fisso,
**spazio bianco vero** per oggetti e munizioni, spazio libero per gli appunti del caso.

Le facciate 2–4 **si accorciano da sole**: i blocchi vuoti spariscono e la scheda stampa meno pagine.

---

## La scheda PNG — 1 facciata, 2 per i ricorrenti

Stessa impaginazione, meno sezioni, con in testa l'avviso che è un **documento del GM**.

**Facciata 1 · AL TAVOLO** — foto e identità, tatemae e honne affiancati, attributi, Ki (con la nota
di cosa fa quando cede), il minimo di combattimento, Gou e Senmon se li ha, e la **tabella dell'En
verso ciascun PG** con il perché in chiaro.

**Facciata 2 · STORIA E SEGRETO** — solo per i ricorrenti: biografia, il problema, le persone che
contano, sotto pressione / dove cede / segni particolari, e lo spazio per gli appunti di sessione.
Le comparse si fermano alla prima facciata.

---

## Due scelte fuori dalla norma, dichiarate

**Il promemoria dello scontro.** Nessuna scheda pubblicata ne stampa abbastanza per giocare senza
manuale. Qui c'è comunque, in cinque righe: in GENKAI lo scontro è **raro**, e proprio perché è raro
nessuno ricorda l'ordine quando capita.

**L'orientamento.** I designer consigliano la scheda orizzontale (più colonne, meno tavolo occupato).
Qui è **verticale**, perché tre facciate su quattro sono testo e foto e perché tutto il resto del
materiale — libretto, handout — è verticale. Si può cambiare: si perde leggibilità sui testi lunghi.

---

## Personalizzazione

Tre temi (**carta chiara**, **fascicolo riservato** scuro, **fotocopia** in bianco e nero) e due
famiglie di caratteri, con anteprima dal vivo. Tutto passa da variabili CSS in cima a `scheda.css`:
cambiare tema è cambiare sei valori, non riscrivere il foglio.

Niente libertà totale sui colori: si producono accostamenti illeggibili in due clic.

---

## Cosa resta da decidere

Le schede oggi si producono in **due modi**: lo script Word `pg/genera_schede_pg.py` e la stampa
HTML del wizard. Mantenerne due significa vederle divergere. La proposta è **una sola scheda in HTML
generata dal wizard**, da cui escono anche le cinque pregenerate, mandando in pensione il Word.

`pg/` è però **territorio della sessione REGOLE**: se la decisione è questa, va scritta in
`Investigare/REGISTRO_MODIFICHE.md` prima di toccare qualsiasi cosa.
