
document.getElementById("tictactoe").onclick = function () {
  console.log(window.location.origin);
 location.href = `http://${window.location.host}/frontend/game.html?game_type=1`;
};

document.getElementById("score-4").onclick = function () {
  location.href = `http://${window.location.host}/frontend/game.html?game_type=2`;
};