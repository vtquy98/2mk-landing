// SCPI listings ("annonces") shown as cards on the home pages.
//   source "webflow": the 3 items of the Webflow CMS collection "scpi-listing". Their /scpi-listing/<slug> pages are empty
//     templates on Webflow (head only); the card fields come from the cards of /home-new.
//   source "app": snapshot of the ads the app serves to the home carousel (Webflow embedded the app's widget, which
//     called the API below at every page view). Re-run this import to refresh the snapshot; logos are self-hosted.
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { APP, assetPath, CACHE, extractSeo, lastmod, loadPage, ROOT, text, writeEntry } from '../lib.mjs';

const API = 'https://api.2ndmarket.fr';
const num = s => Number(String(s).replace(/[^\d.-]/g, ''));
const norm = s => s.replace(/[\s\u00a0\u202f]+/g, ' ').trim();

export default async function () {
  // 1. Webflow CMS items: one page each (head only) + their card on /home-new (same order as there).
  const $home = loadPage('/home-new');
  const cards = $home('.section_home_listing .w-dyn-item').toArray().map(el => {
    const $c = $home(el);
    const values = $c.find('.metadata-list-items-content-wrapper > :first-child').toArray().map(v => num(text($home, v)));
    return {
      title: norm(text($home, $c.find('.listing_heading'))),
      discount: num(text($home, $c.find('.eyebrow_wrapper .eyebrow_text').last())),
      values,
      price: num(text($home, $c.find('.scpi-price'))),
      original: num(text($home, $c.find('.original_price'))),
    };
  });
  let n = 0;
  const slugs = readdirSync(join(CACHE, 'pages/scpi-listing')).map(f => f.replace(/\.html$/, ''));
  for (const slug of slugs) {
    const path = `/scpi-listing/${slug}`;
    const $ = loadPage(path);
    const seo = extractSeo($);
    // The page JSON-LD pointed to /repertoire/<slug> (a 404): point it to the real page.
    seo.jsonLd = seo.jsonLd?.map(j => j.replaceAll(`/repertoire/${slug}`, path));
    const title = norm(seo.title).replace(/^SCPI /, '').replace(/ \| Prix.*$/, '');
    const card = cards.find(c => c.title === title);
    if (!card) throw new Error(`scpi-listing: no card on /home-new for "${title}"`);
    const m = /^(\d+) parts de (.+?) [\d ]+€/.exec(title);
    const [pricePerShare, distributionRate, annualIncome, effectiveYield] = card.values;
    writeEntry('scpi-listing', slug, {
      title,
      source: 'webflow',
      order: cards.indexOf(card),
      scpi: m[2],
      parts: Number(m[1]),
      pricePerShare,
      distributionRate,
      annualIncome,
      effectiveYield,
      discountPercent: card.discount,
      totalPrice: card.price,
      marketPrice: card.original,
      seo,
      lastmod: lastmod(path),
    });
    n++;
  }

  // 2. App ads (snapshot of the home carousel).
  const res = await fetch(`${API}/scpi-ad/embedded?pageSize=12`);
  if (!res.ok) throw new Error(`scpi-listing: ${API} answered ${res.status}`);
  const ads = (await res.json()).data.scpiAds;
  for (const [i, ad] of ads.entries()) {
    const m = /^(\d+) parts · (.+?) · /.exec(ad.cardTitle);
    writeEntry('scpi-listing', `app-${ad.slug}`, {
      title: ad.cardTitle,
      image: ad.logoUrl && (await logo(ad.logoUrl)),
      imageAlt: m[2],
      source: 'app',
      order: i,
      url: `${APP}/scpi/${ad.slug}`,
      scpi: m[2],
      parts: Number(m[1]),
      pricePerShare: ad.pricePerShare,
      distributionRate: ad.distributionRate,
      annualIncome: ad.annualIncome,
      effectiveYield: ad.effectiveYield,
      discountPercent: ad.discountPercent ?? undefined,
      totalPrice: ad.totalPrice,
      marketPrice: ad.marketPrice || undefined,
      seo: { title: ad.cardTitle }, // no page: the shared schema requires a head anyway
    });
    n++;
  }
  return n;
}

/** Self-hosts an ad logo (app storage key or Webflow CDN URL) and returns its public path. */
async function logo(key) {
  if (key.startsWith('https://cdn.prod.website-files.com/')) return assetPath(key);
  const name = `/assets/scpi-logo-${key.split('/').pop().normalize('NFC').replace(/[^\w.-]+/g, '-').replace(/-+/g, '-')}`;
  const file = join(ROOT, 'public', name);
  if (!existsSync(file)) {
    // Same two URL forms as the app's widget: catalogue logos by key, uploaded images by path.
    const r = await fetch(key.startsWith('media/scpi-logos/') ? `${API}/r2-storage/download?key=${encodeURIComponent(key)}` : `${API}/r2-storage/${encodeURI(key)}`);
    if (!r.ok) throw new Error(`scpi-listing: logo ${key} answered ${r.status}`);
    writeFileSync(file, Buffer.from(await r.arrayBuffer()));
  }
  return name;
}
