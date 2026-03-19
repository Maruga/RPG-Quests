---
name: rpg-docs
description: >
  Documentazione canonica per avventure RPG: schede NPC, location, indizi, fazioni,
  timeline, struttura avventura. Usa quando l'utente vuole creare o aggiornare schede
  ufficiali, profili personaggi, mappe location, documentazione di lore, wiki del mondo
  di gioco, o struttura finale di un'avventura. Crea materiale di riferimento completo
  e utilizzabile al tavolo. Funziona con qualsiasi sistema RPG.
---

# RPG Documentation

Crea documentazione canonica e di riferimento per avventure, NPC, location, fazioni e lore del mondo di gioco.

## Scopo

Costruire documentazione autorevole (schede, wiki, reference) che serve come "fonte unica di verità" per il mondo di gioco e le avventure. Materiale completo, utilizzabile al tavolo o come reference durante la preparazione.

**Può essere creata prima o durante il gioco** — per worldbuilding, lore, e materiale di riferimento.

## Documentazione vs Brainstorming

| Documentazione | Brainstorming |
|---|---|
| Versione unica, decisa | Opzioni multiple coesistono |
| Completa e utilizzabile | Scheletrica |
| Niente [TBD] | Tag sorgente ovunque |
| Pronta per il tavolo | Note di lavoro del GM |
| Decisioni finalizzate | Esplorativo |

## Principi

### 1. Solo Contenuto Canonico
Le schede contengono SOLO informazioni confermate dal GM. Fatti decisi, non ipotesi.

### 2. Pensato per l'Uso al Tavolo
Ogni scheda deve essere consultabile rapidamente durante la sessione. Informazioni chiave in evidenza, dettagli sotto.

### 3. Adatta al Sistema
Il formato si adatta al sistema di gioco. Un NPC di GENKAI ha indizi e segreti. Un NPC di D&D ha statistiche e tesoro. Un NPC di VtM ha clan, generazione e relazioni politiche.

## Struttura Flessibile

**Le schede NON sono template da riempire** — la struttura deve adattarsi al contenuto.

Alcuni NPC hanno backstory dettagliate, altri sono "il barista che sa qualcosa". Alcune location sono un paragrafo, altre hanno mappe e stanze. Alcuni indizi sono una riga, altri hanno catene di deduzioni.

**Includi ciò che serve, salta ciò che non serve.**

## Pattern Comuni

### Scheda NPC

```markdown
# [Nome NPC]

**Ruolo:** [ruolo nell'avventura — testimone / sospetto / vittima / alleato / antagonista]
**Aspetto:** [descrizione breve per il GM — cosa vedono i giocatori]
**Personalità:** [2-3 tratti — come si comporta quando i giocatori interagiscono]

## Ciò che sa
[Informazioni che l'NPC può rivelare ai giocatori, e a quali condizioni]

## Ciò che nasconde
[Segreti — visibile solo al GM]

## Relazioni
- **[Nome]:** [tipo di relazione e stato attuale]

## Note di gioco
[Consigli per interpretarlo al tavolo: voce, gestualità, trigger emotivi]
```

### Scheda Location

```markdown
# [Nome Location]

**Tipo:** [interni/esterni — casa, ufficio, strada, bosco...]
**Atmosfera:** [cosa percepiscono i giocatori — suoni, odori, luce, sensazione]

## Cosa si vede
[Descrizione read-aloud o punti chiave per la narrazione]

## Cosa si può trovare
[Indizi, oggetti, elementi interattivi — e come trovarli]

## Chi c'è
[NPC presenti o che possono arrivare]

## Connessioni
[Dove porta questa location — altre location collegate]
```

### Scheda Indizio (per avventure investigative)

```markdown
# [Nome Indizio]

**Dove si trova:** [location e posizione specifica]
**Come si ottiene:** [cosa devono fare i giocatori per trovarlo/ottenerlo]
**Cosa rivela:** [informazione che il giocatore ricava]
**A cosa porta:** [prossimo indizio o deduzione]
**Red herring:** [sì/no — se sì, dove porta la pista falsa]
```

### Struttura Avventura

```markdown
# [Titolo Avventura]

**Sistema:** [sistema di gioco]
**Giocatori:** [numero e tipo]
**Durata:** [stimata]
**Tono:** [thriller / horror / azione / investigativo / politico]

## Premessa
[Cosa è successo — spoiler completi per il GM]

## Timeline degli eventi
[Cronologia di ciò che è successo PRIMA che i giocatori intervengano]

## Scena iniziale
[Come inizia l'avventura per i giocatori]

## NPC
[Lista con riferimento alle schede]

## Location
[Lista con riferimento alle schede]

## Indizi e Piste
[Per avventure investigative: albero delle deduzioni o lista indizi]

## Possibili sviluppi
[Come può evolvere in base alle scelte dei giocatori]

## Climax e Finali
[Possibili conclusioni]
```

### Scheda Fazione

```markdown
# [Nome Fazione]

**Tipo:** [organizzazione / clan / famiglia / gruppo / istituzione]
**Obiettivo:** [cosa vogliono]
**Metodi:** [come operano]

## Membri chiave
- **[Nome]:** [ruolo nella fazione]

## Relazioni con altre fazioni
- **[Fazione]:** [alleati / nemici / neutrali — perché]

## Risorse
[Cosa hanno a disposizione — uomini, denaro, influenza, armi, magia]
```

## Queste Sono Tracce, Non Obblighi

I pattern sopra sono punti di partenza. Usa solo le sezioni che servono:

- Un NPC minore può essere 3 righe
- Una location può essere un paragrafo
- Un indizio può essere una riga
- Un'avventura semplice può saltare metà delle sezioni

**Non riempire sezioni vuote con contenuto inventato.** Se il GM non ha definito qualcosa, non c'è.

## Tono

Scrivi come materiale di reference per il GM:
- Terza persona
- Diretto e consultabile
- Informazioni chiave in evidenza
- Dettagli espandibili sotto
- Niente prosa letteraria — è materiale di gioco, non un romanzo

## Composabilità

Combinabile con rpg-brainstorming: brainstorma prima, documenta dopo quando le decisioni sono prese.

## File Placement (Claude Code)

1. Controlla la struttura del progetto
2. Posizioni comuni: `npc/`, `location/`, `indizi/`, `avventure/`, `fazioni/`, `docs/`
3. Segui le convenzioni di naming esistenti
4. Nome: `[tipo]-[nome].md` (es. `npc-tanaka.md`, `location-tempio.md`)
5. Chiedi se non è chiaro
