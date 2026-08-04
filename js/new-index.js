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

/* Переключалка картинок в блоке «Клинкерная плитка...».
   Без Swiper: без драга и без горизонтального проезда, только фейд. */

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

/* Дописать в js/main.js рядом с остальными обработчиками форм.
   Логика один в один как у call-form-wr / coop-form / prod-form-wr.
   ВАЖНО: на бэке нужен файл ajax/forms/samples_form.php */

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
  const EASE = 0.12;
  const media = window.matchMedia("(max-width: 768px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

  let target = window.scrollY;
  let animating = false;

  const maxScroll = () =>
    Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

  const step = () => {
    const delta = (target - window.scrollY) * EASE;

    if (Math.abs(delta) < 0.5) {
      window.scrollTo(0, target);
      animating = false;
      return;
    }

    window.scrollTo(0, window.scrollY + delta);
    requestAnimationFrame(step);
  };

  const onWheel = (e) => {
    if (media.matches || reduced.matches) return;
    if (document.body.classList.contains("noscroll")) return;
    if (e.ctrlKey) return;
    if (e.target.closest(".swiper, .modal, [data-lenis-prevent]")) return;

    if (!animating) target = window.scrollY;

    target = Math.max(0, Math.min(target + e.deltaY, maxScroll()));
    e.preventDefault();

    if (!animating) {
      animating = true;
      requestAnimationFrame(step);
    }
  };

  const stop = () => {
    animating = false;
    target = window.scrollY;
  };

  window.addEventListener("wheel", onWheel, { passive: false });
  window.addEventListener("keydown", stop);
  window.addEventListener("mousedown", stop);
  window.addEventListener("resize", stop);
})();
