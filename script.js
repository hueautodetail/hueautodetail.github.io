const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-booking-form]");
const statusText = document.querySelector("[data-form-status]");
const year = document.querySelector("[data-year]");
const slides = Array.from(document.querySelectorAll(".carousel-slide"));
const dots = Array.from(document.querySelectorAll("[data-carousel-dot]"));
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");
const comparisonRanges = Array.from(document.querySelectorAll(".comparison-range"));
let activeSlide = 0;

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function showSlide(index) {
  if (!slides.length) {
    return;
  }

  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
  });
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSlide);
  });
}

if (prevButton && nextButton && slides.length) {
  prevButton.addEventListener("click", () => showSlide(activeSlide - 1));
  nextButton.addEventListener("click", () => showSlide(activeSlide + 1));
  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => showSlide(dotIndex));
  });
}

comparisonRanges.forEach((range) => {
  const stage = range.closest(".comparison-stage");

  function updateComparison() {
    if (stage instanceof HTMLElement) {
      stage.style.setProperty("--position", `${range.value}%`);
    }
  }

  range.addEventListener("input", updateComparison);
  updateComparison();
});

if (form && statusText) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent("New detailing request");
    const body = encodeURIComponent(
      [
        `Name: ${data.get("name") || ""}`,
        `Phone: ${data.get("phone") || ""}`,
        `Vehicle: ${data.get("vehicle") || ""}`,
        `Package: ${data.get("package") || ""}`,
        `Notes: ${data.get("notes") || ""}`,
      ].join("\n")
    );

    statusText.textContent = "Opening your email app with the request details.";
    window.location.href = `mailto:hello@hueautodetailing.com?subject=${subject}&body=${body}`;
    form.reset();
  });
}
