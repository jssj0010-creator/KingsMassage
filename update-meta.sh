#!/usr/bin/env bash
set -e

DESC='[킹즈마사지] 스웨디시, 건마, 출장마사지, 출장안마, 타이마사지, 마사지사이트, 1인샵, 홈타이 | 전국 마사지 정보와 지역별, 타입별 마사지업체 정보 제공 내주변 인기샵을 추천'

# Detect BSD sed (macOS) vs GNU sed
if sed --version >/dev/null 2>&1; then
  # GNU sed
  SED_INPLACE=(-i)
else
  # BSD sed (macOS)
  SED_INPLACE=(-i '')
fi

files=(index.html $(ls regions/*.html 2>/dev/null || true))

for f in "${files[@]}"; do
  [ -f "$f" ] || continue

  # Replace or insert <title>
  if grep -q "<title>.*</title>" "$f"; then
    sed "${SED_INPLACE[@]}" "s|<title>.*</title>|<title>출장마사지 중개 플랫폼 | KingsMSG</title>|" "$f"
  else
    sed "${SED_INPLACE[@]}" "0,/<head>/s//<head>\n<title>출장마사지 중개 플랫폼 | KingsMSG<\/title>/" "$f"
  fi

  # Replace or insert meta description
  if grep -q '<meta name="description"' "$f"; then
    sed "${SED_INPLACE[@]}" "s|<meta name=\"description\"[^>]*>|<meta name=\"description\" content=\"$DESC\">|g" "$f"
  else
    sed "${SED_INPLACE[@]}" "0,/<title>.*<\/title>/s//&\n<meta name=\"description\" content=\"$DESC\">/" "$f"
  fi

  # Open Graph & Twitter (optional)
  if grep -q 'property="og:description"' "$f"; then
    sed "${SED_INPLACE[@]}" "s|<meta property=\"og:description\"[^>]*>|<meta property=\"og:description\" content=\"$DESC\">|g" "$f"
  else
    sed "${SED_INPLACE[@]}" "0,/<meta name=\"description\"[^>]*>/s//&\n<meta property=\"og:description\" content=\"$DESC\">/" "$f"
  fi

  if grep -q 'name="twitter:description"' "$f"; then
    sed "${SED_INPLACE[@]}" "s|<meta name=\"twitter:description\"[^>]*>|<meta name=\"twitter:description\" content=\"$DESC\">|g" "$f"
  else
    sed "${SED_INPLACE[@]}" "0,/<meta property=\"og:description\"[^>]*>/s//&\n<meta name=\"twitter:description\" content=\"$DESC\">/" "$f"
  fi

  if grep -q 'property="og:title"' "$f"; then
    sed "${SED_INPLACE[@]}" "s|<meta property=\"og:title\"[^>]*>|<meta property=\"og:title\" content=\"출장마사지 중개 플랫폼 | KingsMSG\">|g" "$f"
  else
    sed "${SED_INPLACE[@]}" "0,/<meta name=\"description\"[^>]*>/s//&\n<meta property=\"og:title\" content=\"출장마사지 중개 플랫폼 | KingsMSG\">/" "$f"
  fi

  if grep -q 'name="twitter:title"' "$f"; then
    sed "${SED_INPLACE[@]}" "s|<meta name=\"twitter:title\"[^>]*>|<meta name=\"twitter:title\" content=\"출장마사지 중개 플랫폼 | KingsMSG\">|g" "$f"
  else
    sed "${SED_INPLACE[@]}" "0,/<meta property=\"og:title\"[^>]*>/s//&\n<meta name=\"twitter:title\" content=\"출장마사지 중개 플랫폼 | KingsMSG\">/" "$f"
  fi

  echo "Updated: $f"
done

echo "Done. Commit and push:"
echo "  git add ."
echo "  git commit -m 'SEO: Title/Description/OG/Twitter 업데이트'"
echo "  git push"
