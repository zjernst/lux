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
	// const mazeWidth = 482;
	// const mazeHeight = 482;
	
	const canvasEl = document.getElementById("world");
	
	
	canvasEl.height = window.innerHeight;
	canvasEl.width = window.innerWidth;
	
	const ctx = canvasEl.getContext('2d');
	const gameView = new GameView(canvasEl.height, canvasEl.width, ctx);
	
	const el = document.getElementsByTagName('body')[0];
	
	gameView.start(ctx);
	
	
	
	//
	// canvasEl.height = window.innerHeight;
	// canvasEl.width = window.innerWidth;
	//
	// const img = new Image();
	// img.src = "maze.gif";
	//
	// ctx.drawImage(img, 0, 0);
	// const gameView = new GameView(canvasEl.width, canvasEl.height);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);
	const Player = window.Player = __webpack_require__(3);
	
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(3);
	
	function Game(dimX, dimY, maze=4) {
	  this.dimY = dimY;
	  this.dimX = dimX;
	  let playerPos = [(dimX / 2), (dimY / 2)];
	  this.player = new Player(playerPos, this);
	  this.maze = maze;
	  this.mazeImg = new Image ();
	
	  this.allObjects = [this.player];
	};
	
	Game.prototype.setup = function(ctx) {
	  ctx.clearRect(0, 0, this.dimX, this.dimY);
	  this.mazeImg.onload = function () {
	    ctx.drawImage(this.mazeImg, 0, 0);
	    this.player.draw(ctx);
	  }.bind(this)
	  // this.mazeImg.crossOrigin = "Anonymous";
	  // this.mazeImg.src = `maps/maze${this.maze}.gif`
	  const url = `https://www.dropbox.com/s/5dzok4xaflu1a6g/maze4.gif?dl=0`;
	  this.mazeImg.src = url + '?' + new Date().getTime();
	  this.mazeImg.setAttribute('crossOrigin', '');
	};
	
	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.dimX, this.dimY);
	  ctx.drawImage(this.mazeImg, 0, 0);
	  // if (this.hitWall(ctx, this.player)) {
	  //   this.player.moveBack();
	  // }
	  this.player.draw(ctx);
	};
	
	Game.prototype.moveObjects = function () {
	  this.allObjects.forEach((object) => {
	    object.move();
	  });
	};
	
	Game.prototype.step = function () {
	  this.moveObjects();
	};
	
	Game.prototype.hitWall = function (ctx, player) {
	  const imgData = ctx.getImageData(player.pos[0], player.pos[1],
	                                        player.radius * 2, player.radius * 2);
	  const pix = imgData.data;
	  for (let i = 0; i < pix.length; i++) {
	    if (pix[i] === 0) {
	      return true
	    }
	  }
	  return false
	};
	
	// function drawMaze() {
	//   // makeWhite(0, 0, canvas.width, canvas.height);
	//   const mazeImg = new Image ();
	//   mazeImg.onload = function () {
	//     ctx.drawImage(mazeImg, 0, 0);
	//   };
	//   let maze = 4
	//   mazeImg.src = `./maps/maze${maze}.gif`;
	// }
	
	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);
	const util = new Util();
	
	const COLOR = "#3e0013";
	let RADIUS = 7.5;
	let VEL = [0,0];
	
	function Player(pos, game) {
	  MovingObject.call(this, pos, VEL, RADIUS, COLOR, game);
	};
	
	util.inherits(MovingObject, Player)
	
	Player.prototype.direct = function(direction) {
	  this.vel[0] += direction[0];
	  this.vel[1] += direction[1];
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
	  // ctx.clearRect(this.prevPos[0], this.prevPos[1], this.radius * 2, this.radius * 2)
	
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
	  this.prevPos = this.pos
	  this.pos[0] = this.pos[0] + this.vel[0];
	  this.pos[1] = this.pos[1] + this.vel[1];
	};
	
	MovingObject.prototype.moveBack = function () {
	  this.pos[0] = this.prevPos[0];
	  this.pos[1] = this.prevPos[1];
	  this.vel[0] = 0;
	  this.vel[1] = 0;
	}
	
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
	
	module.exports = Util;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map