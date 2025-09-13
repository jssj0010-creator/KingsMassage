const year = document.getElementById('year'); if (year) year.textContent = new Date().getFullYear();
const STORAGE_KEY = 'km_apply_posts_homecare_v1';

function getPosts(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; } catch(e){ return []; } }
function setPosts(v){ localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); }
function addPost(post){ const arr = getPosts(); arr.unshift(post); setPosts(arr); render(); }
function removePost(idx){ const arr = getPosts(); arr.splice(idx,1); setPosts(arr); render(); }
function resetBoard(){ if(!confirm('홈케어 게시판을 모두 초기화할까요?')) return; localStorage.removeItem(STORAGE_KEY); render(); }
function formatDate(d){ const p=n=>n.toString().padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; }

function render(){
  const root = document.getElementById('board'); if(!root) return;
  root.innerHTML = '';
  const posts = getPosts();
  if(posts.length === 0){ root.innerHTML = '<p class="small">아직 등록된 신청이 없습니다.</p>'; return; }
  posts.forEach((p, idx)=>{
    const el = document.createElement('div');
    el.className = 'post';
    el.innerHTML = `
      <h3>홈케어 · ${p.name}</h3>
      <div class="meta">${p.region || ''} · ${p.phone} · <time>${p.created}</time></div>
      <p style="margin:8px 0 0;white-space:pre-wrap">${p.desc || ''}</p>
      <div class="actions"><button class="btn small" data-del="${idx}">삭제</button></div>
    `;
    root.appendChild(el);
  });
  root.querySelectorAll('[data-del]').forEach(btn=>btn.addEventListener('click',()=>removePost(parseInt(btn.dataset.del,10))));
}

document.getElementById('form-homecare')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(e.currentTarget);
  const post = {
    name: fd.get('name') || '',
    phone: fd.get('phone') || '',
    region: fd.get('region') || '',
    desc: fd.get('desc') || '',
    created: formatDate(new Date())
  };
  addPost(post); e.currentTarget.reset(); alert('등록되었습니다 (브라우저 저장).');
});

document.getElementById('resetBoard')?.addEventListener('click', resetBoard);
render();
