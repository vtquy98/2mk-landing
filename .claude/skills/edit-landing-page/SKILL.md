---
name: edit-landing-page
description: Change the 2ndmarket landing page — add or redesign a section, change texts, colors, fonts, images, layout or animations, add a page. Use whenever someone asks to build, change, fix or polish anything visible on the site (except blog posts).
---

# Edit the landing page

The person asking may be a designer or a non-developer. Do the whole job, explain results in plain words,
show screenshots rather than code unless they ask for code.

## 1. Start (CLAUDE.md Rule 1)

`git checkout main && git pull && git log --oneline -10`, read what changed, then
`git checkout -b <type>/<short-name>`. Ask only what you can't infer: which section, what should change,
a reference (Figma link, screenshot, site they like). A Figma link → use the Figma tools to read the design.

## 2. Where things go (CLAUDE.md Rule 2)

| Change | File |
| --- | --- |
| Copy of a static page | that page in `src/pages/<page>.astro` or its sections in `src/components/<page>/` |
| Nav / footer / 404 texts | `src/i18n/fr.json`; markup in `src/components/Nav.astro`, `Footer.astro` |
| An article, guide, SCPI page, simulator | `src/content/<collection>/<slug>.md` (fields in frontmatter) |
| A template (all articles, all guides…) | `src/pages/<collection>/[slug].astro` and `src/components/<collection>/` |
| Colors, fonts, spacing, radii, shadows | tokens on `:root` in `src/styles/global.css` (add a token, never a raw value in a component) |
| Buttons, CTA cards, scroll reveal | `src/components/ui/` (reuse them) |
| Images | `public/assets/…` (WebP/AVIF, ≤ 200 KB, 2× the displayed size), `<img>` with `alt`, `width`, `height`, `loading="lazy"` below the fold |
| App URLs, product name, contact email | `PRODUCT` in `src/i18n/config.ts` |
| `<head>` of a static page (title, description, JSON-LD) | `src/data/seo/<page>.json` |
| A new static page | `src/pages/<slug>.astro` + `src/data/seo/<slug>.json` |
| A changed or removed URL | a 301 in `public/_redirects` |

## 3. Design bar

- Mobile first: design at 375 px, then widen. No horizontal scroll at 360 px.
- Semantic HTML: one `<h1>` (hero), `<h2>` per section, `<section id="…">` for anchors, real `<a>`/`<button>`.
- Prefer CSS (grid, flex, `clamp()`, `@starting-style`, scroll-driven animations) over JavaScript.
  Motion: ease-out, 150–400 ms, transform/opacity only; the reduced-motion rule in `global.css` must keep working.
  For animation work use the `animate` / `css-animations` / `scroll-animations` skills.
- No new dependency unless CSS/Astro really can't do it; write the reason in the PR (S10).
- Contrast AA, visible focus ring, works without JavaScript (S7, S8).

## 4. Check

1. `npm run dev` (or `npx astro dev status` if already running) and look at the change at 375 px and
   1280 px in the browser (Chrome tools if available). Take screenshots.
2. `npm run check && npm run build` must pass.

## 5. Publish

Show the person the screenshots and a plain summary. Ask for a clear "yes", then commit only the files of this
change (`feat: …` / `fix: …` / `copy: …`), push, `gh pr create` with the template filled
(screenshots, ★ items of `QA/REVIEW-CHECKLIST.md`). Give them the preview URL CI posts on the PR.
It goes live only after Quy reviews and merges.
