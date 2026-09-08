/* =========================================================
   stickers.js — the sticker wall.

   Every sticker is on the page at once, packed rather than
   gridded: sizes and tilts vary, so the block reads like a
   sheet somebody has been picking from. Each one bobs gently
   on its own timing. Point at one and it straightens, lifts,
   and offers itself as a download.
   ========================================================= */

(function () {
  'use strict';

  /* Seeded shuffle. The order is scattered but stable, so the page looks
     the same on every visit rather than rearranging under someone who is
     halfway through looking at it. */
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

  /* A filename someone will recognise in their downloads folder, built
     from what the sticker says rather than from its slot on the sheet. */
  function fileName(s) {
    var stem = (s.alt || 'sticker').toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'sticker';
    return 'muskan-' + stem + '.webp';
  }

  function card(s, i) {
    /* Sizes, tilts, bob timings and delays cycle through sets of different
       lengths, so no two ever line up and the repeat is invisible. */
    var size  = [112, 158, 126, 178, 100, 142, 168][i % 7];
    var tilt  = [-5, 3, -2, 6, -8, 4, -3][i % 7];
    var dur   = [5.4, 6.8, 6.1, 7.5, 5.9][i % 5];
    var delay = [0, -1.7, -3.2, -0.8, -2.5, -4.1][i % 6];
    return '<a class="stk" href="' + s.src + '" download="' + fileName(s) + '"' +
        ' style="--size:' + size + 'px;--tilt:' + tilt + 'deg' +
        ';--bob:' + dur + 's;--bob-delay:' + delay + 's"' +
        ' aria-label="Download sticker: ' + escapeHtml(s.alt || '') + '">' +
      '<img src="' + s.src + '" alt="" loading="lazy" decoding="async">' +
      '<span class="stk__get" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" focusable="false"><path d="M12 3v12m0 0 5-5m-5 5-5-5" />' +
        '<path d="M4 19h16" /></svg></span>' +
    '</a>';
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

    host.className = 'stickers';
    host.innerHTML = scatter(list).map(card).join('');
  });
})();
