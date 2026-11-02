# Free asset sources for the explainer-video pipeline

Researched and tested 2026-10-29 from Windows 11 (curl 8 / Python 3.11 stdlib). "Tested" means a real search and file download was run in this session. "Not verified" means exactly that. Licence quotes come from the source's own page on that date. This is not legal advice. For a business channel, keep `_sources.jsonl` / `MANIFEST.md` with every project as the licence record.

Rule of thumb for the agent: **CC0 first, then "free licence, no attribution" (Mixkit/Pixabay style), then CC BY with the credit written into the description automatically.** Never use NC (non-commercial), ND or SA material.

---

## 1. Music

| Rank | Source | Licence and what it allows | Attribution | YouTube Content ID risk | Scripted download (no login/key)? | Method | Format / quality |
|---|---|---|---|---|---|---|---|
| 1 | **Kevin MacLeod, incompetech.com** | **CC BY 4.0**: commercial use, editing, monetised YouTube/LinkedIn | **Required**, in the text description | **Medium, but manageable.** incompetech now pre-registers the catalogue in Content ID. A claim is likely if the credit is missing; dispute it with the credit in place and it is released ("within 72 hours"). Source: incompetech.com/music/royalty-free/youtube-contentid.html | **Yes, tested.** `pieces.json` catalogue (1,443 tracks with feel, instruments, BPM, length) + direct MP3 | `GET https://incompetech.com/music/royalty-free/pieces.json` then `GET https://incompetech.com/music/royalty-free/mp3-royaltyfree/<filename URL-encoded>` | MP3 320 kbps, 1-10 min. Very good production but heavily used on YouTube, so recognisable |
| 2 | **Mixkit Stock Music** (mixkit.co, Envato) | "Mixkit Stock Music Free License": commercial and non-commercial; allowed: YouTube, social, online ads, podcasts. **Not allowed:** CDs/DVDs, TV & radio broadcast, video games, remixing into a music-only track, registering on a rights-management service. **Do not bundle the files in a tool/template** (same rule as their SFX licence) | Not required | Low-medium, not verified. Licence says: "If you receive a claim, please forward the details to team@mixkit.co" | **Yes, tested.** Tag/category pages contain direct MP3 URLs (the site search page does not; it is JS-rendered) | Fetch `https://mixkit.co/free-stock-music/tag/<tag>/` (e.g. corporate, piano, ambient), grep `https://assets.mixkit.co/music/<id>/<id>.mp3` | MP3 (sample checked: 256 kbps, 2:14), 1-3 min, clean modern corporate/cinematic sound. Fetch per project; do not commit to a shared repo |
| 3 | **Pixabay Music** | Pixabay Content License: commercial use, no attribution; you may not distribute it "on a Standalone basis" | Not required | **Medium.** Some tracks are marked "Content ID registered" on the track page (third-party reports; Pixabay's own terms say nothing about Content ID). Skip those; keep the licence .txt Pixabay gives you for disputes | **No.** Pages are JS-rendered (no MP3 URL in the HTML, tested) and Pixabay's Terms s.8 forbid "scraping and the use of programs or robots for automatic data collection". The Pixabay API has no audio endpoint (and needs a key) | Manual only: a human downloads, then drops the file in the project | MP3, good variety, quality uneven |

Also tested / noted:
- **Freesound CC0 music** (same method as SFX below): works, CC0, no Content ID registration known, but quality is uneven. Two usable beds are in `starter-kit/music/cc0-alt-*`.
- **Internet Archive** (`archive.org/advancedsearch.php?...&output=json`, no key, tested): has CC0 albums such as Komiku (chiptune/game) and HoliznaCC0 (ambient/meditation). The licence field is set by the uploader, so check the provenance of each item.
- **HyperFrames `media-use resolve --type bgm`**: needs the HeyGen CLI and account (tested: "bgm needs the heygen CLI"). The free fallback is local MusicGen generation (about 300 MB of models, slow on CPU; output is yours).
- **YouTube Audio Library**: needs a login, not scriptable. Its terms for use outside YouTube were not checked.

Attribution text (Kevin MacLeod, exact format from incompetech FAQ):
```
"<Title>" Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0
https://creativecommons.org/licenses/by/4.0/
```

## 2. Sound effects

| Rank | Source | Licence and what it allows | Attribution | Content ID risk | Scripted download? | Method | Format / quality |
|---|---|---|---|---|---|---|---|
| 1 | **Freesound.org, filtered to CC0** | **CC0 1.0** (public domain dedication): any use, commercial, no conditions. (Freesound also hosts CC BY and CC BY-NC sounds: always filter.) | None | Very low (SFX are rarely fingerprinted; check that the uploader plausibly made the sound) | **Yes for previews, tested.** The public search page (no key) returns `data-mp3` preview URLs; `-lq.mp3` → `-hq.mp3` gives a 128 kbps MP3. The **original** file (WAV etc.) needs a logged-in OAuth2 download. The official API needs a free key, and its terms say commercial API use is "negotiated on a case by case basis", so the key-less page + preview route is used here at low volume | `https://freesound.org/search/?q=<q>&f=license:"Creative Commons 0"&s=Downloads (most first)` → parse `data-sound-id/username/title/duration/mp3` → re-check the sound page contains `creativecommons.org/publicdomain/zero/1.0` → download `cdn.freesound.org/previews/<id/1000>/<id>_<userid>-hq.mp3` | 128 kbps MP3 preview (fine for video SFX under VO/music). Huge catalogue (~590k sounds) |
| 2 | **Kenney audio packs** (kenney.nl) | **CC0 1.0** (`License.txt` in every zip: "free to use in personal, educational and commercial projects") | None (credit "Kenney" appreciated) | None | **Yes, tested** (Interface Sounds, Impact Sounds, Digital Audio, UI Audio). The page JS gets a signed link from `/download-link/<hex("assets/<pack>")>`; it needs the page cookie + Referer | See section 5 recipe (`fetch_asset.py kenney <pack>`) | OGG, clean UI clicks/pops/confirm/glitch/impacts; few "cinematic" sounds (no whooshes, risers, paper, typewriter) |
| 3 | **Mixkit Sound Effects** | "Mixkit Sound Effects Free License": commercial and non-commercial, YouTube/social/ads/broadcast/games all allowed. **You can't "redistribute the Item on its own, as stock, in a tool or template", or register it on a rights-management service** | Not required | Low | **Yes, tested.** Category pages list `https://assets.mixkit.co/active_storage/sfx/<id>/<id>-preview.mp3` | `https://mixkit.co/free-sound-effects/<category>/` (whoosh, paper, click, notification, ...) → grep the MP3 URL | MP3, polished, short, very "explainer" friendly. Fetch per project, do not ship in the starter kit / a public skill repo |

Also:
- **Sonic Pi samples** (github.com/sonic-pi-net/sonic-pi `etc/samples/`): ~200 FLAC samples, **all CC0** (from Freesound, sources listed in its README). Direct `raw.githubusercontent.com/sonic-pi-net/sonic-pi/main/etc/samples/<name>.flac` works without a login (tested: `ambi_swoosh.flac`). Mostly musical hits/drums; `ambi_swoosh`, `ambi_dark_woosh`, `elec_pop`, `elec_ping`, `elec_blip` are useful.
- **Openverse** (`api.openverse.org/v1/audio/?q=&license=cc0`): no key, indexes Freesound + Wikimedia. **During testing every audio search timed out (HTTP 504 / 60 s timeouts), while `/v1/audio/stats/` answered.** HyperFrames' own SFX resolver depends on it and fell back to its bundled library. Treat it as unreliable.
- **Pixabay SFX**: same licence and same "no scripted download" problem as Pixabay Music. HyperFrames bundles 21 Pixabay SFX (see section 6).
- **Procedural**: ZzFX (MIT) and jsfxr (Unlicense) synthesise blips/pops/whooshes from a few numbers; what they output is yours. Good as a last-resort generator that can't be blocked.
- **Sonniss GDC Game Audio Bundles**: royalty-free, commercial, no attribution (well known), multi-GB zips. Download method and current terms **not verified** this session.

Attribution: none required for anything in the starter-kit SFX. Optional line: `Sound effects: freesound.org contributors (CC0) and Kenney (kenney.nl, CC0).`

## 3. Drawn people / illustrations

| Rank | Source | Licence | Attribution | Scripted download? | Method | Format / notes |
|---|---|---|---|---|---|---|
| 1 | **Open Peeps** (Pablo Stanley), hand-drawn | **CC0 1.0** ("The library is in the public domain under the CC0 License", openpeeps.com) | None | **Yes, tested.** (a) 93 complete SVG figures are linked from openpeeps.com itself; (b) the figure split into parts (166 SVG: 23 standing + 11 sitting poses, 46 heads, 30 faces, 17 facial hair, 9 accessories, 30 busts) is in github.com/jenshor/open-peeps; (c) the full Figma/Sketch library is on Gumroad (manual) | (a) grep `cdn.prod.website-files.com/...peep-*.svg` from `https://www.openpeeps.com/`; (b) `https://codeload.github.com/jenshor/open-peeps/tar.gz/HEAD` | Black line art that suits whiteboard/explainer style. Parts let you keep **one character across poses** (offsets measured and tested, see `starter-kit/MANIFEST.md`) |
| 2 | **Humaaans** (Pablo Stanley), flat colour | humaaans.com says **CC0**. The GitHub mirror (2019 snapshot) ships **CC BY 4.0** | Not needed under CC0; credit it anyway when using the mirror copy: `Illustrations: Humaaans by Pablo Stanley (humaaans.com), CC BY 4.0` | **Yes, tested** via github.com/Calinou/humaaans (32 figures + 47 parts as SVG). The official pack is Gumroad (manual) | `https://codeload.github.com/Calinou/humaaans/tar.gz/HEAD` → `Flat Assets/` | Mix-and-match parts (head, torso, legs standing/sitting, seats, scenes) |
| 3 | **DiceBear** avatar API (CC0 styles) | Per style: **open-peeps, notionists, lorelei, thumbs, shapes and 37 others are CC0**; adventurer, personas, micah, big-smile, croodles etc. are **CC BY 4.0**; avataaars/bottts have the artist's own terms (dicebear.com/licenses). Code MIT | None for CC0 styles | **Yes, tested, no key:** `https://api.dicebear.com/9.x/open-peeps/svg?seed=Asha` | Same `seed` + style always returns the same face: a free way to keep a cast of recurring characters | Heads/busts only, no full bodies |

Also checked:
- **unDraw** (undraw.co): free for commercial use, no attribution, recolourable. **But** the licence forbids "automated and non-automated ways to link, embed, scrape, search or download" without consent, distributing "in packs", and AI training. **Manual use only**; don't put it in agent recipes.
- **Open Doodles** (opendoodles.com, Pablo Stanley): CC0. The site is reachable; a scripted download route was not verified (it is Gumroad-based). React port: github.com/lunahq/react-open-doodles (MIT code).
- **LottieFiles free animations**: "Lottie Simple License": commercial use, attribution optional, but **derivatives must stay under the same licence** and you may not compile files into a competing service. Public JSON URLs download without a login (tested one `assets2.lottiefiles.com/packages/lf20_*.json`); search was **not** verified as scriptable. HyperFrames ships a `lottie-character-walk` block (Apache-2.0) with a jointed mascot Lottie.
- **IRA Design** (github.com/ira-design/ira-illustrations, MIT): the repo is a builder app; the gradient illustration parts themselves were not inspected.
- **Notion-style avatars** (github.com/Mayandev/notion-avatar, MIT, 450 SVG parts): the repo is MIT; the artwork licence was not separately verified.

## 4. Icons

| Rank | Source | Licence | Attribution | Scripted download? | Method |
|---|---|---|---|---|---|
| 1 | **Iconify API** (api.iconify.design): 200+ open sets behind one search | Per set; the API returns each set's SPDX id. Use only MIT/ISC/Apache-2.0/CC0 sets (lucide ISC, tabler MIT, ph MIT, heroicons MIT, material-symbols Apache-2.0, mdi Apache-2.0, fluent-emoji-flat MIT) | None for those | **Yes, tested, no key** | `GET /search?query=rocket&prefixes=lucide,tabler,ph&limit=32` → `GET /<prefix>/<name>.svg` (`?color=%23111&height=256` supported); licences: `GET /collections?prefixes=...` |
| 2 | **Lucide** (lucide.dev) / **Tabler** via npm CDN | Lucide ISC; Tabler MIT | None | **Yes, tested** | `https://cdn.jsdelivr.net/npm/lucide-static@0.460.0/icons/<name>.svg`, `https://cdn.jsdelivr.net/npm/@tabler/icons@3.19.0/icons/outline/<name>.svg` (pin the version) |
| 3 | **Microsoft Fluent Emoji** | **MIT** | None | **Yes, tested** | `https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/<Name>/Flat/<name>_flat.svg` (also `3D/<name>_3d.png`, `Color/`, `High Contrast/`). Colourful objects (rocket, money bag, light bulb) that replace emoji characters on screen |

## 5. Avoid list

Checked this session: BBC, FreePD, Uppbeat (HTTP 429), Pixabay terms, unDraw licence, Remix Icon licence, DiceBear style licences, Mixkit licences. The other rows reflect each site's published terms as generally documented and were **not re-read today**.

| Source | Why |
|---|---|
| **BBC Sound Effects** (sound-effects.bbcrewind.co.uk) | RemArc licence: the site says "use them in your own personal/educational projects, or licence them for use". Business/commercial use needs a paid licence |
| **Freesound sounds licensed CC BY-NC** (and Sampling+) | Non-commercial. Always filter to CC0 (or CC BY + credit) |
| **Free Music Archive / Jamendo** default tracks | Mostly CC BY-NC or BY-NC-ND. Jamendo commercial use is a paid licence |
| **ccMixter** | Mix of CC BY and BY-NC; filter per track, low value for corporate beds |
| **Zapsplat** | Login required; free tier requires attribution and limits downloads; not scriptable |
| **Uppbeat** | Account + monthly credits + per-track claim clearance; returned HTTP 429 to curl |
| **Bensound** free tier | Attribution required and restrictive free terms; paid licence for business use |
| **YouTube Audio Library** | Login only; some tracks need attribution; not scriptable |
| **FreePD.com** | **Closed** (site now shows a shutdown notice). Re-uploads elsewhere have unclear provenance |
| **Pixabay** (for agents) | Licence is fine, but scripted downloading violates its Terms s.8 and the pages are JS-only. Human download only |
| **unDraw** (for agents) | Licence forbids automated download/search and redistribution in packs |
| **Storyset / Freepik / Flaticon / Icons8 free tiers** | Attribution required (link back), redistribution limits |
| **OpenMoji** | CC BY-SA 4.0 (share-alike + attribution) |
| **Twemoji graphics** | CC BY 4.0, so attribution is needed (the code is MIT) |
| **game-icons.net** | CC BY 3.0, attribution needed |
| **Remix Icon** | Changed to a custom "Remix Icon License v1.0" (Jan 2026). It allows commercial use, but it is not a standard OSI licence; read it before use |
| **Simple Icons** (brand logos) | CC0 drawings, but the logos are **trademarks**. Use only to refer to the brand, never as your own branding |
| **Random small "CC0 SFX" GitHub repos / MCP servers** | Licence is self-declared. Some are just Kenney repacks (fine), some are AI-generated (sfxmint) and some have no LICENSE file. Prefer the original source |
| **Mixkit for the starter kit / a public skill repo** | Its licences forbid redistributing items "on its own ... in a tool or template". Fetch it per project instead |

---

## 6. HyperFrames' own options (checked against `hyperframes@0.8.216` and the installed plugin)

- `npx hyperframes@0.8.216 --help` has no `sfx`/`music` command. Media lives under **`npx hyperframes media-use resolve --type <sfx|bgm|image|icon|logo|voice|video> --intent "..." --project <dir> [--local-only]`** (also `candidates`, `adopt`, `doctor`).
  - Tested `--type sfx --intent whoosh --local-only` → copied a bundled file into `<project>/.media/audio/sfx/`.
  - Tested `--type sfx --intent "paper rustle"` online → "Openverse unreachable ... using the bundled sound effects" → **error: no provider could resolve**. So its free SFX path is Openverse (CC0 + CC BY only; CC BY credits written to `CREDITS.md`) with **21 bundled Pixabay SFX** as the offline fallback (chime, click, click-soft, error, glitch-1..3, impact-bass-1/2, key-press, notification, ping, pop, riser, sparkle, typing, whoosh, whoosh-short, whoosh-cinematic). They are in `~/.claude/plugins/marketplaces/hyperframes/skills/media-use/audio/assets/sfx\` with a `manifest.json` (durations + usage hints).
  - Tested `--type bgm` → needs the HeyGen CLI (`heygen auth login --oauth`); HeyGen's catalogue has "10k+ tracks". Free fallback per `audio/references/bgm.md`: Google Lyria (needs `GEMINI_API_KEY`) or local MusicGen-small (~300 MB, slow on CPU).
  - Images/icons: HeyGen asset search (account) or local FLUX via mflux (Apple Silicon); logos: theSVG / GitHub avatar / favicon.
- **Registry** (`npx hyperframes@0.8.216 catalog --json`, 448 items): **no music, SFX or people-illustration packs.** Relevant blocks: `lottie-character-walk` (a jointed flat mascot as a Lottie that walks in and points; Apache-2.0, the most useful "person" asset), the handwritten family (`hw-arrow`, `hw-underline`, `hw-box-label`, `hw-text-cloud` speech bubble, `hw-pipeline`, `hw-frame`, `hw-path-text`, `hw-boil` jitter), `whiteboard-ink` (stroke-by-stroke sketch draw with pen nib), `marker-highlight`, `vox-annotate`, `icon-morph-beat`, `avatar-cloud`, `beat-accent` (visual music-hit sting), and a few showcase blocks tagged `sfx` that ship their own sounds (`apple-money-count`, `nyc-paris-flight`, `vpn-youtube-spot`). Install: `npx hyperframes@0.8.216 add <name>`.

## 7. How the agent should fetch assets at build time

Order of preference, per asset:
1. **Starter kit** (`assets/starter-kit/`, licences already cleared, works offline). Use it when it has a fit. It is always the fallback.
2. **HyperFrames bundled SFX** (21 Pixabay files above): `npx hyperframes@0.8.216 media-use resolve --type sfx --intent "<name>" --project . --local-only`.
3. **Scripted fetch** with the tested helper `assets/fetch_asset.py` (Python 3 stdlib, no pip). It writes the file plus a `_sources.jsonl` line (source, author, licence, attribution) and exits with **code 2 when a source is blocked, rate-limited, offline or returns nothing. Then go back to step 1, never to a random site.**
4. Mixkit (per project, not committed), or ask the human to download from Pixabay.

### Commands (Windows PowerShell or macOS Terminal)

Python is `python` on Windows and `python3` on macOS (macOS 12.3+ has no bundled Python; `xcode-select --install` or python.org provides it). Run with `-I` and keep downloads in the project's asset folders.

```bash
# SFX: CC0 only, licence re-checked on the sound page, shortest useful clip
python3 -I assets/fetch_asset.py sfx "door knock" --max-dur 5 --out project/assets/sfx
# Music: Kevin MacLeod by mood regex (+ instrument regex); prints the REQUIRED credit
python3 -I assets/fetch_asset.py music "calm|relaxed" --instr piano --min 60 --max 200 --out project/assets/bgm
# Kenney CC0 pack (zip; unzip to its own empty folder, then pick .ogg files and convert with ffmpeg)
python3 -I assets/fetch_asset.py kenney interface-sounds --out project/assets/_kenney
# Icons via Iconify, permissive sets only
python3 -I assets/fetch_asset.py icon "lightbulb" --prefixes lucide,tabler,ph --pick 2 --out project/assets/icons
# A consistent avatar head (same seed = same face), CC0 style
python3 -I assets/fetch_asset.py avatar "Asha" --style open-peeps --out project/assets/people
```
All five were run in this session and returned files (`door-knock-194365.mp3` CC0 by Macif; `investigations.mp3` CC BY; `kenney-ui-audio.zip`; `lucide-lightbulb.svg` ISC; `open-peeps-asha.svg` CC0). A nonsense query returned exit code 2 as designed.

### curl-only equivalents (no Python; macOS/Linux shells and Git Bash; tested in Git Bash)

```bash
UA="Mozilla/5.0 Chrome/130"
# Freesound CC0 search -> candidate list (id, user, title, duration, preview URL)
curl -s -A "$UA" -G "https://freesound.org/search/" --data-urlencode "q=camera shutter" \
  --data-urlencode 'f=license:"Creative Commons 0"' --data-urlencode "s=Downloads (most first)" \
  | grep -oE 'data-(sound-id|username|title|duration|mp3)="[^"]*"'
# then check the licence on the sound page and download the HQ preview
curl -s "https://freesound.org/people/akonze/sounds/157812/" | grep -c "publicdomain/zero/1.0"   # must be >= 1
curl -sfo camera-shutter.mp3 "https://cdn.freesound.org/previews/157/157812_96299-hq.mp3"

# Kevin MacLeod catalogue + file
curl -s https://incompetech.com/music/royalty-free/pieces.json -o pieces.json
curl -sfo easy-lemon.mp3 "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Easy%20Lemon.mp3"

# Kenney pack (cookie + Referer required)
PACK=impact-sounds; ID=$(printf "assets/$PACK" | od -An -tx1 | tr -d ' \n')
curl -s -A "$UA" -c jar.txt "https://kenney.nl/assets/$PACK" -o /dev/null
URL=$(curl -s -A "$UA" -b jar.txt -e "https://kenney.nl/assets/$PACK" "https://kenney.nl/download-link/$ID" | tr -d '\134' | sed -E 's/.*"url":"([^"]+)".*/\1/')
curl -sL -A "$UA" -b jar.txt -e "https://kenney.nl/assets/$PACK" "$URL" -o "kenney-$PACK.zip"

# Mixkit (fetch per project; don't commit): category page -> preview MP3
curl -s -A "$UA" https://mixkit.co/free-sound-effects/whoosh/ | grep -oE 'https://assets.mixkit.co/active_storage/sfx/[0-9]+/[0-9]+-preview\.mp3' | head -3

# Icons / emoji / avatars
curl -s "https://api.iconify.design/search?query=rocket&prefixes=lucide,tabler&limit=5"
curl -sfo rocket.svg "https://api.iconify.design/lucide/rocket.svg?height=256"
curl -sfo rocket_flat.svg "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rocket/Flat/rocket_flat.svg"
curl -sfo asha.svg "https://api.dicebear.com/9.x/open-peeps/svg?seed=Asha"

# Whole CC0 kits from GitHub without git or a login
curl -sL https://codeload.github.com/jenshor/open-peeps/tar.gz/HEAD -o open-peeps.tgz
```
PowerShell users: `curl.exe` (not the `curl` alias) runs the same commands; replace `\` line continuations with backticks or put each command on one line.

### When a source blocks scripted downloads
- Signs: HTTP 403/429/5xx, a Cloudflare/JS challenge page, HTML where audio was expected (check `Content-Type` starts with `audio/` or `image/svg`), or a page with no result URLs because it is JS-rendered (Pixabay, Mixkit search).
- Do: stop after 1 retry (with a 5-30 s back-off), log it, and **use the starter kit or the HyperFrames bundled SFX**. Never switch to a headless browser to get around a block or to scrape a site whose terms forbid it (Pixabay, unDraw).
- Rate: at most about 1 request per second to Freesound and only a few dozen downloads per build. Cache everything you download in the project's assets so a re-render never re-fetches.
- Write credits automatically: collect every `_sources.jsonl` row where `attribution` is not null into the video description.

---

## 8. Open-source repositories (verified with the GitHub API on 2026-10-29)

Size is the GitHub repo size (KB, includes history). "Licence" is GitHub's detected licence of the repo; artwork licences are noted where they differ.

**Sound effects**

| Repo | Licence | Size | What it is | Verdict |
|---|---|---|---|---|
| github.com/sonic-pi-net/sonic-pi (`etc/samples/`) | Repo NOASSERTION (mixed: MIT code etc.); **samples CC0** per LICENSE.md and `etc/samples/README.md` | 468,250 KB (fetch single files via raw URLs) | ~200 CC0 FLAC samples incl. swooshes, pops, pings | Recommended (raw URLs) |
| github.com/iwenzhou/kenney | CC0-1.0 | 21,031 KB | "The complete Kenney Asset Pack 1" mirror (2016) | OK, but kenney.nl is newer |
| github.com/Cy4nWare/sfx-api | **no LICENSE file** | 38,413 KB | Kenney CC0 sounds served via jsDelivr as a static "API" | Sounds CC0 (Kenney); repo licence missing |
| github.com/smartpage/strongerfx-mcp | NOASSERTION (README: code MIT, audio CC0) | 32,027 KB | 254 SFX: 230 Kenney + 24 procedurally generated, with metadata, MCP server | Usable; provenance stated |
| github.com/flreey/sfxmint-mcp | CC0-1.0 | 1,709 KB | MCP/skill for sfxmint.com: **AI-generated/procedural** CC0 SFX, 20 downloads/day without a key, paid generation | Usable for gaps; daily limits |
| github.com/lotsofsounds/agent-skills | MIT (sounds stated CC0) | 98 KB | Agent skill + CLI for a CC0 SFX catalogue; full catalogue needs an account/API key | Not tested further |
| github.com/Maverik24/claude-video-toolkit | MIT | 3,115 KB | "One prompt" setup for HyperFrames/GSAP videos with CC0 SFX (Sonic Pi samples, Kenney) | **Likely the kind of repo seen on LinkedIn**: same stack (HyperFrames + CC0 sounds) |
| github.com/KilledByAPixel/ZzFX | MIT | 1,541 KB | Tiny JS sound synthesiser (pops, blips, whooshes from parameters) | Generator, no licence questions |
| github.com/chr15m/jsfxr | Unlicense | 564 KB | sfxr port, generates retro SFX | Generator |

**Music**

| Repo | Licence | Size | Notes |
|---|---|---|---|
| github.com/MOTE-MEDIA/Based-Music-for-Based-Creators | NOASSERTION (README says CC0) | 59 KB | Index only; music hosted on-chain (Transient Labs). Not tested |
| github.com/alexmacflai/openbars | **no LICENSE file** | 817,505 KB | "Static CC0 music archive" site; licence unclear at repo level. Not tested |
| (No large, well-maintained CC0 music repo was found on GitHub. Use incompetech / Mixkit / Freesound CC0 instead.) | | | |

**People / illustrations / characters**

| Repo | Licence | Size | Notes |
|---|---|---|---|
| github.com/jenshor/open-peeps | MIT code; artwork Open Peeps **CC0** | 1,453 KB | 166 SVG parts (poses, heads, faces, facial hair, accessories). **In the starter kit** |
| github.com/Calinou/humaaans | CC-BY-4.0 (2019 mirror; site now says CC0) | 3,795 KB | 79 SVG (figures + parts). **In the starter kit** |
| github.com/CeamKrier/peeps-generator | **no LICENSE** | 5,989 KB | Open Peeps web builder; no SVGs in the repo tree |
| github.com/CeamKrier/react-peeps | MIT | (not sized) | React components of Open Peeps |
| github.com/propjockey/css-peeps | BSD-2-Clause | (not sized) | Open Peeps in pure CSS |
| github.com/dicebear/dicebear | MIT (styles: see dicebear.com/licenses) | 33,205 KB | Avatar library + HTTP API; 42 CC0 styles |
| github.com/RobertBroersma/beanheads (formerly bigheads) | MIT | 3,254 KB | React character generator (bust avatars, many options) |
| github.com/Mayandev/notion-avatar | MIT | 4,390 KB | 450 SVG parts for Notion-style avatars (artwork licence not separately verified) |
| github.com/lunahq/react-open-doodles | MIT | 2,049 KB | Open Doodles (CC0 art) as React components |
| github.com/ira-design/ira-illustrations | MIT | 25,096 KB | IRA Design gradient illustration builder |
| github.com/saas-js/saas-ui-illustrations | CC-BY-SA-4.0 | 4,812 KB | Share-alike: avoid for commercial video unless you accept SA |

**Lottie / animation**

| Repo | Licence | Size | Notes |
|---|---|---|---|
| github.com/airbnb/lottie-web | MIT | 358,131 KB | The player (HyperFrames' Lottie block uses it) |
| github.com/LottieFiles/dotlottie-web | MIT | 138,207 KB | Faster .lottie/JSON player |
| github.com/useAnimations/react-useanimations | MIT | 6,092 KB | Free animated icons (Lottie JSON inside) |
| HyperFrames registry `lottie-character-walk` | Apache-2.0 | (in registry) | Jointed flat mascot walk + point |

**Icons / emoji**

| Repo | Licence | Size |
|---|---|---|
| github.com/lucide-icons/lucide | ISC (GitHub shows NOASSERTION; LICENSE is ISC) | 27,798 KB |
| github.com/tabler/tabler-icons | MIT | 1,146,593 KB |
| github.com/phosphor-icons/core | MIT | 6,541 KB |
| github.com/tailwindlabs/heroicons | MIT | 2,628 KB |
| github.com/iconoir-icons/iconoir | MIT | 13,679 KB |
| github.com/twbs/icons | MIT | 76,440 KB |
| github.com/google/material-design-icons | Apache-2.0 | 5,170,545 KB (use the CDN or Iconify, don't clone) |
| github.com/microsoft/fluentui-emoji | MIT | 135,807 KB |
| github.com/iconify/icon-sets | per set (no repo LICENSE) | 877,116 KB |
| github.com/jdecked/twemoji | MIT code, **graphics CC BY 4.0** | 841,383 KB |
| github.com/hfg-gmuend/openmoji | CC-BY-SA-4.0 (avoid) | 1,647,358 KB |
| github.com/simple-icons/simple-icons | CC0-1.0 (trademarks!) | 68,737 KB |

**Curated lists** (to find more): github.com/neutraltone/awesome-stock-resources (CC0, ★14.6k), github.com/bradtraversy/design-resources-for-developers (MIT, ★67k).

---

## 9. Verdict: can AI-generated people illustrations stay consistent across a video?

**Not reliably or cheaply with image generation alone.** Diffusion models (FLUX, SDXL, DALL-E, Imagen) redraw the face, proportions, clothing details and line weight every time. Consistency tools exist (fixed seed + reference image, IP-Adapter / InstantID, character LoRA training, "character reference" features in paid tools), but they cost GPU time or credits, still drift (hands, accessories, outfit colours), and each frame needs a human or vision-model check. Generated images also have no clear licence position for some uses, and you can't animate their parts.

**Cheapest reliable approach: one SVG character kit, built from parts.** Pick a head + face + hair/accessory once, save it as the character's "model sheet", and only swap the pose (and face expression) per scene. The drawing is identical by construction, the files are tiny vectors that scale to 4K, GSAP can animate the parts (head bob, blink by swapping faces, arm point), and the licence is CC0. Tested here: `starter-kit/people/open-peeps/atoms/` + the offsets in `MANIFEST.md` produce the same person in 8 poses (`open-peeps/demo-one-character-8-poses.png`). Limits: 34 poses and 30 expressions, black line art only (recolour fills with CSS), no side or back views.

Ranked options:
1. **Open Peeps atoms** (CC0): consistent, poseable, hand-drawn look. Default.
2. **Humaaans pieces**: same idea in flat colour (credit Pablo Stanley if using the mirror copy).
3. **DiceBear `open-peeps`/`notionists` with a fixed seed**: consistent heads for avatars, chat bubbles and testimonials, no bodies.
4. **HyperFrames `lottie-character-walk`**: one consistent, animated mascot (walk, point) when the video needs motion rather than poses.
5. Image generation **only** for one-off backgrounds or scenes where no recurring character appears, or as a last resort with a reference-image/LoRA workflow and a human check.
