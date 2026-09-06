/* ═══════════════════════════════════════════════════════════════════════════════════════
   GENKAI 限界 — LO SCONTRO · motore condiviso della scena di combattimento «Un coltello in cucina»
   Usato dalla pagina a sé (/provalo/scontro/) e dal mini-caso (/provalo/, scena 8).

   Regole implementate = SOLO quelle decise (Investigare/Combattimento/GENKAI_Combattimento.md v3.1):
   · iniziativa 2d6 + mod.Presenza + velocità (+Tame): il totale BASSO agisce prima; a parità agisce prima
     chi ha più Presenza; a pari Presenza le azioni sono simultanee
   · attacco 2d6 (− Senmon − Tame − preparazione) ≤ attributo dell'arma, pari = colpito; danno = scarto + arma
   · difesa solo in Ukemi (l'azione che si converte in difesa, decisa prima del tiro avversario):
     2d6 ≤ attributo di difesa dell'arma che attacca; para lo scarto; 1 Ki = −2 (solo restando a Ki ≥ 1)
   · colpito prima di agire = azione persa (salvo Stringere i Denti: danno 1-2, paghi 1 punto dell'attributo)
   · critici nei due sensi: 1+1 = +1d6; 6+6 in attacco = mancato + imprevisto (tabella corpo a corpo)
   · MINACCIARE (velocità 0, solo voce): 2d6 ≤ Presenza → l'avversario è SCOSSO: al prossimo tiro d'iniziativa
     ritira il suo dado più basso e tiene il più alto. Non a ripetizione (non due scambi di fila); se fallisce,
     per il resto dello scontro non si minaccia più. Chi minaccia può comunque difendersi
   · FUORI TEMPO: iniziativa oltre 15 → in questo scambio non agisci; completi l'azione nel prossimo, dove la
     tua iniziativa è il dado migliore dei due e basta
   · regola opzionale del GM al Ki 0: il Ki si ferma a 0; un tiro su Distacco o Pazienza (a scelta) decide se
     il PG è vivo, a terra e fuori gioco
   · zone: arretrare = fuori portata (vicino); da lì uscire = fine dello scontro
   Scelte da GM della scena (non regole): il ragazzo è una comparsa con Ki 5, Pazienza 4, Presenza 6 (il Ki
   della demo è una scelta di scena, non segue la formula dei PNG); movimento e raccogliere l'arma valgono 2.

   API:  GenkaiScontro.copertina(el, opz)  disegna la copertina completa e il bottone d'avvio
         GenkaiScontro.avvia(opz)          avvia lo scontro dentro opz.flusso
         GenkaiScontro.schedaBreve(pg,nip) i due riquadri «Chi sei / Lui», in HTML
   opz = { flusso, stato:{pipsPg,numPg,pipsNip,numNip,kiPg}, pg:{attr,ki,kiMax,senmon}, nip?,
           immagine, rigioca:true|false, onFine(esito, kiPg) }   esito: vinto | fuga | morto | aterra
   ═══════════════════════════════════════════════════════════════════════════════════════ */
(function(){
"use strict";

/* dado vero (window.__dadoForzato è il gancio del banco di prova) e dado «di scena» per l'animazione */
const d6 = () => (typeof window.__dadoForzato === "function") ? window.__dadoForzato() : 1 + Math.floor(Math.random()*6);
const d6anim = () => 1 + Math.floor(Math.random()*6);
const MOD_P = {4:2, 5:1, 6:0, 7:-1, 8:-2, 9:-3, 10:-4};
/* la tabella parte da 4 (gli attributi nascono tra 4 e 9): sotto 4 vale la riga del 4, sopra 10 quella del 10 */
const modPresenza = p => MOD_P[Math.min(10, Math.max(4, p))];
const TETTO_FUORI_TEMPO = 15;
/* quanto è probabile fare "n o meno" con 2d6, a parole (niente percentuali: rompono la scena) */
const prob = n => n <= 3 ? "quasi impossibile" : n === 4 ? "difficile" : n === 5 ? "poco probabile" : n === 6 ? "possibile" : n === 7 ? "probabile" : n === 8 ? "molto probabile" : "quasi certo";
const caso = arr => arr[Math.floor(Math.random()*arr.length)];
const attesa = ms => new Promise(r => setTimeout(r, ms));
let contatoreId = 0;
const nuovoId = () => "gs" + (++contatoreId);

const ARMI = {
  manganello:{ nome:"manganello", attacco:"Silenzio", difesa:"Ascolto", estrarre:2, colpire:2, danno:2 },
  coltello:  { nome:"coltello",   attacco:"Pazienza", difesa:"Pazienza", estrarre:2, colpire:1, danno:2 },
  lotta:     { nome:"mani nude",  attacco:"Presenza", difesa:"Pazienza", estrarre:1, colpire:1, danno:1 },
};
const RAGAZZO = { nome:"il ragazzo", attr:{Distacco:5, Pazienza:4, Silenzio:5, Lucidità:5, Ascolto:5, Presenza:6}, ki:5, kiMax:5 };

/* tabella imprevisti 6+6 — colonna corpo a corpo (manuale, I Critici) */
const TAB66 = [
  { t:"il colpo taglia l'aria, plateale: l'avversario l'ha letto in anticipo", eff:null },
  { t:"la presa scivola: nel prossimo scambio l'arma conta come da sfoderare", eff:"sfodera" },
  { t:"chi ha tirato si sbilancia: l'avversario guadagna posizione", eff:null },
  { t:"l'arma cade di mano: raccoglierla costerà la prossima azione", eff:"cade" },
  { t:"la lama si incrina (o il bastone si spacca): al prossimo 6+6 si rompe", eff:"incrina" },
  { t:"l'arma si spezza: si resta a mani nude", eff:"rompe" },
];

/* narrativa breve — una riga, per immedesimarsi */
const TESTI = {
  luiColpisce:[ "La lama ti prende di striscio sull'avambraccio: brucia.", "Il coltello entra sotto la costola: il fiato se ne va.", "Un taglio sulla mano che regge il manganello: la presa vacilla." ],
  luiColpisceForte:[ "Il coltello affonda e tu senti le gambe farsi di carta.", "Ti prende in pieno: la cucina ondeggia." ],
  luiManca:[ "La lama fischia a un palmo dal tuo viso.", "Colpisce il vuoto, sbilanciato, e sbatte il gomito contro il frigo.", "Il coltello graffia il tavolo dove eri un attimo prima." ],
  tuColpisci:[ "Il manganello gli piomba sul polso: un grido secco.", "Lo prendi alla spalla: si piega di lato.", "Il colpo arriva sulla clavicola, e lo senti fin nel manico." ],
  tuColpisciForte:[ "Il manganello lo raggiunge alla tempia: le ginocchia gli cedono.", "Un colpo pieno sul braccio del coltello: qualcosa scricchiola." ],
  tuManchi:[ "Il manganello incontra solo l'aria — e l'anta di un pensile.", "Lui arretra di un passo: colpo corto.", "Sbatti il manganello sul tavolo: il rumore, e nient'altro." ],
  tuColpisciNudo:[ "Il pugno lo prende sullo zigomo: la testa gli va di lato.", "Lo afferri per il polso e glielo torci: il grido è vero." ],
  tuManchiNudo:[ "Il pugno passa a un dito dal suo mento.", "Provi la presa, ma lui si divincola come un gatto." ],
  ukemiOk:[ "Ti sposti di lato all'ultimo: la lama scivola via.", "Ruoti il busto e il coltello passa dove non sei più." ],
  ukemiNo:[ "Provi a scartare, ma sei lento: la lama ti trova.", "Il tuo passo indietro arriva un istante tardi." ],
  luiDichiara:[ "Il ragazzo stringe il coltello e ti punta: <b>attacca</b>.", "Il ragazzo fa mezzo passo avanti, la lama bassa, gli occhi sul tuo manganello: <b>attacca</b>.", "«Ti ho detto di stare indietro!» — e il coltello parte verso di te: <b>attacca</b>.", "Il ragazzo prende un respiro rotto, le spalle contro il frigo, e affonda: <b>attacca</b>." ],
  luiDichiaraFerito:[ "Sanguina, respira a bocca aperta, ma il coltello non lo molla: <b>attacca</b>.", "È bianco in faccia, la lama gli trema in mano — e parte lo stesso: <b>attacca</b>." ],
  luiDichiaraScosso:[ "Esita un istante — la tua voce gli è rimasta addosso — poi il coltello parte: <b>attacca</b>.", "Ha gli occhi lucidi, ma stringe il coltello e viene avanti: <b>attacca</b>." ],
  luiDichiaraNudo:[ "Senza più il coltello, il ragazzo ti si butta addosso a pugni: <b>attacca</b>.", "Il manico spezzato è a terra: viene avanti a mani nude, urlando: <b>attacca</b>." ],
  luiAvanza:[ "Il ragazzo gira attorno al tavolo e <b>ti viene dietro</b>, la lama avanti.", "«Dove vai?!» — scavalca la sedia rovesciata e <b>ti viene dietro</b>." ],
  luiRaccoglie:[ "Il ragazzo si butta a terra a cercare il coltello sotto il tavolo: <b>raccoglie l'arma</b>.", "Il ragazzo si tuffa sul coltello finito accanto al frigo: <b>raccoglie l'arma</b>." ],
  luiVuoto:[ "La lama affonda nell'aria, dove eri un attimo fa.", "Colpisce il vuoto e sbatte contro lo stipite." ],
  luiVuotoNudo:[ "Il pugno arriva dove non sei più.", "Si sbilancia in avanti e il pugno finisce contro lo stipite." ],
  perfettoTu:[ "Il manganello arriva esattamente dove volevi, con tutto il peso del corpo dietro.", "Un colpo solo, pulito, come in palestra: lo senti giusto prima ancora che arrivi." ],
  perfettoLui:[ "La lama trova il varco tra il braccio e il fianco: un colpo che non dovrebbe riuscirgli.", "Ti viene dentro col coltello come se sapesse dove sei scoperto." ],
  perfettoDifesaTu:[ "Leggi il colpo prima di lui: la lama trova solo l'aria dove eri.", "Un passo di lato e un giro di polso: il coltello scivola sul manganello e via." ],
  perfettoDifesaLui:[ "Alza l'avambraccio all'istante giusto: il manganello rimbalza via.", "Si abbassa sotto il colpo come se l'avesse visto arrivare da un minuto." ],
};
/* la scena di ogni imprevisto (1d6 → riga della tabella), per chi ha il manganello e per chi ha il coltello */
const IMPREVISTI_TU = [
  "Il manganello fende l'aria con un fischio che lo avverte: il colpo lui l'ha già letto.",
  "Il manganello ti gira nel palmo sudato: lo riprendi per il verso giusto, ma ci vuole un attimo.",
  "Ti sbilanci in avanti oltre il tavolo: per un attimo gli offri il fianco.",
  "Il manganello sbatte sullo spigolo del frigo e ti schizza di mano: rotola sotto il tavolo.",
  "Il colpo prende il bordo del lavello: il manganello vibra, e senti un crac secco — è crepato.",
  "Il manganello si spezza sul bordo del tavolo: ti resta un moncone in mano. Sei a mani nude.",
];
const IMPREVISTI_LUI = [
  "La lama passa così larga che gliela leggi in faccia.",
  "Il coltello gli scivola nella mano sudata: lo riafferra per la punta, poi per il manico.",
  "Affonda troppo e finisce col petto sul tavolo: per un attimo ti dà la schiena.",
  "Il coltello sbatte contro la tua manica e gli vola via: finisce sotto il tavolo.",
  "La lama urta il bordo del lavello e s'incrina: una scheggia salta via.",
  "La lama si spezza contro lo spigolo del tavolo: gli resta il manico in mano. È a mani nude.",
];
const IMPREVISTI_NUDO = [ "Il pugno finisce contro il muro: le nocche si aprono.", "Il colpo va a vuoto e il gomito sbatte sul tavolo.", "Uno scivolone sul pavimento bagnato: un attimo per ritrovare l'equilibrio." ];

/* ── scorrimento lento e controllato: un solo movimento alla volta, che si può interrompere col dito ── */
const motoRidotto = (typeof matchMedia === "function") && matchMedia("(prefers-reduced-motion: reduce)").matches;
let scorrimento = null;
function fermaScorrimento(){ if (scorrimento) { cancelAnimationFrame(scorrimento.id); const f = scorrimento.fine; scorrimento = null; f(); } }
addEventListener("touchstart", fermaScorrimento, {passive:true});
addEventListener("wheel", fermaScorrimento, {passive:true});
function scorriA(y, durata){
  const max = document.documentElement.scrollHeight - innerHeight;
  y = Math.max(0, Math.min(y, max));
  return new Promise(fine => {
    fermaScorrimento();
    if (motoRidotto || Math.abs(y - scrollY) < 2) { scrollTo(0, y); return fine(); }
    const y0 = scrollY, t0 = performance.now();
    const ease = t => t < .5 ? 2*t*t : -1 + (4 - 2*t)*t;
    const passo = ora => {
      const t = Math.min(1, (ora - t0) / durata);
      scrollTo(0, y0 + (y - y0) * ease(t));
      if (t < 1) scorrimento.id = requestAnimationFrame(passo); else { scorrimento = null; fine(); }
    };
    scorrimento = { id: requestAnimationFrame(passo), fine };
  });
}
const altezzaBarra = () => { const b = document.querySelector(".barra"); return (b ? b.offsetHeight : 0) + 10; };
/* gli ULTIMI DADI tirati non escono mai dallo schermo da soli: la pagina segue il testo solo finché
   restano visibili; oltre, scorre il lettore. Il vincolo cade solo a un nuovo taglio (una tua scelta) */
let ultimiDadi = null;
function inAlto(el){ ultimiDadi = null; return scorriA(el.getBoundingClientRect().top + scrollY - altezzaBarra(), 900); }
function segui(el){
  if (!el) return Promise.resolve();
  const r = el.getBoundingClientRect();
  if (r.bottom <= innerHeight - 16) return Promise.resolve();
  let y = scrollY + (r.bottom - innerHeight) + 28;
  if (ultimiDadi && ultimiDadi.isConnected) y = Math.min(y, ultimiDadi.getBoundingClientRect().top + scrollY - altezzaBarra());
  if (y <= scrollY + 2) return Promise.resolve();
  return scorriA(y, 900);
}

/* i «❓» si aprono al tocco (mai al passaggio del mouse) — un solo ascoltatore per pagina */
document.addEventListener("click", e => {
  const b = e.target.closest("[data-aiuto]");
  if (!b) return;
  const t = document.getElementById(b.dataset.aiuto);
  if (!t) return;
  t.hidden = !t.hidden;
  b.setAttribute("aria-expanded", String(!t.hidden));
});

/* ── mattoni indipendenti dallo scontro ── */
const scrivi = (el, html) => { el.insertAdjacentHTML("beforeend", html); segui(el.lastElementChild); };
const narr = (el, testo) => scrivi(el, `<p class="narr">${testo}</p>`);
const passo = (el, testo) => scrivi(el, `<p class="passo">${testo}</p>`);
const nomeDi = c => c.pg ? `<span class="chi">Tu</span>` : `<span class="chi lui">Lui</span>`;
function aiuto(el, domanda, risposta){
  const id = nuovoId();
  scrivi(el, `<div><button class="aiuto" type="button" data-aiuto="${id}" aria-expanded="false">❓ ${domanda}</button><div class="aiuto-testo" id="${id}" hidden>${risposta}</div></div>`);
}

async function tiraDadi(el, etichetta){
  const id = nuovoId();
  scrivi(el, `<div class="tiro"><div class="eti">${etichetta}</div><div class="dadi-riga"><span class="dado rotola" id="${id}a">·</span><span class="dado rotola" id="${id}b">·</span><span class="conto" id="${id}t"></span></div></div>`);
  const da = document.getElementById(id+"a"), db = document.getElementById(id+"b");
  ultimiDadi = el.classList.contains("ini2") ? el : da.closest(".tiro");
  const giro = setInterval(() => { da.textContent = d6anim(); db.textContent = d6anim(); }, 80);
  await attesa(500);
  clearInterval(giro);
  const a = d6(), b = d6();
  da.textContent = a; db.textContent = b;
  da.classList.remove("rotola"); db.classList.remove("rotola");
  if (a === 6 && b === 6) { da.classList.add("crit-male"); db.classList.add("crit-male"); }
  if (a === 1 && b === 1) { da.classList.add("crit-bene"); db.classList.add("crit-bene"); }
  return [a, b, document.getElementById(id+"t")];
}

/* scelta a bottoni; dopo il clic: il bottone resta evidenziato, sotto compare il TAGLIO con la scelta
   fatta e la pagina scorre piano fino a portarlo in cima — da lì in giù è quel che succede */
function scelta(el, opzioni, inRiga, opz){
  return new Promise(risolvi => {
    const box = document.createElement("div");
    box.className = "bottoni" + (inRiga ? " riga" : "");
    box.innerHTML = opzioni.map(o =>
      `<button type="button" class="btn${o.forte ? " btn-forte" : ""}" data-s="${o.v}"${o.off ? " disabled" : ""}>${o.testo}${o.sotto ? `<small>${o.sotto}</small>` : ""}</button>`).join("");
    el.appendChild(box);
    segui(box);
    box.querySelectorAll("button").forEach(b => b.addEventListener("click", async () => {
      box.querySelectorAll("button").forEach(x => { x.disabled = true; if (x !== b) x.classList.remove("btn-forte"); });
      b.classList.add("scelto");
      const etichetta = b.childNodes[0].textContent.trim();
      b.innerHTML = "✓ " + b.innerHTML;
      if (!(opz && opz.senzaTaglio)) {
        const taglio = document.createElement("div");
        taglio.className = "taglio";
        taglio.innerHTML = `<span>▼ ${etichetta}</span>`;
        box.insertAdjacentElement("afterend", taglio);
        await inAlto(taglio);
        await attesa(150);
      }
      risolvi(b.dataset.s);
    }));
  });
}

/* Senmon pertinente all'arma in mano: il grado si toglie dal tiro d'attacco (−1/−2/−3) */
function senmonDi(c){
  if (!c.senmon) return [null, 0];
  if (c.arma === ARMI.lotta) return ["Lotta", c.senmon["Lotta"] || 0];
  if (c.arma === ARMI.manganello || c.arma === ARMI.coltello) return ["Lame e bastoni", c.senmon["Lame e bastoni"] || 0];
  return [null, 0];
}
/* velocità dell'azione dichiarata (colonna Colpire / Estrarre, o scala delle azioni) */
function velocita(c){
  if (c.dich === "attacco") return c.daSfoderare ? c.arma.estrarre : c.arma.colpire;
  if (c.dich === "minaccia") return 0; /* è solo voce */
  return 2; /* arretro, esco, avanza, raccolgo: un movimento */
}
const etichettaVel = c => ({
  attacco: c.daSfoderare ? `${c.arma.nome} da riprendere in mano` : c.arma.nome,
  minaccia:"la minaccia: solo voce", arretro:"il movimento", esco:"il movimento", avanza:"il movimento", raccolgo:"raccogliere l'arma", aspetto:"restare fermo"
})[c.dich];
const etichettaDich = c => ({
  attacco: c.tame ? `${c.arma === ARMI.lotta ? "Attacco a mani nude" : "Attacco col " + c.arma.nome}, trattenendo il fiato` : (c.arma === ARMI.lotta ? "Attacco a mani nude" : `Attacco col ${c.arma.nome}`),
  minaccia:"Lo minaccio", arretro:"Arretro verso la porta", esco:"Esco e chiudo la porta", avanza:"Ti raggiunge", raccolgo:"Raccolgo il manganello", aspetto:"Resto fermo"
})[c.dich] || c.dich;

/* ═══════ I RIQUADRI «CHI SEI / LUI» (copertina e mini-caso) ═══════ */
function schedaBreve(pg, nip){
  nip = nip || RAGAZZO;
  const a = pg.attr, modP = modPresenza(a.Presenza);
  const lame = pg.senmon && pg.senmon["Lame e bastoni"], lotta = pg.senmon && pg.senmon["Lotta"];
  const pronto = modP > 0 ? `con ${a.Presenza} sei lento` : modP < 0 ? `con ${a.Presenza} sei pronto` : `con ${a.Presenza} sei nella media`;
  return `
  <div class="mecc">
    <span class="titolo">Chi sei — la tua scheda, in breve</span>
    <b>Ki ${pg.ki}${pg.kiMax && pg.kiMax !== pg.ki ? ` su ${pg.kiMax}` : ""}.</b> Il Ki è lo stato complessivo del tuo personaggio — fisico, mentale, emotivo insieme: non è la salute, è <b>quanto reggi</b>. In uno scontro i colpi lo consumano. <b>A 0 sei morto.</b>
    <ul>
      <li><b>Silenzio ${a.Silenzio}</b> — la calma interiore, non reagire d'impulso. È l'attributo con cui usi il <b>manganello</b>.</li>
      <li><b>Pazienza ${a.Pazienza}</b> — aspettare il momento giusto. È l'attributo con cui <b>schivi una lama</b>.</li>
      <li><b>Presenza ${a.Presenza}</b> — l'autorità che ispiri, farti prendere sul serio, intimidire. Con questa <b>minacci</b> — e decide quanto sei pronto a reagire: ${pronto}.</li>
      ${lame ? `<li><b>Lame e bastoni ${lame}</b> — la tua specializzazione: l'addestramento col manganello. Ogni volta che lo usi <b>togli ${lame} al tiro</b>, e tirare basso è meglio.${lotta ? ` Come ogni investigatore hai anche <b>Lotta ${lotta}</b>, l'accademia: vale per pugni e prese.` : ""}</li>` : ""}
    </ul>
  </div>
  <div class="mecc">
    <span class="titolo">Lui — il ragazzo col coltello</span>
    <b>Ki ${nip.ki}.</b> <b>Pazienza ${nip.attr.Pazienza}</b>: non sa aspettare, colpisce d'impulso (è l'attributo con cui usa il coltello). <b>Ascolto ${nip.attr.Ascolto}</b>: con questo legge l'arco del tuo manganello e prova a schivarlo. <b>Presenza ${nip.attr.Presenza}</b>: è più pronto di te.
  </div>`;
}

const AIUTI_INTRO = `
  <div>
    <button class="aiuto" type="button" data-aiuto="gs-a-tiro" aria-expanded="false">❓ Come si tira</button>
    <button class="aiuto" type="button" data-aiuto="gs-a-attr" aria-expanded="false">❓ Cosa sono gli attributi</button>
    <button class="aiuto" type="button" data-aiuto="gs-a-ki" aria-expanded="false">❓ Cos'è il Ki</button>
    <button class="aiuto" type="button" data-aiuto="gs-a-senmon" aria-expanded="false">❓ Cos'è una specializzazione</button>
    <div class="aiuto-testo" id="gs-a-tiro" hidden>In GENKAI si tirano sempre <b>due dadi a sei facce</b> e si sommano. Se il totale è <b>uguale o inferiore</b> all'attributo che stai usando, riesce. <b>Più stai sotto, meglio è</b>: nel combattimento quel margine diventa la precisione del colpo. Tutto ciò che ti aiuta — una specializzazione, il fiato trattenuto — <b>toglie punti al totale</b>.</div>
    <div class="aiuto-testo" id="gs-a-attr" hidden>I sei attributi di un investigatore (Distacco, Pazienza, Silenzio, Lucidità, Ascolto, Presenza) vanno da <b>4</b> (debole: ci fai fatica) a <b>9</b> (eccezionale). Non misurano i muscoli: sono <b>stati interiori</b> — come stai quando le cose si mettono male. Qui ne usi tre.</div>
    <div class="aiuto-testo" id="gs-a-ki" hidden>Il Ki 気 è la tua energia vitale: si consuma con la fatica, la pressione, i poteri — e in uno scontro con i colpi. Sotto <b>3</b> sei oltre il limite: se lo scontro finisse lì, crolleresti. Quel limite si chiama <b>Genkai</b> 限界, ed è il nome del gioco. In combattimento il danno non si ferma: <b>a Ki 0 si muore</b>.</div>
    <div class="aiuto-testo" id="gs-a-senmon" hidden>Le specializzazioni (in gioco: <b>Senmon</b>) sono le cose che il tuo personaggio ha imparato a fare bene — un'arma, una lingua, un mestiere. Hanno tre gradi, e ogni grado <b>toglie 1 al tiro</b> quando le usi. <b>Lame e bastoni</b> copre manganello, coltello, mazza e spada; <b>Lotta</b> copre pugni e prese, e la hanno tutti gli investigatori dall'accademia.</div>
  </div>`;

/* pallini del Ki senza animazione (copertina, prima che lo scontro parta) */
function disegnaPips(box, ki, max){
  if (!box) return;
  box.innerHTML = "";
  for (let i = 0; i < max; i++) { const s = document.createElement("span"); if (i >= ki) s.className = "vuoto"; box.appendChild(s); }
}

/* ═══════ LA COPERTINA (pagina a sé) ═══════ */
function copertina(el, opz){
  el.classList.add("gs");
  if (opz.stato) {
    const n = opz.nip || RAGAZZO;
    disegnaPips(opz.stato.pipsPg, opz.pg.ki, opz.pg.kiMax || opz.pg.ki);
    disegnaPips(opz.stato.pipsNip, n.ki, n.kiMax || n.ki);
    if (opz.stato.numPg) opz.stato.numPg.textContent = opz.pg.ki;
    if (opz.stato.numNip) opz.stato.numNip.textContent = n.ki;
  }
  el.innerHTML = `
  <figure class="quadro"><img src="${opz.immagine}" alt="Una mano stringe un coltello da cucina, nella penombra, accanto allo scolapiatti"></figure>
  <header class="testa">
    <p class="occhiello">Prova il combattimento di GENKAI · si impara giocando</p>
    <h1>Un coltello in cucina</h1>
  </header>
  <div class="intro">
    <p>Kyoto, 1997. Una cucina di due metri per tre, la luce al neon che frigge sopra il lavello. Sei un investigatore della Omicidi e stai per mettere le manette a un ragazzo di venticinque anni che ha appena smesso di ragionare: con uno scatto <b>afferra il coltello dal lavello</b> e te lo punta contro, la presa che trema. <em>«Stai indietro! STAI INDIETRO!»</em></p>
    <p>Hai il <b>manganello d'ordinanza</b> già in mano. Sei solo: i rinforzi sono a tre minuti, e tre minuti qui dentro sono un'eternità. Tra voi c'è un tavolo. Dietro di te, la porta.</p>
    ${schedaBreve(opz.pg, opz.nip)}
    ${AIUTI_INTRO}
    <div class="bottoni riga" style="margin-top:1rem"><button type="button" class="btn btn-forte" id="gs-inizia">Lo scontro comincia →</button></div>
  </div>`;
  el.querySelector("#gs-inizia").addEventListener("click", ev => { ev.target.disabled = true; avvia(opz); });
}

/* ═══════ LO SCONTRO ═══════ */
function avvia(opz){
  const flusso = opz.flusso;
  flusso.classList.add("gs", "flusso");
  const stato = opz.stato;
  const PG  = { nome:"TU", pg:true, attr: opz.pg.attr, ki: opz.pg.ki, kiMax: opz.pg.kiMax || opz.pg.ki, arma: ARMI.manganello, senmon: opz.pg.senmon || null };
  const n0 = opz.nip || RAGAZZO;
  const NIP = { nome: n0.nome, pg:false, attr: Object.assign({}, n0.attr), ki: n0.ki, kiMax: n0.kiMax || n0.ki, arma: ARMI.coltello };
  let N = 1, fascia = "contatto";
  ultimiDadi = null;

  /* ── stato in alto: i pallini del Ki ── */
  function pips(c, box){
    if (!box) return;
    const prima = box.children.length ? [...box.children].filter(s => !s.classList.contains("vuoto")).length : c.kiMax;
    const ora = Math.max(0, c.ki);
    box.innerHTML = "";
    for (let i = 0; i < c.kiMax; i++) {
      const s = document.createElement("span");
      if (i >= ora) { s.className = "vuoto" + (i < prima ? " perso" : ""); }
      box.appendChild(s);
    }
  }
  function aggiornaStato(){
    if (!stato) return;
    pips(PG, stato.pipsPg); pips(NIP, stato.pipsNip);
    if (stato.numPg) stato.numPg.textContent = Math.max(PG.ki, 0);
    if (stato.numNip) stato.numNip.textContent = Math.max(NIP.ki, 0);
    if (stato.kiPg) stato.kiPg.classList.toggle("genkai", PG.ki <= 3);
    if (typeof opz.onStato === "function") opz.onStato(PG.ki, NIP.ki);
  }
  function card(titolo){
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `<h3>${titolo}</h3>`;
    flusso.appendChild(el);
    return el;
  }

  /* ── un singolo scambio ── */
  async function scambio(){
    const el = card(`Scambio ${N}`);
    await inAlto(el);
    [PG, NIP].forEach(c => {
      c.completaFuoriTempo = !!c.fuoriTempo; c.fuoriTempo = false; /* l'azione sconfinata si completa adesso */
      if (!c.completaFuoriTempo) { c.dich = null; c.tame = 0; }
      c.agito = false; c.colpito = false; c.ukemi = false; c.spendiKi = false;
    });

    if (N === 1) scrivi(el, `<p class="regola">Uno scontro va a <b>scambi</b>. In ogni scambio: ① ognuno dice cosa fa · ② i dadi decidono <b>chi agisce per primo</b> · ③ si agisce, in quell'ordine.</p>`);

    /* ① dichiarazioni */
    if (N >= 2) scrivi(el, `<p class="regola">Tu Ki <b>${PG.ki}</b> · lui Ki <b>${Math.max(NIP.ki, 0)}</b>${fascia === "vicino" ? " · sei fuori dalla sua portata" : ""}${PG.raccogliere ? " · il tuo manganello è a terra" : ""}${PG.arma === ARMI.lotta ? " · sei a mani nude" : ""}</p>`);
    passo(el, "① Cosa fate");
    if (NIP.completaFuoriTempo) narr(el, `Il ragazzo completa quel che aveva cominciato: <b>${etichettaDich(NIP).toLowerCase()}</b>.`);
    else if (NIP.raccogliere) { NIP.dich = "raccolgo"; narr(el, caso(TESTI.luiRaccoglie)); }
    else if (fascia === "vicino") { NIP.dich = "avanza"; narr(el, caso(TESTI.luiAvanza)); }
    else { NIP.dich = "attacco";
      narr(el, NIP.arma === ARMI.lotta ? caso(TESTI.luiDichiaraNudo) : NIP.scosso ? caso(TESTI.luiDichiaraScosso) : NIP.ki <= 2 ? caso(TESTI.luiDichiaraFerito) : caso(TESTI.luiDichiara)); }

    if (PG.completaFuoriTempo) {
      scrivi(el, `<p><b>E tu?</b> Niente da decidere: completi l'azione dello scambio scorso — <b>${etichettaDich(PG)}</b>.</p>`);
    } else {
      scrivi(el, `<p><b>E tu?</b></p>`);
      const Pz = PG.attr.Presenza, A = PG.attr[PG.arma.attacco];
      const [senNome, sen] = senmonDi(PG);
      const conSen = sen ? ` −${sen} (${senNome})` : "";
      const urlo = NIP.arma === ARMI.lotta ? "«Fermo! Basta così!»" : "«Metti giù il coltello!»";
      const attaccoTesto = PG.arma === ARMI.lotta ? "Attacco a mani nude" : `Attacco col ${PG.arma.nome}`;
      const appena = PG.minacciaAppena; PG.minacciaAppena = false;
      const minacciaOff = PG.minacciaFallita || appena;
      const sottoMinaccia = PG.minacciaFallita ? "hai già provato e non ha funzionato: per questo scontro le parole sono finite"
        : appena ? "hai appena minacciato: la voce non fa effetto due volte di fila"
        : `tiro 2d6 ≤ Presenza ${Pz} — ${prob(Pz)}${Pz <= 5 ? ", la tua Presenza è bassa" : ""}. È solo voce: velocità 0, e se mi attacca posso comunque difendermi. Se riesce, al prossimo scambio lui parte in ritardo: ritira il dado più basso dell'iniziativa e tiene il peggiore`;
      let opzioni;
      if (PG.raccogliere) {
        opzioni = [
          { v:"raccolgo", forte:true, testo:"Raccolgo il manganello", sotto:"è a terra: recuperarlo mi costa l'azione di questo scambio" },
          { v:"minaccia", testo:`Lo minaccio — ${urlo}`, sotto:sottoMinaccia, off:minacciaOff },
        ];
      } else if (fascia === "contatto") {
        opzioni = [
          { v:"attacco", forte:true, testo:attaccoTesto, sotto:`tiro 2d6${conSen} ≤ ${PG.arma.attacco} ${A} — ${prob(A + sen)}. Se colpisco: danno ${PG.arma.danno} + quanto sto sotto` },
          { v:"minaccia", testo:`Lo minaccio — ${urlo}`, sotto:sottoMinaccia, off:minacciaOff },
          { v:"arretro", testo:"Arretro verso la porta", sotto:"esco dalla sua portata: se ci arrivo prima che colpisca, stavolta non mi prende" },
        ];
        if (N >= 2) opzioni.splice(1, 0, { v:"tame", testo:`${attaccoTesto}, trattenendo il fiato`, sotto:`in gioco: Tame. Agisco più tardi (+2 all'iniziativa) ma il colpo è più preciso: altri −2 al tiro — da ${prob(A + sen)} a ${prob(A + sen + 2)}` });
      } else {
        opzioni = [
          { v:"esco", forte:true, testo:"Esco e chiudo la porta", sotto:"fine dello scontro: aspetti i rinforzi dall'altra parte" },
          { v:"minaccia", testo:"Lo minaccio — «Fermo lì!»", sotto:sottoMinaccia, off:minacciaOff },
          { v:"aspetto", testo:"Resto fermo e lo aspetto", sotto:"non agisco: mi preparo. Il prossimo tiro che farò avrà −1" },
        ];
      }
      const s = await scelta(el, opzioni);
      PG.dich = s === "tame" ? "attacco" : s;
      PG.tame = s === "tame" ? 2 : 0;
      if (s === "tame") scrivi(el, `<p class="regola">«Trattengo il fiato, in Tame.» Il rischio: se ti colpiscono prima che agisci, il colpo non parte mai.</p>`);
    }

    /* ② iniziativa */
    passo(el, "② Chi è più veloce");
    if (N === 1) scrivi(el, `<p class="regola">Ognuno tira 2 dadi e somma: il modificatore di <b>Presenza</b> (chi ne ha di più è pronto prima) e la <b>velocità</b> di quel che fa (un coltello già in mano è più rapido di un manganello). <b>Il totale più basso agisce per primo.</b></p>`);
    if (PG.dich === "aspetto") { PG.ini = 99; scrivi(el, `<p class="regola">${nomeDi(PG)} non tiri: resti fermo, e ti prepari.</p>`); }
    const griglia = document.createElement("div"); griglia.className = "ini2"; el.appendChild(griglia);
    const esiti = await Promise.all([PG, NIP].filter(c => c.ki > 0 && c.dich !== "aspetto").map(c => tiraDadi(griglia, `${nomeDi(c)} iniziativa`).then(r => [c, ...r])));
    await attesa(700);
    for (const [c, a, b, t] of esiti) {
      if (c.completaFuoriTempo) {
        /* fuori tempo: due dadi, si tiene il migliore e basta */
        c.ini = Math.min(a, b);
        t.innerHTML = `${a} e ${b}: eri fuori tempo — tieni il dado migliore <b>e basta</b> = <b>${c.ini}</b>`;
        continue;
      }
      let sommaDadi = a + b, nota = "";
      if (c.scosso) {
        /* scosso da una minaccia: ritira il dado più basso e tiene il più alto */
        const basso = Math.min(a, b), alto = Math.max(a, b), r = d6();
        const tenuto = Math.max(basso, r);
        sommaDadi = alto + tenuto;
        nota = c.pg ? `, <b>scosso</b>: ritiri il ${basso} → ${r}, tieni il ${tenuto} → ${sommaDadi}`
                    : `, <b>scosso</b>: ritira il ${basso} → ${r}, tiene il ${tenuto} → ${sommaDadi}`;
        c.scosso = false;
      }
      const mod = modPresenza(c.attr.Presenza), vel = velocita(c);
      c.ini = sommaDadi + mod + vel + (c.tame || 0);
      t.innerHTML = `${a}+${b} = ${a+b}${nota}, ${mod >= 0 ? "+" + mod : mod} (Presenza ${c.attr.Presenza}${mod > 0 ? ": lento" : mod < 0 ? ": pronto" : ""}), +${vel} (${etichettaVel(c)})${c.tame ? `, +${c.tame} (trattieni il fiato)` : ""} = <b>${c.ini}</b>`;
      if (c.ini > TETTO_FUORI_TEMPO) {
        c.fuoriTempo = true;
        scrivi(el, `<p class="nota">⏳ <b>Fuori tempo</b>: ${c.pg ? "la tua" : "la sua"} iniziativa supera ${TETTO_FUORI_TEMPO} — ${c.pg ? "hai" : "ha"} perso troppo tempo. In questo scambio ${c.pg ? "non agisci" : "non agisce"}; nel prossimo ${c.pg ? "completerai" : "completerà"} l'azione agendo presto: due dadi, si tiene il migliore e basta.</p>`);
      }
    }
    /* il totale basso agisce prima; a parità, chi ha più Presenza; a pari Presenza: insieme */
    const ordine = [PG, NIP].filter(c => c.ki > 0).sort((x, y) => x.ini - y.ini || y.attr.Presenza - x.attr.Presenza);
    const attivi = ordine.filter(c => !c.fuoriTempo && c.dich !== "aspetto");
    const stessaIni = ordine.length > 1 && ordine[0].ini === ordine[1].ini && ordine[0].ini < 99;
    const pari = stessaIni && ordine[0].attr.Presenza === ordine[1].attr.Presenza;
    if (attivi.length === 0) scrivi(el, `<p class="verdetto">Nessuno agisce, in questo scambio.</p>`);
    else if (attivi.length === 1) scrivi(el, `<p class="verdetto">Agisce solo ${attivi[0].pg ? "<b>TU</b>" : "<b>LUI</b>"}.</p>`);
    else if (pari) scrivi(el, `<p class="verdetto"><b>Stessa iniziativa e stessa Presenza: agite nello stesso istante.</b></p>`);
    else if (stessaIni) scrivi(el, `<p class="verdetto"><b>Stessa iniziativa</b> (${ordine[0].ini} e ${ordine[1].ini}): agisce prima chi ha più Presenza — ${ordine[0].pg ? "<b>TU</b>" : "<b>LUI</b>"} (${ordine[0].attr.Presenza} contro ${ordine[1].attr.Presenza}).</p>`);
    else scrivi(el, `<p class="verdetto">Agisce prima ${ordine[0].pg ? "<b>TU</b>" : "<b>LUI</b>"} (${ordine[0].ini} contro ${ordine[1].ini}).${N === 1 ? " Meno fai coi dadi, prima ti muovi." : ""}</p>`);
    if (N === 1) { const mp = modPresenza(PG.attr.Presenza); aiuto(el, "Perché la Presenza conta nell'iniziativa", `In GENKAI <b>meno fai coi dadi, meglio è</b> — sempre. La Presenza ${PG.attr.Presenza} ti ${mp > 0 ? `aggiunge ${mp} all'iniziativa (quindi agisci dopo)` : mp < 0 ? `toglie ${-mp} all'iniziativa (agisci prima)` : "lascia l'iniziativa com'è"}; una Presenza 8 toglierebbe 2. Il manganello aggiunge 2, il coltello in mano solo 1: la lama è più rapida. E a parità di totale agisce prima chi ha più Presenza.`); }

    /* ③ azioni */
    await attesa(900);
    passo(el, "③ Le azioni");
    for (const c of ordine) {
      if (c.ki <= 0 || PG.ki <= 0 || NIP.ki <= 0) break;
      if (c.colpito && !pari) { scrivi(el, `<p>${nomeDi(c)} ${c.pg ? "Sei stato colpito prima di agire: <b>la tua azione è persa</b>." : "È stato colpito prima di agire: <b>la sua azione è persa</b>."}</p>`); continue; }
      if (c.ukemi) { scrivi(el, `<p>${nomeDi(c)} ${c.pg ? "Hai speso l'azione per difenderti: in questo scambio non fai altro." : "Ha speso l'azione per difendersi: non fa altro."}</p>`); continue; }
      if (c.fuoriTempo) { scrivi(el, `<p>${nomeDi(c)} ${c.pg ? "Fuori tempo: in questo scambio <b>non agisci</b>." : "Fuori tempo: in questo scambio <b>non agisce</b>."}</p>`); continue; }
      c.agito = true;

      if (c.dich === "minaccia") {
        const prep = c.preparato ? 1 : 0; c.preparato = false;
        const [ma, mb, mt] = await tiraDadi(el, `${nomeDi(c)} minacci (Presenza ${c.attr.Presenza})`);
        const tot = Math.max(2, ma + mb - prep);
        mt.innerHTML = `${ma}+${mb} = ${ma+mb}${prep ? ` −1 (preparato) = ${tot}` : ""} contro <b>${c.attr.Presenza}</b>: ${tot <= c.attr.Presenza ? "<b>riuscito</b>" : "fallito"}`;
        if (tot <= c.attr.Presenza) {
          NIP.scosso = true; c.minacciaAppena = true;
          narr(el, `La voce esce giusta, bassa e ferma: il ragazzo esita, la punta del coltello trema. <span class="parata">Nel prossimo scambio è scosso: all'iniziativa ritirerà il dado più basso e terrà il peggiore.</span>${c.attr.Presenza - tot >= 2 ? " Per un attimo sembra sul punto di posare il coltello: al tavolo lo deciderebbe il GM." : ""}`);
          scrivi(el, `<p class="regola">Non si minaccia a ripetizione: nel prossimo scambio la voce non farà effetto di nuovo.</p>`);
        } else {
          c.minacciaFallita = true;
          narr(el, "La voce ti esce troppo alta, incrinata: lui non sente altro che la propria paura.");
          scrivi(el, `<p class="regola">Non ha funzionato, e per questo scontro <b>le parole sono finite</b>: non minacci più.</p>`);
        }
        scrivi(el, `<p class="regola">Hai speso l'azione, ma la voce non ti scopre: se ti attacca, puoi ancora difenderti.</p>`);
        continue;
      }
      if (c.dich === "arretro") {
        fascia = "vicino";
        narr(el, "Fai due passi indietro, fino allo stipite della porta: <b>il coltello non ti arriva più</b>.");
        if (!NIP.agito && NIP.dich === "attacco") scrivi(el, `<p class="regola">Il suo attacco era già dichiarato, ma tu non sei più a portata: <b>colpirà il vuoto</b>.</p>`);
        continue;
      }
      if (c.dich === "esco") { return epilogo("fuga"); }
      if (c.dich === "aspetto") { c.preparato = true; scrivi(el, `<p class="regola">${nomeDi(c)} Non agisci: ti prepari. <b>−1 al tuo prossimo tiro.</b></p>`); continue; }
      if (c.dich === "avanza") { fascia = "contatto"; narr(el, "Ti raggiunge in due passi: siete di nuovo a portata di lama."); continue; }
      if (c.dich === "raccolgo") { c.raccogliere = false; narr(el, c.pg ? "Ti abbassi e recuperi il manganello: sei di nuovo armato." : "Si rialza col coltello in mano."); continue; }

      /* attacco */
      const bersaglio = c === NIP ? PG : NIP;
      if (c === NIP && fascia === "vicino") { narr(el, caso(NIP.arma === ARMI.lotta ? TESTI.luiVuotoNudo : TESTI.luiVuoto)); continue; }
      await attacco(c, bersaglio, el);
      aggiornaStato();
      if (PG.ki <= 0) return epilogo("morto");
    }

    aggiornaStato();
    if (NIP.ki <= 0) return epilogo("vinto");
    scrivi(el, `<p class="regola" style="margin-top:.8rem">Fine dello scambio ${N} — tu <b>Ki ${PG.ki}</b> · lui <b>Ki ${Math.max(NIP.ki, 0)}</b>.</p>`);
    if (N === 1) scrivi(el, `<p class="nota">Dal prossimo scambio hai un'opzione in più: <b>attaccare trattenendo il fiato</b> (in gioco si chiama <b>Tame</b>). Agisci più tardi, ma il colpo è più preciso: colpire passa da <b>${prob(PG.attr[PG.arma.attacco] + senmonDi(PG)[1])}</b> a <b>${prob(PG.attr[PG.arma.attacco] + senmonDi(PG)[1] + 2)}</b>.</p>`);
    if (PG.ki <= 3) scrivi(el, `<p class="nota">Ki ${PG.ki} — <b>sei oltre il limite</b>. In combattimento si va avanti: ma se lo scontro finisse adesso, crolleresti. È il <b>Genkai</b>.</p>`);
    await scelta(el, [{ v:"avanti", forte:true, testo:`Scambio ${N+1} →` }], true, {senzaTaglio:true});
    N++;
    scambio();
  }

  /* ── l'attacco (con Ukemi) ── */
  async function attacco(att, dif, el){
    if (!dif.agito && !dif.ukemi && dif.ki > 0) {
      if (dif.pg) {
        const box = document.createElement("div");
        box.className = "urgente";
        const attrD = dif.attr[att.arma.difesa];
        box.innerHTML = `<h4>${att.arma.nome === "mani nude" ? "Il pugno parte" : "La lama parte"} — non hai ancora agito</h4>
          <p>Decidi <b>adesso</b>, prima del suo tiro: tieni la tua azione e incassi, oppure ci rinunci per difenderti.${dif.fuoriTempo ? " (Se ti difendi, l'azione rimandata per il fuori tempo è spesa.)" : ""}</p>`;
        el.appendChild(box);
        await segui(box);
        const s = await scelta(box, [
          { v:"no", testo:`Tengo la mia azione`, sotto:"incasso senza difendermi; se il colpo non mi ferma, poi agisco" },
          { v:"si", testo:`Lascio l'azione e mi difendo`, sotto:`in gioco: Ukemi. Tiro 2d6 ≤ ${att.arma.difesa} ${attrD}, quanto sto sotto lo paro. L'azione è spesa` },
          { v:"ki", testo:`Mi difendo bruciando 1 Ki`, sotto:`come sopra, con −2 al tiro; il Ki non torna (ne ho ${dif.ki})`, off: dif.ki < 2 },
        ]);
        if (s !== "no") { dif.ukemi = true; dif.spendiKi = (s === "ki"); dif.fuoriTempo = false;
          narr(el, `«Vado in difensiva.» Lasci andare il colpo che avevi in mente${s === "ki" ? " — e ci metti dentro un pezzo di te" : ""}: ora conta solo non farti prendere.`); }
        else narr(el, PG.arma === ARMI.lotta ? "Tieni la posizione, i pugni alti: ti prendi il rischio." : "Tieni la posizione e il manganello alto: ti prendi il rischio.");
        if (N === 1) aiuto(el, "Perché non difendersi sempre", `Difendersi <b>costa l'azione</b>: se ti difendi, in questo scambio non colpisci. E chi ha <b>già agito</b> non può più difendersi: <i>prima agisci, prima ti scopri</i>. Per questo ci si difende solo quando il colpo arriva prima del tuo turno.`);
      } else if (dif.ki <= 2 && Math.random() < .5) {
        dif.ukemi = true; dif.fuoriTempo = false;
        narr(el, "Vede il colpo arrivare e si copre con le braccia: <b>rinuncia al suo colpo per difendersi</b>.");
      }
    } else if (dif.pg && dif.agito && dif.dich === "minaccia" && !dif.ukemi && dif.ki > 0) {
      /* chi ha minacciato può comunque difendersi: la voce non lo scopre */
      const box = document.createElement("div");
      box.className = "urgente";
      const attrD = dif.attr[att.arma.difesa];
      box.innerHTML = `<h4>${att.arma.nome === "mani nude" ? "Il pugno parte" : "La lama parte"} — hai minacciato, non attaccato: puoi difenderti</h4>
        <p>La voce non ti scopre: hai il tiro di difesa senza rinunciare a niente (2d6 ≤ ${att.arma.difesa} ${attrD}, quanto stai sotto lo pari). Vuoi anche bruciare 1 Ki?</p>`;
      el.appendChild(box);
      await segui(box);
      const s = await scelta(box, [
        { v:"si", testo:"Mi difendo", sotto:`tiro 2d6 ≤ ${att.arma.difesa} ${attrD}` },
        { v:"ki", testo:"Mi difendo bruciando 1 Ki", sotto:`−2 al tiro; il Ki non torna (ne ho ${dif.ki})`, off: dif.ki < 2 },
      ]);
      dif.ukemi = true; dif.spendiKi = (s === "ki");
      narr(el, "«Fermo!» — e intanto ti sposti: la voce non ti ha scoperto.");
    }

    const prep = att.preparato ? 1 : 0; att.preparato = false;
    const [senNome, sen] = senmonDi(att);
    const soglia = att.attr[att.arma.attacco];
    await attesa(600);
    const [a, b, t] = await tiraDadi(el, `${nomeDi(att)} ${att.pg ? "attacchi" : "attacca"} — ${att.arma.nome}, ${att.arma.attacco} ${soglia}`);
    const somma = a + b;
    const tiro = Math.max(2, somma - sen - (att.tame || 0) - prep);
    t.innerHTML = `${a}+${b} = ${somma}${sen ? ` −${sen} (${senNome})` : ""}${att.tame ? ` −${att.tame} (fiato trattenuto)` : ""}${prep ? ` −1 (preparato)` : ""}${(sen || att.tame || prep) ? ` = ${tiro}` : ""} contro <b>${soglia}</b>: ${tiro <= soglia && !(a === 6 && b === 6) ? "<b>colpito</b>" : "<b>mancato</b>"}`;

    if (a === 6 && b === 6) {
      const imp = d6(), chi = att.pg ? "Il tuo colpo" : "Il suo colpo";
      if (att.arma === ARMI.lotta) {
        scrivi(el, `<div class="critico"><h4>⚠ Doppio 6 — fallimento critico</h4><p>${chi} non solo manca: <b>succede un imprevisto</b> (1d6 = ${imp}).</p><p class="narr">${caso(IMPREVISTI_NUDO)}</p></div>`);
        return;
      }
      const riga = TAB66[imp-1];
      let eff = riga.eff, inPiu = "";
      if (att.incrinata && eff !== "rompe") { eff = "rompe"; inPiu = " L'arma era già incrinata: <b>si rompe</b>."; }
      const scena = eff === "rompe" ? (att.pg ? IMPREVISTI_TU[5] : IMPREVISTI_LUI[5]) : (att.pg ? IMPREVISTI_TU[imp-1] : IMPREVISTI_LUI[imp-1]);
      scrivi(el, `<div class="critico"><h4>⚠ Doppio 6 — fallimento critico</h4><p>${chi} non solo manca: <b>succede un imprevisto</b>. Tiro 1d6 = <b>${imp}</b>: ${riga.t}.${inPiu}</p><p class="narr">${scena}</p></div>`);
      if (eff === "sfodera") att.daSfoderare = true;
      if (eff === "cade") att.raccogliere = true;
      if (eff === "incrina") att.incrinata = true;
      if (eff === "rompe") { att.arma = ARMI.lotta; att.incrinata = false; }
      return;
    }
    att.daSfoderare = false;
    if (tiro > soglia) { narr(el, caso(att.pg ? (att.arma === ARMI.lotta ? TESTI.tuManchiNudo : TESTI.tuManchi) : TESTI.luiManca)); return; }

    let scarto = soglia - tiro, extra = 0;
    if (a === 1 && b === 1) { extra = d6(); scrivi(el, `<div class="critico buono"><h4>★ Doppio 1 — colpo perfetto</h4><p>${att.pg ? "Il tuo" : "Il suo"} colpo è perfetto: <b>+1d6 danni = +${extra}</b>.</p><p class="narr">${caso(att.pg ? TESTI.perfettoTu : TESTI.perfettoLui)}</p></div>`); }
    const inArrivo = scarto + att.arma.danno + extra;
    scrivi(el, `<p class="colpo">Colpito: precisione ${scarto} + ${att.arma.nome} ${att.arma.danno}${extra ? ` + ${extra} (critico)` : ""} = <b>${inArrivo} danni in arrivo</b>.</p>`);
    if (N === 1 && !el.dataset.precisione) { el.dataset.precisione = "1"; aiuto(el, "Cos'è la precisione", `È di quanto il tiro sta <b>sotto</b> l'attributo: attributo ${soglia} − tiro ${tiro}${(sen || att.tame || prep) ? " (i dadi, tolti i bonus)" : ""} = <b>${scarto}</b>. Più stai sotto, più il colpo è preciso — e la precisione si somma al danno dell'arma (${att.arma.nome}: ${att.arma.danno}).`); }

    let parata = 0;
    if (dif.ukemi) {
      const attrDif = dif.attr[att.arma.difesa];
      let bonus = 0;
      if (dif.spendiKi && dif.ki >= 2) { dif.ki -= 1; bonus = 2; aggiornaStato();
        scrivi(el, `<p class="nota">${dif.pg ? `Bruci 1 Ki (te ne restano ${dif.ki})` : `Brucia 1 Ki (gli restano ${dif.ki})`}: −2 al tiro di difesa.</p>`); }
      const prepD = dif.preparato ? 1 : 0; dif.preparato = false;
      await attesa(700);
      const [da, db, td] = await tiraDadi(el, `${nomeDi(dif)} ${dif.pg ? "ti difendi" : "si difende"} — ${att.arma.difesa} ${attrDif}`);
      const tiroD = Math.max(2, da + db - bonus - prepD);
      td.innerHTML = `${da}+${db} = ${da+db}${bonus ? ` −${bonus} (Ki)` : ""}${prepD ? ` −1 (preparato)` : ""}${(bonus || prepD) ? ` = ${tiroD}` : ""} contro <b>${attrDif}</b>: ${tiroD <= attrDif && !(da === 6 && db === 6) ? "<b>riuscito</b>" : "<b>fallito</b>"}`;
      if (da === 6 && db === 6) { scrivi(el, `<p class="regola">Doppio 6 in difesa: semplicemente fallita, niente imprevisti.</p>`); narr(el, caso(TESTI.ukemiNo)); }
      else if (tiroD <= attrDif) {
        parata = attrDif - tiroD;
        if (da === 1 && db === 1) { const ep = d6(); parata += ep; scrivi(el, `<div class="critico buono"><h4>★ Doppio 1 — parata perfetta</h4><p>${dif.pg ? "La tua" : "La sua"} difesa è perfetta: <b>+1d6 parato = +${ep}</b>.</p><p class="narr">${caso(dif.pg ? TESTI.perfettoDifesaTu : TESTI.perfettoDifesaLui)}</p></div>`); }
        scrivi(el, parata > 0 ? `<p class="parata">Difesa riuscita: pari ${parata} (${attrDif} − ${tiroD}${da === 1 && db === 1 ? " + critico" : ""}).</p>` : `<p class="parata">Difesa riuscita di misura (${attrDif} − ${tiroD}): non pari nulla.</p>`);
        if (dif.pg) narr(el, parata >= inArrivo ? caso(TESTI.ukemiOk) : parata > 0 ? "Devii la lama, ma non del tutto." : "Ti sposti, ma troppo poco: la lama ti trova comunque.");
      } else { scrivi(el, `<p class="regola">Difesa fallita: pari 0.</p>`); if (dif.pg) narr(el, caso(TESTI.ukemiNo)); }
    } else {
      scrivi(el, `<p class="regola">${dif.pg ? (dif.agito ? "Hai già agito: niente tiro di difesa — <i>prima agisci, prima ti scopri</i>." : "Non ti difendi: incassi.") : (dif.agito ? "Ha già agito: niente difesa." : "Non si difende: incassa.")}</p>`);
    }

    const netto = Math.max(0, inArrivo - parata);
    scrivi(el, `<p class="regola"><b>Danno ${inArrivo}${parata ? ` − ${parata} parati` : ""} = ${netto}</b> → ${dif.pg ? "il tuo" : "il suo"} Ki ${dif.ki} → <b>${Math.max(dif.ki - netto, 0)}</b></p>`);
    if (netto > 0) {
      dif.ki -= netto;
      dif.colpito = true;
      aggiornaStato();
      if (!dif.ukemi) narr(el, dif.pg ? caso(netto >= 4 ? TESTI.luiColpisceForte : TESTI.luiColpisce) : caso(att.arma === ARMI.lotta ? TESTI.tuColpisciNudo : (netto >= 4 ? TESTI.tuColpisciForte : TESTI.tuColpisci)));
      if (dif.ki <= 0) { narr(el, dif.pg ? "Il pavimento arriva prima del dolore." : (NIP.arma === ARMI.lotta ? "Scivola lungo il frigo e resta seduto, gli occhi aperti su niente: <b>è a terra, fuori combattimento</b>." : "Il coltello batte sul pavimento un attimo prima di lui: <b>è a terra, fuori combattimento</b>.")); return; }
      await stringereIDenti(dif, netto, el);
      if (dif.colpito && dif.fuoriTempo) { dif.fuoriTempo = false; scrivi(el, `<p class="regola">${dif.pg ? "Il colpo ti ferma: <b>l'azione rimandata è persa</b>." : "Il colpo lo ferma: <b>l'azione rimandata è persa</b>."}</p>`); }
    } else if (dif.ukemi) narr(el, dif.pg ? "Nemmeno un graffio." : "Il colpo gli arriva sulle braccia alzate: niente.");
  }

  /* Stringere i Denti: danno netto 1-2, azione non ancora fatta, attributo in uso > 4 */
  async function stringereIDenti(dif, netto, el){
    if (netto > 2 || dif.agito || dif.ukemi) return;
    const attrAzione = dif.dich === "minaccia" ? "Presenza" : (dif.dich === "attacco" ? dif.arma.attacco : null);
    if (!attrAzione || dif.attr[attrAzione] <= 4) return;
    const val = dif.attr[attrAzione];
    if (dif.pg) {
      const box = document.createElement("div");
      box.className = "urgente";
      box.innerHTML = `<h4>Il colpo è leggero — puoi stringere i denti</h4>
        <p>Un danno di 1 o 2 ti fermerebbe: la tua azione andrebbe persa. Puoi rifiutarti di fermarti pagando <b>1 punto di ${attrAzione}</b> (${val} → ${val-1} fino a domani): la tua azione parte comunque.</p>`;
      el.appendChild(box);
      await segui(box);
      const s = await scelta(box, [
        { v:"si", testo:"Stringo i denti", sotto:`${attrAzione} ${val} → ${val-1}, e agisco lo stesso` },
        { v:"no", testo:"Il colpo mi ferma", sotto:"la mia azione è persa; l'attributo resta intero" },
      ]);
      if (s === "si") { dif.attr[attrAzione] -= 1; dif.colpito = false; narr(el, `Stringi i denti: ${attrAzione} ${val} → <b>${val-1}</b>. Resti in piedi, e il tuo colpo parte.`); }
      else narr(el, "Il colpo ti piega: per questo scambio non fai altro.");
    } else if (Math.random() < .5) {
      dif.attr[attrAzione] -= 1; dif.colpito = false;
      narr(el, `Il ragazzo stringe i denti (${attrAzione} ${val} → ${val-1}): incassa e viene avanti lo stesso.`);
    }
  }

  /* ── epiloghi ── */
  async function epilogo(tipo){
    aggiornaStato();
    await attesa(1400); /* un respiro dopo l'ultimo colpo, prima del finale */
    const el = document.createElement("div");
    el.className = "epilogo " + (tipo === "vinto" ? "vinto" : tipo === "fuga" ? "fuga" : "perso");
    const [senNome, sen] = senmonDi(PG);
    const visto = `<div class="mecc"><span class="titolo">Cosa hai visto</span>
      <ul>
        <li>Si tira sempre 2d6: <b>somma ≤ attributo</b> = riuscito; quanto stai sotto è la <b>precisione</b></li>
        ${sen ? `<li>Le <b>specializzazioni</b> (Senmon) tolgono 1 al tiro per grado: la tua ${senNome} ${sen} ha contato a ogni colpo</li>` : ""}
        <li>Ogni scambio: dichiari · <b>iniziativa</b> (2d6 + Presenza + velocità, il basso agisce prima; a parità chi ha più Presenza) · azioni</li>
        <li>Colpito prima di agire = <b>azione persa</b> (salvo stringere i denti)</li>
        <li>Difendersi = rinunciare all'azione (<b>Ukemi</b>), deciso prima del tiro avversario; chi ha già agito non si difende</li>
        <li><b>Minacciare</b> è solo voce: se riesce l'avversario parte in ritardo al prossimo scambio, e tu puoi ancora difenderti; non si ripete di fila, e se fallisce le parole sono finite</li>
        <li><b>Tame</b>: trattenere il fiato — più tardi, ma più preciso (oltre 15 di iniziativa sei <b>fuori tempo</b>: agisci nel prossimo scambio)</li>
        <li>Il <b>Ki</b> è vita ed energia insieme: a 0 si muore; sotto 3 c'è il <b>Genkai</b></li>
      </ul></div>`;
    if (tipo === "vinto") {
      el.innerHTML = `<h3>✓ È finita</h3>
        <p>Lo giri a pancia in giù col ginocchio sulla schiena, le manette che si chiudono due volte. Nella cucina resta solo il tuo respiro grosso, il neon che frigge — e le sirene dei rinforzi, adesso che non servono più.</p>
        <p class="regola">Chiudi lo scontro con <b>Ki ${PG.ki}</b> su ${PG.kiMax}.${PG.ki <= 3 ? " <b>Sei oltre il limite</b>: ora che cala il silenzio, il Genkai ti aspetta — il crollo che dà il nome al gioco." : " Il conto, stavolta, è leggero."}</p>
        <p class="regola">Lui è a Ki 0: un personaggio del GM a zero è <b>fuori combattimento</b> — KO, resa, fuga: lo decide la scena. Per te, invece, a Ki 0 si muore.</p>` + visto;
      flusso.appendChild(el);
    } else if (tipo === "fuga") {
      el.innerHTML = `<h3>La porta tra voi</h3>
        <p>Esci nel corridoio e chiudi la porta: la lama batte due volte sul legno, poi silenzio. Ti appoggi al muro col manganello ancora in mano e ascolti le sirene avvicinarsi. Nessuno si è fatto male.</p>
        <p class="regola">In GENKAI <b>andarsene è spesso la mossa migliore</b>: il combattimento è raro e non perdona. Chiudi con <b>Ki ${PG.ki}</b> su ${PG.kiMax}.${PG.ki <= 3 ? " Sei comunque oltre il limite: il Genkai ti aspetta." : ""}</p>` + visto;
      flusso.appendChild(el);
    } else {
      /* Ki 0: regola base = morto; regola opzionale del GM = un tiro su Distacco o Pazienza per restare vivo, a terra */
      el.innerHTML = `<h3>☠ Ki 0 — a terra</h3>
        <p>La lama trova il punto sbagliato e la cucina si spegne come una radio. In GENKAI il combattimento non perdona: era la scena da evitare — o da chiudere prima.</p>
        <p class="regola">Il Ki si ferma a 0: il danno in più non conta. <b>Regola base:</b> a Ki 0 si muore. <b>Regola opzionale, del GM:</b> un tiro su <b>Distacco</b> (restare lucidi, non farsi travolgere) o su <b>Pazienza</b> (sopportare senza cedere), a scelta di chi gioca: se riesce sei vivo — ma a terra, fuori gioco.</p>`;
      flusso.appendChild(el);
      const box = document.createElement("div");
      box.className = "urgente";
      box.innerHTML = `<h4>Qui il GM sei tu: applichi la regola opzionale?</h4>`;
      el.appendChild(box);
      const s = await scelta(box, [
        { v:"Distacco", testo:`Tiro su Distacco ${PG.attr.Distacco}`, sotto:`non farmi travolgere — ${prob(PG.attr.Distacco)}` },
        { v:"Pazienza", testo:`Tiro su Pazienza ${PG.attr.Pazienza}`, sotto:`sopportare senza cedere — ${prob(PG.attr.Pazienza)}` },
        { v:"no", testo:"No: a Ki 0 si muore", sotto:"la regola base" },
      ], false, {senzaTaglio:true});
      if (s !== "no") {
        const [a, b, t] = await tiraDadi(el, `${nomeDi(PG)} ${s} ${PG.attr[s]} — resti vivo?`);
        const tot = a + b;
        t.innerHTML = `${a}+${b} = ${tot} contro <b>${PG.attr[s]}</b>: ${tot <= PG.attr[s] ? "<b>vivo</b>" : "<b>no</b>"}`;
        if (tot <= PG.attr[s]) {
          tipo = "aterra";
          el.querySelector("h3").textContent = "Ki 0 — a terra, vivo";
          narr(el, "Il pavimento è freddo e il neon ti gira sopra. Respiri. Non puoi muoverti, non puoi fare niente — ma respiri.");
          scrivi(el, `<p class="regola">Sei <b>vivo, a terra e fuori gioco</b>: quel che succede adesso lo decidono gli altri.</p>`);
        } else narr(el, "I dadi dicono no. La cucina si spegne.");
      } else narr(el, "Vale la regola base: la cucina si spegne.");
      scrivi(el, `<p class="regola">Riprova: stavolta sai cosa costa ogni scelta. La porta era lì.</p>` + visto);
    }
    if (opz.rigioca !== false) el.insertAdjacentHTML("beforeend", `<div class="bottoni riga"><button type="button" class="btn btn-forte" data-rigioca="1">↻ Rigioca lo scontro</button></div>`);
    flusso.classList.add("fine");
    const rg = el.querySelector("[data-rigioca]");
    if (rg) rg.addEventListener("click", () => location.reload());
    segui(el.firstElementChild); /* il titolo del finale entra in vista, l'ultimo colpo resta sopra */
    if (typeof opz.onFine === "function") opz.onFine(tipo, Math.max(PG.ki, 0), el);
  }

  aggiornaStato();
  scambio();
}

window.GenkaiScontro = { avvia, copertina, schedaBreve, RAGAZZO };
})();
