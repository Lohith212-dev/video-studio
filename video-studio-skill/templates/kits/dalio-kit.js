/*
 * Dalio kit — reusable pieces for the "ray-dalio-principles" style in HyperFrames.
 * Proven in two rebuilds (empire arcs scene, CX budget POC). Load with
 *   <script src="dalio-kit.js"></script>
 * after GSAP, then call DalioKit.install(svgElement) once. Everything is authored on a
 * 1280x720 SVG; scale the stage by 1.5 for 1080p. Deterministic: no Math.random.
 */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const C = {
    green: "#2d4237", navy: "#18203d", navyGrid: "#222c52", grid: "#0c1713",
    cream: "#eef0e4", paper: "#f3efe2", shade: "#a9aba3", ink: "#0a0a0a",
    orange: "#f6a800", deepNavy: "#0b1446", blue: "#0a84e0", red: "#cb1c00", gold: "#d4a640",
  };
  const FONTS = { serif: "Playfair Display", sans: "Fira Sans" };
  let defs, uid = 0;

  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };

  // Seeded 0..1 from any string.
  const random = (seed) => {
    let h = 2166136261;
    for (const c of String(seed)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    h += 0x6d2b79f5;
    let t = Math.imul(h ^ (h >>> 15), h | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const DEFS = `
    <filter id="dk-grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.07  0 0 0 0 0.11  0 0 0 0 0.09  2.8 0 0 0 -1.55"/>
    </filter>
    <pattern id="dk-scratch" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="3.2" stroke="#0a120e" stroke-width="1.1"/>
    </pattern>
    <filter id="dk-breakup" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.06 0.5" numOctaves="3" seed="2" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  5 0 0 0 -1.5" result="m"/>
      <feComposite in="SourceGraphic" in2="m" operator="in"/>
    </filter>
    <linearGradient id="dk-edgeV" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="0.17" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.83" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="dk-edgeH" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="0.06" stop-color="#fff" stop-opacity="0"/>
      <stop offset="0.94" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="1"/>
    </linearGradient>
    <mask id="dk-edges"><rect width="1280" height="720" fill="url(#dk-edgeV)"/><rect width="1280" height="720" fill="url(#dk-edgeH)"/></mask>
    <pattern id="dk-hatch" width="4.2" height="4.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="4.2" stroke="#6f9079" stroke-width="1.2"/>
    </pattern>
    <filter id="dk-ink">
      <feTurbulence type="fractalNoise" baseFrequency="1.1 0.35" numOctaves="2" seed="7" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.5 0 0 0 -0.36" result="flecks"/>
      <feComposite in="flecks" in2="SourceGraphic" operator="in" result="inside"/>
      <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="inside"/></feMerge>
    </filter>`;

  function install(svg) {
    defs = svg.querySelector("defs") || el("defs", {}, svg);
    defs.insertAdjacentHTML("beforeend", DEFS);
  }

  // Chalkboard (green) or story (navy) background with grain, edge scratches and a grid.
  function backdrop(parent, { world = "green", gridX, gridY, top = 98, bottom = 612 } = {}) {
    const base = world === "navy" ? C.navy : C.green;
    const gridColor = world === "navy" ? C.navyGrid : C.grid;
    gridX = gridX || (world === "navy" ? Array.from({ length: 15 }, (_, i) => 20 + i * 88) : Array.from({ length: 13 }, (_, i) => 73 + i * 94.4));
    gridY = gridY || (world === "navy" ? Array.from({ length: 8 }, (_, i) => 50 + i * 88) : [179, 251, 324, 397, 469, 542]);
    if (world === "navy") { top = 0; bottom = 720; }
    el("rect", { width: 1280, height: 720, fill: base }, parent);
    el("rect", { width: 1280, height: 720, filter: "url(#dk-grain)", opacity: 0.25 }, parent);
    const m = el("g", { mask: "url(#dk-edges)" }, parent);
    el("rect", { width: 1280, height: 720, fill: "url(#dk-scratch)", filter: "url(#dk-breakup)" }, m);
    const g = el("g", { stroke: gridColor, "stroke-width": 1.6, opacity: 0.9 }, parent);
    gridY.forEach((y) => el("line", { x1: 0, x2: 1280, y1: y, y2: y }, g));
    gridX.forEach((x) => el("line", { x1: x, x2: x, y1: top, y2: bottom }, g));
    return g;
  }

  // Text that rises into its own line from below. Animate with tl.to(t, {y: 0}).
  function revealText(parent, { x, y, text, size = 18, font = FONTS.sans, weight = 400, anchor = "middle", fill = C.cream, spacing = 1.5 }) {
    const id = "dk-clip" + uid++;
    const cp = el("clipPath", { id }, defs);
    el("rect", { x: x - 700, y: y - size * 1.05, width: 1400, height: size * 1.45 }, cp);
    const g = el("g", { "clip-path": `url(#${id})` }, parent);
    const t = el("text", { x, y, "text-anchor": anchor, "font-family": font, "font-weight": weight, "font-size": size, "letter-spacing": spacing, fill }, g);
    t.textContent = text;
    gsap.set(t, { y: size * 1.5 });
    return t;
  }
  const rise = (tl, t, at, dur = 0.35) => tl.to(t, { y: 0, duration: dur, ease: "power2.out" }, at);
  const sink = (tl, t, at, size = 18, dur = 0.3) => tl.to(t, { y: size * 1.5, duration: dur, ease: "power2.in" }, at);

  // |——| bracket that grows from its centre. Animate with tl.to(g, {scaleX: 1}).
  function bracket(parent, x1, x2, y, color = C.cream) {
    const g = el("g", { stroke: color, "stroke-width": 1.6 }, parent);
    el("line", { x1, x2, y1: y, y2: y }, g);
    el("line", { x1, x2: x1, y1: y - 7, y2: y + 7 }, g);
    el("line", { x1: x2, x2, y1: y - 7, y2: y + 7 }, g);
    gsap.set(g, { scaleX: 0, svgOrigin: `${(x1 + x2) / 2} ${y}` });
    return g;
  }

  // Gold coin with sun rays and a label. Animate with popIn.
  function coin(parent, cx, cy, r, label) {
    const g = el("g", {}, parent);
    const rays = el("g", { stroke: C.ink, "stroke-width": Math.max(1.2, r * 0.035), "stroke-linecap": "round" }, g);
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2, r0 = r * 1.18, r1 = r * (i % 2 ? 1.38 : 1.55);
      el("line", { x1: cx + Math.cos(a) * r0, y1: cy + Math.sin(a) * r0, x2: cx + Math.cos(a) * r1, y2: cy + Math.sin(a) * r1 }, rays);
    }
    el("circle", { cx: cx - r * 0.08, cy: cy + r * 0.08, r: r + 2.5, fill: C.ink }, g);
    el("circle", { cx, cy, r: r + 2.5, fill: C.ink }, g);
    el("circle", { cx, cy, r, fill: C.gold }, g);
    el("circle", { cx, cy, r: r * 0.8, fill: "none", stroke: "#8a6a1f", "stroke-width": Math.max(1, r * 0.04) }, g);
    const t = el("text", { x: cx, y: cy + r * 0.22, "text-anchor": "middle", "font-family": FONTS.serif, "font-weight": 700, "font-size": r * 0.62, fill: "#4a3510" }, g);
    t.textContent = label;
    gsap.set(g, { scale: 0, svgOrigin: `${cx} ${cy}` });
    return g;
  }
  const popIn = (tl, target, at, dur = 0.45) => tl.to(target, { scale: 1, duration: dur, ease: "back.out(2.2)" }, at);

  // Cartoon look: black outline pass, grey offset shadow pass, white fill pass.
  function inked(parent, blobs, shadow = [-6, 5], outline = 3, fill = "#f7f7ef") {
    const pass = (f, grow, [ox, oy]) => blobs.forEach((b) =>
      el("ellipse", { cx: b.x + ox, cy: b.y + oy, rx: (b.rx ?? b.r) + grow, ry: b.r + grow, fill: f }, parent));
    pass(C.ink, outline, [0, 0]); pass(C.ink, outline, shadow); pass(C.shade, 0, shadow); pass(fill, 0, [0, 0]);
  }

  // Smoke puff that pops then bursts into pellets. Call drawPuffs(frame) from a timeline onUpdate.
  function puffs(parent, list, R = 52) {
    const cloud = (seed) => {
      const spin = random(seed + "spin") * Math.PI * 2;
      return [{ x: 0, y: 0, r: R * 0.62 }].concat(Array.from({ length: 7 }, (_, i) => {
        const a = spin + (i / 7) * Math.PI * 2, d = R * (0.5 + random(seed + i + "d") * 0.12);
        return { x: Math.cos(a) * d, y: Math.sin(a) * d, r: R * (0.33 + random(seed + i + "r") * 0.12) };
      }));
    };
    const items = list.map(({ x, y, startFrame, seed }) => {
      const root = el("g", { transform: `translate(${x} ${y})`, visibility: "hidden" }, parent);
      const body = el("g", {}, root); inked(body, cloud(seed));
      const pellets = el("g", {}, root);
      return { root, body, pellets, startFrame, seed };
    });
    const eo = (x) => 1 - (1 - x) ** 3;
    return function draw(frame) {
      for (const p of items) {
        const l = frame - p.startFrame, on = l >= 0 && l <= 18;
        p.root.setAttribute("visibility", on ? "visible" : "hidden");
        if (!on) continue;
        p.pellets.replaceChildren();
        if (l <= 10) {
          const s = l < 5 ? 0.15 + 0.95 * (1 - (1 - l / 5) ** 2) : l < 7 ? 1.1 - 0.1 * ((l - 5) / 2) : 1;
          p.body.setAttribute("visibility", "visible");
          p.body.setAttribute("transform", `scale(${s})`);
        } else {
          p.body.setAttribute("visibility", "hidden");
          const k = eo(Math.min(1, (l - 10) / 8));
          inked(p.pellets, Array.from({ length: 13 }, (_, i) => {
            const a = (i / 13) * Math.PI * 2 + random(p.seed + i + "ba") * 0.4;
            const dist = R * 0.35 + k * R * (0.75 + random(p.seed + i + "bd") * 0.5);
            const size = (4 + random(p.seed + i + "bs") * 10) * (1 - k * 0.7);
            return { x: Math.cos(a) * dist, y: Math.sin(a) * dist, r: size * (random(p.seed + i + "t") > 0.7 ? 1.4 : 1), rx: size };
          }), [-2.5, 2], 1.8);
        }
      }
    };
  }

  // A brush-stroke line (thicker in the middle) along any function y = f(x).
  // Reveal it left-to-right by animating a clip rect's width.
  function brushLine(parent, { f, x0, x1, color = C.blue, wMin = 4, wMax = 13, steps = 220 }) {
    const L = [], R = [];
    for (let i = 0; i <= steps; i++) {
      const x = x0 + ((x1 - x0) * i) / steps, y = f(x);
      const dx = 0.5, dy = f(x + dx) - y, len = Math.hypot(dx, dy) || 1;
      const s = i / steps, w = wMin + (wMax - wMin) * Math.sin(Math.PI * Math.min(1, s * 1.1)) ** 0.35;
      const nx = (-dy / len) * (w / 2), ny = (dx / len) * (w / 2);
      L.push([x + nx, y + ny]); R.push([x - nx, y - ny]);
    }
    const id = "dk-reveal" + uid++;
    const cp = el("clipPath", { id }, defs);
    const rect = el("rect", { x: 0, y: 0, width: 0, height: 720 }, cp);
    const g = el("g", { "clip-path": `url(#${id})`, filter: "url(#dk-ink)" }, parent);
    el("path", { d: "M" + [...L, ...R.reverse()].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join("L") + "Z", fill: color }, g);
    return { group: g, reveal: rect }; // tl.to(reveal, {attr: {width: X}, duration, ease: "power1.inOut"})
  }

  // Classical building prop (the "company" or "institution").
  function building(parent, bx, by) {
    const g = el("g", {}, parent);
    g.innerHTML = `
      <g transform="translate(-7 7)" fill="${C.ink}" opacity="0.45">
        <rect x="${bx - 150}" y="${by + 70}" width="300" height="22"/><rect x="${bx - 130}" y="${by - 60}" width="260" height="132"/>
        <polygon points="${bx - 145},${by - 76} ${bx},${by - 150} ${bx + 145},${by - 76}"/></g>
      <rect x="${bx - 150}" y="${by + 70}" width="300" height="22" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>
      <rect x="${bx - 138}" y="${by + 58}" width="276" height="14" fill="#e3dcc6" stroke="${C.ink}" stroke-width="2.5"/>
      <rect x="${bx - 130}" y="${by - 60}" width="260" height="120" fill="#e9e1c9" stroke="${C.ink}" stroke-width="3"/>
      ${Array.from({ length: 6 }, (_, i) => { const cx = bx - 105 + i * 42; return `<rect x="${cx - 9}" y="${by - 52}" width="18" height="110" fill="${C.paper}" stroke="${C.ink}" stroke-width="2.2"/><line x1="${cx - 3}" y1="${by - 48}" x2="${cx - 3}" y2="${by + 54}" stroke="#bdb59c" stroke-width="2"/>`; }).join("")}
      <rect x="${bx - 145}" y="${by - 78}" width="290" height="20" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>
      <polygon points="${bx - 145},${by - 78} ${bx},${by - 150} ${bx + 145},${by - 78}" fill="#e9e1c9" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="${bx}" cy="${by - 104}" r="13" fill="${C.gold}" stroke="${C.ink}" stroke-width="2.4"/>
      <line x1="${bx}" y1="${by - 150}" x2="${bx}" y2="${by - 196}" stroke="${C.ink}" stroke-width="2.6"/>
      <path d="M${bx},${by - 196} q18,-6 34,2 q-16,8 -34,14 z" fill="${C.orange}" stroke="${C.ink}" stroke-width="2.2"/>`;
    gsap.set(g, { scale: 0, svgOrigin: `${bx} ${by + 92}` });
    return g;
  }

  // Speech bubble (one question / message). Fill can be tweened via tl.to(body, {attr: {fill}}).
  function bubble(parent, x, y) {
    const g = el("g", {}, parent);
    const d = `M${x - 17},${y - 11} h34 a5,5 0 0 1 5,5 v12 a5,5 0 0 1 -5,5 h-22 l-8,7 l1,-7 h-5 a5,5 0 0 1 -5,-5 v-12 a5,5 0 0 1 5,-5 z`;
    el("path", { d, fill: C.ink, transform: "translate(-2.5 2.5)" }, g);
    const body = el("path", { d, fill: C.paper, stroke: C.ink, "stroke-width": 2, "stroke-linejoin": "round" }, g);
    el("g", { fill: "#7d7f78" }, g).innerHTML = `<circle cx="${x - 8}" cy="${y}" r="2"/><circle cx="${x}" cy="${y}" r="2"/><circle cx="${x + 8}" cy="${y}" r="2"/>`;
    gsap.set(g, { scale: 0, svgOrigin: `${x} ${y}` });
    return { g, body };
  }

  // Hatched band marking a period on a chart.
  function band(parent, x, w, top = 98, bottom = 605) {
    const g = el("g", {}, parent);
    el("rect", { x, y: top, width: w, height: bottom - top, fill: C.green }, g);
    el("rect", { x, y: top, width: w, height: bottom - top, fill: "url(#dk-hatch)" }, g);
    gsap.set(g, { opacity: 0 });
    return g;
  }

  // Slide one scene out and the next in, like a camera pan.
  function pan(tl, from, to, at, dur = 0.6) {
    tl.to(from, { x: -1280, duration: dur, ease: "power3.inOut" }, at);
    tl.fromTo(to, { x: 1280 }, { x: 0, duration: dur, ease: "power3.inOut" }, at);
  }

  window.DalioKit = { C, FONTS, el, random, install, backdrop, revealText, rise, sink, bracket, coin, popIn, inked, puffs, brushLine, building, bubble, band, pan };
})();
