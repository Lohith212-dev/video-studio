#!/usr/bin/env node
// Writes <project>/styles.html: one tile per style, for the style choice at stage 2.
// Usage: node stylepicker.mjs <project-folder> [--recommend id1,id2,id3]
// Reads every <skill>/styles/*.md frontmatter (name, one_line, pace_wpm, signature_moves, tested,
// needs_on_camera_person, best_for, not_for, references) and the images in
// <skill>/assets/style-tiles/<id>-cover.jpg and <id>-sheet.jpg (embedded, so the page works offline).
// The public skill ships without them (the frames belong to the creators); tiles then show the style name.
// The page is for looking only: the user tells Claude in the chat which style they want.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const skill = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const dir = resolve(args.find((a) => !a.startsWith("--") && args[args.indexOf(a) - 1] !== "--recommend") || ".");
const ri = args.indexOf("--recommend");
const recommend = ri >= 0 && args[ri + 1] ? args[ri + 1].split(",").map((s) => s.trim()).filter(Boolean) : [];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Tiny frontmatter reader: top-level "key: value", [a, b] lists, and the first references url.
function frontmatter(text) {
  const m = text.replace(/\r/g, "").match(/^---\n([\s\S]*?)\n---/);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if (/^(true|false)\b/.test(v)) v = v.startsWith("true");
      else if (v.startsWith("[")) v = v.replace(/^\[|\]\s*(#.*)?$/g, "").split(",").map((x) => x.trim().replace(/^"|"$/g, "")).filter(Boolean);
      else v = v.replace(/^"(.*)"$/, "$1");
      out[kv[1]] = v;
    } else if (!out.ref && /^\s+url:\s*/.test(line)) out.ref = line.replace(/^\s+url:\s*/, "").trim();
  }
  return out;
}

const img = (file) => existsSync(file) ? `data:image/jpeg;base64,${readFileSync(file).toString("base64")}` : "";
const all = readdirSync(join(skill, "styles")).filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  .map((f) => ({ id: f.replace(/\.md$/, ""), ...frontmatter(readFileSync(join(skill, "styles", f), "utf8")) }));
const rank = (s) => (recommend.includes(s.id) ? recommend.indexOf(s.id) : 100 + (s.tested ? 0 : 1));
const styles = all.sort((a, b) => rank(a) - rank(b) || String(a.name).localeCompare(String(b.name)));

let title = "Your video";
try { title = JSON.parse(readFileSync(join(dir, "project.json"), "utf8")).title || title; } catch {}

const paceText = (s) => s.pace_wpm ? `${s.pace_wpm}${/^\d+$/.test(s.pace_wpm) ? " words a minute" : ""}` : "";
const tiles = styles.map((s, i) => {
  const rec = recommend.includes(s.id);
  const tiles = join(skill, "assets", "style-tiles");
  return `<div class="tile${rec ? " rec" : ""}" data-i="${i}" role="button" tabindex="0" aria-label="${esc(s.name)}: open details">
    <div class="cover">${img(join(tiles, `${s.id}-cover.jpg`)) ? `<img alt="" src="${img(join(tiles, `${s.id}-cover.jpg`))}">` : `<span class="ph">${esc(s.name)}</span>`}<span class="n">${i + 1}</span>${rec ? '<span class="sug">Suggested</span>' : ""}</div>
    <div class="body">
      <h2>${esc(s.name)}</h2>
      <p class="one">${esc(s.one_line)}</p>
      <div class="chips"><span class="chip ${s.tested ? "ok" : "un"}">${s.tested ? "Tested" : "Untested"}</span>${s.pace_wpm ? `<span class="chip">${esc(paceText(s))}</span>` : ""}${s.needs_on_camera_person ? '<span class="chip">Needs a presenter</span>' : ""}</div>
      ${(s.signature_moves || []).length ? `<p class="moves"><b>Signature moves:</b> ${esc(s.signature_moves.join(" · "))}</p>` : ""}
      ${s.ref ? `<a class="ref" href="${esc(s.ref)}" target="_blank" rel="noopener">Watch the original video</a>` : ""}
    </div>
  </div>`;
}).join("");

const sheets = styles.map((s) => ({
  name: s.name, one: s.one_line, ref: s.ref || "", tested: !!s.tested, note: s.tested ? "" : (s.tested_note || "works, but expect one extra feedback round"),
  pace: paceText(s), moves: s.signature_moves || [], best: s.best_for || [], not: s.not_for || [], cam: !!s.needs_on_camera_person,
  sheet: img(join(skill, "assets", "style-tiles", `${s.id}-sheet.jpg`)), id: s.id,
}));

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Pick a style · ${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<style>
:root{color-scheme:light;--bg:#f7f7f8;--surface:#fff;--sunken:#f0f0f2;--ink:#1d1d1f;--text:#3f3f46;--muted:#6e6e76;--line:#e3e3e8;--accent:#2f5bea;--accent-soft:#e8eefe;--good:#16825d;--good-soft:#e3f4ec;--warn:#a35a00;--warn-soft:#fdf0dc;
--font:"Hanken Grotesk",-apple-system,"Segoe UI",system-ui,sans-serif;--mono:"IBM Plex Mono",ui-monospace,Menlo,monospace}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:15px/1.55 var(--font)}
.wrap{max-width:1180px;margin:0 auto;padding:28px max(16px,3vw) 64px}
h1,h2{color:var(--ink);margin:0;letter-spacing:-.015em}h1{font-size:clamp(24px,4vw,32px);font-weight:800}
.eyebrow{font:500 11px var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.how{margin:12px 0 24px;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px;font-size:16px;box-shadow:inset 3px 0 0 var(--warn)}.how b{color:var(--ink)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px}
.tile{cursor:pointer;text-align:left;display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden;transition:box-shadow .15s,transform .15s}
.tile:hover,.tile:focus-visible{box-shadow:0 6px 24px rgba(0,0,0,.08);transform:translateY(-2px)}.tile:focus-visible{outline:2px solid var(--accent)}
.tile.rec{border:2px solid var(--accent)}
.cover{position:relative;aspect-ratio:16/9;background:var(--sunken)}.cover .ph{position:absolute;inset:0;display:grid;place-items:center;padding:16px;text-align:center;font-weight:800;font-size:20px;color:var(--muted)}.cover img{width:100%;height:100%;object-fit:cover;display:block}
.n{position:absolute;left:10px;top:10px;background:rgba(255,255,255,.95);color:var(--ink);font-weight:800;font-size:14px;width:28px;height:28px;border-radius:7px;display:grid;place-items:center}
.sug{position:absolute;right:10px;top:10px;background:var(--accent);color:#fff;font-weight:700;font-size:12px;padding:3px 9px;border-radius:6px}
.body{padding:14px 16px 16px;display:grid;gap:8px}.body h2{font-size:17px}
.one{margin:0;color:var(--text);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.chips{display:flex;gap:6px;flex-wrap:wrap}.chip{font-size:12px;font-weight:700;padding:2px 8px;border-radius:5px;background:var(--sunken);color:var(--muted)}
.chip.ok{background:var(--good-soft);color:var(--good)}.chip.un{background:var(--warn-soft);color:var(--warn)}
.ref{color:var(--accent);font-weight:600;font-size:13px;text-decoration:none;justify-self:start}.ref:hover{text-decoration:underline}
.moves{margin:0;font-size:13px;color:var(--muted)}.moves b{color:var(--ink);font-weight:600}
dialog{border:0;border-radius:14px;padding:0;max-width:min(980px,94vw);width:100%;box-shadow:0 20px 60px rgba(0,0,0,.25)}dialog::backdrop{background:rgba(20,20,24,.55)}
.sheet{display:grid;gap:12px;padding:20px 22px 24px}.sheet img{width:100%;border-radius:8px;display:block;background:var(--sunken)}
.sheet h2{font-size:22px}.sheet p{margin:0}.sheet dl{display:grid;grid-template-columns:auto 1fr;gap:6px 14px;margin:0;font-size:14px}.sheet dt{color:var(--muted)}.sheet dd{margin:0;color:var(--ink)}
.top{display:flex;justify-content:space-between;align-items:center;gap:12px}.x{all:unset;cursor:pointer;font-size:14px;font-weight:700;color:var(--muted);padding:6px 10px;border-radius:6px;background:var(--sunken)}
.sheet a{color:var(--accent);font-weight:600}.note{background:var(--warn-soft);color:var(--warn);border-radius:6px;padding:8px 12px;font-size:14px}
</style></head><body><div class="wrap">
<div class="eyebrow">Video Studio · ${esc(title)}</div>
<h1>Pick a style</h1>
<div class="how"><b>How to pick:</b> look at the tiles, tap one to see more, then tell Claude in the chat which one you want (a name or a number).${recommend.length ? " The blue ones are Claude's suggestions for this video." : ""} <b>Tested</b> styles have been built end to end; <b>untested</b> ones work, but expect one extra feedback round.</div>
<div class="grid">${tiles}</div>
<dialog id="d"><div class="sheet" id="s"></div></dialog>
</div>
<script>
const S=${JSON.stringify(sheets)};
const e=(t)=>String(t??"").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const d=document.getElementById("d"),s=document.getElementById("s");
document.querySelectorAll(".ref").forEach((a)=>a.addEventListener("click",(ev)=>ev.stopPropagation()));
document.querySelectorAll(".tile").forEach((b)=>b.addEventListener("keydown",(ev)=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();b.click();}}));
document.querySelectorAll(".tile").forEach((b)=>b.addEventListener("click",()=>{const x=S[+b.dataset.i];
s.innerHTML='<div class="top"><h2>'+(+b.dataset.i+1)+'. '+e(x.name)+'</h2><button class="x" onclick="d.close()">Close</button></div>'
+(x.sheet?'<img alt="Frames from the reference video" src="'+x.sheet+'">':'')
+'<p>'+e(x.one)+'</p>'+(x.note?'<div class="note">Untested: '+e(x.note)+'</div>':'')
+'<dl>'+(x.pace?'<dt>Pace</dt><dd>'+e(x.pace)+'</dd>':'')+(x.moves.length?'<dt>Signature moves</dt><dd>'+e(x.moves.join(" · "))+'</dd>':'')
+(x.best.length?'<dt>Good for</dt><dd>'+e(x.best.join(", "))+'</dd>':'')+(x.not.length?'<dt>Not for</dt><dd>'+e(x.not.join(", "))+'</dd>':'')
+'<dt>Presenter</dt><dd>'+(x.cam?'Needs a person on camera (a faceless version exists)':'No presenter needed')+'</dd></dl>'
+(x.ref?'<p><a href="'+e(x.ref)+'" target="_blank" rel="noopener">Watch the original video</a></p>':'')
+'<p style="color:var(--muted)">Want this one? Tell Claude in the chat: "'+(+b.dataset.i+1)+'" or "'+e(x.name)+'".</p>';
d.showModal();}));
d.addEventListener("click",(ev)=>{if(ev.target===d)d.close();});
</script></body></html>`;

writeFileSync(join(dir, "styles.html"), html);
console.log("styles.html written:", join(dir, "styles.html"), `(${styles.length} styles${recommend.length ? `, suggested: ${recommend.join(", ")}` : ""})`);
