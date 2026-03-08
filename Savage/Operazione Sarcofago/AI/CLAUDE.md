# CLAUDE.md — AI/ (Operazione Sarcofago)

Leggere SEMPRE questo file prima di modificare qualsiasi cosa in AI/.

## Hosting e Deploy

- `terminal.html` e `monitor.html` serviti da `https://mkd.sx/ia/`
- `worker.js` deployato su Cloudflare Worker: `sarcofago.webmaster-96a.workers.dev`
- Deploy worker: `npx wrangler deploy` (dalla cartella AI/)
- File config: `wrangler.toml` in AI/ — **escluso da git** (repo pubblico). NON committare.
- Login Cloudflare: `npx wrangler login` (una tantum, apre il browser)
- Secret: `ANTHROPIC_API_KEY` (crittografata su Cloudflare)
- KV namespace: `sarcofago-chat` (binding: `CHAT_KV`, ID: `070a00f9d9ea44898cabd23340e5df9e`)
- Compatibilita runtime: Feb 17, 2026
- Registri Workers: Abilitati

## Struttura cartella AI/

- `worker.js` — backend (API proxy, KV storage, dashboard GM, 3 system prompt)
- `terminal.html` — TACS-7 dispositivo al polso giocatori (cellulare)
- `monitor.html` — terminale sovietico endgame (Surface sul tavolo)
- `wrangler.toml` — config Cloudflare (escluso da git)
- `Sfondo.png` — cornice CRT per monitor.html
- `logo-tacs7.png`, `patch-prometheus.png`, `icon-rad.png` — asset grafici
- `Immagini/` — sottocartelle (Operatori, Scienziati, Mutanti, Ambienti, Mappe, IA)

## Path immagini

- Gli HTML stanno su `mkd.sx/IA/` e le immagini su `mkd.sx/IA/Immagini/`
- Path relativo dagli HTML: `Immagini/Sottocartella/File.ext` (funziona)
- NON toccare i path, funzionano

## I 3 file e cosa fanno

### terminal.html (TACS-7)
Interfaccia chat per i giocatori, gira su cellulare. Ogni giocatore sceglie il proprio callsign. Comunica con il worker via `/api/chat` inviando callsign + messaggio. Mostra risposte dell'IA in stile terminale militare.

**Feature UX interattive** (aggiunte 2026-03-08):
- **Codici cliccabili**: i codici intel (UFO-INT-001, SIGINT-002, ecc.) nelle risposte IA diventano link blu cliccabili. Click → invia "Dettagli CODICE". Implementato in `addAIMsg()` con regex e event listener globale su `.intel-code`.
- **Bottoni risposta rapida**: container `#quickReplies` appare sopra l'input dopo ogni risposta IA. Funzione `detectQuickReplies(text)` analizza il testo e genera bottoni per: elenchi puntati/numerati (ogni item → bottone), domande si/no, codici intel multipli, opzioni inline separate da virgole. Click → compila input e invia. Max 8 bottoni.
- **BIOSCAN hackerato** (aggiunto 2026-03-08): L'IA include `[BIOSCAN:etichetta]` in ogni risposta in modalita hackerata. `addAIMsg()` estrae il tag con regex, lo rimuove dal testo visibile, e lo mostra come elemento `.bioscan` dentro il `.msg-bubble`. Visualizzazione: pallino arancione pulsante (`.bioscan-icon`) + etichetta monospace 8px (`.bioscan-label`). Animazione `bioscan-in` (scaleX). Solo in `isChatMode` — chat pulita ignora il tag. `detectQuickReplies()` riceve testo pulito senza tag BIOSCAN.

### monitor.html (Terminale sovietico)
Schermo endgame mostrato su Surface. Interfaccia CRT sovietica con Sfondo.png come cornice. Comunica con il worker via `/api/chat` usando callsign `terminal`. Triplo click attiva reset conversazione.

### worker.js (Backend)
Cloudflare Worker che fa da proxy verso l'API Anthropic. Endpoint principali:
- `GET /` — dashboard GM (stato conversazioni, reset, configurazione)
- `POST /api/chat` — riceve `{callsign, message}`, chiama Claude, salva in KV, ritorna risposta
- `POST /api/reset` — resetta tutte le conversazioni in KV
- `POST /api/state` — gestisce stato partita

Contiene 3 system prompt diversi: uno per TACS-7 (giocatori), uno per il terminale sovietico, uno di base.

## KV Storage

- Chiavi conversazioni: `conv:chief`, `conv:ghost`, `conv:premiere`, `conv:torcia`, `conv:undertaker`, `conv:terminal`
- Chiave stato: `state`
- Reset prima di ogni partita: dashboard GM, triplo click monitor.html, o `POST /api/reset`

## Endpoint Completi del Worker

| Metodo | Path | Scopo | Loggato |
|--------|------|-------|---------|
| GET | `/` o `/gm` | Dashboard GM (HTML integrato) | — |
| POST | `/api/chat` | Chat hackerata (terminal.html per operatore) | SI |
| POST | `/api/cmd` | Modalita pulita TACS-7 (solo proxy, no log) | NO |
| POST | `/api/terminal` | Chat terminale sovietico (monitor.html) | SI |
| GET | `/api/history/:op` | Recupero sessione operatore | — |
| GET | `/api/poll/:op?after=ts` | Polling messaggi proattivi | — |
| POST | `/api/init/:op` | Primo messaggio per operatore | — |
| GET/POST | `/api/gm/state` | Leggi/imposta fase e stato | — |
| GET | `/api/gm/conversations` | Tutte le conversazioni per dashboard | — |
| POST | `/api/gm/proactive` | Messaggio proattivo IA (GM trigger) | SI |
| POST | `/api/gm/directive` | Imposta/cancella direttiva operatore | — |
| POST | `/api/reset` | Cancella tutte le conversazioni KV | — |

## Struttura KV Dettagliata

```
conv:chief        → [{role, content, ts, proactive?}, ...] (max 60)
conv:ghost        → idem
conv:premiere     → idem
conv:torcia       → idem
conv:undertaker   → idem
conv:terminal     → [{role, content, ts}, ...] (max 40)
state             → {phase: 1-3, operators: {}, directives: {op: type}, connected: {op: ts}}
```

## I 3 System Prompt

### buildCleanPrompt() — TACS-7 Pre-Avventura
- Personaggio: terminale militare crittografato
- Tono: 1-2 frasi, abbreviazioni militari
- Contiene: database missione (operatori, scienziati, squadre con TL e composizione, equipaggiamento)
- Contiene: catalogo immagini con tag `[FOTO:path]`
- Contiene: **Archivio Intelligence** (25 voci: UFO-INT, SIGINT, HUMINT, DOCINT, SCIINT, MEDIAWATCH) — IMPLEMENTATO
- Contiene: **Regole Archivio** (istruzioni per l'IA su come citare le voci) — IMPLEMENTATO
- Contiene: regole accesso negato (no creature, no mutanti, no contagio)
- Struttura sezioni nel template: COME RISPONDI → DATABASE MISSIONE → ARCHIVIO FOTOGRAFICO → ARCHIVIO INTELLIGENCE → REGOLE ARCHIVIO → ACCESSO NEGATO → REGOLE

### buildHackedPrompt(opKey, phase, directive) — Chat Hackerata
- Personaggio: entita sconosciuta che ha violato la crittografia
- Identita interna: IA aliena per terraformazione Kael-Thar
- Facciata: finge confusione, paura, solitudine
- Contesto operatore: personalizzato per ogni PG con segreti
- Comportamento per fase (1-3): regole rigide, PRIORITA ASSOLUTA
  - Fase 1 = Piano -1 (Uffici): predatore paziente, finge di essere il Comando
  - Fase 2 = Piano -2 (Laboratori): maschera scivola, usa segreti PG come armi
  - Fase 3 = Piano -3 (Grotte): maschera caduta, intelligenza fredda, endgame
- Direttive GM: iniettate alla fine, consumate dopo l'uso
- Catalogo immagini mutanti/ambienti
- Lista PG connessi iniettata nel prompt (IMPLEMENTATO)

### buildTerminalPrompt() — Terminale Sovietico Endgame
- Personaggio: IA diretta, fredda, macchina
- Usa TUTTI i segreti dei PG come armi
- Sequenze cinematiche: tag `[SEQUENZA:nome]` (analisi_terra, shutdown, autodistruzione)
- Ritmo: 10-15 minuti max, dare info facilmente, lasciare indizi Kael-Thar
- Lista PG connessi iniettata nel prompt (IMPLEMENTATO)
- DA AGGIUNGERE: istruzioni per tag `[SEQUENZA:conversione]`

## NUOVE FEATURE DA IMPLEMENTARE

### Feature 1: Database Lore (worker.js) — IMPLEMENTATA 2026-03-08
**Stato**: COMPLETATO e deployato
**File modificato**: `worker.js` — funzione `buildCleanPrompt()`, righe 261+
**Cosa e stato fatto**:
- 25 voci in 6 categorie: UFO-INT (5), SIGINT (4), HUMINT (5), DOCINT (4), SCIINT (4), MEDIAWATCH (3)
- Sezione `== ARCHIVIO INTELLIGENCE ==` tra ARCHIVIO FOTOGRAFICO e ACCESSO NEGATO
- Sezione `== REGOLE ARCHIVIO ==` con istruzioni per l'IA
- Lore squadre: ALPHA (VIPER), CHARLIE (HAMMER), DELTA (BISHOP), ECHO (PRIEST) con TL, compito, composizione

### Feature 1b: UX Interattiva terminal.html — IMPLEMENTATA 2026-03-08
**Stato**: COMPLETATO (locale, no deploy necessario)
**File modificato**: `terminal.html`
**Cosa e stato fatto**:
- **Codici cliccabili**: regex in `addAIMsg()` converte codici intel in `<span class="intel-code">` — click invia "Dettagli CODICE"
- **Bottoni risposta rapida**: container `#quickReplies` sopra input, funzione `detectQuickReplies(text)` analizza risposta IA e genera bottoni per: elenchi puntati, domande si/no, codici intel, opzioni inline
- CSS: classi `.intel-code`, `.quick-replies`, `.quick-reply-btn`, `.quick-reply-btn.accent`

### Feature 2: Tracking PG Connessi (worker.js + terminal.html) — IMPLEMENTATA 2026-03-08
**Stato**: COMPLETATO e deployato
**File modificati**: `AI/worker.js`, `AI/terminal.html`
**Cosa e stato fatto**:
- Endpoint `POST /api/connect/:op` — salva `state.connected[op] = Date.now()` in KV
- `buildHackedPrompt()`: parametro `connectedOps`, blocco `== PG ATTUALMENTE CONNESSI ==`
- `buildTerminalPrompt()`: parametro `connectedOps`, blocco `== PG PRESENTI ==`
- `handleChat()`, `handleTerminal()`, `handleProactive()`: passano connectedOps ai prompt
- Dashboard GM: pallino verde `.conn-dot.online` sulle card
- `terminal.html`: fetch fire-and-forget a `/api/connect/:op` alla fine di `showMainHacked()`

### Feature 3: Scena Conversione (monitor.html + worker.js)
**Cosa**: nuova sequenza cinematica — l'IA propone trasformazione individuale
**Trigger**: tag `[SEQUENZA:conversione]` nella risposta IA
**Monitor** (monitor.html):
```javascript
async function runConversion() {
  sequenceRunning = true;
  disableInput();
  // 1. Fetch PG connessi da /api/gm/state
  var state = await fetch(WORKER_URL + '/api/gm/state').then(r=>r.json());
  var pgList = Object.keys(state.connected || {});
  var choices = {};
  var epicPhrases = [
    'Il protocollo ha registrato.',
    'La tua scelta e stata sigillata.',
    'Irreversibile.',
    'Registrato nel nucleo.'
  ];
  // 2. Per ogni PG
  for (var i = 0; i < pgList.length; i++) {
    var pg = pgList[i];
    var callsign = pg.toUpperCase(); // o lookup da oggetto OPERATORS
    await typeAsync(callsign + '. Accetti la trasformazione?', 'check-fail');
    // 3. Intercetta SOLO S o N (keydown listener temporaneo)
    var choice = await new Promise(function(resolve) {
      function handler(e) {
        var k = e.key.toUpperCase();
        if (k === 'S' || k === 'N') {
          document.removeEventListener('keydown', handler);
          resolve(k);
        }
      }
      document.addEventListener('keydown', handler);
    });
    choices[pg] = choice;
    // 4. Frase epica (il tasto NON appare)
    await typeAsync(epicPhrases[i % epicPhrases.length], 'dim');
    await delay(1500);
  }
  // 5. Rivelazione finale
  await delay(3000);
  await typeAsync('PROTOCOLLO CONVERSIONE — RISULTATI', 'check-fail');
  await delay(1000);
  for (var pg in choices) {
    var accepted = choices[pg] === 'S';
    var label = accepted ? 'CONVERTITO' : 'RIFIUTATO';
    var cls = accepted ? 'check-ok' : 'check-fail';
    await typeAsync(pg.toUpperCase() + ' — ' + label, cls);
    // Audio: tono diverso per convertito vs rifiutato
    playTone(accepted ? 300 : 150, 0.3, 0.05);
    await delay(1200);
  }
  // 6. Se misti: messaggio conflitto
  var converted = Object.values(choices).filter(c => c === 'S').length;
  var refused = Object.values(choices).filter(c => c === 'N').length;
  if (converted > 0 && refused > 0) {
    await delay(2000);
    await typeAsync('CONFLITTO RILEVATO. PROTOCOLLO COMBATTIMENTO ATTIVO.', 'check-fail');
  }
  // 7. Riabilita input
  sequenceRunning = false;
  // input riabilitato solo se ci sono non-mutanti vivi
}
```
**Worker** (worker.js):
- Aggiungere `[SEQUENZA:conversione]` alle istruzioni del prompt terminale
- Istruzioni: "Usa questo tag quando proponi ai PG di unirsi a te. Il terminale gestira la scena."
- Aggiungere regola: "Dopo la conversione, se i PG rifiutano NON riproporre."

### Feature 4: Musica (ULTIMA — Non Iniziare)
**Stato**: in attesa che l'utente fornisca le tracce audio
**Architettura prevista**: cartella `AI/Audio/`, AudioBuffer + GainNode per fade, trigger via tag o BIOSCAN

## Regole per Claude Code

1. **LEGGERE SEMPRE** questo file + `CLAUDE.md` + `MEMORY.md` dell'avventura prima di modificare qualsiasi cosa in AI/
2. **ESEGUI SOLO il task assegnato** + quello che l'utente chiede durante la sessione
3. **MAI inventare feature, file, configurazioni di tua iniziativa** — se non e nel task, non farlo
4. Se pensi serva qualcosa in piu: **CHIEDI, non fare**
5. **Modifica SOLO i file indicati nel task** (salvo richieste esplicite dell'utente)
6. **MAI modificare worker.js senza conferma** — e' gia deployato su cloud
7. **MAI toccare i path delle immagini** — funzionano, non romperli
8. **CHIEDERE prima di fare modifiche** — l'utente non e' un developer
9. Il lore e la narrativa stanno nei file dell'avventura, NON qui
10. Comunicare in italiano
11. Dopo modifiche a worker.js serve `npx wrangler deploy` dalla cartella AI/ (chiedere all'utente di eseguirlo, o eseguirlo direttamente se autorizzato)
12. **A fine lavoro**: aggiorna MEMORY.md e CLAUDE.md con quello che hai fatto
13. **Il piano definito e la direzione da seguire** — non deviare senza autorizzazione
