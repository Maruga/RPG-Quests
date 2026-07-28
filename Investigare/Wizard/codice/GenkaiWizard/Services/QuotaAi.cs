using System.Collections.Concurrent;

namespace GenkaiWizard.Services;

/// <summary>
/// Quota giornaliera di chiamate AI per utente (il tool è pubblico: i token li paga il gestore).
/// V1: contatore in memoria — si azzera al riavvio dell'app e non è condiviso tra più istanze.
/// Per il multi-istanza andrà spostato su tabella DB (annotato nel README).
/// </summary>
public class QuotaAi
{
    private readonly ConcurrentDictionary<string, (DateOnly Giorno, int Conteggio)> _contatori = new();
    private readonly int _maxAlGiorno;

    public QuotaAi(IConfiguration cfg)
        => _maxAlGiorno = int.TryParse(cfg["Anthropic:MaxChiamateAlGiorno"], out var m) ? m : 50;

    /// <returns>true se la chiamata è ammessa (e viene conteggiata)</returns>
    public bool Consuma(string utenteId)
    {
        var oggi = DateOnly.FromDateTime(DateTime.UtcNow);
        var esito = _contatori.AddOrUpdate(
            utenteId,
            _ => (oggi, 1),
            (_, cur) => cur.Giorno == oggi ? (oggi, cur.Conteggio + 1) : (oggi, 1));
        return esito.Conteggio <= _maxAlGiorno;
    }

    public int Rimaste(string utenteId)
    {
        var oggi = DateOnly.FromDateTime(DateTime.UtcNow);
        return _contatori.TryGetValue(utenteId, out var cur) && cur.Giorno == oggi
            ? Math.Max(0, _maxAlGiorno - cur.Conteggio)
            : _maxAlGiorno;
    }
}
