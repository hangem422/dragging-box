import Component from '../../util/component.js';
import Location from '../../util/location.js';

/**
 * @typedef {object} DialogProp
 * @property {number} width Dialog 가로 사이즈
 * @property {number} height Dialog 세로 사이즈
 * @property {number} followSpeed Dialog 이동 속도
 * @property {string} dialogColor Dialog 색상
 * @property {string} dragEdgeColor Drag Line 색상
 * @property {string} dragVertaxColor Drag Line 종단점 색상
 * @property {number} dragEdgeSize Drag Line 두께
 * @property {number} dragEdgeRadius  Drag Line 종단점 크기
 * @property {number} index  Dialog의 z-index
 * @property {Location} pointer 현재 마우스 포인터 위치
 * @property {boolean} isDown 마우스 클릭 여부
 * @property {(index: number) => void} onPointerDown 포인터에 선택됐을 때 Callback Function
 * @property {boolean} selected 현재 선택된 Dialog인지 여부
 * @property {number} stageWidth Canvas 가로 사이즈
 * @property {number} stageHeight Canvas 세로 사이즈
 */

class Dialog extends Component {
  #pos = null;
  #padding = null;
  #target = null;

  /** @type {DialogProp} */
  prop = {};

  constructor() {
    super();
  }

  #getMaxLocation() {
    const { stageWidth, stageHeight, width, height } = this.prop;
    return new Location(stageWidth - width, stageHeight - height);
  }

  /**
   * @description 화면 크기가 조정되면, Dialog의 위치를 그에 맞게 조정합니다.
   */
  #resize() {
    const { stageWidth, stageHeight, width, height } = this.prop;

    if (this.#pos === null) {
      // 아이템이 초기화된 적이 없으면 초기화합니다.
      const x = Math.random() * (stageWidth - width);
      const y = Math.random() * (stageHeight - height);

      this.#pos = new Location(x, y);
      this.#target = new Location(x, y);
    } else {
      // 아이템이 화면 밖으로 넘어가면, 화면 안으로 조정합니다.
      const maxLoc = this.#getMaxLocation();

      this.#pos = this.#pos.less(maxLoc);
      this.#target = this.#target.less(maxLoc);
    }
  }

  /**
   * @description 다음 Animation Frame을 위한 준비를 진행합니다.
   */
  moveNextFrame() {
    if (this.#pos === null || this.#target === null) return;
    const { followSpeed } = this.prop;

    const move = this.#target.subtract(this.#pos).multiply(followSpeed);
    this.#pos = this.#pos.sum(move);
  }

  /**
   * @description Dialog를 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawDialog(ctx) {
    if (this.#pos === null || this.#target === null) return;
    const { dialogColor, width, height } = this.prop;

    ctx.beginPath();
    ctx.fillStyle = dialogColor;
    ctx.fillRect(this.#pos.x, this.#pos.y, width, height);
  }

  /**
   * @description Drag Line=을 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   */
  drawDragLine(ctx) {
    if (this.#pos === null || this.#target === null) return;
    const { dragEdgeColor, dragVertaxColor, dragEdgeSize, pointer } = this.prop;
    const start = this.#pos.sum(this.#padding);

    ctx.fillStyle = dragVertaxColor;
    ctx.strokeStyle = dragEdgeColor;
    ctx.lineWidth = dragEdgeSize;

    ctx.beginPath();
    ctx.arc(start.x, start.y, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(pointer.x, pointer.y);
    ctx.stroke();
  }

  render() {
    // 화면에 클릭되면 DIalog가 클릭됐는지 계산해서 Presenter에게 알립니다.
    if (
      this.prop.isDown &&
      !this.prop.selected &&
      this.prop.pointer.isCollide(this.#pos, this.prop.width, this.prop.height)
    ) {
      this.prop.onPointerDown(this.prop.index);
      this.#padding = this.prop.pointer.subtract(this.#pos);
    }

    // 선택된 Dialog이면 목표 위치 좌표를 갱신합니다.
    if (this.prop.selected) {
      const maxLoc = this.#getMaxLocation();
      const dest = this.prop.pointer.subtract(this.#padding);
      this.#target = dest.less(maxLoc).over(0);
    }
  }

  componentDidRender(_, preProp) {
    const { stageWidth, stageHeight } = this.prop;
    const { stageWidth: preWidth, stageHeight: preHeight } = preProp;

    // 화면 크기가 조정되면, Dialog의 위치를 그에 맞게 조정합니다.
    if (preWidth !== stageWidth || preHeight !== stageHeight) {
      this.#resize();
    }
  }
}

export default Dialog;
