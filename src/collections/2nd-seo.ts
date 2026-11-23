// Collection "2nd-seo": pages /2nd-seo/<slug>, imported from Webflow by scripts/webflow-import/collections/2nd-seo.mjs.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { seoSchema } from './seo-schema';

export default defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/2nd-seo' }),
  schema: z.object({
    // Shared card contract: every collection fills these so any page can list any collection.
    title: z.string(), // the H1 / name of the item
    excerpt: z.string().optional(), // short summary shown on cards
    image: z.string().optional(), // /assets/… main image
    imageAlt: z.string().optional(),
    date: z.coerce.date().optional(), // publication date when the item has one
    category: z.string().optional(),
    seo: seoSchema,
    lastmod: z.string().optional(), // YYYY-MM-DD (Webflow sitemap), used by the sitemap
    // Collection-specific fields below.
  }),
});
