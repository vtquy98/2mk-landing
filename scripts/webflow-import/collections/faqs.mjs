// Collection "faqs" (Webflow CMS "faqs"): every Q&A listed in the tabs of /faqs, plus the hidden detail pages
// /faqs/<slug> (template 6746bc64852804634cbcd8fe, not in the sitemap, empty body on Webflow: only their <head>).
// One entry per Q&A: `order` = position on /faqs, `page: true` when /faqs/<slug> is a live page.
import { extractSeo, lastmod, loadPage, pagesIn, richText, text, writeEntry } from '../lib.mjs';

const norm = s => s.normalize('NFC').replace(/&#39;/g, "'").replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Question of a detail page, from its QAPage JSON-LD (the page has no visible content). */
function detailQuestion($) {
  const ld = $('script[type="application/ld+json"]').toArray().map(s => $(s).html()).find(j => j.includes('"QAPage"')) ?? '';
  return /"mainEntity"[\s\S]*?"name":\s*"([^"]+)"/.exec(ld)?.[1] ?? text($, $('title')).replace(/^FAQ\s*:\s*|\s*\|\s*2nd Market$/g, '');
}

/** Webflow left the QAPage answer empty: fill it with the answer's text. */
function withAnswer(jsonLd, answer) {
  return jsonLd.map(j => {
    if (!j.includes('"QAPage"') || !answer) return j;
    try {
      const data = JSON.parse(j);
      for (const node of data['@graph'] ?? [data]) if (node.mainEntity?.acceptedAnswer) node.mainEntity.acceptedAnswer.text = answer;
      return JSON.stringify(data, null, 2);
    } catch { return j; }
  });
}

export default async function () {
  const details = new Map(pagesIn('/faqs/').map(path => { const $ = loadPage(path); return [norm(detailQuestion($)), { path, $ }]; }));
  const $ = loadPage('/faqs');
  const used = new Set();
  let order = 0;
  for (const tab of $('.tab-menu .tab-link').toArray()) {
    const category = text($, tab);
    $(`.w-tab-pane[data-w-tab="${$(tab).attr('data-w-tab')}"] .faqs_item`).each((_, el) => {
      const question = text($, $(el).find('.faq_question'));
      const $answer = $(el).find('.faq_answer').clone();
      $answer.find('style, script').remove(); // a dead #s2m-faq-nantissement stylesheet (its selector matched nothing live)
      $answer.find('.w-embed').each((_, e) => { $(e).replaceWith($(e).contents()); });
      $answer.find('[class]').removeAttr('class');
      $answer.find('[id]').removeAttr('id');
      const detail = details.get(norm(question));
      details.delete(norm(question));
      let slug = detail ? detail.path.split('/').pop() : slugify(question);
      while (used.has(slug)) slug += '-2'; // a few questions are listed twice on /faqs
      used.add(slug);
      const seo = detail ? extractSeo(detail.$) : { title: question };
      if (detail) seo.jsonLd = withAnswer(seo.jsonLd ?? [], text($, $answer));
      writeEntry('faqs', slug, { title: question, category, order: order++, page: !!detail, seo, lastmod: detail && lastmod(detail.path) }, richText($, $answer));
    });
  }
  // Detail pages whose question is not (or no longer) listed on /faqs: page with the question only.
  for (const [, { path, $: $d }] of details) writeEntry('faqs', path.split('/').pop(), { title: detailQuestion($d).replace(/&#39;/g, "'"), page: true, seo: extractSeo($d) });
  return order + details.size;
}
