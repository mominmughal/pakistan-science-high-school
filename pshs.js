/* =========================================================
   PAKISTAN SCIENCE HIGH SCHOOL — SCRIPT
   1. Mobile nav toggle
   2. Back-to-top button
   3. Auto-fill current year in footer
   4. Student & Teacher forms -> build a message and open WhatsApp
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 0. Liquid scroll reveal + hero entrance ---------- */
  var heroSection = document.getElementById("heroSection");
  requestAnimationFrame(function () {
    if (heroSection) heroSection.classList.add("is-loaded");
  });

  var revealTargets = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // No IntersectionObserver support — just show everything
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 1.5 Login modal (UI only — no backend connected yet) ---------- */
  var loginOverlay = document.getElementById("loginOverlay");
  var loginOpenBtn = document.getElementById("loginOpenBtn");
  var loginCloseBtn = document.getElementById("loginCloseBtn");
  var loginTabs = document.querySelectorAll(".login-tab");
  var loginPanels = document.querySelectorAll(".login-panel");

  function openLogin() {
    if (!loginOverlay) return;
    loginOverlay.classList.add("is-open");
    loginOverlay.setAttribute("aria-hidden", "false");
  }
  function closeLogin() {
    if (!loginOverlay) return;
    loginOverlay.classList.remove("is-open");
    loginOverlay.setAttribute("aria-hidden", "true");
  }

  if (loginOpenBtn) loginOpenBtn.addEventListener("click", openLogin);
  if (loginCloseBtn) loginCloseBtn.addEventListener("click", closeLogin);
  if (loginOverlay) {
    loginOverlay.addEventListener("click", function (e) {
      if (e.target === loginOverlay) closeLogin();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLogin();
  });

  loginTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-login-tab");
      loginTabs.forEach(function (t) { t.classList.remove("is-active"); });
      tab.classList.add("is-active");
      loginPanels.forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-login-panel") === target);
      });
    });
  });

  // NOTE: No backend/database is connected yet. These forms only show a
  // placeholder message for now — wire them up to a real server once one exists.
  var studentLoginForm = document.getElementById("studentLoginForm");
  var studentLoginNote = document.getElementById("studentLoginNote");
  if (studentLoginForm) {
    studentLoginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      studentLoginNote.textContent = "Login isn't connected to a server yet — coming soon.";
      studentLoginNote.style.color = "#B3261E";
    });
  }

  var adminLoginForm = document.getElementById("adminLoginForm");
  var adminLoginNote = document.getElementById("adminLoginNote");
  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      adminLoginNote.textContent = "Login isn't connected to a server yet — coming soon.";
      adminLoginNote.style.color = "#B3261E";
    });
  }

  /* ---------- 1. Mobile nav toggle ---------- */
  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("navToggle");

  navToggle.addEventListener("click", function () {
    var isOpen = header.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close the mobile menu after a link is tapped
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    link.addEventListener("click", function () {
      header.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 2. Back-to-top button ---------- */
  var backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 3. Current year in footer ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- 4. Matric Results — branch + session tabs + live search ---------- */
  var resultSearch = document.getElementById("resultSearch");
  var resultsTable = document.getElementById("resultsTable");
  var noResultsNote = document.getElementById("noResultsNote");
  var sessionTabs = document.getElementById("sessionTabs");
  var branchTabs = document.getElementById("branchTabs");
  var activeSession = "all";
  var activeBranch = "all";

  if (resultSearch && resultsTable) {
    var rows = resultsTable.querySelectorAll("tbody tr");

    function applyResultFilters() {
      var query = resultSearch.value.trim().toLowerCase();
      var visibleCount = 0;

      rows.forEach(function (row) {
        var name = row.children[3].textContent.toLowerCase();
        var roll = row.children[4].textContent.toLowerCase();
        var matchesQuery = name.indexOf(query) !== -1 || roll.indexOf(query) !== -1;
        var matchesSession = activeSession === "all" || row.getAttribute("data-session") === activeSession;
        var matchesBranch = activeBranch === "all" || row.getAttribute("data-branch") === activeBranch;
        var matches = matchesQuery && matchesSession && matchesBranch;

        row.classList.toggle("row-hidden", !matches);
        if (matches) visibleCount++;
      });

      noResultsNote.style.display = visibleCount === 0 ? "block" : "none";
    }

    resultSearch.addEventListener("input", applyResultFilters);

    if (sessionTabs) {
      sessionTabs.querySelectorAll(".session-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          sessionTabs.querySelectorAll(".session-tab").forEach(function (t) {
            t.classList.remove("is-active");
          });
          tab.classList.add("is-active");
          activeSession = tab.getAttribute("data-session");
          applyResultFilters();
        });
      });
    }

    if (branchTabs) {
      branchTabs.querySelectorAll(".session-tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
          branchTabs.querySelectorAll(".session-tab").forEach(function (t) {
            t.classList.remove("is-active");
          });
          tab.classList.add("is-active");
          activeBranch = tab.getAttribute("data-branch");
          applyResultFilters();
        });
      });
    }
  }

  /* ---------- 5. WhatsApp numbers (used for both forms) ---------- */
  // Pakistan country code 92 + number without the leading 0
  var WHATSAPP_NUMBER = "923217101985";

  /* ----- Student application form ----- */
  var studentForm = document.getElementById("studentForm");
  var studentNote = document.getElementById("studentNote");

  studentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var name   = document.getElementById("sName").value.trim();
    var father = document.getElementById("sFather").value.trim();
    var age    = document.getElementById("sAge").value.trim();
    var prevSchool = document.getElementById("sPrevSchool").value.trim();
    var grade  = document.getElementById("sGrade").value;
    var phone  = document.getElementById("sPhone").value.trim();
    var email  = document.getElementById("sEmail").value.trim();
    var msg    = document.getElementById("sMsg").value.trim();

    if (!name || !father || !age || !grade || !phone) {
      studentNote.textContent = "Please fill in all required fields.";
      studentNote.style.color = "#B3261E";
      return;
    }

    var text =
      "New Student Application - Pakistan Science High School%0A" +
      "Name: " + encodeURIComponent(name) + "%0A" +
      "Father's Name: " + encodeURIComponent(father) + "%0A" +
      "Age: " + encodeURIComponent(age) + "%0A" +
      (prevSchool ? "Previous Institute: " + encodeURIComponent(prevSchool) + "%0A" : "") +
      "Applying For: " + encodeURIComponent(grade) + "%0A" +
      "Phone: " + encodeURIComponent(phone) + "%0A" +
      (email ? "Email: " + encodeURIComponent(email) + "%0A" : "") +
      (msg ? "Message: " + encodeURIComponent(msg) : "");

    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text, "_blank");
    studentNote.textContent = "Opening WhatsApp… please tap Send in the app.";
    studentNote.style.color = "";
  });

  /* ----- Teacher application form ----- */
  var teacherForm = document.getElementById("teacherForm");
  var teacherNote = document.getElementById("teacherNote");

  teacherForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var name    = document.getElementById("tName").value.trim();
    var father  = document.getElementById("tFather").value.trim();
    var age     = document.getElementById("tAge").value.trim();
    var subject = document.getElementById("tSubject").value.trim();
    var exp     = document.getElementById("tExp").value.trim();
    var phone   = document.getElementById("tPhone").value.trim();
    var email   = document.getElementById("tEmail").value.trim();
    var qual    = document.getElementById("tQual").value.trim();
    var degreeInput = document.getElementById("tDegree");
    var degreeName  = degreeInput && degreeInput.files && degreeInput.files[0] ? degreeInput.files[0].name : "";

    if (!name || !father || !age || !subject || !phone || !qual) {
      teacherNote.textContent = "Please fill in all required fields.";
      teacherNote.style.color = "#B3261E";
      return;
    }

    var text =
      "New Teaching Application - Pakistan Science High School%0A" +
      "Name: " + encodeURIComponent(name) + "%0A" +
      "Father's Name: " + encodeURIComponent(father) + "%0A" +
      "Age: " + encodeURIComponent(age) + "%0A" +
      "Subject: " + encodeURIComponent(subject) + "%0A" +
      "Qualification: " + encodeURIComponent(qual) + "%0A" +
      (exp ? "Experience: " + encodeURIComponent(exp) + "%0A" : "") +
      "Phone: " + encodeURIComponent(phone) + "%0A" +
      (email ? "Email: " + encodeURIComponent(email) + "%0A" : "") +
      (degreeName ? "Degree file to attach: " + encodeURIComponent(degreeName) : "");

    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text, "_blank");
    teacherNote.textContent = degreeName
      ? "Opening WhatsApp… please attach \"" + degreeName + "\" to the chat and tap Send."
      : "Opening WhatsApp… please tap Send in the app.";
    teacherNote.style.color = "";
  });

});