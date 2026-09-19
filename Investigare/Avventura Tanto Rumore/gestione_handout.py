"""Resa degli handout per i giocatori; istruzioni GM conservate nell'indice."""
import html
import re
import urllib.parse


def avviso_html(testo):
    if not testo:
        return ''
    return ('<aside class="ho-avviso-gm" style="color:#a01818;border:2px solid #a01818;'
            'padding:10px;margin-top:18px;font:12px/1.5 Arial,sans-serif;'
            'break-inside:avoid;column-span:all;clear:both">'
            '<strong>AVVISO PER IL MASTER — CONSEGNA</strong><br>'
            + html.escape(testo).replace('\n', '<br>') + '</aside>')


def paragrafi_html(testo):
    return ''.join('<p>' + html.escape(p).replace('\n', '<br>') + '</p>'
                   for p in re.split(r'\n\s*\n', testo.strip()) if p.strip())


def nome_allegato(allegato):
    """Il nome su disco deriva dall'URL, che può differire dall'etichetta del wizard."""
    nome = urllib.parse.unquote(allegato['url'].split('?')[0]).rsplit('/', 1)[-1]
    return re.sub(r'-\d{15,}(?=\.)', '', nome)


def verbale_html(nome, scheda):
    ruolo = (scheda.get('depRuolo') or '').strip()
    ruolo_html = '<dt>Ruolo</dt><dd>' + html.escape(ruolo) + '</dd>' if ruolo else ''
    return ('<div class="ho-foglio ho-referto"><div class="ho-intestazione">'
            '<div class="ente">POLIZIA PREFETTURALE DI KYOTO — DISTRETTO DI SHIMOGYŌ</div>'
            '<div class="tipo-doc">DEPOSIZIONE</div></div>'
            '<dl class="ho-meta"><dt>Persona sentita</dt><dd>' + html.escape(nome) + '</dd>'
            + ruolo_html + '<dt>Data e luogo</dt><dd>____________________________</dd></dl>'
            + paragrafi_html(scheda['deposizione'])
            + '<div class="ho-firma"><span class="riga">firma del dichiarante</span></div>'
            + '</div>')


def informazione_html(traccia, fonte):
    titolo = fonte.get('handoutTitolo') or traccia['nome']
    immagini = ''.join('<img src="../Immagini/'
                      + urllib.parse.quote(nome_allegato(a)) + '" alt="'
                      + html.escape(a.get('nome', ''), quote=True) + '">'
                      for a in traccia.get('allegati', [])
                      if a.get('url') and a.get('uso') != 'scena')
    return ('<div class="ho-foglio ho-doc"><div class="ho-intestazione"><div class="ente">'
            + html.escape(titolo) + '</div><div class="tipo-doc">documento</div></div>'
            + paragrafi_html(fonte.get('versione') or traccia.get('testo', '')) + immagini
            + '</div>')
