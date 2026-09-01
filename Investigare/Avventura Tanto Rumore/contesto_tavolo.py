# -*- coding: utf-8 -*-
"""Contesto da tavolo per Bakuon — FONTE UNICA letta da esporta_da_wizard.py e genera_dossier.py.
Ruoli in chiaro del cast + descrizioni delle location (arrivo/entrata). Qui si edita, poi si rigenera."""

# id del cast nel wizard -> chi e', in chiaro
RUOLI = {
    "pf6yqhg": "LA VITTIMA",
    "pogta8z": "L'ASSASSINO — capo della banda",
    "pbdagjy": "LA MADRE della vittima",
    "p5j75fj": "LA SORELLA della vittima",
    "p91t5a1": "IL MIGLIORE AMICO — compagno di classe",
    "pb309pd": "LA RAGAZZA — contesa: ex di Matsui, innamorata di Yuta",
    "pw1mcdx": "LA CAMERIERA dello SnakUp — testimone chiave (mente)",
    "pobfvlu": "IL TITOLARE dello SnakUp — testimone (ha paura)",
    "ppf2iju": "IL BRACCIO DESTRO di Matsui — ha pedinato i due",
    "pcbx32r": "GREGARIO della banda — quello che ha fatto la spia",
    "py96wv4": "GREGARIO della banda — il più giovane, l'anello debole",
    "phsyuna": "IL CAPO DEL KŌBAN di Kamigyō — rivale della banda",
}

# nome location nel wizard -> {arrivo, entrata}: due paragrafi brevi da leggere per dare contesto
LOCATION = {
    "SnakUp": {
        "arrivo": "Un vicolo stretto di Shimogyō, insegne a tubo fluorescente una sopra l'altra: lo SnakUp è una porta e una vetrina smerigliata, l'insegna spenta. Davanti, il nastro giallo della polizia e un agente in uniforme che sbadiglia; dalle saracinesche mezze alzate dei vicini, occhi che guardano e bocche che non sanno niente.",
        "entrata": "Dentro è piu' piccolo di quanto sembri: sei sgabelli, un bancone corto, il karaoke muto in un angolo. Sugli scaffali le bottiglie tenute coi nomi dei clienti scritti a pennarello. Odore di fumo freddo e detersivo; a terra, vicino al bancone, il segno di dove è caduto Shimada Yuta. Sotto la cassa, il quaderno dei conti a credito della clientela fissa."
    },
    "Abitazione della vittima": {
        "arrivo": "Un mansion anni Ottanta a Nakagyō: citofono con le targhette, biciclette allineate, una portineria con il registro. Ai piani, corridoi tutti uguali e porte blindate tutte uguali: la vita che non si vede da fuori.",
        "entrata": "L'appartamento è piccolo e in ordine feroce, di quell'ordine che si fa quando non si sa cos'altro fare. Pantofole pronte per gli ospiti, incenso acceso, il tè versato che nessuno beve. La camera di Yuta è rimasta com'era: libri di medicina impilati, la scrivania pulita, il futon piegato. La madre siede con le mani in grembo; la sorella sta in piedi."
    },
    "Casa di Watanabe Noriko": {
        "arrivo": "Takatsuji-dōri 3-12: la merceria di famiglia al piano strada, cesti di bottoni e rotoli di stoffa fin sul marciapiede. I genitori dietro il banco — al telefono di casa rispondono loro, sempre. Una scala laterale stretta sale all'appartamento.",
        "entrata": "La casa sopra la bottega odora di stoffa nuova e riso. Stanze strette, pareti sottili: qui sotto sentono tutto, e Noriko lo sa — parla a voce bassa, la porta accostata. Nella sua stanza, appeso alla borsa, il pocket bell: ogni tanto lo guarda come si guarda una cosa che morde."
    },
    "Distretto PG": {
        "arrivo": "Il distretto di Shimogyō: cemento grigio, bandiera, il piantone al bancone dell'androne e le bacheche con gli avvisi sbiaditi dal sole. Domenica mattina: metà scrivanie vuote, il ronzio dei ventilatori.",
        "entrata": "La sala della squadra: scrivanie accoppiate, telefoni a disco, faldoni legati con lo spago, la lavagna dei turni con i nomi in gesso. Posacenere pieni da ieri. In fondo, dietro un vetro smerigliato, l'ufficio del capo ispettore: quando la porta è aperta, è meglio entrare subito."
    },
    "Sede Banda": {
        "arrivo": "I capannoni di Murasakino, Kita-ku: lamiera, ruggine e erba nelle crepe del cemento. Un cortile di carico con il cancello scorrevole, una guardiola all'ingresso col vetro rotto. Sotto una tettoia, due Honda CBX400F gemelle, bianche e rosse — e se i motori sono accesi, il canto della yonfore si riconosce a tre isolati.",
        "entrata": "Dentro, la vecchia fabbrica smontata: le linee ferme, gli spogliatoi con gli armadietti sfondati, attrezzi e catene appesi, odore di benzina e grasso. L'ufficio del capoturno è diventato l'angolo di Matsui: una poltrona sfondata, poster di moto, casse di birra vuote. Materassi per terra: qualcuno qui ci dorme."
    },
}

# id -> etichetta BREVE per il NOME FILE della scheda (PNG/<Nome> — <chi è>.md)
RUOLI_FILE = {
    "pf6yqhg": "La vittima",
    "pogta8z": "L'assassino",
    "pbdagjy": "La madre",
    "p5j75fj": "La sorella",
    "p91t5a1": "Il migliore amico",
    "pb309pd": "La ragazza contesa",
    "pw1mcdx": "La cameriera testimone",
    "pobfvlu": "Il titolare",
    "ppf2iju": "Il braccio destro",
    "pcbx32r": "La spia della banda",
    "py96wv4": "Il gregario giovane",
    "phsyuna": "Il capo del koban",
}

def file_scheda(nome_completo, pid):
    """nome file della scheda PNG: <Nome Cognome> — <chi è>.md"""
    ruolo = (RUOLI_FILE.get(pid) or '').strip()
    return nome_completo + ((' — ' + ruolo) if ruolo else '') + '.md'

