import Component from './util/component.js';
import DialogBoard from './components/dialog-board/index.js';

class App extends Component {
  #canvas = document.createElement('canvas');
  #ctx = this.#canvas.getContext('2d');
  #pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

  #dialogBoard;

  state = {
    stageWidth: document.body.clientWidth,
    stageHeight: document.body.clientHeight,
  };

  constructor() {
    super();

    this.#dialogBoard = new DialogBoard();

    window.addEventListener('resize', this.#resize.bind(this));
    this.#resize();
    this.#animate();
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
   * @description 에니메이션을 시작합니다.
   */
  #animate() {
    window.requestAnimationFrame(this.#animate.bind(this));

    const { stageWidth, stageHeight } = this.state;
    this.#ctx.clearRect(0, 0, stageWidth, stageHeight);

    this.#dialogBoard.draw(this.#ctx);
  }

  render() {
    const { stageWidth, stageHeight } = this.state;

    this.#dialogBoard.setProp({ stageWidth, stageHeight });
  }
}

export default App;
