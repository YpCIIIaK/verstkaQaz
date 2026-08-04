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
