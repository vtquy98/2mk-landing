// Collection "landing-pages": pages /landing-pages/<slug>, imported from Webflow by scripts/webflow-import/collections/landing-pages.mjs.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { seoSchema } from './seo-schema';

export default defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/landing-pages' }),
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
    // Collection-specific fields below. `title` is the short name (breadcrumb, cards), `heading` the page's H1.
    heading: z.string(),
    imageWidth: z.number().int().optional(),
    imageHeight: z.number().int().optional(),
    imageSrcset: z.string().optional(), // local -p-<w> variants, as on Webflow
    order: z.number().int().optional(), // position in the /scpi-essentiel list (sorted by date desc): breaks same-day ties
  }),
});
