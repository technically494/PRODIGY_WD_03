let board = Array(9).fill('');
let currentPlayer = 'X';
let players = { X: 'Player X', O: 'Player O' };
let gameActive = false;

function startGame() {
  const nameX = document.getElementById('nameX').value || 'Player X';
  const nameO = document.getElementById('nameO').value || 'Player O';
  players = { X: nameX, O: nameO };

  board.fill('');
  currentPlayer = 'X';
  gameActive = true;

  document.getElementById('status').textContent = `${players[currentPlayer]}'s turn`;
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
    cell.addEventListener('click', handleMove, { once: true });
  });
}

function handleMove(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    document.getElementById('status').textContent = `${players[currentPlayer]} wins!`;
    gameActive = false;
  } else if (board.every(cell => cell)) {
    document.getElementById('status').textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `${players[currentPlayer]}'s turn`;
  }
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  return wins.some(combo => 
    combo.every(i => board[i] === currentPlayer)
  );
}
