import Component from '../../util/component.js';
import Location from '../../util/location.js';
import Dialog from './dialog.js';
import { dialogs } from '../../constant/conf.js';

/**
 * @typedef {object} DialogBoardProp
 * @property {number} stageWidth Canvas 가로 사이즈
 * @property {number} stageHeight Canvas 세로 사이즈
 */

/**
 * @class DialogBoard
 */
class DialogBoard extends Component {
  #dialogs;

  state = {
    items: dialogs.map((conf) => ({ ...conf })), // speed 빠짐
    selected: -1,
    pointer: null,
    isDown: false,
  };

  /** @type {DialogBoardProp} */
  prop = {};

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
    this.setState({ pointer, isDown: false });
  }

  /**
   * @description 마우스 포인터를 클릭합니다.
   * @param {PointerEvent} e
   */
  #pointerDown(e) {
    window.addEventListener('pointermove', this.onMove);
    const pointer = new Location(e.clientX, e.clientY);
    this.setState({ pointer, isDown: true });
  }

  /**
   * @description 마우스 포인터 클릭을 해제합니다.
   * @param {PointerEvent} e
   */
  #pointerUp(e) {
    window.removeEventListener('pointermove', this.onMove);
    this.setState({ pointer: null, isDown: false, selected: -1 });
  }

  #selectItemIndex(index) {
    console.log(index);
    this.setState({ selected: index });
  }

  /**
   * @description 아이템들을 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 6;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 2;

    this.#dialogs.forEach((dialog) => dialog.draw(ctx));
  }

  render() {
    const { stageWidth, stageHeight } = this.prop;
    const { items, pointer, isDown, selected } = this.state;
    const onPointerDown = this.#selectItemIndex.bind(this);

    items.forEach((item, index) => {
      this.#dialogs[index].setProp({
        ...item,
        index,
        pointer,
        isDown,
        onPointerDown,
        selected: selected === index,
        stageWidth,
        stageHeight,
      });
    });
  }
}

export default DialogBoard;
