function Exit(game) {
  this.pos = [Math.random()*game.dimX, Math.random()*game.dimY]
}

Exit.prototype.draw = function (ctx) {
  ctx.fillStyle = 'red'
  ctx.fillRect(this.pos[0], this.pos[1], 40, 40)
};

module.exports = Exit;
