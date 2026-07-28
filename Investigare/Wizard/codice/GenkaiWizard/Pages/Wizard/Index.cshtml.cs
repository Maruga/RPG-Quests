using System.IO.Compression;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Nodes;
using GenkaiWizard.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace GenkaiWizard.Pages.Wizard;

[Authorize]
public class IndexModel : PageModel
{
    private readonly ApplicationDbContext _db;
    private readonly Services.AnthropicService _ai;
    private readonly Services.ImmaginiService _img;
    private readonly Services.Biblioteche _bib;
    private readonly IWebHostEnvironment _env;
    public IndexModel(ApplicationDbContext db, Services.AnthropicService ai, Services.ImmaginiService img, Services.Biblioteche bib, IWebHostEnvironment env)
    {
        _db = db;
        _ai = ai;
        _img = img;
        _bib = bib;
        _env = env;
    }

    public ProgettoAvventura Progetto { get; set; } = default!;
    public int Passo { get; set; }
    public bool AiAttiva => _ai.Attivo;
    public bool ImmaginiAttive => _img.Attivo;

    /// <summary>
    /// Schermate del wizard, mostrate all'utente numerate da 1.
    /// L'indice interno (URL, WIZ.passo) resta 0-based; i partial e le chiavi di stato
    /// restano legati ai passi del metodo (passo1..passo11) e NON cambiano.
    /// </summary>
    public static readonly (string Titolo, string Partial)[] Schermate =
    {
        ("La cornice",                   "_Passo0"),         // mostrato: 1
        ("Come è morto",                 "_Passo1"),         // 2
        ("Chi è morto",                  "_Passo2"),         // 3
        ("La vita della vittima",        "_Passo3"),         // 4
        ("L'assassino — chi ha ucciso",  "_Passo5"),         // 5
        ("Il mondo dell'assassino",      "_Passo6"),         // 6
        ("Perché è morta — il movente",  "_Passo4"),         // 7
        ("Gruppi, relazioni ed En",      "_PassoRelazioni"), // 8
        ("I luoghi del caso",            "_PassoLuoghi"),    // 9
        ("La cronistoria",               "_Passo7"),         // 10
        ("Le schede personaggio",        "_Passo8"),         // 11
        ("Le informazioni — chi sa cosa", "_Passo9"),        // 12
        ("Gli handout",                  "_Passo10"),        // 13
        ("Il calendario vivo",           "_Passo11"),        // 14
        ("Riepilogo ed export",          "_Passo12")         // 15
    };

    public const int UltimaSchermata = 14; // indice interno dell'ultima (mostrata come 15)

    private string Uid => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    public async Task<IActionResult> OnGetAsync(Guid id, int passo = 0)
    {
        var p = await _db.Progetti.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == Uid);
        if (p is null) return NotFound();

        Progetto = p;
        Passo = Math.Clamp(passo, 0, UltimaSchermata);
        return Page();
    }

    /// <summary>
    /// Export dossier: uno ZIP con Riepilogo.md leggibile + cartelle PNG/Luoghi/Handout e
    /// Informazioni/Cronistoria/Gruppi_e_Relazioni/Calendario. È il documento del GM (contiene la soluzione).
    /// </summary>
    public async Task<IActionResult> OnGetExportAsync(Guid id)
    {
        var p = await _db.Progetti.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == Uid);
        if (p is null) return NotFound();

        var st = JsonNode.Parse(p.StatoJson) as JsonObject ?? new JsonObject();
        var cast      = st["cast"]              as JsonArray ?? new JsonArray();
        var luoghi    = st["luoghi"]            as JsonArray ?? new JsonArray();
        var gruppi    = st["gruppi"]            as JsonArray ?? new JsonArray();
        var relazioni = st["relazioni"]         as JsonArray ?? new JsonArray();
        var schede    = st["passo8"]?["schede"] as JsonArray ?? new JsonArray();
        var tracce    = st["passo9"]?["tracce"] as JsonArray ?? new JsonArray();
        var eventi    = st["passo7"]?["eventi"] as JsonArray ?? new JsonArray();
        var handout   = st["passo10"]?["handout"] as JsonArray ?? new JsonArray();
        var giorni    = st["passo11"]?["giorni"]  as JsonArray ?? new JsonArray();
        var colpevoli = new HashSet<string>((st["passo5"]?["colpevoliIds"] as JsonArray ?? new JsonArray())
            .Select(n => Str(n)).Where(s => s.Length > 0));

        // risoluzioni che dipendono dallo stato
        string nomePersona(string? pid)
        {
            var c = cast.FirstOrDefault(x => Str(x?["id"]) == pid);
            if (c is null) return pid ?? "";
            var nm = ($"{Str(c["cognome"])} {Str(c["nome"])}").Trim();
            return nm.Length > 0 ? nm : (pid ?? "");
        }
        string nomeLuogoById(string? lid)
        {
            var l = luoghi.FirstOrDefault(x => Str(x?["id"]) == lid);
            if (l is null) return lid ?? "";
            var nm = Str(l["nome"]); if (nm.Length > 0) return nm;
            var via = Str(l["via"]); return via.Length > 0 ? via : (lid ?? "");
        }
        string nomeAttore(string? aid)
        {
            if (string.IsNullOrWhiteSpace(aid)) return "";
            if (cast.Any(x => Str(x?["id"]) == aid)) return nomePersona(aid);
            var g = gruppi.FirstOrDefault(x => Str(x?["id"]) == aid);
            return g != null ? Str(g["nome"]) : aid!;
        }
        string ruoloLabel(string? r) => r switch
        {
            "vittima" => "la vittima", "colpevole" => "il colpevole", "complice" => "complice",
            "testimone" => "testimone", "falsaPista" => "falsa pista", "contorno" => "contorno", _ => (r ?? "")
        };
        string leggibile(JsonNode? n)
        {
            if (n is JsonValue vv) return Str(vv);
            if (n is JsonArray a)
            {
                var sb2 = new StringBuilder();
                foreach (var it in a)
                    if (it is JsonObject io)
                        sb2.AppendLine("- " + string.Join(" · ", io.Where(kv => kv.Value is JsonValue).Select(kv => Str(kv.Value)).Where(x => x.Length > 0)));
                    else sb2.AppendLine("- " + Str(it));
                return sb2.ToString().TrimEnd();
            }
            if (n is JsonObject o)
                return string.Join("\n", o.Where(kv => kv.Value is JsonValue && Str(kv.Value).Length > 0).Select(kv => $"- **{kv.Key}**: {Str(kv.Value)}"));
            return "";
        }
        // liste di persone (passo3 famiglia/lavoro/…): risolve l'id → nome, il resto è la relazione
        string personaList(JsonNode? n)
        {
            if (n is not JsonArray a) return leggibile(n);
            var sb2 = new StringBuilder();
            foreach (var it in a)
            {
                if (it is JsonObject io)
                {
                    var scalari = io.Where(kv => kv.Value is JsonValue).Select(kv => Str(kv.Value)).Where(v => v.Length > 0).ToList();
                    var refId = scalari.FirstOrDefault(v => cast.Any(c => Str(c?["id"]) == v));
                    var nm = refId != null ? nomePersona(refId) : "";
                    var altri = scalari.Where(v => v != refId).ToList();
                    var line = ((nm.Length > 0 ? nm : "") + (altri.Count > 0 ? (nm.Length > 0 ? " — " : "") + string.Join(" · ", altri) : "")).Trim();
                    if (line.Length > 0) sb2.AppendLine("- " + line);
                }
                else if (Str(it).Length > 0) sb2.AppendLine("- " + Str(it));
            }
            return sb2.ToString().TrimEnd();
        }
        // problemi/false piste (passo3.problemi): il testo + eventuale marcatore falsa pista
        string problemiList(JsonNode? n)
        {
            if (n is not JsonArray a) return leggibile(n);
            var sb2 = new StringBuilder();
            foreach (var it in a)
            {
                if (it is JsonObject io)
                {
                    var testo = io.Where(kv => kv.Value is JsonValue jv && jv.TryGetValue<string>(out _)).Select(kv => Str(kv.Value)).OrderByDescending(x => x.Length).FirstOrDefault() ?? "";
                    var falsa = io.Any(kv => Bool(kv.Value));
                    if (testo.Length > 0) sb2.AppendLine($"- {testo}{(falsa ? " *(falsa pista)*" : "")}");
                }
                else if (Str(it).Length > 0) sb2.AppendLine("- " + Str(it));
            }
            return sb2.ToString().TrimEnd();
        }

        var titolo = string.IsNullOrWhiteSpace(p.Titolo) ? "Caso GENKAI" : p.Titolo.Trim();
        var files = new List<(string Path, string Content)>();

        // ═══════════ Riepilogo.md ═══════════
        var R = new StringBuilder();
        R.AppendLine($"# {titolo}"); R.AppendLine();
        R.AppendLine("> **Dossier del GM** — contiene la soluzione del caso. Non mostrarlo ai giocatori.");
        R.AppendLine("> Generato con il Wizard GENKAI. Le cartelle di dettaglio (PNG, Luoghi, Handout…) sono elencate in fondo.");
        R.AppendLine();

        if (st["setup"] is JsonObject setup)
        {
            R.AppendLine("## La cornice"); R.AppendLine();
            var q = NomeCat("luoghi", "quartieri", Str(setup["quartiere"]));
            if (Str(setup["ambientazione"]).Length > 0) R.AppendLine($"- **Ambientazione**: {Str(setup["ambientazione"])}");
            if (q.Length > 0) R.AppendLine($"- **Quartiere**: {q}");
            if (Str(setup["durata"]).Length > 0) R.AppendLine($"- **Durata**: {Str(setup["durata"])}");
            if (Str(setup["complessita"]).Length > 0) R.AppendLine($"- **Complessità**: {Str(setup["complessita"])}");
            if (Str(setup["note"]).Length > 0) { R.AppendLine(); R.AppendLine(Str(setup["note"])); }
            R.AppendLine();
        }
        if (st["passo1"] is JsonObject q1)
        {
            R.AppendLine("## La morte"); R.AppendLine();
            if (Str(q1["rigaUnica"]).Length > 0) { R.AppendLine($"**{Str(q1["rigaUnica"])}**"); R.AppendLine(); }
            var tm = NomeCat("tipologie_omicidio", "tipologie", Str(q1["tipologiaId"]));
            var sm = NomeSottotipoMorte(Str(q1["tipologiaId"]), Str(q1["sottotipoId"]));
            if (tm.Length > 0) R.AppendLine($"- Tipo: {tm}{(sm.Length > 0 ? " — " + sm : "")}");
            R.AppendLine();
        }
        if (st["passo2"] is JsonObject q2)
        {
            R.AppendLine("## La vittima"); R.AppendLine();
            var vnome = nomePersona(Str(q2["personaId"]));
            var prof = NomeCat("professioni", "professioni", Str(q2["professioneId"]));
            if (vnome.Length > 0) R.AppendLine($"- **Chi**: {vnome}");
            if (prof.Length > 0) R.AppendLine($"- **Professione**: {prof}");
            if (Str(q2["postoNelMondo"]).Length > 0) R.AppendLine($"- **Posto nel mondo**: {Str(q2["postoNelMondo"])}");
            if (Str(q2["eta"]).Length > 0) R.AppendLine($"- **Età**: {Str(q2["eta"])}");
            if (Str(q2["genere"]).Length > 0) R.AppendLine($"- **Genere**: {Str(q2["genere"])}");
            R.AppendLine();
        }
        if (st["passo3"] is JsonObject q3)
        {
            var blocks = new (string lab, string body)[]
            {
                ("Famiglia", personaList(q3["famiglia"])),
                ("Lavoro", personaList(q3["lavoro"])),
                ("Amici", personaList(q3["amici"])),
                ("Altri", personaList(q3["altri"])),
                ("Luoghi", leggibile(q3["luoghi"])),
                ("Problemi", problemiList(q3["problemi"])),
            }.Where(t => t.body.Length > 0).ToList();
            if (blocks.Count > 0)
            {
                R.AppendLine("## La vita della vittima"); R.AppendLine();
                foreach (var (lab, body) in blocks) { R.AppendLine($"### {lab}"); R.AppendLine(body); R.AppendLine(); }
            }
        }
        if (st["passo5"] is JsonObject q5)
        {
            R.AppendLine("## L'assassino"); R.AppendLine();
            var nomiColp = colpevoli.Select(nomePersona).Where(s => s.Length > 0).ToList();
            R.AppendLine($"- **Colpevole**: {(nomiColp.Count > 0 ? string.Join(", ", nomiColp) : "*(non indicato)*")}");
            if (Str(q5["competenze"]).Length > 0) R.AppendLine($"- **Competenze**: {Str(q5["competenze"])}");
            if (Str(q5["erroreCoerente"]).Length > 0) R.AppendLine($"- **Errore coerente**: {Str(q5["erroreCoerente"])}");
            R.AppendLine();
        }
        if (st["passo6"] is JsonObject q6)
        {
            var parts6 = new[] { ("Connessione con la vittima", "connessioneVittima"), ("Dopo il fatto", "dopoIlFatto"), ("Intersezione", "intersezione") }
                .Select(t => (t.Item1, body: leggibile(q6[t.Item2]))).Where(t => t.body.Length > 0).ToList();
            if (parts6.Count > 0)
            {
                R.AppendLine("## Il mondo dell'assassino"); R.AppendLine();
                foreach (var (lab, body) in parts6) R.AppendLine($"- **{lab}**: {body}");
                R.AppendLine();
            }
        }
        if (st["passo4"] is JsonObject q4)
        {
            R.AppendLine("## Il movente"); R.AppendLine();
            var mv = NomeCat("moventi", "moventi", Str(q4["moventeId"]));
            if (mv.Length > 0) R.AppendLine($"- **Movente**: {mv}");
            if (Str(q4["descrizione"]).Length > 0) { R.AppendLine(); R.AppendLine(Str(q4["descrizione"])); }
            if (q4["esclusioni"] is JsonArray escl && escl.Count > 0)
            {
                R.AppendLine(); R.AppendLine("**Esclusi (false piste naturali):**");
                foreach (var e in escl)
                {
                    var per = Str(e?["perche"]);
                    R.AppendLine($"- {nomePersona(Str(e?["personaId"]))}{(per.Length > 0 ? " — " + per : "")}");
                }
            }
            R.AppendLine();
        }
        if (cast.Count > 0)
        {
            R.AppendLine("## Cast"); R.AppendLine();
            R.AppendLine("| Nome | Ruolo | Età | Professione |");
            R.AppendLine("|---|---|---|---|");
            foreach (var c in cast.OrderBy(x => nomePersona(Str(x?["id"]))))
                R.AppendLine($"| {nomePersona(Str(c?["id"]))}{(colpevoli.Contains(Str(c?["id"])) ? " ⚠" : "")} | {ruoloLabel(Str(c?["ruoloNelCaso"]))} | {Str(c?["eta"])} | {Str(c?["professione"])} |");
            R.AppendLine();
        }
        if (luoghi.Count > 0)
        {
            R.AppendLine("## Luoghi"); R.AppendLine();
            R.AppendLine("| Luogo | Quartiere | Tipo |");
            R.AppendLine("|---|---|---|");
            foreach (var l in luoghi.OrderBy(x => Str(x?["nome"])))
                R.AppendLine($"| {Str(l?["nome"])} | {NomeCat("luoghi", "quartieri", Str(l?["quartiere"]))} | {NomeCat("luoghi", "tipologie", Str(l?["tipologiaId"]))} |");
            R.AppendLine();
        }
        R.AppendLine("## Dettagli (cartelle e file)"); R.AppendLine();
        R.AppendLine("- **PNG/** — una scheda per personaggio (verità del GM)");
        R.AppendLine("- **Luoghi/** — una scheda per luogo");
        R.AppendLine("- **Handout/** — i documenti per i giocatori (`.html` apribili) + `_Indice.md`");
        R.AppendLine("- **Informazioni.md** — chi sa cosa (informazioni multi-fonte)");
        R.AppendLine("- **Cronistoria.md** — la verità in ordine (prima / il fatto / dopo)");
        R.AppendLine("- **Gruppi_e_Relazioni.md** — gruppi, distretti, relazioni ed En");
        R.AppendLine("- **Calendario.md** — il calendario vivo");
        files.Add(("Riepilogo.md", R.ToString()));

        // ═══════════ PNG/ ═══════════
        int pi = 0;
        foreach (var c in cast.OrderBy(x => nomePersona(Str(x?["id"]))))
        {
            pi++;
            var pid = Str(c?["id"]);
            var s = schede.FirstOrDefault(x => Str(x?["personaId"]) == pid) as JsonObject;
            var nm = nomePersona(pid);
            var kanji = Str(c?["kanji"]);
            var B = new StringBuilder();
            B.AppendLine($"# {nm}{(kanji.Length > 0 ? " " + kanji : "")} — {ruoloLabel(Str(c?["ruoloNelCaso"]))}{(colpevoli.Contains(pid) ? " ⚠" : "")}");
            B.AppendLine(); B.AppendLine("> Scheda del GM — contiene la verità del personaggio."); B.AppendLine();
            var ana = new List<string>();
            if (Str(c?["eta"]).Length > 0) ana.Add($"**Età**: {Str(c?["eta"])}");
            if (Str(c?["genere"]).Length > 0) ana.Add($"**Genere**: {Str(c?["genere"])}");
            if (Str(c?["professione"]).Length > 0) ana.Add($"**Professione**: {Str(c?["professione"])}");
            if (Str(c?["postoNelMondo"]).Length > 0) ana.Add($"**Posto nel mondo**: {Str(c?["postoNelMondo"])}");
            if (ana.Count > 0) { B.AppendLine(string.Join(" · ", ana)); B.AppendLine(); }
            if (s != null)
            {
                void Sez(string tit, string? txt) { if (!string.IsNullOrWhiteSpace(txt)) { B.AppendLine($"## {tit}"); B.AppendLine(); B.AppendLine(txt); B.AppendLine(); } }
                Sez("Descrizione fisica", Str(s["descrizioneFisica"]));
                Sez("Cosa sa", Str(s["cosaSa"]));
                Sez("Cosa non sa", Str(s["cosaNonSa"]));
                Sez("Cosa ha fatto (verità)", Str(s["cosaHaFatto"]));
                Sez("Comportamento (cosa nasconde e perché)", Str(s["comportamento"]));
                if (s["trigger"] is JsonArray trg && trg.Count > 0)
                {
                    B.AppendLine("## Trigger"); B.AppendLine();
                    foreach (var t in trg) { var se = Str(t?["se"]); var al = Str(t?["allora"]); if (se.Length + al.Length > 0) B.AppendLine(al.Length > 0 ? $"- **Se** {se} → {al}" : $"- **Se** {se}"); }
                    B.AppendLine();
                }
                if (s["voce"] is JsonObject voce && voce.Any(kv => Str(kv.Value).Length > 0))
                {
                    B.AppendLine("## Come parla (voce)"); B.AppendLine();
                    foreach (var (lab, key) in new[] { ("Intercalare", "intercalare"), ("Marcatore", "marcatore"), ("Appellativo", "appellativo"), ("Abitudine", "abitudine"), ("Saluto", "saluto"), ("Rifiuto", "rifiuto"), ("Minaccia", "minaccia") })
                        if (Str(voce[key]).Length > 0) B.AppendLine($"- **{lab}**: {Str(voce[key])}");
                    B.AppendLine();
                }
                if (s["tratti"] is JsonObject tratti && tratti.Any(kv => Str(kv.Value).Length > 0))
                {
                    B.AppendLine("## Tratti"); B.AppendLine();
                    foreach (var (lab, key) in new[] { ("Vizio", "vizio"), ("Tic", "tic"), ("Oggetto", "oggetto") })
                        if (Str(tratti[key]).Length > 0) B.AppendLine($"- **{lab}**: {Str(tratti[key])}");
                    B.AppendLine();
                }
                if (s["contatti"] is JsonObject cont)
                {
                    var cc = new List<string>();
                    var resId = Str(cont["residenzaLuogoId"]);
                    if (resId.Length > 0) cc.Add($"**Residenza**: {nomeLuogoById(resId)}");
                    else if (Str(cont["residenza"]).Length > 0) cc.Add($"**Residenza**: {Str(cont["residenza"])}");
                    foreach (var (lab, key) in new[] { ("Telefono", "telefono"), ("Cellulare", "cellulare"), ("Email", "email"), ("Altro", "altro"), ("Dove trovarlo", "dove") })
                        if (Str(cont[key]).Length > 0) cc.Add($"**{lab}**: {Str(cont[key])}");
                    if (cc.Count > 0) { B.AppendLine("## Contatti e reperibilità"); B.AppendLine(); foreach (var x in cc) B.AppendLine($"- {x}"); B.AppendLine(); }
                }
                if (s["stats"] is JsonObject stt && stt.Any(kv => kv.Key != "esempio" && Str(kv.Value).Length > 0))
                { B.AppendLine("## Statistiche"); B.AppendLine(); B.AppendLine(string.Join(" · ", stt.Where(kv => kv.Key != "esempio" && Str(kv.Value).Length > 0).Select(kv => $"{kv.Key} {Str(kv.Value)}"))); B.AppendLine(); }
                if (s["statsEnte"] is JsonObject ste && ste.Any(kv => kv.Key != "esempio" && Str(kv.Value).Length > 0))
                { B.AppendLine("## Scheda ente"); B.AppendLine(); B.AppendLine(string.Join(" · ", ste.Where(kv => kv.Key != "esempio" && Str(kv.Value).Length > 0).Select(kv => $"{kv.Key} {Str(kv.Value)}"))); B.AppendLine(); }
                Sez("Deposizione", Str(s["deposizione"]));
            }
            files.Add(($"PNG/{pi:00}_{Slug(nm)}.md", B.ToString()));
        }

        // ═══════════ Luoghi/ ═══════════
        int li = 0;
        foreach (var l in luoghi.OrderBy(x => Str(x?["nome"])))
        {
            li++;
            var nm = Str(l?["nome"]); if (nm.Length == 0) nm = "Luogo " + li;
            var via = Str(l?["via"]);
            var B = new StringBuilder();
            B.AppendLine($"# {nm}{(via.Length > 0 ? " — " + via : "")}"); B.AppendLine();
            var q = NomeCat("luoghi", "quartieri", Str(l?["quartiere"]));
            var tp = NomeCat("luoghi", "tipologie", Str(l?["tipologiaId"]));
            if (q.Length > 0) B.AppendLine($"**Quartiere**: {q}");
            if (tp.Length > 0) B.AppendLine($"**Tipo**: {tp}");
            if (Bool(l?["segretoPG"])) B.AppendLine("**⚠ Nascosto ai giocatori**");
            B.AppendLine();
            if (Str(l?["cosaSiVede"]).Length > 0) { B.AppendLine("## Cosa si vede"); B.AppendLine(); B.AppendLine(Str(l?["cosaSiVede"])); B.AppendLine(); }
            if (Str(l?["cosaSiTrova"]).Length > 0) { B.AppendLine("## Cosa si trova (tracce)"); B.AppendLine(); B.AppendLine(Str(l?["cosaSiTrova"])); B.AppendLine(); }
            if (Str(l?["chiCe"]).Length > 0) { B.AppendLine("## Chi c'è"); B.AppendLine(); B.AppendLine(Str(l?["chiCe"])); B.AppendLine(); }
            if (Str(l?["personaId"]).Length > 0) B.AppendLine($"*Collegato a: {nomePersona(Str(l?["personaId"]))}*");
            files.Add(($"Luoghi/{li:00}_{Slug(nm)}.md", B.ToString()));
        }

        // ═══════════ Handout/ ═══════════
        var css = "";
        try { var cssPath = Path.Combine(_env.WebRootPath, "css", "handout.css"); if (System.IO.File.Exists(cssPath)) css = await System.IO.File.ReadAllTextAsync(cssPath); } catch { }
        var idxH = new StringBuilder();
        idxH.AppendLine("# Handout — indice"); idxH.AppendLine();
        idxH.AppendLine("I documenti da dare ai giocatori. Gli `.html` si aprono e si stampano dal browser."); idxH.AppendLine();
        int hi = 0;
        foreach (var h in handout)
        {
            hi++;
            var tit = Str(h?["titolo"]); if (tit.Length == 0) tit = "Handout " + hi;
            var contenuto = Str(h?["contenuto"]);
            idxH.AppendLine($"- **{tit}** — {(Str(h?["tipo"]).Length > 0 ? Str(h?["tipo"]) : "documento")}{(Str(h?["descrizione"]).Length > 0 ? " · " + Str(h?["descrizione"]) : "")}{(contenuto.Trim().Length == 0 ? " · *(da generare)*" : "")}");
            if (contenuto.Trim().Length > 0)
            {
                var full = $"<!doctype html><html lang=\"it\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><title>{System.Net.WebUtility.HtmlEncode(tit)}</title><style>\n{css}\n</style></head><body style=\"background:#8a8578;margin:0;padding:16px\">\n{contenuto}\n</body></html>";
                files.Add(($"Handout/{hi:00}_{Slug(tit)}.html", full));
            }
        }
        files.Add(("Handout/_Indice.md", idxH.ToString()));

        // ═══════════ Informazioni.md ═══════════
        var I = new StringBuilder();
        I.AppendLine("# Informazioni — chi sa cosa"); I.AppendLine();
        I.AppendLine("> Le informazioni del caso e le loro fonti (chi le dà, come si ottengono). Documento del GM."); I.AppendLine();
        foreach (var t in tracce)
        {
            var nome = Str(t?["nome"]); if (nome.Length == 0) nome = "(senza nome)";
            I.AppendLine($"## {nome}"); I.AppendLine();
            if (Str(t?["testo"]).Length > 0) { I.AppendLine(Str(t?["testo"])); I.AppendLine(); }
            if (Str(t?["classificazione"]).Length > 0) I.AppendLine($"*Classificazione: {Str(t?["classificazione"])}*");
            if (t?["fonti"] is JsonArray fonti && fonti.Count > 0)
            {
                I.AppendLine(); I.AppendLine("**Fonti:**");
                foreach (var f in fonti)
                {
                    var chi = nomeAttore(Str(f?["attoreId"])); if (chi.Length == 0) chi = Str(f?["canale"]);
                    var ric = Str(f?["richiede"]); var ver = Str(f?["versione"]);
                    I.AppendLine($"- {(chi.Length > 0 ? chi : "?")}{(ric.Length > 0 && ric != "nulla" ? $" (serve: {ric})" : "")}{(Bool(f?["handout"]) ? " 📄" : "")}{(ver.Length > 0 ? $" — «{ver}»" : "")}");
                }
            }
            I.AppendLine();
        }
        if (tracce.Count == 0) I.AppendLine("*(nessuna informazione)*");
        files.Add(("Informazioni.md", I.ToString()));

        // ═══════════ Cronistoria.md ═══════════
        var Cr = new StringBuilder();
        Cr.AppendLine("# Cronistoria — la verità in ordine"); Cr.AppendLine();
        Cr.AppendLine("> La sequenza reale dei fatti (prima / il fatto / dopo). Documento del GM."); Cr.AppendLine();
        foreach (var (faseLab, fase) in new[] { ("Prima", "prima"), ("Il fatto", "fatto"), ("Dopo", "dopo") })
        {
            var evF = eventi.Where(e => Str(e?["fase"]) == fase).ToList();
            if (evF.Count == 0) continue;
            Cr.AppendLine($"## {faseLab}"); Cr.AppendLine();
            foreach (var e in evF)
            {
                var quando = Str(e?["quando"]); var qf = Str(e?["quandoFine"]);
                var when = quando + (qf.Length > 0 ? "–" + qf : "");
                Cr.AppendLine($"**{(when.Length > 0 ? when : "—")}** — {Str(e?["testo"])}");
                var det = new List<string>();
                var pers = (e?["personeIds"] as JsonArray)?.Select(x => nomePersona(Str(x))).Where(s => s.Length > 0).ToList() ?? new List<string>();
                if (pers.Count > 0) det.Add("chi: " + string.Join(", ", pers));
                if (Str(e?["luogoId"]).Length > 0) det.Add("dove: " + nomeLuogoById(Str(e?["luogoId"])));
                var trg = (e?["generaTraccia"] as JsonArray)?.Select(x => Str(x)).Where(s => s.Length > 0).ToList() ?? new List<string>();
                if (trg.Count > 0) det.Add("traccia: " + string.Join(", ", trg));
                if (det.Count > 0) Cr.AppendLine($"  <br>*({string.Join(" · ", det)})*");
                Cr.AppendLine();
            }
        }
        if (eventi.Count == 0) Cr.AppendLine("*(cronistoria non compilata)*");
        files.Add(("Cronistoria.md", Cr.ToString()));

        // ═══════════ Gruppi_e_Relazioni.md ═══════════
        var G = new StringBuilder();
        G.AppendLine("# Gruppi, distretti e relazioni"); G.AppendLine();
        if (gruppi.Count > 0)
        {
            G.AppendLine("## Gruppi e distretti"); G.AppendLine();
            foreach (var g in gruppi)
            {
                var nm = Str(g?["nome"]); if (nm.Length == 0) continue;
                G.AppendLine($"### {nm}{(Bool(g?["segretoPG"]) ? " ⚠ (nascosto ai PG)" : "")}");
                var meta = new List<string>();
                if (Str(g?["tipo"]).Length > 0) meta.Add(Str(g?["tipo"]));
                if (Str(g?["zona"]).Length > 0) meta.Add("zona: " + Str(g?["zona"]));
                if (meta.Count > 0) G.AppendLine("*" + string.Join(" · ", meta) + "*");
                if (Str(g?["descrizione"]).Length > 0) { G.AppendLine(); G.AppendLine(Str(g?["descrizione"])); }
                var membri = (g?["membriIds"] as JsonArray)?.Select(x => nomePersona(Str(x))).Where(s => s.Length > 0).ToList() ?? new List<string>();
                if (membri.Count > 0) { G.AppendLine(); G.AppendLine("Membri: " + string.Join(", ", membri)); }
                G.AppendLine();
            }
        }
        if (relazioni.Count > 0)
        {
            G.AppendLine("## Relazioni ed En"); G.AppendLine();
            foreach (var r in relazioni)
            {
                var a = nomePersona(Str(r?["aId"])); var b = nomePersona(Str(r?["bId"]));
                if (a.Length == 0 || b.Length == 0) continue;
                var tipo = Str(r?["tipo"]);
                var enAB = Str(r?["enAB"]); var enBA = Str(r?["enBA"]);
                var en = (enAB.Length > 0 || enBA.Length > 0) ? $" — En {a}→{b}: {(enAB.Length > 0 ? enAB : "0")}, {b}→{a}: {(enBA.Length > 0 ? enBA : "0")}" : "";
                G.AppendLine($"- **{a} ↔ {b}**{(tipo.Length > 0 ? ": " + tipo : "")}{en}");
            }
            G.AppendLine();
        }
        if (gruppi.Count == 0 && relazioni.Count == 0) G.AppendLine("*(nessun gruppo o relazione)*");
        files.Add(("Gruppi_e_Relazioni.md", G.ToString()));

        // ═══════════ Calendario.md ═══════════
        var Ca = new StringBuilder();
        Ca.AppendLine("# Calendario vivo"); Ca.AppendLine();
        Ca.AppendLine("> Cosa succede giorno per giorno, che i PG guardino o no. Documento del GM."); Ca.AppendLine();
        foreach (var d in giorni.OrderBy(x => { int.TryParse(Str(x?["giorno"]), out var gg); return gg; }))
        {
            var mom = Str(d?["momento"]);
            Ca.AppendLine($"**Giorno {Str(d?["giorno"])}{(mom.Length > 0 ? " · " + mom : "")}** — {Str(d?["evento"])}");
            if (Str(d?["condizione"]).Length > 0) Ca.AppendLine($"  <br>*Condizione: {Str(d?["condizione"])}*");
            var pers = (d?["personeIds"] as JsonArray)?.Select(x => nomePersona(Str(x))).Where(s => s.Length > 0).ToList() ?? new List<string>();
            if (pers.Count > 0) Ca.AppendLine($"  <br>*Chi: {string.Join(", ", pers)}*");
            Ca.AppendLine();
        }
        if (giorni.Count == 0) Ca.AppendLine("*(calendario non compilato)*");
        files.Add(("Calendario.md", Ca.ToString()));

        // ═══════════ ZIP ═══════════
        var cartella = FileSafe(titolo);
        using var msZip = new MemoryStream();
        using (var zip = new ZipArchive(msZip, ZipArchiveMode.Create, true))
            foreach (var (path, content) in files)
            {
                var entry = zip.CreateEntry($"{cartella}/{path}", CompressionLevel.Optimal);
                await using var es = new StreamWriter(entry.Open(), new UTF8Encoding(false));
                await es.WriteAsync(content);
            }
        return File(msZip.ToArray(), "application/zip", $"{cartella}.zip");
    }

    // ── helper per l'export ──
    private static string Str(JsonNode? n) =>
        n is JsonValue v && v.TryGetValue<string>(out var s) ? s : (n?.ToString() ?? "");
    private static bool Bool(JsonNode? n) => n is JsonValue v && v.TryGetValue<bool>(out var b) && b;
    private static string FileSafe(string s)
    {
        foreach (var c in Path.GetInvalidFileNameChars()) s = s.Replace(c, ' ');
        s = s.Trim();
        return s.Length == 0 ? "Caso GENKAI" : s;
    }
    private static string Slug(string s)
    {
        var norm = (s ?? "").Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder();
        foreach (var ch in norm)
            if (System.Globalization.CharUnicodeInfo.GetUnicodeCategory(ch) != System.Globalization.UnicodeCategory.NonSpacingMark)
                sb.Append(ch);
        var r = System.Text.RegularExpressions.Regex.Replace(sb.ToString(), "[^a-z0-9]+", "_").Trim('_');
        return r.Length == 0 ? "x" : r;
    }
    private string NomeCat(string bib, string arrayKey, string? id)
    {
        if (string.IsNullOrWhiteSpace(id)) return "";
        try
        {
            if (_bib.HaLib(bib) && _bib.Lib(bib)[arrayKey] is JsonArray arr)
                foreach (var it in arr) if (Str(it?["id"]) == id) return Str(it?["nome"]);
        }
        catch { }
        return id!;
    }
    private string NomeSottotipoMorte(string? tipoId, string? sottoId)
    {
        if (string.IsNullOrWhiteSpace(sottoId)) return "";
        try
        {
            if (_bib.Lib("tipologie_omicidio")["tipologie"] is JsonArray arr)
                foreach (var t in arr)
                    if (Str(t?["id"]) == tipoId && t?["sottotipi"] is JsonArray subs)
                        foreach (var su in subs) if (Str(su?["id"]) == sottoId) return Str(su?["nome"]);
        }
        catch { }
        return sottoId!;
    }
}
