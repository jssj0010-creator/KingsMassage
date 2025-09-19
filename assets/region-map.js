// /assets/region-map.js (robust initializer)
// Reads slug from /regions/{slug}.html, decodes it, and looks up window.__REGION_COORDS__.
// Falls back to metro-level centers if missing.
(function () {
  function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  ready(function () {
    var el = document.getElementById("region-map");
    if (!el || typeof window.L === "undefined") return;

    var m = location.pathname.match(/\/regions\/([^\/]+)\.html$/);
    var slugRaw = m ? m[1] : "";
    var slug = decodeURIComponent(slugRaw);

    var MAP = window.__REGION_COORDS__ || {};
    var coords = null;

    var lat = parseFloat(el.getAttribute("data-lat"));
    var lng = parseFloat(el.getAttribute("data-lng"));
    if (isFinite(lat) && isFinite(lng)) coords = [lat, lng];

    if (!coords) coords = MAP[slug] || MAP[slugRaw] || null;

    if (!coords) {
      if (slug.startsWith("seoul-") || slug === "seoul") {
        coords = [37.5665, 126.9780];
      } else if (slug.startsWith("gyeonggi-") || slug === "gyeonggi") {
        coords = [37.2899, 127.0530];
      } else if (slug.startsWith("incheon-") || slug === "incheon") {
        coords = [37.4563, 126.7052];
      } else {
        coords = [37.5665, 126.9780];
      }
    }

    var map = L.map("region-map", { scrollWheelZoom: false }).setView(coords, 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    L.marker(coords).addTo(map);

    console.log("[region-map] slug:", slug, "coords:", coords);
  });
})();
