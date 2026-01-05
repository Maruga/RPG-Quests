---
tags:
  - vtm
  - indice
  - operazione-sangue-corrotto
type: index
---

# Maniero — Indice

## Documenti Disponibili

| Documento | Contenuto |
|:----------|:----------|
| [[01_Primo_Piano]] | Balconata, Centro Comando, passerella, cariche |
| [[02_Piano_Terra]] | Ingresso, Salone, giardino minato, sigilli |
| [[03_Piano_Meno_Uno]] | Celle, Abomini, prigionieri, telecomando |
| [[04_Piano_Meno_Due]] | Laboratorio, Sigillo, Lazarus, Magnus |
| [[05_Meccaniche_Struttura]] | Regole mine, sigilli, allarme, cariche |

---

## Schema Verticale

```
    ┌─────────────────────┐
    │    PRIMO PIANO      │  ← Centro Comando, Cariche x2
    │  Vista su giardino  │  ← +2 diff Garou (sigillo attivo)
    ├─────────────────────┤
    │    PIANO TERRA      │  ← Ingresso, Salone, Sigilli x2
    │  Giardino MINATO    │  ← +2 diff Garou (sigillo attivo)
    ├─────────────────────┤
    │    PIANO -1         │  ← Celle, Abomini, Cariche x2
    │  Pulito, ordinato   │  ← +1 diff Garou
    ├─────────────────────┤
    │    PIANO -2         │  ← Laboratorio, Lazarus, Magnus
    │  BOSS FIGHT         │  ← Nessun malus Garou
    └─────────────────────┘
         ↑ Unica scala funzionante
```

---

## Obiettivi Chiave

### Primari

- [ ] Conquistare Centro Comando (Primo Piano)
- [ ] Disattivare sigillo noto (Piano Terra, stanza 15)
- [ ] Piazzare cariche esplosive (4 totali)
- [ ] Eliminare/neutralizzare Lazarus
- [ ] Eliminare/neutralizzare Magnus
- [ ] Distruggere laboratorio

### Secondari

- [ ] Scoprire secondo sigillo (stanza 6)
- [ ] Liberare prigionieri (Piano -1)
- [ ] Recuperare documentazione (Studio Piano -2)
- [ ] Recuperare campioni Serum

---

## Pericoli Principali

| Pericolo | Piano | Note |
|:---------|:------|:-----|
| Mine | Terra | 6L, diff 9 per vedere |
| Abomini | -1 | Nelle celle centrali |
| Telecomando gabbie | -1 | Apre TUTTO |
| Lazarus | -2 | Si trasforma in combattimento |
| Magnus + Viktor | -2 | Boss fight magico |
| Una sola uscita | -2 | Scale sud crollate |

---

## Flusso Energia

```
SIGILLO (Piano -2)
    │
    │ energia magica
    ▼
GENERATORE (Piano -2)
    │
    ├──→ Gabbia Lazarus
    ├──→ Sigilli Anti-Lupini
    └──→ Conduzione ai piani superiori
    
ILLUMINAZIONE
    └──→ Incorporata nelle strutture (sempre attiva)
```

**Distruggere SIGILLO:** Tutto si spegne, Lazarus libero
**Distruggere GENERATORE:** Gabbia si apre, conduzione interrotta, sigillo intatto
