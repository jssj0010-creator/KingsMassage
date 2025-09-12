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
