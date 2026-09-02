"""
build_preview.py — bundle the site into one self-contained page.

The live site is five HTML files talking to a static server. A hosted preview
has to be a single document with no outbound requests, so this script renders
each page in a real browser, keeps the resulting markup, folds every stylesheet,
font and image into the file, and swaps the between-page links for an in-page
router.

The output is a preview of the real thing, not a second implementation: the
markup and CSS are the site's own.

Run:  python3 scripts/build_preview.py <out.html>
"""
import base64, json, mimetypes, os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "http://127.0.0.1:4321/"

PAGES = [
    ("home",    "index.html"),
    ("work",    "work.html"),
    ("about",   "about.html"),
    ("p/tdk-invensense", "project.html?p=tdk-invensense"),
    ("p/disney-store",   "project.html?p=disney-store"),
    ("p/pregnancy-app",  "project.html?p=pregnancy-app"),
]

CSS = ["tokens.css", "fonts.css", "base.css", "site.css", "case.css", "mocks.css"]


# --------------------------------------------------------------------------
# assets -> data URIs
# --------------------------------------------------------------------------

def data_uri(rel):
    path = os.path.join(ROOT, rel)
    mime = mimetypes.guess_type(path)[0] or "application/octet-stream"
    if rel.endswith(".woff2"):
        mime = "font/woff2"
    with open(path, "rb") as f:
        return "data:%s;base64,%s" % (mime, base64.b64encode(f.read()).decode())


def asset_map():
    out = {}
    for root, _, files in os.walk(os.path.join(ROOT, "assets")):
        for f in files:
            rel = os.path.relpath(os.path.join(root, f), ROOT).replace(os.sep, "/")
            if rel.endswith((".css", ".js")):
                continue
            out[rel] = data_uri(rel)
    return out


# --------------------------------------------------------------------------
# render each page in the browser and keep what it produced
# --------------------------------------------------------------------------

RENDER_JS = r"""
const { chromium } = require('playwright');
const pages = JSON.parse(process.argv[2]);
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const ctx = await b.newContext({ viewport: { width: 1440, height: 1000 } });
  const out = {};
  for (const [key, url] of pages) {
    const p = await ctx.newPage();
    await p.goto('BASE' + url, { waitUntil: 'networkidle' });
    await p.waitForTimeout(500);
    out[key] = await p.evaluate(() => {
      document.querySelectorAll('script').forEach(s => s.remove());
      const main = document.getElementById('main');
      const extra = [...document.querySelectorAll('.cs-progress, .cs-back')]
        .map(e => e.outerHTML).join('');
      return { main: main ? main.innerHTML : '', extra,
               nav: document.querySelector('.nav').outerHTML,
               foot: document.querySelector('.close').outerHTML };
    });
    await p.close();
  }
  await b.close();
  process.stdout.write(JSON.stringify(out));
})();
""".replace("BASE", BASE)


def render():
    # node resolves `playwright` from the script's own directory, so the
    # renderer has to live next to the installed module
    scratch = os.environ.get("PW_DIR", ".")
    js = os.path.join(scratch, "_render.js")
    try:
        with open(js, "w") as f:
            f.write(RENDER_JS)
        res = subprocess.run(["node", js, json.dumps(PAGES)], cwd=scratch,
                             capture_output=True, text=True)
    finally:
        if os.path.exists(js):
            os.remove(js)
    if True:
        if res.returncode:
            sys.exit(res.stderr[-3000:])
        return json.loads(res.stdout)


# --------------------------------------------------------------------------
# rewriting
# --------------------------------------------------------------------------

ROUTES = {"index.html": "#/home", "work.html": "#/work",
          "about.html": "#/about"}


def swap_assets(text, assets):
    """Point every assets/… reference at its inlined copy."""
    for rel in sorted(assets, key=len, reverse=True):
        text = text.replace(rel, assets[rel])
    return text


def scope_ids(html, key):
    """Ids and same-page anchors are per-page, so give each page its own."""
    tag = re.sub(r"[^a-z0-9]+", "-", key)
    html = re.sub(r'id="([^"]+)"', lambda m: 'id="%s--%s"' % (m.group(1), tag), html)
    html = re.sub(r'href="#([^"/][^"]*)"',
                  lambda m: 'href="#%s--%s"' % (m.group(1), tag), html)
    html = re.sub(r'aria-controls="([^"]+)"',
                  lambda m: 'aria-controls="%s--%s"' % (m.group(1), tag), html)
    return html


def swap_links(html):
    """Between-page links become router hashes."""
    for f, r in ROUTES.items():
        html = html.replace('href="%s"' % f, 'href="%s"' % r)
    html = re.sub(r'href="project\.html\?p=([a-z0-9-]+)"',
                  r'href="#/p/\1"', html)
    return html


def build(out_path):
    assets = asset_map()
    rendered = render()

    css = []
    for name in CSS:
        with open(os.path.join(ROOT, "assets", "css", name)) as f:
            t = f.read()
        # ../img/… and ../fonts/… are relative to assets/css/
        t = re.sub(r'url\(\s*"\.\./([^"]+)"\s*\)',
                   lambda m: 'url("%s")' % assets.get("assets/" + m.group(1), m.group(1)), t)
        css.append("/* ---- %s ---- */\n%s" % (name, t))
    css = "\n".join(css)

    body = []
    for key, _ in PAGES:
        r = rendered[key]
        html = scope_ids(r["main"] + r["extra"], key)
        body.append('<div class="pg" data-pg="%s" hidden>%s</div>' % (key, html))

    nav = swap_links(rendered["home"]["nav"])
    foot = swap_links(rendered["home"]["foot"])
    pages_html = swap_links("\n".join(body))

    doc = TEMPLATE.replace("__CSS__", css) \
                  .replace("__NAV__", nav) \
                  .replace("__PAGES__", pages_html) \
                  .replace("__FOOT__", foot)
    doc = swap_assets(doc, assets)

    with open(out_path, "w") as f:
        f.write(doc)
    print("%s — %.2f MB" % (out_path, os.path.getsize(out_path) / 1e6))


TEMPLATE = r"""<title>Muskan Mandot Portfolio</title>
<meta name="description" content="A white editorial design portfolio with a hand-drawn crayon illustration system.">
<style>
__CSS__

/* ---- preview shell ----
   The live site is five separate documents. Here they are stacked in one
   file and swapped by hash, so nothing about the design changes. */
.pg[hidden] { display: none !important; }
.preview-note {
  position: fixed;
  right: 14px;
  bottom: 14px;
  z-index: 90;
  max-width: 21rem;
  padding: 11px 15px;
  border-radius: var(--r);
  background: var(--ink);
  color: var(--paper);
  font-family: var(--f-body);
  font-size: .78rem;
  line-height: 1.45;
  box-shadow: 0 14px 34px -20px rgba(25,24,22,.7);
}
.preview-note b { font-weight: 700; }
.preview-note button {
  margin-left: 6px;
  color: var(--paper);
  opacity: .6;
  text-decoration: underline;
}
.preview-note button:hover { opacity: 1; }
@media (max-width: 640px) { .preview-note { display: none; } }
</style>

<a class="skip" href="#stage">Skip to content</a>
__NAV__
<main id="stage">
__PAGES__
</main>
__FOOT__

<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden">
  <filter id="crayonEdge" x="-4%" y="-8%" width="108%" height="116%" color-interpolation-filters="sRGB" filterUnits="objectBoundingBox">
    <feTurbulence type="fractalNoise" baseFrequency="0.019 0.036" numOctaves="4" seed="17" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="crayonEdgeSm" x="-4%" y="-10%" width="108%" height="120%" color-interpolation-filters="sRGB" filterUnits="objectBoundingBox">
    <feTurbulence type="fractalNoise" baseFrequency="0.05 0.09" numOctaves="3" seed="9" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
</svg>

<p class="preview-note" id="note">
  <b>Preview.</b> The real site is five separate pages served from the repo —
  this is all of them in one file so it can be opened from a link.
  <button type="button" onclick="document.getElementById('note').remove()">Hide</button>
</p>

<script>
(function () {
  'use strict';
  var REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pages = [].slice.call(document.querySelectorAll('.pg'));
  var links = [].slice.call(document.querySelectorAll('.nav__links a'));

  /* --- the poster words size themselves to their column --- */
  function fitWords(root) {
    var els = (root || document).querySelectorAll('.poster__word');
    var range = document.createRange();
    [].forEach.call(els, function (el) {
      var size = parseFloat(getComputedStyle(el).fontSize);
      if (!size) return;
      var lines = el.querySelectorAll('.ln');
      var list = lines.length ? [].slice.call(lines) : [el];
      var widest = 0;
      list.forEach(function (l) {
        if (!(l.textContent || '').trim()) return;
        range.selectNodeContents(l);
        var w = range.getBoundingClientRect().width;
        if (w > widest) widest = w;
      });
      if (widest) el.style.setProperty('--em', (widest / size * 1.02).toFixed(3));
    });
  }

  /* --- scroll reveals --- */
  function reveals(root) {
    var items = root.querySelectorAll('.reveal, .ca-float, .mark');
    if (REDUCED) {
      [].forEach.call(items, function (e) { e.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.14 });
    [].forEach.call(items, function (e) { io.observe(e); });
  }

  /* --- routing --- */
  function route() {
    var h = location.hash.replace(/^#\//, '');
    if (!h || h.indexOf('/') === -1 && !pages.some(function (p) { return p.dataset.pg === h; })) {
      h = 'home';
    }
    var found = false;
    pages.forEach(function (p) {
      var on = p.dataset.pg === h;
      p.hidden = !on;
      if (on) found = true;
    });
    if (!found) { pages[0].hidden = false; h = 'home'; }

    var key = h.split('/')[0] === 'p' ? 'work' : h;
    links.forEach(function (a) {
      var t = (a.getAttribute('href') || '').replace('#/', '');
      if (t === key) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    var live = pages.filter(function (p) { return !p.hidden; })[0];
    if (live) { fitWords(live); reveals(live); }
    document.title = 'Muskan Mandot Portfolio';
  }

  addEventListener('hashchange', function () { route(); scrollTo(0, 0); });

  var nav = document.querySelector('.nav');
  addEventListener('scroll', function () {
    nav.classList.toggle('is-stuck', scrollY > 40);
    var bar = document.querySelector('.pg:not([hidden]) .cs-progress span');
    if (bar) {
      var h = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = (h > 0 ? Math.min(1, scrollY / h) * 100 : 0).toFixed(2) + '%';
    }
  }, { passive: true });

  route();
  reveals(document);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { route(); });
  var t;
  addEventListener('resize', function () { clearTimeout(t); t = setTimeout(function () { fitWords(); }, 150); });
})();
</script>
"""


if __name__ == "__main__":
    build(sys.argv[1] if len(sys.argv) > 1 else "preview.html")
