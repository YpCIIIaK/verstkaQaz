# Собирает preview.html из блоков. Запуск: pwsh -File build-preview.ps1
$root = $PSScriptRoot
$prod = "https://qazclinker.kz"

function Get-Block($name) {
  $t = [IO.File]::ReadAllText((Join-Path $root $name))
  # в превью пути к статике прода делаем абсолютными
  return $t.Replace('src="/local/', "src=`"$prod/local/")
}

$header = Get-Block "header.html"
$hero = Get-Block "hero.html"
$selection = Get-Block "selection.html"
$tech = Get-Block "tech.html"
$samples = Get-Block "samples.html"
$advantages = Get-Block "advantages.html"
$quality = Get-Block "quality.html"
$catalog = Get-Block "catalog.html"
$why = Get-Block "why.html"
$order = Get-Block "order.html"
$design = Get-Block "design.html"
$eco = Get-Block "eco.html"
$news = Get-Block "news.html"
$footer = Get-Block "footer.html"

$html = @"
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QAZCLINKER — превью новой главной</title>
  <!-- шрифты локально: с прода они не отдаются из-за отсутствия CORS-заголовка -->
  <link rel="stylesheet" href="fonts.css" />
  <link rel="stylesheet" href="$prod/local/templates/qazclincker/css/swiper-bundle.min.css" />
  <link rel="stylesheet" href="$prod/local/templates/qazclincker/css/normalize.css" />
  <link rel="stylesheet" href="$prod/local/templates/qazclincker/css/style.css" />
  <link rel="stylesheet" href="header.css" />
  <link rel="stylesheet" href="hero.css" />
  <link rel="stylesheet" href="selection.css" />
  <link rel="stylesheet" href="tech.css" />
  <link rel="stylesheet" href="samples.css" />
  <link rel="stylesheet" href="advantages.css" />
  <link rel="stylesheet" href="quality.css" />
  <link rel="stylesheet" href="catalog.css" />
  <link rel="stylesheet" href="why.css" />
  <link rel="stylesheet" href="order.css" />
  <link rel="stylesheet" href="design.css" />
  <link rel="stylesheet" href="eco.css" />
  <link rel="stylesheet" href="news.css" />
  <link rel="stylesheet" href="footer.css" />
  <style>
    /* в боевом шаблоне body раскрывается скриптом, для превью снимаем */
    body { overflow: visible !important; max-height: none !important; }
  </style>
</head>
<body>
$header
<main>
$hero
$selection
$tech
$samples
$advantages
$quality
$catalog
$why
$order
$design
$eco
$news
</main>
$footer
  <script src="$prod/local/templates/qazclincker/js/imask.js"></script>
  <script src="$prod/local/templates/qazclincker/js/swiper-bundle.min.js"></script>
  <script src="$prod/local/templates/qazclincker/js/main.js"></script>
  <script src="header.js"></script>
  <script src="news.js"></script>
  <script src="selection.js"></script>
  <script src="samples.js"></script>
</body>
</html>
"@

[IO.File]::WriteAllText((Join-Path $root "preview.html"), $html, (New-Object Text.UTF8Encoding($false)))
Write-Output "preview.html собран"
