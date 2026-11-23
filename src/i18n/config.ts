/**
 * Languages and product constants. The site is French only today; texts of the shared layout (nav, footer, 404)
 * live in src/i18n/<lang>.json so a second language stays a matter of adding a file.
 */
import fr from './fr.json';

export interface Locale {
  code: string;
  base: string; // URL prefix: '' for the default language
  htmlLang: string;
  ogLocale: string;
}

export const defaultLocale = 'fr';
export const locales: Record<string, Locale> = {
  fr: { code: 'fr', base: '', htmlLang: 'fr', ogLocale: 'fr_FR' },
};

/** Product name and the app the site sends people to. */
export const PRODUCT = {
  name: '2nd Market',
  app: 'https://app.2ndmarket.fr',
  viagerApp: 'https://viager.2ndmarket.fr',
  email: 'contact@2ndmarket.fr',
};

export type Dict = typeof fr;
const dicts = import.meta.glob<Dict>('./*.json', { eager: true, import: 'default' });

/** Texts of the shared layout for one language. */
export function t(lang = defaultLocale): Dict {
  const d = dicts[`./${lang}.json`];
  if (!d) throw new Error(`src/i18n/${lang}.json is missing`);
  return d;
}
