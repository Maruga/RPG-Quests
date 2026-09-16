"""Impagina la mappa, senza modificarne i pixel, su un solo A3 orizzontale."""
from pathlib import Path
import fitz

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / 'Immagini/Planimetria con esterno.png'
OUTPUT = ROOT / 'Immagini/Planimetria combattimento A3.pdf'
MM = 72 / 25.4


def genera(source=SOURCE, output=OUTPUT):
    doc = fitz.open()
    page = doc.new_page(width=420 * MM, height=297 * MM)
    # 5 mm di margine stampabile; proporzioni mantenute, nessun ritaglio.
    area = fitz.Rect(5 * MM, 5 * MM, 415 * MM, 292 * MM)
    page.insert_image(area, filename=str(source), keep_proportion=True)
    doc.set_metadata({'title': 'Bakuon — Planimetria del combattimento — A3',
                      'subject': 'Mappa interna ed esterna del capannone; A3 orizzontale 420 × 297 mm',
                      'creator': 'GENKAI — Impaginazione A3'})
    doc.save(output, deflate=True)
    doc.close()
    with fitz.open(output) as check:
        assert len(check) == 1
        p = check[0]
        assert abs(p.rect.width / MM - 420) < .01
        assert abs(p.rect.height / MM - 297) < .01
        images = p.get_image_info()
        # La serializzazione PDF arrotonda le coordinate di pochi milionesimi di punto.
        tolleranza = fitz.Rect(area.x0 - .01, area.y0 - .01, area.x1 + .01, area.y1 + .01)
        assert len(images) == 1 and tolleranza.contains(fitz.Rect(images[0]['bbox']))
    return output


if __name__ == '__main__':
    print(genera())
