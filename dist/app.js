let input = document.getElementById('search');
let games = document.querySelectorAll('.game');

input.addEventListener('input', function (e) {
  const term = this.value.toLowerCase();
  games.forEach(function (game) {
    const gameText = game
      .querySelector('.game-title')
      .textContent.toLowerCase(); // or .innerText.toLowerCase();
    game.hidden = !gameText.includes(term);
  });
});
