# CLAUDE.md — Avventura Bakuon (Tanto Rumore per Nulla)

## Regola fondamentale

Prima di modifiche che cambiano trama, personaggi, relazioni o meccaniche investigative,
**indicarlo all'utente e chiedere conferma PRIMA di procedere**. Niente assunzioni sulla narrativa.

## Contesto

**BAKUON 爆音 — Tanto Rumore per Nulla** — one-shot investigativo GENKAI 限界 v1.3. Kyoto,
Shimogyō-ku, **maggio 1997**. Bakuon è il rombo degli scarichi smarmittati: l'unica cosa che
tutti i testimoni ricordano. Il sottotitolo dice il resto: un ragazzo morto per gelosia, per nulla.
Fino al 2026-08-16 l'avventura si chiamava «L'era glaciale del lavoro», poi per poche ore «Tanto Rumore».
**L'anno è il 1997** (decisione finale utente 2026-08-16, dopo passaggi per 1987 e 1984):
l'anno canonico di GENKAI. Per salvare i giorni della settimana **tutte le date sono +1 giorno**
rispetto alla stesura originale: il fatto è **sabato 24 maggio 1997**, i giornali escono
domenica 25, lunedì 26 e martedì 27; «il dieci maggio, un sabato» nella deposizione di Noriko.

Shimada Yuta, 21 anni, studente di medicina che lavora allo snack bar SnakUp, viene ucciso
il 24/05/1997 con un colpo contundente da **Matsui Kenta**, capo di una banda bōsōzoku,
per **gelosia**: la sua ex, Watanabe Noriko, si era innamorata di Yuta.
Dopo il fatto Matsui fa pressione su Noriko con minacce perché non lo denunci.

## ⚠ FONTE DI VERITÀ: il wizard

L'avventura è costruita nel **wizard GENKAI** (caso `C3C15FF7-AFCE-4299-A49C-53B367CD29EA`,
titolo «Bakuon — Tanto Rumore per Nulla», DB `Wizard/codice/GenkaiWizard/app.db`).
**Questa cartella è la sua fotografia**: si modifica NEL WIZARD, poi si riesporta con
`python esporta_da_wizard.py` (rigenera PNG/, Location/, Storia Completa.md, handout/, Token/, Immagini/).
Gli **handout si stampano dal wizard**; quelli in `handout/` sono snapshot.
Non correggere a mano i file esportati: la modifica va fatta nel wizard, o si perde al riexport.

## Lore critiche (MAI violare)

- **Ambientazione maggio 1997** — niente internet per civili, pocket bell coi codici goroawase per i giovani (nel 1997 è il loro momento d’oro), telefoni fissi e cabine
- **Gli indizi si danno SEMPRE** — il dado non blocca l'indagine, decide come ne esci
- **Matsui Kenta è il colpevole**; il movente è la gelosia, non la droga (lo spaccio è il contorno)
- **Chiba Hiroko mente** («ero nel retro»): era in sala e ha visto tutto — è la testimone chiave
- **Ishida Kazuhiko** (il titolare) non collabora subito: paura di ritorsioni
- La **banda** e la sua **sede** (Kita-ku) sono nascoste ai PG finché l'indagine non ce li porta
- Le **2 Honda CBX400F** modificate sono la traccia oggettiva: riconoscibili, tracciabili dal kōban
- Il **kōban di Kamigyō** (Suzuki Nobuyuki) è rivale della banda: En −4/−2

## Cosa manca (stato 2026-08-16)

- **5 schede PNG senza sostanza** nel wizard (solo aspetto): **Aoki Hideki** (il più urgente:
  madre e sorella lo indicano come «quello che sa le cose di Yuta»), Sugimoto Hideki,
  Yoshida Yukio, Tanaka Takayuki, Suzuki Nobuyuki
- **Deposizione di Matsui Kenta**: marcata handout ma il testo non è scritto
- ~~Etichetta «kyoto-1997»~~: col 1997 coincide — chiusa
- ~~Età dei PG pregenerati~~: sono costruiti per il 1997 — tornano tutte, chiusa
- Nota: *Il Giudice* è aprile 1997, Bakuon maggio 1997 — stessa squadra, casi consecutivi

## Struttura

- `Storia Completa.md` — il quadro GM: premessa, cronistoria, banda, informazioni, calendario, tabella En
- `PNG/` — una scheda per persona (12) · `Location/` — una per luogo (5)
- `DOSSIER_GM.docx` — il dossier stampabile (include la scheda distretto) · `genera_dossier.py`
- `SCONTRO_FOGLIO_TAVOLO.docx` — combattimento in una pagina · `genera_foglio_scontro.py`
- `Token/` — 12 ritagli + `TOKEN_PERSONE.docx` da stampare · `genera_token.py`
- `handout/` — snapshot HTML + `_Indice.md` · `Immagini/` — scene, reperti, `Ritratti/`
- `LANCIO.md` — materiale di lancio WhatsApp (scritto col vecchio titolo, nota in testa)
- `storico/` — versioni precedenti del materiale

Regolamento e PG pregenerati nella cartella madre (`Investigare/`); scheda distretto in `../Materiale/`.
Prima di creare nomi nuovi: `../GENKAI_Registro_Nomi.md` (i 12 del cast sono registrati, nessuna omonimia).
