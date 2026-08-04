# Registro delle modifiche — fra la sessione REGOLE e la sessione WIZARD

> Qui si scrive **solo ciò che l'altra sessione deve sapere**: una regola cambiata, un valore,
> un costo, un nome, un testo che compare anche nei programmi.
> **Le righe nuove vanno in cima.** Chi applica una modifica la segna come fatta e firma.
>
> Formato: `data · CHI → CHI · cosa è cambiato · dove` — poi lo stato.
> Stati: **DA APPLICARE** · **APPLICATO** (con data) · **NON SERVE** (con il perché).

---

## Da applicare

*(nessuna voce in sospeso)*

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
