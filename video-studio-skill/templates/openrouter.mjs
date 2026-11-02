#!/usr/bin/env node
// UNTESTED. Generates one picture or one short video clip through OpenRouter and saves it in the project.
// Verify the request/response shapes against https://openrouter.ai/docs on first use (see knowledge/openrouter.md).
//
// Usage (run from the project folder):
//   node openrouter.mjs image "<prompt>" --model <id> --out assets/generated/f05.png [--size 1536x1024] [--dry-run]
//   node openrouter.mjs video "<prompt>" --model <id> --seconds 5 --out assets/generated/f09.mp4 [--dry-run]
// Reads the key from the OPENROUTER_API_KEY environment variable. Never prints it.
// Appends a credit line to <out folder>/CREDITS.md.
import { writeFileSync, mkdirSync, appendFileSync } from "node:fs";
import { dirname, basename, join } from "node:path";

const API = "https://openrouter.ai/api/v1";
const [kind, prompt, ...rest] = process.argv.slice(2);
const opt = (name, def) => { const i = rest.indexOf(`--${name}`); return i >= 0 ? rest[i + 1] : def; };
const dry = rest.includes("--dry-run");
const model = opt("model");
const out = opt("out");
if (!["image", "video"].includes(kind) || !prompt || !model || !out) {
  console.error('Usage: node openrouter.mjs image|video "<prompt>" --model <id> --out <file> [--size WxH] [--seconds N] [--dry-run]');
  process.exit(1);
}
const key = process.env.OPENROUTER_API_KEY;
if (!key && !dry) { console.error("OPENROUTER_API_KEY is not set. It's optional; see knowledge/openrouter.md."); process.exit(1); }
const headers = { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "X-Title": "Video Studio" };

const body = kind === "image"
  ? { model, prompt, n: 1, ...(opt("size") ? { size: opt("size") } : {}) }
  : { model, prompt, duration: Number(opt("seconds", 5)), ...(opt("size") ? { size: opt("size") } : {}) };

if (dry) { console.log(`DRY RUN (nothing sent): POST ${API}/${kind === "image" ? "images" : "videos"}`, JSON.stringify(body)); process.exit(0); }

async function call(method, path, json) {
  const r = await fetch(path.startsWith("http") ? path : `${API}${path}`, { method, headers, body: json ? JSON.stringify(json) : undefined });
  const text = await r.text();
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status}: ${text.slice(0, 400)}`);
  try { return JSON.parse(text); } catch { return { raw: text }; }
}
async function download(url) {
  const r = await fetch(url, url.startsWith(API) ? { headers } : {});
  if (!r.ok) throw new Error(`download → ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}
// Pull the first image/video from whatever shape comes back (b64 or a URL).
function firstMedia(res) {
  const items = res.data || res.output || res.images || res.videos || (res.choices?.[0]?.message?.images) || [res];
  const it = Array.isArray(items) ? items[0] : items;
  const b64 = it?.b64_json || it?.b64 || it?.base64;
  const url = it?.url || it?.image_url?.url || it?.video_url || it?.download_url || res.url || res.video_url;
  return { b64, url };
}

mkdirSync(dirname(out), { recursive: true });
let bytes;
if (kind === "image") {
  const res = await call("POST", "/images", body);
  const { b64, url } = firstMedia(res);
  bytes = b64 ? Buffer.from(b64.replace(/^data:[^,]+,/, ""), "base64") : url?.startsWith("data:") ? Buffer.from(url.split(",")[1], "base64") : url ? await download(url) : null;
} else {
  const job = await call("POST", "/videos", body);
  const id = job.id || job.job_id || job.data?.id;
  if (!id) throw new Error("No job id in the reply: " + JSON.stringify(job).slice(0, 300));
  console.log("Video job started:", id, "(checking every 10 s, up to 15 min)");
  let res;
  for (let i = 0; i < 90; i++) {
    await new Promise((r) => setTimeout(r, 10000));
    res = await call("GET", `/videos/${id}`);
    const st = String(res.status || res.state || res.data?.status || "").toLowerCase();
    if (/fail|error|cancel/.test(st)) throw new Error("Video job failed: " + JSON.stringify(res).slice(0, 300));
    if (/complete|succeed|done|ready/.test(st)) break;
  }
  const { b64, url } = firstMedia(res?.data && !Array.isArray(res.data) ? res.data : res);
  bytes = b64 ? Buffer.from(b64, "base64") : url ? await download(url) : null;
}
if (!bytes) throw new Error("Couldn't find the picture/video in the reply. Check the response shape at openrouter.ai/docs.");
writeFileSync(out, bytes);
appendFileSync(join(dirname(out), "CREDITS.md"), `- ${basename(out)} — ${model} via OpenRouter, prompt: "${prompt.replace(/"/g, "'")}", ${new Date().toISOString().slice(0, 10)}\n`);
console.log(`Saved ${out} (${Math.round(bytes.length / 1024)} KB). Credit line added to ${join(dirname(out), "CREDITS.md")}.`);
