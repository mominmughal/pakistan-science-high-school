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

  /* ---------- 4. Matric Results 2026 — live search ---------- */
  var resultSearch = document.getElementById("resultSearch");
  var resultsTable = document.getElementById("resultsTable");
  var noResultsNote = document.getElementById("noResultsNote");

  if (resultSearch && resultsTable) {
    var rows = resultsTable.querySelectorAll("tbody tr");

    resultSearch.addEventListener("input", function () {
      var query = resultSearch.value.trim().toLowerCase();
      var visibleCount = 0;

      rows.forEach(function (row) {
        var name = row.children[1].textContent.toLowerCase();
        var roll = row.children[2].textContent.toLowerCase();
        var matches = name.indexOf(query) !== -1 || roll.indexOf(query) !== -1;

        row.classList.toggle("row-hidden", !matches);
        if (matches) visibleCount++;
      });

      noResultsNote.style.display = visibleCount === 0 ? "block" : "none";
    });
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