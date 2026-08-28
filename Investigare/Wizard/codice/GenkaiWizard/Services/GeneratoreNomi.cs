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

    /// <summary>
    /// I kanji di un nome scritto a mano, TUTTO IN LOCALE (nessuna AI, nessun costo, immediato):
    /// 1) se il nome è in biblioteca si usano i suoi kanji veri;
    /// 2) altrimenti si compone con i morfemi (yama→山, moto→本…), prendendo ogni volta il pezzo più lungo;
    /// 3) se non si scompone (nome straniero o lettura insolita) si scrive in katakana — che è
    ///    esattamente ciò che fa il giapponese con un nome che non conosce.
    /// Non torna MAI il romaji spacciato per kanji.
    /// </summary>
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
        kCog ??= Componi(cognome, "cognomi") ?? Katakana(cognome);
        kNome ??= Componi(nome, "nomi") ?? Katakana(nome);
        return string.IsNullOrEmpty(kCog) || string.IsNullOrEmpty(kNome) ? "" : $"{kCog} {kNome}";
    }

    /// <summary>Scompone il rōmaji nei morfemi della biblioteca (il più lungo che combacia) e li scrive
    /// in kanji. null se anche un solo pezzo resta scoperto: meglio il katakana di un kanji inventato.</summary>
    private string? Componi(string parola, string sezione)
    {
        var tavola = _bib.Lib("nomi")["morfemi"]?[sezione]?.AsObject();
        if (tavola is null) return null;
        var s = Normalizza(parola);
        if (s.Length == 0) return null;
        var sb = new System.Text.StringBuilder();
        var i = 0;
        while (i < s.Length)
        {
            string? preso = null;
            for (var len = Math.Min(8, s.Length - i); len >= 1 && preso is null; len--)
                if (tavola.TryGetPropertyValue(s.Substring(i, len), out var k) && k is not null)
                    { preso = k.GetValue<string>(); i += len; }
            if (preso is null) return null;   // pezzo sconosciuto: si ripiega sul katakana
            sb.Append(preso);
        }
        return sb.ToString();
    }

    /// <summary>rōmaji → minuscolo senza macron e senza apostrofi (Ōno → ono, Jun'ichi → junichi).</summary>
    private static string Normalizza(string s)
    {
        s = s.Trim().ToLowerInvariant()
             .Replace("ō", "o").Replace("ô", "o").Replace("ū", "u").Replace("û", "u")
             .Replace("ā", "a").Replace("ī", "i").Replace("ē", "e").Replace("'", "").Replace("’", "");
        return new string(s.Where(char.IsLetter).ToArray());
    }

    private static readonly (string R, string K)[] _kana =
    {
        // digrammi e sillabe speciali prima delle semplici: l'ordine è la regola di lettura
        ("kya","キャ"),("kyu","キュ"),("kyo","キョ"),("gya","ギャ"),("gyu","ギュ"),("gyo","ギョ"),
        ("sha","シャ"),("shu","シュ"),("sho","ショ"),("shi","シ"),("cha","チャ"),("chu","チュ"),
        ("cho","チョ"),("chi","チ"),("tsu","ツ"),("ja","ジャ"),("ju","ジュ"),("jo","ジョ"),("ji","ジ"),
        ("nya","ニャ"),("nyu","ニュ"),("nyo","ニョ"),("hya","ヒャ"),("hyu","ヒュ"),("hyo","ヒョ"),
        ("bya","ビャ"),("byu","ビュ"),("byo","ビョ"),("pya","ピャ"),("pyu","ピュ"),("pyo","ピョ"),
        ("mya","ミャ"),("myu","ミュ"),("myo","ミョ"),("rya","リャ"),("ryu","リュ"),("ryo","リョ"),
        // grafie non-Hepburn che capitano nei nomi stranieri (Rossi → ロッシ, non ロッイ)
        ("si","シ"),("zi","ジ"),("ti","ティ"),("tu","トゥ"),("di","ディ"),("du","ドゥ"),("hu","フ"),
        ("fa","ファ"),("fi","フィ"),("fe","フェ"),("fo","フォ"),("che","ケ"),("ce","チェ"),("ci","チ"),
        ("fu","フ"),("ka","カ"),("ki","キ"),("ku","ク"),("ke","ケ"),("ko","コ"),
        ("ga","ガ"),("gi","ギ"),("gu","グ"),("ge","ゲ"),("go","ゴ"),
        ("sa","サ"),("su","ス"),("se","セ"),("so","ソ"),("za","ザ"),("zu","ズ"),("ze","ゼ"),("zo","ゾ"),
        ("ta","タ"),("te","テ"),("to","ト"),("da","ダ"),("de","デ"),("do","ド"),
        ("na","ナ"),("ni","ニ"),("nu","ヌ"),("ne","ネ"),("no","ノ"),
        ("ha","ハ"),("hi","ヒ"),("he","ヘ"),("ho","ホ"),("ba","バ"),("bi","ビ"),("bu","ブ"),
        ("be","ベ"),("bo","ボ"),("pa","パ"),("pi","ピ"),("pu","プ"),("pe","ペ"),("po","ポ"),
        ("ma","マ"),("mi","ミ"),("mu","ム"),("me","メ"),("mo","モ"),
        ("ya","ヤ"),("yu","ユ"),("yo","ヨ"),("ra","ラ"),("ri","リ"),("ru","ル"),("re","レ"),("ro","ロ"),
        ("wa","ワ"),("wo","ヲ"),("va","ヴァ"),("vi","ヴィ"),("vu","ヴ"),("ve","ヴェ"),("vo","ヴォ"),
        ("la","ラ"),("li","リ"),("lu","ル"),("le","レ"),("lo","ロ"),
        ("a","ア"),("i","イ"),("u","ウ"),("e","エ"),("o","オ"),("n","ン"),
    };

    /// <summary>rōmaji → katakana, meccanico. È la scrittura giusta per un nome che il giapponese non conosce.</summary>
    private static string Katakana(string parola)
    {
        var s = Normalizza(parola);
        if (s.Length == 0) return "";
        var sb = new System.Text.StringBuilder();
        var i = 0;
        while (i < s.Length)
        {
            // consonante doppia (Sakka → サッカ): piccolo tsu
            if (i + 1 < s.Length && s[i] == s[i + 1] && s[i] != 'n' && !"aeiou".Contains(s[i]))
                { sb.Append('ッ'); i++; continue; }
            string? preso = null;
            foreach (var (r, k) in _kana)
                if (i + r.Length <= s.Length && string.CompareOrdinal(s, i, r, 0, r.Length) == 0)
                    { preso = k; i += r.Length; break; }
            if (preso is null) { i++; continue; }   // lettera che non si legge: si salta
            sb.Append(preso);
        }
        return sb.ToString();
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
