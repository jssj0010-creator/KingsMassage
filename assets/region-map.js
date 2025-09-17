
// assets/region-map.js (v2.1) - robust to missing/late coords load
(function(){
  // Default fallback (Seoul City Hall area)
  var DEFAULT = {center:[37.5665,126.9780], marker:[37.5665,126.9780], zoom:12};

  function getCoordsDict(){
    var K = window.KINGS_REGION_COORDS;
    if (K && typeof K === 'object') return K;
    return {}; // could be empty if coords file didn't load yet
  }

  function parseKey(){
    // 1) data attributes
    var c = document.getElementById('region-map');
    if (c){
      var region = c.getAttribute('data-region');
      var sub = c.getAttribute('data-subregion');
      if (region && sub) return (region + '-' + sub);
      if (region) return region;
    }
    // 2) path
    try{
      var path = decodeURIComponent(location.pathname);
      var m = path.match(/\/regions\/([^\/]+)\.html$/);
      if (m) return m[1];
    }catch(e){}
    return 'seoul';
  }

  function buildOSM(info){
    info = info || DEFAULT;
    var lat = (info.marker && info.marker[0]) || (info.center && info.center[0]) || DEFAULT.center[0];
    var lon = (info.marker && info.marker[1]) || (info.center && info.center[1]) || DEFAULT.center[1];
    var z = info.zoom || DEFAULT.zoom;
    var src = "https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=" +
              encodeURIComponent(lat + ',' + lon) + "&zoom=" + encodeURIComponent(z);
    return src;
  }

  function ensureContainer(){
    var el = document.getElementById('region-map');
    if (!el){
      el = document.createElement('div');
      el.id = 'region-map';
      el.style.minHeight = '260px';
      // Try to insert after existing coverage title or map placeholder
      var anchor = document.querySelector('#coverage, h3#coverage, section#coverage, .map-wrap');
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(el, anchor.nextSibling);
      else document.body.appendChild(el);
    }
    return el;
  }

  function mount(){
    try{
      var key = parseKey();
      var K = getCoordsDict();
      var info = K[key] || K[key.split('-')[0]] || K['seoul'] || DEFAULT;
      var src = buildOSM(info);
      var el = ensureContainer();
      el.innerHTML = '';
      var iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.style.width = '100%';
      iframe.style.height = '280px';
      iframe.style.border = '0';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer';
      iframe.title = (key + ' 위치 지도').replace(/-/g,' ');
      el.appendChild(iframe);
    }catch(err){
      // As a last resort, still render a default Seoul map so UI doesn't break
      var el = ensureContainer();
      el.innerHTML = '<iframe src="https://www.openstreetmap.org/export/embed.html?layer=mapnik&marker=37.5665,126.9780&zoom=12" style="width:100%;height:280px;border:0" loading="lazy" referrerpolicy="no-referrer" title="지도"></iframe>';
      console.error('[region-map] fallback due to error:', err);
    }
  }

  // If coords file loads after this (defer order issue), run once now and once on load
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  window.addEventListener('load', function(){ try{ mount(); }catch(e){} });
})();
