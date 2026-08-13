# Modifiche al wizard — registro della sessione WIZARD

## 2026-08-13 sera — i 5 pregen dentro il wizard-PG (test di copertura)

Creati in «I miei personaggi» (account dev) i 5 investigatori pregenerati, testi VERBATIM
da `Investigare/pg/PG_01..05.md` (solo lettura dei file — territorio REGOLE, non toccati),
foto copiate in `wwwroot/allegati/pg-<id>/ritratto.png`. Backup `app.db.bak-20260813-1912`.
Scelte aperte lasciate aperte (Gou non scelto, solo Lotta, attributi base, Ki non tirato):
il wizard le segnala coi suoi badge ⚠ — comportamento corretto per i pregen.
**Lacune emerse** (riportate all'utente, nessun adattamento fatto): statistiche di scontro
nell'equipaggiamento; campi enja «cosa vuole in cambio / come contattarlo / limite»;
dettagli del PNG del Kage come campi (ora testo libero in kage.png); note per-attributo;
«3 opzioni tra cui scegliere» e «3 punti da assegnare» non rappresentabili come tali.

> Storico interno di codice e dati. Le modifiche ai DATI del caso «L'era glaciale del lavoro»
> hanno le copie prima/dopo in `Wizard/era_glaciale_lancio/storico/` e il backup del database
> in `app.db.bak-<data>` accanto ad `app.db`.

## 2026-08-12/13 — pannello Mancanze, fix contatore, madre

### Codice
- **Lista casi** (`Pages/Progetti/Index.cshtml`): la card diceva «passo 12/12» — numeratore
  0-based e totale rimasto a 12 da quando le schermate erano meno. Ora mostra
  `passo X+1 / (UltimaSchermata+1)` leggendo la costante del wizard (oggi 15), barra allineata.
- **Schermata 15 — nuovo pannello «Mancanze e segnalazioni»** (`Passi/_Passo12.cshtml` +
  `initMancanze()` in `wwwroot/js/wizard.js`): il lint continua a controllare le regole del
  metodo; questo pannello guarda il **contenuto**. Segnala, con l'azione a fianco:
  - persone che **contano** (colpevole, fonti di informazioni, presenti in cronistoria) senza
    scheda → «✎ Fai la scheda» apre direttamente la loro scheda;
  - il **colpevole** con scheda ma **senza deposizione**;
  - **handout vuoti** (né testo né allegati) → «✏️ Scrivilo» apre l'editor con ✨;
  - **deposizioni marcate 📄** come handout ma vuote;
  - **genere** in anagrafica che non torna col ruolo dichiarato (madre/figlio/sorella…),
    controllato su cerchie (passi 4 e 6) e relazioni;
  - **fonte che forse si contraddice**: parole in comune tra l'informazione e il «cosa non sa»
    della stessa persona — non un verdetto, un invito a controllare (❓).
  Le figure di contorno senza scheda sono elencate a parte come legittime («e va bene così»).
  **Nulla blocca l'export.**
- **Riepilogo**: il conteggio handout non conta più i vuoti — «Handout: 9 (+2 da scrivere)».
- **Rifacimento grafico del pannello** (stesso giorno, su richiesta utente: la prima versione
  era righe sciolte coi bottoni a fine frase): ora è una **griglia a tre colonne** — chi
  (nome + **chi è**, via `descrAttore`, come ovunque nel wizard) · cosa non torna · azione —
  con bottoni incolonnati a larghezza uniforme, righe alte, sezioni con conteggio
  (Schede da fare / Deposizioni / Handout vuoti / Generi / Da controllare) e kanji discreto.
  CSS in `site.css` (blocco `wz-manca-*`), responsive sotto i 760px.
- Testi visibili: eliminata la parola «lint» (gergo) — ora «controllo».
- **Schermata 11**: il parametro `?persona=<id>` apre subito la scheda di quella persona
  (usato dai pulsanti del pannello; innocuo se assente).

### Dati del caso «L'era glaciale del lavoro»
- **Yasuhiro è LA MADRE** (decisione utente, 2026-08-12). La lettura precedente («è il padre,
  manca la madre») era sbagliata: ritratto, schede e deposizioni la trattano tutte da madre —
  l'unico testo difforme era il giornale del 25/05. Corretto: «ha detto il padre» → «ha detto
  la madre», «il ragazzo gli aveva detto» → «le aveva detto». Diff semantico verificato:
  **un solo campo cambiato** (`passo10.handout[2].contenuto`).
  Resta aperto il **nome**: Yasuhiro (康弘) è un nome maschile — rinomina da decidere con
  l'utente (Registro Nomi alla mano).
- `AggiornatoIl` riallineato a UTC (come lo scrive EF).

## 2026-08-13 pomeriggio — date del caso coerenti (revisione con l'utente, un punto alla volta)

### Dati del caso (backup + prima/dopo in `era_glaciale_lancio/storico/`)
- **Evento 10/05 e alibi di Chiba**: corretti **dall'utente** nel wizard (capo = Matsui;
  «era nel retro ed è rientrata dopo il colpo»).
- **Giornali — opzione A (decisione utente)**: «Giornale del 24/05» = trafiletto Kyoto
  Shinbun pag. 3, scritto coi fatti del calendario e **integrato in una pagina 3 completa**
  (asta del tè di Uji, brevi locali, meteo coerente col pezzo Rakuyō, 2 pubblicità; nessun
  nome di persona inventato); «Giornale del 25/05» = pezzo grande Rakuyō spostato qui
  (titolo già giusto); nuovo «Giornale del 26/05» (id nuovo, vuoto) con la descrizione
  utente della pista bande rivali. Calendario e deposizione Yumiko intatti.
- **Tabulato**: titolo → «Pocket Bell — Tabulato 1 febbraio · 23 maggio 1998».
- **Età di Ishida nel giornale**: l'utente DECIDE di tenerla sbagliata («il mondo può
  sbagliare») — non è più un'anomalia da segnalare.

### Codice
- `handout.css`: i titoli `h2` dentro `.ho-giornale .ho-art` perdono la barretta rossa
  laterale dei dossier (border-left 0) — i giornali hanno titoli neri e basta.

### Schermata 13 (handout) — tre richieste utente sull'usabilità
- **↻ Aggiorna**: bottone in cima che ricarica il caso dal server — lo stato vive nella
  pagina, e chi modifica da fuori (assistente, altra finestra) non si vedeva senza F5.
- **Icone + colori per tipo** (`decoHandout` in wizard.js, match per parola-chiave così
  regge anche i tipi scritti con «✏️ Altro»): 📰 seppia giornali, ⚕️ rosso referti,
  ☎️ blu tabulati, 📷 foto, 📝 deposizioni… — bordo sinistro colorato su ogni riga dei
  Documenti nuovi (vivo al cambio tipo) e sulle card dei Raccolti (blu = da informazione,
  bruno = deposizione).
- **Ritorno dall'editor**: «← Torna al caso» ora porta a `?ho=<id>` — la lista scorre da
  sola fino al documento appena editato e lo illumina (niente più ripartenza da cima pagina).

### Verbali stampabili (sera)
Le deposizioni marcate 📄 non avevano una via di stampa (le card dei «Raccolti» permettevano
solo la modifica). Ora ogni card ha **👁 Stampa**: apre l'anteprima col **verbale impaginato**
(`verbaleDeposizione` in wizard.js — carta intestata del distretto, persona sentita,
data/luogo in bianco per il GM, firma del dichiarante, stile `ho-referto`). Per i fogli
virtuali l'anteprima nasconde Edita/Aggiorna. Contestuali, su decisione utente: scritto il
**Giornale del 26/05** (falsa pista bande rivali, Rakuyō), **eliminato** l'handout «Foto
Polizia del Capo Banda», scritta la **deposizione di Yumiko** dal suo «cosa sa».

### Stampa diretta + righe uniformi (tardo pomeriggio)
- **?ho/&apri valgono una volta**: il parametro d'apertura viene consumato e l'indirizzo
  ripulito subito (`history.replaceState`) — era il bug dell'anteprima che ricompariva
  a ogni F5/↻ dopo aver usato l'Aggiorna dell'anteprima.
- **🖨 Stampa diretta ovunque** (`stampaHandoutDiretto`: iframe invisibile + print, senza
  passare dall'anteprima): sulle righe dei Documenti nuovi (con avviso se vuoto) e su TUTTE
  le card dei Raccolti — deposizioni come verbale, informazioni 📄 come **foglio con testo e
  allegati-immagine incorporati** (`foglioInformazione`): niente più pezzi dimenticati
  sparsi per i passi al momento di stampare.
- **Passo 12, righe informazioni uniformi**: tendina classificazione e contatore a larghezza
  fissa (prima flettevano e ogni riga spartiva lo spazio a modo suo), «approfondimento»
  non più troncato, tutto su una riga.

### Allegati-immagine in anteprima (sera, richiesta utente)
Click su un 📎 immagine (passi 12/13, card raccolte, schede): niente più nuova scheda del
browser — si apre la stessa anteprima degli handout (Stampa/PDF · Chiudi), delegato globale
su `.wz-alg`. I file non-immagine mantengono il comportamento normale.

### Incidente clobber (15:03) e LIMITE NOTO
La finestra dell'utente, aperta con stato vecchio, ha risalvato l'intero StatoJson
sovrascrivendo la pagina-3 del Giornale del 24 (ripristinata subito dallo storico,
`*_ripristino_pag3.json`; il resto era salvo). **Limite architetturale**: il wizard salva
lo stato per intero, ultima-scrittura-vince, senza guardia di concorrenza — due finestre
aperte sullo stesso caso si pestano. Regola pratica: UNA finestra sola sul caso; il
bottone «↻ Aggiorna» al passo 13 serve a riallinearsi. (Guardia di versione = lavoro futuro.)
Ripulito anche il segnaposto che l'editor aveva lasciato nel contenuto del Giornale del 26
(«questo handout è ancora vuoto…», 362 car): tornato vuoto vero, così il pannello Mancanze
lo segnala di nuovo.
