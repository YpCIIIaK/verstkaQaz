// Скрипты новой главной QAZCLINKER

// ═══ HEADER ════════════════════════════════════════

// Подсветка текущего раздела в меню и в нижней навигации шапки
(function () {
  const path = location.pathname.replace(/\/+$/, "") || "/";

  document.querySelectorAll(".menu__link[href], .header__navlink[href]").forEach((link) => {
    const href = link.getAttribute("href").replace(/\/+$/, "");
    // главная активной не бывает: ссылки на неё в меню нет
    if (!href || href === "/" || href.startsWith("#") || href.includes(":")) return;

    // раздел считается текущим и для вложенных страниц: /aktsii/kakaya-to
    if (path === href || path.startsWith(href + "/")) {
      link.classList.add(
        link.classList.contains("menu__link")
          ? "menu__link_active"
          : "header__navlink_active"
      );
    }
  });
})();

// ═══ SELECTION ════════════════════════════════════════

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

// ═══ SAMPLES ════════════════════════════════════════

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

// ═══ NEWS ════════════════════════════════════════

// Конфиг боевого свайпера новостей (js/swipers.js) — без изменений
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