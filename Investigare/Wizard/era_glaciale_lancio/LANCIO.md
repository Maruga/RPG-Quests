# «L'era glaciale del lavoro» — materiale di lancio

Caso costruito nel wizard (id `C3C15FF7-AFCE-4299-A49C-53B367CD29EA`).
Serve a presentare l'avventura a un gruppo di giocatori su WhatsApp.

Ordine d'invio: prima **l'immagine del giornale** (mandata come *documento*, non come
foto — WhatsApp comprime e il titolo diventa illeggibile), poi il testo qui sotto.

---

## 1. Il testo per WhatsApp

```
Il giornale l'avete letto. Da stamattina quel fascicolo è sul vostro tavolo.

Siete ispettori del distretto di Shimogyō. Non eroi d'azione: gente in giacca
che bussa alle porte, legge fascicoli, aspetta che qualcuno trovi il coraggio
di parlare. A Kyoto quasi nessuno vi mentirà in faccia — semplicemente non vi
dirà, e vi chiuderà la porta con un inchino.

Gli indizi ci sono sempre: se cercate nel posto giusto, li trovate. I dadi non
vi sbarrano nessuna porta — dicono soltanto quanto vi costa attraversarla, e
quanto ne resta di voi dall'altra parte.

Quando avrete un nome, sarete voi a decidere se chiamare il Reparto Mobile.
Loro entrano, voi dirigete — dal posto o dall'ufficio. Il comando è vostro:
da quel momento, come va a finire dipende da voi.

*Sistema:* GENKAI 限界 — Starter Kit
*Regole:* due dadi, si impara in dieci minuti
*Tono:* investigativo, noir, serio alla giapponese
*Trigger:* omicidio, stalking e minacce a una minorenne di 19 anni, droga
*Schede:* personaggi già pronti

📅 [data] · 🕗 [ora] · 📍 [dove]

Il limite del titolo non è quello dell'assassino. È il vostro.
```

Versione più asciutta del trigger: `*Trigger:* violenza, stalking, droga`

Su WhatsApp gli asterischi diventano grassetto.

---

## 2. Il prompt per GPT — immagine del giornale

Il testo va dato **scritto**: al primo tentativo, lasciando libero il corpo dell'articolo,
il modello si è inventato tutto (vittima «Yamamoto Takeshi», corpo trovato alle 5 del
mattino, locale «bar ALLEY B1»). La grafica invece era giusta: testata, foto, pubblicità
in fondo.

```
Crea l'immagine fotorealistica di una pagina di quotidiano giapponese del 1998,
fotografata dall'alto su un tavolo di legno chiaro, luce naturale, carta
leggermente ingiallita con una piega naturale.

REGOLA ASSOLUTA: riproduci ESATTAMENTE il testo che ti do qui sotto, parola per
parola. NON inventare nomi, frasi o notizie. Ogni colonna deve essere PIENA di
testo fino in fondo, tutte della stessa altezza: NESSUNO spazio bianco tra i
paragrafi, nessuna colonna che finisce a metà.

--- TESTATA ---
洛陽新聞  (grande, in alto, al centro)
RAKUYO SHINBUN — Cronaca di Kyoto
Lunedì 25 maggio 1998 — anno XLI, n. 3.812 — ¥120

--- TITOLO PRINCIPALE (grande, due righe) ---
Studente di 21 anni ucciso dietro il bancone in un locale di Shimogyō

--- SOTTOTITOLO ---
Sabato sera, quattro o cinque ragazzi e una lite di pochi istanti. Poi le moto
nel buio. La polizia: «Nessuna pista esclusa»

--- FOTOGRAFIA (al centro, bianco e nero sgranata, stampa di giornale) ---
La serranda metallica abbassata di un piccolo locale in un vicolo stretto di
notte appena passata; sulla soglia un mazzo di fiori nel cellophane e una
lattina di caffè. Nessuna persona. Nessuna insegna leggibile.
Didascalia in corsivo: «Fiori e una lattina di caffè davanti allo SnakUp, ieri mattina»

--- ARTICOLO PRINCIPALE (tre colonne sotto il titolo) ---
Kyoto, 24 maggio — Aveva ventun anni e studiava medicina. Yuta Shimada è morto
sabato sera nello «SnakUp», un piccolo locale di Shimogyō-ku dove faceva le
serate per pagarsi l'università.
Erano circa le nove e un quarto. In sala non c'erano avventori: da quelle parti
si comincia dopo le dieci. C'erano il ragazzo, il titolare e una dipendente.
È allora che sarebbe entrato un gruppo di giovani — quattro o cinque, secondo
il proprietario — con una scusa: chiedevano da bere, dicevano di cercare
qualcuno. «Poi hanno cominciato a prendersela col ragazzo», racconta il
titolare, Kazuhiko Ishida. «I toni sono saliti. È durato un attimo: una
confusione, un colpo, e Shimada era a terra dietro il bancone. Quando ho alzato
la testa stavano già uscendo. Ho sentito le moto partire.»
Riconoscerli, dice, non saprebbe: «Era buio, è successo in fretta».
La dipendente in servizio, Hiroko Chiba, si trovava nel retro. «Ho sentito voci
giovani, sguaiate. Poi un colpo, sordo.» È rimasta accanto al ragazzo mentre il
titolare chiamava il 110. Per il giovane non c'era già più nulla da fare.
Il distretto di Shimogyō non rilascia dettagli. Nel quartiere, da mesi, si
segnalano nelle ore notturne passaggi rumorosi di gruppi in motocicletta.

--- COLONNA DI DESTRA, quattro brevi con titoletto in neretto ---
INDONESIA — Dopo trentadue anni Suharto lascia il potere. Giura il vice
Habibie. Preoccupate le imprese giapponesi con stabilimenti nell'arcipelago.

NUOVA DELHI — Tokyo congela i nuovi aiuti all'India dopo i test atomici
dell'undici e del tredici maggio. Cresce il timore di una risposta pakistana.

LAVORO — Primavera senza offerte per i neolaureati: le assunzioni previste
calano ancora, e per il secondo anno le matricole escono dall'università senza
un posto. «Un'era glaciale», la chiamano negli uffici di collocamento.

VERSO LA FRANCIA — Il Giappone al suo primo Mondiale: la nazionale parte
questa settimana. Esordio il quattordici giugno contro l'Argentina.

--- FONDO PAGINA: tre riquadri pubblicitari squadrati anni '90 ---
1) SAKURA DENKI — Videoregistratori, condizionatori, telefoni cordless.
   Rate a 12 mesi senza interessi. Karasuma-dōri sud · Tel. 075-341-2288
   (con disegnini a tratto di un frigorifero e un televisore)
2) RYOKUCHA MARUYAMA — dal 1921. Sencha di prima raccolta, confezioni regalo
   per l'estate. Nakagyō-ku, Sanjō-dōri · Tel. 075-256-0714
   (con disegnino a tratto di una casa da tè)
3) IL TEMPO — Oggi nuvoloso. Da mercoledì pioggia. Massime 24°C.
   26 mar nuvoloso 24/17 · 27 mer pioggia 20/16 · 28 gio variabile 22/15

STILE: stampa tipografica autentica, inchiostro nero che traspare appena dal
retro, filetti sottili tra le colonne, nessun colore. Aspetto vissuto, NON
moderno, NON digitale. Formato verticale da pagina di giornale.
```

Se sbaglia ancora il testo piccolo: *«stessa pagina identica, correggi solo il testo
delle colonne: deve essere quello che ti ho dato»*. In alternativa la pagina HTML è
già nel wizard (handout «Giornale del 24/05/1998») e basta inserirci la sola fotografia.

### Notizie di contorno — verificate
- **Suharto** si dimette il **21 maggio 1998** dopo 32 anni, giura Habibie.
- **India** test atomici **11 e 13 maggio 1998**; il Giappone congela gli aiuti.
  Il Pakistan risponderà il **28 maggio** — quindi il 25 la notizia è l'attesa.
- **Disoccupazione giapponese** verso il record storico del **4,1%** nel 1998
  (la recessione sarà dichiarata ufficialmente solo il **12 giugno**: non anticiparla).
- **Mondiale di Francia**: prima partecipazione del Giappone, torneo dal 10 giugno.

### Scelte fatte
- **Niente età per Ishida** nell'articolo: in anagrafica ha 48 anni, il primo handout
  diceva «sessantenne». Finché non decide l'utente, non si scrive.
- Pubblicità con i nomi del **suo** handout originale (Sakura Denki, Ryokucha Maruyama):
  quelli usciti da GPT erano inventati e uno si chiamava «Nakamura», cognome di un PG.

---

## 3. Controllo dell'avventura — cosa è emerso (2026-08-11)

**L'impianto regge**: il caso si risolve per più strade convergenti (autopsia → Ishida →
Chiba → Yumiko → Noriko → kōban → tabulato del pocket bell). Tutti i 14 allegati e i 6
ritratti esistono su disco. Il tabulato è il pezzo migliore: due voci sullo stesso
cercapersone, quella tenera dallo SnakUp e da Nakagyō, quella che minaccia dalle cabine
di Kamigyō e Kita.

### Contraddizioni da correggere
1. **Il «capo» sbagliato** — evento 10/05/1998 alla Sede Banda: «Tanaka Takayuki avvisa
   *il capo Suzuki Nobuyuki*». Suzuki è il capo del **kōban** (polizia, 46 anni); il capo
   della banda è **Matsui Kenta**. Anche i partecipanti dell'evento puntano a Suzuki.
2. **Il padre registrato come madre** — Shimada Yasuhiro compare come «Madre» nella
   famiglia e come «madre e figlio» nelle relazioni, ma è **il padre** (giornale + scheda).
   Di conseguenza **la madre non esiste nel cast**.
3. **Due giornali diversi** — il calendario cita «Kyoto Shinbun, 24 maggio, pagina 3»,
   l'handout è «Rakuyō Shinbun, lunedì 25 maggio».
4. **Titolo del tabulato** — «dal 1 Febbraio al **23 aprile**», ma dentro il periodo è
   01/02 → **23/05**, e i messaggi decisivi sono quelli di maggio.
5. **Età di Ishida** — 48 in anagrafica, «sessantenne» nel giornale.
6. **Titolo handout giornale** «del 24/05», contenuto datato lunedì 25 maggio (corretto:
   delitto sabato 23, fiori domenica 24, articolo lunedì 25).
7. **Ambientazione** impostata su «kyoto-1997», eventi datati 1998.

### Buchi da riempire
- **Matsui Kenta non ha deposizione** (è il colpevole, lo interrogheranno).
- **Sei personaggi senza scheda**, due pesanti: **Suzuki Nobuyuki** (capo kōban, fonte di
  *entrambe* le informazioni essenziali) e **Sugimoto Hideki** (braccio destro). Poi
  Tanaka Takayuki, Yoshida Yukio, Aoki Hideki, e la vittima.
- **«Foto Polizia del Capo Banda» è vuoto** — zero testo, nessun allegato. È il perno del
  riconoscimento fotografico: senza, Ishida e Chiba non hanno cosa riconoscere.
- **«Giornale del 25/05/1998» vuoto** (doveva spingere la pista del regolamento fra bande).
- **Deposizione di Shimada Yumiko vuota** ma marcata come handout: stamperà un foglio bianco.
- **Calendario con un solo giorno.**
- **Fonte in tensione**: l'ubicazione del covo ha come fonti il kōban e **Watanabe Noriko**,
  ma la sua scheda dice «non conosce il covo, sa la zona ma non di più».

### Da tenere presente per la serata
Lo **Starter Kit non ha il combattimento**, mentre la scheda di Matsui dice che preferisce
morire piuttosto che arrendersi. Se la serata finisce lì serve il modulo dello Scontro del
gioco completo, oppure si chiude in narrativa.
