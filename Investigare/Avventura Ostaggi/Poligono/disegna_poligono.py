# -*- coding: utf-8 -*-
"""Disegna la mappa schematica del poligono (A3 orizzontale, 150 dpi).
Tutti i valori qui sotto sono PROVVISORI: cambiali e rilancia lo script.
Uso:  python disegna_poligono.py
"""
from PIL import Image, ImageDraw, ImageFont
import math

DPI = 150
W, H = int(42.0 / 2.54 * DPI), int(29.7 / 2.54 * DPI)      # A3 orizzontale
Q_CM = 1.5                                                  # lato del quadretto sul foglio (PROVVISORIO)
Q = Q_CM / 2.54 * DPI                                       # lato in pixel
COLS, ROWS = 24, 14                                         # quadretti del campo (PROVVISORIO)

# Sagome: (colonna, riga, momento in cui si alza) — colonne 0..COLS-1 da sinistra, righe 0..ROWS-1 dall'alto.
# Riga 0 = linea di partenza dei PG.  PROVVISORIO: ordine e posizioni da decidere.
SAGOME = [
    (4, 4, 7),
    (19, 11, 14),
    (11, 8, 21),
    (3, 12, 28),
    (20, 4, 35),
    (12, 13, 42),
    (8, 10, 49),
]
PG_START_COLS = [1, 4, 7, 10, 13]                          # posizioni di partenza dei 5 PG

# --- colori ---
CARTA = (247, 244, 236)
GRIGLIA = (200, 196, 186)
GRIGLIA_5 = (160, 156, 146)
MURO = (70, 70, 70)
TERRA = (210, 190, 150)
PARTENZA = (215, 228, 240)
SAGOMA = (40, 40, 40)
CENTRO = (235, 235, 235)
TESTO = (30, 30, 30)
ROSSO = (170, 40, 40)

def font(size, bold=False):
    try:
        return ImageFont.truetype("C:/Windows/Fonts/cambriab.ttf" if bold else "C:/Windows/Fonts/cambria.ttc", size)
    except Exception:
        return ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf", size)

img = Image.new("RGB", (W, H), CARTA)
d = ImageDraw.Draw(img)

# --- posizione del campo ---
field_w, field_h = COLS * Q, ROWS * Q
ox = (W - field_w) / 2
oy = 200
lx, ly = ox + field_w, oy + field_h

# titolo
d.text((ox, 40), "POLIGONO DI TIRO — GARA TRA DISTRETTI", font=font(64, True), fill=TESTO)
d.text((ox, 120), "Schema provvisorio · 1 quadretto = ? m (da definire) · A3", font=font(36), fill=ROSSO)

# muri laterali e terrapieno di arresto in fondo
d.rectangle([ox - 22, oy - 22, ox, ly + 80], fill=MURO)
d.rectangle([lx, oy - 22, lx + 22, ly + 80], fill=MURO)
d.rectangle([ox - 22, ly, lx + 22, ly + 80], fill=TERRA, outline=MURO, width=4)
for x in range(int(ox), int(lx), 28):                     # tratteggio del terrapieno
    d.line([x, ly + 80, x + 40, ly], fill=(150, 130, 90), width=3)
d.text((ox + field_w / 2, ly + 40), "TERRAPIENO DI ARRESTO", font=font(34, True), fill=TESTO, anchor="mm")

# linea di partenza (riga 0)
d.rectangle([ox, oy, lx, oy + Q], fill=PARTENZA)

# griglia
for c in range(COLS + 1):
    x = ox + c * Q
    d.line([x, oy, x, ly], fill=GRIGLIA_5 if c % 5 == 0 else GRIGLIA, width=3 if c % 5 == 0 else 1)
for r in range(ROWS + 1):
    y = oy + r * Q
    d.line([ox, y, lx, y], fill=GRIGLIA_5 if r % 5 == 0 else GRIGLIA, width=3 if r % 5 == 0 else 1)
d.rectangle([ox, oy, lx, ly], outline=MURO, width=5)

# coordinate: lettere sopra, numeri a sinistra
fc = font(26)
for c in range(COLS):
    d.text((ox + (c + 0.5) * Q, oy - 34), chr(65 + c), font=fc, fill=TESTO, anchor="mm")
for r in range(ROWS):
    d.text((ox - 48, oy + (r + 0.5) * Q), str(r + 1), font=fc, fill=TESTO, anchor="mm")

# scritta della linea di partenza
d.text((lx - 20, oy + Q / 2), "LINEA DI PARTENZA — pistole in fondina", font=font(30, True), fill=(60, 80, 110), anchor="rm")

# PG
for i, c in enumerate(PG_START_COLS):
    cx, cy = ox + (c + 0.5) * Q, oy + 0.5 * Q
    r = Q * 0.36
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(60, 90, 140), outline=MURO, width=3)
    d.text((cx, cy), f"PG{i + 1}", font=font(24, True), fill="white", anchor="mm")

def sagoma(cx, cy, n, momento):
    """Sagoma stilizzata (testa + busto) centrata sul quadretto."""
    s = Q * 0.9
    testa_r = s * 0.16
    d.ellipse([cx - testa_r, cy - s * 0.46, cx + testa_r, cy - s * 0.46 + 2 * testa_r], fill=SAGOMA)
    busto = [(cx - s * 0.30, cy - s * 0.12), (cx + s * 0.30, cy - s * 0.12),
             (cx + s * 0.40, cy + s * 0.50), (cx - s * 0.40, cy + s * 0.50)]
    d.polygon(busto, fill=SAGOMA)
    cr = s * 0.10
    d.ellipse([cx - cr, cy + s * 0.14 - cr, cx + cr, cy + s * 0.14 + cr], fill=CENTRO)
    # etichetta
    lab = f"S{n}  sale al {momento}"
    f = font(26, True)
    tw = d.textlength(lab, font=f)
    bx, by = cx + s * 0.55, cy - 18
    d.rectangle([bx - 6, by - 4, bx + tw + 6, by + 30], fill="white", outline=ROSSO, width=2)
    d.text((bx, by), lab, font=f, fill=ROSSO)

for n, (c, r, m) in enumerate(SAGOME, start=1):
    sagoma(ox + (c + 0.5) * Q, oy + (r + 0.5) * Q, n, m)

# legenda in basso
ly2 = ly + 100
f = font(28)
righe = [
    "SAGOME: si alzano ogni 7 momenti (7, 14, 21 … 49) sul contatore dell'iniziativa. Posizioni e ordine PROVVISORI.",
    "DISTANZA (in quadretti dal PG che spara): 0 a distanza di tiro · +1 più lontano · +2 ancora più lontano — soglie da definire.",
    "ANDATURA: lento 1–2 quadretti nessun malus · camminare +1 · correre +3 (quadretti per azione da definire).",
    "PISTOLE: in fondina al via — Estrarre 4, poi Colpire 2, Ricarica 5. Contare i colpi sparati.",
]
for i, t in enumerate(righe):
    d.text((ox, ly2 + i * 38), t, font=f, fill=TESTO)

img.save("Mappa_Poligono_A3.png", dpi=(DPI, DPI))
print("scritto Mappa_Poligono_A3.png", img.size)
