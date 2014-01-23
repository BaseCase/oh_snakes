if (typeof exports === 'undefined') var exports = window;


exports.snaeks = function(window, document) {
  var board = document.getElementById('gameboard').getContext('2d');
  var gameBoard = new GameBoard(board.canvas.width / 20, board.canvas.height / 20);
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
    gameBoard.update();
    drawSnake();
    drawApple();
  }

  function clearBoard() {
    board.fillStyle = "rgb(0,0,0)";
    board.fillRect(0, 0, board.canvas.width, board.canvas.height);
  }

  function drawSnake() {
    board.fillStyle = "rgb(0,255,0)";
    [gameBoard.snake.position].concat(gameBoard.snake.tail).forEach(function(cell) {
      board.fillRect(cell.x * 20, cell.y * 20, 20, 20);
    });
  }

  function drawApple() {
    board.fillStyle = "rgb(255,0,0)";
    board.fillRect(gameBoard.apple.position.x * 20, gameBoard.apple.position.y * 20, 20, 20);
  }

  function handleKeydown(e) {
    var dir = keyMap[e.which];
    gameBoard.snake.turn(dir);
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
  this.position = {x: 3, y: 3};

  this.tail = [
    {x: 2, y: 3},
    {x: 1, y: 3}
  ];

  this.update = function() {
    this.tail.pop();
    this.tail.unshift({x: this.position.x, y: this.position.y});
    switch(this.direction) {
      case LEFT:
        this.position.x--;
        break;
      case RIGHT:
        this.position.x++;
        break;
      case UP:
        this.position.y--;
        break;
      case DOWN:
        this.position.y++;
        break;
    }
  };

  this.turn = function(newDirection) {
    if (ALL_DIRECTIONS.indexOf(newDirection) < 0 ||
        VERTICAL.indexOf(this.direction)+1 && VERTICAL.indexOf(newDirection)+1 ||
        HORIZONTAL.indexOf(this.direction)+1 && HORIZONTAL.indexOf(newDirection)+1) return;
    this.direction = newDirection;
  };

  this.eat = function() {
    this.tail.unshift({
      x: this.position.x,
      y: this.position.y
    });
  };

  this.getLength = function() {
    return this.tail.length + 1;
  };
};


exports.Apple = function(boardWidth, boardHeight) {
  this.position = {
    x: Math.floor((Math.random() * boardWidth)),
    y: Math.floor((Math.random() * boardHeight))
  };
};


exports.GameBoard = function(boardWidth, boardHeight) {
  this.snake = new exports.Snake();
  this.apple = new exports.Apple(boardWidth, boardHeight);

  this.update = function() {
    this.maybeEatApple();
    this.snake.update();
  };

  this.maybeEatApple = function() {
    if (this.collides(this.snake, this.apple)) {
      this.apple = new exports.Apple(boardWidth, boardHeight);
      this.snake.eat();
    }
  };

  this.collides = function(thing1, thing2) {
    return thing1.position.x === thing2.position.x &&
           thing1.position.y === thing2.position.y;
  };
};

