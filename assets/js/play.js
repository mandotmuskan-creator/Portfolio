/* =========================================================
   play.js — the experiments grid.
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.getElementById('plays');
    if (!host || !window.PLAY) return;

    host.innerHTML = PLAY.map(function (p, i) {
      return '<article class="play reveal" style="--d:' + (i % 4) + '">' +
        '<div class="play__art">' +
          Crayon.asset({ kind: p.kind || 'crayon', name: p.art, size: 'lg' }) +
        '</div>' +
        '<h2>' + escapeHtml(p.title) + '</h2>' +
        '<p>' + escapeHtml(p.body) + '</p>' +
        '<span class="play__tag">' + escapeHtml(p.tag) + '</span>' +
      '</article>';
    }).join('');
    mountReveals(host);
  });
})();
