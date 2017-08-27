const Asteroid = Polygon.extend({

  maxX: null,
  maxY: null,

  init(p, s, x, y) {
    this._super(p);

    this.x = x;
    this.y = y;

    this.size = s;

    this.scale(s);

    this.rotationSpeed = 0.02 * (Math.random() * 2 - 1);

    const randomDirection = 2 * Math.PI * Math.random();
    const randomVelocity = Math.random() + 1;
    this.vel = {
      x: randomVelocity * Math.cos(randomDirection),
      y: randomVelocity * Math.sin(randomDirection)
    };
  },

  hasPoint(x, y) {
    return this._super(this.x, this.y, x, y);
  },

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;

    if(this.x > this.maxX + (this.size * 6)) {
      this.x = -(this.size * 6);
    } else if (this.x < -(this.size * 6)) {
      this.x = this.maxX + (this.size * 6);
    }

    if(this.y > this.maxY + (this.size * 6)) {
      this.y = -(this.size * 6);
    } else if (this.y < -(this.size * 6)) {
      this.y = this.maxY + (this.size * 6);
    }
    this.rotate(this.rotationSpeed);
  },

  draw(ctx) {
    ctx.drawPolygon(this, this.x, this.y);
  }
});
