
// assets/region-map.js (v2.2)
// Guarantee pin + correct center on all region pages by using bbox + mlat/mlon + marker + #map anchor
(function(){
  var DEFAULT = {center:[37.5665,126.9780], marker:[37.5665,126.9780], zoom:12};

  function getK(){ return (window.KINGS_REGION_COORDS && typeof window.KINGS_REGION_COORDS==='object') ? window.KINGS_REGION_COORDS : {}; }

  function parseKey(){
    // data-* first
    var c = document.getElementById('region-map');
    if (c){
      var r=c.getAttribute('data-region'), s=c.getAttribute('data-subregion');
      if (r && s) return r + '-' + s;
      if (r) return r;
    }
    // from URL
    try{
      var path = decodeURIComponent(location.pathname);
      var m = path.match(/\/regions\/([^\/]+)\.html$/);
      if (m) return m[1];
    }catch(e){}
    return 'seoul';
  }

  function clamp(n,min,max){ return Math.max(min, Math.min(max,n)); }

  function buildEmbed(info){
    info = info || DEFAULT;
    var lat = (info.marker && info.marker[0]) || (info.center && info.center[0]) || DEFAULT.center[0];
    var lon = (info.marker && info.marker[1]) || (info.center && info.center[1]) || DEFAULT.center[1];
    var z = info.zoom || DEFAULT.zoom;

    // compute small bbox (~5km) around the point so OSM centers correctly
    var dLat = 0.045; // ~5km
    var dLon = 0.055;
    var bbox = [lon - dLon, lat - dLat, lon + dLon, lat + dLat].map(function(v){ return v.toFixed(6); }).join(',');

    var params = [
      'bbox=' + bbox,
      'layer=mapnik',
      'mlat=' + encodeURIComponent(lat),
      'mlon=' + encodeURIComponent(lon),
      'marker=' + encodeURIComponent(lat + ',' + lon)
    ].join('&');

    var hash = '#map=' + encodeURIComponent(z) + '/' + encodeURIComponent(lat) + '/' + encodeURIComponent(lon);
    return 'https://www.openstreetmap.org/export/embed.html?' + params + hash;
  }

  function ensureContainer(){
    var el = document.getElementById('region-map');
    if (!el){
      el = document.createElement('div');
      el.id = 'region-map';
      el.style.minHeight = '260px';
      var anchor = document.querySelector('.map-wrap') || document.querySelector('#coverage, h3#coverage, section#coverage');
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(el, anchor.nextSibling);
      else document.body.appendChild(el);
    }
    return el;
  }

  function mount(){
    try{
      var key = parseKey();
      var K = getK();
      var info = K[key] || K[key.split('-')[0]] || K['seoul'] || DEFAULT;
      var src = buildEmbed(info);
      var el = ensureContainer();
      el.innerHTML = '';
      var iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.style.width = '100%';
      iframe.style.height = '280px';
      iframe.style.border = '0';
      iframe.setAttribute('loading','lazy');
      iframe.setAttribute('referrerpolicy','no-referrer');
      iframe.title = (key.replace(/-/g,' ') + ' 위치 지도');
      el.appendChild(iframe);
    } catch (e){
      var el = ensureContainer();
      el.innerHTML = '<iframe src="https://www.openstreetmap.org/export/embed.html?mlat=37.5665&mlon=126.9780&layer=mapnik#map=12/37.5665/126.9780" style="width:100%;height:280px;border:0" loading="lazy" referrerpolicy="no-referrer" title="지도"></iframe>';
      console.error('[region-map v2.2] fallback', e);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
  window.addEventListener('load', function(){ try{ mount(); }catch(e){} });
})();
