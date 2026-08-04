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
