# MEMORY — Avventura Bakuon (Tanto Rumore per Nulla)

## Stato (2026-08-16)

- Cartella creata esportando il caso dal wizard (`esporta_da_wizard.py`): 12 PNG, 5 Location,
  5 handout HTML, 12 token, 8 immagini, Storia Completa, dossier GM (16 pp), foglio scontro, token A4.
- Rinominata da «L'era glaciale del lavoro» → «Tanto Rumore» → **«Bakuon — Tanto Rumore per Nulla»**
  (2026-08-16, decisioni utente: bakuon 爆音 = il rombo delle moto; il sottotitolo è l'eco shakespeariana).
  Titolo aggiornato anche nel DB del wizard (solo colonna Titolo; backup pre-modifica in scratchpad sessione).
- I 12 nomi del cast registrati in `../GENKAI_Registro_Nomi.md` — controllo omonimie: nessuna piena.
- DA GIOCARE con un gruppo esterno (lancio WhatsApp in `LANCIO.md`).

## Anno di gioco: 1997 — DEFINITIVO (2026-08-16)

La giornata dei cambi d'anno: 1998 → 1987 → (1984 iniziato) → **1997, scelta finale**.
Ripristinato il caso originale dal backup pre-modifiche e applicato 1998→1997 con **+1 giorno**
per salvare i giorni della settimana: fatto **sabato 24 maggio 1997**, giornali 25-27/5,
primo incontro 25/4, «il dieci maggio, un sabato» (Noriko), tabulato 1/2–24/5 righe +1.
Il 1997 chiude da solo i problemi degli anni precedenti: **pocket bell coi codici goroawase
di nuovo validi e perfetti d'epoca** (tabulato originale ripristinato), età dei PG pregenerati
giuste, etichetta «kyoto-1997» esatta, moda anni '90 al suo posto. Nel LANCIO notizie vere
del maggio 1997 (Kabila a Kinshasa 17/5, Deep Blue–Kasparov 11/5, countdown Hong Kong,
consumi post-IVA 5%; nota: il caso Kobe/Sakakibara esplode il 27/5 mattina, dopo i tre
giornali — non citarlo). Backup della via del ritorno: `app.db.bak-pre1997-20260816` (stato
1984), `app.db.bak-anno1987-20260816` (originale 1998). *Il Giudice* è aprile 1997: casi
consecutivi della stessa squadra.

## Da fare prima di giocare

1. Compilare nel wizard le 5 schede vuote: **Aoki Hideki** (urgente — le deposizioni di madre e
   sorella puntano a lui), Sugimoto, Yoshida, Tanaka Takayuki, Suzuki Nobuyuki
2. Scrivere la **deposizione di Matsui Kenta** (marcata handout, testo mancante)
3. Dopo ogni modifica nel wizard: `python esporta_da_wizard.py` per riallineare la cartella
4. In `LANCIO.md` restano segnalate le correzioni della vecchia revisione (7 contraddizioni, 6 buchi):
   verificarne lo stato nel wizard

## Lezioni

- Il flusso è: **wizard → export → stampa**. Mai correggere a mano i file esportati.
- I generatori Word (`genera_*.py`) leggono il DB del wizard: si rilanciano dopo ogni modifica al caso.
