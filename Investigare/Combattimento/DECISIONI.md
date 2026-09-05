# Combattimento v3 — decisioni di design (IN LAVORAZIONE)

Fonte: `Simulazione.xlsx` dell'utente + decisioni in sessione (2026-09-03/04).
Il canone in vigore resta `../GENKAI_Combattimento.md` (v2) finché questo design non è chiuso.

## DECISO

- **Fasi**: iniziativa → azioni. Azioni: **Attaccare · Muoversi · Difendersi**.
- **Iniziativa**: 2d6 + modificatore da Presenza (tabella: 4→+2 · 5→+1 · 6→0 · 7→−1 · 8→−2 · 9→−3 · 10→−4)
  + **velocità dell'arma** (2026-09-04: va sommata — nella simulazione mancava). **Totale basso agisce prima.**
- **Attacco**: 2d6 ≤ attributo dell'arma → colpito (**sotto O UGUALE**, corretto 2026-09-04 — la formula
  excel del danno va adeguata: pari = colpito, scarto 0, danno = solo arma). **Scarto = attributo − tiro;**
  **danno totale = scarto + danno arma** (lo scarto è la precisione).
- **Mira**: fino a +3 all'iniziativa ↔ −1:1 al tiro d'attacco.
- **Chi attacca NON ha il tiro di difesa** in quello scambio (restano sempre assorbimento e copertura).
- **Chi viene colpito perde l'azione** (canone v2 mantenuto).
- **Difesa attiva** (azione Difendersi): tiro sull'**attributo di difesa dell'arma attaccante**
  (pistola→Distacco · keibō→Ascolto · lotta→Pazienza — profili per-arma RECUPERATI, decisione 2026-09-04);
  lo scarto di difesa si sottrae al danno, più assorbimento e copertura.
- **Spesa Ki in difesa** (2026-09-04): **massimo 1 Ki per scambio → −2 al tiro di difesa**;
  si dichiara **PRIMA di tirare**; consentita **solo restando a Ki ≥ 1 dopo la spesa** (serve Ki ≥ 2:
  in combattimento Ki 0 = morto, canone v2 — nessuno si uccide parando).
- **Distanza** (armi da fuoco): −1 ravvicinato · 0 normale · +1 lontano.
- **Armi** (da Simulazione.xlsx — colonne: Estrarre / Colpire / Ricarica):
  | Arma | Attacco su | Difesa su | Estrarre | Colpire | Ricarica | Danno |
  |---|---|---|---|---|---|---|
  | Pistola | Lucidità | Distacco | 4 | 2 | 5 | 4 |
  | Keibō | Silenzio | Ascolto | 2 | 2 | 0 | 2 |
  | Lotta | Presenza | Pazienza | 1 | 1 | 0 | 1 |
- Nota excel: `RANDBETWEEN(2,6)` è un refuso — i dadi sono sempre 1-6.
- **Critici nel nucleo v3** (2026-09-04, «importante» per l'utente): **1+1** = +1d6 danni in attacco,
  **+1d6 parato** sul tiro di difesa; **6+6** in attacco = mancato + **1d6 sulla tabella imprevisti**
  (colonne armi da fuoco / corpo a corpo / movimento — nel manuale v3); in difesa il 12 è solo
  una difesa fallita, nessun imprevisto.

- **UKEMI 受け身 — conversione in difesa** (2026-09-04): se vieni attaccato PRIMA di aver agito puoi convertire
  la tua azione in difesa (tiro di difesa, anche con Ki dichiarato prima) — ma l'azione è spesa.
  Chi ha GIÀ agito non converte: solo assorbimento e copertura. Vale contro UN attacco.
  Numeri: convertire sempre alza la sopravvivenza ~87%→90% (paga ma costa l'azione — bilanciata).
  **TIMING (2026-09-04): ALLA CIECA** — si decide PRIMA che l'attaccante tiri (sai che il colpo
  arriva, non quanto è preciso). Vedere il tiro e poi decidere = scartato («irreale, è come sapere
  quanto mi farà male il colpo»). Se rifiuti e arriva un altro attacco, la scelta si ripropone.
  Nome deciso 2026-09-05: **UKEMI 受け身** (vedi sopra).
- **TAME 溜め** (nome deciso 2026-09-05) = il +X iniziativa ↔ −X attacco nello stesso scambio (max 3).
  NON chiamarlo «mira»: MIRARE resta la manovra-azione della v2 (sistemata in v3: azione intera,
  −1/scambio max −2, fermi, poi spari a velocità 0).
- **Manuale v3 BOZZA 2 = INTEGRALE**: tutto il contenuto v2 è dentro, sistemato (manovre, sorpresa,
  zone, colpi multipli, soppressione, granata in tabella armi, fumogeno, Stringere i Denti, PNG,
  Senmon, dopo-scontro, conseguenze, riepilogo). Restano marcate [da validare] le trasposizioni:
  soglia Opportunità (5+), +3 sotto soppressione, granata difesa su Lucidità, parità=simultanei.

- **Armi ampliate (2026-09-05, [da validare])**: tabella completa nel manuale bozza 3 e nella
  Scheda Giocatori. Logica difese per famiglie (generalizza le 3 decise): fuoco→Distacco ·
  corto/mani→Pazienza · lungo→Ascolto. Nuove °: Automatica 9mm (3/2/4 d4), Compatta (2/1/4 d3),
  Mitraglietta (4/2/5 d4), Mazza (2/2 d3), Katana (3/2 d3). Riusate v2: fucile, precisione,
  coltello, improvvisata. Revolver d'ordinanza = la Pistola base decisa.
- **`Scheda_Giocatori_Combattimento.html`** (2026-09-05): riferimento da tavolo per i giocatori,
  2 pagine A4 stampabili — sequenza, Ukemi/Tame, formule, critici, 13 armi, esempi dal playtest.
  Derivata dal manuale: se il manuale cambia, aggiornarla.
- **PROSSIMI LAVORI (richiesti dall'utente 2026-09-05)**: 1) RIFARE il simulatore in chiave
  INTERATTIVA — quello attuale «non ha nulla di interattivo» per l'utente: serve un'esperienza
  giocata (narrazione, scelte, dadi in scena), non un pannello tecnico; 2) inserire il
  combattimento così ottenuto nella MINI-AVVENTURA del sito (sito_genkai/provalo/).

- **`Scena_Combattimento_Interattiva.html`** (2026-09-05): la simulazione GIOCATA richiesta
  dall'utente — fiction del mini-caso (cucina, nipote col coltello, collega), motore v3 completo:
  dichiarazioni a bottoni, iniziativa coi dadi animati e la scomposizione, UKEMI ALLA CIECA come
  scelta drammatica, Tame, Ki in difesa, critici con tabella, epiloghi (arresto / morte a Ki 0 /
  avviso Genkai). Playtest automatico: il PG demo (Silenzio 5, Pazienza 5, Presenza 4) da solo
  MUORE quasi sempre → scelte da GM della scena (non regole): il collega è IN CAMPO dal 1° scambio
  e il nipote DIVIDE gli attacchi tra i due. Tuning finale: dell'utente, giocando.
  Prossimo passo: innesto nella mini-avventura sito_genkai/provalo/ come scena 8.

- **KI PER TUTTI (utente, 2026-09-05, netto)**: la «Riserva» dei PNG — termine della v2
  («I PNG nello Scontro», 3/6/9) e del wizard casi — è **ABOLITA**: si chiama **Ki per chiunque**,
  taglie 3/6/9 (comparsa/duro/professionista). Resta la differenza d'esito: PNG a Ki 0 = fuori
  combattimento, PG a Ki 0 = morto. NON riusare mai la parola Riserva.
  ⚠ TODO WIZARD: il wizard casi genera «Riserva 3/6/9» nelle statistiche PNG → rinominare in Ki
  (UI + prompt + export); anche il dossier Bakuon la usa. Da fare in sessione wizard.

## APERTI (non decisi — non inventare)

- ✔ NOMI DECISI (utente, 2026-09-05): **UKEMI 受け身** = l'azione che diventa difesa («vado in difensiva, in Ukemi») · **TAME 溜め** = la carica, +iniziativa ↔ −tiro («trattengo il fiato, in Tame»). «Conversione» e «prendere il tempo» sono nomi MORTI: non riusarli.

- **Specializzazioni che cambiano il profilo di difesa** (idea utente: «uno può scegliere altri profili
  per difendersi» — si vedrà poi).
- Stallo tra due che si difendono entrambi (regola anti-attrito o discrezione GM?).
- Critici (2/12) e Soroban in combattimento (dubbio già nel REGISTRO_MODIFICHE 2026-09-01).
- Muoversi: il «piccolo movimento + attacco» ha un malus?
- Numeri delle probabilità di riferimento: attacco su 5→28% · 6→42% · 7→58% · 8→72%;
  1 Ki in difesa ≈ 1,5 danni parati in media (conviene contro armi grosse).
- La scena di combattimento della demo `sito_genkai/provalo/` si ricostruirà su QUESTO sistema
  quando sarà chiuso.
