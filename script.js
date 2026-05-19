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
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submitButton = form.querySelector("button[type='submit']");
    const data = new FormData(form);
    data.append("_subject", "New detailing request from Hue Auto Detailing");

    statusText.textContent = "Sending your request...";
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      statusText.textContent = "Thanks. Your request has been sent.";
      form.reset();
    } catch {
      statusText.textContent = "Sorry, something went wrong. Please call or email us directly.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
