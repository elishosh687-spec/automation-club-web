/* ============================================================
   Automation Club — Main Script
   ------------------------------------------------------------
   Modules:
     1. Mobile menu toggle
     2. Global reveal-on-scroll ([data-reveal], .mask-line)
     3. Bento card cursor glow
     4. Process timeline — rail progress + ring activation
     5. Scroll progress bar
     6. Hero blob mouse parallax
     7. Primary-button shimmer (periodic, viewport-gated)
     8. Hero background image scroll parallax
   ============================================================ */

/* ---------- 1. Mobile menu toggle ---------- */
(function () {
  const toggle = document.getElementById('menuToggle');
  const menu   = document.getElementById('mobileMenu');
  const icon   = document.getElementById('menuIcon');
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', open ? 'false' : 'true');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('menu-open', open);
    if (icon) icon.textContent = open ? 'close' : 'menu';
  }

  toggle.addEventListener('click', () => {
    setOpen(!menu.classList.contains('is-open'));
  });

  menu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
  });
})();

/* ---------- 2. Global reveal-on-scroll ---------- */
(function () {
  const els = document.querySelectorAll('[data-reveal], .mask-line');
  if (!els.length) return;

  // Stagger siblings inside the same parent for a natural cascade
  const groups = new Map();
  els.forEach((el) => {
    const parent = el.parentElement;
    const arr = groups.get(parent) || [];
    arr.push(el);
    groups.set(parent, arr);
  });
  groups.forEach((arr) => {
    arr.forEach((el, i) => {
      if (!el.style.transitionDelay) el.style.transitionDelay = i * 90 + 'ms';
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  els.forEach((el) => io.observe(el));
})();

/* ---------- 3. Bento cards — cursor glow follow ---------- */
(function () {
  const cards = document.querySelectorAll('.bento-card');
  cards.forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });
})();

/* ---------- 4. Process timeline — rail fill + ring activation ---------- */
(function () {
  const section = document.getElementById('process');
  if (!section) return;
  const list     = section.querySelector('[data-process-list]');
  const progress = section.querySelector('.rail-progress');
  const items    = Array.from(section.querySelectorAll('.step-item'));
  if (!list || !progress || !items.length) return;

  // First-view reveal
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );
  items.forEach((el) => io.observe(el));

  // Rail fill + ring activation based on scroll
  let ticking = false;
  function update() {
    const listRect = list.getBoundingClientRect();
    const vh       = window.innerHeight;
    const anchor   = vh * 0.55;
    const total    = list.offsetHeight;
    const passed   = Math.max(0, Math.min(total, anchor - listRect.top));
    const p        = total ? passed / total : 0;
    progress.style.transform = `scaleY(${p})`;

    items.forEach((item) => {
      const ring = item.querySelector('.step-ring');
      if (!ring) return;
      const r = ring.getBoundingClientRect();
      const ringY = r.top + r.height / 2;
      if (ringY < anchor) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

/* ---------- 5. Scroll progress bar ---------- */
(function () {
  const bar = document.querySelector('.scroll-progress > div');
  if (!bar) return;

  let ticking = false;
  function update() {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const p = scrollable > 0 ? doc.scrollTop / scrollable : 0;
    bar.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

/* ---------- 6. Hero blob mouse parallax ---------- */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const hero = document.querySelector('[data-hero-parallax]');
  const b1   = document.getElementById('heroBlob1');
  const b2   = document.getElementById('heroBlob2');
  if (!hero || !b1 || !b2) return;

  let targetX = 0, targetY = 0;
  let curX    = 0, curY    = 0;
  let rafId   = null;
  let inView  = true;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { inView = e.isIntersecting; });
  });
  io.observe(hero);

  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    targetX = ((e.clientX - r.left) / r.width  - 0.5) * 2;  // -1..1
    targetY = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    if (!rafId) rafId = requestAnimationFrame(tick);
  });

  function tick() {
    curX += (targetX - curX) * 0.08;
    curY += (targetY - curY) * 0.08;
    // Use `translate` property (separate from transform) so the existing
    // `animation: float-slow` (which uses transform) keeps working.
    b1.style.translate = `${curX *  18}px ${curY *  18}px`;
    b2.style.translate = `${curX * -14}px ${curY * -14}px`;

    const settled = Math.abs(targetX - curX) < 0.001 && Math.abs(targetY - curY) < 0.001;
    if (settled || !inView) { rafId = null; return; }
    rafId = requestAnimationFrame(tick);
  }
})();

/* ---------- 7. Primary-button shimmer (periodic) ---------- */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const btns = Array.from(document.querySelectorAll('.btn-glass-primary'));
  if (!btns.length) return;

  // Track visibility per-button so shimmer only runs for buttons in viewport.
  const visible = new WeakMap();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => visible.set(e.target, e.isIntersecting));
  }, { threshold: 0.5 });
  btns.forEach((b) => io.observe(b));

  // Auto-clear the shimmer class when its animation ends so it can retrigger.
  btns.forEach((b) => {
    b.addEventListener('animationend', (e) => {
      if (e.animationName === 'btn-shimmer') b.classList.remove('is-shimmering');
    });
  });

  function cycle() {
    btns.forEach((b, i) => {
      if (!visible.get(b)) return;
      setTimeout(() => {
        b.classList.remove('is-shimmering');
        void b.offsetWidth;               // force reflow so animation can replay
        b.classList.add('is-shimmering');
      }, i * 350);                        // stagger across on-screen buttons
    });
  }

  setTimeout(cycle, 2200);                // first shimmer ~2.2s after load
  setInterval(cycle, 5500);               // then every 5.5s
})();

/* ---------- 8. Hero background image scroll parallax ---------- */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.querySelector('[data-hero-parallax]');
  if (!hero) return;
  const img = hero.querySelector('img');
  if (!img) return;

  // Compensate for vertical offset by pre-scaling the image slightly.
  img.style.transformOrigin = 'center center';
  img.style.willChange = 'transform';

  let ticking = false;
  function update() {
    const rect = hero.getBoundingClientRect();
    // Only animate while hero is within (or near) the viewport
    if (rect.bottom < -100 || rect.top > window.innerHeight + 100) {
      ticking = false;
      return;
    }
    const offset = -rect.top * 0.15;  // 15% parallax speed
    img.style.transform = `translate3d(0, ${offset}px, 0) scale(1.18)`;
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
