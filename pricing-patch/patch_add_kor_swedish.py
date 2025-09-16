#!/usr/bin/env python3
import os, re, time, shutil, pathlib, sys

ROOT = pathlib.Path(".").resolve()
REGIONS = ROOT / "regions"
TARGETS = list(ROOT.glob("*.html"))
if REGIONS.exists():
    TARGETS += list(REGIONS.glob("*.html"))
if not TARGETS:
    print("대상 HTML 없음. 레포 루트에서 실행해주세요.")
    sys.exit(0)

ROW_HTML = '''
<tr class="course-kor-swedish">
  <td data-label="코스"><strong>한국인 스웨디시</strong></td>
  <td data-label="60분"><span class="price">140,000원</span></td>
  <td data-label="90분"><span class="price">180,000원</span></td>
  <td data-label="120분"><span class="dim">-</span></td>
  <td data-label="150분"><span class="dim">-</span></td>
</tr>
'''.strip()

def backup(paths):
    stamp = time.strftime("%Y%m%d%H%M%S")
    bdir = ROOT / f".bak_{stamp}"
    for p in paths:
        dst = bdir / p.relative_to(ROOT)
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(p, dst)
    return bdir

def read(p): return p.read_text(encoding="utf-8", errors="ignore")
def write(p,s): p.write_text(s, encoding="utf-8")

def has_pricing_table(html):
    return re.search(r'<table[^>]+class=["\']pricing-table["\']', html, flags=re.I) is not None

def has_required_headers(html):
    thead = re.search(r'<thead[^>]*>(.*?)</thead>', html, flags=re.I|re.S)
    if not thead: 
        return False
    text = thead.group(1)
    reqs = ["60분", "90분", "120분", "150분"]
    return all(r in text for r in reqs)

def already_exists(html):
    return "한국인 스웨디시" in html

def insert_after_special(html):
    m = re.search(r'(<tr[^>]*>.*?스페셜\s*감성\s*힐링마사지.*?</tr>)', html, flags=re.I|re.S)
    if not m:
        return None
    idx = m.end()
    return html[:idx] + "\n" + ROW_HTML + "\n" + html[idx:]

def insert_after_tbody(html):
    m = re.search(r'(<tbody[^>]*>)', html, flags=re.I)
    if not m:
        return None
    idx = m.end()
    return html[:idx] + "\n" + ROW_HTML + "\n" + html[idx:]

def patch_file(html):
    if not has_pricing_table(html): 
        return html, False
    if not has_required_headers(html):
        return html, False
    if already_exists(html):
        return html, False
    new_html = insert_after_special(html)
    if new_html is None:
        new_html = insert_after_tbody(html)
    if new_html:
        return new_html, True
    return html, False

bdir = backup(TARGETS)
print("백업 폴더:", bdir)

changed = 0
for p in TARGETS:
    html = read(p)
    new_html, did = patch_file(html)
    if did and new_html != html:
        write(p, new_html)
        changed += 1

print(f"수정된 파일 수: {changed}/{len(TARGETS)}")
