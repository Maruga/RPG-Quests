# ⚠ SI LAVORA IN DUE — LEGGERE PRIMA DI TOCCARE QUALSIASI COSA

Su questo progetto lavorano **due sessioni AI in parallelo**, nella stessa cartella,
sugli stessi file. Non sono la stessa sessione e **non si vedono a vicenda**:
l'unico modo che hanno di restare allineate è **scrivere sul registro**.

| | Chi | Di cosa si occupa | File di sua competenza |
|---|---|---|---|
| **A** | Sessione **REGOLE** | Regole del gioco, manuali, avventure, testi | `GENKAI_*.md` · `Avventura */` · `pg/*.md` · `png notevoli/` · `Materiale/` |
| **B** | Sessione **WIZARD** | Programmi e sito: wizard PG, wizard casi, sito genkai.it, pubblicazione | `Wizard/codice/GenkaiWizard/` · `sito_genkai/` |

**Se sei una delle due: dichiara all'utente quale sei, alla prima risposta della sessione.**

---

## REGOLE FERREE (2026-08-04 — valgono per entrambe le sessioni, sempre)

Scritte dopo un incidente reale: una regola inventata sopra una decisione già chiusa dall'utente.
Parole dell'utente: *«Non devi inventare cose, non devi prendere decisioni che non ti competono,
devi leggere prima di fare casini. Pago per avere affidabilità.»*

1. **NON INVENTARE.** Niente regole, valori, contenuti o "completamenti" di propria iniziativa.
   Se qualcosa sembra mancare o essere ambiguo, si **chiede** — non si riempie il buco da soli.
2. **NON RIAPRIRE IL CHIUSO.** Quando l'utente ha ragionato su un argomento e l'ha chiuso, è
   definitivo. Ricordare le decisioni è **compito delle AI, non dell'utente**: prima di dichiarare
   che qualcosa "manca" o "va corretto", cercare DOVE è stato deciso — `Revisione_AI2_Decisioni.md`,
   `REGISTRO_MODIFICHE.md`, i registri review in memoria. Un esempio validato dall'utente È la regola.
3. **LEGGERE PRIMA DI TOCCARE.** Nessuna modifica al canone senza aver controllato i registri.
   Si applica **solo** ciò che l'utente ha confermato esplicitamente: una proposta non confermata
   resta una proposta, anche se sembra ovvia.

---

## La regola che tiene insieme tutto

I wizard **mettono in pratica** le regole scritte nei manuali: punti attributo, tiro del Ki,
i 21 Gou coi loro requisiti, i gradi delle Senmon, i costi dello Shugyō, il Kage, l'Enja, l'En.
Se una regola cambia nel manuale e nessuno lo dice al codice, **il sito insegna una cosa diversa dal libro**.

Perciò, ogni volta che tocchi qualcosa che riguarda anche l'altra:

1. **Scrivi una riga in `REGISTRO_MODIFICHE.md`** (in questa cartella), in cima, con la data.
2. Di' all'utente che l'hai scritta, così può passare la parola all'altra sessione.
3. Quando apri una sessione, **leggi il registro** e applica quello che ti riguarda,
   poi segna la riga come applicata.

Non serve segnare tutto: solo ciò che **l'altra deve sapere**.

- La sessione REGOLE segna: regole cambiate, valori, costi, nomi, testi che compaiono nei wizard.
- La sessione WIZARD segna: regole che ha dovuto interpretare, incoerenze trovate nei manuali,
  campi nuovi che chiede alle schede.

## Confini da non superare

- **Non modificare i file dell'altra** senza dirlo. Se serve, scrivilo nel registro e lascia fare a lei.
- **Il canone delle regole sta nei manuali**, non nel codice: se il codice dice una cosa diversa,
  ha ragione il manuale (a meno che l'utente non decida il contrario — e allora si aggiorna il manuale).
- **`GENKAI_Kage.md` è materiale del GM**: le sue meccaniche (Peso, Tiro del Kage, Shimi, Favori)
  non vanno esposte ai giocatori, quindi nemmeno nel wizard PG.
- Prima di creare nomi di personaggi: `GENKAI_Registro_Nomi.md` (regola anti-omonimie).
- Prima di cambiare trama, personaggi o relazioni di un'avventura: **chiedere all'utente**.

## Stato dei lavori (aggiornare quando cambia)

- **Sito online**: <https://genkai.it> — home, `/squadra/` (libretto), `/handout/`, wizard PG `/Pg`,
  wizard casi `/Progetti`, accesso e registrazione. Sorgente del sito in `sito_genkai/`.
- **Aperto a tutti**: il wizard PG si usa **senza registrarsi** (identità legata a un cookie);
  il wizard casi chiede ancora l'accesso.
- **Manca**: i PDF dei manuali e lo Starter Kit — sul sito i pulsanti «Scarica» sono ancora vuoti.
  L'ordine concordato: **prima si congelano i testi, poi si impagina**.
