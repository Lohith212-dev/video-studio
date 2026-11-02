// Usage: node grid.mjs <out.png> <cols> <cellPx> <title> <spec.json>
// spec.json: [{img: absPath, label: "..."}]
import fs from 'node:fs'; import { chromium } from 'playwright-core'; import { pathToFileURL } from 'node:url';
const [out, cols, cell, title, spec] = process.argv.slice(2);
const items = JSON.parse(fs.readFileSync(spec, 'utf8'));
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;background:#F5F8FA;font-family:Segoe UI,Arial,sans-serif;color:#13161B}
h1{font-size:22px;margin:12px 16px}
.g{display:grid;grid-template-columns:repeat(${cols},${cell}px);gap:10px;padding:0 16px 16px}
.c{background:#fff;border:1px solid #d5dbe3;border-radius:6px;overflow:hidden}
.c img{width:${cell}px;height:${cell}px;object-fit:contain;display:block;background:#fff}
.c div{font-size:13px;padding:4px 6px;line-height:1.25;white-space:pre-wrap}
</style></head><body><h1>${esc(title)}</h1><div class="g">${items.map(i => `<div class="c"><img src="${pathToFileURL(i.img).href}"><div>${esc(i.label)}</div></div>`).join('')}</div></body></html>`;
const tmp = out + '.html'; fs.writeFileSync(tmp, html);
const b = await chromium.launch({ channel: 'chrome', headless: true });
const p = await b.newPage({ viewport: { width: 32 + cols * (+cell + 10), height: 400 } });
await p.goto(pathToFileURL(tmp).href); await p.waitForLoadState('networkidle');
await p.screenshot({ path: out, fullPage: true }); await b.close(); fs.unlinkSync(tmp);
