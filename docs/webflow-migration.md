# Webflow → Astro migration (2ndmarket.fr)

Goal: rebuild https://2ndmarket.fr (Webflow) in this repo with the same pages, URLs, look and SEO, as maintainable
code, then switch Webflow off. Branch: `feat/webflow-migration`.

## Rules

1. **No page lost, no URL changed.** Every URL that answers 200 on Webflow answers 200 here at the same path;
   every Webflow 301 stays a 301 (`public/_redirects`).
2. **Same look.** Each page is checked against the live page with `scripts/webflow-import/compare.mjs`
   (1440 px and 375 px). Differences are fixed or listed below with the reason.
3. **Rewritten, not copied.** The Webflow CSS/JS is never shipped. Layout and templates are Astro components with
   scoped styles on the tokens of `src/styles/global.css`. Webflow runtime hacks (jQuery, IX2/GSAP, `tm*` class
   decoding, legacy-route rewriting) are replaced by build-time transforms or small typed scripts.
4. **Content is data.** CMS items become Markdown in `src/content/<collection>/` (one file per item, fields in
   frontmatter). Per-article custom HTML/CSS embeds written by the content team are content: they are kept inside
   the article (scoped, cleaned), not turned into site CSS.
5. **Self-hosted.** Every asset (images, video, PDF, Lottie JSON, fonts) is in `public/assets/` or built by Astro:
   no request to Webflow's CDN.
6. **SEO / GEO / AEO kept or improved.** Titles, descriptions, canonicals, OG/Twitter tags and every JSON-LD block are
   imported per page. `llms.txt` and `robots.txt` are kept as on Webflow; the sitemap lists only real (200) pages.

## Inventory (crawl of 2026-11-23)

693 sitemap URLs = 529 pages (200) + 164 redirects (301); 13 more 301s and 4 hidden pages found through links.

| Template | Pages | Route / collection | Owner |
| --- | --- | --- | --- |
| Shell: nav, footer, floating CTA, Google sources block, 404, alert widget | all | `src/components/`, `src/pages/404.astro` | shell |
| Home `/`, `/home-new`, `/viager`, `/observatoire-scpi` + listings `/scpi-listing/*` (3) | 4 + 3 | `src/pages/`, `scpi-listing` | home |
| `/a-propos`, `/contact`, `/merci`, `/maintenance`, `/qrcode`, `/questionnaire` | 6 | `src/pages/` | static-a |
| `/faqs`, `/demembrement`, `/viager-guides`, `/scpi-essentiel` | 4 | `src/pages/` | static-b |
| Actualités: `/actualites/*` + hub `/actualites-conseils` | 101 + 1 | `actualites` | actualites |
| Guides: `/guide-scpi/*`, `/landing-pages/*` + hub `/guides-scpi-viager-demembrement` | 84 + 75 + 1 | `guide-scpi`, `landing-pages` | guides |
| SCPI pages: `/2nd-seo/*`, `/seo/*`, `/repertoire`, `/legal/*` | 129 + 77 + 1 + 2 | `2nd-seo`, `seo`, `legal` | scpi |
| Simulators: `/simulateurs/*` + hub `/simulateurs` | 43 + 1 | `simulateurs` | simulateurs |

`/landing-pages/contester-taxe-fonciere` is a 301 to `https://app.2ndmarket.fr/taxe-fonciere` (kept as redirect).

## How it is built

- `scripts/webflow-import/`: `crawl.mjs` (refresh `.webflow-cache/`), `run.mjs` (redirects, assets, SEO data,
  collections), `collections/<name>.mjs` (one extractor per CMS template), `compare.mjs` (visual diff).
  Re-run `crawl.mjs --refresh && run.mjs` right before the switch so the latest Webflow edits are in.
- `src/collections/<name>.ts`: schema of each collection. Shared card fields (`title`, `excerpt`, `image`, `date`,
  `category`) let any page list any collection; `seo` holds the page's head.
- `src/data/seo/<page>.json`: head of each static page. `src/data/site-jsonld.json`: Organization/WebSite graph.
- `src/layouts/BaseLayout.astro`: head (SEO, JSON-LD, self-hosted Inter, consent-first analytics on production only),
  nav, footer.
- Forms post to the Google Apps Script endpoint already used by the Webflow alert/simulator scripts
  (`src/scripts/lead.ts`).

## Status

- [x] Crawl, inventory, redirects, 691 assets self-hosted, SEO data of static pages
- [x] Tokens, base styles, BaseLayout, analytics, Button, sitemap/robots/llms.txt
- [ ] Shell · [ ] Home · [ ] Static A · [ ] Static B · [ ] Actualités · [ ] Guides · [ ] SCPI · [ ] Simulateurs
- [ ] Integration: full build, link check, URL parity (every live 200 path exists in `dist/`), visual pass
- [ ] Cut-over (see below)

## Cut-over checklist

1. `node scripts/webflow-import/crawl.mjs --refresh && node scripts/webflow-import/run.mjs`, review the diff, merge.
2. Cloudflare: route `2ndmarket.fr` (+ `www`) to the `2mk-landing` Worker; keep the Google tag gateway path.
3. Check a sample of URLs, redirects, forms, analytics in production; then switch Webflow off.
4. Delete `scripts/webflow-import/` and `.webflow-cache/`.

## Known differences / decisions

- The second (mobile) nav of the Webflow page was never displayed (hidden by its own CSS): not rebuilt.
- Analytics no longer fire on previews (`*.workers.dev`, localhost); previews are `noindex`.
- `<html lang>` is `fr` in the HTML (Webflow served `en` and fixed it with JavaScript).
