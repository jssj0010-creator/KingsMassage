
(function(){
  function norm(t){ return (t||"").replace(/\s+/g," ").trim(); }
  function ensureRow(tbl){
    var tb = tbl.querySelector('tbody') || tbl;
    var exists = !!tbl.querySelector('td') && Array.prototype.some.call(tbl.querySelectorAll('td'), function(td){
      return norm(td.textContent).indexOf('한국인 스웨디시마사지') !== -1;
    });
    if(exists) return;

    var headText = norm(tbl.textContent);
    if(headText.indexOf('60분') === -1 || headText.indexOf('90분') === -1) return;

    var tr = document.createElement('tr');
    tr.innerHTML = ('<td data-label="코스"><strong>한국인 스웨디시마사지</strong></td>' +'<td class="price" data-label="60분">140,000원</td>' +'<td class="price" data-label="90분">180,000원</td>' +'<td class="dim" data-label="120분">-</td>' +'<td class="dim" data-label="150분">-</td>');
    tb.appendChild(tr);
  }

  function enhance(){
    var tables = document.querySelectorAll('table');
    tables.forEach(function(tbl){
      ensureRow(tbl);

      var rows = tbl.querySelectorAll('tr');
      var koreanRow = null, specialRow = null;
      rows.forEach(function(tr){
        var first = tr.querySelector('td'); if(!first) return;
        var txt = norm(first.textContent);
        if(!koreanRow && txt.indexOf('한국인 스웨디시마사지') !== -1){ koreanRow = tr; }
        if(!specialRow && txt.indexOf('스페셜 감성 힐링마사지') !== -1){ specialRow = tr; }
      });

      if(koreanRow){
        var prev = koreanRow.previousElementSibling;
        if(!(prev && prev.classList && prev.classList.contains('pricing-sep'))){
          var sep = document.createElement('tr');
          sep.className = 'pricing-sep';
          var col = document.createElement('td');
          col.setAttribute('colspan', (koreanRow.children.length || 5));
          sep.appendChild(col);
          koreanRow.parentNode.insertBefore(sep, koreanRow);
        }
        koreanRow.classList.add('pricing-reco');
        for(var j=1;j<koreanRow.children.length && j<=2;j++){
          var cell = koreanRow.children[j];
          if(cell && !cell.querySelector('strong')){
            var s = document.createElement('strong');
            s.textContent = norm(cell.textContent);
            cell.textContent = ''; cell.appendChild(s);
          }
        }
        var badge = koreanRow.querySelector('.badge-reco'); if(badge) badge.remove();
      }
      if(specialRow){
        var firstCell = specialRow.querySelector('td');
        if(firstCell && !firstCell.querySelector('.badge-reco')){
          var badge2 = document.createElement('span'); badge2.className='badge-reco'; badge2.textContent='추천';
          firstCell.appendChild(document.createTextNode(' ')); firstCell.appendChild(badge2);
        }
      }
    });
  }

  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', enhance); }
  else { enhance(); }
})();
