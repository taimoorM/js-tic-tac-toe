//Target all DOM elements
const boxes = document.querySelectorAll(".box");
const bottomContainer = document.querySelector(".bottomContainer");
const resetButton = document.querySelector(".resetBtn");
const playAgain = document.querySelector(".playAgainBtn");
const playerStatus = document.querySelector(".playerStatus");
const modal = document.querySelector(".modalContainer");
const modalText = document.querySelector(".modalText");
const modalClose = document.querySelector(".closeBtn");

//Assign player values
const playerOne = "X";
const playerTwo = "O";
//Win Combos:
// 123, 456, 789
// 147, 258, 369
//159, 357
//Create array with winning combos
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

//Initialize game, add box click and reset button handler
init();

//function to add Event listener to box clicks
function init() {
  for (let i = 0; i < boxes.length; i++) {
    if (!gameOver) {
      boxes[i].addEventListener("click", handleClick, { once: true });
    }
  }
  resetButton.addEventListener("click", resetGame);
  modalClose.addEventListener("click", handleCloseClick);
  playAgain.addEventListener("click", resetGame);
  playerStatus.textContent = "Player 1's Turn";
  modal.style.display = "none";
}

//Box click handler
function handleClick() {
  currentPlayer = playerOneTurn ? playerOne : playerTwo;
  this.textContent = currentPlayer;
  playerOneTurn = !playerOneTurn;
  playerStatus.textContent = `${
    playerOneTurn ? "Player 1's Turn" : "Player 2's Turn"
  }`;
  checkWin();
  checkDraw();
}

//Function to display winner based on player
function displayWinner(player) {
  //display winning message based on player
  const winner = player === "X" ? "Player One" : "Player Two";
  modalText.textContent = `${winner} Wins!`;
}

//Function to go through all winning combos and compare it o the board to see if player has won
function checkWin() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const winningCombination = winningCombinations[i];
    let boxOne = boxes[winningCombination[0]].textContent;
    let boxTwo = boxes[winningCombination[1]].textContent;
    let boxThree = boxes[winningCombination[2]].textContent;

    if (boxOne || boxTwo || boxThree) {
      if (boxOne === boxTwo && boxTwo === boxThree) {
        gameOver = true;
        removeClick();
        displayWinner(currentPlayer);
        modal.style.display = "block";
        winningCombination.forEach((num) => {
          boxes[num].classList.add("highlight");
        });
      }
    }
  }
}

//Function to remove box click event listener
function removeClick() {
  if (gameOver) {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].removeEventListener("click", handleClick);
    }
  }
}

//Function to reset game to original state
function resetGame() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = "";
    boxes[i].classList.remove("highlight");
  }
  gameOver = false;
  playerOneTurn = true;
  init();
}

//Function to check if theres a draw and displaying message
function checkDraw() {
  let counter = 0;
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].textContent) {
      counter++;
    }
  }

  if (counter === 9) {
    modalText.textContent = "It's a Draw!";
    modal.style.display = "block";

    removeClick();
  }
}

//function to handle modal close
function handleCloseClick() {
  modal.style.display = "none";
}
