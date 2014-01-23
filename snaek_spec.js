var expect = require('chai').expect;
var sinon = require('sinon');

var Snake = require('./snaeks').Snake;
var Apple = require('./snaeks').Apple;
var GameBoard = require('./snaeks').GameBoard;


describe("Snake", function() {
  it("always has a direction", function() {
    var snake = new Snake();
    expect(snake.direction).not.to.be.undefined;
  });

  it("turns in directions you tell it", function() {
    var snake = new Snake();
    snake.direction = 'up';
    snake.turn('left');
    expect(snake.direction).to.equal('left');
  });

  it("can only go left, right, up, or down", function() {
    var snake = new Snake();
    snake.direction = 'down';
    snake.turn('southwest');
    expect(snake.direction).to.equal('down');
  });

  it("can only turn at right angles", function() {
    var snake = new Snake();
    snake.direction = 'right';
    snake.turn('left');
    expect(snake.direction).to.equal('right');
  });

  it("moves one cell in current direction on update", function() {
    var snake = new Snake();
    snake.direction = 'right';
    var init_x = snake.position.x;
    snake.update();
    expect(snake.position.x).to.equal(init_x + 1);
    snake.direction = 'down';
    var init_y = snake.position.y;
    snake.update();
    expect(snake.position.y).to.equal(init_y + 1);
  });

  it("grows when it eats", function() {
    var snake = new Snake();
    var len = snake.getLength();
    snake.eat();
    expect(snake.getLength()).to.equal(len + 1);
  });

  xit("no specs for the tail? that seems like an oversight...");
});


describe("Apple", function() {
  it("appears in a random place on the board", function() {
    sinon.stub(Math, 'random', function rand() {
      rand.num = rand.num || 0.0;
      return rand.num += 0.1;
    });
    var a1 = new Apple(10, 10);
    var a2 = new Apple(10, 10);
    expect(a1.position.x).to.be.lessThan(a2.position.x);
  });
});


describe("GameBoard", function() {
  it("keeps the same Apple if the Snake didn't eat it", function() {
    var board = new GameBoard();
    board.snake.position = {x:1, y:1};
    board.apple.position = {x:2, y:2};
    var originalApple = board.apple;
    board.update();
    expect(board.apple).to.equal(originalApple);
  });

  it("gets a new Apple after the snake eats it", function() {
    var board = new GameBoard();
    board.snake.position = {x:1, y:1};
    board.apple.position = {x:1, y:1};
    var originalApple = board.apple;
    board.update();
    expect(board.apple).not.to.equal(originalApple);
  });

  it("makes the snake eat the apple if they collide", function() {
    var board = new GameBoard();
    board.snake.position = {x:1, y:1};
    board.apple.position = {x:1, y:1};
    var snakeEat = sinon.spy(board.snake, 'eat');
    board.update();
    expect(snakeEat.called).to.be.true;
  });
});

