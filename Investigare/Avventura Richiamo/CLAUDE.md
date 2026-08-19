# CLAUDE.md — Avventura «Richiamo» (Uminari)

**Sessione dedicata a questa avventura** (come STARTERKIT per lo Starter Kit): lavora SOLO dentro
`Avventura Richiamo/` — legge tutto il vault, non tocca nulla fuori salvo `GENKAI_Registro_Nomi.md`
e `REGISTRO_MODIFICHE.md`. Dichiararlo all'utente alla prima risposta. Valgono le REGOLE FERREE
di `Investigare/CLAUDE.md`: non inventare, non riaprire il chiuso, leggere i registri prima di toccare.

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
