# -*- coding: utf-8 -*-
# BAKUON — Tanto Rumore per Nulla — esporta l'avventura dal wizard (caso C3C15FF7…) in questa cartella:
# PNG/ una scheda a testa · Location/ · Storia Completa.md · handout/ (snapshot HTML)
# Token/ (ritagli quadrati) · Immagini/ (scene e ritratti) · _adventure.json
#
# La FONTE DI VERITÀ resta il wizard: questa è la fotografia per il vault.
# Rieseguire dopo ogni modifica al caso:  python esporta_da_wizard.py
import io, sys, os, sqlite3, json, re, shutil, urllib.parse, datetime
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from contesto_tavolo import RUOLI, LOCATION, RUOLI_FILE, file_scheda  # fonte unica del contesto da tavolo
BASE = r'C:\Public\_Clienti\Maruga\Giochi\Vampiri\Vault\Vampiri\Investigare'
WIZ  = os.path.join(BASE, 'Wizard', 'codice', 'GenkaiWizard')
ID   = 'C3C15FF7-AFCE-4299-A49C-53B367CD29EA'
DEST = os.path.dirname(os.path.abspath(__file__))
OGGI = datetime.date.today().isoformat()

c = sqlite3.connect('file:' + os.path.join(WIZ, 'app.db').replace('\\','/') + '?mode=ro', uri=True)
titolo_caso, stato = c.execute("select Titolo, StatoJson from Progetti where Id=?", (ID,)).fetchone()
S = json.loads(stato)
CAST   = {p['id']: p for p in S['cast']}
LUOG   = {l['id']: l for l in S['luoghi']}
GRUP   = {g['id']: g for g in S['gruppi']}
SCHEDE = {s['personaId']: s for s in S['passo8']['schede']}
COLP   = set(S['passo5'].get('colpevoliIds') or [])
VITT   = S['passo2'].get('personaId')
q1, q2, q3, q4, q5, q6 = (S.get(k) or {} for k in ('passo1','passo2','passo3','passo4','passo5','passo6'))

def nome(i):
    if i in CAST: return (CAST[i]['cognome'] + ' ' + CAST[i]['nome']).strip()
    if i in GRUP: return GRUP[i]['nome']
    return ''
def luogo(i):
    l = LUOG.get(i)
    return (l.get('nome') or l.get('via') or '') if l else ''

_bib = {}
def lib(n):
    if n not in _bib:
        p = os.path.join(WIZ, 'Dati', 'biblioteche', n + '.json')
        _bib[n] = json.load(open(p, encoding='utf-8')) if os.path.exists(p) else {}
    return _bib[n]
def voce_lib(file, chiave, id_):
    if not id_: return None
    for x in (lib(file).get(chiave) or []):
        if x.get('id') == id_ or x.get('nome') == id_: return x
    return None
def nomeCat(file, chiave, id_):
    v = voce_lib(file, chiave, id_)
    return v['nome'] if v else (id_ or '')
def nome_omicidio(tid, sid):
    for t in (lib('tipologie_omicidio').get('tipologie') or []):
        if t.get('id') == tid:
            for s in (t.get('sottotipi') or []):
                if s.get('id') == sid: return f"{t['nome']} — {s['nome']}"
            return t['nome']
    return tid or ''
def nome_movente(mid):
    for m in (lib('moventi').get('moventi') or []):
        if m.get('id') == mid: return m['nome']
        for s in (m.get('sottocasi') or []):
            if s.get('id') == mid: return f"{m['nome']} — {s['nome']}"
    return mid or ''

def slug(t):
    t = re.sub(r'[àáâä]', 'a', t.lower()); t = re.sub(r'[èéêë]', 'e', t)
    t = re.sub(r'[ìíîï]', 'i', t); t = re.sub(r'[òóôö]', 'o', t); t = re.sub(r'[ùúûü]', 'u', t)
    t = re.sub(r'[ōô]', 'o', t); t = re.sub(r'[ū]', 'u', t)
    return re.sub(r'_+', '_', re.sub(r'[^a-z0-9]+', '_', t)).strip('_')

CERCHI = ('famiglia','lavoro','amici','altri','intersezione')
def cerchia_di(pid):
    for base, chi in (('passo3','della vittima'), ('passo6', "dell'assassino")):
        for cc in CERCHI:
            for r in (S.get(base, {}).get(cc) or []):
                if r.get('personaId') == pid and (r.get('relazione') or '').strip():
                    return f"{r['relazione']} — nel mondo {chi}"
    return ''
def gruppi_di(pid):
    return [g['nome'] for g in S['gruppi'] if pid in (g.get('membriIds') or [])]
def luoghi_suoi(pid):
    return [l.get('nome') or l.get('via') or '' for l in S['luoghi'] if l.get('personaId') == pid]
def en_di(pid):
    righe = []
    for rel in S.get('relazioni', []):
        a, b = rel.get('aId'), rel.get('bId')
        if pid == a and nome(b):
            righe.append((nome(b), rel.get('tipo',''), rel.get('enAB'), rel.get('enBA')))
        elif pid == b and nome(a):
            righe.append((nome(a), rel.get('tipo',''), rel.get('enBA'), rel.get('enAB')))
    return righe
def ruolo_di(p):
    pid = p['id']
    if pid == VITT: return 'la vittima'
    if pid in COLP: return "l'assassino"
    rel = cerchia_di(pid)
    return rel.split(' — ')[0] if rel else (p.get('ruoloNelCaso') or '')

for d in ('PNG', 'Location', 'handout', 'Token', 'Immagini', os.path.join('Immagini', 'Ritratti')):
    os.makedirs(os.path.join(DEST, d), exist_ok=True)

# ═══════════ PNG/ — una scheda per persona ═══════════
def file_png(pid):
    return file_scheda(nome(pid), pid)

def blocchi_extra(pid):
    r = []
    evs = [e for e in S['passo7']['eventi'] if pid in (e.get('personeIds') or [])]
    if evs:
        r += ['## Nella storia (verità del GM)', '']
        for e in sorted(evs, key=lambda x: x.get('quando','')):
            dove = nome_luogo_ev(e)
            r.append('- **' + (e.get('quando','—') or '—') + '**' + (' · *' + dove + '*' if dove else '') + ' — ' + (e.get('testo','') or '').strip())
        r.append('')
    miei_gruppi = [g['id'] for g in S['gruppi'] if pid in (g.get('membriIds') or [])]
    fonti = []
    for tr in S['passo9']['tracce']:
        for f in (tr.get('fonti') or []):
            if f.get('attoreId') == pid or f.get('attoreId') in miei_gruppi:
                fonti.append((tr, f))
    if fonti:
        r += ['## Cosa può dare ai PG', '']
        COME = {'interrogatorio':'interrogandolo','richiestaEnte':'con richiesta all' + chr(39) + 'ente','nulla':'senza condizioni'}
        for tr, f in fonti:
            come = COME.get(f.get('richiede',''), f.get('richiede',''))
            riga = '- **«' + tr['nome'] + '»** (' + come + ')'
            if (f.get('versione') or '').strip(): riga += ': ' + f['versione'].strip()
            if f.get('handout'): riga += ' — *diventa handout: «' + (f.get('handoutTitolo') or tr['nome']) + '»*'
            r.append(riga)
        r.append('')
    return r

def nome_luogo_ev(e):
    l = LUOG.get(e.get('luogoId'))
    return (l.get('nome') or '') if l else ''

def scheda_png(p):
    pid = p['id']; sch = SCHEDE.get(pid, {})
    T = lambda k: (sch.get(k) or '').strip()
    r = []
    r.append(f"# {nome(pid)} ({p.get('kanji','')}) — {RUOLI.get(pid) or ruolo_di(p)}")
    r.append('')
    ana = [f"**Età:** {p['eta']} anni" if p.get('eta') else '',
           {'m':'uomo','f':'donna'}.get(p.get('genere',''), '')]
    prof = p.get('professione') or (nomeCat('professioni','professioni', q2.get('professioneId')) if pid == VITT else '')
    if prof: ana.append(f"**Professione:** {prof}")
    r.append(' · '.join(x for x in ana if x))
    cer = cerchia_di(pid)
    if cer: r.append(f"**Cerchia:** {cer}")
    gr = gruppi_di(pid)
    if gr: r.append(f"**Gruppi:** {', '.join(gr)}")
    nota = re.sub(r'^\[ex Dati base\]\s*', '', (p.get('note') or '')).strip()
    if nota: r.append(f"**Nota:** {nota}")
    en = en_di(pid)
    if en:
        r.append('')
        r.append('**En:**')
        for altro, tipo, mio, suo in en:
            pezzi = [f"**{altro}**"] + ([f"({tipo})"] if tipo else [])
            if str(mio).strip() not in ('', 'None'): pezzi.append(f"En verso {altro.split()[0]}: **{mio}**")
            if str(suo).strip() not in ('', 'None'): pezzi.append(f"En di {altro.split()[0]} in risposta: **{suo}**")
            r.append('- ' + ' · '.join(pezzi))
    cont = {k: v for k, v in (sch.get('contatti') or {}).items()
            if isinstance(v, str) and v.strip() and k != 'residenzaLuogoId'}
    ab = luogo((sch.get('contatti') or {}).get('residenzaLuogoId'))
    suoi = [x for x in luoghi_suoi(pid) if x != ab]
    dove = ([f"abita: {ab}"] if ab else []) + [f"{k}: {v}" for k, v in cont.items()] + \
           ([f"luoghi suoi: {', '.join(suoi)}"] if suoi else [])
    if dove:
        r.append('')
        r.append('**Dove si trova:** ' + ' · '.join(dove))
    r.append('')

    if pid == VITT:
        if T('descrizioneFisica'): r += ['## Che aspetto aveva', '', T('descrizioneFisica'), '']
        if (q2.get('postoNelMondo') or '').strip(): r += ['## Chi era', '', q2['postoNelMondo'].strip(), '']
        vicini = []
        for cc in CERCHI:
            for x in (q3.get(cc) or []):
                if nome(x.get('personaId','')) and (x.get('relazione') or '').strip():
                    vicini.append(f"- **{nome(x['personaId'])}** — {x['relazione']}")
        if vicini: r += ['## Chi aveva intorno', ''] + vicini + ['']
        probl = [x for x in (q3.get('problemi') or []) if (x.get('testo') or '').strip()]
        if probl:
            r += ['## I nodi nella sua vita', '']
            for x in probl:
                r.append('- ' + x['testo'].strip() + (' *(potenziale falsa pista)*' if x.get('potenzialeFalsaPista') else ''))
            r.append('')
        return '\n'.join(r).rstrip() + '\n'

    if T('descrizioneFisica'): r += ['## Che aspetto ha', '', T('descrizioneFisica'), '']
    for k, lab in (('cosaSa','Cosa sa'), ('cosaNonSa','Cosa NON sa'),
                   ('cosaHaFatto','Cosa ha fatto davvero'), ('comportamento','Come si comporta, cosa nasconde')):
        if T(k): r += [f'## {lab}', '', T(k), '']
    trg = [t for t in (sch.get('trigger') or []) if (t.get('se') or '').strip()]
    if trg:
        r += ['## Quando cede', '']
        for t in trg:
            r.append('- ' + t['se'].strip() + ((' → ' + t['allora'].strip()) if (t.get('allora') or '').strip() else ''))
        r.append('')
    ETIC = dict(intercalare='Intercalare', marcatore='Marcatore', appellativo='Come ti chiama',
                abitudine='Abitudine', saluto='Saluto', rifiuto='Se rifiuta', minaccia='Se minaccia',
                vizio='Vizio', tic='Tic', oggetto='Oggetto')
    voce   = {k: v for k, v in (sch.get('voce') or {}).items() if (v or '').strip()}
    tratti = {k: v for k, v in (sch.get('tratti') or {}).items() if (v or '').strip()}
    if voce or tratti:
        r += ['## Come parla, com\u2019è fatto', '']
        for k, v in list(voce.items()) + list(tratti.items()):
            r.append(f"- **{ETIC.get(k, k)}:** {v}")
        r.append('')
    stt = {k: v for k, v in (sch.get('stats') or {}).items() if k != 'esempio' and v not in (None, '')}
    if stt:
        prof_stat = (sch.get('stats') or {}).get('esempio')
        r += ['## Statistiche', '', ' · '.join(f'{k} {v}' for k, v in stt.items()) +
              (f"  *(profilo: {prof_stat})*" if prof_stat else ''), '']
    if T('deposizione'):
        r += ['## La sua deposizione', '']
        for blocco in T('deposizione').split('\n'):
            r.append('> ' + blocco.strip() if blocco.strip() else '>')
        r.append('')
        if sch.get('depHandout'):
            r.append(f"*(marcata come handout nel wizard{': «' + sch['depTitolo'] + '»' if (sch.get('depTitolo') or '').strip() else ''})*")
            r.append('')
    elif sch.get('depHandout'):
        r += ['## La sua deposizione', '', '⚠ **Deposizione non ancora scritta nel wizard** (è marcata come handout ma il testo manca).', '']
    r += blocchi_extra(pid)
    SOSTANZA = ('cosaSa','cosaNonSa','cosaHaFatto','comportamento','deposizione')
    if not any(T(k) for k in SOSTANZA):
        r += ['---', '', '⚠ **Scheda non compilata nel wizard**: manca cosa sa, come si comporta e la deposizione. '
              'Al tavolo si improvvisa — o si compila al passo 11 (Schede) del wizard.', '']
    return '\n'.join(r).rstrip() + '\n'

# pulizia: via i .md vecchi (i nomi file ora includono il ruolo)
for _f in os.listdir(os.path.join(DEST, 'PNG')):
    if _f.endswith('.md'): os.remove(os.path.join(DEST, 'PNG', _f))
n_png = 0
for p in S['cast']:
    percorso = os.path.join(DEST, 'PNG', file_png(p['id']))
    open(percorso, 'w', encoding='utf-8').write(scheda_png(p))
    n_png += 1

# ═══════════ Location/ ═══════════
def scheda_luogo(l):
    r = [f"# {l.get('nome') or '(senza nome)'}" + (f" {l['icona']}" if l.get('icona') else '')]
    r.append('')
    meta = []
    if l.get('quartiere'): meta.append(f"**Quartiere:** {nomeCat('luoghi','quartieri', l['quartiere'])}")
    if l.get('tipologiaId'): meta.append(f"**Tipologia:** {nomeCat('luoghi','tipologie', l['tipologiaId'])}")
    if (l.get('via') or '').strip(): meta.append(f"**Indirizzo:** {l['via'].strip()}")
    chi = nome(l.get('personaId',''))
    if chi: meta.append(f"**Legato a:** {chi}")
    r.append(' \n'.join(meta))
    if l.get('segretoPG'):
        r += ['', '> ⚠ **Nascosto ai giocatori** — non sanno che esiste finché l\u2019indagine non ce li porta.']
    ctx = LOCATION.get((l.get('nome') or '').strip())
    if ctx:
        r += ['', '## Quando i PG arrivano', '', ctx['arrivo'], '', '## Quando entrano', '', ctx['entrata']]
    tip = voce_lib('luoghi', 'tipologie', l.get('tipologiaId'))
    if tip:
        r.append('')
        if tip.get('cosaSiVede'):
            v = tip['cosaSiVede']; v = ', '.join(v) if isinstance(v, list) else v
            r.append(f"**Che posto è** *(dalla biblioteca del wizard)*: {v}")
        if tip.get('tracceTipiche'):
            v = tip['tracceTipiche']; v = ', '.join(v) if isinstance(v, list) else v
            r.append('')
            r.append(f"**Cosa ci si trova, di solito:** {v}")
    ev = [e for e in S['passo7']['eventi'] if e.get('luogoId') == l['id']]
    if ev:
        r += ['', '## Cosa è successo qui (verità del GM)', '']
        for e in sorted(ev, key=lambda x: x.get('quando','')):
            chi_e = ', '.join(nome(i) for i in (e.get('personeIds') or []) if nome(i))
            r.append(f"- **{e.get('quando','—')}** — {e.get('testo','').strip()}" + (f" *(presenti: {chi_e})*" if chi_e else ''))
            for tr in (e.get('generaTraccia') or []):
                if (tr or '').strip(): r.append(f"  - Traccia: *{tr.strip()}*")
        r.append('')
    return '\n'.join(r).rstrip() + '\n'

n_loc = 0
for l in S['luoghi']:
    percorso = os.path.join(DEST, 'Location', f"{(l.get('nome') or 'senza_nome')}.md")
    open(percorso, 'w', encoding='utf-8').write(scheda_luogo(l))
    n_loc += 1

# ═══════════ handout/ — snapshot HTML autonomi ═══════════
css = open(os.path.join(WIZ, 'wwwroot', 'css', 'handout.css'), encoding='utf-8').read()
handout = [h for h in (S.get('passo10', {}).get('handout') or [])]
indice = ['# Handout — indice', '',
          f"> Snapshot dal wizard del **{OGGI}**. La fonte di verità è il wizard (caso «{titolo_caso}»):",
          '> per stampare o modificare usare il wizard; questi file sono la copia per il vault.', '']
n_ho = 0
for i, h in enumerate(handout, 1):
    cont = (h.get('contenuto') or '').strip()
    nomefile = f"{i:02d}_{slug(h.get('titolo') or 'handout')}.html"
    if cont:
        pagina = ('<!DOCTYPE html>\n<html lang="it">\n<head>\n<meta charset="utf-8">\n'
                  f"<title>{h.get('titolo','Handout')}</title>\n<style>\n{css}\n"
                  'body { margin: 0; background: #777; padding: 24px 8px; display: flex; justify-content: center; }\n'
                  '@media print { body { background: #fff; padding: 0; } }\n'
                  '</style>\n</head>\n<body>\n' + cont + '\n</body>\n</html>\n')
        open(os.path.join(DEST, 'handout', nomefile), 'w', encoding='utf-8').write(pagina)
        stato_h = nomefile
        n_ho += 1
    else:
        stato_h = '*(vuoto nel wizard — da generare)*'
    riga = f"- **{h.get('titolo','')}**" + (f" · {h['tipo']}" if (h.get('tipo') or '').strip() else '') + f" → {stato_h}"
    col = h.get('collegatoA') or ''
    if col.startswith('p:') and nome(col[2:]): riga += f" *(collegato a {nome(col[2:])})*"
    indice.append(riga)
indice += ['', '## Deposizioni marcate 📄 (si stampano dal wizard, passo 11/13)', '']
for s in S['passo8']['schede']:
    if s.get('depHandout') and s.get('personaId') in CAST:
        tit = (s.get('depTitolo') or '').strip() or f"Deposizione — {nome(s['personaId'])}"
        manca = '' if (s.get('deposizione') or '').strip() else '  ⚠ *testo non ancora scritto*'
        indice.append(f"- {tit}{manca}")
open(os.path.join(DEST, 'handout', '_Indice.md'), 'w', encoding='utf-8').write('\n'.join(indice) + '\n')

# ═══════════ Token/ e Immagini/ ═══════════
ALLEG = os.path.join(WIZ, 'wwwroot', 'allegati', ID.lower())
from PIL import Image
n_tok = 0
for p in S['cast']:
    f = (SCHEDE.get(p['id'], {}) or {}).get('foto')
    if not f: continue
    rel = urllib.parse.unquote(f.split('?')[0]).lstrip('/')
    src = os.path.join(WIZ, 'wwwroot', *rel.split('/'))
    if not os.path.exists(src): continue
    im = Image.open(src).convert('RGB')
    w, h = im.size; lato = min(w, h)
    im = im.crop(((w - lato)//2, 0, (w - lato)//2 + lato, lato)).resize((460, 460), Image.LANCZOS)
    im.save(os.path.join(DEST, 'Token', f"{nome(p['id'])}.png"))
    shutil.copy2(src, os.path.join(DEST, 'Immagini', 'Ritratti', f"{nome(p['id'])}.png"))
    n_tok += 1

n_img = 0
if os.path.isdir(ALLEG):
    for f in os.listdir(ALLEG):
        if f.startswith('ritratto-') or f.startswith('Chiba Hiroko-'): continue   # ritratti: già in Ritratti/
        pulito = re.sub(r'-\d{15,}(?=\.)', '', f)                                  # via il timestamp dal nome
        shutil.copy2(os.path.join(ALLEG, f), os.path.join(DEST, 'Immagini', pulito))
        n_img += 1

# ═══════════ Storia Completa.md ═══════════
r = []
r.append("# BAKUON 爆音")
r.append('## Tanto Rumore per Nulla')
r.append('')
r.append(f"> **Sistema:** GENKAI 限界 v1.3 · **Giocatori:** 3-5 investigatori della Sezione Omicidi di Kyoto · "
         f"**Formato:** one-shot · **Ambientazione:** Kyoto, {nomeCat('luoghi','quartieri', S.get('setup',{}).get('quartiere'))}, maggio 1997 · "
         f"**Genere:** investigativo di quartiere — bande giovanili")
r.append('>')
r.append('> **Bakuon 爆音** è il rombo degli scarichi smarmittati: la yonfore che si riconosce a tre isolati, '
         'l’unica cosa che tutti i testimoni ricordano. E il sottotitolo dice il resto: un ragazzo morto per gelosia — '
         'tanto rumore, per nulla. Avventura costruita col wizard GENKAI; questa cartella è la sua fotografia per il vault.')
r.append('')
r.append('---')
r.append('')
r.append('## PREMESSA PER IL GM')
r.append('')
r.append(f"**{q1.get('rigaUnica','')}**")
r.append('')
r.append(f"La vittima è **{nome(VITT)}**, {q2.get('eta','')} anni, {q2.get('postoNelMondo','')} — "
         f"{nome_omicidio(q1.get('tipologiaId'), q1.get('sottotipoId'))}.")
r.append('')
r.append(f"Il colpevole è **{', '.join(nome(i) for i in COLP)}**. Movente: **{nome_movente(q4.get('moventeId'))}** — {q4.get('descrizione','')}")
r.append('')
if (q5.get('competenze') or '').strip(): r += [f"**Chi è l'assassino:** {q5['competenze'].strip()}", '']
if (q5.get('erroreCoerente') or '').strip(): r += [f"**Lo sbaglio che lo tradisce:** {q5['erroreCoerente'].strip()}", '']
if (q6.get('connessioneVittima') or '').strip(): r += [f"**Il legame con la vittima:** {q6['connessioneVittima'].strip()}", '']
if (q6.get('dopoIlFatto') or '').strip(): r += [f"**Cosa fa dopo il fatto:** {q6['dopoIlFatto'].strip()}", '']
r.append('**Ricorda il principio fondamentale di GENKAI:** gli indizi si danno SEMPRE. '
         'Il dado non blocca l\u2019indagine: decide come il PG gestisce quello che trova.')
r.append('')
probl = [x for x in (q3.get('problemi') or []) if (x.get('testo') or '').strip()]
if probl:
    r += ['### I nodi nella vita della vittima', '']
    for x in probl:
        r.append('- ' + x['testo'].strip() + (' *(potenziale falsa pista)*' if x.get('potenzialeFalsaPista') else ''))
    r.append('')
cand = [x for x in (q4.get('candidati') or []) if (x.get('perche') or '').strip() and x.get('personaId') not in COLP]
if cand:
    r += ['### Chi altro aveva la stessa ragione', '']
    for x in cand: r.append(f"- **{nome(x['personaId'])}** — {x['perche'].strip()}")
    r.append('')
r += ['---', '', '## LA CRONISTORIA — la verità in ordine', '',
      'Quello che è successo davvero, che i giocatori lo scoprano o no.', '']
FASI = (('prima', 'Prima del fatto'), ('fatto', 'Il fatto'), ('dopo', 'Dopo il fatto'))
eventi = sorted(S['passo7']['eventi'], key=lambda e: e.get('quando',''))
for fase, lab in FASI:
    ev = [e for e in eventi if e.get('fase') == fase]
    if not ev: continue
    r += [f'### {lab}', '']
    for e in ev:
        lg = luogo(e.get('luogoId'))
        chi_e = ', '.join(nome(i) for i in (e.get('personeIds') or []) if nome(i))
        r.append(f"**{e.get('quando','—')}**" + (f" · *{lg}*" if lg else ''))
        r.append(e.get('testo','').strip())
        if chi_e: r.append(f"*Presenti: {chi_e}*")
        for tr in (e.get('generaTraccia') or []):
            if (tr or '').strip(): r.append(f"- **Traccia:** {tr.strip()}")
        r.append('')
r += ['---', '', '## LA BANDA E IL KŌBAN', '']
for g in S['gruppi']:
    riga = f"### {g.get('nome','')}"
    r.append(riga)
    meta = ' · '.join(x for x in [g.get('tipo',''), (f"zona {g['zona']}" if g.get('zona') else '')] if x)
    if meta: r.append(f"*{meta}*" + ('  — ⚠ **i giocatori non sanno che esiste**' if g.get('segretoPG') else ''))
    if (g.get('descrizione') or '').strip(): r.append(g['descrizione'].strip())
    membri = [nome(m) for m in (g.get('membriIds') or []) if nome(m)]
    if membri: r.append(f"**Chi ne fa parte:** {', '.join(membri)}")
    ente = SCHEDE.get(g['id'], {}).get('statsEnte')
    if ente:
        r.append('**Attributi dell\u2019ente:** ' + ' · '.join(f'{k} {v}' for k, v in ente.items() if v not in (None, '')))
    r.append('')
r += ['---', '', '## LE PERSONE DEL CASO', '',
      'Le schede complete, una per file, in **`PNG/`** — cosa sanno, cosa nascondono, come parlano, la deposizione.', '',
      '| Persona | Ruolo | Età | Scheda |', '|---|---|---|---|']
ordinati = sorted(CAST.values(), key=lambda p: (p['id'] != VITT, p['id'] not in COLP, p['cognome'] + p['nome']))
for p in ordinati:
    sch = SCHEDE.get(p['id'], {})
    piena = p['id'] == VITT or any((sch.get(k) or '').strip() for k in ('cosaSa','cosaNonSa','cosaHaFatto','comportamento','deposizione'))
    r.append(f"| **{nome(p['id'])}** {p.get('kanji','')} | {ruolo_di(p)} | {p.get('eta','')} | "
             f"[[PNG/{file_png(p['id'])}\\|{nome(p['id'])}]]{'' if piena else ' ⚠ da compilare'} |")
r += ['', '---', '', '## I LUOGHI', '', 'Uno per file in **`Location/`**.', '',
      '| Luogo | Quartiere | Note |', '|---|---|---|']
for l in S['luoghi']:
    note = ' · '.join(x for x in [nomeCat('luoghi','tipologie', l.get('tipologiaId')),
                                  ('nascosto ai PG' if l.get('segretoPG') else '')] if x)
    r.append(f"| **{l.get('nome','')}** | {nomeCat('luoghi','quartieri', l.get('quartiere'))} | {note} |")
r += ['', '---', '', '## LE INFORMAZIONI — chi sa cosa', '']
RICH = {'nulla':'basta chiedere', 'interrogatorio':'interrogatorio', 'richiestaEnte':'richiesta a un ente',
        'sopralluogo':'sopralluogo', 'perquisizione':'perquisizione', 'pedinamento':'pedinamento'}
for tr in (S.get('passo9', {}).get('tracce') or []):
    if not (tr.get('nome') or '').strip(): continue
    r.append(f"### {tr['nome']}" + (f" · *{tr['classificazione']}*" if (tr.get('classificazione') or '').strip() else ''))
    if (tr.get('testo') or '').strip(): r += ['', tr['testo'].strip()]
    r.append('')
    for f in (tr.get('fonti') or []):
        chi = nome(f.get('attoreId','')) or f.get('canale','')
        if not chi: continue
        riga = f"- **da {chi}**"
        ric = f.get('richiede','')
        if ric and ric != 'nulla': riga += f" ({RICH.get(ric, ric)})"
        if f.get('handout'): riga += ' — *handout*'
        r.append(riga)
        for campo in ('versione', 'handoutTitolo'):
            if (f.get(campo) or '').strip(): r.append(f"  - «{f[campo].strip()}»")
    for a in (tr.get('allegati') or []):
        if a.get('nome'):
            pulito = re.sub(r'-\d{15,}(?=\.)', '', a['nome'])
            r.append(f"- allegato: `Immagini/{pulito}`")
    r.append('')
giorni = [g for g in (S.get('passo11', {}).get('giorni') or []) if (g.get('evento') or '').strip()]
if giorni:
    r += ['---', '', '## IL CALENDARIO VIVO', '', 'Cosa succede comunque, che i giocatori guardino o no.', '']
    for g in giorni:
        r.append(f"**Giorno {g.get('giorno','')}" + (f" · {g['momento']}" if (g.get('momento') or '').strip() else '') + '**')
        r.append(g['evento'].strip())
        if (g.get('condizione') or '').strip(): r.append(f"*Solo se: {g['condizione'].strip()}*")
        r.append('')
r += ['---', '', '## TABELLA EN RIEPILOGATIVA', '',
      'En positivo si sottrae dal dado, negativo si aggiunge. A ±4/±5 il legame è profondo.', '',
      '| Chi | Verso | Legame | En |', '|---|---|---|---|']
for rel in S.get('relazioni', []):
    a, b = nome(rel.get('aId','')), nome(rel.get('bId',''))
    if not a or not b: continue
    for (x, y, en) in ((a, b, rel.get('enAB')), (b, a, rel.get('enBA'))):
        if str(en).strip() in ('', 'None'): continue
        r.append(f"| {x} | {y} | {rel.get('tipo','') or '—'} | **{en}** |")
r += ['', '---', '', '## MATERIALE DA TAVOLO', '',
      '- **`DOSSIER_GM.docx`** — il dossier completo del GM (soluzione, cronistoria, persone, luoghi, En, scheda distretto)',
      '- **`SCONTRO_FOGLIO_TAVOLO.docx`** — il combattimento in una pagina (pistola, manganello, pugni, coperture)',
      '- **`Token/TOKEN_PERSONE.docx`** — i 12 token da ritagliare · in `Token/` anche i ritagli singoli',
      '- **`handout/`** — snapshot degli handout; **si stampano dal wizard** (fonte di verità)',
      '- **`LANCIO.md`** — il materiale di lancio (WhatsApp + giornale finto)',
      '- La scheda del distretto vive in `../Materiale/Scheda_Distretto.md` (riportata per intero nel dossier)',
      '', f'*Esportato dal wizard il {OGGI} — `python esporta_da_wizard.py` per riesportare.*']
open(os.path.join(DEST, 'Storia Completa.md'), 'w', encoding='utf-8').write('\n'.join(r) + '\n')

# ═══════════ _adventure.json ═══════════
adv = {
    "id": "avventura-bakuon",
    "name": "Bakuon — Tanto Rumore per Nulla",
    "system": "Genkai",
    "author": "Maru",
    "version": "1.0",
    "description": "Kyoto, maggio 1997. Uno studente di medicina muore in uno snack bar: una lite, un colpo, "
                   "un gruppo di giovani fuggiti in moto. Il bakuon — il rombo degli scarichi — è l'unica cosa "
                   "che tutti i testimoni ricordano.",
    "players": "3-5",
    "duration": "one-shot",
    "language": "it",
    "tags": ["giappone", "investigare", "1997", "bosozoku"],
    "visibility": "private",
    "exportedAt": OGGI
}
open(os.path.join(DEST, '_adventure.json'), 'w', encoding='utf-8').write(json.dumps(adv, ensure_ascii=False, indent=2))

print(f"esportato in: {DEST}")
print(f"  PNG: {n_png} · Location: {n_loc} · handout HTML: {n_ho}/{len(handout)} · token: {n_tok} · immagini: {n_img}")
vuote = [nome(p['id']) for p in S['cast']
         if not any((SCHEDE.get(p['id'], {}).get(k) or '').strip()
                    for k in ('cosaSa','cosaNonSa','cosaHaFatto','comportamento','deposizione')) and p['id'] != VITT]
if vuote: print('  ⚠ schede senza sostanza nel wizard:', ', '.join(vuote))
