const States = {
  NO_CHANGE: 0,
  MENU: 1,
  GAME: 2,
  END: 3
};

const Game = Class.extend({
  init() {
    this.width = window.innerWidth;
    console.log(this.width);
    this.canvas = new Canvas(640, 480);

    this.input = new InputHandeler({
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      spacebar: 32
    });

    this.canvas.ctx.strokeStyle = '#fff';

    this.currentState = null;
    this.nextState = States.GAME;
  },

  run() {
    this.canvas.animate(() => {
      if(this.nextSate !== States.NO_CHANGE) {
        switch(this.nextState) {
          case States.MENU:
            this.currentState = new State(this);
            break;
          case States.GAME:
            this.currentState = new GameState(this);
            break;
          case States.END:
            this.currentState = new State(this);
            break;
          default:
            break;
        }
        this.nextSate = States.NO_CHANGE;
      }
      this.currentState.handleInputs(this.input);
      this.currentState.update();
      this.currentState.render(this.canvas.ctx);
    });
  }
});
