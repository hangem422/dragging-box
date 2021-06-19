class Stage {
  #ratio = window.devicePixelRatio > 1 ? 2 : 1;
  #wdith = document.body.clientWidth;
  #height = document.body.clientHeight;

  get ratio() {
    return this.#ratio;
  }

  get width() {
    return this.#wdith;
  }

  get height() {
    return this.#height;
  }

  get ratioWidth() {
    return this.#wdith * this.#ratio;
  }

  get ratioHeight() {
    return this.#height * this.#ratio;
  }

  resize() {
    this.#wdith = document.body.clientWidth;
    this.#height = document.body.clientHeight;
  }
}

export default Stage;
