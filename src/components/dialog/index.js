import Component from '../../util/component.js';
import Location from '../../util/location.js';

class Dialog extends Component {
  prop = {
    stageWidth: 0,
    stageHeight: 0,
    pointer: new Location(0, 0),
    isDown: false,
  };

  /**
   * @description Item 리스트에서 선택될 Item을 선별합니다.
   */
  #select() {}

  /**
   * @description 선택된 Item을 해제합니다.
   */
  #deselect() {}

  /**
   * @description 아이템들을 화면에 그립니다.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {}

  render() {
    console.log(this.prop.pointer);
  }

  componentDidRender(_, preProp) {
    if (!preProp.isDown && this.prop.isDown) this.#select();
    else if (preProp.isDown && !this.prop.isDown) this.#deselect();
  }
}

export default Dialog;
