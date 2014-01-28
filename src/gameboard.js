var Snake = require('./snake').Snake;
var Apple = require('./apple').Apple;


exports.GameBoard = function(boardWidth, boardHeight) {
  this.snake = new Snake();
  this.apple = new Apple(boardWidth, boardHeight);
  this.score = 0;
  this.level = 1;

  this.update = function() {
    this.maybeEatApple();
    this.snake.update();
    this.checkForDeath();
  };

  this.maybeEatApple = function() {
    if (this.collides(this.snake, this.apple)) {
      this.apple = new Apple(boardWidth, boardHeight);
      this.snake.eat();
      this.score++;
      if (this.score % 5 === 0) this.level++;
    }
  };

  this.collides = function(thing1, thing2) {
    return thing1.getPosition().x === thing2.getPosition().x &&
           thing1.getPosition().y === thing2.getPosition().y;
  };

  this.checkForDeath = function() {
    if (this.checkForWallHit() || this.checkForSelfHit()) {
      this.snake = new Snake();
    }
  };

  this.checkForWallHit = function() {
    var x = this.snake.body[0].x;
    var y = this.snake.body[0].y;
    return (x < 0 || x >= boardWidth ||
            y < 0 || y >= boardHeight)
  };

  this.checkForSelfHit = function() {
    var head = this.snake.body[0];
    return this.hasMatchingCell(head, this.snake.body.slice(1));
  };

  this.hasMatchingCell = function(cell, list) {
    if (!list.length) return false;
    return (cell.x === list[0].x && cell.y === list[0].y) ||
           this.hasMatchingCell(cell, list.slice(1));
  };
};

