
// assets/region-map.js (iframe version)
// Replace static image with OSM embed iframe for higher reliability.
// - Detect region from URL or #region-map[data-region]
// - Uses window.REGION_COORDS (center {lat,lon} + zoom)
// - Builds an OSM embed URL: https://www.openstreetmap.org/export/embed.html?bbox=...&marker=...
// - No API key required.

(function(){
  function sel(q, root){ return (root||document).querySelector(q); }
  function detectRegion(){
    var el = sel('#region-map');
    if (el && el.dataset && el.dataset.region) return el.dataset.region.toLowerCase();
    var m = (location.pathname || '').match(/\/regions\/(seoul|gyeonggi|incheon)(?:\.html|$)/i);
    return m ? m[1].toLowerCase() : 'seoul';
  }
  function coordsFor(region){
    var def = { center:{lat:37.5665, lon:126.9780}, zoom:12, marker:{lat:37.5665, lon:126.9780} };
    var data = (window.REGION_COORDS && window.REGION_COORDS[region]) || window.REGION_COORDS_DEFAULT || def;
    // normalize
    data.center = data.center || def.center;
    data.marker = data.marker || data.center;
    data.zoom = data.zoom || 12;
    return data;
  }

  // Approximate half-width/height degrees by zoom (simple heuristic good enough for city view)
  function zoomToDelta(zoom){
    // Wider area for low zoom, tighter for high zoom
    if (zoom <= 9)  return { dlat: 0.6,  dlon: 0.8 };
    if (zoom === 10) return { dlat: 0.35, dlon: 0.5 };
    if (zoom === 11) return { dlat: 0.2,  dlon: 0.3 };
    if (zoom === 12) return { dlat: 0.1,  dlon: 0.15 };
    if (zoom === 13) return { dlat: 0.05, dlon: 0.08 };
    return { dlat: 0.1, dlon: 0.15 };
  }

  function render(){
    var host = sel('#region-map');
    if (!host) return;
    if (host.getAttribute('data-map-rendered') === '1') return;

    var region = detectRegion();
    var cfg = coordsFor(region);
    var lat = +cfg.center.lat, lon = +cfg.center.lon;
    var ml = cfg.marker || cfg.center;
    var mlat = +ml.lat, mlon = +ml.lon;
    var zoom = +cfg.zoom;

    var delta = zoomToDelta(zoom);
    var minlon = lon - delta.dlon, maxlon = lon + delta.dlon;
    var minlat = lat - delta.dlat, maxlat = lat + delta.dlat;

    // Build embed URL (no cookies/API)
    var url = "https://www.openstreetmap.org/export/embed.html"
      + "?bbox=" + encodeURIComponent([minlon, minlat, maxlon, maxlat].join(","))
      + "&layer=mapnik"
      + "&marker=" + encodeURIComponent(mlat + "," + mlon);

    // Create iframe
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.setAttribute('style', 'border:0;width:100%;height:260px');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'no-referrer');
    iframe.setAttribute('aria-label', '지역 위치 지도');

    iframe.addEventListener('error', function(){
      host.textContent = "지도를 불러오지 못했습니다.";
    });

    host.innerHTML = "";
    host.appendChild(iframe);
    host.setAttribute('data-map-rendered', '1');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
  window.KingsMapRender = render; // debug hook
})();
