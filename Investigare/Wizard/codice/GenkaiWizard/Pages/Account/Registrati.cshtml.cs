using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GenkaiWizard.Pages.Account;

/// <summary>
/// Registrazione: email + password, e si è dentro. Niente conferma via email
/// (nessun SMTP in questa versione). Sostituisce la pagina di serie di Identity.
/// </summary>
[AllowAnonymous]
public class RegistratiModel : PageModel
{
    private readonly UserManager<IdentityUser> _utenti;
    private readonly SignInManager<IdentityUser> _accessi;
    private readonly GenkaiWizard.Data.ApplicationDbContext _db;
    public RegistratiModel(UserManager<IdentityUser> utenti, SignInManager<IdentityUser> accessi,
                           GenkaiWizard.Data.ApplicationDbContext db)
    { _utenti = utenti; _accessi = accessi; _db = db; }

    [BindProperty] public DatiRegistrazione Input { get; set; } = new();
    public string? ReturnUrl { get; set; }
    public string? Errore { get; set; }
    public IList<AuthenticationScheme> Esterni { get; set; } = new List<AuthenticationScheme>();

    public class DatiRegistrazione
    {
        [Required(ErrorMessage = "Serve l'email.")]
        [EmailAddress(ErrorMessage = "Questa email non sembra valida.")]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "Serve una password.")]
        [StringLength(100, MinimumLength = 8, ErrorMessage = "La password deve avere almeno 8 caratteri.")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = "";

        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = "Le due password non coincidono.")]
        public string Conferma { get; set; } = "";
    }

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

        var email = Input.Email.Trim();
        if (await _utenti.FindByEmailAsync(email) is not null)
        {
            Errore = "Esiste già un account con questa email — prova ad accedere.";
            return Page();
        }

        var utente = new IdentityUser { UserName = email, Email = email, EmailConfirmed = true };
        var esito = await _utenti.CreateAsync(utente, Input.Password);
        if (!esito.Succeeded)
        {
            foreach (var e in esito.Errors) ModelState.AddModelError(string.Empty, Traduci(e));
            return Page();
        }

        // quello che aveva creato da ospite in questo browser passa sul suo account
        await GenkaiWizard.Services.Ospite.TrasferisciAsync(_db, HttpContext, utente.Id);
        await _accessi.SignInAsync(utente, isPersistent: true);
        return LocalRedirect(string.IsNullOrWhiteSpace(returnUrl) ? "/" : returnUrl);
    }

    // gli errori di Identity arrivano in inglese: le voci che capitano davvero le diciamo in italiano
    private static string Traduci(IdentityError e) => e.Code switch
    {
        "PasswordTooShort" => "La password è troppo corta: almeno 8 caratteri.",
        "PasswordRequiresNonAlphanumeric" => "La password deve contenere almeno un simbolo (es. ! ? . -).",
        "PasswordRequiresDigit" => "La password deve contenere almeno un numero.",
        "PasswordRequiresLower" => "La password deve contenere almeno una lettera minuscola.",
        "PasswordRequiresUpper" => "La password deve contenere almeno una lettera maiuscola.",
        "DuplicateUserName" or "DuplicateEmail" => "Esiste già un account con questa email.",
        "InvalidEmail" => "Questa email non sembra valida.",
        _ => e.Description
    };
}
