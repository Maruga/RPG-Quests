# MEMORY — Avventura Bakuon (Tanto Rumore per Nulla)

## Handout senza avvisi stampati — 2026-09-18, ultima decisione utente

- Tolti gli avvisi rossi per il master da tutti i 13 handout, anche nelle
  anteprime e nella stampa dal wizard. Le precedenti istruzioni che richiedevano
  gli avvisi in fondo ai documenti sono superate.
- Conservati i metadati `avvisoGM` e `depAvvisoGM`: tempi, condizioni di consegna
  e note riservate restano consultabili in `handout/_Indice.md` e nelle schede GM.
- Rimossi i riquadri incorporati nei cinque documenti alla fonte; il renderer del
  wizard e `gestione_handout.py` non aggiungono più note alle risposte e ai verbali.
- Backup e diff: `storico/handout_senza_avvisi_2026-09-18/`.

## Immagine capo banda in moto rimossa — 2026-09-18

- Su richiesta dell'utente, `Immagini/Capo Banda in moto.png` è stata tolta dai
  materiali correnti e conservata in `storico/immagine_rimossa_2026-09-18/`.
- Nessun riferimento nel caso del wizard: era un file residuo nella cartella
  degli allegati. L'export ora lo esclude, così non ricompare. L'originale nella
  cartella del wizard resta conservato; nessun handout richiede modifiche.

## Ultimi punti di coerenza — 2026-09-17, decisione utente

- Moto nella descrizione del covo spostate all'interno, vicino alla saracinesca,
  come nella mappa. Corretta la frase tronca di Noriko e il nome Pocket Bell.
- L'arma dell'omicidio è un **tonfa**, usato da Matsui con un solo colpo alla testa
  da dietro. Precisato nella verità GM e nelle informazioni dei testimoni che
  collaborano. L'autopsia descrive compatibilità con un manganello, senza identificarlo
  univocamente e senza dedurre la superficie dell'arma dai margini della ferita.
- **Yuta non ha nessuna frequentazione con la Yakuza**: tutte le ricerche, domande,
  verifiche di archivi e contatti danno esito negativo. Le voci del giornale sono
  false; nessun legame nascosto. Precisato anche nell'avviso rosso del giornale del 28.
- Tempi di consegna, date e mappa conservati. Backup e diff:
  `storico/coerenza_finale_2026-09-17/`. Correzioni autorizzate applicate alla fonte
  e riesportate in schede, storia, handout e dossier.

## Pavimenti distinti e stampa a filo — 2026-09-16, stato attuale

- L'utente vuole **solo l'immagine**: la stampante stampa A3 a filo. Usare
  `Immagini/Planimetria con esterno.png`, in proporzione A3 orizzontale e senza
  margini di stampa aggiunti. Non riproporre il PDF con margini.
- Interno del capannone in cemento industriale grigio, più scuro e uniforme;
  esterno chiaro, caldo e screpolato. Conservati bagno piastrellato, soppalco,
  finestre, disposizione e spazio superiore. Modifica con imagegen integrato.
- Aggiornato anche il PNG alla fonte; il vecchio PDF è stato tolto dagli allegati
  correnti e conservato in `storico/mappa_pavimenti_2026-09-16/precedente_con_margini.pdf`.
  L'export non ripubblica i PDF non più collegati al caso. Prompt e PNG precedente
  sono nella stessa cartella storica. Le sezioni precedenti sul PDF A3 sono superate.

## Mappa A3, finestre e soppalco — 2026-09-16, ultima revisione

- Richiesta utente: preservare la mappa e intervenire solo su formato A3, spazio
  superiore, finestra del bagno, finestra dell'ufficio e struttura del soppalco.
- Aggiornata `Immagini/Planimetria con esterno.png`: perimetro nord interamente
  visibile e più spazio sul retro, finestrella del bagno, una sola finestra più
  grande nell'angolo del capo; soppalco disegnato con piano, parapetto, scala e
  quattro pilastri di sostegno. Disposizione generale conservata.
- **Per stampare usare `Immagini/Planimetria combattimento A3.pdf`**: una pagina
  A3 orizzontale esatta, 420 × 297 mm, margini di almeno 5 mm, nessun ritaglio o
  deformazione. `stampa_planimetria_A3.py` lo rigenera dal PNG senza modificarne i pixel.
- PNG aggiornato anche nella fonte e PDF aggiunto agli allegati con `uso: scena`;
  il PDF è il file da aprire per la stampa A3. L'indice degli handout lo collega.
  Entrambi restano riservati al finale. Il PDF non si aggiunge ai documenti del kōban.
- Backup, prompt e anteprima stampata: `storico/mappa_A3_2026-09-16/`.

## Refusi e planimetria con esterno — 2026-09-16, seguito

- Corretti alla fonte i due refusi autorizzati: **Yumiko è la sorella maggiore**
  (23 anni; Yuta 21); Noriko frequenta **lo stesso complesso scolastico, non la stessa
  classe**. Storia, schede e dossier rigenerati.
- Mappa attuale del finale: **`Immagini/Planimetria con esterno.png`**, collegata anche
  negli allegati del caso come materiale `uso: scena`. L'originale
  `Immagini/Planimetria.png` resta conservato per il dettaglio del solo interno.
- Nuova versione realizzata con imagegen integrato, mantenendo la disposizione
  interna e aggiungendo cortile di carico, cancello scorrevole sulla strada,
  guardiola, tettoia e passaggi esterni fino all'uscita di servizio sul retro.
  Nessuna griglia o scala metrica aggiunta. Continua a mostrarsi SOLO al finale.
- Prompt, prima variante e backup del collegamento: `storico/mappa_esterno_2026-09-16/`.
  Backup dei due refusi: `storico/refusi_2026-09-16/`.

## Revisione date e consegne — 2026-09-16 (ultima decisione utente)

- L'utente ha autorizzato esplicitamente la correzione degli handout, delle date e
  dei tempi, superando per questa revisione la precedente regola di non modificarli.
- Tabulato: conservate le **31 chiamate complete originali**, tolta la riga tronca
  del 22/05 e corretto il totale da 36 a 31. Nessuna chiamata inventata. Periodo
  01/02–24/05/1997; richiesta ed evasione sono campi da compilare: consegna **+24 ore
  dall'inoltro autorizzato**, non più un 28 maggio fisso. Non blocca la soluzione.
- Giorno 1 = **domenica 25/05/1997**; giornali **lunedì 26, martedì 27, mercoledì 28**.
  Giornale del 27 facoltativo; quello del 28 solo con caso aperto e nessun fermo.
  Autopsia d'ufficio **26/05 ore 09:00**, referto **26/05 ore 15:00**; decesso
  **24/05 ore 21:15 circa** (banda arrivata alle 21:14 circa). Eliminata la frase
  ambigua sulle 12–18 ore; gli esami tossicologici sono esplicitamente preliminari.
- Noriko apprende la notizia dal giornale **lunedì 26**, salvo comunicazione anticipata
  dei PG il 25: in quel caso colloquio immediato e verbale della scena effettiva,
  senza consegnare il testo prestampato che cita il giornale. Non bloccare il PNG al 26.
- Kōban: informazioni già note, **entro 1 ora a voce / 2 ore copia scritta** dalla
  richiesta pertinente; ubicazione su richiesta specifica, anche contestuale alle moto.
- **Mappa e tre immagini del covo SOLO al finale**, per immersione e combattimento.
  Conservate come allegati del master con `uso: scena`, escluse dalla stampa della
  risposta del kōban. **Entrambe le immagini del cercapersone si tengono**: esempi
  illustrativi da mostrare sul Surface se richiesti, non nuovi indizi dai display.
- Tutti i **13 documenti** hanno un avviso rosso in fondo: cinque autonomi, due
  risposte degli enti, sei deposizioni. Il wizard legge i campi opzionali `avvisoGM`
  sulle fonti e `depAvvisoGM` sulle schede; i cinque autonomi hanno l'avviso nel corpo
  HTML. `gestione_handout.py` rende gli stessi avvisi nelle copie locali. L'export
  include ora anche enti e deposizioni, con indice completo; il dossier resta senza
  duplicati delle schede PNG nel Markdown e completo nel DOCX.
- Fonte aggiornata nel wizard, poi riesportata; allineato anche il lancio.
  Backup e diff: `storico/revisione_2026-09-16/`. Il controllo del 16 settembre in
  storico descrive lo stato PRIMA di queste correzioni; non è una lista attuale di mancanze.

## Stato (2026-08-16)

- Cartella creata esportando il caso dal wizard (`esporta_da_wizard.py`): 12 PNG, 5 Location,
  5 handout HTML, 12 token, 8 immagini, Storia Completa, dossier GM (16 pp), foglio scontro, token A4.
- Rinominata da «L'era glaciale del lavoro» → «Tanto Rumore» → **«Bakuon — Tanto Rumore per Nulla»**
  (2026-08-16, decisioni utente: bakuon 爆音 = il rombo delle moto; il sottotitolo è l'eco shakespeariana).
  Titolo aggiornato anche nel DB del wizard (solo colonna Titolo; backup pre-modifica in scratchpad sessione).
- I 12 nomi del cast registrati in `../GENKAI_Registro_Nomi.md` — controllo omonimie: nessuna piena.
- DA GIOCARE con un gruppo esterno (lancio WhatsApp in `LANCIO.md`).

## Anno di gioco: 1997 — DEFINITIVO (2026-08-16)

La giornata dei cambi d'anno: 1998 → 1987 → (1984 iniziato) → **1997, scelta finale**.
Ripristinato il caso originale dal backup pre-modifiche e applicato 1998→1997 con **+1 giorno**
per salvare i giorni della settimana: fatto **sabato 24 maggio 1997**, giornali 25-27/5,
primo incontro 25/4, «il dieci maggio, un sabato» (Noriko), tabulato 1/2–24/5 righe +1.
Il 1997 chiude da solo i problemi degli anni precedenti: **pocket bell coi codici goroawase
di nuovo validi e perfetti d'epoca** (tabulato originale ripristinato), età dei PG pregenerati
giuste, etichetta «kyoto-1997» esatta, moda anni '90 al suo posto. Nel LANCIO notizie vere
del maggio 1997 (Kabila a Kinshasa 17/5, Deep Blue–Kasparov 11/5, countdown Hong Kong,
consumi post-IVA 5%; nota: il caso Kobe/Sakakibara esplode il 27/5 mattina, dopo i tre
giornali — non citarlo). Backup della via del ritorno: `app.db.bak-pre1997-20260816` (stato
1984), `app.db.bak-anno1987-20260816` (originale 1998). *Il Giudice* è aprile 1997: casi
consecutivi della stessa squadra.

## Pre-serata 2026-09-01 — FATTO e DECISO (si gioca stasera)

- **Aoki Hideki COMPILATO** nel wizard (cosa sa/comportamento/stats + deposizione 📄): sa di Noriko,
  dell'ex «con le moto» (senza nome), del pedinamento; spiega DA DOVE chiamava Yuta (SnakUp/cabina
  Sanjō) → i PG attribuiscono le due voci del tabulato. Backup DB: `app.db.bak-pre-aoki-20260901`.
- **Verificato tabulato**: i codici NON sono stati tolti — cifre + traduzione in chiaro, nessuna
  versione alternativa. REGOLA UTENTE: handout esistenti NON si modificano, i nuovi si adattano.
- **2 risposte del Kōban di Kamigyō SCRITTE** (fonti richiesta-ente marcate handout, testo nel campo
  `versione`): «Fascicolo CBX400F» (moto→banda di Matsui, foto di polizia = ritratto-pogta8z allegato,
  fermo di Sugimoto 15/5 citato, ubicazione NON svelata → rimanda a richiesta specifica) e
  «Magazzino — Kōban di Kamigyō» (capannone Murasakino con planimetria + 3 foto zone già allegate).
  La vecchia nota di consegna dell'utente è preservata come «GM:» nel testo-traccia Honda.
- **Briefing d'apertura del capo** (2026-09-01): testo FISSO dentro `genera_dossier.py` (sezione 訓示
  in testa al dossier, prima de «Il caso in breve»). `BRIEFING_APERTURA.md` è stato CANCELLATO su
  decisione utente: al suo posto c'è **`DOSSIER_GM.md`** — l'intero dossier in markdown per
  **GMDASHBOARD** (lo strumento da tavolo dell'utente legge i .md). Lo genera lo stesso
  `genera_dossier.py` in coda, convertendo il DOCX appena salvato: una rigenerazione = DOCX e MD
  sempre allineati. Mai editare DOSSIER_GM.md a mano.
- **DECISIONI UTENTE (chiuse, non riproporre)**: deposizione di Matsui Kenta NON SERVE («preso,
  arrestato, poi fatti di altri poliziotti»); le 4 schede PNG restanti (Sugimoto, Yoshida, Tanaka,
  Suzuki) NON SERVONO — del capo kōban basta la risposta, non la scheda. L'export continuerà a
  segnalarle «senza sostanza»: è voluto.

## Da fare prima di giocare

1. Compilare nel wizard le 5 schede vuote: **Aoki Hideki** (urgente — le deposizioni di madre e
   sorella puntano a lui), Sugimoto, Yoshida, Tanaka Takayuki, Suzuki Nobuyuki
2. Scrivere la **deposizione di Matsui Kenta** (marcata handout, testo mancante)
3. Dopo ogni modifica nel wizard: `python esporta_da_wizard.py` per riallineare la cartella
4. In `LANCIO.md` restano segnalate le correzioni della vecchia revisione (7 contraddizioni, 6 buchi):
   verificarne lo stato nel wizard

## Contesto da tavolo (2026-09-01, per GMDASHBOARD)

- **`contesto_tavolo.py`** = FONTE UNICA di: RUOLI in chiaro del cast (id wizard → «LA MADRE della
  vittima», «IL BRACCIO DESTRO di Matsui»…) e LOCATION (per le 5: «Quando i PG arrivano» /
  «Quando entrano», 2 paragrafi l'una). Importato da `esporta_da_wizard.py` (titoli schede PNG +
  Location/*.md) e da `genera_dossier.py` (titoli persone + sezione luoghi). Si edita lì, si rigenera.
- **4 deposizioni della banda/kōban SCRITTE nel wizard** (solo deposizione, depHandout=false, come
  chiesto — le schede complete restano non volute): Sugimoto (muro, avvocato), Tanaka (nega ma parla
  troppo, «Yukio? quello parla e non sa niente»), Yoshida (trema; nota GM: isolato e trattato con
  calma crolla e conferma tutto), Suzuki (relazione formale: fermo del 15/5, CBX, Murasakino).
  Matsui SENZA deposizione (decisione utente confermata). Backup: `app.db.bak-pre-depos-20260901`.

## Schede autosufficienti + nomi file col ruolo (2026-09-01, per il programma dell'utente)

- **PNG/*.md rinominati**: `<Nome Cognome> — <chi è>.md` (es. «Shimada Yasuhiro — La madre.md»);
  etichette brevi in `contesto_tavolo.py` → `RUOLI_FILE`. L'export PULISCE PNG/*.md prima di
  riscrivere (niente doppioni coi vecchi nomi); wikilink della Storia Completa aggiornati.
- **Ogni scheda persona è autosufficiente** (dossier E .md singoli): oltre ad aspetto/cosa sa/
  deposizione ora contiene «Nella storia (verità del GM)» (i suoi eventi di cronistoria),
  «Cosa può dare ai PG» (le informazioni di cui è fonte — per Suzuki incluse le 2 risposte del
  kōban via gruppo) e nel dossier anche «I suoi legami (En)». Le sezioni globali restano.
- «⚠ da compilare» non appare più sulla vittima (non si compila) né sui 4 con deposizione.
- **ASSETTO DEFINITIVO (utente, 2026-09-01 sera)**: nel **DOSSIER_GM.md** le persone sono SOLO un
  indice con wikilink `[[PNG/...]]` — le schede complete vivono UNICAMENTE in `PNG/*.md` (quando
  «tira fuori» un PNG nel suo programma deve esserci tutto lì). Il dossier .md tiene solo il resto:
  briefing, caso in breve, cronistoria, luoghi, gruppi/En, informazioni, calendario, distretto.
  Il **DOCX resta completo** (schede incluse) per la stampa. Fatto nel convertitore MD di
  genera_dossier.py (skip sezione persone + indice); `file_scheda()` in contesto_tavolo.py è
  l'unica fonte del nome file.

## Giornali spostati a 26-27-28 maggio (2026-09-02, decisione utente)

- Il quotidiano datato 25/5 (domenica) si stampa la NOTTE del 24 — non può avere il delitto delle
  21:15 con nome della vittima: «il giornale che esce per primo è del giorno dopo». Quindi:
  **trafiletto Kyoto Shinbun = lunedì 26 · articolone Rakuyō = martedì 27 (n. 3.812) ·
  ipotesi regolamento = mercoledì 28 (n. 3.813, «a quattro giorni»)**. Ritocchi interni: «serata di
  sabato», meteo, «cieli coperti da questa sera», didascalia asta «sabato mattina». Corretto anche
  il calendario vivo (giorno 1: articolo del 26). Il briefing del capo resta domenica 25 mattina —
  ora la squadra ha un giorno di vantaggio sulla stampa. Anno: negli handout è ovunque 1997
  (l'unico altro anno è la réclame «RYOKUCHA MARUYAMA — dal 1921», voluta).
  Backup: `app.db.bak-pre-giornali-20260902`. Snapshot HTML rinominati (02=26, 03=27, 04=28).

## Lezioni

- Il flusso è: **wizard → export → stampa**. Mai correggere a mano i file esportati.
- I generatori Word (`genera_*.py`) leggono il DB del wizard: si rilanciano dopo ogni modifica al caso.
