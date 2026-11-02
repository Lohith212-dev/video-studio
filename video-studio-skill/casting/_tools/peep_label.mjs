// node peep_label.mjs <outDir> <svgFile...> : renders each atom with white subpaths numbered (for region labelling)
import fs from 'node:fs'; import path from 'node:path'; import { chromium } from 'playwright-core';
const [outDir, ...files] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
const b = await chromium.launch({ channel: 'chrome', headless: true });
const p = await b.newPage({ viewport: { width: 700, height: 1000 } });
for (const f of files) {
  const svg = fs.readFileSync(f, 'utf8');
  await p.setContent(`<html><body style="margin:0;background:#fff"><div id=h>${svg.replace(/<\?xml[^>]*>/, '')}</div></body></html>`);
  await p.evaluate(() => {
    const s = document.querySelector('svg'); s.setAttribute('width', 660); s.removeAttribute('height');
    s.style.overflow = 'visible';
    const hues = [0, 40, 80, 120, 160, 200, 240, 280, 320, 20, 60, 100, 140, 180, 220, 260, 300, 340];
    const white = [...s.querySelectorAll('path')].filter(e => (e.getAttribute('fill') || '').toUpperCase() === '#FFFFFF');
    let k = 0;
    for (const w of white) {
      const parts = w.getAttribute('d').split(/(?=M)/).filter(x => x.trim());
      for (const d of parts) {
        const np = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        np.setAttribute('d', d); np.setAttribute('fill', `hsl(${hues[k % hues.length]},80%,${k < 18 ? 65 : 45}%)`);
        w.parentNode.insertBefore(np, w);
        const bb = np.getBBox();
        const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        t.setAttribute('x', bb.x + bb.width / 2); t.setAttribute('y', bb.y + bb.height / 2);
        t.setAttribute('font-size', Math.max(40, s.viewBox.baseVal.width / 25)); t.setAttribute('fill', '#000'); t.setAttribute('stroke', '#fff'); t.setAttribute('stroke-width', 6); t.setAttribute('paint-order', 'stroke'); t.setAttribute('font-weight', 'bold');
        t.textContent = k; t.dataset.lab = 1; k++;
        np._t = t;
      }
      w.remove();
    }
    for (const t of [...s.querySelectorAll('text')]) s.appendChild(t);
  });
  const el = await p.$('svg');
  await el.screenshot({ path: path.join(outDir, path.basename(path.dirname(f)) + '__' + path.basename(f, '.svg') + '.png') });
}
await b.close();
