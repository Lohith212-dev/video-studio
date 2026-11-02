---
id: demo
name: Demo brand (Studio Blue)
kind: example
source: made up for Video Studio; replace it with your own (see knowledge/brand-intake.md)
captured: 2026-11-02
default_strength: accent
---

# Demo brand design

A neutral example brand so the skill works out of the box. It reads as **precise, calm, confident**: electric blue on cool off-white, heavy tight headlines, clean data cards. Make your own with `_TEMPLATE.md` or ask Claude to "set up my brand" (it reads your website).

## 1. Colour tokens
| Token | Hex | Use |
|---|---|---|
| `brand.primary` | `#146EF5` | Logo mark, buttons, key numbers, highlight bars |
| `brand.primary-dark` | `#0B3FA8` | Deep end of the hero gradient; dark backgrounds with blue character |
| `brand.primary-light` | `#7CB9FF` | Secondary bars, soft highlights on dark |
| `brand.primary-tint` | `#EEF4FF` | Pale blue fills, chips, card backgrounds |
| `brand.ink` | `#13161B` | Main text, logo wordmark on light |
| `brand.paper` | `#F5F8FA` | Light background |
| `brand.surface` | `#FFFFFF` | Cards on light background |
| `brand.night` | `#080A0C` | Darkest background; dark panels `#1E2229` |
| `brand.muted` | `#7C8492` | Captions, small caps labels; body grey `#515761`; lines `#9EA3AE` |
| `brand.positive` | `#15803D` | Savings, growth |
| `brand.negative` | `#FF4444` | Cost, risk, alerts |
Chart series order: `#146EF5`, `#7CB9FF`, `#13161B`, `#9EA3AE`, `#15803D`, `#FF4444`.
Hero gradient: linear, top-left `#146EF5` → bottom-right `#0B3FA8`.

## 2. Typography
| Role | Font | Weight | Free source | Fallback |
|---|---|---|---|---|
| Display (titles, big numbers) | Plus Jakarta Sans | 800, letter-spacing -2% | Google Fonts | system-ui |
| Body (labels, captions, UI) | Inter | 400 / 500 / 700 | Google Fonts | system-ui |
| Small caps labels | Inter | 600, 11-12 px at 720p, letter-spacing 1 px, UPPERCASE | Google Fonts | system-ui |
Rules: headlines in Title Case, tight leading (1.0-1.05). Big numbers in Plus Jakarta Sans 800. At most 6 words per on-screen line.

## 3. Logo
- `logo.svg` (blue mark + wordmark that takes the text colour), `logo-dark.svg` (ink wordmark, for light backgrounds), `logo-white.svg` (all white, for blue or dark backgrounds). The wordmark says "Your Brand": swap in your own files.
- Clear space: the height of the mark on all sides. Minimum width at 1080p: 180 px.
- Placement: end card centre; optional corner bug top-left at 160 px wide, 60% opacity.

## 4. Brand motifs
- **Floating data cards:** white cards with a soft shadow, small caps label, one big number, a thin progress bar.
- **Icons:** Lucide line icons (1.8-2 px stroke), free (ISC licence).

## 5. Voice and words
- Tone: precise, calm, outcome-first. Concrete numbers over buzzwords.
- CTA on the end card: "Learn more · example.com" (replace with yours).

## 6. Video bookends
- **Lower-third:** white card, small caps label in `brand.muted`, name in Plus Jakarta Sans 800, a 3 px `brand.primary` bar on the left.
- **End card (3-4 s):** paper background, logo centred, one CTA line.
- **Music mood:** calm, modern, light electronic or piano.

## 7. How this brand meets each style
| Style | Recommended strength | Notes |
|---|---|---|
| ray-dalio-principles | accent | Keep the hand-drawn props. Worlds become paper and the blue gradient; highlights `#146EF5`, coins stay gold. Logo only on bookends. |
| vox-explainer | accent | Paper and collage stay; highlighter colour becomes `#7CB9FF`, key numbers `#146EF5`. |
| kurzgesagt | full | Flat vector suits it; palette from the blues with `#FF4444` and `#15803D` as contrast colours. |
| kinetic-type-launch | full | Blue gradient, data cards, big Jakarta numbers. |
| varun-mayya / vaibhav-sisinty | accent | Captions in Plus Jakarta Sans 800 with `#146EF5` word highlight. |
| whiteboard-sketch | signature | Keep black-on-white; brand only in title font and bookends. |
