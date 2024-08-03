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

const winningCombinations = [
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
  if (board.get(tileKey) !== "") {
    alert("Tile already occupied!");
    return;
  }

  const inputObj = {
    tile: tileKey,
    turnSymbol: playerTurn(),
  };

  tileContentChecker(inputObj);
  board.set(inputObj.tile, inputObj.turnSymbol);
  turnCount++;
  updateBoard();

  const winner = winChecker();

  if (winner.bool) {
    alert(`Game ends. ${winner.symbol} wins!`);
  } else if (turnCount === 9) {
    alert("Game draw!");
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

function tileContentChecker(obj) {
  switch (obj.turnSymbol) {
    case "X":
      xTiles.push(obj.tile);
      break;
    case "O":
      oTiles.push(obj.tile);
      break;
  }
}

function winChecker() {
  let winner = {
    symbol: "",
    bool: false,
  };

  const checkWinningCombo = (playerTiles) => {
    return winningCombinations.some((combo) =>
      combo.every((tile) => playerTiles.includes(tile))
    );
  };

  if (checkWinningCombo(xTiles)) {
    winner.symbol = "X";
    winner.bool = true;
  } else if (checkWinningCombo(oTiles)) {
    winner.symbol = "O";
    winner.bool = true;
  }

  return winner;
}
