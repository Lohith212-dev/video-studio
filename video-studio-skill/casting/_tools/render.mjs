// Renders a candidate's pose SVGs to (1) a still PNG strip 600px tall and (2) a 4s 1280x720 MP4 cycling poses
// with idle motion (breathing, head nod, pop on pose change). Pose SVGs must share one viewBox and may contain
// <g class="head" data-pivot="x y"> for the nod.
// usage: node render.mjs <candidateDir> <title> [--no-mp4]
import fs from 'node:fs'; import path from 'node:path'; import { chromium } from 'playwright-core'; import { execFileSync } from 'node:child_process';
const [dir, title, flag] = process.argv.slice(2);
const poseDir = path.join(dir, 'recoloured');
const files = fs.readdirSync(poseDir).filter(f => f.endsWith('.svg')).sort();
const svgs = files.map(f => fs.readFileSync(path.join(poseDir, f), 'utf8'));
const labels = files.map(f => f.replace(/^\d+-/, '').replace('.svg', ''));
const b = await chromium.launch({ channel: 'chrome', headless: true });
const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
// ---- still strip
{
  const p = await b.newPage({ viewport: { width: 400, height: 600 } });
  const cells = svgs.map((s, i) => `<div class=c>${s.replace('<svg ', '<svg class=fig ')}<div class=l>${i + 1}. ${esc(labels[i])}</div></div>`).join('');
  await p.setContent(`<html><head><style>body{margin:0;background:#F5F8FA;font-family:Segoe UI,Arial;color:#13161B}
  #w{display:inline-flex;gap:8px;padding:6px 10px;height:588px;box-sizing:border-box;align-items:flex-end}
  .c{display:flex;flex-direction:column;align-items:center;height:100%}.fig{height:548px;width:auto}
  .l{font-size:15px;height:22px;white-space:nowrap}</style></head><body><div id=w>${cells}</div></body></html>`);
  await p.waitForTimeout(150);
  const el = await p.$('#w'); const bb = await el.boundingBox();
  await p.setViewportSize({ width: Math.ceil(bb.width), height: 600 });
  await p.screenshot({ path: path.join(dir, 'preview.png'), clip: { x: 0, y: 0, width: Math.ceil(bb.width), height: 600 } });
  await p.close();
}
// ---- mp4
if (flag !== '--no-mp4') {
  const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  const layers = svgs.map((s, i) => s.replace('<svg ', `<svg class="pz" id="p${i}" style="display:none" `)).join('');
  await p.setContent(`<html><head><style>body{margin:0;background:#F5F8FA;font-family:Segoe UI,Arial;color:#13161B;overflow:hidden}
  .pz{position:absolute;left:0;top:40px;width:1280px;height:670px}#t{position:absolute;left:24px;top:12px;font-size:22px;font-weight:600}
  #s{position:absolute;right:24px;top:14px;font-size:18px;color:#7C8492}</style></head><body><div id=t>${esc(title)}</div><div id=s></div>${layers}</body></html>`);
  const n = svgs.length, fps = 24, total = 4 * fps, per = total / n;
  const frames = path.join(dir, '_frames'); fs.rmSync(frames, { recursive: true, force: true }); fs.mkdirSync(frames);
  for (let f = 0; f < total; f++) {
    await p.evaluate(([f, per, n, fps, labels]) => {
      const i = Math.min(n - 1, Math.floor(f / per)), local = f - i * per, t = f / fps;
      document.querySelectorAll('.pz').forEach((e, k) => e.style.display = k === i ? 'block' : 'none');
      document.getElementById('s').textContent = `pose ${i + 1}/${n}: ${labels[i]}`;
      const svg = document.getElementById('p' + i);
      const pose = svg.querySelector('.pose') || svg.firstElementChild;
      const pop = local < 5 ? 1 - 0.05 * Math.cos((local / 5) * Math.PI / 2) * (1 - local / 5) : 1; // settle
      const breath = 1 + 0.008 * Math.sin(t * 2 * Math.PI * 0.8);
      const bb = pose.getBBox(); const fx = bb.x + bb.width / 2, fy = bb.y + bb.height;
      if (!pose.dataset.base) pose.dataset.base = pose.getAttribute('transform') || '';
      pose.setAttribute('transform', `${pose.dataset.base} translate(${fx} ${fy}) scale(${pop} ${pop * breath}) translate(${-fx} ${-fy})`);
      const head = svg.querySelector('.head');
      if (head) {
        if (!head.dataset.base) head.dataset.base = head.getAttribute('transform') || '';
        const [px, py] = head.dataset.pivot.split(' ').map(Number);
        const ang = 3.5 * Math.sin(t * 2 * Math.PI * 1.1) + (local < 6 ? -4 * (1 - local / 6) : 0);
        head.setAttribute('transform', `rotate(${ang} ${px} ${py}) ${head.dataset.base}`);
      }
    }, [f, per, n, fps, labels]);
    await p.screenshot({ path: path.join(frames, String(f).padStart(4, '0') + '.png') });
  }
  execFileSync('C:/ffmpeg/bin/ffmpeg.exe', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, '%04d.png'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', path.join(dir, 'preview.mp4')]);
  fs.rmSync(frames, { recursive: true, force: true });
  await p.close();
}
await b.close();
console.log('rendered', dir);
