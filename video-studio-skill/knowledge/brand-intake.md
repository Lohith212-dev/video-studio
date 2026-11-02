# Brand intake: making a design.md

Use this when the user wants their own look (a company or a personal creator brand) and no `design.md` exists yet. Output: `~/VideoStudio/brands/<id>/design.md` in the shape of `<skill>/brands/_TEMPLATE.md`, plus logo files. `<skill>/brands/demo/` is a complete example.

## Ask once (pick whichever the user has)
"Do you have a website, a brand guide (PDF/Figma), or a few images (logo, slides, social posts) I can take the look from?" If none: "Tell me 2-3 colours you like and the feel (e.g. calm and premium, bold and young)." Then build from that.

## From a website (most common)
1. Open the site with the browser tool if available (Playwright), otherwise fetch the HTML and CSS.
2. Read computed styles: `body`, `h1`-`h3`, buttons, links. Count the most-used text colours and background colours across the page (the top 10 of each). Read CSS custom properties on `:root`.
3. Find the logo: the first `<svg>` or `<img>` in the header. Save it as `logo.svg` (or png), then make `logo-dark` and `logo-white` variants (replace `currentColor` / fills).
4. Take one viewport screenshot as `reference-hero.jpg` for later comparison.
5. Name the motifs you see (cut corners, gradients, rounded pills, photo style, icon set) — these carry the brand more than colours do.
6. Fonts: record the real family names. If a font isn't on Google Fonts, find its free source (Fontshare, the foundry's free licence) or pick the closest Google font and say so in the file.

## From a brand guide or images
Read the PDF/images, take the hex values and font names the guide states (they beat sampled ones), and copy the logo files the user provides.

## Personal creator brands
Same file. Usually: 1 signature colour + 1 neutral pair, 1 display font, a face/avatar photo, a handle (@name), a sign-off line, and caption styling (font, highlight colour). Put the handle and sign-off in §5-6.

## Check before saving
- Text colour on background passes 4.5:1 contrast (compute it).
- Every font has a source the pipeline can load offline in a render (Google Fonts link or files in `assets/fonts/`).
- §7 has a recommended strength for at least the styles the user is likely to use.
Show the user a one-screen summary (palette swatches, fonts, logo) on the project board and ask "Does this look like you?" before using it.
