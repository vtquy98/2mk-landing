// Collection "actualites": /actualites/<slug> (Webflow template 67443c849d42755345fff71b) -> src/content/actualites/*.md
import { join } from 'node:path';
import sharp from 'sharp';
import { APP, assetPath, extractSeo, lastmod, loadPage, pagesIn, richText, rewriteUrls, ROOT, SITE, statuses, text, writeEntry } from '../lib.mjs';

// Webflow's runtime decoder of "tm*" classes, pasted in most articles: cleanFragment() now does it at build time.
const TM_DECODER = /function r\(\)\{function d\(s\)\{return s\.replace/;
// Asset URLs inside JSON-LD must stay absolute.
const absoluteAssets = s => s.replace(/"(\/assets\/[^"]+)"/g, `"${SITE}$1"`);

// Webflow 301s that are in no sitemap (answered live on 2026-11-23) and two links that were already 404 on Webflow.
const LIVE_REDIRECTS = {
  '/actualites': '/actualites-conseils',
  '/cgp': '/landing-pages/cgp',
  '/guide-scpi/bloquees-2025-liste-solutions': '/landing-pages/guide-scpi-bloquees-liste-solutions',
  '/guide-scpi/comparatif-scpi-viager-sci': '/guide-scpi/scpi-vs-autres-placements',
  '/guide-scpi/decote-2025': '/landing-pages/guide-scpi-acheter-scpi-decote',
  '/guide-scpi/delais-revente-scpi-2025': '/actualites/delais-revente-scpi',
  '/guide-scpi/revente-guide-pratique': '/guide-scpi/revente',
  '/guide-scpi/vendre-parts-scpi': '/guide-scpi/revente',
  '/actualites/scpi-bloquees-2025': '/landing-pages/guide-scpi-bloquees-liste-solutions',
  '/simulateurs/achat-comptant-credit': '/simulateurs/scpi-credit',
  '/simulateurs/calculette-scpi': '/simulateurs/rendement-performance',
  '/simulateurs/offre-viagers': '/simulateurs/viager-rendement-acheteur',
  '/simulateurs/rendement-effectif-scpi': '/simulateurs/decote-scpi',
  '/simulateurs/scpi-demembrement': '/simulateurs/calculateur-demembrement',
  '/simulateurs/scpi-demembrement-fiscaux': '/simulateurs/calculateur-demembrement',
  '/simulateurs/simulation-scpi-': '/simulateurs/rendement-performance',
  '/simulateurs/viager-libre-ou-occupe': '/simulateurs/viager-libre-occupe',
  '/guide-scpi/guide-scpi-meilleures-2025': '/guides-scpi-viager-demembrement', // 404 on Webflow ("Guide SCPI 2025")
  '/scpi/publier-annonce': `${APP}/create`, // 404 on Webflow ("poster une annonce")
};
const REDIRECTS = { ...Object.fromEntries(statuses().filter(s => s[1] === 301).map(([from, , to]) => [from, to.replace(/^https?:\/\/(www\.)?2ndmarket\.fr(?=\/)/, '')])), ...LIVE_REDIRECTS };
/** Internal links point at the final page, not at a redirect. */
export function resolveLinks(md) {
  return md.replace(/(href="|\]\()(\/[^"#?)\s]*)/g, (_, pre, path) => {
    for (let i = 0; REDIRECTS[path] && i < 5; i++) path = REDIRECTS[path];
    return pre + path;
  });
}

export default async function () {
  // The article page shows no summary: the card excerpt only exists on the hub, which lists every article
  // (tab "Tous" stops at 100 items, the category tabs list the rest). Hub order = Webflow's created-on order.
  const $hub = loadPage('/actualites-conseils');
  const cards = new Map();
  $hub('.w-tab-pane').each((pane, p) => {
    $hub(p).find('a.blog_item_wrapper').each((i, a) => {
      const href = $hub(a).attr('href');
      if (!cards.has(href)) cards.set(href, { excerpt: text($hub, $hub(a).find('.post-summary')), rank: pane * 1000 + i });
    });
  });

  const entries = [];
  for (const path of pagesIn('/actualites/')) {
    const $ = loadPage(path);
    const slug = path.split('/').pop();
    const card = cards.get(path);
    if (!card) throw new Error(`${path} is not listed on /actualites-conseils`);

    const $img = $('.blog-post-main-image');
    const src = $img.attr('src');
    const image = src && !src.includes('/plugins/Basic/') ? assetPath(src) : undefined; // Webflow placeholder = no image
    const meta = image ? await sharp(join(ROOT, 'public', image)).metadata() : {};

    const $body = $('.blog-post-body').clone();
    $body.find('script').filter((_, s) => TM_DECODER.test($(s).html())).remove();
    $body.find('.w-script').removeClass('w-script');
    $body.find('[data-rt-embed-type]').removeAttr('data-rt-embed-type');
    // One <h1> per page (the template's): an embed's own h1 becomes an h2 that keeps the embed's h1 styles.
    // Embed CSS written against Webflow's rich-text wrapper now targets the template's `.rich-text` article.
    $body.find('style').each((_, s) => { if ($(s).text().includes('.w-richtext')) $(s).text($(s).text().replaceAll('.w-richtext', '.rich-text')); });
    if ($body.find('h1').length) {
      $body.find('h1').each((_, h) => { h.tagName = 'h2'; $(h).addClass('s2m-h1'); });
      $body.find('style').each((_, s) => { $(s).text($(s).text().replace(/\bh1\b/g, '.s2m-h1')); });
    }
    const body = resolveLinks(richText($, $body)).replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (_, a, j, b) => a + absoluteAssets(j) + b);

    const seo = extractSeo($);
    seo.jsonLd = seo.jsonLd?.map(absoluteAssets);
    const date = $('script[type="application/ld+json"]').text().match(/"datePublished":\s*"(\d{4}-\d{2}-\d{2})/)?.[1];

    entries.push({
      slug,
      rank: card.rank,
      body,
      data: {
        title: text($, 'h1.blog-post-heading'),
        excerpt: card.excerpt,
        image,
        imageAlt: image && ($img.attr('alt') ?? '').trim(),
        imageWidth: meta.width,
        imageHeight: meta.height,
        imageSrcset: image && $img.attr('srcset') ? rewriteUrls($img.attr('srcset')) : undefined,
        date,
        category: text($, '.blog-post-header-component .categories-text'),
        seo,
        lastmod: lastmod(path),
      },
    });
  }

  // Same-day articles keep the live order (Webflow sorts on the created-on time, which pages don't expose).
  const byDay = Map.groupBy(entries, e => e.data.date);
  for (const group of byDay.values()) {
    if (group.length < 2) continue;
    group.sort((a, b) => a.rank - b.rank).forEach((e, i) => (e.data.sameDayOrder = group.length - i));
  }

  for (const e of entries) writeEntry('actualites', e.slug, e.data, e.body);
  return entries.length;
}
