"""Aggiorna la mappa autorizzata e aggiunge il PDF A3 fra i materiali del finale."""
import hashlib
import json
from pathlib import Path
import shutil
import sqlite3
import sys

ROOT = Path(__file__).resolve().parents[1]
WIZ = ROOT.parent / 'Wizard/codice/GenkaiWizard'
ID = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'
OUT = ROOT / 'storico/mappa_A3_2026-09-16'
ALLEGATI = WIZ / 'wwwroot/allegati' / ID.lower()
PNG = 'Planimetria con esterno.png'
PDF = 'Planimetria combattimento A3.pdf'


def sha(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()


if '--applica' not in sys.argv:
    with sqlite3.connect((WIZ / 'app.db').as_uri() + '?mode=ro', uri=True) as c:
        original = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
    s = json.loads(original)
    allegati = s['passo9']['tracce'][1]['allegati']
    assert allegati[0]['nome'] == PNG and allegati[0]['uso'] == 'scena'
    assert not any(a['nome'] == PDF for a in allegati)
    allegati.insert(1, {'nome': PDF, 'url': '/allegati/' + ID.lower() + '/Planimetria%20combattimento%20A3.pdf',
                        'uso': 'scena', 'formatoStampa': 'A3 orizzontale (420 × 297 mm)'})
    assert sha(ALLEGATI / PNG) == sha(OUT / 'Planimetria prima.png')
    assert not (ALLEGATI / PDF).exists()
    (OUT / 'StatoJson_prima.txt').write_text(original, encoding='utf-8')
    (OUT / 'StatoJson_dopo.json').write_text(json.dumps(s, ensure_ascii=False, indent=2), encoding='utf-8')
    (OUT / 'manifest.json').write_text(json.dumps({'png_prima': sha(ALLEGATI / PNG),
        'png_dopo': sha(ROOT / 'Immagini' / PNG), 'pdf': sha(ROOT / 'Immagini' / PDF)}, indent=2), encoding='utf-8')
    print('Pronti PNG revisionato e PDF A3; materiali precedenti salvati.')
else:
    original = (OUT / 'StatoJson_prima.txt').read_text(encoding='utf-8')
    after = (OUT / 'StatoJson_dopo.json').read_text(encoding='utf-8')
    m = json.loads((OUT / 'manifest.json').read_text(encoding='utf-8'))
    assert sha(ALLEGATI / PNG) == m['png_prima']
    assert sha(ROOT / 'Immagini' / PNG) == m['png_dopo']
    assert sha(ROOT / 'Immagini' / PDF) == m['pdf']
    with sqlite3.connect(WIZ / 'app.db', timeout=15) as c:
        c.execute('BEGIN IMMEDIATE')
        assert c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0] == original
        try:
            shutil.copy2(ROOT / 'Immagini' / PNG, ALLEGATI / PNG)
            shutil.copy2(ROOT / 'Immagini' / PDF, ALLEGATI / PDF)
            assert c.execute('update Progetti set StatoJson=? where Id=? and StatoJson=?', (after, ID, original)).rowcount == 1
            c.commit()
        except BaseException:
            shutil.copy2(OUT / 'Planimetria prima.png', ALLEGATI / PNG)
            c.rollback()
            raise
    print('Mappa revisionata e PDF A3 salvati alla fonte, entrambi riservati al finale.')
