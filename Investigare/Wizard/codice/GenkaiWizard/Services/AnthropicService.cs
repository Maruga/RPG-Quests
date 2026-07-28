using System.Globalization;
using System.Text;
using System.Text.Json.Nodes;
using System.Text.RegularExpressions;

namespace GenkaiWizard.Services;

/// <summary>
/// Client Anthropic (REST, /v1/messages) per le proposte ✨.
/// System prompt = prompts/_comune.md + prompts/passo_XX.md;
/// user = stato JSON dei passi precedenti + eventuali indicazioni del GM.
/// La chiave vive SOLO lato server (config Anthropic:ApiKey o env ANTHROPIC_API_KEY).
/// Senza chiave il wizard funziona lo stesso: restano i suggerimenti 🎲.
/// </summary>
public class AnthropicService
{
    private readonly HttpClient _http;
    private readonly Biblioteche _bib;
    private readonly string? _apiKey;
    private readonly string _model;
    private readonly int _maxTokens;

    public AnthropicService(HttpClient http, Biblioteche bib, IConfiguration cfg)
    {
        _http = http;
        _bib = bib;
        _apiKey = cfg["Anthropic:ApiKey"] ?? Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY");
        // default = il miglior Opus disponibile (ragionamento alto di serie). Sovrascrivibile da config
        // o, per singola generazione, dal selettore nel wizard (vedi ModelloEffettivo).
        _model = cfg["Anthropic:Model"] ?? "claude-opus-5";
        // budget dei suggerimenti-passo (/proponi): generoso perché produce PIÙ proposte dettagliate
        // in JSON e, coi modelli che ragionano, il pensiero consuma il budget prima della risposta
        _maxTokens = int.TryParse(cfg["Anthropic:MaxTokens"], out var mt) ? mt : 12000;
        _http.BaseAddress ??= new Uri("https://api.anthropic.com/");
        if (!_http.DefaultRequestHeaders.Contains("anthropic-version"))
            _http.DefaultRequestHeaders.Add("anthropic-version", "2023-06-01");
        // generoso: col ragionamento max su un handout lungo la risposta può richiedere minuti
        _http.Timeout = TimeSpan.FromSeconds(300);
    }

    public bool Attivo => !string.IsNullOrWhiteSpace(_apiKey);

    // modelli che il selettore del wizard può richiedere; qualunque altro valore ricade sul default.
    // (whitelist: il client non può far usare un modello arbitrario.)
    private static readonly HashSet<string> _modelliAmmessi = new(StringComparer.OrdinalIgnoreCase)
    {
        "claude-fable-5", "claude-opus-5", "claude-sonnet-5",
        "claude-haiku-4-5", "claude-haiku-4-5-20251001"
    };

    /// <summary>Modello scelto dal client se valido (whitelist), altrimenti il default del server.</summary>
    private string ModelloEffettivo(string? richiesto)
        => !string.IsNullOrWhiteSpace(richiesto) && _modelliAmmessi.Contains(richiesto!) ? richiesto! : _model;

    // livelli di ragionamento (output_config.effort) ammessi
    private static readonly HashSet<string> _effortAmmessi = new(StringComparer.OrdinalIgnoreCase)
    { "max", "xhigh", "high", "medium", "low" };
    // modelli che SUPPORTANO effort (Haiku 4.5 NO → non gli si manda output_config)
    private static readonly HashSet<string> _modelliConEffort = new(StringComparer.OrdinalIgnoreCase)
    { "claude-fable-5", "claude-opus-5", "claude-sonnet-5" };

    /// <summary>
    /// Imposta model, max_tokens e (se il modello lo supporta) output_config.effort sul payload.
    /// Con effort max/xhigh alza il tetto di token: il ragionamento profondo consuma output e
    /// senza margine la risposta verrebbe troncata.
    /// </summary>
    private void ApplicaModelloEffort(JsonObject payload, int baseMax, string? modello, string? effort)
    {
        var mod = ModelloEffettivo(modello);
        payload["model"] = mod;

        var eff = !string.IsNullOrWhiteSpace(effort) && _effortAmmessi.Contains(effort!) ? effort!.ToLowerInvariant() : null;
        if (eff != null && _modelliConEffort.Contains(mod))
        {
            payload["output_config"] = new JsonObject { ["effort"] = eff };
            // il ragionamento consuma token PRIMA della risposta: garantiamo un margine per livello,
            // così anche un campo piccolo (una riga) non esce vuoto/troncato perché il pensiero l'ha esaurito
            var tetto = eff switch
            {
                "max" => 32000,
                "xhigh" => 24000,
                "high" => 6000,
                "medium" => 3000,
                _ => baseMax // low: poco ragionamento, basta il budget del compito
            };
            payload["max_tokens"] = Math.Max(baseMax, tetto);
        }
        else
        {
            payload["max_tokens"] = baseMax; // Haiku o effort assente: budget standard
        }
    }

    /// <summary>Elenco (id, etichetta) dei modelli selezionabili — per popolare il menù nel wizard.</summary>
    public static IReadOnlyList<(string Id, string Nome)> ModelliSelezionabili => new[]
    {
        ("claude-opus-5",   "Opus 5 — qualità alta (consigliato)"),
        ("claude-fable-5",  "Fable 5 — massima qualità"),
        ("claude-sonnet-5", "Sonnet 5 — equilibrato"),
        ("claude-haiku-4-5","Haiku 4.5 — veloce/economico"),
    };

    public async Task<string> Proponi(int passo, string statoJson, string? indicazioni, CancellationToken ct, string? modello = null, string? effort = null)
    {
        if (!Attivo)
            throw new InvalidOperationException("AI non configurata: impostare ANTHROPIC_API_KEY (o Anthropic:ApiKey)");
        if (passo is < 1 or > 11)
            throw new ArgumentOutOfRangeException(nameof(passo));

        var system = _bib.Prompt("_comune") + "\n\n---\n\n" + _bib.Prompt($"passo_{passo:00}");

        var sb = new StringBuilder();
        sb.AppendLine("## Stato del progetto (passi precedenti)");
        sb.AppendLine("```json");
        sb.AppendLine(statoJson);
        sb.AppendLine("```");
        if (!string.IsNullOrWhiteSpace(indicazioni))
        {
            sb.AppendLine();
            sb.AppendLine("## Indicazioni del GM per questo passo");
            sb.AppendLine(indicazioni);
        }
        sb.AppendLine();
        sb.Append("Produci il JSON richiesto dal prompt del passo. Solo JSON.");

        var payload = new JsonObject
        {
            ["system"] = system,
            ["messages"] = new JsonArray(
                new JsonObject { ["role"] = "user", ["content"] = sb.ToString() })
        };
        ApplicaModelloEffort(payload, _maxTokens, modello, effort);

        using var req = new HttpRequestMessage(HttpMethod.Post, "v1/messages");
        req.Headers.Add("x-api-key", _apiKey);
        req.Content = new StringContent(payload.ToJsonString(), Encoding.UTF8, "application/json");

        using var resp = await _http.SendAsync(req, ct);
        var body = await resp.Content.ReadAsStringAsync(ct);
        if (!resp.IsSuccessStatusCode)
            throw new InvalidOperationException($"Anthropic {(int)resp.StatusCode}: {body}");

        var text = EstraiTesto(body);

        // il modello può avvolgere il JSON in testo/fence: si estrae il primo blocco { … }
        var start = text.IndexOf('{');
        var end = text.LastIndexOf('}');
        return start >= 0 && end > start ? text[start..(end + 1)] : text;
    }

    /// <summary>
    /// Descrizione FISICA di un personaggio del caso (per la scheda e per generare il ritratto).
    /// Legge lo stato e restituisce testo semplice: solo aspetto osservabile, coerente con età/genere/mondo.
    /// </summary>
    public Task<string> DescriviPersona(string statoJson, string personaId, CancellationToken ct, string? modello = null, string? effort = null)
    {
        // prompt dedicato e modificabile: Dati/prompts/descrizione_fisica.md
        return Genera(_bib.Prompt("descrizione_fisica"),
            $"Persona da descrivere: id \"{personaId}\".\n\nStato del caso:\n```json\n{statoJson}\n```\n\nSolo il paragrafo di descrizione fisica.",
            1500, ct, modello, effort);
    }

    /// <summary>
    /// DEPOSIZIONE alla polizia del personaggio, in prima persona, stile verbale di sommarie informazioni.
    /// Nasce da cosa sa / cosa NON sa / cosa ha fatto davvero / come si comporta della sua scheda:
    /// se il personaggio omette o mente, la deposizione omette o mente.
    /// </summary>
    public Task<string> DeponiPersona(string statoJson, string personaId, CancellationToken ct, string? modello = null, string? effort = null)
    {
        // prompt dedicato e modificabile: Dati/prompts/deposizione.md
        return Genera(_bib.Prompt("deposizione"),
            $"Persona che depone: id \"{personaId}\".\n\nStato del caso:\n```json\n{statoJson}\n```\n\nSolo il testo della deposizione.",
            2500, ct, modello, effort);
    }

    // i campi della scheda che l'AI può proporre singolarmente (Voce + Tratti)
    private static readonly HashSet<string> _campiScheda = new(StringComparer.OrdinalIgnoreCase)
    { "intercalare", "marcatore", "appellativo", "abitudine", "saluto", "rifiuto", "minaccia", "vizio", "tic", "oggetto" };

    /// <summary>
    /// UN singolo campo della scheda del PNG (una leva della voce o un tratto), in carattere.
    /// Legge la scheda (comportamento, voce/tratti già impostati, ruolo) e restituisce una sola riga.
    /// </summary>
    public Task<string> GeneraCampo(string statoJson, string personaId, string campo, CancellationToken ct, string? modello = null, string? effort = null)
    {
        var c = _campiScheda.Contains(campo ?? "") ? campo!.ToLowerInvariant() : "intercalare";
        // prompt dedicato e modificabile: Dati/prompts/campo_scheda.md
        return Genera(_bib.Prompt("campo_scheda"),
            $"Persona: id \"{personaId}\".\nCampo da generare: {c}.\n\nStato del caso:\n```json\n{statoJson}\n```\n\nSolo il valore del campo, una riga.",
            1200, ct, modello, effort);
    }

    /// <summary>
    /// Aiuto narrativo per UN campo della scheda del PERSONAGGIO GIOCANTE (wizard-PG):
    /// descrizione fisica, Kage, Enja, tatemae/honne, tratti… Legge lo stato del PG e propone
    /// un testo in carattere. Il giocatore può dare indicazioni proprie.
    /// </summary>
    public Task<string> GeneraCampoPg(string statoJson, string campo, string? indicazioni, CancellationToken ct, string? modello = null, string? effort = null)
    {
        // prompt dedicato e modificabile: Dati/prompts/pg_campo.md
        var user = $"Campo da proporre: {campo}.\n" +
                   (string.IsNullOrWhiteSpace(indicazioni) ? "" : $"Indicazioni del giocatore: {indicazioni}\n") +
                   $"\nStato del personaggio:\n```json\n{statoJson}\n```\n\nSolo il testo proposto per quel campo.";
        return Genera(_bib.Prompt("pg_campo"), user, 2000, ct, modello, effort);
    }

    /// <summary>
    /// CONTATTI e reperibilità del PNG (residenza, telefoni, email, altro, dove trovarlo) come oggetto JSON.
    /// Il client riempie solo i campi vuoti. Dati fittizi ma coerenti col personaggio e con la Kyoto anni '90.
    /// </summary>
    public Task<string> GeneraContatti(string statoJson, string personaId, CancellationToken ct, string? modello = null, string? effort = null)
    {
        // prompt dedicato e modificabile: Dati/prompts/contatti.md — restituisce un oggetto JSON
        return Genera(_bib.Prompt("contatti"),
            $"Persona: id \"{personaId}\".\n\nStato del caso:\n```json\n{statoJson}\n```\n\nSolo l'oggetto JSON dei contatti.",
            1500, ct, modello, effort);
    }

    /// <summary>
    /// UN evento del CALENDARIO su richiesta precisa del GM ("aggiungi il funerale", "il giorno dopo la morte").
    /// Una richiesta = una cosa: di norma UN evento, dai fatti veri del caso, mai un calendario intero.
    /// </summary>
    public Task<string> CalendarioEvento(string statoJson, string richiesta, CancellationToken ct, string? modello = null, string? effort = null)
    {
        // prompt dedicato e modificabile: Dati/prompts/calendario_evento.md
        return Genera(_bib.Prompt("calendario_evento"),
            $"Richiesta del GM: {richiesta}\n\nStato del caso:\n```json\n{statoJson}\n```\n\nSolo l'oggetto JSON con l'evento (o gli eventi) richiesti.",
            2500, ct, modello, effort);
    }

    /// <summary>
    /// Contenuto di un HANDOUT (passo 13): tabulato, referto, menu, lettera… scritto dalla sua
    /// descrizione + tipo + titolo + eventuale collegamento a persona/gruppo/luogo del caso.
    /// </summary>
    public Task<string> CreaHandout(string statoJson, string handoutId, CancellationToken ct, string? modello = null, string? effort = null)
    {
        // ogni tipologia ha il SUO prompt in Dati/prompts/handout/<slug>.md (o _default.md)
        var tipo = TipoHandout(statoJson, handoutId);
        var slug = Slug(tipo);
        var system = _bib.PromptHandout(slug);

        // alcune tipologie (es. il giornale) sono scritte da chi NON ha accesso al fascicolo:
        // gli passiamo solo la vista pubblica del caso, così l'AI non può trapelare segreti/colpevole
        var stato = _bib.HandoutVistaPubblica(slug) ? StatoPubblico(statoJson) : statoJson;

        return Genera(system,
            $"Handout da scrivere: id \"{handoutId}\".\n\nStato del caso:\n```json\n{stato}\n```\n\nSolo il frammento HTML del documento.",
            8000, ct, modello, effort);
    }

    /// <summary>Legge <c>passo10.handout[id].tipo</c> dallo stato (stringa vuota se assente).</summary>
    private static string TipoHandout(string statoJson, string handoutId)
    {
        try
        {
            var arr = JsonNode.Parse(statoJson)?["passo10"]?["handout"]?.AsArray();
            var h = arr?.FirstOrDefault(n => Str(n?["id"]) == handoutId);
            return Str(h?["tipo"]) ?? "";
        }
        catch { return ""; }
    }

    /// <summary>
    /// Nome-file di una tipologia: minuscolo, accenti rimossi, non-alfanumerici → trattino singolo.
    /// «articolo di giornale» → "articolo-di-giornale"; «rapporto d'intervento» → "rapporto-d-intervento".
    /// </summary>
    public static string Slug(string tipo)
    {
        if (string.IsNullOrWhiteSpace(tipo)) return "";
        var norm = tipo.Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder(norm.Length);
        foreach (var ch in norm)
            if (CharUnicodeInfo.GetUnicodeCategory(ch) != UnicodeCategory.NonSpacingMark)
                sb.Append(ch);
        var s = sb.ToString().Normalize(NormalizationForm.FormC);
        return Regex.Replace(s, "[^a-z0-9]+", "-").Trim('-');
    }

    /// <summary>
    /// Vista PUBBLICA dello stato per gli handout "senza accesso al fascicolo" (es. il giornale):
    /// tiene SOLO i fatti pubblici + le deposizioni dei PNG + info/luoghi pubblici; scarta colpevole,
    /// movente, cronistoria-verità, campi-GM delle schede, luoghi/gruppi segreti. Fallisce CHIUSO
    /// (JSON vuoto) se non riesce a interpretare lo stato: mai trapelare per errore.
    /// </summary>
    public static string StatoPubblico(string statoJson)
    {
        JsonNode? root;
        try { root = JsonNode.Parse(statoJson); } catch { return "{}"; }
        if (root is null) return "{}";

        var pub = new JsonObject();

        // contesto generale + fatti pubblici della morte/vittima
        foreach (var k in new[] { "setup", "passo1", "passo2" })
            if (root[k] is JsonNode n) pub[k] = n.DeepClone();

        // cast: solo id + nome/cognome (NIENTE ruoloNelCaso → non trapela chi è il colpevole)
        if (root["cast"] is JsonArray cast)
        {
            var castPub = new JsonArray();
            foreach (var c in cast)
            {
                if (c is null) continue;
                var o = new JsonObject();
                foreach (var k in new[] { "id", "nome", "cognome" })
                    if (c[k] is JsonNode v) o[k] = v.DeepClone();
                castPub.Add(o);
            }
            pub["cast"] = castPub;
        }

        // schede: solo la DEPOSIZIONE (voce pubblica del PNG) — mai i campi-verità del GM
        if (root["passo8"]?["schede"] is JsonArray schede)
        {
            var schedePub = new JsonArray();
            foreach (var s in schede)
            {
                if (s is null || string.IsNullOrWhiteSpace(Str(s["deposizione"]))) continue;
                var o = new JsonObject();
                foreach (var k in new[] { "personaId", "deposizione", "depTitolo" })
                    if (s[k] is JsonNode v) o[k] = v.DeepClone();
                schedePub.Add(o);
            }
            pub["passo8"] = new JsonObject { ["schede"] = schedePub };
        }

        // informazioni: solo quelle con almeno una fonte a libero accesso (richiede == "nulla")
        if (root["passo9"]?["tracce"] is JsonArray tracce)
        {
            var traccePub = new JsonArray();
            foreach (var t in tracce)
            {
                if (t is null) continue;
                var pubblica = (t["fonti"] as JsonArray)?.Any(f => Str(f?["richiede"]) == "nulla") ?? false;
                if (!pubblica) continue;
                var o = new JsonObject();
                foreach (var k in new[] { "nome", "testo" })
                    if (t[k] is JsonNode v) o[k] = v.DeepClone();
                traccePub.Add(o);
            }
            if (traccePub.Count > 0) pub["passo9"] = new JsonObject { ["tracce"] = traccePub };
        }

        // luoghi: solo quelli NON segreti; niente cosaSiTrova/chiCe (dati investigativi)
        if (root["luoghi"] is JsonArray luoghi)
        {
            var luoghiPub = new JsonArray();
            foreach (var l in luoghi)
            {
                if (l is null || IsTrue(l["segretoPG"])) continue;
                var o = new JsonObject();
                foreach (var k in new[] { "id", "nome", "via", "quartiere", "tipologiaId", "cosaSiVede" })
                    if (l[k] is JsonNode v) o[k] = v.DeepClone();
                luoghiPub.Add(o);
            }
            pub["luoghi"] = luoghiPub;
        }

        return pub.ToJsonString();
    }

    // letture difensive (dati parziali/di tipo inatteso non devono far esplodere la generazione)
    private static string? Str(JsonNode? n) => n is JsonValue v && v.TryGetValue<string>(out var s) ? s : null;
    private static bool IsTrue(JsonNode? n) => n is JsonValue v && v.TryGetValue<bool>(out var b) && b;

    private async Task<string> Genera(string system, string user, int maxTokens, CancellationToken ct, string? modello = null, string? effort = null)
    {
        if (!Attivo)
            throw new InvalidOperationException("AI non configurata: impostare ANTHROPIC_API_KEY (o Anthropic:ApiKey)");

        var payload = new JsonObject
        {
            ["system"] = system,
            ["messages"] = new JsonArray(
                new JsonObject { ["role"] = "user", ["content"] = user })
        };
        ApplicaModelloEffort(payload, maxTokens, modello, effort);

        using var req = new HttpRequestMessage(HttpMethod.Post, "v1/messages");
        req.Headers.Add("x-api-key", _apiKey);
        req.Content = new StringContent(payload.ToJsonString(), Encoding.UTF8, "application/json");

        using var resp = await _http.SendAsync(req, ct);
        var body = await resp.Content.ReadAsStringAsync(ct);
        if (!resp.IsSuccessStatusCode)
            throw new InvalidOperationException($"Anthropic {(int)resp.StatusCode}: {body}");

        return StripFence(EstraiTesto(body));
    }

    /// <summary>
    /// Estrae il testo dalla risposta Messages: concatena i blocchi <c>type=="text"</c>.
    /// I modelli con ragionamento (Opus/Fable/Sonnet 5) antepongono un blocco "thinking"
    /// privo di campo "text", quindi NON si può assumere che il testo sia <c>content[0]</c>.
    /// </summary>
    private static string EstraiTesto(string body)
    {
        var sb = new StringBuilder();
        if (JsonNode.Parse(body)?["content"] is JsonArray content)
            foreach (var b in content)
                if (Str(b?["type"]) == "text")
                {
                    var t = Str(b?["text"]);
                    if (t != null) sb.Append(t);
                }
        return sb.ToString();
    }

    /// <summary>
    /// Toglie un eventuale blocco markdown ```lang … ``` che i modelli aggiungono
    /// nonostante le istruzioni. Vale sia per l'HTML degli handout sia per i JSON.
    /// </summary>
    private static string StripFence(string s)
    {
        s = s.Trim();
        if (s.StartsWith("```"))
        {
            var nl = s.IndexOf('\n');
            if (nl >= 0) s = s[(nl + 1)..];      // butta la riga di apertura ```html / ```json
            if (s.EndsWith("```")) s = s[..^3];  // butta la chiusura ```
            s = s.Trim();
        }
        return s;
    }
}
