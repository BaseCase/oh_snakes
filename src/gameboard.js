var Snake = require('./snake').Snake;
var Apple = require('./apple').Apple;


exports.GameBoard = function(boardWidth, boardHeight) {
  this.snake = new Snake();
  this.score = 0;
  this.level = 1;

  this.update = function() {
    this.snake.update();
    this.maybeEatApple();
    this.checkForDeath();
  };

  this.getANewApple = function() {
    this.apple = new Apple(boardWidth, boardHeight);
    while (this.snake.isOnMe(this.apple)) {
      this.apple = new Apple(boardWidth, boardHeight);
    }
  };

  this.maybeEatApple = function() {
    if (this.snake.isOnMe(this.apple)) {
      this.getANewApple();
      this.snake.eat();
      this.score++;
      if (this.score % 5 === 0) this.level++;
    }
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
    // wow wtf is this doing on GameBoard. some gross duplication
    // here with Snake.isOnMe :( :( :(
    var head = this.snake.getPosition();
    return this.snake.body.slice(1).reduce(function(acc, cell) {
      return acc || (head.x == cell.x && head.y == cell.y);
    }, false);
  };

  this.getANewApple();
};
