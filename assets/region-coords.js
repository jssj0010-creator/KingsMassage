// /assets/region-coords.js
// Updated: 2025-09-19
// Purpose: Provide precise coordinates for all Gyeonggi/Incheon region pages so each page's map pin centers correctly.
// It merges with any existing window.__REGION_COORDS__ (won't overwrite existing keys).

(function(){
  var src = {
    // ----- GYEONGGI (경기) -----
    "gyeonggi-성남":   [37.4200, 127.1265],
    "gyeonggi-분당":   [37.3826, 127.1180],
    "gyeonggi-수원":   [37.2636, 127.0286],
    "gyeonggi-용인":   [37.2411, 127.1775],
    "gyeonggi-고양":   [37.6584, 126.8320],
    "gyeonggi-일산":   [37.6769, 126.7470],
    "gyeonggi-부천":   [37.5033, 126.7660],
    "gyeonggi-김포":   [37.6154, 126.7158],
    "gyeonggi-의정부": [37.7381, 127.0456],
    "gyeonggi-평택":   [36.9907, 127.0907],
    "gyeonggi-시흥":   [37.3800, 126.8020],
    "gyeonggi-안산":   [37.3219, 126.8309],
    "gyeonggi-안양":   [37.3943, 126.9568],
    "gyeonggi-과천":   [37.4292, 126.9878],
    "gyeonggi-광명":   [37.4786, 126.8649],
    "gyeonggi-파주":   [37.7599, 126.7778],
    "gyeonggi-하남":   [37.5393, 127.2146],
    "gyeonggi-구리":   [37.5943, 127.1296],
    "gyeonggi-남양주": [37.6360, 127.2165],
    "gyeonggi-군포":   [37.3614, 126.9350],
    "gyeonggi-오산":   [37.1499, 127.0770],
    "gyeonggi-광주":   [37.4090, 127.2560],

    // ----- INCHEON (인천) -----
    "incheon-인천":   [37.4563, 126.7052],
    "incheon-계양":   [37.5383, 126.7364],
    "incheon-부평":   [37.5074, 126.7210],
    "incheon-미추홀": [37.4630, 126.6500],
    "incheon-연수":   [37.4108, 126.6780],
    "incheon-송도":   [37.3850, 126.6390],
    "incheon-남동":   [37.4472, 126.7310],
    "incheon-서구":   [37.5450, 126.6750],
    "incheon-강화":   [37.7479, 126.4870],
    "incheon-영종도": [37.5110, 126.5610],
    "incheon-중구":   [37.4736, 126.6210],
    "incheon-동구":   [37.4743, 126.6430]
  };

  // Merge without clobbering existing keys
  var base = (window.__REGION_COORDS__ = window.__REGION_COORDS__ || {});
  for (var k in src) if (!(k in base)) base[k] = src[k];
})();
