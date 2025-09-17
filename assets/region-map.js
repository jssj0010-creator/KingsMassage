
// assets/region-map.js (iframe, sub-region aware)
(function(){
  function sel(q, root){ return (root||document).querySelector(q); }
  function detectKey(){
    var el = sel('#region-map');
    if (el) {
      var r = el.getAttribute('data-region');
      var s = el.getAttribute('data-subregion');
      if (r && s) return (r.toLowerCase() + "-" + s).trim();
      if (r) return r.toLowerCase();
    }
    var path = decodeURIComponent(location.pathname || "");
    // matches: /regions/seoul-강남.html OR /regions/seoul.html
    var m = path.match(/\/regions\/(seoul|gyeonggi|incheon)(?:-([^.\/]+))?\.html/i);
    if (m) {
      if (m[2]) return (m[1].toLowerCase() + "-" + m[2]).trim();
      return m[1].toLowerCase();
    }
    return "seoul";
  }
  function getCfg(key){
    var cfg = (window.REGION_COORDS && window.REGION_COORDS[key]);
    if (!cfg){
      // try parent key if sub not found
      var p = key.split("-")[0];
      cfg = (window.REGION_COORDS && window.REGION_COORDS[p]);
    }
    return cfg || window.REGION_COORDS_DEFAULT;
  }
  function zoomToDelta(zoom){
    if (zoom <= 9)  return { dlat: 0.6,  dlon: 0.8 };
    if (zoom === 10) return { dlat: 0.35, dlon: 0.5 };
    if (zoom === 11) return { dlat: 0.2,  dlon: 0.3 };
    if (zoom === 12) return { dlat: 0.1,  dlon: 0.15 };
    if (zoom >= 13) return { dlat: 0.05, dlon: 0.08 };
    return { dlat: 0.1, dlon: 0.15 };
  }
  function render(){
    var host = sel('#region-map'); if (!host) return;
    if (host.getAttribute('data-map-rendered') === '1') return;

    var key = detectKey();
    var cfg = getCfg(key);
    var lat = +cfg.center.lat, lon = +cfg.center.lon;
    var mlat = +cfg.marker.lat, mlon = +cfg.marker.lon;
    var zoom = +cfg.zoom || 12;

    var d = zoomToDelta(zoom);
    var minlon = lon - d.dlon, maxlon = lon + d.dlon;
    var minlat = lat - d.dlat, maxlat = lat + d.dlat;

    var url = "https://www.openstreetmap.org/export/embed.html"
      + "?bbox=" + encodeURIComponent([minlon, minlat, maxlon, maxlat].join(","))
      + "&layer=mapnik"
      + "&marker=" + encodeURIComponent(mlat + "," + mlon);

    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.setAttribute('style', 'border:0;width:100%;height:260px');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('referrerpolicy', 'no-referrer');
    iframe.setAttribute('aria-label', '지역 위치 지도');

    iframe.addEventListener('error', function(){ host.textContent = "지도를 불러오지 못했습니다."; });

    host.innerHTML = "";
    host.appendChild(iframe);
    host.setAttribute('data-map-rendered', '1');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
  window.KingsMapRender = render;
})();
