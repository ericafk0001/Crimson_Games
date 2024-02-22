window.onload = function () {
  document.getElementById("loading-container").style.display = "none";
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("api/games.json")
    .then((response) => response.json())
    .then((data) => {
      const gameContainer = document.querySelector(
        ".game-boxes.flex.flex-wrap.justify-center"
      );
      const input = document.getElementById("search");
      const games = document.querySelectorAll(".game");

      input.addEventListener("input", function () {
        const term = this.value.toLowerCase();
        games.forEach((game) => {
          const gameText = game
            .querySelector(".game-title")
            .textContent.toLowerCase();
          if (!gameText.includes(term)) {
            game.style.display = "none";
          } else {
            game.style.display = "";
          };
        });
      });

      gameContainer.innerHTML = data.map(createGameHTML).join("");
    })
    .catch((error) => console.error("Error fetching data:", error));

  function createGameHTML(game) {
    return `
      <div class="game max-w-sm h-100 w-60 rounded overflow-hidden shadow-lg bg-stone-900 mx-2 my-2">
        <img class="game-image w-full" src="assets/game-icons/${game.name}.jpg" alt="game-image" />
        <div class="px-4 pt-3">
          <div class="game-title text-slate-100 font-bold text-xl mb-2">${game.name}</div>
          <p class="game-body block text-slate-300 text-base">${game.description}</p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#${game.tag}</span>
          <div class="flex justify-center">
            <form action="games/${game.name}.html" method="get">
              <button class="playBtn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ps-20 pe-20 rounded inline-flex items-center">
                <i class="fa-solid fa-play mr-2"></i>
                <span>Play</span>
              </button>
            </form>
          </div>
        </div>
      </div>`;
  }
});
