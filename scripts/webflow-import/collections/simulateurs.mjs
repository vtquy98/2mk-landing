// Simulateurs: /simulateurs/<slug> pages (Webflow CMS template "Simulateurs") + the card data of the /simulateurs hub.
//
// Each item has two rich-text fields: the calculator (HTML form + script written by the content team) and the
// article below it. Both are content: they go to the Markdown body, wrapped in <div class="simulator"> and
// <div class="guide"> so the template can lay them out.
//
// Template-level Webflow code replaced here, at import time:
// - "tm*" class decoder (inline in some bodies): decoded by cleanFragment(), script dropped.
// - "rehydrate" script (b3bc9b45): Webflow's rich text dropped ids/values/option values of the calculators, and a
//   37 KB runtime script put them back from a MAP of CSS paths, then re-ran the calculator scripts. The same MAP is
//   applied to the HTML here, so the stored markup is already correct and no runtime patching is needed.
// - JSON-LD blocks pasted in bodies: already in `seo.jsonLd` (rendered in <head>), removed from bodies.
import { cleanFragment, extractSeo, lastmod, loadPage, pagesIn, richText, rewriteUrls, text, writeEntry } from '../lib.mjs';

export default async function () {
  const cards = hubCards();
  const missing = [];
  let n = 0;
  for (const path of pagesIn('/simulateurs/')) {
    const slug = path.split('/').pop();
    const $ = loadPage(path);
    const seo = extractSeo($); // before the bodies lose their JSON-LD blocks
    const rehydrateMap = readRehydrateMap($);
    cleanFragment($, '.main-wrapper');
    const calc = $('.calculator.w-richtext').first();
    const article = $('.calculator-text.w-richtext').not('.w-dyn-bind-empty').first();
    const map = rehydrateMap?.[slug];
    if (map) rehydrate($, map, slug);

    for (const el of [calc, article]) {
      el.find('script[type="application/ld+json"]').remove();
      el.find('script').filter((_, s) => /tmid-\(\.\+\)/.test($(s).html())).remove();
      // Exactly one <h1> per page: the template's. A heading pasted as <h1> in a body becomes an <h2>.
      el.find('h1').each((_, h) => { h.tagName = 'h2'; });
      el.find('[data-rt-embed-type]').removeAttr('data-rt-embed-type');
      el.find('.w-script').removeClass('w-script').filter('[class=""]').removeAttr('class');
      // Embed styles scoped under Webflow's rich-text classes, or targeting the "tmid-x" class (now decoded to id="x"; [id="x"] keeps the class specificity).
      el.find('style').each((_, st) => {
        $(st).text($(st).html().replace(/\.(w-richtext|w-embed) #/g, ':is(.simulator, .guide) #').replace(/\.tmid-([\w-]+)/g, '[id="$1"]'));
      });
    }

    const card = cards.get(path);
    if (!card) missing.push(path);
    // The calculator is pure HTML: kept as one raw HTML block (Markdown conversion would drop the empty anchor
    // divs that widgets mount into, e.g. #s2m-alert-short). No blank line, or Markdown would end the block early.
    calc.find('.w-embed').removeClass('w-embed').filter('[class=""]').removeAttr('class');
    const calculatorHtml = rewriteUrls($.html(calc.contents())).replace(/\n\s*\n/g, '\n').trim();
    const articleMd = article.length ? richText($, article) : '';
    writeEntry('simulateurs', slug, {
      title: text($, 'header h1'),
      name: text($, '.breadcrumb-last'),
      excerpt: seo.description,
      category: card?.category,
      highlights: card?.highlights,
      order: card?.order,
      seo,
      lastmod: lastmod(path),
    }, `<div class="simulator">\n${calculatorHtml}\n</div>\n\n${articleMd ? `<div class="guide">\n\n${articleMd}\n\n</div>` : ''}`);
    n++;
  }
  if (missing.length) console.warn(`simulateurs: not on the hub: ${missing.join(', ')}`);
  return n;
}

/** Hub /simulateurs, tab "Tous": card order, category pill and the 3 highlight lines of every item. */
function hubCards() {
  const $ = loadPage('/simulateurs');
  const cards = new Map();
  $('.w-tab-pane').first().find('.w-dyn-item a').each((order, a) => {
    cards.set($(a).attr('href'), {
      order,
      category: text($, $(a).find('.categories-text')),
      highlights: $(a).find('.calculator-list-text').toArray().map(t => text($, t)).filter(Boolean),
    });
  });
  return cards;
}


/** The MAP object of the Webflow rehydrate script on this page. */
function readRehydrateMap($) {
  const src = $('script').toArray().map(s => $(s).html()).find(s => s.includes('__s2mRehydrate'));
  const m = src && /var MAP = (\{.*\});\n/.exec(src);
  return m ? JSON.parse(m[1]) : undefined;
}

/** Same edits as the Webflow rehydrate script (b3bc9b45), applied to the imported HTML. */
function rehydrate($, C, slug) {
  let root = C.root ? $(`#${C.root}`).first() : $();
  if (!root.length && C.find) {
    root = $(C.find.sel).filter((_, n) => $(n).text().trim() === C.find.text).first();
    for (let u = 0; u < C.find.up && root.length; u++) root = root.parent();
  }
  if (!root.length) return console.warn(`simulateurs/${slug}: rehydrate root not found`);
  if ($(`#${C.els[0][1]}`).length) return; // markup already complete (block re-pasted since)
  const nodes = C.els.map(e => root.find(`:scope ${e[0]}`).first());
  const miss = C.els.filter((_, i) => !nodes[i].length).map(e => e[0]);
  if (miss.length) return console.warn(`simulateurs/${slug}: rehydrate elements not found`, miss);
  C.els.forEach(([, id, x = {}], i) => {
    const n = nodes[i];
    if (id) n.attr('id', id);
    if (x.name) n.attr('name', x.name);
    if (x.opts) n.find('option').each((k, o) => { if (x.opts[k] !== undefined) $(o).attr('value', x.opts[k]); });
    if (x.sel !== undefined) n.find('option').each((k, o) => (k === x.sel ? $(o).attr('selected', '') : $(o).removeAttr('selected')));
    if (x.val !== undefined) n.attr('value', String(x.val));
    if (x.ph) n.attr('placeholder', x.ph);
    if (x.min !== undefined) n.attr('min', String(x.min));
    if (x.max !== undefined) n.attr('max', String(x.max));
    if (x.step !== undefined) n.attr('step', String(x.step));
    if (x.chk) n.attr('checked', '');
    if (x.forId) n.attr('for', x.forId);
    if (x.attrs) for (const [a, v] of Object.entries(x.attrs)) n.attr(a, v);
  });
}
