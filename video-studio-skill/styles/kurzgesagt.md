---
id: kurzgesagt
name: "Kurzgesagt-style Flat Science"
one_line: Bright, saturated flat-vector worlds that never stop moving gently, glowing particles on deep purple and navy, cute rounded characters and creatures, and a calm, optimistic narrator explaining big science one picture at a time.
best_for: [science and nature explainers, space, biology, what-if questions, big-number scale comparisons, philosophy-lite, health explainers]
not_for: [breaking news, data-dense finance, product demos, anything that needs real photos or real people]
needs_on_camera_person: false
build_difficulty: hard
pace_wpm: "168"
signature_moves: [Always-alive idle, Scale dive (zoom-through), Pill label pop, Glow pulse]
tested: false
tested_note: "works, but expect one extra feedback round"
references:
  - title: "Why Are There No Holes Around Trees? (Kurzgesagt – In a Nutshell)"
    url: https://www.youtube.com/watch?v=pHJIhxZEoxg
    timestamps: "0:00-0:07 forest establishing shot with sun glare; 0:07-0:13 split screen tree vs 10 blue whales with pill labels; 0:20-0:30 tree on desert hill (sunset gradient sky); 0:45 title card 'How to eat air to grow huge' in a particle swirl; 0:47 CO2 molecule with pill labels 'Carbon'/'Oxygen'; 0:50-0:55 glowing silhouettes of animals on navy; 0:57 '~1.5 Billion Years Ago' time label; 1:00-1:07 eukaryotic cell inside rounded-rectangle window; 1:10-1:13 'Global Biomass' circles 82%/13%/2%/0.4% on orange; 1:15-1:30 bird and fox character acting with blurred background; 1:35 '1 t Carbon' cube on purple isometric grid; 2:31 split screen 'Human Skin' vs 'Leaf'; 2:50 cross-section 'Spongy Mesophyll' with glow; 6:37 nutrient icons with pills; 8:30 mushroom species on hex grid; 9:46+ sponsor segment (ignore)"
  - title: "How to Make a Kurzgesagt Video in 1200 Hours (process, transcript via LingQ) and kurzgesagt.org/youtube"
    url: https://kurzgesagt.org/youtube/
    timestamps: "process notes only: about 200 illustrated panels per video in Adobe Illustrator, animation by hand in After Effects with rigged characters, original score by Epic Mountain, narration by Steve Taylor"
---

# Kurzgesagt-style Flat Science

## 1. The idea in one paragraph
Kurzgesagt turns hard science into a picture book you can't stop watching. Every idea gets a visual metaphor drawn as clean, rounded, flat vector shapes in candy-bright colours, lit with soft glows against deep purple and navy. Nothing on screen is ever fully still: leaves sway, particles drift, the camera glides from planet scale to cell scale in one move. The narrator is calm, curious and slightly funny, so scary or abstract topics feel safe. The viewer is a curious teenager or adult who wants wonder first and facts second, and who will rewatch for the art.

## 2. Narration
- **Voice:** One warm, friendly, mature male voice (Steve Taylor narrates every video; the studio describes his tone as blending "rationality and optimism"). Mid-low pitch, smooth, unhurried, with a smile in it. Dry jokes delivered straight.
- **Pace:** 168 wpm measured from auto-subtitles of pHJIhxZEoxg (1,861 words over 664 s). Per-minute range 149-183 wpm. It feels slower than Vox because sentences are shorter and there are frequent short pauses (91 gaps over 2.5 s between caption starts in 11 minutes).
- **Sentence shape:** Short declaratives mixed with playful asides. Many sentences under 12 words. Concrete comparisons for scale ("almost 2,000 tons, as much as 10 blue whales"; "25 stories into the sky"). Colloquial hedges ("well, they're made of stuff"). Questions that set up the next section ("How does this work?"). Uses "you" and "we" a lot. Jargon is introduced and immediately labelled on screen (a pill label appears with the term).
- **Structure habits:** Cold open with a paradox or startling fact (0:00-0:40), then a stated question and an on-screen title card inside the art (0:45 "How to eat air to grow huge"), then 3-5 chapters, each building one mechanism, often zooming down in scale. Ends on a wider, often hopeful or existential reflection. Sponsor segment at the end (skip).
- **HyperFrames TTS pick:** `am_michael` at speed 0.98-1.02. It is the warmest and best-graded American male Kokoro voice (C+ in Kokoro's VOICES.md) and suits the calm, friendly read. If you want a female narrator, `af_heart` at 1.0 (grade A) reads very naturally. `bm_george` at 0.98 works if you want a British documentary feel, but it moves away from the reference. Target 160-170 wpm. Insert explicit short pauses (a comma or a new sentence) before each reveal.

## 3. Visual system
- **Palette** (sampled from frames of pHJIhxZEoxg; accents are medians of the most saturated pixels per hue band across the whole video):
  - `#210940` deep purple background (night, underground, "science space"; 27% of the frame at 5:00)
  - `#08343F` deep teal-navy background (forest night, blurred backdrops)
  - `#172A99` electric navy (ocean, space)
  - `#3AC6E8` cyan (water, glows, light)
  - `#7A35D0` violet (mid-tone of purple scenes, pills)
  - `#FBD874` warm yellow (sun, highlights, sparkles)
  - `#F6922E` orange (desert, sunsets, charts)
  - `#DB1527` red (characters, accents)
  - `#AAE23D` lime leaf green with `#E9F027` leaf highlight
  - `#FFFFFF` label text
  Rule: dark, saturated background + bright, saturated subject + one glowing accent. Almost no greys.
- **Typography:** The studio's font is not documented anywhere I could find. On-screen labels are a bold, clean geometric sans with round shapes. Free stand-ins:
  - Pill labels: **Nunito** 800, 26-30 px, white, inside a rounded pill (radius 999 px, padding 6 px 22 px) filled with a saturated colour from the scene (pink `#E0368C`, violet `#7A35D0`, cyan, orange) and a 3-4 px darker outline of the same hue.
  - Title cards: **Montserrat** 800 caps, 72-96 px, tracking 0.12em, white with soft glow, often integrated into the scene (written in particles or stars).
  - Section/time labels: **Nunito** 700, 28 px, white on a soft translucent band at top-left ("~1.5 Billion Years Ago").
  - Chart numbers: **Montserrat** 800, 80-120 px inside circles.
- **Backgrounds and texture:** Layered flat shapes with soft linear and radial gradients (sky bands, glows), heavy background blur for depth (frame at 1:20: background `#08343F` blurred blobs, sharp foreground), subtle grain at most. Star fields and floating particles on dark scenes. Light rays and lens-glow on suns.
- **Illustration / imagery:** Flat vector, no outlines on objects, shapes built from rounded geometric primitives. Shading = one lighter "highlight" shape and one darker "shadow" shape per object (leaves: `#AAE23D` base, `#E9F027` highlight). Characters: simple round heads, big eyes, small limbs, birds as a running mascot. Cross-sections and cut-away views of organs, cells, planets. Occasional isometric grids for "abstract quantity" scenes (1 t Carbon cube on a glowing purple grid).
- **Layout:** Centred, symmetrical compositions with one hero object. Labels attached by a short leader line with a dot. Split screens with a diagonal or vertical divider for comparisons (tree vs whales). Rounded-rectangle "windows" (radius about 120 px, 8 px violet border) to show a zoomed-in inset. Safe margin 120 px; text is sparse (1-4 words per label).

## 4. Motion language
- **Signature moves:**
  1. **Always-alive idle:** every scene has 3+ looping micro-motions: leaves rotate ±3 degrees, creatures bob y ±6-10 px, particles drift upward 40-80 px and fade. Loops of 2.5-4 s, `sine.inOut`, `yoyo: true`, phases offset per object so nothing moves in sync.
  2. **Scale dive (zoom-through):** camera pushes into an object until it fills the frame and the next scene (one scale smaller) is revealed inside it: scale 1 to 6-12 over 1.2-1.8 s, `power2.inOut` (or `expo.inOut` for dramatic dives), crossfade in the last 0.3 s.
  3. **Pill label pop:** the pill scales from 0 to 1 with `back.out(1.7)` in 0.3 s, a leader line draws to the object in 0.25 s (`power2.out`) and the dot at its end pops. *(Added after the recheck.)* The text then types into the widening pill letter by letter, with letter-spacing closing up as it lands (2:40 "Leaf", 2:43 "Cuticle", 6:06 "Phosphorus"): about 0.4-0.6 s per word. Labels leave with a 0.2 s scale-down (`power2.in`) when the next layer lights up.
  4. **Glow pulse:** glows (radial gradient discs, blurred copies) breathe opacity 0.6 to 1 and scale 1 to 1.08 over 1.5-2 s, `sine.inOut`, yoyo.
  5. **Character acting:** rigged parts rotate from pivot points (head tilt 8-12 degrees, wing flap 30 degrees in 0.15 s), blinks every 2-4 s (eye `scaleY 1 to 0.1 to 1` over 0.12 s), anticipation before big moves (`back.in(1.5)` 0.2 s then `power3.out`).
- **Transitions between scenes:** Mostly motivated camera moves (zoom-through, pan to an adjacent part of the same world, rack to a window inset) and **in-world transformations** (added after the recheck):
  - a sapling grows into a tree while the sky turns to sunset (0:22-0:26);
  - a forest goes from day to night (1:26-1:29);
  - a baobab fades into a purple silhouette (1:32-1:33);
  - nutrient icons dissolve into particles that settle into the soil (6:10-6:11);
  - a root turns into an X-ray view (6:37-6:38).

  Hard cuts are used for comparisons and jokes. Measured scene changes: 62 in 11:20, 5.5 per minute, median 8.3 s (re-measured: 61, or 5.6/min without the sponsor). Most "scenes" contain continuous camera moves, and 6:20-6:44 has none.
- **Camera:** Constant slow drift (scale 1.00 to 1.04 or a 40-80 px pan over the scene, `none` or `sine.inOut`), parallax between 3-5 depth layers (background 0.3x, mid 1x, foreground 1.6x), and depth-of-field blur on far layers (4-12 px).
- **Text reveals:** Labels pop as pills, and their text types in. Title cards assemble from particles or fade in with a glow bloom (opacity 0 to 1 plus blur 12 px to 0 over 0.6 s, `power2.out`). *(Corrected.)* Numbers do **not** count up: each circle grows, then its number pops in whole (82%, 13%, 2%, 0.4% at 1:11-1:13).

## 4a. Motion, measured
Measured on 2026-10-30 with `templates/motion_metrics.py` on a 480p download of pHJIhxZEoxg (12 samples/s, change threshold 0.02). Cuts are frames with an ffmpeg scene score above 0.3. Files: `research/kurzgesagt/recheck/`.

| Measure | Whole video (11:20) | 0:00-9:45 (no sponsor) | 60 s section 1:10-2:10 | Dalio reference |
|---|---|---|---|---|
| moving_frames_pct | 97.5 | 97.6 | 100.0 | 75.3 |
| still_time_pct | 2.5 | 2.4 | 0.0 | 24.7 |
| holds_1s_per_min | 0.3 | 0.3 | 0.0 | 4.5 |
| holds_2s_per_min | 0.0 | 0.0 | 0.0 | 0.8 |
| big_change_pct | 63.7 | 65.6 | 70.7 | n/a |
| cuts per minute | 5.4 | 5.6 | 6 | n/a |

What it means: the picture never stops. There is not a single 2 s hold in 11 minutes, and even "static" data frames such as the biomass circles (1:11-1:14) drift. Two thirds of frames contain a big change (a camera move, transformation or entrance), so motion is the style's baseline, not decoration.

## 4b. Motion rules
1. **One continuous world per chapter; the camera travels through it.** In 6:20-6:44 (0 cuts) the shot goes from a root network, dissolves into one root tip (6:21) and dives into its cross-section ("Gravity-Sensing Cells", 6:25-6:33). It then pulls back out to the root (6:34), the root turns into an X-ray view with "Water Sensing" and "Temperature" pills (6:37-6:40), and the background becomes drifting gradient fields (6:42). Cuts jump to another spot in the same world or to a comparison. They are not the main way to change scenes.
2. **Nothing is ever still. Run at least 3 independent loops per frame:**
   - whales keep swimming across the split screen (0:10-0:13);
   - glowing particles drift over the night forest (1:27-1:29);
   - statoliths settle inside the gravity-sensing cells (6:29-6:33);
   - a light beam sweeps through the leaf block (2:49-2:51).

   Under the loops, the camera never stops drifting.
3. **Objects transform into the next object, and time passes inside the frame.** A watered sapling grows into a full tree while the sky goes from blue to sunset (0:22-0:26). The forest goes from day to night (1:26-1:29). Three nutrient icons dissolve into particles that sprinkle into the soil layers, then the camera pans up to roots growing down (6:10-6:18). Prefer a transformation to a cut whenever the next idea is "the same thing, later, or smaller".
4. **Characters perform in chains and enter from the edge of the frame.** A caterpillar sits on a leaf (1:14). A bird enters from the right and eats it (1:17-1:19). The camera pulls back as a fox enters and eats the bird (1:20-1:22). That is a new action every 1.5-2 s, and no pose is held longer than 2 s. Humans are tiny figures doing one verb in the landscape: one waters the sapling (0:19-0:22) and walkers cross behind the growing tree (0:24-0:29).
5. **The exploded-view build: one hero object, taken apart for 15-20 s.** The leaf block stays on screen from 2:42 to 3:02. A glow outline runs around one layer at a time. The cuticle lifts off as a translucent sheet (2:45-2:47), a light beam passes through (2:49-2:51) and an inset window pops up for "Chloroplast" (2:54-2:57). Each step has its own pill, a new event arrives every 2-3 s, and the camera keeps drifting.
6. **Labels arrive on the spoken word and leave when the next one comes.** Pills type in (section 4, move 3) with a leader line to their object. At most 3 are on screen at once (Phosphorus, Nitrogen, Potassium, 6:07-6:10).
7. **Numbers pop in whole; they don't count.** Circles grow and their numbers appear complete (1:11-1:13). The number does its work for 3-5 s while the textures inside the circles keep drifting.

## 4c. Characters and casting
- **Who appears:** no presenter and no photos.
  - *Animals and creatures carry the acting:* the caterpillar, bird and fox chain (1:14-1:22), plus fungi and roots that behave like creatures later on.
  - *Humans are small scale-props in the landscape:* the gardener and walkers (0:19-0:29), and a person reading under a tree (about 5:12).
  - The sponsor section uses the channel's bird mascots. Don't copy them.
- **How they act:** they enter from a frame edge, do one verb (eat, water, walk, read), react, then leave or get eaten. Each beat lasts 1.5-3 s. The camera reframes to bring in the next actor rather than cutting to it. Rigged details sit on top: blinks, head tilts, wing flaps (section 4, move 5).
- **Free sources for our pipeline:**
  - *Best fit: a custom SVG rig written in code.* Build creatures and one or two people from circles, rounded rectangles and blobs, with no outlines and one highlight and one shadow shape each. Give head, arms, legs and wings their own `<g>` with a pivot. There is no licence question because we draw it, and it is the only way to get the Kurzgesagt silhouette. Budget 3-5 characters per video.
  - *People: Humaaans pieces* (head, body and legs). humaaans.com says CC0, but the 2019 GitHub mirror ships CC BY 4.0, so credit "Illustrations: Humaaans by Pablo Stanley (humaaans.com), CC BY 4.0" to be safe. They are commercial-use OK, flat-filled with no outlines, and trivial to recolour. Our rig already composes and recolours them (`casting/_tools/cast_hu.mjs`, candidates in `casting/library/`). They are side-view only and face right, so mirror them for left. Use them small (5-15% of frame height), as in the reference.
  - *Creature starting shapes:* Microsoft Fluent Emoji "Flat" (MIT: commercial use OK, keep the licence notice) or Noto Emoji images (Apache 2.0). Use them as shape references or starting SVGs, then restyle to the palette with highlight and shadow shapes.
  - *Not a fit:* Open Peeps and Kenney Toon Characters (ink outlines, wrong look); OpenMoji (CC BY-SA, outlined); unDraw and Storyset (scripted download banned, different style).
  - *LottieFiles flat animations:* commercial use is ambiguous between their licence and their terms (see `casting.md`). Use them only after written confirmation, and download by hand.
  - Never copy Kurzgesagt's bird or any of its characters.

## 4d. Text rules
- Very little text. Pills hold 1-3 words, with at most 3 on screen. Data scenes add a small heading band at the top right ("Global Biomass", 1:11). A time label band appears when the era changes ("~1.5 Billion Years Ago", about 0:57).
- Chapter title cards are big glowing caps set inside the art: "How to eat air to grow huge" (0:45), "PHOTO-SYNTHESIS" (about 4:00), "THE UNDERGROUND EMPIRE" (about 5:18). Use one per chapter, on screen for 2-4 s, always with particles or illustration moving behind.
- Numbers are big inside or beside their object (section 6) and appear whole.
- **Text-only scenes: not allowed.** Even title cards sit in a moving world. No sentences on screen and no bullet lists.

## 5. Scene grammar
| Scene type | Purpose | Typical length | Layout | Motion | Narration during it |
|---|---|---|---|---|---|
| Establishing world | Set the mood and subject | 4-8 s | Full-bleed landscape, 4-5 parallax layers, light source | Slow pan or push, idle loops, sun glow | Startling fact |
| Scale comparison split | Make a big number feel physical | 4-6 s | Two panels with a diagonal divider, pill label each side | Second panel wipes in along the divider (0.5 s `power3.out`), pills pop | "...as much as 10 blue whales" |
| Title card in the world | Name the question | 2-4 s | Words centred, made of or surrounded by particles | Particle swirl converges, glow bloom | Reads the question |
| Labelled mechanism | Explain one process | 6-12 s | Hero object centred on dark backdrop, 2-4 pills | Pills pop in sequence, arrows/particles flow along paths | Explains step by step |
| Window inset | Zoom into a detail without leaving the scene | 4-8 s | Rounded-rect window over a blurred scene | Window scales from a point (0.5 s `back.out(1.2)`), content inside idles | "Inside each cell..." |
| Scale dive | Go down (or up) one level of scale | 1.2-2 s | Transition | Zoom-through | Bridge sentence |
| Character beat | Humour, relatability | 3-6 s | Character large, blurred background | Enters from the edge, one verb per 1.5-2 s, the next character enters as the camera pulls back (1:14-1:22); blinks, squash and stretch | Joke or aside |
| Growth / time-lapse | Show change over time without a cut | 3-6 s | Same framing; sky colour and light change | Object grows or morphs, sky gradient shifts, small figures move around it (0:19-0:29) | "Over decades..." |
| Quantity on a grid | Abstract amounts | 4-6 s | Isometric glowing grid, one object | Object drops in (`bounce.out` or `back.out`), grid glows | "One ton of carbon..." |
| Big-number circles | Compare shares | 4-8 s | Circles sized by value, numbers inside, pills under | Circles grow (`back.out(1.4)`) one by one, each number pops in whole after its circle; textures inside keep drifting | Reads the biggest number |
| Taxonomy grid | Show variety | 4-6 s | Hex or square grid of illustrated items with small labels | Items pop in with 0.05 s stagger | Lists a few |

## 6. Data and numbers
- Areas, not axes: shares shown as circles sized by value (Global Biomass: 82% plants, 13% bacteria, 2% fungi, 0.4% animals), physical objects stacked, or a single object compared with a familiar one (whales, football fields, stories of a building).
- Numbers sit inside or next to the object, big and bold (Montserrat 800, 100+ px), with a pill label naming the category.
- Time is given as a label band ("~1.5 Billion Years Ago") rather than a timeline axis.
- Charts with axes are rare; when needed, use thick rounded lines on a dark background with glowing end points.
- A number stays up 3-5 s and is usually spoken once.

## 7. Sound
- **Music:** An original score for every video by Epic Mountain (studio site). Orchestral-electronic hybrid: soft pads, plucked synths, celesta, piano, warm strings, swelling to emotional climaxes at chapter ends. Crude tempo estimate on the opening minute: about 84 BPM (low confidence, voice present). Treat 70-100 BPM, mostly ambient and pulse-light, as the range. Free substitutes: "ambient cinematic", "documentary wonder", "space ambient" categories on Pixabay Music or Free Music Archive.
- **Sound effects:** Dense and designed: every pop has a soft bubbly "bloop", glows have shimmer, particles have tiny chimes, camera dives have airy whooshes, creatures have small cartoon foley. The studio calls SFX "the icing on the cake" and recommends headphones. Expect an SFX every 1-3 s, mixed low.
- **Mix:** Measured on pHJIhxZEoxg: integrated -15.9 LUFS; in narration gaps the music/SFX sit about 6 dB below speech level (-25.4 vs -19.4 dBFS median per window), so the bed is never loud. Target: voice -16 LUFS, music -20 to -24 dB under voice, rising to -10 dB under in gaps; SFX -15 to -20 dB under voice, never masking words.

## 8. Pacing
- 5.5 hard scene changes per minute, median 8.3 s, but continuous motion inside each (97.6% moving frames, no 2 s holds; see 4a). A new visual idea (label, object, camera move, transformation) every 2-3 s.
- Pills stay 2-4 s. Numbers 3-5 s.
- Full videos 8-15 minutes. For a 30-90 s version: 6-10 scenes, at least one scale dive, one scale comparison, one window inset, one character beat, and a reflective last line over a wide shot.

## 9. Assets needed and where to get them
- **Illustrations:** this style needs custom art; no free library matches it. Options, best first:
  1. Author SVG directly in code: the style is made of circles, rounded rectangles, blobs and gradients, which an agent can write by hand. Build a small kit (tree, leaf, cell, planet, star field, bird character, molecule) and reuse it.
  2. Restyle free vectors: SVG Repo (check licence per file), Openmoji (CC BY-SA), unDraw (free licence, but recolour heavily and remove outlines).
  3. Lottie animations from LottieFiles free tier (check licence), recoloured.
- **Particles and glows:** generated in SVG/CSS (radial gradients, `filter: blur()`).
- **Isometric grids:** SVG pattern.
- **Music and SFX:** see assets/sources.md. Pixabay SFX "pop", "bubble", "whoosh soft", "chime"; freesound.org CC0 packs for cartoon foley.

## 10. HyperFrames build recipe
- **Layer order:** background gradient > far layer (blurred 8-12 px) > mid layer > hero object > glow layer (`mix-blend-mode: screen`) > particles > foreground layer (blurred 4-6 px, moves fastest) > labels and pills > title text.
- **Camera rig:** wrap all depth layers in a `.camera` div. Animate `.camera` scale/position for the shot, and give each layer an extra parallax offset proportional to its depth (`x: camX * depthFactor`). Registry: `npx hyperframes add parallax-zoom` and `zoom-through-transition` as starting points for the scale dive; `camera-rig-depth-stack` for depth ideas.
- **Idle loops seek-safe:** do not use CSS `@keyframes` or `repeat: -1` without bounds. Add each idle as a finite tween covering the scene length, e.g. `tl.to(leaf, {rotation: 3, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: Math.ceil(sceneDur / 1.6)}, 0)`. Seed per-object phase offsets from the object id.
- **Glow:** duplicate the shape, `filter: blur(24px)`, `opacity: 0.7`, `mix-blend-mode: screen`; or a radial-gradient disc. Keep blur radii small at 1080p for render speed.
- **Particles:** 40-120 small circles generated from a seeded PRNG at build time, each with its own finite drift tween. Registry `grain-field` / `godrays` / `sun-burst` can provide backgrounds; check render cost of shader blocks.
- **Pills:** component `Pill(text, color)`; rounded rect + 3 px darker border + Nunito 800. Leader line as an SVG path drawn with dashoffset.
- **Characters:** build as nested SVG groups with `transform-origin` at joints; animate rotations. Registry `lottie-character-walk` shows the Lottie-plus-GSAP pattern if you use a Lottie character.
- **Pitfalls:** heavy `filter: blur()` on many large layers slows rendering; pre-blur static backgrounds into PNGs. Keep saturation high but avoid pure `#FF0000`/`#00FF00`. Do not add outlines to shapes. Give every scene at least three independent idle motions, or it reads as a slideshow.

## 11. Storyboard frame spec
1. Scene type and duration.
2. Scale level (cosmic / planet / organism / cell / molecule) and the visual metaphor in one sentence.
3. Background colour pair (e.g. `#210940` to `#4D1290`) and light source position.
4. Depth layers: what is in far / mid / hero / foreground.
5. Idle motions (at least three) and the camera move.
6. Pills: text, colour, which object each points to, the narration word that triggers it.
7. Numbers on screen and how they are shown (circle, comparison object).
8. Transition out (scale dive into which object, cut, pan).
9. Narration line; SFX cues (pop, whoosh, chime); music state.

## 12. Do and don't
**Do**
- Find one visual metaphor per idea before drawing anything.
- Keep backgrounds dark and saturated, subjects bright, and add one glowing element.
- Label every new term with a pill the moment it is spoken.
- Keep something moving in every frame, with offset phases.
- Use scale dives to move between levels of explanation.
- Compare big numbers with familiar objects.

**Don't**
- Don't use photos, stock footage or realistic textures.
- Don't put outlines on shapes or use grey-heavy palettes.
- Don't fill the screen with text; 1-4 words per label.
- Don't make everything bounce; reserve `back.out` for pops and keep camera moves smooth.
- Don't copy Kurzgesagt's bird mascot, characters or logo; design your own mascot.
- Don't let the narration sound urgent or alarmist.
- Don't hold any frame still, even for a number or title card; a 2 s hold reads as broken in this style.
- Don't cut to "the same thing, later or smaller": grow, morph or dive into it instead.

## 13. Feasibility with our stack
- **Reproduces well:** palette, pills, glows, particles, parallax camera, scale dives, number circles, isometric grids, split-screen comparisons. HTML/SVG + GSAP handles these well.
- **Hard:**
  - *Illustration quality and volume.* Kurzgesagt draws about 200 panels per video with 2-3 illustrators over 8-12 weeks. An agent writing SVG by hand will produce simpler art. Workaround: keep scenes few and reuse a small, consistent kit; spend detail on the hero object; use blur and glow to hide simple backgrounds.
  - *Character animation.* Their characters are rigged and hand-animated, and they act in chains (enter, act, get replaced) every 1.5-2 s. Workaround: a few custom SVG rigs (4c) with pivoted parts, entrances from the frame edge, and one verb per beat. Bob, blink and a single gesture are not enough on their own. Expect about 40-50% fidelity on character beats.
  - *Constant motion.* The reference never holds still (97.6% moving), and the Dalio rebuild proved that our default builds sit near 50%. Every scene needs 3+ seeded idle loops, a camera drift for the whole scene, and at least one transformation per chapter. Idle loops and drift are cheap to generate procedurally. Transformations (growth, dissolve to particles, colour or lighting shifts) need SVG morphing: GSAP's MorphSVGPlugin is free since GSAP 3.13, and `flubber` (MIT) is an alternative. Budget extra time for them.
  - *Original score and dense sound design.* Free library music will be more generic. Workaround: choose ambient-cinematic tracks with a clear swell, and spend effort on SFX timing (pops on pills, whooshes on dives).
  - *Render cost.* Many blurred, blended layers are slow. Workaround: pre-render static blurred layers to PNG and keep live blur to small elements.
- **Fidelity estimate:** 50-65%. The palette, pills, constant motion and transformations will read as "Kurzgesagt-like" to a fan if the 4b rules are followed. The art density and character polish will not match. It is still the hardest style in this batch, and the motion targets in section 14 are the strictest.

## 14. Self-check targets
Run `python templates/motion_metrics.py render.mp4 --json out.json` on the finished render, count cuts with an ffmpeg scene score above 0.3, and check snapshots for the sentences below.

```yaml
style: kurzgesagt
reference: "pHJIhxZEoxg 0:00-9:45: 97.6% moving, 0.0 holds>=2s/min, 5.6 cuts/min"
moving_frames_pct_min: 92
holds_2s_per_min_max: 0.3
holds_1s_per_min_max: 1.0
longest_hold_s_max: 1.5
cuts_per_min: [3, 7]
text_only_scenes_allowed: false   # chapter titles must sit in moving art or particles
characters_required: true         # at least one character beat (creature or person acting) per 90 s
colour_source: brand              # every colour comes from the brand file (no photos or maps in this style)
checks:
  - "Any two snapshots 1 s apart differ, and every frame shows at least three independently moving things (idle loops, particles, camera drift)."
  - "Each chapter contains at least one in-world transformation (something grows, dissolves, morphs, or light/time changes) instead of a cut, and at least one camera dive or pull-back."
  - "In every character beat the character enters from a frame edge, does one action and reacts or leaves; no character holds the same pose for more than 2 s, and labels are 1-3 word pills that appear on the spoken word."
```
