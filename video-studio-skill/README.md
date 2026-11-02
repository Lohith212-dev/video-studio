# Video Studio

A Claude Code skill that takes you from a rough idea to a finished explainer video. You talk; Claude does the technical work. The video is made in five stages, and you approve each one before the next starts.

## Install (once per computer)

1. Install the Claude desktop app and sign in (Pro, Max, Team or Enterprise plan). Or install Claude Code in a terminal:
   - Mac: `curl -fsSL https://claude.ai/install.sh | bash`
   - Windows (PowerShell): `irm https://claude.ai/install.ps1 | iex`
2. Open the **Code** tab in a folder for your videos (e.g. `~/VideoStudio`) and paste the prompt in `setup/SETUP-PROMPT.md` (step 3). It checks and installs everything else, including this skill. It also asks if you have an OpenRouter key (optional).
3. Restart Claude. Then type **`/video-studio`** (this always starts the skill; "Let's make a video" usually works too).

## What happens when you make a video

First, Claude makes a project folder and opens the project board (`board.html`). The board shows the five stages and a "Needs you" card with the one question Claude is waiting on. Then Claude asks for your mind dump.

| Stage | What Claude does | What you look at |
|---|---|---|
| 1. Script | Writes a brief and a timed script from your mind dump | The script page |
| 2. Storyboard | Shows the style picker; you pick a style and a brand in chat. Claude adjusts the script's pace to the style, then sketches one frame per idea | The style picker, then the storyboard |
| 3. Cast | Shows 2-3 people per role, dressed for the job (skipped if there are no people) | The casting page |
| 4. Preview | Records the voice and makes 20 seconds of the real video | A 20-second clip |
| 5. Build and render | All scenes, music and effects, self-checks, the final video and a description with credits | The full video |

At every stage: **not right? Say what to change.** Claude fixes it and shows it again. If you change an earlier stage, Claude says which later stages it will redo.

Long videos (3 minutes or more) are rendered in parts, so a fix to one chapter only re-renders that chapter.

## What's inside

- `styles/` — 10 style cassettes: Ray Dalio, Vox, Kurzgesagt, Johnny Harris, whiteboard sketch, product launch, Varun Mayya, Vaibhav Sisinty, Aevy TV, Fireship. Ray Dalio is tested end to end. Vaibhav Sisinty was tested, but his full look needs a real presenter on camera. The others work, but expect one extra feedback round. Styles are inspired by these creators' public videos; this project is not affiliated with them.
- `brands/` — brand files (colours, fonts, logo). `demo/` is a complete example; `_TEMPLATE.md` makes a new one.
- `knowledge/` — the guides Claude follows: pipeline, script intelligence, storyboard, brand intake, casting, rendering, OpenRouter, the feedback playbook, and lessons from past videos.
- `casting/` — ready-made people dressed for business roles (Open Peeps, free to use), plus the tools to make more.
- `assets/` — free music, sound effects and drawn people, with licences (`starter-kit/MANIFEST.md`, `sources.md`).
- `templates/` — the tools: project board, style picker, storyboard page, voice step, sound mix, rendering in parts, the optional OpenRouter helper, and the Ray Dalio animation kit.
- `examples/cx-ai-budget/` — a real 2:43 video built end to end with this skill.
- `setup/` — the one-paste setup prompt and read-only install checkers.

## Your feedback is remembered

When you say something like "it feels static" or "the people look wrong", Claude looks it up in the feedback playbook, fixes it, and writes a lesson to `~/VideoStudio/lessons.md`. Every new video starts by reading those lessons, so the same mistake doesn't happen twice.

## Costs

Everything runs on your computer for free (HyperFrames, the Kokoro voice, the asset kit). The only cost is your Claude plan. Some music needs a credit line in the video description; the skill adds it for you.

Optional: with an OpenRouter key, Claude can use an expressive voice (ElevenLabs v3, about $0.08 per 1,000 characters, so roughly $0.20-0.40 for a 2-3 minute video) and generate photos of people (about $0.01-0.02 each). Both are tested. It always tells you the cost and asks first. Short AI video clips are possible too, but untested.

## Credits and licence

Created by **Lohith Savala**. MIT licence (see `LICENSE` in the repository).
Style references credit their creators (see each file in `styles/`). Music, sound effects and drawings keep their own licences (see `assets/starter-kit/MANIFEST.md`); Kevin MacLeod tracks need the credit line the skill writes for you.
Built with Claude Code, HyperFrames by HeyGen, Kokoro and FFmpeg.
