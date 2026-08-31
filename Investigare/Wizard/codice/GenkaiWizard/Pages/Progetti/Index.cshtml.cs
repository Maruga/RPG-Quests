using System.Security.Claims;
using GenkaiWizard.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace GenkaiWizard.Pages.Progetti;

[Authorize]
public class IndexModel : PageModel
{
    private readonly ApplicationDbContext _db;
    private readonly IConfiguration _cfg;
    public IndexModel(ApplicationDbContext db, IConfiguration cfg) { _db = db; _cfg = cfg; }

    public List<ProgettoAvventura> Progetti { get; set; } = new();

    private string Uid => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    /// <summary>Fase di test (decisione utente 2026-08-31): crea casi solo l'email in
    /// Casi:Creatore; config vuota = tutti (com'è in sviluppo). Gli altri sfogliano la demo.</summary>
    public bool PuoCreare
    {
        get
        {
            var creatore = _cfg["Casi:Creatore"];
            return string.IsNullOrWhiteSpace(creatore)
                || string.Equals(User.Identity?.Name, creatore.Trim(), StringComparison.OrdinalIgnoreCase);
        }
    }

    public async Task OnGetAsync()
    {
        // i propri casi + i casi demo (di chiunque): la demo si sfoglia in sola lettura
        Progetti = await _db.Progetti
            .Where(p => p.UtenteId == Uid || p.Demo)
            .OrderByDescending(p => p.AggiornatoIl)
            .ToListAsync();
    }

    public async Task<IActionResult> OnPostCreaAsync(string? titolo)
    {
        if (!PuoCreare) return Forbid();
        var p = new ProgettoAvventura
        {
            UtenteId = Uid,
            Titolo = string.IsNullOrWhiteSpace(titolo) ? "Nuovo caso" : titolo.Trim(),
            StatoJson = """
            {
              "versione": 1,
              "setup": { "ambientazione": "kyoto-1997", "durata": 2, "complessita": 2, "agganciKage": false },
              "cast": [],
              "luoghi": []
            }
            """
        };
        _db.Progetti.Add(p);
        await _db.SaveChangesAsync();
        return RedirectToPage("/Wizard/Index", new { id = p.Id, passo = 0 });
    }

    public async Task<IActionResult> OnPostEliminaAsync(Guid id)
    {
        var p = await _db.Progetti.FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == Uid);
        if (p is not null && !p.Demo)
        {
            _db.Progetti.Remove(p);
            await _db.SaveChangesAsync();
        }
        return RedirectToPage();
    }
}
