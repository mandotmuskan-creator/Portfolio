/* =========================================================
   common.js — chrome shared by every page.
   nav · closing panel · scroll reveals · small helpers
   ========================================================= */

var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

var SITE = {
  name: 'Muskan Mandot',
  role: 'Product Design / UI',
  mail: 'mandotmuskan@gmail.com'
};

function escapeHtml(s) { return Crayon.esc(s); }
function projectHref(p) { return 'project.html?p=' + encodeURIComponent(p.slug); }

/* A project cover is either a screenshot or a screen rebuilt in markup.
   Both the home rows and the work grid want the same choice made once. */
function coverMarkup(p, alt, cls) {
  cls = cls || 'tile__shot';
  if (p.coverMock) return '<div class="' + cls + ' ' + cls + '--mock">' + p.coverMock + '</div>';
  var fit = p.coverFit === 'top' ? 'center top' : 'center';
  var d = (window.IMG_SIZES || {})[p.cover];
  return '<div class="' + cls + '"><img src="' + p.cover + '"' +
    (d ? ' width="' + d[0] + '" height="' + d[1] + '"' : '') +
    ' alt="' + escapeHtml(alt) + '" style="object-position:' + fit +
    '" loading="lazy" decoding="async"></div>';
}

/* ---------------------------------------------------------
   nav + closing panel
   --------------------------------------------------------- */

function mountChrome() {
  var here = document.body.dataset.page || '';
  var mark = function (art) {
    return '<img src="assets/img/doodle/' + art + '.webp" alt="" aria-hidden="true" loading="lazy" decoding="async">';
  };

  var navHost = document.querySelector('[data-nav]');
  if (navHost) {
    var link = function (href, label, key, art) {
      return '<a href="' + href + '"' + (key === here ? ' aria-current="page"' : '') + '>' +
        label + mark(art) + '</a>';
    };
    navHost.className = 'nav';
    navHost.innerHTML =
      '<a class="nav__mark" href="index.html">' +
        '<img class="stamp" src="assets/img/face/neutral.webp" alt="" aria-hidden="true" decoding="async">' +
        '<span>' + SITE.name + '</span>' +
        '<span class="sr">— home</span>' +
      '</a>' +
      '<nav class="nav__links" aria-label="Primary">' +
        link('work.html',  'Work',    'work',  'underline-red') +
        link('about.html', 'About',   'about', 'underline-blue') +
        link('play.html',  'Play',    'play',  'underline-red-bold') +
        link('mailto:' + SITE.mail, 'Contact', 'contact', 'underline-red') +
      '</nav>';

    var stick = function () { navHost.classList.toggle('is-stuck', window.scrollY > 40); };
    window.addEventListener('scroll', stick, { passive: true });
    stick();
  }

  var footHost = document.querySelector('[data-foot]');
  if (footHost) {
    footHost.className = 'close';
    footHost.innerHTML =
      '<div class="close__art" aria-hidden="true">' +
        crayon('flower', { cls: 'ca-float close-flower', rot: -12 }) +
        doodle('star-yellow', { cls: 'ca-float close-star', rot: 9 }) +
        crayon('laptop', { cls: 'ca-float close-laptop', rot: 8 }) +
        doodle('arrow-loop-warm', { cls: 'ca-float close-arrow', rot: -8 }) +
      '</div>' +
      '<div class="wrap close__inner">' +
        '<div class="close__stamp reveal">' +
          stampRing('happy', { ring: 'circle-red', size: 'lg', rot: -5 }) +
        '</div>' +
        '<div class="poster close__stage">' +
          '<h2 class="ct poster__word close__word reveal" style="--d:1">' +
            '<span class="ln">Let’s make</span>' +
            '<span class="ln">something</span>' +
            '<span class="ln">good.</span>' +
          '</h2>' +
        '</div>' +
        '<p class="lede reveal" style="--d:2">Open to product design and UI work, freelance or full time. ' +
          'If any of this looked like the thing you need, tell me about it.</p>' +
        '<div class="close__row reveal" style="--d:3">' +
          '<a class="close__mail" href="mailto:' + SITE.mail + '">' +
            markWord(SITE.mail, { art: 'underline-red' }) + '</a>' +
        '</div>' +
        '<div class="close__row reveal" style="--d:4">' +
          '<a class="btn" href="work.html">See the work</a>' +
          '<a class="btn btn--ghost" href="about.html">About me</a>' +
        '</div>' +
        '<div class="foot__meta">' +
          '<span>© ' + new Date().getFullYear() + ' ' + SITE.name + ' · ' + SITE.role + '</span>' +
          '<span>Pune, India</span>' +
          '<span class="hand hand--ink">drawn by hand ✎</span>' +
        '</div>' +
      '</div>';
  }

  Crayon.paint();
  Crayon.mountFilter();
  Crayon.fitWords();
}

/* ---------------------------------------------------------
   scroll reveals — also what triggers the marks to draw
   --------------------------------------------------------- */

function mountReveals(root) {
  root = root || document;
  var items = root.querySelectorAll('.reveal, .ca-float, .mark');
  if (!items.length) return;

  if (REDUCED) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.14 });

  for (var j = 0; j < items.length; j++) io.observe(items[j]);
}

document.addEventListener('DOMContentLoaded', function () {
  mountChrome();
  mountReveals();
});
