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

  function row(p, i) {
    var n = String(i + 1).padStart(2, '0');
    return '<article class="proj reveal">' +
      '<div class="proj__media">' +
        coverMarkup(p, p.title + ', ' + p.category, 'proj__shot') +
      '</div>' +
      '<div class="proj__body">' +
        '<p class="proj__no">PROJECT ' + n + '</p>' +
        '<h3 class="proj__title">' + (p.wip
          ? escapeHtml(p.title)
          : '<a class="stretch" href="' + projectHref(p) + '">' + escapeHtml(p.title) + '</a>') +
        '</h3>' +
        '<p class="proj__line">' + escapeHtml(p.tagline) + '</p>' +
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

    var clients = document.getElementById('clients');
    if (clients && window.CLIENTS) {
      clients.innerHTML = CLIENTS.map(function (c) {
        var w = c.w ? ' style="--w:' + c.w + 'px"' : '';
        return '<li class="client"' + w + '>' + (c.logo
          ? '<img src="' + c.logo + '" alt="' + escapeHtml(c.name) + '" loading="lazy" decoding="async">'
          : '<span class="client__name">' + escapeHtml(c.name) + '</span>') + '</li>';
      }).join('');
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

    /* the photographs under Life outside work, skipped entirely while
       none are listed */
    var gal = document.getElementById('gallery');
    if (gal && window.GALLERY && GALLERY.length) {
      var shots = GALLERY.filter(function (g) { return !g.bio; });
      gal.innerHTML = shots.map(function (g, i) {
        var d = (window.IMG_SIZES || {})[g.src] || [];
        return '<figure class="shotcard reveal" style="--d:' + (i % 4) + '">' +
          '<img src="' + g.src + '"' +
          (d.length ? ' width="' + d[0] + '" height="' + d[1] + '"' : '') +
          ' alt="' + escapeHtml(g.alt || '') + '" loading="lazy" decoding="async">' +
          (g.caption ? '<figcaption>' + escapeHtml(g.caption) + '</figcaption>' : '') +
          '</figure>';
      }).join('');
      gal.closest('[data-gallery]').hidden = false;
      mountReveals(gal);
    }

    var tools = document.getElementById('tools');
    if (tools && window.TOOLS) {
      tools.innerHTML = '<b>Tools</b>' + TOOLS.map(function (t) {
        return '<span>' + escapeHtml(t) + '</span>';
      }).join('');
    }
  });
})();
