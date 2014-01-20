if (typeof exports === 'undefined') var exports = window;


exports.snaeks = function() {
  var board = document.getElementById('gameboard').getContext('2d');
  board.width = board.canvas.width;
  board.height = board.canvas.height;

  var snakePosition = {
    x: 40,
    y: 40
  };

  var direction = 'down';

  setInterval(updateGame, 500);

  function updateGame() {
    clearBoard();
    updatePosition();
    drawSnake();
  }

  function clearBoard() {
    board.fillStyle = "rgb(0,0,0)";
    board.fillRect(0,0, board.width, board.height);
  }

  function updatePosition() {
    switch(direction) {
      case 'up':
        snakePosition.y -= 20;
        break;
      case 'down':
        snakePosition.y += 20;
        break;
      case 'left':
        snakePosition.x -= 20;
        break;
      case 'right':
        snakePosition.x += 20;
        break;
    }
  }

  function drawSnake() {
    board.fillStyle = "rgb(0,255,0)";
    board.fillRect(snakePosition.x, snakePosition.y, 20, 20);
  }

  function handleKeydown(e) {
    var keyMap = {
      '37': 'left',
      '38': 'up',
      '39': 'right',
      '40': 'down'
    };
    var key = keyMap[e.which];
    direction = key || direction;
  }

  window.onkeydown = handleKeydown;

  return 'whaaaat';
};

