const MovingObject = require('./MovingObject.js');
const Util = require('./util.js');
const util = new Util();

const COLOR = "#3e0013";
let RADIUS = 7.5;
let VEL = [0,0];

function Player(pos, game) {
  MovingObject.call(this, pos, VEL, RADIUS, COLOR, game);
};

util.inherits(MovingObject, Player)

Player.prototype.direct = function(direction) {
  this.vel[0] += direction[0];
  this.vel[1] += direction[1];
};




module.exports = Player;
