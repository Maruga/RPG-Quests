// GENKAI Wizard — motore client: stato, binding, liste, 🎲, ✨, autosave.
(() => {
    "use strict";
    const S = WIZ.stato && typeof WIZ.stato === "object" ? WIZ.stato : {};
    const bibCache = {};
    let salvaTimer = null;

    // Modello AI + ragionamento usati da TUTTI i pulsanti ✨ (persistiti nel browser).
    // Un unico punto: i menù nell'header li cambiano; il server valida entrambi contro una whitelist
    // e ignora l'effort sui modelli che non lo supportano (Haiku).
    const MODELLO_DEFAULT = "claude-opus-5";
    const EFFORT_DEFAULT = "high";
    const modelloAI = () => localStorage.getItem("wizModelAI") || MODELLO_DEFAULT;
    const effortAI = () => localStorage.getItem("wizEffortAI") || EFFORT_DEFAULT;

    // ───────────────────────── stato: get/set/salva ─────────────────────────
    const get = (path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), S);
    const set = (path, val) => {
        const parti = path.split(".");
        let o = S;
        for (let i = 0; i < parti.length - 1; i++) {
            if (o[parti[i]] == null || typeof o[parti[i]] !== "object") o[parti[i]] = {};
            o = o[parti[i]];
        }
        o[parti[parti.length - 1]] = val;
        salvaDebounce();
    };
    const lista = (path) => {
        let a = get(path);
        if (!Array.isArray(a)) { a = []; set(path, a); }
        return a;
    };

    const indicatore = document.getElementById("wz-salvato");
    let salvataggioSospeso = false; // scritture in attesa del debounce, non ancora spedite
    function salvaDebounce() {
        if (WIZ.demo) return;
        salvataggioSospeso = true;
        if (indicatore) { indicatore.textContent = "○"; indicatore.className = "wz-salvato attesa"; }
        clearTimeout(salvaTimer);
        salvaTimer = setTimeout(salvaOra, 800);
    }
    // Se si cambia pagina PRIMA degli 800ms del debounce, gli ultimi tasti andrebbero persi
    // (il testo si "spezza" all'ultimo salvataggio riuscito): il flush spedisce lo stato
    // con sendBeacon, che sopravvive alla navigazione. Vale per OGNI campo del wizard.
    function flushSalvataggio() {
        if (!salvataggioSospeso || WIZ.demo) return;
        clearTimeout(salvaTimer);
        salvataggioSospeso = false;
        const corpo = new Blob([JSON.stringify({ statoJson: JSON.stringify(S) })], { type: "application/json" });
        navigator.sendBeacon(`/api/progetti/${WIZ.id}/stato`, corpo);
    }
    window.addEventListener("pagehide", flushSalvataggio);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flushSalvataggio(); });
    async function salvaOra(passoCorrente) {
        if (WIZ.demo) return;
        salvataggioSospeso = false;
        try {
            const r = await fetch(`/api/progetti/${WIZ.id}/stato`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    statoJson: JSON.stringify(S),
                    passoCorrente: passoCorrente ?? null,
                    titolo: document.getElementById("wz-titolo")?.value ?? null
                })
            });
            if (indicatore) {
                indicatore.textContent = "●";
                indicatore.className = r.ok ? "wz-salvato ok" : "wz-salvato errore";
            }
        } catch {
            if (indicatore) { indicatore.textContent = "●"; indicatore.className = "wz-salvato errore"; }
        }
    }

    // ───────────────────────── biblioteche ─────────────────────────
    async function lib(nome) {
        if (!bibCache[nome])
            bibCache[nome] = fetch(`/api/biblioteca/${nome}`).then(r => r.json());
        return bibCache[nome];
    }
    const perId = (arr, id) => (arr || []).find(x => x.id === id);

    // ───────────────────────── cast ─────────────────────────
    const cast = () => lista("cast");
    const persona = (id) => cast().find(p => p.id === id);
    const nomePieno = (p) => p ? `${p.cognome} ${p.nome}` : "?";
    // ritratto della persona (dalla sua scheda) → miniatura per le pillole/tag, dove c'è
    const fotoDi = (id) => (lista("passo8.schede").find(s => s.personaId === id) || {}).foto || "";
    const fotoMini = (id) => { const f = fotoDi(id); return f ? `<img class="wz-chip-foto" src="${f}" alt="" />` : ""; };
    const nuovoId = (pref) => pref + Math.random().toString(36).slice(2, 8);
    const nomiOccupati = () => cast().map(nomePieno).join("|");

    async function generaNomi(genere, eta, quanti, cognomeFisso) {
        const q = new URLSearchParams({ genere, eta: String(eta || 40), quanti: String(quanti || 1), occupati: nomiOccupati() });
        if (cognomeFisso) q.set("cognome", cognomeFisso);
        const r = await fetch(`/api/nomi?${q}`);
        if (!r.ok) throw new Error("Generazione nome fallita");
        return r.json();
    }
    const generaNome = async (genere, eta, cognomeFisso) => (await generaNomi(genere, eta, 1, cognomeFisso))[0];

    async function verificaNome(cognome, nome, escludiPersonaId) {
        const occ = cast().filter(p => p.id !== escludiPersonaId).map(nomePieno).join("|");
        const q = new URLSearchParams({ cognome, nome, occupati: occ });
        const r = await fetch(`/api/nomi/verifica?${q}`);
        return r.ok ? r.json() : { libero: true, motivo: null, kanji: "" };
    }

    // ───────────────── nomi: inserimento col click + propagazione dei rename ─────────────────
    // Regola: nei testi i nomi restano TESTO SEMPLICE (leggibile in export/AI/handout).
    // 1) click su un nome nel riassunto → inserito nel campo di testo dove stavi scrivendo;
    // 2) se una persona viene rinominata, il vecchio nome viene sostituito col nuovo in TUTTI i testi.
    let campoAttivo = null;
    document.addEventListener("focusin", (e) => {
        const el = e.target;
        if ((el.tagName === "TEXTAREA" || (el.tagName === "INPUT" && el.type === "text")) && !el.closest("#wz-drawer"))
            campoAttivo = el;
    });
    document.addEventListener("click", (e) => {
        const n = e.target.closest(".wz-nome-ins");
        if (!n) return;
        if (!campoAttivo || !document.contains(campoAttivo)) return;
        const nome = n.dataset.nome || n.textContent.trim();
        const inizio = campoAttivo.selectionStart ?? campoAttivo.value.length;
        const fine = campoAttivo.selectionEnd ?? inizio;
        const prima = campoAttivo.value.slice(0, inizio);
        const spazio = prima && !/\s$/.test(prima) ? " " : "";
        campoAttivo.value = prima + spazio + nome + campoAttivo.value.slice(fine);
        const pos = inizio + spazio.length + nome.length;
        campoAttivo.setSelectionRange?.(pos, pos);
        campoAttivo.dispatchEvent(new Event("input", { bubbles: true }));
        campoAttivo.focus();
    });

    // sostituisce "vecchio nome" → "nuovo nome" in ogni stringa dello stato (a parola intera; salta id e campi tecnici)
    function propagaRinomina(vecchio, nuovo) {
        vecchio = (vecchio || "").trim();
        nuovo = (nuovo || "").trim();
        if (!vecchio || !nuovo || vecchio === nuovo || vecchio.length < 3) return 0;
        const rx = new RegExp("(?<![\\p{L}\\p{N}])" + vecchio.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "gu");
        const salta = (k) => k === "id" || k.endsWith("Id") || k.endsWith("Ids") || k === "kanji";
        let toccati = 0;
        const walk = (o) => {
            if (Array.isArray(o)) {
                o.forEach((v, i) => {
                    if (typeof v === "string") { const s = v.replace(rx, nuovo); if (s !== v) { o[i] = s; toccati++; } }
                    else if (v && typeof v === "object") walk(v);
                });
                return;
            }
            for (const k of Object.keys(o || {})) {
                const v = o[k];
                if (typeof v === "string") { if (salta(k)) continue; const s = v.replace(rx, nuovo); if (s !== v) { o[k] = s; toccati++; } }
                else if (v && typeof v === "object") walk(v);
            }
        };
        walk(WIZ.stato);
        if (toccati) { salvaDebounce(); aggiornaCampiDaStato(); }
        return toccati;
    }

    // riallinea i campi visibili allo stato (dopo una propagazione), senza toccare il campo in cui si sta scrivendo
    function aggiornaCampiDaStato() {
        document.querySelectorAll("textarea[data-campo], input[type=text][data-campo]").forEach(el => {
            if (el === document.activeElement) return;
            const v = get(el.dataset.campo);
            if (typeof v === "string" && el.value !== v) el.value = v;
        });
        document.querySelectorAll("[data-lista]").forEach(c => { renderLista(c); });
        buildRiassunto();
    }

    // cattura del "vecchio nome" quando si entra in un campo-nome, propagazione al blur se è cambiato
    const personaDiCampoNome = (el) => {
        if (el.dataset?.rigaCampo === "cast.cognome" || el.dataset?.rigaCampo === "cast.nome") {
            const cont = el.closest("[data-lista]");
            if (cont) return persona((lista(cont.dataset.lista)[+el.dataset.i] || {}).personaId);
        }
        if (el.dataset?.colp === "cognome" || el.dataset?.colp === "nome") return persona(el.dataset.pid);
        if (el.id === "wz-vitt-cognome" || el.id === "wz-vitt-nome") return persona(get("passo2.personaId"));
        return null;
    };
    const gruppoDiCampoNome = (el) =>
        el.dataset?.rigaCampo === "nome" && el.closest("[data-lista='gruppi']")
            ? lista("gruppi")[+el.dataset.i] : null;
    document.addEventListener("focusin", (e) => {
        const p = personaDiCampoNome(e.target);
        if (p) { e.target.dataset.vecchioNome = nomePieno(p); return; }
        const g = gruppoDiCampoNome(e.target);
        if (g) e.target.dataset.vecchioNome = g.nome || "";
    });
    document.addEventListener("focusout", (e) => {
        const p = personaDiCampoNome(e.target);
        const g = p ? null : gruppoDiCampoNome(e.target);
        if (!p && !g) return;
        const vecchio = e.target.dataset.vecchioNome || "";
        const nuovo = p ? nomePieno(p) : (g.nome || "");
        if (vecchio && nuovo && vecchio !== nuovo) propagaRinomina(vecchio, nuovo);
    });

    // ───────────────────────── binding [data-campo] ─────────────────────────
    function bindCampi() {
        document.querySelectorAll("[data-campo]").forEach(el => {
            if (el.dataset.opzioni !== undefined || el.dataset.opzioniDinamiche !== undefined) return; // gestiti da riempiOpzioni/initSottotipi (con "Altro…")
            const path = el.dataset.campo;
            const val = get(path);
            if (el.type === "checkbox") {
                el.checked = !!val;
                el.addEventListener("change", () => set(path, el.checked));
            } else if (el.type === "radio") {
                if (String(val) === el.value) el.checked = true;
                el.addEventListener("change", () => { if (el.checked) set(path, isNaN(+el.value) ? el.value : +el.value); });
            } else {
                if (val != null) el.value = val;
                el.addEventListener("input", () => set(path, el.type === "number" ? +el.value : el.value));
            }
        });
        const titolo = document.getElementById("wz-titolo");
        if (titolo) titolo.addEventListener("input", salvaDebounce);
    }

    // select con opzioni da biblioteca: data-opzioni="lib:file:percorso:idCampo:labelCampo[:descCampo]"
    // se descCampo è indicato, l'opzione mostra "Nome — descrizione" (per capire PRIMA di scegliere).
    // REGOLA: le biblioteche propongono, mai obbligano — ogni select ha "✏️ Altro" con campo libero.
    function applicaOpzioniConCustom(el, opzioniHtml) {
        const path = el.dataset.campo;
        el.innerHTML = `<option value="">—</option>` + opzioniHtml +
            `<option value="__custom">✏️ Altro — lo scrivo io</option>`;

        // campo libero accanto (creato una sola volta)
        let input = el.nextElementSibling;
        if (!input || !input.classList || !input.classList.contains("wz-custom-input")) {
            input = document.createElement("input");
            input.type = "text";
            input.className = "wz-custom-input";
            input.placeholder = "Scrivi qui il tuo…";
            el.insertAdjacentElement("afterend", input);
            input.addEventListener("input", () => { set(path, input.value); aggiornaInfo(); });
            el.addEventListener("change", () => {
                if (el.value === "__custom") {
                    input.hidden = false;
                    set(path, input.value);
                    input.focus();
                } else {
                    input.hidden = true;
                    set(path, el.value);
                }
                aggiornaInfo();
            });
        }

        // stato iniziale: id di biblioteca → select; testo libero → "Altro" + input
        const val = get(path);
        const eLibId = val && Array.from(el.options).some(o => o.value === val && o.value !== "__custom");
        if (val && !eLibId) { el.value = "__custom"; input.value = val; input.hidden = false; }
        else { if (val) el.value = val; input.hidden = true; }
    }

    async function riempiOpzioni() {
        for (const el of document.querySelectorAll("[data-opzioni]")) {
            const [, file, percorso, idC, labC, descC] = el.dataset.opzioni.split(":");
            const dati = await lib(file);
            const arr = inOrdine(dati[percorso] || [], x => x[labC]);
            const opzioni = arr.map(x => {
                const desc = descC && x[descC] ? ` — ${x[descC]}` : "";
                return `<option value="${x[idC]}">${x[labC]}${desc}</option>`;
            }).join("");
            applicaOpzioniConCustom(el, opzioni);
        }
    }

    // pannelli info: data-info="file:percorso:campoStato"
    async function aggiornaInfo() {
        for (const el of document.querySelectorAll("[data-info]")) {
            const [file, percorso, campoStato] = el.dataset.info.split(":");
            const id = get(campoStato);
            if (!id) { el.innerHTML = ""; continue; }
            const dati = await lib(file);
            const voce = perId(dati[percorso], id);
            if (!voce) { el.innerHTML = ""; continue; }
            let html = "";
            (el.dataset.infoCampi || "").split(",").filter(Boolean).forEach(c => {
                if (voce[c]) html += `<p><strong>${c}</strong>: ${voce[c]}</p>`;
            });
            const ogg = el.dataset.infoOggetto;
            if (ogg && voce[ogg]) html += "<ul>" + Object.entries(voce[ogg]).map(([k, v]) => `<li><strong>${k}</strong>: ${v}</li>`).join("") + "</ul>";
            for (const nomeElenco of (el.dataset.infoElenco || "").split(",").filter(Boolean))
                if (voce[nomeElenco]) html += "<ul>" + voce[nomeElenco].map(x => `<li>${x}</li>`).join("") + "</ul>";
            for (const nomeElenco of (el.dataset.infoElenchi || "").split(",").filter(Boolean))
                if (voce[nomeElenco]) html += `<p><strong>${nomeElenco}</strong>: ${voce[nomeElenco].join(" · ")}</p>`;
            el.innerHTML = html;
        }
    }

    // ───────────────────────── opzioni fisse ─────────────────────────
    const OPZ = {
        fase: ["prima", "fatto", "dopo"],
        classificazione: ["essenziale", "approfondimento", "conferma", "vantaggioOperativo"],
        canali: ["Internet / riviste di settore", "Archivio di giornale", "Biblioteca / registri pubblici", "Archivio del distretto", "Voce di strada", "Un PG esperto del tema"],
        tipoHandout: ["tabulato telefonico", "referto autopsia", "referto tossicologico", "registro accessi", "estratto conto", "lista presenti", "cronologia browser", "rapporto d'intervento", "deposizione", "articolo di giornale", "lettera", "menu", "ricevuta", "certificato medico", "documento"],
        richiede: ["nulla", "interrogatorio", "mandatoGiudice", "richiestaEnte", "accessoTecnico", "sospettoPreesistente"],
        generatore: ["tabulato", "refertoAutopsia", "tossicologica", "registroBadge", "estrattoConto", "listaPresenti", "cronologiaBrowser", "rapportoIntervento", "deposizione", "articoloGiornale", "lettera", "manuale"]
    };
    const inOrdine = (arr, f) => [...arr].sort((a, b) => (f(a) || "").toString().localeCompare((f(b) || "").toString(), "it"));
    // etichette leggibili per i valori-macchina degli enum (i valori salvati NON cambiano)
    const ETICH = {
        richiestaEnte: "richiesta all'ente", mandatoGiudice: "mandato del giudice", accessoTecnico: "accesso tecnico",
        sospettoPreesistente: "sospetto preesistente", vantaggioOperativo: "vantaggio operativo",
        refertoAutopsia: "referto autopsia", registroBadge: "registro badge", estrattoConto: "estratto conto",
        listaPresenti: "lista presenti", cronologiaBrowser: "cronologia browser", rapportoIntervento: "rapporto d'intervento",
        articoloGiornale: "articolo di giornale", datoTecnico: "dato tecnico"
    };
    const opts = (arr, sel) => `<option value="">—</option>` + arr.map(v => `<option value="${v}" ${v === sel ? "selected" : ""}>${ETICH[v] || v}</option>`).join("");
    const optsCast = (sel, soloIds) => `<option value="">—</option>` + inOrdine(cast(), nomePieno)
        .filter(p => !soloIds || soloIds.includes(p.id))
        .map(p => `<option value="${p.id}" ${p.id === sel ? "selected" : ""}>${nomePieno(p)}${chiEBreve(p) ? " — " + chiEBreve(p) : ""}</option>`).join("");

    // descrizione breve di una persona, da mostrare SOTTO/ACCANTO al nome ovunque (regola utente: coi soli nomi ci si confonde)
    function chiEBreve(p, max = 46) {
        if (!p) return "";
        const pre = p.ruoloNelCaso === "vittima" ? "la vittima" : p.ruoloNelCaso === "colpevole" ? "l'assassino" : "";
        let rel = "";
        for (const path of ["passo3.famiglia", "passo3.lavoro", "passo3.amici", "passo3.altri", "passo6.famiglia", "passo6.lavoro", "passo6.amici", "passo6.altri"]) {
            const r = (get(path) || []).find(x => x.personaId === p.id);
            if (r) { rel = r.relazione || path.split(".")[1]; break; }
        }
        if (!rel) rel = p.professione || p.postoNelMondo || "";
        if (!rel && p.ruoloNelCaso === "vittima") rel = get("passo2.postoNelMondo") || "";
        // niente doppioni tipo "l'assassino · Assassino"
        if (pre && rel && pre.replace(/^l[a']\s*|^'/g, "").toLowerCase() === rel.trim().toLowerCase()) rel = "";
        const d = pre && rel ? `${pre} · ${rel}` : (pre || rel);
        return d.length > max ? d.slice(0, max - 1) + "…" : d;
    }
    const zonaNome = (q) => (get("mappa")?.zone || []).find(z => z.id === q)?.nome || q;
    const optsLuoghi = (sel) => {
        // voci identiche accorpate: un solo rigo in tendina anche se i luoghi doppi sono più d'uno
        const visti = new Map();
        for (const l of inOrdine(lista("luoghi"), l => l.nome || l.tipologiaId)) {
            const label = `${iconaLuogo(l)} ${l.nome || l.tipologiaId}${l.quartiere ? " — " + zonaNome(l.quartiere) : ""}`;
            if (!visti.has(label)) visti.set(label, { id: l.id, ids: [l.id] });
            else visti.get(label).ids.push(l.id);
        }
        return `<option value="">— luogo dell'evento —</option>` + [...visti.entries()].map(([label, v]) =>
            `<option value="${v.id}" ${v.ids.includes(sel) ? "selected" : ""}>${label}</option>`).join("");
    };
    const optsEventi = (sel) => `<option value="">—</option>` + lista("passo7.eventi")
        .map((e, i) => `<option value="${e.id || i}" ${String(e.id || i) === String(sel) ? "selected" : ""}>${(e.quando || "?")} — ${(e.testo || "").slice(0, 40)}</option>`).join("");

    // ───────────────────────── editor liste generico ─────────────────────────
    async function assicuraDatalists() {
        if (document.getElementById("wz-dl-tipologie")) return;
        const dati = await lib("luoghi");
        document.body.insertAdjacentHTML("beforeend",
            `<datalist id="wz-dl-tipologie">${dati.tipologie.map(t => `<option value="${t.nome}">`).join("")}</datalist>` +
            `<datalist id="wz-dl-quartieri">${dati.quartieri.map(q => `<option value="${q.nome}">`).join("")}</datalist>`);
    }

    async function initListe() {
        migraInformazioni(); // idempotente: converte le vecchie tracce salvate
        const conts = document.querySelectorAll("[data-lista]");
        if (conts.length) await assicuraDatalists();
        for (const cont of conts) {
            await renderLista(cont);
        }
    }

    async function renderLista(cont) {
        const path = cont.dataset.lista;
        const tipo = cont.dataset.tipoLista;
        const items = lista(path);
        let html = "";
        for (let i = 0; i < items.length; i++)
            html += await rigaHtml(tipo, items[i], i, cont);
        html += `<button type="button" class="wz-btn wz-aggiungi" data-agg>+ Aggiungi</button>`;
        if (tipo === "persona")
            html += ` <button type="button" class="wz-btn wz-aggiungi" data-agg-cast title="La stessa persona può stare in più cerchi: se è in entrambe le reti finisce nell'intersezione">＋ già nel caso</button> <span data-agg-cast-box></span>`;
        cont.innerHTML = html;

        cont.querySelector("[data-agg]").addEventListener("click", async () => {
            items.push(await nuovoItem(tipo, cont));
            salvaDebounce();
            await renderLista(cont);
            agganciaPerPasso();
        });
        // "già nel caso": ripesca una persona esistente in QUESTO cerchio (stessa persona, non una copia)
        cont.querySelector("[data-agg-cast]")?.addEventListener("click", () => {
            const box = cont.querySelector("[data-agg-cast-box]");
            const giaDentro = new Set(items.map(x => x.personaId));
            const disponibili = cast().filter(p => !giaDentro.has(p.id) && p.ruoloNelCaso !== "vittima");
            if (!disponibili.length) { box.innerHTML = `<small class="wz-nota">non c'è nessun altro da ripescare</small>`; return; }
            box.innerHTML = `<select class="wz-medio"><option value="">— chi? —</option>` +
                disponibili.map(p => `<option value="${p.id}">${nomePieno(p) || "(senza nome)"}${chiEBreve(p, 34) ? " — " + chiEBreve(p, 34) : ""}</option>`).join("") +
                `</select>`;
            const sel = box.querySelector("select");
            sel.focus();
            sel.addEventListener("change", async () => {
                if (!sel.value) return;
                items.push({ personaId: sel.value, relazione: "" });
                salvaDebounce();
                await renderLista(cont);
                agganciaPerPasso();
            });
        });
        cont.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", async () => {
            const i = +b.dataset.del;
            const it = items[i];
            if (tipo === "persona" && it.personaId) {
                // la persona resta nel cast solo se usata altrove; qui la si rimuove dal cerchio
                const usataAltrove = contaUsiPersona(it.personaId) > 1;
                if (!usataAltrove) {
                    const idx = cast().findIndex(p => p.id === it.personaId);
                    if (idx >= 0) cast().splice(idx, 1);
                }
            }
            if (tipo === "luogo" && it.id) {
                // niente ref pendenti: pulisco le schede che usavano questo luogo come residenza
                for (const sc of lista("passo8.schede")) if (sc.contatti && sc.contatti.residenzaLuogoId === it.id) delete sc.contatti.residenzaLuogoId;
            }
            items.splice(i, 1);
            salvaDebounce();
            await renderLista(cont);
            agganciaPerPasso();
        }));
        cont.querySelectorAll("[data-riga-campo]").forEach(el => {
            el.addEventListener("input", () => {
                const i = +el.dataset.i;
                const campo = el.dataset.rigaCampo;
                let val = el.type === "checkbox" ? el.checked
                    : el.multiple ? Array.from(el.selectedOptions).map(o => o.value)
                    : el.type === "number" ? +el.value : el.value;
                if (campo.startsWith("cast.")) {
                    const p = persona(items[i].personaId);
                    if (p) {
                        p[campo.slice(5)] = val;
                        if (campo === "cast.cognome" || campo === "cast.nome")
                            validaRigaPersona(el.closest(".wz-riga-lista"), p);
                    }
                } else if (campo.startsWith("fonti.")) {
                    const [, fi, fc] = campo.split(".");
                    items[i].fonti[+fi][fc] = val;
                } else {
                    items[i][campo] = val;
                }
                salvaDebounce();
            });
        });
        cont.querySelectorAll("[data-nota-riga]").forEach(b => b.addEventListener("click", () => {
            const it = items[+b.dataset.notaRiga];
            if (it && it.personaId) apriNotaPersona(it.personaId, cont);
        }));
        // membri dei gruppi: pillole a toggle
        cont.querySelectorAll("[data-membro]").forEach(b => b.addEventListener("click", () => {
            const it = items[+b.dataset.i];
            it.membriIds = it.membriIds || [];
            const id = b.dataset.membro;
            const ix = it.membriIds.indexOf(id);
            if (ix >= 0) it.membriIds.splice(ix, 1); else it.membriIds.push(id);
            b.classList.toggle("attivo", ix < 0);
            salvaDebounce();
            cont.dispatchEvent(new Event("input", { bubbles: true })); // aggiorna grafo, riassunto e tendine relazioni
        }));
        // persone coinvolte negli eventi: pillole a toggle (più di una)
        cont.querySelectorAll("[data-ev-pers]").forEach(b => b.addEventListener("click", () => {
            const it = items[+b.dataset.evPers];
            it.personeIds = it.personeIds || [];
            const id = b.dataset.pid;
            const ix = it.personeIds.indexOf(id);
            if (ix >= 0) it.personeIds.splice(ix, 1); else it.personeIds.push(id);
            b.classList.toggle("attivo", ix < 0);
            salvaDebounce();
            cont.dispatchEvent(new Event("input", { bubbles: true }));
        }));
        // calendario evento: inizio e fine compongono quando/quandoFine, la durata si aggiorna da sola
        cont.querySelectorAll("[data-ev-data],[data-ev-fdata],[data-ev-ora-h],[data-ev-ora-m],[data-ev-fora-h],[data-ev-fora-m]").forEach(el => el.addEventListener("input", () => {
            const i = +(el.dataset.evData ?? el.dataset.evFdata ?? el.dataset.evOraH ?? el.dataset.evOraM ?? el.dataset.evForaH ?? el.dataset.evForaM);
            const blocco = el.closest(".wz-blocco-lista");
            const data = blocco.querySelector("[data-ev-data]").value;
            const oh = blocco.querySelector("[data-ev-ora-h]").value, om = blocco.querySelector("[data-ev-ora-m]").value;
            const ora = oh !== "" ? oh + ":" + (om || "00") : "";
            const fdata = blocco.querySelector("[data-ev-fdata]").value;
            const fh = blocco.querySelector("[data-ev-fora-h]").value, fm = blocco.querySelector("[data-ev-fora-m]").value;
            const fora = fh !== "" ? fh + ":" + (fm || "00") : "";
            if (data) {
                items[i].quando = data + (ora ? " " + ora : "");
                const testo = blocco.querySelector("[data-riga-campo='quando']");
                if (testo && testo !== document.activeElement) testo.value = items[i].quando;
            }
            items[i].quandoFine = fdata ? fdata + (fora ? " " + fora : "") : "";
            const dur = blocco.querySelector("[data-ev-durata]");
            if (dur) dur.textContent = durataEvento(items[i]);
            salvaDebounce();
        }));
        // il colore del blocco segue la fase (il FATTO salta all'occhio)
        cont.querySelectorAll("select[data-riga-campo='fase']").forEach(sel => sel.addEventListener("input", () => {
            const blocco = sel.closest(".wz-blocco-lista");
            if (!blocco) return;
            blocco.classList.remove("wz-ev-prima", "wz-ev-fatto", "wz-ev-dopo");
            blocco.classList.add("wz-ev-" + (sel.value || "prima"));
        }));
        // al commit della data (calendario chiuso) l'evento si sposta da solo al posto giusto
        cont.querySelectorAll("[data-ev-data],[data-ev-ora-h],[data-ev-ora-m]").forEach(el => el.addEventListener("change", async () => {
            if (tipo !== "evento") return;
            ordinaEventiCronologici(items);
            salvaDebounce();
            await renderLista(cont);
        }));
        // select con "Altro": scelta dalla biblioteca → scrive subito; Altro → mostra il campo libero accanto
        cont.querySelectorAll("select[data-sel-custom]").forEach(sel => sel.addEventListener("change", () => {
            const i = +sel.dataset.i;
            const campo = sel.dataset.selCustom;
            const inp = sel.nextElementSibling;
            if (sel.value === "__custom") {
                inp.hidden = false;
                inp.focus();
            } else {
                inp.hidden = true;
                inp.value = "";
                items[i][campo] = sel.value;
                salvaDebounce();
            }
        }));
        cont.querySelectorAll("[data-dado-riga]").forEach(b => b.addEventListener("click", async () => {
            const i = +b.dataset.dadoRiga;
            await dadoRiga(tipo, items[i], cont);
            salvaDebounce();
            await renderLista(cont);
        }));
        cont.querySelectorAll("[data-fonte-agg]").forEach(b => b.addEventListener("click", async () => {
            const i = +b.dataset.fonteAgg;
            (items[i].fonti = items[i].fonti || []).push({ attoreId: "", canale: "", richiede: "nulla", versione: "", handout: false, handoutTitolo: "" });
            salvaDebounce();
            await renderLista(cont);
        }));
        cont.querySelectorAll("[data-fonte-del]").forEach(b => b.addEventListener("click", async () => {
            const [i, fi] = b.dataset.fonteDel.split(".").map(Number);
            items[i].fonti.splice(fi, 1);
            salvaDebounce();
            await renderLista(cont);
        }));
        // comprimi/apri le informazioni (resta solo titolo + classificazione)
        cont.querySelectorAll("[data-info-chiudi]").forEach(b => b.addEventListener("click", async () => {
            items[+b.dataset.infoChiudi].chiuso = true;
            salvaDebounce();
            await renderLista(cont);
        }));
        cont.querySelectorAll("[data-info-apri]").forEach(b => b.addEventListener("click", async () => {
            items[+b.dataset.infoApri].chiuso = false;
            salvaDebounce();
            await renderLista(cont);
        }));
        // chi/dove della fonte: persona, gruppo, canale di ricerca o testo libero
        cont.querySelectorAll("select[data-fonte-chi]").forEach(sel => sel.addEventListener("change", () => {
            const [i, fi] = sel.dataset.fonteChi.split(".").map(Number);
            const f = items[i].fonti[fi];
            const inp = sel.parentElement.querySelector(`[data-fonte-canale='${i}.${fi}']`);
            if (sel.value === "__custom") { f.attoreId = ""; if (inp) { inp.hidden = false; inp.focus(); } return; }
            if (inp) { inp.hidden = true; inp.value = ""; }
            if (sel.value.startsWith("p:") || sel.value.startsWith("g:")) { f.attoreId = sel.value.slice(2); f.canale = ""; }
            else if (sel.value.startsWith("c:")) { f.attoreId = ""; f.canale = sel.value.slice(2); }
            else { f.attoreId = ""; f.canale = ""; }
            salvaDebounce();
        }));
        cont.querySelectorAll("[data-fonte-canale]").forEach(el => el.addEventListener("input", () => {
            const [i, fi] = el.dataset.fonteCanale.split(".").map(Number);
            items[i].fonti[fi].canale = el.value;
            items[i].fonti[fi].attoreId = "";
            salvaDebounce();
        }));
        // allegati: carica nella cartella dell'avventura, la riga tiene {nome, url}
        cont.querySelectorAll("input[data-alg-add]").forEach(inp => inp.addEventListener("change", async () => {
            const i = +inp.dataset.algAdd;
            const file = inp.files[0];
            if (!file) return;
            const msg = cont.querySelector(`[data-alg-msg='${i}']`);
            if (msg) msg.textContent = "⏳ carico…";
            const fd = new FormData();
            fd.append("file", file);
            try {
                const r = await fetch(`/api/progetti/${WIZ.id}/allegati`, { method: "POST", body: fd });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { if (msg) msg.textContent = "⚠ " + (json.errore || "caricamento fallito"); return; }
                (items[i].allegati = items[i].allegati || []).push({ nome: json.nome, url: json.url });
                salvaDebounce();
                await renderLista(cont);
            } catch { if (msg) msg.textContent = "⚠ caricamento fallito"; }
        }));
        cont.querySelectorAll("[data-alg-del]").forEach(b => b.addEventListener("click", async () => {
            const [i, ai] = b.dataset.algDel.split(".").map(Number);
            items[i].allegati.splice(ai, 1);
            salvaDebounce();
            await renderLista(cont);
        }));
        // ✏️ Edita: apre l'editor grafico nella STESSA scheda (evita che l'autosave di questa
        // pagina, restando aperta, sovrascriva il contenuto salvato dall'editor). Salvo prima,
        // così l'editor legge dal DB l'ultima descrizione.
        cont.querySelectorAll("[data-ho-edita]").forEach(b => b.addEventListener("click", async () => {
            const hid = b.dataset.hoEdita;
            try { await salvaOra(WIZ.passo); } catch { }
            location.href = `/Wizard/Handout?id=${WIZ.id}&h=${hid}&torna=${WIZ.passo}`;
        }));
        // 👁 Anteprima: il documento in sovraimpressione (sola lettura + stampa/PDF)
        cont.querySelectorAll("[data-ho-anteprima]").forEach(b => b.addEventListener("click", () => {
            const it = items.find(x => x.id === b.dataset.hoAnteprima);
            apriAnteprimaHandout(it);
        }));
        // 🖨 Stampa diretta: manda in stampa senza aprire l'anteprima
        cont.querySelectorAll("[data-ho-stampa]").forEach(b => b.addEventListener("click", () => {
            const it = items.find(x => x.id === b.dataset.hoStampa);
            if (!it) return;
            if (!(it.contenuto || "").trim()) { alert("Questo handout è ancora vuoto: non c'è niente da stampare."); return; }
            stampaHandoutDiretto(it.titolo || "Handout", it.contenuto);
        }));
        // 📄 sulla fonte: marca la versione come handout (comparirà raccolto al passo 13)
        cont.querySelectorAll("[data-fonte-doc]").forEach(b => b.addEventListener("click", async () => {
            const [i, fi] = b.dataset.fonteDoc.split(".").map(Number);
            const it = items[i], f = it.fonti[fi];
            f.handout = !f.handout;
            if (f.handout && !f.handoutTitolo) f.handoutTitolo = (it.nome || "Informazione") + " — " + (nomeFonte(f) || "fonte");
            salvaDebounce();
            await renderLista(cont);
        }));
    }

    // verifica live anti-omonimie sulle righe-persona (nomi scritti a mano nei passi 3/6)
    const _tValida = {};
    function validaRigaPersona(riga, p) {
        if (!riga || !p) return;
        clearTimeout(_tValida[p.id]);
        if (!p.cognome || !p.nome) { riga.classList.remove("wz-riga-ko"); riga.title = ""; return; }
        _tValida[p.id] = setTimeout(async () => {
            const r = await verificaNome(p.cognome, p.nome, p.id);
            p.kanji = r.kanji || p.kanji;
            p.nomeValidato = r.libero;
            riga.classList.toggle("wz-riga-ko", !r.libero);
            riga.title = r.libero ? "" : `⚠ ${r.motivo}`;
            salvaDebounce();
        }, 450);
    }

    function contaUsiPersona(pid) {
        let n = 0;
        const scan = (arr) => (arr || []).forEach(x => { if (x.personaId === pid) n++; });
        ["passo3.famiglia", "passo3.lavoro", "passo3.amici", "passo3.altri", "passo6.famiglia", "passo6.lavoro", "passo6.amici", "passo6.altri"]
            .forEach(p => scan(get(p)));
        return n;
    }

    async function nuovoItem(tipo, cont) {
        switch (tipo) {
            case "persona": {
                const rete = cont.dataset.rete || "vittima";
                const cerchio = cont.dataset.cerchio || "";
                const p = { id: nuovoId("p"), cognome: "", nome: "", kanji: "", eta: 40, genere: "m", ruoloNelCaso: "contorno", cerchio: `${rete}:${cerchio}`, rilevante: false, nomeValidato: false };
                cast().push(p);
                return { personaId: p.id, relazione: "" };
            }
            case "luogo": return { id: nuovoId("l"), tipologiaId: "", nome: "", via: "", quartiere: get("setup.quartiere") || "" };
            case "problema": return { testo: "", potenzialeFalsaPista: false };
            case "evento": {
                const evs = lista("passo7.eventi");
                let dataPre = get("passo7.dataInizio") || "";
                for (let k = evs.length - 1; k >= 0; k--) {
                    const m = String(evs[k].quando || "").match(/\d{4}-\d{2}-\d{2}(?:[T ]\d{1,2}:\d{2})?/);
                    if (m) { dataPre = m[0]; break; }
                }
                return { id: nuovoId("e"), quando: dataPre, fase: "prima", testo: "", personeIds: [], luogoId: "" };
            }
            case "informazione": return { id: nuovoId("t"), nome: "", testo: "", classificazione: "", fonti: [{ attoreId: "", canale: "", richiede: "nulla", versione: "", handout: false, handoutTitolo: "" }] };
            case "handout": return { id: nuovoId("h"), titolo: "", tipo: "", descrizione: "", collegatoA: "", contenuto: "", allegati: [] };
            case "giornoCalendario": return { giorno: lista("passo11.giorni").length, momento: "", evento: "", condizione: "" };
            case "relazione": return { aId: "", bId: "", tipo: "", enAB: "", enBA: "" };
            case "gruppo": return { id: nuovoId("g"), nome: "", tipo: "", zona: "", descrizione: "", membriIds: [] };
            default: return {};
        }
    }

    async function dadoRiga(tipo, item, cont) {
        if (tipo === "persona") {
            const p = persona(item.personaId);
            if (!p) return;
            let cognomeFisso = null;
            if (cont.dataset.cognomeVittima === "true") {
                const vitt = persona(get("passo2.personaId"));
                cognomeFisso = vitt ? vitt.cognome : null;
            }
            const n = await generaNome(p.genere || "m", p.eta || 40, cognomeFisso);
            const vecchio = nomePieno(p);
            Object.assign(p, { cognome: n.cognome, nome: n.nome, kanji: n.kanji, nomeValidato: true });
            propagaRinomina(vecchio, nomePieno(p));
        } else if (tipo === "problema") {
            const dati = await lib("problemi_segreti");
            const cat = dati.categorie[Math.floor(Math.random() * dati.categorie.length)];
            const voce = cat.voci[Math.floor(Math.random() * cat.voci.length)];
            item.problemaId = voce.id;
            item.testo = voce.testo;
        } else if (tipo === "luogo") {
            // 🎲: prima i luoghi impliciti della professione della VITTIMA, esauriti quelli dell'ASSASSINO, poi tipologia a caso
            const [libL, libP] = await Promise.all([lib("luoghi"), lib("professioni")]);
            const usati = lista(cont.dataset.lista).map(x => (x.nome || "").toLowerCase()).filter(Boolean);
            const colpevole = persona((get("passo5.colpevoliIds") || [])[0]);
            const pool = [];
            const profV = (libP.professioni || []).find(v => v.id === get("passo2.professioneId"));
            (profV?.luoghiImpliciti || []).forEach(nome => pool.push(nome));
            if (colpevole) {
                const profC = (libP.professioni || []).find(v => v.nome === colpevole.professione);
                (profC?.luoghiImpliciti || []).forEach(nome => pool.push(nome));
            }
            const liberi = pool.filter(nome => !usati.includes(nome.toLowerCase()));
            if (liberi.length) {
                item.nome = liberi[Math.floor(Math.random() * liberi.length)];
            } else {
                const t = libL.tipologie[Math.floor(Math.random() * libL.tipologie.length)];
                item.tipologiaId = t.nome;
            }
            if (!item.quartiere) item.quartiere = get("setup.quartiere") || "";
        }
    }

    // allegati per riga (informazioni e handout): file nella cartella dell'avventura, mai mischiati
    const ACCETTA_ALLEGATI = ".png,.jpg,.jpeg,.webp,.gif,.pdf,.doc,.docx,.xls,.xlsx,.txt,.md";
    const allegatiHtml = (it, i) => `<div class="wz-allegati">
        ${(it.allegati || []).map((a, ai) => `<span class="wz-chip wz-alg"><a href="${a.url}" target="_blank" title="Apri in un'altra scheda">📎 ${a.nome}</a><button type="button" class="wz-alg-x" data-alg-del="${i}.${ai}" title="Togli l'allegato da questa riga">✕</button></span>`).join("")}
        <label class="wz-btn wz-mini wz-alg-add">📎 Allega file<input type="file" hidden data-alg-add="${i}" accept="${ACCETTA_ALLEGATI}" /></label>
        <span class="wz-alg-msg" data-alg-msg="${i}"></span>
    </div>`;

    async function rigaHtml(tipo, it, i, cont) {
        switch (tipo) {
            case "persona": {
                const p = persona(it.personaId) || {};
                return `<div class="wz-riga-lista">
                    <button type="button" class="wz-btn wz-mini" data-dado-riga="${i}" title="Genera nome">🎲</button>
                    <input type="text" placeholder="Cognome" value="${p.cognome || ""}" data-riga-campo="cast.cognome" data-i="${i}" class="wz-corto" />
                    <input type="text" placeholder="Nome" value="${p.nome || ""}" data-riga-campo="cast.nome" data-i="${i}" class="wz-corto" />
                    <input type="number" title="Età" value="${p.eta || 40}" min="8" max="99" data-riga-campo="cast.eta" data-i="${i}" class="wz-num" />
                    <select data-riga-campo="cast.genere" data-i="${i}" class="wz-num"><option value="m" ${p.genere !== "f" ? "selected" : ""}>M</option><option value="f" ${p.genere === "f" ? "selected" : ""}>F</option></select>
                    <input type="text" placeholder="${cont.dataset.cerchio === "altri" ? "Chi è nel caso (es. capo banda — gelosia; o: nessun legame, testimone)" : "Relazione (es. moglie — rapporto freddo da anni)"}" value="${it.relazione || ""}" data-riga-campo="relazione" data-i="${i}" class="wz-lungo" />
                    <button type="button" class="wz-btn wz-mini wz-btn-nota ${p.note ? "ha-nota" : ""}" data-nota-riga="${i}" title="Appunti del GM su questa persona">📝</button>
                    <button type="button" class="wz-btn-x" data-del="${i}">✕</button>
                </div>`;
            }
            case "luogo": {
                // select come gli altri campi-contenuto (+ "Altro" per scrivere il proprio); 🎲 propone dai luoghi della professione
                const libL = await lib("luoghi");
                const selCustom = (vociGrezze, val, campo, etichetta) => {
                    const voci = inOrdine(vociGrezze, v => v.nome);
                    const match = voci.find(v => v.nome === val || v.id === val);
                    const custom = !!val && !match;
                    const opzioni = `<option value="">${etichetta} — scegli</option>` +
                        voci.map(v => `<option value="${v.nome.replace(/"/g, "&quot;")}" ${match && (v.nome === val || v.id === val) ? "selected" : ""}>${v.nome}</option>`).join("") +
                        `<option value="__custom" ${custom ? "selected" : ""}>✏️ Altro — lo scrivo io</option>`;
                    return `<select data-sel-custom="${campo}" data-i="${i}" class="wz-medio">${opzioni}</select><input type="text" placeholder="${etichetta} (tua)" value="${custom ? String(val).replace(/"/g, "&quot;") : ""}" data-riga-campo="${campo}" data-i="${i}" class="wz-medio wz-custom-input" ${custom ? "" : "hidden"} />`;
                };
                return `<div class="wz-blocco-lista">
                    <div class="wz-riga-lista">
                        <button type="button" class="wz-btn wz-mini" data-dado-riga="${i}" title="Proponi un luogo">🎲</button>
                        <select data-riga-campo="icona" data-i="${i}" class="wz-icona" title="Icona sulla mappa (auto = dal tipo)"><option value="">${iconaLuogo(it)}</option>${ICONE_SET.map(ic => `<option value="${ic}" ${it.icona === ic ? "selected" : ""}>${ic}</option>`).join("")}</select>
                        ${selCustom(libL.tipologie, it.tipologiaId, "tipologiaId", "Tipo di luogo")}
                        <input type="text" placeholder="Nome * (obbligatorio)" value="${(it.nome || "").replace(/"/g, "&quot;")}" data-riga-campo="nome" data-i="${i}" class="wz-lungo wz-nome-obbl" title="Il nome è obbligatorio (la via e la zona no)" />
                        ${selCustom(libL.quartieri, it.quartiere, "quartiere", "Zona")}
                        <label class="wz-check-mini" title="Nascosto nella vista giocatori della mappa"><input type="checkbox" ${it.segretoPG ? "checked" : ""} data-riga-campo="segretoPG" data-i="${i}" />🙈</label>
                        <button type="button" class="wz-btn-x" data-del="${i}">✕</button>
                    </div>
                    <input type="text" class="wz-via-riga" placeholder="Via / indirizzo completo (anche di un'altra città)" value="${(it.via || "").replace(/"/g, "&quot;")}" data-riga-campo="via" data-i="${i}" />
                </div>`;
            }
            case "gruppo": {
                const libLG = await lib("luoghi");
                const custom = !!it.tipo && !GRUPPO_TIPI.includes(it.tipo);
                const optsTipoG = `<option value="">tipo — scegli</option>` +
                    GRUPPO_TIPI.map(g => `<option value="${g}" ${it.tipo === g ? "selected" : ""}>${g}</option>`).join("") +
                    `<option value="__custom" ${custom ? "selected" : ""}>✏️ Altro — lo scrivo io</option>`;
                const quartieriOrd = inOrdine(libLG.quartieri, q => q.nome);
                const zMatch = quartieriOrd.find(q => q.nome === it.zona || q.id === it.zona);
                const zCustom = !!it.zona && !zMatch;
                const optsZona = `<option value="">zona — nessuna</option>` +
                    quartieriOrd.map(q => `<option value="${q.nome}" ${zMatch && (q.nome === it.zona || q.id === it.zona) ? "selected" : ""}>${q.nome}</option>`).join("") +
                    `<option value="__custom" ${zCustom ? "selected" : ""}>✏️ Altro — la scrivo io</option>`;
                return `<div class="wz-blocco-lista">
                    <div class="wz-riga-lista">
                        <input type="text" placeholder="Nome del gruppo (es. i Kurokaze / Distretto 5 — Shimogyō)" value="${(it.nome || "").replace(/"/g, "&quot;")}" data-riga-campo="nome" data-i="${i}" class="wz-lungo" />
                        <select data-sel-custom="tipo" data-i="${i}" class="wz-medio">${optsTipoG}</select><input type="text" placeholder="tipo (tuo)" value="${custom ? String(it.tipo).replace(/"/g, "&quot;") : ""}" data-riga-campo="tipo" data-i="${i}" class="wz-medio wz-custom-input" ${custom ? "" : "hidden"} />
                        <select data-sel-custom="zona" data-i="${i}" class="wz-medio" title="Zona / territorio (opzionale)">${optsZona}</select><input type="text" placeholder="zona (tua)" value="${zCustom ? String(it.zona).replace(/"/g, "&quot;") : ""}" data-riga-campo="zona" data-i="${i}" class="wz-medio wz-custom-input" ${zCustom ? "" : "hidden"} />
                        <select data-riga-campo="icona" data-i="${i}" class="wz-icona" title="Icona sulla mappa (auto = dal tipo)"><option value="">${iconaGruppo(it)}</option>${ICONE_SET.map(ic => `<option value="${ic}" ${it.icona === ic ? "selected" : ""}>${ic}</option>`).join("")}</select>
                        <label class="wz-check-mini" title="Nascosto nella vista giocatori della mappa"><input type="checkbox" ${it.segretoPG ? "checked" : ""} data-riga-campo="segretoPG" data-i="${i}" />🙈</label>
                        <button type="button" class="wz-btn-x" data-del="${i}">✕</button>
                    </div>
                    <small class="wz-nota">Membri — tocca un nome per aggiungerlo o toglierlo:</small>
                    <div class="wz-membri">${inOrdine(cast(), nomePieno).map(p => `<button type="button" class="wz-chip wz-membro ${fotoDi(p.id) ? "con-foto" : ""} ${(it.membriIds || []).includes(p.id) ? "attivo" : ""}" data-membro="${p.id}" data-i="${i}">${fotoMini(p.id)}<span>${nomePieno(p) || "(senza nome)"}${chiEBreve(p, 30) ? `<small class="wz-chie">${chiEBreve(p, 30)}</small>` : ""}</span></button>`).join("")}</div>
                    <input type="text" placeholder="Descrizione (es. una dozzina di ragazzi, girano di notte sul lungofiume)" value="${(it.descrizione || "").replace(/"/g, "&quot;")}" data-riga-campo="descrizione" data-i="${i}" />
                </div>`;
            }
            case "relazione": {
                const optsP = (sel) => `<option value="">— chi —</option>` +
                    `<optgroup label="Persone">` + inOrdine(cast(), nomePieno).map(p =>
                        `<option value="${p.id}" ${sel === p.id ? "selected" : ""}>${nomePieno(p)}${chiEBreve(p, 34) ? " — " + chiEBreve(p, 34) : ""}</option>`).join("") + `</optgroup>` +
                    (lista("gruppi").filter(g => g.nome).length
                        ? `<optgroup label="Gruppi e distretti">` + inOrdine(lista("gruppi").filter(g => g.nome), g => g.nome).map(g =>
                            `<option value="${g.id}" ${sel === g.id ? "selected" : ""}>${g.nome}${descrAttore(g.id) ? " — " + descrAttore(g.id) : ""}</option>`).join("") + `</optgroup>`
                        : "");
                // scala En del manuale (−5..+5): il valore col suo nome, così non serve ricordarla
                const optsEn = (sel) => `<option value="">En</option>` + EN_SCALA.map(([v, l]) =>
                    `<option value="${v}" ${String(sel) === String(v) ? "selected" : ""}>${v > 0 ? "+" + v : v} ${l}</option>`).join("");
                // relazione = select con "Altro" come tutti gli altri campi-contenuto (niente datalist)
                const custom = !!it.tipo && !RELAZIONI_SUGGERITE.includes(it.tipo);
                const optsTipo = `<option value="">relazione — scegli</option>` +
                    RELAZIONI_SUGGERITE.map(r => `<option value="${r}" ${it.tipo === r ? "selected" : ""}>${r}</option>`).join("") +
                    `<option value="__custom" ${custom ? "selected" : ""}>✏️ Altro — la scrivo io</option>`;
                return `<div class="wz-riga-lista wz-rel-riga">
                    <select data-riga-campo="aId" data-i="${i}" class="wz-medio">${optsP(it.aId)}</select>
                    <select data-riga-campo="enAB" data-i="${i}" class="wz-en" title="En del primo verso il secondo">${optsEn(it.enAB)}</select>
                    <select data-sel-custom="tipo" data-i="${i}" class="wz-medio">${optsTipo}</select><input type="text" placeholder="relazione (tua)" value="${custom ? String(it.tipo).replace(/"/g, "&quot;") : ""}" data-riga-campo="tipo" data-i="${i}" class="wz-medio wz-custom-input" ${custom ? "" : "hidden"} />
                    <select data-riga-campo="enBA" data-i="${i}" class="wz-en" title="En del secondo verso il primo">${optsEn(it.enBA)}</select>
                    <select data-riga-campo="bId" data-i="${i}" class="wz-medio">${optsP(it.bId)}</select>
                    <button type="button" class="wz-btn-x" data-del="${i}">✕</button>
                </div>`;
            }
            case "problema":
                return `<div class="wz-riga-lista">
                    <button type="button" class="wz-btn wz-mini" data-dado-riga="${i}" title="Pesca dalla biblioteca">🎲</button>
                    <input type="text" placeholder="Problema (es. disputa con un collega sulla paternità di una ricerca)" value="${(it.testo || "").replace(/"/g, "&quot;")}" data-riga-campo="testo" data-i="${i}" class="wz-lungo" />
                    <label class="wz-check-mini" title="Da far sembrare sospetta anche se non c'entra"><input type="checkbox" ${it.potenzialeFalsaPista ? "checked" : ""} data-riga-campo="potenzialeFalsaPista" data-i="${i}" />falsa pista</label>
                    <button type="button" class="wz-btn-x" data-del="${i}">✕</button>
                </div>`;
            case "evento": {
                const spezza = (s) => {
                    const m = String(s || "").match(/(\d{4}-\d{2}-\d{2})(?:[T ](\d{1,2}:\d{2}))?/);
                    return { data: m ? m[1] : "", ora: m && m[2] ? (m[2].length === 4 ? "0" + m[2] : m[2]) : "" };
                };
                const ini = spezza(it.quando), fin = spezza(it.quandoFine);
                const [iniH, iniM] = (ini.ora || ":").split(":");
                const [finH, finM] = (fin.ora || ":").split(":");
                return `<div class="wz-blocco-lista wz-ev-${it.fase || "prima"}">
                    <div class="wz-riga-lista">
                        <input type="date" value="${ini.data}" data-ev-data="${i}" class="wz-data" title="Data (dal calendario)" />
                        <select data-ev-ora-h="${i}" class="wz-hm" title="Ora">${optsOre(iniH)}</select><span class="wz-hm-sep">:</span><select data-ev-ora-m="${i}" class="wz-hm" title="Minuti">${optsMin(iniM)}</select>
                        <select data-riga-campo="fase" data-i="${i}" class="wz-fase">${opts(OPZ.fase, it.fase)}</select>
                        <select data-riga-campo="luogoId" data-i="${i}" class="wz-medio">${optsLuoghi(it.luogoId)}</select>
                        <button type="button" class="wz-btn-x" data-del="${i}">✕</button>
                    </div>
                    <div class="wz-riga-lista">
                        <span class="wz-fine-lbl" title="Se l'evento dura nel tempo: incontro di 3 ore, soggiorno di 3 giorni…">→ fine <small>(opz.)</small></span>
                        <input type="date" value="${fin.data}" data-ev-fdata="${i}" class="wz-data" title="Data di fine (opzionale)" />
                        <select data-ev-fora-h="${i}" class="wz-hm" title="Ora di fine">${optsOre(finH)}</select><span class="wz-hm-sep">:</span><select data-ev-fora-m="${i}" class="wz-hm" title="Minuti">${optsMin(finM)}</select>
                        <span class="wz-durata" data-ev-durata="${i}">${durataEvento(it)}</span>
                        <input type="text" placeholder="o a parole (es. tre settimane prima)" value="${(it.quando || "").replace(/"/g, "&quot;")}" data-riga-campo="quando" data-i="${i}" class="wz-medio" />
                    </div>
                    <textarea rows="2" placeholder="Cosa succede — asciutto, con orari precisi se tocca telefoni/accessi/soldi" data-riga-campo="testo" data-i="${i}">${it.testo || ""}</textarea>
                    <small class="wz-nota">Chi è coinvolto — tocca i nomi (anche più di uno):</small>
                    <div class="wz-membri">${inOrdine(cast(), nomePieno).map(p => `<button type="button" class="wz-chip wz-membro ${fotoDi(p.id) ? "con-foto" : ""} ${(it.personeIds || []).includes(p.id) ? "attivo" : ""}" data-ev-pers="${i}" data-pid="${p.id}">${fotoMini(p.id)}<span>${nomePieno(p) || "(senza nome)"}${chiEBreve(p, 26) ? `<small class="wz-chie">${chiEBreve(p, 26)}</small>` : ""}</span></button>`).join("")}</div>
                </div>`;
            }
            case "informazione": {
                // compressa: resta solo il titolo + il box classificazione (+ contatori per orientarsi)
                if (it.chiuso) {
                    const nFonti = (it.fonti || []).filter(f => f.attoreId || f.canale).length;
                    const nDoc = (it.fonti || []).filter(f => f.handout).length;
                    return `<div class="wz-blocco-lista wz-info-chiusa">
                        <div class="wz-riga-lista">
                            <button type="button" class="wz-btn-x wz-apri" data-info-apri="${i}" title="Apri l'informazione">▸</button>
                            <input type="text" placeholder="Nome dell'informazione" value="${(it.nome || "").replace(/"/g, "&quot;")}" data-riga-campo="nome" data-i="${i}" class="wz-lungo" />
                            <select data-riga-campo="classificazione" data-i="${i}" class="wz-medio" title="Quanto pesa nel caso">${opts(OPZ.classificazione, it.classificazione)}</select>
                            <small class="wz-nota wz-conta">${nFonti} font${nFonti === 1 ? "e" : "i"}${nDoc ? ` · 📄${nDoc}` : ""}${(it.allegati || []).length ? ` · 📎${it.allegati.length}` : ""}</small>
                            <button type="button" class="wz-btn-x" data-del="${i}">✕</button>
                        </div>
                    </div>`;
                }
                const gruppiNom = lista("gruppi").filter(g => g.nome);
                const fonti = (it.fonti || []).map((f, fi) => {
                    const val = f.attoreId ? (persona(f.attoreId) ? "p:" : "g:") + f.attoreId
                        : (f.canale ? (OPZ.canali.includes(f.canale) ? "c:" + f.canale : "__custom") : "");
                    return `<div class="wz-fonte">
                        <div class="wz-riga-lista">
                            <span class="wz-strada-n">↳</span>
                            <select data-fonte-chi="${i}.${fi}" class="wz-medio" title="Chi o dove: la fonte">
                                <option value="">— chi o dove —</option>
                                <optgroup label="Persone">${inOrdine(cast(), nomePieno).map(p => `<option value="p:${p.id}" ${val === "p:" + p.id ? "selected" : ""}>${nomePieno(p)}${chiEBreve(p, 30) ? " — " + chiEBreve(p, 30) : ""}</option>`).join("")}</optgroup>
                                ${gruppiNom.length ? `<optgroup label="Gruppi e distretti">${inOrdine(gruppiNom, g => g.nome).map(g => `<option value="g:${g.id}" ${val === "g:" + g.id ? "selected" : ""}>${g.nome}</option>`).join("")}</optgroup>` : ""}
                                <optgroup label="Canali di ricerca">${OPZ.canali.map(c => `<option value="c:${c}" ${val === "c:" + c ? "selected" : ""}>${c}</option>`).join("")}</optgroup>
                                <option value="__custom" ${val === "__custom" ? "selected" : ""}>✏️ Altro…</option>
                            </select>
                            <input type="text" placeholder="fonte libera…" value="${val === "__custom" ? (f.canale || "").replace(/"/g, "&quot;") : ""}" data-fonte-canale="${i}.${fi}" class="wz-medio" ${val === "__custom" ? "" : "hidden"} />
                            <select data-riga-campo="fonti.${fi}.richiede" data-i="${i}" class="wz-medio" title="Cosa serve per ottenerla">${opts(OPZ.richiede, f.richiede)}</select>
                            <button type="button" class="wz-chip ${f.handout ? "attivo" : ""}" data-fonte-doc="${i}.${fi}" title="Marca 📄: diventa un handout e lo ritrovi al passo 13">📄</button>
                            <button type="button" class="wz-btn-x" data-fonte-del="${i}.${fi}">✕</button>
                        </div>
                        <input type="text" placeholder="Cosa dice/dà QUESTA fonte (vuoto = il testo dell'informazione)" value="${(f.versione || "").replace(/"/g, "&quot;")}" data-riga-campo="fonti.${fi}.versione" data-i="${i}" />
                        ${f.handout ? `<input type="text" placeholder="Titolo dell'handout" value="${(f.handoutTitolo || "").replace(/"/g, "&quot;")}" data-riga-campo="fonti.${fi}.handoutTitolo" data-i="${i}" class="wz-ho-tit" />` : ""}
                    </div>`;
                }).join("");
                return `<div class="wz-blocco-lista">
                    <div class="wz-riga-lista">
                        <button type="button" class="wz-btn-x wz-apri" data-info-chiudi="${i}" title="Comprimi: resta solo il titolo">▾</button>
                        <input type="text" placeholder="Nome dell'informazione (es. la moto della banda — che modello è)" value="${(it.nome || "").replace(/"/g, "&quot;")}" data-riga-campo="nome" data-i="${i}" class="wz-lungo" />
                        <select data-riga-campo="classificazione" data-i="${i}" class="wz-medio" title="Quanto pesa nel caso">${opts(OPZ.classificazione, it.classificazione)}</select>
                        <button type="button" class="wz-btn-x" data-del="${i}">✕</button>
                    </div>
                    <textarea rows="5" class="wz-info-testo" placeholder="Cosa si scopre — scritto UNA volta, qui (il campo cresce col testo)" data-riga-campo="testo" data-i="${i}">${it.testo || ""}</textarea>
                    <small class="wz-nota">Le <strong>fonti</strong> — chi o dove la si ottiene (le <em>essenziali</em> ne vogliono almeno 2). Ogni fonte può dire la sua versione; 📄 = handout.</small>
                    ${fonti}
                    <button type="button" class="wz-btn wz-mini" data-fonte-agg="${i}">+ fonte</button>
                    ${allegatiHtml(it, i)}
                </div>`;
            }
            case "handout": {
                // tipo: lista comune + ✏️ Altro (personalizzabile)
                const tipoNoto = OPZ.tipoHandout.includes(it.tipo);
                const tipoCustom = it.tipo && !tipoNoto;
                // "collegato a" opzionale: persona, gruppo o luogo del caso
                const gruppiNom = lista("gruppi").filter(g => g.nome);
                const val = it.collegatoA || "";
                const deco = decoHandout(it.tipo); // icona + colore del tipo: la lista si legge a colpo d'occhio
                return `<div class="wz-blocco-lista wz-ho-blocco" data-hoid="${it.id}" style="border-left:4px solid ${deco.colore}">
                    <div class="wz-riga-lista">
                        <span class="wz-ho-ic" data-ho-ic title="${(it.tipo || "documento").replace(/"/g, "&quot;")}">${deco.icona}</span>
                        <input type="text" placeholder="Titolo (es. Tabulato telefonico della vittima)" value="${(it.titolo || "").replace(/"/g, "&quot;")}" data-riga-campo="titolo" data-i="${i}" class="wz-lungo" />
                        <select data-sel-custom="tipo" data-i="${i}" class="wz-medio" title="Tipo di documento"><option value="">— tipo —</option>${OPZ.tipoHandout.map(t => `<option value="${t}" ${it.tipo === t ? "selected" : ""}>${t}</option>`).join("")}<option value="__custom" ${tipoCustom ? "selected" : ""}>✏️ Altro…</option></select>
                        <input type="text" placeholder="tipo tuo…" value="${tipoCustom ? String(it.tipo).replace(/"/g, "&quot;") : ""}" data-riga-campo="tipo" data-i="${i}" class="wz-medio wz-custom-input" ${tipoCustom ? "" : "hidden"} />
                        <button type="button" class="wz-btn-x" data-del="${i}">✕</button>
                    </div>
                    <textarea rows="2" class="wz-ho-descr" placeholder="Come lo vuoi — descrivilo (es. 4 chiamate a un recupero crediti nelle ultime 3 settimane; il resto traffico normale). Questa descrizione guida l'AI." data-riga-campo="descrizione" data-i="${i}">${it.descrizione || ""}</textarea>
                    <div class="wz-riga-lista">
                        <small class="wz-nota">Collegato a <em>(opz.)</em>:</small>
                        <select data-riga-campo="collegatoA" data-i="${i}" class="wz-medio" title="Di chi o cosa parla questo documento">
                            <option value="">— niente —</option>
                            <optgroup label="Persone">${inOrdine(cast(), nomePieno).map(p => `<option value="p:${p.id}" ${val === "p:" + p.id ? "selected" : ""}>${nomePieno(p)}${chiEBreve(p, 28) ? " — " + chiEBreve(p, 28) : ""}</option>`).join("")}</optgroup>
                            ${gruppiNom.length ? `<optgroup label="Gruppi e distretti">${inOrdine(gruppiNom, g => g.nome).map(g => `<option value="g:${g.id}" ${val === "g:" + g.id ? "selected" : ""}>${g.nome}</option>`).join("")}</optgroup>` : ""}
                            ${lista("luoghi").length ? `<optgroup label="Luoghi">${inOrdine(lista("luoghi"), l => l.nome || l.tipologiaId).map(l => `<option value="l:${l.id}" ${val === "l:" + l.id ? "selected" : ""}>${l.nome || l.tipologiaId}</option>`).join("")}</optgroup>` : ""}
                        </select>
                        <button type="button" class="wz-btn wz-mini" data-ho-edita="${it.id}" title="Apri il documento per scriverlo/impaginarlo, aggiungere immagini e stampare">✏️ Edita</button>
                        <button type="button" class="wz-btn wz-mini" data-ho-anteprima="${it.id}" title="Guarda il documento come sarà stampato">👁 Anteprima</button>
                        <button type="button" class="wz-btn wz-mini" data-ho-stampa="${it.id}" title="Manda subito in stampa, senza aprire l'anteprima">🖨 Stampa</button>
                    </div>
                    ${allegatiHtml(it, i)}
                </div>`;
            }
            case "giornoCalendario":
                return `<div class="wz-blocco-lista">
                    <div class="wz-riga-lista">
                        <input type="number" min="0" value="${it.giorno ?? 0}" data-riga-campo="giorno" data-i="${i}" class="wz-num" title="Giorno" />
                        <input type="text" placeholder="momento (mattina/sera/ore 18)" value="${it.momento || ""}" data-riga-campo="momento" data-i="${i}" class="wz-medio" />
                        <input type="text" placeholder="condizione: se i PG non hanno ancora…" value="${it.condizione || ""}" data-riga-campo="condizione" data-i="${i}" class="wz-lungo" />
                        <button type="button" class="wz-btn-x" data-del="${i}">✕</button>
                    </div>
                    <textarea rows="2" placeholder="Cosa succede (le mosse di copertura lasciano tracce: nominale)" data-riga-campo="evento" data-i="${i}">${it.evento || ""}</textarea>
                </div>`;
        }
        return "";
    }

    // esempi toccabili nei pannelli ❓: click → compila il campo indicato (e salva via evento input)
    document.addEventListener("click", (e) => {
        const btn = e.target.closest(".wz-esempio");
        if (!btn || !btn.dataset.target) return;
        const campo = document.querySelector(btn.dataset.target);
        if (!campo) return;
        campo.value = btn.textContent.trim();
        campo.dispatchEvent(new Event("input", { bubbles: true }));
        campo.focus();
        const det = btn.closest("details.wz-help");
        if (det) det.open = false;
    });

    // ───────────────────────── logiche per passo ─────────────────────────
    // WIZ.passo = indice INTERNO di schermata (0-based; all'utente si mostra +1).
    // Schermate: 0 cornice · 1 morte · 2 vittima · 3 vita · 4 assassino · 5 mondo · 6 movente
    //            7 gruppi/relazioni · 8 luoghi · 9 cronistoria · 10 schede · 11 informazioni · 12 handout · 13 calendario · 14 riepilogo
    function agganciaPerPasso() {
        switch (WIZ.passo) {
            case 2: initVittima(); break;
            case 3: initTabsPasso3(); break;
            case 4: initColpevoli(); break;
            case 5: initIntersezione(); break;
            case 6: initFiltroCast(); break;
            case 7: initRelazioni(); break;
            case 8: initLuoghi(); break;
            case 9: initCronistoria(); break;
            case 10: initSchede(); break;
            case 11: lintInformazioni(); break;
            case 12: initHandoutRaccolti(); break;
            case 14: initRiepilogo(); initMancanze(); break;
        }
    }

    function initVittima() {
        const inCog = document.getElementById("wz-vitt-cognome");
        const inNome = document.getElementById("wz-vitt-nome");
        const kanjiEl = document.getElementById("wz-vitt-kanji");
        const esito = document.getElementById("wz-vitt-esito");
        const chips = document.getElementById("wz-vitt-proposte");
        const btn = document.getElementById("wz-dado-vittima");
        if (!inCog) return;

        const vittima = () => {
            let v = persona(get("passo2.personaId"));
            if (!v) {
                v = { id: nuovoId("p"), ruoloNelCaso: "vittima", cerchio: "", rilevante: true, cognome: "", nome: "", kanji: "" };
                cast().push(v);
                set("passo2.personaId", v.id);
            }
            return v;
        };

        // stato iniziale
        const v0 = persona(get("passo2.personaId"));
        if (v0) { inCog.value = v0.cognome || ""; inNome.value = v0.nome || ""; kanjiEl.textContent = v0.kanji ? `（${v0.kanji}）` : ""; }

        // scrittura manuale: salva + verifica anti-omonimie live
        let tVer = null;
        const manuale = () => {
            const v = vittima();
            v.cognome = inCog.value.trim();
            v.nome = inNome.value.trim();
            v.eta = get("passo2.eta") || v.eta;
            v.genere = get("passo2.genere") || v.genere;
            salvaDebounce();
            clearTimeout(tVer);
            if (!v.cognome || !v.nome) { esito.textContent = ""; kanjiEl.textContent = ""; return; }
            tVer = setTimeout(async () => {
                const r = await verificaNome(v.cognome, v.nome, v.id);
                v.kanji = r.kanji || "";
                v.nomeValidato = r.libero;
                kanjiEl.textContent = r.kanji ? `（${r.kanji}）` : "";
                esito.innerHTML = r.libero
                    ? `<span class="l-ok">✓ nome libero</span>`
                    : `<span class="l-err">⚠ ${r.motivo} — cambialo</span>`;
                inCog.classList.toggle("wz-nome-ko", !r.libero);
                inNome.classList.toggle("wz-nome-ko", !r.libero);
                salvaDebounce();
            }, 450);
        };
        inCog.addEventListener("input", manuale);
        inNome.addEventListener("input", manuale);

        // 🎲: 4 proposte tra cui scegliere
        if (btn) btn.addEventListener("click", async () => {
            const genere = get("passo2.genere") || "m";
            const eta = get("passo2.eta") || 50;
            const proposte = await generaNomi(genere, eta, 4);
            chips.hidden = false;
            chips.innerHTML = proposte.map((n, i) =>
                `<button type="button" class="wz-chip" data-i="${i}">${n.cognome} ${n.nome}<small>（${n.kanji}）</small></button>`).join("");
            chips.querySelectorAll(".wz-chip").forEach(c => c.addEventListener("click", () => {
                const n = proposte[+c.dataset.i];
                const v = vittima();
                const vecchio = nomePieno(v);
                Object.assign(v, { cognome: n.cognome, nome: n.nome, kanji: n.kanji, eta, genere, nomeValidato: true });
                propagaRinomina(vecchio, nomePieno(v));
                inCog.value = n.cognome; inNome.value = n.nome;
                kanjiEl.textContent = `（${n.kanji}）`;
                esito.innerHTML = `<span class="l-ok">✓ nome libero</span>`;
                inCog.classList.remove("wz-nome-ko"); inNome.classList.remove("wz-nome-ko");
                chips.hidden = true;
                salvaDebounce();
                buildRiassunto();
            }));
        });
    }

    // popup appunti del GM per una persona del cast (p.note: testo libero)
    function apriNotaPersona(pid, cont) {
        const p = persona(pid);
        if (!p) return;
        let dlg = document.getElementById("wz-nota-dlg");
        if (!dlg) {
            dlg = document.createElement("dialog");
            dlg.id = "wz-nota-dlg";
            dlg.className = "wz-dialog";
            dlg.innerHTML = `
                <h3 id="wz-nota-titolo"></h3>
                <p class="wz-nota">Appunti liberi: contesto, idee, cosa c'entra col caso. Il dettaglio strutturato
                (<em>cosa sa · cosa non sa · trigger</em>) si compila al <strong>passo 11</strong>, dopo la cronistoria —
                lì ritroverai anche questi appunti.</p>
                <textarea id="wz-nota-testo" rows="7" placeholder="Es. Capo dei Kurokaze, 22 anni. Gelosia doppia: la ragazza E la leadership. Non sa che il ragazzo aveva già deciso di uscire dalla banda. Alibi debole: dice che era alle corse sul lungofiume."></textarea>
                <div class="wz-dialog-azioni">
                    <button type="button" class="wz-btn" id="wz-nota-annulla">Annulla</button>
                    <button type="button" class="wz-btn wz-btn-primario" id="wz-nota-salva">Salva</button>
                </div>`;
            document.body.appendChild(dlg);
        }
        dlg.querySelector("#wz-nota-titolo").textContent = `📝 ${nomePieno(p)}`;
        const ta = dlg.querySelector("#wz-nota-testo");
        ta.value = p.note || "";
        const salva = dlg.querySelector("#wz-nota-salva");
        const annulla = dlg.querySelector("#wz-nota-annulla");
        salva.onclick = async () => {
            p.note = ta.value.trim();
            salvaDebounce();
            dlg.close();
            if (cont) await renderLista(cont); // aggiorna l'evidenza oro del 📝
        };
        annulla.onclick = () => dlg.close();
        dlg.showModal();
    }

    // linguette del passo 3 (La sua vita / Altre persone del caso)
    function initTabsPasso3() {
        const barra = document.getElementById("wz-tabs-p3");
        if (!barra) return;
        const aggiornaConta = () => {
            const n = (get("passo3.altri") || []).length;
            document.getElementById("wz-tab-altri").textContent = n ? `Altre persone del caso (${n})` : "Altre persone del caso";
        };
        aggiornaConta();
        if (barra.dataset.init) return; // agganciaPerPasso gira a ogni render: bind una volta sola
        barra.dataset.init = "1";
        barra.addEventListener("click", (e) => {
            const b = e.target.closest(".wz-tab");
            if (!b) return;
            barra.querySelectorAll(".wz-tab").forEach(t => t.classList.toggle("attiva", t === b));
            document.querySelectorAll("[data-pane]").forEach(p => p.hidden = p.dataset.pane !== b.dataset.tab);
            aggiornaConta();
        });
        document.addEventListener("input", () => { clearTimeout(initTabsPasso3._t); initTabsPasso3._t = setTimeout(aggiornaConta, 700); });
    }

    // ───────────────────────── passo 10: cronistoria — ordinamento eventi ─────────────────────────
    const parseQuando = (s) => {
        const m = String(s || "").match(/(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{1,2}):(\d{2}))?/);
        return m ? new Date(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0)) : null;
    };
    const dataDiEvento = (e) => { const d = parseQuando(e.quando); return d ? d.getTime() : null; };
    // ore e minuti come TENDINE (il time-picker nativo salta con lo scroll ed e' pessimo su mobile)
    const optsOre = (sel) => `<option value="">--</option>` + Array.from({ length: 24 }, (_, h) => String(h).padStart(2, "0")).map(v => `<option value="${v}" ${v === sel ? "selected" : ""}>${v}</option>`).join("");
    const optsMin = (sel) => `<option value="">--</option>` + Array.from({ length: 60 }, (_, m) => String(m).padStart(2, "0")).map(v => `<option value="${v}" ${v === sel ? "selected" : ""}>${v}</option>`).join("");
    // "3 mesi 4 giorni 3 ore" tra inizio e fine
    function durataEvento(e) {
        const a = parseQuando(e.quando), b = parseQuando(e.quandoFine);
        if (!a || !b || b <= a) return "";
        let anni = b.getFullYear() - a.getFullYear();
        let mesi = b.getMonth() - a.getMonth();
        let giorni = b.getDate() - a.getDate();
        let ore = b.getHours() - a.getHours();
        let minuti = b.getMinutes() - a.getMinutes();
        if (minuti < 0) { minuti += 60; ore--; }
        if (ore < 0) { ore += 24; giorni--; }
        if (giorni < 0) { giorni += new Date(b.getFullYear(), b.getMonth(), 0).getDate(); mesi--; }
        if (mesi < 0) { mesi += 12; anni--; }
        const parti = [];
        if (anni) parti.push(anni + (anni === 1 ? " anno" : " anni"));
        if (mesi) parti.push(mesi + (mesi === 1 ? " mese" : " mesi"));
        if (giorni) parti.push(giorni + (giorni === 1 ? " giorno" : " giorni"));
        if (ore) parti.push(ore + (ore === 1 ? " ora" : " ore"));
        if (minuti) parti.push(minuti + " min");
        return "⏱ " + (parti.join(" ") || "meno di un minuto");
    }
    const ORD_FASE = { prima: 0, fatto: 1, dopo: 2 };
    function ordinaEventiCronologici(arr) {
        arr.sort((a, c) => {
            const da = dataDiEvento(a), dc = dataDiEvento(c);
            if (da != null && dc != null) return da - dc;
            if (da != null) return -1;
            if (dc != null) return 1;
            return (ORD_FASE[a.fase] ?? 9) - (ORD_FASE[c.fase] ?? 9);
        });
    }
    function initCronistoria() {
        const bar = document.getElementById("wz-eventi-ordina");
        if (!bar || bar.dataset.init) return;
        bar.dataset.init = "1";
        bar.addEventListener("click", async (e) => {
            const b = e.target.closest("[data-ordina]");
            if (!b) return;
            const arr = lista("passo7.eventi");
            if (b.dataset.ordina === "data") ordinaEventiCronologici(arr);
            else arr.sort((a, c) => (ORD_FASE[a.fase] ?? 9) - (ORD_FASE[c.fase] ?? 9));
            salvaDebounce();
            await renderLista(document.querySelector("[data-lista='passo7.eventi']"));
            bar.querySelectorAll("[data-ordina]").forEach(x => x.classList.toggle("attivo", x === b));
        });
    }

    // ───────────────────────── passo 9: luoghi — gruppi automatici + ordinamento ─────────────────────────
    function initLuoghi() {
        // i gruppi (passo 8) compaiono qui in automatico: non si cancellano da questa schermata
        const boxGruppi = document.getElementById("wz-luoghi-gruppi");
        const renderGruppiAuto = () => {
            if (!boxGruppi) return;
            const gs = inOrdine(lista("gruppi").filter(g => g.nome), g => g.nome);
            boxGruppi.innerHTML = gs.length === 0
                ? `<p class="wz-nota">Nessun gruppo ancora: si creano al passo 8 (banda, distretto, classe…).</p>`
                : "<ul class='wz-mappa-elenco'>" + gs.map(g =>
                    `<li>${iconaGruppo(g)} <strong>${g.nome}</strong>${g.tipo ? ` <span class="wz-rias-mini">(${g.tipo})</span>` : ""}${g.zona ? ` — ${g.zona}` : " — <em>senza zona: assegnala al passo 8 per vederlo sulla mappa</em>"}</li>`).join("") + "</ul>";
        };
        renderGruppiAuto();
        if (!initLuoghi._sync) {
            initLuoghi._sync = true;
            document.addEventListener("input", () => { clearTimeout(initLuoghi._t); initLuoghi._t = setTimeout(renderGruppiAuto, 900); });
        }
        const bar = document.getElementById("wz-luoghi-ordina");
        if (!bar || bar.dataset.init) return;
        bar.dataset.init = "1";
        bar.addEventListener("click", async (e) => {
            const b = e.target.closest("[data-ordina]");
            if (!b) return;
            const arr = lista("luoghi");
            const chiave = {
                tipo: (l) => (l.tipologiaId || "zzz").toLowerCase(),
                zona: (l) => (l.quartiere || "zzz").toLowerCase(),
                nome: (l) => (l.nome || "zzz").toLowerCase()
            }[b.dataset.ordina];
            arr.sort((x, y) => chiave(x).localeCompare(chiave(y), "it"));
            salvaDebounce();
            await renderLista(document.querySelector("[data-lista='luoghi']"));
            bar.querySelectorAll("[data-ordina]").forEach(x => x.classList.toggle("attivo", x === b));
        });
    }

    // ───────────────────────── passo 9: Gruppi, relazioni ed En ─────────────────────────
    const RELAZIONI_SUGGERITE = ["moglie", "marito", "fidanzati", "ex fidanzati", "amanti", "madre e figlio", "padre e figlia", "fratelli", "compagni di scuola", "colleghi", "capo e sottoposto", "rivali", "amici d'infanzia", "creditore e debitore", "complici", "assassino e vittima", "vicini di casa", "maestro e allievo", "membro della banda", "schedato dal distretto", "informatore del distretto", "sotto protezione di", "territorio conteso"];
    const GRUPPO_TIPI = ["banda giovanile (bōsōzoku)", "clan yakuza (kumi)", "questura prefetturale (honbu)", "distretto di polizia (keisatsusho)", "distretto dei PG (la squadra)", "kōban di quartiere", "chūzaisho (presidio rurale)", "classe / scuola", "azienda / ufficio", "circolo o associazione", "il giro di un locale", "famiglia allargata"];

    // icone: automatiche dal tipo, personalizzabili da un set
    const ICONE_SET = ["🏠", "🏫", "🏢", "🏥", "🏭", "🚉", "⛩️", "🏮", "🍶", "🎰", "🏍️", "👮", "🚓", "💰", "📚", "🥋", "♨️", "🏪", "🔧", "⛽", "💈", "🌉", "⛰️", "🚬", "🔪", "❓"];
    function iconaLuogo(l) {
        if (l.icona) return l.icona;
        const t = (l.tipologiaId || "").toLowerCase();
        const mappa = [["casa", "🏠"], ["apāto", "🏠"], ["danchi", "🏠"], ["villa", "🏠"], ["stanza", "🏠"], ["dormitorio", "🏠"], ["machiya", "🏠"], ["mansion", "🏠"], ["scuola", "🏫"], ["juku", "🏫"], ["campus", "🏫"], ["ufficio", "🏢"], ["banca", "🏢"], ["tribunale", "🏢"], ["ospedale", "🏥"], ["fabbrica", "🏭"], ["cantiere", "🏭"], ["magazzino", "🏭"], ["stazione", "🚉"], ["tempio", "⛩️"], ["cimitero", "⛩️"], ["izakaya", "🏮"], ["snack", "🏮"], ["club", "🏮"], ["kissaten", "🏮"], ["ristorante", "🏮"], ["ryōtei", "🏮"], ["hotel", "🏩"], ["sake", "🍶"], ["pachinko", "🎰"], ["mahjong", "🎰"], ["giochi", "🎰"], ["karaoke", "🎤"], ["jimusho", "🚬"], ["clan", "🚬"], ["pegni", "💰"], ["biblioteca", "📚"], ["dōjō", "🥋"], ["palestra", "🥋"], ["onsen", "♨️"], ["sentō", "♨️"], ["konbini", "🏪"], ["officina", "🔧"], ["distributore", "⛽"], ["barbiere", "💈"], ["lavanderia", "💈"], ["argine", "🌉"], ["ponte", "🌉"], ["fiume", "🌉"], ["sentiero", "⛰️"], ["campi", "⛰️"], ["mercato", "🏪"], ["laboratorio", "🏢"], ["parcheggio", "🚉"], ["videonoleggio", "📚"], ["posta", "🏢"], ["parco", "⛰️"], ["honbu", "🏛️"], ["questura", "🏛️"], ["distretto", "👮"], ["keisatsusho", "👮"], ["kōban", "🚨"], ["koban", "🚨"], ["chūzaisho", "🏡"], ["presidio", "🏡"]];
        for (const [k, ic] of mappa) if (t.includes(k)) return ic;
        return "📍";
    }
    function iconaGruppo(g) {
        if (g.icona) return g.icona;
        const t = (g.tipo || "").toLowerCase();
        if (t.includes("dei pg")) return "🚓";
        if (t.includes("honbu") || t.includes("questura")) return "🏛️";
        if (t.includes("kōban") || t.includes("koban")) return "🚨";
        if (t.includes("chūzaisho") || t.includes("presidio")) return "🏡";
        if (t.includes("distretto") || t.includes("keisatsusho")) return "👮";
        if (t.includes("banda")) return "🏍️";
        if (t.includes("yakuza") || t.includes("kumi")) return "🚬";
        if (t.includes("scuola") || t.includes("classe")) return "🏫";
        if (t.includes("azienda")) return "🏢";
        if (t.includes("locale")) return "🏮";
        return "👥";
    }
    const optsIcona = (sel) => `<option value="">icona auto</option>` + ICONE_SET.map(ic => `<option value="${ic}" ${sel === ic ? "selected" : ""}>${ic}</option>`).join("");

    const gruppo = (id) => lista("gruppi").find(g => g.id === id);
    const attore = (id) => persona(id) || gruppo(id);
    const nomeAttore = (id) => { const a = attore(id); return a ? (a.nome && a.cognome !== undefined ? nomePieno(a) : a.nome || "") : ""; };
    const descrAttore = (id, max = 34) => {
        const p = persona(id);
        if (p) return chiEBreve(p, max);
        const g = gruppo(id);
        if (!g) return "";
        const d = `${g.tipo || "gruppo"}${g.zona ? ` · ${g.zona}` : ""}${(g.membriIds || []).length ? ` · ${g.membriIds.length} membri` : ""}`;
        return d.length > max ? d.slice(0, max - 1) + "…" : d;
    };
    // scala canonica del manuale (En 縁, da −5 a +5; ±4/±5 = relazioni profonde)
    const EN_SCALA = [[5, "Amore incondiz."], [4, "Legame di sangue"], [3, "Devoto"], [2, "Leale"], [1, "Amichevole"], [0, "Neutro"], [-1, "Diffidente"], [-2, "Ostile"], [-3, "Nemico"], [-4, "Odio profondo"], [-5, "Vendetta/Rovina"]];

    function initRelazioni() {
        const cont = document.querySelector("[data-lista='relazioni']");
        if (!cont) return;
        // i gruppi compaiono nelle tendine delle relazioni: rigenera le righe quando i gruppi cambiano
        if (!cont.contains(document.activeElement)) renderLista(cont);
        const contGruppi = document.querySelector("[data-lista='gruppi']");
        if (contGruppi && !contGruppi.dataset.syncRel) {
            contGruppi.dataset.syncRel = "1";
            contGruppi.addEventListener("input", () => {
                clearTimeout(initRelazioni._t2);
                initRelazioni._t2 = setTimeout(() => {
                    const rc = document.querySelector("[data-lista='relazioni']");
                    if (rc && !rc.contains(document.activeElement)) renderLista(rc);
                }, 900);
            });
        }
        disegnaGrafoRelazioni();
        if (initRelazioni._bound) return;
        initRelazioni._bound = true;
        document.addEventListener("input", () => { clearTimeout(initRelazioni._t); initRelazioni._t = setTimeout(disegnaGrafoRelazioni, 700); });
        document.addEventListener("click", (e) => { if (e.target.closest("[data-del],[data-agg]")) { clearTimeout(initRelazioni._t); initRelazioni._t = setTimeout(disegnaGrafoRelazioni, 400); } });
    }

    const etichettaEn = (v) => (EN_SCALA.find(([n]) => String(n) === String(v)) || [0, ""])[1];
    const fmtEn = (v) => v === "" || v === undefined || v === null ? "" : (+v > 0 ? `+${+v}` : `${+v}`);
    const colEn = (v) => +v > 0 ? "#2e7d32" : +v < 0 ? "#8b0000" : "#8a8a8a";

    // layout "a raggiera": la vittima al centro (è il centro del caso), gli altri su un anello
    // ORDINATO così che chi è in relazione stia vicino → i raggi non si incrociano mai,
    // e le relazioni anello-anello viaggiano con archi ESTERNI all'anello
    function layoutRaggiera(persone, rels, W, H) {
        const cx = W / 2, cy = H / 2;
        const hub = persone.find(p => p.ruoloNelCaso === "vittima") || persone[0];
        const altri = persone.filter(p => p !== hub);
        const adiacenti = {};
        altri.forEach(p => adiacenti[p.id] = new Set());
        rels.forEach(r => {
            if (r.aId !== hub.id && r.bId !== hub.id && adiacenti[r.aId] && adiacenti[r.bId]) {
                adiacenti[r.aId].add(r.bId);
                adiacenti[r.bId].add(r.aId);
            }
        });
        const gruppo = (p) => (p.cerchio || "").split(":")[1] || "";
        const ordinati = [];
        const pool = [...altri];
        let cur = pool.find(p => p.ruoloNelCaso === "colpevole") || pool[0] || null;
        while (cur) {
            ordinati.push(cur);
            pool.splice(pool.indexOf(cur), 1);
            const ultimo = ordinati[ordinati.length - 1];
            cur = pool.find(p => adiacenti[ultimo.id].has(p.id))
                || pool.find(p => gruppo(p) === gruppo(ultimo))
                || pool[0] || null;
        }
        const R = Math.min(W, H) / 2 - 95;
        const pos = { [hub.id]: { x: cx, y: cy } };
        ordinati.forEach((p, i) => {
            const a = -Math.PI / 2 + (2 * Math.PI * i) / Math.max(ordinati.length, 1);
            pos[p.id] = { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
        });
        return { pos, hubId: hub.id };
    }

    // grafo + tabella da tavolo, ridisegnati insieme
    function disegnaGrafoRelazioni() {
        const svgBox = document.getElementById("wz-rel-grafo");
        if (!svgBox) return;
        const rels = lista("relazioni").filter(r => r.aId && r.bId && r.aId !== r.bId);
        const gruppi = lista("gruppi").filter(g => g.nome);
        const attori = [...cast(), ...gruppi];
        if (!attori.length) { svgBox.innerHTML = "<p class='wz-nota'>Il cast è vuoto.</p>"; return; }
        // le appartenenze contano come legami per il layout: i membri si dispongono vicino al loro gruppo
        const legamiLayout = [...rels, ...gruppi.flatMap(g => (g.membriIds || []).map(m => ({ aId: g.id, bId: m })))];
        const W = 760, H = Math.max(470, 110 * Math.ceil(attori.length / 2));
        const { pos, hubId } = layoutRaggiera(attori, legamiLayout, W, H);
        const cx = W / 2, cy = H / 2;

        // appartenenze: tratteggio leggero gruppo→membro (sotto tutto)
        let appartenenze = "";
        for (const g of gruppi) for (const m of (g.membriIds || [])) {
            const A = pos[g.id], B = pos[m];
            if (A && B) appartenenze += `<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" stroke="#cbbf96" stroke-width="1" stroke-dasharray="3 4" />`;
        }

        // archi: i raggi dal centro sono quasi dritti; le relazioni anello-anello girano ALL'ESTERNO;
        // etichette con alone, En a distanza fissa dai nodi (a ventaglio, non impilate)
        let archi = "";
        const puntoCurva = (A, C, B, t) => ({
            x: (1 - t) ** 2 * A.x + 2 * (1 - t) * t * C.x + t * t * B.x,
            y: (1 - t) ** 2 * A.y + 2 * (1 - t) * t * C.y + t * t * B.y
        });
        for (const r of rels) {
            const A = pos[r.aId], B = pos[r.bId];
            if (!A || !B) continue;
            const spoke = r.aId === hubId || r.bId === hubId;
            const dx = B.x - A.x, dy = B.y - A.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
            // normale al segmento, scelta VERSO L'ESTERNO (lontano dal centro)
            let nx = -dy / d, ny = dx / d;
            const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
            if ((mx + nx - cx) ** 2 + (my + ny - cy) ** 2 < (mx - nx - cx) ** 2 + (my - ny - cy) ** 2) { nx = -nx; ny = -ny; }
            const pancia = spoke ? 12 : 46 + d * 0.14;
            const C = { x: mx + nx * pancia, y: my + ny * pancia };
            archi += `<path d="M ${A.x} ${A.y} Q ${C.x} ${C.y} ${B.x} ${B.y}" fill="none" stroke="#d0c49a" stroke-width="1.6" />`;
            const apice = puntoCurva(A, C, B, 0.5);
            if (r.tipo) archi += `<text x="${apice.x + nx * 11}" y="${apice.y + ny * 11}" class="wz-rel-tipo">${r.tipo}</text>`;
            // En a distanza fissa dal bordo del nodo, spostati sul lato della pancia: si dispongono a ventaglio
            const tA = Math.min(0.3, 38 / d), tB = 1 - tA;
            const pA = puntoCurva(A, C, B, tA), pB = puntoCurva(A, C, B, tB);
            if (fmtEn(r.enAB)) archi += `<text x="${pA.x + nx * 9}" y="${pA.y + ny * 9}" class="wz-rel-en" fill="${colEn(r.enAB)}">${fmtEn(r.enAB)} ›</text>`;
            if (fmtEn(r.enBA)) archi += `<text x="${pB.x + nx * 9}" y="${pB.y + ny * 9}" class="wz-rel-en" fill="${colEn(r.enBA)}">‹ ${fmtEn(r.enBA)}</text>`;
        }
        let nodi = "";
        for (const a of attori) {
            const { x, y } = pos[a.id];
            const isGruppo = a.cognome === undefined && a.membriIds !== undefined;
            if (isGruppo) {
                const distretto = (a.tipo || "").includes("distretto");
                nodi += `<rect x="${x - 26}" y="${y - 16}" width="52" height="32" rx="8" fill="${distretto ? "#eef1f7" : "#f2efe4"}" stroke="#1a1a2e" stroke-width="1.4" stroke-dasharray="${distretto ? "" : "5 3"}" />` +
                    `<text x="${x}" y="${y + 5}" class="wz-rel-iniziali" fill="#1a1a2e">${distretto ? "署" : "組"}</text>` +
                    `<text x="${x}" y="${y + 33}" class="wz-rel-nome">${a.nome}</text>` +
                    (descrAttore(a.id, 26) ? `<text x="${x}" y="${y + 46}" class="wz-rel-chie">${descrAttore(a.id, 26)}</text>` : "");
                continue;
            }
            const p = a;
            const vitt = p.ruoloNelCaso === "vittima", colp = p.ruoloNelCaso === "colpevole";
            const anello = vitt ? "#b49650" : colp ? "#8b0000" : "#1a1a2e";
            const iniziali = p.kanji ? p.kanji.replace(/[（）\s]/g, "").slice(0, 1) : `${(p.cognome || "?")[0] || ""}${(p.nome || "")[0] || ""}`;
            nodi += `<circle cx="${x}" cy="${y}" r="20" fill="${vitt ? "#fdf6e3" : colp ? "#fdeeee" : "#fffdf6"}" stroke="${anello}" stroke-width="${vitt || colp ? 3 : 1.3}" />` +
                `<text x="${x}" y="${y + 5}" class="wz-rel-iniziali" fill="${anello}">${vitt ? "✝" : colp ? "刃" : iniziali}</text>` +
                `<text x="${x}" y="${y + 37}" class="wz-rel-nome">${nomePieno(p)}</text>` +
                (chiEBreve(p, 26) ? `<text x="${x}" y="${y + 50}" class="wz-rel-chie">${chiEBreve(p, 26)}</text>` : "");
        }
        svgBox.innerHTML = `<svg viewBox="0 0 ${W} ${H}" class="wz-rel-svg" role="img" aria-label="Grafo delle relazioni">${appartenenze}${archi}${nodi}</svg>`;

        // tabella da tavolo: tutte le relazioni a colpo d'occhio
        const tab = document.getElementById("wz-rel-tabella");
        if (tab) {
            const cellaA = (id) => `<td><strong>${nomeAttore(id) || "?"}</strong>${descrAttore(id, 34) ? `<small class="wz-chie">${descrAttore(id, 34)}</small>` : ""}</td>`;
            const cellaEn = (v) => fmtEn(v) === "" ? "<td></td>" : `<td class="wz-rel-encella" style="color:${colEn(v)}">${fmtEn(v)}<small>${etichettaEn(v)}</small></td>`;
            tab.innerHTML = rels.length === 0 ? "<p class='wz-nota'>Nessuna relazione ancora: aggiungile qui sopra.</p>" :
                `<table class="wz-tab-rel">
                    <tr><th>Chi</th><th>En →</th><th>relazione</th><th>← En</th><th>Chi</th></tr>` +
                rels.map(r => `<tr>${cellaA(r.aId)}${cellaEn(r.enAB)}<td class="wz-rel-tipocella">${r.tipo || "—"}</td>${cellaEn(r.enBA)}${cellaA(r.bId)}</tr>`).join("") +
                `</table>`;
        }
    }

    // mini-form "aggiungi una persona al cast" — usato al passo 7 (filtro movente) e al passo 5 (assassino):
    // la persona entra in cast + "Altre persone del caso", senza dover tornare indietro
    function montaAggiungiPersona(cont, etichettaBtn, onCreato) {
        cont.innerHTML = `<button type="button" class="wz-btn wz-aggiungi">${etichettaBtn}</button>`;
        cont.querySelector("button").addEventListener("click", () => {
            cont.innerHTML = `
            <div class="wz-blocco-lista">
                <div class="wz-riga-lista">
                    <button type="button" class="wz-btn wz-mini" data-np-dado title="Genera nome (anti-omonimie)">🎲</button>
                    <input type="text" placeholder="Cognome" data-np="cognome" class="wz-corto" autocomplete="off" />
                    <input type="text" placeholder="Nome" data-np="nome" class="wz-corto" autocomplete="off" />
                    <input type="number" value="30" min="8" max="99" data-np="eta" class="wz-num" title="Età" />
                    <select data-np="genere" class="wz-num"><option value="m">M</option><option value="f">F</option></select>
                </div>
                <input type="text" placeholder="Chi è nel caso (es. capo banda — gelosia per la stessa ragazza)" data-np="relazione" />
                <div class="wz-np-esito wz-nota"></div>
                <div class="wz-dialog-azioni">
                    <button type="button" class="wz-btn" data-np-annulla>Annulla</button>
                    <button type="button" class="wz-btn wz-btn-primario" data-np-crea>Aggiungi al cast</button>
                </div>
            </div>`;
            const v = (k) => cont.querySelector(`[data-np='${k}']`).value;
            cont.querySelector("[data-np-dado]").addEventListener("click", async () => {
                const n = await generaNome(v("genere") || "m", +v("eta") || 30, null);
                cont.querySelector("[data-np='cognome']").value = n.cognome;
                cont.querySelector("[data-np='nome']").value = n.nome;
                cont.querySelector(".wz-np-esito").textContent = "";
            });
            cont.querySelector("[data-np-annulla]").addEventListener("click", () => montaAggiungiPersona(cont, etichettaBtn, onCreato));
            const crea = cont.querySelector("[data-np-crea]");
            crea.addEventListener("click", async () => {
                const cognome = v("cognome").trim(), nome = v("nome").trim();
                const esitoBox = cont.querySelector(".wz-np-esito");
                if (!cognome || !nome) { esitoBox.textContent = "Servono cognome e nome — o usa il 🎲."; return; }
                const esito = await verificaNome(cognome, nome, "");
                if (!esito.libero && !crea.dataset.forza) {
                    esitoBox.textContent = `⚠ ${esito.motivo} — tocca di nuovo «Aggiungi» per confermare lo stesso.`;
                    crea.dataset.forza = "1";
                    return;
                }
                const p = { id: nuovoId("p"), cognome, nome, kanji: esito.kanji || "", eta: +v("eta") || 30, genere: v("genere") || "m", ruoloNelCaso: "contorno", cerchio: "vittima:altri", rilevante: false, nomeValidato: !!esito.libero, note: "" };
                cast().push(p);
                lista("passo3.altri").push({ personaId: p.id, relazione: v("relazione").trim() });
                salvaDebounce();
                montaAggiungiPersona(cont, etichettaBtn, onCreato);
                onCreato(p);
            });
        });
    }

    // chi è questa persona? (cerchio + relazione scritte al passo 3/6)
    function chiE(pid) {
        for (const path of ["passo3.famiglia", "passo3.lavoro", "passo3.amici", "passo3.altri", "passo6.famiglia", "passo6.lavoro", "passo6.amici", "passo6.altri"]) {
            const r = (get(path) || []).find(x => x.personaId === pid);
            if (r) {
                const cerchio = path.includes("famiglia") ? "famiglia" : path.includes("lavoro") ? "lavoro" : path.includes("altri") ? "altra persona del caso" : "amici";
                const rete = path.startsWith("passo6") ? " (rete del colpevole)" : "";
                return `${cerchio}${rete}${r.relazione ? " · " + r.relazione : ""}`;
            }
        }
        const p = persona(pid);
        return p?.professione || "";
    }

    function initFiltroCast() {
        const box = document.getElementById("wz-filtro-cast");
        if (!box) return;

        // promemoria del movente sopra la lista
        const mov = document.getElementById("wz-filtro-movente");
        if (mov && get("passo4.descrizione")) {
            mov.hidden = false;
            mov.innerHTML = `<p><strong>Il movente</strong>: ${get("passo4.descrizione")}</p>`;
        }

        // manca una persona (es. l'assassino che hai già in mente)? creala qui senza tornare indietro
        const nuovoBox = document.getElementById("wz-filtro-nuovo");
        if (nuovoBox) montaAggiungiPersona(nuovoBox, "＋ Manca qualcuno? Aggiungi una persona al cast", () => initFiltroCast());

        const candidati = lista("passo4.candidati");
        const esclusioni = lista("passo4.esclusioni");
        const statoDi = (pid) =>
            candidati.some(c => c.personaId === pid) ? "candidato" :
            esclusioni.some(c => c.personaId === pid) ? "escluso" : "neutro";
        const percheDi = (pid) =>
            (candidati.find(c => c.personaId === pid) || esclusioni.find(c => c.personaId === pid) || {}).perche || "";

        const SEGNAPOSTO = {
            candidato: "Perché poteva avercela? (es. se la vittima parlava, perdeva tutto)",
            escluso: "Perché no? (es. non sapeva nulla della questione — ma i PG lo sospetteranno lo stesso)"
        };

        box.innerHTML = cast().filter(p => p.ruoloNelCaso !== "vittima").map(p => {
            const st = statoDi(p.id);
            const chi = chiE(p.id);
            return `<div class="wz-filtro-card ${st}" data-pid="${p.id}">
                <div class="wz-filtro-testa">
                    <strong>${nomePieno(p)}</strong>${p.eta ? `<span class="wz-filtro-eta">${p.eta} anni</span>` : ""}
                    ${chi ? `<span class="wz-filtro-chi">${chi}</span>` : ""}
                </div>
                <div class="wz-filtro-domanda">Aveva questa ragione?</div>
                <div class="wz-seg">
                    <label><input type="radio" name="f-${p.id}" value="candidato" ${st === "candidato" ? "checked" : ""}/><span>Sì, poteva avercela</span></label>
                    <label><input type="radio" name="f-${p.id}" value="escluso" ${st === "escluso" ? "checked" : ""}/><span>No, escludilo</span></label>
                    <label><input type="radio" name="f-${p.id}" value="neutro" ${st === "neutro" ? "checked" : ""}/><span>Non so ancora</span></label>
                </div>
                <input type="text" class="f-perche" ${st === "neutro" ? "hidden" : ""}
                    placeholder="${SEGNAPOSTO[st] || ""}"
                    value="${percheDi(p.id).replace(/"/g, "&quot;")}" />
            </div>`;
        }).join("") || `<p class="wz-nota">Il cast è vuoto: torna al passo 4 e costruisci la vita della vittima.</p>`;

        const conto = document.getElementById("wz-filtro-conto");
        const sync = () => {
            const cand = [], escl = [];
            box.querySelectorAll(".wz-filtro-card").forEach(card => {
                const pid = card.dataset.pid;
                const st = card.querySelector("input[type=radio]:checked")?.value || "neutro";
                const percheEl = card.querySelector(".f-perche");
                card.className = `wz-filtro-card ${st}`;
                percheEl.hidden = st === "neutro";
                if (st !== "neutro") percheEl.placeholder = SEGNAPOSTO[st];
                if (st === "candidato") cand.push({ personaId: pid, perche: percheEl.value });
                if (st === "escluso") escl.push({ personaId: pid, perche: percheEl.value });
            });
            set("passo4.candidati", cand);
            set("passo4.esclusioni", escl);
            if (conto) conto.innerHTML =
                cand.length === 0 ? "L'assassino scelto al passo 5 è già candidato: qui aggiungi chi ALTRO aveva la stessa ragione (false piste)."
                : `✓ ${cand.length} candidat${cand.length === 1 ? "o" : "i"}, ${escl.length} esclus${escl.length === 1 ? "o" : "i"}${escl.length ? " (potenziali false piste)" : ""}.`;
        };
        box.addEventListener("change", sync);
        box.addEventListener("input", sync);
        sync();
    }

    function initColpevoli() {
        const box = document.getElementById("wz-scelta-colpevoli");
        if (!box) return;
        const scelti = lista("passo5.colpevoliIds");
        const candidati = (get("passo4.candidati") || []).map(c => c.personaId);
        box.innerHTML = cast().filter(p => p.ruoloNelCaso !== "vittima").map(p => `
            <label class="wz-check ${candidati.includes(p.id) ? "wz-candidato" : ""}">
                <input type="checkbox" value="${p.id}" ${scelti.includes(p.id) ? "checked" : ""} />
                <span class="wz-check-testo">${nomePieno(p)} ${candidati.includes(p.id) ? "· <em>candidato del movente</em>" : ""}
                ${chiEBreve(p, 60) ? `<small class="wz-chie">${chiEBreve(p, 60)}</small>` : ""}</span>
            </label>`).join("") || `<p class="wz-nota">Il cast è vuoto: torna al passo 4 — oppure crea l'assassino direttamente qui sotto.</p>`;
        if (!box.dataset.bound) { // initColpevoli può essere richiamata (dopo "crealo qui"): il listener va messo una volta sola
            box.dataset.bound = "1";
            box.addEventListener("change", () => {
                const ids = Array.from(box.querySelectorAll("input:checked")).map(i => i.value);
                set("passo5.colpevoliIds", ids);
                const cand = lista("passo4.candidati");
                cast().forEach(p => {
                    if (ids.includes(p.id)) {
                        p.ruoloNelCaso = "colpevole";
                        // l'assassino ha la ragione per definizione: entra tra i candidati del movente (passo 7)
                        if (!cand.some(c => c.personaId === p.id)) cand.push({ personaId: p.id, perche: "" });
                    } else if (p.ruoloNelCaso === "colpevole") {
                        p.ruoloNelCaso = "contorno";
                        const ci = cand.findIndex(c => c.personaId === p.id && !c.perche);
                        if (ci >= 0) cand.splice(ci, 1); // tolto solo se il perché è ancora vuoto
                    }
                });
                salvaDebounce();
                renderAnagrafiche();
            });
        }
        renderAnagrafiche();

        // "so già chi è": crea l'assassino qui — entra nel cast (Altre persone), tra i candidati del movente, e viene selezionato subito
        const nuovoBox = document.getElementById("wz-colp-nuovo");
        if (nuovoBox) montaAggiungiPersona(nuovoBox, "＋ L'assassino non è nell'elenco? Crealo qui", (p) => {
            const ids = lista("passo5.colpevoliIds");
            if (!ids.includes(p.id)) ids.push(p.id);
            p.ruoloNelCaso = "colpevole";
            const cand = lista("passo4.candidati");
            if (!cand.some(c => c.personaId === p.id)) cand.push({ personaId: p.id, perche: "" });
            salvaDebounce();
            initColpevoli();
        });

        // il colpevole è una persona con lo stesso peso della vittima: anagrafica completa qui
        async function renderAnagrafiche() {
            const anag = document.getElementById("wz-colp-anagrafiche");
            if (!anag) return;
            const ids = get("passo5.colpevoliIds") || [];
            if (!ids.length) { anag.innerHTML = ""; return; }
            const libP = await lib("professioni");
            anag.innerHTML = ids.map(id => {
                const p = persona(id);
                if (!p) return "";
                const val = p.professione || "";
                const match = libP.professioni.find(v => v.nome === val);
                const custom = !!val && !match;
                const optsProf = `<option value="">Professione — scegli</option>` +
                    inOrdine(libP.professioni, v => v.nome).map(v => `<option value="${v.nome.replace(/"/g, "&quot;")}" ${v.nome === val ? "selected" : ""}>${v.nome} — ${v.ambiente}</option>`).join("") +
                    `<option value="__custom" ${custom ? "selected" : ""}>✏️ Altro — lo scrivo io</option>`;
                return `
                <div class="wz-blocco-lista wz-colp-card" data-pid="${p.id}">
                    <p class="wz-colp-titolo">Chi è <strong>${nomePieno(p) || "il colpevole"}</strong> — anagrafica completa, come la vittima</p>
                    <div class="wz-riga-lista">
                        <button type="button" class="wz-btn wz-mini" data-colp-dado="${p.id}" title="Genera nome (anti-omonimie)">🎲</button>
                        <input type="text" placeholder="Cognome" value="${(p.cognome || "").replace(/"/g, "&quot;")}" data-colp="cognome" data-pid="${p.id}" class="wz-corto" />
                        <input type="text" placeholder="Nome" value="${(p.nome || "").replace(/"/g, "&quot;")}" data-colp="nome" data-pid="${p.id}" class="wz-corto" />
                        <span class="wz-nome-mostra">${p.kanji || ""}</span>
                        <input type="number" title="Età" value="${p.eta || 40}" min="8" max="99" data-colp="eta" data-pid="${p.id}" class="wz-num" />
                        <select data-colp="genere" data-pid="${p.id}" class="wz-num"><option value="m" ${p.genere !== "f" ? "selected" : ""}>M</option><option value="f" ${p.genere === "f" ? "selected" : ""}>F</option></select>
                    </div>
                    <div class="wz-colp-esito wz-nota"></div>
                    <div class="wz-riga-lista">
                        <select data-colp-prof="${p.id}" class="wz-lungo">${optsProf}</select>
                        <input type="text" placeholder="Professione (tua)" value="${custom ? String(val).replace(/"/g, "&quot;") : ""}" data-colp="professione" data-pid="${p.id}" class="wz-medio wz-custom-input" ${custom ? "" : "hidden"} />
                    </div>
                    <input type="text" placeholder="Posto nel mondo (es. capo dei Kurokaze, temuto in tre distretti)" value="${(p.postoNelMondo || "").replace(/"/g, "&quot;")}" data-colp="postoNelMondo" data-pid="${p.id}" />
                </div>`;
            }).join("");

            anag.querySelectorAll("[data-colp]").forEach(el => el.addEventListener("input", () => {
                const p = persona(el.dataset.pid); if (!p) return;
                const c = el.dataset.colp;
                p[c] = el.type === "number" ? +el.value : el.value;
                if (c === "cognome" || c === "nome") verificaColp(el.closest(".wz-colp-card"), p);
                salvaDebounce();
            }));
            anag.querySelectorAll("[data-colp-prof]").forEach(sel => sel.addEventListener("change", () => {
                const p = persona(sel.dataset.colpProf); if (!p) return;
                const inp = sel.parentElement.querySelector(".wz-custom-input");
                if (sel.value === "__custom") { inp.hidden = false; inp.focus(); }
                else { inp.hidden = true; inp.value = ""; p.professione = sel.value; salvaDebounce(); }
            }));
            anag.querySelectorAll("[data-colp-dado]").forEach(b => b.addEventListener("click", async () => {
                const p = persona(b.dataset.colpDado); if (!p) return;
                const n = await generaNome(p.genere || "m", p.eta || 40, null);
                const vecchio = nomePieno(p);
                Object.assign(p, { cognome: n.cognome, nome: n.nome, kanji: n.kanji, nomeValidato: true });
                propagaRinomina(vecchio, nomePieno(p));
                salvaDebounce();
                renderAnagrafiche();
            }));
        }

        let colpT;
        async function verificaColp(card, p) {
            clearTimeout(colpT);
            colpT = setTimeout(async () => {
                if (!p.cognome || !p.nome) return;
                const esito = await verificaNome(p.cognome, p.nome, p.id);
                card.querySelector(".wz-nome-mostra").textContent = esito.kanji || "";
                if (esito.kanji) p.kanji = esito.kanji;
                p.nomeValidato = !!esito.libero;
                const box2 = card.querySelector(".wz-colp-esito");
                box2.textContent = esito.libero ? "" : `⚠ ${esito.motivo}`;
                box2.classList.toggle("l-err", !esito.libero);
                card.querySelectorAll("[data-colp='cognome'],[data-colp='nome']").forEach(i => i.classList.toggle("wz-nome-ko", !esito.libero));
                salvaDebounce();
            }, 450);
        }
    }

    function initIntersezione() {
        const box = document.getElementById("wz-intersezione");
        if (!box) return;
        const reteVittima = new Set(["passo3.famiglia", "passo3.lavoro", "passo3.amici", "passo3.altri"].flatMap(p => (get(p) || []).map(x => x.personaId)));
        const reteColpevole = new Set(["passo6.famiglia", "passo6.lavoro", "passo6.amici", "passo6.altri"].flatMap(p => (get(p) || []).map(x => x.personaId)));
        const comuni = [...reteVittima].filter(id => reteColpevole.has(id));
        const salvate = lista("passo6.intersezione");
        const valDi = (id) => (salvate.find(x => x.chi === id) || {}).saSenzaSapere || "";
        box.innerHTML = comuni.length === 0
            ? `<p class="wz-nota">Nessuna persona in entrambe le reti (ancora). Le istituzioni comuni — segreterie, banche, uffici — puoi annotarle nei luoghi o nella cronistoria.</p>`
            : comuni.map(id => `
                <div class="wz-riga-lista">
                    <strong class="wz-medio">${nomePieno(persona(id))}<small class="wz-chie">${chiEBreve(persona(id), 40)}</small></strong>
                    <input type="text" class="wz-lungo inter-sa" data-pid="${id}"
                        placeholder="Cosa sa senza sapere di saperlo" value="${valDi(id).replace(/"/g, "&quot;")}" />
                </div>`).join("");
        box.addEventListener("input", () => {
            set("passo6.intersezione", Array.from(box.querySelectorAll(".inter-sa"))
                .map(el => ({ chi: el.dataset.pid, saSenzaSapere: el.value }))
                .filter(x => x.saSenzaSapere));
        });
    }

    // ── statistiche: PNG notevoli (attributi 4–9; Ki = attributo più basso + 2d6 prendi il migliore, tetto 12)
    //    ed enti (Manuale Situazioni, Scheda Distretto: 2d6 somma, min 4 max 9, Corruzione MAI tirata) ──
    const ATTR_PNG = ["Distacco", "Pazienza", "Silenzio", "Lucidità", "Ascolto", "Presenza"];
    // esempi da cui PARTIRE (poi il master ritocca): [nome, min, max, bias per attributo]
    const ARCHETIPI_PNG = [
        ["Gente comune", [
            ["civile ordinario", 4, 6, {}],
            ["studente", 4, 6, { Lucidità: 1 }],
            ["anziano del quartiere", 4, 6, { Pazienza: 2, Ascolto: 1 }],
            ["atleta", 5, 7, { Silenzio: 1, Pazienza: 1 }],
        ]],
        ["Professioni", [
            ["impiegato / burocrate", 4, 6, { Pazienza: 1, Lucidità: 1 }],
            ["giornalista", 5, 7, { Ascolto: 2, Lucidità: 1 }],
            ["medico", 5, 7, { Distacco: 2, Lucidità: 1 }],
            ["professore universitario", 5, 7, { Lucidità: 2, Presenza: 1 }],
            ["avvocato", 5, 7, { Lucidità: 1, Silenzio: 1, Presenza: 1 }],
        ]],
        ["Divise", [
            ["poliziotto", 5, 7, { Distacco: 1, Presenza: 1 }],
            ["detective veterano", 6, 8, { Ascolto: 2, Pazienza: 1 }],
            ["soldato / ex militare", 6, 8, { Distacco: 2, Silenzio: 1 }],
        ]],
        ["Malavita", [
            ["teppista di strada", 4, 6, { Presenza: 1 }],
            ["capobanda", 5, 7, { Presenza: 2, Silenzio: 1 }],
            ["sicario professionista", 6, 8, { Pazienza: 2, Silenzio: 2 }],
            ["boss yakuza", 6, 8, { Presenza: 2, Silenzio: 2 }],
        ]],
    ];
    const trovaArchetipo = (nome) => {
        for (const [, voci] of ARCHETIPI_PNG) { const v = voci.find(x => x[0] === nome); if (v) return v; }
        return ARCHETIPI_PNG[0][1][0];
    };
    const ATTR_ENTE = ["Organico", "Efficienza", "Velocità", "Risorse", "Rete", "Corruzione"];
    const SPEC_ENTE = {
        Organico: ["Squadra di sorveglianza", "Unità mobile", "Squadra di assalto", "Squadra perquisizioni", "Copertura civile", "Turni estesi"],
        Efficienza: ["Laboratorio scientifico", "Analisi documentale", "Interrogatorio", "Profilazione", "Coordinamento multi-ente"],
        Velocità: ["Risposta immediata", "Canali prioritari", "Rete di allerta", "Protocollo emergenza"],
        Risorse: ["Tecnologia avanzata", "Archivio esteso", "Fondi operativi", "Flotta veicoli", "Attrezzatura specializzata"],
        Rete: ["Rete informatori", "Contatti giudiziari", "Contatti politici", "Rete criminale", "Cooperazione internazionale", "Media e comunicazione"]
    };
    // il tipo dell'ente sposta il tiro (kōban piccolo, honbu grosso); poi il master ritocca a mano
    function biasEnte(tipo) {
        const t = (tipo || "").toLowerCase();
        if (/honbu|questura|prefettur/.test(t)) return { Organico: 1, Risorse: 1, Velocità: 1 };
        if (/chūzai|chuzai/.test(t)) return { Organico: -2, Risorse: -2, Rete: 2 };
        if (/kōban|koban/.test(t)) return { Organico: -2, Risorse: -1, Rete: 1 };
        if (/procura/.test(t)) return { Efficienza: 1, Velocità: -1 };
        if (/agenzia/.test(t)) return { Organico: -1, Rete: 1 };
        if (/banda|bōsō|boso|gang/.test(t)) return { Organico: -1, Risorse: -2, Rete: 1 };
        return {};
    }
    const rndTra = (a, b) => a + Math.floor(Math.random() * (b - a + 1));

    // tratti fisici guidati: la lista PROPONE, il testo si modifica sempre a mano
    const FIS_TRATTI = [
        ["occhi", ["castano scuro", "quasi neri", "castano chiaro", "piccoli e attenti", "grandi e vivi", "stanchi, con occhiaie", "sguardo sfuggente", "occhiali da vista spessi", "occhiali sottili in metallo"]],
        ["capelli", ["neri corti", "neri con la riga di lato", "brizzolati", "grigi", "radi, stempiato", "calvo", "lunghi raccolti", "permanente anni '90", "decolorati (da bōsōzoku)", "rasati corti"]],
        ["pelle", ["chiara", "olivastra", "segnata dal sole", "segnata dall'acne", "rugosa", "curata"]],
        ["corporatura", ["minuta", "magra", "asciutta", "nella media", "robusta", "massiccia", "atletica", "ingobbita", "alta e magra", "bassa e tarchiata"]],
        ["viso", ["tondo", "ovale", "squadrato", "spigoloso", "zigomi alti", "guance scavate", "doppio mento", "mascella marcata"]],
        ["segni particolari", ["cicatrice sul sopracciglio", "neo evidente sulla guancia", "tatuaggio che spunta dal colletto", "dente d'oro", "mano fasciata", "zoppica leggermente", "manca una falange", "baffi sottili", "barba di tre giorni"]],
        ["abbigliamento", ["completo grigio stanco", "camicia bianca e cravatta scura", "grembiule da lavoro", "tuta da lavoro", "divisa", "giacca di pelle", "tokkō-fuku (tuta da bōsōzoku)", "cardigan sopra la camicia", "tailleur sobrio", "giacca a vento anni '90"]]
    ];

    // "Già nel caso": tutto ciò che il wizard sa già di persona/gruppo, raccolto DA SOLO nella scheda
    // (regola utente: una cosa si scrive in un posto solo — qui si legge, si modifica al passo d'origine)
    function recapAttore(id) {
        const tronca = (s, n) => (s || "").length > n ? (s || "").slice(0, n) + "…" : (s || "");
        const sez = [];
        const S = (titolo, righe, dove) => {
            const arr = (righe || []).filter(Boolean);
            if (arr.length) sez.push(`<p class="wz-rias-sotto">${titolo} <small class="wz-rias-mini">(${dove})</small></p><ul>` + arr.map(r => `<li>${r}</li>`).join("") + "</ul>");
        };
        const p = persona(id);
        const gr = lista("gruppi").find(g => g.id === id);
        // foto della scheda in cima al recap, se c'è
        const sch = lista("passo8.schede").find(s => s.personaId === id);
        if (sch?.foto) sez.push(`<img class="wz-recap-foto" src="${sch.foto}" alt="ritratto" />`);

        if (p) {
            const chi = [];
            if (p.eta) chi.push(`${p.eta} anni`);
            if (p.professione) chi.push(p.professione);
            if (p.postoNelMondo) chi.push(tronca(p.postoNelMondo, 60));
            if (p.ruoloNelCaso === "vittima") chi.push("<strong>la vittima</strong>");
            if (p.ruoloNelCaso === "colpevole") chi.push("<strong>l'assassino</strong>");
            if (chi.length) sez.push(`<p>${chi.join(" · ")}</p>`);
            const cerchie = [];
            for (const [base, lbl] of [["passo3", "vita della vittima"], ["passo6", "mondo dell'assassino"]])
                for (const c of ["famiglia", "lavoro", "amici", "altri"]) {
                    const r = (get(`${base}.${c}`) || []).find(x => x.personaId === id);
                    if (r && r.relazione) cerchie.push(`${r.relazione} <small class="wz-rias-mini">— ${lbl}</small>`);
                }
            S("Nelle cerchie", cerchie, "passi 4 e 6");
            if (p.ruoloNelCaso === "vittima") {
                S("Com'è morta", [get("passo1.rigaUnica")].map(x => tronca(x, 110)), "passo 2");
            }
            if (p.ruoloNelCaso === "colpevole") {
                S("Il suo caso", [
                    get("passo4.descrizione") ? `movente: ${tronca(get("passo4.descrizione"), 90)}` : "",
                    get("passo5.competenze") ? `sa fare: ${tronca(get("passo5.competenze"), 90)}` : "",
                    get("passo5.erroreCoerente") ? `lo sbaglio: ${tronca(get("passo5.erroreCoerente"), 90)}` : ""
                ], "passi 5 e 7");
            }
        }
        if (gr) {
            const testa = [gr.tipo, gr.zona ? zonaNome(gr.zona) : "", tronca(gr.descrizione, 70)].filter(Boolean);
            if (testa.length) sez.push(`<p>${testa.join(" · ")}</p>`);
            S("Membri", (gr.membriIds || []).map(mid => {
                const m = persona(mid);
                return m ? `${nomePieno(m)}${chiEBreve(m, 30) ? ` <small class="wz-rias-mini">${chiEBreve(m, 30)}</small>` : ""}` : "";
            }), "passo 8");
        }
        // gruppi di cui la persona fa parte
        if (p) S("Nei gruppi", lista("gruppi").filter(g => (g.membriIds || []).includes(id))
            .map(g => `${iconaGruppo(g)} ${g.nome || "?"}${g.tipo ? ` <small class="wz-rias-mini">${g.tipo}</small>` : ""}`), "passo 8");
        // relazioni ed En (per persone E gruppi)
        S("Relazioni ed En", lista("relazioni").filter(r => r.aId === id || r.bId === id).map(r => {
            const ioA = r.aId === id;
            const altro = nomeAttore(ioA ? r.bId : r.aId);
            if (!altro) return "";
            const enVerso = ioA ? r.enAB : r.enBA, enDa = ioA ? r.enBA : r.enAB;
            return `${altro}${r.tipo ? ` — ${r.tipo}` : ""} <small class="wz-rias-mini">En verso: ${enVerso === "" || enVerso == null ? "?" : enVerso} · da lui: ${enDa === "" || enDa == null ? "?" : enDa}</small>`;
        }), "passo 8");
        // cronistoria: cosa ha visto/vissuto (nutre "Cosa sa")
        if (p) {
            const evs = lista("passo7.eventi").filter(e => (e.personeIds || []).includes(id))
                .slice().sort((a, b) => (dataDiEvento(a) ?? Infinity) - (dataDiEvento(b) ?? Infinity));
            S("Nella cronistoria", evs.map(e => {
                const luogo = lista("luoghi").find(l => l.id === e.luogoId);
                return `<span class="wz-rias-fase ${e.fase || ""}">[${e.fase || "?"}]</span> <strong>${e.quando || "?"}</strong> — ${tronca(e.testo, 70)}${luogo ? ` <small class="wz-rias-mini">· ${luogo.nome || luogo.tipologiaId}</small>` : ""}`;
            }), "passo 10");
        }
        // informazioni di cui è fonte: cosa può dare ai PG
        const fonteDi = [];
        lista("passo9.tracce").forEach(t => (t.fonti || []).forEach(f => {
            if (f.attoreId === id) fonteDi.push(`«${t.nome || "?"}» — ${tronca(f.versione || t.testo, 80)}${f.handout ? " 📄" : ""}`);
        }));
        S("Può dare ai PG", fonteDi, "passo 12");
        return sez.join("");
    }

    function initSchede() {
        const sel = document.getElementById("wz-scheda-persona");
        const form = document.getElementById("wz-scheda-form");
        const fatteBox = document.getElementById("wz-schede-fatte");
        if (!sel) return;
        const schede = lista("passo8.schede");
        const gruppiConNome = lista("gruppi").filter(g => g.nome);
        // "ha la scheda" = c'è una scheda con almeno un campo compilato (per il simbolo nella tendina)
        const haScheda = (id) => {
            const s = schede.find(x => x.personaId === id);
            if (!s) return false;
            if (["descrizioneFisica", "cosaSa", "cosaNonSa", "cosaHaFatto", "comportamento", "deposizione"].some(k => (s[k] || "").trim())) return true;
            if (s.voce && Object.values(s.voce).some(v => (v || "").trim())) return true;
            if (s.tratti && Object.values(s.tratti).some(v => (v || "").trim())) return true;
            if (s.stats && Object.values(s.stats).some(v => v != null && v !== "")) return true;
            if (s.statsEnte && Object.values(s.statsEnte).some(v => v != null && v !== "")) return true;
            if (s.contatti && Object.values(s.contatti).some(v => v && (typeof v !== "string" || v.trim()))) return true;
            return !!s.foto;
        };
        const marca = (id) => haScheda(id) ? "✓ " : "○ "; // ✓ scheda fatta · ○ da fare
        // popola la tendina col simbolo davanti; preserva la selezione corrente (richiamabile a scheda compilata)
        function popolaSelPersone() {
            const cur = sel.value;
            sel.innerHTML = `<option value="">—</option>` +
                `<optgroup label="Persone">` + inOrdine(cast(), nomePieno).map(p =>
                    `<option value="${p.id}">${marca(p.id)}${nomePieno(p)}${chiEBreve(p) ? " — " + chiEBreve(p) : ""}</option>`).join("") + `</optgroup>` +
                (gruppiConNome.length
                    ? `<optgroup label="Gruppi e distretti">` + inOrdine(gruppiConNome, g => g.nome).map(g =>
                        `<option value="${g.id}">${marca(g.id)}${g.nome}${descrAttore(g.id) ? " — " + descrAttore(g.id) : ""}</option>`).join("") + `</optgroup>`
                    : "");
            sel.value = cur;
        }
        popolaSelPersone();
        // migrazione: il vecchio campo "Dati base" (rimosso dalla scheda) finisce negli appunti 📝 della persona
        for (const s of schede) {
            if (!s.datiBase) { delete s.datiBase; continue; }
            const p = persona(s.personaId);
            if (p) p.note = (p.note ? p.note + "\n" : "") + "[ex Dati base] " + s.datiBase;
            delete s.datiBase;
            salvaDebounce();
        }
        const mostraFatte = () => {
            const conNome = schede.filter(s => nomeAttore(s.personaId));
            fatteBox.innerHTML = conNome.length === 0 ? "<p>Nessuna ancora.</p>" :
                `<div class="wz-membri wz-schede-pill">` + inOrdine(conNome, s => nomeAttore(s.personaId)).map(s =>
                    `<button type="button" class="wz-chip ${s.foto ? "con-foto" : ""} ${s.personaId === sel.value ? "attivo" : ""}" data-sch-apri="${s.personaId}" title="Apri questa scheda">${s.foto ? `<img class="wz-chip-foto" src="${s.foto}" alt="" />` : ""}<span>${nomeAttore(s.personaId)}${descrAttore(s.personaId) ? `<small class="wz-chie">${descrAttore(s.personaId)}</small>` : ""}</span></button>`).join("") + "</div>";
            // un tocco apre la scheda (niente ricerca in tendina)
            fatteBox.querySelectorAll("[data-sch-apri]").forEach(b => b.addEventListener("click", () => {
                sel.value = b.dataset.schApri;
                sel.dispatchEvent(new Event("change", { bubbles: true })); // il change ri-evidenzia anche le pillole
                form.scrollIntoView({ behavior: "smooth", block: "start" });
            }));
            popolaSelPersone(); // tieni aggiornati i simboli ✓/○ nella tendina
        };
        mostraFatte();
        const campi = ["descrizioneFisica", "cosaSa", "cosaNonSa", "cosaHaFatto", "comportamento"];
        const LEVE_VOCE = ["intercalare", "marcatore", "appellativo", "abitudine", "saluto", "rifiuto", "minaccia"];
        const leggiVoce = () => Object.fromEntries(LEVE_VOCE.map(k => [k, document.getElementById("sch-voce-" + k).value]));
        const leggiTratti = () => Object.fromEntries(["vizio", "tic", "oggetto"].map(k => [k, document.getElementById("sch-tratti-" + k).value]));
        const CONTATTI = ["telefono", "cellulare", "email", "altro", "dove"]; // la residenza NON è qui: è un luogo del passo 9 referenziato
        const leggiContatti = () => Object.fromEntries(CONTATTI.map(k => [k, document.getElementById("sch-cont-" + k).value]));
        // ── schede Voce / Tratti del carattere: cambio scheda con le linguette ──
        document.querySelectorAll("[data-cara-tab]").forEach(tab => tab.addEventListener("click", () => {
            const which = tab.dataset.caraTab;
            document.querySelectorAll("[data-cara-tab]").forEach(t => t.classList.toggle("attivo", t === tab));
            document.querySelectorAll("[data-cara-pane]").forEach(p => p.hidden = p.dataset.caraPane !== which);
        }));
        // ── ✨ per-campo: OGNI leva della voce e OGNI tratto ha un pulsantino che lo propone con l'AI ──
        document.querySelectorAll("#wz-scheda-form [data-ai-campo]").forEach(inp => {
            if (inp.parentNode.classList.contains("wz-campo-ai")) return; // già montato (initSchede può rigirare)
            const wrap = document.createElement("span");
            wrap.className = "wz-campo-ai";
            inp.parentNode.insertBefore(wrap, inp);
            wrap.appendChild(inp);
            const btn = document.createElement("button");
            btn.type = "button"; btn.className = "wz-btn wz-mini wz-campo-genera";
            btn.textContent = "✨"; btn.title = "Proponi questo campo con l'AI";
            btn.hidden = !WIZ.aiAttiva;
            wrap.appendChild(btn);
            btn.addEventListener("click", async () => {
                if (!sel.value) return;
                const campo = inp.dataset.aiCampo;
                const orig = btn.textContent;
                btn.disabled = true; btn.textContent = "…";
                try {
                    // porto nel modello ciò che c'è nei campi (l'AI legge dallo stato salvato, per restare in carattere)
                    const s = schedaDi(sel.value); s.voce = leggiVoce(); s.tratti = leggiTratti();
                    await fetch(`/api/progetti/${WIZ.id}/stato`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ statoJson: JSON.stringify(S) })
                    });
                    const r = await fetch(`/api/progetti/${WIZ.id}/scheda-campo`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ personaId: sel.value, campo, modello: modelloAI(), effort: effortAI() })
                    });
                    const json = await r.json().catch(() => ({}));
                    if (!r.ok) { alert("AI: " + (json.detail || json.errore || r.status)); return; }
                    const val = (json.testo || "").trim();
                    if (!val) { alert("L'AI non ha restituito nulla per questo campo — riprova."); return; } // MAI svuotare il campo
                    inp.value = val;
                    if (inp.id.startsWith("sch-voce-")) s.voce = leggiVoce(); else s.tratti = leggiTratti();
                    salvaDebounce(); // la proposta resta anche senza premere Salva
                } catch { alert("AI non raggiungibile"); }
                finally { btn.disabled = false; btn.textContent = orig; }
            });
        });
        // ── costruttore descrizione fisica: tratto + valore (o testo libero) → si accoda al testo ──
        const selTratto = document.getElementById("sch-fis-tratto");
        if (selTratto && !selTratto.options.length) {
            selTratto.innerHTML = FIS_TRATTI.map(([t]) => `<option value="${t}">${t}</option>`).join("");
            const selValore = document.getElementById("sch-fis-valore");
            const libero = document.getElementById("sch-fis-libero");
            const riempiValori = () => {
                const voci = (FIS_TRATTI.find(([t]) => t === selTratto.value) || [null, []])[1];
                selValore.innerHTML = voci.map(v => `<option value="${v}">${v}</option>`).join("") + `<option value="__custom">✏️ Altro…</option>`;
                libero.hidden = true; libero.value = "";
            };
            riempiValori();
            selTratto.addEventListener("change", riempiValori);
            selValore.addEventListener("change", () => {
                libero.hidden = selValore.value !== "__custom";
                if (!libero.hidden) libero.focus();
            });
            document.getElementById("sch-fis-add").addEventListener("click", () => {
                const val = selValore.value === "__custom" ? libero.value.trim() : selValore.value;
                if (!val) { libero.focus(); return; }
                const ta = document.getElementById("sch-descrizioneFisica");
                const frase = `${selTratto.value}: ${val}`;
                const cur = ta.value.trim();
                ta.value = cur ? cur + (/[.;]$/.test(cur) ? " " : "; ") + frase : frase[0].toUpperCase() + frase.slice(1);
                libero.value = "";
            });
        }
        sel.addEventListener("change", () => {
            if (!sel.value) { form.hidden = true; return; }
            form.hidden = false;
            const s = schede.find(x => x.personaId === sel.value) || {};
            const notaBox = document.getElementById("sch-nota-p3");
            const pSel = persona(sel.value);
            if (notaBox) {
                notaBox.hidden = !(pSel && pSel.note);
                if (pSel && pSel.note) notaBox.innerHTML = `<p><strong>📝 I tuoi appunti su ${nomePieno(pSel)}:</strong> ${pSel.note}</p>`;
            }
            // "Già nel caso": raccolto automaticamente dagli altri passi — qui non si riscrive
            aggiornaRecap();
            campi.forEach(c => document.getElementById("sch-" + c).value = s[c] || "");
            document.getElementById("sch-trigger").value = (s.trigger || []).map(t => `${t.se} → ${t.allora}`).join("\n");
            // voce (come parla, 5 leve) e tratti (chi è: vizio/tic/oggetto) convivono in due schede
            const v = s.voce || {};
            ["intercalare", "marcatore", "appellativo", "abitudine", "saluto", "rifiuto", "minaccia"]
                .forEach(k => { const el = document.getElementById("sch-voce-" + k); if (el) el.value = v[k] || ""; });
            const tr = s.tratti || {};
            ["vizio", "tic", "oggetto"].forEach(k => { const el = document.getElementById("sch-tratti-" + k); if (el) el.value = tr[k] || ""; });
            const co = s.contatti || {};
            ["telefono", "cellulare", "email", "altro", "dove"].forEach(k => { const el = document.getElementById("sch-cont-" + k); if (el) el.value = co[k] || ""; });
            // migrazione + PULIZIA: la vecchia stringa residenza diventa un luogo (nome = il testo) e viene SEMPRE rimossa (niente residuo residenza:"")
            if (s.contatti && ("residenza" in s.contatti)) {
                const str = (s.contatti.residenza || "").trim();
                if (str && !s.contatti.residenzaLuogoId) s.contatti.residenzaLuogoId = luogoDaTesto(str).id;
                delete s.contatti.residenza;
                salvaDebounce();
            }
            mostraResidenza(); // popola la select, ripara ref pendenti, mostra l'indirizzo assegnato
            document.getElementById("sch-deposizione").value = s.deposizione || "";
            document.getElementById("sch-dep-handout").checked = !!s.depHandout;
            const tit = document.getElementById("sch-dep-titolo");
            tit.hidden = !s.depHandout;
            tit.value = s.depTitolo || "";
            document.getElementById("sch-foto-prompt").hidden = true;
            document.getElementById("sch-foto-azioni").hidden = true;
            mostraStats();
            mostraAllegati();
            mostraFoto();
            mostraFatte(); // ri-evidenzia la pillola della scheda aperta
        });
        // recap "Già nel caso" (richiamabile: al cambio scheda E quando cambia la foto)
        const aggiornaRecap = () => {
            const recapBox = document.getElementById("sch-recap");
            if (!recapBox || !sel.value) return;
            const html = recapAttore(sel.value);
            recapBox.hidden = !html;
            recapBox.innerHTML = html
                ? `<p class="wz-rias-sotto">📋 Già nel caso <small class="wz-rias-mini">— si aggiorna da solo; si modifica nei passi d'origine</small></p>` + html
                : "";
        };
        // ── FOTO del personaggio: campo dedicato (scheda.foto), separato dagli allegati ──
        const mostraFoto = () => {
            const slot = document.getElementById("sch-foto-slot");
            if (!slot) return;
            const s = schede.find(x => x.personaId === sel.value) || {};
            const crea = document.getElementById("sch-foto-crea");
            const togli = document.getElementById("sch-foto-togli");
            if (s.foto) {
                slot.innerHTML = `<img src="${s.foto}" alt="ritratto" />`;
                togli.hidden = false;
            } else {
                slot.innerHTML = `<span class="wz-foto-vuota">nessuna foto</span>`;
                togli.hidden = true;
            }
            // il pulsante c'è SEMPRE; se manca la chiave immagini lo dice al clic
            crea.hidden = false;
        };
        const salvaFotoUrl = (url) => {
            const s = schedaDi(sel.value);
            s.foto = url;
            const p = persona(sel.value); if (p) p.rilevante = true;
            salvaDebounce();
            mostraFoto(); mostraFatte(); aggiornaRecap();
        };
        document.getElementById("sch-foto-file")?.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file || !sel.value) return;
            const msg = document.getElementById("sch-foto-msg2");
            msg.textContent = "⏳ carico…";
            const fd = new FormData(); fd.append("file", file);
            try {
                const r = await fetch(`/api/progetti/${WIZ.id}/allegati`, { method: "POST", body: fd });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { msg.textContent = "⚠ " + (json.errore || "caricamento fallito"); return; }
                msg.textContent = "";
                salvaFotoUrl(json.url); // va in scheda.foto, NON tra gli allegati
            } catch { msg.textContent = "⚠ caricamento fallito"; }
            finally { e.target.value = ""; }
        });
        document.getElementById("sch-foto-togli")?.addEventListener("click", () => {
            const s = schedaDi(sel.value);
            delete s.foto;
            salvaDebounce();
            mostraFoto(); mostraFatte(); aggiornaRecap();
        });
        // genera la descrizione fisica con l'AI, la mette nel campo E la salva nella scheda (persistita)
        async function generaDescrizione() {
            const r = await fetch(`/api/progetti/${WIZ.id}/descrizione`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ personaId: sel.value, modello: modelloAI(), effort: effortAI() })
            });
            const json = await r.json().catch(() => ({}));
            if (!r.ok) throw new Error(json.detail || json.errore || r.status);
            const testo = (json.testo || "").trim();
            if (!testo) throw new Error("l'AI non ha restituito nulla"); // MAI svuotare il campo
            document.getElementById("sch-descrizioneFisica").value = testo;
            const s = schedaDi(sel.value); s.descrizioneFisica = testo;
            const p = persona(sel.value); if (p) p.rilevante = true;
            salvaDebounce();
            return testo;
        }

        document.getElementById("sch-foto-crea")?.addEventListener("click", async () => {
            if (!sel.value) return;
            const msg0 = document.getElementById("sch-foto-msg2");
            if (!WIZ.immaginiAttive) {
                msg0.textContent = "⚠ Manca la chiave immagini (OpenAI) sul server: non ancora configurata. Intanto usa 🖼 Prompt foto per GPT.";
                return;
            }
            const gruppo = lista("gruppi").find(g => g.id === sel.value);
            const btn = document.getElementById("sch-foto-crea");
            const orig = btn.textContent;
            let fisico = document.getElementById("sch-descrizioneFisica").value.trim();
            // niente descrizione (e non è un gruppo): la scrivo PRIMA — una foto senza descrizione è inutile,
            // e la descrizione può avere dettagli che dalla sola foto non si ricavano
            if (!fisico && !gruppo) {
                if (!WIZ.aiAttiva) {
                    msg0.textContent = "⚠ Serve prima la descrizione fisica (✨ Proponi descrizione), ma manca la chiave AI testi sul server.";
                    return;
                }
                btn.disabled = true; btn.textContent = "✨ Prima la descrizione…";
                msg0.textContent = "Nessuna descrizione: la scrivo prima (serve per la foto e per i dettagli)…";
                try { fisico = await generaDescrizione(); }
                catch (e) { msg0.textContent = "⚠ Non riesco a creare la descrizione: " + e.message; btn.disabled = false; btn.textContent = orig; return; }
            }
            // ora la descrizione c'è (o è un gruppo): costruisco il prompt e genero la foto
            document.getElementById("sch-foto-prompt-btn").click();
            const prompt = document.getElementById("sch-foto-prompt").value;
            btn.disabled = true; btn.textContent = "🎨 Sto disegnando… (20-40s)"; msg0.textContent = "";
            try {
                const r = await fetch(`/api/progetti/${WIZ.id}/genera-foto`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ personaId: sel.value, prompt })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { msg0.textContent = "⚠ " + (json.detail || json.errore || r.status); return; }
                salvaFotoUrl(json.url);
            } catch { msg0.textContent = "⚠ generazione fallita"; }
            finally { btn.disabled = false; btn.textContent = orig; }
        });

        // ── allegati della scheda (stessa cartella-avventura dei passi 12/13) ──
        const mostraAllegati = () => {
            const box = document.getElementById("sch-allegati");
            if (!box) return;
            const s = schede.find(x => x.personaId === sel.value) || {};
            box.innerHTML = (s.allegati || []).map((a, ai) =>
                `<span class="wz-chip wz-alg"><a href="${a.url}" target="_blank">📎 ${a.nome}</a><button type="button" class="wz-alg-x" data-sch-alg-del="${ai}" title="Togli dalla scheda">✕</button></span>`).join("")
                + `<label class="wz-btn wz-mini wz-alg-add">📎 Allega file<input type="file" hidden id="sch-alg-add" accept="${ACCETTA_ALLEGATI}" /></label>
                   <span class="wz-alg-msg" id="sch-alg-msg"></span>`;
            box.querySelector("#sch-alg-add").addEventListener("change", async (e) => {
                const file = e.target.files[0];
                if (!file || !sel.value) return;
                const msg = box.querySelector("#sch-alg-msg");
                msg.textContent = "⏳ carico…";
                const fd = new FormData();
                fd.append("file", file);
                try {
                    const r = await fetch(`/api/progetti/${WIZ.id}/allegati`, { method: "POST", body: fd });
                    const json = await r.json().catch(() => ({}));
                    if (!r.ok) { msg.textContent = "⚠ " + (json.errore || "caricamento fallito"); return; }
                    const sc = schedaDi(sel.value);
                    (sc.allegati = sc.allegati || []).push({ nome: json.nome, url: json.url });
                    salvaDebounce();
                    mostraAllegati();
                } catch { msg.textContent = "⚠ caricamento fallito"; }
            });
            box.querySelectorAll("[data-sch-alg-del]").forEach(b => b.addEventListener("click", () => {
                const sc = schedaDi(sel.value);
                sc.allegati.splice(+b.dataset.schAlgDel, 1);
                salvaDebounce();
                mostraAllegati();
            }));
        };
        // ── ✨ descrizione fisica dall'AI (legge il caso: età, genere, mondo) ──
        const btnAiFis = document.getElementById("sch-ai-fisico");
        if (btnAiFis && WIZ.aiAttiva) btnAiFis.hidden = false;
        btnAiFis?.addEventListener("click", async () => {
            if (!sel.value) return;
            btnAiFis.disabled = true;
            const orig = btnAiFis.textContent;
            btnAiFis.textContent = "✨ Sto leggendo il caso… (10-20s)";
            try { await generaDescrizione(); }
            catch (e) { alert("AI: " + e.message); }
            finally { btnAiFis.disabled = false; btnAiFis.textContent = orig; }
        });
        // ── 🖼 prompt-foto per GPT: in ITALIANO, modificabile; serve la descrizione fisica ──
        document.getElementById("sch-foto-prompt-btn")?.addEventListener("click", () => {
            if (!sel.value) return;
            const p = persona(sel.value);
            const gr = lista("gruppi").find(g => g.id === sel.value);
            const s = schede.find(x => x.personaId === sel.value) || {};
            const fisico = document.getElementById("sch-descrizioneFisica").value.trim();
            const out = document.getElementById("sch-foto-prompt");
            const azioni = document.getElementById("sch-foto-azioni");
            const msg = document.getElementById("sch-foto-msg");
            if (!gr && !fisico) {
                out.hidden = true; azioni.hidden = false;
                msg.textContent = "⚠ Prima compila la descrizione fisica (anche coi campi qui sopra): senza, GPT inventa un volto qualsiasi.";
                return;
            }
            let prompt;
            if (gr) {
                prompt = `Fotografia fotorealistica, Giappone 1997: il ritrovo / quartier generale di "${gr.nome}" (${gr.tipo || "gruppo"}). ${gr.descrizione || ""}\n`
                    + `Aspetto urbano giapponese anni '90, colori tenui, leggera grana da pellicola. Nessuna scritta, nessun logo.`;
            } else {
                const genere = p.genere === "f" ? "Donna giapponese" : "Uomo giapponese";
                const chie = chiEBreve(p, 60);
                prompt = `Fotografia ritratto fotorealistica, formato quadrato. ${genere}, ESATTAMENTE ${p.eta} anni${chie ? ` — ${chie}` : ""}. Giappone, 1997.\n`
                    + `Descrizione fisica (da seguire fedelmente): ${fisico}\n`
                    + `Ambientazione: un luogo coerente con la sua vita (il lavoro o il quartiere), Giappone anni '90, colori tenui, luce naturale, leggera grana da pellicola — come un fotogramma di un film poliziesco giapponese anni '90.\n`
                    + `IMPORTANTE: volto UNICO e caratterizzato, diverso da qualsiasi volto generico; età e genere rispettati alla lettera. Espressione neutra, sguardo in camera o quasi. Nessuna scritta, nessun watermark.`;
            }
            out.value = prompt;
            out.hidden = false;
            azioni.hidden = false;
            msg.textContent = "Modificalo come vuoi, poi 📋 Copia e incolla in ChatGPT. La foto che torna la carichi con 📎.";
        });
        document.getElementById("sch-foto-copia")?.addEventListener("click", async (e) => {
            try {
                await navigator.clipboard.writeText(document.getElementById("sch-foto-prompt").value);
                e.target.textContent = "✓ Copiato";
                setTimeout(() => e.target.textContent = "📋 Copia il prompt", 1600);
            } catch {
                document.getElementById("sch-foto-prompt").select();
                document.getElementById("sch-foto-msg").textContent = "Copia a mano: testo selezionato (CTRL+C).";
            }
        });
        // ── ✨ deposizione dall'AI: salva la scheda com'è ORA, poi l'AI scrive il verbale in prima persona ──
        const btnDepo = document.getElementById("sch-ai-depo");
        if (btnDepo && WIZ.aiAttiva) btnDepo.hidden = false;
        btnDepo?.addEventListener("click", async () => {
            if (!sel.value) return;
            btnDepo.disabled = true;
            const orig = btnDepo.textContent;
            btnDepo.textContent = "✨ Sto scrivendo il verbale… (10-20s)";
            try {
                document.getElementById("wz-scheda-salva").click(); // porta nel modello ciò che è nei campi
                await fetch(`/api/progetti/${WIZ.id}/stato`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ statoJson: JSON.stringify(S) })
                });
                const r = await fetch(`/api/progetti/${WIZ.id}/deposizione`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ personaId: sel.value, modello: modelloAI(), effort: effortAI() })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { alert("AI: " + (json.detail || json.errore || r.status)); return; }
                const testo = (json.testo || "").trim();
                if (!testo) { alert("L'AI non ha restituito nulla — riprova."); return; } // MAI svuotare il campo
                document.getElementById("sch-deposizione").value = testo;
                // BUG risolto: prima riempiva solo la textarea → se non premevi Salva, la deposizione AI si perdeva
                const s = schedaDi(sel.value); s.deposizione = testo;
                const p = persona(sel.value); if (p) p.rilevante = true;
                salvaDebounce();
            } catch { alert("AI non raggiungibile"); }
            finally { btnDepo.disabled = false; btnDepo.textContent = orig; }
        });
        // ── statistiche: blocco PNG per le persone, scheda ente per i gruppi; i numeri si salvano da soli ──
        const schedaDi = (id) => { let s = schede.find(x => x.personaId === id); if (!s) { s = { personaId: id }; schede.push(s); } return s; };
        const boxP = document.getElementById("sch-stats-p"), boxE = document.getElementById("sch-stats-e");
        const mostraStats = () => {
            const gr = lista("gruppi").find(g => g.id === sel.value);
            boxP.hidden = !sel.value || !!gr;
            boxE.hidden = !sel.value || !gr;
            const cont = document.getElementById("sch-contatti");
            if (cont) cont.hidden = !sel.value || !!gr; // reperibilità: solo per le persone
            const s = schede.find(x => x.personaId === sel.value) || {};
            if (!gr) {
                ATTR_PNG.forEach(a => document.getElementById("st-p-" + a).value = (s.stats || {})[a] ?? "");
                document.getElementById("st-p-ki").value = (s.stats || {}).Ki ?? (s.stats || {}).Riserva ?? "";
                if ((s.stats || {}).esempio) document.getElementById("st-p-livello").value = s.stats.esempio;
            } else {
                ATTR_ENTE.forEach(a => document.getElementById("st-e-" + a).value = (s.statsEnte || {})[a] ?? "");
                document.getElementById("st-e-spec").value = (s.statsEnte || {}).specializzazioni || "";
                document.getElementById("st-e-tipo").textContent = gr.tipo ? `tipo: ${gr.tipo}` : "tipo non indicato (passo 8) — tiro senza bias";
            }
        };
        // le tendine degli esempi si riempiono dai dati (una volta sola)
        const livSel = document.getElementById("st-p-livello");
        if (livSel && !livSel.options.length)
            livSel.innerHTML = ARCHETIPI_PNG.map(([grp, voci]) =>
                `<optgroup label="${grp}">${voci.map(([n, mn, mx]) => `<option value="${n}">${n} (${mn}–${mx})</option>`).join("")}</optgroup>`).join("");
        document.getElementById("st-p-tira")?.addEventListener("click", () => {
            if (!sel.value) return;
            const s = schedaDi(sel.value);
            const [nome, mn, mx, bias] = trovaArchetipo(livSel.value);
            s.stats = {};
            ATTR_PNG.forEach(a => s.stats[a] = Math.min(9, Math.max(4, rndTra(mn, mx) + (bias[a] || 0))));
            // Ki del manuale: attributo più basso + 2d6 prendi il dado migliore, tetto 12
            const piuBasso = Math.min(...ATTR_PNG.map(a => s.stats[a]));
            s.stats.Ki = Math.min(12, piuBasso + Math.max(rndTra(1, 6), rndTra(1, 6)));
            s.stats.esempio = nome;
            delete s.stats.Riserva; delete s.stats.livello; // vecchi nomi
            salvaDebounce(); mostraStats(); mostraFatte();
        });
        document.getElementById("st-e-tira")?.addEventListener("click", () => {
            if (!sel.value) return;
            const s = schedaDi(sel.value);
            const gr = lista("gruppi").find(g => g.id === sel.value);
            const bias = biasEnte(gr?.tipo);
            // le liste di specializzazioni del manuale sono istituzionali: a bande e gang non si propongono (il master scrive le sue)
            const criminale = /banda|bōsō|boso|gang|yakuza|clan/.test((gr?.tipo || "").toLowerCase());
            s.statsEnte = s.statsEnte || {};
            const specs = [];
            for (const a of ATTR_ENTE) {
                if (a === "Corruzione") { s.statsEnte[a] = s.statsEnte[a] ?? 4; continue; } // mai tirata: si assegna
                s.statsEnte[a] = Math.min(9, Math.max(4, rndTra(1, 6) + rndTra(1, 6) + (bias[a] || 0)));
                if (criminale) continue;
                const n = s.statsEnte[a] === 9 ? 2 : s.statsEnte[a] === 8 ? 1 : 0;
                const pool = [...(SPEC_ENTE[a] || [])];
                for (let k = 0; k < n && pool.length; k++) specs.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
            }
            // le proposte non sovrascrivono MAI ciò che il master ha scritto: si suggerisce solo a campo vuoto
            if (!s.statsEnte.specializzazioni) s.statsEnte.specializzazioni = specs.join("; ");
            salvaDebounce(); mostraStats(); mostraFatte();
        });
        [...ATTR_PNG.map(a => ["st-p-" + a, a]), ["st-p-ki", "Ki"]].forEach(([id, chiave]) => {
            document.getElementById(id)?.addEventListener("input", (e) => {
                if (!sel.value) return;
                const s = schedaDi(sel.value);
                (s.stats = s.stats || {})[chiave] = e.target.value === "" ? "" : +e.target.value;
                salvaDebounce();
            });
        });
        document.getElementById("st-p-livello")?.addEventListener("change", (e) => {
            if (!sel.value) return;
            const s = schedaDi(sel.value);
            (s.stats = s.stats || {}).esempio = e.target.value;
            salvaDebounce();
        });
        ATTR_ENTE.forEach(a => document.getElementById("st-e-" + a)?.addEventListener("input", (e) => {
            if (!sel.value) return;
            const s = schedaDi(sel.value);
            (s.statsEnte = s.statsEnte || {})[a] = e.target.value === "" ? "" : +e.target.value;
            salvaDebounce();
        }));
        document.getElementById("st-e-spec")?.addEventListener("input", (e) => {
            if (!sel.value) return;
            const s = schedaDi(sel.value);
            (s.statsEnte = s.statsEnte || {}).specializzazioni = e.target.value;
            salvaDebounce();
        });
        // 📄 sulla deposizione: mostra il titolo e lo propone dal nome
        document.getElementById("sch-dep-handout")?.addEventListener("change", (e) => {
            const tit = document.getElementById("sch-dep-titolo");
            tit.hidden = !e.target.checked;
            if (e.target.checked && !tit.value && sel.value) tit.value = "Deposizione — " + (nomeAttore(sel.value) || "");
        });
        // ── ✨ contatti: propone un set coerente e riempie SOLO i campi vuoti (non tocca ciò che hai scritto) ──
        const btnCont = document.getElementById("sch-cont-ai");
        if (btnCont && WIZ.aiAttiva) btnCont.hidden = false;
        btnCont?.addEventListener("click", async () => {
            if (!sel.value) return;
            const msg = document.getElementById("sch-cont-msg");
            const orig = btnCont.textContent;
            btnCont.disabled = true; btnCont.textContent = "✨ Sto leggendo il caso… (10-20s)"; msg.textContent = "";
            try {
                const s = schedaDi(sel.value); s.contatti = { ...(s.contatti || {}), ...leggiContatti() };
                await fetch(`/api/progetti/${WIZ.id}/stato`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ statoJson: JSON.stringify(S) })
                });
                const r = await fetch(`/api/progetti/${WIZ.id}/contatti`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ personaId: sel.value, modello: modelloAI(), effort: effortAI() })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { msg.textContent = "⚠ " + (json.detail || json.errore || r.status); return; }
                // il modello può incorniciare il JSON: estraggo il primo blocco { … }
                let obj;
                try {
                    let t = (json.testo || "").trim();
                    const a = t.indexOf("{"), b = t.lastIndexOf("}");
                    obj = JSON.parse(a >= 0 && b > a ? t.slice(a, b + 1) : t);
                } catch { msg.textContent = "⚠ risposta AI non leggibile, riprova"; return; }
                let n = 0;
                CONTATTI.forEach(k => {
                    const el = document.getElementById("sch-cont-" + k);
                    const val = (obj[k] ?? "").toString().trim();
                    if (el && !el.value.trim() && val) { el.value = val; n++; } // solo dove è vuoto
                });
                s.contatti = { ...(s.contatti || {}), ...leggiContatti() };
                // residenza: se non c'è un luogo e l'AI propone un indirizzo, creo un luogo (nome obbligatorio = "Casa di …", via = indirizzo)
                if (!s.contatti.residenzaLuogoId) {
                    const via = (obj.residenza ?? "").toString().trim();
                    if (via) { s.contatti.residenzaLuogoId = luogoDaTesto("Casa di " + (nomeAttore(sel.value) || "PNG"), via).id; mostraResidenza(); n++; }
                }
                const p = persona(sel.value); if (p) p.rilevante = true;
                salvaDebounce();
                msg.textContent = n ? `✓ riempiti ${n} campi vuoti (ritocca pure)` : "erano già tutti compilati";
            } catch { msg.textContent = "⚠ AI non raggiungibile"; }
            finally { btnCont.disabled = false; btnCont.textContent = orig; }
        });
        // ── residenza = LUOGO del passo 9 referenziato (ref, non copia): seleziona o crea; si modifica solo nel passo 9 ──
        // etichetta = SOLO i dati del luogo (nome e/o via), MAI il proprietario
        const etichettaLuogo = (l) => ([l.nome, l.via].filter(Boolean).join(" — ") || l.tipologiaId || "luogo senza nome");
        // trova-o-crea un luogo dato il NOME (obbligatorio); la via è opzionale. Dedup per nome (famiglia = 1 luogo)
        const luogoDaTesto = (nome, via = "") => {
            const n = (nome || "").trim();
            let l = n && lista("luoghi").find(x => (x.nome || "").trim() === n);
            if (!l) { l = { id: nuovoId("l"), tipologiaId: "", nome: n, via: (via || "").trim(), quartiere: get("setup.quartiere") || "", personaId: sel.value }; lista("luoghi").push(l); }
            return l;
        };
        const mostraResidenza = () => {
            const selRes = document.getElementById("sch-cont-residenza-sel");
            if (!selRes || !sel.value) return;
            const s = schede.find(x => x.personaId === sel.value) || {};
            const luoghi = lista("luoghi");
            let cur = (s.contatti && s.contatti.residenzaLuogoId) || "";
            // auto-riparazione: se la ref punta a un luogo cancellato, la tolgo (niente sporco che dia problemi dopo)
            if (cur && s.contatti && !luoghi.some(x => x.id === cur)) { delete s.contatti.residenzaLuogoId; cur = ""; salvaDebounce(); }
            selRes.innerHTML = `<option value="">— nessuna —</option>` +
                inOrdine(luoghi, etichettaLuogo).map(l =>
                    `<option value="${l.id}" ${l.id === cur ? "selected" : ""}>${etichettaLuogo(l).replace(/</g, "&lt;")}</option>`).join("") +
                `<option value="__nuovo">➕ nuovo indirizzo…</option>`;
            document.getElementById("sch-cont-residenza-info").hidden = !luoghi.some(x => x.id === cur);
            document.getElementById("sch-cont-residenza-nuovo").hidden = true;
        };
        const setResidenza = (luogoId) => {
            const s = schedaDi(sel.value);
            s.contatti = s.contatti || {};
            if (luogoId) s.contatti.residenzaLuogoId = luogoId; else delete s.contatti.residenzaLuogoId;
            const p = persona(sel.value); if (p) p.rilevante = true;
            salvaDebounce();
            mostraResidenza();
        };
        document.getElementById("sch-cont-residenza-sel")?.addEventListener("change", (e) => {
            if (!sel.value) return;
            const box = document.getElementById("sch-cont-residenza-nuovo");
            if (e.target.value === "__nuovo") {
                // "➕ nuovo" è un'azione: riporto la select alla selezione corrente e apro la riga di creazione
                e.target.value = (schede.find(x => x.personaId === sel.value)?.contatti || {}).residenzaLuogoId || "";
                box.hidden = false;
                box.querySelector("[data-res-via]").focus();
            } else {
                box.hidden = true;
                setResidenza(e.target.value);
            }
        });
        document.getElementById("sch-cont-residenza-crea")?.addEventListener("click", () => {
            if (!sel.value) return;
            const box = document.getElementById("sch-cont-residenza-nuovo");
            const nome = box.querySelector("[data-res-nome]").value.trim();
            const via = box.querySelector("[data-res-via]").value.trim();
            if (!nome) { box.querySelector("[data-res-nome]").focus(); return; } // il NOME è obbligatorio; via/quartiere no
            // il luogo nasce nel passo 9 (unica lista) e viene assegnato a questo PNG
            const nuovo = { id: nuovoId("l"), tipologiaId: "", nome, via, quartiere: get("setup.quartiere") || "", personaId: sel.value };
            lista("luoghi").push(nuovo);
            box.querySelector("[data-res-via]").value = ""; box.querySelector("[data-res-nome]").value = "";
            setResidenza(nuovo.id);
        });
        document.getElementById("sch-cont-residenza-togli")?.addEventListener("click", () => { if (sel.value) setResidenza(""); });
        // Legge TUTTI i campi della scheda nello stato e programma il salvataggio (debounced).
        // La ref residenzaLuogoId (gestita dal picker) resta grazie al merge dei contatti.
        function salvaScheda() {
            if (!sel.value) return;
            let s = schede.find(x => x.personaId === sel.value);
            const nuova = !s;
            if (!s) { s = { personaId: sel.value }; schede.push(s); }
            campi.forEach(c => s[c] = document.getElementById("sch-" + c).value);
            s.trigger = document.getElementById("sch-trigger").value.split("\n").filter(Boolean).map(r => {
                const [se, allora] = r.split("→").map(x => (x || "").trim());
                return { se, allora: allora || "" };
            });
            s.voce = leggiVoce();
            s.tratti = Object.fromEntries(["vizio", "tic", "oggetto"].map(k => [k, document.getElementById("sch-tratti-" + k).value]));
            s.contatti = { ...(s.contatti || {}), ...leggiContatti() };
            s.deposizione = document.getElementById("sch-deposizione").value;
            s.depHandout = document.getElementById("sch-dep-handout").checked;
            s.depTitolo = document.getElementById("sch-dep-titolo").value;
            const p = persona(sel.value);
            if (p) p.rilevante = true;
            salvaDebounce();
            if (nuova) mostraFatte(); // un PNG nuovo compare subito nell'elenco "schede fatte"
        }
        // AUTOSALVATAGGIO: come il resto del wizard, la scheda si salva a OGNI modifica — niente pulsante
        // Salva, niente rischio di perdere tutto. (L'assegnazione programmatica di .value non emette
        // 'input', quindi il caricamento della scheda non fa scattare falsi salvataggi.)
        const formScheda = document.getElementById("wz-scheda-form");
        formScheda.addEventListener("input", salvaScheda);
        formScheda.addEventListener("change", salvaScheda); // checkbox e select
        // arrivo dal pannello «Mancanze» del riepilogo: ?persona=… apre subito quella scheda
        // (a fondo funzione: il change handler e le sue dipendenze sono già tutti montati)
        const pParam = new URLSearchParams(location.search).get("persona");
        if (pParam && (persona(pParam) || lista("gruppi").some(g => g.id === pParam))) {
            sel.value = pParam;
            sel.dispatchEvent(new Event("change", { bubbles: true }));
            form.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    // icona + colore per TIPO di handout: i giornali seppia, i referti rossi, i tabulati blu…
    // Match per parola-chiave, così regge anche i tipi scritti a mano con "✏️ Altro".
    function decoHandout(tipo) {
        const t = (tipo || "").toLowerCase();
        const T = [
            ["giornale", "📰", "#8b6d3f"], ["tabulato", "☎️", "#3f5f7a"],
            ["tossic", "🧪", "#7a3348"], ["autops", "⚕️", "#8b1a1a"],
            ["certificat", "⚕️", "#8b1a1a"], ["referto", "⚕️", "#8b1a1a"],
            ["foto", "📷", "#4a4538"], ["deposiz", "📝", "#6b5330"],
            ["lettera", "✉️", "#937a3d"], ["registro", "🗂", "#5f5a7a"],
            ["accessi", "🗂", "#5f5a7a"], ["conto", "🧾", "#3f7a5e"],
            ["ricevut", "🧾", "#3f7a5e"], ["menu", "🍽", "#7a6a33"],
            ["presenti", "👥", "#5e6b7a"], ["cronologia", "💾", "#46628a"],
            ["rapporto", "🚓", "#33527a"],
        ];
        for (const [k, icona, colore] of T) if (t.includes(k)) return { icona, colore };
        return { icona: "📄", colore: "#8a8578" };
    }

    // una fonte "vale" se punta a qualcuno o a qualcosa
    const fonteValida = (f) => !!(f.attoreId || f.canale);
    const nomeFonte = (f) => f.attoreId ? nomeAttore(f.attoreId) : (f.canale || "");
    // handout marcati 📄 in giro per il caso (fonti delle informazioni + deposizioni delle schede)
    function contaHandoutMarcati() {
        return lista("passo9.tracce").reduce((n, t) => n + (t.fonti || []).filter(f => f.handout).length, 0)
            + lista("passo8.schede").filter(s => s.depHandout && s.deposizione).length;
    }

    // migrazione: le vecchie "tracce" (cosaRivela + strade) diventano informazioni multi-fonte
    function migraInformazioni() {
        for (const t of lista("passo9.tracce")) {
            if (t.fonti) continue;
            t.testo = t.testo || t.cosaRivela || "";
            t.fonti = (t.strade || []).filter(s => s.via).map(s => ({ attoreId: "", canale: s.via, richiede: s.richiede || "nulla", versione: "", handout: false, handoutTitolo: "" }));
            delete t.strade; delete t.cosaRivela; delete t.tipo; delete t.reperibilita; delete t.eventoOrigineId;
        }
    }

    function lintInformazioni() {
        const box = document.getElementById("wz-tracce-lint");
        if (!box) return;
        const problemi = [];
        lista("passo9.tracce").forEach(t => {
            const fonti = (t.fonti || []).filter(fonteValida);
            if (t.classificazione === "essenziale" && fonti.length < 2)
                problemi.push(`⚠ «${t.nome || "senza nome"}» è ESSENZIALE ma ha ${fonti.length} fonte/i — ne servono almeno 2`);
        });
        box.innerHTML = problemi.length ? problemi.map(p => `<p>${p}</p>`).join("") : "<p>✓ Tutte le informazioni essenziali hanno almeno 2 fonti.</p>";
        document.querySelector("[data-lista='passo9.tracce']")?.addEventListener("input", () => setTimeout(lintInformazioni, 300));
    }

    // passo 13: qui gli handout marcati 📄 altrove si RITROVANO — il testo vive dove è stato scritto
    // Anteprima handout in SOVRAIMPRESSIONE: il foglio come sarà stampato + stampa/PDF (sola lettura)
    function apriAnteprimaHandout(it) {
        if (!it) return;
        const corpo = (it.contenuto || "").trim() ||
            `<div class="ho-foglio ho-doc"><div class="ho-intestazione"><div class="ente">DOCUMENTO</div><div class="tipo-doc">${it.tipo || ""}</div></div><p>Questo handout è ancora vuoto. Aprilo con ✏️ Edita e premi ✨ Crea, oppure scrivilo a mano.</p></div>`;
        // it.docHtml = documento completo già pronto (es. foto sola con orientamento suo): si usa così com'è
        const docHtml = it.docHtml || `<!doctype html><html lang="it"><head><meta charset="utf-8"><link rel="stylesheet" href="/css/handout.css?v=${Date.now()}"><style>body{margin:0;background:#4a4640;padding:16px}</style></head><body>${corpo}</body></html>`;
        let ov = document.getElementById("wz-ho-anteprima");
        if (!ov) {
            ov = document.createElement("div");
            ov.id = "wz-ho-anteprima";
            ov.innerHTML = `<div class="wz-ho-ov-barra"><span class="tit"></span><button type="button" class="wz-btn wz-mini" data-ho-ov-aggiorna title="Ricarica il caso dal server e riapri questa anteprima aggiornata">↻ Aggiorna</button><button type="button" class="wz-btn wz-mini" data-ho-ov-stampa>🖨 Stampa / PDF</button><button type="button" class="wz-btn wz-mini" data-ho-ov-edita>✏️ Edita</button><button type="button" class="wz-btn wz-mini" data-ho-ov-chiudi>✕ Chiudi</button></div><iframe class="wz-ho-ov-frame" title="anteprima"></iframe>`;
            document.body.appendChild(ov);
            ov.querySelector("[data-ho-ov-chiudi]").addEventListener("click", () => ov.hidden = true);
            ov.addEventListener("click", (e) => { if (e.target === ov) ov.hidden = true; });
            // ↻ ricarica la pagina (stato fresco dal server) e riapre questa stessa anteprima
            ov.querySelector("[data-ho-ov-aggiorna]").addEventListener("click", () => {
                location.href = location.pathname + "?ho=" + ov.dataset.hid + "&apri=1";
            });
            ov.querySelector("[data-ho-ov-stampa]").addEventListener("click", () => {
                const f = ov.querySelector("iframe"); f.contentWindow.focus(); f.contentWindow.print();
            });
            ov.querySelector("[data-ho-ov-edita]").addEventListener("click", async () => {
                try { await salvaOra(WIZ.passo); } catch { }
                location.href = `/Wizard/Handout?id=${WIZ.id}&h=${ov.dataset.hid}&torna=${WIZ.passo}`;
            });
        }
        ov.dataset.hid = it.id;
        ov.querySelector(".tit").textContent = "👁 " + (it.titolo || "Handout");
        // per i fogli "virtuali" (deposizioni dei raccolti) niente Edita/Aggiorna: si stampano e basta
        ov.querySelector("[data-ho-ov-edita]").hidden = !it.id;
        ov.querySelector("[data-ho-ov-aggiorna]").hidden = !it.id;
        ov.querySelector("iframe").srcdoc = docHtml;
        ov.hidden = false;
    }

    // 🖨 stampa diretta di un handout: iframe invisibile con lo stesso foglio dell'anteprima,
    // print() e via — senza passare dalla sovraimpressione
    function stampaHandoutDiretto(titolo, corpoHtml) {
        const f = document.createElement("iframe");
        f.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden";
        document.body.appendChild(f);
        f.srcdoc = `<!doctype html><html lang="it"><head><meta charset="utf-8"><title>${(titolo || "Handout").replace(/</g, "&lt;")}</title><link rel="stylesheet" href="/css/handout.css?v=${Date.now()}"><style>body{margin:0;background:#fff}</style></head><body>${corpoHtml}</body></html>`;
        f.addEventListener("load", () => setTimeout(() => {
            try { f.contentWindow.focus(); f.contentWindow.print(); } catch { }
            setTimeout(() => f.remove(), 60000); // via dopo la stampa (il dialogo blocca, 60s bastano)
        }, 150));
    }

    // foglio stampabile per un'informazione marcata 📄: titolo, testo e allegati (immagini incluse)
    function foglioInformazione(titolo, testo, allegati) {
        const corpo = (testo || "").trim().split(/\n{2,}/).map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
        const imgs = (allegati || []).filter(a => a.url).map(a => `<img src="${a.url}" alt="${(a.nome || "").replace(/"/g, "&quot;")}" />`).join("");
        return `<div class="ho-foglio ho-doc">
            <div class="ho-intestazione"><div class="ente">${(titolo || "Documento").replace(/</g, "&lt;")}</div><div class="tipo-doc">documento</div></div>
            ${corpo}${imgs}
        </div>`;
    }

    // 📎 allegato-immagine: NIENTE nuova scheda del browser — si apre la stessa anteprima
    // degli handout (chiudi / stampa). Vale ovunque: passo 12, passo 13, schede.
    // La foto ha un foglio TUTTO SUO: la pagina di stampa si orienta da sola come l'immagine
    // (orizzontale → A4 orizzontale) e la foto riempie il foglio, senza la gabbia del documento.
    // I file non-immagine (se mai ce ne saranno) tengono il comportamento normale.
    const docFoto = (url, nome, orizzontale) => `<!doctype html><html lang="it"><head><meta charset="utf-8"><title>${nome.replace(/</g, "&lt;")}</title><style>
        @page { size: A4 ${orizzontale ? "landscape" : "portrait"}; margin: 8mm; }
        html, body { margin: 0; height: 100%; }
        body { display: flex; align-items: center; justify-content: center; background: #4a4640; }
        img { max-width: 96%; max-height: 96vh; box-shadow: 0 6px 24px rgba(0,0,0,.45); }
        @media print { body { background: #fff; } img { max-width: 100%; max-height: 100%; box-shadow: none; } }
    </style></head><body><img src="${url}" alt="${nome.replace(/"/g, "&quot;")}"></body></html>`;
    document.addEventListener("click", (e) => {
        const a = e.target.closest(".wz-alg a, a.wz-alg");
        if (!a) return;
        const url = a.getAttribute("href") || "";
        if (!/\.(png|jpe?g|webp|gif|bmp)(\?|$)/i.test(url)) return;
        e.preventDefault();
        const nome = (a.textContent || "").replace(/^📎\s*/, "").trim() || "Allegato";
        const im = new Image();
        im.onload = () => apriAnteprimaHandout({ id: "", titolo: nome, docHtml: docFoto(url, nome, im.naturalWidth > im.naturalHeight) });
        im.onerror = () => apriAnteprimaHandout({ id: "", titolo: nome, docHtml: docFoto(url, nome, false) });
        im.src = url;
    });

    // verbale impaginato per una deposizione marcata 📄: intestazione del distretto + testo + firma.
    // Data e luogo restano in bianco: li compila il GM (qui non si inventano date).
    function verbaleDeposizione(titolo, nome, testo) {
        const corpo = (testo || "").trim().split(/\n{2,}/)
            .map(p => `<p>${p.replace(/\n/g, "<br>")}</p>`).join("");
        return `<div class="ho-foglio ho-referto">
            <div class="ho-intestazione"><div class="ente">POLIZIA PREFETTURALE DI KYOTO — DISTRETTO DI SHIMOGYŌ</div><div class="tipo-doc">VERBALE DI SOMMARIE INFORMAZIONI</div></div>
            <dl class="ho-meta"><dt>Persona sentita</dt><dd>${nome}</dd><dt>Data e luogo</dt><dd>____________________________</dd></dl>
            ${corpo}
            <div class="ho-firma"><span class="riga">firma del dichiarante</span></div>
        </div>`;
    }

    function initHandoutRaccolti() {
        const box = document.getElementById("wz-handout-raccolti");
        if (!box) return;
        const vai = (n) => location.pathname.replace(/\/\d+$/, "/" + n);
        const righe = [];
        lista("passo9.tracce").forEach(t => (t.fonti || []).forEach(f => {
            if (!f.handout) return;
            righe.push({ titolo: f.handoutTitolo || t.nome || "Handout", da: `informazione «${t.nome || "?"}» · fonte: ${nomeFonte(f) || "?"}`, testo: f.versione || t.testo || "", link: vai(11), allegati: t.allegati || [], icona: "📄", colore: "#46628a" });
        }));
        lista("passo8.schede").forEach(s => {
            if (!s.depHandout || !s.deposizione) return;
            const nome = nomeAttore(s.personaId) || "?";
            righe.push({ titolo: s.depTitolo || `Deposizione — ${nome}`, da: `scheda di ${nome}`, testo: s.deposizione, link: vai(10), allegati: [], icona: "📝", colore: "#6b5330", verbaleDi: nome });
        });
        box.innerHTML = righe.length === 0
            ? `<p>Nessuno ancora. Si marcano 📄 nelle <strong>informazioni</strong> (passo 12) e nelle <strong>schede</strong> (passo 11): qui si ritrovano raccolti, senza riscriverli.</p>`
            : righe.map((r, ri) => `<div class="wz-ho-card" style="border-left:4px solid ${r.colore}">
                <div class="wz-ho-testa"><strong>${r.icona} ${r.titolo}</strong><span><button type="button" class="wz-btn wz-mini" data-ho-card-ant="${ri}" title="Guarda il foglio impaginato">👁 Anteprima</button> <button type="button" class="wz-btn wz-mini" data-ho-card-stampa="${ri}" title="Manda subito in stampa, senza aprire l'anteprima">🖨 Stampa</button> <a class="wz-btn wz-mini" href="${r.link}">✎ modifica alla fonte</a></span></div>
                <small class="wz-nota">${r.da}</small>
                <p>${(r.testo || "").slice(0, 240)}${(r.testo || "").length > 240 ? "…" : ""}</p>
                ${r.allegati.length ? `<div class="wz-allegati">${r.allegati.map(a => `<a class="wz-chip wz-alg" href="${a.url}" target="_blank">📎 ${a.nome}</a>`).join("")}</div>` : ""}
            </div>`).join("");
        // ogni card raccolta si guarda e si stampa da QUI: deposizioni come verbale del
        // distretto, informazioni 📄 come foglio con testo + allegati dentro — così al
        // momento della stampa non si dimentica niente in giro per i passi
        const foglioDi = (r) => r.verbaleDi
            ? verbaleDeposizione(r.titolo, r.verbaleDi, r.testo)
            : foglioInformazione(r.titolo, r.testo, r.allegati);
        box.querySelectorAll("[data-ho-card-ant]").forEach(b => b.addEventListener("click", () => {
            const r = righe[+b.dataset.hoCardAnt];
            apriAnteprimaHandout({ id: "", titolo: r.titolo, contenuto: foglioDi(r) });
        }));
        box.querySelectorAll("[data-ho-card-stampa]").forEach(b => b.addEventListener("click", () => {
            const r = righe[+b.dataset.hoCardStampa];
            stampaHandoutDiretto(r.titolo, foglioDi(r));
        }));

        // ── comodità chieste dall'utente (2026-08-13) ──
        // ↻ ricarica dal server: lo stato vive nella pagina — se il caso è stato toccato da fuori
        // (un assistente, un'altra finestra), da qui ci si riallinea senza perdere nulla (autosave già fatto)
        document.getElementById("wz-ho-ricarica")?.addEventListener("click", () => location.reload());
        // icone/colori dei documenti nuovi: si riaggiornano da soli quando cambi il tipo
        const contHo = document.querySelector("[data-lista='passo10.handout']");
        if (contHo && !contHo.dataset.decoAttiva) {
            contHo.dataset.decoAttiva = "1";
            contHo.addEventListener("input", () => setTimeout(() => {
                const blocchi = contHo.querySelectorAll(".wz-ho-blocco");
                lista("passo10.handout").forEach((it, i) => {
                    const b = blocchi[i]; if (!b) return;
                    const deco = decoHandout(it.tipo);
                    b.style.borderLeft = "4px solid " + deco.colore;
                    const ic = b.querySelector("[data-ho-ic]");
                    if (ic) { ic.textContent = deco.icona; ic.title = it.tipo || "documento"; }
                });
            }, 60));
        }
        // ritorno dall'editor (?ho=…): la lista si apre sul documento appena editato, illuminato.
        // Con &apri=1 (dal ↻ dell'anteprima) si riapre anche l'anteprima, con lo stato fresco.
        // I parametri valgono UNA volta: l'indirizzo viene ripulito subito, così F5 e ↻
        // successivi non rieseguono l'apertura (era il bug dell'anteprima che ricompariva).
        const qs = new URLSearchParams(location.search);
        const hoParam = qs.get("ho");
        if (hoParam) history.replaceState(null, "", location.pathname);
        if (hoParam) {
            const prova = (n) => {
                const b = document.querySelector(`.wz-ho-blocco[data-hoid="${hoParam}"]`);
                if (b) {
                    b.scrollIntoView({ behavior: "smooth", block: "center" });
                    b.classList.add("wz-ho-evidenzia");
                    if (qs.get("apri")) {
                        const it = lista("passo10.handout").find(x => x.id === hoParam);
                        if (it) apriAnteprimaHandout(it);
                    }
                }
                else if (n < 25) setTimeout(() => prova(n + 1), 100); // la lista si disegna in async
            };
            prova(0);
        }
    }

    function initRiepilogo() {
        const lint = document.getElementById("wz-lint");
        const rie = document.getElementById("wz-riepilogo");
        const esiti = [];
        const ok = (m) => esiti.push(`<p class="l-ok">✓ ${m}</p>`);
        const warn = (m) => esiti.push(`<p class="l-warn">⚠ ${m}</p>`);
        const err = (m) => esiti.push(`<p class="l-err">✕ ${m}</p>`);

        if (get("passo1.rigaUnica")) ok("Metodo di morte definito"); else err("Passo 2: manca la riga unica");
        if (get("passo2.personaId")) ok("Vittima con nome"); else err("Passo 3: vittima senza nome");
        if ((get("passo4.moventeId") || "") !== "") ok("Movente scelto"); else err("Passo 7: manca il movente");
        const colp = get("passo5.colpevoliIds") || [];
        if (colp.length && colp.every(id => persona(id))) ok("Colpevole identificato NEL cast"); else err("Passo 5: assassino mancante o fuori dal cast");
        if (get("passo5.erroreCoerente")) ok("Sbaglio dell'assassino definito"); else err("Passo 7: manca lo sbaglio dell'assassino");
        const ev = lista("passo7.eventi");
        if (ev.some(e => e.fase === "fatto")) ok(`Cronistoria: ${ev.length} eventi (col fatto)`); else warn("Passo 10: nessun evento in fase 'fatto'");
        const essenziali = lista("passo9.tracce").filter(t => t.classificazione === "essenziale");
        const scoperte = essenziali.filter(t => (t.fonti || []).filter(fonteValida).length < 2);
        if (essenziali.length === 0) warn("Passo 12: nessuna informazione essenziale classificata");
        else if (scoperte.length) err(`Passo 12: ${scoperte.length} informazioni essenziali con meno di 2 fonti`);
        else ok("Ogni informazione essenziale ha ≥ 2 fonti");
        const doppi = {};
        cast().forEach(p => { const k = nomePieno(p).toLowerCase(); doppi[k] = (doppi[k] || 0) + 1; });
        const omonimi = Object.entries(doppi).filter(([k, n]) => n > 1 && k.trim() !== "?");
        if (omonimi.length) err("Omonimie nel cast: " + omonimi.map(([k]) => k).join(", ")); else ok("Nessuna omonimia nel cast");
        const fp = (get("passo3.problemi") || []).filter(p => p.potenzialeFalsaPista);
        if (fp.length) ok(`${fp.length} false piste naturali dai problemi`); else warn("Nessun problema marcato come potenziale falsa pista");
        lint.innerHTML = esiti.join("");

        const v = persona(get("passo2.personaId"));
        // gli handout senza testo né allegati non si contano come pronti: si dicono a parte
        const hoTutti = lista("passo10.handout");
        const hoVuoti = hoTutti.filter(h => !(h.contenuto || "").trim() && !(h.allegati || []).length).length;
        const hoPronti = hoTutti.length - hoVuoti + contaHandoutMarcati();
        rie.innerHTML = `
            <p><strong>${get("passo1.rigaUnica") || "—"}</strong></p>
            <p>Vittima: ${v ? nomePieno(v) : "—"} · ${get("passo2.postoNelMondo") || ""}</p>
            <p>Movente: ${get("passo4.descrizione") || "—"}</p>
            <p>Colpevole: ${colp.map(id => nomePieno(persona(id))).join(", ") || "—"}</p>
            <p>Cast: ${cast().length} · Luoghi: ${lista("luoghi").length} · Eventi: ${ev.length} · Informazioni: ${lista("passo9.tracce").length} · Handout: ${hoPronti}${hoVuoti ? ` <small>(+${hoVuoti} da scrivere)</small>` : ""} · Giorni: ${lista("passo11.giorni").length}</p>`;
    }

    // ── passo 15: mancanze e segnalazioni — il CONTENUTO, non le regole del metodo ──
    // Il lint dice se il caso rispetta il metodo; qui si guarda cosa manca davvero al tavolo:
    // schede delle persone che contano, handout vuoti, la deposizione del colpevole, generi che
    // non tornano coi ruoli, fonti che forse contraddicono la propria scheda. Le figure di
    // contorno possono legittimamente restare senza scheda. Nulla di tutto questo blocca l'export.
    function initMancanze() {
        const box = document.getElementById("wz-mancanze");
        if (!box) return;
        const vai = (n, query) => location.pathname.replace(/\/\d+$/, "/" + n) + (query || "");
        const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
        // ogni voce è una RIGA della griglia: CHI (nome + chi è, come ovunque nel wizard) ·
        // COSA NON TORNA · AZIONE — i bottoni stanno tutti nella stessa colonna, allineati
        const sez = { schede: [], deposizioni: [], handout: [], generi: [], verifiche: [] };
        const R = (dove, chi, descr, cosa, href, label) =>
            sez[dove].push({ chi, descr, cosa, href, label });

        const vittimaId = get("passo2.personaId");
        const colp = (get("passo5.colpevoliIds") || []).filter(id => persona(id));
        const schede = lista("passo8.schede");
        const schedaDiId = (id) => schede.find(s => s.personaId === id);
        const compilata = (s) => !!s && (
            ["descrizioneFisica", "cosaSa", "cosaNonSa", "cosaHaFatto", "comportamento", "deposizione"].some(k => (s[k] || "").trim())
            || (s.stats && Object.values(s.stats).some(x => x != null && x !== ""))
            || (s.statsEnte && Object.values(s.statsEnte).some(x => x != null && x !== "")));

        // 1 · persone che CONTANO senza scheda: colpevole, fonti di informazioni, presenti in cronistoria
        const motivi = new Map();
        const conta = (id, perche) => {
            if (!id || id === vittimaId || !persona(id)) return;
            const m = motivi.get(id) || [];
            if (!m.includes(perche)) m.push(perche);
            motivi.set(id, m);
        };
        colp.forEach(id => conta(id, "è il colpevole"));
        lista("passo9.tracce").forEach(t => (t.fonti || []).forEach(f => conta(f.attoreId, `fonte di «${t.nome || "?"}»`)));
        lista("passo7.eventi").forEach(e => (e.personeIds || []).forEach(id => conta(id, "compare nella cronistoria")));
        for (const [id, perche] of motivi) {
            if (compilata(schedaDiId(id))) continue;
            const testo = perche.join(" · ");
            R("schede", esc(nomePieno(persona(id))), descrAttore(id, 44),
                esc(testo[0].toUpperCase() + testo.slice(1)) + ".",
                vai(10, "?persona=" + id), "✎ Fai la scheda");
        }
        const contorno = cast()
            .filter(p => p.id !== vittimaId && !motivi.has(p.id) && !compilata(schedaDiId(p.id)))
            .map(p => esc(nomePieno(p)) + (descrAttore(p.id, 40) ? ` <small>(${esc(descrAttore(p.id, 40))})</small>` : ""));

        // 2 · il colpevole ha la scheda ma non la deposizione (lo interrogheranno di sicuro)
        colp.forEach(id => {
            const s = schedaDiId(id);
            if (compilata(s) && !(s.deposizione || "").trim())
                R("deposizioni", esc(nomePieno(persona(id))), descrAttore(id, 44),
                    "È il colpevole: la scheda c'è, la deposizione no — e lo interrogheranno di sicuro.",
                    vai(10, "?persona=" + id), "✎ Apri la scheda");
        });
        schede.forEach(s => {
            if (s.depHandout && !(s.deposizione || "").trim() && persona(s.personaId))
                R("deposizioni", esc(nomePieno(persona(s.personaId))), descrAttore(s.personaId, 44),
                    "La deposizione è marcata 📄 come handout, ma è vuota.",
                    vai(10, "?persona=" + s.personaId), "✎ Apri la scheda");
        });

        // 3 · handout vuoti: né testo né allegati
        lista("passo10.handout").forEach(h => {
            if ((h.contenuto || "").trim() || (h.allegati || []).length) return;
            R("handout", `«${esc(h.titolo || "senza titolo")}»`, h.tipo || "documento",
                "Né testo né allegati — da scrivere, o da togliere se non serve.",
                `/Wizard/Handout?id=${WIZ.id}&h=${h.id}&torna=${WIZ.passo}`, "✏️ Scrivilo");
        });

        // 4 · genere in anagrafica vs ruolo dichiarato (madre/figlio/sorella/…)
        const FEMM = ["madre", "mamma", "sorella", "figlia", "moglie", "zia", "nonna", "fidanzata", "compagna", "vedova", "cognata", "nuora", "suocera"];
        const MASC = ["padre", "papà", "fratello", "figlio", "marito", "zio", "nonno", "fidanzato", "compagno", "vedovo", "cognato", "genero", "suocero"];
        const parole = (testo) => (testo || "").toLowerCase().split(/[^a-zàèéíìóòú]+/).filter(Boolean);
        const attese = (testo) => {
            const w = new Set(parole(testo));
            return { f: FEMM.some(x => w.has(x)), m: MASC.some(x => w.has(x)) };
        };
        for (const base of ["passo3", "passo6"])
            for (const cerchio of ["famiglia", "lavoro", "amici", "altri"])
                (get(`${base}.${cerchio}`) || []).forEach(r => {
                    const p = persona(r.personaId);
                    if (!p || !p.genere) return;
                    const a = attese(r.relazione);
                    if ((a.f && !a.m && p.genere === "m") || (a.m && !a.f && p.genere === "f"))
                        R("generi", esc(nomePieno(p)), p.genere === "m" ? "in anagrafica: maschile" : "in anagrafica: femminile",
                            `È nelle cerchie come «${esc(r.relazione)}»: una delle due cose è da correggere.`,
                            vai(3), "✎ Controlla");
                });
        lista("relazioni").forEach(r => {
            const a = attese(r.tipo);
            if (!a.f && !a.m) return;
            const generi = [persona(r.aId), persona(r.bId)].filter(Boolean).map(p => p.genere).filter(Boolean);
            if (!generi.length) return;
            const male = (a.f && !a.m && !generi.includes("f")) || (a.m && !a.f && !generi.includes("m"))
                || (a.f && a.m && generi.length === 2 && !(generi.includes("f") && generi.includes("m")));
            if (male)
                R("generi", `${esc(nomeAttore(r.aId))} ↔ ${esc(nomeAttore(r.bId))}`, esc(r.tipo || ""),
                    "Il tipo di relazione non torna coi generi in anagrafica.",
                    vai(7), "✎ Controlla");
        });

        // 5 · fonte che forse si contraddice: parole in comune tra l'informazione e il suo
        //     «cosa non sa». Non è un verdetto: è un invito a controllare a mano.
        const STOP = new Set(["della", "delle", "degli", "dello", "dell", "alla", "alle", "allo", "come", "cosa", "dove", "anche", "senza", "sopra", "sotto", "verso", "dopo", "prima", "sono", "essere", "stato", "stata", "molto", "poco", "tutto", "tutti", "questa", "questo", "quella", "quello", "loro", "nella", "negli"]);
        const tokeni = (testo) => new Set(parole(testo).filter(w => w.length > 3 && !STOP.has(w)));
        lista("passo9.tracce").forEach(t => (t.fonti || []).forEach(f => {
            const p = persona(f.attoreId); if (!p) return;
            if ((f.versione || "").trim()) return; // versione propria = l'autore ha già deciso cosa sa dire
            const s = schedaDiId(f.attoreId); if (!s || !(s.cosaNonSa || "").trim()) return;
            const comuni = [...tokeni((t.nome || "") + " " + (t.testo || ""))].filter(w => tokeni(s.cosaNonSa).has(w));
            if (comuni.length >= 2)
                R("verifiche", esc(nomePieno(p)), descrAttore(f.attoreId, 44),
                    `Fonte di «${esc(t.nome || "?")}», ma il suo «cosa non sa» dice: <em>«${esc((s.cosaNonSa || "").trim().slice(0, 110))}…»</em>`,
                    vai(11), "✎ Verifica");
        }));

        // ── resa: griglia a tre colonne per sezioni, bottoni in colonna ──
        const riga = (r) => `<div class="wz-manca-r">
            <div class="wz-manca-chi"><strong>${r.chi}</strong>${r.descr ? `<small>${esc(r.descr)}</small>` : ""}</div>
            <div class="wz-manca-cosa">${r.cosa}</div>
            <div class="wz-manca-az"><a class="wz-btn wz-mini" href="${r.href}">${r.label}</a></div>
        </div>`;
        const TITOLI = [
            ["schede", "Schede da fare", "人"],
            ["deposizioni", "Deposizioni", "調書"],
            ["handout", "Handout vuoti", "書類"],
            ["generi", "Generi che non tornano", "戸籍"],
            ["verifiche", "Da controllare a mano", "確認"],
        ];
        let html = "";
        for (const [k, tit, kj] of TITOLI) {
            if (!sez[k].length) continue;
            html += `<div class="wz-manca-sez">${tit} <small>· ${sez[k].length}</small><span class="kj">${kj}</span></div>` + sez[k].map(riga).join("");
        }
        if (!html) html = `<p class="l-ok wz-manca-ok">✓ Niente da segnalare: schede, deposizioni e handout coprono quello che serve al tavolo.</p>`;
        if (contorno.length)
            html += `<p class="wz-nota wz-manca-piede">Di contorno, senza scheda — e va bene così: ${contorno.join(" · ")}.</p>`;
        box.classList.add("wz-manca");
        box.innerHTML = html;
    }

    // ───────────────────────── riassunto (drawer mobile / colonna desktop) ─────────────────────────
    function buildRiassunto() {
        const corpo = document.getElementById("wz-drawer-corpo");
        if (!corpo) return;
        // conserva lo stato aperto/chiuso dei blocchi tra un refresh e l'altro
        const esistenti = corpo.querySelectorAll("details[data-k]");
        const primaVolta = esistenti.length === 0;
        const aperti = new Set(Array.from(esistenti).filter(d => d.open).map(d => d.dataset.k));

        const v = persona(get("passo2.personaId"));
        const colp = (get("passo5.colpevoliIds") || []).map(id => nomePieno(persona(id))).filter(Boolean);
        const blocchi = [];
        const B = (k, titolo, corpoHtml) => {
            if (corpoHtml) blocchi.push(
                `<details class="wz-rias-blocco" data-k="${k}" ${primaVolta || aperti.has(k) ? "open" : ""}><summary>${titolo}</summary>${corpoHtml}</details>`);
        };
        const tr = (s, n) => (s || "").length > n ? (s || "").slice(0, n) + "…" : (s || "");
        // nome cliccabile: un tocco lo inserisce nel campo di testo attivo
        const N = (p) => p ? `<span class="wz-nome-ins" data-nome="${nomePieno(p)}" title="Tocca per inserirlo nel campo attivo">${nomePieno(p)}</span>` : "?";
        const elencoPersone = (path) => {
            const righe = get(path) || [];
            if (!righe.length) return "";
            return "<ul>" + righe.map(r => {
                const p = persona(r.personaId);
                return `<li><strong>${N(p)}</strong>${p?.eta ? `, ${p.eta}` : ""}${r.relazione ? ` — ${r.relazione}` : ""}</li>`;
            }).join("") + "</ul>";
        };
        const gruppoReti = (base) => {
            let h = "";
            for (const [c, lbl] of [["famiglia", "Famiglia"], ["lavoro", "Lavoro"], ["amici", "Amici"], ["altri", "Altre persone"]]) {
                const e = elencoPersone(`${base}.${c}`);
                if (e) h += `<p class="wz-rias-sotto">${lbl}</p>${e}`;
            }
            return h;
        };

        const setupTxt = [];
        if (get("setup.quartiere")) setupTxt.push(`quartiere: ${get("setup.quartiere")}`);
        if (get("setup.durata")) setupTxt.push(`durata ${get("setup.durata")}/3 · complessità ${get("setup.complessita") || "?"}/3`);
        B("s0", "1 · Cornice", setupTxt.length ? `<p>${setupTxt.join(" — ")}</p>` : "");
        B("s1", "2 · Come", get("passo1.rigaUnica") ? `<p>«${get("passo1.rigaUnica")}»</p>` : "");
        B("s2", "3 · Vittima", v ? `<p><strong>${N(v)}</strong>${v.kanji ? `（${v.kanji}）` : ""}, ${v.eta || "?"} anni<br>${get("passo2.postoNelMondo") || ""}</p>` : "");

        const luoghiHtml = lista("luoghi").length
            ? `<p class="wz-rias-sotto">Luoghi del caso</p><ul>` + lista("luoghi").map(l => `<li><strong>${l.nome || "?"}</strong>${l.quartiere ? ` — ${l.quartiere}` : ""}${l.tipologiaId ? ` <span class="wz-rias-mini">(${l.tipologiaId})</span>` : ""}${l.personaId && persona(l.personaId) ? ` <span class="wz-rias-mini">· di ${nomePieno(persona(l.personaId))}</span>` : ""}</li>`).join("") + "</ul>" : "";
        const problemiHtml = (get("passo3.problemi") || []).filter(p => p.testo).length
            ? `<p class="wz-rias-sotto">Problemi</p><ul>` + (get("passo3.problemi") || []).filter(p => p.testo).map(p => `<li>${p.testo}${p.potenzialeFalsaPista ? " <em>(falsa pista?)</em>" : ""}</li>`).join("") + "</ul>" : "";
        const vita = gruppoReti("passo3") + problemiHtml;
        const luoghiHtml2 = luoghiHtml ? luoghiHtml.replace('<p class="wz-rias-sotto">Luoghi del caso</p>', "") : "";
        B("s3", "4 · La sua vita", vita);

        const cand = (get("passo4.candidati") || []).map(c => `<li><strong>${N(persona(c.personaId))}</strong>${c.perche ? ` — ${c.perche}` : ""}</li>`).join("");
        const escl = (get("passo4.esclusioni") || []).map(c => `<li>${N(persona(c.personaId))}${c.perche ? ` — ${c.perche}` : ""}</li>`).join("");

        const colpDett = (get("passo5.colpevoliIds") || []).map(id => {
            const p = persona(id);
            return p && (p.professione || p.postoNelMondo)
                ? `<p class="wz-rias-mini">${N(p)}${p.eta ? `, ${p.eta}` : ""}${p.professione ? ` — ${p.professione}` : ""}${p.postoNelMondo ? `. ${p.postoNelMondo}` : ""}</p>` : "";
        }).join("");
        B("s5", "5 · Assassino", colp.length
            ? `<p><strong>${(get("passo5.colpevoliIds") || []).map(id => N(persona(id))).join(", ")}</strong></p>${colpDett}${get("passo5.competenze") ? `<p class="wz-rias-mini">Sa fare: ${get("passo5.competenze")}</p>` : ""}${get("passo5.erroreCoerente") ? `<p class="wz-rias-mini">Errore: ${get("passo5.erroreCoerente")}</p>` : ""}` : "");

        const interHtml = (get("passo6.intersezione") || []).length
            ? `<p class="wz-rias-sotto">Sanno senza sapere</p><ul>` + (get("passo6.intersezione") || []).map(x => `<li><strong>${N(persona(x.chi))}</strong> — ${x.saSenzaSapere}</li>`).join("") + "</ul>" : "";
        const rete6 = gruppoReti("passo6");
        B("s6", "6 · Le due reti", (get("passo6.connessioneVittima") || rete6 || interHtml)
            ? `${get("passo6.connessioneVittima") ? `<p>${get("passo6.connessioneVittima")}</p>` : ""}${rete6}${get("passo6.dopoIlFatto") ? `<p class="wz-rias-mini">Dopo il fatto: ${tr(get("passo6.dopoIlFatto"), 120)}</p>` : ""}${interHtml}` : "");

        B("s4", "7 · Movente", get("passo4.descrizione")
            ? `<p>${get("passo4.descrizione")}</p>${cand ? `<p class="wz-rias-sotto">Candidati</p><ul>${cand}</ul>` : ""}${escl ? `<p class="wz-rias-sotto">Esclusi (false piste)</p><ul>${escl}</ul>` : ""}` : "");

        const NA = (id) => { const pp = persona(id); return pp ? N(pp) : `<strong>${nomeAttore(id) || "?"}</strong>`; };
        const gruppiHtml = lista("gruppi").filter(g => g.nome).length
            ? `<p class="wz-rias-sotto">Gruppi e distretti</p><ul>` + lista("gruppi").filter(g => g.nome).map(g =>
                `<li><strong>${g.nome}</strong>${g.tipo ? ` <span class="wz-rias-mini">(${g.tipo})</span>` : ""}${(g.membriIds || []).length ? ` — ${(g.membriIds || []).map(m => nomeAttore(m)).filter(Boolean).join(", ")}` : ""}</li>`).join("") + "</ul>" : "";
        const relazioniHtml = lista("relazioni").filter(r => r.aId && r.bId).length
            ? "<ul>" + lista("relazioni").filter(r => r.aId && r.bId).map(r => {
                const en = (v) => v === "" || v === undefined ? "?" : (+v > 0 ? "+" + v : String(v));
                return `<li>${NA(r.aId)} ${en(r.enAB)} — ${r.tipo || "?"} — ${en(r.enBA)} ${NA(r.bId)}</li>`;
            }).join("") + "</ul>" : "";
        B("sR", "8 · Gruppi e relazioni", gruppiHtml + relazioniHtml);
        B("sL", "9 · Luoghi del caso", luoghiHtml2);

        const ev = lista("passo7.eventi");
        B("s7", "10 · Cronistoria", ev.length
            ? "<ul>" + ev.map(e => `<li><span class="wz-rias-fase ${e.fase || ""}">[${e.fase || "?"}]</span> <strong>${e.quando || "?"}</strong>${e.quandoFine ? ` → ${e.quandoFine}` : ""} — ${tr(e.testo, 80)}</li>`).join("") + "</ul>" : "");

        const schede = lista("passo8.schede");
        B("s8", "11 · Schede", schede.length
            ? "<ul>" + schede.map(s => `<li><strong>${N(persona(s.personaId))}</strong>${s.comportamento ? ` — ${tr(s.comportamento, 60)}` : ""}</li>`).join("") + "</ul>" : "");

        const infos = lista("passo9.tracce");
        B("s9", "12 · Informazioni", infos.length
            ? "<ul>" + infos.map(t => `<li><strong>${t.nome || "?"}</strong> <span class="wz-rias-mini">(${ETICH[t.classificazione] || t.classificazione || "?"}, ${(t.fonti || []).filter(fonteValida).length} fonti${(t.fonti || []).some(f => f.handout) ? " · 📄" : ""})</span></li>`).join("") + "</ul>" : "");

        const hoLiberi = lista("passo10.handout");
        const hoMarcati = [];
        infos.forEach(t => (t.fonti || []).forEach(f => { if (f.handout) hoMarcati.push(f.handoutTitolo || t.nome || "?"); }));
        lista("passo8.schede").forEach(s => { if (s.depHandout && s.deposizione) hoMarcati.push(s.depTitolo || `Deposizione — ${nomeAttore(s.personaId) || "?"}`); });
        B("s10", "13 · Handout", (hoLiberi.length + hoMarcati.length)
            ? "<ul>" + hoLiberi.map(h => `<li><strong>${h.titolo || "?"}</strong>${h.generatore ? ` <span class="wz-rias-mini">(${h.generatore})</span>` : ""}</li>`).join("")
                + hoMarcati.map(m => `<li>📄 <strong>${m}</strong></li>`).join("") + "</ul>" : "");

        B("s11", "14 · Calendario", lista("passo11.giorni").length
            ? "<ul>" + lista("passo11.giorni").map(g => `<li><strong>G${g.giorno ?? "?"}</strong>${g.momento ? ` ${g.momento}` : ""} — ${tr(g.evento, 70)}${g.condizione ? ` <em>(se: ${tr(g.condizione, 40)})</em>` : ""}</li>`).join("") + "</ul>" : "");

        corpo.innerHTML = blocchi.length ? blocchi.join("") : "<p class='wz-nota'>Ancora niente: comincia dal passo 1.</p>";
    }

    function initDrawer() {
        const btn = document.getElementById("wz-drawer-btn");
        const drawer = document.getElementById("wz-drawer");
        if (!btn || !drawer) return;
        buildRiassunto();
        const desktop = window.matchMedia("(min-width: 1000px)");
        const applica = () => { drawer.hidden = !desktop.matches; };
        applica();
        desktop.addEventListener?.("change", applica);
        btn.addEventListener("click", () => { buildRiassunto(); drawer.hidden = !drawer.hidden; });
        // il riassunto si aggiorna a ogni modifica (leggero: rigenera testo)
        document.addEventListener("input", () => { clearTimeout(initDrawer._t); initDrawer._t = setTimeout(buildRiassunto, 600); });
        // apri/chiudi tutto con un click
        const toggle = document.getElementById("wz-rias-toggle");
        if (toggle) toggle.addEventListener("click", () => {
            const dets = drawer.querySelectorAll("details[data-k]");
            const qualcunoAperto = Array.from(dets).some(d => d.open);
            dets.forEach(d => d.open = !qualcunoAperto);
            toggle.textContent = qualcunoAperto ? "Apri tutto" : "Chiudi tutto";
        });
    }

    // ───────────────────────── mappa di Kyoto ─────────────────────────
    // Mappa PER AVVENTURA: immagine del caso (o quella di default) + zone come perni calibrabili.
    // Le zone sono seminate dalla biblioteca Kyoto con coordinate pre-calibrate sull'immagine di default;
    // ogni caso può rinominarle, spostarle, aggiungerne, o caricare un'altra immagine (Tokyo, ecc.).
    const ZONE_XY_DEFAULT = { shimogyo: [0.47, 0.66], nakagyo: [0.47, 0.45], gionHigashiyama: [0.73, 0.52], sakyo: [0.70, 0.20], kamigyo: [0.40, 0.30], fushimi: [0.64, 0.90], minami: [0.44, 0.86], kita: [0.40, 0.15], ukyo: [0.19, 0.48], nishikyo: [0.21, 0.77], yamashina: [0.91, 0.55], uji: [0.90, 0.93] };

    async function initMappa() {
        const overlay = document.getElementById("wz-mappa-overlay");
        if (!overlay) return;
        const cont = document.getElementById("wz-mappa2-cont");
        const img = document.getElementById("wz-mappa2-img");
        const pins = document.getElementById("wz-mappa2-pins");
        const editor = document.getElementById("wz-mappa2-editor");
        const info = document.getElementById("wz-mappa-info");
        const hint = document.getElementById("wz-mappa2-hint");
        if (!cont) return;

        const dati = await lib("luoghi");
        if (!get("mappa") || !(get("mappa").zone || []).length) {
            set("mappa", {
                immagineUrl: "",
                zone: dati.quartieri.map(q => ({ id: q.id, nome: q.nome, x: (ZONE_XY_DEFAULT[q.id] || [null, null])[0], y: (ZONE_XY_DEFAULT[q.id] || [null, null])[1] }))
            });
            salvaDebounce();
        }
        const zone = () => get("mappa").zone || [];
        const zonaMatch = (val, z) => !!val && (val === z.id || val === z.nome);
        let daPosizionare = null;

        const apri = () => { overlay.hidden = false; renderMappa(); };
        document.getElementById("wz-mappa-btn")?.addEventListener("click", apri);
        document.getElementById("wz-mappa-da-passo")?.addEventListener("click", apri);
        document.getElementById("wz-mappa-chiudi")?.addEventListener("click", () => overlay.hidden = true);
        overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.hidden = true; });

        let vistaPG = false; // vista giocatori: nasconde quello marcato 🙈 (zone comprese)
        const verMappa = "3"; // versione dell'immagine di default: STABILE (così il browser la cachea). Da incrementare SOLO quando si cambia mappa_kyoto.jpg — non Date.now(), che vietava la cache e riscaricava sempre
        function renderMappa() {
            const urlMappa = get("mappa").immagineUrl || ("/img/mappa_kyoto.jpg?v=" + verMappa);
            if (!img.src.endsWith(urlMappa)) img.src = urlMappa;
            const luoghi = lista("luoghi"), gruppi = lista("gruppi");
            // distanziamento SOLO VISIVO: se due perni sono troppo vicini, nel disegno si allontanano
            // in verticale finché le etichette non respirano (i dati/posizioni veri non cambiano)
            const disegno = zone().filter(z => z.x != null && z.y != null && !(vistaPG && z.segretoPG))
                .map(z => ({ z, x: z.x, y: z.y }));
            for (let giro = 0; giro < 40; giro++) {
                let mosso = false;
                for (let i = 0; i < disegno.length; i++) for (let j = i + 1; j < disegno.length; j++) {
                    const A = disegno[i], B = disegno[j];
                    if (Math.abs(B.x - A.x) < 0.13 && Math.abs(B.y - A.y) < 0.09) {
                        const su = A.y <= B.y ? A : B, giu = su === A ? B : A;
                        su.y = Math.max(0.03, su.y - 0.012);
                        giu.y = Math.min(0.96, giu.y + 0.012);
                        mosso = true;
                    }
                }
                if (!mosso) break;
            }
            pins.innerHTML = disegno.map(({ z, x, y }) => {
                const inZona = [
                    ...gruppi.filter(g => zonaMatch(g.zona, z) && g.nome && !(vistaPG && g.segretoPG))
                        .map(g => ({ icona: iconaGruppo(g), nome: g.nome, pg: (g.tipo || "").includes("dei PG") })),
                    ...luoghi.filter(l => zonaMatch(l.quartiere, z) && !(vistaPG && l.segretoPG))
                        .map(l => ({ icona: iconaLuogo(l), nome: l.nome || l.tipologiaId || "luogo", pg: false }))
                ];
                // voci identiche accorpate ("×2"), in ordine alfabetico, massimo 2 righe sul perno
                const accorpate = [];
                for (const v of inZona) {
                    const stessa = accorpate.find(a => a.icona === v.icona && a.nome === v.nome);
                    if (stessa) stessa.n++; else accorpate.push({ ...v, n: 1 });
                }
                accorpate.sort((a, b) => a.nome.localeCompare(b.nome, "it"));
                const visibili = accorpate.slice(0, 2);
                const resto = accorpate.length - visibili.length;
                const caso = zonaMatch(get("setup.quartiere"), z);
                return `<button type="button" class="wz-pin ${caso ? "caso" : ""}" style="left:${(x * 100).toFixed(2)}%;top:${(y * 100).toFixed(2)}%" data-zona="${z.id}">
                    ${caso ? `<span class="wz-pin-p">★</span>` : ""}
                    <span class="wz-pin-n">${z.nome}</span>
                    ${visibili.map(v => `<span class="wz-pin-item ${v.pg ? "pg" : ""}">${v.icona} ${v.nome.length > 24 ? v.nome.slice(0, 23) + "…" : v.nome}${v.n > 1 ? ` ×${v.n}` : ""}</span>`).join("")}
                    ${resto > 0 ? `<span class="wz-pin-item">＋ ${resto} voci — tocca</span>` : ""}
                </button>`;
            }).join("");
        }
        document.getElementById("wz-mappa2-vista")?.addEventListener("click", (e) => {
            vistaPG = !vistaPG;
            e.target.classList.toggle("attivo", vistaPG);
            e.target.textContent = vistaPG ? "👁 Vista giocatori: ATTIVA" : "👁 Vista giocatori";
            hint.textContent = vistaPG ? "Vista giocatori: gli elementi 🙈 sono nascosti." : "Vista GM completa.";
            info.hidden = true;
            renderMappa();
        });

        // posizionamento perno (modalità editor)
        cont.addEventListener("click", (e) => {
            if (!daPosizionare) return;
            const r = cont.getBoundingClientRect();
            const z = zone().find(z2 => z2.id === daPosizionare);
            if (z) {
                z.x = Math.min(0.99, Math.max(0.01, (e.clientX - r.left) / r.width));
                z.y = Math.min(0.99, Math.max(0.01, (e.clientY - r.top) / r.height));
                salvaDebounce();
            }
            daPosizionare = null;
            cont.classList.remove("posiziona");
            hint.textContent = "Perno posizionato ✓";
            renderMappa();
            renderEditor();
        });

        // dettagli zona al tocco del perno (che passa in primo piano); il 🙈 si gestisce QUI, voce per voce
        function mostraInfoZona(zonaId) {
            const z = zone().find(z2 => z2.id === zonaId);
            if (!z) { info.hidden = true; return; }
            const q = perId(dati.quartieri, z.id);
            const luoghiTutti = lista("luoghi");
            const gruppiTutti = lista("gruppi");
            const luoghiZona = luoghiTutti.map((l, idx) => ({ l, idx })).filter(x => zonaMatch(x.l.quartiere, z) && !(vistaPG && x.l.segretoPG));
            const gruppiZona = gruppiTutti.map((g, idx) => ({ g, idx })).filter(x => zonaMatch(x.g.zona, z) && x.g.nome && !(vistaPG && x.g.segretoPG));
            const occhio = (segreto) => segreto ? "🙈" : "👁";
            info.hidden = false;
            info.innerHTML = `<p><strong>${z.nome}</strong>${q ? ` — ${q.carattere}` : ""}
                    ${!vistaPG ? `<button type="button" class="wz-btn wz-mini wz-seg-btn" data-seg="z:${z.id}" title="Mostra/nascondi l'intera zona ai giocatori">${occhio(z.segretoPG)} zona</button>` : ""}</p>
                ${q ? `<p class="wz-rias-mini">${q.criminalitaTipica} — ${q.nota}</p>` : ""}
                ${gruppiZona.length ? `<p><strong>In zona</strong>:</p><ul class="wz-mappa-elenco">` + gruppiZona.map(x =>
                    `<li>${iconaGruppo(x.g)} <strong>${x.g.nome}</strong>${(x.g.membriIds || []).length ? ` — ${(x.g.membriIds || []).slice(0, 4).map(m => nomeAttore(m)).filter(Boolean).join(", ")}${(x.g.membriIds || []).length > 4 ? "…" : ""}` : ""}
                     ${!vistaPG ? `<button type="button" class="wz-btn wz-mini wz-seg-btn" data-seg="g:${x.idx}">${occhio(x.g.segretoPG)}</button>` : ""}</li>`).join("") + "</ul>" : ""}
                ${luoghiZona.length ? `<p><strong>Luoghi del caso</strong>:</p><ul class="wz-mappa-elenco">` + luoghiZona.map(x =>
                    `<li>${iconaLuogo(x.l)} <strong>${x.l.nome || x.l.tipologiaId}</strong>
                     ${!vistaPG ? `<button type="button" class="wz-btn wz-mini wz-seg-btn" data-seg="l:${x.idx}">${occhio(x.l.segretoPG)}</button>` : ""}</li>`).join("") + "</ul>" : ""}
                ${!vistaPG ? `<p class="wz-rias-mini">👁 = visibile ai giocatori · 🙈 = nascosto (tocca per cambiare; controlla con «Vista giocatori»)</p>` : ""}
                ${WIZ.passo === 0 ? `<button type="button" class="wz-btn wz-btn-primario wz-mini" id="wz-mappa-scegli">Usa ${z.nome} per questo caso</button>` : ""}`;
            info.querySelectorAll("[data-seg]").forEach(b => b.addEventListener("click", () => {
                const [tipo, chiave] = b.dataset.seg.split(":");
                if (tipo === "z") { const zz = zone().find(z2 => z2.id === chiave); if (zz) zz.segretoPG = !zz.segretoPG; }
                if (tipo === "g") { const g = lista("gruppi")[+chiave]; if (g) g.segretoPG = !g.segretoPG; }
                if (tipo === "l") { const l = lista("luoghi")[+chiave]; if (l) l.segretoPG = !l.segretoPG; }
                salvaDebounce();
                renderMappa();
                mostraInfoZona(zonaId);
            }));
            document.getElementById("wz-mappa-scegli")?.addEventListener("click", () => {
                set("setup.quartiere", q ? q.id : z.nome);
                const sel = document.querySelector("[data-campo='setup.quartiere']");
                if (sel) { sel.value = q ? q.id : z.nome; sel.dispatchEvent(new Event("change")); }
                salvaDebounce();
                overlay.hidden = true;
            });
        }
        pins.addEventListener("click", (e) => {
            if (daPosizionare || appenaTrascinato) return;
            const b = e.target.closest(".wz-pin");
            if (!b) return;
            e.stopPropagation();
            pins.querySelectorAll(".wz-pin.primo").forEach(p => p.classList.remove("primo"));
            b.classList.add("primo"); // in primo piano sopra i perni vicini
            mostraInfoZona(b.dataset.zona);
        });

        // in modalità ✎ i perni si TRASCINANO (molto più comodo del posizionamento a due tocchi)
        let trascina = null, appenaTrascinato = false;
        pins.addEventListener("pointerdown", (e) => {
            if (editor.hidden) return;
            const b = e.target.closest(".wz-pin");
            if (!b) return;
            trascina = { id: b.dataset.zona, mosso: false };
            b.setPointerCapture(e.pointerId);
        });
        pins.addEventListener("pointermove", (e) => {
            if (!trascina) return;
            const z = zone().find(z2 => z2.id === trascina.id);
            if (!z) return;
            trascina.mosso = true;
            const r = cont.getBoundingClientRect();
            z.x = Math.min(0.99, Math.max(0.01, (e.clientX - r.left) / r.width));
            z.y = Math.min(0.99, Math.max(0.01, (e.clientY - r.top) / r.height));
            const b = pins.querySelector(`.wz-pin[data-zona='${trascina.id}']`);
            if (b) { b.style.left = (z.x * 100).toFixed(2) + "%"; b.style.top = (z.y * 100).toFixed(2) + "%"; }
        });
        pins.addEventListener("pointerup", () => {
            if (!trascina) return;
            if (trascina.mosso) {
                salvaDebounce();
                renderMappa();
                appenaTrascinato = true;
                setTimeout(() => appenaTrascinato = false, 250);
            }
            trascina = null;
        });

        // editor zone (per QUESTO caso): rinomina / posiziona / elimina / aggiungi
        document.getElementById("wz-mappa2-calibra")?.addEventListener("click", () => {
            editor.hidden = !editor.hidden;
            cont.classList.toggle("modifica", !editor.hidden);
            hint.textContent = editor.hidden ? "Tocca un perno per i dettagli della zona." : "Modalità zone: TRASCINA i perni sulla mappa per spostarli.";
            renderEditor();
        });
        function renderEditor() {
            if (editor.hidden) return;
            editor.innerHTML = `<p class="wz-nota">Le zone sono di <strong>questo caso</strong>: <strong>trascina i perni</strong> direttamente sulla mappa per spostarli; qui rinomini, elimini (✕) o aggiungi zone nuove (per una città diversa, cambia anche l'immagine). «↺ Posizioni Kyoto» rimette i perni standard al loro posto.</p>
                <button type="button" class="wz-btn wz-mini" data-zona-reset>↺ Posizioni Kyoto</button>` +
                zone().map((z, i) => `<div class="wz-riga-lista">
                    <input type="text" value="${(z.nome || "").replace(/"/g, "&quot;")}" data-zona-nome="${i}" class="wz-medio" />
                    <button type="button" class="wz-btn wz-mini" data-zona-pos="${z.id}">📍${z.x == null ? " da posizionare" : ""}</button>
                    <button type="button" class="wz-btn-x" data-zona-del="${i}">✕</button>
                </div>`).join("") +
                `<button type="button" class="wz-btn wz-aggiungi" data-zona-add>+ Aggiungi zona</button>`;
            editor.querySelectorAll("[data-zona-nome]").forEach(inp => inp.addEventListener("input", () => {
                const z = zone()[+inp.dataset.zonaNome];
                const vecchio = z.nome;
                z.nome = inp.value;
                salvaDebounce();
                clearTimeout(renderEditor._t);
                renderEditor._t = setTimeout(() => { if (vecchio && z.nome && vecchio !== z.nome) propagaRinomina(vecchio, z.nome); renderMappa(); }, 900);
            }));
            editor.querySelectorAll("[data-zona-pos]").forEach(b => b.addEventListener("click", () => {
                daPosizionare = b.dataset.zonaPos;
                cont.classList.add("posiziona");
                const z = zone().find(z2 => z2.id === daPosizionare);
                hint.textContent = `Tocca il punto della mappa per «${z?.nome}»…`;
            }));
            editor.querySelectorAll("[data-zona-del]").forEach(b => b.addEventListener("click", () => {
                zone().splice(+b.dataset.zonaDel, 1);
                salvaDebounce();
                renderMappa();
                renderEditor();
            }));
            editor.querySelector("[data-zona-add]")?.addEventListener("click", () => {
                zone().push({ id: nuovoId("z"), nome: "Nuova zona", x: null, y: null });
                salvaDebounce();
                renderEditor();
            });
            editor.querySelector("[data-zona-reset]")?.addEventListener("click", () => {
                zone().forEach(z => { const d = ZONE_XY_DEFAULT[z.id]; if (d) { z.x = d[0]; z.y = d[1]; } });
                salvaDebounce();
                hint.textContent = "Perni standard rimessi al loro posto ✓ (le zone aggiunte da te non si toccano).";
                renderMappa();
                renderEditor();
            });
        }

        // immagine per-caso
        document.getElementById("wz-mappa2-file")?.addEventListener("change", async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            hint.textContent = "Carico l'immagine…";
            const fd = new FormData();
            fd.append("file", file);
            const r = await fetch(`/api/progetti/${WIZ.id}/mappa`, { method: "POST", body: fd });
            if (!r.ok) { hint.textContent = "⚠ " + ((await r.json()).errore || "errore di caricamento"); return; }
            get("mappa").immagineUrl = (await r.json()).url;
            salvaDebounce();
            hint.textContent = "Immagine del caso caricata ✓ — ora riposiziona i perni con ✎.";
            renderMappa();
        });

        document.addEventListener("input", () => { clearTimeout(initMappa._t); initMappa._t = setTimeout(() => { if (!overlay.hidden) renderMappa(); }, 900); });
        // NIENTE render iniziale: l'overlay parte chiuso in OGNI passo. Renderizzare qui
        // caricherebbe i ~588KB della mappa a ogni apertura di pagina, anche senza aprirla.
        // La mappa si disegna solo quando la apri (apri() → renderMappa()).
        if (!overlay.hidden) renderMappa();
    }

    // ───────────────────────── ✨ proposte AI ─────────────────────────
    function initAi() {
        if (!WIZ.aiAttiva) return;
        document.querySelectorAll("[data-proponi]").forEach(b => {
            b.hidden = false;
            b.addEventListener("click", async () => {
                const pannello = document.getElementById("wz-proposte");
                const corpo = document.getElementById("wz-proposte-corpo");
                pannello.hidden = false;
                corpo.innerHTML = "<p>Sto pensando… (10-30 secondi)</p>";
                try {
                    const indicazioni = prompt("Indicazioni per l'AI (opzionale — invio per nessuna):") || "";
                    const r = await fetch(`/api/progetti/${WIZ.id}/proponi/${b.dataset.proponi}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ indicazioni, modello: modelloAI(), effort: effortAI() })
                    });
                    if (!r.ok) { corpo.innerHTML = `<p class="l-err">Errore: ${(await r.text()).slice(0, 300)}</p>`; return; }
                    const json = await r.json();
                    renderProposte(json, +b.dataset.proponi, corpo);
                } catch (e) {
                    corpo.innerHTML = `<p class="l-err">Errore: ${e.message}</p>`;
                }
            });
        });
        document.getElementById("wz-proposte-chiudi")?.addEventListener("click", () =>
            document.getElementById("wz-proposte").hidden = true);
    }

    function renderProposte(json, passo, corpo) {
        const proposte = json.proposte || (Array.isArray(json) ? json : [json]);
        corpo.innerHTML = "";
        proposte.forEach((prop, i) => {
            const card = document.createElement("div");
            card.className = "wz-proposta";
            card.innerHTML = `<pre>${JSON.stringify(prop, null, 2).replace(/</g, "&lt;")}</pre>`;
            const azioni = document.createElement("div");
            const applica = applicaProposta(passo, prop);
            if (applica) {
                const btn = document.createElement("button");
                btn.className = "wz-btn wz-btn-primario";
                btn.textContent = "Usa questa";
                btn.addEventListener("click", () => { applica(); location.reload(); });
                azioni.appendChild(btn);
            }
            const copia = document.createElement("button");
            copia.className = "wz-btn";
            copia.textContent = "Copia JSON";
            copia.addEventListener("click", () => navigator.clipboard.writeText(JSON.stringify(prop, null, 2)));
            azioni.appendChild(copia);
            card.appendChild(azioni);
            corpo.appendChild(card);
        });
        if (json.avviso) corpo.insertAdjacentHTML("beforeend", `<p class="l-warn">⚠ ${json.avviso}</p>`);
    }

    // mapping "Usa questa" per i passi a campi semplici; per gli altri (liste) si usa Copia JSON per ora
    function applicaProposta(passo, prop) {
        switch (passo) {
            case 1: return () => { set("passo1.tipologiaId", prop.tipologiaId || ""); set("passo1.sottotipoId", prop.sottotipoId || ""); set("passo1.rigaUnica", prop.rigaUnica || ""); return salvaOra(); };
            case 2: return () => { set("passo2.professioneId", prop.professioneId || ""); set("passo2.postoNelMondo", prop.postoNelMondo || ""); set("passo2.eta", prop.eta || 50); set("passo2.genere", prop.genere || "m"); return salvaOra(); };
            case 4: return () => { set("passo4.moventeId", prop.moventeId || ""); set("passo4.descrizione", prop.descrizione || ""); return salvaOra(); };
            case 5: return prop.erroreCoerente ? () => { set("passo5.competenze", prop.competenze || ""); set("passo5.erroreCoerente", prop.erroreCoerente || ""); return salvaOra(); } : null;
            case 7: return prop.eventi || (Array.isArray(prop) && prop[0]?.fase) ? () => { set("passo7.eventi", (prop.eventi || prop).map(e => ({ id: nuovoId("e"), ...e }))); return salvaOra(); } : null;
            case 11: return prop.giorni || (Array.isArray(prop) && prop[0]?.giorno != null) ? () => { set("passo11.giorni", prop.giorni || prop); return salvaOra(); } : null;
            default: return null;
        }
    }

    // ───────────────────────── sottotipi dinamici (passo 1) ─────────────────────────
    async function initSottotipi() {
        const sel = document.querySelector("[data-opzioni-dinamiche='sottotipi-omicidio']");
        if (!sel) return;
        sel.dataset.campo = sel.dataset.campo || "passo1.sottotipoId";
        const aggiorna = async () => {
            const tid = get("passo1.tipologiaId");
            const dati = await lib("tipologie_omicidio");
            const tip = perId(dati.tipologie, tid);
            const opzioni = ((tip && tip.sottotipi) || [])
                .map(s => `<option value="${s.id}">${s.nome}${s.nota ? " — " + s.nota.split(";")[0] : ""}</option>`).join("");
            applicaOpzioniConCustom(sel, opzioni);
        };
        await aggiorna();
        document.querySelector("[data-campo='passo1.tipologiaId']")?.addEventListener("change", aggiorna);
    }

    // ───────────────────────── navigazione ─────────────────────────
    function initNav() {
        document.querySelectorAll("[data-vai]").forEach(b => b.addEventListener("click", async () => {
            const dest = +b.dataset.vai;
            await salvaOra(Math.max(dest, WIZ.passo));
            location.href = `/Wizard/${WIZ.id}/${dest}`;
        }));
    }

    // ───────────────────────── ✨ suggeritore calendario (nuovo stile: leggibile, in pagina, aggiungi tu) ─────────────────────────
    function initSuggeritoreCalendario() {
        const apri = document.getElementById("cal-sugg-apri");
        if (!apri) return; // solo sulla schermata calendario
        if (WIZ.aiAttiva) document.getElementById("cal-sugg").hidden = false;
        const box = document.getElementById("cal-sugg-box");
        const out = document.getElementById("cal-sugg-out");
        const msg = document.getElementById("cal-sugg-msg");
        const esc = s => (s || "").replace(/</g, "&lt;");
        apri.addEventListener("click", () => { box.hidden = false; document.getElementById("cal-sugg-note").focus(); });
        document.getElementById("cal-sugg-chiudi").addEventListener("click", () => { box.hidden = true; });
        // aggiunge UN giorno proposto al calendario (solo su clic; non sovrascrive nulla)
        const aggiungiGiorno = (g) => {
            lista("passo11.giorni").push({ giorno: g.giorno ?? 0, momento: g.momento || "", condizione: g.condizione || "", evento: g.evento || "" });
            salvaDebounce();
            const cont = document.querySelector("[data-lista='passo11.giorni']");
            if (cont) renderLista(cont); // aggiorna la lista qui sopra
        };
        const giorniTesto = (giorni) => "CALENDARIO PROPOSTO\n\n" + giorni.map(g =>
            `Giorno ${g.giorno ?? "?"}${g.momento ? " · " + g.momento : ""}\n${g.evento || ""}${g.condizione ? "\n(solo se: " + g.condizione + ")" : ""}`).join("\n\n");
        const copia = async (txt, btn) => {
            try { await navigator.clipboard.writeText(txt); const o = btn.textContent; btn.textContent = "✓ copiato"; setTimeout(() => btn.textContent = o, 1500); }
            catch { alert("Copia non riuscita — seleziona e copia a mano."); }
        };
        const render = (giorni) => {
            out.innerHTML = "";
            if (!giorni.length) { out.innerHTML = "<p class='wz-nota'>L'AI non ha prodotto nulla. Riprova, magari più preciso.</p>"; return; }
            const testa = document.createElement("p");
            testa.className = "wz-mini-nota";
            testa.innerHTML = giorni.length === 1
                ? `<strong>Ecco.</strong> Aggiungilo se ti va, o copialo. Niente viene toccato finché non clicchi tu.`
                : `<strong>${giorni.length} eventi.</strong> Aggiungi quelli che vuoi. Niente viene toccato finché non clicchi tu.`;
            out.appendChild(testa);
            giorni.forEach(g => {
                const card = document.createElement("div");
                card.className = "wz-sugg-card";
                const persone = (g.personeIds || []).map(id => nomeAttore(id)).filter(Boolean).join(", ");
                card.innerHTML = `<div class="wz-sugg-testo"><strong>📅 Giorno ${g.giorno ?? "?"}${g.momento ? " · " + esc(g.momento) : ""}</strong><br>${esc(g.evento || "")}` +
                    `${g.condizione ? `<br><em>↳ solo se: ${esc(g.condizione)}</em>` : ""}${persone ? `<br><small class="wz-nota">coinvolti: ${esc(persone)}</small>` : ""}</div>`;
                const btn = document.createElement("button");
                btn.type = "button"; btn.className = "wz-btn wz-mini wz-sugg-add";
                btn.textContent = "➕ Aggiungi";
                btn.addEventListener("click", () => { aggiungiGiorno(g); btn.textContent = "✓ aggiunto"; btn.disabled = true; });
                card.appendChild(btn);
                out.appendChild(card);
            });
            const piede = document.createElement("div");
            piede.className = "wz-nome-riga wz-sugg-piede";
            piede.innerHTML = `<button type="button" class="wz-btn" data-copia>📋 Copia${giorni.length > 1 ? " tutto" : ""}</button>` +
                (giorni.length > 1 ? `<button type="button" class="wz-btn" data-agg-tutti>➕ Aggiungi tutti</button>` : "");
            out.appendChild(piede);
            piede.querySelector("[data-copia]").addEventListener("click", (e) => copia(giorniTesto(giorni), e.target));
            piede.querySelector("[data-agg-tutti]")?.addEventListener("click", () => {
                giorni.forEach(aggiungiGiorno);
                out.querySelectorAll(".wz-sugg-add").forEach(b => { b.textContent = "✓ aggiunto"; b.disabled = true; });
            });
        };
        document.getElementById("cal-sugg-genera").addEventListener("click", async (e) => {
            const richiesta = document.getElementById("cal-sugg-note").value.trim();
            if (!richiesta) { document.getElementById("cal-sugg-note").focus(); msg.textContent = "Scrivi UNA cosa da aggiungere (es. «il funerale», «il giorno dopo la morte»)."; return; }
            const btn = e.target, orig = btn.textContent;
            btn.disabled = true; btn.textContent = "✨ Sto leggendo il caso… (10-30s)"; msg.textContent = ""; out.innerHTML = "";
            try {
                const r = await fetch(`/api/progetti/${WIZ.id}/calendario-evento`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ richiesta, modello: modelloAI(), effort: effortAI() })
                });
                const j = await r.json().catch(() => ({}));
                if (!r.ok) { msg.textContent = "⚠ " + (j.detail || j.errore || r.status); return; }
                // il modello può incorniciare il JSON: estraggo il primo blocco { … }
                let obj;
                try { let t = (j.testo || "").trim(); const a = t.indexOf("{"), b = t.lastIndexOf("}"); obj = JSON.parse(a >= 0 && b > a ? t.slice(a, b + 1) : t); }
                catch { msg.textContent = "⚠ risposta AI non leggibile, riprova"; return; }
                render(obj.eventi || (Array.isArray(obj) ? obj : [obj]));
            } catch { msg.textContent = "⚠ AI non raggiungibile"; }
            finally { btn.disabled = false; btn.textContent = orig; }
        });
    }

    // menù modello + ragionamento nell'header: allineano i valori salvati e li aggiornano al cambio
    function initModelloAI() {
        const selM = document.getElementById("wz-modello-ai");
        const selE = document.getElementById("wz-effort-ai");
        if (!selM) return;
        const okM = [...selM.options].some(o => o.value === modelloAI());
        selM.value = okM ? modelloAI() : MODELLO_DEFAULT;
        // Haiku non supporta il ragionamento: in quel caso disabilito il menù effort
        const aggiornaEffortDisabile = () => { if (selE) selE.disabled = (selM.value === "claude-haiku-4-5"); };
        selM.addEventListener("change", () => { localStorage.setItem("wizModelAI", selM.value); aggiornaEffortDisabile(); });
        if (selE) {
            const okE = [...selE.options].some(o => o.value === effortAI());
            selE.value = okE ? effortAI() : EFFORT_DEFAULT;
            selE.addEventListener("change", () => localStorage.setItem("wizEffortAI", selE.value));
        }
        aggiornaEffortDisabile();
    }

    // ───────────────────────── avvio ─────────────────────────
    (async function avvio() {
        bindCampi();
        await riempiOpzioni();
        await aggiornaInfo();
        await initListe();
        await initSottotipi();
        agganciaPerPasso();
        initDrawer();
        await initMappa();
        initAi();
        initSuggeritoreCalendario();
        initModelloAI();
        initNav();
    })();
})();
