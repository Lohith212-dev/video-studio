#!/usr/bin/env node
// Renders a long video in parts (one per chapter) and joins them, so a fix re-renders only its part.
// See knowledge/rendering.md for when to use it.
//
// Usage (from anywhere):
//   node render_parts.mjs <project> --at 0,48.5,97,141      cut points in seconds (chapter starts); or
//   node render_parts.mjs <project> --every 60              a part every 60 s (default)
//   options: --only 2,3       re-render just these parts (1-based); the others are reused from renders/parts/
//            --workers N      workers per part (default: from free memory, see rendering.md)
//            --quality draft  passed to hyperframes (default: hyperframes' own default)
//            --out renders/final.mp4
//            --audio assets/mix.wav   the full soundtrack (default: the first <audio> in index.html)
//
// How it works: for each part it writes part-NN.html next to index.html. It is index.html with the
// main GSAP timeline played from the part's start to its end, clip times shifted, and no audio.
// Each part is rendered silent, one after another (never in parallel: memory). The parts are joined
// without re-encoding, then the full soundtrack is laid over the whole video once, so there are no
// audio seams. Works for projects whose animation lives in window.__timelines["main"] (the way this
// skill builds videos). Cut points are rounded to whole frames.
import { readFileSync, writeFileSync, existsSync, mkdirSync, unlinkSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import os from "node:os";

const args = process.argv.slice(2);
const dir = resolve(args[0] && !args[0].startsWith("--") ? args[0] : ".");
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const html = readFileSync(join(dir, "index.html"), "utf8");
const rootTag = html.match(/<[^>]*data-composition-id[^>]*>/)?.[0] || "";
const total = Number(rootTag.match(/data-duration="([\d.]+)"/)?.[1]);
const fps = Number(rootTag.match(/data-fps="([\d.]+)"/)?.[1] || 30);
if (!total) { console.error("Couldn't read data-duration on the root composition in index.html"); process.exit(1); }

const snap = (t) => Math.round(t * fps) / fps;
let cuts = opt("at") ? opt("at").split(",").map(Number) : [];
if (!cuts.length) { const every = Number(opt("every", 60)); for (let t = 0; t < total - 1; t += every) cuts.push(t); }
cuts = [...new Set(cuts.map(snap).filter((t) => t >= 0 && t < total))].sort((a, b) => a - b);
if (cuts[0] !== 0) cuts.unshift(0);
const parts = cuts.map((a, i) => ({ n: i + 1, a, b: i + 1 < cuts.length ? cuts[i + 1] : snap(total) }));
const only = opt("only") ? opt("only").split(",").map(Number) : null;
const partsDir = join(dir, "renders", "parts");
mkdirSync(partsDir, { recursive: true });
const pad = (n) => String(n).padStart(2, "0");
const file = (p) => join(partsDir, `part-${pad(p.n)}.mp4`);

// Memory rule from knowledge/rendering.md (measured: a render uses about 1.2 GB + 1 GB per worker):
// workers = free GB minus 2, rounded down, between 1 and 4. Never start under 2.5 GB free.
// On a Mac, "free" also counts inactive and purgeable pages (os.freemem() alone reads far too low there).
function freeGB() {
  if (process.platform === "darwin") {
    try {
      const vm = execFileSync("vm_stat").toString();
      const page = Number(vm.match(/page size of (\d+)/)?.[1] || 16384);
      const pages = (k) => Number(vm.match(new RegExp(`Pages ${k}:\\s+(\\d+)`))?.[1] || 0);
      return ((pages("free") + pages("inactive") + pages("speculative") + pages("purgeable")) * page) / 1024 ** 3;
    } catch {}
  }
  return os.freemem() / 1024 ** 3;
}
const pickWorkers = () => Math.max(1, Math.min(4, Math.floor(freeGB() - 2)));
async function waitForMemory() {
  for (let waited = 0; freeGB() < 2.5; waited += 60) {
    if (waited >= 1800) throw new Error(`Only ${freeGB().toFixed(1)} GB free after 30 min. Close other apps and try again.`);
    console.log(`Waiting for memory: ${freeGB().toFixed(1)} GB free, need 2.5 GB. Checking again in 60 s.`);
    await new Promise((r) => setTimeout(r, 60000));
  }
}

function partHtml(p) {
  const len = +(p.b - p.a).toFixed(4);
  let h = html.replace(/<audio\b[^>]*>(\s*<\/audio>)?/g, "");
  // Shift every clip's time window into the part; the root gets the part length.
  h = h.replace(/<[a-z][^>]*\bdata-start="([\d.]+)"[^>]*>/g, (tag) => {
    if (/data-composition-id/.test(tag)) return tag.replace(/data-duration="[\d.]+"/, `data-duration="${len}"`);
    const s = Number(tag.match(/data-start="([\d.]+)"/)[1]);
    const dm = tag.match(/data-duration="([\d.]+)"/);
    const e = dm ? s + Number(dm[1]) : total;
    const ns = Math.max(0, s - p.a), ne = Math.min(len, e - p.a);
    if (ne <= ns) return tag.replace(/data-start="[\d.]+"/, `data-start="0"`).replace(/data-duration="[\d.]+"/, `data-duration="${(1 / fps).toFixed(4)}"`).replace(/^<([a-z]+)/, '<$1 style="visibility:hidden"');
    let t = tag.replace(/data-start="[\d.]+"/, `data-start="${+ns.toFixed(4)}"`);
    return dm ? t.replace(/data-duration="[\d.]+"/, `data-duration="${+(ne - ns).toFixed(4)}"`) : t;
  });
  // Play the main timeline from the part's start to its end.
  const shim = `<script>(function(){var T=window.__timelines||{},m=T["main"];if(!m)return;
var w=gsap.timeline({paused:true});w.add(m.tweenFromTo(${p.a},${p.b},{ease:"none",immediateRender:false}),0);
window.__timelines["main"]=w;w.seek(0);})();</script>`;
  return h.replace(/<\/body>/i, `${shim}\n</body>`);
}

const audioSrc = opt("audio") || html.match(/<audio\b[^>]*\bsrc="([^"]+)"/)?.[1];
const q = opt("quality");
const out = resolve(dir, opt("out", "renders/final.mp4"));
const redo = only ? parts.filter((p) => only.includes(p.n) || !existsSync(file(p))) : parts;

console.log(`${parts.length} parts: ${parts.map((p) => `${p.n} (${p.a.toFixed(2)}-${p.b.toFixed(2)} s)`).join(", ")}`);
console.log(`Rendering ${redo.length === parts.length ? "all parts" : "part " + redo.map((p) => p.n).join(", ")}${redo.length < parts.length ? "; reusing the rest" : ""}.`);
for (const p of redo) {
  await waitForMemory();
  const workers = opt("workers") || String(pickWorkers());
  const comp = `part-${pad(p.n)}.html`;
  writeFileSync(join(dir, comp), partHtml(p));
  const t0 = Date.now();
  console.log(`Part ${p.n}: ${p.a.toFixed(2)}-${p.b.toFixed(2)} s, ${workers} worker(s), ${freeGB().toFixed(1)} GB free`);
  const hf = ["-y", "hyperframes@0.8.216", "render", dir, "-c", comp, "-o", file(p), "--workers", workers, "--quiet", ...(q ? ["--quality", q] : [])];
  const r = process.platform === "win32"
    ? spawnSync("npx " + hf.map((a) => `"${a}"`).join(" "), { stdio: "inherit", shell: true }) // quoting "npx" itself breaks npx.cmd
    : spawnSync("npx", hf, { stdio: "inherit" });
  unlinkSync(join(dir, comp));
  if (r.status !== 0 || !existsSync(file(p))) { console.error(`Part ${p.n} failed.`); process.exit(1); }
  console.log(`Part ${p.n} done in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
}

// Join without re-encoding, then lay the full soundtrack over the whole video.
const list = join(partsDir, "list.txt");
writeFileSync(list, parts.map((p) => `file '${file(p).replace(/\\/g, "/").replace(/'/g, "'\\''")}'`).join("\n") + "\n");
const joined = join(partsDir, "joined.mp4");
execFileSync("ffmpeg", ["-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", list, "-map", "0:v", "-c", "copy", joined]);
if (audioSrc && existsSync(join(dir, audioSrc))) {
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", joined, "-i", join(dir, audioSrc), "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-t", String(snap(total)), out]);
} else {
  console.warn("No soundtrack found (pass --audio <file>); the video is silent.");
  execFileSync("ffmpeg", ["-y", "-v", "error", "-i", joined, "-c", "copy", out]);
}
unlinkSync(joined);
const frames = execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-count_packets", "-show_entries", "stream=nb_read_packets", "-of", "csv=p=0", out]).toString().trim();
console.log(`Joined ${parts.length} parts → ${out} (${frames} frames, expected ${Math.round(snap(total) * fps)}; ${(statSync(out).size / 1e6).toFixed(1)} MB)`);
