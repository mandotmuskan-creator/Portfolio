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
      '"' + dims(P.cover) + ' alt="' + E(P.title + ' — ' + P.category) + '" decoding="async"></figure>';
  }

  /* ---------- the opening ---------- */

  function hero(i) {
    var lines = (P.hero || [P.title]).map(function (l) {
      return '<span class="ln">' + E(l) + '</span>';
    }).join('');

    var facts = [
      ['Client', P.client], ['Role', P.role],
      ['Tools', (P.tools || []).join(' · ')],
      ['Platform', P.platform], ['Year', P.year]
    ].filter(function (r) { return r[1]; });

    return '<section class="cshero">' +
      '<div class="wrap">' +
        '<div class="cshero__grid">' +
          '<div class="poster cshero__lead">' +
            '<p class="cshero__no">' + doodle('star-black', { size: 'xs' }) +
              '<span>PROJECT ' + String(i + 1).padStart(2, '0') + '</span></p>' +
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
          return '<li>' + doodle(i === 0 ? 'star-yellow' : 'check', { size: 'xs' }) +
            '<span>' + E(it) + '</span></li>';
        }).join('') + '</ul>' +
      '</section>';
    },

    quote: function (b) {
      return '<blockquote class="quote reveal">' +
        doodle('scribble-red', { cls: 'ca-float quote__mark', rot: -12 }) +
        '<p>' + E(b.text) + '</p></blockquote>';
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
      return '<figure class="blk reveal">' +
        '<div class="shot' + (b.frame === 'plain' ? ' shot--plain' : '') +
          (b.long ? ' shot--long' : '') + '">' +
          '<img src="' + b.src + '"' + dims(b.src) + ' alt="' + E(b.caption || '') + '" loading="lazy" decoding="async">' +
        '</div>' +
        (b.caption ? '<figcaption>' + E(b.caption) + '</figcaption>' : '') +
      '</figure>';
    },

    duo: function (b) {
      return '<section class="blk duo reveal">' + (b.items || []).map(function (it) {
        return '<figure><div class="shot' + (b.long ? ' shot--long' : '') + '">' +
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

    mocks: function (b) {
      return '<section class="blk duo reveal">' + (b.items || []).map(function (it) {
        return '<figure><div class="shot shot--mock">' + it.html + '</div>' +
          '<figcaption>' + E(it.caption || '') + '</figcaption></figure>';
      }).join('') + '</section>';
    }
  };

  function body() {
    var intro = (P.intro || []).length
      ? BLOCK.text({ title: 'Context', body: P.intro, note: P.introNote, noteArt: 'arrow-loop-warm' })
      : '';
    return '<div class="wrap cs">' + intro +
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
            doodle('arrow-red') + '</p>' +
        '</a>' +
      '</div>' +
    '</section>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var main = document.getElementById('main');
    if (!main) return;

    document.title = P.title + ' — ' + SITE.name;
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
