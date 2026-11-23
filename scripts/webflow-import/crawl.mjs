// Refreshes .webflow-cache/ from the live Webflow site: sitemap URLs + status (200 / 301 + target) + HTML of every 200 page.
//   node scripts/webflow-import/crawl.mjs            only missing pages
//   node scripts/webflow-import/crawl.mjs --refresh  re-download every page (run right before switching off Webflow)
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { CACHE, SITE } from './lib.mjs';

const refresh = process.argv.includes('--refresh');
const UA = { 'user-agent': 'Mozilla/5.0 (compatible; 2mk-landing-import)' };
// Old URLs linked from content or known to redirect, probed so their 301 lands in public/_redirects.
const EXTRA = [
  '/404',
  // Hidden CMS detail pages (faqs, information-pages), not in the sitemap but live.
  '/faqs/comment-fonctionne-le-simulateur-de-viager',
  '/faqs/comment-revendre-des-parts-scpi-en-indivision-apres-une-succession',
  '/faqs/comment-se-deroule-une-vente',
  '/faqs/delai-jouissance-scpi',
  '/faqs/difference-bouquet-rente',
  '/faqs/lacheteur-doit-il-payer-les-memes-frais-quen-achetant-des-parts-neuves-aupres-de-la-societe-de-gestion',
  '/faqs/paie-plus',
  '/faqs/puis-je-vendre-des-parts-scpi-achetees-via-une-assurance-ou-une-banque-sur-2nd-market',
  '/faqs/quelle-difference-entre-demande-de-retrait-et-vente-de-gre-a-gre-sur-2nd-market',
  '/faqs/quelle-difference-entre-vendre-des-scpi-en-direct-et-via-un-contrat-dassurance-vie',
  '/faqs/quels-sont-les-avantages-du-demembrement',
  '/faqs/quest-ce-que-le-viager',
  '/information-pages/documents-requis-scpi',
  '/simulateurs/simulateur-de-viager-libre-ou-occupe',
  '/guide-scpi/combien-investir-scpi',
  '/guide-scpi/taux-distribution-affichage',
  '/guide-scpi/prix-revente-2026',
  '/actualites/files-retrait-scpi-2026-classement-pourcentage',
  '/guide-scpi/scpi-demembrement-succession',
  '/landing-pages/revendre-scpi-rapidement-2025',
  '/simulateurs/rendement-scpi',
  '/simulateurs/fiscal-scpi',
  '/guide-scpi/revente-succession',
  '/guide-scpi/annonce-wanted',
  '/guide-scpi/achat-scpi-marche-secondaire-primaire',
  '/simulateurs/viager',
  '/politique-confidentialite',
  '/scpi',
  '/sitemap',
  '/taxe-fonciere',
  '/search',
  '/blog',
  '/actualites',
  '/faq',
  '/annonces',
  '/guide-scpi/analyser-scpi-avant-achat',
  '/guide-scpi/comparatif-scpi-viager-sci',
  '/guide-scpi/decote-2025',
  '/guide-scpi/revente-guide-pratique',
  '/marche-secondaire-scpi',
  '/guides/revente-scpi-2025',
  '/guides/viager',
  '/landing-pages/frais-revente-scpi',
  '/guide-scpi/guide-scpi-meilleures-2026',
  '/simulateurs/achat-comptant-credit',
  '/publier-annonce',
  '/simulateurs/rentabilite-scpi',
  '/simulateurs/scpi-demembrement',
  '/simulateurs/viager-libre-ou-occupe',
  '/scpi-listing/268-parts-de-accimmo-pierre-30-820-50-de-reduction-rendement-estime-4-8-2',
  '/scpi-listing/100-parts-de-pierval-sante-17-000-50-de-reduction-rendement-estime-4-1',
  '/scpi-listing/697-parts-de-epargne-pierre-105-944-50-de-reduction-rendement-estime-5-3-2',
];

const sitemap = await (await fetch(`${SITE}/sitemap.xml`, { headers: UA })).text();
writeFileSync(join(CACHE, 'sitemap.xml'), sitemap);
// Webflow's site manifest holds every 301 rule of the site.
writeFileSync(join(CACHE, 'manifest.json'), await (await fetch(`${SITE}/manifest.json`, { headers: UA })).text());
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
