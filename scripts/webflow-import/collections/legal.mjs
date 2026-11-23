// /legal/<slug>: privacy policy and terms of use (Webflow template 6751bf05fd459c62545e2b8a), rich text only.
import { extractSeo, lastmod, loadPage, pagesIn, richText, text, writeEntry } from '../lib.mjs';

const OWN_HEAD = {
  'politique-de-confidentialite': {
    title: 'Politique de confidentialité | 2nd Market',
    description: 'Comment 2nd Market collecte, utilise et protège vos données personnelles : finalités, durées de conservation, droits RGPD et contact.',
  },
  'conditions-generales-dutilisation': {
    title: "Conditions générales d'utilisation et mentions légales | 2nd Market",
    description: "Conditions générales d'utilisation et mentions légales de la plateforme 2nd Market, mise en relation pour la revente de SCPI et de viager.",
  },
};

export default async function () {
  let n = 0;
  for (const path of pagesIn('/legal/')) {
    const $ = loadPage(path);
    const $body = $('.legal-content-component .w-richtext').first();
    // The page H1 is in the header; an H1 typed inside the rich text becomes an H2 (one H1 per page).
    $body.find('h1').each((_, h) => { h.tagName = 'h2'; });
    // Both legal pages shared one <title> and description on Webflow: each gets its own (unique titles, S1).
    const own = OWN_HEAD[path.split('/').pop()];
    const seo = { ...extractSeo($), ...own, ogTitle: own.title, twitterTitle: own.title, ogDescription: own.description, twitterDescription: own.description };
    writeEntry('legal', path.split('/').pop(), {
      title: text($, $('h1').first()),
      excerpt: seo.description,
      seo,
      lastmod: lastmod(path),
    }, richText($, $body));
    n++;
  }
  return n;
}
