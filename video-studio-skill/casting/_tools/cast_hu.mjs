// Builds the Humaaans candidates (flat-vector style): one character per role, 3-4 piece combinations.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import { composeHu, huSVG } from './hu_rig.mjs'; import { C } from './props.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(here, '../candidates');
const SKIN = { light: '#F2CDB0', mid: '#D9A47A', tan: '#B97E55', deep: '#7B4A2C' };
const HS = (c = C.blue) => `<g><path d="M48 62 C38 8 112 -2 116 38" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>
  <path d="M48 62 C38 8 112 -2 116 38" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
  <path d="M54 74 Q70 92 98 86" fill="none" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/><circle cx="99" cy="86" r="4" fill="${C.ink}"/>
  <rect x="40" y="50" width="17" height="27" rx="7" fill="${c}" stroke="${C.ink}" stroke-width="3"/></g>`;
const ST = 'Standing/Skinny Jeans', WALK = 'Standing/Skinny Jeans Walk', SIT = 'Sitting/Skinny Jeans 1';
const P = (p, x, y, s = 0.2, rot = 0, layer, o) => ({ p, x, y, s, rot, layer, o });

export const CAST = {
  'hu-strategist': { role: 'strategist', ch: { head: 'Short Beard', skin: SKIN.light, hair: C.grey, top: C.deep, topShade: C.ink, shirt: C.white, bottom: C.deep, bottomShade: C.ink, shoe: C.ink },
    poses: [{ body: 'Jacket', bottom: ST, props: [P('document', 262, 235, 0.22, 6)] }, { body: 'Pointing Forward', bottom: WALK }, { body: 'Pointing Up', bottom: ST }] },
  'hu-agent': { role: 'cs-agent', ch: { head: 'Long', skin: SKIN.mid, hair: C.ink, top: C.blue, topShade: C.deep, shirt: C.tint, bottom: C.ink, bottomShade: C.ink, shoe: C.white, seat: C.light },
    poses: [{ body: 'Turtle Neck', bottom: SIT, headProp: HS(), props: [{ p: 'desk', x: 40, y: 50, s: 0.22, layer: 'front' }] }, { body: 'Long Sleeve', bottom: ST, headProp: HS() }, { body: 'Pointing Forward', bottom: WALK, headProp: HS() }] },
  'hu-client': { role: 'client', ch: { head: 'Wavy', skin: SKIN.light, hair: C.grey, top: C.red, topShade: '#C93636', shirt: C.white, bottom: C.grey, bottomShade: C.ink, shoe: C.ink, seat: C.light },
    poses: [{ body: 'Jacket 2', bottom: 'Sitting/Baggy Pants', props: [P('bubbleQ', 300, 70, 0.22)] }, { body: 'Turtle Neck', bottom: 'Sitting/Sweat Pants' }, { body: 'Long Sleeve', bottom: 'Standing/Baggy Pants' }] },
  'hu-planner': { role: 'planner', ch: { head: 'Curly', skin: SKIN.tan, hair: C.ink, top: C.blue, topShade: C.deep, shirt: C.white, bottom: C.ink, bottomShade: C.ink, shoe: C.white },
    poses: [{ body: 'Pointing Up', bottom: ST, props: [P('board', -40, 120, 0.2, 0, 'back')] }, { body: 'Pointing Forward', bottom: ST, props: [P('board', -40, 120, 0.2, 0, 'back')] }, { body: 'Long Sleeve', bottom: WALK }] },
  'hu-cfo': { role: 'cfo', ch: { head: 'Pony', skin: SKIN.deep, hair: C.ink, top: C.ink, topShade: C.grey, shirt: C.tint, bottom: C.ink, bottomShade: C.grey, shoe: C.ink, seat: C.light },
    poses: [{ body: 'Jacket', bottom: ST, props: [P('tabletChart', 262, 230, 0.22, 4)] }, { body: 'Pointing Forward', bottom: ST }, { body: 'Jacket', bottom: SIT, props: [P('tabletChart', 262, 230, 0.22, 4)] }] },
  'hu-accountant': { role: 'accountant', ch: { head: 'Caesar', skin: SKIN.light, hair: C.ink, top: C.tint, topShade: C.light, shirt: C.white, bottom: C.grey, bottomShade: C.ink, shoe: C.ink, seat: C.light },
    poses: [{ body: 'Long Sleeve', bottom: ST, props: [P('calculator', 275, 175, 0.22, 4)] }, { body: 'Turtle Neck', bottom: SIT, props: [P('ledger', 230, 205, 0.22, -4)] }, { body: 'Jacket', bottom: WALK, props: [P('fileStack', 262, 240, 0.22)] }] },
  'hu-engineer': { role: 'engineer', ch: { head: 'Afro', skin: SKIN.deep, hair: C.ink, top: C.light, topShade: C.blue, shirt: C.white, bottom: C.ink, bottomShade: C.ink, shoe: C.blue, seat: C.light },
    poses: [{ body: 'Hoodie', bottom: ST, props: [P('laptopFront', 265, 205, 0.24, 3), P('lanyard', 150, 112, 0.17, 0, 'front', { c: C.blue })] },
      { body: 'Hoodie', bottom: SIT, props: [P('laptopLap', 200, 245, 0.25), P('lanyard', 150, 112, 0.17, 0, 'front', { c: C.blue })] },
      { body: 'Pointing Up', bottom: WALK, props: [P('lanyard', 150, 112, 0.17, 0, 'front', { c: C.blue })] }] },
};
for (const [id, c] of Object.entries(CAST)) {
  const d = path.join(OUT, id, 'recoloured'); fs.rmSync(d, { recursive: true, force: true }); fs.mkdirSync(d, { recursive: true });
  const vb = c.poses.some(p => p.props?.some(q => q.p === 'board')) ? '-60 -30 560 470' : (c.poses.some(p => p.props?.some(q => q.p === 'desk')) ? '-60 -30 560 470' : '-60 -30 440 470');
  c.poses.forEach((p, i) => fs.writeFileSync(path.join(d, `${String(i + 1).padStart(2, '0')}-${p.body.replace(/\s/g, '')}-${p.bottom.split('/')[1].replace(/\s/g, '')}.svg`), huSVG(composeHu(c.ch, p), vb)));
}
console.log('built hu');
