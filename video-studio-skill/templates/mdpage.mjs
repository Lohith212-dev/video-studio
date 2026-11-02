#!/usr/bin/env node
// Turns a Markdown file (script.md, brief.md) into a clean, readable HTML page.
// Usage: node mdpage.mjs <file.md> [out.html]     (board.mjs calls it for script.md → script.html)
// Handles headings, paragraphs, lists, tables, bold/italic, links, code. A ```yaml block of
// "- beat_id:" entries (the script's beat format) is shown as one card per beat.
import { readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const inline = (s) => esc(s)
  .replace(/`([^`]+)`/g, "<code>$1</code>")
  .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
  .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, "$1<i>$2</i>")
  .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2">$1</a>');

const unq = (v) => {
  v = v.trim();
  if (/^\[.*\]$/.test(v)) { try { return JSON.parse(v).join(" · "); } catch { return v.slice(1, -1); } }
  return /^".*"$/.test(v) ? v.slice(1, -1).replace(/\\"/g, '"') : v;
};
function beatCards(code) {
  const beats = [];
  for (const line of code.split("\n")) {
    const m = line.match(/^\s*(-\s+)?([a-z_]+):\s*(.*)$/);
    if (!m) continue;
    if (m[1]) beats.push({});
    if (beats.length) beats[beats.length - 1][m[2]] = unq(m[3]);
  }
  let t = 0;
  return `<div class="beats">${beats.map((b) => {
    const s = +b.seconds_estimate || 0, at = `${Math.floor(t / 60)}:${String(Math.round(t % 60)).padStart(2, "0")}`; t += s;
    const extra = [["On screen", b.on_screen_text], ["Picture", b.visual_idea], ["Numbers", b.numbers_to_show && b.numbers_to_show !== "[]" ? b.numbers_to_show : ""], ["Sound", b.sfx_cue && b.sfx_cue !== "null" ? b.sfx_cue : ""]].filter(([, v]) => v);
    return `<article class="beat"><div class="bhead"><b>${esc(b.beat_id)}</b><span>${at} · ${s ? s.toFixed(1) + " s" : ""}</span></div>
      <p class="say">${esc(b.narration)}</p>
      ${extra.length ? `<dl>${extra.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : ""}</article>`;
  }).join("")}</div>`;
}

export function mdToHtml(md) {
  const lines = md.replace(/\r/g, "").split("\n");
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (/^```/.test(l)) {
      const lang = l.slice(3).trim(); const buf = [];
      for (i++; i < lines.length && !/^```/.test(lines[i]); i++) buf.push(lines[i]);
      i++;
      const code = buf.join("\n");
      out.push(/^\s*-\s+beat_id:/m.test(code) ? beatCards(code) : `<pre data-lang="${esc(lang)}">${esc(code)}</pre>`);
      continue;
    }
    let m;
    if ((m = l.match(/^(#{1,6})\s+(.*)$/))) { const n = Math.min(3, Math.max(1, m[1].length === 1 ? 1 : m[1].length >= 3 ? 3 : 2)); out.push(`<h${n}>${inline(m[2])}</h${n}>`); i++; continue; }
    if (/^\s*\|.*\|\s*$/.test(l)) {
      const rows = [];
      for (; i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i]); i++) rows.push(lines[i].trim().slice(1, -1).split("|").map((c) => c.trim()));
      const body = rows.filter((r) => !r.every((c) => /^:?-{2,}:?$/.test(c)));
      const [head, ...rest] = body;
      out.push(`<div class="tw"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${rest.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(l)) {
      const ordered = /^\s*\d+\./.test(l); const items = [];
      for (; i < lines.length && (/^\s*([-*]|\d+\.)\s+/.test(lines[i]) || (/^\s{2,}\S/.test(lines[i]) && items.length)); i++) {
        if (/^\s*([-*]|\d+\.)\s+/.test(lines[i])) items.push(lines[i].replace(/^\s*([-*]|\d+\.)\s+/, ""));
        else items[items.length - 1] += " " + lines[i].trim();
      }
      out.push(`<${ordered ? "ol" : "ul"}>${items.map((x) => `<li>${inline(x)}</li>`).join("")}</${ordered ? "ol" : "ul"}>`);
      continue;
    }
    if (!l.trim()) { i++; continue; }
    const para = [];
    for (; i < lines.length && lines[i].trim() && !/^(#|```|\s*\||\s*([-*]|\d+\.)\s)/.test(lines[i]); i++) para.push(lines[i].trim());
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  return out.join("\n");
}

export function page(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--bg:#f7f7f8;--surface:#fff;--sunken:#f0f0f2;--ink:#1d1d1f;--text:#3f3f46;--muted:#6e6e76;--line:#e3e3e8;--accent:#2f5bea;--font:"Hanken Grotesk",-apple-system,"Segoe UI",system-ui,sans-serif}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:17px/1.6 var(--font)}
.wrap{max-width:760px;margin:0 auto;padding:32px 16px 80px}
h1,h2,h3{color:var(--ink);letter-spacing:-.015em;line-height:1.25}h1{font-size:30px;margin:0 0 20px}h2{font-size:22px;margin:34px 0 10px}h3{font-size:18px;margin:30px 0 8px;padding-top:18px;border-top:1px solid var(--line)}
p,ul,ol{margin:0 0 14px}li{margin:4px 0}a{color:var(--accent)}b{color:var(--ink)}
code{background:var(--sunken);padding:1px 5px;border-radius:4px;font-size:.9em}pre{background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:14px;overflow:auto;font-size:14px}
.tw{overflow-x:auto;margin:0 0 16px}table{border-collapse:collapse;width:100%;font-size:15px;background:var(--surface)}th,td{border:1px solid var(--line);padding:7px 10px;text-align:left;vertical-align:top}th{background:var(--sunken);color:var(--ink)}
.beats{display:grid;gap:12px;margin:8px 0 20px}.beat{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:16px 18px}
.bhead{display:flex;justify-content:space-between;color:var(--muted);font-size:14px;margin-bottom:6px}.bhead b{color:var(--accent)}
.say{font-size:19px;color:var(--ink);margin:0 0 10px}dl{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;margin:0;font-size:14px}dt{color:var(--muted)}dd{margin:0}
.note{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:12px 16px;color:var(--muted);font-size:15px;margin-bottom:22px}
</style></head><body><div class="wrap">
<div class="note">To approve or change something, reply in the chat with Claude (for example "change B03: shorter").</div>
${body}
</div></body></html>`;
}

export function renderMd(file, outFile) {
  const md = readFileSync(file, "utf8");
  const title = (md.match(/^#\s+(.*)$/m) || [, basename(file)])[1];
  writeFileSync(outFile, page(title, mdToHtml(md)));
  return outFile;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const f = process.argv[2];
  if (!f) { console.error("Usage: node mdpage.mjs <file.md> [out.html]"); process.exit(1); }
  console.log("written:", renderMd(f, process.argv[3] || f.replace(/\.md$/i, ".html")));
}
