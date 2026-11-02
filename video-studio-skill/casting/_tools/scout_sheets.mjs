// make scout grids for lottie search results: node scout_sheets.mjs <scoutDir> <tag>
import fs from 'node:fs'; import path from 'node:path'; import { execFileSync } from 'node:child_process';
const [dir, tag] = process.argv.slice(2);
const list = JSON.parse(fs.readFileSync(path.join(dir, tag + '.json'), 'utf8'));
const items = list.map(a => ({ img: path.resolve(dir, tag, String(a.n).padStart(3,'0') + '.img'), label: `${a.n} ${a.name}`.slice(0, 40) }));
for (let k = 0; k * 42 < items.length; k++) {
  const spec = path.join(dir, `${tag}_p${k}.spec.json`);
  fs.writeFileSync(spec, JSON.stringify(items.slice(k * 42, k * 42 + 42)));
  execFileSync('node', [path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1')), 'grid.mjs'), path.join(dir, `${tag}_p${k}.png`), '7', '170', `${tag} page ${k}`, spec]);
}
