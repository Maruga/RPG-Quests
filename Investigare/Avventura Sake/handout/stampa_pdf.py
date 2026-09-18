"""Esporta gli handout in PDF A4, singoli e raccolta completa.

Richiede Google Chrome, websocket-client e PyMuPDF nel Python locale.
Eseguire: python handout/stampa_pdf.py
"""
import base64
import json
import os
from pathlib import Path
import subprocess
import tempfile
import time
import urllib.request

import fitz
import websocket


def main():
    source = Path(__file__).resolve().parent
    output = source / "PDF_STAMPA"
    output.mkdir(exist_ok=True)
    chrome = Path(os.environ.get("PROGRAMFILES", "C:/Program Files")) / "Google/Chrome/Application/chrome.exe"
    profile = Path(tempfile.mkdtemp(prefix="sake-stampa-"))
    process = subprocess.Popen(
        [str(chrome), "--headless=new", "--disable-gpu", "--no-first-run",
         "--no-default-browser-check", "--remote-debugging-port=0",
         "--remote-allow-origins=http://localhost", f"--user-data-dir={profile}", "about:blank"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        creationflags=subprocess.CREATE_NO_WINDOW,
    )
    connection = None
    try:
        port_file = profile / "DevToolsActivePort"
        for _ in range(200):
            if port_file.exists():
                break
            time.sleep(0.1)
        port = port_file.read_text().splitlines()[0]
        with urllib.request.urlopen(f"http://127.0.0.1:{port}/json/list") as response:
            target = next(item for item in json.load(response) if item["type"] == "page")
        connection = websocket.create_connection(target["webSocketDebuggerUrl"], origin="http://localhost", timeout=30)
        sequence = 0

        def call(method, **params):
            nonlocal sequence
            sequence += 1
            connection.send(json.dumps({"id": sequence, "method": method, "params": params}))
            while True:
                message = json.loads(connection.recv())
                if message.get("id") == sequence:
                    if "error" in message:
                        raise RuntimeError(message["error"])
                    return message.get("result", {})

        call("Page.enable")
        call("Emulation.setEmulatedMedia", media="print")
        merged = fitz.open()
        toc = []
        errors = []
        for html in sorted(source.glob("*.html")):
            call("Page.navigate", url=html.as_uri())
            for _ in range(100):
                ready = call("Runtime.evaluate", expression="document.readyState")
                if ready.get("result", {}).get("value") == "complete":
                    break
                time.sleep(0.05)
            ready = call("Runtime.evaluate", expression="document.fonts.ready.then(() => [...document.images].every(i => i.complete && i.naturalWidth > 0))", awaitPromise=True, returnByValue=True)
            if ready.get("result", {}).get("value") is not True:
                raise RuntimeError(f"Immagini non caricate: {html.name}")
            result = call("Page.printToPDF", printBackground=True, displayHeaderFooter=False, preferCSSPageSize=True)
            data = base64.b64decode(result["data"])
            (output / f"{html.stem}.pdf").write_bytes(data)
            pdf = fitz.open(stream=data, filetype="pdf")
            expected = 4 if html.name.startswith("05_") else 1
            print(f"{html.stem}: {len(pdf)} pagine (attese {expected})", flush=True)
            if len(pdf) != expected:
                errors.append(html.name)
            for page in pdf:
                if not page.get_text().strip():
                    raise RuntimeError(f"Pagina senza testo: {html.name}")
            toc.append([1, html.stem.replace("_", " "), len(merged) + 1])
            merged.insert_pdf(pdf)
            pdf.close()
        if errors:
            raise RuntimeError(f"Impaginazione da verificare: {', '.join(errors)}")
        merged.set_toc(toc)
        merged.set_metadata({"title": "L'Ultima Cena di Tanaka - Handout per la stampa"})
        merged.save(output / "TUTTI_HANDOUT.pdf", garbage=4, deflate=True)
        print(f"Raccolta completa: {len(merged)} pagine. Cartella: {output}", flush=True)
        merged.close()
    finally:
        if connection:
            connection.close()
        process.terminate()
        process.wait(timeout=15)


if __name__ == "__main__":
    main()
