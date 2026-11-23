// Lists shown on the home pages that are not a collection of their own:
//   src/data/home/faqs.json      FAQ items (Webflow CMS "faqs", filtered per page) of / (also /home-new, /viager) and
//                                /observatoire-scpi. Several are not on /faqs, so they can't be looked up there.
//   src/data/home/scpi-order.json  slugs of the 60 /2nd-seo pages listed at the bottom of /, in the live order: Webflow
//                                sorted them on a creation time the pages don't expose, so the order is recorded.
import { cleanFragment, loadPage, rewriteUrls, text, writeData } from '../lib.mjs';

function faqs(path) {
  const $ = loadPage(path);
  return $('.main-wrapper .faqs_item').toArray().map(el => {
    const $a = $(el).find('.faq_answer').clone();
    $a.find('style, script').remove();
    $a.find('.w-embed').each((_, e) => { $(e).replaceWith($(e).contents()); });
    $a.find('[class], [id]').removeAttr('class').removeAttr('id');
    cleanFragment($, $a);
    $a.find('a[target="_blank"]').attr('rel', 'noopener');
    return { question: text($, $(el).find('.faq_question')), answer: rewriteUrls($a.html().replace(/\s*\n\s*/g, ' ').trim()) };
  });
}

export default async function () {
  const lists = { '/': faqs('/'), '/observatoire-scpi': faqs('/observatoire-scpi') };
  writeData('home/faqs.json', lists);
  const $ = loadPage('/');
  const order = $('.comapy_listing .w-dyn-item').toArray().map(el => $(el).find('a').first().attr('href').split('/').pop());
  writeData('home/scpi-order.json', order);
  return lists['/'].length + lists['/observatoire-scpi'].length + order.length;
}
