// dice.js (nel vault)
const fs = require('fs');
const path = require('path');

// — risolve un path nota assoluto a partire da notePath (+ opzionale vaultPath)
function resolveNotePath(notePath, vaultPath) {
  if (!notePath) throw new Error('getProps: notePath mancante');
  return path.isAbsolute(notePath) ? notePath : path.join(vaultPath || process.cwd(), notePath);
}

function readNote(notePath, vaultPath) {
  const abs = resolveNotePath(notePath, vaultPath);
  return { abs, md: fs.readFileSync(abs, 'utf8') };
}

function extractFrontmatter(md) {
  const m = /^---\s*([\s\S]*?)\s*---/m.exec(md);
  return m ? m[1] : '';
}

function parseProps(front) {
  // usa 'yaml' se presente, altrimenti fallback leggero (primitivi + liste)
  try { return require('yaml').parse(front) || {}; }
  catch {
    const props = {};
    let curKey = null;
    for (const line of front.split(/\r?\n/)) {
      if (!line.trim()) continue;
      const li = /^\s*-\s+(.*)$/.exec(line);
      if (li && curKey) { (props[curKey] ??= []).push(li[1].trim()); continue; }
      const kv = /^([^:]+):\s*(.*)$/.exec(line);
      if (kv) {
        curKey = kv[1].trim();
        let v = kv[2].trim().replace(/^(['"])(.*)\1$/,'$2');
        if (/^-?\d+(\.\d+)?$/.test(v)) v = Number(v);
        else if (/^(true|false)$/i.test(v)) v = /^true$/i.test(v);
        else if (v === '') v = null;
        props[curKey] = v;
      }
    }
    return props;
  }
}

// API: restituisce tutte le Proprietà (frontmatter) della nota
function getProps(notePath, vaultPath) {
  const { md } = readNote(notePath, vaultPath);
  return parseProps(extractFrontmatter(md));
}

// lascio anche la tua funzione esistente
function add(a, b) { return a + b; }

// 🎲 Tiro di dadi semplice: rollDice(num, sides, mod)
// Esempio: rollDice(3,10,2) → tira 3d10 + 2
function rollDice(num = 1, sides = 10, mod = 0) {
  const n = Number(num)   || 0;
  const s = Number(sides) || 0;
  const m = Number(mod)   || 0;
  if (n <= 0 || s <= 1) return { rolls: [], total: m, mod: m };
  const rolls = Array.from({ length: n }, () => Math.floor(Math.random() * s) + 1);
  const total = rolls.reduce((a,b) => a + b, 0) + m;
  return { rolls, total, mod: m };
}

module.exports = { add, getProps, rollDice };
