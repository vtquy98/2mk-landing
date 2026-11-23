import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  // Single source of truth for the domain: canonical, sitemap, robots, llms.txt all use it.
  site: 'https://2ndmarket.fr',
  // URLs without trailing slash, same as the former Webflow site: /a-propos, /actualites/<slug>
  trailingSlash: 'never',
  build: { format: 'file' },
  // Inter is downloaded at build time and self-hosted (no Google Fonts request at runtime).
  fonts: [{ provider: fontProviders.google(), name: 'Inter', cssVariable: '--font-inter', weights: [300, 400, 500, 600, 700], subsets: ['latin', 'latin-ext'] }],
  // Content is French copy imported from Webflow: never rewrite quotes or dashes.
  markdown: { smartypants: false },
});
