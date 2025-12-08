---
Forza: 3
Destrezza: 1
---


![[Strumenti.xlsx]]

Lancio Dadi
Scheda Personaggio




```run-javascript
console.log(@vault_path);
dicePath = path.join("@vault_path","dice.js");
console.log('@dicePath');
```


```run-javascript {label="my label"}
console.log("OK, sto usando Node");
console.log("execPath:", process.execPath);
console.log("version:", process.version);
```


```run-javascript
const dice = require(require('path').join(@vault_path,'dice.js'));
console.log(dice.add(2,3));
```

Due Righe
```run-javascript
const { getProps } = require(require('path').join(@vault_path,'dice.js'));
const props = getProps(@note_path,@vault_path);
console.log('Props:', props);
console.log('Forza x2 =', (Number(props.Forza)||0)*2);
```

Una sola riga
```run-javascript
const props = require(require('path').join(@vault_path,'dice.js')).getProps(@note_path,@vault_path);
console.log('Props:', props);
console.log('Forza x2 =', (Number(props.Forza)||0)*2);
```
