using System.ComponentModel.DataAnnotations;

namespace GenkaiWizard.Data;

/// <summary>
/// Un progetto-avventura del wizard. Lo stato completo dei passi vive in StatoJson
/// (contratto: Wizard/schema/avventura.schema.json) — colonna JSON per lasciare
/// libero lo schema di evolvere senza migrazioni.
/// </summary>
public class ProgettoAvventura
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string UtenteId { get; set; } = "";

    [Required, MaxLength(120)]
    public string Titolo { get; set; } = "Nuovo caso";

    /// <summary>0 = setup … 11 = calendario vivo, 12 = validazione/export</summary>
    public int PassoCorrente { get; set; }

    /// <summary>true per il progetto d'esempio (caso Kuroda) — sola lettura</summary>
    public bool Demo { get; set; }

    public DateTime CreatoIl { get; set; } = DateTime.UtcNow;
    public DateTime AggiornatoIl { get; set; } = DateTime.UtcNow;

    public string StatoJson { get; set; } = """{ "versione": 1 }""";
}
