---
name: write-blog-post
description: Write, translate or update a blog post on the 2ndmarket site (any of the site's languages). Use whenever someone asks to write an article, blog post, guide, translate a post, or publish content on the site.
---

# Write a blog post

The person asking is usually not a developer. Do the whole job yourself, explain results in plain words, and
never show them YAML or code unless they ask.

## 1. Brief (ask only what you can't infer)

- Topic, and the reader's question the post answers.
- Language(s): **always ask** which language(s) the post is written in, and wait for the answer.
  Languages are the `locales` of `src/i18n/config.ts`; never pick languages yourself.
- Optional: target keyword, links/sources they want cited.

Check what already exists so you don't duplicate a post and can link related ones:

```sh
grep -h '^title:' src/content/blog/<lang>/*.md
```

If an existing post covers the topic, propose updating it instead (keep its slug, set `updated:`). An update is
made in every language version of the post (all files with the same `translationKey`).

## 2. File

`src/content/blog/<lang>/<slug>.md` → `/blog/<slug>` (en) or `/<lang>/blog/<slug>`.

Slug: lowercase, hyphens, no accents, 3–6 words, contains the main keyword, in the post's language.
Never rename the slug of a published post.

## 3. Frontmatter

```md
---
title: "H1 shown on the page and in the blog list"
seoTitle: "≤ 60 chars, keyword first (only if different from title)"
description: "140–160 chars. Answers the query, includes the keyword, no clickbait."
date: 2026-11-10
image: "/images/blog/<slug>/cover.webp"   # optional, 1200x630
imageAlt: "Describe the image"
translationKey: "<shared-key>"           # same value on every language version
jsonLd:
  - |2-
      {"@context":"https://schema.org","@type":"FAQPage","mainEntity":[
        {"@type":"Question","name":"…","acceptedAnswer":{"@type":"Answer","text":"…"}}
      ]}
---
```

- `date` = today unless told otherwise. When editing, keep `date` and add `updated:`.
- Images in `public/images/blog/<slug>/`; images inside the body need alt text, width and height (S3) — use
  `<img src="…" alt="…" width="…" height="…">` rather than Markdown `![]()`.
- BlogPosting JSON-LD, canonical, hreflang, og tags, sitemap and blog list are generated — don't add them.

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

`npm run check && npm run build` pass, and `dist/blog/<slug>.html` (or `dist/<lang>/blog/<slug>.html`)
exists. If the dev server is running, give the person the local link, e.g. http://localhost:4321/blog/<slug>.

## 6. Publish

Summarize: title, URL, meta description, languages. Ask for a clear "yes", then `git checkout main && git pull`,
`git checkout -b blog/<slug>`, commit only the post files and images (`blog: add <slug>`), push and
`gh pr create`. Give the person the preview link CI posts on the PR. It goes live after Quy merges.
