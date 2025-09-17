
// assets/region-map.js
// - Detect region from URL or #region-map[data-region]
// - Use window.REGION_COORDS from region-coords.js
// - Render static OSM map with correct center/zoom/marker
(function(){
  function sel(q, root){ return (root||document).querySelector(q); }
  function detectRegion(){
    var el = sel('#region-map');
    if (el && el.dataset && el.dataset.region) {
      return el.dataset.region.toLowerCase();
    }
    var m = (location.pathname || '').match(/\/regions\/(seoul|gyeonggi|incheon)(?:\.html|$)/i);
    return m ? m[1].toLowerCase() : 'seoul';
  }
  function coordsFor(region){
    var data = (window.REGION_COORDS && window.REGION_COORDS[region]) || window.REGION_COORDS_DEFAULT;
    if (!data) { // absolute fallback
      data = { center:{lat:37.5665, lon:126.9780}, zoom:12, marker:{lat:37.5665, lon:126.9780} };
    }
    return data;
  }
  function render(){
    var host = sel('#region-map');
    if (!host) return;
    // prevent double render
    if (host.getAttribute('data-map-rendered') === '1') return;

    var region = detectRegion();
    var cfg = coordsFor(region);

    var lat = (cfg.center && cfg.center.lat) || 37.5665;
    var lon = (cfg.center && cfg.center.lon) || 126.9780;
    var zoom = cfg.zoom || 12;
    var mlat = (cfg.marker && cfg.marker.lat) || lat;
    var mlon = (cfg.marker && cfg.marker.lon) || lon;

    var width = Math.min(1280, Math.max(960, window.innerWidth || 960));
    var height = 260;
    var src = "https://staticmap.openstreetmap.de/staticmap.php"
      + "?center=" + encodeURIComponent(lat + "," + lon)
      + "&zoom=" + encodeURIComponent(zoom)
      + "&size=" + encodeURIComponent(width + "x" + height)
      + "&markers=" + encodeURIComponent(mlat + "," + mlon + ",lightblue1");

    var img = new Image();
    img.alt = "지역 위치 지도 (" + region + ")";
    img.className = "map-fallback";
    img.width = width;
    img.height = height;
    img.referrerPolicy = "no-referrer";
    img.onload = function(){
      host.innerHTML = "";
      host.appendChild(img);
      host.setAttribute('data-map-rendered', '1');
    };
    img.onerror = function(){
      // graceful fallback text
      host.textContent = "지도를 불러오지 못했습니다.";
    };
    img.src = src;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
  window.KingsMapRender = render; // debugging hook
})();
