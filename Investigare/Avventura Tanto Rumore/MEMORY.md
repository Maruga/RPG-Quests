# MEMORY — Avventura Bakuon (Tanto Rumore per Nulla)

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
