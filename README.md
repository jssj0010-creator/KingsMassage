# 킹즈마사지 Hybrid + Split Boards

요청 반영:
- 입점신청 게시판을 **홈케어/로드샵**으로 **완전 분리**
- 각 게시판은 개별 페이지(`apply-homecare.html`, `apply-roadshop.html`)와 **독립 LocalStorage** 네임스페이스 사용

## 파일
- `index.html` — 메인(지역 랜딩/스폰서/입점목록) + 내비 링크(입점 홈케어/로드샵)
- `apply-homecare.html` — 홈케어 전용 게시판
- `apply-roadshop.html` — 로드샵 전용 게시판
- `board-homecare.js`, `board-roadshop.js` — 각 게시판 로직(LocalStorage)
- `app.js`, `styles.css`, `listings.json`, `regions/*`, `assets/*`

## 배포
- GitHub Pages 또는 Netlify 정적 배포 그대로 동작
- 서버 수집 필요 시 Netlify Forms 또는 간단한 백엔드(API) 연동 권장

MIT License.
