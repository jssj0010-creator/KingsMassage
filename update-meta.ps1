
# PowerShell script to update KingsMSG meta tags
$ErrorActionPreference = "Stop"

$desc = "[킹즈마사지] 스웨디시, 건마, 출장마사지, 출장안마, 타이마사지, 마사지사이트, 1인샵, 홈타이 | 전국 마사지 정보와 지역별, 타입별 마사지업체 정보 제공 내주변 인기샵을 추천"

$files = @("index.html") + (Get-ChildItem -Path "regions" -Filter "*.html" -ErrorAction SilentlyContinue | ForEach-Object { $_.FullName })

foreach ($f in $files) {
  if (-not (Test-Path $f)) { continue }

  $content = Get-Content -Raw -LiteralPath $f -Encoding UTF8

  if ($content -match "<title>.*?</title>") {
    $content = [regex]::Replace($content, "<title>.*?</title>", "<title>출장마사지 중개 플랫폼 | KingsMSG</title>", 'Singleline')
  } else {
    $content = $content -replace "(?is)<head>", "<head>`n<title>출장마사지 중개 플랫폼 | KingsMSG</title>"
  }

  if ($content -match "<meta\s+name=""description""[^>]*>") {
    $content = [regex]::Replace($content, "<meta\s+name=""description""[^>]*>", "<meta name=""description"" content=""$desc"">", 'Singleline')
  } else {
    $content = $content -replace "(?is)</title>", "</title>`n<meta name=""description"" content=""$desc"">"
  }

  if ($content -match "property=""og:description""") {
    $content = [regex]::Replace($content, "<meta\s+property=""og:description""[^>]*>", "<meta property=""og:description"" content=""$desc"">", 'Singleline')
  } else {
    $content = $content -replace "(?is)<meta\s+name=""description""[^>]*>", "$0`n<meta property=""og:description"" content=""$desc"">"
  }

  if ($content -match "name=""twitter:description""") {
    $content = [regex]::Replace($content, "<meta\s+name=""twitter:description""[^>]*>", "<meta name=""twitter:description"" content=""$desc"">", 'Singleline')
  } else {
    $content = $content -replace "(?is)<meta\s+property=""og:description""[^>]*>", "$0`n<meta name=""twitter:description"" content=""$desc"">"
  }

  if ($content -match "property=""og:title""") {
    $content = [regex]::Replace($content, "<meta\s+property=""og:title""[^>]*>", "<meta property=""og:title"" content=""출장마사지 중개 플랫폼 | KingsMSG"">", 'Singleline')
  } else {
    $content = $content -replace "(?is)<meta\s+name=""description""[^>]*>", "$0`n<meta property=""og:title"" content=""출장마사지 중개 플랫폼 | KingsMSG"">"
  }

  if ($content -match "name=""twitter:title""") {
    $content = [regex]::Replace($content, "<meta\s+name=""twitter:title""[^>]*>", "<meta name=""twitter:title"" content=""출장마사지 중개 플랫폼 | KingsMSG"">", 'Singleline')
  } else {
    $content = $content -replace "(?is)<meta\s+property=""og:title""[^>]*>", "$0`n<meta name=""twitter:title"" content=""출장마사지 중개 플랫폼 | KingsMSG"">"
  }

  Set-Content -LiteralPath $f -Value $content -Encoding UTF8
  Write-Host "Updated: $f"
}

Write-Host "Done. Commit and push:"
Write-Host "  git add ."
Write-Host "  git commit -m 'SEO: Title/Description/OG/Twitter 업데이트'"
Write-Host "  git push"
