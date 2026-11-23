import { defineConfig } from 'astro/config';

export default defineConfig({
  // TODO: production domain. Single source of truth: canonical, hreflang, sitemap, robots, llms.txt all use it.
  site: 'https://2ndmarket.example',
  // URLs without trailing slash: /blog, /blog/slug, /fr
  trailingSlash: 'never',
  build: { format: 'file' },
});
