// Builds the Open Peeps candidates: one fixed character per role on 3-4 poses with role props.
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
import { composePose, standaloneSVG } from './op_rig.mjs'; import { C } from './props.mjs';
const here = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(here, '../candidates');
// natural skin tones: the only off-palette colours (swap for C.paper for a brand-strict look)
const SKIN = { light: '#F2CDB0', mid: '#D9A47A', tan: '#B97E55', deep: '#7B4A2C' };
const HEADSET = { p: 'headset', layer: 'head' };

export const CAST = {
  'op-strategist': {
    role: 'strategist', ch: { head: 'Gray Short', face: 'Smile', facial: 'Moustache 1', skin: SKIN.light, hair: C.grey, top: C.deep, bottom: C.ink, shoe: C.ink, sock: C.grey },
    poses: [
      { pose: 'standing/blazer-3', face: 'Calm', props: [{ p: 'document', at: 'hand', dx: 20, dy: 330, rot: 6, s: 0.8 }] },
      { pose: 'standing/robot_dance-1', face: 'Explaining', props: [{ p: 'document', at: 'palm', dx: -20, dy: 10, rot: 8, s: 1 }] },
      { pose: 'standing/pointing_finger-1', face: 'Driven' },
      { pose: 'standing/crossed_arms-1', face: 'Smile' },
    ] },
  'op-agent-a': {
    role: 'cs-agent', ch: { head: 'Long Curly', face: 'Smile', skin: SKIN.mid, top: C.blue, bottom: C.ink, shoe: C.ink, sock: C.ink, props: [HEADSET] },
    poses: [
      { pose: 'sitting/crossed_legs', face: 'Explaining', props: [{ p: 'chair', layer: 'back' }, { p: 'desk', layer: 'front' }] },
      { pose: 'standing/shirt-3', face: 'Smile' },
      { pose: 'standing/robot_dance-3', face: 'Explaining' },
    ] },
  'op-agent-b': {
    role: 'cs-agent', ch: { head: 'Short 3', face: 'Smile', skin: SKIN.deep, top: C.light, bottom: C.deep, shoe: C.ink, sock: C.ink, props: [{ ...HEADSET, o: { c: C.deep } }] },
    poses: [
      { pose: 'sitting/crossed_legs', face: 'Calm', props: [{ p: 'chair', layer: 'back' }, { p: 'desk', layer: 'front' }] },
      { pose: 'standing/resting-1', face: 'Cheeky' },
      { pose: 'standing/robot_dance-1', face: 'Explaining' },
    ] },
  'op-agent-c': {
    role: 'cs-agent', ch: { head: 'Hijab', face: 'Smile', skin: SKIN.tan, accent: C.light, top: C.green, bottom: C.ink, shoe: C.ink, sock: C.ink, props: [{ ...HEADSET, o: { c: C.blue } }] },
    poses: [
      { pose: 'sitting/crossed_legs', face: 'Concerned', props: [{ p: 'chair', layer: 'back' }, { p: 'desk', layer: 'front' }] },
      { pose: 'standing/walking-1', face: 'Smile' },
      { pose: 'standing/pointing_finger-1', face: 'Explaining' },
    ] },
  'op-client': {
    role: 'client', ch: { head: 'Gray Bun', face: 'Calm', acc: 'Glasses', skin: SKIN.light, hair: C.grey, top: C.red, bottom: C.grey, shoe: C.ink, sock: C.ink },
    poses: [
      { pose: 'sitting/crossed_legs', face: 'Concerned', props: [{ p: 'chair', layer: 'back', o: { c: C.light } }, { p: 'bubbleQ', dx: 1250, dy: -150, s: 1.2 }] },
      { pose: 'sitting/crossed_legs', face: 'Suspicious', props: [{ p: 'chair', layer: 'back', o: { c: C.light } }] },
      { pose: 'standing/crossed_arms-1', face: 'Tired' },
      { pose: 'standing/resting-1', face: 'Smile' },
    ] },
  'op-planner': {
    role: 'planner', ch: { head: 'Bun', face: 'Smile', acc: 'Glasses 2', skin: SKIN.mid, accent: C.green, top: C.blue, bottom: C.ink, shoe: C.ink, sock: C.ink },
    poses: [
      { pose: 'standing/pointing_finger-1', face: 'Explaining', props: [{ p: 'board', layer: 'back' }] },
      { pose: 'standing/robot_dance-3', face: 'Cheeky', props: [{ p: 'board', layer: 'back' }] },
      { pose: 'standing/blazer-3', face: 'Calm', props: [{ p: 'board', layer: 'back' }] },
    ] },
  'op-cfo': {
    role: 'cfo', ch: { head: 'Medium Straight', face: 'Serious', skin: SKIN.tan, top: C.grey, bottom: C.ink, shoe: C.ink, sock: C.ink },
    poses: [
      { pose: 'standing/robot_dance-1', face: 'Explaining', props: [{ p: 'tabletChart', at: 'palm', dx: -10, dy: 10, rot: 4 }] },
      { pose: 'standing/blazer-3', face: 'Serious', props: [{ p: 'tabletChart', at: 'hand', dx: 30, dy: 300, rot: 4, s: 0.85 }] },
      { pose: 'standing/crossed_arms-1', face: 'Calm' },
      { pose: 'standing/pointing_finger-1', face: 'Driven' },
    ] },
  'op-accountant': {
    role: 'accountant', ch: { head: 'Short 2', face: 'Calm', acc: 'Glasses 3', skin: SKIN.light, top: C.tint, bottom: C.ink, shoe: C.ink, sock: C.ink },
    poses: [
      { pose: 'standing/robot_dance-1', face: 'Driven', props: [{ p: 'calculator', at: 'palm', dx: -20, dy: 10, rot: 6 }] },
      { pose: 'sitting/crossed_legs', face: 'Solemn', props: [{ p: 'chair', layer: 'back', o: { c: C.grey } }, { p: 'ledger', at: 'hand', dx: 0, dy: 60, rot: -6, s: 0.9 }] },
      { pose: 'standing/shirt-3', face: 'Smile', props: [{ p: 'fileStack', at: 'hand', dx: 60, dy: 300, s: 0.8 }] },
    ] },
  'op-engineer': {
    role: 'engineer', ch: { head: 'Twists', face: 'Smile', skin: SKIN.deep, top: C.light, bottom: C.ink, shoe: C.blue, sole: C.white, sock: C.ink,
      props: [{ p: 'headphonesNeck', at: 'neck', dy: -10, o: { c: C.deep } }, { p: 'lanyard', at: 'neck', dy: 10, o: { c: C.blue } }] },
    poses: [
      { pose: 'standing/walking-1', face: 'Smile', props: [{ p: 'laptopClosed', at: 'hand', dx: -10, dy: 60, rot: -8 }] },
      { pose: 'standing/robot_dance-3', face: 'Explaining', props: [{ p: 'laptopFront', at: 'palm', dx: 0, dy: 15, rot: 3 }] },
      { pose: 'sitting/crossed_legs', face: 'Driven', props: [{ p: 'chair', layer: 'back' }, { p: 'laptopLap', at: 'hand', dx: -60, dy: -30, s: 1.25 }] },
      { pose: 'standing/pointing_finger-1', face: 'Cheeky' },
    ] },
};

const only = process.argv.slice(2);
for (const [id, c] of Object.entries(CAST)) {
  if (only.length && !only.includes(id)) continue;
  const d = path.join(OUT, id, 'recoloured'); fs.rmSync(d, { recursive: true, force: true }); fs.mkdirSync(d, { recursive: true });
  const vb = c.poses.some(p => p.props?.some(q => q.p === 'board')) ? '-300 -620 2900 3120' : '-300 -620 2300 3120';
  c.poses.forEach((p, i) => {
    const nm = `${String(i + 1).padStart(2, '0')}-${p.pose.split('/')[1]}-${(p.face || c.ch.face).replace(/\s/g, '')}.svg`;
    fs.writeFileSync(path.join(d, nm), standaloneSVG(composePose(c.ch, p), vb));
  });
  console.log('built', id);
}
