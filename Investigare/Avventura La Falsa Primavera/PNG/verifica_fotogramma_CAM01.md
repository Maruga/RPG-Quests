# Verifica coerenza — Fotogramma telecamera CAM01

Verifica dell'immagine generata per il fotogramma del Family Mart (H8), confrontata con i dati canonici dell'avventura La Falsa Primavera.

## Esito complessivo

**Tutto coerente.** L'immagine è pronta per essere inserita nell'handout H8 come `PNG/immagini/CAM01_Fotogramma_Konbini.png`.

## Tabella di verifica punto per punto

| Elemento | Canone avventura | Immagine generata | Esito |
|---|---|---|---|
| **Data** | 29/03/1997 sabato (Storia sez. 4 cronologia) | `1997-03-29` | ✓ |
| **Ora** | 22:58 (H8 + Storia) | `22:58:14` | ✓ |
| **OSD top-left** | `FAMILY MART` | `FAMILY MART` | ✓ |
| **OSD top-right** | `CH-02` | `CH-02` | ✓ |
| **Insegna JP** | ファミリーマート | ファミリーマート | ✓ |
| **Ubicazione** | Higashiōji-Shichijō, Higashiyama-ku | Konbini suburbano notturno | ✓ |
| **Soggetto** | Donna 155-160 cm, minuta, sola | Figura corretta in proporzioni | ✓ |
| **Capelli** | Raccolti sulla nuca (crocchia/coda) | Crocchia bassa visibile | ✓ |
| **Abbigliamento** | Giacca scura a vita + pantaloni scuri + scarpe basse | Giacca scura + pantaloni + scarpe basse | ✓ |
| **Azione** | Getta oggetto piccolo nel bidone esterno | Braccio destro esteso verso bidone con oggetto in mano | ✓ |
| **Volto identificabile** | NO (H8) | Di spalle/3-4 posteriore, viso non leggibile | ✓ |
| **Bidone esterno** | Metallico, cilindrico | Bidone cilindrico metallico | ✓ |
| **Ambiente** | Porte vetro, interno visibile, parcheggio | Tutto presente | ✓ |
| **Stile VHS 1997** | B/N time-lapse 2fps, 240 linee, scanline | Scanline, tracking errors, vignetta, fluorescenti bruciati | ✓ |

## Coerenza cronologica ulteriore

- **22:30 partenza dalla villa** (Storia sez. 4) + tragitto Higashiyama-Shichijō ≈ 25 min in auto → **~22:55-23:00 arrivo al konbini** → `22:58:14` è perfettamente plausibile ✓

## Dettagli autentici riusciti

- **Cartellone promozionale "0円"** parzialmente visibile nella vetrina — tipica grafica konbini anni '90
- **Carrelli accatastati** nell'ingresso — dettaglio corretto per alcuni Family Mart anni '90 più grandi
- **Bicicletta parcheggiata** a sinistra (mama-chari tipica giapponese)
- **Palo della luce** con lampione nel parcheggio destro
- **VHS tracking errors** come bande scure orizzontali nella parte inferiore del frame
- **Scanline** sottili ma visibili
- **Highlights fluorescenti** bruciati dentro il negozio — comportamento tipico delle TVCC dell'epoca

## Uso in gioco — cosa noteranno i PG

Incrociando con le foto full body dei PNG (cartella `PNG/immagini/full/`):

- **Altezza 155-160 cm stimata** → compatibile con:
  - Yumi (157 cm) ✓
  - Fumiko (152 cm) borderline
  - Kazuko (148 cm) troppo bassa + corporatura robusta
  - Shimizu (172 cm, maschio) escluso
- **Capelli raccolti**: contraddice l'immagine abituale di Yumi (sciolti lunghi mid-back) — dettaglio chiave che Shūichi conferma in interrogatorio: *"forse se li è tirati su in macchina"*
- **Giacca occidentale + pantaloni** (non kimono): anomalo per Yumi che veste abitualmente in kimono (cfr. prompt 04 full body)

## Funzione narrativa

L'immagine rende perfettamente il ruolo previsto nell'avventura:

> Abbastanza nitida per dedurre i parametri morfometrici → ma abbastanza degradata da non permettere un'identificazione certa.

La trappola narrativa resta intatta:
- I PG non possono dire "è Yumi" solo guardando il frame
- Possono dire "è compatibile con Yumi" incrociando i dati morfometrici
- La conferma definitiva viene solo dalle altre prove (sangue 0,3, scontrino fazzoletti alla cassa, testimonianza Shūichi sui capelli raccolti "forse in macchina")

## Integrazione con H8

Per sostituire il blocco CSS `.frame-img` nell'handout `08_Fotogramma_Konbini.html`:

1. Salvare l'immagine come `handout/immagini/CAM01_Fotogramma_Konbini.png` (creare sottocartella `immagini/` in `handout/` se si preferisce tenere tutto insieme)
2. Modificare la sezione `.frame-img` nel file HTML sostituendo il contenuto con:

```html
<div class="frame-img">
    <img src="immagini/CAM01_Fotogramma_Konbini.png"
         alt="Fotogramma telecamera Family Mart 22:58:14"
         style="width: 100%; height: 100%; object-fit: cover;">
    <div class="noise"></div>
</div>
```

3. Rimuovere le `<div>` CSS che simulavano la scena (`.shelf-top`, `.shelf-back`, `.bin`, `.figure`, `.floor`, `.ceiling-label`) perché ora sono renderizzate direttamente nell'immagine

4. Opzionalmente, se l'OSD dell'immagine AI differisce leggermente, i vecchi `<div class="osd-top">` e `<div class="osd-bottom">` possono restare sopra l'immagine (z-index più alto) come overlay nitido sopra l'immagine degradata
