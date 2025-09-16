
(function(){
  function norm(t){ return (t||"").replace(/\s+/g," ").trim(); }
  function enhance(){
    var tables = document.querySelectorAll('table');
    tables.forEach(function(tbl){
      var cells = tbl.querySelectorAll('td');
      for(var i=0;i<cells.length;i++){
        var td = cells[i];
        if(norm(td.textContent).indexOf('한국인 스웨디시마사지') !== -1){
          var tr = td.closest('tr');
          if(!tr) continue;
          // add class
          tr.classList.add('pricing-reco');
          // add badge if not present
          if(!td.querySelector('.badge-reco')){
            var badge = document.createElement('span');
            badge.className = 'badge-reco';
            badge.textContent = '추천';
            td.appendChild(document.createTextNode(' '));
            td.appendChild(badge);
          }
          // insert a spacer row above if missing
          var prev = tr.previousElementSibling;
          if(!(prev && prev.classList.contains('pricing-sep'))){
            var sep = document.createElement('tr');
            sep.className = 'pricing-sep';
            var col = document.createElement('td');
            col.setAttribute('colspan', (tr.children.length || 5));
            sep.appendChild(col);
            tr.parentNode.insertBefore(sep, tr);
          }
          // bold prices in 60/90 columns
          for(var j=1;j<tr.children.length && j<=2;j++){
            var cell = tr.children[j];
            if(cell && !cell.querySelector('strong')){
              var s = document.createElement('strong');
              s.textContent = norm(cell.textContent);
              cell.textContent = '';
              cell.appendChild(s);
            }
          }
          break; // only once per table
        }
      }
    });
  }
  if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',enhance);} else {enhance();}
})();
