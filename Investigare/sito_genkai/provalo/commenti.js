/* GENKAI — modulo commenti (condiviso da /provalo e /provalo/scontro).
   GenkaiCommenti.monta(el, { pagina, extra })  → disegna il modulo in fondo alla pagina.
   Invio: POST /api/commenti (endpoint del sito) → email a chi fa il gioco + copia sul server.
   Se l'invio non è possibile (pagina aperta da file, rete giù) resta il collegamento per scrivere a mano. */
(function(){
"use strict";
const MAIL = "info@genkai.it";

function monta(el, opz){
  opz = opz || {};
  el.classList.add("commenti");
  el.innerHTML = `
    <h2>Dimmi cosa ne pensi</h2>
    <p>Cosa non si capiva, cosa ti è piaciuto, dove ti sei perso: due righe bastano. Arrivano direttamente a chi sta scrivendo GENKAI. Nome ed email sono facoltativi — servono solo se vuoi una risposta.</p>
    <form novalidate>
      <label for="c-testo">Il tuo commento</label>
      <textarea id="c-testo" name="testo" maxlength="4000" required placeholder="Scrivi qui…"></textarea>
      <div class="due">
        <div><label for="c-nome">Nome (facoltativo)</label><input id="c-nome" name="nome" maxlength="80" autocomplete="name"></div>
        <div><label for="c-email">Email (facoltativa)</label><input id="c-email" name="email" type="email" maxlength="120" autocomplete="email"></div>
      </div>
      <div class="trappola" aria-hidden="true"><label>Sito<input name="sito" tabindex="-1" autocomplete="off"></label></div>
      <button type="submit" class="invia">Invia il commento</button>
      <div class="esito" hidden></div>
    </form>`;
  const form = el.querySelector("form"), esito = el.querySelector(".esito"), bottone = el.querySelector(".invia");

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const testo = form.testo.value.trim();
    if (testo.length < 3) { mostra("Scrivi almeno due parole.", true); form.testo.focus(); return; }
    const dati = {
      pagina: opz.pagina || location.pathname,
      testo, nome: form.nome.value.trim(), email: form.email.value.trim(), sito: form.sito.value,
      esito: opz.extra ? String(opz.extra() || "") : ""
    };
    bottone.disabled = true; bottone.textContent = "Invio…";
    try {
      if (location.protocol === "file:") throw new Error("pagina locale");
      const r = await fetch("/api/commenti", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(dati) });
      if (r.status === 429) throw new Error("troppi");
      if (!r.ok) throw new Error("server " + r.status);
      form.reset();
      bottone.textContent = "Inviato ✓";
      mostra("Grazie: il commento è arrivato.", false);
    } catch (err) {
      bottone.disabled = false; bottone.textContent = "Invia il commento";
      const corpo = encodeURIComponent(testo + (dati.nome ? "\n\n— " + dati.nome : "") + "\n\n(pagina: " + dati.pagina + ")");
      const oggetto = encodeURIComponent("Commento su genkai.it — " + dati.pagina);
      mostra((err.message === "troppi" ? "Hai già inviato molti commenti oggi. " : "Non sono riuscito a inviarlo da qui. ") +
        `Puoi mandarlo per email: <a href="mailto:${MAIL}?subject=${oggetto}&body=${corpo}">scrivi a ${MAIL}</a>.`, true);
    }
  });
  function mostra(html, male){ esito.hidden = false; esito.classList.toggle("male", !!male); esito.innerHTML = html; }
}

window.GenkaiCommenti = { monta };
})();
