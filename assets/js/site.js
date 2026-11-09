/* Site logic — business name is ONE constant (BIZ). */
const BIZ = "Tømrerfirmaet Jens Sørensen ApS";
document.querySelectorAll("[data-biz]").forEach(function (el) { el.textContent = BIZ; });
/* Mobile nav */
var burger = document.querySelector(".burger");
if (burger) burger.addEventListener("click", function () {
  var nav = document.querySelector("nav.main");
  var open = nav.classList.toggle("open");
  burger.setAttribute("aria-expanded", open ? "true" : "false");
  burger.textContent = open ? "LUK ×" : "MENU ☰";
});
/* FAQ accordion */
document.querySelectorAll(".faq-q").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var item = btn.closest(".faq-item");
    var wasOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach(function (i) { i.classList.remove("open"); i.querySelector(".faq-q").setAttribute("aria-expanded", "false"); });
    if (!wasOpen) { item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
  });
});
/* Reference filters */
document.querySelectorAll(".chip").forEach(function (chip) {
  chip.addEventListener("click", function () {
    document.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); c.setAttribute("aria-pressed", "false"); });
    chip.classList.add("active"); chip.setAttribute("aria-pressed", "true");
    var f = chip.getAttribute("data-filter");
    document.querySelectorAll(".ref-card").forEach(function (card) {
      card.classList.toggle("hide", f !== "alle" && card.getAttribute("data-cat") !== f);
    });
  });
});
/* Forms: demo — validate, then show confirmation (no backend; sends to info@tfjs.dk) */
document.querySelectorAll("form[data-demo]").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var ok = form.parentElement.querySelector(".form-ok");
    if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
    var mail = form.querySelector("a[data-mailto]");
    if (mail) {
      var fd = new FormData(form);
      var subject = encodeURIComponent("Forespørgsel fra " + (fd.get("navn") || "") + " — " + BIZ);
      var body = encodeURIComponent("Navn: " + (fd.get("navn") || "") + "\nTelefon: " + (fd.get("telefon") || "") + "\nE-mail: " + (fd.get("email") || "") + "\n\n" + (fd.get("besked") || fd.get("beskrivelse") || ""));
      mail.setAttribute("href", "mailto:info@tfjs.dk?subject=" + subject + "&body=" + body);
    }
    form.querySelectorAll("button[type=submit]").forEach(function (b) { b.disabled = true; b.textContent = "MODTAGET ✓"; });
  });
});
