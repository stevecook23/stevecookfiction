(function () {
  const navLinks = document.querySelectorAll(".section-nav a");
  const sections = document.querySelectorAll(".section[id]");

  function setActiveNav() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    let current = null;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        current = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === "#" + current;
      link.classList.toggle("active", isActive);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  const form = document.getElementById("contact-form");
  if (!form) return;

  const statusEl = document.getElementById("form-status");
  const submitBtn = form.querySelector("[type='submit']");

  form.addEventListener("submit", async (event) => {
    if (!form.dataset.ajax) return;

    event.preventDefault();
    submitBtn.disabled = true;
    statusEl.textContent = "Sending…";
    statusEl.className = "form-status";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        statusEl.textContent = "Thank you! Your message has been sent.";
        statusEl.className = "form-status success";
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      statusEl.textContent = "Something went wrong. Please try again or email directly.";
      statusEl.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
