#!/usr/bin/env python3
"""Fix missing Italian accents in NPC markdown files."""

import os
import re
import glob

PNG_DIR = r"C:\Public\_Clienti\Maruga\Giochi\Vampiri\Vault\Vampiri\Investigare\png"

def apply_word_replacements(text, word_map):
    """Replace words using word boundaries, handling lowercase, capitalized, and uppercase."""
    for word, accented in word_map.items():
        # Lowercase
        text = re.sub(r'\b' + word + r'\b', accented, text)
        # Capitalized (first letter upper)
        cap_word = word[0].upper() + word[1:]
        cap_accented = accented[0].upper() + accented[1:]
        text = re.sub(r'\b' + cap_word + r'\b', cap_accented, text)
        # Full uppercase
        text = re.sub(r'\b' + word.upper() + r'\b', accented.upper(), text)
    return text


def fix_accents(text):
    """Apply all accent fixes to text."""

    # ============================================================
    # PHASE 1: Words ending in -tà (abstract nouns)
    # ============================================================
    ta_words = {
        'eta': 'età',
        'personalita': 'personalità',
        'citta': 'città',
        'realta': 'realtà',
        'verita': 'verità',
        'liberta': 'libertà',
        'qualita': 'qualità',
        'societa': 'società',
        'volonta': 'volontà',
        'abilita': 'abilità',
        'identita': 'identità',
        'capacita': 'capacità',
        'responsabilita': 'responsabilità',
        'possibilita': 'possibilità',
        'difficolta': 'difficoltà',
        'necessita': 'necessità',
        'fedelta': 'fedeltà',
        'lealta': 'lealtà',
        'onesta': 'onestà',
        'crudelta': 'crudeltà',
        'curiosita': 'curiosità',
        'sanita': 'sanità',
        'umilta': 'umiltà',
        'integrita': 'integrità',
        'dignita': 'dignità',
        'autorita': 'autorità',
        'serieta': 'serietà',
        'poverta': 'povertà',
        'facolta': 'facoltà',
        'oscurita': 'oscurità',
        'complessita': 'complessità',
        'novita': 'novità',
        'mentalita': 'mentalità',
        'normalita': 'normalità',
        'probabilita': 'probabilità',
        'tranquillita': 'tranquillità',
        'paternita': 'paternità',
        'maternita': 'maternità',
        'sterilita': 'sterilità',
        'fertilita': 'fertilità',
        'finalita': 'finalità',
        'continuita': 'continuità',
        'sensibilita': 'sensibilità',
        'vulnerabilita': 'vulnerabilità',
        'stabilita': 'stabilità',
        'brutalita': 'brutalità',
        'criminalita': 'criminalità',
        'pieta': 'pietà',
        'utilita': 'utilità',
        'inutilita': 'inutilità',
        'peculiarita': 'peculiarità',
        'intensita': 'intensità',
        'familiarita': 'familiarità',
        'attivita': 'attività',
        'passivita': 'passività',
        'eredita': 'eredità',
        'serenita': 'serenità',
        'felicita': 'felicità',
        'infelicita': 'infelicità',
        'complicita': 'complicità',
        'universita': 'università',
        'opportunita': 'opportunità',
        'spietatezza': 'spietatezza',  # no accent needed, but just in case
        'reperibilita': 'reperibilità',
        'credibilita': 'credibilità',
        'affidabilita': 'affidabilità',
        'impunita': 'impunità',
        'casualita': 'casualità',
        'pericolosita': 'pericolosità',
        'fragilita': 'fragilità',
        'ostilita': 'ostilità',
        'umanita': 'umanità',
        'priorita': 'priorità',
        'localita': 'località',
        'nazionalita': 'nazionalità',
        'personalita': 'personalità',
        'neutralita': 'neutralità',
        'severita': 'severità',
        'sincerita': 'sincerità',
        'generosita': 'generosità',
        'notorieta': 'notorietà',
        'proprieta': 'proprietà',
        'varieta': 'varietà',
        'celebrita': 'celebrità',
        'quantita': 'quantità',
        'velocita': 'velocità',
        'sicurta': 'sicurtà',
        'raggiungibilita': 'raggiungibilità',
        'accessibilita': 'accessibilità',
        'disponibilita': 'disponibilità',
        'compatibilita': 'compatibilità',
        'responsabilita': 'responsabilità',
        'irreperibilita': 'irreperibilità',
        'visibilita': 'visibilità',
        'invisibilita': 'invisibilità',
        'plausibilita': 'plausibilità',
        'affidabilita': 'affidabilità',
        'mortalita': 'mortalità',
        'immortalita': 'immortalità',
        'fatalita': 'fatalità',
        'banalita': 'banalità',
        'brutalita': 'brutalità',
        'legittimita': 'legittimità',
        'puntualita': 'puntualità',
        'attualita': 'attualità',
        'eventualita': 'eventualità',
        'possibilita': 'possibilità',
        'impossibilita': 'impossibilità',
        'probabilita': 'probabilità',
        'improbabilita': 'improbabilità',
        'criminalita': 'criminalità',
        'personalita': 'personalità',
        'originalita': 'originalità',
        'nazionalita': 'nazionalità',
        'nazionalita': 'nazionalità',
        'specialita': 'specialità',
        'ospitalita': 'ospitalità',
        'vitalita': 'vitalità',
        'totalita': 'totalità',
        'casualita': 'casualità',
        'sessualita': 'sessualità',
        'spiritualita': 'spiritualità',
        'individualita': 'individualità',
        'municipalita': 'municipalità',
        'riservatezza': 'riservatezza',  # no accent, but added for safety
    }
    text = apply_word_replacements(text, ta_words)

    # ============================================================
    # PHASE 2: Words ending in -ù
    # ============================================================
    u_words = {
        'piu': 'più',
        'virtu': 'virtù',
        'gioventu': 'gioventù',
        'lassu': 'lassù',
        'quassu': 'quassù',
        'laggu': 'laggiù',
    }
    text = apply_word_replacements(text, u_words)

    # ============================================================
    # PHASE 3: Words with -é (perché, etc.)
    # ============================================================
    e_acute_words = {
        'perche': 'perché',
        'finche': 'finché',
        'affinche': 'affinché',
        'nonche': 'nonché',
        'benche': 'benché',
        'poiche': 'poiché',
        'giacche': 'giacché',
        'macche': 'macché',
        'sicche': 'sicché',
        'purche': 'purché',
        'cosicche': 'cosicché',
        'allorche': 'allorché',
    }
    text = apply_word_replacements(text, e_acute_words)

    # ============================================================
    # PHASE 4: Words ending in -ò
    # ============================================================
    o_words = {
        'pero': 'però',
        'cio': 'ciò',
    }
    text = apply_word_replacements(text, o_words)

    # ============================================================
    # PHASE 5: Common words with -ì
    # ============================================================
    i_words = {
        'cosi': 'così',
    }
    text = apply_word_replacements(text, i_words)

    # ============================================================
    # PHASE 6: Common words with -à (not -tà pattern)
    # ============================================================
    a_words = {
        'gia': 'già',
    }
    text = apply_word_replacements(text, a_words)

    # ============================================================
    # PHASE 7: Future tense verbs (3rd person singular, ending in -à)
    # ============================================================
    future_verbs = {
        'sara': 'sarà',
        'avra': 'avrà',
        'potra': 'potrà',
        'dovra': 'dovrà',
        'vorra': 'vorrà',
        'fara': 'farà',
        'dira': 'dirà',
        'andra': 'andrà',
        'verra': 'verrà',
        'dara': 'darà',
        'stara': 'starà',
        'restera': 'resterà',
        'trovera': 'troverà',
        'ricevera': 'riceverà',
        'morira': 'morirà',
        'finira': 'finirà',
        'portera': 'porterà',
        'prendera': 'prenderà',
        'perdera': 'perderà',
        'vedra': 'vedrà',
        'sapra': 'saprà',
        'chiudera': 'chiuderà',
        'aprira': 'aprirà',
        'uscira': 'uscirà',
        'cambiera': 'cambierà',
        'sembrera': 'sembrerà',
        'parlera': 'parlerà',
        'rispondera': 'risponderà',
        'cerchera': 'cercherà',
        'rivelera': 'rivelerà',
        'fornira': 'fornirà',
        'servira': 'servirà',
        'capira': 'capirà',
        'bastera': 'basterà',
        'chiamera': 'chiamerà',
        'succedera': 'succederà',
        'convincera': 'convincerà',
        'reagira': 'reagirà',
        'attirara': 'attirerà',
        'rendera': 'renderà',
        'terra': 'terrà',  # careful - "terra" means "earth". But "terrà" = will hold
        # SKIP "terra" - too ambiguous. "terra" (earth) is very common.
        'ottera': 'otterrà',
        'cadra': 'cadrà',
        'rimarra': 'rimarrà',
        'diventera': 'diventerà',
        'continuera': 'continuerà',
        'lascera': 'lascerà',
        'aiutera': 'aiuterà',
        'permettera': 'permetterà',
        'cedera': 'cederà',
        'scoprira': 'scoprirà',
        'decidera': 'deciderà',
        'chiedera': 'chiederà',
        'offrira': 'offrirà',
        'mandera': 'manderà',
        'provera': 'proverà',
        'costera': 'costerà',
        'comprera': 'comprerà',
        'tornera': 'tornerà',
        'entrera': 'entrerà',
        'credera': 'crederà',
        'aspettera': 'aspetterà',
        'ricordera': 'ricorderà',
        'notera': 'noterà',
        'considerera': 'considererà',
        'mostrera': 'mostrerà',
        'accettera': 'accetterà',
        'rifiutera': 'rifiuterà',
        'iniziera': 'inizierà',
        'causera': 'causerà',
        'provochera': 'provocherà',
        'produrra': 'produrrà',
        'condurra': 'condurrà',
        'distruggera': 'distruggerà',
        'costruira': 'costruirà',
        'agira': 'agirà',
    }
    # Remove "terra" if present - it's ambiguous
    future_verbs.pop('terra', None)
    text = apply_word_replacements(text, future_verbs)

    # ============================================================
    # PHASE 8: Contractions with è (always "is", never "and")
    # ============================================================
    # c'è (there is)
    text = re.sub(r"c'e\b", "c'è", text)
    text = re.sub(r"C'e\b", "C'è", text)
    # com'è (how is)
    text = re.sub(r"[Cc]om'e\b", lambda m: m.group(0).replace("e", "è"), text)
    # dov'è (where is)
    text = re.sub(r"[Dd]ov'e\b", lambda m: m.group(0).replace("e", "è"), text)
    # cos'è (what is)
    text = re.sub(r"[Cc]os'e\b", lambda m: m.group(0).replace("e", "è"), text)
    # qual è (which is)
    text = re.sub(r"\b([Qq]ual) e\b", r"\1 è", text)
    # tutt'è (rare but possible)

    # ============================================================
    # PHASE 9: "non è" pattern (always "is not")
    # ============================================================
    text = re.sub(r"\b([Nn]on) e\b", r"\1 è", text)

    # ============================================================
    # PHASE 10: Standalone "è" patterns with high confidence
    # ============================================================
    # " e " after common subjects, where it clearly means "is"
    # Pattern: [word that is clearly a subject] + " e " + [continuation]
    # These patterns are context-dependent but highly reliable

    # "questo/a è", "quello/a è"
    text = re.sub(r'\b(questo|questa|quello|quella|ciascuno|ciascuna|ognuno|ognuna|chiunque) e\b',
                  lambda m: m.group(1) + ' è', text, flags=re.IGNORECASE)

    # "chi è", "cosa è"
    text = re.sub(r'\b(chi|cosa) e\b',
                  lambda m: m.group(1) + ' è', text, flags=re.IGNORECASE)

    # "tutto è", "nulla è", "niente è", "nessuno è"
    text = re.sub(r'\b(tutto|nulla|niente|nessuno|nessuna) e\b',
                  lambda m: m.group(1) + ' è', text, flags=re.IGNORECASE)

    # "dove è" (when not contracted)
    text = re.sub(r'\b([Dd]ove) e\b', r'\1 è', text)

    # "come è" (when not contracted)
    text = re.sub(r'\b([Cc]ome) e\b', r'\1 è', text)

    # ============================================================
    # PHASE 11: Common phrases with "è"
    # ============================================================
    # "e il/la/lo/un/una/l'" after comma or sentence start — usually "è"
    # But "marito e la moglie" = "husband and the wife" — AMBIGUOUS
    # Skip this - too risky

    # "Se e " → "Se è " (if is)
    # Hmm, "se e" could be "if and" though unlikely
    # Skip

    # ============================================================
    # PHASE 12: "né...né" pattern (neither...nor)
    # ============================================================
    # When "ne" appears multiple times in a phrase with commas/conjunctions,
    # it means "neither...nor" and needs the accent.
    # Pattern: "ne [word], ne [word]" or "ne [word] ne [word]"
    # Also: "ne della", "ne del", "ne di" in sequences
    def fix_ne_in_line(line):
        """Fix 'ne' → 'né' when used as neither/nor in a line."""
        # Count standalone "ne " occurrences
        ne_count = len(re.findall(r'\bne\b', line))
        if ne_count >= 2:
            # Multiple "ne" in same line = likely né...né
            line = re.sub(r'\bne\b', 'né', line)
            line = re.sub(r'\bNe\b', 'Né', line)
        return line

    lines = text.split('\n')
    text = '\n'.join(fix_ne_in_line(line) for line in lines)

    # ============================================================
    # PHASE 13: Standalone "è" at sentence boundaries
    # ============================================================
    # After period+space or start of line, "E " followed by common continuations
    # "E un/una/il/la/lo/l'/stato/stata/molto/poco/troppo/quasi/sempre/mai"
    e_continuations = (
        'un ', 'una ', 'il ', 'la ', 'lo ', "l'",
        'stato ', 'stata ', 'molto ', 'poco ', 'troppo ',
        'quasi ', 'sempre ', 'mai ', 'anche ', 'solo ',
        'proprio ', 'questo ', 'questa ', 'quello ', 'quella ',
        'possibile', 'impossibile', 'necessario', 'importante',
        'evidente', 'chiaro', 'vero', 'falso', 'probabile',
        'inutile', 'utile', 'facile', 'difficile',
        'morto', 'morta', 'vivo', 'viva',
        'lui', 'lei',
    )

    for cont in e_continuations:
        # After ". E [continuation]" → ". È [continuation]"
        text = re.sub(r'\. E ' + re.escape(cont), '. È ' + cont, text)
        # After newline "E [continuation]" at line start
        text = re.sub(r'\nE ' + re.escape(cont), '\nÈ ' + cont, text)
        # After "— E " or "- E "
        text = re.sub(r'— E ' + re.escape(cont), '— È ' + cont, text)
        text = re.sub(r'- E ' + re.escape(cont), '- È ' + cont, text)

    # ============================================================
    # PHASE 14: " e " between subject and adjective/predicate patterns
    # ============================================================
    # "[word] e [adjective]" where it clearly means "is"
    # Safe patterns: after negation already handled, after demonstratives already handled
    # Add: after possessives
    text = re.sub(r'\b(suo|sua|loro) e\b',
                  lambda m: m.group(1) + ' è', text, flags=re.IGNORECASE)

    # "ancora e" → "ancora è"  (still is)
    text = re.sub(r'\b(ancora) e\b', r'\1 è', text, flags=re.IGNORECASE)

    # ============================================================
    # PHASE 15: "e" + past participle = "è" (compound tenses)
    # ============================================================
    past_participles = [
        'stato', 'stata', 'stati', 'state',
        'andato', 'andata', 'andati', 'andate',
        'venuto', 'venuta', 'venuti', 'venute',
        'arrivato', 'arrivata', 'arrivati',
        'entrato', 'entrata', 'entrati',
        'uscito', 'uscita', 'usciti',
        'tornato', 'tornata', 'tornati',
        'morto', 'morta', 'morti',
        'nato', 'nata', 'nati',
        'intervenuto', 'intervenuta', 'intervenuti',
        'successo', 'diventato', 'diventata',
        'rimasto', 'rimasta', 'rimasti',
        'cresciuto', 'cresciuta',
        'riuscito', 'riuscita',
        'caduto', 'caduta',
        'scomparso', 'scomparsa',
        'comparso', 'comparsa',
        'sceso', 'scesa',
        'salito', 'salita',
        'passato', 'passata',
        'cambiato', 'cambiata',
        'cominciato', 'cominciata',
        'iniziato', 'iniziata',
        'finito', 'finita',
        'accaduto', 'accaduta',
        'avvenuto', 'avvenuta',
        'durato', 'durata',
        'bastato', 'bastata',
        'servito', 'servita',
        'costato', 'costata',
        'piaciuto', 'piaciuta',
        'sembrato', 'sembrata',
        'fuggito', 'fuggita',
        'sparito', 'sparita',
        'scoperto', 'scoperta',
        'coperto', 'coperta',
        'aperto', 'aperta',
        'chiuso', 'chiusa',
        'rotto', 'rotta',
        'scritto', 'scritta',
        'detto', 'detta',
        'fatto', 'fatta',
        'messo', 'messa',
        'preso', 'presa',
        'perso', 'persa',
        'visto', 'vista',
        'vissuto', 'vissuta',
        'letto', 'letta',
        'seduto', 'seduta',
        'corso', 'corsa',
        'deciso', 'decisa',
        'ucciso', 'uccisa',
        'commesso', 'commessa',
        'connesso', 'connessa',
        'compreso', 'compresa',
        'coinvolto', 'coinvolta',
        'convinto', 'convinta',
        'costruito', 'costruita',
        'distrutto', 'distrutta',
        'emerso', 'emersa',
        'escluso', 'esclusa',
        'incluso', 'inclusa',
        'esposto', 'esposta',
        'nascosto', 'nascosta',
        'proposto', 'proposta',
        'disposto', 'disposta',
        'supposto', 'supposta',
        'imposto', 'imposta',
        'opposto', 'opposta',
        'assunto', 'assunta',
        'presunto', 'presunta',
        'distinto', 'distinta',
        'estinto', 'estinta',
        'aggiunto', 'aggiunta',
        'giunto', 'giunta',
        'raggiunto', 'raggiunta',
        'trascorso', 'trascorsa',
        'crollato', 'crollata',
        'peggiorato', 'peggiorata',
        'migliorato', 'migliorata',
        'aumentato', 'aumentata',
        'diminuito', 'diminuita',
        'arrestato', 'arrestata',
        'condannato', 'condannata',
        'accusato', 'accusata',
        'assolto', 'assolta',
        'rilasciato', 'rilasciata',
        'trasferito', 'trasferita',
        'confermato', 'confermata',
        'negato', 'negata',
        'verificato', 'verificata',
        'collegato', 'collegata',
        'associato', 'associata',
    ]
    for pp in past_participles:
        # lowercase "e" + past participle
        text = re.sub(r'\be ' + pp + r'\b', 'è ' + pp, text)
        # uppercase "E" at start of sentence + capitalized past participle
        # (This is rarer but possible)

    # ============================================================
    # PHASE 16: Specific multi-word patterns unique to these files
    # ============================================================
    text = text.replace('**Eta**', '**Età**')
    text = text.replace('**Personalita**', '**Personalità**')
    text = text.replace('**Raggiungibilita**', '**Raggiungibilità**')
    text = text.replace('**Reperibilita**', '**Reperibilità**')
    text = text.replace('**Disponibilita**', '**Disponibilità**')

    return text


def process_file(filepath):
    """Process a single file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    fixed = fix_accents(original)

    if fixed != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(fixed)
        # Count changes
        changes = sum(1 for a, b in zip(original, fixed) if a != b)
        return changes
    return 0


def main():
    # Find all NPC files + location files + handout files
    pattern_png = os.path.join(PNG_DIR, "[A-Z]*.md")
    luoghi_dir = os.path.join(os.path.dirname(PNG_DIR), "luoghi")
    pattern_luoghi = os.path.join(luoghi_dir, "[A-Z]*.md")
    handout_dir = os.path.join(os.path.dirname(PNG_DIR), "handout")
    pattern_handout = os.path.join(handout_dir, "[A-Z]*.md")
    files = glob.glob(pattern_png) + glob.glob(pattern_luoghi) + glob.glob(pattern_handout)

    print(f"Found {len(files)} NPC files to process.")

    total_changes = 0
    for filepath in sorted(files):
        filename = os.path.basename(filepath)
        changes = process_file(filepath)
        if changes > 0:
            print(f"  Fixed {changes:4d} chars in {filename}")
        else:
            print(f"  No changes in {filename}")
        total_changes += changes

    print(f"\nTotal: {total_changes} character changes across {len(files)} files.")


if __name__ == '__main__':
    main()
