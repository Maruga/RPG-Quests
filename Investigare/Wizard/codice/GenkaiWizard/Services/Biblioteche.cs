using System.Text.Json.Nodes;

namespace GenkaiWizard.Services;

/// <summary>
/// Carica in memoria (una volta, all'avvio) le biblioteche JSON e i prompt AI
/// da Dati/. Le biblioteche alimentano i suggerimenti 🎲 (gratis, offline);
/// i prompt vengono concatenati dal servizio AI per le proposte ✨.
/// </summary>
public class Biblioteche
{
    private readonly Dictionary<string, JsonNode> _lib = new(StringComparer.OrdinalIgnoreCase);
    private readonly Dictionary<string, string> _prompts = new(StringComparer.OrdinalIgnoreCase);
    // prompt handout: un file per tipologia in Dati/prompts/handout/ (chiave = slug del tipo)
    private readonly Dictionary<string, string> _handout = new(StringComparer.OrdinalIgnoreCase);

    private const string MarcatoreVistaPubblica = "<!-- vista: pubblica -->";

    public Biblioteche(IWebHostEnvironment env)
    {
        var baseDir = Path.Combine(env.ContentRootPath, "Dati");

        foreach (var f in Directory.GetFiles(Path.Combine(baseDir, "biblioteche"), "*.json"))
            _lib[Path.GetFileNameWithoutExtension(f)] = JsonNode.Parse(File.ReadAllText(f))!;

        foreach (var f in Directory.GetFiles(Path.Combine(baseDir, "prompts"), "*.md"))
            _prompts[Path.GetFileNameWithoutExtension(f)] = File.ReadAllText(f);

        // prompt handout per-tipologia: sottocartella dedicata, un .md per tipo (+ _base, _default)
        var hdir = Path.Combine(baseDir, "prompts", "handout");
        if (Directory.Exists(hdir))
            foreach (var f in Directory.GetFiles(hdir, "*.md"))
                _handout[Path.GetFileNameWithoutExtension(f)] = File.ReadAllText(f);
    }

    public IEnumerable<string> Nomi => _lib.Keys;

    public JsonNode Lib(string nome) =>
        _lib.TryGetValue(nome, out var n) ? n : throw new KeyNotFoundException($"Biblioteca '{nome}' inesistente");

    public bool HaLib(string nome) => _lib.ContainsKey(nome);

    public string Prompt(string nome) =>
        _prompts.TryGetValue(nome, out var p) ? p : throw new KeyNotFoundException($"Prompt '{nome}' inesistente");

    /// <summary>
    /// System prompt per un handout di tipologia <paramref name="slug"/>:
    /// <c>_base.md</c> + il file del tipo (o <c>_default.md</c> se il tipo non ha il suo file).
    /// Il marcatore "vista: pubblica" viene tolto dal testo.
    /// </summary>
    public string PromptHandout(string slug)
    {
        var basePart = _handout.TryGetValue("_base", out var b) ? b : "";
        var tipoPart = _handout.TryGetValue(slug, out var t) ? t
                     : _handout.TryGetValue("_default", out var d) ? d
                     : "";
        tipoPart = tipoPart.Replace(MarcatoreVistaPubblica, "").TrimStart();
        return (basePart + "\n\n" + tipoPart).Trim();
    }

    /// <summary>
    /// True se il file-tipo dichiara <c>&lt;!-- vista: pubblica --&gt;</c>: l'handout riceve solo i
    /// dati PUBBLICI del caso (documenti scritti da chi non ha accesso al fascicolo, es. il giornale).
    /// </summary>
    public bool HandoutVistaPubblica(string slug) =>
        _handout.TryGetValue(slug, out var t) && t.Contains(MarcatoreVistaPubblica);
}
