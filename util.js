function Util() {}

Util.prototype.inherits = function(Parent, Child) {
  function Surrogate () {}

  Surrogate.prototype = Parent.prototype;
  Child.prototype = new Surrogate();
  Child.prototype.constructor = Child;
};

module.exports = Util;
