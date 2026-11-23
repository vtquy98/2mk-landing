# 2ndmarket — landing page

Astro static site (`dist/`) for https://2ndmarket.fr, in French. Rebuilt from Webflow: see
**docs/webflow-migration.md**. Team rules: **CLAUDE.md** (read it before your first PR).

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
| `src/pages/*.astro` | Static pages (home, a-propos, contact, faqs, hubs…), one file per URL |
| `src/pages/<collection>/[slug].astro` | Template of a CMS collection (`/actualites/<slug>`, `/guide-scpi/<slug>`…) |
| `src/content/<collection>/*.md` | CMS items: frontmatter = fields + `seo`, body = rich text (Markdown + raw HTML embeds) |
| `src/collections/<collection>.ts` | Schema of each collection (shared card fields: `title`, `excerpt`, `image`, `date`, `category`) |
| `src/data/seo/<page>.json` | `<head>` of each static page (title, description, OG, JSON-LD) |
| `src/data/site-jsonld.json` | Organization / WebSite graph, added to every page |
| `src/layouts/BaseLayout.astro` | `<head>` (SEO, JSON-LD, fonts, analytics), nav, footer, Google sources block |
| `src/components/` | Shell (Nav, Footer…), `ui/` (Button, CtaCard, reveal…), one folder per page or template |
| `src/scripts/` | Client scripts: `lead.ts` (all forms → Apps Script), alert widget, simulators |
| `src/styles/global.css` | Design tokens (`:root`) and base styles |
| `src/i18n/` | `PRODUCT` constants and the shared layout texts (`fr.json`) |
| `public/assets/` | Every image/video/PDF of the site (self-hosted) |
| `public/_redirects` | 301 rules (from Webflow), served by Cloudflare |
| `public/llms.txt` | Map of the site for AI answer engines (hand-written) |
| `scripts/webflow-import/` | One-off Webflow import (crawl, import, visual compare, URL parity). Delete after cut-over |
| `QA/REVIEW-CHECKLIST.md` | What a human checks on the preview URL |
| `.claude/skills/` | Claude Code skills |

## Add an article, a guide, a page

- Article: `src/content/actualites/<slug>.md` → `/actualites/<slug>` (copy an existing file for the fields;
  `category` is `SCPI`, `Viagers`, `Démembrements` or `Autres`; `date` = publication date). Same idea for
  `guide-scpi`, `landing-pages`, `simulateurs`…
- Static page: `src/pages/<slug>.astro` + `src/data/seo/<slug>.json`.
- Changing a URL: add the old one to `public/_redirects`.

## Going live

See the cut-over checklist in docs/webflow-migration.md.
