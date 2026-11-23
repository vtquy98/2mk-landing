// Collection "guide-scpi": /guide-scpi/<slug> (Webflow template …464c98) -> src/content/guide-scpi/*.md
// The guide page shows breadcrumb, H1, main image and the rich text. The card fields (tag, excerpt, tab, order)
// only exist on the hub /guides-scpi-viager-demembrement, which lists every guide once.
import { join } from 'node:path';
import sharp from 'sharp';
import { APP, assetPath, cleanFragment, extractSeo, lastmod, loadPage, pagesIn, rewriteUrls, richText, ROOT, SITE, statuses, text, writeEntry } from '../lib.mjs';

// Webflow's runtime decoder of "tm*" classes pasted in some bodies: cleanFragment() does it at build time.
const MEDIA = 'img,iframe,video,audio,svg,canvas,input,select,textarea,button,embed,object,picture';
const TM_DECODER = /function r\(\)\{function d\(s\)\{return s\.replace/;
// Webflow 301s that are in no sitemap, linked from guide/landing bodies (answered live on 2026-11-23).
const LIVE_REDIRECTS = {
  '/actualites': '/actualites-conseils',
  '/annonces': `${APP}/scpi`,
  '/faq': '/faqs',
  '/guide-scpi/analyser-scpi-avant-achat': '/landing-pages/guide-scpi-acheter-scpi-decote',
  '/guide-scpi/comparatif-scpi-viager-sci': '/guide-scpi/scpi-vs-autres-placements',
  '/guide-scpi/decote-2025': '/landing-pages/guide-scpi-acheter-scpi-decote',
  '/guide-scpi/guide-scpi-meilleures-2026': '/landing-pages/guide-scpi-acheter-scpi-decote',
  '/guide-scpi/revente-guide-pratique': '/guide-scpi/revente',
  '/guides/revente-scpi-2025': '/guide-scpi/revente',
  '/guides/viager': '/viager-guides',
  '/landing-pages/frais-revente-scpi': '/simulateurs/frais-scpi',
  '/marche-secondaire-scpi': '/guide-scpi/marche-secondaire-fonctionnement',
  '/publier-annonce': `${APP}/create`,
  '/simulateurs/achat-comptant-credit': '/simulateurs/scpi-credit',
  '/simulateurs/rentabilite-scpi': '/simulateurs/rendement-performance',
  '/simulateurs/scpi-demembrement': '/simulateurs/calculateur-demembrement',
  '/simulateurs/viager-libre-ou-occupe': '/simulateurs/viager-libre-occupe',
};
const REDIRECTS = {
  ...Object.fromEntries(statuses().filter(s => s[1] === 301).map(([from, , to]) => [from, to.replace(/^https?:\/\/(www\.)?2ndmarket\.fr(?=\/)/, '')])),
  ...LIVE_REDIRECTS,
};

/** Internal links point at the final page, not at a Webflow redirect. */
export const resolveLinks = s =>
  s.replace(/(href="|\]\()(\/[^"#?)\s]*)/g, (_, pre, path) => {
    for (let i = 0; REDIRECTS[path] && i < 5; i++) path = REDIRECTS[path];
    return pre + path;
  });
/** Asset URLs inside JSON-LD must stay absolute. */
export const absoluteAssets = s => s.replace(/"(\/assets\/[^"]+)"/g, `"${SITE}$1"`);

/** Main image of an item page: local path, alt, intrinsic size, srcset of the local variants. */
export async function mainImage($img) {
  const image = assetPath($img.attr('src'));
  const meta = await sharp(join(ROOT, 'public', image)).metadata();
  return {
    image,
    imageAlt: ($img.attr('alt') ?? '').trim(),
    imageWidth: meta.width,
    imageHeight: meta.height,
    imageSrcset: $img.attr('srcset') ? rewriteUrls($img.attr('srcset')) : undefined,
  };
}

/** Rich text of an item page as Markdown (embeds kept, Webflow runtime hacks removed). */
export function body($, sel) {
  const $body = $(sel).clone();
  $body.find('script').filter((_, s) => TM_DECODER.test($(s).html())).remove();
  $body.find('[data-rt-embed-type]').removeAttr('data-rt-embed-type');
  $body.find('.w-script').removeClass('w-script');
  // Embed CSS that targets Webflow's rich-text wrapper now targets the template's (src/components/guides/Prose.astro).
  $body.find('style').each((_, st) => { $(st).text($(st).text().replace(/\.w-richtext\b/g, '.prose')); });
  // Turndown drops empty elements, e.g. the alert-widget anchor <div><div class="tmid-s2m-alert-short"></div></div>:
  // keep them as raw HTML through a placeholder.
  const kept = [];
  $body.children().filter((_, el) => !$(el).text().trim() && !$(el).find(MEDIA).addBack(MEDIA).length).each((_, el) => {
    cleanFragment($, el);
    $(el).find('.w-embed').addBack('.w-embed').removeClass('w-embed');
    $(el).find('[class=""]').addBack('[class=""]').removeAttr('class');
    kept.push($.html(el));
    $(el).replaceWith(`<p>KEEP${kept.length - 1}KEEP</p>`);
  });
  const md = richText($, $body).replace(/KEEP(\d+)KEEP/g, (_, i) => kept[i]);
  return resolveLinks(md).replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (_, a, j, b) => a + absoluteAssets(j) + b);
}

/** Publication date (YYYY-MM-DD) from the page's JSON-LD: Webflow sorts the lists on it. */
export const published = $ => $('script[type="application/ld+json"]').text().match(/"datePublished":\s*"(\d{4}-\d{2}-\d{2})/)?.[1];

export function seoOf($) {
  const seo = extractSeo($);
  if (seo.jsonLd) seo.jsonLd = seo.jsonLd.map(absoluteAssets);
  return seo;
}

export default async function () {
  const $hub = loadPage('/guides-scpi-viager-demembrement');
  const tabs = $hub('.w-tab-link').map((_, a) => text($hub, a)).get();
  const cards = new Map();
  let order = 0;
  $hub('.w-tab-pane').each((t, pane) => {
    $hub(pane).find('a.guide-items-wrapper').each((_, a) => {
      cards.set($hub(a).attr('href'), {
        category: tabs[t],
        tag: text($hub, $hub(a).find('.categories-text')),
        excerpt: text($hub, $hub(a).find('.post-summary')),
        order: order++,
      });
    });
  });

  let n = 0;
  for (const path of pagesIn('/guide-scpi/')) {
    const $ = loadPage(path);
    const card = cards.get(path);
    if (!card) throw new Error(`${path} is not listed on /guides-scpi-viager-demembrement`);
    writeEntry(
      'guide-scpi',
      path.split('/').pop(),
      {
        title: text($, 'h1'),
        excerpt: card.excerpt,
        ...(await mainImage($('.guide-post-main-image'))),
        date: published($),
        category: card.category,
        tag: card.tag,
        order: card.order,
        seo: seoOf($),
        lastmod: lastmod(path),
      },
      body($, '.guide-post-body-component .w-richtext'),
    );
    n++;
  }
  return n;
}
