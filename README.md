# Video Studio

**Turn a mind dump into an explainer video.** A free Claude skill: you give it your notes, a call transcript or an infographic, and it makes a finished video. It writes the script, picks a style, draws the scenes, adds a voice, music and sound, and renders an MP4. You approve each step. You don't need design skills or editing software.

**[Open the guide (slides) →](https://lohith212-dev.github.io/video-studio/)**   ·   **[Download the skill (zip) →](https://github.com/Lohith212-dev/video-studio/releases/latest/download/video-studio-skill.zip)**

## Install in 3 steps (about 10 minutes)
1. **Get the Claude desktop app** ([Mac](https://claude.ai/api/desktop/darwin/universal/dmg/latest/redirect) · [Windows](https://claude.ai/api/desktop/win32/x64/setup/latest/redirect) · [Windows ARM](https://claude.ai/api/desktop/win32/arm64/setup/latest/redirect)). Sign in with a Pro plan or higher, then open the **Code** tab.
2. **Download the zip** (link above) and make a folder called `VideoStudio` in your home folder. In the Code tab, choose that folder.
3. **Paste the setup prompt** from [`video-studio-skill/setup/SETUP-PROMPT.md`](video-studio-skill/setup/SETUP-PROMPT.md). Claude installs everything else and makes a 3-second test video.

Then start a new session and type **`/video-studio`**.

## How it works
Five stages. You check each one before the next starts:

| | Stage | You get |
|---|---|---|
| 1 | Script | A timed script from your notes |
| 2 | Storyboard | You pick a style and brand, then see one sketch per scene |
| 3 | Cast | Illustrated people dressed for each role (skipped if there are none) |
| 4 | Preview | The voice plus the first 20 seconds |
| 5 | Build and render | The MP4, plus a description with credits |

Not right? Say what to change, and Claude redoes that stage. A live project board shows where you are.

## Cost
Free by default: an open-source voice, free music and sounds, and illustrated people, all running on your computer. You only need your Claude plan.
**Optional:** an [OpenRouter](https://openrouter.ai) key adds an expressive voice (roughly $0.20–0.40 per video) and AI photos of people (about $0.01–0.02 each). Claude always asks before spending.

## What's in this repo
- `video-studio-skill/`: the skill (also in the zip). Its own [README](video-studio-skill/README.md) explains the parts.
- `docs/`: the guide (one HTML file).
- [`CREDITS.md`](CREDITS.md): style references, tools and assets.

## Credits and licence
Created by **Lohith Savala**. [MIT licence](LICENSE): free to use, change and share.
The styles are inspired by the public videos of Ray Dalio, Vox, Kurzgesagt, Johnny Harris, Fireship, Vaibhav Sisinty, Varun Mayya, Aevy TV and RSA Animate. This project is not affiliated with any of them. Full credits are in [CREDITS.md](CREDITS.md).
