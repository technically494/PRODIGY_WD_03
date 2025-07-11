let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

function startGame() {
  const name = document.getElementById("playerName").value.trim();
  if (name === "") {
    alert("Please enter your name");
    return;
  }

  document.getElementById("playerDisplay").textContent = name;
  document.getElementById("name-input-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";
  renderBoard();
}

function renderBoard() {
  const boardContainer = document.getElementById("board");
  boardContainer.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.textContent = cell;
    cellElement.addEventListener("click", () => handleClick(index));
    boardContainer.appendChild(cellElement);
  });
}

function handleClick(index) {
  if (board[index] !== "" || isGameOver) return;

  board[index] = "X";
  renderBoard();

  if (checkWinner("X")) {
    showResult("You win!");
    return;
  }

  if (board.every(cell => cell !== "")) {
    showResult("It's a draw!");
    return;
  }

  setTimeout(() => {
    aiMove();
    renderBoard();

    if (checkWinner("O")) {
      showResult("AI wins!");
    } else if (board.every(cell => cell !== "")) {
      showResult("It's a draw!");
    }
  }, 500);
}

function aiMove() {
  let available = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  let choice = available[Math.floor(Math.random() * available.length)];
  board[choice] = "O";
}

function checkWinner(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(comb => comb.every(i => board[i] === player));
}

function showResult(msg) {
  isGameOver = true;
  document.getElementById("result").textContent = msg;
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameOver = false;
  document.getElementById("result").textContent = "";
  renderBoard();
}
