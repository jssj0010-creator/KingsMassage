<script>
/*! region-map.js: Leaflet autoload + slug decode + coords + fix grey box */
(function () {
  var TABLE = {
    // 서울 전체 + 25개 구
    "seoul":[37.5665,126.9780],
    "seoul-강남":[37.5172,127.0473],"seoul-서초":[37.4836,127.0327],"seoul-송파":[37.5146,127.1059],
    "seoul-마포":[37.5638,126.9084],"seoul-용산":[37.5326,126.9905],"seoul-종로":[37.5730,126.9794],
    "seoul-성동":[37.5634,127.0364],"seoul-광진":[37.5386,127.0827],"seoul-동대문":[37.5744,127.0396],
    "seoul-성북":[37.5894,127.0166],"seoul-은평":[37.6029,126.9291],"seoul-노원":[37.6543,127.0565],
    "seoul-중랑":[37.6063,127.0927],"seoul-중구":[37.5636,126.9976],"seoul-강동":[37.5301,127.1238],
    "seoul-강서":[37.5601,126.8226],"seoul-양천":[37.5172,126.8664],"seoul-구로":[37.4955,126.8878],
    "seoul-금천":[37.4569,126.8951],"seoul-동작":[37.5124,126.9393],"seoul-영등포":[37.5263,126.8963],
    "seoul-관악":[37.4781,126.9516],"seoul-강북":[37.6398,127.0256],"seoul-도봉":[37.6688,127.0471],
    // 경기 전체 + 주요
    "gyeonggi":[37.2899,127.0530],
    "gyeonggi-성남":[37.4200,127.1265],"gyeonggi-분당":[37.3826,127.1180],"gyeonggi-수원":[37.2636,127.0286],
    "gyeonggi-용인":[37.2411,127.1775],"gyeonggi-고양":[37.6584,126.8320],"gyeonggi-일산":[37.6769,126.7470],
    "gyeonggi-부천":[37.5033,126.7660],"gyeonggi-김포":[37.6154,126.7158],"gyeonggi-의정부":[37.7381,127.0456],
    "gyeonggi-평택":[36.9907,127.0907],"gyeonggi-시흥":[37.3800,126.8020],"gyeonggi-안산":[37.3219,126.8309],
    "gyeonggi-안양":[37.3943,126.9568],"gyeonggi-과천":[37.4292,126.9878],"gyeonggi-광명":[37.4786,126.8649],
    "gyeonggi-파주":[37.7599,126.7778],"gyeonggi-하남":[37.5393,127.2146],"gyeonggi-구리":[37.5943,127.1296],
    "gyeonggi-남양주":[37.6360,127.2165],"gyeonggi-군포":[37.3614,126.9350],"gyeonggi-오산":[37.1499,127.0770],
    "gyeonggi-광주":[37.4090,127.2560],
    // 인천 전체 + 구/군
    "incheon":[37.4563,126.7052],
    "incheon-계양":[37.5383,126.7364],"incheon-부평":[37.5074,126.7210],"incheon-미추홀":[37.4630,126.6500],
    "incheon-연수":[37.4108,126.6780],"incheon-송도":[37.3850,126.6390],"incheon-남동":[37.4472,126.7310],
    "incheon-서구":[37.5450,126.6750],"incheon-강화":[37.7479,126.4870],"incheon-영종도":[37.5110,126.5610],
    "incheon-중구":[37.4736,126.6210],"incheon-동구":[37.4743,126.6430]
  };

  var TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var ATTR = '&copy; OpenStreetMap contributors';
  var FALLBACK = [37.5665,126.9780];

  function ensureLeaflet(cb){
    if (window.L && window.L.map) return cb();
    var css = document.createElement('link');
    css.rel='stylesheet';
    css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(css);
    var js = document.createElement('script');
    js.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    js.onload = cb;
    js.onerror = function(){ console.error('Leaflet load failed'); };
    document.head.appendChild(js);
  }

  function decodeSlug(){
    var m = location.pathname.match(/\/regions\/([^\/]+)\.html$/);
    var raw = m ? m[1] : '';
    try { return decodeURIComponent(raw) || raw; } catch(e){ return raw; }
  }

  function init(){
    var el = document.getElementById('region-map');
    if(!el || el.dataset.inited) return;
    el.dataset.inited = '1';

    // 최소 높이 보장(회색 박스 방지)
    if ((el.clientHeight||0) < 240 && (parseInt(getComputedStyle(el).minHeight)||0) < 240) {
      el.style.minHeight = '320px';
    }
    el.style.width = el.style.width || '100%';

    ensureLeaflet(function(){
      var slug = decodeSlug();

      var lat = parseFloat(el.getAttribute('data-lat'));
      var lng = parseFloat(el.getAttribute('data-lng'));
      var coords = (isFinite(lat)&&isFinite(lng)) ? [lat,lng] : (TABLE[slug] || null);

      if(!coords){
        if (/^seoul/.test(slug)) coords = TABLE['seoul'];
        else if (/^gyeonggi/.test(slug)) coords = TABLE['gyeonggi'];
        else if (/^incheon/.test(slug)) coords = TABLE['incheon'];
        else coords = FALLBACK;
      }

      var map = L.map(el, {scrollWheelZoom:false, attributionControl:false}).setView(coords, 12);
      L.tileLayer(TILE, {attribution: ATTR}).addTo(map);
      L.marker(coords).addTo(map);

      // 초기 렌더 후 회색 현상 방지
      setTimeout(function(){ map.invalidateSize(); }, 80);
      window.addEventListener('resize', function(){ map.invalidateSize(); });

      console.log('[region-map] slug=', slug, 'coords=', coords);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
</script>
