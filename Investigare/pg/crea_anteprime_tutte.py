"""
Genera anteprime DOCX per PG_02..PG_05 usando lo stesso template di crea_anteprima.py.
Per ogni PG: sostituisce i placeholder nello script crea_template.py, forza la foto,
esegue lo script in un processo Python separato, salva ANTEPRIMA_<Nome>.docx.
"""
import os, sys, subprocess, tempfile

base_dir = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(base_dir, 'crea_template.py'), 'r', encoding='utf-8') as f:
    template_script = f.read()


# =============================================================
# DATI PG_02 — HONDA Ryota
# =============================================================
PG_02 = {
    "nome_kanji": "本田 涼太",
    "nome_romanizzato": "HONDA Ryota",
    "eta": "35",
    "ruolo": "Analista Scene del Crimine",
    "grado": "Sergente (Junsa-bucho)",
    "servizio": "10 anni",
    "distacco_base": "6", "pazienza_base": "4", "silenzio_base": "4",
    "lucidita_base": "7", "ascolto_base": "4", "presenza_base": "6",
    "gou_1_nome": "Occhio della Gru 鶴の目",
    "gou_1_desc": "Vedi ciò che altri non vedono — il dettaglio che cambia tutto.",
    "gou_1_attributo": "Lucidità",
    "gou_1_costo": "3 Ki",
    "gou_1_successo": "Trovi il dettaglio nascosto e capisci in che direzione punta",
    "gou_1_fallimento": "Percepisci quanti elementi fuori posto ci sono (uno, più di uno, molti) — non sai cosa sono",
    "gou_2_nome": "Cuore di Ghiaccio 氷の心",
    "gou_2_desc": "Ti distacchi completamente dalla situazione. Niente ti tocca.",
    "gou_2_attributo": "Distacco",
    "gou_2_costo": "3 Ki",
    "gou_2_successo": "Il primo tiro emotivo della scena è successo automatico",
    "gou_2_fallimento": "+2 al prossimo tiro emotivo",
    "gou_3_nome": "La Brace che Resta 残り火",
    "gou_3_desc": "Le emozioni lasciano calore. Il luogo è ancora tiepido di ciò che è stato provato.",
    "gou_3_attributo": "Ascolto o Distacco (dual)",
    "gou_3_costo": "3 Ki",
    "gou_3_successo": "Senti le emozioni dominanti e quante presenze diverse c'erano — distingui paura da rabbia da determinazione",
    "gou_3_fallimento": "Un'impressione emotiva generale, senza distinzione tra le persone",
    "foto": "[FOTO]",
    "chi_sei": "Sei brillante. Lo sanno tutti, tu per primo. Vedi cose che altri non vedono, ricostruisci scene del crimine come se avessi assistito in persona. Il problema è che la tua mente non si ferma mai — cerchi stimoli, adrenalina, sfide. Hai iniziato con le scommesse sportive tre anni fa. Solo per divertimento. Poi le cifre sono cresciute. Ora scommetti su tutto: baseball, sumo, corse di cavalli. Vinci spesso — sei intelligente. Ma ultimamente hai perso più di quanto hai vinto.",
    "problema_titolo": "IL GIOCO D'AZZARDO",
    "problema_testo": "Devi soldi a Murakami, un allibratore indipendente. Non è yakuza — è quasi rispettabile. Ma i debiti sono debiti. Il suo uomo per le riscossioni è Goto Masaru: non minaccia mai, è educato, ragionevole, professionale — il che lo rende più inquietante. Sai che se qualcuno in centrale scopre che scommetti illegalmente, la tua carriera è finita.",
    "png_nome": "GOTO Masaru",
    "png_eta": "45 anni",
    "png_occupazione": "Consulente finanziario (riscossore per Murakami)",
    "png_relazione": "Riscossore — ti tiene sotto pressione",
    "png_vuole": "I soldi, preferibilmente. Ma è pragmatico — potrebbe accettare alternative.",
    "png_desc": "Parla di soluzioni, accordi, comprensione reciproca. Sorride sempre. Le minacce sono solo sottintese.",
    "conoscenza_nome": "ODA Takumi",
    "conoscenza_ruolo": "Informatore / piccolo ricettatore",
    "conoscenza_desc": "Ex testimone di un vecchio caso. Gli hai evitato il carcere, ti deve un favore. Conosce il sottobosco di Kyoto, sente voci, sa chi vende cosa a chi.",
    "conoscenza_contatto": "Bazzica al Bar Shinjuku a Gion, tutte le sere dopo le 21.",
    "conoscenza_costo": "Che tu continui a chiudere un occhio sui suoi affari minori.",
    "conoscenza_limite": "Una volta per sessione senza conseguenze. La seconda volta, il favore diventa più grande.",
    "tatemae": "Sei il tecnico sicuro di sé. Fai battute, smorzi la tensione. Sembri sempre sotto controllo. Sei quello che trova l'indizio che cambia tutto.",
    "honne": "L'adrenalina è una droga. Quando non c'è, ti senti vuoto. Le scommesse riempiono quel vuoto — e adesso il vuoto sta per inghiottirti.",
    "frase": "Aspetta. Guarda qui. Vedi questo? Nessuno l'aveva notato.",
    "pressione": "Diventi più arrogante. Prendi rischi. Scommetti — letteralmente e metaforicamente.",
    "debolezza": "Quando qualcuno lo chiama fortunato invece di riconoscere il suo talento. O quando i debiti vengono sfiorati.",
    "vizio": "Mild Seven. Fuma solo sulla scena del crimine — dice che lo aiuta a pensare.",
    "tic": "Fa roteare una moneta da 500 yen tra le dita quando ragiona.",
    "oggetto": "Una lente d'ingrandimento pieghevole nel taschino — vecchia, graffiata, non la cambierebbe mai.",
    "gusto": "Yakitori e birra Asahi al bancone. Mai al tavolo, sempre al bancone.",
    "rituale": "Non inizia mai un sopralluogo dal lato destro della scena. Dice che porta sfortuna.",
    "rapporto_1_nome": "YAMAMOTO Kenji",
    "rapporto_1_testo": "Il capo. Duro, giusto, ma ultimamente lo vedo stanco. Non glielo dirò mai.",
    "rapporto_2_nome": "NAKAMURA Shota",
    "rapporto_2_testo": "Troppo lento per i miei gusti, ma quando trova qualcosa è sempre la cosa giusta.",
    "rapporto_3_nome": "SATO Yuki",
    "rapporto_3_testo": "Il ragazzino del laboratorio. Bravo, ma deve smettere di chiedere il permesso per tutto.",
    "rapporto_4_nome": "FUJITA Emi",
    "rapporto_4_testo": "Mi legge come un libro aperto. Questo mi innervosisce.",
}


# =============================================================
# DATI PG_03 — NAKAMURA Shota
# =============================================================
PG_03 = {
    "nome_kanji": "中村 翔太",
    "nome_romanizzato": "NAKAMURA Shota",
    "eta": "38",
    "ruolo": "Specialista Interrogatori",
    "grado": "Ispettore (Keibu-ho)",
    "servizio": "14 anni",
    "distacco_base": "4", "pazienza_base": "7", "silenzio_base": "5",
    "lucidita_base": "4", "ascolto_base": "7", "presenza_base": "4",
    "gou_1_nome": "Ombra della Verità 影の真実",
    "gou_1_desc": "Senti quando qualcuno mente. Non sai come, ma lo senti.",
    "gou_1_attributo": "Ascolto",
    "gou_1_costo": "3 Ki",
    "gou_1_successo": "Certezza della bugia + l'area generale (orario, persona, luogo) — non il contenuto specifico",
    "gou_1_fallimento": "Senti disonestà, ma non distingui se è bugia, nervosismo, o qualcosa di personale",
    "gou_2_nome": "Porta Socchiusa 開きかけの扉",
    "gou_2_desc": "Le persone si aprono con te. Dicono più di quanto vorrebbero.",
    "gou_2_attributo": "Ascolto",
    "gou_2_costo": "3 Ki",
    "gou_2_successo": "Il PNG rivela qualcosa che non voleva assolutamente dire",
    "gou_2_fallimento": "Il PNG lascia trapelare qualcosa, ma si ferma prima di dire troppo",
    "gou_3_nome": "La Risalita della Carpa 鯉の滝登り",
    "gou_3_desc": "Non molli. Mai. La tua pazienza è una forza della natura.",
    "gou_3_attributo": "Pazienza o Presenza (dual)",
    "gou_3_costo": "3 Ki",
    "gou_3_successo": "Il PNG si contraddice su un punto specifico — la sua storia cede sotto il peso della ripetizione",
    "gou_3_fallimento": "Il PNG è stanco, la coerenza vacilla, ma la storia regge",
    "foto": "[FOTO]",
    "chi_sei": "Sei quello che fa parlare le persone. Non con la forza — con la pazienza. Ti siedi, aspetti, ascolti. Prima o poi tutti parlano. Figlio maggiore di una famiglia modesta di Osaka, hai lavorato duro per arrivare dove sei. Tuo padre è morto quando avevi 15 anni. Tuo fratello minore Kazuo (34 anni) è l'opposto — vive di espedienti, piccoli imbrogli, soldi prestati e mai restituiti.",
    "problema_titolo": "IL FRATELLO",
    "problema_testo": "Kazuo è un peso che ti porti dietro da sempre. Gli hai già prestato soldi tre volte. Ogni volta l'ultima. Ogni volta una bugia. Tua moglie non sa di questi prestiti: se lo scoprisse, ci sarebbero problemi anche a casa. Ma Kazuo è sangue del tuo sangue, e quando ha bisogno sa sempre dove trovare suo fratello.",
    "png_nome": "NAKAMURA Kazuo",
    "png_eta": "34 anni",
    "png_occupazione": "Nessuno fisso — imprenditore",
    "png_relazione": "Fratello minore",
    "png_vuole": "Dipende dalla situazione. Ma di solito sono soldi, e di solito sono urgenti.",
    "png_desc": "Prima la simpatia. Poi il senso di colpa. Poi la minaccia velata. Conosce i tuoi punti deboli.",
    "conoscenza_nome": "NAKAMURA Hideki",
    "conoscenza_ruolo": "Avvocato penalista (cugino)",
    "conoscenza_desc": "Cugino di primo grado, siete cresciuti insieme. Consulenza legale, accesso a fascicoli pubblici, contatti in tribunale.",
    "conoscenza_contatto": "Studio legale Nakamura & Associati, Via Kawaramachi. O al cellulare.",
    "conoscenza_costo": "Niente di specifico — famiglia è famiglia.",
    "conoscenza_limite": "Una volta per sessione senza conseguenze. Hideki non fa mai nulla di illegale, ma conosce le zone grigie.",
    "tatemae": "Sei quello calmo. Non ti agiti mai. Parli poco, ascolti molto. Quando parli, le persone tendono ad ascoltare.",
    "honne": "Sei stanco di essere quello responsabile. Di dover tenere insieme tutto. A volte vorresti mandare tutto al diavolo. Ma non lo farai mai.",
    "frase": "Prendiamoci un momento. Raccontami tutto dall'inizio.",
    "pressione": "Diventi ancora più silenzioso. Ti ritiri in te stesso. Smetti di chiedere e inizi a osservare.",
    "debolezza": "Quando qualcuno usa i legami di sangue come arma. Tocca troppo vicino a casa.",
    "vizio": "Tè verde. Ne beve litri durante gli interrogatori. Offre sempre una tazza all'interrogato.",
    "tic": "Annuisce lentamente anche quando non è d'accordo. Le persone lo trovano rassicurante.",
    "oggetto": "Un taccuino Moleskine nero, pieno di appunti in calligrafia minuscola. Non usa registratori.",
    "gusto": "Ramen miso con extra chashu. Conosce tutti i posti migliori di Kyoto a memoria.",
    "rituale": "Colleziona manga shoujo. Li tiene nascosti in un cassetto della scrivania.",
    "rapporto_1_nome": "YAMAMOTO Kenji",
    "rapporto_1_testo": "Un capo che si porta il lavoro a casa e la casa al lavoro. Lo capisco fin troppo bene.",
    "rapporto_2_nome": "HONDA Ryota",
    "rapporto_2_testo": "Geniale e imprudente. Lo tengo d'occhio, anche se lui non se ne accorge.",
    "rapporto_3_nome": "SATO Yuki",
    "rapporto_3_testo": "Ha talento vero. Deve solo imparare che non tutti i problemi si risolvono col microscopio.",
    "rapporto_4_nome": "FUJITA Emi",
    "rapporto_4_testo": "L'unica che capisce il silenzio come lo capisco io. Ci rispettiamo senza bisogno di parole.",
}


# =============================================================
# DATI PG_04 — SATO Yuki
# =============================================================
PG_04 = {
    "nome_kanji": "佐藤 勇気",
    "nome_romanizzato": "SATO Yuki",
    "eta": "27",
    "ruolo": "Tecnico Analisi Tracce",
    "grado": "Agente Scelto (Junsa-cho)",
    "servizio": "3 anni",
    "distacco_base": "4", "pazienza_base": "6", "silenzio_base": "4",
    "lucidita_base": "7", "ascolto_base": "5", "presenza_base": "5",
    "gou_1_nome": "Palazzo della Memoria 記憶の宮殿",
    "gou_1_desc": "Puoi richiamare con precisione fotografica qualcosa che hai visto o sentito.",
    "gou_1_attributo": "Lucidità o Pazienza (dual)",
    "gou_1_costo": "2 Ki",
    "gou_1_successo": "Ricordi il dettaglio e anche elementi periferici che non avevi notato consciamente",
    "gou_1_fallimento": "Ricordi il dettaglio principale, ma sfocato o incompleto",
    "gou_2_nome": "Occhio della Gru 鶴の目",
    "gou_2_desc": "Vedi ciò che altri non vedono — il dettaglio che cambia tutto.",
    "gou_2_attributo": "Lucidità",
    "gou_2_costo": "3 Ki",
    "gou_2_successo": "Trovi il dettaglio nascosto e capisci in che direzione punta",
    "gou_2_fallimento": "Percepisci quanti elementi fuori posto ci sono (uno, più di uno, molti)",
    "gou_3_nome": "L'Istante della Caduta 散り際",
    "gou_3_desc": "Il fiore di ciliegio nel momento in cui cade. Cogliere ciò che sta per svanire.",
    "gou_3_attributo": "Pazienza o Ascolto (dual)",
    "gou_3_costo": "2 Ki",
    "gou_3_successo": "Sai cosa sta per svanire e hai un istante per agire",
    "gou_3_fallimento": "Senti urgenza, sai che qualcosa sta sfuggendo, ma non cosa",
    "foto": "[FOTO]",
    "chi_sei": "Sei il più giovane della squadra. Brillante, laureato con lode in chimica forense, pieno di entusiasmo. Sei quello che lavora fino a tardi, che controlla tre volte, che non si arrende finché non trova la risposta. Il problema è tua madre: Sato Michiko non ha mai accettato che tu facessi il poliziotto. Uno spreco, dice. Tuo zio Tanaka Jiro ha un'azienda di import-export e ti aspetta.",
    "problema_titolo": "LA MADRE",
    "problema_testo": "Tua madre chiama. Spesso. A volte in centrale. È urgente, dice alla segretaria. Non è mai urgente. Vuole sapere se hai ripensato al lavoro dello zio, quando ti sposi, perché sprechi la tua vita. Non urla, non minaccia — usa il senso di colpa come un'arma di precisione. E non puoi riattaccare in faccia a tua madre — non in Giappone.",
    "png_nome": "SATO Michiko",
    "png_eta": "58 anni",
    "png_occupazione": "Casalinga, vedova da 10 anni",
    "png_relazione": "Madre",
    "png_vuole": "Che tu sistemi la tua vita. Matrimonio, lavoro stabile, nipotini.",
    "png_desc": "Mai aggressiva direttamente. Io voglio solo il tuo bene. Tuo padre sarebbe così deluso. Il senso di colpa è la sua arma principale.",
    "conoscenza_nome": "KATO Hiroshi",
    "conoscenza_ruolo": "Tecnico informatico (amico d'infanzia)",
    "conoscenza_desc": "Migliori amici dalle elementari, vi vedete ancora per giocare ai videogiochi. Recupero dati, analisi file, hacking leggero.",
    "conoscenza_contatto": "Telefono di casa. Risponde anche a tarda sera.",
    "conoscenza_costo": "Storie dal lavoro, cene, compagnia.",
    "conoscenza_limite": "Una volta per sessione senza conseguenze. Kato è l'unica persona con cui puoi essere completamente te stesso.",
    "tatemae": "Sei il giovane promettente. Entusiasta, competente, sempre pronto ad aiutare. Vuoi dimostrare di meritare il tuo posto.",
    "honne": "Sei esausto dal peso delle aspettative. Di tua madre, del lavoro, di te stesso. A volte ti chiedi se non avresti fatto meglio ad ascoltarla.",
    "frase": "Datemi ancora un'ora, ho quasi finito l'analisi.",
    "pressione": "Parli troppo. Riempi i silenzi. Ti giustifichi anche quando non devi. Cerchi approvazione.",
    "debolezza": "Quando qualcuno lo tratta da ragazzino o mette in dubbio la sua esperienza.",
    "vizio": "Gomme da masticare alla menta. Ne consuma un pacchetto al giorno in laboratorio.",
    "tic": "Si sistema gli occhiali spingendoli sul naso con l'indice, anche quando non scivolano.",
    "oggetto": "Un portachiavi a forma di struttura molecolare, regalo di laurea dei compagni.",
    "gusto": "Curry rice della mensa della centrale. Lo mangia quasi ogni giorno, senza vergogna.",
    "rituale": "Conta i passi quando è nervoso. Non se ne accorge, ma i colleghi sì.",
    "rapporto_1_nome": "YAMAMOTO Kenji",
    "rapporto_1_testo": "L'ispettore. Lo ammiro, ma a volte ho paura di deluderlo.",
    "rapporto_2_nome": "HONDA Ryota",
    "rapporto_2_testo": "Il più figo della squadra. Vorrei avere la sua sicurezza. O almeno fingerla così bene.",
    "rapporto_3_nome": "NAKAMURA Shota",
    "rapporto_3_testo": "Calmo come un lago. Quando parla con me, mi sento meno ansioso.",
    "rapporto_4_nome": "FUJITA Emi",
    "rapporto_4_testo": "A volte mi guarda come se sapesse esattamente cosa sto pensando. Probabilmente lo sa.",
}


# =============================================================
# DATI PG_05 — FUJITA Emi
# =============================================================
PG_05 = {
    "nome_kanji": "藤田 恵美",
    "nome_romanizzato": "FUJITA Emi",
    "eta": "36",
    "ruolo": "Profiler / Psicologa Investigativa",
    "grado": "Ispettore (Keibu-ho)",
    "servizio": "8 anni",
    "distacco_base": "4", "pazienza_base": "4", "silenzio_base": "7",
    "lucidita_base": "6", "ascolto_base": "6", "presenza_base": "4",
    "gou_1_nome": "Specchio dell'Anima 魂の鏡",
    "gou_1_desc": "Vedi oltre la maschera. Senti le emozioni vere di una persona.",
    "gou_1_attributo": "Silenzio",
    "gou_1_costo": "2 Ki",
    "gou_1_successo": "Senti l'emozione dominante e capisci perché la prova",
    "gou_1_fallimento": "Senti l'emozione, ma non la sua origine",
    "gou_2_nome": "L'Eco della Montagna 山彦",
    "gou_2_desc": "Le parole non scompaiono. Nel tuo silenzio, le senti.",
    "gou_2_attributo": "Silenzio (requisito: ≥ 7)",
    "gou_2_costo": "4 Ki",
    "gou_2_successo": "Frammenti di frasi riconoscibili — parole chiave, toni, numero di voci presenti",
    "gou_2_fallimento": "Suoni indistinti — un tono emotivo generale senza parole",
    "gou_3_nome": "Tocco del Medico 医者の手",
    "gou_3_desc": "Leggi il corpo e la mente. Vedi i segni che altri ignorano.",
    "gou_3_attributo": "Lucidità",
    "gou_3_costo": "2 Ki",
    "gou_3_successo": "Dettagli precisi — tipo di trauma, natura della paura, segni di stress cronico",
    "gou_3_fallimento": "Capisci che qualcosa non va, ma non riesci a definirlo con precisione",
    "foto": "[FOTO]",
    "chi_sei": "Sei arrivata in polizia dopo una laurea in psicologia e anni di pratica clinica. Capisci le persone, vedi i pattern, sai perché la gente fa quello che fa. Sei anche una donna single in un ambiente dominato dagli uomini — hai dovuto lavorare il doppio per guadagnarti il rispetto. Cinque anni fa hai chiesto un prestito a Iwamoto, un conoscente di famiglia, per le cure di tuo padre. Tuo padre è morto comunque. Il debito è quasi saldato. Ma Iwamoto non sembra volerlo chiudere.",
    "problema_titolo": "IL CREDITORE",
    "problema_testo": "Iwamoto Koji continua a presentarsi. Non c'è fretta. Siamo amici. Quando sarà il momento, ne parleremo. Non chiede mai nulla di specifico — questo è il punto. L'ambiguità è l'arma. Vuole tenerti in debito non per i soldi, ma per il potere di poter chiedere qualcosa un giorno. E se qualcuno in centrale lo vede parlare con te, ci saranno domande.",
    "png_nome": "IWAMOTO Koji",
    "png_eta": "55 anni",
    "png_occupazione": "Uomo d'affari — prestiti privati, investimenti grigi",
    "png_relazione": "Creditore",
    "png_vuole": "Controllo. Il potere di poter chiedere un favore quando vuole.",
    "png_desc": "Gentilissimo. Premuroso. Mai una parola su cosa potrebbe chiedere. L'ambiguità è l'arma.",
    "conoscenza_nome": "MORITA Akiko",
    "conoscenza_ruolo": "Medico legale (ex collega)",
    "conoscenza_desc": "Amiche dai tempi dell'università, vi rispettate professionalmente. Autopsie, consulenze mediche, accesso ai dati sanitari (con cautela).",
    "conoscenza_contatto": "Ospedale Universitario, reparto Medicina Legale. O al cellulare personale.",
    "conoscenza_costo": "Caffè e chiacchierate, ogni tanto una consulenza psicologica informale.",
    "conoscenza_limite": "Una volta per sessione senza conseguenze. Siete le uniche due donne in posizioni di responsabilità che conoscete nel vostro campo.",
    "tatemae": "Sei professionale, competente, riservata. Non parli della tua vita privata. Fai il tuo lavoro e lo fai bene.",
    "honne": "Sei stufa di dover dimostrare il doppio. Sei stufa di Iwamoto. Sei stufa di essere sempre all'erta. Ma non lo mostrerai mai.",
    "frase": "Non guardare cosa ha fatto. Guarda perché l'ha fatto.",
    "pressione": "Ti chiudi ancora di più. Diventi fredda, quasi clinica. Analizzi tutto, anche le tue emozioni — come se fossero di qualcun altro.",
    "debolezza": "Quando un uomo la sminuisce o le dice che esagera. Anni di lotta per il rispetto condensati in un istante.",
    "vizio": "Whisky Nikka. Un dito, da sola, la sera dopo i casi pesanti. Non in compagnia.",
    "tic": "Inclina leggermente la testa a sinistra quando ascolta qualcuno mentire.",
    "oggetto": "Una penna stilografica Pilot nera. Scrive i profili sempre a mano, mai al computer.",
    "gusto": "Wagashi e tè matcha. Ha un debole per la pasticceria tradizionale vicino a Kiyomizu.",
    "rituale": "Il tempio di Nanzen-ji, la sera. Si siede nel giardino di pietra e non pensa a nulla.",
    "rapporto_1_nome": "YAMAMOTO Kenji",
    "rapporto_1_testo": "Un buon capo, ma si sta consumando. Non è il mio ruolo dirglielo, ma qualcuno dovrebbe.",
    "rapporto_2_nome": "HONDA Ryota",
    "rapporto_2_testo": "Nasconde qualcosa. Non so cosa, ma il linguaggio del corpo non mente.",
    "rapporto_3_nome": "NAKAMURA Shota",
    "rapporto_3_testo": "L'unico che non mi ha mai chiesto perché non sono sposata. Per questo lo rispetto.",
    "rapporto_4_nome": "SATO Yuki",
    "rapporto_4_testo": "Giovane, entusiasta, fragile. Mi ricorda una versione di me che non esiste più.",
}


PG_LIST = [
    ("PG_02", "Honda_Ryota", PG_02),
    ("PG_03", "Nakamura_Shota", PG_03),
    ("PG_04", "Sato_Yuki", PG_04),
    ("PG_05", "Fujita_Emi", PG_05),
]


for pg_code, pg_name, data in PG_LIST:
    script = template_script

    for key, val in data.items():
        script = script.replace("{{" + key + "}}", val)

    output_filename = f"ANTEPRIMA_{pg_name}.docx"
    script = script.replace("TEMPLATE_Scheda_PG.docx", output_filename)

    image_path = os.path.join(base_dir, "Immagini", f"{pg_code}_{pg_name}_foto.png")
    script = script.replace(
        "IMAGE_PATH = sys.argv[1] if len(sys.argv) > 1 else None",
        f'IMAGE_PATH = r"{image_path}"'
    )

    temp_path = os.path.join(base_dir, f"_temp_{pg_code}.py")
    with open(temp_path, 'w', encoding='utf-8') as f:
        f.write(script)

    print(f"Generating {output_filename}...")
    result = subprocess.run([sys.executable, temp_path], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"ERROR: {result.stderr}")
    else:
        print(result.stdout.strip())

    os.remove(temp_path)

print("\nFatto.")
