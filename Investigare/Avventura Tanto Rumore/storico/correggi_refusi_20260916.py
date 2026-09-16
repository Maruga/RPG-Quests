"""Correzione autorizzata di due soli campi del caso Bakuon; prima prepara, poi applica."""
import difflib
import hashlib
import json
from pathlib import Path
import sqlite3
import sys

ROOT = Path(__file__).resolve().parents[1]
DB = ROOT.parent / 'Wizard/codice/GenkaiWizard/app.db'
ID = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'
OUT = ROOT / 'storico/refusi_2026-09-16'

if '--applica' not in sys.argv:
    OUT.mkdir(exist_ok=False)
    with sqlite3.connect(DB.as_uri() + '?mode=ro', uri=True) as c:
        original = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
    s = json.loads(original)
    famiglia = next(f for f in s['passo3']['famiglia'] if f['personaId'] == 'p5j75fj')
    assert famiglia['relazione'] == 'Sorella minore'
    famiglia['relazione'] = 'Sorella maggiore'
    problema = next(p for p in s['passo3']['problemi'] if p['testo'] == 'Innamorato della sua compagna di classe Watanabe')
    problema['testo'] = 'Innamorato di Watanabe Noriko, che frequenta lo stesso complesso scolastico ma non la sua classe'
    after = json.dumps(s, ensure_ascii=False, indent=2)
    (OUT / 'StatoJson_prima.txt').write_text(original, encoding='utf-8')
    (OUT / 'StatoJson_dopo.json').write_text(after, encoding='utf-8')
    (OUT / 'refusi.diff').write_text('\n'.join(difflib.unified_diff(
        json.dumps(json.loads(original), ensure_ascii=False, indent=2).splitlines(), after.splitlines(),
        fromfile='prima', tofile='dopo', lineterm='')), encoding='utf-8')
    print('Preparati due soli cambiamenti. Backup e diff in', OUT)
else:
    original = (OUT / 'StatoJson_prima.txt').read_text(encoding='utf-8')
    after = (OUT / 'StatoJson_dopo.json').read_text(encoding='utf-8')
    with sqlite3.connect(DB, timeout=15) as c:
        c.execute('BEGIN IMMEDIATE')
        current = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
        assert current == original, 'Stato cambiato dopo la preparazione'
        assert c.execute('update Progetti set StatoJson=? where Id=? and StatoJson=?', (after, ID, original)).rowcount == 1
    print('Corretti i due refusi alla fonte.')
