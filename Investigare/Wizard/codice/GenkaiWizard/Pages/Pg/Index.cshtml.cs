using System.Security.Claims;
using GenkaiWizard.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace GenkaiWizard.Pages.Pg;

public class IndexModel : PageModel
{
    private readonly ApplicationDbContext _db;
    private readonly IConfiguration _cfg;
    public IndexModel(ApplicationDbContext db, IConfiguration cfg) { _db = db; _cfg = cfg; }

    [TempData] public string? Avviso { get; set; }

    public List<Personaggio> Personaggi { get; set; } = new();
    /// <summary>Id → nome del personaggio (da identita nello stato) — mostrato accanto all'alias.</summary>
    public Dictionary<Guid, string> NomiPg { get; set; } = new();
    /// <summary>Id → passo raggiunto nel wizard (0 = Il tè … 12 = Riepilogo), per la barra di avanzamento.</summary>
    public Dictionary<Guid, int> PassoPg { get; set; } = new();

    private string Uid => Services.Ospite.ChiUsa(HttpContext);

    public async Task OnGetAsync()
    {
        Personaggi = await _db.Personaggi
            .Where(p => p.UtenteId == Uid)
            .OrderByDescending(p => p.AggiornatoIl)
            .ToListAsync();
        foreach (var p in Personaggi)
        {
            try
            {
                var stato = System.Text.Json.Nodes.JsonNode.Parse(p.StatoJson);
                var id = stato?["identita"];
                var nome = ($"{id?["cognome"]} {id?["nome"]}").Trim();
                NomiPg[p.Id] = nome;
                PassoPg[p.Id] = Math.Clamp((int?)stato?["passoCorrente"] ?? 0, 0, 12);
            }
            catch { NomiPg[p.Id] = ""; PassoPg[p.Id] = 0; }
        }
    }

    public async Task<IActionResult> OnPostCreaAsync(string? nome)
    {
        // senza account: al massimo poche schede (decisione utente: «una scheda, poco più»).
        // Con l'account il tetto sparisce — e quello che c'è si sposta lì da solo.
        if (Services.Ospite.SenzaAccount(HttpContext))
        {
            var max = int.TryParse(_cfg["Limiti:PgAnonimo"], out var m) ? m : 2;
            var quanti = await _db.Personaggi.CountAsync(p => p.UtenteId == Uid);
            if (quanti >= max)
            {
                Avviso = $"Senza account puoi tenere al massimo {max} schede su questo browser. "
                       + "Crea un account (gratis): le schede che hai fatto si spostano da sole, e il limite sparisce.";
                return RedirectToPage();
            }
        }

        var pg = new Personaggio
        {
            UtenteId = Uid,
            Nome = string.IsNullOrWhiteSpace(nome) ? "Nuovo investigatore" : nome.Trim(),
            // stato iniziale: attributi tutti a 4 (regola scheda vuota), Lotta 1 d'accademia già presente
            StatoJson = """
            {
              "versione": 1,
              "identita": { "cognome": "", "nome": "", "kanji": "", "eta": "", "genere": "", "ruolo": "", "grado": "", "anniServizio": "", "quartiere": "", "via": "", "telefono": "", "cellulare": "", "pocketBell": "", "altroContatto": "" },
              "attributi": { "Distacco": 4, "Pazienza": 4, "Silenzio": 4, "Lucidità": 4, "Ascolto": 4, "Presenza": 4 },
              "ki": { "dadi": null, "ritirato": false, "extra": 0 },
              "gouId": "",
              "senmon": [ { "id": "lotta", "grado": 1, "usi": 0, "diBase": true } ],
              "descrizioneFisica": "", "ritratto": "", "chiSei": "",
              "kage": { "archetipo": "", "problema": "", "png": "", "persone": [] },
              "esperienza": { "sfondo": "", "musica": "", "volume": 60, "scelto": false },
              "enja": [ { "cognome": "", "nome": "", "eta": "", "relazione": "", "en": "", "comeConosciuti": "", "cosaSa": "", "aspetto": "", "carattere": "", "comeParla": "", "vuole": "", "ritratto": "" } ],
              "comportamento": { "tatemae": "", "honne": "", "fraseTipica": "", "sottoPressione": "", "debolezza": "" },
              "tratti": { "vizio": "", "tic": "", "oggetto": "", "gusto": "", "liberoEtichetta": "Rituale", "libero": "" },
              "rapporti": [],
              "scene": [],
              "shugyo": { "punti": 0, "log": [], "gouAffinato": false }
            }
            """
        };
        _db.Personaggi.Add(pg);
        await _db.SaveChangesAsync();
        return RedirectToPage("/Pg/Scheda", new { id = pg.Id });
    }

    public async Task<IActionResult> OnPostEliminaAsync(Guid id)
    {
        var pg = await _db.Personaggi.FirstOrDefaultAsync(x => x.Id == id && x.UtenteId == Uid);
        if (pg is not null)
        {
            _db.Personaggi.Remove(pg);
            await _db.SaveChangesAsync();
        }
        return RedirectToPage();
    }
}
