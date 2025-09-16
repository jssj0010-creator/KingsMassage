
(function () {
  function getRegionKey() {
    var m = location.pathname.match(/\/regions\/([^\/]+)\.html$/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  var REGION_COORDS = {"gyeonggi": [36.5, 127.9], "gyeonggi-고양": [37.6584, 126.8312], "gyeonggi-과천": [37.4292, 126.9875], "gyeonggi-광명": [37.4784, 126.8644], "gyeonggi-광주": [37.4096, 127.257], "gyeonggi-구리": [37.5943, 127.1295], "gyeonggi-군포": [37.3616, 126.935], "gyeonggi-김포": [37.6152, 126.7159], "gyeonggi-남양주": [37.636, 127.2165], "gyeonggi-부천": [37.5034, 126.766], "gyeonggi-분당": [37.385, 127.1215], "gyeonggi-성남": [37.42, 127.1269], "gyeonggi-수원": [37.2636, 127.0286], "gyeonggi-시흥": [37.3802, 126.8031], "gyeonggi-안산": [37.3173, 126.8387], "gyeonggi-안양": [37.3943, 126.9568], "gyeonggi-오산": [37.1498, 127.0772], "gyeonggi-용인": [37.2411, 127.1775], "gyeonggi-의정부": [37.7381, 127.0337], "gyeonggi-일산": [37.6776, 126.7706], "gyeonggi-파주": [37.7599, 126.78], "gyeonggi-평택": [36.9907, 127.0885], "gyeonggi-하남": [37.5393, 127.2147], "incheon": [36.5, 127.9], "incheon-강화": [37.7473, 126.4855], "incheon-계양": [37.5383, 126.7369], "incheon-남동": [37.4475, 126.7317], "incheon-동구": [37.4747, 126.6435], "incheon-미추홀": [37.4636, 126.65], "incheon-부평": [37.507, 126.7213], "incheon-서구": [37.5459, 126.675], "incheon-송도": [37.3826, 126.6434], "incheon-연수": [37.41, 126.678], "incheon-영종도": [37.4563, 126.7052], "incheon-인천": [37.4563, 126.7052], "incheon-중구": [37.4738, 126.6213], "index": [36.5, 127.9], "seoul": [36.5, 127.9], "seoul-강남": [37.5172, 127.0473], "seoul-강동": [37.5301, 127.1238], "seoul-강북": [37.6396, 127.0257], "seoul-강서": [37.5509, 126.8495], "seoul-관악": [37.4784, 126.9516], "seoul-광진": [37.5387, 127.0822], "seoul-구로": [37.4954, 126.8874], "seoul-금천": [37.4568, 126.8955], "seoul-노원": [37.6542, 127.0568], "seoul-도봉": [37.6688, 127.0471], "seoul-동대문": [37.5744, 127.0396], "seoul-동작": [37.5124, 126.9392], "seoul-마포": [37.5663, 126.9018], "seoul-서초": [37.4836, 127.0327], "seoul-성동": [37.5636, 127.0364], "seoul-성북": [37.5894, 127.0167], "seoul-송파": [37.5146, 127.1056], "seoul-양천": [37.516, 126.8666], "seoul-영등포": [37.5259, 126.8963], "seoul-용산": [37.5326, 126.9905], "seoul-은평": [37.6176, 126.9227], "seoul-종로": [37.573, 126.9794], "seoul-중구": [37.5636, 126.9976], "seoul-중랑": [37.606, 127.0927]};
  function injectPlaceJsonLD(name, lat, lng, phone) {
    var data = {"@context":"https://schema.org","@type":"Place","name":name,"telephone":phone,
      "geo":{"@type":"GeoCoordinates","latitude":lat,"longitude":lng},
      "areaServed":name,"hasMap":"https://maps.google.com/?q="+lat+","+lng,"url":location.href};
    var s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(data);document.head.appendChild(s);
  }
  function staticMapUrl(lat,lng,z){z=z||12;return "https://staticmap.openstreetmap.de/staticmap.php?center="+lat+","+lng+"&zoom="+z+"&size=960x220&markers="+lat+","+lng+",lightblue1"}
  function init(lat,lng,label){
    var el=document.getElementById('region-map'); if(!el) return;
    el.setAttribute('role','img'); el.setAttribute('aria-label',(label||"지역")+" 위치 지도");
    var img=new Image(); img.src=staticMapUrl(lat,lng,12); img.alt=(label||"지역")+" 위치 지도"; img.className="map-fallback"; el.appendChild(img);
    function loadLeaflet(){ if(window.L) return render(); var lc=document.createElement('link');lc.rel='stylesheet';lc.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(lc);
      var s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';s.onload=render;document.head.appendChild(s);
      var pc=document.createElement('link');pc.rel='preconnect';pc.href='https://tile.openstreetmap.org';document.head.appendChild(pc);}
    var rendered=false; function render(){ if(rendered) return; rendered=true; try{var map=L.map('region-map',{zoomControl:false,attributionControl:false}).setView([lat,lng],12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
      var m=L.marker([lat,lng]).addTo(map); var openG=function(){window.open('https://maps.google.com/?q='+lat+','+lng,'_blank');}; m.on('click',openG); map.on('click',openG);
    }catch(e){} }
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(ent){if(ent.isIntersecting){loadLeaflet(); io.disconnect();}})}); io.observe(el);} else {loadLeaflet();}
    injectPlaceJsonLD(label||document.title,lat,lng,"010-4637-9556");
  }
  function boot(){
    var el=document.getElementById('region-map'); if(!el) return;
    var key=getRegionKey(); if(!key || !Object.prototype.hasOwnProperty.call(REGION_COORDS,key)){el.style.display='none';return;}
    var p=REGION_COORDS[key]; var label=(document.querySelector('h1')&&document.querySelector('h1').textContent.trim())||key; init(p[0],p[1],label);
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',boot);} else {boot();}
})();
