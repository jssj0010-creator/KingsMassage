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

ROW_HTML = (
    '<tr class="course-kor-swedish">\n'
    '  <td data-label="코스"><strong>한국인 스웨디시</strong></td>\n'
    '  <td data-label="60분"><span class="price">140,000원</span></td>\n'
    '  <td data-label="90분"><span class="price">180,000원</span></td>\n'
    '  <td data-label="120분"><span class="dim">-</span></td>\n'
    '  <td data-label="150분"><span class="dim">-</span></td>\n'
    '</tr>\n'
)

THEAD_STD = (
    "<thead>\n"
    "  <tr>\n"
    "    <th>코스</th>\n"
    "    <th>60분</th>\n"
    "    <th>90분</th>\n"
    "    <th>120분</th>\n"
    "    <th>150분</th>\n"
    "  </tr>\n"
    "</thead>\n"
)

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

def patch_one(html):
    # 1) 첫 번째 pricing-table 블록을 캡처
    m_table = re.search(r'(<table[^>]*class=["\']?[^>"\']*pricing-table[^>"\']*["\']?[^>]*>)(.*?)(</table>)',
                        html, flags=re.I|re.S)
    if not m_table:
        return html, False, "no_pricing_table"

    t_open, t_body, t_close = m_table.group(1), m_table.group(2), m_table.group(3)

    # 2) thead/ tbody 분리
    m_thead = re.search(r'(<thead[^>]*>.*?</thead>)', t_body, flags=re.I|re.S)
    m_tbody = re.search(r'(<tbody[^>]*>)(.*?)(</tbody>)', t_body, flags=re.I|re.S)

    # 보강: thead 없거나 60/90/120/150 누락 시 표준 thead로 교체
    need_thead_rewrite = False
    if m_thead:
        thead_html = m_thead.group(1)
        head_txt = re.sub(r'<[^>]+>', '', thead_html)
        if not all(k in head_txt for k in ["60분", "90분", "120분", "150분"]):
            need_thead_rewrite = True
    else:
        need_thead_rewrite = True

    if need_thead_rewrite:
        # thead 있으면 교체, 없으면 tbody 앞/첫머리에 삽입
        if m_thead:
            t_body = t_body.replace(m_thead.group(1), THEAD_STD)
        else:
            if m_tbody:
                t_body = t_body.replace(m_tbody.group(1), THEAD_STD + m_tbody.group(1))
            else:
                # tbody도 없다면 생성해서 삽입
                t_body = THEAD_STD + "<tbody>\n</tbody>\n"

    # 3) tbody 확보(없으면 생성)
    m_tbody = re.search(r'(<tbody[^>]*>)(.*?)(</tbody>)', t_body, flags=re.I|re.S)
    if not m_tbody:
        # thead 뒤에 새로 만든다
        if THEAD_STD in t_body:
            t_body = t_body.replace(THEAD_STD, THEAD_STD + "<tbody>\n</tbody>\n")
        else:
            t_body = "<tbody>\n</tbody>\n" + t_body
        m_tbody = re.search(r'(<tbody[^>]*>)(.*?)(</tbody>)', t_body, flags=re.I|re.S)

    tbody_open, tbody_inner, tbody_close = m_tbody.group(1), m_tbody.group(2), m_tbody.group(3)

    # 4) 이미 존재하면 스킵
    if "한국인 스웨디시" in tbody_inner:
        new_tbody_inner = tbody_inner
        inserted_where = "exists_already"
    else:
        # "스페셜 감성 힐링마사지" 행 뒤에 삽입 시도
        m_special = re.search(r'(<tr[^>]*>.*?스페셜\s*감성\s*힐링마사지.*?</tr>)', tbody_inner, flags=re.I|re.S)
        if m_special:
            idx = m_special.end()
            new_tbody_inner = tbody_inner[:idx] + "\n" + ROW_HTML + tbody_inner[idx:]
            inserted_where = "after_special"
        else:
            # 없으면 tbody 끝에 추가
            new_tbody_inner = tbody_inner.rstrip() + "\n" + ROW_HTML
            inserted_where = "append"

    # 5) 테이블 재조립
    t_body_new = t_body[:m_tbody.start()] + tbody_open + new_tbody_inner + tbody_close + t_body[m_tbody.end():]
    new_html = html[:m_table.start()] + t_open + t_body_new + t_close + html[m_table.end():]
    changed = (new_html != html)
    return new_html, changed, inserted_where

# 실행부
bdir = backup(TARGETS)
print("백업 폴더:", bdir)

changed_files = 0
log = []
for p in TARGETS:
    html = read(p)
    new_html, changed, why = patch_one(html)
    if changed:
        write(p, new_html)
        changed_files += 1
    log.append((p.name, why))

print(f"수정된 파일 수: {changed_files}/{len(TARGETS)}")
for name, why in log[:50]:
    print(f"- {name}: {why}")
