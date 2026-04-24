# CLAUDE.md — La Falsa Primavera (偽りの春)

Istruzioni operative per lavorare su questa avventura. Leggere insieme a MEMORY.md.

## Contesto

- **Sistema**: GENKAI (2d6 + attributi + Ki)
- **Ambientazione**: Kyoto, 29-31 Marzo 1997
- **Formato**: one-shot investigativa, sessione unica (3-4 ore)
- **File canonico**: `Storia Completa.md` — versione corrente **v2.2**
- **Handout HTML**: 10 file in `handout/` (01–10), stile burocratico JP '97

## Lore critiche (NON cambiare senza autorizzazione)

### La verità del caso
- **Assassina**: Ogawa Yumi (nuora, 30 anni)
- **Vittima**: Ogawa Masao (suocero, 66 anni, ceramista Kiyomizu-yaki)
- **Metodo**: 12 compresse di Lanoxin (digossina 0,25 mg) triturate e sciolte nell'umeshu condiviso
- **Movente**: il testamento doveva essere modificato il 3/4/1997 riducendo Shūichi (marito di Yumi) al minimo di legittima — Yumi colpisce prima

### Timeline chiave
- **12/03 (Mer)**: Ogawa incontra Shimizu — decisione modifica
- **15/03 (Sab)**: pranzo famiglia, Yumi origlia e legge i fogli dalla borsa di Shimizu
- **29/03 (Sab) pomeriggio**: Yumi prende/tritura le compresse in bagno, doppio fazzoletto
- **29/03 ~21:30**: Yumi passa per la cucina (Fumiko al lavello), contamina la bottiglia, serve tutti
- **29/03 ~22:58**: Family Mart, scatola nel bidone (telecamera VHS)
- **30/03 06:30-06:38**: Fumiko trova il corpo, chiama 119
- **30/03 07:05**: chiamata dall'appartamento Yumi alla villa (48 sec, riattacca quando risponde un agente)
- **31/03 (Lun)**: PG ricevono il caso
- **02/04 (Mer)**: lettera anonima arriva alla polizia

### Sei convitati alla cena
Masao (vittima), Fumiko (moglie), Shūichi (figlio), Yumi (nuora), Kazuko (sorella di Masao), Shimizu (avvocato).

## Schema depistaggi (regola "niente ovvio")

| Sospettato | Perché sembra colpevole | Perché non lo è |
|---|---|---|
| Fumiko | Gestiva ricette, matrimonio freddo, lettera anonima la accusa | Avrebbe guadagnato dalla modifica del testamento |
| Shūichi | Debiti 12M yen, rapporto pessimo col padre | Non sapeva della modifica (reazione autentica), impronte non sulla bottiglia |
| Kubo Midori (amante) | Menzionata nella lettera anonima | Pista totalmente falsa, non era alla cena |

**Trappola meta-narrativa**: la lettera anonima accusa Fumiko — ma il timbro è Nakagyō (quartiere di Yumi) e menziona l'amante, che Yumi non dovrebbe conoscere → il depistaggio si ritorce contro di lei.

## Handout HTML in `handout/` (10 file, stile '97)

| File | Titolo | Funzione |
|---|---|---|
| `01_Referto_Autoptico.html` | Referto autoptico | Miosi + digossina 8,4 ng/mL |
| `02_Rapporto_Scena.html` | Rapporto scena del crimine | Armadietto aperto, scatola assente, fazzoletto |
| `03_Cartella_Clinica.html` | Cartella clinica | Lanoxin 60 cp 05/03, ultima visita 08/03 stabile |
| `04_Trascrizione_119.html` | Trascrizione 119 (JP) | Fumiko chiama 06:38 |
| `05_Esami_Sangue.html` | Esami sangue (**LA pista principale**) | Yumi 0,3 vs media 1,1 |
| `06_Tabulati_Telefonici.html` | Tabulati NTT | 3 utenze, 18 chiamate, chiamata 07:05 del 30/03 ambigua |
| `07_Agenda_Ogawa.html` | Agenda Takahashi Techo (JP) | Conferma movente senza parlare con Shimizu |
| `08_Fotogramma_Konbini.html` | Fotogramma Family Mart | Donna 155-160 cm, capelli raccolti (Yumi li porta sciolti) |
| `09_Lettera_Anonima.html` | Lettera anonima (JP) | Accusa Fumiko — timbro Nakagyō + conosce amante |
| `10_Analisi_Timbro.html` | Analisi timbro | Nakagyō = quartiere di Yumi |

**Note GM tecniche** (chiave numeri tabulati, valore 0,3 di Yumi, chiamata 07:05, lettura capelli, trappola lettera) sono in `Storia Completa.md` sezione 8 → sottosezione "Note GM per gli handout".

## Prove (sez. 6)

Reperti A-F: bottiglia umeshu, scatola Lanoxin, fazzoletto, filmato VHS, lettera anonima, esami sangue.

## Regole narrative (non violare)

1. **Il livello 0,3 di Yumi è l'arma principale**. Se i PG non lo notano in H5, la Dott.ssa Morita lo segnala direttamente — ma solo una volta, senza insistere.
2. **Kazuko è una cassa sonora**: le frasi chiave (*"Yumi ha versato per tutti"*, *"mi pare sia passata anche in cucina"*, *"l'umeshu aveva un sapore diverso"*) vanno servite DENTRO un flusso di coscienza logorroico. Mai enfatizzate.
3. **Shimizu è segreto professionale**: parla solo con autorizzazione PM o consenso Fumiko. Coerente con Manuale Situazioni GENKAI (scheda Procura, Regolamento v1.3).
4. **La lettera è un test**. Se i PG ci cascano e arrestano Fumiko → hanno sbagliato, Yumi vince.
5. **Yumi non crolla al primo giro**. Terzo giro solo: confessa (A) o chiede avvocato (B).
6. **Scena finale (sez. 9)**: opzionale. Shūichi con la Tokarev dello strozzino, suicidio (esito A) o sparatoria/suicidio (esito B). Il GM può saltarla se il tono non regge.

## Prossimi passi possibili (non fare senza richiesta esplicita)

- Preparare schede PG (usare `Investigare/pg/genera_schede_pg.py`)
- Creare cartellina GM stampabile (A4 con chiavi numeri tabulati + tabella soluzione)
- Verificare resa visiva handout in browser locale (file:// protocol) + stampa PDF A4
- Eventuali prove fisiche secondarie (ricevuta konbini con timestamp, impronte cassetta postale)
