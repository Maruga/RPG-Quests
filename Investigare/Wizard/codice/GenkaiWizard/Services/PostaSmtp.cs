using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Identity.UI.Services;

namespace GenkaiWizard.Services;

/// <summary>
/// Le email di servizio del wizard (password dimenticata, avvisi agli utenti) via SMTP.
/// Config: <c>Posta:Smtp:Host / Porta / Utente / Password</c> + <c>Posta:Mittente</c>
/// (sul server: variabili <c>Posta__Smtp__*</c> nel web.config, come le chiavi AI).
/// Il server di posta (inout) accetta AUTH LOGIN sulla 587 SENZA STARTTLS — verificato
/// il 2026-08-18: EnableSsl resta spento; web e posta stanno nella stessa infrastruttura.
/// Senza configurazione l'invio è un no-op che scrive un avviso nel log (il sito non muore).
/// </summary>
public sealed class PostaSmtp : IEmailSender
{
    private readonly IConfiguration _cfg;
    private readonly ILogger<PostaSmtp> _log;

    public PostaSmtp(IConfiguration cfg, ILogger<PostaSmtp> log) { _cfg = cfg; _log = log; }

    public async Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        var host = _cfg["Posta:Smtp:Host"];
        if (string.IsNullOrWhiteSpace(host))
        {
            _log.LogWarning("Posta non configurata: email «{Oggetto}» a {Destinatario} NON inviata", subject, email);
            return;
        }
        var porta = int.TryParse(_cfg["Posta:Smtp:Porta"], out var p) ? p : 587;
        var mittente = _cfg["Posta:Mittente"] ?? _cfg["Posta:Smtp:Utente"]
            ?? throw new InvalidOperationException("Posta:Mittente mancante");

        using var client = new SmtpClient(host, porta)
        {
            Credentials = new NetworkCredential(_cfg["Posta:Smtp:Utente"], _cfg["Posta:Smtp:Password"]),
            EnableSsl = false,
            Timeout = 20000
        };
        using var msg = new MailMessage(new MailAddress(mittente, "GENKAI 限界"), new MailAddress(email))
        {
            Subject = subject,
            Body = htmlMessage,
            IsBodyHtml = true,
            BodyEncoding = System.Text.Encoding.UTF8,
            SubjectEncoding = System.Text.Encoding.UTF8
        };
        await client.SendMailAsync(msg);
        _log.LogInformation("Email «{Oggetto}» inviata a {Destinatario}", subject, email);
    }
}
