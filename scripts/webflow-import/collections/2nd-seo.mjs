// /2nd-seo/<slug>: one fact sheet per SCPI (Webflow template 67482ce8087384bac0585430).
// Fields bound by the template become frontmatter; the rich text ("seo-description") becomes the body.
// Template-level code is rebuilt in src/pages/2nd-seo/[slug].astro and stripped here: the fiche <style> block
// (same on every item) and the FAQPage JSON-LD <script> (kept, moved to seo.jsonLd by extractSeo).
import { join } from 'node:path';
import sharp from 'sharp';
import { load } from 'cheerio';
import { assetPath, extractSeo, lastmod, loadPage, pagesIn, richText, ROOT, statuses, text, writeEntry } from '../lib.mjs';

const PLACEHOLDER = '/plugins/Basic/assets/placeholder';
const REPERTOIRE_PAGE_2 = 'https://2ndmarket.fr/repertoire?c673cdbb_page=2';

// The Elysées SCPI have no management company bound in Webflow; the /seo/ pages list them under HSBC REIM (France).
const MANAGER_FIX = { name: 'HSBC REIM (France)', page: 'hsbc-reim-france-ebf6e' };
const MANAGER_FIXES = { 'elysees-grand-large': MANAGER_FIX, 'elysees-pierre': MANAGER_FIX, 'elysees-residence-5': MANAGER_FIX };

const num = s => (s && !Number.isNaN(Number(s)) ? Number(s) : undefined);
const seoSlug = href => href?.match(/^\/seo\/([^/?#]+)$/)?.[1];

// The fiche is one raw HTML block: one element per line keeps it readable (no blank line, so it stays one block).
const readableHtml = s => s.replace(/(<\/(?:p|h[1-6]|div|table|thead|tbody|tr|ul|ol|li|caption)>|<(?:thead|tbody)>)(?=<)/g, '$1\n');

export async function imageSize(local) {
  const m = await sharp(join(ROOT, 'public', local)).metadata();
  return { imageWidth: m.width, imageHeight: m.height };
}

export default async function () {
  let n = 0;
  for (const path of pagesIn('/2nd-seo/')) {
    const $ = loadPage(path);
    const slug = path.split('/').pop();
    const seo = extractSeo($); // before stripping: picks up the FAQPage JSON-LD written inside the rich text
    const $desc = $('.seo-description').first();
    $desc.find('style, script').remove();
    $desc.find('[data-rt-embed-type]').each((_, e) => { $(e).replaceWith($(e).contents()); });

    const $logo = $('.seo-content-wrapper > img').first();
    const logoSrc = $logo.attr('src');
    const image = logoSrc && !logoSrc.includes(PLACEHOLDER) ? assetPath(logoSrc) : undefined;

    const stats = $('.home-about-items').toArray().map(e => text($, $(e).find('h3')) || undefined);
    const raw = $('.seo-table-wrapper .table-row.is-last .table-content').toArray().map(e => text($, e));
    const website = $('.seo-content-heading > a.hide').attr('href');
    const fix = MANAGER_FIXES[slug];

    writeEntry('2nd-seo', slug, {
      title: text($, $('h1')),
      excerpt: seo.description,
      image,
      imageAlt: image ? $logo.attr('alt') : undefined,
      ...(image ? await imageSize(image) : {}),
      category: 'SCPI',
      manager: fix?.name ?? (text($, $('.company-link')) || undefined),
      managerPage: fix?.page ?? seoSlug($('.company-link').attr('href')),
      distributionRateText: stats[0],
      sharePriceText: stats[1],
      annualIncomeText: stats[2],
      distributionRate: num(raw[0]),
      sharePrice: num(raw[1]),
      annualIncome: num(raw[2]),
      website: website && website !== '#' && !website.startsWith('/') ? website : undefined,
      seo,
      lastmod: lastmod(path),
    }, readableHtml(richText($, $desc)));
    n++;
  }
  return n + (await redirectedItems());
}

/**
 * CMS items whose page is a 301 (to a landing page) still appear in the SCPI directory and on the home page:
 * they are kept as entries with `redirect` (no page is built for them; public/_redirects does the 301).
 * Their name and manager only exist in the directory listing (/repertoire, 2 pages on Webflow).
 */
async function redirectedItems() {
  const redirects = new Map(statuses().filter(s => s[1] === 301 && s[0].startsWith('/2nd-seo/')).map(s => [s[0], s[2]]));
  const pages = [loadPage('/repertoire'), load(await (await fetch(REPERTOIRE_PAGE_2)).text())];
  let n = 0;
  for (const $ of pages) {
    for (const item of $('.company_item').toArray()) {
      const [name, mgr] = $(item).find('a').toArray();
      const path = $(name).attr('href');
      if (!redirects.has(path)) continue;
      const title = text($, name);
      writeEntry('2nd-seo', path.split('/').pop(), {
        title,
        category: 'SCPI',
        manager: text($, mgr) || undefined,
        managerPage: seoSlug($(mgr).attr('href')),
        redirect: redirects.get(path).replace(/^https?:\/\/(www\.)?2ndmarket\.fr/, ''),
        // Not a page: kept out of the sitemap (routes.ts lists only indexable entries).
        seo: { title, robots: 'noindex' },
      });
      n++;
    }
  }
  return n;
}
