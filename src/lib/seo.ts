/** What BaseLayout puts in <head>. Same shape in src/data/seo/<page>.json and in every content entry's `seo`. */
export interface Seo {
  title: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  jsonLd?: string[]; // raw JSON-LD blocks of this page (the site-wide graph is added by BaseLayout)
}

export const isIndexable = (seo: Pick<Seo, 'robots'>) => !/noindex/i.test(seo.robots ?? '');
