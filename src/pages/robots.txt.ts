import type { APIRoute } from 'astro';

// Same rules as the former Webflow site.
export const GET: APIRoute = ({ site }) =>
  new Response(
    `User-agent: *\nDisallow: /search\nDisallow: /search?\n\nUser-agent: CCBot\nDisallow: /\n\nUser-agent: Bytespider\nDisallow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
