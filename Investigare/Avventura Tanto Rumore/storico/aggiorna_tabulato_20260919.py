"""Revisione autorizzata: due chiamate ripetitive spostate al 22 e 23 maggio."""
from pathlib import Path
import datetime
import difflib
import json
import re
import sqlite3
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT.parent / 'Wizard/codice/GenkaiWizard/app.db'
OUT = ROOT / 'storico/tabulato_22_23_2026-09-19'
ID = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'

if '--applica' in sys.argv:
    before = (OUT / 'StatoJson_prima.txt').read_text(encoding='utf-8')
    after = (OUT / 'StatoJson_dopo.json').read_text(encoding='utf-8')
    with sqlite3.connect(DB, timeout=15) as c:
        c.execute('BEGIN IMMEDIATE')
        assert c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0] == before
        assert c.execute('update Progetti set StatoJson=? where Id=?', (after, ID)).rowcount == 1
    print('Aggiornato soltanto il tabulato del caso Bakuon.')
else:
    OUT.mkdir(exist_ok=False)
    with sqlite3.connect(DB.as_uri() + '?mode=ro', uri=True) as c:
        before = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
    s = json.loads(before)
    handout = s['passo10']['handout'][4]
    original = handout['contenuto']
    tbody = re.search(r'<tbody>(.*?)</tbody>', original, re.S)
    rows = re.findall(r'<tr>.*?</tr>', tbody[1], re.S)
    assert len(rows) == 31
    changes = {'03/04 22:36': '22/05 01:47', '04/03 22:41': '23/05 22:41'}
    for old, new in changes.items():
        assert sum(f'<td>{old}</td>' in r for r in rows) == 1
        rows = [r.replace(f'<td>{old}</td>', f'<td>{new}</td>') for r in rows]
    rows.sort(key=lambda r: datetime.datetime.strptime(re.search(r'<td>(.*?)</td>', r)[1], '%d/%m %H:%M'))
    handout['contenuto'] = original[:tbody.start(1)] + '\n      ' + '\n      '.join(rows) + '\n    ' + original[tbody.end(1):]
    assert len(rows) == 31 and '31 (traffico completo del periodo)' in handout['contenuto']
    after = json.dumps(s, ensure_ascii=False, indent=2)
    (OUT / 'StatoJson_prima.txt').write_text(before, encoding='utf-8')
    (OUT / 'StatoJson_dopo.json').write_text(after, encoding='utf-8')
    (OUT / 'tabulato.diff').write_text('\n'.join(difflib.unified_diff(original.splitlines(), handout['contenuto'].splitlines(), fromfile='prima', tofile='dopo', lineterm='')), encoding='utf-8')
    with zipfile.ZipFile(OUT / 'materiale_prima.zip', 'w', zipfile.ZIP_DEFLATED) as z:
        for f in list((ROOT / 'handout').glob('*')) + [ROOT / 'MEMORY.md']:
            z.write(f, f.relative_to(ROOT))
    print((OUT / 'tabulato.diff').read_text(encoding='utf-8'))
