// Writes casting.json and the per-role contact sheets (sheet-<role>.png).
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright-core';
const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '..');
const rel = p => p ? path.relative(ROOT, p).replace(/\\/g, '/') : null;
const OP_LIC = 'CC0 1.0 (Open Peeps by Pablo Stanley, openpeeps.com); props drawn for this test (no licence needed)';
const HU_LIC = 'CC0 per humaaans.com today; the GitHub mirror we used (Calinou/humaaans, 2019) ships a CC BY 4.0 file, so credit to be safe';
const LF_LIC = 'Lottie Simple License (free animations) - commercial use allowed by the licence, BUT LottieFiles T&C (22 Aug 2025) say the Free Plan is "strictly for non-commercial use only"; ambiguous, get written confirmation';
const OP_SRC = 'https://github.com/jenshor/open-peeps (packages/open_peeps/assets/atoms) / https://www.openpeeps.com/';
const HU_SRC = 'https://github.com/Calinou/humaaans (Flat Assets) / https://www.humaaans.com/';
const ROLES = { strategist: 'Strategist / business leader', 'cs-agent': 'Customer-service agent', client: 'Wealth-management client (waiting)', planner: 'Planner / analyst presenting', cfo: 'CFO / finance lead', accountant: 'Accountant', engineer: 'IT / AI engineer' };
const opNotes = {
  'op-strategist': 'Same grey-haired exec (Gray Short + moustache, deep-blue jacket) on 4 poses: hand on hip holding strategy doc, presenting doc on open palm, pointing up, arms crossed. 4 expressions.',
  'op-agent-a': 'Agent A (curly hair, blue shirt, headset). Seated at desk + 2 standing poses. Same head/headset on every pose.',
  'op-agent-b': 'Agent B (short hair, deep skin, light-blue top, deep-blue headset). Seated at desk, hand-in-pocket, presenting.',
  'op-agent-c': 'Agent C (hijab, green top, headset). Seated at desk, walking in, pointing.',
  'op-client': 'Older client (grey bun, glasses, red cardigan). Seated with "?" bubble, seated suspicious, arms crossed (impatient), relaxed. Expression changes carry the "waiting" story.',
  'op-planner': 'Planner (bun + green headband, glasses, blue top) beside a PLAN board: pointing up at it, presenting with open palm, hand on hip.',
  'op-cfo': 'CFO (long straight hair, grey suit) with chart tablet on palm / in hand, arms crossed, pointing up.',
  'op-accountant': 'Accountant (glasses, pale shirt) holding calculator on palm, seated with ledger, standing with file stack.',
  'op-engineer': 'Engineer (twists, light-blue tee, headphones round neck, "AI" lanyard) walking in with closed laptop, holding open laptop showing code, seated typing on laptop, pointing up.',
};
const huNotes = {
  'hu-strategist': 'Bearded exec in a deep-blue suit: standing with strategy doc, walking + pointing forward, pointing up. Flat, no outlines, side-on.',
  'hu-agent': 'Agent with headset (own drawing) at desk, standing, walking + gesturing. Only one agent built here; more agents = swap Head piece + colours.',
  'hu-client': 'Grey-haired client in red: seated on cube with "?" bubble, seated on ball, walking. Seats are Humaaans "Objects/Seat" pieces.',
  'hu-planner': 'Planner pointing up / forward at a PLAN board, then walking.',
  'hu-cfo': 'CFO in black suit with chart tablet (standing and seated), pointing forward.',
  'hu-accountant': 'Accountant with calculator, seated with ledger, walking with files.',
  'hu-engineer': 'Engineer in hoodie + AI lanyard holding open laptop, seated typing, walking + pointing up.',
};
const candidates = [];
const mk = (id, role, library, source_url, licence, attribution, animated, style, srcFiles, notes, poses, propsInHand) => {
  const d = path.join(ROOT, 'candidates', id);
  const has = f => fs.existsSync(path.join(d, f)) ? rel(path.join(d, f)) : null;
  candidates.push({ role, candidate_id: id, library, source_url, licence, attribution_text: attribution, animated, recolourable: true,
    poses_same_character: poses, props_in_hands: propsInHand, style_match_1to5: style,
    files: { source: srcFiles, recoloured: fs.existsSync(path.join(d, 'recoloured')) ? fs.readdirSync(path.join(d, 'recoloured')).map(f => rel(path.join(d, 'recoloured', f))) : null, preview_png: has('preview.png'), preview_mp4: has('preview.mp4') },
    notes });
};
const opSrc = ['_src/open-peeps/atoms (pose/, head/, face/, facial-hair/, accessories/)'];
const opRole = { 'op-strategist': 'strategist', 'op-agent-a': 'cs-agent', 'op-agent-b': 'cs-agent', 'op-agent-c': 'cs-agent', 'op-client': 'client', 'op-planner': 'planner', 'op-cfo': 'cfo', 'op-accountant': 'accountant', 'op-engineer': 'engineer' };
const opPosesNote = 'native library: 23 standing + 11 sitting poses x 46 heads x 30 faces; this rig has 10 poses colour-mapped so far (more = label regions with peep_regions.mjs)';
for (const [id, role] of Object.entries(opRole)) mk(id, role, 'Open Peeps (atoms) + own rig', OP_SRC, OP_LIC, 'Not required (CC0). Optional: "Illustrations: Open Peeps by Pablo Stanley, CC0"', 'rigged', 5, opSrc, opNotes[id] + ' Rig: head/face are separate layers (nod, expression swaps), body pose swaps every ~1 s like the Dalio merchant; arms are baked into each pose drawing (no free arm rotation).', fs.readdirSync(path.join(ROOT, 'candidates', id, 'recoloured')).length + ' shown; ' + opPosesNote, 'yes - prop SVGs placed at per-pose hand anchors (palm, hanging hand, finger, lap)');
const huRole = { 'hu-strategist': 'strategist', 'hu-agent': 'cs-agent', 'hu-client': 'client', 'hu-planner': 'planner', 'hu-cfo': 'cfo', 'hu-accountant': 'accountant', 'hu-engineer': 'engineer' };
for (const [id, role] of Object.entries(huRole)) mk(id, role, 'Humaaans (pieces) + own rig', HU_SRC, HU_LIC, '"Illustrations: Humaaans by Pablo Stanley (humaaans.com), CC BY 4.0" (safe choice for the 2019 mirror copy; humaaans.com itself now says CC0)', 'rigged', 2, ['_src/humaaans/pieces (Head/Front, Body, Bottom/Standing, Bottom/Sitting)'], huNotes[id] + ' Rig: head/body/legs are separate pieces; recoloured by remapping their fills (skin/hair/garment/shade).', fs.readdirSync(path.join(ROOT, 'candidates', id, 'recoloured')).length + ' shown; library has 10 bodies x 8 standing + 4 sitting bottoms x 18 heads (all side-on, facing right)', 'yes - props placed at front-hand position; only the front hand is free, hands are small');
// LottieFiles leads (no files: ToS forbids automated download)
const LF = JSON.parse(fs.readFileSync(path.join(here, 'lottie_shortlist.json'), 'utf8'));
const lfPick = [
  ['strategist', 'Business man explaining', 2, 'Flat vector businessman gesturing at floating charts.'],
  ['cs-agent', 'call center girl', 4, 'Ink-outline, hand-drawn look, woman with headset at laptop - the closest LottieFiles match to the Dalio line style seen.'],
  ['cs-agent', 'Call center', 2, 'Flat vector male agent with headset at desk.'],
  ['client', 'sitting', 3, 'Line-art man sitting, looking at phone - reads as "waiting".'],
  ['planner', 'A business man and woman presenting data on whiteboard', 2, 'Flat vector pair presenting a chart on a board.'],
  ['cfo', 'women finance', 2, 'Flat vector woman beside rising bar chart.'],
  ['accountant', 'Accountant', 2, 'Flat/isometric accountant at desk with calculator and screen.'],
  ['engineer', 'coding', 4, 'Ink-outline programmer at desk with keyboard and gear icons - closest to Dalio line style.'],
  ['engineer', 'Development', 4, 'Bold ink-outline man in red shirt holding a tablet - Dalio-like linework.'],
];
lfPick.forEach(([role, name, style, note], i) => {
  const a = LF.find(x => x.name === name);
  candidates.push({ role, candidate_id: `lf-${role}-${i}`, library: 'LottieFiles (free animation)', source_url: a.url, licence: LF_LIC,
    attribution_text: `Not required by the Lottie Simple License; courtesy credit: "Animation: ${name} by ${a.creator.replace('/', '')} via LottieFiles"`,
    animated: 'native', recolourable: true, poses_same_character: '1 (one fixed loop; the same character does not exist in other poses)', props_in_hands: 'baked in only',
    style_match_1to5: style, files: { source: null, recoloured: null, preview_png: null, preview_mp4: null },
    notes: note + ' NOT downloaded: LottieFiles T&C forbid robots/automatic devices and "collect or compile" - download manually (Lottie JSON), then recolour via colour properties. Shortlisted from a public-search query + thumbnails that we then deleted (see casting.md).' });
});
fs.writeFileSync(path.join(ROOT, 'casting.json'), JSON.stringify(candidates, null, 2));
console.log('casting.json', candidates.length);

// contact sheets
const b = await chromium.launch({ channel: 'chrome', headless: true });
const p = await b.newPage({ viewport: { width: 1700, height: 800 } });
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
for (const [role, label] of Object.entries(ROLES)) {
  const cs = candidates.filter(c => c.role === role);
  const rows = cs.map(c => c.files.preview_png
    ? `<div class=r><div class=h><b>${esc(c.candidate_id)}</b> &middot; ${esc(c.library)} &middot; ${c.animated} &middot; style ${c.style_match_1to5}/5 &middot; poses: ${esc(c.poses_same_character.split(';')[0])}</div><img src="${pathToFileURL(path.join(ROOT, c.files.preview_png)).href}"></div>`
    : `<div class="r t"><div class=h><b>${esc(c.candidate_id)}</b> &middot; ${esc(c.library)} &middot; native animation &middot; style ${c.style_match_1to5}/5 &middot; 1 pose</div><div class=n>${esc(c.notes.split(' NOT')[0])}<br><span>Manual download only: ${esc(c.source_url)}</span></div></div>`).join('');
  const html = (`<html><head><style>body{margin:0;background:#F5F8FA;font-family:Segoe UI,Arial;color:#13161B;width:1700px}
  h1{margin:14px 20px 4px;font-size:28px}.sub{margin:0 20px 10px;color:#7C8492;font-size:16px}
  .r{margin:0 20px 14px;background:#fff;border:1px solid #d5dbe3;border-radius:8px;padding:8px 10px}.h{font-size:16px;margin-bottom:4px}
  .r img{height:420px;max-width:1640px;object-fit:contain;display:block}.n{font-size:16px;padding:6px 0}.n span{color:#0B3FA8}.t{background:#EEF4FF}</style></head>
  <body><h1>${esc(label)}</h1><div class=sub>Ranked: poses of the same character first, then role fit, then Dalio style. Open Peeps = ink line (Dalio-like); Humaaans = flat vector; LottieFiles = native animation, one pose, manual download.</div>${rows}</body></html>`);
  const tmp = path.join(here, '_sheet.html'); fs.writeFileSync(tmp, html); await p.goto(pathToFileURL(tmp).href); await p.waitForLoadState('networkidle'); fs.unlinkSync(tmp);
  await p.screenshot({ path: path.join(ROOT, `sheet-${role}.png`), fullPage: true });
}
await b.close();
console.log('sheets done');
