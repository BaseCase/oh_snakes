var expect = require('chai').expect;
var sinon = require('sinon');

var Snake = require('./snaeks').Snake;


describe("turning", function() {
  it('always has a direction', function() {
    var snake = new Snake;
    expect(snake.direction).not.to.be.undefined;
  });

  it('turns in directions you tell it', function() {
    var snake = new Snake;
    snake.direction = 'up';
    snake.turn('left');
    expect(snake.direction).to.equal('left');
  });

  it('can only go left, right, up, or down', function() {
    var snake = new Snake;
    snake.direction = 'down';
    snake.turn('southwest');
    expect(snake.direction).to.equal('down');
  });

  it('can only turn at right angles', function() {
    var snake = new Snake;
    snake.direction = 'right';
    snake.turn('left');
    expect(snake.direction).to.equal('right');
  });
});


describe("moving", function() {
  it('moves one cell in current direction on update', function() {
    var snake = new Snake;
    snake.direction = 'right';
    var init_x = snake.position.x;
    snake.update();
    expect(snake.position.x).to.equal(init_x + 1);
    snake.direction = 'down';
    var init_y = snake.position.y;
    snake.update();
    expect(snake.position.y).to.equal(init_y + 1);
  });
});

