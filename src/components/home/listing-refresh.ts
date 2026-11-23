// Live refresh of the home ads carousel. The page ships a build-time snapshot of the app's ads (SEO, no JS); on load
// this asks the app for the current ads — same endpoint the former Webflow widget used — and re-renders the cards
// from the <template> card. Any failure (network, CORS outside https://2ndmarket.fr, bad payload) keeps the snapshot.

export const API = 'https://api.2ndmarket.fr';

export interface Ad {
  slug: string;
  cardTitle: string;
  logoUrl?: string | null;
  discountPercent?: number | null;
  totalPrice: number;
  marketPrice?: number | null;
  pricePerShare: number;
  distributionRate: number;
  annualIncome: number;
  effectiveYield: number;
}

const fmt = (n: number, digits = 0) => new Intl.NumberFormat('fr-FR', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(n);

/** Public URL of an ad logo, as the app serves it (catalogue logos by key, uploads by path). Webflow URLs: none. */
export function logoSrc(key?: string | null): string | undefined {
  if (!key || key.startsWith('http')) return undefined; // Webflow CDN logos are switched off with Webflow
  return key.startsWith('media/scpi-logos/') ? `${API}/r2-storage/download?key=${encodeURIComponent(key)}` : `${API}/r2-storage/${encodeURI(key)}`;
}

/** Fills a clone of the template card with one ad. `knownLogo` = self-hosted logo of the same ad in the snapshot. */
export function fillCard(slide: HTMLElement, ad: Ad, appUrl: string, knownLogo?: string) {
  const $ = <T extends Element>(sel: string) => slide.querySelector<T>(sel);
  slide.dataset.slug = ad.slug;
  const name = /^\d+ parts · (.+?) · /.exec(ad.cardTitle)?.[1] ?? '';
  const logo = $<HTMLImageElement>('.card__logo');
  const src = knownLogo ?? logoSrc(ad.logoUrl);
  if (logo && src) Object.assign(logo, { src, alt: name });
  else logo?.remove();
  const discount = ad.discountPercent && ad.discountPercent > 0 ? Math.round(ad.discountPercent) : 0;
  const badge = $('.card__badge');
  if (badge && discount) badge.textContent = `Décote ${discount}%`;
  else badge?.remove();
  $('.card__title')!.textContent = ad.cardTitle;
  const values = [`${fmt(ad.pricePerShare)} €`, `${fmt(ad.distributionRate, 2)} %`, `${fmt(ad.annualIncome)} €`, `${fmt(ad.effectiveYield, 1)} %`];
  slide.querySelectorAll('.card__figure dd').forEach((dd, i) => (dd.textContent = values[i]));
  $('.card__price')!.textContent = `${fmt(ad.totalPrice)} €`;
  const original = $('.card__original');
  if (original && discount && ad.marketPrice) original.textContent = `${fmt(ad.marketPrice)} €`;
  else original?.remove();
  const cta = $<HTMLAnchorElement>('.card__cta')!;
  cta.href = `${appUrl}/scpi/${ad.slug}`;
  cta.setAttribute('aria-label', `Voir l'annonce : ${ad.cardTitle}`);
}

const isAd = (a: Partial<Ad>): a is Ad =>
  typeof a?.slug === 'string' && typeof a.cardTitle === 'string' && ['totalPrice', 'pricePerShare', 'distributionRate', 'annualIncome', 'effectiveYield'].every(k => typeof a[k as keyof Ad] === 'number');

/** Fetches the current ads and replaces the cards of `track`. Returns false (snapshot kept) on any failure. */
export async function refresh(track: HTMLElement, template: HTMLTemplateElement, endpoint: string, appUrl: string): Promise<boolean> {
  try {
    const res = await fetch(endpoint, { headers: { Accept: 'application/json' } });
    if (!res.ok) return false;
    const ads: unknown = (await res.json())?.data?.scpiAds;
    if (!Array.isArray(ads) || !ads.length || !ads.every(isAd)) return false;
    const known = new Map([...track.querySelectorAll<HTMLElement>('[data-slug]')].map(li => [li.dataset.slug, li.querySelector<HTMLImageElement>('.card__logo')?.getAttribute('src') ?? undefined]));
    const slides = ads.map(ad => {
      const slide = (template.content.firstElementChild as HTMLElement).cloneNode(true) as HTMLElement;
      fillCard(slide, ad, appUrl, known.get(ad.slug));
      return slide;
    });
    track.replaceChildren(...slides);
    return true;
  } catch {
    return false;
  }
}
