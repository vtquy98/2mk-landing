// Shared helpers for the one-off Webflow -> Astro import (re-runnable until Webflow is switched off).
// Pages are read from .webflow-cache/ (filled by crawl.mjs). Nothing here runs at build time.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import TurndownService from 'turndown';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
export const CACHE = process.env.WEBFLOW_CACHE ?? join(ROOT, '.webflow-cache');
export const SITE = 'https://2ndmarket.fr';
export const APP = 'https://app.2ndmarket.fr';

const pageFile = path => join(CACHE, 'pages', `${path === '/' ? '/index' : path}.html`);
export const loadPage = path => load(readFileSync(pageFile(path), 'utf8'));
export const hasPage = path => existsSync(pageFile(path));

/** [path, status, location] for every URL of the sitemap and the extra probes. */
export const statuses = () =>
  ['status.json', 'status-extra.json'].flatMap(f => (existsSync(join(CACHE, f)) ? JSON.parse(readFileSync(join(CACHE, f), 'utf8')) : []));

/** Last modification date the Webflow sitemap gives for a path (YYYY-MM-DD), if any. */
let lastmods;
export function lastmod(path) {
  lastmods ??= new Map([...readFileSync(join(CACHE, 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map(m => [new URL(m[1]).pathname.replace(/\/$/, '') || '/', m[2].slice(0, 10)]));
  return lastmods.get(path);
}

/** Paths (from the sitemap) under a prefix that answer 200, e.g. pagesIn('/actualites/'). */
export const pagesIn = prefix => statuses().filter(s => s[1] === 200 && s[0].startsWith(prefix)).map(s => s[0]);

// ---------- assets: every Webflow CDN file is downloaded into public/assets/ ----------

const CDN = /https:\/\/(?:cdn\.prod\.website-files\.com|uploads-ssl\.webflow\.com|assets\.website-files\.com|assets-global\.website-files\.com)\/[^"'\s<>,;{}\\]+/g;
// File names may contain "(1)"; a ")" with no "(" is the end of a CSS url(…), "&quot;" the end of an inline style.
const trimUrl = u => {
  u = u.split('&quot')[0];
  while (u.endsWith(')') && (u.match(/\(/g)?.length ?? 0) < (u.match(/\)/g)?.length ?? 0)) u = u.slice(0, -1);
  return u;
};
const assetMapFile = join(CACHE, 'assets.json');
const assets = existsSync(assetMapFile) ? new Map(JSON.parse(readFileSync(assetMapFile, 'utf8'))) : new Map();

/** Local public path for a Webflow CDN URL (registered for download). */
export function assetPath(url) {
  url = url.replace(/&amp;/g, '&');
  if (assets.has(url)) return assets.get(url);
  let name = url.split('?')[0].split(/\/|%2F/i).pop();
  try { name = decodeURIComponent(name); } catch {}
  name = name.normalize('NFC').replace(/[^\w.-]+/g, '-').replace(/-+/g, '-');
  const local = `/assets/${name}`;
  assets.set(url, local);
  return local;
}

export const saveAssetMap = () => writeFileSync(assetMapFile, JSON.stringify([...assets]));
export const assetEntries = () => [...assets];

// ---------- HTML rewriting ----------

const LEGACY_APP_ROUTES = { '/annonce-scpi': '/scpi', '/creer-annonce': '/create', '/index/login': '/auth/login', '/index/sign-up': '/auth/register' };
const CREATE_INTENT = /(publie|déposez|deposez|dépôt|depot|créer une annonce|creer une annonce)/i;

/**
 * Cleans a Webflow HTML fragment so it can live in this repo:
 * CDN URLs -> /assets/…, absolute site links -> root-relative, legacy app routes fixed (was done in JS at runtime),
 * Webflow "tm*" class hacks decoded into real attributes (was done in JS at runtime).
 */
export function cleanFragment($, root) {
  const $root = root ? $(root) : $.root();
  $root.find('[class*="tm"]').addBack('[class*="tm"]').each((_, el) => decodeTmClasses($, el));
  $root.find('a[href]').addBack('a[href]').each((_, a) => {
    let href = $(a).attr('href');
    for (const [old, target] of Object.entries(LEGACY_APP_ROUTES)) {
      if (href.includes(`2ndmarket.fr${old}`)) href = APP + (old === '/annonce-scpi' && CREATE_INTENT.test($(a).text()) ? '/create' : target);
    }
    href = href.replace(/^https?:\/\/(www\.)?2ndmarket\.fr(?=\/|$|[?#])/, '') || '/';
    if (/^\/[^?#]+\/$/.test(href)) href = href.slice(0, -1);
    $(a).attr('href', href);
  });
  $root.find('[class]').addBack('[class]').each((_, el) => {
    const cls = $(el).attr('class').split(/\s+/).filter(c => c && !/^w--current$/.test(c));
    cls.length ? $(el).attr('class', cls.join(' ')) : $(el).removeAttr('class');
  });
  $root.find('[aria-current]').removeAttr('aria-current');
  return $root;
}

/** Rewrites every Webflow CDN URL in a string (HTML, CSS, JSON-LD…). */
// Webflow's own runtime (JS/CSS) is never downloaded: the site doesn't use it.
export const rewriteUrls = s => s.replace(CDN, m => { const u = trimUrl(m); return u.includes('/plugins/Basic/') || u.endsWith('/...') || /\.(js|css)$/i.test(u.split('?')[0]) ? m : assetPath(u) + m.slice(u.length); });

const TM = { tmmin: 'min', tmmax: 'max', tmstep: 'step', tmim: 'inputmode' };
const tmDecode = s => s.replace(/_([0-9a-f]{2})_/g, (_, h) => String.fromCharCode(parseInt(h, 16)));
function decodeTmClasses($, el) {
  const keep = [];
  for (const c of ($(el).attr('class') ?? '').split(/\s+/)) {
    let m;
    if ((m = /^tmid-(.+)$/.exec(c))) { if (!$(el).attr('id')) $(el).attr('id', m[1]); }
    else if ((m = /^tmnm-(.+)$/.exec(c))) $(el).attr('name', tmDecode(m[1]));
    else if ((m = /^tmfor-(.+)$/.exec(c))) $(el).attr('for', m[1]);
    else if ((m = /^tmval-(.*)$/.exec(c))) $(el).attr('value', tmDecode(m[1]));
    else if ((m = /^tmph-(.*)$/.exec(c))) $(el).attr('placeholder', tmDecode(m[1]));
    else if ((m = /^(tmmin|tmmax|tmstep|tmim)-(.*)$/.exec(c))) $(el).attr(TM[m[1]], tmDecode(m[2]));
    else if (c === 'tmchk') $(el).attr('checked', '');
    else if (c === 'tmsel') $(el).attr('selected', '');
    else if (c === 'tmreq') $(el).attr('required', '');
    else if (c === 'tmhide') $(el).attr('aria-hidden', 'true');
    else keep.push(c);
  }
  $(el).attr('class', keep.join(' '));
}

// ---------- rich text -> Markdown (embeds kept as raw HTML) ----------

// Block elements Markdown can't express are kept as raw HTML blocks; inline ones stay inline.
const RAW_BLOCK = ['div', 'figure', 'table', 'style', 'script', 'iframe', 'form', 'details', 'section', 'aside', 'svg', 'video', 'audio', 'canvas', 'dl', 'header', 'footer', 'nav', 'article'];
const RAW_INLINE = ['span', 'sup', 'sub', 'mark', 'u', 'input', 'select', 'textarea', 'button', 'label', 'small', 'abbr', 'time'];
const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced', emDelimiter: '*' });
td.addRule('rawBlocks', {
  filter: node => RAW_BLOCK.includes(node.nodeName.toLowerCase()),
  // A raw HTML block must not contain blank lines, or Markdown would end the block early.
  replacement: (_, node) => `\n\n${node.outerHTML.replace(/\n\s*\n/g, '\n')}\n\n`,
});
td.addRule('rawInline', {
  filter: node => RAW_INLINE.includes(node.nodeName.toLowerCase()),
  replacement: (_, node) => node.outerHTML.replace(/\s*\n\s*/g, ' '),
});
td.addRule('imgWithSize', {
  filter: 'img',
  replacement: (_, node) => node.outerHTML,
});

/** Webflow rich text element -> Markdown string (local assets, clean links). */
export function richText($, el) {
  if (!el || !$(el).length) return '';
  const $el = $(el).clone();
  cleanFragment($, $el);
  $el.find('.w-embed').each((_, e) => { $(e).removeClass('w-embed'); if (!$(e).attr('class')) $(e).removeAttr('class'); });
  $el.find('figure.w-richtext-figure-type-image').each((_, f) => { $(f).removeAttr('style').removeAttr('data-rt-type').removeAttr('data-rt-align').removeAttr('data-rt-max-width'); });
  return rewriteUrls(td.turndown(rewriteUrls($.html($el.contents())))).trim();
}

// ---------- SEO ----------

/** Everything the <head> of a Webflow page says about SEO, ready for BaseLayout's `seo` prop. */
export function extractSeo($) {
  const meta = sel => $(sel).attr('content')?.trim() || undefined;
  const jsonLd = $('script[type="application/ld+json"]')
    .toArray()
    .map(s => rewriteUrls($(s).html().trim()))
    .filter(j => !isSiteGraph(j));
  return prune({
    title: $('title').text().trim(),
    description: meta('meta[name="description"]'),
    canonical: $('link[rel="canonical"]').attr('href'),
    robots: meta('meta[name="robots"]'),
    ogTitle: meta('meta[property="og:title"]'),
    ogDescription: meta('meta[property="og:description"]'),
    ogImage: meta('meta[property="og:image"]') && assetPath(meta('meta[property="og:image"]')),
    ogType: meta('meta[property="og:type"]'),
    twitterTitle: meta('meta[name="twitter:title"]'),
    twitterDescription: meta('meta[name="twitter:description"]'),
    twitterImage: meta('meta[name="twitter:image"]') && assetPath(meta('meta[name="twitter:image"]')),
    jsonLd,
  });
}

/** The Organization/WebSite graph injected on every page by Webflow site settings (lives in BaseLayout instead). */
export const isSiteGraph = j => /"@id":\s*"https:\/\/2ndmarket\.fr\/#organization",\s*"name"/.test(j) && /"@type":\s*\[\s*"Organization"/.test(j);

const prune = o => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== '' && !(Array.isArray(v) && !v.length)));

// ---------- writing content ----------

/** Writes src/content/<collection>/<slug>.md. Frontmatter values are JSON (valid YAML), so any string is safe. */
export function writeEntry(collection, slug, data, body = '') {
  const file = join(ROOT, 'src/content', collection, `${slug}.md`);
  mkdirSync(dirname(file), { recursive: true });
  const fm = Object.entries(prune(data)).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join('\n');
  writeFileSync(file, `---\n${fm}\n---\n\n${body.trim()}\n`);
}

/** Writes a JSON data file under src/data/. */
export function writeData(rel, data) {
  const file = join(ROOT, 'src/data', rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

export const text = ($, el) => $(el).text().replace(/\s+/g, ' ').trim();
