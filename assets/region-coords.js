// region-coords.js
// 좌표/줌 설정: 지역 페이지에서 #region-map 영역에 표시할 정적 지도용
// 사용처: assets/region-map.js 가 window.REGION_COORDS 를 참조합니다.

window.REGION_COORDS = {
  // 서울특별시 중심(시청 인근)
  seoul: {
    center: { lat: 37.5665, lon: 126.9780 },
    zoom: 12,
    marker: { lat: 37.5665, lon: 126.9780 }
  },

  // 경기도 중심(수원시청 인근, 도청 소재지 기준)
  gyeonggi: {
    center: { lat: 37.2636, lon: 127.0286 },
    zoom: 10,
    marker: { lat: 37.2636, lon: 127.0286 }
  },

  // 인천광역시 중심(인천시청/구월동 인근)
  incheon: {
    center: { lat: 37.4563, lon: 126.7052 },
    zoom: 12,
    marker: { lat: 37.4563, lon: 126.7052 }
  }
};

// 기본값 (정의되지 않은 경우 서울로 fallback)
window.REGION_COORDS_DEFAULT = {
  center: { lat: 37.5665, lon: 126.9780 },
  zoom: 12,
  marker: { lat: 37.5665, lon: 126.9780 }
};
