# Dragging Box

## 원본

파일 구조와, 코드 스타일을 변경했습니다. 원본을 참고하고 싶으시면 아래 링크를 이용해주세요.

- **원작자**: Interactive Developer
- **링크**: [HTML5 Canvas Tutorial : 자바스크립트로 줄에 매달려 흔들리는 상자 만들기](https://www.youtube.com/watch?v=XNxkVVK6m80&list=PLGf_tBShGSDNGHhFBT4pKFRMpiBrZJXCm&index=3)

## 개선점

### 1. 상수값 선언 분리

유지/보수가 용이하도록 상수값 선언을 별도의 config 파일로 분리시킴

### 2. 화면 리사이징 성능 개선

기존 코드에서는 화면이 리사이징되면 모든 카드의 애니메이션이 취소되고, 위치가 초기화되었습니다. 애니메이션이 취소되지 않고 새로운 화면 크기에 맞춰서 Dialog가 배치되도록 개선했습니다.

### 3. 마우스 포인터 성능 개선

- 포인트 이벤트 리스너 최적화
  - pointermove 이벤트 콜백 함수가 매번 실행되지 않도록, pointerdown 이벤트에서 등록되고 pointerup 이벤트에서 삭제되도록 수정
