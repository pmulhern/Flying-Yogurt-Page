/* Flying Yogurt — shared site behavior.
 * Injects the nav + footer (single source of truth for markup that used
 * to be copy-pasted, and drifted, across every page), wires up the mobile
 * menu, and provides one accordion implementation used everywhere a
 * collapsible section is needed (band bios, performance venues). */
(function () {
  "use strict";

  var ICONS = {
    facebook:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.6h2.6l.4-3h-3v-1.9c0-.87.24-1.46 1.5-1.46h1.6V4.35C15.9 4.24 15 4.15 14 4.15c-2.2 0-3.7 1.34-3.7 3.8v2.45H7.7v3h2.6V21h3.2z"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12 2.2c2.7 0 3 0 4.1.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.55.55.9 1.11 1.16 1.77.25.64.42 1.37.47 2.43.06 1.07.06 1.4.06 4.1s0 3-.06 4.1c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.16 1.77 4.9 4.9 0 0 1-1.77 1.16c-.64.25-1.37.42-2.43.47-1.07.06-1.4.06-4.1.06s-3 0-4.1-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.25-.64-.42-1.37-.47-2.43C2.2 15 2.2 14.7 2.2 12s0-3 .06-4.1c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.16-1.77A4.9 4.9 0 0 1 5.66 2.53c.64-.25 1.37-.42 2.43-.47C9.15 2.2 9.48 2.2 12 2.2zm0 1.8c-2.66 0-2.97 0-4.02.06-.86.04-1.32.18-1.63.3-.41.16-.7.35-1.01.66-.31.31-.5.6-.66 1.01-.12.31-.26.77-.3 1.63C4.32 8.71 4.3 9.02 4.3 12s0 3.29.06 4.34c.04.86.18 1.32.3 1.63.16.41.35.7.66 1.01.31.31.6.5 1.01.66.31.12.77.26 1.63.3 1.05.06 1.36.06 4.02.06s2.97 0 4.02-.06c.86-.04 1.32-.18 1.63-.3.41-.16.7-.35 1.01-.66.31-.31.5-.6.66-1.01.12-.31.26-.77.3-1.63.06-1.05.06-1.36.06-4.34s0-3.29-.06-4.34c-.04-.86-.18-1.32-.3-1.63a2.7 2.7 0 0 0-.66-1.01 2.7 2.7 0 0 0-1.01-.66c-.31-.12-.77-.26-1.63-.3C14.97 4 14.66 4 12 4zm0 3.35A4.65 4.65 0 1 1 12 16.66 4.65 4.65 0 0 1 12 7.35zm0 1.8a2.85 2.85 0 1 0 0 5.7 2.85 2.85 0 0 0 0-5.7zm4.84-2a1.09 1.09 0 1 1 0 2.18 1.09 1.09 0 0 1 0-2.18z"/></svg>',
    youtube:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.4-.43-5.03a2.87 2.87 0 0 0-2-2.03C18.94 4.5 12 4.5 12 4.5s-6.94 0-8.57.44a2.87 2.87 0 0 0-2 2.03C1 8.6 1 12 1 12s0 3.4.43 5.03a2.87 2.87 0 0 0 2 2.03C5.06 19.5 12 19.5 12 19.5s6.94 0 8.57-.44a2.87 2.87 0 0 0 2-2.03C23 15.4 23 12 23 12zM9.75 15.3V8.7L15.5 12l-5.75 3.3z"/></svg>',
    tiktok:
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M16.6 2h-3.2v13.3a2.9 2.9 0 1 1-2.1-2.79V9.2a6.1 6.1 0 1 0 5.3 6.05V8.6a7.9 7.9 0 0 0 4.6 1.47V6.86A4.9 4.9 0 0 1 16.6 2z"/></svg>',
    phone:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8.1 9.7a16 16 0 0 0 6.2 6.2l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z"/></svg>',
    mail:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    pin:
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    chevron:
      '<svg class="chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
    external:
      '<svg class="icon-ext" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>',
    ytSmall:
      '<svg class="icon-yt" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.4-.43-5.03a2.87 2.87 0 0 0-2-2.03C18.94 4.5 12 4.5 12 4.5s-6.94 0-8.57.44a2.87 2.87 0 0 0-2 2.03C1 8.6 1 12 1 12s0 3.4.43 5.03a2.87 2.87 0 0 0 2 2.03C5.06 19.5 12 19.5 12 19.5s6.94 0 8.57-.44a2.87 2.87 0 0 0 2-2.03C23 15.4 23 12 23 12zM9.75 15.3V8.7L15.5 12l-5.75 3.3z"/></svg>',
    ytBig:
      '<svg class="icon-yt-big" viewBox="0 0 24 24" width="52" height="52" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.4-.43-5.03a2.87 2.87 0 0 0-2-2.03C18.94 4.5 12 4.5 12 4.5s-6.94 0-8.57.44a2.87 2.87 0 0 0-2 2.03C1 8.6 1 12 1 12s0 3.4.43 5.03a2.87 2.87 0 0 0 2 2.03C5.06 19.5 12 19.5 12 19.5s6.94 0 8.57-.44a2.87 2.87 0 0 0 2-2.03C23 15.4 23 12 23 12zM9.75 15.3V8.7L15.5 12l-5.75 3.3z"/></svg>',
  };

  var NAV_LINKS = [
    { href: "index.html", label: "About The Band" },
    { href: "performances.html", label: "Live Performances" },
    { href: "calendar.html", label: "Upcoming Events" },
    { href: "contact.html", label: "Contact The Band" },
  ];

  function currentFile() {
    var path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function renderHeader() {
    var current = currentFile();
    var links = NAV_LINKS.map(function (link) {
      var isCurrent = link.href === current;
      return (
        '<a href="' +
        link.href +
        '"' +
        (isCurrent ? ' aria-current="page"' : "") +
        ">" +
        link.label +
        "</a>"
      );
    }).join("");

    return (
      '<div class="nav">' +
      '<a class="nav-brand" href="index.html">' +
      '<img src="Assets/web/favicon-32.png" alt="" width="38" height="38">' +
      "Flying Yogurt" +
      "</a>" +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Toggle navigation menu"><span></span></button>' +
      '<div class="nav-links" id="nav-links">' +
      links +
      "</div>" +
      "</div>"
    );
  }

  function hireLink(label, subject) {
    return (
      '<a href="contact.html?subject=' +
      encodeURIComponent(subject) +
      '">' +
      label +
      "</a>"
    );
  }

  function renderFooter() {
    return (
      '<div class="container">' +
      '<div class="footer-grid">' +
      '<div class="footer-col">' +
      "<h4>Contact</h4>" +
      '<div class="footer-contact-item">' +
      ICONS.pin +
      "<span>Philadelphia and surrounding areas</span></div>" +
      '<div class="footer-contact-item">' +
      ICONS.mail +
      '<a href="mailto:Music@FlyingYogurt.com">Music@FlyingYogurt.com</a></div>' +
      '<div class="footer-contact-item">' +
      ICONS.phone +
      '<a href="tel:+12158134817">(215) 813-4817</a></div>' +
      "</div>" +
      '<div class="footer-col">' +
      "<h4>Hire The Band</h4>" +
      "<ul>" +
      "<li>" +
      hireLink("Private Parties", "Hire the Band") +
      "</li>" +
      "<li>" +
      hireLink("Bar / Pub Entertainment", "Hire the Band") +
      "</li>" +
      "<li>" +
      hireLink("Special Events", "Hire the Band") +
      "</li>" +
      "<li>" +
      hireLink("Because You Want To Rock Out", "Hire the Band") +
      "</li>" +
      "</ul>" +
      "</div>" +
      '<div class="footer-col">' +
      "<h4>Follow Along</h4>" +
      '<ul class="social-links">' +
      '<li><a href="https://www.facebook.com/profile.php?id=61573280450635" target="_blank" rel="noopener">' +
      ICONS.facebook +
      " Facebook</a></li>" +
      '<li><a href="https://www.instagram.com/flyingyogurtband/" target="_blank" rel="noopener">' +
      ICONS.instagram +
      " Instagram</a></li>" +
      '<li><a href="https://www.youtube.com/@FlyingYogurtBand" target="_blank" rel="noopener">' +
      ICONS.youtube +
      " YouTube</a></li>" +
      '<li><a href="https://www.tiktok.com/@flyingyogurt" target="_blank" rel="noopener">' +
      ICONS.tiktok +
      " TikTok</a></li>" +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="footer-bottom">&copy; ' +
      new Date().getFullYear() +
      " Flying Yogurt. Classic rock, family blood, full volume.</div>"
    );
  }

  function initHeaderFooter() {
    var headerEl = document.getElementById("site-header");
    var footerEl = document.getElementById("site-footer");
    if (headerEl) headerEl.innerHTML = renderHeader();
    if (footerEl) footerEl.innerHTML = renderFooter();

    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!open));
        links.classList.toggle("is-open", !open);
      });
      links.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          toggle.setAttribute("aria-expanded", "false");
          links.classList.remove("is-open");
        });
      });
    }
  }

  function initAccordions() {
    document.querySelectorAll(".accordion-toggle").forEach(function (btn) {
      if (!btn.querySelector(".chevron")) {
        btn.insertAdjacentHTML("beforeend", ICONS.chevron);
      }
      var panel = btn.nextElementSibling;
      btn.addEventListener("click", function () {
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        if (expanded) {
          panel.style.maxHeight = "0px";
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });

    // Keep open panels correctly sized on resize (e.g. text reflow).
    window.addEventListener("resize", function () {
      document.querySelectorAll('.accordion-toggle[aria-expanded="true"]').forEach(function (btn) {
        var panel = btn.nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + "px";
      });
    });
  }

  function initIcons() {
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      var name = el.getAttribute("data-icon");
      if (ICONS[name]) el.innerHTML = ICONS[name];
    });
  }

  function initContactPrefill() {
    var select = document.getElementById("contactSubject");
    if (!select) return;
    var params = new URLSearchParams(window.location.search);
    var subject = params.get("subject");
    if (!subject) return;
    var match = Array.from(select.options).find(function (opt) {
      return opt.value.toLowerCase() === subject.toLowerCase();
    });
    if (match) select.value = match.value;
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHeaderFooter();
    initIcons();
    initAccordions();
    initContactPrefill();
  });
})();
