
(function(){
  const btn = document.querySelector('.megaBtn');
  const panel = document.querySelector('.panel');
  const overlay = document.querySelector('.overlay');
  if(!btn || !panel || !overlay) return;
  const toggle = (open) => {
    panel.classList.toggle('open', open);
    overlay.classList.toggle('show', open);
    document.body.style.overflow = open ? 'hidden' : '';
    btn.setAttribute('aria-expanded', open ? 'true':'false');
  };
  btn.addEventListener('click', ()=> toggle(!panel.classList.contains('open')));
  overlay.addEventListener('click', ()=> toggle(false));
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') toggle(false); });
})();
