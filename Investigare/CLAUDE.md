# Regole per Claude — Progetto Investigare

## REGOLA FONDAMENTALE
Prima di fare modifiche importanti, che cambiano la trama, o se hai dubbi sulla storia, DEVI indicarlo all'utente e chiedere conferma PRIMA di procedere. Non fare assunzioni sulla narrativa: chiedi sempre.

## Contesto
Avventura investigativa per giocatori ESPERTI. Ogni dettaglio deve essere realistico e verificabile. I giocatori controllano ogni cosa.

## Lingua
Tutto il materiale di gioco è in italiano.

## Lore critiche (MAI violare)
- **HIRO NON SA della sterilità** — il referto è stato ritirato da Yui, non comunicato al marito
- Sakura (penna) e Yui (fugu) agiscono INDIPENDENTEMENTE — non sanno del piano dell'altra
- La yakuza NON ha ucciso il giudice — lo controllava tramite debiti, la sua morte è un problema per loro
- Ambientazione 1997: NO internet, NO cellulari per civili comuni (Sakura ha un cellulare perché benestante), cercapersone per polizia, telefoni fissi, fax
- I tiri NON bloccano l'indagine — le prove sono sempre fisicamente presenti e trovabili. I tiri modulano la COMPRENSIONE del personaggio
- Kenta è figlio biologico di Makoto (non di Hiro). Sora è figlio biologico di Shin (non di Makoto)
- La vittima dell'aggressione del 3 febbraio era YUI (scambiata per Sakura)

## Struttura file
- **PNG** (`png/`): schede individuali per ogni NPC. Template obbligatorio con 13 sezioni (DATI BASE, TOKEN, INDIRIZZI, PERSONALITÀ, BACKGROUND, COSA SA, COSA NASCONDE, RELAZIONI, DOVE TROVARLO, COMPORTAMENTO IN INTERROGATORIO, COME PARLA, MECCANICHE, NOTE PER IL MASTER)
- **Luoghi** (`luoghi/`): SOLO descrizioni fisiche, piantine, prove, sicurezza, meccaniche ambientali. NO dialoghi/comportamenti PNG (rimandano alle schede)
- **Handout** (`handout/`): file .md = fonte dati per il GM (con NOTE PER IL MASTER). I file da consegnare ai giocatori sono in `handout/html/` in formato **HTML** con CSS professionale. OGNI handout DEVE avere la versione HTML.
- Vecchi file con prefisso `_` = backup in sottocartelle `_backup/`, non toccare

## Principio di prossimità (IMPORTANTE)
Il narratore NON deve saltare tra documenti diversi durante il gioco. Le informazioni devono stare dove servono, quando servono:
- **Dialoghi e comportamenti dei PNG** → nella scheda del PNG, sezione INTERROGATORIO
- **Tiri suggeriti per scene specifiche** → nel file dove il GM leggerà quella scena (scheda PNG, luogo, ecc.)
- **Meccaniche generali** → nel Regolamento GENKAI
- **NO duplicazioni**: se un'informazione è già nel file giusto, NON copiarla altrove. Metti un riferimento con wikilink.

## Formato Handout HTML
Gli handout HTML in `handout/html/` seguono questo schema:
- `.gm-header` nascosto in stampa (note solo per il GM)
- `.document` con header istituzionale, metadata grid, sezioni
- CSS inline nel `<style>`, font Courier New, formato A4
- Colori header variano per tipo documento (polizia = blu scuro, NTT = blu, banca = verde scuro, medico = bianco, ecc.)
- Numerazione progressiva: `NN_Nome_Documento.html`
