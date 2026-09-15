# -*- coding: utf-8 -*-
"""Converte una lista di HTML in PDF A4 con Chrome headless, e fa un provino a griglia."""
import sys, os, subprocess, pathlib
sys.stdout.reconfigure(encoding="utf-8")

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
BASE = pathlib.Path(r"C:\Public\_Clienti\Maruga\Giochi\Vampiri\Vault\Vampiri\Investigare")
OUT = pathlib.Path(r"C:\Users\Maruga\AppData\Local\Temp\claude\C--Public--Clienti-Maruga-Giochi-Vampiri-Vault-Vampiri-Investigare\e0f154ae-87b0-4d3e-88d6-2aa263ff59ce\scratchpad\vetrina")
OUT.mkdir(parents=True, exist_ok=True)

def pdf(html: pathlib.Path, dest: pathlib.Path):
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                    "--print-to-pdf=" + str(dest), html.as_uri()],
                   capture_output=True, timeout=120)
    return dest.exists()

if __name__ == "__main__":
    lista = [l.strip() for l in sys.argv[1:]]
    for i, rel in enumerate(lista, 1):
        src = BASE / rel
        dest = OUT / f"{i:02d}.pdf"
        ok = pdf(src, dest)
        print(f"{i:02d} {'ok ' if ok else 'KO '} {rel}")
