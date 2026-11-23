/**
 * Single source of truth for languages.
 *
 * Add a language (e.g. fr):
 *   1. add an entry to `locales` below,
 *   2. add src/i18n/fr.json (copy en.json, translate the values, keep every key: a missing key fails the build),
 *   3. add content in src/content/pages/fr/ and src/content/blog/fr/ (same `translationKey` as the en version).
 * Routes, hreflang, og:locale, sitemap, llms.txt and the language switcher pick it up automatically.
 */
import en from './en.json';

export interface Locale {
  code: string;
  name: string; // language switcher text, in the language itself
  base: string; // URL prefix: '' for the default language, '/fr' for French…
  htmlLang: string;
  hreflang: string;
  ogLocale: string;
  dateLocale: string;
  dir?: 'rtl';
}

export const defaultLocale = 'en';

export const locales: Record<string, Locale> = {
  en: { code: 'en', name: 'English', base: '', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', dateLocale: 'en-US' },
};

export const localeList = Object.values(locales);

// TODO: real product info. Same for every language (texts live in <lang>.json).
export const PRODUCT = {
  name: '2ndmarket',
  appStoreUrl: '#',
  playStoreUrl: '#',
};

export type Dict = typeof en;
const dicts = import.meta.glob<Dict>('./*.json', { eager: true, import: 'default' });

const missingKeys = (ref: unknown, obj: unknown, prefix = ''): string[] =>
  ref && typeof ref === 'object'
    ? Object.entries(ref).flatMap(([k, v]) =>
        obj && typeof obj === 'object' && k in obj ? missingKeys(v, (obj as any)[k], `${prefix}${k}.`) : [`${prefix}${k}`],
      )
    : [];

/** Texts of the shared layouts for one language. en.json is the reference: a key missing elsewhere fails the build. */
export function t(lang: string): Dict {
  const d = dicts[`./${lang}.json`];
  if (!d) throw new Error(`src/i18n/${lang}.json is missing`);
  const missing = missingKeys(en, d);
  if (missing.length) throw new Error(`src/i18n/${lang}.json is missing keys: ${missing.join(', ')}`);
  return d;
}
