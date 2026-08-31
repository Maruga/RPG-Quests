using System.Security.Claims;
using GenkaiWizard.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace GenkaiWizard.Pages.Pg;

/// <summary>
/// Wizard "Crea il tuo personaggio": una sola pagina, i passi si muovono lato client (pg.js).
/// Lo stato vive in StatoJson e si autosalva a ogni modifica.
/// </summary>
public class SchedaModel : PageModel
{
    private readonly ApplicationDbContext _db;
    private readonly Services.AnthropicService _ai;
    private readonly Services.ImmaginiService _img;
    private readonly IConfiguration _cfg;
    public SchedaModel(ApplicationDbContext db, Services.AnthropicService ai, Services.ImmaginiService img, IConfiguration cfg)
    { _db = db; _ai = ai; _img = img; _cfg = cfg; }

    public Personaggio Pg { get; set; } = default!;
    public bool AiAttiva => _ai.Attivo;
    /// <summary>Avanzamento (Shugyō, usi): SPENTO di default — si riaccende con Funzioni:Crescita = "si"
    /// (decisione utente 2026-08-25: per ora solo la scheda base; la crescita arriverà in pagine separate).</summary>
    public bool CrescitaAttiva => string.Equals(_cfg["Funzioni:Crescita"], "si", StringComparison.OrdinalIgnoreCase);
    /// <summary>Parti «in più» della scheda, spente per ora (decisione utente 2026-08-30): scene personali,
    /// Enja oltre il primo, altre persone del Kage. Si riaccendono con Funzioni:SchedaEstesa = si.</summary>
    public bool EstesaAttiva => string.Equals(_cfg["Funzioni:SchedaEstesa"], "si", StringComparison.OrdinalIgnoreCase);
    public bool ImmaginiAttive => _img.Attivo;

    private string Uid => Services.Ospite.ChiUsa(HttpContext);

    public async Task<IActionResult> OnGetAsync(Guid id)
    {
        var pg = await _db.Personaggi.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == Uid);
        if (pg is null) return NotFound();
        Response.Headers.CacheControl = "no-store"; // la scheda cambia: mai servirla dalla cache del browser
        Pg = pg;
        return Page();
    }
}
