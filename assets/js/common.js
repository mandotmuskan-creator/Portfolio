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
   Page titles: line the sentence up with the word.

   The word on the left is display type at whatever size fits its
   column, and the sentence on the right is body copy. Starting both at
   the top of their grid row leaves the sentence sitting above the
   word's capitals, by a different amount on every page, because every
   page fits its word at a different size. So the ink is measured on
   both and the sentence is pushed down by the difference.
   --------------------------------------------------------- */

/* Where the ink of the first line actually starts. A zero-sized inline
   block sits on the baseline, and the canvas reports how far the tallest
   letter reaches above it. */
function inkTop(el, text) {
  var probe = document.createElement('span');
  probe.style.cssText = 'display:inline-block;width:0;height:0';
  el.insertBefore(probe, el.firstChild);
  var baseline = probe.getBoundingClientRect().top;
  el.removeChild(probe);

  var cs = getComputedStyle(el);
  var ctx = inkTop.ctx ||
    (inkTop.ctx = document.createElement('canvas').getContext('2d'));
  ctx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily;
  var m = ctx.measureText(text);
  var rise = m.actualBoundingBoxAscent;
  if (!rise) rise = parseFloat(cs.fontSize) * 0.72;   /* a sane cap height */
  return baseline - rise;
}

function alignTitle() {
  var side = document.querySelector('.ptitle__side');
  var word = document.querySelector('.ptitle__word .ln');
  var lede = side && side.querySelector('.lede');
  if (!side || !word || !lede) return;

  side.style.setProperty('--brow', '0px');
  if (window.innerWidth <= 860) return;              /* stacked: nothing to line up */

  var drop = inkTop(word, word.textContent) - inkTop(lede, lede.textContent.trim());
  side.style.setProperty('--brow', Math.max(0, Math.round(drop)) + 'px');
}

/* ---------------------------------------------------------
   nav + closing panel

   Every page ends on an invitation, but not the same one. Reading the
   identical sign-off four times over makes the whole site feel like a
   template, so each page closes on the thought it actually arrived at.
   --------------------------------------------------------- */

var CLOSERS = {
  home: {
    word: ['Let’s make', 'something', 'good.'],
    lede: 'Open to product design and UI work, freelance or full time. ' +
          'If any of this looked like the thing you need, tell me about it.',
    links: [['work.html', 'See the work'], ['about.html', 'About me']]
  },
  work: {
    word: ['Your', 'project,', 'next.'],
    lede: 'That is the work, and the thinking under it. If you have something ' +
          'that needs the same kind of attention, I would like to hear about it.',
    links: [['about.html', 'About me'], ['resume.html', 'My resume']]
  },
  about: {
    word: ['Now tell me', 'about you.'],
    lede: 'That is a great deal about me. Your turn: what are you building, ' +
          'who is it for, and what keeps getting in the way?',
    links: [['work.html', 'See the work'], ['resume.html', 'My resume']]
  },
  resume: {
    word: ['Paper only', 'says so much.'],
    lede: 'Two pages cover where I have been. A conversation covers whether ' +
          'I am the right person for where you are going.',
    links: [['work.html', 'See the work'], ['about.html', 'About me']]
  }
};


function mountChrome() {
  var here = document.body.dataset.page || '';
  var navHost = document.querySelector('[data-nav]');
  if (navHost) {
    var link = function (href, label, key) {
      return '<a href="' + href + '"' + (key === here ? ' aria-current="page"' : '') + '>' +
        label + '</a>';
    };
    navHost.className = 'nav';
    navHost.innerHTML =
      '<a class="nav__mark" href="index.html">' +
        '<img class="stamp" src="assets/img/face/neutral.webp" alt="" aria-hidden="true" decoding="async">' +
        '<span>' + SITE.name + '</span>' +
        '<span class="sr">, home</span>' +
      '</a>' +
      '<nav class="nav__links" aria-label="Primary">' +
        link('work.html',   'Work',   'work') +
        link('about.html',  'About',  'about') +
        link('resume.html', 'Resume', 'resume') +
        link('mailto:' + SITE.mail, 'Contact', 'contact') +
      '</nav>';

    var stick = function () { navHost.classList.toggle('is-stuck', window.scrollY > 40); };
    window.addEventListener('scroll', stick, { passive: true });
    stick();
  }

  var footHost = document.querySelector('[data-foot]');
  if (footHost) {
    var sign = CLOSERS[here] || CLOSERS.home;
    footHost.className = 'close';
    footHost.innerHTML =
      '<div class="wrap close__inner">' +
        '<div class="close__stamp reveal">' +
          stampRing('happy', { ring: 'circle-red', size: 'lg', rot: -5 }) +
        '</div>' +
        '<div class="poster close__stage">' +
          '<h2 class="ct poster__word close__word reveal" style="--d:1">' +
            sign.word.map(function (ln) { return '<span class="ln">' + ln + '</span>'; }).join('') +
          '</h2>' +
        '</div>' +
        '<p class="lede reveal" style="--d:2">' + sign.lede + '</p>' +
        '<div class="close__row reveal" style="--d:3">' +
          '<a class="close__mail" href="mailto:' + SITE.mail + '">' +
            escapeHtml(SITE.mail) + '</a>' +
        '</div>' +
        '<div class="close__row reveal" style="--d:4">' +
          sign.links.map(function (l, i) {
            return '<a class="btn' + (i ? ' btn--ghost' : '') + '" href="' + l[0] + '">' + l[1] + '</a>';
          }).join('') +
        '</div>' +
        '<div class="foot__meta">' +
          '<span>© ' + new Date().getFullYear() + ' ' + SITE.name + ' · ' + SITE.role + '</span>' +
          '<span>Pune, India</span>' +
        '</div>' +
      '</div>';
  }

  Crayon.paint();
  Crayon.mountFilter();
  Crayon.fitWords();

  alignTitle();
  /* the word is fitted from font metrics, so redo it once the face is in */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(alignTitle);
  var titleW = window.innerWidth, titleT;
  window.addEventListener('resize', function () {
    if (Math.abs(window.innerWidth - titleW) < 24) return;
    titleW = window.innerWidth;
    clearTimeout(titleT);
    titleT = setTimeout(alignTitle, 140);
  }, { passive: true });
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
