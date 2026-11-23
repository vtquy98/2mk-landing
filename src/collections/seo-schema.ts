import { z } from 'astro/zod';

/** Zod schema of the `seo` object every content entry carries (see src/lib/seo.ts). */
export const seoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  canonical: z.string().optional(),
  robots: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  ogType: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  jsonLd: z.array(z.string()).default([]),
});
