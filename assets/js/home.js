/* =========================================================
   home.js — the vertical home page

   Two jobs:
   1. build the project cards from data.js
   2. run the scroll companion — the mascot who hauls a rope
      along in the bottom-left gutter while you read the work.

   She lives in a fixed corner slot, outside the document flow,
   so she can never end up on top of a card. Below 1100px she
   is hidden by CSS and this file leaves her alone.
   ========================================================= */

(function () {
  const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1 · project cards
     --------------------------------------------------------- */

  const cards = document.getElementById('cards');
  if (cards) {
    cards.innerHTML = PROJECTS.map((p, i) => `
      <a class="card reveal" href="${projectHref(p)}" data-hot>
        <div class="card__media">
          ${coverMarkup(p, `${p.title} — ${p.category}`)}
        </div>
        <div class="card__text">
          <span class="card__no">PROJECT ${String(i + 1).padStart(2, '0')}</span>
          <span class="card__cat">${escapeHtml(p.category)}</span>
          <h3 class="card__title display">${escapeHtml(p.title)}</h3>
          <p class="card__line">${escapeHtml(p.tagline)}</p>
          <ul class="card__focus">
            ${(p.focus || []).map((f) => `
              <li><span class="doodle" data-doodle="arrowTiny"></span><span>${escapeHtml(f)}</span></li>`).join('')}
          </ul>
          <div class="card__foot">
            <span class="card__go">Read the case study <span class="doodle" data-doodle="arrowRight"></span></span>
            <span class="card__meta">${escapeHtml(p.year)} · ${escapeHtml(p.client)}</span>
          </div>
        </div>
      </a>`).join('');

    paintDoodles(cards);
    mountReveals(cards);
  }

  const yr = document.getElementById('yr');
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ---------------------------------------------------------
     2 · nav colour over the dark sections
     --------------------------------------------------------- */

  const darks = [...document.querySelectorAll('[data-dark]')];

  function paintNav() {
    // the nav sits in the top ~76px; whichever section is under it wins
    const probe = 44;
    const onDark = darks.some((el) => {
      const r = el.getBoundingClientRect();
      return r.top <= probe && r.bottom > probe;
    });
    document.body.classList.toggle('on-dark-left', onDark);
  }

  /* ---------------------------------------------------------
     3 · the scroll companion
     --------------------------------------------------------- */

  const comp = document.querySelector('.companion');
  const ropeSvg = comp && comp.querySelector('.companion__rope path');
  const say = comp && comp.querySelector('.companion__say');

  // kept short — the bubble lives inside a narrow gutter
  const LINES = [
    'heave!',
    'nearly there',
    'heavier than it looks',
    'mind the cable',
    'worth it, promise'
  ];
  let lineAt = 0;

  // her rig, once the doodle has been painted in
  const rig = {};
  function findRig() {
    if (!comp) return;
    rig.arm = comp.querySelector('#mkp-arm');
    rig.legF = comp.querySelector('#mkp-legF');
    rig.legB = comp.querySelector('#mkp-legB');
    rig.head = comp.querySelector('#mkp-head');
  }

  let lastY = scrollY;
  let vel = 0;          // smoothed scroll speed
  let phase = 0;        // haul cycle
  let tension = 0;      // 0 slack … 1 taut

  function bounds() {
    // she walks on while the work section is in view, and stands
    // down again once the closing panel takes over
    const work = document.getElementById('work');
    const end = document.getElementById('end');
    if (!work) return false;
    const w = work.getBoundingClientRect();
    const e = end ? end.getBoundingClientRect() : { top: Infinity };
    return w.top < innerHeight * 0.55 && e.top > innerHeight * 0.72;
  }

  function frame() {
    const dy = scrollY - lastY;
    lastY = scrollY;

    // smoothed absolute speed, normalised to something usable
    vel = lerp(vel, Math.min(Math.abs(dy) / 26, 1), 0.16);
    tension = lerp(tension, vel, 0.12);
    phase += Math.abs(dy) * 0.03;

    if (comp) {
      comp.classList.toggle('is-in', bounds());
      comp.classList.toggle('is-hauling', vel > 0.12);

      const swing = Math.sin(phase);

      if (rig.arm) rig.arm.setAttribute('transform', `translate(${(-7 * swing * vel).toFixed(2)} ${(2 * swing * vel).toFixed(2)})`);
      if (rig.legF) rig.legF.setAttribute('transform', `rotate(${(4 * swing * vel).toFixed(2)} 152 190)`);
      if (rig.legB) rig.legB.setAttribute('transform', `rotate(${(-5 * swing * vel).toFixed(2)} 120 196)`);
      if (rig.head) rig.head.setAttribute('transform', `translate(0 ${(-2.5 * Math.abs(swing) * vel).toFixed(2)})`);

      // rope: slack when she is idle, taut when the page is moving
      if (ropeSvg) {
        const slack = lerp(56, 10, tension);
        ropeSvg.setAttribute('d', `M2 126 Q105 ${(65 + slack).toFixed(1)} 208 4`);
      }
    }

    paintNav();
    requestAnimationFrame(frame);
  }

  /* ---------------------------------------------------------
     4 · she answers when you poke her
     --------------------------------------------------------- */

  if (comp) {
    const fig = comp.querySelector('.companion__fig');
    let timer;

    const talk = () => {
      if (!say) return;
      say.textContent = LINES[lineAt % LINES.length];
      lineAt++;
      comp.classList.add('is-talking');
      clearTimeout(timer);
      timer = setTimeout(() => comp.classList.remove('is-talking'), 2400);
    };

    fig.addEventListener('click', talk);
    fig.addEventListener('mouseenter', talk);
    fig.setAttribute('role', 'button');
    fig.setAttribute('tabindex', '0');
    fig.setAttribute('aria-label', 'Say hello to the mascot');
    fig.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); talk(); }
    });
  }

  /* ---------------------------------------------------------
     5 · both mascots follow the pointer with their eyes
     --------------------------------------------------------- */

  function mountEyes() {
    if (REDUCE || window.matchMedia('(pointer: coarse)').matches) return;

    const rigs = [
      { host: document.getElementById('heroMascot'), sel: '.mk-eyes', reach: 3.4 },
      { host: comp, sel: '.mkp-eyes', reach: 2.6 }
    ]
      .filter((r) => r.host)
      .map((r) => ({ ...r, eyes: r.host.querySelector(r.sel) }))
      .filter((r) => r.eyes);

    if (!rigs.length) return;

    let px = innerWidth / 2, py = innerHeight / 2, queued = 0;

    const paint = () => {
      queued = 0;
      rigs.forEach((r) => {
        const b = r.host.getBoundingClientRect();
        if (!b.width) return;
        // measured from the head, which sits in the upper part of each figure
        const dx = clamp((px - (b.left + b.width * 0.5)) / (innerWidth * 0.45), -1, 1);
        const dy = clamp((py - (b.top + b.height * 0.38)) / (innerHeight * 0.45), -1, 1);
        r.eyes.setAttribute('transform',
          `translate(${(dx * r.reach).toFixed(2)} ${(dy * r.reach * 0.75).toFixed(2)})`);
      });
    };

    addEventListener('pointermove', (e) => {
      px = e.clientX; py = e.clientY;
      if (!queued) queued = requestAnimationFrame(paint);
    }, { passive: true });

    paint();
  }

  /* ---------------------------------------------------------
     start
     --------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', () => {
    findRig();
    mountEyes();
    paintNav();
    if (REDUCE) {
      // no animation loop — just let her stand where she belongs
      if (comp) {
        comp.classList.toggle('is-in', bounds());
        addEventListener('scroll', () => {
          comp.classList.toggle('is-in', bounds());
          paintNav();
        }, { passive: true });
      } else {
        addEventListener('scroll', paintNav, { passive: true });
      }
      return;
    }
    requestAnimationFrame(frame);
  });
})();
