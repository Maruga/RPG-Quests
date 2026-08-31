using System.Security.Claims;
using System.Text.Json.Nodes;
using GenkaiWizard.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace GenkaiWizard.Pages.Pg;

/// <summary>Vista stampabile della scheda PG (HTML, window.print → PDF).</summary>
public class StampaModel : PageModel
{
    private IConfiguration _cfg = default!;
    /// <summary>Avanzamento spento di default (Funzioni:Crescita = "si" per riaccenderlo).</summary>
    public bool CrescitaAttiva => string.Equals(_cfg["Funzioni:Crescita"], "si", StringComparison.OrdinalIgnoreCase);
    private readonly ApplicationDbContext _db;
    private readonly Services.Biblioteche _bib;
    public StampaModel(ApplicationDbContext db, Services.Biblioteche bib, IConfiguration cfg) { _db = db; _bib = bib;  _cfg = cfg; }

    public Personaggio Pg { get; set; } = default!;
    public JsonObject St { get; set; } = new();

    private string Uid => Services.Ospite.ChiUsa(HttpContext);

    public async Task<IActionResult> OnGetAsync(Guid id)
    {
        var pg = await _db.Personaggi.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == Uid);
        if (pg is null) return NotFound();
        Response.Headers.CacheControl = "no-store"; // la scheda cambia: mai servirla dalla cache del browser
        Pg = pg;
        St = JsonNode.Parse(pg.StatoJson) as JsonObject ?? new JsonObject();
        return Page();
    }

    // ── helper per la vista ──
    public string S(string path)
    {
        JsonNode? n = St;
        foreach (var k in path.Split('.')) { n = n?[k]; if (n is null) return ""; }
        return n is JsonValue v && v.TryGetValue<string>(out var s) ? s : n?.ToString() ?? "";
    }
    public int? N(string path)
    {
        JsonNode? n = St;
        foreach (var k in path.Split('.')) { n = n?[k]; if (n is null) return null; }
        return n is JsonValue v && v.TryGetValue<int>(out var i) ? i : (int.TryParse(n?.ToString(), out var p) ? p : null);
    }

    public JsonObject? Gou()
    {
        var id = S("gouId");
        if (string.IsNullOrEmpty(id) || !_bib.HaLib("gou")) return null;
        return (_bib.Lib("gou")["gou"] as JsonArray)?
            .FirstOrDefault(g => g?["id"]?.GetValue<string>() == id) as JsonObject;
    }

    public JsonObject? SenmonVoce(string id)
    {
        if (!_bib.HaLib("senmon")) return null;
        return (_bib.Lib("senmon")["senmon"] as JsonArray)?
            .FirstOrDefault(g => g?["id"]?.GetValue<string>() == id) as JsonObject;
    }

    /// <summary>true se al grado 3 la voce usa «−2 con Correzione» (eccezione della voce o maestro di famiglia «+2C»).</summary>
    public bool G3Correzione(JsonObject? voce)
    {
        if (voce is null) return false;
        var ecc = voce["maestroEccezione"]?.GetValue<string>();
        if (!string.IsNullOrEmpty(ecc)) return ecc == "+2C";
        if (!_bib.HaLib("senmon")) return false;
        var fam = voce["famiglia"]?.GetValue<string>();
        var f = (_bib.Lib("senmon")["famiglie"] as JsonArray)?
            .FirstOrDefault(x => x?["id"]?.GetValue<string>() == fam) as JsonObject;
        return f?["maestro"]?.GetValue<string>() == "+2C";
    }

    public int? KiMax()
    {
        if (St["attributi"] is not JsonObject at || St["ki"] is not JsonObject ki || ki["dadi"] is not JsonArray dadi || dadi.Count == 0)
            return null;
        var min = at.Select(kv => kv.Value?.GetValue<int>() ?? 4).Min();
        var alto = dadi.Select(d => d?.GetValue<int>() ?? 0).Max();
        var extra = ki["extra"]?.GetValue<int>() ?? 0;
        return Math.Min(12, min + alto + extra);
    }
}
