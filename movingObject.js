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
  this.prevPos = this.pos
  this.pos[0] = this.pos[0] + this.vel[0];
  this.pos[1] = this.pos[1] + this.vel[1];
};

MovingObject.prototype.moveBack = function () {
  this.pos[0] = this.prevPos[0];
  this.pos[1] = this.prevPos[1];
  this.vel[0] = 0;
  this.vel[1] = 0;
}

module.exports = MovingObject;
