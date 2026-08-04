using System.Text;
using System.Text.Json.Nodes;

namespace GenkaiWizard.Services;

/// <summary>
/// Generazione ritratti (OpenAI Images, /v1/images/generations).
/// Chiave SOLO lato server: config OpenAI:ApiKey o env OPENAI_API_KEY.
/// Separata dalla chiave testi (Anthropic). Senza chiave il pulsante "Crea foto" resta nascosto.
/// </summary>
public class ImmaginiService
{
    private readonly HttpClient _http;
    private readonly string? _apiKey;
    private readonly string _model;
    private readonly string _size;

    public ImmaginiService(HttpClient http, IConfiguration cfg)
    {
        _http = http;
        _apiKey = cfg["OpenAI:ApiKey"] ?? Environment.GetEnvironmentVariable("OPENAI_API_KEY");
        _model = cfg["OpenAI:ImageModel"] ?? "gpt-image-1";
        _size = cfg["OpenAI:ImageSize"] ?? "1024x1024";
        _http.BaseAddress ??= new Uri("https://api.openai.com/");
        _http.Timeout = TimeSpan.FromSeconds(180);
    }

    public bool Attivo => !string.IsNullOrWhiteSpace(_apiKey);

    /// <summary>Genera un'immagine dal prompt e restituisce i byte PNG. size opzionale (es. "1024x1536" per i ritratti verticali).</summary>
    public async Task<byte[]> Genera(string prompt, CancellationToken ct, string? size = null)
    {
        if (!Attivo)
            throw new InvalidOperationException("Generazione immagini non configurata: impostare OPENAI_API_KEY (o OpenAI:ApiKey)");

        var payload = new JsonObject
        {
            ["model"] = _model,
            ["prompt"] = prompt,
            ["n"] = 1,
            ["size"] = size ?? _size
        };

        using var req = new HttpRequestMessage(HttpMethod.Post, "v1/images/generations");
        req.Headers.Add("Authorization", $"Bearer {_apiKey}");
        req.Content = new StringContent(payload.ToJsonString(), Encoding.UTF8, "application/json");

        using var resp = await _http.SendAsync(req, ct);
        var body = await resp.Content.ReadAsStringAsync(ct);
        if (!resp.IsSuccessStatusCode)
            throw new InvalidOperationException($"OpenAI {(int)resp.StatusCode}: {body}");

        var dato = JsonNode.Parse(body)!["data"]![0]!;
        // gpt-image-1 restituisce sempre b64_json; dall-e può restituire un url
        var b64 = dato["b64_json"]?.GetValue<string>();
        if (!string.IsNullOrEmpty(b64))
            return Convert.FromBase64String(b64);

        var url = dato["url"]?.GetValue<string>()
            ?? throw new InvalidOperationException("Risposta OpenAI senza immagine");
        return await _http.GetByteArrayAsync(url, ct);
    }
}
