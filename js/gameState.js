const POINTS = {
  ASTEROIDS: [
    [0, -2, 2, -4, 4, -2, 3, 0, 4, 2, 1, 4, -2, 4, -4, 2, -4, -2, -2, -4, 0, -2],
    [0, -3, -2, -4, -4, -2, -3, 0, -4, 2, -2, 4, 0, 3, 2, 4, 4, 2, 3, 0, 4, -2, 2, -4, 0, -3],
    [0, 1, 0, 4, 2, 4, 4, 1, 4, -1, 2, -5, -2, -5, -5, -2, -3, -1, -5, 0, -2, 4, 0, 1],
    [1, 0, 4, -1, 4, -2, 1, -4, -1, -4, 0, -2, -3, -2, -3, 1, -1, 4, 1, 3, 2, 4, 4, 2, 1, 0],
    [0, -4, -2, -4, -1, -2, -4, -2, -3, 0, -4, 3, 0, 4, 3, 2, 4, -1, 2, -2, 3, -3, 0, -4],
    [-2, -4, 2, -4, 4, -2, 4, 2, 2, 4, -2, 4, -4, 2, -4, -2, -2, -4]
  ],
  SHIP: [6, 0, -3, -3, -2, 0, -3, 3, 6, 0],
  FLAMES: [-2, 0, -3, -1, -5, 0, -3, 1, -2, 0]
};

const ASTEROID_SIZE = 8;

const GameState = State.extend({
  init(game) {
    this._super(game);

    this.canvasHeight = game.canvas.ctx.height;
    this.canvasWidth = game.canvas.ctx.width;
    this.bullets = [];
    this.asteroids = [];

    this.ship = new Ship(POINTS.SHIP, POINTS.FLAMES, 2, this.canvasWidth / 2, this.canvasHeight / 2);
    this.ship.maxX = this.canvasWidth;
    this.ship.maxY = this.canvasHeight;

    this.lvl = 1;

    this.generateLvl(this.lvl);
  },

  generateLvl(lvl) {
    const asteroidBasedOffLevel = Math.round((lvl + 5) / 10 + 2);
    for (let i = 0; i < asteroidBasedOffLevel; i += 1) {
      let randomX = -50;
      let randomY = -50;
      // flip a coin, if true starts on x
      if(Math.random() > 0.5) {
        // set random positon on x
        randomX = (Math.random() * this.canvasWidth);
        // flip coin if it starts on left or right, if true start on right
        if (Math.random() > 0.5) {
          randomY = this.canvasHeight + 50;
        }
      } else {
        randomY = (Math.random() * this.canvasHeight);
        if (Math.random() > 0.5) {
          randomX = this.canvasWidth + 50;
        }
      }
      this.createAsteroid(ASTEROID_SIZE, randomX, randomY);
    }
  },

  handleInputs(input) {
    if(input.isDown('right')) {
      this.ship.rotate(0.05);
    }
    if(input.isDown('left')) {
      this.ship.rotate(-0.05);
    }
    this.ship.drawFlames = false;
    if(input.isDown('up')) {
      this.ship.drawFlames = true;
      this.ship.addVel();
    }
    if(input.isPressed('spacebar')) {
      this.bullets.push(this.ship.shoot());
    }
  },

  update() {
    // asteroid loop to see if bullets collide with asteroid
    this.asteroids.forEach((asteroid, asteroidIndex) => {
      asteroid.update();
      // bullet loop
      this.bullets.forEach((bullet, bulletIndex) => {
        // if bullet is inside
        if(asteroid.hasPoint(bullet.x, bullet.y)) {
          // remove bullet
          this.bullets.splice(bulletIndex, 1);
          // if the asteroid is big enough, split
          if(asteroid.size > ASTEROID_SIZE / 4) {
            // create two new asteroids
            for(let i = 0; i < 2; i += 1) {
              this.createAsteroid(asteroid.size / 2, asteroid.x, asteroid.y);
            }
          }
          // remove hit asteroid
          this.asteroids.splice(asteroidIndex, 1);
        }
      });
    });
    this.bullets.forEach((bullet, index, arr) => {
      bullet.update();
      if(bullet.shallRemove) {
        arr.splice(index, 1);
      }
    });
    this.ship.update();

    if(this.asteroids.length <= 0) {
      this.lvl += 1;
      this.generateLvl(this.lvl);
    }
  },

  createAsteroid(size, xCoordinate, yCoordinate) {
    const randomAsteroid = Math.round(Math.random() * (POINTS.ASTEROIDS.length - 1));
    const asteroid = new Asteroid(POINTS.ASTEROIDS[randomAsteroid], size, xCoordinate, yCoordinate);
    asteroid.maxX = this.canvasWidth;
    asteroid.maxY = this.canvasHeight;
    this.asteroids.push(asteroid);
  },

  render(ctx) {
    ctx.clearAll();
    this.asteroids.forEach((asteroid) => {
      asteroid.draw(ctx);
    });
    this.bullets.forEach(bullet => bullet.draw(ctx));
    this.ship.draw(ctx);
  }
});
