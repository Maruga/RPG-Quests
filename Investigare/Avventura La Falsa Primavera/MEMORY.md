# MEMORY.md — La Falsa Primavera

Note di lavoro per questa avventura. Aggiornare dopo ogni sessione di modifica.

## Stato attuale

- **File canonico**: `Storia Completa.md` — **v2.2** (sez. 8 alleggerita, solo indice + Note GM)
- **Handout HTML**: **10 file creati** in `handout/` (stile burocratico JP '97, dark mode su schermo + print A4, pattern Ultima Lezione). Vedi elenco sotto.
- **Schede PNG**: **10 schede .md** create in `PNG/` (pattern Avventura Ultima Lezione — anagrafica, descrizione, prompt GPT, En per 5 PG standard, frasi tipiche, comportamento per fase, alibi, segreti GM).
- **PG**: non ancora creati per questa avventura specifica (si possono adattare i PG investigativi standard con `Investigare/pg/genera_schede_pg.py`). Le schede PNG usano i nomi PG standard: Yamamoto, Honda, Nakamura, Sato, Fujita.
- **Playtest**: non ancora testata al tavolo

### File schede PNG — stato

| File | Ruolo |
|---|---|
| `01_Ogawa_Masao.md` | Vittima (scheda di background) |
| `02_Ogawa_Fumiko.md` | Falsa sospettata — la trappola |
| `03_Ogawa_Shuichi.md` | Falso sospettato — debiti + Tokarev |
| `04_Ogawa_Yumi.md` | **Assassina** — scheda più complessa, con prompt roleplay |
| `05_Murakami_Kazuko.md` | Testimone chiave — flusso di coscienza |
| `06_Shimizu_Tetsuo.md` | Fonte informativa — segreto professionale |
| `07_Dott_Morita_Chiaki.md` | Medico legale — rete di sicurezza GM |
| `08_Dott_Nishida_Takao.md` | Cardiologo — farmacologia digossina |
| `09_Obata_Shigeru.md` | Custode — ancore temporali (cestini 28/3, umeshu sigillata) |
| `10_Kubo_Midori.md` | Amante vittima — **pista falsa** |

### File handout HTML — stato

| File | Ente/Org | Verifiche realtà effettuate |
|---|---|---|
| `01_Referto_Autoptico.html` | Osp. Prefetturale di Kyoto (Kamigyō-ku) | Peso cuore 430g, digossina 8,4, miosi, alcol 0,4, Lanoxin 0,25mg/die |
| `02_Rapporto_Scena.html` | Polizia Scientifica KPD, distretto Higashiyama | Armadietto aperto, Lanoxin assente, fazzoletto nel cestino, agenda nella scrivania |
| `03_Cartella_Clinica.html` | Kyodai Hospital, Cardiologia | FA cronica '94, Lanoxin+Aspirina+acido folico, 4 visite log, ultima 08/03 stabile |
| `04_Trascrizione_119.html` | Dip. VVF/119 Kyoto | Dialogo JP identico al testo originale + log centralino 06:38-07:18 |
| `05_Esami_Sangue.html` | Kyodai Lab Centrale | Tabella 6 soggetti + metodica EIA + note tossicologiche |
| `06_Tabulati_Telefonici.html` | NTT / NTT DoCoMo Kansai | 3 utenze, 18 chiamate, giorni della settimana verificati su calendario 1997 |
| `07_Agenda_Ogawa.html` | Takahashi Techo 1997 (**NON** Hobonichi: lanciato nel 2001) | 7 date JP con giorno settimana verificato |
| `08_Fotogramma_Konbini.html` | Family Mart Higashiōji-Shichijō | VHS time-lapse 2fps B/N, tabella confronto 4 soggetti con Shimizu escluso |
| `09_Lettera_Anonima.html` | Busta+contenuto, analisi Scientifica | Testo JP invariato, timbro Nakagyō, stampa inkjet Mincho |
| `10_Analisi_Timbro.html` | Poste Giapponesi + Scientifica | Perimetro raccolta Nakagyō delimitato (Oike/Shijō/Kawaramachi/Horikawa) |

### Correzioni storiche applicate durante la creazione handout

- **Agenda**: "Hobonichi Techo" (prodotto 2001+) → **Takahashi No Techo** (brand reale dal 1949). Correzione applicata in H7 HTML. Il testo originale della Storia Completa citava "Hobonichi" — non rilevante perché quella sezione è stata rimossa.
- **Reperto G (agenda)**: nel testo originale Reperti A-F. Nel rapporto scena HTML ho usato "documento acquisito" invece di "Reperto G" per non contraddire la tabella Prove.

## Storico modifiche

### 2026-04-24 — Revisione v2.0 → v2.1

Esame sistematico incongruenze e correzioni (utente: Maruga).

**Sezione 1 — Panoramica**
- Aggiunto elenco esplicito dei 6 convitati (prima si deduceva solo da H5)

**Sezione 2 — "Come"**
- Riscritto passaggio contaminazione umeshu: chiarito il doppio fazzoletto (uno nel cestino con residui visibili, uno pulito in tasca con polvere)
- Esplicitato il tragitto credenza→cucina→soggiorno (Fumiko di spalle al lavello)
- Aggiunto pretesto ingresso konbini (fazzoletti comprati alla cassa)

**Sezione 3 — Dialoghi PNG**
- **Fumiko** medicine: *"Ritiravo la ricetta... scatola nel bagno dalla sua parte... non toccavo i blister"* (risolve conflitto "gestiva medicine / non toccava scatola")
- **Shūichi** (2x): sigarette prese dalla giacca in **camera ospiti** (non matrimoniale) — distingue la sua salita da quella di Yumi al bagno
- **Kazuko**: *"un paio di bicchierini come sempre"* (coerente con 1,4 ng/mL) + inserito indizio sepolto *"mi pare sia passata anche in cucina"*
- **Shimizu** (2x): "pranzo domenicale" → "pranzo di famiglia" / "pranzo di metà marzo"

**Sezione 4 — Cronologia**
- Corretta data incontro Shimizu: `15/03` → `12/03 (Mer)` — 15/03 è sabato, studio chiuso; coerente con agenda H7
- Aggiunta riga `20/03→27/03` per telefonate Shimizu (cfr. tabulati)
- Aggiunto `15/03/1997 (Sab)` esplicito per il pranzo (prima era `~16/03 (domenicale)`)
- Chiamata 07:05 riformulata senza "auguri domenicali" — ora: *"Chi ha composto il numero?"*
- Aggiunta riga `30/03 mattinata` — sopralluogo villa + scoperta scatola assente

**Sezione 5 — Location**
- Camera ospiti ora menziona esplicitamente "borsa e giacca" di Yumi+Shūichi

**Sezione 6 — Prove**
- **Reperto A**: impronte → solo Ogawa (apertura) e Yumi (versamento). Più conclusivo di "tutti tranne Shūichi"
- **Reperto D**: aggiunto Shimizu escluso (maschio, 172 cm)

**Sezione 8 — Handout**
- Rinumerati: H6b→H7, H7→H8, H8→H9, H9→H10
- H8 fotogramma: aggiunta riga Shimizu nella tabella corporature
- H6 nota GM chiamata 07:05: chiarita dinamica (agente risponde, Yumi riaggancia sentendo voce estranea)

**Footer**: v2.0 → v2.1

### 2026-04-24 — Creazione handout HTML (v2.1 → v2.2)

Creati 10 handout HTML nella cartella `handout/` seguendo il pattern di Ultima Lezione (stile burocratico JP '97, dark mode su schermo, print-friendly A4). Ad ogni handout verifica realtà incrociata con il testo canonico, calendario 1997, farmacologia digossina, procedura 119 JP, sistema postale JP, NTT 1997.

**Note di verifica per handout**:
- **H1 Autopsia**: peso cuore 430g coerente con FA cronica; digossina 8,4 ng/mL incompatibile con dose terapeutica 0,25mg/die; alcol 0,4 compatibile con 3-4 bicchierini umeshu
- **H2 Scena**: 6 ambienti documentati, reperto A+C citati, agenda acquisita come documento (non numerata come Reperto G per non contraddire tabella Prove)
- **H3 Cartella clinica**: Lanoxin+Aspirina+acido folico è schema standard per AF cronica; 4 visite log in 12 mesi; ultima visita 08/03 stabile
- **H4 119**: dialogo JP identico al testo originale; log centralino aggiunge tempistica 06:38-07:18 arrivo medico legale
- **H5 Sangue**: metodica immunoenzimatica EIA (standard '97); media 1,1 calcolata su 4 sopravvissuti (1,2+1,0+1,4+0,9)/4=1,125
- **H6 Tabulati**: giorni della settimana aggiunti per ogni data, tutti verificati su calendario 1997; chiamata 07:05 evidenziata in entrambi i tabulati sincronizzati
- **H7 Agenda**: **correzione storica** Hobonichi→Takahashi (Hobonichi Techo lanciato 2001, Takahashi No Techo brand reale dal 1949); date JP tutte con giorno settimana corretto
- **H8 Fotogramma**: Family Mart a Higashiōji-Shichijō esiste realmente in Higashiyama-ku; qualità VHS time-lapse 2fps B/N è tipica delle TVCC convenience store anni '90; Shimizu aggiunto alla tabella esclusioni
- **H9 Lettera**: stampa inkjet consumer diffusa in JP '97 (Canon BJ, Epson Stylus); francobollo ¥80 era la tariffa ordinaria '94-'99
- **H10 Timbro**: perimetro raccolta Nakagyō delimitato con vie reali (Oike/Shijō/Kawaramachi/Horikawa) che effettivamente definiscono il quartiere

**Modifiche a Storia Completa.md (v2.1 → v2.2)**:
- Rimossi tutti gli handout testuali H1-H10 dalla sezione 8
- Sezione 8 ora contiene: (a) tabella indice dei 10 file HTML, (b) "Consegna consigliata" in 5 fasi, (c) "Note GM per gli handout" con le info tecniche riservate (chiave numeri, dato 0,3 di Yumi, chiamata 07:05, capelli raccolti, trappola lettera)

## Incongruenze verificate e OK (non toccare)

- **Calcolo Lanoxin**: 60 cp dal 05/03, 24 giorni × 1 = 24 consumate → 36 residue → Yumi ne prende 12 → 24 rimaste. Reperto B dice "12 mancanti in più del previsto" → **corretto**.
- **Calendario 1997**: 15/3 sabato ✓, 22/3 sabato ✓, 27/3 giovedì ✓, 29/3 sabato ✓, 3/4 giovedì ✓. Tutte le date coerenti con calendario reale.
- **Cassetta Nakagyō**: Yumi imbuca notte 29→30 (domenica). Prima raccolta utile lunedì 31/3. Consegna polizia mercoledì 2/4. Coerente con ciclo postale JP (no raccolta domenica).
- **Digossina**: letale per cardiopatico a 8,4 vs terapeutici 0,8-2,0 — plausibile farmacologicamente.
- **Tabulati**: 10 chiamate su 3 utenze, periodo 20/03-30/03, tutti i numeri chiave identificabili. Coerenti con agenda e cronologia.
- **Scena finale**: Shūichi 34 anni, Yumi 30, sposati da "sei anni" (Yumi aveva 24) — plausibile.

## Struttura narrativa — punti da NON enfatizzare al tavolo

1. Valore `0,3` di Yumi in H5 (se non visto, Morita lo segnala 1 volta sola)
2. Frasi di Kazuko dentro il flusso logorroico
3. Timbro Nakagyō + conoscenza amante nella lettera
4. *"Mi pare sia passata anche in cucina"* di Kazuko (indizio sepolto sul momento della contaminazione)
5. Capelli raccolti nel filmato vs capelli sciolti abituali di Yumi
6. Shimizu che ricorda i fogli raccolti al pranzo di metà marzo

## TODO residui

- [x] ~~Creare handout HTML~~ — **fatto 2026-04-24** (10 file in `handout/`)
- [x] ~~Rimuovere handout testuali da Storia Completa~~ — **fatto 2026-04-24** (sostituiti da indice + Note GM)
- [x] ~~Schede PNG~~ — **fatto 2026-04-24** (10 file in `PNG/`)
- [ ] Definire schede PG specifiche (o adattare PG standard con `Investigare/pg/genera_schede_pg.py`)
- [ ] Eventuale cartellina GM stampabile (A4, chiavi numeri, tabella soluzione)
- [ ] Playtest sessione unica per validare timing 3-4h
- [ ] Valutare se aggiungere prove fisiche secondarie (impronte sulla cassetta postale? ricevuta konbini?)
- [ ] Verificare resa visiva handout in browser locale (file:// protocol + stampa PDF A4)

## Riferimenti

- Manuale Situazioni GENKAI — scheda Procura (segreto professionale Shimizu)
- Regolamento v1.3 — Corruzione (non applicabile a questo caso, famiglia privata)
- Manuale GM — "Quadro Legale Giappone 1997" (fermo 48h→23gg, keisatsu/kensatsu)
- Avventure gemelle: `Investigare/Avventura Sake/` (10 handout HTML), `Investigare/Avventura Ultima Lezione/` (24 handout HTML stile burocratico JP)
