/* =========================================================
   data.js, the single source of truth for every project.

   TO ADD A PROJECT
   1. Drop images in  assets/img/projects/
   2. Copy one block below, change the values, put it in the
      order you want it to appear.
   The home page, the work grid and the case study page all
   read from this array.

   Block reference
   ---------------
   slug      url id.  /project.html?p=<slug>          (required, unique)
   title     project name                             (required)
   client    who it was for
   tagline   one line, shown on the card and the hero
   category  short kind-of-work label
   year      when
   role      your role, one line
   tools     array of tools
   platform  web / mobile / both
   tags      array, powers the filters on /work.html
   accent    card colour: "navy" | "blue" | "cream" | "red"
   cover     card image  (or coverMock for a drawn-in-code cover)
   coverFit  "cover" (fill the card) | "top" (pin to the top)
   focus     three short lines shown on the home card
   intro     array of paragraphs, the overview
   role      your role, one line
   team      team size, one line
   teamNote  who was on it
   duration  how long it ran
   roleNote  the one-line "My Role" summary
   sections  array of { kind, ... } blocks, rendered in order:
               { kind:'text',    title, body:[..] }
               { kind:'points',  title, items:[..] }
               { kind:'quote',   text }
               { kind:'stats',   items:[{ figure, label }] }
               { kind:'journey', title, note, stages:[{ phase, doing, feeling, move }] }
               { kind:'flow',    title, note, steps:[{ label, sub }] }
               { kind:'split',   title, items:[{ head, body }] }
               { kind:'full',    src, caption, frame:'browser'|'plain', long:true }
               { kind:'duo',     items:[{src,caption}], long }
               { kind:'phones',  items:[{src,caption}] }
               { kind:'mock',    device:'desktop'|'mobile', html, caption }
               { kind:'mocks',   items:[{ device, html, caption }] }
               { kind:'method',    title, note, items:[{ head, body, found }] }
               { kind:'personas',  title, note, items:[{ tag, name, who,
                                                         goal, pain, answer, quote }] }
               { kind:'versus',    title, note, rows:[{ issue, fix }] }
               { kind:'ia',        title, note, nodes:[{ label, note, kids:[..] }] }
               { kind:'swatches',  title, note, groups:[{ name, use,
                                     items:[{ name, hex, line }] }] }
                                   `line` outlines a swatch too pale to
                                   read against the page
               { kind:'typescale', title, note, items:[{ role, spec, px,
                                                         weight, lh, sample }] }
               { kind:'live',      eyebrow, title, body, label, href }
   ========================================================= */

/* ---------------------------------------------------------
   Disney Store screens are rebuilt here in HTML rather than
   exported as flat images, so they stay sharp at any size and
   the page keeps its no-external-assets rule. Styling lives
   under the .mk namespace in page.css.
   --------------------------------------------------------- */

const DSW = `<span class="mk-dsw"><em>Disney</em> store</span>`;

const MOCK_JOIN = `
  <div class="mk mk-modal">
    <span class="mk-x">×</span>
    <div class="mk-logo">${DSW}</div>
    <p class="mk-h">Get extra perks with Disney Club</p>
    <p class="mk-p">Enjoy exclusive offers, early access and delivery savings, just for being a member.</p>
    <span class="mk-link">See All Benefits</span>
    <span class="mk-btn">Join Disney Store Club</span>
    <p class="mk-note">By joining, you agree to <u>Disney Store terms</u>.</p>
  </div>`;

const MOCK_WELCOME = `
  <div class="mk mk-modal">
    <span class="mk-x">×</span>
    <div class="mk-band">
      <div class="mk-logo mk-logo--light">${DSW}</div>
      <p class="mk-h mk-h--light">You're in! Welcome to Disney Club</p>
      <p class="mk-p mk-p--light">Your free membership is now active! Enjoy member-only offers, early access and delivery savings.</p>
    </div>
    <div class="mk-panel">
      <span class="mk-ears"></span>
      <p class="mk-p">Want more relevant perks? Tell us what you're into.<br>You can update this later in My Account.</p>
    </div>
    <p class="mk-note">Make sure you're opted into receive communications, so you don't miss out on latest perks. <u>Manage preferences</u></p>
    <span class="mk-btn">Start personalising</span>
    <span class="mk-link mk-link--quiet">Skip for now</span>
  </div>`;

const MOCK_PICKER = `
  <div class="mk mk-picker">
    <span class="mk-x">×</span>
    <div class="mk-logo">${DSW}</div>
    <div class="mk-card">
      <p class="mk-h mk-h--sm">Who's your favourite in the Disney universe?</p>
      <p class="mk-p mk-p--sm">Pick your favourite to personalise your theme. You can always change it later.</p>
      <div class="mk-tiles">
        <div class="mk-tile"><span class="mk-thumb mk-thumb--1"></span><span class="mk-pill">Mickey &amp; Friends</span></div>
        <div class="mk-tile"><span class="mk-thumb mk-thumb--2"></span><span class="mk-pill">Stitch</span></div>
        <div class="mk-tile"><span class="mk-thumb mk-thumb--3"></span><span class="mk-pill">Disney Princesses</span></div>
        <div class="mk-tile"><span class="mk-thumb mk-thumb--4"></span><span class="mk-pill">Marvel Heroes</span></div>
        <div class="mk-tile is-on"><span class="mk-thumb mk-thumb--5"></span><span class="mk-pill">Star Wars</span></div>
        <div class="mk-tile"><span class="mk-thumb mk-thumb--6"></span><span class="mk-pill">A Bit of Everything</span></div>
      </div>
      <span class="mk-btn">Continue</span>
      <span class="mk-link mk-link--quiet">Skip for now</span>
    </div>
  </div>`;

const MOCK_DONE = `
  <div class="mk mk-modal mk-modal--sm">
    <span class="mk-x">×</span>
    <div class="mk-hero-art"></div>
    <p class="mk-h mk-h--sm">Your Disney world is set ✨</p>
    <p class="mk-p mk-p--sm">We'll use this to shape the offers and stories you see. Change it any time in My Account.</p>
    <span class="mk-btn">Start exploring</span>
  </div>`;

const MOCK_LEAVE = `
  <div class="mk mk-modal mk-modal--sm">
    <span class="mk-x">×</span>
    <div class="mk-hero-art mk-hero-art--grey"></div>
    <p class="mk-h mk-h--sm">Leave the club?</p>
    <p class="mk-p mk-p--sm">You'll lose member pricing, early access and your saved personalisation. You can rejoin at any time.</p>
    <span class="mk-btn">Stay a member</span>
    <span class="mk-link mk-link--quiet">Leave club</span>
  </div>`;

const MOCK_ACCOUNT = `
  <div class="mk mk-acct">
    <div class="mk-topbar">Send magic with a Disney Store eGift Card &nbsp;|&nbsp; <u>Shop now</u></div>
    <div class="mk-nav">
      <span class="mk-nav__links">Disney+ · Disney.co.uk · Outlet · Help</span>
      <div class="mk-logo mk-logo--sm">${DSW}</div>
      <span class="mk-nav__links">Sign In &nbsp; ♡ Wish List &nbsp; ⛉ Bag</span>
    </div>
    <div class="mk-acct__body">
      <aside class="mk-side">
        <div class="mk-side__me"><span class="mk-avatar"></span><span><b>Hi, Sally Sullivan</b><br><small>sally@email.com</small></span></div>
        <ul class="mk-side__nav">
          <li>My Account Overview</li>
          <li class="is-on">Disney Club <span class="mk-badge">Member</span></li>
          <li>Order History</li>
          <li>Wish List <span class="mk-badge">12</span></li>
          <li>Info &amp; Settings</li>
        </ul>
      </aside>
      <div class="mk-acct__main">
        <div class="mk-strip">
          <span><b>Your theme</b><br><small>Star Wars</small></span>
          <span class="mk-link">Change</span>
        </div>
        <div class="mk-perks">
          <div class="mk-perk"><b>Member pricing</b><small>Applied at checkout</small></div>
          <div class="mk-perk"><b>Early access</b><small>48 hours ahead</small></div>
          <div class="mk-perk"><b>Delivery savings</b><small>On orders over £30</small></div>
        </div>
        <span class="mk-link mk-link--quiet mk-leave">Leave Disney Club</span>
      </div>
    </div>
  </div>`;

const PROJECTS = [

  {
    slug: 'tdk-invensense',
    title: 'TDK InvenSense',
    hero: ['Making a', 'catalogue', 'findable.'],
    faceCue: 'thinking',
    ringCue: 'circle-blue',
    client: 'TDK · InvenSense',
    tagline: 'A sensor catalogue nobody could navigate, restructured around the engineers, partners and distributors who actually use it.',
    category: 'Responsive website redesign & design system',
    year: '2025',
    role: 'UI and design system',
    team: '8 people',
    teamNote: 'Two UI designers, a design system designer, a UX designer, a UX writer and an associate creative director.',
    duration: '8 months, delivered ahead of schedule',
    tools: ['Figma', 'FigJam'],
    platform: 'Responsive web',
    tags: ['UX/UI', 'Web', 'Design System'],
    accent: 'navy',
    cover: 'assets/img/covers/tdk-invensense.webp',
    focus: [
      'Audit, IA and wireframes through to signed-off UI',
      'Three role-based paths: engineer, partner, distributor',
      'A component library documented for handoff'
    ],
    intro: [
      'InvenSense makes the motion, sound and pressure sensors inside drones, cars, headsets, hearing aids and smart homes. The catalogue is enormous and deeply technical, and the old site asked every visitor to already know what they were looking for. Engineers, procurement partners and distributors all landed in the same undifferentiated place.',
      'The redesign covered the whole public site: homepage, applications, product detail, developer community, and the design system underneath all of it. Eight of us, eight months, delivered ahead of schedule.'
    ],
    roleNote: 'Supporting the design system, and building the UI from scratch.',
    introNote: 'Three audiences. One front door. That was the whole problem.',
    sections: [

      /* ---------- brand ---------- */
      {
        kind: 'text',
        title: 'Understanding the brand before touching a screen',
        note: 'Precision is the product. The interface had to feel like it too.',
        noteArt: 'arrow-loop-warm',
        body: [
          'TDK is a Japanese electronics manufacturer whose whole promise is precision at scale. InvenSense is the sensor arm: components measured in millimetres and microamps, sold to people who will read a datasheet before they read a headline. The brand line, "In Everything, Better", is an engineering claim, not a marketing one.',
          'That set the tone for every decision. No decorative motion, no illustration standing in for information, no hero copy that delays the specification. The visual language stays deliberately restrained: a blue system carrying almost all the weight, one accent reserved for sensing itself, and generous white space so dense technical content has room to be read.',
          'The one place the brand gets to be expressive is the sensing metaphor. Signal-wave icons in a bright violet run through the applications and feature sections. It is the only saturated colour on the page, so it always means the same thing: this is where the sensor does its work.'
        ]
      },

      /* ---------- research ---------- */
      {
        kind: 'method',
        title: 'The research the redesign was built on',
        note: 'Run by the UX lead across the discovery phase, with the whole team in the synthesis sessions. I sat in on the sessions and worked from the findings; the parts below marked "what it turned up" are the ones that changed screens I went on to design.',
        items: [
          {
            head: 'Stakeholder interviews',
            body: 'Sessions with product marketing, field application engineers and the sales team, covering who actually contacts TDK and what they ask for first.',
            found: 'Three distinct buyers were being served one page. The field engineers described the same phone call over and over: someone who knew their application but not the part number.'
          },
          {
            head: 'Analytics and search-log review',
            body: 'Where visitors landed, where they left, and what they typed into the old site search.',
            found: 'Search queries were overwhelmingly application words ("drone", "hearing aid", "presence detection") rather than part numbers. The site was organised by part family.'
          },
          {
            head: 'Content and IA audit',
            body: 'Every page, template and PDF on the existing site catalogued, with duplicates and orphans flagged.',
            found: 'Datasheets lived several clicks deep and in more than one place. The same product appeared under different names in different sections.'
          },
          {
            head: 'Competitor and comparator review',
            body: 'How other component manufacturers, and a handful of non-competitors with hard catalogue problems, let people find parts.',
            found: 'The strongest examples offered two routes in parallel: browse by what you are building, or filter by spec if you already know. Sites with only one route lost whichever audience it did not suit.'
          },
          {
            head: 'Usability testing on the prototypes',
            body: 'Task-based sessions on the clickable flows: find a sensor for a stated application, then find its datasheet and evaluation board.',
            found: 'People used the application route first even when they knew the part number, then switched to specs to compare. That ordering is why the application tab is the default and the spec tab sits beside it, not behind it.'
          }
        ]
      },

      /* ---------- analysis ---------- */
      {
        kind: 'versus',
        title: 'What the analysis actually changed',
        note: 'Findings only matter if you can point at the screen they moved. Left, what the research surfaced. Right, what we did about it.',
        rows: [
          { issue: 'Visitors searched by application; the site was organised by part family.', fix: 'Applications became a top-level route with its own landing page and detail pages, and the homepage grid leads with applications, not families.' },
          { issue: 'Three audiences shared one undifferentiated homepage.', fix: 'A role band names all three outright, low on the page, and remembers what you picked.' },
          { issue: 'Engineers opened five tabs to compare parts.', fix: 'Key specs moved onto the product card, and the product page gained a compare table with its own filter tabs.' },
          { issue: 'Datasheets were buried and duplicated.', fix: 'A documentation section on every product page, with versions, dates and a direct download on each row.' },
          { issue: 'Partners had no way to judge scale before contacting sales.', fix: 'A stats band directly under the hero: sensors shipped, products equipped, patents held.' },
          { issue: 'Developers had questions with nowhere to ask them.', fix: 'A community hub with threads, categories and a solved state, so answers accumulate instead of going back to support each time.' }
        ]
      },

      /* ---------- audience ---------- */
      {
        kind: 'personas',
        title: 'Three people, one front door',
        note: 'The personas the team worked from. Everything on the homepage below the hero maps onto one of these three.',
        items: [
          {
            tag: 'Primary',
            name: 'The design engineer',
            who: 'Embedded or hardware engineer at an OEM, mid-career, deep domain knowledge.',
            goal: 'Find a part that meets a spec, confirm it with a datasheet, and get an evaluation board on order the same day.',
            pain: 'Marketing pages between them and the numbers. Datasheets that take four clicks and a form.',
            answer: 'Specs on the card, a spec-driven filter route, a compare table, and documentation with direct downloads.',
            quote: 'I know what I need it to do. I do not know what you call it.'
          },
          {
            tag: 'Secondary',
            name: 'The OEM partner',
            who: 'Product or procurement lead assessing whether TDK can support a line at volume.',
            goal: 'Judge scale, reliability and roadmap before starting a commercial conversation.',
            pain: 'No way to assess credibility without booking a call with sales.',
            answer: 'The measurable-success band under the hero, named partner brands, and a partner path in the role selector.',
            quote: 'Before I take this to my board, show me you can ship at our volume.'
          },
          {
            tag: 'Secondary',
            name: 'The distributor',
            who: 'Channel partner reselling components, working across many manufacturers at once.',
            goal: 'Get to inventory, pricing and ready-made sales collateral in as few steps as possible.',
            pain: 'Hunting for assets designed for engineers, not for selling.',
            answer: 'A distributor entry card with its own resource path, and a remembered choice so it is one click on every return visit.',
            quote: 'I sell nine brands. Make yours the easy one.'
          }
        ]
      },

      {
        kind: 'flow',
        title: 'The discovery journey',
        note: 'Two routes in, converging on the same product page. Testing showed people take the left route first even when they could take the right one, so the application tab is the default.',
        steps: [
          { label: 'Land', sub: 'Home or a search result' },
          { label: 'Choose a route', sub: 'By application, or by spec' },
          { label: 'Narrow', sub: 'Application page or filtered list' },
          { label: 'Compare', sub: 'Specs side by side' },
          { label: 'Confirm', sub: 'Datasheet, variants, eval board' },
          { label: 'Act', sub: 'Contact sales or buy from a distributor' }
        ]
      },

      /* ---------- structure ---------- */
      {
        kind: 'ia',
        title: 'The structure we landed on',
        note: 'Five top-level routes instead of a single product tree. Applications and Products are deliberately parallel: the same catalogue, entered two different ways.',
        nodes: [
          { label: 'Solutions', note: 'sensor fusion, machine learning, navigation' },
          { label: 'Applications', note: 'the route for people who know the problem, not the part', kids: [
            { label: 'Applications landing', note: 'all application areas' },
            { label: 'Application detail', note: 'smart home, gaming, wearables, automotive, robotics' },
            { label: 'Product families in that application' }
          ] },
          { label: 'Products & Sensors', note: 'the route for people who know the spec', kids: [
            { label: 'Filtered product list', note: 'by sensor type, interface, package' },
            { label: 'Product detail', note: 'specs, variants, compare, documentation' }
          ] },
          { label: 'Tools & Support', kids: [
            { label: 'Developer community', note: 'threads, categories, solved answers' },
            { label: 'Knowledge base' },
            { label: 'Software downloads and SDKs' }
          ] },
          { label: 'Technology', note: 'the engineering story, kept out of the finding path' }
        ]
      },

      /* ---------- wireframes ---------- */
      {
        kind: 'text',
        title: 'Wireframes: structure before surface',
        note: 'What follows is a selection, not the set.',
        noteArt: 'arrow-loop',
        body: [
          'Every page was resolved in greyscale first. No colour, no photography, no brand: just the order of the information and the weight each block carries. It is much easier to argue about whether the stats band should sit above the applications grid when nothing on the page is pretty enough to defend on other grounds.',
          'These went through several rounds with the client and through usability testing before a single colour was applied.',
          'The redesign ran to more than thirty screens across the site, at three breakpoints each. What is shown from here on is a handful of the templates that carry the most of the thinking: the homepage, the two application layouts, product detail and the developer community. The whole thing is on the live site, linked at the end.'
        ]
      },
      {
        kind: 'grid',
        note: 'The five templates the rest of the site was built from. Each tile scrolls; the pages are far taller than a row can show.',
        items: [
          { src: 'assets/img/projects/tdk/wf-home.webp', caption: 'Homepage: hero, proof, application discovery, role selection, sensor selector' },
          { src: 'assets/img/projects/tdk/wf-applications.webp', caption: 'Applications landing: highlights, the application grid, product spotlight' },
          { src: 'assets/img/projects/tdk/wf-application-detail.webp', caption: 'Application detail: one application, its product families and media' },
          { src: 'assets/img/projects/tdk/wf-product.webp', caption: 'Product detail: variants, compare table, applications in action, documentation' },
          { src: 'assets/img/projects/tdk/wf-community.webp', caption: 'Developer community: categories, thread list, solved and pinned states' }
        ]
      },

      /* ---------- typography ---------- */
      {
        kind: 'typescale',
        title: 'Typography',
        note: 'Two faces. Obvia Expanded carries the headings: a wide geometric with enough character to hold a page that is otherwise all specification. Noto Sans does everything that has to be read rather than scanned, and it covers the scripts a global catalogue needs. Sizes below are the desktop scale as it shipped, at 1440. The specimens are set in the portfolio’s own stack, so what you are judging here is the scale and the weight relationships, not the letterforms.',
        items: [
          { role: 'Display', spec: 'Obvia Expanded · 44 / 56 · 600', px: 44, weight: 600, lh: 1.25, sample: 'Applications powered by smart sensors' },
          { role: 'Section heading', spec: 'Obvia Expanded · 30 / 40 · 700', px: 30, weight: 700, lh: 1.3, sample: 'Driving measurable success' },
          { role: 'Sub heading', spec: 'Obvia Expanded · 20 / 28 · 700', px: 20, weight: 700, lh: 1.35, sample: 'Product spotlight' },
          { role: 'Card title', spec: 'Noto Sans · 16 / 24 · 700', px: 16, weight: 700, lh: 1.4, sample: 'InvenSense ICM-42688-P' },
          { role: 'Body', spec: 'Noto Sans · 14 / 22 · 400', px: 14, weight: 400, lh: 1.6, sample: 'A six-axis MEMS motion sensor family with the world’s first BalancedGyro technology and lowest power consumption.' },
          { role: 'Label and chip', spec: 'Noto Sans · 12 / 16 · 600', px: 12, weight: 600, lh: 1.4, sample: 'Recommended sensors' }
        ]
      },
      {
        kind: 'text',
        body: [
          'The scale halves roughly every second step, which is what keeps a page this dense readable: a visitor scanning for a part number can tell a section heading from a card title from a spec line without reading a word of any of them. On mobile the display drops to 28 and the section heading to 22, but every other step holds, so the hierarchy survives the reflow rather than collapsing into one size.'
        ]
      },

      /* ---------- colour ---------- */
      {
        kind: 'swatches',
        title: 'Colour',
        note: 'Sampled from the signed-off screens. The system is deliberately narrow: one blue family doing almost all of the work, a single accent that only ever means "sensing", and status colours that appear nowhere else.',
        groups: [
          {
            name: 'Brand blue',
            use: 'Navigation, primary actions, links and headings. The header runs as a gradient from the deep end to the bright end, which is the only gradient anywhere in the system.',
            items: [
              { name: 'Navy 900', hex: '#113176' },
              { name: 'Navy 800', hex: '#00409D' },
              { name: 'Blue 700', hex: '#1B45A7' },
              { name: 'Blue 600', hex: '#0152BC' },
              { name: 'Blue 500', hex: '#0383FA' }
            ]
          },
          {
            name: 'Signal violet',
            use: 'Reserved for sensing: the wave icons, product tags and category chips. It appears nowhere else, so it never has to compete with an action.',
            items: [
              { name: 'Violet 500', hex: '#C818F4' },
              { name: 'Violet 200', hex: '#E8C4FB' },
              { name: 'Violet 50', hex: '#FCF2FF', line: true }
            ]
          },
          {
            name: 'Surface and ink',
            use: 'A single pale blue carries every alternating band and every card ground, so the page has rhythm without needing borders everywhere.',
            items: [
              { name: 'Blue wash', hex: '#E6EDF7', line: true },
              { name: 'White', hex: '#FFFFFF', line: true },
              { name: 'Ink 900', hex: '#0A0D12' },
              { name: 'Grey 600', hex: '#525252' }
            ]
          },
          {
            name: 'Status',
            use: 'Only on validation and state: a solved thread, a field in error. Never decorative.',
            items: [
              { name: 'Success wash', hex: '#E5F8EF', line: true },
              { name: 'Success line', hex: '#9BE7C3' },
              { name: 'Error wash', hex: '#F7EAEA', line: true },
              { name: 'Error line', hex: '#E3AEB2' }
            ]
          }
        ]
      },

      /* ---------- design system ---------- */
      {
        kind: 'text',
        title: 'The system underneath',
        note: 'This is the part I expect to outlast the visual design.',
        noteArt: 'star-yellow',
        body: [
          'A redesign that stops at screens comes undone within a year. So alongside the pages we built the vocabulary: colour, type, spacing, iconography, and every component in every state, annotated for the engineers who had to build it.',
          'I worked on this with the design system designer. Each component is documented with its variants, its interaction states and its edge cases, and the annotations are written for someone implementing it rather than someone admiring it. Where a component behaves differently on a narrow screen, that behaviour is drawn, not described.'
        ]
      },
      {
        kind: 'grid',
        note: 'Pages from the library. Each tile scrolls on its own; the boards are taller than the room a row can give them.',
        items: [
          { src: 'assets/img/projects/tdk/ds-buttons.webp', caption: 'Buttons: primary, secondary and ghost, in three sizes, across default, hover, active and disabled' },
          { src: 'assets/img/projects/tdk/ds-textinput.webp', caption: 'Text input: label, placeholder, icon and helper variants, with error messaging' },
          { src: 'assets/img/projects/tdk/ds-checkboxes.webp', caption: 'Checkboxes: default, hover, checked, disabled and error, with helper text' },
          { src: 'assets/img/projects/tdk/ds-badges.webp', caption: 'Badges: three sizes and five semantic tones, annotated' },
          { src: 'assets/img/projects/tdk/ds-iconography.webp', caption: 'The icon set: one weight, one grid, drawn for scannability at small sizes' },
          { src: 'assets/img/projects/tdk/ds-homepage-components.webp', caption: 'Page-level patterns: segmented tabs, stats, partner brands, pagination, carousels' },
          { src: 'assets/img/projects/tdk/ds-microinteractions.webp', caption: 'Microinteractions: the eight icons that change state on interaction, paired with their active form', span: true }
        ]
      },

      /* ---------- responsive ---------- */
      {
        kind: 'text',
        title: 'Responsive: not a smaller desktop',
        body: [
          'The site was designed at 1440, 800 and 375, and the narrow layout was drawn rather than derived. A four-across application grid does not become a good phone screen by stacking: the cards get taller than the viewport and the eye loses the pattern, so on narrow screens the same content moves into a carousel with a visible pagination dot row and the section heading shortens to match.',
          'The compare table was the hardest. A spec table cannot reflow into a stack without losing the comparison, which is the entire point of it, so on narrow screens it keeps its structure and scrolls horizontally inside its own container while the page itself never does.'
        ]
      },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/tdk/ui-applications-desktop.webp', caption: 'Applications landing at 1440' },
          { src: 'assets/img/projects/tdk/ui-applications-mobile.webp', device: 'mobile', caption: 'The same page at 375: grid becomes carousel, buttons go full width' }
        ],
        long: true
      },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/tdk/ui-application-detail-desktop.webp', caption: 'Application detail at 1440: one application, end to end' },
          { src: 'assets/img/projects/tdk/ui-application-detail-mobile.webp', device: 'mobile', caption: 'Application detail at 375' }
        ],
        long: true
      },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/tdk/ui-community-desktop.webp', caption: 'Developer community at 1440: filter rail, thread list, solved state' },
          { src: 'assets/img/projects/tdk/ui-community-mobile.webp', device: 'mobile', caption: 'Community at 375: the rail collapses into a filter control' }
        ],
        long: true
      },
      { kind: 'full', src: 'assets/img/projects/tdk/ui-product-mobile.webp', device: 'mobile', caption: 'Product detail at 375: variants, specs, features, documentation and support, in one scroll', long: true },

      /* ---------- decisions ---------- */
      {
        kind: 'split',
        title: 'Decisions worth defending',
        items: [
          { head: 'Proof before pitch', body: 'The stats band sits immediately under the hero. For a partner evaluating supply risk, scale is the argument, so it leads, before any product copy.' },
          { head: 'Specs on the card', body: 'Part cards carry the two or three specs an engineer actually filters on, so comparison happens in the grid instead of across five open tabs.' },
          { head: 'One remembered choice', body: 'The role selector remembers what you picked. A distributor should not have to re-declare themselves on every visit.' },
          { head: 'Filters, not a search box', body: 'The sensor selector asks for application type and sensor type. Free-text search assumes vocabulary the visitor may not share with us.' },
          { head: 'One accent, one meaning', body: 'Violet only ever marks sensing. The moment an accent starts decorating, it stops being able to point at anything.' },
          { head: 'Documentation as a first-class section', body: 'Datasheets, app notes and firmware get their own table on the product page, with version and date. For this audience that table is the page.' }
        ]
      },

      {
        kind: 'stats',
        items: [
          { figure: '30+', label: 'screens designed across the site' },
          { figure: '3', label: 'breakpoints drawn, not derived' },
          { figure: '8', label: 'months, delivered ahead of schedule' }
        ]
      },

      { kind: 'quote', text: 'Consistency is not a coat of paint you add at the end. It is the thing you build first, and then get to keep.' },

      {
        kind: 'live',
        eyebrow: 'It shipped',
        title: 'See it in the wild',
        body: 'The redesign is live, and it is the only place to see all of it. This case study shows a handful of templates out of more than thirty screens; the structure, the component library and the responsive behaviour described above are all running in production.',
        label: 'Open invensense.tdk.com',
        href: 'https://www.invensense.tdk.com/en-us'
      }
    ]
  },

  {
    slug: 'disney-store',
    title: 'Disney Store',
    hero: ['Loyalty,', 'made less', 'boring.'],
    faceCue: 'happy',
    ringCue: 'circle-red',
    client: 'Disney Store · UK',
    tagline: 'People could earn rewards. Understanding them was harder than it needed to be, so joining takes one tap, and leaving is never a trap.',
    category: 'Loyalty programme, UX research and design',
    year: '2026',
    role: 'UI and visual design',
    team: '4 people',
    teamNote: 'Two UX designers, a design director, and me on UI and visual.',
    tools: ['Figma', 'FigJam'],
    platform: 'Responsive web',
    tags: ['UX/UI', 'Web', 'Research'],
    accent: 'blue',
    cover: 'assets/img/covers/disney-store.webp',
    focus: [
      'Research through to a signed-off membership flow',
      'Personalisation that costs the member one question',
      'Designed the way out as carefully as the way in'
    ],
    intro: [
      'Disney Store wanted a free membership club: member pricing, early access to drops, and delivery savings. The commercial case was straightforward. The design problem was not. Loyalty schemes tend to be sold hard at the door and made deliberately difficult to leave, and neither of those behaviours belongs on a Disney property.',
      'I worked on the UI and the visual design: the five states as they are actually built, the components behind them, and the extensions to the Disney library that made them possible. Gradients, the small magical touches the brand needs, and new components where the library did not have one yet. The research and the flow came from the UX designers alongside me.'
    ],
    roleNote: 'Working inside the Disney component library, and the visual design on top of it.',
    introNote: 'The exit is part of the offer.',
    sections: [
      {
        kind: 'text',
        title: 'Where loyalty design usually goes wrong',
        note: 'Sold hard at the door, then made difficult to leave.',
        noteArt: 'squiggle-red',
        body: [
          'The research kept turning up the same two failures. The first is the onboarding wall: a scheme that asks for a profile, preferences and consent before it has demonstrated a single benefit. The second is the exit trap: leaving buried three levels into settings, or hidden behind a support conversation.',
          'Both come from the same mistake, which is treating membership as something extracted from the customer rather than offered to them. So the brief I set myself was narrow: make joining free of homework, and make leaving a normal, visible, one-screen thing.'
        ]
      },
      {
        kind: 'flow',
        title: 'The five states',
        note: 'Every state exists at desktop and mobile. The dotted step is optional. A member can skip it and stay a full member.',
        steps: [
          { label: 'Invitation', sub: 'A prompt with benefits stated plainly' },
          { label: 'Joined', sub: 'Membership active before anything is asked' },
          { label: 'Personalise', sub: 'One question, skippable', optional: true },
          { label: 'Confirmed', sub: 'What we will do with the answer' },
          { label: 'Manage', sub: 'Theme, perks and a visible way out' }
        ]
      },
      {
        kind: 'journey',
        title: 'The member journey',
        note: 'Mapped against what someone is actually thinking at each step, and what the design does about it.',
        stages: [
          {
            phase: 'Sees the invitation',
            doing: 'Mid-shop, hits a prompt offering a free club.',
            feeling: '"What is this going to cost me, money or my inbox?"',
            move: 'Benefits listed in one line each. Free stated up front. Terms linked, not buried.'
          },
          {
            phase: 'Joins',
            doing: 'One tap. Membership is live immediately.',
            feeling: 'Relief that nothing else was demanded.',
            move: 'The confirmation leads with "You\'re in". The reward arrives before any request does.'
          },
          {
            phase: 'Personalises',
            doing: 'Picks a favourite corner of the Disney universe.',
            feeling: 'Curious, but wary of a long form.',
            move: 'Exactly one question, six visual choices, an explicit "Skip for now" of equal weight.'
          },
          {
            phase: 'Lives with it',
            doing: 'Shops with member pricing and early access.',
            feeling: 'Wants to know the choice actually did something.',
            move: 'The chosen theme is shown and editable in My Account, so the answer stays visibly connected to the experience.'
          },
          {
            phase: 'Leaves',
            doing: 'Decides the emails or the club are not for them.',
            feeling: 'Braced for a fight.',
            move: 'Leave sits in plain sight. One confirmation, honest about what is lost, and rejoining is offered in the same breath.'
          }
        ]
      },
      {
        kind: 'mocks',
        items: [
          { device: 'desktop', html: MOCK_JOIN, caption: 'The invitation: benefits first, one action, terms visible' },
          { device: 'desktop', html: MOCK_WELCOME, caption: 'Membership is already active before personalisation is offered' }
        ]
      },
      {
        kind: 'text',
        title: 'Personalisation that costs one question',
        note: 'Every extra field costs a member, right when they were happiest to say yes.',
        noteArt: 'arrow-loop-warm',
        body: [
          'The commercial ask was a preference profile. The research said every extra field would cost us members at exactly the moment they were most willing to say yes. So the profile became a single question, "Who\'s your favourite in the Disney universe?", answered by picking one of six worlds rather than filling anything in.',
          'Six options was the ceiling: enough to feel like a real choice, few enough to scan in one pass. The sixth, "A Bit of Everything", exists so that nobody has to lie to get past the screen. And "Skip for now" is given the same visual weight as Continue, because a member who skips is still a member.'
        ]
      },
      { kind: 'mock', device: 'desktop', html: MOCK_PICKER, caption: 'The personalisation picker: one question, six worlds, an honest way past it' },
      {
        kind: 'points',
        title: 'Decisions I would defend in a review',
        items: [
          'Membership activates before personalisation is requested. The benefit is never held hostage to the data.',
          '"Skip for now" is styled as a peer of the primary action, not as a grey afterthought.',
          'The confirmation screen says what the answer will be used for, in one sentence, in plain language.',
          'Communications consent is surfaced with a link to preferences rather than pre-ticked and hoped for.',
          'Leaving is a top-level item in My Account, and the confirmation states exactly which benefits stop.'
        ]
      },
      {
        kind: 'mocks',
        items: [
          { device: 'desktop', html: MOCK_DONE, caption: 'Confirmation, closing the loop on what the choice does' },
          { device: 'desktop', html: MOCK_LEAVE, caption: 'Offboarding: honest about the loss, and rejoining offered in the same breath' }
        ]
      },
      {
        kind: 'text',
        title: 'Where the club actually lives',
        body: [
          'Day to day, Disney Club is not a modal. It is a row in My Account, sitting alongside order history and the wish list. That is where the chosen theme can be changed, where the three active perks are restated, and where leaving is one visible link rather than a hunt.',
          'Putting the exit on the same screen as the benefits was the argument I had to make most often. It reads as risky. In practice it is the thing that makes the rest of the club believable.'
        ]
      },
      { kind: 'mock', device: 'desktop', html: MOCK_ACCOUNT, caption: 'My Account: theme, perks and the way out, all on one screen' },
      { kind: 'quote', text: 'A membership you can leave in one tap is one people feel safe joining in one tap. The exit is part of the offer.' }
    ]
  }
,

  {
    slug: 'pregnancy-app',
    title: 'Pregnancy App',
    hero: ['Designing for', 'a body that', 'changes weekly.'],
    faceCue: 'calm',
    ringCue: 'circle-red',
    tagline: 'A week-by-week companion for pregnancy: health tracking, personalised guidance and a check-in that takes minutes, not forms.',
    category: 'Mobile app design',
    year: '2026',
    role: 'End to end product design',
    team: '3 people',
    teamNote: 'A UX designer, a principal architect, and me on design.',
    tools: ['Figma', 'FigJam'],
    platform: 'Mobile',
    tags: ['UX/UI', 'Mobile'],
    accent: 'red',
    cover: 'assets/img/covers/pregnancy-app.webp',
    wip: true,
    roleNote: 'The design system, the visual theme and every screen, start to finish.',
    intro: [],
    sections: [
      {
        kind: 'text',
        title: 'Where it stands',
        body: [
          'The client is a doctor. She has been close to the work throughout, and she is delighted with how it turned out.'
        ]
      }
    ]
  }

];

/* =========================================================
   CLIENTS, the brands the work was for.

   `w` is the one sizing knob: the width the mark is drawn at, in px.
   Height follows the artwork's own ratio, so the numbers are tuned for
   optical weight rather than a shared cap height. A nine-to-one wordmark
   like TDK needs far more width than a two-to-one block like SAP to read
   as the same size on the page.

   Order is set for rhythm, not alphabetically: the heavy marks are spaced
   out so no part of the wall clumps.
   ========================================================= */

const CLIENTS = [
  { name: 'Disney store', logo: 'assets/img/clients/disney-store.png', w: 132 },
  { name: 'SAP',          logo: 'assets/img/clients/sap.svg',          w: 64 },
  { name: 'TDK',          logo: 'assets/img/clients/tdk.svg',          w: 178 },
  { name: 'Abbott',       logo: 'assets/img/clients/abbott.png',       w: 124 },
  { name: 'TVS',          logo: 'assets/img/clients/tvs.svg',          w: 132 },
  { name: 'Parle',        logo: 'assets/img/clients/parle.png',        w: 82 },
  { name: 'Hero',         logo: 'assets/img/clients/hero.svg',         w: 96 },
  { name: 'CEA',          logo: 'assets/img/clients/cea.png',          w: 148 },
  { name: 'OnMed',        logo: 'assets/img/clients/onmed.png',        w: 112 },
  { name: 'Popular Bank', logo: 'assets/img/clients/popular.png',      w: 130 }
];

/* =========================================================
   PROCESS, the five steps shown on the home page.

   One line each. The longer descriptions belong on About, not here.
   ========================================================= */

const PROCESS = [
  { no: '01', name: 'Understand',
    line: 'Before anything gets drawn, I work out who this is for and what they came to do.' },
  { no: '02', name: 'Map',
    line: 'I lay out the journey before I make it look like anything.' },
  { no: '03', name: 'Design',
    line: 'The interface itself. Clean, considered, and built to the brand rather than to my taste.' },
  { no: '04', name: 'Systemise',
    line: 'I build the structure that keeps it consistent once I have moved on.' },
  { no: '05', name: 'Ship and refine',
    line: 'I stay with the work through build, review and whatever comes after.' }
];

/* =========================================================
   TOOLKIT, what shows up in the design toolkit section.
   No percentage bars. Just the work, named.
   ========================================================= */

const TOOLKIT = [
  { name: 'UI design',                note: 'Layout, hierarchy, states' },
  { name: 'Design systems',           note: 'Components, variants, and the logic underneath' },
  { name: 'User flows',               note: 'The path, before the pixels' },
  { name: 'Information architecture', note: 'Where everything lives, and why' },
  { name: 'Prototyping',              note: 'Test it before you build it' },
  { name: 'Visual design',            note: 'Where I started' },
  { name: 'AI tools',                 note: 'Part of how I work now' }
];

/* The tools, kept separate from the craft. */
const TOOLS = ['Figma', 'FigJam', 'Adobe Creative Cloud', 'SAP MDK', 'AI tools'];

/* =========================================================
   GALLERY, the photographs on the About page.

   Drop files in assets/img/life/, run scripts/image_sizes.py, and list
   them here. An empty array simply hides the gallery. The portrait beside
   the introduction is set directly in about.html.
   ========================================================= */

const GALLERY = [
  { src: 'assets/img/life/framed-portraits.webp',
    caption: 'Line portraits, drawn and framed as gifts.',
    alt: 'Four framed black and white line drawings of couples and families, held in one hand.' },
  { src: 'assets/img/life/colouring-book.webp',
    caption: 'Still filling in colouring books.',
    alt: 'An open colouring book of small animal characters, coloured in, on a windowsill beside two potted plants.' },
  { src: 'assets/img/life/digital-illustration.webp',
    caption: 'Mid character, on the iPad.',
    alt: 'An iPad showing a half finished illustration of a duck character in a bubble tea cup, with the stylus resting beside it.' },
  { src: 'assets/img/life/painting-signage.webp',
    caption: 'Hand painting signage for an event.',
    alt: 'Muskan sitting cross legged on a mat, painting a large teal wooden sign reading We Came, We Gathered, We Vibed.' },
  { src: 'assets/img/life/vacation-sign.webp',
    caption: 'Vacation calories do not count.',
    alt: 'A hand painted red tomato shaped board reading Vacation Calories Do Not Count, against a fringed backdrop.' },
  { src: 'assets/img/life/event-install.webp',
    caption: 'The whole set, installed.',
    alt: 'An event space filled with hand painted signs, doors, dreamcatchers and a large painted game board.' },
  { src: 'assets/img/life/mountains.webp',
    caption: 'Somewhere with a view.',
    alt: 'A wide green valley below forested mountains under a bright sky with scattered cloud.' }
];

if (typeof window !== 'undefined') {
  window.PROJECTS = PROJECTS;
  window.CLIENTS = CLIENTS;
  window.PROCESS = PROCESS;
  window.TOOLKIT = TOOLKIT;
  window.TOOLS = TOOLS;
  window.GALLERY = GALLERY;
}
