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
  const region = document.getElementById('filter-region').value;
  const type = document.getElementById('filter-type').value;
  const sort = document.getElementById('filter-sort').value;
  let arr = items
    .filter(x => (region ? x.region === region : true))
    .filter(x => (type ? x.type === type : true));

  if (sort === 'name') arr.sort((a,b)=>a.name.localeCompare(b.name,'ko'));
  if (sort === 'sponsor') arr.sort((a,b)=>(b.sponsor?1:0)-(a.sponsor?1:0));

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
          <p style="margin:6px 0 10px">${x.desc}</p>
          <div class="meta"><span>${x.phone}</span><a href="${x.link}" target="_blank" rel="noreferrer">바로가기</a></div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  root.appendChild(grid);
}
document.getElementById('filter-region')?.addEventListener('change', loadListings);
document.getElementById('filter-type')?.addEventListener('change', loadListings);
document.getElementById('filter-sort')?.addEventListener('change', loadListings);
loadListings();

// Search (demo)
document.getElementById('searchForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const q = new FormData(e.currentTarget).get('q');
  alert(`검색어: ${q}\n(데모 동작입니다)`);
});


/* default filter homecare */
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('#filter-type');
  if (el && el.getAttribute('data-default') === 'homecare') {
    // try to set select or button groups
    if (el.tagName === 'SELECT') {
      el.value = '홈케어';
      el.dispatchEvent(new Event('change'));
    } else {
      // If it's a chips group, simulate click on 홈케어 chip
      const chip = document.querySelector('[data-filter-type="homecare"], .chip-homecare');
      if (chip) chip.click();
    }
  }
});
