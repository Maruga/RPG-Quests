# Controllo completo dell'avventura — 2026-09-07

> Controllo su: coerenza interna (33 file riletti da zero), canone di serie (PNG fissi, distretto, quadro
> legale), **combattimento v3.1** (`../Combattimento/GENKAI_Combattimento.md`) e decisioni recenti del
> registro, immagini presenti in `Immagini/`, handout mancanti. **Nulla è stato modificato** salvo il
> mio `CLAUDE.md` (Riserva → Ki, percorso del manuale). Ogni voce ha una **proposta di default**: basta un
> «vai» (o «vai tranne 3 e 7») e le applico.

---

## A. Contraddizioni interne (rilettura integrale)

### Gravi — cambiano l'indagine

**A1 · Ōkubo: cosa sa davvero.** `Storia Completa.md:92-96` («non è mai stato al capannone», «non conosce
Saitō», «non conosce Hayashi né Kuroda») contro `PNG_Okubo…md:40-42` («conosce personalmente Saitō,
incrociato due volte al capannone», «conosce Hayashi», «ha visto Kuroda, descrizione fisica accurata») e
`:71` («ottengono la mappa per il capannone e nomi precisi»).
→ *Default*: vale la **Storia §27** (più restrittiva, coerente con «nessun indizio singolo»); riscrivo
«Cosa sa» e le note GM della scheda. Ōkubo resta prezioso per: ristorante di copertura, 2 clienti dai
prestiti, esistenza del poliziotto corrotto, identikit.

**A2 · Ōkubo: incaricato o autoinvitato.** `Storia:47` e `:212` + scheda `:16` (Tachibana gli affida
¥2 mln, terzo prestanome) contro `Storia:214` («non viene coinvolto direttamente… si autoinvita»).
→ *Default*: **incaricato** (2 fonti su 3, e la vendetta del Nitōgun ha più senso): correggo la riga 214.

**A3 · Quanti clienti nel registro delle 10 chiamate.** `Storia:81` e `:106-108` (solo Inoue e Tanaka
dal cellulare; gli altri 4 per altre vie) contro `Storia:173` («6 voci nel registro»), `Storia:304`
(«6 clienti + 3 prestanome + Murakami») e `PNG_Clienti…md:3, :105` («tutti e 6 sono nel registro»).
→ *Default*: vale la **lista del §22** (l'architettura del §30 e delle «altre vie» dipende da questo):
correggo le 4 righe.

**A4 · Composizione delle 10 chiamate.** La lista del §22 include Mariko, Kameoka-tei, Kōrin e Hayashi;
la scomposizione «6+3+1» in fondo alla Storia (`:304`) non lascia posto a nessuno di loro.
→ *Default*: stessa correzione di A3 (la riga 304 rimanda al §22).

**A5 · Quanti poliziotti corrotti.** `Storia:35` e `:110` («**è l'unico** poliziotto corrotto, non ci sono
complici / Inagaki è solo») contro `Storia:157` e `:277`, `PNG_Inagaki:48`, `PNG_Nitogun:59`,
`Luogo_Stazione_Kameoka:19`, `Luogo_Polizia_Prefetturale:25` (agente **Yamaguchi**, ¥50k/mese).
→ *Default*: Yamaguchi resta (complice minore che emerge di riflesso; è anche il «punto debole» di
Inagaki): riscrivo §6 e §31 come «Inagaki è l'unico che conta; Yamaguchi è un gregario da ¥50k». Se
invece preferisci un solo corrotto, lo tolgo dai 6 punti.

**A6 · Ōkubo interrogabile dal 14 o dal 15/02.** Scheda `:32` («dal 14/02») contro sparato alle 22:30 e
ricoverato alle 23:15 del 14; Storia `:91`, `:235` e Ospedale `:20`, `:50` dicono **15/02**.
→ *Default*: 15/02, correggo la scheda.

**A7 · Alibi di Saitō il 14 e il 17/02.** `Storia:120` («riunioni documentate il 13–14–17/02») contro
scheda `:28-29` (14: a casa con la moglie, telefonata al figlio; 17: tempio a Nara).
→ *Default*: vale la scheda (più precisa); Storia → «alibi documentati il 13, 14 e 17/02».

**A8 · Nishimura al Kōrin martedì 17/02, ma il Kōrin chiude il martedì** (`Luogo_Korin:12` vs
`PNG_Nishimura:29`). → *Default*: alibi del 17 → «a casa con la madre (giorno di chiusura)».

**A9 · La Toyota Crown al «posto B-14» sia nel garage di Fushimi (`Luogo_Fushimi:21`) sia al multipiano
della stazione** (`Storia:59`, `Luogo_Kyoto_Station:102`, scheda vittima `:83`).
→ *Default*: Fushimi → «posto auto assegnato nel garage, vuoto: la Crown è al multipiano della stazione
dall'11/02, poi sotto sequestro».

### Minori

**A10** Royal Hotel: «una/due volte alla settimana» (scheda vittima `:98`) vs «2-3 volte al mese»
(`Luogo_Royal_Hotel:18`). → *Default*: 2-3 al mese.
**A11** Quota della vincita: Sasaki e Nishimura incassano 3× la puntata, Ōkubo 1,4× (¥7 mln su ¥5 mln,
scheda `:16-19`). → *Default*: quota 3× per tutti → Ōkubo incassa ¥15 mln (¥6 dovuti a Tachibana, ¥9
suoi); «vincita complessiva» del §12 → «circa ¥20 mln». **Oppure lascio le cifre come sono**: dimmelo.
**A12** Reclutamento prestanome: «novembre–dicembre 1997» (`Storia:212`) vs «inizio gennaio» (Sasaki)
e «metà gennaio» (Nishimura). → *Default*: nov–dic sceglie il combattimento, **a gennaio** recluta.
**A13** Annunci Kyoto Shimbun «pagati in nero» (`PNG_Hayashi:17`) vs «ricevute intestate a Kameoka Nōji
KK» (`Luogo_Kameoka-tei:49`). → *Default*: valgono le ricevute (è la prova documentale H-25); Hayashi
paga tramite la Kameoka Nōji KK.
**A14** Tachi Yūichirō «cede solo se minacciato sulla moglie» (`Storia:158`, `Luogo_Kameoka-tei:45`) vs
«collaborativo se trattato bene» (`:57`). → *Default*: la leva è la moglie — funziona sia come minaccia
sia come rassicurazione; riscrivo la riga 57.
**A15** Incontri Inagaki–Hayashi «ogni 2-3 settimane» e «il primo lunedì del mese» nella stessa riga
(`Luogo_Stazione_Kameoka:41`). → *Default*: primo lunedì del mese.

### Imprecisioni di regole (vocabolario GENKAI) — correzioni certe

**A16** `Storia:265` elenca il **Kage** tra i «poteri» dei PG («Satori, Kage, Enja, Kyōryoku»): il Kage
è il problema personale, non un potere → «Gou, Satori, Enja, Kyōryoku».
**A17** `Luogo_Appartamento_Okubo:45` «i PG che… **tirano i dadi giusti** la trovano»: contro il canone
(gli indizi si danno sempre; mai un tiro per trovare un indizio) → «la trova chi dichiara una perquisizione
metodica (sotto le tavole del parquet)».
**A18** `Luogo_Casa_Kuroda:54` «scena d'azione con probabili **tiri di abilità** fisica/tattica»: in GENKAI
non esistono abilità → rimando allo scontro (Shōtotsu v3.1) e ai tiri di attributo (vedi C).
**A19** `Luogo_Polizia_Prefetturale:54` «mandato… capo sezione → **magistrato**»: canone (review #4a)
= la Procura chiede il mandato al giudice → «capo sezione → Procura (PM) → giudice».

---

## B. Canone di serie — i PNG fissi e la sede

`Materiale/Scheda_Distretto.md` e `png notevoli/` fissano per TUTTE le avventure della serie: i PG lavorano
sotto il **commissario Taniguchi Osamu** (Keishi, Sezione Omicidi), con **Yamada Tetsuo** accompagnatore,
**Ito Daisuke** responsabile Kanshiki-ka e il PM **Watanabe Hideo** per i mandati (sempre tramite
Taniguchi). Sede: **Centrale di Polizia Prefetturale, Via Kawaramachi 85** — Sezione Omicidi al 2° piano,
laboratorio Kanshiki nel seminterrato. Il Giudice, Sake, QED, Falsa Primavera e Bakuon li usano.

Tra Galli invece: briefing di un **Ispettore Capo Murayama Hidetoshi** (capo Sezione Omicidi), sede in
«Shimochōjamachi-dōri Shinmachi, Kamigyō-ku», 8 piani, Omicidi al 4°; Yamada, Ito e Watanabe assenti;
«magistrato» generico. (`Storia:65`, `Luogo_Polizia_Prefetturale` intero.)
→ **B1 · Decisione**: allineo alla serie? *Default sì*: Taniguchi fa il briefing e riceve i memo, Yamada
accompagna, Ito consegna i reperti e la balistica, Watanabe Hideo chiede i mandati; Murayama sparisce
(o resta come vice di Taniguchi, se lo vuoi tenere); il medico legale Yagi Kenta, Ogura (Affari Interni) e
Tachibana Mitsuru (Crimine Organizzato) restano; sede → Kawaramachi 85, Omicidi 2° piano, Kanshiki
seminterrato. Tocca `Storia §20`, la tabella delegabili («tramite il proprio capo squadra» → Taniguchi),
`Luogo_Polizia_Prefetturale` e il registro nomi (Murayama esce).
→ **B2 · Gradi**: il vocabolario dei gradi (Ispettore/Ispettore Capo/Sergente vs kanji+rōmaji) è una
decisione **aperta nel registro (2026-08-29)**: qui non tocco nulla finché non la chiudi; segnalo solo che
un «ispettore» (Keibu-ho) a capo della stazione di Kameoka (80 agenti) è un grado basso per un 署長.

---

## C. Combattimento v3.1 e statistiche

- **Nessuna scheda ha attributi, Ki o Senmon.** Scene in cui possono servire: **arresto di Kuroda**
  (casa/palestra, fuga lungo il Kamo), **ospedale 17/02** (Kuroda in corridoio con la siringa),
  **blitz del 22/02** (4-5 armati con armi corte, 2 vedette con walkie-talkie, ~20 operativi, sentieri
  di fuga), **parcheggio 14/02** (se i PG stanno sorvegliando Ōkubo), **villa Saitō** (2 akita, panic
  room con 2 Beretta). Canone v3.1: comparse attributi 5-6, **Ki come i PG** (attributo più basso + dado
  alto di 2d6, tetto 12), la Riserva 3/6/9 non esiste più; PNG notevoli a metodo diretto, Senmon libere,
  di norma niente Gou.
- **Armi già nel testo → riga della tabella v3.1**: Makarov PM, Tokarev TT-33 (Ōkubo e scorta di Kuroda),
  Beretta 92FS (Saitō) = **Automatica 9mm° 3/2/4 danno 4** (attacco Lucidità, difesa Distacco); «armi
  corte» della sicurezza = Compatta° 2/1/4 d3 o Automatica; tantō e serramanico = Coltello 2/1 d2; PG =
  New Nambu 4/2/5 d4 + keibō 2/2 d2 + Lotta 1. Kuroda è **istruttore di pugilato**: Lotta 2 (Presenza)
  ci sta di diritto; Pistola al massimo 1 («non è un professionista»).
- → **C1 · Decisione**: scrivo io i blocchi (proposta da validare, ~8 righe: Kuroda, Hayashi, Saitō,
  Inagaki, Ōkubo, sicurezza-tipo, vedetta-tipo, cani a giudizio GM) dentro le schede, oppure li generi tu
  col wizard casi (che usa già la formula del Ki) e io li riporto? *Default: li scrivo io.*
- **C2** Testi da riscrivere col vocabolario v3.1 (correzione certa, insieme ad A18): Casa Kuroda
  (l'arresto è un'**azione pronta / Sotto Tiro** da manuale: «*Polizia! Fermo!*»; fuga = Muoversi tra le
  zone), Capannone (blitz: 30 uomini, soppressione, «Le Conseguenze — Giappone 1997»: chi spara apre un
  fascicolo), Ospedale (colluttazione a contatto: coltello/siringa vs Lotta).
- **C3** Kit da tavolo: allegare **`../Combattimento/Scheda_Giocatori_Combattimento.html`** (v3.1) —
  niente fogli custom (quello di Bakuon è rimasto v2 e va rifatto: lezione da non ripetere).
- **C4** `CLAUDE.md` locale già aggiornato (Riserva → Ki, percorso del manuale). `PIANO_HANDOUT_IMMAGINI`
  §D va aggiornato dopo le decisioni.

---

## D. Le 6 immagini in `Immagini/` (viste una per una)

| File | Giudizio | Problemi rispetto al canone |
|---|---|---|
| **3ProiettiliPorta.png** | ottima, la copertina WA | timestamp **'98 02 11 21:33** impossibile (il corpo si scopre alle 22:01, la Scientifica arriva alle 22:35; la foto reperti è del 12/02); etichetta «京都駅ビル**管理室**便所» (bagno dell'ufficio direzione) invece del bagno pubblico 3F; porta grigia in metallo vs «laminato bianco» del testo (banale: adeguo il testo) |
| **InventarioVittima.png** | molto buona: kanji corretti, giornale 9/2 **lunedì** ✓, annuncio 22/2 **domenica** ✓, Lexotan 8 pillole ✓, Club Aoyagi ✓, polaroid di spalle ✓ | **橘 英司** vs canone **橘 永司** (l'accendino inciso «永» è un indizio: uno dei due kanji va cambiato); biglietto autobus **片道 = sola andata** da **七条口** vs A/R timbrato da **Hachijō-guchi**; ricevuta «**Shin-Miyako Hotel** 2/11 19:45 ¥3.150» vs cena all'Asty Road 20:15-21:00 ¥3.200 + ricevuta **Royal Hotel Karasuma 7-8/02**; chiavetta «**0419**» vs codice cassaforte **0418** (voluto?); cellulare a stecca vs «mova flip»; blister etichettato vs «flacone senza etichetta»; **card hostess col volto di Mariko** (la polaroid è di spalle apposta); mancano accendino 永, Mild Seven, penna, fazzoletto T.E., patente, JCB; placard «発見日時 21:21» (è l'ora dello sparo, non del ritrovamento); **taccuino con contenuto improvvisato** (亀岡亭 120 · K.N農機 200 · 田中商事 100 · 月間売上 ¥18.000.000 · H.E 6.8M) — se resta, diventa canone per l'handout H-09 |
| **AssassinoArrivaStazione.png** | buona base per IMG-11 (telecamera corridoio) | **scarpe scure** (canone: sneaker chiare con suola scanalata — è l'indizio Asics); ora **21:20:47** (canone: 21:19 nel corridoio, 21:20 nel bagno); **borsa** non prevista (aggiungibile al canone senza danni) |
| **VittimaBagno.png** | fotogramma **dentro** il bagno alle 21:26 | in canone **nessuna telecamera nel bagno** (quella all'ingresso è guasta ed è il motivo della scelta del posto); **porta aperta** (resta chiusa fino alle 22:01); **il gallo di sangue è fuori dal cubicolo** (Tachibana muore dentro, porta chiusa: il disegno è sul pavimento del cubicolo, piccolo, tracciato col dito); cartello «non ci sono telecamere» dentro una ripresa CCTV → solo materiale GM |
| **TelecameraAssassinio.png** | idem | stesso problema della telecamera interna (già segnalato il 24/08); l'arma semiautomatica ora è coerente |
| **Copertina.png** | sparatoria in strada sotto la pioggia | nessuna scena dell'avventura è così (niente drive-by); come copertina generica va bene, come immagine del caso no |

→ **D1 · Decisione per immagine**: (a) 3ProiettiliPorta: **ritocco il timestamp** (→ '98 02 12 con
PIL, stesso font) e l'etichetta, oppure rigeneri tu; (b) InventarioVittima: kanji, biglietto, ricevuta,
chiavetta, card di Mariko: **rigenerare** o **adeguare il canone** dove costa poco (cellulare a stecca,
blister, borsa: adeguo il testo; kanji 英/永, biglietto e ricevuta: decidi tu); (c) AssassinoArrivaStazione:
rigenerare con sneaker chiare e 21:19; (d) VittimaBagno + TelecameraAssassinio: **materiale GM**, non
handout; IMG-03 (il gallo) da rigenerare canonica; (e) Copertina: tenere come copertina o no.
→ **D2** Il taccuino dell'immagine: lo prendo come base per H-09 (e quindi nomi in codice = 亀岡亭 / K.N農機 /
田中商事…) o lo rigeneriamo dopo aver scritto il codice (§C del piano)?

---

## E. Handout

- Prodotti: **0 su 26** del piano. Le immagini presenti coprono in parte IMG-02 (porta), IMG-07
  (inventario, da correggere) e IMG-11 (corridoio, da correggere).
- Prima di produrre servono i contenuti del §C del piano (codice degli annunci, sistema del taccuino,
  dialogo della cassetta, numeri di telefono, intestazioni con kanji): li stendo e te li faccio rileggere.
- Le decisioni A1-A5 e B1 cambiano il contenuto di H-06 (10 chiamate), H-15/16 (Ōkubo), H-19 (Affari
  Interni) e delle intestazioni (Taniguchi/Ito/Watanabe): meglio chiuderle prima.

---

## F. Cose verificate e a posto

Cronologia degli attacchi e giorni della settimana reali; minuto per minuto in stazione; telecamere
(ingresso guasta / corridoio attiva); Makarov, bossoli e balistica ovunque coerenti; Asics 27; cifre
ricorrenti (¥200k/mese, ¥38 mln, ¥6,8 mln, ¥1,5 mln, ¥180.000, ¥1,2 mln, ¥600.000); età di tutti;
reperti del §21 = scheda vittima; distribuzione dei 4+1+1 Kyoto Shimbun; sigle S.G./K.R./I.H./V2; esiti
finali; alibi dell'11/02; testimoni del 14/02; quadro legale (tabulati con ordine del PM, niente
intercettazioni); anno 1998 coerente con la stazione nuova e VHS; wiki-link tutti risolti.

---

## Stato applicazione — 2026-09-08 (ordine dell'autore: «sistema il tutto»)

- **A1-A19 applicate**, tutte col default proposto: Ōkubo = Storia §27 (scheda riscritta: cosa sa, note GM, interrogabile dal 15/02, vincita ¥15 mln a quota 3); Ōkubo incaricato con i ¥2 mln (riga 214); registro delle 10 chiamate = lista del §22 (titolo della tabella clienti, riga «Indizi materiali», scheda Clienti ×2); Yamaguchi resta come gregario (§6 e §31 riscritti); alibi di Saitō = scheda; Nishimura il 17/02 a casa; la Crown non è più anche a Fushimi; Royal Hotel 2-3 volte al mese; reclutamento a gennaio; annunci pagati dalla Kameoka Nōji KK; Tachi cede sulla moglie (minaccia o rassicurazione); incontri Inagaki-Hayashi il primo lunedì del mese + un incontro d'urgenza il 15/02; «Kage» tolto dai poteri; niente tiro per la cassetta di Ōkubo; l'arresto di Kuroda riscritto in termini v3.1; mandati = Taniguchi → PM Watanabe → giudice
- **B1 applicata**: la squadra della serie — Taniguchi assegna il caso, Yamada, Ito, Watanabe Hideo, Gonda; Centrale di Kawaramachi 85 con Omicidi al 2° piano; Murayama eliminato; Yagi Kenta spostato all'Istituto di Medicina Legale (con la dott.ssa Morita, Enja di Fujita). Nuovo file **`Inizio - Incarico.md`** (briefing + ganci per i 5 PG + materiale da tavolo). **B2** (gradi): nessun cambio, in attesa della decisione generale
- **C1-C3 applicate**: blocchi statistiche v3.1 in 5 schede + comparse + cani; blitz e ospedale in termini v3.1; kit = `Scheda_Giocatori_Combattimento.html`
- **D1-D2 applicate** (a mio giudizio, come richiesto): `3ProiettiliPorta.png` corretta (23:03) con originale in `Immagini/_originali/`; `InventarioVittima.png` e `AssassinoArrivaStazione.png` resi canonici adattando il testo (kanji 英司 e accendino «英», biglietti Kyoto Kōtsū di sola andata dal capolinea lato Shichijō, ritorno alle 18:30 → arrivo 19:30, cena allo Shin-Miyako Hotel 19:45-20:45 ¥3.150, blister, chiavetta n. 0419, biglietto da visita di «Mari», telecamera CAM-12 alle 21:20 con berretto/borsa/sneaker scure); `VittimaBagno` e `TelecameraAssassinio` = solo GM; il taccuino della foto = base di H-09
- **Checklist riutilizzabile**: `CHECKLIST_CONTROLLO.md`
- **Da fare fuori da questa cartella (non toccato, da segnalare)**: `GENKAI_Registro_Nomi.md` — togliere «Murayama Hidetoshi» dalla sezione Tra Galli; `REGISTRO_MODIFICHE.md` — riga informativa (Tra Galli allineata alla serie e alla v3.1)
