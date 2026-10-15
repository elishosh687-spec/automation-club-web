"""Export every visible text of the site into one Word file (Hebrew + English), for editing elsewhere.

    .venv-text/bin/python scripts/site_text.py            # serves web/ itself, writes site-text/
Output:
    site-text/site-text.docx   the file Eli edits (one table per section: ID | עברית | English)
    site-text/site-text.json   the same rows with the exact HTML pieces, used to put edits back
Setup once: python3 -m venv .venv-text && .venv-text/bin/pip install python-docx playwright
"""
import datetime, functools, http.server, json, pathlib, sys, threading
from playwright.sync_api import sync_playwright
from docx import Document
from docx.enum.section import WD_ORIENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, RGBColor, Cm

ROOT = pathlib.Path(__file__).resolve().parent.parent
WEB, OUT = ROOT / 'web', ROOT / 'site-text'
PAGES = [('index.html', 'H', 'דף הבית'), ('work.html', 'W', 'תיק עבודות'), ('privacy.html', 'P', 'מדיניות פרטיות')]

COLLECT = r"""() => {
  const HE = /[֐-׿]/;
  const norm = s => s.replace(/‑/g,'-').replace(/ /g,' ').trim().replace(/\s+/g,' ');
  const BLOCK = 'h1,h2,h3,h4,h5,p,li,a,button,label,option,summary,dt,dd,blockquote,td,th,text,.case-tag,.metric,.eyebrow,.case-card-meta';
  const rows = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {acceptNode(n){
    const p = n.parentNode; if (!p || !HE.test(n.nodeValue||'')) return NodeFilter.FILTER_REJECT;
    if (['SCRIPT','STYLE'].includes(p.nodeName) || p.closest('.material-symbols-outlined,[data-lang-toggle]')) return NodeFilter.FILTER_REJECT;
    return NodeFilter.FILTER_ACCEPT;}});
  let n, last = null;
  while ((n = w.nextNode())) {
    const el = n.parentNode;
    const block = el.closest(BLOCK) || el;
    const shared = !!el.closest('nav, #mobileMenu, footer');
    const sec = el.closest('section');
    let group = '';
    if (sec) { const h = sec.querySelector('h1, h2'); group = h ? norm(h.textContent) : ''; }
    const card = el.closest('main [id^="case-"]');
    if (card && !group) { const h = card.querySelector('h3'); group = 'פרויקט: ' + (h ? norm(h.textContent) : card.id); }
    const kind = el.closest('svg') ? 'תווית באיור'
      : /^H[1-4]$/.test(block.nodeName) ? 'כותרת'
      : el.closest('a, button') ? 'כפתור / קישור' : '';
    const accent = !!el.closest('.accent, .text-primary, .italic, em');
    const part = {node: n, he: norm(n.nodeValue), accent};
    if (last && last.block === block) { last.parts.push(part); continue; }
    last = {block, shared, group, kind, parts: [part]};
    rows.push(last);
  }
  const meta = HE.test(document.title) ? [{kind: 'כותרת הלשונית בדפדפן', he: norm(document.title), get: () => document.title}] : [];
  const md = document.querySelector('meta[name="description"]');
  if (md && HE.test(md.content)) meta.push({kind: 'התיאור שמופיע בגוגל', he: norm(md.content), get: () => md.content});
  document.querySelectorAll('[placeholder]').forEach(e => { if (HE.test(e.placeholder))
    meta.push({kind: 'טקסט אפור בתוך שדה בטופס', he: norm(e.placeholder), get: () => e.getAttribute('placeholder')}); });
  window.__rows = rows; window.__meta = meta;
}"""
READ = r"""() => {
  const norm = s => s.replace(/‑/g,'-').replace(/ /g,' ').trim().replace(/\s+/g,' ');
  return {
    rows: window.__rows.map(r => ({shared: r.shared, group: r.group, kind: r.kind,
      parts: r.parts.map(p => ({he: p.he, en: norm(p.node.nodeValue), accent: p.accent}))})),
    meta: window.__meta.map(m => ({kind: m.kind, he: m.he, en: norm(m.get())})),
  };
}"""


def serve():
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    h = functools.partial(Quiet, directory=str(WEB))
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f'http://127.0.0.1:{srv.server_address[1]}'


def extract(base):
    pages = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        for path, prefix, title in PAGES:
            pg = b.new_page()
            pg.add_init_script("try{localStorage.setItem('acLang','he')}catch(e){}")
            pg.goto(f'{base}/{path}'); pg.wait_for_timeout(400)
            pg.evaluate(COLLECT)
            pg.locator('[data-lang-toggle]').first.click(); pg.wait_for_timeout(300)
            toggle = pg.locator('[data-lang-toggle]').first
            if toggle.inner_text().strip() != 'Hebrew' or toggle.get_attribute('aria-label') != 'Switch to Hebrew':
                raise RuntimeError(f'English language toggle is not labeled in English on {path}')
            pages.append({'page': path, 'prefix': prefix, 'title': title, **pg.evaluate(READ)})
            pg.close()
        b.close()
    return pages


def text_of(parts, lang):
    return ' '.join(p[lang] for p in parts).replace(' .', '.').replace(' ,', ',')


def build_rows(pages):
    """Group into sections, drop repeats (marquees, the menu shown twice), give each text an ID."""
    sections, seen_shared = [], set()
    shared = {'page': 'כל הדפים', 'group': 'תפריט עליון, תפריט בנייד ותחתית הדף (משותף לכל הדפים)', 'rows': []}
    sections.append(shared)
    for pg in pages:
        cur, seen = None, {}
        for r in pg['rows']:
            he = text_of(r['parts'], 'he')
            if r['shared']:
                if he not in seen_shared:
                    seen_shared.add(he); shared['rows'].append({**r, 'page': pg['page']})
                continue
            if cur is None or cur['group'] != r['group']:
                cur = {'page': pg['title'], 'group': r['group'] or 'פתיחה', 'rows': []}
                sections.append(cur)
            key = (cur['group'], he)
            if key in seen:
                seen[key]['repeats'] = seen[key].get('repeats', 1) + 1; continue
            row = {**r, 'page': pg['page']}; seen[key] = row; cur['rows'].append(row)
        sections.append({'page': pg['title'], 'group': 'מאחורי הקלעים: כותרת הלשונית, תיאור לגוגל ושדות בטופס',
                         'rows': [{'kind': m['kind'], 'parts': [{'he': m['he'], 'en': m['en'], 'accent': False}],
                                   'page': pg['page'], 'attr': True} for m in pg['meta']]})
    prefixes = {p['page']: p['prefix'] for p in pages}
    counters = {}
    for s in sections:
        for r in s['rows']:
            pre = 'S' if s['page'] == 'כל הדפים' else prefixes[r['page']]
            counters[pre] = counters.get(pre, 0) + 1
            r['id'] = f'{pre}-{counters[pre]:03d}'
    return [s for s in sections if s['rows']]


def rtl(par):
    pPr = par._p.get_or_add_pPr(); el = OxmlElement('w:bidi'); el.set(qn('w:val'), '1'); pPr.append(el)
    par.alignment = WD_ALIGN_PARAGRAPH.RIGHT


def run(par, text, size=10.5, bold=False, color=None, he=True):
    r = par.add_run(text); r.font.size = Pt(size); r.bold = bold
    r.font.name = 'Arial'
    if he:
        rPr = r._r.get_or_add_rPr(); el = OxmlElement('w:rtl'); el.set(qn('w:val'), '1'); rPr.append(el)
        r._r.rPr.rFonts.set(qn('w:cs'), 'Arial'); r.font.cs_size = Pt(size)
        szcs = OxmlElement('w:szCs'); szcs.set(qn('w:val'), str(int(size * 2))); rPr.append(szcs)
        if bold: rPr.append(OxmlElement('w:bCs'))
    if color: r.font.color.rgb = RGBColor.from_string(color)
    return r


def shade(cell, hex_):
    tcPr = cell._tc.get_or_add_tcPr(); s = OxmlElement('w:shd')
    s.set(qn('w:val'), 'clear'); s.set(qn('w:color'), 'auto'); s.set(qn('w:fill'), hex_); tcPr.append(s)


def table_rtl(t):
    tblPr = t._tbl.tblPr; el = OxmlElement('w:bidiVisual'); tblPr.append(el)


def write_docx(sections, path):
    doc = Document()
    sec = doc.sections[0]
    sec.orientation = WD_ORIENT.LANDSCAPE
    sec.page_width, sec.page_height = sec.page_height, sec.page_width
    for side in ('left_margin', 'right_margin', 'top_margin', 'bottom_margin'): setattr(sec, side, Cm(1.6))
    p = doc.add_paragraph(); rtl(p); run(p, 'כל הטקסט של אתר Automation Club', 20, True)
    p = doc.add_paragraph(); rtl(p)
    run(p, f'נוצר ב-{datetime.date.today():%d/%m/%Y} מתוך האתר עצמו · {sum(len(s["rows"]) for s in sections)} טקסטים', 10, color='666666')
    tips = [
        'משנים את הטקסט בעמודה "עברית". אפשר גם באנגלית; אם שינית רק עברית, אתרגם לאנגלית בעצמי.',
        'לא מוחקים את עמודת המספר (למשל H-012). לפיה אני מחזיר כל טקסט למקום הנכון באתר.',
        'מילים מודגשות בצבע הן החלק שמופיע באתר בצבע אחר (ההדגשה בכותרת). אפשר להזיז את ההדגשה.',
        'כדי למחוק טקסט: כותבים "למחוק" בעמודה. כדי להוסיף טקסט חדש: שורה חדשה בלי מספר, וליד כתוב איפה.',
        'טקסט שמסומן "מופיע כמה פעמים" ישתנה בכל המקומות יחד.',
    ]
    for t in tips:
        p = doc.add_paragraph(style='List Bullet'); rtl(p); run(p, t, 10.5)
    for s in sections:
        h = doc.add_paragraph(); rtl(h); h.paragraph_format.space_before = Pt(16)
        run(h, s['page'], 10, True, '8A6D3B'); run(h, '  ·  ', 10, color='999999')
        run(h, s['group'], 13, True, '1F2A44')
        t = doc.add_table(rows=1, cols=3); t.style = 'Table Grid'; table_rtl(t)
        t.autofit = False
        widths = (Cm(2.2), Cm(12.4), Cm(10.6))
        for cell, label, w in zip(t.rows[0].cells, ('מס׳', 'עברית', 'English'), widths):
            cell.width = w; shade(cell, 'E8ECF4'); cp = cell.paragraphs[0]; rtl(cp); run(cp, label, 10, True)
        for r in s['rows']:
            cells = t.add_row().cells
            for cell, w in zip(cells, widths): cell.width = w
            cp = cells[0].paragraphs[0]; rtl(cp); run(cp, r['id'], 9, color='777777', he=False)
            cp = cells[1].paragraphs[0]; rtl(cp)
            heading = r.get('kind') == 'כותרת'
            for i, part in enumerate(r['parts']):
                if i: run(cp, ' ', 11)
                run(cp, part['he'], 11, heading or part['accent'], '2F55A4' if part['accent'] else None)
            notes = [k for k in [r.get('kind') if r.get('kind') not in ('', 'כותרת') else '',
                                 f'מופיע {r["repeats"]} פעמים' if r.get('repeats') else ''] if k]
            if notes: run(cp, f'   ({" · ".join(notes)})', 8.5, color='999999')
            cp = cells[2].paragraphs[0]; cp.alignment = WD_ALIGN_PARAGRAPH.LEFT
            for i, part in enumerate(r['parts']):
                if i: run(cp, ' ', 10, he=False)
                run(cp, part['en'], 10, heading or part['accent'], '2F55A4' if part['accent'] else '444444', he=False)
    doc.save(path)


def main():
    srv, base = serve()
    try:
        pages = extract(base)
    finally:
        srv.shutdown()
    sections = build_rows(pages)
    OUT.mkdir(exist_ok=True)
    (OUT / 'site-text.json').write_text(json.dumps(sections, ensure_ascii=False, indent=1))
    write_docx(sections, OUT / 'site-text.docx')
    n = sum(len(s['rows']) for s in sections)
    untranslated = [r['id'] for s in sections for r in s['rows'] for p in r['parts'] if p['en'] == p['he']]
    print(f'{n} texts in {len(sections)} sections -> {OUT / "site-text.docx"}')
    if untranslated: print('no English for:', ', '.join(untranslated))
    return 0


if __name__ == '__main__':
    sys.exit(main())
