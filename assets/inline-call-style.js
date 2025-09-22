\
// inline-call-style.js
(function(){
  var scopes = document.querySelectorAll('.content, .article, .post, .page, main, .container');
  var candidates = [];
  scopes.forEach(function(scope){
    scope.querySelectorAll('a').forEach(function(a){
      var txt = (a.textContent || '').trim();
      var isCallText = /^(전화\s*상담하기|전화\s*\d{2,3}-?\d{3,4}-?\d{4}|상담\s*전화|상담\s*연결)$/u.test(txt);
      var isTelLink = /^tel:/i.test(a.getAttribute('href') || '');
      if (isCallText || isTelLink) candidates.push(a);
    });
  });
  candidates.forEach(function(a){
    a.classList.add('btn-call');
    if (!a.style.margin) a.style.margin = '0 6px 8px 0';
    if (!a.style.display) a.style.display = 'inline-block';
  });
})();
