# Dragging Box

## 원본

파일 구조와, 코드 스타일을 변경했습니다. 원본을 참고하고 싶으시면 아래 링크를 이용해주세요.

- **원작자**: Interactive Developer
- **링크**: [HTML5 Canvas Tutorial : 자바스크립트로 줄에 매달려 흔들리는 상자 만들기](https://www.youtube.com/watch?v=XNxkVVK6m80&list=PLGf_tBShGSDNGHhFBT4pKFRMpiBrZJXCm&index=3)

## 개선점

### 1. 파일 구조와 코드 스타일 변경

- 상수값 선언 분리하여 유지/보수가 용이하도록 개선
- MVVM 모델 적용 ([vanilla-mvvm-architecture](https://github.com/hangem422/vanilla-mvvm-architecture))

### 2. 마우스 포인터 성능 개선

- 포인트 이벤트 리스너 최적화

  - pointermove 이벤트 콜백 함수가 매번 실행되지 않도록, pointerdown 이벤트에서 등록되고 pointerup 이벤트에서 삭제되도록 수정

### 3. Dialog 성능 개선

- 화면 리사이징시 성능 개선

  - 기존 코드에서는 화면이 리사이징되면 모든 카드의 애니메이션이 취소되고, 위치 초기화
  - 애니메이션이 취소되지 않고 새로운 화면 크기에 맞춰서 Dialog가 배치되도록 개선
  - 추가적으로 Dialog와 Line이 화면 밖으로 나가지 않도록 조정

- Dialog Rotation 성능 개선

  - 기존 코드는 Dialog 어디를 클릭하여 드래그해도 기울기가 같음
  - Dialog 상단을 드래그하면 정방향, 하단을 드래그하면 역방향으로 회전하게 변경해 더욱 현실적인 움직임을 연출
  - Dialog 중단을 드래그할수록 회전율이 감소하게 변경해 더욱 자연스러운 움직임을 연출
  - 의미없고 불필요한 연산을 제거

- Dialog 다양성 증가

  - 기존 코드는 모든 Dialog가 동일한 모양
  - 옵션을 사용하여 서로 다른 색상과 크기를 갖는 Dialog를 만들 수 있게 개선
