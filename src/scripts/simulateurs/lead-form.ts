/**
 * Simulator lead capture (was "Lead Capture Universel v3.5.5", a Webflow template script).
 * The form is rendered (hidden) by LeadForm.astro; once the simulator shows results, it is moved right after them and
 * shown. On submit, the visible inputs and results of the simulator are posted to the Apps Script endpoint with the
 * exact same payload as before (the spreadsheet behind it depends on the keys).
 */
import { sendLead } from '../lead';
import { LABELS, RESULT_SELECTOR, SKIP_PREFIXES } from './fields';

type Action = 'resultat' | 'signup' | 'annonce' | 'conseiller';

function init(form: HTMLFormElement, root: HTMLElement) {
  const { simulatorId = 'simulateur', variant, app = '', viagerApp = '' } = form.dataset;
  const isViager = variant === 'viager';
  const isTH = variant === 'th';
  const isTF = variant === 'tf' || isTH;
  const el = <T extends HTMLElement>(id: string) => form.querySelector<T>(`#${id}`)!;
  const [firstName, lastName, email, phone] = ['lead-firstname', 'lead-lastname', 'lead-email', 'lead-phone'].map(id => el<HTMLInputElement>(id));
  const phoneHelp = el('lead-phone-help');
  const consent = el<HTMLInputElement>('lead-consent');
  const submit = el<HTMLButtonElement>('lead-submit');
  const error = el('lead-error');
  const phoneHelpText = phoneHelp.textContent;

  const action = () => (form.querySelector<HTMLInputElement>('input[name="lead-action"]:checked')?.value ?? 'resultat') as Action;
  const validPhone = (v: string) => /^\+?\d{6,15}$/.test(v.replace(/[\s().-]/g, ''));

  function checkReady() {
    const required = action() === 'conseiller';
    const p = phone.value.trim();
    const phoneOk = required ? p.length > 0 && validPhone(p) : p.length === 0 || validPhone(p);
    form.dataset.phone = required ? (phoneOk ? 'ok' : 'missing') : '';
    phoneHelp.textContent = required ? 'Obligatoire — un partenaire viager vous rappellera.' : phoneHelpText;
    submit.disabled = !(
      firstName.value.trim() && lastName.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) && phoneOk && consent.checked
    );
  }
  form.addEventListener('input', checkReady);
  form.addEventListener('change', checkReady);
  checkReady();

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (submit.disabled) return;
    const chosen = action();
    error.hidden = true;
    submit.disabled = true;
    submit.dataset.sending = '';
    const ok = await sendLead({
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      leadAction: chosen,
      simulator_id: simulatorId,
      consent: true,
      results: results(root, isTH),
      inputs: inputs(root, isTH),
      metadata: {
        url: location.href.split('?')[0],
        timestamp: new Date().toISOString(),
        ...Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign'].map(k => [k, new URLSearchParams(location.search).get(k) ?? ''])),
      },
    });
    delete submit.dataset.sending;
    if (!ok) {
      error.textContent = 'Erreur de connexion. Veuillez réessayer.';
      error.hidden = false;
      submit.disabled = false;
      return;
    }
    showSuccess(chosen, firstName.value.trim());
    (window as { dataLayer?: unknown[] }).dataLayer?.push({ event: 'lead_capture', simulator_id: simulatorId, lead_action: chosen });
  });

  function showSuccess(chosen: Action, name: string) {
    el('lead-form-content').hidden = true;
    el('lead-success').hidden = false;
    const thanks = `Merci ${name} !`;
    const sent = 'Vos résultats sont envoyés par email.';
    const tfUrl = (campaign: string, content: string) =>
      `${app}/taxe-fonciere?utm_source=simulateur&utm_medium=site&utm_campaign=${campaign}&utm_content=${content}`;
    const listings = isViager ? `${viagerApp}/` : `${app}/scpi`;
    const create = isViager ? `${viagerApp}/` : `${app}/create`;
    const s: { title: string; text: string; cta: [string, string, 'primary' | 'dark' | 'tax']; go?: string } =
      chosen === 'signup' ? { title: thanks, text: `${sent}<br>Créons maintenant votre compte gratuit.`, cta: [`${app}/auth/register`, 'Créer mon compte', 'primary'], go: `${app}/auth/register` }
      : chosen === 'annonce' ? { title: thanks, text: `${sent}<br>Vous allez être redirigé vers le formulaire de dépôt d'annonce.`, cta: [create, isViager ? 'Déposer mon annonce viager' : 'Déposer mon annonce', 'primary'], go: create }
      : chosen === 'conseiller' && isViager ? {
          title: 'Demande de mise en relation enregistrée',
          text: 'Un partenaire viager (notaire ou expert) vous contactera sous <strong>48h ouvrées</strong>.<br>Vos résultats sont également envoyés par email.<br><br><small>2nd Market est une plateforme de mise en relation. Ni CGP, ni CIF, ni société de gestion.</small>',
          cta: ['/viager', 'En savoir plus', 'dark'],
        }
      : isTH ? {
          title: 'Estimation envoyée !',
          text: 'Vérifiez votre boîte de réception (et vos spams si besoin).<br>La valeur locative qui sert au calcul de votre taxe d’habitation et de votre taxe foncière peut être vérifiée avec Solucia, dès 9 €.',
          cta: [tfUrl('th_test', 'formulaire_succes_th'), 'Faire vérifier ma valeur locative', 'tax'],
        }
      : isTF ? {
          title: 'Estimation envoyée !',
          text: 'Vérifiez votre boîte de réception (et vos spams si besoin).<br>Les données qui servent au calcul de votre taxe peuvent être vérifiées avec Solucia, dès 9 €.',
          cta: [tfUrl('tf_ouverture', 'formulaire_succes'), 'Vérifier ma taxe foncière', 'tax'],
        }
      : { title: 'Résultats envoyés !', text: 'Vérifiez votre boîte de réception.<br>Pensez à regarder vos spams si besoin.', cta: [listings, isViager ? 'Découvrir les annonces viager' : 'Découvrir les annonces', 'dark'] };
    el('lead-success-title').textContent = s.title;
    el('lead-success-text').innerHTML = s.text;
    const cta = el<HTMLAnchorElement>('lead-success-cta');
    [cta.href, cta.textContent, cta.dataset.tone] = [s.cta[0], `${s.cta[1]} →`, s.cta[2]];
    cta.hidden = false;
    if (s.go) setTimeout(() => location.assign(s.go!), 2500);
  }

  // ---------- when to show the form ----------
  const show = (after: Element) => {
    if (!form.hidden) return;
    after.after(form);
    form.hidden = false;
  };
  const showSoon = (after: Element, ms = 400) => setTimeout(() => show(after), ms);

  // Taxe d'habitation: results are live (no button); the form appears once an amount is displayed.
  const thRes = isTH ? root.querySelector('.tm-th-res') : null;
  const thBig = thRes?.querySelector('.tm-th-big');
  if (thRes && thBig) {
    const ready = () => /\d/.test(thBig.textContent ?? '') && (showSoon(thRes), true);
    if (!ready()) {
      const obs = new MutationObserver(() => ready() && obs.disconnect());
      obs.observe(thBig, { childList: true, characterData: true, subtree: true });
    }
    return;
  }

  // Otherwise: after the first known results box, as soon as it is visible.
  const box = TARGETS.map(sel => root.querySelector<HTMLElement>(sel)).find(Boolean);
  if (box) {
    if (box.offsetHeight > 0 && box.style.display !== 'none') return void showSoon(box);
    new MutationObserver(() => {
      if (box.offsetHeight > 0 || ['show', 's2m-show', 'active', 'visible'].some(c => box.classList.contains(c))) showSoon(box);
    }).observe(box, { attributes: true, attributeFilter: ['class', 'style'], childList: true, subtree: true });
    return;
  }

  // Unknown simulator: after a "calculer…" click, below the first visible results block.
  root.addEventListener('click', e => {
    const btn = (e.target as Element).closest('button');
    if (!btn || !form.hidden || !/calculer|estimer|simuler|analyser|optimiser/.test(btn.textContent?.toLowerCase() ?? '')) return;
    setTimeout(() => {
      const target = [...root.querySelectorAll<HTMLElement>('[id*="result"],[class*="result"]')].find(
        b => !(b.id && skipped(b.id)) && !b.closest('#s2m-crm, #s2m-seo-crm') && b.offsetHeight > 50,
      );
      if (target) show(target);
    }, 800);
  });
}

/** Results boxes the form goes after (first match wins). */
const TARGETS = [
  '#s2m-fv-results-container', '#s2m-pvs-results', '#s2m-tri-results', '#tf-results-box', '#tf-resultat-estimation',
  '#resultats-container', '#s2m-results', '.s2m-results-grid', '#resultsContainer', '#sdp-results', '.pv-res', '#s2mResults',
  '#s2m-dt-results', '#sim-results', '.results-container', '#results-container', '#rd-resultats', '[id*="results-box"]',
  '[id*="resultat"]', '.results-box', '#results', '.simulation-results',
];

// ---------- what is sent: same keys as the Webflow-era script ----------

const skipped = (id: string) => SKIP_PREFIXES.some(p => id.startsWith(p));
const clean = (s: string | null | undefined) => (s ?? '').trim();

/** Visible label of a field: label[for], else the label around it (2–70 chars, without trailing colon). */
function visibleLabel(field: HTMLElement): string {
  const src = document.querySelector(`label[for="${CSS.escape(field.id)}"]`) ?? field.closest('label');
  if (!src) return '';
  const c = src.cloneNode(true) as Element;
  c.querySelectorAll('input,select,textarea,button').forEach(n => n.remove());
  const t = (c.textContent ?? '').replace(/\s+/g, ' ').trim().replace(/\s*:\s*$/, '');
  return t.length < 2 || t.length > 70 ? '' : t;
}

function labelFor(node: HTMLElement): string {
  const id = node.id;
  return LABELS[id] || visibleLabel(node) || id.replace(/^(tf-|s2m-|sim-|res-|out-|rd-)/, '').replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase());
}

function results(root: HTMLElement, isTH: boolean) {
  const d: Record<string, string> = {};
  root.querySelectorAll<HTMLElement>(RESULT_SELECTOR).forEach(n => {
    if (skipped(n.id) || n.children.length > 2) return;
    const t = clean(n.textContent);
    if (t && t !== '-' && t !== '—' && t.length < 80) d[labelFor(n)] = t;
  });
  for (const [list, name, bouquet, rente] of [
    ['#s2m-r-scenarios .s2m-scenario', '.s2m-scenario-name', '.s2m-scenario-bouquet', '.s2m-scenario-rente'],
    ['#s2m-scenarios-container .s2m-scenario-card', '.s2m-name', '.s2m-bouquet', '.s2m-rente'],
  ]) {
    root.querySelectorAll(list).forEach(s => {
      const [n, b, r] = [name, bouquet, rente].map(q => s.querySelector(q));
      if (n && b && r) d[`Scénario ${clean(n.textContent)}`] = `${clean(b.textContent)} — ${clean(r.textContent)}`;
    });
  }
  const rd = root.querySelector('#rd-resultats');
  if (rd?.classList.contains('active')) {
    rd.querySelectorAll('.rd-kpi').forEach(k => {
      const [l, v] = [k.querySelector('.rd-kpi-label'), k.querySelector('.rd-kpi-value')];
      const t = clean(v?.textContent);
      if (l && v && t && t !== '-') d[clean(l.textContent)] = t;
    });
    const insight = clean(root.querySelector('#rd-insight-text')?.textContent);
    if (insight) d['Point clé'] = insight;
  }
  if (isTH) {
    const wrap = root.querySelector('.tm-th-wrap');
    wrap?.querySelectorAll('.tm-th-kpi').forEach(k => {
      const [l, v] = [k.querySelector('.tm-th-kl'), k.querySelector('.tm-th-kv')];
      if (l && v && /\d/.test(v.textContent ?? '')) d[clean(l.textContent)] = clean(v.textContent);
    });
    // Estimated amount last: the backend email highlights the last line.
    const big = wrap?.querySelector('.tm-th-big');
    if (big && /\d/.test(big.textContent ?? '')) d['Taxe d’habitation 2026 estimée'] = clean(big.textContent);
  }
  return d;
}

function inputs(root: HTMLElement, isTH: boolean) {
  const d: Record<string, string> = {};
  root.querySelectorAll<HTMLInputElement | HTMLSelectElement>('input[id],select[id]').forEach(f => {
    if (skipped(f.id) || f.type === 'hidden' || f.type === 'checkbox') return;
    if (f instanceof HTMLInputElement && ((f.type === 'radio' && !f.checked) || f.readOnly)) return;
    if (!f.value || f.offsetParent === null) return;
    let val = f instanceof HTMLSelectElement ? (f.options[f.selectedIndex]?.text ?? '') : f.value;
    if (f.type === 'radio') {
      const title = f.closest('.s2m-radio')?.querySelector('.s2m-radio-title');
      if (title) val = clean(title.textContent);
      d['Type logement'] = val;
      return;
    }
    d[labelFor(f)] = val;
  });
  const tab = clean(root.querySelector('.tf-tab.active')?.textContent);
  if (tab) d['Mode'] = tab;
  for (const [name, label] of [['s2m-seller-gender', 'Sexe du crédirentier'], ['s2m-viager-type', 'Type de viager']]) {
    const checked = root.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`);
    if (!checked) continue;
    const opt = checked.closest('.s2m-radio-option');
    d[label] = (opt ? opt.querySelector('span')?.textContent || checked.value : checked.value).trim();
  }
  if (isTH) {
    root.querySelectorAll('.tm-th-wrap .tm-th-f').forEach(f => {
      const [l, i] = [f.querySelector('.tm-th-lb'), f.querySelector('input')];
      if (l && i && i.value !== '') d[clean(l.textContent)] = i.value;
    });
  }
  return d;
}

const form = document.querySelector<HTMLFormElement>('#market2nd-lead-form');
const root = document.querySelector<HTMLElement>('[data-simulator]');
if (form && root) init(form, root);
