\
// km-phone-unify.js
// Runtime-only patch: no HTML editing required.
// 1) Upgrade existing tel anchors in content to use .btn-call for consistent look
// 2) Wrap plain phone texts (e.g., "상담: 010-....", "전화(010-....)") into <a class="btn-call" href="tel:...">...</a>

(function(){
  var SCOPES = document.querySelectorAll('.content, .article, .post, .page, main, .container');

  // Regexes
  var rePhone = /010-\d{3,4}-\d{4}/;
  var reCallParen = /(전화)\s*[\(（]\s*(010-\d{3,4}-\d{4})\s*[\)）]/;
  var reConsult = /(상담)\s*[:：]?\s*(010-\d{3,4}-\d{4})/;
  var reCall = /(전화)\s*[:：]?\s*(010-\d{3,4}-\d{4})/;

  function telHref(num){
    return 'tel:' + num.replace(/\D/g,'');
  }

  function makeLink(num, label){
    var a = document.createElement('a');
    a.className = 'btn-call';
    a.href = telHref(num);
    a.textContent = (label ? (label + ' ') : '') + num;
    return a;
  }

  function wrapMatchesInTextNode(textNode){
    var text = textNode.nodeValue;
    var m, before, after, link, label, num, frag;

    function replaceByMatch(regex, withLabel){
      var m = regex.exec(text);
      if(!m) return false;
      before = text.slice(0, m.index);
      after = text.slice(m.index + m[0].length);
      if(withLabel){
        label = m[1];
        num = m[2];
      }else{
        label = null;
        num = m[0].match(rePhone)[0];
      }
      link = makeLink(num, label);
      frag = document.createDocumentFragment();
      if(before) frag.appendChild(document.createTextNode(before));
      frag.appendChild(link);
      if(after) frag.appendChild(document.createTextNode(after));
      textNode.parentNode.insertBefore(frag, textNode);
      textNode.parentNode.removeChild(textNode);
      return true;
    }

    // Priority: 전화(010-...), 상담: 010-..., 전화: 010-..., plain 010-...
    return replaceByMatch(reCallParen, true) ||
           replaceByMatch(reConsult, true) ||
           replaceByMatch(reCall, true) ||
           (rePhone.test(text) && replaceByMatch(rePhone, false));
  }

  function walk(node){
    if(!node) return;
    if(node.nodeType === Node.ELEMENT_NODE){
      var tag = node.tagName.toLowerCase();
      if(tag === 'a' || tag === 'script' || tag === 'style' || tag === 'noscript') return;
      for(var i = 0; i < node.childNodes.length; i++){
        walk(node.childNodes[i]);
      }
    } else if(node.nodeType === Node.TEXT_NODE){
      // Attempt wrap
      wrapMatchesInTextNode(node);
    }
  }

  function upgradeExistingAnchors(scope){
    // Make existing tel anchors look like header button by reusing .btn-call
    var anchors = scope.querySelectorAll('a[href^="tel:"]');
    anchors.forEach(function(a){
      a.classList.add('btn-call');
    });
  }

  function run(){
    SCOPES.forEach(function(scope){
      upgradeExistingAnchors(scope);
      walk(scope);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
