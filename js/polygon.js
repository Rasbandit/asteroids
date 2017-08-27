const Polygon = Class.extend({
  init(p) {
    this.points = [...p];
  },

  rotate(theta) {
    const cosine = Math.cos(theta);
    const sine = Math.sin(theta);

    for(let i = 0, len = this.points.length; i < len; i += 2) {
      const x = this.points[i];
      const y = this.points[i + 1];

      this.points[i] = (cosine * x) - (sine * y);
      this.points[i + 1] = (sine * x) + (cosine * y);
    }
  },

  scale(c) {
    for (let i = 0, len = this.points.length; i < len; i += 1) {
      this.points[i] *= c;
    }
  },
  hasPoint(offsetX, offsetY, x, y) {
    let collision = false;
    const p = this.points;
    const length = p.length;
    for(let i = 0, j = length - 2; i < length; i += 2) {
      const px1 = p[i] + offsetX;
      const px2 = p[j] + offsetX;
      const py1 = p[i + 1] + offsetY;
      const py2 = p[j + 1] + offsetY;

      if((py1 > y != py2 > y) &&
        (x < (px2 - px1) * (y - py1) / (py2 - py1) + px1)
      ) {
        collision = !collision;
      }
      j = i;
    }
    return collision;
  }
});
