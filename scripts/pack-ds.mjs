// Builds the Orvella design system and packs it into vendor/ as versioned tarballs.
// The app installs these tarballs, so its lockfile pins an exact DS version, as with a registry.
// Usage: node scripts/pack-ds.mjs
import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const vendor = path.join(root, 'vendor')
fs.mkdirSync(vendor, { recursive: true })

// Tokens: generate CSS custom properties from the DTCG file.
const tokensDir = path.join(root, 'design-system/tokens')
const tokens = JSON.parse(fs.readFileSync(path.join(tokensDir, 'tokens.json'), 'utf8'))
const flat = new Map()
const walk = (node, p) => {
  for (const [k, v] of Object.entries(node)) {
    if (k.startsWith('$')) continue
    if (v && typeof v === 'object' && '$value' in v) flat.set([...p, k].join('.'), v.$value)
    else if (v && typeof v === 'object') walk(v, [...p, k])
  }
}
walk(tokens, [])
const resolve = (v) => (typeof v === 'string' && v.startsWith('{') ? resolve(flat.get(v.slice(1, -1))) : v)
const css = [':root {', ...[...flat.keys()].map((k) => `  --${k.replaceAll('.', '-')}: ${resolve(flat.get(k))};`), '}', '']
fs.writeFileSync(path.join(tokensDir, 'tokens.css'), css.join('\n'))

// UI: compile with tsc (keeps JSDoc, including @deprecated, in the .d.ts), copy the styles.
const uiDir = path.join(root, 'design-system/ui')
fs.rmSync(path.join(uiDir, 'dist'), { recursive: true, force: true })
execSync(`npx tsc -p "${path.join(uiDir, 'tsconfig.json')}"`, { stdio: 'inherit', cwd: root })
fs.copyFileSync(path.join(uiDir, 'src/styles.css'), path.join(uiDir, 'dist/styles.css'))

for (const dir of [tokensDir, uiDir]) {
  const out = execSync(`npm pack --pack-destination "${vendor}"`, { cwd: dir, encoding: 'utf8' }).trim().split('\n').pop()
  console.log(`vendor/${out}`)
}
