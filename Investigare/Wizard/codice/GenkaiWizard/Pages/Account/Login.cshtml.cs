using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GenkaiWizard.Pages.Account;

/// <summary>
/// Accesso: email+password oppure un servizio esterno (Google…). Sostituisce la pagina
/// di serie di Identity (inglese e senza stile): il percorso è impostato in Program.cs.
/// </summary>
[AllowAnonymous]
public class LoginModel : PageModel
{
    private readonly SignInManager<IdentityUser> _accessi;
    private readonly UserManager<IdentityUser> _utenti;
    private readonly GenkaiWizard.Data.ApplicationDbContext _db;
    public LoginModel(SignInManager<IdentityUser> accessi, UserManager<IdentityUser> utenti,
                      GenkaiWizard.Data.ApplicationDbContext db)
    { _accessi = accessi; _utenti = utenti; _db = db; }

    [BindProperty] public DatiAccesso Input { get; set; } = new();
    public string? ReturnUrl { get; set; }
    public string? Errore { get; set; }
    /// <summary>Servizi esterni configurati (vuoto finché non ci sono ClientId/ClientSecret).</summary>
    public IList<AuthenticationScheme> Esterni { get; set; } = new List<AuthenticationScheme>();

    public class DatiAccesso
    {
        [Required(ErrorMessage = "Serve l'email.")]
        [EmailAddress(ErrorMessage = "Questa email non sembra valida.")]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "Serve la password.")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = "";

        public bool Ricordami { get; set; } = true;
    }

    private string Dove(string? returnUrl) => string.IsNullOrWhiteSpace(returnUrl) ? "/" : returnUrl;

    public async Task OnGetAsync(string? returnUrl = null)
    {
        ReturnUrl = returnUrl;
        Esterni = (await _accessi.GetExternalAuthenticationSchemesAsync()).ToList();
    }

    public async Task<IActionResult> OnPostAsync(string? returnUrl = null)
    {
        ReturnUrl = returnUrl;
        Esterni = (await _accessi.GetExternalAuthenticationSchemesAsync()).ToList();
        if (!ModelState.IsValid) return Page();

        var esito = await _accessi.PasswordSignInAsync(Input.Email, Input.Password, Input.Ricordami, lockoutOnFailure: true);
        if (esito.Succeeded)
        {
            // quello creato da ospite in questo browser passa sul suo account
            var chi = await _utenti.FindByEmailAsync(Input.Email.Trim());
            if (chi is not null) await GenkaiWizard.Services.Ospite.TrasferisciAsync(_db, HttpContext, chi.Id);
            return LocalRedirect(Dove(returnUrl));
        }
        if (esito.IsLockedOut) { Errore = "Troppi tentativi falliti: riprova tra qualche minuto."; return Page(); }
        Errore = "Email o password non corrispondono.";
        return Page();
    }

    // ── accesso con un servizio esterno ───────────────────────────────────────
    public IActionResult OnPostEsterno(string provider, string? returnUrl = null)
    {
        var ritorno = Url.Page("/Account/Login", pageHandler: "CallbackEsterno", values: new { returnUrl });
        return new ChallengeResult(provider, _accessi.ConfigureExternalAuthenticationProperties(provider, ritorno));
    }

    public async Task<IActionResult> OnGetCallbackEsternoAsync(string? returnUrl = null, string? remoteError = null)
    {
        Esterni = (await _accessi.GetExternalAuthenticationSchemesAsync()).ToList();
        if (remoteError is not null) { Errore = $"Il servizio esterno ha risposto: {remoteError}"; return Page(); }

        var info = await _accessi.GetExternalLoginInfoAsync();
        if (info is null) { Errore = "Accesso con il servizio esterno non riuscito — riprova."; return Page(); }

        // se l'account è già collegato, si entra e basta
        var esito = await _accessi.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: true, bypassTwoFactor: true);
        if (esito.Succeeded)
        {
            var chi = await _utenti.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            if (chi is not null) await GenkaiWizard.Services.Ospite.TrasferisciAsync(_db, HttpContext, chi.Id);
            return LocalRedirect(Dove(returnUrl));
        }
        if (esito.IsLockedOut) { Errore = "Account bloccato temporaneamente: riprova più tardi."; return Page(); }

        // primo accesso con questo servizio: l'account si crea (o si collega a quello con la stessa email)
        var email = info.Principal.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrWhiteSpace(email))
        {
            Errore = $"{info.ProviderDisplayName} non ha fornito un'email: non posso creare l'account.";
            return Page();
        }

        var utente = await _utenti.FindByEmailAsync(email);
        if (utente is null)
        {
            utente = new IdentityUser { UserName = email, Email = email, EmailConfirmed = true };
            var creato = await _utenti.CreateAsync(utente);
            if (!creato.Succeeded) { Errore = string.Join(" ", creato.Errors.Select(e => e.Description)); return Page(); }
        }

        var collegato = await _utenti.AddLoginAsync(utente, info);
        if (!collegato.Succeeded) { Errore = string.Join(" ", collegato.Errors.Select(e => e.Description)); return Page(); }

        await GenkaiWizard.Services.Ospite.TrasferisciAsync(_db, HttpContext, utente.Id);
        await _accessi.SignInAsync(utente, isPersistent: true);
        return LocalRedirect(Dove(returnUrl));
    }
}
