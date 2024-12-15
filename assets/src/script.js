document.addEventListener("DOMContentLoaded", () => {
  const titleSection = document.querySelector("div.title.section");
  const playButton = document.getElementById("playButton");

  const gameModeSection = document.querySelector("div.game-mode.section");
  const modeForm = document.getElementById("modeForm");
  const xName = document.getElementById("x-name");
  const oName = document.getElementById("o-name");
  const xRadios = document.querySelectorAll('input[name="x-type"]');
  const oRadios = document.querySelectorAll('input[name="o-type"]');

  const gameSection = document.querySelector("div.game.section");
  const newGameButton = document.getElementById("new-game");

  titleSection.classList.add("active");

  playButton.addEventListener("click", () => {
    activeSection(titleSection, gameModeSection);
  });

  xRadios.forEach((xRadio) => {
    xRadio.addEventListener("change", (event) => {
      if (event.target.checked && event.target.id === "x-bot") {
        xName.disabled = true;
        xName.value = "bot";
      } else {
        xName.disabled = false;
        xName.value = "";
      }
    });
  });

  oRadios.forEach((oRadio) => {
    oRadio.addEventListener("change", (event) => {
      if (event.target.checked && event.target.id === "o-bot") {
        oName.disabled = true;
        oName.value = "bot";
      } else {
        oName.disabled = false;
        oName.value = "";
      }
    });
  });

  modeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    activeSection(gameModeSection, gameSection);
  });

  newGameButton.addEventListener("click", () => {
    activeSection(gameSection, gameModeSection);
  });

  const activeSection = (active, inactive) => {
    active.classList.remove("active");
    inactive.classList.add("active");
  };
});
