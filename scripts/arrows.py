import math

def head(tip, ctrl, spread=30.0, length=14.0):
    """Two symmetric legs meeting exactly at the tip.
       Direction comes from the shaft's last control point -> tip, so the V
       always sits square on the curve instead of drifting off it."""
    tx, ty = tip; cx, cy = ctrl
    ang = math.degrees(math.atan2(ty - cy, tx - cx))   # travel direction at the tip
    back = ang + 180.0
    pts = []
    for s in (+spread, -spread):
        a = math.radians(back + s)
        pts.append((tx + length * math.cos(a), ty + length * math.sin(a)))
    f = lambda p: f"{p[0]:.1f} {p[1]:.1f}"
    return f"M{f(pts[0])} L{f(tip)} L{f(pts[1])}"

ARROWS = {
 # name: (viewBox, shaft, tip, last control point, spread, leg length, extra)
 'arrowRight':  ("0 0 100 40",  "M6 20 C28 15 56 25 88 19",                     (88,19),  (56,25), 28, 12),
 'arrowDown':   ("0 0 40 92",   "M20 6 C16 26 24 48 20 78",                     (20,78),  (24,48), 28, 13),
 'arrowTiny':   ("0 0 40 26",   "M4 13 C14 10 24 15 34 12",                     (34,12),  (24,15), 27, 8),
 'arrowCurveR': ("0 0 124 68",  "M6 14 C34 2 74 6 100 34",                      (100,34), (74,6),  30, 14),
 'arrowCurveL': ("0 0 124 68",  "M118 14 C90 2 50 6 24 34",                     (24,34),  (50,6),  30, 14),
 'arrowCurl':   ("0 0 110 78",  "M6 10 C34 4 44 22 54 38 C62 51 76 60 96 62",   (96,62),  (76,60), 30, 14),
 'arrowLoop':   ("0 0 72 108",  "M14 6 C34 22 20 44 30 60 C38 73 52 78 56 92",  (56,92),  (52,78), 30, 13),
 'arrowElbow':  ("0 0 72 72",   "M8 8 C10 32 18 50 44 56",                      (44,56),  (18,50), 28, 11),
}

thin = {'arrowTiny', 'arrowElbow'}
out, previews = [], []
for name, (vb, shaft, tip, ctrl, spread, ln) in ARROWS.items():
    cls = 'stroke stroke-thin' if name in thin else 'stroke'
    h = head(tip, ctrl, spread, ln)
    svg = (f'<svg viewBox="{vb}" class="doodle" aria-hidden="true">\n'
           f'    <path class="{cls}" d="{shaft}"/>\n'
           f'    <path class="{cls}" d="{h}"/>\n'
           f'  </svg>')
    out.append(f"  {name}: `{svg}`,")
    previews.append((name, svg))

open('arrows.txt','w').write("\n\n".join(out) + "\n")

# a preview sheet at the sizes the site actually uses
cells = "".join(
    f'<div class="c"><b>{n}</b>'
    f'<div class="s big" style="color:#1B74B8">{s}</div>'
    f'<div class="s sm" style="color:#1B74B8">{s}</div>'
    f'<div class="s sm" style="transform:rotate(-42deg);color:#1B74B8">{s}</div></div>'
    for n, s in previews)
open('arrows.html','w').write(f"""<!doctype html><meta charset=utf-8>
<style>
 body{{background:#FCFAF5;font:13px/1.4 system-ui;padding:24px;display:flex;flex-wrap:wrap;gap:26px}}
 .c{{text-align:center}} b{{display:block;margin-bottom:8px;font-size:11px;color:#12295D}}
 .s{{display:inline-block;vertical-align:middle;margin:6px}}
 .big svg{{width:120px;height:auto}} .sm svg{{width:52px;height:auto}}
 .stroke{{fill:none;stroke:currentColor;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}}
 .stroke-thin{{stroke-width:1.7}}
</style>{cells}""")
print(open('arrows.txt').read())
