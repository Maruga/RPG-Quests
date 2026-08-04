# Brief — Wizard "Crea il tuo personaggio" (GENKAI 限界)

> Documento di lavoro (2026-07-28). Da rivedere insieme prima di costruire.
> Fonti regole: Manuale Giocatori, Regolamento v1.3, Combattimento, Briefing, Specializzazioni, schede PG d'esempio.

## 1. Cosa è
Un wizard **per il GIOCATORE** (non per il GM) che lo guida a **creare** il proprio investigatore e a **salvarne la scheda**, con aiuti e spiegazioni passo-passo, applicando le regole in automatico. Poi lo stesso strumento gestisce il **passaggio di livello** (Shugyō) tra un caso e l'altro.

**Audience diversa dal wizard-avventure**: qui l'utente è un giocatore, spesso alle prime armi → ogni concetto (Ki, Genkai, Gou, Senmon, Kage, Enja) va **spiegato in linea** con aiuti ❓ **a tocco** (mai mouseover), tono semplice.

## 2. Architettura proposta
- **Nuova sezione della stessa app** `GenkaiWizard` (ASP.NET Core .NET 8, EF+SQLite), non un'app a parte: riuso login, salvataggio per-utente, autosave, biblioteche, tiri di dado, pattern liste/select+"Altro", export. Un nuovo tipo di "progetto" = **Personaggio** (accanto ai progetti-avventura), oppure un'area `/Pg`.
- Stato del PG in JSON (come `WIZ.stato`), **autosave a ogni modifica** (come abbiamo appena sistemato per le schede), niente pulsante Salva.
- **Nessuna AI necessaria** per il core (è calcolo+scelte da catalogo); la AI resta opzionale per aiutini narrativi (es. proporre un Kage, un tratto) — da decidere se metterla.

## 3. Dati da preparare (nuove biblioteche JSON)
Servono due cataloghi, estratti dai manuali, in `Dati/biblioteche/`:
- **`gou.json`** — i **21 Gou**: id, nome, attributo (o due, "a scelta"), costo (2/3/4), effetto breve, vincolo, requisito attributo (Teatro delle Ombre: Lucidità ≥7; L'Eco della Montagna: Silenzio ≥7).
- **`senmon.json`** — le Senmon (~40) in **famiglie** (Tecniche investigative, Conoscenze di campo, Conoscenze professionali, Territorio, Combattimento): id, nome, famiglia, attributo chiave, tipo-Maestro (`+3` conoscenza / `+2 con Correzione` tecnica), note requisiti.
- (Attributi, gradi, costi Shugyō: costanti nel codice.)

## 4. Flusso di creazione (schermate)
Ordine consigliato dai manuali: **Attributi → Senmon → Gou → Ki → Kage → Enja → narrativa**.

1. **Chi sei (identità)** — Nome romaji + kanji, Età, Ruolo, Grado (rango polizia JP), Anni di servizio. *Narrativo, nessuna regola.* + pagina introduttiva "cos'è un investigatore GENKAI".
2. **Attributi** — 6 attributi (**Distacco · Pazienza · Silenzio · Lucidità · Ascolto · Presenza**). Regola scheda-vuota: **partono tutti da 4**, **distribuisci 9 punti**, **min 4 · max 9**. Contatore live "punti rimasti", spiegazione di ogni attributo, blocco se sfori.
3. **Senmon (specializzazioni)** — mostra **Lotta 1** già assegnata a tutti ("d'accademia"); fai scegliere **+1 Senmon di grado 1 (Praticante, +1)**, **diversa da Lotta**, dal catalogo per famiglia, con spiegazione. Mostra l'attributo chiave di ognuna. (Il resto dei gradi si compra dopo, con lo Shugyō.)
4. **Gou (il tuo potere)** — scegli **1** dal catalogo dei 21 (raggruppati per attributo), con nome/attributo/costo/effetto/vincolo spiegati. **Valida i requisiti** (i due Gou con attributo ≥7 selezionabili solo se soddisfi). Spiega la meccanica: paghi Ki, tiri 2d6 ≤ attributo, funziona sempre (successo/parziale), costo raddoppia a uso, notte −1 grado, attivabile solo restando a Ki ≥1.
5. **Ki** — calcolo guidato: **Ki max = attributo più basso + 2d6 (prendi il dado PIÙ ALTO)**, un **1 si ritira sempre** (anche più volte), **tetto 12**. Bottone "tira" (riuso dei dadi del wizard). Qui si SPIEGANO (senza input): **Genkai** = crollo a Ki ≤3; **Nasake** (riserva 1, parte vuota); **Soroban** (parte da 5 ogni giornata).
6. **Kage 影 (il tuo problema)** — testo del problema personale + mini-scheda del **PNG del Kage** (età, lavoro, relazione, cosa vuole, come si comporta). Spiega: lo definisci tu, ma quando/come si attiva lo decide il GM.
7. **Enja 縁者 (il tuo contatto)** — chi è, relazione, cosa può fare, cosa vuole in cambio, come contattarlo, limite. Spiega: 1 uso/sessione gratis, la 2ª volta chiede qualcosa.
8. **Come ti comporti + tratti** — Tatemae (in pubblico) / Honne (in privato) / frase tipica / sotto pressione / debolezza; 5 tratti personali (Vizio, Tic, Oggetto, Gusto, + 1 libero). *Narrativo.*
9. **Rapporti nella squadra** — una riga per ogni altro PG (opzionale, se il gruppo è noto).
10. **Riepilogo + salva + export** — scheda leggibile + **export** (vedi §6). Equipaggiamento di servizio **standard** mostrato qui (non è una scelta): New Nambu M60 + giubbotto in armadietto, keibō, tesserino/manette/taccuino, mani nude = Lotta 1.

## 5. Modalità "Passaggio di livello" (Shugyō)
Per un PG già salvato, schermata dedicata che mostra i **punti Shugyō** e permette di spenderli, con validazione:
- **Attributo +1** = valore d'arrivo ×3 (5→15, 6→18, 7→21, 8→24, 9→27); tetto 9.
- **Ki max +1** = valore d'arrivo ×4 (9→36, 10→40); tetto 12.
- **Senmon**: G1 **9** · G2 **19** · G3 **39** (si sommano; da zero a Maestro 67). Requisiti G2 = attr. chiave ≥6 + ≥10 usi; G3 = paletti voce + ≥25 usi. **Max 1 nuova Senmon per intervallo tra i casi.**
- **Enja aggiuntivo** = 12. **Affina il Gou** (−1 costo, una sola volta) = costo base attuale ×11 (3→2=33, 2→1=22, 4→3=44). **Secondo Gou / Satori: non acquistabili.**
- Distinzione **permanente** (scheda, si cambia solo qui) vs **temporaneo** (valore attuale, oscilla in gioco): il wizard tocca solo il permanente. La **Scena Personale** (±1 al valore *attuale*) è roba di tavolo, la spieghiamo ma non è input del wizard.
- Contatore usi delle Senmon (tacche ☐) editabile sulla scheda.

## 6. Salvataggio ed export
- Stato salvato per-utente (autosave), un personaggio per "progetto-PG".
- **Export scheda**: (a) `.md` leggibile; (b) idealmente **.docx impaginato** come le schede esistenti (`pg/ANTEPRIMA_*.docx`, generatore `pg/genera_schede_pg.py`) — riusare quel layout è la strada per la resa "da tavolo". Da valutare se generare il DOCX lato server o riusare lo script Python.

## 7. Regole da far rispettare (validazioni automatiche)
Attributi 4-9 e somma 9 punti · Ki con la formula e tetto 12 · esattamente 1 Gou (+ requisito attributo) · Lotta 1 fissa + 1 Senmon G1 ≠ Lotta · in Shugyō: tetti, costi, requisiti gradi, max 1 nuova Senmon/intervallo, secondo Gou/Satori vietati.

## 8. Decisioni PRESE (utente, 2026-07-28)
1. **Pool di scelta**: **catalogo intero** (21 Gou / ~40 Senmon) con spiegazioni.
2. **Integrazione**: **stessa app** GenkaiWizard, nuova sezione.
3. **Export**: **stampa in HTML** (vista stampabile); altri formati li vediamo alla fine.
4. **AI**: **sì, ovunque** per aiuti narrativi (descrizioni, aspetto, Kage, Enja, tratti…) **e immagini** — sia il **ritratto** della persona sia **immagini di situazioni**.
5. **Squadra**: per ora **solo la scheda**; la sezione gruppo verrà dopo — tenere il modello aperto: **un PG può stare in PIÙ gruppi**.
6. **Nomi**: **niente anti-omonimia** (campagne diverse, i PNG notevoli potrebbero non esserci).

## Note (dai manuali)
- Attributi = 6, range 4-9. Ki max = attr più basso + 2d6(alto), tetto 12, Genkai a ≤3.
- 1 Gou (21 a catalogo, costi 2/3/4, 2 con requisito ≥7). Senmon: Lotta 1 a tutti + 1 G1 scelta; gradi +1/+2/+3 (Maestro tecniche = +2 con Correzione), costi 9/19/39.
- Shugyō: 1/sessione, 4-6/caso, +1 scena personale, +1 momento eccezionale.
- Kage ed Enja definiti in creazione; equipaggiamento standard; Nasake/Soroban non sono input.
