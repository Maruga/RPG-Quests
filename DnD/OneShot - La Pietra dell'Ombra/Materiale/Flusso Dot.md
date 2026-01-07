Per creare o modificare incollare nella parte di sinistra il codice sotto, rimuovere l'esempio.
https://dreampuf.github.io/GraphvizOnline

digraph AvventuraPietraOmbra {
    rankdir=TB;
    bgcolor="transparent";
    node [shape=box, style="rounded,filled", fontname="Arial", fontcolor="white"];
    edge [fontname="Arial", fontsize=10];
    
    // Verde scuro - sicure
    node [fillcolor="#2d5a2d"]
    Prologo [label="01 - Prologo\nScelta PG, Città"];
    Ritorno [label="03 - Viaggio Ritorno\nIncontri Erranti"];
    Citta [label="04 - Ritorno Città\nLocanda, Teletrasporto"];
    
    // Rosso scuro - combattimento
    node [fillcolor="#8b2525"]
    Goblin [label="02 - Stanza Goblin\n4 nemici, Pietra Maledetta"];
    Cripta [label="08B - Cripta\nScheletri + Cavaliere"];
    Ragni [label="09 - Stanza Ragni\nMatriarca + Vedove"];
    
    // Blu scuro - esplorazione/puzzle
    node [fillcolor="#2d4a6d"]
    Buia [label="05 - Stanza Buia\nSilenzio + Buio Magico"];
    Centrale [label="06 - Stanza Centrale\nRipostiglio, Casse"];
    Mago [label="07 - Stanza Mago\nEnigma Gemme, Trappola"];
    ScaleCripta [label="08A - Scale Cripta\nTrappola Scivolo"];
    Segreta [label="08C - Stanza Segreta\nMantello +1, Pergamena"];
    Scale [label="10 - Scale Uscita\nBaule, Portoni"];
    
    // Arancio scuro - pericolo/uscita
    node [fillcolor="#8b5a00"]
    Tentacoli [label="11 - Fossa Tentacoli\nUscita"];
    
    // Giallo scuro - tesoro opzionale
    node [fillcolor="#6b6b00"]
    MagoMorto [label="Mago Morto\n(sott'acqua)\nBaule + Diario"];
    
    // Fine - viola scuro
    node [fillcolor="#4a2d6d", shape=ellipse]
    Fine [label="USCITA\n+ Cliffhanger"];
    
    // Frecce grigie, testo arancione
    edge [color="#666666", fontcolor="#E67300", labeldistance=2.0, minlen=2];
    
    // Flusso principale
    Prologo -> Goblin [xlabel="  in media res  "];
    Goblin -> Ritorno [xlabel="  salvataggio  "];
    Ritorno -> Citta [xlabel="  3-5 giorni  "];
    Citta -> Buia [xlabel="  TELETRASPORTO  ", style=dashed, color="#9932CC"];
    
    // Dungeon del Mago
    Buia -> Centrale [xlabel="  grata + cunicolo  "];
    
    Centrale -> ScaleCripta [xlabel="  porta Nord  "];
    Centrale -> Mago [xlabel="  porta Sud  "];
    
    ScaleCripta -> Cripta [xlabel="  scale/scivolo  "];
    Cripta -> Segreta [xlabel="  porta segreta  ", style=dashed];
    
    Mago -> Scale [xlabel="  enigma risolto  "];
    
    Scale -> Ragni [xlabel="  sinistra  "];
    Scale -> Tentacoli [xlabel="  destra  "];
    
    // Mago morto nell'acqua della stanza ragni
    Ragni -> MagoMorto [xlabel="  acqua  ", style=dashed, color="#2266cc"];
    
    // Collegamento acqua - BLU
    Ragni -> Tentacoli [xlabel="  MORTE CERTA\nFiume  ", style=dotted, color="#2266cc"];
    
    // Uscita
    Tentacoli -> Fine [xlabel="  attraversamento  "];
}