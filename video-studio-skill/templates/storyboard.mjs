#!/usr/bin/env node
// Writes <project>/storyboard.html from <project>/storyboard.json.
// Usage: node storyboard.mjs <project-folder>
// storyboard.json: { title, style, palette: {bg, ink, accent, ...}, worlds: {name: colour}, changes: ["what the re-pace changed", ...], frames: [ ...frame schema... ] }
// Each frame may carry "sketch_svg": inner SVG markup for a 160x90 viewBox. Without it, a box sketch is drawn from "elements".
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const dir = resolve(process.argv[2] || ".");
const sb = JSON.parse(readFileSync(join(dir, "storyboard.json"), "utf8"));
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pal = { bg: "#2d4237", ink: "#eef0e4", accent: "#f6a800", ...(sb.palette || {}) };
const worlds = sb.worlds || {};
const total = (sb.frames || []).reduce((t, f) => t + (+f.seconds_estimate || 0), 0);
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

// Fallback sketch: one labelled box per element, laid out in a simple grid.
const autoSketch = (f) => {
  const els = (f.elements || []).slice(0, 6);
  const cols = els.length > 3 ? 3 : Math.max(1, els.length);
  const rows = Math.ceil(els.length / cols) || 1;
  const w = 150 / cols, h = 70 / rows;
  return els.map((e, i) => {
    const x = 5 + (i % cols) * w, y = 12 + Math.floor(i / cols) * h;
    return `<rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h - 4}" rx="3" fill="none" stroke="${pal.ink}" stroke-opacity=".6" stroke-dasharray="3 2"/>
      <text x="${x + w / 2}" y="${y + h / 2 + 2}" text-anchor="middle" font-size="6" fill="${pal.ink}">${esc(e.text || e.id || e.kind)}</text>`;
  }).join("");
};

let t = 0;
const cards = (sb.frames || []).map((f) => {
  const start = t; t += +f.seconds_estimate || 0;
  const bg = worlds[f.world] || pal.bg;
  const motion = (f.motion || []).map((m) => `<li><b>“${esc(m.at_word)}”</b> ${esc(m.what)}</li>`).join("");
  const sfx = (f.sfx || []).map((s) => `${esc(s.file)}${s.at_word ? ` on “${esc(s.at_word)}”` : ""}`).join(", ");
  const assets = (f.elements || []).map((e) => `<span class="tag">${esc(e.id)} · ${esc((e.source || "").split(":")[0])}</span>`).join("");
  return `<article class="card" id="${esc(f.frame)}">
    <div class="sk"><svg viewBox="0 0 160 90" role="img" aria-label="Sketch of frame ${esc(f.frame)}"><rect width="160" height="90" fill="${bg}"/>${f.sketch_svg || autoSketch(f)}</svg></div>
    <div class="body">
      <div class="hd"><span class="id">${esc(f.frame)}</span><span class="tc">${fmt(start)}–${fmt(t)}</span><span class="ty">${esc(f.scene_type || "")}</span></div>
      <p class="nar">${esc(f.narration)}</p>
      ${f.intent ? `<p class="int">${esc(f.intent)}</p>` : ""}
      ${motion ? `<ul class="mo">${motion}</ul>` : ""}
      ${(f.on_screen_text || []).length ? `<p class="small"><b>On screen:</b> ${f.on_screen_text.map(esc).join(" · ")}</p>` : ""}
      ${sfx ? `<p class="small"><b>Sound:</b> ${sfx}</p>` : ""}
      ${assets ? `<div class="tags">${assets}</div>` : ""}
      ${f.risk ? `<p class="risk">Risk: ${esc(f.risk)}</p>` : ""}
    </div></article>`;
}).join("");

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(sb.title || "Storyboard")} · Storyboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=VT323&display=swap" rel="stylesheet">
<style>
:root{color-scheme:light;--desk:#f7f7f8;--ink:#272727;--muted:#6e6e6e;--paper:#fff;--line:#e4e4e7;--risk:#e5484d;--night:#2b2b2b;
--sans:"Hanken Grotesk",-apple-system,"Segoe UI",system-ui,sans-serif;--mono:"IBM Plex Mono",ui-monospace,Menlo,monospace;--pixel:"VT323",monospace}
*{box-sizing:border-box}body{margin:0;background:var(--desk);color:var(--ink);font:15px/1.5 var(--sans);padding:28px max(16px,4vw) 64px}
.head{max-width:1240px;margin:0 auto 26px;display:grid;gap:10px;justify-items:center;text-align:center}
.eyebrow{font:500 11px var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
h1{font-size:clamp(32px,5.5vw,60px);line-height:1;letter-spacing:-.05em;font-weight:500;margin:0;max-width:18ch;text-wrap:balance}
h1 .px{font-family:var(--pixel);font-weight:400;letter-spacing:0;font-size:1.1em}
.sub{margin:0;color:var(--muted);max-width:60ch}.chips{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}
.chip{font:500 11px var(--mono);letter-spacing:.08em;text-transform:uppercase;background:#eeeef0;border-radius:999px;padding:5px 11px}
.list{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:22px}
.card{background:var(--paper);border-radius:12px;overflow:hidden;display:grid;min-width:0;box-shadow:0 1px 0 rgba(0,0,0,.04),0 10px 26px rgba(0,0,0,.07)}
.card:nth-child(3n+1){transform:rotate(-.6deg)}.card:nth-child(3n+2){transform:rotate(.5deg)}
.sk{padding:10px 10px 0}.sk svg{display:block;width:100%;height:auto;border-radius:6px}
.body{padding:12px 16px 16px;display:grid;gap:8px;min-width:0}
.hd{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap}.id{font-size:28px;font-weight:500;letter-spacing:-.05em;line-height:1}
.tc,.ty{font:500 10.5px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.ty{background:#f1f1f2;border-radius:5px;padding:2px 6px}
.nar{margin:0;font-size:16px;line-height:1.45;letter-spacing:-.01em}.int{margin:0;color:var(--muted);font-size:13.5px}
.mo{margin:0;padding:10px 12px;list-style:none;font-size:13px;background:#f7f7f8;border-radius:8px;display:grid;gap:4px}
.mo b{font-family:var(--mono);font-weight:500;font-size:11.5px;background:#fff;border:1px solid var(--line);border-radius:4px;padding:0 4px;margin-right:4px}
.small{margin:0;font-size:13px}.tags{display:flex;flex-wrap:wrap;gap:4px}
.tag{font:10.5px var(--mono);border:1px solid var(--line);border-radius:5px;padding:1px 6px;color:var(--muted)}
.risk{margin:0;color:var(--risk);font-weight:600;font-size:13px}

.chg{background:var(--paper);border:1px solid var(--line);border-radius:10px;padding:12px 16px;text-align:left;max-width:640px;font-size:14px}.chg ul{margin:6px 0 0;padding-left:20px}
footer{text-align:center;font:22px var(--pixel);color:#9a9a9a;margin-top:40px}
</style></head><body>
<div class="head"><div class="eyebrow">Stage 2 · Storyboard · approve before we build</div>
<h1>${esc(sb.title || "Storyboard")}</h1>
<div class="chips"><span class="chip">${(sb.frames || []).length} frames</span><span class="chip">${fmt(total)} estimated</span><span class="chip">${esc(sb.style || "")}</span></div>
<p class="sub">Reply in the chat with Claude: "approve", or notes per frame, e.g. "f04: use a pie instead".</p>
${(sb.changes || []).length ? `<div class="chg"><b>What changed in the script for this style</b><ul>${sb.changes.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>` : ""}</div>
<div class="list">${cards}</div><footer>@ Video Studio</footer></body></html>`;

writeFileSync(join(dir, "storyboard.html"), html);
console.log("storyboard.html updated:", join(dir, "storyboard.html"), `(${(sb.frames || []).length} frames, ${fmt(total)})`);
