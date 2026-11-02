# Casting: picking the people (stage 3, casting gate)

People make or break an explainer. The user's first two test videos were rejected for people who looked like clip art and did not fit their roles ("when you say an engineer, the picture should look like an engineer"). Casting is its own stage (3), after the storyboard and before the preview. Skip it when no frame has people.

## 1. List the roles
From `storyboard.json`, list every person who appears and what they do: role, scenes, actions (explain, point, wait, celebrate, walk in), props they should hold. Write `casting.json` with one entry per role.

## 2. Pick the library from the style
Each style's section 4c names the free source that fits it. Defaults:

| Style family | Library | Licence | Why |
|---|---|---|---|
| Ink-outline (Dalio, whiteboard) | Open Peeps atoms (pose + head + face) | CC0 | Same ink line; 30+ poses, 40+ heads, recolourable |
| Flat, no outline (Kurzgesagt-like) | Humaaans pieces, or a custom SVG rig | CC BY 4.0 to be safe (credit) | Flat fills match |
| Photo collage (Vox, Johnny Harris) | Public-domain photos (Wikimedia Commons PD, Library of Congress, NASA) with the background removed | Check each file | Real people, cut out |
| Presenter-led (Varun, Vaibhav, Aevy) | Illustrated host from Open Peeps, or stock video (Pexels, Pixabay) | Free for commercial use | No presenter available |

Never use LottieFiles, unDraw or Storyset files without a manual licence check (see `casting/sources.md`).

## 3. Dress each role
For each role, choose 3-4 poses of the SAME character (same head, hair, colours) that cover the actions in the storyboard: one calm, one explaining, one pointing, one reaction (arms crossed, sitting, walking). Give each role a prop that says who they are: a CFO holds a tablet with a chart, an engineer wears a lanyard, a planner stands by a flip chart, a customer sits waiting. Recolour to the brand palette; skin and hair stay natural.

Tools (Node, in `<skill>/casting/_tools/`; ready-made role-dressed people in `<skill>/casting/library/`): `op_rig.mjs` builds Open Peeps characters from atoms, `props.mjs` adds hand props, `scout_sheets.mjs` renders a sheet per role, `render.mjs` makes a short preview clip per candidate.

## 4. Show a casting sheet (gate)
Put 2-3 candidates per role on a review page: one card per candidate with a looping preview of its poses, a Pick button and a "what's wrong" note box. Ask the user to pick. Record the picks in `casting.json → picked`.

Self-check before showing (fix before asking):
- Would a stranger name the role from the picture alone? If not, change the outfit or prop.
- Same character in every pose (head, hair, clothes)?
- Colours only from the brand file (plus skin and hair)?
- At least 3 poses per role, including the actions the storyboard needs?

## 5. Pack the cast for the build
`node tools/pack_cast.mjs <recoloured-candidates-dir> assets/cast.js` (script in `<skill>/casting/_tools/`). Each role becomes a list of poses; the build uses `actor()`, `pose()`, `alive()` and `walkIn()` (see the style's build recipe).
