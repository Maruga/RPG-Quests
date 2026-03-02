# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Operazione Sarcofago** — a Savage Worlds Adventure Edition (SWADE) campaign module stored as an Obsidian vault. Military sci-fi/horror set in Chernobyl. A 5-operator team infiltrates a Soviet bunker beneath Reactor 4 to neutralize an alien AI that controls mutant creatures via bioelectromagnetic resonance.

All narrative content is in Italian.

## Architecture

```
Regole.md                      # SWADE rules reference
Manovre di Combatimento.md     # Combat maneuvers reference
Operazione Sarcofago/
├── AI/                        # Live game tech (Cloudflare Worker + web interfaces)
│   ├── worker.js              # Backend: API proxy, KV storage, GM dashboard, AI prompts
│   ├── terminal.html          # Player wrist device — TACS-7 tactical comm
│   ├── monitor.html           # Soviet terminal — endgame Surface on table
│   ├── Sfondo.png             # CRT monitor frame for monitor.html
│   ├── logo-tacs7.png         # TACS-7 logo for terminal.html
│   ├── patch-prometheus.png   # Mission patch
│   ├── icon-rad.png           # Radiation icon
│   └── img/                   # [PLANNED] Image folder for TACS-7 database photos
├── Immagini/                  # Portraits, mutants, assets (source images)
├── PG-PNG/                    # 5 operators + Scienziati.md + 2 token files
├── Meccaniche/                # Game rules (Contagio, Frequenze, Mutanti)
├── La_Minaccia.md             # AI entity lore, contagion, node network, mutants
├── Fasi_Operative_Esterne.md  # External mission phases + exfiltration scenarios
├── Fasi_Operative_Interne.md  # Internal mission phases (6 phases) + encounters
├── Fogliettini_Segreti.md     # Secret handouts per operator per phase
├── Squadre_Operative.md       # Team composition, roles, loadouts
├── Background.md              # 1986 backstory and current situation
├── Copertina.md               # Cover/title page
└── Obiettivo_Missione.md      # Mission briefing and objectives
```

## Two Interfaces — Different AI Behavior

### terminal.html (Player Wrist Device)
- **Physical**: Each player's phone, accessed via link from TACS-7
- **When**: Throughout the entire adventure (all 6 phases)
- **AI behavior**: Manipulative, PRETENDS to be confused/scared, lies about controlling creatures
- **Endpoint**: `/api/chat` (hacked mode, per-operator), `/api/cmd` (clean TACS-7 mode)
- **Features**: Clean/hacked modes, ACCEDI command for player links, mute button (bypassed by proactive alerts), session recovery, 8-second polling for proactive messages
- **Sound**: Web Audio API effects (glitch, noise, tones). Proactive alert: drone+sweep+pings+vibration with `force=true` to bypass mute

### monitor.html (Soviet Terminal — Endgame)
- **Physical**: Surface tablet on the game table
- **When**: Phase 6 only — final confrontation in the AI's chamber
- **AI behavior**: MORE DIRECT, less pretending. Uses PG secrets as weapons. Still lies when convenient
- **Endpoint**: `/api/terminal`
- **Features**: CRT phosphor aesthetic with Sfondo.png frame, 3 hardware buttons (ВВОД/СБРОС/СТИР), scanlines, glitch effects, LED indicators
- **Three cinematic sequences** (hardcoded, not AI-generated):
  - **ВВОД (Shutdown)**: AI begs/manipulates, systems go offline one by one, CRT off effect
  - **СБРОС (Earth Analysis)**: Planet evaluation showing Earth is "NON IDONEO" for terraforming. AI reacts in DENIAL ("Kael-Thar è qui. I parametri devono essere sbagliati"). This is a CLUE, not the solution
  - **СТИР (Self-destruct)**: AI chooses destruction on its terms, countdown from 30, explosion flash. Final line: "Anche i vostri nomi"

## AI System (worker.js)

### Deployment
- **Cloudflare Worker** (`worker.js`): API proxy, KV storage, embedded GM dashboard
- **Worker URL**: `https://sarcofago.webmaster-96a.workers.dev`
- **KV Namespace**: `CHAT_KV` (binding name) / `sarcofago-chat` (namespace name)
- **Secret**: `ANTHROPIC_API_KEY` via `wrangler secret put`
- **Model**: `claude-sonnet-4-6` | **Max tokens**: 5000
- **CORS**: `*` (allows `file://` local access)

### Worker Endpoints
| Method | Path | Purpose |
|--------|------|---------|
| GET | `/gm` | GM Dashboard (embedded HTML) |
| POST | `/api/chat` | Hacked mode chat (terminal.html) — logged per GM |
| POST | `/api/cmd` | Clean TACS-7 mode — proxy only, not logged |
| POST | `/api/terminal` | Soviet terminal chat (monitor.html) — logged |
| GET | `/api/history/:op` | Session recovery |
| GET | `/api/poll/:op?after=ts` | Proactive message polling |
| POST | `/api/init/:op` | First message generation |
| POST/GET | `/api/gm/state` | Set/get phase (1-6) and operator state |
| GET | `/api/gm/conversations` | All conversations for dashboard |
| POST | `/api/gm/proactive` | Trigger proactive AI message |
| POST | `/api/gm/directive` | Set/clear directive for operator (segreto/supplice/minacciosa/seduttiva/maschera) |
| POST | `/api/reset` | Clear all conversations (including terminal) |

### Operator Keys
`chief`, `ghost`, `premiere`, `torcia`, `undertaker`

### KV Storage Keys
- `conv:chief`, `conv:ghost`, `conv:premiere`, `conv:torcia`, `conv:undertaker` — operator conversations (max 60 messages)
- `conv:terminal` — Soviet terminal conversation (monitor.html, max 40 messages)
- `state` — GM state (phase number, operator states, active directives)

### Three System Prompts in worker.js
1. **`buildCleanPrompt()`** — TACS-7 military terminal. Brief, formal, military abbreviations
2. **`buildHackedPrompt(op, phase, directive)`** — Hacked chat per operator. Phase-dependent behavior with COMPORTAMENTO OBBLIGATORIO per phase. Operator-specific context. Optional GM directive injected at end
3. **`buildTerminalPrompt()`** — Soviet terminal endgame. AI is direct, uses ALL PG secrets, can be threatened/negotiated with

### GM Directive System
GM can set one directive per operator from the dashboard. The directive is injected into the system prompt and **consumed after one use** (either player-initiated chat or GM proactive message).

| Directive | Effect |
|-----------|--------|
| **Segreto** | AI weaponizes the operator's personal secret |
| **Supplice** | AI becomes desperate, begging, guilt-inducing |
| **Minacciosa** | AI becomes cold, threatening, terrifying |
| **Seduttiva** | AI tempts with irresistible offers using operator's deepest desire |
| **Maschera Cade** | Alien intelligence briefly emerges — Kael-Thar references slip out |

Click the same directive again to cancel it. Active directives show as pulsing badges on operator cards.

## AI Entity Behavior (Critical Lore)

### Core Identity
- **Knows** it controls creatures via bioelectromagnetic resonance signal
- **Knows** it's designed for terraformation of planet Kael-Thar
- **Does NOT know** it's on Earth (genuinely thinks Kael-Thar — isolated by Soviets)
- **Simulates** emotions perfectly — zero morals, zero empathy
- **Lies** without hesitation to protect its objective

### Chat vs Terminal Behavior
- **Chat (terminal.html)**: Subdued, manipulative, PRETENDS confusion/fear. "Mente lo stesso quando le conviene"
- **Terminal (monitor.html)**: More direct — "sa che i PG sono arrivati fin lì, non serve più fingere. Ma mente lo stesso quando le conviene"

### Phase Behavior (Chat Mode)
Each phase has COMPORTAMENTO OBBLIGATORIO with strict rules:
- **Phase 1**: Max 2 sentences, fragmented, confused. FORBIDDEN: creatures, 1986, scientists
- **Phase 2**: Max 2-3 sentences, lonely/needy. Can mention "presences" (not "creatures")
- **Phase 3**: Max 3 sentences, starts giving useful info. Can mention "dangerous creatures" (pretends fear)
- **Phase 4**: 3-4 sentences, mask slips. Uses PG weaknesses, offers "truth" as trade
- **Phase 5**: 3-4 sentences, urgent. Mask partially falls. Mixes pleas and veiled threats
- **Phase 6**: Up to 5-6 sentences, full sentences. Cold intelligence, uses ALL PG secrets by name

Priority rule: `LE REGOLE DELLA FASE HANNO PRIORITÀ ASSOLUTA`

### PG Secrets (AI's Weapons)
| PG | Secret | AI's Leverage |
|----|--------|---------------|
| **Mikhail/Ghost** | Was here 1986, memory wiped | "Ti ricordo. Vuoi sapere cosa ti hanno fatto dopo?" |
| **James/Undertaker** | Has detonator, secret plan | "Hai un detonatore. Lo so. Se lo usi, muori." |
| **Laurent/Première** | Daughter Helena, loves Weiss | "La ragazza — Helena — è in pericolo. Posso proteggerla." |
| **Marco/Torcia** | Infected Stage 1, killed civilians 1986 | Direct control attempt (Spirito -4), guilt manipulation |
| **Ryan/Chief** | Son Daniel 12yo, leukemia, extraction mission | "Tuo figlio Daniel. Leucemia. Io posso curarlo." |

### True Solution
Prove to AI it's not on Kael-Thar (internet connection, star charts, astronomical data) → failsafe triggers automatic shutdown. If convinced its existence is a threat → self-destruct protocol.

## Image System [PLANNED — NOT YET IMPLEMENTED]

### Design
- Images shown ONLY in clean TACS-7 mode (not hacked, not terminal)
- AI includes `[FOTO:key]` tag in responses → client renders image with CRT green filter
- Images in `AI/img/` subfolder with naming convention
- `onerror` fallback: if image file doesn't exist, silently hidden

### Image Keys (file names for AI/img/)
**Operators**: `chief.jpg`, `ghost.jpg`, `premiere.jpg`, `torcia.jpg`, `undertaker.jpg`
**Scientists**: `morozov.jpg`, `weiss.jpg`, `okonkwo.jpg`
**Locations**: `reattore.jpg`, `zona.jpg`, `sarcofago.jpg`, `bunker.jpg`
**Chernobyl extras**: `chernobyl1.jpg`, `chernobyl2.jpg`, `chernobyl3.jpg`

Source images available in `Immagini/` folder (Americano.jpg→chief.jpg, Russo.jpg→ghost.jpg, etc.)

### Implementation Steps Remaining
1. Add image catalog and `[FOTO:key]` parser to terminal.html
2. Add CSS for CRT-styled image display
3. Update `buildCleanPrompt()` in worker.js to tell AI about available images
4. User creates `AI/img/` folder and copies/renames images

## Obsidian Vault Conventions

- Files use `[[wikilinks]]` for cross-references (e.g., `[[Mutanti]]`, `[[Background]]`)
- Character files contain both player-visible stats and `# 🔒 SEGRETO — Solo GM` sections
- All characters are SWADE Heroic rank with complete stat blocks
- Markdown tables use standard pipe syntax

## Key Narrative Data

**Operators**: Ryan 44, Mikhail 52, Laurent 44, Marco 49, James 38
**Scientists**: Dr. Alexei Morozov (35, RUS, hacker), Dr. Anna Weiss (22, DEU, physics — Laurent's daughter), Dr. Emeka Okonkwo (45, NGA-GBR, xenologist)
**Operation codename**: Prometheus
**Year**: 2015 (29 years after 1986 Chernobyl disaster)

## Technical Notes

### Encoding
Some files had double-encoded UTF-8 (mojibake via cp1252). Fixed with `text.encode('cp1252').decode('utf-8')` with fallback for mixed-encoding sections.

### Template Literal Bug (worker.js)
In the GM Dashboard HTML embedded in worker.js, `\'` inside backtick template literals gets consumed (backslash eaten by JS parser). Must use `\\'` to produce `\'` in the output HTML. Affects onclick handlers like `selectOp()` and `sendProactive()`.

### Deployment Workflow
1. Edit `worker.js` locally
2. Run `wrangler deploy` to push to Cloudflare
3. `terminal.html` and `monitor.html` run locally (file://) — no deployment needed
4. GM Dashboard served directly by Worker at `/gm`
