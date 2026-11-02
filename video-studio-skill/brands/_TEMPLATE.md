---
id: <kebab-case-id>
name: <Brand name>
kind: <company | personal | product>
source: <where the tokens came from: website URL, brand guide PDF, Figma link, or "user-supplied">
captured: <YYYY-MM-DD>
default_strength: accent   # signature | accent | full (see "How a brand meets a style")
---

# <Brand name> design

A brand file supplies **who** the video is from: colours, fonts, logo and voice rules. The style file (`styles/<id>.md`) supplies **how** the video looks and moves. They are combined at stage 2 of the pipeline.

## 1. Colour tokens
| Token | Hex | Use |
|---|---|---|
| `brand.primary` | | Main brand colour: highlights, key numbers, the one thing to look at |
| `brand.primary-dark` | | Deep version for backgrounds and gradients |
| `brand.primary-light` | | Tints, secondary bars, soft fills |
| `brand.ink` | | Main text on light backgrounds |
| `brand.paper` | | Light background |
| `brand.night` | | Dark background |
| `brand.muted` | | Secondary text, gridlines, captions |
| `brand.positive` | | Good numbers (savings, growth) |
| `brand.negative` | | Bad numbers (cost, risk) |
Chart series order: list 4-6 colours in the order charts should use them.

## 2. Typography
| Role | Font | Weight | Free source | Fallback |
|---|---|---|---|---|
| Display (titles, big numbers) | | | Google Fonts / Fontshare / bundled | |
| Body (labels, captions) | | | | |
| Mono / data (optional) | | | | |
Rules: letter-spacing, case, number style (tabular?), max words per on-screen line.

## 3. Logo
Files in this folder (`logo.svg`, `logo-dark.svg`, `logo-white.svg`). Clear space, minimum size at 1080p, which version on which background, and where it appears (intro sting, end card, corner bug).

## 4. Brand motifs
Shapes, patterns, photo treatment, iconography and any signature graphic device (e.g. cut corners, a gradient, a grid) that can be borrowed into any style.

## 5. Voice and words
Tone in 3 words, words to use and avoid, how the company/person refers to itself, sign-off line, call to action.

## 6. Video bookends
Intro sting (≤3 s), lower-third for a speaker or source, end card (logo + CTA + URL), and the music mood the brand prefers if any.

## 7. How a brand meets a style
- **signature:** the style stays as designed. Brand appears only in bookends (intro, end card), the logo bug and title font.
- **accent (default):** the style's backgrounds, textures and illustration stay. The style's accent colours and display font are swapped for the brand's; key numbers use `brand.primary`.
- **full:** brand palette and fonts replace the style's throughout; the style keeps its motion, layout and scene grammar.
Note anything that clashes with specific styles and how to resolve it.
