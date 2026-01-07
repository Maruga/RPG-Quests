digraph CronacaFlusso {
    // Impostazioni per layout pulito
    graph [overlap=false, splines=true, sep="+25,25", nodesep=1.0];
    node [shape=box, style="rounded,filled", fontname="Arial", fontsize=11];
    edge [fontname="Arial", fontsize=9];
    
    // === FLUSSO PRINCIPALE ===
    
    // INIZIO
    START [label="NOTTE 1\nBriefing Bottonaia", fillcolor="#90EE90", shape=ellipse, width=2];
    
    // LOCATION PRINCIPALI - disposte in linea
    RIMINI [label="RIMINI", fillcolor="#00BFFF", width=1.5, height=0.8];
    BOLOGNA [label="BOLOGNA", fillcolor="#00BFFF", width=1.5, height=0.8];
    PERUGIA [label="PERUGIA", fillcolor="#00BFFF", width=1.5, height=0.8];
    SIENA [label="SIENA", fillcolor="#00BFFF", width=1.5, height=0.8];
    FIRENZE [label="FIRENZE\n(Pericoloso)", fillcolor="#FF6B6B", width=1.5, height=0.8];
    MILANO [label="MILANO\nNOTTE 12", fillcolor="#90EE90", width=1.5, height=0.8];
    
    // Collegamenti location
    START -> RIMINI [label="Inizio"];
    RIMINI -> BOLOGNA [label="1 notte"];
    BOLOGNA -> PERUGIA [label="1 notte"];
    BOLOGNA -> FIRENZE [label="1 notte", style=dashed];
    PERUGIA -> SIENA [label="½ notte"];
    FIRENZE -> SIENA [label="½ notte", style=dashed];
    SIENA -> MILANO [label="Finale"];
    PERUGIA -> MILANO [style=dashed];
    
    // === RIMINI - PNG ===
    R_custode [label="Il Custode\n(Nosferatu)", fillcolor="#FFA500"];
    R_clara [label="Clara\n(Ghoul Enzo)", fillcolor="#FFA500"];
    R_enzo [label="ENZO\n(IL KILLER)", fillcolor="#DC143C", fontcolor=white];
    R_filmato [label="⚑ Filmato\nStazione", fillcolor="#DDA0DD"];
    
    RIMINI -> R_custode;
    RIMINI -> R_clara;
    RIMINI -> R_enzo [color=red];
    R_custode -> R_filmato;
    R_clara -> R_filmato [label="Info viaggio", style=dotted];
    
    // === BOLOGNA - PNG ===
    B_corsini [label="Principe\nCorsini", fillcolor="#FFA500"];
    B_sofia [label="Sofia\nMarini", fillcolor="#FFA500"];
    B_fabio [label="Fabio\n(Ghoul)", fillcolor="#FFA500"];
    B_rifugio [label="Rifugio\nMarcello", fillcolor="#A9A9A9"];
    B_appunti [label="⚑ Appunti\n'V.Aldrani 1984'", fillcolor="#DDA0DD"];
    B_chiave [label="⚑ Chiave\nrifugio Corvo", fillcolor="#DDA0DD"];
    B_indizi [label="⚑ 'Regina\nmangia lupo'", fillcolor="#DDA0DD"];
    B_lisandro_info [label="⚑ Nome\n'Lisandro'", fillcolor="#DDA0DD"];
    
    BOLOGNA -> B_corsini;
    B_corsini -> B_rifugio;
    B_corsini -> B_sofia;
    BOLOGNA -> B_fabio [label="Pensione"];
    B_rifugio -> B_appunti;
    B_rifugio -> B_chiave;
    B_sofia -> B_indizi;
    B_fabio -> B_lisandro_info;
    
    // Eventi critici Bologna
    EV_sofia [label="⚠ NOTTE 3\nSofia FUGGE", fillcolor="#FF0000", fontcolor=white, shape=octagon];
    EV_fabio [label="⚠ NOTTE 5\nFabio MUORE", fillcolor="#FF0000", fontcolor=white, shape=octagon];
    B_sofia -> EV_sofia [style=dashed, color=red];
    B_fabio -> EV_fabio [style=dashed, color=red];
    
    // === PERUGIA - PNG ===
    P_lisandro [label="LISANDRO\n(TESTIMONE)", fillcolor="#FFD700", style="filled,bold"];
    P_aurelio [label="Don Aurelio\n(Ostacolo)", fillcolor="#FFA500"];
    P_testimonianza [label="★ PROVA\nTestimonianza\nAmaranto", fillcolor="#BA55D3", fontcolor=white];
    P_anello [label="⚑ Anello\ndi Corvo", fillcolor="#DDA0DD"];
    
    PERUGIA -> P_lisandro;
    PERUGIA -> P_aurelio;
    P_lisandro -> P_testimonianza;
    P_lisandro -> P_anello;
    
    // Collegamenti verso Perugia
    B_lisandro_info -> PERUGIA [label="porta a", style=dotted, color=purple];
    B_indizi -> PERUGIA [label="'Grifoni'", style=dotted, color=purple];
    
    // Evento critico Perugia
    EV_lisandro [label="⚠ NOTTE 10\nLisandro FUGGE", fillcolor="#FF0000", fontcolor=white, shape=octagon];
    P_lisandro -> EV_lisandro [style=dashed, color=red];
    
    // === SIENA - PNG ===
    S_silvestro [label="Padre\nSilvestro", fillcolor="#FFA500"];
    S_rifugio [label="Rifugio\ndi Corvo", fillcolor="#A9A9A9"];
    S_diario [label="★ PROVA\nDiario Corvo", fillcolor="#BA55D3", fontcolor=white];
    S_ritratto [label="⚑ Ritratto\nVittoria", fillcolor="#DDA0DD"];
    
    SIENA -> S_silvestro;
    SIENA -> S_rifugio;
    S_silvestro -> S_rifugio [label="indicazioni"];
    B_chiave -> S_rifugio [label="apre", style=dotted, color=purple];
    S_rifugio -> S_diario;
    S_rifugio -> S_ritratto;
    
    // Evento critico Siena
    EV_siena [label="⚠ NOTTE 11\nProve DISTRUTTE", fillcolor="#FF0000", fontcolor=white, shape=octagon];
    S_rifugio -> EV_siena [style=dashed, color=red];
    
    // === FIRENZE - PNG ===
    F_vittoria [label="VITTORIA\n(ANTAGONISTA)", fillcolor="#8B0000", fontcolor=white];
    F_giulia [label="Giulia\n(da Notte 8)", fillcolor="#FFA500"];
    F_archivio [label="Archivio\nCorte", fillcolor="#A9A9A9"];
    F_false [label="⚠ False Piste", fillcolor="#FFB6C1"];
    F_info_giulia [label="⚑ Info su\nEnzo", fillcolor="#DDA0DD"];
    F_doc [label="⚑ Nessun sire\n'Rodrigo'", fillcolor="#DDA0DD"];
    
    FIRENZE -> F_vittoria [color=red];
    FIRENZE -> F_giulia;
    FIRENZE -> F_archivio;
    F_vittoria -> F_false;
    F_giulia -> F_info_giulia;
    F_archivio -> F_doc;
    
    // Evento Giulia
    EV_giulia [label="⚠ NOTTE 10\nGiulia ELIMINATA", fillcolor="#FF0000", fontcolor=white, shape=octagon];
    F_giulia -> EV_giulia [style=dashed, color=red];
    
    // === AGGUATO ===
    AGGUATO [label="⚔ AGGUATO\nEnzo + 3 ghoul\nNotte 6 o 9", fillcolor="#FF0000", fontcolor=white, shape=doubleoctagon];
    R_enzo -> AGGUATO [color=red, penwidth=2];
    
    AGG_cattura [label="Catturano\nEnzo", fillcolor="#90EE90"];
    AGG_confessione [label="★ PROVA\nConfessione", fillcolor="#BA55D3", fontcolor=white];
    
    AGGUATO -> AGG_cattura [label="Vincono"];
    AGG_cattura -> AGG_confessione;
    
    // === FINALE ===
    FINALE [label="Presentazione\nProve", shape=diamond, fillcolor="#FFFF00", width=1.5];
    
    FIN_pos [label="✓ VITTORIA\n3+ Prove\nDebito saldato\nBoon per PG", fillcolor="#228B22", fontcolor=white];
    FIN_par [label="~ PARZIALE\n2 Prove\nDebito saldato\nNo bonus", fillcolor="#FFD700"];
    FIN_neg [label="✗ FALLIMENTO\n0-1 Prove\nDebito NON saldato", fillcolor="#8B0000", fontcolor=white];
    
    MILANO -> FINALE;
    FINALE -> FIN_pos [label="3+"];
    FINALE -> FIN_par [label="2"];
    FINALE -> FIN_neg [label="0-1"];
    
    // Prove verso finale
    P_testimonianza -> FINALE [style=dotted, color=purple];
    S_diario -> FINALE [style=dotted, color=purple];
    AGG_confessione -> FINALE [style=dotted, color=purple];
    P_anello -> FINALE [style=dotted, color=purple];
    F_info_giulia -> FINALE [style=dotted, color=purple];
    F_doc -> FINALE [style=dotted, color=purple];
}
