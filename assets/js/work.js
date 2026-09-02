/* =========================================================
   work.js — the filterable project index.
   ========================================================= */

(function () {
  'use strict';

  function tile(p, i) {
    var tag = 'data-tags="' + escapeHtml((p.tags || []).join('|')) + '"';
    var open = p.wip
      ? '<article class="tile reveal" ' + tag + '>'
      : '<a class="tile reveal" href="' + projectHref(p) + '" ' + tag + '>';
    return open +
      coverMarkup(p, p.title + ', ' + p.category) +
      '<p class="tile__no">PROJECT ' + String(i + 1).padStart(2, '0') + '</p>' +
      '<h2 class="tile__title">' + escapeHtml(p.title) + '</h2>' +
      '<p class="tile__line">' + escapeHtml(p.tagline) + '</p>' +
      '<p class="tile__tags">' + (p.tags || []).map(function (t) {
        return '<span>' + escapeHtml(t) + '</span>';
      }).join('') +
      (p.wip ? '<span class="tag-soft">Case study in progress</span>' : '') + '</p>' +
      (p.wip ? '</article>' : '</a>');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('grid');
    var bar = document.getElementById('filters');
    var empty = document.getElementById('empty');
    if (!grid) return;

    grid.innerHTML = PROJECTS.map(tile).join('');
    Crayon.paint(grid);
    mountReveals(grid);

    if (bar) {
      var tags = ['All'];
      PROJECTS.forEach(function (p) {
        (p.tags || []).forEach(function (t) { if (tags.indexOf(t) < 0) tags.push(t); });
      });
      bar.insertAdjacentHTML('beforeend', tags.map(function (t, i) {
        return '<button class="chip" type="button" aria-pressed="' + (i === 0) + '" data-tag="' +
          escapeHtml(t) + '">' + escapeHtml(t) + '</button>';
      }).join(''));

      bar.addEventListener('click', function (e) {
        var btn = e.target.closest('.chip');
        if (!btn) return;
        var tag = btn.dataset.tag;
        bar.querySelectorAll('.chip').forEach(function (c) {
          c.setAttribute('aria-pressed', String(c === btn));
        });
        var shown = 0;
        grid.querySelectorAll('.tile').forEach(function (el) {
          var ok = tag === 'All' || el.dataset.tags.split('|').indexOf(tag) > -1;
          el.hidden = !ok;
          if (ok) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      });
    }
  });
})();
