/* =========================================================
   stickers.js — the sticker wall.

   The stickers drift past in lanes, alternating direction and
   running at different speeds, at sizes that vary from one to
   the next. Nothing is on a grid: the point is that it feels
   like a sheet somebody has been picking from, not a catalogue.
   ========================================================= */

(function () {
  'use strict';

  var LANES = 5;

  /* Seeded shuffle. The order is scattered but stable, so the page looks
     the same on every visit and on every device rather than reshuffling
     under someone who is halfway through looking at it. */
  function scatter(list) {
    var a = list.slice();
    var seed = 20260908;
    for (var i = a.length - 1; i > 0; i--) {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      var j = seed % (i + 1);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function card(s, i) {
    /* Sizes and tilts cycle through short sets of odd lengths, so the two
       never line up and the repeat is not visible. */
    var size = [104, 148, 118, 168, 92, 132][i % 6];
    var tilt = [-5, 3, -2, 6, -8, 4, -3][i % 7];
    return '<figure class="stk" style="--size:' + size + 'px;--tilt:' + tilt + 'deg">' +
      '<img src="' + s.src + '" alt="' + escapeHtml(s.alt || '') +
        '" loading="lazy" decoding="async">' +
    '</figure>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.getElementById('stickers');
    if (!host) return;

    var list = window.STICKERS || [];

    if (!list.length) {
      host.className = 'stickers stickers--empty';
      host.innerHTML =
        '<div class="stickers__soon reveal">' +
          '<p class="stickers__soonTitle">Currently in the sticker factory</p>' +
          '<p class="stickers__soonBody">They exist. They are just not here yet.</p>' +
        '</div>';
      mountReveals(host);
      return;
    }

    var mixed = scatter(list);
    var lanes = [];
    for (var i = 0; i < LANES; i++) lanes.push([]);
    mixed.forEach(function (s, i) { lanes[i % LANES].push(s); });

    host.className = 'stickers';
    host.innerHTML = lanes.map(function (items, li) {
      var cards = items.map(card).join('');
      /* Two identical runs per lane, so sliding the track exactly half its
         width lands the copy where the original started and the loop never
         shows a seam. The second run is decoration; the first carries the
         alt text. */
      var dup = '<div class="lane__run" aria-hidden="true">' +
        items.map(function (s, i) {
          return card({ src: s.src, alt: '' }, i);
        }).join('') + '</div>';
      return '<div class="lane' + (li % 2 ? ' lane--rev' : '') + '"' +
          ' style="--dur:' + (46 + li * 9) + 's">' +
          '<div class="lane__track">' +
            '<div class="lane__run">' + cards + '</div>' + dup +
          '</div>' +
        '</div>';
    }).join('');
  });
})();
