"""Correzioni autorizzate: moto, Noriko, tonfa e falsa pista Yakuza."""
import difflib
import json
from pathlib import Path
import re
import sqlite3
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from gestione_handout import avviso_html

DB = ROOT.parent / 'Wizard/codice/GenkaiWizard/app.db'
ID = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'
OUT = ROOT / 'storico/coerenza_finale_2026-09-17'

def replace_once(text, before, after):
    assert text.count(before) == 1, before
    return text.replace(before, after, 1)

if '--applica' in sys.argv:
    before = (OUT / 'StatoJson_prima.txt').read_text(encoding='utf-8')
    after = (OUT / 'StatoJson_dopo.json').read_text(encoding='utf-8')
    with sqlite3.connect(DB, timeout=15) as c:
        c.execute('BEGIN IMMEDIATE')
        assert c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0] == before
        assert c.execute('update Progetti set StatoJson=? where Id=? and StatoJson=?', (after, ID, before)).rowcount == 1
    print('Fonte aggiornata: solo il caso Bakuon.')
else:
    OUT.mkdir(exist_ok=False)
    with sqlite3.connect(DB.as_uri() + '?mode=ro', uri=True) as c:
        before = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
    s = json.loads(before)
    sheets = {x['personaId']: x for x in s['passo8']['schede']}
    n = sheets['pb309pd']
    n['cosaSa'] = replace_once(n['cosaSa'],
        'Veniva chiamata sul suo Pocket Ball ma da qualche settimana',
        'Riceve sul suo Pocket Bell messaggi numerici che la spaventano, anche di notte. Nel primo colloquio resta reticente per paura; quando si sente protetta, collabora e parla del suo ex Matsui Kenta.')
    s['passo1']['rigaUnica'] = 'Matsui Kenta ha ucciso Yuta con un unico colpo di tonfa alla testa, da dietro.'
    event = s['passo7']['eventi'][5]
    event['testo'] = replace_once(event['testo'],
        'viene uccisa con un colpo alle spalle con un oggetto contundente.',
        'viene uccisa da Matsui Kenta con un unico colpo di tonfa alla testa, da dietro.')
    sheets['pogta8z']['cosaSa'] += '. Ha colpito Yuta da dietro alla testa con un tonfa, causandone la morte.'
    sheets['pw1mcdx']['cosaSa'] += ' Quando si sente protetta e racconta la verità, può descrivere anche il tonfa, un manganello con impugnatura laterale, usato da Matsui.'
    y = sheets['py96wv4']
    y['deposizione'] = replace_once(y['deposizione'],
        'chi è entrato, chi ha colpito, con cosa.',
        'chi è entrato e che Matsui ha colpito Yuta con un tonfa, un manganello con impugnatura laterale.')
    pista = next(x for x in s['passo3']['problemi'] if x['testo'] == 'Frequentava un gruppo di giovani della yakuza')
    pista['testo'] = ('Le presunte frequentazioni di Yuta con la Yakuza sono voci false: Yuta non ha alcun legame con quegli ambienti. '
        'Per il master: qualsiasi ricerca, controllo degli archivi, domanda a testimoni o verifica tramite contatti dà esito negativo. '
        'Non emergono frequentazioni, debiti o collegamenti con la Yakuza; non ci sono legami nascosti da scoprire. '
        'La pista si esaurisce con questi riscontri, senza bloccare l’indagine. Il movente resta la gelosia di Matsui.')
    aut = s['passo10']['handout'][0]
    aut['contenuto'] = replace_once(aut['contenuto'],
        "L'arma usata presenta superficie irregolare — compatibile con oggetto contundente non affilato (tubo, manganello, similare).",
        'La lesione è compatibile con un corpo contundente non affilato, quale un manganello o un oggetto analogo. I margini irregolari della ferita non consentono, da soli, di determinare la superficie o il tipo esatto dell’arma.')
    aut['contenuto'] = replace_once(aut['contenuto'],
        "L'oggetto contundente è di medie dimensioni e presenta una superficie abbastanza ampia per causare una ferita di questa estensione.",
        'Le lesioni sono compatibili con l’impiego di un manganello; il solo esame autoptico non identifica univocamente l’oggetto utilizzato.')
    for h, extra in [
        (aut, ' Verità del master: Matsui ha usato un tonfa (manganello con impugnatura laterale). Il referto è compatibile con quest’arma, ma non la identifica da solo: il dettaglio emerge dai testimoni quando collaborano.'),
        (s['passo10']['handout'][3], ' Verità del master: Yuta non ha alcuna frequentazione con la Yakuza. Le voci sono false; qualsiasi ricerca, domanda a testimoni o controllo tramite archivi e contatti dà esito negativo. Non aggiungere conferme o legami nascosti.')
    ]:
        h['avvisoGM'] += extra
        h['contenuto'], count = re.subn(r'<aside class="ho-avviso-gm".*?</aside>', lambda _: avviso_html(h['avvisoGM']), h['contenuto'], flags=re.S)
        assert count == 1
    after = json.dumps(s, ensure_ascii=False, indent=2)
    (OUT / 'StatoJson_prima.txt').write_text(before, encoding='utf-8')
    (OUT / 'StatoJson_dopo.json').write_text(after, encoding='utf-8')
    (OUT / 'modifiche.diff').write_text('\n'.join(difflib.unified_diff(
        json.dumps(json.loads(before), ensure_ascii=False, indent=2).splitlines(), after.splitlines(),
        fromfile='prima', tofile='dopo', lineterm='')), encoding='utf-8')
    for name in ['contesto_tavolo.py', 'MEMORY.md']:
        (OUT / name).write_bytes((ROOT / name).read_bytes())
    print('Preparati backup e diff delle modifiche autorizzate.')
