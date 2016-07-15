const Util = require('./util');
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
