# Wizard Avventure GENKAI — Progetto

Sistema wizard online per creare casi investigativi GENKAI seguendo il metodo degli 11 passi del `GENKAI_Manuale_Situazioni.md`. Destinato a tutti i GM (anche alle prime armi), fruibile da cellulare.

## Decisioni prese (2026-07-15)

| Decisione | Scelta |
|---|---|
| Modello | **B** — wizard guidato + AI "proponi" a ogni passo (le decisioni restano del GM) |
| AI | Anthropic dal backend (chiave server-side); modello economico per le proposte, top per i passi pesanti; rate limit + quota per utente |
| Piattaforma | Sito **ASP.NET Core** dell'utente (salvataggio persistente, account GM) |
| Target | Pubblico — GM che iniziano; il wizard è anche il tutorial del metodo |
| Mobile | Sì — un passo per schermata, autosave, drawer "cosa hai deciso finora" |
| Scope v1 | Solo omicidi (fedele al metodo del manuale); espansioni dopo |
| Suggerimenti | Due livelli: 🎲 biblioteca (offline, gratis) + ✨ AI (contestuale) |
| Handout dati | Tabulati/referti/registri generati **deterministicamente dalla cronistoria** (passo 7 = fonte di verità) + rumore realistico; AI solo per le parti discorsive |
| Demo | Il caso Kuroda del manuale precaricato come progetto d'esempio esplorabile |

## Struttura cartella

```
Wizard/
├── README.md                    ← questo file
├── schema/
│   └── avventura.schema.json    ← modello dati del progetto-avventura (fonte di verità)
├── biblioteche/                 ← seed JSON per i suggerimenti 🎲 (COMPLETE ×7)
│   ├── tipologie_omicidio.json  (10 tipologie + sottotipi, vincoli generativi, tracce, note '97)
│   ├── moventi.json             (6 moventi + sottocasi, filtro sul cast, tracce che generano)
│   ├── professioni.json         (31 voci Kyoto '97: luoghi→location, cerchie→cast, problemi→false piste)
│   ├── nomi.json                (110 cognomi + nomi per generazione con kanji, riservati, algoritmo anti-omonimie)
│   ├── luoghi.json              (12 quartieri reali + 20 tipologie col template cosa-si-vede/trova/chi-c'è)
│   ├── tratti_png.json          (vizi/tic/oggetti/frasi/sotto-pressione)
│   └── problemi_segreti.json    (6 categorie × 4-5 voci, con comeEmerge e potenziale falsa pista)
├── prompts/                     ← system prompt AI (COMPLETI: _comune + passi 1-11)
│   ├── _comune.md               (regole mondo '97 + metodo + nomi + formato — prefisso di ogni chiamata)
│   └── passo_01.md ... passo_11.md
├── generatori/                  ← spec dei motori handout (COMPLETE)
│   ├── tabulato.md              (il flagship: righe vere + rumore + sintesi analitica + lint)
│   ├── documenti_dati.md        (autopsia, tossicologica, badge, conti, liste, browser, 119)
│   └── discorsivi.md            (deposizioni/articoli/lettere via AI, con fatti-ammessi e lint)
└── codice/GenkaiWizard/         ← SITO ASP.NET Core FUNZIONANTE (v1 — vedi sotto)
```

## Vincoli di canone che il wizard impone

- Gli indizi **si danno sempre** (i dadi non bloccano l'informazione); i casi possono comunque fallire
- I **4 tipi di indizio**: essenziale / approfondimento / conferma / vantaggio operativo (Manuale GM)
- Ogni informazione **essenziale** deve avere ≥ 2 strade (lint finale)
- Complessità × Durata: assi indipendenti, dichiarati **prima** di costruire (passo 0)
- Il colpevole **si seleziona dal cast**, non si inventa (passo 5); "errore coerente" obbligatorio
- PNG: Senmon libere, di norma **niente Gou**
- Quadro legale Giappone 1997: mandati dal giudice su richiesta della Procura; niente intercettazioni (illegali fino al 1999) → tabulati; fermo 48h→23gg
- Armi da fuoco rarissime nel Giappone '97: una pistola è già di per sé un indizio (yakuza/caccia)
- **Anti-omonimie**: mai nome+cognome identici dentro il progetto né col cast base riservato (da `GENKAI_Registro_Nomi.md`)
- Stile handout: burocratico giapponese 1997 (template dagli handout esistenti di Sake/Ultima Lezione)

## Il sito (codice/GenkaiWizard) — stato v1 (2026-07-15)

**Stack**: ASP.NET Core **.NET 8 LTS** · Razor Pages + JS vanilla (mobile-first) · EF Core + **SQLite** (commutabile SQL Server: `Database:Provider=SqlServer` + connection string) · ASP.NET Identity (registrazione senza conferma email) · Anthropic via REST server-side.

**Avvio sviluppo**: `cd codice/GenkaiWizard && dotnet run` → https://localhost (porta in launchSettings). Migrazioni automatiche all'avvio.
**AI**: impostare env `ANTHROPIC_API_KEY` (o config `Anthropic:ApiKey`); modello di default Haiku (`Anthropic:Model`), quota `Anthropic:MaxChiamateAlGiorno` (default 50). Senza chiave i bottoni ✨ restano nascosti e tutto il resto funziona.
**Deploy sul server**: `dotnet publish -c Release` (aggiungere `--self-contained -r win-x64` o `linux-x64` se il server non ha il runtime 8).

**FUNZIONA (verificato end-to-end via HTTP)**: **auto-login in Development** (utente dev@genkai.local, niente schermate di login; in produzione login normale con cookie 30gg) · **riassunto del caso sempre visibile** (colonna fissa ≥1000px, bottone ☰ su mobile, un blocco per passo, si aggiorna mentre scrivi) · **mappa schematica di Kyoto** (SVG originale: 11 quartieri + Uji, Kamogawa/Katsura, stazione/Gosho/Gion/Inari, ★ distretto PG; apribile da ogni passo col 🗺, cliccabile con dettagli dalla biblioteca e selezione diretta al passo 0) · registrazione/login · lista+crea+elimina progetti · wizard 13 schermate con autosave (800ms debounce) e indicatore · biblioteche 🎲 (quartieri, tipologie, moventi, professioni, problemi, tratti, luoghi) · generatore nomi anti-omonimie per generazione (`/api/nomi`) · cast che si popola dai cerchi (passo 3/6) · filtro movente sul cast (passo 4) · colpevole selezionato DAL cast + errore coerente (passo 5) · intersezione reti calcolata (passo 6) · editor cronistoria/tracce con strade/handout/calendario · schede PNG col template canonico (passo 8) · lint (passo 9 e 12: essenziali ≥2 strade, colpevole nel cast, omonimie, false piste) · export dossier .md · proposte ✨ con "Usa questa" sui passi 1/2/4/5/7/11 e "Copia JSON" sugli altri.

**NON ANCORA (prossime iterazioni, in ordine)**:
1. Motori handout deterministici (tabulato in testa — spec in `generatori/`); ora i documenti-dati si pianificano soltanto
2. Export ZIP nella struttura avventura standard + resa HTML burocratica Heisei 9
3. Demo Kuroda precaricata (progetto `Demo=true`)
4. "Usa questa" AI anche per i passi a liste complesse (3/6/8/9/10) con merge guidato
5. Matrice chi-sa-cosa generata; export riservati_completi.json dal Registro Nomi
6. Hardening produzione: antiforgery sulle API JSON, quota AI su DB (ora in-memory, si azzera al riavvio), conferma email, rate limiting IP, HTTPS/HSTS config server

**Note tecniche**: lo stato del wizard vive in `ProgettoAvventura.StatoJson` (contratto: `schema/avventura.schema.json`); i JSON di `Dati/` sono copie di `biblioteche/` e `prompts/` (in caso di modifica, ricopiarli); `app.db` e bin/obj sono in .gitignore (repo pubblico).

## Riferimenti nel vault

- Metodo: `../GENKAI_Manuale_Situazioni.md` (11 passi, r.1-423; handout pre-elaborati r.1079+; distretti/enti r.424+)
- Indizi: `../GENKAI_Manuale_GM.md` (4 tipi r.446; caso irrisolto r.462; pressione PNG r.576)
- Nomi riservati: `../GENKAI_Registro_Nomi.md`
- Esempi reali: avventure `Il Giudice` (30+ PNG, 20 luoghi, 25 handout), `Sake` (13 handout HTML), `Ultima Lezione` (24 handout HTML), `QED` (matrice chi-sa-cosa in CLAUDE.md)
