using System.Collections.Concurrent;

namespace GenkaiWizard.Services;

/// <summary>
/// Quota giornaliera di chiamate AI per utente (il tool è pubblico: i token li paga il gestore).
/// Due contatori separati — TESTI (✨) e IMMAGINI (🎨) — con limiti diversi per ospiti e registrati
/// (decisione utente 2026-08-27: ospite 20 testi + 3 immagini, registrato 50 + 10; le immagini
/// sono la voce cara, ~0,17 $ l'una). Config: Anthropic:MaxChiamateAlGiorno / MaxChiamateOspite,
/// Immagini:MaxAlGiorno / MaxOspite.
/// V1: contatore in memoria — si azzera al riavvio dell'app e non è condiviso tra più istanze.
/// Per il multi-istanza andrà spostato su tabella DB (annotato nel README).
/// </summary>
public class QuotaAi
{
    private readonly ConcurrentDictionary<string, (DateOnly Giorno, int Conteggio)> _contatori = new();
    private readonly int _testoRegistrato, _testoOspite, _immaginiRegistrato, _immaginiOspite;

    public QuotaAi(IConfiguration cfg)
    {
        int Leggi(string chiave, int standard) => int.TryParse(cfg[chiave], out var v) ? v : standard;
        _testoRegistrato    = Leggi("Anthropic:MaxChiamateAlGiorno", 50);
        _testoOspite        = Leggi("Anthropic:MaxChiamateOspite", 20);
        _immaginiRegistrato = Leggi("Immagini:MaxAlGiorno", 10);
        _immaginiOspite     = Leggi("Immagini:MaxOspite", 3);
    }

    private int Incrementa(string chiave)
    {
        var oggi = DateOnly.FromDateTime(DateTime.UtcNow);
        return _contatori.AddOrUpdate(chiave,
            _ => (oggi, 1),
            (_, cur) => cur.Giorno == oggi ? (oggi, cur.Conteggio + 1) : (oggi, 1)).Conteggio;
    }

    private int Contati(string chiave)
    {
        var oggi = DateOnly.FromDateTime(DateTime.UtcNow);
        return _contatori.TryGetValue(chiave, out var cur) && cur.Giorno == oggi ? cur.Conteggio : 0;
    }

    /// <returns>true se la chiamata di TESTO è ammessa (e viene conteggiata)</returns>
    public bool ConsumaTesto(string utenteId, bool ospite = false)
        => Incrementa(utenteId + "|t") <= (ospite ? _testoOspite : _testoRegistrato);

    /// <returns>true se la generazione IMMAGINE è ammessa (e viene conteggiata)</returns>
    public bool ConsumaImmagine(string utenteId, bool ospite = false)
        => Incrementa(utenteId + "|i") <= (ospite ? _immaginiOspite : _immaginiRegistrato);

    public int RimasteTesto(string utenteId, bool ospite = false)
        => Math.Max(0, (ospite ? _testoOspite : _testoRegistrato) - Contati(utenteId + "|t"));

    public int RimasteImmagini(string utenteId, bool ospite = false)
        => Math.Max(0, (ospite ? _immaginiOspite : _immaginiRegistrato) - Contati(utenteId + "|i"));
}
