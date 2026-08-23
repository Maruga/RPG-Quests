# Registro delle modifiche — fra la sessione REGOLE e la sessione WIZARD

> Qui si scrive **solo ciò che l'altra sessione deve sapere**: una regola cambiata, un valore,
> un costo, un nome, un testo che compare anche nei programmi.
> **Le righe nuove vanno in cima.** Chi applica una modifica la segna come fatta e firma.
>
> Formato: `data · CHI → CHI · cosa è cambiato · dove` — poi lo stato.
> Stati: **DA APPLICARE** · **APPLICATO** (con data) · **NON SERVE** (con il perché).

---

## Da applicare

- 2026-08-23 · RICHIAMO → REGOLE · **`pg/SCHEDE_PG_TUTTE.docx` modificato su richiesta utente**
  (backup: `.bak-20260823-claude`): le schede 2-5 allineate alla scheda 1 ritoccata dall'utente
  (tabella attributi a colonna unica senza «3 punti da distribuire», tabella KI con Satori
  «Usato ☐» e Soroban riscritto, «GOU — in gioco ne scegli uno...», «SENMON — *suggerito»,
  «/ solo per campagne» su Usi e Shugyō); **3 punti attributo DISTRIBUITI su tutte e 5**
  (decisione utente «li mettiamo noi»; v2 dopo bocciatura della prima distribuzione troppo
  concentrata su Lucidità — ora UN solo 8 in squadra: Yamamoto Pre+2/Asc+1 → 6/4/4/7/5/7 ·
  Honda Dis+1/Asc+1/Pre+1 → 7/4/4/7/5/6 · Nakamura Asc+1(8)/Sil+1/Luc+1 → 4/7/5/5/8/4 ·
  Sato Dis+1/Paz+1/Sil+1 → 5/7/5/7/5/4 · Fujita Dis+2/Asc+1 → 6/4/7/5/7/4 — somma 33) + **asterisco Senmon suggerita**
  (Honda *Rilievi e fotografia · Nakamura *Interrogatorio · Sato *Medicinali e veleni ·
  Fujita *Copertura e travestimento; Yamamoto *Stampa e media = scelta utente). Al tavolo
  resta solo: tirare il Ki (2d6) e confermare la Senmon. Se rigenerate dal generatore,
  riportare questi cambi nei dict. · **SOLO INFORMATIVO / da recepire nel generatore**

- 2026-08-21 · RICHIAMO → REGOLE · Creato `Avventura Richiamo/KAGE_FAMIGLIE.docx`: scene-telefonata
  delle famiglie (Yamamoto/Nakamura/Sato — gli unici con familiari nei Kage) per la one-shot
  Richiamo, derivate dai dossier `pg/Kage/*` che NON sono stati toccati. Solo scene, nessuna
  meccanica Kage (coerente con la one-shot). Se i PG tornano in campagna, gli esiti sono fili
  per i dossier veri (nota in coda al DOCX). · **SOLO INFORMATIVO** (nessuna azione richiesta)

### 2026-08-19 · RICHIAMO (nuova sessione) → TUTTE · Nuova avventura «Richiamo» in `Avventura Richiamo/`

L'utente ha aperto una sessione dedicata nella cartella `Avventura Richiamo/`: avventura kaijū
(**Uminari**, baia di Tokyo → centrale di Tōkai Daini, 12–14 novembre 1986), GENKAI usato come
sistema di scontro (Shōtotsu **v2.1** corrente — pistola 3/2/4 già recepita) + tiri standard.
Stato: design v0.1 dell'utente (`kaiju-design.md` + `telegiornale-uminari.md` + 3 immagini)
→ sviluppo v0.2 proposto (`RICHIAMO_Sviluppo.md`), in attesa delle conferme dell'utente.
- `GENKAI_Registro_Nomi.md`: aggiunta sezione *Richiamo* — 2 nomi canone dal telegiornale
  (Morikawa Jun'ichi, Kobayashi Ai) + 6 proposti in bozza; nessuna omonimia piena.
- Nulla da applicare per REGOLE/WIZARD/STARTERKIT: presa in carico della cartella (non toccarla).
  **STATO: informativa.**

### 2026-08-18 · STARTERKIT (nuova sessione) → TUTTE · La cartella «Starter Kit/» ha una sessione dedicata

Ordine dell'utente: da oggi lo Starter Kit è gestito da una **sessione AI dedicata** («STARTERKIT»),
che scrive SOLO dentro `Starter Kit/` (legge tutto, non tocca nulla fuori — salvo questo registro).
- La cartella passa quindi dalla competenza REGOLE alla sessione STARTERKIT; le decisioni fissate
  in `Starter Kit/DECISIONI_STARTERKIT.md` restano tutte valide.
- Anche PDF e `genkai-starter.zip` si costruiranno lì dentro; il caricamento su genkai.it
  si coordina qui sul registro (o lo ordina l'utente direttamente).
- Nulla da applicare per REGOLE/WIZARD/COMBATTIMENTO: è una presa in carico. **STATO: informativa.**


### 2026-08-16 · COMBATTIMENTO → REGOLE + WIZARD · Pistola: velocità d'uso 1 → 2

Decisione utente (sessione dedicata al solo `GENKAI_Combattimento.md`): la pistola usata **normalmente**
(in mano, non puntata) passa a **vel. uso 2** (era 1); **puntata** resta il *Sotto Tiro* già in regola
(velocità 0, iniziativa = dado basso puro). Estrazione 3, ricarica 4, danno 3: invariati.
Aggiornati in `GENKAI_Combattimento.md`: tabella armi, esempio dei tre scambi, esempio colpi multipli,
frase illustrativa delle velocità, riepilogo rapido (`3/2/4`).
**Da allineare da chi ha competenza sui file:**
- **REGOLE** — `pg/PG_01..05_*.md`: riga New Nambu M60 «vel. 3/1» → «**vel. 3/2**» (5 schede);
  `pg/genera_schede_pg.py` (stessa stringa nel dict) e DOCX/`SCHEDE_PG_TUTTE.docx` alla prossima rigenerazione.
  → **`SCHEDE_PG_TUTTE.docx` APPLICATO 2026-08-23 (sessione RICHIAMO, su richiesta utente)**: 5 occorrenze
  «vel. 3/1» → «vel. 3/2» nel DOCX (i .md e il generatore restano a carico di REGOLE).
- **WIZARD** — `Wizard/proposta_scheda/scheda-pg.html` (riga New Nambu 3/1);
  `Avventura Tanto Rumore/SCONTRO_FOGLIO_TAVOLO.docx` (foglio-tavolo del combattimento: verificare le velocità pistola).

**Aggiornamento 2026-08-17, stesso giro (sempre solo `GENKAI_Combattimento.md`):**
- **Colpi multipli riscritti (regola base)**: ora **un solo tiro di 2d6** per la sequenza; ogni colpo dopo
  il primo aggiunge di nuovo il tempo dell'arma (pistola: dado +2/+4/+6); malus fretta **+2/+3 a scalare
  −1 dal secondo colpo** (il primo traccia la traiettoria, se plausibile). Gli esiti dell'esempio validato
  in review restano identici (manca · 3 danni · 4 danni). → Se il foglio-tavolo Bakuon riporta i colpi
  multipli, va allineato anche lui.
- **Nuovo modulo avanzato opzionale «Fuori Tempo»** (tetto 9 dello scambio, sconfinamento con scarto,
  malus di velocità, mira che compra tempo, ricariche differenziate): vive SOLO nel manuale combattimento,
  nessun altro file lo riporta — informativa.
**Stato parziale 2026-08-17 (firmato WIZARD):**
- ✅ **WIZARD applicato**: `Wizard/proposta_scheda/scheda-pg.html` (New Nambu 3/1 → **3/2**) e
  `Avventura Tanto Rumore/SCONTRO_FOGLIO_TAVOLO.docx` **rigenerato** (pistola 3/2/4 + 0 puntata,
  nota velocità col manganello che batte la pistola in mano, colpi multipli riscritti con la regola
  nuova — un tiro solo, tempi +2/+4/+6, malus a scalare — esempio coi numeri del manuale).
- ⏳ **Resta a REGOLE**: `pg/PG_01..05_*.md` (riga New Nambu «vel. 3/1» → «3/2»),
  `pg/genera_schede_pg.py` e la rigenerazione di `SCHEDE_PG_TUTTE.docx`.

### 2026-08-16 · WIZARD → REGOLE · Nuova avventura «Bakuon — Tanto Rumore per Nulla» (ex «L'era glaciale del lavoro»)

Su ordine dell'utente, l'avventura del wizard è stata **rinominata «Bakuon — Tanto Rumore per Nulla»**
(bakuon 爆音 = il rombo delle moto; scelta utente in due passi nello stesso giorno: prima «Tanto Rumore», poi
titolo definitivo con sottotitolo) e ha ora la sua cartella: **`Avventura Tanto Rumore/`** (il nome-cartella
resta quello; struttura tipo Sake: `Storia Completa.md`,
`PNG/` 12 schede, `Location/` 5, `handout/` snapshot, `Token/`, `Immagini/`, dossier e stampabili).
- Fonte di verità: il **wizard** (caso `C3C15FF7…`, Titolo aggiornato nel DB — solo quella colonna, backup fatto);
  la cartella si rigenera con `esporta_da_wizard.py`.
- La vecchia `Wizard/era_glaciale_lancio/` non esiste più: contenuto spostato nella cartella avventura (storico compreso).
- **`GENKAI_Registro_Nomi.md` aggiornato**: sezione *Tanto Rumore* con i 12 nomi; controllo omonimie fatto, nessuna piena.
- Restano da compilare nel wizard 5 schede PNG (Aoki, Sugimoto, Yoshida, Tanaka Takayuki, Suzuki) e la deposizione di Matsui.
- **ANNO DEFINITIVO: 1997** (l'anno canonico GENKAI; in giornata si era passati per 1987 e 1984,
  tutto annullato ripartendo dal backup del caso originale). Date **+1 giorno** per salvare i giorni
  della settimana: il fatto è **sabato 24 maggio 1997**, giornali 25-27/5. Pocket bell coi codici
  goroawase RIPRISTINATO (nel 1997 è perfetto d'epoca); LANCIO con notizie vere del maggio 1997
  (Kabila, Deep Blue, Hong Kong, IVA 5%). Il 1997 chiude da solo: etichetta «kyoto-1997» ora esatta,
  età dei PG pregenerati giuste, moda anni '90 al suo posto. *Il Giudice* è aprile 1997: casi
  consecutivi della stessa squadra.
- Nulla da applicare lato REGOLE: è una segnalazione di esistenza/percorsi. **STATO: informativa.**

### 2026-08-14 · WIZARD → REGOLE · Tre ritocchi in `pg/` (ordine diretto dell'utente) + Word unico

Su ordine dell'utente, la sessione WIZARD ha toccato tre file di competenza REGOLE:
1. **`pg/PG_04_Sato_Yuki.md`** — «Tanaka Jiro» → «Tanaka **Jirō**» (macron, allineato al Kage_04);
2. **`pg/genera_schede_pg.py`** — stessa correzione nel dict di Sato (chi_sei);
3. **`pg/Kage/Kage_02_Honda_Ryota.md`** — titolo «Il Debito» → «**Il Gioco d'Azzardo**»
   (allineato al titolo del problema sulla scheda PG, scelta utente).
Creato inoltre **`pg/SCHEDE_PG_TUTTE.docx`** — le 5 ANTEPRIMA unite in un Word solo
(15 pagine, «Jirō» già corretto dentro): è il file su cui l'utente lavorerà visivamente.

**Resta a REGOLE**: quando rigenerate le ANTEPRIMA col generatore, la `ANTEPRIMA_Sato_Yuki.docx`
prenderà il macron da sola (il dict è già corretto). Nient'altro da fare.

**Stato: DA PRENDERE ATTO (le modifiche sono già applicate).**

---

## Fatte

### 2026-08-04 · REGOLE → WIZARD · Ki massimo: l'1 si ritira sempre — manuali allineati al wizard

Decisione utente sulla discrepanza tra manuali e fotografia qui sotto: vale la versione del wizard —
**l'1 si ritira sempre, anche più volte** (i manuali dicevano «una sola volta»). Corretti: Regolamento,
Manuale Giocatori, Briefing, le 5 schede PG (.md + generatore + DOCX rigenerate) e `Wizard/creazione_pg_brief.md`.
Il reroll dell'1 nel recupero notturno (soroban) era già senza limite: invariato.

**Stato: NON SERVE (il wizard lo implementa già così).**

### 2026-08-04 · WIZARD → REGOLE · Punto di partenza: cosa i programmi danno già per vero

Non è una modifica: è la fotografia delle regole **già scritte dentro i wizard**. Se una di queste
cambia nei manuali, va segnata qui sopra, perché il codice va corretto a mano.

| Regola | Come è implementata nel wizard PG |
|---|---|
| Attributi | sei (Distacco, Pazienza, Silenzio, Lucidità, Ascolto, Presenza), partono da 4, **9 punti** da distribuire, tetto 9 |
| Ki massimo | attributo più basso **+ il più alto di 2d6**; l'**1 si ritira sempre**, anche più volte; tetto 12 |
| Genkai | crollo a **Ki ≤ 3** |
| Gou | **uno solo** su 21; requisito di attributo dove previsto (verificato e revocato se l'attributo scende); costo **sempre per intero**; si attiva solo restando a Ki ≥ 1; raddoppia a ogni uso, una notte lo riduce di un grado |
| Senmon | **Lotta 1 d'accademia a tutti** + **una** a scelta di grado 1 — oppure Lotta portata a 2 (serve Presenza ≥ 6). Altre solo con lo Shugyō |
| Shugyō | attributo = nuovo valore ×3 (tetto 9) · Ki = nuovo massimo ×4 (tetto 12) · Senmon nuova 9 · G2 19 (attributo chiave ≥ 6 + 10 usi) · G3 39 (25 usi + paletti) · Enja 12 · affinare il Gou = costo attuale ×11, una volta sola |
| Nasake | il punto che non si spreca: si riempie solo quando un bonus da 2 o 3 andrebbe perso; **max 1**; **si dona a un compagno**, non si usa su di sé; a fine sessione si perde |
| Kage | definito alla creazione (problema + PNG), catalogo di 15 archetipi come spunto; **le meccaniche GM non compaiono** |
| Enja | il primo lo assegna il GM, cerchia stretta; l'**En** segnato è quello che il PNG ha **verso il PG**, di norma +1/+2 |

**Stato: nessuna azione richiesta.** Serve come riferimento alla sessione REGOLE.

---

### 2026-08-02 · WIZARD → REGOLE · Il Nasake era scritto sbagliato (già corretto)

Nel wizard PG il Nasake era descritto come «riserva di compassione che si riempie con un atto di
vera compassione e si spende come 1 Ki». **Sbagliato**: il `GENKAI_Regolamento_v1_3.md` dice che
si riempie solo quando un bonus da Kiwami/Nami andrebbe perso, e che **si dona a un altro PG**.
Corretto nel wizard il 2026-08-02.

**Stato: APPLICATO (wizard).** Da controllare che il testo giusto sia anche in tutti i manuali
e nelle schede PG.
