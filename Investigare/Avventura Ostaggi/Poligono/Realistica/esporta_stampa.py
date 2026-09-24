"""Render the native A3 SVG into a print PDF and a 300 dpi PNG."""
from pathlib import Path
import fitz

folder = Path(__file__).resolve().parent
svg = folder / "Mappa_Poligono_Realistica_A3.svg"
with fitz.open(svg) as source:
    pdf_bytes = source.convert_to_pdf()
with fitz.open("pdf", pdf_bytes) as document:
    page = document[0]
    assert abs(page.rect.width * 25.4 / 72 - 420) < 0.01
    assert abs(page.rect.height * 25.4 / 72 - 297) < 0.01
    document.save(folder / "Mappa_Poligono_Realistica_A3.pdf")
    page.get_pixmap(dpi=300).save(folder / "Mappa_Poligono_Realistica_A3.png")
    page.get_pixmap(dpi=100).save(folder / "Anteprima_Poligono_Realistica.png")
print("A3: 420 x 297 mm. PNG: 300 dpi. Quadretti: 25 mm.")
