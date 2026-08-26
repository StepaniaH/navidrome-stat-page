(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveal() {
    const els = document.querySelectorAll('[data-reveal]');
    if (prefersReduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
  }

  function renderCount(el, value) {
    const locale = document.documentElement.lang === 'zh-CN' ? 'zh-CN' : 'en-US';
    el.textContent = new Intl.NumberFormat(locale).format(value);
  }

  function initCounters() {
    const els = document.querySelectorAll('[data-count]');
    if (prefersReduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => renderCount(el, Number(el.dataset.count || 0)));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          const el = entry.target;
          const target = Number(el.dataset.count || 0);
          const duration = 1600;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            renderCount(el, Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.6 }
    );
    els.forEach((el) => io.observe(el));
  }

  function initLangMenu() {
    const root = document.querySelector('[data-lang]');
    if (!root) return;
    const btn = root.querySelector('[data-lang-btn]');
    const menu = root.querySelector('[data-lang-menu]');
    const close = () => {
      btn.setAttribute('aria-expanded', 'false');
      menu.classList.add('invisible', 'opacity-0');
    };
    const open = () => {
      btn.setAttribute('aria-expanded', 'true');
      menu.classList.remove('invisible', 'opacity-0');
    };
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      if (btn.getAttribute('aria-expanded') === 'true') {
        close();
      } else {
        open();
      }
    });
    document.addEventListener('click', (event) => {
      if (!root.contains(event.target)) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') close();
    });
  }

  function initMobileMenu() {
    const btn = document.querySelector('[data-menu-btn]');
    const panel = document.querySelector('[data-menu-panel]');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      btn.setAttribute('aria-expanded', String(willOpen));
      btn.setAttribute('aria-label', willOpen ? btn.dataset.labelClose || 'Close menu' : btn.dataset.labelOpen || 'Open menu');
    });
  }

  function initTabs(btnAttr, panelAttr) {
    const btns = Array.from(document.querySelectorAll(`[${btnAttr}]`));
    if (!btns.length) return;
    const panels = Array.from(document.querySelectorAll(`[${panelAttr}]`));
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute(btnAttr);
        btns.forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
        panels.forEach((panel) => {
          panel.hidden = panel.getAttribute(panelAttr) !== key;
        });
      });
    });
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      let ok = false;
      try {
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
      area.remove();
      return ok;
    }
  }

  function initCopy() {
    document.querySelectorAll('[data-copy]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const target = document.querySelector(btn.dataset.copy);
        if (!target) return;
        const ok = await copyText(target.textContent.trim());
        const label = btn.querySelector('[data-copy-label]');
        if (!label || !ok) return;
        const original = label.textContent;
        label.textContent = btn.dataset.copiedLabel || original;
        btn.disabled = true;
        setTimeout(() => {
          label.textContent = original;
          btn.disabled = false;
        }, 1600);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    initCounters();
    initLangMenu();
    initMobileMenu();
    initTabs('data-theme-btn', 'data-theme-panel');
    initTabs('data-start-tab', 'data-start-panel');
    initCopy();
  });
})();
