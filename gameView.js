const Game = require('./game.js');
const Player = window.Player = require('./player.js');
const GameOfLife = require('./gameOfLife.js');
const Util = require('./util.js');
const util = new Util();


function GameView(ctx) {
  this.ctx = ctx;
}

GameView.prototype.start = function(playerPos) {
  this.board = this.setBoard();
  this.game = new Game(this.board, this.start.bind(this), playerPos);
  this.player = this.game.player;

  this.game.setup(this.ctx);
  this.keyHandlers();

  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.setBoard = function (userParams) {
  const params = {
    canvas_id:    "world",
    cell_width:   20,
    cell_height:  20,
    init_cells:   util.randomStart(70, .2),
    colorful: true
  }
  return new GameOfLife(params)
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
