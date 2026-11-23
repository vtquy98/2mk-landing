// URL parity between the live Webflow site and dist/ (run after `npm run build`):
//   - every live 200 page exists in dist/
//   - no redirect source is also a page (Cloudflare would serve the page, the 301 would be lost)
//   - redirect targets that are on this site exist
//   - no reference to Webflow's CDN anywhere in dist/
//   - every root-relative link in dist/ resolves to a page, an asset or a redirect
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MERGED_PAGES, ROOT, statuses } from './lib.mjs';

const DIST = join(ROOT, 'dist');
const isPage = p => p === '/' ? existsSync(join(DIST, 'index.html')) : existsSync(join(DIST, `${p}.html`)) || existsSync(join(DIST, p, 'index.html'));
const isFile = p => existsSync(join(DIST, decodeURIComponent(p)));
const all = statuses();
const pages = all.filter(s => s[1] === 200 && !MERGED_PAGES[s[0]]).map(s => s[0]);
const redirects = new Map([...all.filter(s => s[1] === 301).map(s => [s[0], s[2]]), ...Object.entries(MERGED_PAGES)]);
const problems = [];

for (const p of pages) if (!isPage(p)) problems.push(`missing page: ${p}`);
for (const [from, to] of redirects) {
  if (isPage(from)) problems.push(`redirect source is also a page: ${from}`);
  const local = to.replace(/^https?:\/\/(www\.)?2ndmarket\.fr/, '');
  if (local.startsWith('/') && !isPage(local) && !redirects.has(local)) problems.push(`redirect target missing: ${from} -> ${to}`);
}

const html = readdirSync(DIST, { recursive: true }).map(String).filter(f => f.endsWith('.html'));
const broken = new Map();
for (const f of html) {
  const s = readFileSync(join(DIST, f), 'utf8');
  if (/website-files\.com|webflow\.com/.test(s)) problems.push(`Webflow URL in dist/${f}`);
  for (const [, href] of s.matchAll(/\s(?:href|src)="(\/[^"#?]*)/g)) {
    if (href.startsWith('//')) continue;
    const p = href.length > 1 ? href.replace(/\/$/, '') : href;
    if (!isPage(p) && !isFile(p) && !redirects.has(p)) broken.set(p, (broken.get(p) ?? []).concat(f));
  }
}
for (const [p, files] of broken) problems.push(`broken link ${p} (in ${files.length} page(s), e.g. ${files[0]})`);

console.log(`${pages.length} live pages, ${redirects.size} redirects, ${html.length} built pages`);
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('parity OK');
