# Muskan Mandot — Portfolio

A static portfolio site. No build step, no dependencies, no framework — open
`index.html` in a browser and it works. Every illustration (the mascot, the
arrows, the spilled coffee, the rope) is an inline SVG path, and the Disney
Store screens are rebuilt in markup rather than exported as images.

---

## Pages

| File           | What it is                                                        |
| -------------- | ----------------------------------------------------------------- |
| `index.html`   | Home — hero, the two projects, about, how I work, closing          |
| `work.html`    | All projects, filterable                                           |
| `project.html` | Case study template · `project.html?p=<slug>`                      |
| `about.html`   | About me                                                           |

---

## Adding a project

Everything reads from **one file**: `assets/js/data.js`. The home cards, the
work grid and the case study page all build themselves from it.

**1. Drop your images** in `assets/img/projects/`.
Keep them under ~300 KB each. Web screenshots look best around 1400 px wide;
phone screenshots around 700 px wide.

**2. Copy a block** in `assets/js/data.js` and change the values. Put it in the
array in the order you want it shown.

```js
{
  slug:     'my-project',            // becomes project.html?p=my-project
  title:    'My Project',
  client:   'Who it was for',
  tagline:  'One line. Shows on the card and under the title.',
  category: 'What kind of work it was',
  year:     '2026',
  role:     'UX / UI Designer',
  tools:    ['Figma'],
  platform: 'Responsive web',        // say "Mobile" and the page uses phone frames
  tags:     ['UX/UI', 'Web'],        // these become the filters on work.html
  accent:   'navy',                  // navy · blue · cream
  cover:    'assets/img/projects/my-project-01.jpg',
  coverFit: 'top',                   // 'top' for tall screenshots, 'cover' otherwise
  focus:    ['Three short lines', 'shown on the', 'home page card'],
  intro:    ['First paragraph.', 'Second paragraph.'],
  roleNote: 'The one-line "My Role" summary.',
  sections: [ /* see below */ ]
}
```

**3. Build the case study** out of `sections` blocks. They render in the order
you list them, so you can tell the story however you like:

```js
{ kind: 'text',   title: 'A heading', body: ['A paragraph.', 'Another.'] }
{ kind: 'points', title: 'What I did', items: ['One thing.', 'Another thing.'] }
{ kind: 'quote',  text: 'A line worth pulling out.' }
{ kind: 'stats',  items: [{ figure: '8+ billion', label: 'Sensors shipped' }] }
{ kind: 'split',  title: 'Decisions', items: [{ head: 'Short title', body: 'Why.' }] }

// a journey map — one column per stage, aligned across all of them
{ kind: 'journey', title: 'The member journey', note: 'Optional line under the heading.',
  stages: [{ phase: 'Sees the invitation',
             doing:   'What they are doing here.',
             feeling: 'What they are thinking.',
             move:    'What the design does about it.' }] }

// a left-to-right state flow with arrows between the steps
{ kind: 'flow', title: 'The five states', note: 'Optional.',
  steps: [{ label: 'Invitation', sub: 'One line', optional: true }] }

// images
{ kind: 'full',   src: '…/shot.jpg', caption: 'Caption',
                  frame: 'browser',  // 'browser' draws a browser window, 'plain' doesn't
                  long: true }       // long: true puts tall images in a scrollable window
{ kind: 'duo',    items: [{ src, caption }, { src, caption }], long: false }
{ kind: 'phones', items: [{ src, caption }, …] }   // a row of phone mockups
```

That's it — nothing else to touch.

### Screens rebuilt in markup

The Disney Club case study has no exported screenshots. Its screens are written
as HTML at the top of `data.js` (`MOCK_JOIN`, `MOCK_PICKER`, …) and styled by the
`.mk` block at the bottom of `assets/css/page.css`. They stay sharp at any size
and scale themselves with container queries, so the same markup works full-width
or as half of a pair.

```js
{ kind: 'mock',  device: 'desktop', html: MOCK_PICKER, caption: 'Caption' }
{ kind: 'mocks', items: [{ device: 'desktop', html: MOCK_JOIN, caption: '…' }, …] }
```

A project can also use one as its cover, in place of `cover`:

```js
coverMock: MOCK_WELCOME
```

Everything inside a mock must be a non-interactive element — `<span>`, not `<a>`
or `<button>`. The cards on the home page and the work grid are themselves
links, and a nested link makes the HTML parser tear the card apart.

---

## Colours & type

Both are set as variables at the top of `assets/css/base.css`.

| Token       | Value     | Where it's from                    |
| ----------- | --------- | ---------------------------------- |
| `--navy`    | `#12295D` | the deck's background              |
| `--paper`   | `#FCFAF5` | the deck's light pages             |
| `--blue`    | `#3F6F97` | the deck's doodle and label blue    |
| `--sky`     | `#D6F1FF` | doodle ink on navy                 |
| `--accent`  | `#1B74B8` | the accent (`--accent-lt` on navy)  |

Type is **Instrument Serif** (display moments — put `.display` on the element),
**Inter** (everything else, including plain `h1`–`h4`) and **Caveat** (used only
for hand-written annotations, via `.hand` or `.eyebrow--hand`). All three are
self-hosted in `assets/fonts/` — no third-party requests.

---

## The doodles

Every illustration lives in `assets/js/doodles.js` as an SVG string. To use one
anywhere in the HTML:

```html
<span data-doodle="cup"></span>
```

Available: `star sparkle heart spiral scribble arrowCurl arrowCurveR arrowCurveL
arrowLoop arrowDown arrowRight arrowTiny arrowElbow cup puddle drop pencilBroken
bandaid bananaPeel tangle paperPlane stickyNote clip bulb cloudThink eyes
footprints check laptop phone palette ruler coffee compass plant book globe
camera frameTape mascotTrip mascotPull mascotWave mascotPeek`.

They inherit `color`, so `style="color: var(--accent)"` recolours one. To draw a new
one, add another entry to the `DOODLE` object using `class="stroke"` on the paths.

Doodles are used generously on the home page, the About page and the closing
panel. Case study pages deliberately stay quiet — arrows only.

---

## How the home page works

Straight vertical scroll, in five acts: hero, work, about, how I work, closing.
`assets/js/home.js` builds the project cards from `data.js` and runs the mascot.

The mascot hauls her rope along in a **fixed slot pinned to the left gutter**
(`.companion`). The slot is sized to exactly the empty space beside the content
rail and it clips, so neither she nor the rope can ever paint over a project
card — the rope just runs out of sight underneath it. She leans into the pull
when the page is moving, stands up when it stops, and says something if you
hover or click her — the bubble is anchored above her figure's top edge, not
to its top-left corner, which is where her head is. Below 1440 px the gutter is
too thin to hold her and she is hidden.

---

## Running it

Any static server works:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

It's plain files, so anything static will host it — GitHub Pages, Netlify,
Vercel, Cloudflare Pages. For **GitHub Pages**: repo → Settings → Pages → deploy
from a branch → pick the branch and `/ (root)`.

### Arrowheads

Every arrow's head is two symmetric legs meeting exactly at the tip, angled off
the shaft's tangent at that point. Drawn instead as one smooth curve bending
through the tip — the earlier approach — the V comes out lopsided and can vanish
at small sizes. `scripts/arrows.py` regenerates them from a shaft and a tip if
you ever need a new one.
