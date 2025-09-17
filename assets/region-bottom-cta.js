
// assets/region-bottom-cta.js (v2 colors)
// - Phone: emerald green
// - Home: neutral gray
// - Kakao: brand yellow with dark text
(function(){
  var path = location.pathname || "";
  if (!/\/regions\//.test(path)) return; // only regional pages

  function sel(q, root){ return (root||document).querySelector(q); }
  function selAll(q, root){ return Array.prototype.slice.call((root||document).querySelectorAll(q)); }
  function make(html){ var t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; }

  // --- Styles ---
  (function injectCSS(){
    var css = `
    .bottom-cta { position: sticky; bottom: 0; left: 0; right: 0; z-index: 50;
      padding: 10px 12px; background: linear-gradient(180deg, rgba(8,12,24,0) 0%, rgba(8,12,24,.85) 40%, rgba(8,12,24,.95) 100%);
      backdrop-filter: blur(6px);
      display:flex; justify-content:center; gap:16px; }
    .bottom-cta .cta-btn { display:inline-flex; align-items:center; justify-content:center; gap:8px;
      padding: 14px 18px; font-weight: 800; font-size: 18px; border-radius: 18px; text-decoration:none; color:#fff; }
    @media (max-width:480px){
      .bottom-cta{ gap:12px; }
      .bottom-cta .cta-btn{ padding:12px 16px; font-size:16px; border-radius:16px; }
    }
    .cta-green{ background:#10B981; }       /* 전화상담 */
    .cta-home{ background:#6B7280; color:#fff; }  /* 홈(회색) */
    .cta-kakao{ background:#FEE500; color:#3C1E1E; } /* 카톡 */
    .cta-kakao svg{ vertical-align:-2px }
    `;
    var style = document.createElement('style');
    style.setAttribute('data-kings','region-bottom-cta-v2');
    style.textContent = css;
    document.head.appendChild(style);
  })();

  function findCtaContainer(){
    var el = sel('.bottom-cta, .floating-cta, .footer-cta, #bottom-cta');
    if (el) return el;
    el = document.createElement('div');
    el.className = 'bottom-cta';
    document.body.appendChild(el);
    return el;
  }

  function removeMapButtons(container){
    var scope = container || document.body;
    selAll('a, button', scope).forEach(function(x){
      var t = (x.textContent || '').trim();
      if (/지도\s*열기/.test(t)) x.remove();
    });
  }

  function ensureButtons(cta){
    // Phone
    var telGlobal = sel('a[href^="tel:"]', document);
    var telHref = telGlobal ? telGlobal.getAttribute('href') : 'tel:01046379556';
    var phoneBtn = sel('.cta-btn.cta-green', cta) || sel('a[href^="tel:"]', cta);
    if (!phoneBtn){
      phoneBtn = make(`<a class="cta-btn cta-green" href="${telHref}" aria-label="전화상담">전화 상담</a>`);
      cta.appendChild(phoneBtn);
    } else {
      phoneBtn.setAttribute('href', telHref);
      phoneBtn.classList.add('cta-btn','cta-green');
      phoneBtn.textContent = '전화 상담';
    }

    // Home
    var homeBtn = sel('.cta-btn.cta-home[href="/"]', cta);
    if (!homeBtn){
      homeBtn = make(`<a class="cta-btn cta-home" href="/" aria-label="홈으로 이동">홈</a>`);
      cta.appendChild(homeBtn);
    }

    // Kakao
    var kakaoBtn = sel('.cta-btn.cta-kakao[href^="https://open.kakao.com/"]', cta);
    if (!kakaoBtn){
      kakaoBtn = make(`<a class="cta-btn cta-kakao" href="https://open.kakao.com/o/shGxbqRh" target="_blank" rel="noopener" aria-label="카카오톡 오픈채팅">카톡</a>`);
      cta.appendChild(kakaoBtn);
    }
  }

  function run(){
    removeMapButtons();
    var cta = findCtaContainer();
    removeMapButtons(cta);
    ensureButtons(cta);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
