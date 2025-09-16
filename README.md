# Region Map Pack v5.2 (두 가지 방식 지원)

## 1) 전역 매핑 방식 (권장: 유지보수 쉬움)
- `/assets/region-coords.js`를 **한 번만** 사이트 공통 레이아웃(헤더/푸터)에서 로드
- 각 지역 페이지에는 `partials/region-map-snippet.html`의 간단 스니펫만 넣으면 끝

## 2) 페이지별 좌표 지정 (데이터 속성)
- 각 지역 페이지의 컨테이너에 직접 좌표를 지정
```html
<div id="region-map" data-lat="37.5172" data-lng="127.0473"></div>
```
- v5.2의 `region-map.js`는 `data-lat`/`data-lng`를 **최우선**으로 사용하고,
  없을 때만 `window.__REGION_COORDS__` 또는 서울 기본값으로 폴백

## SEO/성능
- v4에서 추가된 LocalBusiness/Service + GeoCoordinates + FAQ + BreadcrumbList + CLS 최적화 그대로 포함
