# BRIEF — il mini-caso giocabile di GENKAI

**La storia del caso ce l'avete già e non è in discussione.** Qui c'è solo quello che serve per
trasformarla in una cosa giocabile: che effetto deve fare, con che regole, e in che forma va
consegnata. Gli altri tre file della cartella sono il materiale di supporto.

---

## 1. Che cosa vogliamo ottenere

Una mini-avventura investigativa che si gioca da soli nel browser, quasi sempre **da telefono**, in
un quarto d'ora. È la vetrina del gioco sul sito: chi la apre **non ha mai giocato di ruolo in vita
sua** e deve capire, giocando, perché questo gioco è bello. **Non si scrive mai**: si clicca e basta.

L'effetto da ottenere è uno solo, e tutto il resto viene dietro:

> **Chi gioca deve avere la sensazione di aver capito lui, non di aver letto una spiegazione.**

Da qui discendono tre cose.

**Noi presentiamo la scena, poi si muove chi gioca.** La stanza si apre con una descrizione: cosa si
vede entrando, l'aria che tira, il disordine, la luce. Dentro il testo alcune **parole sono
cliccabili**. Chi gioca decide dove posare gli occhi.

**Il click mostra il fatto nudo, mai il significato.** «Appaiate, allineate, a un palmo dalla porta.
L'acqua le ha girate intorno senza spostarle.» Punto. Chi legge capisce da solo, e quello è il gusto
della cosa. Se scriviamo noi che cosa vuol dire, gli abbiamo tolto il gioco di mano.

**Quello che si è guardato serve dopo.** Finisce nel taccuino e diventa una carta da giocare
nell'interrogatorio finale. Chi ha guardato bene la casa inchioda il ragazzo; chi ha guardato poco ha
poche carte, lui regge, e la serata finisce peggio. Il caso si chiude comunque: cambia **come** ci si
arriva.

*(Perché lo stiamo rifacendo: nella versione attuale ogni scena chiedeva un tiro di dado, ma l'indizio
arrivava identico in ogni caso, già spiegato, e il taccuino si riempiva da solo senza servire a
niente. Il file `03_il_tono_di_oggi.txt` è quella versione: guardalo per il registro di voce e la
lunghezza dei paragrafi, non per la struttura.)*

**Se puoi navigare, provalo:** la versione attuale è online su **genkai.it/provalo**, e lo scontro
finale da solo su **genkai.it/provalo/scontro**. Giocarli è il modo più veloce per capire il ritmo,
quanto testo entra in una schermata di telefono e dove oggi il gioco si sgonfia. Il codice della
pagina non serve e non va toccato: l'incastro tecnico lo fa l'autore.

## 2. Le regole del gioco

Stanno in `01_le_regole_del_gioco.md`: è breve, leggilo, e **non inventarne altre**.

L'essenziale: si tirano due dadi a sei facce, e se la somma è **minore o uguale** all'attributo il
tiro riesce. **Meno si fa, meglio è.** Quanto si sta sotto è la qualità del risultato.

Due cose che valgono sempre in questo gioco e che vanno rispettate:

- **I dadi non chiudono nessuna porta.** Un indizio non si perde mai per un tiro sbagliato: quello che
  c'è da vedere, chi guarda lo vede. Il dado decide quanto costa vederlo e in che stato ci si arriva.
- Il **Ki** è quanto si regge, corpo e testa insieme. Scende durante il caso e non risale. Sotto tre
  si è oltre il limite: è il **Genkai**, che dà il nome al gioco.

I tiri di questo caso **non vanno decisi da voi**: li dà l'autore a parte. Dove pensate che ne serva
uno, scrivete una riga tra parentesi quadre e andate avanti. L'unico già deciso è quello dello
scontro finale: quando il ragazzo afferra il coltello si tira per non farsi cogliere di sorpresa, e
se il tiro fallisce attacca lui per primo.

Il personaggio con cui si gioca è in `02_il_personaggio.md`.

## 3. Regole di ferro sulla scrittura

1. **Mai spiegare un indizio.** Se in una frase su un indizio compaiono «quindi», «significa che»,
   «vuol dire che», quella frase è sbagliata. Si mostra, non si commenta.
2. **Non inventare fatti.** Vale la storia che avete già: niente indizi in più, niente personaggi
   nuovi, niente colpi di scena aggiunti.
3. **Niente nomi propri.** Sono «il nonno», «il nipote», «la vicina», «l'agente», «il medico». I nomi
   li decide l'autore dopo.
4. **Italiano semplice e concreto**, per chi non ha mai giocato. Seconda persona, presente: «entri»,
   «guardi», «senti». Nessun termine del manuale senza spiegarlo la prima volta.
   **Evitate gli accordi di genere** dove la lingua lo permette: «hai visto» sì, «sei entrata» no.
   Il genere del personaggio non è ancora deciso.
5. **Niente giapponese in vetrina.** Nessun kanji, nessuna parola giapponese salvo i nomi delle
   meccaniche (Ki, Genkai, Gou), spiegati una volta in italiano. Mai «keibō»: si dice manganello.
6. **Niente percentuali.** Le probabilità si dicono a parole: difficile, poco probabile, possibile,
   probabile, molto probabile.
7. **Testi corti.** Si legge sul telefono, di sera. Un paragrafo è tre o quattro righe, non dieci.
8. **Il codice del sito non si tocca.** La pagina esistente è un file solo che contiene stili, motore
   dei dadi, taccuino, stato del personaggio e l'aggancio al combattimento, ed è collaudata con banchi
   di prova automatici: una riscrittura fatta da fuori li manda a monte e non è verificabile.
   Consegnate **testi**, nel formato qui sotto.
   *Facoltativo, se vi è utile per far capire l'idea:* potete allegare **un prototipo separato**, un
   file HTML autonomo che non c'entra col sito, dove mostrate come immaginate l'esplorazione a click.
   Non finirà online: serve solo a far vedere il meccanismo. I testi restano comunque obbligatori.
9. **Lo scontro finale col coltello non si scrive**: esiste già e funziona.

## 4. Come va consegnato

Un unico file di testo, tre blocchi.

### A. Le stanze

Una sezione per ogni luogo esplorabile, e una per l'agente e il medico, che si possono interrogare.

```
## STANZA: <nome>

### Quando entri
<due o tre paragrafi: cosa si vede, l'aria che tira. Dentro il testo, segnate con
[[parentesi doppie]] le parole che diventano cliccabili.>

### Voci
- **[[parola]]**
  fatto: <che cosa si vede guardandola meglio. Da una a tre frasi. Solo fatti.>
  taccuino: <la riga che chi gioca può segnarsi: meno di novanta caratteri,
             scritta come la scriverebbe un investigatore sul suo taccuino>
```

### B. L'interrogatorio

Nessun dado: si spendono le carte del taccuino. Siccome non si può scrivere, **ogni carta va
accompagnata dalla frase pronta da dire**, che chi gioca sceglie con un click.

```
## INTERROGATORIO

### Apertura
<il ragazzo torna, come si presenta, come lo si vede>

### Scambio 1 — <di cosa si parla>
lui dice: «<la sua versione>»
  · se hai <nome della carta>:
      frase pronta: «<quello che chi gioca sceglie di dirgli>»
      lui risponde: «<come reagisce>»
      si chiude: <che cosa non può più sostenere>
  · se non hai nessuna carta utile:
      <come scivola via, e cosa ci guadagna lui>
```

Quattro o cinque scambi, in crescendo, con la contestazione più forte per ultima. Poi lui scatta
verso il lavello: lì il vostro lavoro finisce.

### C. La chiusura

Due o tre finali diversi secondo quante contestazioni hanno tenuto: **confessione piena**,
**mezza ammissione**, **solo un fermo** con la sensazione di averlo avuto e lasciato andare.

## 5. Se qualcosa non torna

Scrivetelo in fondo, in una nota. Non aggiustatelo da soli.

## 6. Le immagini che esistono già

Porta d'ingresso, bagno, cucina, pantofole, pianerottolo, camera, soglia, coltello, manette.
Non progettatene di nuove: se un testo ne chiede una che non c'è, segnalatelo e basta.
