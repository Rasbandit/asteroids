const Ship = Polygon.extend({
  maxX: null,
  maxY: null,

  init(p, flames, size, x, y) {
    this._super(p);

    this.flames = new Polygon(flames);
    this.flames.scale(size);

    this.drawFlames = false;

    this.x = x;
    this.y = y;

    this.scale(size);

    this.angle = 0;

    this.vel = {
      x: 0,
      y: 0
    };
  },

  shoot() {
    const bullet = new Bullet(this.points[0] + this.x, this.points[1] + this.y, this.angle);
    bullet.maxX = this.maxX;
    bullet.maxY = this.maxY;
    return bullet;
  },

  addVel() {
    if((this.vel.x * this.vel.x) + (this.vel.y * this.vel.y) < 20 * 20) {
      this.vel.x += 0.05 * Math.cos(this.angle);
      this.vel.y += 0.05 * Math.sin(this.angle);
    }
  },

  rotate(theta) {
    this._super(theta);
    this.flames.rotate(theta);
    this.angle += theta;
  },

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;

    this.vel.x *= 0.99;
    this.vel.y *= 0.99;

    if (this.x > this.maxX + 5) {
      this.x = -5;
    } else if (this.x < -5) {
      this.x = this.maxX + 5;
    }

    if (this.y > this.maxY + 5) {
      this.y = -5;
    } else if (this.y < -5) {
      this.y = this.maxY + 5;
    }
  },

  draw(ctx) {
    ctx.drawPolygon(this, this.x, this.y);
    if(this.drawFlames) ctx.drawPolygon(this.flames, this.x, this.y);
  }
});
