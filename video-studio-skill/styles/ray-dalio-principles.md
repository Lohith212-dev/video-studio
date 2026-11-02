---
id: ray-dalio-principles
name: Ray Dalio "Principles" Animation
one_line: Calm, wise narration over chalkboard-green charts that draw themselves, with small hand-drawn props and characters popping in to act out each idea.
best_for: [economics, strategy, finance, "how a system works" explainers, cause-and-effect stories, budget and ROI stories]
not_for: [hype product launches, fast social clips, tutorials with screen recordings]
needs_on_camera_person: false
build_difficulty: medium
pace_wpm: "128"
signature_moves: [Line draw, Many → few, Mask-reveal labels, Bracket draw]
tested: true   # built end to end and reviewed
references:
  - title: Principles for Dealing with the Changing World Order (5-minute Version) by Ray Dalio
    url: https://www.youtube.com/watch?v=BB2r_eOjsPw
    timestamps: "0:00-0:15 empire arcs build; 1:08-1:30 cycles chart + 10-20 yr brackets + conflict puffs (rebuilt by us, see note); 1:40-2:20 eight strengths chart; 2:58-4:30 Big Cycle story on navy with characters"
  - title: How the Economic Machine Works by Ray Dalio (older sibling of this style)
    url: https://www.youtube.com/watch?v=PHe0bXAIuk0
    timestamps: "whole video: same narrator-led cause/effect structure, simpler flat drawings"
---

# Ray Dalio "Principles" Animation

> Verified by rebuilding 10 seconds (1:16-1:26) frame-for-frame in both Remotion and HyperFrames. The numbers below come from that rebuild: measured positions, sampled colours, frame-counted timing.

## 1. The idea in one paragraph
It feels like a wise teacher drawing on a chalkboard. Every idea is one picture: a chart that draws itself, or a small drawn prop that acts out the sentence being spoken. Nothing appears that the narrator is not talking about at that moment. Complexity is shown first (many wiggly lines), then simplified into a clean pattern ("now let's simplify it"), which makes the viewer feel smart. Built for busy, serious adults who want to understand a system: executives, investors, policy readers.

## 2. Narration
- **Voice:** older, calm, warm, unhurried, a "trusted mentor" tone. Never excited.
- **Pace:** 128 words per minute (measured: 624 words in 4:53). Clear pauses (0.4-0.7 s) between sentences.
- **Sentence shape:** plain words, medium sentences, many "as you can see", "in a nutshell", "this leads to", "which leads to". Causal chains: A leads to B which leads to C.
- **Structure habits:** first person research claim ("I studied..."), then the evidence (chart), then simplification, then the mechanism (step-by-step cycle), then the implication. No jokes, no rhetorical hype.
- **HyperFrames TTS pick:** `am_michael` at speed 0.92 (closest to the measured pace and gravitas). Alternative: `bm_george` at 0.92 for a British "professor" feel.

## 3. Visual system
- **Palette (sampled):**
  - Chart background chalkboard green `#2d4237` (grain + darker scratchy edges)
  - Story background navy `#18203d`, grid `#222c52`, ground line `#c9cfdf`
  - Grid lines near-black `#0c1713`
  - Text cream `#eef0e4`
  - Orange `#f6a800` (Dutch), deep navy `#0b1446` (British), sky blue `#0a84e0` (U.S.), red `#cb1c00` (China), gold coin `#d4a640`
  - Paper/props cream `#f3efe2`, shadow grey `#a9aba3`
- **Typography:** titles and big labels in a bold high-contrast serif (Playfair Display 700, ~27-30 px at 720p); data labels in a spaced sans (Fira Sans 400, 17-18 px at 720p, letter-spacing 1.5-2 px). At 1080p multiply by 1.5.
- **Backgrounds and texture:** flat colour + fine grain + dark diagonal scratch texture crowding the frame edges (top/bottom ~17%, sides ~6%).
- **With a brand:** the green and navy worlds become the brand's two main surfaces (e.g. the demo brand's paper `#F5F8FA` and blue `#146EF5`→`#0B3FA8`), and every prop and person colour comes from the brand file. Never keep the reference green when a brand is set (feedback, 2026-10-29).
- **Illustration:** hand-drawn props with a thick black outline (2-3 px at 720p), flat fills, a grey offset shadow on the lower-left inside the outline, and a soft dark drop shadow. Flags wave. Characters are simple, thin-legged, hand-drawn men in period clothes; crowds are tiny stick-like figures in two colours.
- **Layout:** chart area spans almost the whole width with a fixed grid (vertical lines every ~94 px at 720p), baseline at ~84% height. Labels sit beside what they name on an opaque background box that hides the grid behind them.

## 4. Motion language
- **Signature moves:**
  1. *Line draw:* chart lines draw left to right, ~1.5-4 s, `power1.inOut`.
  2. *Many → few:* a busy chart fades to 4 lines, then morphs into clean arcs ("simplify the form").
  3. *Mask-reveal labels:* text rises into its own line from below (0.2-0.3 s, `power2.out`); exits by sliding down out of the mask.
  4. *Bracket draw:* measurement brackets grow from the centre (`|——|`) over 0.2-0.25 s; ticks appear at the end.
  5. *Pop and burst:* cartoon smoke puffs pop with overshoot (`back.out(2)`, ~0.25 s), hold ~0.15 s, then burst into flying pellets (0.33 s, `power3.out`). Used for conflict and war.
- **Transitions:** mostly morphs within one chart; scene changes are quick horizontal pans (0.6 s, `power3.inOut`) or a cut to the navy "story" world.
- **Camera:** gentle zooms into a part of a chart (e.g. into one arc) with labels staying sharp.
- **Text reveals:** word-level only for titles; numbers appear with their label, never counted up.

## 4a. Motion, measured
Measured on 2026-10-29 with `templates/motion_metrics.py` (12 samples/s, change threshold 0.02) on the 5-minute reference, and on our own rebuilds of the CX budget video.

| Measure | Dalio reference | Our v2 rebuild (rejected: "static") |
|---|---|---|
| moving_frames_pct | 75.3 | about 48 |
| still_time_pct | 24.7 | 52 |
| holds_1s_per_min | 4.5 | about 12 |
| holds_2s_per_min | 0.8 | about 6 |
| big_change_pct | 32.4 | n/a |

What it means: something moves three frames in four. Stills are short (mostly under 1 s) and come right after a line lands.

## 4b. Motion rules
1. **One continuous world per chapter; the camera follows the action.** In the Big Cycle story (2:58-4:30) the arc keeps growing across one navy world and the camera tracks its head. Change scenes by panning sideways along the same world, or by zooming into the object that leads to the next idea. Hard cuts are rare.
2. **People perform.** A new pose every 1-2 s, tied to a spoken word: explaining, pointing at the thing being named, arms crossed for a verdict, sitting while waiting. People hold props that belong to their role (a CFO holds a tablet with a chart). A static figure that only pops in reads as clip art (user feedback on v2).
3. **Something is always alive.** People breathe and sway, gears turn, clocks tick, coins drop, and every scene has a slow camera drift. No still frame longer than 1 s except right after a key number lands.
4. **Props draw themselves on.** Outlines trace in (0.6-1.2 s), then fills appear underneath. Use pop-ins only for small repeated items (coins, bubbles, icons).
5. **Objects turn into the next object.** A busy chart simplifies into arcs; a gear becomes the timeline; a budget bar becomes the reserve with its umbrella. Prefer a transformation or a zoom-through to a cut.
6. **Props build up; they don't swap.** A scene accumulates items on spoken words (bubbles pile up, then turn red; segments fill the bar), and the earlier ones stay until the idea ends.
7. **Charts are stages.** A chart is a place where things happen (characters stand beside it, signposts grow out of it), not a slide.

## 4c. Characters and casting
- **Who appears:** small hand-drawn people acting out each idea: workers, leaders, customers. No presenter.
- **How they act:** pose changes on spoken cues, breathing, walking in from the edge, reacting (jump for good news, crossed arms for a verdict).
- **Source:** Open Peeps (CC0, openpeeps.com), assembled from its atoms (pose + head + face) and recoloured to the brand. Dress each person for the role: a strategist in a blazer, an engineer with a lanyard and laptop, a CFO with a tablet, a customer in casual clothes. Start from the ready-made people in `casting/library/`; build new ones with `casting/_tools/` and see `knowledge/casting.md` (casting gate).
- **Ink outlines match this style.** Humaaans (flat, no outline) does not; keep it for Kurzgesagt-like styles.
- **Pack the picked cast** into `assets/cast.js` (one entry per role, 3-4 poses each) and use `actor()`, `pose()` and `alive()` from the kit.

## 4d. Text rules
- Labels only: 1-4 words naming the thing on screen, or the number being spoken.
- Small spaced caps for headings ("12-MONTH AI BUDGET"), bold numbers next to what they measure.
- **Text-only scenes: not allowed.** Even the principle and the principles recap are pictures (a doc floating away as a balloon; four drawn cards), never a sentence on a plain background (user feedback on v1).

## 5. Scene grammar
| Scene type | Purpose | Length | Layout | Motion | Narration |
|---|---|---|---|---|---|
| Evidence chart | Show the data is real | 8-20 s | Full grid, title on top, legend box below | Lines draw, many → few | "I studied..., as you can see..." |
| Simplified pattern | The insight | 6-12 s | Same grid, clean arcs, flags at peaks | Morph, brackets, shaded bands | "you'll notice the pattern" |
| Strength breakdown | Explain the parts | 3-5 s each | Faded chart, one line highlighted, icon prop centred | Highlight + prop pop | Names each factor |
| Big Cycle story | Mechanism, step by step | 3-6 s per step | Navy world, arc grows across the frame, props/characters act | Arc extends as the story advances; props pop | "this leads to... which leads to..." |
| Conflict beat | Turning point | 2-4 s | Over the chart | Smoke puffs, ships, cannon | "transitions are periods of great conflict" |
| Return to start | Close the loop | 4-6 s | New arc rises, flags stack | Flags swap, new cycle begins | "and the cycle begins again" |

## 6. Data and numbers
Line charts normalised to "relative to peak" (0-1), years on the x-axis. Ranges shown with brackets and short labels ("~250 Years", "10-20 Years"). Shaded hatched bands mark periods. Flags or icons at line peaks name the series instead of a legend. No dashboards, no tables, no pie charts: always one chart, one idea.

## 7. Sound
- **Music:** continuous, soft, orchestral/piano bed, 70-90 BPM, never stops (no silence under -45 dB in the whole video), slight swell at section changes.
- **Sound effects:** light and sparse: pops for props, soft whooshes for pans, muffled booms for conflict puffs, coins for money.
- **Mix:** voice on top; music about -20 to -24 dB under the voice; SFX about -12 dB.

## 8. Pacing
A visual change every 1-3 s, but the scene (chart or world) stays for 10-40 s. Props live 2-6 s. Numbers stay on screen until the next idea replaces them. Full piece: 5 minutes (short) or 30+ minutes (long version).

## 9. Assets needed and where to get them
- Flags, coins, buildings, ships, puffs: draw as SVG in code (proved in our rebuild).
- Shapes: Rough.js (MIT) gives the hand-drawn outline; seed every shape so renders repeat exactly.
- People: the Open Peeps cast picked at the casting gate (see 4c), recoloured to the brand, 3-4 poses per role. Simple SVG figures for crowds.
- Music: calm documentary piano bed (assets/starter-kit/music). SFX: pop, whoosh, soft impact, coins.

## 10. HyperFrames build recipe
- Author at 1280x720 inside a `#stage` scaled by 1.5 to 1920x1080 (keeps measured coordinates simple).
- Layers, back to front: backdrop (colour, grain filter, edge-scratch pattern masked by edge gradients), grid, hatched bands, arcs/lines, flags + labels, brackets/text, effects (smoke).
- Lines as filled brush polygons (width swells mid-line, tapers to a point at cut ends) plus a light fleck texture filter; reveal with a growing clip rect.
- Labels: SVG text in a clipPath; animate `y` from 1.5x font size to 0.
- Flags: flat flag art sliced into ~18 vertical strips, each shifted by a sine wave from a timeline-driven `onUpdate`; outline path + offset shadow.
- Smoke: 3-pass "inked" shapes (black outline circles, grey offset circles, white circles). Seeded randomness only (no Math.random).
- Drive procedural parts from one GSAP proxy tween (`frame: 0 → N`, ease none) with `onUpdate` so seeking is deterministic.
- Scenes are three nested groups: outer (shown, hidden, panned), drift (slow 4% zoom over the scene's life) and camera (pushes toward the action). Draw into the camera group, with a background larger than the frame so the camera never shows an edge. Set each group's `svgOrigin` once while untransformed (GSAP otherwise shifts x/y when the origin changes).
- People: `actor(scene, role, x, y, height, {flip, pose})`, `pose(actor, time, index)`, `alive(actor, from, to)`, `walkIn(actor, time, dx)`. Props: `drawIn(time, group, duration)`. Camera: `focus(scene, time, x, y, zoom, duration)`. All in `examples/cx-ai-budget/assets/scenes.js`.
- Reference implementations: `hyperframes/index.html` (arcs scene) and `cx-poc/index.html` (bubbles, coin, budget bar, cost line) in the project folder.

## 11. Storyboard frame spec
For each frame: world (green chart / navy story), chart type and data, which line or element is highlighted, props/characters on screen and what they do, labels/brackets with exact text, transition in/out, SFX cue, narration words that trigger each change.

## 12. Do and don't
**Do**
- One idea per frame; draw what the narrator says, when they say it.
- Show the complex version, then simplify.
- Use flags/icons as series labels.
- Keep the background texture and edge grunge on every frame.
- Keep the music bed continuous.

**Don't**
- Don't use pie charts, dashboards or bullet lists.
- Don't show text that isn't spoken or labelling something.
- Don't use bright gradients, glows or 3D.
- Don't count numbers up or use flashy kinetic type.
- Don't rush: hold each picture until its sentence ends.

## 13. Feasibility with our stack
- **Charts, labels, brackets, bands, flags, coins, buildings, puffs:** proven at about 90-95% fidelity in HyperFrames (side-by-side test with the original).
- **Hand-drawn characters acting things out:** the hardest part. v2 used static Open Peeps and was rejected as "static pictures". v3 uses a role-dressed Open Peeps cast with pose changes every 1-2 s, breathing, walk-ins and camera pushes; this reads as acting but not full character animation (no in-between limb motion). Expect 65-75% fidelity on character scenes.
- **Motion:** v3 adds camera drift and pushes, draw-on props and zoom-through scene changes; check the result against section 14 before showing the user.
- **Voice:** Kokoro `am_michael` gets the calm pace right but is flatter than the original narrator.
- **Effort:** about 1-2 hours of agent time per 30 seconds of new scenes, less once components are reused.

## 14. Self-check targets
Run `python templates/motion_metrics.py renders/final.mp4 --json renders/motion.json` and compare; look at snapshots for the sentences below.

```yaml
style: ray-dalio-principles
reference: "BB2r_eOjsPw whole video: 75.3% moving, 0.8 holds>=2s/min"
moving_frames_pct_min: 70
holds_2s_per_min_max: 1.5
cuts_per_min: [0, 2]            # scene changes are pans or zoom-throughs, not cuts
text_only_scenes_allowed: false
characters_required: true       # a person acting in at least two thirds of the scenes
colour_source: brand            # every colour from the brand file when a brand is set
checks:
  - "Every person changes pose at least every 2 s while they are on screen, and each one is dressed and holding props for their role."
  - "Every prop draws itself on (outline then fill) or builds up on a spoken word; no frame is a sentence on a plain background."
  - "Scene changes within a chapter are camera pans or zoom-throughs into the object that leads to the next idea."
```
