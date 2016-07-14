const MovingObject = require('./MovingObject.js');
const Util = require('./util.js');
const util = new Util();

const COLOR = "#3e0013";
let RADIUS = 7.5;
let VEL = [0,0];

function Player(pos, game) {
  console.log(VEL)
  VEL = [0, 0]
  MovingObject.call(this, pos, VEL, RADIUS, COLOR, game);
  this.maxVel = 2;
  this.directing = false
};

util.inherits(MovingObject, Player)

Player.prototype.direct = function(direction) {
  this.vel[0] += direction[0];
  this.vel[1] += direction[1];
  this.directing = true;
};

Player.prototype.setMax = function (n) {
  this.maxVel = n;
};

Player.prototype.maxSpeed = function (speed = 2) {
  if (this.vel[0] > speed) {
    this.vel[0] = speed
  }
  if (this.vel[0] < -speed) {
    this.vel[0] = -speed
  }
  if (this.vel[1] > speed) {
    this.vel[1] = speed
  }
  if (this.vel[1] < -speed) {
    this.vel[1] = -speed
  }
};

Player.prototype.decelerate = function () {
  if (this.vel[0] > 0) {
    this.vel[0] -= .01
  } else if (this.vel[0] < 0) {
    this.vel[0] += .01
  }

  if (this.vel[1] > 0) {
    this.vel[1] -= .01
  } else if (this.vel[1] < 0) {
    this.vel[1] += .01
  }
};

Player.prototype.move = function () {
  this.prevPos = this.pos;
  this.bounds(this.pos);
  this.maxSpeed(this.maxVel);

  this.pos[0] = this.pos[0] + this.vel[0];
  this.pos[1] = this.pos[1] + this.vel[1];
  if (this.directing === false) {
    this.decelerate();
  }
  this.directing = false;
};




module.exports = Player;
