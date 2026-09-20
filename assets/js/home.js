/* =========================================================
   home.js, the project rows, the process strip and the toolkit.

   The decoration around each project deliberately differs:
   the system is shared, the composition is not.
   ========================================================= */

(function () {
  'use strict';

  function metaRow(p) {
    var rows = [
      ['Role', p.role],
      ['Team', p.team],
      ['Year', p.year],
      ['Platform', p.platform]
    ].filter(function (r) { return r[1]; });

    return '<dl class="meta">' + rows.map(function (r) {
      return '<div><dt>' + escapeHtml(r[0]) + '</dt><dd>' + escapeHtml(r[1]) + '</dd></div>';
    }).join('') + '</dl>';
  }

  /* The client's own mark, where the work was for a brand with one. A
     private client gets nothing here rather than a placeholder.

     Sized from the same optical widths the roster uses, so a nine-to-one
     wordmark and a three-to-one script carry equal weight instead of the
     wide one looking twice the size. One source of truth: the `w` in
     CLIENTS, scaled down for this smaller context. */
  var MARK_SCALE = 0.72;

  function clientMark(p) {
    if (!p.clientLogo) return '';
    var entry = (window.CLIENTS || []).filter(function (c) {
      return c.logo === p.clientLogo;
    })[0];
    var w = entry && entry.w ? Math.round(entry.w * MARK_SCALE) : 108;
    return '<p class="proj__client" style="--markw:' + w + 'px">' +
      '<img src="' + p.clientLogo + '" alt="' + escapeHtml(p.client) +
      '" loading="lazy" decoding="async"></p>';
  }

  /* The same chips the work grid uses, so a project reads the same way
     wherever you meet it. */
  function tagRow(p) {
    if (!(p.tags || []).length) return '';
    return '<p class="proj__tags">' + p.tags.map(function (t) {
      return '<span class="tag-soft">' + escapeHtml(t) + '</span>';
    }).join('') + '</p>';
  }

  function row(p, i) {
    var n = String(i + 1).padStart(2, '0');
    return '<article class="proj reveal">' +
      '<div class="proj__media">' +
        coverMarkup(p, p.title + ', ' + p.category, 'proj__shot') +
      '</div>' +
      '<div class="proj__body">' +
        '<p class="proj__no">PROJECT ' + n + '</p>' +
        clientMark(p) +
        '<h3 class="proj__title">' + (p.wip
          ? escapeHtml(p.title)
          : '<a class="stretch" href="' + projectHref(p) + '">' + escapeHtml(p.title) + '</a>') +
        '</h3>' +
        '<p class="proj__line">' + escapeHtml(p.tagline) + '</p>' +
        tagRow(p) +
        metaRow(p) +
        '<p class="proj__cta">' + (p.wip
          ? '<span class="tag-soft">Case study in progress</span>'
          : '<span class="btn btn--ghost" aria-hidden="true">Read the case study</span>') +
        '</p>' +
      '</div>' +
    '</article>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.getElementById('projects');
    if (host) {
      host.innerHTML = PROJECTS.map(row).join('');
      mountReveals(host);
    }

    /* The roster runs as a marquee. The list is rendered twice and the
       track slides exactly half its width, so the loop has no seam. The
       second copy is decoration for the eye only, so it is hidden from
       assistive tech and the first copy carries the real names. */
    var clients = document.getElementById('clients');
    if (clients && window.CLIENTS) {
      var lane = function (dup) {
        return '<ul class="marquee__lane"' + (dup ? ' aria-hidden="true"' : '') + '>' +
          CLIENTS.map(function (c) {
            var w = c.w ? ' style="--w:' + c.w + 'px"' : '';
            return '<li class="client"' + w + '>' + (c.logo
              ? '<img src="' + c.logo + '" alt="' + (dup ? '' : escapeHtml(c.name)) +
                '" loading="lazy" decoding="async">'
              : '<span class="client__name">' + escapeHtml(c.name) + '</span>') + '</li>';
          }).join('') + '</ul>';
      };
      clients.innerHTML = '<div class="marquee__track">' + lane(false) + lane(true) + '</div>';
    }

    var steps = document.getElementById('steps');
    if (steps && window.PROCESS) {
      steps.innerHTML = PROCESS.map(function (t, i) {
        return '<li class="step reveal" style="--d:' + i + '">' +
          '<span class="step__no">' + escapeHtml(t.no) + '</span>' +
          '<h3>' + escapeHtml(t.name) + '</h3>' +
          '<p>' + escapeHtml(t.line) + '</p></li>';
      }).join('');
      mountReveals(steps);
    }

    var kit = document.getElementById('kit');
    if (kit && window.TOOLKIT) {
      kit.innerHTML = TOOLKIT.map(function (t, i) {
        return '<div class="kit__item reveal" style="--d:' + (i % 4) + '">' +
          '<b>' + escapeHtml(t.name) + '</b>' +
          '<span>' + escapeHtml(t.note) + '</span></div>';
      }).join('');
      mountReveals(kit);
    }

    /* Life outside work: photographs and written notes in one collage,
       in the order data.js lists them. Skipped entirely while empty. */
    var life = document.getElementById('life');
    if (life && window.LIFE && LIFE.length) {
      /* unhide before painting: the collage measures its tiles, and a
         hidden section has no width to measure them against */
      life.closest('[data-life]').hidden = false;
      paintLife(life);

      /* the column count changes with the breakpoint, so rebuild on resize */
      var lifeW = window.innerWidth, lifeT;
      window.addEventListener('resize', function () {
        if (Math.abs(window.innerWidth - lifeW) < 40) return;
        lifeW = window.innerWidth;
        clearTimeout(lifeT);
        lifeT = setTimeout(function () { paintLife(life); }, 160);
      }, { passive: true });
    }

    /* Things that are also true: one photograph per fact. */
    var trues = document.getElementById('trues');
    if (trues && window.TRUES) {
      trues.innerHTML = TRUES.map(function (t, i) {
        var d = (window.IMG_SIZES || {})[t.photo] || [];
        return '<li class="true reveal" style="--d:' + (i % 3) + '">' +
          '<img src="' + t.photo + '"' +
          (d.length ? ' width="' + d[0] + '" height="' + d[1] + '"' : '') +
          ' alt="' + escapeHtml(t.alt || '') + '" loading="lazy" decoding="async">' +
          '<p class="true__line">' +
            '<span data-doodle="check" data-size="xs"></span>' +
            '<span>' + escapeHtml(t.fact) + '</span>' +
          '</p>' +
        '</li>';
      }).join('');
      Crayon.paint(trues);
      mountReveals(trues);
    }

    var tools = document.getElementById('tools');
    if (tools && window.TOOLS) {
      tools.innerHTML = '<b>Tools</b>' + TOOLS.map(function (t) {
        return '<span>' + escapeHtml(t) + '</span>';
      }).join('');
    }
  });
})();

/* ---------------------------------------------------------
   the Life collage

   Tiles are dealt into real columns rather than left to CSS multicol.
   Multicol balances on content and routinely left the last column
   short, which is what made the right of the grid trail off into
   nothing. Here the tiles are measured first, then split so that the
   tallest column is as short as it can be, and the CSS lets the last
   tile in each column absorb whatever slack is left. Because the split
   is already close to even, that slack is small, and all three columns
   finish on one line.
   --------------------------------------------------------- */

function lifeColumns() {
  var w = window.innerWidth;
  return w <= 560 ? 1 : w <= 900 ? 2 : 3;
}

function lifeTile(t, i) {
  var d = (window.IMG_SIZES || {})[t.photo] || [];
  if (t.photo) {
    /* the ratio on the figure is what the column grows from */
    return '<figure class="life__shot reveal" style="--d:' + (i % 4) +
      (d.length ? ';aspect-ratio:' + d[0] + '/' + d[1] : '') + '">' +
      '<img src="' + t.photo + '"' +
      (d.length ? ' width="' + d[0] + '" height="' + d[1] + '"' : '') +
      ' alt="' + escapeHtml(t.alt || '') + '" loading="lazy" decoding="async">' +
    '</figure>';
  }
  return '<div class="life__note reveal" style="--d:' + (i % 4) + '">' +
    '<h3>' + escapeHtml(t.note) + '</h3>' +
    '<p>' + escapeHtml(t.body || '') + '</p>' +
  '</div>';
}

/* Can the run be laid out in `cols` columns with none taller than `cap`?
   Walks in order, so the tiles keep the sequence they were written in. */
function lifeFits(heights, cols, gap, cap) {
  var used = 1, run = 0;
  for (var i = 0; i < heights.length; i++) {
    if (heights[i] > cap) return null;
    var add = run ? gap + heights[i] : heights[i];
    if (run + add > cap) { used++; run = heights[i]; if (used > cols) return null; }
    else run += add;
  }
  return true;
}

function lifeSplit(heights, cols, gap) {
  var lo = 0, hi = 0, i;
  for (i = 0; i < heights.length; i++) { hi += heights[i] + gap; lo = Math.max(lo, heights[i]); }
  while (lo < hi) {                                   /* smallest workable cap */
    var mid = Math.floor((lo + hi) / 2);
    if (lifeFits(heights, cols, gap, mid)) hi = mid; else lo = mid + 1;
  }

  var buckets = [[]], run = 0;
  for (i = 0; i < heights.length; i++) {
    var add = run ? gap + heights[i] : heights[i];
    var left = heights.length - i;
    /* break early if this tile would overflow, but never strand a column */
    if ((run + add > lo || left <= cols - buckets.length) && buckets.length < cols) {
      buckets.push([]); run = heights[i];
    } else run += add;
    buckets[buckets.length - 1].push(i);
  }
  while (buckets.length < cols) buckets.push([]);
  return buckets;
}

function paintLife(host) {
  var items = window.LIFE || [];
  if (!items.length) return;
  var cols = lifeColumns();
  var gap = parseFloat(getComputedStyle(host).gap) || 28;
  var colW = (host.clientWidth - gap * (cols - 1)) / cols;

  /* measure first: every image carries its own dimensions, so the tiles
     lay out at their true heights without waiting for the bytes */
  host.innerHTML = '<div class="life__col" style="flex:0 0 auto;width:' + colW + 'px">' +
    items.map(lifeTile).join('') + '</div>';
  var heights = [].map.call(host.firstChild.children, function (el) {
    return el.getBoundingClientRect().height;
  });

  var buckets = lifeSplit(heights, cols, gap);
  host.innerHTML = buckets.map(function (bucket) {
    return '<div class="life__col">' +
      bucket.map(function (idx) { return lifeTile(items[idx], idx); }).join('') +
    '</div>';
  }).join('');

  /* Reveal on the first build only. A rebuild after a resize is the same
     tiles in new places, and replaying the entrance there reads as a flash. */
  if (host.dataset.painted) {
    [].forEach.call(host.querySelectorAll('.reveal'), function (el) {
      el.classList.add('is-in');
    });
  } else {
    host.dataset.painted = '1';
    mountReveals(host);
  }
}
