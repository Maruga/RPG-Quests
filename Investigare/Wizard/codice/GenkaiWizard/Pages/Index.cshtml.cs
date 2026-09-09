using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GenkaiWizard.Pages;

/* La home vera è il sito statico (wwwroot/index.html, servito su "/" da UseDefaultFiles).
   /Index non deve mostrare la pagina di benvenuto del template ASP.NET: rimanda alla home.
   In locale, dove wwwroot/index.html non c'è, mostra la paginetta (altrimenti / → /Index → / all'infinito). */
public class IndexModel(IWebHostEnvironment env) : PageModel
{
    public IActionResult OnGet()
    {
        var home = Path.Combine(env.WebRootPath ?? "", "index.html");
        return System.IO.File.Exists(home) ? Redirect("/") : Page();
    }
}
