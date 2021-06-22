import Component from './util/component.js';
import Location from './util/location.js';

import Dialog from './components/dialog/index.js';

class App extends Component {
  #canvas = document.createElement('canvas');
  #ctx = this.#canvas.getContext('2d');
  #pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

  #dialog = new Dialog();

  state = {
    stageWidth: document.body.clientWidth,
    stageHeight: document.body.clientHeight,
    pointer: new Location(),
    isDwon: false,
  };

  constructor() {
    super();

    this.onMove = this.#pointerMove.bind(this);
    window.addEventListener('resize', this.#resize.bind(this));
    window.addEventListener('pointerdown', this.#pointerDown.bind(this));
    window.addEventListener('pointerup', this.#pointerUp.bind(this));

    this.#resize();
    // this.#animate();
  }

  get element() {
    return this.#canvas;
  }

  /**
   * @description 화면 크기를 리사이징합니다.
   */
  #resize() {
    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;

    this.#canvas.width = stageWidth * this.#pixelRatio;
    this.#canvas.height = stageHeight * this.#pixelRatio;
    this.#ctx.scale(this.#pixelRatio, this.#pixelRatio);

    this.setState({ stageWidth, stageHeight });
  }

  /**
   * @description 마우스 포인터를 이동합니다.
   * @param {PointerEvent} e
   */
  #pointerMove(e) {
    const pointer = new Location(e.clientX, e.clientY);
    this.setState({ pointer });
  }

  /**
   * @description 마우스 포인터를 클릭합니다.
   * @param {PointerEvent} e
   */
  #pointerDown(e) {
    window.addEventListener('pointermove', this.onMove);
    this.setState({ isDwon: true });
    this.#pointerMove(e);
  }

  /**
   * @description 마우스 포인터 클릭을 해제합니다.
   * @param {PointerEvent} e
   */
  #pointerUp(e) {
    window.removeEventListener('pointermove', this.onMove);
    this.setState({ isDwon: false });
    this.#pointerMove(e);
  }

  /**
   * @description 에니메이션을 시작합니다.
   */
  #animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    const { stageWidth, stageHeight } = this.state;
    this.#ctx.clearRect(0, 0, stageWidth, stageHeight);

    this.#dialog.draw(this.#ctx);
  }

  render() {
    const { stageWidth, stageHeight, pointer, isDwon } = this.state;

    this.#dialog.setProp({ stageWidth, stageHeight, pointer, isDwon });
  }
}

export default App;
