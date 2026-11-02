---
id: whiteboard-sketch
name: "Whiteboard Sketch (RSA Animate)"
one_line: A hand with a black marker draws cartoons, arrows and capital-letter notes on a white board in sped-up time, in step with a speaker's voice, with a few key words in red, and the camera follows the hand across one huge, growing drawing.
best_for: [ideas and arguments, talks and lectures, business and psychology concepts, education, three-reasons-why structures, internal training]
not_for: [data-heavy pieces with real charts, glossy product launches, geography that needs accurate maps, anything that needs photos]
needs_on_camera_person: false
build_difficulty: medium
pace_wpm: "157"
signature_moves: [Write-on with hand, Hand enter/exit, Camera slide to fresh board, Red emphasis]
tested: false
tested_note: "works, but expect one extra feedback round"
references:
  - title: "RSA ANIMATE: Drive: The surprising truth about what motivates us (Royal Society of Arts)"
    url: https://www.youtube.com/watch?v=u6XAPnuFjJc
    timestamps: "0:00-0:10 'RSAnimate' logo hand-written in orange; 0:12-0:30 caricature of the speaker + 'Our motivations are unbelievably interesting'; 0:30-0:40 'It's a little bit FREAKY!' red word; 0:40-0:55 two book pages '1 If you REWARD something...' '2 If you PUNISH...' with red keywords; 0:45-0:53 globe sketch 'London' to 'Cambridge MA' with red dashed route; 0:55-1:10 MIT building and challenge icons; 1:12-1:30 '3 levels of REWARD' podium drawn with stars and money; 1:30-1:40 camera pan to fresh board; 3:00-3:40 '3 factors lead to better performance... AUTONOMY'; 8:24 wide pull-back of a dense finished board; 10:12-10:30 'PURPOSE' giant outline letters; 10:28-10:38 'And make the world a little bit better!' written in red, then held about 6 s with the hand out (no final pull-back), then the studio logo. Re-checked 2026-10-30 with 2.5 fps strips of 0:12-0:36, 3:00-3:24, 3:50-4:14 and 10:20-10:44 (research/whiteboard-sketch/recheck/)"
---

# Whiteboard Sketch (RSA Animate)

## 1. The idea in one paragraph
A whiteboard explainer makes an argument feel like it is being worked out live. A real hand draws quick, funny cartoons and capital-letter notes in black marker on a white board, sped up so it keeps pace with a talk. Red marks the words that matter. The camera moves across one big board, so by the end the whole talk is a single map of ideas, and the final pull-back shows it all. It works because watching a drawing appear holds attention, and the doodles turn abstract claims into memorable pictures. The audience is learners, teams and anyone watching a "big idea" talk who would not sit through the 40-minute lecture.

## 2. Narration
- **Voice:** In the RSA Animates the audio is an edited recording of a live lecture (Dan Pink here), not a studio voice-over. It sounds like a confident, engaging speaker addressing a room: varied pitch, humour, emphasis by volume and pace, natural "um"-free edits.
- **Pace:** 157 wpm measured from the human-made English subtitles of u6XAPnuFjJc (1,632 words over 623 s). Per-minute range 131-184 wpm. Lots of short pauses (146 gaps over 2.5 s between caption starts), which give the hand time to draw.
- **Sentence shape:** Talk-like. Direct address ("I want to tell you about that"), storytelling about studies ("They took a whole group of students and gave them a set of challenges"), punchy reversals ("Here's what they found out"), lists of three, and colloquial jokes. Medium-length sentences with clear pauses between ideas.
- **Structure habits:** Hook claim ("The science is really surprising"), then studies or examples, a reveal that contradicts the common belief, then a framework (often three factors), then a call to action at the end. Signposting out loud ("I want to give you two...").
- **HyperFrames TTS pick:** `bm_george` at speed 0.95-1.0 gives the British "lecture at a London institution" feel and a relaxed talk delivery (grade C in Kokoro's VOICES.md). For a warmer, more natural read, `af_heart` at 0.98 (grade A) is the safest quality choice. Write the script like a talk (first person, contractions, asides), not like an essay. Target 150-160 wpm; leave a 0.4-0.8 s pause between ideas so the drawing can finish.

## 3. Visual system
- **Palette** (sampled from frames of u6XAPnuFjJc; the source is 520x294 so values are approximate):
  - `#F7F8F0` board white (slightly warm, unevenly lit: `#F5F6ED` to `#EAEBE1` towards the edges)
  - `#151515` marker black (all lines and most text)
  - `#D7321F` marker red (measured `#CA3F29` after compression; use a slightly brighter value) for keywords, numbers and arrows that carry the point
  - `#E26A3D` orange-red for the series logo only
  - `#9A9A90` soft grey for the shadow of the hand and board vignette
  - Hand skin tones come from the hand image (measured `#A4773F` to `#825621` in this video)
  Rule: black does 90%+ of the work; red is used for at most 1-3 words or marks per board area. No fills except small solid black areas and red dots.
- **Typography:** Hand-lettered all-caps, condensed, slightly uneven baseline, mixed sizes for emphasis (big red key word, small black supporting notes). Free fonts if you cannot draw strokes:
  - Notes: **Patrick Hand SC** or **Architects Daughter**, 36-48 px caps.
  - Big emphasis words: **Permanent Marker**, 90-140 px, red.
  - Outlined giant word (like "PURPOSE"): draw letter outlines as paths; **Cabin Sketch** 700 is a free outline-ish fallback.
  - For true write-on animation you need single-stroke paths: **Relief SingleLine** (OFL) or Hershey fonts converted to SVG paths.
- **Backgrounds and texture:** One continuous white board, lit slightly brighter in the centre (radial vignette 4-8% darker at edges). No grid. Faint ghost marks are optional.
- **Illustration / imagery:** Quick cartoon doodles: big-nosed caricature people, stick-ish bodies with proper hands and shoes, simple objects (books, buildings, money bags, light bulbs, globes), arrows, boxes, podiums, speech bubbles. Line weight about 4-6 px at 1080p, rounded caps, a bit of wobble. Light cross-hatching for shadow. Text and drawings interlock and fill the board densely by the end.
- **Layout:** The visible frame shows about one sixth to one tenth of the full board. Each "station" is drawn in the frame, then the camera moves to empty board next to it. Text blocks are left-aligned, 2-5 lines, next to the drawing that illustrates them. Keep a 60 px margin from the frame edges while drawing; after the pan, older drawings are visible at the edges, which shows continuity.

## 4. Motion language
- **Signature moves:**
  1. **Write-on with hand:** each stroke draws along its path (`stroke-dashoffset`), and a hand-with-marker image follows the tip of the stroke being drawn. Speed: text writes at about 6-8 characters per second (in the reference, the line "Our motivations are unbelievably interesting" was about 13 characters in at 0:15, about 30 at 0:17.5 and finished by 0:20), cartoons at 150-400 px of line per second. Ease per stroke: `none` (constant speed) or `power1.inOut`; brief 0.05-0.15 s gaps between strokes where the hand lifts and moves.
  2. **Hand stays in:** the hand is in frame almost all the time (it is visible in about 120 of 130 samples of a 0.2 fps overview of the whole video). Between strokes and between stations it lifts and travels to the next spot; it does not leave. It enters from the bottom-right or from the top (3:02), 0.25-0.4 s, `power2.out`. It leaves the frame only at 2-3 big beats per video (0:17-0:26 after the opening caricature; 10:32-10:38 on the closing line), so a clean, hand-free board is a rare event, not a per-station habit. (Corrected: our first analysis said the hand left after every station.)
  3. **Camera slide to fresh board:** a fast pan or diagonal move to blank board (0.5-1.0 s, `power2.inOut`), sometimes with a slight scale change. In the reference, 36 scene changes in 10:48 (3.3 per minute) are mostly these moves; median time per station 10.5 s, mean 18 s.
  4. **Red emphasis:** the key word is written last in a station, in red, bigger; or a red arrow, circle or underline is added after the black drawing (0.3-0.6 s draw).
  5. **Wide reveal:** now and then the camera pulls back to show a dense stretch of the board (around 8:20-8:45), 2-4 s, then pushes back in to where the hand is. The reference does **not** end on a pull-back: it ends on the closing red line (10:28-10:38), then the logo. A final pull-back is our optional addition, not part of the style. (Corrected.)
- **Transitions between scenes:** There are no scene changes inside a chapter, only camera moves on the same board. The 36 "cuts" that scene detection finds (3.3 per minute) are mostly jump reframes on the same board: close-up of the building to a wide of the same board (3:14.4), wide to close-up (3:03). A truly new board is rare.
- **Camera:** Never locked (corrected). It drifts with the hand, panning 5-15% of the frame width as the writing moves right (0:15), and reframes every 3-6 s: a push in to the word being written (0:26.4), a pull out to show context (0:29, 3:14.4). It also moves between stations.
- **Text reveals:** Always written on, never faded. Numbers are written like text, often in red ("3 LEVELS OF REWARD").

## 4a. Motion, measured
Measured on 2026-10-30 with `templates/motion_metrics.py` on u6XAPnuFjJc (520x294, 10:48). Files: `research/whiteboard-sketch/recheck/motion_*.json`, cuts in `cuts_0.3.txt`.

| Measure | Whole video | 60 s section (3:00-4:00) | Dalio, for reference |
|---|---|---|---|
| moving_frames_pct | 97.9 | 100.0 | 75.3 |
| still_time_pct | 2.1 | 0.0 | 24.7 |
| holds_1s_per_min | 0.3 | 0.0 | 4.5 |
| holds_2s_per_min | 0.1 | 0.0 | 0.8 |
| big_change_pct | 84.8 | 89.2 | - |
| cuts per minute (ffmpeg scene > 0.3) | 3.3 | 7 | - |

**What it means:** the hand is drawing in practically every frame; the picture is almost never still. **Caveat:** this is a filmed board, so camera and compression noise sits at 0.03-0.08 even when nothing moves (measured during the hand-free hold at 0:17-0:26), just above the tool's 0.02 threshold. Re-measured at a 0.1 threshold: 93.5% moving, 6.5% still, 0.5 holds of 2 s per minute. Our renders have no noise, so 93.5 is the honest target, not 97.9.

## 4b. Motion rules
1. **The hand is always drawing.** At least 90% of frames show a stroke growing or the hand travelling to the next stroke. Clean holds happen only at 2-3 big beats per video (0:17-0:26 after the opening caricature; 10:32-10:38 on the closing line).
2. **One world per chapter.** Everything is drawn on one big board; new space is reached by panning or reframing, never by cutting to a new scene. Older drawings stay visible at the frame edges (the wide at 3:14.4 still shows the building, the banknote and the speech bubbles from the previous 30 s).
3. **The camera follows the hand.** It drifts as the writing moves (0:15), and reframes every 3-6 s: push in on the word being written (0:26.4), pull out for context (0:29, 3:14.4). Jump reframes on the same board are fine, 2-7 per minute.
4. **Build order per station: structure, labels, actors, reaction, red verdict.** 3:50-4:09: steps drawn with "2 WEEKS / 1 MONTHS / 2 MONTHS SALARY", then a boy and a woman on the steps, a red double arrow and the bubble "YOU DID NO BETTER", then a man on the top step who explodes ("YAAAA", debris), then red "HIGHER INCENTIVES LED TO WORSE PERFORMANCE" with a red dashed outline, then "THIS ISN'T THAT ANOMALOUS".
5. **Characters act by being added to, never by moving.** The pose is the action (crawling after a carrot 0:12-0:14, arms crossed 3:16, arms flung up 3:57); the reaction is drawn on afterwards: motion lines, debris, shouted words ("YAAAA" 3:58-4:00), speech bubbles ("LET'S TEST OUR FINDINGS SOMEWHERE ELSE" 3:08-3:12, "FIFTY DOLLARS?" 3:19). No pose swaps, no tweening a drawn figure.
6. **Text is written while it is spoken.** "OUR MOTIVATIONS ARE UNBELIEVABLY INTERESTING" is written 0:13-0:17 as it is said; "AND MAKE THE WORLD A LITTLE BIT BETTER!" 10:28-10:32. The red word is written last or as its own line ("FREAKY!" 0:30).
7. **Nothing transforms once drawn.** Objects never morph into the next object: the next thing is drawn beside it, and arrows or red lines link them (Federal Reserve building, then the woman with the banknote, then a map of India drawn beside them, 3:06-3:24).

## 4c. Characters and casting
- **Who appears:** quick cartoon people drawn on in 2-4 s each: the speaker caricature (0:12-0:14), study subjects (students, rural-India participants 3:50-4:00), bosses, a crawling man chasing a carrot on a stick (the DRIVE metaphor). About 5-7 new figures per minute plus 2-3 speech bubbles per minute. Big noses, simple bodies, real hands and shoes.
- **The real performer is the hand:** always present, seen in three poses: writing grip; open, spread palm while reaching (3:11); marker held away while travelling.
- **How they act:** each figure is drawn once in the pose that is the action, then reaction marks and bubbles are added. They never move after being drawn.
- **Free sources for our pipeline:**
  - People: **Open Peeps** (CC0, no credit needed, scripted download allowed): ink line art, 23 standing and 11 sitting poses, and our rig in `casting/` (`library/`, `_tools/cast_op.mjs`). Use the black ink only, with no colour fills, on white. Pick the pose that is the action for each beat; never swap poses on screen.
  - Scene doodles: **Open Doodles** (CC0, ink doodles, scripted download allowed; one pose each, weak for roles).
  - Both are filled outline shapes, not single strokes, so `stroke-dashoffset` cannot draw them. Reveal them with a mask that grows along the outline behind the hand, or trace centrelines once and store them as stroke paths.
  - Props and icons: Tabler Icons (MIT) line icons as stroke paths, or our own SVG.
  - Hand: a photo of our own hand holding a marker on white, cut out locally (no licence question), in the three poses above. Fallback: a Pexels or Pixabay photo (free licences, no attribution; read the terms before use).
  - Not a fit: Humaaans (flat fills, no ink line), LottieFiles (fixed loops, commercial terms ambiguous), Storyset and unDraw (no scripted download, flat style).

## 4d. Text rules
- **Amount:** heavy. Nearly every station has 1-5 lines of hand-lettered caps, and written text is roughly half of all ink on the board. Max about 8 words per line, written at 6-8 characters per second while spoken.
- **Where:** beside the doodle it explains, left-aligned, 2-5 lines; the key word in the accent colour (red in the reference, the brand accent for us), usually bigger.
- **Text-only:** a line may be written before its doodle appears (3:00-3:02 "3 FACTORS LEAD TO BETTER PERFORMANCE...", the icons follow), and the closing line may stand alone (10:28-10:38). Otherwise no station ends as text only: every claim gets a doodle.

## 5. Scene grammar
| Scene type | Purpose | Typical length | Layout | Motion | Narration during it |
|---|---|---|---|---|---|
| Title write | Brand or title | 4-8 s | Centered title on clean board | Hand writes title; logo can be in colour | Silence or intro line |
| Speaker caricature | Introduce the voice | 4-6 s | Caricature top-left, name in caps | Draw-on, red name | "I want to tell you about..." |
| Claim note | State a claim | 3-6 s | 2-4 lines of caps text beside a small doodle | Write-on; key word in red | The claim |
| Study story | Narrate an experiment | 8-20 s | Building/place icon, people doodles, labels | Draw in narrative order | "They took a whole group of students..." |
| Comparison | Two options or results | 6-12 s | Two boxes/pages side by side, numbered 1 and 2 | Draw left then right; red keywords | "If you reward... if you punish..." |
| Build-up diagram | Levels, steps, podium | 6-12 s | Steps or podium with labels, stars, money | Draw structure, then items step by step | Explains levels |
| Journey | Move location | 4-8 s | Globe or map sketch with red dashed route | Circle, rough continents, dashed route | "Let's go from London to..." |
| Framework reveal | The 3 factors | 10-30 s | Heading + three big words revealed over time | Big red word per factor, icon next to it | Names each factor |
| Giant word | Climax | 4-8 s | One huge outlined word | Outline drawn letter by letter | The key concept |
| Closing line | End | 6-10 s | Red closing line beside the last doodle | Written on, then the hand leaves and the board holds about 6 s (optional pull-back) | Final line |

## 6. Data and numbers
- Numbers are hand-written, often in red, and usually the biggest thing in their station ("3 LEVELS", "2 WEEKS SALARY").
- Charts are sketched, not plotted: a rough bar or podium, a simple up/down arrow, a hand-drawn line with an arrowhead. Labels on bars are small caps.
- Comparisons use side-by-side drawings (podium heights, two piles of money) rather than axes.
- Accuracy is symbolic; if a value matters, write the number next to the doodle.

## 7. Sound
- **Music:** None in the reference. Measured on u6XAPnuFjJc: gaps between sentences sit at about -56 dBFS (near silence), and integrated loudness is a quiet -25.2 LUFS with the voice alone. Modern commercial whiteboard explainers often add a light acoustic or ukulele bed; if you add one, keep it very low and simple (90-110 BPM, light acoustic or pizzicato).
- **Sound effects:** The reference has none audible. Many modern versions add a subtle marker squeak or scribble loop while drawing. Optional; if used, keep it at -25 dB under the voice and only during drawing.
- **Mix:** Voice is everything. Normalise voice to -16 LUFS for web delivery (the reference is quieter than today's norms). If music is used, -24 to -28 dB under the voice, no swells.

## 8. Pacing
- One station every 10-18 s (median 10.5 s, mean 18 s in the reference), with continuous drawing inside it, so the screen changes every second even when the camera does not.
- The hand usually does not leave between stations; it travels to the next spot while the camera reframes. Clean holds (hand out of frame) happen 2-3 times per video, at big beats, and last 3-9 s.
- The full reference is 10:48 condensed from a much longer lecture. For a 30-90 s version: 4-7 stations, one red-emphasis framework, one giant word, a closing red line held 2-3 s (pull-back optional). Script around 80-220 words.

## 9. Assets needed and where to get them
- **Hand holding a marker:** the most important asset. Options: (1) a CC0 or free-licence cut-out from Pixabay/Pexels/Openverse (search "hand holding marker", check the licence, cut out with `rembg`); (2) a still photo of your own hand holding a marker on a white background (a photo, not on-camera filming); (3) a simple flat vector hand (looks less authentic). Use 2-3 hand poses (writing, pointing, open) if available.
- **Doodles:** draw as SVG paths. Sources of line-art to trace or adapt: Open Doodles and Open Peeps (CC0, by Pablo Stanley), SVG Repo line icons (check licence), Tabler Icons (MIT) for simple objects. Convert filled icons to strokes where possible; drawing-on needs stroked paths.
- **Single-line fonts:** Relief SingleLine (OFL), Hershey fonts (public domain) converted to SVG paths.
- **Board texture:** generate a soft radial vignette in CSS; no texture file needed.
- **Music/SFX (optional):** see assets/sources.md (freesound.org CC0 "marker on whiteboard" loops).

## 10. HyperFrames build recipe
- **Canvas:** one large board composition (for example 7680x4320, 4x the frame) holding all stations at fixed positions. The visible frame is a `.camera` wrapper animated with `x/y/scale`. This gives the real "one big board" feel and a correct pull-back at the end.
- **Stroke data:** every drawable element is an SVG `<path>` with `fill: none; stroke: #151515; stroke-width: 5; stroke-linecap: round; stroke-linejoin: round`. Precompute `getTotalLength()` per path at build time and store it as a data attribute.
- **Draw scheduler (build once):** a function `drawStation(tl, paths, startTime, speedPxPerSec)` that lays out tweens in order: each path gets `duration = length / speed`, `ease: "none"`, a 0.08 s gap between paths. It returns the end time. Text paths use a faster speed so writing lands near 6-8 characters per second (speed up to 10 for long notes so the drawing never trails the voice by more than about 2 s).
- **Hand follower:** one `<img>` of the hand whose pen tip offset is known (e.g. tip at 12% x, 8% y of the image). On each path tween's `onUpdate`, read `path.getPointAtLength(progress * L)` and set the hand position (transform it from board space to screen space through the camera). This is seek-safe because it derives from tween progress. Add a 2-3 px seeded jitter for life. Between paths, tween the hand to the next start point in the gap time.
- **Registry:** `npx hyperframes add whiteboard-ink` (draws one stroke at a time while a pen nib follows the tip; replace the nib with the hand image) and `hw-arrow`, `hw-box-label`, `hw-callout-circle` for hand-drawn arrows, boxes and circles; `hw-boil` adds line jitter if you want a livelier line; `pan-stations` is a reference for moving between stations with dwell.
- **Red emphasis:** separate path group with `stroke: #D7321F`, drawn last in each station.
- **Camera moves:** two layers. (1) Follow: ease the camera towards the hand's board position, derived from the same tween progress that drives the hand (seek-safe) and smoothed with a fixed lag of about 0.4 s, clamped to 5-15% of the frame. (2) Reframes: every 3-6 s a push in or pull out, `tl.to(camera, {x, y, scale, duration: 0.6-0.8, ease: "power2.inOut"})`, or a jump reframe (instant `set`) on a beat, 2-7 per minute. Optional final `tl.to(camera, {scale: 0.25, x: 0, y: 0, duration: 4, ease: "power2.inOut"})`.
- **Pitfalls:** fonts cannot be drawn on stroke by stroke; outline fonts revealed by a left-to-right mask look like a wipe, not writing. Use single-line fonts or traced paths for text that should write on. Large boards with hundreds of paths slow the renderer; set `display: none` (or `visibility: hidden`) on stations far from the camera. Make sure the hand never covers the key word at the moment it is spoken.

## 11. Storyboard frame spec
1. Station number, board position (x, y on the big board) and duration.
2. Narration lines for the station, with the word that triggers the red emphasis.
3. Drawing list in draw order: each doodle (asset or description), each text block (exact caps text), which items are red.
4. Drawing speed (normal / fast) and when the hand exits.
5. Camera move to this station (direction, duration) and any scale change.
6. Optional SFX (marker squeak) and music state.
7. For the final station: the closing line, the planned hand-out hold (about 6 s) and an optional pull-back.

## 12. Do and don't
**Do**
- Keep everything on one big board and move the camera, so ideas connect.
- Draw in the order the narration mentions things.
- Use red sparingly: one key word or mark per station.
- Keep the hand in frame and moving; let it leave only at 2-3 big beats.
- Let the camera follow the hand and reframe every 3-6 s.
- End on the closing line in red (a pull-back is optional; the reference does not use one).
- Write the script like a spoken talk with clear pauses.

**Don't**
- Don't fade in text or drawings; everything is written or drawn on.
- Don't use colour fills, gradients or photos.
- Don't draw so slowly that the drawing lags the narration by more than about 2 s.
- Don't fill a station with long sentences; 2-5 short caps lines at most.
- Don't use a cartoon hand if a real-looking hand cut-out is available; the real hand is a big part of the charm.
- Don't add busy music or many SFX.
- Don't cut to a new scene inside a chapter; reach new space by moving the camera on the same board.
- Don't pose-swap, slide or tween a drawn character; characters act through what is drawn next to them.

## 13. Feasibility with our stack
- **Reproduces well:** stroke-by-stroke drawing, the follower hand, the big board with camera moves and pull-back, red emphasis, the pacing. SVG `stroke-dashoffset` and `getPointAtLength` in GSAP are a natural fit, and the registry already has whiteboard and hand-drawn pieces.
- **Hard:**
  - *Doodle quality and wit.* The RSA drawings are by skilled illustrators and are funny. Our doodles will be simpler. Workaround: lean on clear icons and good captions; adapt CC0 line art (Open Doodles, Open Peeps) rather than inventing faces.
  - *Hand-lettering.* Real handwriting varies; a single-line font repeats letter shapes exactly. Workaround: apply a small seeded random rotation (±2 degrees) and baseline offset (±3 px) per letter, and use two alternates per letter if the font has them.
  - *Converting filled icons to strokes.* Many free icons are filled shapes, which do not draw on well. Workaround: prefer line-icon sets (Tabler) or trace centre-lines; otherwise reveal filled shapes with a moving mask that follows the hand.
  - *Hand asset licensing.* Workaround: one photo of your own hand on white, cut out locally.
  - *Render load* with hundreds of paths on a huge board. Workaround: hide off-screen stations; flatten finished stations into a cached PNG if needed.
  - *Keeping the hand moving 90%+ of the time.* First builds tend to draw a station and then wait. Workaround: schedule strokes back to back across the whole narration, move the hand to the next start during gaps, and let the camera follow and reframe; plan only 2-3 holds per video.
  - *Drawing characters on.* Open Peeps and Open Doodles are filled outlines; a mask that follows the hand along the outline looks close to drawing; centreline tracing looks best but costs about 5-10 minutes per figure.
  - *Characters cannot act by moving* in this medium, so acting must be written into the storyboard as added marks (bubbles, motion lines, red arrows). Cheap once planned.
- **Fidelity estimate:** 65-75% overall (was 70-80%). The board, write-on text, follow camera and pacing can reach 80%+; the drawn people (wit and line quality) and the real hand are the gap.

## 14. Self-check targets
Measure a render with `python templates/motion_metrics.py render.mp4 --json out.json` and count cuts with ffmpeg scene detection (> 0.3). A reviewer checks the sentences from snapshots taken every 2 s.

```yaml
style: whiteboard-sketch
moving_frames_pct_min: 90        # reference 97.9 (93.5 without camera noise)
holds_2s_per_min_max: 0.6        # reference 0.1 (0.5 without noise); only planned big-beat holds
cuts_per_min: [2, 7]             # jump reframes on the same board, not new scenes
text_only_scenes_allowed: false  # exceptions: a line written just before its doodle, and the closing line
characters_required: true        # drawn people, about 5-7 per minute
colour_source: "brand"           # black ink on white; the brand accent replaces the red
checks:
  - "The hand is visible in at least 9 of every 10 snapshots, and every snapshot within a chapter shows the same board (older drawings at the edges), never a new scene."
  - "Every station has at least one drawn character or doodle that acts out the line, plus a reaction mark or speech bubble; no character changes pose or slides after it is drawn."
  - "Each station ends with one key word or verdict in the accent colour, and the framing differs between snapshots 4-6 s apart (the camera follows and reframes)."
```
