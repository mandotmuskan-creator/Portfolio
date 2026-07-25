/* =========================================================
   project.js — renders a case study from data.js

   URL:  project.html?p=<slug>
   Sections come straight from the project's `sections` array,
   so adding a block never means touching this file.
   ========================================================= */

(function () {
  const main = document.getElementById('main');
  if (!main) return;

  const slug = new URLSearchParams(location.search).get('p');
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const p = PROJECTS[idx];

  if (!p) {
    main.innerHTML = `
      <section class="phead">
        <div class="phead__inner" style="text-align:center">
          <span class="doodle" style="width:170px;margin:0 auto 20px;color:var(--blue)" data-doodle="mascotPeek"></span>
          <h1 class="display d-lg">Hmm — dropped that one.</h1>
          <p class="lede" style="margin:0 auto 26px">That case study isn't here. It happens.</p>
          <a class="btn btn--fill" href="work.html">Back to the work</a>
        </div>
      </section>`;
    paintDoodles(main);
    return;
  }

  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  document.title = `${p.title} — Muskan Mandot`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', `${p.title} — ${p.tagline}`);

  /* ---------- block renderers ---------- */

  const longHint = `<span class="shot--scrollhint">scroll inside ↕</span>`;

  function figure(src, caption, frame, long) {
    const cls = ['shot', frame === 'browser' ? 'shot--browser' : '', long ? 'shot--long' : '']
      .filter(Boolean).join(' ');
    return `
      <figure class="reveal">
        <div class="${cls}">
          ${long ? longHint : ''}
          <img src="${src}" alt="${escapeHtml(caption || p.title)}" loading="lazy" decoding="async">
        </div>
        ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}
      </figure>`;
  }

  const BLOCK = {
    text: (b) => `
      <div class="cs-block cs-block--text">
        ${b.title ? `<h2 class="display d-md reveal">${escapeHtml(b.title)}</h2>` : ''}
        <div class="prose lede reveal" data-delay="1">
          ${b.body.map((t) => `<p>${escapeHtml(t)}</p>`).join('')}
        </div>
      </div>`,

    points: (b) => `
      <div class="cs-block cs-block--text">
        ${b.title ? `<h2 class="display d-md reveal">${escapeHtml(b.title)}</h2>` : ''}
        <ul class="points reveal" data-delay="1">
          ${b.items.map((t) => `
            <li><span class="doodle" data-doodle="check"></span><span>${escapeHtml(t)}</span></li>`).join('')}
        </ul>
      </div>`,

    full: (b) => `<div class="cs-block">${figure(b.src, b.caption, b.frame, b.long)}</div>`,

    duo: (b) => `
      <div class="cs-block">
        <div class="duo">
          ${b.items.map((it) => figure(it.src, it.caption, it.frame, b.long)).join('')}
        </div>
      </div>`,

    phones: (b) => `
      <div class="cs-block">
        <div class="phones">
          ${b.items.map((it) => `
            <figure class="phone reveal">
              <div class="phone__frame"><img src="${it.src}" alt="${escapeHtml(it.caption || p.title)}" loading="lazy" decoding="async"></div>
              <figcaption>${escapeHtml(it.caption || '')}</figcaption>
            </figure>`).join('')}
        </div>
      </div>`,

    quote: (b) => `<blockquote class="pull reveal">“${escapeHtml(b.text)}”</blockquote>`
  };

  /* ---------- assemble ---------- */

  const isMobile = /mobile/i.test(p.platform);

  const cover = isMobile
    ? `<div class="cs-cover cs-cover--mobile">
         <figure class="reveal">
           <div class="phone__frame"><img src="${p.cover}" alt="${escapeHtml(p.title)}" fetchpriority="high" decoding="async"></div>
         </figure>
       </div>`
    : `<div class="cs-cover">
         <figure class="reveal">
           <div class="shot shot--browser shot--cover"><img src="${p.cover}" alt="${escapeHtml(p.title)}" fetchpriority="high" decoding="async"></div>
         </figure>
       </div>`;

  const meta = [
    ['Role', p.role],
    ['Client', p.client],
    ['Year', p.year],
    ['Tools', p.tools.join(', ')],
    ['Platform', p.platform]
  ];

  main.innerHTML = `
    <article>
      <header class="cs-hero on-navy">
        <div class="cs-hero__inner">
          <p class="eyebrow reveal">${escapeHtml(p.category)}</p>
          <h1 class="display d-xl reveal" data-delay="1">${escapeHtml(p.title)}</h1>
          <p class="lede reveal" data-delay="2">${escapeHtml(p.tagline)}</p>
          <div class="meta reveal" data-delay="3">
            ${meta.map(([k, v]) => `<div><span class="label">${k}</span><strong>${escapeHtml(v)}</strong></div>`).join('')}
          </div>
        </div>
        <div class="cs-hero__doodle" data-doodle="${isMobile ? 'phone' : 'laptop'}"></div>
      </header>

      ${cover}

      <div class="cs-body">
        <div class="cs-block cs-block--text">
          <h2 class="display d-md reveal">Overview</h2>
          <div class="prose lede reveal" data-delay="1">
            ${p.intro.map((t) => `<p>${escapeHtml(t)}</p>`).join('')}
          </div>
        </div>

        <div class="cs-block cs-block--text">
          <div class="rolebox reveal">
            <span class="label">My role</span>
            <p>${escapeHtml(p.roleNote)}</p>
            <span class="doodle" data-doodle="star"></span>
          </div>
        </div>

        ${p.sections.map((b) => (BLOCK[b.kind] ? BLOCK[b.kind](b) : '')).join('')}
      </div>

      <section class="nextup">
        <div class="nextup__inner">
          <a href="${projectHref(next)}" data-hot>
            <p class="eyebrow reveal">next one up —</p>
            <h2 class="display nextup__title reveal" data-delay="1">${escapeHtml(next.title)}</h2>
            <span class="nextup__row reveal" data-delay="2">
              <span class="hand hand-md" style="color:var(--blue)">${escapeHtml(next.category)}</span>
              <span class="doodle" data-doodle="arrowRight"></span>
            </span>
          </a>
        </div>
      </section>
    </article>`;

  paintDoodles(main);
  mountReveals(main);

  /* the cover figure has no caption — drop the empty node */
  main.querySelectorAll('figcaption:empty').forEach((n) => n.remove());

  /* phone screens taller than the handset get a scroll hint */
  const markScrollable = () => {
    main.querySelectorAll('.phones .phone').forEach((ph) => {
      const f = ph.querySelector('.phone__frame');
      ph.classList.toggle('is-scrollable', f.scrollHeight - f.clientHeight > 24);
    });
  };
  addEventListener('load', markScrollable);
  setTimeout(markScrollable, 600);
  main.querySelectorAll('.phones .phone__frame').forEach((f) => {
    f.addEventListener('scroll', () => {
      f.closest('.phone').classList.toggle('is-read', f.scrollTop > 20);
    }, { passive: true });
  });

  /* long shots: hide the hint once someone has scrolled inside */
  main.querySelectorAll('.shot--long').forEach((el) => {
    el.addEventListener('scroll', () => {
      const hint = el.querySelector('.shot--scrollhint');
      if (hint) hint.style.opacity = el.scrollTop > 24 ? '0' : '1';
    }, { passive: true });
  });

  /* reading progress, and a nav that flips to light over the navy hero */
  const bar = document.getElementById('csProgress');
  const hero = main.querySelector('.cs-hero');

  const tick = () => {
    if (bar) {
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (clamp(scrollY / Math.max(1, h), 0, 1) * 100).toFixed(2) + '%';
    }
    if (hero) {
      document.body.classList.toggle('on-dark-left', scrollY < hero.offsetHeight - 72);
    }
  };
  addEventListener('scroll', tick, { passive: true });
  addEventListener('resize', tick);
  tick();
})();
