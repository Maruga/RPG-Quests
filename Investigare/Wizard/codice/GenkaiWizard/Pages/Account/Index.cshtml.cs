using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GenkaiWizard.Pages.Account;

/// <summary>
/// «Il tuo account»: email, password e accessi rapidi (Google…).
/// Sostituisce /Identity/Account/Manage (di serie: inglese e senza stile).
/// </summary>
[Authorize]
public class IndexModel : PageModel
{
    private readonly UserManager<IdentityUser> _utenti;
    private readonly SignInManager<IdentityUser> _accessi;
    public IndexModel(UserManager<IdentityUser> utenti, SignInManager<IdentityUser> accessi)
    { _utenti = utenti; _accessi = accessi; }

    public string Email { get; set; } = "";
    public bool HaPassword { get; set; }
    public IList<UserLoginInfo> Collegati { get; set; } = new List<UserLoginInfo>();
    public IList<AuthenticationScheme> Collegabili { get; set; } = new List<AuthenticationScheme>();

    [TempData] public string? Messaggio { get; set; }
    [TempData] public string? Errore { get; set; }

    [BindProperty] public string NuovaEmail { get; set; } = "";
    [BindProperty] public DatiPassword Pwd { get; set; } = new();

    public class DatiPassword
    {
        [DataType(DataType.Password)] public string? Attuale { get; set; }

        [Required(ErrorMessage = "Serve la nuova password.")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "La password deve avere almeno 8 caratteri.")]
        [DataType(DataType.Password)]
        public string Nuova { get; set; } = "";

        [DataType(DataType.Password)]
        [Compare(nameof(Nuova), ErrorMessage = "Le due password non coincidono.")]
        public string Conferma { get; set; } = "";
    }

    private async Task CaricaAsync(IdentityUser utente)
    {
        Email = await _utenti.GetEmailAsync(utente) ?? "";
        HaPassword = await _utenti.HasPasswordAsync(utente);
        Collegati = await _utenti.GetLoginsAsync(utente);
        Collegabili = (await _accessi.GetExternalAuthenticationSchemesAsync())
            .Where(s => Collegati.All(c => c.LoginProvider != s.Name)).ToList();
    }

    public async Task<IActionResult> OnGetAsync()
    {
        var u = await _utenti.GetUserAsync(User);
        if (u is null) return NotFound();
        await CaricaAsync(u);
        return Page();
    }

    // ── email ────────────────────────────────────────────────────────────────
    public async Task<IActionResult> OnPostEmailAsync()
    {
        var u = await _utenti.GetUserAsync(User);
        if (u is null) return NotFound();

        var nuova = (NuovaEmail ?? "").Trim();
        if (string.IsNullOrWhiteSpace(nuova) || !new EmailAddressAttribute().IsValid(nuova))
            Errore = "Questa email non sembra valida.";
        else if (string.Equals(nuova, await _utenti.GetEmailAsync(u), StringComparison.OrdinalIgnoreCase))
            Messaggio = "L'email era già questa.";
        else
        {
            // niente SMTP in questa versione: l'email si cambia subito (username compreso)
            var e1 = await _utenti.SetEmailAsync(u, nuova);
            var e2 = e1.Succeeded ? await _utenti.SetUserNameAsync(u, nuova) : e1;
            if (e2.Succeeded) { await _accessi.RefreshSignInAsync(u); Messaggio = "Email aggiornata."; }
            else Errore = string.Join(" ", e2.Errors.Select(x => x.Description));
        }
        return RedirectToPage();
    }

    // ── password ─────────────────────────────────────────────────────────────
    public async Task<IActionResult> OnPostPasswordAsync()
    {
        var u = await _utenti.GetUserAsync(User);
        if (u is null) return NotFound();

        if (!ModelState.IsValid) { await CaricaAsync(u); return Page(); }

        var aveva = await _utenti.HasPasswordAsync(u);
        IdentityResult esito;
        if (aveva)
        {
            if (string.IsNullOrEmpty(Pwd.Attuale))
            {
                ModelState.AddModelError("Pwd.Attuale", "Serve la password attuale.");
                await CaricaAsync(u); return Page();
            }
            esito = await _utenti.ChangePasswordAsync(u, Pwd.Attuale, Pwd.Nuova);
        }
        else
        {
            // account nato da un accesso esterno: qui si imposta una password locale
            esito = await _utenti.AddPasswordAsync(u, Pwd.Nuova);
        }

        if (!esito.Succeeded)
        {
            foreach (var e in esito.Errors) ModelState.AddModelError(string.Empty, e.Description);
            await CaricaAsync(u); return Page();
        }

        await _accessi.RefreshSignInAsync(u);
        Messaggio = aveva ? "Password cambiata." : "Password impostata: ora puoi entrare anche senza il servizio esterno.";
        return RedirectToPage();
    }

    // ── accessi rapidi (collega / scollega) ──────────────────────────────────
    public IActionResult OnPostCollega(string provider)
    {
        var ritorno = Url.Page("/Account/Index", pageHandler: "CollegaCallback");
        var props = _accessi.ConfigureExternalAuthenticationProperties(provider, ritorno, _utenti.GetUserId(User));
        return new ChallengeResult(provider, props);
    }

    public async Task<IActionResult> OnGetCollegaCallbackAsync()
    {
        var u = await _utenti.GetUserAsync(User);
        if (u is null) return NotFound();

        var info = await _accessi.GetExternalLoginInfoAsync(await _utenti.GetUserIdAsync(u));
        if (info is null) { Errore = "Collegamento non riuscito — riprova."; return RedirectToPage(); }

        var esito = await _utenti.AddLoginAsync(u, info);
        Errore = esito.Succeeded ? null : "Questo account risulta già collegato altrove.";
        if (esito.Succeeded) Messaggio = $"{info.ProviderDisplayName} collegato.";

        // ripulisce il cookie temporaneo dell'accesso esterno
        await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);
        return RedirectToPage();
    }

    public async Task<IActionResult> OnPostScollegaAsync(string provider, string chiave)
    {
        var u = await _utenti.GetUserAsync(User);
        if (u is null) return NotFound();

        // non ci si può chiudere fuori: serve almeno una password o un altro accesso
        var logins = await _utenti.GetLoginsAsync(u);
        if (!await _utenti.HasPasswordAsync(u) && logins.Count <= 1)
        {
            Errore = "È il tuo unico modo di entrare: prima imposta una password.";
            return RedirectToPage();
        }

        var esito = await _utenti.RemoveLoginAsync(u, provider, chiave);
        if (esito.Succeeded) { await _accessi.RefreshSignInAsync(u); Messaggio = $"{provider} scollegato."; }
        else Errore = string.Join(" ", esito.Errors.Select(x => x.Description));
        return RedirectToPage();
    }
}
