const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const revealItems = document.querySelectorAll(
  [
    ".hero-copy",
    ".hero-visual",
    ".page-hero .container",
    ".section-heading",
    ".service-card",
    ".feature-item",
    ".sector-panel",
    ".sector-detail-grid",
    ".detail-list article",
    ".about-media",
    ".content-card",
    ".value-card",
    ".contact-form",
    ".contact-info",
    ".map-shell",
    ".footer-grid > div",
  ].join(",")
);

if ("IntersectionObserver" in window) {
  let lastScrollY = window.scrollY;
  let lastScrollTime = performance.now();
  let scrollSpeed = 0;

  window.addEventListener(
    "scroll",
    () => {
      const now = performance.now();
      const distance = Math.abs(window.scrollY - lastScrollY);
      const elapsed = Math.max(now - lastScrollTime, 16);
      scrollSpeed = distance / elapsed;
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    },
    { passive: true }
  );

  revealItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.dataset.revealIndex = String(index % 4);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const revealIndex = Number(entry.target.dataset.revealIndex || 0);
          const isFastScroll = scrollSpeed > 1.2;
          const duration = isFastScroll ? 380 : 560;
          const delay = isFastScroll ? Math.min(revealIndex * 18, 54) : revealIndex * 42;

          entry.target.style.setProperty("--reveal-duration", `${duration}ms`);
          entry.target.style.setProperty("--reveal-delay", `${delay}ms`);
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: "0px 0px 18% 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
