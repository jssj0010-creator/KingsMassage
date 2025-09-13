
// Hardened board script for ROADSHOP_BOARD_V1
const LIST_KEY = "ROADSHOP_BOARD_V1";

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[s]);
}

function $(sel){return document.querySelector(sel);}
function getList(){ try{ return JSON.parse(localStorage.getItem(LIST_KEY)||"[]"); }catch(e){ return []; } }
function setList(arr){ localStorage.setItem(LIST_KEY, JSON.stringify(arr)); }

function render(){
  const list = getList();
  const ul = $("#boardList");
  if(!ul) return;
  ul.innerHTML = "";
  list.forEach(item => {
    const li = document.createElement('li');
    li.className = "board-item";
    li.innerHTML = `
      <strong class="title">\${escapeHtml(item.title)}</strong>
      <span class="meta">\${escapeHtml(item.region||'')} · \${escapeHtml(item.type||'')}</span>
      <p class="desc">\${escapeHtml(item.desc||'')}</p>
    `;
    ul.appendChild(li);
  });
}

function onSubmit(e){
  e.preventDefault();
  const title = ($("#title").value||"").trim();
  const region = ($("#region").value||"").trim();
  const type = ($("#type").value||"").trim();
  const desc = ($("#desc").value||"").trim();
  if(title.length < 2) return alert("제목을 입력해 주세요.");
  if(desc.length > 500) return alert("내용은 500자 이내로 입력해 주세요.");

  const item = { title, region, type, desc, ts: Date.now() };
  const list = getList();
  list.unshift(item);
  setList(list);
  (e.target.reset && e.target.reset());
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  const form = document.querySelector("#boardForm");
  if(form) form.addEventListener("submit", onSubmit);
});
