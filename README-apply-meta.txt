KingsMSG 메타 태그 일괄 변경 킷
================================

바꾸려는 문구:
  "[킹즈마사지] 스웨디시, 건마, 출장마사지, 출장안마, 타이마사지, 마사지사이트, 1인샵, 홈타이 | 전국 마사지 정보와 지역별, 타입별 마사지업체 정보 제공 내주변 인기샵을 추천"

이 킷은 3가지 방법을 제공합니다.

A) 수동 붙여넣기 (가장 안전)
----------------------------
1) GitHub에서 `index.html` 열기 → 연필 → `<head>` 안에 아래 블록(meta-block.html)을 그대로 붙여넣고 기존 `<title>`/`<meta name="description">`는 삭제 또는 덮어쓰기 하세요.
2) `regions/` 폴더의 모든 HTML 파일도 동일하게 `<head>` 안에 붙여넣어 통일합니다.
3) Commit.

B) macOS / Linux에서 일괄 치환 (터미널)
-------------------------------------
1) 리포를 로컬로 클론:
   git clone https://github.com/jssj0010-creator/KingsMassage.git
   cd KingsMassage

2) 실행:
   chmod +x update-meta.sh
   ./update-meta.sh

- macOS의 기본 sed(BSD)와 Linux의 GNU sed를 모두 지원합니다.
- 스크립트는 `index.html`과 `regions/*.html`의 `<title>`과 `<meta name="description">`를 찾아서 통일합니다.
- 실패 시에는 수동 붙여넣기(A)를 사용하세요.

C) Windows PowerShell에서 일괄 치환
-----------------------------------
1) 리포를 로컬로 클론 후, PowerShell을 관리자 권한으로 열고:
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\update-meta.ps1

검증
----
- 브라우저에서 View Source로 `<head>` 내 수정이 반영됐는지 확인
- 카톡/디엠에 링크 붙여 미리보기(og:description)가 바뀌었는지 확인
- Google Search Console → URL 검사 → 라이브 테스트로 최신 메타 확인

문제 해결
--------
- 일부 파일에 `<meta name="description">`이 없으면 스크립트가 자동 삽입합니다.
- sed 정규식이 OS마다 다르게 동작할 수 있어요. 이런 경우엔 A) 수동 방식이 가장 확실합니다.