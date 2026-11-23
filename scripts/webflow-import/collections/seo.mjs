// /seo/<slug>: one page per SCPI management company (Webflow template 67482c66d48127bf358c99e5).
// Hidden template fields (website "#", "Approche d'investissement", "Avertissements") were never displayed: not imported.
import { assetPath, extractSeo, lastmod, loadPage, pagesIn, richText, text, writeEntry } from '../lib.mjs';
import { imageSize } from './2nd-seo.mjs';

const PLACEHOLDER = '/plugins/Basic/assets/placeholder';

export default async function () {
  let n = 0;
  for (const path of pagesIn('/seo/')) {
    const $ = loadPage(path);
    const $logo = $('.company-image').first();
    const src = $logo.attr('src');
    const image = src && !src.includes(PLACEHOLDER) ? assetPath(src) : undefined;
    const seo = extractSeo($);
    writeEntry('seo', path.split('/').pop(), {
      title: text($, $('h1')),
      excerpt: seo.description,
      image,
      imageAlt: image ? $logo.attr('alt') : undefined,
      ...(image ? await imageSize(image) : {}),
      category: 'Société de gestion',
      managedScpis: text($, $('.company-header-component .company-type.w-richtext')) || undefined,
      seo,
      lastmod: lastmod(path),
    }, richText($, $('.company-description').first()));
    n++;
  }
  return n;
}
