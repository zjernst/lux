
function Sight(game) {
  this.game = game;
}

Sight.prototype.draw = function (ctx) {
  ctx.fillStyle = 'black';
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
  ctx.moveTo(0,0);
  ctx.lineTo(300, 100);
  ctx.lineTo(100, 300);
  ctx.lineTo(0,0);
  ctx.fill();
  ctx.restore();
};

module.exports = Sight;
