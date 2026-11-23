// Refreshes .webflow-cache/ from the live Webflow site: sitemap URLs + status (200 / 301 + target) + HTML of every 200 page.
//   node scripts/webflow-import/crawl.mjs            only missing pages
//   node scripts/webflow-import/crawl.mjs --refresh  re-download every page (run right before switching off Webflow)
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { CACHE, SITE } from './lib.mjs';

const refresh = process.argv.includes('--refresh');
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; 2mk-landing-import)' };
// Linked from pages but not in the sitemap (hidden CMS items, custom 404).
const EXTRA = [
  '/404',
  '/scpi-listing/268-parts-de-accimmo-pierre-30-820-50-de-reduction-rendement-estime-4-8-2',
  '/scpi-listing/100-parts-de-pierval-sante-17-000-50-de-reduction-rendement-estime-4-1',
  '/scpi-listing/697-parts-de-epargne-pierre-105-944-50-de-reduction-rendement-estime-5-3-2',
];

const sitemap = await (await fetch(`${SITE}/sitemap.xml`, { headers: UA })).text();
writeFileSync(join(CACHE, 'sitemap.xml'), sitemap);
const paths = [...new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname.replace(/\/$/, '') || '/').concat(EXTRA))];

const pool = async (items, n, fn) => { const q = [...items]; await Promise.all(Array.from({ length: n }, async () => { while (q.length) await fn(q.shift()); })); };
const status = [];
await pool(paths, 8, async p => {
  const r = await fetch(SITE + p, { method: 'HEAD', redirect: 'manual', headers: UA });
  status.push([p, r.status, r.headers.get('location') ?? '']);
});
status.sort((a, b) => a[0].localeCompare(b[0]));
writeFileSync(join(CACHE, 'status.json'), JSON.stringify(status));

let saved = 0;
await pool(status.filter(s => s[1] === 200).map(s => s[0]), 8, async p => {
  const file = join(CACHE, 'pages', `${p === '/' ? '/index' : p}.html`);
  if (existsSync(file) && !refresh) return;
  const r = await fetch(SITE + p, { headers: UA });
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, await r.text());
  saved++;
});
const by = status.reduce((o, s) => ({ ...o, [s[1]]: (o[s[1]] ?? 0) + 1 }), {});
console.log(`crawl: ${paths.length} URLs`, by, `${saved} page(s) downloaded`);
