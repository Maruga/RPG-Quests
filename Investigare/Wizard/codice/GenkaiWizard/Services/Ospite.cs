using System.Security.Claims;
using GenkaiWizard.Data;
using Microsoft.EntityFrameworkCore;

namespace GenkaiWizard.Services;

/// <summary>
/// Chi sta usando il wizard. Se ha fatto l'accesso è il suo account; altrimenti è un
/// «ospite» legato a un cookie di QUESTO browser — così si può creare un investigatore
/// senza registrarsi. Quando poi si registra o entra, quello che ha creato passa sul suo account.
/// </summary>
public static class Ospite
{
    public const string NomeCookie = "genkai_ospite";
    private const string Prefisso = "ospite:";

    /// <summary>true se sta lavorando senza account (i dati vivono solo in questo browser).</summary>
    public static bool SenzaAccount(HttpContext ctx) => ctx.User?.Identity?.IsAuthenticated != true;

    /// <summary>L'identificativo del proprietario delle schede: account oppure ospite.</summary>
    public static string ChiUsa(HttpContext ctx)
    {
        var id = ctx.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        return string.IsNullOrEmpty(id) ? Prefisso + Codice(ctx) : id;
    }

    /// <summary>Chiave di quota legata all'indirizzo del visitatore: dietro Cloudflare il vero IP
    /// sta in CF-Connecting-IP (RemoteIp sarebbe il bordo Cloudflare, condiviso da tanti).</summary>
    public static string ChiaveIp(HttpContext ctx)
    {
        var ip = ctx.Request.Headers["CF-Connecting-IP"].FirstOrDefault();
        if (string.IsNullOrWhiteSpace(ip)) ip = ctx.Connection.RemoteIpAddress?.ToString() ?? "sconosciuto";
        return "ip:" + ip;
    }

    /// <summary>Il codice dell'ospite in questo browser; se non c'è, lo crea e lo mette nel cookie.</summary>
    public static string Codice(HttpContext ctx)
    {
        if (ctx.Items.TryGetValue(NomeCookie, out var memo) && memo is string giaVisto && giaVisto.Length > 0)
            return giaVisto;

        var codice = ctx.Request.Cookies[NomeCookie];
        if (string.IsNullOrWhiteSpace(codice) || !Guid.TryParse(codice, out _))
        {
            codice = Guid.NewGuid().ToString("N");
            ctx.Response.Cookies.Append(NomeCookie, codice, new CookieOptions
            {
                HttpOnly = true,
                IsEssential = true,          // serve al funzionamento: non richiede consenso
                SameSite = SameSiteMode.Lax,
                Secure = ctx.Request.IsHttps,
                Expires = DateTimeOffset.UtcNow.AddYears(1)
            });
        }
        ctx.Items[NomeCookie] = codice;
        return codice;
    }

    /// <summary>
    /// Passa all'account appena creato (o a cui si è appena entrati) tutto quello che
    /// l'ospite aveva costruito in questo browser. Restituisce quante schede sono passate.
    /// </summary>
    public static async Task<int> TrasferisciAsync(ApplicationDbContext db, HttpContext ctx, string utenteId)
    {
        var codice = ctx.Request.Cookies[NomeCookie];
        if (string.IsNullOrWhiteSpace(codice)) return 0;

        var vecchio = Prefisso + codice;
        var suoi = await db.Personaggi.Where(p => p.UtenteId == vecchio).ToListAsync();
        if (suoi.Count == 0) return 0;

        foreach (var p in suoi) p.UtenteId = utenteId;
        await db.SaveChangesAsync();
        ctx.Response.Cookies.Delete(NomeCookie);
        return suoi.Count;
    }
}
