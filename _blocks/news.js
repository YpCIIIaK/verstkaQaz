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
