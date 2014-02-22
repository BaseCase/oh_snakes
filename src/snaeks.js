var GameBoard = require('./gameboard').GameBoard;


exports.snaeks = function(window, document) {
  var KEYMAP = {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down'
  };

  var ROTATION_MAP = {
    'left': 0,
    'right': Math.PI,
    'up': Math.PI / 2,
    'down': Math.PI * 1.5
  };

  var BLOCK_SIZE = 20;
  var speed = 500;
  var ctx = document.getElementById('gameboard').getContext('2d');
  var gameBoard = new GameBoard(ctx.canvas.width / BLOCK_SIZE, ctx.canvas.height / BLOCK_SIZE);

  function updateGame() {
    clearBoard();
    var curLevel = gameBoard.level;
    gameBoard.update();
    adjustLevel(curLevel);
    drawSnake();
    drawApple();
    drawScoreBoard();
    setTimeout(updateGame, speed);
  }

  function adjustLevel(curLevel) {
    if (curLevel < gameBoard.level) {
      speed -= 100;
    }
  }

  function clearBoard() {
    ctx.fillStyle = "rgb(20,20,20)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function drawSnake() {
    drawSnakeHead();
    drawSnakeBody();
    drawSnakeTail();
  }

  function drawSnakeHead() {
    this.snake_head_img = this.snake_head_img || document.getElementById('snake-head-img');
    var head = gameBoard.snake.getPosition();
    drawWithRotation(this.snake_head_img, head);
  }

  function drawSnakeBody() {
    this.snake_body_img = this.snake_body_img || document.getElementById('snake-body-img');
    gameBoard.snake.body.slice(1, gameBoard.snake.body.length-1).forEach(function(cell) {
      drawWithRotation(this.snake_body_img, cell);
    });
  }

  function drawSnakeTail() {
    this.snake_tail_img = this.snake_tail_img || document.getElementById('snake-tail-img');
    var tail = gameBoard.snake.body[gameBoard.snake.body.length-1];
    drawWithRotation(this.snake_tail_img, tail);
  }

  function drawWithRotation(img, pos) {
    var halfBlock = Math.floor(BLOCK_SIZE / 2);
    ctx.save();
    // position the origin at the center of the image
    ctx.translate((pos.x * BLOCK_SIZE) + halfBlock, (pos.y * BLOCK_SIZE) + halfBlock);
    // rotate the appropriate amount
    ctx.rotate(ROTATION_MAP[pos.direction]);
    // draw the image (remember we repositioned the origin)
    ctx.drawImage(img, -halfBlock, -halfBlock);
    // go back to the board arrangement we had before
    ctx.restore();
  }

  function drawApple() {
    this.apple_img = this.apple_img || document.getElementById('apple-img');
    ctx.drawImage(this.apple_img, gameBoard.apple.getPosition().x * BLOCK_SIZE, gameBoard.apple.getPosition().y * BLOCK_SIZE);
  }

  function handleKeydown(e) {
    e.preventDefault();
    var dir = KEYMAP[e.which];
    gameBoard.snake.turn(dir);
  }

  function drawScoreBoard() {
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("Score: " + gameBoard.score + "      Level: " + gameBoard.level,
                   10, 10);
  }

  window.onkeydown = handleKeydown;
  updateGame();
};

