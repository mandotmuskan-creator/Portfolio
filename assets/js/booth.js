/* =========================================================
   booth.js — the photo booth.

   Two rolls of prints moving in opposite directions. The set is
   duplicated once and the track animates to -50%, so the loop is
   seamless without any JavaScript running per frame.

   The duplicate is hidden from assistive tech, and the whole thing
   stops on hover, on focus and under prefers-reduced-motion.
   ========================================================= */

(function () {
  'use strict';

  /* the portrait belongs in the roll too */
  var BIO = {
    src: 'assets/img/life/muskan-bio.webp',
    caption: 'Yellow hands, mid project.',
    alt: 'Muskan laughing with one hand covered in yellow paint.'
  };

  var TILT = [-2.5, 1.8, -1.2, 2.4, -1.9, 1.1, -2.8, 2];

  function print(g, i, decorative) {
    var d = (window.IMG_SIZES || {})[g.src] || [];
    return '<figure class="print" style="--tilt:' + TILT[i % TILT.length] + 'deg"' +
      (decorative ? ' aria-hidden="true"' : '') + '>' +
      '<img src="' + g.src + '"' +
      (d.length ? ' width="' + d[0] + '" height="' + d[1] + '"' : '') +
      ' alt="' + (decorative ? '' : escapeHtml(g.alt || '')) + '" loading="lazy" decoding="async">' +
      (g.caption ? '<figcaption>' + escapeHtml(g.caption) + '</figcaption>' : '') +
      '</figure>';
  }

  function roll(items, dir, seconds) {
    var real = items.map(function (g, i) { return print(g, i, false); }).join('');
    var copy = items.map(function (g, i) { return print(g, i, true); }).join('');
    return '<div class="roll roll--' + dir + '">' +
      '<div class="roll__track" style="--dur:' + seconds + 's">' + real + copy + '</div>' +
      '</div>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.getElementById('booth');
    if (!host || !window.GALLERY) return;

    var all = GALLERY.concat([BIO]);
    /* two rolls, each carrying the whole set from a different starting point,
       so the same photo is never level with itself */
    var half = Math.ceil(all.length / 2);
    var top = all.slice(0, half).concat(all.slice(half));
    var bottom = all.slice(half).concat(all.slice(0, half)).reverse();

    host.innerHTML =
      roll(top, 'left', 64) +
      roll(bottom, 'right', 78);

    /* a small crayon note under the rolls */
    host.insertAdjacentHTML('beforeend',
      '<p class="booth__note wrap">' +
        '<span class="hand hand--red">Hover to stop the roll.</span></p>');
  });
})();
