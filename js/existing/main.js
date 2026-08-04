document.addEventListener("DOMContentLoaded", () => {
  (() => {
    const header = document.querySelector(".header");
    const menu = document.querySelector(".menu");
    const body = document.body;
    if (!header) return;

    /* ───  БУРГЕР  ─────────────────────────────────────────────── */
    header.querySelector(".burger")?.addEventListener("click", () => {
      header.classList.toggle("menu-active");
      body.classList.toggle("menu-active");
    });

    /* ───  ПРОКРУТКА  ──────────────────────────────────────────── */
    const raf =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      ((cb) => setTimeout(cb, 1000 / 60));

    let lastScroll = window.scrollY; // предыдущее положение
    const DELTA = 10; // «шум» прокрутки, пикселей
    const hideAfter = header.offsetHeight; // не прятать, пока хедер в зоне видимости

    function checkScroll() {
      const cur = window.scrollY;

      /* — состояние «страница не вверху» ———————————————— */
      if (cur > 0) header.classList.add("scrolled");
      else header.classList.remove("scrolled");

      /* — состояние «скроллим вниз» ———————————————— */
      if (Math.abs(cur - lastScroll) > DELTA) {
        if (cur > lastScroll && cur > hideAfter) {
          header.classList.add("scroll-down"); // можно анимировать убирание
        } else {
          header.classList.remove("scroll-down");
        }
        lastScroll = cur;
      }
    }

    window.addEventListener("scroll", () => raf(checkScroll));
    checkScroll(); // вызвать при загрузке

    /* ───  ЗАКРЫВАЕМ БУРГЕР ПО КЛИКУ ПО ССЫЛКАМ  ──────────────── */
    document.querySelectorAll(".menu__nav-link").forEach((link) =>
      link.addEventListener("click", () => {
        header.classList.remove("menu-active");
        body.classList.remove("menu-active");
      })
    );
  })();

  if (document.querySelector("[data-fancybox]")) {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
  }

  document.addEventListener("click", function (event) {
    const openTrigger = event.target.closest("[data-modal-target]");
    const closeTrigger = event.target.closest("[data-modal-close]");
    const anyModal = event.target.closest(".modal");

    // 1) Открытие по data-modal-target
    if (openTrigger) {
      event.preventDefault();
      const modalId = openTrigger.getAttribute("data-modal-target");
      const modalEl = document.querySelector(`[data-modal="${modalId}"]`);
      if (modalEl) {
        modalEl.classList.add("is_active");
        // При открытии любой модалки добавляем класс к body
        document.body.classList.add("noscroll");

        const productTitle = openTrigger.getAttribute("data-title");
        const inputHidden = modalEl.querySelector(".product-name");
        if (inputHidden && productTitle) {
          inputHidden.value = productTitle;
        }
      }
      return;
    }

    // 2) Закрытие по кнопке data-modal-close
    if (closeTrigger) {
      event.preventDefault();
      const parentModal = closeTrigger.closest(".modal");
      if (parentModal) {
        parentModal.classList.remove("is_active");
        resetModalSwipers(anyModal);
        // Если нет ни одной открытой модалки, убираем класс у body
        if (!document.querySelector(".modal.is_active")) {
          document.body.classList.remove("noscroll");
        }
      }
      return;
    }

    if (anyModal && !event.target.closest(".modal-inner")) {
      anyModal.classList.remove("is_active");

      resetModalSwipers(anyModal);

      if (!document.querySelector(".modal.is_active")) {
        document.body.classList.remove("noscroll");
      }
      return;
    }
  });

  // Находим все поля с телефоном и добавляем маску
  const telInputs = document.querySelectorAll(".tel-input");

  telInputs.forEach((input) => {
    IMask(input, { mask: "+{7} (000) 000-00-00" });
  });

  // TABBY TABS
  const allTabs = document.querySelectorAll("[data-tabs]");

  if (allTabs.length > 0) {
    allTabs.forEach((tabElement) => {
      const selector = `[data-tabs="${tabElement.getAttribute("data-tabs")}"]`;
      const tabs = new Tabby(selector);
    });
  }

  //FAQ

  const faq = document.querySelectorAll(".faq-item");

  faq.forEach((el) => {
    el.addEventListener("click", function () {
      this.classList.toggle("active");
      let faqBody = this.querySelector(".faq-item__body");
      if (faqBody.style.maxHeight) {
        faqBody.style.maxHeight = null;
      } else {
        faqBody.style.maxHeight = faqBody.scrollHeight + "px";
      }
    });
  });

  const filterItems = document.querySelectorAll(".filter-item");

  filterItems.forEach((el) => {
    const filterItemHead = el.querySelector(".filter-item__head");

    filterItemHead.addEventListener("click", function () {
      // Закрываем все остальные элементы
      filterItems.forEach((item) => {
        if (item !== el) {
          item.classList.remove("active");
          const body = item.querySelector(".filter-item__body");
          body.style.maxHeight = null;
        }
      });

      // Открываем/закрываем текущий элемент
      el.classList.toggle("active");
      const filterItemBody = el.querySelector(".filter-item__body");

      if (el.classList.contains("active")) {
        filterItemBody.style.maxHeight = filterItemBody.scrollHeight + "px";
      } else {
        filterItemBody.style.maxHeight = null;
      }
    });
  });

  const tabLinks = document.querySelectorAll(".contacts-tabs a");
  const infoPanes = document.querySelectorAll(".contacts__info-box > div");
  const mapPanes = document.querySelectorAll(".contacts__map-box  > div");

  tabLinks.forEach((link, i) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // отменяем якорь

      // выключаем всё
      [...tabLinks, ...infoPanes, ...mapPanes].forEach((el) =>
        el.classList.remove("is-active")
      );

      // включаем выбранный индекс
      link.classList.add("is-active");
      infoPanes[i].classList.add("is-active");
      mapPanes[i].classList.add("is-active");
    });
  });

const historyYears = document.querySelectorAll(".history-year");
  const historyBlocks = document.querySelectorAll(".history-block");
  const historyDesktopBlocks = document.querySelectorAll(
    ".history-desktop-block"
  );

  if (
    historyYears.length > 0 &&
    (historyBlocks.length > 0 || historyDesktopBlocks.length > 0)
  ) {
    const setActiveHistory = (index) => {
      historyYears.forEach((year) => {
        year.classList.toggle("active", year.dataset.index === index);
      });

      historyBlocks.forEach((block) => {
        block.classList.toggle("active", block.dataset.index === index);
      });

      historyDesktopBlocks.forEach((block) => {
        block.classList.toggle("active", block.dataset.index === index);
      });
    };

    const initialIndex =
      document.querySelector(".history-year.active")?.dataset.index ??
      historyYears[0].dataset.index;

    setActiveHistory(initialIndex);

    historyYears.forEach((year) => {
      year.addEventListener("click", () => {
        if (!year.dataset.index) return;
        setActiveHistory(year.dataset.index);
      });
    });
  }

 /* if (window.innerWidth >= 769) {
    const years = document.querySelectorAll(".history-year");
    const texts = document.querySelectorAll(".history-block");

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = entry.target.dataset.index;

          texts.forEach((t) => t.classList.remove("active"));
          document
            .querySelector(`.history-block[data-index="${index}"]`)
            ?.classList.add("active");

          years.forEach((y) => y.classList.remove("active"));
          entry.target.classList.add("active");
        }
      });
    }, options);

    years.forEach((year) => observer.observe(year));
  }*/
});

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".catalog-mall")) {
    /*const nativeSelect = document.querySelector(".filter-select-tag");
    const customSelect = document.querySelector(".filter-select");

    const customOptions = document.querySelector(".filter-select__box");

    nativeSelect.querySelectorAll("option").forEach((option) => {
      const customOption = document.createElement("div");
      customOption.classList.add("filter-select__option");
      customOption.textContent = option.textContent;
      customOption.dataset.value = option.value;

      customOption.addEventListener("click", () => {
        nativeSelect.value = option.value;

        customOptions
          .querySelectorAll(".filter-select__option")
          .forEach((opt) => {
            opt.classList.remove("active");
          });

        customOption.classList.add("active");

        customSelect.classList.remove("active");
      });

      customOptions.appendChild(customOption);
    });

    document.addEventListener("click", (e) => {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove("active");
      }
    });

    if (nativeSelect.selectedIndex >= 0) {
      const defaultOption = customOptions.children[nativeSelect.selectedIndex];
      defaultOption.classList.add("active");
    }
    */

    const filterBtn = document.querySelector(".filter-btn");
    const filter = document.querySelector(".filter");

    // Открытие/закрытие фильтра
    filterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      filterBtn.classList.toggle("active");
      filter.classList.toggle("active");
    });

    // Закрытие при клике вне фильтра
    document.addEventListener("click", (e) => {
      const isClickInsideFilter = filter.contains(e.target);
      const isClickOnFilterBtn = filterBtn.contains(e.target);

      if (!isClickInsideFilter && !isClickOnFilterBtn) {
        filterBtn.classList.remove("active");
        filter.classList.remove("active");
      }
    });

    const sortingBtn = document.querySelector(".sorting-btn");
    const sorting = document.querySelector(".sorting");

    // Открытие/закрытие фильтра
    sortingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sortingBtn.classList.toggle("active");
      sorting.classList.toggle("active");
    });

    // Закрытие при клике вне фильтра
    document.addEventListener("click", (e) => {
      const isClickInsideFilter = sorting.contains(e.target);
      const isClickOnFilterBtn = sortingBtn.contains(e.target);

      if (!isClickInsideFilter && !isClickOnFilterBtn) {
        sortingBtn.classList.remove("active");
        sorting.classList.remove("active");
      }
    });
  }
});


let callForm = document.querySelector('.call-form-wr');
  let callModal = document.querySelector('.call-form');
  if (callForm) {
    callForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

          const success = callForm.querySelector('.success');
          /*const formBlock = callBannerForm.querySelector('.call-modal-form');
          const callBannerModalTitle = callBannerModal.querySelector('.call-modal-title');*/
          const fields = callForm.querySelectorAll('input');

          for (let i = 0; fields.length > i; i++) {
            fields[i].value = "";
          }

          /* success.style.visibility="visible";
            formBlock.style.visibility = "hidden";
            callBannerModalTitle.style.visibility = "hidden";*/
          location.href = "/stranitsa-blagodarnosti";
        }
      }

      request.open('POST', '/local/templates/qazclincker/ajax/forms/call_form.php', true);
      request.setRequestHeader('accept', 'application/json');

      let data = new FormData(callForm);
      request.send(data);
    })
  };


  let coopForms = document.querySelectorAll('.feedback-form');
  let coopForm = null;
  for (let i = 0; i < coopForms.length; i++) {
    if (coopForms[i].querySelector('[name="form-message"]')) {
      coopForm = coopForms[i];
      break;
    }
  }
  let coopModal = document.querySelector('.feedback__box');
  if (coopForm) {
    coopForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

          const success = coopForm.querySelector('.success');
          /*const formBlock = callBannerForm.querySelector('.call-modal-form');
          const callBannerModalTitle = callBannerModal.querySelector('.call-modal-title');*/
          const fields = coopForm.querySelectorAll('input');

          for (let i = 0; fields.length > i; i++) {
            fields[i].value = "";
          }

          /* success.style.visibility="visible";
            formBlock.style.visibility = "hidden";
            callBannerModalTitle.style.visibility = "hidden";*/
          location.href = "/stranitsa-blagodarnosti";
        }
      }

      request.open('POST', '/local/templates/qazclincker/ajax/forms/coop_form.php', true);
      request.setRequestHeader('accept', 'application/json');

      let data = new FormData(coopForm);
      request.send(data);
    })
  };



  let prodForm = document.querySelector('.prod-form-wr');
  let prodModal = document.querySelector('.prod-form');
  if (prodForm) {
    prodForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

          const success = prodForm.querySelector('.success');
          /*const formBlock = callBannerForm.querySelector('.call-modal-form');
          const callBannerModalTitle = callBannerModal.querySelector('.call-modal-title');*/
          const fields = prodForm.querySelectorAll('input');

          for (let i = 0; fields.length > i; i++) {
            fields[i].value = "";
          }

          /* success.style.visibility="visible";
            formBlock.style.visibility = "hidden";
            callBannerModalTitle.style.visibility = "hidden";*/
          location.href = "/stranitsa-blagodarnosti";
        }
      }

      request.open('POST', '/local/templates/qazclincker/ajax/forms/prod_form.php', true);
      request.setRequestHeader('accept', 'application/json');

      let data = new FormData(prodForm);
      request.send(data);
    })
  };

  let preorderForm = document.querySelector('.preorder-form-wr');
  if (preorderForm) {
    preorderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          const fields = preorderForm.querySelectorAll('input[type="text"], input[type="email"]');
          const checkboxes = preorderForm.querySelectorAll('input[type="checkbox"]');

          for (let i = 0; fields.length > i; i++) {
            fields[i].value = "";
          }

          for (let i = 0; checkboxes.length > i; i++) {
            checkboxes[i].checked = false;
          }

          location.href = "/stranitsa-blagodarnosti";
        }
      }

      request.open('POST', '/local/templates/qazclincker/ajax/forms/preorder_form.php', true);
      request.setRequestHeader('accept', 'application/json');
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      let data = new FormData(preorderForm);
      request.send(data);
    })
  };
(function () {
    const wrapper = document.querySelector('.langs');
    if (!wrapper) return;

    const activeBtn = wrapper.querySelector('.langs__active');
    const currentLabel = document.getElementById('currentLang');
    const links = wrapper.querySelectorAll('.langs__link');

    // --- открытие / закрытие ---
    activeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.toggle('is-open');
    });

    document.addEventListener('click', () => {
        wrapper.classList.remove('is-open');
    });

    // --- получить текущий язык ---
    function getCurrentLang() {
        const el = document.querySelector('.translatorjs_lang_item.translatorjs_lang_active');
        let lang = el ? el.dataset.translatorjsLang : null;

        if (lang === 'in') lang = 'en';

        return lang;
    }

    // --- label ---
    function updateLabel(lang) {
        if (!currentLabel) return;

        if (lang === 'ru') currentLabel.textContent = 'RU';
        if (lang === 'kk') currentLabel.textContent = 'KZ';
        if (lang === 'en') currentLabel.textContent = 'EN';
    }

    // --- список ---
    function updateList(currentLang) {
        links.forEach(link => {
            const lang = link.dataset.lang;

            link.style.display = (lang === currentLang) ? 'none' : '';
        });
    }

    // --- смена языка ---
    function setLang(lang) {
        const currentLang = getCurrentLang();

        if (currentLang === lang) return;

        const original = document.querySelector(`.translatorjs_lang_item[data-translatorjs-lang="${lang}"]`);

        if (original) {
            original.click();
        }

        localStorage.setItem('site_lang', lang);

        updateLabel(lang);
        updateList(lang);

        wrapper.classList.remove('is-open');
    }

    // --- клики ---
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const lang = link.dataset.lang;
            setLang(lang);
        });
    });

    // --- инициализация ---
    const savedLang = localStorage.getItem('site_lang');

    setTimeout(() => {
        const currentLang = getCurrentLang() || 'ru';

        if (savedLang && savedLang !== currentLang) {
            setLang(savedLang);
        } else {
            updateLabel(currentLang);
            updateList(currentLang); 
        }
    }, 500);

    window.setLang = setLang;

})();