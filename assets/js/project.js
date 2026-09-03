/* =========================================================
   project.js — the case-study template.

   One expressive opening built from the project's `hero`
   lines, then the `sections` array rendered block by block
   into a quiet, readable editorial layout.
   ========================================================= */

(function () {
  'use strict';

  var q = new URLSearchParams(location.search).get('p');
  var idx = PROJECTS.findIndex(function (p) { return p.slug === q; });
  var P = PROJECTS[idx > -1 ? idx : 0];
  var NEXT = PROJECTS[((idx > -1 ? idx : 0) + 1) % PROJECTS.length];

  var E = escapeHtml;

  /* width/height from the generated manifest, so a lazy screenshot holds its
     place in the layout before it loads. */
  function dims(src) {
    var d = (window.IMG_SIZES || {})[src];
    return d ? ' width="' + d[0] + '" height="' + d[1] + '"' : '';
  }

  /* The opening visual: a screenshot when there is one, otherwise the
     screen rebuilt in markup. */
  function coverArt() {
    if (P.coverMock) {
      return '<figure class="cshero__cover shot--mock reveal" style="--d:3">' + P.coverMock + '</figure>';
    }
    if (!P.cover) return '';
    return '<figure class="cshero__cover reveal" style="--d:3"><img src="' + P.cover +
      '"' + dims(P.cover) + ' alt="' + E(P.title + ', ' + P.category) + '" decoding="async"></figure>';
  }

  /* No screenshot is ever drawn larger than the file behind it, which is
     what was pixelating the phone screens. Phone artwork is capped at a
     phone's own width: it was exported at 2x, so drawing it at 390 gives a
     retina screen a true 2x image and everyone else a phone-sized phone. */
  var PHONE_CAP = 390;
  function capWidth(src, device) {
    var d = (window.IMG_SIZES || {})[src];
    var natural = d ? d[0] : 0;
    if (device === 'mobile') return Math.min(PHONE_CAP, natural || PHONE_CAP);
    return natural || 0;
  }
  function capStyle(src, device) {
    var w = capWidth(src, device);
    return w ? ' style="--shotw:' + w + 'px"' : '';
  }

  /* Two screens side by side get columns in proportion to the artwork, so a
     phone next to a desktop reads as a phone rather than as an equal half. */
  function duoCols(items) {
    var ws = items.map(function (it) { return capWidth(it.src, it.device); });
    if (ws.length !== 2 || ws.some(function (w) { return !w; })) return '';
    return ' style="--cols:' + ws[0] + 'fr ' + ws[1] + 'fr"';
  }

  /* A tall screenshot sits in a scroll box. That box has to be reachable
     from the keyboard, or everything below the fold of it is mouse-only. */
  function scrollable(isLong, label) {
    if (!isLong) return '';
    return ' tabindex="0" role="group" aria-label="' +
      E((label || 'Screenshot') + ', scrollable') + '"';
  }

  /* ---------- the opening ---------- */

  function hero(i) {
    var lines = (P.hero || [P.title]).map(function (l) {
      return '<span class="ln">' + E(l) + '</span>';
    }).join('');

    var facts = [
      ['Client', P.client], ['Role', P.role],
      ['Team', P.team], ['Duration', P.duration],
      ['Tools', (P.tools || []).join(' · ')],
      ['Platform', P.platform], ['Year', P.year]
    ].filter(function (r) { return r[1]; });

    return '<section class="cshero">' +
      '<div class="wrap">' +
        '<div class="cshero__grid">' +
          '<div class="poster cshero__lead">' +
            '<p class="cshero__no">PROJECT ' + String(i + 1).padStart(2, '0') + '</p>' +
            '<h1 class="ct poster__word cshero__title reveal">' + lines + '</h1>' +
          '</div>' +
          '<div class="cshero__side reveal" style="--d:1">' +
            '<img class="cshero__face" src="assets/img/face/' + (P.faceCue || 'thinking') + '.webp"' +
              ' alt="" aria-hidden="true" decoding="async" style="--face-rot:6deg">' +
            '<p class="cshero__line">' + E(P.tagline) + '</p>' +
          '</div>' +
        '</div>' +

        '<div class="cshero__grid" style="margin-top:var(--s-6);align-items:start">' +
          '<dl class="cshero__facts reveal" style="--d:2">' + facts.map(function (r) {
            return '<div><dt>' + E(r[0]) + '</dt><dd>' + E(r[1]) + '</dd></div>';
          }).join('') + '</dl>' +
          (P.roleNote
            ? '<div class="reveal" style="--d:3">' +
              handNote(P.roleNote, { art: 'arrow-loop-warm', artRot: -6, tone: 'ink' }) + '</div>'
            : '<div></div>') +
        '</div>' +

        coverArt() +
      '</div>' +
    '</section>';
  }

  /* ---------- body blocks ---------- */

  var BLOCK = {
    text: function (b) {
      var noted = !!b.note;
      return '<section class="blk' + (noted ? ' blk--noted' : '') + ' reveal">' +
        '<div>' +
          (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
          '<div class="blk__body">' + (b.body || []).map(function (p) {
            return '<p>' + E(p) + '</p>';
          }).join('') + '</div>' +
        '</div>' +
        (noted ? handNote(b.note, { art: b.noteArt || 'arrow-loop', artRot: -8 }) : '') +
      '</section>';
    },

    points: function (b) {
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        '<ul class="points">' + (b.items || []).map(function (it, i) {
          return '<li>' + doodle('check', { size: 'xs' }) +
            '<span>' + E(it) + '</span></li>';
        }).join('') + '</ul>' +
      '</section>';
    },

    quote: function (b) {
      return '<blockquote class="quote reveal"><p>' + E(b.text) + '</p></blockquote>';
    },

    stats: function (b) {
      return '<section class="stats reveal">' + (b.items || []).map(function (s) {
        return '<div><b>' + E(s.figure) + '</b><span>' + E(s.label) + '</span></div>';
      }).join('') + '</section>';
    },

    split: function (b) {
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        '<div class="split">' + (b.items || []).map(function (it) {
          return '<div><h3>' + E(it.head) + '</h3><p>' + E(it.body) + '</p></div>';
        }).join('') + '</div>' +
      '</section>';
    },

    journey: function (b) {
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        (b.note ? '<p class="cap" style="margin-top:.7em;max-width:60ch">' + E(b.note) + '</p>' : '') +
        '<div class="journey">' + (b.stages || []).map(function (s) {
          return '<div class="jrow"><h3>' + E(s.phase) + '</h3>' +
            '<dl><dt>Doing</dt><dd>' + E(s.doing) + '</dd></dl>' +
            '<dl><dt>Feeling</dt><dd>' + E(s.feeling) + '</dd></dl>' +
            '<dl><dt>What the design does</dt><dd>' + E(s.move) + '</dd></dl>' +
          '</div>';
        }).join('') + '</div>' +
      '</section>';
    },

    flow: function (b) {
      var steps = b.steps || [];
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        (b.note ? '<p class="cap" style="margin-top:.7em;max-width:60ch">' + E(b.note) + '</p>' : '') +
        '<div class="flow">' + steps.map(function (s, i) {
          return '<div class="flow__step' + (s.optional ? ' flow__step--opt' : '') + '">' +
              '<b>' + E(s.label) + '</b><span>' + E(s.sub) + '</span></div>' +
            (i < steps.length - 1 ? doodle('arrow-red', { cls: 'flow__arrow' }) : '');
        }).join('') + '</div>' +
      '</section>';
    },

    full: function (b) {
      return '<figure class="blk' + (b.device === 'mobile' ? ' blk--phone' : '') + ' reveal">' +
        '<div class="shot' + (b.frame === 'plain' ? ' shot--plain' : '') +
          (b.long ? ' shot--long' : '') + '"' + capStyle(b.src, b.device) +
          scrollable(b.long, b.caption) + '>' +
          '<img src="' + b.src + '"' + dims(b.src) + ' alt="' + E(b.caption || '') + '" loading="lazy" decoding="async">' +
        '</div>' +
        (b.caption ? '<figcaption>' + E(b.caption) + '</figcaption>' : '') +
      '</figure>';
    },

    duo: function (b) {
      return '<section class="blk duo reveal"' + duoCols(b.items || []) + '>' +
        (b.items || []).map(function (it) {
        return '<figure><div class="shot' + (b.long ? ' shot--long' : '') + '"' +
          capStyle(it.src, it.device) + scrollable(b.long, it.caption) + '>' +
          '<img src="' + it.src + '"' + dims(it.src) + ' alt="' + E(it.caption || '') + '" loading="lazy" decoding="async">' +
          '</div><figcaption>' + E(it.caption || '') + '</figcaption></figure>';
      }).join('') + '</section>';
    },

    phones: function (b) {
      return '<section class="blk phones reveal">' + (b.items || []).map(function (it) {
        return '<figure class="phone"><div class="phone__frame">' +
          '<img src="' + it.src + '"' + dims(it.src) + ' alt="' + E(it.caption || '') + '" loading="lazy" decoding="async">' +
          '</div><figcaption>' + E(it.caption || '') + '</figcaption></figure>';
      }).join('') + '</section>';
    },

    mock: function (b) {
      var mobile = b.device === 'mobile';
      return '<figure class="blk reveal">' +
        (mobile
          ? '<div class="phones"><div class="phone"><div class="phone__frame phone__frame--mock">' + b.html + '</div></div></div>'
          : '<div class="shot shot--mock">' + b.html + '</div>') +
        (b.caption ? '<figcaption>' + E(b.caption) + '</figcaption>' : '') +
      '</figure>';
    },

    /* Research: what we did, and what it turned up. */
    method: function (b) {
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        (b.note ? '<p class="blk__note">' + E(b.note) + '</p>' : '') +
        '<ol class="method">' + (b.items || []).map(function (it, i) {
          return '<li class="method__step">' +
            '<span class="method__n">' + String(i + 1).padStart(2, '0') + '</span>' +
            '<div><h3>' + E(it.head) + '</h3><p>' + E(it.body) + '</p>' +
            (it.found ? '<p class="method__found"><b>What it turned up</b> ' + E(it.found) + '</p>' : '') +
            '</div></li>';
        }).join('') + '</ol>' +
      '</section>';
    },

    /* Personas. One card each: who they are, what they need, what
       stopped them, and the thing in the design that answers it. */
    personas: function (b) {
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        (b.note ? '<p class="blk__note">' + E(b.note) + '</p>' : '') +
        '<div class="personas">' + (b.items || []).map(function (p) {
          return '<article class="persona">' +
            '<header class="persona__head">' +
              '<span class="persona__tag">' + E(p.tag) + '</span>' +
              '<h3 class="persona__name">' + E(p.name) + '</h3>' +
              '<p class="persona__who">' + E(p.who) + '</p>' +
            '</header>' +
            '<dl class="persona__rows">' +
              '<div><dt>Goal</dt><dd>' + E(p.goal) + '</dd></div>' +
              '<div><dt>Frustration</dt><dd>' + E(p.pain) + '</dd></div>' +
              '<div class="persona__ans"><dt>What the redesign gives them</dt><dd>' + E(p.answer) + '</dd></div>' +
            '</dl>' +
            (p.quote ? '<p class="persona__quote">\u201C' + E(p.quote) + '\u201D</p>' : '') +
          '</article>';
        }).join('') + '</div>' +
      '</section>';
    },

    /* The palette, drawn as live swatches rather than a screenshot of
       one, so it stays sharp and the hex values can be selected. */
    swatches: function (b) {
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        (b.note ? '<p class="blk__note">' + E(b.note) + '</p>' : '') +
        (b.groups || []).map(function (g) {
          return '<div class="swgroup">' +
            '<h3 class="swgroup__name">' + E(g.name) + '</h3>' +
            (g.use ? '<p class="swgroup__use">' + E(g.use) + '</p>' : '') +
            '<ul class="swatches">' + (g.items || []).map(function (c) {
              return '<li class="sw' + (c.line ? ' sw--line' : '') + '" style="--c:' + c.hex + '">' +
                '<span class="sw__chip"></span>' +
                '<span class="sw__name">' + E(c.name) + '</span>' +
                '<span class="sw__hex">' + E(c.hex) + '</span>' +
              '</li>';
            }).join('') + '</ul>' +
          '</div>';
        }).join('') +
      '</section>';
    },

    /* The type scale, set in the sizes it actually shipped at. */
    typescale: function (b) {
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        (b.note ? '<p class="blk__note">' + E(b.note) + '</p>' : '') +
        '<div class="tscale">' + (b.items || []).map(function (t) {
          return '<div class="tsrow">' +
            '<p class="tsrow__spec"><b>' + E(t.role) + '</b>' +
              '<span>' + E(t.spec) + '</span></p>' +
            '<p class="tsrow__demo" style="font-size:' + t.px + 'px;font-weight:' + (t.weight || 400) +
              ';line-height:' + (t.lh || 1.2) + '">' + E(t.sample) + '</p>' +
          '</div>';
        }).join('') + '</div>' +
      '</section>';
    },

    /* Site structure, as a plain nested list. */
    ia: function (b) {
      function branch(nodes) {
        return '<ul class="ia__list">' + nodes.map(function (n) {
          return '<li class="ia__node' + (n.kids ? '' : ' ia__node--leaf') + '">' +
            '<span class="ia__label">' + E(n.label) + '</span>' +
            (n.note ? '<span class="ia__note">' + E(n.note) + '</span>' : '') +
            (n.kids ? branch(n.kids) : '') +
          '</li>';
        }).join('') + '</ul>';
      }
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        (b.note ? '<p class="blk__note">' + E(b.note) + '</p>' : '') +
        '<div class="ia">' + branch(b.nodes || []) + '</div>' +
      '</section>';
    },

    /* Two things set against each other: before and after, old and new. */
    versus: function (b) {
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        (b.note ? '<p class="blk__note">' + E(b.note) + '</p>' : '') +
        '<div class="versus">' + (b.rows || []).map(function (r) {
          return '<div class="vrow">' +
            '<p class="vrow__q">' + E(r.issue) + '</p>' +
            '<p class="vrow__a">' + E(r.fix) + '</p>' +
          '</div>';
        }).join('') + '</div>' +
      '</section>';
    },

    /* Small boards, several to a row. Design-system sheets are screenshots
       of a working file: shown large they magnify their own softness, so
       they run three-up and every one lands well under its own width. */
    grid: function (b) {
      return '<section class="blk reveal">' +
        (b.title ? '<h2 class="blk__title">' + E(b.title) + '</h2>' : '') +
        (b.note ? '<p class="blk__note">' + E(b.note) + '</p>' : '') +
        '<div class="gridshots">' + (b.items || []).map(function (it) {
          return '<figure class="gridshot' + (it.span ? ' gridshot--span' : '') + '">' +
            '<div class="shot shot--tile"' + capStyle(it.src, it.device) +
              scrollable(true, it.caption) + '>' +
              '<img src="' + it.src + '"' + dims(it.src) + ' alt="' + E(it.caption || '') +
                '" loading="lazy" decoding="async">' +
            '</div>' +
            '<figcaption>' + E(it.caption || '') + '</figcaption>' +
          '</figure>';
        }).join('') + '</div>' +
      '</section>';
    },

    /* A closing link out to the thing that shipped. */
    live: function (b) {
      return '<section class="blk live reveal">' +
        '<p class="live__eyebrow">' + E(b.eyebrow || 'Live site') + '</p>' +
        '<h2 class="live__title">' + E(b.title) + '</h2>' +
        (b.body ? '<p class="live__body">' + E(b.body) + '</p>' : '') +
        '<a class="btn btn--ghost live__btn" href="' + b.href + '" target="_blank" rel="noopener noreferrer">' +
          E(b.label || 'Visit the site') + '</a>' +
        '<p class="live__url">' + E(b.href.replace(/^https?:\/\//, '')) + '</p>' +
      '</section>';
    },

    mocks: function (b) {
      return '<section class="blk duo reveal">' + (b.items || []).map(function (it) {
        return '<figure><div class="shot shot--mock">' + it.html + '</div>' +
          '<figcaption>' + E(it.caption || '') + '</figcaption></figure>';
      }).join('') + '</section>';
    }
  };

  /* Who was on it, and which part was mine. */
  function roleBlock() {
    if (!P.roleNote && !P.teamNote) return '';
    var rows = [
      ['My role', P.roleNote],
      ['The team', P.teamNote ? (P.team ? P.team + '. ' : '') + P.teamNote : ''],
      ['Duration', P.duration]
    ].filter(function (r) { return r[1]; });

    return '<section class="blk reveal">' +
      '<h2 class="blk__title">My role and the team</h2>' +
      '<dl class="rolegrid">' + rows.map(function (r) {
        return '<div><dt>' + E(r[0]) + '</dt><dd>' + E(r[1]) + '</dd></div>';
      }).join('') + '</dl>' +
    '</section>';
  }

  function body() {
    var intro = (P.intro || []).length
      ? BLOCK.text({ title: 'Context', body: P.intro, note: P.introNote, noteArt: 'arrow-loop-warm' })
      : '';
    return '<div class="wrap cs">' + intro + roleBlock() +
      (P.sections || []).map(function (b) {
        return (BLOCK[b.kind] || function () { return ''; })(b);
      }).join('') + '</div>';
  }

  function nextup() {
    return '<section class="nextup">' +
      '<div class="wrap">' +
        '<p class="eyebrow">Next project</p>' +
        '<a href="' + projectHref(NEXT) + '">' +
          '<h2 class="ct ct--lg nextup__title">' + E(NEXT.title) + '</h2>' +
          '<p class="nextup__row"><span class="lede" style="margin:0">' + E(NEXT.category) + '</span>' +
            '<span class="nextup__arrow" aria-hidden="true">\u2192</span></p>' +
        '</a>' +
      '</div>' +
    '</section>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var main = document.getElementById('main');
    if (!main) return;

    document.title = P.title + ' · ' + SITE.name;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', P.tagline);

    main.innerHTML = hero(idx > -1 ? idx : 0) + body() + nextup();
    Crayon.paint(main);
    Crayon.fitWords(main);
    mountReveals(main);

    /* reading progress */
    var barEl = document.getElementById('csProgress');
    if (barEl) {
      var tick = function () {
        var h = document.documentElement.scrollHeight - innerHeight;
        barEl.style.width = (h > 0 ? Math.min(1, scrollY / h) * 100 : 0).toFixed(2) + '%';
      };
      addEventListener('scroll', tick, { passive: true });
      addEventListener('resize', tick);
      tick();
    }
  });
})();
