# -*- coding: utf-8 -*-
"""Mappa del poligono per i giocatori, A3 orizzontale: Mappa_Poligono_A3.svg + .png.
Quadretti da 25 mm sul foglio (token 2,5 x 2,5 cm), 1 quadretto = 1,5 m.
Cambia i valori in testa e rilancia:  python crea_mappa_poligono.py
"""
import io

S = 25.0                    # lato del quadretto sul foglio, mm (token da 2,5 cm)
Q_M = 1.5                   # metri per quadretto
COLS, ROWS = 16, 10         # campo: 24 x 15 m
DIST_0, DIST_1 = 4, 8       # righello: fino a 4 quadretti malus 0 - fino a 8 +1 - oltre +2 (soglie da fissare nel regolamento)
# Sagome: (colonna, riga) - colonne 0..15 da sinistra, righe 0..9 dall'alto (riga 0 = partenza). Ordine di salita: solo nel foglio del GM.
SAGOME = [(3, 3), (13, 8), (8, 5), (1, 9), (14, 3), (9, 9), (5, 7)]
PNG_DPI = 200

W, H = 420.0, 297.0
OX, OY = 10.0, 24.0
FW, FH = COLS * S, ROWS * S
LX, LY = OX + FW, OY + FH

# ---------- primitive (mm, origine in alto a sinistra) ----------
P = []
def rect(x, y, w, h, fill=None, stroke=None, sw=0.3): P.append(("rect", x, y, w, h, fill, stroke, sw))
def line(x1, y1, x2, y2, stroke="#000000", sw=0.3): P.append(("line", x1, y1, x2, y2, stroke, sw))
def circle(cx, cy, r, fill=None, stroke=None, sw=0.3): P.append(("circle", cx, cy, r, fill, stroke, sw))
def poly(pts, fill=None, stroke=None, sw=0.3): P.append(("poly", pts, fill, stroke, sw))
def text(x, y, s, size=4, fill="#222222", bold=False, anchor="start"): P.append(("text", x, y, s, size, fill, bold, anchor))

# ---------- disegno ----------
text(OX, 10, "POLIGONO DI TIRO", 9, bold=True)
text(LX, 10, f"1 quadretto = {Q_M:g} m", 5, fill="#a02020", anchor="end")

# muri e terrapieno
rect(OX - 4, OY - 4, 4, FH + 12, fill="#444444")
rect(LX, OY - 4, 4, FH + 12, fill="#444444")
rect(OX - 4, LY, FW + 8, 8, fill="#d6c496", stroke="#444444", sw=0.5)
x = OX
while x < LX:
    line(x, LY + 8, min(x + 6, LX + 4), LY, stroke="#9a8250", sw=0.4); x += 5
text(OX + FW / 2, LY + 5.6, "TERRAPIENO DI ARRESTO", 4.5, bold=True, anchor="middle")

# campo, partenza, griglia
rect(OX, OY, FW, FH, fill="#f8f5ee")
rect(OX, OY, FW, S, fill="#dbe6f1")
for c in range(COLS + 1):
    x = OX + c * S
    line(x, OY, x, LY, stroke="#8a8a8a" if c % 4 == 0 else "#c8c4ba", sw=0.5 if c % 4 == 0 else 0.25)
for r in range(ROWS + 1):
    y = OY + r * S
    line(OX, y, LX, y, stroke="#8a8a8a" if r % 5 == 0 else "#c8c4ba", sw=0.5 if r % 5 == 0 else 0.25)
rect(OX, OY, FW, FH, stroke="#333333", sw=0.9)
text(LX - 3, OY + S / 2 + 1.5, "PARTENZA", 4.5, fill="#3a5478", bold=True, anchor="end")

# coordinate
for c in range(COLS):
    text(OX + (c + 0.5) * S, OY - 1.5, chr(65 + c), 3.6, fill="#444444", anchor="middle")
for r in range(ROWS):
    text(OX - 5.5, OY + (r + 0.5) * S + 1.2, str(r + 1), 3.6, fill="#444444", anchor="middle")

# sagome
for i, (c, r) in enumerate(SAGOME):
    cx, cy = OX + (c + 0.5) * S, OY + (r + 0.5) * S
    s = S * 0.9
    circle(cx, cy - s * 0.32, s * 0.15, fill="#222222")
    poly([(cx - s*0.30, cy - s*0.12), (cx + s*0.30, cy - s*0.12), (cx + s*0.40, cy + s*0.48), (cx - s*0.40, cy + s*0.48)], fill="#222222")
    circle(cx, cy + s * 0.14, s * 0.09, fill="#eeeeee")
    text(cx + s * 0.5, cy - 2.5, f"S{i+1}", 4.2, fill="#a02020", bold=True)

# righello delle distanze (in basso): quadretti dal tiratore alla sagoma
ry = LY + 13.5; rh = 5.5; rx = OX
n = COLS
bande = [(0, DIST_0, "#cfe6cf", "0"), (DIST_0, DIST_1, "#f3e3b4", "+1"), (DIST_1, n, "#f0c9c9", "+2")]
for a, b, col, lab in bande:
    rect(rx + a * S, ry, (b - a) * S, rh, fill=col, stroke="#555555", sw=0.3)
    text(rx + (a + b) / 2 * S, ry + rh + 4, f"{lab}", 4, bold=True, anchor="middle")
for q in range(n + 1):
    xq = rx + q * S
    line(xq, ry, xq, ry + rh, stroke="#555555", sw=0.3)
    if q > 0:
        text(xq - S / 2, ry + 3.9, str(q), 3.3, anchor="middle")
text(OX, ry - 1.5, "DISTANZA DALLA SAGOMA, in quadretti: appoggia il righello dal tiratore alla sagoma", 3.4, fill="#444444")

# ---------- SVG ----------
def svg():
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}mm" height="{H}mm" viewBox="0 0 {W} {H}">',
         f'<rect width="{W}" height="{H}" fill="#f7f4ec"/>']
    ff = 'font-family="Cambria, Times New Roman, serif"'
    for p in P:
        k = p[0]
        if k == "rect":
            _, x, y, w, h, fill, stroke, sw = p
            o.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{w:.2f}" height="{h:.2f}" fill="{fill or "none"}" stroke="{stroke or "none"}" stroke-width="{sw}"/>')
        elif k == "line":
            _, x1, y1, x2, y2, stroke, sw = p
            o.append(f'<line x1="{x1:.2f}" y1="{y1:.2f}" x2="{x2:.2f}" y2="{y2:.2f}" stroke="{stroke}" stroke-width="{sw}"/>')
        elif k == "circle":
            _, cx, cy, r, fill, stroke, sw = p
            o.append(f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r:.2f}" fill="{fill or "none"}" stroke="{stroke or "none"}" stroke-width="{sw}"/>')
        elif k == "poly":
            _, pts, fill, stroke, sw = p
            pts_s = " ".join(f"{x:.2f},{y:.2f}" for x, y in pts)
            o.append(f'<polygon points="{pts_s}" fill="{fill or "none"}" stroke="{stroke or "none"}" stroke-width="{sw}"/>')
        elif k == "text":
            _, x, y, s, size, fill, bold, anchor = p
            s = s.replace("&", "&amp;").replace("<", "&lt;")
            o.append(f'<text x="{x:.2f}" y="{y:.2f}" font-size="{size}" fill="{fill}" {ff} font-weight="{"bold" if bold else "normal"}" text-anchor="{anchor}">{s}</text>')
    o.append("</svg>")
    open("Mappa_Poligono_A3.svg", "w", encoding="utf-8").write("\n".join(o))

# ---------- PNG (passando da un PDF in memoria, che non viene salvato) ----------
def png():
    from reportlab.pdfgen import canvas
    from reportlab.lib.units import mm
    from reportlab.lib.colors import HexColor
    from reportlab.pdfbase import pdfmetrics
    from reportlab.pdfbase.ttfonts import TTFont
    import fitz
    try:
        pdfmetrics.registerFont(TTFont("Cam", "C:/Windows/Fonts/cambria.ttc", subfontIndex=0))
        pdfmetrics.registerFont(TTFont("CamB", "C:/Windows/Fonts/cambriab.ttf"))
        F, FB = "Cam", "CamB"
    except Exception:
        F, FB = "Times-Roman", "Times-Bold"
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(W * mm, H * mm))
    Y = lambda y: (H - y) * mm
    c.setFillColor(HexColor("#f7f4ec")); c.rect(0, 0, W * mm, H * mm, stroke=0, fill=1)
    for p in P:
        k = p[0]
        c.saveState()
        if k == "rect":
            _, x, y, w, h, fill, stroke, sw = p
            if fill: c.setFillColor(HexColor(fill))
            if stroke: c.setStrokeColor(HexColor(stroke)); c.setLineWidth(sw * mm)
            c.rect(x * mm, Y(y + h), w * mm, h * mm, stroke=1 if stroke else 0, fill=1 if fill else 0)
        elif k == "line":
            _, x1, y1, x2, y2, stroke, sw = p
            c.setStrokeColor(HexColor(stroke)); c.setLineWidth(sw * mm)
            c.line(x1 * mm, Y(y1), x2 * mm, Y(y2))
        elif k == "circle":
            _, cx, cy, r, fill, stroke, sw = p
            if fill: c.setFillColor(HexColor(fill))
            if stroke: c.setStrokeColor(HexColor(stroke)); c.setLineWidth(sw * mm)
            c.circle(cx * mm, Y(cy), r * mm, stroke=1 if stroke else 0, fill=1 if fill else 0)
        elif k == "poly":
            _, pts, fill, stroke, sw = p
            pth = c.beginPath(); pth.moveTo(pts[0][0] * mm, Y(pts[0][1]))
            for x, y in pts[1:]: pth.lineTo(x * mm, Y(y))
            pth.close()
            if fill: c.setFillColor(HexColor(fill))
            if stroke: c.setStrokeColor(HexColor(stroke)); c.setLineWidth(sw * mm)
            c.drawPath(pth, stroke=1 if stroke else 0, fill=1 if fill else 0)
        elif k == "text":
            _, x, y, s, size, fill, bold, anchor = p
            c.setFillColor(HexColor(fill)); c.setFont(FB if bold else F, size * mm * 0.92)
            {"start": c.drawString, "middle": c.drawCentredString, "end": c.drawRightString}[anchor](x * mm, Y(y), s)
        c.restoreState()
    c.save()
    d = fitz.open("pdf", buf.getvalue())
    d[0].get_pixmap(dpi=PNG_DPI).save("Mappa_Poligono_A3.png")

svg(); png()
print("scritti Mappa_Poligono_A3.svg / .png")
