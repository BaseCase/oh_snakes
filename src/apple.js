exports.Apple = function(boardWidth, boardHeight) {
  this.position = {
    x: Math.floor((Math.random() * boardWidth)),
    y: Math.floor((Math.random() * boardHeight))
  };

  this.getPosition = function() {
    return this.position;
  };
};

