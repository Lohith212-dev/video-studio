#!/usr/bin/env node
// Writes <project>/board.html from <project>/project.json — the video project's control board.
// Usage: node board.mjs <project-folder>
// Reads top to bottom: what's happening now (one sentence), the five stages as a strip, the one
// question that needs the user (with Claude's suggestion), then every stage with its purpose, what
// the user reviews, checklist and status, and on the side the look, files and latest activity.
// Also turns script.md into script.html (a readable page). Reloads itself every 4 s.
// Old project.json files with stages 0-9 (+4b, 6b) still work.
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { renderMd } from "./mdpage.mjs";

const dir = resolve(process.argv[2] || ".");
const p = JSON.parse(readFileSync(join(dir, "project.json"), "utf8"));
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const has = (f) => f && existsSync(join(dir, f));

// script.md → script.html, whenever the .md is newer.
if (has("script.md") && (!has("script.html") || statSync(join(dir, "script.md")).mtimeMs > statSync(join(dir, "script.html")).mtimeMs)) {
  renderMd(join(dir, "script.md"), join(dir, "script.html"));
}

// The five stages. A stage in project.json may override "purpose" and "review".
const FIVE = {
  1: { short: "Script", purpose: "Turn your mind dump into a brief and a timed script.", review: "the script page" },
  2: { short: "Storyboard", purpose: "Pick a style and a brand, then see one sketch per idea.", review: "the style picker, then the storyboard" },
  3: { short: "Cast", purpose: "Pick the people: 2-3 candidates per role, dressed for the job. Skipped if there are no people.", review: "the casting page" },
  4: { short: "Preview", purpose: "Hear the voice and watch 20 seconds in the real look before the whole video.", review: "a 20-second clip" },
  5: { short: "Build and render", purpose: "All scenes, music and effects, checks, then the final video with credits.", review: "the full video" },
};
// Stages 0-9 used before Oct 2026 (kept so old project boards still open).
const LEGACY = {
  0: { short: "Setup", purpose: "Check the computer has everything the pipeline needs." },
  1: { short: "Brief", purpose: "Turn your mind dump into a one-page brief." },
  2: { short: "Look", purpose: "Pick a style and a brand.", review: "style and brand" },
  3: { short: "Script", purpose: "Write the narration, timed in beats.", review: "the script" },
  4: { short: "Storyboard", purpose: "Sketch one frame per beat.", review: "the storyboard" },
  "4b": { short: "Cast", purpose: "Pick the people.", review: "the casting page" },
  5: { short: "Voice", purpose: "Record the narration with the free local voice." },
  6: { short: "Build", purpose: "Animate every frame, synced to the voice." },
  "6b": { short: "Preview", purpose: "Watch 20 seconds before the full render.", review: "a 20-second clip" },
  7: { short: "Sound", purpose: "Add the music bed and sound effects." },
  8: { short: "Review", purpose: "Watch a draft and list fixes.", review: "the draft video" },
  9: { short: "Render", purpose: "Render the final video and write the credits." },
};
const stages = p.stages || [];
const legacy = stages.some((s) => s.id === 0 || s.id === "4b" || s.id === "6b" || +s.id > 5);
const INFO = legacy ? LEGACY : FIVE;
const info = (s) => INFO[s.id] || {};
const review = (s) => s.review || info(s).review;

const PASTEL = ["#d9d9dc", "#eccbc6", "#c4c9b8", "#f4e3a3", "#8fcbcd", "#bccbe0", "#8ea1c8", "#d6b2e2", "#e2a296", "#8fd3ae"];
// project.json statuses → board words
const KIND = { todo: "todo", doing: "active", waiting: "blocked", done: "done", skipped: "skipped" };
const LABEL = { todo: "Not started", active: "In progress", blocked: "Waiting on you", done: "Done", skipped: "Skipped" };

const current = stages.find((s) => s.status === "waiting") || stages.find((s) => s.status === "doing");
const doneCount = stages.filter((s) => s.status === "done" || s.status === "skipped").length;
const allDone = stages.length > 0 && doneCount === stages.length;
const fmt = (iso) => new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const nowLine = p.now || (current ? `${current.name}: ${current.status === "waiting" ? "waiting for you" : "in progress"}.` : allDone ? "The video is finished." : "Nothing is running.");

const strip = stages.map((s) => {
  const k = KIND[s.status] || "todo";
  const items = s.items || [];
  const pct = k === "done" || k === "skipped" ? 100 : items.length ? Math.round((items.filter((i) => i.done).length / items.length) * 100) : k === "active" || k === "blocked" ? 40 : 0;
  return `<div class="seg ${k}" title="${esc(s.name)} · ${LABEL[k]}"><div class="bar"><i style="transform:scaleX(${pct / 100})"></i></div><span>${legacy ? "" : `${esc(s.id)} `}${esc(info(s).short || s.name)}</span></div>`;
}).join("");

const d = p.decision;
const decision = d && d.question ? `
  <section class="sec"><h2>Needs you</h2>
    <article class="dcard">
      <div class="dtop"><h3>${esc(d.question)}</h3><span class="chip blocked">Needs you</span></div>
      ${d.context ? `<p>${esc(d.context)}</p>` : ""}
      ${(d.options || []).length ? `<ol class="opts">${d.options.map((o) => `<li>${esc(o)}</li>`).join("")}</ol>` : ""}
      ${d.recommended ? `<div class="rec"><b>Claude suggests:</b> ${esc(d.recommended)}</div>` : ""}
      <div class="row">${d.link && has(d.link) ? `<a class="btn" href="${esc(d.link)}">Open ${esc(d.linkLabel || d.link)}</a>` : ""}<span class="sub">Reply in the chat with Claude: a number, your own words, or "yes" to take the suggestion.</span></div>
    </article>
  </section>` : "";

const stageList = stages.map((s, i) => {
  const k = KIND[s.status] || "todo";
  const items = s.items || [];
  const done = items.filter((x) => x.done).length;
  const rv = review(s);
  return `<details class="stage ${k}"${k === "active" || k === "blocked" ? " open" : ""}>
    <summary><span class="num" style="${k === "todo" ? "" : `background:${PASTEL[(i + 1) % PASTEL.length]}`}">${esc(s.id)}</span>
      <span class="sname"><b>${esc(s.name)}${rv ? ' <span class="gate">You approve</span>' : ""}${+s.round > 1 ? ` <span class="round">Round ${+s.round}</span>` : ""}</b><small>${esc(s.purpose || info(s).purpose || "")}</small></span>
      <span class="meta">${items.length ? `<span>${done}/${items.length}</span>` : ""}<span class="chip ${k}">${LABEL[k]}</span></span></summary>
    ${s.choice ? `<p class="choice">${esc(s.choice)}</p>` : ""}
    ${items.length ? `<ul class="items">${items.map((it) => `<li class="${it.done ? "done" : ""}"><span class="tick"></span><span>${esc(it.text)}</span></li>`).join("")}</ul>` : ""}
    ${s.file && has(s.file) ? `<p class="choice"><a href="${esc(s.file)}">Open ${esc(s.file)}</a></p>` : ""}
    ${rv ? `<p class="loop">You look at ${esc(rv)}. Not right? Say what to change → Claude redoes this step → shows it again.</p>` : ""}
  </details>`;
}).join("");

const final = ["renders/final.mp4", "renders/draft.mp4", "renders/preview.mp4"].find(has);
const video = final ? `<section class="sec"><h2>${final.includes("final") ? "Final video" : final.includes("preview") ? "20-second preview" : "Latest draft"}</h2><video controls src="${final}"></video></section>` : "";

const files = [["Brief", "brief.md"], ["Script", "script.html"], ["Style picker", "styles.html"], ["Storyboard", "storyboard.html"], ["Casting", "casting.html"], ["Voice timing", "timing.json"], ["Preview", "renders/preview.mp4"], ["Description + credits", "description.txt"], ["Final video", "renders/final.mp4"]].filter(([, f]) => has(f));
const look = p.style || p.brand ? `<div class="box"><h3>Look</h3><dl><dt>Style</dt><dd>${esc(p.style || "—")}</dd><dt>Brand</dt><dd>${esc(p.brand || "none")}${p.brandStrength ? ` (${esc(p.brandStrength)})` : ""}</dd>${p.voice ? `<dt>Voice</dt><dd>${esc(p.voice.id)}</dd>` : ""}</dl></div>` : "";
const log = (p.log || []).slice(-10).reverse();

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="refresh" content="4">
<title>${esc(p.title || "Video project")} · Board</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
<style>
:root{color-scheme:light;--bg:#f7f7f8;--surface:#fff;--sunken:#f0f0f2;--ink:#1d1d1f;--text:#3f3f46;--muted:#6e6e76;--line:#e3e3e8;--accent:#2f5bea;--accent-soft:#e8eefe;--good:#16825d;--good-soft:#e3f4ec;--warn:#a35a00;--warn-soft:#fdf0dc;
--font:"Hanken Grotesk",-apple-system,"Segoe UI",system-ui,sans-serif;--mono:"IBM Plex Mono",ui-monospace,Menlo,monospace}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:15px/1.55 var(--font)}
.wrap{max-width:1040px;margin:0 auto;padding:24px max(16px,3vw) 64px}
h1,h2,h3{color:var(--ink);margin:0;letter-spacing:-.015em;text-wrap:balance}h1{font-size:clamp(24px,4vw,32px);font-weight:800}h2{font-size:19px;font-weight:700}h3{font-size:15px;font-weight:700}p{margin:0}
.eyebrow{font:500 11px var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}.sub{color:var(--muted);font-size:13px}
.head{display:grid;gap:14px}
.now{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:14px 16px}
.now strong{color:var(--ink)}.now .when{margin-left:auto;color:var(--muted);font-size:13px}
.dot{width:9px;height:9px;border-radius:50%;background:var(--accent);flex:none;align-self:center;box-shadow:0 0 0 4px var(--accent-soft)}.dot.blocked{background:var(--warn);box-shadow:0 0 0 4px var(--warn-soft)}.dot.fin{background:var(--good);box-shadow:0 0 0 4px var(--good-soft)}
.strip{display:grid;grid-template-columns:repeat(${stages.length || 5},minmax(0,1fr));gap:4px}
.seg{display:grid;gap:6px;min-width:0}.seg .bar{height:6px;border-radius:2px;background:var(--line);overflow:hidden}.seg .bar i{display:block;height:100%;background:var(--accent);transform-origin:left}
.seg.done .bar i{background:var(--good)}.seg.skipped .bar i{background:var(--line)}.seg.blocked .bar i{background:var(--warn)}
.seg span{font-size:12px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.seg.active span,.seg.blocked span{color:var(--ink);font-weight:700}
.cols{display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:24px;align-items:start;margin-top:24px}.main,.side{display:grid;gap:22px;min-width:0}
.sec{display:grid;gap:10px}
.dcard{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:18px;display:grid;gap:12px;box-shadow:inset 3px 0 0 var(--warn)}
.dtop{display:flex;gap:10px;align-items:baseline;justify-content:space-between;flex-wrap:wrap}.opts{margin:0;padding-left:22px;display:grid;gap:4px;color:var(--ink);font-weight:600}
.rec{background:var(--sunken);border-radius:6px;padding:10px 12px;font-size:14px}.rec b{color:var(--ink)}
.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.btn{background:var(--ink);color:var(--bg);text-decoration:none;font-weight:700;padding:9px 14px;border-radius:6px}
.stages{display:grid;gap:6px}details.stage{background:var(--surface);border:1px solid var(--line);border-radius:10px}
details.stage summary{list-style:none;cursor:pointer;display:grid;grid-template-columns:30px minmax(0,1fr) auto;gap:12px;align-items:center;padding:14px 16px}
details.stage summary::-webkit-details-marker{display:none}
.num{width:30px;height:30px;border-radius:7px;display:grid;place-items:center;font-weight:800;font-size:13px;color:#1d1d1f;background:var(--sunken)}.stage.todo .num{color:var(--muted)}
.sname{display:grid;min-width:0}.sname b{color:var(--ink)}.sname small{color:var(--muted);font-size:13px}
.meta{display:flex;gap:10px;align-items:center;font-size:13px;color:var(--muted)}
.chip{font-size:12px;font-weight:700;padding:2px 8px;border-radius:5px;white-space:nowrap}.chip.todo,.chip.skipped{background:var(--sunken);color:var(--muted)}.chip.active{background:var(--accent-soft);color:var(--accent)}.chip.done{background:var(--good-soft);color:var(--good)}.chip.blocked{background:var(--warn-soft);color:var(--warn)}
.gate,.round{font-size:11px;font-weight:700;padding:1px 6px;border-radius:4px;background:var(--warn-soft);color:var(--warn);vertical-align:middle;margin-left:4px}.round{background:var(--accent-soft);color:var(--accent)}
.choice{padding:0 16px 12px 58px;font-size:14px;color:var(--ink)}.choice a{color:var(--accent);font-weight:600}
.loop{padding:0 16px 14px 58px;font-size:13px;color:var(--muted)}
.items{list-style:none;margin:0;padding:0 16px 14px 58px;display:grid;gap:6px}.items li{display:flex;gap:10px;align-items:flex-start}
.tick{width:16px;height:16px;border-radius:4px;flex:none;margin-top:3px;border:1.5px solid var(--line);display:grid;place-items:center}
.items li.done .tick{background:var(--good);border-color:var(--good)}.items li.done .tick::after{content:"";width:8px;height:4px;border-left:2px solid #fff;border-bottom:2px solid #fff;transform:rotate(-45deg) translate(1px,-1px)}.items li.done span{color:var(--muted)}
video{width:100%;border-radius:10px;background:#000;display:block}
.box{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:16px;display:grid;gap:10px}
dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:6px 12px;font-size:14px}dt{color:var(--muted)}dd{margin:0;color:var(--ink)}
.files{list-style:none;margin:0;padding:0;display:grid;gap:8px}.files a{color:var(--accent);font-weight:600;text-decoration:none}.files span{display:block;font:12px var(--mono);color:var(--muted)}
.feed{list-style:none;margin:0;padding:0;display:grid;gap:10px}.feed li{display:grid;gap:2px;font-size:14px}.feed time{font-size:12px;color:var(--muted)}
@media (max-width:820px){.cols{grid-template-columns:minmax(0,1fr)}.strip span{font-size:11px}.items,.choice,.loop{padding-left:16px}}
</style></head><body><div class="wrap">
<header class="head">
  <div class="eyebrow">Video Studio · ${esc(p.slug || "project")}</div>
  <h1>${esc(p.title || "Untitled video")}</h1>
  <div class="now"><span class="dot${current?.status === "waiting" || (d && d.question) ? " blocked" : allDone ? " fin" : ""}"></span><span><strong>${allDone ? "Finished: " : "Now: "}</strong>${esc(nowLine)}</span><span class="when">${doneCount} of ${stages.length} stages done</span></div>
  <nav class="strip" aria-label="Stages">${strip}</nav>
</header>
<div class="cols">
  <div class="main">
    ${decision}
    ${video}
    <section class="sec"><h2>Stages</h2><div class="stages">${stageList}</div></section>
  </div>
  <aside class="side">
    ${look}
    <div class="box"><h3>Files</h3>${files.length ? `<ul class="files">${files.map(([n, f]) => `<li><a href="${esc(f)}">${esc(n)}</a><span>${esc(f)}</span></li>`).join("")}</ul>` : '<p class="sub">Files appear as each stage finishes.</p>'}</div>
    <div class="box"><h3>Latest</h3>${log.length ? `<ol class="feed">${log.map((l) => `<li><time>${esc(fmt(l.at))}</time><span>${esc(l.text)}</span></li>`).join("")}</ol>` : '<p class="sub">Nothing yet.</p>'}</div>
  </aside>
</div>
</div></body></html>`;

writeFileSync(join(dir, "board.html"), html);
console.log("board.html updated:", join(dir, "board.html"));
