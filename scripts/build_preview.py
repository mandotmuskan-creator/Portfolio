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


def dedupe_images(doc):
    """Each photo appears several times in the rolls. Inlining every copy as
    its own data URI is what pushed the bundle past 15 MB, so emit each image
    once into a lookup and let a line of script hand it back out."""
    uris = re.findall(r'src="(data:image/[^"]+)"', doc)
    if not uris:
        return doc
    order, seen = [], {}
    for u in uris:
        if u not in seen:
            seen[u] = "i%d" % len(order)
            order.append(u)
    if len(uris) == len(order):
        return doc                      # nothing repeats, leave it alone

    doc = re.sub(r'src="(data:image/[^"]+)"',
                 lambda m: 'data-img="%s"' % seen[m.group(1)], doc)
    table = "{" + ",".join('"%s":"%s"' % (seen[u], u) for u in order) + "}"
    loader = ("<script>(function(){var M=" + table + ";"
              "document.querySelectorAll('[data-img]').forEach(function(e){"
              "e.src=M[e.getAttribute('data-img')];});})();</script>")
    # at the very end, so the closing panel below </main> is parsed by then
    return doc + "\n" + loader


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

    doc = TEMPLATE.replace("__FAVICON__", FAVICON) \
                  .replace("__CSS__", css) \
                  .replace("__NAV__", nav) \
                  .replace("__PAGES__", pages_html) \
                  .replace("__FOOT__", foot)
    doc = swap_assets(doc, assets)
    doc = dedupe_images(doc)

    with open(out_path, "w") as f:
        f.write(doc)
    print("%s — %.2f MB" % (out_path, os.path.getsize(out_path) / 1e6))


# The bundle has no <head> of its own to link a favicon from, so the icon
# rides along as a data URI. Browsers honour rel="icon" anywhere in the
# document, which keeps the tab showing her face rather than the host's mark.
FAVICON = "data:image/png;base64,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"

TEMPLATE = r"""<title>Muskan Mandot · Product Designer</title>
<meta name="description" content="A white editorial design portfolio with a hand-drawn crayon illustration system.">
<link rel="icon" type="image/png" href="__FAVICON__">
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
    document.title = 'Muskan Mandot · Product Designer';
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
