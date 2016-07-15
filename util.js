function Util() {}

Util.prototype.inherits = function(Parent, Child) {
  function Surrogate () {}

  Surrogate.prototype = Parent.prototype;
  Child.prototype = new Surrogate();
  Child.prototype.constructor = Child;
};

Util.prototype.randomPos = function(playerPos, distanceFromPlayer) {
  const width = window.innerWidth * Math.random();
  const height = window.innerHeight * Math.random();
  if ((Math.abs(width - playerPos[0]) < distanceFromPlayer) ||
      (Math.abs(height - playerPos[1]) < distanceFromPlayer)) {
    return this.randomPos(playerPos);
  } else {
    return [width, height];
  }
};

Util.prototype.randomStart = function(windowWidth, windowHeight, weight) {
  const width = Math.floor(windowWidth/20);
  const height = Math.floor(windowHeight/20);
  const board = new Array(height);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(width);
  }
  for (let j = 0; j < board.length; j++) {
    for (let k = 0; k < board[0].length; k++) {
      if (Math.random() < weight) {
        board[j][k] = 1;
      } else {
        board[j][k] = 0;
      }
    }
  }
  return board;
};

module.exports = Util;
