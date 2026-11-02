# Casting: illustrated people for the CX-AI-budget explainer

Date: 2026-10-30. Everything here sits under `research/casting/`: the contact sheets `sheet-<role>.png`, the machine-readable list `casting.json`, and one folder per candidate under `candidates/<id>/`. Each candidate folder holds `recoloured/*.svg`, `preview.png` and `preview.mp4`.

**How candidates are ranked**
1. Can the same character take many poses and hold props? (This is the new top requirement, from the Dalio merchant who changes pose every 1-2 s.)
2. Does the role read at a glance?
3. How close is the style to the Dalio video?

## What was built

### Open Peeps rig (9 candidates)
- We split the CC0 Open Peeps atoms (pose, head, face, facial hair, glasses) into vector colour regions. The method is "white fill minus ink" with paper.js, in `_tools/peep_regions.mjs`.
- Each region is labelled skin, top, bottom, shoe, sole or sock, then recoloured to the brand palette.
- The result is one fixed character per role: same head, face set, colours and role props. It is shown on 3-4 poses with an expression change on each.
- Props are our own drawings, so no licence applies. They sit at per-pose hand or lap anchors: headset, laptop, tablet with chart, document, calculator, ledger, files, AI lanyard, headphones, chair, desk, PLAN board and a "?" bubble.
- In each MP4 the pose changes about once a second with a small settle "pop". The head is a separate layer, so it nods; the body breathes.
- Ten poses are colour-mapped so far: 9 standing and 1 sitting. The library has 23 standing and 11 sitting poses, so adding a pose means labelling its regions once (about 1 minute per pose).

### Humaaans rig (7 candidates)
- The CC0 Humaaans pieces (head, body, legs) are composed and recoloured by remapping their fills.
- Same idea as above: one character per role, 3 combinations of body and legs, and props in the front hand.

### LottieFiles leads (9, links only)
- These are native animations, but each is one fixed loop of one character, so they rank last on the pose criterion.
- They were not downloaded, because LottieFiles' terms forbid scripted download (see the table).

## Library comparison

| Library | Licence | Attribution | Role coverage | Same character, many poses? | Animation | Recolour | Dalio style (1-5) | Scripted download allowed? |
|---|---|---|---|---|---|---|---|---|
| **Open Peeps** (atoms) | CC0 1.0 | None (optional credit) | Generic people; roles come from props + colours (we add them) | **Yes**: 46 heads x 30 faces x 23 standing + 11 sitting poses; also 30 bust bodies (Device, Macbook, Paper, Coffee, Pointing Up, Explaining) | Rig by pose swap + head/face layers; arms are baked into each pose | Yes, with our region tool (the original is one white shape + ink) | **5**: hand-drawn ink line | Yes (CC0; GitHub copy `jenshor/open-peeps`) |
| **Humaaans** (pieces) | CC0 on humaaans.com; the 2019 GitHub mirror ships CC BY 4.0, so credit to be safe | Safe credit: "Illustrations: Humaaans by Pablo Stanley (humaaans.com), CC BY 4.0" | Generic people; roles from props + colours | Yes: 18 heads x 10 bodies x 12 legs (side view only, facing right) | Rig by piece swap | Yes, easiest (plain fills) | 2: flat, no outline | Official copy via Gumroad (manual); the GitHub mirror is scriptable |
| **LottieFiles** free animations | Lottie Simple License allows commercial use, **but** the T&C (22 Aug 2025) say the Free Plan is "strictly for non-commercial use only". Ambiguous: ask support@lottiefiles.com in writing | Not required | Excellent: every role has many hits (call centre, accountant, coding, finance) | No: one loop of one character; the same person never appears in other poses | Native | Yes (Lottie colour properties, after download) | 2-4; a few ink-outline ones score 4 | **No**: no robots or automatic devices, no "collect or compile". Download by hand |
| **Storyset** (Freepik) | Free for commercial use **with attribution** | Required; exact wording appears only at download (unverified) | Excellent: role scenes (call centre, accountant, programming, finance) | No: each scene is a different person; the "Cuate" (outline) style is closest to Dalio | Free web editor exports HTML (inline SVG + CSS), GIF or MP4; no Lottie | Yes (in their editor or SVG) | 3 (Cuate), 2 (other styles) | **No**: "robots, spiders or any other mechanism" banned; no putting the assets into a library. Manual only |
| **unDraw** | Free, no attribution | None | Some roles, generic | No | Static | Yes (one accent colour) | 1-2 | **No** (scraping and downloading "without our consent" banned). Manual only |
| **Open Doodles** | CC0 | None | Weak (lifestyle doodles) | No (one pose each) | Static (some GIFs) | Yes | 4: ink doodles | Allowed (no clause) |
| **DrawKit** free packs | Commercial OK, no attribution; no standalone redistribution | None | Some business packs | Pack-dependent (mostly no) | Static | Yes | 2 | No clause found; free packs are email-gated, so manual |
| **Blush** (free tier) | Commercial OK, no credit | None | Good (collections), incl. Open Peeps and Humaaans | Within a collection, yes | Static | In their editor | 2-5 | Free tier is PNG only (unverified, pricing page 404). Manual |
| **IRA Design** | MIT | None needed for video | Weak | No | Static | Yes (gradients) | 1 | Allowed |
| **Manypixels** | Commercial OK, no credit; no compiling into packs | None | Generic office scenes | No | Static | Yes | 2 | No clause; manual |
| **Pixeltrue** | Commercial OK, no attribution | None | Some business | No | Some "animation" packs (format unverified) | Yes | 2 | Email-gated; manual |
| **Lukasz Adam** | CC0 / MIT | None | Weak | No | Static | Yes | 3 | Email-gated; manual |
| **Icons8 Ouch** | Free tier needs a link back, and free users "must not make derivative copies" outside Icons8 tools | Link required | Good | Some packs | Some animated | **Effectively no**: recolouring outside their tools is not allowed. Excluded | 2-4 | No ("stockpile" banned) |
| **Streamline** free | Commercial OK with attribution; 25 illustrations per project | Link to streamlinehq.com | Good | Some sets | Static | Yes | 2-3 | No clause; manual |
| **Noto Animated Emoji** (Google) | CC BY 4.0 | "Noto Emoji Animation by Google, CC BY 4.0" | Role emoji (technologist, office worker): busts only | No | Native Lottie | Yes | 1 | Per-file downloads; no full set |
| **Microsoft Fluent Emoji** | MIT | Courtesy | Role emoji (busts) | No | Static | Yes | 1 | Allowed (GitHub) |
| **OpenMoji** | CC BY-SA 4.0; ShareAlike implications for a video are ambiguous | Required | Role emoji | No | Static | Yes | 2 | Allowed |
| **IconScout** free Lottie | Commercial OK; attribution mandatory (format unverified) | Required | Good | No | Native | Yes | 2-3 | Unverified (pages returned 403) |
| **Rive** community | CC BY 4.0 | Credit author + licence | Varies | **Some files are full rigs with state machines** (best "many poses" option among animated sources) | Native (needs the Rive runtime, not lottie-web) | Yes (in Rive) | Varies | No clause found; manual |
| **Kenney** Toon Characters (extra) | CC0 | None | Generic person or adventurer, not role-specific | Yes: dozens of poses of the same character, vector | Pose swap | Yes | 3: thick outline + flat | Download sits behind an in-page button; manual |

## Recommendations

### Dalio style (hand-drawn, ink outline, flat colour): use the Open Peeps rig as the primary library
- **Why:**
  - It is the only free, commercially clean source that combines Dalio-like ink linework with **one character on dozens of poses**.
  - Swappable expressions (30 faces) and separate head and face layers allow nods and reactions.
  - CC0 means no credit line and scripted download is fine.
- **Fixes for the two original complaints:**
  - "Static black and white": the region tool recolours it to the brand palette, and the MP4s show pose-swap acting.
  - "Doesn't look like the role": role props and outfits are added (headset, AI lanyard and laptop, calculator and ledger, chart tablet, PLAN board).
- **Limits to know:**
  - Arms are drawn into each pose, so "raise the hammer" is a pose swap, not a rotating arm. That is actually how the Dalio video reads.
  - Outfits vary a little between poses (blazer vs sweater). Recolouring every top the same colour keeps the character consistent.
  - The library has no "sitting on a chair at a desk" pose, so we use crossed_legs plus our own chair and desk.
- **For a richer set, use these as one-off insert shots:** ink-outline LottieFiles hits (call-center-girl, coding, Development) or Storyset "Cuate". Both need manual download, and Storyset needs a credit.

### Flat-vector style (Kurzgesagt-like): use the Humaaans rig
- It is CC0, has plain fills that are trivially recoloured, and separable head, body and legs.
- For more richness, add LottieFiles flat animations (licence caveat above) or Storyset "Rafiki" or "Bro" scenes (credit required, manual download).

### Photo or cut-out style (Vox): no downloads made
Name these sources only:
- **Unsplash and Pexels photos:** their own licences, commercial OK, no attribution required. Cut the person out with background removal (rembg or Photoroom).
- **Wikimedia Commons:** check each file's CC licence; often CC BY or CC BY-SA.
- **Library of Congress and Smithsonian Open Access:** public-domain archival photos, good for the collage look.
- **Paid fallback:** Getty or Shutterstock editorial.
- **Vox-style motion:** apply paper texture, halftone and drop-shadow cut-outs in HyperFrames.

## Honesty notes and things not verified
- **LottieFiles shortlist.** Before the terms check came back, we queried LottieFiles' public GraphQL search endpoint and fetched about 500 preview thumbnails to make the shortlist.
  - Their terms forbid robots and automatic devices, so we stopped and deleted those thumbnails. Only the names and URLs are kept, in `_tools/lottie_shortlist.json`.
  - No Lottie JSON was downloaded. The "native animation" claims and style ratings come from those thumbnails, not from playing the animations.
  - Download them by hand to check.
- **LottieFiles commercial use is ambiguous** (licence vs T&C). Get it in writing before using one in a monetised or corporate video.
- **Storyset:** the exact credit wording, and whether the animated export is free without an account, are unverified. We built no Storyset candidates because scripted download is banned. Browse by hand at storyset.com and search for "call center", "accountant", "programming" and "financial".
- **Licence pages we couldn't open:** Icons8 and IconScout returned 403 and Blush pricing returned 404, so those rows rest on the companies' help pages.
- **Humaaans licence:** the site says CC0 and the mirror file says CC BY 4.0. Crediting covers both.
- **Off-palette colours:** skin tones are the only colours outside the brand palette (4 natural tones). Set them to paper `#F5F8FA` in `_tools/cast_op.mjs` for a brand-strict look.
- **Known cosmetic issues:**
  - Humaaans headset band floats slightly above some hair shapes.
  - The Humaaans agent's seat cube turned ink-coloured (the fill mapper treats it as trousers).
  - Open Peeps crossed-leg foot overlaps the desk edge.

## How to extend (tools in `_tools/`, none inside the download folders)
- `peep_regions.mjs <outDir> <atom.svg...>` turns an atom into vector regions and writes a numbered map PNG. Add the region classes to `POSE_MAP` or `HEAD_MAP` in `op_rig.mjs`.
- `cast_op.mjs` and `cast_hu.mjs` hold the character definitions: head, face, colours, poses and props. Edit them and rerun.
- `props.mjs` holds our prop drawings.
- `render.mjs <candidateDir> <title>` writes the PNG strip and the 4 s MP4.
- `build_index.mjs` rebuilds `casting.json` and the sheets.
- **In HyperFrames:**
  - Inline the `recoloured/*.svg` files as stacked layers.
  - Use GSAP to toggle the active pose every 1-2 s.
  - Tween `.head` rotation around its `data-pivot` for nods.
  - Swap faces for reactions.
  - Tween prop groups (e.g. coins stacking in a hand) on top.
