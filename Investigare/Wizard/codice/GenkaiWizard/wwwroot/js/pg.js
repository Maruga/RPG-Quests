// GENKAI Wizard-PG — motore client: stato, binding, passi, regole, ✨/🎨, autosave.
(() => {
    "use strict";
    const S = PG.stato && typeof PG.stato === "object" ? PG.stato : {};
    const ATTR = ["Distacco", "Pazienza", "Silenzio", "Lucidità", "Ascolto", "Presenza"];
    const ATTR_DESC = {
        "Distacco": "non farti coinvolgere: restare lucido davanti all'orrore, tenere la distanza professionale",
        "Pazienza": "resistere alla fretta: aspettare, sopportare l'attesa, non forzare i tempi",
        "Silenzio": "la calma interiore: non reagire d'impulso, non tradire le intenzioni",
        "Lucidità": "vedere chiaro: collegare i pezzi, ricostruire, analizzare",
        "Ascolto": "far parlare gli altri: cogliere il non detto, sentire le bugie",
        "Presenza": "l'autorità: farsi prendere sul serio, riempire la stanza, intimidire"
    };
    const PASSI = 12;
    let BIB = { gou: [], senmon: [], gradi: [], famiglie: [], quartieri: [] };

    // modello + ragionamento AI (stesse chiavi del wizard-avventure: scelta condivisa)
    const MODELLO_DEFAULT = "claude-opus-5";
    const modelloAI = () => localStorage.getItem("wizModelAI") || MODELLO_DEFAULT;
    const effortAI = () => localStorage.getItem("wizEffortAI") || "high";

    // ───────── stato: get/set + autosave ─────────
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

    const indicatore = document.getElementById("pg-salvato");
    let salvaTimer = null, sospeso = false;
    function corpoSalva() {
        return JSON.stringify({
            statoJson: JSON.stringify(S),
            passoCorrente: passoCorrente,
            nome: nomePieno() || document.getElementById("pg-nome-testata").value || null
        });
    }
    function salvaDebounce() {
        sospeso = true;
        if (indicatore) { indicatore.textContent = "○"; indicatore.className = "wz-salvato attesa"; }
        clearTimeout(salvaTimer);
        salvaTimer = setTimeout(salvaOra, 800);
    }
    async function salvaOra() {
        sospeso = false;
        try {
            const r = await fetch(`/api/pg/${PG.id}/stato`, {
                method: "POST", headers: { "Content-Type": "application/json" }, body: corpoSalva()
            });
            if (indicatore) { indicatore.textContent = "●"; indicatore.className = "wz-salvato " + (r.ok ? "ok" : "errore"); }
        } catch { if (indicatore) { indicatore.textContent = "●"; indicatore.className = "wz-salvato errore"; } }
    }
    function flush() {
        if (!sospeso) return;
        clearTimeout(salvaTimer); sospeso = false;
        navigator.sendBeacon(`/api/pg/${PG.id}/stato`, new Blob([corpoSalva()], { type: "application/json" }));
    }
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flush(); });

    const nomePieno = () => [get("identita.cognome"), get("identita.nome")].filter(Boolean).join(" ").trim();

    // ───────── binding generico data-pg-campo ─────────
    function bindCampi() {
        document.querySelectorAll("[data-pg-campo]").forEach(el => {
            const path = el.dataset.pgCampo;
            const val = get(path);
            if (val != null) el.value = val;
            el.addEventListener("input", () => {
                set(path, el.type === "number" ? +el.value : el.value);
                if (path.startsWith("identita.")) aggiornaTitolo();
            });
        });
        const tit = document.getElementById("pg-nome-testata");
        tit.addEventListener("input", salvaDebounce);
    }
    function aggiornaTitolo() {
        const n = nomePieno();
        if (n) document.getElementById("pg-nome-testata").value = n;
    }

    // ───────── passi (client-side) ─────────
    let passoCorrente = Math.min(Math.max(PG.passo || 0, 0), PASSI - 1);
    function mostraPasso(n) {
        passoCorrente = Math.min(Math.max(n, 0), PASSI - 1);
        document.querySelectorAll("[data-pg-passo]").forEach(s => s.hidden = +s.dataset.pgPasso !== passoCorrente);
        document.querySelectorAll("[data-pg-vai]").forEach(a => a.classList.toggle("attivo", +a.dataset.pgVai === passoCorrente));
        document.getElementById("pg-indietro").disabled = passoCorrente === 0;
        document.getElementById("pg-avanti").textContent = passoCorrente === PASSI - 1 ? "Fine" : "Avanti ›";
        if (passoCorrente === 5) aggiornaKi();
        if (passoCorrente === 11) { renderRiepilogo(); renderShugyo(); }
        window.scrollTo({ top: 0 });
        salvaDebounce(); // memorizza il passo raggiunto
    }
    function initNav() {
        document.querySelectorAll("[data-pg-vai]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); mostraPasso(+a.dataset.pgVai); }));
        document.getElementById("pg-indietro").addEventListener("click", () => mostraPasso(passoCorrente - 1));
        document.getElementById("pg-avanti").addEventListener("click", () => {
            if (passoCorrente === PASSI - 1) { location.href = "/Pg"; return; }
            mostraPasso(passoCorrente + 1);
        });
    }

    // ───────── attributi ─────────
    const PUNTI_ATTR = 9, ATTR_MIN = 4, ATTR_MAX = 9;
    const attributi = () => { if (!S.attributi) S.attributi = {}; ATTR.forEach(a => { if (typeof S.attributi[a] !== "number") S.attributi[a] = 4; }); return S.attributi; };
    const puntiUsati = () => ATTR.reduce((n, a) => n + (attributi()[a] - ATTR_MIN), 0);
    function renderAttributi() {
        const box = document.getElementById("pg-attributi");
        const at = attributi();
        box.innerHTML = ATTR.map(a => `
            <div class="pg-attr">
                <div class="pg-attr-testa"><strong>${a}</strong><small> — ${ATTR_DESC[a]}</small></div>
                <div class="pg-attr-ctrl">
                    <button type="button" class="wz-btn wz-mini" data-attr-meno="${a}">−</button>
                    <span class="pg-attr-val" id="pg-attr-${a}">${at[a]}</span>
                    <button type="button" class="wz-btn wz-mini" data-attr-piu="${a}">+</button>
                </div>
            </div>`).join("");
        box.querySelectorAll("[data-attr-piu]").forEach(b => b.addEventListener("click", () => cambiaAttr(b.dataset.attrPiu, +1)));
        box.querySelectorAll("[data-attr-meno]").forEach(b => b.addEventListener("click", () => cambiaAttr(b.dataset.attrMeno, -1)));
        aggiornaContatoreAttr();
    }
    function cambiaAttr(a, d) {
        const at = attributi();
        const nuovo = at[a] + d;
        if (nuovo < ATTR_MIN || nuovo > ATTR_MAX) return;
        if (d > 0 && puntiUsati() >= PUNTI_ATTR) return; // punti finiti
        at[a] = nuovo;
        document.getElementById("pg-attr-" + a).textContent = nuovo;
        aggiornaContatoreAttr();
        aggiornaGouRequisiti();
        aggiornaSenmonRequisiti();
        aggiornaKi();
        salvaDebounce();
    }
    function aggiornaContatoreAttr() {
        const resto = PUNTI_ATTR - puntiUsati();
        const el = document.getElementById("pg-attr-rimasti");
        el.textContent = resto;
        el.parentElement.classList.toggle("pg-punti-zero", resto === 0);
    }

    // ───────── biblioteche (senmon + gou) ─────────
    async function caricaBiblioteche() {
        const [g, s, l] = await Promise.all([
            fetch("/api/biblioteca/gou").then(r => r.json()),
            fetch("/api/biblioteca/senmon").then(r => r.json()),
            fetch("/api/biblioteca/luoghi").then(r => r.json()).catch(() => ({}))
        ]);
        BIB.gou = g.gou || [];
        BIB.senmon = s.senmon || [];
        BIB.gradi = s.gradi || [];
        BIB.famiglie = s.famiglie || [];
        BIB.quartieri = l.quartieri || [];
    }
    const gouById = (id) => BIB.gou.find(x => x.id === id);
    const senmonById = (id) => BIB.senmon.find(x => x.id === id);
    const nomeFamiglia = (id) => (BIB.famiglie.find(f => f.id === id) || {}).nome || id;

    // ───────── senmon (passo 2) ─────────
    const listaSenmon = () => { if (!Array.isArray(S.senmon)) S.senmon = [{ id: "lotta", grado: 1, usi: 0, diBase: true }]; return S.senmon; };
    const lottaBase = () => listaSenmon().find(x => x.id === "lotta");
    function initSenmon() {
        const sel = document.getElementById("pg-senmon-sel");
        const perFam = {};
        BIB.senmon.filter(x => x.id !== "lotta").forEach(x => (perFam[x.famiglia] = perFam[x.famiglia] || []).push(x));
        sel.innerHTML = `<option value="">— scegli —</option>` +
            `<option value="__lotta2">🥋 Lotta → grado 2 (rinforza l'accademia invece di una nuova specializzazione — serve Presenza 6)</option>` +
            Object.entries(perFam).map(([f, voci]) =>
                `<optgroup label="${nomeFamiglia(f)}">` + voci.map(v =>
                    `<option value="${v.id}">${v.nome} (${v.chiave.join(" o ")})</option>`).join("") + `</optgroup>`).join("");
        // stato corrente della scelta di creazione
        if (lottaBase()?.upCreazione) sel.value = "__lotta2";
        else { const c = listaSenmon().find(x => x.dallaCreazione); if (c) sel.value = c.id; }
        sel.addEventListener("change", () => {
            // azzera la scelta precedente (nuova senmon O upgrade di Lotta)
            S.senmon = listaSenmon().filter(x => !x.dallaCreazione);
            const lt = lottaBase();
            if (lt && lt.upCreazione) { lt.grado = 1; delete lt.upCreazione; }
            if (sel.value === "__lotta2") {
                const pres = attributi().Presenza || 4;
                if (pres < 6) {
                    alert(`Per portare Lotta al grado 2 serve Presenza ad almeno 6 (ora: ${pres}). Alza Presenza al passo 3 (Attributi), oppure scegli una specializzazione.`);
                    sel.value = "";
                    mostraSenmonInfo(""); salvaDebounce(); return;
                }
                lt.grado = 2; lt.upCreazione = true;
            } else if (sel.value) {
                S.senmon.push({ id: sel.value, grado: 1, usi: 0, dallaCreazione: true });
            }
            mostraSenmonInfo(sel.value);
            salvaDebounce();
        });
        mostraSenmonInfo(sel.value);
        aggiornaSenmonRequisiti();
    }
    // l'opzione "Lotta → grado 2" segue Presenza: si disabilita sotto 6, e se era scelta si revoca
    function aggiornaSenmonRequisiti() {
        const sel = document.getElementById("pg-senmon-sel");
        if (!sel) return;
        const opt = [...sel.options].find(o => o.value === "__lotta2");
        if (!opt) return;
        const ok = (attributi().Presenza || 4) >= 6;
        opt.disabled = !ok;
        const lt = lottaBase();
        if (!ok && lt?.upCreazione) {
            lt.grado = 1; delete lt.upCreazione;
            sel.value = "";
            mostraSenmonInfo("");
            alert("Presenza è scesa sotto 6: Lotta torna al grado 1 — scegli un'altra specializzazione al passo 4 (Senmon).");
            salvaDebounce();
        }
    }
    function mostraSenmonInfo(id) {
        const box = document.getElementById("pg-senmon-info");
        if (id === "__lotta2") {
            box.hidden = false;
            box.innerHTML = `<p><strong>Lotta — grado 2 (Esperto, −2)</strong> · attributo chiave: <strong>Presenza</strong></p>
                <p>Rinforzi l'addestramento d'accademia: pugni, prese e tecniche d'arresto a livello da istruttore. Il −2 vale sui tiri di combattimento pertinenti.</p>
                <p class="wz-nota">Al posto di una nuova specializzazione. Richiede Presenza ≥ 6. Maestro (grado 3): −2 con Correzione · paletti G3: Presenza 8.</p>`;
            return;
        }
        const v = senmonById(id);
        if (!v) { box.hidden = true; return; }
        const maestro = v.maestroEccezione || (BIB.famiglie.find(f => f.id === v.famiglia) || {}).maestro || "+3";
        box.hidden = false;
        box.innerHTML = `<p><strong>${v.nome}</strong> · attributo chiave: <strong>${v.chiave.join(" o ")}</strong></p>
            <p>${v.copre}</p>
            <p class="wz-nota">Maestro (grado 3): ${maestro === "+2C" ? "−2 con Correzione" : "−3"} · paletti G3: ${v.palettiG3}</p>`;
    }

    // ───────── gou (passo 3) ─────────
    // etichetta di un Gou nella tendina: nome + costo + la tagline (per orientarsi mentre si sceglie)
    const etichettaGou = (g, conRequisito) =>
        `${g.nome} · ${g.costo} Ki — ${g.tagline}` +
        (conRequisito && g.requisito ? ` (richiede ${g.requisito.attributo} ${g.requisito.minimo}+)` : "");
    function initGou() {
        const sel = document.getElementById("pg-gou-sel");
        const perAttr = {};
        BIB.gou.forEach(g => { const k = g.attributi.join(" o "); (perAttr[k] = perAttr[k] || []).push(g); });
        sel.innerHTML = `<option value="">— scegli —</option>` + Object.entries(perAttr).map(([a, voci]) =>
            `<optgroup label="${a}">` + voci.map(v =>
                `<option value="${v.id}">${etichettaGou(v)}</option>`).join("") + `</optgroup>`).join("");
        if (S.gouId) sel.value = S.gouId;
        sel.addEventListener("change", () => {
            const g = gouById(sel.value);
            if (g && !requisitoOk(g)) {
                alert(`${g.nome} richiede ${g.requisito.attributo} ad almeno ${g.requisito.minimo} (ora: ${attributi()[g.requisito.attributo]}).`);
                sel.value = S.gouId || "";
                return;
            }
            S.gouId = sel.value;
            mostraGouInfo(sel.value);
            salvaDebounce();
        });
        mostraGouInfo(sel.value);
        aggiornaGouRequisiti();
    }
    const requisitoOk = (g) => !g.requisito || (attributi()[g.requisito.attributo] || 4) >= g.requisito.minimo;
    function aggiornaGouRequisiti() {
        const sel = document.getElementById("pg-gou-sel");
        if (!sel) return;
        [...sel.options].forEach(o => {
            const g = gouById(o.value);
            if (!g) return;
            const ok = requisitoOk(g);
            o.disabled = !ok;
            o.textContent = etichettaGou(g, !ok);
        });
    }
    function mostraGouInfo(id) {
        const box = document.getElementById("pg-gou-info");
        const g = gouById(id);
        if (!g) { box.hidden = true; return; }
        box.hidden = false;
        box.innerHTML = `<p><em>${g.tagline}</em></p>
            <p><strong>${g.nome} ${g.kanji}</strong> · ${g.attributi.join(" o ")} · costo <strong>${g.costo} Ki</strong>${g.famiglia ? ` · ${g.famiglia}` : ""}</p>
            <p>✔ <strong>Successo</strong>: ${g.successo}<br>✖ <strong>Fallimento</strong>: ${g.fallimento}</p>
            ${g.vincolo ? `<p class="wz-nota">Vincolo: ${g.vincolo}</p>` : ""}
            ${g.requisito ? `<p class="wz-nota">Requisito: ${g.requisito.attributo} ≥ ${g.requisito.minimo}</p>` : ""}`;
    }

    // ───────── ki (passo 4) ─────────
    const d6 = () => 1 + Math.floor(Math.random() * 6);
    const attrMin = () => Math.min(...ATTR.map(a => attributi()[a]));
    const kiMax = () => {
        const k = S.ki || {};
        if (!Array.isArray(k.dadi)) return null;
        return Math.min(12, attrMin() + Math.max(...k.dadi) + (k.extra || 0));
    };
    const attesa = (ms) => new Promise(r => setTimeout(r, ms));
    const motionOk = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function aggiornaKi() {
        const k = S.ki || (S.ki = { dadi: null, ritirato: false, extra: 0 });
        document.getElementById("pg-ki-minattr").textContent = attrMin();
        const msg = document.getElementById("pg-ki-msg");
        if (Array.isArray(k.dadi)) {
            const alto = Math.max(...k.dadi);
            msg.textContent = `Hai tirato ${k.dadi.join(" e ")} — conta il più alto: ${alto}. ${attrMin()} + ${alto}${k.extra ? ` + ${k.extra} comprati` : ""} = ${kiMax()}.`;
            document.getElementById("pg-ki-max").textContent = kiMax();
            document.getElementById("pg-ki-tira").hidden = true;
            document.getElementById("pg-ki-nuovocaso").hidden = false;
        } else {
            msg.textContent = "";
            document.getElementById("pg-ki-max").textContent = "—";
            document.getElementById("pg-ki-tira").hidden = false;
            document.getElementById("pg-ki-nuovocaso").hidden = true;
        }
    }
    // Tiro del Ki. REGOLA: l'1 si ritira SEMPRE — anche se esce più volte di fila.
    async function tiraKi() {
        const msg = document.getElementById("pg-ki-msg");
        const btnT = document.getElementById("pg-ki-tira"), btnN = document.getElementById("pg-ki-nuovocaso");
        btnT.disabled = btnN.disabled = true;
        try {
            let dadi = [d6(), d6()];
            msg.textContent = `Hai tirato ${dadi.join(" e ")}…`;
            while (dadi.includes(1)) {
                await attesa(motionOk() ? 850 : 150);
                msg.textContent = `Hai tirato ${dadi.join(" e ")} — è uscito un 1: si ritira sempre!`;
                await attesa(motionOk() ? 900 : 150);
                dadi = dadi.map(v => v === 1 ? d6() : v);
                msg.textContent = `Ritirato: ora ${dadi.join(" e ")}…`;
            }
            await attesa(motionOk() ? 500 : 0);
            S.ki = { dadi, ritirato: true, extra: (S.ki && S.ki.extra) || 0 };
            aggiornaKi(); salvaDebounce();
        } finally { btnT.disabled = btnN.disabled = false; }
    }
    function initKi() {
        document.getElementById("pg-ki-tira").addEventListener("click", tiraKi);
        document.getElementById("pg-ki-nuovocaso").addEventListener("click", () => {
            if (!confirm("Ritirare i dadi del Ki? Si fa a inizio di un nuovo caso (o quando lo chiede il GM).")) return;
            tiraKi();
        });
    }

    // ───────── ✨ aiuti AI per campo ─────────
    function initAiCampi() {
        document.querySelectorAll(".pg-ai").forEach(btn => {
            btn.hidden = !PG.aiAttiva;
            // il bottone sta A FIANCO del campo (non nella label: disallineava le colonne)
            const campoEl = document.querySelector(`[data-pg-campo="${btn.dataset.pgDest}"]`);
            if (campoEl && campoEl.parentNode && !campoEl.parentNode.classList.contains("pg-campo-ai")) {
                const wrap = document.createElement("span");
                wrap.className = "pg-campo-ai";
                campoEl.parentNode.insertBefore(wrap, campoEl);
                wrap.appendChild(campoEl);
                wrap.appendChild(btn);
            }
            btn.addEventListener("click", async () => {
                const campo = btn.dataset.pgAi, dest = btn.dataset.pgDest;
                const orig = btn.textContent;
                btn.disabled = true; btn.textContent = "…";
                try {
                    await salvaOra(); // l'AI legge lo stato dal server: prima allinealo
                    const r = await fetch(`/api/pg/${PG.id}/ai-campo`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ campo, modello: modelloAI(), effort: effortAI() })
                    });
                    const json = await r.json().catch(() => ({}));
                    if (!r.ok) { alert("AI: " + (json.detail || json.errore || r.status)); return; }
                    const val = (json.testo || "").trim();
                    if (!val) { alert("L'AI non ha restituito nulla — riprova."); return; } // mai svuotare
                    const el = document.querySelector(`[data-pg-campo="${dest}"]`);
                    if (el) { el.value = val; }
                    set(dest, val);
                } catch { alert("AI non raggiungibile"); }
                finally { btn.disabled = false; btn.textContent = orig; }
            });
        });
    }

    // ───────── ritratto 🎨 (passo 5) ─────────
    function mostraRitratto() {
        const img = document.getElementById("pg-ritratto-img");
        if (S.ritratto) { img.src = S.ritratto; img.hidden = false; }
        else img.hidden = true;
    }
    function initRitratto() {
        const btn = document.getElementById("pg-ritratto-genera");
        const msg = document.getElementById("pg-ritratto-msg");
        if (!PG.immaginiAttive) btn.disabled = true;
        btn.addEventListener("click", async () => {
            const desc = (get("descrizioneFisica") || "").trim();
            if (!desc) { msg.textContent = "⚠ Scrivi (o genera con ✨) prima la descrizione fisica."; return; }
            const genere = get("identita.genere") === "f" ? "donna" : "uomo";
            const prompt = `Foto ritratto realistica, mezzo busto, Giappone 1997. ${genere} di ${get("identita.eta") || 35} anni, investigatore di polizia in borghese. ${desc} Luce naturale, grana pellicola anni '90, sfondo neutro. Nessuna scritta.`;
            const orig = btn.textContent;
            btn.disabled = true; btn.textContent = "🎨 Sto disegnando… (20-40s)"; msg.textContent = "";
            try {
                const r = await fetch(`/api/pg/${PG.id}/immagine`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt, tipo: "ritratto" })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { msg.textContent = "⚠ " + (json.detail || json.errore || r.status); return; }
                S.ritratto = json.url;
                mostraRitratto(); salvaDebounce();
            } catch { msg.textContent = "⚠ generazione fallita"; }
            finally { btn.disabled = false; btn.textContent = orig; }
        });
        mostraRitratto();
    }

    // ───────── enja (passo 7) — lista (l'Enja base + quelli comprati con lo Shugyō) ─────────
    const listaEnja = () => { if (!Array.isArray(S.enja)) S.enja = [typeof S.enja === "string" ? S.enja : ""]; if (!S.enja.length) S.enja = [""]; return S.enja; };
    function renderEnja() {
        const box = document.getElementById("pg-enja-lista");
        const enja = listaEnja();
        box.innerHTML = enja.map((e, i) => `
            <div class="wz-campo"><label>${i === 0 ? "Il tuo Enja" : "Enja aggiuntivo " + (i + 1)}</label>
                <span class="pg-campo-ai"><textarea rows="5" data-enja-i="${i}" placeholder="Chi è · Relazione · Cosa può fare · Cosa vuole in cambio · Come contattarlo · Limite">${(e || "").replace(/</g, "&lt;")}</textarea><button type="button" class="wz-btn wz-mini pg-ai-enja" data-i="${i}" ${PG.aiAttiva ? "" : "hidden"}>✨</button></span></div>`).join("");
        box.querySelectorAll("[data-enja-i]").forEach(t => t.addEventListener("input", () => { listaEnja()[+t.dataset.enjaI] = t.value; salvaDebounce(); }));
        box.querySelectorAll(".pg-ai-enja").forEach(b => b.addEventListener("click", async () => {
            const i = +b.dataset.i; const orig = b.textContent;
            b.disabled = true; b.textContent = "…";
            try {
                await salvaOra();
                const r = await fetch(`/api/pg/${PG.id}/ai-campo`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ campo: "enja", modello: modelloAI(), effort: effortAI() })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { alert("AI: " + (json.detail || json.errore || r.status)); return; }
                const val = (json.testo || "").trim();
                if (!val) { alert("L'AI non ha restituito nulla — riprova."); return; }
                listaEnja()[i] = val; renderEnja(); salvaDebounce();
            } catch { alert("AI non raggiungibile"); }
            finally { b.disabled = false; b.textContent = orig; }
        }));
    }

    // ───────── rapporti squadra + scene 🎨 (passo 9) ─────────
    const listaRapporti = () => { if (!Array.isArray(S.rapporti)) S.rapporti = []; return S.rapporti; };
    function renderRapporti() {
        const box = document.getElementById("pg-rapporti");
        const rr = listaRapporti();
        box.innerHTML = rr.length === 0 ? `<p class="wz-nota">Nessun compagno inserito (puoi farlo dopo).</p>` :
            rr.map((r, i) => `
            <div class="pg-rapporto">
                <input type="text" class="wz-medio" data-rap-nome="${i}" placeholder="Nome del compagno" value="${(r.nome || "").replace(/"/g, "&quot;")}" />
                <input type="text" data-rap-testo="${i}" placeholder="Il vostro rapporto (rispetto, attrito, debito…)" value="${(r.testo || "").replace(/"/g, "&quot;")}" />
                <button type="button" class="wz-btn wz-mini pg-ai-rap" data-i="${i}" ${PG.aiAttiva ? "" : "hidden"}>✨</button>
                <button type="button" class="wz-btn-x" data-rap-del="${i}" title="Togli">✕</button>
            </div>`).join("");
        box.querySelectorAll("[data-rap-nome]").forEach(el => el.addEventListener("input", () => { listaRapporti()[+el.dataset.rapNome].nome = el.value; salvaDebounce(); }));
        box.querySelectorAll("[data-rap-testo]").forEach(el => el.addEventListener("input", () => { listaRapporti()[+el.dataset.rapTesto].testo = el.value; salvaDebounce(); }));
        box.querySelectorAll("[data-rap-del]").forEach(b => b.addEventListener("click", () => { listaRapporti().splice(+b.dataset.rapDel, 1); renderRapporti(); salvaDebounce(); }));
        box.querySelectorAll(".pg-ai-rap").forEach(b => b.addEventListener("click", async () => {
            const i = +b.dataset.i; const nome = (listaRapporti()[i].nome || "").trim();
            if (!nome) { alert("Scrivi prima il nome del compagno."); return; }
            const orig = b.textContent; b.disabled = true; b.textContent = "…";
            try {
                await salvaOra();
                const r = await fetch(`/api/pg/${PG.id}/ai-campo`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ campo: "rapporti", indicazioni: "Proponi il rapporto con il compagno di squadra: " + nome, modello: modelloAI(), effort: effortAI() })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { alert("AI: " + (json.detail || json.errore || r.status)); return; }
                const val = (json.testo || "").trim();
                if (!val) { alert("L'AI non ha restituito nulla — riprova."); return; }
                listaRapporti()[i].testo = val; renderRapporti(); salvaDebounce();
            } catch { alert("AI non raggiungibile"); }
            finally { b.disabled = false; b.textContent = orig; }
        }));
    }
    const listaScene = () => { if (!Array.isArray(S.scene)) S.scene = []; return S.scene; };
    function renderScene() {
        const box = document.getElementById("pg-scene-galleria");
        box.innerHTML = listaScene().map((u, i) =>
            `<span class="pg-scena"><img src="${u}" alt="" /><button type="button" class="wz-btn-x" data-scena-del="${i}" title="Togli">✕</button></span>`).join("");
        box.querySelectorAll("[data-scena-del]").forEach(b => b.addEventListener("click", () => { listaScene().splice(+b.dataset.scenaDel, 1); renderScene(); salvaDebounce(); }));
    }
    function initScene() {
        document.getElementById("pg-rapporto-agg").addEventListener("click", () => { listaRapporti().push({ nome: "", testo: "" }); renderRapporti(); salvaDebounce(); });
        const btn = document.getElementById("pg-scena-genera");
        const msg = document.getElementById("pg-scena-msg");
        if (!PG.immaginiAttive) btn.disabled = true;
        btn.addEventListener("click", async () => {
            const testo = document.getElementById("pg-scena-testo").value.trim();
            if (!testo) { msg.textContent = "⚠ Descrivi prima la scena."; return; }
            const desc = (get("descrizioneFisica") || "").trim();
            const prompt = `${testo}. Fotografia realistica, Giappone 1997, atmosfera noir, grana pellicola anni '90. ${desc ? "Il protagonista: " + desc : ""} Nessuna scritta.`;
            const orig = btn.textContent;
            btn.disabled = true; btn.textContent = "🎨 Sto disegnando… (20-40s)"; msg.textContent = "";
            try {
                const r = await fetch(`/api/pg/${PG.id}/immagine`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt, tipo: "scena" })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { msg.textContent = "⚠ " + (json.detail || json.errore || r.status); return; }
                listaScene().push(json.url);
                renderScene(); salvaDebounce();
            } catch { msg.textContent = "⚠ generazione fallita"; }
            finally { btn.disabled = false; btn.textContent = orig; }
        });
        renderRapporti(); renderScene();
    }

    // ───────── riepilogo (passo 10) ─────────
    function renderRiepilogo() {
        const at = attributi();
        const gou = gouById(S.gouId);
        const box = document.getElementById("pg-riepilogo");
        const senmonRighe = listaSenmon().map(s => {
            const v = senmonById(s.id) || { nome: s.id, chiave: [] };
            return `<li><strong>${v.nome}</strong> — grado ${s.grado} (−${s.grado === 3 ? (v.maestroEccezione === "+2C" || (BIB.famiglie.find(f => f.id === v.famiglia) || {}).maestro === "+2C" ? "2 con Correzione" : "3") : s.grado})${s.diBase ? " · d'accademia" : ""} · usi ${s.usi || 0}</li>`;
        }).join("");
        box.innerHTML = `
            <p><strong>${nomePieno() || "(senza nome)"} ${get("identita.kanji") || ""}</strong> · ${get("identita.eta") || "?"} anni · ${get("identita.ruolo") || ""} ${get("identita.grado") ? "· " + get("identita.grado") : ""}</p>
            ${S.ritratto ? `<img src="${S.ritratto}" alt="" class="pg-riep-ritratto" />` : ""}
            <p>${ATTR.map(a => `${a} <strong>${at[a]}</strong>`).join(" · ")}</p>
            <p>Ki massimo: <strong>${kiMax() ?? "— (tira i dadi al passo 6)"}</strong> · Genkai a Ki ≤ 3</p>
            <p>Gou: <strong>${gou ? `${gou.nome} ${gou.kanji} (${gou.attributi.join(" o ")}, ${gou.costo} Ki${S.shugyo && S.shugyo.gouAffinato ? " → affinato: " + (gou.costo - 1) + " Ki" : ""})` : "— (scegli al passo 5)"}</strong></p>
            <ul>${senmonRighe}</ul>
            ${(get("kage.problema") || "").trim() ? "" : `<p class="wz-nota">⚠ Manca il Kage (passo 8)</p>`}
            ${(listaEnja()[0] || "").trim() ? "" : `<p class="wz-nota">⚠ Manca l'Enja (passo 9)</p>`}`;
    }

    // ───────── shugyō (passo 10) ─────────
    const shu = () => { if (!S.shugyo || typeof S.shugyo !== "object") S.shugyo = { punti: 0, log: [], gouAffinato: false }; if (!Array.isArray(S.shugyo.log)) S.shugyo.log = []; return S.shugyo; };
    const shuSpesi = () => shu().log.reduce((n, e) => n + (e.costo || 0), 0);
    const shuRimasti = () => (shu().punti || 0) - shuSpesi();
    function shuCompra(cosa, costo, applica) {
        if (costo > shuRimasti()) { alert(`Servono ${costo} punti, ne hai ${shuRimasti()}.`); return; }
        applica();
        shu().log.push({ quando: new Date().toISOString(), cosa, costo });
        renderShugyo(); renderRiepilogo(); salvaDebounce();
    }
    function renderShugyo() {
        document.getElementById("pg-shu-spesi").textContent = shuSpesi();
        document.getElementById("pg-shu-rimasti").textContent = shuRimasti();
        const at = attributi();
        const box = document.getElementById("pg-shu-acquisti");

        // senmon possedute (per migliorie) e non possedute (per l'acquisto nuova)
        const mie = listaSenmon();
        const nonMie = BIB.senmon.filter(v => !mie.some(m => m.id === v.id));
        const migliorabili = mie.filter(m => m.grado < 3);

        box.innerHTML = `
            <div class="pg-shu-riga"><span><strong>Attributo +1</strong> <small>(costo = nuovo valore × 3 · tetto 9)</small></span>
                <span><select id="shu-attr">${ATTR.map(a => `<option value="${a}" ${at[a] >= 9 ? "disabled" : ""}>${a} ${at[a]}→${at[a] + 1} (${(at[a] + 1) * 3} punti)</option>`).join("")}</select>
                <button type="button" class="wz-btn wz-mini" id="shu-attr-btn">Compra</button></span></div>

            <div class="pg-shu-riga"><span><strong>Ki massimo +1</strong> <small>(costo = nuovo massimo × 4 · tetto 12)</small></span>
                <span>${kiMax() == null ? `<em>prima tira i dadi del Ki (passo 6)</em>` :
                    kiMax() >= 12 ? `<em>già al tetto (12)</em>` :
                    `${kiMax()}→${kiMax() + 1} (${(kiMax() + 1) * 4} punti) <button type="button" class="wz-btn wz-mini" id="shu-ki-btn">Compra</button>`}</span></div>

            <div class="pg-shu-riga"><span><strong>Nuova Senmon (grado 1)</strong> <small>(9 punti · max UNA nuova per intervallo tra i casi)</small></span>
                <span><select id="shu-sen-nuova"><option value="">—</option>${nonMie.map(v => `<option value="${v.id}">${v.nome}</option>`).join("")}</select>
                <button type="button" class="wz-btn wz-mini" id="shu-sen-nuova-btn">Compra (9)</button></span></div>

            <div class="pg-shu-riga"><span><strong>Migliora Senmon</strong> <small>(G2: 19 punti, attributo chiave ≥6 + 10 usi · G3: 39 punti, paletti + 25 usi)</small></span>
                <span><select id="shu-sen-up">${migliorabili.length ? migliorabili.map(m => { const v = senmonById(m.id) || { nome: m.id }; return `<option value="${m.id}">${v.nome} G${m.grado}→G${m.grado + 1} (${m.grado === 1 ? 19 : 39} punti)</option>`; }).join("") : `<option value="">—</option>`}</select>
                <button type="button" class="wz-btn wz-mini" id="shu-sen-up-btn">Compra</button></span></div>

            <div class="pg-shu-riga"><span><strong>Usi delle Senmon</strong> <small>(le tacche: un uso = un'occasione reale validata dal GM)</small></span>
                <span>${mie.map(m => { const v = senmonById(m.id) || { nome: m.id }; return `${v.nome}: <input type="number" min="0" max="99" class="pg-usi" data-usi="${m.id}" value="${m.usi || 0}" />`; }).join(" · ")}</span></div>

            <div class="pg-shu-riga"><span><strong>Enja aggiuntivo</strong> <small>(12 punti — la relazione va prima costruita in gioco)</small></span>
                <span><button type="button" class="wz-btn wz-mini" id="shu-enja-btn">Compra (12)</button></span></div>

            <div class="pg-shu-riga"><span><strong>Affina il Gou</strong> <small>(−1 al costo, una sola volta · costo = costo attuale × 11)</small></span>
                <span>${!S.gouId ? `<em>prima scegli il Gou</em>` : shu().gouAffinato ? `<em>già affinato</em>` :
                    (() => { const g = gouById(S.gouId); return g ? `${g.costo}→${g.costo - 1} Ki (${g.costo * 11} punti) <button type="button" class="wz-btn wz-mini" id="shu-gou-btn">Compra</button>` : ""; })()}</span></div>`;

        // wiring
        document.getElementById("shu-attr-btn")?.addEventListener("click", () => {
            const a = document.getElementById("shu-attr").value;
            if (at[a] >= 9) { alert("Attributo già al massimo (9)."); return; }
            shuCompra(`${a} ${at[a]}→${at[a] + 1}`, (at[a] + 1) * 3, () => { at[a] += 1; aggiornaGouRequisiti(); });
        });
        document.getElementById("shu-ki-btn")?.addEventListener("click", () => {
            const nuovo = kiMax() + 1;
            shuCompra(`Ki massimo ${kiMax()}→${nuovo}`, nuovo * 4, () => { S.ki.extra = (S.ki.extra || 0) + 1; });
        });
        document.getElementById("shu-sen-nuova-btn")?.addEventListener("click", () => {
            const id = document.getElementById("shu-sen-nuova").value;
            if (!id) return;
            const v = senmonById(id);
            shuCompra(`Nuova Senmon: ${v.nome} (G1)`, 9, () => { listaSenmon().push({ id, grado: 1, usi: 0 }); });
        });
        document.getElementById("shu-sen-up-btn")?.addEventListener("click", () => {
            const id = document.getElementById("shu-sen-up").value;
            const m = listaSenmon().find(x => x.id === id);
            if (!m) return;
            const v = senmonById(id) || { nome: id, chiave: [] };
            if (m.grado === 1) {
                const okAttr = (v.chiave || []).some(c => (at[c] || 0) >= 6);
                if (!okAttr) { alert(`Per il grado 2 serve l'attributo chiave (${(v.chiave || []).join(" o ")}) ad almeno 6.`); return; }
                if ((m.usi || 0) < 10) { alert(`Per il grado 2 servono almeno 10 usi (ne hai ${m.usi || 0}).`); return; }
                shuCompra(`${v.nome} G1→G2`, 19, () => { m.grado = 2; });
            } else if (m.grado === 2) {
                if ((m.usi || 0) < 25) { alert(`Per il grado 3 servono almeno 25 usi (ne hai ${m.usi || 0}).`); return; }
                if (!confirm(`Paletti del grado 3 per ${v.nome}: ${v.palettiG3 || "vedi manuale"}.\nLi rispetti? (li valida il GM)`)) return;
                shuCompra(`${v.nome} G2→G3`, 39, () => { m.grado = 3; });
            }
        });
        document.getElementById("shu-enja-btn")?.addEventListener("click", () => {
            shuCompra("Enja aggiuntivo", 12, () => { listaEnja().push(""); renderEnja(); });
        });
        document.getElementById("shu-gou-btn")?.addEventListener("click", () => {
            const g = gouById(S.gouId);
            shuCompra(`Gou affinato: ${g.nome} ${g.costo}→${g.costo - 1} Ki`, g.costo * 11, () => { shu().gouAffinato = true; });
        });
        box.querySelectorAll(".pg-usi").forEach(inp => inp.addEventListener("input", () => {
            const m = listaSenmon().find(x => x.id === inp.dataset.usi);
            if (m) { m.usi = Math.max(0, +inp.value || 0); salvaDebounce(); }
        }));

        // log
        const logBox = document.getElementById("pg-shu-log");
        const log = shu().log;
        logBox.innerHTML = log.length === 0 ? "<em>Nessun acquisto ancora.</em>" :
            log.map((e, i) => {
                let q = ""; try { q = new Date(e.quando).toLocaleDateString("it-IT"); } catch { }
                return `<div class="pg-shu-riga"><span>${q} — ${e.cosa}</span><span>${e.costo} punti <button type="button" class="wz-btn-x" data-shu-del="${i}" title="Annulla (solo la riga del registro: sistemare la scheda a mano se serve)">✕</button></span></div>`;
            }).join("");
        logBox.querySelectorAll("[data-shu-del]").forEach(b => b.addEventListener("click", () => {
            if (!confirm("Togliere questa riga dal registro? I punti tornano disponibili, ma la scheda NON viene ripristinata da sola.")) return;
            shu().log.splice(+b.dataset.shuDel, 1);
            renderShugyo(); salvaDebounce();
        }));
    }

    // punti shugyo input live
    function initShugyoInput() {
        document.querySelectorAll("[data-pg-campo='shugyo.punti']").forEach(el =>
            el.addEventListener("input", () => renderShugyo()));
    }

    // ───────── identità: grado e quartiere (select + ✏️ Altro), kanji automatici ─────────
    function selectConAltro(selId, liberoId, path, opzioni) {
        const sel = document.getElementById(selId), lib = document.getElementById(liberoId);
        if (!sel) return;
        if (opzioni) sel.innerHTML = `<option value="">— scegli —</option>` +
            opzioni.map(o => `<option value="${o.value}">${o.testo}</option>`).join("") +
            `<option value="__custom">✏️ Altro — lo scrivo io</option>`;
        // stato attuale: se combacia con un'opzione la seleziono, altrimenti è "Altro"
        const val = get(path) || "";
        if (val && [...sel.options].some(o => o.value === val)) sel.value = val;
        else if (val) { sel.value = "__custom"; lib.hidden = false; lib.value = val; }
        sel.addEventListener("change", () => {
            if (sel.value === "__custom") { lib.hidden = false; lib.focus(); set(path, lib.value); }
            else { lib.hidden = true; set(path, sel.value); }
        });
        lib.addEventListener("input", () => set(path, lib.value));
    }
    function initIdentita() {
        selectConAltro("pg-grado-sel", "pg-grado-libero", "identita.grado", null); // opzioni già nell'HTML
        selectConAltro("pg-ruolo-sel", "pg-ruolo-libero", "identita.ruolo", null);
        selectConAltro("pg-quartiere-sel", "pg-quartiere-libero", "identita.quartiere",
            BIB.quartieri.map(q => ({ value: q.nome, testo: `${q.nome} — ${q.carattere || ""}` })));
        // ✨ residenza e contatti: l'AI riempie SOLO i campi vuoti
        const btnRes = document.getElementById("pg-residenza-ai");
        if (btnRes) {
            btnRes.hidden = !PG.aiAttiva;
            btnRes.addEventListener("click", async () => {
                const orig = btnRes.textContent;
                btnRes.disabled = true; btnRes.textContent = "…";
                try {
                    await salvaOra();
                    const r = await fetch(`/api/pg/${PG.id}/ai-campo`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ campo: "residenza", modello: modelloAI(), effort: effortAI() })
                    });
                    const json = await r.json().catch(() => ({}));
                    if (!r.ok) { alert("AI: " + (json.detail || json.errore || r.status)); return; }
                    const t = json.testo || "";
                    let dati = {};
                    try { dati = JSON.parse(t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1)); } catch { }
                    if (!Object.keys(dati).length) { alert("Non sono riuscito a leggere la proposta — riprova."); return; }
                    // riempi SOLO i vuoti, mai sovrascrivere
                    const campi = { quartiere: "identita.quartiere", via: "identita.via", telefono: "identita.telefono", pocketBell: "identita.pocketBell", altroContatto: "identita.altroContatto" };
                    for (const [k, path] of Object.entries(campi)) {
                        if (!dati[k] || (get(path) || "").trim()) continue;
                        set(path, dati[k]);
                        const el = document.querySelector(`[data-pg-campo="${path}"]`);
                        if (el) el.value = dati[k];
                    }
                    // il quartiere ha il select+Altro: allinealo
                    const selQ = document.getElementById("pg-quartiere-sel"), libQ = document.getElementById("pg-quartiere-libero");
                    const q = get("identita.quartiere") || "";
                    if (q && selQ) {
                        if ([...selQ.options].some(o => o.value === q)) { selQ.value = q; libQ.hidden = true; }
                        else { selQ.value = "__custom"; libQ.hidden = false; libQ.value = q; }
                    }
                } catch { alert("AI non raggiungibile"); }
                finally { btnRes.disabled = false; btnRes.textContent = orig; }
            });
        }
        // kanji automatici: quando scrivi cognome+nome (e il campo kanji è vuoto) arrivano dal generatore
        const cog = document.querySelector('[data-pg-campo="identita.cognome"]');
        const nom = document.querySelector('[data-pg-campo="identita.nome"]');
        const kan = document.querySelector('[data-pg-campo="identita.kanji"]');
        let t = null;
        const prova = () => {
            clearTimeout(t);
            t = setTimeout(async () => {
                if (kan.value.trim()) return; // mai sovrascrivere kanji già scritti
                const c = cog.value.trim(), n = nom.value.trim();
                if (!c || !n) return;
                try {
                    const r = await fetch(`/api/nomi/verifica?cognome=${encodeURIComponent(c)}&nome=${encodeURIComponent(n)}`);
                    const j = await r.json();
                    if (j.kanji) { kan.value = j.kanji; set("identita.kanji", j.kanji); }
                } catch { }
            }, 700);
        };
        cog.addEventListener("input", prova);
        nom.addEventListener("input", prova);
    }

    // ───────── 🔮 nomi su misura (passo 0) ─────────
    function initNomi() {
        const btn = document.getElementById("pg-nomi-btn");
        const out = document.getElementById("pg-nomi-out");
        if (!btn) return;
        const scegli = (n) => {
            ["cognome", "nome", "kanji"].forEach(k => {
                const el = document.querySelector(`[data-pg-campo="identita.${k}"]`);
                if (el) el.value = n[k] || "";
                set("identita." + k, n[k] || "");
            });
            aggiornaTitolo();
            out.querySelectorAll(".pg-nome-card").forEach(c => c.classList.toggle("scelto", c.dataset.cognome === n.cognome && c.dataset.nome === n.nome));
        };
        const render = (nomi) => {
            out.innerHTML = nomi.map(n => `
                <button type="button" class="pg-nome-card" data-cognome="${(n.cognome || "").replace(/"/g, "&quot;")}" data-nome="${(n.nome || "").replace(/"/g, "&quot;")}">
                    <span class="pg-nome-n">${n.cognome || ""} ${n.nome || ""}</span>
                    <span class="pg-nome-k">${n.kanji || ""}</span>
                    ${n.significato ? `<span class="pg-nome-s">${n.significato}</span>` : ""}
                </button>`).join("") +
                `<p class="wz-nota">Tocca un nome per metterlo sulla scheda — oppure riprova con un'altra ispirazione.</p>`;
            out.querySelectorAll(".pg-nome-card").forEach((c, i) => c.addEventListener("click", () => scegli(nomi[i])));
        };
        btn.addEventListener("click", async () => {
            const orig = btn.textContent;
            btn.disabled = true; btn.textContent = "✨ Sto cercando il nome giusto…";
            out.innerHTML = "";
            try {
                const isp = document.getElementById("pg-nomi-ispirazione").value.trim();
                if (PG.aiAttiva) {
                    await salvaOra(); // l'AI legge età/genere dallo stato
                    const r = await fetch(`/api/pg/${PG.id}/ai-campo`, {
                        method: "POST", headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ campo: "nomi", indicazioni: isp || null, modello: modelloAI(), effort: effortAI() })
                    });
                    const json = await r.json().catch(() => ({}));
                    if (!r.ok) { alert("AI: " + (json.detail || json.errore || r.status)); return; }
                    // la risposta è un JSON (a volte con testo attorno): estrai il primo blocco { … }
                    const t = json.testo || "";
                    const blocco = t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1);
                    let nomi = [];
                    try { nomi = (JSON.parse(blocco).nomi || []); } catch { }
                    if (!nomi.length) { alert("Non sono riuscito a leggere le proposte — riprova."); return; }
                    render(nomi);
                } else {
                    // senza AI: il generatore offline (nomi coerenti con genere ed età, senza significato)
                    const q = new URLSearchParams({ genere: get("identita.genere") || "m", eta: get("identita.eta") || 30, quanti: 4 });
                    const r = await fetch(`/api/nomi?${q}`);
                    const nomi = await r.json();
                    render(nomi);
                }
            } catch { alert("Suggerimento nomi non riuscito — riprova."); }
            finally { btn.disabled = false; btn.textContent = orig; }
        });
    }

    // ───────── ↺ resetta: la scheda torna vuota (come un PG appena creato) ─────────
    // NB tenere allineato allo stato iniziale di Pages/Pg/Index.OnPostCrea
    const statoIniziale = () => ({
        versione: 1,
        identita: { cognome: "", nome: "", kanji: "", eta: 30, genere: "m", ruolo: "Investigatore", grado: "", anniServizio: 5, quartiere: "", via: "", telefono: "", pocketBell: "", altroContatto: "" },
        attributi: { "Distacco": 4, "Pazienza": 4, "Silenzio": 4, "Lucidità": 4, "Ascolto": 4, "Presenza": 4 },
        ki: { dadi: null, ritirato: false, extra: 0 },
        gouId: "",
        senmon: [{ id: "lotta", grado: 1, usi: 0, diBase: true }],
        descrizioneFisica: "", ritratto: "", chiSei: "",
        kage: { problema: "", png: "" },
        enja: [""],
        comportamento: { tatemae: "", honne: "", fraseTipica: "", sottoPressione: "", debolezza: "" },
        tratti: { vizio: "", tic: "", oggetto: "", gusto: "", liberoEtichetta: "Rituale", libero: "" },
        rapporti: [], scene: [],
        shugyo: { punti: 0, log: [], gouAffinato: false }
    });
    function initReset() {
        document.getElementById("pg-reset")?.addEventListener("click", async () => {
            if (!confirm("Ricominciare da ZERO?\nTutta la scheda (nome, attributi, Gou, testi, acquisti) verrà svuotata. Le immagini generate restano nei file ma spariscono dalla scheda.")) return;
            Object.keys(S).forEach(k => delete S[k]);
            Object.assign(S, statoIniziale());
            passoCorrente = 0;
            document.getElementById("pg-nome-testata").value = "Nuovo investigatore"; // anche il nome riparte
            await salvaOra();
            location.reload();
        });
    }

    // ───────── menù modello/ragionamento (condivisi col wizard-avventure) ─────────
    function initModelloAI() {
        const selM = document.getElementById("wz-modello-ai");
        const selE = document.getElementById("wz-effort-ai");
        if (!selM) return;
        if ([...selM.options].some(o => o.value === modelloAI())) selM.value = modelloAI();
        const off = () => { if (selE) selE.disabled = (selM.value === "claude-haiku-4-5"); };
        selM.addEventListener("change", () => { localStorage.setItem("wizModelAI", selM.value); off(); });
        if (selE) {
            if ([...selE.options].some(o => o.value === effortAI())) selE.value = effortAI();
            selE.addEventListener("change", () => localStorage.setItem("wizEffortAI", selE.value));
        }
        off();
    }

    // ───────── avvio ─────────
    (async function avvio() {
        await caricaBiblioteche();
        bindCampi();
        renderAttributi();
        initSenmon();
        initGou();
        initKi();
        initAiCampi();
        initIdentita();
        initNomi();
        initRitratto();
        renderEnja();
        initScene();
        initShugyoInput();
        initReset();
        initModelloAI();
        initNav();
        mostraPasso(passoCorrente);
    })();
})();
