/* =========================================================
   home.js — the horizontal stage

   Vertical scroll drives a horizontal translate. The mascot is
   pinned in the viewport; the rope and the project cards slide
   past her, so she reads as hauling them in. Rope sag, card
   swing and her effort all come off scroll velocity.
   ========================================================= */

(function () {
  const spacer = document.getElementById('spacer');
  const view   = document.getElementById('view');
  const track  = document.getElementById('track');
  if (!spacer || !view || !track) return;

  const ropeSvg  = document.getElementById('rope');
  const puller   = document.getElementById('puller');
  const rail     = document.getElementById('rail');
  const railFill = document.getElementById('railFill');
  const railWalk = document.getElementById('railWalker');
  const railLbl  = document.getElementById('railLabel');
  const railPct  = document.getElementById('railPct');

  const SCROLL_RATIO = 0.86;   // vertical distance per horizontal pixel
  const EASE         = 0.115;  // scroll smoothing
  const SAG          = 26;     // how much the line droops between the cards

  let cards = [];
  let panels = [];
  let maxX = 0, viewW = 0, viewH = 0;
  let target = 0, current = 0, vel = 0, velSmooth = 0;
  let hand = { x: 0, y: 0 };
  let armPhase = 0;
  let enabled = false;

  /* ---------- build the project cards ---------- */

  function buildCards() {
    const anchor = track.querySelector('.panel--about');
    const frag = document.createDocumentFragment();

    PROJECTS.forEach((p, i) => {
      const sec = document.createElement('section');
      sec.className = 'panel panel--project';
      sec.dataset.label = p.title;
      sec.innerHTML = `
        <a class="card" href="${projectHref(p)}" data-accent="${p.accent}" data-hot
           aria-label="${escapeHtml(p.title)} — ${escapeHtml(p.category)}">
          <span class="card__peek" data-doodle="${['star', 'sparkle', 'heart', 'bulb', 'spiral'][i % 5]}"></span>
          <span class="card__inner">
            <span class="card__shot ${p.coverFit === 'top' ? 'card__shot--top' : ''}">
              <span class="card__no">${String(i + 1).padStart(2, '0')}</span>
              <img src="${p.cover}" alt="${escapeHtml(p.title)} — ${escapeHtml(p.category)}" loading="lazy" decoding="async">
            </span>
            <span class="card__body">
              <span class="card__cat">${escapeHtml(p.category)}</span>
              <span class="card__title">${escapeHtml(p.title)}</span>
              <span class="card__line">${escapeHtml(p.tagline)}</span>
              <span class="card__cta">Open case study <span class="doodle" data-doodle="arrowRight"></span></span>
            </span>
          </span>
        </a>`;
      frag.appendChild(sec);
    });

    track.insertBefore(frag, anchor);
    paintDoodles(track);
  }

  /* ---------- measure ---------- */

  function measure() {
    viewW = view.offsetWidth;
    viewH = view.offsetHeight;

    panels = [...track.children].map((el) => ({
      el,
      x: el.offsetLeft,
      w: el.offsetWidth,
      label: el.dataset.label || '',
      dark: el.hasAttribute('data-dark')
    }));

    const last = panels[panels.length - 1];
    const trackW = last ? last.x + last.w : track.scrollWidth;
    maxX = Math.max(0, trackW - viewW);

    spacer.style.height = enabled ? (viewH + maxX * SCROLL_RATIO) + 'px' : '';

    cards = [...track.querySelectorAll('.card')].map((el) => {
      const panel = el.closest('.panel');
      return {
        el,
        cx: panel.offsetLeft + el.offsetLeft + el.offsetWidth / 2,
        top: el.offsetTop,
        bottom: el.offsetTop + el.offsetHeight,
        a: 0, av: 0
      };
    });

    measureHand();
  }

  function measureHand() {
    const svg = puller.querySelector('svg');
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;      // 0 0 280 300
    const sx = r.width / (vb.width || 280);
    const sy = r.height / (vb.height || 300);
    // midpoint of the two gripping hands, in the mascot's own coordinates
    hand.x = r.left + 226 * sx;
    hand.y = r.top + 110 * sy;
  }

  /* ---------- rope geometry ---------- */

  const smoothstep = (a, b, v) => {
    const t = clamp((v - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  function ropeY(x, level, sag, whip) {
    const span = (viewW + 300) - hand.x;
    const u = clamp((x - hand.x) / (span || 1), 0, 1);
    const base = lerp(hand.y, level, smoothstep(0, 0.2, u));
    const dip = sag * Math.sin(Math.PI * clamp((u - 0.05) / 0.95, 0, 1));
    const flick = whip * Math.sin(u * Math.PI * 2.4) * (1 - u);
    return base + dip + flick;
  }

  function drawRope(level, sag, whip) {
    const N = 44;
    let d = '';
    for (let i = 0; i <= N; i++) {
      const x = lerp(hand.x, viewW + 300, i / N);
      const y = ropeY(x, level, sag, whip);
      d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }

    // little twists along the rope so it reads as cord, not wire
    let tw = '';
    for (let i = 2; i < N - 1; i += 3) {
      const x = lerp(hand.x, viewW + 300, i / N);
      const y = ropeY(x, level, sag, whip);
      tw += `M${(x - 5).toFixed(1)} ${(y + 4).toFixed(1)} L${(x + 5).toFixed(1)} ${(y - 4).toFixed(1)} `;
    }

    // each card is tethered to the line by a short string from its underside
    let strings = '';
    cards.forEach((c) => {
      const x = c.cx - current;
      if (x < -260 || x > viewW + 260) return;
      const ky = ropeY(x, level, sag, whip);
      const tail = c.a * (Math.PI / 180) * (ky - c.bottom);   // where the swing puts the card's tie point
      strings +=
        `<path class="string" d="M${x.toFixed(1)} ${ky.toFixed(1)} ` +
        `Q${(x + tail * 0.35).toFixed(1)} ${((ky + c.bottom) / 2).toFixed(1)} ` +
        `${(x - tail).toFixed(1)} ${c.bottom.toFixed(1)}"/>` +
        `<circle class="knot" cx="${x.toFixed(1)}" cy="${ky.toFixed(1)}" r="6"/>`;
    });

    ropeSvg.innerHTML =
      `<path class="rope-line" d="${d}"/><path class="rope-tw" d="${tw}"/>${strings}`;
  }

  /* ---------- the mascot's effort ---------- */

  const legF = () => document.getElementById('mkp-legF');
  const legB = () => document.getElementById('mkp-legB');
  const arm  = () => document.getElementById('mkp-arm');
  const head = () => document.getElementById('mkp-head');

  function animatePuller(effort) {
    armPhase += 0.03 + effort * 0.09;
    const s = Math.sin(armPhase);

    const a = arm();  if (a) a.style.transform = `rotate(${(-4 + s * 7 * (0.35 + effort)).toFixed(2)}deg) translateX(${(s * 5 * effort).toFixed(1)}px)`;
    const f = legF(); if (f) f.style.transform = `rotate(${(s * 4 * effort).toFixed(2)}deg)`;
    const b = legB(); if (b) b.style.transform = `rotate(${(-s * 5 * effort).toFixed(2)}deg)`;
    const h = head(); if (h) h.style.transform = `rotate(${(-2 - s * 2.5 * effort).toFixed(2)}deg) translateY(${(-s * 2 * effort).toFixed(1)}px)`;

    puller.style.rotate = `${(-2 - effort * 5).toFixed(2)}deg`;
    puller.classList.toggle('is-heaving', effort > 0.55);
  }

  /* ---------- the loop ---------- */

  function frame() {
    if (!enabled) { requestAnimationFrame(frame); return; }

    const start = spacer.offsetTop;
    const dist = Math.max(1, spacer.offsetHeight - viewH);
    const p = clamp((scrollY - start) / dist, 0, 1);

    const prev = current;
    target = p * maxX;
    current = lerp(current, target, EASE);
    if (Math.abs(target - current) < 0.05) current = target;

    vel = current - prev;
    velSmooth = lerp(velSmooth, vel, 0.2);

    track.style.transform = `translate3d(${(-current).toFixed(2)}px, 0, 0)`;

    /* --- what's on screen right now --- */
    const centre = current + viewW * 0.5;
    const leftEdge = current + 90;
    let atCentre = panels[0], atLeft = panels[0];
    for (const pl of panels) {
      if (centre >= pl.x && centre < pl.x + pl.w) atCentre = pl;
      if (leftEdge >= pl.x && leftEdge < pl.x + pl.w) atLeft = pl;
    }

    document.body.classList.toggle('on-dark-left', !!(atLeft && atLeft.dark));
    rail.classList.toggle('on-dark', !!(atLeft && atLeft.dark));

    /* --- rope + cards, only while the projects are in play --- */
    const first = cards[0], last = cards[cards.length - 1];
    const ropeOn = first && current > first.cx - viewW * 1.15 && current < last.cx + viewW * 0.55;

    ropeSvg.classList.toggle('is-on', !!ropeOn);
    puller.classList.toggle('is-on', !!ropeOn);

    if (ropeOn) {
      measureHand();
      const effort = clamp(Math.abs(velSmooth) / 26, 0, 1);
      const level = hand.y - 6;               // the line leaves her grip level
      const sag = SAG + effort * 16;
      const whip = -velSmooth * 1.5;

      cards.forEach((c) => {
        c.av += (0 - c.a) * 0.06;       // spring back to hanging
        c.av += -velSmooth * 0.011;     // shoved by the motion
        c.av *= 0.88;
        c.a += c.av;
        c.a = clamp(c.a, -9, 9);
        const x = c.cx - current;
        if (x > -320 && x < viewW + 320) {
          c.el.style.transformOrigin = `50% ${(ropeY(x, level, sag, whip) - c.top).toFixed(1)}px`;
          c.el.style.transform = `rotate(${c.a.toFixed(2)}deg)`;
        }
      });

      drawRope(level, sag, whip);
      animatePuller(effort);
    }

    /* --- progress rail --- */
    railFill.setAttribute('d', `M2 5 H${(2 + p * 996).toFixed(1)}`);
    railWalk.style.left = (p * 100).toFixed(2) + '%';
    railWalk.style.transform = `translateY(${(Math.sin(current * 0.06) * 3).toFixed(1)}px) rotate(${(velSmooth * 0.4).toFixed(1)}deg)`;
    railPct.textContent = Math.round(p * 100) + '%';
    if (atCentre && railLbl.textContent !== atCentre.label) railLbl.textContent = atCentre.label;

    /* --- hero parallax --- */
    if (current < viewW * 1.2) {
      heroDoodles.forEach((d) => { d.el.style.translate = `${(current * d.depth).toFixed(1)}px 0`; });
    }

    requestAnimationFrame(frame);
  }

  /* ---------- hero extras ---------- */

  let heroDoodles = [];

  function setupHero() {
    heroDoodles = [...document.querySelectorAll('.dood, .hero__oops, .hero__mascot')].map((el, i) => ({
      el,
      depth: el.classList.contains('hero__mascot') ? 0.14 : (0.06 + ((i * 37) % 24) / 100)
    }));

    // the mascot's eyes track the cursor
    const eyes = document.querySelector('#heroMascot .mk-eyes');
    if (eyes && !REDUCED && !COARSE) {
      addEventListener('pointermove', (e) => {
        const r = document.getElementById('heroMascot').getBoundingClientRect();
        if (!r.width) return;
        const dx = clamp((e.clientX - (r.left + r.width * 0.52)) / (innerWidth * 0.5), -1, 1);
        const dy = clamp((e.clientY - (r.top + r.height * 0.28)) / (innerHeight * 0.5), -1, 1);
        eyes.style.transform = `translate(${(dx * 2.6).toFixed(2)}px, ${(dy * 2).toFixed(2)}px)`;
      }, { passive: true });
    }
  }

  /* ---------- input niceties ---------- */

  function setupInput() {
    // trackpad side-swipes and shift+wheel should move the story along
    addEventListener('wheel', (e) => {
      if (!enabled) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
        scrollBy({ top: e.deltaX, behavior: 'instant' });
      }
    }, { passive: true });

    addEventListener('keydown', (e) => {
      if (!enabled) return;
      if (e.target.closest('input, textarea')) return;
      const step = viewW * 0.42;
      if (e.key === 'ArrowRight') { scrollBy({ top: step * SCROLL_RATIO, behavior: 'smooth' }); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { scrollBy({ top: -step * SCROLL_RATIO, behavior: 'smooth' }); e.preventDefault(); }
    });

    // keep a focused card on screen when tabbing through
    track.addEventListener('focusin', (e) => {
      if (!enabled) return;
      const card = e.target.closest('.card');
      if (!card) return;
      const panel = card.closest('.panel');
      const wanted = panel.offsetLeft - (viewW - panel.offsetWidth) / 2;
      scrollTo({ top: spacer.offsetTop + clamp(wanted / maxX, 0, 1) * (spacer.offsetHeight - viewH), behavior: 'smooth' });
    });
  }

  /* ---------- mode ---------- */

  function decideMode() {
    const narrow = innerWidth < 900;
    const shortish = innerHeight < 540;
    const next = !(REDUCED || COARSE || narrow || shortish);
    if (next === enabled && document.body.classList.contains('no-hscroll') !== next) {
      // already correct
    }
    enabled = next;
    document.body.classList.toggle('no-hscroll', !enabled);
    if (!enabled) {
      track.style.transform = '';
      spacer.style.height = '';
      ropeSvg.innerHTML = '';
      document.body.classList.remove('on-dark-left');
      cards.forEach((c) => { c.el.style.transform = ''; c.el.style.transformOrigin = ''; });
    }
  }

  /* ---------- boot ---------- */

  function boot() {
    buildCards();
    setupHero();
    setupInput();
    decideMode();
    measure();
    mountReveals(track);
    requestAnimationFrame(frame);

    let t;
    addEventListener('resize', () => {
      clearTimeout(t);
      t = setTimeout(() => { decideMode(); measure(); }, 120);
    });
    addEventListener('load', () => { decideMode(); measure(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { measure(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
