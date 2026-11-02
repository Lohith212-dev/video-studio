---
id: <kebab-case-id>
name: <Human name, e.g. "Vox Explainer">
one_line: <What it looks and sounds like, in one sentence a non-designer understands>
best_for: [<e.g. data-heavy explainers, finance, policy>]
not_for: [<e.g. product demos, hype launches>]
needs_on_camera_person: <true|false>
build_difficulty: <easy|medium|hard>   # with HyperFrames + free assets
pace_wpm: "<words per minute, e.g. 150>"
signature_moves: [<3-4 short names of the moves people recognise>]
tested: false   # true once a full video in this style was built and approved
tested_note: "works, but expect one extra feedback round"
references:
  - title: <video title>
    url: <https://youtube.com/watch?v=...>
    timestamps: <e.g. 0:45-1:10 data scene, 2:30 transition>
---

# <Style name>

## 1. The idea in one paragraph
Why this style works, what feeling it creates, and the kind of viewer it is built for.

## 2. Narration
- **Voice:** gender-neutral description of tone (calm, wry, urgent), pitch, age feel.
- **Pace:** words per minute (measure from a reference transcript), pauses.
- **Sentence shape:** length, rhythm, use of questions, second person, jargon level.
- **Structure habits:** cold open? signposting? recap?
- **HyperFrames TTS pick:** which Kokoro voice (af_heart, af_nova, af_sky, am_adam, am_michael, bf_emma, bf_isabella, bm_george) and speed fits best, and why.

## 3. Visual system
- **Palette:** 4-8 hex values with roles (background, ink, accent 1, accent 2, highlight).
- **Typography:** display / body / label faces (Google Fonts names) with sizes at 1920x1080.
- **Backgrounds and texture:** paper, grain, grid, photos, gradients.
- **Illustration / imagery:** flat vector, hand-drawn, cut-out collage, stock footage, screenshots, 3D.
- **Layout:** framing, safe margins, where text sits, how dense a frame gets.

## 4. Motion language
- **Signature moves:** the 3-5 animations that make this style recognisable (exact behaviour, duration in seconds, easing as GSAP ease names).
- **Transitions between scenes:** cut / pan / zoom / wipe / match cut, and typical duration.
- **Camera:** static, slow push-ins, parallax, map flights.
- **Text reveals:** how words and numbers come on screen.

## 5. Scene grammar
A table of the recurring scene types (e.g. "data chart build", "map zoom", "quote card", "talking head + B-roll"), each with: purpose, typical length, layout, motion, what the narration does during it.

## 6. Data and numbers
How charts, numbers, comparisons and timelines are shown.

## 7. Sound
- **Music:** genre, tempo (BPM), energy curve, when it drops out.
- **Sound effects:** which kinds (whoosh, pop, paper, typewriter, riser), how often, how loud relative to voice.
- **Mix:** voice level vs music (e.g. music at -20 dB under voice), ducking.

## 8. Pacing
Average shot/scene length, cuts per minute, how long a number stays on screen, length of the whole video.

## 9. Assets needed and where to get them
People, icons, maps, footage, textures: what this style needs and which free sources (see assets/sources.md) supply it.

## 10. HyperFrames build recipe
Concrete implementation notes for an agent: layer order, SVG/CSS techniques, GSAP patterns, reusable components to build once, pitfalls. Point to registry blocks if relevant.

## 11. Storyboard frame spec
What each storyboard frame must specify for this style (e.g. background type, chart type, highlighted words, on-screen text, SFX cue).

## 12. Do and don't
5-8 bullets each.

## 13. Feasibility with our stack
What we can reproduce well, what is hard (and the workaround), and an honest fidelity estimate.
