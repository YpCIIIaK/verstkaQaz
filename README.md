# QAZCLINKER — новая главная

Вёрстка новой главной поверх существующей стилевой системы сайта.
Открывается локально: `index.html`, сборка не нужна.

## Карта файлов

Всё поделено на **existing** — то, что уже есть на боевом сайте, и **new** —
то, что появилось для этой страницы.

```
index.html                  собранная страница, открывать её
build.ps1                   пересобирает index.html из blocks/

blocks/existing/            блоки, взятые с боевого сайта
  header.html               шапка и меню
  news.html                 карусель новостей
  footer.html               футер
  modal.html                модальное окно заявки
blocks/new/                 новые блоки макета
  hero.html  selection.html  tech.html  samples.html
  advantages.html  quality.html  catalog.html  why.html
  order.html  design.html  eco.html

css/existing/               копии боевых файлов, лежат тут ради превью
  style.css                 /local/templates/qazclincker/css/style.css
  normalize.css             /local/templates/qazclincker/css/normalize.css
  swiper-bundle.min.css
css/new-index.css           наши стили, дополняют боевой style.css
css/fonts.css               @font-face только для локального просмотра

js/existing/                копии боевых скриптов
  main.js                   модалки, формы, бургер, маски
  swipers.js  imask.js  swiper-bundle.min.js
js/new-index.js             наши скрипты: активный пункт меню,
                            слайдер в блоке подбора, форма образцов

img/existing/               уже лежит на сервере
  footer-bg.svg             src/icons/footer-bg.svg
  video/hero.mp4            src/videos/0116.mp4
img/new/                    новые картинки макета
  logos/                    логотипы партнёров

fonts/existing/             TT Firs Neue, на сайте подключён
fonts/new/Steelfish/        новый шрифт, на сайте его нет
```

Правки вносим в `blocks/`, потом `pwsh -File build.ps1`.
Править `index.html` напрямую бесполезно — пересборка его перезапишет.

## Соглашения по вёрстке

- Размеры — `calc(N * var(--width-multiplier))`, где N — число из макета.
- Один брейкпоинт: `@media (max-width: 768px)`, плюс `(hover: hover)` и `(hover: none)`.
- Цвета только переменными, палитра в начале `css/new-index.css`.
- Отступы между блоками: 140 на десктопе, 100 на мобилке —
  половина сверху и половина снизу у каждой секции.
- Фаска углов — `clip-path` через `--cut` / `--mid`.

## Что осталось открытым

- `ajax/forms/samples_form.php` — форма заказа образцов шлёт туда POST,
  на бэке файла нет. Модалка работает, она на боевом `call_form.php`.
- 7 страниц не существует: История, Руководство, Вакансии, Контакты,
  Застройщикам, Дополнительные услуги, Производители.
  В разметке помечены `<!-- НЕТ СТРАНИЦЫ -->`.
- PDF каталога для кнопок «Скачать каталог».
- Контакты в макете — рыба (российский индекс и код города),
  сейчас стоят боевые значения с сайта.
- Steelfish идёт с Desktop-лицензией, веб-встраивание она не покрывает.
- Мобильных макетов не было, мобильная версия сделана по здравому смыслу.
- Отступы меню взяты боевые, а не макетные — по макету оно не влезало в экран.
