const MovingObject = require('./MovingObject.js');
const Util = require('./util.js');
const util = new Util();

const COLOR = "#ccffff";
let RADIUS = 20;
let VEL = [0,0];

function Ghost(pos, game) {
  VEL = [0, 0]
  MovingObject.call(this, pos, VEL, RADIUS, COLOR, game);
  this.opacity = 0;
  this.flickering = true;
  this.direction = "increasing";
};

util.inherits(MovingObject, Ghost)

Ghost.prototype.findPlayer = function () {
  return player = this.game.player.pos
};

Ghost.prototype.direct = function() {
  let player = this.findPlayer();
  let angle = Math.atan2((player[1] - this.pos[1]), player[0] - this.pos[0]);
  VEL[0] = Math.cos(angle)/4;
  VEL[1] = Math.sin(angle)/4;
};

Ghost.prototype.move = function () {
  this.direct();
  this.pos[0] = this.pos[0] + VEL[0];
  this.pos[1] = this.pos[1] + VEL[1];
};

Ghost.prototype.flicker = function (ctx, stepping) {
  let X = this.pos[0];
  let Y = this.pos[1];
  let gradient = ctx.createRadialGradient(X, Y, 0, X, Y, 50);
  gradient.addColorStop(0, `rgba(204,255,255,${this.opacity})`);
  gradient.addColorStop(1, "rgba(204,255,255,0)");
  ctx.save();
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,this.game.dimX, this.game.dimY)
  ctx.restore();

  if (stepping) {
    this.flickering = true;
    this.direction = "increasing";
  }
  if (this.flickering) {
    if (this.direction === "increasing") {
      this.opacity += .01;
      if (this.opacity >= 1) {
        this.direction = "decreasing";
      }
    } else {
      this.opacity -= .01;
      if (this.opacity <= 0) {
        this.flickering = false;
      }
    }
  }
};

module.exports = Ghost;
