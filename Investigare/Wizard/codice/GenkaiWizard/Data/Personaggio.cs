using System.ComponentModel.DataAnnotations;

namespace GenkaiWizard.Data;

/// <summary>
/// Un personaggio giocante creato col wizard-PG. Come per le avventure, lo stato completo
/// (attributi, Gou, Senmon, Kage, Enja, Shugyō…) vive in StatoJson: colonna JSON libera
/// di evolvere senza migrazioni. Un PG potrà appartenere a PIÙ gruppi (sezione futura):
/// per questo il gruppo NON è una colonna del personaggio.
/// </summary>
public class Personaggio
{
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public string UtenteId { get; set; } = "";

    [Required, MaxLength(120)]
    public string Nome { get; set; } = "Nuovo investigatore";

    /// <summary>indice del passo corrente del wizard-PG (0-based)</summary>
    public int PassoCorrente { get; set; }

    public DateTime CreatoIl { get; set; } = DateTime.UtcNow;
    public DateTime AggiornatoIl { get; set; } = DateTime.UtcNow;

    public string StatoJson { get; set; } = """{ "versione": 1 }""";
}
