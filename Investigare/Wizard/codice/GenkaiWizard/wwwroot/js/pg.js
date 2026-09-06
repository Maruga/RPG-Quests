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
    const PASSI = 13; // 0 = 🍵 il tè (sfondo e musica), poi 1-12
    let BIB = { gou: [], senmon: [], gradi: [], famiglie: [], quartieri: [] };

    // ── contatore quota AI: quanti aiuti restano oggi (✨ testi · 🎨 immagini) ──
    async function aggiornaQuota() {
        const el = document.getElementById("pg-quota");
        if (!el) return;
        try {
            const r = await fetch("/api/quota");
            if (!r.ok) return;
            const q = await r.json();
            el.textContent = `✨ ${q.testi} · 🎨 ${q.immagini}`;
            el.classList.toggle("errore", q.testi === 0 || q.immagini === 0); // rosso del tema quando un contatore è a 0
        } catch { /* rete assente: il contatore resta com'era */ }
    }
    // ogni chiamata AI (testo o immagine) rinfresca il contatore — un solo aggancio,
    // senza toccare i ~10 punti di chiamata sparsi nel file
    const _fetchOriginale = window.fetch.bind(window);
    window.fetch = function (url, opzioni) {
        const p = _fetchOriginale(url, opzioni);
        if (typeof url === "string" && (url.includes("/ai-campo") || url.includes("/immagine")))
            p.then(() => setTimeout(aggiornaQuota, 150), () => { });
        return p;
    };
    document.addEventListener("DOMContentLoaded", aggiornaQuota);

    // nei campi numerici (età, anni di servizio) niente lettere: il type=number lascia
    // passare e/E/+/-/./, — qui si bloccano, restano solo cifre e tasti di controllo
    document.querySelectorAll('input[type="number"]').forEach(inp =>
        inp.addEventListener("keydown", ev => { if (["e", "E", "+", "-", ".", ","].includes(ev.key)) ev.preventDefault(); }));

    // modello + ragionamento AI (stesse chiavi del wizard-avventure: scelta condivisa)
    const MODELLO_DEFAULT = "claude-opus-5";
    const modelloAI = () => localStorage.getItem("wizModelAI") || MODELLO_DEFAULT;
    const effortAI = () => localStorage.getItem("wizEffortAI") || "medium";   // scheda PG: default Medio (politica 2026-08-18)

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
            nome: document.getElementById("pg-nome-testata").value || null // = ALIAS (il nome del PG vive in identita)
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
            if (el.type === "checkbox") {
                // spunta «ce l'ha / non ce l'ha»: nello stato "si" oppure "" — un vecchio numero salvato vale sì
                el.checked = !!(val && String(val).trim());
                el.addEventListener("change", () => set(path, el.checked ? "si" : ""));
                return;
            }
            if (val != null) el.value = val;
            el.addEventListener("input", () => {
                // numerico svuotato = "" (non 0: un'età «0 anni» in stampa non ha senso)
                set(path, el.type === "number" ? (el.value === "" ? "" : +el.value) : el.value);
                if (path.startsWith("identita.")) aggiornaTitolo();
            });
        });
        const tit = document.getElementById("pg-nome-testata");
        tit.addEventListener("input", salvaDebounce);
    }
    function aggiornaTitolo() { /* la testata è l'ALIAS: non si sincronizza col nome del PG */ }

    // ───────── passi (client-side) ─────────
    let passoCorrente = Math.min(Math.max(PG.passo || 0, 0), PASSI - 1);
    function mostraPasso(n) {
        passoCorrente = Math.min(Math.max(n, 0), PASSI - 1);
        document.querySelectorAll("[data-pg-passo]").forEach(s => s.hidden = +s.dataset.pgPasso !== passoCorrente);
        document.querySelectorAll("[data-pg-vai]").forEach(a => a.classList.toggle("attivo", +a.dataset.pgVai === passoCorrente));
        document.getElementById("pg-indietro").disabled = passoCorrente === 0;
        document.getElementById("pg-avanti").textContent = passoCorrente === PASSI - 1 ? "Fine" : "Avanti ›";
        if (passoCorrente === 6) aggiornaKi();
        if (passoCorrente === 12) { renderRiepilogo(); if (window.PG.crescitaAttiva) renderShugyo(); }
        tipCasuale(); // 豆知識: una curiosità sul Giappone a ogni cambio di pagina
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
    // creazione: 4-8 (decisione utente 2026-08-28) — il 9 si raggiunge solo dopo, comprandolo
    // con lo Shugyō (che ha il suo tetto a 9)
    const PUNTI_ATTR = 9, ATTR_MIN = 4, ATTR_MAX_CREAZIONE = 8, ATTR_MAX = 9;
    const attributi = () => { if (!S.attributi) S.attributi = {}; ATTR.forEach(a => { if (typeof S.attributi[a] !== "number") S.attributi[a] = 4; }); return S.attributi; };
    const puntiUsati = () => ATTR.reduce((n, a) => n + (attributi()[a] - ATTR_MIN), 0);
    // dopo il primo acquisto «Attributo +1» con lo Shugyō la distribuzione di creazione è chiusa:
    // gli attributi si toccano solo dal passo 12 (niente ribassi senza rimborso punti)
    const attrCresciuti = () => shu().log.some(e => ATTR.some(a => (e.cosa || "").startsWith(a + " ")));
    function renderAttributi() {
        const box = document.getElementById("pg-attributi");
        const at = attributi();
        const bloccati = window.PG.crescitaAttiva && attrCresciuti(); // (come in cambiaAttr: a crescita spenta non si blocca nulla)
        box.innerHTML = ATTR.map(a => `
            <div class="pg-attr">
                <div class="pg-attr-testa"><strong>${a}</strong><small> — ${ATTR_DESC[a]}</small></div>
                <div class="pg-attr-ctrl">
                    <button type="button" class="wz-btn wz-mini" data-attr-meno="${a}" ${bloccati ? "disabled" : ""}>−</button>
                    <span class="pg-attr-val" id="pg-attr-${a}">${at[a]}</span>
                    <button type="button" class="wz-btn wz-mini" data-attr-piu="${a}" ${bloccati ? "disabled" : ""}>+</button>
                </div>
            </div>`).join("") +
            (bloccati ? `<p class="wz-nota">🔒 Hai già comprato attributi con lo Shugyō: la distribuzione di creazione è chiusa — da qui in poi crescono solo dal passo 12.</p>` : "");
        box.querySelectorAll("[data-attr-piu]").forEach(b => b.addEventListener("click", () => cambiaAttr(b.dataset.attrPiu, +1)));
        box.querySelectorAll("[data-attr-meno]").forEach(b => b.addEventListener("click", () => cambiaAttr(b.dataset.attrMeno, -1)));
        aggiornaContatoreAttr();
    }
    function cambiaAttr(a, d) {
        if (window.PG.crescitaAttiva && attrCresciuti()) return; // creazione chiusa: si cresce solo con lo Shugyō
        const at = attributi();
        const nuovo = at[a] + d;
        if (nuovo < ATTR_MIN || nuovo > ATTR_MAX_CREAZIONE) return; // in creazione il tetto è 8
        if (d > 0 && puntiUsati() >= PUNTI_ATTR) return; // punti finiti
        at[a] = nuovo;
        document.getElementById("pg-attr-" + a).textContent = nuovo;
        aggiornaContatoreAttr();
        aggiornaGouRequisiti(true);   // il Gou scelto potrebbe non essere più alla portata
        aggiornaSenmonRequisiti(true);
        aggiornaKi();
        salvaDebounce();
    }
    function aggiornaContatoreAttr() {
        // dopo acquisti Shugyō i valori superano il budget di creazione: il contatore non va sotto zero
        const resto = Math.max(0, PUNTI_ATTR - puntiUsati());
        const el = document.getElementById("pg-attr-rimasti");
        el.textContent = resto;
        el.parentElement.classList.toggle("pg-punti-zero", resto === 0);
    }

    // ───────── biblioteche (senmon + gou) ─────────
    async function caricaBiblioteche() {
        const [g, s, l, k, esp, tp] = await Promise.all([
            fetch("/api/biblioteca/gou").then(r => r.json()),
            fetch("/api/biblioteca/senmon").then(r => r.json()),
            fetch("/api/biblioteca/luoghi").then(r => r.json()).catch(() => ({})),
            fetch("/api/biblioteca/kage").then(r => r.json()).catch(() => ({})),
            fetch("/api/biblioteca/esperienza").then(r => r.json()).catch(() => ({})),
            fetch("/api/biblioteca/tips_giappone").then(r => r.json()).catch(() => ({}))
        ]);
        BIB.gou = g.gou || [];
        BIB.senmon = s.senmon || [];
        BIB.gradi = s.gradi || [];
        BIB.famiglie = s.famiglie || [];
        BIB.quartieri = l.quartieri || [];
        BIB.kage = k.kage || [];
        BIB.sfondi = esp.sfondi || [];
        BIB.musiche = esp.musiche || [];
        BIB.tips = tp.tips || [];
    }
    const gouById = (id) => BIB.gou.find(x => x.id === id);
    const senmonById = (id) => BIB.senmon.find(x => x.id === id);
    const nomeFamiglia = (id) => (BIB.famiglie.find(f => f.id === id) || {}).nome || id;

    // ───────── senmon (passo 4) ─────────
    const listaSenmon = () => { if (!Array.isArray(S.senmon)) S.senmon = [{ id: "lotta", grado: 1, usi: 0, diBase: true }]; return S.senmon; };
    const lottaBase = () => listaSenmon().find(x => x.id === "lotta");
    function initSenmon() {
        const sel = document.getElementById("pg-senmon-sel");
        const perFam = {};
        // le voci "nascoste" (regole superate, es. Lame e bastoni) restano leggibili sulle schede vecchie ma non si propongono più
        BIB.senmon.filter(x => x.id !== "lotta" && !x.nascosta).forEach(x => (perFam[x.famiglia] = perFam[x.famiglia] || []).push(x));
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
    // l'opzione "Lotta → grado 2" segue Presenza: si disabilita sotto 6. Come per il Gou:
    // «revoca» solo quando arriva da un cambio di attributo; all'apertura si avvisa e basta.
    const lotta2Ok = () => (attributi().Presenza || 4) >= 6;
    function aggiornaSenmonRequisiti(revoca) {
        const sel = document.getElementById("pg-senmon-sel");
        if (!sel) return;
        const opt = [...sel.options].find(o => o.value === "__lotta2");
        if (!opt) return;
        opt.disabled = !lotta2Ok();
        const lt = lottaBase();
        if (lotta2Ok() || !lt?.upCreazione) return;
        if (revoca) {
            lt.grado = 1; delete lt.upCreazione;
            sel.value = "";
            mostraSenmonInfo("");
            alert(`Lotta grado 2 richiede Presenza 6, e ora Presenza è ${attributi().Presenza}.

Lotta torna al grado 1: rialza Presenza e riscegli, oppure prendi una specializzazione al passo 4.`);
            salvaDebounce();
        } else {
            mostraSenmonInfo("__lotta2");   // ridisegna con l'avviso
        }
    }
    function mostraSenmonInfo(id) {
        const box = document.getElementById("pg-senmon-info");
        if (id === "__lotta2") {
            box.hidden = false;
            box.innerHTML = `<p><strong>Lotta — grado 2 (Esperto, −2)</strong> · attributo chiave: <strong>Presenza</strong></p>
                <p>Rinforzi l'addestramento d'accademia: pugni, prese e tecniche d'arresto a livello da istruttore. Il −2 vale sui tiri di combattimento pertinenti.</p>
                <p class="wz-nota">Al posto di una nuova specializzazione. Richiede Presenza ≥ 6. Maestro (grado 3): −2 con Correzione · paletti G3: Presenza 8.</p>
                ${lotta2Ok() ? "" : `<p class="pg-riep-avviso">⚠ Richiede Presenza 6: ora hai ${attributi().Presenza}. Rialzala al passo 3 (Attributi) o scegli una specializzazione.</p>`}`;
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

    // ───────── gou (passo 5) ─────────
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
    // «revoca» = arriva da un cambio di attributo: se il Gou scelto non è più alla portata
    // lo si toglie SUBITO dicendolo (come fa Lotta grado 2 con Presenza). All'apertura della
    // scheda invece non si tocca niente: si mostra solo l'avviso, così nessuno perde una scelta.
    function aggiornaGouRequisiti(revoca) {
        const sel = document.getElementById("pg-gou-sel");
        if (!sel) return;
        [...sel.options].forEach(o => {
            const g = gouById(o.value);
            if (!g) return;
            const ok = requisitoOk(g);
            o.disabled = !ok;
            o.textContent = etichettaGou(g, !ok);
        });
        const scelto = gouById(S.gouId);
        if (!scelto || requisitoOk(scelto)) return;
        const r = scelto.requisito, ora = attributi()[r.attributo];
        if (revoca) {
            S.gouId = ""; sel.value = ""; mostraGouInfo("");
            alert(`${scelto.nome} richiede ${r.attributo} ${r.minimo}, e ora ${r.attributo} è ${ora}.

Il Gou è stato tolto: rialza ${r.attributo} e riscegli, oppure prendine un altro al passo 5.`);
            salvaDebounce();
        } else {
            mostraGouInfo(S.gouId);   // ridisegna la scheda del Gou con l'avviso
        }
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
            ${g.requisito ? (requisitoOk(g)
                ? `<p class="wz-nota">Requisito: ${g.requisito.attributo} ≥ ${g.requisito.minimo}</p>`
                : `<p class="pg-riep-avviso">⚠ Richiede ${g.requisito.attributo} ${g.requisito.minimo}: ora hai ${attributi()[g.requisito.attributo]}. Rialzalo al passo 3 (Attributi) o scegli un altro Gou.</p>`) : ""}`;
    }

    // ───────── ki (passo 6) ─────────
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
            btn.title = (btn.title || "Proposta dell'AI") + " — consuma 1 aiuto ✨";
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

    // ───────── ✨ carattere in un colpo (passo 10) ─────────
    // legge tutta la scheda e riempie SOLO i campi vuoti; dei 5 tratti ne bastano 3
    function initCarattereAI() {
        const btn = document.getElementById("pg-carattere-ai");
        if (!btn) return;
        btn.hidden = !PG.aiAttiva;
        const CAMPI_C = ["tatemae", "honne", "fraseTipica", "sottoPressione", "debolezza"];
        const CAMPI_T = ["vizio", "tic", "oggetto", "gusto", "libero"];
        const ETICHETTE = ["Rituale", "Abitudine", "Superstizione", "Segreto", "Rifugio"];
        btn.addEventListener("click", async () => {
            const orig = btn.textContent;
            btn.disabled = true; btn.textContent = "✨ leggo la scheda…";
            try {
                const pieniC = CAMPI_C.filter(c => (get("comportamento." + c) || "").trim());
                const pieniT = CAMPI_T.filter(c => (get("tratti." + c) || "").trim());
                const daProporre = Math.max(0, 3 - pieniT.length);
                if (pieniC.length === CAMPI_C.length && daProporre === 0) { alert("È già tutto compilato: svuota un campo se vuoi una proposta nuova."); return; }
                const indicazioni = [
                    pieniC.length ? "Comportamento già scritto dal giocatore (NON proporre): " + pieniC.join(", ") + "." : "",
                    pieniT.length ? "Tratti già scritti (NON proporli, contano nel totale): " + pieniT.join(", ") + "." : "",
                    "Proponi al massimo " + daProporre + " tratti."
                ].filter(Boolean).join(" ");
                await salvaOra(); // l'AI legge lo stato dal server
                const r = await fetch(`/api/pg/${PG.id}/ai-campo`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ campo: "carattereTutto", indicazioni, modello: modelloAI(), effort: effortAI() })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { alert("AI: " + (json.detail || json.errore || r.status)); return; }
                const t2 = json.testo || "";
                let dati = {};
                try { dati = JSON.parse(t2.slice(t2.indexOf("{"), t2.lastIndexOf("}") + 1)); } catch { }
                if (!Object.keys(dati).length) { alert("Proposta illeggibile — riprova."); return; }
                const applica = (path, val) => {
                    if (!val || !String(val).trim() || (get(path) || "").trim()) return false;
                    set(path, String(val).trim());
                    const el = document.querySelector(`[data-pg-campo="${path}"]`);
                    if (el) el.value = String(val).trim();
                    return true;
                };
                CAMPI_C.forEach(c => applica("comportamento." + c, dati.comportamento && dati.comportamento[c]));
                // tratti: mai oltre il tetto, anche se l'AI esagera
                let nuovi = 0;
                for (const c of CAMPI_T) {
                    if (c === "libero" || nuovi >= daProporre) continue;
                    if (applica("tratti." + c, dati.tratti && dati.tratti[c])) nuovi++;
                }
                if (nuovi < daProporre && dati.tratti && applica("tratti.libero", dati.tratti.libero)) {
                    nuovi++;
                    const et = (dati.tratti.liberoEtichetta || "").trim();
                    if (ETICHETTE.includes(et)) {
                        set("tratti.liberoEtichetta", et);
                        const sel = document.querySelector('[data-pg-campo="tratti.liberoEtichetta"]');
                        if (sel) sel.value = et;
                    }
                }
                salvaDebounce();
            } catch { alert("AI non raggiungibile"); }
            finally { btn.disabled = false; btn.textContent = orig; }
        });
    }

    // ───────── ritratto 🎨 (passo 7) ─────────
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
            const genere = get("identita.genere") === "f" ? "donna" : get("identita.genere") === "m" ? "uomo" : "persona";
            // il ritratto è la faccia che il giocatore si porta al tavolo: deve essere un ritratto
            // DIGNITOSO, non una foto segnaletica. Abito, cura della persona, luce e nitidezza vanno
            // detti, altrimenti il modello sceglie da sé e viene fuori un uomo trasandato.
            const prompt = `Ritratto fotografico professionale, di alta qualità, quadrato: testa e spalle, di fronte, volto centrato, TESTA INTERA con spazio sopra i capelli — mai tagliare fronte o capelli. ${genere} giapponese di ${get("identita.eta") || 35} anni, detective della polizia di Kyoto in borghese, 1997: giacca scura, camicia bianca, cravatta sobria; persona curata, capelli in ordine, viso rasato di fresco. Espressione seria e composta, sguardo diretto nell'obiettivo, presenza dignitosa — non stanco, non trasandato, non minaccioso. ${desc} Luce morbida e uniforme, incarnato naturale, fuoco nitido sugli occhi, sfondo grigio-azzurro uniforme. Fotografia anni '90 ben esposta e pulita, grana finissima. SOLO testa e spalle: niente mani, niente guanti, niente oggetti in mano, niente scritte, niente distintivi.`;
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

    // ───────── enja (passo 9) — card come le persone del Kage, ma con En/conosciuti/cosa sa ─────────
    const enjaVuoto = () => ({ cognome: "", nome: "", eta: "", relazione: "", en: "", comeConosciuti: "", cosaSa: "", aspetto: "", carattere: "", comeParla: "", vuole: "", ritratto: "" });
    const listaEnja = () => {
        if (!Array.isArray(S.enja)) S.enja = [];
        // migrazione dal vecchio formato (testo libero): il testo finisce in «cosa può dare/sapere»
        S.enja = S.enja.map(x => {
            if (x && typeof x === "object") return x;
            const v = enjaVuoto(); const s = (x || "").toString().trim();
            if (s) v.cosaSa = s;
            return v;
        });
        if (!S.enja.length) S.enja = [enjaVuoto()];
        return S.enja;
    };
    // finché la scheda «estesa» è spenta se ne tiene UNO per ciascuno: il PG deve però poterlo creare
    const MAX_ENJA = window.PG.estesaAttiva ? 99 : 1;
    const MAX_KAGE_PERSONE = window.PG.estesaAttiva ? 99 : 1;
    function limiteLista(idBottone, idNota, quanti, massimo, testo) {
        const agg = document.getElementById(idBottone);
        if (!agg) return;
        agg.disabled = quanti >= massimo;
        const nota = document.getElementById(idNota);
        if (nota) nota.textContent = agg.disabled ? testo : "";
    }
    const enjaPieno = p => ["cognome", "nome", "relazione", "comeConosciuti", "cosaSa", "aspetto", "carattere", "comeParla", "vuole", "ritratto"].some(c => (p[c] || "").toString().trim() !== "") || p.en !== "" || p.eta !== "";
    function renderEnja() {
        const box = document.getElementById("pg-enja-lista");
        if (!box) return;
        const q = s => (s || "").toString().replace(/"/g, "&quot;");
        const esc = s => (s || "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;");
        const enja = listaEnja();
        limiteLista("pg-enja-agg", "pg-enja-nota", enja.length, MAX_ENJA, "Per ora l'Enja è uno solo.");
        box.innerHTML = enja.map((p, i) => `
            <div>
                <label class="wz-nota">${i === 0 ? "Il tuo Enja iniziale (di norma lo assegna il GM)" : "Enja " + (i + 1)}</label>
                <div class="pg-kage-card">
                    <div>
                        <div class="pg-kage-foto">${p.ritratto ? `<img src="${q(p.ritratto)}" alt="" />` : "👤"}</div>
                        ${statPngHtml("en", i, p)}
                    </div>
                    <div class="pg-kage-campi">
                        <label><span>Cognome</span><input type="text" data-en="${i}" data-en-c="cognome" placeholder="es. Kubo" value="${q(p.cognome)}" /></label>
                        <label><span>Nome</span><input type="text" data-en="${i}" data-en-c="nome" placeholder="es. Takeshi" value="${q(p.nome)}" /></label>
                        <label><span>Chi è per te</span><input type="text" data-en="${i}" data-en-c="relazione" placeholder="es. compagno di liceo, ora giornalista" value="${q(p.relazione)}" /></label>
                        <span class="pg-enja-en">
                            <label><span>Età</span><input type="number" data-en="${i}" data-en-c="eta" placeholder="es. 41" min="1" max="99" value="${q(p.eta)}" /></label>
                            <label><span>縁 En <small>— verso di te</small></span><input type="number" data-en="${i}" data-en-c="en" placeholder="+1" min="-5" max="5" value="${q(p.en)}" /></label>
                        </span>
                        <label class="pg-kage-largo"><span>Come vi siete conosciuti</span><input type="text" data-en="${i}" data-en-c="comeConosciuti" placeholder="es. stesso club di baseball al liceo; suo fratello era nella tua classe" value="${q(p.comeConosciuti)}" /></label>
                        <label class="pg-kage-largo"><span>Cosa può dare o sapere <small>— e cosa NON può</small></span><textarea rows="3" data-en="${i}" data-en-c="cosaSa" placeholder="es. gli archivi del giornale e le voci di redazione. Non tocca le fonti riservate: quelle se le tiene">${esc(p.cosaSa)}</textarea></label>
                        <label class="pg-kage-largo"><span>Aspetto <small>— serve anche per il ritratto</small></span><textarea rows="4" data-en="${i}" data-en-c="aspetto" placeholder="es. spalle larghe, giacca sgualcita, sigaretta spenta in bocca; parla con gli occhiali in mano">${esc(p.aspetto)}</textarea></label>
                        <label class="pg-kage-largo"><span>Com’è fatto <small>— come si comporta, che tono ha</small></span><textarea rows="3" data-en="${i}" data-en-c="carattere" placeholder="es. cordiale e sbrigativo: ti dà del tu davanti a tutti, ma non promette mai niente per iscritto">${esc(p.carattere)}</textarea></label>
                        <label class="pg-kage-largo"><span>Come parla <small>— due o tre frasi sue, da leggere al tavolo</small></span><textarea rows="3" data-en="${i}" data-en-c="comeParla" placeholder="es. «Te lo dico da amico, non da giornalista.» · «Questo non l’hai sentito da me.»">${esc(p.comeParla)}</textarea></label>
                        <label class="pg-kage-largo"><span>Cosa vuole in cambio <small>— all’inizio poco, col tempo chiederà di più</small></span><textarea rows="2" data-en="${i}" data-en-c="vuole" placeholder="es. essere il primo a sapere quando il caso si chiude">${esc(p.vuole)}</textarea></label>
                        <span class="pg-kage-largo"><button type="button" class="wz-btn wz-mini" data-en-ai="${i}" ${PG.aiAttiva ? "" : "hidden"}>✨ Crea con AI</button> <button type="button" class="wz-btn wz-mini" data-en-foto="${i}" ${PG.immaginiAttive ? "" : "disabled"}>🎨 Ritratto</button> <span class="wz-nota" data-en-msg="${i}"></span></span>
                    </div>
                    <button type="button" class="wz-btn-x" data-en-del="${i}" title="Togli">✕</button>
                </div>
            </div>`).join("");
        box.querySelectorAll("[data-en]").forEach(el => el.addEventListener("input", () => {
            const p = listaEnja()[+el.dataset.en];
            p[el.dataset.enC] = (el.dataset.enC === "eta" || el.dataset.enC === "en") ? (el.value === "" ? "" : parseInt(el.value)) : el.value;
            salvaDebounce();
        }));
        legaStatPng(box, "en", listaEnja, renderEnja);
        box.querySelectorAll("[data-en-del]").forEach(b => b.addEventListener("click", () => {
            const i = +b.dataset.enDel;
            if (enjaPieno(listaEnja()[i]) && !confirm("Togliere questo Enja?")) return;
            listaEnja().splice(i, 1); renderEnja(); salvaDebounce();
        }));
        box.querySelectorAll("[data-en-ai]").forEach(b => b.addEventListener("click", async () => {
            const i = +b.dataset.enAi; const p = listaEnja()[i];
            const msg = box.querySelector(`[data-en-msg="${i}"]`);
            const scritti = ["cognome", "nome", "eta", "relazione", "en", "comeConosciuti", "cosaSa", "aspetto"]
                .filter(c => (p[c] || "").toString().trim() !== "")
                .map(c => `${c}=«${p[c]}»`).join(", ");
            const orig = b.textContent; b.disabled = true; b.textContent = "✨ …"; msg.textContent = "";
            try {
                await salvaOra();
                const r = await fetch(`/api/pg/${PG.id}/ai-campo`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ campo: "enjaPersona", indicazioni: scritti ? "Campi già scritti dal giocatore (rispettali): " + scritti : null, modello: modelloAI(), effort: effortAI() })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { msg.textContent = "⚠ " + (json.detail || json.errore || r.status); return; }
                const t = json.testo || "";
                let dati = {};
                try { dati = JSON.parse(t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1)); } catch { }
                if (!Object.keys(dati).length) { msg.textContent = "⚠ Proposta illeggibile — riprova."; return; }
                for (const c of ["cognome", "nome", "relazione", "comeConosciuti", "cosaSa", "aspetto", "carattere", "comeParla", "vuole"]) {
                    if (!(p[c] || "").toString().trim() && (dati[c] || "").toString().trim()) p[c] = dati[c].toString().trim();
                }
                if (p.eta === "" && dati.eta) p.eta = parseInt(dati.eta) || "";
                if (p.en === "" && (dati.en || dati.en === 0)) p.en = parseInt(dati.en) || "";
                if (!attrPngPieni(p) && dati.attributi) {
                    ATTR.forEach(a => { const v = parseInt(dati.attributi[a]); if (!isNaN(v)) attrPng(p)[a] = Math.min(ATTR_MAX, Math.max(ATTR_MIN, v)); });
                    if (attrPngPieni(p)) p.kiDado = p.kiDado || Math.max(d6(), d6());
                }
                renderEnja(); salvaDebounce();
            } catch { msg.textContent = "⚠ AI non raggiungibile"; }
            finally { b.disabled = false; b.textContent = orig; }
        }));
        box.querySelectorAll("[data-en-foto]").forEach(b => b.addEventListener("click", async () => {
            const i = +b.dataset.enFoto; const p = listaEnja()[i];
            const msg = box.querySelector(`[data-en-msg="${i}"]`);
            const aspetto = (p.aspetto || "").trim();
            if (!aspetto) { msg.textContent = "⚠ Scrivi prima l'aspetto."; return; }
            const prompt = `Ritratto fotografico professionale, di alta qualità, quadrato: testa e spalle, di fronte, volto centrato, TESTA INTERA con spazio sopra i capelli — mai tagliare fronte o capelli. Persona giapponese comune in abiti civili, Giappone 1997. ${p.eta ? p.eta + " anni. " : ""}Segui alla lettera questa descrizione: ${aspetto}. Persona curata e in ordine, espressione naturale e composta, sguardo verso l'obiettivo, presenza dignitosa — non trasandata, non caricaturale. Luce morbida e uniforme, incarnato naturale, fuoco nitido sugli occhi, sfondo grigio-azzurro uniforme. Fotografia anni '90 ben esposta e pulita, grana finissima. SOLO testa e spalle: niente mani, niente guanti, niente oggetti in mano, niente scritte.`;
            const orig = b.textContent; b.disabled = true; b.textContent = "🎨 (20-40s)…"; msg.textContent = "";
            try {
                const r = await fetch(`/api/pg/${PG.id}/immagine`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt, tipo: "enja" })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { msg.textContent = "⚠ " + (json.detail || json.errore || r.status); return; }
                p.ritratto = json.url;
                renderEnja(); salvaDebounce();
            } catch { msg.textContent = "⚠ generazione fallita"; }
            finally { b.disabled = false; b.textContent = orig; }
        }));
    }
    function initEnja() {
        const agg = document.getElementById("pg-enja-agg");
        if (agg) agg.addEventListener("click", () => { listaEnja().push(enjaVuoto()); renderEnja(); salvaDebounce(); });
        renderEnja();
    }

    // ───────── rapporti squadra (passo 11) ─────────
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
    function initSquadra() {
        document.getElementById("pg-rapporto-agg").addEventListener("click", () => { listaRapporti().push({ nome: "", testo: "" }); renderRapporti(); salvaDebounce(); });
        renderRapporti();
    }

    // ───────── scene personali 🎨 (passo 7, con il ritratto) — massimo 3 ─────────
    const SCENE_MAX = 3;
    const listaScene = () => { if (!Array.isArray(S.scene)) S.scene = []; return S.scene; };
    function renderScene() {
        const box = document.getElementById("pg-scene-galleria");
        if (!box) return;   // scene personali spente
        box.innerHTML = listaScene().map((u, i) =>
            `<span class="pg-scena"><img src="${u}" alt="" /><button type="button" class="wz-btn-x" data-scena-del="${i}" title="Togli">✕</button></span>`).join("");
        box.querySelectorAll("[data-scena-del]").forEach(b => b.addEventListener("click", () => { listaScene().splice(+b.dataset.scenaDel, 1); renderScene(); salvaDebounce(); }));
        const btn = document.getElementById("pg-scena-genera");
        if (btn) btn.disabled = !PG.immaginiAttive || listaScene().length >= SCENE_MAX;
    }
    function initScene() {
        const btn = document.getElementById("pg-scena-genera");
        const msg = document.getElementById("pg-scena-msg");
        if (!btn) return;   // scene personali spente
        if (!PG.immaginiAttive) btn.disabled = true;
        btn.addEventListener("click", async () => {
            if (listaScene().length >= SCENE_MAX) { msg.textContent = `⚠ Massimo ${SCENE_MAX} scene — togline una per farne un'altra.`; return; }
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
            finally { btn.textContent = orig; btn.disabled = !PG.immaginiAttive || listaScene().length >= SCENE_MAX; }
        });
        renderScene();
    }

    // ───────── riepilogo (passo 12) — la scheda completa, con tutte le foto ─────────
    function renderRiepilogo() {
        const esc = s => (s ?? "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        const at = attributi();
        const gou = gouById(S.gouId);
        const box = document.getElementById("pg-riepilogo");
        const idn = c => esc(get("identita." + c) || "");
        const sez = (kanji, titolo, corpo) => corpo ? `
            <section class="pg-riep-sez">
                <h3 class="pg-riep-h"><span>${titolo}</span><span class="pg-riep-hk">${kanji}</span></h3>
                ${corpo}
            </section>` : "";
        const boxTesto = t => (t || "").trim() ? `<div class="pg-riep-box">${esc(t)}</div>` : "";

        // — avvisi su ciò che manca
        const avvisi = [
            kiMax() == null ? "⚠ Dadi del Ki non ancora tirati (passo 6)" : "",
            gou ? "" : "⚠ Manca il Gou (passo 5)",
            gou && !requisitoOk(gou) ? `⚠ ${gou.nome} richiede ${gou.requisito.attributo} ${gou.requisito.minimo}: ora hai ${attributi()[gou.requisito.attributo]}` : "",
            lottaBase()?.upCreazione && !lotta2Ok() ? `⚠ Lotta grado 2 richiede Presenza 6: ora hai ${attributi().Presenza}` : "",
            (get("kage.problema") || "").trim() ? "" : "⚠ Manca il Kage (passo 8)",
            enjaPieno(listaEnja()[0] || {}) ? "" : "⚠ Manca l'Enja (passo 9)"
        ].filter(Boolean).map(a => `<span class="pg-riep-avviso">${a}</span>`).join(" ");

        // — testata con il ritratto
        const residenza = [idn("quartiere"), idn("via")].filter(Boolean).join(" · ");
        const contatti = [idn("telefono") ? "電話 telefono di casa" : "", idn("cellulare") ? "携帯 cellulare" : "", idn("pocketBell") ? "ポケベル pocket bell" : "", idn("altroContatto")].filter(Boolean).join(" · ");
        const sotto = [idn("grado"), idn("ruolo"), idn("eta") ? idn("eta") + " anni" : "", get("identita.genere") === "f" ? "donna" : get("identita.genere") === "m" ? "uomo" : "", idn("anniServizio") ? idn("anniServizio") + " anni di servizio" : ""].filter(Boolean).join(" · ");
        const testata = `
            <div class="pg-riep-testata">
                ${S.ritratto ? `<img class="pg-riep-foto" src="${esc(S.ritratto)}" alt="" />` : ""}
                <div class="pg-riep-anagrafica">
                    <div class="pg-riep-nome">${esc(nomePieno()) || "(senza nome)"} <span class="pg-riep-nome-kanji">${idn("kanji")}</span></div>
                    ${sotto ? `<div class="pg-riep-sotto">${sotto}</div>` : ""}
                    ${residenza ? `<div class="pg-riep-riga">🏠 ${residenza}</div>` : ""}
                    ${contatti ? `<div class="pg-riep-riga">${contatti}</div>` : ""}
                    ${avvisi ? `<div class="pg-riep-avvisi">${avvisi}</div>` : ""}
                </div>
            </div>`;

        // — attributi
        const attrCorpo = `<div class="pg-riep-attr">` + ATTR.map(a =>
            `<div class="pg-riep-attr-box"><span class="n">${a}</span><span class="v">${at[a]}</span></div>`).join("") + `</div>`;

        // — il tiro (le tre righe della scheda stampata)
        const tiroCorpo = `<p class="pg-riep-p pg-riep-regola">Si tirano 2d6, si applicano i modificatori: punteggio minore o uguale al tuo attributo = successo. I critici si leggono sui dadi nudi.<br/>
            <strong>2 (Kiwami)</strong> successo critico: aggiungi un punto nell'attributo usato e nel Ki · con <strong>3 (Nami)</strong> scegli se mettere un punto nell'attributo o nel Ki.<br/>
            <strong>12 (Kiwami)</strong> fallimento critico: perdi 1 punto nell'attributo usato e nel Ki · con <strong>11 (Nami)</strong> scegli se perdere un punto nell'attributo o nel Ki.</p>`;

        // — Ki a quattro riquadri, come sulla scheda: Ki max · Ki attuale · Satori · Soroban — poi il Nasake
        const dadi = Array.isArray(S.ki && S.ki.dadi) ? S.ki.dadi.join(" e ") : null;
        const ki4Corpo = `<div class="pg-riep-ki4">
            <div><strong>KI MAX</strong>: <span class="pg-riep-kinum">${kiMax() ?? "—"}</span>${dadi ? ` <small>(dadi ${dadi}${S.ki.extra ? " + " + S.ki.extra + " comprato" : ""})</small>` : ""}<br/><small>attributo più basso + 2d6 prendi il più alto; l'1 si ritira sempre.</small></div>
            <div><strong>KI ATTUALE</strong><br/><span class="pg-riep-tacche">☐☐☐☐☐☐☐☐☐☐☐☐</span><br/><small>Se è ≤ 3: <strong>Genkai</strong> (il crollo).</small></div>
            <div><strong>SATORI 悟り</strong> — successo automatico. <strong>Usato ☐</strong><br/><small>1/sessione, dichiarato prima del tiro: il dado vale 2, niente Kiwami.</small></div>
            <div><strong>SOROBAN 算盤</strong> — per ogni tiro critico o fallimento<br/><small>Nami (11) → +1 · Kiwami (12) → +2<br/>Nami (3) → −1 · Kiwami (2) → −2</small><div class="pg-riep-scala">0 1 2 3 4 ⑤ 6 7 8 9</div></div>
        </div>`;
        const nasakeCorpo = `<p class="pg-riep-p pg-riep-nasake"><strong>Nasake 情け — compassione.</strong> Se sei al massimo e fai un critico Kiwami prendi un punto. Solo donabile a un altro PG giocando la scena. Max 1 punto. &nbsp;<strong>☐ Pieno</strong></p>`;

        // — equipaggiamento di servizio, per intero
        const equipCorpo = `<p class="pg-riep-p">In borghese non porti l'arma: resta nell'armadietto in centrale e si preleva, firmando, solo per le operazioni.</p>
            <ul class="pg-riep-lista">
            <li><strong>Armadietto</strong> — Revolver New Nambu M60 (.38, 5 colpi): Lucidità · vel. 3/2 · ricarica 4 · danno 3. Addestramento base: sai usarla, non sei un tiratore scelto</li>
            <li><strong>Armadietto</strong> — Giubbotto antiproiettile: Assorbe 3 (fisso, contro ogni colpo) · indossare 4</li>
            <li><strong>Operazioni</strong> — Keibō (manganello): Silenzio · vel. 2/1 · danno 2</li>
            <li><strong>Sempre con te</strong> — Keisatsu techō (tesserino), manette, taccuino</li>
            <li><strong>A mani nude</strong> — Lotta 1 d'accademia: Presenza · vel. 1/1 · danno 1 (prese e immobilizzazioni)</li>
            </ul>`;

        // — Shugyō, come sulla scheda («/ solo per campagne»)
        const shugyoCorpo = `<p class="pg-riep-p">Punti Shugyō: ${window.PG.crescitaAttiva ? `<strong>${(S.shugyo && S.shugyo.punti) || 0}</strong>` : "________"} <small>/ solo per campagne</small></p>
            <p class="pg-riep-p"><small><strong>Guadagno</strong>: 1 a sessione · 4-6 a caso chiuso · +1 scena personale ben gestita · +1 momento eccezionale (max 1/sessione)<br/>
            <strong>Spesa tra i casi</strong>: attributo = arrivo ×3 · Ki max = arrivo ×4 (tetto 12) · Senmon 9/19/39 · Enja extra 12 · affinare il Gou = base ×11</small></p>`;
        const gouRegola = `<p class="pg-riep-p"><small>Il Gou funziona SEMPRE: successo = preciso, fallimento = vago. Il costo si paga per intero — se ti portasse a 0 o sotto, non si attiva.</small></p>`;
        const gouCorpo = gou ? gouRegola + `<p class="pg-riep-p"><strong>${esc(gou.nome)} ${gou.kanji}</strong> — <em>${esc(gou.tagline || "")}</em></p>
            <p class="pg-riep-p"><small>${gou.attributi.join(" o ")} · costo ${window.PG.crescitaAttiva && S.shugyo && S.shugyo.gouAffinato ? (gou.costo - 1) + " Ki (affinato)" : gou.costo + " Ki"} · si attiva solo restando a Ki ≥ 1 · a ogni uso il costo raddoppia, una notte di riposo lo riduce di un grado</small></p>
            ${(gou.vincolo || "").trim() ? `<p class="pg-riep-p"><small><em>Vincolo:</em> ${esc(gou.vincolo)}</small></p>` : ""}
            <p class="pg-riep-p"><small>✔ <em>Successo:</em> ${esc(gou.successo || "")}<br/>✖ <em>Fallimento:</em> ${esc(gou.fallimento || "")}</small></p>` : "";
        // — senmon
        const senmonCorpo = `<ul class="pg-riep-lista">` + listaSenmon().map(s => {
            const v = senmonById(s.id) || { nome: s.id, famiglia: "" };
            const malus = s.grado === 3 ? (v.maestroEccezione === "+2C" || (BIB.famiglie.find(f => f.id === v.famiglia) || {}).maestro === "+2C" ? "−2 con Correzione" : "−3") : "−" + s.grado;
            return `<li><strong>${esc(v.nome)}</strong>${Array.isArray(v.chiave) && v.chiave.length ? ` (${v.chiave.join(" o ")})` : ""} — grado ${s.grado} (${malus} al dado)${s.diBase ? " · d'accademia" : ""}${window.PG.crescitaAttiva ? ` · usi ${s.usi || 0}` : ""}</li>`;
        }).join("") + `</ul>` + ((get("senmonPerche") || "").trim() ? `<p class="pg-riep-p"><strong>Perché la sai fare:</strong> ${esc(get("senmonPerche"))}</p>` : "");

        // — storia e aspetto, con le scene personali
        const sceneFoto = listaScene().length ? `<div class="pg-riep-galleria">` +
            listaScene().map(u => `<img src="${esc(u)}" alt="" loading="lazy" />`).join("") + `</div>` : "";
        const storiaCorpo = boxTesto(get("chiSei"));
        const aspettoCorpo = (boxTesto(get("descrizioneFisica")) + sceneFoto) || "";

        // riga «Tiri» di un PNG (persona del Kage o Enja): attributi + Ki, come in stampa
        const tiriPng = p => {
            const at2 = (p.attributi && typeof p.attributi === "object") ? p.attributi : {};
            if (!ATTR.every(a2 => typeof at2[a2] === "number")) return "";
            const ki2 = p.kiDado ? Math.min(12, Math.min(...ATTR.map(a2 => at2[a2])) + p.kiDado) : null;
            return ATTR.map(a2 => `${a2} ${at2[a2]}`).join(" · ") + (ki2 ? ` · 気 Ki ${ki2}` : "");
        };
        // le righe da interpretare (com'è fatto · come parla · cosa vuole) + i Tiri
        const cardRighe = (p, etVuole) => [
            (p.carattere || "").trim() ? `<div class="pg-riep-card-nota"><em>Com'è fatto:</em> ${esc(p.carattere)}</div>` : "",
            (p.comeParla || "").trim() ? `<div class="pg-riep-card-nota"><em>Come parla:</em> ${esc(p.comeParla)}</div>` : "",
            (p.vuole || "").trim() ? `<div class="pg-riep-card-nota"><em>${etVuole}:</em> ${esc(p.vuole)}</div>` : "",
            tiriPng(p) ? `<div class="pg-riep-card-nota"><em>Tiri:</em> ${tiriPng(p)}</div>` : ""
        ].filter(Boolean).join("");

        // — kage: testi + persone con foto
        const kagePersoneCorpo = listaKagePersone().filter(p => (p.cognome || p.nome || p.relazione || p.aspetto || p.ritratto)).map(p => `
            <div class="pg-riep-card">
                ${p.ritratto ? `<img src="${esc(p.ritratto)}" alt="" loading="lazy" />` : `<span class="pg-riep-card-vuota">👤</span>`}
                <div>
                    <strong>${esc((p.cognome + " " + p.nome).trim()) || "(senza nome)"}</strong>${p.relazione ? " — " + esc(p.relazione) : ""}${p.eta ? " · " + esc(p.eta) + " anni" : ""}
                    ${(p.aspetto || "").trim() ? `<div class="pg-riep-card-nota">${esc(p.aspetto)}</div>` : ""}
                    ${cardRighe(p, "Vuole")}
                </div>
            </div>`).join("");
        const kageCorpo = [boxTesto(get("kage.problema")), boxTesto(get("kage.png")),
            kagePersoneCorpo ? `<div class="pg-riep-cards">${kagePersoneCorpo}</div>` : ""].filter(Boolean).join("");

        // — enja con foto ed En
        const enjaCorpo = listaEnja().filter(enjaPieno).map(p => `
            <div class="pg-riep-card">
                ${p.ritratto ? `<img src="${esc(p.ritratto)}" alt="" loading="lazy" />` : `<span class="pg-riep-card-vuota">👤</span>`}
                <div>
                    <strong>${esc((p.cognome + " " + p.nome).trim()) || "(senza nome)"}</strong>${p.relazione ? " — " + esc(p.relazione) : ""}${p.eta ? " · " + esc(p.eta) + " anni" : ""}${p.en !== "" && p.en != null ? ` · <span class="pg-riep-en">縁 En ${p.en > 0 ? "+" + p.en : p.en}</span>` : ""}
                    ${(p.comeConosciuti || "").trim() ? `<div class="pg-riep-card-nota"><em>Conosciuti:</em> ${esc(p.comeConosciuti)}</div>` : ""}
                    ${(p.cosaSa || "").trim() ? `<div class="pg-riep-card-nota"><em>Può dare:</em> ${esc(p.cosaSa)}</div>` : ""}
                    ${(p.aspetto || "").trim() ? `<div class="pg-riep-card-nota"><em>Aspetto:</em> ${esc(p.aspetto)}</div>` : ""}
                    ${cardRighe(p, "Vuole in cambio")}
                </div>
            </div>`).join("");

        // — carattere e tratti
        const rigaSe = (et, v) => (v || "").trim() ? `<p class="pg-riep-p"><strong>${et}:</strong> ${esc(v)}</p>` : "";
        const trattiRighe = [["Vizio", get("tratti.vizio")], ["Tic", get("tratti.tic")], ["Oggetto", get("tratti.oggetto")], ["Gusto", get("tratti.gusto")], [get("tratti.liberoEtichetta") || "Tratto", get("tratti.libero")]]
            .filter(([, v]) => (v || "").trim()).map(([e2, v]) => `<strong>${esc(e2)}:</strong> ${esc(v)}`).join(" · ");
        const carattereCorpo = [
            rigaSe("In pubblico (tatemae)", get("comportamento.tatemae")),
            rigaSe("In privato (honne)", get("comportamento.honne")),
            rigaSe("Frase tipica", get("comportamento.fraseTipica")),
            rigaSe("Sotto pressione", get("comportamento.sottoPressione")),
            rigaSe("Debolezza", get("comportamento.debolezza")),
            trattiRighe ? `<p class="pg-riep-p pg-riep-tratti">${trattiRighe}</p>` : ""
        ].filter(Boolean).join("");

        // — squadra
        const squadraCorpo = listaRapporti().filter(r => (r.nome || "").trim() || (r.testo || "").trim()).map(r =>
            `<p class="pg-riep-p"><strong>${esc(r.nome) || "?"}</strong>${(r.testo || "").trim() ? " — " + esc(r.testo) : ""}</p>`).join("");

        box.innerHTML = `<div class="pg-riep">
            ${testata}
            ${sez("姿", "Aspetto", aspettoCorpo)}
            ${sez("能力", "Attributi", attrCorpo + tiroCorpo)}
            ${sez("気", "Ki — energia vitale", ki4Corpo + nasakeCorpo)}
            ${sez("装", "Equipaggiamento di servizio", equipCorpo)}
            ${sez("業", "Gou — il debito", gouCorpo || gouRegola + "<p class='pg-riep-p'><small>— non ancora scelto (passo 5) —</small></p>")}
            ${sez("専門", "Senmon — specializzazioni", senmonCorpo)}
            ${sez("修行", "Shugyō — crescita", shugyoCorpo)}
            ${sez("道", "La tua storia", storiaCorpo)}
            ${sez("心", "Come ti comporti", carattereCorpo)}
            ${sez("班", "La squadra", squadraCorpo)}
            ${sez("影", "Kage — il tuo problema", kageCorpo)}
            ${sez("縁者", "Conoscenza — Enja", enjaCorpo ? `<div class="pg-riep-cards">${enjaCorpo}</div>` : "")}
        </div>`;
    }

    // ───────── shugyō (passo 12) ─────────
    const shu = () => { if (!S.shugyo || typeof S.shugyo !== "object") S.shugyo = { punti: 0, log: [], gouAffinato: false }; if (!Array.isArray(S.shugyo.log)) S.shugyo.log = []; return S.shugyo; };
    const shuSpesi = () => shu().log.reduce((n, e) => n + (e.costo || 0), 0);
    const shuRimasti = () => (shu().punti || 0) - shuSpesi();
    function shuCompra(cosa, costo, applica) {
        if (costo > shuRimasti()) { alert(`Servono ${costo} punti, ne hai ${shuRimasti()}.`); return; }
        // prima il registro, poi l'effetto: così chi si rende conto dell'acquisto (es. il lucchetto
        // degli attributi) lo vede già nel log
        shu().log.push({ quando: new Date().toISOString(), cosa, costo });
        applica();
        renderShugyo(); renderRiepilogo(); salvaDebounce();
    }
    function renderShugyo() {
        document.getElementById("pg-shu-spesi").textContent = shuSpesi();
        document.getElementById("pg-shu-rimasti").textContent = shuRimasti();
        const at = attributi();
        const box = document.getElementById("pg-shu-acquisti");

        // senmon possedute (per migliorie) e non possedute (per l'acquisto nuova)
        const mie = listaSenmon();
        const nonMie = BIB.senmon.filter(v => !v.nascosta && !mie.some(m => m.id === v.id));
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
            shuCompra(`${a} ${at[a]}→${at[a] + 1}`, (at[a] + 1) * 3, () => { at[a] += 1; renderAttributi(); aggiornaGouRequisiti(); });
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
            shuCompra("Enja aggiuntivo", 12, () => { listaEnja().push(enjaVuoto()); renderEnja(); });
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
                    const campi = { quartiere: "identita.quartiere", via: "identita.via", telefono: "identita.telefono", cellulare: "identita.cellulare", pocketBell: "identita.pocketBell", altroContatto: "identita.altroContatto" };
                    for (const [k, path] of Object.entries(campi)) {
                        if (!dati[k] || (get(path) || "").trim()) continue;
                        const el = document.querySelector(`[data-pg-campo="${path}"]`);
                        if (el && el.type === "checkbox") {          // telefono/cellulare/pocket bell: sono spunte
                            if (!/^(s[iì]|true|1|y|yes)$/i.test(String(dati[k]).trim())) continue;
                            set(path, "si"); el.checked = true;
                        } else {
                            set(path, dati[k]);
                            if (el) el.value = dati[k];
                        }
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
        // kanji automatici: quando scrivi cognome+nome arrivano da soli — dalla biblioteca se il
        // nome è in elenco, altrimenti composti dai morfemi (o in katakana). TUTTO IN LOCALE: nessuna
        // chiamata AI, nessun costo. Cambi il nome → cambiano i kanji; li correggi a mano → restano tuoi.
        const cog = document.querySelector('[data-pg-campo="identita.cognome"]');
        const nom = document.querySelector('[data-pg-campo="identita.nome"]');
        const kan = document.querySelector('[data-pg-campo="identita.kanji"]');
        const setKanji = v => { kan.value = v; set("identita.kanji", v); };
        let t = null, ultimoNome = "";
        // se li corregge a mano restano suoi, finché non cambia il nome
        kan.addEventListener("input", () => { ultimoNome = cog.value.trim() + " " + nom.value.trim(); });
        const prova = () => {
            clearTimeout(t);
            t = setTimeout(async () => {
                const c = cog.value.trim(), n = nom.value.trim();
                if (!c || !n) return;
                const chiave = c + " " + n;
                if (chiave === ultimoNome) return;   // per questo nome i kanji ci sono già
                try {
                    const r = await fetch(`/api/nomi/verifica?cognome=${encodeURIComponent(c)}&nome=${encodeURIComponent(n)}`);
                    const j = await r.json();
                    if (cog.value.trim() !== c || nom.value.trim() !== n) return; // nel frattempo l'ha riscritto
                    if (j.kanji) { ultimoNome = chiave; setKanji(j.kanji); }
                } catch { }
            }, 400);
        };
        cog.addEventListener("input", prova);
        nom.addEventListener("input", prova);
        prova(); // e anche all'apertura, se il nome c'è già e i kanji mancano

        // bottone 字 — rifà i kanji dal nome. Tutto in locale: NON consuma aiuti AI
        const btnLoc = document.getElementById("pg-kanji-rifai");
        if (btnLoc) {
            if (!kan.parentNode.classList.contains("pg-campo-ai")) {   // stessa cornice dei bottoni ✨
                const wrap = document.createElement("span");
                wrap.className = "pg-campo-ai";
                kan.parentNode.insertBefore(wrap, kan);
                wrap.appendChild(kan); wrap.appendChild(btnLoc);
            }
            btnLoc.addEventListener("click", () => { ultimoNome = ""; prova(); });
        }
    }

    // ───────── 🔮 nomi su misura (passo 2) ─────────
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
            const esc = s => (s || "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
            out.innerHTML = nomi.map(n => `
                <button type="button" class="pg-nome-card" data-cognome="${esc(n.cognome)}" data-nome="${esc(n.nome)}">
                    <span class="pg-nome-n">${esc(n.cognome)} ${esc(n.nome)}</span>
                    <span class="pg-nome-k">${esc(n.kanji)}</span>
                    ${n.significato ? `<span class="pg-nome-s">${esc(n.significato)}</span>` : ""}
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
                    const q = new URLSearchParams({ genere: get("identita.genere") || "m", eta: get("identita.eta") || 30, quanti: 3 });
                    const r = await fetch(`/api/nomi?${q}`);
                    const nomi = await r.json();
                    render(nomi);
                }
            } catch { alert("Suggerimento nomi non riuscito — riprova."); }
            finally { btn.disabled = false; btn.textContent = orig; }
        });
    }

    // ───────── kage: catalogo archetipi → prepara i testi (poi il giocatore li fa suoi) ─────────
    function initKage() {
        const sel = document.getElementById("pg-kage-sel");
        if (!sel) return;
        const perCat = {};
        BIB.kage.forEach(v => (perCat[v.categoria] = perCat[v.categoria] || []).push(v));
        sel.innerHTML = `<option value="">— oppure scrivi da zero —</option>` +
            Object.entries(perCat).map(([cat, voci]) =>
                `<optgroup label="${cat}">` + voci.map(v => `<option value="${v.id}">${v.nome}</option>`).join("") + `</optgroup>`).join("");
        if (get("kage.archetipo")) sel.value = get("kage.archetipo");
        sel.addEventListener("change", () => {
            const v = BIB.kage.find(x => x.id === sel.value);
            if (!v) { set("kage.archetipo", ""); return; }
            const pieni = (get("kage.problema") || "").trim() || (get("kage.png") || "").trim();
            if (pieni && !confirm(`Sostituire i testi del Kage con l'archetipo «${v.nome}»?\n(Quello che hai scritto verrà rimpiazzato.)`)) {
                sel.value = get("kage.archetipo") || "";
                return;
            }
            set("kage.archetipo", v.id);
            set("kage.problema", v.problema);
            set("kage.png", v.png);
            const elP = document.querySelector('[data-pg-campo="kage.problema"]');
            const elN = document.querySelector('[data-pg-campo="kage.png"]');
            if (elP) elP.value = v.problema;
            if (elN) elN.value = v.png;
        });
    }

    // ───────── statistiche dei PNG (persona del Kage · Enja) ─────────
    // Sono PNG: niente Gou, e stanno un filo sopra la media — 11 punti invece di 9, da 4 in su,
    // mai oltre 9. Il Ki è quello del manuale: attributo più basso + il migliore di 2d6, tetto 12
    // (stessa regola del wizard-casi). Si ricalcola da solo appena cambia un attributo.
    const PUNTI_PNG = 11;
    const attrPng = p => (p.attributi && typeof p.attributi === "object") ? p.attributi : (p.attributi = {});
    const attrPngPieni = p => ATTR.every(a => typeof attrPng(p)[a] === "number");
    function kiPng(p) {
        if (!attrPngPieni(p)) return null;
        if (!p.kiDado) p.kiDado = Math.max(d6(), d6());   // il dado si tira una volta e resta
        return Math.min(12, Math.min(...ATTR.map(a => attrPng(p)[a])) + p.kiDado);
    }
    function tiraStatPng(p) {
        const at = attrPng(p);
        ATTR.forEach(a => at[a] = ATTR_MIN);
        for (let n = 0; n < PUNTI_PNG; n++) {
            const liberi = ATTR.filter(a => at[a] < ATTR_MAX);
            if (!liberi.length) break;
            at[liberi[Math.floor(Math.random() * liberi.length)]] += 1;
        }
        p.kiDado = Math.max(d6(), d6());
    }
    // il blocco sotto la foto: sei attributi da 4 a 9 e il Ki calcolato
    function statPngHtml(pre, i, p) {
        const at = attrPng(p), ki = kiPng(p);
        return `<div class="pg-png-stat">
            <div class="pg-png-attr">${ATTR.map(a =>
                `<span>${a}</span><input type="number" min="${ATTR_MIN}" max="${ATTR_MAX}" data-${pre}="${i}" data-${pre}-a="${a}" value="${typeof at[a] === "number" ? at[a] : ""}" />`).join("")}</div>
            <div class="pg-png-ki">気 Ki <b data-${pre}-ki="${i}">${ki ?? "—"}</b>
                <button type="button" class="wz-btn wz-mini" data-${pre}-tira="${i}">🎲</button></div>
        </div>`;
    }
    // aggancia i campi statistica di una card (vale per il Kage e per l'Enja)
    function legaStatPng(box, pre, lista, ridisegna) {
        box.querySelectorAll(`[data-${pre}-a]`).forEach(el => el.addEventListener("input", () => {
            const p = lista()[+el.dataset[pre]];
            const v = parseInt(el.value);
            attrPng(p)[el.dataset[pre + "A"]] = isNaN(v) ? undefined : v;
            if (isNaN(v)) delete attrPng(p)[el.dataset[pre + "A"]];
            const bKi = box.querySelector(`[data-${pre}-ki="${el.dataset[pre]}"]`);
            if (bKi) bKi.textContent = kiPng(p) ?? "—";
            salvaDebounce();
        }));
        // uscendo dal campo il valore si rimette dentro i binari (4-9)
        box.querySelectorAll(`[data-${pre}-a]`).forEach(el => el.addEventListener("change", () => {
            const p = lista()[+el.dataset[pre]];
            let v = parseInt(el.value);
            if (isNaN(v)) return;
            v = Math.min(ATTR_MAX, Math.max(ATTR_MIN, v));
            attrPng(p)[el.dataset[pre + "A"]] = v; el.value = v;
            const bKi = box.querySelector(`[data-${pre}-ki="${el.dataset[pre]}"]`);
            if (bKi) bKi.textContent = kiPng(p) ?? "—";
            salvaDebounce();
        }));
        box.querySelectorAll(`[data-${pre}-tira]`).forEach(b => b.addEventListener("click", () => {
            tiraStatPng(lista()[+b.dataset[pre + "Tira"]]);
            ridisegna(); salvaDebounce();
        }));
    }

    // ───────── persone del Kage — schede minime con volto 🎨 (passo 8) ─────────
    const listaKagePersone = () => { const k = S.kage || (S.kage = {}); if (!Array.isArray(k.persone)) k.persone = []; return k.persone; };
    function renderKagePersone() {
        const box = document.getElementById("pg-kage-persone");
        if (!box) return;
        const q = s => (s || "").toString().replace(/"/g, "&quot;");
        const e = s => (s || "").toString().replace(/&/g, "&amp;").replace(/</g, "&lt;");
        const pp = listaKagePersone();
        limiteLista("pg-kage-persona-agg", "pg-kage-persona-nota", pp.length, MAX_KAGE_PERSONE, "Per ora la persona del Kage è una sola.");
        box.innerHTML = pp.length === 0 ? `<p class="wz-nota">Nessuna persona salvata.</p>` :
            pp.map((p, i) => `
            <div class="pg-kage-card">
                <div>
                    <div class="pg-kage-foto">${p.ritratto ? `<img src="${q(p.ritratto)}" alt="" />` : "👤"}</div>
                    ${statPngHtml("kp", i, p)}
                </div>
                <div class="pg-kage-campi">
                    <label><span>Cognome</span><input type="text" data-kp="${i}" data-kp-c="cognome" placeholder="es. Yamamoto" value="${q(p.cognome)}" /></label>
                    <label><span>Nome</span><input type="text" data-kp="${i}" data-kp-c="nome" placeholder="es. Noriko" value="${q(p.nome)}" /></label>
                    <label><span>Chi è per te</span><input type="text" data-kp="${i}" data-kp-c="relazione" placeholder="es. tua sorella maggiore" value="${q(p.relazione)}" /></label>
                    <label><span>Età</span><input type="number" data-kp="${i}" data-kp-c="eta" placeholder="es. 38" min="1" max="99" value="${q(p.eta)}" /></label>
                    <label class="pg-kage-largo"><span>Aspetto <small>— serve anche per il ritratto</small></span><textarea rows="4" data-kp="${i}" data-kp-c="aspetto" placeholder="es. minuta, capelli raccolti, sempre lo stesso cardigan grigio; mani da chi lavora la ceramica">${e(p.aspetto)}</textarea></label>
                    <label class="pg-kage-largo"><span>Com’è fatto <small>— come si comporta, che tono ha</small></span><textarea rows="3" data-kp="${i}" data-kp-c="carattere" placeholder="es. non alza mai la voce: è delusa, non arrabbiata. Fa domande invece di accusare, e aspetta la risposta">${e(p.carattere)}</textarea></label>
                    <label class="pg-kage-largo"><span>Come parla <small>— due o tre frasi sue, da leggere al tavolo</small></span><textarea rows="3" data-kp="${i}" data-kp-c="comeParla" placeholder="es. «Non è questo il punto.» · «L’hai detto anche l’ultima volta.» · «Ha bisogno di suo padre, non di sua zia.»">${e(p.comeParla)}</textarea></label>
                    <label class="pg-kage-largo"><span>Cosa vuole da te <small>— all’inizio poco, col tempo chiederà di più</small></span><textarea rows="2" data-kp="${i}" data-kp-c="vuole" placeholder="es. che tu ammetta che il lavoro vince sempre — non un favore: un cambiamento">${e(p.vuole)}</textarea></label>
                    <span class="pg-kage-largo"><button type="button" class="wz-btn wz-mini" data-kp-ai="${i}" ${PG.aiAttiva ? "" : "hidden"}>✨ Crea con AI</button> <button type="button" class="wz-btn wz-mini" data-kp-foto="${i}" ${PG.immaginiAttive ? "" : "disabled"}>🎨 Ritratto</button> <span class="wz-nota" data-kp-msg="${i}"></span></span>
                </div>
                <button type="button" class="wz-btn-x" data-kp-del="${i}" title="Togli">✕</button>
            </div>`).join("");
        box.querySelectorAll("[data-kp]").forEach(el => el.addEventListener("input", () => {
            const p = listaKagePersone()[+el.dataset.kp];
            p[el.dataset.kpC] = el.dataset.kpC === "eta" ? (parseInt(el.value) || "") : el.value;
            salvaDebounce();
        }));
        legaStatPng(box, "kp", listaKagePersone, renderKagePersone);
        box.querySelectorAll("[data-kp-del]").forEach(b => b.addEventListener("click", () => {
            const i = +b.dataset.kpDel; const p = listaKagePersone()[i];
            if ((p.cognome || p.nome || p.relazione || p.aspetto || p.carattere || p.comeParla || p.vuole || p.ritratto) && !confirm("Togliere questa persona?")) return;
            listaKagePersone().splice(i, 1); renderKagePersone(); salvaDebounce();
        }));
        box.querySelectorAll("[data-kp-ai]").forEach(b => b.addEventListener("click", async () => {
            const i = +b.dataset.kpAi; const p = listaKagePersone()[i];
            const msg = box.querySelector(`[data-kp-msg="${i}"]`);
            // i campi già scritti si rispettano: li passiamo come indicazioni
            const scritti = ["cognome", "nome", "eta", "relazione", "aspetto", "carattere", "comeParla", "vuole"]
                .filter(c => (p[c] || "").toString().trim() !== "")
                .map(c => `${c}=«${p[c]}»`).join(", ");
            const orig = b.textContent; b.disabled = true; b.textContent = "✨ …"; msg.textContent = "";
            try {
                await salvaOra();
                const r = await fetch(`/api/pg/${PG.id}/ai-campo`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ campo: "kagePersona", indicazioni: scritti ? "Campi già scritti dal giocatore (rispettali): " + scritti : null, modello: modelloAI(), effort: effortAI() })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { msg.textContent = "⚠ " + (json.detail || json.errore || r.status); return; }
                const t = json.testo || "";
                let dati = {};
                try { dati = JSON.parse(t.slice(t.indexOf("{"), t.lastIndexOf("}") + 1)); } catch { }
                if (!Object.keys(dati).length) { msg.textContent = "⚠ Proposta illeggibile — riprova."; return; }
                // riempi SOLO i campi vuoti, mai sovrascrivere
                for (const c of ["cognome", "nome", "relazione", "aspetto", "carattere", "comeParla", "vuole"]) {
                    if (!(p[c] || "").toString().trim() && (dati[c] || "").toString().trim()) p[c] = dati[c].toString().trim();
                }
                if (!p.eta && dati.eta) p.eta = parseInt(dati.eta) || "";
                if (!attrPngPieni(p) && dati.attributi) {
                    ATTR.forEach(a => { const v = parseInt(dati.attributi[a]); if (!isNaN(v)) attrPng(p)[a] = Math.min(ATTR_MAX, Math.max(ATTR_MIN, v)); });
                    if (attrPngPieni(p)) p.kiDado = p.kiDado || Math.max(d6(), d6());
                }
                renderKagePersone(); salvaDebounce();
            } catch { msg.textContent = "⚠ AI non raggiungibile"; }
            finally { b.disabled = false; b.textContent = orig; }
        }));
        box.querySelectorAll("[data-kp-foto]").forEach(b => b.addEventListener("click", async () => {
            const i = +b.dataset.kpFoto; const p = listaKagePersone()[i];
            const msg = box.querySelector(`[data-kp-msg="${i}"]`);
            const aspetto = (p.aspetto || "").trim();
            if (!aspetto) { msg.textContent = "⚠ Scrivi prima l'aspetto."; return; }
            const prompt = `Ritratto fotografico professionale, di alta qualità, quadrato: testa e spalle, di fronte, volto centrato, TESTA INTERA con spazio sopra i capelli — mai tagliare fronte o capelli. Persona giapponese comune in abiti civili, Giappone 1997. ${p.eta ? p.eta + " anni. " : ""}Segui alla lettera questa descrizione: ${aspetto}. Persona curata e in ordine, espressione naturale e composta, sguardo verso l'obiettivo, presenza dignitosa — non trasandata, non caricaturale. Luce morbida e uniforme, incarnato naturale, fuoco nitido sugli occhi, sfondo grigio-azzurro uniforme. Fotografia anni '90 ben esposta e pulita, grana finissima. SOLO testa e spalle: niente mani, niente guanti, niente oggetti in mano, niente scritte.`;
            const orig = b.textContent; b.disabled = true; b.textContent = "🎨 (20-40s)…"; msg.textContent = "";
            try {
                const r = await fetch(`/api/pg/${PG.id}/immagine`, {
                    method: "POST", headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt, tipo: "kage" })
                });
                const json = await r.json().catch(() => ({}));
                if (!r.ok) { msg.textContent = "⚠ " + (json.detail || json.errore || r.status); return; }
                p.ritratto = json.url;
                renderKagePersone(); salvaDebounce();
            } catch { msg.textContent = "⚠ generazione fallita"; }
            finally { b.disabled = false; b.textContent = orig; }
        }));
    }
    function initKagePersone() {
        const agg = document.getElementById("pg-kage-persona-agg");
        if (!agg) return;
        agg.addEventListener("click", () => {
            listaKagePersone().push({ cognome: "", nome: "", eta: "", relazione: "", aspetto: "", carattere: "", comeParla: "", vuole: "", ritratto: "" });
            renderKagePersone(); salvaDebounce();
        });
        renderKagePersone();
    }

    // ───────── esperienza: sfondo + musica (scelti una volta, restano) + 豆知識 ─────────
    const espStato = () => {
        if (!S.esperienza || typeof S.esperienza !== "object") S.esperienza = { sfondo: "", musica: "", volume: 60, scelto: false };
        return S.esperienza;
    };
    function tipCasuale() {
        const box = document.getElementById("pg-tip");
        if (!box || !(BIB.tips || []).length) return;
        document.getElementById("pg-tip-testo").textContent = BIB.tips[Math.floor(Math.random() * BIB.tips.length)];
        box.hidden = false;
        box.classList.remove("pg-tip-entra"); void box.offsetWidth; // riavvia l'animazione
        box.classList.add("pg-tip-entra");
    }
    function applicaEsperienza() {
        const e = espStato();
        const sf = (BIB.sfondi || []).find(x => x.id === e.sfondo);
        document.body.classList.toggle("pg-con-sfondo", !!sf);
        document.body.style.setProperty("--pg-sfondo", sf ? `url("${sf.file}")` : "none");
        const au = document.getElementById("pg-musica");
        const ctrl = document.getElementById("pg-audio-ctrl");
        const mu = (BIB.musiche || []).find(x => x.id === e.musica);
        if (mu) {
            if (!au.getAttribute("src")) au.src = mu.file;
            else if (!au.getAttribute("src").endsWith(mu.file)) { au.src = mu.file; }
            au.volume = Math.min(Math.max((e.volume ?? 60) / 100, 0), 1);
            ctrl.hidden = false;
            document.getElementById("pg-audio-vol").value = e.volume ?? 60;
        } else {
            au.pause(); au.removeAttribute("src");
            ctrl.hidden = true;
        }
    }
    // se metti in pausa, la pausa REGGE anche tornando dalla stampa (la pagina si ricarica):
    // il segno vive in sessionStorage, per questa scheda, finché il tab resta aperto
    const musicaOffKey = "pgMusicaOff:" + PG.id;
    const musicaSpenta = () => { try { return sessionStorage.getItem(musicaOffKey) === "1"; } catch { return false; } };
    const segnaMusica = off => { try { off ? sessionStorage.setItem(musicaOffKey, "1") : sessionStorage.removeItem(musicaOffKey); } catch { } };
    function avviaMusica() {
        const au = document.getElementById("pg-musica");
        if (!au.getAttribute("src")) return;
        segnaMusica(false);
        au.play().catch(() => { /* autoplay bloccato: resta il ▶ in testata */ });
    }
    function renderEspScelte() {
        const e = espStato();
        const q = s => (s || "").replace(/"/g, "&quot;");
        const boxS = document.getElementById("pg-esp-sfondi");
        if (!boxS) return;
        boxS.innerHTML = (BIB.sfondi || []).map(s => `
            <button type="button" class="pg-esp-sfondo ${e.sfondo === s.id ? "scelto" : ""}" data-esp-sfondo="${s.id}" title="${q(s.nome)}">
                <img src="${q(s.file)}" alt="" loading="lazy" /><span>${s.nome}</span>
            </button>`).join("") +
            `<button type="button" class="pg-esp-sfondo pg-esp-niente ${e.sfondo ? "" : "scelto"}" data-esp-sfondo=""><span>Nessuno sfondo</span></button>`;
        const boxM = document.getElementById("pg-esp-musiche");
        boxM.innerHTML = (BIB.musiche || []).map(m => `
            <button type="button" class="pg-esp-musica ${e.musica === m.id ? "scelto" : ""}" data-esp-musica="${m.id}">♪ ${m.nome}</button>`).join("") +
            `<button type="button" class="pg-esp-musica ${e.musica ? "" : "scelto"}" data-esp-musica="">🔇 Silenzio</button>`;
        // il clic applica SUBITO (anteprima dal vivo). NB: nessun ri-clic-deseleziona — per
        // togliere si usa «Silenzio»/«Nessuno sfondo», altrimenti si spegne la musica per sbaglio
        boxS.querySelectorAll("[data-esp-sfondo]").forEach(b => b.addEventListener("click", () => {
            espStato().sfondo = b.dataset.espSfondo;
            renderEspScelte(); applicaEsperienza(); salvaDebounce();
        }));
        boxM.querySelectorAll("[data-esp-musica]").forEach(b => b.addEventListener("click", () => {
            const e2 = espStato();
            e2.musica = b.dataset.espMusica;
            renderEspScelte(); applicaEsperienza();
            if (e2.musica) avviaMusica();
            salvaDebounce();
        }));
    }
    function initEsperienza() {
        if (!document.getElementById("pg-esp-sfondi")) return;
        document.getElementById("pg-esp-apri").addEventListener("click", () => mostraPasso(0)); // 🎐 → torna al tè
        // volume e pausa/riprendi in testata
        const au = document.getElementById("pg-musica");
        const btnPlay = document.getElementById("pg-audio-play");
        const vol = document.getElementById("pg-audio-vol");
        vol.addEventListener("input", () => {
            espStato().volume = +vol.value;
            au.volume = +vol.value / 100;
            salvaDebounce();
        });
        btnPlay.addEventListener("click", () => { if (au.paused) avviaMusica(); else { segnaMusica(true); au.pause(); } });
        au.addEventListener("play", () => { btnPlay.textContent = "⏸"; });
        au.addEventListener("pause", () => { btnPlay.textContent = "▶"; });
        btnPlay.textContent = "▶";
        renderEspScelte();
        applicaEsperienza();
        // NIENTE musica in automatico al caricamento (decisione utente): parte solo quando la scegli nel tè o premi ▶
    }

    // ───────── ↺ resetta: la scheda torna vuota (come un PG appena creato) ─────────
    // NB tenere allineato allo stato iniziale di Pages/Pg/Index.OnPostCrea
    const statoIniziale = () => ({
        versione: 1,
        identita: { cognome: "", nome: "", kanji: "", eta: "", genere: "", ruolo: "", grado: "", anniServizio: "", quartiere: "", via: "", telefono: "", cellulare: "", pocketBell: "", altroContatto: "" },
        attributi: { "Distacco": 4, "Pazienza": 4, "Silenzio": 4, "Lucidità": 4, "Ascolto": 4, "Presenza": 4 },
        ki: { dadi: null, ritirato: false, extra: 0 },
        gouId: "",
        senmon: [{ id: "lotta", grado: 1, usi: 0, diBase: true }],
        descrizioneFisica: "", ritratto: "", chiSei: "",
        kage: { archetipo: "", problema: "", png: "", persone: [] },
        esperienza: { sfondo: "", musica: "", volume: 60, scelto: false },
        enja: [{ cognome: "", nome: "", eta: "", relazione: "", en: "", comeConosciuti: "", cosaSa: "", aspetto: "", ritratto: "" }],
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
            await salvaOra();
            location.reload();
        });
    }

    // ───────── menù modello/ragionamento (condivisi col wizard-avventure) ─────────
    function initModelloAI() {
        const selM = document.getElementById("wz-modello-ai");
        const selE = document.getElementById("wz-effort-ai");
        if (!selM) return;
        if ([...selM.options].some(o => o.value === modelloAI() && !o.disabled)) selM.value = modelloAI();
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
        initCarattereAI();
        initIdentita();
        initNomi();
        initRitratto();
        initScene();
        initEnja();
        initSquadra();
        initShugyoInput();
        initKage();
        initKagePersone();
        initEsperienza();
        initReset();
        initModelloAI();
        initNav();
        mostraPasso(passoCorrente);
    })();
})();
