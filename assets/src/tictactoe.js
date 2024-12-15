const Gameboard = (() => {
  const gameBoardDiv = document.getElementById("board");

  const board = new Map([
    ["TL", ""], ["TM", ""], ["TR", ""],
    ["ML", ""], ["M", ""],  ["MR", ""],
    ["BL", ""], ["BM", ""], ["BR", ""]
  ]);

  const winningCombinations = [
    ["TL", "TM", "TR"],
    ["ML", "M", "MR"],
    ["BL", "BM", "BR"],
    ["TL", "ML", "BL"],
    ["TM", "M", "BM"],
    ["TR", "MR", "BR"],
    ["TL", "M", "BR"],
    ["TR", "M", "BL"]
  ];

  const render = () => {
    gameBoardDiv.innerHTML = "";
    for (let [key, value] of board.entries()) {
      const div = document.createElement("div");
      div.classList.add("item");
      div.setAttribute("data-tile", key);
      div.textContent = value;
      gameBoardDiv.appendChild(div);
    }
  };

  const reset = () => {
    for (let key of board.keys()) {
      board.set(key, "");
    }
    render();
  };

  const updateTile = (tileKey, symbol) => {
    board.set(tileKey, symbol);
    render();
  };

  const isTileEmpty = (tileKey) => {
    return board.get(tileKey) === "";
  };

  const checkWinner = (playerTiles) => {
    return winningCombinations.some(combo => 
      combo.every(tile => playerTiles.includes(tile))
    );
  };

  return {
    render,
    reset,
    updateTile,
    isTileEmpty,
    checkWinner,
    board
  };
})();

const GameController = (() => {
  const players = {
    x: Player("Player X", "x"),
    o: Player("Player O", "o")
  };

  let currentPlayer = players.x;
  let turnCount = 0;
  let gameActive = true;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players.x ? players.o : players.x;
  };

  const handlePlayerMove = (tileKey) => {
    if (!gameActive) return;

    if (!Gameboard.isTileEmpty(tileKey)) {
      alert("Tile already occupied!");
      return;
    }

    const playerTiles = [];
    Gameboard.updateTile(tileKey, currentPlayer.symbol.toUpperCase());
    
    for (let [key, value] of Gameboard.board.entries()) {
      if (value === currentPlayer.symbol.toUpperCase()) {
        playerTiles.push(key);
      }
    }

    turnCount++;

    if (Gameboard.checkWinner(playerTiles)) {
      endGame(currentPlayer, "win");
      return;
    }

    if (turnCount === 9) {
      endGame(null, "draw");
      return;
    }

    switchPlayer();
  };

  const endGame = (winner, type) => {
    gameActive = false;
    if (type === "win") {
      alert(`Game ends. ${winner.playerName} wins!`);
      winner.addScore();
    } else {
      alert("Game is a draw!");
    }
    viewModal(winner);
  };

  const resetGame = () => {
    Gameboard.reset();
    currentPlayer = players.x;
    turnCount = 0;
    gameActive = true;
  };

  const viewModal = (winner) => {
    const modal = document.getElementById("game-modal");
    const verdictP = document.getElementById("verdict");
    
    if (winner) {
      verdictP.textContent = winner.playerName;
    } else {
      verdictP.textContent = "Draw";
    }

    modal.style.display = "block";
  };

  const initEventListeners = () => {
    const gameBoard = document.getElementById("board");
    gameBoard.addEventListener("click", (event) => {
      if (event.target.classList.contains("item")) {
        const tileKey = event.target.getAttribute("data-tile");
        handlePlayerMove(tileKey);
      }
    });

    const resetButton = document.getElementById("reset-btn");
    resetButton.addEventListener("click", resetGame);

    const closeModalBtn = document.getElementById("close-modal");
    closeModalBtn.addEventListener("click", () => {
      const modal = document.getElementById("game-modal");
      modal.style.display = "none";
    });
  };

  const init = () => {
    Gameboard.render();
    initEventListeners();
  };

  return {
    init
  };
})();

function Player(name, symbol) {
  let score = 0;

  const getScore = () => score;
  const addScore = () => score++;

  return { 
    name, 
    symbol, 
    playerName: `${name} (${symbol.toUpperCase()})`, 
    getScore, 
    addScore 
  };
}

document.addEventListener("DOMContentLoaded", () => {
  GameController.init();
});