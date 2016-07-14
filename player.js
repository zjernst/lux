const MovingObject = require('./MovingObject.js');
const Util = require('./util.js');
const util = new Util();

const COLOR = "#3e0013";
let RADIUS = 7.5;
let VEL = [0,0];

function Player(pos, game) {
  console.log(VEL)
  VEL = [0, 0]
  console.log(VEL)
  MovingObject.call(this, pos, VEL, RADIUS, COLOR, game);
};

util.inherits(MovingObject, Player)

Player.prototype.direct = function(direction) {
  this.vel[0] += direction[0];
  this.vel[1] += direction[1];
  this.maxSpeed();
};

Player.prototype.maxSpeed = function () {
  if (this.vel[0] > 2) {
    this.vel[0] = 2
  }
  if (this.vel[0] < -2) {
    this.vel[0] = -2
  }
  if (this.vel[1] > 2) {
    this.vel[1] = 2
  }
  if (this.vel[1] < -2) {
    this.vel[1] = -2
  }
};




module.exports = Player;
