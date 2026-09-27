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
  if (event.key === 'Escape') {
    document.querySelectorAll('.mobile-menu[open], [data-filter-drawer][open]').forEach((menu) => menu.removeAttribute('open'));
  }
});

document.querySelectorAll('[data-sort-by]').forEach((select) => {
  select.addEventListener('change', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('sort_by', select.value);
    window.location.assign(url.toString());
  });
});

document.querySelectorAll('[data-filter-close]').forEach((button) => {
  button.addEventListener('click', () => button.closest('[data-filter-drawer]')?.removeAttribute('open'));
});

document.querySelectorAll('.quantity').forEach((quantity) => {
  const input = quantity.querySelector('input');
  if (!input) return;
  quantity.querySelector('[data-quantity-minus]')?.addEventListener('click', () => {
    input.stepDown();
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  quantity.querySelector('[data-quantity-plus]')?.addEventListener('click', () => {
    input.stepUp();
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
});

document.querySelectorAll('[data-product-gallery]').forEach((gallery) => {
  gallery.querySelectorAll('[data-media-thumbnail]').forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      gallery.querySelectorAll('[data-media-thumbnail], [data-media]').forEach((element) => element.classList.remove('is-active'));
      thumbnail.classList.add('is-active');
      gallery.querySelector(`[data-media="${CSS.escape(thumbnail.dataset.mediaThumbnail)}"]`)?.classList.add('is-active');
    });
  });
});

document.querySelectorAll('[data-variant-select]').forEach((select) => {
  select.addEventListener('change', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('variant', select.value);
    window.location.assign(url.toString());
  });
});

const getRecentlyViewed = () => {
  try {
    const handles = JSON.parse(localStorage.getItem('recently-viewed-products') || '[]');
    return Array.isArray(handles) ? handles : [];
  } catch (_) {
    return [];
  }
};

const viewedProduct = document.querySelector('[data-product-handle]')?.dataset.productHandle;
if (viewedProduct) {
  const handles = getRecentlyViewed().filter((handle) => handle !== viewedProduct);
  try {
    localStorage.setItem('recently-viewed-products', JSON.stringify([viewedProduct, ...handles].slice(0, 8)));
  } catch (_) {
    // Storage can be unavailable in private browsing; the storefront still works without history.
  }
}

document.querySelectorAll('[data-recently-viewed]').forEach(async (container) => {
  const handles = getRecentlyViewed().slice(0, 6);
  if (!handles.length) return;
  const products = (await Promise.all(handles.map(async (handle) => {
    if (!/^[a-z0-9-]+$/.test(handle)) return null;
    try {
      const response = await fetch(`/products/${handle}.js`);
      return response.ok ? response.json() : null;
    } catch (_) {
      return null;
    }
  }))).filter(Boolean);
  if (!products.length) return;
  container.replaceChildren(...products.map((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';
    const link = document.createElement('a');
    link.href = product.url;
    const image = document.createElement('img');
    image.src = product.featured_image || '';
    image.alt = product.title;
    image.loading = 'lazy';
    const media = document.createElement('div');
    media.className = 'product-card__media';
    link.append(image);
    media.append(link);
    const content = document.createElement('div');
    content.className = 'product-card__content';
    const title = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = product.url;
    titleLink.textContent = product.title;
    title.append(titleLink);
    content.append(title);
    card.append(media, content);
    return card;
  }));
});
