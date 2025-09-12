const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();

// Listings
async function loadListings(){
  try{
    const res = await fetch('listings.json');
    const data = await res.json();
    renderListings(data);
  }catch(e){ console.warn('listings.json 로드 실패', e); }
}

function renderListings(items){
  const root = document.getElementById('listingGrid');
  if (!root) return;
  root.innerHTML = '';

  // Always filter to 홈케어
  let arr = items.filter(x => x.type === '홈케어');

  // Shuffle (Fisher–Yates)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  // Optionally cap to first N items (uncomment to limit)
  const LIMIT = 5; // adjust as needed
  arr = arr.slice(0, LIMIT);

  const grid = document.createElement('div');
  grid.className = 'grid cols-3';

  arr.forEach(x=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="list-item">
        <div class="thumb"></div>
        <div style="flex:1">
          <h3 style="margin:0">${x.name}</h3>
          <div class="badges">
            ${x.sponsor ? '<span class="badge">스폰서</span>' : ''}
            <span class="badge">${x.region}</span>
            <span class="badge">${x.type}</span>
          </div>
          <p style="margin:6px 0 10px">${x.desc || ''}</p>
          <div class="meta"><span>${x.phone || ''}</span><a href="${x.link || '#'}" target="_blank" rel="noreferrer">바로가기</a></div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  root.appendChild(grid);
}
);


// === Default filter: 홈케어 only on first load ===
(function(){
  const sel = document.getElementById('filter-type');
  if (sel) {
    sel.value = '홈케어';
    try { loadListings(); } catch(e) {}
  }
})();


// Open mega panel when clicking '지역별' link in mega bar
document.querySelector('.mega-link[data-open="panel"]')?.addEventListener('click', (e)=>{
  e.preventDefault();
  const panel = document.getElementById('megaPanel');
  const trigger = document.querySelector('.mega-trigger');
  if (panel.hasAttribute('hidden')) {
    panel.removeAttribute('hidden');
    trigger?.setAttribute('aria-expanded','true');
  } else {
    panel.setAttribute('hidden','');
    trigger?.setAttribute('aria-expanded','false');
  }
});


// === Geolocation on page load (with 24h cooldown) ===
(function(){
  const COOLDOWN_HOURS = 24;
  const ms = COOLDOWN_HOURS * 60 * 60 * 1000;
  const last = parseInt(localStorage.getItem('geo:lastAsk') || '0', 10);
  const now = Date.now();
  if (location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname === '') {
    if (now - last > ms) {
      // Only prompt on secure contexts
      if (location.protocol === 'https:' || location.hostname === 'localhost') {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(pos){
            localStorage.setItem('geo:lastAsk', String(Date.now()));
            localStorage.setItem('geo:coords', JSON.stringify({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              acc: pos.coords.accuracy,
              ts: Date.now()
            }));
            // Optional: light toast
            try{
              const t = document.createElement('div');
              t.textContent = '위치 정보가 설정되었습니다.';
              t.style.cssText = 'position:fixed;left:50%;transform:translateX(-50%);bottom:18px;background:#111;padding:10px 14px;border:1px solid #333;border-radius:12px;color:#fff;z-index:1000';
              document.body.appendChild(t);
              setTimeout(()=>t.remove(), 2000);
            }catch(e){}
          }, function(err){
            localStorage.setItem('geo:lastAsk', String(Date.now()));
            // Denied or error: no action needed
          }, {enableHighAccuracy:false, timeout:8000, maximumAge:60000});
        }
      }
    }
  }
})();




// === Mega menu toggle (robust) ===
document.addEventListener('DOMContentLoaded', function(){
  const trigger = document.querySelector('.mega-trigger');
  const panel = document.getElementById('megaPanel');
  const openers = document.querySelectorAll('.mega-link[data-open="panel"]');
  if (trigger && panel){
    trigger.addEventListener('click', function(){
      const isOpen = !panel.hasAttribute('hidden');
      if (isOpen){
        panel.setAttribute('hidden','');
        trigger.setAttribute('aria-expanded','false');
      }else{
        panel.removeAttribute('hidden');
        trigger.setAttribute('aria-expanded','true');
      }
    });
  }
  openers.forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      if (panel.hasAttribute('hidden')){
        panel.removeAttribute('hidden');
        trigger?.setAttribute('aria-expanded','true');
      }else{
        panel.setAttribute('hidden','');
        trigger?.setAttribute('aria-expanded','false');
      }
    });
  });
});
