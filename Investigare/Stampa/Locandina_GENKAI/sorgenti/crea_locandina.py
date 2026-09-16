from pathlib import Path
import json
import fitz
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader

HERE = Path(__file__).resolve().parent
OUT = HERE.parent
FONTS = Path('C:/Windows/Fonts')
for name, filename in [('Display','impact.ttf'),('Body','arial.ttf'),('Bold','arialbd.ttf'),('Italic','georgiai.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(FONTS / filename)))

W, H = 595.2756, 841.8898
INK = '#172328'
CREAM = '#F2EEE5'
RED = '#A22F30'
MUTED = '#566165'

def create_pdf(path, scale=1):
    c = canvas.Canvas(str(path), pagesize=(W*scale,H*scale))
    c.setTitle('GENKAI — Tre casi. Il tuo limite.')
    c.setAuthor('Clod Maru Bart')
    c.setSubject('Gioco di ruolo investigativo inedito — Non torna, Sake, Tanto rumore')
    c.scale(scale, scale)

    def rect(x,y,w,h,color):
        c.setFillColor(HexColor(color)); c.rect(x,H-y-h,w,h,stroke=0,fill=1)

    def text(s,x,y,size=11,font='Body',color=INK,tracking=0):
        c.setFillColor(HexColor(color))
        t=c.beginText(x,H-y); t.setFont(font,size); t.setCharSpace(tracking); t.textOut(s); c.drawText(t)

    def line(y,x=34,end=W-34,color='#C8C7BD'):
        c.setStrokeColor(HexColor(color)); c.setLineWidth(.65); c.line(x,H-y,end,H-y)

    rect(0,0,W,H,CREAM)
    c.drawImage(str(HERE/'kyoto_noir.png'),0,H-W*2/3,width=W,height=W*2/3)
    # The generated key art remains intact; typography is a separate PDF layer.
    rect(34,23,225,20,RED)
    text('UN GIOCO DI RUOLO INEDITO',44,37,9,'Bold',CREAM,1.0)
    text('GENKAI',30,124,93,'Display',CREAM,1.7)
    text('I L  L I M I T E',36,149,12,'Bold',CREAM)
    text('KYOTO, 1997',36,174,10,'Bold',CREAM,1.3)
    text('La verità ha un prezzo.',34,285,24,'Italic',CREAM)
    text('Quanto sei disposto a pagare?',35,312,15,'Body',CREAM)

    rect(0,348,W,H-348,CREAM)
    rect(0,348,W,5,RED)
    text('INVESTIGAZIONE  /  RELAZIONI  /  PRESSIONE',34,378,9,'Bold',RED,1.05)
    text('TRE CASI. IL TUO LIMITE.',34,410,28,'Display',INK,.5)
    text('Osserva, interroga, collega gli indizi.',35,432,11,'Body')
    text('I dadi decidono quanto ti costa affrontare la verità.',35,448,11,'Body')
    # Reuse the author's existing mark, without changing its pixels.
    c.drawImage(str(HERE/'genkai_logo.png'),W-124,H-459,width=92,height=92,mask='auto')

    line(466)
    text('01',34,496,22,'Display',RED)
    text('NON TORNA',77,497,25,'Display')
    rect(77,507,251,19,RED)
    text('1 GIOCATORE + MASTER  ·  30–45 MINUTI',85,520,9,'Bold',CREAM)
    text('Un uomo morto in casa. Un apparente incidente.',77,544,10.5)
    text('Qualcosa non torna. Tocca a te capire cosa.',77,559,10.5)

    line(576)
    text('02',34,606,22,'Display',RED)
    text('SAKE',77,607,25,'Display')
    text('L’ultima cena di Tanaka',144,607,11,'Italic',MUTED)
    text('TUTTO IN UNA NOTTE  ·  INDAGINE E INTRECCI',77,629,9,'Bold',RED,.2)
    text('Una festa in villa. Il padrone di casa trovato morto.',77,652,10.5)
    text('Segreti, alibi e relazioni da ricostruire, una voce alla volta.',77,667,10.5)

    line(684)
    text('03',34,714,22,'Display',RED)
    text('TANTO RUMORE',77,715,25,'Display')
    text('INDAGINE E COMBATTIMENTO',77,737,9,'Bold',RED,.2)
    text('Un ragazzo ucciso. Testimoni che hanno paura di parlare.',77,760,10.5)
    text('Segui le tracce. Quando arriva lo scontro, ogni scelta pesa.',77,775,10.5)

    rect(0,795,W,H-795,INK)
    text('SIEDITI AL TAVOLO. APRI IL CASO.',34,822,18,'Display',CREAM,.4)
    text('Un gioco di',435,811,8,'Body',CREAM)
    text('Clod Maru Bart',435,827,12,'Bold',CREAM)
    c.showPage(); c.save()

create_pdf(OUT/'GENKAI_Locandina_A4.pdf')
create_pdf(OUT/'GENKAI_Locandina_A3.pdf',2**.5)
doc=fitz.open(OUT/'GENKAI_Locandina_A4.pdf')
doc[0].get_pixmap(dpi=200,alpha=False).save(str(OUT/'GENKAI_Locandina.png'))
doc[0].get_pixmap(dpi=100,alpha=False).save(str(HERE/'anteprima.png'))
print('Created A4 / A3 PDFs and PNG.')
print(doc[0].get_text())
