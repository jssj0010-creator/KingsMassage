/*! kingsmsg kakao cta injector v1.0
 * Replaces "지도 열기" button in sticky bottom CTA on region pages
 * with a "카톡 상담" button linking to the open chat.
 * Safe to include on pages without the target button (no-ops).
 */
(function () {
  var KAKAO_URL = "https://open.kakao.com/o/shGxbqRh";

  function hasText(el, re) {
    return el && re.test((el.textContent || "").replace(/\s+/g, " ").trim());
  }

  function toKakao(btn) {
    if (!btn) return;
    try {
      // Turn into anchor
      var a = btn.tagName.toLowerCase() === "a" ? btn : (function(){
        var na = document.createElement("a");
        // copy attributes conservatively
        na.className = btn.className || "";
        na.innerHTML = btn.innerHTML;
        btn.replaceWith(na);
        return na;
      })();

      a.href = KAKAO_URL;
      a.target = "_blank";
      a.rel = "noopener";

      // Label
      a.textContent = "카톡 상담";

      // Style: keep existing 'btn' & size, swap color to kakao
      var cls = (a.className || "").split(/\s+/).filter(Boolean);
      // remove obvious color classes
      cls = cls.filter(function(c){
        return !/btn-(blue|primary|map)/.test(c);
      });
      if (cls.indexOf("btn") === -1) cls.push("btn");
      if (cls.indexOf("btn-kakao") === -1) cls.push("btn-kakao");
      a.className = cls.join(" ");
    } catch (e) {
      console.error("[kingsmsg] kakao cta inject error:", e);
    }
  }

  function run() {
    // Find sticky CTA bars
    var bars = Array.from(document.querySelectorAll(".sticky-cta, .cta-bar, .bottom-cta, .footer-cta, .fixed-cta"));
    if (bars.length === 0) {
      // Fallback: guess by fixed containers near viewport bottom
      bars = Array.from(document.querySelectorAll("div,nav,footer,section")).filter(function(el){
        var st = window.getComputedStyle(el);
        if (!st) return false;
        var fixed = st.position === "fixed" || st.position === "sticky";
        var h = el.getBoundingClientRect();
        return fixed && h.top > (window.innerHeight * 0.5); // near bottom
      });
    }

    var replaced = 0;

    function processContainer(container) {
      var nodes = Array.from(container.querySelectorAll("a,button"));
      // First try exact "지도 열기"
      var btn = nodes.find(function(n){ return hasText(n, /^지도\s*열기$/); });
      if (!btn) {
        // Try contains "지도"
        btn = nodes.find(function(n){ return hasText(n, /지도\s*열기/); });
      }
      if (!btn) {
        // Try class hints from earlier versions
        btn = nodes.find(function(n){ return n.classList.contains("btn-map") || n.classList.contains("open-map"); });
      }
      if (btn) {
        toKakao(btn);
        replaced++;
      }
    }

    bars.forEach(processContainer);

    // As a last resort, if nothing replaced, try whole document but only the last '지도 열기' button
    if (!replaced) {
      var all = Array.from(document.querySelectorAll("a,button")).filter(function(n){ return hasText(n, /^지도\s*열기$/); });
      if (all.length) {
        toKakao(all[all.length - 1]);
        replaced++;
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
