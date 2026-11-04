# Lessons: what past videos taught us

Read this at the start of every project. Add a lesson whenever the user gives feedback that would apply again. Each lesson has a scope:
- **global**: every video
- **style:<id>**: videos in that style
- **brand:<id>**: videos for that brand
- **video:<slug>**: only that project (keep these in the project's own `lessons.md`, not here)

Where lessons live: this file ships with the skill. The user's own lessons go to `~/VideoStudio/lessons.md` (same format); read both, and the user's file wins if they disagree.

Format: `- [scope] lesson. (source, date)` and on the next line `  Check: how to verify it before showing anything`. **A lesson without a Check is not finished.** The quality gate (`knowledge/quality-gate.md` §5) runs every check whose scope matches; a failed check blocks the render from being shown.

## Lessons
- [global] Show the first render before any fix loop. On the Meeting Board launch video the agent ran three review, fix and re-render rounds in the background, each overwriting the last, and the user never saw version 1. The user wants to see v1 with the reviewer's findings, approve the fix list, and only then get a re-render. (Meeting Board launch, 2026-11-05)
  Check: `renders/` holds `draft-v1.mp4` (or `preview-v1.mp4`), and `project.json → log` has a "shown to the user" line before any v2 render.
- [global] Copy what makes the reference good, not only how it looks: voice delivery, sound effects, music energy, camera movement, cut rhythm, graphics density. The first Vaibhav-style render copied the look and was "Dalio with less motion". (CX budget, Vaibhav test, 2026-10-30)
  Check: `style_compare.py` against the reference shows no FAIL on voice, SFX, cuts, camera moves, visual change rate; the reviewer agent scores every area 4+.
- [global] Never wait for the user to ask for polish: camera movement, transitions, sound effects and voice energy go into the first build. The user had to ask for this on every render. (CX budget, 2026-10-30)
  Check: every box in quality-gate §6 is ticked before the first render.
- [global] The builder never approves its own render; a fresh reviewer agent scores it against the reference. (CX budget, 2026-10-30)
  Check: `review/` holds the reviewer's scores for the render being shown.
- [global] Say what can't be matched before building (voice, presenter, footage) with options and costs; don't discover it after the render. The free Kokoro voice can't reach energetic presenter styles; ElevenLabs v3 voices through OpenRouter can (about $0.08 per 1,000 characters). (CX budget, 2026-10-30)
  Check: `reference.md` has a "Gaps told to the user" line with the user's decision.
- [global] Never show text-only scenes in an illustrated style; every sentence becomes a picture, text is a short label. (CX budget v1 feedback, 2026-10-29)
  Check: no snapshot is only text on a plain background, unless the style's section 14 allows it.
- [global] Cast people for their role and get the user's pick before building; people are what viewers judge first. (CX budget v1 + v2 feedback, 2026-10-29)
  Check: `casting.json → picked` has every role in the storyboard.
- [global] People must perform: pose changes every 1-2 s on spoken words, breathing, entrances. Pop-in figures read as clip art. (CX budget v2 feedback, 2026-10-29)
  Check: in a 2.5 fps strip of each person scene, the pose changes at least every 5 frames.
- [global] Measure motion against the style's targets before showing a render. Our default build was 52% still vs 25% in the reference. A slow drift alone can pass the "% moving" number, so it is never the only check. (CX budget v2, 2026-10-29)
  Check: `style_compare.py` motion, holds and camera-move rows pass.
- [global] Show a 20-second preview of the hardest part before a full render. A full render costs 15-30 minutes; a preview costs 3. (CX budget, 2026-10-29)
  Check: `renders/preview.mp4` exists and was approved before `renders/draft.mp4`.
- [global] Within a chapter, change scenes with a camera move (pan, zoom-through, carry-over) the way the reference does, not a plain cut. (CX budget v2 feedback, 2026-10-29)
  Check: the storyboard's `cut_in` types match `reference.md`'s transition types.
- [global] The look (style + brand) is chosen at the storyboard, after the script: write the script at a neutral 150 wpm, then re-pace it to the style and show what changed. (Pipeline review, 2026-10-30)
  Check: `script.md` section 4 says neutral pace until the style is picked.
- [global] Tell the user to start with `/video-studio`; it always picks this skill, while "let's make a video" sometimes doesn't. (Pipeline review, 2026-10-30)
  Check: the setup prompt's last line and the README say `/video-studio`.
- [global] Render long videos (3 min or more) in parts, one per chapter, with the worker count set from free memory (`knowledge/rendering.md`). Auto workers sized from total memory used 5 workers and drove free memory to almost zero; a background render was killed. (Render test, 2026-10-30)
  Check: free memory was read and the worker count logged before each render.
- [style:ray-dalio-principles] Use Rough.js for the hand-drawn look; geometric shapes read as "hard edges". (CX budget v1 feedback, 2026-10-29)
  Check: every prop is drawn with Rough.js (seeded).
- [style:vaibhav-sisinty] His energy comes from the voice (fast, excited, wide pitch), a new visual every 1-2 s, hard cuts 10-26 per minute, typing and whoosh sounds on nearly every change, and the host's moving frame. Graphics alone at a calm pace read as a slower Dalio. (CX budget, Vaibhav test, 2026-10-30)
  Check: `style_compare.py` vs ECshcTsXSFs (cold open and 8:10 window) passes cuts/min, SFX/min and visual change rate; the voice is an expressive model, not Kokoro.
- [brand] Use the brand at full strength: its paper and primary colours become the worlds, in its fonts. The reference video's colours are wrong for a brand. (CX budget v1 feedback, 2026-10-29)
  Check: every hex code in the scenes is in the brand's `design.md`.
