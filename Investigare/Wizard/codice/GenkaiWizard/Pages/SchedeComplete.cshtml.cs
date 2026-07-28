using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GenkaiWizard.Pages;

/// <summary>Segnaposto: generatori delle schede complete da manuale (PG, PNG, distretto). Solo menu per ora — la gestione arriva dopo.</summary>
[Authorize]
public class SchedeCompleteModel : PageModel
{
    public string Tipo { get; set; } = "pg";

    public void OnGet(string? tipo)
    {
        Tipo = tipo is "png" or "distretto" ? tipo : "pg";
    }
}
