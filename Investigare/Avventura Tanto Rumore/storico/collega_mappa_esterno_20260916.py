"""Collega alla scena finale la nuova planimetria, conservando l'immagine originale."""
import hashlib
import json
from pathlib import Path
import shutil
import sqlite3
import sys

ROOT = Path(__file__).resolve().parents[1]
WIZ = ROOT.parent / 'Wizard/codice/GenkaiWizard'
ID = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'
OUT = ROOT / 'storico/mappa_esterno_2026-09-16'
IMAGE = ROOT / 'Immagini/Planimetria con esterno.png'
DEST = WIZ / 'wwwroot/allegati' / ID.lower() / IMAGE.name

if '--applica' not in sys.argv:
    with sqlite3.connect((WIZ / 'app.db').as_uri() + '?mode=ro', uri=True) as c:
        original = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
    s = json.loads(original)
    a = s['passo9']['tracce'][1]['allegati'][0]
    assert a['nome'] == 'Planimetria.png' and a['uso'] == 'scena'
    a['nome'] = IMAGE.name
    a['url'] = '/allegati/' + ID.lower() + '/Planimetria%20con%20esterno.png'
    (OUT / 'StatoJson_prima.txt').write_text(original, encoding='utf-8')
    (OUT / 'StatoJson_dopo.json').write_text(json.dumps(s, ensure_ascii=False, indent=2), encoding='utf-8')
    (OUT / 'immagine.sha256').write_text(hashlib.sha256(IMAGE.read_bytes()).hexdigest(), encoding='ascii')
    print('Pronto collegamento della nuova mappa; uso di scena invariato.')
else:
    assert hashlib.sha256(IMAGE.read_bytes()).hexdigest() == (OUT / 'immagine.sha256').read_text(encoding='ascii')
    assert not DEST.exists(), 'Non sovrascrivere un allegato esistente'
    original = (OUT / 'StatoJson_prima.txt').read_text(encoding='utf-8')
    after = (OUT / 'StatoJson_dopo.json').read_text(encoding='utf-8')
    with sqlite3.connect(WIZ / 'app.db', timeout=15) as c:
        c.execute('BEGIN IMMEDIATE')
        current = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
        assert current == original, 'Caso cambiato dopo la preparazione'
        shutil.copy2(IMAGE, DEST)
        assert c.execute('update Progetti set StatoJson=? where Id=? and StatoJson=?', (after, ID, original)).rowcount == 1
    print('Nuova planimetria collegata al finale; originale conservato.')
