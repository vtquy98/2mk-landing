import { getCollection, type CollectionEntry } from 'astro:content';
import { locales, localeList } from '../i18n/config';

// Every HTML URL of the site. Rendered by src/pages/[...path].astro, listed by sitemap.xml and llms.txt.
export type Route =
  | { kind: 'home'; path: string; lang: string; key: string }
  | { kind: 'blog-list'; path: string; lang: string; key: string }
  | { kind: 'page'; path: string; lang: string; key: string; entry: CollectionEntry<'pages'> }
  | { kind: 'post'; path: string; lang: string; key: string; entry: CollectionEntry<'blog'> };

const split = (id: string) => {
  const [lang, ...rest] = id.split('/');
  if (!locales[lang]) throw new Error(`Content file "${id}": folder "${lang}" is not a language in src/i18n/config.ts`);
  return { lang, slug: rest.join('/') };
};

export const homePath = (lang: string) => locales[lang].base || '/';
export const blogPath = (lang: string) => `${locales[lang].base}/blog`;

let cache: Promise<Route[]> | undefined;
export const getRoutes = () => (cache ??= build());

async function build(): Promise<Route[]> {
  const routes: Route[] = localeList.flatMap(l => [
    { kind: 'home' as const, path: homePath(l.code), lang: l.code, key: 'home' },
    { kind: 'blog-list' as const, path: blogPath(l.code), lang: l.code, key: 'blog' },
  ]);
  for (const entry of await getCollection('pages')) {
    const { lang, slug } = split(entry.id);
    routes.push({ kind: 'page', path: `${locales[lang].base}/${slug}`, lang, key: `page:${entry.data.translationKey ?? slug}`, entry });
  }
  for (const entry of await getCollection('blog', p => !p.data.draft)) {
    const { lang, slug } = split(entry.id);
    routes.push({ kind: 'post', path: `${blogPath(lang)}/${slug}`, lang, key: `post:${entry.data.translationKey ?? entry.id}`, entry });
  }
  return routes;
}

/** Same page in other languages: { lang: path }. */
export const alternatesOf = (route: Route, routes: Route[]) =>
  Object.fromEntries(routes.filter(r => r.key === route.key).map(r => [r.lang, r.path]));

export const isIndexable = (r: Route) => !(r.kind === 'page' || r.kind === 'post') || !/noindex/.test(r.entry.data.robots ?? '');
