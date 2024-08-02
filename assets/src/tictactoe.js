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

// let board = [
//   ["A", "B", "C"],
//   ["D", "E", "F"],
//   ["G", "H", "I"],
// ];

// for (let i = 0; i < board.length; i++) {
//   let line = "";
//   for (let j = 0; j < board[0].length; j++) {
//     line += board[i][j] + " ";
//   }
//   console.log(line);
// }

document.addEventListener("DOMContentLoaded", () => {
  printBoard();
});

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
  gameBoard.innerHTML = "";
  for (let [key, value] of board.entries()) {
    const div = document.createElement("div");
    div.classList.add("item");
    div.setAttribute("data-tile", key);
    div.textContent = value;
    gameBoard.appendChild(div);
  }
}

function whenEnter() {
  const gameTiles = document.querySelectorAll("div.item");

  gameTiles.forEach((tile) => {
    tile.addEventListener("click", () => {
     
    });
  });
}

function playerInput(id, input) {
  // board.set(input.toUpperCase(), id.toUpperCase());
}

function setX(input) {
  board.set(input, "X");
}
