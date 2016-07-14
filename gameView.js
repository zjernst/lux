const Game = require('./game.js');
const Player = window.Player = require('./player.js');


function GameView(ctx) {
  // this.dimX = dimX;
  // this.dimY = dimY;
  this.ctx = ctx;
}

GameView.prototype.start = function(ctx) {
  this.game = new Game();
  this.player = this.game.player;
  this.keyHandlers();

  this.game.setup(ctx);

  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.animate = function () {
  this.game.step();
  this.game.draw(this.ctx);

  requestAnimationFrame(this.animate.bind(this))
};

GameView.MOVES = {
  "w": [ 0, -.5],
  "a": [-.5,  0],
  "s": [ 0,  .5],
  "d": [ .5,  0],
  "up": [ 0, -.5],
  "left": [-.5,  0],
  "right": [ .5,  0],
  "down": [ 0,  .5]
};

GameView.prototype.keyHandlers = function() {
  const player = this.player;
  Object.keys(GameView.MOVES).forEach((k) => {
    let move = GameView.MOVES[k];
    key(k, () => {
      player.direct(move);
    })
  });
};

module.exports = GameView;
