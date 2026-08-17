# «Bakuon — Tanto Rumore per Nulla» — materiale di lancio

Caso costruito nel wizard (id `C3C15FF7-AFCE-4299-A49C-53B367CD29EA`).
Serve a presentare l'avventura a un gruppo di giocatori su WhatsApp.
*(Fino al 2026-08-16 l'avventura si chiamava «L'era glaciale del lavoro».)*

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
Crea l'immagine fotorealistica di una pagina di quotidiano giapponese del 1997,
fotografata dall'alto su un tavolo di legno chiaro, luce naturale, carta
leggermente ingiallita con una piega naturale.

REGOLA ASSOLUTA: riproduci ESATTAMENTE il testo che ti do qui sotto, parola per
parola. NON inventare nomi, frasi o notizie. Ogni colonna deve essere PIENA di
testo fino in fondo, tutte della stessa altezza: NESSUNO spazio bianco tra i
paragrafi, nessuna colonna che finisce a metà.

--- TESTATA ---
洛陽新聞  (grande, in alto, al centro)
RAKUYO SHINBUN — Cronaca di Kyoto
Lunedì 26 maggio 1997 — anno XLI, n. 3.812 — ¥120

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
Kyoto, 25 maggio — Aveva ventun anni e studiava medicina. Yuta Shimada è morto
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
ZAIRE — Kabila entra a Kinshasa: dopo trentadue anni finisce l'era
Mobutu, in fuga verso il Marocco. Il paese cambia nome: Repubblica
Democratica del Congo.

NEW YORK — Il calcolatore Deep Blue batte Kasparov nella partita
decisiva: è la prima volta che una macchina piega il campione del mondo.
«Ho ancora molto da imparare», ammette il russo.

HONG KONG — Cinque settimane al passaggio di sovranità: accelerano i
preparativi per la notte del 1° luglio. Le imprese giapponesi della
colonia osservano con prudenza.

CONSUMI — Due mesi dopo l'aumento dell'imposta al 5%, le vendite al
dettaglio restano fredde. Il governo ostenta fiducia in una ripresa
entro l'estate.

--- FONDO PAGINA: tre riquadri pubblicitari squadrati anni '90 ---
1) SAKURA DENKI — Videoregistratori, condizionatori, telefoni cordless.
   Rate a 12 mesi senza interessi. Karasuma-dōri sud · Tel. 075-341-2288
   (con disegnini a tratto di un frigorifero e un televisore)
2) RYOKUCHA MARUYAMA — dal 1921. Sencha di prima raccolta, confezioni regalo
   per l'estate. Nakagyō-ku, Sanjō-dōri · Tel. 075-256-0714
   (con disegnino a tratto di una casa da tè)
3) IL TEMPO — Oggi nuvoloso. Da mercoledì pioggia. Massime 24°C.
   27 mar nuvoloso 24/17 · 28 mer pioggia 20/16 · 29 gio variabile 22/15

STILE: stampa tipografica autentica, inchiostro nero che traspare appena dal
retro, filetti sottili tra le colonne, nessun colore. Aspetto vissuto, NON
moderno, NON digitale. Formato verticale da pagina di giornale.
```

Se sbaglia ancora il testo piccolo: *«stessa pagina identica, correggi solo il testo
delle colonne: deve essere quello che ti ho dato»*. In alternativa la pagina HTML è
già nel wizard (handout «Giornale del 25/05/1997») e basta inserirci la sola fotografia.

### Notizie di contorno — verificate (maggio 1997)
- **Zaire**: Kabila entra a Kinshasa il **17 maggio 1997**, Mobutu (al potere da 32 anni)
  fugge; il paese diventa Repubblica Democratica del Congo.
- **Deep Blue** batte Kasparov **l'11 maggio 1997** (3,5–2,5): prima sconfitta in match
  di un campione del mondo contro una macchina.
- **Hong Kong**: passaggio alla Cina il **1° luglio 1997** — a fine maggio è conto alla rovescia.
- **Imposta sui consumi** al 5% dal **1° aprile 1997**: primavera di consumi fiacchi
  (la crisi asiatica scoppia a luglio: NON anticiparla).
- Il caso di Kobe (Sakakibara) esplode la **mattina del 27 maggio**: i tre giornali del
  caso escono prima — nessuna interferenza, non citarlo.
- NIENTE Suharto, test indiani o Mondiale: sono del 1998.

### Scelte fatte
- **Niente età per Ishida** nell'articolo: in anagrafica ha 48 anni, il primo handout
  diceva «sessantenne». Finché non decide l'utente, non si scrive.
- Pubblicità con i nomi del **suo** handout originale (Sakura Denki, Ryokucha Maruyama):
  quelli usciti da GPT erano inventati e uno si chiamava «Nakamura», cognome di un PG.

---

## Per la serata

- La scheda di Matsui dice che **preferisce morire piuttosto che arrendersi**: se si arriva
  alle mani, in cartella c'è `SCONTRO_FOGLIO_TAVOLO.docx` — pistola, manganello, pugni
  e coperture in una pagina (lo Starter Kit il combattimento non ce l'ha).
- Il controllo completo dell'avventura (11-13 agosto: contraddizioni, decisioni, buchi) è in
  `storico/Controllo_avventura_2026-08-11.md`; le cose ancora aperte sono in `MEMORY.md`
  e il wizard le segnala alla schermata 15.
