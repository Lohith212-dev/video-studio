---
id: fireship
name: "Fireship Code Report"
one_line: A dry, rapid-fire, joke-a-sentence tech news narrator over a dark screen where screenshots, logos, code, stock-footage gags and memes slam in every second or so, annotated with red marker arrows, circles and chunky outlined captions.
best_for: [developer and AI tool news, "X in 100 seconds" concept explainers, product launch reactions, tech drama and controversies, faceless channels]
not_for: [serious or sad topics, non-technical audiences who need slow explanation, luxury/brand films, children's content]
needs_on_camera_person: false
build_difficulty: easy
pace_wpm: "206"
signature_moves: [Stamp pop, Marker annotation, Screenshot slide and tilt, Badge/number pop]
tested: false
tested_note: "works, but expect one extra feedback round"
references:
  - title: "Every app on Earth is now open source... whether it likes it or not (The Code Report, 6.6M views)"
    url: https://www.youtube.com/watch?v=wajoP_5Cpw8
    timestamps: "0:00 'LAST WEEK...' cream title on black; 0:01-0:04 stock footage of a man smashing a monitor with an Adobe logo stamped on the screen; 0:05-0:07 Adobe apps page screenshot, Rust logo stamps on top; 0:08-0:13 row of Adobe app icons -> skulls -> clone icons with green 'FREE' sticker; 0:14-0:17 GitHub README with 'Starred 46.7k' badge popping; 0:18-0:21 Adobe cancellation screen + stock angry man + red 'HOW IS THIS REAL' text and red arrow; 0:21.2 paper-curl transition to a tilted news headline with a highlighted phrase; 0:28-0:30 meme photo with OS logos pasted on faces; 1:00-1:03 tweet card + logo cluster, padlock pops on top; 1:03.6-1:07 'IN TODAY'S VIDEO...' word by word over stock footage; 1:07.3 glitch into a reaction-meme photo with company logos pasted on; 1:10.4-1:14 'THE CODE REPORT' neon flicker-on, then the date; 1:16-1:20 avatar + icon equation builds, 'Adobe' becomes 'AdobOLETE'; 1:20.8 'yes.' alone on black; 3:20-3:23 terminal recording; 3:22.8 glitch to an archival photo; 3:26.4-3:31.2 GHIDRA README held still 4.8 s; 3:32.4 '.exe' '.dll' word stamps; ~1:36 '$69.99 / MONTH (NICE)' over stock clip; ~2:24 'THE STANLEY KUBRICK' caption on archival photo; ~3:36-3:56 code editor and AI agent screen recordings"
  - title: "Did the AI bubble just pop? (The Code Report, same format, for a second look)"
    url: https://www.youtube.com/watch?v=nEaJMdM1djM
    timestamps: "not downloaded; listed from the channel page as a second example. The first reference was re-checked 2026-10-30 with 2.5 fps strips of 0:00-0:24, 1:00-1:24 and 3:20-3:44 (research/fireship/recheck/)"
---

# Fireship Code Report

## 1. The idea in one paragraph
**Why this style:** our existing cassettes cover documentary explainers (Vox, Johnny Harris), illustrated science (Kurzgesagt), animated economics (Ray Dalio), whiteboard and Apple-style kinetic type. None covers the fast, meme-literate, faceless tech explainer, which is the most imitated format in developer and AI content and is a natural fit for this pipeline: it needs no presenter, no illustration skills and no paid footage, it is built from screenshots, logos, code and text that HTML renders natively, and its topics (AI tools, launches, tech drama) match the Indian creators in this batch. Fireship (Jeff Delaney, about 4.3M subscribers) runs two formats: "X in 100 Seconds" concept explainers and "The Code Report" news episodes (5-6.5 min). The feeling is a sharp, sarcastic friend who reads everything and tells you in two minutes what matters, with a joke in almost every sentence. The visuals are a dark stage where evidence and gags arrive at a relentless rate: a real GitHub page, then a stock-footage businessman screaming with a logo stamped on his phone, then a meme, then code. It is built for developers and tech-curious viewers who appreciate density, irony and accuracy.

## 2. Narration
- **Voice:** Male, 30s, American, deadpan and dry, slightly nasal, never shouts. Irony carried by understatement ("there's one small catch. The software is a nearly unusable pile of vibe-coded horse..."). Confident technical delivery.
- **Pace:** Measured from auto-subtitles of wajoP_5Cpw8 (first 7 min): 1,210 words over 353 s = **206 wpm**, only 2 s of pauses longer than 1.5 s. Target 195-210 wpm with almost no pauses; jokes land by cutting to the visual, not by waiting.
- **Sentence shape:** 10-25 words, dense with proper nouns and jargon used precisely, then deflated with a plain-English punchline ("In layman's terms, that means..."). Lists of absurdly specific technical items for comic effect. Asides in parentheses ("And let's just ignore the fact that DaVinci Resolve has been an alternative for over 20 years now"). Self-deprecation about his own workflow. Occasional mild censored swear cut by the edit.
- **Structure habits:** Cold open "Last week, ..." with the story in 3-4 sentences (0:00-0:45); a thesis question ("is this the final nail in the coffin for software as we know it?"); the signature line **"It is [date], and you're watching The Code Report."** with a title card; investigation/test of the claim; conclusion with a twist; a sponsor segment at the end, bridged from the story with a gag (in the reference it starts around 5:00); sign-off (confirmed in the reference transcript) "This has been The Code Report, thanks for watching, and I will see you in the next one." The 100 Seconds format: "X, a [category] famous for [trait]. It was created in [year] by..." then a rapid feature tour and a minimal code example.
- **HyperFrames TTS pick:** `am_michael` at speed 1.20 (closest to a dry American male; Kokoro grade C+). Measure and adjust to 200-210 wpm. Alternative for a drier, British-sounding take: `bm_george` at 1.15. Avoid `am_adam` (graded F+). Write jokes as short declarative sentences; Kokoro cannot do sarcastic intonation, so the edit has to deliver the irony.

## 3. Visual system
- **Palette** (sampled from frames of wajoP_5Cpw8):
  - `#0E0C0D` stage black (the dominant background; dark tones are over 50% of sampled pixels)
  - `#1C1A1B` raised panel (cards, code background)
  - `#F2EEDB` cream title text (measured `#D6D3BF` with anti-aliasing on the 480p frame; the fill is a warm off-white)
  - `#F0233C` marker red (annotation text, arrows, circles; measured `#EB2341`-`#F52341`)
  - `#1CBC5C` sticker green ("FREE" stickers, positive stamps)
  - `#F6C42A` emoji yellow (pointing-hand emoji, stars)
  - `#D57654` date orange (The Code Report date line)
  - Everything else is the real colours of the screenshots, logos and footage (white web pages, VS Code dark `#1E1E1E`, brand logo colours).
- **Typography** (1920x1080; the channel's exact display face is not confirmed; these are the closest free matches by shape):
  - Title cards and gag captions: **Fredoka** 700, all caps, 110-140 px for full-frame titles ("LAST WEEK..."), 70-90 px for over-footage captions, letter-spacing 0.02em, cream `#F2EEDB` or white with a 6-8 px black stroke (`paint-order: stroke fill`) and a 0 6 0 black hard shadow when over footage. Alternative: **Baloo 2** 800.
  - Red marker annotations: the same face in `#F0233C` with 6 px black stroke, 60-80 px, two lines max ("HOW IS / THIS REAL").
  - Code: **JetBrains Mono** 400/600 28-34 px in a VS Code-style dark panel with syntax colours.
  - UI and small labels: **Inter** 500-600 24-32 px.
  - Show-title card: **Archivo Black** or **Anton** in a white outline box ("THE CODE REPORT"), date in Fredoka 600 orange beneath.
- **Backgrounds and texture:** Flat stage black. No grain. Footage and screenshots usually do not fill the frame: they float as cards (80-92% width) with 8-12 px rounded corners and a soft drop shadow (`0 20px 60px rgba(0,0,0,.6)`), sometimes tilted 2-6 degrees.
- **Illustration / imagery:** Collage of real-world evidence and gags:
  - Screenshots: GitHub READMEs, product sites, docs, tweets/X posts, news headlines, terminals, code editors.
  - Logos and app icons (official marks) as stamps.
  - Stock footage clips (businessmen, offices, server rooms) used ironically, often with a logo pasted on a screen, phone or face.
  - Reaction memes and well-known meme formats as quick cutaways.
  - Simple diagrams (boxes and arrows in flat teal/blue) for architecture explanations.
  - Hand-drawn red annotations: curved arrows, circles, underlines.
- **Layout:** 16:9, one hero item centred at 80-90% width; a second item (logo, sticker, emoji, meme cut-out) overlaps a corner. Captions over footage sit in the lower-right or centre-right third. Safe margin 60 px. Density is high in time, low in space: one main item per moment plus at most two stamps.

## 4. Motion language
- **Signature moves:**
  1. **Stamp pop:** a logo, sticker, emoji or meme cut-out appears with `scale 1.4 to 1` + `rotation -8 to -3 deg` in 0.12-0.18 s, ease `back.out(2.5)`, sometimes with a 2-frame white flash. No exit animation: it disappears on the next cut.
  2. **Marker annotation:** a red arrow or circle draws itself with `stroke-dashoffset` in 0.2-0.3 s (`power2.out`), hand-drawn path with uneven width (two overlapping strokes), then the red outlined text pops beside it (0.12 s, `back.out(2)`).
  3. **Screenshot slide and tilt:** the next screenshot card slides in from 120-200 px below or from the side with a slight rotation settling to 0-3 deg (0.25 s, `power3.out`; the GitHub README enters from the right at 0:13.6), then **sits still** (corrected: our first analysis said cards drift or push in; in the strips they do not: the Adobe apps page holds still 0:05.2-0:07.6, the GHIDRA README 3:26.4-3:31.2). It leaves by a cut, a glitch or a slide-off (0:08.4, exits left).
  4. **Badge/number pop:** a UI badge ("Starred 46.7k") or price ("US$99.95", "$69.99 / MONTH") pops with overshoot (0.15 s, `back.out(3)`), tilted, with a small camera shake (2-3 px, 0.15 s).
  5. **Paper curl / page peel:** a headline card curls away to reveal the next card (0.3-0.4 s); approximate with a skew + rotateX + shadow tween, or the registry `torn-paper-rip`.
  6. **Hard-cut meme punch:** a full-frame meme or stock reaction for 0.5-1.2 s exactly on the punchline, with no transition.
  7. **Glitch transition:** RGB split plus horizontal slice displacement for 0.2-0.4 s into the next shot (1:07.3 into the meme, 3:22.8 terminal into an archival photo). The show title flickers on like a neon sign (1:10.4-1:12).
  8. **Transform gag:** an object turns into the joke: app icons glitch into skulls while clone icons appear beneath (0:09.6-0:10.4); the "Adobe" wordmark grows "OLETE" over its last letter to read "AdobOLETE" (1:18); an equation builds piece by piece: avatar, "+", icon, logo (1:16-1:18).
- **Transitions between scenes:** Mostly hard cuts (8.1 per minute at the 0.3 threshold), plus glitches (move 7), the page peel (0:21.2) and slide-offs (0:08.4). Most changes happen on the black stage without a cut, so the eye reads constant change, not constant motion.
- **Camera:** Static. No push-ins as a rule (corrected); micro shakes on impacts.
- **Text reveals:** Titles appear word by word, one pop per spoken word ("LAST" then "LAST WEEK..." 0:00-0:01; "IN" then "IN TODAY'S VIDEO..." 1:03.6-1:05); captions pop with a 0.15 s scale overshoot; terminals and code editors type at 30-60 characters/s with a block cursor (3:20).

## 4a. Motion, measured
Measured on 2026-10-30 with `templates/motion_metrics.py` on wajoP_5Cpw8 (854x480, 5:55). Files: `research/fireship/recheck/motion_*.json`, cuts in `cuts_0.3.txt`.

| Measure | Whole video | 60 s section (1:00-2:00) | Dalio, for reference |
|---|---|---|---|
| moving_frames_pct | 55.8 | 66.1 | 75.3 |
| still_time_pct | 44.2 | 33.9 | 24.7 |
| holds_1s_per_min | 6.8 | 5.0 | 4.5 |
| holds_2s_per_min | 2.0 | 2.0 | 0.8 |
| big_change_pct | 41.2 | 52.7 | - |
| cuts per minute (ffmpeg scene > 0.3) | 8.1 | 14 | - |
| visual-change onsets per minute (frame difference rising above 1.0) | 61 | 50 | - |

**What it means:** the opposite of Dalio. The frame is still almost half the time, but a still never lasts: a new event lands about once a second, and holds over 2 s happen about twice a minute (READMEs, docs, terminals). Test change rate, not motion. A render with 50% still time is on-style here only if its holds are short.

## 4b. Motion rules
1. **Change every second; motion is optional.** About 50-60 visual events per minute. A card may sit perfectly still for 1-3 s (Adobe apps page 0:05.2-0:07.6), but holds over 2 s stay at about 2 per minute and belong to docs or code (GHIDRA README 3:26.4-3:31.2).
2. **Evidence lands, then the gag lands on it.** Card first, then a stamp 1-2 s later: Rust logo on the Adobe apps page (0:07.6); padlock over the cluster of software logos (1:03.2); "Starred 46.7k" badge flies in (0:14.4); ".exe" and ".dll" word stamps (3:32.4-3:33.6).
3. **Objects transform into the joke.** Adobe app icons glitch into skulls while clone icons appear beneath, then a green "FREE" sticker slaps on (0:09.6-0:12.4); "Adobe" becomes "AdobOLETE" (1:18).
4. **People are stock actors acting out the narration's emotion, with the brand on their props.** A man smashes a monitor that carries the Adobe logo, pinned to the screen as it moves (0:01-0:05); an angry man shouts into a phone beside the cancel dialog (0:17-0:21); a man fiddles inside a PC under "IN TODAY'S VIDEO..." (1:03-1:07). About 3-5 people beats per minute, 1-4 s each.
5. **Transitions are noisy, never smooth.** Hard cut, glitch (1:07.3, 3:22.8), page peel (0:21.2), slide-off (0:08.4); neon flicker for the show title (1:10.4).
6. **The red annotation comes after the evidence.** The cancel dialog appears at 0:17.2; the red arrow draws to "US$99.95" and "HOW IS THIS REAL" pops at 0:18.8.
7. **Black text cards punctuate.** "LAST WEEK..." (0:00-0:01), "yes." (1:20.8): words appear as they are spoken, on screen 1.5 s or less.

## 4c. Characters and casting
- **Who appears:** no illustrated characters and no presenter. The cast is:
  - logos and app icons, the most frequent performers: they stamp, line up, turn into skulls, get padlocked;
  - stock-footage actors acting out a feeling (rule 4);
  - a reaction-meme photo with company logos pasted over the people (1:07-1:10);
  - an archival photo (3:23-3:26);
  - the story's subject as a round avatar (0:16, 1:16).
- **Free sources for our pipeline:**
  - Logos: **Simple Icons** (CC0 for the SVG files). The marks are still trademarks: follow each brand's guidelines (simple-icons links them per icon), use them only to name the company, and do not alter the mark itself. Do the gag around it: a stamp on top, or a transform into a separate icon of our own.
  - People: **Pexels and Pixabay** stock video (free licences, no attribution). Their terms forbid showing identifiable people in a bad or offensive light and implying endorsement, so pin logos on objects (monitor, phone, laptop), never on faces, and keep reactions mild.
  - Reaction imagery: CC0 or public-domain photos only (Pexels, Pixabay, Unsplash licence); **no copyrighted memes** and no famous meme templates.
  - Emoji: Microsoft Fluent Emoji (MIT), Noto Emoji (Apache 2.0), Twemoji (CC BY 4.0, credit needed). Avoid OpenMoji (CC BY-SA, share-alike).
  - Archival photos: Library of Congress or Smithsonian Open Access (public domain), or Wikimedia Commons after checking each file's licence.
  - Avatars of real people: use initials or a generic silhouette unless the user supplies a photo they have the rights to.
  - Not a fit: the illustrated people in `casting/` (Open Peeps, Humaaans), which turn it into a different style.

## 4d. Text rules
- **Amount:** moderate and short. Our own text is limited to:
  - gag captions of 5 words or fewer;
  - red annotations of 4 words or fewer;
  - word-pun transforms;
  - black title cards.
  Most words on screen come from the real screenshots (headlines, READMEs, tweets, terminals).
- **Where:** captions sit centre or lower-right over footage, with a black stroke; red annotations go beside the arrow that points at the evidence.
- **Text-only scenes are allowed but brief:** black cards with 1-3 words, 1.5 s or less, as punctuation ("LAST WEEK..." 0:00, "yes." 1:20.8). Never a paragraph, never subtitles of the narration.

## 5. Scene grammar
| Scene type | Purpose | Typical length | Layout | Motion | Narration during it |
|---|---|---|---|---|---|
| Cold-open title | Start the story | 0.8-1.2 s | Cream caps text centred on black ("LAST WEEK...") | Instant on | "Last week, ..." |
| Evidence card | Show the real thing | 1-3 s | Screenshot card 85% width, maybe tilted | Slide in, then still | States the fact |
| Stamp gag | Joke on top of evidence | 0.5-1.5 s | Logo/sticker/emoji over the card or footage | Stamp pop | Punchline word |
| Stock-footage gag | Comic dramatisation | 1-3 s | Full-frame stock clip with logo pasted on object | Hard cut, logo stamp | Describes a feeling ("predatory business model") |
| Marker callout | Point at the detail | 1-2 s | Red arrow/circle + red outlined text | Draw + pop | "You'll be charged an early termination fee" |
| Meme cutaway | Punchline | 0.5-1.2 s | Full-frame meme | Hard cut | The joke |
| Show title card | Brand beat | 1.5-2 s | "THE CODE REPORT" box + date | Pop | "It is [date], and you're watching The Code Report" |
| Code / terminal | Show how it works | 3-8 s | VS Code-style panel or terminal, red arrow on the key line | Typing, highlight line | Explains the code in plain words |
| Diagram | Architecture | 2-5 s | Flat boxes ("Container 1", "Hypervisor", "Host") | Boxes stack in | Explains layers |
| Sign-off | End | 2-3 s | Stage black, small logo | Cut | "This has been The Code Report..." |

## 6. Data and numbers
Numbers come from real screenshots (pricing pages, GitHub star counts, benchmark charts, Google Trends lines) rather than redrawn charts. Emphasis is added with a red circle or arrow and a gag caption ("$69.99 / MONTH (NICE)"). When a chart must be drawn, keep it as a simple dark card with a white line or bars and one red annotation. A number is on screen 1-2 s. Prices and big counts pop with overshoot and a small shake.

## 7. Sound
- **Music:** Very quiet or absent under narration: YouTube's auto-subtitles never tag "[music]" in the analysed episode (by contrast they tag it all through the Aevy TV reference), so any bed is far below the voice. If used, a lo-fi or chill electronic loop at 85-100 BPM, -30 dB under voice, with a brief sting on the show title card.
- **Sound effects:** Meme-style and sparse, used as punchlines: a pop on stamps, a short whoosh on slides, a cash register on prices, a record-scratch or "boom" on a big punchline, a keyboard clatter under code typing. One SFX every 3-6 s; never on every stamp.
- **Mix:** Voice dominant at -14 LUFS; SFX at -14 to -18 dB (punchy, short); music, if any, at -30 dB.

## 8. Pacing
- wajoP_5Cpw8 (first 7 min): ffmpeg scene detection found only **48 cuts at threshold 0.3 (8.1/min)** and 80 at 0.15, because most changes are new items on the same black stage. A 1 fps strip of 0:00-0:30 shows about **18 distinct visuals in 30 s (one every 1.7 s)**, plus overlays added between them: a **new visual event every 1.0-1.5 s**. At threshold 0.08 the first 2 min show 63 changes.
- A screenshot holds 1-3 s (a README or doc up to 5 s), a gag 0.5-1.5 s, code or a terminal up to 8 s. Holding still is fine; going 2 s without a new event is rare (2 per minute). Code Report episodes run 5-6.5 min; 100 Seconds videos about 2-2.5 min. For our 30-90 s version: 1 s title, 20-60 s story with ~1 visual/s, 3 s sign-off.

## 9. Assets needed and where to get them
- **Screenshots:** captured from the real sources with Playwright (full-page or element screenshots); this is the backbone and must be real and current.
- **Logos and app icons:** official press kits, Simple Icons (CC0), or `/media-use` `resolve --type logo`.
- **Stock footage for gags:** Pexels and Pixabay video (free licences; check people/brand restrictions), Mixkit.
- **Memes:** copyrighted images are a risk; prefer CC0 reaction photos from Pexels/Unsplash-style free libraries, or draw simple reaction emoji (Twemoji, CC BY 4.0; Noto Emoji, Apache 2.0) at large size.
- **SFX:** `assets/starter-kit/sfx/` (pop-01, whoosh-quick-01, cash-register-01, impact-thud-02, marker-circle-01, typewriter-01, glitch-01).
- **Fonts:** Fredoka, Baloo 2, JetBrains Mono, Inter, Archivo Black / Anton (Google Fonts).

## 10. HyperFrames build recipe
- **Canvas:** 1920x1080 at 30 fps; `body` background `#0E0C0D`. Vertical variant 1080x1920 with the hero card at 92% width and captions in the lower third.
- **Layer order:** stage black -> hero card (screenshot / footage / code) -> stamps (logos, stickers, emoji) -> marker annotations -> gag captions -> flash/shake wrapper on top.
- **Timing source:** get word timings from the TTS (`npx hyperframes transcribe` on the Kokoro WAV); schedule every visual on a word, typically the noun it names. Aim for one event per 4-6 words.
- **Components to build once:**
  - `shot-card(src, tilt, from)`: rounded 10 px card with shadow; enter 0.25 s `power3.out`; then still (no push).
  - `stamp(src, rot)`: scale 1.4 -> 1, 0.15 s `back.out(2.5)`.
  - `marker-arrow(from, to, curve)`: two SVG paths with slightly different widths and offsets drawn via dashoffset in 0.25 s, red `#F0233C`, round caps, 10-14 px stroke.
  - `marker-circle(bbox)`: imperfect ellipse path, 0.3 s.
  - `gag-text(text, colour)`: Fredoka 700 caps with `-webkit-text-stroke` or `paint-order: stroke` black 6-8 px and hard shadow.
  - `title-card(text)`: cream caps on black.
  - `code-report-card(date)`: outlined show title + orange date.
  - `shake(el)`: 3 quick x/y tweens of 2-4 px, 0.05 s each, `none`.
- **Registry blocks:** `yt-circle-pointer` and `hw-arrow` / `hw-callout-circle` (marker annotations, restyle red), `torn-paper-rip` (page peel), `camera-shake` (impacts), `code-typing` / `code-snippet-dark-modern` / `terminal-simulator` (code), `x-post` and `reddit-post` (social screenshots, when real captures are unavailable), `browser-device-stage` (site demos), `headline-slam` (news headlines), `count-up` (stars and prices), `beat-freeze-cut` for a freeze on a punchline.
- **Pitfalls:** over-animated entrances kill the style; most items should arrive in under 0.2 s. Keep annotation red and captions cream/white only. Don't let stamps cover the information they joke about. Make sure every screenshot is legible at 1080p (zoom the card to the relevant part rather than showing a whole page).

## 11. Storyboard frame spec
Each frame must specify:
- `beat`: title / evidence / stamp / stock-gag / marker / meme / show-title / code / diagram / sign-off
- `hero`: source of the main card (URL to screenshot, stock clip, code snippet) and tilt
- `stamps`: logo/sticker/emoji ids, positions, rotation
- `marker`: arrow or circle target and red text (max 4 words)
- `gag_caption`: cream/white caps text (max 5 words)
- `trigger_word`: the narration word that fires the beat
- `sfx`: pop / whoosh / cash / boom / typing, if any
- `duration` (most beats 0.5-2 s)

## 12. Do and don't
**Do**
- Open with "Last week, ..." (or "X, a ... famous for ...") and the story in 3 sentences.
- Back every claim with a real screenshot within a second of saying it.
- Put a joke in at least every other sentence, delivered by a visual stamp or cutaway.
- Use precise technical language, then translate it into plain English with a punchline.
- Keep the stage black and the annotations red.
- Sign off with a fixed line.

**Don't**
- Don't use a presenter or talking head.
- Don't hold any visual longer than about 3 s, except READMEs and docs (5 s) and code (8 s); something new must land at least every 2 s.
- Don't use smooth corporate transitions, gradients or 3D; don't add slow push-ins to make cards "move" (the style changes, it does not drift).
- Don't use bright background colours; colour comes only from screenshots, logos and the red/green accents.
- Don't let music compete with the voice.
- Don't punch down; the jokes target companies, tools and the narrator himself.

## 13. Feasibility with our stack
- **Reproduces well (85-90%):** this is the most HyperFrames-friendly style in the batch: dark stage, cards, stamps, markers, gag text, code panels and diagrams are all HTML/SVG/GSAP, and there is no presenter to replace. The free stack covers fonts, SFX and stock gags.
- **Medium: the joke writing.** The style lives or dies on the script: dense, accurate, ironic. The script step must aim for one joke per 2 sentences and one visual gag per 4-6 words; this is an LLM writing task, not a rendering one.
- **Medium: meme imagery.** Famous meme images are copyrighted. Use free stock reactions, large emoji or self-made text memes; fidelity of the gag layer drops to about 70%.
- **Hard: the voice.** Jeff's deadpan delivery is a large part of the identity; `am_michael` at 1.2 gets the pace but reads flatter and cannot do sarcasm. A HeyGen voice (paid beyond the free allowance) could be tried via `/media-use` if the user wants better delivery.
- **Hard: real screen recordings of tools.** Web pages can be captured automatically with Playwright; desktop apps or logged-in demos need the user to record (OBS, free).
- **No presenter needed:** `needs_on_camera_person: false`. An AI avatar would break the style.
- **Medium: pinning a logo to moving stock footage** (0:01-0:05). True motion tracking is not in our stack. Workaround: pick clips where the object moves little and keyframe the logo by hand every 0.5 s, or put the logo on a still frame of the clip.
- **Easy: the motion targets.** Unlike Dalio-style builds, still cards are allowed here; the risk is the opposite (too few events). Schedule one event per 4-6 spoken words and check that holds over 2 s stay at about 2 per minute.
- **Medium: the cast.** Free stock actors and CC0 reaction photos are weaker than famous memes; the gag layer drops to about 70%.
- **Overall fidelity:** about 80-85% visually; overall about 75% because of the voice.

## 14. Self-check targets
Measure a render with `python templates/motion_metrics.py render.mp4 --json out.json` and count cuts with ffmpeg scene detection (> 0.3). A reviewer checks the sentences from snapshots taken every 1 s.

```yaml
style: fireship
moving_frames_pct_min: 50        # reference 55.8 whole, 66.1 in 1:00-2:00; stills are fine if short
holds_2s_per_min_max: 3          # reference 2.0; only docs, READMEs and code may hold
cuts_per_min: [6, 16]            # reference 8.1 whole, 14 in 1:00-2:00; most changes happen on the black stage
text_only_scenes_allowed: true   # brief black cards only (1-3 words, 1.5 s or less)
characters_required: false       # no drawn people; stock actors and reaction photos fill the role
colour_source: "brand"           # stage black, cream type, red annotations; brand accent for stickers
checks:
  - "Consecutive 1 s snapshots differ in at least 4 of every 5 pairs (a new card, stamp, annotation or caption), and no non-code card is unchanged for more than 3 s."
  - "Every screenshot card gets a gag or annotation within 2 s of landing (stamp, sticker, red arrow or caption), and at least one object transforms into the joke per minute."
  - "At least 2 reaction beats per minute (stock actor or CC0 reaction image), every logo is an unaltered Simple Icons or official mark, and no copyrighted meme appears."
```
