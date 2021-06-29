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
  multiply(value) {
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

  /**
   * @description 위치 좌표가 동일한지 여부를 체크합니다.
   * @param {Location | number} value
   * @returns {boolean}
   */
  isEqual(value) {
    if (value instanceof Location) {
      return value.x === this.#x && value.y === this.#y;
    }

    return this.#x === value && this.#y === value;
  }

  /**
   * @description 좌표 값을 주어진 최소 좌표 이상으로 만듭니다.
   * @param {Location | number} value 최소 좌표
   * @returns {Location}
   */
  over(value) {
    if (value instanceof Location) {
      const x = Math.max(this.#x, value.x);
      const y = Math.max(this.#y, value.y);
      return new Location(x, y);
    }

    const x = Math.max(this.#x, value);
    const y = Math.max(this.#y, value);
    return new Location(x, y);
  }

  /**
   * @description 좌표 값을 주어진 최대 좌표 이하로 만듭니다.
   * @param {Location | number} value 최대 좌표
   * @returns {Location}
   */
  less(value) {
    if (value instanceof Location) {
      const x = Math.min(this.#x, value.x);
      const y = Math.min(this.#y, value.y);
      return new Location(x, y);
    }

    const x = Math.min(this.#x, value);
    const y = Math.min(this.#y, value);
    return new Location(x, y);
  }
}

export default Location;
