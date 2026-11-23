// One file per collection in src/collections/ (schema + where its Markdown lives).
import actualites from './collections/actualites';
import secondSeo from './collections/2nd-seo';
import seo from './collections/seo';
import guideScpi from './collections/guide-scpi';
import landingPages from './collections/landing-pages';
import simulateurs from './collections/simulateurs';
import legal from './collections/legal';
import scpiListing from './collections/scpi-listing';

// Collection name = URL prefix of its pages.
export const collections = {
  actualites,
  '2nd-seo': secondSeo,
  seo,
  'guide-scpi': guideScpi,
  'landing-pages': landingPages,
  simulateurs,
  legal,
  'scpi-listing': scpiListing,
};
