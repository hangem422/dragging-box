import Component from './util/component.js';
import Location from './util/location.js';

class App extends Component {
  #canvas = document.createElement('canvas');
  #ctx = this.#canvas.getContext('2d');
  #pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

  state = {
    stageWidth: document.body.clientWidth,
    stageHeight: document.body.clientHeight,
    pointer: new Location(),
  };

  constructor() {
    super();

    this.onMove = this.pointerMove.bind(this);
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('pointerdown', this.pointerDown.bind(this));
    window.addEventListener('pointerup', this.pointerUp.bind(this));

    this.resize();
    this.animate();
  }

  get element() {
    return this.#canvas;
  }

  resize() {
    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;

    this.#canvas.width = stageWidth * this.#pixelRatio;
    this.#canvas.height = stageHeight * this.#pixelRatio;
    this.#ctx.scale(this.#pixelRatio, this.#pixelRatio);

    this.setState({ stageWidth, stageHeight });
  }

  /**
   * @param {PointerEvent} e
   */
  pointerMove(e) {
    const pointer = new Location(e.clientX, e.clientY);
    this.setState({ pointer });
  }

  /**
   * @param {PointerEvent} e
   */
  pointerDown(e) {
    window.addEventListener('pointermove', this.onMove);
    this.pointerMove(e);
  }

  /**
   * @param {PointerEvent} e
   */
  pointerUp(e) {
    window.removeEventListener('pointermove', this.onMove);
    this.pointerMove(e);
  }

  render() {
    const { stageWidth, stageHeight } = this.state;

    this.#ctx.clearRect(0, 0, stageWidth, stageHeight);
    console.log(this.state.pointer);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.setState({});
  }
}

export default App;
