// FAQ items (Webflow CMS "faqs", no detail pages): read from the three tabs of /faqs -> src/data/faqs.json.
// Each tab is a Webflow list filtered by category; items keep the page order.
import { cleanFragment, loadPage, rewriteUrls, text, writeData } from '../lib.mjs';

export default async function () {
  const $ = loadPage('/faqs');
  const tabs = $('.tab-menu .tab-link').toArray().map(t => ({ id: $(t).attr('data-w-tab'), name: text($, t) }));
  const items = [];
  for (const { id, name } of tabs) {
    $(`.w-tab-pane[data-w-tab="${id}"] .faqs_item`).each((_, el) => {
      const $a = $(el).find('.faq_answer').clone();
      $a.find('style, script').remove(); // a dead #s2m-faq-nantissement stylesheet (its selector matched nothing live)
      $a.find('.w-embed').each((_, e) => { $(e).replaceWith($(e).contents()); });
      $a.find('[class]').each((_, e) => { $(e).removeAttr('class'); });
      $a.find('[id]').each((_, e) => { $(e).removeAttr('id'); });
      cleanFragment($, $a);
      $a.find('a[target="_blank"]').attr('rel', 'noopener');
      items.push({ category: name, question: text($, $(el).find('.faq_question')), answer: rewriteUrls($a.html().replace(/\s*\n\s*/g, ' ').trim()) });
    });
  }
  writeData('faqs.json', items);
  return items.length;
}
