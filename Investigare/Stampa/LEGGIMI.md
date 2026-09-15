# Stampa/ — la cartellina da mettere in mano a un editore

Creata il **14 settembre 2026**. Qui dentro c'è tutto quello che serve per far vedere GENKAI a qualcuno
che non lo conosce: si stampa, si infila in una cartellina e si porta a un incontro.

## Cosa stampare

| File | Pagine | Cos'è |
|---|---|---|
| `GENKAI_CARTELLINA_COMPLETA.pdf` | 15 | **tutto in un file** — è questo che si manda in stampa |
| `1_PROMEMORIA.pdf` | 2 | cos'è il gioco, cosa esiste già, un esempio di scena, le due strade per pubblicare, formati e stampa, le domande da fare |
| `2_DOCUMENTI_DI_SCENA.pdf` | 9 | una pagina di presentazione e otto documenti veri presi dalle avventure |
| `3_SCHEDA_PERSONAGGIO.pdf` | 4 | la scheda completa di Yamamoto Kenji, uno dei cinque investigatori pronti |

Tutto è **A4**. Due pagine sono **orizzontali** (la planimetria e la bacheca del caso): stampandole
fronte-retro conviene impostare la rotazione sul lato corto, oppure stamparle a parte.

## Cosa c'è nei documenti di scena

1. Rapporto autoptico — *Il Giudice*
2. Referto di autopsia col timbro dell'ufficio — *Tanto Rumore per Nulla*
3. Pagina del quotidiano Kyoto Shimbun — *L'Ultima Lezione*
4. Estrazione fotografica da una registrazione, con la foto — *La Falsa Primavera*
5. Lettera privata scritta a mano — *L'Ultima Lezione*
6. Tabulato telefonico — *L'Ultima Cena di Tanaka*
7. Planimetria della scena (orizzontale) — *L'Ultima Cena di Tanaka*
8. La bacheca del caso, vuota (orizzontale, nata in A3) — `Materiale/CrimeBoard.png`

Sono le versioni **a colori**: al tavolo si stampano in bianco e nero su carta normale, ma per un editore
si mostra come sono pensati.

## Se serve rifarli

In `sorgenti/` ci sono i due HTML (il promemoria e la pagina di presentazione dei documenti) e i due script.
Si modifica l'HTML e si rilancia:

```
python sorgenti/monta_cartellina.py
```

Lo script prende i documenti già convertiti in PDF, aggiunge la bacheca, taglia le prime quattro facciate
dal PDF delle schede e rimonta i quattro file. I documenti di scena si riconvertono da HTML con
`sorgenti/rendi_html_in_pdf.py` seguito dai percorsi dei file, relativi alla cartella `Investigare/`.

I documenti originali **non sono stati toccati**: restano nelle cartelle delle rispettive avventure.
