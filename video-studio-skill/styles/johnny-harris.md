---
id: johnny-harris
name: "Johnny Harris-style Map Documentary"
one_line: A first-person, investigative narrator pulls you through a geography or history puzzle with clean animated maps, glowing route lines, big condensed labels, scribbled annotations on archival maps and fast documentary cutting.
best_for: [geopolitics, borders and maps, history mysteries, "why is X where it is", travel-adjacent journalism, infrastructure and trade routes]
not_for: [product launches, purely numerical finance explainers, kids' content, topics with no geographic or documentary angle]
needs_on_camera_person: false
build_difficulty: medium
pace_wpm: "175"
signature_moves: [Map flight with holds, Line draw-on, Highlight a country, Slam labels]
tested: false
tested_note: "works, but expect one extra feedback round"
references:
  - title: "The International Date Line, Explained (Johnny Harris)"
    url: https://www.youtube.com/watch?v=aBppb2quqkE
    timestamps: "0:00-0:25 to-camera cold open (presenter, adapt); 0:27 and 2:10 'TUESDAY | MONDAY' giant condensed words either side of the date line on a pale map; 0:54 globe with pins; 1:20 dense annotated map with label tags; 2:00-2:05 archival chart with handwritten scrawl and yellow '1995 change' line; 2:40-2:57 sun-and-globe day/night diagram on black; 2:57-3:30 day/night dial on olive background with clock labels and italic serif 'SUNSET/SUNRISE'; 6:15 aerial island B-roll; 8:02-8:29 orange date line on pale Pacific map with grey 180th meridian and '180°W' label; 11:10 'A DAY AHEAD / A DAY BEHIND / SATURDAY / FRIDAY' map; 12:30 screen recording of a Google search"
  - title: "How I Make My Maps (Johnny Harris) - process"
    url: https://www.youtube.com/watch?v=GsojLuJpe_0
    timestamps: "whole video: After Effects + a layered Illustrator world file for the free workflow; GEOlayers plugin with custom Mapbox styles and Natural Earth country data for the advanced workflow; country highlights are coloured solids animated on with trim paths; camera keyframes with holds"
  - title: "Why all world maps are wrong (Vox 2016, made by Harris while at Vox)"
    url: https://www.youtube.com/watch?v=kIID5FDi2JQ
    timestamps: "1:40-2:20 coloured political map with engraving cut-out; 2:50-3:10 black-land projections with yellow circles (the earlier Vox-era version of his map look)"
---

# Johnny Harris-style Map Documentary

## 1. The idea in one paragraph
This style is a detective story told on a map. The narrator says "I", admits what he did not know, shows his research (search results, scraped data, old charts) and then makes the answer visible with a map that moves exactly where the sentence points. The look is clean and modern (pale ocean, cream land, one hot accent line) mixed with rougher documentary textures (archival maps, handwriting, aerial footage). It feels personal, curious and a little urgent. It is built for adults who like geography and history, who want to feel they are figuring it out alongside the narrator.

## 2. Narration
- **Voice:** First person, energetic, conversational, slightly breathless when excited, then quiet and serious for the stakes. Mid pitch, sounds 30-ish. Self-deprecating asides ("wait, what?", "I went down a rabbit hole").
- **Pace:** 175 wpm measured from auto-subtitles of aBppb2quqkE (2,800 words over 958 s). The cold-open minute is slower (115 wpm, with music and pauses); the middle runs 180-196 wpm. Pace changes are part of the style: fast through set-up, then a hard stop before the key reveal.
- **Sentence shape:** Short and spoken, often fragments. Lots of "so", "okay", "here's the thing". Hypotheticals in second person that make geography physical ("If it's Monday evening and you fly from Hawaii to New Zealand, you'll cross into Tuesday..."). Rhetorical questions every 20-40 s. Uses specific names, numbers and sources ("the CIA Factbook", "195 miles").
- **Structure habits:** Cold open with a promise or a paradox, then "so I want to understand this", then the research journey (what I found, what conflicted), then the history, then a return to the present-day puzzle, then a reflective close. Signposts out loud ("before we settle that, I want to dig into what this line even is").
- **HyperFrames TTS pick:** `am_michael` at speed 1.08-1.12. Of the male Kokoro voices it has the best grade (C+) and handles a quick conversational read; `am_adam` is closer in age feel but is graded F+ in Kokoro's VOICES.md, so test it before using. For a female narrator, `af_heart` at 1.08 (grade A) holds energy best. Write the script in first person with contractions and short fragments; add sentence breaks where the original would pause, because Kokoro cannot whisper or speed up within a sentence. Target 170-180 wpm.

## 3. Visual system
- **Palette** (sampled from frames of aBppb2quqkE at 8:29 and 3:20, plus whole-video saturated-pixel medians):
  - `#E1EAF4` ocean (pale blue-grey)
  - `#FFEBCE` land (cream)
  - `#D9D1BB` graticule lines on land (and slightly darker blue on ocean), 1 px
  - `#6D6E71` structural line (the 180th meridian), 8-10 px
  - `#DC830D` hot orange route/boundary line, 4-5 px
  - `#3B3B0B` olive dark background for diagram scenes, with `#EDEDB8` cream and `#C0BE84` khaki for the lit globe
  - `#FCFD00` / `#FFE500` electric yellow for the sun and for drawn highlight lines on archival maps
  - `#00F7FA` cyan for highlighted areas (used on research maps, 0.4% of pixels)
  - `#111311` near-black background for "space" diagrams
  - `#E8452C` red-orange for circles drawn around places (small squares and circles on the day/night dial)
- **Typography** (exact fonts unverified; these are visual matches):
  - Big labels: a bold condensed grotesque in caps. Free: **Oswald** 700 or **Bebas Neue**, 160-260 px for slam words ("TUESDAY", "MONDAY", set vertically along the line), 64-96 px for headings, tracking 0.02em.
  - Map labels: **Oswald** 500 caps, 22-28 px, `#333`, or **Barlow Condensed** 600.
  - Secondary italic: an italic old-style serif for words like "SUNSET", "SUNRISE". Free: **Libre Caslon Text** italic or **EB Garamond** italic, 36-48 px.
  - Handwritten annotations: a fast pen hand. Free: **Caveat** 700 or **Nanum Pen Script**, 40-60 px, white or yellow, ideally drawn on as strokes.
- **Backgrounds and texture:** Clean flat maps (no relief) for explanation; archival scanned maps with visible paper, fold marks and old type for evidence; satellite/aerial imagery for "the real place"; dark olive or black for abstract diagrams. Light film grain, vignette and occasional light leaks on archival and B-roll.
- **Illustration / imagery:** Maps in three registers: (1) clean vector maps in the pale palette, (2) 3D globes (orthographic) in greyscale or cream, (3) archival maps with handwritten overlays. Plus documentary B-roll (aerials, landmarks), screen recordings of research (search pages, data portals, Wikipedia), news clips.
- **Layout:** The map is full-bleed; the important line or place is placed on a third. Giant words sit either side of a boundary to "name the sides". Labels are few and big. Annotations (circles, arrows, scribbles) appear on archival material and also on clean diagrams. *(Corrected after the recheck: a red pen circle goes around Florida on the clean day/night globe at 3:08-3:15, and a handwritten-style note "IT'S NOON IN FLORIDA RIGHT NOW" with an arrow appears at 3:00.)*

## 4. Motion language
- **Signature moves:**
  1. **Map flight with holds:** camera moves between named places: scale and translate over 1.5-3 s with `power2.inOut` (or `power3.inOut` for long hops), then holds 1-3 s while the narration names the place. Harris describes keyframing each position and making sure the camera "sits" on each keyframe for a while. *(Added after the recheck.)* Many moves are short crash-zooms (0.5-1.5 s, `expo.inOut`): for example, from the whole Alaska view down the orange line to the Aleutians (8:02-8:04). Holds on a finished map run 3-6 s (Alaska held about 5 s, 7:57-8:02).
  2. **Line draw-on:** boundary or route lines draw with `stroke-dashoffset` over 1.0-2.5 s, `power1.inOut`, in hot orange; a small open circle marker can ride the head of the line (8:02).
  3. **Highlight a country:** fill fades from land colour to accent (0.4 s, `power2.out`) while its border draws on (0.6 s, `power2.inOut`). In his workflow this is a coloured solid masked to the country and animated on with a trim path from 0 to 100.
  4. **Slam labels:** giant condensed words appear on a cut (no ease) or with scale 1.12 to 1 and opacity 0 to 1 in 0.15-0.2 s (`expo.out`), often timed to a hit in the music.
  5. **Scribble annotation:** handwriting, circles and arrows draw on over archival maps **and clean diagrams** at speaking speed (0.4-1.0 s per mark, `none` or `power1.out`), with a pen or pencil SFX. A scribble can un-draw and be replaced by a neat marker: at 3:15-3:17 the red circle around Florida becomes a red square.
  6. **Travelling token:** a small icon stands in for the person or place in the story and moves across the line. A sailboat crosses the date-line kink (2:10-2:13). Green and orange hexagons mark two places on the day/night dial and appear or vanish as the story moves (5:28-5:45).
- **Transitions between scenes:** Mostly hard cuts, very fast in montage sections (199 scene changes in 16:06, 12.4 per minute, median shot 1.2 s because of quick montage bursts and jump cuts; re-measured 2026-10-30: 198, 12.3/min). Explanation sections have long unbroken map moves (one map beat ran 2:27-3:23 with no cut). Zoom-through from a globe into a flat map; occasional whip pans and flash frames. *(Added.)* Inside a map chapter, the cuts to photos and satellite stills are inserts: the film returns to the same base map, pulled out or moved, rather than to a new map (7:55-8:19; see 4b rule 1).
- **Camera:** Map flights, slow push-ins on archival maps (scale 1 to 1.1 over 4-6 s), drone-like drift on aerial B-roll, handheld feel on talking head (which we do not have).
- **Text reveals:** Big words slam; small labels fade/scale in at 0.2-0.3 s; handwriting writes on; search-bar text types at 12-18 characters per second.

## 4a. Motion, measured
Measured on 2026-10-30 with `templates/motion_metrics.py` on a 480p download of aBppb2quqkE (12 samples/s, change threshold 0.02). Cuts are frames with an ffmpeg scene score above 0.3. Files: `research/johnny-harris/recheck/`.

| Measure | Whole video (16:06) | 60 s map section 7:50-8:50 | 60 s diagram section 3:00-4:00 | Dalio reference |
|---|---|---|---|---|
| moving_frames_pct | 63.5 | 50.6 | 34.6 | 75.3 |
| still_time_pct | 36.5 | 49.4 | 65.4 | 24.7 |
| holds_1s_per_min | 5.8 | 6.0 | 11.0 | 4.5 |
| holds_2s_per_min | 2.7 | 2.0 | 5.0 | 0.8 |
| big_change_pct | 43.4 | 38.4 | 18.2 | n/a |
| cuts per minute | 12.3 | 8 | 2 | n/a |

Longest holds: 16 s (from 5:29) and 12 s (from 4:29), both on the day/night dial while he narrates.

What it means: this is the stillest of our styles. Its motion comes in bursts (montage cuts, crash zooms, slam words), separated by long holds in which a finished map or diagram sits while the narrator talks. About 30% of the runtime is Harris on camera. His gestures register as motion, and his face and voice keep the holds alive. We have no presenter, so our holds need to be shorter than his (see section 14).

## 4b. Motion rules
1. **One map world per chapter; the camera travels and inserts return to it.** 7:55-8:19 stays on one pale base map:
   - Alaska fills yellow with a wipe from the right (7:57) and holds.
   - A crash-zoom runs down the orange line to the Aleutians (8:02-8:04).
   - A satellite still and two landscape photos are inserted (8:04-8:07).
   - The same map comes back, pulled out to the world, with a "180°W" label (8:07-8:13).
   - The camera zooms to the Bering Strait, where "EAST | WEST" lands (8:13-8:17).
2. **Move in bursts, then hold.** Camera moves are quick (0.5-1.5 s) and then the frame sits 2-6 s while the place is named. On abstract diagrams his holds run long (12 s at 4:29, 16 s at 5:29), but even then one small element changes every 3-6 s: a hexagon appears or vanishes, a marker is drawn, an arc extends. In our builds, cap holds at 8 s and keep that "one change every 3-6 s".
3. **Tokens play the characters.** Give each story one small token that travels across the key line:
   - a sailboat crosses the date-line kink (2:10-2:13);
   - two coloured hexagons mark two places on the dial (5:28-5:45);
   - a red pen circle around Florida turns into a neat square marker (3:08-3:17).
4. **Montage bursts are for evidence.** 2:00-2:24 has 13 cuts, mostly in the first 8 s, with shots of 0.4-1.5 s:
   - an archival chart with a yellow "1995 CHANGE" line;
   - research map screenshots;
   - satellite stills of islands;
   - old maps with red dots;
   - an aerial shot of ocean.

   Then a hard landing on a slam word, followed by a hold.
5. **Slam words are part of the map, and the camera pushes in after them.** Giant vertical "TUESDAY | MONDAY" sits either side of the line (2:08-2:10). The camera then pushes into the kink (2:10-2:13) and the words re-set horizontally next to the line.
6. **Hand marks go on clean diagrams too.** There is a red pen circle on the clean globe (3:08) and a note with an arrow, "IT'S NOON IN FLORIDA RIGHT NOW" (3:00). Keep them to 1-2 marks per frame.
7. **Replace the presenter with motion, not with stills.** In the original, his to-camera beats are moving frames: he talks and gestures with his hands (2:13-2:24). Fill those slots with things that move:
   - research-desk mocks (cursor moves, typing, scrolling, a highlight swiping on);
   - aerial B-roll with drift;
   - map flights.

   Never fill them with a held map or a static photo.

## 4c. Characters and casting
- **Who appears:**
  - the presenter, about 30% of the runtime: to camera, gesturing, plus a desk set in the sponsor read;
  - TV news clips with anchors (about 10:56);
  - landscape and archival photos with tiny people in them.

  There are no illustrated characters. "Who goes where" is carried by tokens (boat, hexagons, pins, pen circles) and by the camera itself.
- **For our pipeline:** no presenter. The cast is the map, one travelling token per story, research-desk mocks and real-place imagery.
- **Free sources** (check each item):

  | Source | What it gives us | Commercial use and credit |
  |---|---|---|
  | Natural Earth | Coastlines, countries, graticules | Public domain; no credit required |
  | `world-atlas` npm package | Natural Earth data as TopoJSON | Package under ISC, data public domain |
  | OpenStreetMap-derived data (Geofabrik extracts, OSM coastlines) | Detailed close-ups | ODbL: commercial use OK. The video is a "Produced Work", so credit "© OpenStreetMap contributors" on screen or in the description. Share-alike applies only if we publish a modified database. |
  | NASA Blue Marble / Earth Observatory, USGS Landsat | Satellite imagery | Public domain; no NASA logos, don't imply endorsement |
  | Copernicus Sentinel-2 | Satellite imagery | Free; credit "Contains modified Copernicus Sentinel data [year]" |
  | Library of Congress Geography & Map Division and Prints & Photographs | Archival maps and photos | Use items marked "No known restrictions" |
  | NOAA historical charts, US National Archives | Archival charts and records | Public domain |
  | Wikimedia Commons | Archival maps and photos | Public-domain items only |
  | David Rumsey Map Collection | Archival maps | Avoid: CC BY-NC-SA, non-commercial |
  | Pexels and Pixabay video | Aerial B-roll | Free commercial use, no attribution; check each clip for logos and recognisable people |
  | Tabler Icons | Small pictograms | MIT |
  | Our own SVG | Tokens: boat, hexagons, pins, pen circles | Drawn in code; no licence needed |
- **Don't use** Google Maps, Google Earth or Apple Maps imagery or styles. The reference shows Google Maps with its logo (about 12:08); we can't. Don't use real news-channel footage either.

## 4d. Text rules
- Few words, and big ones:
  - slam words in condensed caps (TUESDAY / MONDAY at 2:08; EAST / WEST at 8:17; "A DAY AHEAD / A DAY BEHIND" at about 11:10);
  - 1-6 map labels (HAWAII, NEW ZEALAND, KIRIBATI);
  - clock labels around a dial;
  - short notes in a handwritten-style face (3:00).
- Evidence text appears as images, each pushed in with one highlight:
  - a treaty paragraph with "172°" highlighted in yellow (about 9:36);
  - a Wikipedia passage with a highlighted line (about 11:28);
  - an infobox (about 12:48).

  Rebuild these as our own HTML mocks of public-domain text (section 9).
- **Text-only scenes: not allowed.** Slam words always sit on a map or diagram, and documents are evidence images, not typography cards. Our "hard stop" beats (section 5) should be a held aerial or map with one slam word, not black with text.

## 5. Scene grammar
| Scene type | Purpose | Typical length | Layout | Motion | Narration during it |
|---|---|---|---|---|---|
| Cold-open hook (no presenter) | Promise the puzzle | 5-12 s | Full-bleed aerial or archival photo, or black with one slammed word | Slow push, word slam on music hit | "This line is weird." |
| Map flight | Take the viewer to the place | 3-8 s | Full-bleed clean map | Camera flight with holds, labels fade in on arrival | Names places in order of arrival |
| Line/route draw | Show the boundary, route or change | 3-6 s | Map + one hot line + structural reference line | Draw-on, marker on the head | Describes the path |
| Sides slam | Name what is on each side | 2-4 s | Two giant condensed words either side of a line | Slam on beats, maybe vertical type | "Tuesday... Monday." |
| Research desk | Show the investigation | 3-8 s | Browser/document mock: search results, data portal, PDF page | Typing, scroll, zoom to a line, highlight | "So I scraped all the data I could..." |
| Archival evidence | Prove with an old map or document | 3-6 s | Scanned map full-bleed | Push-in, handwritten scrawl, yellow line draws | Explains what changed and when |
| Abstract diagram | Explain the physics/logic | 10-60 s | Dark olive or black, globe and sun, dial of clock labels | Continuous rotation, terminator line moves, labels | Long explanation, hypotheticals |
| Globe | Big picture | 3-6 s | Orthographic globe on white or black | Rotate to region (2-3 s `power2.inOut`), pins drop | "If you fly from Hawaii..." |
| B-roll breather | Real place, emotion | 2-5 s | Full-bleed aerial/landmark | Drift, grain | Story beat or silence |
| News clip / quote | Outside voice | 3-6 s | Clip or quote card | Cut | Quote or reaction |

**What changes without the presenter:** In the reference, 11 of the 36 evenly spaced overview frames (about 30%) are Harris on camera (talking head, desk, reaction close-ups). Those beats carry personality and give the eye a rest, and they register as *moving* frames (he gestures; see 4b rule 7). Replace them with material that moves:
- **Research-desk shots:** a browser or notebook mock with the narrator's "work" (search results typing, a data table with a highlighted row, a scribbled note). This keeps the first-person "I found" feel.
- **Hard stops:** cut to a held aerial or map frame with no music for 0.5-1 s before a key line; it does the job of the presenter's pause and stare. Keep these to one or two per video. They are the only deliberate dead-still beats.
- **Slam words and quote cards** for the punchlines he would deliver to camera.
- Keep the first-person script. A first-person voice over maps still works without a face.

## 6. Data and numbers
- Numbers are mostly spoken and labelled on the map (distances, dates), not charted. Use a measured line with a label ("195 miles / 314 km").
- Time is shown with maps that change by date (a "1995 change" line drawn over the earlier line, dashed vs solid), or with a dial.
- Comparisons between sources are shown by overlaying their versions of the same line in different colours (Google vs CIA vs another source), then highlighting the disagreement.
- When a chart is needed, keep it on the pale map palette with the hot orange as the hero series.

## 7. Sound
- **Music:** Cinematic documentary score: pulsing synth arps, low drones, light percussion, then sparse piano or ambient pads for reflective moments. Crude onset estimate on the first two minutes: about 119 BPM (low confidence). Range 90-125 BPM for the driving sections, beatless pads for reflective ones. Music drops out entirely for some key lines.
- **Sound effects:** Lots of them and loud: deep "boom" hits on slam words, risers into reveals, whooshes on map flights and globe spins, pencil/marker scratches on scribbles, keyboard typing and mouse clicks on research shots, paper handling on archival maps, camera shutter clicks. The auto-captions of his videos tag music and effects often.
- **Mix:** Measured on aBppb2quqkE: integrated -15.4 LUFS; in gaps between sentences the music/SFX are louder than the speech median (-15.6 vs -20.6 dBFS per 0.4 s window), so the score swells hard between lines and ducks under them. Target: voice -16 LUFS; music -16 to -20 dB under voice while speaking, coming up to roughly voice level in gaps over 1 s; SFX hits peak near voice level, but never on top of a word.

## 8. Pacing
- 12.4 scene changes per minute overall (median 1.2 s), but bimodal: montage bursts of 0.2-0.7 s shots (2:00-2:07 had 12 cuts in about 7 s), and long diagram/map beats of 30-60 s. Inside those beats the picture holds for 2-6 s at a time (up to 12-16 s on the dial; see 4a), with one element changing every 3-6 s.
- Map flight holds 1-3 s on each named place. A slam word holds 0.5-1.5 s.
- Full videos 12-30 minutes. For a 30-90 s version: cold-open hook (5-8 s), 2-3 map flights with one line draw, one sides-slam, one research-desk shot, one archival evidence shot, a 1 s silent stop, and a last line over a wide globe or aerial.

## 9. Assets needed and where to get them
- **Vector map data:** Natural Earth (public domain) for countries, coastlines, graticules; `world-atlas` / `topojson` npm packages (derived from Natural Earth). Project with `d3-geo` (orthographic for globes, Natural Earth or Mercator for flat maps).
- **Satellite / aerial imagery:** NASA Blue Marble and Earth Observatory (public domain), Copernicus Sentinel-2 (free with attribution), USGS EarthExplorer (public domain). Free aerial video: Pexels and Pixabay (free licence, check each clip).
- **Archival maps and documents:** Library of Congress Geography and Map Division (many public domain), Wikimedia Commons, NOAA historical charts (public domain). David Rumsey Map Collection is CC BY-NC-SA, so avoid it for commercial use.
- **Screen recordings:** build the browser and search page as HTML mocks (do not screen-record real sites with logos you cannot use); keep generic chrome.
- **Music and SFX:** see assets/sources.md (Pixabay music "documentary", "cinematic pulse"; freesound.org CC0 booms, risers, pencil scribble, typing).

## 10. HyperFrames build recipe
- **Map engine:** render maps as SVG with `d3-geo` at build time inside the composition. For flights, keep one large SVG and animate a wrapper's `scale` and `x/y` (cheap) rather than re-projecting each frame. For globe rotation, re-project an orthographic projection per frame from the timeline's time (seek-safe: compute rotation from `tl.time()` in an `onUpdate`, never from wall-clock).
- **Registry starting points:** `npx hyperframes add world-map` (D3 Natural Earth choropleth with globe inset), `us-map-flow` for route-like lines, `cinematic-zoom` for flights, `marker-highlight` and `hw-arrow`/`hw-callout-circle` for scribbles, `typewriter` for search bars, `whip-pan-cut` for fast transitions, `grain-overlay` for archival texture, `organic-light-leak-overlay` for B-roll.
- **Layer order:** base map (ocean, land, graticule) > country highlight fills > structural lines (meridian) > hot route lines > markers > labels > slam words > grain/vignette overlay.
- **Line draw:** compute `getTotalLength()` once at build time; `tl.fromTo(path, {strokeDashoffset: L}, {strokeDashoffset: 0, duration: 1.6, ease: "power1.inOut"})`. Keep `vector-effect: non-scaling-stroke` so line widths stay constant during zooms.
- **Camera with holds:** build flights as a list `[{place, scale, cx, cy, arrive, hold}]` and generate tweens; arrival times come from the narration word timings of the place names.
- **Scribbles:** write handwriting as single-stroke SVG paths (trace them, or use a single-line font such as Relief SingleLine, OFL) so they can draw on; a font like Caveat can only be revealed with a mask.
- **Archival:** image + slow push + `grain-overlay` + yellow line drawn on top in `#FCFD00` with slight jitter.
- **Pitfalls:** detailed Natural Earth 10m data is heavy; use 50m for world views and clip to the region for close-ups. Text sizes must survive zoom: put labels in a separate unscaled layer and position them from projected coordinates. Avoid Google/Apple map tiles and their styling (licensing); build your own pale style.

## 11. Storyboard frame spec
1. Scene type and duration.
2. Map: projection, region bounds at start and end of the shot, hold points with times.
3. Layers on: which countries highlighted (colour), which lines draw (data source, colour, width), markers.
4. On-screen words: slam words (size, orientation), labels, handwriting text.
5. Archival/B-roll file and the annotation drawn on it.
6. Narration line with the place names and words that trigger each arrival or slam.
7. SFX: boom / riser / whoosh / pencil / typing, with timing; music state (driving / pad / silent stop).
8. Transition out.

## 12. Do and don't
**Do**
- Write the script in first person and show the research on screen.
- Keep the clean map palette pale, with one hot orange line as the hero.
- Hold the camera on each place while it is being named.
- Use giant condensed words to name the two sides of any divide.
- Cut fast in montages, then hold long on explanations.
- Use a 0.5-1 s silent stop before the biggest reveal.

**Don't**
- Don't use Google Maps or Mapbox default styles, or other copyrighted map tiles.
- Don't put more than 5-6 labels on a map at once.
- Don't move the camera while the narrator is naming a place.
- Don't make it a talking-head video; we have no presenter, so lean on maps and research shots.
- Don't cover clean maps in scribbles: 1-2 pen marks per frame (a circle, an arrow, a short note) is the limit. *(Corrected: the reference does draw on clean diagrams, e.g. 3:00-3:17.)*
- Don't fill the presenter's slots with still frames; use moving research mocks, aerials or map flights.
- Don't hold a map longer than 8 s without a token, label or marker changing.
- Don't keep the music flat; it should swell between lines and duck under them.

## 13. Feasibility with our stack
- **Reproduces well:** clean vector maps, flights with holds, line draw-ons, country highlights, globes, slam typography, research-desk HTML mocks, archival push-ins with scribbles, the sound design pattern. These are the bulk of the style and suit SVG + GSAP well.
- **Hard:**
  - *The presenter.* Harris on camera carries a lot of the personality. Workaround: the research-desk shots, first-person script, silent stops and slam words described in section 5. A fan will notice the missing face; the style still reads.
  - *3D terrain flights and Google Earth-like shots.* Not possible with real 3D terrain in HTML without heavy work. Workaround: flat or orthographic SVG maps with satellite stills (NASA, Sentinel-2) cross-faded in at close zoom; slow pushes on satellite stills.
  - *On-location B-roll.* No filming and limited free footage of specific places. Workaround: Pexels/Pixabay aerials where they exist; otherwise public-domain photos with slow push, or stay on the map.
  - *Voice energy.* Kokoro reads evenly; it cannot do sudden whispers or excited speed-ups. Workaround: split the script into many short sentences, vary speed per paragraph (render in chunks at 1.0-1.15), and put music drops at the dramatic lines.
  - *Globe re-projection* every frame is CPU-heavy at 1080p. Workaround: simplify geometry, or pre-render globe spins as image sequences.
- **Motion, honestly (from the 2026-10-30 recheck):** the original is only 63.5% moving and its map sections about 50%, so a map-heavy build at Dalio-rebuild levels (52%) would match his map sections numerically. Our risk is different: about 30% of his runtime is a gesturing presenter, which counts as motion and carries the long holds. Without him, the same holds feel dead. We must replace that 30% with moving material (research mocks, aerials, flights) and cap our holds at 8 s. Map flights, crash-zooms, slams, travelling tokens and scribbles are all straightforward in SVG + GSAP.
- **Fidelity estimate:** 65-75% without a presenter. Map scenes alone can reach 85%. Research-desk and aerial slots reach 60-70% with free footage.

## 14. Self-check targets
Run `python templates/motion_metrics.py render.mp4 --json out.json` on the finished render, count cuts with an ffmpeg scene score above 0.3, and check snapshots for the sentences below. Targets assume no presenter.

```yaml
style: johnny-harris
reference: "aBppb2quqkE whole video: 63.5% moving, 2.7 holds>=2s/min, 12.3 cuts/min (map section 50.6% / 2.0 / 8)"
moving_frames_pct_min: 58
holds_2s_per_min_max: 3.5
holds_1s_per_min_max: 7.0
longest_hold_s_max: 8
cuts_per_min: [7, 14]
text_only_scenes_allowed: false
characters_required: false     # no presenter or drawn people; a travelling token is required instead (see checks)
colour_source: brand           # every colour comes from the brand file, except photos, satellite imagery, archival scans and maps
checks:
  - "Each map chapter keeps one base map: after any photo or satellite insert the film returns to that same map (moved or zoomed), and the camera moves in bursts of 0.5-3 s followed by holds of 2-6 s on the named place."
  - "Each story has one travelling token (boat, pin, hexagon, pen circle) that moves across the key line, and no hold longer than 8 s passes without a token, label or marker changing."
  - "The video has at least one montage burst (5+ cuts within 8 s of evidence: archival maps, satellite stills, research mocks), giant condensed slam words sit on the map on either side of a boundary, and no slot shows a held still where the presenter would have been."
```
