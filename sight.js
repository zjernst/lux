
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
    this.opacity += 0.00015
  }
};

module.exports = Sight;
