const Player = require('./player.js');
// const Sight = require('./sight.js');

function Game(dimX, dimY, maze=4) {
  this.dimY = dimY;
  this.dimX = dimX;
  let playerPos = [(dimX / 2), (dimY / 2)];
  this.mouse = playerPos;
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
  this.sight(ctx);
};

Game.prototype.sight = function (ctx) {
  let playerX = this.player.pos[0];
  let playerY = this.player.pos[1];
  let mouseX = this.mouse[0];
  let mouseY = this.mouse[1];

  ctx.beginPath();
  ctx.save();
  ctx.translate(playerX, playerY);
  let angle = Math.atan2((playerY - mouseY), playerX - mouseX);
  ctx.rotate(angle + Math.PI/1.33);
  ctx.moveTo(0,0);
  ctx.lineTo(200, 100);
  ctx.lineTo(100, 200);
  ctx.fill();
  ctx.restore();
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
