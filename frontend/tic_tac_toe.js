
let find = {"mtype":5,"game_type":1};
let play = {"mtype":6,"player":1, "column":0,"row":0};

let PLAYER = 0;

let socket = new WebSocket("ws://127.0.0.1:8765");


document.getElementById("back").addEventListener("click", function () {
  location.href = "http://localhost:5500/frontend/index.html";
});

document.getElementById("start").addEventListener("click", function () {
  document.querySelector(".menu").style.opacity = 0;
  document.querySelector(".menu").style.visibility = "hidden";
  document.querySelector(".game-board").style.opacity = 1;
  document.querySelector(".game-board").style.visibility = "visible";
});

document.getElementById("inv").addEventListener("click", function () {
  console.log("Player invite initiated");
});

document.getElementById("find").addEventListener("click", function () {
  console.log("Finding game for you. Please wait :)");

});



document.getElementById('game-board').addEventListener("click", function (e) {
  console.log(e.target)
   //e.target.firstElementChild.innerHTML = "X"
})