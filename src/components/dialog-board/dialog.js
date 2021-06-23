import Component from '../../util/component.js';
import Location from '../../util/location.js';

class Dialog extends Component {
  #pos = null;

  prop = {
    width: 0,
    height: 0,
    color: '#ffffff',
    stageWidth: 0,
    stageHeight: 0,
    destPos: null,
  };

  constructor() {
    super();
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
    } else {
      // 아이템이 화면 밖으로 넘어가면, 화면 안으로 조정합니다.
      const maxX = stageWidth - width;
      const maxY = stageHeight - height;

      if (this.#pos.x > maxX || this.#pos.y > maxY) {
        const x = Math.min(this.#pos.x, maxX);
        const y = Math.min(this.#pos.y, maxY);
        this.#pos = new Location(x, y);
      }
    }
  }

  /**
   * @description 아이템을 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    if (this.#pos === null) return;
    const { color, width, height } = this.prop;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(this.#pos.x, this.#pos.y, width, height);
  }

  render() {}

  componentDidRender(_, preProp) {
    const stageSizeChange =
      preProp.stageWidth !== this.prop.stageWidth ||
      preProp.stageHeight !== this.prop.stageHeight;

    if (stageSizeChange) this.#resize();
  }
}

export default Dialog;
