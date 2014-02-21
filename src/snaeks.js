var GameBoard = require('./gameboard').GameBoard;


exports.snaeks = function(window, document) {
  var board = document.getElementById('gameboard').getContext('2d');
  var gameBoard = new GameBoard(board.canvas.width / 20, board.canvas.height / 20);
  var speed = 500;
  var keyMap = {
    '37': 'left',
    '38': 'up',
    '39': 'right',
    '40': 'down'
  };
  window.onkeydown = handleKeydown;

  function updateGame() {
    var curLevel = gameBoard.level;
    clearBoard();
    gameBoard.update();
    /****
    if (curLevel < gameBoard.level) {
      speed -= 100;
    }
    ***/
    if (gameBoard.score == 2) {
      speed = 0;
    } else {
      speed = 400;
    }
    drawSnake();
    drawApple();
    drawScoreBoard();
    setTimeout(updateGame, speed);
  }

  function clearBoard() {
    board.fillStyle = "rgb(0,0,0)";
    board.fillRect(0, 0, board.canvas.width, board.canvas.height);
  }

  function drawSnake() {
    this.snake_head_img = this.snake_head_img || document.getElementById('snake-head-img');
    this.snake_body_img = this.snake_body_img || document.getElementById('snake-body-img');
    this.snake_tail_img = this.snake_tail_img || document.getElementById('snake-tail-img');

    var head = gameBoard.snake.getPosition();
    drawWithRotation(this.snake_head_img, head);

    gameBoard.snake.body.slice(1, gameBoard.snake.body.length-1).forEach(function(cell) {
      drawWithRotation(this.snake_body_img, cell);
    });

    var tail = gameBoard.snake.body[gameBoard.snake.body.length-1];
    drawWithRotation(this.snake_tail_img, tail);
  }

  var rotations = {
    'left': 0,
    'right': Math.PI,
    'up': Math.PI / 2,
    'down': Math.PI * 1.5
  };

  function drawWithRotation(img, pos) {
    board.save();
    // position the origin at the center of the image
    board.translate(pos.x*20+10, pos.y*20+10);
    // rotate the appropriate amount
    board.rotate(rotations[pos.direction]);
    // draw the image (remember we repositioned the origin)
    board.drawImage(img, -10, -10);
    // go back to the board arrangement we had before
    board.restore();
  }

  function drawApple() {
    this.apple_img = this.apple_img || document.getElementById('apple-img');
    board.drawImage(this.apple_img, gameBoard.apple.getPosition().x * 20, gameBoard.apple.getPosition().y * 20);
  }

  function handleKeydown(e) {
    var dir = keyMap[e.which];
    gameBoard.snake.turn(dir);
  }

  function drawScoreBoard() {
    board.fillStyle = "rgb(255,255,255)";
    board.fillText("Score: " + gameBoard.score + "      Level: " + gameBoard.level,
                   10, 10);
  }

  updateGame();
};

