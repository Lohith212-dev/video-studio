# Feedback playbook: what the user says → what to change

Users describe feelings, not fixes ("it feels static", "the people look bad"). Find the symptom below, apply the fix, and check it before showing the next version. Seeded from the first real project (CX AI budget, 2026-10-29); add a row whenever new feedback teaches something (see `knowledge/lessons.md`).

| The user says | What it usually means | Fix | Check before showing |
|---|---|---|---|
| "Colours are wrong", "where's our brand?" | Style colours used instead of brand colours | Take every surface, prop and text colour from the brand's `design.md`; the style's own palette only when no brand is set | Grep the scenes for hex codes; every one is in the brand file |
| "Why green?", "that background is wrong" | The reference video's background was copied | Replace the style's worlds with the brand's two main surfaces | Snapshot every scene |
| "Hard edges", "too clean", "doesn't look like the style" | Shapes are geometric, not hand-drawn | Draw with Rough.js (seeded), add the offset shadow, grain | Side-by-side snapshot with a reference frame |
| "Just text one after another", "slides" | Text-only scenes | Turn every sentence into a picture: a prop or person acting it out; text only as 1-4 word labels | No frame is a sentence on a plain background |
| "The people look horrendous" | Wrong library or random figures | Run the casting gate (`knowledge/casting.md`) with 2-3 candidates per role | User picked every role |
| "An engineer should look like an engineer" | People not dressed for their role | Outfit and prop per role; same character across poses | A stranger can name each role |
| "Static pictures", "people don't move" | Figures only pop in | 3-4 poses per role, a new pose every 1-2 s on spoken words, breathing, walk-ins | Pose changes at least every 2 s on screen |
| "Feels static", "ours is on the ground, theirs is in the sky" | Too many still frames, cuts instead of flow | Camera drift and pushes, draw-on props, zoom-through or pan changes, idle loops | `motion_metrics.py` meets the style's section 14 targets |
| "Too fast", "can't read it" | Labels leave before they're read | Delay scene changes; labels stay until the idea ends | `npx hyperframes check` shows no `line_unread` |
| "Music too loud" / "too quiet" | Mix levels | Adjust `sound.json` bed level and dips, re-run `mix.mjs` | Voice clearly on top in a 20 s listen |

## How to use it
1. Map each piece of feedback to a row. If none fits, ask one short question ("Do you mean the people, or the way the scenes move?").
2. Say back the fix in one line per item before doing it.
3. Fix, then run the row's check. Show a 20-second preview of the most affected part before re-rendering everything.
4. Add a lesson (`knowledge/lessons.md`) so the next video starts right.
