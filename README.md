# KingsMSG Region Map Pack (SEO-Optimized)

이 패키지는 지역 페이지에 **지도+핀**을 추가하면서 **SEO 최적화(크롤러 친화)** 까지 한 번에 적용합니다.

## 구성
- `assets/region-map.css` — 지도 영역 스타일
- `assets/region-map.js`  — 좌표 매핑, 지연 로딩, JSON‑LD(Place/GeoCoordinates) 자동 주입, OSM 정적 맵 폴백 포함
- `partials/region-map-snippet.html` — 페이지에 붙여 넣을 스니펫(문구와 FAQ 사이)

## 설치
1) 리포지토리에 폴더째 복사:
```
/assets/region-map.css
/assets/region-map.js
/partials/region-map-snippet.html
```
2) 지역 페이지의 **문구(※ 교통 상황…)와 FAQ 사이**에 `partials/region-map-snippet.html`의 `<div id="region-map">…` 블록을 붙여 넣습니다.

3) `<head>`에 CSS를 연결합니다.
```html
<link rel="stylesheet" href="/assets/region-map.css">
```

4) `</body>` 직전에 스크립트를 연결합니다.
```html
<script src="/assets/region-map.js" defer></script>
```

## 작동 원리 (SEO 포인트)
- **정적 폴백 이미지**: JS가 꺼져 있어도 `<noscript>`의 OSM 정적 이미지가 노출되어, 크롤러/저사양 환경에서도 위치 정보가 보입니다.
- **JSON-LD 자동 주입**: 페이지 파일명(`/regions/seoul-강남.html`)을 키로 좌표를 찾고, `Place + GeoCoordinates` 스키마를 `<head>`에 자동 삽입합니다.
- **지연 로딩**: `IntersectionObserver`로 뷰포트에 들어올 때 Leaflet과 타일만 로드 → 성능 최적화.
- **접근성(ARIA)**: 지도 컨테이너에 `role="img"`/`aria-label` 부여.

## 좌표 추가/수정
`assets/region-map.js` 상단의 `REGION_COORDS`에 키와 `[위도,경도]`를 추가하세요.
키 규칙: `/regions/파일명.html`의 파일명(확장자 제외). 예: `seoul-강동`, `gyeonggi-안산`, `incheon-서구`

## 클릭 동작
지도/마커 클릭 시 **Google Maps**로 새탭 연결(`https://maps.google.com/?q=lat,lng`).

## 주의
- OSM 정적 맵은 커뮤니티 서비스로 간헐적 레이트리밋이 있을 수 있습니다. 트래픽이 많아지면 정적 이미지를 사전에 생성/호스팅하거나, 타일 프록시를 준비하세요.
- 전화번호는 기본값 `010-4637-9556`으로 JSON‑LD에 주입됩니다. 변경 시 JS 내 값을 수정하세요.
