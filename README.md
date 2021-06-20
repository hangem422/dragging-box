# Dragging Box

## 원본

파일 구조와, 코드 스타일을 변경했습니다. 원본을 참고하고 싶으시면 아래 링크를 이용해주세요.

- **원작자**: Interactive Developer
- **링크**: [HTML5 Canvas Tutorial : 자바스크립트로 줄에 매달려 흔들리는 상자 만들기](https://www.youtube.com/watch?v=XNxkVVK6m80&list=PLGf_tBShGSDNGHhFBT4pKFRMpiBrZJXCm&index=3)

## 개선점

### 2. 마우스 포인터 성능 개선

- 포인트 이벤트 리스너 최적화
  - pointermove 이벤트 콜백 함수가 매번 실행되지 않도록, pointerdown 이벤트에서 등록되고 pointerup 이벤트에서 삭제되도록 수정
