"""Aggiorna il PNG della mappa e ritira il PDF precedente dagli allegati correnti."""
from pathlib import Path
import hashlib
import json
import shutil
import sqlite3

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'storico/mappa_pavimenti_2026-09-16'
WIZ = ROOT.parent / 'Wizard/codice/GenkaiWizard'
ID = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'
SOURCE = ROOT / 'Immagini/Planimetria con esterno.png'
DEST = WIZ / 'wwwroot/allegati' / ID.lower() / SOURCE.name
original = (OUT / 'StatoJson_prima.txt').read_text(encoding='utf-8')
after = (OUT / 'StatoJson_dopo.json').read_text(encoding='utf-8')
assert hashlib.sha256(DEST.read_bytes()).digest() == hashlib.sha256((OUT / 'prima.png').read_bytes()).digest()
with sqlite3.connect(WIZ / 'app.db', timeout=15) as c:
    c.execute('BEGIN IMMEDIATE')
    assert c.execute('select StatoJson from Progetti where Id=?', (ID,)).fetchone()[0] == original
    try:
        shutil.copy2(SOURCE, DEST)
        assert c.execute('update Progetti set StatoJson=? where Id=? and StatoJson=?', (after, ID, original)).rowcount == 1
        c.commit()
    except BaseException:
        shutil.copy2(OUT / 'prima.png', DEST)
        c.rollback()
        raise
print('PNG aggiornato; PDF precedente escluso dagli allegati correnti e conservato.')
