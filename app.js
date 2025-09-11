// Minimal JS: tabs, fake search, listings loader, mailto submitter
const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();

// Tabs
const tabs = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('.apply-form');
tabs.forEach(btn => btn.addEventListener('click', () => {
  tabs.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  forms.forEach(f => f.classList.toggle('hidden', f.id !== 'form-' + btn.dataset.tab));
}));

// Listings (from JSON)
async function loadListings(){
  try{
    const res = await fetch('listings.json');
    const data = await res.json();
    renderListings(data);
  }catch(e){
    console.warn('listings.json 로드 실패', e);
  }
}
function renderListings(items){
  const grid = document.getElementById('listingGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const region = document.getElementById('filter-region').value;
  const type = document.getElementById('filter-type').value;
  items
    .filter(x => (region ? x.region === region : true))
    .filter(x => (type ? x.type === type : true))
    .forEach(x => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <h3>${x.name}</h3>
        <div class="badges">
          <span class="badge">${x.region}</span>
          <span class="badge">${x.type}</span>
        </div>
        <p>${x.desc}</p>
        <div class="meta"><span>${x.phone}</span><a href="${x.link}" target="_blank" rel="noreferrer">상세보기</a></div>
      `;
      grid.appendChild(el);
    });
}
document.getElementById('filter-region')?.addEventListener('change', () => loadListings());
document.getElementById('filter-type')?.addEventListener('change', () => loadListings());
loadListings();

// Search
document.getElementById('searchForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const q = new FormData(e.currentTarget).get('q');
  alert(`검색어: ${q}\n(데모 동작입니다. 실제 검색은 구현 필요)`);
});

// Mailto submit for demo
function wireForm(id){
  const form = document.getElementById(id);
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd = new FormData(form);
    const type = form.dataset.type || '입점';
    const body = Array.from(fd.entries()).map(([k,v])=>`${k}: ${v}`).join('%0D%0A');
    const mail = `mailto:you@example.com?subject=[${type}] 입점신청&body=${body}`;
    window.location.href = mail;
  });
}
wireForm('form-homecare');
wireForm('form-roadshop');
