const boxes = document.querySelectorAll(".box");

//when user clicks a box, display an x on it
//if the box has a x or o do nothing
//add an O to a random box on the board unless the player has 2 in a row
//if player or computer has 3 in a row they win
//display is player wins or loses
//show reset button
//win Cases
// 123, 456, 789
// 147, 258, 369
//159, 357

const playerOne = "X";
const playerTwo = "O";
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
let playerOneTurn = true;
let gameOver = false;

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    const currentPlayer = playerOneTurn ? playerOne : playerTwo;
    this.textContent = currentPlayer;
    playerOneTurn = !playerOneTurn;
  });
}

function checkWin() {}
