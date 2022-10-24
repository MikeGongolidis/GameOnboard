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
let find = {"mtype":5,"game_type":1};
let play = {"mtype":6,"player":0, "column":0,"row":0};
let invite = {"mtype":1, "game_type":1}
let exit = {"mtype":7}
let join = {"mtype":3}

let PLAYER;
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
  socket.send(JSON.stringify(invite));
  document.querySelector(".inv").innerHTML = '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
});

document.getElementById("find").addEventListener("click", function () {
  console.log("Searching for game");
  socket.send(JSON.stringify(find));
  document.querySelector(".find").innerHTML = '<div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>'
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
      document.getElementById("cell-one").innerHTML = `<div class='img1' ></div>`;
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-one").innerHTML = `<div class='img2' ></div>`;
      player_1_active = !player_1_active;
    }
    document.getElementById("one").style.pointerEvents = "none";
    console.log("Cell one was selected");
  } else if (topMiddle.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-two").innerHTML = `<div class='img1' ></div>`;
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-two").innerHTML = `<div class='img2' ></div>`;
      player_1_active = !player_1_active;
    }
    document.getElementById("two").style.pointerEvents = "none";
    console.log("Cell two was selected");
  } else if (topRight.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-three").innerHTML = `<div class='img1' ></div>`;
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-three").innerHTML = `<div class='img2' ></div>`;
      player_1_active = !player_1_active;
    }
    document.getElementById("three").style.pointerEvents = "none";
    console.log("Cell three was selected");
  } else if (middleLeft.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-four").innerHTML = `<div class='img1' ></div>`;
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-four").innerHTML = `<div class='img2' ></div>`;
      player_1_active = !player_1_active;
    }
    document.getElementById("four").style.pointerEvents = "none";
    console.log("Cell four was selected");
  } else if (middle.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-five").innerHTML = `<div class='img1' ></div>`;
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-five").innerHTML = `<div class='img2' ></div>`;
      player_1_active = !player_1_active;
    }
    document.getElementById("five").style.pointerEvents = "none";
    console.log("Cell five was selected");
  } else if (middleRight.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-six").innerHTML = `<div class='img1' ></div>`;
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-six").innerHTML = `<div class='img2' ></div>`;
      player_1_active = !player_1_active;
    }
    document.getElementById("six").style.pointerEvents = "none";
    console.log("Cell six was selected");
  } else if (bottomLeft.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-seven").innerHTML = `<div class='img1' ></div>`;
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-seven").innerHTML = `<div class='img2' ></div>`;
      player_1_active = !player_1_active;
    }
    document.getElementById("seven").style.pointerEvents = "none";
    console.log("Cell seven was selected");
  } else if (bottomMiddle.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-eight").innerHTML = `<div class='img1' ></div>`;
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-eight").innerHTML = `<div class='img2' ></div>`;
      player_1_active = !player_1_active;
    }
    document.getElementById("eight").style.pointerEvents = "none";
    console.log("Cell eight was selected");
  } else if (bottomRight.contains(event.target)) {
    if (player_1_active === true) {
      document.getElementById("cell-nine").innerHTML = `<div class='img1' ></div>`;
      player_1_active = !player_1_active;
    } else {
      document.getElementById("cell-nine").innerHTML = `<div class='img2' ></div>`;
      player_1_active = !player_1_active;
    }
    document.getElementById("nine").style.pointerEvents = "none";
    console.log("Cell nine was selected");
  }
});



// function start_game(){

//   document.querySelector(".menu").style.opacity = 0;
//   document.querySelector(".menu").style.visibility = "hidden";
//   document.querySelector(".game-board").style.opacity = 1;
//   document.querySelector(".game-board").style.visibility = "visible";

//   for(const row of [2,1,0]){
//     for(const column of [1,2,3]){
//         let cell =  `<div class="cell" id="one" column="${column}" row="${row}" >`  +
//                     `<span class="cell-inner" ></span>`+
//                     `</div>`
//         document.getElementById('game-board').innerHTML = document.getElementById('game-board').innerHTML + cell ;
//     }
//   }

// }

//LITOURGIES SERVER PROS CLIENT
socket.onmessage = function(event) {
  console.log(`[message] Data received from server: ${event.data}`);
  let message = JSON.parse(event.data)
  if(message.mtype === 2){
    if(message.room_id){
      let URL = "http://localhost:5500/frontend/tic_tac_toe.html"
      let value = `"${URL}?mtype=3&room_id=${message.room_id}"`
      console.log(value)
      navigator.clipboard.writeText(value)
    }
  }else if(message.mtype === 4){
      start_game()
      PLAYER = message.player
  }else if(message.mtype === 6){
    console.log(message)
    play_move(message)
  } else if(message.mtype === 10){
    document.querySelector(".number-of-players").innerHTML = message.num_clients
  }
  //MESSAGE = {"mtype":MessageEnum.NUM_CLIENTS.value,"num_clients": len(CONNECTIONS)}
  // WINNER LOGIC
    // INVALID MOVE
    // NUMBER OF CLIENTS
};


// GAME EVALUATION

// when game ends do this
// document.querySelector(".visibility").style.visibility = "visible";


