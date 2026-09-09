# Analisi del sito genkai.it — 2026-09-09 (sessione WIZARD)

Verifica fatta su: sito online (curl + Chrome desktop e telefono 390px + Lighthouse) e sorgente in `sito_genkai/`.
Niente è stato modificato: questo file è solo la fotografia e la lista delle cose da decidere.

## 1. Stato di fatto (verificato)

- **Online = sorgente**: `index.html`, `squadra/`, `handout/`, `provalo/`, `provalo/scontro/`, `scontro.js` sono byte per byte uguali a questa cartella. Nessuna modifica "solo server".
- **Tutte le pagine rispondono 200** (home, squadra, handout, provalo, scontro, /Pg, /Account/Login, /Account/Registrati). `/Progetti`, `/Account`, `/SchedeComplete` → 302 al login (giusto).
- **Lighthouse mobile sulla home**: SEO 100 · Accessibilità 96 · Best practices 96. Zero sbordo orizzontale a 390px.
- **Peso della home**: ~3,2 MB di immagini in tutto (quasi tutte lazy). Le tre pagine del libretto mostrate come miniature sono i JPEG da 1400px (~350 KB l'una): ~1 MB sprecato.
- **Cache**: gli HTML sono `DYNAMIC` (mai in cache Cloudflare), js/css sì → il `?v=` va cambiato a mano (oggi `20260907a`).
- `robots.txt` è quello generato da Cloudflare (content signals). Manca `sitemap.xml` (minore).
- HSTS attivo; nessuna CSP e nessun `X-Content-Type-Options` (minore, da valutare a fine lavori).

## 2. Problemi, in ordine di impatto

### A. La promessa principale è spenta
- «Scarica lo Starter — a breve» è disabilitato in **4 punti** della home; i 4 manuali sono tutti «A breve»; nelle avventure si scarica solo… niente («Per ora si scarica il caso dello Starter» ma il bottone è spento).
- `handout/` e `squadra/` chiudono con «**Scarica lo Starter — gratis**» → porta a `../#starter`, dove trovi il bottone spento. Testo e realtà non coincidono.
- Dipende dalla sessione STARTERKIT (nessun PDF esiste ancora in tutta `Investigare/`: solo 4 PDF di token/prove di scheda). Quando arriva lo zip: `wwwroot/download/genkai-starter.zip` + riattivare i 4 `btn-disab`.

### B. Menu su telefono: «Provalo» non si vede
- La barra è una striscia orizzontale scorrevole senza indicatore: a 390px si leggono solo «IL GIOCO · STARTER» (menu 689px in 146px di spazio). **Provalo, Strumenti, Manuali sono invisibili** e niente dice che si può scorrere.
- Provalo è la cosa più convincente del sito (si gioca in 5 minuti senza scaricare nulla) e in home è **solo una voce di menu**: nessuna sezione, nessun bottone nell'apertura.

### C. Due siti in uno
- Home e pagine statiche: carta, Georgia, rosso hanko. Il wizard (`/Pg`, `/Progetti`, `/Account/*`): **Bootstrap bianco**, marchio «GENKAI Wizard», menu diverso (Home · I miei casi · I miei personaggi · Privacy), font di sistema, footer «Wizard delle Situazioni».
- Da «✨ Crea un investigatore» in home si atterra su una pagina che sembra un altro prodotto. Il ritorno al sito si chiama «Home».

### D. Pagine di template ASP.NET pubbliche
- **`/Privacy`**: «Use this page to detail your site's privacy policy.» — ed è **linkata nel menu e nel footer del wizard**. Il sito raccoglie email, cookie e commenti: serve un'informativa vera.
- `/Index`: «Welcome — Learn about building Web apps with ASP.NET Core».
- `/Error`: pagina in inglese di default.

### E. Numeri e dati della home non allineati al materiale — ⏸ RIMANDATO ALLA FINE (decisione utente 2026-09-09: «lo sistemiamo alla fine»)
Verifica fatta sulle cartelle delle avventure e su `pg/*.md`:

| Home dice | Nel materiale | Fonte |
|---|---|---|
| L'Ultima Lezione: **46 handout** | **24** HTML (i 21 in `backup/` sono la versione vecchia degli stessi) | `Avventura Ultima Lezione/MEMORY.md`, `handout/` |
| La Falsa Primavera: **17 handout** | **16** HTML (13 numerati + M1/M2/M3) | `Avventura La Falsa Primavera/handout/` |
| «Ogni avventura ne porta **dai 13 ai 46**» | da 13 a 24 (Sake 13 · Falsa Primavera 16 · Ultima Lezione 24 · Il Giudice 24; QED 9 solo .md; Tra Galli e Occhi di Volpe 0) | cartelle `handout/` |
| Nakamura Shota **Agente** · Fujita Emi **Agente** | **Ispettore (Keibu-ho)** entrambi | `pg/PG_03`, `pg/PG_05` |
| Yamamoto **Ispettore** · Sato **Agente** | Ispettore **Capo** (Keibu) · Agente **Scelto** (Junsa-cho) | `pg/PG_01`, `pg/PG_04` |
| «**3–4 ore** a caso» (apertura) | Starter: «2-3 ore» · Sake: «60-90 minuti» · solo Falsa Primavera dice 3-4 | `Starter Kit/SK_Manuale.md`, `Avventura Sake/Storia Completa.md` |
| «**3–5 giocatori + 1 GM**» | Avventure: «Giocatori 3-5»; SK_Manuale: «3-5 persone, una fa il GM» (le due fonti si contraddicono) | idem |
| Ultima Lezione: «trovato morto **nel suo studio**» | il CLAUDE.md dell'avventura dice che Morimoto muore **a casa**; lo studio 307 ha solo prove false | `Avventura Ultima Lezione/CLAUDE.md` — **da girare a REGOLE** |
| Occhi di Volpe presentata come pronta (solo bollino «Ispirata a un caso reale») | nella cartella ci sono solo `CLAUDE.md` e la cronistoria: zero handout, zero PNG | `Avventura Occhi di Volpe/` |
| L'Ultima Cena di Tanaka «Una serata · 3–4 ore» | «Durata: 60-90 minuti» | `Avventura Sake/Storia Completa.md`, `_adventure.json` |

Esatti: Sake 13 handout, fascicolo 97-KPD-1114, novembre 1997 · Il Giudice 24 · Occhi di Volpe 8-10 sessioni e caso Glico · QED giugno 1997 in lavorazione · Tra Galli febbraio 1998 in lavorazione · wizard PG «dodici passi» (PASSI 1-12 + schermo 0).

### F. Cose mancanti rispetto al PIANO
- ~~`/avventure/` (una pagina per avventura)~~ — **decisione utente 2026-09-09: le schede NON si aprono, le avventure complete sono a pagamento** → in home un modulo di richiesta (nome, email, avventura, messaggio) che manda una mail a info@genkai.it via `/api/commenti`; prezzi e modalità li dà l'utente più avanti. `/gioco/` non esiste (Provalo fa quel lavoro).
- Nessun contatto sul sito (esiste `info@genkai.it`; il modulo commenti c'è solo in fondo a provalo/scontro).
- Le pagine `provalo/` e `provalo/scontro/` non hanno `og:*` (condivise su WhatsApp/Telegram escono senza immagine).
- Footer minimo: solo «La squadra · GM Dashboard».

### G. Pulizia
- In `sito_genkai/` restano `libretto_squadra.html` (2,7 MB, non più servito: online dà 404) e `index-v1-backup.html`.
- Sul server, l'`index.html` nella radice FTP è il residuo del 20/07 (non servito: vale `wwwroot/index.html`).
- Contrasto (Lighthouse): i bottoni `btn-disab` e i kanji d'acqua. I kanji sono decorativi, i bottoni spariranno con lo Starter.

## 3. Proposta di ordine dei lavori (attesa decisione)

1. **Telefono**: menu ☰ (o riga di voci a capo) con Provalo sempre visibile; **sezione «Provalo» in home** con bottone nell'apertura.
2. **Una cosa sola**: testata e piede del sito anche nel wizard (stessa barra, stessi colori, «‹ Torna al sito»), via «GENKAI Wizard»; Privacy vera; `/Index` ed `/Error` sostituiti.
3. **Dati della home**: correzioni della tabella E dopo la decisione dell'utente; la riga su Ultima Lezione va alla sessione REGOLE.
4. **Starter**: appena lo zip arriva, pubblicare e riattivare i bottoni; sistemare i due «gratis» di handout/squadra.
5. **Fase 3**: og su provalo, contatto nel footer, sitemap. ⏸ Miniature/peso immagini: **alla fine** (decisione utente 2026-09-09). Pagine per avventura: NO (a pagamento, c'è il modulo).

## 4. Trovato dopo (2026-09-09, 03:00)
- `/provalo/img/soglia.jpg` rispondeva **522 dal bordo Cloudflare** (costante, 19 s di timeout) mentre l'origine dà 200 e con una query string passa: la scena con la figura sulla soglia usciva senza immagine. Fix: `img/soglia.jpg?v=20260909` in `provalo/index.html`. Tutte le altre risorse di provalo e scontro: 200.

## 5. Striscia delle prove (2026-09-09 sera, richiesta utente)
- «Provalo» **tolto dal menu in alto** della home (resta nel menu del wizard, dove non c'è la striscia).
- Nuova **striscia `.strisc`** fra l'apertura e «Che gioco è», 4 riquadri cliccabili (2×2 su telefono, 4 in fila da 760px):
  **Prova una mini-avventura** (`provalo/`) · **Prova un combattimento** (`provalo/scontro/`) ·
  **Crea un'avventura** (`/Progetti`) · **GM Dashboard** (`maru.ga`). I primi due hanno il filetto rosso.
- Perché fosse **subito visibile anche su telefono**: dall'apertura sono spariti i due bottoni ora doppioni
  («Provalo: un mini-caso nel browser» e «Costruisci un caso» — restano «✨ Crea un investigatore» e lo Starter spento),
  logo 120→96px e meno spazio sopra/sotto solo sotto i 760px. Risultato: la striscia inizia a **690px** su uno schermo da 844
  (prima 1640: due schermate). Su desktop l'apertura è invariata.
- Resta più in basso la sezione scura «Provalo adesso» (approfondimento con immagine): se all'autore sembra un doppione, si toglie.
- Backup: `index.html.bak2-20260909`.

## 6. «Pregenerati» (2026-09-09 sera, richiesta utente)
La sezione della squadra non diceva che sono personaggi già fatti. Ora usa il termine del giro:
occhiello «Personaggi pregenerati · pronti all'uso», titolo «Gli investigatori già pronti» e testo
«Cinque schede pregenerate: la squadra del distretto, già compilata — attributi, specializzazione,
il dono che costa caro, la vita privata. Si stampano, si distribuiscono e si gioca, senza costruire niente.»
Stesso termine nel rimando dalla banda «Crea il tuo investigatore» e nell'elenco dello Starter.
