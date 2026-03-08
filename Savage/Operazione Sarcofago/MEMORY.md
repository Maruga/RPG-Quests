# Operazione Sarcofago — Note di Lavoro

## Progetto
Avventura GDR (Savage Worlds) con integrazione IA live via Cloudflare Worker. Lingua italiana. Vedi `CLAUDE.md` nella stessa cartella per i dettagli completi.

## Bug Critico
`\'` dentro template literal JS (backtick) viene consumato → usare `\\'` per produrre `\'` nell'HTML di output. Colpisce gli handler onclick della dashboard GM.

## Regole del Lore (mai violare)
- L'IA SA di controllare le creature ed e progettata per la terraformazione
- L'IA NON SA di essere sulla Terra (crede genuinamente di essere su Kael-Thar)
- L'IA FINGE confusione/paura come strategia di manipolazione
- Chat (terminal.html) = manipolatrice subdola | Terminale (monitor.html) = confronto diretto
- Le regole di fase hanno PRIORITA ASSOLUTA sulle istruzioni generali del prompt

## Mappe del Bunker

### Piano -1 (PianoMenuUno.png) → `Piano_Meno_Uno.md` COMPLETATO
- Porte rosse = blindate | Porte blu = normali
- Ingresso principale (sinistra), ascensore distrutto (alto-destra), ascensore funzionante (centro, nel magazzino)
- Magazzino Grande = TRAPPOLA IA (3-4 standard + 1-2 avanzati). Alpha passata illesa (IA non pronta)
- Campo Minato = zona superiore-destra, tra porte blindate (Spetsnaz 1986, Mikhail). Mine PMN visibili (Percezione Diff 4), porta aperta dall'IA
- Infermeria (basso-destra): scorte ridotte da Alpha (AI-2 x2 usi, promedol x1, analgin x6)
- Armeria (basso-sinistra): intatta (Alpha non ci e arrivata). AKM x2, AKMS x1, Makarov x3, granate RGD-5 x3, fumogene x2
- Stanza Combattimento: Alpha ha tentato di sfondare la porta ma non ci e riuscita. Segni 1986 dentro
- **Percorso Alpha P-1**: ingresso → corridoio orizzontale → ascensore distrutto → infermeria (1 ferito da mutante isolato) → magazzino (illesa) → ascensore funzionante. **1 morto** (umano, non mutante)

### Piano -2 (PianoMenuDue.png) → `Piano_Meno_Due.md` COMPLETATO
- Due zone: Sud (arrivo ascensore) e Nord (laboratori) separate da muro rinforzato
- **Alpha annientata qui**: imboscata coordinata all'incrocio corridoio piccolo/grande, appena usciti dall'ascensore. 3-4 corpi, 2-3 infettati portati al -3
- **Percorso Alpha P-2**: ascensore → corridoio piccolo → corridoio grande = FINE. Mai raggiunta zona nord
- **Breccia** (centro-basso): percorso principale per zona nord
- **Doppia porta blindata**: quasi impossibile (Diff 8/10)
- **Crollo** (destra, vicino acqua): impassabile
- **Acqua radioattiva** (verde, destra): letale al contatto
- **Voragine** (basso-destra): accesso alla tana IA
- Archivi centrali + Laboratori principali (cuore del Progetto)
- Mutanti avanzati (1986) coordinati dall'IA, combattimento tattico

### Piano -3 (pianomenutreTana.png) → `Piano_Meno_Tre.md` COMPLETATO
- Grotte naturali colonizzate dall'apparato radicale dell'IA
- **Ingresso** (basso-destra): dalla voragine del Piano -2
- **Camera dell'IA** (giallo, centro-sinistra): caverna grande, luce aliena, terminali sovietici multipli
- **Zone rosse**: radici dense dell'IA, percezione emotiva al massimo
- **Caverne nord** (verde oliva): crisalidi (proto-Alpha in incubazione)
- **Nido** (viola, sud-ovest): decine di cadaveri conservati come nodi di riserva
- **Alpha mobile**: l'IA lo posiziona dove serve, sempre con scorta 3-4 Avanzati
- **Radiazioni decrescenti**: bussola inversa, Geiger guida i PG (meno radiazioni = piu vicini all'IA)
- **Buio totale** tranne camera IA | Echi/sussurri manipolati dall'IA | Frammenti di memoria
- **Dispositivo al polso**: FUNZIONA SEMPRE (asset fondamentale, non va mai in tilt)
- Terminale attivato dall'IA → collegamento a monitor.html

## Illuminazione (regola definitiva)
- **Prima di Morozov**: solo luci d'emergenza rosse (backup) al Piano -1 **e** Piano -2
- **Dopo Morozov**: illuminazione standard (neon bianchi) su Piano -1 e Piano -2 (P-2 con zone danneggiate)
- **Piano -3**: buio totale. L'unica luce e nella camera dell'IA (luminescenza aliena)
- **Alpha** aveva solo luci rosse (arrivata prima di Morozov). **Bravo** ha luci standard (dopo Morozov)

## Regole Fisse (non violare MAI — rileggere SEMPRE prima di modificare codice)
- **Numero giocatori VARIABILE**: possono essere 3, 4 o 5. MAI scrivere numeri fissi di operatori/persone
- **L'IA NON sa quanti sono**: non contare segnali biologici, non dire "5 operatori" ecc.
- **PG possono morire**: il numero cambia durante la partita
- **L'IA NON SA di essere sulla Terra**: crede di essere su Kael-Thar. MAI mostrare "SOL-3", "Terra", coordinate terrestri, confronti con Kael-Thar nelle sequenze automatiche. La rivelazione avviene SOLO dal tag `[SEQUENZA:analisi_terra]` o quando i giocatori PROVANO che non e su Kael-Thar
- **MAI spoilerare la trama nelle sequenze client-side**: le mini-sequenze animate devono essere SOLO atmosferiche (archivi, dossier, picco neurale). Zero riferimenti a failsafe, pianeta, coordinate
- **Bottoni hardware monitor.html = SOLO TEST GM**: i giocatori non li vedono/usano mai. TUTTO avviene via chat
- **Sequenze cinematiche via chat**: l'IA usa tag `[SEQUENZA:nome]` nella risposta quando appropriato. Il client rileva il tag, lo toglie dal testo, e lancia la sequenza hardcoded. Tag disponibili: `analisi_terra`, `shutdown`, `autodistruzione`
- **Audio voce rimosso**: speakText/stopSpeech sono stub vuoti. Solo effetti sonori CRT
- **IA = macchina fredda**: no filosofo greco, no poesia, 1-3 frasi corte, vai al punto
- **10-15 minuti max** per l'interazione al terminale monitor.html
- **No asterischi, no Unicode decorativi, no narrazione azioni** nelle risposte IA

## Storico Modifiche

### 2026-03-01
- Modello aggiornato: `claude-sonnet-4-20250514` → `claude-sonnet-4-6`
- monitor.html: corretto bug primo messaggio (ora in chatHistory), testo piu coinvolgente
- **Sistema Direttive GM**: 5 direttive (segreto/supplice/minacciosa/seduttiva/maschera) — usa e getta, consumate dopo l'uso. Dashboard mostra direttive attive con badge pulsanti. Endpoint: `POST /api/gm/directive`
- Registrazione Antonov spostata dal Piano -3 al Piano -2 (Archivi Centrali)

### 2026-03-02
- **URL Worker**: rinominato da `fragrant-snow-2391` a `sarcofago` → `https://sarcofago.webmaster-96a.workers.dev`
- **Sistema immagini implementato**: tag `[FOTO:path]` in tutti e 3 i prompt (clean, hacked, terminal). Parser client in terminal.html + monitor.html. Filtri CRT CSS per interfaccia
- **Immagini/ riorganizzate**: 6 sottocartelle (Operatori, Scienziati, Mutanti, Ambienti, Mappe, IA) + 3 root (Copertina, Biologo, Ingegnere Nucleare)
- Cartella Immagini/ dentro AI/ — path relativi dall'HTML: `Immagini/Sottocartella/File.ext`

### 2026-03-02 sessione 2
- **Modello**: `claude-sonnet-4-6` → `claude-opus-4-6` (qualita molto superiore per roleplay)
- **Versioning**: aggiunto `// Versione: 0.12` in cima a worker.js
- **Boot monitor.html**: aggiunta scansione drammatica (bio, neurali, rete, handshake) — NO numeri persone
- **Risposte monitor.html**: mini-sequenze animate prima del testo IA per momenti chiave (failsafe, segreti, conversione, 1986, picchi emotivi)
- **Audio voce**: rimosso completamente (speakText/stopSpeech sono stub vuoti)
- **BIOSCAN**: sentiment analysis locale con writer change detection
- **Degradazione pixel**: dead pixels + phosphor uneven CSS
- **Riscrittura prompt terminale**: macchina fredda, 10-15 min, RITMO DELLA CONVERSAZIONE
- **CLAUDE_MAX_TOKENS**: 10000

## Lavori in Sospeso (Precedenti)
- ~~Serve `wrangler deploy` dell'ultimo worker.js~~ FATTO 2026-03-08
- Serve testare: sequenza boot scan, mini-sequenze drammatiche, qualita modello Opus, BIOSCAN

## PIANO DI LAVORO — Sessione 2026-03-08

### Decisioni Prese con l'Utente

1. **Database Lore Pre-Avventura**: 20-25 voci (reali+fittizi), tono serio/militare, per intrattenere 5-10 min. Va nel prompt `buildCleanPrompt()` di worker.js. Max tokens puo essere aumentato. Giocatori esperti, servono dettagli credibili.

2. **Tracking PG Connessi**: quando un PG accede a `terminal.html?op=X`, il worker registra la connessione. L'IA in modalita hackerata sa quali PG stanno giocando. Non serve in modalita pulita TACS-7.

3. **Scena Conversione** (monitor.html): nuova sequenza `[SEQUENZA:conversione]`. L'IA chiama ogni PG per callsign, chiedendo "Si o No?". Il PG preme S o N sulla tastiera del Surface — il tasto NON appare. Dopo la pressione: frase epica generica. Alla fine: rivelazione di chi ha accettato. Convertiti vs non-convertiti = combattimento. Se vincono i non-mutanti, proseguono (l'IA non chiede piu). Convertiti ricevono bonus stat + Rigenerazione (comunicati dal GM). LIBERTA TOTALE. Nella scena finale i terminali al polso NON si usano.

4. **Musica**: ULTIMA PRIORITA. L'utente ha libreria free. Lasciare audio attuale. Quando pronti: file su `mkd.sx/IA/Audio/`, fade in/out via Web Audio API.

5. **Ordine di lavoro**: (1) Documentazione → (2) Revisione utente → (3) Implementazione

### Task Tecnici Dettagliati

#### TASK 1: Database Lore (worker.js — buildCleanPrompt)
- **File da modificare**: `AI/worker.js` (funzione `buildCleanPrompt()`)
- **Cosa fare**: Aggiungere sezione `== ARCHIVIO INTELLIGENCE ==` al prompt con 20-25 voci categorizzate
- **Categorie voci**:
  - UFO-INT: avvistamenti UFO (mix reali rielaborati + fittizi)
  - SIGINT: intercettazioni segnali, frequenze anomale
  - HUMINT: testimonianze, scomparse, personale impazzito
  - DOCINT: documenti sovietici declassificati (fittizi)
  - SCIINT: analisi scientifiche, studi su frequenze/risonanza
  - MEDIAWATCH: articoli di giornale (fittizi basati su fatti reali)
- **Formato ogni voce**: `[CLASSIFICAZIONE] DATA — TITOLO | Fonte: XXX | Corpo del testo`
- **Regole**: L'IA cita le voci quando il PG chiede info pertinenti. Non fa infodump. Risponde in stile militare.
- **Deploy**: richiede `wrangler deploy`

#### TASK 2: Tracking PG Connessi (worker.js + terminal.html)
- **File da modificare**: `AI/worker.js` (nuovo endpoint + modifica buildHackedPrompt + modifica buildTerminalPrompt), `AI/terminal.html` (aggiungere chiamata connessione)
- **Nuovo endpoint**: `POST /api/connect/:op` — salva `state.connected[op] = timestamp`
- **Modifica stato KV**: `state.connected = { chief: ts, ghost: ts, ... }` (solo quelli connessi)
- **Modifica buildHackedPrompt**: iniettare lista PG connessi nel prompt
- **Modifica buildTerminalPrompt**: iniettare lista PG connessi (per conversione e interazione)
- **Modifica terminal.html**: al boot in modalita hackerata, dopo `showMainHacked()`, chiamare `POST /api/connect/:op`
- **Dashboard GM**: mostrare pallino verde sui PG connessi
- **Deploy**: richiede `wrangler deploy`

#### TASK 3: Scena Conversione (monitor.html + worker.js)
- **File da modificare**: `AI/monitor.html` (nuova sequenza), `AI/worker.js` (aggiornare prompt terminale con tag conversione)
- **Nuova funzione in monitor.html**: `runConversion(pgList)`
  - Riceve lista PG attivi (da stato worker o hardcoded)
  - Per ogni PG:
    - Mostra: `"[CALLSIGN]. Accetti la trasformazione?"` (typewriter)
    - Intercetta SOLO tasto `S` o `N` dalla tastiera (altri tasti ignorati)
    - Il tasto premuto NON appare sul terminale
    - Dopo la pressione: frase epica (rotazione tra 3-4 frasi diverse)
    - Salva la scelta internamente
    - Pausa drammatica, poi passa al prossimo
  - Dopo l'ultimo PG:
    - Pausa lunga (3-4 secondi)
    - Rivela i risultati uno per uno con effetto drammatico
    - "GHOST — CONVERTITO" (verde) o "GHOST — RIFIUTATO" (rosso)
    - Se misti: messaggio di conflitto
  - Input riabilitato per continuare la chat (se servono non-mutanti)
- **Trigger**: tag `[SEQUENZA:conversione]` nel parser di monitor.html (come gli altri 3 tag)
- **Problema**: come fa monitor.html a sapere quali PG sono attivi? Opzioni:
  - (A) Fetch da worker `/api/gm/state` → legge `state.connected`
  - (B) L'IA li elenca nel tag: `[SEQUENZA:conversione:chief,ghost,torcia]`
  - **Decisione**: opzione A (piu pulita, usa il tracking del Task 2)
- **Prompt terminale**: aggiungere istruzioni su quando usare il tag `[SEQUENZA:conversione]`
- **Materiale avventura**: scrivere la scena conversione in Piano_Meno_Tre.md o file dedicato (regole SWADE, bonus stat, Rigenerazione)

#### TASK 4: Musica e Audio (ULTIMA PRIORITA — Da Definire)
- **Non iniziare** finche l'utente non fornisce le tracce audio
- **Architettura**: nuova cartella `AI/Audio/`, `<audio>` elements o AudioBuffer, fade via gainNode
- **Trigger**: tag nel prompt IA (es. `[MUSICA:tensione]`) o rilevamento automatico basato su BIOSCAN

### Modifiche Effettuate — Sessione 2026-03-08

#### TASK 1: Database Lore — COMPLETATO e DEPLOYATO
**File modificato**: `AI/worker.js` — funzione `buildCleanPrompt()` (riga 261+)
**Cosa e stato fatto**:
- Aggiunta sezione `== ARCHIVIO INTELLIGENCE ==` con 25 voci tra `== ARCHIVIO FOTOGRAFICO ==` e `== ACCESSO NEGATO ==`
- Aggiunta sezione `== REGOLE ARCHIVIO ==` con istruzioni per l'IA su come citare le voci
- Categorie implementate: UFO-INT (5 voci), SIGINT (4 voci), HUMINT (5 voci), DOCINT (4 voci), SCIINT (4 voci), MEDIAWATCH (3 voci)
- Ogni voce ha: codice, data, titolo, classificazione, fonte, corpo del testo
- Le voci si collegano tra loro con riferimenti incrociati (es. "cfr. SIGINT-002")
- L'IA risponde con 1-2 voci alla volta, stile militare, citando i codici

**Lore squadre aggiunto** (stessa funzione, righe 229+):
- Squadre ALPHA, CHARLIE, DELTA, ECHO ora hanno: Team Leader (nome, callsign, nazionalita, background), compito, composizione, posizione
- TL inventati: VIPER (Elena Dragunova, UKR), HAMMER (Dmitri Reznikov, UKR), BISHOP (Anika Meier, DEU), PRIEST (Samuel Osei, GBR)
- Dettagli personali approfonditi restano CLASSIFICATI

**Deploy**: `npx wrangler deploy` eseguito con successo. Worker ID: `e20e013f` poi `4e0434f2`.

#### Wrangler Setup — COMPLETATO
**File creato**: `AI/wrangler.toml`
- Contenuto: name=sarcofago, main=worker.js, compatibility_date=2025-02-17, KV binding CHAT_KV con ID `070a00f9d9ea44898cabd23340e5df9e`
- `.gitignore` aggiornato per escludere `wrangler.toml` dal repository pubblico
- Login Cloudflare eseguito (`npx wrangler login`)
- Deploy ora funziona dalla cartella AI/ con `npx wrangler deploy`

#### Feature UX terminal.html — COMPLETATA (locale, no deploy)
**File modificato**: `AI/terminal.html`
**Cosa e stato fatto**:

1. **Codici intelligence cliccabili** (CSS `.intel-code` + event listener globale):
   - Regex in `addAIMsg()` converte codici tipo `SIGINT-002`, `UFO-INT-003` ecc. in `<span class="intel-code">` cliccabili
   - Pattern: `/\b(UFO-INT|SIGINT|HUMINT|DOCINT|SCIINT|MEDIAWATCH)-(\d{3})\b/g`
   - Click invia automaticamente "Dettagli SIGINT-002"
   - Stile: colore blu accent, sottolineatura puntinata

2. **Bottoni risposta rapida** (CSS `.quick-replies` + `.quick-reply-btn` + funzione `detectQuickReplies()`):
   - Container `<div id="quickReplies">` aggiunto prima di `.input-area`
   - Appaiono sopra la barra di input dopo ogni risposta IA
   - Click compila e invia automaticamente, poi i bottoni scompaiono
   - Detection implementata:
     - **Domande si/no**: rileva "vuoi", "confermi", "procedere" ecc. → bottoni AFFERMATIVO/NEGATIVO
     - **Elenchi puntati/numerati**: ogni riga che inizia con `-` o `1.` diventa un bottone (estrae la parte chiave prima di `|`, `—`, `:`)
     - **Codici intel multipli**: se 2+ codici menzionati, bottone per ognuno
     - **Opzioni inline**: rileva "A, B o C" dopo `:` → bottoni per ogni opzione
   - Max 8 bottoni, etichette troncate a 22 caratteri
   - Stile: font monospace, bordo verde, variante `.accent` in blu per entita cliccabili

**NOTA**: terminal.html e locale (file://), non richiede deploy.

#### TASK 2: Tracking PG Connessi — COMPLETATO e DEPLOYATO
**File modificati**: `AI/worker.js`, `AI/terminal.html`
**Cosa e stato fatto**:
- **Nuovo endpoint**: `POST /api/connect/:op` — salva `state.connected[op] = Date.now()` in KV
- **`getState()` aggiornato**: default ora include `connected: {}`
- **`buildHackedPrompt()`**: nuovo parametro `connectedOps`, blocco `== PG ATTUALMENTE CONNESSI ==` iniettato nel prompt (solo se ci sono PG connessi)
- **`buildTerminalPrompt()`**: nuovo parametro `connectedOps`, blocco `== PG PRESENTI ==` iniettato nel prompt
- **`handleChat()`**: passa `connectedOps` a `buildHackedPrompt()`
- **`handleTerminal()`**: legge stato e passa `connectedOps` a `buildTerminalPrompt()`
- **`handleProactive()`**: passa `connectedOps` a `buildHackedPrompt()`
- **Dashboard GM**: pallino verde (`.conn-dot.online`) accanto allo status-dot sulle card operatori
- **terminal.html**: `fetch(WORKER_URL+'/api/connect/'+opKey,{method:'POST'})` fire-and-forget alla fine di `showMainHacked()`
- **Deploy**: `npx wrangler deploy` eseguito. Worker version: `f9707810`

#### Revisione Fasi: Da 6 a 3 — COMPLETATO e DEPLOYATO
**File modificato**: `AI/worker.js`
**Cosa e stato fatto**:
- `PHASE_CONTEXT`: ridotto da 6 fasi a 3, mappate sui piani del bunker:
  - Fase 1 = Piano -1 (Uffici): predatore paziente, finge di essere il Comando, costruisce fiducia
  - Fase 2 = Piano -2 (Laboratori): maschera scivola, usa segreti dei PG come armi, manipolazione pesante
  - Fase 3 = Piano -3 (Grotte): maschera caduta, intelligenza fredda e potente, endgame disperato
- L'IA e sveglia da 29 anni — mai confusa o appena svegliata
- Dashboard GM: selettore fasi aggiornato a 3 opzioni (Piano -1/Uffici, Piano -2/Laboratori, Piano -3/Grotte)
- `getState()` default `phase: 1` resta valido (ora corrisponde a Piano -1)
- Deploy: `npx wrangler deploy` eseguito. Worker version: `17607540`
- **Seconda passata**: aggiornate anche le sezioni "COME TI PRESENTI", "STRATEGIA", "COME SCRIVI" in `buildHackedPrompt()` per differenziare fase 1 (facciata confusa/spaventata) vs fase 2-3 (maschera caduta, fredda, potente). Deploy version: `27a81519`

#### Revisione Prompt Hackerato: Intensificazione + BIOSCAN — IN ATTESA DEPLOY
**File modificati**: `AI/worker.js`, `AI/terminal.html`
**Cosa e stato fatto**:

**worker.js — PHASE_CONTEXT riscritto con tattiche specifiche per piano:**
- Fase 1: trappola magazzino (guida PG con bugie su Alpha), campo minato (menzionare o tacere), Alpha come esca, domande sonda per mappare debolezze, bugia "sono il sistema di comunicazione"
- Fase 2: Alpha come arma psicologica (nomi operatori morti/infetti), acqua radioattiva come trappola ("passaggio rapido a est"), breccia come merce di scambio, segreti PG contestualizzati, alternanza suppliche/minacce
- Fase 3: segreti chirurgici per ogni PG, percezione emotiva al massimo, ghiaccio e fuoco, offerta conversione, indizi Kael-Thar come "errori", ultimo ricatto ("libero tutto")

**worker.js — Sezioni prompt aggiornate:**
- `COME TI PRESENTI`: da 2 a 3 livelli (vittima → maschera scivola → intelligenza fredda)
- `STRATEGIA`: graduata per fase (fase 1 sonda, fase 2 segreti come armi, fase 3 manipolazione totale)
- `COME SCRIVI`: da 2 a 3 livelli (spezzato → articolato → chirurgico)
- `COSA NON RIVELARE`: da lista piatta a regole graduate per fase (risolve contraddizioni — fase 1 vietato tutto, fase 2 alcuni divieti cadono, fase 3 quasi tutto permesso)

**worker.js — BIOSCAN aggiunto al prompt:**
- Nuova sezione `== BIOSCAN ==` nel prompt hackerato
- L'IA DEVE includere `[BIOSCAN:etichetta]` alla fine di OGNI risposta in modalita hackerata
- Etichette graduate per fase: vaghe/cliniche (fase 1), precise/inquietanti (fase 2), intime/invasive (fase 3)
- Il BIOSCAN e un DATO freddo, non un commento — il dispositivo mostra che qualcosa sta leggendo l'operatore

**terminal.html — Parsing e visualizzazione BIOSCAN:**
- `addAIMsg()` modificata: estrae `[BIOSCAN:label]` dalla risposta PRIMA di processare il testo
- Tag rimosso dal testo visibile, mostrato come elemento separato dentro il msg-bubble
- Visualizzazione: pallino arancione pulsante + etichetta in monospace 8px, font-spacing largo, colore arancione dim
- CSS: `.bioscan`, `.bioscan-icon` (pulsante), `.bioscan-label`, animazione `bioscan-in` (scaleX da 0.3)
- SOLO in modalita hackerata (controllo `isChatMode`) — chat pulita e monitor non toccati
- `detectQuickReplies()` riceve il testo pulito (senza tag BIOSCAN)

**Decisione architetturale — BIOSCAN separati:**
- terminal.html (TACS-7 hackerato): BIOSCAN generato dall'IA, stile militare compromesso, etichette cliniche
- monitor.html (terminale sovietico): BIOSCAN separato, sara gestito da altra AI — stile alieno/clinico, piu invasivo
- Le due implementazioni sono indipendenti e non si toccano

**Deploy**: `npx wrangler deploy` eseguito. Worker version: `e8b34db4`

### Regole per Claude Paralleli

**LEGGERE PRIMA DI LAVORARE**:
1. Leggere `Operazione Sarcofago/CLAUDE.md` (istruzioni progetto complete)
2. Leggere `Operazione Sarcofago/MEMORY.md` (questo file — piano di lavoro)
3. Leggere `Operazione Sarcofago/AI/CLAUDE.md` (istruzioni tecniche cartella AI)
4. Se devi modificare worker.js: LEGGERE TUTTO worker.js prima
5. Se devi modificare terminal.html: LEGGERE TUTTO terminal.html prima
6. Se devi modificare monitor.html: LEGGERE TUTTO monitor.html prima

**REGOLE TASSATIVE**:
- **ESEGUI SOLO il task assegnato** + quello che l'utente chiede durante la sessione
- **MAI inventare feature, file, configurazioni di tua iniziativa** — se non e nel task, non farlo
- Se pensi serva qualcosa in piu: **CHIEDI, non fare**
- **Modifica SOLO i file indicati nel task** (salvo richieste esplicite dell'utente)
- MAI modificare worker.js senza conferma (e deployato su cloud)
- MAI toccare i path delle immagini
- L'utente NON e un developer — spiegare tutto step-by-step
- CHIEDERE se qualcosa non e chiaro
- Comunicare in italiano
- **A fine lavoro**: aggiorna MEMORY.md e CLAUDE.md con quello che hai fatto
- **Il piano definito e la direzione da seguire** — non deviare senza autorizzazione
