# Region Map Pack v4 (SEO 강화)

이 버전은 지도 표시 로직은 그대로 유지하면서 **구글 검색 순위에 유리한 구조화 데이터**를 자동 삽입합니다.

## 핵심 강화점
- **LocalBusiness + Service + GeoCoordinates**: 지역명/좌표/전화/서비스영역을 포함
- **BreadcrumbList**: 홈 → 현재 지역 경로 제공
- **FAQPage**: 페이지의 실제 FAQ와 동일한 질문/답변을 JSON‑LD로 제공
- **CLS 최소화**: 정적 이미지에 width/height 지정
- **CSP 샘플**: `_headers.example`에 외부 리소스 허용 및 정적 자산 장기 캐시 예시

## 사용법
1) `/assets/region-map.css`, `/assets/region-map.js`, `/partials/region-map-snippet.html` 추가
2) 스니펫을 “※ 교통 상황…” 문구와 FAQ 사이에 삽입
3) v3에서 제공한 전체 좌표 매핑이 있다면 스니펫의 `window.__REGION_COORDS__`에 주입

## 팁
- 각 지역의 좌표가 더 정확할수록 `LocalBusiness.geo` 신뢰도가 올라갑니다.
- FAQ 텍스트가 페이지 본문과 **내용상 동일**해야 합니다(과장 금지).
- 가능하면 지역 페이지마다 `h1`을 지역명으로 유지하세요(라벨 자동 추출).
