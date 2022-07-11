const boxes = document.querySelectorAll(".box");
const bottomContainer = document.querySelector(".bottomContainer");
const resetButton = document.querySelector(".resetBtn");
const message = document.querySelector(".message");
const playerStatus = document.querySelector(".playerStatus");

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
let currentPlayer = playerOne;
addClick();

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
  checkDraw();
  playerStatus.textContent = `${
    playerOneTurn ? "Player 1's Turn" : "Player 2's Turn"
  }`;
}

function displayWinner(player) {
  //display winning message based on player
  const winner = player === "X" ? "Player One" : "Player Two";
  message.textContent = `${winner} Wins!`;
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
        boxes[winningCombination[0]].classList.add("highlight");
        boxes[winningCombination[1]].classList.add("highlight");
        boxes[winningCombination[2]].classList.add("highlight");
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
    boxes[i].classList.remove("highlight");
  }
  gameOver = false;
  playerOneTurn = true;
  addClick();
  message.textContent = "";
}

function checkDraw() {
  let counter = 0;
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].textContent) {
      counter++;
    }
  }

  if (counter === 9) {
    message.textContent = "It's a Draw!";
    removeClick();
  }
}
