var expect = require('chai').expect;
var sinon = require('sinon');

var GameBoard = require('../src/gameboard').GameBoard;


describe("GameBoard", function() {
  it("keeps the same Apple if the Snake didn't eat it", function() {
    var board = new GameBoard();
    board.apple.position = {x:20, y:20};
    var originalApple = board.apple;
    board.update();
    expect(board.apple).to.equal(originalApple);
  });

  it("gets a new Apple after the snake eats it", function() {
    var board = new GameBoard();
    board.snake.body[0] = {x:1, y:1};
    board.apple.position = {x:1, y:1};
    var originalApple = board.apple;
    board.update();
    expect(board.apple).not.to.equal(originalApple);
  });

  it("makes the snake eat the apple if they collide", function() {
    var board = new GameBoard();
    board.snake.body[0] = {x:1, y:1};
    board.apple.position = {x:1, y:1};
    var snakeEat = sinon.spy(board.snake, 'eat');
    board.update();
    expect(snakeEat.called).to.be.true;
  });

  it("kills the snake if it hits a wall", function() {
    var board = new GameBoard();
    var snake = board.snake;
    snake.body[0] = {x:0, y:1};
    snake.direction = 'left';
    board.update();
    expect(snake).not.to.equal(board.snake);
  });

  it("kills the snake if its head hits its tail", function() {
    var board = new GameBoard();
    var snake = board.snake;
    var head = snake.body[0];
    head.x = snake.body[2].x;
    head.y = snake.body[2].y;
    board.update();
    expect(snake).not.to.equal(board.snake);
  });

  xit("won't let an Apple spawn on top of the snake");
});
