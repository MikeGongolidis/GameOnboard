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

// Testing clicks on empty square
let topLeft = document.getElementById("one");
let topMiddle = document.getElementById("two");
let topRight = document.getElementById("three");
let middleLeft = document.getElementById("four");
let middle = document.getElementById("five");
let middleRight = document.getElementById("six");
let bottomLeft = document.getElementById("seven");
let bottomMiddle = document.getElementById("eight");
let bottomRight = document.getElementById("nine");
// Listen for click events on body

// document.body.getElementById('game-board').addEventListener('click', function(event){

// })

// let board = 

document.getElementById('game-board').addEventListener("click", function (e) {
   e.target.firstElementChild.innerHTML = "X"
})