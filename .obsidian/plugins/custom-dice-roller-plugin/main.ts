import { App, Editor, Plugin, PluginSettingTab, Setting, Notice, MarkdownView } from 'obsidian';
import { getAPI } from 'obsidian-dataview';

interface DiceRollerSettings {
    defaultDifficulty: number;
    defaultCritFail: number;
    showDetailedResults: boolean;
}

const DEFAULT_SETTINGS: DiceRollerSettings = {
    defaultDifficulty: 6,
    defaultCritFail: 1,
    showDetailedResults: true
}

export default class CustomDiceRoller extends Plugin {
    settings: DiceRollerSettings;

    async onload() {
        await this.loadSettings();

        // Comando principale per lanciare i dadi
        this.addCommand({
            id: 'roll-custom-dice',
            name: 'Roll Custom Dice',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                this.handleDiceRoll(editor, view);
            }
        });

        // Aggiungi il processore per il rendering inline
        this.registerMarkdownPostProcessor((element, context) => {
            const rolls = element.querySelectorAll('code');
            rolls.forEach((codeBlock) => {
                const text = codeBlock.innerText.trim();
                if (text.startsWith('roll:')) {
                    this.processInlineRoll(codeBlock, text, context.sourcePath);
                }
            });
        });

        // Settings tab
        this.addSettingTab(new DiceRollerSettingTab(this.app, this));
    }

    async handleDiceRoll(editor: Editor, view: MarkdownView) {
        const cursor = editor.getCursor();
        const line = editor.getLine(cursor.line);
        
        // Cerca pattern tipo: 3d10 f6 c1 o <=this.forza>d<=this.dado10> f6 c1
        const rollPattern = /(\d+|<=this\.\w+>)d(\d+|<=this\.\w+>)(\s+f(\d+))?(\s+c(\d+))?/i;
        const match = line.match(rollPattern);
        
        if (match) {
            const diceCount = await this.resolveValue(match[1], view.file.path);
            const diceType = await this.resolveValue(match[2], view.file.path);
            const difficulty = match[4] ? parseInt(match[4]) : this.settings.defaultDifficulty;
            const critFail = match[6] ? parseInt(match[6]) : this.settings.defaultCritFail;
            
            const result = this.rollDice(diceCount, diceType, difficulty, critFail);
            this.displayResult(result, editor, cursor.line);
        } else {
            new Notice('Formato non valido. Usa: NdX f[difficoltà] c[critico]');
        }
    }

    async resolveValue(value: string, filePath: string): Promise<number> {
        // Se è un riferimento Dataview
        if (value.startsWith('<=this.') && value.endsWith('>')) {
            const dv = getAPI(this.app);
            if (!dv) {
                new Notice('Dataview non è installato o attivo');
                return 1;
            }
            
            const propertyName = value.slice(7, -1); // Rimuove <=this. e >
            const page = dv.page(filePath);
            
            if (page && page[propertyName] !== undefined) {
                const resolvedValue = page[propertyName];
                // Gestisce anche proprietà che potrebbero essere link o array
                if (typeof resolvedValue === 'number') {
                    return resolvedValue;
                } else if (typeof resolvedValue === 'string') {
                    const parsed = parseInt(resolvedValue);
                    return isNaN(parsed) ? 1 : parsed;
                } else if (Array.isArray(resolvedValue) && resolvedValue.length > 0) {
                    const parsed = parseInt(resolvedValue[0]);
                    return isNaN(parsed) ? 1 : parsed;
                }
            }
            
            new Notice(`Proprietà '${propertyName}' non trovata nel frontmatter`);
            return 1;
        }
        
        // Se è un numero normale
        return parseInt(value);
    }

    rollDice(count: number, type: number, difficulty: number, critFail: number): DiceResult {
        const rolls: number[] = [];
        let successes = 0;
        let criticals = 0;
        let failures = 0;
        
        for (let i = 0; i < count; i++) {
            const roll = Math.floor(Math.random() * type) + 1;
            rolls.push(roll);
            
            if (roll >= difficulty) {
                successes++;
                if (roll === type) { // Nat max è critico
                    criticals++;
                }
            }
            
            if (roll <= critFail) {
                failures++;
                successes--; // I critici fallimenti tolgono successi
            }
        }
        
        // I successi non possono essere negativi
        successes = Math.max(0, successes);
        
        return {
            count,
            type,
            difficulty,
            critFail,
            rolls,
            successes,
            criticals,
            failures,
            netSuccesses: successes
        };
    }

    displayResult(result: DiceResult, editor: Editor, line: number) {
        let output = `\n**Risultato lancio ${result.count}d${result.type}**\n`;
        
        if (this.settings.showDetailedResults) {
            output += `Tiri: [${result.rolls.join(', ')}]\n`;
            output += `Difficoltà: ${result.difficulty} | Critico fallimento: ≤${result.critFail}\n`;
        }
        
        output += `**Successi netti: ${result.netSuccesses}**`;
        
        if (result.criticals > 0) {
            output += ` (${result.criticals} critici!)`;
        }
        if (result.failures > 0) {
            output += ` (${result.failures} fallimenti critici)`;
        }
        
        output += '\n';
        
        // Inserisce il risultato sotto la riga corrente
        const currentLine = editor.getLine(line);
        editor.replaceRange(currentLine + output, 
            { line: line, ch: 0 }, 
            { line: line, ch: currentLine.length });
    }

    async processInlineRoll(element: HTMLElement, text: string, filePath: string) {
        // Processa roll inline tipo: `roll: 3d10 f6 c1`
        const rollCommand = text.substring(5).trim();
        const rollPattern = /(\d+|<=this\.\w+>)d(\d+|<=this\.\w+>)(\s+f(\d+))?(\s+c(\d+))?/i;
        const match = rollCommand.match(rollPattern);
        
        if (match) {
            const diceCount = await this.resolveValue(match[1], filePath);
            const diceType = await this.resolveValue(match[2], filePath);
            const difficulty = match[4] ? parseInt(match[4]) : this.settings.defaultDifficulty;
            const critFail = match[6] ? parseInt(match[6]) : this.settings.defaultCritFail;
            
            const result = this.rollDice(diceCount, diceType, difficulty, critFail);
            
            // Crea elemento cliccabile per ri-lanciare
            const span = createEl('span', {
                text: `🎲 ${result.count}d${result.type} = ${result.netSuccesses} successi`,
                cls: 'dice-roller-result'
            });
            
            span.style.cursor = 'pointer';
            span.style.color = result.netSuccesses > 0 ? 'green' : 'red';
            span.style.fontWeight = 'bold';
            
            span.addEventListener('click', () => {
                const newResult = this.rollDice(diceCount, diceType, difficulty, critFail);
                span.setText(`🎲 ${newResult.count}d${newResult.type} = ${newResult.netSuccesses} successi`);
                span.style.color = newResult.netSuccesses > 0 ? 'green' : 'red';
                
                if (this.settings.showDetailedResults) {
                    new Notice(`Tiri: [${newResult.rolls.join(', ')}] - Successi: ${newResult.netSuccesses}`);
                }
            });
            
            element.replaceWith(span);
        }
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

interface DiceResult {
    count: number;
    type: number;
    difficulty: number;
    critFail: number;
    rolls: number[];
    successes: number;
    criticals: number;
    failures: number;
    netSuccesses: number;
}

class DiceRollerSettingTab extends PluginSettingTab {
    plugin: CustomDiceRoller;

    constructor(app: App, plugin: CustomDiceRoller) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;
        containerEl.empty();

        containerEl.createEl('h2', {text: 'Custom Dice Roller Settings'});

        new Setting(containerEl)
            .setName('Difficoltà predefinita')
            .setDesc('Valore minimo per un successo quando non specificato')
            .addText(text => text
                .setPlaceholder('6')
                .setValue(String(this.plugin.settings.defaultDifficulty))
                .onChange(async (value) => {
                    const num = parseInt(value);
                    if (!isNaN(num) && num > 0) {
                        this.plugin.settings.defaultDifficulty = num;
                        await this.plugin.saveSettings();
                    }
                }));

        new Setting(containerEl)
            .setName('Critico fallimento predefinito')
            .setDesc('Valore massimo per un fallimento critico quando non specificato')
            .addText(text => text
                .setPlaceholder('1')
                .setValue(String(this.plugin.settings.defaultCritFail))
                .onChange(async (value) => {
                    const num = parseInt(value);
                    if (!isNaN(num) && num > 0) {
                        this.plugin.settings.defaultCritFail = num;
                        await this.plugin.saveSettings();
                    }
                }));

        new Setting(containerEl)
            .setName('Mostra risultati dettagliati')
            .setDesc('Mostra tutti i tiri individuali nel risultato')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.showDetailedResults)
                .onChange(async (value) => {
                    this.plugin.settings.showDetailedResults = value;
                    await this.plugin.saveSettings();
                }));

        containerEl.createEl('h3', {text: 'Come usare'});
        containerEl.createEl('p', {text: 'Formati supportati:'});
        
        const examples = containerEl.createEl('ul');
        examples.createEl('li', {text: '3d10 f6 c1 - Lancia 3d10, successo ≥6, critico fallimento ≤1'});
        examples.createEl('li', {text: '<=this.forza>d<=this.dado> f7 - Usa proprietà dal frontmatter'});
        examples.createEl('li', {text: '`roll: 4d6 f5 c1` - Lancio inline cliccabile'});
        
        containerEl.createEl('p', {text: 'Esempio frontmatter:'});
        const codeBlock = containerEl.createEl('pre');
        codeBlock.createEl('code', {text: `---
forza: 4
dado: 10
agilità: 3
---`});
    }
}
