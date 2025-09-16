# KingsMSG Region Map Pack v2 (Full 62-key mapping)

- 자동으로 리포의 `/regions/*.html` 파일명을 읽어 좌표 키를 모두 포함했습니다.
- 좌표가 명확한 지역은 실제 중심 좌표를, 일부 불명확한 키는 시·도 중심좌표로 **안전 폴백**했습니다.
- 지도는 **정적 이미지 폴백 + Leaflet 지연 로딩 + JSON-LD(Place/GeoCoordinates) 자동 주입** 구조.

## 지역 키 개수
총 62개
```
gyeonggi
gyeonggi-고양
gyeonggi-과천
gyeonggi-광명
gyeonggi-광주
gyeonggi-구리
gyeonggi-군포
gyeonggi-김포
gyeonggi-남양주
gyeonggi-부천
gyeonggi-분당
gyeonggi-성남
gyeonggi-수원
gyeonggi-시흥
gyeonggi-안산
gyeonggi-안양
gyeonggi-오산
gyeonggi-용인
gyeonggi-의정부
gyeonggi-일산
gyeonggi-파주
gyeonggi-평택
gyeonggi-하남
incheon
incheon-강화
incheon-계양
incheon-남동
incheon-동구
incheon-미추홀
incheon-부평
incheon-서구
incheon-송도
incheon-연수
incheon-영종도
incheon-인천
incheon-중구
index
seoul
seoul-강남
seoul-강동
seoul-강북
seoul-강서
seoul-관악
seoul-광진
seoul-구로
seoul-금천
seoul-노원
seoul-도봉
seoul-동대문
seoul-동작
seoul-마포
seoul-서초
seoul-성동
seoul-성북
seoul-송파
seoul-양천
seoul-영등포
seoul-용산
seoul-은평
seoul-종로
seoul-중구
seoul-중랑
```

## 설치
`/assets/region-map.css`, `/assets/region-map.js`, `/partials/region-map-snippet.html` 추가 후
문구와 FAQ 사이에 스니펫의 `<div id="region-map">` 블록을 넣고,
`</body>` 직전에 스크립트를 로드하세요.

## 안 보일 때 체크리스트
1) 페이지에 `<div id="region-map">`가 **실제로 존재**하는지
2) 스크립트 경로가 `/assets/region-map.js`로 **정확**한지 (404 여부)
3) 페이지 파일명과 `REGION_COORDS` 키가 **일치**하는지 (예: `seoul-강남.html` → `"seoul-강남"`)
4) `_headers`의 CSP가 외부 `unpkg.com`, `tile.openstreetmap.org`, `staticmap.openstreetmap.de` 허용하는지
5) 브라우저 콘솔 오류: `Region map error` 또는 Mixed Content 없는지 (모두 https 사용)
6) 캐시: 배포 후 하드리프레시 / Netlify 캐시 무효화

필요시 키-좌표를 전부 **실측 좌표**로 세밀 보정해 드릴 수 있습니다.
