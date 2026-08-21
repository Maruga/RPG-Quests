# CLAUDE.md — Avventura «Richiamo» (Uminari)

**Sessione dedicata a questa avventura** (come STARTERKIT per lo Starter Kit): lavora SOLO dentro
`Avventura Richiamo/` — legge tutto il vault, non tocca nulla fuori salvo `GENKAI_Registro_Nomi.md`
e `REGISTRO_MODIFICHE.md`. Dichiararlo all'utente alla prima risposta. Valgono le REGOLE FERREE
di `Investigare/CLAUDE.md`: non inventare, non riaprire il chiuso, leggere i registri prima di toccare.

> **ENTRA DA QUI: `SCHEMA.md`** — l'indice di controllo (file, decisioni chiuse, linea maestra,
> proposte aperte, da-fare). Aggiornarlo a ogni decisione nuova.

## Cos'è

Avventura kaijū per GENKAI, **fuori dal normale di proposito**: dimostra che le regole dello scontro
(e in generale il sistema) reggono anche qui. Una creatura di 50 m — **Uminari** — attraversa il Kantō
seguendo un richiamo a infrasuoni, 12–14 novembre 1986, destinazione la centrale di Tōkai Daini.
I PG (poliziotti, New Nambu M60) non devono ucciderla: devono **capire il segnale e spegnerlo**.
Punto voluto dall'utente: **gli indizi per destinazione, punti deboli, catena degli emettitori
vanno DATI ai giocatori** — la rete multi-fonte è il cuore (Sviluppo §3).

## File e gerarchia delle fonti

| File | Stato |
|---|---|
| `kaiju-design.md` | **canone** — design v0.1 dell'utente. Non riscriverlo: si integra dallo sviluppo |
| `telegiornale-uminari.md` | **canone** — 3 edizioni TG (NKB, Morikawa/Kobayashi), handout pronti |
| `Immagini/` | Copertina (apertura) + 2 Foto Aeree (handout briefing JSDF, Notte 1) |
| `RICHIAMO_Sviluppo.md` | **v0.2, PROPOSTA** — niente è canone finché l'utente non conferma §0 e §10 |

Se sviluppo e design divergono, **vince il design** (finché l'utente non decide altrimenti).

## Regole di sistema usate

- Scontro: `GENKAI_Combattimento.md` **v2.1** — pistola 3/2/4 (aggiornata 2026-08-16), colpi multipli
  a tiro unico, Fuori Tempo opzionale (ricarica revolver = operazione lunga: New Nambu, 5 colpi).
- Fuori scontro (proposta #7): tiri standard 2d6 ≤ attributo + pressioni che costano Ki;
  **niente Gou/Kage/Enja/soroban** in questa one-shot.
- Nomi nuovi: SEMPRE prima `GENKAI_Registro_Nomi.md` (sezione *Richiamo* creata il 2026-08-19).

## Stato dei lavori (aggiornare a ogni sessione)

- **2026-08-19** — letto tutto il materiale; scritto `RICHIAMO_Sviluppo.md` v0.2: aggancio (squadra
  di Senju), rete indizi F1–F7, catena emettitori (14 coppie + ED + EX col timer 09:40), Comitato
  (proposta Ōtsuka/Sakuragi), scontri S1–S5 + infiltrazione EX, scaletta, geometria dei finali.
  Registro nomi e registro modifiche aggiornati.
- **2026-08-19 (notte) — DECISIONI UTENTE (in fila)**: ① **altezza 120 m** (canone; design §3.2
  riderivato con Froude 0,08, marcia e 55 km/g invariati) → creata **`SCHEDA_UMINARI.md`**
  (dimensioni, fisiologia, punti deboli, fasce di distanza, percorso, 12 prompt immagini);
  ② **PERCORSO TOTALE nuovo** (agg. 19/08 mattina): origine **Madara-shima** — avvistamento
  **insabbiato**, poi riapparizione sulle rive della centrale di Genkai — quindi 8 centrali fino
  a **Kashiwazaki-Kariwa (META FINALE; Tomari TOLTA)**. ~960 km ortodromici / ~1.130 di costa
  (scheda §10, con «punto zero» Madara). Le parti di Sviluppo cucite su Tokyo→Tōkai = modello
  di tappa, da rimappare; aggancio di Senju superato (candidato: polizia di Karatsu/Chinzei,
  da decidere). Prompt: P7 riapparizione, P9→Niigata, nuovo P13 «foto sequestrata».
  ③ **La scia** definita su domanda utente → scheda §9 (v1.1): Solco/tamburo/sintomi, terra e
  mare, tabella «leggere la scia»; gli incendi delle foto = condotte del gas dopo il passaggio.
  ④ **La centrale di Genkai viene DISTRUTTA al passaggio** (decisione utente): scritta
  `PRESENTAZIONE_WhatsApp.md` — gōgai del «Genkai Shimpō 玄海新報» (testata inventata), data
  proposta gio 6/11/1986 (distruzione mer 5 all'alba, ~06:51), 22 dispersi del turno di notte,
  accusa d'insabbiamento in prima pagina, battesimo «Uminari». Gioco di parole 玄海/限界.
  ⑤ **«Quello che si sa» fissato dalle mappe utente** (salvate: `Immagini/Mappa_01_Genkai_largo.png`
  + `Mappa_02_Genkai_V.png`): la **V di Genkai** — dentro dal mare a ponente, attraverso il
  promontorio (tutto distrutto nel corridoio), fuori a levante-nordest, POI SPARITA. All'apertura
  il mondo non sa né dov'è né dove riemergerà: la rotta delle 8 centrali è verità del GM.
  Gōgai allineato (niente sosta notturna a terra, «potrebbe essere ovunque»).
  ⑥ **Regola notturna estesa (decisione utente)**: di notte si ferma ANCHE IN MARE, adagiata sul
  fondale (stare sott'acqua non le costa nulla) → in mare ~150 km/giorno (15 km/h × 10 h).
  **Itinerario non contrastato (scheda §10): ~9,5 giorni, sbarco a Kashiwazaki alla DECIMA ALBA**
  — con partenza 5/11 il finale cade il 14/11 e il 15/11 il Mihara erutta davvero (l'ancora del
  design torna da sola). Creata `COPERTINA.md` (copertina + gōgai + tagline); copiato
  `centrali-giappone-1990.csv` (FONTE coordinate: Madara 33,581/129,744 → ~11 km dalla centrale;
  ATTENZIONE: il CSV è stato-1990, in scheda resta lo stato-1986).
  ⑦ **Vulcano segnato**: Monte Mihara, Izu Ōshima — 34.7244/139.3944 (scheda §10 «Fuori rotta»:
  ~310-330 km dalla rotta, eruzione vera 15/11 17:25, gancio proposto del secondo dormiente).
  Creato **`punti-mappa-avventura.csv`** (Madara + 8 tappe + vulcano, con date e ruoli, schema del
  CSV utente, pronto per Google My Maps); `centrali-giappone-1990.csv` resta intatto come fonte.
  **PROSSIMO PASSO dichiarato dall'utente: «prepariamo avventura»** (struttura sulle tappe).
  ⑮ **RISPOSTA DELLO STATO + MEZZI PG salvati in STORIA** (2026-08-20, «salva tutto» utente):
  timeline 5/11 (prefettura entro 1h → comando avanzato Karatsu 09-11 → interforze pomeriggio →
  QG Tokyo la sera → dal g.2-3 comando MOBILE che segue la bestia = casa viaggiante dei PG);
  mezzi: eli ~200 km/h (30/100/200 km in 10/30/60 min; notte quasi a terra, VFR 1986), auto
  statale ~60 km/h (autostrada ~100, costa senza autostrada continua), tokkyū ~100 e viaggia di
  notte. Regola pollice: 1 giorno di Nushi = 36 min di eli / 2h d'auto — il problema non è
  raggiungere, è arrivare con le 3-4 h di lavoro davanti.
  ⑳ **BOLLETTINI.md (utente) VERIFICATI = CANONE EVENTI (2026-08-20)**: 8 bollettini 09/21, km e
  coordinate ✓ ESATTI sul CSV (35/179/323/467/611/755/899/959,5), orari centrali ✓ (Takahama 08:49,
  Ohi 09:56, Mihama 12:43, Tsuruga 13:20, KK 14:03). FATTI NUOVI recepiti: **Shimane IGNORATA**
  (→ niente faro lì: 2° faro = Takahama), **cedimenti RITARDATI** via rete-40km+diesel (+2/+28h,
  KK unica azione diretta: immobile 2h37 → 50′ → mare → sparita 18:20), **contaminazione della
  bestia dal 3d 15:10** (sorgente mobile, <2 km = sola andata → fasce §8 limitate ai gg 1-3,
  piano-B saturazione morto), tamburo M4,2-4,8/200 km, bollettino giocatori 2×/g. Proposta nuova:
  la deviazione di Fukuchiyama = COLLAUDO del dispositivo al capannone (indizio verso Maizuru).
  ㉜ **LA SCRITTA DEI CAMIONCINI spiegata e messa in INDIZI 1 (2026-08-21)**: 共成設備工業
  Kyōsei Setsubi Kōgyō = «Impianti Industriali Kyōsei» (共成 = realizzare insieme — nome
  anonimo perfetto). DOPPIO FONDO (proposta GM): all'orecchio «kyōsei» = omofono di 共生
  SIMBIOSI e 強制 COERCIZIONE — la firma nascosta della Ryūgū-kai (che ama i giochi di parole:
  竜宮会, 玄海/限界); non è una prova, è il brivido. Prompt F1 aggiornato con la scritta esatta.
  NB: SCHEMA.md modificato dall'utente su disco (aggiunto link Google My Maps in testa) — ok.
  ㉛ **CAPANNONE — COORDINATE UTENTE DEFINITIVE (2026-08-20): 35.4526 / 135.31553** (sponda ovest
  baia di Maizuru; le mie stime precedenti erano sbagliate — cadevano nell'entroterra). Distanze
  ricalcolate: **~7 km dalla Sala 2** (era «5-6»), **~2 km dal passaggio del 3d** (~07:15; era
  «0,9») → trema, perde i vetri, resta in piedi. Aggiornati: CSV punti, INDIZI 3, STORIA,
  SCONTRI §3, header mappa A3, SCHEMA §5.4.
  ㉚ **CONSEGNA v2 — IL TUNNEL NEL FUMO (canone utente 2026-08-20, sostituisce il branco)**:
  ~~8 camion identici + svincoli~~ TOLTI. Scena nuova: il gemello ASPETTA PARCHEGGIATO **sotto il
  ponticello di Habara** (coordinate UTENTE: 35°41'40.2"N 136°07'10.0"E = **35.6945/136.1194**,
  foto satellitare vista) → i due camion partono insieme → dentro il **traforo di Tsuruga**
  scatta il MEGA FUMOGENO (fumo da davanti e dietro, dai due portali) → nel casino **CAMBIANO
  IL TELO** (e targhe) → escono; **i PG fanno TIRI per capire/osservare** (tabella in INDIZI 2:
  cronometro, dettagli mezzo, radio CB; fermare l'esca = 30-60′ persi). Trasmettitore: % invariate,
  sul TELAIO sopravvive allo scambio-teloni (nel telo = segue l'esca). SCONTRI §2 ri-ambientato
  (tunnel aperto, civili, fumo +3). CSV punti: +ponticello +traforo. SCHEMA #19 riscritta.
  ㉙ **CARTINA DEL CANTIERE = VIA FOTOGRAFICA (2026-08-20)**: la mappa SVG non piaceva («per
  niente simile alla foto») → si genera con GPT come FOTO AEREA VERTICALE in cornice-cartella
  (stile della reference). Le 3 foto GPT del capannone salvate in `Immagini/` come CANONE VISIVO
  (Capannone_aereo_cartella / dal_mare / cancello): gru a portale che CAVALCA il capannone, fronte
  sud a 3 aperture, uffici bianchi con scala esterna, chiatta di rottami, serbatoi fuori recinto.
  Nome sito emerso: **住吉浜 Sumiyoshihama** (da confermare). Prompt **C0 «cartina A3»** scritto
  in SCONTRI §3 (con timbro ridatato 13/11 Shōwa 61) e consegnato; regola: allegare SEMPRE
  l'aerea come reference. MAPPA_CAPANNONE_A3.html declassata a bozza di servizio.
  ㉘ **MAPPA RIFATTA v2 su correzioni utente (2026-08-20)**: la v1 aveva errori (gru sopra la
  struttura, cancello a sinistra invece che DAVANTI, mancava l'ingresso a 3 aperture, uffici
  senza porte/finestre, e non doveva avere le persone). v2 = SOLO LA MAPPA da mettere sul tavolo,
  piena pagina A3: cancello+sbarra ALLINEATO all'ingresso principale (3 aperture da 12 m, ante
  scorrevoli), gru a portale INTERAMENTE sulla banchina (binari propri), uffici con porte (N+E)
  e finestre + legenda simboli, chiatta al molo, semirimorchio «telonato» (niente spoiler),
  ZERO postazioni/note GM (le piazza l'utente). Verificata a schermo. Le postazioni GM restano
  solo in SCONTRI §3.
  ㉗ **MAPPA_CAPANNONE_A3.html creata (2026-08-20)** — mappa tattica DA TAVOLO del covo, A3
  orizzontale stampabile (stile cartella-bersaglio 1986, carta+inchiostro+matita rossa): pianta
  a zone (cancello/piazzale/uffici/capannone/banchina/gru), postazioni cerchiate G-C-M-M1-M2-K-P-R-T,
  coperture con Assorbe, note tattiche (quadro=buio, angolo morto della gru, 30′ antenna),
  inserti POSIZIONE ① baia di Maizuru (covo/sala2/passaggio mostro) e ② scambio oro (Maibara→
  traforo di Tsuruga ~35.71/136.12 PROPOSTA da fissare). Verificata nel browser (3 giri di fix
  collisioni). Stampa: Chrome → A3 orizzontale, margini 0, grafica di sfondo ON.
  **DECISIONE UTENTE: i PG = le 5 schede esistenti in `pg/`** (niente pregen nuovi; SCHEMA §5.2).
  ㉖ **Coordinate sale + capannone (2026-08-20, per la mappa utente)**: Sala 1 Karatsu est
  33.450/129.970 (municipio/palestra, g.1, poi retrovia) · Sala 2 Maizuru = comando JMSDF porto
  est/Kitasui 35.475/135.386 (verifica: la traiettoria CSV le passa a ~1,1-1,4 km = l'«1,4 km»
  dei bollettini ✓) · capannone porto OVEST ~35.4495/135.3330 (a ~0,9 km dal passaggio 3d:
  sopravvive per un pelo; CORRETTA la distanza covo-sala: ~5-6 km attraverso la baia, non 2 —
  fix in STORIA/INDIZI/SCONTRI). CSV punti-mappa: +3 righe (capannone marcato SOLO GM).
  ㉕ **Prompt capannone aggiunti (2026-08-20)** in SCONTRI §3: pacchetto-bersaglio stile
  ricognizione forze speciali — C1 verticale annotata (Nano Banana per i kanji), C2 dal mare
  (tele da barca), C3 dal cancello (tele da collina), C4 interno vano grande (semirimorchio
  telonato in fondo, soppalco, quadro elettrico), C5 interno uffici (archivio, mappa, cercapersone,
  casse dell'oro sfocate). C1 da generare per prima = reference di coerenza.
  ㉔ **BASI_MILITARI riscritta v2.0 (feedback utente: «tanta roba, nulla di utile; niente sigle
  senza spiegazione; solo cose essenziali da GDR»)**: ora è corta — armi in parole povere con
  effetto di gioco (cannone +1, bomba/missile/siluro +3, mina +2, sonar 0-ma-chiama), 5 basi
  una riga l'una (cosa DANNO ai PG), lista «cosa aiuta i PG» (boe-microfono = trovarla sempre
  + trovare il faro; detonatore controllato = scaricarla dove vogliono; giubbotti/radio a
  valvole/cecchino amico attr.7 R6 5/3/5 d5; eli; foto=handout) e **LA NAVE-ESCA** ⚑ (proposta,
  risposta a «un'arma che aiuti i PG?»): sonar attivo sulla frequenza del canto = faro
  galleggiante — 1 h di esca = 12 km fuori strada, regge 3-6 h, staccare prima dei 2 km;
  serve la registrazione (spettrogrammi o camion catturato); stessa fisica di fari/inibitore.
  LEZIONE PER ME: niente contesto storico-politico lungo, niente sigle nude — effetti di gioco.
  NB: arma-kaiju.md è stato riformattato su disco dall'utente (solo tabelle): non toccarlo.
  ㉓ **BASI MILITARI + gradazione deviazioni (2026-08-20)**: creato `BASI_MILITARI.md` (richiesta
  utente: le 5 basi su mappa servono in caso di ATTACCO — cosa hanno a disposizione). Tutto
  MARCATO [CANONE]/[STORIA-da-riverificare]/[PROPOSTA]: quadro giuridico 1986 (JSDF mai un colpo,
  soccorso-disastri senza fuoco; USA = scelta politica), tabella trappola-pazienza (uno strike
  vero = +24 = SCARICO: l'attacco è un detonatore), Tsuiki F-1/ASM-1 (~75 km g.1), Maizuru
  (sonar = sentire il canto; muore 3d 07:48 canone), Komatsu (⚠ dentro il raggio dell'impulso
  dello scarico montano, ~30-35 km), Iwakuni A-4 (martello USA), Misawa (F-16, P-3, Elephant
  Cage = orecchie SIGINT sulla Ryūgū-kai, proposta). Usi senza sparare + «detonatore controllato».
  **Gradazione deviazioni (canone utente)**: Karatsu = LIEVE piega dopo Genkai · Miyazu ERC =
  EVITAMENTO COMPLETO girandole attorno → scheda §6.2 e nastro aggiornati (il grado stesso è
  indizio). SCHEMA #26-bis. ⚠ Mancano ancora i CSV termoelettriche/basi (coordinate esatte).
  ㉒ **ARMA SEGRETA del kaiju (utente 2026-08-20) → salvata `arma-kaiju.md` (solo GM), CANONE**:
  pazienza 0-12 nascosta (sorgenti <2 km, radar tiro, colpi, ostruzioni; accerchiamento ×2;
  −1/10′ quiete) → a 12 SCARICA sempre: 40 secondi visibili → **M 6,9 + IMPULSO EM** (elettronica
  morta 25-60 km, eli giù, **nucleare entro 60 km = condannata subito**: Wakasa = 4 siti con uno
  scarico), poi 6 ore d'immunità. Verificata: matrice distanze Wakasa ESATTA, conteggio gabbia ok.
  Recepita in scheda v2.1 (§6 + Morsa a DUE OROLOGI: guasto 2d6 + pazienza) e SCHEMA #26.
  **Fix-list arma consegnata**: anno 1990→1986 (×3), gancio-Shimane superato (resta solo KK 2h37;
  la logica «freddo=muto» può spiegare perché le nucleari scrammate non deviano), «Takahama
  salvabile» da allineare a tutte-cadono, finestra scarico montano precisata (3d 19→4d 07),
  eccezione-richiamo (acustico, non irrita) + soglia potenza. **Proposte mie (SCHEMA §5.12-13)**:
  fari+dispositivo A VALVOLE (Ryūgū-kai sa dell'arma → il camion catturato a valvole nel 1986 =
  briciola per INDIZI 4); armonizzazione tre scale 15/2 km + Morsa.
  ㉑ **CHIARIMENTO GRANDE (utente 2026-08-20, con mappe)**: se non fermata **le distrugge TUTTE
  E OTTO** — il percorso passa per OGNI nucleare: **anche Shimane e Ōi cadono** (il «mistero di
  Shimane» e «Ōi salvabile» erano INVENZIONI dell'AI dei bollettini → in fix-list). **Unica
  deviazione = il fastidio delle TERMOELETTRICHE a ~15 km: le circumnaviga** — sulla rotta solo
  2 efficaci: **Karatsu (g.1)** e **Miyazu (g.3** = la deviazione di Tango, niente mistero**)**;
  altre 4 sulla mappa (Matsuura ×2, Shin-Kokura, Toyama Shinko) fuori raggio = leve potenziali
  (Morsa DA RITARARE su 15 km/centrali — banner in scheda §6). RITIRATA la mia proposta
  «deviazione = collaudo dispositivo». Nuovi layer mappa utente: termoelettriche-1990 e
  basi-militari-1990 (Tsuiki/Maizuru/Komatsu/Iwakuni/Misawa) — **CSV non ancora in cartella,
  chiesti i path**; chiesto anche: logica in-esercizio (nucleari scrammate non respingono?) e
  ruolo basi militari. Fix-list v2 consegnata. SCHEMA #24-25.
  **CORREZIONE UTENTE precedente: anche ŌI viene distrutta** («il bollettino aveva un problema»).
  ⚠ DA DECIDERE (utente): gōgai «cupole aperte come gusci» vs bollettini (nessun rilascio g.1);
  sala Maizuru inagibile 3d 07:48 (tenere = fortissimo / spostare); unità KK/Shimane = stato 1990
  nel sinottico (in 1986: KK 1 unità, Shimane 1); nits minori (83 ore, 90′ Mihama, 14 km/50′).
  ⑲ **NODO NOTTE SCIOLTO (utente 2026-08-20): SI MUOVE SEMPRE** — moto perpetuo H24, velocità
  unica, messa così apposta per il calcolo. **Verifica CSV fatta: 12,000 km/h ESATTI** (24,0 km/2h;
  959,5 km in 79h58; primo tratto 11 km in 55′; haversine a campione ok). Cascata applicata
  (scheda v2.0): §3 ectotermo→metabolismo costante («non dorme e non si ferma MAI»), §4 riscritto
  (bollettino delle ORE PARI, di notte bollettini diradati = finestra d'incertezza), §6 debolezze
  3-5 DECADUTE/a colore (notte, freddo, soste), §7 filtra in movimento, Morsa continua H24
  (azzera solo sciogliendola), STORIA regola-pollice (288 km/g: 1,5h eli / 5h auto; «la notte è
  SUA»), SCHEMA decisione #22 + §5.1 chiuso.
  ⑱ **CSV MARCATORI = NASTRO CANONE + Operazione Fumo + capannone Maizuru + 2ª sala (2026-08-20)**:
  `percorso-marcatori-2h.csv` (42 marcatori, km in ETTOMETRI, 12 km/h **H24**: Madara 1d 06:05 →
  Genkai 1d 07:00 → Shimane 2d ~13:15 → GIORNO NERO 3d 09:00-13:20 (5 cupole in 4h30) → **KK 4d
  14:03**, 80 ore totali). ⚠ **NODO APERTO: muove ANCHE DI NOTTE** vs canone «di notte si ferma» —
  bannerato in scheda §4, SCHEMA §5.1; date proposte **1d=11/11** (→ Mihara il 15; gōgai da
  ridatare al 12). **Consegna oro = MATTINA G2 (canone)**: «Operazione Fumo» in INDIZI 2 — 3 mld ¥/
  1,5 t (proposta), camion 4t imposto, branco di identici, fumo, 2 svincoli, scambio col gemello
  nei trafori di Tsuruga (proposta), trasmettitore: % scoperta 90/70/40 (−20 impulsi), se vivo
  porta AL CAPANNONE. **Capannone (canone: zona Wakasa/Maizuru, info+dispositivo)**: proposta ex
  cantiere demolizioni navali porto ovest Maizuru, a 2 km dalla 2ª SALA OPERATIVA (= comando
  distretto navale JMSDF, operativa mattina g2, in STORIA); SCONTRI §3 re-skin (gru=cecchino,
  soppalco=mitragliatore, via d'acqua, dispositivo su semirimorchio, oro e archivio negli uffici).
  STORIA timeline → puntatore a SCHEMA §3 (riscritta sul CSV); gōgai «alle 7 in punto»; CSV
  punti-mappa riorariato. La Stazione d'Ascolto è decaduta.
  ⑰ **SCONTRI.md creato (2026-08-20, richiesta utente)**: le 3 squadre su Shōtotsu v2.1 —
  §1 camion (4 uomini + variante capo-settore con LA MAPPA; i PG ne affrontano UNA — canone);
  §2 oro (5 uomini; il premio = IL CONTABILE vivo → luogo strumento; valvola carta nautica);
  §3 **Stazione d'Ascolto** = l'EDIFICIO dello strumento (scelta «edificio» dell'utente; identità
  ex posto d'ascolto Marina Imperiale, Kanazawa↔KK, proposta) — LA PIÙ DIFFICILE (canone): 8 uomini,
  cecchino (1° colpo al motore), mitragliatore nel corridoio, generatore/buio, sentiero scogliere
  di notte, capo con ordine di distruggere la console (valvola: riparabile 4-6 h), tecnico che si
  arrende. INDIZI ripulito dai doppioni (3 puntatori a SCONTRI). SCHEMA aggiornato (file, prop. 4,
  da-fare 5 fatto).
  ⑯ **RICONTROLLO + SCHEMA fatti (2026-08-20)**: creato **`SCHEMA.md`** (indice: 12 file con
  stato, 17 decisioni chiuse, linea maestra G−5→G10 con la colonna dei fari, 3 vie + leve,
  11 proposte aperte, 10 da-fare). Fix del ricontrollo: tolta la «stima 50 m» dalla scheda §1
  (v1.8 — era legata al vecchio TG); banner SUPERATO su `telegiornale-uminari.md` (da riscrivere;
  NKB e i 2 nomi restano); banner ARCHIVIO su `kaiju-design.md`. CLAUDE.md ora punta a SCHEMA.
  ⑭ **CATENA SEQUENZIALE (canone utente — corregge parte di ⑬)**: tutti posizionati, ma trasmette
  **UNO alla volta**; il primo era ALLA CENTRALE DI GENKAI; quando il faro attivo viene DISTRUTTO
  DAL MOSTRO (gli arriva addosso e lo calpesta), **gli operai del furgone successivo lo accendono
  A MANO**; **una volta acceso NON SI PUÒ SPEGNERE (per sicurezza)** — per zittirlo va demolito;
  l'unico interruttore della catena = lo strumento-inibitore (che COPRE, non spegne). Conseguenze
  scritte (interpretazioni da validare): faro demolito prima dello sbarco = centrale salvata, la
  catena si auto-ripara (il successivo si accende) → ogni camion ucciso = una centrale salva, la
  vittoria totale resta lo strumento; relitto del 1° faro nelle macerie di Genkai = primo reperto;
  ~una decina di camion (uno per bersaglio + riserve — in acqua il richiamo porta centinaia di
  km, scheda §5 agg.); finestra di captazione = tutta la tratta (ore→giorni), corsa = arrivare
  prima della bestia. Carico agg.: diesel+fusti, leva sotto sigillo a senso unico (F7 agg.).
  INDIZI v0.3, scheda v1.7.
  ⑬ **IL SEGNALE DEI CAMION (canone utente)** → INDIZI v0.2: un camion trasmette SOLO nel settore
  attivo davanti alla bestia (si accende ~5-6 h prima del passaggio — durata proposta — e tace a
  bestia passata: «finché il mostro non passa possono scoprirla»); **individuare + montare
  l'intervento = 3-4 ORE** (canone) coi furgoni radiogoniometrici del Min. Poste; il segnale
  **disturba sensibilmente radio locali/TV/apparecchi** (canone) = la mappa dei reclami (zona
  ~2-3 km, gratis; la triangolazione dà il punto). Corsa: finestra 5-6 h vs lavoro 3-4 h → si
  parte al primo reclamo. Sinergia Morsa: camion spostato = si riaccende = nuova finestra.
  ⑫ **LA MORSA (canone utente)**: scoperto il disturbo EM, la rete elettrica CONTROLLA la bestia —
  deviare/rallentare (−12 km/ansa, senza tiri) o **Morsa piena** (recinto di sorgenti ogni ~4 km,
  km del Nushi fermi; solo vicino a terra). **Tiro del guasto (canone: % oraria)**: ogni ora di
  Morsa 2d6 ≤ ore trascorse = guasto, si libera (0/3/8/17/28/42/58%... — regge in media 5-6 h);
  di notte si ripara, contatore all'alba da 1 (2-3 se rete provata). Proposte: contromossa
  Ryūgū-kai = spostare camioncini allo scoperto (occasione investigativa); **dilemma centrali**
  (accesa = scudo EM, ma lo scram protocollare abbassa lo scudo — a Genkai è andata così; parte
  del piano Ryūgū-kai) DA VALIDARE. Scheda §6 v1.6 + puntatore in STORIA.
  ⑪ **REGOLA DEL RIGHELLO (decisione utente)**: velocità UNICA terra/mare; taratura proposta
  **120 km/giorno di luce = 12 km/ora di luce** (mantiene lo sbarco al 14/11; a 150 anticiperebbe
  al 12). Metodo: tacche da 120 km (G1-G10), di NOTTE è sulla tacca del giorno, di giorno = ore
  di luce ×12 («a mezzogiorno mezza tacca»), il GM traccia solo «i km del Nushi», rituale del
  «bollettino del tramonto» (puntina a ogni tramonto = bollettino TV). Scheda §4 riscritta,
  §10 = «Il nastro del Nushi» (km 0 Genkai → 1.120 KK, orari nuovi: Shimane 8/11 ~12:20;
  Takahama+Ōi pomeriggio del 10; Mihama+Fugen+Tsuruga mattina dell'11; G9 fermo a 40 km;
  sbarco 14/11 ~09:50). CSV punti-mappa allineato. Vecchie velocità terra/mare = colore.
  ⑩ **NOMI scelti dall'utente (2026-08-19)**: organizzazione = **Ryūgū-kai** 竜宮会 («Società del
  Palazzo del Drago» — la maschera con cui firma; l'identità vera resta ignota); mostro =
  **Nushi** 主 («il Padrone»). Soluzione a strati applicata (reversibile): *il Nushi* = la cosa,
  *l'uminari* = la parola dei pescatori per il suo rombo → l'indizio-del-nome sopravvive con
  entrambe. Aggiornati: scheda (titolo NUSHI, riga Nome, letti del Nushi, §10), STORIA, INDIZI
  (firma della richiesta), gōgai in PRESENTAZIONE + COPERTINA. Il FILE scheda resta
  `SCHEDA_UMINARI.md` (nome valido: uminari sopravvive come strato; evita di rompere i rimandi).
  ⑨ **LA STORIA dettata dall'utente → `STORIA.md` (CANONE)**: organizzazione criminale ANONIMA,
  **mai identificata** — né come/dove abbia risvegliato la creatura («regola del buio»: si ferma
  il mostro, NON si chiude il caso) → **proposta Comitato/Ōtsuka SUPERATA** (registro nomi
  aggiornato: Ōtsuka/Sakuragi/Semba decaduti; Hoshino/Nagashima/Umezawa da rivalutare).
  Dopo Genkai: riscatto in **LINGOTTI D'ORO** («punto comunicato poi») = **depistaggio** (ai capi
  i soldi non servono); alla consegna combattimento possibile → **prigioniero vivo → ubicazione
  dello STRUMENTO**: in realtà un **inibitore del segnale** → attivato, la creatura **torna al
  mare dal punto più vicino** = la via di vittoria. Nemici: camioncini + altri terroristi.
  INDIZI.md: blocchi 2 (oro: 1 mld ¥/500 kg proposta, 3 scene di consegna) e 3 (strumento:
  ubicazione da decidere — nave appoggio o ex stazione d'ascolto) + blocco 4 segnaposto
  (briciole sull'organizzazione, da dettare). Aperto: saturazione-organo come piano-B sì/no.
  ⑧ **INDIZI — iniziato `INDIZI.md`** (l'utente li detta a blocchi, «poi ti dico il resto»).
  Blocco 1 CANONE UTENTE — **il camioncino**: emettitori dentro camioncini tutti uguali travestiti
  da mezzi di cantiere (cartelli 工事中, abbandonati), guardati da mercenari-operai; se scoperti
  rispondono al fuoco e spostano il camion SEMPRE SULLA LINEA; piazzati 5-6 gg prima (~30-31/10)
  quasi contemporaneamente su tutta la rotta; si trovano riavvolgendo le TELECAMERE (porti,
  centrali, caselli, N-System 1986); **in uno c'è LA MAPPA dei punti di passaggio** (proposta:
  nel camion del capo-settore; i normali hanno solo ordini parziali). Proposte mie: Isuzu Elf box,
  ditta fittizia «Kyōsei Setsubi Kōgyō», parcheggio accoppiato ad acqua/tombini, targhe rubate +
  filo acquisto-in-blocco, stat mercenari. 7 prompt foto CCTV/reperto (F1-F7) dentro INDIZI.md.
- **IN ATTESA**: struttura sul percorso nuovo (che fine fa Tokyo/Tōkai/telegiornale? dove entrano
  i PG? date/gancio Mihara?) + le restanti decisioni di Sviluppo §0 e interpretazioni §10.
- **POI**: pregen (5 poliziotti), 9 handout (lista in Sviluppo §11), posizioni emettitori su mappa,
  copione-GM definitivo. Fatti reali da riverificare su fonte primaria prima della pubblicazione
  (design §11).
