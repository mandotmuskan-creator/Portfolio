/* =========================================================
   data.js — the single source of truth for every project.

   TO ADD A PROJECT
   1. Drop images in  assets/img/projects/
   2. Copy one block below, change the values, put it in the
      order you want it to appear.
   That's it — the home rope, the work grid and the case study
   page all read from this array.

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
   tags      array — powers the filters on /work.html
   accent    card colour: "navy" | "blue" | "cream" | "red"
   cover     card image
   coverFit  "cover" (fill the card) | "top" (pin to the top)
   intro     array of paragraphs — the overview
   roleNote  the "My Role" line from the deck
   sections  array of { kind, ... } blocks, rendered in order:
               { kind:'text',   title, body:[..] }
               { kind:'points', title, items:[..] }
               { kind:'full',   src, caption, frame:'browser'|'plain', long:true }
               { kind:'duo',    items:[{src,caption}, {src,caption}] }
               { kind:'phones', items:[{src,caption}] }
               { kind:'quote',  text }
   ========================================================= */

const PROJECTS = [

  {
    slug: 'tdk-invensense',
    title: 'TDK InvenSense',
    client: 'TDK · InvenSense',
    tagline: 'A sensor giant’s website, rebuilt around clarity — and a design system to keep it that way.',
    category: 'Website Redesign & Design System',
    year: '2025',
    role: 'Visual Designer',
    tools: ['Figma'],
    platform: 'Responsive web',
    tags: ['Web', 'Design System'],
    accent: 'navy',
    cover: 'assets/img/projects/tdk-06.jpg',
    coverFit: 'top',
    intro: [
      'The project involved redesigning the website for InvenSense (TDK) to improve usability, visual consistency, and overall user experience. The existing platform was restructured to create a more intuitive navigation flow and a cleaner interface, making it easier for users to explore products and information. A key focus was on making the website fully responsive, ensuring a seamless experience across desktop, tablet, and mobile devices.',
      'Along with the redesign, a comprehensive design system was created to standardize components, typography, colors, and interaction patterns. This helped maintain consistency across the platform and made future updates more scalable and efficient. The overall approach focused on aligning the design with modern UI standards while keeping it functional, structured, and user-friendly.'
    ],
    roleNote: 'Worked on redesigning the website by creating responsive UI screens and contributing to the development of a scalable design system.',
    sections: [
      {
        kind: 'points',
        title: 'What I did',
        items: [
          'Designed clean and structured UI with a focus on clarity and usability.',
          'Simplified complex data into intuitive tables and easy-to-scan layouts and bento grids.',
          'Created responsive components and contributed to the design system.'
        ]
      },
      {
        kind: 'text',
        title: 'A homepage that explains a whole company',
        body: [
          'InvenSense makes sensors that end up inside drones, cars, headsets and smart homes — a catalogue that is genuinely hard to summarise. The homepage had to introduce the breadth without drowning anyone in it.',
          'The answer was rhythm: a confident hero, proof points right underneath, then a bento grid where each application area gets its own tile and its own way in. You can scan it in five seconds or read it for five minutes.'
        ]
      },
      { kind: 'full', src: 'assets/img/projects/tdk-06.jpg', caption: 'Homepage — full scroll', frame: 'browser', long: true },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/tdk-07.jpg', caption: 'Product detail — specs, variants and comparison' },
          { src: 'assets/img/projects/tdk-08.jpg', caption: 'Responsive behaviour on narrow screens' }
        ],
        long: true
      },
      {
        kind: 'text',
        title: 'Then: the system underneath',
        body: [
          'A redesign that stops at screens gets undone within a year. So alongside the pages, we built the vocabulary — colour, type, spacing, and every component in every state, annotated for the developers who had to build it.',
          'Each component was documented with its variants, its behaviour and its edge cases. Not a swatch page: a working reference.'
        ]
      },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/tdk-04.jpg', caption: 'Colour foundations' },
          { src: 'assets/img/projects/tdk-05.jpg', caption: 'Type scale across desktop and mobile' }
        ],
        long: true
      },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/tdk-01.jpg', caption: 'Badges — components and annotations' },
          { src: 'assets/img/projects/tdk-02.jpg', caption: 'Checkboxes — default, checked, error, disabled' }
        ]
      },
      { kind: 'full', src: 'assets/img/projects/tdk-03.jpg', caption: 'Buttons — primary, secondary and ghost, across every state', frame: 'plain', long: true },
      { kind: 'quote', text: 'Consistency isn’t a coat of paint you add at the end. It’s the thing you build first and then get to keep.' }
    ]
  },

  {
    slug: 'capshift-advisor-hub',
    title: 'CapShift Advisor Hub',
    client: 'CapShift',
    tagline: 'Making impact investing legible for advisors who log in twice a month.',
    category: 'Product Redesign & Design System',
    year: '2025',
    role: 'Visual Designer — design lead on the redesign',
    tools: ['Figma'],
    platform: 'Web app',
    tags: ['Web', 'Design System'],
    accent: 'blue',
    cover: 'assets/img/projects/capshift-01.jpg',
    coverFit: 'cover',
    intro: [
      'I led the redesign of an existing advisory platform with the goal of making it more affordable, more approachable, and far more intuitive for a new category of “secondary advisors.” These users aren’t power users — they log in only a few times a month — so the experience needed to deliver high-value insights without requiring steep learning curves.',
      'To achieve this, the product was restructured around clear paths rather than a dense feature set. That structure not only simplified navigation but also encouraged discovery and confidence in using the product.',
      'A major part of the initiative involved building a modern, lightweight design system from the ground up.'
    ],
    roleNote: 'The legacy application was re-imagined into four streamlined, path-based interaction models, allowing users to explore and complete tasks effortlessly.',
    sections: [
      {
        kind: 'points',
        title: 'What I did',
        items: [
          'Refined the visual language using brand and supporting colors to create a more approachable, lightweight, and engaging interface.',
          'Designed clean, modern layouts with clear hierarchy to make insights easy to scan and reduce cognitive effort for infrequent users.'
        ]
      },
      {
        kind: 'text',
        title: 'Four doors instead of one long corridor',
        body: [
          'The old application asked you to already know what you wanted. The new entry screen asks the opposite question — what are you here for? — and offers four honest answers: understand how CapShift works with your firm, research a theme, respond to an RFP, or search for an investment.',
          'Someone who signs in every few weeks doesn’t need to remember where anything lives. They just need the door with their name on it.'
        ]
      },
      { kind: 'full', src: 'assets/img/projects/capshift-01.jpg', caption: 'The welcome screen — four paths and one prompt box', frame: 'browser' },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/capshift-03.jpg', caption: 'Guided questions for people who don’t know what to ask yet' },
          { src: 'assets/img/projects/capshift-02.jpg', caption: 'Answers arrive with their reference documents attached' }
        ]
      },
      {
        kind: 'text',
        title: 'Insight you can actually skim',
        body: [
          'Advisory content is long by nature. The layout does the compressing: generous line length, a calm type scale, and reference documents pulled out to the side so the answer never has to compete with its sources.',
          'The palette was lightened across the board — brand blue kept for emphasis, supporting tones doing the quiet structural work. The result reads less like enterprise software and more like something you’d willingly open.'
        ]
      },
      { kind: 'full', src: 'assets/img/projects/capshift-04.jpg', caption: 'Sourcing reports, shortlists and monitoring in one workspace', frame: 'browser' }
    ]
  },

  {
    slug: 'parle-one',
    title: 'Parle One',
    client: 'Parle · SAP Platform',
    tagline: 'Wholesale order management, folded down to fit in one hand.',
    category: 'Enterprise Mobile App',
    year: '2024',
    role: 'Visual Designer',
    tools: ['Figma'],
    platform: 'Mobile (SAP)',
    tags: ['Mobile', 'Enterprise'],
    accent: 'red',
    cover: 'assets/img/projects/parle-03.jpg',
    coverFit: 'top',
    intro: [
      'Designed a streamlined mobile application for wholesalers to efficiently manage orders, track statuses, handle approvals, and oversee inventory. The goal was to simplify day-to-day operations by creating an intuitive experience that allows users to quickly access key information and complete tasks with ease.',
      'The design focused on improving clarity, reducing effort, and ensuring a smooth flow across different stages of order management.'
    ],
    roleNote: 'Followed SAP design guidelines to transform existing web designs into responsive mobile interfaces, focusing on creating intuitive, user-friendly experiences.',
    sections: [
      {
        kind: 'points',
        title: 'What I did',
        items: [
          'Adapted complex workflows into clean, mobile-friendly layouts with clear hierarchy.',
          'Ensured consistency by aligning with SAP design standards and visual patterns.',
          'Designed for clarity and ease of use, keeping interactions simple and efficient.'
        ]
      },
      {
        kind: 'text',
        title: 'The constraint was the brief',
        body: [
          'SAP has opinions. Working inside its design guidelines meant the interesting work wasn’t in inventing a look — it was in deciding what earns a place on a 390-pixel-wide screen when the desktop version had a whole table to play with.',
          'Every approval card answers the three questions a wholesaler actually asks: who, how far along, and what do I do about it. Application number, wholesaler code and approval count sit in a fixed order on every card, so the eye learns the shape once and never has to hunt again.'
        ]
      },
      { kind: 'phones', items: [
        { src: 'assets/img/projects/parle-01.jpg', caption: 'Application home' },
        { src: 'assets/img/projects/parle-03.jpg', caption: 'Pending requests' },
        { src: 'assets/img/projects/parle-04.jpg', caption: 'Wholesaler detail' },
        { src: 'assets/img/projects/parle-05.jpg', caption: 'Compliance documents' }
      ]},
      {
        kind: 'text',
        title: 'Decisions where the thumb already is',
        body: [
          'Approve, reject and hold are the whole point of the app, so they live at the bottom of the detail screen — reachable, unambiguous, and colour-coded consistently with the rest of the SAP estate.',
          'Everything above them is evidence: status, dates, approval progress, and the documents you need to be sure before you tap.'
        ]
      }
    ]
  },

  {
    slug: 'popular-bank-marketplace',
    title: 'Popular Bank Marketplace',
    client: 'Popular Bank',
    tagline: 'Five splash screens, five reasons to keep going.',
    category: 'Illustration & Onboarding UI',
    year: '2024',
    role: 'Visual Designer',
    tools: ['Figma', 'Illustrator'],
    platform: 'Mobile',
    tags: ['Mobile', 'Illustration'],
    accent: 'blue',
    cover: 'assets/img/projects/popular-04.jpg',
    coverFit: 'top',
    intro: [
      'The project involved designing splash screens for a banking marketplace app that allows users to explore products, make transactions, and manage their finances. The goal was to create an engaging entry experience that introduces key features of the app in a clear and visually appealing way.',
      'The screens were designed to capture attention while maintaining clarity, ensuring users get a quick understanding of the app’s offerings from the very first interaction.'
    ],
    roleNote: 'Designed high-fidelity splash screens focusing on visual hierarchy, color, and clarity.',
    sections: [
      {
        kind: 'points',
        title: 'What I did',
        items: [
          'Designed each splash screen around a specific feature, using custom illustrations to visually communicate its purpose.',
          'Used a vibrant mix of 2D and 3D styles to make screens feel engaging while maintaining clarity and focus.',
          'Aligned visuals with brand guidelines while ensuring illustrations felt relatable and easy to understand for users.'
        ]
      },
      {
        kind: 'text',
        title: 'One idea per screen',
        body: [
          'Onboarding fails when it tries to say everything at once. Each of the five screens carries exactly one promise — discover deals, shop smarter, track savings, earn cash back, redeem in a tap — and one illustration built to carry it.',
          'The illustrations mix flat 2D shapes with soft dimensional lighting, so the coupons and badges feel like objects you could pick up without ever tipping into novelty.'
        ]
      },
      { kind: 'phones', items: [
        { src: 'assets/img/projects/popular-04.jpg', caption: 'Discover exclusive deals' },
        { src: 'assets/img/projects/popular-05.jpg', caption: 'Shop smarter, earn more' },
        { src: 'assets/img/projects/popular-02.jpg', caption: 'Track your savings over time' },
        { src: 'assets/img/projects/popular-03.jpg', caption: 'Cash back rewards in your pocket' },
        { src: 'assets/img/projects/popular-01.jpg', caption: 'Redeem offers with a tap' }
      ]},
      {
        kind: 'text',
        title: 'Holding the brand while having fun',
        body: [
          'Popular Bank’s blue does the anchoring on every screen. The warmth — butter yellow, blush, mint — is spent only on the illustration, which keeps five very different scenes recognisably one family.',
          'Skip stays visible the whole way through. Onboarding you can leave is onboarding people finish.'
        ]
      }
    ]
  },

  {
    slug: 'healthymama',
    title: 'healthymama',
    client: 'healthymama',
    tagline: 'A pregnancy companion that stays calm on the days you can’t.',
    category: 'Health & Wellness App',
    year: '2026',
    role: 'Visual Designer',
    tools: ['Figma'],
    platform: 'Mobile',
    tags: ['Mobile', 'Design System', 'Illustration'],
    accent: 'cream',
    cover: 'assets/img/projects/mama-05.jpg',
    coverFit: 'top',
    intro: [
      'Designed intuitive and engaging interfaces for a women’s health and pregnancy tracking app featuring an AI chatbot, Natalie, to provide personalized guidance and support throughout conception, pregnancy, and early motherhood.',
      'The app enables users to track pregnancy weekly, monitor baby development, manage periods, save milestones and photos, and access wellness content and videos.'
    ],
    roleNote: 'Focused on creating a calming, user-friendly experience with clear visual hierarchy and emotionally supportive design.',
    sections: [
      {
        kind: 'points',
        title: 'What I did',
        items: [
          'Built the visual language from a moodboard through to a full colour and type foundation — pearl, peach, burgundy, light green and sage, set in Manrope and Syne.',
          'Designed the weekly tracking, health snapshot, nutrition and milestone experiences around one calm, scannable hierarchy.',
          'Gave Natalie, the AI companion, a presence that feels supportive rather than clinical.',
          'Delivered the work as components, variants and tokens so the app can grow without drifting.'
        ]
      },
      {
        kind: 'text',
        title: 'Starting with feeling, not screens',
        body: [
          'Pregnancy apps get this wrong in one of two directions: too clinical, or too saccharine. The moodboard was the argument for a third option — soft light, botanical greens, blush and pearl, photography that looks like a real morning rather than a stock one.',
          'That mood then got turned into something buildable: five named colour families with full tints, and a type pairing of Manrope for the reading and Syne for the moments that deserve a little character.'
        ]
      },
      {
        kind: 'duo',
        items: [
          { src: 'assets/img/projects/mama-01.jpg', caption: 'Moodboard — the feeling, before the pixels' },
          { src: 'assets/img/projects/mama-02.jpg', caption: 'Colour palette and typography' }
        ]
      },
      { kind: 'full', src: 'assets/img/projects/mama-03.jpg', caption: 'Full tint ramps for pearl, peach, burgundy, light green and sage', frame: 'plain' },
      {
        kind: 'text',
        title: 'One glance, on a hard morning',
        body: [
          'The home screen is built for the version of you that is tired. Due date, average size and average weight sit together at the top with an illustration of the baby at that week. The week strip underneath moves you through time without a calendar.',
          'Below that, a health snapshot: blood pressure, weight, glucose — each with its own reassurance line, so the numbers never arrive without context.'
        ]
      },
      { kind: 'phones', items: [
        { src: 'assets/img/projects/mama-05.jpg', caption: 'Home — week, snapshot, content' },
        { src: 'assets/img/projects/mama-06.jpg', caption: 'Nutrition and mood check-in' },
        { src: 'assets/img/projects/mama-07.jpg', caption: 'Milestones you write yourself' },
        { src: 'assets/img/projects/mama-08.jpg', caption: 'Insights and mama moments' },
        { src: 'assets/img/projects/mama-09.jpg', caption: 'Ask Natalie' }
      ]},
      {
        kind: 'text',
        title: 'Milestones are the product',
        body: [
          'Prenatal scan. First kick. The app’s real job is to be the place those go — dated, titled in the user’s own words, with the photos attached. Everything else is scaffolding around that.',
          'Which is why milestones can be exported as a storybook, and why the entry form is three fields and a photo picker rather than a form.'
        ]
      },
      { kind: 'full', src: 'assets/img/projects/mama-04.jpg', caption: 'Components, variants and tokens — the system behind the calm', frame: 'plain', long: true },
      { kind: 'quote', text: 'Emotionally supportive design isn’t decoration. It’s deciding what a number means before you show it to someone.' }
    ]
  }

];

if (typeof window !== 'undefined') window.PROJECTS = PROJECTS;
