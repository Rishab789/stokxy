(function () {
  "use strict";

  // Replace with your business WhatsApp number (country code + number, no + or spaces)
  var WHATSAPP_NUMBER = "919876543210";

  // Form submissions are emailed to beraprakash456@gmail.com (no Gmail opens).
  // Get your free access key: https://web3forms.com → enter beraprakash456@gmail.com → get key → paste below.
  var WEB3FORMS_ACCESS_KEY = "e8a3c737-98c9-446e-8e26-15b5e0323bf5";
  // var WEB3FORMS_ACCESS_KEY = "b75bb9ed-a579-411f-836e-42235d442bec";

  var submitBtnHTML =
    'OPEN FREE ACCOUNT & GET ₹500 <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  function getWhatsAppLink(text) {
    var encoded = text ? encodeURIComponent(text) : "";
    return (
      "https://wa.me/" + WHATSAPP_NUMBER + (encoded ? "?text=" + encoded : "")
    );
  }

  function setWhatsAppDirectLink() {
    var msg =
      "Hi, I want to join the 5 Paisa referral program and earn ₹500 bonus.";
    var url = getWhatsAppLink(msg);
    document
      .querySelectorAll(
        "#whatsapp-direct, #whatsapp-direct-footer, #whatsapp-help",
      )
      .forEach(function (el) {
        el.href = url;
      });
  }

  // ----- Header scroll effect -----
  var header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 20);
    });
  }

  // ----- Mobile menu -----
  var menuToggle = document.getElementById("menu-toggle");
  var nav = document.querySelector(".nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("open");
      nav.classList.toggle("open");
      document.body.style.overflow = nav.classList.contains("open")
        ? "hidden"
        : "";
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("open");
        nav.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // ----- Countdown timer (48 hours from first visit) -----
  (function () {
    var key = "referral_countdown_end";
    var hours = 48;
    var end = parseInt(localStorage.getItem(key), 10);
    if (!end || end <= Date.now()) {
      end = Date.now() + hours * 60 * 60 * 1000;
      localStorage.setItem(key, String(end));
    }
    function pad(n) {
      return n < 10 ? "0" + n : String(n);
    }
    function tick() {
      var left = Math.max(0, end - Date.now());
      if (left <= 0) {
        document.getElementById("cd-hours").textContent = "00";
        document.getElementById("cd-mins").textContent = "00";
        document.getElementById("cd-secs").textContent = "00";
        return;
      }
      var h = Math.floor(left / (60 * 60 * 1000));
      var m = Math.floor((left % (60 * 60 * 1000)) / (60 * 1000));
      var s = Math.floor((left % (60 * 1000)) / 1000);
      var elH = document.getElementById("cd-hours");
      var elM = document.getElementById("cd-mins");
      var elS = document.getElementById("cd-secs");
      if (elH) elH.textContent = pad(h);
      if (elM) elM.textContent = pad(m);
      if (elS) elS.textContent = pad(s);
    }
    tick();
    setInterval(tick, 1000);
  })();

  // ----- Today's registrations (static display, optional random 45-52) -----
  (function () {
    var el = document.getElementById("today-count");
    if (el) el.textContent = "47";
  })();

  // ----- FAQ accordion -----
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) openItem.classList.remove("open");
      });
      if (isOpen) {
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ----- Active nav link on scroll -----
  var sections = [
    "hero",
    "about",
    "why-5paisa",
    "how-it-works",
    "benefits",
    "faq",
    "register",
    "contact",
  ];
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');

  function setActiveNav() {
    var scrollY = window.scrollY;
    var headerH = 72;
    var current = "hero";
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop - headerH <= scrollY) current = id;
    });
    navLinks.forEach(function (a) {
      var href = a.getAttribute("href");
      var target = href === "#" ? "hero" : href.slice(1);
      a.classList.toggle("active", target === current);
    });
  }

  window.addEventListener("scroll", setActiveNav);
  window.addEventListener("load", setActiveNav);

  // ----- Form validation -----
  function showError(inputId, errorId, show) {
    var input = document.getElementById(inputId);
    var errorEl = document.getElementById(errorId);
    if (!input || !errorEl) return;
    if (show) {
      input.classList.add("error");
      errorEl.style.display = "block";
    } else {
      input.classList.remove("error");
      errorEl.style.display = "none";
    }
  }

  function validateName(value) {
    return value.trim().length >= 2;
  }

  function validatePhone(value) {
    var digits = value.replace(/\s/g, "").replace(/^91/, "");
    return /^[6-9]\d{9}$/.test(digits);
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function validateCity(value) {
    return value.trim().length >= 2;
  }

  function validateForm() {
    var name = (document.getElementById("name") || {}).value || "";
    var phone = (document.getElementById("phone") || {}).value || "";
    var email = (document.getElementById("email") || {}).value || "";
    var city = (document.getElementById("city") || {}).value || "";
    var valid = true;

    if (!validateName(name)) {
      showError("name", "name-error", true);
      valid = false;
    } else showError("name", "name-error", false);

    if (!validatePhone(phone)) {
      showError("phone", "phone-error", true);
      valid = false;
    } else showError("phone", "phone-error", false);

    if (!validateEmail(email)) {
      showError("email", "email-error", true);
      valid = false;
    } else showError("email", "email-error", false);

    if (!validateCity(city)) {
      showError("city", "city-error", true);
      valid = false;
    } else showError("city", "city-error", false);

    return valid;
  }

  var form = document.getElementById("lead-form");
  var submitBtn = document.getElementById("submit-btn");

  if (form && submitBtn) {
    var formMessage = document.getElementById("form-message");

    function showFormMessage(text, isError) {
      if (!formMessage) return;
      formMessage.textContent = text;
      formMessage.className =
        "form-message show " + (isError ? "error" : "success");
      formMessage.setAttribute("aria-live", "polite");
    }

    function hideFormMessage() {
      if (formMessage) {
        formMessage.className = "form-message";
        formMessage.textContent = "";
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideFormMessage();
      if (!validateForm()) return;

      var name = document.getElementById("name").value.trim();
      var phone = document.getElementById("phone").value.replace(/\s/g, "");
      var email = document.getElementById("email").value.trim();
      var city = document.getElementById("city").value.trim();
      var experienceEl = document.getElementById("experience");
      var experience = experienceEl ? experienceEl.value : "";
      var whatsappUpdates = document.getElementById("whatsapp-updates");
      var wantsUpdates = whatsappUpdates && whatsappUpdates.checked;

      if (
        !WEB3FORMS_ACCESS_KEY ||
        WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY"
      ) {
        showFormMessage(
          "Please set up Web3Forms: add your access key in script.js (see comments).",
          true,
        );
        return;
      }

      console.log("this is the payload ", payload);

      var payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "5 Paisa Referral – New Registration",
        from_name: "5 Paisa Referral Form",
        name: name,
        email: email,
        phone: phone,
        city: city,
        trading_experience: experience || "Not selected",
        whatsapp_updates: wantsUpdates ? "Yes" : "No",
        body:
          "New registration: " +
          name +
          " (" +
          email +
          ", " +
          phone +
          ", " +
          city +
          "). Experience: " +
          (experience || "—") +
          ". WhatsApp updates: " +
          (wantsUpdates ? "Yes" : "No") +
          ".",
      };

      console.log("this is the email payload ", payload);

      submitBtn.disabled = true;
      submitBtn.innerHTML = "Sending…";

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          if (data.success) {
            showFormMessage(
              "Thank you! We've received your details. We'll contact you soon.",
            );
            form.reset();
          } else {
            showFormMessage(
              data.message ||
                "Something went wrong. Please try again or WhatsApp us.",
              true,
            );
          }
        })
        .catch(function () {
          showFormMessage(
            "Could not send. Please check your connection or WhatsApp us for help.",
            true,
          );
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtnHTML;
        });
    });

    ["name", "phone", "email", "city"].forEach(function (id) {
      var input = document.getElementById(id);
      if (input) {
        input.addEventListener("input", function () {
          showError(id, id + "-error", false);
        });
      }
    });
  }

  setWhatsAppDirectLink();

  // ----- Scroll animations (Intersection Observer) -----
  function initScrollAnimations() {
    var observerOptions = {
      root: null,
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.12,
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".animate-on-scroll").forEach(function (el) {
      observer.observe(el);
    });

    var gridObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var section = entry.target;
          var cards = section.querySelectorAll(
            ".benefit-card, .why-card, .step, .platform-card, .testimonial-card, .contact-card",
          );
          cards.forEach(function (card) {
            card.classList.add("animate-in");
          });
        }
      });
    }, observerOptions);

    document.querySelectorAll('[data-animate="grid"]').forEach(function (el) {
      gridObserver.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
