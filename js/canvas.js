const Canvas = Class.extend({
  init(width, height) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;

    this.ctx = (function (ctx) {
      ctx.width = ctx.canvas.width;
      ctx.height = ctx.canvas.height;

      ctx.drawPolygon = function (shape, xCoordinate, yCoordinate) {
        const { points } = shape;
        this.beginPath();
        this.moveTo(points[0] + xCoordinate, points[1] + yCoordinate);
        for(let i = 2, len = points.length; i < len; i += 2) {
          this.lineTo(points[i] + xCoordinate, points[i + 1] + yCoordinate);
        }
        this.stroke();
      };

      ctx.clearAll = function () {
        this.clearRect(0, 0, this.width, this.height);
      };

      return ctx;
    }(this.canvas.getContext('2d')));
    document.body.appendChild(this.canvas);
  },

  animate(loop) {
    const rf = (function () {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (cb, el) {
          window.setTimeout(cb, 1000 / 60);
        };
    }());

    const l = () => {
      loop();
      rf(l, this.canvas);
    };
    rf(l, this.canvas);
  }
});
