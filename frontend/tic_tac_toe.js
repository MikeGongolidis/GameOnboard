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
document.body.addEventListener("click", function (event) {
  if (topLeft.contains(event.target)) {
    document.getElementById("cell-one").innerHTML = "X";
    // console.log("clicked inside");
  } else if (topMiddle.contains(event.target)) {
    document.getElementById("cell-two").innerHTML = "X";
  } else if (topRight.contains(event.target)) {
    document.getElementById("cell-three").innerHTML = "X";
  } else if (middleLeft.contains(event.target)) {
    document.getElementById("cell-four").innerHTML = "X";
  } else if (middle.contains(event.target)) {
    document.getElementById("cell-five").innerHTML = "X";
  } else if (middleRight.contains(event.target)) {
    document.getElementById("cell-six").innerHTML = "X";
  } else if (bottomLeft.contains(event.target)) {
    document.getElementById("cell-seven").innerHTML = "X";
  } else if (bottomMiddle.contains(event.target)) {
    document.getElementById("cell-eight").innerHTML = "X";
  } else if (bottomRight.contains(event.target)) {
    document.getElementById("cell-nine").innerHTML = "X";
  }
});
