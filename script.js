// Footer year
const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

// Telegram link placeholder (update to your actual handle if different)
const telegram = document.getElementById("telegramLink");
if (telegram) telegram.href = "https://t.me/wizbonfx";

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#nav-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });

  document.addEventListener("click", (e) => {
    if (menu.contains(e.target) || toggle.contains(e.target)) return;
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
}

// Header elevate on scroll
const header = document.querySelector("[data-elevate]");
const setElevated = () => {
  if (!header) return;
  header.classList.toggle("is-elevated", window.scrollY > 8);
};
setElevated();
window.addEventListener("scroll", setElevated, { passive: true });

// Reveal-on-scroll
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced) {
  const els = document.querySelectorAll(".reveal");

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
}

// FAQ accordion behavior (only one open at a time)
const faqItems = document.querySelectorAll(".faq details");
faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.removeAttribute("open");
    });
  });
});
