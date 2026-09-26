document.documentElement.classList.remove('no-js');

document.querySelectorAll('[data-slider]').forEach((slider) => {
  const slides = [...slider.querySelectorAll('[data-slide]')];
  const dots = [...slider.querySelectorAll('[data-dot]')];
  const autoplayToggle = slider.querySelector('[data-autoplay-toggle]');
  const interval = Number(slider.dataset.interval) || 5000;
  let autoplay = slider.dataset.autoplay === 'true' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer;
  let current = 0;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  const pause = () => window.clearInterval(timer);
  const play = () => {
    pause();
    if (autoplay && slides.length > 1) timer = window.setInterval(() => show(current + 1), interval);
  };
  const updateToggle = () => {
    if (!autoplayToggle) return;
    autoplayToggle.textContent = autoplay ? 'Ⅱ' : '▶';
    autoplayToggle.setAttribute('aria-label', autoplay ? 'Pause slideshow' : 'Play slideshow');
  };
  const navigate = (index) => {
    show(index);
    play();
  };

  slider.querySelector('[data-prev]')?.addEventListener('click', () => navigate(current - 1));
  slider.querySelector('[data-next]')?.addEventListener('click', () => navigate(current + 1));
  dots.forEach((dot) => dot.addEventListener('click', () => navigate(Number(dot.dataset.dot))));
  autoplayToggle?.addEventListener('click', () => {
    autoplay = !autoplay;
    updateToggle();
    play();
  });
  slider.addEventListener('mouseenter', pause);
  slider.addEventListener('mouseleave', play);
  slider.addEventListener('focusin', pause);
  slider.addEventListener('focusout', (event) => {
    if (!slider.contains(event.relatedTarget)) play();
  });
  document.addEventListener('visibilitychange', () => document.hidden ? pause() : play());
  if (slides.length) show(0);
  updateToggle();
  play();
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
