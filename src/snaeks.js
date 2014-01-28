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
    if (curLevel < gameBoard.level) {
      speed -= 100;
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

  function drawScoreBoard() {
    board.fillStyle = "rgb(255,255,255)";
    board.fillText("Score: " + gameBoard.score + "      Level: " + gameBoard.level,
                   10, 10);
  }

  updateGame();
};

