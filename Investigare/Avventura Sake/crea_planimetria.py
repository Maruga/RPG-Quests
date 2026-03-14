"""
Genera la planimetria della Villa Tanaka — Piano Terra e Primo Piano.
Output: villa.png nella cartella handout/
"""

from PIL import Image, ImageDraw, ImageFont
import os

# --- Config ---
W, H = 2400, 3200
BG = "#f5f0e0"
WALL = "#2a2a2a"
WALL_W = 5
ROOM_FILL = "#faf6ed"
GARDEN_FILL = "#d4dcc2"
CRIME_FILL = "#fff0f0"
CRIME_BORDER = "#cc3333"
STAIR_FILL = "#e8e4d8"
HIGHLIGHT = "#c0a060"
TEXT_COLOR = "#1a1a1a"
LABEL_SMALL = "#555555"
DOOR_COLOR = "#8b6914"

# Offset
OX = 300
OY_T = 380   # piano terra
OY_P = 2050  # primo piano

U = 60  # 1 unità griglia = 60px

# --- Font ---
def load_font(names, size):
    for n in names:
        try:
            return ImageFont.truetype(n, size)
        except:
            pass
    return ImageFont.load_default()

# Font latini
font_title = load_font(["arialbd.ttf"], 52)
font_floor = load_font(["arialbd.ttf"], 40)
font_room = load_font(["arialbd.ttf"], 22)
font_small = load_font(["arial.ttf"], 16)
font_tiny = load_font(["arial.ttf"], 13)
font_footer = load_font(["arial.ttf"], 14)
font_compass = load_font(["arialbd.ttf"], 28)
font_fascicolo = load_font(["arial.ttf"], 18)
font_crime = load_font(["arialbd.ttf"], 18)

# Font giapponese
font_jp = load_font(["msgothic.ttc", "YuGothM.ttc", "MS Gothic"], 20)
font_jp_small = load_font(["msgothic.ttc", "YuGothM.ttc"], 16)

img = Image.new("RGB", (W, H), BG)
draw = ImageDraw.Draw(img)


# --- Helper ---
def rect(x, y, w, h, oy, fill=ROOM_FILL, outline=WALL, width=WALL_W):
    draw.rectangle([OX + x*U, oy + y*U, OX + (x+w)*U, oy + (y+h)*U],
                   fill=fill, outline=outline, width=width)

def text_center(x, y, w, h, oy, lines, fonts=None):
    if fonts is None:
        fonts = [font_room] * len(lines)
    cx = OX + (x + w/2) * U
    total_h = 0
    for line, f in zip(lines, fonts):
        bb = draw.textbbox((0, 0), line, font=f)
        total_h += (bb[3] - bb[1]) + 6
    cy = oy + (y + h/2) * U - total_h / 2
    for line, f in zip(lines, fonts):
        bb = draw.textbbox((0, 0), line, font=f)
        tw = bb[2] - bb[0]
        th = bb[3] - bb[1]
        draw.text((cx - tw/2, cy), line, fill=TEXT_COLOR, font=f)
        cy += th + 6

def door_h(x, y, oy, length=1.2):
    px, py = OX + x*U, oy + y*U
    lp = length * U / 2
    draw.line([(px - lp, py), (px + lp, py)], fill=ROOM_FILL, width=WALL_W + 4)
    draw.line([(px - lp, py - 5), (px - lp, py + 5)], fill=DOOR_COLOR, width=3)
    draw.line([(px + lp, py - 5), (px + lp, py + 5)], fill=DOOR_COLOR, width=3)

def door_v(x, y, oy, length=1.2):
    px, py = OX + x*U, oy + y*U
    lp = length * U / 2
    draw.line([(px, py - lp), (px, py + lp)], fill=ROOM_FILL, width=WALL_W + 4)
    draw.line([(px - 5, py - lp), (px + 5, py - lp)], fill=DOOR_COLOR, width=3)
    draw.line([(px - 5, py + lp), (px + 5, py + lp)], fill=DOOR_COLOR, width=3)

def stairs(x, y, w, h, oy, direction="up"):
    rect(x, y, w, h, oy, fill=STAIR_FILL)
    n = 9
    for i in range(1, n):
        sy = oy + (y + i * h / n) * U
        draw.line([(OX + x*U + 8, sy), (OX + (x+w)*U - 8, sy)], fill="#999", width=1)
    ax = OX + (x + w/2) * U
    if direction == "up":
        ay1 = oy + (y + h - 0.4) * U
        ay2 = oy + (y + 0.4) * U
    else:
        ay1 = oy + (y + 0.4) * U
        ay2 = oy + (y + h - 0.4) * U
    draw.line([(ax, ay1), (ax, ay2)], fill="#555", width=2)
    draw.polygon([(ax, ay2), (ax - 7, ay2 + (12 if direction == "up" else -12)),
                  (ax + 7, ay2 + (12 if direction == "up" else -12))], fill="#555")

def compass(cx, cy, r=45):
    draw.ellipse([cx-r, cy-r, cx+r, cy+r], outline=WALL, width=2)
    # Freccia nord
    draw.line([(cx, cy), (cx, cy - r + 5)], fill=WALL, width=3)
    draw.polygon([(cx, cy - r + 2), (cx - 8, cy - r + 18), (cx + 8, cy - r + 18)], fill=WALL)
    bb = draw.textbbox((0, 0), "N", font=font_compass)
    nw = bb[2] - bb[0]
    draw.text((cx - nw/2, cy - r - 32), "N", fill=WALL, font=font_compass)
    # Linee S/E/W
    for dx, dy in [(0, r-5), (r-5, 0), (-(r-5), 0)]:
        draw.line([(cx, cy), (cx+dx, cy+dy)], fill="#aaa", width=1)


# ============================================
# TITOLO
# ============================================
title = "PLANIMETRIA — VILLA TANAKA"
bb = draw.textbbox((0, 0), title, font=font_title)
draw.text((W/2 - (bb[2]-bb[0])/2, 40), title, fill=TEXT_COLOR, font=font_title)
draw.line([(OX, 105), (W - OX, 105)], fill=HIGHLIGHT, width=3)
draw.text((OX, 115), "Fascicolo 97-KPD-1114 — Allegato A", fill=LABEL_SMALL, font=font_fascicolo)
draw.text((OX, 140), "Rilevamento del 14 novembre 1997 — Via Higashiyama-ku, Kyoto", fill=LABEL_SMALL, font=font_fascicolo)
compass(W - OX - 60, 80)


# ============================================
# PIANO TERRA
# ============================================
draw.text((OX, OY_T - 60), "PIANO TERRA", fill=TEXT_COLOR, font=font_floor)
draw.line([(OX, OY_T - 20), (OX + 300, OY_T - 20)], fill=HIGHLIGHT, width=2)

# Layout:
#  0          5       10    13.5      20
#  +----------+--------+-----+--------+  0
#  |          GIARDINO / NIWA         |  3
#  +----------+--------------+--------+
#  |          |               |       |  3
#  | CUCINA   |  SALA PRINC.  | STUDIO|
#  |          |  OHIROMA      |       |
#  |          |               |       |  8.5
#  +----------+---+-----------+-------+
#             |COR|RIDOIO SERVIZIO    |  8.5
#             |   |          +--------+ 11
#             |   |          | BAGNO  |
#             |ING|RESSO     | OSPITI | 11
#             |   |GENKAN    |        |
#             |   +--+-------+--------+ 14.5
#             |   |SC|
#             +---+--+                  17

# Giardino
rect(0, 0, 20, 3, OY_T, fill=GARDEN_FILL)
text_center(0, 0, 20, 3, OY_T,
    ["GIARDINO / NIWA", "庭"],
    [font_room, font_jp])
for tx, ty in [(2.5, 1.0), (5, 2.2), (9, 0.8), (14, 1.8), (17.5, 1.0)]:
    cx_t, cy_t = OX + tx*U, OY_T + ty*U
    draw.ellipse([cx_t-14, cy_t-14, cx_t+14, cy_t+14], fill="#b5c9a0", outline="#7a9960", width=2)

# Sala Principale (grande, centro)
rect(0, 3, 14, 8, OY_T)
text_center(0, 3, 14, 4.5, OY_T,
    ["SALA PRINCIPALE", "ŌHIROMA / 大広間"],
    [font_room, font_jp])
# Tavolo
tx1, ty1 = OX + 3.5*U, OY_T + 7*U
tx2, ty2 = OX + 10.5*U, OY_T + 9.5*U
draw.rectangle([tx1, ty1, tx2, ty2], fill="#e8dcc8", outline="#b0a080", width=2)
# Sedie stilizzate
for sx in [4, 5.5, 7, 8.5, 10]:
    for side_y, size in [(6.6, 6), (9.8, 6)]:
        scx, scy = OX + sx*U, OY_T + side_y*U
        draw.ellipse([scx-size, scy-size, scx+size, scy+size], fill="#d4cbb8", outline="#b0a080", width=1)
# Incensiere
ix, iy = OX + 1.5*U, OY_T + 4*U
draw.ellipse([ix-8, iy-8, ix+8, iy+8], fill="#c9b896", outline="#8a7a5a", width=2)
draw.text((ix + 14, iy - 8), "incenso", fill="#888", font=font_tiny)

# Studio
rect(14, 3, 6, 5.5, OY_T)
text_center(14, 3, 6, 5.5, OY_T,
    ["STUDIO", "SHOSAI", "書斎"],
    [font_room, font_small, font_jp])

# Cucina
rect(0, 11, 5, 6, OY_T)
text_center(0, 11, 5, 6, OY_T,
    ["CUCINA", "DAIDOKORO", "台所"],
    [font_room, font_small, font_jp])

# Corridoio di servizio (dall'area sala al bagno)
rect(5, 11, 9, 3, OY_T, fill="#f0ece0")
text_center(5, 11, 9, 3, OY_T,
    ["CORRIDOIO DI SERVIZIO"],
    [font_small])

# Bagno ospiti — SCENA DEL CRIMINE
rect(14, 8.5, 6, 8.5, OY_T, fill=CRIME_FILL, outline=CRIME_BORDER, width=6)
text_center(14, 8.5, 6, 5, OY_T,
    ["BAGNO OSPITI", "OTEARAI", "お手洗い"],
    [font_room, font_small, font_jp])
# Etichetta scena del crimine
scx = OX + 14*U + 12
scy = OY_T + 15*U
draw.rectangle([scx, scy, scx + 310, scy + 32], fill=CRIME_BORDER)
draw.text((scx + 8, scy + 5), "⚠  SCENA DEL CRIMINE", fill="white", font=font_crime)

# Ingresso / Genkan
rect(5, 14, 6, 3, OY_T)
text_center(5, 14, 6, 3, OY_T,
    ["INGRESSO / GENKAN", "玄関", "Guardaroba"],
    [font_room, font_jp, font_small])

# Scale piano terra — posizione: x=11, y=14
stairs(11, 14, 3, 3, OY_T, "up")
text_center(11, 16.5, 3, 1, OY_T, ["SCALE ↑"], [font_tiny])

# --- Porte piano terra ---
door_h(7, 3, OY_T, 2.5)      # Giardino → Sala
door_v(14, 5.5, OY_T, 1.3)   # Sala → Studio
door_h(10, 11, OY_T, 1.5)    # Sala → Corridoio
door_v(5, 12.5, OY_T, 1.3)   # Corridoio → Cucina
door_v(14, 12, OY_T, 1.3)    # Corridoio → Bagno ospiti
door_h(8, 14, OY_T, 1.5)     # Corridoio → Ingresso
door_h(8, 17, OY_T, 2)       # Ingresso → esterno

# Freccia entrata
arr_x = OX + 8*U
arr_y1 = OY_T + 17.6*U
arr_y2 = OY_T + 18.6*U
draw.line([(arr_x, arr_y2), (arr_x, arr_y1)], fill=WALL, width=2)
draw.polygon([(arr_x, arr_y1 - 2), (arr_x - 8, arr_y1 + 10), (arr_x + 8, arr_y1 + 10)], fill=WALL)
draw.text((arr_x - 35, arr_y2 + 8), "ENTRATA", fill=TEXT_COLOR, font=font_small)

# Muro esterno (ridisegna sopra le porte per ordine)
draw.rectangle([OX, OY_T, OX + 20*U, OY_T + 17*U], outline=WALL, width=6)

# Ridisegna porte esterne (dopo muro esterno)
door_h(7, 3, OY_T, 2.5)   # Giardino → Sala
door_h(8, 17, OY_T, 2)     # Ingresso → esterno


# ============================================
# PRIMO PIANO
# ============================================
draw.text((OX, OY_P - 60), "PRIMO PIANO", fill=TEXT_COLOR, font=font_floor)
draw.line([(OX, OY_P - 20), (OX + 320, OY_P - 20)], fill=HIGHLIGHT, width=2)

# Il primo piano è più piccolo — solo sopra la parte abitata
# Impronta: 20 unità largo x 10 alto
# Scale nella STESSA posizione X del piano terra (x=11)

# Camera Padronale
rect(0, 0, 11, 7, OY_P)
text_center(0, 0, 11, 7, OY_P,
    ["CAMERA PADRONALE", "寝室"],
    [font_room, font_jp])

# Bagno Padronale
rect(11, 0, 5, 4, OY_P)
text_center(11, 0, 5, 4, OY_P,
    ["BAGNO", "PADRONALE", "ofuro in hinoki"],
    [font_room, font_small, font_small])

# Camera Ospiti
rect(16, 0, 4, 7, OY_P)
text_center(16, 0, 4, 7, OY_P,
    ["CAMERA", "OSPITI", "客室"],
    [font_room, font_small, font_jp])

# Corridoio primo piano
rect(11, 4, 5, 3, OY_P, fill="#f0ece0")
text_center(11, 4, 5, 3, OY_P,
    ["CORRIDOIO"],
    [font_small])

# Scale primo piano — STESSA POSIZIONE X del terra (x=11)
stairs(11, 7, 3, 3, OY_P, "down")
text_center(11, 9.5, 3, 1, OY_P, ["SCALE ↓"], [font_tiny])

# Porte primo piano
door_v(11, 5.5, OY_P, 1.3)   # Camera padronale → corridoio
door_h(13.5, 4, OY_P, 1.3)   # Bagno padronale → corridoio
door_v(16, 5.5, OY_P, 1.3)   # Camera ospiti → corridoio

# Muro esterno primo piano
draw.rectangle([OX, OY_P, OX + 20*U, OY_P + 10*U], outline=WALL, width=6)

# Muri interni primo piano (ridisegna sopra porte per finitura)
draw.line([(OX + 11*U, OY_P), (OX + 11*U, OY_P + 4*U)], fill=WALL, width=WALL_W)
draw.line([(OX + 16*U, OY_P), (OX + 16*U, OY_P + 7*U)], fill=WALL, width=WALL_W)
draw.line([(OX + 11*U, OY_P + 4*U), (OX + 16*U, OY_P + 4*U)], fill=WALL, width=WALL_W)
draw.line([(OX + 11*U, OY_P + 7*U), (OX + 16*U, OY_P + 7*U)], fill=WALL, width=WALL_W)

# Ridisegna porte (sopra muri)
door_v(11, 5.5, OY_P, 1.3)
door_h(13.5, 4, OY_P, 1.3)
door_v(16, 5.5, OY_P, 1.3)


# ============================================
# LEGENDA
# ============================================
leg_y = OY_P + 11*U + 20
draw.text((OX, leg_y), "LEGENDA", fill=TEXT_COLOR, font=font_room)
ly = leg_y + 35
# Scena del crimine
draw.rectangle([OX, ly, OX + 22, ly + 22], fill=CRIME_FILL, outline=CRIME_BORDER, width=3)
draw.text((OX + 32, ly), "Scena del crimine", fill=TEXT_COLOR, font=font_small)
# Scale
draw.rectangle([OX + 250, ly, OX + 272, ly + 22], fill=STAIR_FILL, outline=WALL, width=2)
draw.text((OX + 282, ly), "Scale", fill=TEXT_COLOR, font=font_small)
# Giardino
draw.rectangle([OX + 420, ly, OX + 442, ly + 22], fill=GARDEN_FILL, outline=WALL, width=2)
draw.text((OX + 452, ly), "Esterno", fill=TEXT_COLOR, font=font_small)
# Porta
draw.line([(OX + 620, ly + 11), (OX + 655, ly + 11)], fill=DOOR_COLOR, width=3)
draw.text((OX + 665, ly), "Porta", fill=TEXT_COLOR, font=font_small)


# ============================================
# FOOTER
# ============================================
fy = H - 60
draw.line([(OX, fy), (W - OX, fy)], fill="#ccc", width=1)
draw.text((OX, fy + 10),
    "Allegato A — Rilievo planimetrico Villa Tanaka — Fascicolo 97-KPD-1114 — Riservato",
    fill=LABEL_SMALL, font=font_footer)
draw.text((W - OX - 350, fy + 10),
    "Kyoto Prefectural Police — Kanshiki-ka", fill=LABEL_SMALL, font=font_footer)


# ============================================
# SALVA
# ============================================
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "handout", "villa.png")
img.save(out, "PNG", dpi=(300, 300))
print(f"Salvata: {out} ({W}x{H})")
