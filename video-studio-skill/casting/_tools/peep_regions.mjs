// node peep_regions.mjs <outDir> <svgFile...>
// For each Open Peeps atom: regions = whiteFill MINUS blackInk (paper.js boolean), saved as <outDir>/<name>.regions.json + numbered preview PNG.
import fs from 'node:fs'; import path from 'node:path'; import { chromium } from 'playwright-core'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url));
const [outDir, ...files] = process.argv.slice(2); fs.mkdirSync(outDir, { recursive: true });
const b = await chromium.launch({ channel: 'chrome', headless: true });
const p = await b.newPage({ viewport: { width: 800, height: 1100 } });
await p.setContent('<html><body style="margin:0;background:#fff"><canvas id=c width=10 height=10></canvas><div id=h></div></body></html>');
await p.addScriptTag({ path: path.join(here, 'node_modules/paper/dist/paper-core.min.js') });
for (const f of files) {
  const svg = fs.readFileSync(f, 'utf8');
  const name = path.basename(path.dirname(f)) + '__' + path.basename(f, '.svg');
  const res = await p.evaluate((svg) => {
    paper.setup(document.getElementById('c'));
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    const vb = doc.documentElement.getAttribute('viewBox');
    const paths = [...doc.querySelectorAll('path')];
    const W = paths.filter(e => (e.getAttribute('fill') || '').toUpperCase() === '#FFFFFF').map(e => e.getAttribute('d'));
    const B = paths.filter(e => (e.getAttribute('fill') || '').toUpperCase() === '#000000').map(e => e.getAttribute('d'));
    const mk = d => { const c = new paper.CompoundPath(d); c.fillRule = 'evenodd'; return c; };
    let white = W.map(mk).reduce((a, c) => a ? a.unite(c) : c, null);
    const black = B.map(mk).reduce((a, c) => a ? a.unite(c) : c, null);
    const diff = white.subtract(black);
    const kids = diff.children ? diff.children.slice() : [diff];
    const outerCW = kids.length ? kids.reduce((m, k) => Math.abs(k.area) > Math.abs(m.area) ? k : m).clockwise : true;
    const regions = kids.filter(k => k.clockwise === outerCW && Math.abs(k.area) > 150).map(k => {
      const ip = k.interiorPoint; const bb = k.bounds;
      return { d: k.pathData, area: Math.round(Math.abs(k.area)), cx: Math.round(ip.x), cy: Math.round(ip.y), bb: [bb.x, bb.y, bb.width, bb.height].map(Math.round) };
    }).sort((a, b) => b.area - a.area);
    return { vb, regions, black: B, white: W };
  }, svg);
  fs.writeFileSync(path.join(outDir, name + '.regions.json'), JSON.stringify(res));
  // numbered preview
  const [x0, y0, w, h] = res.vb.split(/\s+/).map(Number);
  const fs2 = Math.max(36, w / 28);
  const body = res.regions.map((r, i) => `<path d="${r.d}" fill="hsl(${(i * 47) % 360},75%,${i % 2 ? 62 : 75}%)"/>`).join('') +
    res.black.map(d => `<path d="${d}" fill="#000" fill-rule="evenodd"/>`).join('') +
    res.regions.map((r, i) => `<text x="${r.cx}" y="${r.cy}" font-size="${fs2}" font-family="Arial" font-weight="bold" text-anchor="middle" dominant-baseline="middle" fill="#000" stroke="#fff" stroke-width="${fs2 / 6}" paint-order="stroke">${i}</text>`).join('');
  await p.evaluate(([html]) => { document.getElementById('h').innerHTML = html; }, [`<svg id=s xmlns="http://www.w3.org/2000/svg" viewBox="${res.vb}" width="760" style="overflow:visible;background:#fff">${body}</svg>`]);
  await (await p.$('#s')).screenshot({ path: path.join(outDir, name + '.png') });
  console.log(name, res.regions.length);
}
await b.close();
