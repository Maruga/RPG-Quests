# MEMORY — Avventura Sake (L'Ultima Cena di Tanaka)

## Audit completo (2026-07-10)
Audit a 3 verificatori (PNG, luoghi, handout HTML) + allineamento regolamento. **Esito: avventura solida.** Luoghi puliti al 100%; PNG fedeli al canone (Ogawa non si tradisce, 5 depistaggi coerenti, chiavistello/EpiPen/3-vettori ok); handout non rivelano Ogawa, dati duri coerenti, 13/13 dark+print CSS.
**Fix applicati:** versione v1.2→v1.3 (Storia, CLAUDE, crea_word.py); **5 copie PG in `PG/` aggiornate all'attuale** (erano ferme a "5 punti", ora 3 punti + Senmon + Modello B); En Yamada +1→+2 (tabella riepilogativa Storia allineata al testo/relazioni.txt); Sato Harumi 20→22 anni servizio (H03); padre Hayashi "6 mesi fa"→"a marzo (14/03/1997)" (Storia + scheda Hayashi); CLAUDE/MEMORY handout aggiornati (12 handout, planimetria 01a/01b, niente villa.png/banner rosso); crea_word.py: tolto riferimento a `01_Planimetria_Villa.html` inesistente; crea_planimetria.py marcato legacy.
**Falso positivo mio:** il Gou "Ombra della Verità" ESISTE (è il Gou di Nakamura, 影の真実) — i riferimenti in Sake sono corretti, non toccati.
**NON toccato per decisione utente:** le collisioni di nomi (PG Sato Yuki ↔ Sato Harumi + Tanaka Yuki; Nakamura PG↔Daisuke; Daisuke×2; Kenji; Watanabe Jun↔Hideo; Kazuo; Fujita↔Fujimoto). Da valutare in futuro.
**Gap residuo minore (non bug):** crea_word.py compila solo H02-H08 (non include H09-H12, che sono standalone) — se un giorno serve il Word completo, vanno aggiunti.


## Handout — Stato attuale (aggiornato 2026-03-22)

12 handout HTML in `handout/`. Tutti hanno dark mode (`prefers-color-scheme: dark`) e print CSS. Sfondo bianco per agenda e menu, gli altri variano.

### Elenco e modifiche fatte

| # | File | Contenuto | Modifiche |
|---|------|-----------|-----------|
| 01a/01b | `01a_Planimetria_Piano_Terra.html` + `01b_Planimetria_Primo_Piano.html` | Planimetria divisa per piano | Due file (piano terra + primo piano); immagini `Piano Terra.png` / `Primo Piano.png`; dark mode |
| 02 | `02_Rapporto_Preliminare.html` | Rapporto polizia preliminare | Sugimoto→Yamada. Dark mode aggiunto |
| 03 | `03_Lista_Presenti.html` | Lista presenti alla festa | 7 età corrette, 3 kanji corretti (allineati a Storia Completa). Dark mode |
| 04 | `04_Ristrutturazione_Societaria.html` | Documento ristrutturazione societaria | Dark mode aggiunto |
| 05 | `05_Agenda_Tanaka.html` | Agenda personale Tanaka, 4 pagine (Set-Dic) | Riscritto: sfondo bianco, colori forti, 4 mesi, biglietto Nishida, page-break per stampa |
| 06 | `06_Referto_Scientifica.html` | 4 referti scientifici standalone | Riscritto: 4 pagine indipendenti (Sapone, Incenso, Confronto, Sake). Ognuno con header completo |
| 07 | `07_Menu_Kaiseki.html` | Menu cena kaiseki | Riscritto: sfondo bianco, una pagina, layout compatto. Endo kanji corretto (俊夫) |
| 08 | `08_Biglietto_Nishida.html` | Meishi investigatore privato | Dark mode aggiunto |
| 09 | `09_Lettere_Nakamura.html` | **NUOVO** — 2 lettere d'amore Nakamura→Yuki | Reperto polizia (Allegato D). Red herring relazione |
| 10 | `10_Rapporto_Nishida.html` | **NUOVO** — Rapporto PI su Hayashi | Hayashi pulito. Elimina depistaggio indagine privata |
| 11 | `11_Tabulati_Telefonici.html` | **NUOVO** — Tabulati telefonici villa | 19 chiamate (set-nov 1997), flag presenti, stile polizia |
| 12 | `12_Referto_Medico.html` | **NUOVO** — Scheda allergologica Tanaka | Referto medico allergia salicilati, storia clinica, trigger, protocollo emergenza |

### Planimetria (divisa per piano)
- `01a_Planimetria_Piano_Terra.html` + `01b_Planimetria_Primo_Piano.html`, immagini `Piano Terra.png` / `Primo Piano.png`. Il vecchio `villa.png` non è più usato (lo script legacy `crea_planimetria.py` lo genera ancora, ma è orfano).

### Correzioni dati allineati a Storia Completa

**Età corrette in H03:**
- Yuki 52→49, Hayashi 24→26, Nakamura 48→45, Sato 58→62, Endo 45→48, Ishii 26→29, Watanabe 22→34

**Kanji corretti in H03:**
- Yuki 由紀→雪, Endo 敏夫→俊夫, Ishii 卓也→拓也

**PNG istituzionale in H02:**
- Sugimoto Ryota (杉本良太) → Yamada Tetsuo (山田哲夫) — allineato a Storia Completa

### Struttura H05 — Agenda Tanaka (4 pagine)

- **Pag. 47 — Settembre**: Nishida incarico + biglietto da visita incollato, rapporti Hayashi, vita aziendale, pianificazione festa. Senza righe vuote (compattato per stare in una pagina A4)
- **Pag. 48 — Ottobre**: Nishida rapporto finale, Fujimoto senior, R&D con Ogawa, "Ogawa report Q3 lasciati nello studio" (indizio sottile), Nakamura galleria, preparativi festa
- **Pag. 49 — Novembre**: Pre-festa (Hayashi confermato, preparativi) + 14 Nov = Festa + appuntamenti dopo il 14 mai onorati (budget 1998, cena Yuki Pontochō, Tokyo)
- **Pag. 50 — Dicembre**: Appuntamenti futuri mai realizzati (chiusura conti, festa aziendale, Hakone con Yuki, Capodanno Kiyomizu-dera)
- CSS: sfondo bianco, colori forti (handwritten `#0000cc`, date `#2a1000`), page-break per stampa

### Struttura H06 — Referti Scientifica (4 pagine standalone)

Ogni reperto è un `<div class="document">` indipendente con header polizia completo, metadata, analisi, conclusione, firma Ito, timbro. Possono essere consegnati singolarmente.

- **Reperto A**: Sapone a doppio strato (wintergreen nel nucleo)
- **Reperto B**: Incenso con wintergreen (legale commercialmente)
- **Reperto C**: Confronto saponi (bagno ospiti vs altri bagni)
- **Reperto D**: Sake Juyondai — tutto negativo, nota farmacocinetica (alcol come potenziatore)

### Struttura H11 — Tabulati Telefonici

19 chiamate dalla linea fissa della villa (075-561-7788), periodo 15/09–14/11/1997. Stile documento polizia (navy/oro). Colonne: N., Data, Inizio, Fine, Durata, Dir. (↑ uscente / ↓ entrante), Numero, Intestatario, Presente (● se alla festa).

Pattern investigativi nei dati:
- **NISHIDA** (075-561-3842): 5 chiamate uscenti → indagine PI su Hayashi (depistaggio)
- **NAKAMURA** (075-525-4190): 5 chiamate uscenti, tutte serali, lunghe → relazione Yuki (red herring)
- **OGAWA** (075-541-2260): 1 uscente + 2 entranti, normali orari ufficio → nulla di sospetto
- Nessuna chiamata a Kunjudō (negozio incenso) → Ogawa ha gestito tutto di persona
- Legenda, riepilogo totali, area note vuota, firma Yamada

### Struttura H12 — Referto Medico (Scheda Allergologica)

Documento del Higashiyama Medical Center (東山メディカルセンター), Dott. MORIMOTO Hiroshi (森本浩). Datato 15/05/1997 (controllo annuale). Stile medico (header blu scuro #1a3a5c, accenti #5a9cc5). Una pagina.

Contenuto — scritto come vero referto medico, NON come documento investigativo:
- **Anamnesi**: paragrafo narrativo — 3 episodi (1944 aspirina, 1961 wintergreen ricovero, 1978 cosmetico), sensibilizzazione progressiva
- **Sostanze da evitare**: layout a 2 colonne — farmaci, cosmetici, oli/aromi (sx) + alimenti ad alto contenuto salicilati e alimenti tollerati (dx). Wintergreen presente nella lista ma non evidenziato
- **Terapia**: Cetirizina 10mg/die, autoiniettore epinefrina, prednisone d'emergenza
- **Note cliniche**: paragrafo neutro — sensibilizzazione progressiva, nota sull'alcol ("può influenzare la capacità di tollerare i salicilati"), istruzione emergenza breve, prossimo controllo nov 1997
- Hanko 森本, timbro polizia "ACQUISITO — 97-KPD-1114 — 15/11/1997"

**Design**: nessun box rosso, nessun suggerimento sul metodo del crimine. Le informazioni rilevanti (wintergreen, alcol, incensi) sono nella lista ma non evidenziate — i giocatori devono collegarle da soli ai referti H06.

Dati inventati coerenti: DOB Tanaka 08/03/1936, cartella HMC-1978-04825, reg. medico 京都府医 第4825号

### Stile visivo handout

- Documenti polizia: header navy scuro `#1a1a2e`, accenti oro `#c0a060`, font Courier New
- Documento medico: header blu scuro `#1a3a5c`, accenti blu `#5a9cc5` (nessun banner rosso — design volutamente neutro, vedi H12)
- Agenda: sfondo bianco, bordo sinistro marrone `#6b3000`, handwritten blu `#0000cc`
- Menu: sfondo bianco, bordo decorativo oro, sigillo Tanaka
- Lettere: carta elegante, script corsivo, framing come reperto polizia
- Biglietto: formato meishi giapponese 91x55mm
- Dark mode: `@media screen and (prefers-color-scheme: dark)` — stampa sempre light

### Consistenza dati tra handout

- Nishida: Tel. 075-561-3842, Fax 075-561-3843, Shijō-dōri 284, Licenza 1247 — coerente in H05, H08, H10, H11
- Fascicolo polizia: 97-KPD-1114 — coerente in H06, H09, H11, H12
- Endo kanji: 遠藤俊夫 — coerente in H03, H07
- Yamada: Serg. YAMADA Tetsuo (山田哲夫) — coerente in H02, H11 e Storia Completa
- Villa Tanaka tel: 075-561-7788 — H11
- Numeri inventati H11: Ogawa R&D 075-541-2260, Fujimoto 075-541-1180, Nakamura 075-525-4190, Endo 075-561-0847, Hayashi 03-3407-5512 (Tokyo), Ag. Yamashita 075-561-8800
- Tanaka DOB: 08/03/1936 — H12
- Morimoto clinic: Higashiyama Medical Center, cartella HMC-1978-04825 — H12

## Modifiche narrative (2026-03-10)

- **Chiavistello chiuso dalla vittima**: Tanaka si chiude nel bagno da solo nella confusione dell'anafilassi (gira il chiavistello convinto di aprirlo). Ogawa chiude la porta (per privacy) ma non gira il chiavistello — Tanaka lo gira da solo pensando di aprirla. Il chiavistello diventa pista falsa per i PG. 5 edit in `Storia Completa.md` (timeline, nota GM Ito, segreti Ogawa, bugie Ogawa, graffi porta). Handout H02 non modificato ("porta chiusa dall'interno" ora è letteralmente vero).

## Note di design

- Ogni handout deve poter funzionare standalone (stampato e consegnato singolarmente)
- I referti H06 sono dati in momenti diversi dell'indagine — non tutti insieme
- L'agenda H05 mostra la vita interrotta: appuntamenti dopo il 14 novembre mai onorati (effetto narrativo)
- Le lettere H09 sono red herring (relazione Nakamura-Yuki), trovate nel comodino camera padronale
- Il rapporto H10 chiude il depistaggio Nishida-Hayashi (tutto pulito)
- I tabulati H11 rinforzano i red herring (Nakamura=affair, Nishida=PI) senza puntare a Ogawa — le sue chiamate sono normali e poche
- Il referto medico H12 fornisce il contesto scientifico per capire il meccanismo del crimine — wintergreen come trigger principale, alcol come potenziatore, esposizione multipla come moltiplicatore di rischio. Complementa i referti scientifica H06
