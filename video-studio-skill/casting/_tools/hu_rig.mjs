// Humaaans rig: head + body + bottom pieces (CC0 per humaaans.com), recoloured by fill mapping.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import { PROPS, C } from './props.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
export const PIECES = path.resolve(here, '../_src/humaaans/pieces');
const SKIN = ['#B28B67', '#997659'], HAIR = ['#191847'];
// layout from the Humaaans full-figure files (sitting-1: head 82,0 / body 22,82 / bottom 0,187)
export const LAYOUT = { head: [82, 0], body: [22, 82], bottom: [0, 187] };

function piece(rel, map) {
  let s = fs.readFileSync(path.join(PIECES, rel + '.svg'), 'utf8');
  s = s.replace(/<\?xml[^>]*>/, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<title>[\s\S]*?<\/title>|<desc>[\s\S]*?<\/desc>/g, '');
  const lum = h => { const n = parseInt(h.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
  const used = [...new Set([...s.matchAll(/fill="(#[0-9A-Fa-f]{6})"/g)].map(m => m[1].toUpperCase()))];
  const auto = {};
  if (map.role) {
    const free = used.filter(c => !map[c]);
    const light = free.filter(c => lum(c) > 0.85 && c !== '#FFFFFF'), dark = free.filter(c => lum(c) <= 0.85 && c !== '#000000').sort((a, b) => lum(b) - lum(a));
    for (const c of light) auto[c] = c === '#E4E4E4' && map.role === 'bottom' ? map.shoe : map.role === 'bottom' ? map.seat : map.shirt;
    dark.forEach((c, i) => auto[c] = i === 0 ? map.main : map.shade);
  }
  s = s.replace(/fill="(#[0-9A-Fa-f]{6})"/g, (m, c) => `fill="${map[c.toUpperCase()] || auto[c.toUpperCase()] || c}"`);
  // strip outer <svg> wrapper, keep inner content
  const inner = s.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const id = Math.random().toString(36).slice(2, 7); // de-duplicate ids (masks/defs) between pieces
  return inner.replace(/id="([^"]+)"/g, `id="$1-${id}"`).replace(/url\(#([^)]+)\)/g, `url(#$1-${id})`).replace(/xlink:href="#([^"]+)"/g, `xlink:href="#$1-${id}"`);
}
export function composeHu(ch, pose) {
  const m = {};
  for (const c of SKIN) m[c] = ch.skin;
  const mb = { ...m, role: 'body', shirt: ch.shirt, main: ch.top, shade: ch.topShade };
  const mo = { ...m, role: 'bottom', shoe: ch.shoe, seat: ch.seat || C.light, main: ch.bottom, shade: ch.bottomShade };
  const mh = { ...m, ...Object.fromEntries(HAIR.map(c => [c, ch.hair])), role: 'head', shirt: ch.accent || C.light, main: ch.accent || C.blue, shade: ch.hair };
  const L = { ...LAYOUT, ...(pose.layout || {}) };
  const props = { back: '', front: '' };
  for (const pr of pose.props || []) props[pr.layer || 'front'] += `<g transform="translate(${pr.x} ${pr.y}) rotate(${pr.rot || 0}) scale(${pr.s || 1})">${PROPS[pr.p](pr.o || {})}</g>`;
  const head = `<g class="head" data-pivot="${L.head[0] + 68} ${L.head[1] + 100}" transform="translate(${L.head[0]} ${L.head[1]})">${piece('Head/Front/' + ch.head, mh)}${pose.headProp || ''}</g>`;
  return `<g class="pose">${props.back}<g transform="translate(${L.bottom[0]} ${L.bottom[1]})">${piece('Bottom/' + pose.bottom, mo)}</g>` +
    `<g transform="translate(${L.body[0]} ${L.body[1]})">${piece('Body/' + pose.body, mb)}</g>${head}${props.front}</g>`;
}
export const huSVG = (g, vb) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="${vb}">${g}</svg>`;
