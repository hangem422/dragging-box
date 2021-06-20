class Location {
  #x = 0;
  #y = 0;

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    if (x) this.#x = x;
    if (y) this.#y = y;
  }

  /**
   * @description 위치 좌표를 복사합니다.
   * @returns {Location}
   */
  clone() {
    return new Location(this.#x, this.#y);
  }

  /**
   * @description 위치 좌표를 더합니다.
   * @param {Location | number} value
   * @returns {Location}
   */
  sum(value) {
    let x = this.#x;
    let y = this.#y;

    if (value instanceof Location) {
      x += value.x;
      y += value.y;
    } else {
      x += value;
      y += value;
    }

    return new Location(x, y);
  }

  /**
   * @description 위치 좌표를 뺍니다.
   * @param {Location | number} value
   * @returns {Location}
   */
  subtract(value) {
    let x = this.#x;
    let y = this.#y;

    if (value instanceof Location) {
      x -= value.x;
      y -= value.y;
    } else {
      x -= value;
      y -= value;
    }

    return new Location(x, y);
  }

  /**
   * @description 위치 좌표를 곱합니다.
   * @param {Location | number} value
   * @returns {Location}
   */
  subtract(value) {
    let x = this.#x;
    let y = this.#y;

    if (value instanceof Location) {
      x *= value.x;
      y *= value.y;
    } else {
      x *= value;
      y *= value;
    }

    return new Location(x, y);
  }

  /**
   * @description 위치 좌표가 범위 안에 들어가는지 여부를 확인합니다.
   * @param {Location} loc 범위 좌상단 좌표
   * @param {number} width
   * @param {number} height
   * @returns {boolean}
   */
  isCollide(loc, width, height) {
    return (
      this.#x >= loc.x &&
      this.#y >= loc.y &&
      this.#x <= loc.x + width &&
      this.#y <= loc.y + height
    );
  }
}

export default Location;
