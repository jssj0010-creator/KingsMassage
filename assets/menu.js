// v8.22 simple mega menu controller
(function(){
  function setup(panel, btn){
    if(!panel || !btn) return;
    if(btn.dataset.bound==="1") return;
    btn.dataset.bound="1";
    const closeAll = ()=>{
      panel.classList.remove("open");
      btn.setAttribute("aria-expanded","false");
    };
    btn.addEventListener("click", function(e){
      e.preventDefault();
      const opened = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", opened ? "true" : "false");
    });
    document.addEventListener("click", function(e){
      if(!panel.contains(e.target) && !btn.contains(e.target)) closeAll();
    });
    window.addEventListener("keydown", function(e){
      if(e.key==="Escape") closeAll();
    });
  }
  document.addEventListener("DOMContentLoaded", function(){
    const panel = document.querySelector(".megaPanel");
    const btn = document.querySelector(".megaBtn");
    setup(panel, btn);
  });
})();
