const Game = require('./game.js');
const Player = window.Player = require('./player.js');
const GameOfLife = require('./gameOfLife.js');
const Util = require('./util.js');
const util = new Util();

let score = 0;

function GameView(ctx) {
  this.ctx = ctx;
}

GameView.prototype.start = function(playerPos) {
  this.inProgress = true;
  this.board = this.setBoard();
  this.game = new Game(this.board, this.start.bind(this), playerPos, score);
  this.player = this.game.player;

  this.game.setup(this.ctx);
  this.keyHandlers();

  score += 1
  requestAnimationFrame(this.animate.bind(this));
};

GameView.prototype.setBoard = function (userParams) {
  const params = {
    canvas_id:    "world",
    cell_width:   20,
    cell_height:  20,
    init_cells:   util.randomStart(window.innerWidth, window.innerHeight, .2),
    colorful: true
  }
  return new GameOfLife(params)
};

GameView.prototype.animate = function () {
  this.game.step();
  this.game.draw(this.ctx);
  this.isOver();

  requestAnimationFrame(this.animate.bind(this))
};

GameView.prototype.isOver = function () {
  let result = this.game.gameOver;

  if (result) {
    this.inProgress = false;
    const infoWrapper = document.getElementById("info");
    const canvas = document.getElementById("world");
    const loss = document.getElementById("lost-game");
    const scoreResult = document.getElementById("score");

    infoWrapper.className = "info-wrapper group center fade-in"
    loss.className = "info fade-in"
    scoreResult.innerHTML = `Score: ${score}`
    canvas.className = "transparent"
    score = 0;
  }
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
