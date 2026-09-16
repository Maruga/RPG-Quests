"""Controlli su dati reali, copie esportate, renderer del wizard e PDF degli handout."""
import concurrent.futures
import datetime
import hashlib
import json
from pathlib import Path
import re
import sqlite3
import subprocess
import sys
import tempfile
import urllib.parse

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'storico/revisione_2026-09-16'
WIZ = ROOT.parent / 'Wizard/codice/GenkaiWizard'
ID = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'


def verifica():
    report = []
    manifest = json.loads((OUT / 'manifest.json').read_text(encoding='utf-8'))
    with sqlite3.connect((WIZ / 'app.db').as_uri() + '?mode=ro', uri=True) as c:
        rows = c.execute('select Id, StatoJson from Progetti order by Id').fetchall()
    with sqlite3.connect((OUT / 'app.db.prima').as_uri() + '?mode=ro', uri=True) as c:
        old_rows = c.execute('select Id, StatoJson from Progetti order by Id').fetchall()
    assert [r for r in rows if r[0] != ID] == [r for r in old_rows if r[0] != ID]
    raw = dict(rows)[ID]
    assert hashlib.sha256(raw.encode('utf-8')).hexdigest() == manifest['stato_dopo_sha256']
    report.append('Database: modificato soltanto il caso Bakuon; stato identico alla revisione preparata.')
    s = json.loads(raw)
    before = json.loads(dict(old_rows)[ID])
    docs = sorted((ROOT / 'handout').glob('*.html'))
    assert len(docs) == 13
    for f in docs:
        raw_html = f.read_text(encoding='utf-8')
        soup = BeautifulSoup(raw_html, 'html.parser')
        notes = soup.select('.ho-avviso-gm')
        assert len(notes) == 1 and '#a01818' in notes[0].get('style', ''), f.name
        assert soup.select_one('.ho-foglio').find_all(recursive=False)[-1] == notes[0], f.name
        years = set(re.findall(r'(?<!\d)(?:19|20)\d{2}(?!\d)', soup.body.get_text(' ')))
        assert years <= {'1997', '1921'}, (f.name, years)
        for img in soup.select('img[src]'):
            assert (f.parent / urllib.parse.unquote(img['src'])).resolve().exists(), img['src']
        if f.name.startswith('07_'): assert not soup.select('img')
    for h in s['passo10']['handout']:
        assert sum(h['contenuto'].strip() in f.read_text(encoding='utf-8') for f in docs) == 1
    report.append('13 handout: avviso rosso unico in fondo, anni controllati, immagini locali presenti; cinque autonomi identici al wizard.')
    tab = BeautifulSoup(s['passo10']['handout'][4]['contenuto'], 'html.parser')
    entries = tab.select('tbody tr')
    assert len(entries) == 31
    original = BeautifulSoup(before['passo10']['handout'][4]['contenuto'], 'html.parser').select('tbody tr')[:31]
    assert [r.get_text() for r in entries] == [r.get_text() for r in original]
    times = []
    for r in entries:
        cells = r.select('td')
        assert len(cells) == 5 and all(c.get_text(strip=True) for c in cells)
        t = datetime.datetime.strptime('1997/' + cells[0].get_text(), '%Y/%d/%m %H:%M')
        assert datetime.datetime(1997, 2, 1) <= t <= datetime.datetime(1997, 5, 24, 23, 59, 59)
        times.append(t)
    assert times == sorted(times) and len(set(times)) == 31
    report.append('Tabulato: 31 righe complete originali, cronologiche e nel periodo; nessuna chiamata aggiunta.')
    for n, day in [(24, 5), (25, 6), (26, 0), (27, 1), (28, 2)]:
        assert datetime.date(1997, 5, n).weekday() == day
    aut = BeautifulSoup(s['passo10']['handout'][0]['contenuto'], 'html.parser').get_text(' ')
    assert '26 maggio 1997, ore 09:00' in aut and '26 maggio 1997, ore 15:00' in aut
    assert '12-18' not in aut
    report.append('Calendario: 24 sabato, 25 domenica, 26 lunedì, 27 martedì, 28 mercoledì; autopsia 26 ore 09, referto ore 15.')
    for name in ['Storia Completa.md', 'DOSSIER_GM.md']:
        text = (ROOT / name).read_text(encoding='utf-8')
        for word in ['26/05/1997', '15:00', '27/05/1997', '28/05/1997', '24 ore']:
            assert word in text, (name, word)
    sh = next(x for x in s['passo8']['schede'] if x['personaId'] == 'pb309pd')
    assert 'lunedì ventisei maggio' in sh['deposizione'] and 'giorno dopo' not in sh['deposizione']
    assert '25' in sh['depAvvisoGM'] and 'non consegnare questo testo' in sh['depAvvisoGM']
    assert all(a['uso'] == 'scena' for a in s['passo9']['tracce'][1]['allegati'])
    js = (WIZ / 'wwwroot/js/wizard.js').read_text(encoding='utf-8')
    snippets = js[js.index('    function avvisoMasterHandout('):js.index('    // 📎 allegato-immagine:')]
    snippets += js[js.index('    function verbaleDeposizione('):js.index('    function initHandoutRaccolti()')]
    js_test = snippets + '''
const assert = require('node:assert/strict');
const ordinary = {url:'moto.png',nome:'Moto'};
const scene = {url:'mappa.png',nome:'Mappa',uso:'scena'};
const result = foglioInformazione('Documento','Testo',[ordinary,scene],'25/05/1997 <solo GM>');
assert.ok(result.includes('moto.png'));
assert.ok(!result.includes('mappa.png'));
assert.ok(result.includes('&lt;solo GM&gt;'));
assert.ok(result.indexOf('ho-avviso-gm') > result.indexOf('moto.png'));
assert.ok(!foglioInformazione('Documento','Testo',[ordinary]).includes('ho-avviso-gm'));
assert.ok(verbaleDeposizione('Verbale','Testimone','Testo','26/05/1997').indexOf('ho-avviso-gm') > verbaleDeposizione('Verbale','Testimone','Testo','26/05/1997').indexOf('firma del dichiarante'));
console.log('Renderer del wizard: avvisi in fondo, testo escapato, mappa esclusa, documenti senza metadati invariati.');
'''
    result = subprocess.run(['node', '-'], input=js_test, text=True, encoding='utf-8', capture_output=True, check=True)
    report.append(result.stdout.strip())
    return docs, report


def stampa(docs, report):
    import fitz
    pdf_dir = OUT / 'verifica_stampa'
    pdf_dir.mkdir(exist_ok=True)
    browser = r'C:\Program Files\Google\Chrome\Application\chrome.exe'

    def one(f):
        target = pdf_dir / (f.stem + '.pdf')
        with tempfile.TemporaryDirectory(prefix='bakuon-stampa-') as profile:
            cmd = [browser, '--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
                   '--disable-background-networking', '--disable-extensions', '--no-pdf-header-footer',
                   '--user-data-dir=' + profile, '--print-to-pdf=' + str(target), f.as_uri()]
            result = subprocess.run(cmd, capture_output=True, timeout=45, creationflags=0x08000000)
            assert result.returncode == 0 and target.exists(), result.stderr.decode('utf-8', errors='replace')[-1000:]
        pdf = fitz.open(target)
        text = '\n'.join(p.get_text() for p in pdf)
        assert 'AVVISO PER IL MASTER' in text, f.name
        assert len(re.findall('AVVISO PER IL MASTER', text)) == 1, f.name
        for page in pdf:
            for block in page.get_text('dict')['blocks']:
                for line in block.get('lines', []):
                    for span in line['spans']:
                        x0, y0, x1, y1 = span['bbox']
                        assert -1 <= x0 < x1 <= page.rect.width + 1, (f.name, span['text'], span['bbox'])
                        assert -1 <= y0 < y1 <= page.rect.height + 1, (f.name, span['text'], span['bbox'])
        last = pdf[-1]
        assert 'AVVISO PER IL MASTER' in last.get_text(), f.name
        if f.name[:2] in ('01', '03', '05', '07', '12'):
            last.get_pixmap(matrix=fitz.Matrix(1.25, 1.25)).save(pdf_dir / (f.stem + '_ultima.png'))
        result = f'{f.name}: {len(pdf)} pagine; avviso nell’ultima pagina, testo entro i margini.'
        pdf.close()
        return result

    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        for result in pool.map(one, docs):
            print(result, flush=True)
            report.append(result)


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    files, results = verifica()
    for result in results: print(result, flush=True)
    if '--stampa' in sys.argv: stampa(files, results)
    (OUT / 'VERIFICHE.txt').write_text('\n'.join(results) + '\n', encoding='utf-8')
