if (typeof exports === 'undefined') var exports = window;


exports.snaeks = function(window, document) {
  var board = document.getElementById('gameboard').getContext('2d');
  var snake = new Snake;
  var keyMap = {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down'
  };

  setInterval(updateGame, 500);
  window.onkeydown = handleKeydown;

  function updateGame() {
    clearBoard();
    snake.update();
    drawSnake();
  }

  function clearBoard() {
    board.fillStyle = "rgb(0,0,0)";
    board.fillRect(0, 0, board.canvas.width, board.canvas.height);
  }

  function drawSnake() {
    board.fillStyle = "rgb(0,255,0)";
    board.fillRect(snake.position.x * 20, snake.position.y * 20, 20, 20);
  }

  function handleKeydown(e) {
    var dir = keyMap[e.which];
    snake.turn(dir);
  }
};


exports.Snake = function() {
  var LEFT = 'left';
  var RIGHT = 'right';
  var UP = 'up';
  var DOWN = 'down';
  var ALL_DIRECTIONS = [LEFT, RIGHT, UP, DOWN];
  var VERTICAL = [UP, DOWN];
  var HORIZONTAL = [LEFT, RIGHT];

  this.direction = RIGHT;
  this.position = {
    x: 3,
    y: 3
  };

  this.update = function() {
    switch(this.direction) {
      case LEFT:  this.position.x--; break;
      case RIGHT: this.position.x++; break;
      case UP:    this.position.y--; break;
      case DOWN:  this.position.y++; break;
    }
  };

  this.turn = function(newDirection) {
    if (ALL_DIRECTIONS.indexOf(newDirection) < 0 ||
        VERTICAL.indexOf(this.direction)+1 && VERTICAL.indexOf(newDirection)+1 ||
        HORIZONTAL.indexOf(this.direction)+1 && HORIZONTAL.indexOf(newDirection)+1) return;
    this.direction = newDirection;
  };
};

