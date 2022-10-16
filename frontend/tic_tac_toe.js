// Identify the messages that are being sent back and forth:
// 1.messages client is sending to the server:
  // INVITE = 1
  // JOIN = 3
  // START_GAME = 4
  // FIND = 5
  // EXIT_GAME = 7
// 2.messages server is sending to the client:
  // WAIT = 2
  // PLAY = 6
  // INVALID_MOVE = 8
  // WINNER = 9
  // NUM_CLIENTS = 10
  // INVALID_MESSAGE = 11

// Create the dictionary objects in js with the default communication messages.
let messages = {"INVITE": 1, 
"WAIT" : 2,
"JOIN" : 3,
"START_GAME" : 4,
"FIND" : 5,
"PLAY" : 6,
"EXIT_GAME" : 7,
"INVALID_MOVE" : 8,
"WINNER" : 9,
"NUM_CLIENTS" : 10,
"INVALID_MESSAGE" : 11}

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

// LOCAL GAME SIMULATION

let player_1_active = true;

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
// Turn simulation

document.body.addEventListener("click", function (event) {
  if (topLeft.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-one").innerHTML = "X";
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-one").innerHTML = "O";
      player_1_active = !player_1_active;
    }
    document.getElementById("one").style.pointerEvents = "none";
    console.log("Cell one was selected");
  } else if (topMiddle.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-two").innerHTML = "X";
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-two").innerHTML = "O";
      player_1_active = !player_1_active;
    }
    document.getElementById("two").style.pointerEvents = "none";
    console.log("Cell two was selected");
  } else if (topRight.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-three").innerHTML = "X";
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-three").innerHTML = "O";
      player_1_active = !player_1_active;
    }
    document.getElementById("three").style.pointerEvents = "none";
    console.log("Cell three was selected");
  } else if (middleLeft.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-four").innerHTML = "X";
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-four").innerHTML = "O";
      player_1_active = !player_1_active;
    }
    document.getElementById("four").style.pointerEvents = "none";
    console.log("Cell four was selected");
  } else if (middle.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-five").innerHTML = "X";
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-five").innerHTML = "O";
      player_1_active = !player_1_active;
    }
    document.getElementById("five").style.pointerEvents = "none";
    console.log("Cell five was selected");
  } else if (middleRight.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-six").innerHTML = "X";
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-six").innerHTML = "O";
      player_1_active = !player_1_active;
    }
    document.getElementById("six").style.pointerEvents = "none";
    console.log("Cell six was selected");
  } else if (bottomLeft.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-seven").innerHTML = "X";
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-seven").innerHTML = "O";
      player_1_active = !player_1_active;
    }
    document.getElementById("seven").style.pointerEvents = "none";
    console.log("Cell seven was selected");
  } else if (bottomMiddle.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-eight").innerHTML = "X";
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-eight").innerHTML = "O";
      player_1_active = !player_1_active;
    }
    document.getElementById("eight").style.pointerEvents = "none";
    console.log("Cell eight was selected");
  } else if (bottomRight.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-nine").innerHTML = "X";
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-nine").innerHTML = "O";
      player_1_active = !player_1_active;
    }
    document.getElementById("nine").style.pointerEvents = "none";
    console.log("Cell nine was selected");
  }
});


