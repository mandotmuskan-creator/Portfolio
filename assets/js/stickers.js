/* =========================================================
   stickers.js — the sticker collection.

   Reads STICKERS from data.js. Each sticker is a cut-out on a
   transparent ground, so the page gives them a soft tile to sit
   on and a small tilt, which is how stickers actually look when
   you stick them on something.
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.getElementById('stickers');
    if (!host) return;

    var list = window.STICKERS || [];

    if (!list.length) {
      host.className = 'stickers stickers--empty';
      host.innerHTML =
        '<li class="stickers__soon reveal">' +
          '<p class="stickers__soonTitle">Being scanned in</p>' +
          '<p class="stickers__soonBody">The drawings exist. Getting them off ' +
            'paper and onto this page is the part I keep putting off.</p>' +
        '</li>';
      mountReveals(host);
      return;
    }

    host.innerHTML = list.map(function (s, i) {
      /* A repeating set of small angles, so the grid looks placed by hand
         without any one sticker being knocked far enough to look wrong. */
      var tilt = [-4, 3, -2, 5, -3, 2][i % 6];
      return '<li class="sticker reveal" style="--tilt:' + tilt + 'deg;--d:' + (i % 4) + '">' +
        '<span class="sticker__tile">' +
          '<img src="' + s.src + '" alt="' + escapeHtml(s.alt || s.name || '') +
            '" loading="lazy" decoding="async">' +
        '</span>' +
        (s.name ? '<span class="sticker__name">' + escapeHtml(s.name) + '</span>' : '') +
      '</li>';
    }).join('');

    mountReveals(host);
  });
})();
