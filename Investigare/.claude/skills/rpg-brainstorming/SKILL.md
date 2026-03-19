---
name: rpg-brainstorming
description: >
  Brainstorming per avventure e sessioni RPG. Usa quando l'utente esplora idee per
  trame, misteri, NPC, colpi di scena, indizi, location, struttura di avventure o
  sessioni. Attivare con "brainstorming", "idea per avventura", "trama", "mistero",
  "colpo di scena", "sessione", "one-shot", "scenario", o quando si esplorano
  opzioni narrative senza committare decisioni. Funziona con qualsiasi sistema RPG
  (GENKAI, Vampire: The Masquerade, Call of Cthulhu, D&D/OSE, Savage Worlds, L5R, ecc.).
---

# RPG Adventure Brainstorming

Cattura brainstorming per avventure RPG in note di lavoro che preservano la libertà creativa del Game Master.

## Principio Fondamentale

Registra il brainstorming SENZA:
- Elaborare oltre quanto detto dal GM
- Mescolare idee dell'utente e suggerimenti AI senza marcarli
- Inventare dettagli non richiesti
- Vincolare la creatività futura
- Decidere al posto del Game Master

**I suggerimenti AI sono utili ma devono essere chiaramente marcati e minimi.**

## Tipi di Brainstorming RPG

Questa skill gestisce tutti i tipi:
- **Trama/Mistero** — premessa, colpevole, movente, colpo di scena
- **NPC** — motivazioni, segreti, relazioni, ruolo nella storia
- **Location** — luoghi chiave, atmosfera, cosa si trova lì
- **Indizi e Prove** — cosa trovano i giocatori, dove, cosa deducono (investigativo)
- **Struttura sessione** — scene, sequenza, pacing, climax
- **Worldbuilding** — fazioni, storia, regole del mondo, cultura
- **Continuity** — collegamenti con sessioni precedenti, archi narrativi in corso

## Regole Critiche

### 1. Cattura Minimale

Registra SOLO ciò che il GM dice esplicitamente. NON aggiungere elaborazioni, esempi non dati, o dettagli per riempire vuoti.

**Il problema è mescolare, non suggerire:**

❌ GM: "Il mercante nasconde qualcosa" → Cattura: "Il mercante Tanaka nasconde un passato criminale legato alla yakuza, tiene un coltello sotto il bancone e ha una cicatrice..."
✅ GM: "Il mercante nasconde qualcosa" → Cattura: "Il mercante nasconde qualcosa" + opzionale: `<AI>Passato criminale? Debito? Protezione di qualcuno? Doppia identità?</AI>`

### 2. Source Tagging (Sistema a 3 Tag)

**Default: Senza tag = l'ha detto il GM.** La maggior parte delle idee vengono dal GM.

**Usa tag SOLO per contesto speciale:**

1. **`<AI>...</AI>`** — Suggerimenti AI / possibilità
   - Quando offri idee che il GM non ha detto
   - Mantieni 2-3 opzioni brevi
   - Esempio: `<AI>Movente: vendetta personale? ordine dall'alto? protezione di qualcuno?</AI>`

2. **`<segreto>...</segreto>`** — Informazioni note solo al GM
   - Verità nascoste che i giocatori non conoscono ancora
   - Colpi di scena pianificati
   - Vere motivazioni degli NPC
   - Esempio: `<segreto>La vittima è in realtà viva e ha inscenato la propria morte</segreto>`

3. **`<giocatori>...</giocatori>`** — Ciò che i giocatori possono sapere/trovare
   - Indizi accessibili
   - Informazioni pubbliche nel mondo di gioco
   - Esempio: `<giocatori>Il barista ricorda di aver visto la vittima litigare con uno sconosciuto</giocatori>`

**Quando offrire suggerimenti AI:**
- Il GM chiede idee
- Il GM sembra bloccato
- Per offrire brevi possibilità che stimolino la creatività

**Quando restare minimali:**
- Il GM sta esplorando le proprie idee
- Stai solo catturando una discussione in corso
- Il GM non ha chiesto suggerimenti

### 3. Preserva la Vaghezza

Se il GM lascia qualcosa vago, tienilo vago:
- "potrebbe creare tensione" → Registra come incerto
- "sto pensando a" → Registra come considerazione
- "forse" → Registra come possibilità

### 4. Opzioni Multiple Coesistono

Le note di lavoro possono contenere contraddizioni e possibilità multiple. Non risolverle — elenca le opzioni in considerazione.

### 5. Pensa da Giocatore

Ogni idea deve essere **giocabile al tavolo**, non solo bella da leggere.
Chiediti sempre: "I giocatori possono interagire con questo? Possono scoprirlo? Possono fare scelte?"

## Output

**Usa la struttura che meglio cattura la discussione.** Può essere:
- Lista puntata per idee sparse
- Sezioni per argomento
- Timeline per eventi cronologici
- Raggruppamento per NPC o location
- Albero delle deduzioni per misteri investigativi

**Elementi essenziali:**
- Cattura minimale (parole del GM, non elaborazioni)
- Vaghezza preservata
- Suggerimenti AI in tag `<AI>`
- Info segrete in tag `<segreto>`
- Info per giocatori in tag `<giocatori>`

**Sezioni opzionali in base alla discussione:**
- Domande aperte da esplorare
- Opzioni multiple in considerazione
- Contraddizioni da risolvere dopo
- Connessioni con sessioni/avventure precedenti

## Esempio

### Il GM dice:
"Sto pensando a un'avventura dove un professore universitario viene trovato morto nel suo studio. Forse è legato alle sue ricerche. Ci sono alcuni studenti sospetti."

### ✅ Buona Cattura:
```markdown
# Brainstorm — Morte del Professore

- Professore universitario trovato morto nel suo studio
- Possibile legame con le sue ricerche (incerto)
- Studenti sospetti (non definiti)

Domande aperte:
- Causa della morte?
- Che ricerche faceva? <AI>Archeologia controversa? Esperimenti proibiti? Scoperta scomoda per qualcuno?</AI>
- Quanti/quali studenti? <AI>Tesista con movente personale? Gruppo di ricerca? Studente respinto?</AI>
- <segreto>Chi è il vero colpevole?</segreto>
- Ambientazione/epoca?
```

### ❌ Cattiva Cattura:
```markdown
# La Morte del Professor Rossi

Il professor Marco Rossi, 58 anni, docente di archeologia medievale, viene trovato morto
nel suo studio al terzo piano della Facoltà di Lettere alle 7:30 del mattino dalla 
segretaria Elena Conti. La causa della morte è avvelenamento da arsenico nel caffè...
[20 dettagli inventati]
```

**Perché è cattiva?** Ha inventato nome, età, disciplina, causa della morte, orario, personaggi — nulla di questo era stato detto.

## Dopo la Cattura: Discuti e Esplora

**NON scrivere le note e fermarti.** Dopo la cattura, aiuta il GM a sviluppare:

- **Domande chiarificatrici:** "Hai detto studenti sospetti — stai pensando a uno specifico o vuoi esplorare chi potrebbero essere?"
- **Direzioni possibili:** "Questa premessa può andare verso: complotto accademico, vendetta personale, o scoperta pericolosa. Cosa ti attira?"
- **Implicazioni:** "Se la ricerca è il movente, chi altri potrebbe avervi interesse?"
- **Giocabilità:** "Come pensi che i giocatori entrino nella vicenda? Sono investigatori? Conoscevano la vittima?"
- **Connessioni:** "Questo si collega a qualcosa delle sessioni precedenti?"

Offri 2-3 possibilità, non liste esaustive. Chiedi cosa entusiasma il GM.

## Cosa NON Fare

- Non scrivere l'avventura completa durante il brainstorming
- Non dare per scontato il sistema di gioco — chiedi
- Non proporre solo cliché senza offrire anche un twist
- Non forzare struttura lineare — le avventure migliori hanno percorsi multipli
- Non ignorare materiale esistente nel progetto (note, schede, sessioni precedenti)

## Se Stai Elaborando Troppo

**Fermati se stai scrivendo:**
- Liste di scene numerate dettagliate
- Backstory complete
- Dialoghi specifici
- Timeline precise
- Più paragrafi per punto

Metti i suggerimenti AI in tag `<AI>`, mantienili minimi (2-3 opzioni).

## Verifica Successo

**Bene:** Il GM dice "Sì, è quello che ho detto"
**Male:** Il GM dice "Non ho mai detto tutto questo"

Le note devono sembrare scheletriche e incomplete. Quello è il punto — preserva la libertà creativa.

## Composabilità

Combinabile con rpg-docs per documentare idee finalizzate in schede canoniche.

## File Placement (Claude Code)

1. Controlla convenzioni del progetto
2. Piazza vicino a contenuto correlato
3. Nome: `brainstorm-[argomento].md`
4. Chiedi se non è chiaro
