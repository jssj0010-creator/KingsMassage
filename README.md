# Region Map Pack v5 — KingsMSG (SEO + 62개 좌표 완전 매핑)

- 리포의 `/regions/*.html` **62개** 파일명을 읽어 전체 좌표를 `window.__REGION_COORDS__`에 주입했습니다.
- v4의 SEO 강화( LocalBusiness/Service + GeoCoordinates, BreadcrumbList, FAQPage, CLS 최소화 )를 그대로 포함합니다.

## 설치
1) `/assets/region-map.css`, `/assets/region-map.js`, `/partials/region-map-snippet.html`, `_headers.example` 복사
2) 지역 페이지에서 “※ 교통 상황 …” 문구와 **FAQ 사이**에 `partials/region-map-snippet.html` 블록을 붙여넣기(한 번만)
3) Netlify의 `_headers`를 사용 중이면, `unpkg.com`/`tile.openstreetmap.org`/`staticmap.openstreetmap.de` 허용

## 메모
- 파일명이 키입니다. 예: `seoul-강남.html` → `"seoul-강남"`
- 일부 키는 시·도 중심 좌표로 폴백. 더 정확한 중심 좌표로 바꾸고 싶으면 해당 항목의 숫자만 수정하면 됩니다.

## 좌표 키 목록
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
