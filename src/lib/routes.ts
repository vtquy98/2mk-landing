import { getCollection, type CollectionKey } from 'astro:content';
import { isIndexable, type Seo } from './seo';

/** Collections listed in the sitemap (scpi-listing pages are reachable but were never in the Webflow sitemap). */
const SITEMAP_COLLECTIONS: CollectionKey[] = ['actualites', '2nd-seo', 'seo', 'guide-scpi', 'landing-pages', 'simulateurs', 'legal'];

/** Static pages = one SEO file each in src/data/seo/ (index.json is "/"). */
const staticSeo = import.meta.glob<Seo>('../data/seo/*.json', { eager: true, import: 'default' });

export interface SitemapUrl { path: string; lastmod?: string }

/** Every indexable URL of the site. */
export async function sitemapUrls(): Promise<SitemapUrl[]> {
  const statics = Object.entries(staticSeo)
    .map(([file, seo]) => ({ name: file.split('/').pop()!.replace('.json', ''), seo }))
    .filter(p => p.name !== '404' && isIndexable(p.seo))
    .map(p => ({ path: p.name === 'index' ? '/' : `/${p.name}` }));
  const entries = await Promise.all(
    SITEMAP_COLLECTIONS.map(async c =>
      (await getCollection(c)).filter(e => isIndexable(e.data.seo)).map(e => ({ path: `/${c}/${e.id}`, lastmod: e.data.lastmod })),
    ),
  );
  return [...statics, ...entries.flat()];
}

/** Path of the page being rendered, as the site serves it (build.format 'file' renders /faqs as /faqs.html). */
export const pagePath = (url: URL) => url.pathname.replace(/(\/index)?\.html$/, '').replace(/(.)\/$/, '$1') || '/';
