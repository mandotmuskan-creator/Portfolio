/* =========================================================
   home.js — Selected Work rows and the toolkit composition.

   The decoration around each project deliberately differs:
   the system is shared, the composition is not.
   ========================================================= */

(function () {
  'use strict';

  var DECOR = [
    /* project 1 — an arrow into the UI, the character beside the title */
    function () {
      return '<div class="proj__art" aria-hidden="true">' +
        doodle('arrow-red',  { cls: 'ca-float proj-arrow', rot: -12 }) +
        '<img class="ca ca-float proj-face stamp" src="assets/img/face/thinking.webp" alt="" aria-hidden="true" loading="lazy" style="--rot:8deg;transform:rotate(8deg)">' +
        '</div>';
    },
    /* project 2 — an arrow back toward the copy, a flower at the edge */
    function () {
      return '<div class="proj__art" aria-hidden="true">' +
        doodle('arrow-blue', { cls: 'ca-float proj-arrow', rot: 168 }) +
        crayon('flower',     { cls: 'ca-float proj-flower', rot: -14 }) +
        '</div>';
    },
    /* project 3 onwards — one quiet arrow, nothing else */
    function () {
      return '<div class="proj__art" aria-hidden="true">' +
        doodle('arrow-loop', { cls: 'ca-float proj-arrow', rot: -4 }) +
        '</div>';
    }
  ];

  var NUM_STAR = ['star-black', 'star-yellow', 'star-solid'];

  function metaRow(p) {
    var rows = [
      ['Role', p.role],
      ['Tools', (p.tools || []).join(' · ')],
      ['Year', p.year],
      ['Platform', p.platform]
    ].filter(function (r) { return r[1]; });

    return '<dl class="meta">' + rows.map(function (r) {
      return '<div><dt>' + escapeHtml(r[0]) + '</dt><dd>' + escapeHtml(r[1]) + '</dd></div>';
    }).join('') + '</dl>';
  }

  function row(p, i) {
    var n = String(i + 1).padStart(2, '0');
    var slot = ['a', 'b', 'c'][Math.min(i, 2)];
    return '<article class="proj proj--' + slot + ' reveal">' +
      DECOR[Math.min(i, DECOR.length - 1)]() +
      '<div class="proj__media">' +
        coverMarkup(p, p.title + ' — ' + p.category, 'proj__shot') +
      '</div>' +
      '<div class="proj__body">' +
        '<p class="proj__no">' + doodle(NUM_STAR[i % 3], { size: 'xs' }) +
          '<span>PROJECT ' + n + '</span></p>' +
        '<h3 class="proj__title"><a class="stretch" href="' + projectHref(p) + '">' +
          markWord(p.title, { art: i % 2 ? 'underline-blue' : 'underline-red' }) + '</a></h3>' +
        '<p class="proj__line">' + escapeHtml(p.tagline) + '</p>' +
        metaRow(p) +
        '<p class="proj__cta"><span class="btn btn--ghost" aria-hidden="true">' +
          'Read the case study</span></p>' +
      '</div>' +
    '</article>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var host = document.getElementById('projects');
    if (host) {
      host.innerHTML = PROJECTS.map(row).join('');
      mountReveals(host);
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

    var tools = document.getElementById('tools');
    if (tools && window.TOOLS) {
      tools.innerHTML = '<b>Tools</b>' + TOOLS.map(function (t) {
        return '<span>' + escapeHtml(t) + '</span>';
      }).join('');
    }
  });
})();
