const Player = require('./player.js');

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
