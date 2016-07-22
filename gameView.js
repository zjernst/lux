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

  tutorialMessages();

  // requestAnimationFrame(this.animate.bind(this));
  this.animate();
  this.keyHandlers();
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
  }, 8000);

  window.welcome = window.setTimeout(() => {
    newGame.className = "info gone";
    container.className = "box-wrapper gone";
  }, 12000);

  window.flashlight = window.setTimeout(() => {
    flash.className = "info";
    container.className = "box-wrapper";
  }, 14000);

  window.removeFlash = window.setTimeout(() => {
    flash.className = "info gone";
    container.className = "box-wrapper gone";
  }, 22000);

  window.terrainTimer = window.setTimeout(() => {
    terrain.className = "info";
    container.className = "box-wrapper";
  }, 24000);

  window.removeTarrain = window.setTimeout(() => {
    terrain.className = "info gone";
    container.className = "box-wrapper gone";
  }, 32000);

  window.exitTimer = window.setTimeout(() => {
    exit.className = "info";
    container.className = "box-wrapper";
  }, 34000);

  window.removeExit = window.setTimeout(() => {
    exit.className = "info gone";
    container.className = "box-wrapper gone";
  }, 42000);

  window.ghostTimer = window.setTimeout(() => {
    ghost.className = "info";
    container.className = "box-wrapper";
  }, 44000);

  window.removeGhost = window.setTimeout(() => {
    ghost.className = "info gone";
    container.className = "box-wrapper gone";
  }, 60000);
};

function clearTutorial() {
  const newGame = document.getElementById("new-game");
  const subtext = document.getElementById("sub-text");
  const container = document.getElementById("box-wrapper")
  const flash = document.getElementById("flashlight");
  const terrain = document.getElementById("terrain");
  const exit = document.getElementById("exit");
  const ghost = document.getElementById("ghost");

  newGame.className = "info gone";
  subtext.className = "info gone";
  container.className = "info gone";
  flash.className = "info gone";
  terrain.className = "info gone";
  exit.className = "info gone";
  ghost.className = "info gone";

  window.clearTimeout(flashlight);
  window.clearTimeout(terrainTimer);
  window.clearTimeout(exitTimer);
  window.clearTimeout(ghostTimer);
};

function gameTips() {
  const alone = document.getElementById("alone");
  const ghostOne = document.getElementById("ghost-one");
  const ghostTwo = document.getElementById("ghost-two");
  const container = document.getElementById("box-wrapper")
  const infoWrapper = document.getElementById("info")

  alone.className = "info gone";
  ghostOne.className = "info gone";
  ghostTwo.className = "info gone";
  container.className = "box-wrapper gone";
  infoWrapper.className = "info-wrapper center group gone"

  if (score === 1) {
    infoWrapper.className = "info-wrapper center group"
    alone.className = "info";
    container.className = "box-wrapper";
    window.gameplayTimer = window.setTimeout(() => {
      alone.className = "info gone";
      container.className = "box-wrapper gone";
      infoWrapper.className = "info-wrapper center group gone"
    }, 7000);
  } else if (score === 2) {
    ghostOne.className = "info";
    container.className = "box-wrapper";
    infoWrapper.className = "info-wrapper center group"
    window.gameplayTimer = window.setTimeout(() => {
      ghostOne.className = "info gone";
      container.className = "box-wrapper gone";
      infoWrapper.className = "info-wrapper center group gone"
    }, 7000);
  } else if (score === 3) {
    ghostTwo.className = "info";
    container.className = "box-wrapper";
    infoWrapper.className = "info-wrapper center group"
    window.gameplayTimer = window.setTimeout(() => {
      ghostTwo.className = "info gone";
      container.className = "box-wrapper gone";
      infoWrapper.className = "info-wrapper center group gone"
    }, 7000);
  }
};

// function clearGameTips() {
//   if (window.gameplayTimer) {
//     window.clearTimeout(gameplayTimer);
//   }
// }

GameView.prototype.start = function(playerPos) {
  clearTutorial();
  window.cancelAnimationFrame(window.animation);
  this.inProgress = true;
  this.board = this.setBoard();
  this.game = new Game(this.board, this.start.bind(this), playerPos, score);
  this.player = this.game.player;
  score += 1

  this.game.setup(this.ctx);
  // clearGameTips();
  gameTips();

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
