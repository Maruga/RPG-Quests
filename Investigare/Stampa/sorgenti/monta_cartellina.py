# -*- coding: utf-8 -*-
"""
Rimonta la cartellina di presentazione di GENKAI.

    python Stampa/sorgenti/monta_cartellina.py

Rigenera tutto da capo: converte gli HTML (il promemoria, la pagina di presentazione e gli otto
documenti di scena) con Chrome, aggiunge la bacheca del caso, tira fuori le quattro facciate della
scheda di Yamamoto dal DOCX delle schede, e scrive i quattro PDF in Stampa/.
Gli originali delle avventure non vengono toccati: si leggono soltanto.
"""
import sys, os, subprocess, pathlib, io, shutil, tempfile
sys.stdout.reconfigure(encoding="utf-8")
import fitz
from PIL import Image

BASE = pathlib.Path(__file__).resolve().parents[2]      # …/Investigare
OUT  = BASE / "Stampa"
SORG = OUT / "sorgenti"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# i documenti di scena: (file HTML nell'avventura, quale facciata tenere)
DOCUMENTI = [
    ("Avventura Il Giudice/handout/html/02_Rapporto_Autopsia.html",            0),
    ("Avventura Tanto Rumore/handout/01_referto_autopsia_della_vittima.html",  0),
    ("Avventura Ultima Lezione/handout/18_Giornale_Omicidio.html",             0),
    ("Avventura La Falsa Primavera/handout/08_Fotogramma_Konbini.html",        0),
    ("Avventura Ultima Lezione/handout/06_Lettera_Morimoto.html",              0),
    ("Avventura Sake/handout/11_Tabulati_Telefonici.html",                     0),
    ("Avventura Sake/handout/01a_Planimetria_Piano_Terra.html",                1),   # orizzontale
]
BACHECA = "Materiale/CrimeBoard.png"
SCHEDE  = "pg/SCHEDE_PG_TUTTE.docx"
FACCIATE_SCHEDA = (0, 3)        # le prime quattro: tre di scheda + il promemoria da tavolo

def html2pdf(src: pathlib.Path, dest: pathlib.Path) -> bool:
    if dest.exists(): dest.unlink()
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
                    "--print-to-pdf=" + str(dest), src.as_uri()], capture_output=True, timeout=240)
    return dest.exists()

def docx2pdf(src: pathlib.Path, dest: pathlib.Path) -> bool:
    """serve Word installato; se non c'è, si riusa il PDF già montato"""
    try:
        import win32com.client as win32
        if dest.exists(): dest.unlink()
        word = win32.DispatchEx("Word.Application"); word.Visible = False
        d = word.Documents.Open(str(src), ReadOnly=True); d.SaveAs(str(dest), FileFormat=17)
        d.Close(False); word.Quit()
        return dest.exists()
    except Exception as e:
        print("  (Word non disponibile:", e, ")")
        return False

def main():
    tmp = pathlib.Path(tempfile.mkdtemp(prefix="genkai_cartellina_"))
    try:
        # 1 · il promemoria
        prom = tmp / "promemoria.pdf"
        html2pdf(SORG / "promemoria.html", prom)
        shutil.copy2(prom, OUT / "1_PROMEMORIA.pdf")
        print("1_PROMEMORIA.pdf ·", fitz.open(prom).page_count, "pagine")

        # 2 · i documenti di scena
        doc = fitz.open()
        front = tmp / "front.pdf"
        html2pdf(SORG / "frontespizio_documenti.html", front)
        doc.insert_pdf(fitz.open(front))
        for i, (rel, facciata) in enumerate(DOCUMENTI, 1):
            src = BASE / rel
            if not src.exists(): print("  MANCA:", rel); continue
            p = tmp / f"d{i:02d}.pdf"
            if not html2pdf(src, p): print("  non convertito:", rel); continue
            d = fitz.open(p)
            doc.insert_pdf(d, from_page=facciata, to_page=facciata)
            print("  +", pathlib.Path(rel).name)

        im = Image.open(BASE / BACHECA).convert("RGB")
        im.thumbnail((2480, 2480))
        buf = io.BytesIO(); im.save(buf, "JPEG", quality=86)
        pag = doc.new_page(width=842, height=595)          # A4 orizzontale
        r = pag.rect; s = min(r.width/im.width, r.height/im.height)
        w, h = im.width*s, im.height*s
        pag.insert_image(fitz.Rect((r.width-w)/2, (r.height-h)/2, (r.width+w)/2, (r.height+h)/2),
                         stream=buf.getvalue())
        print("  + bacheca del caso")
        doc.save(OUT / "2_DOCUMENTI_DI_SCENA.pdf", deflate=True, garbage=3)
        print("2_DOCUMENTI_DI_SCENA.pdf ·", doc.page_count, "pagine")

        # 3 · la scheda del personaggio
        pdf_schede = tmp / "schede.pdf"
        if docx2pdf(BASE / SCHEDE, pdf_schede):
            s = fitz.open(pdf_schede); sch = fitz.open()
            sch.insert_pdf(s, from_page=FACCIATE_SCHEDA[0], to_page=FACCIATE_SCHEDA[1])
            sch.save(OUT / "3_SCHEDA_PERSONAGGIO.pdf", deflate=True, garbage=3)
            print("3_SCHEDA_PERSONAGGIO.pdf ·", sch.page_count, "pagine")
        else:
            print("3_SCHEDA_PERSONAGGIO.pdf · lasciato com'era")

        # 4 · il fascicolo unico
        tutto = fitz.open()
        for f in ("1_PROMEMORIA.pdf", "2_DOCUMENTI_DI_SCENA.pdf", "3_SCHEDA_PERSONAGGIO.pdf"):
            tutto.insert_pdf(fitz.open(OUT / f))
        tutto.set_metadata({"title": "GENKAI — cartellina di presentazione",
                            "subject": "Gioco di ruolo investigativo, Kyoto 1997"})
        tutto.save(OUT / "GENKAI_CARTELLINA_COMPLETA.pdf", deflate=True, garbage=3)
        print("\nGENKAI_CARTELLINA_COMPLETA.pdf ·", tutto.page_count, "pagine ·",
              round((OUT / "GENKAI_CARTELLINA_COMPLETA.pdf").stat().st_size/1024/1024, 1), "MB")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

if __name__ == "__main__":
    main()
