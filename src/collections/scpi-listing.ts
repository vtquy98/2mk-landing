// Collection "scpi-listing": SCPI ads shown as cards (home carousels) and, for the legacy Webflow items, pages
// /scpi-listing/<slug>. Imported by scripts/webflow-import/collections/scpi-listing.mjs.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { seoSchema } from './seo-schema';

export default defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/scpi-listing' }),
  schema: z.object({
    // Shared card contract: every collection fills these so any page can list any collection.
    title: z.string(), // the H1 / name of the item
    excerpt: z.string().optional(), // short summary shown on cards
    image: z.string().optional(), // /assets/… logo of the SCPI
    imageAlt: z.string().optional(),
    date: z.coerce.date().optional(), // publication date when the item has one
    category: z.string().optional(),
    seo: seoSchema, // only used by items with a page (source "webflow"); app ads carry just their title
    lastmod: z.string().optional(), // YYYY-MM-DD (Webflow sitemap), used by the sitemap
    // Collection-specific fields below.
    // "webflow": legacy CMS item with its own /scpi-listing page. "app": snapshot of an ad of the app, linked to it.
    source: z.enum(['webflow', 'app']),
    order: z.number(), // position in the list it was shown in
    url: z.url().optional(), // the ad in the app
    scpi: z.string(), // SCPI name
    parts: z.number(), // number of shares sold
    pricePerShare: z.number(), // € — "Valeur officielle des parts"
    distributionRate: z.number(), // % — "Rendement annuel standard"
    annualIncome: z.number(), // € — "Revenu annuel (cash)"
    effectiveYield: z.number(), // % — "Rendement effectif avec réduction"
    discountPercent: z.number().optional(), // % — "Décote"
    totalPrice: z.number(), // € asked for all the shares
    marketPrice: z.number().optional(), // € at the official price (struck through when there is a discount)
  }),
});
