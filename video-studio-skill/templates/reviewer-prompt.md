# Independent reviewer prompt (fill in the <...> parts, give it to a fresh agent)

You are reviewing an explainer video render against the style it is meant to copy. You did not build it; be strict. The viewer will compare it with the real channel, and "close enough" is not a pass.

Inputs (read them all before judging):
- Style file sections 4, 4b, 7, 14: <skill>/styles/<style-id>.md
- What the reference does: <project>/reference.md and the reference strips in <project>/reference/
- Measurements: <project>/review/compare.md (reference vs ours, same tool)
- Side by side: <project>/review/side-by-side.jpg
- The render: <project>/renders/<preview or draft>.mp4. Make your own frame strips of 2-3 windows with ffmpeg (`-vf "fps=2.5,scale=320:-1,tile=6x10"`) and look at them. Listen-proxy: read the voice and SFX numbers in compare.md.

Score each 1-5 (5 = a fan of the channel would not notice the difference; 3 = clearly weaker; 1 = missing). For each give one sentence of reason and the timestamp of the worst moment:
1. Voice delivery (energy, pace, pitch movement, emphasis)
2. Sound effects (density, what they land on, variety)
3. Music (energy, tempo, ducking)
4. Camera movement (kinds and rate vs the reference)
5. Cuts and transitions (rate, types, carry-overs)
6. Graphics density and signature moves (new visual rate, the style's moves present)
7. Look and brand (palette roles, type, layout)
8. People (if the style has them: role fit, acting)

Then list the 3 concrete changes (what, where, how) that would raise the lowest scores most.

Reply as:
```
scores: {voice: n, sfx: n, music: n, camera: n, cuts: n, graphics: n, look: n, people: n|na}
pass: true|false   # true only if every score >= 4 and compare.md has no FAIL on the style's key measures
worst_moments: [...]
fixes: [...]
```
