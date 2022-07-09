const boxes = document.querySelectorAll(".box");
const bottomContainer = document.querySelector(".bottomContainer");
const resetButton = document.querySelector(".resetBtn");

//when user clicks a box, display an x on it
//if the box has a x or o do nothing
//add an O to a random box on the board unless the player has 2 in a row
//if player or computer has 3 in a row they win
//display iif player wins or loses or draws
//show reset button
//win Cases
// 123, 456, 789
// 147, 258, 369
//159, 357

const playerOne = "X";
const playerTwo = "O";
const winningCombinations = [
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
let gameDraw = false;
let currentPlayer = playerOne;

function addClick() {
  for (let i = 0; i < boxes.length; i++) {
    if (!gameOver) {
      boxes[i].addEventListener("click", handleClick, { once: true });
    }
  }
}

resetButton.addEventListener("click", resetGame);

function handleClick() {
  currentPlayer = playerOneTurn ? playerOne : playerTwo;
  this.textContent = currentPlayer;
  playerOneTurn = !playerOneTurn;
  checkWin();
}

function displayWinner(player) {
  //display winning message based on player
  const heading = document.createElement("h2");
  heading.textContent = `${player} Wins!`;
  bottomContainer.appendChild(heading);
}

function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const winningCombination = winningCombinations[i];
    let a = boxes[winningCombination[0]].textContent;
    let b = boxes[winningCombination[1]].textContent;
    let c = boxes[winningCombination[2]].textContent;

    if (a || b || c) {
      if (a === b && b === c) {
        gameOver = true;
        removeClick();
        displayWinner(currentPlayer);
      }
    }
  }
}

function removeClick() {
  if (gameOver) {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].removeEventListener("click", handleClick);
    }
  }
}

function resetGame() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = "";
  }
  gameOver = false;
  document.querySelector("h2").style.display = "none";
}
