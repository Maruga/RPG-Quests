"""Titolo Deposizione e ruoli pubblici dei sei dichiaranti, su richiesta utente."""
from pathlib import Path
import difflib
import json
import sqlite3
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
WIZ = ROOT.parent / 'Wizard/codice/GenkaiWizard'
DB = WIZ / 'app.db'
JS = WIZ / 'wwwroot/js/wizard.js'
OUT = ROOT / 'storico/ruoli_deposizioni_2026-09-19'
ID = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'
RUOLI = {
    'pw1mcdx': 'Cameriera dello SnakUp',
    'pobfvlu': 'Titolare dello SnakUp',
    'pbdagjy': 'Madre della vittima',
    'p5j75fj': 'Sorella maggiore della vittima',
    'pb309pd': 'Ragazza frequentata dalla vittima',
    'p91t5a1': 'Migliore amico della vittima',
}

if '--applica' in sys.argv:
    before = (OUT / 'StatoJson_prima.txt').read_text(encoding='utf-8')
    after = (OUT / 'StatoJson_dopo.json').read_text(encoding='utf-8')
    assert JS.read_bytes() == (OUT / 'wizard.js.prima').read_bytes()
    with sqlite3.connect(DB, timeout=15) as c:
        c.execute('BEGIN IMMEDIATE')
        assert c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0] == before
        JS.write_bytes((OUT / 'wizard.js.dopo').read_bytes())
        c.execute('update Progetti set StatoJson=? where Id=?', (after, ID))
    print('Aggiornati i sei ruoli nel caso e il renderer delle deposizioni.')
else:
    OUT.mkdir(exist_ok=False)
    with sqlite3.connect(DB.as_uri() + '?mode=ro', uri=True) as c:
        before = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
    state = json.loads(before)
    for pid, role in RUOLI.items():
        s = next(s for s in state['passo8']['schede'] if s['personaId'] == pid)
        assert s.get('depHandout') and s.get('deposizione')
        s['depRuolo'] = role
    after = json.dumps(state, ensure_ascii=False, indent=2)
    js_before = JS.read_bytes()
    js = js_before.decode('utf-8')
    replacements = [
        ('function verbaleDeposizione(titolo, nome, testo) {',
         'function verbaleDeposizione(titolo, nome, testo, ruolo = "") {\n        const ruoloHtml = ruolo ? `<dt>Ruolo</dt><dd>${String(ruolo).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</dd>` : "";'),
        ('VERBALE DI SOMMARIE INFORMAZIONI', 'DEPOSIZIONE'),
        ('<dd>${nome}</dd><dt>Data e luogo</dt>', '<dd>${nome}</dd>${ruoloHtml}<dt>Data e luogo</dt>'),
        ('verbaleDi: nome });', 'verbaleDi: nome, ruolo: s.depRuolo || "" });'),
        ('verbaleDeposizione(r.titolo, r.verbaleDi, r.testo)', 'verbaleDeposizione(r.titolo, r.verbaleDi, r.testo, r.ruolo)'),
    ]
    for old, new in replacements:
        assert js.count(old) == 1, old
        js = js.replace(old, new)
    (OUT / 'StatoJson_prima.txt').write_text(before, encoding='utf-8')
    (OUT / 'StatoJson_dopo.json').write_text(after, encoding='utf-8')
    (OUT / 'wizard.js.prima').write_bytes(js_before)
    (OUT / 'wizard.js.dopo').write_bytes(js.encode('utf-8'))
    for name, old, new in [('StatoJson', json.dumps(json.loads(before), ensure_ascii=False, indent=2), after), ('wizard.js', js_before.decode('utf-8'), js)]:
        (OUT / (name + '.diff')).write_text('\n'.join(difflib.unified_diff(old.splitlines(), new.splitlines(), fromfile='prima', tofile='dopo', lineterm='')), encoding='utf-8')
    with zipfile.ZipFile(OUT / 'materiale_prima.zip', 'w', zipfile.ZIP_DEFLATED) as z:
        for p in list((ROOT / 'handout').glob('*')) + [ROOT / n for n in ['gestione_handout.py', 'MEMORY.md']]:
            if p.is_file():
                z.write(p, p.relative_to(ROOT))
    print('Preparati backup, ruoli e diff per sei deposizioni.')
