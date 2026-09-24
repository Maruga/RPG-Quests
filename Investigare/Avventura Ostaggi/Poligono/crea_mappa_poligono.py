# -*- coding: utf-8 -*-
"""Mappa del poligono per i giocatori, A3 orizzontale: Mappa_Poligono_A3.svg + .png.
Quadretti da 25 mm sul foglio (token 2,5 x 2,5 cm), 1 quadretto = 1,5 m.
Cambia i valori in testa e rilancia:  python crea_mappa_poligono.py
"""

S = 25.0                    # lato del quadretto sul foglio, mm (token da 2,5 cm)
Q_M = 1.5                   # metri per quadretto
COLS, ROWS = 16, 11         # campo: 24 x 16,5 m
DIST_0 = 3                  # cerchio della distanza NORMALE (malus 0 al colpire), in quadretti; oltre si è lontani
MOMENTI = 7 * 7 + 15        # scala del tempo: 7 sagome ogni 7 momenti + 15 di sicurezza
# Sagome: (colonna, riga) - colonne 0..15 da sinistra, righe 0..10 dall'alto (riga 0 = partenza). Ordine di salita: solo nel foglio del GM.
SAGOME = [(3, 3), (13, 9), (8, 5), (1, 10), (14, 3), (9, 10), (5, 7)]
TINTE = ["#c0392b", "#2471a3", "#1e8449", "#d68910", "#7d3c98", "#148f77", "#b03a7a"]
PNG_DPI = 200

W, H = 420.0, 297.0
OX, OY = 10.0, 7.0
FW, FH = COLS * S, ROWS * S
LX, LY = OX + FW, OY + FH

# ---------- primitive (mm, origine in alto a sinistra) ----------
P = []
def rect(x, y, w, h, fill=None, stroke=None, sw=0.3, alpha=1.0): P.append(("rect", x, y, w, h, fill, stroke, sw, alpha))
def line(x1, y1, x2, y2, stroke="#000000", sw=0.3, dash=None): P.append(("line", x1, y1, x2, y2, stroke, sw, dash))
def circle(cx, cy, r, fill=None, stroke=None, sw=0.3, alpha=1.0, clip=False): P.append(("circle", cx, cy, r, fill, stroke, sw, alpha, clip))
def poly(pts, fill=None, stroke=None, sw=0.3): P.append(("poly", pts, fill, stroke, sw))
def text(x, y, s, size=4, fill="#222222", bold=False, anchor="start"): P.append(("text", x, y, s, size, fill, bold, anchor))

# ---------- disegno ----------
rect(OX, OY, FW, FH, fill="#f8f5ee")
rect(OX, OY, FW, S, fill="#dbe6f1")

# distanza normale (malus 0): quadretti colorati con una tinta chiara della sagoma; un quadretto in piu' zone
# viene diviso in fasce, una per colore (niente mescolanze)
def zona(c0, r0):
    return {(c, r) for c in range(COLS) for r in range(ROWS)
            if ((c - c0) ** 2 + (r - r0) ** 2) ** 0.5 <= DIST_0 + 1e-9}
def chiaro(hexcol, k=0.24):
    R, G, B = int(hexcol[1:3], 16), int(hexcol[3:5], 16), int(hexcol[5:7], 16)
    m = lambda v: int(round(v * k + 248 * (1 - k)))
    return "#%02x%02x%02x" % (m(R), m(G), m(B))
ZONE = [zona(c0, r0) for (c0, r0) in SAGOME]
for c in range(COLS):
    for r in range(ROWS):
        tinte = [chiaro(TINTE[i]) for i, z in enumerate(ZONE) if (c, r) in z]
        if not tinte: continue
        x, y = OX + c * S, OY + r * S
        if len(tinte) == 1:
            rect(x, y, S, S, fill=tinte[0])
        elif len(tinte) == 2:
            poly([(x, y), (x + S, y), (x, y + S)], fill=tinte[0])
            poly([(x + S, y), (x + S, y + S), (x, y + S)], fill=tinte[1])
        else:
            w = S / len(tinte)
            for k, t in enumerate(tinte):
                rect(x + k * w, y, w, S, fill=t)
# maschera: tutto ciò che sborda dal campo torna sfondo
rect(0, 0, W, OY, fill="#f7f4ec"); rect(0, LY, W, H - LY, fill="#f7f4ec")
rect(0, 0, OX, H, fill="#f7f4ec"); rect(LX, 0, W - LX, H, fill="#f7f4ec")
rect(OX - 4, OY - 3, 4, FH + 6, fill="#444444")
rect(LX, OY - 3, 4, FH + 6, fill="#444444")

for c in range(COLS + 1):
    x = OX + c * S
    line(x, OY, x, LY, stroke="#7a7a7a" if c % 4 == 0 else "#b0aca2", sw=0.5 if c % 4 == 0 else 0.28)
for r in range(ROWS + 1):
    y = OY + r * S
    line(OX, y, LX, y, stroke="#7a7a7a" if r % 5 == 0 else "#b0aca2", sw=0.5 if r % 5 == 0 else 0.28)
rect(OX, OY, FW, FH, stroke="#333333", sw=0.9)
# confini tratteggiati delle zone, sopra la griglia (tratti disegnati uno a uno: il rasterizzatore ignora il tratteggio SVG)
def tratteggio(x1, y1, x2, y2, t, tratto=2.5, vuoto=1.7):
    L = ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5; ux, uy = (x2 - x1) / L, (y2 - y1) / L; d = 0.0
    while d < L:
        e = min(d + tratto, L)
        line(x1 + ux * d, y1 + uy * d, x1 + ux * e, y1 + uy * e, stroke=t, sw=0.7)
        d += tratto + vuoto
for i, (c0, r0) in enumerate(SAGOME):
    t = TINTE[i]; z = ZONE[i]
    for (c, r) in z:
        x, y = OX + c * S, OY + r * S
        if (c, r - 1) not in z: tratteggio(x, y, x + S, y, t)
        if (c, r + 1) not in z: tratteggio(x, y + S, x + S, y + S, t)
        if (c - 1, r) not in z: tratteggio(x, y, x, y + S, t)
        if (c + 1, r) not in z: tratteggio(x + S, y, x + S, y + S, t)

text(LX - 3, OY + S / 2 + 1.5, "PARTENZA", 4.5, fill="#3a5478", bold=True, anchor="end")

for c in range(COLS):
    text(OX + (c + 0.5) * S, OY - 1.3, chr(65 + c), 3.4, fill="#444444", anchor="middle")
for r in range(ROWS):
    text(OX - 5.5, OY + (r + 0.5) * S + 1.2, str(r + 1), 3.4, fill="#444444", anchor="middle")

# sagome: forma da poligono, un colore ciascuna; a fianco i quadratini dei colpi e la casella dello scarto
def sagoma(cx, cy, t, n):
    s = S * 0.92
    text(cx - 0.46 * s, cy - 0.30 * s, str(n), 6.5, fill=t, bold=True)
    pts = [(-0.12, -0.50), (0.12, -0.50), (0.14, -0.27), (0.36, -0.21), (0.44, -0.02), (0.44, 0.48),
           (-0.44, 0.48), (-0.44, -0.02), (-0.36, -0.21), (-0.14, -0.27)]
    poly([(cx + a * s, cy + b * s) for a, b in pts], fill=t, stroke="#222222", sw=0.35)
    # zona centrale (bianca) e testa
    poly([(cx - 0.20*s, cy - 0.06*s), (cx + 0.20*s, cy - 0.06*s), (cx + 0.20*s, cy + 0.34*s), (cx - 0.20*s, cy + 0.34*s)], fill="#f8f5ee", stroke="#222222", sw=0.25)
    circle(cx, cy + 0.14 * s, 0.045 * s, fill="#222222")
    # colpi (3 quadratini) e scarto, a destra
    bx = cx + 0.52 * s; by = cy - 0.44 * s; q = 3.6
    for k in range(3):
        rect(bx + k * (q + 1.0), by, q, q, fill="#ffffff", stroke=t, sw=0.4)
    text(bx, by + q + 3.3, "colpi", 2.9, fill=t)
    rect(bx, by + q + 4.4, 3 * q + 2.0, 6.5, fill="#ffffff", stroke=t, sw=0.4)
    text(bx, by + q + 4.4 + 6.5 + 3.0, "scarto", 2.9, fill=t)

ordine = sorted(range(len(SAGOME)), key=lambda i: (SAGOME[i][1], SAGOME[i][0]))   # numerazione dall'alto
NUMERO = {i: k + 1 for k, i in enumerate(ordine)}
for i, (c, r) in enumerate(SAGOME):
    sagoma(OX + (c + 0.5) * S, OY + (r + 0.5) * S, TINTE[i], NUMERO[i])

# scala del tempo, in basso
ty = LY + 4.0; th = 6.0; cw = FW / MOMENTI
for m in range(1, MOMENTI + 1):
    x = OX + (m - 1) * cw
    sette = (m % 7 == 0 and m <= 49)
    rect(x, ty, cw, th, fill="#e9d9a8" if sette else "#ffffff", stroke="#666666", sw=0.25)
    text(x + cw / 2, ty + th - 1.6, str(m), 2.9 if m < 10 else 2.6, fill="#222222", bold=sette, anchor="middle")
text(OX, ty + th + 3.4, "MOMENTI", 3.0, fill="#444444", bold=True)

# ---------- SVG ----------
def svg():
    o = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}mm" height="{H}mm" viewBox="0 0 {W} {H}">',
         f'<defs><clipPath id="campo"><rect x="{OX}" y="{OY}" width="{FW}" height="{FH}"/></clipPath></defs>',
         f'<rect width="{W}" height="{H}" fill="#f7f4ec"/>']
    ff = 'font-family="Cambria, Times New Roman, serif"'
    for p in P:
        k = p[0]
        if k == "rect":
            _, x, y, w, h, fill, stroke, sw, alpha = p
            o.append(f'<rect x="{x:.2f}" y="{y:.2f}" width="{w:.2f}" height="{h:.2f}" fill="{fill or "none"}" stroke="{stroke or "none"}" stroke-width="{sw}" fill-opacity="{alpha}"/>')
        elif k == "line":
            _, x1, y1, x2, y2, stroke, sw, dash = p
            d = f' stroke-dasharray="{dash[0]} {dash[1]}"' if dash else ""
            o.append(f'<line x1="{x1:.2f}" y1="{y1:.2f}" x2="{x2:.2f}" y2="{y2:.2f}" stroke="{stroke}" stroke-width="{sw}"{d}/>')
        elif k == "circle":
            _, cx, cy, r, fill, stroke, sw, alpha, clip = p
            cl = ' clip-path="url(#campo)"' if clip else ""
            o.append(f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r:.2f}" fill="{fill or "none"}" stroke="{stroke or "none"}" stroke-width="{sw}" fill-opacity="{alpha}" stroke-opacity="{min(1, alpha*4)}"{cl}/>')
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

# ---------- PNG: rasterizza l'SVG ----------
def png():
    import fitz
    d = fitz.open("Mappa_Poligono_A3.svg")
    d[0].get_pixmap(dpi=PNG_DPI).save("Mappa_Poligono_A3.png")

svg(); png()
print("scritti Mappa_Poligono_A3.svg / .png")
