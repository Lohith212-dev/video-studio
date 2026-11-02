---
id: varun-mayya
name: "Varun Mayya Tech Short"
one_line: A fast, curious tech-news explainer where a presenter's quick talking-head shots alternate with stark white-on-black line diagrams that build piece by piece, real screenshots of the source, and tiny two-or-three-word captions near the bottom of the frame.
best_for: [AI and tech news in 45-75 s, "how does X actually work" explainers, security and research findings, startup and product commentary, vertical Shorts and Reels]
not_for: [warm brand storytelling, children's content, data-heavy finance with many charts, slow emotional pieces]
needs_on_camera_person: true   # signature has presenter cutaways; a faceless variant is described in section 13 and works well
build_difficulty: medium
pace_wpm: "230 (Shorts), 184 (long)"
signature_moves: [Schematic build-on, State flip, Strike-through, Split-screen hook]
tested: false
tested_note: "works, but expect one extra feedback round"
references:
  - title: "OpenAI revealed its AI agents shared secrets through CPU cache timing. (Short)"
    url: https://www.youtube.com/shorts/Jmy2f5HQRgU
    timestamps: "0:00-0:01 split-screen hook (subject photo top with condensed caps 'OPENAI JUST REVEALED', presenter bottom); 0:01-0:03 scrolling OpenAI blog screenshot with captions over it; 0:04 'CPU / CACHE TIMING' kicker title over dark B-roll; 0:05-0:15 black schematic: monitor outline, two VM cards, agent dots, 'SECRET' bits, NETWORK and FILES lines crossed out; 0:16 presenter cutaway; 0:18-0:24 processor chip diagram with cache grid; 0:26-0:28 SLOW LOAD = 1 / FAST LOAD = 0 bars; 0:30-0:42 sender/receiver grid and load-time bar code; 0:44-0:46 two Sam Altman clips; 0:48-0:52 'TEST DIFFICULTY' slider and chip; 0:54 presenter close"
  - title: "We Tested the Best AI Model... It Got Banned (long-form, 23 min)"
    url: https://www.youtube.com/watch?v=A74hBNktkvs
    timestamps: "0:00 tweet screenshot; ~0:04 big title card on brand colour; ~0:12 and ~0:56 blog text with highlighted phrase; 0:20-1:40 talking head in a sci-fi spaceship set; ~0:36 benchmark chart screenshot; ~1:44-3:48 screen-recorded app demo with presenter webcam picture-in-picture on a pale lavender canvas; ~4:44 product UI screenshot"
---

# Varun Mayya Tech Short

## 1. The idea in one paragraph
Varun Mayya (about 1.18M YouTube subscribers; Indian tech founder and co-founder, with Achina Mayya, of the Aevy TV channel) built one of the most copied short-form formats in Indian tech content: a 45-75 second Short that takes one surprising piece of tech news and explains how it actually works. The look is deliberately austere. Most of the runtime is pure black with thin white line diagrams that look like engineering schematics or a sci-fi HUD, building one element per spoken phrase, so the viewer feels they are watching the mechanism, not a stock-footage collage. That restraint is punctuated by three "proof" elements: a split-screen hook with a bold condensed headline, a real screenshot of the source (blog post, tweet, paper) scrolling, and brief clips of the presenter or the people involved. It suits curious 18-35 year-old viewers who want to sound informed about AI and tech, and it trusts them with a real technical idea (cache timing, token pricing) explained in plain words. Long-form videos (20-75 min) are a different, slower format: a talking head in a designed set with screenshots and screen-recorded demos. For our 30-90 s pipeline, the Short is the target.

## 2. Narration
- **Voice:** Male, mid-30s feel, Indian-English accent, conversational and quick, curious rather than hyped. Sounds like a smart friend telling you something wild he just read. Little vocal drama; energy comes from speed and from "here's the cool part" turns.
- **Pace:** Measured from YouTube auto-subtitles. Short Jmy2f5HQRgU: 213 words in 55.5 s = **230 wpm** with no pause longer than 1.5 s. Long-form A74hBNktkvs (first 6 min): 1,105 words, 184 wpm gross, 217 wpm with pauses removed (the long-form has thinking pauses; the Short has none). Target 210-230 wpm for Shorts.
- **Sentence shape:** 8-20 words, plain verbs, one technical term per beat immediately glossed ("every processor has something called a cache. It's basically a tiny memory that makes accessing data quicker"). Signature turns: "But it's the how that makes it so fascinating." "See, ..." "Now, imagine if..." "And just like that..." Ends with a measured caveat plus an opinion ("it's completely possible that OpenAI made these tests easier... but the fact that... is just too interesting to ignore").
- **Structure habits:** (1) News hook in the first 2 s, stated as a fact with the actor's name ("OpenAI just revealed..."). (2) Setup of the experiment or event (10-15 s). (3) "But the how..." turn into the mechanism, explained in 3-5 steps, each step a diagram beat (25-35 s). (4) Caveat and takeaway (8-10 s). No intro, no "hey guys", no subscribe ask inside the Short.
- **HyperFrames TTS pick:** `am_michael` at speed 1.20-1.25 (Kokoro grade C+, the steadiest male American voice in our list; it stays intelligible when sped up). Generate one paragraph, measure words/seconds, and adjust speed to land at 210-225 wpm; above 1.3 Kokoro starts to slur. Female alternative: `af_heart` at 1.20. None of our approved Kokoro voices has an Indian accent; Kokoro also ships Hindi voices (`hf_alpha`, `hf_beta`, `hm_omega`, `hm_psi`) but they are not on our approved list and were not tested for English. Write the script for the voice: keep sentences short so the speed-up does not blur them.

## 3. Visual system
- **Palette** (sampled from the Short; the schematic frames are about 74% pure black by pixel area):
  - `#080808` background (near-black; use `#000000` for vertical exports where OLED black reads best)
  - `#FFFFFF` primary line and fill (diagram strokes, filled squares, dots, captions)
  - `#9A9A9A` secondary grey (inactive cells, second agent dot, dimmed bars)
  - `#3A3A3A` hairline grey (grid lines, inactive outlines, scanline rules)
  - `#181818` panel fill (subtle card backgrounds)
  - `#B9C6FF` soft link blue (only inside real screenshots, e.g. the OpenAI blog link colour; never add it to diagrams)
  - Long-form only: `#CBD8F0` pale lavender canvas behind screen recordings with a picture-in-picture webcam; `#CC6D5A` terracotta title card (that one was Anthropic's brand colour for the topic, so take the title-card colour from the topic's brand).
- **Typography** (1080x1920 vertical; multiply by 0.56 for 1920x1080):
  - Captions: **Inter** 700, 40-44 px, tracking -0.02em, white, no stroke, sentence case, 1 line of 1-3 words. On footage, a soft `rgba(0,0,0,0.55)` rounded pill (radius 8 px, padding 4x10 px) sits behind the caption.
  - Hook headline: **Anton** (closest free match to the tight heavy condensed grotesk used) 120-150 px, all caps, white, line-height 0.9, 2 lines max ("OPENAI JUST / REVEALED"), placed on the lower edge of the top half.
  - Kicker above a title: **Instrument Serif** italic 48-56 px, white ("CPU" above "CACHE TIMING").
  - Diagram labels: **JetBrains Mono** 500, 16-20 px, all caps, tracking 0.12-0.18em, `#9A9A9A` ("TWO ISOLATED VIRTUAL MACHINES", "AGENT A", "VM 01", "PUSHES DATA OUT OF THE CACHE").
  - Big binary or key numbers in diagrams: **Inter** 300, 160-200 px, white ("1", "0").
- **Backgrounds and texture:** Flat black. No grain, no gradient, no vignette. Occasionally a full-bleed dark B-roll still (server rack, data centre) under a title, graded down to about 40% brightness.
- **Illustration / imagery:** Monoline white SVG "technical drawings": rounded-rectangle cards with title bars (three dots "..." top-left, "VM 01" top-right), CPU chips with pin teeth, 6x6 cache grids of squares, slider tracks with a white knob, analogue gauge dials, bar-code-like timing bars, crossed-out connection lines (an "X" glyph), document icons. Stroke 2 px at 1080 wide, corner radius 10-14 px, nothing filled except the active element. Real imagery appears only as (a) source screenshots, (b) short clips or photos of the named people, (c) presenter cutaways.
- **Layout:** 9:16. Diagram block centred in the upper-middle (y 380-1100 px), caption line fixed at about 74% of frame height (y ~1420 px), leaving the lower 25% clear for platform UI. Safe side margin 60 px. One diagram per beat; each beat adds one element to the existing diagram rather than replacing it. Density: a frame has at most one diagram, one label row and one caption.

## 4. Motion language
- **Signature moves:**
  1. **Schematic build-on:** each new diagram element appears on the spoken word that names it. Outlines draw with `stroke-dashoffset` (0.35-0.5 s, `power2.out`); fills and dots pop with `scale 0 to 1` (0.2 s, `back.out(1.7)`); labels type on in mono at 40 characters/s or fade in 0.15 s. Elements already on screen stay in place within a beat, but keep ticking (cells flip, dots pulse) and change shape when the diagram moves on.
  2. **State flip:** a grid cell, bit or bar switches between white and grey in a staggered sequence (each 0.06-0.1 s, `steps(1)` or `none`), like data moving. Use this for "pushing data out of the cache"-type beats.
  3. **Strike-through:** a connection line draws, then an "X" glyph pops on it (0.15 s, `back.out(2)`) and the line dims to `#3A3A3A`: the visual "you can't use network or files".
  4. **Split-screen hook:** frame 0 already shows both halves: top half a photo or clip of the subject, bottom half the presenter; the condensed headline slams in word by word (each word `scale 1.15 to 1`, `opacity 0 to 1`, 0.12 s, `power3.out`, 0.08 s stagger). Hold 1.0-1.5 s, then hard cut.
  5. **Screenshot scroll:** the real source page fills the frame and scrolls upward at constant speed (60-120 px/s, ease `none`) while the captions run over it; key phrase gets a low-opacity highlight.
- **Transitions between scenes:** Hard cuts only between *worlds* (footage, screenshot, presenter, black). Inside the black world, diagrams almost never cut: the outgoing diagram **transforms into** the next one (monitor splits into two VM cards, a dot grows into a chip, the chip zooms through its own cache grid into bars, bars burst into particles that settle into the next grid). See 4b. (Corrected 2026-10-30: the first audit said "hard cuts only" and "elements stay put".)
- **Camera:** Diagrams sit centred but the frame is never frozen: something flips, fills, scrolls or ticks every 0.4-1.2 s. Presenter cutaways are handheld-feeling medium close-ups with constant hand gestures. Long-form screenshots always drift, scroll or push in (1.00-1.10), and the long-form talking head alternates two framings (medium-wide and a tighter punch-in) every 4-8 s.
- **Text reveals:** Captions swap whole groups (no per-word colour karaoke), appearing instantly, 1-3 words per group, swapping every 0.4-0.8 s in sync with speech. Diagram labels type on. Big numbers roll up into place through a mask (the "0" at 0:29.6 rises from below) rather than counting. Title words stack one at a time (0:03.6-0:04.8). Letters scramble-decode into a word for reveals ("SE5SI" to "SECRET", 0:43.2-0:44.0).

## 4a. Motion, measured
Measured 2026-10-30 with `templates/motion_metrics.py` (12 fps, 320x180 grey, a frame "moves" if mean change > 0.02). The Short is the target format; the long-form is listed because it is the channel's other format.

| Clip | moving_frames_pct | still_time_pct | holds_1s_per_min | holds_2s_per_min | hard cuts/min (scene > 0.3) |
|---|---|---|---|---|---|
| Short Jmy2f5HQRgU, whole 56 s (≈ 90% graphics, presenter 1.6 s) | **94.3** | 5.7 | **0.0** | **0.0** | 8.6 |
| Long-form A74hBNktkvs, whole 23 min | 95.1 | 4.9 | 0.4 | 0.0 | 4.8 (8.8 in first 6 min) |
| Long-form 20:10-21:10 (report slides with webcam picture-in-picture) | 77.7 | 22.0 | 1.0 | 0.0 | 1 |
| Long-form 12:00-13:00 (screen-recorded game demo) | 99.7 | 0.3 | 0.0 | 0.0 | 0 |
| Dalio "Principles" (for comparison) | 75.3 | 24.7 | 4.5 | 0.8 | n/a |

**What it means:** the Short never stops moving: not a single 1-second still in 56 s, even though it has only 8 hard cuts, because every diagram keeps flipping, filling or transforming. Even the long-form's slowest section (static report slides held 8-14 s) stays at 78% moving only because the webcam picture-in-picture keeps the presenter alive in the corner. (Camera footage of a person always reads as "moving"; use the graphics numbers as the target for a faceless build.)

Evidence kept in `research/varun-mayya/recheck/`: `strip_short_0m00s.jpg`, `strip_short_0m24s.jpg`, `strip_long_0m00s.jpg`, `strip_long_1m40s.jpg`, `strip_long_6m00s.jpg`, `strip_long_20m10s.jpg` (2.5 fps), `overview_10s.jpg`, `*_metrics.json`, `*_cuts_0.3.txt`.

## 4b. Motion rules
1. **Something changes every 0.4-1.2 s, and nothing is ever still for 1 s.** In the Short's schematic stretch (0:05-0:16) a new part lands on almost every 0.4 s frame of the strip: monitor outline draws (0:05.2), "ONE COMPUTER" label types (0:06.4), agent dots pop (0:07.2), secret bits appear (0:10.4), dotted arrow (0:11.2), X glyph (0:11.6), network slider (0:12.8), file icon (0:14.0), shared-cache chip (0:15.2). Between spoken beats, cache cells keep flipping (0:22.8-0:26.4).
2. **Diagrams transform into the next diagram instead of cutting.** Monitor rectangle splits down the middle into two VM cards (0:08.0-0:08.8); a speck becomes a white square, then grows pins into the CPU chip (0:18.8-0:19.6); the chip zooms through its cache grid and resolves into the SLOW/FAST load bars (0:26.8-0:27.2); the bars burst into flying white particles that settle as the sender grid (0:31.6-0:32.4); load-time bars produce a binary row whose letters scramble into "SECRET" (0:42.4-0:44.0).
3. **Build data like a process, not a picture.** Bars grow one at a time left to right (0:38.0-0:39.6); a stopwatch hand sweeps while a list of times ticks in beside it (0:35.6-0:37.6); "1" and "0" roll up into place through a mask (0:28.4, 0:29.6).
4. **The presenter is always performing.** Hands never rest: palms pressed together, then opened outward on "the how" (Short 0:16.8-0:18.4); in long-form, continuous two-hand shaping gestures, a hand to the face, a lean back (6:00-6:17). The long-form cuts between a medium-wide and a tighter framing every 4-8 s (6:08.4 tighter, 6:14.8 wider again) so the talking head itself has rhythm.
5. **Proof never sits still either.** The source page scrolls under captions (0:01.2-0:03.6); long-form tweets slowly zoom (0:01.6-0:03.2), then the camera zooms *through* the tweet's image into a full-frame title card (0:03.6-0:05.2); a highlight sweeps across a sentence (0:15.2-0:16.0); a benchmark table pushes in to one cell, "17.4%" (6:18.0-6:21.6).
6. **The hook is two moving halves plus a two-step headline.** Top half is a moving clip of the subject, bottom half the presenter gesturing; "OPENAI JUST" then "REVEALED" slams in under it (0:00.0-0:00.8). Hard cut out at 1.1 s.
7. **Titles stack word by word over moving B-roll.** Italic "CPU" over a slowly pushing server-rack shot, then "CACHE", then "CACHE TIMING", then italic "DIFFERENCES!" (0:03.6-0:04.8), about 0.4 s per step.
8. **Long-form demos keep the presenter in the corner.** Screen recordings sit on a pale lavender canvas with a webcam picture-in-picture (about 18% width) on the right edge (1:42-1:47, 1:54-2:04, 20:10-20:33); that small moving face is what keeps long static slides alive.

## 4c. Characters and casting
- **Presenter's role in the original:** the face of the hook (bottom half of the split screen), a 1-2 s reaction every 15-20 s ("the how... makes it so fascinating"), and the opinion at the end. Screen share about 3% in the Short (the on-camera host of this Short appears to be a different person from the long-form presenter; the channel uses more than one host for Shorts) and about 45% full-frame in the long-form (counted from a 10 s contact sheet), plus the webcam picture-in-picture during most demos.
- **Other people:** short clips of the newsmakers (three different Sam Altman clips, about 1.2 s each, 0:44.4-0:47.6). The schematic itself has no people: "agents" are white dots.
- **Faceless version (free), in order of preference:**
  1. **Illustrated host from Open Peeps (CC0, no credit needed, commercial OK).** Use the bust bodies ("Explaining", "Pointing Up", "Device") and standing poses from our rig in `casting/` (`op_rig.mjs`, `cast_op.mjs`), but **invert the ink to white strokes on black** so the host is drawn in the same monoline language as the schematics. One fixed head and face set; swap pose every 0.5-1 s with a small settle, nod the head layer, swap faces for reactions (surprised on the hook, raised brow on "but the how"). Use it for the hook's bottom half and the 1-2 s reaction beats only.
  2. **Newsmaker beats:** press-kit photos or Wikimedia Commons images (check each file's licence, often CC BY or CC BY-SA, credit as required) with a slow push-in and a caption pill; never a still without motion. Or redraw the person as a white monoline portrait.
  3. **Kicker B-roll:** Pexels Video (Pexels License: free for commercial use, no attribution; do not resell unaltered clips or imply endorsement by identifiable people) or Pixabay video (Pixabay Content License: same terms in practice). Grade to about 40% brightness and keep a slow push-in.
  4. **Proof:** your own screen recordings of the real source page (Playwright scripted scroll). Show the source; for a brand video, prefer pages you are quoting with the source visible.
- Humaaans (CC0 on humaaans.com; credit "Humaaans by Pablo Stanley, CC BY 4.0" to be safe) are flat-colour and side-view only, so they fit this black-and-white style badly; use Open Peeps.
- **Voice:** Kokoro has no Indian-English voice. `am_michael` at 1.20-1.25 gets the pace but not the accent. Kokoro also ships Hindi voices (`hf_alpha`, `hf_beta`, `hm_omega`, `hm_psi`) that are untested for English; try one on a paragraph before relying on it.

## 4d. Text rules
- **Captions (Short):** always on, Inter 700, 40-44 px at 1080x1920, white, sentence case, **1-3 words per group, swapping every 0.4-0.8 s**, fixed at about 74% of frame height so they never jump. On footage or screenshots, a 55% black rounded pill behind them. No per-word colour karaoke. Long-form has **no** burned-in captions.
- **Callouts and labels:** JetBrains Mono caps, small and grey, typed on beside the part they name ("TWO ISOLATED VIRTUAL MACHINES", "PUSHES DATA OUT OF THE CACHE"). At most one label row per diagram.
- **Titles:** condensed caps headline (Anton) for the hook, italic serif kicker plus caps title stacked word by word for concept names, always over moving footage.
- **Text-only scenes: not allowed.** Every frame with words also has a moving diagram, footage or screenshot. The nearest thing, the "SECRET" decode, sits under the load-time bars.

## 5. Scene grammar
| Scene type | Purpose | Typical length | Layout | Motion | Narration during it |
|---|---|---|---|---|---|
| Split-screen hook | Who did what, instantly | 1.0-2.0 s | Top half subject photo/clip, bottom half presenter (or a second image); condensed caps headline at the seam | Words slam in, hard cut out | "OpenAI just revealed..." |
| Source screenshot scroll | Proof that it is real | 2-5 s | Full-bleed screenshot of blog/tweet/paper, caption over it | Constant upward scroll, optional highlight | Restates the claim in plain words |
| Kicker title | Names the concept | 1-1.5 s | Dim B-roll, italic serif kicker + condensed caps title mid-frame | Fade or instant | Says the concept name |
| Schematic build | Explains the mechanism step by step | 3-12 s per diagram, new element every 0.4-1.2 s | Black, centred monoline diagram, mono labels, caption at 74% | Draw-on, pop, state flips, strike-through; exits by transforming into the next diagram | Walks through the steps ("one agent started pushing...") |
| Big-number contrast | Reduce the idea to a binary | 2-4 s | Two labelled bars left, huge "1"/"0" right | Bars fill, numbers pop | "a slow load means one and a fast load means zero" |
| People clip | Human face of the story | 1-2 s each, 1-2 in a row | Full-bleed photo/clip of the CEO/researcher | Hard cut, caption pill on top | Caveat or quote |
| Presenter cutaway | Reaction, opinion, rhythm break | 1-2 s, every 15-20 s | Medium close-up, caption pill | Camera static, presenter gesturing with both hands throughout | "But it's the how that makes it so fascinating" |

## 6. Data and numbers
Numbers are shown as schematic objects, not charts with axes: horizontal bars labelled SLOW LOAD / FAST LOAD, a column of bar-code bars labelled LOAD TIMES with a 0/1 row underneath, a slider from HARD to EASY, a gauge dial. One number per beat, white on black, labelled in small mono caps. When the source has a real chart (benchmarks), show the screenshot of it rather than redrawing it. Huge single digits in Inter Light are the emphasis device.

## 7. Sound
- **Music:** Minimal electronic / ambient tech bed: pulsing synth, soft arpeggio, light glitchy percussion, 110-130 BPM. Music is present in the Short (the auto-subtitles tag "[music]" several times across the 56 s) but sits well under the voice. It does not drop out; it rides constant. An automated tempo estimate from the low-frequency band was inconclusive (confidence 0.11, roughly 130 BPM), so treat the BPM as a guide.
- **Sound effects:** Very light UI sounds synced to diagram events: soft clicks for each pop (`kit:sfx/click-ui-02.mp3`), a short data-glitch for state flips (`kit:sfx/glitch-ui-02.mp3`), a quiet whoosh on the hook cut. About one SFX every 2-4 s, never on every element.
- **Mix:** Voice at about -14 LUFS integrated for Shorts; music at -24 to -28 dB under the voice, with ducking 4-6 dB while speech is present; SFX at -18 to -22 dB.

## 8. Pacing
- Short Jmy2f5HQRgU (56 s): ffmpeg scene detection found 8 hard cuts at threshold 0.3 (avg shot 6.2 s), but that undercounts because diagram beats happen inside one black frame. On the 2.5 fps re-check strip (2026-10-30), a new visual event (element added, state flip, label, transform) happens every **0.4-1.2 s** (the first audit's 1 fps strip said 1.5-2.5 s, which missed most of them), and captions change every 0.4-0.8 s. No still stretch reaches 1 s (section 4a).
- Long-form A74hBNktkvs (first 6 min): 53 cuts at 0.3 (8.8/min, avg 6.7 s); 73 at 0.15.
- A number or key diagram state holds 2-4 s. Whole Short: 45-75 s. Presenter on screen about 15-20% of the Short.

## 9. Assets needed and where to get them
- **Diagrams:** all drawn in code (`code:svg`): cards, chips, grids, sliders, gauges. Build a small icon-part library once.
- **Source screenshots:** capture the real page yourself (browser full-page screenshot, or Playwright). This is the "proof" layer and should be real.
- **People photos/clips:** press-kit photos or Wikimedia Commons (check licence); avoid copying YouTube footage you do not have rights to. Faceless fallback: a mono-line portrait outline or a name card.
- **B-roll stills for kicker titles:** Pexels/Pixabay (free licences) or Openverse via `/media-use`, graded dark.
- **Music:** free ambient-electronic beds from the sources in `assets/sources.md` (Pixabay Music, YouTube Audio Library, Free Music Archive CC0/CC BY).
- **SFX:** `assets/starter-kit/sfx/` (click-ui-02, glitch-ui-02, whoosh-quick-01, pop-01).
- **Fonts:** Inter, Anton, Instrument Serif, JetBrains Mono (all Google Fonts).

## 10. HyperFrames build recipe
- **Canvas:** 1080x1920 at 30 fps for the Short (the HyperFrames default is 1920x1080; set it explicitly). For 16:9, use the long-form recipe below.
- **Layer order (bottom to top):** black background, B-roll or screenshot layer, diagram SVG layer, presenter video layer (only during cutaways), caption layer, hook headline layer.
- **Diagram component:** build each diagram as one inline SVG with every part given an id and `data-beat` attribute. One GSAP timeline per diagram; add each part at its word time from the transcript (`npx hyperframes transcribe` on the TTS file, or Kokoro's own timings). Draw outlines with `stroke-dasharray`/`stroke-dashoffset` (set dasharray to `getTotalLength()`). Use `vector-effect: non-scaling-stroke` so lines stay 2 px when scaled.
- **Reusable parts to build once:** `vm-card(title, label)`, `cpu-chip(pins, label)`, `bit-grid(rows, cols)`, `timing-bars(values)`, `slider(min,max,value)`, `gauge(value)`, `strike-x()`, `mono-label(text)`. These cover most tech explainers.
- **Registry blocks** (search with `npx hyperframes catalog --query ...`): `svg-line-draw-loader` and `telemetry-hud` as starting points for the HUD look; `count-up` / `number-pop-in` for numbers; `code-typing` or `terminal-simulator` when the story involves code; `browser-device-stage` or `scroll-feed` for the screenshot scroll; `caption-pill-karaoke` restyled with no colour change as the caption base.
- **Captions:** one captions host with `data-track-kind="captions"`; groups of 2-3 words; Inter 700 42 px; full-width container, `text-align:center`, top at 1400 px; hard kill at each group end (see the hyperframes captions reference). Over footage add the 55% black pill.
- **Hook:** two stacked 1080x960 boxes; headline in Anton straddling the seam. If no presenter, put a second image or a big mono-line icon in the bottom half.
- **Long-form 16:9 variant:** presenter full frame alternating with screenshots; for demos, the screen recording sits at about 75% width on the left of a `#CBD8F0` canvas with a 16:9 webcam box (about 18% width, radius 12 px) on the right edge.
- **Pitfalls:** keep the diagrams sparse (Varun's beats rarely show more than 6-8 parts); do not colour the diagrams; do not animate everything at once; never let captions jump vertically between groups.

## 11. Storyboard frame spec
Each frame must specify:
- `beat_type`: hook / screenshot / kicker / schematic / number / people / presenter
- `diagram_parts_added`: list of part ids and the word each one lands on
- `labels`: mono caps label text
- `caption_groups`: 2-3 word groups with start/end times
- `screenshot`: URL and the phrase to highlight, scroll speed
- `headline`: hook text (max 4 words, caps) and kicker word
- `presenter`: yes/no (and if faceless, the substitute)
- `sfx`: click / glitch / whoosh with timestamp
- `duration` in seconds

## 12. Do and don't
**Do**
- Open on the actor and the verb in under 2 s ("OpenAI just revealed...").
- Show the real source page early as proof.
- Build the diagram one element per phrase, in the order the narration explains it.
- Keep diagrams white on black with mono caps labels.
- Gloss every technical term in the very next sentence.
- End on a caveat plus a one-line opinion.

**Don't**
- Don't add colour accents, gradients or glows to the schematics.
- Don't use big karaoke captions or emoji; captions are small and quiet.
- Don't fill frames with stock footage; the diagram is the star.
- Don't add an intro, logo sting or subscribe ask.
- Don't hold any visual state longer than about 1 s in a Short; a "held" diagram still needs flipping cells, a ticking label or a drift.
- Don't hard-cut from one diagram to the next; transform it (split, grow, zoom through, burst).
- Don't let the narration drop below about 200 wpm in a Short.

## 13. Feasibility with our stack
- **Reproduces well (high fidelity, 85-90%):** the black monoline schematic system, mono labels, number contrasts, screenshot scrolls, the hook headline, the caption style. All of it is SVG + GSAP and suits HyperFrames well. This is the part fans recognise most.
- **Medium, and the part most likely to be missed: the motion density (re-checked 2026-10-30).** The original is 94% moving with zero 1-second stills. Hitting that means every diagram needs a "between beats" animation (cells flipping, a scan line, a ticking label, slow drift) and every diagram change needs a transform (split, grow, zoom-through, particle burst) rather than a cut. All of it is doable in SVG + GSAP (MorphSVG is free since GSAP 3.13; particle bursts are seeded SVG circles), but it roughly doubles authoring time per diagram. Expect 80-85% motion fidelity on the first pass; check with `motion_metrics.py` against section 14.
- **Hard: the presenter.** The real format cuts to a gesturing host for 1-2 s every 15-20 s and uses him in the hook. Options:
  1. **Faceless variant (recommended, free):** an Open Peeps illustrated host inverted to white-on-black monoline, posed and pose-swapped every 0.5-1 s (section 4c), for the hook and the reaction beats; newsmaker photos with a push-in. A static "reaction card" or keyword card is **not** enough (that is what made our Dalio rebuild feel dead). Expect about 50-60% fidelity on the presenter beats themselves; they are only 3-5% of a Short, so overall impact is small.
  2. **Self-filmed:** the user records 3-5 phone selfie clips (medium close-up, plain or bookshelf background, window light) saying the hook and the opinion lines; captions and diagrams are added in HyperFrames. `npx hyperframes remove-background` can cut him out if needed.
  3. **AI avatar:** a HeyGen avatar via `/media-use` (`resolve --type video`) for the 2-3 presenter beats. There is a free allowance for new or signed-in users; beyond that it is paid HeyGen usage. It looks generic and the voice will not match Kokoro unless you feed the Kokoro audio in, so keep avatar beats short.
- **Hard: Indian-English voice.** No approved Kokoro voice has an Indian accent; `am_michael` at 1.2 gives the pace but not the accent. Fidelity of "sound" is about 60%.
- **Hard: people footage.** Real clips of CEOs are copyrighted; use stills from press kits or Wikimedia Commons, or drop the beat.
- **Overall fidelity estimate:** about 75% faceless (lowered from 80%: the transform-heavy motion is more work than the first audit assumed), about 85-90% with self-filmed cutaways.
- **Long-form 16:9 variant:** mostly a filmed presenter in a designed set plus screen recordings with a webcam picture-in-picture. Without a real person this variant does not reproduce well (about 50%); use the Short format instead.

## 14. Self-check targets
For a faceless 30-90 s vertical Short. Measure the whole render with `templates/motion_metrics.py`; count hard cuts with ffmpeg scene detection at 0.3.

```yaml
style: varun-mayya
format: short-9x16
moving_frames_pct_min: 90          # original Short 94.3
holds_1s_per_min_max: 0.5          # original 0.0
holds_2s_per_min_max: 0.0          # original 0.0
cuts_per_min: [6, 14]              # hard cuts at scene > 0.3; original 8.6 (diagram changes are transforms, not cuts)
text_only_scenes_allowed: false
characters_required: true          # a gesturing host (filmed or Open Peeps posed) in the hook and every 15-20 s
colour_source: brand               # schematics stay white-on-black; brand colour only on the hook title card
style_checks:
  - "In any 2 s window of the schematic section, at least two snapshots 0.4 s apart differ (a part added, a cell flipped, a label typed)."
  - "Each change from one diagram to the next shows an in-between snapshot (split, grow, zoom-through or particle burst), not a straight cut from one finished diagram to another."
  - "Captions are 1-3 words, at the same height in every snapshot, and the host (or illustrated host) is in a different pose in snapshots 1 s apart."
```
