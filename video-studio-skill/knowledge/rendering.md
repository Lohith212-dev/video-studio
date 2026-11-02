# Rendering: fast, safe, and in parts

Rendering turns the HTML video into an MP4. It is the step that can freeze the computer: every render worker is a separate Chrome. This page says how many workers to use, when to render in parts, and how to re-render only what changed. Tested with HyperFrames 0.8.216 (numbers at the bottom).

## 1. Before every render: check memory

1. **One render at a time** on the computer. If another render is running (another Claude chat, or `hyperframes render` / `chrome-headless-shell` processes using lots of memory), wait for it.
2. **Measure free memory:**
   - Mac: `vm_stat` → (free + inactive + speculative + purgeable pages) × page size. (Activity Monitor's "Memory Used" is not the same thing.)
   - Windows: `(Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory / 1MB` (GB).
3. **Under 2.5 GB free → don't start.** Tell the user in one line ("Your computer is low on memory; close Chrome tabs or other apps and I'll start the render") and check again every minute.
4. **Pick the workers from free memory:** `workers = free GB − 2`, rounded down, at least 1, at most 4.

   | Free memory | Workers |
   |---|---|
   | 2.5-3.9 GB | 1 |
   | 4-4.9 GB | 2 |
   | 5-5.9 GB | 3 |
   | 6 GB or more | 4 |

   Why: a render uses about **1.2 GB plus 1 GB per worker** (measured). Always pass `--workers N`. Never use the default `auto`: it sizes from the computer's *total* memory, not what's free (on a 16 GB machine it picked 5 workers and took free memory from 2.7 GB to 0.06 GB; that's how a background render got killed).
5. Computers with 8 GB or less: HyperFrames turns on its low-memory mode by itself (1 worker). Leave it on.

## 2. When to render in parts

Render in parts when:
- the video is **3 minutes or longer**, or
- feedback touches **only some chapters** (re-render just those), or
- the computer has little free memory (each part is short, so a crash loses only one part).

Otherwise render in one go: `npx -y hyperframes@0.8.216 render <project> --workers N -o renders/final.mp4` (add `--quality draft` for drafts).

## 3. How: `templates/render_parts.mjs`

```
node <skill>/templates/render_parts.mjs <project> --at 0,48.5,97,141 --out renders/final.mp4
```

- `--at`: where each part starts, in seconds. Use the chapter starts from `timing.json` (start of the first beat of each chapter), so a fix to one chapter lands in one part. Without `--at` it cuts every 60 s (`--every 60`).
- Workers: set from free memory by the rule above (override with `--workers N`). It waits if free memory is under 2.5 GB.
- Parts go to `renders/parts/part-01.mp4`, `part-02.mp4`, ... and are kept.
- It renders the parts one after another (never at the same time: each extra render costs another 1.2 GB), joins them without re-encoding, and lays the full soundtrack (`assets/mix.wav`, or `--audio <file>`) over the whole video once.
- It prints the frame count; it must equal the expected count.

**Re-render only what changed:**

```
node <skill>/templates/render_parts.mjs <project> --at 0,48.5,97,141 --only 2,3 --out renders/final.mp4
```

Use the same `--at` as before. Parts not listed are reused from `renders/parts/`. Which parts changed: the chapters whose frames you edited. Two rules:
- A change to **shared code** (the kit, `index.html`, colours, fonts, the cast) or to **timing** (new voice, `timing.json`) changes every part → render all parts.
- A change to the **sound only** (`sound.json`, mix) needs no video render: re-run `mix.mjs`, then put the new sound on the existing video: `ffmpeg -i renders/final.mp4 -i assets/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k renders/final-new.mp4`.

What it needs: the animation lives in the main timeline `window.__timelines["main"]` and clips use `data-start`/`data-duration` (how this skill builds every video). Each part is `index.html` played from its start to its end, written as `part-NN.html` next to it and deleted after.

**Checks after joining** (do them before showing the user):
- Frame count = duration × fps (the script prints both).
- Look at the frames just before and after each join (`ffmpeg -ss <join−0.1> -i renders/final.mp4 -frames:v 6 ...`): nothing should jump.

## 4. HyperFrames' own "segmented capture" (crash recovery only)

HyperFrames 0.8.216 can also split one render into segments:

```
HF_SEGMENTED_CAPTURE=true npx -y hyperframes@0.8.216 render <project> --workers N --keep-segments -o renders/final.mp4
HF_SEGMENTED_CAPTURE=true npx -y hyperframes@0.8.216 render <project> --workers N --keep-segments --resume -o renders/final.mp4
```

Segments are 3000 frames (100 s at 30 fps) by default (`HF_SEGMENT_FRAMES` changes it) and live in `renders/.hf-segments/<hash>/`. `--resume` skips segments already finished.

**Use it only to finish a render that crashed or was stopped.** Do not use `--resume` after editing the video: the hash only covers `index.html`, so after an edit in `assets/scenes.js` it reused every old segment in 6 s and the edit was **missing** from the video (tested). Editing `index.html` changes the hash and redoes everything. For edits, use `render_parts.mjs --only`.

(Workaround tested but not recommended: delete the changed `segment_000NN.mp4` files by hand, then `--resume` redoes just those. It works, but it's easy to miss a segment and ship a stale video.)

## 5. Measured on the test PC (Oct 2026)

Intel i9-13900HX (24 cores / 32 threads), 16 GB RAM with only 2.7-4.7 GB free (other apps open). Test: a 40-second copy of `examples/cx-ai-budget` (Ray Dalio style, 1200 frames, 1080p, 30 fps), default quality.

| Run | Workers | Time | Extra memory (peak) | Lowest free memory |
|---|---|---|---|---|
| (a) default (`auto`) | 5 | 128 s | 6.2 GB | **0.06 GB** (swapping) |
| (c) `--workers 1` | 1 | 229 s | about 2.2-2.4 GB | 1.1 GB |
| (c) `--workers 2` | 2 | **86 s** | 2.8 GB | 1.2 GB |
| (b) segmented capture, 4 segments of 10 s | 2 | 88 s | 3.1-3.6 GB | 0.5 GB |
| (d) `--resume`, nothing changed | — | 6 s | — | — |
| (d) `--resume` after editing one scene in `scenes.js` | — | 6 s, **edit missing (stale)** | — | — |
| (d) `--resume` after deleting the 2 changed segments | 2 | 48 s | 3.5 GB | 0.3 GB |
| (e) `render_parts.mjs`, 2 parts of 20 s | 2 | 88 s (43 + 44) | 2.6 GB | 1.0 GB |
| (e) `render_parts.mjs --only 2` | 1 (rule) | 82 s (44 s with 2 workers) | 2.4 GB | 1.1 GB |

What this shows:
- **2 workers was fastest.** 5 workers was slower (128 s) because the computer ran out of memory and swapped. More workers only help when there's free memory for them.
- Segmented capture is no faster than a normal render; its value is restarting after a crash.
- Parts cost almost nothing extra (88 s vs 86 s) and a one-part fix costs half the time here; for a 3-minute video with 4 chapters, a one-chapter fix is about a quarter.
- **Joins are clean:** the parts video matched the one-go render at every frame (PSNR 48-52 dB everywhere, no frame shift at the join, 1200/1200 frames), and the sound lined up with the source mix at 0 ms offset (it is laid on once, so it can't have seams).
- Rough speed with 2 workers on this PC: about 2.2 s of rendering per second of video (a 2:43 video ≈ 6 minutes).

## If a render is stopped (out of memory or cancelled)
A stopped render can leave its helper processes running: headless Chrome (`chrome-headless-shell`) and `ffmpeg`. On this PC they still held about 2 GB after the render was stopped. Before trying again:
1. List them (Mac: `pgrep -fl chrome-headless-shell; pgrep -fl ffmpeg`; Windows: `Get-Process chrome-headless-shell, ffmpeg`), and stop only the ones that started with your render.
2. Delete the half-written `renders/.<name>.hf-transaction-*` folder.
3. Read free memory again. If it is under 2.5 GB, don't restart: tell the user what is using memory (usually the browser and other apps) and ask them to close something or approve a 1-worker render.
Never restart a render that the system stopped without asking the user.
