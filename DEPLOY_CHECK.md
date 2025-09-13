# KingsMassage Restore v9 - 배포 체크리스트

## GitHub Pages 설정
- Repository: **jssj0010-creator/KingsMassage** (현재 레포와 일치?)
- Settings → Pages:
  - **Source: main** (또는 gh-pages) / **Folder: /(root)**
  - **Custom domain: kingsmsg.com**
  - **Enforce HTTPS** 체크
- 루트에 **CNAME** 파일 존재 (내용: `kingsmsg.com`)
- 루트에 **.nojekyll** 존재 (Jekyll 처리 방지)

## 덮어쓰기 순서
1) 이 ZIP을 레포 **루트**로 그대로 덮어쓰기 커밋
2) Actions/Pages 빌드 완료 후, 브라우저에서 **강력 새로고침**
   - PC: Ctrl+F5 / Mac: Cmd+Shift+R / 모바일: 하드 새로고침

## 확인 포인트
- 상단 히어로: '전체 카테고리' + 칩(홈케어/로드샵만)
- 메가메뉴: 클릭 시 **CSS만으로** 열림 + 캐럿 회전/페이드
- 타이틀: 모든 페이지 `[킹즈마사지] ...` 접두어
- 파비콘: 주소창/탭에서 **K 아이콘**
- canonical/og:url: `https://kingsmsg.com/...`
- 연락처 링크: `tel:01046379556` 동작, 카카오 오픈채팅 링크 동작
- robots.txt / sitemap.xml / 404.html 존재
