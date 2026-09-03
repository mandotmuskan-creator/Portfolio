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
    category: 'End-to-end web redesign & design system',
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
      'InvenSense makes the motion and sound sensors inside drones, cars, headsets, hearing aids and smart homes. The catalogue is enormous and deeply technical, and the old site asked every visitor to already know what they were looking for. Engineers, procurement partners and distributors all landed in the same undifferentiated place.',
      'I worked on the UI and the design system. The interface was built from scratch across every breakpoint and state, and I worked alongside the design system designer on the component library the site now runs on. Eight of us, eight months, delivered ahead of schedule.'
    ],
    roleNote: 'Supporting the design system, and building the UI from scratch.',
    introNote: 'Three audiences. One front door. That was the whole problem.',
    sections: [
      {
        kind: 'text',
        title: 'The problem was not the catalogue. It was the front door.',
        note: 'Nobody arrives thinking "I need a six-axis IMU".',
        noteArt: 'arrow-loop',
        body: [
          'A sensor company sells to at least three very different people. An engineer wants a datasheet and an evaluation board. A partner wants roadmap and supply confidence. A distributor wants stock, pricing and collateral. The old homepage tried to speak to all three at once, so it spoke to none of them clearly.',
          'The redesign starts by admitting that. Instead of one funnel, the site opens into recognisable routes. Browse by what you are building, or by the sensor you already know you need. It then names the three audiences outright, low on the page, where someone who has not yet found their way can self-select.'
        ]
      },
      {
        kind: 'journey',
        title: 'Who we were designing for',
        note: 'Three audiences, mapped in FigJam before a single screen was drawn. The homepage sections map one-to-one onto these.',
        stages: [
          {
            phase: 'Developer / Engineer',
            doing: 'Comparing part numbers, hunting datasheets, checking whether an eval board exists.',
            feeling: 'Impatient. Already knows the domain, resents marketing pages.',
            move: 'Sensor selector with application and sensor-type filters. Specs surfaced on the card, not two clicks in.'
          },
          {
            phase: 'OEM / Partner',
            doing: 'Assessing whether TDK can support a product line at volume.',
            feeling: 'Cautious. Needs proof before a conversation starts.',
            move: 'A measurable-success band: 8+ billion sensors shipped, 500+ products, 15,000+ patents, plus named partner brands.'
          },
          {
            phase: 'Distributor',
            doing: 'Finding inventory, pricing and ready-made collateral to sell on.',
            feeling: 'Transactional. Wants the shortest path to assets.',
            move: 'A dedicated resource path with its own entry card and a remembered choice for return visits.'
          }
        ]
      },
      {
        kind: 'points',
        title: 'What I did',
        items: [
          'Built the interface from scratch, working from the flows and structure the UX team set.',
          'Designed the signed-off responsive UI at 1440, 800 and 375, with behaviour notes on each breakpoint.',
          'Built and documented components (colour, type, badges, checkboxes, buttons) with every state and edge case.',
          'Worked with the design system designer on the library the rest of the team now builds from.',
          'Ran consistency passes across the page set as it grew.'
        ]
      },
      { kind: 'full', src: 'assets/img/projects/tdk-06.jpg', caption: 'Signed-off homepage, the full desktop scroll', frame: 'browser', long: true },
      {
        kind: 'text',
        title: 'A bento grid that does real work',
        body: [
          'The middle of the page had to carry the breadth of the catalogue without turning into a wall of categories. The answer was a bento grid where each tile is an application (presence detection, smart locks, automotive safety, wearables) rather than a product family.',
          'People rarely arrive thinking "I need a six-axis IMU". They arrive thinking "I am building a smart lock". The tabs above the grid let you switch to browsing by sensor once you do know, so the expert route is never buried under the beginner one.'
        ]
      },
      {
        kind: 'split',
        title: 'Decisions worth defending',
        items: [
          { head: 'Proof before pitch', body: 'The stats band sits immediately under the hero. For a partner evaluating supply risk, scale is the argument, so it leads, before any product copy.' },
          { head: 'Specs on the card', body: 'Part cards carry the two or three specs an engineer actually filters on, so comparison happens in the grid instead of across five open tabs.' },
          { head: 'One remembered choice', body: 'The role selector remembers what you picked. A distributor should not have to re-declare themselves on every visit.' },
          { head: 'Filters, not a search box', body: 'The sensor selector asks for application type and sensor type. Free-text search assumes vocabulary the visitor may not share with us.' }
        ]
      },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/tdk-07.jpg', caption: 'Product detail: specs, variants and comparison' },
          { src: 'assets/img/projects/tdk-08.jpg', caption: 'The same page reflowed for narrow screens' }
        ],
        long: true
      },
      {
        kind: 'text',
        title: 'Then: the system underneath',
        note: 'This is the part I expect to outlast the visual design.',
        noteArt: 'star-yellow',
        body: [
          'A redesign that stops at screens comes undone within a year. So alongside the pages we built the vocabulary: colour, type, spacing, and every component in every state, annotated for the engineers who had to build it.',
          'Each component was documented with its variants, its behaviour and its edge cases: not a swatch page, a working reference. It is the part of this project I expect to outlast the visual design.'
        ]
      },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/tdk-04.jpg', caption: 'Colour foundations and usage rules' },
          { src: 'assets/img/projects/tdk-05.jpg', caption: 'Type scale across desktop and mobile' }
        ],
        long: true
      },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/tdk-01.jpg', caption: 'Badges: variants and annotations' },
          { src: 'assets/img/projects/tdk-02.jpg', caption: 'Checkboxes: default, checked, error, disabled' }
        ]
      },
      { kind: 'full', src: 'assets/img/projects/tdk-03.jpg', caption: 'Buttons: primary, secondary and ghost, across every state', frame: 'plain', long: true },
      { kind: 'quote', text: 'Consistency is not a coat of paint you add at the end. It is the thing you build first, and then get to keep.' }
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
  window.PROCESS = PROCESS;
  window.TOOLKIT = TOOLKIT;
  window.TOOLS = TOOLS;
  window.GALLERY = GALLERY;
}
