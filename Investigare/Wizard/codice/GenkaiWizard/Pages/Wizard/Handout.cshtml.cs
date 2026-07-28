using System.Security.Claims;
using System.Text.Json.Nodes;
using GenkaiWizard.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace GenkaiWizard.Pages.Wizard;

/// <summary>Editor grafico di un singolo handout: anteprima A4, modifica visuale/HTML, immagini, stampa.</summary>
[Authorize]
public class HandoutModel : PageModel
{
    private readonly ApplicationDbContext _db;
    private readonly Services.AnthropicService _ai;
    public HandoutModel(ApplicationDbContext db, Services.AnthropicService ai) { _db = db; _ai = ai; }

    public Guid ProgettoId { get; set; }
    public string HandoutId { get; set; } = "";
    public string Titolo { get; set; } = "Handout";
    public string Tipo { get; set; } = "";
    public string ContenutoHtml { get; set; } = "";
    public string VersioniJson { get; set; } = "[]"; // ultime versioni (backup) come JSON per il client
    public int Torna { get; set; } = 12; // passo a cui tornare (handout)
    public bool AiAttiva => _ai.Attivo;

    private string Uid => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    public async Task<IActionResult> OnGetAsync(Guid id, string h, int torna = 12)
    {
        Torna = torna;
        var p = await _db.Progetti.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == Uid);
        if (p is null) return NotFound();

        var stato = JsonNode.Parse(p.StatoJson) ?? new JsonObject();
        var ho = stato["passo10"]?["handout"]?.AsArray()?
            .FirstOrDefault(n => n?["id"]?.GetValue<string>() == h);
        if (ho is null) return NotFound();

        ProgettoId = id;
        HandoutId = h;
        Titolo = ho["titolo"]?.GetValue<string>() ?? "Handout";
        Tipo = ho["tipo"]?.GetValue<string>() ?? "";
        ContenutoHtml = ho["contenuto"]?.GetValue<string>() ?? "";
        VersioniJson = ho["versioni"] is JsonArray va ? va.ToJsonString() : "[]";
        return Page();
    }
}
