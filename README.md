# Muskan Mandot — Portfolio

A white editorial design portfolio, annotated by hand.

Static site. No build step, no framework, no dependencies at runtime — every
page is plain HTML, CSS and vanilla JS. The crayon artwork is a library of
independent image assets that get placed, rotated and sized individually, and
every headline is real selectable text, not a picture of text.

---

## Run it locally

```bash
python3 -m http.server 4321
```

Then open <http://127.0.0.1:4321/>.

Any static server works — the site makes no network requests of its own, and
the fonts, images and textures are all served from `assets/`. You need a
server rather than opening the file directly, because the pages fetch
`data.js` and friends over HTTP.

Edit a file, save, refresh. There is nothing to compile.

---

## Pages

| File           | What it is                                                   |
| -------------- | ------------------------------------------------------------ |
| `index.html`   | Home: poster hero, a line, projects, about, how I work        |
| `work.html`    | All projects, filterable                                      |
| `project.html` | Case-study template · `project.html?p=<slug>`                 |
| `about.html`   | About, with the photo gallery                                 |

---

## The visual system

The rhythm across every page is **expressive → clean → clean → expressive**.
Title moments carry the artwork; the reading sections go quiet again. Roughly
80% clean editorial portfolio, 20% hand-drawn personality.

### Colour, type and spacing — `assets/css/tokens.css`

Everything comes from tokens. No file should hard-code a hex value or a magic
pixel number.

```css
--paper  --paper-warm  --card              /* grounds  */
--ink    --ink-soft    --ink-faint         /* text     */
--red    --red-ink     --blue  --orange  --yellow  --green
--t--1 … --t-6                             /* fluid type scale   */
--s-1 … --s-8                              /* spacing scale      */
--ca-xs … --ca-xl                          /* artwork sizes      */
```

`--red-ink` is a slightly deeper red used for display type, because the crayon
hatch lightens it. Contrast was checked against the paper for every text
colour in use.

### Type

Three faces, all self-hosted in `assets/fonts/`:

- **Inter** — the interface. Everything you read.
- **Caprasimo** — the crayon display type.
- **Caveat** — handwritten annotations.

A crayon headline is real text:

```html
<h1 class="ct ct--xl">Projects</h1>
```

`.ct` clips a crayon hatch texture to the glyphs with `background-clip: text`
and roughens the outline with an SVG turbulence filter. It stays selectable,
searchable and translatable, and it degrades to flat red type where those
features are missing.

### Poster titles

The big title moments — the homepage hero, each page title, the closing panel,
each case-study opening — use `.poster`:

```html
<div class="poster">
  <h1 class="ct poster__word"><span class="ln">Oh,</span><span class="ln">hello.</span></h1>
</div>
```

The word is sized to fill its container exactly: CSS sets
`font-size: 100cqw / var(--em)`, and `Crayon.fitWords()` measures the widest
line as it is actually drawn and writes `--em` back. Change the words and the
size follows — nobody has to hand-tune a font size, at any breakpoint.

---

## The crayon assets

Three folders, one purpose each:

```
assets/img/face/     the character — head only, one file per expression
assets/img/crayon/   illustrated objects: laptop, pen, flower, coffee, …
assets/img/doodle/   the annotation vocabulary: arrows, circles, stars,
                     underlines, highlights, scribbles
```

They are separate files on purpose. Nothing is baked into a background image,
so any piece can be placed, rotated and sized on its own.

### Placing one

In markup:

```html
<span data-crayon="flower" data-size="sm" data-rot="-8"></span>
<span data-face="happy"    data-size="lg"></span>
<span data-doodle="arrow-red" data-rot="12"></span>
```

In the JS-rendered pages:

```js
crayon('flower', { size: 'sm', rot: -8 })
face('happy',    { size: 'lg' })
doodle('arrow-red', { rot: 12 })
stampRing('happy', { ring: 'circle-red' })   // a head inside a drawn circle
markWord('Muskan', { art: 'underline-red' }) // a word with a mark behind it
handNote('The exit is part of the offer.', { art: 'arrow-loop' })
```

Assets carry `aria-hidden` unless you pass real `alt` text, so a screen reader
walks straight past the decoration. Sizes come from `--ca-*` tokens; intrinsic
dimensions come from `assets/js/crayon-ratio.js`, so a lazy image reserves its
box and nothing shifts as the page loads.

### Regenerating them

The library is cut from the supplied sprite sheets by scripts in `scripts/`.
You only need these if new artwork arrives.

```bash
pip install pillow numpy scipy

# 1 · cut a sheet into individual pieces
python3 scripts/slice_sheets.py <sheet.png> out/s1
python3 scripts/contact_sheet.py out/s1 out/cs_s1.jpg   # numbered grid, to identify them

# 2 · lift the character faces off their paper background
python3 scripts/key_faces.py <expressions.png> out/f1

# 3 · name, trim and export the library (edit the MANIFEST tables first)
python3 scripts/build_assets.py out .

# 4 · the two generated textures, and the image size manifests
python3 scripts/make_textures.py
python3 scripts/image_sizes.py
```

`make_textures.py` generates `paper.png`, the faint tooth on every page, and
keeps `crayon-hatch.png` around in case the hatched fill is ever wanted again.
The display type is a solid fill now. Both are seamless and procedural.

---

## A shareable preview

To send the site to someone who cannot run a server, bundle it into one
self-contained file:

```bash
python3 -m http.server 4321 &          # the builder renders against the real site
PW_DIR=<dir with playwright installed> python3 scripts/build_preview.py preview.html
```

It renders each page in a headless browser, keeps the resulting markup, inlines
every stylesheet, font and image as a data URI, and swaps the between-page links
for hash routes (`#/work`, `#/about`, `#/p/<slug>`). The output makes no network
requests at all. It is a preview, not a second implementation — the markup and
CSS are the site's own; only the URLs differ.

---

## Adding a project

Everything reads from **one file**: `assets/js/data.js`. The home rows, the
work grid and the case-study page all build themselves from it.

**1. Drop your images** in `assets/img/projects/`, then run
`python3 scripts/image_sizes.py` so they reserve their layout box.

**2. Copy a block** in `data.js` and change the values.

```js
{
  slug:     'my-project',            // becomes project.html?p=my-project
  title:    'My Project',
  hero:     ['Making a', 'catalogue', 'findable.'],   // the crayon title, one line per array item
  faceCue:  'thinking',              // which expression opens the case study
  ringCue:  'circle-blue',
  client:   'Who it was for',
  tagline:  'One line. Shows on the card and under the title.',
  category: 'What kind of work it was',
  year:     '2026',
  role:     'UX / UI Designer',
  tools:    ['Figma'],
  platform: 'Responsive web',
  tags:     ['UX/UI', 'Web'],        // these become the filters on work.html
  cover:    'assets/img/projects/my-project-01.jpg',
  coverFit: 'top',                   // 'top' for tall screenshots, 'cover' otherwise
  intro:    ['First paragraph.', 'Second paragraph.'],
  introNote:'A handwritten note in the margin.',
  roleNote: 'The one-line "My Role" summary.',
  sections: [ /* see below */ ]
}
```

**3. Build the case study** out of `sections` blocks. They render in order:

```js
{ kind:'text',    title, body:[..], note, noteArt }   // note = margin annotation
{ kind:'points',  title, items:[..] }
{ kind:'quote',   text }
{ kind:'stats',   items:[{ figure, label }] }
{ kind:'split',   title, items:[{ head, body }] }
{ kind:'journey', title, note, stages:[{ phase, doing, feeling, move }] }
{ kind:'flow',    title, note, steps:[{ label, sub, optional }] }
{ kind:'full',    src, caption, frame:'browser'|'plain', long:true }
{ kind:'duo',     items:[{ src, caption }], long }
{ kind:'phones',  items:[{ src, caption }] }
{ kind:'mock',    device:'desktop'|'mobile', html, caption }
{ kind:'mocks',   items:[{ device, html, caption }] }
```

Keep the writing short and plain. "People could earn rewards, but understanding
them was harder than it needed to be" — not "leveraging user-centred
methodologies".

---

## Accessibility

Not negotiable, and checked rather than assumed:

- Real text everywhere — no headline is an image.
- Every text colour meets WCAG AA against the paper it sits on.
- Decorative artwork is `aria-hidden`; the character never announces itself.
- One tab stop per project card, with a visible 3px focus ring on everything.
- Headings run in order on every page — the mock screens are demoted out of
  the outline, because they are pictures of a UI, not document structure.
- `prefers-reduced-motion` removes every transition and reveals all content.
- No page scrolls horizontally at 390, 820 or 1440.

## Motion

Underlines draw themselves, artwork settles into place, the CTA compresses when
pressed. Nothing loops, nothing parallaxes, and all of it stops under
`prefers-reduced-motion`.

---

## File map

```
assets/css/tokens.css   colour, type scale, spacing, sizing
assets/css/fonts.css    self-hosted @font-face
assets/css/base.css     reset, typography, poster, nav, closing, primitives
assets/css/site.css     page sections: hero, projects, process, about
assets/css/case.css     the case-study template
assets/css/mocks.css    the Disney Store screens, rebuilt in markup

assets/js/crayon.js      the illustration system + the headline fitter
assets/js/crayon-ratio.js  generated — intrinsic sizes of the crayon assets
assets/js/img-sizes.js     generated — intrinsic sizes of the screenshots
assets/js/data.js        every project, the process, the toolkit and the photos
assets/js/common.js      nav, closing panel, scroll reveals
assets/js/home.js        project rows, the process strip and the toolkit
assets/js/work.js        the filterable index
assets/js/project.js     the case-study renderer

scripts/slice_sheets.py   cut a sprite sheet into individual pieces
scripts/contact_sheet.py  lay the pieces on a numbered grid to identify them
scripts/key_faces.py      lift the character faces off their paper background
scripts/build_assets.py   name, trim and export the crayon library
scripts/make_textures.py  the procedural hatch, fold and tooth textures
scripts/image_sizes.py    intrinsic sizes of the project screenshots
scripts/build_preview.py  bundle the whole site into one shareable file
```
