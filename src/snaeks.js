var GameBoard = require('./gameboard').GameBoard;


exports.snaeks = function snaeks(window, document, message) {
  var PLAYING = false;

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
  var inboundsWidth = (ctx.canvas.width / BLOCK_SIZE) - 2;
  var inboundsHeight = (ctx.canvas.height / BLOCK_SIZE) - 2;
  var gameBoard = new GameBoard(inboundsWidth, inboundsHeight);

  function drawBorder() {
    ctx.fillStyle = "rgb(200,200,0)";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function updateGame() {
    clearBoard();
    var curLevel = gameBoard.level;
    try {
      gameBoard.update();
    } catch (e) {
      return snaeks(window, document, "death. score: " + gameBoard.score);
    }
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
    ctx.fillRect(BLOCK_SIZE, BLOCK_SIZE, ctx.canvas.width - BLOCK_SIZE*2, ctx.canvas.height - BLOCK_SIZE*2);
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
    ctx.translate(((pos.x+1) * BLOCK_SIZE) + halfBlock, ((pos.y+1) * BLOCK_SIZE) + halfBlock);
    // rotate the appropriate amount
    ctx.rotate(ROTATION_MAP[pos.direction]);
    // draw the image (remember we repositioned the origin)
    ctx.drawImage(img, -halfBlock, -halfBlock);
    // go back to the board arrangement we had before
    ctx.restore();
  }

  function drawApple() {
    this.apple_img = this.apple_img || document.getElementById('apple-img');
    ctx.drawImage(this.apple_img,
                  (gameBoard.apple.getPosition().x+1) * BLOCK_SIZE,
                  (gameBoard.apple.getPosition().y+1) * BLOCK_SIZE);
  }

  function handleKeydown(e) {
    e.preventDefault();
    if (!PLAYING && e.which == 13) {
      PLAYING = true;
      updateGame();
    }
    var dir = KEYMAP[e.which];
    gameBoard.snake.turn(dir);
  }

  function drawScoreBoard() {
    ctx.fillStyle = "rgb(200,200,0)";
    ctx.fillRect(0, 0, BLOCK_SIZE*15, BLOCK_SIZE);
    ctx.font = "14px sans-serif";
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillText("Score: " + gameBoard.score + "      Level: " + gameBoard.level,
                 BLOCK_SIZE, (BLOCK_SIZE/2) + 5);
  }

  function flashMessage(message) {
    clearBoard();
    ctx.font = "40px monospace";
    ctx.fillStyle = "rgb(0,255,0)";
    ctx.fillText(message, 150, 150);
    ctx.font = "16px monospace";
    ctx.fillText("Press <enter> to play", 200, 300);
  }

  window.onkeydown = handleKeydown;
  drawBorder();
  flashMessage(message || "Uh oh! saneks");
};
