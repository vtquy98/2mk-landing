import type { APIRoute } from 'astro';
import { sitemapUrls } from '../lib/routes';

export const GET: APIRoute = async ({ site }) => {
  const urls = (await sitemapUrls()).map(
    u => `  <url><loc>${new URL(u.path, site).href.replace(/\/$/, '')}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`,
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
