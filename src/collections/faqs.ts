// Collection "faqs": every Q&A of /faqs (Webflow CMS "faqs"), imported by scripts/webflow-import/collections/faqs.mjs.
// Entries with `page: true` also have a page /faqs/<slug> (hidden: not in the sitemap, as on Webflow).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { seoSchema } from './seo-schema';

export default defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/faqs' }),
  schema: z.object({
    // Shared card contract: every collection fills these so any page can list any collection.
    title: z.string(), // the question
    excerpt: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    date: z.coerce.date().optional(),
    category: z.string().optional(), // tab of /faqs (SCPI, Viager, Démembrement); none = not listed on /faqs
    seo: seoSchema, // head of /faqs/<slug>; just the question for entries without a page
    lastmod: z.string().optional(),
    // Collection-specific fields below.
    order: z.number().optional(), // position on /faqs
    page: z.boolean().default(false), // has a page /faqs/<slug>
  }),
});
