"""Prepara una revisione verificabile; --applica scrive solo i due target autorizzati.

Il database e wizard.js sono fuori dal workspace: applicare con l'approvazione sandbox.
Il confronto SHA256 impedisce di sovrascrivere modifiche avvenute dopo la preparazione.
"""
import copy
import datetime
import difflib
import hashlib
import json
from pathlib import Path
import re
import sqlite3
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from gestione_handout import avviso_html

WIZ = ROOT.parent / 'Wizard/codice/GenkaiWizard'
DB = WIZ / 'app.db'
JS = WIZ / 'wwwroot/js/wizard.js'
ID = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'
OUT = ROOT / 'storico/revisione_2026-09-16'


def sha(v):
    return hashlib.sha256(v).hexdigest()


def sostituisci(testo, prima, dopo):
    assert testo.count(prima) == 1, repr(prima)
    return testo.replace(prima, dopo, 1)


def prepara():
    OUT.mkdir(exist_ok=False)
    with sqlite3.connect(DB.as_uri() + '?mode=ro', uri=True) as c:
        raw = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
    (OUT / 'StatoJson_prima.txt').write_text(raw, encoding='utf-8')
    s = json.loads(raw)
    before = copy.deepcopy(s)
    handout = s['passo10']['handout']
    aut, g26, g27, g28, tab = handout

    # Conserva tutte e sole le comunicazioni complete; non inventa la coda perduta.
    body = tab['contenuto']
    body = sostituisci(body,
        '      <tr><td>22/05 01:47</td><td>075-441-0087</td><td></td><td></td><td></td></tr>\n', '')
    body = sostituisci(body, '36 (traffico completo del periodo)', '31 (traffico completo del periodo)')
    body = sostituisci(body, '<dt>Data evasione</dt>\n    <dd>28 maggio 1997</dd>',
        '<dt>Richiesta autorizzata</dt>\n    <dd>____ / ____ / 1997, ore ____:____</dd>\n'
        '    <dt>Data evasione</dt>\n    <dd>____ / ____ / 1997, ore ____:____</dd>')
    body = sostituisci(body, '24/05/1997 24:00', '24/05/1997 23:59:59')
    tab['contenuto'] = body
    tab['avvisoGM'] = ('Consegnare 24 ore dopo la richiesta autorizzata e inoltrata a NTT, '
        'mai prima di aver acquisito l’utenza di Noriko. Compilare sul foglio entrambe le date e le ore: '
        'richiesta 25/05/1997 ore 12:00 → evasione 26/05 ore 12:00; '
        'richiesta 26/05 ore 12:00 → evasione 27/05 ore 12:00; '
        'richiesta 27/05 ore 12:00 → evasione 28/05 ore 12:00. '
        'Per richieste successive vale sempre +24 ore. Sono tempi di gioco per questo caso. '
        'Il periodo analizzato resta 01/02–24/05/1997, indipendentemente dalla data di evasione: '
        'non documenta le minacce dopo il delitto. Approfondimento facoltativo: non ritardare la chiusura '
        'del caso per aspettarlo. Le traduzioni sono già incluse; i numeri delle cabine non identificano da soli il mittente.')

    body = aut['contenuto']
    body = sostituisci(body, 'KYO-1997-0525-001', 'KYO-1997-0526-001')
    body = sostituisci(body, '<dd>26 maggio 1997</dd>',
        '<dd>Lunedì 26 maggio 1997, ore 09:00</dd>\n'
        '    <dt>Referto emesso</dt>\n    <dd>Lunedì 26 maggio 1997, ore 15:00</dd>')
    body = sostituisci(body,
        'Livor mortis iniziale sul dorso e arti inferiori, coerente con posizione supina post-mortem. Temperatura corporea e rigidità cadaverica compatibili con morte entro 12-18 ore dal rinvenimento.',
        'Il corpo è stato rinvenuto nella serata di sabato 24 maggio 1997. L’orario del decesso, '
        'intorno alle 21:15 dello stesso giorno, è ricostruito dalla documentazione del sopralluogo '
        'e dei soccorsi e dalle testimonianze. L’esame autoptico è stato eseguito lunedì 26 maggio 1997; '
        'la data dell’esame non coincide con quella della morte.')
    body = sostituisci(body, 'Sangue: negativo per alcol e sostanze stupefacenti. Tossicologia completa in corso.',
        'Esami preliminari sul sangue: negativi per alcol e per le sostanze stupefacenti ricercate. '
        'Tossicologia completa ancora in corso alla data di emissione del presente referto; '
        'gli esiti definitivi non sono inclusi in questo documento.')
    aut['contenuto'] = body
    aut['avvisoGM'] = ('Disponibile da lunedì 26/05/1997, ore 15:00, tramite la Scientifica. '
        'L’autopsia è avviata d’ufficio sul caso, senza attendere una richiesta dei PG: esame alle 09:00, '
        'referto alle 15:00. Domenica 25 il capo può riferire soltanto la prima ricostruzione dei soccorsi '
        'e dei testimoni; non consegnare questo referto in anticipo. Il decesso resta sabato 24/05 alle 21:15 circa. '
        'Gli esami tossicologici definitivi sono ancora in corso e non servono a bloccare la soluzione.')

    g26['contenuto'] = g26['contenuto'].replace('Vittoria per 4-2 nel turno di ieri.',
        'Vittoria per 4-2 nel turno di domenica 25 maggio.')
    g26['avvisoGM'] = ('Prima uscita sulla vicenda: lunedì 26/05/1997, mattina. '
        'Non consegnare al briefing di domenica 25. Noriko apprende la notizia da questa edizione il 26 mattina, '
        'salvo che i PG gliel’abbiano già comunicata il giorno prima. '
        'Se il caso è già chiuso e le notizie dell’articolo sono superate, omettere la consegna.')
    g27['contenuto'] = g27['contenuto'].replace('ieri mattina', 'lunedì 26 maggio, in mattinata')
    g27['avvisoGM'] = ('FACOLTATIVO — martedì 27/05/1997, mattina, mai prima. '
        'Consegnare solo se il caso è ancora aperto e l’articolo è compatibile con gli eventi giocati. '
        'Riprende testimonianze e reazioni della famiglia: si può omettere senza perdere indizi essenziali. '
        'Se i PG hanno già risolto il caso, non prolungare l’indagine per far uscire questo giornale. '
        'Le fotografie e i fiori descritti sono del 26 maggio; il delitto è del 24.')
    g28['contenuto'] = g28['contenuto'].replace('qualcuno, ieri, ne ha portati di nuovi.',
        'qualcuno, martedì 27 maggio, ne ha portati di nuovi.')
    g28['avvisoGM'] = ('FACOLTATIVO — mercoledì 28/05/1997, mattina, mai prima. '
        'Consegnare solo se l’indagine è ancora aperta, non ci sono stati fermi e le informazioni pubbliche '
        'sono ancora quelle riportate. Se i PG hanno già preso Matsui o smentito pubblicamente la pista, '
        'omettere questo giornale. «A quattro giorni» si riferisce al delitto di sabato 24 maggio. '
        'La pista del regolamento di conti è una voce di stampa, non una prova.')
    for h in handout:
        assert 'ho-avviso-gm' not in h['contenuto']
        pos = h['contenuto'].rfind('</div>')
        assert pos >= 0
        h['contenuto'] = h['contenuto'][:pos] + avviso_html(h['avvisoGM']) + '\n' + h['contenuto'][pos:]

    # Noriko può essere raggiunta il 25: il verbale stampato non deve predeterminare la scena.
    for sh in s['passo8']['schede']:
        if sh['personaId'] == 'pb309pd':
            sh['deposizione'] = sostituisci(sh['deposizione'],
                'L’ho saputo il giorno dopo, dal giornale' if 'L’ho saputo il giorno dopo, dal giornale' in sh['deposizione'] else "L'ho saputo il giorno dopo, dal giornale",
                "L'ho saputo lunedì ventisei maggio, dal giornale")
            sh['trigger'][0]['se'] = ('Se nessuno l’ha avvertita prima, scopre la morte dal giornale '
                'lunedì 26/05/1997 mattina; da quel giorno non va a scuola per una settimana e si trova a casa. '
                'Se i PG la raggiungono domenica 25 e glielo comunicano, apprende la notizia da loro in quella scena.')
        if sh.get('depHandout') and sh.get('deposizione'):
            sh['depAvvisoGM'] = ('Dal 25/05/1997, dopo il colloquio con questa persona; '
                'compilare data, ora e luogo effettivi del verbale. Non distribuire tutte le deposizioni al briefing.')
            if sh['personaId'] in ('pw1mcdx', 'pobfvlu'):
                sh['depAvvisoGM'] += (' Questo è il primo racconto reticente. '
                    'Le informazioni ottenute rassicurando il testimone vanno annotate come integrazione successiva.')
            if sh['personaId'] == 'pb309pd':
                sh['depAvvisoGM'] = ('Versione stampata utilizzabile dal 26/05/1997 mattina, '
                    'dopo che Noriko ha letto il giornale e dopo il colloquio. '
                    'Se i PG le comunicano la morte il 25, non consegnare questo testo: '
                    'giocare il colloquio e verbalizzare quanto dice realmente, con quella data e quella fonte della notizia. '
                    'Il primo racconto è reticente; annotare separatamente la successiva collaborazione. '
                    'Compilare data, ora e luogo effettivi, senza attendere il 26 per permettere ai PG di parlarle.')

    moto, covo, pocket = s['passo9']['tracce']
    moto['fonti'][0]['versione'] = moto['fonti'][0]['versione'].replace('15 maggio u.s.', '15 maggio 1997')
    moto['fonti'][0]['avvisoGM'] = ('Dal 25/05/1997, dopo la richiesta che descrive le due moto: '
        'riscontro telefonico entro un’ora, copia scritta e fascicolo fotografico entro due ore dalla richiesta. '
        'Sono documenti e conoscenze già disponibili al kōban: non applicare i tempi di nuove analisi o '
        'di trasferimento di un fascicolo originale. Annotare data e ora effettive di consegna. '
        'Il fascicolo allegato è aggiornato al 15/05/1997; la fotografia al suo interno è precedente. '
        'Non rivela dove si trova il covo.')
    covo['fonti'][0]['versione'] = sostituisci(covo['fonti'][0]['versione'],
        'Si allega planimetria di massima. Si raccomanda prudenza:',
        'Il posto è noto a questo ufficio, che fornisce al distretto le indicazioni per raggiungerlo. '
        'Si raccomanda prudenza:')
    covo['fonti'][0]['avvisoGM'] = ('Dal 25/05/1997, dopo una richiesta specifica sul ritrovo del gruppo '
        '(anche insieme alla richiesta sulle moto, se i PG la formulano): indicazioni entro un’ora, '
        'copia scritta entro due ore. La risposta permette di raggiungere il capannone, senza un altro '
        'ostacolo sull’indirizzo. MAPPA E TRE IMMAGINI DEL COVO: materiale di scena del master, '
        'da mostrare solo nel finale al capannone, per ambientazione e combattimento; '
        'non sono allegati da consegnare con questa risposta.')
    for a in covo['allegati']:
        a['uso'] = 'scena'
    pocket['testo'] += ('\n\nGM — Le due immagini del cercapersone sono esempi visivi: '
        'mostrarle dal Surface soltanto se serve spiegare l’oggetto. Il numero o codice sul display '
        'illustrativo non costituisce una nuova traccia e non è una fotografia di un messaggio repertato.')

    s['passo7']['eventi'][-1]['testo'] = ('Alle 21:14 circa arriva la banda; il colpo mortale viene '
        'sferrato intorno alle 21:15. ' + s['passo7']['eventi'][-1]['testo'])
    old_news = before['passo11']['giorni'][0]['evento']
    s['passo11']['giorni'] = [
        {'giorno': 1, 'momento': 'Domenica 25/05/1997 — mattina', 'condizione': '',
         'evento': 'Briefing d’apertura e inizio dell’indagine. Il delitto è di sabato 24/05/1997: '
            'arrivo della banda alle 21:14 circa, colpo mortale alle 21:15 circa. Nessun giornale sul caso '
            'è ancora disponibile; il referto autoptico arriva il 26 alle 15:00. I PG possono già visitare '
            'testimoni e luoghi. I verbali si consegnano dopo ciascun colloquio e si datano allora. '
            'Noriko non è bloccata fino al giornale: se i PG la avvertono il 25, verbalizzare la scena '
            'effettiva senza usare il suo verbale prestampato che cita il giornale del 26.'},
        {'giorno': 1, 'momento': 'Dal 25/05/1997 — su richiesta, in qualsiasi giorno successivo', 'condizione': 'Richiesta pertinente dei PG al kōban.',
         'evento': 'Moto e ritrovo sono informazioni già note al kōban: risposta telefonica entro un’ora, '
            'documento scritto entro due ore dalla richiesta. La richiesta sulle moto dà il fascicolo '
            'CBX400F e quello fotografico di Matsui. Una richiesta specifica sul ritrovo dà le indicazioni '
            'per raggiungere il covo. Se i PG chiedono entrambe le cose insieme, rispondere a entrambe. '
            'Questi tempi sostituiscono, per i due riscontri locali, i tempi generici di trasferimento '
            'interdistrettuale del dossier. Mappa e immagini interne restano al master fino al finale.'},
        {'giorno': 2, 'momento': 'Lunedì 26/05/1997 — mattina', 'condizione': 'Notizie ancora compatibili con gli eventi giocati.',
         'evento': old_news + ' Prima uscita sulla vicenda. Se non è stata già informata dai PG, '
            'Noriko apprende la morte da questo giornale; dal 26 si trova a casa e non va a scuola per una settimana. '
            'Il suo verbale prestampato si consegna solo dopo il colloquio e solo se ha appreso la notizia così.'},
        {'giorno': 2, 'momento': 'Lunedì 26/05/1997 — ore 15:00', 'condizione': '',
         'evento': 'La Scientifica rende disponibile il referto autoptico. Esame eseguito d’ufficio '
            'alle 09:00 del 26, emissione alle 15:00; decesso il 24 alle 21:15 circa. '
            'Gli esami tossicologici sono preliminari; quelli completi sono ancora in corso. '
            'Il referto può essere ritirato anche più tardi, mantenendo la vera data di emissione.'},
        {'giorno': 2, 'momento': 'Dal lunedì 26/05/1997 — tabulato a richiesta +24 ore',
         'condizione': 'Utenza di Noriko acquisita e richiesta autorizzata inoltrata a NTT almeno 24 ore prima.',
         'evento': tab['avvisoGM'] + ' Il 26 è la prima data possibile, non una consegna automatica: '
            'richiesta autorizzata domenica 25 → lunedì 26 alla stessa ora; lunedì 26 → martedì 27; '
            'martedì 27 → mercoledì 28. Il tempo decorre dall’inoltro autorizzato, non dal primo sospetto. '
            'Se la richiesta è successiva, spostare entrambe le date compilate sul modulo. '
            'Nessun tiro cancella l’indizio; eventuali ritardi si registrano anche nell’ora effettiva di evasione.'},
        {'giorno': 3, 'momento': 'Martedì 27/05/1997 — mattina',
         'condizione': 'Facoltativo; caso ancora aperto e articolo compatibile con i fatti pubblici.',
         'evento': 'Giornale Rakuyō Shinbun del 27/05/1997, n. 3.812. Riprende le testimonianze '
            'e la famiglia. Omettere se ridondante o se il caso si è già chiuso. Non attendere questa data '
            'per permettere ai PG di risolvere il caso.'},
        {'giorno': 4, 'momento': 'Mercoledì 28/05/1997 — mattina',
         'condizione': 'Facoltativo; caso ancora aperto, nessun fermo, voce di stampa ancora plausibile.',
         'evento': 'Giornale Rakuyō Shinbun del 28/05/1997, n. 3.813: ipotesi del regolamento di conti. '
            'Non consegnare se i PG hanno già preso Matsui o reso pubblica una ricostruzione incompatibile. '
            'Nessun evento preparato deve annullare i risultati dei giocatori.'},
        {'giorno': 1, 'momento': 'Dal 25/05/1997 — quando si arriva al finale, anche nei giorni successivi',
         'condizione': 'I PG raggiungono il covo; non è una scena fissata al quarto giorno.',
         'evento': 'Mostrare planimetria e tre immagini del capannone solo al finale, per immersione '
            'e combattimento. Non anticiparle con la risposta del kōban. Le immagini del cercapersone '
            'restano esempi visivi da mostrare su richiesta: il display illustrativo non è un indizio. '
            'Il caso può chiudersi prima dell’autopsia, del tabulato o dei giornali facoltativi, '
            'se le testimonianze e l’indagine hanno già portato a Matsui.'}
    ]

    # Campi GM facoltativi: supporto nel renderer dei soli handout raccolti.
    js_bytes = JS.read_bytes()
    js = js_bytes.decode('utf-8')
    nl = '\r\n' if '\r\n' in js else '\n'
    js = js.replace('\r\n', '\n')
    helper = '''    function avvisoMasterHandout(testo) {
        if (!testo) return "";
        const safe = String(testo).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\n/g, "<br>");
        return `<aside class="ho-avviso-gm" style="color:#a01818;border:2px solid #a01818;padding:10px;margin-top:18px;font:12px/1.5 Arial,sans-serif;break-inside:avoid;column-span:all;clear:both"><strong>AVVISO PER IL MASTER — CONSEGNA</strong><br>${safe}</aside>`;
    }

'''
    js = sostituisci(js, '    function foglioInformazione(titolo, testo, allegati) {',
        helper + '    function foglioInformazione(titolo, testo, allegati, avvisoGM = "") {')
    js = sostituisci(js, 'const imgs = (allegati || []).filter(a => a.url).map(',
        'const imgs = (allegati || []).filter(a => a.url && a.uso !== "scena").map(')
    js = sostituisci(js, '${corpo}${imgs}', '${corpo}${imgs}${avvisoMasterHandout(avvisoGM)}')
    js = sostituisci(js, 'function verbaleDeposizione(titolo, nome, testo) {',
        'function verbaleDeposizione(titolo, nome, testo, avvisoGM = "") {')
    js = sostituisci(js, '<span class="riga">firma del dichiarante</span></div>\n        </div>`;',
        '<span class="riga">firma del dichiarante</span></div>\n            ${avvisoMasterHandout(avvisoGM)}\n        </div>`;')
    js = sostituisci(js, 'allegati: t.allegati || [], icona: "📄"',
        'allegati: t.allegati || [], avvisoGM: f.avvisoGM || "", icona: "📄"')
    js = sostituisci(js, 'allegati: [], icona: "📝"',
        'allegati: [], avvisoGM: s.depAvvisoGM || "", icona: "📝"')
    js = sostituisci(js, 'verbaleDeposizione(r.titolo, r.verbaleDi, r.testo)',
        'verbaleDeposizione(r.titolo, r.verbaleDi, r.testo, r.avvisoGM)')
    js = sostituisci(js, 'foglioInformazione(r.titolo, r.testo, r.allegati)',
        'foglioInformazione(r.titolo, r.testo, r.allegati, r.avvisoGM)')
    (OUT / 'wizard.js.prima').write_bytes(js_bytes)
    (OUT / 'wizard.js.dopo').write_bytes(js.replace('\n', nl).encode('utf-8'))
    after_raw = json.dumps(s, ensure_ascii=False, indent=2)
    (OUT / 'StatoJson_dopo.json').write_text(after_raw, encoding='utf-8')
    diff = difflib.unified_diff(json.dumps(before, ensure_ascii=False, indent=2).splitlines(),
        after_raw.splitlines(), fromfile='StatoJson prima', tofile='StatoJson dopo', lineterm='')
    (OUT / 'StatoJson.diff').write_text('\n'.join(diff), encoding='utf-8')
    (OUT / 'wizard.js.diff').write_text('\n'.join(difflib.unified_diff(
        js_bytes.decode('utf-8').splitlines(), js.splitlines(), fromfile='wizard.js prima', tofile='wizard.js dopo', lineterm='')), encoding='utf-8')
    manifest = {'db': str(DB), 'js': str(JS), 'id': ID, 'stato_prima_sha256': sha(raw.encode('utf-8')),
        'stato_dopo_sha256': sha(after_raw.encode('utf-8')), 'js_prima_sha256': sha(js_bytes),
        'js_dopo_sha256': sha((OUT / 'wizard.js.dopo').read_bytes())}
    (OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    print('Revisione preparata in', OUT)


def applica():
    m = json.loads((OUT / 'manifest.json').read_text(encoding='utf-8'))
    assert m['db'] == str(DB) and m['js'] == str(JS) and m['id'] == ID
    raw = (OUT / 'StatoJson_dopo.json').read_text(encoding='utf-8')
    js = (OUT / 'wizard.js.dopo').read_bytes()
    assert sha(raw.encode('utf-8')) == m['stato_dopo_sha256']
    assert sha(js) == m['js_dopo_sha256']
    assert sha(JS.read_bytes()) == m['js_prima_sha256'], 'wizard.js modificato dopo la preparazione'
    backup = OUT / 'app.db.prima'
    assert not backup.exists(), 'Backup già esistente; non applicare due volte'
    with sqlite3.connect(DB.as_uri() + '?mode=ro', uri=True) as src:
        with sqlite3.connect(backup) as dest:
            src.backup(dest)
    with sqlite3.connect(DB, timeout=15) as c:
        c.execute('BEGIN IMMEDIATE')
        current = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
        assert sha(current.encode('utf-8')) == m['stato_prima_sha256'], 'Caso modificato dopo la preparazione'
        assert sha(JS.read_bytes()) == m['js_prima_sha256']
        try:
            JS.write_bytes(js)
            cur = c.execute('update Progetti set StatoJson=? where Id=? and StatoJson=?', (raw, ID, current))
            assert cur.rowcount == 1
            c.commit()
        except BaseException:
            JS.write_bytes((OUT / 'wizard.js.prima').read_bytes())
            c.rollback()
            raise
    print('Applicati StatoJson del solo caso Bakuon e supporto avvisi GM in wizard.js. Backup:', backup)


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    applica() if '--applica' in sys.argv else prepara()
