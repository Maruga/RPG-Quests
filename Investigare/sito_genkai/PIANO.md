# Piano sito genkai.it

*Sorgente del sito: questa cartella (`Investigare/sito_genkai/`) — ciò che è qui è ciò che sta online. Upload via FTP sull'IP (mai sul dominio), architettura: Cloudflare → IIS/CCWS.*

## Regole permanenti (dall'utente)
1. **Niente manuali integrali online** (per ora). Prima pubblicazione prevista: **libretto della squadra** (PDF), quando l'utente dà l'ok.
2. **Niente invenzioni**: ogni testo del sito viene dai documenti ufficiali (Briefing Giocatori, Manuale Giocatori, Regolamento). La filosofia del gioco non si cambia e non si stravolge.
3. **Cartelle ben separate** sul server — niente mischioni.
4. GENKAI 限界 = **il limite degli investigatori** (il Ki che scende fino al crollo). Mai presentarlo come "il limite del caso".
5. Immagini: solo quelle viste e verificate; ottimizzate (JPEG progressivo, ≤1400px, ~200-300 KB).
6. Niente annunci non autorizzati (es. Kickstarter): lo stato progetto resta generico finché l'utente non decide.

## Struttura cartelle server
```
/                index.html — home concettuale (filosofia, il nome, le 8 parole)
/img/            immagini del sito, ottimizzate
/gioco/          [fase 2] la pagina "come si gioca" (briefing-light, SENZA manuale)
/squadra/        [fase 2] i 5 investigatori pregen con ritratti — PREVIA OK UTENTE
/materiale/      [fase 2] libretto squadra PDF + materiale scaricabile — PREVIA OK
/avventure/      [fase 3] presentazione avventure (Il Giudice, Sake, Ultima Lezione,
                 La Falsa Primavera, Occhi di Volpe) — SENZA spoiler, handout demo scelti
```

## Fase 1 — FATTA (2026-07-20)
- Home completa: hero 限界 + motto corretto · "Che cos'è" · "Gli indizi si danno sempre" ·
  "Genkai è il limite. Il vostro." (Ki→crollo) · griglia 8 parole (気縁業影情け悟り算盤限界) ·
  stato progetto · footer. Testi presi da Briefing/Manuale, citazioni quasi letterali.
- Immagini: `kyoto-1997.jpg` (incrocio urbano anni '90), `kyoto-pioggia.jpg` (copertina vicolo+pagoda).
- Design: identità 限界 — carta scura #14161a, inchiostro #d9d4c7, rosso hanko #b8342a,
  Georgia serif, kanji d'acqua nelle sezioni. Statico puro, zero JS, single-file CSS inline.

## Fase 2 — FATTA in gran parte (2026-07-20 sera, dopo feedback duro dell'utente)
- ✅ **LOGO UFFICIALE** (`Materiale/genkai_logo_transparent.png` — ensō spezzato + 限界 rosso) nell'hero su disco di carta + favicon
- ✅ **La squadra in home**: foto di gruppo + 5 card coi ritratti (Libretto/A_*.png, Honda=A2) + citazioni CHI SEI
- ✅ **`/squadra/` = libretto_squadra.html** dell'utente pubblicato COM'È (autocontenuto, immagini base64) — FIX: aggiunto solo `<!doctype>+<meta charset=utf-8>` in testa alla copia pubblicata (l'originale ne è privo → mojibake sui kanji; l'originale utente NON toccato)
- ✅ **Sezione "Il distretto"**: i 5 PNG notevoli con ritratti tondi (Taniguchi/Yamada/Ito/Watanabe/Gonda — SENZA spoiler talpa)
- ✅ **Sezione "La Crime Board"** con l'immagine ufficiale (vista e approvata) + attributi + Gou d'esempio
- Resta: `/gioco/` estesa · og:image social · eventualmente `/materiale/` col PDF

## Fase 3
- `/avventure/` — una scheda per avventura (pitch senza spoiler + 1-2 handout dimostrativi)
- Eventuale wizard online (sottodominio, DOPO hardening: via auto-login dev, registrazione, ACL scrittura)

## Tecnica
- Upload: `curl.exe --user "genkai:<pass>" -T file "ftp://212.112.91.21/percorso/file" --ftp-create-dirs`
- Cloudflare cachea gli statici: per aggiornamenti a immagini/CSS usare query `?v=` o purge dal pannello CF (l'HTML di norma non è cacheato)
- Aggiornamento del sito = modificare QUI e ricaricare via FTP (mai modifiche solo-server)
