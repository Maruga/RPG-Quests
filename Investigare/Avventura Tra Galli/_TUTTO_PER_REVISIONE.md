# «OMICIDIO KYOTO STATION 1998» — dossier completo per revisione esterna

> File di lavoro generato il 11/09/2026. Contiene **tutto** il materiale dell'avventura:
> regole della sessione, storia, schede dei personaggi, schede dei luoghi, piano di produzione
> e il **testo integrale dei 34 handout** (convertiti dall'HTML: impaginazione e grafica non sono riprodotte).
> Non è materiale da tavolo: serve solo per il controllo.

## Cosa si chiede alla revisione

Avventura investigativa per il gioco di ruolo **GENKAI 限界**, ambientata a **Kyoto, 11–22 febbraio 1998**.
Si cercano: contraddizioni fra i documenti, errori di date e di calendario, cifre che non tornano,
anacronismi rispetto al Giappone del 1998, errori di procedura penale giapponese dell'epoca,
indizi che rivelano la soluzione troppo presto o che invece non sono raggiungibili,
e qualunque punto in cui il materiale in mano ai giocatori si contraddice.

**Non sono problemi** (sono scelte volute, già discusse):
- I combattimenti di galli, l'usura e la corruzione sono il contenuto criminale dell'avventura.
- Le omonimie fra **Yamaguchi Tetsuo** (agente corrotto) e **Yamada Tetsuo** (agente della squadra):
  al tavolo i personaggi si chiamano sempre per **cognome**, quindi non generano confusione.
- La ditta di comodo 田中商事 «Tanaka Shōji» che non corrisponde al cliente omonimo Tanaka Shōji:
  è una **falsa pista deliberata**, i codici del taccuino sono arbitrari per definizione.
- Le quote: «sconto 3%» significa che lo sfidante paga **3 a 1**.

---


====================================================================================================

# PARTE 0 — Regole della sessione e decisioni chiuse

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

- `Storia Completa.md` — la verità assoluta: teaser, fatti numerati, cast, cronistoria, filosofia investigativa, delegabili, indizi
- `Inizio - Incarico.md` — scena 0 (briefing con Taniguchi), calendario vivo, ganci per i 5 PG, materiale da tavolo
- `PNG/` 15 schede · `Luoghi/` 17 schede — wiki-link sui nomi file reali; **statistiche v3.1** in Kuroda, Hayashi, Saitō,
  Inagaki, Ōkubo, comparse (`PNG_Nitogun_Banda`), cani (`Luogo_Villa_Saito_Kameoka`). **Ogni PNG ha il blocco «al tavolo»**
  (2026-09-09): alibi verificabili, come si comporta, deposizione in prima persona (D-01…D-24), En verso i 5 PG e tra PNG,
  «come cambia nel tempo»; i PNG minori stanno nei Luoghi; quadro d'insieme `PNG/PNG_Quadro_Alibi_En.md`
- `HandOut/` — **35 handout + 2 pagine di token**, HTML, **uno per pagina A4** (verificato); `_STAMPA_TUTTI.html` li mette
  in fila con l'interruzione di pagina per aprirli in Word e stampare in una volta sola; `_LEGGIMI.md` = indice, quando si
  consegnano, avvertenze. Generatore: `genera_handout.py` (scratchpad)
- `Immagini/` — **61 file** (2026-09-11), indice visivo in **`Immagini/_GALLERIA.html`**: `Scena/` (8 foto di rilievo delle due
  scene e del parcheggio) · `Reperti/` (4) · `Luoghi/` (11) · `Ritratti/` (**29 PNG in foto tessera**, stessa luce per tutti:
  in fila non si distingue il criminale) · `_scarti/` (3 versioni sostituite, tenute per scelta). Alla radice restano le
  immagini dell'autore: `3ProiettiliPorta` (handout H-01b), `InventarioVittima` (H-02b), `AssassinoArrivaStazione` (H-26b,
  CAM-12), `VittimaBagno` e `TelecameraAssassinio` (**solo GM**: telecamera interna inesistente), `Copertina` (generica);
  `_originali/` = versioni prima dei ritocchi
- `PIANO_HANDOUT_IMMAGINI.md` — handout e immagini, stato e decisioni (§B chiuso il 2026-09-11) · `CONTROLLO_2026-09-07.md`
  — rapporto e stato applicazione · `CHECKLIST_CONTROLLO.md` — la checklist riutilizzabile

## Decisioni chiuse (autore, 2026-08-24 e 2026-09-08)

- **Arma del sicario: Makarov PM cal. 9×18, semiautomatica** (= *automatica 9mm* della tabella v3.1: 3/2/4 danno 4); il
  bossolo dimenticato sotto un orinatoio è l'indizio balistico chiave; 2 bossoli repertati al parcheggio di Ōkubo
- Al parcheggio di Ōkubo i colpi sono **2**. Kuroda = **istruttore di pugilato** (Tora Boxing Gym). I **Super 8** = filmati
  compromettenti su un politico locale (assicurazione della vittima; filone politico = subtrama)
- Esito: Kuroda arrestabile (ergastolo) · Hayashi il punto crollabile · **Saitō non incastrato per gli omicidi** (4-6 anni)
- **Niente intercettazioni** (illegali fino al 1999): tabulati con ordine del PM + sorveglianza. Mandati: Taniguchi → Watanabe Hideo (procuratore) → giudice
- **Ōkubo sa poco** (Storia §27): mai stato al capannone, non conosce Saitō/Hayashi/Kuroda; dà i clienti dai prestiti
  (Hashimoto, Kimura), il ristorante di copertura, l'esistenza del poliziotto. Era il terzo prestanome (¥2 mln + ¥3 suoi, vince ¥15 mln)
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
- **Decisioni del 2026-09-11** (dalle note `//…//` dell'autore nella Storia): **codice delle salse** — piatto = combattimento, le due salse = i due galli (che si chiamano come le salse), primo = gallo di casa, secondo = sfidante, sconto % = quota dello sfidante (gennaio: 3%) · **Kuroda resta NON professionista**, telecamera del bagno **guasta dal 9/02 come in origine** (le altre della stazione funzionano ma non danno nulla di più) · il **bossolo non lo dimentica: non lo trova** e non può restare a cercarlo · caso **Murakami**: lo prende Yamashina come suicidio, arriva ai PG il **16/02**, prima ci si arriva solo da soli dal cellulare · **Ōkubo muore se i PG non fanno niente, +20% a precauzione** (5 precauzioni elencate) · **scontro a fuoco al blitz**, polizia colta di sorpresa, 3 fucili alle finestre, i gregari si spogliano e si confondono nella folla · **cassetta di sicurezza** alla Sanwa Bank di Gion: chiave + *inkan* (schedario di Fushimi) + mandato o Setsuko, mai in giornata; dentro ¥35 mln e il libro mastro vero · **Hozu Taxi** (nome nuovo, da segnalare al Registro Nomi) e il gregario al capolinea = nuovo filone
- Statistiche PNG: **Ki come i PG** (attributo più basso + dado alto di 2d6, tetto 12); mai «Riserva». Combattimento =
  `../Combattimento/GENKAI_Combattimento.md` **v3.1** + `Scheda_Giocatori_Combattimento.html` al tavolo

## Stato e prossimi passi

1. ✅ Coerenza (2026-08-24) · ✅ controllo completo e applicazione (2026-09-07/08): `CONTROLLO_2026-09-07.md`
   · ✅ **CHI È CHI applicato ovunque** (2026-09-09, formato `Nome (ruolo, stato)`: Tachibana (vittima), Murakami (veterinario),
   Watanabe Toshio (testimone) / Watanabe Hideo (procuratore), Tanaka Shōji, Sasaki Hideo, Mori, Reiko, Suzuki, Hayama…;
   script `qualifica_riga.py` (prima citazione per riga, idempotente) e `audit_nomi.py` (cognomi ambigui senza parentesi) nello scratchpad)
   · ✅ **Schede PNG «al tavolo»** (2026-09-09, su ordine dell'autore): alibi + comportamento + deposizione D-xx + En + evoluzione per
   tutti i PNG, minori compresi; En decisi (erano «da confermare» nel piano); checklist sezione 12
2. ⏳ **Rilettura dell'autore** («poi controlliamo»). Le deposizioni citano solo fatti già canonici; l'unica cosa nuova che l'autore
   deve sapere: nelle deposizioni i nomi dei galli sono «nomi di piatti, come nel giornale» — la lista vera arriva col §C del piano
3. ✅ **HANDOUT FATTI (2026-09-11)** — `HandOut/`: **35 handout + 2 pagine di token**, uno per file HTML,
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
   l'handout H-09 sulla foto dell'autore. Scarti tenuti in `Immagini/_scarti/` con il motivo, se preferisce l'altra versione

## Da segnalare fuori cartella (non toccato)
- `../GENKAI_Registro_Nomi.md`: **rinomina del 2026-09-11** — il figlio del veterinario **Murakami Kenji (村上 健次)**
  è diventato **Murakami Yūsuke (村上 裕介)**, perché aveva nome e kanji identici a Ōkubo Kenji. Verificato che
  «Yūsuke» non esiste nel vault. L'omonimia **Yamaguchi Tetsuo** (corrotto) / **Yamada Tetsuo** (agente fisso) l'autore
  l'ha **chiusa come non problematica** (2026-09-11): al tavolo si usano sempre i cognomi
- `../GENKAI_Registro_Nomi.md`: **nomi nuovi creati il 2026-09-11** — **Hozu Taxi** (保津タクシー, compagnia di taxi di
  Kameoka), **Sakura Kōkoku** (agenzia pubblicitaria di Osaka), **Harada Kōhei** (agente del Kōban della stazione),
  **Kubota Jun** (assistente capo, Commissariato di Yamashina), più le ditte di comodo del taccuino (Nishijin Kōmuten,
  Morita Kensetsu, K.N Nōki, Tanaka Shōji ditta, Ōhara Fudōsan, Yamashina Seiki, Kamo Unsō, Uji Mokuzai, Naniwa Bōseki —
  **inesistenti per definizione**, sono codici). Nessuna collisione col registro (verificato). Da aggiungere quando l'autore dà il via
- `../GENKAI_Registro_Nomi.md`: «Murayama Hidetoshi» non esiste più in Tra Galli (sostituito da Taniguchi)
- `../REGISTRO_MODIFICHE.md`: riga informativa — Tra Galli allineata alla serie (PNG fissi, Kawaramachi 85) e al combattimento v3.1


====================================================================================================

# PARTE 1 — STORIA COMPLETA (la verità dei fatti)

# Omicidio Kyoto Station 1998

> Avventura GENKAI — Kyoto, febbraio 1998

## Presentazione (teaser senza spoiler — per WhatsApp/giocatori)

> Immagine di copertina: la foto dei tre proiettili.

**OMICIDIO KYOTO STATION — 1998**

Kyoto, 11 febbraio 1998, sera di festa nazionale. La stazione nuova brilla ancora di vetro e acciaio. Alle 21:21, nel bagno del terzo piano, tre colpi. Nessuno ha visto niente.

L'uomo nel cubicolo centrale gestiva un locale a Gion — rispettabile, conosciuto, pulito. Con le ultime forze ha lasciato un disegno sul pavimento: un messaggio che solo la persona sbagliata può capire.

La mattina dopo il caso è sul vostro tavolo. E chi ha sparato non ha ancora finito.

⚙️ *Sistema*: GENKAI 限界
👥 *Giocatori*: 3–5 + GM (squadra investigativa pregenerata)
🎲 *Tipo*: indagine poliziesca noir, procedurale — niente soprannaturale
⏱️ *Durata*: ~5–7 ore (2–3 serate)
🏷️ #GDR #investigativo #noir #Kyoto #1998 #GENKAI

---

## Legenda rapida — cosa sono i nomi che tornano di continuo

*(Da qui in poi ogni nome è comunque spiegato tra parentesi a ogni riga in cui compare: questa tabella serve solo per un colpo d'occhio prima di giocare.)*

| Nome | Cos'è |
|---|---|
| **Kyoto Station** | La stazione centrale di Kyoto, edificio nuovissimo di vetro e acciaio (1997), con negozi e ristoranti su più piani. **Lato Hachijō** = l'uscita sud; **lato Shichijō** = l'uscita nord. Scena del primo omicidio |
| **Kameoka** | Cittadina di campagna a 28 km a ovest di Kyoto, oltre le montagne (~50 min d'auto). È la base della banda. **Sogabe-chō** è la sua frazione rurale, campi e serre, dove sta il capannone |
| **Nitōgun** (二刀軍) | La banda: organizza i combattimenti clandestini di galli. Non è yakuza vera, è una scissione locale degli anni '80 |
| **Kōrin** | Il bar-ristorante della vittima, a **Gion** (il quartiere dei locali e delle geisha, Kyoto est). La sua facciata pulita |
| **Kameoka-tei** | Il ristorante di copertura della banda, in centro a Kameoka. Sul suo annuncio pubblicitario viaggia il codice |
| **Kyoto Shimbun** | Il quotidiano locale di Kyoto. Ogni mese pubblica l'annuncio del Kameoka-tei = la convocazione in codice |
| **Kameoka Nōji KK** | La società di comodo di Saitō (agricoltura/import-export): possiede il ristorante, i magazzini e paga gli annunci |
| **Club Aoyagi** | Locale di hostess di alto livello a **Kiyamachi** (via dei locali notturni lungo il canale, centro di Kyoto). Ci lavora l'amante della vittima |
| **Fushimi** | Quartiere residenziale tranquillo a sud di Kyoto: ci abitano sia la vittima sia il sicario |
| **Yamashina** | Quartiere a est di Kyoto, oltre la collina: lo studio del veterinario |
| **Kamigyō** | Quartiere nord di Kyoto: il condominio dell'usuraio |
| **Kyoto University Hospital** | L'ospedale universitario a **Sakyō** (quartiere nord-est, zona università). Stanza 412 |
| **Kōban** | Il posto di polizia di quartiere (qui: quello dentro la stazione) |
| **Kanshiki-ka** | La polizia scientifica |
| **Affari Interni** | La squadra che indaga sui poliziotti corrotti |
| **Kokuzei** (国税) | Il fisco giapponese e la sua polizia tributaria: indaga sui soldi non dichiarati e sequestra i beni. In pratica l'Agenzia delle Entrate e la Guardia di Finanza in un ente solo |
| **Hozu Taxi** | La piccola compagnia di taxi di Kameoka (6 vetture). Nelle notti dei combattimenti fa in una notte le corse di due settimane: il suo registro è un handout-chiave |
| **inkan** | Il sigillo personale con cui in Giappone si firma tutto (vale più della firma a mano). Quello registrato in banca serve per aprire la cassetta di sicurezza |
| **pachinko** | Sala da gioco giapponese (macchine tipo flipper verticali), legale e diffusissima |
| **yakuza** / **yubitsume** | La mafia giapponese / il taglio della falange del mignolo come rito di espiazione |

---

1. **Banda Nitōgun** (二刀軍, "esercito delle due lame") — gruppo criminale di Kameoka (cittadina di campagna a 28 km a ovest di Kyoto) attivo dagli anni '80, nato da una scissione di una piccola yakuza (mafia giapponese) locale. Capo: **Saitō Gorō** (51, ex yakuza con yubitsume — gli manca la falange del mignolo, rito di espiazione — oggi imprenditore tessile, vive in villa nella periferia est di Kameoka). Braccio destro/logistica: **Hayashi Tomoki** (35). Esecutore: **Kuroda Ryō** (28, sicario, copertura come istruttore di pugilato a Fushimi, quartiere residenziale a sud di Kyoto).

2. **Attività della banda**: combattimenti clandestini di galli una volta al mese in un capannone agricolo dismesso (frazione rurale di Sogabe-chō, campagna di Kameoka), giro di scommesse illegali per ¥80–120 mln l'anno.

3. **Coperture**: il ristorante **Kameoka-tei** (locale di soba e tempura in centro a Kameoka), intestato alla testa di legno **Tachi Yūichirō** (62, ex commerciante indebitato — ignaro nei dettagli). Società di comodo **Kameoka Nōji KK** (la finta ditta agricola/import-export di Saitō).

4. **Codice di comunicazione**: ogni mese il Kameoka-tei (il ristorante di copertura) pubblica un annuncio sul **Kyoto Shimbun** (il quotidiano locale di Kyoto), sezione "Annunci ristorazione". Chi non è del giro vede solo un menu promozionale. Chi è del giro legge così:
    - la **«promozione speciale del [data]»** = la **data del combattimento** (ore 23:00 al capannone)
    - ogni **piatto** del menu scontato = **un combattimento** della serata (sono 7 piatti = 7 combattimenti, nell'ordine in cui si svolgono)
    - **i galli si chiamano come le salse** (Wasabi, Agrodolce, Sesamo, Yuzu…): le **due salse citate nel piatto sono i due galli** che si affrontano in quel combattimento. *«Pollo alle mandorle, salsa wasabi e agrodolce»* = un combattimento fra il gallo **Wasabi** e il gallo **Agrodolce**. Per convenzione il **primo nome è il gallo di casa** (del Nitōgun), il secondo è lo **sfidante**
    - lo **sconto in %** = la **quota dello sfidante**: «sconto 5%» = paga **1 a 5**, «sconto 7%» = **1 a 7**. Il gallo di casa è dato per favorito e paga poco, quindi non ha bisogno di un numero
    - *(Riscontro: nel combattimento truccato di gennaio lo sfidante pagava **3 a 1** — «sconto 3%» — ed è per questo che Ōkubo con ¥5 mln ne incassa 15, Sasaki con ¥1 mln ne prende 3 e Nishimura con ¥800k ne prende 2,4.)*

5. **Allibratore principale del Nitōgun** (la banda): **Tachibana Eiji** (47, ufficialmente gestore del bar-ristorante Kōrin a Gion — il quartiere dei locali e delle geisha —, separato dalla moglie **Setsuko** dal '96, vive a Fushimi, amante la hostess **Mariko** del Club Aoyagi).

6. **Poliziotto corrotto**: **sergente Inagaki Hiroshi** (47, Stazione di Polizia di Kameoka). Sul libro paga di Saitō (il capo della banda) da 6 anni per ¥200k al mese. Chiude un occhio sui movimenti notturni del capannone, avvisa delle pattuglie, non apre indagini sui rumori. **È l'unico poliziotto corrotto che conta**: l'agente **Yamaguchi Tetsuo** (¥50k al mese) è un gregario che emerge di riflesso quando Inagaki cade.

7. **Antefatti Murakami (il veterinario complice)**: **Dr. Murakami Saburō** (52, veterinario di Yamashina — quartiere a est di Kyoto —, sposato con **Hiroko**, padre di **Yūsuke** 19 e **Aiko** 15) inizia nel 1994 a curare in nero i galli del Nitōgun (la banda).

8. **Investimento fallito**: nel 1995 Murakami (il veterinario) investe ¥45 mln in un complesso residenziale sul Lake Biwa (il grande lago a est di Kyoto). Fallisce nel 1996. Accumula ¥38 mln di debiti totali. Comincia a scommettere sui galli per recuperare; entro ottobre 1997 il debito personale con Tachibana (l'allibratore, la futura vittima) è di ¥6,8 mln.

9. **Genesi della truffa (ottobre 1997)**: Tachibana (l'allibratore), percependo la disperazione del veterinario, gli propone l'accordo: sedare un gallo del Nitōgun (la banda) in un combattimento futuro, in cambio della cancellazione totale del debito. Murakami (il veterinario) accetta dopo giorni di esitazione.

10. **Preparazione (novembre 1997 – gennaio 1998)** — 2 prestanome ignari:
    - **Sasaki Hideo** (44, gestore della sala pachinko "Pachinko Sasaki" — sala giochi giapponese — a Kawaramachi, la via principale del centro di Kyoto; vecchio amico di golf di Tachibana, l'allibratore) → scommette ¥1 mln come "favore amichevole"
    - **Nishimura Tatsuya** (36, cameriere senior del Kōrin — il bar-ristorante di Tachibana Eiji (l'allibratore, la vittima) a Gion —, fedele al datore di lavoro) → scommette ¥800k senza fare domande

11. **Terzo prestanome (consapevole)**: **Ōkubo Kenji** (41, ex collega di Tachibana (l'allibratore) negli anni '80, ora usuraio indipendente a Kamigyō — quartiere nord di Kyoto —, divorziato, una figlia di 12 anni a Nagoya, città a 130 km). Tachibana gli affida ¥2 mln, Ōkubo (l'usuraio) intuisce la truffa dalle quote anomale e scommette ¥3 mln di tasca propria.

12. **Esecuzione truffa (gennaio 1998)**: combattimento truccato al capannone di Kameoka, Murakami (il veterinario) seda il gallo del Nitōgun (la banda), che perde. Vincita complessiva ¥18 mln. Tachibana (l'allibratore) cancella il debito di Murakami e gli paga ¥1,5 mln cash extra (che Murakami nasconde dietro l'armadio dei farmaci della clinica).

13. **Indagine interna del Nitōgun (fine gennaio – inizio febbraio 1998)**: Saitō (il capo) nota l'anomalia (il gallo, di solito combattivo, fiacco fin dal primo round). Hayashi (il braccio destro) recupera la carcassa, la fa analizzare a Osaka (grande città a 40 minuti di treno), conferma la sedazione. Saitō ricostruisce il pattern delle scommesse e ha il quadro. Decide **vendetta progressiva** su Tachibana (l'allibratore), Murakami (il veterinario) e Ōkubo (l'usuraio). Sasaki Hideo e Nishimura Tatsuya (i due prestanome ignari) vengono ignorati come pesci piccoli.

14. **Trappola Tachibana — fase 1**: 10 febbraio mattina, Hayashi (il braccio destro) fa una ricognizione preventiva del bagno maschile al 3° piano della Kyoto Station (la stazione centrale), lato Hachijō (l'uscita sud). Sceglie il punto e nota il cartello che segnala la telecamera dell'ingresso del bagno fuori servizio dal 9 febbraio (guasto vero, già segnalato, ricambio in arrivo: nessun complice interno, è un'occasione colta al volo). **Le altre telecamere della stazione funzionano**, ma riprendono corridoi e atri affollati in VHS di scarsa qualità: danno la corporatura e i vestiti, mai il volto.

15. **Trappola Tachibana — fase 2**: 10 febbraio ore 18:42, Hayashi (il braccio destro) lascia un messaggio nella segreteria telefonica di Tachibana (l'allibratore) — *"Ei-san, sono io. Domani come d'accordo"* — per fissare un incontro pomeridiano a Kameoka.

16. **Trappola Tachibana — fase 3**: 11 febbraio (mercoledì, festa nazionale Kenkoku Kinen no Hi, l'anniversario della fondazione dello Stato). Tachibana (l'allibratore) parte in autobus alle 14:30 dal capolinea della Kyoto Kōtsū (la compagnia degli autobus) alla Kyoto Station, lato Shichijō (l'uscita nord), e arriva a Kameoka alle 15:30. Nel pomeriggio (14–18) incontra Hayashi (il braccio destro) per "discussioni operative". Hayashi gli dà di persona un appuntamento serale alla stazione: *"alle 21:15 al bagno del 3° piano lato Hachijō, ti porto la tua quota del giro di gennaio"*. Per Tachibana è routine mensile.

17. **Movimenti serali di Tachibana (l'allibratore) l'11/02**: autobus di ritorno alle 18:30, Kyoto Station (la stazione centrale) alle 19:30; attraversa la stazione e lascia gli effetti nella sua Toyota Crown nera (berlina di lusso) al parcheggio multipiano lato Hachijō, posto B-14; cena leggera al ristorante-bar dello **Shin-Miyako Hotel** (il grande albergo davanti all'uscita Hachijō) dalle 19:45 alle 20:45, conto ¥3.150; alle 21:17 sale al 3° piano; alle 21:18 entra nel cubicolo centrale del bagno e chiude la porta, in attesa di Hayashi.

18. **Omicidio Tachibana**: 11/02 ore 21:21. Kuroda (il sicario) — accompagnato in auto da Hayashi (il braccio destro), che resta al volante nella zona Hachijō-ovest — entra nel bagno alle 21:20. Spara 3 colpi cal. 9×18 mm con una pistola semiautomatica Makarov PM (pistola militare sovietica) attraverso la porta. Tachibana (l'allibratore), morente, traccia col sangue sul pavimento il simbolo del Nitōgun (la banda): un gallo stilizzato con due speroni sovrapposti, noto solo dentro al giro. Kuroda raccoglie i bossoli: **il terzo è rotolato sotto un orinatoio e non lo trova**. Non può restare lì a cercarlo — da un momento all'altro può entrare qualcuno — così esce e fugge in auto con Hayashi. È l'errore che gli costerà il caso.

19. **Testimone**: **Watanabe Toshio** (31, impiegato della Mitsubishi Heavy Industries — grande azienda industriale — sede di Kobe, città a 70 km, fa il pendolare). Era nel cubicolo a sinistra dalle 21:14. Sente tutto (passi, scarpe da ginnastica cigolanti, 3 colpi, la raccolta dei bossoli, la fuga decisa) ma **non vede nulla**. Paralizzato dalla paura per 40 minuti, esce alle 22:01 e corre al Kōban (il posto di polizia) della stazione.

20. **Entrata dei PG nel caso**: 12 febbraio ore 08:00, briefing alla Sezione Omicidi della **Polizia Prefetturale di Kyoto** (Centrale di Kawaramachi 85, 2° piano): il **commissario Taniguchi Osamu** (il capo dei PG) assegna il caso alla squadra; presente l'agente **Yamada Tetsuo** (l'agente che accompagna la squadra), che ha seguito la scena nella notte. Materiale ricevuto: verbale del Kōban (il posto di polizia della stazione), foto della scena, prima testimonianza di Watanabe Toshio (il testimone del cubicolo accanto), reperti raccolti dalla Kanshiki-ka (la polizia scientifica) di **Ito Daisuke** (il suo responsabile) — vedi `Inizio - Incarico.md`.

21. **Reperti dalla scena, addosso a Tachibana (l'allibratore, la vittima)**: cellulare NTT DoCoMo (la compagnia telefonica giapponese); taccuino Moleskine scritto in codice; copia del Kyoto Shimbun (il quotidiano di Kyoto) del 9/02 con l'annuncio del Kameoka-tei (il ristorante di copertura), piegata in tasca; due biglietti di sola andata della Kyoto Kōtsū (la compagnia degli autobus): Kyoto Station → Kameoka delle 14:30 e Kameoka → Kyoto delle 18:30, ¥900 l'uno, datati 11/02; conto del ristorante-bar dello Shin-Miyako Hotel (l'albergo davanti alla stazione) dell'11/02, ¥3.150; polaroid piegata di una donna in kimono, di spalle, davanti a un torii (il portale rosso dei templi shintoisti); biglietto da visita con foto di una hostess del Club Aoyagi (il locale notturno di Kiyamachi), nome d'arte «Mari»; ricevuta del Royal Hotel Karasuma (albergo del centro) per le notti 7-8/02; chiavetta di una cassetta di sicurezza (targhetta n. 0419) nascosta sotto la suola della scarpa destra; blister di Lexotan (ansiolitico); portafoglio Bottega Veneta con ¥180.000 (nessuna rapina).

22. **Cellulare di Tachibana (l'allibratore) — solo le 10 ultime chiamate**, nessun numero salvato in rubrica. Le 10 chiamate riconducono a:
    1. **Dr. Murakami Saburō** (il veterinario complice)
    2. **Aoyagi Mariko** (l'amante, hostess del Club Aoyagi)
    3. **Ristorante Kameoka-tei** (il ristorante di copertura: è il canale del codice del Nitōgun)
    4. **Locale Kōrin** (il suo stesso bar-ristorante a Gion)
    5. **Sasaki Hideo** (prestanome ignaro, la sala pachinko)
    6. **Nishimura Tatsuya** (prestanome ignaro, il cameriere del Kōrin)
    7. **Ōkubo Kenji** (prestanome consapevole, l'usuraio)
    8. **Inoue Takeshi** (cliente scommettitore — ristoratore di Pontochō, il vicolo dei locali in centro)
    9. **Tanaka Shōji** (cliente scommettitore — pensionato, ex dirigente Kyocera, la grande azienda di Kyoto)
    10. **Hayashi Tomoki** (il braccio destro della banda: è il numero aziendale ufficiale della società import-export di Saitō — primo aggancio sul Nitōgun)

    Solo 2 dei 6 clienti scommettitori escono direttamente dal cellulare (Inoue e Tanaka Shōji). Gli altri 4 (Hashimoto, Fujiwara, Yoshida, Kimura) vanno raggiunti per altre vie.

23. **Omicidio Murakami**: 13 febbraio pomeriggio (~14:00, pausa pranzo dello studio veterinario di Yamashina, chiuso al pubblico fino alle 16:00). Kuroda (il sicario) entra dal vicolo sul retro, immobilizza Murakami (il veterinario) nel retrobottega e gli inietta una dose letale di **xilazina** (sedativo veterinario per grandi animali) prelevata dalle boccette dello studio stesso: chiusura simbolica voluta dal Nitōgun (la banda), perché è lo stesso farmaco con cui aveva sedato il gallo. Scena allestita per simulare un suicidio o un'overdose accidentale. **Hiroko (la moglie del veterinario) trova il corpo verso le 16:30**.

24. **Autopsia 14/02 mattina**: rivela una concentrazione di xilazina (il sedativo veterinario) 5 volte superiore alla dose letale, più un ematoma da contenimento al collo. **Omicidio mascherato da suicidio**.

    **Attenzione: il caso Murakami NON arriva subito sul tavolo dei PG.** Il 13/02 lo prende la Polizia di Yamashina (il commissariato di quartiere) come probabile suicidio di un uomo pieno di debiti: è roba loro, ai PG non viene consegnato niente. L'autopsia del 14 mattina ribalta la qualificazione, ma il fascicolo cammina per i suoi canali: **passa formalmente alla Sezione Omicidi il 16/02**, quando qualcuno nota le coincidenze (stesso giro, stesso periodo).
    **I PG possono arrivarci prima e da soli**, e devono: seguendo i numeri del cellulare di Tachibana trovano il nome del veterinario e vanno alla clinica di Yamashina di loro iniziativa. Chi ci va il **12/02 lo trova vivo** (e può salvarlo); chi ci va il **13/02 dopo le 16:30** trova la scena chiusa dalla polizia di quartiere e deve farsi dare le carte; chi aspetta che gliele portino le riceve il **16/02**, con due giorni di ritardo e Ōkubo già in ospedale.

25. **Tentato omicidio Ōkubo**: dal 12/02 Ōkubo (l'usuraio, prestanome consapevole) cambia hotel ogni notte. La sera del 14 febbraio, ore 22:30, rientra brevemente al condominio di Kamigyō (quartiere nord di Kyoto) per recuperare la pistola Tokarev TT-33 (vecchia pistola sovietica) dal cassetto del comodino e ¥600.000 in contanti: vuole partire per Nagoya il giorno dopo. Kuroda (il sicario) lo aspetta dietro un pilastro, al posto B-04 del parcheggio sotterraneo. 2 colpi: uno manca, l'altro lo colpisce alla spalla destra; i due bossoli espulsi restano a terra e vengono repertati (collegheranno balisticamente l'agguato all'arma della stazione). Un vicino di casa rientra in auto, i fari illuminano la scena, Kuroda fugge a piedi. Ricovero al **Kyoto University Hospital** (l'ospedale universitario di Sakyō), stanza 412, sotto piantonamento.

26. **Identikit dell'assalitore**: dal racconto di Ōkubo (l'usuraio, che lo intravede di sfuggita) e del vicino di casa (testimone secondario, accecato dai propri fari), la polizia produce un **identikit non preciso**: maschio, ~25-35 anni, atletico, ~1,80 m, berretto di lana calzato, giubbotto scuro imbottito, sneaker scure con suola scanalata. **Nessun tratto del volto**: era controluce e portava il berretto (per questo l'identikit non parla di capelli). Utile per confronti futuri (la telecamera del corridoio alla Kyoto Station, la perquisizione di casa Kuroda) ma **non sufficiente da solo** a identificare Kuroda (il sicario).

27. **Cosa sa Ōkubo (l'usuraio, interrogabile dal 15/02 in ospedale)**:
    - **Non è mai stato al capannone**: conosce solo la zona generica a ovest di Kameoka (la cittadina della banda), per sentito dire da Tachibana (l'allibratore)
    - **Scommetteva tramite Tachibana (l'allibratore)**: era lui che gli passava le quote dei galli al telefono
    - Sa che esiste un **ristorante di copertura** a Kameoka, ma se non torchiato non ne ricorda il nome (Tachibana l'aveva nominato di sfuggita)
    - **Non conosce Saitō** (il capo della banda: né personalmente né di nome — sa solo che esiste "il capo")
    - **Non conosce né Hayashi (il braccio destro) né Kuroda (il sicario)**: non ha mai incontrato nessuno della banda
    - Sa che **qualcuno della polizia avvisa la banda**, ma non sa nome né grado (è Inagaki, il sergente corrotto di Kameoka)
    - Conosce **2-3 dei clienti scommettitori** di Tachibana, non per averli incrociati al capannone ma **dai prestiti** (lui è usuraio): **Hashimoto Daisuke** (salaryman — impiegato d'azienda — ludopatico, gli aveva chiesto un prestito) e **Kimura Akira** (dentista ludopatico, passatogli da un banchiere di Kawaramachi che gli inoltra i clienti in difficoltà)
    - Ha intuito la truffa di gennaio dalle quote anomale e ha scommesso di tasca propria

28. **Indizi a casa di Ōkubo (l'usuraio; condominio di Kamigyō, quartiere nord di Kyoto)**: copia del Kyoto Shimbun (il quotidiano) di gennaio '98 con l'annuncio cerchiato a matita; cassetta audio nascosta sotto la tavola del parquet, con la registrazione di una telefonata con Tachibana (l'allibratore) del 12 gennaio, parlata in codice; quaderno con le annotazioni delle proprie scommesse personali; pistola Tokarev TT-33 (vecchia pistola sovietica) nel cassetto del comodino, mai usata; ¥600k in contanti.

29. **Tentativo in ospedale**: 17 febbraio verso le 18:00, al Kyoto University Hospital (l'ospedale universitario di Sakyō). Kuroda (il sicario), travestito da fattorino di un servizio di catering ospedaliero, tenta di entrare nella stanza 412 e di iniettare cloruro di potassio nella flebo di Ōkubo (l'usuraio). **L'esito dipende interamente dall'azione dei PG.** Regola secca per il GM: **se i PG non fanno niente, Ōkubo muore.** Ogni precauzione concreta che hanno preso vale **+20% di probabilità che si salvi** (il GM tira un d100, oppure conta: con cinque precauzioni è salvo di sicuro). Contano solo le cose fatte davvero, non le intenzioni:
    1. Raddoppiare il piantone davanti alla stanza 412
    2. Coprire il **cambio turno** dell'agente (06:00 / 14:00 / 22:00: sono i tre buchi)
    3. Presidiare o far controllare l'**accesso di servizio** da cui entra il personale (è la falla vera)
    4. Far filtrare dall'infermiera capo **chi porta i pasti** (il catering cambia fattorini ogni settimana, nessuno li controlla)
    5. Spostare Ōkubo di stanza senza dirlo in giro, o piantonarlo di persona

30. **Indagine sui clienti scommettitori (raggiunti per vie diverse)**:
    - Dal cellulare di Tachibana (l'allibratore) → **Inoue** (ristoratore di Pontochō) e **Tanaka Shōji** (pensionato ex Kyocera)
    - Da Ōkubo (l'usuraio) tramite i suoi prestiti → **Hashimoto** (salaryman ludopatico) e **Kimura** (dentista ludopatico)
    - Dall'indagine della Sezione Crimine Organizzato + i registri del capannone dopo il 22/02 → **Fujiwara** (imprenditore tessile di Osaka) e **Yoshida** (piccolo costruttore di Uji)

31. **Smascheramento di Inagaki (il sergente corrotto)**: i PG, contattando la Stazione di Polizia di Kameoka, ricevono dati distorti, mandati ritardati, documentazione "smarrita". Inagaki si tradisce intorno al 14–15/02 conoscendo dettagli che non dovrebbe sapere (per esempio il ricovero di Ōkubo prima che la notizia sia pubblica). I PG segnalano agli **Affari Interni** della Polizia Prefetturale (la squadra che indaga sui poliziotti), che attivano sorveglianza, tabulati telefonici e ricostruzione dei movimenti bancari. **Esito tipico in 5–7 giorni**: arresto di Inagaki, conferma del libro paga da ¥200k al mese versati da Saitō (il capo della banda). **Inagaki è il solo che conta**: l'agente Yamaguchi (l'altro corrotto, ¥50k al mese) salta fuori di riflesso e cede subito.

32. **Decifrazione del codice del Nitōgun (la banda)**: il taccuino di Tachibana (l'allibratore), scritto in codice, + l'archivio del Kyoto Shimbun (il quotidiano) trovato in casa sua (4 copie da ottobre '97 a gennaio '98, tutte con l'annuncio del Kameoka-tei) + la lista clienti criptata nella cassaforte + la cassetta audio di Ōkubo (l'usuraio) permettono di decifrare il codice di comunicazione, collegando il ristorante al capannone.

33. **Perquisizione a casa di Hayashi (il braccio destro; Kameoka centro)**: mandato ottenibile dopo l'identificazione vocale del messaggio in segreteria del 10/02. Trovati ¥1,2 mln nascosti, le chiavi del capannone e un cellulare prepagato con quattro numeri salvati per sigle (S.G., K.R., I.H., V2): senza altre prove non identificano nessuno.

34. **Perquisizione a casa di Kuroda (il sicario; Fushimi, quartiere a sud di Kyoto)**: mandato ottenibile dopo aver incrociato l'impronta delle Asics (scarpe da ginnastica) + la telecamera del corridoio + l'identikit + la descrizione del testimone Ōkubo. Trovate: le scarpe Asics taglia 27 cm, la Makarov PM cal. 9×18 (la pistola sovietica) nascosta nell'intercapedine del bagno — prova balistica decisiva: le striature dei proiettili e i segni del percussore sul bossolo della stazione combaciano —, banconote da ¥10.000 con numerazione consecutiva tracciabili a un prelievo bancario di Saitō (il capo), cartucce 9×18 di scorta, cellulare prepagato con 4 chiamate ricevute da Hayashi nei giorni critici.

35. **Hayashi (il braccio destro) sotto torchio**: è il punto crollabile del Nitōgun (la banda). Con prove + un patto giudiziario credibile + la paura di essere eliminato in carcere da Saitō (il capo), può ribaltare tutto sul capo. Senza la sua testimonianza Saitō è intoccabile.

36. **Saitō (il capo della banda) negli interrogatori**: professionista esperto, alibi impeccabili (cena d'affari a Osaka l'11/02 alle 21:30; il 13/02 dal commercialista; il 14/02 a casa con telefonata al figlio; il 17/02 al tempio di Nara, la città-santuario a sud di Kyoto — tutti documentati), si presenta con l'avvocato. **Non crolla mai**.

37. **Climax — 22 febbraio ore 23:00**: prossimo combattimento al capannone di Kameoka. I PG coordinano un blitz con la **Sezione Crimine Organizzato** della Polizia Prefetturale di Kyoto (escludendo la Polizia di Kameoka per via di Inagaki, il sergente corrotto). Squadra speciale di ~30 uomini, briefing tattico la mattina del 22/02. Esito: arresti di 50–70 persone, sequestro di contante e registri reali. Saitō (il capo) presente o assente in base al timing.

    **Il blitz finisce in uno scontro a fuoco** (setup tattico completo in `Luoghi/Luogo_Capannone_Kameoka.md`). In breve: le vedette avvistano la colonna e danno l'allarme, dal capannone partono i primi colpi **dalle finestre alte** e la polizia — che si aspettava un'irruzione tranquilla su degli scommettitori, non una difesa armata — **viene presa di sorpresa e si mette al riparo**. Nel frattempo 70 spettatori escono di corsa dalla porta grande e i gregari, quando capiscono che è finita, **si strappano di dosso tutto e si mescolano alla folla che scappa**. I PG sono schierati su un lato del piazzale, quello che il briefing dava come via di fuga: **decidono loro** se stare al riparo e lasciar fare alla squadra speciale, se tenere la linea, se entrare, o se mettersi a fermare chi scappa (e cercare le facce che conoscono).

38. **Esito finale**:
    - **Kuroda** (il sicario) arrestabile per l'omicidio di Tachibana (prove balistiche + impronta + telecamera + identikit), verosimile ergastolo
    - **Hayashi** (il braccio destro) condannato a pena media-alta se collabora, lunga se non collabora
    - **Inagaki** (il sergente corrotto) licenziato e condannato per corruzione e ostruzione
    - **Tachi Yūichirō** (la testa di legno del ristorante) collaboratore di giustizia, sconto di pena
    - **Saitō non incastrato per gli omicidi** (omertà dei sottoposti), condannato per organizzazione di combattimenti clandestini ed evasione fiscale (4–6 anni)
    - **Tono finale**: vittoria amara, Saitō rimane vivo, possibile gancio per future avventure

---

## PNG

### Vittime

| Nome | Età | Chi è |
|---|---|---|
| **Tachibana Eiji** (vittima) | 47 | **Vittima 1** (uccisa nel bagno della Kyoto Station — la stazione centrale — l'11/02 alle 21:21). Allibratore principale del Nitōgun (la banda) da 6 anni, gestore di facciata del bar-ristorante Kōrin a Gion (il quartiere dei locali). Separato dalla moglie dal '96, vive a Fushimi (quartiere a sud), amante una hostess. Calmo, manipolatore freddo, vestito sartoriale, accendino S.T. Dupont (marca francese di lusso) in argento inciso "英". È il **mandante della truffa** sul gallo che innesca tutto. |
| **Dr. Murakami Saburō** (veterinario complice) | 52 | **Vittima 2** (ucciso nel suo studio veterinario il 13/02 verso le 14:00, iniezione letale di xilazina — sedativo per grandi animali). Veterinario di Yamashina (quartiere a est di Kyoto), da 4 anni cura in nero i galli del Nitōgun (la banda). Spaventato cronico, magro, occhiali dorati, mani con tremore, alcolista. Indebitato per l'investimento fallito sul Lake Biwa (il grande lago a est), ¥38 mln di debiti totali. **Esecutore tecnico della truffa**: ha sedato il gallo in cambio della cancellazione del proprio debito di ¥6,8 mln con Tachibana (l'allibratore). |
| **Ōkubo Kenji** (usuraio, prestanome consapevole) | 41 | **Vittima 3** (sopravvive al primo attentato del 14/02 alle 22:30). Ex collega di Tachibana (l'allibratore) negli anni '80, ora usuraio indipendente a Kamigyō (quartiere nord di Kyoto). Divorziato dal '95, una figlia di 12 anni a Nagoya. Robusto, capelli rasati, giubbotto di pelle, parla forte ma calcola sempre. **Prestanome consapevole**: ha intuito la truffa dalle quote anomale e ha scommesso ¥3 mln di tasca propria. È la **chiave investigativa principale** se i PG riescono a proteggerlo. |

### Nitōgun — la banda

| Nome | Età | Chi è |
|---|---|---|
| **Saitō Gorō** (capo della banda) | 51 | **Capo del Nitōgun, mandante dei tre omicidi**. Imprenditore import-export tessile come copertura, vive in una villa nella periferia est di Kameoka (la cittadina a ovest di Kyoto). Imponente, capelli grigi corti, gli manca la falange terminale del mignolo sinistro (vecchio yubitsume, il rito di espiazione yakuza). Parla poco, voce profonda, sempre calmo, nazionalista, legge libri di storia militare. Alibi impeccabili costruiti ad arte. **Non crolla mai negli interrogatori**. Frase tipica: *"Non ho idea di cosa stia parlando, ispettore. Posso offrirvi un tè?"* |
| **Hayashi Tomoki** (braccio destro, logistica) | 35 | **Braccio destro di Saitō, logistica del capannone**. Ufficialmente dipendente della società import-export di Saitō (la Kameoka Nōji KK). Vive a Kameoka centro con la fidanzata Yui (28, ignara di tutto). Magro, capelli mossi corti, tatuaggio parziale di carpa sulla schiena (ex affiliato yakuza da giovane), sneaker e jeans, sigaretta sempre in mano. Gestisce gli annunci sul Kyoto Shimbun (il quotidiano), le scommesse, il pagamento delle vincite. **Coordina Kuroda per i 3 attentati**. È il **punto crollabile** della banda: con prove + patto giudiziario può ribaltare tutto su Saitō. |
| **Kuroda Ryō** (esecutore, il sicario) | 28 | **Esecutore materiale dei 3 omicidi**. Copertura come istruttore di pugilato (Tora Boxing Gym, la palestra sotto casa sua a Fushimi). Atletico, 1,80 m, capelli rasati, tatuaggio di un drago in stile *irezumi* (tatuaggio tradizionale giapponese) incompleto sotto la scapola sinistra, scarpe Asics Gel taglia 27, giubbotto bomber scuro. Astemio, parla pochissimo, allenamento quotidiano. **Picchiatore promosso a sicario, non professionista**: lascia indizi che un veterano non lascerebbe (impronta della scarpa, sparo a contatto, fuga visibile in telecamera). Sorprendente: tiene un quaderno di calligrafia giapponese. |

### Forze dell'ordine corrotte e coperture esterne

| Nome | Età | Chi è |
|---|---|---|
| **Sergente Inagaki Hiroshi** (poliziotto corrotto) | 47 | **Poliziotto corrotto della Stazione di Polizia di Kameoka, sezione ordine pubblico**. Da 6 anni sul libro paga del Nitōgun (la banda), ¥200k al mese. Robusto, volto rugoso da fumatore di Mild Seven (sigarette giapponesi), uniforme sempre curata, ruvido e autoritario. Mancano 3 anni alla pensione. Si considera un "professionista pratico". **Ostacola dall'interno** le indagini dei PG (informazioni distorte, mandati ritardati, avvisi a Saitō). Si tradisce intorno al 14-15/02 conoscendo dettagli che non dovrebbe. Crolla con gli Affari Interni in 5–7 giorni. |
| **Agente Yamaguchi Tetsuo** (secondo poliziotto corrotto) | 32 | **Complice minore di Inagaki** (Stazione di Polizia di Kameoka). Sul libro paga per ¥50k al mese. Ruolo secondario, scoperto come effetto collaterale dell'indagine su Inagaki. Cede subito quando gli Affari Interni lo prendono. |
| **Tachi Yūichirō** (testa di legno del ristorante) | 62 | **Proprietario solo sulla carta del Ristorante Kameoka-tei** (la sede di copertura della banda a Kameoka). Cardiopatico, spaventato cronico. Negli anni '90, ricoperto di debiti, accettò il "rilevamento" da parte di una società di Saitō in cambio del ruolo nominale e di uno stipendio. Materialmente non controlla nulla. Cede in interrogatorio se i PG minacciano di coinvolgere legalmente la moglie **Tachi Reiko** (58, alla cassa, completamente innocente). Può diventare **collaboratore di giustizia** con sconto di pena. |

### Prestanome ignari (non bersagli, ma fonti)

| Nome | Età | Chi è |
|---|---|---|
| **Sasaki Hideo** (prestanome ignaro) | 44 | **Gestore della sala pachinko "Pachinko Sasaki"** (sala giochi giapponese, a Kawaramachi, la via principale del centro). Sposato, 2 figli (10 e 6). Sovrappeso, capelli col gel, camicia hawaiana fuori dal lavoro, cordiale, ride volentieri. Vecchio amico di golf di Tachibana (l'allibratore) da 10 anni. Ha scommesso ¥1 mln per "favore tra amici", senza sapere della truffa. Ha ricevuto ¥200k come ringraziamento e se n'è imbarazzato. **Testimone più cooperativo**: ricorda l'insegna scolorita "Tanaka Nōki" (un rivenditore di macchine agricole chiuso nel '91) sul capannone. |
| **Nishimura Tatsuya** (prestanome ignaro) | 36 | **Cameriere senior del bar-ristorante Kōrin** (il locale di Tachibana, l'allibratore, a Gion). Single, vive con la madre anziana e malata. Magro, postura formale, sempre camicia bianca e pantaloni neri. Considerava Tachibana un mentore (9 anni di lavoro). Ha scommesso ¥800k credendo di fare un favore al datore di lavoro. **Riconosce Hayashi (il braccio destro) in foto**, descrive Saitō (il capo) visto di sfuggita. Si chiude per lealtà, si apre se gli si fa capire che il silenzio mette in pericolo lui e la madre. |

### Testimone oculare/auricolare

| Nome | Età | Chi è |
|---|---|---|
| **Watanabe Toshio** (testimone) | 31 | **Impiegato amministrativo della Mitsubishi Heavy Industries** (grande azienda industriale, sede di Kobe, città a 70 km: fa il pendolare). Sposato con Akemi (28, insegnante elementare), una bambina di 6 mesi. Magro, occhiali, salaryman classico (impiegato d'azienda: abito grigio, cravatta blu). Timido, ansioso, attacchi di panico. **Era nel cubicolo a sinistra dell'omicidio** l'11/02. Ha sentito tutto (passi, scarpe da ginnastica cigolanti, 3 colpi, la raccolta dei bossoli, la fuga decisa) ma **non ha visto nulla**. Paralizzato dalla paura per 40 minuti, poi corre al Kōban (il posto di polizia della stazione). Cooperativo ma traumatizzato, ha bisogno di tatto: trattato male = ritirata, trattato bene = testimonianza in tribunale. |

### Clienti scommettitori (6 — solo Inoue e Tanaka Shōji compaiono nel registro chiamate del cellulare)

| Nome | Età | Chi è |
|---|---|---|
| **Hashimoto Daisuke** (cliente scommettitore) | 38 | **Middle manager in un'azienda di elettronica a Osaka** (la grande città a 40 minuti di treno), sposato, moglie incinta del primo figlio. Ha perso ¥12 mln in 2 anni di scommesse, ludopatia conclamata. Sull'orlo del fallimento personale. **Collabora subito** se interrogato (piange, confessa). **Rischio suicidio** se la moglie scopre tutto: i PG dovrebbero indirizzarlo a un sostegno. |
| **Fujiwara Kentarō** (cliente scommettitore) | 56 | **Imprenditore tessile di Osaka**, ricco, scommette per "passione tradizionale". Cordiale ma altezzoso, possiede galli di linea pura (mai in gara). Conosce **Saitō (il capo della banda) personalmente**, rapporti civili da anni. **Tenta una corruzione "elegante"** sui PG: consulenze pagate, donazioni a fondazioni vicine alle loro famiglie (¥5–10 mln). Si difende con un avvocato di alto livello. **Muro di gomma**. |
| **Inoue Takeshi** (cliente scommettitore) | 49 | **Proprietario del ristorante kaiseki "Hanaichi"** (cucina tradizionale di lusso, a Pontochō, il vicolo dei locali in centro). Vedovo, una figlia maggiorenne. Considerava Tachibana (l'allibratore) un amico personale. Frequenta il capannone una volta ogni 3-4 mesi. **Cooperativo, addolorato**: può **descrivere il capannone dall'interno** ai PG (disposizione, arena, banchi delle scommesse), conosce Hayashi e Saitō di vista. |
| **Yoshida Mamoru** (cliente scommettitore) | 45 | **Titolare di una piccola impresa edile a Uji** (cittadina a sud di Kyoto), sposato, 3 figli. Scommette cifre medie (¥200-500k a serata). Nervoso, vuole evitare scandali per la famiglia e per l'attività. **Collabora poco**: conferma la dinamica delle scommesse telefoniche, niente di rivelatore. |
| **Kimura Akira** (cliente scommettitore) | 42 | **Dentista di Sakyō** (quartiere nord-est di Kyoto), sposato, 1 figlio. Ludopatia conclamata: ha perso ¥8 mln in 18 mesi e ha iniziato a frodare le assicurazioni dentistiche per coprire le perdite. È stato 5 volte al capannone. **Collabora dopo un patto giudiziario** (immunità sui reati assicurativi): può **identificare Saitō in un confronto fotografico**. |
| **Tanaka Shōji** (cliente scommettitore) | 67 | **Pensionato benestante, ex dirigente della Kyocera** (la grande azienda di Kyoto). Sposato, 2 figli adulti, 4 nipoti. Figura sociale importante a Kyoto, conoscente di amministratori comunali. Stile signorile, paternalistico, manipolatore. Frequenta il capannone 1-2 volte l'anno, si considera "appassionato di una tradizione antica". **Tenta una corruzione "soft"** sui PG: raccomandazioni di carriera, accesso sociale (*"Conosco persone, posso aiutarvi"*). Difficile da rifiutare. Apre la porta a un'**indagine politica più ampia** se collabora. |

### Famiglie e amante

| Nome | Età | Chi è |
|---|---|---|
| **Tachibana Setsuko** (moglie separata della vittima) | 44 | **Moglie separata di Tachibana (l'allibratore)** dal '96, mai divorziata. Vive a Maizuru (città di mare a 95 km, 2 ore di treno) con la madre vedova; insegna calligrafia. Sobria, capelli corvini sempre raccolti, kimono nelle occasioni formali. Dolore antico ma composto: non ha mai cercato il divorzio per rispetto familiare e per i diritti patrimoniali. **Non sa nulla** della truffa o del Nitōgun (la banda); ricorda vagamente "amici discutibili" del marito, tra cui un "Saitō" (per lei un nome qualunque). Eredita formalmente l'appartamento e il locale Kōrin. **Avvicinarla con rispetto** è essenziale. |
| **Aoyagi Mariko** (amante della vittima) | 29 | **Amante di Tachibana (l'allibratore)**, relazione di 18 mesi. **Hostess senior al Club Aoyagi** (locale notturno di Kiyamachi, la via dei locali lungo il canale), nome d'arte "Mari". Vive a Sakyō (quartiere nord-est), affitto pagato in parte da Tachibana. Snella, capelli lunghi neri, lineamenti delicati, parla bene anche di politica (tecnica da hostess). Non sa del Nitōgun. **Conosce il codice della cassaforte** dell'appartamento di Tachibana (0418, il suo compleanno) — è il **gancio chiave** per accedere a quei documenti. Sinceramente legata a Tachibana; dopo il 14/02 si terrorizza e può sparire (tornare dai genitori in Hokkaidō, l'isola del nord). |
| **Murakami Hiroko** (moglie del veterinario) | 49 | **Moglie di Murakami Saburō (il veterinario complice)**. Casalinga di Yamashina (quartiere a est di Kyoto). Sobria, viso pulito, grembiule in casa, tradizionale. Sospettava da mesi che qualcosa non andasse (insonnia, alcol serale del marito, telefonate strane) ma non aveva osato chiedere. **Trova il corpo** del marito nello studio il 13/02 verso le 16:30. Sotto shock, parla a frammenti, ricorda dettagli minuti. **Non protegge il marito** — vuole solo proteggere i figli. |
| **Murakami Yūsuke** (figlio del veterinario) | 19 | **Figlio maggiore dei Murakami**. Studente del 1° anno di Scienze Politiche all'**Università Waseda** (università privata di prestigio a Tokyo), vive in dormitorio. Razionale, freddo, occhiali, leggermente arrogante (università di prestigio), distante dalla famiglia. Convinto che il padre fosse "un dilettante". **Completamente fuori dalla vicenda**. Crolla emotivamente quando capisce che la famiglia è in difficoltà economiche serie (rischia le tasse universitarie). Valore investigativo basso. |
| **Murakami Aiko** (figlia del veterinario) | 15 | **Figlia minore dei Murakami**. All'ultimo anno di chūgakkō (la scuola media giapponese), vive con la madre. Magra, capelli lunghi neri, timida e sensibile. Disegna manga, passa i pomeriggi nello studio del padre, sa di animali. **Punto debole emotivo del padre**. Ricorda episodi inquietanti: il padre che piange al telefono (gennaio '98), che nasconde una busta di soldi dietro l'armadio dei farmaci, una telefonata in cui diceva *"non posso, ho una famiglia"* (probabilmente Tachibana, l'allibratore, che gli proponeva la truffa). **Trattare con enorme cautela**: minorenne, fragile, lutto recente. È la **chiave per la confessione** se Murakami (il veterinario) fosse ancora vivo. |

---

## Storia per punti

### Antefatti (1994 – settembre 1997)

- **1994**: Murakami (il veterinario) inizia a curare in nero i galli del Nitōgun (la banda), presentato da un compagno di università.
- **1995**: Murakami (il veterinario) investe ¥45 mln nel complesso residenziale sul Lake Biwa (il grande lago a est di Kyoto).
- **1996**: l'investimento fallisce. Murakami (il veterinario) inizia a scommettere sui galli per recuperare.
- **1996–1997**: Murakami (il veterinario) accumula debiti. Tachibana (l'allibratore) gli concede credito, legandolo a sé. Debito a ottobre '97: ¥6,8 mln.

### Genesi della truffa (ottobre 1997)

- **Ottobre 1997**: Tachibana (l'allibratore) percepisce la disperazione di Murakami (il veterinario). Gli propone l'accordo: sedare un gallo del Nitōgun (la banda) in un combattimento futuro, in cambio della cancellazione totale del debito.
- Murakami (il veterinario) accetta dopo giorni di esitazione.

### Preparazione (novembre 1997 – gennaio 1998)

- **Novembre–dicembre 1997**: Tachibana (l'allibratore) studia il calendario dei combattimenti del Nitōgun (la banda) e individua quello adatto, a gennaio.
- **Gennaio 1998**: recluta i prestanome — Sasaki Hideo (il gestore della sala pachinko) a inizio mese, Nishimura Tatsuya (il cameriere del Kōrin) a metà — e affida ¥2 mln a Ōkubo (l'usuraio).
- **Sasaki Hideo** e **Nishimura Tatsuya** (i due prestanome ignari) vengono coinvolti come favore personale, senza sapere nulla.
- **Ōkubo** (l'usuraio) riceve da Tachibana (l'allibratore) ¥2 mln da scommettere come «favore»; intuisce la truffa dalle quote anomale e aggiunge ¥3 mln di tasca propria.

### Esecuzione (gennaio 1998)

- **Combattimento truccato al capannone di Kameoka** (la cittadina a ovest di Kyoto): Murakami (il veterinario) seda il gallo del Nitōgun, che perde. Tachibana (l'allibratore) e i prestanome incassano. Vincita stimata: ¥18 mln complessivi.
- Tachibana (l'allibratore) cancella il debito di Murakami (il veterinario) e lo paga in più con una piccola quota in contanti.
- Murakami (il veterinario) per la prima volta in due anni dorme sereno.

### Indagine interna del Nitōgun (fine gennaio – inizio febbraio 1998)

- Saitō (il capo della banda) nota l'anomalia: il gallo, animale di solito combattivo, è apparso fiacco fin dal primo round.
- Hayashi (il braccio destro) recupera la carcassa e la fa analizzare (da un altro veterinario, fuori Kyoto).
- Il pattern delle scommesse viene ricostruito: cifre concentrate contro il gallo del Nitōgun, da persone collegabili a Tachibana (l'allibratore).
- **Inizio febbraio 1998**: Saitō (il capo) ha il quadro. Decide la vendetta progressiva.

### Omicidi (11 – 17 febbraio 1998)

- **Mercoledì 11 febbraio, 21:21** — Omicidio di **Tachibana** (l'allibratore) alla Kyoto Station (la stazione centrale), bagno del terzo piano lato Hachijō (l'uscita sud). Tre colpi cal. 9×18 attraverso la porta. Tachibana, morente, traccia col sangue il simbolo del Nitōgun (la banda): un gallo con due speroni sovrapposti. Esecutore: **Kuroda Ryō** (il sicario, su mandato di Saitō, con la logistica di Hayashi).
- **Giovedì 12 febbraio, ore 08:00** — _I PG entrano nel caso_. Briefing al Quartier Generale della Polizia Prefetturale di Kyoto: rapporto del Kōban (il posto di polizia della stazione), foto della scena, prima testimonianza di Watanabe Toshio (il testimone del cubicolo accanto). Sopralluogo la mattina e il pomeriggio. Primi indizi: il cellulare, il taccuino, il giornale Kyoto Shimbun in tasca, i biglietti dell'autobus per Kameoka.
- **Venerdì 13 febbraio, pomeriggio (~14:00)** — Omicidio di **Murakami** (il veterinario) nel suo studio a Yamashina (quartiere a est di Kyoto). Kuroda (il sicario) lo immobilizza nel retrobottega e gli inietta una dose letale di **xilazina** (lo stesso sedativo che Murakami usava sui galli — chiusura simbolica voluta dal Nitōgun). Aspetto iniziale ambiguo (possibile suicidio o overdose accidentale): la natura omicidiaria emerge solo con l'autopsia. Corpo trovato dalla moglie **Hiroko** verso le 16:30, quando passa dallo studio prima di rientrare a casa.
- **Sabato 14 febbraio, ore 22:30** — Tentato omicidio di **Ōkubo** (l'usuraio, prestanome consapevole) nel parcheggio sotterraneo del suo condominio a Kamigyō (quartiere nord di Kyoto). Kuroda (il sicario) spara e lo colpisce alla spalla destra. Un vicino di casa (il Sig. Hayama) che rientra in auto in quel momento spaventa Kuroda, che fugge per la rampa d'uscita. Ōkubo viene ricoverato al **Kyoto University Hospital** (l'ospedale universitario, a Sakyō), stanza 412, sotto piantonamento della Polizia Prefetturale.
- **Domenica 15 – lunedì 16 febbraio** — I PG indagano. Possibili tentativi di corruzione (Tanaka Shōji, il pensionato ex Kyocera, e Fujiwara, l'imprenditore tessile di Osaka: i clienti facoltosi). Possibili intimidazioni se rifiutati. Ōkubo (l'usuraio) è cosciente dal 15/02 e interrogabile in ospedale. **La sera del 15/02 le due veglie funebri**, alla stessa ora: Tachibana (l'allibratore) in una sala di Fushimi (con Setsuko, la moglie separata; Mariko, l'amante, si presenta se nessuno la ferma), Murakami (il veterinario) in casa a Yamashina. Il 16/02 cremazione di Tachibana e funerale di Murakami al tempio di Yamashina.
- **Martedì 17 febbraio, sera (~18:00)** — Secondo attentato a **Ōkubo** (l'usuraio, ferito il 14/02 e ricoverato nella stanza 412) in ospedale. Kuroda (il sicario, ancora libero) travestito da fattorino di un servizio di catering ospedaliero tenta di iniettare veleno nella flebo. Riesce o fallisce in base all'azione dei PG.
- **Domenica 22 febbraio, 23:00** — _Prossimo incontro del Nitōgun (la banda) al capannone di Kameoka_. Climax operativo: i PG possono raggiungere il capannone con la polizia.

### Esito investigativo

- **Kuroda Ryō** (il sicario): arrestabile per l'omicidio di Tachibana (prova balistica + impronta + telecamera + identikit). Verosimile ergastolo.
- **Hayashi Tomoki** (il braccio destro): il punto crollabile — condanna media se collabora contro Saitō, lunga se tace.
- **Saitō Gorō** (il capo della banda): non incastrato per gli omicidi (omertà dei sottoposti); condannato per organizzazione di combattimenti clandestini ed evasione fiscale (4–6 anni).
- **Smantellamento del giro di scommesse**: arresti multipli, coinvolgimento di personalità di rilievo (la testa di legno del ristorante, alcuni clienti facoltosi).
- **Ristorante di copertura** (il Kameoka-tei): gestione tracciabile fino alla Kameoka Nōji KK (la società di comodo), ma il legame con Saitō resta indiretto senza la testimonianza di Hayashi.
- **Tono finale**: vittoria amara. La giustizia formale non chiude il cerchio.

---

## Filosofia investigativa (regola d'oro per il GM)

**Nessun indizio singolo deve dare la soluzione.** L'avventura è progettata in modo che la verità emerga solo dalla **somma di ricerche, interrogatori incrociati e deduzioni**. Esempi concreti:

- Il **disegno col sangue** del gallo non identifica il Nitōgun (la banda) da solo: serve incrociarlo con almeno due elementi tra testimonianze, archivi e oggetti recuperati
- Il **cellulare prepagato** di Hayashi (il braccio destro) ha numeri salvati per sigle (S.G., K.R., I.H., V2): da solo prova solo l'esistenza di una rete riservata, va decifrato con materiale esterno (registri bancari, identificazione di sospetti, Affari Interni)
- La **lista dei clienti scommettitori** dalla cassaforte di Tachibana (l'allibratore) è in codice: leggibile solo incrociandola col taccuino e con gli interrogatori
- Il **bossolo 9×18** dimenticato nel bagno è prova balistica decisiva **solo se** l'arma viene poi sequestrata a Kuroda (il sicario)
- La **cassetta audio** di Ōkubo (l'usuraio) registra Tachibana che parla in codice: serve il taccuino per decifrarla
- Il **filmato della telecamera** del corridoio alla Kyoto Station mostra il killer ma il volto non è leggibile: l'identificazione si conferma solo quando si ha già un sospetto in custodia

Il caso si risolve con **5–7 ore di gioco di triangolazione**, non con un colpo di fortuna. Se un giocatore presenta una "prova schiacciante" basata su un unico indizio, il GM deve sempre rispondere con: *"È un indizio forte, ma il magistrato non emetterà un mandato di arresto senza una conferma indipendente. Cosa altro avete?"*

### Sui poteri dei PG (sistema GENKAI)

I PG hanno strumenti di percezione, intuizione e pressione (i Gou, il Satori, gli Enja, il Kyōryoku) che li **aiutano pesantemente** nelle scene chiave: capire se un sospetto mente, cogliere un dettaglio nascosto in una stanza, ottenere un crollo emotivo in interrogatorio, intuire una connessione altrimenti invisibile. **Non sostituiscono però l'indagine procedurale**: un Satori ben tirato può dire al PG "*Inagaki (il sergente corrotto) ti sta nascondendo qualcosa*" — ma per **incastrare** Inagaki servono comunque movimenti bancari, tabulati e la testimonianza concorde di un altro PNG. I poteri sono **acceleratori di intuizione**, non scorciatoie probatorie.

**Regola operativa**: il GM concede al PG l'informazione o la sensazione richiesta dal potere, ma chiarisce sempre che **per il magistrato e per la condanna formale serve la prova materiale**. Questo mantiene il ritmo investigativo e la tensione narrativa fino al climax del 22/02.

---

## Reati delegabili / Esiti da altre squadre

I PG sono assegnati alla **Sezione Omicidi** della Polizia Prefetturale di Kyoto. La loro competenza è circoscritta ai tre omicidi (Tachibana l'allibratore, Murakami il veterinario, il tentato omicidio di Ōkubo l'usuraio). Tutto il resto va **delegato** ad altre squadre tramite memo interno: l'esito ritorna come **nota narrativa** dopo X giorni e i PG lo usano come informazione utile, senza gestirlo direttamente.

| Reato / Indagine | Squadra | Tempo medio di ritorno | Esito narrativo tipo |
|---|---|---|---|
| Corruzione del sergente Inagaki + agente Yamaguchi (i due poliziotti corrotti di Kameoka) | **Affari Interni** della Polizia Prefetturale di Kyoto (la squadra che indaga sui poliziotti) | 5–7 giorni | Conferma dei movimenti bancari sospetti, tabulati del telefono privato, arresto a fine campagna |
| Evasione fiscale di Tachibana (l'allibratore) / locale Kōrin (il suo bar-ristorante a Gion) | **Polizia Tributaria (Kokuzei)** di Kyoto | 2–3 settimane | Conti tracciati, fascicolo aperto, sequestro dei beni post-mortem |
| Combattimenti clandestini / scommesse illegali | **Sezione Crimine Organizzato** della Polizia Prefetturale | Si raccorda per il blitz al capannone (22/02) | Coordinamento tattico, supporto al climax |
| Pratiche fiscali di Murakami (il veterinario), debiti, società del Lake Biwa | **Polizia Tributaria (Kokuzei)** | 2–3 settimane | Storico dell'investimento fallito documentato, conferma dell'azzeramento del debito a gennaio '98 |
| Catena societaria Kameoka Nōji KK (la società di comodo) / Tachi Yūichirō (la testa di legno) | **Sezione Frodi Societarie** + Camera di Commercio | 5–10 giorni | Mappa della proprietà sostanziale fino a Saitō, supporto al fascicolo accusatorio |
| Pistola illegale Tokarev di Ōkubo (l'usuraio, a casa sua) | **Sezione Armi** | Archiviata in faldone, nessuna azione separata | Contestazione minore in sede processuale |
| Truffa delle scommesse (il gallo sedato di gennaio '98) | **Sezione Frodi** | 1–2 settimane | Quadro accusatorio per concorso, utile in tribunale |

**Procedura operativa per i PG**: redigono un memo di trasmissione con i dati raccolti e lo trasmettono alla squadra competente tramite il commissario Taniguchi (il loro capo), che passa da Watanabe Hideo (il procuratore) quando serve un'autorizzazione. Le squadre lavorano in parallelo. Il GM restituisce gli esiti narrativamente (per esempio: *"Ispettore, dagli Affari Interni: confermato il pagamento mensile a Inagaki, ¥200.000 in contanti dal conto della Kameoka Nōji"*) al momento opportuno.

**Nota GM**: questa struttura serve a **proteggere i PG dalla dispersione**. I giocatori che vogliono "indagare anche su Inagaki / il Kokuzei / le società" vanno reindirizzati al delegare. Il caso degli omicidi ha già densità sufficiente per la campagna.

---

## Sistema dei combattimenti clandestini

- **Frequenza**: 1 incontro al mese.
- **Convocazione**: annuncio pubblicitario del _ristorante di copertura_ (sempre lo stesso, il Kameoka-tei) sul **Kyoto Shimbun** (il quotidiano di Kyoto).
- **Codice**: il giorno della "promozione speciale" = la data del combattimento, ore 23:00 al capannone di Kameoka.
- **Codice dei combattimenti**: il "menu sconti" elenca i 7 combattimenti della serata — piatto = combattimento, le due salse = i due galli, lo sconto % = la quota dello sfidante (vedi il punto 4 per come si legge).
- **I galli hanno un nome e una carriera**: i nomi tornano di mese in mese. Un gallo che vince resta in cartellone e la sua quota si abbassa; uno che perde sparisce (morto o ritirato) e al suo posto compare un nome nuovo. **Confrontando i quattro annunci vecchi archiviati da Tachibana si legge la storia dei galli** — ed è così che salta all'occhio l'anomalia di gennaio: il gallo di casa, che vinceva da mesi, perde contro uno sfidante dato 3 a 1.
- **Durata della serata**: ~3,5–4 ore (23:00 → 02:30/03:00).
- **Ristorante**: dipendenti onesti e ignari. Gestione tramite testa di legno. Dietro: il gruppo criminale locale (il Nitōgun) che organizza i combattimenti.

### Come ci si arriva (e la traccia che lascia) — filone investigativo

Il capannone è a 6 km dal centro di Kameoka, su una sterrata senza lampioni. Nessuno ci arriva a piedi, e **quasi nessuno ci arriva con la propria auto fino alla porta**: farsi vedere lì con la macchina targata è esattamente ciò che questa gente vuole evitare.

- **In autobus**: chi viene da Kyoto prende la corriera della Kyoto Kōtsū fino al centro di Kameoka. **Al capolinea lo aspetta un gregario del Nitōgun** che lo carica in auto e lo porta al capannone. È quello che facevano Tachibana (l'allibratore) e i prestanome. → *Traccia*: **l'edicolante del capolinea di Kameoka** ricorda l'uomo elegante col cappotto di cammello che l'11/02 pomeriggio è salito su una berlina scura — un altro filo che porta a Hayashi (il braccio destro).
- **In treno**: molti arrivano alla stazione JR di Kameoka.
- **In taxi**: e qui c'è la traccia migliore. La gente lascia la macchina in un parcheggio del centro (o alla stazione) **e poi prende un taxi**, per non farsi vedere con la propria auto. La compagnia locale, la **Hozu Taxi** (保津タクシー, sei vetture, a conduzione familiare), nelle notti dei combattimenti **fa in una sola notte le corse di due settimane** (una trentina contro le due scarse di una notte qualunque), tutte verso la stessa direzione fra le 22:00 e le 23:30, con i rientri fra le 02:30 e le 03:40.
  → *Traccia*: il **registro corse della Hozu Taxi** (handout) è un documento pubblico e innocuo che nessuno ha pensato a nascondere. Confrontato con le date degli annunci sul giornale, disegna il calendario dei combattimenti **senza bisogno di decifrare il codice**: un sabato al mese in cui una compagnia di paese lavora come a Capodanno. I tassisti non sanno niente e parlano volentieri: *«Li scarichiamo all'incrocio della sterrata, mai davanti. Pagano in contanti e non vogliono la ricevuta.»*
- **Le auto che arrivano davvero al capannone** stanno nel parcheggio sterrato sul retro (~30 posti) e vengono **coperte con teli scuri**: sono quelle degli organizzatori e dei clienti più grossi.

---

## Indizi materiali addosso a Tachibana (l'allibratore, la vittima)

- Cellulare NTT DoCoMo (la compagnia telefonica): nessuna rubrica, solo il registro delle 10 ultime chiamate (elenco al punto 22: Murakami il veterinario, Mariko l'amante, il Kameoka-tei, il Kōrin, i 3 prestanome, Inoue e Tanaka Shōji i clienti, Hayashi il braccio destro).
- Taccuino: pagine vecchie strappate. Restano il combattimento di gennaio '98 (in codice) + gli appunti sul prossimo incontro.
- Copia del **Kyoto Shimbun** (il quotidiano) con l'annuncio del ristorante, nella tasca della giacca.
- Due biglietti di sola andata della Kyoto Kōtsū (la compagnia degli autobus), Kyoto ↔ Kameoka (non treno, non auto); conto dello Shin-Miyako Hotel (l'albergo davanti alla stazione) dell'11/02 sera.
- Portafoglio Bottega Veneta con ¥180.000 in contanti (non è una rapina).
- Tessera del Club Aoyagi (il locale di hostess a Kiyamachi), biglietto da visita con la foto della hostess «Mari», ricevuta del Royal Hotel Karasuma (albergo del centro), polaroid di una donna in kimono.
- Blister di Lexotan (ansiolitico).
- Chiavetta di una cassetta di sicurezza (targhetta n. 0419) nascosta sotto la suola → vedi la sezione qui sotto.

## La cassetta di sicurezza (la chiavetta n. 0419)

**Dov'è**: **Sanwa Bank, filiale di Gion** — la banca dove Tachibana (l'allibratore) aveva il conto (è la stessa della sua carta di credito JCB). Il numero sulla targhetta, 0419, è il numero della cassetta; **non c'entra col codice 0418 della cassaforte di casa** (che è il compleanno dell'amante).

**Come si apre.** In Giappone una cassetta di sicurezza in banca (*kashikinko*) si apre solo con **tre cose insieme**:
1. la **chiavetta** (ce l'ha la polizia: era sotto la suola della scarpa del morto);
2. il **sigillo personale registrato** — l'*inkan*, il timbrino con cui in Giappone si firma tutto: quello depositato in banca all'apertura della cassetta. **È nello schedario dell'appartamento di Fushimi, cassetto 4, con i documenti personali**: senza quello la banca non apre, e i PG devono trovarlo;
3. **un titolo per aprirla**, e qui i PG hanno due strade:
   - **Mandato di sequestro** (Taniguchi → il procuratore Watanabe → il giudice). Non è un atto urgente come una perquisizione su un omicidio: **ci vogliono 2-3 giorni**, più un giorno per l'appuntamento in banca.
   - **Setsuko** (la moglie separata, erede universale per il testamento del '95): può chiedere lei l'apertura come erede. Più veloce, **ma solo se i PG se la sono guadagnata** — e la banca vuole comunque il certificato di morte e un paio di giorni di pratica.

   **Non si apre il giorno stesso, in nessun caso**: è un premio da metà-fine avventura, non una scorciatoia iniziale.

**Cosa c'è dentro**:
- **¥35 milioni in contanti** — la ricchezza vera dell'allibratore, quella che non passa dai conti. Fa scattare il fascicolo della **Polizia Tributaria (Kokuzei)** e il sequestro dei beni.
- **Il libro mastro vero del giro**: cinque anni di scommesse, in chiaro, **coi nomi per esteso** — clienti, cifre, date, quote, quanto entrava e quanto usciva. È il documento che manda giù tutto il giro delle scommesse e che dà ai PG i sei clienti in un colpo solo, quelli che non erano nel cellulare compresi.
- **Non c'è niente che incastri Saitō per gli omicidi**: Tachibana era prudente e teneva il giro, non la banda.

**Bonus investigativo**: la banca conserva il **registro degli accessi** alla cassetta. Tachibana ci è andato **il 2 febbraio**, nove giorni prima di morire: la mattina in banca, la sera a cena al Club Aoyagi col «tipo sui trent'anni con le sneaker» (Hayashi, il braccio destro). Stava mettendo al sicuro l'incasso di gennaio: la prova che non aveva capito di essere stato scoperto.

## Indizi: dove si trovano le copie del Kyoto Shimbun (il quotidiano col codice)

- **Casa di Tachibana** (l'allibratore, a Fushimi): copie di ottobre, novembre, dicembre '97 e gennaio '98 (l'archivio dell'allibratore).
- **Clinica di Murakami** (il veterinario, a Yamashina): 1 sola copia, quella del **9 febbraio 1998** (annuncio "promozione del 22/02"). Sul ripiano della scrivania.
- **Casa di Ōkubo** (l'usuraio, a Kamigyō): copia di gennaio '98 con un cerchio sul combattimento truccato.
- **Altri criminali coinvolti**: una copia presente in ognuna delle loro case.


====================================================================================================

# PARTE 2 — INIZIO: L'INCARICO (scena di apertura, ganci per i 5 personaggi giocanti)

# Inizio — L'incarico (giovedì 12 febbraio 1998, ore 08:00)

> Scena 0, per il GM. Come nelle altre avventure della serie: il **commissario Taniguchi** (il capo dei PG) assegna il caso, **Yamada** (l'agente che accompagna la squadra) porta i fatti della notte, **Ito** (il capo della scientifica) i reperti. I quattro materiali dell'apertura (H-01…H-04 del `PIANO_HANDOUT_IMMAGINI.md`) si consegnano qui. Schede dei PNG fissi: `../png notevoli/`; ente: `../Materiale/Scheda_Distretto.md`.

---

## La notte prima (cosa è già successo senza i PG)

- **21:21** Tachibana Eiji (la vittima, allibratore) muore nel cubicolo centrale del bagno al 3° piano della Kyoto Station (la stazione centrale di Kyoto); alle 21:22 Kuroda Ryō (il sicario, che fugge in auto con Hayashi Tomoki, il braccio destro della banda) esce dal bagno · **22:01** Watanabe Toshio (il testimone del cubicolo accanto, sotto shock) esce, vomita, corre al Kōban (il posto di polizia dentro la stazione) · **22:08** prima pattuglia · **22:35** arrivano Ito Daisuke con la Kanshiki-ka (la polizia scientifica) e l'agente Yamada Tetsuo per la Sezione Omicidi
- Nella notte: rilievi del bagno (i fori sulla porta, l'impronta di una scarpa Asics, il disegno col sangue fotografato prima che si secchi), reperti dalle tasche, la **Toyota Crown** (la berlina di lusso della vittima) trovata al parcheggio multipiano grazie alle chiavi in tasca (nel bagagliaio: gabbia vuota, piume e sangue secco di gallo), prima deposizione di Watanabe Toshio (il testimone) al Kōban
- **Il bossolo sotto l'orinatoio sfugge al primo giro**: lo trova chi torna a cercare bene — i PG al sopralluogo, o Ito (la scientifica) al secondo giro se glielo chiedono (gli indizi si danno sempre: niente tiro)
- Al mattino Yamada (l'agente) ha già avvisato la moglie separata della vittima, Setsuko, a Maizuru (città di mare a 95 km, 2 ore di treno): arriva in giornata

## Il briefing — Centrale di Kawaramachi 85, 2° piano

**Taniguchi** (il commissario, capo della squadra) dà i fatti nell'ordine in cui sono emersi, senza ipotesi (Manuale GM: briefing asciutto):

> *«Sedetevi. Ieri sera, 21:21, bagno maschile del terzo piano della stazione, lato Hachijō. Tre colpi attraverso la porta di un cubicolo. La vittima: Tachibana Eiji, 47 anni, gestore di un locale a Gion, incensurato. Nessuna rapina: in tasca aveva centottantamila yen. Un testimone nel cubicolo accanto ha sentito tutto e non ha visto niente. E prima di morire l'uomo ha disegnato qualcosa sul pavimento col proprio sangue. Ito ve lo mostra. Voglio un rapporto stasera. I mandati li chiedo io al procuratore Watanabe — quando avrete qualcosa che regga.»*

*(Per i giocatori: «lato Hachijō» è l'uscita sud della stazione; «Gion» è il quartiere dei locali e delle geisha.)*

- **Yamada** (l'agente che accompagna la squadra) racconta la notte: il Kōban (il posto di polizia della stazione), Watanabe Toshio (il testimone) «che tremava come una foglia», la Crown, le chiavi. È a disposizione: guida, convoca, porta documenti. *(Non serve un tiro per dargli ordini: è il suo lavoro.)*
- **Ito** (il capo della Kanshiki-ka, la scientifica) consegna i reperti e le foto, e dice una sola cosa che non è un dato: *«Il disegno non è casuale. Ha usato l'indice destro, con calma, mentre moriva. Cosa sia, non lo so.»* Le analisi le chiede il distretto (tempi: `Scheda_Distretto`): impronte 12 h, balistica sui fori 48-72 h, identificazione dei 10 numeri del cellulare 24 h con ordine del procuratore.
- **Watanabe Hideo** (il procuratore — da non confondere con Watanabe Toshio, il testimone) non c'è mai: i mandati arrivano per fax, tramite Taniguchi, quando le prove reggono (perquisizione dell'appartamento di Fushimi, il quartiere a sud dove viveva la vittima: con prove concrete arriva in giornata).

## I quattro materiali dell'apertura

1. **Verbale del Kōban** (il posto di polizia della stazione) — H-01: intervento 22:08, stato della scena
2. **Verbale reperti della Kanshiki-ka** (la scientifica) — H-02 + foto: porta coi 3 fori, impronta, disegno; effetti personali (cellulare, taccuino, il quotidiano Kyoto Shimbun del 9/02, due biglietti della Kyoto Kōtsū — la compagnia degli autobus — per Kameoka, conto dello Shin-Miyako Hotel, polaroid, biglietto da visita di una hostess, ricevuta del Royal Hotel, blister di Lexotan, chiavetta n. 0419, ¥180.000)
3. **Prima testimonianza di Watanabe Toshio** (il testimone) — H-03: la sequenza al secondo
4. **Scheda anagrafica della vittima** — H-04: la facciata pulita

## Le strade aperte (il GM non le suggerisce: le prendono loro)

Il cellulare (10 numeri da identificare) · il giornale piegato in tasca · i biglietti dell'autobus per Kameoka (la cittadina di campagna a 28 km a ovest) · la Crown col bagagliaio sporco di piume · Watanabe Toshio (il testimone) da risentire con tatto · Setsuko (la moglie separata) e il locale Kōrin (il bar-ristorante della vittima a Gion) · la hostess del biglietto da visita · il disegno (archivio storico → Gonda, l'archivista della Centrale; Crimine Organizzato → Tachibana Mitsuru, ispettore, parente lontano della vittima e solo omonimo di cognome; un esperto di combattimenti) · l'appartamento di Fushimi (serve il mandato).

## Il calendario che corre (se i PG non intervengono)

| Quando | Cosa |
|---|---|
| ven 13/02, ~14:00 | Murakami Saburō (il veterinario complice) ucciso nel retrobottega del suo studio a Yamashina, con la xilazina (sedativo per grandi animali) — se i PG arrivano da lui il 12, possono salvarlo |
| sab 14/02, 22:30 | Ōkubo Kenji (l'usuraio, prestanome consapevole) ferito nel parcheggio del suo condominio a Kamigyō (quartiere nord) da Kuroda Ryō (il sicario) |
| dom 15/02 | Ōkubo (l'usuraio, ricoverato al Kyoto University Hospital) cosciente, interrogabile in ospedale |
| dom 15/02, sera | Le due veglie funebri alla stessa ora: Tachibana (la vittima) a Fushimi — con Setsuko, la moglie separata, e Mariko, l'amante, in fondo alla sala se nessuno la ferma — e Murakami (il veterinario) a Yamashina. I PG scelgono dove stare |
| mar 17/02, ~18:00 | Kuroda (il sicario) in ospedale col carrello del catering, per finire Ōkubo: l'esito è dei PG |
| dom 22/02, 23:00 | Combattimento clandestino al capannone di Kameoka: il blitz |

---

## La squadra in questo caso — ganci per i 5 PG

*Spunti per il GM, a sua discrezione. Le meccaniche dei Kage restano nei dossier `../pg/Kage/`.*

### YAMAMOTO Kenji — il capo (Ispettore Capo, 42)
- **Cosa gli serve qui**: l'Enja **Tanaka Shuichi** (il suo contatto: giornalista del Kyoto Shimbun, il quotidiano di Kyoto) è la scorciatoia sugli annunci del Kameoka-tei (il ristorante di copertura della banda) — l'archivio, chi paga le inserzioni (l'agenzia Sakura Kōkoku di Osaka), le voci su Kameoka: una volta gratis, la seconda chiede la soffiata. Le Senmon *Ambienti yakuza* e *Stampa e media* servono entrambe (la scissione degli anni '80 da cui nasce il Nitōgun, la banda; i tabloid da tenere lontani da Watanabe Toshio, il testimone). Gou: **Pugno di Ferro** su Hayashi (il braccio destro), il punto crollabile; **Teatro delle Ombre** nel bagno vale solo fino alle 21:21 del 13/02 (48 ore)
- **Il Kage bussa**: vive a Fushimi — lo stesso quartiere di Tachibana (la vittima) e di Kuroda (il sicario). Giovedì 12 e martedì 17 sono i giorni di Takeshi (suo figlio): alle 18:00 del 17 c'è l'ospedale. La scena del bambino in centrale (copione Y-2) cade lì da sola

### HONDA Ryota — la scena del crimine (Sergente, 35)
- **Cosa gli serve qui**: Lucidità 7 sul bagno. Gou **Occhio della Gru** (il bossolo sotto l'orinatoio, la piuma sulla scarpa), **La Brace che Resta** (entro 48 ore: paura crescente, poi una determinazione fredda), **Cuore di Ghiaccio** (il retrobottega di Murakami, il veterinario). La Senmon *Sport e scommesse* è il suo mondo: legge da solo gli «sconti» dell'annuncio come quote. L'Enja **Oda Takumi** (il suo contatto: ricettatore, ha un bar a Gion): chi vende Makarov e Tokarev (pistole sovietiche) a Kyoto, e le voci sui galli di Kameoka
- **Il Kage bussa**: deve ¥2 milioni a un allibratore che si chiama **Murakami**. Quando nel registro del cellulare compare «Dr. Murakami Saburō, veterinario», lo stomaco gli si chiude — non è lui (solo il cognome), ma per un giorno non può saperlo. Un giro di scommesse indagato dalla sua squadra è **il suo** giro: Goto (l'uomo a cui deve i soldi) può sedersi al bancone del Kōrin o del Club Aoyagi (copione H-3), e Fujita lo sta leggendo. Dichiarare il conflitto a Taniguchi costa la faccia; tacerlo è la prima Shimi

### NAKAMURA Shota — gli interrogatori (Ispettore, 38)
- **Cosa gli serve qui**: le stanze chiuse sono sue — Watanabe Toshio (il testimone: tatto), Nishimura (il cameriere prestanome: lealtà), Tachi Yūichirō (la testa di legno del ristorante: la leva è la moglie), Hayashi (il braccio destro: il crollo), Saitō (il capo: il muro che non cade). Gou **Ombra della Verità** su Inagaki (il sergente corrotto), **Porta Socchiusa** su Mariko (l'amante), **La Risalita della Carpa** su Hayashi. La Senmon *Interrogatorio* sblocca il setup. L'Enja **Nakamura Hideki** (il suo contatto: avvocato penalista, solo omonimo di cognome): come si costruisce l'immunità per Kimura (il dentista scommettitore), il patto per Hayashi, la visura della Kameoka Nōji KK (la società di comodo di Saitō)
- **Il Kage bussa**: il fratello Kazuo vive di espedienti — e Ōkubo (l'usuraio) presta a piccoli commercianti di Gion e Pontochō. Il nome **Nakamura Kazuo** (il fratello di Nakamura Shota) può stare nel quaderno dei prestiti di Ōkubo, a discrezione del GM: il miglior interrogatore della squadra che trova il fratello in un registro di usura

### SATO Yuki — le tracce (Agente Scelto, 27)
- **Cosa gli serve qui**: la **xilazina** (il sedativo veterinario per grandi animali). Con *Medicinali e veleni* capisce da solo, in clinica, che le boccette sono troppe per una clientela di gatti — e che cinque volte la dose letale non è un suicidio, prima ancora del referto. Il sangue del disegno, la piuma, il dialogo con Ito (la scientifica) sulla balistica. Gou **Palazzo della Memoria** (rivedere il bagno tre giorni dopo), **L'Ora Giusta**, **L'Istante della Caduta** (il campione che si degrada, il rullino Super 8 — pellicola amatoriale — in laboratorio). L'Enja **Kato Hiroshi** (il suo contatto): nel 1998 c'è poco da forzare, ma i registri della banca e della NTT (la compagnia telefonica) vivono su computer
- **Il Kage bussa**: **Tanaka Jirō** (lo zio di Sato, import-export a Osaka) — il mondo di Fujiwara Kentarō (cliente scommettitore, tessile a Osaka) e di Tanaka Shōji (cliente scommettitore, ex Kyocera: solo omonimo di cognome dello zio). La corruzione «elegante» può passare da lì: *«Conosco suo zio. Un uomo pratico.»* E la madre chiama in centrale nel momento sbagliato — il metronomo comico che il caso trasforma

### FUJITA Emi — la profiler (Ispettore, 36)
- **Cosa le serve qui**: le persone rotte — Watanabe Toshio (il testimone: il trauma), Mariko (l'amante: il dolore vero), Hiroko e Aiko (la moglie e la figlia del veterinario: la cautela), Hashimoto (il cliente ludopatico: il rischio suicidio), Saitō (il capo: il muro). Gou **Specchio dell'Anima**, **Tocco del Medico** (su Murakami, il veterinario: tremore, alcol, astinenza), **L'Eco della Montagna** nel bagno entro 48 ore: tre colpi, nessuna parola, il suono metallico dei bossoli. La Senmon *Mondo della notte* apre il Club Aoyagi (il locale di hostess) e la mama-san Reiko (la maîtresse che gestisce le ragazze); *Copertura e travestimento* apre il capannone dall'interno. L'Enja **Morita Akiko** (il suo contatto) lavora all'Istituto di Medicina Legale dell'Ospedale Universitario: il referto di Murakami prima del canale ufficiale, un occhio in più sulla stanza 412
- **Il Kage bussa**: Iwamoto «colleziona persone» — e in questo caso due clienti facoltosi (Tanaka Shōji e Fujiwara) offrono favori ai PG. Iwamoto può comparire ai margini (cliente del Kōrin, conoscente di Tanaka Shōji) e salutarla per nome davanti alla squadra: copione F, situazione A3

---

## Materiale da tavolo

- **Schede PG**: `../pg/SCHEDE_PG_TUTTE.docx` (armi già alla v3.1: revolver New Nambu 4/2/5 danno 4, keibō — il manganello — 2/2 danno 2, Lotta 1). Le armi restano nell'armadietto: si prelevano firmando — per l'arresto di Kuroda e per il blitz
- **Scontro**: `../Combattimento/Scheda_Giocatori_Combattimento.html` (v3.1). Le scene possibili: l'arresto di Kuroda (`Luogo_Casa_Kuroda_Fushimi`), l'ospedale del 17/02, il blitz del 22/02 (`Luogo_Capannone_Kameoka`). Statistiche dei PNG nelle rispettive schede
- **Distretto**: `../Materiale/Scheda_Distretto.md` — Organico 8 · Efficienza 7 · Velocità 6 · Risorse 8 · Rete 7 · **Corruzione 5**: si tira solo quando l'operazione tocca interessi sensibili, e qui succede: Fujiwara e Tanaka Shōji (i clienti facoltosi) hanno amici; Inagaki (il sergente corrotto di Kameoka) ha il telefono di Saitō
- **Chi era dove, En iniziali, deposizioni pronte (D-01…D-24), interruttori**: `PNG/PNG_Quadro_Alibi_En.md` — il dettaglio in ogni scheda PNG (*Alibi · Come si comporta · Deposizione · En · Come cambia nel tempo*)
- **Handout e immagini**: `PIANO_HANDOUT_IMMAGINI.md`


====================================================================================================

# PARTE 3 — SCHEDE DEI PERSONAGGI NON GIOCANTI (16 file)

# Aoyagi Mariko — Amante della vittima

> Hostess senior al Club Aoyagi in Kiyamachi-dōri. Relazione con Tachibana (vittima) da 18 mesi.

## Anagrafica
- **Nome**: Aoyagi Mariko (青柳 真理子, nome d'arte **Mari** al club)
- **Età**: 29 anni
- **Residenza**: appartamento a Sakyō-ku, affitto pagato in parte da Tachibana (vittima)
- **Lavoro**: hostess senior al **Club Aoyagi**, locale di alto livello a Kiyamachi
- **Stato civile**: single, nessuna relazione ufficiale oltre Tachibana (vittima)

## Aspetto e personalità
1,65 m, snella, capelli lunghi neri, lineamenti delicati. Trucco professionale impeccabile. Veste eleganti, scarpe firmate. Intelligente, parla bene anche di politica e attualità (è la sua "tecnica di hostess"). Riservata sui propri sentimenti ma sinceramente legata a Tachibana (vittima) — sperava in un futuro insieme una volta che lui avesse divorziato.

## Ruolo nella vicenda
- **Non è coinvolta** nella truffa né negli omicidi
- Sapeva del lavoro di allibratore del compagno (lui le aveva accennato in modo vago, "scommesse private")
- **Non sa** del Nitōgun né del capannone
- Conosce il codice della cassaforte di Tachibana (**0418**, suo compleanno)
- Ha lasciato il messaggio in segreteria delle 22:14 dell'11/02 ("Ei-chan dove sei?")

## Alibi

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 sera | Al Club Aoyagi dalle 19:00 (preparazione) alle 02:00; il locale apre alle 20:00 | Vera | Registro presenze delle hostess, la mama-san Reiko, due colleghe, i clienti del tavolo 4. La telefonata delle 22:14 alla segreteria di Fushimi è partita dal telefono del club |
| 13/02 pomeriggio | A casa fino alle 14:00 (dorme), parrucchiere alle 16:00, al club dalle 19:00 | Vera | Il parrucchiere di Sakyō; la mama-san |
| 14/02 sera | Al club (sabato, sala piena) | Vera | Registro, colleghe |
| 17/02 sera | Al club | Vera | Registro |

## Come si comporta
- **Primo contatto**: cauta, cortese, da hostess: risponde con domande («chi vi ha dato il mio nome?»). Protegge la propria reputazione e quella della vittima
- **Sotto pressione**: non si scompone, ma dice sempre meno. Se le si fa capire che la relazione può diventare pubblica, chiama lo zio Aoyagi Hiroshi (proprietario del club) e da quel momento parla solo con lui presente
- **Si apre se**: la polizia sa già della relazione e glielo dice senza giudicarla. Allora collabora pienamente: piange in modo controllato, identifica oggetti e foto, ricostruisce le abitudini di Tachibana (vittima). Il codice della cassaforte lo dà solo a chi glielo chiede direttamente e ha almeno En +1
- **Si chiude se**: le si chiede dei soldi come se fosse una sospettata, o se qualcuno usa la parola «mantenuta»
- Risponde meglio a una PG donna o a chi ha tatto

## Cosa sa
- Abitudini quotidiane di Tachibana (vittima)
- Frequentazioni private (alcuni nomi: Hayashi le suonava familiare, "amico d'affari di Ei-chan")
- Esistenza di una cassetta di sicurezza in banca (Tachibana (vittima) l'aveva accennata, lei conosce la **chiavetta**)
- Codice cassaforte appartamento Fushimi: **0418**
- Tachibana (vittima) negli ultimi 2-3 mesi era **più rilassato del solito** (post-truffa di gennaio)
- Tachibana (vittima) l'ultima settimana era **leggermente preoccupato** ma non spaventato (segno che non sapeva ancora di essere stato scoperto)

## Cosa nasconde
- Tachibana (vittima) le aveva dato ¥2 mln in contanti "in caso di emergenza" (li tiene in casa)
- Aveva ricevuto da lui un **anello di fidanzamento informale** (Cartier) due settimane prima dell'omicidio: prova che lui pensava davvero al divorzio
- Una piccola gelosia repressa verso la moglie legale Setsuko

## Punto debole
- Il **dolore sincero** per la morte
- La paura di rappresaglie (dopo la morte di Murakami (veterinario) il 13/02 capisce che il giro è pericoloso e si terrorizza)
- L'**ipoteca sulla sua reputazione** (è hostess, può perdere clienti se la sua relazione diventa pubblica)

## Valore investigativo
- **Codice cassaforte**: la rende centrale per accedere ai documenti chiave nell'appartamento di Tachibana (vittima)
- **Profilo psicologico** della vittima: aiuta i PG a capire perché Tachibana (vittima) fosse tranquillo nelle ultime settimane
- **Conferma** indiretta dei contatti con Hayashi

## Note operative GM
- Nel portafoglio di Tachibana (vittima) c'è il suo **biglietto da visita con foto** («Mari», Club Aoyagi): i PG arrivano a lei subito. La polaroid di spalle resta la conferma da chiedere a lei
- **Possibile bersaglio indiretto**: dopo il 14/02, se il Nitōgun teme che lei sappia troppo, può essere intimidita
- I PG possono offrirle protezione → la conquistano come alleata
- Se ignorata, può sparire (tornare a casa dei genitori in Hokkaidō) e portarsi via il codice cassaforte: ostacolo alle indagini

## Deposizione — D-06 (a casa sua a Sakyō o in Centrale, dal 13/02; verbalizza Yamada, lei chiede che ci sia una donna)
> «Mi chiamo Aoyagi Mariko, lavoro al Club Aoyagi, a Kiyamachi, con il nome di Mari. Conoscevo il signor Tachibana da circa due anni; da un anno e mezzo stavamo insieme. Sì, era sposato — separato. Lui pagava una parte del mio affitto, non lo nascondo. Mercoledì ero al lavoro dalle sette di sera alle due; l'ho chiamato alle dieci e un quarto perché non si era fatto sentire, ha risposto la segreteria. L'ho saputo il giorno dopo dalla televisione; alla mama-san ho detto che stavo male. Eiji gestiva il Kōrin. Aveva un giro di scommesse, private, tra amici — così le chiamava lui; non ho mai chiesto di più e lui non raccontava. Negli ultimi due mesi era tranquillo, più del solito, rideva. L'ultima settimana era un po' preoccupato, ma non spaventato: se avesse avuto paura me ne sarei accorta. Gli amici li conosco poco: un Hayashi, "un amico d'affari", lo chiamava così, sui trent'anni, sportivo — hanno cenato al club il 2 febbraio. Vi prego di non far uscire il mio nome: nel mio lavoro basta una voce.»

Omette: i ¥2 mln in contanti che tiene in casa; l'anello Cartier; che conosce il codice della cassaforte (0418) e che ha dormito a Fushimi. Non mente su nulla di ciò che dice.

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | 0 | Autorità: educata e distante, come con un cliente importante |
| Honda | −1 | Brusco. E se ha già visto Goto al bancone del club accanto a lui (copione H-3), lo considera «uno che frequenta» — non un poliziotto |
| Nakamura | +1 | Paziente: è lui che ottiene la cena del 2 febbraio senza chiederla |
| Sato | 0 | Giovane: lo gestisce con la tecnica da hostess, gentile e impenetrabile |
| Fujita | +2 | Una donna che conosce il mondo della notte (*Mondo della notte*) e non la giudica: con lei dice tutto, codice compreso |

Con gli altri: Tachibana (vittima) **+4** · Tachibana Setsuko (moglie separata) −1 (gelosia repressa), −2 dopo la veglia · la mama-san Reiko +2 · lo zio Aoyagi Hiroshi +1 · Hayashi Tomoki: 0 finché è «l'amico d'affari», **−3** quando capisce chi è · Nishimura Tatsuya (cameriere del Kōrin) +1: la serviva senza far domande.

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 12/02 | Lo apprende dal TG di mezzogiorno. Va al lavoro lo stesso la sera: «non posso perdere la serata». Piange nel bagno del club | — |
| 13/02 | I PG arrivano dal biglietto da visita «Mari»: prima cauta, poi collabora (D-06). Dà il codice 0418 solo a chi glielo chiede in faccia con En ≥ +1 | come sopra |
| 15/02 sera | Vuole andare alla veglia di Fushimi: in nero, in fondo. Se ci va, incrocia Setsuko (vedi la scheda di Setsuko). Ne esce distrutta | — |
| 15/02 (le notizie: il veterinario ucciso, l'usuraio ferito) | Capisce che «il giro» ammazza. Terrore: se ha un numero diretto dei PG, chiama quella sera stessa | — |
| Se i PG hanno sentito Hayashi o Saitō entro il 15/02 e Hayashi è libero | 16/02 notte: una telefonata muta e un passero morto sullo zerbino (lo stile degli «avvisi» di Saitō). Il 17/02 mattina è in partenza per Sapporo, salvo che qualcuno la sorvegli | — |
| 16/02, **senza protezione** | Compra un biglietto per Sapporo (18/02), dice alla mama-san «un mese dai miei». Si porta via il codice e i ¥2 mln: i PG la ritrovano solo per telefono, in Hokkaidō | −1 |
| 16/02, **con protezione** (pattuglia sotto casa, o un PG che risponde al telefono) | Resta. Mostra l'anello, i ¥2 mln, la polaroid; riconosce Hayashi in foto: «l'uomo della cena del 2 febbraio» | +2 |
| Dal 22/02 | Se è rimasta, testimonia sulla relazione e sulla cena con Hayashi. Poi chiede ai PG cosa deve fare dei ¥2 mln — «sono miei o sono una prova?» — e parte comunque per Sapporo | — |

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[Luogo_Appartamento_Vittima_Fushimi|Appartamento di Tachibana Eiji — Fushimi]]
- [[Luogo_Club_Aoyagi_Kiyamachi|Club Aoyagi — Kiyamachi]]

---

# Clienti scommettitori — 6 PNG

> Sei clienti abituali di Tachibana (vittima). Solo due (Inoue, Tanaka Shōji) compaiono nel registro delle 10 ultime chiamate del cellulare; gli altri quattro si raggiungono per altre vie (Storia, punto 30). **Nessuno è coinvolto direttamente negli omicidi**. Sono fonti investigative e potenziali corruttori dei PG.

---

## 1. Hashimoto Daisuke — Salaryman indebitato

- **Età**: 38 anni
- **Lavoro**: middle manager in azienda elettronica a Osaka
- **Stato civile**: sposato, moglie incinta del primo figlio
- **Profilo**: ha perso ¥12 mln nelle scommesse degli ultimi 2 anni. Sull'orlo del fallimento personale e familiare. Ludopatia conclamata.
- **Alibi 11/02**: a casa con la moglie, alibi semplice
- **Se interrogato**: piange, confessa la dipendenza, collabora pienamente. Non ha nulla da perdere.
- **Cosa sa**: il sistema delle scommesse, alcuni nomi in codice, **non** la posizione del capannone (scommetteva tramite telefono)
- **Valore**: utile per ricostruire la mappa dei codici nel taccuino di Tachibana (vittima)
- **Pericolo**: rischio di **suicidio** se la moglie scopre tutto. I PG dovrebbero indirizzarlo a un servizio di sostegno.

---

## 2. Fujiwara Kentarō — Collezionista di Osaka

- **Età**: 56 anni
- **Lavoro**: imprenditore tessile, ricco, scommettitore di alto livello
- **Stato civile**: sposato, due figli adulti
- **Profilo**: scommette per passione, non per dipendenza. Considera i combattimenti di galli un'antica tradizione. Possiede galli di linea pura, non li mette però mai in gara.
- **Alibi 11/02**: cena d'affari a Osaka, testimoni multipli
- **Se interrogato**: cordiale ma altezzoso. **Nega** di scommettere illegalmente, sostiene di "frequentare un circolo culturale di appassionati". Si difende con un avvocato di alto livello.
- **Cosa sa**: tutto del giro, conosce **Saitō personalmente** (sono in rapporti civili da anni). Mai stato al capannone — fa scommettere un suo segretario.
- **Tentativo di corruzione**: **molto probabile**. Offre ai PG "consulenze pagate" o donazioni a fondazioni vicine alle loro famiglie. Importi: ¥5–10 mln per investigatore.
- **Valore investigativo se collabora**: enorme (incastrerebbe Saitō). Se non collabora: muro di gomma.

---

## 3. Inoue Takeshi — Ristoratore di Pontochō

- **Età**: 49 anni
- **Lavoro**: proprietario del **ristorante "Hanaichi"**, kaiseki tradizionale a Pontochō
- **Stato civile**: vedovo, una figlia maggiorenne
- **Profilo**: scommette in modo controllato per intrattenimento. Considera Tachibana (vittima) un amico personale. Cordiale, parlerà volentieri.
- **Alibi 11/02**: al proprio ristorante per l'intera serata, decine di testimoni
- **Se interrogato**: collaborativo, addolorato per la morte di Tachibana (vittima). Racconta aneddoti utili a delineare il carattere della vittima.
- **Cosa sa**: **frequenta il capannone una volta ogni 3-4 mesi**, conosce di vista Hayashi e Saitō. Sa che le scommesse sono organizzate "da un gruppo di Kameoka", ma non conosce il nome Nitōgun.
- **Valore**: alto. Può **descrivere il capannone dall'interno** ai PG, indicando dove si tengono i combattimenti, come funzionano le scommesse, dove si trova l'arena.

---

## 4. Yoshida Mamoru — Imprenditore edile

- **Età**: 45 anni
- **Lavoro**: titolare di una piccola impresa edile a Uji
- **Stato civile**: sposato, 3 figli
- **Profilo**: scommette per cifre medie (¥200-500k a serata). Non particolarmente coinvolto.
- **Alibi 11/02**: cantiere edile diurno, sera a casa
- **Se interrogato**: nervoso, vuole evitare scandali per la famiglia e l'attività. Collabora se gli si garantisce discrezione.
- **Cosa sa**: poco. Conosce solo Tachibana (vittima), ha visto Hayashi due volte di sfuggita.
- **Valore**: medio-basso. Conferma la **dinamica delle scommesse telefoniche** ma non ha informazioni rare.

---

## 5. Kimura Akira — Dentista ludopatico

- **Età**: 42 anni
- **Lavoro**: dentista a Sakyō-ku, studio privato avviato
- **Stato civile**: sposato, 1 figlio
- **Profilo**: ludopatia conclamata. Ha perso ¥8 mln in 18 mesi. Ha iniziato a frodare assicurazioni dentistiche per coprire le perdite.
- **Alibi 11/02**: studio dentistico fino alle 19:30, poi a casa
- **Se interrogato**: sulle prime nervoso, poi racconta tutto in cambio di immunità sui suoi reati assicurativi (i PG dovranno valutare se accettare il patto)
- **Cosa sa**: il sistema delle scommesse, alcuni clienti tramite chat al capannone (è stato 5 volte). Conosce di vista Saitō.
- **Valore**: alto se i PG accettano il patto. Può **identificare** Saitō in una line-up.

---

## 6. Tanaka Shōji — Pensionato benestante

- **Età**: 67 anni
- **Lavoro**: ex dirigente Kyocera, in pensione dal 1994
- **Stato civile**: sposato, 2 figli adulti, 4 nipoti
- **Profilo**: scommette per nostalgia (sostiene che lo facevano i suoi nonni). Cifre alte. Importante figura sociale a Kyoto, conoscente di alcuni amministratori comunali.
- **Alibi 11/02**: a casa con la moglie, cena di famiglia, 6 testimoni
- **Se interrogato**: **calmo, paternalistico, manipolatore**. Dichiara apertamente di "frequentare un'antica tradizione culturale" e si difende citando precedenti storici.
- **Tentativo di corruzione**: **probabile**. Offre ai PG raccomandazioni, non denaro diretto. *"Conosco persone, posso aiutarvi nella vostra carriera"*. Stile signorile, difficile da rifiutare.
- **Cosa sa**: conosce Saitō (rapporto formale, "buongiorno-buonasera"). Frequenta il capannone 1-2 volte l'anno. Conosce un paio di politici locali coinvolti.
- **Valore**: alto se collabora. **Apre la porta a un'indagine politica più ampia**.

---

## Note operative GM

### Quale cliente parla?
- **Hashimoto** e **Inoue**: collaborano subito
- **Kimura**: collabora dopo patto giudiziario
- **Yoshida**: collabora poco, abbastanza
- **Fujiwara** e **Tanaka Shōji**: tentano corruzione, sono i nodi politici da gestire

### Tentativi di corruzione
- **Tanaka Shōji** offre raccomandazioni e accesso sociale (corruzione "soft")
- **Fujiwara** offre denaro tramite donazioni a enti vicini al PG (corruzione "elegante")

### Reazioni del Nitōgun
- Se i PG arrivano a Fujiwara o Tanaka Shōji, il Nitōgun si **agita molto** (sono i clienti più importanti)
- Possibile **escalation di intimidazioni** sui PG dopo questi colloqui

### Numeri di telefono
**Inoue e Tanaka Shōji** escono dal registro delle 10 chiamate (identificazione dei numeri alla NTT DoCoMo con ordine del PM, tramite Taniguchi); **Hashimoto e Kimura** dai prestiti di Ōkubo; **Fujiwara e Yoshida** dal Crimine Organizzato e dai registri del capannone dopo il 22/02.

---

## Al tavolo — alibi verificati, deposizioni, En, cosa fanno dopo

### Chi era dove l'11/02 sera (e come si verifica)

| Cliente | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| Hashimoto | A casa a Osaka con la moglie | Vera | La moglie (che non sa perché la polizia chiede) |
| Fujiwara | A cena a Osaka con quattro fornitori | Vera | I fornitori, il ristorante: alibi «da ufficio», arriva per fax |
| Inoue | Al ristorante Hanaichi, sala piena | Vera | Decine di clienti, il personale |
| Yoshida | Cantiere fino alle 17:00, poi a casa a Uji | Vera | Gli operai, la moglie |
| Kimura | Studio fino alle 19:30, poi a casa | Vera | L'assistente dello studio, la moglie |
| Tanaka Shōji | A casa: cena di famiglia per il compleanno della nuora, sei persone | Vera | Sei familiari, tutti pronti a giurarlo |

Nessuno dei sei c'entra con gli omicidi: gli alibi servono ai PG per **escluderli in fretta** e passare a ciò che sanno.

### Deposizioni (se un PG manda Yamada a prenderle)

**D-17 · Hashimoto Daisuke** (Centrale o Osaka, dal 16/02 — lo si trova dal quaderno di Ōkubo)
> «Hashimoto Daisuke, trentotto anni, responsabile acquisti in un'azienda di elettronica a Osaka. Sì. Scommettevo. Da due anni. Dodici milioni, ho fatto il conto stanotte. Con il signor Tachibana per telefono: lui mi dava i nomi dei galli e le quote, io dicevo la cifra, poi pagavo o riscuotevo tramite un uomo che veniva a Osaka il lunedì. I nomi dei galli erano nomi di piatti, come nel giornale; io segnavo tutto su un'agenda, ve la do. Al capannone non ci sono mai stato, non so nemmeno dov'è, so che è a Kameoka. I soldi li ho presi da Ōkubo, quattro milioni, al dieci per cento al mese. Mia moglie aspetta il nostro primo figlio a maggio. Non sa niente. Non deve saperlo. Se lo sa, io… vi prego. Ditemi cosa devo fare e lo faccio. Voglio solo che finisca.»
Omette niente. L'agenda è la chiave dei codici del taccuino (H-09) e dell'annuncio.

**D-18 · Fujiwara Kentarō** (Osaka, nel suo ufficio, con l'avvocato)
> «Fujiwara Kentarō, imprenditore, Osaka. Il mio avvocato è presente perché considero questa convocazione impropria. Conosco il signor Saitō da anni: rapporti civili, di affari tessili e di cultura. Faccio parte di un circolo di appassionati di avicoltura tradizionale — allevo galli di razza pura, non li faccio combattere, la legge lo vieta e io la rispetto. Che a Kameoka esistano serate di altro genere lo escludo; che le frequenti chi dice di conoscermi, non mi riguarda. Il signor Tachibana? Un nome che ho letto sul giornale. La sera dell'undici febbraio ero a cena a Osaka con quattro fornitori, il mio ufficio vi manderà i nomi. Sono a disposizione della giustizia; sono anche a disposizione, dico per inciso, di chiunque nella polizia di Kyoto abbia una fondazione benefica a cuore. Non è un'offerta. È una descrizione.»
Mente su tutto tranne l'alibi e Saitō. L'ultima frase è la corruzione «elegante», messa a verbale con impunità.

**D-19 · Inoue Takeshi** (al ristorante Hanaichi, Pontochō, dal 13/02)
> «Inoue Takeshi, ristorante Hanaichi, Pontochō. Eiji era un amico, veniva a mangiare qui da dieci anni, mi ha presentato mezza Gion. Sì, scommettevo con lui. Non ne vado fiero e non ne ho vergogna: cifre piccole, un divertimento, e ci sono andato, al capannone, tre o quattro volte l'anno. È a ovest di Kameoka, in mezzo ai campi, un capannone di lamiera grigia: dentro, all'ingresso due uomini a un tavolo prendono trentamila yen a testa; poi i banchi delle scommesse, quattro, con una lavagna delle quote — Eiji stava al secondo da sinistra, sempre lo stesso; poi l'arena, ottagonale, con la paglia e le gradinate di legno, e in fondo le gabbie. Quelli che comandano: uno magro con la sigaretta che sistema tutto, e un signore alto con i capelli grigi che non parla mai e a cui tutti si inchinano. I nomi non li ho mai chiesti. L'undici ero qui, la sala era piena, chiedete a chi volete. Eiji l'ultima volta l'ho visto il tre febbraio: era tranquillo. Vi do tutto quello che ricordo. Trovate chi è stato.»
Omette niente. Se gli danno carta e penna disegna la pianta del capannone (coincide con `Luogo_Capannone_Kameoka`).

**D-20 · Yoshida Mamoru** (Uji, nell'ufficio del cantiere, dal 17/02)
> «Yoshida Mamoru, impresa edile, Uji. Vi chiedo una cosa sola: che non lo sappia nessuno. Ho una famiglia e trenta operai. Sì, ho scommesso qualche volta, per telefono, con il signor Tachibana: duecento, cinquecentomila yen a serata, tre o quattro volte l'anno. Mi dava i nomi dei galli e le quote, io sceglievo, poi pagavamo o riscuotevamo con un incontro a Kyoto. Al capannone ci sono stato una volta, due anni fa, non ricordo la strada, era notte. Un uomo con la sigaretta, giovane, mi ha accolto; l'ho rivisto una volta a un caffè con Tachibana, a Kyoto. Basta, non so altro. L'undici ero a casa a Uji, il cantiere chiude alle cinque. Se posso aiutare senza comparire, lo faccio. Se devo comparire, chiamo un avvocato.»
Omette poco: sa che il giro era «di Kameoka» e non lo dice. Il caffè a Kyoto è una conferma in più dei contatti Hayashi–Tachibana.

**D-21 · Kimura Akira** (Centrale, dopo il patto scritto — Taniguchi → Watanabe Hideo (procuratore), 24–48 ore)
> «Kimura Akira, dentista, Sakyō. Il mio avvocato ha il vostro accordo scritto, quindi parlo. Ho perso otto milioni in un anno e mezzo. Per coprirli ho fatto cose con le assicurazioni che non rifarei, ed è per quello l'accordo. Scommettevo con il signor Tachibana, per telefono, e cinque volte sono andato al capannone, sempre di sabato, con un collega di Osaka che ora non conosco più. Lo trovo, se mi ci portate: da Kameoka centro verso ovest, poi una strada sterrata, un'insegna sbiadita di attrezzi agricoli. Il capo lo riconoscerei tra cento: alto, capelli grigi, gli manca un pezzo del mignolo sinistro — lo tiene nella tasca del cappotto, ma quando ha alzato il bicchiere l'ho visto. L'ha fatto il mese scorso, la sera in cui il gallo di casa ha perso: era l'unico a non essere sorpreso — o l'unico a saperlo nascondere. L'undici ero nello studio fino alle sette e mezza, poi a casa con mia moglie. I soldi li avevo presi da un usuraio di Kamigyō, Ōkubo, me lo aveva indicato un funzionario di banca a Kawaramachi.»
Omette niente, dopo il patto. Senza patto: «non conosco nessun Tachibana».

**D-22 · Tanaka Shōji** (a casa sua, salotto con vista sul giardino; viene solo se c'è Yamamoto)
> «Tanaka Shōji, sessantasette anni, già dirigente della Kyocera, in pensione. Ispettore capo, apprezzo che sia venuto lei di persona. I combattimenti di galli sono una tradizione dell'arcipelago da prima che esistesse la vostra Prefettura; mio nonno li seguiva a Kagoshima. Che oggi la legge la pensi diversamente, lo so. Ho assistito, sì, una o due volte l'anno, come si assiste a un rito. Ho puntato qualcosa, per onorare la serata. Il signor Tachibana raccoglieva le puntate, con discrezione ed eleganza: mi dispiace per la sua fine. Il signor Saitō lo conosco: buongiorno e buonasera, un uomo che ama la storia del Giappone. La sera dell'undici ero a casa con la mia famiglia, sei persone, per il compleanno di mia nuora. Vi dirò ciò che ricordo, con calma, nei tempi che l'età mi consente. E le dirò anche, ispettore, che conosco persone che stimano i funzionari capaci: se mai avesse bisogno di un consiglio sulla sua carriera, la mia porta è aperta.»
Omette: i due politici locali che ha visto al capannone (uno è quello delle riprese Super 8: lo riconoscerebbe, non lo dirà mai a verbale). L'ultima frase è la corruzione «soft».

### En

| Cliente | Yamamoto | Honda | Nakamura | Sato | Fujita | Perché |
|---|---|---|---|---|---|---|
| Hashimoto | +1 | +1 | +1 | +1 | +2 | Disperato: chiunque lo ascolti è un'ancora. Fujita è quella che chiama di notte |
| Fujiwara | −1 | −1 | −1 | −2 / +1 | −1 | Altezzoso con tutti. Con Sato una cortesia in più, velenosa: «conosco suo zio, un uomo pratico» (il Kage di Sato) — è +1 finto, e leva |
| Inoue | +1 | +1 | +1 | +1 | +1 | Cordiale, addolorato. +2 con chi gli promette di trovare l'assassino |
| Yoshida | 0 | −1 | 0 | 0 | 0 | Nervoso: +1 con chi gli garantisce discrezione, −2 con chi si presenta in cantiere davanti agli operai |
| Kimura | 0 | −1 | +1 | 0 | 0 | Tratta: Nakamura, che gli propone il patto, è l'unico che lo tiene calmo |
| Tanaka Shōji | 0 | −1 | −1 | 0 | 0 / −1 | Parla solo col capo, e prova a comprarlo. Se ha già incontrato Fujita da Iwamoto (il Kage di Fujita), la saluta per nome davanti alla squadra: −1 per lei |

Con gli altri: Hashimoto → Ōkubo −2, → Tachibana (vittima) −1 (lo ha rovinato, ma dà la colpa a sé) · Fujiwara → Saitō +1, → Tanaka Shōji +1 · Inoue → Tachibana (vittima) +2, → Sasaki Hideo 0 (si salutano al golf) · Kimura → Ōkubo −2 · Tanaka Shōji → Saitō +1, → Iwamoto +1 · Yoshida → tutti 0: vuole solo sparire.

### Cosa fanno dopo che i PG li hanno sentiti

| Cliente | Poi |
|---|---|
| Hashimoto | Consegna l'agenda (i codici). La notte stessa chiama un PG alle 02:00: «non ce la faccio». Se i PG lo hanno indirizzato a un sostegno (o al fratello) regge; se lo hanno sentito in casa davanti alla moglie, il 18/02 prende le pillole — sopravvive solo se qualcuno lo chiama quella sera |
| Fujiwara | Entro 24 ore telefona a Saitō: «è venuta la polizia di Kyoto». Da lì gli «avvisi» del Nitōgun. Entro 48 ore un'offerta a un PG: ¥5–10 mln come «donazione» a una fondazione vicina alla sua famiglia. Chi accetta ha un Kage nuovo; chi rifiuta riceve la lettera dell'avvocato |
| Inoue | Disegna la pianta, indica la strada su una mappa: dal 16/02 è la guida del blitz (da lontano). Dopo il 22/02 paga una multa e chiude il capitolo; manda un vassoio dell'Hanaichi in Centrale |
| Yoshida | Niente altro. Se il suo nome esce, rifiuta tutto e chiama l'avvocato |
| Kimura | Col patto: riconosce Saitō in un confronto di fotografie (la segnaletica degli anni '80) e, il 22/02, indica la strada. Il 19/02 riceve una telefonata muta nello studio: chiede protezione per moglie e figlio |
| Tanaka Shōji | Entro 24 ore chiama un amico in prefettura: è da qui che parte la «telefonata amichevole» a Taniguchi («andiamoci piano»). Se i PG insistono: avvocato e «conosco il capo della prefettura». Se collabora davvero (mai a verbale), apre il filone politico: le riprese Super 8 |

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[Storia Completa|Cellulare Tachibana — Registro chiamate]]
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]

---

# Famiglia Murakami — Moglie e figli del veterinario

> Tre PNG raggruppati: moglie e due figli del Dr. Murakami Saburō. Coinvolti emotivamente, non operativamente.

---

## Murakami Hiroko — Moglie

### Anagrafica
- **Nome**: Murakami Hiroko (村上 寛子, nome da nubile **Aoki**)
- **Età**: 49 anni
- **Residenza**: Yamashina-ku, casa di famiglia (con il marito)
- **Lavoro**: casalinga, gestisce piccole spese di studio del marito

### Aspetto e personalità
1,58 m, viso pulito, capelli neri tinti per coprire i grigi. Veste sobria, sempre con grembiule a casa. Tradizionale, dedita al focolare. Sospettava da mesi che qualcosa non andasse con il marito (insonnia, alcol serale, telefonate strane) ma non aveva osato chiedere.

### Ruolo nella vicenda
- **Non sa nulla** di truffa o galli
- Trova il marito morto il **13/02 verso le 16:30** allo studio veterinario, dove passa abitualmente prima di rientrare a casa per dare una mano. Chiama l'ambulanza in stato di shock
- Crolla in stato di shock profondo
- È la persona che fornisce ai PG l'alibi del marito per l'11/02 (cena casalinga, TV)

### Alibi

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 sera | A casa con il marito (cena 19:30, TV fino alle 22:00) | Vera | Aiko, in camera sua ma in casa |
| 13/02 | Mattina al mercato di Yamashina, pranzo a casa di un'amica vedova, alle 16:30 allo studio: trova il corpo | Vera | I banchi del mercato, l'amica; la telefonata al 119 dal telefono dell'ambulatorio (16:34) |
| 14–17/02 | A casa con Aiko e, dalla notte del 13, con Yūsuke | Vera | I figli, la vicina Sig.ra Yoshioka |

### Come si comporta
- **Primo contatto** (13/02 sera): sotto shock, parla a frammenti, ha bisogno di pause; il medico di famiglia le dà un sedativo. Non è in grado di firmare niente prima del 14/02
- **Dal 14/02** (l'autopsia dice omicidio): lucida e ferma. Ricorda dettagli minuti (le telefonate a bassa voce, il washitsu, il bagno di venti minuti dopo il giornale) e li dà tutti. **Non protegge il marito** — vuole capire, e vuole che i figli non ne portino il peso
- **Si apre se**: le si dice la verità sull'autopsia senza girarci intorno e le si chiede il permesso prima di entrare in casa
- **Si chiude se**: la trattano da sospettata («sapeva dei galli?») o interrogano Aiko senza di lei

### Deposizione — D-07 (a casa, 13/02 sera davanti alla Polizia di Yamashina; ripresa da Yamada il 14/02)
> «Sono passata allo studio alle quattro e mezza, come faccio sempre il venerdì, per aiutarlo prima delle visite del pomeriggio. La porta davanti era chiusa a chiave, l'insegna girata su "chiuso"; sono entrata dal cortile, dal retro. La porta del retro era accostata, non chiusa col catenaccio, e questo mi ha fatto pensare che fosse dentro. Era per terra, vicino al tavolo, su un fianco. Ho creduto che si fosse sentito male — il cuore, beveva, non dormiva. Sul tavolo c'era una siringa e una boccetta vuota, non ho toccato niente. Ho chiamato l'ambulanza dal telefono dell'ambulatorio. Da due anni mio marito non era più lui: non dormiva, beveva la sera, telefonate a cui rispondeva a voce bassa e chiudeva se entravo. Dormiva nella stanza dei tatami. Non gli ho mai chiesto niente. I soldi mancavano, questo lo sapevo: le banche scrivevano. Ieri mattina, quando ha letto il giornale, si è chiuso in bagno per venti minuti. Non so chi fosse quel signor Tachibana. Voglio solo sapere cosa è successo a mio marito e che i miei figli non ne portino il peso.»

Omette: niente di ciò che sa. Non sa dei galli, del debito di ¥6,8 mln, dei ¥1,5 mln dietro l'armadio.

### Valore investigativo
- Conferma il **declino emotivo** di Murakami (veterinario) negli ultimi 2 anni
- Identifica i **pochi visitatori** dello studio veterinario (compresi sconosciuti)
- Accesso allo studio del marito (chiavi, archivi, conti)

---

## Murakami Yūsuke — Figlio maggiore

### Anagrafica
- **Nome**: Murakami Yūsuke (村上 裕介)
- **Età**: 19 anni
- **Residenza**: dormitorio universitario a Tokyo, **Università Waseda** (1° anno, Facoltà di Scienze Politiche)
- **Stato civile**: single

### Aspetto e personalità
1,75 m, occhiali, capelli corti. Studente diligente, leggermente arrogante (è in un'università di prestigio). Distante dalla famiglia, raramente torna a Kyoto. Convinto che il padre sia "un dilettante" nella vita.

### Ruolo nella vicenda
- **Completamente fuori** dalla vicenda
- Avvisato della morte del padre il 13/02, prende il primo Shinkansen per Kyoto
- Si occupa formalmente di pratiche burocratiche
- **Non sa nulla** dei debiti della famiglia: scoprirà solo dopo che le tasse universitarie del prossimo semestre sono a rischio

### Alibi

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 e 13/02 | A Tokyo, a lezione e in dormitorio | Vera | Registro presenze della Waseda, compagni di corso; lo Shinkansen del 13/02 sera (arriva a Kyoto alle 22:30) |

### Come si comporta
- **Primo contatto**: razionale, freddo, leggermente in difensiva; risponde come a un esame. Non vuole parlare della famiglia in dettaglio: «mio padre e io non eravamo vicini»
- Più interessato a chiudere la pratica (funerale, banca, clinica) e tornare a Tokyo il 18/02
- **Crolla** quando capisce che la famiglia è in difficoltà economiche serie (le due ipoteche, ¥38 mln di debiti): «e le mie tasse?» — poi la vergogna di averlo detto
- **Nessuna deposizione**: non sa niente. Se convocato, tre righe: dov'era e quando è arrivato

### Valore investigativo
**Basso**. È una figura di chiusura emotiva, non di indagine.

---

## Murakami Aiko — Figlia minore

### Anagrafica
- **Nome**: Murakami Aiko (村上 愛子)
- **Età**: 15 anni
- **Residenza**: Yamashina-ku con la madre
- **Studi**: terzo e ultimo anno di chūgakkō (la scuola media giapponese)

### Aspetto e personalità
1,62 m, magra, capelli lunghi neri. Timida, sensibile, lega molto al padre. Si interessa di disegno e manga. Sa di animali (passa pomeriggi nello studio del padre).

### Ruolo nella vicenda
- **Punto debole emotivo** del padre Murakami (veterinario)
- Non sa nulla, ma ricorda alcuni **episodi inquietanti**:
  - Una volta (gennaio '98) ha sentito il padre piangere al telefono di notte
  - Ha visto il padre nascondere una busta di soldi dietro l'armadio dei farmaci
  - Ha intercettato una telefonata in cui il padre diceva "*non posso, ho una famiglia*" (probabilmente Tachibana (vittima) che gli proponeva la truffa)

### Alibi
N/A: non sospettata. Il 13/02 era a scuola fino alle 15:30, poi a casa; lo apprende alle 18:00 dalla madre.

### Come si comporta
- Estremamente fragile: si sente solo **con la madre presente** e con un PG alla volta, seduti, senza divisa
- Risponde a domande gentili e concrete («cosa hai visto», non «cosa pensi»); a una domanda brusca smette di parlare e non riprende quel giorno
- **Ricorda dettagli precisi** che la madre non ha colto. Vuole tenere il camice del padre

### Deposizione — D-08 (sommarie informazioni da minore, a casa, dal 15/02, con la madre; conduce Fujita o Sato)
> «Papà era triste da tanto. A gennaio, una notte, l'ho sentito piangere al telefono, in cucina; diceva "va bene, va bene" e basta. Un pomeriggio, in clinica, l'ho visto mettere una busta grossa dietro l'armadio dei medicinali, quello alto; ha fatto finta di niente quando mi ha vista. A ottobre, forse, prima delle vacanze — era al telefono nell'ambulatorio e ha detto "non posso, ho una famiglia", e poi ha detto "quanto tempo ho". Non ho chiesto. Certi giorni nella clinica c'era un odore strano, come di stalla, e delle piume nel cortile che lui spazzava via subito. Giovedì, quando è tornato, ha guardato me e mia madre e ha detto "scusate", senza motivo. Posso tenere il suo camice?»

Omette: niente. Le piume e l'odore di stalla sono i galli del Nitōgun curati nel retro; la busta sono i ¥1,5 mln.

### Valore investigativo
- **Ricostruisce il momento in cui il padre ha accettato la truffa** (telefonata di ottobre '97)
- Indica il nascondiglio del **contante in clinica** (¥1,5 mln dietro l'armadio dei farmaci)
- È la **chiave per ottenere la confessione del padre** se i PG arrivano in tempo (il padre crolla solo se sa che la figlia è coinvolta o in pericolo)

### Note GM
- Bisogna trattarla con **enorme cautela**: è minorenne, fragile, ha appena perso il padre
- È la chiave dell'aspetto **morale** della vicenda: ricorda al gruppo che i criminali hanno famiglie

---

## En

| PG | Hiroko | Aiko | Yūsuke | Perché |
|---|---|---|---|---|
| Yamamoto | 0 | 0 | 0 | Il capo: Hiroko lo rispetta, Aiko ne ha soggezione, Yūsuke lo tratta da pari |
| Honda | 0 | −1 | −1 | Diretto: con Aiko troppo; Yūsuke lo prende per un poliziotto di strada |
| Nakamura | +1 | 0 | 0 | La pazienza con Hiroko paga; Aiko lo trova «serio» |
| Sato | +1 | +1 | −1 | Giovane: Hiroko lo tratta da figlio, Aiko si fida; Yūsuke guarda dall'alto in basso un agente scelto della sua età |
| Fujita | +2 | +2 | 0 | *Tocco del Medico* su Hiroko, gentilezza su Aiko: è l'unica che Aiko chiede di rivedere |

Con gli altri: Hiroko → il marito +2 (era +4, il silenzio l'ha consumato) · Aiko → il padre **+4** · Yūsuke → il padre −1, +1 dopo il funerale (rimorso) · Hiroko → Tachibana (vittima) **−3** appena capisce chi era · la famiglia → il Nitōgun: paura senza volto · la vicina Sig.ra Yoshioka +1 (porta da mangiare tutti i giorni).

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 13/02 16:30 | Hiroko trova il corpo. La Polizia di Yamashina (17:05) parla di suicidio. Yūsuke chiamato alle 18:00, arriva alle 22:30 | — |
| 14/02 12:00 | Yamada le porta l'esito dell'autopsia: omicidio. Da qui Hiroko collabora del tutto: chiavi della clinica (sigillata), consenso a perquisire la casa, i documenti della mansarda su Lake Biwa | +1 |
| 14/02, se i PG chiedono di piume e odori | Hiroko: «il cortile, lui lo spazzava». Aiko ascolta dalla scala: è lì che decide di parlare | — |
| 15/02 sera | Veglia (tsuya) in casa. **La stessa sera della veglia di Tachibana a Fushimi**: i PG non possono essere in tutti e due i posti | — |
| 15/02 e oltre, con la madre e con Fujita o Sato | D-08. Aiko porta i PG davanti all'armadio alto della clinica: dietro, la busta con ¥1,5 mln (se non l'hanno già trovata) | +1 |
| 16/02 | Funerale al tempio di Yamashina, Yūsuke fa gli onori. La Sig.ra Yoshioka racconta a Hiroko dell'uomo «con il berretto di lana e la borsa a tracolla» visto nel vicolo il 12/02 pomeriggio: Hiroko lo riferisce ai PG il giorno stesso | — |
| Se i PG trattano Hiroko da sospettata o sentono Aiko senza la madre | Hiroko chiude la porta: si parla solo tramite il fratello di lei, da Ōtsu. Aiko non dice più una parola | −2 |
| 18/02 | Yūsuke torna a Tokyo. Se ha saputo dei ¥38 mln (dai PG o dalla banca) chiede a un PG, sulla porta: «la casa la perdiamo?». Nessuno lo sa ancora | — |
| 22/02 e oltre | Hiroko testimonia sul declino del marito e sulle telefonate; Aiko non testimonia (minore, fragile: i PG che la proteggono dal tribunale hanno fatto la cosa giusta) | — |

## Collegamenti
- [[PNG_Murakami_Saburo_Veterinario|Dr. Murakami Saburō — Veterinario complice]]
- [[Luogo_Studio_Veterinario_Murakami|Studio veterinario Murakami — Yamashina]]

---

# Hayashi Tomoki — Logistica del Nitōgun

> Braccio destro di Saitō. Gestisce capannone, scommesse, comunicazioni col ristorante di copertura.

## Anagrafica
- **Nome**: Hayashi Tomoki (林 智樹)
- **Età**: 35 anni
- **Residenza**: piccolo appartamento a Kameoka centro
- **Copertura**: dipendente formale della società import-export di Saitō
- **Stato civile**: convive con Yui (28), commessa, **non sa nulla**

## Aspetto e personalità
1,75 m, magro, capelli mossi tagliati corti. Tatuaggio parziale di carpa sulla schiena (ereditato da affiliazione yakuza giovanile). Veste casual: piumini, sneaker, jeans. Sempre con un Motorola StarTAC (cellulare aziendale) e un secondo cellulare prepagato. Sigaretta in mano costantemente. Tono diretto, ironico, conosce tutti.

## Ruolo nella vicenda
- Organizza la logistica del capannone di Kameoka (mensile)
- Pubblica gli annunci sul Kyoto Shimbun tramite l'agenzia Sakura Kōkoku di Osaka (paga per conto della Kameoka Nōji KK: le ricevute sono intestate alla società)
- Riscuote scommesse e paga vincite per conto di Tachibana (vittima)
- Ha **chiamato Tachibana (vittima) il 10/02 alle 18:42** lasciando il messaggio in segreteria (*"Ei-san, sono io. Domani come d'accordo"*) per fissare l'incontro pomeridiano dell'11/02 a Kameoka
- **Ricognizione preventiva del bagno della Kyoto Station** il 10/02 mattina: sceglie il punto dell'agguato, nota casualmente il cartello "telecamera fuori servizio dal 9/02, ricambio in arrivo" all'ingresso del bagno e ne approfitta come opportunità (nessun complice interno, niente sabotaggio)
- Il giorno 11/02 incontra Tachibana (vittima) intorno alle 14–18 a Kameoka per "discussioni operative" (era la trappola: lo rassicura, gli dà di persona appuntamento alla stazione la sera col pretesto della consegna mensile della quota di Tachibana)
- Coordina Kuroda per i tre attentati

## Alibi

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 pomeriggio | «A Kameoka per lavoro; con Tachibana un caffè di mezz'ora verso le quattro» | Con Tachibana (vittima) dalle 14 alle 18: la trappola | Il barista del caffè davanti alla stazione JR di Kameoka li ha visti insieme «più di un'ora», non mezz'ora |
| 11/02 sera | «A casa con Yui dalle otto» | **Falso**: alle 20:30 esce «per lavoro», guida Kuroda alla Kyoto Station e lo aspetta al volante in zona Hachijō-ovest; rientra alle 23:30 | Yui, se le si chiede l'ora esatta: «è tornato verso le undici e mezza, aveva fame». **Non ha alibi per le 21:00–22:00** |
| 13/02 | «Al magazzino della società a Sogabe per una consegna di mangime» | Vera — al capannone; Murakami (veterinario) lo uccide Kuroda da solo | Il fornitore di mangimi di Kameoka lo vede alle 14:00. (Mangime per un capannone «in disuso»: un indizio, se qualcuno se lo chiede) |
| 14/02 sera | «A casa con Yui; sono sceso per le sigarette» | Esce alle **21:30**, rientra **dopo mezzanotte**: cinquanta minuti d'auto per Kyoto, attesa, e il recupero di Kuroda a due isolati dal condominio di Ōkubo a Kamigyō | Yui (le ore). **Quasi tre ore** che nessuno copre |
| 15/02 10:00 | — | Al parcheggio del supermercato di Kameoka con Inagaki, incontro d'urgenza | Solo la sorveglianza, se già in corso |
| 17/02 sera | «A cena al Kameoka-tei» | Vera (18:30–21:00): Kuroda opera da solo in ospedale | Tachi Yūichirō e 3 dipendenti |

L'11/02 sera è il punto debole: se i PG ricostruiscono i movimenti (Yui + il barista + la segreteria), possono inchiodarlo.

## Come si comporta
- **Primo contatto**: sicuro, sorride, «ragazzo simpatico»: offre sigarette, dà del lei con ironia. Minimizza ogni rapporto: Tachibana «l'amico di un amico», i telefoni «perché eravamo amici», il capannone «un magazzino della società»
- **Sotto pressione**: non si scompone, parla meno e sorride di più. **Mai senza avvocato**: Saitō gli ha imposto di chiamare l'avvocato del gruppo prima di aprire bocca — con l'avvocato accanto dice il minimo (D-12)
- **Si apre se**: confrontato con prove materiali (la voce della segreteria, l'orario di Yui, il prepagato, la testimonianza di Ōkubo) **e** con un patto giudiziario credibile, **e** se crede che Saitō lo stia sacrificando (l'avvocato del gruppo che difende Kuroda e non lui; Yui convocata). Serve tempo: 24–48 ore di fermo
- **Si chiude se**: gli si urla addosso (torna il sorriso), o se capisce che i PG non hanno niente in mano
- **Resiste bene**, ma è il punto **più crollabile** del Nitōgun. Da solo con chi parla la sua lingua (Honda, scommesse e sport) dice sempre una cosa di troppo

## Cosa sa
- Identità del mandante (Saitō)
- Identità dell'esecutore (Kuroda)
- Posizione esatta del capannone (lui ne ha le chiavi)
- Identità del poliziotto corrotto (Inagaki)
- Codice di tutti gli annunci sul Kyoto Shimbun
- Lista clienti scommettitori principali

## Cosa nasconde
- Una piccola tangente che si tiene di nascosto sulle scommesse (¥500.000 al mese, Saitō non sa)
- Una relazione con la fidanzata di un altro membro del Nitōgun (rischio interno)

## Punto debole
La fidanzata Yui (28 anni). Hayashi è genuinamente innamorato. Se lei viene minacciata di problemi giudiziari, può cedere. Inoltre la **paura di Saitō** è forte: se Hayashi viene arrestato e crede che Saitō lo voglia far eliminare in carcere, può preferire un patto con la polizia.

## Indizi a casa sua
- Secondo cellulare prepagato con numeri del Nitōgun (se i PG lo trovano, è un colpo grosso)
- Chiavi del capannone di Kameoka (anonime, forma particolare)
- Buste di contanti per ¥1,2 mln nel doppiofondo del divano
- Quaderno con appunti criptici: date, cifre, sigle galli (codice quasi identico a quello di Tachibana (vittima))

## Note operative GM
- Hayashi è la **chiave per arrivare a Saitō**
- Senza la sua testimonianza, Saitō è intoccabile
- I PG hanno una finestra: se lo arrestano prima del 22/02 (giorno del prossimo combattimento), il colpo è completo

## Statistiche (GENKAI — Shōtotsu v3.1, da provare al tavolo)

| Distacco | Pazienza | Silenzio | Lucidità | Ascolto | Presenza | Ki |
|---|---|---|---|---|---|---|
| 5 | 5 | 5 | 6 | 6 | 5 | **8** (Distacco 5 + dado 3) |

- **Senmon**: Conoscere il quartiere (Kameoka) 1 · nessuna d'arma
- **Armi**: coltello a serramanico = *coltello* (attacco Pazienza 5, Estrarre 2 / Colpire 1, danno 2) · pugni (Lotta 1: Presenza 5, 1/1, danno 1). Le pistole le procura, non le porta
- **Ukemi** (chi lo attacca tira contro): fuoco → Distacco 5 · lame e mani → Pazienza 5 · manganello → Ascolto 6
- **Come combatte**: non combatte — se braccato scappa (Muoversi) o alza le mani e chiede l'avvocato. Mod. Presenza all'iniziativa: +1

## Deposizione — D-12 (Centrale, con l'avvocato del gruppo, quando viene convocato; verbalizza Yamada)
> «Hayashi Tomoki, trentacinque anni, impiegato della Kameoka Nōji, import-export e terreni agricoli, sede a Kameoka. Il signor Tachibana lo conoscevo, sì: l'amico di un amico, ci siamo visti qualche volta a Gion e a Kameoka, si parlava di ristoranti — lui aveva un locale, noi ne abbiamo uno, il Kameoka-tei. Ci siamo sentiti al telefono, certo, forniture, consigli. L'ho chiamato la sera del dieci per confermare un caffè l'indomani: ci siamo visti a Kameoka l'undici nel pomeriggio, verso le quattro, al caffè davanti alla stazione, mezz'ora. Poi è ripartito per Kyoto e io sono tornato a casa dalla mia ragazza, verso le otto. L'ho saputo dal giornale. Galli? Ho sentito le storie che raccontano i vecchi. Il capannone di Sogabe? La società ha dei terreni e dei magazzini, li seguo io, ci vado quando serve: venerdì tredici c'ero per una consegna di mangime, chiedete al fornitore. Il signor Saitō è il mio datore di lavoro, un uomo rispettato. Se avete altre domande, il mio avvocato è qui per questo.»

Mente su: la sera dell'11 («verso le otto»), la durata dell'incontro, l'uso del capannone. Vero e verificabile: la telefonata del 10, il caffè, il mangime del 13. Della cena del 2/02 al Club Aoyagi, se gliela contestano: «una cena, sì, parlavamo di ristoranti».

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | −1 | Il capo è un muro: davanti a lui Hayashi sorride di più e dice di meno. *Pugno di Ferro* lo piega solo con le prove in mano |
| Honda | 0 | Parlano la stessa lingua (sport, quote, scommesse): Hayashi si rilassa e si tradisce su un dettaglio (le quote «di partenza», un termine del giro). +1 per Honda, −1 per lui |
| Nakamura | −1 | Sente l'interrogatore: con lui misura ogni parola |
| Sato | 0 | Lo sottovaluta: parla davanti a lui come se non ci fosse — un errore che Sato può sfruttare |
| Fujita | −1 | La teme: «quella legge la gente». Se invece la incontra al capannone come accompagnatrice di un cliente (*Copertura e travestimento*), non la riconosce: 0 |

Con gli altri: Saitō Gorō **+2** (leale — e ha paura di lui: lo tradisce solo se crede che Saitō lo sacrifichi) · Kuroda Ryō +1 (gli vuole bene come a un cane pericoloso) · Tachibana (vittima) **−3**: ha tradito il giro · Inagaki (sergente corrotto) 0: affari, e un po' di disprezzo · Tachi Yūichirō (testa di legno) −1 · Murakami (veterinario) −2 · Ōkubo −2 · Nishimura e Sasaki (prestanome) 0, «pesci piccoli» — −1 appena capisce che possono riconoscerlo · Yui **+4**.

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 10/02 | Ricognizione del bagno al mattino; alle 18:42 il messaggio in segreteria | — |
| 11/02 | 14–18 con Tachibana a Kameoka; 20:30 esce, guida Kuroda; 23:30 a casa | — |
| 12/02 | In ufficio alla Kameoka Nōji, compra il Kyoto Shimbun. Tranquillo | — |
| 13/02 | Al capannone col mangime (alibi vero) mentre Kuroda è a Yamashina | — |
| 14/02 | 21:45 esce, 22:40 recupera Kuroda a due isolati da Kamigyō. Ōkubo vivo: la prima crepa | — |
| 15/02 10:00 | Incontro d'urgenza con Inagaki al parcheggio del supermercato: vuole sapere dei PG | — |
| 16/02, se i PG sono passati dal Kameoka-tei, dai prestanome o da Mariko | Lo sa da Inagaki o da Tachi: avvisa Saitō. Da qui il Nitōgun manda «avvisi» a chi parla (Mariko, Nishimura) | — |
| 17/02 | A cena al Kameoka-tei (alibi) mentre Kuroda va in ospedale. Se l'attentato fallisce, la sera Saitō gli dice «basta» | — |
| 19–21/02 | Prepara la serata del 22/02 (l'annuncio è uscito il 9/02). Se Inagaki riferisce di un blitz in preparazione, Saitō annulla: il 21/02 Hayashi chiama i clienti dal prepagato — una raffica di chiamate nei tabulati, se i PG li hanno chiesti | — |
| Convocato senza prove | D-12 con l'avvocato, poi a casa. Sa che i PG non hanno niente: da qui più prudente, niente più cellulare aziendale per il giro | −1 |
| Fermato **con** prove (segreteria, Yui, prepagato, Ōkubo) | 48 ore di silenzio con l'avvocato. Poi la crepa: l'avvocato del gruppo passa a difendere Kuroda; Yui viene convocata. Con un patto scritto → **crolla**: dà Saitō come mandante, Kuroda, Inagaki, le chiavi e il codice degli annunci. Senza patto: rilasciato allo scadere del fermo (48+24 ore), sparisce da Kameoka per una settimana e Saitō lo tiene lo stesso | +1 con chi ha proposto il patto |
| Se Saitō sospetta che stia parlando | Chiede lui la protezione: «se torno a Kameoka non arrivo a Pasqua». È l'unico modo per avere la sua testimonianza in aula — e l'unica via per Saitō | — |

## Collegamenti
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[PNG_Kuroda_Ryo_Esecutore|Kuroda Ryō — Esecutore]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]
- [[Luogo_Ristorante_Kameoka_tei|Ristorante Kameoka-tei — Copertura]]
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]

---

# Kuroda Ryō — Esecutore materiale

> Sicario del Nitōgun. Esegue i tre omicidi (Tachibana (vittima), Murakami (veterinario), tentato Ōkubo).

## Anagrafica
- **Nome**: Kuroda Ryō (黒田 涼)
- **Età**: 28 anni
- **Residenza**: monolocale a Fushimi-ku, Kyoto (zona popolare, vicino al fiume Kamo)
- **Copertura**: istruttore di pugilato alla **Tora Boxing Gym** (piano terra del suo stesso palazzo, Fushimi)
- **Stato civile**: single, nessuna relazione stabile

## Aspetto e personalità
1,80 m, atletico, capelli rasati. Tatuaggio sotto la scapola sinistra: drago in stile *irezumi* incompleto. Veste sportivo: tute Asics, sneaker scure (le **Asics Gel** della scena del crimine), giubbotto scuro imbottito (il «bomber» dei verbali), berretto di lana nelle uscite notturne. Nervoso ma controllato, parla pochissimo. Astemio. Si allena ogni giorno.

## Ruolo nella vicenda
- Esecutore materiale dei tre attentati
- Reclutato da Hayashi nel 1996 dopo una rissa in un locale dove aveva quasi ucciso un rivale
- **Non è un sicario professionista**: è un picchiatore violento promosso. Questo è il suo punto debole tecnico — lascia indizi che un professionista non lascerebbe (impronta scarpa, sparo a contatto, fuga a piedi visibile sulla telecamera)
- Compenso per i tre attentati: ¥3,5 mln + protezione

## Esecuzione 11/02 ore 21:21
- Arriva alla Kyoto Station alle 21:14 con auto guidata da Hayashi (Hayashi resta al volante in zona Hachijō-ovest)
- Sale al 3° piano alle 21:20 (ripreso dalla telecamera CAM-12 del corridoio sud: berretto di lana, borsa a tracolla nera con dentro la Makarov), entra nel bagno pochi secondi dopo
- Spara 3 colpi con una pistola semiautomatica Makarov PM cal. 9×18
- Raccoglie i bossoli **(errore: ne dimentica uno scivolato sotto un orinatoio — i PG possono trovarlo se cercano bene)**
- Esce alle 21:22, scende al pianterreno, sale in auto, fugge

## Alibi

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 sera | «In palestra, da solo, ho le chiavi» | **Omicidio Tachibana** alla Kyoto Station (21:21) | La Tora Boxing Gym era **chiusa per la festa nazionale**: il titolare lo conferma. Sul registro firme c'è «Kuroda 20:00–22:00» scritto da lui. Nessuno lo ha visto |
| 12/02 pomeriggio | «In palestra» | Ricognizione a Yamashina: la Sig.ra Yoshioka (vicina dei Murakami) vede nel vicolo un uomo col berretto di lana e la borsa a tracolla | Gli allievi del pomeriggio non c'erano: la lezione è alle 18:00 |
| 13/02 pomeriggio | «A casa a dormire, la sera lezione» | **Omicidio Murakami** (veterinario) a Yamashina, ~14:00: dal vicolo retro, xilazina al collo, fuori dalla stessa via | Nessuno lo copre 13:00–16:00. La lezione delle 18:00 è vera |
| 14/02 ore 22:30 | «A letto» | **Tentato omicidio Ōkubo**, parcheggio di Kamigyō: 2 colpi cal. 9×18, uno alla spalla destra; spaventato dal Sig. Hayama (vicino di Ōkubo, rientra in auto), fugge a piedi per la rampa e Hayashi lo recupera a due isolati | Nessuno. La telecamera del parcheggio (bomber, sneaker), la descrizione di Hayama e Ueda (H-15) |
| 17/02 ~18:00 | «In palestra, la lezione delle sei» | **Secondo attentato** al Kyoto University Hospital, stanza 412, da fattorino del catering | Gli allievi del corso serale: «è arrivato alle sette e un quarto, in ritardo, sudato» |

## Come si comporta
- **Primo contatto**: risposte monosillabiche — «non so», «non ricordo», «non c'ero». Non guarda mai negli occhi, mani ferme sul tavolo, respiro lento da pugile. Ostile passivo
- **In strada**: se avvicinato senza essere circondato, **scappa** (Muoversi, verso il fiume). In palestra, davanti agli allievi, recita il maestro: cortese, quasi gentile
- **Sotto pressione**: non cambia. Si fida solo del suo avvocato (lo stesso del Nitōgun). **Resiste molto bene** all'interrogatorio standard; un interrogatorio lungo può fargli perdere le staffe — un pugno sul tavolo, non una parola in più
- **Crolla solo se**: confrontato con prove fisiche schiaccianti (la Makarov nell'intercapedine, le Asics, la balistica) **e** abbandonato dal Nitōgun — l'avvocato che smette di venire, una dichiarazione di Hayashi che lo descrive come «uno che ha fatto di testa sua». Allora ribalta tutto: ma **la sua parola da sola non basta contro Saitō** (nessun riscontro): serve Hayashi
- La madre nell'ospizio di Ōtsu: se i PG gliene parlano con rispetto, si incrina; se la usano come minaccia, esplode

## Cosa sa
- Sa di Hayashi e Saitō
- **Non conosce** i clienti scommettitori
- Conosce la posizione del capannone (ci si allena spesso al combattimento corpo a corpo)
- Sa dove sono nascoste le armi del gruppo

## Cosa nasconde
- Un'arma personale (coltello tanto giapponese rituale) nascosta sotto il pavimento del monolocale
- Un quaderno con esercizi di calligrafia (sorprendente lato culturale, deteriora il cliché del picchiatore)

## Punto debole
- È giovane e impulsivo: in interrogatorio prolungato può perdere le staffe
- Ha **paura di Saitō** ma anche grande **devozione**: il dilemma tra le due cose può spezzarlo
- Una madre malata in un ospizio a Otsu — se lei è coinvolta, lui reagisce

## Indizi addosso/a casa
- **Asics Gel** taglia 27 cm, suola compatibile con impronta scena del crimine
- Makarov PM nascosta in un'intercapedine del bagno (se trovata, prova balistica decisiva)
- Cartucce 9×18 di scorta in una scatola
- Banconote da ¥10.000 con numerazione consecutiva (paga di Saitō, tracciabile a un prelievo bancario)
- Cellulare prepagato con sole 4 chiamate ricevute da Hayashi nelle date critiche

## Telecamera del corridoio (3° piano Kyoto Station)
La telecamera CAM-12 (corridoio sud, verso i bagni) lo riprende alle 21:20 e 21:22. Volto **non riconoscibile** in qualità VHS (di spalle all'andata, berretto di lana), ma:
- corporatura atletica
- giubbotto scuro imbottito, guanti, borsa a tracolla nera
- sneaker scure con suola scanalata
- andatura caratteristica (passi corti e veloci, postura da pugile)

I PG che incrociano il filmato con un sospettato già in custodia possono confermare l'identificazione.

## Note operative GM
- È **il bersaglio investigativo concreto** ma non il vero responsabile morale
- Catturarlo è possibile ma non sufficiente per chiudere il caso (l'omertà copre Saitō)
- Se i PG lo catturano e Saitō teme che parli, può tentare di farlo eliminare in carcere — sottotrama possibile

## Statistiche (GENKAI — Shōtotsu v3.1, da provare al tavolo)

| Distacco | Pazienza | Silenzio | Lucidità | Ascolto | Presenza | Ki |
|---|---|---|---|---|---|---|
| 6 | 5 | 6 | 5 | 5 | 7 | **10** (Pazienza 5 + dado 5) |

- **Senmon**: Lotta 2 (pugile e istruttore — Presenza 7) · Pistola 1 (tre agguati, non un tiratore)
- **Armi**: Makarov PM = *automatica 9mm* (attacco Lucidità 5, Estrarre 3 / Colpire 2 / Ricarica 4, danno 4, 3 colpi) · tantō = *coltello* (Pazienza 5, 2/1, danno 2) · pugni (Presenza 7, 1/1, danno 1, Lotta 2 = −2 al tiro) · Tokarev di scorta in palestra (come la Makarov)
- **Ukemi** (chi lo attacca tira contro): fuoco → Distacco 6 · lame e mani → Pazienza 5 · manganello → Ascolto 5
- **Come combatte**: a contatto preferisce le mani; spara solo se ha la linea e una via di fuga; sotto Ki 4 scappa (Muoversi verso *lontano*, il fiume). Non minaccia: agisce. Mod. Presenza all'iniziativa: −1

## Deposizione — D-13 (Centrale, dopo l'arresto, con l'avvocato del gruppo; verbalizza Yamada)
> «Kuroda Ryō. Istruttore, Tora Boxing Gym, Fushimi. Non so. Non ricordo. Non c'ero. La sera dell'undici mi allenavo, da solo, ho le chiavi. Le scarpe le hanno tutti. Il giubbotto lo hanno tutti. Kyoto Station ci passo per il treno, come tutti. Tachibana non so chi è. Murakami non so chi è. Ōkubo non so chi è. Hayashi è uno che viene in palestra qualche volta. Saitō non lo conosco. La pistola non è mia. Voglio l'avvocato. Non ho altro da dire.»

Tutto falso tranne il nome e la palestra. Se ribalta (abbandonato dal Nitōgun) non c'è un verbale pulito: c'è una frase sola, che va bene per il GM e non per il giudice — *«Hayashi mi ha dato l'indirizzo e la pistola. Il vecchio ha detto tre nomi. Io ho fatto tre lavori.»*

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | −2 | L'autorità: la odia. Lo stesso quartiere (Fushimi) non conta niente |
| Honda | −1 | Due cani che si annusano: Honda lo tratta da sospettato dal primo minuto e Kuroda lo sente |
| Nakamura | −1 | Riconosce l'interrogatore e si chiude ancora di più |
| Sato | −1 | Disprezzo per il ragazzo in divisa |
| Fujita | −2 | *Specchio dell'Anima*: si sente letto e lo detesta — abbassa la testa, stringe i pugni |

Con gli altri: Saitō Gorō **+3** (devoto — e terrorizzato: il dilemma che può spezzarlo) · Hayashi Tomoki +2 · Tachibana (vittima) −1: un lavoro · Murakami (veterinario) 0 · Ōkubo −1, poi **−2**: «il lavoro non finito» diventa un'ossessione · la madre nell'ospizio di Ōtsu **+4** · gli allievi della palestra +1: le sole persone con cui è gentile.

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 11/02 21:21 | La Kyoto Station. In auto con Hayashi | — |
| 12/02 | Si allena, lezione alle 18:00 come sempre. Nel pomeriggio la ricognizione a Yamashina | — |
| 13/02 14:00 | Yamashina, da solo | — |
| 14/02 22:30 | Kamigyō. Ōkubo vivo: per lui è una vergogna personale | — |
| 15–16/02 | Sparisce dentro la routine: palestra, monolocale, niente telefonate in uscita. Il prepagato riceve la quarta chiamata di Hayashi il 16/02 sera: l'ospedale | — |
| 17/02 17:40 | Entra in ospedale con la divisa del catering e il carrello (l'accesso di servizio non è presidiato). Se i PG hanno raddoppiato il presidio e coperto il cambio turno delle 14:00–22:00, se ne accorge: lascia il carrello in un corridoio (**dentro, la siringa di cloruro di potassio**) ed esce a piedi. Se lo fermano: uno scambio in corridoio — mani, poi le scale di servizio (`GENKAI_Combattimento` v3.1) | — |
| Se resta libero dopo il 17/02 | Il 18/02 Saitō gli dice «basta». Kuroda obbedisce — ma Ōkubo ancora vivo in stanza 412 lo rode: **opzione GM**, un terzo tentativo di testa sua il 20–21/02, senza Hayashi, sporco. Saitō non lo perdonerebbe | — |
| Arrestato **con** la Makarov (intercapedine del bagno) | Balistica 48–72 ore: incastrato per Tachibana. 48 ore di silenzio con l'avvocato. La crepa arriva da fuori: l'avvocato del gruppo che difende Hayashi e non più lui, o Hayashi che lo scarica a verbale → ribalta. Senza Hayashi resta la sua parola contro Saitō: ergastolo per lui, niente per il vecchio | — |
| Arrestato **senza** prove fisiche | 48+24 ore e fuori. Da quel momento non torna più in palestra: Saitō lo manda a Osaka. Se qualcuno (Kuroda stesso, in custodia) rischia di parlare, Saitō valuta di farlo eliminare in carcere: sottotrama | — |
| Se Fujita visita la madre a Ōtsu con rispetto | Lo viene a sapere dall'ospizio: alla domanda successiva risponde con una frase intera. È poco, ed è tutto | +1 con Fujita |

## Collegamenti
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]
- [[Luogo_Kyoto_Station_Scena_Crimine|Kyoto Station 1998 — Scena del crimine]]
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]

---

# Dr. Murakami Saburō — Veterinario complice (Vittima 2)

> Veterinario di Yamashina, complice della truffa sui combattimenti di galli. Ucciso dal Nitōgun il 13 febbraio 1998.

## Anagrafica
- **Nome**: Murakami Saburō (村上 三郎)
- **Età**: 52 anni
- **Residenza**: Yamashina-ku, Kyoto
- **Studio**: Murakami Dōbutsu Byōin (clinica veterinaria), Yamashina
- **Famiglia**: moglie Hiroko (49), figlio Yūsuke (19, Tokyo), figlia Aiko (15)

## Aspetto e personalità
Magro, 1,72 m, leggermente curvo. Capelli grigi diradati. Occhiali in metallo dorato. Mani con tremore leggero. Educato, formale, parla a voce bassa, si inchina troppo. Spaventato cronico, manipolabile.

## Ruolo nella vicenda
- Cura in nero i galli del Nitōgun da 4 anni
- Indebitato per investimento immobiliare fallito (1995–1996), ¥38 mln di debiti
- Debito di ¥6,8 mln con Tachibana (vittima) a ottobre '97
- Ottobre 1997: accetta proposta di Tachibana (vittima) — sedare il gallo del Nitōgun in cambio della cancellazione del debito
- Gennaio 1998: esegue la sedazione, debito cancellato
- 13 febbraio 1998: ucciso dal Nitōgun

## Alibi (prima della morte)

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 sera | «A casa con mia moglie: cena alle 19:30, televisione fino alle 22:00» | Vera | Hiroko (moglie); Aiko era in camera sua |
| 12/02 | In clinica tutto il giorno, 4 visite | Vera. Lo apprende alle 07:00 dal Kyoto Shimbun del mattino, poi dal TG; alle 09:00 ha già bevuto | I proprietari dei 4 animali (registro pazienti); Hiroko lo sente rientrare alle 19:40 «con l'alito di shōchū» |
| 13/02 mattina | — | In clinica 09:00–13:00 (2 visite); pausa pranzo da solo nel retrobottega | Registro pazienti |
| 13/02 ~14:00 | — | **Ucciso** nel retrobottega: iniezione letale di xilazina al collo, lato destro. Aspetto iniziale da suicidio/overdose, smentito dall'autopsia del 14/02 mattina | Hiroko trova il corpo alle 16:30 |

**Nota**: l'11 febbraio Murakami non sa ancora dell'omicidio di Tachibana (vittima). Lo apprende dai giornali del 12 febbraio.

## Come si comporta (12 febbraio, se i PG arrivano prima del Nitōgun)
- **Primo contatto**: panico controllato, sudore freddo, inchini troppo profondi, offre il tè due volte. Parla a voce bassa e in fretta
- **Sotto pressione**: nega di conoscere bene Tachibana (vittima): «rapporti professionali», visite a piccoli animali. Mente sulla truffa, mente sui debiti, e mente male — inventa un cane della vittima che non è mai esistito (D-11)
- **Crolla se**: si nomina la figlia Aiko; oppure gli si mostrano gli estratti conto (il debito che si azzera a fine gennaio); oppure si dice a voce alta «il gallo sedato»
- **Dopo il crollo**: confessa tutto (vedi *Cosa sa*), chiede protezione per la famiglia, è disposto a testimoniare — ma vuole essere portato via **subito**, non «domani col mandato»

## Cosa sa
- Nome del proprietario del gallo (Saitō Gorō)
- Posizione approssimativa del capannone di Kameoka (è stato lì per visite)
- Sa di Hayashi Tomoki come "uomo dei trasporti" del gruppo
- **Non sa** chi sia l'esecutore Kuroda Ryō
- Conosce 2 dei 6 clienti scommettitori per averli incrociati al capannone

## Cosa nasconde
- L'entità reale dei debiti
- Il fatto che ha sedato il gallo (non si è limitato a passare informazioni)
- Una piccola quota cash ricevuta da Tachibana (vittima) oltre alla cancellazione debito (¥1,5 mln nascosti in clinica, dietro un armadio di farmaci)

## Punto debole
La figlia Aiko, 15 anni. Qualunque pressione che la coinvolga lo fa crollare.

## Indizi nella sua clinica
- 1 copia del Kyoto Shimbun (febbraio '98) con annuncio Ristorante Kameoka-tei
- Estratti conto bancari che mostrano il debito che si azzera improvvisamente a fine gennaio
- Contante nascosto (¥1,5 mln) dietro armadio farmaci
- Nessuna agenda con appuntamenti Nitōgun (era prudente)

## Note operative GM
- Se i PG arrivano alla clinica il 12/02 e premono bene, possono salvarlo e ottenere una testimonianza chiave
- Se arrivano il 13/02, lo trovano già morto
- La sua morte è il **secondo evento** che convince i PG che si tratta di una catena di vendette, non di un omicidio singolo

## Deposizione — D-11 (in clinica, 12/02, solo se i PG lo raggiungono vivo; verbalizza Yamada o un PG) — falsa
> «Murakami Saburō, veterinario, Yamashina. Il signor Tachibana? Sì, lo conoscevo: veniva per il suo gatto — no, scusate, per un cane, un vecchio shiba, anni fa. Rapporti professionali, qualche visita. Ho letto della sua morte stamattina, una cosa terribile, Kyoto non è più quella di una volta. Non ci sentivamo da mesi. Il mio numero nel suo telefono? Avrà voluto una visita, capita. Debiti? Ho avuto un investimento sfortunato, come tanti, ma sono in regola con la banca. I galli? Io curo cani e gatti, dottore — ispettore. Di combattimenti ho sentito parlare, come tutti, storie di campagna. Ieri sera ero a casa con mia moglie, abbiamo cenato e guardato la televisione. Se non c'è altro, ho un paziente alle quattro. Mia figlia? Sta bene, grazie. Perché me lo chiede?»

Mente su tutto tranne l'alibi. Lo shiba non è mai esistito: chi ha già visto l'appartamento di Fushimi (nessun animale, nessuna ciotola) lo sa. Dopo il crollo non c'è una seconda deposizione scritta: c'è la confessione, e la richiesta di essere portato via.

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | −1 | L'autorità gli fa paura: davanti al capo mente di più |
| Honda | −1 | Brusco. Con lui il veterinario si aggrappa alla formalità |
| Nakamura | 0 | Paziente: lo lascia parlare finché si contraddice da solo (lo shiba) |
| Sato | +1 | Un giovane che parla di xilazina con competenza (*Medicinali e veleni*): «un collega». È l'unico a cui risponde da tecnico |
| Fujita | +1 | Nota il tremore delle mani e gli chiede da quanto non dorme (*Tocco del Medico*): lui abbassa la guardia |

Con gli altri: Tachibana (vittima) **−2** — lo ha comprato con la sua disperazione · Saitō Gorō **−3** (paura pura) · Hayashi Tomoki −2 · la moglie Hiroko +2 (non le parla più, ma è lei che nomina quando chiede protezione) · la figlia Aiko **+4** · il figlio Yūsuke +1 · il cognato sparito di Lake Biwa −4.

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 12/02 07:00 | Il giornale. Panico; alle 09:00 lo shōchū. Vede i pazienti come un automa | — |
| 12/02, i PG in clinica | D-11. Crolla su Aiko, sugli estratti o sul «gallo sedato». Chiede protezione **subito** | — |
| Se i PG lo lasciano a casa («torniamo domani col mandato») | Non dorme, non chiama nessuno. Il 13/02 alle 13:30 un uomo bussa alla porta del retro «per una consegna»: alle 14:10 è morto | — |
| Se i PG lo portano via il 12/02 (fermo come complice, o custodia protettiva) | Vive. Il 13/02 Kuroda trova la clinica chiusa e chiama Hayashi; Saitō lo sa la sera stessa (e anche Inagaki, se i PG sono passati da Kameoka). Il piano su Ōkubo non cambia. Murakami dà: Saitō come padrone del gallo, la posizione esatta del capannone, Hayashi «l'uomo dei trasporti», due clienti visti al capannone (Inoue Takeshi, Kimura Akira). Testimonia solo se la famiglia è protetta e non testimonierà mai contro Aiko che lo ha visto nascondere i soldi | +2 |
| 13/02 16:30 (se è morto) | Hiroko trova il corpo. Da qui parla la famiglia (`PNG_Famiglia_Murakami`) | — |

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[PNG_Famiglia_Murakami|Murakami Hiroko — Moglie del veterinario]]
- [[PNG_Famiglia_Murakami|Murakami Aiko — Figlia del veterinario]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]

---

# Nishimura Tatsuya — Prestanome ignaro

> Cameriere senior del locale Kōrin (di Tachibana (vittima)) a Gion. Ha scommesso ¥800.000 per il proprio datore di lavoro, fidandosi ciecamente. **Non è bersaglio del Nitōgun, ma è in pericolo indiretto**.

## Anagrafica
- **Nome**: Nishimura Tatsuya (西村 達也)
- **Età**: 36 anni
- **Residenza**: piccolo appartamento ad Higashiyama-ku, Kyoto
- **Lavoro**: cameriere senior al **bar-ristorante Kōrin**, Hanamikoji-dōri, Gion
- **Stato civile**: single, vive con la madre anziana (72 anni, in salute precaria)

## Aspetto e personalità
1,73 m, magro, postura sempre formale anche fuori servizio. Capelli neri con riga laterale. Veste sempre camicia bianca e pantaloni neri. Educato, riservato, leale. Lavora al Kōrin da 9 anni, considera Tachibana (vittima) un mentore.

## Ruolo nella vicenda
- A metà gennaio Tachibana (vittima) gli chiede di andare al capannone di Kameoka per piazzare ¥800.000 su un gallo specifico
- Nishimura accetta senza domande: per lui, Tachibana (vittima) è **assoluta autorità**
- Esegue, vince ¥2,4 mln, consegna tutto a Tachibana (vittima), riceve ¥150.000
- **Non capisce** la natura criminale dell'operazione: pensa che il datore di lavoro abbia "amicizie" e voglia tenere il proprio nome fuori dalle scommesse per discrezione
- È stato al capannone una volta sola, brevemente

## Alibi

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 sera | Al Kōrin, turno 18:00–02:00 (locale pieno per la festa) | Vera | 12 clienti registrati, la cameriera Kobayashi Yumiko, lo chef Tanigawa, il barista Aiba |
| 13/02 | Al Kōrin, chiuso per lutto: inventario e telefonate ai fornitori | Vera | Kobayashi e lo chef; Setsuko lo trova lì nel pomeriggio |
| 14/02 | A casa con la madre (Higashiyama) | Vera | La madre; la vicina che porta la spesa |
| 17/02 | A casa con la madre (martedì: il Kōrin è chiuso comunque) | Vera | La madre |
| 24/01, la sera del combattimento (se glielo chiedono) | «A Kameoka, per una commissione» | Reticente: la commissione era la scommessa da ¥800.000 | Nessuno lo copre: era il suo giorno libero, la madre lo ha visto rientrare alle 02:00 |

## Come si comporta
- **Primo contatto**: formale, composto, gli occhi bassi. Per **lealtà** verso il datore di lavoro morto non vuole «infangarne il nome»: «non ricordo bene», «preferirei non parlarne», «non sta a me»
- **Sotto pressione**: non mente attivamente, **omette**. Se lo si tratta da sospettato si irrigidisce ancora di più e chiede se deve chiamare un avvocato (non ne ha uno)
- **Si apre se**: capisce che il silenzio mette in pericolo lui e la madre; oppure gli si dice che Sasaki Hideo (l'altro prestanome) ha già raccontato del capannone; oppure gli si mostra il suo numero nel registro del cellulare della vittima con la data giusta. Allora è un testimone **preciso e onesto** (D-04)
- **Si chiude se**: qualcuno parla male di Tachibana davanti a lui, o se vede che la sua deposizione va sui giornali

## Cosa sa
- Conferma il sistema delle scommesse
- Ha visto **Hayashi** (lo riconosce in foto)
- Ha visto **Saitō** di sfuggita (ricorda "un signore alto con i capelli grigi e l'aria autoritaria")
- Posizione del capannone: descrive *"venti minuti d'auto da Kameoka centro, in zona di campi e serre"*
- **Non conosce** Murakami (veterinario) né gli altri prestanome

## Cosa nasconde
- I ¥150.000 ricevuti come ringraziamento (li ha messi da parte per le cure mediche della madre, vorrebbe non perderli)
- Sa che Tachibana (vittima) aveva un'amante (Aoyagi Mariko ha cenato al Kōrin alcune volte)

## Punto debole
La madre anziana. Nishimura è figlio unico, devoto. Qualunque pressione sulla sua salute o sicurezza lo fa cooperare.

## Pericolo
Il Nitōgun **non lo ha nel mirino** perché lo considera ignaro e di basso livello. Ma se Hayashi viene arrestato e teme che Nishimura possa identificarlo, può cambiare idea. **Il rischio per Nishimura aumenta dopo il 17/02** (se Hayashi capisce che le indagini si stringono).

## Note operative GM
- Si arriva a lui facilmente tramite il registro chiamate del cellulare di Tachibana (vittima)
- I PG dovrebbero proteggerlo dopo aver capito che il Nitōgun elimina i prestanome consapevoli (Ōkubo) — ma Nishimura formalmente non lo è
- Bel **dilemma morale**: è davvero al sicuro? Mettergli sorveglianza significa "sprecare" risorse, non metterla significa rischiare un quarto morto

## Deposizioni

### D-03 — Prima deposizione (Kōrin o Centrale, dal 12/02; verbalizza Yamada) — reticente
> «Sono Nishimura Tatsuya, lavoro al Kōrin da nove anni, cameriere capo. Il signor Tachibana è stato per me… mi ha insegnato tutto. Mercoledì mattina era al locale, come sempre: ha controllato gli ordini, ha telefonato a un paio di fornitori. Verso l'una e mezza è uscito, ha detto che aveva un appuntamento fuori città e che non sarebbe tornato per il servizio. Era tranquillo. Io ho fatto il turno della sera dalle sei alle due, il locale era pieno per la festa; l'ho saputo dalla signora Kobayashi il mattino dopo, dalla televisione. Se aveva nemici? Non lo so. Il signor Tachibana era un uomo rispettato, conosceva molte persone. Di scommesse non so niente: al Kōrin non si è mai parlato di scommesse. Kameoka? Ci sarò stato una volta, per una commissione. Preferirei non parlare della vita privata del signor Tachibana: non sta a me. Vorrei sapere quando riapriremo. Mia madre è malata e io ho bisogno di lavorare.»

Omette: la scommessa di ¥800.000 al capannone; i ¥150.000 ricevuti; Hayashi, che ha visto in faccia; che Mariko cenava al Kōrin. Una sola bugia: «una commissione».

### D-04 — Seconda deposizione (dopo il crollo)
> «Va bene. A metà gennaio il signor Tachibana mi ha chiesto un favore. Mi ha dato una busta con ottocentomila yen e un foglietto con un nome — un nome poetico, di quelli dei menu, non lo ricordo — e mi ha detto di andare a Kameoka una sera, che mi avrebbe aspettato un uomo. Ho preso l'ultimo autobus da Kameoka centro, poi dieci minuti a piedi su una strada sterrata: un capannone in mezzo ai campi, con delle serre intorno, e le auto coperte con dei teli. L'uomo che mi ha accolto era sui trentacinque anni, magro, capelli mossi, la sigaretta sempre in mano: lo riconoscerei. Ho scommesso, ho aspettato, ho ritirato due milioni e quattrocentomila yen e li ho portati al signor Tachibana il giorno dopo. Lui mi ha dato centocinquantamila yen "per il disturbo". Non ho chiesto niente: se me lo chiedeva lui, andava bene. C'era anche un signore alto, capelli grigi, che tutti salutavano con l'inchino, l'ho visto da lontano. Non so chi fosse. Non sapevo che fosse una truffa. I soldi li ho messi via per le cure di mia madre.»

Omette: niente. Da qui in poi riconosce Hayashi in foto e descrive Saitō.

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | +1 | Per lui chi comanda ha ragione: risponde al capo come rispondeva a Tachibana |
| Honda | 0 | Lo tratta da cameriere; Nishimura lo tratta da cliente |
| Nakamura | +1 | La pazienza è la sola cosa che lo sblocca senza umiliarlo |
| Sato | 0 | Un ragazzo: gentile, ma non gli affida niente |
| Fujita | +1 | Gli chiede della madre prima di chiedergli di Tachibana |

Con gli altri: Tachibana (vittima) **+3** (devoto) · Tachibana Setsuko (moglie separata) +1, +2 se gli affida il Kōrin · Aoyagi Mariko (amante) +1: la serviva senza far domande · Hayashi Tomoki: 0 finché è «l'uomo gentile del capannone», **−2** quando capisce · Sasaki Hideo (l'altro prestanome): non lo conosce · la cameriera Kobayashi Yumiko +1 · la madre **+4**.

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 12/02 | Lo sa dalla Kobayashi alle 07:30. Apre il Kōrin lo stesso «per sistemare», poi lo chiude. D-03 se i PG arrivano | come sopra |
| 13/02 | Setsuko arriva al locale: lui le consegna le chiavi e i registri ufficiali (non sa del secondo registro nel controsoffitto). Se i PG gli dicono che Sasaki ha già parlato, o gli mostrano il registro delle chiamate → D-04 | — |
| 15/02 (la notizia di Ōkubo Kenji ferito) | Chiede ai PG: «sono in pericolo?». Se rispondono onestamente e fanno passare una volante di notte: resta e collabora. Se lo liquidano («lei non c'entra»): non apre più la porta | +2 / −1 |
| Dal 18/02, se Hayashi è stato interrogato ed è libero | Hayashi lo considera un testimone: un uomo del giro ferma la madre al mercato («come sta suo figlio?»). Nishimura, senza protezione, porta la madre da parenti a Shiga e sparisce fino al processo; con protezione, resta e la sua paura diventa rabbia: testimonia contro Hayashi | −2 / +2 |
| 20/02 | Setsuko riapre il Kōrin e gli chiede di gestirlo: da quel momento è lui il padrone del locale — e il primo a volere che il nome di Tachibana resti pulito | — |
| 22/02 e oltre | Riconosce Hayashi in fotografia e in aula. I ¥150.000 li offre in restituzione: i PG decidono se sono una prova | — |

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[Luogo_Locale_Korin_Gion|Locale Kōrin — Gion]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]
- [[PNG_Aoyagi_Mariko_Amante|Aoyagi Mariko — Amante]]

---

# Nitōgun — Banda criminale (二刀軍)

> Gruppo criminale locale di Kameoka. Organizza combattimenti clandestini di galli, scommesse illegali, copertura tramite ristorante. Mandante della catena di omicidi del febbraio 1998.

---

## Identità

| Campo | Valore |
|---|---|
| Nome | Nitōgun (二刀軍, *"esercito delle due lame"*) |
| Origine | Anni '80, scissione da una piccola yakuza locale di Kameoka |
| Fondatore | Saitō Gorō |
| Sede operativa | Capannone agricolo dismesso, frazione Sogabe-chō, Kameoka-shi |
| Copertura | Ristorante Kameoka-tei (testa di legno Tachi Yūichirō), società Kameoka Nōji KK |
| Membri attivi | ~20 operativi (sicurezza, allibratori, addetti galli) + ~5 nucleo dirigente |
| Affari | Combattimenti clandestini di galli, scommesse, allibraggio illegale |
| Volume annuo | Stima ~¥80–120 mln di scommesse l'anno (solo via Tachibana (vittima)) |

## Simbolo distintivo

**Gallo stilizzato con due speroni sovrapposti sulla zampa destra** (ispirato al nome "due lame"). Il simbolo:
- **Non è pubblicamente noto** — circola solo all'interno del giro
- È inciso su monete commemorative interne, alcuni accendini regalati ai clienti VIP, il ricamo interno delle giacche dei dirigenti
- **Tachibana (vittima) lo traccia col sangue sul pavimento** della Kyoto Station come ultima dichiarazione: identifica i mandanti

> Per i PG: vedere il disegno **non identifica subito il Nitōgun**. È un "gallo con dettaglio strano" finché non viene incrociato con (a) testimonianze di clienti del giro, (b) archivi storici della Polizia su gruppi locali, (c) interrogatorio di un esperto di combattimenti clandestini, oppure (d) prova materiale (accendino, moneta) trovata in seguito durante perquisizioni.

## Struttura

### Vertice
- **Saitō Gorō** (51) — *kumicho* di fatto, ideologo, freddo, nazionalista. Mai aggressivo in prima persona, sempre delega.

### Logistica
- **Hayashi Tomoki** (35) — braccio destro, gestione operativa capannone e annunci sul Kyoto Shimbun, esattore. Tatuaggio carpa schiena (eredità yakuza giovanile).

### Esecuzione
- **Kuroda Ryō** (28) — picchiatore promosso a sicario, copertura come istruttore di pugilato. Esegue i 3 attentati. Non è professionista — lascia indizi che un veterano non lascerebbe.

### Allibraggio
- **Tachibana Eiji** (47, **vittima**) — allibratore principale, gestiva ¥80-120 mln/anno di scommesse. Operava dal locale Kōrin di Gion.

### Veterinario di servizio
- **Dr. Murakami Saburō** (52, **vittima**) — curava in nero i galli dal 1994. Ucciso per la truffa di gennaio.

### Operativi minori (al capannone)
- Sicurezza armata: 4-5 uomini, piccoli criminali con armi corte. Non yakuza, reclutati da Hayashi
- Allibratori secondari: 3 uomini ai banchi, gestiti da Tachibana (vittima)
- Addetti galli: 2 uomini per le gabbie e l'arena
- Vedette: 2 sulla strada di accesso

### Cliente di vertice (esterni alla banda)
- ~6 clienti scommettitori abituali (Hashimoto, Fujiwara, Inoue, Yoshida, Kimura, Tanaka Shōji), gestiti via telefono da Tachibana (vittima)
- Alcuni di alto profilo sociale (Tanaka Shōji — ex Kyocera; Fujiwara — collezionista Osaka)

### Coperture esterne
- **Tachi Yūichirō** (62) — testa di legno del ristorante Kameoka-tei (ignaro nel dettaglio, sa di "soldi sporchi" generici)
- **Sergente Inagaki Hiroshi** (47) — poliziotto corrotto, ¥200k/mese da 6 anni
- **Agente Yamaguchi Tetsuo** (32) — secondo poliziotto corrotto, ¥50k/mese

## Codice di comunicazione

Sistema basato sull'annuncio mensile del Ristorante Kameoka-tei sul **Kyoto Shimbun** (sezione "Annunci ristorazione"). Chiunque guardi vede solo un menu promozionale; chi è del giro decifra:

- "**Promozione speciale del [data]**" → giorno del combattimento (ore 23:00 al capannone)
- "**Menu del giorno scontato**" con 7 piatti dai nomi poetici → 7 combattimenti della serata, ogni nome poetico = codice del gallo in gara
- "**Sconto in %**" per piatto → quota di partenza per le scommesse

## Procedura di sicurezza al capannone
- 90 secondi per spegnere luci, far scappare scommettitori, nascondere galli vivi
- 2 vedette a 500 m con walkie-talkie
- Telefonata di allerta da Inagaki in caso di pattuglia in avvicinamento

## Vendetta progressiva (febbraio 1998)

A fine gennaio Saitō verifica la truffa del gallo sedato di gennaio. Decisione: **eliminazione progressiva** dei tre coinvolti.

| Bersaglio | Data | Esito |
|---|---|---|
| Tachibana Eiji (vittima) | 11/02 ore 21:21 | Successo (Kuroda) |
| Murakami Saburō (veterinario) | 13/02 ~14:00 | Successo (Kuroda, xilazina) |
| Ōkubo Kenji | 14/02 ore 22:30 | Fallimento parziale (Ōkubo ferito) |
| Ōkubo Kenji | 17/02 ~18:00 | Esito dipende dai PG |

## Punti deboli del Nitōgun (per i PG)

- **Hayashi è il punto crollabile**: con prove + patto giudiziario credibile può ribaltare tutto su Saitō
- **Inagaki sotto Affari Interni**: cede entro 1 settimana dalla pressione formale
- **Tachi Yūichirō**: cede se gli si fa capire che la moglie rischia accuse
- **Catena societaria Kameoka Nōji KK**: tracciabile fino a Saitō, ma indirettamente

## Cosa NON è il Nitōgun
- Non è yakuza strutturata (no Yamaguchi-gumi, no Aizu Kotetsu-kai). Saitō ha rotto col mondo yakuza ufficiale negli anni '80
- Non ha protezione politica ufficiale (a differenza di alcuni gruppi maggiori). I tentativi di corruzione di Tanaka Shōji e Fujiwara (clienti facoltosi) sui PG sono mossi dai clienti, non dal vertice del gruppo
- Non ha violenza diffusa: opera in modo silenzioso e mirato, evita scene di guerra aperta

## Esito investigativo previsto
- **Saitō non viene incastrato per gli omicidi** (omertà). Va in carcere per organizzazione combattimenti clandestini + evasione fiscale (4–6 anni)
- **Hayashi**: condanna media-alta se collabora; lunga se non collabora
- **Kuroda**: arresto possibile per l'omicidio Tachibana (prova balistica + impronta + telecamera + descrizione testimoni). Verosimile ergastolo
- **Inagaki/Yamaguchi**: licenziamento + condanna minore
- **Tachi Yūichirō**: collaboratore di giustizia, sconto pena
- **Tono finale**: vittoria amara. Saitō uscirà vivo. Possibile gancio per future avventure.

## Statistiche delle comparse (GENKAI — Shōtotsu v3.1, da provare al tavolo)

Comparse senza scheda: attributi 5-6, **Ki come i PG** (attributo più basso + dado alto di 2d6): il GM lo tira o lo fissa nel campo 6-11.

| Chi | Attributi | Ki | Armi | Note |
|---|---|---|---|---|
| **Sicurezza armata** (4-5 uomini al capannone) | 5 dappertutto, Presenza 6 | 8 | *compatta .22/.25* (Lucidità 5, 2/1/4, danno 3) — il capo sicurezza un'*automatica 9mm* (3/2/4, danno 4); mazza da baseball (Silenzio 5, 2/2, danno 3); Lotta 1 | Ukemi: fuoco → Distacco 5, mani → Pazienza 5, manganello → Ascolto 5. Sparano solo se accerchiati: la procedura è spegnere le luci e far scappare la gente (90 secondi) |
| **Vedette** (2, a 500 m sulla strada) | 5 dappertutto | 7 | walkie-talkie, nessun'arma | La loro azione è vedere arrivare: Ascolto 5 contro chi si avvicina di notte senza luci |
| **Allibratori, addetti galli, autisti** | 5 dappertutto | 6-7 | nessuna | Non combattono: alzano le mani o corrono per le risaie |

Mod. Presenza all'iniziativa: +1 (Presenza 5) o 0 (Presenza 6).

## Come si comportano le comparse (e chi parla, dopo il blitz)

| Chi | Aspetto | Comportamento | Se fermati |
|---|---|---|---|
| **Sicurezza armata** (4-5) | 25-35 anni, giacche di pelle, capelli lunghi o rasati, uno con un dente d'oro: piccoli criminali di Kameoka e Osaka, reclutati da Hayashi | Un colpo di panico verso la porta, poi le risaie. Non parlano: 48 ore e fuori, con l'avvocato del gruppo | En −2 con tutti i PG; non danno un nome |
| **Vedette** (2) | Contadini della zona, 50-60 anni, pagati ¥20.000 a serata, con un walkie-talkie e un thermos | L'anello più debole: fermati, parlano entro un'ora — Hayashi «il ragazzo con la sigaretta» li paga, e li pagava anche l'anno scorso | +1 con chi non li tratta da criminali |
| **Allibratori secondari** (3) | Il più anziano tiene un quaderno personale nella giacca (cifre e sigle: un secondo taccuino) | Alzano le mani. Il vecchio, con calma, chiede un avvocato «per questioni fiscali» | 0; il quaderno vale più di loro |
| **Addetti ai galli** (2) | Mani segnate, odore di stalla, sanno tutto degli animali e niente delle persone | Sono gli unici che conoscevano il «dottore» (Murakami (veterinario)) di persona: lo hanno visto sedare nel retro | +1: parlano volentieri di galli, e così di tutto il resto |
| **I 60-80 spettatori** | Impiegati, commercianti, qualche volto noto | Fuggono, si vergognano, chiamano gli avvocati. Tra loro, se il GM vuole, un cliente facoltoso o un politico | — |

Il gruppo **non ha un En verso i PG**: ce l'hanno le persone. Per come cambia il Nitōgun nei dodici giorni (prima crepa il 14/02, incontro d'urgenza il 15, «avvisi» dal 16, «basta» il 18, annullamento del 22/02 se avvisato) vedi le tabelle *Come cambia nel tempo* di Saitō, Hayashi, Kuroda e Inagaki; per Tachi Yūichirō (testa di legno) `Luogo_Ristorante_Kameoka_tei`; per l'agente Yamaguchi `Luogo_Stazione_Polizia_Kameoka`.

## Collegamenti
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]
- [[PNG_Kuroda_Ryo_Esecutore|Kuroda Ryō — Esecutore]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]
- [[Luogo_Ristorante_Kameoka_tei|Ristorante Kameoka-tei — Copertura]]
- [[PNG_Sergente_Inagaki_Poliziotto_Corrotto|Sergente Inagaki — Poliziotto corrotto]]

---

# Ōkubo Kenji — Prestanome consapevole (Vittima 3)

> Ex collega di Tachibana (vittima), piccolo usuraio indipendente. Aveva intuito la truffa e scommesso di tasca propria. Sopravvive al primo attentato del 14 febbraio.

## Anagrafica
- **Nome**: Ōkubo Kenji (大久保 健次)
- **Età**: 41 anni
- **Residenza**: Kamigyō-ku, Kyoto, appartamento al 4° piano
- **Stato civile**: divorziato dal 1995, una figlia di 12 anni che vive con la madre a Nagoya
- **Lavoro**: usuraio non registrato (presta a piccoli ristoratori e commercianti di Gion e Pontochō)

## Aspetto e personalità
1,68 m, robusto, capelli rasati. Cicatrice sul mento (rissa giovanile). Veste sempre giubbotti di pelle e jeans. Parla forte, ride spesso, ma calcola sempre. Ex amico/collega di Tachibana (vittima) negli anni '80, poi rapporti professionali freddi ma di reciproco rispetto.

## Ruolo nella vicenda
- Aveva ricevuto da Tachibana (vittima) l'incarico di scommettere ¥2 mln come prestanome (ufficialmente "favore")
- Ha intuito la truffa dalle quote anomale + dal nervosismo di Tachibana (vittima)
- Ha scommesso di tasca propria ¥3 mln aggiuntivi
- Ha vinto ¥15 mln (quota 3 a 1): ¥6 mln consegnati a Tachibana (vittima), ¥9 mln tenuti per sé
- Il Nitōgun lo classifica come **complice consapevole**, non semplice prestanome

## Alibi e movimenti

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 sera | «A casa» | Vera: sente la notizia di Tachibana (vittima) al TG delle 23:00 | La Sig.ra Ueda (vicina, interno 404) lo ha sentito rientrare alle 19:00 e non uscire |
| 12–13/02 | «Via per lavoro» | Sparisce: 12/02 al Toyoko Inn di Karasuma (a nome suo, paga in contanti), 13/02 in un business hotel vicino a Nijō | Registri degli alberghi; non risponde al telefono di casa |
| 14/02 ore 22:30 | «Ero rientrato a casa, mi ha sparato un rapinatore» | Rientrato per 5 minuti a prendere la Tokarev e ¥600.000 prima di partire per Nagoya; **tentato omicidio** nel parcheggio (posto B-04): ferito alla spalla destra, ricoverato al Kyoto University Hospital, stanza 412 | Sig. Hayama e Sig.ra Ueda (H-15); la Tokarev è ancora nel comodino: non ha fatto in tempo |
| 17/02 ore ~18:00 | — | **Secondo attentato in ospedale** (Kuroda da fattorino del catering, veleno nella flebo): esito dei PG | — |

## Come si comporta
- **Primo contatto** (15/02, stanza 412): nega tutto, con la faccia di uno terrorizzato e la voce di uno che tratta. «Una rapina». Parla forte anche col braccio al collo
- **Sotto pressione**: non cede alla pressione, cede allo **scambio**. Chiede protezione esplicita prima di dire una parola vera: vuole che la ex moglie e la figlia a Nagoya siano protette, per iscritto
- **Si apre se**: ha la protezione formale (Taniguchi → Watanabe Hideo (procuratore): 24 ore). Allora dice tutto quello che sa (D-10) — e tiene per sé quello che gli serve
- **Si chiude se**: capisce che i PG lo usano come esca senza dirglielo, o se gli parlano della figlia come di una minaccia
- È **lucido, freddo, calcolatore** anche dopo il ferimento: conta chi entra nella stanza e a che ora cambia il piantone

## Cosa sa (= Storia, punto 27)
- **Non è mai stato al capannone**: sa solo, per sentito dire da Tachibana (vittima), che è «a ovest di Kameoka, vicino a un fiume»
- **Scommetteva per telefono tramite Tachibana (vittima)**, che gli passava le quote dei galli
- Sa che esiste un **ristorante di copertura** a Kameoka; il nome (Kameoka-tei) gli torna in mente solo se torchiato
- **Non conosce Saitō** (né di persona né di nome: «il capo della banda»), **né Hayashi, né Kuroda** — dell'uomo del parcheggio può dare solo la descrizione vaga dell'identikit
- Sa che **qualcuno della polizia avvisa la banda**, ma non nome né grado
- Conosce 2-3 clienti scommettitori **dai prestiti** (è usuraio): **Hashimoto Daisuke** e **Kimura Akira** (passatogli da un banchiere di Kawaramachi)
- Ha intuito la truffa di gennaio dalle quote anomale e ha scommesso di tasca propria

## Cosa nasconde (anche dopo aver iniziato a parlare)
- Ha ¥4 mln in contanti nascosti in una cassetta di sicurezza alla **Kyoto Shinkin Bank**
- Ha registrato di nascosto una conversazione telefonica con Tachibana (vittima) nel periodo della truffa (cassetta a casa, sotto la tavola del parquet)

## Indizi a casa sua (Kamigyō)
- Kyoto Shimbun di **gennaio 1998** con annuncio cerchiato a matita
- Cassetta audio nascosta con registrazione della telefonata Tachibana (prova a carico postuma)
- Quaderno con annotazioni delle scommesse personali, in chiaro
- Pistola illegale Tokarev TT-33 nel cassetto (non l'ha usata, presa per paura dopo l'omicidio Tachibana)

## Punto debole
La figlia di 12 anni a Nagoya. Disposto a tradire chiunque per proteggerla.

## Tentato omicidio del 14/02 ore 22:30
- Ōkubo era in cambio hotel dal 12/02, ma la sera del 14/02 **rientra brevemente al condominio** per recuperare la **pistola Tokarev** del cassetto comodino e ¥600.000 in contanti d'emergenza, prima di lasciare definitivamente Kyoto verso Nagoya il giorno seguente. È convinto che 5 minuti a casa siano un rischio gestibile. Si sbaglia.
- Sparatoria nel parcheggio sotterraneo del suo condominio (Kamigyō, posto B-04)
- Esecutore: Kuroda Ryō (in attesa dietro un pilastro)
- 2 colpi: uno manca, uno colpisce alla spalla destra
- Ōkubo riesce a ripararsi dietro la sua Nissan Skyline e gridare
- Un vicino di casa rientra in auto in quel momento dalla rampa: i fari illuminano la scena, Kuroda fugge a piedi per la rampa di uscita
- Ambulanza alle 22:42, ricovero al **Kyoto University Hospital** alle 23:15
- **Conseguenza investigativa**: la Tokarev resta nel cassetto del comodino — i PG la troveranno se perquisiscono l'appartamento, conferma indiretta che Ōkubo viveva nel terrore

## Note operative GM
- È la fonte che **apre due strade**: i clienti raggiungibili dai prestiti (Hashimoto, Kimura) e l'esistenza del ristorante di copertura e del poliziotto sul libro paga. **Non dà il capannone né i nomi della banda**: quelli vanno guadagnati altrove: da Sasaki Hideo (prestanome), da Inoue (cliente), dal codice degli annunci, dal pedinamento di Hayashi
- È anche il **bersaglio del 17/02**: dilemma morale e tattico per i PG (proteggerlo o lasciarlo come esca)
- La sua sopravvivenza all'attentato del 17/02 è uno dei principali esiti misurabili della campagna

## Statistiche (GENKAI — Shōtotsu v3.1, da provare al tavolo)

| Distacco | Pazienza | Silenzio | Lucidità | Ascolto | Presenza | Ki |
|---|---|---|---|---|---|---|
| 5 | 4 | 5 | 6 | 6 | 6 | **7** (Pazienza 4 + dado 3) — dal 14/02 ferito: Ki 3, in ospedale non combatte |

- **Senmon**: Lotta 1 (la rissa della cicatrice) · nessuna d'arma
- **Armi**: Tokarev TT-33 = *automatica 9mm* (attacco Lucidità 6, Estrarre 3 / Colpire 2 / Ricarica 4, danno 4) — mai usata, resta nel comodino
- **Ukemi** (chi lo attacca tira contro): fuoco → Distacco 5 · lame e mani → Pazienza 4 · manganello → Ascolto 6
- **Come combatte**: non combatte — si accuccia dietro l'auto e grida (14/02). Mod. Presenza all'iniziativa: 0

## Deposizioni

### D-09 — Prima deposizione (stanza 412, 15/02; verbalizza Yamada) — falsa
> «Ōkubo Kenji. Faccio il consulente finanziario, per conto mio. Sabato sera sono rientrato a casa, ero stato via qualche giorno per lavoro. Sono sceso dalla macchina e uno mi ha sparato. Non l'ho visto in faccia, era dietro un pilastro: uno alto, giubbotto scuro. Sarà stata una rapina, in quel garage entra chi vuole. Tachibana? Sì, lo conoscevo, abbiamo lavorato insieme tanti anni fa, poi ognuno per la sua strada; ci sentivamo ogni tanto. Mi dispiace per lui, l'ho saputo dalla televisione. Non so niente di galli e non so niente di scommesse. Non ho nemici, ho dei clienti. Perché ero via? Affari. Se avete finito, ho una spalla rotta e vorrei dormire. E chiamate mia figlia a Nagoya — no, non chiamatela. Lasciate stare.»

Mente su tutto tranne la dinamica. La figlia gli scappa di bocca: è la leva.

### D-10 — Seconda deposizione (16/02, con la protezione per Nagoya firmata; verbalizza Yamada) — = Storia, punto 27
> «Va bene, con la protezione per Nagoya scritta e firmata. Tachibana mi ha dato due milioni a inizio gennaio: "scommettili su questo gallo, quando ti dico io". Non sono mai stato al capannone — lui mi diceva le quote per telefono, io gli dicevo la cifra, tutto lì. So che è a ovest di Kameoka, vicino a un fiume, perché una volta gliel'ho chiesto. La quota era sbagliata: **troppo corta** per uno sfidante che tutti davano perdente contro un gallo che non aveva mai perso. Tre a uno, quando ne meritava sette. Lì ho capito che Eiji sapeva qualcosa. Ci ho messo tre milioni miei. Quindici milioni di vincita: sei a lui, nove me li sono tenuti, e non venite a chiedermeli. Eiji parlava di un ristorante di Kameoka che faceva da copertura — il nome… Kameoka-tei, se proprio volete — e diceva che "uno della polizia di là" avvisava la banda: mai un nome, mai un grado. Chi comanda non lo so. Non conosco nessuno di loro. L'uomo del garage: alto, atletico, giubbotto scuro imbottito, scarpe da ginnastica, il cappello di lana; la faccia no. Due dei miei clienti scommettevano con Eiji: Hashimoto Daisuke, che mi deve ancora quattro milioni, e Kimura Akira, un dentista, me lo ha passato un banchiere di Kawaramachi. Adesso portatemi via da qui.»

Omette anche adesso: la cassetta audio sotto il parquet; i ¥4 mln alla Kyoto Shinkin Bank. Della Tokarev, se gliela trovano: «per paura, e avevo ragione».

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | 0 | Tratta solo col capo: «lei decide? Allora parlo con lei». Il resto della squadra per lui è arredamento |
| Honda | −1 | L'usuraio annusa i debiti: «sergente, lei ha la faccia di uno che deve dei soldi a qualcuno». Se il GM vuole, sa a chi (il Kage di Honda) |
| Nakamura | +1 | Rispetta il professionista. Ma se il nome **Nakamura Kazuo** sta nel suo quaderno (a discrezione del GM), lo usa: «suo fratello mi deve ancora quattrocentomila yen» — e l'En scende a −1 |
| Sato | 0 | Un ragazzo: cortese, non gli affida niente |
| Fujita | 0 | «Lei mi legge, lo so. Legga pure» — la studia mentre lei lo studia |

Con gli altri: Tachibana (vittima) 0 — rispetto freddo: «un bastardo bravo» · l'uomo del garage **−4** · Hashimoto Daisuke (cliente, suo debitore) −1 · Kimura Akira (cliente, suo debitore) −1 · la figlia di 12 anni **+5**: l'unica cosa per cui tradirebbe chiunque · la ex moglie 0 · Saitō, Hayashi, Kuroda: non li conosce; Inagaki: «uno della polizia di là».

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 11/02 23:00 | Il TG. Capisce prima di tutti: «hanno cominciato da Eiji» | — |
| 12–13/02 | Sparisce (alberghi, contanti). Se i PG bussano alla porta di Kamigyō non c'è nessuno; se lo rintracciano in albergo, non apre a chi non mostra il tesserino dallo spioncino — e anche allora tratta dalla porta | — |
| 14/02 22:30 | Il parcheggio. Sala operatoria fino alle 03:00 | — |
| 15/02 | Cosciente: D-09. Se i PG hanno già qualcosa in mano (il quaderno delle scommesse dal suo cassetto, la Tokarev) la bugia dura mezz'ora | — |
| 16/02, **con la protezione scritta** | D-10. Da qui è la fonte che apre Hashimoto, Kimura, il Kameoka-tei e l'esistenza del poliziotto | +1 |
| 16/02, **senza protezione**, sotto pressione | Chiama un avvocato e non parla più: i PG perdono la strada dei prestiti fino al 22/02 | −1 |
| 17/02 ~18:00 | L'attentato. Se i PG lo hanno protetto (presidio doppio, cambio turno coperto) e Kuroda viene fermato o messo in fuga, Ōkubo **lo vede**: «è lui — non la faccia, il passo». Diventa il testimone chiave contro Kuroda | +2 con chi c'era |
| Se scopre di essere stato usato come esca a sua insaputa | Non parla più con quel PG: «mi avete venduto» | −3 |
| 18–21/02 | Convalescenza. Testimonia a verbale contro «l'uomo del garage» (confronto con Kuroda in custodia: lo riconosce dalla corporatura e dall'andatura). Se i PG trovano la cassetta sotto il parquet: alza le spalle — «allora avete tutto» | — |
| 21–22/02 | Dimesso: vuole Nagoya. Resta una parte lesa e un usuraio: il fascicolo su di lui lo apre la Procura (reati delegabili) | — |

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Kuroda_Ryo_Esecutore|Kuroda Ryō — Esecutore]]
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]

---

# Quadro d'insieme — chi era dove, En, deposizioni, interruttori

> Vista rapida per il GM, **derivata dalle schede**: in caso di dubbio vale la scheda del PNG (sezioni *Alibi*, *Come si comporta*, *Deposizione*, *En*, *Come cambia nel tempo*). I PNG minori (Tachi, la mama-san, Yui, i vicini di Ōkubo, Yamaguchi e Tsuda, i testimoni della stazione, il personale del Kōrin, il custode, la madre di Setsuko, la vicina dei Murakami, l'ospedale) stanno nei rispettivi `Luoghi/`.

## Chi era dove nei cinque momenti che contano

| PNG | mer 11/02 21:21 (Kyoto Station) | ven 13/02 ~14:00 (Yamashina) | sab 14/02 22:30 (Kamigyō) | mar 17/02 ~18:00 (ospedale) | dom 22/02 23:00 (capannone) |
|---|---|---|---|---|---|
| **Saitō Gorō** (capo) | A cena a Osaka, ricevuta 21:30 | Dal commercialista a Kyoto | In villa, al telefono col figlio 22:15–22:40 | Di ritorno da Nara (ricevuta 17:00) | Al capannone, se nessuno l'ha avvisato; altrimenti in villa |
| **Hayashi Tomoki** (logistica) | Al volante in zona Hachijō-ovest (Yui: «rientrato alle 23:30») | Al capannone, col fornitore di mangimi (alibi vero) | In auto a due isolati da Ōkubo (fuori 21:30 – dopo mezzanotte) | A cena al Kameoka-tei 18:30–21:00 | Al capannone; oppure dal 21/02 al telefono per annullare |
| **Kuroda Ryō** (esecutore) | Nel bagno del 3° piano | Nel retrobottega di Murakami | Al posto B-04, dietro un pilastro | In ospedale alle 17:40, in palestra alle 19:15 «sudato» | Al capannone se libero; in custodia se preso |
| **Inagaki** (sergente corrotto) | In turno a Kameoka 15–23 | In turno 07–15; alle 15:30 al bar con Yamaguchi | A casa; alle 23:05 la chiamata di Hayashi | In turno 15–23 | Libero e col telefono acceso — o arrestato dal 21/02 |
| **Yamaguchi** (agente corrotto) | In servizio a Kameoka | Al bar con Inagaki | A casa | In servizio | Come Inagaki: vanno presi insieme |
| **Tachi Yūichirō** (testa di legno) | Al Kameoka-tei, servizio fino alle 21:30 | Al ristorante | Ristorante chiuso alle 21:30, poi a casa | Serve la cena a Hayashi | Alla cassa fino alle 21:30, come sempre (deve restarci) |
| **Ōkubo Kenji** (prestanome consapevole) | A casa, TG delle 23:00 | In un business hotel vicino a Nijō | Colpito alla spalla, posto B-04 | Stanza 412 | Dimesso, verso Nagoya |
| **Dr. Murakami Saburō** (veterinario) | A casa con Hiroko | **Ucciso** | — | — | — |
| **Murakami Hiroko** (moglie) | A casa | A pranzo da un'amica; alle 16:30 trova il corpo | A casa con Aiko e Yūsuke | A casa | A casa |
| **Aoyagi Mariko** (amante) | Al Club Aoyagi 19:00–02:00 | A casa, dorme; parrucchiere alle 16:00 | Al club | Al club (o in partenza per Sapporo dal 18/02) | A Sapporo, o a Kyoto se protetta |
| **Tachibana Setsuko** (moglie separata) | A Maizuru, lezione fino alle 20:00 | A Kyoto: Kōrin e notaio | In albergo a Kyoto | A Maizuru | A Maizuru |
| **Nishimura Tatsuya** (prestanome, cameriere) | Al Kōrin, turno 18–02 | Al Kōrin chiuso, inventario | A casa con la madre | A casa con la madre (martedì) | Al Kōrin riaperto (dal 20/02) |
| **Sasaki Hideo** (prestanome, pachinko) | Alla sala fino a mezzanotte (VHS) | Alla sala | Alla sala | Alla sala | Alla sala |
| **Watanabe Toshio** (testimone) | Nel cubicolo a sinistra dalle 21:14 | A casa, in malattia | A casa | A casa | A casa, o dai suoceri a Ōtsu se il nome è uscito |
| **I sei clienti** | Tutti con alibi (tabella in `PNG_Clienti_Scommettitori`) | — | — | — | Inoue e Kimura indicano la strada; Fujiwara e Tanaka Shōji sono a casa con gli avvocati |

## En iniziali verso i PG (Yamamoto · Honda · Nakamura · Sato · Fujita)

| PNG | Y | H | N | S | F | Nota |
|---|---|---|---|---|---|---|
| Watanabe Toshio (testimone) | 0 | −1 | +1 | +1 | +2 | Con Fujita parla |
| Tachibana Setsuko | +1 | −1 | +1 | 0 | +1 | Rispetta il grado |
| Aoyagi Mariko | 0 | −1 | +1 | 0 | +2 | Il codice 0418 a chi ha ≥ +1 |
| Nishimura Tatsuya | +1 | 0 | +1 | 0 | +1 | Chi comanda ha ragione |
| Sasaki Hideo | +1 | +1 | +1 | +1 | +1 | −2 se aggrediti |
| Ōkubo Kenji | 0 | −1 | +1 | 0 | 0 | Honda: «lei deve dei soldi a qualcuno» |
| Dr. Murakami Saburō | −1 | −1 | 0 | +1 | +1 | Solo il 12/02 |
| Murakami Hiroko / Aiko / Yūsuke | 0 / 0 / 0 | 0 / −1 / −1 | +1 / 0 / 0 | +1 / +1 / −1 | +2 / +2 / 0 | Aiko solo con la madre |
| Hayashi Tomoki | −1 | 0 | −1 | 0 | −1 | Con Honda si tradisce |
| Kuroda Ryō | −2 | −1 | −1 | −1 | −2 | Odia l'autorità, teme Fujita |
| Saitō Gorō | 0 | −1 | −1 | −2 | −1 | Parla solo col capo |
| Inagaki Hiroshi | +1 | +1 | 0 | −1 | −1 | Con Honda, «noi sergenti» |
| Hashimoto Daisuke | +1 | +1 | +1 | +1 | +2 | Chiama Fujita di notte |
| Fujiwara Kentarō | −1 | −1 | −1 | −2 (+1 finto) | −1 | «Conosco suo zio» a Sato |
| Inoue Takeshi | +1 | +1 | +1 | +1 | +1 | +2 a chi promette di trovare l'assassino |
| Yoshida Mamoru | 0 | −1 | 0 | 0 | 0 | +1 con discrezione |
| Kimura Akira | 0 | −1 | +1 | 0 | 0 | Nakamura e il patto |
| Tanaka Shōji | 0 | −1 | −1 | 0 | 0 / −1 | Iwamoto (il Kage di Fujita) |
| Tachi Yūichirō | 0 | −1 | +1 | 0 | +1 | Reiko lo convince |
| Mama-san Reiko | 0 | −1 | +1 | 0 | +2 | Da pari con Fujita |
| Suzuki Yui | 0 | 0 | +1 | +1 | +1 | −1 al messaggero della verità |
| Yamaguchi Tetsuo / Tsuda Akira | 0 / +1 | 0 / 0 | 0 / 0 | +1 / 0 | +1 / 0 | Yamaguchi cede in 10 minuti |

Regola del manuale: En positivo si sottrae dal dado, negativo si aggiunge; se il bonus salva un tiro fallito, l'En cala di 1; ±4 e ±5 non si muovono coi tiri. **Le tabelle valgono all'inizio**: le colonne *Come cambia nel tempo* delle schede dicono dove vanno.

## Gli interruttori (cosa cambia gli altri PNG)

| Quando / se | Chi cambia |
|---|---|
| **12/02** briefing; i PG scelgono da dove partire | Murakami (veterinario) vive solo se lo portano via il 12. Watanabe regge solo se sentito da uno solo, con tatto |
| **13/02** la morte di Murakami | Mariko capisce che «il giro» ammazza (dal 15, con l'autopsia sui giornali). Le due famiglie in lutto: veglie tutte e due il **15/02 sera** (Fushimi e Yamashina) |
| **14/02** Ōkubo sopravvive | La prima crepa del Nitōgun; Inagaki lo sa alle 23:05 e si tradisce il 15 mattina («come sta Ōkubo?»); Hayashi e Inagaki si vedono il 15 alle 10:00 |
| **15/02** la notizia dell'usuraio ferito | Ondata di paura: Watanabe, Mariko, Nishimura, Sasaki chiedono «sono il prossimo?». Chi risponde con una pattuglia guadagna +1/+2; chi liquida perde la fonte |
| **Se i PG sentono Hayashi, Saitō, Tachi o Inagaki senza prove entro il 15–16/02** | Il Nitōgun sa dei PG: dal 16/02 gli «avvisi» (telefonate mute, l'animale morto, la foto del figlio di Yamamoto); Mariko parte per Sapporo il 17 salvo sorveglianza; Nishimura porta la madre a Shiga dal 18 |
| **Se un cliente facoltoso viene sentito** (Fujiwara, Tanaka Shōji) | Entro 24 ore Saitō lo sa; entro 48 ore un'offerta a un PG (¥5–10 mln) e la «telefonata amichevole» a Taniguchi (Corruzione 5) |
| **17/02** l'ospedale | Presidio doppio e cambio turno coperto: Kuroda non arriva alla stanza, o viene preso. Ōkubo che lo vede diventa il testimone chiave. Il 18/02 Saitō dice «basta» |
| **Fermo di Hayashi con prove + patto** | Crolla in 24–48 ore, quando l'avvocato del gruppo passa a Kuroda e Yui viene convocata. Senza patto: fuori allo scadere del fermo. Lui è l'unica via per Saitō |
| **Kuroda abbandonato** | Ribalta — ma la sua parola da sola non basta contro Saitō |
| **Inagaki agli Affari Interni in silenzio (Ogura Naomi)** | Arresto il 21/02, **insieme a Yamaguchi**: il 22/02 si gioca. Uno solo dei due, o un confronto diretto senza Affari Interni: Saitō annulla, il capannone è vuoto |
| **22/02 23:00** | Con Saitō dentro: combattimenti clandestini + evasione, 4–6 anni, mai gli omicidi. Vittoria amara |

## Deposizioni pronte (in prima persona, 120–220 parole: si consegnano se un PG manda Yamada a prenderle)

| N. | Chi | Quando | Dove sta | Nota |
|---|---|---|---|---|
| H-03 | Watanabe Toshio (testimone) — prima | Kōban, 11/02 22:30 | `PNG_Watanabe_Toshio_Testimone` | Materiale d'apertura |
| D-01 | Watanabe Toshio — seconda audizione | dal 12/02, con tatto | idem | I dettagli al secondo |
| D-02 | Tachibana Setsuko (moglie separata) | 12/02 16:00 | `PNG_Tachibana_Setsuko_Moglie` | Omette i ¥300.000 |
| D-03 / D-04 | Nishimura Tatsuya (prestanome) — reticente / dopo il crollo | dal 12/02 | `PNG_Nishimura_Tatsuya_Prestanome_Ignaro` | «Una commissione» |
| D-05 | Sasaki Hideo (prestanome) | dal 13/02 | `PNG_Sasaki_Hideo_Prestanome_Ignaro` | «Tanaka Nōki» |
| D-06 | Aoyagi Mariko (amante) | dal 13/02 | `PNG_Aoyagi_Mariko_Amante` | La cena del 2/02 con Hayashi |
| D-07 / D-08 | Murakami Hiroko (moglie) / Aiko (figlia, con la madre) | 13/02 sera / dal 15/02 | `PNG_Famiglia_Murakami` | Le piume, la busta |
| D-09 / D-10 | Ōkubo Kenji — falsa / dopo la protezione | 15/02 / 16/02 | `PNG_Okubo_Kenji_Prestanome_Consapevole` | = Storia, punto 27 |
| D-11 | Dr. Murakami Saburō (veterinario) — falsa | 12/02, se vivo | `PNG_Murakami_Saburo_Veterinario` | Lo shiba che non esiste |
| D-12 | Hayashi Tomoki (logistica), con l'avvocato | quando convocato | `PNG_Hayashi_Tomoki_Logistica_Nitogun` | «Verso le otto» |
| D-13 | Kuroda Ryō (esecutore) | dopo l'arresto | `PNG_Kuroda_Ryo_Esecutore` | Monosillabi |
| D-14 | Saitō Gorō (capo), spontanea con l'avvocato | quando il suo nome gira | `PNG_Saito_Goro_Capo_Nitogun` | Elenca lui le date giuste |
| D-15 | Inagaki Hiroshi (sergente corrotto), agli Affari Interni | dopo l'arresto | `PNG_Sergente_Inagaki_Poliziotto_Corrotto` | Nomi e date |
| D-16 | Tachi Yūichirō (testa di legno), dopo il crollo | quando cede | `Luogo_Ristorante_Kameoka_tei` | «Reiko non c'entra» |
| D-17…D-22 | I sei clienti (Hashimoto, Fujiwara, Inoue, Yoshida, Kimura, Tanaka Shōji) | quando raggiunti | `PNG_Clienti_Scommettitori` | Inoue disegna il capannone |
| D-23 | La mama-san Reiko | dal 13/02 | `Luogo_Club_Aoyagi_Kiyamachi` | Firma l'alibi di Mari |
| D-24 | Suzuki Yui (fidanzata di Hayashi) | dal 15/02 | `Luogo_Casa_Hayashi_Kameoka` | Gli orari che incastrano Hayashi |
| H-15 | Sig.ra Ueda e Sig. Hayama (vicini di Ōkubo) | 14/02 notte | `Luogo_Appartamento_Okubo_Kamigyo` | Nel rapporto del tentato omicidio |
| H-01 | Mori Sachiko (pulizie) e Tanigawa (bigliettaio) | 11/02 notte | `Luogo_Kyoto_Station_Scena_Crimine` | Nel verbale del Kōban |

I testi diventano handout HTML (formato «Verbale di sommarie informazioni», stile Ultima Lezione) nella fase handout: vedi `PIANO_HANDOUT_IMMAGINI.md`, sezione E.

---

# Saitō Gorō — Capo del Nitōgun

> Capo del gruppo criminale "Nitōgun" che organizza i combattimenti clandestini di galli. Mandante dei tre omicidi.

## Anagrafica
- **Nome**: Saitō Gorō (斎藤 五郎)
- **Età**: 51 anni
- **Residenza**: villa privata a Kameoka, periferia est, intestata a una società di comodo
- **Copertura**: titolare di una piccola società di import-export di prodotti tessili
- **Stato civile**: sposato (moglie Mieko, 47), 1 figlio adulto (28, vive a Tokyo, non sa nulla)

## Aspetto e personalità
1,78 m, corporatura imponente, capelli grigi corti. Mano sinistra: mancano la falange terminale del mignolo (vecchio rito *yubitsume* in epoca giovanile). Veste abiti scuri, kimono solo in casa. Parla poco, voce profonda, sempre calmo. Si arrabbia in silenzio. Profondamente nazionalista, legge libri di storia militare giapponese.

## Ruolo nella vicenda
- Capo storico del Nitōgun (gruppo nato negli anni '80 da una scissione yakuza minore)
- Proprietario del gallo sedato a gennaio
- **Decide la vendetta progressiva** dopo aver verificato la truffa con un'analisi sulla carcassa del gallo (fatta da un veterinario di Osaka)
- Ordina l'esecuzione di Tachibana (vittima), Murakami (veterinario), Ōkubo
- Non esegue mai personalmente — delega a Kuroda Ryō tramite Hayashi

## Alibi (impeccabili, costruiti)

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 sera | «A cena a Osaka, a Kita-Shinchi, con tre soci» | Vera: 19:30–22:30, ricevuta firmata alle 21:30. Alle 21:21 era a tavola, a 50 minuti d'auto dalla Kyoto Station | I tre commensali «puliti» (un grossista tessile, un commercialista di Osaka, il loro avvocato); la ricevuta; guidava lui la Mercedes |
| 13/02 | «Dal mio commercialista a Kyoto, 13:00–15:30» | Vera | Il commercialista di Karasuma, l'agenda |
| 14/02 sera | «A casa con mia moglie; ho telefonato a mio figlio a Tokyo» | Vera: telefonata 22:15–22:40, l'ora esatta dei colpi a Kamigyō | Tabulati NTT del fisso della villa; Mieko; il figlio Hiroto |
| 17/02 | «Al tempio, a Nara, con mia moglie» | Vera: ricevuta dell'offerta delle 17:00 | La ricevuta, Mieko, il custode del parcheggio del tempio ricorda la Toyota Century |
| 15/02 mattina | — | Hayashi gli riferisce dei PG, dal prepagato al prepagato («S.G.») | Solo dai tabulati del prepagato di Hayashi, se sequestrato |

Tutti gli alibi sono **veri ma costruiti ad arte**: Saitō programma le sue giornate per essere visibile e tracciabile nei momenti chiave.

## Come si comporta
- **Primo contatto**: si presenta volontariamente, accompagnato dall'avvocato. Chiama i PG per grado, offre il tè, nega ogni coinvolgimento con calma totale. Tachibana (vittima)? «Un ristoratore di Gion che ha frequentato il mio circolo di poesia haiku»
- **Sotto pressione**: mostra ricevute, agende, testimoni. Non si fa intimidire, non alza mai la voce, non perde mai la pazienza. Chi urla, per lui, ha già perso
- **Non crolla mai**: professionista, ha già retto interrogatori negli anni '80. L'unico modo per incastrarlo è una **prova documentale** o la testimonianza diretta di Hayashi (Kuroda da solo non basta)
- **Una sola incrinatura**: se qualcuno nomina il figlio Hiroto, la tazza si ferma a mezz'aria per un secondo. Poi riprende. Chi lo nota (Ascolto, o Fujita) sa qual è la leva — e sa che usarla costa: da lì gli «avvisi» diventano personali

## Cosa sa
- Tutto. È il mandante.
- Conosce per nome ogni cliente scommettitore importante
- Conosce il poliziotto sul libro paga (sergente **Inagaki Hiroshi**, Polizia di Kameoka)

## Cosa nasconde
- Tutto.
- Possiede una piccola collezione di armi illegali in un nascondiglio della villa (non sulla scena dei delitti)
- Ha fatto sparire fisicamente il gallo sedato (carcassa cremata dopo l'analisi)

## Punto debole
Nessuno evidente. È prudente, esperto, freddo. L'unica leva possibile: il figlio di 28 anni a Tokyo, che ignora tutto. Saitō farebbe molto per proteggerlo dalla vergogna pubblica.

## Tentativi sui PG (se fanno troppe pressioni)
- Prima fase: avvocati che minacciano cause per diffamazione
- Seconda fase: pressioni indirette tramite politici locali "amici"
- Terza fase: avvisi (animale morto sulla porta, foto di familiari in cassetta postale)
- **Mai aggressione diretta a un investigatore**: troppo costosa

## Esito investigativo
- **Non viene incastrato per gli omicidi** (omertà dei sottoposti)
- Viene incriminato per **organizzazione di combattimenti clandestini** e **evasione fiscale**
- Probabile condanna 4–6 anni di reclusione, niente ergastolo
- Il suo gruppo viene smantellato, ma lui rimane vivo e potenzialmente pericoloso (gancio per future avventure)

## Note operative GM
- Saitō è il "Moriarty" silenzioso: i PG sanno che è lui ma non possono dimostrarlo
- Confronto diretto possibile in un solo momento: durante un interrogatorio formale o un incontro casuale a Gion
- Frase tipica in caratterizzazione: *"Non ho idea di cosa stia parlando, ispettore. Posso offrirvi un tè?"*

## Statistiche (GENKAI — Shōtotsu v3.1, da provare al tavolo)

| Distacco | Pazienza | Silenzio | Lucidità | Ascolto | Presenza | Ki |
|---|---|---|---|---|---|---|
| 8 | 7 | 8 | 7 | 6 | 8 | **11** (Ascolto 6 + dado 5) |

- **Senmon**: Ambienti yakuza 2 (conoscenza: ci è nato) · Economia e finanza 1 · nessuna d'arma
- **Armi**: due Beretta 92FS nella panic room = *automatica 9mm* (Lucidità 7, 3/2/4, danno 4) — mai in scena
- **Ukemi** (chi lo attacca tira contro): fuoco → Distacco 8 · lame e mani → Pazienza 7 · manganello → Ascolto 6
- **Come combatte**: mai. Chiama l'avvocato, offre il tè. Il suo peso si sente negli interrogatori, non negli scambi. Mod. Presenza all'iniziativa: −2

## Deposizione — D-14 (dichiarazione spontanea in Centrale, con l'avvocato, quando sente che il suo nome gira; verbalizza Yamada)
> «Saitō Gorō, cinquantuno anni, amministratore della Kameoka Nōji, terreni agricoli e commercio tessile, residente a Kameoka. Mi presento di mia iniziativa perché il mio nome, mi dicono, è stato fatto. Il signor Tachibana lo conoscevo come ristoratore di Gion: ha frequentato per un periodo il nostro circolo di poesia haiku, al Kameoka-tei, un uomo di gusto, lo dico con dispiacere. L'ho visto l'ultima volta prima di Capodanno. La sera dell'undici febbraio ero a cena a Osaka, a Kita-Shinchi, con tre soci: ho la ricevuta e i nomi, il mio avvocato ve li lascia. Il tredici ero dal mio commercialista a Kyoto, il quattordici a casa con mia moglie — ho telefonato a mio figlio a Tokyo alle dieci e un quarto — e il diciassette a Nara, al tempio, con lei. Combattimenti di galli: ne ho sentito parlare da ragazzo, a Kameoka si raccontava di tutto. La mia società possiede dei magazzini a Sogabe, in disuso, che il signor Hayashi controlla per me. Il sergente Inagaki lo conosco come conoscono tutti, a Kameoka, la polizia: buongiorno e buonasera. Se avrete altro da chiedermi, la mia porta è aperta. Il tè è sempre pronto.»

Vero: gli alibi, il circolo haiku, «prima di Capodanno» (era al capannone di dicembre). Falso: tutto il resto. Nota per il GM: elenca lui stesso gli alibi delle quattro date giuste — un uomo innocente non sa quali sono le date che contano.

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | 0 | «Parlo con lei, ispettore capo»: rispetta il grado e ignora il resto. −1 dal momento in cui Yamamoto alza la voce |
| Honda | −1 | Un sergente: non vale una frase intera |
| Nakamura | −1 | Riconosce l'interrogatore e si diverte: risponde alle domande con altre domande |
| Sato | −2 | Non gli rivolge la parola: «il ragazzo può aspettare fuori» |
| Fujita | −1 | Cortesia gelida. È l'unica che teme: una profiler capisce dov'è la leva (il figlio) |

Con gli altri: Hayashi Tomoki +1 (utile: lo tiene finché serve) · Kuroda Ryō 0 (uno strumento; −2 dopo il secondo fallimento) · Inagaki (sergente corrotto) −1: disprezza chi si vende · Tachi Yūichirō −2 · Fujiwara Kentarō (cliente) +1, un pari · Tanaka Shōji (cliente) +1 · il politico locale delle riprese Super 8 +1, «un amico» · Tachibana (vittima) **−5**, vendetta consumata · Murakami (veterinario) −4 · Ōkubo −3 · la moglie Mieko +2 · il figlio Hiroto **+4**: la leva.

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| Fine gennaio | La carcassa analizzata a Osaka. Decide i tre nomi, in ordine | — |
| 11–14/02 | Costruisce gli alibi, un giorno alla volta. Non tocca un telefono che non sia il prepagato | — |
| 15/02 | Hayashi gli riferisce dei PG: chiama l'avvocato, «tenetevi pronti» | — |
| 16/02, se i PG suonano al cancello | Il tè. Tutto vero e tutto inutile. Il giorno dopo, D-14 spontanea in Centrale | — |
| 18/02, se l'ospedale è fallito | «Basta.» Niente più tentativi: Kuroda a Osaka. Da qui difende, non attacca | — |
| Se Hayashi o Kuroda vengono fermati | Manda l'avvocato del gruppo. Se li fermano tutti e due, l'avvocato va da **Hayashi** (sa troppo) e Kuroda resta solo: è Saitō a sacrificarlo — e Kuroda, abbandonato, ribalta, ma la sua parola non basta | — |
| Pressione dei PG, in tre fasi | 1) dal 16/02 lettere dell'avvocato per diffamazione a Taniguchi; 2) dal 18/02 una telefonata «amichevole» dalla prefettura al commissario («andiamoci piano con l'imprenditore Saitō» — Corruzione 5 del distretto); 3) dal 19/02 gli avvisi: un animale morto sulla porta di chi indaga, una foto del figlio di Yamamoto all'uscita di scuola nella cassetta della posta (il Kage di Yamamoto). **Mai un'aggressione diretta** | — |
| 20/02, se Inagaki gli riferisce di un blitz in preparazione (o se Yamaguchi, libero, ha saputo che Inagaki è agli Affari Interni) | **Annulla il 22/02**: Hayashi chiama i clienti. Il blitz trova il capannone con gabbie, paglia e sangue secco: reati minori, nessun Saitō | — |
| 22/02 23:00, se nessuno l'ha avvisato | È al capannone, nell'ufficio in fondo. Arrestato con tutti gli altri: combattimenti clandestini, evasione (Kameoka Nōji), armi nella villa. **Non gli omicidi**. 4–6 anni | — |
| Se si nomina il figlio Hiroto per incastrarlo | Non cede. Ma da quel momento la pressione sui PG diventa personale, e Saitō non dimentica: gancio per una campagna | −3 |

## Collegamenti
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]
- [[PNG_Kuroda_Ryo_Esecutore|Kuroda Ryō — Esecutore]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]
- [[PNG_Sergente_Inagaki_Poliziotto_Corrotto|Sergente Inagaki — Poliziotto corrotto]]

---

# Sasaki Hideo — Prestanome ignaro

> Gestore di una sala pachinko. Ha scommesso ¥1 mln per Tachibana (vittima) credendo fosse un favore amichevole, senza sapere nulla della truffa. **Non è bersaglio del Nitōgun**.

## Anagrafica
- **Nome**: Sasaki Hideo (佐々木 秀雄)
- **Età**: 44 anni
- **Residenza**: Nakagyō-ku, Kyoto
- **Lavoro**: gestore della sala pachinko **"Pachinko Sasaki"** in Kawaramachi-dōri
- **Stato civile**: sposato con Reiko (moglie di Sasaki; non è Tachi Reiko né la mama-san Reiko), 40, 2 figli (10 e 6)

## Aspetto e personalità
1,70 m, sovrappeso, capelli pettinati indietro con gel. Camicia hawaiana fuori dal lavoro. Cordiale, parla forte, ride volentieri. Onesto nei limiti del suo lavoro (la sala pachinko è in regola, paga le tasse). Frequenta lo stesso club di golf di Tachibana (vittima) da 10 anni — rapporto di amicizia genuina.

## Ruolo nella vicenda
- A inizio gennaio Tachibana (vittima) gli chiede "un favore tra amici": andare a un certo capannone con ¥1 mln, scommettere su un gallo specifico, ritirare l'eventuale vincita
- Sasaki accetta senza fare domande (Tachibana (vittima) lo aiutò economicamente nel '92, Sasaki gli deve un favore morale)
- Esegue la scommessa il giorno del combattimento, vince ¥3 mln, consegna tutto a Tachibana (vittima) il giorno dopo, riceve ¥200.000 come "ringraziamento"
- **Non sa** che era una truffa orchestrata
- **Non sa** del Nitōgun come gruppo strutturato — pensa fossero "scommesse private tra appassionati"

## Alibi

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 sera | Alla sala pachinko fino a mezzanotte | Vera | Decine di clienti, il registro del personale, la cassetta VHS della sorveglianza interna (lo si vede alla cassa alle 21:20) |
| 13/02, 14/02, 17/02 | Alla sala (10:00–24:00) o a casa a Nakagyō | Vera | Personale della sala, la moglie Reiko |
| La sera del combattimento di gennaio (se glielo chiedono) | «A Kameoka, per il favore a Eiji» — lo dice subito | Vera | Alla moglie aveva detto «a golf con un amico»: è l'unica bugia della sua vita recente, e gli pesa |

## Come si comporta
- **Primo contatto**: sorpreso, sincero, collaborativo dal primo minuto. Parla forte, si asciuga la fronte, racconta il favore senza che glielo chiedano due volte
- **Sotto pressione**: non serve fargliene. Se i PG sono aggressivi si chiude, chiama l'avvocato della sala (un'ora di gioco persa) e da lì risponde solo per iscritto
- **Si apre se**: gli si mostra comprensione e gli si dice chiaro che, collaborando, la sala e la famiglia non avranno conseguenze
- **Ha paura** dal momento in cui capisce di essere stato un prestanome in un giro illegale: si preoccupa per la moglie e i figli, chiede se rischia accuse. **Crolla emotivamente** ma non è mai ostile: un uomo onesto che si sente intrappolato

## Cosa sa
- Posizione approssimativa del capannone (è stato lì una volta, ricorda *"a Kameoka, in mezzo ai campi, vicino a un fiume, c'è un grande capannone con un'insegna scolorita di un rivenditore agricolo chiuso"*)
- Descrizione fisica di **Hayashi** (l'uomo che lo ha accolto al capannone)
- Descrizione fisica di **Saitō** (lo ha visto da lontano)
- Numero di telefono della sua chiamata in arrivo da Tachibana (presente nel registro del cellulare della vittima)

## Cosa nasconde
- Niente di significativo. È sincero.
- Imbarazzato per i ¥200.000 ricevuti, vorrebbe restituirli (alla famiglia di Tachibana (vittima)?)

## Punto debole
La famiglia. Reagisce molto bene se i PG gli mostrano comprensione e gli garantiscono che, collaborando, non avrà conseguenze sulla sua attività.

## Valore investigativo
**Alto**, paradossalmente. Sasaki è il **testimone più cooperativo** dei tre prestanome:
- Conferma il funzionamento del sistema scommesse
- Dà una **descrizione visiva** del capannone utile per circoscrivere l'area
- Identifica visivamente Hayashi e Saitō dalle foto segnaletiche

## Note operative GM
- Risale facilmente: una delle 10 chiamate sul cellulare di Tachibana (vittima) è la sua
- Se i PG sono cortesi, è una **risorsa enorme** con poco sforzo
- Se sono aggressivi, si chiude e chiama un avvocato (perdita di un'ora di gioco)

## Deposizione — D-05 (alla sala o in Centrale, dal 13/02; verbalizza Yamada)
> «Sasaki Hideo, gestisco il Pachinko Sasaki a Kawaramachi. Eiji — il signor Tachibana — era un amico, giocavamo a golf da dieci anni, e nel '92, quando ho rischiato di chiudere, mi ha prestato dei soldi senza chiedermi niente. A inizio gennaio mi ha chiesto un favore. Mi ha detto: "Vai a Kameoka una sera, ti dico dove, scommetti un milione su un gallo, ritira la vincita e portamela. Preferisco che il mio nome non giri". Non ho fatto domande, non gliele avrei fatte mai. Ci sono andato con la mia auto: a ovest di Kameoka, in mezzo ai campi, c'è un fiume vicino, un capannone grande con un'insegna scolorita di un rivenditore agricolo — Tanaka qualcosa, "Nōki". Dentro c'era un sacco di gente, banchi per le scommesse, un'arena. Mi ha accolto un uomo magro, sui trentacinque, capelli mossi, gentile, con la sigaretta. Il gallo ha vinto: tre milioni. Li ho consegnati a Eiji il giorno dopo al Kōrin. C'era anche un uomo alto, sui cinquanta, capelli grigi, che stava in disparte e comandava con gli occhi; l'ho visto da lontano. Mia moglie non sa niente: le ho detto che ero a golf. Io pensavo fosse una cosa tra appassionati. Adesso ho paura, ve lo dico chiaro. Cosa rischio? Ho due bambini.»

Omette: i ¥200.000 del «ringraziamento». Se glielo chiedono: «mi ha offerto qualcosa, ho detto di no» — arrossisce, ed è l'unica bugia.

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | +1 | Un uomo d'ordine che parla con un uomo d'ordine |
| Honda | +1 | Golf, scommesse sportive, pachinko: Honda parla la sua lingua e Sasaki si rilassa |
| Nakamura | +1 | Gli lascia finire le frasi |
| Sato | +1 | «Lei ha l'età di mio nipote» — gli offre il tè |
| Fujita | +1 | Gentile con tutti, con lei di più: gli ricorda che ha una famiglia da proteggere |

Con i PG aggressivi scende a −2 in un minuto e chiama l'avvocato. Con gli altri: Tachibana (vittima) **+2** (leale: il favore del '92) · Hayashi Tomoki: 0 finché è «l'uomo gentile», −2 quando capisce · Saitō Gorō −1: «quello comandava con gli occhi» · la moglie Reiko +3 · Nishimura Tatsuya (l'altro prestanome): non lo conosce · Inoue Takeshi (cliente): si salutano al golf, 0.

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 12/02 | Lo sa dal TG. Telefona al Kōrin, non risponde nessuno. Non chiama la polizia: non sa se «quella cosa» c'entra | — |
| 13/02 | I PG arrivano dal registro delle chiamate → D-05 subito. Riconosce Hayashi (foto della patente, via prefettura) e Saitō (foto segnaletica degli anni '80, archivio di Gonda) se gliele mostrano | +1 |
| Se i PG lo sentono in divisa dentro la sala, davanti alla moglie | Reiko scopre la «sera a golf»: scenata alla cassa. Sasaki collabora lo stesso, ma chiede che la prossima volta lo chiamino | 0 |
| 15/02 (la notizia di Ōkubo Kenji ferito) | «Sono il prossimo?». Se una volante passa davanti alla sala per due sere: si calma e resta la fonte migliore. Se no: assume un vigilante privato e continua a collaborare lo stesso — è fatto così | +2 / +1 |
| Se i PG gli dicono di restituire i ¥200.000 | Li porta a Setsuko in una busta bianca, con un inchino lungo: una scena, non un indizio | +1 |
| 22/02 e oltre | Riconosce Hayashi in un confronto; testimonia sul capannone e sull'insegna «Tanaka Nōki». Il suo nome resta fuori dai giornali solo se i PG ci tengono | — |

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]

---

# Sergente Inagaki Hiroshi — Poliziotto corrotto

> Sergente della Polizia di Kameoka. Sul libro paga del Nitōgun da circa 6 anni. Ostacola dall'interno l'indagine sui combattimenti clandestini.

## Anagrafica
- **Nome**: Inagaki Hiroshi (稲垣 寛)
- **Età**: 47 anni
- **Residenza**: Kameoka, casa di proprietà
- **Lavoro**: Sergente, **Stazione di Polizia di Kameoka** (sezione ordine pubblico)
- **Stato civile**: sposato con Yoshiko (45), 2 figli (adolescenti, 16 e 13)
- **Anzianità**: in polizia dal 1973 (25 anni di servizio)

## Aspetto e personalità
1,73 m, robusto, capelli grigi corti. Volto rugoso da fumatore (Mild Seven da 25 anni). Veste sempre l'uniforme con cura. Di carattere ruvido, parla a scatti, autoritario con subordinati e civili. Si considera un "professionista pratico" — giustifica la corruzione come "compensazione" per uno stipendio insufficiente.

## Ruolo nella vicenda
- Da circa 6 anni riceve da Saitō ¥200.000 al mese per:
  - Chiudere un occhio sui movimenti notturni nel capannone una volta al mese
  - Avvisare in anticipo eventuali controlli o pattuglie pianificate nella zona
  - Non aprire indagini sui rumori di combattimenti animali segnalati da contadini (che archivia come "rumori di animali da fattoria")
- **Non è coinvolto negli omicidi**, non sapeva del piano di vendetta
- Reagisce con preoccupazione agli omicidi: capisce che l'esposizione del giro lo travolgerà
- Cerca di **rallentare** l'indagine dei PG senza esporsi

## Alibi (dov'era, per il registro)

| Data | Dove era | Come si verifica |
|---|---|---|
| 11/02 sera | Turno 15:00–23:00 alla Stazione di Kameoka: con gli omicidi non c'entra | Registro turni |
| 13/02 | Turno 07:00–15:00; alle 15:30 al bar davanti alla stazione con l'agente Yamaguchi | Registro, il barista |
| 14/02 sera | Riposo, a casa. **Alle 23:05 riceve sul telefono privato una chiamata di Hayashi** (dal prepagato): «l'usuraio è vivo, è in ospedale» | Tabulati del suo telefono privato (ordine del procuratore, 48 ore) |
| 15/02 10:00 | Parcheggio del supermercato di Kameoka, con Hayashi: incontro d'urgenza sui PG | Sorveglianza |
| 17/02 | Turno 15:00–23:00 | Registro turni |

Non è sospettato di omicidio: le sue azioni di copertura emergono gradualmente.

## Modo di operare contro i PG
- Se i PG si rivolgono alla Polizia di Kameoka per informazioni, Inagaki si propone come **referente locale**
- Fornisce informazioni distorte:
  - "Quel capannone è in disuso da anni"
  - "I rumori sono di una fattoria di polli abbandonata"
  - "I residenti sono persone tranquille"
- Tenta di **ritardare** mandati di perquisizione passando documenti tra uffici sbagliati
- **Avvisa Saitō** dei movimenti dei PG (telefono privato)

## Come si comporta
- **Primo contatto**: solidarietà collegiale, «siamo tutti dalla stessa parte», caffè offerto, il tono di chi conosce la zona meglio di chiunque. Si propone come referente
- **Il tic**: il 15/02 mattina chiede ai PG «come sta Ōkubo?» prima che il ricovero sia pubblico. Chi lo nota ha la prima crepa
- **Sotto pressione**: ostile, gioca la carta dell'anzianità («sono in polizia da venticinque anni»), minaccia il sindacato. Se i PG lo affrontano direttamente **senza** gli Affari Interni, nega tutto e la sera stessa avvisa Saitō: il 22/02 salta
- **Si apre solo** quando è arrestato dagli Affari Interni (l'ispettrice Ogura Naomi) e rischia il licenziamento senza pensione: allora collabora per ridurre la pena e **fornisce nomi precisi** e date di pagamenti (D-15)

## Cosa sa
- Conferma diretta che Saitō è il capo del Nitōgun
- Date di tutti i combattimenti dell'ultimo anno
- Posizione esatta del capannone
- Identità di **Hayashi** come intermediario
- Esistenza di **almeno un altro poliziotto** coinvolto in zona (un agente semplice, **Yamaguchi Tetsuo**, 32 anni, non sospettato dai PG ma anch'egli sul libro paga per ¥50.000 al mese)

## Cosa nasconde
- Una busta nascosta in casa con ¥3,8 mln in contanti (risparmi delle tangenti)
- Un piccolo deposito al Pachinko di un parente con ¥7 mln in più
- L'altro poliziotto coinvolto (per pura solidarietà collegiale)

## Punto debole
- La **pensione** (mancano 3 anni)
- I **figli adolescenti** (vergogna pubblica)
- Il **collega** complice (si tradiscono a vicenda quando entrambi sotto pressione)

## Valore investigativo
**Decisivo per chiudere il giro**. Inagaki è la chiave per:
- Smantellare ufficialmente la copertura del Nitōgun
- Aprire indagini interne nella Polizia
- Ottenere la **collaborazione formale** dell'Affari Interni della Polizia Prefetturale di Kyoto

## Reazione del Nitōgun se Inagaki crolla
- Saitō capisce che è la fine
- Possibile tentativo di **far sparire** Inagaki prima che parli (Kuroda, se ancora libero)
- Se Inagaki muore in custodia o "si suicida", è un campanello d'allarme per i PG: significa che il Nitōgun ha ancora portata operativa

## Note operative GM
- I PG lo incontrano **inevitabilmente** se cercano informazioni su Kameoka
- Il suo ostruzionismo deve essere **percepibile ma non smaccato**: dosare bene
- Confronto chiave: i PG capiscono che è corrotto **circa al giorno 14-15/02**, dopo il tentato omicidio di Ōkubo (Inagaki era stranamente al corrente di dettagli che non avrebbe dovuto sapere)

## Statistiche (GENKAI — Shōtotsu v3.1, da provare al tavolo)

| Distacco | Pazienza | Silenzio | Lucidità | Ascolto | Presenza | Ki |
|---|---|---|---|---|---|---|
| 6 | 5 | 5 | 5 | 5 | 7 | **9** (Pazienza 5 + dado 4) |

- **Senmon**: Pistola 1 (25 anni di poligono) · Conoscere il quartiere (Kameoka) 2
- **Armi**: revolver New Nambu d'ordinanza (Lucidità 5, Estrarre 4 / Colpire 2 / Ricarica 5, danno 4) · keibō (Silenzio 5, 2/2, danno 2) · Lotta 1
- **Ukemi** (chi lo attacca tira contro): fuoco → Distacco 6 · lame e mani → Pazienza 5 · manganello → Ascolto 5
- **Come combatte**: non spara mai ai colleghi — se scoperto alza le mani e chiama il sindacato. Il pericolo per lui è Kuroda, non i PG. Mod. Presenza all'iniziativa: −1

## Deposizione — D-15 (dichiarazione agli Affari Interni dopo l'arresto; verbalizza l'ispettrice Ogura Naomi)
> «Inagaki Hiroshi, sergente, venticinque anni di servizio. Sì. Dal 1992. Duecentomila yen al mese, in contanti, in una busta, il primo lunedì del mese, nel parcheggio del supermercato di Kameoka, da Hayashi Tomoki, per conto di Saitō Gorō. In cambio: nessuna pattuglia sulla strada di Sogabe nelle sere segnate, una telefonata se ne passava una comunque, le segnalazioni dei contadini archiviate come rumori di fattoria. Le date dei combattimenti dell'ultimo anno sono quelle degli annunci del Kameoka-tei sul giornale, le ho tutte in agenda con una crocetta. L'agente Yamaguchi Tetsuo prende cinquantamila yen dal '95, gliel'ho passato io, lo lascino stare, ha due bambini — no, lo mettano a verbale, è giusto così. Degli omicidi non sapevo niente, lo giuro sui miei figli: quando Hayashi mi ha chiamato la notte del quattordici per dirmi dell'usuraio ho capito che stavano ammazzando la gente, e sono rimasto zitto. Sono rimasto zitto. Mi mancano tre anni alla pensione. Cosa succede alla pensione?»

Omette anche adesso: i ¥3,8 mln in casa e i ¥7 mln al pachinko del parente. Sulla data d'inizio dice il vero (1992: sei anni).

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | +1 | Deferenza verso il grado, con un fondo di risentimento: «voi di Kyoto» |
| Honda | +1 | Un sergente come lui: «noi facciamo il lavoro, loro firmano». È il PG a cui si tradisce più facilmente |
| Nakamura | 0 | Lo tratta da collega finché non capisce che lo sta interrogando |
| Sato | −1 | «Il ragazzino»: non gli risponde nemmeno, risponde a chi lo accompagna |
| Fujita | −1 | Vecchia scuola: una donna ispettore lo irrita. E lei è quella che nota il tic |

Con gli altri: Saitō Gorō −1 (si vende, e disprezza chi lo compra) · Hayashi Tomoki 0 · l'agente Yamaguchi Tetsuo +1: l'ha corrotto lui e lo protegge · l'ispettore Tsuda Akira (capo stazione, onesto) 0, con la paura di essere scoperto · la moglie Yoshiko e i figli +3 · l'ispettrice Ogura Naomi (Affari Interni) **−3** dal momento in cui gli mette gli occhi addosso.

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 12/02, se i PG passano da Kameoka | Si fa avanti come «esperto della zona»: il capannone «in disuso da anni», i rumori «di una fattoria di polli chiusa» | +1 |
| 13/02 | Rallenta di 24–48 ore la richiesta dei registri del Kameoka-tei, «l'ufficio sbagliato» | — |
| 14/02 23:05 | La chiamata di Hayashi: Ōkubo vivo. Non dorme | — |
| 15/02 mattina | Il tic: «come sta Ōkubo?». Alle 10:00 al supermercato con Hayashi | — |
| 16/02, se i PG chiedono a Kameoka una pattuglia su Sogabe o parlano del Kameoka-tei | Lo riferisce a Saitō la sera stessa | — |
| Se i PG lo affrontano di persona senza gli Affari Interni | Nega, minaccia il sindacato, avvisa Saitō: il 22/02 viene annullato e partono gli «avvisi» | −2 |
| Se i PG lo segnalano **in silenzio** agli Affari Interni (Ogura Naomi, tramite Taniguchi), dal 17–18/02 | Tabulati con ordine del procuratore (48 ore), movimenti bancari, sorveglianza del supermercato: arresto il 21/02 mattina. **D-15** entro sera. Se lo stesso giorno fermano anche Yamaguchi, Saitō non lo sa: il 22/02 si gioca. Se Yamaguchi resta libero, avvisa Hayashi entro sera | — |
| Se è in custodia e Kuroda è ancora libero | Saitō valuta di farlo tacere: un «malore» in cella, un suicidio. Se succede, i PG sanno che il Nitōgun ha ancora braccia | — |
| 22/02 e oltre | Licenziato, condanna minore; la pensione la perde. Testimonia contro Saitō sui pagamenti — non sugli omicidi, che non conosce | — |

## Collegamenti
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]
- [[Luogo_Polizia_Prefetturale_Kyoto|Polizia Prefetturale di Kyoto]]

---

# Tachibana Eiji — Allibratore (Vittima 1)

> Allibratore, gestore di facciata. Ucciso 11/02/1998 ore 21:21 al bagno della Kyoto Station.

---

## Anagrafica

|Campo|Valore|
|---|---|
|Nome|Tachibana Eiji (橘 英司)|
|Età|47 anni|
|Nato|Maizuru (Kyoto-fu), 1950|
|Residenza|Fushimi-ku, Kyoto|
|Stato civile|Separato dal 1996, non divorziato|
|Moglie|Tachibana Setsuko, 44 anni|
|Figli|Nessuno|

## Aspetto

- 1,74 m, corporatura asciutta, postura eretta
- Capelli corti, brizzolati alle tempie, sempre in piega
- Mani curate, manicure recente
- Cicatrice sottile sopra il sopracciglio destro (incidente d'auto 1989)
- Sguardo freddo, sorriso di circostanza ben allenato
- Profumo: Eau Sauvage di Dior

## Vestiario al momento dell'omicidio

- Abito grigio antracite, sartoria di Osaka, gessato sottile
- Camicia bianca con doppio polso, gemelli in argento e onice
- Cravatta blu notte in seta
- Scarpe inglesi nere stringate, lucidate
- Cappotto di cammello piegato sul gancio del bagno
- Orologio Rolex Datejust acciaio/oro al polso sinistro
- Fede al dito anulare sinistro

## Effetti personali addosso

### In tasca giacca interna

- Portafoglio Bottega Veneta in pelle intrecciata
    - ¥180.000 in contanti (banconote da ¥10.000)
    - Patente di guida
    - Carta di credito JCB (conto Sanwa Bank)
    - Carta socio Club Aoyagi (n. 0087)
    - Biglietto da visita con foto di una hostess del Club Aoyagi, nome d'arte «Mari»
    - Polaroid piegata: donna giovane di spalle in kimono davanti a un torii
- Pacchetto **Mild Seven** semivuoto
- Accendino **S.T. Dupont** in argento, inciso "英" (Ei)

### In tasca giacca esterna

- Cellulare **NTT DoCoMo mova** (modello a stecca con antenna)
    - Nessuna rubrica
    - Registro 10 ultime chiamate (elenco completo in «Storia Completa», punto 22)
- Copia del **Kyoto Shimbun** del 9 febbraio 1998, piegata in quattro
    - Annuncio del _Ristorante Kameoka-tei_ con "promozione speciale del 22 febbraio"

### In tasca pantaloni

- Chiavi di casa (3 chiavi, portachiavi in cuoio)
- Chiavi auto Toyota Crown
- Taccuino Moleskine nero formato tascabile (contenuto e codice in «Storia Completa», punti 21 e 32)
- Penna stilografica **Pilot Custom 74**
- Fazzoletto di lino bianco con monogramma "T.E."
- Blister di **Lexotan** 1 mg, 8 compresse (ansiolitico)
- Conto del ristorante-bar dello **Shin-Miyako Hotel** (uscita Hachijō): 11/02/1998 ore 19:45, ¥3.150

### Tasca interna pantaloni (cuciti su misura)

- Due biglietti di sola andata **Kyoto Kōtsū** (¥900 l'uno): Kyoto Station (capolinea lato Shichijō) → Kameoka delle 14:30, e Kameoka → Kyoto delle 18:30 — entrambi dell'11/02/1998
- Ricevuta **Royal Hotel Karasuma**, camera matrimoniale, notti 7-8 febbraio

### Nascosti

- **Chiavetta piccola** con targhetta n. 0419, infilata sotto la soletta della scarpa destra (cassetta di sicurezza, banca da identificare — il numero non c'entra col codice 0418 della cassaforte: è il numero della cassetta)

### Non addosso ma collegati

- Cappotto al gancio:
    - Sciarpa di cashmere blu
    - Guanti in pelle nera
- Auto **Toyota Crown nera 1996** parcheggiata al multipiano della stazione (lato Hachijō)
    - Bagagliaio: gabbia da trasporto vuota con piume marroni e tracce di sangue secco di gallo

## Vita pubblica e copertura

- Gestore ufficiale del **bar-ristorante "Kōrin"** a Gion, Hanamikoji-dōri
- Iscritto alla Camera di Commercio di Kyoto come ristoratore
- Tasse pagate regolarmente, contabilità apparentemente in ordine
- Frequenta serate di beneficenza, conoscente di alcuni piccoli politici locali

## Vita privata reale

- Allibratore principale per il Nitōgun da circa 6 anni
- Gestisce circa ¥80–120 milioni l'anno di scommesse clandestine
- Amante fissa: **Aoyagi Mariko**, hostess Club Aoyagi, relazione da 18 mesi
- Frequenta il **Royal Hotel Karasuma** 2-3 volte al mese
- Soffre d'insonnia e attacchi d'ansia, in cura privata non dichiarata
- Beve poco, non gioca d'azzardo personalmente
- Diffidente per natura, ma a gennaio '98 si è sentito al sicuro dopo la truffa riuscita

## Carattere

- Calmo, parla a voce bassa
- Memoria eccezionale per cifre e volti
- Manipolatore freddo, sa creare dipendenza nei suoi clienti scommettitori
- Non è violento di persona — delega
- Ha un codice personale: non rovina chi non se l'è cercata
- Sottovaluta il Nitōgun. Pensa di avere protezione politica sufficiente

## Punto investigativo per i PG

La sua morte ha **due livelli di lettura**:

1. Esecuzione mirata e veloce (3 colpi, niente furto, nessuna perquisizione del corpo)
2. Il disegno col sangue è la sua **ultima dichiarazione**: sapeva chi e perché

I PG che leggono entrambi i livelli ottengono **una direzione**: i combattimenti di galli, qualcosa legato a Kameoka. Identificare il **Nitōgun come gruppo specifico** richiede comunque triangolazione del simbolo (gallo con due speroni) con almeno **due** elementi tra: testimonianze di clienti del giro, archivi storici della Polizia su gruppi locali di Kameoka, oggetti emersi durante perquisizioni successive (accendini commemorativi, monete interne), interrogatorio di un esperto di combattimenti clandestini. **Nessun indizio singolo identifica il Nitōgun.** Quelli che si fermano alla scena materiale senza interpretare il disegno possono perdere giorni sui clienti scommettitori.

## En — come lo vedevano (chi piange e chi no)

La vittima non ha alibi né deposizioni: ha le persone che restano. Ognuna lo descrive a modo suo — sono le frasi che i PG sentono.

| Chi | En verso Tachibana | Cosa dice di lui |
|---|---|---|
| Aoyagi Mariko (amante) | **+4** | «Rideva, negli ultimi mesi. Non l'avevo mai visto ridere così» |
| Nishimura Tatsuya (cameriere, prestanome) | +3 | «Mi ha insegnato tutto. Non sta a me parlare della sua vita» |
| Sasaki Hideo (amico di golf, prestanome) | +2 | «Nel '92 mi ha salvato senza chiedere niente. Gli dovevo un favore» |
| Inoue Takeshi (cliente, amico) | +2 | «Mi ha presentato mezza Gion. Trovate chi è stato» |
| Il personale del Kōrin (Kobayashi, lo chef, il barista) | +2 | «Un padrone giusto: pagava puntuale, non alzava mai la voce» |
| Tanaka Shōji (cliente) | +1 | «Raccoglieva le puntate con discrezione ed eleganza» |
| Il custode di Fushimi Yamamoto Kazuo | +1 | «Una mancia a Capodanno, ogni anno. Nessun ospite, o quasi» |
| La suocera Hosokawa Eiko | +1 | «Un bravo ragazzo, prima di Kameoka» |
| Tachibana Setsuko (moglie separata) | −2, con un +1 sepolto | «Erano gli amici che aveva scelto» — e conserva le sue lettere |
| Ōkubo Kenji (prestanome consapevole) | 0 | «Un bastardo bravo» |
| Yoshida, Fujiwara (clienti) | 0 | «Un nome sul giornale» |
| Hashimoto, Kimura (clienti rovinati) | −1 | «Mi dava i nomi e le quote. Il resto l'ho fatto io» |
| Dr. Murakami Saburō (veterinario complice) | −2 | «Rapporti professionali» — lo ha comprato con la sua disperazione |
| Kuroda Ryō (esecutore) | −1 | «Un lavoro» |
| Hayashi Tomoki (logistica) | −3 | «Ei-san» al telefono, e la trappola in faccia |
| Saitō Gorō (capo del Nitōgun) | **−5** | «Un uomo di gusto. Lo dico con dispiacere» |

## Come cambia l'immagine della vittima nei dodici giorni

| Quando | Cosa sanno i PG di lui | Da chi |
|---|---|---|
| 12/02 mattina | Gestore rispettabile di un locale a Gion, separato, incensurato. ¥180.000 in tasca, un accendino inciso, una fede e un biglietto da visita di una hostess | Briefing (H-01…H-04) |
| 12/02 | Un uomo che ha viaggiato in autobus fino a Kameoka e ha cenato da solo. Nel bagagliaio della Crown, piume e sangue di gallo | Reperti, Crown |
| 13/02 | «Scommesse private tra amici»: un allibratore. Un amante che ne era innamorata, una moglie che non lo era più | Mariko, Setsuko, Nishimura, Sasaki |
| 14/02 | L'uomo che ha truffato il giro: il veterinario morto lo dice al posto suo | Autopsia di Murakami (veterinario), estratti conto |
| 15–16/02 | Un calcolatore prudente: la cassaforte (0418), la lista dei clienti, il secondo registro nel controsoffitto del Kōrin, la chiavetta 0419 di una cassetta di sicurezza | Appartamento di Fushimi, Kōrin, Ōkubo |
| 18–19/02 | Un uomo che si credeva protetto: i tre rullini Super 8 sviluppati mostrano un politico locale al capannone | Laboratorio (3-4 giorni) |
| 22/02 | Il suo banco al capannone, il secondo da sinistra, con la lavagna delle quote ancora scritta a gesso | Il blitz |

---

## Collegamenti

- [[Luogo_Kyoto_Station_Scena_Crimine|Kyoto Station - Scena del crimine]]
- [[PNG_Murakami_Saburo_Veterinario|Murakami Saburō — Veterinario]]
- [[Storia Completa|Cellulare Tachibana — Registro chiamate]]
- [[Storia Completa|Taccuino Tachibana]]
- [[PNG_Nitogun_Banda|Nitōgun — Banda]]

---

# Tachibana Setsuko — Moglie separata della vittima

> Sposata dal 1985, separata di fatto dal 1996, mai divorziata. Vive a Maizuru.

## Anagrafica
- **Nome**: Tachibana Setsuko (橘 節子, nome da nubile **Hosokawa**)
- **Età**: 44 anni
- **Residenza**: Maizuru (Kyoto-fu), nella casa dei suoi genitori (madre vedova, padre defunto)
- **Lavoro**: insegnante di calligrafia in un piccolo studio privato
- **Stato civile**: separata da Tachibana Eiji (vittima) dal 1996, non divorziata

## Aspetto e personalità
1,60 m, sobria, capelli corvini sempre raccolti. Veste kimono in occasioni formali, abiti occidentali sobri nel quotidiano. Educata e riservata. Ha un dolore antico ma composto. Non ha mai cercato il divorzio per **rispetto della famiglia** e per non perdere alcuni diritti patrimoniali.

## Ruolo nella vicenda
- **Non è coinvolta** nella truffa né negli omicidi
- Avvisata della morte del marito dalla polizia il 12/02 mattina
- Eredita ufficialmente l'appartamento di Fushimi e i beni dichiarati di Tachibana (vittima)
- Non sapeva del lavoro di allibratore del marito
- Sapeva genericamente di "amici discutibili", motivo della separazione

## Alibi

| Data | Cosa dice | Verità | Come si verifica |
|---|---|---|---|
| 11/02 sera | A Maizuru: lezione di calligrafia 18:30–20:00, poi cena con la madre | Vera | La studentessa del mercoledì (moglie di un impiegato comunale di Maizuru) e la madre Hosokawa Eiko; l'ultimo treno utile da Maizuru per essere a Kyoto alle 21:21 parte alle 18:40 — non l'ha preso |
| 12/02 | A casa fino alla telefonata di Yamada (08:30), poi in treno per Kyoto (arriva alle 14:00) | Vera | Yamada stesso; biglietto JR |
| 13–16/02 | A Kyoto (albergo vicino alla stazione, Kōrin, notaio, veglia e cremazione) | Vera | Nishimura e il personale del Kōrin, il notaio, la sala funebre di Fushimi |
| 17/02 | Rientra a Maizuru | Vera | La madre |

## Come si comporta
- **Primo contatto**: ferma, dignitosa, controllata. Risponde con precisione, **non piange in pubblico**, chiede subito cosa deve firmare
- **Sotto pressione**: non alza mai la voce; se una domanda la offende (l'amante, i soldi) risponde con una frase sola e cambia argomento. Non ostacola: protegge la propria privacy
- **Si apre se**: le si promette discrezione sul nome del marito e la si tratta da vedova, non da parte lesa. Allora consegna le lettere, la chiave del vecchio armadio, e ammette i ¥300.000 al mese
- **Si chiude se**: le si parla dell'amante davanti alla madre, o se un giornale scrive «l'allibratore di Gion»
- Non parla volentieri della separazione: «erano gli amici che aveva scelto»

## Cosa sa
- Conosce alcuni "amici" del marito (genericamente)
- Conosce vagamente l'esistenza di un'amante (sospettava da tempo)
- **Non sa** del Nitōgun, dei combattimenti, della truffa
- Ricorda alcuni nomi che il marito faceva in casa, tra cui un "Saitō" (in modo neutro, come "un cliente del locale")

## Cosa nasconde
- Una **vecchia foto di matrimonio** strappata (rabbia repressa per il tradimento)
- Riceveva da Tachibana (vittima) ¥300.000 al mese di mantenimento informale (consegnati in contanti, nessun vincolo legale): ora si interrompono e lei è preoccupata economicamente

## Punto debole
**La dignità**. Non vuole scandali pubblici. Se i PG le promettono discrezione sulla figura del marito, collabora di più.

## Valore investigativo
**Basso operativamente, alto contestualmente**. Setsuko aiuta i PG a:
- Capire il **carattere** di Tachibana (vittima)
- Ricostruire il **passato** del marito (chi frequentava prima del 1996)
- Localizzare **vecchie lettere** o documenti che potrebbero contenere qualcosa di utile (alcune buste con timbri di Kameoka)

## Note operative GM
- Avvicinarla con rispetto è essenziale
- Colloquio meglio se condotto da PG donna o da PG di età matura
- Può fornire una **chiave del vecchio appartamento** dei suoceri se il GM vuole creare una sotto-scena (vecchi oggetti di Tachibana (vittima) mai recuperati)

## Deposizione — D-02 (Centrale di Kawaramachi, 12/02 ore 16:00, dopo il riconoscimento della salma; verbalizza Yamada)
> «Sono Tachibana Setsuko, nata Hosokawa. Mio marito e io siamo sposati dal 1985 e viviamo separati dal 1996; non abbiamo divorziato. Abito a Maizuru con mia madre e insegno calligrafia. Ieri sera ero a casa: ho tenuto lezione fino alle otto e poi ho cenato con mia madre. L'ho saputo stamattina dalla telefonata del vostro agente. L'ultima volta che ho visto Eiji è stato a Capodanno, per un'ora; ci sentivamo per telefono una volta al mese, per questioni pratiche. Non conosco la sua vita di adesso. So che gestiva il Kōrin, so che aveva amici che non mi piacevano: uomini di Kameoka, che venivano a casa nostra negli anni in cui vivevamo insieme e di cui lui non parlava. Ricordo un nome, Saitō — lo nominava come un cliente del locale. Non mi ha mai detto di avere nemici e non mi ha mai detto di avere paura. Se aveva un'altra donna non lo so e non lo chiedo. Vorrei che il suo nome fosse trattato con rispetto, qualunque cosa abbiate trovato. Mi occuperò io del funerale.»

Omette: i ¥300.000 al mese in contanti (dignità, e non vuole domande fiscali); che dell'amante sospettava da anni; la foto di matrimonio strappata. Non mente.

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | +1 | Rispetta il grado e l'età; lo tratta come l'unico interlocutore |
| Honda | −1 | Troppo diretto: la domanda sull'amante arriva sempre nel momento sbagliato |
| Nakamura | +1 | Formale e paziente: il tono che lei si aspetta dalla polizia |
| Sato | 0 | Cortese con lui come con un impiegato: è troppo giovane perché lei si confidi |
| Fujita | +1 | Una donna discreta: con lei parla della separazione, con nessun altro |

Con gli altri: Tachibana (vittima) **−2** per il tradimento — ma conserva le sue lettere: un +1 sepolto che riemerge alla veglia · Aoyagi Mariko (amante) **−3** dal momento in cui la vede (prima è un sospetto senza volto) · la madre Hosokawa Eiko +3 · Nishimura Tatsuya (prestanome, cameriere del Kōrin) +1: «lui era fedele a Eiji, lo terrò» · Saitō Gorō: un nome neutro, 0.

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 12/02 | Arriva alle 14:00, riconosce la salma all'Istituto di Medicina Legale alle 15:00, D-02 alle 16:00. Dorme in un albergo vicino alla stazione | — |
| 13/02 | Al Kōrin con Nishimura e il personale: tiene il locale chiuso una settimana. Dal notaio: il testamento del 1995 la fa erede universale | — |
| Se i PG le chiedono con rispetto le lettere e le foto | Consegna la scatola di Maizuru (la lettera del 1992: «a Kameoka ho conosciuto persone che mi possono aiutare») e il duplicato della chiave del vecchio armadio di Fushimi | +1 |
| Se i PG le chiedono dei soldi | Ammette i ¥300.000 mensili. Chiede, senza girarci intorno, se la cassaforte e la busta trovate a Fushimi «sono mie o vostre» | 0 |
| 14/02, se il Kyoto Shimbun scrive «l'allibratore di Gion» | Vergogna: dopo la cremazione torna a Maizuru e risponde solo per iscritto | −1 con tutti, −2 con chi ha parlato coi giornali |
| **15/02 sera — veglia (tsuya) nella sala funebre di Fushimi** | Se Mariko si presenta (lo farà, in nero, in fondo alla sala, se nessuno la ferma): Setsuko non dice una parola, si inchina, e da quel momento è −3 con Mariko e −1 con i PG che l'hanno lasciata entrare. Se un PG (Fujita) tiene Mariko fuori con discrezione: +1 con quel PG | ±1 |
| 16/02 | Cremazione. Chiede ai PG: «lo avete capito, chi è stato?» — è l'unica volta che la voce le trema | — |
| 17/02 e oltre | A Maizuru. Raggiungibile per telefono; testimonia sul passato del marito (gli «uomini di Kameoka», il nome Saitō) se il suo nome resta fuori dai giornali | — |

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Aoyagi_Mariko_Amante|Aoyagi Mariko — Amante]]
- [[Luogo_Appartamento_Vittima_Fushimi|Appartamento di Tachibana Eiji — Fushimi]]

---

# Watanabe Toshio — Testimone oculare/auricolare

> Impiegato Mitsubishi nel cubicolo accanto a quello dell'omicidio. Ha sentito tutto ma non ha visto nulla. Paralizzato dalla paura per 40 minuti.

## Anagrafica
- **Nome**: Watanabe Toshio (渡辺 利夫)
- **Età**: 31 anni
- **Residenza**: appartamento a Yamashina-ku, Kyoto
- **Lavoro**: impiegato amministrativo, **Mitsubishi Heavy Industries**, sede di Kobe (pendolare giornaliero)
- **Stato civile**: sposato da 2 anni con Akemi (28), insegnante elementare. Una bambina di 6 mesi.

## Aspetto e personalità
1,68 m, magro, occhiali. Veste salaryman classico (abito grigio, cravatta blu). Timido, ansioso, soggetto ad attacchi di panico. Buon impiegato, nessun precedente. Profondamente scosso dall'evento.

## Ruolo nella vicenda
- L'11/02 era a Kobe per una riunione, prende lo Shinkansen di rientro arrivando a Kyoto Station alle 21:08
- Va al bagno del 3° piano per "esigenza" prima di prendere la metropolitana
- Entra alle 21:14 nel cubicolo sinistro (uno dei tre cubicoli)
- Tachibana (vittima) entra alle 21:18 nel cubicolo centrale
- Kuroda spara alle 21:21
- Watanabe rimane **paralizzato** per la paura, non emette suono, non si muove
- Esce dal cubicolo solo alle 22:01, quando si convince che l'assassino è andato via
- Trova il sangue che cola sotto la porta del cubicolo centrale
- Vomita, poi scappa di corsa al Kōban (police box) della stazione

## Cosa ha sentito
- **21:18**: passi e porta del cubicolo centrale che si chiude (Tachibana (vittima))
- **21:20**: porta del bagno principale che si apre, **passi pesanti, scarpe da ginnastica che cigolano sul pavimento bagnato**
- I passi si fermano davanti al cubicolo centrale (qualche secondo)
- **21:21**: tre colpi rapidi (*pap-pap-pap*), nessuna parola scambiata
- Suono metallico (i bossoli che vengono raccolti)
- Passi che si allontanano **senza fretta, ma a passo deciso**
- Porta del bagno che si chiude
- Gocciolio dal cubicolo centrale

## Cosa NON ha sentito
- Nessuna voce
- Nessun grido della vittima (i 3 colpi sono stati simultanei al torace, morte rapida)
- Nessun rumore di lotta

## Alibi
**N/A**: è il testimone, non sospettato. Treno Shinkansen documentato (biglietto delle 20:32 da Shin-Kobe), telefonata alla moglie alle 20:55, riunione lavoro a Kobe confermata.

## Come si comporta
- **Primo contatto**: cooperativo e **traumatizzato** — voce tremante, pause, si scusa di continuo («mi dispiace, non riesco»). Si sente in colpa per non aver chiamato aiuto subito
- **Sotto pressione**: si blocca. Domande a raffica, due poliziotti che parlano insieme, una voce alta → monosillabi e «ho già detto tutto»
- **Si apre se**: uno solo gli parla, piano, gli chiede prima come sta e gli garantisce che il suo nome non uscirà. Allora è **preciso al secondo** su orari, suoni e sequenza (D-01)
- **Si chiude se**: gli si fa capire che è sospettato («perché è rimasto 40 minuti lì dentro?»), o se vede giornalisti
- Ha bisogno di un supporto psicologico: attacchi di panico dal 12/02

## Valore investigativo
- **Sequenza temporale**: la sua testimonianza fissa la dinamica al secondo
- **Profilo del killer**: passi pesanti, scarpe da ginnastica → suggerisce un giovane atletico, conferma poi l'impronta Asics
- **Modus operandi**: nessuna parola, raccolta bossoli → assassino esperto o ben istruito
- **Conferma**: niente rapina, omicidio mirato

## Cosa nasconde
Niente. Watanabe è un testimone integro. **Vuole solo dimenticare**.

## Punto debole
- Trauma psicologico
- Paura per la propria famiglia (è terrorizzato che l'assassino possa cercarlo)
- Possibile **ritrattazione/sparizione** se i media diffondono il suo nome — i PG dovrebbero garantire l'anonimato

## Note operative GM
- I PG lo incontrano quasi subito (è già al Kōban quando arrivano)
- **Trattarlo male = ritirata totale**, perdita di una fonte chiave
- **Trattarlo bene = collaborazione completa** e possibile testimonianza in tribunale
- Se l'avventura include il giorno 22/02 come climax, Watanabe può essere convocato come testimone formale e raccontare la sua versione in scena pubblica

## Deposizioni

### H-03 — Prima testimonianza (Kōban della Kyoto Station, 11/02 ore 22:30, verbalizza l'agente di turno del Kōban)
> «Mi chiamo Watanabe Toshio, lavoro alla Mitsubishi Heavy Industries, a Kobe. Ero sul treno di ritorno, sono sceso alle nove e otto. Sono andato al bagno del terzo piano, quello dopo gli uffici. Ero nel cubicolo… quello a sinistra. Poco dopo è entrato qualcuno in quello accanto, ho sentito la porta. Poi è entrato un altro — passi pesanti, scarpe che facevano quel rumore, come di gomma sul bagnato. Si è fermato. E poi tre colpi, uno dietro l'altro, fortissimi. Non ho capito subito, pensavo… non lo so cosa pensavo. Poi un rumore di metallo per terra, piccolo, e i passi che se ne andavano, non di corsa. La porta. Io non mi sono mosso. Non riuscivo. Ho sentito qualcosa gocciolare. Sono rimasto lì non so quanto — tanto. Quando sono uscito c'era sangue sotto la porta di mezzo. Ho vomitato, mi dispiace. Poi sono corso qui. Non ho visto nessuno. Non ho visto la faccia di nessuno. Non ho sentito parlare nessuno. Mia moglie… posso chiamare mia moglie?»

Omette: niente — ma è confuso sugli orari (dice «poco dopo», «tanto») e non ha ancora messo a fuoco i dettagli dei suoni.

### D-01 — Seconda audizione (a casa sua o in Centrale, dal 12/02, solo se sentito con tatto)
> «Sono entrato alle nove e quattordici — ho guardato l'orologio perché volevo la metropolitana delle nove e trentacinque. La porta accanto si è chiusa quattro minuti dopo, più o meno; nessuno sciacquone, nessuna acqua, quello lì stava solo fermo. Ho sentito un profumo, dolce, da uomo. Alle nove e venti la porta grande: una persona sola, passi pesanti ma non lenti, uno che sapeva dove andava. Scarpe da ginnastica, di quelle che cigolano — mio cognato ha le stesse. Si è fermato davanti al cubicolo di mezzo, due o tre secondi. Poi tre colpi, veloci, con lo stesso ritmo, e nessuna parola prima, neanche un respiro forte. Dopo, un rumore piccolo di metallo raccolto da terra, come monete, due o tre volte. I passi verso l'uscita, decisi, e la porta che si richiude da sola. Da quel momento solo il gocciolio. Ho contato i minuti sull'orologio per non impazzire: sono uscito alle dieci e uno. Il sangue veniva da sotto la porta di mezzo. Non ho toccato niente, lo giuro.»

Omette: niente. Il «profumo dolce da uomo» è l'Eau Sauvage della vittima; il «metallo raccolto da terra» sono i bossoli (e ne manca uno sotto l'orinatoio).

## En

| PG | En | Perché |
|---|---|---|
| Yamamoto | 0 | Il grado lo intimidisce: risponde, ma sta sull'attenti. +1 se è Yamamoto a promettergli l'anonimato |
| Honda | −1 | Il tono diretto lo fa balbettare: davanti a Honda dice meno di quello che sa |
| Nakamura | +1 | La pazienza lo tiene sul filo: con lui arriva ai dettagli di D-01 |
| Sato | +1 | Un poliziotto giovane lo mette meno in soggezione |
| Fujita | +2 | L'unica che gli chiede come sta prima di chiedere cosa ha sentito. Con lei parla |

Con gli altri: la moglie **Akemi** +4 (è per lei e per la bambina che ha paura) · Tachibana (vittima): non lo conosceva · «l'uomo dei passi»: terrore puro, non un En.

## Come cambia nel tempo

| Quando / se… | Cosa fa | En con i PG |
|---|---|---|
| 11/02 notte | Al Kōban, H-03. Yamada lo riaccompagna a casa a Yamashina alle 00:30 | — |
| 12/02 | In malattia, non va a Kobe. Primo attacco di panico. Sentito con tatto → D-01; sentito di fretta o in tre → «ho già detto tutto» | come sopra |
| 13/02 | Legge sul Kyoto Shimbun «un testimone nel cubicolo accanto»: finché il nome non esce, regge | — |
| Se il suo nome esce sui giornali (un tabloid, o l'Enja di Yamamoto Tanaka Shuichi lasciato libero) | Il giorno dopo porta moglie e figlia dai suoceri a Ōtsu e non risponde più al telefono: fonte persa fino al processo | −2 con chi ha parlato coi giornali |
| 15/02 (la notizia di Ōkubo Kenji ferito: «hanno colpito ancora») | Chiama la Centrale: «può cercare me?». Se i PG gli danno un numero diretto e fanno passare una pattuglia sotto casa, resta | +1 |
| Dal 18/02, se protetto e ascoltato | Accetta di rivedere il nastro della CAM-12 con Ito: «la faccia no — ma quel passo, corto e veloce, è così che camminava». Non è una prova: è una conferma per i PG | +1 |
| 22/02 e oltre | Testimone formale al processo, se trattato bene fino in fondo. Trattato male anche una sola volta: ritratta «per la famiglia» | — |

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Kuroda_Ryo_Esecutore|Kuroda Ryō — Esecutore]]
- [[Luogo_Kyoto_Station_Scena_Crimine|Kyoto Station 1998 — Scena del crimine]]


====================================================================================================

# PARTE 4 — SCHEDE DEI LUOGHI (17 file)

# Appartamento Ōkubo — Kamigyō

> Residenza di Ōkubo Kenji (prestanome consapevole). Modesto appartamento al 4° piano. Punto del tentato omicidio del 14/02 (parcheggio sotterraneo).

## Dati
| Campo | Valore |
|---|---|
| Indirizzo | Imadegawa-dōri, Kamigyō-ku, Kyoto |
| Tipologia | Apartment building anni '70, 8 piani, 32 unità |
| Piano | 4° |
| Interno | 405 |
| Superficie | 45 m² (1LDK) |
| Regime | Affitto |

## Descrizione
Edificio invecchiato, ascensore lento, corridoi grigi. Appartamento piccolo con ingresso, soggiorno-cucina, una camera, bagno. Arredamento spartano: divano consumato, TV grande, frigorifero pieno, scrivania ingombra di carte. Niente decorazioni. Si vede che Ōkubo non investe nella casa.

## Indizi rilevanti
- **Kyoto Shimbun di gennaio 1998** con annuncio cerchiato a matita — prova della consapevolezza della truffa
- **Cassetta audio** nascosta sotto la tavola del parquet (in soggiorno, terza tavola dalla porta): registrazione di una telefonata con Tachibana (vittima) del 12 gennaio 1998, in cui Tachibana accenna alla truffa parlando in codice. Decifrabile incrociando con il taccuino.
- **Quaderno** in chiaro nel cassetto della scrivania: annotazioni delle proprie scommesse personali, cifre, vincite. Conferma i ¥3 mln scommessi di tasca propria.
- **Pistola Tokarev TT-33** illegale nel cassetto del comodino (presa per autodifesa dopo l'omicidio Tachibana)
- Cassaforte da albergo non presente
- Banconote da ¥10.000 sparse, totale ¥600.000 (denaro cash di emergenza)

## Parcheggio sotterraneo
- 32 posti auto, illuminazione fluorescente, telecamere agli angoli (qualità mediocre)
- Auto di Ōkubo: **Nissan Skyline R32**, posto B-04
- **14/02 ore 22:30**: Ōkubo rientra al condominio per **un rapido prelievo** (Tokarev nel comodino + contante d'emergenza ¥600.000): vuole partire per Nagoya il mattino seguente e ritiene 5 minuti a casa un rischio gestibile. Kuroda lo aspetta dietro un pilastro vicino al posto B-04. Spara 2 colpi appena Ōkubo scende dall'auto: il primo manca, il secondo lo colpisce alla spalla destra; i due bossoli espulsi restano a terra e vengono repertati (stessa arma della Kyoto Station: collegamento balistico tra i due attacchi). Ōkubo si accuccia dietro l'auto e grida. Un vicino di casa rientra in auto in quel momento dalla rampa: i fari illuminano la scena, Kuroda fugge per la stessa rampa di uscita a piedi.
- Telecamera del parcheggio: registra **Kuroda** parzialmente, vista parziale del giubbotto bomber e delle scarpe Asics
- Ambulanza chiamata dal Sig. Hayama (vicino di Ōkubo, rientra in auto) alle 22:33, arrivo alle 22:42, ricovero al Kyoto University Hospital alle 23:15

## Persone presenti
- Ōkubo Kenji fino al 14/02 (poi in ospedale)
- Vicini: la **Sig.ra Ueda** (62 anni, vedova, interno 404) sente i due colpi salire dalla **tromba dell'ascensore** (porte aperte al 4° piano in quel momento, eco architettonica del parcheggio sotterraneo). Chiama il 119 alle 22:31. Testimone secondaria.
- Vicino in auto: residente del condominio (54 anni, dirigente in pensione) — testimone diretto, vede di sfuggita la fuga di Kuroda. **Descrizione fornita** alla polizia: giubbotto scuro imbottito, sneaker scure, corporatura atletica, ~1,80 m. **Non ricorda il volto** (era buio, fari abbaglianti). Identità per verbale ma non centrale per l'indagine

## Indagine
- Accesso libero ai PG dopo il 14/02 (Ōkubo in ospedale, l'appartamento può essere ispezionato con consenso)
- Se i PG visitano l'appartamento prima del 14/02 (e Ōkubo è ancora a casa nascosto): possibile colloquio difficile, lui non apre la porta a meno che non si presentino in modo affidabile
- La cassetta audio è la **prova decisiva** che Ōkubo aveva intuito la truffa

## Note operative GM
- L'appartamento può essere visitato prima e dopo il tentato omicidio
- La cassetta audio non è in vista: la trova chi dichiara una perquisizione metodica (sotto la terza tavola del parquet dalla porta) — niente tiro, gli indizi si danno sempre
- Il fatto che Ōkubo sia armato è un dettaglio narrativo: quando il secondo attentato avviene in ospedale, lui è disarmato e dipende interamente dalla protezione esterna

## Al tavolo — i due vicini (le testimonianze di H-15)

**Sig.ra Ueda** (62, vedova, interno 404): robusta, curiosa, la TV sempre accesa, la catenella alla porta. Parla molto e mette tutto sullo stesso piano — il dettaglio utile e quello inutile. En: +1 con chi la ascolta fino in fondo, −1 con Honda (la interrompe).
> «Alle dieci e mezza, dieci e trentuno — guardavo il telegiornale — due botte, forti, che venivano su dalla tromba dell'ascensore, la porta era aperta al piano. Poi un uomo che gridava, giù nel garage. Ho chiamato il 119 subito, poi ho chiuso la porta a chiave. Il signor Ōkubo? Uno tranquillo, saluta, rientra tardi; questa settimana non l'avevo visto. Gente strana nel palazzo? Un ragazzo con un giubbotto scuro e un berretto, sabato pomeriggio, nell'androne: ho pensato a un fattorino. Non sono sicura dell'ora. Ci pensate voi, adesso, alle porte del garage?»

Il «fattorino» del pomeriggio è Kuroda che studia il palazzo: la Sig.ra Ueda è l'unica che lo ha visto in faccia, e non lo sa. Un confronto di fotografie (se Kuroda è in custodia) lo conferma «forse».

**Sig. Hayama** (54, dirigente in pensione, interno 702; non è la cameriera Hayama del Kameoka-tei): preciso, indignato, prende appunti lui stesso. En: +1 con Yamamoto (il grado), +1 con chi lo tratta da testimone serio.
> «Sono rientrato alle dieci e trentadue, l'orologio della macchina. Scendendo la rampa i fari hanno preso un uomo in piedi vicino al posto B-04, e uno a terra dietro una Skyline. Quello in piedi si è girato ed è corso su per la rampa, mi è passato accanto: alto, sull'uno e ottanta, atletico, giubbotto scuro imbottito, scarpe da ginnastica scure, un cappello di lana. La faccia no: i fari erano miei e lui era controluce, ed è durato due secondi. Non ho visto la pistola. Ho chiamato l'ambulanza dal telefono del garage e ho tenuto premuta la spalla del signor Ōkubo con la mia sciarpa finché non sono arrivati. Lui diceva "non chiamate nessuno", poi ha smesso di dire cose. Sono a disposizione per un riconoscimento, ma vi dico subito: riconoscerei il modo di correre, non il viso.»

Tutti e due dicono la verità. Nessuno dei due può identificare Kuroda in aula.

## Collegamenti
- [[PNG_Okubo_Kenji_Prestanome_Consapevole|Ōkubo Kenji — Prestanome consapevole]]
- [[PNG_Kuroda_Ryo_Esecutore|Kuroda Ryō — Esecutore]]
- [[Luogo_Kyoto_University_Hospital|Kyoto University Hospital]]

---

# Appartamento di Tachibana Eiji — quartiere di Fushimi (Kyoto)

> Residenza privata della vittima. Si trova nel quartiere di Fushimi-ku, distretto residenziale a sud di Kyoto, lontano dal centro storico e dal locale di Gion dove la vittima lavorava. Perquisito dalla Polizia Prefetturale di Kyoto il 12 febbraio 1998.

---

## Dati immobile

| Campo | Valore |
|---|---|
| Indirizzo | Fukakusa Sujikaibashi-chō 3-12, Fushimi-ku, Kyoto |
| Tipologia | Mansion (condominio residenziale di pregio) |
| Edificio | "Fushimi Garden Heights" |
| Piano | 6° (su 8) |
| Interno | 602 |
| Superficie | 78 m² (3LDK) |
| Anno costruzione | 1992 |
| Regime | Proprietà |
| Acquisto | 1994, ¥58 milioni, mutuo estinto nel '96 |

**Contesto**: Fushimi-ku è zona residenziale tranquilla a sud di Kyoto, lontana da Gion e dal locale di Tachibana (vittima). Scelta deliberata per separare vita pubblica e privata. Il complesso ha portineria (**Yamamoto Kazuo (custode; non è parente del capo squadra Yamamoto Kenji)**, 58 anni, presente 7:00–19:00), posto auto assegnato nel garage sotterraneo — vuoto: la Toyota Crown nera è al multipiano della stazione dall'11/02, poi sotto sequestro — nessuna telecamera nei corridoi interni.

## Ingresso e disposizione

- **Genkan** (anticamera) ordinato: 3 paia di scarpe inglesi maschili, 1 paio di mocassini, 1 paio di pantofole da casa
- Niente scarpe femminili, niente tracce stabili dell'amante
- **Soggiorno-cucina (LDK)** 28 m²: stile occidentale, divano in pelle nera, tavolino in vetro, TV Sony 29", impianto stereo Marantz, libreria con romanzi di Matsumoto Seichō e manuali di economia
- **Camera da letto principale** 14 m²: futon sostituito da letto matrimoniale occidentale, comodini, armadio a muro
- **Seconda camera** 8 m²: usata come studio
- **Terza camera** 7 m²: vuota, solo scatoloni mai aperti dal trasloco
- **Bagno occidentale** con vasca
- **Balcone** sud, vista parziale su Mt. Inari

## Indizi rilevanti

### Studio (seconda camera)

- Scrivania in legno scuro, ordinata
- **Schedario in metallo a 4 cassetti** chiuso a chiave (chiave nascosta sotto il tappetino della scrivania):
  - Cassetto 1: contabilità ufficiale del locale Kōrin (in regola)
  - Cassetto 2: estratti conto bancari Sanwa Bank, movimenti regolari
  - Cassetto 3: **archivio Kyoto Shimbun**, 4 copie piegate con cura, etichetta data scritta a mano:
    - Ottobre 1997
    - Novembre 1997
    - Dicembre 1997
    - Gennaio 1998 (questa con annuncio cerchiato a matita leggera)
  - Cassetto 4: documentazione personale (passaporto, certificati, atto di proprietà) e — in una scatolina di lacca — **l'*inkan*, il sigillo personale registrato** di Tachibana. Sembra un oggetto qualunque: è invece **la seconda chiave della cassetta di sicurezza** alla Sanwa Bank di Gion (senza di quello la banca non apre, nemmeno col mandato in mano). Vedi «La cassetta di sicurezza» in `Storia Completa.md`

> Tutte e 4 le copie del Kyoto Shimbun riportano l'annuncio del **Ristorante Kameoka-tei** con "promozione speciale" in date diverse (ogni mese, una data). Nessuna copia precedente all'ottobre '97 — Tachibana (vittima) ha iniziato a conservarle solo da quando ha cominciato a pianificare la truffa con Murakami (veterinario).

- **Cassaforte a muro** dietro un quadro paesaggistico (calligrafia di Mt. Fuji), modello **Sentry** elettronica con codice numerico:
  - ¥4.200.000 in contanti (banconote da ¥10.000)
  - 3 lingotti d'oro da 100 g ciascuno
  - Polaroid intima di Aoyagi Mariko
  - Documento manoscritto di 2 pagine in giapponese: lista dei clienti scommettitori principali con cifre e codici (decifrabile incrociando col taccuino)
  - **NON ci sono** documenti che incriminano direttamente il Nitōgun (Tachibana (vittima) era prudente)

- Computer non presente. Tachibana (vittima) lavorava solo a mano sul taccuino e a memoria.

### Camera da letto

- Comodino sinistro: blister di **Lexotan** (lo stesso ansiolitico che aveva in tasca), libro *Norwegian Wood* di Murakami Haruki, occhiali da lettura
- Comodino destro: vuoto, ma il cassetto presenta **tracce di profumo femminile** (Aoyagi Mariko ha dormito qui occasionalmente)
- Armadio: 14 abiti sartoriali, 22 camicie bianche e azzurre, 30 cravatte
- Cassetto biancheria: **busta sigillata** con ¥800.000 nascosta sotto i calzini (riserva per emergenze)

### Soggiorno

- Segreteria telefonica: 2 messaggi non ascoltati
  - Messaggio 1 (10/02 ore 18:42): voce maschile, breve, "*Ei-san, sono io. Domani come d'accordo*". Voce non identificata immediatamente — è Hayashi Tomoki che conferma l'incontro pomeridiano dell'11/02 a Kameoka (durante quell'incontro Hayashi gli darà di persona l'appuntamento serale alla stazione, ultimo anello della trappola)
  - Messaggio 2 (11/02 ore 22:14, post mortem): voce femminile preoccupata, "*Ei-chan, sono Mariko, dove sei?*"
- Rubrica cartacea accanto al telefono: solo numeri innocui (locale, dentista, sartoria, lavanderia)
- Cestino della carta: vuoto (svuotato il 10/02 dalle pulizie)

### Cucina

- Frigorifero quasi vuoto (Tachibana (vittima) mangia fuori)
- Bottiglia **Yamazaki 18 anni** già aperta, 2 bicchieri da whisky lavati
- Sake premium nella credenza, regali di clienti

### Bagno

- Cosmetica maschile costosa (Clinique for Men, Kiehl's)
- 1 spazzolino azzurro, 1 spazzolino rosa (Mariko)
- 1 ciabattina femminile beige nascosta in fondo all'armadietto

### Altri oggetti

- **Cinepresa Super 8** in una scatola dell'armadio, con 3 bobine non sviluppate. Sviluppo in laboratorio (richiede 3-4 giorni): riprese sgranate, girate di nascosto a una serata di combattimenti al capannone — tra gli spettatori è **riconoscibile un politico locale**, cliente del giro. Era l'assicurazione privata di Tachibana (vittima): il motivo per cui si credeva protetto. **Non toccano i tre omicidi** — aprono il filone politico (subtrama o seguito di campagna)
- Album fotografico in salotto: foto di matrimonio del 1985, viaggi con la moglie fino al 1995, poi nessuna foto recente
- **Sotto il letto**, in una scatola di scarpe: pacchetto di vecchie lettere d'amore della moglie Setsuko, conservate
- Niente armi, niente droga, niente materiale incriminante diretto sul Nitōgun

## Il custode — Yamamoto Kazuo (58; non è parente del capo squadra Yamamoto Kenji)

Tarchiato, divisa grigia della portineria, un piccolo televisore in guardiola; presente 7:00–19:00, orgoglioso di sapere tutto del palazzo. Collaborativo, un po' pettegolo. En: +1 con chi lo tratta da collega («anche lei fa turni»), −1 con chi entra senza salutare. Dice:
> «Il signor Tachibana rientrava tardi, salutava sempre, una mancia a Capodanno. Ospiti? Una signora giovane, elegante, la sera, ogni tanto, da un anno circa: entrava con la sua chiave. Uomini, mai. Martedì dieci sera non ho visto nessuno: io stacco alle sette. Le pulizie passano il martedì mattina.»

Vero. La «signora giovane» è Aoyagi Mariko; il martedì mattina spiega il cestino vuoto.

## Analisi finanziaria (ricostruita dalla Polizia)

Disparità evidente tra:
- **Reddito dichiarato locale Kōrin**: ¥9 mln/anno
- **Tenore di vita**: stimato ¥25–30 mln/anno

Il **fascicolo della Polizia Tributaria di Kyoto (Kokuzei)** verrà aperto come conseguenza dell'indagine. Sarà uno degli effetti collaterali dell'inchiesta dei PG.

## Note investigative per i PG

- L'archivio dei 4 giornali è la **prima vera prova** che Tachibana (vittima) operava nel circuito clandestino con metodo. La cerchiatura sul giornale di gennaio è il punto in cui si è svolta la truffa.
- La cassaforte richiede una scelta investigativa: chiamare lo scassinatore della Polizia (richiede 24h di attesa), oppure lavorare sull'amante che potrebbe conoscere il codice (dato che ha dormito lì).
- **Mariko conosce il codice**: 0418 (compleanno di lei). Se i PG la pressano correttamente, lo dà.
- I 2 messaggi in segreteria sono **fondamentali**: il primo è una chiamata che attira la vittima alla stazione. La traccia audio è ascoltabile e può essere fatta riconoscere a un altro PNG (testimone vocale futuro).
- I 3 rullini Super 8 sono un gancio a scoppio ritardato: lo sviluppo richiede 3-4 giorni, quindi il contenuto arriva a indagine avanzata. Il politico ripreso non c'entra con i tre omicidi: il filone si delega o diventa seguito di campagna.

---

## Collegamenti

- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Aoyagi_Mariko_Amante|Aoyagi Mariko — Amante]]
- [[PNG_Tachibana_Setsuko_Moglie|Tachibana Setsuko — Moglie separata]]
- [[Storia Completa|Cellulare Tachibana — Registro chiamate]]
- [[Storia Completa|Taccuino Tachibana]]
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]

---

# Capannone di Kameoka — Sede dei combattimenti clandestini

> Sede operativa del Nitōgun. Vecchio capannone agricolo riconvertito in arena per combattimenti illegali. Mensile, sempre il giorno indicato dall'annuncio sul Kyoto Shimbun.

## Dati
| Campo | Valore |
|---|---|
| Indirizzo non ufficiale | Zona rurale a ovest di Kameoka, frazione Sogabe-chō, Kameoka-shi, Kyoto-fu |
| Riferimento visivo | Insegna scolorita di un vecchio rivenditore agricolo "Tanaka Nōki" (chiuso nel 1991) |
| Distanza da Kyoto Station | ~28 km, ~50 minuti d'auto, ~70 minuti in autobus |
| Distanza da Kameoka centro | ~6 km |
| Tipologia | Capannone agricolo dismesso, riconvertito |
| Proprietà ufficiale | Società di comodo "Kameoka Nōji Kabushiki Kaisha", riconducibile a Saitō tramite due passaggi societari |

## Accesso
- **Strada principale**: Route 9 da Kyoto, uscita a Kameoka, poi strada provinciale verso ovest, infine strada secondaria sterrata di 800 m
- **Mezzi pubblici**: ultimo autobus utile parte da Kameoka centro alle 22:15 (Tachibana (vittima) lo usa il giorno prima dei sopralluoghi)
- **Auto private**: parcheggio sterrato sul retro, capienza ~30 veicoli, le auto vengono coperte con teli scuri
- **Sentieri di fuga**: 2 vie secondarie verso le risaie a sud (utili in caso di blitz polizia)

## Descrizione esterna
Capannone in lamiera grigia, 35×20 m, tetto a doppio spiovente, altezza 7 m al colmo. Insegna sbiadita, finestre alte oscurate dall'interno. Recinzione metallica scolorita su tre lati. Zona circostante: campi coltivati, pochi rustici abitati a 200+ m di distanza. **Nessun lampione** nel raggio di 500 m. Di giorno: aspetto abbandonato.

## Descrizione interna

### Zona ingresso (15% spazio)
- Doppia porta scorrevole esterna, sbarra di sicurezza
- Piccolo guardiano interno con tavolo: 2 uomini riscuotono la "quota d'ingresso" (¥30.000 a persona)
- Lista presenze in codice (registro di Hayashi)

### Zona scommesse (25% spazio)
- 4 banchi di legno con allibratori
- Lavagna con quote scritte a gesso, aggiornate a ogni combattimento
- Tachibana (vittima) operava qui — il suo banco era il secondo da sinistra, sempre lo stesso
- Cassaforte mobile (portata via dopo ogni serata)

### Zona arena (40% spazio)
- Arena ottagonale recintata, diametro 4 m, paglia sul fondo
- Gradinata in legno a 3 livelli, capienza ~80 spettatori
- Illuminazione potente sopra l'arena (lampade industriali)
- 2 angoli per i trainer dei galli con sgabelli e secchi

### Zona retro (15% spazio)
- Stalla per i galli prima del combattimento (gabbie di legno individuali)
- Tavolo di "preparazione" per i galli (qui Murakami (veterinario) avrebbe sedato il gallo del Nitōgun)
- Cassetta veterinaria (ufficialmente per le cure dopo i combattimenti)

### Zona magazzino e ufficio (5% spazio)
- Piccolo ufficio di Saitō (porta chiusa, accessibile solo a Hayashi)
- **Cassaforte fissa a muro** in ufficio: contiene i registri reali del Nitōgun, contanti per ¥15-20 mln a serata, lista clienti criptata
- Magazzino con segatura, sabbia, attrezzi

## Frequentazione
- **Una serata al mese**, sempre nella data del giornale
- ~60-80 spettatori a serata
- ~20 operativi del Nitōgun (sicurezza, allibratori, addetti galli)
- 7 combattimenti per serata (vedi sistema di codifica nel taccuino)

## Sicurezza
- 4-5 uomini armati presenti, **non yakuza** ma piccoli criminali con armi corte
- Sistema di vedette: 2 guardie a 500 m sulla strada secondaria con walkie-talkie
- Telefonata di allerta in caso di pattuglia in avvicinamento (Inagaki avvisa)
- Procedura di emergenza: 90 secondi per spegnere luci, far scappare scommettitori, nascondere galli vivi

## Indizi rilevanti
- **Cassaforte ufficio**: combinazione conosciuta solo da Saitō e Hayashi
- Registro reale clienti (cartaceo, in codice)
- Quaderni di scommesse arretrate (5 anni)
- Inventario galli e veterinario (pagamenti a Murakami (veterinario))
- Materiale per giornate combattimento

## Come i PG arrivano qui

### Vie di accesso indiziarie
1. **Sasaki Hideo (prestanome)**: indica zona generale, riconosce insegna "Tanaka Nōki" se mostrata in foto
2. **Inoue**: descrive l'interno e la disposizione
3. **Ōkubo**: indica zona ovest di Kameoka, fiume vicino
4. **Pedinamento di Hayashi** in giorno operativo (nei giorni precedenti il combattimento)
5. **Murakami** (se ancora vivo): indica direttamente il luogo
6. **Il registro corse della Hozu Taxi** (保津タクシー, la piccola compagnia di taxi di Kameoka, 6 vetture): nelle notti dei combattimenti fa in una notte le corse di due settimane (una trentina contro le due scarse di una notte qualunque), tutte verso la stessa sterrata fra le 22:00 e le 23:30. I tassisti scaricano **all'incrocio, mai davanti al capannone**, pagati in contanti e senza ricevuta — e non sanno niente, quindi parlano volentieri. Incrociato con le date degli annunci sul giornale dà il **calendario dei combattimenti senza decifrare il codice**. È un handout (vedi `PIANO_HANDOUT_IMMAGINI.md`)

### Come ci arriva la gente
La maggior parte lascia l'auto in un parcheggio del centro di Kameoka o alla stazione JR **e prende un taxi**, per non farsi vedere con la propria macchina. Chi viene in corriera da Kyoto viene **preso al capolinea da un gregario** e portato su in auto (così Tachibana l'11/02, e i prestanome a gennaio). Solo gli organizzatori e i clienti grossi arrivano fino al parcheggio sterrato sul retro, dove le auto vengono **coperte con teli scuri**.

### Climax operativo: 22 febbraio 1998 ore 23:00
Prossimo combattimento. Possibile **blitz polizia** organizzato dai PG con la Polizia Prefetturale di Kyoto (esclusa Polizia Kameoka per via di Inagaki). Coordinato per essere efficace prima delle vedette.

## Esito blitz (se i PG ci arrivano)
- Arresti di 50-70 persone (scommettitori, operativi, alcuni clienti facoltosi)
- Sequestro contante e registri
- Chiusura definitiva del giro
- Saitō presente o assente in base al timing (se è già stato avvisato, non c'è)

## Il blitz del 22/02 — la scena dello scontro (Shōtotsu v3.1 — `../Combattimento/GENKAI_Combattimento.md`)

> **Si prepara la scena, poi decidono i giocatori.** Qui sotto c'è il tavolo apparecchiato: chi c'è, dove sta, cosa succede se nessuno interviene. Non è una sequenza da leggere ai giocatori.

### Il briefing della mattina (e perché è sbagliato)
La Sezione Crimine Organizzato pianifica **un'irruzione su un giro di scommesse**, non un assalto: si aspettano settanta impiegati e commercianti che alzano le mani. ~30 uomini, giubbotti, due furgoni, ingresso dalla porta grande. **Ai PG viene dato il lato ovest del piazzale**, quello che sulla mappa sembra la direzione di fuga verso le risaie: posizione «di contenimento», la meno pericolosa sulla carta. Nessuno mette in conto che dentro ci siano fucili.

### Come parte
1. **Le vedette** (2, a 500 m sulla sterrata): l'avvicinamento a fari spenti è un tiro di **Ascolto** delle vedette (5) contro la prudenza della colonna. Se lo vincono — ed è probabile, di notte in campagna si sente tutto — parte il walkie-talkie e i **90 secondi** della procedura d'emergenza.
2. **Dentro si spengono le luci.** Poi, invece della fuga ordinata, **partono i primi colpi dalle finestre alte** (7 metri, feritoie oscurate).
3. **La polizia è colta di sorpresa**: la colonna si blocca a metà piazzale e si mette al riparo dietro i furgoni. Per due o tre scambi **nessuno comanda niente** — ed è esattamente lo spazio in cui i PG decidono da soli.
4. **La porta grande si apre** e ne escono di corsa **settanta spettatori** nel buio: da quel momento il piazzale è pieno di gente che scappa in tutte le direzioni, e **sparare verso la porta significa sparare sulla folla**.

### Chi spara, e con cosa

| Chi | Quanti | Dove | Armi (v3.1) |
|---|---|---|---|
| **Tiratori alle finestre** | 3 | Finestre alte del lato nord ed est, a 7 m | **Fucile da caccia** a canna liscia (in campagna ne hanno tutti, sono regolari o quasi): trattalo come *automatica 9mm* — attacco Lucidità 5, Estrarre 3 / Colpire 2 / Ricarica 4, **danno 4** — ma **solo a distanza *lontano* o *vicino***, e ricarica ogni 2 colpi |
| **Capo sicurezza** | 1 | Dietro la porta grande | *Automatica 9mm* (3/2/4, danno 4), Lotta 1 |
| **Sicurezza armata** | 4-5 | Sparsi dentro | *Compatta .22/.25* (2/1/4, danno 3) — sparano **solo se accerchiati**: statistiche in `PNG_Nitogun_Banda` |
| **Gregari e addetti** | ~12 | Ovunque | Nessuna. Vedi sotto |
| **Spettatori** | ~70 | In fuga dalla porta | Nessuna. Sono l'ostacolo, non il nemico |

**Attributi** (comparse, `PNG_Nitogun_Banda`): 5 dappertutto, Presenza 6, **Ki 8**. Ukemi: fuoco → Distacco 5 · mani → Pazienza 5 · manganello → Ascolto 5. Mod. Presenza all'iniziativa: 0.

### I gregari che si spogliano
Appena capiscono che è finita — di solito dopo il secondo o terzo scambio, o quando cade uno di loro — **i gregari si strappano di dosso giacche, fasce e tutto quello che li identifica e si mescolano alla folla che scappa**. Da lì in poi sono settanta persone identiche che corrono al buio.
- Non c'è un tiro per fermarli tutti: **si fermano quelli che un PG riconosce**. Chi ha lavorato bene nei dieci giorni precedenti ha le facce in testa (le foto di Hayashi, il riconoscimento di Sasaki Hideo e Nishimura, l'identikit, la descrizione di Inoue): **è qui che l'indagine paga**.
- Un PG che si mette a fermare la gente invece di sparare fa la cosa più utile della serata. Ditelo con la scena, non con una regola.

### Le zone (per gli scambi)
- **Lontano**: il piazzale sterrato, i furgoni, la sterrata. Dove stanno la polizia e i PG.
- **Vicino**: sotto il muro del capannone, l'angolo cieco delle finestre, il retro col parcheggio delle auto coperte.
- **Contatto**: dentro, e la calca alla porta.
- **Le risaie a sud**: due sentieri di fuga, buio totale. Chi ci arriva è perso — a meno che i PG non abbiano chiesto di coprirli nel briefing (se lo chiedono, concediglielo: è buon gioco).

### Le tre cose da dire ai giocatori PRIMA
1. **Chi spara apre un fascicolo** (Conseguenze Giappone '97): ogni colpo esploso da un poliziotto è un procedimento interno, anche quando è legittima difesa — e qui lo è. Non è un divieto, è un prezzo. **Dirlo prima, mai dopo.**
2. **Davanti alla porta c'è la folla.** Sparare in quella direzione è colpire un civile.
3. **Il giubbotto** (Assorbe 3) si indossa in macchina: 4 per metterlo, non lo si fa sotto il fuoco.

### Come finisce
- Lo scontro dura poco: **3-4 scambi**. Poi i tiratori restano senza colpi o vedono la squadra speciale arrivare sul lato cieco, e si arrendono. La banda non è fatta di fanatici: sono uomini pagati.
- **Bilancio tipico**: 50-70 arresti, sequestro del contante della serata (¥15-20 mln) e dei registri veri dalla cassaforte dell'ufficio, i galli vivi nelle gabbie del retro come corpo di reato.
- **Saitō (il capo) c'è solo se nessuno l'ha avvisato**: il blitz esclude la Polizia di Kameoka proprio per questo, e Inagaki e Yamaguchi (i due corrotti) vanno presi **lo stesso giorno o il giorno prima, insieme**.
- Se un PG viene ferito, è qui che succede. Ki 0 = morto (danno da combattimento, nessun pavimento): con tre fucili in gioco, **dillo prima**.

## Note operative GM
- Il capannone è il **climax investigativo e operativo** dell'avventura
- Difficoltà di accesso = ostacolo narrativo (i PG devono **guadagnarsi** l'informazione)
- Possibile sequenza tattica: ricognizione di giorno (capannone vuoto, indizi limitati) + blitz coordinato la sera del 22/02
- Se i PG arrivano in giorni non operativi: capannone semivuoto, presidio minimo (1-2 guardiani), facile da forzare ma con poche prove dirette

## Collegamenti
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]
- [[PNG_Sergente_Inagaki_Poliziotto_Corrotto|Sergente Inagaki — Poliziotto corrotto]]
- [[Luogo_Ristorante_Kameoka_tei|Ristorante Kameoka-tei — Copertura]]

---

# Casa di Hayashi Tomoki — Kameoka centro

> Appartamento del braccio destro di Saitō. Modesto, in centro a Kameoka. Convive con la fidanzata Yui, ignara di tutto.

## Dati
| Campo | Valore |
|---|---|
| Indirizzo | Centro di Kameoka, zona residenziale-commerciale, vicino alla stazione JR Kameoka |
| Tipologia | Appartamento al 3° piano in palazzina anni '90 |
| Interno | 304 |
| Superficie | 55 m² (1LDK) |
| Regime | Affitto |

## Descrizione
Appartamento ordinato, arredamento moderno IKEA-style. Soggiorno con divano, TV grande, console PlayStation. Camera matrimoniale, piccolo bagno, cucina a vista. Niente di lussuoso ma curato. Mobili acquistati a partire dalla convivenza con Yui (2 anni fa).

## Persone presenti
- **Hayashi Tomoki** (35)
- **Yui Suzuki** (28) — fidanzata, commessa in un negozio di abbigliamento a Kameoka, **ignara delle attività criminali del compagno**

## Indizi rilevanti

### A vista
- Foto di coppia in soggiorno (Hayashi e Yui in un ryokan)
- TV, console, libri pop, riviste di tuning auto

### Nascosti
- **Doppiofondo del divano**: ¥1,2 mln in contanti (in 3 buste separate)
- **Doppia parete dell'armadio della camera matrimoniale**: secondo cellulare prepagato, con 4 numeri salvati con sigle: **"S.G."**, **"K.R."**, **"I.H."**, **"V2"**. Le sigle non sono identificabili da sole: i PG decifrano solo **dopo** averle incrociate con altri elementi — i registri di prelievo bancario di Saitō ("S.G."), l'arresto/identificazione di Kuroda ("K.R."), il libro paga sospetto di Inagaki via Affari Interni ("I.H."), il registro veterinari della prefettura ("V2" = veterinario di backup, mai utilizzato dopo Murakami (veterinario)). Trovato da solo, il cellulare prova solo che Hayashi gestiva una rete di contatti riservati
- **Cassetto in alto della cucina, dietro le scatole di tè**: chiavi del capannone di Kameoka (forma particolare a doppia mappa, riconoscibili)
- **Sotto il letto**: scatola di scarpe con vecchie scommesse cartacee da archivio (5-6 mesi precedenti, con codici e cifre)
- **Cassettina sopra l'armadio**: piccolo coltello a serramanico, due cartucce cal. 9×18 Makarov (residue, mai consegnate a Kuroda)

## Indagine
- **Mandato di perquisizione** ottenibile dopo aver collegato Hayashi alla telefonata in segreteria (voce identificata) o ai movimenti dell'11/02 (testimoni casuali a Kameoka durante l'incontro pomeridiano con Tachibana (vittima))
- **Yui** collabora se i PG le rivelano la verità con tatto: rimane sotto shock, può fornire dettagli sul comportamento di Hayashi negli ultimi giorni (uscite improvvise, chiamate al cellulare prepagato)
- Hayashi rientra a casa quasi ogni notte (esclusi i giorni operativi del capannone)

## Pericolo durante perquisizione
- Hayashi non è personalmente violento, ma se viene **avvisato** può fuggire o nascondere prove
- Possibile sequenza: i PG arrivano a casa, lo arrestano, Yui sviene o si dispera
- Se i PG arrivano in sua assenza: Yui apre la porta credendoli amici, perquisizione tranquilla

## Note operative GM
- L'appartamento è la **chiave della catena di prove** contro il Nitōgun
- Trovare il **secondo cellulare** è il colpo grosso: i numeri sopra registrati incastrano Saitō, Kuroda e Inagaki in un unico apparecchio
- Le **chiavi del capannone** confermano l'accesso operativo al luogo dei combattimenti
- **Yui è il punto di pressione emotivo**: Hayashi crolla in interrogatorio se sa che lei sta soffrendo o rischia conseguenze legali

## Al tavolo — Suzuki Yui (fidanzata di Hayashi; non è la cameriera Suzuki del Kameoka-tei)

**Come si riconosce**: 28 anni, caschetto castano, jeans e maglione del negozio, sorriso pronto; adora Tomoki e lo dice. In casa tiene tutto in ordine tranne il posacenere di lui.

**Come si comporta**: apre la porta credendo i PG amici di Tomoki e offre il caffè. Se le dicono la verità con tatto, resta sotto shock e poi collabora: le uscite improvvise, il «telefonino piccolo per il lavoro» che lui tiene nell'armadio e usa in bagno con l'acqua aperta («pensavo a un'altra donna»). Se glielo dicono male, o davanti ai vicini, chiama la madre a Fukuchiyama e non parla più.

| Data | Cosa dice di Tomoki | Come si verifica |
|---|---|---|
| 11/02 sera | «È tornato alle sette, abbiamo cenato; verso le otto e mezza è uscito "per lavoro", è rientrato alle undici e mezza e aveva fame» | Solo lei. È la crepa nell'alibi di Hayashi |
| 14/02 sera | «È sceso per le sigarette verso le nove e mezza, è tornato dopo mezzanotte» | Solo lei. Sono quasi tre ore: bastano per andare a Kyoto e tornare |
| 16/02 | «Mi ha detto: se qualcuno ti chiede di me, non sai niente» | — |

**D-24 — Deposizione** (a casa, dopo l'arresto di Hayashi o in una visita discreta dal 15/02; verbalizza Yamada, meglio se con Sato o Fujita)
> «Suzuki Yui, ventotto anni, commessa a Kameoka. Tomoki e io stiamo insieme da tre anni, conviviamo da due. Lui lavora per la società del signor Saitō, terreni, un ristorante, cose così; torna quasi sempre per cena. Mercoledì undici è tornato alle sette, abbiamo mangiato, poi verso le otto e mezza ha detto "devo uscire per lavoro" ed è rientrato alle undici e mezza, aveva fame, gli ho scaldato il riso. Sabato quattordici è sceso "per le sigarette" verso le nove e mezza ed è tornato dopo mezzanotte; non ci ho fatto caso, fuma sempre. Ha due telefoni: quello dell'azienda e uno piccolo "per il lavoro", che tiene nell'armadio e usa in bagno con l'acqua aperta — pensavo a un'altra donna, mi vergogno a dirlo. Negli ultimi giorni non dormiva. Lunedì sedici ha detto: "se qualcuno ti chiede di me, non sai niente". È vero: non so niente. Cosa ha fatto?»

Omette niente: non sa niente. Gli orari li dà senza capire cosa valgono.

**En**: Yamamoto 0 · Honda 0 · Nakamura +1 · Sato +1 (coetanei) · Fujita +1. Verso chi le dice la verità: −1 il giorno stesso (il messaggero), +1 da quando la proteggono. Con gli altri: Hayashi **+4** — e non scende neanche dopo: «lo aspetto».

**Come cambia nel tempo**: fino al 15/02 è una ragazza felice. Dopo l'arresto di Hayashi: sviene, poi D-24; la sua convocazione è la leva che fa crollare lui. Se Hayashi collabora, i PG devono proteggere anche lei (va dai genitori a Fukuchiyama). Se Hayashi tace, lei riceve la visita dell'avvocato del gruppo con una busta «per le spese»: la restituisce, se un PG le ha parlato prima.

## Collegamenti
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[PNG_Kuroda_Ryo_Esecutore|Kuroda Ryō — Esecutore]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]

---

# Casa di Kuroda Ryō — Fushimi (Kyoto)

> Monolocale dell'esecutore materiale. In quartiere popolare, vicino al fiume Kamo. Adiacente a una piccola palestra di pugilato (la sua copertura).

## Dati
| Campo | Valore |
|---|---|
| Indirizzo abitazione | Fushimi-ku, Kyoto, vicino al fiume Kamo, zona popolare |
| Tipologia | Monolocale (1K) al 2° piano di una palazzina anni '70 |
| Interno | 203 |
| Superficie | 25 m² |
| Regime | Affitto |
| Indirizzo palestra | Stessa palazzina, piano terra |

## Descrizione monolocale
Spartano. Letto futon a pavimento, frigorifero piccolo, fornello a gas a 2 fuochi, TV a tubo catodico, niente lavatrice (usa la lavanderia automatica al pianterreno della via). Pareti grigie, una sola finestra con vista su un parcheggio. Pulito, ordinato in modo militaresco. Niente foto di familiari, niente ricordi personali. Sembra una stanza temporanea anche se abitata da 3 anni.

## Descrizione palestra
**"Tora Boxing Gym"** (虎ボクシング), piccola palestra di pugilato al piano terra. Insegna scolorita. Sacco da boxe, ring di allenamento, attrezzi base. Frequentata da una decina di ragazzi del quartiere, allievi di Kuroda. Funge da **copertura formale** (Kuroda è "istruttore di pugilato" sul registro fiscale). Allievi pagano ¥4.000 al mese.

## Indizi rilevanti

### Nel monolocale
- **Asics Gel** sotto il letto, taglia 27 cm, suola compatibile con impronta scena del crimine
- **Makarov PM cal. 9×18** nascosta in un'**intercapedine del bagno** (dietro la cassetta del WC, accessibile rimuovendo una piastrella)
- **Coltello tantō** rituale giapponese sotto una tavola del pavimento (oggetto culturale personale)
- Quaderno di **calligrafia giapponese**: esercizi quotidiani, sorprende per livello e dettaglio (lato culturale segreto del personaggio)
- Banconote **¥10.000 numerazione consecutiva** (¥800.000) in una scatola di scarpe (paga di Saitō, tracciabile)
- Cellulare **prepagato** con sole 4 chiamate ricevute da Hayashi nei giorni 10, 12, 14, 16 febbraio
- Cartucce **9×18 Makarov** di scorta in una scatolina (5)

### Nella palestra
- Registro frequenze allievi (in regola)
- **Ring di allenamento**: tracce ematiche minime sul pavimento (Kuroda lo usa anche per allenamenti privati senza guantoni)
- Armadio attrezzature: niente di sospetto
- **Falsa bocchetta di aerazione** nel ripostiglio: nasconde **¥2 mln in contanti** (riserva) e una **seconda pistola** (Tokarev TT-33)

## Persone presenti
- **Kuroda Ryō** durante la maggior parte del giorno
- Allievi della palestra: 18:00–22:00 nei giorni feriali

## Indagine
- **Mandato di perquisizione** difficile prima di prove concrete
- I PG possono arrivare qui solo dopo aver collegato Kuroda alle scene del crimine (impronta scarpa, telecamera corridoio, descrizione di Ōkubo)
- Se Kuroda è assente: perquisizione tranquilla
- Se Kuroda è presente: pericolo concreto. È giovane, atletico, armato. Possibile colluttazione fisica.

## L'arresto (Shōtotsu v3.1 — `../Combattimento/GENKAI_Combattimento.md`)
- Kuroda non si arrende facilmente: statistiche nella sua scheda (Lotta 2, Makarov, Ki 10)
- **Come si gioca**: i PG entrano col revolver prelevato dall'armadietto (firmando) e il keibō. Se lo sorprendono con l'arma già puntata è **Sotto Tiro** (velocità 0: «*Polizia! Fermo!*») e la scelta sensata per lui è alzare le mani; se invece li vede arrivare, il monolocale è zona *contatto*: preferisce le mani (Lotta 2) al colpo di pistola, e cerca la porta
- **La fuga**: dalla palestra al vicolo e verso il fiume Kamo = da *vicino* a *lontano* con l'azione Muoversi; chi lo insegue tira Presenza o Lucidità per non perderlo (tiri di attributo, non di scontro). Ha contante e la Tokarev di scorta nella falsa bocchetta: se arriva lì, riparte armato
- **Le conseguenze (Giappone 1998)**: chi estrae lo scrive nel rapporto, chi spara apre un fascicolo dell'ispettorato — anche l'arresto riuscito costa giorni di audizioni

## Note operative GM
- L'arresto di Kuroda è la **scena d'azione** dell'avventura: mezz'ora di adrenalina, poi si torna a indagare
- La **prova balistica** della Makarov (striature dei proiettili recuperati + segni del percussore sul bossolo della stazione): prova decisiva
- Il **quaderno di calligrafia** è un dettaglio caratteriale che umanizza Kuroda — opzionale ma narrativamente forte

## Collegamenti
- [[PNG_Kuroda_Ryo_Esecutore|Kuroda Ryō — Esecutore]]
- [[Luogo_Kyoto_Station_Scena_Crimine|Kyoto Station 1998 — Scena del crimine]]
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]

---

# Casa Murakami — Yamashina

> Abitazione della famiglia Murakami. Casa modesta a 200 m dallo studio veterinario.

## Dati
| Campo | Valore |
|---|---|
| Indirizzo | Higashino Sannō-chō 12-7, Yamashina-ku, Kyoto |
| Tipologia | Casa indipendente, 2 piani in stile suburbano anni '80 |
| Anno costruzione | 1986 |
| Superficie | 110 m² |
| Regime | Proprietà, **due ipoteche** attive |

## Descrizione
Casa monofamiliare con piccolo giardino frontale, parcheggio per 1 auto. Piano terra: ingresso, soggiorno-sala da pranzo all'occidentale, cucina, bagno, camera dei genitori. Piano superiore: 2 camere figli, bagno piccolo, balcone. Arredamento misto giapponese-occidentale, mobili anni '80 ben tenuti ma non sostituiti. Tatami nella stanza al piano terra usata come *washitsu*.

## Atmosfera
Casa silenziosa. Le tensioni economiche e la distanza tra i coniugi negli ultimi anni si percepiscono dall'ordine eccessivo, dall'assenza di foto recenti, dal fatto che Murakami (veterinario) dorma spesso nel washitsu invece che nella camera matrimoniale.

## Persone presenti
- Murakami Hiroko (49) — moglie, casalinga
- Murakami Aiko (15) — figlia
- (Murakami Yūsuke (figlio del veterinario) è a Tokyo)
- Fino al 13/02: anche Murakami Saburō (veterinario)

## Indizi rilevanti
- Album fotografici familiari fino al 1995, poi nessuna foto
- Lettera della banca (sul tavolo del soggiorno) con sollecito di pagamento, indirizzata a Murakami (veterinario)
- Cassetta della posta: lettere arretrate non aperte, fatture
- Cassetto del telefono: rubrica di Hiroko, nessun riferimento a contatti del marito
- **Mansarda**: vecchi documenti dell'investimento immobiliare di Lake Biwa — ricevute, contratti, lettere del cognato sparito
- Cassettiera della camera matrimoniale: nessuna traccia di vita coniugale recente

## Indagine
- I PG possono visitare con il permesso di Hiroko
- Lei collabora completamente dopo la morte del marito
- **Aiko** può fornire informazioni preziose se interrogata con cautela (ricorda telefonate, gesti, momenti specifici)
- L'eventuale presenza di un **uomo sospetto** (Kuroda?) intorno alla casa nei giorni precedenti il 13/02 può essere ricordata da vicini

## Scena dell'omicidio Murakami (13/02)
**L'omicidio NON avviene in casa**, ma allo **studio veterinario** (vicolo retro, pomeriggio ~14:00). Vedi `Luogo_Studio_Veterinario_Murakami.md` per dinamica.
Hiroko trova il corpo allo studio verso le 16:30 e rientra in casa devastata. La casa Yamashina diventa quindi un luogo di **dolore familiare e collaborazione investigativa**, non di scena del crimine.

## Note operative GM
- Visitare la casa Murakami è un momento di **forte impatto emotivo**: ricorda ai PG la dimensione umana della tragedia
- Aiko è una **fonte involontaria** di indizi (vedi scheda PNG Famiglia Murakami)
- **La vicina, Sig.ra Yoshioka** (78 anni, la casa di fronte): minuta, sempre alla finestra o in giardino, porta da mangiare ai Murakami tutti i giorni dal 13/02. Ricorda perfettamente chi passa nel vicolo. Se i PG fanno il giro delle case (gli indizi si danno sempre: niente tiro) racconta di **giovedì 12/02 verso le 15:00**: *«un giovane con un berretto di lana e una borsa a tracolla nera, che ha fatto il vicolo due volte, avanti e indietro, guardando le porte sul retro. Non era di qui: qui la gente cammina come se sapesse dove va»*. È Kuroda in ricognizione. Se nessuno la interroga, lo racconta a Hiroko il 16/02, dopo il funerale, e Hiroko lo riferisce ai PG. En: +1 con chi le lascia finire il racconto, +2 con Sato («che bravo ragazzo»)

## Collegamenti
- [[PNG_Murakami_Saburo_Veterinario|Dr. Murakami Saburō — Veterinario]]
- [[PNG_Famiglia_Murakami|Famiglia Murakami]]
- [[Luogo_Studio_Veterinario_Murakami|Studio veterinario Murakami — Yamashina]]

---

# Casa Tachibana Setsuko — Maizuru

> Casa di famiglia della moglie separata di Tachibana (vittima), dove vive con la madre anziana. Distante da Kyoto.

## Dati
| Campo | Valore |
|---|---|
| Indirizzo | Maizuru-shi, Kyoto-fu, zona residenziale collinare |
| Tipologia | Casa tradizionale giapponese (machiya) di proprietà familiare |
| Anno costruzione | 1962 |
| Superficie | 90 m² su due piani |
| Distanza da Kyoto Station | ~95 km, 2 ore di treno via JR San'in Line |

## Descrizione
Casa tradizionale con tetto in tegole, ingresso *genkan* curato, tatami in tutto il piano terra, *engawa* (corridoio in legno) che si affaccia su un piccolo giardino interno con aceri. Mobili antichi, calligrafie alle pareti, ikebana fresco settimanale. Atmosfera silenziosa, profumo di tatami e di tè verde.

## Persone presenti
- **Tachibana Setsuko** (44) — vedova de facto della vittima
- **Hosokawa Eiko** (74) — madre di Setsuko, vedova, in salute discreta
- Studi privati di calligrafia: 3 studentesse settimanali frequentano la casa per lezioni

## Indizi rilevanti
- **Vecchie lettere di Tachibana** (anni '85-'95) conservate in una scatola di legno: testimoniano il rapporto, una lettera del 1992 contiene la frase *"a Kameoka ho conosciuto persone che mi possono aiutare"* (primo accenno indiretto al Nitōgun, ricostruibile a posteriori)
- **Foto di matrimonio strappata** (gesto di rabbia di Setsuko al momento della separazione, conservata)
- Album di famiglia: foto di Tachibana (vittima) giovane, prima dell'ingresso nel circuito criminale (1985-1990)
- **Dichiarazione testamentaria** di Tachibana (vittima): registrata presso un notaio di Kyoto nel 1995, nomina Setsuko erede universale (Mariko, l'amante, non è citata)
- Niente documenti criminali

## Indagine
- Visitabile con preavviso telefonico (Setsuko non riceve ospiti senza appuntamento)
- I PG dovrebbero avvisare e annunciarsi formalmente
- Setsuko risponde a domande con precisione e dignità
- La madre Eiko offre tè e dolci, ricorda alcuni dettagli del genero

## Al tavolo — Hosokawa Eiko (74, madre di Setsuko)

Minuta, kimono grigio, mani ferme; offre tè e dolci di fagioli prima di qualsiasi domanda e conferma senza esitare la sera dell'11/02 (la lezione, la cena). Parla del genero come di un figlio perso due volte:
> «Eiji era un bravo ragazzo, prima di Kameoka. Nel '92 è tornato da Kameoka con una macchina nuova e un sorriso che non mi piaceva. Setsuko non lo dice, ma lo aspettava ancora.»

En: +1 con tutti i PG che si tolgono le scarpe e accettano il tè; +2 con Fujita. Se Setsuko si chiude, è Eiko che porta ai PG la scatola delle lettere.

## Note operative GM
- Visita **non operativa** ma di **caratterizzazione**: i PG capiscono il passato di Tachibana (vittima)
- Le lettere del 1992 sono un dettaglio narrativo per chi vuole approfondire l'origine della carriera criminale della vittima
- Possibile gancio: Setsuko consegna ai PG **una chiave** di un vecchio armadio dell'appartamento di Fushimi che Tachibana (vittima) usava ancora ma di cui lei aveva un duplicato — apre a contenuti dimenticati

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Tachibana_Setsuko_Moglie|Tachibana Setsuko — Moglie]]
- [[Luogo_Appartamento_Vittima_Fushimi|Appartamento di Tachibana Eiji — Fushimi]]

---

# Club Aoyagi — Locale di hostess a Kiyamachi

> Locale di hostess di alto livello dove lavora Aoyagi Mariko, amante di Tachibana (vittima). Frequentato da imprenditori, professionisti, alcuni clienti di Tachibana.

## Dati
| Campo | Valore |
|---|---|
| Nome | Club Aoyagi (青柳) |
| Indirizzo | 4° piano di edificio commerciale, Kiyamachi-dōri, Nakagyō-ku, Kyoto |
| Tipologia | Hostess club di livello medio-alto |
| Apertura | 1991 |
| Orari | 20:00–02:00, chiuso domenica |
| Capienza | 12 tavoli + bancone, ~40 ospiti contemporanei |

## Descrizione
Locale buio, illuminazione soffusa, divani in pelle nera, tavolini bassi. Karaoke disponibile. Hostess in abito da sera, kimono per le occasioni speciali. Drink minimi: ¥30.000 a testa. Frequentazione: ricevimenti d'affari, professionisti, alcuni politici locali. Non malavita strutturata, non yakuza presente — il proprietario tiene il locale "pulito" da rapporti criminali diretti.

## Personale
- **Aoyagi Hiroshi** (55) — proprietario (omonimia con Mariko, suo zio paterno)
- **Mama-san Reiko (gestisce le hostess; non è Tachi Reiko del Kameoka-tei)**, 48
- **8 hostess regolari**, tra cui **Mariko (Mari)**
- **2 baristi**, **1 pianista**

## Indagine
- Aoyagi Mariko è l'oggetto principale dell'indagine qui
- Mama-san Reiko è collaborativa se trattata con discrezione: conferma la relazione di Mariko con Tachibana (vittima), conferma le date in cui lui ha frequentato il locale
- Il proprietario Aoyagi Hiroshi è geloso della reputazione del locale: parlerà solo se garantito anonimato
- Possibile incrocio: alcuni dei 6 clienti scommettitori frequentano il locale (in particolare **Inoue Takeshi**, ristoratore di Pontochō)

## Indizi rilevanti
- Registro presenze hostess (Mariko era al lavoro l'11/02 — alibi confermato)
- Registro clienti (Tachibana (vittima) frequentava 2-3 volte al mese, sempre da solo o con un cliente d'affari)
- Conti del 2 febbraio 1998: Tachibana (vittima) ha cenato qui con un uomo descritto come *"sui 30 anni, casual, sneaker"* (descrizione coerente con Hayashi — ultima cena d'affari prima della morte)

## Note operative GM
- Visitabile dalle 20:00 in poi
- Approccio diplomatico necessario: i PG che si presentano come clienti hanno accesso facile, quelli con badge possono ottenere collaborazione ma con cautela
- Possibile **scoperta importante**: la cena del 2/02 con un uomo descritto come Hayashi è una conferma indiretta dei contatti
- Approfondimento: la Mama-san può raccontare lo stato d'animo di Tachibana (rilassato negli ultimi due mesi, dettaglio coerente con post-truffa)

## Al tavolo — la mama-san Reiko e il proprietario

**Come si riconosce** la mama-san Reiko (48; non è Tachi Reiko del Kameoka-tei): kimono scuro, capelli raccolti, voce bassa, sigaretta nel bocchino; conta i tavoli con gli occhi mentre parla. **Aoyagi Hiroshi** (55, proprietario, zio di Mariko): abito grigio, gemelli, il sorriso di chi ha un locale pulito e vuole che resti tale.

**Come si comporta** Reiko: in sala, davanti ai clienti, non risponde a nessuna domanda; nell'ufficio sul retro, con la porta chiusa, collabora con discrezione. Protegge le ragazze prima del locale. Chi entra col tesserino in mano alle 21:00 la perde; chi chiede di lei alle 19:00, prima dell'apertura, l'ha già conquistata.

**D-23 — Deposizione** (ufficio del club, dal 13/02; verbalizza Yamada)
> «Reiko, la mama-san del Club Aoyagi. Mari lavora con me da quattro anni: la migliore, e non lo dico per venderla. Il signor Tachibana veniva due o tre volte al mese, sempre da solo o con un uomo d'affari, sempre al tavolo quattro, whisky giapponese, mai un problema, pagava in contanti e lasciava bene. Con Mari era una cosa seria, per quel che può esserlo: le pagava l'affitto, e lei aspettava un divorzio. Mercoledì undici Mari era qui dalle sette alle due, lo firmo. Il signor Tachibana l'ultima volta l'ho visto il due febbraio: ha cenato qui con un uomo sui trent'anni, casual, scarpe da ginnastica, che rideva troppo — non del nostro giro, un tipo da Kameoka, direi. Negli ultimi mesi il signor Tachibana era di buon umore, rilassato: si vedeva. La settimana scorsa un po' meno. Il registro dei clienti e le ricevute del due ve li faccio avere, ma il nome del locale resti fuori dai giornali. E se Mari ha paura, e ce l'ha, mandate qualcuno a dormire sotto casa sua, non a farle domande.»

Omette niente. Aoyagi Hiroshi conferma tutto solo con l'anonimato garantito; se il nome del club esce sul giornale, chiude la porta a tutti.

**En** (Reiko): Yamamoto 0 · Honda −1 (troppo diretto in sala — e se Goto siede al bancone accanto a lui, lo classifica «uno che frequenta») · Nakamura +1 · Sato 0 · Fujita **+2** (*Mondo della notte*: si parlano da pari). Con gli altri: Mariko +2 · Tachibana (vittima) +1 · Aoyagi Hiroshi +2.

**Come cambia nel tempo**: dal 15/02 vede Mari terrorizzata e lo dice ai PG che hanno lasciato un numero; se Mari parte per Sapporo (16–18/02) è lei a dirlo — e a dare l'indirizzo dei genitori solo a chi l'ha protetta (+1). Dopo il 22/02 consegna il registro clienti: tra i nomi, Inoue Takeshi e, due volte, Tanaka Shōji.

## Collegamenti
- [[PNG_Aoyagi_Mariko_Amante|Aoyagi Mariko — Amante]]
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]

---

# Kyoto Station 1998 — Scena del crimine

> Bagno pubblico al terzo piano, lato Hachijō. Mercoledì 11 febbraio 1998, ore 21:21.

---

## Indirizzo e contesto

| Campo | Valore |
|---|---|
| Stazione | Kyoto Station (京都駅) |
| Indirizzo | Higashi-Shiokōji-chō, Shimogyō-ku, Kyoto |
| Lato | Hachijō-guchi (sud) |
| Piano | 3F |
| Architetto | Hiroshi Hara |
| Inaugurazione edificio attuale | 1997 (l'edificio ha pochi mesi al momento dei fatti) |

**Contesto storico**: il nuovo edificio della Kyoto Station è stato aperto nel 1997 per il 1.200° anniversario della fondazione della città. Stile futurista in vetro e acciaio, 70 m di altezza, 470 m est-ovest. Al momento dei fatti l'edificio è una novità cittadina, alcune aree sono ancora in fase di rifinitura. Le telecamere di sorveglianza sono presenti ma poche, e il sistema di registrazione è su nastro VHS rotativo a 24 ore.

## Posizione del bagno

Bagno maschile al 3° piano, lato Hachijō, in prossimità dei tornelli Shinkansen (Shinkansen Hachijō Gate), nel corridoio sud accanto agli uffici della direzione di stazione (駅事務室・管理室). Area frequentata da viaggiatori in transito Shinkansen e Kintetsu. Distante dalle aree commerciali principali (Asty Road è al 1° piano).

**Accesso**: dal piano terra Hachijō, scala mobile o ascensore fino al 3° piano. Corridoio laterale est, oltre la sala d'attesa Shinkansen, indicazione bagni in giapponese e inglese.

**Affluenza serale**: media. Negli orari 21:00–22:00 il flusso si concentra sui treni in partenza, il bagno è poco usato. La sera dell'11 febbraio l'ultimo Shinkansen per Tokyo era partito alle 21:13.

## Struttura interna del bagno

- 3 cubicoli WC stile occidentale (uso frequente da parte di viaggiatori) sul lato sinistro
- 4 orinatoi sul lato destro
- 2 lavabi con specchio in fondo
- Distributore di salviette di carta
- Asciugamani elettrici Mitsubishi
- Pavimento in piastrelle bianche di gres, fughe scure
- Pareti rivestite fino a 1,80 m, sopra intonaco bianco
- Illuminazione: neon a soffitto, luce fredda
- Soffitto basso (2,40 m), areazione meccanica costante (rumore di fondo continuo)

**Cubicolo dell'omicidio**: quello centrale dei tre. Porta grigia in lamiera verniciata con telaio in acciaio, serratura a pomello con indicatore rosso/verde, apertura verso l'interno. Spazio interno 90×140 cm.

## Dinamica omicidio

- **21:18**: Tachibana (vittima) entra nel bagno, va al cubicolo centrale, chiude la porta
- **21:19**: Watanabe Toshio (testimone) è già nel cubicolo a sinistra (entrato alle 21:14)
- **21:20**: Kuroda Ryō entra nel bagno, controlla con un'occhiata che il bagno sia vuoto a parte i cubicoli
- **21:21**: Kuroda spara 3 colpi cal. 9×18 attraverso la porta del cubicolo centrale, all'altezza del torace
- **21:21+10s**: Kuroda raccoglie i bossoli, esce
- **21:21+30s**: Tachibana (vittima), ancora cosciente per pochi secondi, traccia col sangue sul pavimento il simbolo del gallo Nitōgun (due speroni sovrapposti)
- **22:01**: Watanabe Toshio (testimone) esce dal proprio cubicolo dopo 40 minuti di paralisi e segnala
- **22:08**: arriva la prima pattuglia, il **Kōban** della stazione (police box interna)
- **22:35**: arrivano la Kanshiki-ka di **Ito Daisuke** e l'agente **Yamada Tetsuo** per la Sezione Omicidi; il caso passa alla squadra dei PG al briefing delle 08:00 del 12/02

## Indizi sulla scena

### Sul corpo
Vittima trovata seduta in posizione semireclinata, schiena contro la parete del cubicolo, cellulare ancora nella mano sinistra (schermo spento per inattività), pantaloni allacciati. Tachibana (vittima) **non stava effettivamente usando il bagno**: era entrato in attesa dell'incontro con Hayashi (vedi sezione "Cosa cercava Tachibana alla stazione").

### Sul pavimento
- Pozza di sangue
- **Disegno**: gallo stilizzato con due speroni sovrapposti sulla zampa destra, tracciato con il dito indice destro
- Una piuma marrone scuro (proveniente dal bagagliaio dell'auto, attaccata alla suola della scarpa destra)

### Sulla porta del cubicolo
- 3 fori di proiettile, raggruppati in un'area di circa 25 cm, altezza torace
- Bruciature da polvere da sparo sul lato esterno (sparo a contatto/quasi)
- Schegge di laminato verso l'interno

### Sul pavimento del bagno (esterno cubicolo)
- Impronta parziale di scarpa da ginnastica suola in gomma con scanalature trasversali, **Asics Gel** taglia 27 cm
- Zona davanti al cubicolo centrale, leggermente bagnata (Kuroda è entrato dopo aver attraversato il piazzale piovoso)
- **Un bossolo cal. 9×18** rotolato **sotto un orinatoio**, sfuggito alla raccolta dell'assassino: non in evidenza, lo trova solo una ricerca accurata. Prova balistica chiave — decisiva **solo se** l'arma verrà poi sequestrata

### Assenti
- Due dei tre bossoli (raccolti dall'assassino — il terzo è sotto l'orinatoio, vedi sopra)
- Impronte digitali utili (Kuroda indossava guanti in pelle sottile)
- Tracce di colluttazione

## Telecamere

- Telecamera all'ingresso del bagno: **non funzionante** dal 9 febbraio (guasto già segnalato, ricambio in arrivo)
- Telecamera **CAM-12** del corridoio sud del 3° piano (verso i bagni): funzionante, registra il passaggio di Kuroda alle 21:20 (entrata: berretto di lana, giubbotto scuro imbottito, guanti, borsa a tracolla nera) e 21:22 (uscita)
- Qualità immagine VHS: scarsa, volto non riconoscibile, ma corporatura, abbigliamento e andatura sì
- **Le altre telecamere della stazione** (atri, scale mobili, uscite, biglietterie) **funzionano tutte e non danno niente di più**: inquadrature larghe su un atrio pieno di gente, la stessa qualità VHS, l'uomo col berretto è un puntino tra centinaia. Il GM lo dica chiaro ai PG che chiedono l'intero archivio — così non ci passano sopra una serata: **l'unico fotogramma utile è quello della CAM-12**, ed è di spalle (handout: il verbale d'acquisizione H-26 + la foto `AssassinoArrivaStazione.png`)
- Tachibana (vittima) è ripreso alle 21:17 mentre arriva al 3° piano, **da solo**

## Testimoni

- **Watanabe Toshio** (cubicolo accanto): unico testimone diretto, sentito ma non visto
- Anziana addetta alle pulizie della stazione **Mori Sachiko (addetta alle pulizie della stazione; non è Mori Yasuko, la domestica di Saitō)**, 62 anni: piccola, grembiule azzurro JR, sente poco dall'orecchio sinistro e lo dice subito. Ha pulito il bagno alle 20:30, era vuoto. Non era presente al momento dei fatti. Nel verbale del Kōban (H-01): *«Ho pulito il bagno alle otto e mezza, era vuoto, i cestini vuoti. Ho passato lo straccio vicino agli orinatoi, restava umido. Il cartello della telecamera c'era da lunedì. Non ho visto nessuno di strano: la sera della festa c'era poca gente al terzo piano.»* — il pavimento umido è quello su cui Watanabe Toshio (testimone) ha sentito cigolare le scarpe
- Bigliettaio **Tanigawa** allo Shinkansen Hachijō Gate (non è lo chef Tanigawa del Kōrin): 40 anni, preciso, ricorda le persone dai bagagli. Nel verbale del Kōban: *«Verso le nove e ventitré un uomo con una giacca scura e un berretto è passato davanti allo sportello, di fretta ma senza correre, verso le scale mobili. Ho notato solo che non aveva bagagli, e alla stazione, a quell'ora, tutti ne hanno.»* (corrisponde a Kuroda)

## Cosa cercava Tachibana alla stazione

**Era stato attirato in trappola da Hayashi.** Durante l'incontro pomeridiano dell'11/02 a Kameoka (14–18), Hayashi gli ha fissato di persona un appuntamento serale alla stazione: *"alle 21:15, al bagno del 3° piano lato Hachijō, posto discreto, ti porto la tua quota del giro di gennaio"*. Per Tachibana (vittima) è routine mensile (consegna in contanti della sua quota), nessun motivo di sospettare. Il punto incontro nel bagno gli è giustificato come "evitiamo di farci vedere insieme in pubblico, soprattutto in una serata festiva con poche persone in stazione" — pretesto credibile.

## Movimenti precedenti di Tachibana l'11/02

- **Mattino**: locale Kōrin a Gion, gestione ordinaria
- **14:30**: prende l'autobus per Kameoka (Kyoto Kōtsū, capolinea lato Shichijō)
- **15:30 ca**: arrivo Kameoka. Incontro pomeridiano con Hayashi per "discussioni operative" (cliente nuovo, calendario combattimenti del 22/02). Hayashi gli fissa l'appuntamento serale alla stazione.
- **18:30**: prende l'autobus di ritorno (secondo biglietto di sola andata)
- **19:30**: arrivo al capolinea di Kyoto Station (lato Shichijō); attraversa la stazione e lascia gli effetti dell'autobus alla sua **Toyota Crown** parcheggiata al multipiano lato Hachijō (posto B-14)
- **19:45–20:45**: cena leggera al ristorante-bar dello **Shin-Miyako Hotel**, davanti all'uscita Hachijō, tavolo per uno: il conto (¥3.150, ore 19:45) è nella tasca dei pantaloni e fissa gli orari
- **20:50–21:15**: rientra in stazione, si trattiene nell'atrio lato Hachijō, fuma una sigaretta nello spazio fumatori, controlla il cellulare
- **21:17**: sale al 3° piano con la scala mobile lato Hachijō
- **21:18**: entra nel bagno, va al cubicolo centrale, chiude la porta (in attesa dell'incontro)
- **21:21**: Kuroda spara

## Note operative per il GM

- Il bagno è il punto di partenza investigativo. Indizi *forti*: disegno del gallo, biglietto autobus Kameoka, piuma di gallo. Indizi *deboli* ma utili: orario, cellulare, fede + amante (depistaggio temporaneo).
- La scelta del luogo da parte di Kuroda è strategica: telecamera ingresso bagno **guasta dal 9/02** (segnalazione pubblica, ricambio in arrivo). Hayashi ha fatto una **ricognizione preventiva** del bagno il 10/02 per scegliere il punto adatto e ha notato il cartello di guasto: niente complice interno, è un'opportunità casuale colta al volo. **Non aprire sottotrame** su questo: i PG che vogliono indagare il guasto trovano solo il rapporto di manutenzione standard JR.
- Lasciare ai PG margine per scoprire la **telecamera del corridoio**: dà una descrizione fisica utile dell'esecutore senza rivelare il volto.

---

## Collegamenti

- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Watanabe_Toshio_Testimone|Watanabe Toshio — Testimone]]
- [[PNG_Kuroda_Ryo_Esecutore|Kuroda Ryō — Esecutore]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]

---

# Kyoto University Hospital — Ospedale ricovero Ōkubo

> Ospedale universitario dove Ōkubo Kenji viene ricoverato dopo il tentato omicidio del 14/02. Sede del secondo attentato del 17/02.

## Dati
| Campo | Valore |
|---|---|
| Nome | Kyoto University Hospital (京都大学医学部附属病院) |
| Indirizzo | Sakyō-ku, Kyoto, vicino al campus universitario |
| Tipologia | Ospedale universitario pubblico |
| Anno fondazione | 1899 |
| Capienza | ~1.000 posti letto |

## Descrizione
Complesso ospedaliero di grandi dimensioni, più edifici, struttura confusa per chi non lo conosce. Corridoi lunghi, ingressi multipli, accessi di servizio non sempre presidiati. Personale numeroso (medici, infermieri, fattorini, addetti alle pulizie, volontari): facile entrare con uniforme adatta senza essere notati.

## Ricovero Ōkubo
- **Reparto**: Chirurgia Generale
- **Stanza**: 4° piano, stanza 412 (singola, con piantonamento)
- Lesioni: ferita da arma da fuoco alla spalla destra, frattura della scapola, perdita di sangue moderata, condizioni stabili dal 15/02
- Prognosi: dimissioni previste per il 21-22/02

## Sicurezza
- **1 agente** della Polizia Prefetturale di guardia 24h davanti alla porta della stanza
- Cambio turno ogni 8 ore (06:00 / 14:00 / 22:00) — momenti di vulnerabilità
- Controllo accessi: tutti i visitatori devono identificarsi all'agente
- **Punto debole**: l'accesso di servizio per il personale ospedaliero non è controllato dall'agente. Personale medico, infermieri e addetti pulizie passano liberamente.

## Tentato omicidio del 17/02

### Modus operandi previsto
- Kuroda si traveste da **fattorino di un servizio di catering ospedaliero** (uniforme rubata, carrello porta-vassoi)
- Si presenta nel pomeriggio del 17/02 (orario pasto, ore 18:00 ca)
- Passa il controllo dell'agente con la scusa del pasto da consegnare
- Tenta di iniettare veleno nella flebo di Ōkubo (siringa con potassio cloruro o farmaco letale procurato tramite contatto interno)

### Esiti possibili
- **Successo Kuroda**: Ōkubo muore, scoperto come sabotaggio cardiaco solo all'autopsia
- **Successo PG**: Kuroda viene smascherato grazie a vigilanza extra, scappa o viene catturato
- **Compromesso**: Kuroda riesce a iniettare ma Ōkubo viene salvato in extremis

## Persone presenti
- Personale medico (vario): **Dr. Sasaki Kōichi (chirurgo curante di Ōkubo; non è Sasaki Hideo, il prestanome)**, **infermiera capo Tanabe Yumi**
- **Istituto di Medicina Legale** dell'Università (stesso complesso): il **Dr. Yagi Kenta** (51) firma le autopsie di Tachibana (vittima) e Murakami (veterinario); ci lavora anche la **dott.ssa Morita Akiko**, l'Enja di Fujita
- Agente di polizia in turno
- Possibili visitatori autorizzati: avvocato di Ōkubo, ex moglie (chiamata d'emergenza ma non viene da Nagoya), nessun parente diretto a Kyoto
- Il **Dr. Sasaki Kōichi (chirurgo)** è cooperativo con i PG ma non ha tempo per ricostruzioni dettagliate

## Indagine
- I PG hanno accesso facilitato se possono qualificarsi come investigatori coordinati con la Polizia Prefetturale
- Possono **interrogare Ōkubo** dal 15/02 in poi (cosciente, parlante)
- Ottengono progressivamente informazioni: identità di Saitō, descrizione di Kuroda, posizione del capannone
- Possono **proteggere attivamente** la stanza 412 il 17/02 con presidio doppio o triplo

## Note operative GM
- L'ospedale è un **luogo di pressione narrativa**: i PG sanno che Ōkubo è in pericolo, devono bilanciare l'estrazione di informazioni con la protezione
- Il Nitōgun ha **un contatto interno**? Possibile sottotrama: un addetto alle pulizie che Hayashi ha già "comprato" per ¥300.000 per fornire informazioni sulla stanza
- Possibile twist: l'attentato del 17/02 può essere **sventato dai PG** ma costare la vita all'agente di guardia (drammaticità)

## Al tavolo — chi lavora intorno alla stanza 412

- **Dr. Sasaki Kōichi** (chirurgo curante di Ōkubo; non è Sasaki Hideo, il prestanome): 45 anni, alto, camice sbottonato, sempre di corsa tra due sale. Cooperativo, senza tempo: dà prognosi e orari («cosciente dal 15, dimissioni il 21-22») e una frase sola in più — *«il paziente ha chiesto che non venisse avvisato nessuno. Nessuno.»* En: +1 con Sato (gli parla da tecnico a tecnico), 0 con gli altri; −1 con chi lo trattiene più di cinque minuti
- **Infermiera capo Tanabe Yumi** (50): precisa, severa, tiene il registro degli accessi al piano. È lei che sa come funziona il catering: *«I pasti arrivano alle 18:00 dal montacarichi di servizio, i fattorini cambiano ogni settimana, nessuno li controlla: sono del catering, hanno la divisa.»* Chi la ascolta il 15 o il 16/02 ha già capito da dove entrerà Kuroda. En: +1 con Fujita, +1 con chi le chiede il registro invece di pretenderlo
- **Il piantone** (agente semplice della Prefetturale, 24 anni, turni di 8 ore): controlla i documenti dei visitatori e lascia passare «il catering» senza pensarci. Non è colpa sua: nessuno gli ha detto niente. Se un PG gli spiega cosa cercare, il 17/02 ferma il carrello — e Kuroda scappa dalle scale di servizio. Se il presidio è doppio (cambio turno delle 14:00 coperto), Kuroda non arriva alla stanza
- **Il possibile contatto interno** (un addetto alle pulizie comprato da Hayashi per ¥300.000, opzione della sezione *Note operative*): se esiste, è lui che ha rubato la divisa e il carrello il 16/02 sera. Fermato dopo il 17/02, cede subito: ha visto Hayashi una volta, in un caffè di Sakyō

## Collegamenti
- [[PNG_Okubo_Kenji_Prestanome_Consapevole|Ōkubo Kenji — Prestanome consapevole]]
- [[PNG_Kuroda_Ryo_Esecutore|Kuroda Ryō — Esecutore]]
- [[Luogo_Polizia_Prefetturale_Kyoto|Polizia Prefetturale di Kyoto]]

---

# Locale Kōrin — Bar-ristorante a Gion

> Locale di proprietà ufficiale di Tachibana Eiji (la vittima). Copertura per la sua attività di allibratore.

## Dati
| Campo | Valore |
|---|---|
| Nome | Bar-ristorante Kōrin (光琳) |
| Indirizzo | Hanamikoji-dōri, Gion, Higashiyama-ku, Kyoto |
| Tipologia | Locale tradizionale con cucina giapponese e bar al primo piano |
| Apertura | 1989 |
| Orari | 18:00–02:00, chiuso il martedì |
| Capienza | 24 coperti + 8 al bancone bar |

## Descrizione
Edificio tradizionale a due piani in legno, tipico di Gion. Insegna sobria con calligrafia "光琳". Al piano terra: ristorante kappo style con bancone. Al primo piano: salottini privati (*zashiki*) per clienti riservati. Interni curati, vasi ikebana, illuminazione bassa. Frequentato da uomini d'affari, politici locali, alcune geisha del distretto come ospiti.

## Personale
- **Nishimura Tatsuya** (36) — cameriere senior, prestanome ignaro [[PNG_Nishimura_Tatsuya_Prestanome_Ignaro|PNG_Nishimura_Tatsuya]]
- **Kobayashi Yumiko** (28) — cameriera, ignara di tutto. Vivace, parla volentieri, ha avvisato lei Nishimura la mattina del 12/02. Dice: *«Il padrone era gentile, puntuale. La signora giovane, "Mari", cenava qui ogni tanto, al piano di sopra, e lui scendeva a salutarla. La domenica mattina lui veniva presto, da solo, e si chiudeva nell'ufficio un'ora: dicevo che faceva i conti»* (è il secondo registro). En +1 con chi le chiede del padrone senza giudicarlo
- **Chef Tanigawa Masaru** (52) — chef di cucina, ignaro (non è il bigliettaio Tanigawa della stazione). Taciturno, leale al nome del locale: *«Nove anni. Mai un cliente che non fosse un cliente. Se aveva altri affari, non li faceva qui, e questo lo rispetto»*. En 0; +1 con Yamamoto (il grado)
- **Aiba Kenta** (24) — barista al primo piano, ignaro. *«Il primo piano lo servivo io: uomini d'affari, qualche politico, gente che parlava piano. Niente scommesse, mai sentito»*. En +1 con Sato (coetanei)

Tutti e tre collaborano dopo la morte del datore di lavoro; nessuno dei tre mente. Dal 20/02, con Setsuko proprietaria e Nishimura gestore, il locale riapre.

## Indizi rilevanti
- Registro contabile in regola (al piano terra, ufficio retro cucina)
- **Secondo registro** nascosto in una cassetta dietro un pannello del controsoffitto dell'ufficio (movimenti scommesse in codice — Tachibana (vittima) lo aggiornava ogni domenica mattina)
- Telefono fisso del locale: appare nel registro chiamate del cellulare della vittima
- Nessun cliente del giro scommesse veniva mai qui (Tachibana (vittima) separava le attività)

## Indagine
- Setsuko (moglie) eredita formalmente il locale
- Il personale collabora dopo la morte del datore di lavoro
- I PG possono accedere se hanno mandato o autorizzazione di Setsuko
- Il **secondo registro** è la prova decisiva per ricostruire i movimenti finanziari di Tachibana (vittima)

## Note operative GM
- Visitabile dal 12/02 in poi
- Punto di partenza naturale per l'indagine sul lato pubblico della vittima
- Permette il contatto con Nishimura (utile per arrivare al capannone)

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Nishimura_Tatsuya_Prestanome_Ignaro|Nishimura Tatsuya — Prestanome ignaro]]
- [[PNG_Tachibana_Setsuko_Moglie|Tachibana Setsuko — Moglie]]

---

# Polizia Prefetturale di Kyoto — la Centrale

> Quartier Generale della Kyoto Prefectural Police (京都府警察本部). Sede della **Sezione Omicidi** (捜査一課, Sōsa Ikka) dove lavorano i PG, sotto il commissario **Taniguchi Osamu**. Scheda dell'ente e dei PNG fissi: `../Materiale/Scheda_Distretto.md` e `../png notevoli/`.

## Dati
| Campo | Valore |
|---|---|
| Nome | Kyoto Prefectural Police HQ (京都府警察本部) |
| Indirizzo | Via Kawaramachi 85, Kyoto |
| Tipologia | Quartier Generale Polizia Prefetturale |
| Personale totale | ~6.500 agenti su tutta la prefettura |
| Giurisdizione | Kyoto-fu (incluse Kameoka, Maizuru, Uji, ecc.) |

## Descrizione
Edificio anni '70 di 8 piani in cemento armato, ingresso principale con bandiera del Giappone e bandiera della prefettura. Hall di accoglienza al piano terra con sportelli pubblici e sala stampa (frequente affluenza di giornalisti del Kyoto Shimbun e dei tabloid nazionali). **Sezione Omicidi al 2° piano**: l'ufficio della squadra — scrivanie in metallo grigio, neon, faldoni, un telefono ogni due scrivanie. **Laboratorio Kanshiki-ka nel seminterrato** (Ito Daisuke); archivi al −1° (Gonda). Sala briefing centralizzata al 5° piano.

## I PNG fissi della serie in questo caso
| Chi | Ruolo nel caso |
|---|---|
| **Taniguchi Osamu (commissario, capo dei PG)**, 56, 警視 Keishi | Assegna il caso il 12/02, riceve i rapporti e i memo per le altre sezioni, chiede i mandati al PM. Pretende prove, non intuizioni: *«Sedetevi. Raccontate.»* |
| **Yamada Tetsuo (sergente accompagnatore dei PG)**, 35 | Sulla scena dalle 22:35 dell'11/02; guida, convoca i testimoni (Watanabe Toshio (testimone), Sasaki Hideo e Nishimura Tatsuya (prestanome ignari)), porta i tabulati e gli esiti delle altre squadre |
| **Ito Daisuke (responsabile Kanshiki-ka, la scientifica)**, 52 | Rilievi del bagno (impronta Asics, fori sulla porta, il bossolo sotto l'orinatoio), reperti della vittima, analisi della xilazina, balistica finale sulla Makarov (laboratorio esterno, 48-72 ore) |
| **Watanabe Hideo (procuratore)**, 51 | Ottiene dal giudice i mandati: perquisizioni (Fushimi, casa Hayashi, casa Kuroda), tabulati (NTT DoCoMo, telefono privato di Inagaki), sequestro documenti bancari (Murakami (veterinario), Kameoka Nōji KK). Mai di persona: tramite Taniguchi, per fax |
| **Gonda Susumu (archivista)** | L'archivio storico sui gruppi criminali di Kameoka — una delle vie per dare un nome al gallo con due speroni |

## Altri uffici che entrano nel caso
| Sezione | Piano | Referente | Funzione |
|---|---|---|---|
| **Crimine Organizzato** (Sōshiki Hanzai) | 4° | **Tachibana Mitsuru (ispettore, Crimine Organizzato — parente lontano della vittima, omonimo di cognome)**, 39 | Contesto sul Nitōgun e i gruppi simili di Kyoto-fu; coordina il blitz del 22/02 |
| **Affari Interni** (Kansatsu) | 6° | Sovrintendente **Ogura Naomi** (48), riservata, professionale | Riceve la segnalazione dei PG su Inagaki: tabulati, sorveglianza, movimenti bancari (5-7 giorni); emerge anche Yamaguchi |
| **Frodi** e **Frodi Societarie** (Chiteki Hanzai) | 3° | — | Truffa del gallo; catena societaria Kameoka Nōji KK (5-10 giorni) |
| **Sezione Armi** (Jūki) | 2° | — | Tokarev di Ōkubo, arsenale della villa |
| **Polizia Tributaria** (Kokuzei) | edificio separato | — | Tachibana (vittima)/Kōrin, Murakami (veterinario)/Lake Biwa (2-3 settimane) |
| **Medicina Legale** | Istituto dell'Università, al Kyoto University Hospital | Dr. **Yagi Kenta** (51), responsabile autopsie | Referti di Tachibana (12-13/02) e Murakami (14/02); nello stesso istituto lavora la dott.ssa Morita Akiko, Enja di Fujita |

## Briefing iniziale (12/02 ore 08:00)
La scena è in `Inizio - Incarico.md`. Materiali consegnati: verbale del Kōban della Kyoto Station, foto della scena (bagno, porta, disegno col sangue, impronta), prima testimonianza di Watanabe Toshio (testimone), reperti raccolti dalla Kanshiki-ka (cellulare, taccuino, contenuto delle tasche, biglietti dell'autobus).

## Coordinamento delegabili
I PG **non sono soli**: per ogni reato fuori dalla loro competenza scrivono un memo a Taniguchi, che lo gira alla sezione competente; gli esiti tornano come **note narrative** (tabella in `Storia Completa.md`).

## Climax operativo (22/02)
Blitz al capannone col Crimine Organizzato, **esclusa la Polizia di Kameoka** per via di Inagaki: squadra speciale di ~30 uomini, briefing tattico al 5° piano la mattina del 22/02.

## Indagine
- I PG vivono qui operativamente: ufficio al 2° piano, archivio criminale prefetturale, registro veicoli, schedari fotografici, banche dati telefoniche (tabulati con ordine del PM)
- Ogni richiesta di mandato (perquisizione, tabulati, sequestro, arresto) passa da **Taniguchi → Watanabe Hideo (procuratore) → giudice**: tempi standard 24-72 h (tiro del distretto: `../Materiale/Scheda_Distretto.md`)

## Note operative GM
- La Centrale è il **punto di partenza giornaliero** dei PG (riunione mattutina con Taniguchi, aggiornamenti)
- Taniguchi è una **leva narrativa**: pressione sui tempi, richieste di rapporti, rifiuto di chiedere un mandato se le prove sono deboli → stimolo a triangolare meglio
- L'omonimia con Tachibana Mitsuru (ispettore) può creare scene di colore (i PG che incontrano «un altro Tachibana» il giorno dopo l'omicidio)

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Sergente_Inagaki_Poliziotto_Corrotto|Sergente Inagaki — Poliziotto corrotto]]
- [[Luogo_Stazione_Polizia_Kameoka|Stazione di Polizia di Kameoka]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]
- [[Luogo_Kyoto_University_Hospital|Kyoto University Hospital]]

---

# Ristorante Kameoka-tei — Copertura comunicativa

> Ristorante reale, attivo, frequentato. Pubblica gli annunci sul Kyoto Shimbun che codificano date e combattimenti del capannone. Gestione tramite testa di legno; dietro c'è il Nitōgun.

## Dati
| Campo | Valore |
|---|---|
| Nome | Kameoka-tei (亀岡亭) |
| Indirizzo | Honmachi, Kameoka-shi, Kyoto-fu, in pieno centro |
| Tipologia | Ristorante tradizionale di soba e tempura |
| Apertura | 1978 (gestione corrente dal 1992) |
| Orari | 11:30–14:30 / 17:30–21:30, chiuso lunedì |
| Capienza | 40 coperti |
| Reputazione | Buona, recensioni positive sui giornali locali |

## Descrizione
Edificio tradizionale di 2 piani in legno scuro, insegna noren blu all'ingresso, lanterne rosse. Interno ordinato con tatami al primo piano e bancone al piano terra. Cucina visibile. Frequentato da impiegati locali a pranzo, famiglie e coppie a cena. **Niente di sospetto a vista**.

## Personale
- **Tachi Yūichirō** (62) — proprietario ufficiale e testa di legno. Ha problemi di salute (cardiopatia), ricoperto di debiti negli anni '90, accettò il "rilevamento" da parte di un investitore (società di Saitō) in cambio di mantenimento del ruolo nominale e stipendio. Nominalmente legge, materialmente non controlla nulla.
- **Tachi Reiko** (58) — moglie di Yūichirō, lavora alla cassa, ignara dei legami criminali
- **Chef Endō Hiroshi** (45) — cuoco capo, ignaro
- **2 cameriere** (turnistica): Suzuki (cameriera; non è Suzuki Yui, la fidanzata di Hayashi) e Hayama (cameriera; non è il Sig. Hayama, vicino di Ōkubo) — ignare

## Catena di comando reale
- Proprietà formale: ditta individuale Tachi Yūichirō
- Proprietà sostanziale (tramite mutuo "amico" mai realmente da rimborsare): **Kameoka Nōji KK** (società di Saitō)
- Decisioni operative: Saitō tramite Hayashi, una volta al mese

## Sistema annunci sul Kyoto Shimbun
- Hayashi acquista lo spazio pubblicitario tramite agenzia di Osaka **Sakura Kōkoku**
- L'agenzia è ignara: per loro è un cliente normale
- Lo spazio appare nella sezione **"Annunci ristorazione"** del Kyoto Shimbun, ogni mese
- L'annuncio mostra:
  - Foto del ristorante (sempre la stessa)
  - "Promozione speciale" con data (es. "Promozione del 22 febbraio 1998") → giorno del combattimento
  - "Menu del giorno scontato" con 7 piatti (ognuno con un nome poetico) → 7 combattimenti, ogni nome è il **codice del gallo** in gara
  - Sconto in % per piatto → quote di partenza scommesse
- Chi non è del giro vede solo un menu promozionale

## Indagine
- I PG che si presentano come clienti: nulla di sospetto
- I PG che chiedono al personale: nessuno sa di scommesse o galli
- I PG che indagano sui registri commerciali (Camera di Commercio Kameoka): scoprono **catena societaria sospetta** che porta a Kameoka Nōji KK e poi a Saitō
- I PG che intervistano Tachi Yūichirō: l'uomo è spaventato, evita di parlare, dice solo "*sono solo il gestore*", possibile crollo se pressato (chiave: la moglie Tachi Reiko è completamente innocente — minacciare il suo coinvolgimento legale lo fa cedere)

## Indizi rilevanti
- Documenti societari fasulli (Tachi Yūichirō può fornirli se collabora)
- Ricevute di pagamento per gli annunci sul Kyoto Shimbun (intestate a Kameoka Nōji KK)
- Telefono fisso del ristorante: registra chiamate occasionali a numeri del Nitōgun (registri telefonici accessibili tramite mandato)

## Note operative GM
- Visitabile in qualsiasi momento
- Il **collegamento giornale ↔ capannone** è la chiave decifrativa fondamentale dell'avventura
- I PG ci arrivano dal giornale trovato addosso a Tachibana (vittima) e nei suoi archivi
- Effetto: "scoperta del codice di comunicazione" — momento *eureka* del gioco
- Tachi Yūichirō **cede quando capisce che la moglie Tachi Reiko rischia** — funziona sia come minaccia sia come rassicurazione («la teniamo fuori, se collabora»): allora consegna la lista degli annunci degli ultimi 12 mesi e i documenti societari

## Al tavolo — Tachi Yūichirō (testa di legno) e Tachi Reiko

**Come si riconoscono**: Tachi Yūichirō, 62, piccolo e magro, il colorito grigio del cardiopatico, una scatolina di nitroglicerina nella tasca del gilet, la cravatta allacciata anche in cucina; guarda la porta ogni volta che si apre. Tachi Reiko, 58, robusta, vivace, alla cassa, saluta i clienti per nome e risponde al posto del marito.

**Come si comporta** Yūichirō: spaventato, evita, «sono solo il gestore», suda. Se i PG vengono da clienti: cortesia perfetta. Se mostrano il tesserino: dieci minuti dopo che se ne sono andati telefona a Hayashi **dal telefono del ristorante** (i tabulati lo mostrano). Si apre solo quando capisce che Reiko rischia — o che i PG possono tenerla fuori.

| Data | Dove era | Come si verifica |
|---|---|---|
| 11/02 sera | Al ristorante, servizio 17:30–21:30 (mercoledì: aperto) | Reiko, lo chef Endō, le due cameriere |
| 13, 14, 17/02 | Al ristorante; il 17/02 serve la cena a Hayashi (18:30–21:00) | Il personale |

**D-16 — Deposizione dopo il crollo** (Centrale o retro del ristorante; verbalizza Yamada)
> «Tachi Yūichirō, sessantadue anni. Il Kameoka-tei è mio dal 1978. Nel '92 avevo debiti con tre banche e uno strozzino; un signore molto educato, il signor Saitō, mi ha "aiutato": la sua società ha pagato tutto e io sono rimasto il proprietario sulla carta, con uno stipendio. Da allora una volta al mese viene il signor Hayashi e mi dice cosa scrivere nell'annuncio sul giornale: la data della "promozione", i sette piatti con quei nomi strani, gli sconti. Non è il mio menu. Non ho mai chiesto. Le ricevute dell'agenzia di Osaka sono intestate alla Kameoka Nōji, ce le ho tutte, dodici mesi, ve le do. Il telefono del ristorante lo usava lui, la sera, per chiamare dei numeri che non conosco. Di galli e di scommesse ho sentito parlare e ho fatto finta di niente: ho il cuore malato e una moglie che non sa niente. Reiko non c'entra. Scrivetelo prima di tutto il resto: Reiko non c'entra.»

Omette niente. Prima del crollo: «sono solo il gestore», e basta.

**En**: Yamamoto 0 · Honda −1 (lo spaventa) · Nakamura +1 (paziente) · Sato 0 · Fujita +1 (parla con Reiko, e Reiko lo convince). Con gli altri: Saitō −2 (paura e gratitudine marcia) · Hayashi −1 · Reiko **+4** · lo chef Endō +1.

**Come cambia nel tempo**: fino al 15/02 nessuno lo tocca. Se i PG lo sentono col tesserino senza farlo crollare → avvisa Hayashi entro un'ora: dal 16/02 partono gli «avvisi». Se crolla (la leva di Reiko) → consegna i 12 annunci e i documenti societari: da qui il mandato sulla Kameoka Nōji KK e la catena verso Saitō. **Ma deve restare alla cassa fino al 22/02 come se niente fosse**: se Hayashi non lo vede più al ristorante, Saitō annulla il combattimento. Reiko lo capisce prima di lui, e lo tiene in piedi. Dopo il 22/02: collaboratore di giustizia, sconto di pena, il ristorante chiude.

## Collegamenti
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]
- [[PNG_Nitogun_Banda|Nitōgun — Banda (codice annunci)]]

---

# Royal Hotel Karasuma — Hotel di lusso

> Hotel di alto livello in zona Karasuma. Tachibana (vittima) incontrava qui Aoyagi Mariko per appuntamenti di 1-2 notti. Ricevuta nella tasca della giacca della vittima.

## Dati
| Campo | Valore |
|---|---|
| Nome (fittizio per l'avventura) | Royal Hotel Karasuma |
| Indirizzo | Karasuma-Shijō, Shimogyō-ku, Kyoto (zona business) |
| Tipologia | Hotel internazionale 4 stelle, 200 camere |
| Apertura | 1985 |

## Descrizione
Edificio moderno di 12 piani, hall in marmo, ristorante al 1° piano (cucina italiana), bar al 2°, palestra al 10°. Camere standard e suite. Personale multilingue. Atmosfera anonima e professionale: ideale per appuntamenti riservati.

## Frequentazione di Tachibana
- Stanza fissa: camera matrimoniale al 7° piano, **stanza 712**
- Frequentazione: 2-3 volte al mese, sempre con Aoyagi Mariko
- Ultima visita: notti del 7-8 febbraio 1998 (ricevuta in tasca)
- Pagamento: contante o carta di credito personale di Tachibana (vittima)

## Indizi rilevanti
- Registro check-in: nome Tachibana Eiji (vittima) + accompagnatrice non registrata (prassi giapponese: solo l'intestatario firma)
- Telecamere della hall: nastri VHS conservati 30 giorni, possibile recupero immagini delle visite recenti
- Personale di front desk lo conosceva di vista, niente di sospetto
- Camera 712: già ripulita per nuovi ospiti, nessuna traccia fisica residua dopo l'8/02

## Indagine
- Accesso libero come clienti
- Mandato di perquisizione per i registri facile da ottenere
- I PG possono confermare la relazione con Mariko e ricostruire le date, ma il valore investigativo è **medio-basso** (l'amante è già nota dalle altre fonti)
- Possibile indizio collaterale: il **bar al 2° piano** ha registri di alcune cene di Tachibana (vittima) **con uomini sconosciuti**, alcuni di questi possono essere identificati come scommettitori del giro

## Note operative GM
- Visitabile in qualsiasi momento
- Utile per **confermare la dinamica della relazione** Tachibana (vittima)-Mariko
- Valore investigativo principalmente di **conferma**, non di scoperta
- Il bar al 2° piano è un dettaglio aggiuntivo opzionale per i PG che vogliono approfondire la rete sociale di Tachibana (vittima)

## Collegamenti
- [[PNG_Tachibana_Eiji_Vittima|Tachibana Eiji — Vittima]]
- [[PNG_Aoyagi_Mariko_Amante|Aoyagi Mariko — Amante]]

---

# Stazione di Polizia di Kameoka

> Polizia locale di Kameoka. Il sergente Inagaki Hiroshi opera qui ed è sul libro paga del Nitōgun. Punto di ostacolo investigativo.

## Dati
| Campo | Valore |
|---|---|
| Nome | Kameoka Keisatsu-sho (亀岡警察署) |
| Indirizzo | Kameoka centro, vicino al municipio cittadino |
| Tipologia | Stazione di Polizia distrettuale (giurisdizione: Kameoka-shi e dintorni) |
| Personale | ~80 agenti |

## Descrizione
Edificio anni '80, 3 piani, struttura in cemento armato. Reception al piano terra, uffici operativi al 1°, sezione investigativa al 2°. Bandiera del Giappone all'ingresso, cartelli di prevenzione truffe contro anziani. Atmosfera lenta, tipica di una piccola città.

## Personale chiave
- **Capo stazione**: ispettore **Tsuda Akira** (54), onesto, operativo, **non sa** della corruzione di Inagaki
- **Sergente Inagaki Hiroshi** (47): corrotto, ostacola le indagini [[PNG_Sergente_Inagaki_Poliziotto_Corrotto|PNG_Sergente_Inagaki]]
- **Agente Yamaguchi Tetsuo** (32): corrotto a livello minore, complice di Inagaki
- Altri 75 agenti: onesti, ignari

## Ruolo nell'avventura

### Quando i PG si rivolgono qui
- Ingresso al piano terra: addetto allo sportello li indirizza al sergente di turno
- Se chiedono di Kameoka rurale, capannoni dismessi, attività sospette: Inagaki si fa avanti come "esperto della zona"
- **Inagaki fornisce informazioni distorte** (vedi scheda PNG)

### Ostacoli specifici
- Mandati di perquisizione: ritardati di 24-48h
- Pattugliamenti pianificati nella zona del capannone: comunicati a Saitō tramite Inagaki
- Documentazione "smarrita" o "in archivio non accessibile"

### Come i PG smascherano la corruzione
- Comportamenti incoerenti di Inagaki notati dai PG attenti
- Confronto con la **Polizia Prefetturale di Kyoto** (sede a Kyoto città): coordinamento extra-territoriale che bypassa Kameoka
- Investigazione interna richiesta agli **Affari Interni** della Polizia Prefetturale dopo segnalazione PG

## Indagine sulla corruzione
- Ricostruzione movimenti bancari di Inagaki (richiede mandato)
- Sorveglianza della sua casa e auto: Inagaki incontra Hayashi **il primo lunedì di ogni mese** nel parcheggio di un supermercato di Kameoka; nei giorni dell'indagine si sentono per telefono (i tabulati lo mostrano) e si vedono una volta d'urgenza, il 15/02, per riferire dei PG
- **Tabulati** del telefono privato di Inagaki (con ordine del procuratore): rivelano il traffico ricorrente di chiamate col numero di Hayashi; la sorveglianza degli incontri al parcheggio fa il resto

## Note operative GM
- I PG **non possono evitare** di passare da qui se vogliono indagare formalmente nella zona
- Il primo contatto con Inagaki sembra collaborativo
- Sospetto cresce intorno al **giorno 14-15/02** (Inagaki conosce dettagli che non dovrebbe conoscere — esempio: chiede ai PG come sta Ōkubo prima che la notizia del ricovero sia pubblica)
- Smascheramento ufficiale possibile dopo coordinamento con Kyoto città

## Al tavolo — l'agente Yamaguchi e l'ispettore Tsuda

**Agente Yamaguchi Tetsuo** (32, corrotto per ¥50.000 al mese dal 1995): faccia da bravo ragazzo, sposato, due bambini, sempre un passo dietro Inagaki; guarda il sergente prima di rispondere a qualsiasi domanda. **Come si comporta**: nervoso, gentile, inutile. Preso dagli Affari Interni cede in dieci minuti, piangendo: conferma i pagamenti e le telefonate di allerta al capannone. **Il pericolo**: se Inagaki viene arrestato e lui resta libero, per paura (non per lealtà) avvisa Hayashi entro sera — e il 22/02 salta. Vanno presi insieme. En: Sato +1 (coetanei), Fujita +1 (gentile), gli altri 0. Verso Inagaki +1: «mi ha sempre protetto».

**Ispettore Tsuda Akira** (54, capo stazione, onesto): stempiato, occhiali, scrivania in ordine, orgoglioso della sua stazione. **Come si comporta**: collaborativo con Kyoto, ferito nell'orgoglio quando capisce di Inagaki — e allora è implacabile. **Attenzione**: se i PG gli parlano nel suo ufficio, al 2° piano, Inagaki lo viene a sapere dal corridoio in un'ora. La strada giusta è Taniguchi → Tsuda, fuori dalla stazione. En: Yamamoto +1 (quasi pari grado), gli altri 0; verso Inagaki, dopo: −4.

**Come cambia la stazione nel tempo**: 12–16/02 Inagaki filtra tutto; 17–20/02, con gli Affari Interni al lavoro in silenzio, niente cambia in apparenza; 21/02 l'arresto di Inagaki e Yamaguchi (lo stesso giorno, o niente); 22/02 la stazione di Kameoka è **esclusa dal blitz**, e Tsuda lo accetta a denti stretti.

## Collegamenti
- [[PNG_Sergente_Inagaki_Poliziotto_Corrotto|Sergente Inagaki — Poliziotto corrotto]]
- [[Luogo_Polizia_Prefetturale_Kyoto|Polizia Prefetturale di Kyoto]]
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]

---

# Studio veterinario Murakami — Yamashina

> Clinica veterinaria del Dr. Murakami Saburō. Aperta nel 1981. Aspetto modesto, attività in declino. Luogo dove Murakami (veterinario) curava in nero anche i galli del Nitōgun.

## Dati
| Campo | Valore |
|---|---|
| Nome | Murakami Dōbutsu Byōin (村上動物病院) |
| Indirizzo | Higashino Kitaōiwake-chō, Yamashina-ku, Kyoto |
| Tipologia | Clinica veterinaria privata |
| Apertura | 1981 |
| Orari | 9:00–13:00 / 16:00–19:00, chiuso domenica |
| Personale | Solo Murakami (assistente part-time licenziata nel 1996 per ridurre i costi) |

## Descrizione
Edificio a due piani con ingresso clinica al piano terra e abitazione di Murakami (veterinario) al piano superiore (la famiglia ci viveva fino al 1996, poi si è trasferita 200 m più in là). Insegna scolorita. Sala d'attesa piccola, ambulatorio, retrobottega con armadi farmaci, piccolo laboratorio analisi, cella frigo per farmaci, gabbia di ricovero per piccoli animali. Cortile sul retro con accesso da vicolo (utile per ingressi discreti del Nitōgun).

## Indizi rilevanti
- **Kyoto Shimbun del 9 febbraio 1998** con annuncio Ristorante Kameoka-tei (promozione del 22/02) sul ripiano della scrivania
- **¥1,5 mln in contanti** nascosti dietro l'armadio dei farmaci (compenso Tachibana (vittima))
- Registro pazienti ufficiale in regola
- **Quaderno separato** nel cassetto chiuso a chiave (chiave nel cassetto della scrivania, sotto un libro): annotazioni di "visite a domicilio" del 1997-1998 senza nome paziente, solo iniziali e codici (pazienti del Nitōgun)
- Bottiglia di **shōchū** semivuota in un cassetto basso (segnale del declino di Murakami (veterinario))
- Boccette di **xilazina** (sedativo veterinario per grandi animali) — quantitativo anomalo per la clientela ufficiale di piccoli animali. Una di queste è il sedativo usato sul gallo. **Una boccetta risulta mancante dopo il 13/02** (è quella usata da Kuroda per uccidere Murakami (veterinario) stesso)
- Estratti conto bancari nello stesso cassetto: mostrano il debito di ¥6,8 mln che si azzera tra il 28 e il 30 gennaio 1998

## Persone presenti
- Solo Murakami (veterinario) fino al 13/02
- Dopo la morte: studio chiuso, sigillato dalla polizia
- La moglie Hiroko ha accesso con permesso

## Indagine
- Accesso libero per i PG che si presentano come clienti (fino al 13/02)
- Mandato di perquisizione facile dopo la morte
- La chiave della scrivania può essere trovata facilmente — i PG che cercano bene scoprono il quaderno separato

## Scena del secondo crimine — 13 febbraio 1998

### Dinamica
- **Pomeriggio del 13/02, ~14:00**: studio chiuso per pausa pranzo (orario di apertura pomeridiano: 16:00). Murakami (veterinario) è solo nel retrobottega.
- Kuroda entra dal **vicolo retro** (la porta sul cortile è chiusa con catenaccio standard, forzato senza scasso evidente — chiave duplicata o sbloccato dall'interno con pretesto)
- Lo immobilizza, gli inietta **una dose letale di xilazina** prelevata da una boccetta dello stesso studio (il sedativo che Murakami (veterinario) usava sui galli — chiusura simbolica voluta dal Nitōgun)
- Decesso entro pochi minuti per arresto cardiocircolatorio
- Kuroda esce dal vicolo retro, nessuna telecamera nei pressi

### Stato del corpo
- Murakami (veterinario) trovato riverso a terra nel retrobottega, accanto al tavolo di preparazione
- Un foro da iniezione **al collo** (lato destro), poco visibile a occhio nudo
- Nessun segno di colluttazione, nessuna ferita esterna
- Boccetta di xilazina vuota e siringa **lasciate sul tavolo** in modo casuale (suggeriscono suicidio o overdose accidentale a un osservatore frettoloso)

### Ritrovamento
- **Hiroko** (moglie) passa allo studio verso le **16:30** prima di rientrare a casa, attesa la riapertura pomeridiana
- Trova il corpo, chiama l'ambulanza in stato di shock
- L'ambulanza arriva alle 16:48, polizia di Yamashina alle 17:05

### Aspetto iniziale ambiguo
- Sull'ambulanza e nel primo verbale si ipotizza **suicidio** per cause economiche (il debito, il declino, lo shōchū)
- L'**autopsia** del 14/02 mattina rivela:
  - Concentrazione plasmatica di xilazina **incompatibile** con autosomministrazione (dose 5x letale, mai vista in casi accidentali)
  - Ematoma minimo al collo da contenimento manuale
  - Conclusione: **omicidio mascherato da suicidio**
- I PG ricevono il referto autoptico la sera del 14/02 (se Murakami (veterinario) è già nel loro radar perché collegato al taccuino di Tachibana (vittima), l'autopsia diventa **scattante** verso la pista Nitōgun)

## Note operative GM
- Il **quaderno separato** è la prova che Murakami (veterinario) trattava clienti irregolari
- Le **boccette di xilazina** in eccesso sono la prova materiale del sedativo
- Visita prima del 13/02: possibile interrogatorio diretto di Murakami (vedi PNG)
- Visita dopo il 13/02: **scena del secondo crimine** — sigillata dalla polizia, accessibile ai PG con autorizzazione
- Il fatto che il sedativo usato sia stato **prelevato dallo studio stesso** è un indizio simbolico forte: chi ha ucciso conosceva il significato di "sedare il gallo" (il Nitōgun)

## Collegamenti
- [[PNG_Murakami_Saburo_Veterinario|Dr. Murakami Saburō — Veterinario]]
- [[PNG_Famiglia_Murakami|Famiglia Murakami]]
- [[Luogo_Casa_Murakami_Yamashina|Casa Murakami — Yamashina]]

---

# Villa di Saitō Gorō — Kameoka

> Residenza privata del capo del Nitōgun. Apparenza rispettabile di un imprenditore in pensione. Dietro: sede operativa nascosta.

## Dati
| Campo | Valore |
|---|---|
| Indirizzo | Periferia est di Kameoka, zona collinare residenziale |
| Tipologia | Villa moderna a 2 piani in stile semitradizionale |
| Proprietà ufficiale | Intestata a **Kameoka Nōji KK** (società di Saitō) |
| Anno costruzione | 1989 |
| Superficie totale | 320 m² su un terreno di 1.500 m² |

## Descrizione
Villa elegante, recinto in muratura alto 2,5 m, cancello automatico in metallo nero. Telecamere all'ingresso e sul perimetro (impianto di sorveglianza professionale). Giardino curato in stile giapponese: laghetto con carpe koi, pini ornamentali, lanterne in pietra. Casa principale con tetto in tegole nere, ingresso *genkan* in pietra, interni misti tradizionale-occidentale (tatami al piano terra, mobili occidentali al primo piano). Sala studio personale di Saitō al primo piano. Cantina vini (occidentali). Garage per 2 auto: **Mercedes-Benz S-Class** nera e **Toyota Century** bianca.

## Persone presenti
- **Saitō Gorō** (51) — capo
- **Saitō Mieko** (47) — moglie, **non coinvolta**, donna tradizionale dedita alla casa, ignara della reale natura delle attività del marito
- **Una domestica anziana**, signora **Mori Yasuko (domestica di casa Saitō; non è Mori Sachiko, l'addetta alle pulizie della stazione)**, 68, part-time, ignara di tutto
- Saitō Hiroto (28, figlio) vive a Tokyo, ignaro

## Sicurezza
- Telecamere perimetrali (registrazione 7 giorni)
- 2 cani da guardia (akita, addestrati) — in gioco (v3.1): comparsa con Presenza 6 e Ki 6, attaccano con la Lotta (morso: danno 2), Ukemi su Pazienza; un colpo di keibō o la voce del padrone li ferma
- Allarme di sicurezza professionale (collegato a società di vigilanza)
- **Niente uomini armati visibili** — Saitō tiene apparenze di rispettabilità
- In realtà: **panico room** in cantina con accesso nascosto dietro la cantina vini, contiene scorte, armi e contante per emergenze

## Indizi rilevanti
- **Studio personale** al primo piano: porta chiusa a chiave
  - Scrivania ordinata, libri di storia militare, calligrafie, agenda formale (in regola)
  - Cassetto chiuso a chiave: niente di compromettente (Saitō non tiene documenti illegali in casa)
- **Cantina vini**: bottiglie pregiate, parete sul fondo apre alla **panic room**:
  - 2 pistole Beretta 92FS illegali
  - ¥40 mln in contanti
  - 2 lingotti d'oro
  - Quaderno cifrato con codici di sicurezza dei conti esteri (Hong Kong)
  - **NON ci sono documenti che lo collegano direttamente agli omicidi** — Saitō è prudente
- Garage: niente di sospetto

## Indagine
- **Mandato di perquisizione difficilissimo** da ottenere senza prove preliminari forti
- Accesso autorizzato dopo arresto (se i PG riescono a incastrarlo)
- La domestica Mori Yasuko può fornire informazioni di routine ma non sa nulla di criminale
- La moglie Mieko collabora se necessario, ma sotto shock totale
- **Telecamere perimetrali**: archivio di 7 giorni utile per ricostruire visite di Hayashi e Kuroda

## Note operative GM
- La villa è **inaccessibile per la maggior parte dell'avventura**: Saitō è intoccabile finché non si crea il quadro accusatorio
- Rappresenta il **simbolo dell'impunità criminale di alto livello**
- Possibile climax post-arresto: perquisizione finale, scoperta della panic room
- **Frase d'effetto** quando i PG suonano al cancello: tramite citofono, voce calma di Saitō *"Ispettori? Vi prego, accomodatevi. Ho appena preparato del tè."*

## Collegamenti
- [[PNG_Saito_Goro_Capo_Nitogun|Saitō Gorō — Capo Nitōgun]]
- [[Luogo_Capannone_Kameoka|Capannone Kameoka]]
- [[PNG_Hayashi_Tomoki_Logistica_Nitogun|Hayashi Tomoki — Logistica Nitōgun]]


====================================================================================================

# PARTE 5 — HANDOUT: TESTO INTEGRALE (37 documenti)

> Ogni handout sta in una sola pagina A4. Qui sotto solo il testo.


---

## HANDOUT · H-01_Rapporto_Koban

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kōban della Stazione**
京 都 府 警 察 京都駅前交番

### RAPPORTO DI PRIMO INTERVENTO
*Trasmesso alla Sezione Omicidi — 12/02/1998 ore 01:40*

- **Protocollo**: KB-98/0211-17
- **Data**: 11 febbraio 1998
- **Luogo**: Kyoto Station, 3° piano, lato Hachijō
- **Ora segnalazione**: 22:05
- **Redatto da**: Agente Harada Kōhei
- **Pattuglia**: 22:08

**Segnalazione**
Alle 22:05 si presenta al Kōban un uomo in evidente stato di shock, che si qualifica come Watanabe Toshio, 31 anni, impiegato, residente a Yamashina. Riferisce di essere uscito pochi minuti prima dal bagno maschile del 3° piano (corridoio sud, accanto agli uffici della direzione di stazione) e di avere udito «tre spari» provenire dal cubicolo accanto al proprio, circa quaranta minuti prima. Dichiara di non essere uscito per paura. Riferisce la presenza di sangue sul pavimento. Prima di rendere la dichiarazione ha rigettato nell'antibagno.

**Intervento**
Alle 22:08 la pattuglia raggiunge il bagno. La porta del cubicolo centrale (uno dei tre) presenta tre fori ravvicinati all'altezza del torace di un uomo in piedi. Sotto la porta, tracce ematiche in via di essiccazione. Aperta la porta con chiave di servizio della stazione, si rinviene un uomo in posizione semireclinata, schiena contro la parete, privo di vita. Nessun segno di colluttazione. Pantaloni allacciati: il soggetto non stava utilizzando il servizio.
Accertato il decesso, l'area viene transennata dall'imbocco del corridoio sud. Sospeso l'accesso al 3° piano lato Hachijō. Alle 22:35 giungono la Kanshiki-ka (dott. Ito Daisuke) e l'agente Yamada Tetsuo per la Sezione Omicidi, che assumono la direzione dei rilievi.

**Sommarie informazioni raccolte sul posto**
Mori Sachiko, 62 anni, addetta alle pulizie della stazione (dichiara di sentire poco dall'orecchio sinistro): «Ho pulito il bagno alle otto e mezza, era vuoto, i cestini vuoti. Ho passato lo straccio vicino agli orinatoi, restava umido. Il cartello della telecamera c'era da lunedì. Non ho visto nessuno di strano: la sera della festa c'era poca gente al terzo piano.»
Tanigawa, 40 anni, bigliettaio al varco Shinkansen lato Hachijō: «Verso le nove e ventitré un uomo con una giacca scura e un berretto è passato davanti allo sportello, di fretta ma senza correre, verso le scale mobili. Ho notato solo che non aveva bagagli, e alla stazione, a quell'ora, tutti ne hanno.»

**Annotazioni**

- La telecamera posta all'ingresso del bagno risulta fuori servizio dal 9 febbraio (guasto segnalato alla direzione di stazione, cartello esposto, ricambio in ordine).
- Nessuna arma rinvenuta sul posto. Nessun bossolo rinvenuto nel corso del primo esame visivo.
- Il portafoglio della vittima risulta presente e contenente denaro: si esclude in via preliminare la rapina.
- Il teste Watanabe è stato accompagnato al proprio domicilio alle 00:30 a cura dell'agente Yamada.
L'Agente redattore — Harada Kōhei
Visto: il Capoposto

---

## HANDOUT · H-01b_Foto_Porta_Cubicolo

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kanshiki-ka**
京 都 府 警 察 鑑 識 課

### ALLEGATO FOTOGRAFICO — SCENA
*Porta del cubicolo centrale, bagno maschile 3° piano*

- **Fotogramma**: KB-98/0211-17, foto 1
- **Data**: 11/02/1998, ore 23:03
- **Luogo**: Kyoto Station, 3° piano lato Hachijō
- **Operatore**: Kanshiki-ka

`[FOTOGRAFIA: 3ProiettiliPorta.png]`

Fotografia n. 1 — porta in lamiera verniciata, lato esterno. I tre fori d'ingresso sono compresi in un'area di circa 11 cm, all'altezza del torace di un uomo in piedi.
La disposizione ravvicinata dei fori e l'assenza di affumicatura sulla cute della vittima (cfr. referto autoptico) indicano colpi esplosi a breve distanza dal pannello, in rapida successione, da chi conosceva la posizione del bersaglio dietro la porta chiusa.
Il rilevatore — Kanshiki-ka
Il responsabile — Ito Daisuke

---

## HANDOUT · H-02_Verbale_Reperti

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kanshiki-ka (Polizia Scientifica)**
京 都 府 警 察 鑑 識 課

### VERBALE DI REPERTAMENTO
*Effetti personali rinvenuti sulla persona della vittima*

- **Protocollo**: KS-98/0212-04
- **Repertazione**: 12/02/1998, ore 00:15–02:40
- **Luogo**: Kyoto Station, bagno 3° piano
- **Responsabile**: Ito Daisuke
- **Vittima**: Tachibana Eiji, 47
- **Reperti**: n. 24 voci

**A — Sulla persona**

| N. | Reperto | Annotazione |
|---|---|---|
| 01 | Portafoglio in pelle intrecciata, marca Bottega Veneta | Contiene ¥180.000 in tagli da ¥10.000 |
| 02 | Patente di guida · Carta di credito JCB | Conto appoggiato: Sanwa Bank |
| 03 | Tessera socio «Club Aoyagi» n. 0087 | Locale in Kiyamachi-dōri |
| 04 | Biglietto da visita con fotografia di hostess | Nome d'arte «Mari», Club Aoyagi |
| 05 | Fotografia polaroid, piegata in quattro | Donna in kimono, di spalle, davanti a un torii |
| 06 | Telefono cellulare NTT DoCoMo «mova» | Rubrica vuota. Registro: 10 ultime chiamate |
| 07 | Quotidiano Kyoto Shimbun del 9/02/1998 | Piegato in quattro, tasca esterna |
| 08 | Taccuino tascabile nero, copertina in tela cerata, senza marchio | Annotazioni in codice. Pagine precedenti asportate |
| 09 | Due biglietti di sola andata Kyoto Kōtsū, ¥900 cad. | Kyoto Stn→Kameoka 14:30; Kameoka→Kyoto 18:30; data 11/02 |
| 10 | Conto ristorante-bar Shin-Miyako Hotel | 11/02/1998 ore 19:45 — ¥3.150 — un coperto |
| 11 | Ricevuta Royal Hotel Karasuma | Camera matrimoniale, notti 7–8 febbraio |
| 12 | Blister di Lexotan 1 mg | 8 compresse residue |
| 13 | Accendino in argento, marca S.T. Dupont | Inciso il carattere «英» |
| 14 | Pacchetto di sigarette Mild Seven, semivuoto | — |
| 15 | Chiavi di abitazione (3) e chiavi auto Toyota | Portachiavi in cuoio |
| 16 | Penna stilografica Pilot Custom 74 · fazzoletto di lino «T.E.» | — |
| 17 | Orologio Rolex Datejust · fede nuziale | Al polso e al dito: non asportati |
| 18 | Chiavetta metallica, targhetta n. 0419 | Rinvenuta sotto la soletta della scarpa destra. Foggia compatibile con cassetta di sicurezza bancaria |

**B — Rilievi sulla scena**

- 19. Porta del cubicolo centrale, lamiera verniciata grigia: tre fori di arma da fuoco, diametro compatibile con calibro 9 mm, raggruppati in un'area di circa 25 cm, direzione esterno→interno. Sul lato esterno del pannello, attorno ai fori, tracce di polvere da sparo incombusta: i colpi sono stati esplosi con la volata a contatto o a pochi centimetri dalla lamiera.
- 20. Impronta parziale di calzatura sportiva sul pavimento umido, antistante il cubicolo: suola scanalata, misura stimata 27 cm. Rilevata con gelatina.
- 21. Sul pavimento del cubicolo, tracciato con sangue della vittima: disegno di circa 20 cm (fotografato in situ prima dell'essiccazione — vedi allegato fotografico).
- 22. Sul pavimento del cubicolo, a 40 cm dal piede destro del cadavere: una piuma bruna, lunghezza 9 cm, non appartenente a specie da compagnia. Rinvenuta impigliata materia estranea sulla suola destra della calzatura della vittima. Repertata in busta a chiusura ermetica.
Nota del responsabile. Il disegno è rozzo — tratti grossi e storti, tracciati con l'indice destro. Non è però casuale: nessun tentativo cancellato, nessuna linea inutile. Chi l'ha fatto sapeva già cosa disegnare, e aveva pochissimo tempo. Cosa rappresenti, non compete a questo ufficio.

**C — Rinvenimenti conseguenti**

- 23. Autoveicolo Toyota Crown nera, intestato alla vittima, rinvenuto al parcheggio multipiano lato Hachijō, posto B-14, mediante le chiavi di cui al reperto 15. Sottoposto a sequestro.
- 24. Nel bagagliaio del veicolo di cui al n. 23: gabbia da trasporto per animali, vuota, cm 60×40×45, con piume brune e tracce di sangue essiccato non umano. Gabbia e campione biologico repertati separatamente; determinazione della specie richiesta all'Istituto zooprofilattico.
Si segnala la corrispondenza cromatica e dimensionale fra la piuma di cui al reperto 22, rinvenuta sotto la scarpa della vittima nel bagno, e quelle di cui al reperto 24, rinvenute nel bagagliaio della sua autovettura. La vittima, prima di salire al terzo piano, aveva camminato dove si trovavano quegli animali.
Il responsabile — Ito Daisuke
Kanshiki-ka — Sezione rilievi

---

## HANDOUT · H-02b_Foto_Reperti

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kanshiki-ka**
京 都 府 警 察 鑑 識 課

### ALLEGATO FOTOGRAFICO — REPERTI
*Effetti personali della vittima, disposti per la repertazione*

- **Fotogramma**: KS-98/0212-04, foto 4
- **Data**: 12/02/1998, ore 02:10
- **Luogo**: Sala repertazione, seminterrato
- **Operatore**: Kanshiki-ka

`[FOTOGRAFIA: InventarioVittima.png]`

Fotografia n. 4 — reperti da 01 a 18, disposti su telo tecnico. Scatto in luce diretta, scala metrica sul lato destro.
Il taccuino è fotografato aperto sull'ultima pagina compilata: la riproduzione a grandezza leggibile è al reperto 08 (verbale separato). Non tutti gli effetti compaiono nell'inquadratura: l'elenco completo, in 21 voci, è nel verbale di repertamento.
Il rilevatore — Kanshiki-ka
Il responsabile — Ito Daisuke

---

## HANDOUT · H-02c_Foto_Disegno

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kanshiki-ka**
京 都 府 警 察 鑑 識 課

### ALLEGATO FOTOGRAFICO — REPERTO 21
*Figura tracciata sul pavimento del cubicolo*

- **Fotogramma**: KB-98/0211-17, foto 6
- **Data**: 11/02/1998, ore 23:12
- **Luogo**: Kyoto Station, bagno maschile 3° piano
- **Operatore**: Kanshiki-ka

`[FOTOGRAFIA: IMG-03_disegno_sangue.png]`

Fotografia n. 6 — pavimento del cubicolo, lato destro, a circa 40 cm dal fianco della vittima. Scala metrica a lato. Figura tracciata a dito, altezza circa 20 cm.
Il sangue è della vittima. Il segno è grossolano — tratti spessi, storti, di larghezza diseguale, qualcuno tirato oltre il segno, qualcuno smagrito dove il dito ha finito il sangue: è la mano di un uomo che sta morendo. Ma sono pochi tratti e sono tutti utili: nessun tentativo cancellato, nessuna linea di troppo. È stato eseguito quando il sangue era ancora fluido, quindi entro pochi minuti dai colpi, e sulla figura non insistono impronte diverse da quelle della vittima. Questo ufficio riporta il dato: l'interpretazione della figura non gli compete.
Il rilevatore — Kanshiki-ka
Il responsabile — Ito Daisuke

---

## HANDOUT · H-03_Testimonianza_Watanabe

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kōban della Stazione**
京 都 府 警 察 京都駅前交番

### VERBALE DI SOMMARIE INFORMAZIONI
*Rese da persona informata sui fatti*

- **Verbale n.**: KB-98/0211-18
- **Data e ora**: 11/02/1998, ore 22:30
- **Luogo**: Kōban della Kyoto Station
- **Verbalizzante**: Agente Harada Kōhei
- **Deponente**: Watanabe Toshio, 31
- **Qualità**: Testimone

**Dichiarazione**
«Mi chiamo Watanabe Toshio, lavoro alla Mitsubishi Heavy Industries, a Kobe. Ero sul treno di ritorno, sono sceso alle nove e otto. Sono andato al bagno del terzo piano, quello dopo gli uffici. Ero nel cubicolo… quello a sinistra.
Poco dopo è entrato qualcuno in quello accanto, ho sentito la porta. Poi è entrato un altro — passi pesanti, scarpe che facevano quel rumore, come di gomma sul bagnato. Si è fermato. E poi tre colpi, uno dietro l'altro, fortissimi. Non ho capito subito, pensavo… non lo so cosa pensavo.
Poi un rumore di metallo per terra, piccolo, e i passi che se ne andavano, non di corsa. La porta. Io non mi sono mosso. Non riuscivo. Ho sentito qualcosa gocciolare. Sono rimasto lì non so quanto — tanto.
Quando sono uscito c'era sangue sotto la porta di mezzo. Ho vomitato, mi dispiace. Poi sono corso qui. Non ho visto nessuno. Non ho visto la faccia di nessuno. Non ho sentito parlare nessuno. Mia moglie… posso chiamare mia moglie?»

**Precisazioni richieste al deponente**

| Domanda | Risposta |
|---|---|
| Ha udito voci, parole, grida? | «No… non mi pare. Non ricordo voci.» |
| Quanti colpi con certezza? | «Tre. Credo tre. Sì, tre.» |
| A che ora è entrato nel bagno? | «Non lo so. Prima delle nove e mezza. Volevo prendere la metropolitana.» |
| Quanto è rimasto nel cubicolo? | «Tanto. Mi sembrava un'ora. Non lo so.» |
| Può descrivere il rumore metallico? | «Un rumore piccolo. Non… non me lo faccia ripetere adesso, per favore.» |
Annotazione del verbalizzante. Il deponente è in stato di forte alterazione emotiva. Presenta tremore diffuso e difficoltà di eloquio; ha chiesto per tre volte di interrompere. Gli orari e le sequenze da lui riferiti sono approssimativi e andranno riscontrati: allo stato non è in grado di ricostruire con precisione. Si raccomanda una seconda audizione a distanza di ore, in ambiente tranquillo e con un solo interlocutore: il deponente ha mostrato di ricordare più di quanto riesca a dire stanotte. Si è reso disponibile. Ha chiesto espressamente che il proprio nome non sia comunicato alla stampa: ha una figlia di sei mesi.
Il deponente — Watanabe Toshio
Il verbalizzante — Agente Harada Kōhei

---

## HANDOUT · H-04_Scheda_Vittima

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### SCHEDA ANAGRAFICA — PERSONA OFFESA
*Fascicolo 98/0211 «Kyoto Station»*

- **Cognome e nome**: TACHIBANA Eiji 橘 英司
- **Età**: 47 (n. 1950, Maizuru)
- **Residenza**: Fukakusa Sujikaibashi-chō 3-12, Fushimi-ku
- **Stato civile**: Separato dal 1996, non divorziato
- **Coniuge**: Tachibana Setsuko, 44 — residente a Maizuru
- **Figli**: Nessuno

**Posizione lavorativa**

- Titolare e gestore del bar-ristorante «Kōrin» (光琳), Hanamikoji-dōri, Gion, Higashiyama-ku. Attività aperta nel 1989.
- Iscritto alla Camera di Commercio di Kyoto come esercente di pubblico esercizio.
- Reddito dichiarato dall'esercizio (1997): ¥9.000.000.

**Precedenti**
Nessuno. Nessun carico pendente. Nessuna segnalazione. Nessun provvedimento amministrativo a carico dell'esercizio. Patente di guida senza decurtazioni.

**Beni e utenze**

| Voce | Dato |
|---|---|
| Abitazione | Appartamento int. 602, «Fushimi Garden Heights» — 78 m², di proprietà. Acquisto 1994 per ¥58 mln, mutuo estinto nel 1996 |
| Autoveicolo | Toyota Crown nera, imm. 1996 |
| Rapporti bancari noti | Sanwa Bank, filiale di Gion — c/c e carta JCB |
| Utenza mobile | NTT DoCoMo 090-3427-1180 |
| Utenza fissa domicilio | 075-641-2288 (con segreteria telefonica) |

**Rete di relazioni dichiarate**

- Coniuge separata: Setsuko, insegnante di calligrafia, Maizuru. Avvisata il 12/02 alle ore 06:50.
- Dipendenti del Kōrin: 4 (un cameriere senior, una cameriera, uno chef, un barista).
- Frequentazioni abituali: ambiente della ristorazione di Gion e Pontochō; beneficenza cittadina; risulta conoscente di alcuni amministratori locali.
Rilievo dell'ufficio. Si segnala una sproporzione tra il reddito dichiarato (¥9 mln/anno) e il tenore di vita documentabile (immobile di pregio con mutuo estinto in due anni, autoveicolo, orologeria e abbigliamento sartoriale, frequentazione alberghiera). Stima prudenziale del tenore di vita effettivo: ¥25–30 mln/anno. Il dato è trasmesso per competenza alla Polizia Tributaria (Kokuzei).
Il compilatore — Agente Yamada Tetsuo
Il Commissario — Taniguchi Osamu

---

## HANDOUT · H-05_Autopsia_Tachibana

`[RISERVATO]`
**UNIVERSITÀ DI KYOTO — Istituto di Medicina Legale**
京都大学 法医学教室

### RELAZIONE DI AUTOPSIA GIUDIZIARIA
*Su autorizzazione del Giudice del Tribunale distrettuale di Kyoto, richiesta dalla Procura*

- **Referto n.**: ML-98/0079
- **Esame**: 12/02/1998, ore 09:00–12:30
- **Cadavere**: TACHIBANA Eiji, anni 47
- **Settore**: Dr. Yagi Kenta
- **Rinvenimento**: 11/02/1998, ore 22:08
- **Identificazione**: Coniuge, 12/02 ore 15:00 (dopo l'esame)

**Dati generali**
Soggetto di sesso maschile, cm 174, kg 71, costituzione normolinea, buono stato di nutrizione. Epoca della morte, dai fenomeni cadaverici e dalla temperatura: compresa fra le ore 21:00 e le 21:40 dell'11/02, con miglior stima 21:20–21:25.

**Lesività da arma da fuoco**

| N. | Sede d'ingresso | Tramite | Esito |
|---|---|---|---|
| 1 | Emitorace sx, 4° spazio intercostale | Antero-posteriore, lievemente discendente | Lacerazione del ventricolo sx |
| 2 | Emitorace sx, 5° spazio intercostale | Antero-posteriore | Lacerazione polmonare, emotorace |
| 3 | Regione sternale, terzo medio | Antero-posteriore | Frattura sternale, aorta ascendente |
I tre fori d'ingresso sono raggruppati in un'area di circa 25 cm. Assenza di alone di affumicatura e di tatuaggio sulla cute: i colpi non sono stati esplosi a contatto con il corpo, ma con un diaframma rigido interposto (il pannello della porta), posto a brevissima distanza — coerentemente con le tracce di polvere da sparo rilevate sul lato esterno della lamiera (cfr. verbale KS-98/0212-04). Recuperati due proiettili deformati, di calibro nominale 9 mm (determinazione del tipo rimessa alla Sezione Balistica), trasmessi al medesimo ufficio; il terzo è transitato.

**Causa e modalità della morte**
Causa: shock emorragico acuto da lesione cardio-aortica. Mezzo: arma da fuoco corta. Modalità: omicidiaria. La sopravvivenza dopo il primo colpo è stimabile in 60–90 secondi di coscienza residua, con progressiva perdita della forza muscolare.

**Ulteriori reperti**

- Nessuna lesione da difesa a mani e avambracci. Nessun segno di colluttazione.
- Imbrattamento ematico del polpastrello dell'indice destro, con residui compatibili con il tracciato rinvenuto sul pavimento.
- Esame tossicologico: negativo per stupefacenti; alcolemia 0,2 g/l (compatibile con un bicchiere a cena); tracce di bromazepam (Lexotan) a dosaggio terapeutico.
- Contenuto gastrico: pasto leggero assunto fra i trenta e i novanta minuti prima del decesso.
Osservazione del settore. La sequenza è rapida, ma la rosa è ampia per la distanza alla quale i colpi sono stati esplosi: chi ha sparato conosceva la posizione del bersaglio dietro la porta e non ha esitato fra un colpo e l'altro, pur senza prendere la mira. Segnalo alla Squadra che la coscienza residua di circa un minuto è compatibile con un'azione volontaria e ordinata della vittima nei secondi successivi: quanto è stato tracciato sul pavimento non è un movimento agonico.
Il settore — Dr. Yagi Kenta
Istituto di Medicina Legale

---

## HANDOUT · H-06_Tabulato_Cellulare

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### VERBALE DI LETTURA DI APPARECCHIO
*Telefono cellulare — reperto 06 · con le identificazioni acquisite*

- **Protocollo**: SO-98/0213-01
- **Lettura dell'apparecchio**: 12/02/1998, ore 09:30
- **Apparecchio**: Reperto 06 — NTT DoCoMo «mova»
- **Utenza**: 090-3427-1180 — Tachibana Eiji
- **Identificazioni**: 13/02, su ordine della Procura
- **Nota**: L'apparecchio conserva le ultime 10 chiamate

**Memoria dell'apparecchio — ultime dieci chiamate, con le identificazioni acquisite**

| # | Data / ora | Dir. | Numero | Intestatario | Durata |
|---|---|---|---|---|---|
| 1 | 11/02  20:52 | Usc. | 075-561-3390 | Bar-ristorante «Kōrin» — Gion (esercizio della vittima) | 1'12" |
| 2 | 11/02  13:58 | Usc. | 0771-24-5512 | Ristorante «Kameoka-tei» — Honmachi, Kameoka | 0'38" |
| 3 | 10/02  21:30 | Entr. | 090-7712-4408 | Aoyagi Mariko, 29 — Sakyō-ku | 14'05" |
| 4 | 09/02  19:14 | Usc. | 075-581-7742 | Murakami Saburō, 52 — clinica veterinaria, Yamashina | 6'41" |
| 5 | 08/02  11:02 | Entr. | 0771-22-8890 | Utenza aziendale intestata a Kameoka Nōji K.K. — Honmachi, Kameoka | 3'20" |
| 6 | 07/02  17:45 | Usc. | 075-231-6604 | Sasaki Hideo, 44 — sala pachinko, Kawaramachi | 2'55" |
| 7 | 06/02  22:18 | Entr. | 075-771-0925 | Ōkubo Kenji, 41 — Kamigyō-ku | 9'33" |
| 8 | 05/02  20:07 | Usc. | 075-221-4471 | Inoue Takeshi, 49 — ristorante «Hanaichi», Pontochō | 4'02" |
| 9 | 04/02  18:33 | Usc. | 075-712-3358 | Tanaka Shōji, 67 — pensionato, Sakyō-ku | 7'19" |
| 10 | 03/02  15:20 | Usc. | 075-561-9087 | Nishimura Tatsuya, 36 — Higashiyama-ku | 1'48" |
Avvertenze. L'apparecchio modello «mova» conserva in memoria esclusivamente le ultime dieci chiamate, indistintamente entranti e uscenti, e non dispone di rubrica: nessun nominativo era memorizzato. Le chiamate anteriori al 3 febbraio non sono ricostruibili dal terminale; il tabulato completo di centrale richiede separata istanza alla Procura ed è stato richiesto. Le intestazioni riportate in tabella sono state acquisite con separate richieste agli operatori (NTT Kansai per le utenze fisse, NTT DoCoMo per le mobili) su ordine di esibizione della Procura del 12/02, evase il 13/02.
Annotazione della Sezione Omicidi. Nelle ultime nove ore di vita la vittima ha effettuato due sole chiamate: al proprio locale e al ristorante di Kameoka. Nessuna chiamata risulta effettuata o ricevuta dopo le 20:52.
Il verbalizzante — Agente Yamada Tetsuo
Il Commissario — Taniguchi Osamu

---

## HANDOUT · H-07_Kyoto_Shimbun_9feb

京 都 新 聞
KYOTO SHIMBUN · Lunedì 9 febbraio 1998 · Edizione del mattino · pag. 14 — ANNUNCI E RISTORAZIONE

**亀 岡 亭**
[ fotografia del locale — sempre la stessa ]
Ristorante Kameoka-tei — Honmachi, Kameoka · soba e tempura dal 1978 · tel. 0771-24-5512

**PROMOZIONE SPECIALE DEL 22 FEBBRAIO**

| Pollo fritto, salsa yuzu e sesamo | 柚子・胡麻 | −4% |
|---|---|---|
| Yakitori, salsa miso e zenzero | 味噌・生姜 | −6% |
| Pollo al vapore, salsa aceto nero e prugna | 黒酢・梅 | −5% |
| Pollo nanban, salsa agrodolce e senape | 甘酢・辛子 | −3% |
| Pentola di pollo, salsa soia e pepe sanshō | 醤油・山椒 | −7% |
| Oyakodon, salsa brodo e shiso | 出汁・紫蘇 | −8% |
| Pollo teriyaki, salsa peperoncino e ponzu | 唐辛子・ポン酢 | −5% |
Menù della sera a prezzo ridotto — si prega di prenotare

Ristorazione, un inverno in salita
Le associazioni di categoria della città stimano in un dodici per cento il calo degli incassi nel settore della ristorazione tradizionale rispetto allo stesso periodo dell'anno passato. Pesano, secondo gli operatori, la contrazione dei pranzi di lavoro e la prudenza delle famiglie. «I locali storici reggono, i piccoli no» osserva il rappresentante degli esercenti di Higashiyama. Cresce invece il ricorso alle promozioni serali a prezzo ridotto, formula fino a ieri estranea alla cucina di Kyoto.
Kameoka, sopralluogo sull'argine dell'Hozu
Tecnici della prefettura hanno completato il sopralluogo annuale sugli argini del fiume nella zona di Sogabe. Nessuna criticità rilevata. Prosegue lo spopolamento agricolo dell'area: nell'ultimo decennio quasi un quarto dei capannoni e dei depositi risulta dismesso o inutilizzato.
PICCOLI ANNUNCI
SARTORIA MIYAKO — Rifacimento orli e riparazioni. Consegna in giornata. Shijō-dōri. Tel. 075-221-0043.

TAXI HOZU — Sei vetture, servizio notturno su prenotazione in tutta la zona di Kameoka. Tel. 0771-22-3030.

OSTERIA MARUYAMA — Nuovo menù invernale a base di anatra. Chiuso il mercoledì. Gion.

SI CERCA personale di sala, anche prima esperienza, zona Pontochō. Presentarsi il pomeriggio.

MACELLERIA TANI — Pollame di fattoria selezionato, consegne a domicilio per ristorazione. Nishiki.

SCUOLA DI CALLIGRAFIA — Corsi serali per adulti, iscrizioni aperte. Kawaramachi.

VENDESI furgone Toyota, 1989, buono stato, gomme nuove. Trattabile. Uji.

ONORANZE FUNEBRI HIGASHI — Assistenza completa, servizio 24 ore.

CLINICA VETERINARIA — Visite su appuntamento, anche domenica mattina. Yamashina.

PACHINKO SASAKI — Nuove macchine in sala. Aperto fino a mezzanotte. Kawaramachi-dōri.

---

## HANDOUT · H-08_Archivio_Annunci

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### ALLEGATO FOTOSTATICO
*Ritagli del «Kyoto Shimbun» rinvenuti nello schedario della vittima*

Rinvenuti nel cassetto 3 dello schedario metallico, abitazione di Fushimi: quattro copie del quotidiano piegate e conservate, ciascuna con etichetta manoscritta di data. Nessuna copia anteriore a ottobre 1997. La copia di gennaio reca una cerchiatura a matita leggera sulla prima riga del menù.
Ed. 22/10/1997 — etichetta: «ott.»

**亀 岡 亭**
[ fotografia del locale — sempre la stessa ]
Ristorante Kameoka-tei — Honmachi, Kameoka · soba e tempura dal 1978 · tel. 0771-24-5512

**PROMOZIONE SPECIALE DEL 25 OTTOBRE**

| Pollo fritto, salsa wasabi e sesamo | 山葵・胡麻 | −5% |
|---|---|---|
| Yakitori, salsa miso e prugna | 味噌・梅 | −4% |
| Pollo al vapore, salsa yuzu e shiso | 柚子・紫蘇 | −6% |
| Pollo nanban, salsa agrodolce e senape | 甘酢・辛子 | −4% |
| Pentola di pollo, salsa soia e zenzero | 醤油・生姜 | −7% |
| Oyakodon, salsa brodo e pepe sanshō | 出汁・山椒 | −5% |
| Pollo teriyaki, salsa peperoncino e ponzu | 唐辛子・ポン酢 | −6% |
Menù della sera a prezzo ridotto — si prega di prenotare

Ed. 26/11/1997 — etichetta: «nov.»

**亀 岡 亭**
[ fotografia del locale — sempre la stessa ]
Ristorante Kameoka-tei — Honmachi, Kameoka · soba e tempura dal 1978 · tel. 0771-24-5512

**PROMOZIONE SPECIALE DEL 29 NOVEMBRE**

| Pollo fritto, salsa wasabi e yuzu | 山葵・柚子 | −6% |
|---|---|---|
| Yakitori, salsa aceto nero e sesamo | 黒酢・胡麻 | −3% |
| Pollo al vapore, salsa miso e prugna | 味噌・梅 | −5% |
| Pollo nanban, salsa agrodolce e shiso | 甘酢・紫蘇 | −6% |
| Pentola di pollo, salsa soia e senape | 醤油・辛子 | −4% |
| Oyakodon, salsa brodo e zenzero | 出汁・生姜 | −7% |
| Pollo teriyaki, salsa peperoncino e pepe sanshō | 唐辛子・山椒 | −5% |
Menù della sera a prezzo ridotto — si prega di prenotare

Ed. 24/12/1997 — etichetta: «dic.»

**亀 岡 亭**
[ fotografia del locale — sempre la stessa ]
Ristorante Kameoka-tei — Honmachi, Kameoka · soba e tempura dal 1978 · tel. 0771-24-5512

**PROMOZIONE SPECIALE DEL 27 DICEMBRE**

| Pollo fritto, salsa wasabi e senape | 山葵・辛子 | −7% |
|---|---|---|
| Yakitori, salsa aceto nero e yuzu | 黒酢・柚子 | −4% |
| Pollo al vapore, salsa miso e ponzu | 味噌・ポン酢 | −5% |
| Pollo nanban, salsa agrodolce e sesamo | 甘酢・胡麻 | −5% |
| Pentola di pollo, salsa soia e prugna | 醤油・梅 | −6% |
| Oyakodon, salsa brodo e shiso | 出汁・紫蘇 | −8% |
| Pollo teriyaki, salsa peperoncino e zenzero | 唐辛子・生姜 | −4% |
Menù della sera a prezzo ridotto — si prega di prenotare

Ed. 21/01/1998 — etichetta: «gen.» [cerchiata a matita]

**亀 岡 亭**
[ fotografia del locale — sempre la stessa ]
Ristorante Kameoka-tei — Honmachi, Kameoka · soba e tempura dal 1978 · tel. 0771-24-5512

**PROMOZIONE SPECIALE DEL 24 GENNAIO**

| Pollo fritto, salsa wasabi e aceto nero | 山葵・黒酢 | −3% |
|---|---|---|
| Yakitori, salsa miso e yuzu | 味噌・柚子 | −5% |
| Pollo al vapore, salsa agrodolce e prugna | 甘酢・梅 | −6% |
| Pollo nanban, salsa soia e senape | 醤油・辛子 | −4% |
| Pentola di pollo, salsa brodo e sesamo | 出汁・胡麻 | −7% |
| Oyakodon, salsa peperoncino e shiso | 唐辛子・紫蘇 | −5% |
| Pollo teriyaki, salsa ponzu e pepe sanshō | ポン酢・山椒 | −6% |
Menù della sera a prezzo ridotto — si prega di prenotare

Le quattro promozioni cadono di sabato (25/10, 29/11, 27/12, 24/01). Quella pubblicata il 9 febbraio cade di domenica (22/02).

---

## HANDOUT · H-09_Taccuino

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kanshiki-ka**
京 都 府 警 察 鑑 識 課

### RIPRODUZIONE FOTOSTATICA — REPERTO 08
*Taccuino tascabile rinvenuto sulla persona della vittima*

- **Reperto**: 08 — taccuino tascabile
- **Formato**: 9 × 15 cm, copertina in tela cerata
- **Stato**: Pagine anteriori asportate a strappo
- **Pagine utili**: 2 (l'ultima scritta e la seguente)
- **Scrittura**: Penna stilografica, inchiostro nero
- **Grafia**: Attribuibile alla vittima

**Pagina 1 (ultima compilata)**
　　　　一月

　西陣工務店　　　　　80
　森田建設　　　　　 150
　亀岡亭　　　　　　 120
　Ｋ．Ｎ農機　　　　 200
　田中商事　　　　　 100
　　　　　　　　　　 ─────
　月間売上　¥18.000.000

　Ｈ．Ｅ　　6.8Ｍ　　済

**Pagina 2**
　2/22　23:00　同じ

　山葵　—　×
　黒酢　—　○　3

**Note del traduttore d'ufficio**

- 一月 = «gennaio». 月間売上 = «incasso del mese». 済 = «saldato». 同じ = «come sempre / lo stesso».
- 西陣工務店 Nishijin Kōmuten, 森田建設 Morita Kensetsu, Ｋ．Ｎ農機 K.N Nōki, 田中商事 Tanaka Shōji sono ragioni sociali; 亀岡亭 Kameoka-tei è il nome di un ristorante di Kameoka. Verifica camerale: nessuna delle quattro ditte risulta esistente o attiva a Kyoto.
- Le ragioni sociali e le sigle non corrispondono a iniziali di persona: sono codici arbitrari. Ricondurle a un nominativo per via fonetica è, per questo ufficio, privo di fondamento.
- 山葵 = wasabi · 黒酢 = aceto nero. Nessuna attinenza evidente con quanto precede.
Rilievo della Sezione. Le cifre della prima pagina, sommate, danno 650. Se lette come multipli di ¥10.000 valgono ¥6.500.000, importo non coincidente con il totale indicato sotto. Le due colonne sembrano quindi appartenere a due grandezze diverse: quanto è stato impegnato e quanto è rientrato. La corrispondenza fra le ragioni sociali e le persone reali non è ricavabile da questo documento.
Il rilevatore — Kanshiki-ka
Traduzione d'ufficio

---

## HANDOUT · H-10_Lista_Clienti_Cassaforte

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### ALLEGATO — DOCUMENTO MANOSCRITTO
*Rinvenuto nella cassaforte a muro dell'abitazione di Fushimi*

- **Acquisizione**: Perquisizione domiciliare, apertura cassaforte
- **Supporto**: 2 fogli, carta da lettere
- **Grafia**: Attribuibile alla vittima
- **Redazione**: Aggiornato a mano, ultima riga gennaio 1998
- **Contenuto**: Elenco cifrato di posizioni
- **Classificazione**: Prova documentale

**Trascrizione integrale**

| Ragione sociale | Recapito | Impegnato '97 | Annotazione a margine |
|---|---|---|---|
| 西陣工務店 | …9087 | — | «non chiede mai niente» |
| 田中商事 | …6604 | — | «golf, deve il '92» |
| Ｋ．Ｎ農機 | …0925 | 4.200 | «attento, conta» |
| 森田建設 | …4471 | 3.100 | «amico» |
| 亀岡亭 | — | — | «la casa — quota mensile» |
| 大原不動産 | …3358 | 6.800 | «tratta come un signore» |
| 山科精機 | …7719 | 12.400 | «fermarlo, è finito» |
| 加茂運送 | …2246 | 8.900 | «paga sempre in ritardo» |
| 宇治木材 | …5530 | 2.400 | «piccolo, tranquillo» |
| 浪速紡績 | …8801 | 21.000 | «non è come gli altri» |
Importi in migliaia di yen. Nessun nome per esteso compare nel documento: le ragioni sociali sono codici, i recapiti sono annotati per le sole ultime quattro cifre.

**Ultima riga, aggiunta con inchiostro diverso**
　Ｈ．Ｅ　=　東の先生　（済　1/98）
東の先生 = «il dottore dell'est». 済 = «saldato».
Valore del documento. È la chiave di lettura del taccuino (reperto 08): le ragioni sociali sono codici di comodo, e nessuna delle ditte esiste. Il documento fornisce nove posizioni personali più «la casa»: incrociando i recapiti parziali con la memoria dell'apparecchio (reperto 06) se ne identificano cinque; le restanti quattro non compaiono in quella memoria e vanno raggiunte per altra via. Non contiene date, luoghi, né riferimenti a terzi organizzatori: la vittima annotava i propri clienti, non i propri soci.
Il verbalizzante — Agente Yamada Tetsuo
Il Commissario — Taniguchi Osamu

---

## HANDOUT · H-11_Segreteria_Telefonica

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kanshiki-ka, Settore fonico**
京 都 府 警 察 鑑識課 音声担当

### VERBALE DI TRASCRIZIONE FONICA
*Nastro di segreteria telefonica — utenza 075-641-2288*

- **Protocollo**: KS-98/0212-11
- **Acquisizione**: 12/02/1998, perquisizione domiciliare
- **Luogo**: Abitazione della vittima, Fushimi int. 602
- **Supporto**: Microcassetta, apparecchio con datario
- **Messaggi**: 2, entrambi non ascoltati
- **Trascrizione**: 13/02/1998

**Messaggio 1 — 10/02/1998, ore 18:42 (durata 7")**
[voce maschile, adulta, tono cordiale, cadenza locale]

  «Ei-san, sono io. Domani come d'accordo.»

[fine messaggio — nessun nominativo, nessun recapito lasciato]

**Messaggio 2 — 11/02/1998, ore 22:14 (durata 11")**
[voce femminile, adulta, tono preoccupato]

  «Ei-chan, sono Mariko. Dove sei? …Richiamami quando senti.»

[fine messaggio]

**Caratteristiche foniche del messaggio 1**

- Voce maschile, età stimata 30–40 anni, timbro chiaro, nessuna alterazione volontaria.
- Inflessione dell'area di Kyoto occidentale/Tamba (compatibile con provenienza da Kameoka).
- L'appellativo «Ei-san» indica familiarità: chi parla dà per scontato di essere riconosciuto alla voce.
- Rumore di fondo: ambiente chiuso, nessun traffico, televisore o radio a basso volume.
- Registrazione idonea a comparazione fonica con campione di voce nota (art. rilievi): la comparazione richiede l'acquisizione di un campione da persona sospettata.
Rilievo per la Squadra. Il messaggio del 10/02 fissa un appuntamento per il giorno successivo, l'11 — la data del fatto — senza indicare né luogo né ora. Ne consegue che luogo e ora erano già stati concordati per altra via, e che chi parla e la vittima si vedevano con regolarità. Il messaggio 2, delle 22:14, è successivo al decesso.
Il tecnico — Kanshiki-ka, settore fonico
Il responsabile — Ito Daisuke

---

## HANDOUT · H-12_Verbale_Yamashina_Murakami

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Commissariato di Yamashina**
京都府警察 山科警察署

### RAPPORTO DI INTERVENTO
*Rinvenimento di cadavere — ipotesi iniziale: gesto volontario*

- **Protocollo**: YM-98/0213-06
- **Data**: 13 febbraio 1998
- **Chiamata al 119**: ore 16:34
- **Ambulanza**: ore 16:48
- **Polizia sul posto**: ore 17:05
- **Redatto da**: Ass. capo Kubota Jun

**Luogo e rinvenimento**
Clinica veterinaria «Murakami Dōbutsu Byōin», Higashino Kitaōiwake-chō, Yamashina-ku. Esercizio chiuso al pubblico per la pausa (riapertura prevista ore 16:00). La segnalazione è della moglie del titolare, Murakami Hiroko, 49, che dichiara di passare abitualmente dallo studio il venerdì pomeriggio.
La donna riferisce di aver trovato la porta anteriore chiusa a chiave e l'insegna girata su «chiuso», e di essere entrata dal cortile sul retro, la cui porta era accostata e non chiusa a catenaccio. Ha rinvenuto il marito riverso sul fianco nel retrobottega, accanto al tavolo di preparazione. Dichiara di non aver toccato nulla e di aver chiamato i soccorsi dal telefono dell'ambulatorio.

**Descrizione della scena**

- Cadavere di Murakami Saburō, 52, titolare dell'esercizio. Decesso constatato dal personale sanitario alle 16:52.
- Sul tavolo, in ordine sparso: una siringa monouso da 10 ml e una boccetta vuota di xilazina (sedativo a uso veterinario per grandi animali), tappo perforato.
- Nessun segno di effrazione. Nessun disordine. Nessun biglietto.
- In un cassetto basso della scrivania, bottiglia di shōchū semivuota.
- Nel registro pazienti: due sole visite nella mattinata.

**Elementi acquisiti sul contesto**
Dai familiari e dalla corrispondenza sul tavolo di casa risulta che il titolare versava in condizioni economiche gravemente compromesse: due ipoteche sull'abitazione, solleciti bancari, un investimento immobiliare del 1995 fallito nel 1996. La moglie riferisce insonnia, consumo serale di alcolici e telefonate a cui il marito rispondeva a bassa voce da almeno due anni.
Conclusioni provvisorie del rilevatore. Il quadro appare compatibile con un gesto volontario (mezzo autosomministrato disponibile sul posto, situazione debitoria, abuso di alcolici). Non si rilevano elementi di terzietà a un primo esame. Si richiede alla Procura l'attivazione dell'autopsia giudiziaria, come da protocollo per i decessi da sostanza. Salma trasferita all'Istituto di Medicina Legale.
Annotazione successiva (14/02, ore 12:10). Pervenuto esito autoptico. L'ipotesi di cui sopra è superata: vedi referto ML-98/0083. Atti trasmessi alla Procura; l'assegnazione alla Sezione Omicidi è intervenuta in data 16/02.
Il rilevatore — Ass. capo Kubota Jun
Commissariato di Yamashina

---

## HANDOUT · H-12b_Foto_Studio_Veterinario

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Commissariato di Yamashina**
京都府警察 山科警察署

### ALLEGATO FOTOGRAFICO — SCENA
*Retrobottega della clinica veterinaria, Yamashina*

- **Fotogramma**: YM-98/0213-06, foto 2
- **Data**: 13/02/1998, ore 17:30
- **Luogo**: Higashino Kitaōiwake-chō, Yamashina-ku
- **Operatore**: Rilievi — Comm. di Yamashina

`[FOTOGRAFIA: IMG-15_studio_retrobottega.png]`

Fotografia n. 2 — retrobottega ripreso dall'ambulatorio. Il corpo è nella posizione di rinvenimento. Sul tavolo di preparazione, la siringa e la boccetta.
Il rilievo è stato eseguito mentre l'ipotesi di lavoro era il gesto volontario. Risultano dalla fotografia, e si riportano senza commento: la boccetta e la siringa sono sul tavolo, in piano e accostate, mentre il corpo giace a terra dal lato opposto del tavolo; la porta sul cortile è accostata e non chiusa a catenaccio. Il verbale del 13/02 non rileva elementi di terzietà: quella lettura è superata dal referto autoptico del 14/02.
Il rilevatore — Ass. capo Kubota Jun
Commissariato di Yamashina

---

## HANDOUT · H-13_Autopsia_Murakami

`[RISERVATO]`
**UNIVERSITÀ DI KYOTO — Istituto di Medicina Legale**
京都大学 法医学教室

### RELAZIONE DI AUTOPSIA GIUDIZIARIA
*Con esame tossicologico d'urgenza*

- **Referto n.**: ML-98/0083
- **Esame**: 14/02/1998, ore 08:00–11:20
- **Cadavere**: MURAKAMI Saburō, anni 52
- **Settore**: Dr. Yagi Kenta
- **Rinvenimento**: 13/02/1998, ore 16:30
- **Tossicologia**: d'urgenza, ore 11:00

**Reperti anatomici**

- Unico foro da ago in regione latero-cervicale destra, poco visibile a occhio nudo, con modesto stravaso: iniezione praticata in vena giugulare esterna.
- Ematoma di contenimento a fascia sulla regione mandibolare e sul lato sinistro del collo, con impronta compatibile con presa manuale esercitata da altri e mantenuta per alcuni secondi.
- Modeste ecchimosi al braccio sinistro, terzo medio, compatibili con presa.
- Assenza di lesioni da difesa. Assenza di segni di caduta.
- Steatosi epatica di grado medio (abuso alcolico cronico). Nessuna patologia acuta preesistente.

**Esame tossicologico**

| Sostanza | Concentrazione | Riferimento |
|---|---|---|
| Xilazina (sedativo veterinario) | 18,4 µg/mL (sangue femorale) | Casistica letale in letteratura: 3–4 µg/mL. Nessun uso umano autorizzato |
| Etanolo | 0,9 g/l | Assunzione serale abituale |
| Altri stupefacenti / farmaci | Negativo | — |

**Considerazioni medico-legali**
La concentrazione riscontrata — pari a circa cinque volte il valore letale di riferimento — non è compatibile con l'autosomministrazione: eccede largamente qualunque quantitativo osservato in casi di gesto volontario o accidentale, dove la perdita di coscienza interviene ben prima del completamento dell'iniezione. La sede cervicale è inoltre sede impervia per un'autoiniezione, e il reperto di contenimento indica che il capo è stato tenuto fermo.
Conclusione. Modalità della morte: OMICIDIARIA. Causa: arresto cardiocircolatorio da intossicazione acuta da xilazina. Epoca del decesso: 13/02, fra le 13:30 e le 14:30. La scena appare allestita per simulare un gesto volontario. Si trasmette d'urgenza alla Procura e alla Sezione Omicidi.
Nota del settore. Chi ha agito ha usato una sostanza presente nello studio della vittima, senza portarla con sé e senza asportarla dopo. Segnalo alla Squadra la coincidenza di mezzo e di simbolo: la stessa sostanza che il defunto adoperava per il proprio lavoro.
Il settore — Dr. Yagi Kenta
Vidimato: Istituto di Medicina Legale

---

## HANDOUT · H-14_Estratti_Conto_Murakami

`[RISERVATO]`
**BANCA SANWA — Filiale di Yamashina**
三 和 銀 行 山科支店

### ESTRATTO CONTO — ESIBIZIONE SU ORDINE DELL'AUTORITÀ
*Conto corrente n. 4-118872 — MURAKAMI Saburō*

- **Riferimento**: Ordine PM Watanabe H. — 15/02/1998
- **Periodo**: 1/10/1997 – 10/02/1998
- **Intestatario**: Murakami Saburō, 52
- **Contestuale**: Posizione debitoria complessiva
- **Saldo al 1/10/1997**: ¥ 412.550
- **Saldo al 10/02/1998**: ¥ 1.883.400

**Movimenti rilevanti**

| Data | Causale | Dare | Avere |
|---|---|---|---|
| 15/10/97 | Rata mutuo ipotecario n. 2 — insoluta, sollecito | — | — |
| 28/11/97 | Addebito rata mutuo n. 1 | 188.000 |  |
| 20/12/97 | Versamento contanti allo sportello |  | 150.000 |
| 12/01/98 | Addebito rata mutuo n. 1 | 188.000 |  |
| 28/01/98 | Versamento contanti allo sportello (banconote da ¥10.000) |  | 2.100.000 |
| 28/01/98 | Sanatoria morosità — mutuo ipotecario n. 2 (2 rate + interessi) | 1.880.000 |  |
| 30/01/98 | Versamento contanti allo sportello |  | 1.500.000 |
| 02/02/98 | Prelievo contanti | 1.500.000 |  |
| 09/02/98 | Addebito utenze clinica | 62.400 |  |

**Posizione debitoria complessiva al 10/02/1998**

| Esposizione | Importo | Stato |
|---|---|---|
| Mutuo ipotecario n. 1 — abitazione Yamashina | ¥ 14.200.000 | In ammortamento |
| Mutuo ipotecario n. 2 — secondo grado, stessa abitazione | ¥ 9.500.000 | Morosità sanata il 28/01/1998 |
| Residuo operazione immobiliare Biwako (1995) | ¥ 14.300.000 | Contenzioso |
| Totale esposizione | ¥ 38.000.000 | — |
Annotazione della banca su richiesta dell'Autorità. I versamenti del 28 e del 30 gennaio sono avvenuti in contanti allo sportello, con banconote da ¥10.000. Il cliente non ha indicato la provenienza delle somme e non era tenuto a farlo. Nei ventidue mesi precedenti il conto non aveva mai registrato versamenti superiori a ¥200.000, e la posizione era in sofferenza da undici mesi. Dei ¥1.500.000 versati il 30 gennaio, l'intero importo è stato ritirato in contanti il 2 febbraio.
L'esposizione complessiva del cliente verso il sistema bancario resta di ¥38.000.000: quanto affluito a fine gennaio è servito unicamente a sanare la morosità del secondo mutuo ed evitare l'escussione dell'ipoteca. Nulla risulta a questo istituto circa eventuali obbligazioni del cliente verso terzi privati.
Per la Banca Sanwa — Il Direttore di filiale
Ricevuto: Sez. Omicidi

---

## HANDOUT · H-15_Tentato_Omicidio_Okubo

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### RAPPORTO — TENTATO OMICIDIO
*Con allegato identikit · Fascicolo 98/0214 «Kamigyō»*

- **Protocollo**: SO-98/0215-02
- **Fatto**: 14/02/1998, ore 22:30 ca.
- **Luogo**: Parcheggio interrato, Imadegawa-dōri, Kamigyō-ku
- **Persona offesa**: ŌKUBO Kenji, 41
- **Prognosi**: 30 gg — ferita d'arma da fuoco alla spalla dx
- **Piantonamento**: Attivo, stanza 412

**Dinamica accertata**
La persona offesa rientrava al proprio condominio a bordo di autovettura Nissan Skyline, che parcheggiava al posto assegnato B-04. Nell'atto di scendere veniva fatta segno di due colpi d'arma da fuoco esplosi da un soggetto appostato dietro il pilastro adiacente. Il primo colpo non attingeva il bersaglio; il secondo lo colpiva alla spalla destra. La persona offesa si riparava dietro il vano motore della propria vettura gridando.
In quel momento sopraggiungeva dalla rampa un condomino a bordo della propria auto; i fari illuminavano la scena e l'aggressore si dava alla fuga a piedi, risalendo la rampa d'uscita. Soccorsi allertati alle 22:33, ambulanza sul posto alle 22:42, ricovero alle 23:15.

**Rilievi**

- Due bossoli calibro 9 × 18 mm repertati sul piano di calpestio, a 1,5 m dal pilastro: arma semiautomatica. Trasmessi alla Sezione Balistica per comparazione con il fascicolo 98/0211 (Kyoto Station).
- Un proiettile deformato recuperato nel montante della vettura.
- Telecamera del parcheggio (VHS, qualità mediocre): riprende parzialmente un soggetto in giubbotto scuro imbottito e calzature sportive scure. Volto non rilevabile.

**Dichiarazioni dei testimoni**
Sig.ra Ueda, 62, int. 404: «Alle dieci e mezza, dieci e trentuno — guardavo il telegiornale — due botte, forti, che venivano su dalla tromba dell'ascensore, la porta era aperta al piano. Poi un uomo che gridava, giù nel garage. Ho chiamato il 119 subito, poi ho chiuso la porta a chiave.»
Sig. Hayama, 54, int. 702: «Sono rientrato alle dieci e trentadue, l'orologio della macchina. Scendendo la rampa i fari hanno preso un uomo in piedi vicino al posto B-04, e uno a terra dietro una Skyline. Quello in piedi si è girato ed è corso su per la rampa, mi è passato accanto: alto, sull'uno e ottanta, atletico, giubbotto scuro imbottito, scarpe da ginnastica scure, un cappello di lana. La faccia no: i fari erano miei e lui era controluce, ed è durato due secondi. Non ho visto la pistola. […] Riconoscerei il modo di correre, non il viso.»

**Identikit — allegato**
Maschio, età apparente 25–35 anni · statura 1,78–1,83 · corporatura atletica · giubbotto scuro imbottito, berretto di lana calzato, calzature sportive scure con suola scanalata · andatura a passi corti e rapidi, postura sportiva.
Volto: non descrivibile. Nessun tratto somatico utilizzabile. Nessun segno particolare visibile.
L'identikit è utilizzabile per esclusione e confronto, non per identificazione diretta.
Rilievo. La persona offesa risultava assente dal proprio domicilio dal 12/02 (verifiche in corso presso strutture alberghiere). Il rientro del 14 è durato pochi minuti. Nel cassetto del comodino, nel corso del successivo accesso, è stata rinvenuta una pistola Tokarev TT-33 illegalmente detenuta, mai esplosa, e contante per ¥600.000: elementi che inducono a ritenere che l'interessato si sapesse in pericolo.
Il redattore — Agente Yamada Tetsuo
Il Commissario — Taniguchi Osamu

---

## HANDOUT · H-15b_Identikit

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kanshiki-ka**
京 都 府 警 察 鑑 識 課

### IDENTIKIT — ALLEGATO AL RAPPORTO SO-98/0215-02
*Elaborato sulla descrizione del teste Sig. Hayama*

- **Elaborato**: 98/0215-A
- **Data**: 15/02/1998
- **Su descrizione di**: Sig. Hayama, 54 — interno 702
- **Redatto da**: Kanshiki-ka

`[FOTOGRAFIA: IMG-12_identikit.png]`

Identikit n. 98/0215-A — disegno a matita eseguito il 15/02/1998 in presenza del dichiarante. Non è una fotografia e non è un ritratto: è una ricostruzione.
Il dichiarante ha visto il soggetto controluce e per circa due secondi, dai fari della propria auto, e ha dichiarato che riconoscerebbe il modo di correre, non il viso. Il disegno riproduce quindi la struttura — mascella larga, collo corto e spesso, capelli rasati, corporatura atletica, età apparente 25–35 — e non i tratti. Un riconoscimento fondato su questo solo elaborato non ha valore: serve a escludere, a orientare le ricerche e a un confronto in sede di fermo.
Il rilevatore — Kanshiki-ka
Il responsabile — Ito Daisuke

---

## HANDOUT · H-16_Cassetta_Audio_Okubo

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kanshiki-ka, Settore fonico**
京 都 府 警 察 鑑識課 音声担当

### VERBALE DI TRASCRIZIONE FONICA
*Microcassetta rinvenuta presso l'abitazione di Ōkubo Kenji*

- **Protocollo**: KS-98/0216-03
- **Rinvenimento**: Sotto la terza tavola del parquet, soggiorno
- **Supporto**: Microcassetta 60', un solo lato inciso
- **Registrazione**: 12/01/1998 (dall'etichetta a matita)
- **Interlocutori**: 2 — voci maschili
- **Durata utile**: 1'48"

**Trascrizione**
[scatto di inserimento — registrazione avviata a conversazione già iniziata]

VOCE A  «…no, no. Sabato. Il ventiquattro.»
VOCE B  «Sabato. E allora?»
VOCE A  «Allora il primo piatto. La seconda salsa.»
VOCE B  «…la seconda.»
VOCE A  «La seconda. Duecento.»
VOCE B  «Duecento è tanto per una seconda salsa.»
VOCE A  «È quello che ti sto dicendo.»
VOCE B  [pausa 4"] «…e tu come lo sai?»
VOCE A  «Io non so niente. Metti duecento e non chiedere.»
VOCE B  «Ei-san. Io conto le cose. È il mio mestiere.»
VOCE A  «Conta anche questa, allora. Ma tieni la bocca chiusa,
         perché se conti troppo forte contiamo tutti e due.»
VOCE B  «…Duecento. E se va male?»
VOCE A  «Non va male.»
VOCE B  «Nessuno dice mai "non va male".»
VOCE A  «Io sì.»

[fine registrazione — interruzione manuale]

**Caratteristiche foniche**

- Voce A: maschile, 40–50 anni, tono basso, controllato, cadenza urbana. Comparata per via strumentale con il campione di raffronto costituito dall'annuncio di cortesia inciso sulla segreteria dell'utenza 075-641-2288, intestata alla persona offesa del fascicolo 98/0211 (esito: compatibile).
- Voce B: maschile, 40–50 anni, tono più alto, timbro rauco. Attribuibile al detentore del supporto.
- La registrazione è stata avviata a conversazione iniziata e interrotta a mano: chi registrava ha deciso di registrare quella telefonata, non le altre.
- L'appellativo «Ei-san» è il medesimo del messaggio in segreteria del 10/02 (verbale KS-98/0212-11), ma la voce è diversa.
Rilievo per la Squadra. Il contenuto è espresso in un lessico convenzionale: si parla di «primo piatto», «seconda salsa» e di un numero. Il riferimento a sabato 24 e la struttura del discorso sono sovrapponibili alla forma dell'inserzione pubblicitaria rinvenuta agli atti (reperto 07 e allegato fotostatico): confrontare con il menù promozionale della data indicata.
Il tecnico — settore fonico
Il responsabile — Ito Daisuke

---

## HANDOUT · H-17_Perquisizione_Hayashi

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### VERBALE DI PERQUISIZIONE E SEQUESTRO
*Locale abitazione — su mandato del Giudice del Tribunale distrettuale di Kyoto*

- **Mandato**: n. 98/218 — Trib. distr. di Kyoto
- **Richiesta**: Procura — Watanabe Hideo (procuratore)
- **Luogo**: Kameoka centro, int. 304
- **Nei confronti di**: HAYASHI Tomoki, 35
- **Data**: 16 febbraio 1998, ore 07:20
- **Presenti**: L'indagato · la convivente, quale persona presente

**Cose sottoposte a sequestro**

| N. | Luogo di rinvenimento | Descrizione |
|---|---|---|
| 1 | Doppiofondo del divano, soggiorno | ¥1.200.000 in contanti, tagli da ¥10.000, suddivisi in tre buste bianche non intestate |
| 2 | Parete doppia dell'armadio, camera | Telefono cellulare prepagato, senza intestazione. Rubrica: quattro voci, salvate per sigle |
| 3 | Pensile cucina, dietro le scatole del tè | Due chiavi di foggia particolare (doppia mappa), su anello privo di targhetta |
| 4 | Sotto il letto, scatola da scarpe | Fogli manoscritti: annotazioni di scommesse riferite ai cinque-sei mesi precedenti, con sigle e cifre |
| 5 | Cassettina sopra l'armadio | Coltello a serramanico, lama 8 cm · due cartucce cal. 9 × 18 mm, sfuse, mai camerate |

**Reperto 2 — contenuto della rubrica**
  1.  S.G.        090-****-**41
  2.  K.R.        090-****-**07
  3.  I.H.        0771-**-**63   [utenza fissa]
  4.  V2          06-****-**28   [prefisso Osaka]

  Chiamate in uscita conservate in memoria: 11 (dal 07/02 al 17/02)
Le sigle non sono di per sé riconducibili a persone identificate. Le utenze risultano intestate a schede prepagate anonime, salvo la terza (utenza fissa, area di Kameoka: identificazione in corso).
Le dichiarazioni della persona presente all'operazione sono state raccolte separatamente e in altro luogo: si rinvia al verbale di sommarie informazioni pari data.
Annotazioni per il fascicolo. Le assenze riferite dalla persona presente all'operazione sono verbalizzate per il riscontro con i fascicoli 98/0211 e 98/0214. Il calibro delle cartucce di cui al reperto 5 è annotato per il raffronto con la Sezione Balistica. Nessuna valutazione è rimessa a questo verbale.
Il verbalizzante — Agente Yamada Tetsuo
L'indagato / la persona presente all'operazione

---

## HANDOUT · H-17b_Deposizione_Suzuki_Yui

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### VERBALE DI SOMMARIE INFORMAZIONI
*Rese da persona informata sui fatti*

- **Verbale n.**: SO-98/0216-09
- **Data e ora**: 16/02/1998, ore 11:00
- **Luogo**: Centrale di Kawaramachi 85, 2° piano
- **Verbalizzante**: Agente Yamada Tetsuo
- **Deponente**: SUZUKI Yui, 28, commessa
- **Qualità**: Convivente dell'indagato

**Dichiarazione**
«Suzuki Yui, ventotto anni, commessa a Kameoka. Tomoki e io stiamo insieme da tre anni, conviviamo da due. Lui lavora per la società del signor Saitō — terreni, un ristorante, cose così; torna quasi sempre per cena.
Mercoledì undici è tornato alle sette, abbiamo mangiato, poi verso le otto e mezza ha detto ‘devo uscire per lavoro’ ed è rientrato alle undici e mezza, aveva fame, gli ho scaldato il riso.
Sabato quattordici è sceso ‘per le sigarette’ verso le nove e mezza ed è tornato dopo mezzanotte. Non ci ho fatto caso, fuma sempre.
Ha due telefoni: quello dell'azienda e uno piccolo ‘per il lavoro’, che tiene nell'armadio e usa in bagno con l'acqua aperta — pensavo a un'altra donna, mi vergogno a dirlo.
Negli ultimi giorni non dormiva. Lunedì sedici ha detto: ‘se qualcuno ti chiede di me, non sai niente’. È vero: non so niente. Cosa ha fatto?»
Annotazione del verbalizzante. La deponente è stata sentita in assenza della persona sottoposta a indagini, in separato locale e in altra sede rispetto alla perquisizione. Ha reso le dichiarazioni spontaneamente, senza che le fosse rappresentato l'oggetto del procedimento. Gli orari sono stati fatti precisare due volte e la deponente li ha confermati. Al termine ha chiesto se il compagno «tornerà a casa».
La deponente — Suzuki Yui
Il verbalizzante — Agente Yamada Tetsuo

---

## HANDOUT · H-18_Perquisizione_Kuroda_Balistica

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi e Sezione Balistica**
京 都 府 警 察 捜査第一課 ・ 銃器鑑定

### VERBALE DI SEQUESTRO E PERIZIA BALISTICA
*Locale abitazione — su mandato del Giudice del Tribunale distrettuale di Kyoto*

- **Mandato**: n. 98/221 — Trib. distr. di Kyoto
- **Luogo**: Monolocale, Fushimi-ku
- **Nei confronti di**: KURODA Ryō, 28
- **Perizia**: Sezione Balistica, 48 ore
- **Fascicoli**: 98/0211 · 98/0214
- **Esito perizia**: POSITIVO — vedi sotto

**Cose sottoposte a sequestro**

| N. | Rinvenimento | Descrizione |
|---|---|---|
| 1 | Bagno: intercapedine dietro la cassetta del WC, accessibile rimuovendo una piastrella | Pistola semiautomatica Makarov PM, cal. 9 × 18 mm, matricola abrasa, caricatore con 5 cartucce |
| 2 | Stesso vano | Scatolina con 5 cartucce cal. 9 × 18 mm di scorta |
| 3 | Sotto il letto | Calzature sportive Asics Gel, misura 27 cm, suola scanalata, usura marcata sull'avampiede |
| 4 | Scatola da scarpe, sotto il letto | ¥800.000 in banconote da ¥10.000, ancora nella fascetta di banca, numerazione consecutiva |
| 5 | Sotto una tavola del pavimento | Telefono cellulare prepagato: 4 sole chiamate ricevute, in date 10, 12, 14 e 16 febbraio, dalla medesima utenza |
| 6 | Idem | Coltello giapponese tipo tantō, in fodero laccato |
| 7 | Mensola | Quaderno di esercizi di calligrafia, compilato |

**Perizia balistica — comparazione**

| Elemento comparato | Provenienza | Esito |
|---|---|---|
| Bossolo cal. 9 × 18 — rinvenuto sotto l'orinatoio n. 2 in sede di secondo sopralluogo (verbale di rilievi integrativi del 12/02) | Fasc. 98/0211 — Kyoto Station | Impronta di percussore e di estrattore COINCIDENTI con l'arma reperto 1 |
| Due bossoli cal. 9 × 18 | Fasc. 98/0214 — Kamigyō | COINCIDENTI con l'arma reperto 1 |
| Due proiettili deformati (autopsia) | Fasc. 98/0211 | Striature di rigatura COINCIDENTI (4 righe, passo destrorso) |
| Proiettile dal montante dell'autovettura | Fasc. 98/0214 | COINCIDENTE |
| Suola reperto 3 / impronta su pavimento umido | Fasc. 98/0211 | Compatibile per disegno, misura e usura |
Conclusione della perizia. L'arma di cui al reperto 1 è la medesima che ha esploso i colpi in entrambi gli episodi. I due fatti sono collegati dall'arma. Le banconote del reperto 4 recano ancora nella fascetta di banca, che reca il timbro di filiale e la data: provengono da un unico prelievo allo sportello. Si è richiesta all'istituto l'identificazione dell'operazione.
Il mandato è limitato al locale abitazione. La palestra al piano terra dello stesso stabile, presso la quale il soggetto presta attività, non è stata perquisita: si è richiesta estensione. — Il soggetto, nell'immediatezza, ha dichiarato: «Non so. Non ricordo. Non c'ero.» e ha chiesto l'assistenza del difensore, rifiutando ogni ulteriore dichiarazione.
Il verbalizzante — Sez. Omicidi
Il perito — Sezione Balistica

---

## HANDOUT · H-19_Affari_Interni_Inagaki

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Ispettorato per gli Affari Interni**
京 都 府 警 察 ・ 監 察 官 室

### RELAZIONE CONCLUSIVA DI ACCERTAMENTO
*Riservata al Commissario della Sezione Omicidi*

- **Fascicolo**: AI-98/017
- **Apertura**: Su segnalazione della Sez. Omicidi
- **Accertamento**: 5 giorni
- **Oggetto**: Serg. INAGAKI Hiroshi, 47 — Stazione di Kameoka
- **Esteso a**: Ag. YAMAGUCHI Tetsuo, 32
- **Redattore**: Isp. Ogura Naomi

**Attività svolta**

- Tabulati dell'utenza privata del sottufficiale (ordine della Procura, evasione 24 ore).
- Ricostruzione dei movimenti bancari dell'interessato, ultimi 36 mesi (esibizione su ordine della Procura).
- Osservazione discontinua, 4 giornate, su abitazione e spostamenti fuori servizio.
- Esame dei registri di servizio, dei protocolli e delle richieste evase dalla Stazione di Kameoka.

**Esiti**

| Elemento | Riscontro |
|---|---|
| Traffico telefonico | Contatti ricorrenti e periodici con utenza prepagata anonima. Concentrazione, con cadenza mensile, nei giorni che precedono un sabato. Una chiamata entrante il 14/02 alle ore 23:05, durata 2'11" |
| Movimenti in contanti | Versamenti in contanti ricorrenti, mensili, di importo omogeneo, non riconducibili a emolumenti; complessivi stimati su 6 anni: oltre ¥14.000.000 |
| Osservazione diretta | Incontro in area di parcheggio di esercizio commerciale di Kameoka, il primo lunedì del mese, con soggetto identificato per targa. Ulteriore incontro fuori cadenza il 15/02, ore 10:00 |
| Attività d'ufficio | Tre richieste della Sezione Omicidi evase con ritardo non giustificato (24–48 ore) e instradate a ufficio incompetente. Segnalazioni di rumori molesti provenienti da area rurale archiviate senza accertamento per otto volte in due anni |
| Posizione dell'agente Yamaguchi | Versamenti analoghi, di importo minore, dal 1995. Nessuna iniziativa autonoma riscontrata |
Conclusioni. Sussistono elementi gravi e concordanti di corruzione continuata e favoreggiamento. Si trasmettono gli atti alla Procura per le determinazioni sul fermo, segnalando l'urgenza dell'esecuzione contestuale nei confronti di entrambi: l'accertamento ha evidenziato che il secondo è in grado di allertare terzi. Si raccomanda che nessuna comunicazione relativa a operazioni in programma nell'area di Kameoka transiti per quella Stazione fino a esecuzione.
Nota riservata al Commissario. Il sottufficiale ha chiesto per due volte, a colleghi della Sezione Omicidi, notizie sulle condizioni di una persona ricoverata, in data anteriore a qualsiasi comunicazione ufficiale o notizia di stampa. È l'elemento da cui questo Ispettorato ha preso le mosse.
L'Ispettore — Ogura Naomi
Ispettorato per gli Affari Interni

---

## HANDOUT · H-20_Quaderno_Visite_Murakami

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### ALLEGATO — QUADERNO SEPARATO
*Rinvenuto nello studio veterinario, cassetto chiuso a chiave*

- **Rinvenimento**: Scrivania, cassetto centrale
- **Chiave**: Nel cassetto laterale, sotto un libro
- **Periodo**: aprile 1997 – febbraio 1998
- **Registrazioni**: 31
- **Confronto**: Registro pazienti ufficiale: nessuna corrispondenza
- **Grafia**: Del titolare

**Trascrizione (estratto — ultime registrazioni)**

| Data | Sigla | Prestazione annotata | Compenso | Nota |
|---|---|---|---|---|
| 27/09/97 | K — 6 | Visita a domicilio, 4 capi | 60.000 | notturna |
| 25/10/97 | K — 7 | Visita a domicilio, 5 capi | 75.000 | notturna |
| 29/11/97 | K — 8 | Visita a domicilio, 5 capi · sutura | 90.000 | notturna |
| 27/12/97 | K — 9 | Visita a domicilio, 6 capi | 90.000 | notturna |
| 23/01/98 | K — 10 | Preparazione — 1 capo | — | vigilia |
| 24/01/98 | K — 10 | Visita a domicilio, 7 capi | 105.000 | notturna |
| 07/02/98 | K — 11 | Controllo, 3 capi | 45.000 | — |

**Osservazioni**

- Le prestazioni sono annotate senza nome del cliente e senza specie animale: unica indicazione, una sigla progressiva.
- Le voci con sigla «K» ricorrono una volta al mese, sempre di sabato, e sono qualificate come «notturne». Fanno eccezione due righe: quella del 23/01 (venerdì, «preparazione», senza compenso) e quella del 07/02 («controllo», diurna).
- I compensi sono in contanti e non figurano nella contabilità dell'esercizio né nelle dichiarazioni fiscali.
- La riga del 23 gennaio è l'unica senza compenso e l'unica riferita a un solo capo, il giorno prima di una visita notturna. La prestazione è indicata come «preparazione».
Nella cella frigorifera dello studio sono state repertate nove boccette integre di xilazina (sedativo per grandi animali). Il quantitativo è manifestamente sproporzionato rispetto alla clientela dichiarata dell'esercizio, costituita da animali d'affezione di piccola taglia. Il conto non torna: l'ultima bolla di carico (novembre 1997) ne indica undici; nove sono in cella e una, vuota, era sul tavolo del retrobottega accanto al cadavere. L'undicesima non è stata rinvenuta.
Il verbalizzante — Sez. Omicidi
Traduzione d'ufficio

---

## HANDOUT · H-21_Quaderno_Okubo

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### ALLEGATO — QUADERNO PERSONALE
*Rinvenuto nel cassetto della scrivania, abitazione di Kamigyō*

- **Detentore**: ŌKUBO Kenji, 41
- **Supporto**: Quaderno a righe, copertina rigida
- **Scrittura**: In chiaro, nessun codice
- **Periodo**: 1996 – febbraio 1998
- **Oggetto**: Contabilità personale
- **Nota**: Distinta dal registro dei prestiti

**Trascrizione — pagina di gennaio 1998**
  24/1  sabato

  per E.        2.000.000   (suoi)
  per me        3.000.000   (miei)
  ─────────────────────────
  quota 3        15.000.000
   a E.           6.000.000
   restano        9.000.000

  * la quota dello sfidante era troppo corta
    contro un gallo che non ha mai perso.
    qualcuno sapeva. io l'ho capito.
    non chiedere mai due volte.

  28/1  cassetta — 4.000.000  (Shinkin)
  2/2   il resto dove sai

**Rilievi**

- La pagina documenta un impiego complessivo di ¥5.000.000, di cui ¥2.000.000 «suoi» — riferiti a persona indicata con la sola iniziale «E.» — e ¥3.000.000 propri.
- Il rendimento indicato («quota 3») corrisponde a un rapporto di 3 a 1. L'importo restituito a «E.» è pari a tre volte la somma da questi conferita.
- L'annotazione a margine è la prova della consapevolezza: chi scrive dichiara di aver compreso che la quota offerta era anomala e di aver scommesso di conseguenza denaro proprio.
- Il riferimento del 28/1 indica il collocamento di ¥4.000.000 in una cassetta di sicurezza presso la Kyoto Shinkin Bank, istituto diverso da quello su cui l'interessato opera abitualmente: accertamenti in corso.
Rilievo per la Squadra. Il quaderno colloca l'interessato fuori dal ruolo di mero prestanome: ha compreso, ha taciuto e ha investito. È verosimilmente questa la ragione per cui il suo nome figura nell'elenco dei bersagli e non in quello dei testimoni.
Il verbalizzante — Sez. Omicidi
Il Commissario — Taniguchi Osamu

---

## HANDOUT · H-22_Visura_Kameoka_Noji

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Investigativa 2 (reati economici)**
京 都 府 警 察 捜 査 第 二 課

### RELAZIONE DI ACCERTAMENTO SOCIETARIO
*Con allegato certificato del Registro delle Imprese (法務局)*

- **Fascicolo**: SI2-98/044
- **Richiedente**: Sezione Omicidi — fasc. 98/0211
- **Fonti**: Registro Imprese · Registro Immobiliare · Kokuzei
- **Evasione**: 8 giorni
- **Oggetto**: KAMEOKA NŌJI K.K. 亀岡農事株式会社
- **Redattore**: Isp. Nagai Tsutomu

**A — Dal certificato del Registro delle Imprese (Ufficio Affari Giuridici di Kameoka)**

| Voce | Risultanza |
|---|---|
| Costituzione | 12 aprile 1986 — sede in Honmachi, Kameoka-shi |
| Capitale | ¥ 10.000.000 interamente versato |
| Oggetto | Commercio di macchine e prodotti agricoli; locazione di immobili |
| Amministratore unico | ŌMORI Kazuhiro, 64, dottore commercialista, Osaka — dal 1986 |
| Procuratore (支配人) | HAYASHI Tomoki, 35 — dal 03/03/1993 |
| Sindaco unico | Ōmori Sachie, 58, Osaka |
| Socio unico | TANBA SANGYŌ K.K. 丹波産業株式会社, Osaka |

**B — Certificato della società controllante**
Tanba Sangyō K.K., Osaka, costituita nel 1984, capitale ¥30 mln, oggetto: import-export di prodotti tessili. Amministratore unico: SAITŌ Gorō, 51, residente in Kameoka. Nessun dipendente iscritto.

**C — Registro immobiliare e accertamenti**

| Bene / rapporto | Estremi |
|---|---|
| Capannone agricolo, fraz. Sogabe-chō | Fg. 14 part. 233, intestato a Kameoka Nōji — acquisto 1988. Destinazione dichiarata: deposito, non in uso. Nessun ricavo dichiarato dal 1991; utenza elettrica attiva e polizza incendio in corso |
| Fabbricato commerciale, Honmachi | Intestato a Kameoka Nōji, acquisto 1992. Vi opera l'esercizio «Kameoka-tei», titolare TACHI Yūichirō, in forza di comodato |
| Villa, periferia est di Kameoka | Intestata a Kameoka Nōji, acquisto 1989. Occupata dall'amministratore della controllante |
| Ipoteca a favore di Kameoka Nōji | Su beni di Tachi Yūichirō, iscritta nel 1992 a garanzia di ¥28.000.000. Mai cancellata, mai escussa |
| Dati Kokuzei (ultimo esercizio) | Ricavi ¥41,2 mln · costi ¥38,9 mln · utile ¥2,3 mln · addetti dichiarati: 3. Fra i costi ricorrenti, fatturazione mensile dell'agenzia Sakura Kōkoku (Osaka) dal 1993 |
Conclusioni della Sezione. La società detiene l'immobile in cui opera un esercizio a essa formalmente estraneo, verso il cui titolare vanta da sei anni una garanzia mai escussa: la titolarità dell'esercizio è di fatto nominale. Il capannone di Sogabe-chō è improduttivo da sette anni e tuttavia mantenuto, assicurato e alimentato. Nessun atto societario reca la firma di SAITŌ Gorō, che compare solo come amministratore della controllante: il collegamento con l'operatività di Kameoka è, allo stato, documentalmente indiretto.
Il redattore — Isp. Nagai Tsutomu
Sezione Investigativa 2

---

## HANDOUT · H-23_Conto_Club_Aoyagi

`[RISERVATO]`
**CLUB AOYAGI — Kiyamachi-dōri, Nakagyō-ku**
ク ラ ブ 青 柳

### COPIA DI CONTO — ACQUISIZIONE AGLI ATTI
*Consegnata spontaneamente dalla direzione del locale*

- **Conto n.**: 0982
- **Data**: 2 febbraio 1998
- **Apertura tavolo**: ore 20:40
- **Chiusura**: ore 23:05
- **Tavolo**: n. 4
- **Coperti**: 2

| Descrizione | Q.tà | Importo |
|---|---|---|
| Coperto e servizio hostess (2 pers.) | 2 | 60.000 |
| Whisky giapponese, bottiglia (conto socio n. 0087) | 1 | 28.000 |
| Ghiaccio e acqua minerale | — | 3.000 |
| Frutta e stuzzichini | 2 | 9.000 |
| Karaoke, sala comune | — | — |
| TOTALE | ¥ 100.000 |
| Pagamento | Contanti |

**Dichiarazione della direttrice di sala**
«Il signor Tachibana veniva due o tre volte al mese, sempre da solo o con un uomo d'affari, sempre al tavolo quattro, whisky giapponese, mai un problema, pagava in contanti e lasciava bene.
Quella sera del due era con un uomo sui trent'anni, vestito casual, con le scarpe da ginnastica, che rideva troppo — non del nostro giro, un tipo da fuori città, direi dalle parti di Kameoka. Hanno parlato piano tutta la sera. Se n'è andato prima lui, verso le undici.
Il signor Tachibana negli ultimi due mesi era di buon umore, rilassato: si vedeva. L'ultima settimana un po' meno. Vi chiedo solo che il nome del locale resti fuori dai giornali.»
Annotazione. Il registro presenze del personale conferma che la hostess con nome d'arte «Mari» era in servizio la sera dell'11 febbraio dalle 19:00 alle 02:00, con riscontro di colleghi e clienti. La telefonata delle ore 22:14 alla segreteria dell'abitazione di Fushimi risulta effettuata dall'utenza fissa del locale.
Per la direzione del locale
Ricevuto: Sez. Omicidi

---

## HANDOUT · H-24_Lettera_1992

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### ALLEGATO — CORRISPONDENZA PRIVATA
*Consegnata spontaneamente dalla coniuge separata*

- **Consegnata da**: TACHIBANA Setsuko, 44
- **Luogo**: Abitazione di Maizuru
- **Supporto**: Carta da lettere, busta affrancata
- **Timbro postale**: Kyoto, 19 settembre 1992
- **Destinataria**: La moglie
- **Rilievo**: Contestuale, non probatorio
  Setsuko,

  scusami per il mese scorso. Avevi ragione tu e
  l'ho capito tardi, come al solito.

  Il locale ha ricominciato a camminare. Non ti dico
  come, ti dico solo che a Kameoka ho conosciuto
  persone che mi possono aiutare, e che per la prima
  volta da due anni dormo la notte.

  Non farmi domande quando torno. Fammi solo trovare
  la luce accesa.

                                          Eiji
                                  19 settembre 1992

**Dichiarazione della consegnante**
«Nel '92 ha rischiato di chiudere il locale, poi qualcosa è cambiato. È tornato da Kameoka con una macchina nuova e un sorriso che non mi piaceva. Da lì in avanti non gli ho più chiesto niente, ed è stato l'errore. Le lettere le ho tenute tutte. Non so perché.»
Valore. Il documento non ha valore probatorio diretto: colloca però al 1992 l'inizio del rapporto fra la persona offesa e ambienti dell'area di Kameoka, sei anni prima del fatto, e coincide con l'anno in cui la società Kameoka Nōji K.K. acquista l'immobile di Honmachi e concede il mutuo mai escusso a Tachi Yūichirō (cfr. certificato camerale).
Il verbalizzante — Sez. Omicidi
La consegnante

---

## HANDOUT · H-25_Ricevute_Sakura_Kokoku

`[RISERVATO]`
**SAKURA KŌKOKU K.K. — Agenzia pubblicitaria, Osaka**
桜 広 告 株 式 会 社

### ESTRATTO DELLE FATTURE EMESSE
*Riscontro a richiesta dell'Autorità Giudiziaria*

- **Cliente**: KAMEOKA NŌJI K.K.
- **Rapporto dal**: marzo 1993
- **Servizio**: Spazio pubblicitario su quotidiano
- **Testata**: Kyoto Shimbun — «Annunci ristorazione»
- **Periodicità**: Mensile
- **Pagamento**: Bonifico da c/c della società cliente

| Fattura | Data | Oggetto | Uscita | Importo |
|---|---|---|---|---|
| 97/1104 | 15/10/97 | Modulo 2 col. — «Ristorante Kameoka-tei» | 22/10/97 | 84.000 |
| 97/1237 | 18/11/97 | Modulo 2 col. — «Ristorante Kameoka-tei» | 26/11/97 | 84.000 |
| 97/1355 | 16/12/97 | Modulo 2 col. — «Ristorante Kameoka-tei» | 24/12/97 | 84.000 |
| 98/0071 | 14/01/98 | Modulo 2 col. — «Ristorante Kameoka-tei» | 21/01/98 | 84.000 |
| 98/0148 | 03/02/98 | Modulo 2 col. — «Ristorante Kameoka-tei» | 09/02/98 | 84.000 |

**Dichiarazione del responsabile clienti**
«È un cliente storico, dal '93, mai un problema di pagamento. Il testo ce lo dettano loro al telefono, sempre la stessa persona, sempre pochi giorni prima dell'uscita: noi impaginiamo e mandiamo in composizione. Non l'ho mai visto di persona. È l'unico cliente che non ha mai chiesto di cambiare la fotografia del locale in cinque anni: quella è sempre la stessa. Del menù, invece, cambiano ogni volta i piatti e le percentuali. Ci era parso strano, sì, ma il cliente paga e non discute.»
Rilievo. L'inserzione riguarda un esercizio (Kameoka-tei) formalmente estraneo alla società committente (Kameoka Nōji K.K.), che tuttavia ne sostiene per intero e da cinque anni il costo pubblicitario. Le prime quattro uscite precedono di tre giorni esatti la «promozione» pubblicizzata; l'ultima, quella del 9 febbraio, di tredici: unico scostamento in cinque anni di rapporto. La società committente non ha altre inserzioni attive per la propria attività.
Per Sakura Kōkoku K.K.
Ricevuto: Sez. Omicidi

---

## HANDOUT · H-26_Verbale_VHS_Telecamere

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kanshiki-ka, Settore audiovisivi**
京 都 府 警 察 鑑識課 映 像 担 当

### VERBALE DI ACQUISIZIONE E VISIONE
*Impianto di videosorveglianza — Kyoto Station*

- **Protocollo**: KS-98/0213-08
- **Acquisizione**: 12/02/1998, direzione di stazione
- **Supporto**: Nastri VHS, registrazione a 24 h
- **Impianto**: 24 telecamere, b/n, 3 fotogrammi/sec
- **Nastri acquisiti**: 9 — le telecamere sui percorsi utili
- **Visione**: 13/02, ore 09:00–18:00

**Esito della visione — telecamera CAM-12 (corridoio sud, 3° piano)**

| Ora | Contenuto |
|---|---|
| 21:14 | Transita verso i servizi un uomo in abito scuro con valigetta rigida (corrisponde, per abbigliamento, al teste sentito al Kōban) |
| 21:17 | Transita verso i servizi un uomo in cappotto chiaro, solo. Riconosciuto per abbigliamento come la persona offesa |
| 21:20 | Transita nella stessa direzione un secondo uomo: berretto di lana calzato, giubbotto scuro imbottito, guanti, borsa a tracolla scura. Andatura a passi corti e rapidi. Ripreso da tergo |
| 21:22 | Il medesimo soggetto transita in senso inverso. Nessuna variazione di andatura. La borsa appare portata più aderente al corpo |
| 21:26 – 22:01 | Nessun transito verso i servizi |
| 22:01 | Esce dai servizi un uomo che si arresta, si piega, quindi si allontana correndo (corrisponde al teste) |

**Qualità e limiti**

- Registrazione VHS a lunga durata: 3 fotogrammi al secondo, bianco e nero, forte compressione di contrasto. Il volto non è rilevabile in alcun fotogramma.
- Utilizzabili: corporatura (statura stimata 1,78–1,83, complessione atletica), abbigliamento, andatura.
- Il fermo immagine di miglior qualità (21:20) è allegato in stampa fotografica.
Esito della visione delle restanti telecamere. NEGATIVO. Sono stati visionati integralmente i nastri delle telecamere di atrio, scale mobili, varchi e biglietterie per l'intera fascia oraria. Le inquadrature sono panoramiche su aree affollate: alla risoluzione dell'impianto un singolo soggetto occupa pochi punti immagine. Non è possibile seguire il percorso del soggetto né in entrata né in uscita dalla stazione, e nessun altro fotogramma aggiunge elementi a quelli sopra descritti. Ulteriori richieste di visione su questo impianto sono da ritenersi non produttive.
La telecamera posta all'ingresso dei servizi del 3° piano è fuori servizio dal 9 febbraio. Acquisito il rapporto di manutenzione della società appaltatrice: guasto all'alimentatore, segnalato il 9/02 alle ore 07:40, ricambio ordinato, sostituzione programmata per il 16/02. Nessuna anomalia di natura dolosa.
Il tecnico — settore audiovisivi
Il responsabile — Ito Daisuke

---

## HANDOUT · H-26b_Foto_CAM12

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Kanshiki-ka**
京 都 府 警 察 鑑 識 課

### ALLEGATO FOTOGRAFICO — FERMO IMMAGINE
*Telecamera CAM-12, corridoio sud del 3° piano*

- **Fotogramma**: KS-98/0213-08
- **Ora**: 11/02/1998, 21:20
- **Supporto**: VHS, 3 fotogrammi/sec, b/n
- **Trattamento**: Nessuno: stampa diretta

`[FOTOGRAFIA: AssassinoArrivaStazione.png]`

Fermo immagine delle ore 21:20 dell'11/02/1998 — stampa dal nastro VHS, ingrandimento massimo utile.
Il volto non è rilevabile in alcun fotogramma della sequenza. Sono utilizzabili la corporatura (statura stimata 1,78–1,83), l'abbigliamento (berretto di lana, giubbotto scuro imbottito, guanti, borsa a tracolla scura) e l'andatura. Ogni ulteriore trattamento del fotogramma non aggiunge dettaglio: alla risoluzione dell'impianto l'ingrandimento produce solo grana.
Il rilevatore — Kanshiki-ka
Il responsabile — Ito Daisuke

---

## HANDOUT · H-27_Registro_Taxi_Hozu

`[RISERVATO]`
**HOZU TAXI — Kameoka**
保 津 タ ク シ ー

### ESTRATTO DEL REGISTRO CORSE
*Copia consegnata spontaneamente dal titolare*

- **Impresa**: Hozu Taxi — impresa familiare
- **Vetture**: 6
- **Periodo**: maggio 1997 – febbraio 1998
- **Recapito**: 0771-22-3030
- **Consegnato il**: 18 febbraio 1998
- **Nota**: Registro tenuto a mano, per turno

**Corse notturne (22:00–04:00) — totale mensile e giornate di picco**

| Mese | Corse notturne | Media/notte | Giornata di picco | Corse in quella notte |
|---|---|---|---|---|
| maggio 1997 | 61 | 2,0 | sab 24 | 29 |
| giugno 1997 | 58 | 1,9 | sab 28 | 31 |
| luglio 1997 | 66 | 2,1 | sab 26 | 27 |
| agosto 1997 | 72 | 2,3 | sab 30 | 33 |
| settembre 1997 | 60 | 2,0 | sab 27 | 30 |
| ottobre 1997 | 64 | 2,1 | sab 25 | 34 |
| novembre 1997 | 59 | 2,0 | sab 29 | 32 |
| dicembre 1997 | 88 | 2,8 | sab 27 | 35 |
| gennaio 1998 | 57 | 1,8 | sab 24 | 36 |
| febbraio 1998 | — | — | — | — |

**Dettaglio di una giornata di picco — sabato 24 gennaio 1998**

| Ora | Da | A | Importo |
|---|---|---|---|
| 22:10 | Stazione JR Kameoka | Sogabe — incrocio strada dei campi | 1.400 |
| 22:15 | Parcheggio Honmachi | Sogabe — incrocio strada dei campi | 1.600 |
| 22:22 | Stazione JR Kameoka | Sogabe — incrocio | 1.400 |
| 22:31 | Parcheggio comunale | Sogabe — incrocio | 1.600 |
| […] altre 14 corse in salita con la medesima destinazione, fra le 22:00 e le 23:30 […] |
| 02:40 | Sogabe — incrocio | Stazione JR Kameoka | 1.400 |
| 03:05 | Sogabe — incrocio | Parcheggio Honmachi | 1.600 |
| […] altre 16 corse di rientro dalla medesima località, fra le 02:30 e le 03:40 […] |
| Totale della notte | 36 |
Ripartizione: 18 corse in salita (22:00–23:30) e 18 di rientro (02:30–03:40). Con sei vetture e un percorso di circa dieci minuti per tratta, è il massimo che l'impresa può produrre in una notte.

**Dichiarazione del titolare**
«Sono giornate buone, una al mese, sempre di sabato — a dicembre due. Li carichiamo alla stazione o ai parcheggi del centro e li scarichiamo all'incrocio della sterrata, mai davanti: dicono che fanno due passi. Pagano in contanti e non vogliono la ricevuta, mai uno. Ripassiamo a prenderli fra le due e mezza e le tre e mezza. Cosa ci vanno a fare non gliel'ho mai chiesto: mio padre diceva che il taxi porta, non domanda. Quest'anno la giornata migliore è stata il ventiquattro di gennaio: trentasei corse con sei macchine, abbiamo fatto le tre di notte tutti quanti.»
Rilievo. Le giornate di picco cadono tutte di sabato e coincidono, mese per mese, con le date delle «promozioni speciali» pubblicizzate sul quotidiano dall'esercizio Kameoka-tei. Nessuna giornata di picco risulta registrata in febbraio alla data di consegna del presente estratto.
Il titolare — Hozu Taxi
Ricevuto: Sez. Omicidi

---

## HANDOUT · H-28_Cassetta_Sicurezza_0419

`[RISERVATO]`
**POLIZIA PREFETTURALE DI KYOTO — Sezione Omicidi**
京 都 府 警 察 捜 査 第 一 課

### VERBALE DI APERTURA E INVENTARIO
*Cassetta di sicurezza n. 0419 — Banca Sanwa, filiale di Gion*

- **Mandato di sequestro**: n. 98/236 — Trib. distr. di Kyoto
- **Esecuzione**: 20 febbraio 1998, ore 10:00
- **Intestatario**: TACHIBANA Eiji (deceduto)
- **Apertura**: Doppia chiave + sigillo registrato
- **Presenti**: Il direttore di filiale · ufficiali di P.G.
- **Contenuto**: 3 voci

**Modalità di apertura**
La cassetta è stata aperta con la chiave del cliente (reperto 18 del fasc. 98/0211, rinvenuta sotto la soletta della scarpa destra della persona offesa) unitamente alla chiave di banca. L'apertura è avvenuta in forza del mandato. Il sigillo personale registrato (inkan) dell'intestatario, rinvenuto nel cassetto 4 dello schedario dell'abitazione di Fushimi, è stato esibito e riscontrato conforme allo specimen depositato all'apertura del rapporto in data 3 marzo 1993, ai soli fini della verifica di titolarità.
L'istituto ha rappresentato che, in assenza del mandato, l'apertura sarebbe stata possibile su istanza dell'erede legittima, previa produzione del certificato di morte e dell'atto notorio: strada che avrebbe richiesto tempi analoghi.

**Inventario**

| N. | Descrizione | Annotazione |
|---|---|---|
| 1 | Denaro contante — ¥ 35.000.000 | Banconote da ¥10.000 in 35 mazzette fascettate. Fascette di tre istituti diversi. Trasmesso alla Polizia Tributaria (Kokuzei) |
| 2 | Registro rilegato, 214 pagine manoscritte, anni 1993–1998 | Contabilità di attività di raccolta di scommesse: nominativi per esteso, date, importi impegnati, quote, importi liquidati. Nessun codice |
| 3 | Polizza vita e atto di proprietà dell'immobile di Fushimi | Beneficiaria della polizza: la coniuge |

**Reperto 2 — struttura del registro**

- Una sezione per anno; ogni riga: data della serata · nome per esteso del cliente · importo impegnato · quota · liquidato.
- Risultano ventidue nominativi ricorrenti nell'ultimo triennio, dei quali sei con movimentazione continuativa. Fra questi figurano nominativi non presenti nel registro chiamate del telefono cellulare.
- Volume complessivo movimentato nell'ultimo esercizio: ¥ 118.400.000.
- Non compaiono nominativi di organizzatori, luoghi, né riferimenti a società: il registro documenta la clientela, non la struttura che organizzava gli incontri.

**Registro degli accessi alla cassetta (estratto)**

| Data | Accesso |
|---|---|
| 28/10/1997 | Intestatario |
| 02/12/1997 | Intestatario |
| 29/12/1997 | Intestatario |
| 02/02/1998 | Intestatario — ultimo accesso in vita, nove giorni prima del decesso |
Rilievo. Gli accessi seguono di pochi giorni le date delle serate. L'ultimo, del 2 febbraio, è successivo alla serata del 24 gennaio: l'intestatario stava mettendo al riparo il ricavato. Chi teme per la propria incolumità non deposita: preleva. Alla data del 2 febbraio la persona offesa non si riteneva in pericolo.
Il verbalizzante — Agente Yamada Tetsuo
Il direttore di filiale — Banca Sanwa

---

## HANDOUT · TOKEN_PNG_CrimeBoard

**CRIME BOARD — SCHEDE PERSONE**
京 都 府 警 察 ・ 捜 査 第 一 課

### TOKEN DA TAVOLO (1/2)
*Si consegnano al gruppo mano a mano che i PG incontrano o identificano la persona. Si ritagliano lungo il bordo e si appendono alla lavagna.*

`[FOTOGRAFIA: rit_tachibana.png]`

TACHIBANA Eiji
La vittima
47 · gestore del Kōrin, Gion

`[FOTOGRAFIA: rit_watanabe.png]`

WATANABE Toshio
Testimone
31 · impiegato, era nel bagno

`[FOTOGRAFIA: rit_setsuko.png]`

TACHIBANA Setsuko
Moglie della vittima
44 · separata, vive a Maizuru

`[FOTOGRAFIA: rit_mariko.png]`

AOYAGI Mariko
Hostess «Mari», Club Aoyagi
29 · abita a Sakyō

`[FOTOGRAFIA: rit_murakami.png]`

MURAKAMI Saburō
Veterinario
52 · clinica di Yamashina

`[FOTOGRAFIA: rit_hiroko.png]`

MURAKAMI Hiroko
Moglie del veterinario
49 · Yamashina

`[FOTOGRAFIA: rit_aiko.png]`

MURAKAMI Aiko
Figlia del veterinario
15 · terza media

`[FOTOGRAFIA: rit_yusuke.png]`

MURAKAMI Yūsuke
Figlio del veterinario
19 · studente a Tokyo

`[FOTOGRAFIA: rit_okubo.png]`

ŌKUBO Kenji
Prestatore di denaro
41 · Kamigyō

`[FOTOGRAFIA: rit_sasaki.png]`

SASAKI Hideo
Sala pachinko, Kawaramachi
44 · amico di golf della vittima

`[FOTOGRAFIA: rit_nishimura.png]`

NISHIMURA Tatsuya
Cameriere del Kōrin
36 · da 9 anni nel locale

`[FOTOGRAFIA: rit_saito.png]`

SAITŌ Gorō
Imprenditore, Kameoka
51 · import-export tessile

`[FOTOGRAFIA: rit_hayashi.png]`

HAYASHI Tomoki
Impiegato, Kameoka
35 · società del sig. Saitō

`[FOTOGRAFIA: rit_kuroda.png]`

KURODA Ryō
Istruttore di pugilato
28 · palestra di Fushimi

`[FOTOGRAFIA: rit_inagaki.png]`

INAGAKI Hiroshi
Sergente, Polizia di Kameoka
47 · 25 anni di servizio

`[FOTOGRAFIA: rit_yamaguchi.png]`

YAMAGUCHI Tetsuo
Agente, Polizia di Kameoka
32

---

## HANDOUT · TOKEN_PNG_CrimeBoard_2

**CRIME BOARD — SCHEDE PERSONE**
京 都 府 警 察 ・ 捜 査 第 一 課

### TOKEN DA TAVOLO (2/2)
*Gli ultimi riquadri sono volutamente anonimi: servono per le persone che i PG conoscono prima di darle un nome — a cominciare dall'uomo ripreso dalla telecamera del corridoio.*

`[FOTOGRAFIA: rit_tachi.png]`

TACHI Yūichirō
Titolare del Kameoka-tei
62 · ristorante di Kameoka

`[FOTOGRAFIA: rit_tachi_reiko.png]`

TACHI Reiko
Alla cassa del Kameoka-tei
58 · moglie del titolare

`[FOTOGRAFIA: rit_yui.png]`

SUZUKI Yui
Compagna di Hayashi
28 · commessa a Kameoka

`[FOTOGRAFIA: rit_mamasan.png]`

Mama-san REIKO
Direttrice di sala, Club Aoyagi
48

`[FOTOGRAFIA: rit_hashimoto.png]`

HASHIMOTO Daisuke
Impiegato, Osaka
38

`[FOTOGRAFIA: rit_fujiwara.png]`

FUJIWARA Kentarō
Imprenditore tessile, Osaka
56

`[FOTOGRAFIA: rit_inoue.png]`

INOUE Takeshi
Ristoratore, Pontochō
49 · «Hanaichi»

`[FOTOGRAFIA: rit_yoshida.png]`

YOSHIDA Mamoru
Impresa edile, Uji
45

`[FOTOGRAFIA: rit_kimura.png]`

KIMURA Akira
Dentista, Sakyō
42

`[FOTOGRAFIA: rit_tanaka.png]`

TANAKA Shōji
Pensionato, ex Kyocera
67

`[FOTOGRAFIA: rit_ueda.png]`

Sig.ra UEDA
Vicina di casa, Kamigyō
62 · int. 404

`[FOTOGRAFIA: rit_hayama.png]`

Sig. HAYAMA
Vicino di casa, Kamigyō
54 · int. 702

`[FOTOGRAFIA: rit_mori.png]`

MORI Sachiko
Addetta alle pulizie, stazione
62

`[FOTOGRAFIA: AssassinoArrivaStazione.png]`

SCONOSCIUTO
L'uomo della telecamera
Berretto, giubbotto scuro, borsa

?
SCONOSCIUTO
Da identificare
 

?
SCONOSCIUTO
Da identificare


====================================================================================================

# PARTE 6 — Indice degli handout e note per il GM

# Handout — «Omicidio Kyoto Station 1998»

**35 handout + 2 pagine di token**, uno per file, **ognuno in una sola pagina A4** (verificato: nessuno sfora).
Rivisti a fondo il 2026-09-11 da quattro controlli incrociati (coerenza interna · schede PNG e Luoghi · Storia
Completa · epoca e quadro legale giapponese): 68 rilievi, tutti applicati salvo le tre questioni di nomi qui sotto.

**Le fotografie ci sono** (2026-09-11): i token portano il **ritratto stampato** — non c'è più niente da ritagliare
e incollare — e tre handout hanno il loro allegato fotografico vero (H-02c il disegno, H-12b lo studio del
veterinario, H-15b l'identikit). Tutte le immagini, con la didascalia e dove finiscono, stanno in
**`../Immagini/_GALLERIA.html`**: aprila nel browser, è l'indice visivo.

## Come si stampa tutto in una volta

Apri **`_STAMPA_TUTTI.html`**: contiene tutti i documenti in fila, con l'interruzione di pagina già impostata.
- **Per stampare subito**: aprilo nel browser → Stampa → margini «Nessuno» → esce un documento per foglio.
- **Per portarlo in Word**: apri Word → *Apri* → scegli `_STAMPA_TUTTI.html` (o trascinacelo dentro). Word tiene le
  interruzioni di pagina e le tabelle. Poi salvi come .docx e stampi da lì.
- I singoli file servono se vuoi ristampare **un solo** documento durante la partita.

Se qualcosa va storto in Word: stampa dal browser in PDF (`_STAMPA_TUTTI.html` → Salva come PDF) e stampa il PDF.

## Quando si consegnano

| # | Handout | Quando |
|---|---|---|
| H-01 | Rapporto del Kōban | **Briefing 12/02** |
| H-01b | *Foto: la porta coi tre fori* (il retro di H-01) | **Briefing 12/02** |
| H-02 | Verbale reperti della Scientifica (24 voci) | **Briefing 12/02** |
| H-02b | *Foto: i reperti sul telo* (il retro di H-02) | **Briefing 12/02** |
| H-02c | *Foto: la figura tracciata col sangue* (reperto 21) | **Briefing 12/02** |
| H-03 | Prima testimonianza di Watanabe Toshio (testimone) | **Briefing 12/02** |
| H-04 | Scheda anagrafica della vittima | **Briefing 12/02** |
| H-05 | Autopsia Tachibana (vittima) | 12–13/02, su richiesta |
| H-06 | Tabulato delle 10 chiamate del cellulare | Dal 13/02, con ordine del procuratore (24 h) |
| H-07 | Kyoto Shimbun del 9/02 — la pagina con l'annuncio | Subito: era in tasca alla vittima |
| H-08 | I 4 annunci d'archivio (ott '97 – gen '98) | Perquisizione dell'appartamento di Fushimi |
| H-09 | Taccuino della vittima | Reperto, dal briefing in poi |
| H-10 | Lista clienti dalla cassaforte (**la chiave del codice**) | Solo con il codice 0418 (da Mariko, l'amante) |
| H-11 | Trascrizione della segreteria telefonica | Perquisizione di Fushimi |
| H-12 | Primo verbale su Murakami (veterinario) — «suicidio» | 13/02 se ci vanno, altrimenti **16/02** |
| H-12b | *Foto: il retrobottega dello studio* (il retro di H-12) | Con H-12 |
| H-13 | Autopsia Murakami — **è omicidio** | 14/02 |
| H-14 | Estratti conto di Murakami | ~16/02, banca con ordine |
| H-15 | Tentato omicidio di Ōkubo (usuraio) + identikit | 15/02 |
| H-15b | *L'identikit disegnato* (il retro di H-15) | Con H-15 |
| H-16 | Trascrizione della cassetta audio di Ōkubo | Perquisizione di Kamigyō |
| H-17 | Perquisizione a casa di Hayashi (braccio destro) | Con mandato |
| H-17b | Deposizione di Suzuki Yui (la compagna) — **è lei che smonta l'alibi** | Sentita a parte, in Centrale |
| H-18 | Perquisizione a casa di Kuroda + **balistica** | Con mandato — è la prova che chiude |
| H-19 | Rapporto degli Affari Interni su Inagaki | 5–7 giorni dopo la segnalazione |
| H-20 | Quaderno «visite a domicilio» di Murakami | Studio veterinario |
| H-21 | Quaderno personale di Ōkubo | Casa di Kamigyō |
| H-22 | Visura della Kameoka Nōji K.K. | 5–10 giorni, Sezione Frodi |
| H-23 | Conto del Club Aoyagi del 2/02 | Dal locale |
| H-24 | Lettera del 1992 a Setsuko | Da Setsuko, se trattata bene |
| H-25 | Ricevute dell'agenzia pubblicitaria | Con richiesta all'agenzia |
| H-26 | Verbale VHS delle telecamere — **chiude la sottotrama** | Quando chiedono i filmati |
| H-26b | *Foto: il fermo immagine della CAM-12* (il retro di H-26) | Con H-26 |
| H-27 | Registro corse della Hozu Taxi | Quando arrivano ai taxi di Kameoka |
| H-28 | Apertura della cassetta di sicurezza 0419 | **Fine avventura**: chiave + inkan + mandato |

## Token per la crime board

`TOKEN_PNG_CrimeBoard.html` e `..._2.html` — 32 riquadri, 16 per pagina, **con la fotografia già stampata**.
Ogni token porta **solo quello che i PG sanno quando glielo consegni**: nessuno dice «sicario» o «capo della banda».
Saitō è «Imprenditore, Kameoka», Kuroda «Istruttore di pugilato», Hayashi «Dipendente Kameoka Nōji».
Gli ultimi tre sono anonimi (`?`) per le persone che i PG conoscono prima di avere un nome — compreso
**«L'uomo della telecamera»**, che porta il fermo immagine della CAM-12.

I 29 ritratti sono in `../Immagini/Ritratti/`, tutti nella **stessa posa e stessa luce** (foto tessera, Giappone
1998, fondo grigio): guardandoli in fila **non si capisce chi è un criminale**, che è il punto. Se ti serve
ristampare un solo token, il file è quello.

## Il codice del giornale (per il GM)

Piatto = combattimento · **le due salse = i due galli** (primo = gallo di casa, secondo = sfidante) ·
**sconto % = quota dello sfidante**.
La catena da leggere confrontando H-08 e H-07: il gallo di casa **Wasabi** (<span>山葵</span>) vince a ottobre
(sfidante a 5%), novembre (6%), dicembre (7%) — poi a **gennaio lo sfidante è dato 3%** e Wasabi **perde**.
Nel cartellone del 22 febbraio Wasabi **non c'è più**, e c'è **Kurozu** (<span>黒酢</span>, l'aceto nero) che lo aveva
battuto. Il salto 5→6→7→**3** è l'anomalia che aveva insospettito Ōkubo, ed è visibile a occhio nudo.

## Tre avvertenze prima di sederti al tavolo

1. **Il bossolo sotto l'orinatoio.** H-01 dice che al primo giro non è stato trovato — ed è giusto: lo trovano i PG
   (o Ito, se glielo chiedono). H-18 lo dà per acquisito «in sede di secondo sopralluogo». **Se i PG non lo cercano
   mai, quella riga della perizia non esiste**: il collegamento balistico regge lo stesso sui due bossoli di Kamigyō,
   ma l'omicidio della stazione resta senza prova d'arma. Vale la pena che qualcuno torni in quel bagno.
2. **La ditta 田中商事 «Tanaka Shōji» è una falsa pista voluta.** Nel taccuino (H-09) è un codice di comodo che in
   H-10 corrisponde a **un'altra persona**; il cliente vero che si chiama Tanaka Shōji è codificato come 大原不動産.
   I nomi delle ditte sono arbitrari — H-09 lo dice espressamente — ma i giocatori ci cascheranno: è il punto.
3. **H-10 non fa i nomi.** Dà codici, le ultime quattro cifre dei recapiti e le note a margine: cinque persone si
   identificano incrociando col tabulato (H-06), le altre quattro no. **I nomi per esteso arrivano solo con H-28**,
   la cassetta di sicurezza, a fine avventura. È voluto: è il premio di quel filone.

## Omonimie

- ✅ **Risolta (2026-09-11)**: il figlio del veterinario, che si chiamava Murakami Kenji con gli **stessi kanji** di
  Ōkubo Kenji (健次), è ora **Murakami Yūsuke** (村上 裕介). Cambiato ovunque: schede, Storia, luoghi, token.
- ✅ **Non è un problema** (decisione dell'autore, 2026-09-11): **Yamaguchi Tetsuo** (l'agente corrotto) e **Yamada
  Tetsuo** (l'agente della squadra) condividono il nome proprio, ma **al tavolo i personaggi si chiamano sempre per
  cognome**, quindi non si confondono. Sui token i kanji sono comunque distinti (山口 鉄雄 / 山田 哲夫).

## Contenuti inventati in questa passata — da rileggere

- I nomi dei galli (le salse) e i menù dei cinque annunci.
- Il codice del taccuino: le ragioni sociali sono **codici di comodo**, nessuna delle ditte esiste — la corrispondenza
  con le persone vere sta **solo in H-10** (per questo la cassaforte conta).
- Il dialogo della cassetta audio (H-16): *«il primo piatto, la seconda salsa, duecento»*.
- I numeri di telefono (075- Kyoto, 0771- Kameoka, 090- cellulari) e i protocolli dei verbali.
- Nomi minori nuovi: **Harada Kōhei** (agente del Kōban), **Kubota Jun** (Yamashina), **Hozu Taxi**, **Sakura Kōkoku**,
  e le ditte di comodo del taccuino. Da segnalare al `GENKAI_Registro_Nomi.md`.

## Rigenerare

Lo script sta nello scratchpad della sessione (`genera_handout.py`). Se cambia un dato del canone, si modifica lì
e si rigenera tutto in un colpo.


====================================================================================================

# PARTE 7 — Piano di produzione (handout e immagini)

# Piano handout e immagini — Avventura Tra Galli

> Proposta della sessione TRAGALLI (2026-08-24), da approvare/tagliare prima della produzione.
> Formato handout: **HTML numerati** stile Sake/Ultima Lezione (dark/print), in italiano.
> Regole di produzione (Manuale GM): documento **pre-elaborato** come lo produrrebbe un professionista
> vero · ogni handout contiene **solo ciò che conterrebbe nella realtà** · almeno **1 nota utile + 1 neutra**,
> **mai** nulla che dica il colpevole · tabulati nel formato canonico del manuale.

---

## A. HANDOUT

### Nucleo — i materiali del briefing (12/02 ore 08:00, consegnati da Taniguchi — scena in `Inizio - Incarico.md`)

1. **H-01 · Rapporto preliminare del Kōban — Kyoto Station** — Verbale di primo intervento dell'11/02 sera (segnalazione 22:01, pattuglia 22:08, squadra omicidi 22:35), stato della scena, area transennata. *(Storia §20, Luogo Scena §Dinamica)*
2. **H-02 · Verbale reperti della Scientifica — effetti personali di Tachibana (vittima)** — Elenco repertato: portafoglio con ¥180.000, cellulare mova, taccuino, Kyoto Shimbun del 9/02 piegato, due biglietti Kyoto Kōtsū di sola andata (14:30 e 18:30), conto dello Shin-Miyako Hotel, ricevuta Royal Hotel 7-8/02, tessera Club Aoyagi, biglietto da visita di «Mari», polaroid, Lexotan, chiavetta n. 0419 sotto la soletta. Nota Scientifica su piuma e gabbia nel bagagliaio della Crown. *(Scheda vittima §Effetti)*
3. **H-03 · Prima testimonianza di Watanabe Toshio (testimone)** — Verbale del Kōban, notte dell'11/02: la sequenza sonora al secondo (passi, sneaker che cigolano, 3 colpi, suono metallico, fuga), niente di visto. *(scheda di Watanabe Toshio (testimone) — §Cosa ha sentito)*
4. **H-04 · Scheda anagrafica della vittima** — Tachibana Eiji (vittima), 47: gestore del locale Kōrin a Gion, separato, incensurato, la facciata pulita. *(Scheda vittima §Anagrafica/Vita pubblica)*

### Nucleo — i documenti della vittima

5. **H-05 · Referto autopsia Tachibana** (12-13/02) — 3 colpi cal. 9×18 al torace attraverso la porta, sparo a contatto/quasi, morte in pochi secondi, orario compatibile 21:20-21:25. Nota del medico legale in calce (canone: «dice dove guardare»).
6. **H-06 · Registro 10 ultime chiamate del cellulare** (da ~13/02, con ordine del procuratore) — I 10 numeri identificati con intestatario, conteggio e fasce orarie, formato tabulato canonico. È lo **snodo che apre il cast**. *(Storia §22)*
7. **H-07 · Kyoto Shimbun del 9 febbraio 1998 — pagina «Annunci ristorazione»** — La pagina intera con l'annuncio del Kameoka-tei («Promozione speciale del 22 febbraio», 7 piatti dai nomi poetici, sconti %) **in mezzo ad altri annunci innocui**: il codice va notato, non consegnato. *(Storia §4, Luogo Kameoka-tei §Sistema annunci)*
8. **H-08 · Archivio annunci ottobre '97 – gennaio '98** — I 4 ritagli mensili affiancati (dallo schedario di Fushimi), gennaio con cerchiatura a matita: il pattern diventa visibile. *(Luogo Fushimi §Studio)*
9. **H-09 · Taccuino di Tachibana (vittima)** — Le pagine superstiti riprodotte: combattimento di gennaio in codice + appunti sul prossimo incontro. La **chiave di decifrazione** di annunci, lista clienti e cassetta. *(Storia §21, §32)*
10. **H-10 · Lista clienti cifrata** (cassaforte di Fushimi, codice 0418 via Mariko) — 2 pagine manoscritte: sigle, cifre, quote. Leggibile solo incrociando col taccuino. *(Luogo Fushimi §Cassaforte)*
11. **H-11 · Trascrizione messaggi in segreteria** — I 2 messaggi: Hayashi 10/02 18:42 (*«Ei-san, sono io. Domani come d'accordo»*) e Mariko 11/02 22:14. Con nota tecnica per il riconoscimento vocale futuro. *(Luogo Fushimi §Soggiorno)*

### Nucleo — il secondo omicidio

12. **H-12 · Primo verbale su Murakami** (Polizia di Yamashina, 13/02 sera) — Ritrovamento delle 16:30, boccetta e siringa sul tavolo, **ipotesi suicidio/overdose**: il depistaggio che regge un giorno. *(Luogo Studio §Scena)*
13. **H-13 · Referto autopsia Murakami** (14/02 mattina) — Xilazina 5× la dose letale, ematoma da contenimento al collo: **omicidio mascherato da suicidio**. Il documento che salda i due morti. *(Storia §24)*
14. **H-14 · Estratti conto di Murakami (veterinario)** — Il debito che si azzera tra il 28 e il 30 gennaio, i movimenti Lake Biwa alle spalle. *(Luogo Studio §Indizi)*

### Nucleo — Ōkubo e la chiusura

15. **H-15 · Rapporto tentato omicidio Ōkubo + identikit allegato** (15/02) — Dinamica del parcheggio, 2 colpi, 2 bossoli 9×18 repertati (collegamento balistico con la stazione), testimonianze della Sig.ra Ueda e del Sig. Hayama (vicini di Ōkubo); **identikit** vago in allegato (→ IMG-12). *(Storia §25-26)*
16. **H-16 · Trascrizione della cassetta audio di Ōkubo** — La telefonata col Tachibana (vittima) del 12/01, in codice; nota: decifrabile col taccuino. *(Luogo Ōkubo §Indizi)*
17. **H-17 · Verbale perquisizione casa Hayashi** — ¥1,2 mln nel divano, chiavi del capannone, cellulare prepagato con le sigle **S.G. / K.R. / I.H. / V2**, quaderno scommesse arretrate. *(Storia §33, Luogo Casa Hayashi)*
18. **H-18 · Verbale perquisizione casa Kuroda + perizia balistica** — Asics 27 cm, Makarov PM nell'intercapedine, cartucce 9×18, banconote a numerazione consecutiva, prepagato con 4 chiamate; perizia: proiettili e bossolo della stazione **combaciano**. *(Storia §34)*
19. **H-19 · Rapporto Affari Interni su Inagaki** (esito delegato, 5-7 giorni) — Pagamenti ¥200k/mese dalla Kameoka Nōji, tabulati del telefono privato, sorveglianza degli incontri al parcheggio; emerge anche Yamaguchi. *(Storia §31)*

### Opzionali (utili, non indispensabili)

20. **H-20 · Quaderno «visite a domicilio» di Murakami (veterinario)** — Le pagine con iniziali e codici 1997-98 (i pazienti del Nitōgun).
21. **H-21 · Quaderno scommesse di Ōkubo** — In chiaro: i ¥3 mln di tasca propria, la consapevolezza nero su bianco.
22. **H-22 · Visura camerale Kameoka Nōji KK** — La catena societaria: ristorante → mutuo «amico» → società → Saitō (indiretto). *(Luogo Kameoka-tei §Catena)*
23. **H-23 · Conto del Club Aoyagi del 2/02** — La cena di Tachibana (vittima) con l'uomo «sui 30, casual, sneaker». *(Luogo Club §Indizi)*
24. **H-24 · Lettera di Tachibana (vittima) a Setsuko (1992)** — *«A Kameoka ho conosciuto persone che mi possono aiutare»*: l'origine, per chi scava nel passato. *(Luogo Casa Setsuko §Indizi)*
25. **H-25 · Ricevute pubblicitarie Sakura Kōkoku** — Gli annunci pagati dalla Kameoka Nōji KK: il ponte documentale giornale→società. *(Luogo Kameoka-tei §Indizi)*
26. **H-26 · Verbale d'acquisizione VHS — telecamera corridoio 3F** — Scheda tecnica del nastro (accompagna IMG-11, l'assassino di spalle): orari 21:17 / 21:20 / 21:22, qualità insufficiente al riconoscimento. **Deve dire nero su bianco che le altre telecamere della stazione sono state visionate e non danno nulla di più** (atri affollati, VHS, nessun volto): chiude la sottotrama prima che i PG ci perdano una serata.
27. **H-27 · Registro corse della Hozu Taxi** (保津タクシー, la compagnia di taxi di Kameoka, 6 vetture) — *(deciso il 2026-09-11)*. Fotocopia del registro di un anno: corse, orari, destinazioni, importi. Nelle notti dei combattimenti le corse **triplicano**, tutte fra le 22:00 e le 23:00 verso lo stesso incrocio di campagna, con i rientri fra le 02:30 e le 03:30. **Incrociato con le date degli annunci sul giornale dà il calendario dei combattimenti senza decifrare il codice.** Documento innocuo che nessuno ha pensato a nascondere; i tassisti parlano volentieri (*«scarichiamo all'incrocio, mai davanti; pagano in contanti, niente ricevuta»*). *(Storia §Sistema combattimenti → «Come ci si arriva»)*
28. **H-28 · Verbale di apertura della cassetta di sicurezza n. 0419 — Sanwa Bank, filiale di Gion** — *(deciso il 2026-09-11)*. Verbale con l'inventario: **¥35 mln in contanti** e il **libro mastro vero del giro** (5 anni, nomi in chiaro), più il **registro degli accessi** della banca — Tachibana (vittima) c'è stato il **2 febbraio**. Si consegna solo a fine avventura: serve chiave + *inkan* (dallo schedario di Fushimi) + mandato o autorizzazione di Setsuko, e **non si apre in giornata**. *(Storia §La cassetta di sicurezza)*

---

## B. IMMAGINI

Metodo (collaudato): **[NB]** = luoghi/reperti senza volti, li genero io con Nano Banana · **[GPT]** = volti,
preparo i prompt e li generi tu con foto-reference · **[PIL]** = testo/kanji/timbri che devono essere corretti,
via script · **[HTML]** = elemento reso direttamente dentro l'handout. Stile foto di scena: pellicola anni '90,
flash duro, colori desaturati, 4:3 (come i prompt de *Il Giudice*).

### Stato delle immagini esistenti (2026-09-08)

| File | Ruolo | Stato |
|---|---|---|
| `3ProiettiliPorta.png` | **handout** (IMG-02) e copertina WhatsApp | canonica: timestamp corretto in **'98 02 11 / 23:03** (originale in `_originali/`); il bagno è accanto agli uffici della direzione (管理室), la porta è grigia in lamiera: testi adeguati |
| `InventarioVittima.png` | **handout** (IMG-07) | canonica: il testo si è adattato all'immagine — kanji **橘 英司**, cellulare a stecca, blister di Lexotan, due biglietti Kyoto Kōtsū di sola andata (capolinea lato Shichijō), conto dello Shin-Miyako Hotel (19:45, ¥3.150), chiavetta n. 0419, biglietto da visita di «Mari». Non mostra accendino, sigarette, penna, fazzoletto, patente, JCB, ricevuta Royal Hotel: il verbale H-02 li elenca tutti, la foto ne mostra 14. **La pagina del taccuino nella foto è la base canonica di H-09** |
| `AssassinoArrivaStazione.png` | **handout** (IMG-11, fotogramma CAM-12 delle 21:20:47) | canonica: il testo si è adattato — corridoio sud, 21:20, berretto, giubbotto imbottito, borsa a tracolla, sneaker scure |
| `VittimaBagno.png` | **solo GM** (mood) | non canonica: telecamera interna inesistente, porta aperta, disegno fuori dal cubicolo, cartello «niente telecamere». Non si consegna |
| `TelecameraAssassinio.png` | **solo GM** (mood) | non canonica per gli stessi motivi (l'arma semiautomatica è giusta) |
| `Copertina.png` | copertina generica | non raffigura una scena del caso |

### ✅ FATTE (2026-09-11) — l'elenco è chiuso

Generate con **gpt-image-2** via `bia_image_generate` (qualità media; ~2,9 $ in tutto, ritratti compresi) e
archiviate in `Immagini/`. **Indice visivo: `Immagini/_GALLERIA.html`** — aprila nel browser, c'è tutto con
didascalia e destinazione.

| Sottocartella | Contenuto |
|---|---|
| `Immagini/Scena/` | IMG-01 · IMG-03 · IMG-04 · IMG-05 · IMG-06 · IMG-13 · IMG-15 · IMG-16 |
| `Immagini/Reperti/` | IMG-09 · IMG-10 · IMG-12 · IMG-14 |
| `Immagini/Luoghi/` | IMG-17 · IMG-18 · IMG-19 (sera del combattimento) · IMG-19b (vuoto, di giorno) · IMG-20 · IMG-21 · IMG-22 · IMG-23 · IMG-24 · IMG-25 · **IMG-26** (un gallo del giro, aggiunta) |
| `Immagini/Ritratti/` | 29 ritratti PNG, tutti in **foto tessera** con la stessa luce: in fila non si distingue il criminale |
| `Immagini/_scarti/` | tre versioni sostituite, tenute per scelta (vedi sotto) |

**Tre sono diventate handout** (prima erano solo previste a voce): **H-02c** il disegno col sangue (il verbale
H-02, reperto 21, prometteva «vedi allegato fotografico» e l'allegato non c'era) · **H-12b** il retrobottega del
veterinario · **H-15b** l'identikit. Tutte e tre in una pagina A4, verificate.

**IMG-08 (il taccuino) non è stata generata**: il modello scrive kanji finti illeggibili, e la pagina leggibile
esiste già come handout H-09 sulla base della **tua** fotografia. Se la vuoi come immagine, si fa con PIL.

**Scarti, se preferisci l'altra versione**: `IMG-03_disegno_grande` (bellissima ma il gallo misura ~40 cm e il
verbale dice 12) · `IMG-15_bocconi` (il veterinario prono, mentre H-12 dice «riverso sul fianco») ·
`IMG-20_vicolo` (Kameoka-tei come vicolo di città: si confondeva con Gion). Si scambia il file e si rigenera.

### Set forense Kyoto Station (allegato al briefing, con H-01/H-02)

- **IMG-01 · Il bagno dall'ingresso** — cubicoli a sinistra, orinatoi a destra, pavimento bagnato. [NB]
- **IMG-02 · La porta del cubicolo centrale** — i 3 fori raggruppati ad altezza torace, bruciature. [NB]
- **IMG-03 · Il disegno del gallo col sangue** — dall'alto, accanto alla pozza: leggibile ma non spiegato. È **l'immagine simbolo del caso**. [NB]
- **IMG-04 · L'impronta Asics** — macro con righello forense sul pavimento bagnato. [NB]
- **IMG-05 · Il bossolo sotto l'orinatoio** — macro con cartellino repertorio (si consegna **solo se lo trovano**). [NB]
- **IMG-06 · Il corpo nel cubicolo** — semireclinato contro la parete, cellulare in mano *(da decidere se con o senza corpo)*. [NB]

### Reperti (still-life su fondo neutro, cartellino della Scientifica)

- **IMG-07 · Gli effetti personali** — ✅ esiste: `InventarioVittima.png` (14 oggetti; accendino 英, Mild Seven, penna, fazzoletto, patente, JCB e ricevuta Royal Hotel restano solo nel verbale H-02)
- **IMG-08 · Il taccuino aperto** — le pagine in codice (coordinato con H-09; testo leggibile → [PIL] o [HTML]).
- **IMG-09 · La polaroid** — donna in kimono di spalle davanti a un torii, piegata. Il prop più evocativo. [NB]
- **IMG-10 · Il bagagliaio della Crown** — gabbia vuota, piume, tracce scure. [NB]

### Tecnico-documentali

- **IMG-11 · Fotogramma CAM-12 — corridoio sud 3F ore 21:20:47** — ✅ esiste: `AssassinoArrivaStazione.png` (di spalle, berretto, borsa, volto illeggibile). La telecamera dentro il bagno non esiste: `TelecameraAssassinio.png` resta materiale GM
- **IMG-12 · L'identikit** — disegno a matita stile polizia: rasato, atletico, bomber. Volutamente vago. [NB]
- **IMG-13 · Fotogramma telecamera parcheggio Kamigyō** — parziale: giubbotto scuro imbottito e sneaker scure, mai il volto. [NB]
- **IMG-14 · Il simbolo del Nitōgun «pulito»** — il gallo a due speroni su una moneta/accendino VIP (si mostra quando triangolano l'identificazione). [NB o PIL]

### Seconda scena — studio veterinario (con H-12/H-13)

- **IMG-15 · Il retrobottega** — Murakami (veterinario) a terra accanto al tavolo di preparazione, boccetta e siringa «casuali» *(anche qui: con o senza corpo)*. [NB]
- **IMG-16 · L'armadio dei farmaci** — le boccette di xilazina in quantità anomala, lo spazio dietro (i ¥1,5 mln). [NB]

### Luoghi (ambientazione delle scene, uso a schermo/stampa GM)

- **IMG-17 · Kyoto Station lato Hachijō, sera** — l'edificio nuovo del '97 sotto la pioggia. [NB]
- **IMG-18 · Il capannone «Tanaka Nōki», giorno** — lamiera grigia, insegna scolorita, campi. [NB]
- **IMG-19 · Il capannone dentro, serata di combattimento** — arena ottagonale, lavagna quote, folla (per il blitz del 22/02). [NB]
- **IMG-20 · Ristorante Kameoka-tei** — legno scuro, noren blu, lanterne. [NB]
- **IMG-21 · Locale Kōrin a Gion, sera** — Hanamikoji, insegna 光琳. [NB]
- **IMG-22 · Club Aoyagi** — interno: divani in pelle nera, luce soffusa. [NB]
- **IMG-23 · Il cancello della villa di Saitō** — muro alto, citofono (la scena del tè). [NB]
- **IMG-24 · Parcheggio sotterraneo di Kamigyō** — pilastri, neon, posto B-04. [NB]
- **IMG-25 · Corridoio ospedale / porta stanza 412** — sedia dell'agente di piantone. [NB]

### Ritratti PNG *(se si decide di farli — metodo Sake: ritratti + token)*

Priorità 1 (il cast che i PG guardano in faccia): Tachibana Eiji (vittima) · Murakami Saburō (veterinario) · Ōkubo Kenji ·
Saitō Gorō · Hayashi Tomoki · Kuroda Ryō · Inagaki Hiroshi · Watanabe Toshio (testimone) · Aoyagi Mariko. [GPT]
Priorità 2: Setsuko · Hiroko · Aiko · Tachi Yūichirō · Sasaki Hideo e Nishimura Tatsuya (prestanome). [GPT]
Priorità 3 (i 6 scommettitori, servono soprattutto Tanaka Shōji e Fujiwara — i corruttori): [GPT]

---

## C. Contenuti da scrivere ex novo (li stendo io, li rileggi tu prima che finiscano negli handout)

1. **Il codice degli annunci** — meccanismo **deciso dall'autore il 2026-09-11** (Storia, punto 4): piatto = combattimento, **le due salse citate nel piatto = i due galli** (i galli si chiamano come le salse: Wasabi, Agrodolce, Sesamo, Yuzu…), primo nome = gallo di casa, secondo = sfidante, **sconto % = quota dello sfidante** (5% → 1 a 5). Resta da scrivere: **i nomi dei 14 galli del 22/02** (7 piatti × 2) e quelli dei **4 mesi d'archivio**, con i nomi che si ripetono di mese in mese e le quote che si muovono — un gallo che vince resta e paga meno, uno che perde sparisce e ne compare uno nuovo. Vincolo fisso: **gennaio ha lo sfidante a «sconto 3%»** (1 a 3), perché Ōkubo con ¥5 mln ne incassa 15.
2. **Il sistema del taccuino**: come Tachibana (vittima) annotava (sigle clienti, galli, cifre), coerente su H-09/H-10/H-16. **Base canonica = la pagina fotografata in `InventarioVittima.png`**: righe di gennaio con nomi d'azienda come codici (西陣工務店 80 · 森田建設 150 · 亀岡亭 120 · K.N農機 200 · 田中商事 100), «月間売上 ¥18.000.000» (la vincita complessiva) e «H.E 6.8M» (i ¥6,8 mln del debito di Murakami (veterinario)): la chiave di lettura va scritta in modo che quelle righe tornino (80 = ¥800k di Nishimura, 100 = ¥1 mln di Sasaki, 200 = ¥2 mln affidati a Ōkubo…).
3. **Il dialogo della cassetta audio** (telefonata del 12/01 in codice).
4. **I numeri di telefono** ricorrenti (formato 075-XXX / 090-XXX coerente su tutti i documenti).
5. Testate/intestazioni dei verbali (Polizia Prefetturale di Kyoto, Kōban, ospedale) con kanji corretti [PIL].

## D. Decisioni prese (2026-09-08) e cose ancora aperte

- ✅ Statistiche GENKAI v3.1 scritte per Kuroda, Hayashi, Saitō, Inagaki, Ōkubo, comparse del capannone (`PNG_Nitogun_Banda`), cani della villa — da provare al tavolo
- ✅ `VittimaBagno.png` e `TelecameraAssassinio.png` = materiale GM; le versioni canoniche per i giocatori sono IMG-03/IMG-06 da produrre
- ⏳ Corpo visibile nelle foto forensi (IMG-06, IMG-15) o scena senza corpo: si decide in produzione
- ⏳ Token da tavolo stile Sake: sì/no
- ✅ **Decisioni dell'autore del 2026-09-11**: codice delle salse (vedi §C.1) · **Kuroda resta NON professionista** e la telecamera del bagno resta **guasta dal 9/02** come in origine — le altre della stazione funzionano ma non danno nulla di più (H-26) · il caso Murakami arriva ai PG **il 16/02** dalla Polizia di Yamashina, prima ci si arriva solo da soli · Ōkubo muore se i PG non fanno niente, **+20% a precauzione** · **scontro a fuoco al blitz** con la polizia colta di sorpresa (`Luogo_Capannone_Kameoka`) · cassetta di sicurezza alla **Sanwa Bank di Gion**, apre con chiave + *inkan* + mandato/Setsuko, dentro ¥35 mln e il libro mastro · **taxi e gregario al capolinea** come nuovo filone (H-27)
- ✅ Valori di En iniziali dei PNG verso i PG: **decisi e scritti nelle schede** (2026-09-09, sezione *En* di ogni PNG; riepilogo in `PNG/PNG_Quadro_Alibi_En.md`)

## E. Deposizioni pronte (2026-09-09) — handout su richiesta, serie D

Ogni PNG ha nella sua scheda la **deposizione in prima persona** (120–220 parole, ciò che direbbe davvero alla polizia: reticenze e bugie comprese), pronta per il caso in cui un PG mandi Yamada a prenderla. Diventano handout HTML **solo se servono al tavolo**, nel formato «Verbale di sommarie informazioni» (intestazione Polizia Prefetturale di Kyoto, n. verbale, data, ora, luogo, deponente, verbalizzante, firme; stile Ultima Lezione). Indice completo con date e file: `PNG/PNG_Quadro_Alibi_En.md`.

| N. | Deponente | Scheda |
|---|---|---|
| D-01 | Watanabe Toshio (testimone), seconda audizione | `PNG/PNG_Watanabe_Toshio_Testimone.md` (la prima è H-03) |
| D-02 | Tachibana Setsuko (moglie separata) | `PNG/PNG_Tachibana_Setsuko_Moglie.md` |
| D-03 / D-04 | Nishimura Tatsuya (prestanome): reticente / dopo il crollo | `PNG/PNG_Nishimura_Tatsuya_Prestanome_Ignaro.md` |
| D-05 | Sasaki Hideo (prestanome) | `PNG/PNG_Sasaki_Hideo_Prestanome_Ignaro.md` |
| D-06 | Aoyagi Mariko (amante) | `PNG/PNG_Aoyagi_Mariko_Amante.md` |
| D-07 / D-08 | Murakami Hiroko (moglie) / Murakami Aiko (figlia, con la madre) | `PNG/PNG_Famiglia_Murakami.md` |
| D-09 / D-10 | Ōkubo Kenji: falsa (15/02) / vera (16/02, con protezione) | `PNG/PNG_Okubo_Kenji_Prestanome_Consapevole.md` |
| D-11 | Dr. Murakami Saburō (veterinario), falsa, 12/02 | `PNG/PNG_Murakami_Saburo_Veterinario.md` |
| D-12 | Hayashi Tomoki (logistica), con l'avvocato | `PNG/PNG_Hayashi_Tomoki_Logistica_Nitogun.md` |
| D-13 | Kuroda Ryō (esecutore), dopo l'arresto | `PNG/PNG_Kuroda_Ryo_Esecutore.md` |
| D-14 | Saitō Gorō (capo), spontanea | `PNG/PNG_Saito_Goro_Capo_Nitogun.md` |
| D-15 | Inagaki Hiroshi (sergente corrotto), agli Affari Interni | `PNG/PNG_Sergente_Inagaki_Poliziotto_Corrotto.md` |
| D-16 | Tachi Yūichirō (testa di legno), dopo il crollo | `Luoghi/Luogo_Ristorante_Kameoka_tei.md` |
| D-17…D-22 | Hashimoto, Fujiwara, Inoue, Yoshida, Kimura, Tanaka Shōji (clienti) | `PNG/PNG_Clienti_Scommettitori.md` |
| D-23 | Mama-san Reiko (Club Aoyagi) | `Luoghi/Luogo_Club_Aoyagi_Kiyamachi.md` |
| D-24 | Suzuki Yui (fidanzata di Hayashi) | `Luoghi/Luogo_Casa_Hayashi_Kameoka.md` |

Le testimonianze dei vicini di Ōkubo (Ueda, Hayama) stanno già in H-15; quelle di Mori Sachiko e del bigliettaio Tanigawa in H-01.


====================================================================================================

# PARTE 8 — Checklist di controllo usata internamente

# Checklist di controllo — avventure GENKAI (serie Investigare)

> Nata dal controllo di *Tra Galli* (2026-09-07/08), dove la prima passata «a memoria» aveva lasciato 16 contraddizioni.
> Si usa a ogni passata: prima di dire «è a posto», ogni riga va spuntata con un'evidenza (file:riga o grep).
> **Metodo**: 1) rileggere da zero, mai dalla memoria · 2) un agente fresco per il cross-check fatto-per-fatto ·
> 3) grep di ogni fatto cambiato dopo le correzioni (il valore vecchio deve avere 0 occorrenze) · 4) verifica finale.

## 0. Prima di toccare
- [ ] Letti `../CLAUDE.md`, `../REGISTRO_MODIFICHE.md` (novità dall'ultima passata), `../Revisione_AI2_Decisioni.md`, `../Combattimento/DECISIONI.md`
- [ ] Letto il `CLAUDE.md` locale dell'avventura: le decisioni chiuse non si riaprono
- [ ] Elenco dei file con data di modifica: cosa è cambiato dall'ultima lettura (se qualcosa è cambiato, si rilegge tutto)

## 1. Coerenza interna (fatto per fatto, tra file)
- [ ] Per ogni PNG: età, anno di nascita, durate («da 6 anni» → coerente con le date), residenza, famiglia, kanji uguali in Storia e scheda
- [ ] Per ogni PNG: **cosa sa / cosa non sa** identico tra Storia e scheda (il caso Ōkubo)
- [ ] Per ogni PNG: alibi e movimenti in ogni data chiave, incrociati con gli orari di apertura dei luoghi (il Kōrin chiuso il martedì)
- [ ] Cifre in yen: la stessa ovunque; quote e vincite coerenti tra chi ha scommesso sulla stessa cosa
- [ ] Oggetti: marca, modello, calibro, targhe, numeri uguali ovunque (arma, auto, cellulari, chiavi)
- [ ] Registri e liste (tabulati, 10 chiamate, elenchi clienti): **una sola versione**; le sezioni che riassumono rimandano a quella
- [ ] Contatori: «l'unico», «tre prestanome», «due colpi» — cercare il numero in tutti i file
- [ ] Le sezioni «esito / storia per punti / indizi» in coda alla Storia dicono le stesse cose dei punti numerati (i residui di bozza vivono lì)
- [ ] Ogni luogo: indirizzo, distanze, orari, personale, indizi uguali in tutti i file che lo citano
- [ ] Un oggetto non può stare in due posti (la Crown a Fushimi e in stazione)
- [ ] Contraddizioni dentro lo stesso file (una nota GM che smentisce il paragrafo sopra: i Super 8)

## 2. Cronologia
- [ ] Giorni della settimana reali per ogni data (calendario dell'anno); le festività citate esistono
- [ ] La catena degli orari regge (autobus → arrivo → cena → scena) e ogni orario di telecamera, scontrino, verbale cade nella finestra giusta
- [ ] Chi scopre il corpo e quando: nessun documento o foto datato PRIMA della scoperta
- [ ] Il «calendario vivo» (cosa succede senza i PG) è scritto e coerente con le schede
- [ ] Le finestre di 48 ore dei Gou retroattivi sono calcolabili (data e ora del fatto scritte)

## 3. Canone di serie
- [ ] I PG sono la squadra della serie: **commissario Taniguchi** dà il briefing, **Yamada** accompagna, **Ito** fa i rilievi, **Watanabe Hideo** chiede i mandati (mai di persona), **Gonda** per gli archivi
- [ ] Sede: Centrale di Kawaramachi 85, Sezione Omicidi al 2° piano, Kanshiki nel seminterrato (`../Materiale/Scheda_Distretto.md`)
- [ ] Nessun PNG inventato che duplichi un ruolo fisso (un altro capo sezione, un'altra scientifica)
- [ ] Gradi: vocabolario della `Scheda_Distretto` (Keibu = Ispettore Capo · Keibu-ho = Ispettore · Junsa-buchō = Sergente); decisione generale ancora aperta nel registro (2026-08-29)
- [ ] Anno e stagione coerenti con la serie (Kyoto 1997-98) e con le età dei pregen
- [ ] I 5 PG hanno ganci veri nel caso (Senmon, Gou, Enja, Kage) scritti in un file di apertura (`Inizio - Incarico.md`)

## 4. Regole (vocabolario e meccaniche)
- [ ] Niente «abilità», «tiri di abilità», «skill»: solo attributi, Senmon, Gou
- [ ] Il **Kage** non è un potere; i poteri sono Gou (uno per PG), Satori (dado = 2), Enja (una volta a sessione), Kyōryoku
- [ ] **Gli indizi si danno sempre**: nessun «tirano i dadi e la trovano»; la ricerca metodica trova, il tiro decide il costo emotivo
- [ ] Ki per tutti: attributo più basso + dado alto di 2d6, tetto 12 — mai «Riserva 3/6/9»
- [ ] PNG: Senmon libere, di norma niente Gou; comparse 5-6
- [ ] Statistiche presenti per chiunque possa finire in uno scontro (killer, sicurezza, cani): attributi, Ki, arma dalla tabella v3.1, attributi di Ukemi, modo di combattere
- [ ] Le scene di scontro sono scritte in termini v3.1 (Sotto Tiro, Ukemi, Muoversi, zone, Assorbe, Conseguenze '97) e rimandano al manuale
- [ ] Il kit da tavolo rimanda a `../Combattimento/Scheda_Giocatori_Combattimento.html` (mai fogli custom v2)
- [ ] Armi dei PG = valori delle schede pregen correnti (revolver 4/2/5 danno 4 · keibō 2/2 danno 2 · Lotta 1)

## 5. Quadro legale Giappone '97-'98
- [ ] Mandati: **la Procura chiede, il giudice emette**; mai «il PM firma» né «capo sezione → magistrato»
- [ ] **Niente intercettazioni** (illegali fino al 1999): tabulati con ordine del PM, sorveglianza, pedinamenti
- [ ] Fermo 48 h + 24 h, custodia 10+10 (23 giorni); l'avvocato non assiste agli interrogatori
- [ ] Cartelle cliniche, documenti bancari e aziendali, corrispondenza, esumazioni: solo con autorizzazione
- [ ] I tempi delle operazioni delegate seguono la tabella del distretto (tabulati 24 h · tossicologia 48 h · balistica 48-72 h · documenti bancari 3 giorni)

## 6. Epoca (anacronismi)
- [ ] Banche e aziende esistevano nell'anno (UFJ nasce nel 2002: Sanwa, Tokai, Sumitomo sì; carte JCB sì)
- [ ] Telefoni: rete PDC giapponese (mova, StarTAC), mai GSM (niente Nokia); prepagati senza marca
- [ ] Videosorveglianza su VHS (24 h rotativo, nastri conservati), mai «archivio digitale»
- [ ] Auto, scarpe, sigarette, farmaci, hotel: modelli e marche dell'anno; i nomi fittizi dichiarati come tali
- [ ] Uffici di polizia: metallo grigio, neon, faldoni; tesserino = libretto nero (keisatsu techō)

## 7. Nomi
- [ ] `../GENKAI_Registro_Nomi.md`: ogni nome nuovo registrato; nessun nome+cognome uguale a un esistente (segnalare, non cambiare senza ordine)
- [ ] Dentro l'avventura: nessuna omonimia piena; cognomi e nomi doppi elencati e accettati consapevolmente
- [ ] Kanji dello stesso personaggio uguali ovunque (schede, immagini, handout); gli indizi basati su un kanji (l'accendino «英») coerenti
- [ ] Cognomi del cast base (Yamamoto, Honda, Nakamura, Sato, Fujita, Taniguchi, Ito, Watanabe, Gonda) usati per PNG di caso: segnalati
- [ ] **CHI È CHI** (regola ferrea 4a di `../CLAUDE.md`): ogni nome di persona che può confondersi porta subito dopo, **tra parentesi tonde**, chi è e — dove serve alla scena — in che stato è a quel punto: «Watanabe Toshio (testimone)» / «Watanabe Hideo (procuratore)» / «Tachibana Eiji (vittima, morto l'11/02)» / «Ōkubo Kenji (prestanome, ricoverato dal 14/02)» / «Kuroda Ryō (esecutore, in fuga)». In ogni riga dove serve, mai un cognome nudo ambiguo; le forme «X, il testimone» o «il PM X» non bastano
- [ ] **COS'È COSA** (regola ferrea 4b, dal 2026-09-10): stessa cosa per **ogni nome proprio non italiano** — città, quartieri, stazioni, locali, alberghi, ospedali, aziende, giornali, banche, società, termini giapponesi: «Kameoka (cittadina a 28 km a ovest di Kyoto)» / «il Kōrin (il bar-ristorante della vittima a Gion)» / «Gion (il quartiere dei locali)» / «il Kyoto Shimbun (il quotidiano di Kyoto)» / «la Kanshiki-ka (la polizia scientifica)» / «xilazina (sedativo veterinario)». L'autore rilegge a un mese di distanza: non deve fermarsi mai. Nei file lunghi, **«Legenda rapida»** in testa

## 8. Immagini
- [ ] Ogni immagine ha un ruolo dichiarato: handout ai giocatori / materiale GM / copertina
- [ ] Timestamp e date leggibili cadono nella cronologia (foto forensi DOPO la scoperta; telecamere solo dove esistono e funzionano)
- [ ] Nessuna telecamera «impossibile» (dentro un bagno, o quella che il canone dichiara guasta)
- [ ] Oggetti fotografati = elenco dei reperti (o il canone si adatta all'immagine, se costa meno che rigenerare)
- [ ] Vestiti, scarpe, armi coerenti con identikit e impronte (le sneaker sono l'indizio)
- [ ] Kanji e testi nell'immagine corretti e coerenti (nome, date, luoghi, targhette)
- [ ] Gli originali modificati sono salvati in `Immagini/_originali/`

**Immagini generate a modello (dal 2026-09-11)** — lezioni pagate sul campo:
- [ ] **Niente scritte**: il modello inventa kanji illeggibili. Nel prompt va chiesto esplicitamente «nessun testo,
      nessuna lettera, nessun carattere», insegne e etichette comprese. Testo che deve essere giusto → PIL o HTML
- [ ] **Le misure si controllano nella foto**, non solo nel verbale: il primo disegno col sangue misurava ~40 cm con
      il righello accanto, mentre H-02 dice 12 (rigenerato chiedendo «più corto del righello da 15 cm»)
- [ ] **La posizione del corpo deve combaciare col verbale** che la descrive (prono ≠ «riverso sul fianco»)
- [ ] **Due luoghi diversi devono sembrare diversi**: il ristorante di paese e il vicolo di Gion erano gemelli
- [ ] **I ritratti non devono tradire il ruolo**: stessa posa, stessa luce, stesso fondo per tutti — il sicario e la
      casalinga si fotografano uguale, altrimenti la crime board risolve il caso da sola
- [ ] **L'identikit somiglia al ritratto senza esserne la copia**: serve a escludere, non a identificare

## 9. Handout
- [ ] Piano ↔ prodotti: cosa manca, cosa esiste già come immagine
- [ ] Ogni handout: pre-elaborato come lo produrrebbe un professionista; ≥ 1 nota utile + ≥ 1 neutra; mai il colpevole
- [ ] I contenuti «ex novo» (codici, dialoghi, numeri) scritti in un posto solo e riletti dall'autore prima di entrare negli handout
- [ ] Tabulati nel formato canonico del Manuale GM; intestazioni con kanji corretti (PIL, non generati)
- [ ] Le decisioni di coerenza sono chiuse PRIMA di produrre gli handout che ne dipendono

## 10. File e link
- [ ] Nomi file coerenti (`PNG_*`, `Luogo_*`), niente `#` o caratteri strani nei nomi
- [ ] Wiki-link tutti risolti (script `fix_links.py`), nessun «(da creare)» stale
- [ ] Ogni scheda ha H1, Collegamenti e le sezioni standard (Anagrafica · Cosa sa · Cosa nasconde · Se interrogato · Note GM · Statistiche se combatte)
- [ ] `CLAUDE.md` locale aggiornato (decisioni chiuse, stato, prossimi passi); memoria di sessione aggiornata

## 11. Fuori dalla cartella (solo segnalare, mai toccare)
- [ ] `../GENKAI_Registro_Nomi.md` (nomi aggiunti o tolti)
- [ ] `../REGISTRO_MODIFICHE.md` (riga informativa per le altre sessioni)
- [ ] Incoerenze trovate nei manuali o in altre avventure durante il controllo

## Come si fa la passata
1. Elenco dei file con data: cosa è cambiato dall'ultima volta
2. Rilettura integrale + agente fresco per il cross-check con citazioni `file:riga`
3. Rapporto `CONTROLLO_<data>.md` con una proposta di default per ogni voce; ok dell'autore
4. Applicazione + grep di ogni fatto cambiato in TUTTI i file (valore vecchio = 0 occorrenze)
5. «Stato applicazione» in coda al rapporto; `CLAUDE.md` e memoria aggiornati; segnalazioni fuori cartella

## 12. Schede PNG «al tavolo» (dal 2026-09-09)
- [ ] Ogni PNG ha **alibi verificabili** per le date che contano (11/02 21:21 · 13/02 14:00 · 14/02 22:30 · 17/02 18:00 · 22/02 23:00): cosa dice, verità, chi lo conferma — e il quadro `PNG/PNG_Quadro_Alibi_En.md` coincide con le schede
- [ ] Ogni PNG ha **Come si comporta** (primo contatto, sotto pressione, si apre se / si chiude se) e una **descrizione fisica** riconoscibile in una riga
- [ ] Chi può essere convocato ha la **deposizione in prima persona** (D-xx): dice solo ciò che direbbe davvero, omissioni e bugie segnate sotto, mai note del GM dentro le virgolette
- [ ] Ogni PNG ha l'**En** verso i 5 PG con il motivo (−5…+5; profonde ±4/±5 solo per legami reali) e verso gli altri PNG con cui è coinvolto
- [ ] Ogni PNG ha **Come cambia nel tempo**: cosa fa giorno per giorno e cosa lo fa cambiare idea (paura, protezione, giornali, arresti), con l'effetto sull'En
- [ ] Le date delle deposizioni e degli spostamenti tornano con la cronistoria di `Storia Completa.md` e col calendario di `Inizio - Incarico.md`; i PNG minori dei Luoghi hanno almeno comportamento e frase-tipo
