# kingsmsg Kakao CTA Package

이 패키지는 **모든 지역 페이지 하단 고정바의 "지도 열기" 버튼을 "카톡 상담" 버튼**으로 교체합니다.
카톡 상담 버튼을 누르면 오픈채팅(`https://open.kakao.com/o/shGxbqRh`)으로 연결됩니다.

## 구성
- `assets/cta-kakao.js` : DOM을 탐지해 "지도 열기" 버튼을 카톡 상담 버튼으로 자동 치환
- `assets/cta-kakao.css` : 카카오 버튼 색상(노란색) 스타일

## 적용 방법 (수정 2줄)
1) 지역 페이지 템플릿 또는 각 `/regions/*.html` 파일의 `<head>`에 **스타일**을 로드:
```html
<link rel="stylesheet" href="/assets/cta-kakao.css">
```
   (`/assets/style.css` 다음 줄에 추가)

2) 같은 파일의 **하단(</body> 직전)** 에 **스크립트**를 로드:
```html
<script defer src="/assets/cta-kakao.js"></script>
```

> 메인 페이지에는 붙이지 않아도 됩니다. 지역 페이지 공통 템플릿에 한 번만 넣으면 전체 적용됩니다.

## 동작 원리
- `.sticky-cta`, `.cta-bar`, `.bottom-cta`, `.footer-cta`, `.fixed-cta` 등의 컨테이너를 우선 탐색합니다.
- 내부에서 텍스트가 **"지도 열기"** 인 버튼/링크를 찾아 **"카톡 상담"** 링크로 교체합니다.
- 컨테이너를 찾지 못해도 문서 전체에서 마지막 "지도 열기" 버튼 하나를 안전하게 교체합니다.
- 대상 버튼이 없으면 아무 동작도 하지 않습니다(안전).

## 되돌리기 / 예외 처리
- 위에서 추가한 `<script>`와 `<link>` 두 줄을 제거하면 원복됩니다.
- 특정 페이지에서 바꾸고 싶지 않다면, 해당 페이지에서만 `<script src="/assets/cta-kakao.js">`를 빼 주세요.
