---
name: write-blog-post
description: Write or update an article (actualité) on the 2nd Market site (French). Use whenever someone asks to write an article, blog post, guide, translate a post, or publish content on the site.
---

# Write a blog post

The person asking is usually not a developer. Do the whole job yourself, explain results in plain words, and
never show them YAML or code unless they ask.

## 1. Brief (ask only what you can't infer)

- Topic, and the reader's question the post answers.
- Language: the site is French (`fr`); write in French unless the person asks otherwise.
- Optional: target keyword, links/sources they want cited.

Check what already exists so you don't duplicate an article and can link related ones:

```sh
grep -h '^title:' src/content/actualites/*.md src/content/guide-scpi/*.md
```

If an existing article covers the topic, propose updating it instead (keep its slug and `date`).

## 2. File

`src/content/actualites/<slug>.md` → `/actualites/<slug>`. The hub `/actualites-conseils`, the home news, related
articles and the sitemap pick it up.

Slug: lowercase, hyphens, no accents, 3–6 words, contains the main keyword, in French.
Never rename the slug of a published article (if you must, add the old URL to `public/_redirects`).

## 3. Frontmatter

Copy the frontmatter of a recent article (e.g. `src/content/actualites/figaro.md`) and adapt every value:

```md
---
title: "H1 shown on the page and on cards"
excerpt: "Card summary, 1–2 sentences."
image: "/assets/<slug>-cover.avif"        # in public/assets/, 1200x630 or more
imageAlt: "Describe the image"
imageWidth: 1200
imageHeight: 630
date: "2026-11-10"                        # publication date (sort order)
category: "SCPI"                          # SCPI | Viagers | Démembrements | Autres
seo: {"title":"≤ 60 chars, keyword first | 2nd Market","description":"140–160 chars …","ogImage":"/assets/…","jsonLd":["{…BreadcrumbList + Article JSON-LD, adapted from the copied article…}"]}
lastmod: "2026-11-10"
---
```

- `date` = today unless told otherwise. When editing, keep `date` and set `lastmod` to today.
- `seo.jsonLd` is not generated: adapt the copied article's blocks (URL, headline, dates, image, breadcrumb) and add a
  FAQPage block mirroring the `## FAQ` section.
- Images go in `public/assets/`; images inside the body need alt text, width and height (S3) — use
  `<img src="…" alt="…" width="…" height="…">` rather than Markdown `![]()`.

## 4. Writing rules (SEO + AI answer engines)

- No H1 in the body (the title is the H1, S2). Use `##` / `###`, phrased like the questions people search.
- Open with a 2–3 sentence direct answer to the main question.
- Short paragraphs, lists and tables where they help; one idea per section.
- `## FAQ` section (3–6 `###` questions) mirrored in the FAQPage `jsonLd` with the same wording.
- 2–5 internal links to related posts in the same language (root-relative, no trailing slash) and one link to
  the home page download section (`/#download`).
- Cite 2+ authoritative sources with real URLs you are sure exist.
- Product: only real features (CLAUDE.md product claims). Never a price, never a store URL (S6).
- Translations are adaptations, not word-for-word: native phrasing and local search terms.

## 5. Check

`npm run check && npm run build` pass, and `dist/actualites/<slug>.html` exists. If the dev server is running,
give the person the local link, e.g. http://localhost:4321/actualites/<slug>.

## 6. Publish

Summarize: title, URL, meta description, languages. Ask for a clear "yes", then `git checkout main && git pull`,
`git checkout -b blog/<slug>`, commit only the post files and images (`blog: add <slug>`), push and
`gh pr create`. Give the person the preview link CI posts on the PR. It goes live after Quy merges.
