const InputHandeler = Class.extend({
  init(keys) {
    this.keys = {};
    this.down = {};
    this.pressed = {};

    for(key in keys) {
      const code = keys[key];

      this.keys[code] = key;
      this.down[key] = false;
      this.pressed[key] = false;
    }

    document.addEventListener('keydown', (e) => {
      if(this.keys[e.keyCode]) {
        this.down[this.keys[e.keyCode]] = true;
      }
    });
    document.addEventListener('keyup', (e) => {
      if (this.keys[e.keyCode]) {
        this.down[this.keys[e.keyCode]] = false;
        this.pressed[this.keys[e.keyCode]] = false;
      }
    });
  },

  isDown(key) {
    return this.down[key];
  },

  isPressed(key) {
    if (this.pressed[key]) {
      return false;
    } else if (this.down[key]) {
      return this.pressed[key] = true;
    }
    return false;
  }
});
