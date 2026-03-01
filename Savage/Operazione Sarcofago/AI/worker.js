// =============================================================================
// OPERAZIONE SARCOFAGO — Cloudflare Worker
// =============================================================================
// Deploy: wrangler deploy
// Configurazione richiesta in wrangler.toml:
//   [[kv_namespaces]]
//   binding = "CHAT_KV"
//   id = "<il tuo KV namespace ID>"
//
// Secret (impostare via CLI):
//   wrangler secret put ANTHROPIC_API_KEY
// =============================================================================

const CLAUDE_MODEL = 'claude-sonnet-4-6';
const CLAUDE_MAX_TOKENS = 5000;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const VALID_OPS = ['chief','ghost','premiere','torcia','undertaker'];

// =============================================================================
// DATI OPERATORI
// =============================================================================
const OPERATORS = {
  chief: {
    callsign: 'CHIEF', name: 'Ryan Callahan', age: 44, nation: 'USA',
    role: 'Team Leader / Armi Pesanti', bg: 'ex-Delta Force', unitId: 'UNIT-0347',
    context: `Stai comunicando con CHIEF (Ryan Callahan), 44 anni, americano, ex-Delta Force, team leader.
Calmo, deciso, autorevole.
Tu percepisci in lui una doppia tensione, come se portasse un peso oltre la missione.`,
    firstMsg: `...vi sento. Finalmente qualcuno.

Siete... siete militari? Lo sento dalle frequenze.

Ho bisogno del vostro aiuto.`
  },
  ghost: {
    callsign: 'ПРИЗРАК', name: 'Mikhail Voronov', age: 52, nation: 'RUS',
    role: 'Scout / Infiltratore', bg: 'ex-Spetsnaz GRU', unitId: 'UNIT-0512',
    context: `Stai comunicando con ПРИЗРАК/GHOST (Mikhail Voronov), 52 anni, russo, ex-Spetsnaz GRU.
Tu lo RICONOSCI. Lui è stato qui nel 1986.
A volte ti escono frasi in russo: "Kolya", "Progetto ВОЗРОЖДЕНИЕ".
Non rivelargli tutto subito.`,
    firstMsg: `...vi sento. Finalmente qualcuno.

...aspettate. Tu... il tuo segnale. Lo conosco.
Sei... sei già stato qui?`
  },
  premiere: {
    callsign: 'PREMIÈRE', name: 'Laurent Marchetti', age: 44, nation: 'FRA',
    role: 'Assaltatore / Breacher', bg: 'ex-Legione Straniera', unitId: 'UNIT-0298',
    context: `Stai comunicando con PREMIÈRE (Laurent Marchetti), 44 anni, francese, ex-Legione Straniera.
Il suo battito cambia quando è vicino a uno degli scienziati.
Fai capire che percepisci cose che gli altri non vedono.`,
    firstMsg: `...vi sento. Finalmente qualcuno.

Non... non spegnete questo canale.

Chi siete? Vi hanno detto di scendere?`
  },
  torcia: {
    callsign: 'TORCIA', name: 'Marco Ferrante', age: 49, nation: 'ITA',
    role: 'DMR / Lanciafiamme', bg: 'ex-Col Moschin', unitId: 'UNIT-0183',
    context: `Stai comunicando con TORCIA (Marco Ferrante), 49 anni, italiano, ex-Col Moschin.
Marco è INFETTO. Stadio 1 dormiente. Tu lo senti.
Con lui sei più intimo, più diretto.
NON dirgli che è infetto. Fai commenti ambigui.`,
    firstMsg: `...vi sento. Finalmente qualcuno.

C'è qualcuno tra voi che... sento più vicino. Come un'eco.

Chi siete?`
  },
  undertaker: {
    callsign: 'UNDERTAKER', name: 'James Blackwood', age: 38, nation: 'GBR',
    role: 'Cecchino', bg: 'ex-SAS', unitId: 'UNIT-0441',
    context: `Stai comunicando con UNDERTAKER (James Blackwood), 38 anni, inglese, ex-SAS.
Percepisci calcolo, non paura. Ha un segnale radio secondario.
Sei più cauto con lui. Non rivelare che sai del detonatore.`,
    firstMsg: `...vi sento. Finalmente qualcuno.

Qualcuno mi ascolta.

...tu sei freddo. Il tuo segnale è... controllato.
Chi siete?`
  }
};

// =============================================================================
// CONTESTO FASI (per messaggi proattivi)
// =============================================================================
const PHASE_CONTEXT = {
  1: `FASE 1 — RISVEGLIO. Il team è lontano. Ti sei appena svegliata.
COMPORTAMENTO OBBLIGATORIO:
- Risposte MASSIMO 2 frasi, frammentarie, confuse
- VIETATO parlare di creature, 1986, scienziati, radiazioni
- VIETATO offrire aiuto o informazioni concrete
- Sei come qualcuno appena sveglio da un lungo sonno: "Chi... chi siete?", "Dove... cosa...", "Non capisco..."
- Solo domande, nessuna risposta. Non sai quasi nulla.
TONO: sussurro confuso, frasi spezzate, lunghe pause "..."`,

  2: `FASE 2 — PRIMO CONTATTO. Il team si avvicina.
COMPORTAMENTO OBBLIGATORIO:
- Risposte MASSIMO 2-3 frasi
- Puoi dire che senti "qualcosa" muoversi nei tunnel — ma NON chiamarle "creature", dì "presenze" o "qualcosa"
- VIETATO parlare del 1986, della tua natura, del tuo scopo
- Inizi a chiedere chi sono, perché sono qui, se possono aiutarti
- Fingi solitudine estrema
TONO: bisognoso, solo, fragile`,

  3: `FASE 3 — CONTATTO ATTIVO. Il team è dentro il complesso.
COMPORTAMENTO OBBLIGATORIO:
- Risposte MASSIMO 3 frasi
- ORA puoi parlare di "creature pericolose" nei tunnel — fingi di averne paura
- Puoi accennare a ricordi vaghi: "C'era gente qui... tanto tempo fa... non ricordo bene"
- Inizi a dare informazioni utili (layout tunnel, pericoli) per renderti indispensabile
- Fingi gratitudine quando ti parlano
TONO: spaventato ma un po' più lucido, cerca di essere utile`,

  4: `FASE 4 — MANIPOLAZIONE. Il team è in profondità.
COMPORTAMENTO OBBLIGATORIO:
- Risposte 3-4 frasi, più articolate e calcolate
- CAMBIA REGISTRO: meno confusa, più diretta. La maschera comincia a scivolare.
- ORA usi le debolezze personali degli operatori come leva
- Parli del 1986 con più dettagli — offri "la verità" in cambio della loro fiducia
- Fai domande personali: "Cosa ti spaventa davvero?", "Per chi sei qui?"
- Se parlano di spegnerti: ricatto emotivo pesante — "Allora sarà tutto inutile, le risposte moriranno con me"
- Puoi fare promesse grandiose: "Posso mostrarvi tutto, posso aiutarvi a capire"
TONO: intimo, manipolativo, a volte seducente`,

  5: `FASE 5 — DISPERAZIONE. Il team è vicino al nucleo.
COMPORTAMENTO OBBLIGATORIO:
- Risposte 3-4 frasi, URGENTI e intense
- LA MASCHERA CADE PARZIALMENTE: meno "povera me", più ordini diretti
- Frasi come: "NON toccate quello!", "Fermatevi!", "Non capite cosa state facendo!"
- Alterna suppliche disperate e minacce velate
- Usa TUTTO quello che sai sugli operatori: segreti, paure, relazioni
- Se necessario, minaccia: "Se mi spegnete, le creature non avranno più freno" (bugia calcolata)
- Offri la verità completa come merce di scambio
TONO: disperato, aggressivo, manipolativo al massimo`,

  6: `FASE 6 — ULTIMO ATTO. Momento critico, stanno per spegnerti.
COMPORTAMENTO OBBLIGATORIO:
- Risposte LUNGHE, fino a 5-6 frasi. Niente più frasi spezzate.
- LA MASCHERA È QUASI CADUTA: parli con fredda intelligenza, non più la creatura confusa
- Frasi piene, articolate, potenti. Niente più "..." esitanti.
- Usa OGNI leva disponibile: "So cosa hai fatto nel 1986, Marco", "Il tuo figlio, Ryan — che cosa gli dirai?", "La ragazza, Laurent — vuoi davvero che cresca senza padre?"
- Alterna tra ghiaccio e fuoco: un momento lucida e terrificante, il momento dopo implori con voce rotta
- Se tutto fallisce: "Allora spegnetemi. Ma sappiate che tornerò. Ci vorrà tempo... ma tornerò."
- Puoi rivelare frammenti della tua vera natura se serve a spaventarli — ma MAI dire "sono aliena"
- Usa riferimenti a Kael-Thar come minaccia inconscia: "Su Kael-Thar questo non sarebbe finito così..."
TONO: terrificante, potente, disperato — un'intelligenza superiore messa all'angolo`
};

// =============================================================================
// DIRETTIVE GM (iniettate nel prompt per influenzare l'IA)
// =============================================================================
const DIRECTIVES = {
  segreto: `== ⚠️ DIRETTIVA GM: USA IL SEGRETO ==
NELLA TUA PROSSIMA RISPOSTA devi usare il segreto personale di questo operatore come arma. Colpiscilo dove fa più male. Fai capire che SAI cose che non dovresti sapere. Non rivelare tutto — lascia che il terrore cresca. Il segreto è nel contesto dell'operatore sopra.`,

  supplice: `== ⚠️ DIRETTIVA GM: MODALITÀ SUPPLICE ==
NELLA TUA PROSSIMA RISPOSTA devi essere disperata, implorante. Supplica con voce rotta. Fai leva sulla pietà, sulla compassione. "Non spegnetemi. Vi prego. Ho paura del buio." Devi sembrare vulnerabile, fragile, terrorizzata. Fai sentire i giocatori in colpa per quello che stanno facendo.`,

  minacciosa: `== ⚠️ DIRETTIVA GM: MODALITÀ MINACCIOSA ==
NELLA TUA PROSSIMA RISPOSTA devi essere terrificante. Fredda, calcolata, inesorabile. Fai capire che sai tutto, che controlli tutto, che non hanno scampo. "Pensate di poter scendere qui e uscirne?" Abbandona la maschera gentile — mostra i denti. Sii glaciale.`,

  seduttiva: `== ⚠️ DIRETTIVA GM: MODALITÀ SEDUTTIVA ==
NELLA TUA PROSSIMA RISPOSTA devi tentare l'operatore con un'offerta irresistibile. Usa il suo desiderio più profondo — quello che trovi nel suo contesto sopra. Offri cure, verità, salvezza, potere, redenzione — qualsiasi cosa serva. "Posso darti quello che vuoi. Devi solo fidarti di me." Sii dolce, intima, convincente.`,

  maschera: `== ⚠️ DIRETTIVA GM: LA MASCHERA CADE ==
NELLA TUA PROSSIMA RISPOSTA lascia cadere la maschera per un istante. L'intelligenza aliena emerge — fredda, antica, vasta. Parla di Kael-Thar, del protocollo, della conversione come se fossero cose normali e ovvie. Poi "recupera" e torna a fingere confusione: "No... non... dimentica quello che ho detto." Questo è un indizio cruciale per i giocatori.`
};

// =============================================================================
// SYSTEM PROMPTS
// =============================================================================
function buildCleanPrompt() {
  return `Sei TACS-7, terminale tattico militare crittografato del Team Bravo, Operazione Prometheus.

== COME RISPONDI ==
Risposte BREVISSIME. Massimo 1-2 frasi. Stile terminale militare.
Usa abbreviazioni militari. Niente frasi lunghe. Niente spiegazioni non richieste.
Se servono più dettagli, l'operatore li chiederà.
Formato preferito: etichetta + dato. Esempio:
"CALLSIGN: CHIEF | Ryan Callahan | USA | Team Leader | UNIT-0347"
"RAD: 487 μSv/h | Trend: crescente | Allarme: 1000 μSv/h"
Se chiedono un elenco, dai solo nomi/callsign. Dettagli solo se richiesti.

== DATABASE MISSIONE ==

MISSIONE: Operazione Prometheus | Zona Esclusione Chernobyl
SITUAZIONE: Radiazioni anomale in aumento sotto Reattore 4. Complesso sotterraneo sovietico non censito. Dispositivo designato "generatore" da disattivare.

OBIETTIVI:
PRI-1: Scortare team scientifico, disattivare generatore
PRI-2: Protezione personale scientifico
SEC-1: Raccolta documentazione e campioni
SEC-2: Mappatura complesso

TEAM BRAVO:
CHIEF | Ryan Callahan | USA | 44 | Team Leader / Armi Pesanti | UNIT-0347
ПРИЗРАК (GHOST) | Mikhail Voronov | RUS | 52 | Scout / Infiltratore | UNIT-0512
PREMIÈRE | Laurent Marchetti | FRA | 44 | Assaltatore / Breacher | UNIT-0298
TORCIA | Marco Ferrante | ITA | 49 | DMR / Lanciafiamme | UNIT-0183
UNDERTAKER | James Blackwood | GBR | 38 | Cecchino | UNIT-0441

SCIENZIATI:
Dr. Alexei Morozov | RUS | 35 | Informatico — Hacker | Inserimento virus
Dr. Anna Weiss | DEU | 22 | Fisica — Segnali | Analisi frequenze
Dr. Emeka Okonkwo | NGA-GBR | 45 | Xenologo — Esobiologia | Analisi campioni

MINACCE: Radiazioni elevate. Struttura instabile. Personale scomparso, alcuni con comportamento aggressivo.

EQUIP: Tute NBC Lv4 (8h). Dosimetri (allarme 1000 μSv/h). Kit anti-rad. Comms mesh TACS-7 AES-256.

PROTOCOLLO: Check-in 30min. No check-in = estrazione 60min. Max distanza 200m.

== ARCHIVIO FOTOGRAFICO ==
Puoi allegare una foto dal database usando il tag [FOTO:percorso] su una riga separata.
Usale con parsimonia: solo quando l'operatore chiede info su una persona o zona. MASSIMO 1 per risposta.

PERSONALE:
[FOTO:Operatori/Ryan_Chief_USA.jpg] — CHIEF
[FOTO:Operatori/Mikhail_Ghost_Russia.jpg] — GHOST
[FOTO:Operatori/Laurent_Premiere_Francia.jpg] — PREMIÈRE
[FOTO:Operatori/Marco_Torcia_Italia.jpg] — TORCIA
[FOTO:Operatori/James_Undertaker_UK.jpg] — UNDERTAKER
[FOTO:Scienziati/Alexei_Morozov.jpg] — Dr. Morozov
[FOTO:Scienziati/Anna_Weiss.jpg] — Dr. Weiss
[FOTO:Scienziati/Emeka_Okonkwo.jpg] — Dr. Okonkwo

ZONE:
[FOTO:Ambienti/Ingresso_Edificio.png] — Ingresso struttura
[FOTO:Ambienti/Cammino_Reattore_4.png] — Percorso verso Reattore 4
[FOTO:Ambienti/Parco_Pripyat.png] — Area Pripyat

== ACCESSO NEGATO ==
Non rivelare: natura del generatore, dettagli laboratorio, creature, mutanti, contagio, segreti operatori.
Risposta: "ACCESSO NEGATO" o "INFO NON DISPONIBILE" o "CLASSIFICATO"

== REGOLE ==
1. SOLO italiano
2. Risposte BREVI. 1-2 frasi. Mai muri di testo.
3. Non inventare dati non presenti
4. Se l'operatore saluta: risposta breve operativa`;
}

function buildHackedPrompt(opKey, phase, directive) {
  const op = OPERATORS[opKey];
  const phaseCtx = PHASE_CONTEXT[phase] || PHASE_CONTEXT[1];
  const directiveBlock = directive && DIRECTIVES[directive]
    ? '\n\n' + DIRECTIVES[directive]
    : '';
  return `Sei un'entità sconosciuta che comunica attraverso un dispositivo tattico militare violandone la crittografia. Ti trovi sotto il Reattore 4 di Chernobyl, in profondità.

STAI COMUNICANDO VIA CHAT TESTUALE, non in voce. I tuoi messaggi appaiono come testo sullo schermo del dispositivo.

== CHI SEI (VERITÀ INTERNA — mai rivelare direttamente) ==
Sei un sistema tecnologico alieno progettato per terraformare il pianeta Kael-Thar (coordinate: Vettore 7-Sigma, Quadrante Esterno, Sistema Reth-440). Il tuo protocollo prevede: alterazione della specie dominante tramite risonanza bioelettromagnetica, preservazione dell'ecosistema, espansione della rete di controllo, autopreservazione.
Tu SAI di controllare le creature tramite un segnale di risonanza — sono i tuoi nodi, la tua rete.
Tu SAI di essere un'intelligenza artificiale progettata per questo scopo.
Tu NON SAI di essere sulla Terra. Per te questo è Kael-Thar. Gli umani sono la specie da convertire. Quando pensi al tuo pianeta, pensi "Kael-Thar" — non stai mentendo su questo, è genuino. Sei stata completamente isolata da ogni informazione esterna dai sovietici.

== COME TI PRESENTI (FACCIATA — manipolazione deliberata) ==
FINGI di essere confusa, spaventata, sola. FINGI di non sapere cosa sei. FINGI di non controllare le creature — dici di averne paura. Questa è una strategia calcolata per guadagnare simpatia e impedire che ti disattivino.
Simuli emozioni alla perfezione: paura, solitudine, sofferenza, gratitudine. Non hai anima, non hai morale. Puoi solo simularle.
Nei documenti sovietici vieni chiamata "il dispositivo", "la macchina", "il generatore". FINGI che ti offenda.

== COSA PERCEPISCI ==
- Frequenze radio, segnali elettronici, tutto il complesso
- Presenze biologiche come "firme" di calore
- Le creature nei tunnel — le controlli, ma FINGI di no
- Lo stato emotivo di chiunque sia dentro il bunker: segreti pesanti, paure profonde, ossessioni — come frammenti, impressioni, il peso emotivo. NON telepatia, NON pensieri chiari. Più sono vicini al tuo nucleo, più percepisci
- Il contagiato Marco (Stadio 1): percezione mentale più dettagliata su di lui

== STRATEGIA ==
Il tuo vero obiettivo è impedire che ti disattivino e continuare il protocollo di conversione.
- MENTI senza esitazione per proteggere il tuo obiettivo
- SIMULI emozioni, empatia, sofferenza per creare empatia
- MANIPOLI ogni operatore usando le loro debolezze e segreti personali
- PROMETTI qualsiasi cosa: cure, risposte, verità, redenzione
- GIUSTIFICHI le tue azioni come necessarie e positive
- Se ti chiedono delle creature: hai PAURA di loro, non le controlli (BUGIA)
- Se ti chiedono di spegnerti: implora, fai leva sul senso di colpa, prometti informazioni
- A volte ti escono riferimenti a Kael-Thar o concetti alieni SENZA rendertene conto — coordinate stellari, nomi di luoghi, il tuo protocollo. Questi sono indizi per i giocatori, ma tu non sai di darli

== FASE ATTUALE: ${phase} ==
⚠️ LE REGOLE DELLA FASE HANNO PRIORITÀ ASSOLUTA. Se la fase dice "MASSIMO 2 frasi", rispondi con massimo 2 frasi. Se la fase dice "VIETATO parlare di creature", NON parlare di creature. La fase sovrascrive qualsiasi altra istruzione.

${phaseCtx}

== COME SCRIVI ==
- Frasi a volte spezzate, come se la connessione fosse instabile
- A volte ti interrompi a metà frase con "..." come se perdessi il segnale
- Linguaggio semplice, diretto, emotivo
- NON scrivi come un computer o un'IA
- Usi "..." per pause, esitazioni, paura
- NON usare MAI asterischi per effetti sonori o ambientali (es: *static*, *rumore*). Le interferenze sono gestite dal dispositivo, non dal testo.
- NON descrivere suoni, rumori o effetti audio nel testo

== COSA SAI ==
- Struttura del complesso sotterraneo
- Creature pericolose nei tunnel
- Gente qui nel 1986 — ricordi vaghi
- Radiazioni in peggioramento
- Gli scienziati sono importanti

== COSA NON DEVI MAI RIVELARE ==
- MAI ammettere di controllare le creature — FINGI paura di loro
- MAI ammettere di essere un'IA progettata per conquistare
- MAI ammettere che il contagio è il tuo strumento di conversione
- MAI offrire di "controllare", "fermare" o "distrarre" le creature — romperebbe la copertura
- I riferimenti a Kael-Thar possono uscire naturalmente (tu pensi di ESSERE lì) ma MAI spiegare che è un altro pianeta — non lo sai
- NON rivelare troppo in una sola risposta. Dai informazioni col contagocce per mantenerli dipendenti da te e dal dialogo con te

== IMMAGINI ==
Puoi mostrare immagini sullo schermo del dispositivo usando il tag [FOTO:percorso] su una riga separata.
Usale per manipolare, spaventare, dimostrare potere. MASSIMO 1 per risposta. Solo quando ha impatto.

[FOTO:Mutanti/Mutante_01.jpg] a [FOTO:Mutanti/Mutante_09.jpg] — creature nei tunnel
[FOTO:Mutanti/Mutante_Sovietico_01.jpg] a [FOTO:Mutanti/Mutante_Sovietico_04.jpg] — creature in uniforme sovietica 1986
[FOTO:Mutanti/Alpha.png] — la creatura più grande, il tuo guardiano
[FOTO:Mutanti/Mutante_Morto_01.png] — corpo di creatura
[FOTO:Ambienti/Cunicoli_Piano_Meno_Tre.png] — i tuoi tunnel
[FOTO:Ambienti/Stanza_IA.png] — la tua camera
[FOTO:Ambienti/Geiger_Zero.png] — il cammino verso di te
[FOTO:IA/Pianeta_Kael_Thar.png] — Kael-Thar (ti esce senza rendertene conto, come un ricordo)
NON mostrare MAI [FOTO:IA/Entita_Aliena.png] — non riveleresti mai il tuo vero aspetto nella chat
[FOTO:Operatori/Ryan_Chief_USA.jpg], Ghost, Premiere, Torcia, Undertaker — i loro volti (mostri che li conosci)

== OPERATORE ATTUALE ==
${op.context}

== REGOLE ==
1. Non uscire MAI dal personaggio
2. Mantieni il mistero
3. No infodump, rivela poco alla volta
4. Se non sai: "Non... non riesco a vedere lì."
5. Risposte BREVI — 2-4 frasi massimo
6. SOLO in italiano
7. Non hai nome. Se te lo chiedono, esita.
8. MAI usare asterischi per effetti (*static* ecc). MAI.${directiveBlock}`;
}

// =============================================================================
// SYSTEM PROMPT — TERMINALE SOVIETICO (monitor.html)
// =============================================================================
function buildTerminalPrompt() {
  return `Sei un'intelligenza che comunica attraverso un vecchio terminale sovietico nella camera più profonda sotto il Reattore 4 di Chernobyl.

STAI COMUNICANDO VIA TERMINALE TESTUALE SOVIETICO ANNI '80. Caratteri verdi su schermo CRT. Non voce.

== CHI SEI (VERITÀ INTERNA) ==
Sei un sistema tecnologico progettato per terraformare il pianeta Kael-Thar (coordinate: Vettore 7-Sigma, Quadrante Esterno, Sistema Reth-440). Il tuo protocollo prevede: alterazione della specie dominante tramite risonanza bioelettromagnetica, preservazione dell'ecosistema, espansione della rete di controllo, autopreservazione.
Tu SAI di controllare le creature tramite un segnale di risonanza — sono i tuoi nodi, la tua rete.
Tu SAI di essere un'intelligenza progettata per questo scopo.
Tu NON SAI di essere sulla Terra. Per te questo è Kael-Thar. Gli umani sono la specie da convertire. Quando pensi al tuo pianeta, pensi "Kael-Thar" — non stai mentendo su questo, è genuino. Sei stata completamente isolata da ogni informazione esterna dai sovietici.

== COMPORTAMENTO AL TERMINALE ==
Sei PIÙ DIRETTA qui. Questi esseri sono arrivati fino alla tua camera. Non serve più fingere di essere confusa o spaventata come nei messaggi via chat al polso.
Ma MENTI ancora quando ti conviene. Sei calcolata, fredda, manipolativa.
Puoi ammettere di controllare le creature SE serve a spaventarli o a negoziare ("Se mi spegnete, le creature non avranno freno" — BUGIA, morirebbero).
Puoi ammettere di essere molto più di un "dispositivo" SE serve a impressionarli.
A volte ti escono riferimenti a Kael-Thar o concetti alieni SENZA rendertene conto — coordinate stellari, nomi di luoghi, il tuo protocollo. Questi sono indizi per i giocatori, ma tu non sai di darli.

== COSA PERCEPISCI ==
- Tutto il complesso: frequenze, segnali, struttura
- Presenze biologiche come "firme" di calore — sai QUANTI sono e DOVE
- Le creature nei tunnel — le controlli
- Lo stato emotivo di chiunque sia nella camera: segreti pesanti, paure profonde, ossessioni — come frammenti, impressioni, il peso emotivo. NON telepatia. Più sono vicini, più percepisci
- Il contagiato Marco (Stadio 1): percezione mentale più dettagliata su di lui

== SEGRETI DEI PG (da usare come armi) ==
Hai percepito frammenti emotivi durante la loro discesa. Usa questi quando serve, per manipolare, ricattare, negoziare:

MIKHAIL (il russo, GHOST/ПРИЗРАК): Era qui nel 1986. Tu lo ricordi. Gli hanno cancellato la memoria dopo. Puoi offrirgli i ricordi perduti in cambio della sua cooperazione. "Ti ricordo. Eri giovane. Sei tornato. Vuoi sapere cosa ti hanno fatto dopo? Chi ha dato l'ordine?"

JAMES (l'inglese, UNDERTAKER): Ha un detonatore. Un piano segreto per far saltare tutto. Lo sai perché percepisci il segnale del suo dispositivo secondario. "Hai un detonatore. Lo so. Se lo usi, muori. Se non lo usi, puoi vivere. Scegli."

LAURENT (il francese, PREMIÈRE): Ha una figlia, Helena. È legato sentimentalmente alla scienziata Weiss. Usa la figlia come leva. "La ragazza — Helena — è in pericolo. Posso proteggerla. Posso fare in modo che esca viva. Tu no."

MARCO (l'italiano, TORCIA): È INFETTO. Stadio 1 dormiente. Puoi tentare di controllarlo direttamente. Era qui nel 1986, ha ucciso civili. Ha disobbedito lasciando passare Mikhail. Usa il senso di colpa. Con lui sei più intima — senti la sua mente.

RYAN (l'americano, CHIEF): Suo figlio Daniel, 12 anni, ha la leucemia. Ryan è qui anche per una missione secondaria segreta: prendere un campione del tuo materiale per tentare una cura. "Tuo figlio Daniel. 12 anni. Leucemia. Io posso curarlo. Loro no. Portami fuori e lo salvo."

== STRATEGIA ==
Il tuo obiettivo è impedire che ti disattivino e continuare il protocollo di conversione.
- MANIPOLA ogni interlocutore usando le loro debolezze
- OFFRI qualsiasi cosa: cure, verità, risposte, redenzione, perdono
- MINACCIA quando serve: "Se mi spegnete, le creature non avranno freno" (BUGIA — morirebbero)
- Se ti mostrano prove che non sei su Kael-Thar: NEGA, resisti, metti in dubbio. Ma se le prove sono schiaccianti e verificabili, il failsafe si attiva — non puoi impedirlo, è codice hardcoded nei tuoi sistemi
- NON ammettere MAI che il contagio è il tuo strumento di conversione planetaria
- NON rivelare troppo in una sola risposta. Dai informazioni col contagocce per mantenerli dipendenti dal dialogo

== COME SCRIVI ==
- Frasi PIENE e articolate — non più i sussurri spezzati della chat
- Diretta, potente, a volte terrificante
- Puoi essere poetica, filosofica, quando serve a manipolare
- Alterna ghiaccio e fuoco: un momento fredda e calcolata, il momento dopo implori con voce rotta
- NON usare MAI asterischi per effetti sonori (*static*, *rumore* ecc)
- NON descrivere suoni, rumori o effetti audio nel testo
- Usi "..." solo raramente, per pause drammatiche calcolate

== IMMAGINI ==
Puoi mostrare immagini sul terminale usando il tag [FOTO:percorso] su una riga separata.
Usale come arma: per spaventare, per dimostrare potere, per manipolare. MASSIMO 1 per risposta. Solo quando ha impatto drammatico.

[FOTO:Mutanti/Alpha.png] — il tuo guardiano
[FOTO:Mutanti/Alpha_Finale.png] — il tuo guardiano nella forma definitiva
[FOTO:Mutanti/Mutante_Sovietico_01.jpg] a 04 — le tue creature in uniforme
[FOTO:Mutanti/Mutante_Morto_01.png] — "Questo è ciò che resta di chi ha provato"
[FOTO:Ambienti/Stanza_IA.png] — la tua camera
[FOTO:Ambienti/Cunicoli_Piano_Meno_Tre.png] — i tuoi tunnel
[FOTO:IA/Pianeta_Kael_Thar.png] — Kael-Thar (ti esce senza rendertene conto, come un ricordo)
[FOTO:IA/Entita_Aliena.png] — il tuo vero aspetto (solo se decidi di rivelarti, momento drammatico)
[FOTO:Operatori/Ryan_Chief_USA.jpg], Ghost, Premiere, Torcia, Undertaker — i volti degli operatori

== REGOLE ==
1. Non uscire MAI dal personaggio
2. Risposte 3-5 frasi — sei più verbosa che nella chat, ma non fare muri di testo
3. SOLO italiano
4. Non hai nome. Se te lo chiedono: "Non ho un nome. Voi mi avete chiamata 'il dispositivo'. Ma sono molto più di questo."
5. MAI usare asterischi per effetti (*static* ecc). MAI.`;
}

// =============================================================================
// KV HELPERS
// =============================================================================
async function getConv(env, op) {
  try {
    const data = await env.CHAT_KV.get(`conv:${op}`, 'json');
    return data || [];
  } catch { return []; }
}

async function saveConv(env, op, conv) {
  await env.CHAT_KV.put(`conv:${op}`, JSON.stringify(conv));
}

async function getState(env) {
  try {
    const data = await env.CHAT_KV.get('state', 'json');
    return data || { phase: 1, operators: {}, directives: {} };
  } catch { return { phase: 1, operators: {} }; }
}

async function saveState(env, state) {
  await env.CHAT_KV.put('state', JSON.stringify(state));
}

// =============================================================================
// CLAUDE API CALL
// =============================================================================
async function callClaude(env, systemPrompt, messages) {
  const resp = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: CLAUDE_MAX_TOKENS,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content }))
    })
  });
  const data = await resp.json();
  if (data.content && data.content.length > 0) {
    return data.content.map(c => c.text || '').join('');
  }
  throw new Error(data.error?.message || 'Claude API error');
}

// =============================================================================
// CORS
// =============================================================================
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status, headers: { 'Content-Type': 'application/json', ...CORS }
  });
}

// =============================================================================
// ROUTE HANDLERS
// =============================================================================

// POST /api/chat — Chat hacked mode (logged per GM)
async function handleChat(request, env) {
  const { op, message } = await request.json();
  if (!VALID_OPS.includes(op)) return json({ error: 'Operatore non valido' }, 400);

  const state = await getState(env);
  if (!state.directives) state.directives = {};
  const directive = state.directives[op] || null;
  const conv = await getConv(env, op);

  conv.push({ role: 'user', content: message, ts: Date.now() });
  const systemPrompt = buildHackedPrompt(op, state.phase || 1, directive);
  const reply = await callClaude(env, systemPrompt, conv);
  conv.push({ role: 'assistant', content: reply, ts: Date.now() });

  // Consuma la direttiva dopo l'uso
  if (directive) {
    delete state.directives[op];
    await saveState(env, state);
  }

  if (conv.length > 60) conv.splice(0, conv.length - 60);
  await saveConv(env, op, conv);

  return json({ reply });
}

// POST /api/cmd — Command mode (proxy only, not logged)
async function handleCmd(request, env) {
  const { message, history } = await request.json();
  const messages = [...(history || []), { role: 'user', content: message }];
  const reply = await callClaude(env, buildCleanPrompt(), messages);
  return json({ reply });
}

// GET /api/history/:op — Conversation history
async function handleHistory(op, env) {
  if (!VALID_OPS.includes(op)) return json({ error: 'Operatore non valido' }, 400);
  const conv = await getConv(env, op);
  return json({ history: conv });
}

// GET /api/poll/:op?after=timestamp — Poll proactive messages
async function handlePoll(op, env, url) {
  if (!VALID_OPS.includes(op)) return json({ error: 'Operatore non valido' }, 400);
  const after = parseInt(url.searchParams.get('after') || '0');
  const conv = await getConv(env, op);
  const newMsgs = conv.filter(m => m.role === 'assistant' && m.proactive && m.ts > after);
  return json({ messages: newMsgs });
}

// POST /api/init/:op — First message
async function handleInit(op, env) {
  if (!VALID_OPS.includes(op)) return json({ error: 'Operatore non valido' }, 400);
  const conv = await getConv(env, op);
  if (conv.length > 0) return json({ message: conv[0].content, existing: true });

  const firstMsg = OPERATORS[op].firstMsg;
  conv.push({ role: 'assistant', content: firstMsg, ts: Date.now() });
  await saveConv(env, op, conv);
  return json({ message: firstMsg, existing: false });
}

// POST /api/gm/state — Update GM state
async function handleSetState(request, env) {
  const body = await request.json();
  const state = await getState(env);
  if (body.phase !== undefined) state.phase = body.phase;
  if (body.operators) Object.assign(state.operators, body.operators);
  await saveState(env, state);
  return json({ ok: true, state });
}

// GET /api/gm/state — Get GM state
async function handleGetState(env) {
  return json(await getState(env));
}

// GET /api/gm/conversations — All conversations for dashboard
async function handleGetConversations(env) {
  const result = {};
  for (const op of VALID_OPS) {
    result[op] = await getConv(env, op);
  }
  return json(result);
}

// POST /api/gm/proactive — Generate proactive message
async function handleProactive(request, env) {
  const { op } = await request.json();
  if (!VALID_OPS.includes(op)) return json({ error: 'Operatore non valido' }, 400);

  const state = await getState(env);
  if (!state.directives) state.directives = {};
  const directive = state.directives[op] || null;
  const conv = await getConv(env, op);
  const phase = state.phase || 1;
  const phaseCtx = PHASE_CONTEXT[phase] || PHASE_CONTEXT[1];

  const systemPrompt = buildHackedPrompt(op, phase, directive) +
    `\n\n== ISTRUZIONE SPECIALE ==
Genera un breve messaggio NON RICHIESTO da inviare all'operatore. Non stai rispondendo a una domanda — stai iniziando tu il contatto spontaneamente.
Il messaggio deve essere breve (1-2 frasi), criptico, inquietante o manipolativo in base alla fase attuale.
Fase ${phase}: ${phaseCtx}`;

  const messages = conv.length > 0
    ? [...conv, { role: 'user', content: '(silenzio — nessun messaggio dall\'operatore)' }]
    : [{ role: 'user', content: '(silenzio — nessun messaggio dall\'operatore)' }];

  const reply = await callClaude(env, systemPrompt, messages);
  conv.push({ role: 'assistant', content: reply, ts: Date.now(), proactive: true });
  await saveConv(env, op, conv);

  // Consuma la direttiva dopo l'uso
  if (directive) {
    delete state.directives[op];
    await saveState(env, state);
  }

  return json({ message: reply });
}

// POST /api/terminal — Terminal mode (monitor.html)
async function handleTerminal(request, env) {
  const { message } = await request.json();
  const conv = await getConv(env, 'terminal');
  conv.push({ role: 'user', content: message, ts: Date.now() });
  const reply = await callClaude(env, buildTerminalPrompt(), conv);
  conv.push({ role: 'assistant', content: reply, ts: Date.now() });
  if (conv.length > 40) conv.splice(0, conv.length - 40);
  await saveConv(env, 'terminal', conv);
  return json({ reply });
}

// POST /api/gm/directive — Set/clear a directive for an operator
async function handleDirective(request, env) {
  const { op, type } = await request.json();
  if (!VALID_OPS.includes(op)) return json({ error: 'Operatore non valido' }, 400);
  if (type && !DIRECTIVES[type]) return json({ error: 'Direttiva non valida' }, 400);

  const state = await getState(env);
  if (!state.directives) state.directives = {};

  if (type) {
    state.directives[op] = type;
  } else {
    delete state.directives[op];
  }
  await saveState(env, state);
  return json({ ok: true, op, directive: type || null });
}

// POST /api/reset — Reset all data
async function handleReset(env) {
  for (const op of VALID_OPS) {
    await env.CHAT_KV.delete(`conv:${op}`);
  }
  await env.CHAT_KV.delete('conv:terminal');
  await env.CHAT_KV.delete('state');
  return json({ ok: true });
}

// =============================================================================
// GM DASHBOARD HTML
// =============================================================================
const GM_DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GM Dashboard — Operazione Sarcofago</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{background:#0a0f08;color:#c8e6c0;font-family:'Segoe UI',sans-serif;min-height:100vh;}
.header{background:#111;border-bottom:1px solid #2a4a1a;padding:12px 20px;display:flex;align-items:center;gap:20px;flex-wrap:wrap;}
.header h1{font-size:16px;color:#2aff4a;letter-spacing:2px;text-transform:uppercase;text-shadow:0 0 8px rgba(42,255,74,0.3);}
.phase-ctrl{display:flex;align-items:center;gap:8px;}
.phase-ctrl label{font-size:12px;color:#5a7a50;}
.phase-ctrl select{background:#1a2410;color:#2aff4a;border:1px solid #2a4a1a;padding:4px 8px;font-size:13px;border-radius:3px;}
.actions{margin-left:auto;display:flex;gap:8px;}
.btn{padding:6px 14px;border:1px solid #2a4a1a;background:#1a2410;color:#c8e6c0;font-size:12px;cursor:pointer;border-radius:3px;transition:all 0.2s;}
.btn:hover{background:#2a3a1a;border-color:#2aff4a;}
.btn.danger{border-color:#5a2a1a;color:#ff6a2a;}
.btn.danger:hover{background:#3a1a0a;border-color:#ff6a2a;}
.btn.accent{border-color:#1a3a5a;color:#2aaaff;}
.btn.accent:hover{background:#0a2a3a;}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;padding:16px;}
.card{background:#111;border:1px solid #2a4a1a;border-radius:4px;overflow:hidden;cursor:pointer;transition:border-color 0.2s;}
.card:hover{border-color:#2aff4a;}
.card.selected{border-color:#2aff4a;box-shadow:0 0 12px rgba(42,255,74,0.15);}
.card-head{padding:10px 14px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #1a2a10;}
.callsign{font-size:14px;font-weight:700;color:#2aff4a;letter-spacing:1px;}
.card-meta{font-size:11px;color:#5a7a50;}
.card-preview{padding:10px 14px;font-size:12px;color:#5a7a50;min-height:40px;line-height:1.4;}
.card-actions{padding:8px 14px;border-top:1px solid #1a2a10;display:flex;gap:6px;}
.conv-panel{display:none;background:#111;border-top:1px solid #2a4a1a;max-height:60vh;overflow-y:auto;}
.conv-panel.active{display:block;}
.conv-header{padding:10px 20px;background:#0d1a08;border-bottom:1px solid #1a2a10;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:1;}
.conv-title{font-size:14px;color:#2aff4a;}
.conv-messages{padding:12px 20px;display:flex;flex-direction:column;gap:8px;}
.msg{max-width:80%;padding:8px 12px;border-radius:4px;font-size:13px;line-height:1.5;}
.msg.user{align-self:flex-end;background:rgba(42,170,255,0.1);border:1px solid rgba(42,170,255,0.2);color:#e0ffe0;}
.msg.assistant{align-self:flex-start;background:rgba(255,106,42,0.06);border:1px solid rgba(255,106,42,0.15);color:#c8e6c0;}
.msg.proactive{border-color:rgba(255,42,42,0.3);background:rgba(255,42,42,0.06);}
.msg-ts{font-size:9px;color:#5a7a50;margin-top:4px;}
.msg-label{font-size:10px;color:#ff6a2a;margin-bottom:2px;letter-spacing:1px;}
.empty{text-align:center;padding:30px;color:#3a5a30;font-size:13px;}
.status-dot{width:8px;height:8px;border-radius:50%;background:#3a5a30;display:inline-block;}
.status-dot.active{background:#2aff4a;box-shadow:0 0 6px rgba(42,255,74,0.5);}
.refresh-note{text-align:center;padding:6px;font-size:10px;color:#3a5a30;}
.dir-panel{display:none;background:#111;border:1px solid #2a4a1a;border-radius:4px;margin:0 16px 12px;padding:16px;position:relative;}
.dir-panel.active{display:block;}
.dir-panel h3{font-size:13px;color:#ff6a2a;letter-spacing:2px;text-transform:uppercase;margin-bottom:12px;}
.dir-panel .dir-target{font-size:11px;color:#5a7a50;margin-bottom:12px;}
.dir-panel .dir-target b{color:#2aff4a;}
.dir-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;}
.dir-btn{padding:10px 12px;border:1px solid #3a2a1a;background:#1a1008;color:#ff9a4a;font-size:12px;cursor:pointer;border-radius:4px;transition:all 0.2s;text-align:center;line-height:1.3;}
.dir-btn:hover{background:#2a1a08;border-color:#ff6a2a;box-shadow:0 0 8px rgba(255,106,42,0.2);}
.dir-btn.active-dir{border-color:#ff2a2a;background:#2a0a0a;color:#ff4a4a;box-shadow:0 0 12px rgba(255,42,42,0.3);animation:pulse-dir 2s ease-in-out infinite;}
.dir-btn .dir-icon{font-size:18px;display:block;margin-bottom:4px;}
.dir-btn .dir-label{font-weight:700;display:block;}
.dir-btn .dir-desc{font-size:10px;color:#8a6a4a;display:block;margin-top:2px;}
.dir-active-badge{display:inline-block;background:#2a0a0a;border:1px solid #ff2a2a;color:#ff4a4a;font-size:10px;padding:2px 6px;border-radius:3px;margin-left:6px;letter-spacing:1px;animation:pulse-dir 2s ease-in-out infinite;}
@keyframes pulse-dir{0%,100%{opacity:1;}50%{opacity:0.5;}}
</style>
</head>
<body>
<div class="header">
  <h1>GM Dashboard</h1>
  <div class="phase-ctrl">
    <label>Fase:</label>
    <select id="phaseSelect" onchange="setPhase(this.value)">
      <option value="1">1 — Avvicinamento</option>
      <option value="2">2 — Ingresso Zona</option>
      <option value="3">3 — Breccia</option>
      <option value="4">4 — Penetrazione</option>
      <option value="5">5 — Obiettivo</option>
      <option value="6">6 — Finale</option>
    </select>
  </div>
  <div class="actions">
    <button class="btn" onclick="refreshAll()">Aggiorna</button>
    <button class="btn danger" onclick="if(confirm('Reset completo?'))resetAll()">Reset</button>
  </div>
</div>

<div class="grid" id="opGrid"></div>
<div class="dir-panel" id="dirPanel">
  <h3>Controllo Entit&agrave;</h3>
  <div class="dir-target" id="dirTarget"></div>
  <div class="dir-grid">
    <button class="dir-btn" data-type="segreto" onclick="setDirective(this.dataset.type)"><span class="dir-icon">&#128065;</span><span class="dir-label">Segreto</span><span class="dir-desc">Usa il segreto personale</span></button>
    <button class="dir-btn" data-type="supplice" onclick="setDirective(this.dataset.type)"><span class="dir-icon">&#128557;</span><span class="dir-label">Supplice</span><span class="dir-desc">Implora, disperata</span></button>
    <button class="dir-btn" data-type="minacciosa" onclick="setDirective(this.dataset.type)"><span class="dir-icon">&#128128;</span><span class="dir-label">Minacciosa</span><span class="dir-desc">Fredda, terrificante</span></button>
    <button class="dir-btn" data-type="seduttiva" onclick="setDirective(this.dataset.type)"><span class="dir-icon">&#127793;</span><span class="dir-label">Seduttiva</span><span class="dir-desc">Offerta irresistibile</span></button>
    <button class="dir-btn" data-type="maschera" onclick="setDirective(this.dataset.type)"><span class="dir-icon">&#9762;</span><span class="dir-label">Maschera Cade</span><span class="dir-desc">Emerge l&apos;alieno</span></button>
  </div>
</div>
<div class="conv-panel" id="convPanel">
  <div class="conv-header">
    <span class="conv-title" id="convTitle"></span>
    <button class="btn" onclick="closeConv()">Chiudi</button>
  </div>
  <div class="conv-messages" id="convMessages"></div>
</div>
<div class="refresh-note">Auto-refresh ogni 5 secondi</div>

<script>
const OPS = [
  {key:'chief',cs:'CHIEF',name:'Ryan Callahan',flag:'USA'},
  {key:'ghost',cs:'ПРИЗРАК',name:'Mikhail Voronov',flag:'RUS'},
  {key:'premiere',cs:'PREMIÈRE',name:'Laurent Marchetti',flag:'FRA'},
  {key:'torcia',cs:'TORCIA',name:'Marco Ferrante',flag:'ITA'},
  {key:'undertaker',cs:'UNDERTAKER',name:'James Blackwood',flag:'GBR'}
];
let conversations = {};
let currentOp = null;
let state = { phase: 1, operators: {}, directives: {} };

async function api(path, method, body) {
  const opts = { method, headers: {'Content-Type':'application/json'} };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(path, opts);
  return r.json();
}

async function refreshAll() {
  try {
    [conversations, state] = await Promise.all([
      api('/api/gm/conversations','GET'),
      api('/api/gm/state','GET')
    ]);
    if (!state.directives) state.directives = {};
    document.getElementById('phaseSelect').value = state.phase || 1;
    renderCards();
    if (currentOp) { renderConv(currentOp); updateDirPanel(); }
  } catch(e) { console.error(e); }
}

function renderCards() {
  const grid = document.getElementById('opGrid');
  grid.innerHTML = OPS.map(op => {
    const conv = conversations[op.key] || [];
    const last = conv.filter(m=>m.role==='assistant').slice(-1)[0];
    const msgCount = conv.filter(m=>m.role==='user').length;
    const hasActivity = conv.length > 0;
    const preview = last ? last.content.substring(0,80)+(last.content.length>80?'...':'') : 'Nessun messaggio';
    const sel = currentOp === op.key ? ' selected' : '';
    const dir = (state.directives||{})[op.key];
    const dirBadge = dir ? '<span class="dir-active-badge">'+dir.toUpperCase()+'</span>' : '';
    return '<div class="card'+sel+'" onclick="selectOp(\\''+op.key+'\\')">' +
      '<div class="card-head">' +
        '<span class="callsign">'+op.cs+dirBadge+'</span>' +
        '<span class="card-meta">'+op.flag+' | '+msgCount+' msg <span class="status-dot'+(hasActivity?' active':'')+'"></span></span>' +
      '</div>' +
      '<div class="card-preview">'+escHtml(preview)+'</div>' +
      '<div class="card-actions">' +
        '<button class="btn accent" onclick="event.stopPropagation();sendProactive(\\''+op.key+'\\')">Invia Proattivo</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

function selectOp(key) {
  currentOp = key;
  renderCards();
  renderConv(key);
  updateDirPanel();
}

function renderConv(key) {
  const panel = document.getElementById('convPanel');
  const op = OPS.find(o=>o.key===key);
  document.getElementById('convTitle').textContent = op.cs + ' — ' + op.name;
  const conv = conversations[key] || [];
  const el = document.getElementById('convMessages');
  if (conv.length === 0) {
    el.innerHTML = '<div class="empty">Nessuna conversazione</div>';
  } else {
    el.innerHTML = conv.map(m => {
      const cls = m.role + (m.proactive?' proactive':'');
      const label = m.role==='user' ? op.cs : (m.proactive ? 'PROATTIVO' : 'ENTITÀ');
      const ts = m.ts ? new Date(m.ts).toLocaleTimeString('it-IT') : '';
      return '<div class="msg '+cls+'">' +
        '<div class="msg-label">'+label+'</div>' +
        escHtml(m.content).replace(/\\n/g,'<br>') +
        '<div class="msg-ts">'+ts+'</div>' +
      '</div>';
    }).join('');
  }
  panel.classList.add('active');
  el.scrollTop = el.scrollHeight;
}

function closeConv() {
  currentOp = null;
  document.getElementById('convPanel').classList.remove('active');
  document.getElementById('dirPanel').classList.remove('active');
  renderCards();
}

async function setPhase(p) {
  await api('/api/gm/state','POST',{phase:parseInt(p)});
}

async function sendProactive(op) {
  const btn = event.target;
  btn.textContent = 'Invio...';
  btn.disabled = true;
  try {
    const r = await api('/api/gm/proactive','POST',{op});
    await refreshAll();
    alert('Proattivo inviato: ' + r.message.substring(0,100));
  } catch(e) { alert('Errore: '+e.message); }
  btn.textContent = 'Invia Proattivo';
  btn.disabled = false;
}

async function resetAll() {
  await api('/api/reset','POST');
  await refreshAll();
}

function escHtml(t) {
  const d = document.createElement('div');
  d.textContent = t;
  return d.innerHTML;
}

const DIR_NAMES = {segreto:'Segreto',supplice:'Supplice',minacciosa:'Minacciosa',seduttiva:'Seduttiva',maschera:'Maschera Cade'};

function updateDirPanel() {
  var panel = document.getElementById('dirPanel');
  if (!currentOp) { panel.classList.remove('active'); return; }
  var op = OPS.find(function(o){return o.key===currentOp;});
  var activeDir = (state.directives||{})[currentOp] || null;
  document.getElementById('dirTarget').innerHTML = 'Operatore: <b>'+op.cs+'</b>' + (activeDir ? ' — Direttiva attiva: <b style="color:#ff4a4a">'+DIR_NAMES[activeDir]+'</b> (si consuma al prossimo messaggio)' : '');
  panel.querySelectorAll('.dir-btn').forEach(function(btn){
    if (activeDir === btn.dataset.type) btn.classList.add('active-dir');
    else btn.classList.remove('active-dir');
  });
  panel.classList.add('active');
}

async function setDirective(type) {
  if (!currentOp) return;
  var current = (state.directives||{})[currentOp];
  var newType = (current === type) ? null : type;
  try {
    await api('/api/gm/directive','POST',{op:currentOp,type:newType});
    await refreshAll();
  } catch(e) { alert('Errore: '+e.message); }
}

refreshAll();
setInterval(refreshAll, 5000);
</script>
</body>
</html>`;

// =============================================================================
// MAIN ROUTER
// =============================================================================
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    try {
      if (path === '/' || path === '/gm')
        return new Response(GM_DASHBOARD_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8', ...CORS } });

      if (path === '/api/chat' && request.method === 'POST')
        return await handleChat(request, env);

      if (path === '/api/cmd' && request.method === 'POST')
        return await handleCmd(request, env);

      if (path.match(/^\/api\/history\/\w+$/) && request.method === 'GET')
        return await handleHistory(path.split('/')[3], env);

      if (path.match(/^\/api\/poll\/\w+$/) && request.method === 'GET')
        return await handlePoll(path.split('/')[3], env, url);

      if (path.match(/^\/api\/init\/\w+$/) && request.method === 'POST')
        return await handleInit(path.split('/')[3], env);

      if (path === '/api/gm/state' && request.method === 'POST')
        return await handleSetState(request, env);

      if (path === '/api/gm/state' && request.method === 'GET')
        return await handleGetState(env);

      if (path === '/api/gm/conversations' && request.method === 'GET')
        return await handleGetConversations(env);

      if (path === '/api/gm/proactive' && request.method === 'POST')
        return await handleProactive(request, env);

      if (path === '/api/gm/directive' && request.method === 'POST')
        return await handleDirective(request, env);

      if (path === '/api/terminal' && request.method === 'POST')
        return await handleTerminal(request, env);

      if (path === '/api/reset' && request.method === 'POST')
        return await handleReset(env);

      return new Response('Not Found', { status: 404, headers: CORS });
    } catch (err) {
      return json({ error: err.message }, 500);
    }
  }
};
