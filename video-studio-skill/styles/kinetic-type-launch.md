---
id: kinetic-type-launch
name: "Kinetic Type Launch"
one_line: A dark, premium launch film where short feature lines fade in word by word, huge heavy words slam on the music's beats, and product UI floats in tilted 3D, all cut tightly to a driving track with little or no voice-over.
best_for: [product and feature launches, SaaS release announcements, app teasers, event openers, changelog highlights, brand sizzles 15-60 s]
not_for: [long explanations, journalism, emotional storytelling with a narrator, topics with no product or UI to show]
needs_on_camera_person: false
build_difficulty: medium
pace_wpm: "100-130 (mostly on-screen text)"
signature_moves: [Word-by-word blur-in, Light sweep across a line, Beat slam, Dissolve out]
tested: false
tested_note: "works, but expect one extra feedback round"
references:
  - title: "iPhone 17 Pro: The most powerful iPhone ever (Apple)"
    url: https://www.youtube.com/watch?v=TNhX1uR2vO8
    timestamps: "0:00-0:01 product rises out of black; 0:01-0:03 'iPhone 17 PRO' wordmark over the product; 0:03-0:04.5 'ALL', 'OUT', 'PRO' heavy extended words slam on beats; 0:05-0:07 'Forged aluminum unibody' word-by-word fade with a light sweep across the words; 0:07-0:09 'Ceramic Shield 2'; 0:09-0:11 '3x better scratch resistance' (blur crossfade from the previous line); 0:13.5-0:14.5 chip render; 0:14.5-0:16.5 'Vapor-cooled performance' in smoke, then the letters dissolve out; 0:22-0:30 short feature lines on black with small footnotes; 0:16.4-0:18.8 vapor chamber turns into a blue-to-orange heat map; 0:20.0-0:22.0 'Breakthrough battery life' on black, battery slab rises behind it; 0:31.2-0:33.6 zoom ladder: one shot of a person at a lake cut at 13, 24, 28, 35, 100 and 200 mm (6 cuts in 1.5 s), each with a small yellow focal-length pill; 0:37.2-0:39.6 'for smarter | group selfies' split around a phone whose selfie view widens; 0:45.2 the opening camera bump returns; 0:50.0-0:54.0 end cards 'iPhone 17 Pro', 'iPhone 17 Pro Max', logo, in orange on black, then about 5 s of black. Re-checked 2026-10-30 with 2.5 fps strips of the whole film (research/kinetic-type-launch/recheck/)"
  - title: "Introducing Linear Releases (Linear)"
    url: https://www.youtube.com/watch?v=6dIwFoQ0eVg
    timestamps: "0:00-0:08 dark 3D-tilted release graph with branching lines and issue IDs; 0:09-0:11 'PLAN AND TRACK RELEASES' monospace caps centred on black; 0:11-0:20 stacked tilted panels drift in depth; 0:21.5-0:22.5 'RELEASES' typed with block cursor; 0:24-0:26 'AVAILABLE NOW' typed; 0:26.5-0:30 logo lockup"
  - title: "Introducing Linear Agent (Linear)"
    url: https://www.youtube.com/watch?v=mRql2VJ99gM
    timestamps: "0:00-0:45 one continuous tilted camera move over dark product UI: prompt typed into an input ('Find issues with loading performance'), results list streams in, a document builds; 0:46-0:55 end card 'Linear. At your command.' (bold brand word + regular tagline) then logo"
---

# Kinetic Type Launch

## 1. The idea in one paragraph
This is the language of premium product launches: black space, one short claim at a time, and motion that feels engineered. The type does the talking. Feature lines are short and calm; a few huge, heavy words hit on the beat to give the film a pulse; real product surfaces (UI, device, chip) float in light and depth between the words. Nothing is decorative and nothing lingers. It works because it feels expensive and confident, and because each line is short enough to read in a second. The audience is existing fans, buyers and tech press who want the "what is new" in under a minute.

## 2. Narration
- **Voice:** Usually none. All three references are music-led with on-screen text only (the Apple film's captions list only the track and SFX: "Habitat Y" by Citizen, pattering, crunching, whooshing, camera shutters). When a launch film does use a voice, it is calm, intimate and unhurried, close-miked, never hyped.
- **Pace:** On-screen text, not speech: the Apple film shows about 15 short lines in 60 s; each line is 2-5 words and is on screen 1.2-2.5 s. If you add VO, keep it to 100-130 wpm with long gaps, roughly one short sentence per 4-6 s.
- **Sentence shape:** Noun phrases and fragments, not sentences: "Forged aluminum unibody." "Vapor-cooled performance." "Charge up to 50% in 20 minutes." Benefit + number. Brand sign-off as "Product. Tagline." ("Linear. At your command.").
- **Structure habits:** Cold open on the product emerging from darkness; title or wordmark; 3-4 beat-synced slam words that set the attitude; then a run of feature lines, each paired with one visual; a fast montage burst near the two-thirds point; a calm end card with name, tagline and logo. No recap.
- **HyperFrames TTS pick:** Default to no voice. If the brief needs one, `af_nova` at speed 0.95 (crisp, modern, grade C) or `af_heart` at 0.92 (grade A, warmer) for a calm, intimate read; `am_michael` at 0.95 for a male read. Render each line separately and place it on a beat, rather than one long read.

## 3. Visual system
- **Palette** (Apple film: about 55% of all sampled pixels are black or near-black; Linear films: 75-95%):
  - `#000000` background (true black for Apple-style; `#08090A` for Linear-style so UI panels can sit just above it)
  - `#F5F5F7` primary text (bright word)
  - `#86868B` secondary text (dimmed words in the same line, footnotes)
  - `#181D20` / `#131719` UI panel surfaces (measured on Linear Agent frames)
  - `#2A2F33` hairline borders on panels
  - One product accent, used for the slam words and end card only. Apple film: orange gradient `#E8732F` to `#A9461F` (measured `#CC713B` / `#AD542F`), with a deep blue `#01519E` for the alternate finish. Linear: indigo `#5E6AD2` (brand colour, not measured here), used sparingly.
  Rule: one accent per film. White and grey do all the type. No gradients on body text.
- **Typography:** Apple uses SF Pro, whose licence limits use to Apple-platform UI work, so do not use it in videos. Free stand-ins:
  - Feature lines: **Inter** (use the Display optical size if available) 500-600, 48-60 px, tracking -0.01em, centred. Key word in `#F5F5F7`, other words in `#86868B`.
  - Slam words: a heavy, wide display face. **Archivo** at width 125 and weight 900 (variable font on Google Fonts) or **Unbounded** 900, 220-320 px, all caps, accent gradient fill.
  - Monospace system lines (Linear-style): **JetBrains Mono** or **Geist Mono** 500, 28-34 px, caps, tracking 0.12em, `#E6E6E6`.
  - End card: brand word in Inter 600, tagline in Inter 400, 44-56 px, same line.
  - Footnotes: Inter 400, 14-16 px, `#6E6E73`, bottom centre (Apple shows legal footnotes under claims).
- **Backgrounds and texture:** Black, with light coming from the product or UI itself: soft radial glows (`#FFFFFF` at 4-8%), rim lights on edges, haze or smoke for "performance" lines, particles or rain for "durability" lines. No paper, no grain beyond a very light 2% noise to prevent banding.
- **Illustration / imagery:** Product hero shots (device renders), macro detail shots, real UI (dark mode) floating in 3D, simple system diagrams (branching lines, nodes). No illustrations, no stock photos of people (Apple uses shot footage; we cannot).
- **Layout:** Strict centre alignment. One line of text, vertically centred or at the upper third above a product. Huge margins: text block under 50% of frame width. Text never overlaps busy imagery unless the image is darkened. Split lines can wrap around an object ("for smarter [phone] group selfies").

## 4. Motion language
- **Signature moves:**
  1. **Word-by-word blur-in:** each word goes `opacity 0 to 1`, `filter: blur(10px) to blur(0)`, `y 8 to 0` over 0.5 s with `power3.out`, staggered 0.12-0.2 s. (0:05 in the Apple film.)
  2. **Light sweep across a line:** after the line is in, a bright band moves left to right across it over 1.0-1.4 s (`sine.inOut`), so words brighten from `#86868B` to `#F5F5F7` in turn and the key word ends bright. Built as a moving gradient mask over a bright copy of the text.
  3. **Beat slam:** a heavy accent word replaces the previous one exactly on a beat; either a hard cut, or scale 1.06 to 1 in 0.12 s with `expo.out`. Consecutive slams one beat apart (0.46 s at 130 BPM).
  4. **Dissolve out:** letters blur and fade out in a seeded random order over 0.4-0.6 s (stagger 0.02 s each, `power2.in`) as smoke or the next image takes over (0:16 "Vapor-cooled performance").
  5. **Typewriter with block cursor (Linear-style):** monospace caps type at 7-10 characters per second (measured: "RELEASES" in about 0.8 s, "AVAILABLE NOW" in about 1.9 s), solid block cursor `#FFFFFF` 0.55 em wide, blinking at 0.5 s on / 0.5 s off with `steps(1)` when idle; the line is deleted backwards at 2x speed before the next one.
  6. **Tilted UI drift:** a UI panel tilted in 3D (`rotateX 40-55°, rotateZ -12 to -25°`, perspective 1600-2400 px) drifts slowly (60-200 px over 6-10 s, `none` or `sine.inOut`) with depth-of-field blur on the far edge.
- **Transitions between scenes:** Hard cuts on beats (23 per minute); blur crossfades between lines (0.25-0.35 s, outgoing blur to 8 px while incoming resolves; "Ceramic Shield 2" and "3x better scratch resistance" overlap at 0:09.2); fades to black at section ends. One burst with cuts every 0.25-0.3 s (6 cuts between 0:32.2 and 0:33.7). Corrected: the burst is a **zoom ladder**, one shot stepped through focal lengths with a mm label, not a montage of different shots. Many cuts are object-to-object match cuts, so the product reads as one continuous thing (see 4b). Linear films use no hard cuts at all: measured 0 scene changes over the 0.3 threshold in 30 s and 55 s, only continuous camera moves and fades.
- **Camera:** Slow push-ins and orbits around the product (we fake with 2.5D), slow drift over tilted UI, occasional fast push-through into a screen. The product is never still: in every product shot of the strips it is rising, turning or sliding.
- **Text reveals:** As above. Numbers either appear whole on a beat or roll up quickly (0.6-0.8 s, `power3.out`) with tabular figures.

## 4a. Motion, measured
Measured on 2026-10-30 with `templates/motion_metrics.py` on TNhX1uR2vO8 (854x480, 59.4 s). The film is itself about 60 s, so the whole video is the 60 s window; its two halves are shown as well. Files: `research/kinetic-type-launch/recheck/motion_*.json`, cuts in `cuts_0.3.txt`.

| Measure | Whole film (0:00-0:59) | First half (0:00-0:30) | Second half (0:30-0:59) | Dalio, for reference |
|---|---|---|---|---|
| moving_frames_pct | 86.5 | 100.0 | 72.8 | 75.3 |
| still_time_pct | 13.5 | 0.0 | 27.2 | 24.7 |
| holds_1s_per_min | 2.0 | 0.0 | 4.1 | 4.5 |
| holds_2s_per_min | 1.0 | 0.0 | 2.0 | 0.8 |
| big_change_pct | 62.1 | 79.9 | 43.9 | - |
| cuts per minute (ffmpeg scene > 0.3) | 23 | 10 in 30 s | 13 in 30 s (6 in the burst) | - |

**What it means:** something moves in every frame until the sign-off. Nearly all still time is the end: about 5 s of black after the logo (0:54.4-0:59.5) plus 1 s text holds in the second half ("Center Stage front camera", 0:34-0:35).

## 4b. Motion rules
1. **Every frame moves until the sign-off.** Even text-only lines move: a light sweep runs across the line so the bright word travels left to right (0:26.8-0:28.4 "All 48MP Fusion rear cameras"), words blur in one at a time, letter spacing settles ("8x optical-quality zoom" closes up, 0:30.0-0:30.8). A static text hold lasts 1 s at most.
2. **The product is always moving and turns into the next object instead of cutting away.** Phone side rotates (0:04.8-0:06.4), becomes the bare chassis (0:06.8), then the screen edge for "Ceramic Shield 2" (0:08.0). The vapor chamber slides in (0:16.4) and turns into a blue-to-orange heat map (0:17.6-0:18.8). The battery slab rises behind its line (0:20.8), then pulls back into the phone's internals (0:22.0).
3. **Text and product share depth.** The "PRO" wordmark sits behind the camera bump (0:01-0:03); the battery rises behind "Breakthrough battery life" (0:20.8); "for smarter | group selfies" parts so a phone slides in between, and its selfie view widens to fit more people (0:37.2-0:39.6).
4. **Cut on the beat, about 23 cuts a minute, with one burst.** The burst (0:31.2-0:33.6) steps one shot through focal lengths 13 to 200 mm with a mm label: a zoom ladder that demonstrates the feature, not a random montage.
5. **One slam run, early.** Right after the wordmark: "ALL" (0:03.2, small), "OUT" (0:03.6, big), "PRO" (0:04.4, big, accent colour), about 0.4 s apart. Word size varies inside the run. It never comes back.
6. **Numbers assemble with an icon.** "Charge [bolt] up to 50% in 20 minutes" builds in three steps (0:22.8, 0:23.2, 0:23.6), then a footnote fades in at the bottom.
7. **Bookend, then go to black.** The opening camera bump returns (0:45.2), the colour lineup appears (0:47.6), name cards, logo, then a fade to black (0:54.4-0:59.5). This end hold is the only long still; keep it at 5 s or less.

## 4c. Characters and casting
- **No characters.** The product is the performer: it rises out of the dark (0:00-0:01), turns, is hit by grit, rain and debris (0:10.8-0:12.8), heats up (0:18). Type is the second performer.
- **People** appear only as subjects of camera demos (a person at a lake 0:31-0:35, a group selfie 0:37-0:40, a picture-in-picture selfie 0:41-0:44), about 13 s of shot footage. We cannot shoot these, and they are not characters.
- **Free sources for our pipeline:**
  - The hero: **UI mock-ups built in HTML/CSS** from the brand's own product (dark-mode screens, tilted panels, typed prompts, streaming lists). No licence question, since we build them.
  - Device frames: registry `vfx-iphone-device`, `device-frame-stage`, `browser-device-stage`.
  - Icons: drawn in SVG ourselves, or a permissive line set such as Lucide (ISC) or Tabler Icons (MIT).
  - If a demo truly needs people, show them only inside a device screen, from Pexels or Pixabay video (free licences, no attribution; check their rules on implied endorsement). Optional and brief.
  - Not a fit: the illustrated people in `casting/` (Open Peeps, Humaaans). Drawn people break the premium product look. Never use Apple footage, fonts, product names or logo.

## 4d. Text rules
- **Text is the point.** About 14 short lines in 60 s, 2-6 words each, one line at a time, centred (or split around an object). Text is on screen about half the runtime.
- **Text-only scenes are allowed and central:** about 8 of the 14 lines sit on plain black with no picture (0:20.0, 0:22.8, 0:26.8, 0:30.0, 0:35.2, 0:39.6, 0:44.0, 0:50.0), about 12 s or 20% of the film. Each still has to move (rule 1) and lasts 0.8-1.6 s.
- **Where:** centred; over a product, the line sits in the upper or lower third so it does not cover the hero; footnotes at the bottom, 14-16 px grey.
- **No paragraphs, no subtitles of a voice-over.** One bright key word per line; the rest grey.

## 5. Scene grammar
| Scene type | Purpose | Typical length | Layout | Motion | Audio |
|---|---|---|---|---|---|
| Emerge from black | Open with the product | 1-3 s | Product or UI fragment centred, lit from one side | Fade/push up from darkness, light sweeps across | Low rumble or first notes |
| Wordmark | Name the product | 1.5-2.5 s | Name above product, accent colour | Blur-in, slight scale | Hit on downbeat |
| Slam run | Set attitude | 1.5-3 s (3-5 words) | One huge word centred | Beat slams | Hits on every beat |
| Feature line + visual | One claim, one picture | 1.5-3 s | Line centred or upper third, visual below or behind | Word blur-in, light sweep, blur crossfade to next | SFX that matches the material (crunch, whoosh, shutter) |
| Spec number | Quantified claim | 1.5-2.5 s | "Charge [icon] up to 50% in 20 minutes", footnote | Words in, icon pops, number bright | Tick or click |
| UI walkthrough | Show the product working | 4-12 s | Tilted UI, one action at a time (typing, list streaming, panel opening) | Typing 12-20 chars/s, results stream with 0.04 s stagger, camera drift | Soft UI clicks, keyboard |
| System diagram | Explain the concept | 3-8 s | Lines/nodes on black, monospace labels | Lines draw (1-2 s `power2.inOut`), labels fade | Pad |
| Zoom ladder / burst | Energy peak | 1.5-3 s | One shot stepped through 4-8 framings (focal lengths, angles) with a small label, or 4-8 related shots | Cuts every half beat (0.23-0.3 s) | Drum fill |
| Split line around object | Playful reveal | 2-3 s | Words left and right of a device | Device slides in between, words part | Whoosh |
| End card | Sign-off | 3-6 s | "Product. Tagline." then logo | Fade, tagline trails 0.3 s | Final hit, ring-out |

## 6. Data and numbers
- Numbers are claims, not charts: "3x better scratch resistance", "up to 50% in 20 minutes", "8x optical-quality zoom". The number word is the bright word; the rest is grey.
- Each numeric claim gets a tiny footnote line at the bottom (14-16 px, grey). Keep it honest; write real footnotes.
- Use tabular figures (`font-variant-numeric: tabular-nums`) for any rolling number.
- If a comparison needs a visual, use one simple bar pair or a before/after wipe on black, never a full chart.

## 7. Sound
- **Music:** The track drives everything. Crude onset/autocorrelation tempo estimates: Apple film about 130 BPM; Linear Releases about 110 BPM; Linear Agent ambiguous between about 98 and 144 BPM. Use 100-130 BPM tracks with clear transients: minimal electronic, indie-electronic, glitchy percussion, or a pulsing synth bass, with a build, a drop for the slam run, a peak for the burst montage and a clean ending. Get beat times from `npx hyperframes beats --json` on the chosen track and place every slam, cut and line on them.
- **Sound effects:** Material and UI foley rather than generic whooshes: rain patter and crunching debris (durability), whooshes (transitions), camera shutters (camera features), soft UI clicks and keyboard taps (software), one tonal "chime" for the end card. One SFX per scene at most.
- **Mix:** Music-forward. With no VO, normalise the master to -14 LUFS (streaming norm) with the music doing the work and SFX 6-10 dB under the music peaks. If a VO is added, voice at -16 LUFS and music ducked by 8-10 dB under it, returning to full level between lines.

## 8. Pacing
- Apple film: 23 scene changes in 60 s (23 per minute), median shot 1.8 s, mean 2.6 s, with a 0.3 s burst section.
- Linear films: one continuous move for 30-55 s with text cards between; the "pace" comes from typing and UI events every 0.5-1.5 s.
- A feature line holds 1.2-2.5 s after it lands; a slam word holds exactly one beat (0.4-0.6 s); the end card holds 3-6 s.
- Total length 15-60 s, occasionally 90 s. For a 30 s film at 120 BPM (0.5 s per beat, 60 beats): 2 beats emerge, 4 beats wordmark, 4 beats slam run, 4 feature lines of 4-6 beats each, 4 beats burst, 8 beats end card.

## 9. Assets needed and where to get them
- **Product UI:** rebuild the real product's screens as HTML/CSS (the best option, crisp at any zoom) or use high-resolution screenshots. Dark-mode UI looks best.
- **Device frames:** registry `vfx-iphone-device` (GLTF iPhone and MacBook models with HTML screens), `device-frame-stage`, `browser-device-stage`, `multi-device-splay`. Free device mockups from Figma Community files (check licence) as stills.
- **Hero renders:** no free source for photoreal renders of your own product unless you make them (Blender is free). Without renders, make the UI the hero.
- **Textures:** smoke/haze, rain and particle overlays: generate in shaders/CSS or use free overlays from Pixabay video (check licence). Registry `godrays`, `light-edge`, `aurora`, `grain-overlay`.
- **Fonts:** Inter, Archivo, Unbounded, JetBrains Mono, Geist Mono (all on Google Fonts, OFL).
- **Music and SFX:** see assets/sources.md. Pixabay Music "tech", "minimal electronic", "product launch"; YouTube Audio Library; freesound.org CC0 UI clicks, shutters, whooshes.

## 10. HyperFrames build recipe
- **Beat grid first:** choose the track, run `npx hyperframes beats --json`, and lay every scene boundary, slam and line entrance on a beat or half-beat. Store beats in an array and reference them by index in the timeline (`at(beatIdx) - sceneStart`).
- **Layer order:** black background > glow/haze layer (screen blend) > product or UI layer (with its own 3D transform) > dimming gradient behind text if needed > text layer > footnote layer.
- **Components to build once:**
  - `FeatureLine(words, keyIndex)`: spans per word; entrance stagger; light sweep as a bright duplicate of the line clipped by a moving `mask-image: linear-gradient(...)`; exit as blur crossfade. Registry `blur-in`, `per-word-rise`, `text-shimmer` and `focus-blur-resolve` are close starting points; `mk-callout-highlight` drives word emphasis from one scalar.
  - `SlamWord(text)`: wide heavy font, accent gradient via `background-clip: text`; entrance on beat. Registry `caption-kinetic-slam`, `beat-accent`, `beat-freeze-cut`.
  - `Typewriter(text, cps)`: monospace, block cursor with `steps(1)` blink, backspace before the next line. Registry `typewriter`, `streaming-text`, `vfx-text-cursor`.
  - `TiltedUI(html)`: wrapper with `perspective` and `transform-style: preserve-3d`; panel children at different `translateZ` for depth; far edge blur via a gradient-masked blurred copy. Registry `ui-3d-reveal`, `parallax-device-dive`, `app-showcase`.
  - `EndCard(brand, tagline, logo)`.
- **Dissolve-out:** split letters into spans at build time, shuffle with a seeded PRNG, tween `opacity: 0, filter: "blur(8px)"` with `stagger: 0.02`.
- **Pitfalls:** `filter: blur()` on large text layers is costly; animate blur only on small spans and keep durations short. Black must be true black end to end (check that no overlay lifts it to grey). Never let two lines overlap during a crossfade at full opacity. Keep claims real; a launch film with invented specs is misleading. Do not use Apple's fonts, product names or logo; build your own product's identity.

## 11. Storyboard frame spec
1. Beat index range (start beat, end beat) and duration in seconds at the track's BPM.
2. Scene type (from section 5).
3. On-screen text exactly, with the key (bright) word marked and any footnote text.
4. Visual: which UI screen/state or device/render, its 3D angle, camera drift direction.
5. Entrance and exit motion (blur-in / slam / type / dissolve / crossfade).
6. SFX cue on which beat; music section (intro / build / drop / peak / outro).
7. Optional VO line and the beat it starts on.

## 12. Do and don't
**Do**
- Pick the music first and cut everything to its beats.
- Keep each line to 2-5 words, centred, with one bright key word.
- Use one accent colour, only on slam words and the end card.
- Show the real product UI working, one action at a time.
- Leave space: black backgrounds and short black beats are part of the rhythm, but the frame keeps moving (a sweep, a blur-in, a drifting product); the only long hold is the final fade to black.
- End with "Product. Tagline." and the logo, then silence or ring-out.

**Don't**
- Don't write full sentences or paragraphs on screen.
- Don't use bouncy or elastic eases; motion should feel precise (`power3`, `expo`, `sine`).
- Don't use SF Pro or other Apple assets; use Inter and your own brand.
- Don't put text over busy, bright imagery without darkening it.
- Don't add a long narrated explanation; this style is music-led.
- Don't make claims you cannot footnote.

## 13. Feasibility with our stack
- **Reproduces well:** all the typography (blur-in, light sweep, slams, typewriter, dissolve), beat-synced timing, dark tilted UI scenes, system diagrams, end cards. This is close to HyperFrames' home ground and the registry covers much of it.
- **Hard:**
  - *Photoreal product hero shots* (Apple's device renders with real light, smoke and debris). Not reproducible with free assets. Workaround: make the UI the hero (Linear-style), use the registry GLTF device block for phones/laptops, or render your own product in Blender if a 3D model exists.
  - *Filmed footage of people using the product.* Not available. Workaround: UI-only scenes, or hands-free device mockups.
  - *Smoke, rain and particle realism.* Workaround: shader blocks (`godrays`, `aurora`) or free overlay clips with `mix-blend-mode: screen`; keep them brief.
  - *Music quality.* Launch films use licensed or commissioned tracks with precise builds. Workaround: pick free tracks with a clear structure and edit the film to the track, not the other way round.
  - *Render cost of blur and 3D transforms.* Workaround: small blur radii, short blur durations, pre-render static glows.
  - *Object-to-object transforms* (chassis to edge, chamber to heat map). Easy for UI (a panel morphs into the next state, a card expands into a screen); hard for hardware without 3D models. Workaround: build the transforms from UI states and simple SVG diagrams.
  - *Keeping 100% motion in text-only scenes.* Easy but must be planned: every text-only line needs a sweep, blur-in or spacing settle, otherwise our renders hold still for 1.5-2 s per line.
- **Fidelity estimate:** 80-90% for a Linear-style UI launch; 50-60% for an Apple-style hardware film without product renders. The motion targets in section 14 are reachable in both cases; the gap is the photoreal product.

## 14. Self-check targets
Measure a render with `python templates/motion_metrics.py render.mp4 --json out.json` and count cuts with ffmpeg scene detection (> 0.3). A reviewer checks the sentences from snapshots taken every 0.5 s.

```yaml
style: kinetic-type-launch
moving_frames_pct_min: 80        # reference 86.5 whole film, 100 in the first half
holds_2s_per_min_max: 1.5        # reference 1.0: only the end card / fade to black
cuts_per_min: [15, 30]           # reference 23, cut on beats
text_only_scenes_allowed: true   # they are the point: about half the lines sit on plain black
characters_required: false       # the product UI is the performer
colour_source: "brand"           # black and greys plus one brand accent
checks:
  - "No two snapshots 0.5 s apart are identical before the end card: every text-only line shows a sweep, blur-in or spacing change."
  - "At least one product/UI object turns into the next object (a panel becomes a screen, a part becomes a diagram) instead of a plain cut."
  - "Every line is 2-6 words, one line on screen at a time, with one bright key word; the slam words appear once, early, and the film ends on name, tagline and logo with at most 5 s of black."
```
