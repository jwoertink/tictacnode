var prompt = require('prompt');

console.log('Welcome to tic tac toe');
prompt.start();

var p1, p2;

var board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

var turn = -1;

var currentPlayer = function() {
  return turn % 2 == 0 ? 'X' : 'O';
};

var printBoard = function() {
  var str = "";
  for(var i = 0; i < board.length; i++) {
    str += board[i].join(' | ') + "\n";
  }

  return console.log(str);
};

var playerDidWin = function() {
  var player = currentPlayer();

  if(board[0][0] == player && board[0][1] == player && board[0][2] == player ||
     board[1][0] == player && board[1][1] == player && board[1][2] == player ||
     board[2][0] == player && board[2][1] == player && board[2][2] == player ||
     board[0][0] == player && board[1][0] == player && board[2][0] == player ||
     board[0][1] == player && board[1][1] == player && board[2][1] == player ||
     board[0][2] == player && board[1][2] == player && board[2][2] == player ||
     board[0][0] == player && board[1][1] == player && board[2][2] == player ||
     board[0][2] == player && board[1][1] == player && board[2][0] == player) {
    return true;
  } else {
    return false;
  }
};

var canPlay = function() {
  var validMoves = 0;
  for(var row = 0; row < board.length; row++) {
    for(var col = 0; col < row.length; col++) {
      if(board[row][col] == '') {
        validMoves++;
      }
    }
  }
  return validMoves > 0;
};

var makeMode = function(err, result) {
  var row = result.row;
  var col = result.column;
  var play = currentPlayer();
  if(board[row][col] == '') {
    board[row][col] = play;
  }
  printBoard();
  if(playerDidWin()) {
    if(currentPlayer() == 'X') {
      var player_name = p1;
    } else {
      var player_name = p2;
    }
    console.log('YAY! ' + player_name + ' won!');
  } else {
    if(canPlay()) {
      playTurn();
    } else {
      console.log('Looks like it is a draw');
    }
  }
};

var playTurn = function() {
  turn++;
  console.log('Player '+ currentPlayer() + ' turn');
  prompt.get(['row', 'column'], makeMode);
};

var getPlayers = function (err, result) {
  p1 = result.player_X;
  p2 = result.player_O;
  console.log('Welcome, ' + p1 + ' and ' + p2);
  console.log(p1 + ' is X');
  console.log(p2 + ' is O');
  playTurn();
};

prompt.get(['player_X', 'player_O'], getPlayers);
