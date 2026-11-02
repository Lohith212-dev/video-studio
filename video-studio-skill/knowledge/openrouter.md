# OpenRouter: optional paid pictures and video clips

> **UNTESTED.** Nobody has run this end to end yet. Endpoints were checked on openrouter.ai in Oct 2026, but the exact request and response shapes were not. On first use, read https://openrouter.ai/docs (images, videos, audio) and fix `templates/openrouter.mjs` if a field name differs. Tell the user the first run is a test.

OpenRouter is one account and one key that reaches many image, video and voice models. It is **optional**. Without it the skill uses free drawings, photos and sounds, which is enough for most styles.

## Asking for the key (once)

At setup and at stage 1, if `OPENROUTER_API_KEY` is not set and the user hasn't said no, ask once:

> "Do you have an OpenRouter key? It's optional; it lets me generate pictures and short video clips for B-roll."

- **No** → record `openrouter: false` in project.json; don't ask again for this project.
- **Yes** → ask them to paste it. Store it only as an environment variable:
  - Mac: add `export OPENROUTER_API_KEY="..."` to `~/.zshrc`, then `source ~/.zshrc`.
  - Windows: `setx OPENROUTER_API_KEY "..."` (new terminals see it).
- **Never** write the key into project files, project.json, logs, the board, git, or chat summaries. Never print it. To check it's set, test only whether the variable exists (the doctor scripts say "set" or "optional, not set").

## When it helps

| Use | Styles |
|---|---|
| Photos and photo-like B-roll (people at work, places, objects) | Vox, Johnny Harris, Vaibhav Sisinty, Aevy TV, Fireship |
| Short video clips (3-8 s) for cutaways | Vaibhav Sisinty, Aevy TV, Fireship, Johnny Harris |
| Custom illustrations in a set look (a scene the free libraries don't have) | Kurzgesagt, Ray Dalio props, any style |

Not needed for: Ray Dalio charts, whiteboard, kinetic type, most of Kurzgesagt (drawn in code).

## What it offers (checked Oct 2026)

| Kind | Endpoint | Models (examples) | Rough cost |
|---|---|---|---|
| Pictures | `POST https://openrouter.ai/api/v1/images` | `openai/gpt-image-2.5-flare` (tested: transparent cut-outs, `aspect_ratio`, `quality: "medium"`, `input_references` for a second pose), Gemini 2.5 Flash Image, Seedream 4.5, FLUX.2 Pro | gpt-image-2.5-flare medium: about $0.01 per image, about $0.02 with a reference image (measured); others about $0.05-0.13 |
| Video clips | `POST https://openrouter.ai/api/v1/videos`, then poll until done | Veo 3.1, Kling 3.0, Wan, Seedance, Hailuo, Runway | about $0.03-0.40 per second of video |
| Voice / sound effects | `POST https://openrouter.ai/api/v1/audio/speech` | TTS models; Seed Audio can also make sound effects | varies |
| Music | not confirmed | — | use the free starter kit |

Check the model list and prices on openrouter.ai/models before each project; they change.

**Rights:** each picture or clip follows the terms of the model that made it (openrouter.ai/terms §6.1). Check the model's terms before using output in a paid ad, and say so in the credits.

## The money rule

Before every batch of paid generations, say the estimated cost and wait for a yes:

> "I'd like to make 6 pictures with FLUX.2 Pro (about $0.30 total) and 2 five-second clips with Kling (about $2). OK?"

- One batch = one yes. A redo of a failed picture counts as a new batch if it costs more than $0.50.
- Keep a running total in `project.json → openrouterSpend` (dollars) and mention it at the final review.
- Start cheap: one test picture before a batch, so a wrong look costs one picture, not ten.

## Saving outputs

- Save to `assets/generated/` in the project, named after the frame: `f05-office.png`, `f09-street.mp4`.
- Add one line per file to `assets/generated/CREDITS.md`: `f05-office.png — FLUX.2 Pro via OpenRouter, prompt: "...", 2026-10-30`. The helper does this for you.
- In the storyboard, mark the frame's source as `gen:<model>:<prompt>`.
- The description's credits get one line: "Some images and clips generated with <models> via OpenRouter."

## The helper (untested)

```
node <skill>/templates/openrouter.mjs image "<prompt>" --model <model-id> --out assets/generated/f05.png [--size 1536x1024]
node <skill>/templates/openrouter.mjs video "<prompt>" --model <model-id> --seconds 5 --out assets/generated/f09.mp4
```

Add `--dry-run` to see the request without sending it (no cost). It reads the key from `OPENROUTER_API_KEY` and never prints it. Run it from the project folder.
