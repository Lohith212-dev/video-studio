# Video Studio — one-paste setup prompt

**Who this is for:** anyone setting up the video pipeline on a new Mac or Windows PC.
**Before you paste it:** install Claude Code and sign in (two steps, below). Then open Claude Code in an empty folder where your videos will live, and paste the prompt.
**Using the Claude desktop app?** Open its **Code** tab, choose a folder for your videos (e.g. a new `VideoStudio` folder in your home folder), and paste the prompt from step 3. Skip steps 1 and 2.

## Step 1 — Install Claude Code

**Mac** (open the Terminal app, paste, press Return):

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows** (open PowerShell, paste, press Enter):

```powershell
irm https://claude.ai/install.ps1 | iex
```

Close the terminal and open a new one. Check it worked:

```bash
claude --version
```

## Step 2 — Sign in

```bash
mkdir -p ~/VideoStudio && cd ~/VideoStudio
claude
```

A browser window opens. Sign in with your Claude account (Pro, Max, Team or Enterprise). Come back to the terminal.

## Step 3 — Paste this prompt into Claude Code

```text
Set up this computer for the Video Studio pipeline. I am not a developer, so do everything for me, explain each step in one short plain sentence, and only ask me when you need my password or a click.

Work in this order and check before installing anything (skip what is already there, never downgrade, never remove anything):

1. Detect the system: macOS (Apple Silicon or Intel) or Windows. Tell me which.
2. Package manager:
   - Mac: Homebrew. If `brew` is missing, install it with the official command from https://brew.sh (it will ask for my Mac password once; tell me before it does). After install, make sure `brew` is on my PATH for new terminals (follow Homebrew's "Next steps" output).
   - Windows: winget (built into Windows 10/11). If missing, tell me to install "App Installer" from the Microsoft Store.
3. Node.js 22 or newer (HyperFrames needs 22+):
   - Check `node -v`. If missing or older than 22: Mac `brew install node@22` then link it (`brew link --overwrite --force node@22`); Windows `winget install OpenJS.NodeJS.22`.
   - Before upgrading an existing older Node, list my global npm packages (`npm ls -g --depth=0`) and tell me if any project folder pins an old Node version (.nvmrc / "engines"). Upgrade only if nothing would break; otherwise stop and ask.
4. FFmpeg (video and audio processing): check `ffmpeg -version`. Mac `brew install ffmpeg`; Windows `winget install Gyan.FFmpeg`. Open a new shell session afterwards if needed so it is on PATH.
5. Python 3.10+ for the free local voice:
   - Check `python3 --version` (Mac) or `python --version` / `py --version` (Windows). Mac: `brew install python@3.12` if missing. Windows: `winget install Python.Python.3.12`.
   - Create a private environment just for the voice engine at ~/VideoStudio/.venv (do not touch the system Python): `python3 -m venv ~/VideoStudio/.venv`, then install `kokoro-onnx soundfile` into it.
   - Make HyperFrames use it: set the environment variable HYPERFRAMES_PYTHON to that venv's python (Mac: ~/VideoStudio/.venv/bin/python, add an export line to ~/.zshrc; Windows: %USERPROFILE%\VideoStudio\.venv\Scripts\python.exe, set as a user environment variable).
6. HyperFrames (the video renderer):
   - Check it runs: `npx -y hyperframes@0.8.216 --version`. Note the version.
   - Install the HyperFrames Claude Code plugin: `claude plugin marketplace add heygen-com/hyperframes` then `claude plugin install hyperframes@hyperframes`.
7. The Video Studio skill:
   - If ~/Downloads/video-studio-skill.zip is missing, download it from https://github.com/Lohith212-dev/video-studio/releases/latest/download/video-studio-skill.zip into ~/Downloads. Unzip it (Windows: Expand-Archive) and copy the `video-studio-skill` folder into ~/.claude/skills/video-studio (create the folders if needed).
   - Confirm ~/.claude/skills/video-studio/SKILL.md exists.
8. Optional OpenRouter key. Ask me once: "Do you have an OpenRouter key? It's optional; it lets me generate pictures and short video clips for B-roll." If I say yes, ask me to paste it and store it only as the environment variable OPENROUTER_API_KEY (Mac: an export line in ~/.zshrc; Windows: setx OPENROUTER_API_KEY). Never write it into any other file or log, and never show it back to me. If I say no, skip it; everything else works without it.
9. Smoke test, all inside ~/VideoStudio/smoke-test:
   - `npx -y hyperframes@0.8.216 init smoke-test --example blank --non-interactive`
   - Generate 3 seconds of voice: `npx -y hyperframes@0.8.216 tts "Video Studio is ready." --voice am_michael -o smoke-test/assets/hello.wav`
   - Put a title "Video Studio is ready" in the composition, add the audio, and render it: `cd smoke-test && npx -y hyperframes@0.8.216 render --output ../smoke-test.mp4`
   - Open the MP4 for me (Mac: `open ../smoke-test.mp4`; Windows: `start ..\smoke-test.mp4`).
10. Finish with a short checklist table: each item, the version found or installed, and OK / FIXED / NEEDS YOU. Then tell me to restart Claude Code once so the new plugin and skill load, and that afterwards I start a video by typing /video-studio (that always picks the skill; "Let's make a video" usually works too).

If any step fails, try the obvious fix once, then explain the problem in one plain sentence and what I should do. Never use sudo with npm. Never delete files.
```

## What it installs (for the curious)

| Piece | Why it's needed |
|---|---|
| Homebrew (Mac) / winget (Windows) | Installs everything else safely |
| Node.js 22+ | Runs HyperFrames |
| FFmpeg | Cuts and joins video and audio |
| Python + Kokoro voice | Free voiceover on your own computer |
| HyperFrames + its Claude plugin | Turns scenes into the final MP4 |
| Video Studio skill | The five-stage pipeline: script → storyboard → cast → preview → video |
| OpenRouter key (optional) | Paid pictures and short clips for B-roll; skip it and everything still works |
