(() => {
  const cells = document.querySelectorAll(".cell");
  const statusMessage = document.getElementById("status-message");
  const resetBtn = document.getElementById("reset-btn");
  const xScoreEl = document.getElementById("x-score");
  const drawScoreEl = document.getElementById("draw-score");
  const oScoreEl = document.getElementById("o-score");

  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let board = Array(9).fill(null);
  let currentPlayer = "X";
  let gameOver = false;
  let scores = { X: 0, O: 0, draw: 0 };

  function checkWinner() {
    for (const [a, b, c] of WINNING_COMBINATIONS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], line: [a, b, c] };
      }
    }
    if (board.every((cell) => cell !== null)) {
      return { winner: null, line: [] };
    }
    return null;
  }

  function handleCellClick(event) {
    const index = parseInt(event.target.dataset.index, 10);

    if (gameOver || board[index] !== null) {
      return;
    }

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());

    const result = checkWinner();

    if (result !== null) {
      gameOver = true;
      if (result.winner) {
        statusMessage.textContent = `Player ${result.winner} wins! 🎉`;
        statusMessage.className = "win-message";
        result.line.forEach((i) => cells[i].classList.add("winning-cell"));
        scores[result.winner]++;
        updateScores();
      } else {
        statusMessage.textContent = "It's a draw! 🤝";
        statusMessage.className = "draw-message";
        scores.draw++;
        updateScores();
      }
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    statusMessage.className = "";
  }

  function updateScores() {
    xScoreEl.textContent = scores.X;
    oScoreEl.textContent = scores.O;
    drawScoreEl.textContent = scores.draw;
  }

  function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    statusMessage.className = "";
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.className = "cell";
    });
  }

  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  resetBtn.addEventListener("click", resetGame);
})();
