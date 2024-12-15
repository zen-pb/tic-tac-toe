const Gameboard = (() => {
  const gameBoardDiv = document.getElementById("board");

  const board = new Map([
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
    return winningCombinations.some((combo) =>
      combo.every((tile) => playerTiles.includes(tile))
    );
  };

  return {
    render,
    reset,
    updateTile,
    isTileEmpty,
    checkWinner,
    board,
  };
})();

const GameController = (() => {
  const players = {};
  let currentPlayer;
  let turnCount = 0;
  let gameActive = false;

  const modeForm = document.getElementById("modeForm");
  const xPlayerName = document.getElementById("x-player-name");
  const oPlayerName = document.getElementById("o-player-name");
  const xScore = document.getElementById("x-score");
  const oScore = document.getElementById("o-score");
  const gameBoard = document.getElementById("board");

  const initializePlayers = (event) => {
    event.preventDefault();

    const xName = document.getElementById("x-name").value || "Player X";
    const oName = document.getElementById("o-name").value || "Player O";
    const xType = document.querySelector('input[name="x-type"]:checked').id;
    const oType = document.querySelector('input[name="o-type"]:checked').id;

    players.x = Player(xName, "x", xType === "x-bot");
    players.o = Player(oName, "o", oType === "o-bot");

    xPlayerName.textContent = players.x.playerName;
    oPlayerName.textContent = players.o.playerName;

    xScore.textContent = players.x.getScore();
    oScore.textContent = players.o.getScore();

    currentPlayer = players.x;

    turnCount = 0;
    gameActive = true;

    Gameboard.reset();

    if (currentPlayer.isBot) {
      setTimeout(botMove, 1500);
    }
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players.x ? players.o : players.x;

    if (currentPlayer.isBot) {
      setTimeout(botMove, 1500);
    }
  };

  const botMove = () => {
    if (!gameActive) return;

    const emptyTiles = Array.from(Gameboard.board.entries())
      .filter(([_, value]) => value === "")
      .map(([key, _]) => key);

    if (emptyTiles.length > 0) {
      const randomTile =
        emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      handlePlayerMove(randomTile);
    }
  };

  const handlePlayerMove = (tileKey) => {
    if (!gameActive) return;

    if (!Gameboard.isTileEmpty(tileKey)) {
      if (!currentPlayer.isBot) {
        alert("Tile already occupied!");
      }
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
      winner.addScore();

      if (winner.symbol === "x") {
        xScore.textContent = players.x.getScore();
      } else {
        oScore.textContent = players.o.getScore();
      }
    }

    setTimeout(() => {
      viewModal(winner);
    }, 650);
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
    modeForm.addEventListener("submit", initializePlayers);

    gameBoard.addEventListener("click", (event) => {
      if (!currentPlayer.isBot && event.target.classList.contains("item")) {
        const tileKey = event.target.getAttribute("data-tile");
        handlePlayerMove(tileKey);
      }
    });

    const rematchButton = document.getElementById("rematch");
    rematchButton.addEventListener("click", () => {
      Gameboard.reset();
      currentPlayer = players.x;
      turnCount = 0;
      gameActive = true;

      if (currentPlayer.isBot) {
        setTimeout(botMove, 500);
      }

      const modal = document.getElementById("game-modal");
      modal.style.display = "none";
    });

    const newGameButton = document.getElementById("new-game");
    newGameButton.addEventListener("click", () => {
      Gameboard.reset();

      const modal = document.getElementById("game-modal");
      modal.style.display = "none";

      modeForm.reset();
      const xName = document.getElementById("x-name");
      const oName = document.getElementById("o-name");
      xName.disabled = false;
      oName.disabled = false;

      currentPlayer = null;
      turnCount = 0;
      gameActive = false;

      xScore.textContent = 0;
      oScore.textContent = 0;

      players.x = null;
      players.o = null;
    });
  };

  const init = () => {
    initEventListeners();
  };

  return {
    init,
  };
})();

function Player(name, symbol, isBot = false) {
  let score = 0;

  const getScore = () => score;
  const addScore = () => score++;

  return {
    name,
    symbol,
    isBot,
    playerName: `${name} (${symbol.toUpperCase()})`,
    getScore,
    addScore,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  GameController.init();
});
