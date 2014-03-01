exports.Snake = function() {
  var LEFT = 'left';
  var RIGHT = 'right';
  var UP = 'up';
  var DOWN = 'down';
  var ALL_DIRECTIONS = [LEFT, RIGHT, UP, DOWN];
  var VERTICAL = [UP, DOWN];
  var HORIZONTAL = [LEFT, RIGHT];

  this.direction = RIGHT;

  this.getPosition = function() {
    return this.body[0];
  };

  this.body = [
    {x: 3, y: 3, direction: RIGHT},
    {x: 2, y: 3, direction: RIGHT},
    {x: 1, y: 3, direction: RIGHT}
  ];

  this.update = function() {
    this.grow();

    var pos = {
      x: this.body[0].x,
      y: this.body[0].y,
      direction: this.direction
    };

    switch(this.direction) {
      case LEFT:
        pos.x--;
        break;
      case RIGHT:
        pos.x++;
        break;
      case UP:
        pos.y--;
        break;
      case DOWN:
        pos.y++;
        break;
    }
    this.body.unshift(pos);
  };

  this.turn = function(newDirection) {
    if (ALL_DIRECTIONS.indexOf(newDirection) < 0 ||
        VERTICAL.indexOf(this.direction)+1 && VERTICAL.indexOf(newDirection)+1 ||
        HORIZONTAL.indexOf(this.direction)+1 && HORIZONTAL.indexOf(newDirection)+1) return;
    this.direction = newDirection;
  };

  this.eat = function() {
    this.justAte = true;
  };

  this.grow = function() {
    if (!this.justAte) {
      this.body.pop();
    } else {
      this.justAte = false;
    }
  }

  this.isOnMe = function(thing) {
    var pos = thing.getPosition();
    return this.body.reduce(function(acc, cell) {
      return acc || (pos.x == cell.x && pos.y == cell.y);
    }, false);
  };

  this.getLength = function() {
    return this.body.length + 1;
  };
};
