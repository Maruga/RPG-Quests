# Brief — Mappa di Kyoto per il Wizard GENKAI

## A cosa serve

Mappa dei quartieri di Kyoto (1997) dentro il wizard online: aiuta un GM che **non conosce Kyoto** a orientarsi e a scegliere il quartiere del caso. Si guarda soprattutto **da cellulare**, dentro una finestra ~520px di larghezza.

## Architettura tecnica (IMPORTANTE)

L'immagine è lo **sfondo artistico**; etichette, evidenziazione del quartiere selezionato e aree cliccabili le aggiunge il sito in un livello sovrapposto. Quindi:

- **NIENTE testo nell'immagine** — né nomi, né kanji (li mette il sito: sempre nitidi, niente refusi AI, e cambiabili)
- I **confini tra quartieri devono essere leggibili** (linee o cambi di tono netti), perché sopra ci disegno i poligoni cliccabili
- Consegna ideale: **SVG con un livello/gruppo per quartiere** (ognuno nominato). Va benissimo anche **PNG ≥ 1600×1880 px** — ai poligoni clic ci penso io
- Proporzioni **4 : 4,7 verticale** (come l'attuale: viewBox 400×470)

## Cosa deve contenere (disposizione topologica — non serve precisione geografica)

Le 12 zone, riconoscibili come aree distinte:

| id tecnico | Nome | Kanji | Posizione | Carattere (per l'atmosfera del disegno) |
|---|---|---|---|---|
| kita | Kita-ku | 北区 | nord, centro-ovest | residenziale bene, colline, Kinkaku-ji |
| sakyo | Sakyō-ku | 左京区 | nord-est, GRANDE (sale verso i monti) | università, verde, templi |
| kamigyo | Kamigyō-ku | 上京区 | centro-nord | Gosho (palazzo imperiale), Nishijin tessile |
| nakagyo | Nakagyō-ku | 中京区 | centro | commercio, banche, mercato Nishiki |
| ukyo | Ukyō-ku | 右京区 | ovest, GRANDE | residenziale, Arashiyama, bambù |
| gionHigashiyama | Higashiyama-ku | 東山区 | striscia stretta a est del fiume | Gion, templi sulla collina, la notte tradizionale |
| yamashina | Yamashina-ku | 山科区 | est, OLTRE le colline (separata da un rilievo) | quartiere-dormitorio |
| shimogyo | Shimogyō-ku | 下京区 | centro-sud | **stazione di Kyoto — il distretto dei PG** |
| minami | Minami-ku | 南区 | sud | industriale, capannoni, Tō-ji |
| nishikyo | Nishikyō-ku | 西京区 | sud-ovest | margine urbano, campagna urbanizzata |
| fushimi | Fushimi-ku | 伏見区 | sud/sud-est, GRANDE | sake, canali, Fushimi Inari |
| uji | Uji (città) | 宇治市 | fuori mappa a sud-est, **staccata** (bordo tratteggiato o tono diverso) | tè, fiume, provincia |

**Elementi geografici** (senza etichette):
- Fiume **Kamogawa**: scende da nord-est, costeggia Higashiyama, taglia il centro verso sud
- Fiume **Katsura**: scende a ovest verso sud-est
- Accenno di **colline/monti** a nord, est (tra centro e Yamashina) e ovest — Kyoto è una conca

**Punti di riferimento** (simboli piccoli, senza testo — max 6-7):
- Stazione di Kyoto (Shimogyō) — il più importante
- Gosho / recinto imperiale (Kamigyō)
- Gion (Higashiyama)
- Torii di Fushimi Inari (Fushimi)
- Università (Sakyō)
- Ponte su Arashiyama (Ukyō) — opzionale
- Tō-ji / pagoda (Minami) — opzionale

## Stile

- **Noir giapponese anni '90, materiale da fascicolo investigativo**: come una mappa fotocopiata e appesa nella sala operativa di un commissariato — NON cartolina turistica, NON stile anime/kawaii, NON acquerello allegro
- Palette del gioco: crema carta **#F5F3EB**, blu notte **#1A1A2E**, oro **#B49650**, rosso segnale **#8B0000** (con parsimonia), grigio **#787878**
- Tinte piatte o retino leggero; i quartieri distinguibili per tono (2-3 varianti di crema/beige) con confini a inchiostro
- Bordo/cornice sottile, eventualmente angoli "consumati" — coerente con gli handout burocratici Heisei 9 del gioco

## Prompt pronto per generatore AI (GPT / Nano Banana)

> Stylized district map of Kyoto, Japan, vertical 4:5, viewed straight from above. 1990s Japanese police-file aesthetic: aged cream paper (#F5F3EB), flat muted tones, ink-drawn district borders, subtle halftone texture, like a photocopied map pinned in a detective office. Eleven distinct city wards as clearly separated flat areas in the correct topology (large ward NE, large ward W, large ward S, narrow strip E of the river, small central wards, one ward beyond the eastern hills), plus one detached town at the far SE with a dashed border. Two rivers in muted steel blue: one descending from NE through the center-east, one on the west side. Low mountain ridges sketched around the north, east and west edges. A few tiny landmark symbols in dark navy (#1A1A2E) and gold (#B49650): a station block in the center-south, a walled palace rectangle in the center-north, a torii gate in the SE ward, a temple pagoda in the south. **Absolutely no text, no letters, no kanji, no labels anywhere.** Clean flat illustration, high contrast borders, no photorealism, no anime style, no tourist-map cheerfulness.

## Quando ce l'hai

Mettila in `Wizard/codice/GenkaiWizard/wwwroot/img/mappa_kyoto.png` (o dammi l'SVG) e io: sovrappongo etichette e kanji nitidi, i poligoni cliccabili per quartiere, l'evidenziazione della selezione e la ★ sul distretto dei PG. La schematica attuale resta come segnaposto finché non arriva quella vera.
