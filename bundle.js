/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = window.GameView = __webpack_require__(1);
	const GameOfLife = window.GameOfLife = __webpack_require__(9);
	const Util = __webpack_require__(5);
	const util = new Util ();
	// const mazeWidth = 482;
	// const mazeHeight = 482;
	
	const canvasEl = document.getElementById("world");
	
	
	canvasEl.height = window.innerHeight;
	canvasEl.width = window.innerWidth;
	
	const ctx = canvasEl.getContext('2d');
	const gameView = new GameView(ctx);
	
	const el = document.getElementsByTagName('body')[0];
	const infoEl = document.getElementById("info");
	const boxWrapper = document.getElementById('box-wrapper');
	let landingStage = true;
	const landing = document.getElementById('landing');
	const newGame = document.getElementById('new-game');
	const lostGame = document.getElementById('lost-game');
	
	key("space", () => {
	  if (landingStage) {
	    gameView.tutorial();
	    landing.className = "landing gone";
	    canvasEl.className = "visible fade-in";
	    newGame.className = "info";
	    boxWrapper.className = "box-wrapper";
	    landingStage = false;
	  } else if (!gameView.inProgress) {
	    infoEl.className = "info-wrapper center group gone";
	    lostGame.className = "info gone";
	    canvasEl.className = "visible fade-in";
	    // newGame.className = "info gone"
	    // toolTip.className = "gone"
	    gameView.resetScore();
	    gameView.start();
	  }
	  // key("space", () => {
	  //   // debugger
	  //   if (!gameView.inProgress && !landing) {
	  //   }
	  // });
	  // landing = false;
	})
	
	// gameView.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);
	const Player = window.Player = __webpack_require__(3);
	const GameOfLife = __webpack_require__(9);
	const Util = __webpack_require__(5);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(3);
	const Sight = __webpack_require__(6);
	const Exit = __webpack_require__(7);
	const Ghost = __webpack_require__(8);
	const Util = __webpack_require__(5);
	const util = new Util();
	// const GameView = require('./game_view.js');
	
	function Game(board, newGame, playerPos, ghosts, tutorial) {
	  this.newGame = newGame;
	  this.dimY = window.innerHeight;
	  this.dimX = window.innerWidth;
	  this.board = board;
	  this.opacity = 1;
	
	  if (tutorial) {
	    this.opacity = .01
	  }
	
	  playerPos = playerPos || [(this.dimX / 2), (this.dimY / 2)]
	
	  this.mouse = playerPos;
	  this.player = new Player(playerPos, this);
	  this.ghosts = [];
	  if (ghosts > 0) {
	    for (var i = 0; i < ghosts; i++) {
	      this.ghosts.push(new Ghost (util.randomPos(this.player.pos, 80), this));
	    }
	  }
	  this.allObjects = [this.player].concat(this.ghosts);
	  // this.vision = 300;
	  this.exit = new Exit (this, tutorial, 500);
	  this.sight = new Sight(this, tutorial);
	  this.gameOver = false;
	  window.setTimeout(() => {
	    this.exit.tutorial = false;
	
	  }, 40000)
	};
	
	Game.prototype.setup = function(ctx) {
	  ctx.clearRect(0, 0, this.dimX, this.dimY);
	  this.board.render();
	  // const canvas = document.getElementById('world');
	  // canvas.className = "fade-in"
	  this.player.draw(ctx);
	  this.exit.draw(ctx);
	  this.sight.draw(ctx);
	  this.ghosts.forEach((ghost) => {
	    ghost.draw(ctx);
	  })
	  window.addEventListener('mousemove', (e) => {
	    this.mouse = [e.clientX, e.clientY]
	  });
	  this.boardSetup();
	};
	
	Game.prototype.boardSetup = function() {
	  for (var i = 0; i < 10; i++) {
	    this.board.step();
	  }
	  this.interval = setInterval(() => {
	    this.stepping = true;
	  }, 10000)
	};
	
	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.dimX, this.dimY);
	  if (this.stepping) {
	    this.board.step();
	  } else {
	    this.board.render();
	  }
	
	  if (this.hitWall(ctx, this.player)) {
	    this.player.setMax(.4);
	  } else {
	    this.player.setMax(2);
	  }
	  this.player.draw(ctx);
	  this.exit.draw(ctx);
	  this.fog(ctx);
	  this.ghosts.forEach((ghost) => {
	    ghost.draw(ctx);
	  });
	  this.sight.draw(ctx);
	  this.ghosts.forEach((ghost) => {
	    ghost.flicker(ctx, this.stepping);
	  })
	  this.stepping = false;
	};
	
	Game.prototype.fog = function (ctx) {
	  let pX = this.player.pos[0];
	  let pY = this.player.pos[1];
	  let gradient = ctx.createRadialGradient(pX, pY, 150, pX, pY, 340);
	  gradient.addColorStop(0, "rgba(0,0,0,0)");
	  gradient.addColorStop(1, `rgba(0,0,0,${this.opacity})`);
	  ctx.save();
	  ctx.fillStyle = gradient;
	  ctx.fillRect(0,0,this.dimX,this.dimY)
	  ctx.restore();
	
	  if (this.opacity < 1) {
	    this.opacity += .00025
	  }
	};
	
	Game.prototype.moveObjects = function () {
	  this.allObjects.forEach((object) => {
	    object.move();
	  });
	};
	
	Game.prototype.step = function () {
	  this.moveObjects();
	  // this.vision -= .01;
	  this.win();
	  if (this.ghosts.length > 0) {
	    this.over();
	  }
	};
	
	Game.prototype.hitWall = function (ctx, player) {
	  let x = player.pos[0] - player.radius/2;
	  let y = player.pos[1] - player.radius/2;
	  const imgData = ctx.getImageData(x, y, player.radius, player.radius);
	  const pix = imgData.data;
	  for (let i = 0; i < pix.length; i++) {
	    if (pix[i] !== 0) {
	      return true
	    }
	  }
	  return false
	};
	
	Game.prototype.win = function() {
	  if (((this.player.pos[0] > this.exit.pos[0]) &&
	    (this.player.pos[0] < this.exit.pos[0] + 60)) &&
	   ((this.player.pos[1] > this.exit.pos[1]) &&
	    (this.player.pos[1] < this.exit.pos[1] + 60)) &&
	     (!this.exit.tutorial)) {
	      this.player.vel = [0, 0];
	      window.cancelAnimationFrame(window.animation);
	      window.animation = undefined;
	      const canvas = document.getElementById('world');
	      // canvas.className = "fade-out"
	      this.newGame(this.player.pos, 1);
	    }
	};
	
	Game.prototype.over = function() {
	  this.ghosts.forEach((ghost) => {
	    if (((this.player.pos[0] > ghost.pos[0] - ghost.radius) &&
	      (this.player.pos[0] < ghost.pos[0] + ghost.radius)) &&
	     ((this.player.pos[1] > ghost.pos[1] - ghost.radius) &&
	      (this.player.pos[1] < ghost.pos[1] + ghost.radius))) {
	        this.gameOver = true
	      }
	    });
	};
	
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);
	const util = new Util();
	
	const COLOR = "#1bac96";
	let RADIUS = 7.5;
	let VEL = [0,0];
	
	function Player(pos, game) {
	  VEL = [0, 0]
	  MovingObject.call(this, pos, VEL, RADIUS, COLOR, game);
	  this.maxVel = 2;
	  this.directing = false
	};
	
	util.inherits(MovingObject, Player)
	
	Player.prototype.direct = function(direction) {
	  this.vel[0] += direction[0];
	  this.vel[1] += direction[1];
	  this.directing = true;
	};
	
	Player.prototype.setMax = function (n) {
	  this.maxVel = n;
	};
	
	Player.prototype.maxSpeed = function (speed = 2) {
	  if (this.vel[0] > speed) {
	    this.vel[0] = speed
	  }
	  if (this.vel[0] < -speed) {
	    this.vel[0] = -speed
	  }
	  if (this.vel[1] > speed) {
	    this.vel[1] = speed
	  }
	  if (this.vel[1] < -speed) {
	    this.vel[1] = -speed
	  }
	};
	
	Player.prototype.decelerate = function () {
	  if (this.vel[0] > 0) {
	    this.vel[0] -= .02
	  } else if (this.vel[0] < 0) {
	    this.vel[0] += .02
	  }
	
	  if (this.vel[1] > 0) {
	    this.vel[1] -= .02
	  } else if (this.vel[1] < 0) {
	    this.vel[1] += .02
	  }
	};
	
	Player.prototype.move = function () {
	  this.prevPos = this.pos;
	  this.bounds(this.pos);
	  this.maxSpeed(this.maxVel);
	
	  this.pos[0] = this.pos[0] + this.vel[0];
	  this.pos[1] = this.pos[1] + this.vel[1];
	  if (this.directing === false) {
	    this.decelerate();
	  }
	  this.directing = false;
	};
	
	
	
	
	module.exports = Player;


/***/ },
/* 4 */
/***/ function(module, exports) {

	function MovingObject(pos, vel, radius, color, game) {
	  this.pos = pos;
	  this.prevPos = pos;
	  this.vel = vel;
	  this.radius = radius;
	  this.color = color;
	  this.game = game;
	}
	
	MovingObject.prototype.draw = function (ctx) {
	
	  ctx.fillStyle = this.color;
	  ctx.beginPath();
	
	  ctx.arc(
	    this.pos[0],
	    this.pos[1],
	    this.radius,
	    0,
	    2 * Math.PI,
	    false
	  );
	
	  ctx.fill();
	};
	
	MovingObject.prototype.move = function () {
	  this.prevPos = this.pos;
	  this.bounds(this.pos);
	  console.log(this.maxSpeed);
	  console.log(this.maxSpeed);
	  if (this.constructor === 'Player') {
	    this.decelerate();
	  }
	
	  this.pos[0] = this.pos[0] + this.vel[0];
	  this.pos[1] = this.pos[1] + this.vel[1];
	};
	
	MovingObject.prototype.decelerate = function () {
	  if (this.vel[0] > 0) {
	    this.vel[0] -= .01
	  } else if (this.vel[0] < 0) {
	    this.vel[0] += .01
	  }
	
	  if (this.vel[1] > 0) {
	    this.vel[1] -= .01
	  } else if (this.vel[1] < 0) {
	    this.vel[1] += .01
	  }
	};
	
	MovingObject.prototype.moveBack = function () {
	  this.pos[0] = this.prevPos[0];
	  this.pos[1] = this.prevPos[1];
	  this.vel[0] = 0;
	  this.vel[1] = 0;
	};
	
	MovingObject.prototype.bounds = function(pos) {
	  let checkOutOfBounds = this.checkOutOfBounds(pos);
	
	  if (checkOutOfBounds){
	    if (checkOutOfBounds["coord"] === "X"){
	
	      if (checkOutOfBounds["low"]){
	        if (this.vel[0] < 0)  {this.vel[0] *= (-.5)}
	      } else {
	        if (this.vel[0] > 0)  {this.vel[0] *= (-.5)}
	      }
	
	    } else if (checkOutOfBounds["coord"] === "Y"){
	
	      if (checkOutOfBounds["low"]){
	        if (this.vel[1] < 0)  {this.vel[1] *= (-.5)}
	      } else {
	        if (this.vel[1] > 0)  {this.vel[1] *= (-.5)}
	      }
	
	    }
	  }
	};
	
	MovingObject.prototype.checkOutOfBounds = function (pos) {
	
	  if ((pos[0]-this.radius) <= 0 ) {
	    return {coord: "X", low: true}
	
	  } else if ((pos[0]+this.radius) >= this.game.dimX) {
	    return {coord: "X", low: false}
	
	  } else if ((pos[1]-this.radius) <= 0) {
	    return {coord: "Y", low: true}
	
	  } else if ((pos[1]+this.radius) >= this.game.dimY) {
	    return {coord: "Y", low: false}
	  }
	};
	
	
	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

	function Util() {}
	
	Util.prototype.inherits = function(Parent, Child) {
	  function Surrogate () {}
	
	  Surrogate.prototype = Parent.prototype;
	  Child.prototype = new Surrogate();
	  Child.prototype.constructor = Child;
	};
	
	Util.prototype.randomPos = function(playerPos, distanceFromPlayer) {
	  const width = window.innerWidth * Math.random();
	  const height = window.innerHeight * Math.random();
	  if ((Math.abs(width - playerPos[0]) < distanceFromPlayer) ||
	      (Math.abs(height - playerPos[1]) < distanceFromPlayer)) {
	    return this.randomPos(playerPos);
	  } else {
	    return [width, height];
	  }
	};
	
	Util.prototype.randomStart = function(windowWidth, windowHeight, weight) {
	  const width = Math.floor(windowWidth/20);
	  const height = Math.floor(windowHeight/20);
	  const board = new Array(height);
	  for (let i = 0; i < board.length; i++) {
	    board[i] = new Array(width);
	  }
	  for (let j = 0; j < board.length; j++) {
	    for (let k = 0; k < board[0].length; k++) {
	      if (Math.random() < weight) {
	        board[j][k] = 1;
	      } else {
	        board[j][k] = 0;
	      }
	    }
	  }
	  return board;
	};
	
	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports) {

	
	function Sight(game, tutorial) {
	  this.game = game;
	  this.tutorial = tutorial;
	  this.opacity = .01;
	}
	
	Sight.prototype.draw = function (ctx) {
	  if (this.tutorial) {
	    ctx.fillStyle = `rgba(0,0,0,${this.opacity})`
	  } else {
	    ctx.fillStyle = 'black';
	  }
	  ctx.beginPath();
	  ctx.moveTo(0,0);
	  ctx.lineTo(0, this.game.dimY);
	  ctx.lineTo(this.game.dimX, this.game.dimY);
	  ctx.lineTo(this.game.dimX, 0);
	  ctx.lineTo(0,0);
	
	  let playerX = this.game.player.pos[0];
	  let playerY = this.game.player.pos[1];
	  let mouseX = this.game.mouse[0];
	  let mouseY = this.game.mouse[1];
	
	  ctx.save();
	  ctx.translate(playerX, playerY);
	  let angle = Math.atan2((playerY - mouseY), playerX - mouseX);
	  ctx.rotate(angle + Math.PI/1.33);
	  ctx.moveTo(-20,-20);
	  ctx.lineTo(400, 160);
	  ctx.lineTo(160, 400);
	  ctx.lineTo(-20,-20);
	  ctx.fill();
	  ctx.restore();
	  if (this.opacity < 1) {
	    this.opacity += 0.00025
	  }
	};
	
	module.exports = Sight;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(5);
	const util = new Util ();
	
	function Exit(game, tutorial, distanceFromPlayer) {
	  this.tutorial = tutorial;
	  this.pos = util.randomPos(game.player.pos, distanceFromPlayer);
	  if ((this.pos[0] > game.dimX - 60) || (this.pos[1] > game.dimY - 60)) {
	    this.pos = util.randomPos(game.player.pos, distanceFromPlayer);
	  }
	}
	
	Exit.prototype.draw = function (ctx) {
	  if (!this.tutorial) {
	    ctx.fillStyle = 'red'
	    ctx.fillRect(this.pos[0], this.pos[1], 60, 60)
	  }
	};
	
	module.exports = Exit;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);
	const util = new Util();
	
	const COLOR = "#ccffff";
	let RADIUS = 20;
	let VEL = [0,0];
	
	function Ghost(pos, game) {
	  VEL = [0, 0]
	  MovingObject.call(this, pos, VEL, RADIUS, COLOR, game);
	  this.opacity = 0;
	  this.flickering = true;
	  this.direction = "increasing";
	};
	
	util.inherits(MovingObject, Ghost)
	
	Ghost.prototype.findPlayer = function () {
	  return player = this.game.player.pos
	};
	
	Ghost.prototype.direct = function() {
	  let player = this.findPlayer();
	  let angle = Math.atan2((player[1] - this.pos[1]), player[0] - this.pos[0]);
	  VEL[0] = Math.cos(angle)/4;
	  VEL[1] = Math.sin(angle)/4;
	};
	
	Ghost.prototype.move = function () {
	  this.direct();
	  this.pos[0] = this.pos[0] + VEL[0];
	  this.pos[1] = this.pos[1] + VEL[1];
	};
	
	Ghost.prototype.flicker = function (ctx, stepping) {
	  let X = this.pos[0];
	  let Y = this.pos[1];
	  let gradient = ctx.createRadialGradient(X, Y, 0, X, Y, 50);
	  gradient.addColorStop(0, `rgba(204,255,255,${this.opacity})`);
	  gradient.addColorStop(1, "rgba(204,255,255,0)");
	  ctx.save();
	  ctx.fillStyle = gradient;
	  ctx.fillRect(0,0,this.game.dimX, this.game.dimY)
	  ctx.restore();
	
	  if (stepping) {
	    this.flickering = true;
	    this.direction = "increasing";
	  }
	  if (this.flickering) {
	    if (this.direction === "increasing") {
	      this.opacity += .01;
	      if (this.opacity >= 1) {
	        this.direction = "decreasing";
	      }
	    } else {
	      this.opacity -= .01;
	      if (this.opacity <= 0) {
	        this.flickering = false;
	      }
	    }
	  }
	};
	
	module.exports = Ghost;


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* Author:
	            Matthew Ruten, 2012
	*/
	
	var GameOfLife = function(params){
	  // User-set params
	  var num_cells_y = params["init_cells"].length,
	      num_cells_x = params["init_cells"][0].length,
	      cell_width  = params["cell_width"]  || 10,
	      cell_height = params["cell_height"] || 10,
	      init_cells  = params["init_cells"]  || [],
	      canvas_id   = params["canvas_id"]   || "life",
	
	      colourful   = params["colourful"] || params["colorful"] || false,
	
	      cell_array = [],
	      display     = new GameDisplay(num_cells_x, num_cells_y, cell_width, cell_height, canvas_id, colourful),
	      interval = null,    // Will store reference to setInterval method -- this should maybe be part of GameDisplay
	      init        = function() {
	        // Convert init_cells array of 0's and 1's to actual Cell objects
	        var length_y = init_cells.length,
	            length_x,
	            y, x;
	        // each row
	        for (y = 0; y < length_y; y++) {
	          length_x = init_cells[y].length;
	          // each column in rows
	          for (x = 0; x < length_x; x++) {
	            var state = (init_cells[y][x] == 1) ? 'alive' : 'dead';
	            init_cells[y][x] = new Cell(x, y, state);
	          }
	        }
	        cell_array = init_cells;
	        display.update(cell_array);
	      },
	      // Function to calculate the next generation of cells, based
	      //  on the rules of the Game of Life
	      nextGenCells = function() {
	        // Implement the Game of Life rules
	        // Simple algorithm:
	        //  - For each cell:
	        //      - Check all of its neighbours
	        //      - Based on the rules, set the next gen cell to alive or dead
	
	        var current_gen = cell_array,
	            next_gen = [],      // New array to hold the next gen cells
	            length_y = cell_array.length,
	            length_x,
	            y, x;
	        // each row
	        for (y = 0; y < length_y; y++) {
	          length_x = current_gen[y].length;
	          next_gen[y] = []; // Init new row
	          // each column in rows
	          for (x = 0; x < length_x; x++) {
	            //var state = (init_cells[y][x] == 1) ? 'alive' : 'dead';
	            var cell = current_gen[y][x];
	            // Calculate above/below/left/right row/column values
	            var row_above = (y-1 >= 0) ? y-1 : length_y-1; // If current cell is on first row, cell "above" is the last row (stitched)
	            var row_below = (y+1 <= length_y-1) ? y+1 : 0; // If current cell is in last row, then cell "below" is the first row
	            var column_left = (x-1 >= 0) ? x-1 : length_x - 1; // If current cell is on first row, then left cell is the last row
	            var column_right = (x+1 <= length_x-1) ? x+1 : 0; // If current cell is on last row, then right cell is in the first row
	
	            var neighbours = {
	              top_left: current_gen[row_above][column_left].clone(),
	              top_center: current_gen[row_above][x].clone(),
	              top_right: current_gen[row_above][column_right].clone(),
	              left: current_gen[y][column_left].clone(),
	              right: current_gen[y][column_right].clone(),
	              bottom_left: current_gen[row_below][column_left].clone(),
	              bottom_center: current_gen[row_below][x].clone(),
	              bottom_right: current_gen[row_below][column_right].clone()
	            };
	
	            var alive_count = 0;
	            var dead_count = 0;
	            for (var neighbour in neighbours) {
	              if (neighbours[neighbour].getState() == "dead") {
	                dead_count++;
	              } else {
	                alive_count++;
	              }
	            }
	
	            // Set new state to current state, but it may change below
	            var new_state = cell.getState();
	            if (cell.getState() == "alive") {
	              if (alive_count < 2 || alive_count > 3) {
	                // new state: dead, overpopulation/ underpopulation
	                new_state = "dead";
	              } else if (alive_count === 2 || alive_count === 3) {
	                // lives on to next generation
	                new_state = "alive";
	              }
	            } else {
	              if (alive_count === 3) {
	                // new state: live, reproduction
	                new_state = "alive";
	              }
	            }
	
	            //console.log("Cell at x,y: " + x + "," + y + " has dead_count: " + dead_count + "and alive_count: " + alive_count);
	
	            next_gen[y][x] = new Cell(x, y, new_state);
	            //console.log(next_gen[y][x]);
	          }
	        }
	        //console.log(next_gen);
	/*
	        next_gen = cell_array;
	        next_gen[0][0].setState("dead");
	        next_gen[0][1].setState("alive");
	        next_gen[1][0].setState("alive");
	        next_gen[1][1].setState("dead");
	*/
	        return next_gen;
	      }
	  ;
	  init();
	  return {
	    // Returns the next generation array of cells
	    step: function(){
	      var next_gen = nextGenCells();
	      // Set next gen as current cell array
	      cell_array = next_gen;
	      //console.log(next_gen);
	      display.update(cell_array);
	    },
	    // Returns the current generation array of cells
	    getCurrentGenCells: function() {
	      return cell_array;
	    },
	    // Add "The" to function name to reduce confusion
	    //  (even though we *could* technically use just setInterval)
	    setTheInterval: function(the_interval) {
	      interval = the_interval;
	    },
	    getInterval: function() {
	      return interval;
	    },
	    render: function() {
	      display.update(this.getCurrentGenCells())
	    }
	  };
	};
	
	// This is an object that will take care of all display-related features.
	// Theoretically, you should be able to use any method of display without
	// too much extra code. i.e. if you want to display the game using HTML tables,
	// svg, or whatever other method you feel like. Just create a new <___>Display
	// Object!
	var GameDisplay = function(num_cells_x, num_cells_y, cell_width, cell_height, canvas_id, colourful) {
	  var canvas = document.getElementById(canvas_id),
	      ctx = canvas.getContext && canvas.getContext('2d'),
	      width_pixels = num_cells_x * cell_width,
	      height_pixels = num_cells_y * cell_height,
	      drawGridLines = function() {
	        ctx.lineWidth = 1;
	        ctx.strokeStyle = "rgba(255, 0, 0, 1)";
	        ctx.beginPath();
	        // foreach column
	        for (var i = 0; i <= num_cells_x; i++) {
	          ctx.moveTo(i*cell_width, 0);
	          ctx.lineTo(i*cell_width, height_pixels);
	        }
	        // foreach row
	        for (var j = 0; j <= num_cells_y; j++) {
	          ctx.moveTo(0, j*cell_height);
	          ctx.lineTo(width_pixels, j*cell_height);
	        }
	        ctx.stroke();
	      },
	      updateCells = function(cell_array) {
	        var length_y = cell_array.length,
	            length_x,
	            y, x;
	        // each row
	        for (y = 0; y < length_y; y++) {
	          length_x = cell_array[y].length;
	          // each column in rows
	          for (x = 0; x < length_x; x++) {
	            // Draw Cell on Canvas
	            drawCell(cell_array[y][x]);
	          }
	        }
	      },
	      drawCell = function(cell) {
	        // find start point (top left)
	        var start_x = cell.getXPos() * cell_width,
	            start_y = cell.getYPos() * cell_height;
	        // draw rect from that point, to bottom right point by adding cell_height/cell_width
	        if (cell.getState() == "alive") {
	          //console.log("it's alive!");
	          if (colourful === true) {
	            var r=Math.floor(Math.random()*20),
	                g=Math.floor(Math.random()*40),
	                b=Math.floor(Math.random()*20),
	                a=(Math.floor(Math.random()*3)+9)/10; // rand between 0.5 and 1.0
	            ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
	          }
	          ctx.fillRect(start_x, start_y, cell_width, cell_height);
	        } else {
	          ctx.clearRect(start_x, start_y, cell_width, cell_height);
	        }
	      },
	      init = function() {
	        //console.log("width_pixels: " + width_pixels);
	        //console.log("height_pixels: " + height_pixels);
	
	        // Resize Canvas
	        canvas.width = width_pixels;
	        canvas.height = height_pixels;
	
	        // No grid lines, for now!
	        //drawGridLines();
	      };
	  init();
	  return {
	    update: function(cell_array) {
	      updateCells(cell_array);
	    }
	  };
	
	
	};
	
	var Cell = function(x_pos, y_pos, state) {
	  //console.log("Creating cell at " + x_pos + "," + y_pos + ", and cell state is: " + state);
	  /*var x_pos = 0,        // X Position of Cell in Grid
	      y_pos = 0,        // Y position of cell in Grid
	      state = "dead",   // Cell state: dead or alive.
	      asdf;*/
	  return {
	    x_pos: x_pos,
	    y_pos: y_pos,
	    state: state,
	    getXPos: function() {
	      return x_pos;
	    },
	    getYPos: function() {
	      return y_pos;
	    },
	    getState: function() {
	      return state;
	    },
	    setState: function(new_state) {
	      state = new_state;
	    },
	    clone: function() {
	      return new Cell(x_pos, y_pos, state);
	    }
	  };
	};
	
	module.exports = GameOfLife;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map