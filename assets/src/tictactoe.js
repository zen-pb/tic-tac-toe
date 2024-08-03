//Store gameBoard as array inside gameBoard obj
//Players are to be store inside an object also
//An object to control the flow of the game
//Create a module factory with an IIFE pattern

// function Player(name) {
//   let score = 0;
//   const getScore = () => score;
//   const addScore = () => score++;

//   return { name, getScore, addScore };
// }

// const sanNarabe = (function () {
//     const start = () => {

//     }
// })();

document.addEventListener("DOMContentLoaded", () => {
  printBoard();
});

let turnX = true;
let turnCount = 0;

let xTiles = [];
let oTiles = [];

const winningCombination = [
  ["TL", "TM", "TR"],
  ["ML", "M", "MR"],
  ["BL", "BM", "BR"],
  ["TL", "ML", "BL"],
  ["TM", "M", "BM"],
  ["TR", "MR", "BR"],
  ["TL", "M", "BR"],
  ["TR", "M", "BL"],
];

let board = new Map([
  ["TL", ""],
  ["TM", ""],
  ["TR", ""],
  ["ML", ""],
  ["M", ""],
  ["MR", ""],
  ["BL", ""],
  ["BM", ""],
  ["BR", ""],
]);

const gameBoard = document.getElementById("board");

function printBoard() {
  updateBoard();
}

function updateBoard() {
  gameBoard.innerHTML = "";
  for (let [key, value] of board.entries()) {
    const div = document.createElement("div");
    div.classList.add("item");
    div.setAttribute("data-tile", key);
    div.textContent = value;
    gameBoard.appendChild(div);
  }
}

gameBoard.addEventListener("click", (event) => {
  if (event.target.classList.contains("item")) {
    const tileKey = event.target.getAttribute("data-tile");
    playerInput(tileKey);
  }
});

function playerInput(tileKey) {
  if (turnCount !== 9) {
    board.set(tileKey, playerTurn());
    turnCount++;
    updateBoard();
  } else {
    alert("Game already ended!");
  }
}

function playerTurn() {
  let symbol = "";
  if (turnX) {
    symbol = "X";
    turnX = false;
  } else {
    symbol = "O";
    turnX = true;
  }

  return symbol;
}
