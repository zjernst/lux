const MovingObject = require('./MovingObject.js');
const Util = require('./util.js');
const util = new Util();

const COLOR = "#ccffff";
let RADIUS = 20;
let VEL = [0,0];

function Ghost(pos, game) {
  MovingObject.call(this, pos, VEL, RADIUS, COLOR, game);
};

util.inherits(MovingObject, Ghost)

Ghost.prototype.findPlayer = function () {
  return player = this.game.player.pos
};

Ghost.prototype.direct = function() {
  let player = this.findPlayer();
  console.log(player)
  let angle = Math.atan2((player[1] - this.pos[1]), player[0] - this.pos[0]);
  VEL[0] = Math.cos(angle)/2;
  VEL[1] = Math.sin(angle)/2;
};

Ghost.prototype.move = function () {
  this.direct();
  this.pos[0] = this.pos[0] + VEL[0];
  this.pos[1] = this.pos[1] + VEL[1];
};

module.exports = Ghost;
