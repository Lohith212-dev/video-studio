# The Video Studio pipeline

Five stages. Each one ends with something the user looks at and says yes or "change this". Setup happens once per computer and is not a project stage.

```
Setup (once per computer)

1 Script ──► 2 Storyboard ──► 3 Cast ──► 4 Preview ──► 5 Build and render
  GATE          GATE            GATE        GATE           GATE (final review)
```

| # | Stage | What Claude does | What the user reviews | Output |
|---|---|---|---|---|
| 1 | Script | Brief + timed script from the mind dump, at a neutral 150 wpm | The script, as a readable page | `brief.md`, `script.md` → `script.html` |
| 2 | Storyboard | User picks style + brand (on `styles.html`), Claude re-paces the script for the style and shows what changed, then sketches one frame per idea | The storyboard page | `styles.html`, `storyboard.json`, `storyboard.html` |
| 3 | Cast | 2-3 candidates per role, dressed for the job (`knowledge/casting.md`). **Skipped if no people.** | The casting page | `casting.json`, `casting.html`, `assets/cast.js` |
| 4 | Preview | Voice for the whole script, then builds and renders the first or hardest 20 seconds | The voice length + a 20-second clip | `timing.json`, `assets/vo/`, `renders/preview.mp4` |
| 5 | Build and render | All scenes, sound, self-checks, render (in parts for long videos, see `knowledge/rendering.md`), description with credits | The full video | `renders/final.mp4`, `description.txt` |

## The feedback loop (every gate)

Every gate works the same way:

1. Show the output (open the page or video), set the stage to `waiting`, put the question on the board's "Needs you" card, ask the same question in chat.
2. **Approve** → stage `done`, move on.
3. **Not right?** The user says what to change → Claude says back the fix in one line per item (use `knowledge/feedback-playbook.md`) → redoes this stage → shows it again. Add 1 to the stage's `round`.
4. **A change to an earlier stage** (e.g. a script edit during the preview) marks every later stage `todo` again. Say in one line what will be redone ("Script changed, so I'll redo the storyboard frames for beats 4-6 and the preview").
5. Feedback that would apply to the next video becomes a lesson (`knowledge/lessons.md`).

Never pass a gate without an answer.

## What "pace" means here

Words per minute (wpm) depends on the style: Ray Dalio is about 128, Vox 173, Fireship 206. The style is picked at stage 2, after the script. So:
- Stage 1 writes the script at a **neutral 150 wpm** and says so in `script.md` (section 4).
- Stage 2, right after the style pick: re-pace lightly. Change the word budget to the style's wpm (trim or add a few words per beat, split long sentences for fast styles), keep the facts and the spine. Show a short "What changed for this style" list (max 5 lines) at the top of the storyboard page and in chat. Big rewrites need the user's yes first.

## Project folder layout

```
<project-slug>/
  project.json        # stages, decisions, history: the board reads this
  board.html          # the control board (regenerated after every step)
  brief.md
  script.md           # script.html is made from it by board.mjs
  styles.html         # style picker (stage 2)
  storyboard.json
  storyboard.html
  casting.json  casting.html
  timing.json
  index.html          # HyperFrames root composition
  compositions/       # one HTML file per scene or chapter
  assets/
    vo/  music/  sfx/  people/  images/  generated/
  snapshots/
  renders/            # preview.mp4, parts/, final.mp4
  description.txt
```

## project.json (the single source of truth)

```json
{
  "title": "Why a $1.2M AI budget pays for itself",
  "slug": "cx-ai-budget",
  "createdAt": "2026-10-30T05:30:00Z",
  "stage": 2,
  "setup": "done",
  "stages": [
    {"id": 1, "name": "Script", "status": "done", "file": "script.html", "round": 2,
     "items": [{"text": "Brief from the mind dump", "done": true}, {"text": "14 beats at 150 wpm", "done": true}]},
    {"id": 2, "name": "Storyboard", "status": "waiting", "file": "storyboard.html",
     "choice": "Ray Dalio style + demo brand",
     "items": [{"text": "Style and brand picked", "done": true}, {"text": "Script re-paced to 128 wpm", "done": true}, {"text": "14 frames sketched", "done": true}]},
    {"id": 3, "name": "Cast", "status": "todo", "file": "casting.html"},
    {"id": 4, "name": "Preview", "status": "todo", "file": "renders/preview.mp4"},
    {"id": 5, "name": "Build and render", "status": "todo", "file": "renders/final.mp4"}
  ],
  "decision": {
    "question": "Approve the storyboard?",
    "options": ["Approve all", "Change frames (say which)", "Back to the script"],
    "context": "14 frames, 3:02 at 128 wpm",
    "link": "storyboard.html", "linkLabel": "the storyboard"
  },
  "style": "ray-dalio-principles",
  "brand": "demo",
  "brandStrength": "accent",
  "voice": {"id": "am_michael", "speed": 0.92},
  "lengthTargetSec": 180,
  "openrouter": false,
  "log": [
    {"at": "2026-10-30T05:31:00Z", "text": "Script written from mind dump"}
  ]
}
```

- Statuses: `todo`, `doing`, `waiting` (needs the user), `done`, `skipped` (Cast, when there are no people).
- `round`: how many times the stage was shown (starts at 1; +1 after each "change this").
- `decision`: the one open question. `null` when nothing needs the user.
- Older project.json files with the 0-9 stages still open in `board.mjs`; new projects use the five above.

## Rules the agent follows at every step

1. Before starting a stage: set it to `doing`, regenerate the board (`node <skill>/templates/board.mjs <project>`), tell the user in one line what's happening.
2. At a gate: set the stage to `waiting`, fill `decision` with the question and 2-4 options (plus `link` to the page to look at), regenerate the board, open the page, ask the same question in chat.
3. After a gate is approved: set it to `done`, add a `log` line, clear `decision`.
4. Going back: see the feedback loop above.
5. Keep messages short and plain: the user is not a developer.
6. Open files for the user with Mac `open <file>`, Windows `start "" <file>`.

## Timing rules (stage 4 → 5)

- Generate the voice **per beat** (one WAV per beat) with `node <skill>/templates/voice.mjs`, using the style's voice and speed, so each beat's exact length is known.
- Add the style's pause between beats (default 0.35 s) and write `timing.json`: `[{"beat": "b01", "start": 0.0, "dur": 4.82, "file": "assets/vo/b01.wav"}, ...]`.
- Scenes take their start and length from `timing.json`. Inside a beat, place cues at fractions of the beat length based on where the trigger word sits (word index / word count × duration), then nudge after a snapshot check.
- If a transcriber is available (`npx hyperframes transcribe` with whisper or parakeet installed), use word timestamps instead of fractions.
