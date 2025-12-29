---
Giocatore: Narratore
Nome: Mauro
Cronaca: La schiatta de’ Montefeltro  
Tipo: PG
Specie: Vampiro  
Natura: Rivoluzionario  
Carattere: Impulsivo  
Clan: Brujah
LineaDiSangue: —
Generazione: 13
DifettoDelClan: Rabbia incontrollata
Soprannome: Croce
Affiliazione: Anarchico
EtaUmanaTrasformazione: 28 anni
EtaVampiricaAttuale: circa 20 anni  
Forza: 3
Destrezza: 3
Costituzione: 2
Carisma: 2
Persuasione: 2
Aspetto: 2
Percezione: 2
Intelligenza: 2
Prontezza: 3
Atletica: 2
Autorita: 1
ConoscenzaDiStrada: 2
Empatia: 1
Espressivita: 1
Intimidire: 3
Rissa: 3
Schivare: 2
SestoSenso: 1
Sotterfugio: 1
AddestrareAnimali: 0
ArmiDaFuoco: 1
EspressioneArtistica: 0
Furtivita: 1
Galateo: 0
Guidare: 1
Manualita: 0
Mischia: 2
Sicurezza: 0
Sopravvivenza: 1
Accademiche: 0
Finanza: 0
Informatica: 0
Investigare: 0
Legge: 0
Linguistica: 0
Medicina: 0
Occulto: 1
Politica: 1
Scienze: 0
Animalita: 0
Auspex: 0
Celerita: 0
DemenTazione: 0
DominaZione: 0
Robustezza: 1
Ofuscazione: 0
Potenza: 1
Presenza: 1
Proteide: 0
Taumaturgia: 0
Velocita: 1
CoscienzaConvinzione: 2
AutocontrolloIstinto: 2
Coraggio: 3
UmanitaSentiero: 7
ForzaDiVolonta: 5
PuntiSangue: 7
SensoDelPericolo: 1
VistaNotturna: 1
SopravvissutoNato: 0
LupoSolitario: 0
PredaParticolare: 0
SogniInquieti: 1
---


Unica scheda per tutti. Aumentare qualche punto per il vampiro più anziano se si vuole.

### Iniziativa
```run-javascript
const dice = require(require('path').join(@vault_path,'dice.js'));
const props = dice.getProps(@note_path, @vault_path);
mod = (Number(props.Destrezza) || 0) + (Number(props.Prontezza) || 0); 
r = dice.rollDice(1, 10, mod);
console.log('');
console.log('Iniziativa:', r.total, '| Dadi:', r.rolls.join(', '));
console.log('');

des_rissa = (Number(props.Destrezza) || 0) + (Number(props.Rissa) || 0); 
pugno = dice.rollPoolV20(des_rissa, 10, 6, 1);
console.log('Pugno:' , pugno.esito, pugno.successi, pugno.rolls);
console.log('Danno:' , props.Forza, pugno.successi - 1);
calcio = dice.rollPoolV20(des_rissa, 10, 7, 1);
console.log('Calcio:' , calcio.esito, calcio.successi, calcio.rolls);
console.log('Danno:' , props.Forza + 1, calcio.successi - 1);

console.log('');
assorb = (Number(props.Costituzione) || 0)+(Number(props.Robustezza) || 0); 
as = dice.rollPoolV20(assorb, 10, 6, 1);
console.log('Assorbire Danni(R.',props.Robustezza,'):', as.esito, as.successi, as.rolls);

console.log('');
forzavolonta = (Number(props.ForzaDiVolonta) || 0); 
fv = dice.rollPoolV20(forzavolonta, 10, 6, 1);
console.log('Forza Volontà:' , fv.esito, fv.successi, fv.rolls);
```



- Attaccare alla spalle +2 dadi
- Attaccare lateralmente +1 dado

- Azioni Multiple, -1 dado per azione aggiuntiva partendo dal primo ammontare

- Combattere alla cieca +2 difficoltà
- Sparare alla cieca non è fattibile
- _Eventuali poteri posso ridurre la difficolta, esempio di notte Occhi della bestia_

- Imboscata
	- Azione contrastata (A) Destrezza+Furtività -> (D) Percezione+Sesto Senso
	- (A) attacco gratuito + successi extra aggiunti al tiro per attaccare 
	- Se pari attaccante agisce per primo ma difensore manovra difensiva
	- Se attaccante meno successi, tiro iniziativa normale

- Interrompere Azione
	- si può modificare una azione qualsiasi in difensiva solo se non si è già mossi
	- Tiro Forza di Volontà difficoltà 6 o usare punto forza di volontà

- Mirare
	- Medio -> Arto, borsa: Diff. +1
	- Piccolo -> Mano, testa, computer: Diff. +2 Danno +1
	- Preciso -> Occhio, cuore, serratura: Dif.+3 Danno +2

- Movimento, il pg può percorrere metà del suo movimento ed effettuare l'azione

- Bloccare

- Schivare

- Parare