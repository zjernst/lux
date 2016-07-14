function MovingObject(pos, vel, radius, color, game) {
  this.pos = pos;
  this.prevPos = pos;
  this.vel = vel;
  this.radius = radius;
  this.color = color;
  this.game = game;
}

MovingObject.prototype.draw = function (ctx) {
  // ctx.clearRect(this.prevPos[0], this.prevPos[1], this.radius * 2, this.radius * 2)

  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.prevPos = this.pos;
  this.bounds(this.pos);

  if (this.constructor === 'Player') {
    this.decelerate();
  }

  this.pos[0] = this.pos[0] + this.vel[0];
  this.pos[1] = this.pos[1] + this.vel[1];
};

MovingObject.prototype.decelerate = function () {
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

MovingObject.prototype.moveBack = function () {
  this.pos[0] = this.prevPos[0];
  this.pos[1] = this.prevPos[1];
  this.vel[0] = 0;
  this.vel[1] = 0;
};

MovingObject.prototype.bounds = function(pos) {
  let checkOutOfBounds = this.checkOutOfBounds(pos);

  if (checkOutOfBounds){
    if (checkOutOfBounds["coord"] === "X"){

      if (checkOutOfBounds["low"]){
        if (this.vel[0] < 0)  {this.vel[0] *= (-.5)}
      } else {
        if (this.vel[0] > 0)  {this.vel[0] *= (-.5)}
      }

    } else if (checkOutOfBounds["coord"] === "Y"){

      if (checkOutOfBounds["low"]){
        if (this.vel[1] < 0)  {this.vel[1] *= (-.5)}
      } else {
        if (this.vel[1] > 0)  {this.vel[1] *= (-.5)}
      }

    }
  }
};

MovingObject.prototype.checkOutOfBounds = function (pos) {

  if ((pos[0]-this.radius) <= 0 ) {
    return {coord: "X", low: true}

  } else if ((pos[0]+this.radius) >= this.game.dimX) {
    return {coord: "X", low: false}

  } else if ((pos[1]-this.radius) <= 0) {
    return {coord: "Y", low: true}

  } else if ((pos[1]+this.radius) >= this.game.dimY) {
    return {coord: "Y", low: false}
  }
};


module.exports = MovingObject;
