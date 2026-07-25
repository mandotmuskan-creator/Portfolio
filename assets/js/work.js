/* =========================================================
   work.js — the browsable project index
   ========================================================= */

(function () {
  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const filters = document.querySelector('.filters');
  if (!grid) return;

  const ALL = 'Everything';
  const tags = [ALL, ...new Set(PROJECTS.flatMap((p) => p.tags))];

  /* chips */
  filters.insertAdjacentHTML('beforeend', tags.map((t, i) => `
    <button class="chip" type="button" data-tag="${escapeHtml(t)}"
            aria-pressed="${i === 0}">${escapeHtml(t)}</button>`).join(''));

  /* tiles */
  grid.innerHTML = PROJECTS.map((p, i) => `
    <a class="tile reveal" data-delay="${i % 4}" href="${projectHref(p)}" data-tags="${escapeHtml(p.tags.join('|'))}">
      <span class="tile__frame">
        <span class="tile__no">${String(i + 1).padStart(2, '0')}</span>
        <span class="tile__shot">
          <img src="${p.cover}" alt="${escapeHtml(p.title)} — ${escapeHtml(p.category)}" loading="lazy" decoding="async">
        </span>
      </span>
      <span class="tile__body">
        <span class="tile__cat">${escapeHtml(p.category)}</span>
        <h2 class="tile__title">${escapeHtml(p.title)}</h2>
        <span class="tile__line">${escapeHtml(p.tagline)}</span>
        <span class="tile__tags">${p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</span>
      </span>
    </a>`).join('');

  /* filtering */
  function apply(tag) {
    let shown = 0;
    grid.querySelectorAll('.tile').forEach((el) => {
      const has = tag === ALL || el.dataset.tags.split('|').includes(tag);
      el.hidden = !has;
      if (has) shown++;
    });
    empty.hidden = shown > 0;
    filters.querySelectorAll('.chip').forEach((c) => {
      c.setAttribute('aria-pressed', String(c.dataset.tag === tag));
    });
    history.replaceState(null, '', tag === ALL ? location.pathname : `?tag=${encodeURIComponent(tag)}`);
  }

  filters.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) apply(chip.dataset.tag);
  });

  const wanted = new URLSearchParams(location.search).get('tag');
  apply(tags.includes(wanted) ? wanted : ALL);

  document.querySelectorAll('.tile, .chip').forEach((el) => el.setAttribute('data-hot', ''));
  mountReveals(grid);
  paintDoodles();
})();
