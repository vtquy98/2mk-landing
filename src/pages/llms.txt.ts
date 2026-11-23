import type { APIRoute } from 'astro';
import { localeList, PRODUCT, t } from '../i18n/config';
import { getRoutes, isIndexable, type Route } from '../lib/routes';

// https://llmstxt.org — plain map of the site for AI answer engines
export const GET: APIRoute = async ({ site }) => {
  const routes = (await getRoutes()).filter(isIndexable);
  const line = (r: Route) => {
    const tx = t(r.lang);
    const [title, desc] =
      r.kind === 'home' ? [tx.meta.title, tx.meta.description] : r.kind === 'blog-list' ? [tx.blog.title, tx.blog.description] : [r.entry.data.title, r.entry.data.description];
    return `- [${title}](${new URL(r.path, site).href}): ${desc}`;
  };
  let out = `# ${PRODUCT.name}\n\n> ${t('en').meta.description}\n`;
  for (const l of localeList) out += `\n## ${l.name}\n\n${routes.filter(r => r.lang === l.code).map(line).join('\n')}\n`;
  return new Response(out, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
