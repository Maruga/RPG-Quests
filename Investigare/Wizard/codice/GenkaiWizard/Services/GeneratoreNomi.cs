using System.Text.Json.Nodes;

namespace GenkaiWizard.Services;

public record NomeGenerato(string Cognome, string Nome, string Kanji, string Genere, int Eta);

/// <summary>
/// Generatore nomi giapponesi anti-omonimie (algoritmo di biblioteche/nomi.json):
/// pool per generazione, mai nome+cognome uguali ai riservati del cast base
/// né ai nomi già nel progetto; in collisione si ripesca SOLO il nome
/// (i cognomi condivisi sono realismo).
/// </summary>
public class GeneratoreNomi
{
    private readonly Biblioteche _bib;

    public GeneratoreNomi(Biblioteche bib) => _bib = bib;

    private static string FasciaM(int eta) =>
        eta >= 57 ? "anziani" : eta >= 37 ? "adulti" : eta >= 22 ? "giovaniAdulti" : "ragazzi";

    private static string FasciaF(int eta) =>
        eta >= 57 ? "anziane" : eta >= 37 ? "adulte" : eta >= 22 ? "giovaniAdulte" : "ragazze";

    private HashSet<string> Riservati()
    {
        var nomi = _bib.Lib("nomi");
        var set = new HashSet<string>();
        foreach (var gruppo in new[] { "pg", "notevoli", "pngDeiKage" })
            foreach (var r in nomi["riservatiCastBase"]![gruppo]!.AsArray())
                set.Add(r!.GetValue<string>().ToLowerInvariant());
        return set;
    }

    /// <summary>Controllo anti-omonimie per un nome scritto a mano dal GM.</summary>
    public (bool Libero, string? Motivo, string Kanji) Verifica(string cognome, string nome, IEnumerable<string> nomiOccupatiProgetto)
    {
        var pieno = $"{cognome.Trim()} {nome.Trim()}".ToLowerInvariant();
        if (Riservati().Contains(pieno))
            return (false, "riservato: è un personaggio del cast base GENKAI", KanjiPer(cognome, nome));
        if (nomiOccupatiProgetto.Any(n => n.Trim().ToLowerInvariant() == pieno))
            return (false, "già usato in questo caso", KanjiPer(cognome, nome));
        return (true, null, KanjiPer(cognome, nome));
    }

    /// <summary>Kanji per un nome manuale: SOLO se cognome e nome sono entrambi nei pool li compone;
    /// altrimenti stringa vuota — mai rimandare indietro il romaji spacciato per kanji (il campo resta
    /// vuoto e ci pensa il ✨ AI).</summary>
    public string KanjiPer(string cognome, string nome)
    {
        var dati = _bib.Lib("nomi");
        string? kCog = null, kNome = null;
        foreach (var c in dati["cognomi"]!.AsArray())
            if (string.Equals(c!["r"]!.GetValue<string>(), cognome.Trim(), StringComparison.OrdinalIgnoreCase))
                { kCog = c["k"]!.GetValue<string>(); break; }
        foreach (var sezione in new[] { "nomiMaschili", "nomiFemminili" })
            foreach (var fascia in dati[sezione]!.AsObject())
                foreach (var n in fascia.Value!.AsArray())
                    if (string.Equals(n!["r"]!.GetValue<string>(), nome.Trim(), StringComparison.OrdinalIgnoreCase))
                        { kNome = n["k"]!.GetValue<string>(); goto fine; }
        fine:
        return kCog is not null && kNome is not null ? $"{kCog} {kNome}" : "";
    }

    /// <summary>Più proposte distinte in un colpo (per far scegliere il GM).</summary>
    public List<NomeGenerato> GeneraMolti(string genere, int eta, IEnumerable<string> nomiOccupati, int quanti, string? cognomeFisso = null)
    {
        var occupati = new List<string>(nomiOccupati);
        var esito = new List<NomeGenerato>();
        for (var i = 0; i < quanti; i++)
        {
            var n = Genera(genere, eta, occupati, cognomeFisso);
            esito.Add(n);
            occupati.Add($"{n.Cognome} {n.Nome}");
        }
        return esito;
    }

    /// <param name="nomiOccupati">nomi completi "Cognome Nome" già usati nel progetto</param>
    /// <param name="cognomeFisso">per i familiari: il cognome del nucleo, già deciso</param>
    public NomeGenerato Genera(string genere, int eta, IEnumerable<string> nomiOccupati, string? cognomeFisso = null)
    {
        var nomi = _bib.Lib("nomi");
        var rnd = Random.Shared;
        var cognomi = nomi["cognomi"]!.AsArray();
        var pool = genere == "f"
            ? nomi["nomiFemminili"]![FasciaF(eta)]!.AsArray()
            : nomi["nomiMaschili"]![FasciaM(eta)]!.AsArray();

        var occupati = new HashSet<string>(nomiOccupati.Select(n => n.Trim().ToLowerInvariant()));
        occupati.UnionWith(Riservati());

        for (var tentativo = 0; tentativo < 300; tentativo++)
        {
            // dopo i primi tentativi tiene fermo il cognome e ripesca solo il nome
            var cogNode = cognomeFisso == null
                ? cognomi[rnd.Next(cognomi.Count)]!
                : TrovaCognome(cognomi, cognomeFisso);
            var cognome = cogNode["r"]!.GetValue<string>();
            var nomeNode = pool[rnd.Next(pool.Count)]!;
            var nome = nomeNode["r"]!.GetValue<string>();

            if (occupati.Contains($"{cognome} {nome}".ToLowerInvariant()))
                continue;

            return new NomeGenerato(
                cognome, nome,
                $"{cogNode["k"]!.GetValue<string>()} {nomeNode["k"]!.GetValue<string>()}",
                genere, eta);
        }

        throw new InvalidOperationException("Impossibile trovare un nome libero (pool esaurito?)");
    }

    private static JsonNode TrovaCognome(JsonArray cognomi, string romaji)
    {
        foreach (var c in cognomi)
            if (string.Equals(c!["r"]!.GetValue<string>(), romaji, StringComparison.OrdinalIgnoreCase))
                return c;
        // cognome fuori biblioteca (inserito a mano dal GM): lo si usa così com'è
        return new JsonObject { ["r"] = romaji, ["k"] = romaji };
    }
}
