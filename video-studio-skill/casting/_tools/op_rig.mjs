// Open Peeps rig: recolours atoms (vector regions = white fill minus ink, see peep_regions.mjs)
// and composes ONE character (fixed head/face/colours) onto many poses, with props.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import { PROPS, C } from './props.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
export const ATOMS = path.resolve(here, '../_src/open-peeps/atoms');
const REG = path.join(here, 'regions');

// region classes per pose, from the numbered maps in _tools/regions/*.png (default class T = top garment)
// S skin, B bottom garment, H shoe, O shoe sole, K sock, N ink, G grey (prosthetic)
export const POSE_MAP = {
  'sitting/crossed_legs': { 1: 'H', 4: 'S', 5: 'H', 6: 'S', 7: 'K', 8: 'K', 9: 'N' },
  'standing/blazer-3': { 0: 'B', 3: 'S', 4: 'H', 5: 'H', 6: 'S', 7: 'S', 9: 'K', 11: 'K' },
  'standing/crossed_arms-1': { 2: 'S', 3: 'H', 4: 'H', 5: 'S', 10: 'S', 6: 'O', 9: 'O', 7: 'K', 8: 'K' },
  'standing/pointing_finger-1': { 1: 'S', 2: 'S', 3: 'S', 4: 'O', 5: 'O', 6: 'N', 7: 'N' },
  'standing/pointing_finger-2': { 0: 'B', 1: 'S', 2: 'S', 3: 'S', 4: 'O', 5: 'O' },
  'standing/resting-1': { 2: 'H', 3: 'H', 4: 'S', 5: 'K', 6: 'K', 7: 'S', 9: 'N' },
  'standing/robot_dance-1': { 1: 'H', 2: 'H', 3: 'S', 4: 'S', 5: 'K', 6: 'S', 7: 'K', 9: 'O', 10: 'O', 12: 'H' },
  'standing/robot_dance-3': { 1: 'B', 2: 'B', 3: 'H', 4: 'H', 5: 'S', 6: 'S', 7: 'K', 8: 'S', 9: 'K', 11: 'O', 12: 'O', 15: 'H' },
  'standing/shirt-3': { 2: 'H', 3: 'H', 4: 'S', 5: 'S', 8: 'O', 9: 'K', 10: 'K', 11: 'S', 12: 'O' },
  'standing/walking-1': { 1: 'S', 2: 'H', 3: 'H', 4: 'S', 5: 'S', 6: 'K', 8: 'O', 9: 'O', 10: 'H' },
};
export const HEAD_MAP = { 'Gray Short': { 1: 'R' }, 'Gray Bun': { 1: 'R', 2: 'R' }, 'Bun': { 1: 'A', 2: 'A', 3: 'A', 4: 'A', 5: 'A' }, 'Hijab': { 1: 'A', 2: 'A', 3: 'A', 4: 'A' } };
// neck base (prop anchor) and hands, pose canvas units
export const ANCHOR = {
  'sitting/crossed_legs': { neck: [632, 150], hand: [1020, 700] },
  'standing/blazer-3': { neck: [768, 150], hand: [1134, 1150], hip: [614, 880] },
  'standing/crossed_arms-1': { neck: [732, 185] },
  'standing/pointing_finger-1': { neck: [746, 205], finger: [1460, 90], hand: [418, 1050] },
  'standing/pointing_finger-2': { neck: [746, 205], finger: [1460, 90], hand: [418, 1050] },
  'standing/resting-1': { neck: [743, 190], hand: [702, 1050] },
  'standing/robot_dance-1': { neck: [752, 215], palm: [1290, 690] },
  'standing/robot_dance-3': { neck: [752, 215], palm: [1290, 690] },
  'standing/shirt-3': { neck: [747, 125], hand: [519, 1200] },
  'standing/walking-1': { neck: [745, 135], hand: [700, 1080] },
};
const SIT_OFFSET = [0, 560]; // sitting canvas -> standing world (floor 1842 -> 2400)
const HEAD_OFF = { standing: [470, -444], sitting: [350, -444] };

const atom = (rel) => fs.readFileSync(path.join(ATOMS, rel + '.svg'), 'utf8');
const pathsOf = (svg, fill) => [...svg.matchAll(/<path\b([^>]*)>/g)].map(m => m[1])
  .filter(a => new RegExp(`fill="${fill}"`, 'i').test(a)).map(a => a.match(/\bd="([^"]*)"/)[1]);
const regionsOf = (kind, name) => JSON.parse(fs.readFileSync(path.join(REG, `${kind}__${name}.regions.json`), 'utf8')).regions;

function layer(rel, regKey, map, colours, baseClass) {
  const svg = atom(rel);
  const white = pathsOf(svg, '#FFFFFF'), black = pathsOf(svg, '#000000');
  let out = white.map(d => `<path d="${d}" fill="${colours[baseClass]}" fill-rule="evenodd"/>`).join('');
  if (regKey) {
    const regs = regionsOf(...regKey);
    out += regs.map((r, i) => `<path d="${r.d}" fill="${colours[map[i] || baseClass]}"/>`).join('');
  }
  out += black.map(d => `<path d="${d}" fill="${C.ink}" fill-rule="evenodd"/>`).join('');
  return out;
}
const tr = (p, [x, y], rot = 0, s = 1) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${p}</g>`;

/** ch: {skin, top, bottom, shoe, sole, sock, hair, accent, head, face, facial?, acc?}
 *  pose: {pose:'standing/blazer-3', face?, props:[{p:'tabletChart', at:'palm', dx,dy,rot,s, layer:'front'|'back'|'head'}]} */
export function composePose(ch, pose) {
  const [kind, name] = pose.pose.split('/');
  const colours = { T: ch.top, B: ch.bottom, S: ch.skin, H: ch.shoe, O: ch.sole || C.white, K: ch.sock || C.grey, N: C.ink, G: C.grey, R: ch.hair || C.grey, A: ch.accent || C.blue };
  const body = layer(`pose/${kind}/${name}`, [kind, name], POSE_MAP[pose.pose] || {}, colours, 'T');
  const head = layer(`head/${ch.head}`, HEAD_MAP[ch.head] ? ['head', ch.head] : null, HEAD_MAP[ch.head] || {}, colours, 'S');
  const face = layer(`face/${pose.face || ch.face}`, null, {}, colours, 'S');
  const fh = ch.facial ? layer(`facial-hair/${ch.facial}`, null, {}, colours, 'S') : '';
  const acc = ch.acc ? layer(`accessories/${ch.acc}`, null, {}, { S: C.white }, 'S') : '';
  const A = ANCHOR[pose.pose] || {};
  const props = { back: '', front: '', head: '', neck: '' };
  for (const pr of [...(ch.props || []), ...(pose.props || [])]) {
    const svg = PROPS[pr.p](pr.o || {});
    if (pr.layer === 'head') { props.head += tr(svg, [pr.dx || 0, pr.dy || 0], pr.rot, pr.s); continue; }
    if (pr.at === 'neck') { props.neck += tr(svg, [A.neck[0] + (pr.dx || 0), A.neck[1] + (pr.dy || 0)], pr.rot, pr.s); continue; }
    const base = pr.at ? A[pr.at] : [0, 0];
    props[pr.layer || 'front'] += tr(svg, [base[0] + (pr.dx || 0), base[1] + (pr.dy || 0)], pr.rot, pr.s);
  }
  const [hx, hy] = HEAD_OFF[kind];
  const headG = `<g class="head" data-pivot="${hx + 236} ${hy + 520}" transform="translate(${hx} ${hy})">${head}<g transform="translate(141 186)" class="face">${face}</g>${fh ? `<g transform="translate(102 336)">${fh}</g>` : ''}${acc ? `<g transform="translate(39 242)">${acc}</g>` : ''}${props.head}</g>`;
  const inner = `${props.back}<g class="body">${body}</g>${props.neck}${headG}${props.front}`;
  const off = kind === 'sitting' ? SIT_OFFSET : [0, 0];
  return `<g class="pose" data-name="${pose.pose}" transform="translate(${off[0]} ${off[1]})">${inner}</g>`;
}
export function standaloneSVG(g, vb = '-300 -620 2300 3120') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${g}</svg>`;
}
