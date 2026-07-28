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
[Authorize]
public class SchedaModel : PageModel
{
    private readonly ApplicationDbContext _db;
    private readonly Services.AnthropicService _ai;
    private readonly Services.ImmaginiService _img;
    public SchedaModel(ApplicationDbContext db, Services.AnthropicService ai, Services.ImmaginiService img)
    { _db = db; _ai = ai; _img = img; }

    public Personaggio Pg { get; set; } = default!;
    public bool AiAttiva => _ai.Attivo;
    public bool ImmaginiAttive => _img.Attivo;

    private string Uid => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    public async Task<IActionResult> OnGetAsync(Guid id)
    {
        var pg = await _db.Personaggi.AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == Uid);
        if (pg is null) return NotFound();
        Pg = pg;
        return Page();
    }
}
