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
    public IndexModel(ApplicationDbContext db) => _db = db;

    public List<Personaggio> Personaggi { get; set; } = new();
    /// <summary>Id → nome del personaggio (da identita nello stato) — mostrato accanto all'alias.</summary>
    public Dictionary<Guid, string> NomiPg { get; set; } = new();

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
                var id = System.Text.Json.Nodes.JsonNode.Parse(p.StatoJson)?["identita"];
                var nome = ($"{id?["cognome"]} {id?["nome"]}").Trim();
                NomiPg[p.Id] = nome;
            }
            catch { NomiPg[p.Id] = ""; }
        }
    }

    public async Task<IActionResult> OnPostCreaAsync(string? nome)
    {
        var pg = new Personaggio
        {
            UtenteId = Uid,
            Nome = string.IsNullOrWhiteSpace(nome) ? "Nuovo investigatore" : nome.Trim(),
            // stato iniziale: attributi tutti a 4 (regola scheda vuota), Lotta 1 d'accademia già presente
            StatoJson = """
            {
              "versione": 1,
              "identita": { "cognome": "", "nome": "", "kanji": "", "eta": 30, "genere": "m", "ruolo": "Investigatore", "grado": "", "anniServizio": 5, "quartiere": "", "via": "", "telefono": "", "pocketBell": "", "altroContatto": "" },
              "attributi": { "Distacco": 4, "Pazienza": 4, "Silenzio": 4, "Lucidità": 4, "Ascolto": 4, "Presenza": 4 },
              "ki": { "dadi": null, "ritirato": false, "extra": 0 },
              "gouId": "",
              "senmon": [ { "id": "lotta", "grado": 1, "usi": 0, "diBase": true } ],
              "descrizioneFisica": "", "ritratto": "", "chiSei": "",
              "kage": { "archetipo": "", "problema": "", "png": "", "persone": [] },
              "esperienza": { "sfondo": "", "musica": "", "volume": 60, "scelto": false },
              "enja": [ { "cognome": "", "nome": "", "eta": "", "relazione": "", "en": "", "comeConosciuti": "", "cosaSa": "", "aspetto": "", "ritratto": "" } ],
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
