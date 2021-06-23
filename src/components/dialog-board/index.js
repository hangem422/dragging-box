import Component from '../../util/component.js';
import Location from '../../util/location.js';
import Dialog from './dialog.js';
import { dialogs } from '../../constant/conf.js';

class DialogBoard extends Component {
  #dialogs;

  state = {
    items: dialogs.map((conf) => ({ ...conf, destPos: null })), // speed 빠짐
    pointer: new Location(0, 0),
    isDwon: false,
  };

  prop = {
    stageWidth: 0,
    stageHeight: 0,
  };

  constructor() {
    super();

    this.#dialogs = Array.from({ length: dialogs.length }, () => new Dialog());

    this.onMove = this.#pointerMove.bind(this);
    window.addEventListener('pointerdown', this.#pointerDown.bind(this));
    window.addEventListener('pointerup', this.#pointerUp.bind(this));
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
   * @description 아이템들을 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this.#dialogs.forEach((dialog) => dialog.draw(ctx));
  }

  render() {
    const { stageWidth, stageHeight } = this.prop;

    this.state.items.forEach((item, i) => {
      this.#dialogs[i].setProp({ ...item, stageWidth, stageHeight });
    });
  }
}

export default DialogBoard;
