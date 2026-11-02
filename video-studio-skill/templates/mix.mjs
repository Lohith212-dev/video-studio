#!/usr/bin/env node
// Stage 5 (Build and render): mix voice + music bed + sound effects into one track, cued on spoken words.
// Usage: node mix.mjs <project-folder>
// Reads <project>/sound.json:
// {
//   "music": {"file": "<path>", "volume": 0.13, "fadeIn": 1.5, "fadeOut": 3, "dips": [{"from": "B08", "to": "B08", "volume": 0.03}]},
//   "tail": 3.5,                                   // seconds after the voice ends (end card)
//   music.duck (default true) lowers the music under the voice; set "duck": false for a flat bed.
//   "sfx": [{"file": "<path>", "beat": "B03", "word": "twelve", "nth": 1, "offset": 0, "volume": 0.5, "trim": 0.8}, {"file": "...", "at": 160.1}]
// }
// Times come from timing.json + storyboard narration (same estimate the build uses). Writes assets/mix.wav.
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { execFileSync } from "node:child_process";

const dir = resolve(process.argv[2] || ".");
const cfg = JSON.parse(readFileSync(join(dir, "sound.json"), "utf8"));
const timing = JSON.parse(readFileSync(join(dir, "timing.json"), "utf8"));
const sb = JSON.parse(readFileSync(join(dir, "storyboard.json"), "utf8"));
const words = {};
sb.frames.forEach((f) => (words[f.beat] = (words[f.beat] ? words[f.beat] + " " : "") + f.narration));
const B = Object.fromEntries(timing.map((t) => [t.beat, { ...t, words: words[t.beat].split(/\s+/) }]));
const norm = (w) => w.toLowerCase().replace(/[^a-z0-9$.%']/g, "").replace(/\.$/, "");
const at = (beat, word, nth = 1) => {
  const b = B[beat]; let seen = 0;
  for (let i = 0; i < b.words.length; i++) if (norm(b.words[i]) === norm(word) && ++seen === nth) return b.start + (b.dur * i) / b.words.length;
  throw new Error(`word "${word}" (#${nth}) not found in ${beat}`);
};
const vo = join(dir, "assets/vo/full.wav");
const voDur = parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", vo]).toString());
const total = voDur + (cfg.tail ?? 3);

const inputs = ["-i", vo];
const filters = [];
let n = 1;
// The voice is split: one copy goes to the mix, one drives the music ducking (music dips 4-6 dB while someone speaks).
const duck = cfg.music?.duck !== false;
const mixIn = ["[0:a]aformat=sample_rates=44100:channel_layouts=stereo,apad=whole_dur=" + total.toFixed(2) + (duck && cfg.music ? ",asplit=2[v][vsc]" : "[v]")];
const labels = ["[v]"];

if (cfg.music) {
  const m = cfg.music;
  inputs.push("-stream_loop", "-1", "-i", resolve(dir, m.file));
  // Volume envelope: base level, dips between beats, fades at both ends.
  let vol = `${m.volume ?? 0.13}`;
  for (const d of m.dips || []) {
    const a = B[d.from].start - 0.3, b = B[d.to].start + B[d.to].dur + 0.3;
    vol = `if(between(t,${a.toFixed(2)},${b.toFixed(2)}),${d.volume ?? 0.03},${vol})`;
  }
  filters.push(`[${n}:a]aformat=sample_rates=44100:channel_layouts=stereo,atrim=0:${total.toFixed(2)},volume='${vol}':eval=frame,afade=t=in:d=${m.fadeIn ?? 1.5},afade=t=out:st=${(total - (m.fadeOut ?? 3)).toFixed(2)}:d=${m.fadeOut ?? 3}${duck ? "[mraw]" : "[m]"}`);
  if (duck) filters.push(`[mraw][vsc]sidechaincompress=threshold=0.03:ratio=4:attack=30:release=350:makeup=1[m]`);
  labels.push("[m]");
  n++;
}
const placed = [];
// Each sound file is loaded once and split into as many copies as it is used (keeps the command short on Windows).
const uses = new Map();
for (const s of cfg.sfx || []) {
  const t = (s.at ?? at(s.beat, s.word, s.nth ?? 1)) + (s.offset ?? 0);
  const f = resolve(dir, s.file);
  if (!uses.has(f)) uses.set(f, []);
  uses.get(f).push({ ...s, t });
}
for (const [f, list] of uses) {
  inputs.push("-i", f);
  const src = n++;
  const copies = list.map((_, k) => `[c${src}_${k}]`);
  filters.push(`[${src}:a]aformat=sample_rates=44100:channel_layouts=stereo,asplit=${list.length}${copies.join("")}`);
  list.forEach((s, k) => {
    const trim = s.trim ? `atrim=0:${s.trim},afade=t=out:st=${Math.max(0, s.trim - 0.15)}:d=0.15,` : "";
    const ms = Math.round(Math.max(0, s.t) * 1000);
    filters.push(`${copies[k]}${trim}volume=${s.volume ?? 0.5},adelay=${ms}|${ms}[s${src}_${k}]`);
    labels.push(`[s${src}_${k}]`);
    placed.push({ file: s.file.split("/").pop(), t: +s.t.toFixed(2) });
  });
}
const graph = [...mixIn, ...filters, `${labels.join("")}amix=inputs=${labels.length}:duration=first:normalize=0,alimiter=limit=0.95,loudnorm=I=-15:TP=-1.5:LRA=11,aresample=44100[out]`].join(";");
const out = join(dir, "assets/mix.wav");
const graphFile = join(dir, "assets/mix-graph.txt");
writeFileSync(graphFile, graph);
execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...inputs, "-filter_complex_script", graphFile, "-map", "[out]", "-t", total.toFixed(2), out], { stdio: ["ignore", "inherit", "inherit"] });
writeFileSync(join(dir, "assets/mix-cues.json"), JSON.stringify(placed, null, 2));
console.log(`mix.wav ${total.toFixed(2)}s · music ${cfg.music ? "yes" : "no"} · ${placed.length} sound effects from ${uses.size} files`);
