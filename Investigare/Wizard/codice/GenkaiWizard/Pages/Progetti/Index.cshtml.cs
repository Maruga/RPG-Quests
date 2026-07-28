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
    public IndexModel(ApplicationDbContext db) => _db = db;

    public List<ProgettoAvventura> Progetti { get; set; } = new();

    private string Uid => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    public async Task OnGetAsync()
    {
        Progetti = await _db.Progetti
            .Where(p => p.UtenteId == Uid)
            .OrderByDescending(p => p.AggiornatoIl)
            .ToListAsync();
    }

    public async Task<IActionResult> OnPostCreaAsync(string? titolo)
    {
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
