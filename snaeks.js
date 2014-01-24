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
    gameBoard.snake.body.forEach(function(cell) {
      board.fillRect(cell.x * 20, cell.y * 20, 20, 20);
    });
  }

  function drawApple() {
    board.fillStyle = "rgb(255,0,0)";
    board.fillRect(gameBoard.apple.getPosition().x * 20, gameBoard.apple.getPosition().y * 20, 20, 20);
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


exports.Apple = function(boardWidth, boardHeight) {
  this.position = {
    x: Math.floor((Math.random() * boardWidth)),
    y: Math.floor((Math.random() * boardHeight))
  };

  this.getPosition = function() {
    return this.position;
  };
};


exports.GameBoard = function(boardWidth, boardHeight) {
  this.snake = new exports.Snake();
  this.apple = new exports.Apple(boardWidth, boardHeight);

  this.update = function() {
    this.maybeEatApple();
    this.snake.update();
    this.checkForDeath();
  };

  this.maybeEatApple = function() {
    if (this.collides(this.snake, this.apple)) {
      this.apple = new exports.Apple(boardWidth, boardHeight);
      this.snake.eat();
    }
  };

  this.collides = function(thing1, thing2) {
    return thing1.getPosition().x === thing2.getPosition().x &&
           thing1.getPosition().y === thing2.getPosition().y;
  };

  this.checkForDeath = function() {
    if (this.checkForWallHit() || this.checkForSelfHit()) {
      this.snake = new exports.Snake();
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

