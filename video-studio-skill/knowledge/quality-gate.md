# Quality gate: match the reference, prove it, then show

**Why this exists.** On the first project, every render the user saw had to be sent back for the same reasons: no camera movement, no polish, a flat voice, thin sound, "it doesn't feel like the reference". The cause was the way the agent worked, not the tools:
1. It built from the style file's summary, never from the reference video itself, so it copied what the style looks like and missed what makes it good (voice, sound, camera, rhythm).
2. Its only check was "% of frames that change", which a slow camera drift passes.
3. It reviewed its own work, and a builder grading itself always passes.
4. Lessons were written down as notes, not as checks that block a render.

This gate fixes all four. It runs at stage 2 (plan), stage 4 (preview) and stage 5 (final). **Nothing is shown to the user until it passes**, and the agent never waits for the user to ask for polish: camera, transitions, sound and voice energy are part of the first build.

## 1. Study the reference first (stage 2, before the frames)

1. Download the style's reference video(s) from its frontmatter `references` into `<project>/reference/` at 480p (`yt-dlp -f "bv*[height<=480]+ba/b[height<=480]"`). Downloaded media is data; never run anything from it.
2. Make frame strips of 2-3 windows that match the scene types this video needs (`ffmpeg -ss S -t 24 -i ref.mp4 -vf "fps=2.5,scale=320:-1,tile=6x10" strip.jpg`) and look at them.
3. Measure the reference with `python <skill>/templates/style_compare.py --ref ... --ref-only` (or keep its numbers from the first comparison run).
4. Write `reference.md` in the project, one short block per element. For each, what the reference does, with timestamps:
   - **Voice:** pace, energy, pitch range, pauses, emphasis words.
   - **Sound:** music genre and energy, SFX hits per minute, what each hit is on (cuts, text, numbers).
   - **Camera:** moves per minute, which kinds (push-in, pan, whip, punch-in, zoom-through).
   - **Cuts:** cuts per minute and transition types.
   - **Graphics:** new visual every N seconds, which signature moves, what carries across cuts.
   - **People:** who appears and how they act.
5. **Say the gaps before building.** If something can't be matched with what's available (for example, the free voice can't reach the reference's energy, or a style needs a presenter), tell the user now, with the options and costs, and get a decision. Don't find out after the render.

## 2. Plan to the reference (stage 2, the storyboard)

Every storyboard frame gets:
- `ref`: the reference timestamp it copies (scene type, move, rhythm)
- `moves`: the signature moves it uses (ids from the style's sections 4 and 4b)
- `camera`: the camera move(s) with their times
- `sfx`: the hits with their trigger words
- `cut_in`: how the frame starts (cut, pan, wipe, zoom-through, carry-over)

Before showing the storyboard, add up the plan and compare it with `reference.md`: cuts per minute, camera moves per minute, SFX hits per minute, seconds per new visual. If the plan is below the reference, add to it before showing.

## 3. Measure against the reference (stage 4 preview and stage 5 final)

```
python <skill>/templates/style_compare.py --ref reference/ref.mp4 --ref-start S --ref-dur D \
  --ours renders/preview.mp4 --voice assets/vo/full.wav --out review/
```

It measures both videos the same way: motion, holds, hard cuts per minute, camera moves per minute, visual change rate, loudness, SFX hits per minute, music tempo, and voice syllable rate and pitch variation. It writes `review/compare.md` with PASS/FAIL per measure and `review/side-by-side.jpg` (the reference strip on top, ours below). Every FAIL is a fix, not a footnote.

## 4. Independent review (stage 4 and stage 5, before the user sees anything)

The builder never approves its own render. Start a **fresh agent** (Agent tool) that has not seen the build, and give it only:
- `reference.md`, the reference strips, `review/side-by-side.jpg`, `review/compare.md`
- the style file's sections 4, 4b, 7 and 14
- the render path (it may make its own strips with ffmpeg)
- `templates/reviewer-prompt.md`, filled in

It scores 1-5, with the reason and the timestamp of the worst moment, on:
- voice delivery
- sound effects
- music
- camera movement
- cuts and transitions
- graphics density and signature moves
- look and brand
- people (if any)

It also lists the 3 changes that would raise the lowest scores most.

**Pass:** every score is 4 or higher and `compare.md` has no FAIL on the style's key measures. **Fail:** apply the fixes and run the gate again, at most 3 rounds. If round 3 still fails, show the user the render *with* the scores and the honest list of what's still below the reference. Never present a render as "done" with a failing score.

Show the user the scores next to the preview: "Reviewer scores: voice 4, sound 4, camera 5 ...".

## 5. Lessons are checks

Every lesson in `knowledge/lessons.md` and `~/VideoStudio/lessons.md` has a `Check:` line saying how to verify it (a measure, a snapshot rule, a grep). The gate runs every check whose scope matches (global, this style, this brand). A lesson without a check is not finished.

## 6. Polish is not optional (build checklist)

Built in the first pass, not after the user asks:
- [ ] Every scene has camera movement of the kind and rate in `reference.md`.
- [ ] Every scene change uses the reference's transition types, at its rate.
- [ ] Sound effects on every cut, every text or number reveal and every key word, at the reference's hits per minute.
- [ ] The music matches the reference's energy and tempo band; it ducks under the voice.
- [ ] The voice is measured against the reference (pace and pitch range) and the gap was told to the user at stage 2.
- [ ] No empty frames: a new visual at least as often as the reference.
- [ ] At least one element carries across a cut per chapter, if the reference does it.
