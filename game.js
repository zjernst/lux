const Player = require('./player.js');
const Sight = require('./sight.js');

function Game(maze=4) {
  this.dimY = window.innerHeight;
  this.dimX = window.innerWidth;
  let playerPos = [(this.dimX / 2), (this.dimY / 2)];
  this.mouse = playerPos;
  this.player = new Player(playerPos, this);
  this.maze = maze;
  this.mazeImg = new Image ();
  this.sight = new Sight(this);

  this.allObjects = [this.player];
};

Game.prototype.setup = function(ctx) {
  ctx.clearRect(0, 0, this.dimX, this.dimY);
  this.mazeImg.onload = function () {
    ctx.drawImage(this.mazeImg, 0, 0);
    this.player.draw(ctx);
  }.bind(this)
  this.mazeImg.src = `maps/maze${this.maze}.gif`
  window.addEventListener('mousemove', (e) => {
    this.mouse = [e.clientX, e.clientY]
  });
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.dimX, this.dimY);
  ctx.drawImage(this.mazeImg, 0, 0);
  if (this.hitWall(ctx, this.player)) {
    this.player.moveBack();
  }
  this.player.draw(ctx);
  this.sight.draw(ctx);
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
  let x = player.pos[0] - player.radius;
  let y = player.pos[1] - player.radius;
  const imgData = ctx.getImageData(x, y, player.radius * 2, player.radius * 2);
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
