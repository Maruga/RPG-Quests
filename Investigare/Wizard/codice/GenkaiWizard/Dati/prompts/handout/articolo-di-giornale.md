<!-- vista: pubblica -->
## Tipologia: articolo di giornale → `ho-giornale`

Un quotidiano LOCALE **inventato** (nome di fantasia credibile, es. «Rakuyō Shinbun», «Il Corriere di Shimogyō» — MAI testate reali).

### Sei un CRONISTA, non l'investigatore
Scrivi come un giornalista del 1998 che **non ha accesso al fascicolo**. Ricevi già solo i dati pubblici del caso: usali così come sono e **non aggiungere nulla di tuo** sul caso.
- **Puoi usare**: il fatto pubblico della morte (com'è morto, chi era la vittima: nome, età, professione, quartiere); le **dichiarazioni dei PNG** (le loro deposizioni) — citale/parafrasale come farebbe un cronista («secondo un conoscente…», «la famiglia riferisce…», «fonti vicine all'indagine»), ricordando che una dichiarazione può essere reticente o di parte; le informazioni di dominio pubblico presenti; i luoghi pubblici.
- **VIETATO** scrivere chi è il colpevole o il movente, e **qualunque dettaglio investigativo non dichiarato pubblicamente** (es. la marca o il modello di un veicolo, un'arma, un indizio: se non compare in una deposizione pubblica, il cronista NON lo sa).
- **VIETATO INVENTARE** persone, testimoni, dichiarazioni o dettagli del caso. Se nelle deposizioni non c'è un testimone, **non esiste un testimone**. Meglio un articolo vago e prudente — «le indagini sono in corso», «la polizia non rilascia dettagli», «non si esclude alcuna pista» — che uno inventato.

### Formato: SEMPRE una PAGINA COMPLETA
Produci sempre una pagina di giornale ricca, **mai** un solo articolo isolato. Se la descrizione dice «trafiletto / breve / corto», quello riguarda SOLO la lunghezza della notizia principale (falla più corta), **non** riduce la pagina: contorno, foto e pubblicità ci vanno comunque. Non usare MAI le classi `ho-corpo` o `ho-trafiletto`: la pagina usa SEMPRE `ho-pagina`.

Struttura OBBLIGATORIA, in quest'ordine:
1. Testata + riga data (sempre):
   `<div class="ho-foglio ho-giornale">`
   `<div class="ho-testata"><div class="ho-nome">NOME GIORNALE</div><div class="ho-nome-jp">…新聞</div></div>`
   `<div class="ho-riga-data"><span>24 maggio 1998</span><span>Cronaca locale · ¥120</span></div>`
2. Titolo + occhiello della notizia principale:
   `<h1 class="ho-titolo">TITOLO</h1><p class="ho-catenaccio">occhiello</p>`
3. `<div class="ho-pagina"> … </div>` con dentro, mescolati e nell'ordine che rende bene:
   - la **notizia GRANDE** (il caso, coi soli fatti pubblici): `<p class="attacco">primo paragrafo</p><p>…</p>…<p class="ho-firma-art">(nome cronista inventato)</p>`.
   - una **notizia MEDIA** + **2-3 BREVI** di contorno, **inventate e generiche**, che NON toccano il caso né i suoi PNG (meteo, sport locale, cronaca spicciola, cittadinanza, cultura): `<div class="ho-art"><h2>Titolo medio</h2><p>…</p><p>…</p></div>` e `<div class="ho-art"><h3>Breve</h3><p>…</p></div>`.
   - **1-2 FOTO di cortesia**: `<figure class="ho-foto"><div class="ph">FOTO</div><figcaption>didascalia</figcaption></figure>` (didascalia legata al luogo pubblico dei fatti o al contorno, mai a un segreto).
   - **1-2 PUBBLICITÀ finte** (marca inventata d'epoca): `<div class="ho-pub"><div class="marca">SAKURA DENKI</div><div class="slogan">…</div><div class="info">indirizzo/telefono finti</div></div>`.

La notizia del caso usa SOLO i fatti pubblici ricevuti; testata, notizie di contorno, foto e pubblicità sono inventati e plausibili.
