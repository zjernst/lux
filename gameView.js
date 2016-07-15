const Game = require('./game.js');
const Player = window.Player = require('./player.js');
const GameOfLife = require('./gameOfLife.js');
const Util = require('./util.js');
const util = new Util();

let score = 0;

function GameView(ctx) {
  this.ctx = ctx;
}

GameView.prototype.tutorial = function(playerPos) {
  this.board = this.setBoard();
  this.game = new Game(this.board, this.start.bind(this), playerPos, score, true);
  this.player = this.game.player;

  this.game.setup(this.ctx);
  this.keyHandlers();

  tutorialMessages();

  // requestAnimationFrame(this.animate.bind(this));
  this.animate();
};

function tutorialMessages() {
  const newGame = document.getElementById("new-game");
  const subtext = document.getElementById("sub-text");
  const container = document.getElementById("box-wrapper")
  const flash = document.getElementById("flashlight");
  const terrain = document.getElementById("terrain");
  const exit = document.getElementById("exit");
  const ghost = document.getElementById("ghost");

  window.skip = window.setTimeout(() => {
    subtext.innerHTML = "Press Space to skip tutorial";
  }, 10000);

  window.welcome = window.setTimeout(() => {
    newGame.className = "info gone";
    container.className = "box-wrapper gone";
  }, 15000);

  window.flashlight = window.setTimeout(() => {
    flash.className = "info";
    container.className = "box-wrapper";
  }, 20000);

  window.removeFlash = window.setTimeout(() => {
    flash.className = "info gone";
    container.className = "box-wrapper gone";
  }, 30000);

  window.terrainTimer = window.setTimeout(() => {
    terrain.className = "info";
    container.className = "box-wrapper";
  }, 35000);

  window.removeTarrain = window.setTimeout(() => {
    terrain.className = "info gone";
    container.className = "box-wrapper gone";
  }, 45000);

  window.exitTimer = window.setTimeout(() => {
    exit.className = "info";
    container.className = "box-wrapper";
  }, 48000);

  window.removeExit = window.setTimeout(() => {
    exit.className = "info gone";
    container.className = "box-wrapper gone";
  }, 55000);

  window.ghostTimer = window.setTimeout(() => {
    ghost.className = "info";
    container.className = "box-wrapper";
  }, 58000);

  window.removeGhost = window.setTimeout(() => {
    ghost.className = "info gone";
    container.className = "box-wrapper gone";
  }, 75000);
};

function clearTutorial() {
  window.clearTimeout(flashlight);
  window.clearTimeout(terrainTimer);
  window.clearTimeout(exitTimer);
  window.clearTimeout(ghostTimer);
};

GameView.prototype.start = function(playerPos) {
  clearTutorial();
  window.cancelAnimationFrame(window.animation);
  this.inProgress = true;
  this.board = this.setBoard();
  this.game = new Game(this.board, this.start.bind(this), playerPos, score);
  this.player = this.game.player;
  score += 1

  this.game.setup(this.ctx);

  // requestAnimationFrame(this.animate.bind(this));
  this.animate();
  this.keyHandlers();
};

GameView.prototype.resetScore = function () {
  score = 0;
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

  window.animation = window.requestAnimationFrame(this.animate.bind(this))
};

GameView.prototype.isOver = function () {
  let result = this.game.gameOver;

  if (result) {
    this.inProgress = false;
    window.cancelAnimationFrame(window.animation)
    window.animation = undefined;

    const infoWrapper = document.getElementById("info");
    const box = document.getElementById("box-wrapper");
    const canvas = document.getElementById("world");
    const loss = document.getElementById("lost-game");
    const scoreResult = document.getElementById("score");

    infoWrapper.className = "info-wrapper group center fade-in"
    loss.className = "info fade-in"
    scoreResult.innerHTML = `Score: ${score}`
    canvas.className = "transparent"
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
