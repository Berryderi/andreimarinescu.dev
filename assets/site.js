// Progressive enhancement only: every page is complete without this file.
// Case pages: highlight the table-of-contents entry for the section being read.
(() => {
  const links = [...document.querySelectorAll('.toc a[href^="#"]')];
  const sections = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;
  const setActive = (id) => links.forEach((a) => {
    const on = a.getAttribute('href') === `#${id}`;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  });
  const io = new IntersectionObserver((entries) => {
    const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible[0]) setActive(visible[0].target.id);
  }, { rootMargin: '-20% 0px -60% 0px' });
  sections.forEach((s) => io.observe(s));
})();
