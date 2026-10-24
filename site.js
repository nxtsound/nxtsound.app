// Show one language at a time; without JavaScript both are visible.
(function () {
  var h = document.documentElement, lang = "";
  try { lang = localStorage.getItem("lang") || ""; } catch (e) {}
  if (location.hash === "#de" || location.hash === "#en") lang = location.hash.slice(1);
  if (lang !== "de" && lang !== "en") lang = (navigator.language || "en").slice(0, 2) === "de" ? "de" : "en";
  function set(l) {
    h.setAttribute("lang", l); h.setAttribute("data-lang", l);
    try { localStorage.setItem("lang", l); } catch (e) {}
  }
  set(lang);
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-set]");
    if (b) set(b.getAttribute("data-set"));
  });
})();

// Fade sections in as they scroll into view
(function () {
  if (!("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js");
  var io = new IntersectionObserver(function (list) {
    list.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  });
})();

// Current year in the copyright line
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
});
