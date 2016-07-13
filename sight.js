
function Sight(game, length) {
  this.game = game;
}

Sight.prototype.draw = function (ctx) {
  let playerX = this.game.player.pos[0];
  let playerY = this.game.player.pos[1];
  let mouseX = this.game.mouse[0];
  let mouseY = this.game.mouse[1];

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

module.exports = Sight;
