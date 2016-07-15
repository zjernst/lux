function Exit(game, tutorial) {
  this.tutorial = tutorial;
  this.pos = [Math.random()*(game.dimX-60), Math.random()*(game.dimY-60)];
}

Exit.prototype.draw = function (ctx) {
  if (!this.tutorial) {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.pos[0], this.pos[1], 60, 60)
  }
};

module.exports = Exit;
