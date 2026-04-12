"""
Applica il nuovo stile burocratico giapponese a tutti i 21 handout.
- Type A (Police/Science): sfondo bianco, Courier, bordi sottili, dark screen mode
- Type B (Letter/Diary): serif, carta, dark screen mode
- Type C (Newspapers): serif, newspaper layout, dark screen mode
- Type D (Insurance): sans-serif corporate, dark screen mode
"""
import re, os

DIR = os.path.dirname(os.path.abspath(__file__))

# ── CSS BASE per Type A (rapporti polizia/scientifici) ──
CSS_TYPE_A = """
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
@page { size: A4; margin: 5mm; }
body {
    font-family: "Courier New", Courier, monospace;
    font-size: 13px;
    line-height: 1.65;
    color: #111;
    background: #fff;
    display: flex;
    justify-content: center;
    padding: 4px;
}
.document {
    width: 210mm;
    min-height: 297mm;
    background: #fff;
    padding: 8mm;
    position: relative;
}
.doc-header {
    border: 2px solid #111;
    border-bottom: 3px double #111;
    padding: 12px 20px;
    text-align: center;
    margin-bottom: 16px;
}
.doc-header .org { font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #333; }
.doc-header .title { font-size: 18px; font-weight: bold; margin-top: 4px; letter-spacing: 2px; color: #000; }
.doc-header .subtitle { font-size: 11px; margin-top: 3px; color: #444; }
.metadata {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid #333;
    margin-bottom: 16px;
    font-size: 13px;
}
.metadata div { padding: 4px 10px; border-bottom: 1px solid #999; color: #111; }
.metadata div:nth-child(odd) { border-right: 1px solid #999; }
.metadata .label { font-weight: bold; color: #333; text-transform: uppercase; font-size: 10px; letter-spacing: 1px; }
.section { margin-bottom: 14px; }
.section-title {
    font-size: 13px; font-weight: bold; text-transform: uppercase;
    letter-spacing: 2px; border-bottom: 1px solid #333;
    padding-bottom: 2px; margin-bottom: 6px; color: #000;
}
.section p { margin-bottom: 6px; text-align: justify; color: #111; }
.section ul { margin-left: 16px; list-style: none; }
.section ul li { margin-bottom: 4px; color: #111; }
.section ul li::before { content: "\\2014\\00a0"; color: #666; }
.highlight-box { border-left: 3px solid #333; padding: 8px 12px; margin: 10px 0; font-size: 13px; color: #111; }
.critical-box { border: 1px solid #8b0000; border-left: 4px solid #8b0000; padding: 8px 12px; margin: 10px 0; font-size: 13px; color: #111; }
.signature-section { margin-top: 24px; display: flex; justify-content: space-between; font-size: 12px; color: #111; }
.signature-block { text-align: center; width: 40%; }
.signature-line { border-top: 1px solid #333; margin-top: 28px; padding-top: 4px; }
.timbro {
    position: absolute; bottom: 50px; right: 30px;
    width: 70px; height: 70px;
    border: 3px solid rgba(180, 30, 30, 0.4); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    transform: rotate(-15deg);
    color: rgba(180, 30, 30, 0.4);
    font-size: 9px; font-weight: bold; text-align: center;
    text-transform: uppercase; letter-spacing: 1px; line-height: 1.2;
}
.footer { margin-top: 16px; font-size: 10px; color: #666; text-align: center; border-top: 1px solid #ccc; padding-top: 4px; }
.classificazione {
    position: absolute; top: 8mm; right: 8mm;
    font-size: 11px; font-weight: bold; color: #8b0000;
    border: 2px solid #8b0000; padding: 2px 8px; letter-spacing: 2px;
}
@media screen {
    body { background: #0a0a0c; }
    .document { background: #151518; color: #d8d4c8; box-shadow: 0 4px 20px rgba(0,0,0,0.7); }
    .doc-header { border-color: #555; }
    .doc-header .org { color: #999; }
    .doc-header .title { color: #e8e4d8; }
    .doc-header .subtitle { color: #888; }
    .metadata { border-color: #444; }
    .metadata div { border-color: #333; color: #d0ccbe; }
    .metadata .label { color: #999; }
    .section-title { color: #e0dcd0; border-bottom-color: #555; }
    .section p, .section ul li { color: #d0ccbe; }
    .highlight-box { border-left-color: #777; color: #d0ccbe; }
    .critical-box { border-color: #993333; border-left-color: #cc4444; color: #e0d8d0; }
    .signature-section, .signature-line { color: #999; border-top-color: #555; }
    .footer { color: #555; border-top-color: #333; }
    .classificazione { color: #cc4444; border-color: #cc4444; }
    .timbro { border-color: rgba(200, 60, 60, 0.25); color: rgba(200, 60, 60, 0.25); }
}
@media print {
    body { background: #fff; padding: 0; }
    .document { box-shadow: none; padding: 6mm; background: #fff; color: #111; }
}
"""

# ── CSS specifici per file con classi uniche (da appendere al CSS base) ──
EXTRA_CSS = {
    "05_Estratti_Conto": """
.anomalous { background: #fff0f0; border-left: 3px solid #8b0000; padding: 2px 6px; }
@media screen { .anomalous { background: #2a1818; border-left-color: #cc4444; color: #e0d0d0; } }
""",
    "08_Cronologia_Browser": """
.data-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 12px; }
.data-table th { background: #eee; color: #000; padding: 5px 8px; text-align: left; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; border-bottom: 2px solid #333; }
.data-table td { padding: 5px 8px; border-bottom: 1px solid #ccc; vertical-align: top; color: #111; }
.data-table tr:nth-child(even) td { background: #f9f9f7; }
.url { font-family: "Courier New", monospace; font-size: 11px; word-break: break-all; }
@media screen {
    .data-table th { background: #252525; color: #ccc; border-bottom-color: #555; }
    .data-table td { border-bottom-color: #333; color: #d0ccbe; }
    .data-table tr:nth-child(even) td { background: #1a1a1c; }
    .url { color: #88aacc; }
}
""",
    "09_Trascrizione_119": """
.transcript { margin: 10px 0; padding: 0; }
.line { margin-bottom: 8px; padding: 4px 0; }
.timestamp { font-size: 10px; color: #666; font-weight: bold; display: inline-block; width: 60px; }
.speaker { font-weight: bold; color: #333; margin-right: 6px; }
.speaker-caller { font-weight: bold; color: #8b0000; margin-right: 6px; }
.stage-direction { font-style: italic; color: #666; margin: 4px 0 4px 66px; font-size: 12px; }
@media screen {
    .timestamp { color: #888; }
    .speaker { color: #ccc; }
    .speaker-caller { color: #cc8888; }
    .stage-direction { color: #888; }
}
""",
    "12_Frammenti_Lettera_Aoi": """
.fragments-area { position: relative; min-height: 400px; margin: 16px 0; }
.fragment {
    background: #f8f4e8; border: 1px solid #c0b898; padding: 12px 16px;
    font-family: Georgia, serif; font-size: 14px; line-height: 1.7; color: #2c2418;
    position: relative; margin-bottom: 14px;
    box-shadow: 1px 2px 6px rgba(0,0,0,0.08);
}
.torn { border-style: dashed; border-color: #a09878; }
.fragment-a, .fragment-b, .fragment-c, .fragment-d, .fragment-e { transform: rotate(0deg); }
.fragment-a { transform: rotate(-0.5deg); }
.fragment-b { transform: rotate(0.3deg); }
.fragment-c { transform: rotate(-0.8deg); }
.fragment-d { transform: rotate(0.5deg); }
.fragment-e { transform: rotate(-0.3deg); }
@media screen {
    .fragment { background: #1e1c18; border-color: #444; color: #d0c8b0; box-shadow: 1px 2px 8px rgba(0,0,0,0.3); }
}
@media print { .fragment { box-shadow: none; } }
""",
    "13_Ricevuta_Maruzen": """
.order-box { border: 2px solid #333; padding: 12px 16px; margin: 12px 0; }
.order-field { margin-bottom: 6px; }
.order-label { font-weight: bold; color: #333; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; }
.order-value { color: #111; font-size: 13px; }
.stamp-not-collected {
    display: inline-block; font-weight: bold; color: #8b0000; border: 2px solid #8b0000;
    padding: 4px 12px; letter-spacing: 2px; transform: rotate(-3deg);
    font-size: 12px; margin-top: 8px;
}
@media screen {
    .order-box { border-color: #555; }
    .order-label { color: #999; }
    .order-value { color: #d0ccbe; }
    .stamp-not-collected { color: #cc4444; border-color: #cc4444; }
}
""",
    "14_Busta_Aoi": """
.letter-inset {
    background: #f8f4e8; border: 1px solid #c0b898; padding: 20px 24px;
    margin: 16px 0; font-family: Georgia, serif; font-size: 14px; line-height: 1.8; color: #2c2418;
}
.letter-inset p { margin-bottom: 10px; text-indent: 1.5em; }
.contacts-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 12px; }
.contacts-table td { padding: 4px 8px; border-bottom: 1px solid #ccc; }
.signature { text-align: right; font-style: italic; font-size: 15px; color: #3a2e1a; margin-top: 16px; }
@media screen {
    .letter-inset { background: #1e1c18; border-color: #444; color: #d0c8b0; }
    .contacts-table td { border-bottom-color: #333; color: #d0ccbe; }
    .signature { color: #a09880; }
}
""",
    "15_Caso_Kamiya_1986": """
.timeline-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 12px; }
.timeline-table th { background: #eee; color: #000; padding: 5px 8px; text-align: left; font-size: 11px; text-transform: uppercase; border-bottom: 2px solid #333; }
.timeline-table td { padding: 5px 8px; border-bottom: 1px solid #ccc; vertical-align: top; color: #111; }
.timeline-table tr:nth-child(even) td { background: #f9f9f7; }
.archive-stamp {
    position: absolute; top: 8mm; left: 8mm;
    font-size: 10px; font-weight: bold; color: #666; border: 1px solid #666;
    padding: 2px 6px; letter-spacing: 1px;
}
@media screen {
    .timeline-table th { background: #252525; color: #ccc; border-bottom-color: #555; }
    .timeline-table td { border-bottom-color: #333; color: #d0ccbe; }
    .timeline-table tr:nth-child(even) td { background: #1a1a1c; }
    .archive-stamp { color: #888; border-color: #888; }
}
""",
    "16_Scheda_Distretto": """
.attr-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
.attr-table td { padding: 6px 10px; border-bottom: 1px solid #ccc; font-size: 13px; color: #111; }
.attr-value { font-weight: bold; font-size: 16px; text-align: center; width: 50px; }
.attr-desc { font-size: 11px; color: #555; }
.pips { display: inline-flex; gap: 3px; }
.pip-full { width: 10px; height: 10px; border-radius: 50%; background: #333; display: inline-block; }
.pip-empty { width: 10px; height: 10px; border-radius: 50%; border: 1px solid #999; display: inline-block; }
.personnel-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 10px 0; }
.person-card { border: 1px solid #ccc; padding: 8px 10px; font-size: 12px; }
.person-card .name { font-weight: bold; color: #000; }
.person-card .role { font-size: 11px; color: #555; }
.ops-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 12px; }
.ops-table td { padding: 4px 8px; border-bottom: 1px solid #ccc; color: #111; }
@media screen {
    .attr-table td { border-bottom-color: #333; color: #d0ccbe; }
    .attr-desc { color: #888; }
    .pip-full { background: #aaa; }
    .pip-empty { border-color: #555; }
    .person-card { border-color: #444; }
    .person-card .name { color: #e0dcd0; }
    .person-card .role { color: #888; }
    .ops-table td { border-bottom-color: #333; color: #d0ccbe; }
}
""",
}

# ── File 11 (medico): CSS specifico con serif ──
CSS_TYPE_A_MEDICAL = CSS_TYPE_A.replace(
    '"Courier New", Courier, monospace',
    '"Noto Serif", Georgia, "Times New Roman", serif'
) + """
.visit-table { width: 100%; border-collapse: collapse; margin: 10px 0; font-size: 13px; }
.visit-table th { background: #eee; color: #000; padding: 5px 8px; text-align: left; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; border-bottom: 2px solid #333; }
.visit-table td { padding: 5px 8px; border-bottom: 1px solid #ccc; vertical-align: top; color: #111; }
.visit-table tr:nth-child(even) td { background: #f9f9f7; }
@media screen {
    .visit-table th { background: #252525; color: #ccc; border-bottom-color: #555; }
    .visit-table td { border-bottom-color: #333; color: #d0ccbe; }
    .visit-table tr:nth-child(even) td { background: #1a1a1c; }
}
"""

def replace_style(filepath, new_css):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    html = re.sub(r'<style>.*?</style>', f'<style>{new_css}</style>', html, flags=re.DOTALL)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

# ── TYPE A: Rapporti polizia/scientifici ──
type_a_files = [
    "01_Rapporto_Preliminare",
    "02_Autopsia_Standard",
    "03_Rapporto_Tossicologico",
    "04_Scheda_Collirio",
    "05_Estratti_Conto",
    "08_Cronologia_Browser",
    "09_Trascrizione_119",
    "12_Frammenti_Lettera_Aoi",
    "13_Ricevuta_Maruzen",
    "14_Busta_Aoi",
    "15_Caso_Kamiya_1986",
    "16_Scheda_Distretto",
]

for name in type_a_files:
    fp = os.path.join(DIR, f"{name}.html")
    css = CSS_TYPE_A + EXTRA_CSS.get(name, "")
    replace_style(fp, css)
    print(f"  A: {name}")

# File 11 (medico con serif)
replace_style(os.path.join(DIR, "11_Cartella_Clinica_Endo.html"), CSS_TYPE_A_MEDICAL)
print("  A-med: 11_Cartella_Clinica_Endo")

# ── TYPE B: Documenti personali (lettera, diario) — già buoni, aggiorno impatto ──
# File 06 e 10 hanno già dark mode. Li lascio come sono perché hanno stile unico
# ma aggiorno i colori per più impatto
for name in ["06_Lettera_Morimoto", "10_Diario_Morimoto"]:
    fp = os.path.join(DIR, f"{name}.html")
    with open(fp, 'r', encoding='utf-8') as f:
        html = f.read()
    # Assicuro dark mode forte e print bianco
    html = re.sub(r'body \{ background: #0d0d0f; \}', 'body { background: #080808; }', html)
    html = re.sub(r'background: #1e1c18;', 'background: #131210;', html)
    html = re.sub(r'color: #d0c8b0;', 'color: #ddd8c8;', html)
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"  B: {name}")

# ── TYPE C: Giornali — aggiorno impatto ──
for name in ["17_Giornale_Necrologia", "18_Giornale_Omicidio", "19_Giornale_Scandalo", "20_Giornale_Nomina_Kuroda", "21_Giornale_Kamiya_1986"]:
    fp = os.path.join(DIR, f"{name}.html")
    with open(fp, 'r', encoding='utf-8') as f:
        html = f.read()
    # Più impatto: dark mode più forte, titoli più grandi
    html = re.sub(r'body \{ background: #0d0d0f; \}', 'body { background: #080808; }', html)
    html = re.sub(r'background: #1e1c18;', 'background: #131210;', html)
    html = re.sub(r'color: #d0cdc0;', 'color: #ddd8c8;', html)
    html = re.sub(r'color: #c0a060;', 'color: #d4b060;', html)
    html = re.sub(r'color: #c0bdb0;', 'color: #d0ccbe;', html)
    # Print always white
    if 'background: #fff' not in html.split('@media print')[1] if '@media print' in html else '':
        pass  # already fine
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"  C: {name}")

# ── TYPE D: Polizza assicurativa — aggiorno impatto ──
fp07 = os.path.join(DIR, "07_Polizza_Assicurativa.html")
with open(fp07, 'r', encoding='utf-8') as f:
    html = f.read()
html = re.sub(r'body \{ background: #0d0d0f; \}', 'body { background: #080808; }', html)
html = re.sub(r'background: #1a1a1e;', 'background: #131215;', html)
html = re.sub(r'color: #d0cdc0;', 'color: #ddd8c8;', html)
html = re.sub(r'color: #c0bdb0;', 'color: #d0ccbe;', html)
with open(fp07, 'w', encoding='utf-8') as f:
    f.write(html)
print("  D: 07_Polizza_Assicurativa")

print("\nFatto — tutti i 21 handout aggiornati.")
