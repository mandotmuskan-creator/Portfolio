# Muskan Mandot — Portfolio

A static portfolio site. No build step, no dependencies, no framework — open
`index.html` in a browser and it works. Everything drawn on it (the mascot, the
arrows, the spilled coffee, the rope) is an inline SVG path, not an image.

---

## Pages

| File           | What it is                                                        |
| -------------- | ----------------------------------------------------------------- |
| `index.html`   | Home — the horizontal-scroll story                                 |
| `work.html`    | All projects, filterable                                           |
| `project.html` | Case study template · `project.html?p=<slug>`                      |
| `about.html`   | About me                                                           |

---

## Adding a project

Everything reads from **one file**: `assets/js/data.js`. The home rope, the work
grid and the case study page all build themselves from it.

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
  role:     'Visual Designer',
  tools:    ['Figma'],
  platform: 'Responsive web',        // say "Mobile" and the page uses phone frames
  tags:     ['Web', 'Design System'],// these become the filters on work.html
  accent:   'navy',                  // navy · blue · cream · red
  cover:    'assets/img/projects/my-project-01.jpg',
  coverFit: 'top',                   // 'top' for tall screenshots, 'cover' otherwise
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
{ kind: 'full',   src: '…/shot.jpg', caption: 'Caption',
                  frame: 'browser',  // 'browser' draws a browser window, 'plain' doesn't
                  long: true }       // long: true puts tall images in a scrollable window
{ kind: 'duo',    items: [{ src, caption }, { src, caption }], long: false }
{ kind: 'phones', items: [{ src, caption }, …] }   // a row of phone mockups
{ kind: 'quote',  text: 'A line worth pulling out.' }
```

That's it — nothing else to touch.

---

## Colours & type

Both are set as variables at the top of `assets/css/base.css`.

| Token       | Value     | Where it's from                    |
| ----------- | --------- | ---------------------------------- |
| `--navy`    | `#12295D` | the deck's background              |
| `--paper`   | `#FCFAF5` | the deck's light pages             |
| `--blue`    | `#3F6F97` | the deck's doodle and label blue    |
| `--sky`     | `#D6F1FF` | doodle ink on navy                 |
| `--red`     | `#FF3B2A` | the accent in the "M" mark          |

Type is **Fraunces** (headings), **Nunito** (body) and **Caveat** (handwriting),
self-hosted in `assets/fonts/` — no third-party requests, nothing to load from
Google.

---

## The doodles

Every illustration lives in `assets/js/doodles.js` as an SVG string. To use one
anywhere in the HTML:

```html
<span data-doodle="cup"></span>
```

Available: `logo star sparkle heart spiral scribble arrowCurl arrowCurveR
arrowCurveL arrowLoop arrowDown arrowRight cup puddle drop pencilBroken bandaid
bananaPeel tangle paperPlane stickyNote clip bulb cloudThink eyes footprints
check laptop phone palette ruler coffee compass plant book globe camera
frameTape mascotTrip mascotPull mascotWave mascotPeek`.

They inherit `color`, so `style="color: var(--red)"` recolours one. To draw a new
one, add another entry to the `DOODLE` object using `class="stroke"` on the paths.

---

## How the home page works

Vertical scroll drives a horizontal translate (`assets/js/home.js`). The mascot is
pinned in the viewport while the rope and the project cards slide past her, so she
reads as hauling them in. The rope's sag, the cards' sway and how hard she's
straining all come off scroll velocity.

It falls back to a normal vertical layout when any of these are true:

- the pointer is coarse (touch)
- the window is under 900 px wide or under 540 px tall
- the visitor has "reduce motion" turned on

Scroll distance is tuned with `SCROLL_RATIO` at the top of `home.js` — lower is
faster, higher is slower.

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
