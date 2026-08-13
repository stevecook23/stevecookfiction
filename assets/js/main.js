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
  // Lightbox Implementation
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox) {
    document.querySelectorAll('.gallery img, .gallery--screenshots img').forEach(img => {
      img.addEventListener('click', () => {
        lightbox.classList.add('active');
        lightboxImg.src = img.src;
      });
    });

    lightboxClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) lightbox.classList.remove('active');
    });
  }

  // Item Descriptions Interactive Gallery
  const mainImg = document.getElementById('main-gallery-img');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  let currentIndex = 0;

  if (mainImg && thumbs.length > 0) {
    const updateGallery = (index) => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumbs[index].classList.add('active');
      mainImg.src = thumbs[index].src;
      mainImg.alt = thumbs[index].alt;
      currentIndex = index;
    };

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => updateGallery(index));
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : thumbs.length - 1;
      updateGallery(currentIndex);
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
      currentIndex = (currentIndex < thumbs.length - 1) ? currentIndex + 1 : 0;
      updateGallery(currentIndex);
    });
  }
})();
