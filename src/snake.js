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
    {x: 3, y: 3},
    {x: 2, y: 3},
    {x: 1, y: 3}
  ];

  this.update = function() {
    this.body.pop();
    var pos = {x: this.body[0].x, y: this.body[0].y};
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
    this.body.unshift({
      x: this.body[0].x,
      y: this.body[0].y
    });
  };

  this.getLength = function() {
    return this.body.length + 1;
  };
};
