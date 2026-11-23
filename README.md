# 2ndmarket — landing page

Astro static site (`dist/`), English first, i18n-ready. Team rules: **CLAUDE.md** (read it before your first PR).

```sh
npm install
npm run dev              # http://localhost:4321
npm run build            # -> dist/
npm run check            # types + content schema
```

Deploy: `.github/workflows/deploy.yml` builds, then deploys to Cloudflare (Workers static assets,
`wrangler.jsonc`): push to `main` = production, every pull request = preview URL posted as a PR comment.
Repo secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.
Cloudflare account TODO, Worker `2mk-landing`:
production https://2mk-landing.<account>.workers.dev (until the custom domain),
previews `https://pr-<number>-2mk-landing.<account>.workers.dev`.

## Structure

| Path | What |
| --- | --- |
| `src/i18n/config.ts` | Languages (`locales`), product name and store links (`PRODUCT`), `t(lang)` texts helper |
| `src/i18n/<lang>.json` | Every text of the shared layout. `en.json` is the reference; a key missing in another language fails the build |
| `src/components/home/Home.astro` | Home page sections (hero, features, FAQ, download), same for every language |
| `src/components/` | Nav, footer, store buttons |
| `src/layouts/BaseLayout.astro` | `<head>`: SEO, canonical, hreflang, Open Graph, JSON-LD |
| `src/styles/global.css` | Design tokens (`:root`) and all styles |
| `src/content/pages/<lang>/*.md` | Markdown pages (privacy, terms, SEO landing pages) → `/<slug>`, `/<lang>/<slug>` |
| `src/content/blog/<lang>/*.md` | Blog posts → `/blog/<slug>`, `/<lang>/blog/<slug>` |
| `src/lib/routes.ts` | Every URL of the site; same `translationKey` across languages = hreflang link |
| `src/pages/[...path].astro` | Renders every route; `sitemap.xml`, `robots.txt`, `llms.txt` are generated next to it |
| `QA/REVIEW-CHECKLIST.md` | What a human checks on the preview URL |
| `.claude/skills/` | Claude Code skills |

## Add a page

`src/content/pages/en/terms.md` → `/terms`:

```md
---
title: "<title> and H1"
description: "meta description (140–160 chars)"
translationKey: "terms"   # same key on the other language versions
---
Markdown body…
```

## Add a language (e.g. `fr`)

1. Add `fr` to `locales` in `src/i18n/config.ts` (`base: '/fr'`).
2. Add `src/i18n/fr.json` (copy `en.json`, translate the values, keep the keys).
3. Add `src/content/pages/fr/*.md` (same `translationKey` as the English pages).

Routes, hreflang, sitemap, llms.txt and the language switcher pick it up.

## Before launch (TODO)

- `site` in `astro.config.mjs` (real domain), `PRODUCT` in `src/i18n/config.ts`, every `TODO` text, privacy policy.
- Custom domain on the `2mk-landing` Worker (Cloudflare dashboard), favicon and og image.
