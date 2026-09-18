"""Rimuove gli avvisi dai fogli; conserva le istruzioni GM nei metadati."""
from pathlib import Path
import difflib
import json
import re
import sqlite3
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[1]
WIZ = ROOT.parent / 'Wizard/codice/GenkaiWizard'
OUT = ROOT / 'storico/handout_senza_avvisi_2026-09-18'
ID = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'
JS = WIZ / 'wwwroot/js/wizard.js'

if '--applica' in sys.argv:
    before = (OUT / 'StatoJson_prima.txt').read_text(encoding='utf-8')
    after = (OUT / 'StatoJson_dopo.json').read_text(encoding='utf-8')
    assert JS.read_bytes() == (OUT / 'wizard.js.prima').read_bytes()
    with sqlite3.connect(WIZ / 'app.db', timeout=15) as c:
        c.execute('BEGIN IMMEDIATE')
        assert c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0] == before
        JS.write_bytes((OUT / 'wizard.js.dopo').read_bytes())
        c.execute('update Progetti set StatoJson=? where Id=?', (after, ID))
    print('Aggiornati contenuti del caso e renderer degli handout.')
else:
    OUT.mkdir(exist_ok=False)
    with sqlite3.connect((WIZ / 'app.db').as_uri() + '?mode=ro', uri=True) as c:
        before = c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0]
    state = json.loads(before)
    for h in state['passo10']['handout']:
        h['contenuto'], count = re.subn(r'<aside class="ho-avviso-gm".*?</aside>', '', h['contenuto'], flags=re.S)
        assert count == 1
    after = json.dumps(state, ensure_ascii=False, indent=2)
    js_before = JS.read_bytes()
    js = js_before.decode('utf-8')
    js, count = re.subn(r'    function avvisoMasterHandout\(testo\) \{.*?\r?\n    \}\r?\n\r?\n', '', js, count=1, flags=re.S)
    assert count == 1
    assert js.count('${avvisoMasterHandout(avvisoGM)}') == 2
    js = js.replace('${avvisoMasterHandout(avvisoGM)}', '')
    js = js.replace('function foglioInformazione(titolo, testo, allegati, avvisoGM = "")', 'function foglioInformazione(titolo, testo, allegati)')
    js = js.replace('function verbaleDeposizione(titolo, nome, testo, avvisoGM = "")', 'function verbaleDeposizione(titolo, nome, testo)')
    js = js.replace('r.verbaleDi, r.testo, r.avvisoGM)', 'r.verbaleDi, r.testo)')
    js = js.replace('r.testo, r.allegati, r.avvisoGM)', 'r.testo, r.allegati)')
    (OUT / 'StatoJson_prima.txt').write_text(before, encoding='utf-8')
    (OUT / 'StatoJson_dopo.json').write_text(after, encoding='utf-8')
    (OUT / 'wizard.js.prima').write_bytes(js_before)
    (OUT / 'wizard.js.dopo').write_bytes(js.encode('utf-8'))
    for name, old, new in [('StatoJson', json.dumps(json.loads(before), ensure_ascii=False, indent=2), after), ('wizard.js', js_before.decode('utf-8'), js)]:
        (OUT / (name + '.diff')).write_text('\n'.join(difflib.unified_diff(old.splitlines(), new.splitlines(), fromfile='prima', tofile='dopo', lineterm='')), encoding='utf-8')
    with zipfile.ZipFile(OUT / 'materiale_prima.zip', 'w', zipfile.ZIP_DEFLATED) as z:
        for p in list((ROOT / 'handout').glob('*')) + [ROOT / n for n in ['gestione_handout.py', 'MEMORY.md', 'CLAUDE.md']]:
            z.write(p, p.relative_to(ROOT))
    print('Preparati backup, contenuti e diff.')
