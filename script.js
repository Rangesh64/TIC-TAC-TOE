const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");

const playerAScoreText = document.getElementById("playerAScore");
const playerBScoreText = document.getElementById("playerBScore");
const movesCountText = document.getElementById("movesCount");
const drawCountText = document.getElementById("drawCount");
const matchesCountText = document.getElementById("matchesCount");

const playerACard = document.getElementById("playerACard");
const playerBCard = document.getElementById("playerBCard");

const newRoundBtn = document.getElementById("newRoundBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let moves = 0;

let playerAScore = 0;
let playerBScore = 0;
let draws = 0;
let matches = 0;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

newRoundBtn.addEventListener("click", startNewRound);
resetScoreBtn.addEventListener("click", resetScores);

function handleCellClick() {
  const index = this.dataset.index;

  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  this.textContent = currentPlayer;
  this.classList.add(currentPlayer.toLowerCase());

  moves++;
  movesCountText.textContent = moves;

  checkResult();
}

function checkResult() {
  let winnerFound = false;
  let winningCells = [];

  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winnerFound = true;
      winningCells = pattern;
      break;
    }
  }

  if (winnerFound) {
    gameActive = false;
    matches++;
    matchesCountText.textContent = matches;

    if (currentPlayer === "X") {
      playerAScore++;
      playerAScoreText.textContent = playerAScore;
      statusText.textContent = "Player A wins this round!";
    } else {
      playerBScore++;
      playerBScoreText.textContent = playerBScore;
      statusText.textContent = "Player B wins this round!";
    }

    winningCells.forEach(index => {
      cells[index].classList.add("winner");
    });

    return;
  }

  if (!board.includes("")) {
    gameActive = false;
    draws++;
    matches++;

    drawCountText.textContent = draws;
    matchesCountText.textContent = matches;
    statusText.textContent = "It's a draw!";

    return;
  }

  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  if (currentPlayer === "X") {
    statusText.textContent = "Player A's turn";
    playerACard.classList.add("active");
    playerBCard.classList.remove("active");
  } else {
    statusText.textContent = "Player B's turn";
    playerBCard.classList.add("active");
    playerACard.classList.remove("active");
  }
}

function startNewRound() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  moves = 0;

  statusText.textContent = "Player A's turn";
  movesCountText.textContent = moves;

  playerACard.classList.add("active");
  playerBCard.classList.remove("active");

  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });
}

function resetScores() {
  playerAScore = 0;
  playerBScore = 0;
  draws = 0;
  matches = 0;

  playerAScoreText.textContent = playerAScore;
  playerBScoreText.textContent = playerBScore;
  drawCountText.textContent = draws;
  matchesCountText.textContent = matches;

  startNewRound();
}