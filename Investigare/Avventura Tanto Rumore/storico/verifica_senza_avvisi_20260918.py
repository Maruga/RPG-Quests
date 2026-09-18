"""Confronto dei documenti reali e verifica PDF dopo la rimozione degli avvisi."""
from pathlib import Path
import concurrent.futures
import re
import subprocess
import tempfile
import zipfile
import fitz

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'storico/handout_senza_avvisi_2026-09-18'
docs = sorted((ROOT / 'handout').glob('*.html'))
report = []
assert len(docs) == 13
with zipfile.ZipFile(OUT / 'materiale_prima.zip') as z:
    for f in docs:
        before = z.read('handout/' + f.name).decode('utf-8').replace('\r\n', '\n')
        after = f.read_text(encoding='utf-8')
        assert after == re.sub(r'<aside class="ho-avviso-gm".*?</aside>', '', before, flags=re.S), f.name
        assert 'ho-avviso-gm' not in after and 'AVVISO PER IL MASTER' not in after
    old_index = z.read('handout/_Indice.md').decode('utf-8').replace('\r\n', '\n')
    new_index = (ROOT / 'handout/_Indice.md').read_text(encoding='utf-8')
    assert re.findall(r'> \*\*Consegna GM:\*\*.*', old_index) == re.findall(r'> \*\*Consegna GM:\*\*.*', new_index)
report.append('13 HTML: rimossi soltanto i riquadri GM; istruzioni conservate integralmente nell indice.')
js_path = ROOT.parent / 'Wizard/codice/GenkaiWizard/wwwroot/js/wizard.js'
assert js_path.read_bytes() == (OUT / 'wizard.js.dopo').read_bytes()
js = js_path.read_text(encoding='utf-8')
snippets = js[js.index('    function foglioInformazione('):js.index('    // 📎 allegato-immagine:')]
snippets += js[js.index('    function verbaleDeposizione('):js.index('    function initHandoutRaccolti()')]
snippets += '''
const assert = require('node:assert/strict');
const a = foglioInformazione('Documento','Testo',[{url:'moto.png'},{url:'mappa.png',uso:'scena'}],'SEGRETO GM');
const b = verbaleDeposizione('Verbale','Testimone','Testo','SEGRETO GM');
assert.ok(a.includes('moto.png') && !a.includes('mappa.png'));
for (const x of [a,b]) assert.ok(x.includes('Testo') && !x.includes('SEGRETO GM') && !x.includes('ho-avviso-gm'));
assert.ok(b.includes('firma del dichiarante'));
'''
subprocess.run(['node', '-'], input=snippets, text=True, encoding='utf-8', capture_output=True, check=True)
report.append('Renderer wizard verificato: nessun avviso; firme e allegati conservati, immagini di scena escluse.')
pdfdir = OUT / 'verifica_stampa'
pdfdir.mkdir(exist_ok=True)

def one(f):
    target = pdfdir / (f.stem + '.pdf')
    with tempfile.TemporaryDirectory(prefix='bakuon-stampa-pulita-') as profile:
        task_profile = Path(profile).resolve()
        assert task_profile.is_relative_to(Path(tempfile.gettempdir()).resolve())
        p = subprocess.run([r'C:\Program Files\Google\Chrome\Application\chrome.exe',
            '--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
            '--disable-background-networking', '--disable-extensions', '--no-pdf-header-footer',
            '--user-data-dir=' + str(task_profile), '--print-to-pdf=' + str(target), f.as_uri()],
            capture_output=True, timeout=45, creationflags=0x08000000)
        assert p.returncode == 0 and target.exists(), (f.name, p.stderr[-1000:])
    with fitz.open(target) as pdf:
        assert all('AVVISO PER IL MASTER' not in p.get_text() for p in pdf)
        for page in pdf:
            for block in page.get_text('dict')['blocks']:
                for line in block.get('lines', []):
                    for span in line['spans']:
                        x0, y0, x1, y1 = span['bbox']
                        assert -1 <= x0 < x1 <= page.rect.width + 1 and -1 <= y0 < y1 <= page.rect.height + 1, (f.name, span['text'])
        if f.name.startswith(('01_', '04_')):
            pdf[-1].get_pixmap().save(pdfdir / (f.stem + '_ultima.png'))
        return f'{f.name}: {len(pdf)} pagine; nessun avviso, testo entro i margini.'

with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    for result in pool.map(one, docs):
        report.append(result)
        print(result, flush=True)
(OUT / 'VERIFICHE.txt').write_text('\n'.join(report) + '\n', encoding='utf-8')
