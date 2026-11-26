(function () {
  "use strict";

  var data = window.SITE_DATA;
  if (!data) return;

  var b = data.business || {};
  var l = data.labels || {};
  var app = document.getElementById("app");
  var bar = document.getElementById("action-bar");
  if (!app || !bar) return;

  /* ---------- helpers ---------- */
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function httpUrl(value) {
    try {
      var u = new URL(String(value || ""), window.location.href);
      return u.protocol === "http:" || u.protocol === "https:" ? u.href : "";
    } catch (e) {
      return "";
    }
  }

  function telUrl(phone) {
    var clean = String(phone || "").replace(/[^\d+]/g, "");
    return clean ? "tel:" + clean : "";
  }

  function waUrl(message) {
    var num = String(b.whatsapp || "").replace(/\D/g, "");
    if (!num) return "";
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(message || b.whatsappMessage || "");
  }

  function linkOrInert(href, className, inner, inertTitle) {
    if (href) {
      var external = href.indexOf("http") === 0;
      return '<a class="' + className + '" href="' + esc(href) + '"' +
        (external ? ' target="_blank" rel="noopener noreferrer"' : "") + ">" + inner + "</a>";
    }
    return '<a class="' + className + '" href="#" data-inert="true" aria-disabled="true" title="' +
      esc(inertTitle || l.sampleNote || "") + '">' + inner + "</a>";
  }

  function icon(name) {
    var body = {
      phone: '<path d="M6.6 3h3l1.2 4-2 1.4a12 12 0 0 0 5.8 5.8l1.4-2 4 1.2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3Z"/>',
      whatsapp: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.4A8 8 0 1 1 21 12Z"/><path d="M9.4 9.2c.3 3 2.6 5.3 5.6 5.6l1-1.6-2.1-1-1 1c-1.2-.5-2.1-1.4-2.6-2.6l1-1-1-2.1-1.9.7Z"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
      check: '<path d="m5 12 4 4 10-10"/>',
      car: '<path d="M2 18h1.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9a.5.5 0 0 0 0 1h1.5a.5.5 0 0 0 0 1H18a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-15a.5.5 0 0 0-.5.5V17a.5.5 0 0 0 .5.5ZM11 7h5a1 1 0 0 1 1 1v3h-7V8a1 1 0 0 1 1-1Zm4 0h5a1 1 0 0 1 1 1v3h-7V8a1 1 0 0 1 1-1ZM2 17a1 1 0 0 1 1-1h1.5a.5.5 0 0 0 0-1H3a.5.5 0 0 0-.5.5ZM17 17a.5.5 0 0 0 .5-.5h1.5a.5.5 0 0 0 0-1H18a1 1 0 0 1-1 1Z"/><path d="M7 17a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7Z"/>',
      star: '<path d="M12 17.27L18.18 21l1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21Z"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
      check: '<path d="m5 12 4 4 10-10"/>',
      star: '<path d="M12 17.27L18.18 21l1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21Z"/>'
    }[name] || '<circle cx="12" cy="12" r="8"/>';

    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + "</svg>";
  }

  /* ---------- page ---------- */
  var html = "";

  html += '<a class="skip-link" href="#main">' + esc(l.skipToContent) + "</a>";

  /* top bar + hero */
  html += '<header class="topbar"><div class="wrap topbar__inner">' +
    '<div class="brand"><div class="brand__mark">' + esc((b.name || "").split(" ").map(function (w) { return w.charAt(0); }).slice(0, 2).join("")) + "</div>" +
    '<div class="brand__name">' + esc(b.name) + "</div></div>" +
    '<span class="status"></span>' +
    "</div></header>";

  html += '<section class="hero" id="main"><div class="wrap hero__inner">' +
    '<div class="hero__copy">' +
    '<span class="eyebrow">' + esc(l.heroEyebrow) + "</span>" +
    "<h1>" + esc(b.name) + "</h1>" +
    '<p class="hero__tagline">' + esc(b.tagline) + "</p>" +
    '<div class="hero__actions">' +
    linkOrInert(waUrl(b.whatsappMessage), "btn btn--primary", esc(l.heroCta), l.sampleNote) +
    linkOrInert(telUrl(b.phone), "btn btn--ghost", l.heroSecondary, l.sampleNote) +
    "</div>" +
    "</div>" +
    '<div class="hero__art" aria-hidden="true">' + icon("car") + "</div>" +
    "</div></section>";

  /* numbers strip */
  html += '<section class="numbers"><div class="wrap numbers__grid reveal">';
  (data.numbers || []).forEach(function (n) {
    html += '<div class="numbers__item"><div class="numbers__value">' + esc(n.value) + "</div>" +
      '<div class="numbers__label">' + esc(n.label) + "</div></div>";
  });
  html += "</div></section>";

  /* courses */
  html += '<section class="section"><div class="wrap">' +
    '<div class="section__head reveal"><div class="section__eyebrow">' + esc(l.coursesTitle) + "</div>" +
    "<h2>" + esc(l.coursesTitle) + "</h2><p>" + esc(l.coursesSubtitle) + "</p></div>" +
    '<div class="courses">';
  (data.courses || []).forEach(function (c) {
    html += '<article class="card card--course reveal">' +
      '<div class="card__meta">' +
      '<span>' + esc(c.duration) + "</span>" +
      '<span>' + esc(c.fee) + "</span>" +
      "</div>" +
      "<h3>" + esc(c.title) + "</h3>" +
      "<p>" + esc(c.description) + "</p>" +
      linkOrInert(waUrl((b.whatsappMessage || "") + " " + c.title), "btn btn--primary btn--block", esc(l.heroCta), l.sampleNote) +
      "</article>";
  });
  html += "</div></div></section>";

  /* why choose us */
  html += '<section class="section section--tint"><div class="wrap">' +
    '<div class="section__head reveal"><div class="section__eyebrow">' + esc(l.whyTitle) + "</div>" +
    "<h2>" + esc(l.whyTitle) + "</h2><p>" + esc(l.whySubtitle) + "</p></div>" +
    '<div class="why">';
  (data.whyPoints || []).forEach(function (p) {
    html += '<article class="card card--why reveal"><div class="why__dot">' + icon("check") + "</div>" +
      "<p>" + esc(p) + "</p></article>";
  });
  html += "</div></div></section>";

  /* how it works timeline */
  html += '<section class="section"><div class="wrap">' +
    '<div class="section__head reveal"><div class="section__eyebrow">' + esc(l.howTitle) + "</div>" +
    "<h2>" + esc(l.howTitle) + "</h2><p>" + esc(l.howSubtitle) + "</p></div>" +
    '<div class="steps">';
  (data.steps || []).forEach(function (s) {
    html += '<article class="card step reveal"><h3>' + esc(s.title) + "</h3>" +
      "<p>" + esc(s.description) + "</p></article>";
  });
  html += "</div></div></section>";

  /* results gallery */
  html += '<section class="section section--tint"><div class="wrap">' +
    '<div class="section__head reveal"><div class="section__eyebrow">' + esc(l.resultsTitle) + "</div>" +
    "<h2>" + esc(l.resultsTitle) + "</h2><p>" + esc(l.resultsSubtitle) + "</p></div>" +
    '<div class="results">';
  (data.gallery || []).forEach(function (g) {
    html += '<article class="card card--result reveal">' +
      '<span>' + esc(g.label) + "</span>" +
      "</article>";
  });
  html += "</div></div></section>";

  /* reviews */
  html += '<section class="section"><div class="wrap">' +
    '<div class="section__head reveal"><div class="section__eyebrow">' + esc(l.reviewsTitle) + "</div>" +
    "<h2>" + esc(l.reviewsTitle) + "</h2><p>" + esc(l.reviewsSubtitle) + "</p></div>" +
    '<div class="reviews">';
  (data.reviews || []).forEach(function (r) {
    html += '<article class="card review reveal"><div class="review__quote" aria-hidden="true">“</div>' +
      "<p>" + esc(r.text) + "</p>" +
      '<div class="review__author">' + esc(r.author) + "</div></article>";
  });
  html += "<p class='reviews__note'>" + esc(l.reviewsSubtitle) + "</p>";
  html += "</div></div></section>";

  /* FAQ accordion */
  html += '<section class="section section--tint"><div class="wrap">' +
    '<div class="section__head reveal"><div class="section__eyebrow">' + esc(l.faqTitle) + "</div>" +
    "<h2>" + esc(l.faqTitle) + "</h2><p>" + esc(l.faqSubtitle) + "</p></div>" +
    '<div class="faqs">';
  (data.faq || []).forEach(function (q) {
    html += '<details class="faq-item">' +
      '<summary>' + esc(q.q) + '</summary>' +
      '<p>' + esc(q.a) + '</p>' +
      '</details>';
  });
  html += "</div></div></section>";

  /* visit / map */
  html += '<section class="section section--tint"><div class="wrap visit">' +
    '<div class="visit__info reveal"><div class="section__head">' +
    '<div class="section__eyebrow">' + esc(l.visitTitle) + "</div>" +
    "<h2>" + esc(l.visitTitle) + "</h2><p>" + esc(l.visitSubtitle) + "</p></div>" +
    '<div class="visit__row">' + icon("pin") + "<div><div class=\"visit__label\">" + esc(l.addressTitle) +
    "</div><div class=\"visit__value\">" + esc(b.address) + "</div></div></div>" +
    linkOrInert(httpUrl(b.mapLink), "btn btn--primary", icon("pin") + "<span>" + esc(l.directions) + "</span>", l.sampleNote) +
    "</div>" +
    '<div class="map-card reveal" aria-hidden="true"><div class="map-card__pin">' + icon("pin") + "</div>" +
    '<div class="map-card__hint">' + esc(b.locality) + "</div></div>" +
    "</div></section>";

  /* footer */
  html += '<footer class="footer"><div class="wrap">' +
    '<div class="footer__note">' + esc(l.footerNote) + "</div>" +
    '<p class="footer__sample">' + esc(l.sampleNote) + "</p>" +
    "</div></footer>";

  app.innerHTML = html;

  /* sticky mobile action bar */
  bar.innerHTML =
    linkOrInert(telUrl(b.phone), "btn btn--primary btn--block", l.call, l.sampleNote) +
    linkOrInert(waUrl(b.whatsappMessage), "btn btn--ghost btn--block", l.whatsapp, l.sampleNote);

  /* document metadata */
  document.title = l.pageTitle || b.name || "";
  var meta = document.querySelector('meta[name="description"]');
  if (meta && b.tagline) meta.setAttribute("content", b.tagline);

  /* ---------- behaviour ---------- */
  document.addEventListener("click", function (event) {
    var inert = event.target.closest && event.target.closest('[data-inert="true"]');
    if (inert) event.preventDefault();
  });

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    Array.prototype.forEach.call(reveals, function (el) { observer.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add("is-visible"); });
  }
})();
