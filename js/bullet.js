const Bullet = Class.extend({

  maxX: null,
  maxY: null,

  init(x, y, angle) {
    this.x = x;
    this.y = y;

    this.shallRemove = false;

    this.vel = {
      x: 5 * Math.cos(angle),
      y: 5 * Math.sin(angle)
    };
  },

  update() {
    this.prevx = this.x;
    this.prevy = this.y;
    if(this.x < 0 || this.x > this.maxX || this.y < 0 || this.y > this.maxY) {
      this.shallRemove = true;
    }

    this.x += this.vel.x;
    this.y += this.vel.y;
  },

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.prevx, this.prevy);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
})
;
