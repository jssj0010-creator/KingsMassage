# KingMassage Directory (Clean-room Template)

> 이 저장소는 **massageking.co.kr** 의 저작물을 복제하지 않고, 공개 웹을 참고하지 않은 **클린룸(독자 제작) 템플릿**입니다. 레이아웃/섹션 구성이 유사할 수 있으나 텍스트/디자인/자산은 모두 새로 제작되었습니다.

## 구조
- `index.html` — 히어로, 지역 랜딩(서울/경기/인천), 스폰서 고정영역, 입점업체 리스트, 가격표, 입점 폼(홈케어/로드샵 탭)
- `regions/` — 지역 랜딩 서브페이지 예시
- `listings.json` — 입점업체 더미 데이터 (필요시 수정)
- `styles.css`, `app.js`
- `assets/` — 플레이스홀더 로고

## 배포 (GitHub Pages)
1. 이 폴더를 새 GitHub 리포지토리에 업로드
2. GitHub → Settings → Pages → **Deploy from a branch** 선택
3. Branch: `main`, Folder: `/ (root)` 선택 → Save
4. 제공된 Pages URL 접속

## 배포 (Netlify)
1. [Netlify](https://app.netlify.com/) 로그인 → **Add new site → Import an existing project**
2. Git 제공자와 리포지토리 연결
3. Build command: *(빈칸)*, Publish directory: `/` 로 설정 (정적 사이트)
4. Deploy 완료 후 **Domain settings** 에서 커스텀 도메인 연결

## 커스터마이징
- `index.html` 의 텍스트를 실제 업소 정보로 교체
- `listings.json` 을 실제 데이터로 교체
- `app.js` 의 `mailto:you@example.com` 을 본인 메일로 교체 (초기 운영용)
- 추후 백엔드/DB 연결시 폼 처리 및 검색 구현

## 라이선스
- 본 템플릿은 MIT License 입니다. 단, 제3자의 상표/이미지/텍스트를 무단 사용하지 마세요.
