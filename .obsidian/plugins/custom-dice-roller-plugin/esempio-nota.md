---
forza: 5
agilità: 3
intelligenza: 4
dado: 10
dado6: 6
dado20: 20
---

# Test Personaggio

## Attributi
- Forza: 5
- Agilità: 3  
- Intelligenza: 4

## Test di lancio dadi

### Esempi di utilizzo:

1. **Lancio standard con numeri fissi:**
   - 3d10 f6 c1
   - 5d6 f5 c1

2. **Lancio con attributi dal frontmatter:**
   - <=this.forza>d<=this.dado> f6 c1
   - <=this.agilità>d<=this.dado6> f5 c1
   - <=this.intelligenza>d<=this.dado20> f10 c1

3. **Lancio inline (cliccabile per rilanciare):**
   - Test forza: `roll: <=this.forza>d10 f6 c1`
   - Test agilità: `roll: <=this.agilità>d6 f5 c1`
   - Test intelligenza: `roll: 4d20 f10 c2`

## Come funziona

- **f[numero]**: Difficoltà - valore minimo per un successo
- **c[numero]**: Critico fallimento - valore massimo che sottrae un successo
- I valori dal frontmatter si riferiscono con `<=this.proprietà>`
- Posiziona il cursore sulla riga del lancio e usa il comando "Roll Custom Dice"
- I lanci inline con `roll:` diventano cliccabili dopo il rendering