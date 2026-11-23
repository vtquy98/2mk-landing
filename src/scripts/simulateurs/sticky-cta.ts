/**
 * Sticky "Résultats par email" bar (was "Sticky CTA v1.0.2"). Shown once the lead form is on the page, the visitor has
 * scrolled past 600 px, the form is out of view and not yet sent. The button scrolls to the form.
 */
const bar = document.querySelector<HTMLElement>('#s2m-sticky-cta');
const form = document.querySelector<HTMLElement>('#market2nd-lead-form');

if (bar && form) {
  const success = form.querySelector<HTMLElement>('#lead-success')!;

  const update = () => {
    const r = form.getBoundingClientRect();
    const inView = r.top < innerHeight && r.bottom > 0;
    const show = !form.hidden && success.hidden && !inView && scrollY > 600;
    bar.toggleAttribute('data-show', show);
    document.body.style.paddingBottom = show ? '76px' : '';
    // CookieYes "revisit consent" button stays reachable above the bar (withdrawing consent must stay possible).
    document.querySelector<HTMLElement>('.cky-btn-revisit-wrapper')?.style.setProperty('bottom', show ? '90px' : '');
  };

  let ticking = false;
  const schedule = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  new MutationObserver(schedule).observe(form, { attributes: true, attributeFilter: ['hidden'], subtree: true });
  schedule();

  bar.querySelector('button')!.addEventListener('click', () => {
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => form.querySelector<HTMLInputElement>('#lead-email')?.focus(), 500);
  });
}
