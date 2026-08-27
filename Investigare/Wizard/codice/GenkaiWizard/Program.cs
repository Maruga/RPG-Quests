using Microsoft.AspNetCore.HttpOverrides;
using System.Security.Claims;
using GenkaiWizard.Data;
using GenkaiWizard.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ── Database: SQLite di default; SQL Server se Database:Provider = "SqlServer" ──
var provider = builder.Configuration["Database:Provider"] ?? "Sqlite";
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' non trovata.");

// dove sta davvero il database (finisce nel log se qualcosa non va)
string percorsoDb = "(SQL Server)";
bool dbSuCartellaTemporanea = false;

if (!provider.Equals("SqlServer", StringComparison.OrdinalIgnoreCase))
{
    // SQLite: un percorso relativo dipende dalla cartella di avvio (dotnet run, VS, exe…)
    // → si finisce su database DIVERSI a seconda di come si lancia. Lo si ancora al ContentRoot.
    var csb = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder(connectionString);
    if (!Path.IsPathRooted(csb.DataSource))
        csb.DataSource = Path.Combine(builder.Environment.ContentRootPath, csb.DataSource);

    // Se la cartella NON è scrivibile (hosting senza permessi) il sito non partirebbe proprio.
    // Ripiego su una cartella temporanea: il sito funziona, ma i dati NON sono durevoli.
    static bool Scrivibile(string cartella)
    {
        try
        {
            Directory.CreateDirectory(cartella);
            var f = Path.Combine(cartella, $"prova-{Guid.NewGuid():N}.tmp");
            File.WriteAllText(f, "x");
            File.Delete(f);
            return true;
        }
        catch { return false; }
    }

    if (!Scrivibile(Path.GetDirectoryName(csb.DataSource)!))
    {
        var ripiego = Path.Combine(Path.GetTempPath(), "genkai");
        Directory.CreateDirectory(ripiego);
        csb.DataSource = Path.Combine(ripiego, Path.GetFileName(csb.DataSource));
        dbSuCartellaTemporanea = true;
    }

    percorsoDb = csb.DataSource;
    connectionString = csb.ConnectionString;
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    if (provider.Equals("SqlServer", StringComparison.OrdinalIgnoreCase))
        options.UseSqlServer(connectionString);
    else
        options.UseSqlite(connectionString);
});
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

// ── Identity: account GM. Conferma email disattivata in v1 (nessun SMTP richiesto) ──
builder.Services.AddDefaultIdentity<IdentityUser>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
        options.Password.RequiredLength = 8;
    })
    .AddEntityFrameworkStores<ApplicationDbContext>();

// Sessione lunga: niente re-login continui. Le pagine di accesso/account sono le NOSTRE
// (Pages/Account), in italiano e in tinta col resto: quelle di serie restano solo di scorta.
builder.Services.ConfigureApplicationCookie(o =>
{
    o.ExpireTimeSpan = TimeSpan.FromDays(30);
    o.SlidingExpiration = true;
    o.LoginPath = "/Account/Login";
    o.LogoutPath = "/Identity/Account/Logout";
    o.AccessDeniedPath = "/Account/Login";
});

// ── Accesso con Google: si accende da solo quando ci sono le chiavi ──
// Dove metterle (mai nel codice, mai su git):
//   sviluppo → dotnet user-secrets set "Autenticazione:Google:ClientId" "…"
//              dotnet user-secrets set "Autenticazione:Google:ClientSecret" "…"
//   in linea → variabili d'ambiente Autenticazione__Google__ClientId / __ClientSecret
// Nella Google Cloud Console (OAuth client «Applicazione web») l'URI di reindirizzamento
// autorizzato dev'essere <indirizzo del sito>/signin-google — es. https://genkai.it/signin-google
// e, per le prove in locale, http://localhost:5041/signin-google
var googleId = builder.Configuration["Autenticazione:Google:ClientId"];
var googleSecret = builder.Configuration["Autenticazione:Google:ClientSecret"];
if (!string.IsNullOrWhiteSpace(googleId) && !string.IsNullOrWhiteSpace(googleSecret))
{
    builder.Services.AddAuthentication().AddGoogle(o =>
    {
        o.ClientId = googleId;
        o.ClientSecret = googleSecret;
    });
}

// email di servizio (password dimenticata, avvisi): attive solo se la posta è configurata
if (!string.IsNullOrWhiteSpace(builder.Configuration["Posta:Smtp:Host"]))
    builder.Services.AddTransient<Microsoft.AspNetCore.Identity.UI.Services.IEmailSender, GenkaiWizard.Services.PostaSmtp>();

builder.Services.AddRazorPages();

// ── Servizi wizard ──
builder.Services.AddSingleton<Biblioteche>();
builder.Services.AddSingleton<GeneratoreNomi>();
builder.Services.AddSingleton<QuotaAi>();
builder.Services.AddHttpClient<AnthropicService>();
builder.Services.AddHttpClient<ImmaginiService>();

var app = builder.Build();

// ── dietro Cloudflare l'origine parla http: senza questo l'app genera URL http://
//    (es. il redirect di «Accedi con Google» → redirect_uri_mismatch). Ci fidiamo
//    dell'X-Forwarded-Proto del proxy per sapere che il visitatore è in https. ──
var inoltro = new ForwardedHeadersOptions { ForwardedHeaders = ForwardedHeaders.XForwardedProto };
inoltro.KnownNetworks.Clear();   // il proxy è Cloudflare, non il loopback:
inoltro.KnownProxies.Clear();    // senza svuotare questi, l'header verrebbe ignorato
app.UseForwardedHeaders(inoltro);

// Migrazioni automatiche all'avvio (Identity + Progetti).
// Se falliscono NON si abbatte il sito: l'errore finisce nel log dell'applicazione.
string? erroreAvvio = null;
try
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}
catch (Exception ex)
{
    erroreAvvio = ex.ToString();
}

if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
// il sito (index.html, /squadra/, /handout/) sta dentro wwwroot: «/» e le cartelle
// devono servire il loro index.html prima di arrivare alle Razor Pages
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();

// ── SOLO IN SVILUPPO: accesso automatico come dev@genkai.local (niente login) ──
if (app.Environment.IsDevelopment())
{
    const string devEmail = "dev@genkai.local";
    using (var scope = app.Services.CreateScope())
    {
        var um = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
        if (await um.FindByEmailAsync(devEmail) is null)
            await um.CreateAsync(
                new IdentityUser { UserName = devEmail, Email = devEmail, EmailConfirmed = true },
                "Dev!Genkai2026");
    }

    app.Use(async (ctx, next) =>
    {
        // le pagine di accesso restano raggiungibili anche in sviluppo (per provarle davvero)
        if (ctx.User?.Identity?.IsAuthenticated != true &&
            !ctx.Request.Path.StartsWithSegments("/Identity") &&
            !ctx.Request.Path.StartsWithSegments("/Account/Login") &&
            !ctx.Request.Path.StartsWithSegments("/signin-google"))
        {
            var sm = ctx.RequestServices.GetRequiredService<SignInManager<IdentityUser>>();
            var u = await sm.UserManager.FindByEmailAsync(devEmail);
            if (u is not null)
            {
                await sm.SignInAsync(u, isPersistent: true);          // cookie per le prossime richieste
                ctx.User = await sm.CreateUserPrincipalAsync(u);       // identità già valida per QUESTA
            }
        }
        await next();
    });
}

app.UseAuthorization();

app.MapRazorPages();

// se le migrazioni non sono riuscite, resta scritto nel log (il sito però sta in piedi)
if (erroreAvvio is not null)
    app.Logger.LogError("Migrazioni non riuscite all'avvio (database in {dove}): {errore}",
        dbSuCartellaTemporanea ? "cartella temporanea" : percorsoDb, erroreAvvio);

// Chi sta guardando: serve alle pagine statiche del sito per mostrare «Accedi» oppure il proprio nome
app.MapGet("/api/utente", (ClaimsPrincipal u) => Results.Json(new
{
    autenticato = u.Identity?.IsAuthenticated == true,
    nome = u.Identity?.Name
})).AllowAnonymous();



// ═══════════════════════════ API del wizard ═══════════════════════════
var api = app.MapGroup("/api").RequireAuthorization();

static string UtenteId(ClaimsPrincipal user) =>
    user.FindFirstValue(ClaimTypes.NameIdentifier)!;

// Biblioteca per i suggerimenti 🎲 (client-side, gratis)
api.MapGet("/biblioteca/{nome}", (string nome, Biblioteche bib) =>
    bib.HaLib(nome) ? Results.Text(bib.Lib(nome).ToJsonString(), "application/json")
                    : Results.NotFound()).AllowAnonymous();

// Nomi anti-omonimie (1..6 proposte): /api/nomi?genere=m&eta=45&quanti=4&occupati=Tanaka Jiro|…&cognome=Tanaka
api.MapGet("/nomi", (string genere, int eta, string? occupati, string? cognome, int quanti, GeneratoreNomi gen) =>
{
    var lista = (occupati ?? "").Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    var n = gen.GeneraMolti(genere == "f" ? "f" : "m", Math.Clamp(eta, 8, 99), lista,
                            Math.Clamp(quanti <= 0 ? 1 : quanti, 1, 6),
                            string.IsNullOrWhiteSpace(cognome) ? null : cognome);
    return Results.Json(n);
}).AllowAnonymous();

// Verifica di un nome scritto a mano: /api/nomi/verifica?cognome=…&nome=…&occupati=…
api.MapGet("/nomi/verifica", (string cognome, string nome, string? occupati, GeneratoreNomi gen) =>
{
    if (string.IsNullOrWhiteSpace(cognome) || string.IsNullOrWhiteSpace(nome))
        return Results.Json(new { libero = true, motivo = (string?)null, kanji = "" });
    var lista = (occupati ?? "").Split('|', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    var (libero, motivo, kanji) = gen.Verifica(cognome, nome, lista);
    return Results.Json(new { libero, motivo, kanji });
}).AllowAnonymous();

// Autosave dello stato (chiamato dal client a ogni modifica, debounced)
api.MapPost("/progetti/{id:guid}/stato", async (
    Guid id, [FromBody] SalvaStatoRichiesta body,
    ApplicationDbContext db, ClaimsPrincipal user) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid);
    if (p is null) return Results.NotFound();
    if (p.Demo) return Results.BadRequest(new { errore = "Il progetto demo è in sola lettura" });

    p.StatoJson = body.StatoJson;
    if (body.PassoCorrente is int pc) p.PassoCorrente = Math.Clamp(pc, 0, GenkaiWizard.Pages.Wizard.IndexModel.UltimaSchermata);
    if (!string.IsNullOrWhiteSpace(body.Titolo)) p.Titolo = body.Titolo.Trim();
    p.AggiornatoIl = DateTime.UtcNow;
    await db.SaveChangesAsync();
    return Results.Ok(new { salvato = p.AggiornatoIl });
});

// Immagine mappa del caso (per-avventura): wwwroot/mappe/{id}.png|.jpg — fallback: /img/mappa_kyoto.jpg
api.MapPost("/progetti/{id:guid}/mappa", async (
    Guid id, IFormFile file,
    ApplicationDbContext db, ClaimsPrincipal user, IWebHostEnvironment env) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid);
    if (p is null) return Results.NotFound();
    if (file is null || file.Length == 0) return Results.BadRequest(new { errore = "Nessun file ricevuto" });
    if (file.Length > 12_000_000) return Results.BadRequest(new { errore = "Immagine troppo grande (max 12 MB)" });
    var ext = file.ContentType switch { "image/png" => ".png", "image/jpeg" => ".jpg", _ => (string?)null };
    if (ext is null) return Results.BadRequest(new { errore = "Formato non supportato: solo PNG o JPG" });

    var dir = Path.Combine(env.WebRootPath, "mappe");
    Directory.CreateDirectory(dir);
    foreach (var vecchio in Directory.GetFiles(dir, id + ".*")) File.Delete(vecchio);
    var percorso = Path.Combine(dir, id + ext);
    await using (var fs = File.Create(percorso)) await file.CopyToAsync(fs);
    return Results.Ok(new { url = $"/mappe/{id}{ext}?v={DateTime.UtcNow.Ticks}" });
}).DisableAntiforgery();

// Allegati del caso (doc, immagini, PDF…): OGNI avventura nella SUA cartella wwwroot/allegati/{id}/ — niente mischioni
api.MapPost("/progetti/{id:guid}/allegati", async (
    Guid id, IFormFile file,
    ApplicationDbContext db, ClaimsPrincipal user, IWebHostEnvironment env) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid);
    if (p is null) return Results.NotFound();
    if (file is null || file.Length == 0) return Results.BadRequest(new { errore = "Nessun file ricevuto" });
    if (file.Length > 20_000_000) return Results.BadRequest(new { errore = "File troppo grande (max 20 MB)" });
    var ammesse = new[] { ".png", ".jpg", ".jpeg", ".webp", ".gif", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt", ".md" };
    var ext = Path.GetExtension(file.FileName ?? "").ToLowerInvariant();
    if (!ammesse.Contains(ext)) return Results.BadRequest(new { errore = $"Formato non supportato ({ext}): immagini, PDF, Office, testo" });

    var dir = Path.Combine(env.WebRootPath, "allegati", id.ToString());
    Directory.CreateDirectory(dir);
    var baseNome = string.Concat(Path.GetFileNameWithoutExtension(file.FileName ?? "allegato").Split(Path.GetInvalidFileNameChars())).Trim();
    if (baseNome.Length == 0) baseNome = "allegato";
    if (baseNome.Length > 60) baseNome = baseNome[..60];
    var nomeFile = $"{baseNome}-{DateTime.UtcNow.Ticks}{ext}";
    await using (var fs = File.Create(Path.Combine(dir, nomeFile))) await file.CopyToAsync(fs);
    return Results.Ok(new { nome = file.FileName, url = $"/allegati/{id}/{nomeFile}" });
}).DisableAntiforgery();

// Descrizione fisica AI di un personaggio (per la scheda del passo 11)
api.MapPost("/progetti/{id:guid}/descrizione", async (
    Guid id, [FromBody] DescrizioneRichiesta body,
    ApplicationDbContext db, AnthropicService ai, QuotaAi quota, ClaimsPrincipal user,
    CancellationToken ct) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.AsNoTracking()
        .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (p is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.PersonaId)) return Results.BadRequest(new { errore = "personaId mancante" });
    if (!ai.Attivo) return Results.Problem("AI non configurata su questo server", statusCode: 503);
    if (!quota.ConsumaTesto(uid))
        return Results.Problem("Quota AI giornaliera esaurita", statusCode: 429);

    try
    {
        var testo = await ai.DescriviPersona(p.StatoJson, body.PersonaId, ct, body.Modello, body.Effort);
        return Results.Json(new { testo });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message, statusCode: 502);
    }
});

// Deposizione AI in stile verbale (nasce dalla scheda: cosa sa / non sa / ha fatto / comportamento)
api.MapPost("/progetti/{id:guid}/deposizione", async (
    Guid id, [FromBody] DescrizioneRichiesta body,
    ApplicationDbContext db, AnthropicService ai, QuotaAi quota, ClaimsPrincipal user,
    CancellationToken ct) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.AsNoTracking()
        .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (p is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.PersonaId)) return Results.BadRequest(new { errore = "personaId mancante" });
    if (!ai.Attivo) return Results.Problem("AI non configurata su questo server", statusCode: 503);
    if (!quota.ConsumaTesto(uid))
        return Results.Problem("Quota AI giornaliera esaurita", statusCode: 429);

    try
    {
        var testo = await ai.DeponiPersona(p.StatoJson, body.PersonaId, ct, body.Modello, body.Effort);
        return Results.Json(new { testo });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message, statusCode: 502);
    }
});

// UN singolo campo della scheda (una leva della voce o un tratto) proposto dall'AI, in carattere
api.MapPost("/progetti/{id:guid}/scheda-campo", async (
    Guid id, [FromBody] CampoSchedaRichiesta body,
    ApplicationDbContext db, AnthropicService ai, QuotaAi quota, ClaimsPrincipal user,
    CancellationToken ct) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.AsNoTracking()
        .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (p is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.PersonaId)) return Results.BadRequest(new { errore = "personaId mancante" });
    if (string.IsNullOrWhiteSpace(body.Campo)) return Results.BadRequest(new { errore = "campo mancante" });
    if (!ai.Attivo) return Results.Problem("AI non configurata su questo server", statusCode: 503);
    if (!quota.ConsumaTesto(uid)) return Results.Problem("Quota AI giornaliera esaurita", statusCode: 429);

    try
    {
        var testo = await ai.GeneraCampo(p.StatoJson, body.PersonaId, body.Campo, ct, body.Modello, body.Effort);
        return Results.Json(new { testo });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message, statusCode: 502);
    }
});

// CONTATTI e reperibilità del PNG (oggetto JSON) — il client riempie solo i campi vuoti
api.MapPost("/progetti/{id:guid}/contatti", async (
    Guid id, [FromBody] DescrizioneRichiesta body,
    ApplicationDbContext db, AnthropicService ai, QuotaAi quota, ClaimsPrincipal user,
    CancellationToken ct) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.AsNoTracking()
        .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (p is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.PersonaId)) return Results.BadRequest(new { errore = "personaId mancante" });
    if (!ai.Attivo) return Results.Problem("AI non configurata su questo server", statusCode: 503);
    if (!quota.ConsumaTesto(uid)) return Results.Problem("Quota AI giornaliera esaurita", statusCode: 429);

    try
    {
        var testo = await ai.GeneraContatti(p.StatoJson, body.PersonaId, ct, body.Modello, body.Effort);
        return Results.Json(new { testo });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message, statusCode: 502);
    }
});

// UN evento del calendario su richiesta precisa del GM (una richiesta = una cosa)
api.MapPost("/progetti/{id:guid}/calendario-evento", async (
    Guid id, [FromBody] CalendarioRichiesta body,
    ApplicationDbContext db, AnthropicService ai, QuotaAi quota, ClaimsPrincipal user,
    CancellationToken ct) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.AsNoTracking()
        .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (p is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.Richiesta)) return Results.BadRequest(new { errore = "richiesta mancante" });
    if (!ai.Attivo) return Results.Problem("AI non configurata su questo server", statusCode: 503);
    if (!quota.ConsumaTesto(uid)) return Results.Problem("Quota AI giornaliera esaurita", statusCode: 429);

    try
    {
        var testo = await ai.CalendarioEvento(p.StatoJson, body.Richiesta, ct, body.Modello, body.Effort);
        return Results.Json(new { testo });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message, statusCode: 502);
    }
});

// Genera il RITRATTO del personaggio (OpenAI Images) e lo salva come foto dedicata nella cartella-avventura
api.MapPost("/progetti/{id:guid}/genera-foto", async (
    Guid id, [FromBody] GeneraFotoRichiesta body,
    ApplicationDbContext db, ImmaginiService img, QuotaAi quota, ClaimsPrincipal user,
    IWebHostEnvironment env, CancellationToken ct) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (p is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.Prompt)) return Results.BadRequest(new { errore = "prompt mancante" });
    if (string.IsNullOrWhiteSpace(body.PersonaId)) return Results.BadRequest(new { errore = "personaId mancante" });
    if (!img.Attivo) return Results.Problem("Generazione immagini non configurata su questo server", statusCode: 503);
    if (!quota.ConsumaImmagine(uid)) return Results.Problem("Quota immagini giornaliera esaurita", statusCode: 429);

    try
    {
        var png = await img.Genera(body.Prompt, ct);
        var dir = Path.Combine(env.WebRootPath, "allegati", id.ToString());
        Directory.CreateDirectory(dir);
        // nome riconoscibile e stabile: il ritratto di quella persona. Sovrascrive il precedente.
        var safe = string.Concat((body.PersonaId ?? "png").Where(c => char.IsLetterOrDigit(c) || c is '-' or '_'));
        var nomeFile = $"ritratto-{safe}.png";
        await File.WriteAllBytesAsync(Path.Combine(dir, nomeFile), png, ct);
        return Results.Json(new { url = $"/allegati/{id}/{nomeFile}?v={DateTime.UtcNow.Ticks}" });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message, statusCode: 502);
    }
});

// Salva il contenuto HTML di un handout (dall'editor grafico) dentro lo StatoJson
api.MapPost("/progetti/{id:guid}/handout-html", async (
    Guid id, [FromBody] HandoutHtmlRichiesta body,
    ApplicationDbContext db, ClaimsPrincipal user, CancellationToken ct) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (p is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.HandoutId)) return Results.BadRequest(new { errore = "handoutId mancante" });

    var stato = System.Text.Json.Nodes.JsonNode.Parse(p.StatoJson) ?? new System.Text.Json.Nodes.JsonObject();
    var arr = stato["passo10"]?["handout"]?.AsArray();
    var h = arr?.FirstOrDefault(n => n?["id"]?.GetValue<string>() == body.HandoutId);
    if (h is null) return Results.NotFound(new { errore = "handout non trovato" });
    h["contenuto"] = body.Html ?? "";
    // backup: se il client invia le versioni, le salviamo (max 3, più recente prima).
    // Sono solo copie richiamabili: non influenzano mai la generazione né il contenuto corrente.
    if (body.Versioni is not null)
    {
        var arrV = new System.Text.Json.Nodes.JsonArray();
        foreach (var v in body.Versioni.Take(3))
            arrV.Add(new System.Text.Json.Nodes.JsonObject
            {
                ["html"] = v.Html ?? "",
                ["quando"] = v.Quando ?? ""
            });
        h["versioni"] = arrV;
    }
    p.StatoJson = stato.ToJsonString();
    p.AggiornatoIl = DateTime.UtcNow;
    await db.SaveChangesAsync(ct);
    return Results.Ok(new { salvato = p.AggiornatoIl });
});

// Contenuto handout via AI (dal titolo/tipo/descrizione/collegamento dell'handout)
api.MapPost("/progetti/{id:guid}/handout", async (
    Guid id, [FromBody] HandoutRichiesta body,
    ApplicationDbContext db, AnthropicService ai, QuotaAi quota, ClaimsPrincipal user,
    CancellationToken ct) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.AsNoTracking()
        .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (p is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.HandoutId)) return Results.BadRequest(new { errore = "handoutId mancante" });
    if (!ai.Attivo) return Results.Problem("AI non configurata su questo server", statusCode: 503);
    if (!quota.ConsumaTesto(uid)) return Results.Problem("Quota AI giornaliera esaurita", statusCode: 429);

    try
    {
        var testo = await ai.CreaHandout(p.StatoJson, body.HandoutId, ct, body.Modello, body.Effort);
        return Results.Json(new { testo });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message, statusCode: 502);
    }
});

// Proposta AI ✨ per un passo
api.MapPost("/progetti/{id:guid}/proponi/{passo:int}", async (
    Guid id, int passo, [FromBody] ProponiRichiesta body,
    ApplicationDbContext db, AnthropicService ai, QuotaAi quota, ClaimsPrincipal user,
    CancellationToken ct) =>
{
    var uid = UtenteId(user);
    var p = await db.Progetti.AsNoTracking()
        .FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (p is null) return Results.NotFound();
    if (!ai.Attivo) return Results.Problem("AI non configurata su questo server", statusCode: 503);
    if (!quota.ConsumaTesto(uid))
        return Results.Problem("Quota AI giornaliera esaurita", statusCode: 429);

    try
    {
        var json = await ai.Proponi(passo, p.StatoJson, body.Indicazioni, ct, body.Modello, body.Effort);
        return Results.Text(json, "application/json");
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message, statusCode: 502);
    }
});

// Quota rimasta (per mostrare il contatore in UI)
api.MapGet("/quota", (QuotaAi quota, HttpContext ctx) =>
{
    var ospite = Ospite.SenzaAccount(ctx);
    var uid = Ospite.ChiUsa(ctx);
    var testi = quota.RimasteTesto(uid, ospite);
    var immagini = quota.RimasteImmagini(uid, ospite);
    if (ospite)
    {
        // per gli ospiti vale il contatore più stretto tra cookie e IP
        testi = Math.Min(testi, quota.RimasteTesto(Ospite.ChiaveIp(ctx), true));
        immagini = Math.Min(immagini, quota.RimasteImmagini(Ospite.ChiaveIp(ctx), true));
    }
    return Results.Json(new { testi, immagini });
}).AllowAnonymous();

// ═══════════════════════════ API del wizard-PERSONAGGIO ═══════════════════════════

// Autosave dello stato del PG (come per le avventure: chiamato a ogni modifica, debounced)
api.MapPost("/pg/{id:guid}/stato", async (
    Guid id, [FromBody] SalvaPgRichiesta body,
    ApplicationDbContext db, HttpContext ctx, CancellationToken ct) =>
{
    var uid = Ospite.ChiUsa(ctx);
    var pg = await db.Personaggi.FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (pg is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.StatoJson)) return Results.BadRequest(new { errore = "stato mancante" });
    if (body.StatoJson.Length > 500_000) return Results.BadRequest(new { errore = "stato troppo grande" });
    try { _ = System.Text.Json.Nodes.JsonNode.Parse(body.StatoJson); }
    catch { return Results.BadRequest(new { errore = "stato non è JSON valido" }); }

    pg.StatoJson = body.StatoJson;
    if (body.PassoCorrente is int pc) pg.PassoCorrente = Math.Clamp(pc, 0, 20);
    if (!string.IsNullOrWhiteSpace(body.Nome)) pg.Nome = body.Nome.Trim();
    pg.AggiornatoIl = DateTime.UtcNow;
    await db.SaveChangesAsync(ct);
    return Results.Ok(new { salvato = pg.AggiornatoIl });
}).AllowAnonymous();

// Aiuto narrativo AI su UN campo della scheda PG (descrizione, kage, enja, tratti…)
api.MapPost("/pg/{id:guid}/ai-campo", async (
    Guid id, [FromBody] PgCampoRichiesta body,
    ApplicationDbContext db, AnthropicService ai, QuotaAi quota, HttpContext ctx,
    CancellationToken ct) =>
{
    var uid = Ospite.ChiUsa(ctx);
    var pg = await db.Personaggi.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (pg is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.Campo)) return Results.BadRequest(new { errore = "campo mancante" });
    if (!ai.Attivo) return Results.Problem("AI non configurata su questo server", statusCode: 503);
    var ospite = Ospite.SenzaAccount(ctx);
    if (!quota.ConsumaTesto(uid, ospite)) return Results.Problem("Quota AI giornaliera esaurita", statusCode: 429);
    if (ospite && !quota.ConsumaTesto(Ospite.ChiaveIp(ctx), true))
        return Results.Problem("Quota AI giornaliera esaurita", statusCode: 429); // gli ospiti contano anche per IP: il cookie si ricrea, l'IP no

    // politica AI del wizard PG (decisione utente 2026-08-18):
    // ospite → Opus 5 a ragionamento medio, fisso; registrato → medio di base, alto a scelta (modello libero)
    var (modello, effort) = Ospite.SenzaAccount(ctx)
        ? ("claude-opus-5", "medium")
        : (body.Modello, string.Equals(body.Effort, "high", StringComparison.OrdinalIgnoreCase) ? "high" : "medium");
    // Fable per ora è in vetrina ma spento (decisione utente): chi lo chiede ricade sul default
    if (string.Equals(modello, "claude-fable-5", StringComparison.OrdinalIgnoreCase)) modello = null;

    try
    {
        var testo = await ai.GeneraCampoPg(pg.StatoJson, body.Campo, body.Indicazioni, ct, modello, effort);
        return Results.Json(new { testo });
    }
    catch (Exception ex) { return Results.Problem(ex.Message, statusCode: 502); }
}).AllowAnonymous();

// Genera un'IMMAGINE per il PG (ritratto o scena) e la salva nella cartella del personaggio
api.MapPost("/pg/{id:guid}/immagine", async (
    Guid id, [FromBody] PgImmagineRichiesta body,
    ApplicationDbContext db, ImmaginiService img, QuotaAi quota, HttpContext ctx,
    IWebHostEnvironment env, CancellationToken ct) =>
{
    var uid = Ospite.ChiUsa(ctx);
    var pg = await db.Personaggi.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == uid, ct);
    if (pg is null) return Results.NotFound();
    if (string.IsNullOrWhiteSpace(body.Prompt)) return Results.BadRequest(new { errore = "prompt mancante" });
    if (!img.Attivo) return Results.Problem("Generazione immagini non configurata su questo server", statusCode: 503);
    var ospiteImg = Ospite.SenzaAccount(ctx);
    if (!quota.ConsumaImmagine(uid, ospiteImg)) return Results.Problem("Quota immagini giornaliera esaurita", statusCode: 429);
    if (ospiteImg && !quota.ConsumaImmagine(Ospite.ChiaveIp(ctx), true))
        return Results.Problem("Quota immagini giornaliera esaurita", statusCode: 429);

    try
    {
        var png = await img.Genera(body.Prompt!, ct); // quadrato: stesso formato delle foto PG esistenti
        var dir = Path.Combine(env.WebRootPath, "allegati", $"pg-{id}");
        Directory.CreateDirectory(dir);
        // il ritratto è UNO (sovrascrive); scene e volti-Kage si accumulano con un timestamp
        var nomeFile = body.Tipo switch
        {
            "ritratto" => "ritratto.png",
            "kage" => $"kage-{DateTime.UtcNow.Ticks}.png",
            "enja" => $"enja-{DateTime.UtcNow.Ticks}.png",
            _ => $"scena-{DateTime.UtcNow.Ticks}.png"
        };
        await File.WriteAllBytesAsync(Path.Combine(dir, nomeFile), png, ct);
        return Results.Json(new { url = $"/allegati/pg-{id}/{nomeFile}?v={DateTime.UtcNow.Ticks}" });
    }
    catch (Exception ex) { return Results.Problem(ex.Message, statusCode: 502); }
}).AllowAnonymous();

app.Run();

public record SalvaStatoRichiesta(string StatoJson, int? PassoCorrente, string? Titolo);
// Modello = id del modello AI, Effort = livello di ragionamento — scelti dai menù nel wizard
// (entrambi facoltativi; validati lato server contro una whitelist)
public record ProponiRichiesta(string? Indicazioni, string? Modello = null, string? Effort = null);
public record DescrizioneRichiesta(string? PersonaId, string? Modello = null, string? Effort = null);
public record CampoSchedaRichiesta(string? PersonaId, string? Campo, string? Modello = null, string? Effort = null);
public record CalendarioRichiesta(string? Richiesta, string? Modello = null, string? Effort = null);
public record GeneraFotoRichiesta(string? PersonaId, string? Prompt);
public record HandoutRichiesta(string? HandoutId, string? Modello = null, string? Effort = null);
public record HandoutHtmlRichiesta(string? HandoutId, string? Html, List<VersioneHandout>? Versioni = null);
public record VersioneHandout(string? Html, string? Quando);
// wizard-personaggio
public record SalvaPgRichiesta(string StatoJson, int? PassoCorrente, string? Nome);
public record PgCampoRichiesta(string? Campo, string? Indicazioni, string? Modello = null, string? Effort = null);
public record PgImmagineRichiesta(string? Prompt, string? Tipo);
