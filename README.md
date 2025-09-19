# kingsmsg — region-coords.js

This package supplies `/assets/region-coords.js` which defines coordinates for all Gyeonggi and Incheon region pages.
It fixes the issue where pins defaulted to central Seoul because the mapping for keys like `gyeonggi-성남` or `incheon-영종도`
was missing.

## Install
1. Upload `assets/region-coords.js` to your site.
2. On every region page, load **before** your map initializer (e.g. `region-map.js`):

```html
<script src="/assets/region-coords.js" defer></script>
<script src="/assets/region-map.js" defer></script>
```

> Keys match the file slug without `.html`. Example:
> - `/regions/gyeonggi-성남.html` -> `gyeonggi-성남`
> - `/regions/incheon-영종도.html` -> `incheon-영종도`

No other changes are required.

## Notes
- The script merges into an existing `window.__REGION_COORDS__` without overwriting.
- Ensure your map code decodes the pathname: `decodeURIComponent(slug)`.
