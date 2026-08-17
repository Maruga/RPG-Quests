# Controllo dell'avventura — 11-13 agosto 2026 (storico)

> Spostato qui da `LANCIO.md` il 2026-08-16. È il registro dell'audit: contraddizioni trovate,
> decisioni prese, buchi. Le date citate sono state riallineate alla linea temporale 1997.
> Le cose ancora aperte vivono in `../MEMORY.md` (e il wizard le segnala alla schermata 15).

## 3. Controllo dell'avventura — cosa è emerso (2026-08-11)

**L'impianto regge**: il caso si risolve per più strade convergenti (autopsia → Ishida →
Chiba → Yumiko → Noriko → kōban → tabulato del pocket bell). Tutti i 14 allegati e i 6
ritratti esistono su disco. Il tabulato è il pezzo migliore: due voci sullo stesso
cercapersone, quella tenera dallo SnakUp e da Nakagyō, quella che minaccia dalle cabine
di Kamigyō e Kita.

### Contraddizioni da correggere
1. **Il «capo» sbagliato** — evento 11/05/1997 alla Sede Banda: «Tanaka Takayuki avvisa
   *il capo Suzuki Nobuyuki*». Suzuki è il capo del **kōban** (polizia, 46 anni); il capo
   della banda è **Matsui Kenta**. Anche i partecipanti dell'evento puntano a Suzuki.
2. ~~Il padre registrato come madre~~ — **RISOLTA (2026-08-12, decisione utente: è LA MADRE).**
   La lettura era al contrario: ritratto, schede e deposizioni la trattano tutte da madre;
   l'unico testo difforme era il giornale. Corretto il giornale nel wizard («ha detto la madre»,
   «il ragazzo le aveva detto»); backup e diff in `storico/`. **Resta da decidere il nome**:
   Yasuhiro (康弘) è un nome maschile — rinomina col Registro Nomi, decide l'utente.
3. **Due giornali diversi** — il calendario cita «Kyoto Shinbun, 25 maggio, pagina 3»,
   l'handout è «Rakuyō Shinbun, lunedì 26 maggio».
4. **Titolo del tabulato** — «dal 1 Febbraio al **23 aprile**», ma dentro il periodo è
   01/02 → **24/05**, e i messaggi decisivi sono quelli di maggio.
5. **Età di Ishida** — 48 in anagrafica, «sessantenne» nel giornale.
6. **Titolo handout giornale** «del 25/05», contenuto datato lunedì 26 maggio (corretto:
   delitto sabato 24, fiori domenica 25, articolo lunedì 26).
7. **Ambientazione** impostata su «kyoto-1997», eventi datati 1997.

**Stato al 2026-08-13 pomeriggio** (lo storico sopra resta com'era):
- **1 RISOLTA dall'utente** — l'evento dell'11/05 ora dice «avvisa il capo Matsui Kenta, che
  incarica il suo braccio destro Sugimoto Hideki»; Suzuki fuori dai partecipanti.
- **2 (alibi di Chiba nell'evento del fatto) RISOLTA dall'utente** — allineata a scheda e giornale.
- **3+6 RISOLTE (opzione A, decisione utente)** — due giornali veri: «Giornale del 25/05» =
  trafiletto Kyoto Shinbun pag. 3 (scritto ex novo, fatti dal calendario, poi **integrato in una
  pagina 3 completa**: asta del tè di Uji, brevi, meteo coerente col Rakuyō, pubblicità);
  «Giornale del 26/05» = il pezzo grande Rakuyō (spostato); nuovo «Giornale del 27/05» con la
  descrizione utente della pista bande rivali, da scrivere. Calendario e deposizione di Yumiko
  intatti. Fix CSS: i titoli `h2` dei giornali senza barretta rossa da dossier.
- **4 RISOLTA** — titolo tabulato: «1 febbraio · 24 maggio 1997».
- **5 CHIUSA: SI TIENE (decisione utente)** — «sessantenne» resta: il giornale sbaglia,
  il mondo può sbagliare. Non riproporre.
- **Noriko fonte del covo RISOLTA** — versione parziale sulla fonte: «Sa solo la zona: i
  capannoni di Murasakino, a Kita-ku» (scheda intatta, 2 fonti salve, combacia col tabulato).
  Nel wizard: fonte con versione scritta = niente più segnalazione ❓.
- **Domande sciolte dall'utente (2026-08-13)**:
  · **Kōban**: sta nel territorio della banda, VOLUTO → rinominato «Kōban di Kamigyō» ovunque
    (gruppo, relazione di Suzuki, tracce dell'11/05 e del fatto, titolo handout del magazzino);
    la traccia dell'11/05 ora dice «notato dal kōban di Kamigyō», non più «dal distretto».
  · **Aoki**: stessa età di Yuta → **21** (era 18); «Compagno di classe» ora torna.
  · **Noriko**: resta 19 — «compagna di scuola» = stesso **complesso scolastico** con più
    scuole (decisione utente); i testi esistenti («è della sua stessa scuola») già combaciano.
- Aperta solo: **etichetta cornice** «kyoto-1997» con eventi 1997 (cosmetica).
- **Handout completati per la stampa (2026-08-13 sera, decisioni utente)**:
  · **Giornale del 27/05 SCRITTO** — Rakuyō di martedì, la falsa pista del «regolamento di
    conti» (fonti anonime, voci sui «certi giri» = il problema-falsa-pista già nel caso,
    la madre che respinge, la polizia che frena; firma Ikehata come il pezzo del 25).
  · **«Foto Polizia del Capo Banda» ELIMINATO** (scelta utente: niente foto).
  · **Deposizione di Yumiko SCRITTA** — costruita parola per parola dal suo «cosa sa»
    (Noriko, «in classe con lui c'è Aoki», la madre che non sapeva, «parlate con Noriko»).
  · Nel wizard: **👁 Stampa sulle deposizioni marcate 📄** — verbale impaginato del distretto
    (carta intestata, dichiarante, data/luogo in bianco per il GM, firma), stampabile
    dall'anteprima come ogni altro handout.

### Buchi da riempire

> **Dal 2026-08-12 il wizard li segnala da solo**: schermata 15, pannello «Mancanze e
> segnalazioni», ognuno col pulsante che porta al punto giusto (fai la scheda / scrivi
> l'handout / apri la deposizione). L'elenco sotto resta come storico.
- **Matsui Kenta non ha deposizione** (è il colpevole, lo interrogheranno).
- **Sei personaggi senza scheda**, due pesanti: **Suzuki Nobuyuki** (capo kōban, fonte di
  *entrambe* le informazioni essenziali) e **Sugimoto Hideki** (braccio destro). Poi
  Tanaka Takayuki, Yoshida Yukio, Aoki Hideki, e la vittima.
- **«Foto Polizia del Capo Banda» è vuoto** — zero testo, nessun allegato. È il perno del
  riconoscimento fotografico: senza, Ishida e Chiba non hanno cosa riconoscere.
- **«Giornale del 26/05/1997» vuoto** (doveva spingere la pista del regolamento fra bande).
- **Deposizione di Shimada Yumiko vuota** ma marcata come handout: stamperà un foglio bianco.
- **Calendario con un solo giorno.**
- **Fonte in tensione**: l'ubicazione del covo ha come fonti il kōban e **Watanabe Noriko**,
  ma la sua scheda dice «non conosce il covo, sa la zona ma non di più».

### Da tenere presente per la serata
Lo **Starter Kit non ha il combattimento**, mentre la scheda di Matsui dice che preferisce
morire piuttosto che arrendersi. Se la serata finisce lì serve il modulo dello Scontro del
gioco completo, oppure si chiude in narrativa.
