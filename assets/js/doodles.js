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









  /* ---------- arrows ----------
     Each head is two symmetric legs meeting exactly at the tip, angled
     off the shaft's tangent there. Drawn as one smooth curve through the
     tip instead, the V comes out lopsided. ---------- */

  arrowRight: `<svg viewBox="0 0 100 40" class="doodle" aria-hidden="true">
    <path class="stroke" d="M6 20 C28 15 56 25 88 19"/>
    <path class="stroke" d="M76.5 15.4 L88.0 19.0 L78.6 26.5"/>
  </svg>`,

  arrowDown: `<svg viewBox="0 0 40 92" class="doodle" aria-hidden="true">
    <path class="stroke" d="M20 6 C16 26 24 48 20 78"/>
    <path class="stroke" d="M27.6 67.4 L20.0 78.0 L15.5 65.8"/>
  </svg>`,

  arrowTiny: `<svg viewBox="0 0 40 26" class="doodle" aria-hidden="true">
    <path class="stroke stroke-thin" d="M4 13 C14 10 24 15 34 12"/>
    <path class="stroke stroke-thin" d="M26.1 10.6 L34.0 12.0 L28.2 17.5"/>
  </svg>`,

  arrowCurveR: `<svg viewBox="0 0 124 68" class="doodle" aria-hidden="true">
    <path class="stroke" d="M6 14 C34 2 74 6 100 34"/>
    <path class="stroke" d="M96.9 20.4 L100.0 34.0 L86.6 29.9"/>
  </svg>`,

  arrowCurveL: `<svg viewBox="0 0 124 68" class="doodle" aria-hidden="true">
    <path class="stroke" d="M118 14 C90 2 50 6 24 34"/>
    <path class="stroke" d="M37.4 29.9 L24.0 34.0 L27.1 20.4"/>
  </svg>`,

  arrowCurl: `<svg viewBox="0 0 110 78" class="doodle" aria-hidden="true">
    <path class="stroke" d="M6 10 C34 4 44 22 54 38 C62 51 76 60 96 62"/>
    <path class="stroke" d="M84.6 53.8 L96.0 62.0 L83.2 67.8"/>
  </svg>`,

  arrowLoop: `<svg viewBox="0 0 72 108" class="doodle" aria-hidden="true">
    <path class="stroke" d="M14 6 C34 22 20 44 30 60 C38 73 52 78 56 92"/>
    <path class="stroke" d="M59.2 79.4 L56.0 92.0 L46.7 83.0"/>
  </svg>`,

  arrowElbow: `<svg viewBox="0 0 72 72" class="doodle" aria-hidden="true">
    <path class="stroke stroke-thin" d="M8 8 C10 32 18 50 44 56"/>
    <path class="stroke stroke-thin" d="M35.7 48.8 L44.0 56.0 L33.4 58.8"/>
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
  mascotWave: `<svg viewBox="0 0 240 260" class="doodle mascot mascot--wave" aria-hidden="true">
    <path class="stroke" d="M104 170 C98 196 96 214 92 234"/>
    <path class="stroke" d="M92 234 C84 238 76 240 70 244 C78 250 92 250 100 244"/>
    <path class="stroke" d="M126 170 C134 196 138 214 142 234"/>
    <path class="stroke" d="M142 234 C150 238 158 240 164 244 C156 250 142 250 134 244"/>
    <path class="stroke" d="M116 100 C102 118 96 144 98 172 C114 180 132 180 146 172 C144 144 132 118 116 100Z"/>
    <path class="stroke" d="M104 112 C88 124 78 142 76 160"/>
    <circle class="stroke" cx="74" cy="166" r="6"/>
    <g class="mkw-arm">
      <path class="stroke" d="M130 110 C150 100 164 82 168 60"/>
      <circle class="stroke" cx="170" cy="52" r="8"/>
      <path class="stroke stroke-thin" d="M180 38 L188 30 M184 50 L196 47 M174 32 L177 20"/>
    </g>
    <g class="mkw-head">
      <circle class="stroke" cx="118" cy="66" r="28"/>
      <circle class="stroke" cx="94" cy="42" r="15"/>
      <path class="stroke stroke-thin" d="M96 60 C84 70 84 86 94 94"/>
      <circle cx="108" cy="64" r="3.6" fill="currentColor"/>
      <circle cx="130" cy="64" r="3.6" fill="currentColor"/>
      <path class="stroke stroke-thin" d="M102 52 C106 48 113 48 116 51 M124 51 C128 47 135 47 138 50"/>
      <path class="stroke stroke-thin" d="M108 78 C113 84 125 84 130 78"/>
      <path class="stroke stroke-thin" d="M92 74 C95 72 98 72 100 74 M136 74 C139 72 142 72 144 74"/>
    </g>
  </svg>`,

  /* Rope-pulling pose — the scroll companion. Rigged: JS animates
     #mkp-arm, #mkp-legF, #mkp-legB, #mkp-head.
     Her grip sits at (226, 110) in these coordinates. */
  mascotPull: `<svg viewBox="0 0 280 300" class="doodle mascot mascot--pull" aria-hidden="true">
    <!-- effort marks -->
    <path class="stroke stroke-thin mkp-effort" d="M92 20 L86 6 M114 12 L114 0 M68 38 L54 30"/>

    <!-- back leg -->
    <g id="mkp-legB" class="mkp-leg">
      <path class="stroke" d="M120 196 C108 220 98 238 84 252"/>
      <path class="stroke" d="M84 252 C74 256 66 258 60 264 C68 271 82 271 92 264"/>
    </g>

    <!-- front leg, braced against the pull -->
    <g id="mkp-legF" class="mkp-leg">
      <path class="stroke" d="M152 190 C176 208 198 222 218 234"/>
      <path class="stroke" d="M218 234 C228 236 238 240 244 248 C234 255 220 253 210 245"/>
    </g>

    <!-- neck -->
    <path class="stroke" d="M116 100 C118 106 120 110 124 113"/>

    <!-- dress, leaning back into the haul -->
    <path class="stroke" d="M141 104 C128 107 112 111 103 116 C101 145 104 175 108 202 C133 197 160 188 184 180 C174 152 156 126 141 104Z"/>
    <path class="stroke stroke-thin" d="M108 202 C124 208 152 200 184 180"/>

    <!-- arms out front, hand over hand on the rope -->
    <g id="mkp-arm">
      <path class="stroke" d="M138 116 C166 116 194 112 220 104"/>
      <path class="stroke" d="M134 128 C162 132 190 130 216 120"/>
      <circle class="stroke" cx="228" cy="102" r="8"/>
      <circle class="stroke" cx="224" cy="118" r="8"/>
    </g>

    <!-- head -->
    <g id="mkp-head">
      <circle class="stroke" cx="108" cy="74" r="30"/>
      <circle class="stroke" cx="82" cy="48" r="16"/>
      <path class="stroke stroke-thin" d="M84 64 C68 76 64 96 74 110"/>
      <path class="stroke stroke-thin" d="M92 60 C97 57 103 58 106 62"/>
      <path class="stroke stroke-thin" d="M120 62 C124 58 130 57 134 60"/>
      <g class="mkp-eyes">
        <circle cx="101" cy="73" r="4" fill="currentColor"/>
        <circle cx="126" cy="71" r="4" fill="currentColor"/>
      </g>
      <ellipse class="stroke stroke-thin" cx="116" cy="90" rx="7" ry="6"/>
      <path class="stroke stroke-thin" d="M82 86 C85 84 88 84 90 86 M138 82 C141 80 144 80 146 82"/>
      <path class="stroke stroke-thin mkp-sweat" d="M146 36 C150 43 152 47 152 50 C152 54 149 57 146 57 C143 57 140 54 140 50 C140 47 142 43 146 36Z"/>
    </g>

    <!-- skid dust under the braced foot -->
    <path class="stroke stroke-thin mkp-dust" d="M238 266 C250 260 262 264 266 272 M248 278 C260 274 272 278 276 285"/>
  </svg>`,

  /* Feet out from under her, paperwork airborne. Kept for the About page,
     where the clumsy half of the story actually lives. */
  mascotTrip: `<svg viewBox="0 0 340 300" class="doodle mascot mascot--trip" aria-hidden="true">
    <!-- the paperwork, no longer in her hands -->
    <g class="mk-fly mk-fly--1"><path class="stroke stroke-thin" d="M138 4 L178 10 L172 44 L132 38Z"/><path class="stroke stroke-thin" d="M142 16 L166 20 M141 27 L163 30"/></g>
    <g class="mk-fly mk-fly--2"><path class="stroke stroke-thin" d="M228 10 L268 4 L274 42 L234 48Z"/><path class="stroke stroke-thin" d="M238 20 L262 16 M239 31 L261 27"/></g>
    <g class="mk-fly mk-fly--3"><path class="stroke stroke-thin" d="M288 48 L330 40 L336 76 L294 84Z"/></g>

    <!-- she was moving a moment ago -->
    <path class="stroke stroke-thin mk-speed" d="M4 146 L42 141 M2 164 L34 160 M10 128 L40 124"/>

    <g class="mk-body">
      <!-- both feet, out from under her -->
      <path class="stroke" d="M196 176 C222 168 246 158 276 132"/>
      <path class="stroke" d="M276 132 C284 126 294 124 302 128 C298 140 288 148 276 148"/>
      <path class="stroke" d="M198 188 C224 194 250 197 280 194"/>
      <path class="stroke" d="M280 194 C289 196 297 201 301 210 C290 214 278 211 269 204"/>

      <!-- dress, already on its way down -->
      <path class="stroke" d="M128 107 C120 118 112 129 108 137 C130 158 158 184 177 204 C194 194 208 170 215 148 C190 133 154 117 128 107Z"/>

      <!-- one arm up, one reaching back for a floor that isn't there yet -->
      <path class="stroke" d="M132 112 C152 96 172 78 194 60"/>
      <circle class="stroke" cx="200" cy="54" r="7"/>
      <path class="stroke" d="M110 132 C96 150 82 170 66 186"/>
      <circle class="stroke" cx="60" cy="192" r="7"/>

      <!-- head, thrown back -->
      <g class="mk-head">
        <circle class="stroke" cx="86" cy="88" r="30"/>
        <circle class="stroke" cx="56" cy="60" r="16"/>
        <path class="stroke stroke-thin" d="M58 76 C42 88 38 108 48 122"/>
        <path class="stroke stroke-thin" d="M70 72 C74 66 82 66 86 71"/>
        <path class="stroke stroke-thin" d="M95 70 C99 64 107 64 111 69"/>
        <g class="mk-eyes">
          <circle cx="78" cy="85" r="4" fill="currentColor"/>
          <circle cx="102" cy="83" r="4" fill="currentColor"/>
        </g>
        <ellipse class="stroke stroke-thin" cx="91" cy="103" rx="7" ry="8"/>
        <path class="stroke stroke-thin" d="M62 98 C65 96 68 96 70 98 M112 94 C115 92 118 92 120 94"/>
      </g>
    </g>

    <!-- and the floor she's about to meet -->
    <path class="stroke stroke-thin mk-dust" d="M120 244 C136 234 156 238 164 250 M156 262 C172 254 190 258 198 268 M92 262 C104 254 118 258 124 266"/>
  </svg>`,

  /* Peeking over an edge — used as a small easter egg */
  mascotPeek: `<svg viewBox="0 0 160 110" class="doodle mascot" aria-hidden="true">
    <circle class="stroke" cx="80" cy="52" r="30"/>
    <circle class="stroke" cx="53" cy="26" r="16"/>
    <path class="stroke stroke-thin" d="M55 44 C42 55 42 72 53 82"/>
    <circle cx="69" cy="50" r="4" fill="currentColor"/>
    <circle cx="93" cy="49" r="4" fill="currentColor"/>
    <path class="stroke stroke-thin" d="M72 66 C78 72 90 72 96 65"/>
    <path class="stroke" d="M40 88 C52 80 62 80 70 86"/>
    <path class="stroke" d="M104 86 C112 79 124 79 134 86"/>
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
