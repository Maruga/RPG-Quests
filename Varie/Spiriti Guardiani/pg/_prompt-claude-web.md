# Prompt per Claude Web — migliora la scheda PG

> Copia tutto questo messaggio in claude.ai, poi allega o incolla il file `Titus.html`.

---

Ciao Claude. Ti passo una scheda personaggio HTML per un GdR e vorrei che la
migliorassi sul piano **visivo, tipografico e di layout**. Non cambiare i
contenuti né le meccaniche di gioco — modifica solo l'aspetto.

## Contesto del gioco

**Spiriti Guardiani** è un GdR fantasy ambientato in una città antica nel
deserto, costruita sopra le rovine di una "Roma" perduta. I personaggi sono
6 reietti scelti come sacrificio in un rituale millenario; sotto la città
trovano i 6 spiriti guardiani — antichi condottieri romani reincarnati come
animali (Salamandra/Cesare, Pangolino/Marco Aurelio, Colibrì/Aureliano,
Fennec/Scipione, Drago di Mare Foglia/Spartaco, Medusa Luna/Augusto).

L'estetica è **fantasy romano** con accenti **kanji giapponesi** (le 6
caratteristiche del sistema hanno nomi italiani con kanji al fianco: Radice 根,
Eco 響, Scintilla 火, Ombra 影, Flusso 流, Battito 拍, Ki 気).

Sistema 2d6 ≤ caratteristica. Ki come HP. Le armi evolvono in 4 forme
(Improvvisata → Forma I → Forma II → Forma III, dove la III ha un nome latino).

## Cosa contiene la scheda (sezioni in ordine)

1. **Header** — titolo (epiteto), nome del PG, sottotitolo (animale · spirito · caratteristica)
2. **Hero row** — ritratto + identità (età, accusa, arma, condottiero, spirito)
3. **Chi è** — paragrafo narrativo con drop-cap, è il background del PG
4. **Kage** — "il peso del passato": il problema interiore del PG, in box quote
5. **Attributi** — 7 card (6 attributi + Ki). Quella dello spirito è evidenziata con stella e bordo rosso
6. **Spirito** — box con personalità + 3 poteri (Passivo / Attivo / Fusione)
7. **Arma** — 4 step di evoluzione, l'ultima in oro/rosso

## Vincoli tecnici (NON toccare)

- **Singola pagina A4 verticale** — non deve spezzarsi su 2 pagine
- **Due temi simultanei** via CSS:
  - **Schermo** = tema **dark** (cuoio scuro, oro caldo, rosso brace, glow)
  - **Stampa** (`@media print`) = tema **light pergamena** (sfondo color crema, inchiostro scuro)
- Font usati: Cinzel (display Roman), Cormorant Garamond (body),
  Noto Serif JP (kanji), Tangerine (corsivo decorativo), IM Fell English SC
- Funziona offline via `file://` — niente CDN che richiedono CORS speciali oltre Google Fonts
- L'immagine del PG è caricata via path relativo `../Immagini/IL%20BARBONE%20-%20Titus.png`
- Mantieni i kanji corretti e i nomi originali (TITUS, IL BARBONE, Caesar, ecc.)

## Cosa migliorare (priorità)

1. **Tipografia** — gerarchia visiva più forte; leggibilità su entrambi i temi;
   eventualmente uso di small-caps, lettere capitali decorate, kerning più curato
2. **Decorazioni** — flourishes, bordi ornati stile manoscritto/pergamena,
   illuminazioni in stile codice miniato (puoi usare SVG inline o data-uri)
3. **Box "Chi è" e "Kage"** — devono essere il cuore narrativo della scheda;
   renderli evocativi (drop-cap più bello, citazione che sembri scolpita,
   ornamenti laterali)
4. **Card attributi** — devono sembrare gemme/sigilli incastonati, non solo
   rettangoli. La caratteristica dello spirito deve risaltare visivamente come
   "il dono"
5. **Sezione spirito** — l'animale è un'entità mistica: dare un senso di
   sacralità (eventuale icona/glifo dell'animale, gerarchia tra Passivo/Attivo/Fusione
   con la Fusione visivamente più "potente")
6. **Step delle armi** — devono raccontare una progressione: l'ultima forma
   deve sembrare epica, le precedenti più rozze
7. **Coesione visiva** — palette romana (oro, rosso ossidato, bronzo, pergamena)
   che resti elegante e non kitsch; texture sottili (pergamena venata, polvere
   d'oro), niente effetti gratuiti
8. **Print fidelity** — verifica che la versione stampa sia pulita, ad alto
   contrasto, leggibile in B/N se necessario, e che tutto stia in 1 pagina A4

## Cosa NON fare

- Non aggiungere JavaScript (deve restare HTML+CSS puro)
- Non usare framework esterni (Tailwind, Bootstrap, ecc.)
- Non cambiare la struttura semantica delle sezioni (servirà replicare per
  altri 5 PG)
- Non aggiungere campi non presenti
- Non rimuovere i kanji né alterarne il significato
- Non usare emoji al posto degli ornamenti tipografici (❦ ⋆ vanno bene, 🔥💀 no)

## Output atteso

Restituiscimi **un singolo file HTML completo** (con CSS inline nel `<style>`)
che sostituisca quello che ti passo. Aggiungi un commento `<!-- -->` in cima
con un breve changelog (massimo 5 punti) di cosa hai migliorato.

Se proponi alternative (es. due varianti di palette o due trattamenti del
ritratto), restituiscile come due file HTML separati e spiegami in 3 righe la
differenza.

---

**Allego sotto il file `Titus.html` da migliorare:**

```html
[INCOLLA QUI IL CONTENUTO DI Titus.html]
```
