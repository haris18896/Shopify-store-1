document.documentElement.classList.remove('no-js');

document.querySelectorAll('[data-slider]').forEach((slider) => {
  const slides = [...slider.querySelectorAll('[data-slide]')];
  const dots = [...slider.querySelectorAll('[data-dot]')];
  let current = 0;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  };

  slider.querySelector('[data-prev]')?.addEventListener('click', () => show(current - 1));
  slider.querySelector('[data-next]')?.addEventListener('click', () => show(current + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => show(Number(dot.dataset.dot))));
  if (slides.length) show(0);
});

document.querySelectorAll('.mobile-menu').forEach((menu) => {
  menu.querySelector('.mobile-menu__close')?.addEventListener('click', () => menu.removeAttribute('open'));
  menu.querySelector('nav')?.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) menu.removeAttribute('open');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') document.querySelectorAll('.mobile-menu[open]').forEach((menu) => menu.removeAttribute('open'));
});
