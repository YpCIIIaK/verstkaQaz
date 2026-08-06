$root = $PSScriptRoot

$header = "existing/header"
$footer = "existing/footer"
$modal  = "existing/modal"
$main = @(
  "new/hero", "new/selection", "new/tech", "new/samples",
  "new/advantages", "new/quality", "new/catalog", "new/why",
  "new/order", "new/design", "new/eco", "existing/news"
)

function Get-Block($name) {
  return [IO.File]::ReadAllText((Join-Path $root "blocks/$name.html")).TrimEnd()
}

$body = @()
$body += Get-Block $header
$body += '<div id="smooth-wrapper">'
$body += '<div id="smooth-content">'
$body += "<main>"
foreach ($n in $main) { $body += Get-Block $n }
$body += "</main>"
$body += Get-Block $footer
$body += "</div>"
$body += "</div>"
$body += Get-Block $modal
$bodyText = $body -join "`r`n`r`n"

$html = @"
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>QAZCLINKER — новая главная</title>
  <link rel="stylesheet" href="css/existing/swiper-bundle.min.css" />
  <link rel="stylesheet" href="css/existing/normalize.css" />
  <link rel="stylesheet" href="css/existing/style.css" />
  <link rel="stylesheet" href="css/fonts.css" />
  <link rel="stylesheet" href="css/new-index.css" />
  <style>
    body { overflow: visible !important; max-height: none !important; }
  </style>
</head>
<body>
$bodyText
  <script src="js/existing/imask.js"></script>
  <script src="js/existing/swiper-bundle.min.js"></script>
  <script src="js/existing/main.js"></script>
  <script src="js/new-index.js"></script>
</body>
</html>
"@

[IO.File]::WriteAllText((Join-Path $root "index.html"), $html, (New-Object Text.UTF8Encoding($false)))
Write-Output "index.html собран из blocks/"
