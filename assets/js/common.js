/* =========================================================
   common.js — chrome shared by every page
   nav · footer · cursor companion · scroll reveals
   ========================================================= */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const COARSE = window.matchMedia('(pointer: coarse)').matches;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ---------- nav + footer ---------- */

function mountChrome() {
  const here = document.body.dataset.page || '';

  const navHost = document.querySelector('[data-nav]');
  if (navHost) {
    const on = (p) => (p === here ? ' aria-current="page"' : '');
    navHost.className = 'nav';
    navHost.innerHTML = `
      <a class="nav__mark" href="index.html" aria-label="Muskan Mandot — home">
        ${DOODLE.logo}<span>Muskan</span>
      </a>
      <nav class="nav__links" aria-label="Primary">
        <a href="work.html"${on('work')}>Work</a>
        <a href="about.html"${on('about')}>About</a>
        <a href="mailto:mandotmuskan@gmail.com">Say hi</a>
      </nav>`;
  }

  const footHost = document.querySelector('[data-foot]');
  if (footHost) {
    footHost.className = 'foot on-navy';
    footHost.innerHTML = `
      <div class="foot__inner">
        <p class="eyebrow reveal">Got something you'd like designed?</p>
        <h2 class="display foot__big reveal" data-delay="1">Let's make it<br><span class="dd-underline dd-underline--sky">good</span>.</h2>
        <div class="foot__row reveal" data-delay="2">
          <a class="foot__mail link-doodle" href="mailto:mandotmuskan@gmail.com">mandotmuskan@gmail.com</a>
          <a class="btn" href="work.html">See the work</a>
        </div>
        <div class="foot__meta">
          <span>© ${new Date().getFullYear()} Muskan Mandot · Visual Designer</span>
          <span class="hand hand-sm">drawn, not stock ✎</span>
        </div>
      </div>
      <div class="foot__doodle" data-doodle="mascotPeek"></div>`;
  }

  paintDoodles();

  if (navHost) {
    const stick = () => navHost.classList.toggle('is-stuck', scrollY > 40);
    addEventListener('scroll', stick, { passive: true });
    stick();
  }
}

/* ---------- cursor companion ----------
   The native cursor stays put — this just tags along. */

function mountCursor() {
  if (REDUCED || COARSE) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, on = false;

  addEventListener('pointermove', (e) => {
    tx = e.clientX; ty = e.clientY;
    if (!on) { on = true; dot.classList.add('is-on'); x = tx; y = ty; }
    const hot = e.target.closest('a, button, [data-hot]');
    dot.classList.toggle('is-big', !!hot);
  }, { passive: true });

  addEventListener('pointerleave', () => { on = false; dot.classList.remove('is-on'); });

  (function loop() {
    x = lerp(x, tx, 0.18);
    y = lerp(y, ty, 0.18);
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    requestAnimationFrame(loop);
  })();
}

/* ---------- scroll reveals ---------- */

function mountReveals(root = document) {
  const items = root.querySelectorAll('.reveal, .draw');
  if (!items.length) return;

  // measure each drawable path so the dash animation matches its real length
  root.querySelectorAll('.draw').forEach((svg) => {
    svg.querySelectorAll('path, line, polyline, circle, ellipse').forEach((p) => {
      const len = p.getTotalLength ? Math.ceil(p.getTotalLength()) : 1200;
      p.style.setProperty('--len', len);
    });
  });

  if (REDUCED) { items.forEach((el) => el.classList.add('is-in')); return; }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  items.forEach((el) => io.observe(el));
}

/* ---------- helpers used by other pages ---------- */

function projectHref(p) { return `project.html?p=${encodeURIComponent(p.slug)}`; }

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

document.addEventListener('DOMContentLoaded', () => {
  mountChrome();
  mountCursor();
  mountReveals();
});
