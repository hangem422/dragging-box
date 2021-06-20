const _pendding = new WeakMap();

class Component {
  state = {};

  /**
   * @description 상태값을 변경합니다.
   * @param {{ [key: string]: any }} state 변경할 상태값
   */
  setState(state) {
    const throttle = _pendding.has(this);
    const nextState = throttle ? _pendding.get(this) : { ...this.state };

    Object.entries(state).forEach(([key, value]) => {
      if (nextState[key] !== undefined) nextState[key] = value;
    });

    if (!throttle) {
      _pendding.set(this, nextState);

      setTimeout(() => {
        const preState = this.state;
        this.state = _pendding.get(this);

        _pendding.delete(this);
        this.render(preState);
      }, 0);
    }
  }

  /**
   * @description 부모의 상태값이 변하면 호출됩니다.
   * @param {{ [key: string]: any }} preState 이전 상태값
   */
  render() {
    const proto = Object.getPrototypeOf(this);
    const name = proto?.constructor.name ?? 'Unknown';
    console.warn(`${name} component did not override the render function.`);
  }
}

export default Component;
