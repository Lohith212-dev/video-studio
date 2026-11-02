#!/usr/bin/env node
// Stage 4 (Preview): one voice clip per storyboard beat, measured, joined into one track.
// Usage: node voice.mjs <project-folder> [--voice am_michael] [--speed 0.92] [--gap 0.5] [--only B03,B04]
// Free voice (default): Kokoro through HyperFrames. Expressive voice (paid, ask first): set project.json → voice to
//   {"provider": "openrouter", "model": "elevenlabs/eleven-v3", "id": "<voice id>", "prefix": "[excited]", "tags": {"B08": "[serious]"}}
//   and OPENROUTER_API_KEY in the environment. Tags are sent to the voice only; they never reach the on-screen words.
//   "tempo": 1.2 speeds the clip up without changing pitch (to hit the style's pace). --reuse re-processes the
//   saved .mp3 clips (new tempo, new gaps) without paying for the voice again.
//   Per beat: "tempos": {"B10": 1.3} sets the pace and "gaps": {"B03": 0.1} the pause after that beat, so the read
//   doesn't sound like evenly stitched clips.
// Needs: npx hyperframes (Kokoro TTS), ffmpeg + ffprobe on PATH, HYPERFRAMES_PYTHON set to a venv with kokoro-onnx.
// Writes assets/vo/<beat>.wav, assets/vo/full.wav and timing.json ([{beat, start, dur, file, words}]).
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, resolve, basename } from "node:path";
import { execFileSync } from "node:child_process";

const args = process.argv.slice(2);
const dir = resolve(args[0] || ".");
const opt = (name, def) => { const i = args.indexOf("--" + name); return i > -1 ? args[i + 1] : def; };
const project = JSON.parse(readFileSync(join(dir, "project.json"), "utf8"));
const voice = opt("voice", project.voice?.id || "am_michael");
const speed = opt("speed", String(project.voice?.speed ?? 0.92));
const gap = parseFloat(opt("gap", "0.5"));
const only = opt("only", "") ? opt("only").split(",") : null;
const provider = project.voice?.provider || "kokoro";
const sb = JSON.parse(readFileSync(join(dir, "storyboard.json"), "utf8"));
const isWin = process.platform === "win32";
const run = (cmd, a, o = {}) => execFileSync(cmd, a, { stdio: ["ignore", "pipe", "pipe"], shell: isWin && cmd === "npx", ...o }).toString();

// One narration per beat (frames sharing a beat are merged in order).
const beats = [];
for (const f of sb.frames) {
  const last = beats[beats.length - 1];
  if (last && last.beat === f.beat) last.text += " " + f.narration;
  else beats.push({ beat: f.beat, text: f.narration });
}

const voDir = join(dir, "assets", "vo");
// One clip from OpenRouter's speech endpoint (OpenAI-compatible), trimmed of edge silence and saved as 24 kHz mono wav.
async function openrouterSpeech(b, out) {
  const v = project.voice;
  const mp3 = out.replace(/\.wav$/, ".mp3");
  if (args.includes("--reuse") && existsSync(mp3)) return toWav(mp3, out, v);
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY is not set (see knowledge/openrouter.md)");
  const input = [v.tags?.[b.beat] ?? v.prefix ?? "", b.text].join(" ").trim();
  const r = await fetch("https://openrouter.ai/api/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "X-Title": "Video Studio" },
    body: JSON.stringify({ model: v.model, voice: v.id, input, response_format: "mp3", ...(v.instructions ? { instructions: v.instructions } : {}) }),
  });
  if (!r.ok) throw new Error(`speech ${b.beat} → ${r.status}: ${(await r.text()).slice(0, 300)}`);
  writeFileSync(mp3, Buffer.from(await r.arrayBuffer()));
  toWav(mp3, out, v);
}
function toWav(mp3, out, v) {
  const tempo = v.tempos?.[basename(out, ".wav")] ?? v.tempo;
  const trim = "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse" + (tempo ? `,atempo=${tempo}` : "");
  run("ffmpeg", ["-y", "-loglevel", "error", "-i", mp3, "-af", trim, "-ar", "24000", "-ac", "1", out]);
}
mkdirSync(voDir, { recursive: true });
const dur = (file) => parseFloat(run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]));

for (const b of beats) {
  const out = join(voDir, `${b.beat}.wav`);
  if (only && !only.includes(b.beat) && existsSync(out)) continue;
  const txt = join(voDir, `${b.beat}.txt`);
  writeFileSync(txt, b.text);
  process.stdout.write(`voice ${b.beat} ... `);
  if (provider === "openrouter") await openrouterSpeech(b, out);
  else run("npx", ["-y", "hyperframes@latest", "tts", txt, "--voice", voice, "--speed", speed, "-o", out], { cwd: dir });
  console.log(dur(out).toFixed(2) + "s");
}

// Silence gap file, then concat list.
const silence = join(voDir, "gap.wav");
run("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", `anullsrc=r=24000:cl=mono`, "-t", String(gap), silence]);
let t = 0.4; // small lead-in before the first word
const lead = join(voDir, "lead.wav");
run("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", `anullsrc=r=24000:cl=mono`, "-t", String(t), lead]);
const list = [`file '${lead.replace(/\\/g, "/")}'`];
const timing = [];
beats.forEach((b, i) => {
  const file = join(voDir, `${b.beat}.wav`);
  const d = dur(file);
  timing.push({ beat: b.beat, start: +t.toFixed(3), dur: +d.toFixed(3), file: `assets/vo/${b.beat}.wav`, words: b.text.split(/\s+/).length });
  list.push(`file '${file.replace(/\\/g, "/")}'`);
  t += d;
  if (i < beats.length - 1) {
    const g = project.voice?.gaps?.[b.beat] ?? gap;
    const gf = g === gap ? silence : join(voDir, `gap-${g}.wav`);
    if (!existsSync(gf)) run("ffmpeg", ["-y", "-loglevel", "error", "-f", "lavfi", "-i", `anullsrc=r=24000:cl=mono`, "-t", String(g), gf]);
    list.push(`file '${gf.replace(/\\/g, "/")}'`);
    t += g;
  }
});
const listFile = join(voDir, "concat.txt");
writeFileSync(listFile, list.join("\n"));
// Re-encode so mixed sample rates/channels join cleanly.
run("ffmpeg", ["-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", listFile, "-ar", "24000", "-ac", "1", join(voDir, "full.wav")]);
writeFileSync(join(dir, "timing.json"), JSON.stringify(timing, null, 2));
const total = dur(join(voDir, "full.wav"));
const words = timing.reduce((a, b) => a + b.words, 0);
console.log(`full.wav ${total.toFixed(2)}s · ${timing.length} beats · ${Math.round(words / (total / 60))} wpm`);
