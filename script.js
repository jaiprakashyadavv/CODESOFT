/* ========================================
   PORTFOLIO SCRIPT.JS — Alex Morgan
   ======================================== */

"use strict";

/* ---- CUSTOM CURSOR ---- */
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");

if (cursor && cursorFollower) {
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Scale cursor on hoverable elements
  document.querySelectorAll("a, button, .project-card, .info-card, .tech-item").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(2.5)";
      cursorFollower.style.transform = "translate(-50%,-50%) scale(0.5)";
      cursorFollower.style.borderColor = "rgba(108,99,255,0.8)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%,-50%) scale(1)";
      cursorFollower.style.transform = "translate(-50%,-50%) scale(1)";
      cursorFollower.style.borderColor = "rgba(108,99,255,0.5)";
    });
  });
}

/* ---- NAVBAR SCROLL ---- */
const nav = document.getElementById("nav");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (nav) {
    nav.classList.toggle("scrolled", scrollY > 60);
  }

  if (backToTop) {
    backToTop.classList.toggle("visible", scrollY > 400);
  }

  // Highlight active nav link
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  sections.forEach((section) => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
});

/* ---- HAMBURGER / MOBILE MENU ---- */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("open");
    document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  });

  document.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
}

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
);

document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((el) => {
  revealObserver.observe(el);
});

/* ---- SKILL BAR ANIMATION ---- */
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".bar-fill").forEach((bar) => {
          const targetWidth = bar.dataset.width + "%";
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 200);
        });
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const skillsSection = document.querySelector(".skills-bars");
if (skillsSection) barObserver.observe(skillsSection);

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".stat-num").forEach((num) => {
          const target = parseInt(num.dataset.target);
          animateCounter(num, target);
        });
        counterObserver.disconnect();
      }
    });
  },
  { threshold: 0.5 }
);

const statsEl = document.querySelector(".hero-stats");
if (statsEl) counterObserver.observe(statsEl);

/* ---- SMOOTH ANCHOR SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const href = anchor.getAttribute("href");
    if (href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ---- CONTACT FORM ---- */
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btnText = contactForm.querySelector(".btn-text");
    const btnLoading = contactForm.querySelector(".btn-loading");

    // Show loading
    if (btnText) btnText.style.display = "none";
    if (btnLoading) btnLoading.style.display = "flex";

    // Simulate submission (replace with real EmailJS / Formspree / etc.)
    setTimeout(() => {
      if (btnText) btnText.style.display = "flex";
      if (btnLoading) btnLoading.style.display = "none";

      if (formSuccess) {
        formSuccess.style.display = "block";
        setTimeout(() => {
          formSuccess.style.display = "none";
        }, 5000);
      }

      contactForm.reset();
    }, 1800);

    /* ---- TO USE FORMSPREE: ----
     * 1. Go to formspree.io and create a free account
     * 2. Create a form and get your endpoint URL
     * 3. Replace the setTimeout above with this:
     *
     * const formData = new FormData(contactForm);
     * fetch("https://formspree.io/f/YOUR_FORM_ID", {
     *   method: "POST",
     *   body: formData,
     *   headers: { Accept: "application/json" }
     * })
     * .then(res => {
     *   if (res.ok) {
     *     formSuccess.style.display = "block";
     *     contactForm.reset();
     *   }
     * })
     * .catch(err => console.error(err))
     * .finally(() => {
     *   btnText.style.display = "flex";
     *   btnLoading.style.display = "none";
     * });
     */
  });
}

/* ---- PARALLAX BLOBS (subtle) ---- */
window.addEventListener("mousemove", (e) => {
  const blobs = document.querySelectorAll(".blob");
  const xFactor = (e.clientX / window.innerWidth - 0.5) * 20;
  const yFactor = (e.clientY / window.innerHeight - 0.5) * 20;

  blobs.forEach((blob, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    blob.style.transform = `translate(${xFactor * dir * 0.5}px, ${yFactor * dir * 0.5}px)`;
  });
});

/* ---- TYPING EFFECT FOR HERO (optional enhancement) ---- */
const roles = ["Web Developer", "Frontend Engineer", "UI Enthusiast", "React Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const subLine = document.querySelector(".hero-title .sub-line");

function typeRole() {
  if (!subLine) return;

  const currentRole = roles[roleIndex];
  const displayText = isDeleting
    ? currentRole.substring(0, charIndex - 1)
    : currentRole.substring(0, charIndex + 1);

  subLine.innerHTML = `Web <em>${displayText}<span class="caret">|</span></em>`;

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeRole, 2000);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
  setTimeout(typeRole, isDeleting ? 60 : 100);
}

// Add caret style dynamically
const style = document.createElement("style");
style.textContent = `
  .caret {
    display: inline-block;
    animation: blink 0.8s step-end infinite;
    color: var(--primary);
    font-style: normal;
    margin-left: 2px;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .nav-links a.active { color: var(--primary); }
  .nav-links a.active::after { width: 100%; }
`;
document.head.appendChild(style);

// Start typing effect after initial load
setTimeout(typeRole, 1500);

/* ---- PAGE LOAD REVEAL ---- */
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
  // Trigger hero animations
  document.querySelectorAll(".hero .reveal-up, .hero .reveal-right").forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, i * 150);
  });
});

// Initial fade-in
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";
