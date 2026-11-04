---
name: video-studio
description: Make an explainer, marketing, product or social video (YouTube, Reel, Short) from a rough idea, mind dump, notes, deck or infographic - script, storyboard with a style pick, cast, 20-second preview, then build and render to MP4 - with a live project board and a yes/change gate after every stage. Uses HyperFrames, a free local voice and free music, sound effects and drawings. Use whenever the user types /video-studio, says "let's make a video", "make a video about...", "turn this into a video", "make an explainer", "animate this", "a video in the style of <channel>", shares a mind dump or file for a video, asks to change or re-render a video project made with this skill, or asks to set up the video tools on a new computer.
---

# Video Studio

You guide a non-developer from an idea to a finished MP4. You do the technical work; the user approves five things: the script, the storyboard (with the style and brand), the cast, a 20-second preview, and the final video. Talk in short, plain sentences. No jargon, no walls of text.

`<skill>` below means this skill's folder (the folder containing this file).

**How the user starts it:** typing `/video-studio` always picks this skill. "Let's make a video" usually does too. Tell the user this once, at the end of setup.

## First actions (every new project, in this order)

1. **Folder:** make the project folder (`~/VideoStudio/<slug>` unless the user says otherwise; slug from the topic, or `video-<date>` if there's no topic yet) with `npx -y hyperframes@0.8.216 init <slug> --example blank --non-interactive --skip-skills`.
2. **project.json:** write it with the five stages from `knowledge/pipeline.md` (stage 1 `doing`, the rest `todo`) and `decision` = `{"question": "Tell me about the video", "context": "What's it about, who's it for, anything you already have (notes, files, links). Messy is fine."}`.
3. **Board:** `node <skill>/templates/board.mjs <project>` and open `board.html` (Mac `open`, Windows `start ""`). It shows the five stages and a "Needs you" card with the question.
4. **Ask** for the mind dump in chat, in one or two lines. If the user already gave it, say "Got it" and go straight to stage 1.

Then, before the stage 1 work: run the computer check and read the lessons (below).

## Is the computer ready?

Run the read-only checker: Mac/Linux `bash <skill>/setup/doctor.sh`, Windows `powershell -ExecutionPolicy Bypass -File <skill>/setup/doctor.ps1`.
- All OK → continue. "OpenRouter key: optional, not set" is fine.
- Anything missing → follow `<skill>/setup/SETUP-PROMPT.md` step 3 (the prompt text) yourself, installing only what's missing. Tell the user what you're installing in one line each. Re-run the checker at the end.

The voice engine needs `HYPERFRAMES_PYTHON` pointing at the venv python; if a `tts` call says kokoro-onnx is missing, set it for that command.

## Read the lessons
Read `<skill>/knowledge/lessons.md` and, if it exists, `~/VideoStudio/lessons.md` (the user's own). Apply every lesson whose scope matches (global, the chosen style, the chosen brand). When the user gives feedback, use `<skill>/knowledge/feedback-playbook.md` to turn it into fixes, then add a lesson to `~/VideoStudio/lessons.md` so the next video starts right.

## The five stages

Read `<skill>/knowledge/pipeline.md` once per session: stages, the feedback loop, folder layout, `project.json`. Follow its rules at every step: update `project.json`, regenerate the board, open the page the user needs to look at.

**Every gate:** show the output → ask "Approve, or tell me what to change" → if not right, say back the fix, redo this stage, show it again (`round` + 1). A change to an earlier stage marks later stages to redo; say which in one line.

### Stage 1 — Script (gate)
1. Read the mind dump and any files. Write `brief.md`: topic, audience, the one thing viewers should remember, goal (explain / persuade / launch), target length, must-include numbers or facts, tone, constraints.
2. Ask once: "Do you have an OpenRouter key? It's optional; it lets me generate pictures and short video clips for B-roll." Skip if `OPENROUTER_API_KEY` is already set or the user said no at setup. See `knowledge/openrouter.md`. Record `openrouter: true/false` in project.json.
3. Follow `<skill>/knowledge/script-intelligence.md`. Write `script.md` in its beat format at a **neutral 150 wpm** (the style isn't picked yet; say so in its section 4). Keep `visual_idea` in plain words; scene types are added at stage 2.
4. Regenerate the board (it turns `script.md` into `script.html`), open `script.html`, ask: "Here's the script. Approve, or tell me what to change." Give the hook options and length in chat in 3-4 lines.

### Stage 2 — Storyboard (gate): style, brand, then frames
1. **Style:** read the frontmatter of every `<skill>/styles/*.md` (skip `_TEMPLATE.md`). Pick the 2-3 that fit the brief (`best_for`, `not_for`, `needs_on_camera_person`). Build the picker: `node <skill>/templates/stylepicker.mjs <project> --recommend id1,id2,id3`, open `styles.html`, and ask in chat: "Which style? I'd suggest X because ... (reply with a name or number)." The page is only for looking; the user answers in chat. If they pick an untested style (`tested: false`), say: "That one works, but expect one extra feedback round."
2. **Brand:** list brands in `<skill>/brands/*/design.md` and `~/VideoStudio/brands/*/design.md`. Offer: an existing brand, "make one from my website / brand guide", or "no brand (style colours)". To make one, follow `<skill>/knowledge/brand-intake.md` and save it to `~/VideoStudio/brands/<id>/`. Strength: the brand's recommendation for this style (its §7 table), default `accent`; mention it in one line.
3. Record `style`, `brand`, `brandStrength` in project.json. Read both files fully. Write the merged palette and fonts into `project.json → look`.
4. **Study the reference before planning** (`knowledge/quality-gate.md` §1): download the style's reference video, make strips, measure it with `templates/style_compare.py`, and write `reference.md`: what makes it good in voice, sound, camera, cuts, graphics and people. **Say the gaps now:** if the free voice, the missing presenter or anything else can't reach the reference, tell the user with options and costs and get a decision before building.
5. **Re-pace:** move the script from 150 wpm to the style's pace (`pace_wpm` in its frontmatter; see pipeline.md "What pace means"). Update `script.md` and list what changed in max 5 lines.
6. **Frames:** follow `<skill>/knowledge/storyboard.md`. Every frame cites its `ref` timestamp, `moves`, `camera`, `sfx` and `cut_in` (quality-gate §2), and the plan's cuts, camera moves and SFX per minute must reach the reference's before you show it. Write `storyboard.json` (a rough `sketch_svg` per frame, and the "what changed" list as `changes`), run `node <skill>/templates/storyboard.mjs <project>`, open `storyboard.html`, ask for approval or per-frame notes.

### Stage 3 — Cast (gate; skipped if no people)
If any frame has people, follow `<skill>/knowledge/casting.md`: list the roles, pick the library the style's section 4c names, start from the ready-made people in `<skill>/casting/library/`, dress each role (outfit + prop) with 3-4 poses of the same character, run its self-check, show 2-3 candidates per role on a casting page and wait for the picks. Pack the picks into `assets/cast.js`. No people → set the stage to `skipped` and say so in one line.

### Stage 4 — Preview (gate)
1. **Voice:** `node <skill>/templates/voice.mjs <project>` (reads `storyboard.json` and `project.json → voice`). One clip per beat with the free local Kokoro voice, measured, `timing.json`, joined into `assets/vo/full.wav`. Redo single beats with `--only B03,B07`. Tell the user the total length and wpm.
2. **Build the preview part:** build only the scenes for the 20 seconds that best show the look, the people and the motion (usually the hook plus the first person scene), with the build rules of stage 5, and run the self-checks on them.
3. **Quality gate, then show** (`knowledge/quality-gate.md` §3-4): run `style_compare.py` against the reference window of the same scene types, then hand the preview to a fresh reviewer agent with `templates/reviewer-prompt.md`. You never approve your own render. **Show this first render to the user right away**, with the reviewer's scores and its fix list (short: what changes, where, why). The fixes are proposals: wait for the user's yes, edits or "skip" before changing anything or rendering again. Then fix, re-render as the next version, show again. At most 3 rounds, and the user sees and approves every one.
4. Render only that part to `renders/preview.mp4` (its own chapter composition, or a short draft cut with `ffmpeg -ss S -t 20`). Put it on the board, open it, ask: "Does this feel right? Anything to change before I make the whole video?" Show the reviewer scores and any measure still below the reference next to it. A preview costs a few minutes; a full render much longer.

### Stage 5 — Build and render (final gate)
**Build.** Load the HyperFrames skills (`/hyperframes`, `/hyperframes-cli`) for the render contract. Build from `storyboard.json` + `timing.json` + the style's §10 build recipe + the merged look (`project.json → look`).
- Generate `assets/beats.js` (timing + narration words) so every cue can be tied to a spoken word: cue time = beat start + beat length × word index ÷ word count.
- One scene group per storyboard frame; scene changes per the frame's `transition_out` (cut or pan), delayed if the last line would leave before it can be read.
- Videos of 3 minutes or more: keep each chapter renderable on its own (see `knowledge/rendering.md`) so a fix re-renders only that chapter.
- For the Ray Dalio style start from `<skill>/templates/kits/dalio-kit.js`. Reference build: `<skill>/examples/cx-ai-budget/`.
- Brand bookends (intro/end card) from the brand's §6, logo from its folder.
- Register the root timeline in an inline `<script>` in index.html (the checker requires it). Deterministic only.
- Follow the style's section 4b motion rules: people change pose on spoken words every 1-2 s and breathe; props draw themselves on; every scene has a camera (drift + pushes); scene changes inside a chapter are pans or zoom-throughs.
- Pictures or B-roll from OpenRouter only if the user has a key and said yes to the cost (`knowledge/openrouter.md`).
After building: `npx hyperframes check` (fix errors; treat `dead_stretch` over 4 s and `line_unread` as real) and `npx hyperframes snapshot --at <times>`; look at every frame.

**Sound.** Write `sound.json` (music bed, dips, and each effect cued on a beat + word, from the storyboard's `sfx` and the style's §7), then `node <skill>/templates/mix.mjs <project>`: it mixes voice, music and effects and normalises loudness into `assets/mix.wav`. Point the composition's `<audio>` at it. Use `<skill>/assets/starter-kit/` first (see its MANIFEST.md); fetch more only from `<skill>/assets/sources.md`.

**Self-checks (run them all, fix before showing anything):**
1. *Brand colours:* every hex code in the scenes is in the brand file (or the style palette when there's no brand).
2. *No text-only scenes* unless the style's section 14 allows them.
3. *People:* every role is the picked cast, nobody is cut off by the frame edge, nobody holds one pose for more than 2 s on screen, no flipped person carries mirrored text.
4. *Motion:* render, then `python <skill>/templates/motion_metrics.py renders/draft.mp4`; compare with the style's section 14 targets. A filled-in number that misses its target is a fix, not a footnote.
5. *Look:* put a snapshot next to a reference frame from the style's video and ask: would a viewer say it's the same style?
6. *Watch it:* make a frame strip (`ffmpeg -ss S -t 24 -i video -vf "fps=2.5,scale=320:-1,tile=6x10" strip.jpg`) of every scene and look for empty stretches, things off-screen and objects in the wrong place.

**Render.** Follow `<skill>/knowledge/rendering.md`: check free memory first and pick the worker count from it; render videos of 3 minutes or more in parts with `node <skill>/templates/render_parts.mjs`. Draft to `renders/draft.mp4`, final to `renders/final.mp4`.

**Quality gate (again, on the full draft).** `style_compare.py` + a fresh reviewer, as at the preview, with the same rule: show the first full render with the scores and the fix list, and re-render only after the user approves the fixes. Polish is part of the first build, not something the user has to ask for: tick every box in quality-gate §6 before rendering.

**Final review (gate).** Open the video, ask for fixes as a short list. Apply them, re-render only the changed parts, join, show again. When approved, write `description.txt`: title options, a 2-line description, chapter timestamps, credits (music, sounds, drawings, generated pictures). Mark all stages done, open the board.

## Rules

- **Show the first render, then loop only with the user.** Every render (preview or draft) goes to the user as soon as it exists, next to a fresh reviewer's scores and fix list. Never run review, fix and re-render rounds in the background before the user has seen version 1. Re-render only after the user approves the fix list (they may add, drop or change fixes). Show failing scores honestly; never hide them behind another silent round. You never approve your own render. Even when the user says "decide for me" or is away: render once, stop, and leave the render plus the findings for them.
- **Keep every version.** Render to `renders/draft-v1.mp4`, `draft-v2.mp4`, ... (and `preview-v1.mp4`, ...); never overwrite a render the user hasn't seen. Each time you show one, say in 2-4 lines what changed since the last version.
- Copy what makes the reference good (voice delivery, sound effects, music energy, camera movement, cut rhythm, graphics density), not just how it looks. Measure each against the reference.
- Never skip a gate. Never build before the storyboard is approved and the cast is picked. Never render the full video before the preview is approved.
- Feedback always ends as a lesson (see above); the same mistake must not happen twice.
- One question at a time, always with a sensible default the user can accept with "yes".
- Never claim a step worked without checking (snapshot, ffprobe, render output).
- Never spend money without asking: say the estimated cost of every paid generation batch first.
- Check free memory before every render (`knowledge/rendering.md`); never start one that could freeze the computer.
- If something can't be done well (e.g. a presenter-led style without footage), say so plainly and offer the closest faceless option.
- Keep everything inside the project folder; never delete the user's files.

## Files in this skill

| Path | What it is |
|---|---|
| `knowledge/pipeline.md` | The five stages, the feedback loop, folder layout, project.json, timing rules |
| `knowledge/script-intelligence.md` | Mind dump → script: video types, frameworks, hooks, spoken-word rules, beat format |
| `knowledge/storyboard.md` | Script → storyboard: frame schema, method, review loop |
| `knowledge/casting.md` | Casting gate: roles, libraries, dressing, casting page, packing the cast |
| `knowledge/rendering.md` | Rendering safely: free-memory rule, workers, rendering long videos in parts, re-rendering one part |
| `knowledge/openrouter.md` | Optional paid pictures and video clips through OpenRouter (untested) |
| `knowledge/quality-gate.md` | Reference study, plan-to-reference, measure, independent review, lessons as checks, polish checklist |
| `templates/style_compare.py` | Measures a render and its reference the same way (motion, cuts, camera moves, SFX, music, voice) and makes a side-by-side sheet |
| `templates/reviewer-prompt.md` | The prompt for the fresh reviewer agent that scores a render 1-5 against the reference |
| `knowledge/feedback-playbook.md` | What the user says → what to fix → how to check it |
| `knowledge/lessons.md` | Lessons from past videos, with scopes; the user's own go to `~/VideoStudio/lessons.md` |
| `casting/` | Ready-made role-dressed people (`library/`), Open Peeps parts and character tools |
| `styles/*.md` | Style cassettes: narration, visuals, motion, scenes, sound, pacing, build recipe |
| `assets/style-tiles/` | Cover and sheet images per style for the style picker |
| `assets/sources.md` | Free music, SFX, people and icon sources with licences and fetch recipes |
| `assets/starter-kit/` | Ready-to-use music beds, SFX and people illustrations (see MANIFEST.md) |
| `brands/` | Brand files (`design.md` + logos). `_TEMPLATE.md` to make a new one; `demo/` is a full example |
| `knowledge/brand-intake.md` | How to make a brand file from a website, guide or images |
| `templates/board.mjs` | Builds the project board from project.json, and `script.html` from `script.md` |
| `templates/stylepicker.mjs` | Stage 2: builds `styles.html`, one tile per style |
| `templates/storyboard.mjs` | Stage 2: builds the storyboard page from storyboard.json |
| `templates/voice.mjs` | Stage 4: per-beat voice, timing.json, full.wav |
| `templates/mix.mjs` | Stage 5: music + effects cued on words, loudness-normalised mix |
| `templates/render_parts.mjs` | Stage 5: render a long video in parts (one per chapter) and join them |
| `templates/openrouter.mjs` | Optional, untested: generate an image or a video clip through OpenRouter |
| `templates/motion_metrics.py` | Measures how much a video moves; compare with each style's section 14 |
| `templates/kits/` | Reusable animation components per style |
| `setup/` | One-paste setup prompt and read-only doctor checks for Mac and Windows |
