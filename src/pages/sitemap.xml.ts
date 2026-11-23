import type { APIRoute } from 'astro';
import { defaultLocale, locales } from '../i18n/config';
import { alternatesOf, getRoutes, isIndexable } from '../lib/routes';

export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const routes = await getRoutes();
  const urls = routes.filter(isIndexable).map(r => {
    const alts = Object.entries(alternatesOf(r, routes));
    const links =
      alts.length > 1
        ? alts.map(([l, p]) => `<xhtml:link rel="alternate" hreflang="${locales[l].hreflang}" href="${abs(p)}"/>`).join('') +
          (alts.some(([l]) => l === defaultLocale) ? `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(alts.find(([l]) => l === defaultLocale)![1])}"/>` : '')
        : '';
    const lastmod = r.kind === 'post' ? `<lastmod>${(r.entry.data.updated ?? r.entry.data.date).toISOString().slice(0, 10)}</lastmod>` : '';
    return `<url><loc>${abs(r.path)}</loc>${lastmod}${links}</url>`;
  });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
