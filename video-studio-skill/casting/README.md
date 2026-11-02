# Casting kit

- `library/` — ready-to-use people, dressed for business roles, in the demo brand's colours (Open Peeps, CC0). One folder per role, 3-4 poses of the same character each: strategist, planner, CFO, accountant, engineer, client, and three customer-service agents. Reuse them as they are, or recolour for another brand.
- `_src/open-peeps/atoms/` — the Open Peeps parts (poses, heads, faces, facial hair, accessories) by Pablo Stanley, CC0 1.0 (https://www.openpeeps.com). No credit required.
- `_tools/` — Node scripts that build new characters from the atoms (`op_rig.mjs`), add hand props (`props.mjs`), render casting sheets and preview clips (`scout_sheets.mjs`, `render.mjs`) and pack a cast for a build (`pack_cast.mjs`). Run `npm install` in `_tools/` once (paper, playwright-core).

To add a role: copy the closest role in `op_rig.mjs`, change head, outfit colours and prop, render a sheet, show it at the casting gate. See `knowledge/casting.md`.
