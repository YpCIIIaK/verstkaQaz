(function () {
  const path = location.pathname.replace(/\/+$/, "") || "/";

  document.querySelectorAll(".menu__link[href]").forEach((link) => {
    const href = link.getAttribute("href").replace(/\/+$/, "");
    if (!href || href === "/" || href.startsWith("#") || href.includes(":")) return;

    if (path === href || path.startsWith(href + "/")) {
      link.classList.add("menu__link_active");
    }
  });
})();

document.querySelectorAll(".selection-slider").forEach((slider) => {
  const slides = slider.querySelectorAll(".selection-slider__img");
  if (slides.length < 2) return;

  const box = slider.closest(".selection__right") || slider.parentElement;
  const prev = box.querySelector(".selection__prev");
  const next = box.querySelector(".selection__next");

  let current = 0;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });
  };

  prev?.addEventListener("click", () => show(current - 1));
  next?.addEventListener("click", () => show(current + 1));

  show(0);
});

let samplesForm = document.querySelector(".samples-form-wr");
if (samplesForm) {
  samplesForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        const fields = samplesForm.querySelectorAll("input, textarea, select");

        for (let i = 0; fields.length > i; i++) {
          if (fields[i].type === "checkbox") {
            fields[i].checked = false;
          } else {
            fields[i].value = "";
          }
        }

        location.href = "/stranitsa-blagodarnosti";
      }
    };

    request.open(
      "POST",
      "/local/templates/qazclincker/ajax/forms/samples_form.php",
      true
    );
    request.setRequestHeader("accept", "application/json");

    let data = new FormData(samplesForm);
    request.send(data);
  });
}

const swiperHeroNews = new Swiper(".swiper-hero-news", {
  speed: 1000,

  initialSlide: 1,
  loop: true,
  autoplay: {
    delay: 5000,
  },

  breakpoints: {
    320: {
      slidesPerView: 1.3,
      spaceBetween: 7,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 14,
    },
  },
});

(function () {
  const EASE = 0.1;
  const wrapper = document.getElementById("smooth-wrapper");
  const content = document.getElementById("smooth-content");
  if (!wrapper || !content) return;

  const media = window.matchMedia("(max-width: 768px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const firefox = CSS.supports("-moz-appearance", "none");

  let current = 0;
  let raf = null;

  const off = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    document.documentElement.classList.remove("smooth-scroll");
    content.style.transform = "";
    document.body.style.height = "";
  };

  const resize = () => {
    document.body.style.height = content.getBoundingClientRect().height + "px";
  };

  const loop = () => {
    current += (window.scrollY - current) * EASE;
    if (Math.abs(window.scrollY - current) < 0.05) current = window.scrollY;
    content.style.transform = "translate3d(0, " + -current + "px, 0)";
    raf = requestAnimationFrame(loop);
  };

  const on = () => {
    document.documentElement.classList.add("smooth-scroll");
    resize();
    current = window.scrollY;
    if (!raf) raf = requestAnimationFrame(loop);
  };

  const apply = () =>
    media.matches || reduced.matches || firefox ? off() : on();

  new ResizeObserver(() => {
    if (raf) resize();
  }).observe(content);

  window.addEventListener("resize", apply);
  media.addEventListener("change", apply);
  apply();
})();
