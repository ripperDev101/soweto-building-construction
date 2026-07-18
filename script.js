(() => {
  // Mobile navigation toggle
  const navToggle = document.getElementById("nav-toggle");
  const mainNav = document.getElementById("main-nav");

  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Contact form -> WhatsApp
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const message = [
      "Hi Soweto Building Construction, I would like to ask about a project.",
      "",
      `Name: ${data.get("name")}`,
      `Phone: ${data.get("phone")}`,
      `Service: ${data.get("service")}`,
      `Message: ${data.get("message")}`
    ].join("\n");

    window.open(
      `https://wa.me/27834867250?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener"
    );
  });

  // Scroll-reveal animations (classes added here so content shows without JS)
  const revealTargets = document.querySelectorAll(
    ".section-title, .about-image, .about-text, .service-card, .gallery-item," +
    " .review-card, .area-list, .area-note, .contact-details, .contact-form, .cta-banner .container"
  );

  if ("IntersectionObserver" in window) {
    const groups = new Map();
    revealTargets.forEach((el) => {
      el.classList.add("reveal");
      // Stagger siblings within the same parent (cards in a grid)
      const count = groups.get(el.parentElement) || 0;
      el.style.transitionDelay = `${Math.min(count, 5) * 90}ms`;
      groups.set(el.parentElement, count + 1);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach((el) => observer.observe(el));
  }

  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Header shadow once the page is scrolled
  const header = document.querySelector(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
