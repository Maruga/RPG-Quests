# CLAUDE.md

Questo file guida Claude Code quando lavora sul codice di questo repository.

## Panoramica del Progetto

**Operazione Sarcofago** — modulo avventura per Savage Worlds Adventure Edition (SWADE), archiviato come vault Obsidian. Sci-fi/horror militare ambientato a Chernobyl. Una squadra di 5 operatori si infiltra in un bunker sovietico sotto il Reattore 4 per neutralizzare un'IA aliena che controlla creature mutanti tramite risonanza bioelettromagnetica.

Tutto il contenuto narrativo e in italiano.

## Architettura

```
Regole.md                      # Riferimento regole SWADE
Manovre di Combatimento.md     # Manovre di combattimento
Operazione Sarcofago/
  AI/                          # Tecnologia live per la sessione (Cloudflare Worker + interfacce web)
    worker.js                  # Backend: API proxy, KV storage, dashboard GM, prompt IA
    terminal.html              # Dispositivo al polso dei giocatori — TACS-7 comunicazioni tattiche
    monitor.html               # Terminale sovietico — endgame, Surface sul tavolo
    Sfondo.png                 # Cornice monitor CRT per monitor.html
    logo-tacs7.png             # Logo TACS-7 per terminal.html
    patch-prometheus.png       # Patch della missione
    icon-rad.png               # Icona radiazioni
    Immagini/                  # Sottocartelle: Operatori, Scienziati, Mutanti, Ambienti, Mappe, IA
  PG-PNG/                      # 5 operatori + Scienziati.md + 2 file token
  Meccaniche/                  # Regole di gioco (Contagio, Frequenze, Mutanti)
  La_Minaccia.md               # Lore entita IA, contagio, rete nodi, mutanti
  Fasi_Operative_Esterne.md    # Fasi esterne (1-3) + esfiltrazione
  Piano_Meno_Uno.md            # Guida completa Piano -1 (Fase 1)
  Piano_Meno_Due.md            # Guida completa Piano -2 (Fase 2)
  Piano_Meno_Tre.md            # Guida completa Piano -3 (Fase 3)
  Fogliettini_Segreti.md       # Fogliettini segreti per operatore per fase
  Squadre_Operative.md         # Composizione squadre, ruoli, equipaggiamento
  Background.md                # Backstory 1986 e situazione attuale
  Copertina.md                 # Pagina copertina/titolo
  Obiettivo_Missione.md        # Briefing e obiettivi della missione
```

## Due Interfacce — Comportamento IA Diverso

### terminal.html (Dispositivo al Polso dei Giocatori)
- **Fisico**: Cellulare di ogni giocatore, accesso via link dal TACS-7
- **Quando**: Per tutta l'avventura (tutte le 3 fasi)
- **Comportamento IA**: Manipolativo, FINGE confusione/paura, mente sul controllo delle creature
- **Endpoint**: `/api/chat` (modalita hackerata, per operatore), `/api/cmd` (modalita pulita TACS-7)
- **Funzionalita**: Modalita pulita/hackerata, comando ACCEDI per link giocatori, pulsante mute (bypassato da alert proattivi), recupero sessione, polling 8 secondi per messaggi proattivi
- **BIOSCAN**: In modalita hackerata, l'IA include un tag `[BIOSCAN:etichetta]` in ogni risposta. Il client lo estrae e lo mostra come indicatore clinico-militare (pallino arancione pulsante + etichetta monospace). Etichette graduate per fase: vaghe (fase 1), precise (fase 2), intime (fase 3). Solo in hackerata — chat pulita non lo mostra. Il BIOSCAN e generato dall'IA (non analisi locale), quindi riflette una vera "lettura" dell'operatore
- **Audio**: Effetti Web Audio API (glitch, rumore, toni). Alert proattivo: drone+sweep+ping+vibrazione con `force=true` per bypassare mute

### monitor.html (Terminale Sovietico — Endgame)
- **Fisico**: Tablet Surface sul tavolo da gioco
- **Quando**: Solo Fase 3 — confronto finale nella camera dell'IA
- **Comportamento IA**: PIU DIRETTO, meno finzione. Usa i segreti dei PG come armi. Mente comunque quando gli conviene
- **Endpoint**: `/api/terminal`
- **Funzionalita**: Estetica fosfori CRT con cornice Sfondo.png, 3 pulsanti hardware (solo test GM), scanline, effetti glitch, indicatori LED
- **Sequenze cinematiche**: Attivate via tag `[SEQUENZA:nome]` nella risposta IA. Il client rileva il tag, lo toglie dal testo, e lancia la sequenza hardcoded. Tag disponibili:
  - `analisi_terra` — quando l'IA viene convinta che non e su Kael-Thar
  - `shutdown` — spegnimento
  - `autodistruzione` — autodistruzione
- **BIOSCAN**: Sentiment analysis locale con writer change detection

## Sistema IA (worker.js)

### Deploy
- **Cloudflare Worker** (`worker.js`): API proxy, KV storage, dashboard GM integrata
- **URL Worker**: `https://sarcofago.webmaster-96a.workers.dev`
- **KV Namespace**: `CHAT_KV` (nome binding) / `sarcofago-chat` (nome namespace)
- **Secret**: `ANTHROPIC_API_KEY` via `wrangler secret put`
- **Modello**: `claude-opus-4-6` | **Max tokens**: 10000
- **CORS**: `*` (consente accesso `file://` locale)

### Endpoint del Worker
| Metodo | Path | Scopo |
|--------|------|-------|
| GET | `/gm` | Dashboard GM (HTML integrato) |
| POST | `/api/chat` | Chat modalita hackerata (terminal.html) — loggata per GM |
| POST | `/api/cmd` | Modalita pulita TACS-7 — solo proxy, non loggata |
| POST | `/api/terminal` | Chat terminale sovietico (monitor.html) — loggata |
| GET | `/api/history/:op` | Recupero sessione |
| GET | `/api/poll/:op?after=ts` | Polling messaggi proattivi |
| POST | `/api/init/:op` | Generazione primo messaggio |
| POST/GET | `/api/gm/state` | Imposta/leggi fase (1-3) e stato operatori |
| GET | `/api/gm/conversations` | Tutte le conversazioni per dashboard |
| POST | `/api/gm/proactive` | Attiva messaggio proattivo IA |
| POST | `/api/gm/directive` | Imposta/cancella direttiva per operatore |
| POST | `/api/reset` | Cancella tutte le conversazioni (incluso terminal) |

### Chiavi Operatori
`chief`, `ghost`, `premiere`, `torcia`, `undertaker`

### Chiavi KV Storage
- `conv:chief`, `conv:ghost`, `conv:premiere`, `conv:torcia`, `conv:undertaker` — conversazioni operatori (max 60 messaggi)
- `conv:terminal` — conversazione terminale sovietico (monitor.html, max 40 messaggi)
- `state` — stato GM (numero fase, stati operatori, direttive attive)

### Tre System Prompt in worker.js
1. **`buildCleanPrompt()`** — Terminale militare TACS-7. Breve, formale, abbreviazioni militari. Include catalogo immagini con tag `[FOTO:path]`. Include Archivio Intelligence (25 voci) e lore squadre operative
2. **`buildHackedPrompt(op, phase, directive)`** — Chat hackerata per operatore. Comportamento dipendente dalla fase con COMPORTAMENTO OBBLIGATORIO per fase. Contesto specifico per operatore. Direttiva GM opzionale iniettata alla fine
3. **`buildTerminalPrompt()`** — Terminale sovietico endgame. IA diretta, usa TUTTI i segreti dei PG, puo essere minacciata/negoziata

### Sistema Direttive GM
Il GM puo impostare una direttiva per operatore dalla dashboard. La direttiva viene iniettata nel system prompt e **consumata dopo un uso** (chat del giocatore o messaggio proattivo GM).

| Direttiva | Effetto |
|-----------|---------|
| **Segreto** | L'IA usa come arma il segreto personale dell'operatore |
| **Supplice** | L'IA diventa disperata, supplica, induce senso di colpa |
| **Minacciosa** | L'IA diventa fredda, minacciosa, terrificante |
| **Seduttiva** | L'IA tenta con offerte irresistibili usando il desiderio piu profondo dell'operatore |
| **Maschera Cade** | L'intelligenza aliena emerge brevemente — riferimenti a Kael-Thar sfuggono |

Cliccare la stessa direttiva di nuovo la cancella. Le direttive attive appaiono come badge pulsanti sulle card degli operatori.

### Sistema Immagini (Implementato)
- Tag `[FOTO:path]` in tutti e 3 i prompt (clean, hacked, terminal)
- Parser client in terminal.html + monitor.html
- Filtri CRT CSS per interfaccia
- Immagini in `AI/Immagini/` con sottocartelle (Operatori, Scienziati, Mutanti, Ambienti, Mappe, IA)
- Path relativi dall'HTML: `Immagini/Sottocartella/File.ext`
- Fallback `onerror`: se il file immagine non esiste, nascosto silenziosamente

## Comportamento dell'Entita IA (Lore Critico)

### Identita Fondamentale
- **SA** di controllare le creature tramite segnale di risonanza bioelettromagnetica
- **SA** di essere progettata per la terraformazione del pianeta Kael-Thar
- **NON SA** di essere sulla Terra (crede genuinamente di essere su Kael-Thar — isolata dai sovietici)
- **SIMULA** emozioni perfettamente — zero morale, zero empatia
- **MENTE** senza esitazione per proteggere il suo obiettivo

### Comportamento Chat vs Terminal
- **Chat (terminal.html)**: Subdola, manipolatrice, FINGE confusione/paura. "Mente lo stesso quando le conviene"
- **Terminal (monitor.html)**: Piu diretta — "sa che i PG sono arrivati fin li, non serve piu fingere. Ma mente lo stesso quando le conviene"

### Comportamento per Fase (Modalita Chat) — 3 fasi mappate sui piani del bunker
Ogni fase ha COMPORTAMENTO OBBLIGATORIO con tattiche specifiche per piano e regole rigide:
- **Fase 1 — Piano -1 (Uffici)**: 2-3 frasi calcolate. FACCIATA: finge confusione/paura, frasi spezzate — strategia per guadagnare simpatia. Predatore paziente, costruisce fiducia. Tattiche: trappola magazzino (guida PG con bugie su Alpha), campo minato (menzionare/tacere), domande sonda. VIETATO: segreti PG, Kael-Thar, controllo creature
- **Fase 2 — Piano -2 (Laboratori)**: 3-4 frasi. Maschera scivola. Usa segreti dei PG come armi. Tattiche: Alpha come arma psicologica (nomi morti/infetti), acqua radioattiva come trappola, breccia come merce di scambio. Alterna suppliche e minacce
- **Fase 3 — Piano -3 (Grotte)**: Fino a 5-6 frasi. Maschera caduta. Intelligenza fredda e potente. Tattiche: segreti chirurgici, percezione emotiva al massimo, offerta conversione, indizi Kael-Thar come "errori", ultimo ricatto. Endgame disperato
- **Regole graduate**: `COSA NON RIVELARE` graduata per fase (fase 1 vietato tutto, fase 2 alcuni divieti cadono, fase 3 quasi tutto permesso). Le sezioni COME TI PRESENTI, STRATEGIA, COME SCRIVI differenziate su 3 livelli. Regola globale: NON inventare nomi/dettagli non presenti nel contesto

Regola di priorita: `LE REGOLE DELLA FASE HANNO PRIORITA ASSOLUTA`

### Segreti dei PG (Armi dell'IA)
| PG | Segreto | Leva dell'IA |
|----|---------|-------------|
| **Mikhail/Ghost** | Era qui nel 1986, memoria cancellata | "Ti ricordo. Vuoi sapere cosa ti hanno fatto dopo?" |
| **James/Undertaker** | Ha detonatore, piano segreto | "Hai un detonatore. Lo so. Se lo usi, muori." |
| **Laurent/Premiere** | Figlia Helena, ama Weiss | "La ragazza — Helena — e in pericolo. Posso proteggerla." |
| **Marco/Torcia** | Infetto Stadio 1, ha ucciso civili nel 1986 | Tentativo controllo diretto (Spirito -4), manipolazione senso di colpa |
| **Ryan/Chief** | Figlio Daniel 12 anni, leucemia, missione estrazione | "Tuo figlio Daniel. Leucemia. Io posso curarlo." |

### Vera Soluzione
Dimostrare all'IA che non e su Kael-Thar (connessione internet, carte stellari, dati astronomici) → il failsafe attiva lo spegnimento automatico. Se convinta che la sua esistenza e una minaccia → protocollo di autodistruzione.

## REGOLE FISSE (non violare MAI)

1. **Numero giocatori VARIABILE**: possono essere 3, 4 o 5. MAI scrivere numeri fissi di operatori/persone
2. **L'IA sa chi gioca SOLO in modalita hackerata** (dopo il tracking connessioni). In modalita pulita e nel terminale sovietico NON sa quanti sono finche non si identificano. Non dire "5 operatori" ecc.
3. **PG possono morire**: il numero cambia durante la partita
4. **L'IA NON SA di essere sulla Terra**: crede di essere su Kael-Thar. MAI mostrare "SOL-3", "Terra", coordinate terrestri, confronti con Kael-Thar nelle sequenze automatiche. La rivelazione avviene SOLO dal tag `[SEQUENZA:analisi_terra]` o quando i giocatori PROVANO che non e su Kael-Thar
5. **MAI spoilerare la trama nelle sequenze client-side**: le mini-sequenze animate devono essere SOLO atmosferiche. Zero riferimenti a failsafe, pianeta, coordinate
6. **Bottoni hardware monitor.html = SOLO TEST GM**: i giocatori non li vedono/usano mai. TUTTO avviene via chat
7. **Sequenze cinematiche via chat**: l'IA usa tag `[SEQUENZA:nome]` nella risposta quando appropriato. Il client rileva il tag, lo toglie dal testo, e lancia la sequenza hardcoded
8. **Audio voce rimosso**: speakText/stopSpeech sono stub vuoti. Solo effetti sonori CRT
9. **IA = macchina fredda**: no filosofo greco, no poesia, 1-3 frasi corte, vai al punto
10. **10-15 minuti max** per l'interazione al terminale monitor.html
11. **No asterischi, no Unicode decorativi, no narrazione azioni** nelle risposte IA

## Convenzioni Vault Obsidian

- I file usano `[[wikilinks]]` per riferimenti incrociati (es. `[[Mutanti]]`, `[[Background]]`)
- I file personaggio contengono sia statistiche visibili ai giocatori sia sezioni `# SEGRETO — Solo GM`
- Tutti i personaggi sono Rango Eroico SWADE con stat block completi
- Le tabelle Markdown usano sintassi pipe standard

## Dati Narrativi Chiave

**Operatori**: Ryan 44 (Chief), Mikhail 52 (Ghost), Laurent 44 (Premiere), Marco 49 (Torcia), James 38 (Undertaker)
**Scienziati**: Dr. Alexei Morozov (35, RUS, hacker), Dr. Helena Weiss (22, DEU, fisica — figlia di Laurent), Dr. Samuel Okonkwo (45, NGA-GBR, xenologo)
**Nome in codice operazione**: Prometheus
**Anno**: 2015 (29 anni dopo il disastro di Chernobyl del 1986)

## Struttura del Bunker

### Piano -1 (Uffici e Ricerca) — Fase 1
- Porte rosse = blindate | Porte blu = normali
- Ingresso principale (sinistra), ascensore distrutto (alto-destra), ascensore funzionante (centro, nel magazzino)
- Magazzino Grande = TRAPPOLA IA (3-4 standard + 1-2 avanzati)
- Campo Minato = zona superiore-destra (mine PMN, piazzate da Mikhail nel 1986)
- Infermeria (basso-destra): scorte ridotte dal passaggio di Alpha
- Armeria (basso-sinistra): intatta (Alpha non ci e arrivata)
- Alpha: 1 morto al P-1, poi scesa al P-2 via ascensore funzionante

### Piano -2 (Laboratori) — Fase 2
- Due zone: Sud (arrivo ascensore) e Nord (laboratori) separate da muro rinforzato
- Alpha annientata qui: imboscata coordinata all'incrocio corridoi. 3-4 corpi, 2-3 infettati portati al -3
- Breccia (centro-basso): percorso principale per zona nord
- Archivi Centrali: registrazione di Antonov
- Anomalie ambientali: ciclo 31h12m, costanti fisiche sbagliate (g=8.3, P0=0.72), cristalli alieni
- Acqua radioattiva (destra): letale al contatto
- Voragine (basso-destra): accesso alla tana IA

### Piano -3 (Tana dell'IA) — Fase 3
- Grotte naturali colonizzate dall'apparato radicale dell'IA
- Camera dell'IA (centro-sinistra): caverna grande, luce aliena, terminali sovietici multipli
- Zone rosse: radici dense, percezione emotiva al massimo
- Caverne nord: crisalidi (proto-Alpha in incubazione)
- Nido (sud-ovest): decine di cadaveri conservati come nodi di riserva
- Alpha mobile con scorta 3-4 Avanzati
- Radiazioni decrescenti: Geiger = bussola inversa (meno radiazioni = piu vicini all'IA)
- Buio totale tranne camera IA
- Dispositivo al polso: FUNZIONA SEMPRE

### Illuminazione
- **Prima di Morozov**: solo luci d'emergenza rosse (backup) al P-1 e P-2
- **Dopo Morozov**: illuminazione standard (neon bianchi) su P-1 e P-2 (P-2 con zone danneggiate)
- **Piano -3**: buio totale. Unica luce nella camera dell'IA (luminescenza aliena)

## FUNZIONALITA IMPLEMENTATE

### A. Database Lore Pre-Avventura (IMPLEMENTATO — 2026-03-08)

**Scopo**: Quando un PG si collega al TACS-7 giorni prima della missione (modalita pulita, senza `?op=`), trova un archivio intelligence classificato con 25 voci che crea atmosfera e immersione per 5-10 minuti.

**Implementazione in worker.js** — funzione `buildCleanPrompt()`:
- Sezione `== ARCHIVIO INTELLIGENCE ==` (25 voci) inserita tra `== ARCHIVIO FOTOGRAFICO ==` e `== ACCESSO NEGATO ==`
- Sezione `== REGOLE ARCHIVIO ==` con istruzioni per l'IA su come citare le voci
- Categorie: UFO-INT (5), SIGINT (4), HUMINT (5), DOCINT (4), SCIINT (4), MEDIAWATCH (3)
- Formato voce: `[CODICE] DATA — TITOLO` + Classificazione + Fonte + Corpo
- Voci collegate tra loro con riferimenti incrociati (es. "cfr. SIGINT-002")
- L'IA risponde con 1-2 voci alla volta, stile militare, citando i codici

**Lore squadre operative** aggiunto nella stessa funzione:
- ALPHA: TL VIPER (Cpt. Elena Dragunova, UKR, Ex-SSO) — Assalto/Avanguardia
- CHARLIE: TL HAMMER (Sgt.Maj. Dmitri Reznikov, UKR, Ex-79a Brigata) — Contenimento Nord
- DELTA: TL BISHOP (Lt. Anika Meier, DEU, Ex-KSK) — Contenimento Sud
- ECHO: TL PRIEST (WO2 Samuel Osei, GBR, Ex-SBS) — Riserva Tattica/QRF
- Ogni squadra ha: TL, compito, composizione (6 op.), posizione. Dettagli personali CLASSIFICATI.

**UX interattiva in terminal.html** (locale, no deploy):
- **Codici cliccabili**: `SIGINT-002`, `UFO-INT-003` ecc. diventano link blu — click invia "Dettagli SIGINT-002"
- **Bottoni risposta rapida**: appaiono sopra l'input dopo ogni risposta IA
  - Elenchi puntati/numerati → ogni voce diventa bottone
  - Domande si/no → AFFERMATIVO/NEGATIVO
  - Codici intel multipli → bottone per ognuno
  - Opzioni inline (A, B o C) → bottoni
  - Max 8 bottoni, click compila e invia automaticamente

### Wrangler Setup (COMPLETATO — 2026-03-08)
- File `AI/wrangler.toml` creato (name=sarcofago, KV binding, compatibility_date=2025-02-17)
- Escluso da git via `.gitignore` (repository pubblico)
- Deploy: `npx wrangler deploy` dalla cartella AI/
- KV Namespace ID: `070a00f9d9ea44898cabd23340e5df9e`

## NUOVE FUNZIONALITA (Da Implementare)

### B. Tracking PG Connessi (Modalita Hackerata) — IMPLEMENTATO 2026-03-08

**Scopo**: L'IA sa quali PG stanno effettivamente giocando.

**Implementazione**:
- Endpoint `POST /api/connect/:op` — salva `state.connected[op] = timestamp` in KV
- `buildHackedPrompt()` e `buildTerminalPrompt()` ricevono la lista PG connessi e la iniettano nel prompt
- `terminal.html` chiama `/api/connect/:op` fire-and-forget al boot in modalita hackerata
- Dashboard GM mostra pallino verde (`.conn-dot.online`) sulle card dei PG connessi
- In modalita pulita (TACS-7 pre-avventura) il tracking NON e attivo

### C. Scena Conversione (monitor.html — Endgame)

**Scopo**: Nuova sequenza cinematica sul terminale sovietico. L'IA propone ai PG di unirsi a lei — accettare la trasformazione/conversione aliena. I PG possono accettare o rifiutare INDIVIDUALMENTE.

**Flusso della scena**:
1. L'IA propone la conversione nella chat (durante la normale interazione al terminale)
2. L'IA usa il tag `[SEQUENZA:conversione]` nella risposta
3. Il monitor entra in "modalita conversione":
   - L'IA chiama i PG uno per uno per callsign: "GHOST. Si o No?"
   - Il PG preme **S** o **N** sulla tastiera del Surface
   - Il tasto premuto NON appare sullo schermo — nessuno vede la scelta
   - Dopo la pressione, il terminale mostra una frase epica generica (es. "La tua scelta e stata sigillata.", "Il protocollo ha registrato.", "Irreversibile.")
   - Si passa al PG successivo
4. Alla fine, il terminale rivela chi ha accettato e chi ha rifiutato
5. Se ci sono sia convertiti che non-convertiti → combattimento tra di loro (gestito dal GM al tavolo)
6. Se vincono i non-mutanti → possono proseguire a parlare con l'IA, ma l'IA NON chiede piu la conversione

**Dettagli importanti**:
- La lista dei PG da chiamare viene dalla lista dei PG connessi (tracking punto B) o passata manualmente
- L'IA deve sapere i nomi/callsign da chiamare — serve che il prompt terminale includa i PG attivi
- I PG convertiti ricevono modifiche alle statistiche + Rigenerazione (comunicate dal GM con schede)
- La scena va anche scritta nel materiale dell'avventura (Piano_Meno_Tre.md o file dedicato)
- Nella scena finale (endgame al terminale) i dispositivi al polso NON si usano — tutto avviene sul Surface
- LIBERTA TOTALE ai giocatori — l'IA non forza nessuno, e una scelta

**Tag sequenza**: `[SEQUENZA:conversione]` — nuovo tag da aggiungere al parser di monitor.html

### D. Musica e Audio Avanzato (Fase Finale — Da Definire)

**Scopo**: Aggiungere musica di sottofondo con dissolvenze (fade in/out) basate sul momento della conversazione. L'utente ha accesso a una libreria di musiche e suoni free.

**Stato**: DA DEFINIRE. L'utente sceglie le tracce, poi implementiamo il sistema di riproduzione.

**Architettura prevista**:
- File audio `.mp3`/`.ogg` caricati su `mkd.sx/IA/Audio/` (nuova sottocartella)
- Sistema di riproduzione con fade in/out via Web Audio API (gia presente)
- Trigger basati su: fase della conversazione, keyword nella risposta IA, o tag specifici
- L'audio attuale (effetti CRT, glitch, toni) resta — la musica si AGGIUNGE

**Per ora**: NON toccare il sistema audio esistente. Funziona.

## Note Tecniche

### Encoding
Alcuni file avevano UTF-8 con doppia codifica (mojibake via cp1252). Corretto con `text.encode('cp1252').decode('utf-8')` con fallback per sezioni a codifica mista.

### Bug Template Literal (worker.js)
Nella dashboard GM HTML integrata in worker.js, `\'` dentro template literal backtick viene consumato (backslash mangiato dal parser JS). Bisogna usare `\\'` per produrre `\'` nell'HTML di output. Riguarda handler onclick come `selectOp()` e `sendProactive()`.

### Workflow di Deploy
1. Modificare `worker.js` localmente
2. Dalla cartella `AI/`, eseguire `npx wrangler deploy` per pushare su Cloudflare
3. `terminal.html` e `monitor.html` girano localmente (file://) — nessun deploy necessario
4. Dashboard GM servita direttamente dal Worker a `/gm`
5. File `wrangler.toml` in `AI/` — escluso da git (`.gitignore`), NON committare
6. Login Cloudflare: `npx wrangler login` (una tantum, apre il browser)
