function Util() {}

Util.prototype.inherits = function(Parent, Child) {
  function Surrogate () {}

  Surrogate.prototype = Parent.prototype;
  Child.prototype = new Surrogate();
  Child.prototype.constructor = Child;
};

Util.prototype.randomStart = function(size, weight) {
  const board = new Array(size);
  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(size);
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
