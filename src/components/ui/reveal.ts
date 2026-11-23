// One-shot scroll reveal of [data-reveal] elements (styles in reveal.css). Bundled once per page however many
// components import it.
import './reveal.css';

if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px' },
  );
  for (const el of document.querySelectorAll('[data-reveal]')) {
    el.classList.add('is-pending');
    io.observe(el);
  }
}
