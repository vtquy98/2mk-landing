// Collection "information-pages": hidden pages /information-pages/<slug> (template 6757a7b64405224d68511401, not in
// the sitemap). On Webflow the template body is empty: only the <head> exists, so the entry is the head + its title.
import { extractSeo, lastmod, loadPage, pagesIn, writeEntry } from '../lib.mjs';

/** The JSON-LD points at /info/<slug> (a URL that never existed): use the real path and drop the dead "/info" crumb. */
function fixJsonLd(j, path) {
  try {
    const data = JSON.parse(j.replace(/https:\/\/2ndmarket\.fr\/info\/[\w-]+/g, `https://2ndmarket.fr${path}`));
    if (data['@type'] === 'BreadcrumbList') {
      data.itemListElement = data.itemListElement.filter(i => !/\/info$/.test(i.item)).map((i, n) => ({ ...i, position: n + 1 }));
    }
    return JSON.stringify(data, null, 2);
  } catch { return j; }
}

export default async function () {
  let n = 0;
  for (const path of pagesIn('/information-pages/')) {
    const $ = loadPage(path);
    const seo = extractSeo($);
    seo.jsonLd = (seo.jsonLd ?? []).map(j => fixJsonLd(j, path));
    const page = seo.jsonLd.map(j => { try { return JSON.parse(j); } catch { return {}; } }).find(d => d['@type'] === 'WebPage');
    writeEntry('information-pages', path.split('/').pop(), {
      title: (page?.name ?? seo.title.split(' | ')[0]).replace(/\s+/g, ' '),
      excerpt: seo.description,
      seo,
      lastmod: lastmod(path),
    });
    n++;
  }
  return n;
}
