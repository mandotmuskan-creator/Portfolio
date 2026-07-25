from urllib.parse import quote

NAVY, PAPER, ACCENT = '#12295D', '#FCFAF5', '#1B74B8'

# --- default: a hand-drawn arrow pointer. Tip at (3,3) = the hotspot. ---
ARROW = f'''<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
<path d="M3.6 3.1 C4.2 8.2 5.5 14.6 6.9 19.5 C7.2 20.7 8.5 21 9.2 20 L11.6 16.4 L15 23.1 C15.5 24.1 16.8 24.2 17.5 23.5 C18.1 22.8 18 22 17.5 21 L14.4 15.2 L19.9 14.4 C21.2 14.2 21.5 12.9 20.5 12.1 C17.2 9.3 8.7 4.4 3.6 3.1 Z"
 fill="{PAPER}" stroke="{NAVY}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'''

# --- interactive: a hand-drawn pointing hand. Fingertip at (11,2) = the hotspot. ---
HAND = f'''<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
<path d="M9.7 5 C9.7 2.9 12.7 2.9 12.7 5 L12.7 12.6 C12.8 10.9 15.4 11 15.4 12.6
 C15.5 11 18 11.1 18 12.8 C18.1 11.4 20.6 11.6 20.6 13.5 C20.7 15.4 21 20 20 22.5
 C19 25.2 16.7 26.9 13.7 26.8 C10.8 26.8 8.9 25.2 7.9 22.8 L5.9 18 C5.2 16.2 7.8 14.9 8.8 16.6
 L9.7 18.2 Z"
 fill="{PAPER}" stroke="{NAVY}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12.7 13.6 L12.7 16 M15.4 13.8 L15.4 16.2 M18 14 L18 16.4"
 fill="none" stroke="{NAVY}" stroke-width="1.4" stroke-linecap="round"/>
</svg>'''

def uri(svg):
    return 'url("data:image/svg+xml,' + quote(svg.replace('\n', ''), safe="/:=<>?[]@!$&'()*+,;") + '")'

open('cursor-out.txt', 'w').write(
    'ARROW\n' + uri(ARROW) + '\n\nHAND\n' + uri(HAND) + '\n')

# preview: real cursor size, and 8x so the drawing can actually be judged
def cell(name, svg):
    big = svg.replace('width="32" height="32"', 'width="256" height="256"')
    return (f'<div class=c><b>{name}</b>'
            f'<div class="on-paper">{svg}{big}</div>'
            f'<div class="on-navy">{svg}{big}</div></div>')

open('cursor.html', 'w').write(f"""<!doctype html><meta charset=utf-8><style>
 body{{background:#EEE;font:12px system-ui;display:flex;gap:20px;padding:20px}}
 b{{display:block;margin-bottom:6px}}
 .on-paper,.on-navy{{padding:14px;display:flex;align-items:flex-start;gap:14px;margin-bottom:10px}}
 .on-paper{{background:{PAPER}}} .on-navy{{background:{NAVY}}}
</style>{cell('default (arrow)', ARROW)}{cell('interactive (hand)', HAND)}""")
print(open('cursor-out.txt').read()[:400])
