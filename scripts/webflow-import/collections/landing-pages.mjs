// Collection "landing-pages": /landing-pages/<slug> (Webflow template …5fef2f) -> src/content/landing-pages/*.md
// Every 200 page uses that one template. The 301 items are only redirects (public/_redirects).
import { lastmod, loadPage, pagesIn, text, writeEntry } from '../lib.mjs';
import { body, mainImage, published, seoOf } from './guide-scpi.mjs';

export default async function () {
  // /scpi-essentiel lists the collection by `date` desc; `order` (its card position) breaks same-day ties.
  const $list = loadPage('/scpi-essentiel');
  const order = new Map();
  $list('a[href^="/landing-pages/"]').each((_, a) => { const h = $list(a).attr('href'); if (!order.has(h)) order.set(h, order.size); });

  let n = 0;
  for (const path of pagesIn('/landing-pages/')) {
    const $ = loadPage(path);
    writeEntry(
      'landing-pages',
      path.split('/').pop(),
      {
        title: text($, '.breadcrumb-last'), // CMS name: breadcrumb and cards
        heading: text($, 'h1'),
        excerpt: text($, '.lp-description'),
        ...(await mainImage($('.lp-main-image'))),
        date: published($),
        order: order.get(path),
        seo: seoOf($),
        lastmod: lastmod(path),
      },
      body($, '.lp-body'),
    );
    n++;
  }
  return n;
}
