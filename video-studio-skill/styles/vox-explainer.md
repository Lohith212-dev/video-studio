---
id: vox-explainer
name: "Vox Explainer"
one_line: A brisk, slightly wry narrator walks you through a question using charts that draw themselves, archival photos cut out and framed with coloured bars, and old newspaper headlines swiped with yellow highlighter, all on an off-white paper background.
best_for: [policy and history explainers, "how did X get so cheap/expensive", data-backed stories, economics, science-and-society, media literacy]
not_for: [hype product launches, pure entertainment, children's content, anything without a real source trail]
needs_on_camera_person: false
build_difficulty: medium
pace_wpm: "173"
signature_moves: [Highlighter swipe, Self-drawing chart line, Framed cut-out with offset bars, Callout box]
tested: false
tested_note: "works, but expect one extra feedback round"
references:
  - title: "How solar energy got so cheap (Vox, modern house style)"
    url: https://www.youtube.com/watch?v=V8Vtb0bn30M
    timestamps: "0:00-0:11 cold open with framed archival photo + green/teal offset bars; 0:22-0:35 line chart drawing on paper; 1:00-1:07 multi-line price chart draws; 1:07-1:12 archival newspaper headlines; 1:15-1:27 archival footage with name lower third; 1:28-1:40 dark slate 'Key milestones' chart with flag markers and teal callout; 1:53 framed interview with offset bars; 1:55-2:00 and 2:17-2:20 newspaper headlines with yellow highlighter; 2:54 'Feed-in tariffs' teal label; 3:05 flat icon illustration (Germany 2000); 4:22-4:43 loop diagram; 4:43 legal text highlighted; 5:27 final chart with highlighted 'Solar' label"
  - title: "Why all world maps are wrong (Vox 2016, Johnny Harris era)"
    url: https://www.youtube.com/watch?v=kIID5FDi2JQ
    timestamps: "0:00-0:35 presenter cold open with props (skip for us); 0:35-0:45 engraving portrait collage with maths diagram; 0:55 'Projection' black label box with white bold italic serif; 1:00-1:30 projection maps with motion-blur whip transitions and 'Here's the BIG problem:' type card; 1:40-2:20 Mercator map with archival engraving cut-out; 2:50-3:10 black land silhouettes on pale grid with yellow Tissot circles; 3:20 Gall-Peters"
---

# Vox Explainer

## 1. The idea in one paragraph
Vox videos feel like a smart friend with a stack of clippings on a desk. Every claim is shown with evidence: a chart that draws itself, a dated newspaper headline with the key words swiped in yellow highlighter, an archival photo cut out and pinned to the page with a coloured bar. The off-white paper background and the restrained palette (one green, one teal, one highlighter yellow) make it look like journalism, not advertising. It works for curious adults who want the "why" behind a news topic in 5-10 minutes and who trust a video more when they can see the source.

## 2. Narration
- **Voice:** Conversational, confident, a little wry. Mid pitch, sounds 25-40. Not a broadcast "announcer" voice; it is a reporter talking to one person. Emphasis lands on numbers and on the turn of the story ("but here's the problem").
- **Pace:** Measured from auto-subtitles: 173 words per minute (V8Vtb0bn30M, 1,068 words over 370 s) and 174 wpm (kIID5FDi2JQ, 1,043 words over 360 s). The first minute is slower (149-152 wpm) and the middle speeds up to 180-200 wpm. Short beats of silence (0.5-1.0 s) after a striking number.
- **Sentence shape:** Mostly 8-18 words, plain verbs, almost no jargon without a gloss. Rhetorical questions as section turns ("So how did solar energy go from prohibitively expensive to cheaper than fossil fuels?"). Second person used to make data personal ("if you were to put them on your roof... it would cost you $300,000"). Time-jump phrases: "The year is 1953." "Fast forward 70 years."
- **Structure habits:** Cold open with one vivid concrete fact and a date (0:00-0:30), then the big question spelled out, then a chronological or step-by-step walk with a recurring "home chart" that gains markers as the story goes (the "Key milestones" chart returns 6 times in the solar video), then the lesson for today. Sources are named on screen. In the modern style, short interview clips (expert on a video call) break up the narration every 30-60 s; for us these become quote cards.
- **HyperFrames TTS pick:** `af_heart` at speed 1.05-1.10. It is the only Kokoro voice graded A in Kokoro's own voice list (VOICES.md), it sounds warm and conversational rather than announcer-like, and it holds up over long reads. Second choice `am_michael` (grade C+) at 1.05 for a male read. Avoid `am_adam` (graded F+). Target 165-175 wpm in the final mix: render one paragraph, measure words / seconds, then adjust speed.

## 3. Visual system
- **Palette** (sampled from frames of V8Vtb0bn30M at 1:53 and 1:32, and accents measured across both videos):
  - `#F4F1F5` paper background (warm-cool off-white; the 2016 video sits at `#E4E4E4`-`#E0E0E3` light grey)
  - `#535154` slate chart panel (dark data cards)
  - `#1C1C1C` ink (text, black map silhouettes)
  - `#6DBC5D` Vox green (offset bar, positive line, "solar" line)
  - `#00B1BC` Vox teal (offset bar, callout boxes, labels)
  - `#F2E205` highlighter yellow (measured `#D9C903` under multiply on newsprint; use the brighter value with `mix-blend-mode: multiply`)
  - `#D4C9A8` newsprint tint for archival clippings
  - `#B1BBBC` muted grey for secondary chart lines and gridlines on dark panels
- **Typography:** vox.com launched with Balto (a gothic sans, Type Supply) and Harriet (a serif, Okay Type), per Fonts In Use / Typewolf. Both are commercial. The chart titles in the reference look like a heavy gothic sans and the axis numbers like a bold book serif, which fits that pairing. Free stand-ins:
  - Display / chart titles: **Libre Franklin** 800, 56-64 px, tracking -0.01em (closest free gothic to Balto).
  - Labels in boxes: **Libre Franklin** 700 caps, 26-30 px, tracking 0.04em, white on teal.
  - Axis numbers and dates: **Libre Baskerville** 700, 30-34 px (stand-in for Harriet).
  - Source lines and name subtitles: **Libre Baskerville** italic 400, 22-24 px, `#9A979B`.
  - 2016-era label boxes ("Projection"): **Source Serif 4** 800 italic, 64-80 px, white on a black box (Playfair Display 900 italic is a higher-contrast alternative).
- **Backgrounds and texture:** Off-white paper with a faint crumpled texture and a faint 24 px graph-paper grid patch, visible in the margins at about 4-6% contrast. The texture is static in the modern style. In the 2016 style the background texture swaps every few frames so it "boils" (see Motion). Archival items keep their own paper grain, halftone and yellowing.
- **Illustration / imagery:** Three layers of imagery: (1) cut-out archival photos and engravings, black-and-white or faded colour, framed as rectangles or ovals; (2) archival newspapers and documents shown full-frame, slightly rotated, with highlighter; (3) simple flat icons (houses, factories, solar panels, flags as circles) in 2-3 flat colours with no outlines, plus clean vector charts. No 3D, no glossy gradients.
- **Layout:** 16:9, safe margin 96 px. The main subject sits in a framed card at about 60% of frame width, offset from centre. Two coloured bars about 14 px thick and 25-40% of the card width poke out from opposite corners of the card: green along the top-right edge, teal along the bottom-left (see 1:53). Watermark logo top right; for us, use your own small mark or nothing. Charts fill about 80% of the frame with the title top-left, an italic source line under it, and generous empty space. One idea per frame. Density stays low: a frame has at most one chart, three labels and one highlight.

## 4. Motion language
- **Signature moves:**
  1. **Highlighter swipe:** a yellow rectangle behind 1-6 words of a headline grows left to right. `scaleX 0 to 1`, `transformOrigin: "left center"`, 0.35-0.5 s, ease `power2.out`, rotated -0.5 to -1.5 degrees, rough edges (SVG turbulence displacement), `mix-blend-mode: multiply`. Fires on the narrated word, about 0.1 s after it is spoken.
  2. **Self-drawing chart line:** `stroke-dashoffset` from the path length to 0 over 1.5-2.5 s, ease `power1.inOut`. A dot rides the line end and grows (`scale 0 to 1`, 0.25 s, `back.out(2)`) when the line lands; the line label fades in beside it (0.3 s, `power2.out`).
  3. **Framed cut-out with offset bars:** the photo card slides up 30 px and fades in (0.45 s, `power3.out`), then the green and teal bars slide in from 40 px further out (0.35 s, `power3.out`, stagger 0.08 s). The name lower third (bold sans name, italic serif role) wipes in from the left 0.2 s later.
  4. **Callout box:** a teal box `scaleX 0 to 1` from the left (0.3 s, `power3.out`), white caps text fades in 0.1 s later; often followed by a bold teal value ("> $1 billion") that types or fades in.
  5. **Slow push on archival stills:** every still drifts: scale 1.00 to 1.06 plus 1-2 degrees of rotation over the shot (4-8 s), ease `none` or `sine.inOut`.
- **Transitions between scenes:** *(corrected after the 2026-10-30 recheck)* Graphics do not cut: inside a graphics run each picture grows out of the last one (house scene collapses into a "$" dot that becomes the head of a chart line, a chart erases and redraws as the next chart; 0:15-0:39 has 0 cuts). Hard cuts happen when the source type changes: into and out of interview clips, archival film and stills, and newspaper clippings (8 cuts in 1:28-2:28, nearly all of them interview/archival). The 2016 style adds fast motion-blur whips: outgoing scene slides 400-800 px with a horizontal blur ramp (0.25-0.35 s, `power3.in`), incoming lands with `power3.out`. A chart that persists across scenes changes in place (markers added) rather than cutting away.
- **Camera:** *(corrected)* The camera is not locked on charts. A line is drawn with the camera close on its moving head (about 2-3x), following it down (0:19-0:23), then pulls back to reveal the axes and the whole chart (0:23-0:24, about 1 s, `power2.inOut`). Archival stills get slow push-ins. Finished charts then sit still (see 4b rule 5).
- **Text reveals:** *(corrected)* Chart titles type on letter by letter (0:24-0:26 "The price of solar modules over time"; 0:32-0:33 "The price of electricity"). Values type on too ("$300,000" at 0:17-0:18, "> $1 billion" at 1:30-1:31). Labels in boxes wipe on. Years tick as a counter when time passes inside a diagram (2000 to 2020 at 3:13-3:15). Other numbers appear whole. In the 2016 video, graphics were animated "on twos": ffmpeg's mpdecimate found 49 unique frames in 4 s of a map sequence at 23.976 fps (about 12 unique frames per second), which matches PremiumBeat's write-up of the Vox stutter look. The modern solar video graphics are mostly smooth (72-73 unique frames out of about 96 per 4 s, the rest are holds), so use on-twos only for the 2016 look.

## 4a. Motion, measured
Measured on 2026-10-30 with `templates/motion_metrics.py` on a 480p download of V8Vtb0bn30M (12 samples/s, change threshold 0.02). Cuts are frames with an ffmpeg scene score above 0.3. Files: `research/vox-explainer/recheck/` (motion JSON, cut list, strips).

| Measure | Whole video (6:31) | 60 s section 1:28-2:28 | Dalio reference |
|---|---|---|---|
| moving_frames_pct | 75.5 | 71.6 | 75.3 |
| still_time_pct | 24.5 | 28.4 | 24.7 |
| holds_1s_per_min | 4.5 | 5.0 | 4.5 |
| holds_2s_per_min | 2.8 | 4.0 | 0.8 |
| big_change_pct | 23.7 | 25.2 | n/a |
| cuts per minute | 7.8 | 8 | n/a |

What it means: three quarters of all frames move, the same as Dalio, but Vox allows about three times as many 2 s holds. Nearly all of them come at the end of a build: the home chart after its newest marker lands (2:05, 2:40, 3:43, 4:11-4:22), or a diagram's final state (3:16). The graphics runs themselves flow without cuts. The cuts come from interview and archival inserts.

## 4b. Motion rules
1. **One continuous graphic per idea, with no cuts inside it.** At 0:15-0:39 (0 cuts in 24 s) a house appears, trees pop in, panels drop onto the roof, the paper turns to slate, "$300,000" types out, and then the whole scene shrinks into a green "$" dot. That dot becomes the head of a chart line (0:19). The chart then erases and redraws as the next chart (0:32-0:34). Cut only when the source type changes (quote card, archival photo, clipping).
2. **The camera follows whatever is being drawn.** It stays close on the line head as it draws down through "1976" to "2019" (0:19-0:23), then pulls back to the full chart and title (0:23-0:26).
3. **Objects act out the sentence and change state in place.** The factory diagram (3:00-3:21) is one 21 s shot. Smoke billows the whole time and coal rides the conveyor. A teal year bar slides in, the flag pops, and "!", then "€", then "€€" pop beside it (3:05, 3:08, 3:10). The year ticks from 2000 to 2020 (3:13-3:15), the coal pile turns into solar panels and the factory's bolt goes from red to green. Build each mechanism as one object that changes state, not as a sequence of slides.
4. **Something loops while a build is running.** Smoke, the conveyor, a drawing line or typing text keeps going until the last element lands (3:00-3:16). A half-built graphic is never still.
5. **Then hold on purpose.** Once a home-chart marker or a diagram's end state lands, hold it still for 3-6 s while the narrator explains it (1:31-1:35 after "> $1 billion"; 3:16-3:21 on the 2020 factory). Budget about 3 holds of 2 s or more per minute, and hold only on finished graphics.
6. **A real person appears every 20-40 s.** Interview clips sit in framed cards with offset bars and keyword labels (1:35, 2:57 "Feed-in tariffs"). Archival people come as film (Carter, 1:15-1:27) or framed stills with a lower third (Paul Maycock, 1:39-1:43; Deng Xiaoping, about 3:50). Talking heads count as moving frames. Our stills need a slow push to keep up.
7. **The home chart returns; it is never redrawn from scratch.** It comes back about 8 times (about 1:28, 2:00, 2:40, 3:40, 4:05, 4:35, 5:00 and the 5:30 recap). Each return adds one marker with a typed label and dims the older ones.

## 4c. Characters and casting
- **Who appears:** there are no illustrated characters and no presenter. Every person is real:
  - expert interviews recorded on video calls, about 20% of the runtime (Leah Stokes and Gregory Nemet, framed with offset bars);
  - archival news film (Jimmy Carter, 1:15-1:27);
  - black-and-white portrait stills (Paul Maycock, Deng Xiaoping);
  - group photos (the UNSW lab, about 3:55-4:00).

  The flat icons (house, factory, coal, panels) never get faces. In the diagrams, objects do the acting.
- **How they act:** interviewees talk and gesture inside a fixed card, so the person is the motion. Stills get a slow push. A keyword label slides onto the card when the term is said (2:57).
- **For our pipeline (no interviews, no filming):**
  - *Real people as photo cards or cut-outs.* Each source has its own terms:

    | Source | Commercial use and credit |
    |---|---|
    | Smithsonian Open Access | CC0, no credit needed |
    | US National Archives, NASA | US federal works, public domain; don't imply endorsement or use agency logos |
    | Library of Congress Prints & Photographs | Use only items whose rights statement says "No known restrictions on publication"; check every item |
    | Wikimedia Commons | Filter for public domain or CC0. CC BY needs a credit line. Avoid CC BY-SA unless we credit it and accept the share-alike terms |
    | Unsplash, Pexels | Free for commercial use with no attribution. There are no model releases, so never present a stock face as a real, named person or use one in a sensitive claim |
  - *Background removal:* `rembg` (MIT) run locally. Add a 4-6 px paper-white sticker edge to hide mask errors.
  - *Instead of interview clips:* use a quote card that pairs the person's public-domain or CC portrait (with offset bars and a name lower third) with a verbatim, sourced quote. Never fake a video call or a real expert's words.
  - *People inside mechanism diagrams:* leave them out, as Vox does. If a figure is unavoidable, draw a faceless flat silhouette in SVG in the brand colours.
- The casting research (`casting/sources.md`, "Photo or cut-out style") reaches the same conclusion. No photos have been downloaded for this style yet.

## 4d. Text rules
- On-screen text means labels and evidence, never paragraphs of our own. A frame carries at most one title (chart scenes only), 3 labels and 1 highlighted phrase.
- Chart titles type on letter by letter, with an italic source line under them. Values type on, and years tick as a counter (see section 4).
- Keyword labels are white bold sans on a teal box, attached to a picture: on an interview card (2:57) or as a year bar beside a flag (3:01).
- Real documents are allowed as evidence, with one highlighter swipe each: newspapers (about 1:07 and 2:17) and legal text (about 4:43).
- **Text-only scenes: not allowed.** The only text-heavy frames in the modern video are the closing recap (about 5:30), which still shows flags on the home chart, and the credits. The 2016 type card ("Here's the BIG problem:") belongs to the older look; don't use it in the modern style.

## 5. Scene grammar
| Scene type | Purpose | Typical length | Layout | Motion | Narration during it |
|---|---|---|---|---|---|
| Cold-open artefact | Hook with one concrete object and a date | 4-8 s | Framed photo card centre-left, offset bars, date label | Card slide-in, bars, slow push | "The year is 1953. The US purchases this..." |
| Line chart build | Show the trend that is the whole story | 6-12 s | Paper background, title top-left, italic source line, axes, 1-4 lines | Axes fade, lines draw one by one, end dots pop, one label highlighted | States the trend, then the number |
| Home chart (dark panel) | Recurring timeline that collects milestones | 5-10 s each return | `#535154` rounded card about 85% of frame, offset bars at its edges, log axis | New marker pops (flag circle), teal callout box, previous markers dim to 30% | Names the milestone and its consequence |
| Newspaper headline | Prove the past with a period source | 2-5 s | Clipping full-bleed, rotated 1-3 degrees | Slow push, yellow highlighter swipes the key phrase | Quotes or paraphrases the headline |
| Archival photo + name | Introduce a person | 3-6 s | Cut-out photo card with offset bars, name lower third | Card slide-in, lower-third wipe | "There was a guy named Paul Maycock..." |
| Quote card (replaces interview) | Expert voice | 4-8 s | The speaker's portrait card with offset bars on one side (never text alone), quote in sans 48 px beside it, highlighted phrase, name and title in italic serif | Card slides in with a slow push, quote lines type or fade up in sequence, keyword label wipes on, highlight swipe | TTS reads the quote, or narration paraphrases with "as one researcher put it" |
| Flat icon diagram | Explain a mechanism | 5-10 s | 2-4 flat icons with arrows, one teal label | Icons pop in (`back.out(1.4)`), arrows draw | Step-by-step "this, then this" |
| Loop / cycle diagram | Feedback loops | 6-10 s | Four phrases around a dotted circle | Dotted arrows draw clockwise, phrases fade in order | Reads the loop once |
| Document highlight | Policy or legal proof | 3-5 s | Scanned document full-bleed | Push-in, highlighter swipe on clause | Names the law and what it did |
| Map silhouette (2016) | Geography | 4-8 s | Black land on pale grid, serif caps title above ("MERCATOR") | Projection morphs, yellow dots | Explains distortion |

## 6. Data and numbers
- Line charts on paper for long trends, clean thin axes, no chart junk. Lines 4-5 px; the hero line in `#6DBC5D` (or teal), others `#1C1C1C` or `#888`. Labels sit at line ends, not in a legend. When one series is the point, its label gets the yellow highlight (5:27 in the solar video).
- Log scales are allowed and labelled on the axis in small rotated italic.
- A "home chart" on a dark slate card returns throughout, collecting markers (flag circles 36 px) and callouts. Older markers dim so the newest is always the brightest thing.
- Big single numbers appear in bold teal next to a label ("> $1 billion"), not as giant hero numbers.
- Every chart has a title and an italic source line ("Lazard Levelized Cost of Energy Analysis"). Never show a chart without a source.
- Hold time: a finished chart stays 2-4 s after its last element lands; total chart scenes 6-12 s.

## 7. Sound
- **Music:** Minimal production-library beds (the 2016 video credits list several library cues). Low-key electronic or hip-hop-adjacent loops, piano or plucked synth, steady beat. My crude onset analysis was ambiguous under the voice (78-97 BPM candidates in the 2016 video), so treat 80-100 BPM as a starting range, not a measurement. Energy is flat-ish, lifts at section turns, drops out for a striking fact.
- **Sound effects:** Sparse and tactile: paper slide and rustle when clippings appear, a marker squeak or soft swipe on highlights, soft whooshes on whip transitions, a soft pop on chart markers. Roughly one SFX every 5-10 s, never on top of every cut.
- **Mix:** Measured on kIID5FDi2JQ: integrated loudness -15.5 LUFS; in the gaps between sentences the bed sits at the same level as speech (-18.7 vs -18.5 dBFS median per 0.4 s window), meaning the music comes up to fill pauses and ducks under words. Target: voice at -16 LUFS integrated, music -18 to -22 dB under the voice while speaking, released to about -8 dB under in gaps of 1 s or more. SFX about -12 dB under the voice.

## 8. Pacing
- Modern (V8Vtb0bn30M): 51 scene changes in 6:31, 7.8 cuts per minute, median shot 5.3 s, mean 7.5 s (re-measured 2026-10-30: same 51). The cuts cluster around interview and archival inserts; graphics runs of 15-25 s often have none (see 4b).
- 2016 (kIID5FDi2JQ): 83 scene changes in 6:00, 13.8 cuts per minute, median shot 1.6 s (whips and props inflate this).
- A chart or home-chart beat lasts 6-12 s; a headline 2-5 s; a number stays on screen at least 2 s after it is spoken.
- Full videos are 5-10 minutes. For a 30-90 s version: 8-14 scenes, one home chart that returns 2-3 times, 2 highlighter moments, 1 cold-open artefact, 1 closing line over the final chart.

## 9. Assets needed and where to get them
- **Archival photos and engravings:** Wikimedia Commons (filter public domain), Library of Congress Prints & Photographs (many public domain), NASA, US government agency photo libraries, Smithsonian Open Access (CC0). Cut out with `rembg` locally or frame as rectangles. Keep a credits list.
- **Newspaper clippings:** Library of Congress "Chronicling America" (US papers up to 1963, public domain scans). For modern-looking headlines, typeset your own fake-free clipping only if it is clearly a reconstruction; never invent a real outlet's headline.
- **Documents:** Government PDFs (laws, reports) are usually public domain in the US; screenshot pages.
- **Charts and data:** Our World in Data (CC BY), World Bank, government statistics. Build charts as SVG yourself.
- **Icons and flat illustrations:** SVG Repo (check each licence), Tabler Icons (MIT), flag circles from `flag-icons` (MIT). Restyle to the palette.
- **Paper texture and grid:** generate in SVG (`feTurbulence` + `feDiffuseLighting`) so there is nothing to license; or CC0 textures from ambientCG / Poly Haven.
- **Music and SFX:** see assets/sources.md (Pixabay Music and SFX, Free Music Archive CC-BY, freesound.org CC0).

## 10. HyperFrames build recipe
- **Layer order (bottom to top):** paper background (SVG noise + grid patch) > content card (chart/photo/document) > offset colour bars > labels and callouts > highlighter strokes (multiply) > lower third > optional logo mark.
- **Components to build once:**
  - `PaperBackground`: full-frame SVG, `feTurbulence baseFrequency=0.9 numOctaves=3` blended at 5% over `#F4F1F5`, plus a grid patch (`<pattern>` 24 px, stroke `#000` at 4%) masked to a corner. For the 2016 boil: three pre-rendered texture variants toggled with `ease: "steps(1)"` every 0.125 s.
  - `FramedCard`: image or chart slot with two absolutely positioned bars (`--bar-a: #6DBC5D`, `--bar-b: #00B1BC`), entry timeline as in section 4.
  - `HighlighterSwipe`: an absolutely positioned div behind a text span (or over an image region), `background: #F2E205; mix-blend-mode: multiply; filter: url(#rough-edge)` where `#rough-edge` is `feTurbulence` + `feDisplacementMap scale=6`. Registry: `npx hyperframes add marker-highlight` and `vox-annotate` (a keyword marker plus a connector to a callout label) are close starting points; restyle to yellow multiply.
  - `LineChart`: SVG paths built from data; draw with `strokeDasharray/strokeDashoffset`. Registry `data-chart` and `decline-chart` can be cut down; strip their default styling to the palette.
  - `HomeChart`: one composition that takes a list of milestones and a "current index"; each mount shows markers up to that index and animates only the newest.
  - `NameLowerThird`: bold sans name + italic serif role, wipes from left.
- **GSAP patterns:** one master timeline per scene; enter at `0`, highlight at the narration word time (from Kokoro word timings or a forced aligner), hold, cut. Example highlighter:
  ```js
  tl.fromTo(hl, {scaleX: 0}, {scaleX: 1, duration: 0.42, ease: "power2.out", transformOrigin: "left center"}, wordTime + 0.1);
  ```
  For 2016-style "on twos", quantise time inside the ease so motion steps at 12 fps but stays seek-safe:
  ```js
  const twos = (base, dur) => { const e = gsap.parseEase(base); const n = Math.max(1, Math.round(dur * 12)); return p => e(Math.round(p * n) / n); };
  tl.to(el, {x: 0, duration: 0.6, ease: twos("power3.out", 0.6)});
  ```
- **Whip transitions (2016 only):** registry `whip-pan-cut` (directional blur) restyled, 0.3 s.
- **Pitfalls:** do not let every element bounce; Vox motion is crisp, not playful. Keep `mix-blend-mode: multiply` on highlights or they look like stickers. Large archival PNGs: downscale to 2x display size before rendering. Keep all randomness seeded (texture variants pre-generated, not `Math.random()` at render time).

## 11. Storyboard frame spec
Each storyboard frame must state:
1. Scene type (from section 5) and duration in seconds.
2. Background: paper (modern / 2016 boil) or full-bleed archival.
3. Main element: chart (type, data series, which series is the hero, source line), photo (file, crop, frame shape), document/headline (file, which phrase to highlight).
4. Exact on-screen text: title, labels, callout values, lower-third name and role.
5. Highlight cue: which words, and the narration word it syncs to.
6. Offset bar colours and which corners.
7. Narration line for the scene, with the emphasis word marked.
8. SFX cue (paper, marker squeak, pop, whoosh) and music state (bed / lift / drop out).
9. Transition out (cut / whip / chart persists).

## 12. Do and don't
**Do**
- Put a source line on every chart and keep a credits list for every archival asset.
- Use one recurring "home chart" that grows through the video.
- Sync each highlight to the spoken word, 0.1 s after it.
- Keep colours to paper, ink, green, teal and yellow; let archival material bring its own colour.
- Rotate clippings 1-3 degrees and give them a slow push so nothing is dead still.
- Open with a concrete object, a date and a number.

**Don't**
- Don't use glossy gradients, drop shadows, 3D or neon.
- Don't fake a real publication's headline or present a reconstruction as an original.
- Don't highlight more than one phrase per clipping.
- Don't animate everything with bounce eases; save `back.out` for small marker pops.
- Don't use the Vox logo or name the video "Vox"; use your own mark.
- Don't leave a chart up without the narrator talking about it.
- Don't cut between graphics: transform one into the next (4b rule 1).
- Don't hold a half-built graphic still; holds are for finished states only.

## 13. Feasibility with our stack
- **Reproduces well (high fidelity):** paper background, charts that draw, home chart with markers, callout boxes, offset-bar framed cards, highlighter swipes, lower thirds, flat icon diagrams, quote cards. All of this is SVG + CSS + GSAP and is the core of the style.
- **Hard:**
  - *Interview clips* (modern Vox leans on expert video calls). Workaround: quote cards with the expert's public-domain or CC photo and the quote read by a second Kokoro voice (e.g. `bf_emma`), clearly attributed as a quote. Or paraphrase in narration.
  - *Archival footage* (news film, presidents speaking). Workaround: public-domain stills from the Library of Congress / Wikimedia with slow push; US government film on the Internet Archive is often public domain but check each item.
  - *Real cut-outs of people* need clean masks. Workaround: `rembg` locally, then add a 6 px white sticker border to hide edge errors, which also suits the collage look.
  - *The 2016 boil and stutter*: doable with stepped eases and texture swaps, but easy to overdo; keep it on graphics only.
  - *Finding period newspapers that say exactly the right thing* is research work, not animation. If no real clipping exists, use a document or a chart instead of inventing one.
- **Motion gap (from the 2026-10-30 recheck):** the original moves in 75% of frames. Our earlier notes ("mostly hard cuts", "camera-locked charts", "titles fade up") would have produced a cut-heavy, static build. The fixes are all doable in GSAP: transform scenes into each other, have the camera follow line heads, type titles and values, and loop smoke or conveyors during builds. They add roughly 30-50% build time per graphics scene.
- **The interview gap is bigger than we thought:** about 20% of the runtime is moving interview video, which we cannot make. Portrait quote cards are static by nature, so give each one a slow push, a typed quote and a keyword label wipe. If moving footage of a place or process exists on Pexels or Pixabay, use it to keep that 20% moving. Expect these beats to land at 40-50% fidelity.
- **Fidelity estimate:** 70-80% for chart-and-clipping driven pieces once the motion rules are followed (a fan would recognise it); about 60% if the topic needs lots of moving archival footage or interviews.

## 14. Self-check targets
Run `python templates/motion_metrics.py render.mp4 --json out.json` on the finished render, count cuts with an ffmpeg scene score above 0.3, and check snapshots for the sentences below.

```yaml
style: vox-explainer
reference: "V8Vtb0bn30M whole video: 75.5% moving, 2.8 holds>=2s/min, 7.8 cuts/min"
moving_frames_pct_min: 70
holds_2s_per_min_max: 3.0
holds_1s_per_min_max: 5.5
longest_hold_s_max: 6
cuts_per_min: [5, 10]
text_only_scenes_allowed: false
characters_required: true      # real people: a portrait / cut-out card at least every 40 s
colour_source: brand           # every colour comes from the brand file, except photos, archival scans and maps
checks:
  - "Inside a graphics run there are no hard cuts: each new picture grows out of the previous one (a dot becomes a line head, a chart redraws into the next chart, coal turns into panels)."
  - "Every hold of 2 s or more is on a finished graphic (home chart after its newest marker, or a diagram's end state); while something is being introduced, at least one element is moving (drawing line, typing text, smoke, conveyor)."
  - "A real-person card (photo or archival, offset bars, name lower third) appears at least once every 40 s, and every chart has a title that types on plus an italic source line."
```
