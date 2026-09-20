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

      /* The roll starts on .is-in, which the shared reveal observer adds
         when the wall comes into view, so the roster begins at its first
         name for whoever is reading rather than wherever it had drifted
         to while the page sat above the fold. Without .reveal there is
         no observer watching, so start it straight away. */
      if (!clients.classList.contains('reveal')) clients.classList.add('is-in');
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

/* The split.

   Two things are being balanced. Columns have to finish on the same
   line, and a note must not sit shoulder to shoulder with a note in the
   column beside it: two beige boxes at the same height read as a band
   of text running through the middle of the collage, which is not what
   this is. Notes belong against photographs.

   Cut points alone cannot always manage both, so a note is also allowed
   to move a slot or two along the run. It still sits among the same
   pictures, just on the other side of one of them.
   --------------------------------------------------------- */

function lifeRanges(cuts, n) {
  var out = [], prev = 0, i;
  for (i = 0; i < cuts.length; i++) { out.push([prev, cuts[i]]); prev = cuts[i]; }
  out.push([prev, n]);
  return out;
}

/* For one arrangement and one set of cuts: how tall the tallest column
   has to be, how far the other columns' gaps must open to match it, and
   how many notes end up alongside a note in the next column. */
function lifeScore(heights, isNote, cuts, gap) {
  var n = heights.length, spans = lifeRanges(cuts, n), tall = 0, i, k;

  var cols = spans.map(function (sp) {
    var h = 0;
    for (i = sp[0]; i < sp[1]; i++) h += heights[i];
    h += gap * Math.max(0, sp[1] - sp[0] - 1);
    if (h > tall) tall = h;
    return { span: sp, h: h };
  });

  var open = 0, stack = 0;
  var notes = cols.map(function (c) {
    var count = c.span[1] - c.span[0];
    var extra = count > 1 ? (tall - c.h) / (count - 1) : (tall - c.h);
    open = Math.max(open, extra);
    var y = 0, band = [];
    for (i = c.span[0]; i < c.span[1]; i++) {
      if (isNote[i]) {
        band.push([y, y + heights[i]]);
        if (i > c.span[0] && isNote[i - 1]) stack++;   /* two notes in a row */
      }
      y += heights[i] + gap + extra;
    }
    return band;
  });

  var clash = 0, TOL = 28;      /* a sliver of overlap is not a collision */
  for (k = 0; k + 1 < notes.length; k++) {
    for (i = 0; i < notes[k].length; i++) {
      for (var j = 0; j < notes[k + 1].length; j++) {
        var a = notes[k][i], b = notes[k + 1][j];
        if (Math.min(a[1], b[1]) - Math.max(a[0], b[0]) > TOL) clash += 2;
      }
    }
  }
  return { tall: tall, open: open, clash: clash + stack };
}

function lifeRank(a, b) {
  return (a.clash - b.clash) || (a.open - b.open) || (a.tall - b.tall);
}

/* Best cuts for one arrangement, with a ceiling on how far the gaps may
   open. Null when nothing comes in under the ceiling: an arrangement
   that can only be laid out with a column drifting apart is not one
   worth having, whatever it does for the notes. */
function lifeBestCuts(heights, isNote, cols, gap, cap) {
  var n = heights.length, tries = [], i, j;
  if (cols === 2) { for (i = 1; i < n; i++) tries.push([i]); }
  else { for (i = 1; i < n - 1; i++) for (j = i + 1; j < n; j++) tries.push([i, j]); }

  var best = null;
  for (i = 0; i < tries.length; i++) {
    var sc = lifeScore(heights, isNote, tries[i], gap);
    if (sc.open > cap) continue;
    if (!best || lifeRank(sc, best.s) < 0) best = { cuts: tries[i], s: sc };
  }
  return best;
}

/* Every way one note could move up to two slots along the run. */
function lifeNudges(order, isNote) {
  var out = [], shifts = [-2, -1, 1, 2], p, k, q, o, moved;
  for (p = 0; p < order.length; p++) {
    if (!isNote[order[p]]) continue;
    for (k = 0; k < shifts.length; k++) {
      q = p + shifts[k];
      if (q < 0 || q >= order.length) continue;
      o = order.slice();
      moved = o.splice(p, 1)[0];
      o.splice(q, 0, moved);
      out.push(o);
    }
  }
  return out;
}

function lifeSplit(heights, isNote, cols, gap) {
  var n = heights.length, i;
  if (cols <= 1 || n <= cols) {
    var flat = [];
    for (i = 0; i < Math.max(cols, 1); i++) flat.push([]);
    for (i = 0; i < n; i++) flat[Math.min(i, flat.length - 1)].push(i);
    return flat;
  }

  var order = [];
  for (i = 0; i < n; i++) order.push(i);

  var OPEN_MAX = 46;                 /* how far a gap may open, in pixels */
  var weigh = function (o, cap) {
    var r = lifeBestCuts(o.map(function (x) { return heights[x]; }),
                         o.map(function (x) { return isNote[x]; }), cols, gap, cap);
    if (r) r.order = o;
    return r;
  };

  /* the authored order, laid out as tightly as it can be */
  var best = weigh(order, OPEN_MAX) || weigh(order, 90) || weigh(order, Infinity);
  /* two rounds of single nudges: enough to clear the collisions the
     authored order leaves behind, and it stops the moment it is clean */
  /* Nudge while there is still something to fix: notes touching, or a
     column whose gaps had to open further than they should. */
  for (var round = 0;
       round < 4 && (best.s.clash > 0 || best.s.open > OPEN_MAX);
       round++) {
    var pool = lifeNudges(best.order, isNote), moved = best;
    for (i = 0; i < pool.length; i++) {
      var cand = weigh(pool[i], OPEN_MAX);
      if (cand && lifeRank(cand.s, moved.s) < 0) moved = cand;
    }
    if (moved === best) break;                 /* nothing left to gain */
    best = moved;
  }

  return lifeRanges(best.cuts, n).map(function (sp) {
    var out = [];
    for (var x = sp[0]; x < sp[1]; x++) out.push(best.order[x]);
    return out;
  });
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
  var isNote = items.map(function (t) { return !t.photo; });

  var buckets = lifeSplit(heights, isNote, cols, gap);
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
