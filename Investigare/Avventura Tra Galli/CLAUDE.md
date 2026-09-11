# Avventura Tra Galli — «Omicidio Kyoto Station 1998»

> **Sessione dedicata TRAGALLI** (dal 2026-08-23): questa cartella è gestita da una sessione AI propria e **si lavora SOLO qui dentro**
> (ordine dell'autore 2026-09-08): ciò che andrebbe toccato fuori — registri, manuali, altre avventure — si segnala, non si modifica.
> Valgono le REGOLE FERREE di `../CLAUDE.md`: non inventare, non riaprire decisioni chiuse, leggere i registri prima di toccare.
> Prima di ogni controllo: **`CHECKLIST_CONTROLLO.md`** (rileggere da zero, mai dalla memoria).
> **CHI È CHI / COS'È COSA** (regola ferrea 4, 2026-09-09, estesa il 2026-09-10): ogni nome porta subito dopo, **tra parentesi
> tonde**, chi o cosa è — e, per le persone, in che stato è a quel punto. Vale per le **persone** («Watanabe Toshio (testimone)» ·
> «Watanabe Hideo (procuratore)» · «Kuroda Ryō (esecutore, in fuga)») **e per luoghi, locali, aziende e termini giapponesi**
> («Kameoka (cittadina a 28 km a ovest di Kyoto)» · «il Kōrin (il bar-ristorante della vittima a Gion)» · «la Kanshiki-ka (la
> scientifica)» · «xilazina (sedativo veterinario)»). **In ogni riga**: l'autore rilegge a un mese e non deve fermarsi mai.
> `Storia Completa.md` e `Inizio - Incarico.md` sono già così, con **«Legenda rapida»** in testa alla Storia. Verifica persone: `audit_nomi.py` (scratchpad).

> **`//testo//` = commento dell'autore per l'AI** (convenzione del 2026-09-10). Quando l'autore sistema un file a mano,
> lascia i suoi appunti tra doppie barre. Non si esegue e non si cancella nulla di propria iniziativa: si raccolgono,
> si portano all'autore uno per uno e si decide insieme. Si toccano i file **solo quando dice «controlla»**.

## L'avventura

Kyoto, 11–22 **febbraio 1998** (anno confermato dall'autore — non rimetterlo in discussione).
Combattimenti clandestini di galli a Kameoka: la banda **Nitōgun** (Saitō Gorō capo · Hayashi Tomoki logistica ·
Kuroda Ryō esecutore) vendica la truffa del gallo sedato eliminando Tachibana (allibratore), Murakami (veterinario
complice) e tentando due volte Ōkubo (usuraio, prestanome consapevole). Poliziotto corrotto: sergente Inagaki
(Polizia di Kameoka), con l'agente Yamaguchi come gregario. Climax: blitz al capannone il 22/02 ore 23.
Tono finale: vittoria amara — Saitō non cade per gli omicidi.

**I PG sono la squadra della serie** (`../pg/`, `../Materiale/Scheda_Distretto.md`): briefing del **commissario
Taniguchi**, **Yamada** accompagna, **Ito** fa i rilievi, **Watanabe Hideo (procuratore)** chiede i mandati al giudice, **Gonda**
per gli archivi. Centrale di **Kawaramachi 85**, Sezione Omicidi al 2° piano. Ganci per i 5 PG in `Inizio - Incarico.md`.

## Struttura della cartella

> **Ripulita il 2026-09-11** su ordine dell'autore («c'è una confusione assurda»): tolti il piano di produzione,
> il rapporto di audit, l'export per la revisione esterna, gli scarti delle immagini. Resta solo ciò che serve a giocare
> o a controllare. Tutto è recuperabile dal backup git della vault.

- **`FOGLIO_GM.html`** — il foglio da tavolo (2026-09-11): **due facciate A4**, da stampare fronte-retro e tenere davanti
  durante la partita. Verità in sei righe · chi è chi · cronologia · cosa sa Ōkubo e cosa no · promemoria di regole ·
  quando si consegna ogni handout · il codice del giornale · gli interruttori · l'ospedale · il blitz · risposte pronte
  ai vicoli ciechi · come finisce. Generatore: `foglio_gm.py` (scratchpad)
- **`FOGLIO_SCONTRO.html`** — il foglio dello scontro (2026-09-11), **una sola facciata A4**: serve solo per il blitz
  del 22/02 al capannone di Kameoka (cittadina a 28 km a ovest di Kyoto). Chi spara e con cosa (i 3 tiratori alle
  finestre, il capo sicurezza, i 4-5 armati, le vedette) · i nominati se ci sono (Kuroda (esecutore), Inagaki
  (sergente corrotto), Hayashi (logistica), Saitō (capo)) · le zone · come parte e come finisce · il riepilogo dei tiri
  v3.1 (iniziativa, attacco, difesa, Ukemi, Assorbe, critici). **Statistiche copiate dalle schede, non reinventate**:
  fonte `Luoghi/Luogo_Capannone_Kameoka.md`, `PNG/PNG_Nitogun_Banda.md` e le quattro schede PNG.
  Generatore: `foglio_scontro.py` (scratchpad)
- `Storia Completa.md` — la verità assoluta: teaser, fatti numerati, cast, cronistoria, filosofia investigativa, delegabili, indizi
- `Inizio - Incarico.md` — scena 0 (briefing con Taniguchi), calendario vivo, ganci per i 5 PG, materiale da tavolo
- `PNG/` 15 schede · `Luoghi/` 17 schede — wiki-link sui nomi file reali; **statistiche v3.1** in Kuroda, Hayashi, Saitō,
  Inagaki, Ōkubo, comparse (`PNG_Nitogun_Banda`), cani (`Luogo_Villa_Saito_Kameoka`). **Ogni PNG ha il blocco «al tavolo»**
  (2026-09-09): alibi verificabili, come si comporta, deposizione in prima persona (D-01…D-24), En verso i 5 PG e tra PNG,
  «come cambia nel tempo»; i PNG minori stanno nei Luoghi; quadro d'insieme `PNG/PNG_Quadro_Alibi_En.md`
- `HandOut/` — **36 handout + 2 pagine di token**, HTML, **uno per pagina A4** (verificato); `_STAMPA_TUTTI.html` li mette
  in fila con l'interruzione di pagina per aprirli in Word e stampare in una volta sola; `_LEGGIMI.md` = indice, quando si
  consegnano, avvertenze. Generatore: `genera_handout.py` (scratchpad)
- `Immagini/` — **61 file** (2026-09-11), indice visivo in **`Immagini/_GALLERIA.html`**: `Scena/` (8 foto di rilievo delle due
  scene e del parcheggio) · `Reperti/` (4) · `Luoghi/` (11) · `Ritratti/` (**29 PNG in foto tessera**, stessa luce per tutti:
  in fila non si distingue il criminale). Alla radice restano le
  immagini dell'autore: `3ProiettiliPorta` (handout H-01b), `InventarioVittima` (H-02b), `AssassinoArrivaStazione` (H-26b,
  CAM-12), `VittimaBagno` e `TelecameraAssassinio` (**solo GM**: telecamera interna inesistente), `Copertina` (generica);
  `_originali/` = versioni prima dei ritocchi
- `CHECKLIST_CONTROLLO.md` — la checklist riutilizzabile, da usare a ogni controllo

## Decisioni chiuse (autore, 2026-08-24 e 2026-09-08)

- **Arma del sicario: Makarov PM cal. 9×18, semiautomatica** (= *automatica 9mm* della tabella v3.1: 3/2/4 danno 4); il
  bossolo dimenticato sotto un orinatoio è l'indizio balistico chiave; 2 bossoli repertati al parcheggio di Ōkubo
- Al parcheggio di Ōkubo i colpi sono **2**. Kuroda = **istruttore di pugilato** (Tora Boxing Gym). I **Super 8** = filmati
  compromettenti su un politico locale (assicurazione della vittima; filone politico = subtrama)
- Esito: Kuroda arrestabile (ergastolo) · Hayashi il punto crollabile · **Saitō non incastrato per gli omicidi** (4-6 anni)
- **Niente intercettazioni** (illegali fino al 1999): tabulati con ordine del PM + sorveglianza. Mandati: Taniguchi → Watanabe Hideo (procuratore) → giudice
- **Ōkubo sa poco** (Storia §27): mai stato al capannone, non conosce Saitō/Hayashi/Kuroda; dà i clienti dai prestiti
  (Hashimoto, Kimura), il ristorante di copertura, l'esistenza del poliziotto. Era il terzo prestanome (¥2 mln + ¥3 suoi, a quota 10 vince ¥50 mln)
- **Registro delle 10 chiamate = Storia §22**: tra i clienti solo Inoue e Tanaka; gli altri 4 «per altre vie»
- **Yamaguchi resta** (gregario da ¥50k): Inagaki è «l'unico che conta», non «l'unico»
- Nomi: si lasciano le omonimie cross-avventura (#4 Mori Sachiko, #5 Endō Hiroshi); dentro l'avventura nessuna piena. Prima
  di creare nomi nuovi: `../GENKAI_Registro_Nomi.md` (solo leggere: segnalare i cambi)
- Coerenza d'epoca 1998: VHS, Sanwa/JCB, cellulari senza marca GSM; mova e StarTAC ok
- **Il testo si è adattato alle immagini dell'autore** (2026-09-08): kanji **橘 英司** (accendino «英»), cellulare a stecca, blister
  di Lexotan, due biglietti Kyoto Kōtsū di sola andata dal capolinea lato Shichijō, ritorno delle 18:30 → arrivo 19:30, cena
  al ristorante-bar dello Shin-Miyako Hotel (uscita Hachijō) 19:45-20:45 ¥3.150, chiavetta n. 0419, biglietto da visita con
  foto di «Mari»; telecamera **CAM-12** del corridoio sud alle **21:20** (berretto, giubbotto imbottito, borsa, **sneaker scure**);
  bagno accanto agli uffici della direzione (管理室), porta grigia in lamiera. La pagina del taccuino fotografata è la base di H-09
- **Decisioni del 2026-09-11** (dalle note `//…//` dell'autore nella Storia): **codice delle salse** — piatto = combattimento, le due salse = i due galli (che si chiamano come le salse), primo = gallo di casa, secondo = sfidante, sconto % = quota dello sfidante, e **più il gallo di casa vince più il suo sfidante paga** (gennaio: **10 a 1**, la quota più alta dell'archivio) · **Kuroda resta NON professionista**, telecamera del bagno **guasta dal 9/02 come in origine** (le altre della stazione funzionano ma non danno nulla di più) · il **bossolo non lo dimentica: non lo trova** e non può restare a cercarlo · caso **Murakami**: lo prende Yamashina come suicidio, arriva ai PG il **16/02**, prima ci si arriva solo da soli dal cellulare · **Ōkubo muore se i PG non fanno niente, +20% a precauzione** (5 precauzioni elencate) · **scontro a fuoco al blitz**, polizia colta di sorpresa, 3 fucili alle finestre, i gregari si spogliano e si confondono nella folla · **cassetta di sicurezza** alla Sanwa Bank di Gion: chiave + *inkan* (schedario di Fushimi) + mandato o Setsuko, mai in giornata; dentro ¥35 mln e il libro mastro vero · **Hozu Taxi** (nome nuovo, da segnalare al Registro Nomi) e il gregario al capolinea = nuovo filone
- Statistiche PNG: **Ki come i PG** (attributo più basso + dado alto di 2d6, tetto 12); mai «Riserva». Combattimento =
  `../Combattimento/GENKAI_Combattimento.md` **v3.1** + `Scheda_Giocatori_Combattimento.html` al tavolo

## Stato e prossimi passi

1. ✅ Coerenza (2026-08-24) · ✅ controllo completo e applicazione (2026-09-07/08)
   · ✅ **CHI È CHI applicato ovunque** (2026-09-09, formato `Nome (ruolo, stato)`: Tachibana (vittima), Murakami (veterinario),
   Watanabe Toshio (testimone) / Watanabe Hideo (procuratore), Tanaka Shōji, Sasaki Hideo, Mori, Reiko, Suzuki, Hayama…;
   script `qualifica_riga.py` (prima citazione per riga, idempotente) e `audit_nomi.py` (cognomi ambigui senza parentesi) nello scratchpad)
   · ✅ **Schede PNG «al tavolo»** (2026-09-09, su ordine dell'autore): alibi + comportamento + deposizione D-xx + En + evoluzione per
   tutti i PNG, minori compresi; En decisi (erano «da confermare» nel piano); checklist sezione 12
2. ⏳ **Rilettura dell'autore** («poi controlliamo»). Le deposizioni citano solo fatti già canonici; l'unica cosa nuova che l'autore
   deve sapere: nelle deposizioni i nomi dei galli sono «nomi di piatti, come nel giornale» — la lista vera arriva col §C del piano
3. ✅ **HANDOUT FATTI (2026-09-11)** — `HandOut/`: **36 handout + 2 pagine di token**, uno per file HTML,
   **ognuno in una sola pagina A4** (verificato a schermo: nessuno sfora), più **`_STAMPA_TUTTI.html`** = tutti in fila
   con le interruzioni di pagina, da aprire in Word o stampare in un colpo solo. Indice e istruzioni: `HandOut/_LEGGIMI.md`.
   Controllo incrociato di quattro revisori freschi: **68 rilievi, tutti applicati**. Token della crime board: **solo il
   ruolo pubblico** che i PG conoscono al momento della consegna (mai «sicario», mai «capo banda»: Saitō = «Imprenditore,
   Kameoka», Kuroda = «Istruttore di pugilato»), + 3 token anonimi.
   Generatore nello scratchpad: `genera_handout.py` (si rigenera tutto in un colpo se cambia il canone)
4. ✅ **IMMAGINI FATTE (2026-09-11)** — tutto l'elenco IMG-01…IMG-25 del piano è chiuso, più IMG-26 (un gallo) e i **29
   ritratti**, generati con **gpt-image-2** (`bia_image_generate`, ~2,9 $ in tutto). Archiviate in `Immagini/Scena·Reperti·
   Luoghi·Ritratti`, indice visivo in **`Immagini/_GALLERIA.html`**. I **token hanno la foto stampata** (niente più da
   ritagliare) e nessuna scritta giapponese nel riquadro. Tre immagini sono diventate handout: **H-02c** (il disegno col
   sangue — H-02 reperto 21 prometteva l'allegato fotografico e mancava), **H-12b** (il retrobottega del veterinario),
   **H-15b** (l'identikit). Non fatta **IMG-08** (taccuino): il modello scrive kanji finti, e la pagina leggibile è già
   l'handout H-09 sulla foto dell'autore.

## Da segnalare fuori cartella (non toccato)
- `../GENKAI_Registro_Nomi.md`: **rinomina del 2026-09-11** — il figlio del veterinario **Murakami Kenji (村上 健次)**
  è diventato **Murakami Yūsuke (村上 裕介)**, perché aveva nome e kanji identici a Ōkubo Kenji. Verificato che
  «Yūsuke» non esiste nel vault. L'omonimia **Yamaguchi Tetsuo** (corrotto) / **Yamada Tetsuo** (agente fisso) l'autore
  l'ha **chiusa come non problematica** (2026-09-11): al tavolo si usano sempre i cognomi
- `../GENKAI_Registro_Nomi.md`: **nomi nuovi creati il 2026-09-11** — **Hozu Taxi** (保津タクシー, compagnia di taxi di
  Kameoka), **Sakura Kōkoku** (agenzia pubblicitaria di Osaka), **Harada Kōhei** (agente del Kōban della stazione),
  **Kubota Jun** (assistente capo, Commissariato di Yamashina), **Ogata Michio** (veterinario dell'Istituto zooprofilattico, H-29), più le ditte di comodo del taccuino (Nishijin Kōmuten,
  Morita Kensetsu, K.N Nōki, Tanaka Shōji ditta, Ōhara Fudōsan, Yamashina Seiki, Kamo Unsō, Uji Mokuzai, Naniwa Bōseki —
  **inesistenti per definizione**, sono codici). Nessuna collisione col registro (verificato). Da aggiungere quando l'autore dà il via
- `../GENKAI_Registro_Nomi.md`: «Murayama Hidetoshi» non esiste più in Tra Galli (sostituito da Taniguchi)
- `../REGISTRO_MODIFICHE.md`: riga informativa — Tra Galli allineata alla serie (PNG fissi, Kawaramachi 85) e al combattimento v3.1
