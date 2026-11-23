// Collection "information-pages": hidden pages /information-pages/<slug> (not in the sitemap, as on Webflow),
// imported by scripts/webflow-import/collections/information-pages.mjs.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { seoSchema } from './seo-schema';

export default defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/information-pages' }),
  schema: z.object({
    // Shared card contract: every collection fills these so any page can list any collection.
    title: z.string(), // the H1
    excerpt: z.string().optional(), // shown under the H1 when the page has no body
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    date: z.coerce.date().optional(),
    category: z.string().optional(),
    seo: seoSchema,
    lastmod: z.string().optional(),
  }),
});
