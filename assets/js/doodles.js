/* =========================================================
   doodles.js
   Every illustration on this site is a hand-drawn SVG path.
   No image assets, no icon fonts — just ink.

   Use in markup:  <span data-doodle="cup"></span>
   Or in code:     DOODLE.cup
   ========================================================= */

const DOODLE = {

  /* ---------- marks & punctuation ---------- */

  star: `<svg viewBox="0 0 40 40" class="doodle" aria-hidden="true">
    <path class="stroke" d="M20 4 C21 14 25 18 36 20 C25 22 21 26 20 36 C19 26 15 22 4 20 C15 18 19 14 20 4Z"/>
  </svg>`,

  sparkle: `<svg viewBox="0 0 40 40" class="doodle" aria-hidden="true">
    <path class="stroke" d="M20 6 L20 34 M6 20 L34 20 M10 10 L30 30 M30 10 L10 30"/>
  </svg>`,

  heart: `<svg viewBox="0 0 44 40" class="doodle" aria-hidden="true">
    <path class="stroke" d="M22 35 C6 24 3 16 6 10 C9 4 18 4 22 12 C26 4 35 4 38 10 C41 16 38 24 22 35Z"/>
  </svg>`,

  spiral: `<svg viewBox="0 0 44 44" class="doodle" aria-hidden="true">
    <path class="stroke" d="M22 22 C22 19 25 18 27 20 C31 23 29 30 23 31 C15 32 10 25 12 17 C15 6 27 2 36 8"/>
  </svg>`,

  scribble: `<svg viewBox="0 0 90 44" class="doodle" aria-hidden="true">
    <path class="stroke" d="M4 30 C14 6 20 40 30 16 C38 -2 42 38 52 20 C60 5 64 36 74 22 C80 14 84 22 87 18"/>
  </svg>`,

  /* ---------- arrows ---------- */

  arrowCurveR: `<svg viewBox="0 0 120 64" class="doodle" aria-hidden="true">
    <path class="stroke" d="M6 14 C34 2 74 6 100 34"/>
    <path class="stroke" d="M86 26 C94 30 99 33 101 36 C97 39 92 44 90 51"/>
  </svg>`,

  arrowCurveL: `<svg viewBox="0 0 120 64" class="doodle" aria-hidden="true">
    <path class="stroke" d="M114 14 C86 2 46 6 20 34"/>
    <path class="stroke" d="M34 26 C26 30 21 33 19 36 C23 39 28 44 30 51"/>
  </svg>`,

  /* a curl then a flick — the one that points at things */
  arrowCurl: `<svg viewBox="0 0 116 82" class="doodle" aria-hidden="true">
    <path class="stroke" d="M6 12 C32 2 52 14 46 30 C41 43 24 43 25 31 C26 20 45 18 60 30 C74 41 88 50 104 54"/>
    <path class="stroke" d="M90 44 C96 48 101 52 105 55 C99 58 93 63 90 70"/>
  </svg>`,

  arrowLoop: `<svg viewBox="0 0 90 120" class="doodle" aria-hidden="true">
    <path class="stroke" d="M18 6 C40 20 22 40 34 54 C44 66 62 62 66 82 C68 94 60 104 50 110"/>
    <path class="stroke" d="M60 100 C56 106 52 110 50 112 C46 108 40 104 33 102"/>
  </svg>`,

  arrowDown: `<svg viewBox="0 0 44 90" class="doodle" aria-hidden="true">
    <path class="stroke" d="M22 6 C18 26 26 46 21 76"/>
    <path class="stroke" d="M10 62 C14 68 19 74 21 80 C24 73 30 67 35 63"/>
  </svg>`,

  arrowRight: `<svg viewBox="0 0 96 40" class="doodle" aria-hidden="true">
    <path class="stroke" d="M6 20 C28 16 56 24 86 19"/>
    <path class="stroke" d="M70 8 C76 12 82 17 88 19 C81 22 75 28 71 33"/>
  </svg>`,

  /* the restrained one — case study pages use this instead of a doodle pile */
  arrowTiny: `<svg viewBox="0 0 40 24" class="doodle" aria-hidden="true">
    <path class="stroke stroke-thin" d="M4 12 C14 10 24 14 35 12"/>
    <path class="stroke stroke-thin" d="M28 5 C31 8 34 11 36 12 C33 14 30 17 28 20"/>
  </svg>`,

  arrowElbow: `<svg viewBox="0 0 70 70" class="doodle" aria-hidden="true">
    <path class="stroke stroke-thin" d="M8 8 C10 30 16 46 40 52"/>
    <path class="stroke stroke-thin" d="M32 42 C36 47 40 50 44 53 C38 56 34 60 32 66"/>
  </svg>`,

  /* ---------- clumsy things ---------- */

  cup: `<svg viewBox="0 0 108 104" class="doodle" aria-hidden="true">
    <path class="stroke" d="M20 30 C20 27 22 26 25 26 L73 26 C76 26 78 27 78 30 L73 79 C72 86 67 90 60 90 L38 90 C31 90 26 86 25 79Z"/>
    <path class="stroke" d="M78 40 C93 37 100 45 99 54 C98 64 90 70 74 68"/>
    <path class="stroke stroke-thin" d="M38 16 C34 10 42 7 38 1 M60 16 C56 10 64 7 60 1"/>
  </svg>`,

  puddle: `<svg viewBox="0 0 130 46" class="doodle" aria-hidden="true">
    <path class="stroke" d="M8 26 C12 10 34 4 52 9 C68 13 82 3 98 9 C116 16 126 30 110 38 C90 47 56 37 36 41 C18 45 4 40 8 26Z"/>
    <path class="stroke stroke-thin" d="M118 12 C122 8 126 12 123 16"/>
  </svg>`,

  drop: `<svg viewBox="0 0 24 34" class="doodle" aria-hidden="true">
    <path class="stroke" d="M12 3 C18 12 21 18 21 22 C21 28 17 31 12 31 C7 31 3 28 3 22 C3 18 6 12 12 3Z"/>
  </svg>`,

  pencilBroken: `<svg viewBox="0 0 150 60" class="doodle" aria-hidden="true">
    <path class="stroke" d="M6 20 L58 20 L52 30 L58 40 L6 40 C3 40 2 38 2 30 C2 22 3 20 6 20Z"/>
    <path class="stroke" d="M74 20 L114 20 L138 30 L114 40 L68 40 L74 30Z"/>
    <path class="stroke stroke-thin" d="M126 26 L138 30 L126 34"/>
    <path class="stroke stroke-thin" d="M64 8 L61 2 M68 14 L76 10 M62 48 L58 54"/>
  </svg>`,

  bandaid: `<svg viewBox="0 0 100 52" class="doodle" aria-hidden="true">
    <path class="stroke" d="M14 8 L86 30 C94 33 96 40 93 45 C90 50 83 51 76 48 L8 25 C1 22 -1 15 2 10 C5 4 9 5 14 8Z"/>
    <path class="stroke stroke-thin" d="M32 12 L26 30 M62 22 L56 40"/>
    <circle class="stroke stroke-thin" cx="40" cy="24" r="2"/>
    <circle class="stroke stroke-thin" cx="49" cy="28" r="2"/>
  </svg>`,

  bananaPeel: `<svg viewBox="0 0 110 62" class="doodle" aria-hidden="true">
    <path class="stroke" d="M22 46 C36 50 66 48 84 34"/>
    <path class="stroke" d="M22 46 C8 40 14 20 30 16 C24 30 30 40 44 42"/>
    <path class="stroke" d="M22 46 C34 56 62 56 82 44 C96 36 98 22 92 12 C92 30 74 44 52 46"/>
    <path class="stroke stroke-thin" d="M92 12 C96 8 100 6 104 8"/>
  </svg>`,

  tangle: `<svg viewBox="0 0 90 90" class="doodle" aria-hidden="true">
    <path class="stroke" d="M30 12 C10 18 6 44 22 58 C38 72 68 68 76 50 C84 32 68 14 48 16 C32 18 24 34 32 46 C40 58 60 56 62 42 C64 32 52 26 46 34"/>
    <path class="stroke stroke-thin" d="M30 12 C34 6 40 2 48 3"/>
  </svg>`,

  paperPlane: `<svg viewBox="0 0 88 70" class="doodle" aria-hidden="true">
    <path class="stroke" d="M6 30 L80 6 L52 62 L42 42Z"/>
    <path class="stroke stroke-thin" d="M42 42 L80 6"/>
  </svg>`,

  stickyNote: `<svg viewBox="0 0 84 84" class="doodle" aria-hidden="true">
    <path class="stroke" d="M8 8 L76 10 L74 62 C62 76 52 78 38 76 L8 74Z"/>
    <path class="stroke stroke-thin" d="M38 76 C44 68 52 64 74 62"/>
    <path class="stroke stroke-thin" d="M20 26 L60 27 M20 38 L54 39 M20 50 L44 51"/>
  </svg>`,

  clip: `<svg viewBox="0 0 44 84" class="doodle" aria-hidden="true">
    <path class="stroke" d="M31 24 L31 62 C31 74 13 74 13 62 L13 18 C13 8 34 8 34 20 L34 60"/>
  </svg>`,

  bulb: `<svg viewBox="0 0 68 84" class="doodle" aria-hidden="true">
    <path class="stroke" d="M34 6 C50 6 60 18 60 30 C60 42 48 46 46 58 L22 58 C20 46 8 42 8 30 C8 18 18 6 34 6Z"/>
    <path class="stroke" d="M23 64 L45 64 M26 72 L42 72"/>
    <path class="stroke stroke-thin" d="M34 76 C31 80 37 80 34 80"/>
  </svg>`,

  cloudThink: `<svg viewBox="0 0 130 84" class="doodle" aria-hidden="true">
    <path class="stroke" d="M34 66 C16 66 8 54 14 42 C6 28 20 14 34 20 C40 6 62 4 70 16 C88 8 108 20 104 34 C118 40 116 62 98 66Z"/>
    <circle class="stroke stroke-thin" cx="22" cy="76" r="5"/>
    <circle class="stroke stroke-thin" cx="9" cy="82" r="3"/>
  </svg>`,

  eyes: `<svg viewBox="0 0 90 44" class="doodle" aria-hidden="true">
    <path class="stroke" d="M4 22 C14 6 34 6 42 22 C34 38 14 38 4 22Z"/>
    <path class="stroke" d="M48 22 C56 6 76 6 86 22 C76 38 56 38 48 22Z"/>
    <circle cx="23" cy="22" r="6" fill="currentColor"/>
    <circle cx="67" cy="22" r="6" fill="currentColor"/>
  </svg>`,

  footprints: `<svg viewBox="0 0 200 60" class="doodle" aria-hidden="true">
    <ellipse class="stroke stroke-thin" cx="18" cy="18" rx="8" ry="12" transform="rotate(-12 18 18)"/>
    <ellipse class="stroke stroke-thin" cx="56" cy="40" rx="8" ry="12" transform="rotate(-8 56 40)"/>
    <ellipse class="stroke stroke-thin" cx="98" cy="16" rx="8" ry="12" transform="rotate(-14 98 16)"/>
    <ellipse class="stroke stroke-thin" cx="140" cy="40" rx="8" ry="12" transform="rotate(-6 140 40)"/>
    <ellipse class="stroke stroke-thin" cx="182" cy="18" rx="8" ry="12" transform="rotate(-12 182 18)"/>
  </svg>`,

  check: `<svg viewBox="0 0 34 30" class="doodle" aria-hidden="true">
    <path class="stroke stroke-thick" d="M4 16 C8 19 11 23 14 27 C18 17 24 8 31 3"/>
  </svg>`,

  /* ---------- tools of the trade ---------- */

  laptop: `<svg viewBox="0 0 130 92" class="doodle" aria-hidden="true">
    <path class="stroke" d="M22 10 L108 12 L104 66 L18 64Z"/>
    <path class="stroke" d="M18 64 L2 82 L128 84 L104 66"/>
    <path class="stroke stroke-thin" d="M52 74 L80 75"/>
  </svg>`,

  phone: `<svg viewBox="0 0 62 108" class="doodle" aria-hidden="true">
    <path class="stroke" d="M12 6 L50 8 C56 8 58 12 58 18 L55 92 C55 98 51 102 45 102 L14 100 C8 100 5 96 5 90 L8 16 C8 10 6 6 12 6Z"/>
    <path class="stroke stroke-thin" d="M25 14 L38 14"/>
    <path class="stroke stroke-thin" d="M24 92 L40 93"/>
  </svg>`,

  palette: `<svg viewBox="0 0 96 84" class="doodle" aria-hidden="true">
    <path class="stroke" d="M46 6 C74 4 92 22 90 44 C88 62 72 66 66 58 C60 50 50 54 52 64 C54 76 42 82 30 76 C12 66 4 46 10 28 C16 12 30 7 46 6Z"/>
    <circle class="stroke stroke-thin" cx="30" cy="26" r="5"/>
    <circle class="stroke stroke-thin" cx="52" cy="20" r="5"/>
    <circle class="stroke stroke-thin" cx="70" cy="34" r="5"/>
    <circle class="stroke stroke-thin" cx="26" cy="50" r="5"/>
  </svg>`,

  ruler: `<svg viewBox="0 0 130 40" class="doodle" aria-hidden="true">
    <path class="stroke" d="M4 12 L124 8 L126 30 L6 34Z"/>
    <path class="stroke stroke-thin" d="M28 10 L29 22 M52 9 L53 21 M76 9 L77 21 M100 8 L101 20"/>
  </svg>`,

  coffee: `<svg viewBox="0 0 88 90" class="doodle" aria-hidden="true">
    <path class="stroke" d="M14 30 L68 28 L64 74 C63 82 58 86 50 86 L30 86 C22 86 18 82 17 74Z"/>
    <path class="stroke" d="M68 40 C82 38 86 48 82 56 C79 62 72 64 66 62"/>
    <path class="stroke stroke-thin" d="M30 16 C26 10 34 8 30 2 M50 16 C46 10 54 8 50 2"/>
  </svg>`,

  compass: `<svg viewBox="0 0 84 84" class="doodle" aria-hidden="true">
    <circle class="stroke" cx="42" cy="42" r="36"/>
    <path class="stroke" d="M56 28 L48 50 L28 56 L36 34Z"/>
  </svg>`,

  plant: `<svg viewBox="0 0 84 100" class="doodle" aria-hidden="true">
    <path class="stroke" d="M22 62 L62 62 L57 94 L27 94Z"/>
    <path class="stroke" d="M42 62 C42 44 42 30 42 18"/>
    <path class="stroke" d="M42 44 C28 42 20 32 22 20 C36 20 44 30 42 44Z"/>
    <path class="stroke" d="M42 36 C56 32 64 22 60 10 C46 12 38 24 42 36Z"/>
  </svg>`,

  book: `<svg viewBox="0 0 110 80" class="doodle" aria-hidden="true">
    <path class="stroke" d="M55 20 C44 10 24 8 8 12 L8 66 C24 62 44 64 55 74 C66 64 86 62 102 66 L102 12 C86 8 66 10 55 20Z"/>
    <path class="stroke stroke-thin" d="M55 20 L55 74"/>
  </svg>`,

  globe: `<svg viewBox="0 0 84 84" class="doodle" aria-hidden="true">
    <circle class="stroke" cx="42" cy="42" r="36"/>
    <path class="stroke stroke-thin" d="M6 42 L78 42 M42 6 C58 22 58 62 42 78 C26 62 26 22 42 6"/>
  </svg>`,

  camera: `<svg viewBox="0 0 110 82" class="doodle" aria-hidden="true">
    <path class="stroke" d="M10 22 L32 22 L40 10 L70 10 L78 22 L100 22 C104 22 106 25 106 30 L104 68 C104 72 101 74 97 74 L13 74 C9 74 6 71 6 67 L8 28 C8 24 6 22 10 22Z"/>
    <circle class="stroke" cx="55" cy="46" r="17"/>
  </svg>`,

  /* ---------- frames & containers ---------- */

  frameTape: `<svg viewBox="0 0 90 40" class="doodle" aria-hidden="true">
    <path class="stroke" d="M4 12 L84 4 L86 28 L6 36Z" fill="rgba(255,255,255,.45)"/>
    <path class="stroke stroke-thin" d="M22 8 L24 33 M46 6 L48 31 M68 5 L70 30"/>
  </svg>`,

  /* ---------- the mascot ----------
     One character, four poses. Hair worn open — a crown arc over a jaw
     arc, with two strands falling past the shoulders — and she is
     smiling in all of them. */

  /* Hero pose — hand up, mid-wave. Rigged: .mkw-arm waves, .mkw-head tilts. */
  mascotWave: `<svg viewBox="0 0 240 280" class="doodle mascot mascot--wave" aria-hidden="true">
    <!-- legs -->
    <path class="stroke" d="M106 186 C100 212 98 230 94 250"/>
    <path class="stroke" d="M94 250 C86 254 78 256 72 260 C80 266 94 266 102 260"/>
    <path class="stroke" d="M128 186 C136 212 140 230 144 250"/>
    <path class="stroke" d="M144 250 C152 254 160 256 166 260 C158 266 144 266 136 260"/>

    <!-- dress -->
    <path class="stroke" d="M118 116 C104 134 98 160 100 188 C116 196 134 196 148 188 C146 160 134 134 118 116Z"/>
    <path class="stroke stroke-thin" d="M108 158 C118 163 130 163 140 158"/>

    <!-- resting arm -->
    <path class="stroke" d="M106 128 C90 140 80 158 78 176"/>
    <circle class="stroke" cx="76" cy="182" r="6"/>

    <!-- waving arm -->
    <g class="mkw-arm">
      <path class="stroke" d="M132 126 C152 116 166 98 170 76"/>
      <circle class="stroke" cx="172" cy="68" r="8"/>
      <path class="stroke stroke-thin" d="M182 54 L190 46 M186 66 L198 63 M176 48 L179 36"/>
    </g>

    <g class="mkw-head">
      <!-- jaw -->
      <path class="stroke" d="M90 74 C89 96 102 112 120 112 C138 112 151 96 150 74"/>
      <!-- hair, worn open -->
      <path class="stroke" d="M90 74 C86 48 104 32 120 33 C136 32 154 48 150 74"/>
      <path class="stroke" d="M90 74 C82 94 84 116 92 132 C97 140 105 139 104 130"/>
      <path class="stroke" d="M150 74 C158 94 156 116 148 132 C143 140 135 139 136 130"/>
      <path class="stroke stroke-thin" d="M106 42 C113 50 127 50 134 41"/>
      <!-- face -->
      <g class="mkw-eyes">
        <circle cx="109" cy="74" r="3.8" fill="currentColor"/>
        <circle cx="131" cy="74" r="3.8" fill="currentColor"/>
      </g>
      <path class="stroke stroke-thin" d="M102 63 C106 59 112 59 115 63 M125 63 C128 59 134 59 138 63"/>
      <path class="stroke stroke-thin" d="M110 88 C115 95 126 95 131 87"/>
      <path class="stroke stroke-thin" d="M96 82 C99 80 102 80 104 82 M136 82 C139 80 142 80 144 82"/>
    </g>
  </svg>`,

  /* Rope-pulling pose — the scroll companion. Rigged: JS animates
     #mkp-arm, #mkp-legF, #mkp-legB, #mkp-head.
     Her grip sits at (226, 110) in these coordinates. */
  mascotPull: `<svg viewBox="0 0 280 300" class="doodle mascot mascot--pull" aria-hidden="true">
    <path class="stroke stroke-thin mkp-effort" d="M92 20 L86 6 M114 12 L114 0 M68 38 L54 30"/>

    <g id="mkp-legB" class="mkp-leg">
      <path class="stroke" d="M120 196 C108 220 98 238 84 252"/>
      <path class="stroke" d="M84 252 C74 256 66 258 60 264 C68 271 82 271 92 264"/>
    </g>

    <g id="mkp-legF" class="mkp-leg">
      <path class="stroke" d="M152 190 C176 208 198 222 218 234"/>
      <path class="stroke" d="M218 234 C228 236 238 240 244 248 C234 255 220 253 210 245"/>
    </g>

    <path class="stroke" d="M116 104 C118 110 120 114 124 117"/>

    <path class="stroke" d="M141 104 C128 107 112 111 103 116 C101 145 104 175 108 202 C133 197 160 188 184 180 C174 152 156 126 141 104Z"/>
    <path class="stroke stroke-thin" d="M108 202 C124 208 152 200 184 180"/>

    <g id="mkp-arm">
      <path class="stroke" d="M138 116 C166 116 194 112 220 104"/>
      <path class="stroke" d="M134 128 C162 132 190 130 216 120"/>
      <circle class="stroke" cx="228" cy="102" r="8"/>
      <circle class="stroke" cx="224" cy="118" r="8"/>
    </g>

    <g id="mkp-head">
      <!-- jaw, tipped back into the haul -->
      <path class="stroke" d="M80 68 C79 90 92 106 110 106 C128 106 141 90 140 68"/>
      <path class="stroke" d="M80 68 C76 42 94 26 110 27 C126 26 144 42 140 68"/>
      <!-- hair streaming back from the effort -->
      <path class="stroke" d="M80 68 C68 84 60 104 62 124 C64 134 74 134 74 124"/>
      <path class="stroke" d="M140 68 C148 88 146 110 138 126 C133 134 125 133 126 124"/>
      <path class="stroke stroke-thin" d="M96 36 C103 44 117 44 124 35"/>
      <g class="mkp-eyes">
        <circle cx="99" cy="68" r="3.8" fill="currentColor"/>
        <circle cx="121" cy="68" r="3.8" fill="currentColor"/>
      </g>
      <path class="stroke stroke-thin" d="M92 57 C96 53 102 53 105 57 M115 57 C118 53 124 53 128 57"/>
      <!-- a determined, teeth-gritted grin -->
      <path class="stroke stroke-thin" d="M100 82 C105 89 116 89 121 81"/>
      <path class="stroke stroke-thin" d="M86 76 C89 74 92 74 94 76 M126 76 C129 74 132 74 134 76"/>
      <path class="stroke stroke-thin mkp-sweat" d="M152 34 C156 41 158 45 158 48 C158 52 155 55 152 55 C149 55 146 52 146 48 C146 45 148 41 152 34Z"/>
    </g>

    <path class="stroke stroke-thin mkp-dust" d="M238 266 C250 260 262 264 266 272 M248 278 C260 274 272 278 276 285"/>
  </svg>`,

  /* Feet out from under her, paperwork airborne. Kept for the About page,
     where the clumsy half of the story actually lives. */
  mascotTrip: `<svg viewBox="0 0 340 300" class="doodle mascot mascot--trip" aria-hidden="true">
    <g class="mk-fly mk-fly--1"><path class="stroke stroke-thin" d="M138 4 L178 10 L172 44 L132 38Z"/><path class="stroke stroke-thin" d="M142 16 L166 20 M141 27 L163 30"/></g>
    <g class="mk-fly mk-fly--2"><path class="stroke stroke-thin" d="M228 10 L268 4 L274 42 L234 48Z"/><path class="stroke stroke-thin" d="M238 20 L262 16 M239 31 L261 27"/></g>
    <g class="mk-fly mk-fly--3"><path class="stroke stroke-thin" d="M288 48 L330 40 L336 76 L294 84Z"/></g>

    <path class="stroke stroke-thin mk-speed" d="M4 146 L42 141 M2 164 L34 160 M10 128 L40 124"/>

    <g class="mk-body">
      <path class="stroke" d="M196 176 C222 168 246 158 276 132"/>
      <path class="stroke" d="M276 132 C284 126 294 124 302 128 C298 140 288 148 276 148"/>
      <path class="stroke" d="M198 188 C224 194 250 197 280 194"/>
      <path class="stroke" d="M280 194 C289 196 297 201 301 210 C290 214 278 211 269 204"/>

      <path class="stroke" d="M128 107 C120 118 112 129 108 137 C130 158 158 184 177 204 C194 194 208 170 215 148 C190 133 154 117 128 107Z"/>

      <path class="stroke" d="M132 112 C152 96 172 78 194 60"/>
      <circle class="stroke" cx="200" cy="54" r="7"/>
      <path class="stroke" d="M110 132 C96 150 82 170 66 186"/>
      <circle class="stroke" cx="60" cy="192" r="7"/>

      <g class="mk-head">
        <!-- head thrown back, hair flying with it -->
        <path class="stroke" d="M58 84 C57 106 70 122 88 122 C106 122 119 106 118 84"/>
        <path class="stroke" d="M58 84 C54 58 72 42 88 43 C104 42 122 58 118 84"/>
        <path class="stroke" d="M58 84 C42 92 28 108 26 126 C25 136 36 138 38 128"/>
        <path class="stroke" d="M118 84 C128 100 128 120 120 136 C115 144 107 143 108 134"/>
        <path class="stroke stroke-thin" d="M74 52 C81 60 95 60 102 51"/>
        <g class="mk-eyes">
          <circle cx="77" cy="84" r="4" fill="currentColor"/>
          <circle cx="99" cy="84" r="4" fill="currentColor"/>
        </g>
        <path class="stroke stroke-thin" d="M70 72 C74 67 80 67 83 72 M93 72 C96 67 102 67 106 72"/>
        <!-- caught mid-laugh, not mid-scream -->
        <ellipse class="stroke stroke-thin" cx="88" cy="100" rx="7" ry="8"/>
        <path class="stroke stroke-thin" d="M64 94 C67 92 70 92 72 94 M104 94 C107 92 110 92 112 94"/>
      </g>
    </g>

    <path class="stroke stroke-thin mk-dust" d="M120 244 C136 234 156 238 164 250 M156 262 C172 254 190 258 198 268 M92 262 C104 254 118 258 124 266"/>
  </svg>`,

  /* Peeking over an edge — used as a small easter egg */
  mascotPeek: `<svg viewBox="0 0 170 116" class="doodle mascot" aria-hidden="true">
    <path class="stroke" d="M55 46 C54 68 67 84 85 84 C103 84 116 68 115 46"/>
    <path class="stroke" d="M55 46 C51 20 69 4 85 5 C101 4 119 20 115 46"/>
    <path class="stroke" d="M55 46 C46 64 47 86 55 102"/>
    <path class="stroke" d="M115 46 C124 64 123 86 115 102"/>
    <path class="stroke stroke-thin" d="M71 14 C78 22 92 22 99 13"/>
    <circle cx="74" cy="46" r="3.8" fill="currentColor"/>
    <circle cx="96" cy="46" r="3.8" fill="currentColor"/>
    <path class="stroke stroke-thin" d="M67 35 C71 31 77 31 80 35 M90 35 C93 31 99 31 103 35"/>
    <path class="stroke stroke-thin" d="M75 60 C80 67 91 67 96 59"/>
    <path class="stroke" d="M22 100 C34 92 44 92 52 98"/>
    <path class="stroke" d="M118 98 C126 91 138 91 148 98"/>
  </svg>`
};

/* hydrate every [data-doodle] on the page */
function paintDoodles(root = document) {
  root.querySelectorAll('[data-doodle]').forEach((el) => {
    const key = el.getAttribute('data-doodle');
    if (DOODLE[key] && !el.firstElementChild) el.innerHTML = DOODLE[key];
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => paintDoodles());
}
