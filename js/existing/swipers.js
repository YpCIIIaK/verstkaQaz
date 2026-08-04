const header = document.querySelector(".header");

let superSwiper = null;

function initDynamicSwiper({ selector, paginationSelector }) {
  const container = document.querySelector(selector);
  if (!container) return null;

  const slides = container.querySelectorAll(".section-slide");
  const menuItems = Array.from(slides).map((slide) => {
    const section = slide.querySelector("section");
    return section?.dataset.menu || "";
  });

  const swiper = new Swiper(selector, {
    direction: "vertical",
    speed: 1000,
    slidesPerView: 1,
    touchReleaseOnEdges: true,
    mousewheel: {
      releaseOnEdges: true,
      forceToAxis: true,
    },
    scrollbar: {
      draggable: true,
    },
    pagination: {
      el: paginationSelector,
      clickable: true,
      renderBullet: (index, className) =>
        `<div class="${className}">${menuItems[index]}</div>`,
    },
    on: {
      init() {
        this.scrollbar.init();
        this.scrollbar.updateSize();
        initCustomSectionScroll();
      },
      slideChange() {
        if (!header) return;
        const isScrolled = this.activeIndex > 0;
        header.classList.toggle("swiper-scrolled", isScrolled);
      },
    },
  });

  return swiper;
}

function initCustomSectionScroll() {
  document.querySelectorAll(".swiper-slide").forEach((slide) => {
    const scrollContent = slide.querySelector(".slide-scroll");

    if (!scrollContent) return;

    let currentY = 0;
    let maxScroll = 0;
    let targetY = 0;
    let isAnimating = false;

    const updateMaxScroll = () => {
      maxScroll = Math.max(scrollContent.scrollHeight - slide.clientHeight, 0);
    };

    const applyTransform = () => {
      scrollContent.style.transform = `translate3d(0, ${-currentY}px, 0)`;
    };

    const animateScroll = () => {
      if (!isAnimating) return;
      const delta = (targetY - currentY) * 0.15;

      if (Math.abs(delta) < 0.5) {
        currentY = targetY;
        applyTransform();
        isAnimating = false;
        return;
      }

      currentY += delta;
      applyTransform();
      requestAnimationFrame(animateScroll);
    };

    const handleWheel = (e) => {
      if (maxScroll <= 0) return;

      const delta = e.deltaY;
      const newTarget = targetY + delta;

      const isAtTop = currentY <= 0 && delta < 0;
      const isAtBottom = currentY >= maxScroll && delta > 0;

      if (isAtTop || isAtBottom) return;

      targetY = Math.max(0, Math.min(newTarget, maxScroll));

      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(animateScroll);
      }

      e.preventDefault();
      e.stopPropagation();
    };

    updateMaxScroll();
    applyTransform();
    slide.addEventListener("wheel", handleWheel, { passive: false });

    slide._customScrollCleanup = () => {
      slide.removeEventListener("wheel", handleWheel);
    };
  });
}

function destroySwiperPage() {
  if (superSwiper) {
    superSwiper.destroy(true, true);
    superSwiper = null;
  }
}

function handleSwiperState() {
  if (window.innerWidth <= 768) {
    destroySwiperPage();
  } else {
    superSwiper = initDynamicSwiper({
      selector: ".swiper-super",
      paginationSelector: ".swiper-pagination-super",
    });
  }
  
}

document.addEventListener("DOMContentLoaded", () => {
  handleSwiperState();
});

window.addEventListener("resize", () => {
  handleSwiperState();
});

const swiperHero = new Swiper(".swiper-hero", {
  speed: 800,
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-hero-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: ".swiper-hero__next",
    prevEl: ".swiper-hero__prev",
  },

  // Инициализация при создании
  on: {
    init: function () {
      updateShownClass(this);
      initCounter(this);
      updateCounter(this);
    },
    slideChange: function () {
      updateShownClass(this);
      updateCounter(this);
    },
    slideChangeTransitionEnd: function () {
      updateShownClass(this);
    },
  },
});

// Обновление класса для показанных слайдов
function updateShownClass(swiper) {
  // Удаляем класс у всех слайдов
  swiper.slides.forEach((slide) => {
    slide.classList.remove("swiper-slide-shown");
  });

  // Добавляем класс всем слайдам, которые БЫЛИ активными (кроме текущего)
  for (let i = 0; i < swiper.activeIndex; i++) {
    swiper.slides[i].classList.add("swiper-slide-shown");
  }
}

// Инициализация счетчика
function initCounter(swiper) {
  const counterContainer = document.querySelector(".swiper-hero-count");
  if (!counterContainer) return;

  // Если внутри контейнера нет элемента для текущего слайда - создаем
  if (!counterContainer.querySelector(".swiper-hero-count__current")) {
    const currentCounter = document.createElement("span");
    currentCounter.className = "swiper-hero-count__current";
    currentCounter.textContent = (swiper.activeIndex + 1)
      .toString()
      .padStart(2, "0");

    counterContainer.appendChild(currentCounter);
  }
}

// Обновляем счетчик при смене слайда
function updateCounter(swiper) {
  const counterContainer = document.querySelector(".swiper-hero-count");
  if (!counterContainer) return;

  const currentCounter = counterContainer.querySelector(
    ".swiper-hero-count__current"
  );
  if (currentCounter) {
    currentCounter.textContent = (swiper.activeIndex + 1)
      .toString()
      .padStart(2, "0");
  }
}

const swiperHeroNews = new Swiper(".swiper-hero-news", {
  speed: 1000,

  initialSlide: 1,
	loop:true,
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

const swiperBosses = new Swiper(".swiper-bosses", {
  speed: 800,
loop:true,
  autoplay: {
    delay: 5000,
  },

  navigation: {
    nextEl: ".swiper-bosses__next",
    prevEl: ".swiper-bosses__prev",
  },

  pagination: {
    el: ".swiper-bosses-progressbar",
    type: "progressbar",
  },

  breakpoints: {
    320: {
      slidesPerView: 1.3,
      spaceBetween: 7,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
  },
});

const thumbsSingleProduct = new Swiper(".thumbs-single-product", {
  speed: 800,
  watchSlidesProgress: true,

  navigation: {
    nextEl: ".thumbs-single-product__next",
    prevEl: ".thumbs-single-product__prev",
  },

  breakpoints: {
    320: {
      slidesPerView: 3.7,
      spaceBetween: 7,
    },
    768: {
      slidesPerView: 3.5,
      spaceBetween: 14,
      direction: "vertical",
    },
  },
});

const swiperSingleProduct = new Swiper(".swiper-single-product", {
  speed: 800,
  slidesPerView: 1,
  spaceBetween: 14,

  thumbs: {
    swiper: thumbsSingleProduct,
  },

  breakpoints: {
    320: {},
    768: {},
  },
});

const swiperGalsecfirst = new Swiper(".swiper-galsecfirst", {
  speed: 800,
  freeMode: true,

  navigation: {
    nextEl: ".swiper-galsecfirst__next",
    prevEl: ".swiper-galsecfirst__prev",
  },

  mousewheel: {
    enabled: true,
    forceToAxis: true,
  },

  breakpoints: {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 7,
    },
    768: {
      slidesPerView: 1.6,
      spaceBetween: 14,
    },
  },

  pagination: {
    el: ".swiper-galsecfirst-progressbar",
    type: "progressbar",
  },
});

const swiperGalsecSecond = new Swiper(".swiper-galsecsecond", {
  speed: 800,
  slidesPerView: 1,
  spaceBetween: 14,

  navigation: {
    nextEl: ".swiper-galsecsecond__next",
    prevEl: ".swiper-galsecsecond__prev",
  },

  pagination: {
    el: ".swiper-galsecsecond-progressbar",
    type: "progressbar",
  },
});