# 2ndmarket landing — rules for Claude Code (and humans)

Repo: github.com/vtquy98/2mk-landing (owner and final reviewer: Quy). Astro 7 static site for https://2ndmarket.fr
(French), deployed to Cloudflare Workers static assets by GitHub Actions. Structure and commands: README.md.
Migration from Webflow in progress: docs/webflow-migration.md (rules, inventory, status).
Never push to `main`, never merge a PR, never run `wrangler deploy` by hand (CI deploys), never touch
secrets (`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`) or add one to a file.
Product claims: 2nd Market is a matchmaking platform (ni CGP, ni CIF, ni société de gestion); transactions are signed before a notary. Keep the compliance wording of existing pages.

## Rule 1 — Git workflow (mandatory)
1. Before any work (feature, fix, text, blog post): `git checkout main && git pull`, then `git log --oneline -10`
   and read what changed, so you build on the latest code and never redo or undo someone else's work.
2. Branch from that up-to-date `main`: `git checkout -b <type>/<short-name>`
   (`feat/hero-video`, `fix/nav-mobile`, `copy/faq`, `blog/<slug>`). Never branch from another feature branch.
3. One PR = one topic. No unrequested refactors, renames or "while I'm here" changes.
4. Done and `npm run check && npm run build` pass: commit (`feat: …`, `fix: …`, `copy: …`, `blog: …`), push the branch,
   `gh pr create` filling `.github/pull_request_template.md` (what changed, Rule 5 items).
5. CI comments a preview URL on the PR (`https://pr-<number>-2mk-landing.vtquy98.workers.dev`); share it.
6. Quy reviews and merges; merging deploys to production.

## Rule 2 — One source of truth
| What | Lives only in |
| --- | --- |
| Texts of the shared layout (nav, footer, 404) | `src/i18n/<lang>.json` |
| Copy of a static page | that page (`src/pages/<page>.astro` or its sections in `src/components/<page>/`) |
| CMS content (articles, guides, SCPI pages, simulators…) | `src/content/<collection>/<slug>.md`, schema in `src/collections/` |
| `<head>` of a static page (title, description, JSON-LD…) | `src/data/seo/<page>.json` |
| Product name, app URLs, contact email | `PRODUCT` in `src/i18n/config.ts` |
| Colors, fonts, spacing, radii, shadows | tokens on `:root` in `src/styles/global.css` |
| Domain | `site` in `astro.config.mjs` |
| Redirects | `public/_redirects` |
Components never contain a raw color (`#…`, `rgb(…)`) or a domain; site-wide sentences live in `<lang>.json`.
Code that bypasses this is a bug, even if it "works".

## Rule 3 — Every change applies to every language
A layout or design change goes in the shared component (`src/components/`), once, never per language.
A text change is made in every `src/i18n/<lang>.json` (a missing key fails the build). A change to a page or
blog post is made in every language version (same `translationKey`). If a language can't be done in the same
PR, say so explicitly in the PR.

## Rule 4 — Site invariants (must hold on every page)
- S1 Every page has a `<title>` unique across the site and a non-empty meta description.
- S2 Exactly one `<h1>` per page.
- S3 Every `<img>` has `alt` (empty `alt=""` only for decoration) and `width`/`height` (no layout shift).
- S4 Internal links are root-relative, resolve to a built page, and have no trailing slash (`/blog`, not `/blog/`).
- S5 No external `<script>` (analytics, chat, A/B tools) unless Quy approved it in the PR.
- S6 No URL of the Webflow CDN (`website-files.com`): every asset is self-hosted in `public/assets/`.
- S7 Readable and usable without JavaScript; no horizontal scroll at 360 px width.
- S8 Keyboard: every link and button reachable with Tab, visible focus ring; contrast AA (4.5:1 for text).
- S9 Motion respects `prefers-reduced-motion` (global rule in `global.css`; don't override it).
- S10 New dependency only with a reason written in the PR; prefer CSS / Astro built-ins.

## Rule 5 — Human review
How the page looks and feels needs a human on the preview URL. Every PR that changes something visible
ends with the `QA/REVIEW-CHECKLIST.md` ★ items to check, and screenshots at 375 px and 1280 px wide
(before/after for a change). If the dev server is running, check it yourself in the browser first.

## Skills
- Change the landing page (sections, design, texts): `.claude/skills/edit-landing-page/SKILL.md`.
- Write, translate or update a blog post: `.claude/skills/write-blog-post/SKILL.md`.
  Always ask which language(s) before writing.
