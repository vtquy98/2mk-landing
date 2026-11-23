/**
 * Email alert widget ("Alerte nouvelles annonces SCPI").
 * Articles imported from Webflow still contain the legacy alert blocks (placeholders `#s2m-alert-short` /
 * `#s2m-alert-long`, older `.tm-alert` cards with a Webflow form). The first one is replaced by the widget, the
 * others are removed; leads go to the Apps Script endpoint (lead.ts). Loaded once per page by BaseLayout.
 */
import './alert-widget.css';
import { t } from '../i18n/config';
import { sendLead, leadContext, PRIVACY_URL } from './lead';

const CONSENT_VERSION = '2026-09-15-swap';
const MIN_FILL_MS = 2500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SHORT = '.tm-alert:not([data-tm="alert-swap"]), #s2m-alert-short, .tmid-s2m-alert-short, form[data-name="Global Alert Short"]';
const LONG = '#s2m-alert-long, .tmid-s2m-alert-long';

function h(tag: string, attrs: Record<string, string> = {}, children: (Node | string)[] = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  el.append(...children);
  return el;
}

function mount() {
  // A form inside a legacy card stands for its card.
  const box = (n: Element) => (n.matches('form') ? n.closest('.tm-alert, .w-form') ?? n : n);
  const shorts = [...document.querySelectorAll(SHORT)].map(box);
  const all = [...new Set([...shorts, ...document.querySelectorAll(LONG)])];
  const legacy = all.filter(n => !all.some(o => o !== n && o.contains(n)));
  if (!legacy.length) return;

  const d = t().alert;
  const scpi = legacy.map(n => (n.getAttribute('data-scpi') ?? '').replace(/\s+/g, ' ').trim()).find(v => v && v !== 'Tout le marché')?.slice(0, 80) ?? '';
  const anchor = legacy.find(n => shorts.includes(n)) ?? legacy[0];
  const placement = shorts.includes(anchor) ? 'swap-short' : 'swap-long';

  const id = `alert-${Math.random().toString(36).slice(2, 8)}`;
  const email = h('input', { id: `${id}-email`, class: 'email-alert__email', type: 'email', inputmode: 'email', autocomplete: 'email', maxlength: '254', required: '', 'aria-describedby': `${id}-msg` }) as HTMLInputElement;
  const consent = h('input', { id: `${id}-consent`, class: 'email-alert__check', type: 'checkbox', required: '', 'aria-describedby': `${id}-msg` }) as HTMLInputElement;
  const honeypot = h('input', { type: 'text', tabindex: '-1', autocomplete: 'off', 'aria-label': d.honeypot }) as HTMLInputElement;
  const button = h('button', { type: 'submit', class: 'email-alert__submit' }, [d.submit]) as HTMLButtonElement;
  const msg = h('p', { id: `${id}-msg`, class: 'email-alert__msg', role: 'status', 'aria-live': 'polite' });
  const form = h('form', { class: 'email-alert__form', novalidate: '', 'aria-labelledby': `${id}-title` }, [
    h('div', { class: 'email-alert__row' }, [h('div', { class: 'email-alert__field' }, [h('label', { class: 'email-alert__label', for: email.id }, [d.email]), email]), button]),
    h('label', { class: 'email-alert__consent', for: consent.id }, [consent, h('span', {}, [`${d.consent} `, h('a', { href: PRIVACY_URL, target: '_blank', rel: 'noopener' }, [d.privacy])])]),
    h('div', { class: 'email-alert__hp', 'aria-hidden': 'true' }, [honeypot]),
  ]) as HTMLFormElement;
  const root = h('section', { class: 'email-alert', 'data-tm': 'alert-swap', 'data-nosnippet': '', 'aria-labelledby': `${id}-title` }, [
    h('p', { id: `${id}-title`, class: 'email-alert__title' }, [d.title]),
    h('p', { class: 'email-alert__sub' }, [d.sub]),
    form,
    msg,
    h('p', { class: 'email-alert__fine' }, [d.fine]),
  ]);
  anchor.replaceWith(root);
  legacy.forEach(n => n !== anchor && n.remove());

  const shownAt = Date.now();
  const say = (state: string, text: string) => { msg.dataset.state = state; msg.textContent = text; };
  const done = () => {
    form.hidden = true;
    say('ok', d.ok);
    msg.tabIndex = -1;
    msg.focus();
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (button.disabled) return;
    const value = email.value.trim().toLowerCase();
    const badEmail = value.length > 254 || !EMAIL_RE.test(value);
    email.setAttribute('aria-invalid', String(badEmail));
    if (badEmail || !consent.checked) {
      say('error', badEmail ? d.errEmail : d.errConsent);
      (badEmail ? email : consent).focus();
      return;
    }
    if (honeypot.value || Date.now() - shownAt < MIN_FILL_MS) return done(); // bot: fake success
    button.disabled = true;
    say('', '');
    const ok = await sendLead({
      leadAction: 'alert',
      email: value,
      vertical: 'scpi',
      scpi,
      phone: '',
      rappel: false,
      consent: true,
      consent_version: CONSENT_VERSION,
      source: 'widget-alert',
      metadata: leadContext(placement),
    });
    button.disabled = false;
    if (ok) done();
    else say('error', navigator.onLine ? d.errServer : d.errNetwork);
  });
  email.addEventListener('input', () => email.setAttribute('aria-invalid', 'false'));
}

mount();
