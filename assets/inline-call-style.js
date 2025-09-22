// inline-call-style.js
// Purpose: Make inline "전화 상담하기" / "전화 010-..." buttons look the same as the header's .btn-call
// How: Add the .btn-call class to likely inline call anchors inside article/content areas.
// Safe: No text replacement, no href change (styling only).

(function(){
  // Containers where inline buttons usually live
  var scopes = document.querySelectorAll('.content, .article, .post, .page, main, .container');
  var candidates = [];

  scopes.forEach(function(scope){
    scope.querySelectorAll('a').forEach(function(a){
      var txt = (a.textContent || '').trim();
      // Heuristics: buttons that look like call actions
      var isCallText = /^(전화\s*상담하기|전화\s*\d{2,3}-?\d{3,4}-?\d{4}|상담\s*전화|상담\s*연결)$/u.test(txt);
      var isTelLink = /^tel:/i.test(a.getAttribute('href') || '');
      if (isCallText || isTelLink) candidates.push(a);
    });
  });

  // Add .btn-call style so it matches the header sticky button
  candidates.forEach(function(a){
    a.classList.add('btn-call');
    // Optional spacing so it doesn't stick to nearby text
    if (!a.style.margin) a.style.margin = '0 6px 8px 0';
    if (!a.style.display) a.style.display = 'inline-block';
  });
})();
