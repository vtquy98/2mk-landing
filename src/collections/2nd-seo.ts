// Collection "2nd-seo": pages /2nd-seo/<slug>, imported from Webflow by scripts/webflow-import/collections/2nd-seo.mjs.
import { defineCollection, reference } from 'astro:content';
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
    imageWidth: z.number().optional(), // intrinsic size of `image` (the SCPI logo)
    imageHeight: z.number().optional(),
    manager: z.string().optional(), // management company name, shown with the SCPI everywhere it is listed
    managerPage: reference('seo').optional(), // its page /seo/<id>
    // Key figures as displayed (formatted by the content team)…
    distributionRateText: z.string().optional(), // "3,85 %"
    sharePriceText: z.string().optional(), // "765 €"
    annualIncomeText: z.string().optional(), // "29,46 €"
    // …and as numbers (for sorting/filtering; not always equal to the displayed text).
    distributionRate: z.number().optional(), // %
    sharePrice: z.number().optional(), // € per share
    annualIncome: z.number().optional(), // € per share per year
    website: z.url().optional(), // management company website (not displayed)
    redirect: z.string().optional(), // set when the item has no page of its own (301 to this path)
  }),
});
