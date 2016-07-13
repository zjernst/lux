const Game = require('./game.js');
const Player = window.Player = require('./player.js');


function GameView(dimX, dimY, ctx) {
  this.dimX = dimX;
  this.dimY = dimY;
  this.ctx = ctx;
}

GameView.prototype.start = function(ctx) {
  this.game = new Game(this.dimX, this.dimY);
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
  "w": [ 0, -.2],
  "a": [-.2,  0],
  "s": [ 0,  .2],
  "d": [ .2,  0],
  "up": [ 0, -.2],
  "left": [-.2,  0],
  "right": [ .2,  0],
  "down": [ 0,  .2]
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
