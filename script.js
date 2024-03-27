// waqwdawd
document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".sq");
  const restartButton = document.querySelector(".restart");
  const player1WinsDisplay = document.getElementById("player1");
  const player2WinsDisplay = document.getElementById("player2");
  let currentPlayer = "X";
  let player1Wins = 0;
  let player2Wins = 0;
  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const checkWinner = () => {
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        gameBoard[Math.floor(a / 3)][a % 3] &&
        gameBoard[Math.floor(a / 3)][a % 3] ===
          gameBoard[Math.floor(b / 3)][b % 3] &&
        gameBoard[Math.floor(a / 3)][a % 3] ===
          gameBoard[Math.floor(c / 3)][c % 3]
      ) {
        return gameBoard[Math.floor(a / 3)][a % 3];
      }
    }

    if (gameBoard.every((row) => row.every((cell) => cell !== ""))) {
      return "tie";
    }

    return null;
  };

  const handleClick = (event) => {
    const x = parseInt(event.target.dataset.x);
    const y = parseInt(event.target.dataset.y);
    if (gameBoard[x][y] === "") {
      gameBoard[x][y] = currentPlayer;
      event.target.textContent = currentPlayer;
      const winner = checkWinner();
      if (winner) {
        if (winner === "tie") {
          alert("It's a tie!");
        } else {
          alert(`Player ${winner} wins!`);
          if (winner === "X") {
            player1Wins++;
          } else {
            player2Wins++;
          }
          updateWinsDisplay();
        }
        resetGame();
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  };

  const resetGame = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    currentPlayer = "X";
  };

  const updateWinsDisplay = () => {
    player1WinsDisplay.textContent = player1Wins;
    player2WinsDisplay.textContent = player2Wins;
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });

  restartButton.addEventListener("click", resetGame);
});
