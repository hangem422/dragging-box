import Stage from './model/stage.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.stage = new Stage();
    window.addEventListener('resize', this.stage.resize.bind(this.stage));

    this.animate();
  }

  get element() {
    return this.canvas;
  }

  resize() {
    if (
      this._width !== this.stage.width ||
      this._height !== this.stage.height
    ) {
      this._width = this.stage.width;
      this._height = this.stage.height;

      this.canvas.width = this.stage.ratioWidth;
      this.canvas.height = this.stage.ratioHeight;
      this.ctx.scale(this.stage.ratio, this.stage.ratio);
    }
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.resize();
    this.ctx.clearRect(0, 0, this.stage.width, this.stage.height);
  }
}

export default App;
