// Navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Dark mode
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
  themeToggle.setAttribute("aria-label", "Switch to light mode");
}

themeToggle.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  themeToggle.textContent = dark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Toggle dark mode");
  localStorage.setItem("portfolio-theme", dark ? "dark" : "light");
});

// Contact form validation
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");

  const errors = {
    name: document.getElementById("nameError"),
    email: document.getElementById("emailError"),
    message: document.getElementById("messageError")
  };

  Object.values(errors).forEach((element) => element.textContent = "");
  formStatus.textContent = "";

  let valid = true;

  if (name.value.trim().length < 2) {
    errors.name.textContent = "Please enter your name.";
    valid = false;
  }

  if (!email.validity.valid || email.value.trim() === "") {
    errors.email.textContent = "Please enter a valid email address.";
    valid = false;
  }

  if (message.value.trim().length < 10) {
    errors.message.textContent = "Message should contain at least 10 characters.";
    valid = false;
  }

  if (!valid) {
    formStatus.textContent = "Please correct the highlighted fields.";
    return;
  }

  formStatus.textContent = "Thank you! Your message has been validated successfully.";
  form.reset();
});

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => observer.observe(element));
