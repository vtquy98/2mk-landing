import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// ids are '<lang>/<slug>'
const seo = {
  title: z.string(),
  description: z.string(),
  ogImage: z.string().optional(), // 1200x630 JPG/PNG in public/
  robots: z.string().optional(),
  translationKey: z.string().optional(), // same key on every language version = hreflang link
  jsonLd: z.array(z.string()).default([]), // extra JSON-LD blocks, e.g. FAQPage
};

// Simple Markdown pages: privacy, terms, SEO landing pages. URL = /<slug> (en) or /<lang>/<slug>.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ ...seo }),
});

// URL = /blog/<slug> (en) or /<lang>/blog/<slug>.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    ...seo,
    seoTitle: z.string().optional(), // <title> when it differs from the H1
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, blog };
