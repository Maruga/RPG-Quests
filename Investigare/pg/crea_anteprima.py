"""
Genera un'anteprima con i dati di Yamamoto Kenji + foto reale.
"""
import os, sys

base_dir = os.path.dirname(__file__)

# Leggi lo script template
with open(os.path.join(base_dir, 'crea_template.py'), 'r', encoding='utf-8') as f:
    script = f.read()

# Dati di Yamamoto
replacements = {
    "{{nome_kanji}}": "山本 健二",
    "{{nome_romanizzato}}": "YAMAMOTO Kenji",
    "{{eta}}": "42",
    "{{ruolo}}": "Capo Squadra Investigativa",
    "{{grado}}": "Ispettore Capo (Keibu)",
    "{{servizio}}": "18 anni",
    "{{distacco_base}}": "6",
    "{{pazienza_base}}": "4",
    "{{silenzio_base}}": "6",
    "{{lucidita_base}}": "6",
    "{{ascolto_base}}": "4",
    "{{presenza_base}}": "5",
    "{{gou_1_nome}}": "Pugno di Ferro 鉄拳",
    "{{gou_1_desc}}": "Pressione psicologica costante e implacabile. Non un momento — un peso che non si toglie.",
    "{{gou_1_attributo}}": "Presenza",
    "{{gou_1_costo}}": "3 Ki",
    "{{gou_1_successo}}": "Il PNG cede su un punto importante — ammette, collabora, si ritira",
    "{{gou_1_fallimento}}": "Il PNG è scosso e sotto pressione, ma non cede",
    "{{gou_2_nome}}": "Teatro delle Ombre 影芝居",
    "{{gou_2_desc}}": "Guardando una scena, vedi le sagome sbiadite di ciò che è accaduto.",
    "{{gou_2_attributo}}": "Lucidità (requisito: ≥ 7)",
    "{{gou_2_costo}}": "4 Ki",
    "{{gou_2_successo}}": "2-3 momenti chiave come sagome sbiadite, nell'ordine giusto, con vuoti. Non volti, non dettagli",
    "{{gou_2_fallimento}}": "Un singolo momento congelato — una sagoma, una posizione, senza prima né dopo",
    "{{gou_3_nome}}": "Lo Spirito che Resta 残心",
    "{{gou_3_desc}}": "La consapevolezza che persiste dopo l'azione. Lo spirito del samurai che non cede.",
    "{{gou_3_attributo}}": "Distacco o Pazienza (dual)",
    "{{gou_3_costo}}": "2 Ki",
    "{{gou_3_successo}}": "Per il resto della scena, 11 e 12 contano come fallimento leggero — non crolli",
    "{{gou_3_fallimento}}": "Solo il 12 è protetto. L'11 resta Nami negativo",
    "{{foto}}": "[FOTO]",
    "{{chi_sei}}": "Sei un veterano rispettato. Hai risolto casi importanti, hai costruito una reputazione solida. Ma la tua vita privata è un disastro. Sei mesi fa tua moglie Yuko ti ha lasciato. Non ci sei mai, ha detto. Aveva ragione. Ora vivi in un piccolo appartamento a Fushimi, con le scatole ancora da disfare. Tuo figlio Takeshi (8 anni) vive con la madre. Il martedì e il giovedì è con te. O dovrebbe esserlo. Il problema: il lavoro viene sempre prima.",
    "{{problema_titolo}}": "LA FAMIGLIA",
    "{{problema_testo}}": "Tua sorella Yamamoto Noriko è stata il tuo supporto durante il divorzio. Ha coperto le tue assenze, ha badato a Takeshi quando tu non potevi. Ma la pazienza di Noriko ha un limite. L'ultima volta che le hai chiesto aiuto, te lo ha detto chiaramente: Non sono la tua baby-sitter di riserva. Devi scegliere cosa conta davvero. Sai che Noriko è stanca. Sai che il rapporto con Takeshi è fragile.",
    "{{png_nome}}": "YAMAMOTO Noriko",
    "{{png_eta}}": "38 anni",
    "{{png_occupazione}}": "Insegnante di ikebana",
    "{{png_relazione}}": "Sorella minore, una volta eravate molto uniti",
    "{{png_vuole}}": "Che tu ammetta di avere un problema. Non singoli episodi — il pattern.",
    "{{png_desc}}": "Non urla. È peggio. Parla con calma, con quella delusione quieta che ferisce più della rabbia. Fa domande scomode.",
    "{{conoscenza_nome}}": "TANAKA Shuichi",
    "{{conoscenza_ruolo}}": "Giornalista al Kyoto Shimbun",
    "{{conoscenza_desc}}": "Vecchio compagno di università. Vi vedete per bere ogni tanto. Accesso agli archivi del giornale, voci di corridoio, contatti nel mondo della stampa.",
    "{{conoscenza_contatto}}": "Cellulare personale. Risponde sempre, anche di notte.",
    "{{conoscenza_costo}}": "Ogni tanto una soffiata, niente di compromettente.",
    "{{conoscenza_limite}}": "Una volta per sessione senza conseguenze. La seconda volta, chiederà qualcosa in cambio.",
    "{{tatemae}}": "Sei il capo. Calmo, competente, rispettato. Non mostri mai debolezza davanti alla squadra.",
    "{{honne}}": "Sei esausto. Ti senti in colpa per Takeshi. A volte ti chiedi se ne vale la pena.",
    "{{frase}}": "Abbiamo un lavoro da fare. Concentriamoci su quello.",
    "{{pressione}}": "Ti chiudi. Parli meno. Diventi più brusco. Non deleghi — fai tutto tu.",
    "{{debolezza}}": "Quando qualcuno mette in dubbio le sue priorità tra lavoro e famiglia.",
    "{{vizio}}": "Caffè nero, almeno sei tazze al giorno.",
    "{{tic}}": "Si massaggia il ponte del naso quando è stanco o frustrato.",
    "{{oggetto}}": "Un orologio Seiko automatico, regalo di suo padre per la promozione.",
    "{{gusto}}": "Udon caldo da un chiosco vicino alla centrale. Sempre lo stesso, sempre in piedi.",
    "{{rituale}}": "Ogni mattina, caffè Boss in lattina al distributore.",
    "{{rapporto_1_nome}}": "HONDA Ryota",
    "{{rapporto_1_testo}}": "Brillante, ma gioca col fuoco. Un giorno si brucerà.",
    "{{rapporto_2_nome}}": "NAKAMURA Shota",
    "{{rapporto_2_testo}}": "Il migliore di noi negli interrogatori. Mi fido di lui più di chiunque altro.",
    "{{rapporto_3_nome}}": "SATO Yuki",
    "{{rapporto_3_testo}}": "Mi ricorda me a quell'età. Spero che non faccia i miei stessi errori.",
    "{{rapporto_4_nome}}": "FUJITA Emi",
    "{{rapporto_4_testo}}": "Competente, riservata, non chiede mai nulla. Questo mi preoccupa.",
}

# Sostituisci placeholder
for key, val in replacements.items():
    script = script.replace(key, val)

# Output diverso
script = script.replace("TEMPLATE_Scheda_PG.docx", "ANTEPRIMA_Yamamoto_Kenji.docx")

# Forza il percorso immagine
image_path = os.path.join(base_dir, "Immagini", "PG_01_Yamamoto_Kenji_foto.png")
script = script.replace(
    "IMAGE_PATH = sys.argv[1] if len(sys.argv) > 1 else None",
    f'IMAGE_PATH = r"{image_path}"'
)

# Esegui
temp_path = os.path.join(base_dir, '_temp_anteprima.py')
with open(temp_path, 'w', encoding='utf-8') as f:
    f.write(script)

exec(compile(open(temp_path, encoding='utf-8').read(), temp_path, 'exec'))
os.remove(temp_path)
