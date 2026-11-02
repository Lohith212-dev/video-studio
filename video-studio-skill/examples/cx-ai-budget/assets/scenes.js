/*
 * "A Strategy Without a Budget Is a Wish" — v3.
 * Style: ray-dalio-principles (hand-drawn props and people act out each idea; text only as short labels).
 * Brand: demo at full colour strength (paper + brand blue worlds, Plus Jakarta Sans).
 * Shapes are drawn with Rough.js (seeded, so every render is identical) and draw themselves on.
 * People are the picked Open Peeps cast (CC0, assets/cast.js): each changes pose on spoken cues and breathes.
 * Every scene has a camera: a slow drift, pushes toward the action, and zoom-through changes between scenes.
 * Every cue is tied to a spoken word: at(beat, word, nth) returns that word's time from timing.json.
 */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.getElementById("svg");
  const defs = svg.querySelector("defs");
  const rc = rough.svg(svg);
  const tl = gsap.timeline({ paused: true });

  // ---- brand palette ----
  const C = {
    paper: "#F5F8FA", surface: "#FFFFFF", ink: "#13161B", blue: "#146EF5", blueD: "#0B3FA8", blueL: "#7CB9FF", tint: "#EEF4FF",
    muted: "#7C8492", line: "#D9E1EA", red: "#FF4444", green: "#15803D", body: "#515761",
  };
  const FONT = "Plus Jakarta Sans";

  // ---- timing ----
  const B = {};
  window.BEATS.forEach((b) => (B[b.beat] = b));
  const norm = (w) => w.toLowerCase().replace(/[^a-z0-9$.%']/g, "").replace(/\.$/, "");
  function at(beat, word, nth = 1, lead = 0.05) {
    const b = B[beat], target = norm(word);
    let seen = 0, idx = 0;
    for (let i = 0; i < b.words.length; i++) if (norm(b.words[i]) === target && ++seen === nth) { idx = i; break; }
    return b.start + (b.dur * idx) / b.words.length - lead;
  }
  const end = (beat) => B[beat].start + B[beat].dur;

  // ---- drawing helpers ----
  let seed = 1, uid = 0;
  const el = (tag, attrs, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; };
  const ink = (o = {}) => ({ stroke: C.ink, strokeWidth: 2.2, roughness: 1.3, bowing: 1.2, seed: seed++, fillStyle: "solid", ...o });
  // A hand-drawn shape with a soft offset shadow behind it (the Dalio "inked prop" look).
  function prop(parent, make, o = {}, shadow = true) {
    const g = el("g", {}, parent);
    if (shadow) { const sh = make(ink({ stroke: "none", fill: "rgba(19,22,27,.22)" })); sh.setAttribute("transform", "translate(-4 5)"); g.appendChild(sh); }
    g.appendChild(make(ink(o)));
    return g;
  }
  const rRect = (p, x, y, w, h, o, sh) => prop(p, (opt) => rc.rectangle(x, y, w, h, opt), o, sh);
  const rCircle = (p, x, y, d, o, sh) => prop(p, (opt) => rc.circle(x, y, d, opt), o, sh);
  const rPoly = (p, pts, o, sh) => prop(p, (opt) => rc.polygon(pts, opt), o, sh);
  const rPath = (p, d, o, sh) => prop(p, (opt) => rc.path(d, opt), o, sh);
  const rLine = (p, x1, y1, x2, y2, o = {}) => { const n = rc.line(x1, y1, x2, y2, ink({ strokeWidth: 2, ...o })); p.appendChild(n); return n; };
  const rCurve = (p, pts, o = {}) => { const n = rc.curve(pts, ink({ ...o })); p.appendChild(n); return n; };
  const pop = (g, x, y) => { gsap.set(g, { scale: 0, svgOrigin: `${x} ${y}` }); return g; };
  const popIn = (t, g, dur = 0.45) => tl.to(g, { scale: 1, duration: dur, ease: "back.out(2)" }, t);

  // Short labels only: a word or two, set in the brand face, revealed by rising into a mask.
  function label(p, { x, y, text, size = 18, weight = 700, fill = C.ink, anchor = "middle", spacing = 0 }) {
    const id = "m" + uid++;
    const cp = el("clipPath", { id }, defs);
    el("rect", { x: x - 600, y: y - size * 1.05, width: 1200, height: size * 1.45 }, cp);
    const g = el("g", { "clip-path": `url(#${id})` }, p);
    const t = el("text", { x, y, "text-anchor": anchor, "font-family": FONT, "font-weight": weight, "font-size": size, "letter-spacing": spacing, fill }, g);
    t.textContent = text;
    gsap.set(t, { y: size * 1.5 });
    return t;
  }
  const rise = (t, node, dur = 0.35) => tl.to(node, { y: 0, duration: dur, ease: "power2.out" }, t);
  const small = (p, o) => label(p, { size: 14, weight: 700, spacing: 2.2, fill: C.muted, ...o });

  // Open Peeps person, bottom-centred at (x, y), `h` tall. Ink stays ink; white stays paper-white.
  function peep(p, name, x, y, h, flip = false) {
    const d = window.PEEPS[name], w = (d.w / d.h) * h;
    const g = el("g", {}, p);
    el("ellipse", { cx: x, cy: y + 2, rx: w * 0.42, ry: 6, fill: "rgba(19,22,27,.14)" }, g);
    const inner = el("g", flip ? { transform: `translate(${2 * x} 0) scale(-1 1)` } : {}, g);
    const s = el("svg", { x: x - w / 2, y: y - h, width: w, height: h, viewBox: `0 0 ${d.w} ${d.h}`, overflow: "visible" }, inner);
    s.innerHTML = d.inner.replace(/#000000/g, C.ink);
    pop(g, x, y);
    return g;
  }

  // Draw a hand-drawn group on: outlines trace themselves, then fills and text fade in under them.
  function drawOn(t, g, dur = 0.9) {
    const strokes = [], fills = [];
    g.querySelectorAll("path, text").forEach((n) => {
      const st = n.getAttribute("stroke");
      if (n.tagName === "path" && st && st !== "none" && !n.getAttribute("stroke-dasharray")) strokes.push(n); else fills.push(n);
    });
    strokes.forEach((n) => { const L = n.getTotalLength() + 2; gsap.set(n, { strokeDasharray: L, strokeDashoffset: L }); });
    if (strokes.length) tl.to(strokes, { strokeDashoffset: 0, duration: dur * 0.75, ease: "power1.inOut", stagger: (dur * 0.25) / strokes.length }, t);
    gsap.set(fills, { opacity: 0 });
    if (fills.length) tl.to(fills, { opacity: 1, duration: dur * 0.45, ease: "none" }, t + dur * 0.4);
  }
  const drawIn = (t, g, dur) => { tl.set(g, { scale: 1 }, t); drawOn(t, g, dur); };

  // ---- the cast: one character, several poses. Poses swap on spoken cues with a small squash; the body breathes. ----
  function actor(p, role, x, y, h, { flip = false, pose = 0 } = {}) {
    const poses = window.CAST[role];
    const g = el("g", {}, p);
    el("ellipse", { cx: x, cy: y + 2, rx: h * 0.17, ry: 6, fill: "rgba(19,22,27,.14)" }, g);
    const body = el("g", {}, g), breath = el("g", {}, body);
    gsap.set([body, breath], { svgOrigin: `${x} ${y}` });
    const s = el("svg", { viewBox: "-300 -620 2300 3120", overflow: "visible" }, el("g", flip ? { transform: `translate(${2 * x} 0) scale(-1 1)` } : {}, breath));
    const layers = poses.map((ps) => { const l = el("g", {}, s); l.innerHTML = ps.svg; return l; });
    const ref = layers[poses.findIndex((ps) => !ps.sitting)].getBBox(), k = h / (2400 - ref.y);
    s.setAttribute("x", x - (ref.x + ref.width / 2 + 300) * k); s.setAttribute("y", y - 3020 * k);
    s.setAttribute("width", 2300 * k); s.setAttribute("height", 3120 * k);
    layers.forEach((l, i) => gsap.set(l, { autoAlpha: i === pose ? 1 : 0 }));
    pop(g, x, y);
    return { g, body, breath, layers, x, y };
  }
  function pose(a, t, i) {
    a.layers.forEach((l, k) => tl.set(l, { autoAlpha: k === i ? 1 : 0 }, t));
    tl.fromTo(a.body, { scaleX: 1.04, scaleY: 0.95 }, { scaleX: 1, scaleY: 1, svgOrigin: `${a.x} ${a.y}`, duration: 0.4, ease: "back.out(3)", immediateRender: false }, t);
  }
  const cue = (a, list) => list.forEach(([t, i]) => pose(a, t, i));
  const act = (a, t, dur = 0.5) => popIn(t, a.g, dur);
  // Breathing and a slight sway from t0 to t1, so a person is never a still picture.
  function alive(a, t0, t1) {
    const n = Math.max(1, Math.floor((t1 - t0) / 1.3));
    tl.fromTo(a.breath, { scaleY: 1, rotation: -0.6 }, { scaleY: 1.018, rotation: 0.6, svgOrigin: `${a.x} ${a.y}`, duration: 1.3, ease: "sine.inOut", yoyo: true, repeat: n - 1, immediateRender: false }, t0);
  }
  function walkIn(a, t, dx, dur = 1.2) {
    tl.set(a.g, { scale: 1 }, t);
    tl.fromTo(a.g, { x: dx }, { x: 0, duration: dur, ease: "power1.out", immediateRender: false }, t);
    tl.fromTo(a.body, { y: 0 }, { y: -8, duration: dur / 6, yoyo: true, repeat: 5, ease: "sine.inOut", immediateRender: false }, t);
  }
  // Camera push: zoom by z toward point (cx, cy) so the eye follows the action; z = 1 at the centre returns to wide.
  const focus = (s, t, cx, cy, z = 1.1, dur = 2) => tl.to(s, { scale: z, x: cx * (1 - z), y: cy * (1 - z), svgOrigin: "0 0", duration: dur, ease: "sine.inOut" }, t);

  // Coin: a hand-drawn disc in brand tints with a label.
  function coin(p, x, y, r, text) {
    const g = el("g", {}, p);
    for (let i = 0; i < 14; i++) {
      const a = (i / 14) * Math.PI * 2, r0 = r * 1.2, r1 = r * (i % 2 ? 1.4 : 1.55);
      rLine(g, x + Math.cos(a) * r0, y + Math.sin(a) * r0, x + Math.cos(a) * r1, y + Math.sin(a) * r1, { strokeWidth: 1.6, roughness: 0.8 });
    }
    rCircle(g, x, y, r * 2, { fill: C.blueL });
    rCircle(g, x, y, r * 1.55, { fill: "none", strokeWidth: 1.4, stroke: C.blueD }, false);
    el("text", { x, y: y + r * 0.24, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": r * 0.68, fill: C.blueD }, g).textContent = text;
    return pop(g, x, y);
  }

  // Speech bubble outline as a path (for Rough to sketch).
  const bubbleD = (x, y, s = 1) => `M${x - 17 * s},${y - 11 * s} h${34 * s} q${5 * s},0 ${5 * s},${5 * s} v${12 * s} q0,${5 * s} -${5 * s},${5 * s} h-${22 * s} l-${8 * s},${7 * s} l${1 * s},-${7 * s} h-${5 * s} q-${5 * s},0 -${5 * s},-${5 * s} v-${12 * s} q0,-${5 * s} ${5 * s},-${5 * s} z`;

  // ---- worlds: brand paper, and the brand blue gradient ----
  defs.insertAdjacentHTML("beforeend", `
    <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.07  0 0 0 0 0.09  0 0 0 0 0.11  2.4 0 0 0 -1.45"/></filter>
    <linearGradient id="blueWorld" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${C.blue}"/><stop offset="1" stop-color="${C.blueD}"/></linearGradient>
    <pattern id="streaks" width="90" height="720" patternUnits="userSpaceOnUse"><rect x="0" y="0" width="5" height="720" fill="#fff" opacity=".05"/></pattern>`);
  // A scene is three nested groups: outer (shown, hidden, panned), drift (slow zoom over its life), camera (pushes).
  // Callers draw into the camera group, so the world and everything in it move together.
  function scene(id, world) {
    const outer = el("g", { id }, svg), dr = el("g", {}, outer), g = el("g", {}, dr);
    g.outer = outer; g.drift = dr;
    gsap.set(g, { svgOrigin: "0 0" }); gsap.set(dr, { svgOrigin: "640 360" });
    const W = { x: -480, y: -300, width: 2240, height: 1320 };
    if (world === "blue") {
      el("rect", { ...W, fill: "url(#blueWorld)" }, g);
      el("rect", { ...W, fill: "url(#streaks)" }, g);
      el("rect", { ...W, filter: "url(#grain)", opacity: 0.25 }, g);
      g.appendChild(rc.line(-480, 612, 1760, 612, { stroke: "#DCE8FF", strokeWidth: 2.2, roughness: 1, seed: seed++ }));
    } else {
      el("rect", { ...W, fill: C.paper }, g);
      el("rect", { ...W, filter: "url(#grain)", opacity: 0.18 }, g);
      const grid = el("g", { opacity: 0.8 }, g);
      for (let x = -400; x < 1700; x += 96) grid.appendChild(rc.line(x, -300, x, 1020, { stroke: C.line, strokeWidth: 1.2, roughness: 0.6, seed: seed++ }));
      for (let y = -260; y < 1000; y += 90) grid.appendChild(rc.line(-480, y, 1760, y, { stroke: C.line, strokeWidth: 1.2, roughness: 0.6, seed: seed++ }));
    }
    gsap.set(outer, { autoAlpha: 0 });
    return g;
  }
  const O = (s) => s.outer || s;
  const show = (s, t) => { s.t0 = t; tl.set(O(s), { autoAlpha: 1, x: 0 }, t); };
  const hide = (s, t) => tl.set(O(s), { autoAlpha: 0 }, t);
  const drift = (s, t1) => tl.fromTo(s.drift, { scale: 1 }, { scale: 1.04, svgOrigin: "640 360", duration: t1 - s.t0, ease: "none", immediateRender: false }, s.t0);
  // pan: the camera travels sideways to the next part of the world. zoom: the camera dives into pt and comes out in the next scene.
  function change(from, to, a, b, kind, delay = 0, pt = [640, 360]) {
    const t = (end(a) + B[b].start) / 2 + delay;
    drift(from, t + 0.4);
    to.t0 = t;
    if (kind === "pan") {
      tl.set(O(to), { autoAlpha: 1 }, t - 0.3);
      tl.to(O(from), { x: -1280, duration: 0.6, ease: "power3.inOut" }, t - 0.3);
      tl.fromTo(O(to), { x: 1280 }, { x: 0, duration: 0.6, ease: "power3.inOut" }, t - 0.3);
      hide(from, t + 0.35);
    } else if (kind === "zoom") {
      const [px, py] = pt, z = 3.4;
      tl.to(from, { scale: z, x: px * (1 - z), y: py * (1 - z), svgOrigin: "0 0", duration: 0.7, ease: "power3.in" }, t - 0.6);
      tl.fromTo(O(to), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, immediateRender: false }, t);
      tl.fromTo(to, { scale: 0.75, x: 160, y: 90 }, { scale: 1, x: 0, y: 0, svgOrigin: "0 0", duration: 0.8, ease: "power3.out", immediateRender: false }, t);
      hide(from, t + 0.3);
    } else { show(to, t); hide(from, t); }
  }
  const strategyDoc = (p, x, y) => {
    const g = el("g", {}, p);
    rRect(g, x, y, 150, 190, { fill: C.surface, strokeWidth: 2.4 });
    el("text", { x: x + 75, y: y + 36, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 15, "letter-spacing": 1.5, fill: C.blue }, g).textContent = "STRATEGY";
    for (let i = 0; i < 6; i++) rLine(g, x + 20, y + 62 + i * 20, x + 130 - (i % 3) * 22, y + 62 + i * 20, { stroke: C.muted, strokeWidth: 1.6, roughness: 0.9 });
    return g;
  };

  // ======== f01 / B01 — a strategy without numbers floats away like a wish ========
  const s1 = scene("s1", "paper");
  show(s1, 0);
  const strat = actor(s1, "strategist", 430, 600, 320);
  act(strat, 0.25, 0.6); alive(strat, 0.3, end("B01") + 1.5);
  cue(strat, [[at("B01", "principle"), 1], [at("B01", "numbers"), 2], [at("B01", "checked"), 1], [at("B01", "strategy", 2), 0], [at("B01", "wish") - 0.2, 3]]);
  focus(s1, 0.5, 560, 420, 1.08, 3.5);
  focus(s1, at("B01", "wish") - 0.6, 700, 260, 1.14, 2.2);
  const doc = strategyDoc(s1, 600, 250);
  pop(doc, 675, 440);
  drawIn(at("B01", "strategy"), doc, 1.0);
  const ghost = el("g", {}, s1);
  ["$", "%", "#"].forEach((t, i) => {
    const x = 612 + i * 44;
    ghost.appendChild(rc.rectangle(x, 470, 40, 40, { stroke: C.muted, strokeWidth: 1.8, strokeLineDash: [6, 5], roughness: 1, seed: seed++ }));
    el("text", { x: x + 20, y: 497, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 18, fill: "#B8C2CE" }, ghost).textContent = t;
  });
  gsap.set(ghost, { autoAlpha: 0 });
  tl.to(ghost, { autoAlpha: 1, duration: 0.4 }, at("B01", "numbers"));
  const q = rCircle(s1, 820, 480, 46, { fill: C.surface, stroke: C.red });
  el("text", { x: 820, y: 489, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 26, fill: C.red }, q).textContent = "?";
  pop(q, 820, 480);
  popIn(at("B01", "checked"), q, 0.4);
  const string = el("g", {}, s1);
  rCurve(string, [[675, 250], [668, 215], [684, 185], [676, 160]], { strokeWidth: 1.6, roughness: 1.2 });
  rPath(string, "M676,160 C636,158 626,96 676,82 C726,96 716,158 676,160 Z", { fill: C.blueL });
  gsap.set(string, { autoAlpha: 0 });
  tl.to(string, { autoAlpha: 1, duration: 0.3 }, at("B01", "not", 2));
  tl.to([doc, string], { y: -150, duration: 2.2, ease: "sine.inOut" }, at("B01", "wish") - 0.5);
  tl.to(ghost, { autoAlpha: 0.35, duration: 0.6 }, at("B01", "wish") - 0.3);
  rise(at("B01", "wish"), small(s1, { x: 876, y: 175, text: "A WISH", fill: C.blue, size: 16 }));
  [[600, 120, 9], [760, 100, 7], [790, 200, 6]].forEach(([x, y, r]) => {
    const sp = rPath(s1, `M${x},${y - r * 2} L${x + r * 0.5},${y - r * 0.5} L${x + r * 2},${y} L${x + r * 0.5},${y + r * 0.5} L${x},${y + r * 2} L${x - r * 0.5},${y + r * 0.5} L${x - r * 2},${y} L${x - r * 0.5},${y - r * 0.5} Z`, { fill: C.blueL, strokeWidth: 1.4 }, false);
    pop(sp, x, y); popIn(at("B01", "wish") + 0.3, sp, 0.35);
  });

  // ======== f02 / B02 — one company, its service team, one year ========
  const s2 = scene("s2", "blue");
  change(s1, s2, "B01", "B02", "pan", 1.1);
  const bld = el("g", {}, s2);
  const bx = 220, by = 610;
  rRect(bld, bx - 150, by - 30, 300, 26, { fill: C.surface });
  rRect(bld, bx - 128, by - 160, 256, 132, { fill: C.tint });
  for (let i = 0; i < 6; i++) rRect(bld, bx - 108 + i * 41, by - 152, 18, 118, { fill: C.surface, strokeWidth: 1.8 }, false);
  rRect(bld, bx - 142, by - 178, 284, 20, { fill: C.surface });
  rPoly(bld, [[bx - 142, by - 178], [bx, by - 248], [bx + 142, by - 178]], { fill: C.tint });
  rCircle(bld, bx, by - 205, 24, { fill: C.blueL }, false);
  pop(bld, bx, by);
  drawIn(at("B02", "company") - 0.2, bld, 1.2);
  rise(at("B02", "manager's"), label(s2, { x: bx, y: 650, text: "A wealth manager", size: 18, fill: "#fff" }));
  "JFMAMJJASOND".split("").forEach((m, i) => {
    const x = 452 + i * 40;
    const d = rCircle(s2, x, 612, 12, { fill: "#fff", strokeWidth: 1.6 }, false);
    pop(d, x, 612); popIn(at("B02", "year") + 0.1 + i * 0.07, d, 0.3);
    rise(at("B02", "year") + 0.15 + i * 0.07, label(s2, { x, y: 644, text: m, size: 14, fill: "#DCE8FF" }), 0.3);
  });
  const team = [["agentA", 440, 1], ["agentB", 575, 1], ["agentC", 710, 2]].map(([r, x, p], i) => {
    const a = actor(s2, r, x, 598, 270, { flip: i === 0, pose: p });
    act(a, at("B02", "service") + i * 0.12, 0.5); alive(a, at("B02", "service"), end("B02") + 1);
    return a;
  });
  cue(team[0], [[at("B02", "plan"), 2], [at("B02", "number"), 1]]);
  cue(team[1], [[at("B02", "AI"), 2], [at("B02", "end"), 1], [at("B02", "track"), 2]]);
  cue(team[2], [[at("B02", "plan") + 0.3, 1], [at("B02", "you'll"), 2]]);
  focus(s2, at("B02", "follow"), 330, 480, 1.08, 2.2);
  focus(s2, at("B02", "service") - 0.2, 640, 470, 1.04, 1.8);
  focus(s2, at("B02", "number") - 0.5, 1000, 300, 1.12, 2);
  const plan = el("g", {}, s2);
  rRect(plan, 515, 150, 120, 80, { fill: C.tint });
  for (let i = 0; i < 3; i++) rLine(plan, 529, 172 + i * 18, 621 - i * 18, 172 + i * 18, { stroke: C.blue, strokeWidth: 1.6 });
  el("text", { x: 575, y: 140, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 13, "letter-spacing": 1.5, fill: "#fff" }, plan).textContent = "AI PLAN";
  pop(plan, 575, 230);
  drawIn(at("B02", "plan"), plan, 0.8);
  const rep = el("g", {}, s2);
  rRect(rep, 930, 190, 250, 210, { fill: C.surface });
  el("text", { x: 954, y: 226, "font-family": FONT, "font-weight": 700, "font-size": 12, "letter-spacing": 2.2, fill: C.muted }, rep).textContent = "THE TRACKER";
  rLine(rep, 954, 254, 1150, 254, { stroke: C.line, strokeWidth: 9, roughness: 0.6 });
  rLine(rep, 954, 284, 1110, 284, { stroke: C.line, strokeWidth: 9, roughness: 0.6 });
  rRect(rep, 948, 306, 214, 32, { fill: C.tint, stroke: C.blueL, strokeWidth: 1.6 }, false);
  el("text", { x: 1134, y: 333, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 30, fill: C.blue }, rep).textContent = "?";
  rLine(rep, 954, 366, 1120, 366, { stroke: C.line, strokeWidth: 9, roughness: 0.6 });
  gsap.set(rep, { y: 420, rotation: 4, svgOrigin: "1055 295", autoAlpha: 0 });
  tl.to(rep, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, at("B02", "number") - 0.2);

  // ======== f03 / B03 — 100,000 questions, $12 each, 6 in 10 repeats ========
  const s3 = scene("s3", "blue");
  change(s2, s3, "B02", "B03", "zoom", 0, [575, 450]);
  const ag3 = actor(s3, "agentB", 190, 598, 250, { pose: 2 });
  gsap.set(ag3.g, { scale: 1 }); alive(ag3, B.B03.start - 1, end("B03") + 1);
  cue(ag3, [[at("B03", "today"), 1], [at("B03", "answers"), 2], [at("B03", "customer"), 1], [at("B03", "twelve"), 2], [at("B03", "six"), 1], [at("B03", "before"), 2]]);
  focus(s3, at("B03", "twelve") - 0.4, 1040, 330, 1.1, 1.6);
  focus(s3, at("B03", "six") - 0.1, 640, 380, 1.04, 1.8);
  const bubbles = [];
  const gx0 = 330, gy0 = 200, dx = 48, dy = 36;
  for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) {
    const x = gx0 + c * dx, y = gy0 + r * dy, i = r * 10 + c;
    const g = el("g", {}, s3);
    g.appendChild(rc.path(bubbleD(x, y, 0.92), { stroke: C.ink, strokeWidth: 1.6, fill: "#fff", fillStyle: "solid", roughness: 1, seed: seed++ }));
    const red = rc.path(bubbleD(x, y, 0.92), { stroke: C.ink, strokeWidth: 1.6, fill: C.red, fillStyle: "solid", roughness: 1, seed: seed++ });
    g.appendChild(red);
    gsap.set(red, { autoAlpha: 0 });
    pop(g, x, y);
    bubbles.push({ g, red, i });
  }
  const r3 = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return ((h >>> 0) % 10000) / 10000; };
  const tA = at("B03", "answers");
  bubbles.forEach((b) => popIn(tA + b.i * 0.022 + r3("b" + b.i) * 0.15, b.g, 0.3));
  rise(at("B03", "thousand"), label(s3, { x: gx0 + 4.5 * dx, y: 158, text: "100,000 questions a year", size: 22, fill: "#fff" }));
  popIn(at("B03", "twelve"), coin(s3, 1040, 330, 54, "$12"), 0.55);
  rise(at("B03", "twelve") + 0.3, label(s3, { x: 1040, y: 440, text: "each", size: 18, fill: "#DCE8FF" }));
  const tSix = at("B03", "six");
  [...bubbles].sort((a, b) => r3("o" + a.i) - r3("o" + b.i)).slice(0, 60).forEach((b, k) => tl.to(b.red, { autoAlpha: 1, duration: 0.15 }, tSix + k * 0.022));
  rise(tSix + 0.6, label(s3, { x: gx0 - 16, y: gy0 + 10 * dy + 18, text: "6 in 10 are repeats", size: 18, fill: "#fff", anchor: "start" }));

  // ======== f04 / B04 — money goes to repeats; the hard question waits ========
  const s4 = scene("s4", "blue");
  change(s3, s4, "B03", "B04", "pan");
  const tMoney = at("B04", "money");
  for (let i = 0; i < 9; i++) {
    const y = 586 - i * 38;
    const g = el("g", {}, s4);
    g.appendChild(rc.path(bubbleD(300, y, 1.6), { stroke: C.ink, strokeWidth: 2, fill: C.red, fillStyle: "solid", roughness: 1.1, seed: seed++ }));
    gsap.set(g, { y: -720 });
    tl.to(g, { y: 0, duration: 0.55, ease: "bounce.out" }, tMoney - 0.6 + i * 0.16);
  }
  for (let i = 0; i < 4; i++) {
    const cn = coin(s4, 260 + i * 27, 210, 15, "$");
    gsap.set(cn, { scale: 1, y: -330 });
    tl.to(cn, { y: 0, duration: 0.5, ease: "power2.in" }, tMoney + 0.5 + i * 0.18);
    tl.to(cn, { autoAlpha: 0, y: 30, duration: 0.25 }, tMoney + 1 + i * 0.18);
  }
  rise(tMoney + 0.9, label(s4, { x: 300, y: 650, text: "Repeat work", size: 18, fill: "#fff" }));
  const cl4 = actor(s4, "client", 900, 610, 250, { pose: 0 });
  act(cl4, at("B04", "unusual"), 0.5); alive(cl4, at("B04", "unusual"), end("B04") + 1);
  cue(cl4, [[at("B04", "person"), 1], [at("B04", "wait"), 0], [at("B04", "day"), 1], [at("B04", "reply"), 2]]);
  focus(s4, tMoney - 0.4, 300, 420, 1.08, 1.8);
  focus(s4, at("B04", "unusual") - 0.2, 850, 420, 1.08, 2);
  const oddQ = el("g", {}, s4);
  oddQ.appendChild(rc.path(bubbleD(990, 360, 2.2), { stroke: C.ink, strokeWidth: 2.2, fill: "#fff", fillStyle: "solid", roughness: 1.6, seed: seed++ }));
  el("text", { x: 990, y: 372, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 30, fill: C.blue }, oddQ).textContent = "?";
  pop(oddQ, 990, 380);
  popIn(at("B04", "unusual") + 0.25, oddQ, 0.4);
  const clock = el("g", {}, s4);
  rCircle(clock, 700, 250, 150, { fill: "#fff", strokeWidth: 2.6 });
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; rLine(clock, 700 + Math.sin(a) * 60, 250 - Math.cos(a) * 60, 700 + Math.sin(a) * 68, 250 - Math.cos(a) * 68, { strokeWidth: i % 3 ? 1.6 : 3 }); }
  const hr = el("g", {}, clock); rLine(hr, 700, 250, 700, 214, { strokeWidth: 4 });
  const mn = el("g", {}, clock); rLine(mn, 700, 250, 700, 196, { stroke: C.blue, strokeWidth: 3 });
  pop(clock, 700, 250);
  const tWait = at("B04", "wait");
  drawIn(tWait - 0.6, clock, 0.8);
  tl.fromTo(mn, { rotation: 0 }, { rotation: 1440, svgOrigin: "700 250", duration: 3.2, ease: "power1.inOut" }, tWait);
  tl.fromTo(hr, { rotation: 0 }, { rotation: 720, svgOrigin: "700 250", duration: 3.2, ease: "power1.inOut" }, tWait);
  rise(at("B04", "day") - 0.2, label(s4, { x: 700, y: 370, text: "up to 24 hours", size: 20, fill: "#fff" }));

  // ======== f05 / B05 — the plan as a machine with three parts ========
  const s5 = scene("s5", "paper");
  change(s4, s5, "B04", "B05", "pan", 0.7);
  const gearPts = (cx, cy, R, teeth = 10) => {
    const pts = [], ri = R * 0.8, st = (Math.PI * 2) / teeth;
    for (let i = 0; i < teeth; i++) { const a = i * st; [[ri, -0.5], [R, -0.28], [R, 0.28], [ri, 0.5]].forEach(([r, f]) => pts.push([cx + r * Math.cos(a + f * st), cy + r * Math.sin(a + f * st)])); }
    return pts;
  };
  const ghostGears = el("g", { opacity: 0.7 }, s5);
  [450, 670, 890].forEach((x) => ghostGears.appendChild(rc.polygon(gearPts(x, 330, 92), { stroke: C.muted, strokeWidth: 1.8, strokeLineDash: [7, 6], roughness: 1, seed: seed++ })));
  gsap.set(ghostGears, { autoAlpha: 0 });
  tl.to(ghostGears, { autoAlpha: 0.7, duration: 0.5 }, at("B05", "machine") - 0.2);
  tl.to(ghostGears, { rotation: 8, svgOrigin: "670 330", duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: 1 }, at("B05", "machine"));
  [[450, 330, 92, C.surface, "Work", "do"], [670, 330, 92, C.blue, "Cost", "cost"], [890, 330, 92, C.surface, "Tracking", "working"]].forEach(([x, y, R, fill, name, w], i) => {
    const g = el("g", {}, s5);
    const rot = el("g", {}, g);
    gsap.set(rot, { svgOrigin: `${x} ${y}` });
    rPoly(rot, gearPts(x, y, R), { fill, strokeWidth: 2.6 });
    rCircle(rot, x, y, R * 0.62, { fill: i === 1 ? C.blueD : C.tint }, false);
    rCircle(rot, x, y, R * 0.2, { fill: C.ink }, false);
    pop(g, x, y);
    const t = at("B05", w);
    drawIn(t - 0.2, g, 0.8);
    rise(t + 0.1, label(s5, { x, y: 492, text: name, size: 24, fill: C.ink }));
    tl.fromTo(rot, { rotation: i === 1 ? 18 : 0 }, { rotation: (i % 2 ? -1 : 1) * 160 + (i === 1 ? 18 : 0), svgOrigin: `${x} ${y}`, duration: end("B05") + 1.2 - at("B05", "cost"), ease: "none" }, at("B05", "cost"));
  });
  const pl5 = actor(s5, "planner", 190, 610, 290, { pose: 2 });
  act(pl5, at("B05", "Therefore"), 0.5); alive(pl5, at("B05", "Therefore"), end("B05") + 1);
  cue(pl5, [[at("B05", "machine"), 1], [at("B05", "do"), 0], [at("B05", "cost"), 1], [at("B05", "working"), 0]]);
  focus(s5, at("B05", "do") - 0.3, 450, 330, 1.04, 1.4);
  focus(s5, at("B05", "cost") - 0.3, 670, 330, 1.04, 1.4);
  focus(s5, at("B05", "working") - 0.3, 890, 330, 1.04, 1.4);

  // ======== f06 / B06 — the work: seven uses, five phases, twelve months ========
  const s6 = scene("s6", "paper");
  change(s5, s6, "B05", "B06", "zoom", 0, [450, 330]);
  const glyph = (p, x, y, kind) => {
    const o = { strokeWidth: 2, fill: "none" };
    if (kind === 0) { p.appendChild(rc.path(bubbleD(x, y, 0.9), ink(o))); el("text", { x, y: y + 6, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 16, fill: C.blue }, p).textContent = "?"; }
    if (kind === 1) { p.appendChild(rc.circle(x, y - 8, 16, ink(o))); p.appendChild(rc.arc(x, y + 16, 34, 30, Math.PI, Math.PI * 2, false, ink(o))); }
    if (kind === 2) { [[-14, -8], [14, -8], [0, 14]].forEach(([a, b]) => p.appendChild(rc.circle(x + a, y + b, 12, ink({ ...o, fill: C.blueL })))); p.appendChild(rc.linearPath([[x - 14, y - 8], [x, y + 14], [x + 14, y - 8]], ink(o))); }
    if (kind === 3) { [-12, -4, 4, 12].forEach((a, k) => p.appendChild(rc.line(x + a, y - 4 - (k % 2) * 8, x + a, y + 4 + (k % 2) * 8, ink(o)))); }
    if (kind === 4) { [[-12, 10], [0, 2], [12, -8]].forEach(([a, h]) => p.appendChild(rc.rectangle(x + a - 4, y + 10 - (14 + h), 8, 14 + h, ink({ ...o, fill: C.blueL })))); }
    if (kind === 5) { p.appendChild(rc.polygon([[x, y - 16], [x + 16, y + 12], [x - 16, y + 12]], ink(o))); el("text", { x, y: y + 9, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 14, fill: C.red }, p).textContent = "!"; }
    if (kind === 6) { p.appendChild(rc.rectangle(x - 14, y - 8, 28, 22, ink(o))); p.appendChild(rc.line(x - 14, y - 8, x, y + 4, ink(o))); p.appendChild(rc.line(x + 14, y - 8, x, y + 4, ink(o))); }
  };
  const tSeven = at("B06", "Seven");
  const uses = ["Assistant", "Agent help", "Routing", "Languages", "Insights", "Complaints", "Updates"];
  const useG = uses.map((n, i) => {
    const x = 196 + i * 148, y = 210;
    const g = el("g", {}, s6);
    rCircle(g, x, y, 92, { fill: C.surface });
    glyph(g, x, y, i);
    pop(g, x, y);
    popIn(tSeven + 0.15 + i * 0.22, g, 0.4);
    rise(tSeven + 0.25 + i * 0.22, small(s6, { x, y: 286, text: n.toUpperCase(), size: 12, fill: C.ink }), 0.3);
    return g;
  });
  [["assistant", 0], ["route", 2], ["agents", 1]].forEach(([w, i]) => tl.to(useG[i], { scale: 1.2, duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out" }, at("B06", w) - 0.05));
  const mx = (m) => 150 + (m / 12) * 880;
  const tFive = at("B06", "Five");
  const axis = el("g", {}, s6); rLine(axis, 150, 470, 1120, 470, { strokeWidth: 2 });
  gsap.set(axis, { scaleX: 0, svgOrigin: "150 470" }); tl.to(axis, { scaleX: 1, duration: 0.6, ease: "power2.inOut" }, tFive - 0.2);
  [["Discover", 0, 2, C.tint], ["Pilot", 2, 5, C.blueL], ["Integrate", 5, 8, C.blue], ["Scale", 8, 12, C.blueD], ["Optimize", 12, 13.2, C.surface]].forEach(([n, a, b, col], i) => {
    const seg = rRect(s6, mx(a) + 3, 432, mx(b) - mx(a) - 6, 28, { fill: col, strokeWidth: 2 }, false);
    gsap.set(seg, { scaleX: 0, svgOrigin: `${mx(a)} 446` });
    tl.to(seg, { scaleX: 1, duration: 0.4, ease: "power2.out" }, tFive + 0.2 + i * 0.4);
    rise(tFive + 0.3 + i * 0.4, label(s6, { x: (mx(a) + mx(b)) / 2, y: 418, text: n, size: 15, fill: C.ink }), 0.3);
  });
  const br = el("g", {}, s6);
  rLine(br, mx(0), 520, mx(12), 520, { strokeWidth: 1.8 }); rLine(br, mx(0), 510, mx(0), 530, { strokeWidth: 1.8 }); rLine(br, mx(12), 510, mx(12), 530, { strokeWidth: 1.8 });
  gsap.set(br, { scaleX: 0, svgOrigin: `${mx(6)} 520` });
  tl.to(br, { scaleX: 1, duration: 0.45, ease: "power2.inOut" }, at("B06", "twelve") - 0.1);
  rise(at("B06", "twelve") + 0.15, label(s6, { x: mx(6), y: 558, text: "12 months", size: 20, fill: C.ink }));
  const en6 = actor(s6, "engineer", 95, 610, 230, { pose: 0 });
  walkIn(en6, at("B06", "route") - 1.2, -320, 1.2); alive(en6, at("B06", "route"), end("B06") + 1);
  cue(en6, [[at("B06", "agents"), 3], [at("B06", "Five"), 1], [at("B06", "twelve"), 3]]);
  focus(s6, tSeven, 640, 220, 1.03, 2);
  focus(s6, tFive - 0.2, 640, 470, 1.03, 2);

  // ======== f07 + f08 / B07-B08 — the price, and the reserve ========
  const s7 = scene("s7", "paper");
  change(s6, s7, "B06", "B07", "pan");
  rise(at("B07", "price") - 0.1, small(s7, { x: 700, y: 120, text: "12-MONTH AI BUDGET", size: 15 }));
  const cf7 = actor(s7, "cfo", 175, 610, 290, { pose: 1 });
  act(cf7, at("B07", "price") - 0.3, 0.5); alive(cf7, at("B07", "price"), end("B08") + 1);
  cue(cf7, [[at("B07", "million"), 3], [at("B07", "year"), 0], [at("B07", "Seven"), 3], [at("B07", "build"), 0], [at("B07", "Four"), 3], [at("B07", "run"), 1], [at("B07", "held"), 2],
    [at("B08", "Notice"), 3], [at("B08", "reserve"), 0], [at("B08", "wrong"), 1], [at("B08", "rarely"), 2]]);
  const barX = 270, barW = 880, barY = 300, barH = 56;
  const tMil = at("B07", "million");
  const base = rRect(s7, barX, barY, barW, barH, { fill: C.surface, strokeWidth: 2.4 });
  gsap.set(base, { scaleX: 0, svgOrigin: `${barX} ${barY}` });
  tl.to(base, { scaleX: 1, duration: 0.8, ease: "power2.inOut" }, tMil - 0.4);
  const tb = el("g", {}, s7);
  rLine(tb, barX, 392, barX + barW, 392, { strokeWidth: 1.8 }); rLine(tb, barX, 382, barX, 402, { strokeWidth: 1.8 }); rLine(tb, barX + barW, 382, barX + barW, 402, { strokeWidth: 1.8 });
  gsap.set(tb, { scaleX: 0, svgOrigin: `${barX + barW / 2} 392` });
  tl.to(tb, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, tMil + 0.2);
  rise(tMil + 0.35, label(s7, { x: barX + barW / 2, y: 436, text: "$1.2M", size: 34, weight: 800, fill: C.ink }));
  const segs = [];
  let sx = barX;
  [[0.7, C.blueD, "Build", "$0.7M", "Seven"], [0.4, C.blue, "Run", "$0.4M", "Four"], [0.1, C.blueL, "Reserve", "$0.1M", "held"]].forEach(([v, col, name, amt, w]) => {
    const wpx = (v / 1.2) * barW;
    const g = rRect(s7, sx, barY, wpx, barH, { fill: col, strokeWidth: 2.4 }, false);
    gsap.set(g, { scaleX: 0, svgOrigin: `${sx} ${barY}` });
    const t = at("B07", w);
    tl.to(g, { scaleX: 1, duration: 0.55, ease: "power2.inOut" }, t);
    const mid = sx + wpx / 2;
    const nl = label(s7, { x: mid, y: barY - 44, text: name, size: 16, fill: C.muted });
    const al = label(s7, { x: mid, y: barY - 16, text: amt, size: 22, weight: 800, fill: C.ink });
    rise(t + 0.35, nl); rise(t + 0.45, al);
    segs.push({ g, x: sx, w: wpx, labels: [nl, al] });
    sx += wpx;
  });
  const tNotice = at("B08", "Notice");
  tl.to([segs[0].g, segs[1].g], { opacity: 0.3, duration: 0.5 }, tNotice);
  tl.to(segs[2].labels, { autoAlpha: 0, duration: 0.3 }, tNotice);
  const ux = segs[2].x + segs[2].w / 2;
  const umb = el("g", {}, s7);
  rLine(umb, ux, barY - 110, ux, barY - 4, { strokeWidth: 3 });
  rPath(umb, `M${ux - 70},${barY - 108} Q${ux},${barY - 190} ${ux + 70},${barY - 108} q-17,-12 -35,0 q-17,-12 -35,0 q-17,-12 -35,0 q-17,-12 -35,0 Z`, { fill: C.blue });
  pop(umb, ux, barY);
  drawIn(at("B08", "reserve") - 0.3, umb, 0.8);
  focus(s7, tMil - 0.4, 710, 330, 1.06, 2);
  focus(s7, tNotice, 1000, 200, 1.08, 1.8);
  [[ux - 80, 70, 46], [ux + 40, 52, 40]].forEach(([cx, cy, R], k) => {
    const cl = el("g", {}, s7);
    [[0, 0, R], [-R * 0.7, R * 0.15, R * 0.75], [R * 0.7, R * 0.15, R * 0.8], [-R * 0.25, -R * 0.4, R * 0.8]].forEach(([a, b, d]) => cl.appendChild(rc.circle(cx + a, cy + b, d * 1.3, ink({ fill: "#C9D3DF", strokeWidth: 1.8 }))));
    for (let j = 0; j < 4; j++) cl.appendChild(rc.line(cx - 30 + j * 20, cy + R * 0.7, cx - 36 + j * 20, cy + R * 0.7 + 28, ink({ stroke: C.blueL, strokeWidth: 2 })));
    pop(cl, cx, cy); popIn(at("B08", "wrong") - 0.2 + k * 0.2, cl, 0.45);
  });
  rise(at("B08", "rarely") - 0.2, label(s7, { x: barX + barW, y: 470, text: "Keep a reserve", size: 22, weight: 800, fill: C.blue, anchor: "end" }));

  // ======== f09 / B09 — every month, plan vs actual; then decide ========
  const s9 = scene("s9", "paper");
  change(s7, s9, "B08", "B09", "pan");
  rise(at("B09", "month") - 0.3, small(s9, { x: 420, y: 120, text: "PLAN VS ACTUAL, EVERY MONTH", size: 15 }));
  const planV = [50, 75, 100, 120, 120, 110, 110, 100, 100, 100, 85, 110], actV = [45, 80, 95, 110, 125, 115, 105, 108, 95, 98, 80, 100];
  const tMonth = at("B09", "month");
  planV.forEach((v, i) => {
    const x = 110 + i * 58, k = 2.8, base = 570;
    const pv = el("g", {}, s9); pv.appendChild(rc.rectangle(x, base - v * k, 24, v * k, { stroke: C.muted, strokeWidth: 1.6, strokeLineDash: [5, 4], roughness: 0.9, seed: seed++ }));
    const av = rRect(s9, x + 14, base - actV[i] * k, 24, actV[i] * k, { fill: actV[i] > v ? C.red : C.blue, strokeWidth: 1.8 }, false);
    gsap.set([pv, av], { scaleY: 0, svgOrigin: `${x} ${base}` });
    tl.to(pv, { scaleY: 1, duration: 0.35, ease: "power2.out" }, tMonth + i * 0.22);
    tl.to(av, { scaleY: 1, duration: 0.35, ease: "power2.out" }, tMonth + 0.08 + i * 0.22);
    const m = el("text", { x: x + 19, y: 600, "text-anchor": "middle", "font-family": FONT, "font-weight": 700, "font-size": 14, fill: C.muted }, s9); m.textContent = "JFMAMJJASOND"[i];
    gsap.set(m, { autoAlpha: 0 }); tl.to(m, { autoAlpha: 1, duration: 0.2 }, tMonth + i * 0.22);
  });
  const pl9 = actor(s9, "planner", 890, 610, 250, { pose: 2 });
  act(pl9, at("B09", "Third"), 0.5); alive(pl9, at("B09", "Third"), end("B09") + 1);
  cue(pl9, [[at("B09", "month"), 1], [at("B09", "checked"), 0], [at("B09", "fixed"), 2], [at("B09", "choose"), 0], [at("B09", "Improve"), 1], [at("B09", "stop"), 0]]);
  focus(s9, tMonth, 450, 450, 1.06, 2.5);
  focus(s9, at("B09", "choose") - 0.4, 1000, 340, 1.12, 1.8);
  const post = el("g", {}, s9);
  rRect(post, 1010, 210, 16, 400, { fill: "#C9B79C", strokeWidth: 2.2 });
  gsap.set(post, { scaleY: 0, svgOrigin: "1018 610" });
  tl.to(post, { scaleY: 1, duration: 0.45, ease: "back.out(1.6)" }, at("B09", "choose") - 0.2);
  [["Scale it", C.green, 250, 1, "Scale"], ["Improve it", C.blue, 330, -1, "Improve"], ["Stop it", C.red, 410, 1, "stop"]].forEach(([n, col, y, dir, w]) => {
    const x0 = dir > 0 ? 998 : 1038, w2 = 190 * dir;
    const g = rPoly(s9, [[x0, y - 26], [x0 + w2 - 26 * dir, y - 26], [x0 + w2, y], [x0 + w2 - 26 * dir, y + 26], [x0, y + 26]], { fill: col, strokeWidth: 2.2 });
    el("text", { x: x0 + (w2 - 26 * dir) / 2, y: y + 8, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 21, fill: "#fff" }, g).textContent = n;
    pop(g, 1018, y); popIn(at("B09", w) - 0.05, g, 0.35);
  });

  // ======== f10 / B10 — the number: under budget, on track ========
  const s10 = scene("s10", "paper");
  change(s9, s10, "B09", "B10", "zoom", 0, [700, 420]);
  const led = el("g", {}, s10);
  rRect(led, 330, 170, 500, 360, { fill: C.surface, strokeWidth: 2.6 });
  el("text", { x: 366, y: 218, "font-family": FONT, "font-weight": 700, "font-size": 13, "letter-spacing": 2.4, fill: C.muted }, led).textContent = "THE TRACKER · 12 MONTHS";
  rLine(led, 366, 236, 794, 236, { stroke: C.line, strokeWidth: 2 });
  const hl = rRect(led, 350, 414, 460, 62, { fill: C.tint, stroke: "none" }, false);
  const row = (y, a, b, col = C.ink) => { const g = el("g", {}, led); el("text", { x: 366, y, "font-family": FONT, "font-weight": 600, "font-size": 30, fill: C.body }, g).textContent = a; el("text", { x: 794, y, "text-anchor": "end", "font-family": FONT, "font-weight": 800, "font-size": 30, fill: col }, g).textContent = b; gsap.set(g, { autoAlpha: 0, x: -14 }); return g; };
  const rB = row(300, "Budget", "$1.2M"), rA = row(370, "Actual", "$1.161M"), rV = row(456, "Variance", "−3%", C.blue);
  gsap.set(led, { y: 460, autoAlpha: 0, rotation: -2, svgOrigin: "580 350" });
  gsap.set(hl, { scaleX: 0, svgOrigin: "350 445" });
  tl.to(led, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" }, at("B10", "promised") - 0.3);
  tl.to(rA, { autoAlpha: 1, x: 0, duration: 0.35 }, at("B10", "one"));
  tl.to(rB, { autoAlpha: 1, x: 0, duration: 0.35 }, at("B10", "planned") - 0.4);
  tl.to(hl, { scaleX: 1, duration: 0.5, ease: "power2.out" }, at("B10", "three") - 0.1);
  tl.to(rV, { autoAlpha: 1, x: 0, duration: 0.35 }, at("B10", "three") - 0.2);
  const stamp = el("g", {}, s10);
  stamp.appendChild(rc.rectangle(652, 486, 250, 72, { stroke: C.green, strokeWidth: 5, roughness: 1.8, seed: seed++ }));
  el("text", { x: 777, y: 535, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 34, "letter-spacing": 2, fill: C.green }, stamp).textContent = "ON TRACK";
  gsap.set(stamp, { autoAlpha: 0, scale: 1.7, rotation: 8, svgOrigin: "777 522" });
  tl.to(stamp, { autoAlpha: 1, scale: 1, duration: 0.28, ease: "power4.in" }, at("B10", "track") - 0.35);
  const cf10 = actor(s10, "cfo", 1030, 610, 300, { flip: true, pose: 2 });
  act(cf10, at("B10", "Here"), 0.5); alive(cf10, at("B10", "Here"), end("B10") + 1);
  cue(cf10, [[at("B10", "promised"), 0], [at("B10", "tracker"), 3], [at("B10", "million"), 0], [at("B10", "planned"), 3], [at("B10", "under"), 1], [at("B10", "track"), 2]]);
  focus(s10, at("B10", "three") - 0.4, 580, 445, 1.12, 1.6);

  // ======== f11 / B11 — what it buys: $12 → $9, a 30% more productive team ========
  const s11 = scene("s11", "paper");
  change(s10, s11, "B10", "B11", "pan");
  rise(at("B11", "buy") - 0.2, small(s11, { x: 640, y: 100, text: "GOALS FOR YEAR ONE", size: 15 }));
  const lx0 = 150, lx1 = 700, ly = (u) => 230 + (12 - u) * 60;
  const curveG = el("g", {}, s11);
  const pts = []; for (let k = 0; k <= 10; k++) { const t = k / 10, s = t * t * (3 - 2 * t); pts.push([lx0 + (lx1 - lx0) * t, ly(12 - 3 * s)]); }
  rCurve(curveG, pts, { stroke: C.blue, strokeWidth: 7, roughness: 1.4 });
  const cid = "m" + uid++; const cp = el("clipPath", { id: cid }, defs); const rv = el("rect", { x: 0, y: 0, width: 0, height: 720 }, cp);
  curveG.setAttribute("clip-path", `url(#${cid})`);
  rLine(s11, lx0, 560, lx1 + 20, 560, { strokeWidth: 1.8 });
  [["Today", lx0], ["12 months", lx1]].forEach(([n, x]) => { el("text", { x, y: 590, "text-anchor": "middle", "font-family": FONT, "font-weight": 700, "font-size": 15, fill: C.muted }, s11).textContent = n; });
  const cA = coin(s11, lx0, ly(12) - 62, 32, "$12"), cB = coin(s11, lx1, ly(9) - 62, 32, "$9");
  popIn(at("B11", "twelve") - 0.1, cA, 0.5);
  tl.to(rv, { attr: { width: lx1 + 12 }, duration: 1.8, ease: "power1.inOut" }, at("B11", "twelve"));
  popIn(at("B11", "nine") - 0.05, cB, 0.5);
  rise(at("B11", "goal") - 0.1, label(s11, { x: 425, y: 640, text: "Cost per question", size: 18, fill: C.ink }));
  const crew = [["agentA", 900, 1], ["agentB", 1010, 1], ["agentC", 1120, 2]].map(([r, x, p], i) => {
    const a = actor(s11, r, x, 600, 270, { flip: i === 2, pose: p });
    act(a, at("B11", "team") + i * 0.12, 0.45); alive(a, at("B11", "team"), end("B11") + 1);
    return a;
  });
  cue(crew[0], [[at("B11", "thirty") + 0.2, 2]]); cue(crew[1], [[at("B11", "productive"), 2]]);
  focus(s11, at("B11", "twelve") - 0.3, 425, 400, 1.08, 2);
  focus(s11, at("B11", "team") - 0.3, 1010, 400, 1.08, 1.8);
  rise(at("B11", "thirty") - 0.1, label(s11, { x: 1010, y: 250, text: "+30%", size: 56, weight: 800, fill: C.blue }));
  crew.forEach((p, i) => tl.to(p.g, { y: -14, duration: 0.18, yoyo: true, repeat: 1, ease: "power1.out" }, at("B11", "thirty") + 0.3 + i * 0.08));

  // ======== f12 / B12 — every dollar lands in one of five cost centres ========
  const s12 = scene("s12", "blue");
  change(s11, s12, "B11", "B12", "pan");
  const ac12 = actor(s12, "accountant", 130, 600, 280, { pose: 0 });
  act(ac12, at("B12", "Last"), 0.5); alive(ac12, at("B12", "Last"), end("B12") + 1);
  cue(ac12, [[at("B12", "Finance"), 2], [at("B12", "five"), 0], [at("B12", "belongs"), 2], [at("B12", "asset"), 0], [at("B12", "expense"), 2], [at("B12", "home"), 0]]);
  rise(at("B12", "Finance"), small(s12, { x: 640, y: 92, text: "FOR THE FINANCE TEAM", size: 15, fill: "#DCE8FF" }));
  const tFiveB = at("B12", "five");
  ["Strategy", "Technology", "Security", "People", "Reserve"].forEach((n, i) => {
    const x = 330 + i * 160, w = 136;
    const g = el("g", {}, s12);
    rRect(g, x - w / 2, 500, w, 110, { fill: C.tint, strokeWidth: 2.4 });
    rRect(g, x - w / 2 - 6, 492, w + 12, 16, { fill: C.surface, strokeWidth: 2 }, false);
    el("text", { x, y: 566, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 15, fill: C.blueD }, g).textContent = n;
    gsap.set(g, { scaleY: 0, svgOrigin: `${x} 610` });
    tl.to(g, { scaleY: 1, duration: 0.45, ease: "back.out(1.8)" }, tFiveB + i * 0.12);
    for (let j = 0; j < 2; j++) {
      const cn = coin(s12, x + (j ? 20 : -20), 474, 15, "$");
      gsap.set(cn, { scale: 1, y: -520 });
      tl.to(cn, { y: 0, duration: 0.55, ease: "bounce.out" }, at("B12", "belongs") - 0.6 + i * 0.22 + j * 0.11);
    }
  });
  focus(s12, tFiveB - 0.2, 640, 520, 1.06, 2);
  focus(s12, at("B12", "asset") - 0.4, 760, 330, 1.06, 1.6);
  focus(s12, at("B12", "home") - 0.3, 640, 400, 1.02, 1.5);
  [["CAPITALISE", "#fff", 230, -6, "asset"], ["EXPENSE", C.blueL, 340, 5, "expense"]].forEach(([n, col, y, r, w]) => {
    const g = el("g", {}, s12);
    g.appendChild(rc.rectangle(880, y - 32, 240, 64, { stroke: col, strokeWidth: 4.5, roughness: 1.8, seed: seed++ }));
    el("text", { x: 1000, y: y + 11, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 26, "letter-spacing": 2, fill: col }, g).textContent = n;
    gsap.set(g, { autoAlpha: 0, scale: 1.7, rotation: r, svgOrigin: `1000 ${y}` });
    tl.to(g, { autoAlpha: 1, scale: 1, duration: 0.26, ease: "power4.in" }, at("B12", w) - 0.3);
  });

  // ======== f13 / B13 — the four principles, as four pictures ========
  const s13 = scene("s13", "paper");
  change(s12, s13, "B12", "B13", "pan", 0.7);
  rise(at("B13", "principles") - 0.2, small(s13, { x: 640, y: 130, text: "THE PRINCIPLES", size: 15 }));
  [["Price it first", "Price"], ["Keep a reserve", "reserve"], ["Track monthly", "Track"], ["Decide", "decide"]].forEach(([n, w], i) => {
    const x = 240 + i * 266, y = 340;
    const g = el("g", {}, s13);
    rRect(g, x - 110, y - 130, 220, 260, { fill: C.surface, strokeWidth: 2.4 });
    el("text", { x: x - 86, y: y - 92, "font-family": FONT, "font-weight": 800, "font-size": 26, fill: C.blue }, g).textContent = String(i + 1);
    if (i === 0) { const c = coin(g, x, y - 10, 40, "$"); gsap.set(c, { scale: 1 }); }
    if (i === 1) { rLine(g, x, y - 40, x, y + 40, { strokeWidth: 3 }); rPath(g, `M${x - 60},${y - 38} Q${x},${y - 110} ${x + 60},${y - 38} q-15,-10 -30,0 q-15,-10 -30,0 q-15,-10 -30,0 q-15,-10 -30,0 Z`, { fill: C.blue }); }
    if (i === 2) { [[-40, 40, C.blueL], [-10, 62, C.blue], [20, 50, C.blueL], [50, 74, C.blue]].forEach(([ddx, h, col]) => rRect(g, x + ddx - 12, y + 40 - h, 24, h, { fill: col, strokeWidth: 1.8 }, false)); rLine(g, x - 64, y + 40, x + 74, y + 40, { strokeWidth: 2 }); }
    if (i === 3) { rLine(g, x, y - 60, x, y + 50, { strokeWidth: 4 }); rPoly(g, [[x, y - 50], [x + 60, y - 50], [x + 76, y - 36], [x + 60, y - 22], [x, y - 22]], { fill: C.green }, false); rPoly(g, [[x, y - 12], [x - 60, y - 12], [x - 76, y + 2], [x - 60, y + 16], [x, y + 16]], { fill: C.blue }, false); rPoly(g, [[x, y + 24], [x + 50, y + 24], [x + 64, y + 36], [x + 50, y + 48], [x, y + 48]], { fill: C.red }, false); }
    el("text", { x, y: y + 104, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 20, fill: C.ink }, g).textContent = n;
    pop(g, x, y + 130);
    drawIn(at("B13", w) - 0.3, g, 0.8);
    focus(s13, at("B13", w) - 0.3, x, 340, 1.07, 1.1);
  });

  // ======== f14 / B14 — the strategy, now standing on its numbers; then the end card ========
  const s14 = scene("s14", "paper");
  change(s13, s14, "B13", "B14", "zoom", 0, [240, 340]);
  const st14 = actor(s14, "strategist", 430, 600, 320, { pose: 0 });
  gsap.set(st14.g, { scale: 1 }); alive(st14, B.B14.start - 1, end("B14") + 1.5);
  cue(st14, [[at("B14", "measure"), 1], [at("B14", "defend"), 3], [at("B14", "budget"), 2], [at("B14", "tools"), 1]]);
  focus(s14, at("B14", "defend") - 0.3, 700, 440, 1.08, 2);
  const blocks = el("g", {}, s14);
  ["$", "%", "#"].forEach((t, i) => {
    const x = 612 + i * 44;
    rRect(blocks, x, 556, 40, 44, { fill: [C.blueD, C.blue, C.blueL][i], strokeWidth: 2 }, false);
    el("text", { x: x + 20, y: 585, "text-anchor": "middle", "font-family": FONT, "font-weight": 800, "font-size": 18, fill: "#fff" }, blocks).textContent = t;
  });
  gsap.set(blocks, { y: 60, autoAlpha: 0 });
  tl.to(blocks, { y: 0, autoAlpha: 1, duration: 0.5, ease: "back.out(1.6)" }, at("B14", "measure"));
  const doc2 = strategyDoc(s14, 600, 362);
  gsap.set(doc2, { y: -260, autoAlpha: 0 });
  tl.to(doc2, { y: 0, autoAlpha: 1, duration: 0.8, ease: "bounce.out" }, at("B14", "measure") + 0.3);
  const tick = rCircle(s14, 770, 362, 64, { fill: C.green });
  tick.appendChild(rc.linearPath([[754, 362], [766, 374], [788, 348]], { stroke: "#fff", strokeWidth: 5, roughness: 0.8, seed: seed++ }));
  pop(tick, 770, 362); popIn(at("B14", "defend"), tick, 0.4);
  rise(at("B14", "defend") + 0.2, small(s14, { x: 818, y: 368, text: "DEFENSIBLE", size: 16, fill: C.green, anchor: "start" }));
  rise(at("B14", "budget") - 0.2, label(s14, { x: 960, y: 520, text: "Start with the budget", size: 24, weight: 800, fill: C.ink }));
  const endT = end("B14") + 0.4;
  const ec = el("g", {}, svg);
  el("rect", { width: 1280, height: 720, fill: C.paper }, ec);
  const logo = el("g", { transform: "translate(460 280)" }, ec); logo.innerHTML = window.LOGO || "";
  el("text", { x: 640, y: 430, "text-anchor": "middle", "font-family": FONT, "font-weight": 500, "font-size": 22, fill: C.body }, ec).textContent = "Talk to our team";
  el("path", { d: "M540,462 h188 l12,12 v34 h-188 l-12,-12z", fill: C.blue }, ec);
  el("text", { x: 640, y: 497, "text-anchor": "middle", "font-family": FONT, "font-weight": 700, "font-size": 20, fill: "#fff" }, ec).textContent = "example.com";
  gsap.set(ec, { autoAlpha: 0 });
  tl.set(ec, { autoAlpha: 1 }, endT);
  tl.fromTo(ec, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.inOut" }, endT);
  drift(s14, endT + 0.75);
  hide(s14, endT + 0.75);

  tl.set({}, {}, 162.6);
  window.__mainTimeline = tl; // registered in index.html
})();
