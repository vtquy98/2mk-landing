// /legal/<slug>: privacy policy and terms of use (Webflow template 6751bf05fd459c62545e2b8a), rich text only.
import { extractSeo, lastmod, loadPage, pagesIn, richText, text, writeEntry } from '../lib.mjs';

export default async function () {
  let n = 0;
  for (const path of pagesIn('/legal/')) {
    const $ = loadPage(path);
    const $body = $('.legal-content-component .w-richtext').first();
    // The page H1 is in the header; an H1 typed inside the rich text becomes an H2 (one H1 per page).
    $body.find('h1').each((_, h) => { h.tagName = 'h2'; });
    const seo = extractSeo($);
    writeEntry('legal', path.split('/').pop(), {
      title: text($, $('h1').first()),
      excerpt: seo.description,
      seo,
      lastmod: lastmod(path),
    }, richText($, $body));
    n++;
  }
  return n;
}
